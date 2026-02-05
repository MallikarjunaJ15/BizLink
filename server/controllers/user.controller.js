import { User } from "../models/user.model.js";
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";
import formatBufferToDataUri from "../utils/dataUri.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import { asynHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body);
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Ensure all the fields are filled" });
    }
    if (password.length > 12) {
      return res
        .status(400)
        .json({ message: "Password cannot exceed 12 characters" });
    }
    const profilePicture = req.file;
    console.log(profilePicture);
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(200)
        .json({ message: "Email already exists", success: false });
    }
    let secure_url = "";
    if (profilePicture) {
      const buffer = await formatBufferToDataUri(profilePicture);
      const uploadResult = await uploadMedia(buffer);
      if (!uploadResult) {
        return res.status(500).json({ message: "Image upload failed" });
      }
      secure_url = uploadResult.secure_url;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      profilePicture: secure_url,
    });

    await generateToken(res, user.id);
    return res
      .status(200)
      .json({ user, message: "Account created successfully", success: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Registration failed", error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Ensure all the fields are filled" });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Account does'nt exist" });
    }
    const comaprePassword = await bcrypt.compare(password, user.password);
    if (!comaprePassword) {
      return res
        .status(400)
        .json({ message: "Either the Entered email or passord is incorrect" });
    }
    await generateToken(res, user._id);
    return res.status(200).json({ message: "Logged in successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};

export const getUserProfile = asynHandler(async (req, res) => {
  const user = await User.findById(req.id).populate("businesses");
  if (!user) throw new ApiError(404, "user not found");
  return res.status(200).json({ user });
});

export const logout = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });

  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

export const editProfilePhoto = asynHandler(async (req, res) => {
  try {
    const user = await User.findById(req.id);
    const profilePicture = req.file;
    if (!profilePicture) {
      throw new ApiError(400, "No file uploaded");
    }
    if (user.profilePicture) {
      const publicId = user.profilePicture.split("/").pop().split(".")[0];
      await deleteMediaFromCloudinary(publicId);
    }
    const buffer = await formatBufferToDataUri(profilePicture);
    // console.log("Buffer" + buffer);
    const uploadRes = await uploadMedia(buffer);
    // console.log("cloudinary response", uploadRes);
    if (!uploadRes) {
      throw new ApiError(500, "Image upload failed");
    }

    // console.log("after", profilePicture);
    const { secure_url } = uploadRes;
    user.profilePicture = secure_url;
    await user.save();
    return res.status(200).json({ message: "Profile upload sucessfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});
