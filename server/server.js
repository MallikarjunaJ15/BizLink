import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { db } from "./config/db.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.route.js";
import businessRoutes from "./routes/business.route.js";
import { ApiError } from "./utils/ApiError.js";
import { Server } from "socket.io";
import { createServer } from "http";
import availabilityRoutes from "./routes/availability.route.js";
import meetingRoutes from "./routes/meeting.routes.js";
dotenv.config({});
const port = process.env.PORT;
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true,
  },
});
const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/business", businessRoutes);
app.use("/api/v1/availability", availabilityRoutes);
app.use("/api/v1/meeting", meetingRoutes);
app.get("/", (req, res) => {
  res.send("connected");
});
app.use((err, req, res, next) => {
  console.error("Error caught by middleware:", err);
  // Handle known ApiErrors
  if (err instanceof ApiError) {
    return res
      .status(err.statusCode)
      .json({ message: err.message, success: false });
  }

  // uandle other unexpected errors
  return res.status(500).json({
    message: "Internal server error",
    error: err.message,
    success: false,
  });
});

const onlineUsers = new Map();

io.on("connection", (socket) => {
  console.log("connected", socket.id);
  socket.on("user:join", (userId) => {
    onlineUsers.set(userId, socket.id);
    console.log(`👤 User ${userId} is online (socket: ${socket.id})`);
    console.log("📊 Online users:", Array.from(onlineUsers.keys()));
  });
  socket.on("join-room", (meetingId) => {
    console.log(`Socket ${socket.id} joined room ${meetingId}`);
    const room = io.sockets.adapter.rooms.get(meetingId);
    const size = room ? room.size : 0;
    socket.join(meetingId);
    if (size == 0) {
      socket.emit("role", "caller");
    } else {
      socket.emit("role", "receiver");
      socket.to(meetingId).emit("user-joined", socket.id);
    }

    console.log(`✅ Socket ${socket.id} joined room ${meetingId}`);
  });
  socket.on("send-offer", (data) => {
    console.log(`offer from ${socket.id} to ${data.to}`);
    // WHY data.to? We need to send the offer to a SPECIFIC person
    // io.to(data.to) = send to this specific socket ID

    io.to(data.to).emit("receive-offer", {
      from: socket.id,
      offer: data.offer,
    });
  });
  socket.on("send-answer", (data) => {
    console.log(`answer from ${socket.id} to ${data.to} `);

    io.to(data.to).emit("receive-answer", {
      from: socket.id,
      answer: data.answer,
    });
  });
  socket.on("send-ice-candidate", (data) => {
    console.log(`ice-candidate from ${socket.id} to ${data.to} `);

    io.to(data.to).emit("receive-ice-candidate", {
      from: socket.id,
      candidate: data.candidate,
    });
  });
  socket.on("disconnect", () => {
    for (const [userId, socketId] of onlineUsers.entries()) {
      if (socketId == socket.id) {
        onlineUsers.delete(userId);
        console.log(`User ${userId} disconnected`);
        break;
      }
    }
  });
});
export { io, onlineUsers };

server.listen(port, () => {
  db();
  console.log(`The server is running at http://localhost:${port}/`);
});
