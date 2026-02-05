import express from "express";
import {
  editProfilePhoto,
  getUserProfile,
  login,
  logout,
  register,
} from "../controllers/user.controller.js";
import upload from "../utils/multer.js";
import { asynHandler } from "../utils/asyncHandler.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
const userRoutes = express.Router();

userRoutes.post("/register", upload.single("profilePicture"), register);
userRoutes.post("/login", login);
userRoutes.get("/me", isAuthenticated, asynHandler(getUserProfile));
userRoutes.post("/logout", logout);
userRoutes.post(
  "/uploadProfile",
  isAuthenticated,
  upload.single("profilePicture"),
  asynHandler(editProfilePhoto),
);
export default userRoutes;
