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
const app = express();
const server = createServer(app);
const io = new Server(server);
app.use(cookieParser());
app.use(express.json());
const port = process.env.PORT;
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/business", businessRoutes);
app.use("/api/v1/availability", availabilityRoutes);
app.use("/api/v1/meeting", meetingRoutes);
app.get("/", (req, res) => {
  res.send("connected");
});
app.use((err, req, res, next) => {
  console.error("🔥 Error caught by middleware:", err);
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

io.on("connection", (socket) => {
  console.log("connected", socket.id);
});
server.listen(port, () => {
  db();
  console.log(`The server is running at http://localhost:${port}/`);
});
