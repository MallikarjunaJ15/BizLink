import mongoose from "mongoose";
const timeSlotsSchema = new mongoose.Schema(
  {
    startTime: {
      type: String,
      required: true,
    },

    endTime: {
      tpe: String,
      required: true,
    },
    slotDuration: {
      type: Number,
      default: 30,
    },
  },
  { timestamps: true },
);

const availabilitySchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    business: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Businesses",
      required: true,
    },
    weekdays: {
      monday: { type: timeSlotsSchema, default: null },
      tuesday: { type: timeSlotsSchema, default: null },
      wednesday: { type: timeSlotsSchema, default: null },
      thursday: { type: timeSlotsSchema, default: null },
      friday: { type: timeSlotsSchema, default: null },
      saturday: { type: timeSlotsSchema, default: null },
      sunday: { type: timeSlotsSchema, default: null },
    },
    timeZone: {
      type: String,
      default: "Asia/Kolkata",
    },
    buffer: {
      type: Number,
      default: 30,
    },
  },
  { timestamps: true },
);

export const OwnerAvailability = mongoose.model(
  "OwnerAvailability ",
  availabilitySchema,
);
