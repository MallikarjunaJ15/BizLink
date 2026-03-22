// pages/MeetingsDashboard.jsx (COMPLETE REWRITE - UNIVERSAL)
import React, { useState } from "react";
import {
  Calendar,
  Clock,
  Video,
  Check,
  X,
  User,
  Building2,
  Loader2,
  AlertCircle,
  ArrowRight,
  Ban,
  CheckCircle2,
  XCircle,
  Timer,
} from "lucide-react";
import {
  useGetUserMeetingsQuery,
  useHandleApprovalMutation,
  useCancelMeetingMutation,
} from "@/api/MeetingApi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "sonner";

const MeetingsDashboard = () => {
  const [filter, setFilter] = useState("upcoming");
  const navigate = useNavigate();
  const currentUser = useSelector((store) => store.auth.user);
  const { data, isLoading, refetch } = useGetUserMeetingsQuery(filter);
  console.log(data)
  const [handleApproval, { isLoading: approvingLoading }] =
    useHandleApprovalMutation();
  const [cancelMeeting, { isLoading: cancellingLoading }] =
    useCancelMeetingMutation();
  const handleApprove = async (meetingId) => {
    try {
      await handleApproval({ meetingId, action: "ACCEPTED" }).unwrap();
      toast.success("Meeting approved!");
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to approve");
    }
  };

  const handleReject = async (meetingId) => {
    try {
      const reason = prompt("Reason for rejection (optional):");
      await handleApproval({
        meetingId,
        action: "REJECTED",
        reason: reason || "Rejected by owner",
      }).unwrap();
      toast.error("Meeting rejected");
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to reject");
    }
  };

  const handleCancel = async (meetingId) => {
    if (!window.confirm("Are you sure you want to cancel this meeting?"))
      return;

    try {
      const reason = prompt("Reason for cancellation (optional):");
      await cancelMeeting({ meetingId, reason }).unwrap();
      toast.success("Meeting cancelled");
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to cancel");
    }
  };

  const handleJoinMeeting = (meetingId) => {
    navigate(`/video-call/${meetingId}`);
  };

  const isJoinable = (scheduledDate, startTime) => {
    const meetingDateTime = new Date(
      `${scheduledDate.split("T")[0]}T${startTime}`,
    );
    const now = new Date();
    const timeDiff = meetingDateTime - now;
    return timeDiff > -60 * 60 * 1000 && timeDiff <= 15 * 60 * 1000;
  };

  const isOwner = (meeting) => {
    return meeting.owner._id === currentUser._id;
  };

  const getOtherPartyName = (meeting) => {
    return isOwner(meeting) ? meeting.buyer.name : meeting.owner.name;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-[#d90429]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#edf2f4] font-display py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#2b2d42] to-[#8d99ae] rounded-3xl p-8 mb-8 shadow-xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-white/20 p-3 rounded-xl">
              <Video className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white">My Meetings</h1>
          </div>
          <p className="text-white/80">Manage your scheduled video calls</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-4 mb-8 bg-white rounded-2xl p-2 shadow-lg overflow-x-auto">
          <button
            onClick={() => setFilter("upcoming")}
            className={`flex-1 whitespace-nowrap py-3 px-6 rounded-xl font-bold transition-all ${
              filter === "upcoming"
                ? "bg-gradient-to-r from-[#d90429] to-[#ef233c] text-white shadow-lg"
                : "text-[#8d99ae] hover:bg-[#edf2f4]"
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setFilter("pending")}
            className={`flex-1 whitespace-nowrap py-3 px-6 rounded-xl font-bold transition-all ${
              filter === "pending"
                ? "bg-gradient-to-r from-[#d90429] to-[#ef233c] text-white shadow-lg"
                : "text-[#8d99ae] hover:bg-[#edf2f4]"
            }`}
          >
            Pending Approval
          </button>
          <button
            onClick={() => setFilter("past")}
            className={`flex-1 whitespace-nowrap py-3 px-6 rounded-xl font-bold transition-all ${
              filter === "past"
                ? "bg-gradient-to-r from-[#d90429] to-[#ef233c] text-white shadow-lg"
                : "text-[#8d99ae] hover:bg-[#edf2f4]"
            }`}
          >
             Past Meetings
          </button>
        </div>

        {/* Meetings List */}
        <div className="space-y-4">
          {!data?.meetings || data.meetings.length === 0 ? (
            <div className="bg-white rounded-3xl p-16 text-center shadow-xl">
              <AlertCircle className="w-16 h-16 text-[#8d99ae] mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-[#2b2d42] mb-2">
                No meetings found
              </h3>
              <p className="text-[#8d99ae]">
                {filter === "upcoming" &&
                  "You don't have any upcoming meetings"}
                {filter === "pending" && "No pending approval requests"}
                {filter === "past" && "No past meetings to show"}
              </p>
            </div>
          ) : (
            data.meetings.map((meeting) => {
              const userIsOwner = isOwner(meeting);
              const otherParty = getOtherPartyName(meeting);
              const canJoin = isJoinable(
                meeting.scheduledDate,
                meeting.startTime,
              );

              return (
                <div
                  key={meeting._id}
                  className="bg-white rounded-2xl p-6 shadow-lg border-2 border-[#8d99ae]/10 hover:border-[#d90429]/30 transition-all"
                >
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Left: Business & User Info */}
                    <div className="flex items-start gap-4 flex-1">
                      <img
                        src={meeting.business.BusinessThumbnail}
                        alt={meeting.business.Businessname}
                        className="w-20 h-20 rounded-xl object-cover shadow-md"
                      />
                      <div className="flex-1">
                        {/* Business Name */}
                        <div className="flex items-center gap-2 mb-2">
                          <Building2 className="w-5 h-5 text-[#d90429]" />
                          <h3 className="font-bold text-[#2b2d42] text-lg">
                            {meeting.business.Businessname}
                          </h3>
                        </div>

                        {/* Other Party */}
                        <div className="flex items-center gap-2 text-[#8d99ae] mb-1">
                          <User className="w-4 h-4" />
                          <span className="text-sm">
                            {userIsOwner ? "Buyer" : "Owner"}:{" "}
                            <span className="font-semibold text-[#2b2d42]">
                              {otherParty}
                            </span>
                          </span>
                        </div>

                        {/* Date & Time */}
                        <div className="flex flex-wrap items-center gap-4 text-sm mt-3">
                          <div className="flex items-center gap-2 text-[#2b2d42]">
                            <Calendar className="w-4 h-4 text-[#d90429]" />
                            {new Date(
                              meeting.scheduledDate,
                            ).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-2 text-[#2b2d42]">
                            <Clock className="w-4 h-4 text-[#d90429]" />
                            {meeting.startTime} - {meeting.endTime}
                          </div>
                          <div className="flex items-center gap-2 text-[#8d99ae]">
                            <Timer className="w-4 h-4" />
                            {meeting.duration} min
                          </div>
                        </div>

                        {/* Badges */}
                        <div className="flex flex-wrap gap-2 mt-3">
                          {/* Meeting Type */}
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                              meeting.meetingType === "FIRST_MEETING"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-purple-100 text-purple-700"
                            }`}
                          >
                            {meeting.meetingType === "FIRST_MEETING"
                              ? "🆕 First Meeting"
                              : "🔄 Follow-up"}
                          </span>

                          {/* Role Badge */}
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                              userIsOwner
                                ? "bg-green-100 text-green-700"
                                : "bg-orange-100 text-orange-700"
                            }`}
                          >
                            {userIsOwner
                              ? "👤 You're the Owner"
                              : "💼 You're the Buyer"}
                          </span>

                          {/* Approval Status Badge (for pending) */}
                          {meeting.requiresApproval && (
                            <span
                              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                                meeting.approvalStatus === "PENDING"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : meeting.approvalStatus === "ACCEPTED"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                              }`}
                            >
                              {meeting.approvalStatus === "PENDING" &&
                                "Awaiting Approval"}
                              {meeting.approvalStatus === "ACCEPTED" &&
                                "Approved"}
                              {meeting.approvalStatus === "REJECTED" &&
                                "Rejected"}
                            </span>
                          )}
                        </div>

                        {/* Cancel Reason (if cancelled) */}
                        {meeting.cancelReason && (
                          <div className="mt-3 bg-red-50 border-l-4 border-red-500 p-3 rounded">
                            <p className="text-sm text-red-700">
                              <span className="font-semibold">Reason:</span>{" "}
                              {meeting.cancelReason}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex flex-col gap-3 lg:min-w-[200px]">
                      {/* PENDING APPROVAL - OWNER VIEW */}
                      {filter === "pending" &&
                        userIsOwner &&
                        meeting.approvalStatus === "PENDING" &&
                        meeting.requiresApproval && (
                          <>
                            <button
                              onClick={() => handleApprove(meeting._id)}
                              disabled={approvingLoading}
                              className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                            >
                              <Check className="w-4 h-4" />
                              Approve
                            </button>
                            <button
                              onClick={() => handleReject(meeting._id)}
                              disabled={approvingLoading}
                              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                            >
                              <X className="w-4 h-4" />
                              Reject
                            </button>
                          </>
                        )}

                      {/* PENDING APPROVAL - BUYER VIEW (Just status) */}
                      {filter === "pending" &&
                        !userIsOwner &&
                        meeting.approvalStatus === "PENDING" && (
                          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 text-center">
                            <Timer className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
                            <p className="text-sm font-semibold text-yellow-700">
                              Waiting for owner approval
                            </p>
                          </div>
                        )}

                      {/* JOIN MEETING BUTTON - BOTH USERS */}
                      {filter === "upcoming" &&
                        meeting.status === "SCHEDULED" &&
                        meeting.approvalStatus === "ACCEPTED" &&
                        canJoin && (
                          <button
                            onClick={() => handleJoinMeeting(meeting._id)}
                            className="bg-gradient-to-r from-[#d90429] to-[#ef233c] text-white py-3 px-6 rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2"
                          >
                            <Video className="w-5 h-5" />
                            Join Meeting
                          </button>
                        )}

                      {/* CANCEL BUTTON - BOTH USERS (for upcoming) */}
                      {filter === "upcoming" &&
                        meeting.status === "SCHEDULED" && (
                          <button
                            onClick={() => handleCancel(meeting._id)}
                            disabled={cancellingLoading}
                            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                          >
                            <Ban className="w-4 h-4" />
                            Cancel
                          </button>
                        )}

                      {/* STATUS BADGES - PAST MEETINGS */}
                      {filter === "past" && (
                        <>
                          {meeting.status === "COMPLETED" && (
                            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 text-center">
                              <CheckCircle2 className="w-6 h-6 text-green-600 mx-auto mb-2" />
                              <p className="text-sm font-semibold text-green-700">
                                Completed
                              </p>
                            </div>
                          )}
                          {meeting.status === "CANCELLED" && (
                            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 text-center">
                              <XCircle className="w-6 h-6 text-red-600 mx-auto mb-2" />
                              <p className="text-sm font-semibold text-red-700">
                                Cancelled
                              </p>
                            </div>
                          )}
                          {meeting.status === "NO_SHOW" && (
                            <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-4 text-center">
                              <AlertCircle className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                              <p className="text-sm font-semibold text-gray-700">
                                No Show
                              </p>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default MeetingsDashboard;
