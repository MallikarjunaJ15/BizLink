import { Businesses } from "../models/business.model";
import { OwnerAvailability } from "../models/OwnerAvailability.model";
import { Meeting } from "../models/videoCall.model,";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";

// Set or update owner availability
export const setAvailability = async (req, res) => {
  try {
    const { businessId, weekdays, timeZone, buffer } = req.body;
    const ownerId = req.user._id;
    const business = await Businesses.findById(businessId);
    if (!business) {
      throw new ApiError(404, "Business not found");
    }
    const availability = await OwnerAvailability.findByIdAndUpdate(
      { owner: ownerId, business: businessId },
      {
        owner: ownerId,
        business: businessId,
        weekdays,
        timeZone,
        buffer,
      },
      { upsert: true, new: true },
    );
    return res.status(200).json({
      success: true,
      message: "Availability set successfully",
      availability,
    });
  } catch (error) {
    return res.status(500).json({ error: "Internale Server Error" });
  }
};

export const getAvailability = async (req, res) => {
  try {
    const { businessId } = req.params;
    const business = await Businesses.findById(businessId).populate("owner");
    if (!business) {
      throw new ApiError(404, "Business not found");
    }
    const availability = await OwnerAvailability.findOne({
      owner: business.owner._id,
      business: businessId,
    });

    if (!availability) {
      return res.status(200).json({
        success: true,
        message: "No availability set",
        availability: null,
      });
    }

    return res.status(200).json({
      success: true,
      availability,
    });
  } catch (error) {
    return res.status(500).json({ error: "Internale Server Error" });
  }
};

export const getAvailableSlots = asyncHandler(async (req, res) => {
  const { businessId, date } = req.query;

  const business = await Businesses.findById(businessId).populate("owner");
  if (!business) {
    throw new ApiError(404, "Business not found");
  }

  const availability = await OwnerAvailability.findOne({
    owner: business.owner._id,
    business: businessId,
  });

  if (!availability) {
    return res.status(200).json({
      success: true,
      slots: [],
    });
  }
  const targetDate = new Date(date);
  const dayName = targetDate.toLocaleDateString("en-us", {
    weekday: "lowercase",
  });
  const dayAvailability = availability.weekdays[dayName];

  if (!dayAvailability) {
    return res.status(200).json({
      success: true,
      slots: [],
    });
  }
  const slots = generateTimeSlots(
    dayAvailability.startTime,
    dayAvailability.endTime,
    dayAvailability.slotDuration,
    availability.buffer,
  );

  // Remove already booked slots
  const bookedMeetings = await Meeting.findById({
    owner: business.owner._id,
    scheduledDate: {
      $gte: new Date(date + "T00:00:00"),
      $lt: new Date(date + "T23:59:59"),
    },
    status: "SCHEDULED",
  });
  const bookedTimes = bookedMeetings.map((m) => m.startTime);
  const availableSlots = slots.filter(
    (slots) => !bookedTimes.includes(slots.startTime),
  );
  return res.status(200).json({
    success: true,
    date,
    slots: availableSlots,
  });
});

// Helper: Generate time slots
function generateTimeSlots(startTime, endTime, duration, buffer) {
  const slots = [];
  let current = parseTime(startTime);
  const end = parseTime(endTime);
  while (current < end) {
    const slotStart = formatTime(current);
    current += duration;
    const slotEnd = formatTime(current);
    if (current <= end) {
      slots.push({
        startTime: slotStart,
        endTime: slotEnd,
        available: true,
      });
    }
    current += buffer; // Add buffer between meetings
  }
}

function parseTime(timeStr) {
  const [hours, minutes] = timeStr.split(":").map(Number);
  return hours * 60 + minutes;
}

function formatTime(minutes) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
}
