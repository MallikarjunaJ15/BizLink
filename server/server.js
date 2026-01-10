import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { db } from "./config/db.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.route.js";
import businessRoutes from "./routes/business.route.js";
import { ApiError } from "./utils/ApiError.js";
dotenv.config({});
const app = express();
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
app.listen(port, () => {
  db();
  console.log(`The server is running at http://localhost:${port}/`);
});
