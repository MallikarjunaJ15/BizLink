import mongoose from "mongoose";
const rateLimitSchema = new mongoose.Schema(
  {
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    business: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Businesses",
      required: true,
    },
    lastMeetingDate: {
      type: Date,
      required: true,
    },
    meetingCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);
rateLimitSchema.index({ buyer: 1, business: 1 }, { unique: true });
export const MeetingRateLimit = mongoose.model(
  "MeetingRateLimit ",
  rateLimitSchema,
);
