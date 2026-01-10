import mongoose from "mongoose";
const businessesSchema = new mongoose.Schema(
  {
    Businessname: {
      type: String,
      required: true, 
    },
    BusinessThumbnail: {
      type: String,
      required: true,
      default: "",
    },
    Businessbio: {
      type: String,
    },
    price: {
      type: Number,
    },
    category: {
      type: String,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    address: {
      location: {
        type: String,
        required: true,
      },
      landmark: {
        type: String,
      },
      pincode: {
        type: String,
        required: true,
      },
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["live", "dealDone"],
      default: "live",
    },
  },
  { timestamps: true }
);

export const Businesses = mongoose.model("Businessess", businessesSchema);
