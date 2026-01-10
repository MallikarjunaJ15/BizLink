import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config({});
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export const uploadMedia = async (file) => {
  try {
    return await cloudinary.uploader.upload(file, {
      resource_type: "image",
    });
  } catch (error) {
    console.log("Cloudinary error:", error.message);
    throw error;
  }
};
export const deleteMediaFromCloudinary = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.log(error.message);
  }
};
export const deleteVideoFromCloudinary = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId, { resource_type: "video" });
  } catch (error) {
    console.log(error.message);
  }
};
