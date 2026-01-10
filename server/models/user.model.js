import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    businesses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Businessess",
      },
    ],
    savedBusinesses: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Businessess",
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
