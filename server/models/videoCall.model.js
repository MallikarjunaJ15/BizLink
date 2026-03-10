import mongoose from "mongoose";

const videoCallSchemaModel = new mongoose.Schema(
  {
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    business: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Businesses",
      required: true,
    },
    scheduledDate: {
      type: Date,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      default: 30,
    },
    status: {
      type: String,
      enum: ["SCHEDULED", "COMPLETED", "CANCELLED", "NO_SHOW"],
      default: "SCHEDULED",
    },
    meetingType: {
      type: String,
      enum: ["FIRST_MEETING", "FOLLOW_UP"],
      default: "FIRST_MEETING",
      required: true,
    },

    // For follow-up meetings
    requiresApproval: {
      type: Boolean,
      default: false,
    },
    approvalStatus: {
      type: String,
      enum: ["PENDING", "ACCEPTED", "REJECTED"],
      default: "PENDING",
    },
    meetingId: {
      type: String,
      unique: true,
      required: true,
    },
    buyerNotes: String,
    ownerNotes: String,
    cancelReason: String,
  },
  { timestamps: true },
);

videoCallSchemaModel.index({ buyer: 1, business: 1, scheduledDate: 1 });
videoCallSchemaModel.index({ owner: 1, scheduledDate: 1 });
export const Meeting = mongoose.model("Meeting", videoCallSchemaModel);
