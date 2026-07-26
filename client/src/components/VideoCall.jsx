// pages/VideoCall.jsx
import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Video, VideoOff, Mic, MicOff, Phone } from "lucide-react";
import { io } from "socket.io-client";
import { toast } from "sonner";

const ICE_SERVERS = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:stun1.l.google.com:19302" },
    { urls: "stun:stun2.l.google.com:19302" },
    { urls: "stun:stun3.l.google.com:19302" },
  ],
};

const VideoCall = () => {
  const { meetingId } = useParams();
  const navigate = useNavigate();

  // DOM refs
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  const socketRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const remoteSocketIdRef = useRef(null);
  const localStreamRef = useRef(null);
  const roleRef = useRef(null);

  // UI state (only what the UI actually needs to display)
  const [role, setRole] = useState(null);
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [connectionState, setConnectionState] = useState("disconnected");

  // ─────────────────────────────────────────────────────────
  // PHASE 1: Setup socket (runs once on mount)
  // ─────────────────────────────────────────────────────────
  useEffect(() => {
    setupSocketListeners();
    return () => {
      localStreamRef.current?.getTracks().forEach((track) => track.stop());
      peerConnectionRef.current?.close();
      socketRef.current?.disconnect();
    };
  }, [meetingId]);

  // ─────────────────────────────────────────────────────────
  // PHASE 2: Start camera when role is assigned
  useEffect(() => {
    if (role === "caller" || role === "receiver") {
      // Both sides need camera — caller sends video, receiver also sends video
      startLocalStream();
    }
  }, [role]); // ← was [], now [role]

  // ─────────────────────────────────────────────────────────
  // PHASE 3: Once stream is ready AND we know the remote socket,
  // create the offer. This handles the race condition where
  // user-joined fires before stream is ready.
  // ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (
      localStream &&
      remoteSocketIdRef.current &&
      roleRef.current === "caller"
    ) {
      createOffer(remoteSocketIdRef.current);
    }
  }, [localStream]);

  // ─────────────────────────────────────────────────────────
  // Camera access — no role check inside, caller guarantees it above
  // FIX: removed internal role check (stale closure always returned null)
  // ─────────────────────────────────────────────────────────
  const startLocalStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      localStreamRef.current = stream;
      setLocalStream(stream);
      if (localVideoRef.current) localVideoRef.current.srcObject = stream;
      console.log("✅ Local stream started");
    } catch (error) {
      console.error("❌ Camera/mic error:", error);
    }
  };

  // ─────────────────────────────────────────────────────────
  // Socket setup
  // ─────────────────────────────────────────────────────────
  const setupSocketListeners = () => {
    socketRef.current = io(import.meta.env.VITE_SOCKET_URL, {
      withCredentials: true,
    });

    socketRef.current.on("connect", () => {
      setConnectionState("connecting");
      socketRef.current.emit("join-room", meetingId);
    });

    socketRef.current.on("role", (assignedRole) => {
      roleRef.current = assignedRole;
      setRole(assignedRole);
    });

    socketRef.current.on("user-joined", (remoteSocketId) => {
      remoteSocketIdRef.current = remoteSocketId;

      if (roleRef.current === "caller" && localStreamRef.current) {
        createOffer(remoteSocketId);
      }
    });

    socketRef.current.on("receive-offer", async (data) => {
      remoteSocketIdRef.current = data.from;
      await handleReceiveOffer(data.offer, data.from);
    });

    socketRef.current.on("receive-answer", async (data) => {
      await handleReceiveAnswer(data.answer);
    });

    socketRef.current.on("receive-ice-candidate", async (data) => {
      await handleReceiveIceCandidate(data.candidate);
    });

    socketRef.current.on("disconnect", () => {
      console.log("🔌 Disconnected from signaling server");
      setConnectionState("disconnected");
    });
  };

  // ─────────────────────────────────────────────────────────
  // Create RTCPeerConnection
  // ─────────────────────────────────────────────────────────
  const createPeerConnection = () => {
    const pc = new RTCPeerConnection(ICE_SERVERS);

    // Add local tracks so the other side receives our video/audio
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => {
        pc.addTrack(track, localStreamRef.current);
      });
    }

    // Send ICE candidates to the other peer via socket
    pc.onicecandidate = (event) => {
      if (event.candidate && remoteSocketIdRef.current) {
        socketRef.current.emit("send-ice-candidate", {
          to: remoteSocketIdRef.current,
          candidate: event.candidate,
        });
      }
    };

    // Receive remote video/audio
    pc.ontrack = (event) => {
      const [stream] = event.streams;
      setRemoteStream(stream);
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = stream;
      }
    };

    pc.onconnectionstatechange = () => {
      console.log("🔗 Connection state:", pc.connectionState);
      setConnectionState(pc.connectionState); 
    };

    pc.oniceconnectionstatechange = () => {
      console.log("🧊 ICE state:", pc.iceConnectionState);
    };

    peerConnectionRef.current = pc;
    return pc;
  };

  // ─────────────────────────────────────────────────────────
  // Caller: create and send offer
  // ─────────────────────────────────────────────────────────
  const createOffer = async (targetSocketId) => {

    if (!localStreamRef.current) {
      return;
    }

    try {
      if (!peerConnectionRef.current) createPeerConnection();
      const pc = peerConnectionRef.current;

      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      socketRef.current.emit("send-offer", { to: targetSocketId, offer });
    } catch (error) {
      toast.error("Error creating offer:");
    }
  };

  // ─────────────────────────────────────────────────────────
  // Receiver: handle incoming offer, send answer
  // ─────────────────────────────────────────────────────────
  const handleReceiveOffer = async (offer, fromSocketId) => {
    if (!localStreamRef.current) {
      await new Promise((resolve) => {
        const interval = setInterval(() => {
          if (localStreamRef.current) {
            clearInterval(interval);
            resolve();
          }
        }, 100);
      });
    }

    try {
      if (!peerConnectionRef.current) createPeerConnection();
      const pc = peerConnectionRef.current;

      await pc.setRemoteDescription(new RTCSessionDescription(offer));

      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);

      socketRef.current.emit("send-answer", { to: fromSocketId, answer });
    } catch (error) {
      toast.error("Error handling offer:");
    }
  };

  // ─────────────────────────────────────────────────────────
  // Caller: receive answer from receiver
  // ─────────────────────────────────────────────────────────
  const handleReceiveAnswer = async (answer) => {
    try {
      const pc = peerConnectionRef.current;
      if (!pc) {
        return;
      }
      await pc.setRemoteDescription(new RTCSessionDescription(answer));
    } catch (error) {
      toast.error("Error handling answer:", error);
    }
  };

  // ─────────────────────────────────────────────────────────
  // Both sides: add ICE candidates from the other peer
  // ─────────────────────────────────────────────────────────
  const handleReceiveIceCandidate = async (candidate) => {
    const pc = peerConnectionRef.current;
    if (!pc) return;
    try {
      if (pc.remoteDescription) {
        await pc.addIceCandidate(new RTCIceCandidate(candidate));
      } 
    } catch (err) {
      console.error("❌ ICE candidate error:", err);
    }
  };

  // ─────────────────────────────────────────────────────────
  // Controls
  // ─────────────────────────────────────────────────────────
  const toggleMic = () => {
    const audioTrack = localStreamRef.current?.getAudioTracks()[0];
    if (!audioTrack) return;
    audioTrack.enabled = !audioTrack.enabled;
    setIsMuted(!audioTrack.enabled);
  };

  const toggleVideo = () => {
    const videoTrack = localStreamRef.current?.getVideoTracks()[0];
    if (!videoTrack) return;
    videoTrack.enabled = !videoTrack.enabled;
    setIsCameraOff(!videoTrack.enabled);
  };

  // ─────────────────────────────────────────────────────────
  // UI
  // ─────────────────────────────────────────────────────────
  const dotColor =
    connectionState === "connected"
      ? "bg-green-500"
      : connectionState === "connecting"
        ? "bg-yellow-500"
        : "bg-red-500";

  return (
    <div className="min-h-screen bg-[#2b2d42] flex flex-col">
      {/* Header */}
      <div className="bg-[#1a1b2e] p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Video className="w-6 h-6 text-[#d90429]" />
          <h1 className="text-white font-bold text-xl">Video Call</h1>
          <span className="text-[#8d99ae] text-sm">ID: {meetingId}</span>
          {role && (
            <span className="text-xs bg-white/10 text-white px-2 py-1 rounded-full font-mono">
              {role}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${dotColor} animate-pulse`} />
          <span className="text-white text-sm capitalize">
            {connectionState}
          </span>
        </div>
      </div>

      {/* Video grid */}
      <div className="flex-1 p-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Local video */}
        <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl min-h-64">
          <video
            ref={localVideoRef}
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover"
          />
          {!localStream && (
            <div className="absolute inset-0 flex items-center justify-center bg-black">
              <p className="text-[#8d99ae]">Starting camera...</p>
            </div>
          )}
          <div className="absolute bottom-4 left-4 bg-black/70 px-3 py-1 rounded-lg">
            <span className="text-white font-semibold text-sm">
              You ({role})
            </span>
          </div>
        </div>

        {/* Remote video */}
        <div className="relative bg-[#1a1b2e] rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center min-h-64">
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />
          {!remoteStream && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#1a1b2e]">
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-[#8d99ae]/20 flex items-center justify-center mx-auto mb-3">
                  <Video className="w-10 h-10 text-[#8d99ae]" />
                </div>
                <p className="text-[#8d99ae] font-semibold">
                  {connectionState === "connecting"
                    ? "Connecting..."
                    : "Waiting for participant..."}
                </p>
              </div>
            </div>
          )}
          {remoteStream && (
            <div className="absolute bottom-4 left-4 bg-black/70 px-3 py-1 rounded-lg">
              <span className="text-white font-semibold text-sm">
                Remote User
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="bg-[#1a1b2e] p-6 flex items-center justify-center gap-4">
        <button
          onClick={toggleMic}
          className="bg-[#8d99ae] hover:bg-[#6b7280] text-white p-4 rounded-full transition-all"
        >
          {isMuted ? (
            <MicOff className="w-6 h-6" />
          ) : (
            <Mic className="w-6 h-6" />
          )}
        </button>
        <button
          onClick={toggleVideo}
          className="bg-[#8d99ae] hover:bg-[#6b7280] text-white p-4 rounded-full transition-all"
        >
          {isCameraOff ? (
            <VideoOff className="w-6 h-6" />
          ) : (
            <Video className="w-6 h-6" />
          )}
        </button>
        <button
          onClick={() => navigate("/meetings/dashboard")}
          className="bg-[#d90429] hover:bg-[#ef233c] text-white p-4 rounded-full transition-all"
        >
          <Phone className="w-6 h-6 rotate-[135deg]" />
        </button>
      </div>
    </div>
  );
};

export default VideoCall;
