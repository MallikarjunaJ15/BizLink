import { Businesses } from "../models/business.model.js";
import { OwnerAvailability } from "../models/OwnerAvailability.model.js";
import { Meeting } from "../models/videoCall.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Set or update owner availability
export const setAvailability = async (req, res) => {
  try {
    const { weekdays, timeZone, buffer } = req.body;
    const ownerId = req.user._id;
    const { businessId } = req.params;
    const business = await Businesses.findById(businessId);
    if (!business) {
      throw new ApiError(404, "Business not found");
    }
    const availability = await OwnerAvailability.findOneAndUpdate(
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
    return res.status(500).json({ error: error.message });
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
    return res.status(500).json({ error: error.message });
  }
};

export const getAvailableSlots = asyncHandler(async (req, res) => {
  try {
    const { businessId, date } = req.query;
    // console.log("🔍 businessId:", businessId);
    // console.log("🔍 typeof:", typeof businessId);
    // console.log("🔍 req.params:", req.params);
    // console.log("🔍 req.query:", req.query);
    if (!businessId || !date) {
      throw new ApiError(400, "Business ID and date are required");
    }

    const business = await Businesses.findById(businessId).populate("owner");
    if (!business) {
      throw new ApiError(404, "Business not found");
    }
    // Get owner's availability for this business
    const availability = await OwnerAvailability.findOne({
      owner: business.owner._id,
      business: businessId,
    });
    if (!availability) {
      return res.status(200).json({
        success: true,
        date,
        slots: [],
        message: "Owner has not set availability yet",
      });
    }

    // Get day of week (monday, tuesday, etc.)
    const targetDate = new Date(date);

    const dayName = targetDate
      .toLocaleDateString("en-US", {
        weekday: "long", // Returns "Monday", "Tuesday", etc.
      })
      .toLowerCase(); // Convert to "monday", "tuesday", etc.

    const dayAvailability = availability.weekdays[dayName];

    // Check if owner is available on this day
    if (!dayAvailability || !dayAvailability.startTime) {
      return res.status(200).json({
        success: true,
        date,
        dayOfWeek: dayName,
        slots: [],
        message: `Owner is not available on ${dayName}s`,
      });
    }

    // Generate all possible time slots for this day
    const allSlots = generateTimeSlots(
      dayAvailability.startTime,
      dayAvailability.endTime,
      dayAvailability.slotDuration,
      availability.buffer,
    );

    // Get already booked meetings for this date
    const startOfDay = new Date(date + "T00:00:00");
    const endOfDay = new Date(date + "T23:59:59");

    const bookedMeetings = await Meeting.find({
      owner: business.owner._id,
      scheduledDate: {
        $gte: startOfDay,
        $lt: endOfDay,
      },
      status: "SCHEDULED",
    });

    // Filter out booked slots
    const bookedTimes = bookedMeetings.map((m) => m.startTime);
    const availableSlots = allSlots.filter(
      (slot) => !bookedTimes.includes(slot.startTime),
    );

    return res.status(200).json({
      success: true,
      date,
      dayOfWeek: dayName,
      ownerAvailability: {
        startTime: dayAvailability.startTime,
        endTime: dayAvailability.endTime,
        slotDuration: dayAvailability.slotDuration,
      },
      totalSlots: allSlots.length,
      bookedSlots: bookedTimes.length,
      availableSlots: availableSlots.length,
      slots: availableSlots,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
  // Helper: Generate time slots
  function generateTimeSlots(startTime, endTime, duration, buffer) {
    const slots = [];
    let current = parseTime(startTime);
    const end = parseTime(endTime);

    while (current + duration <= end) {
      const slotStart = formatTime(current);
      const slotEnd = formatTime(current + duration);

      slots.push({
        startTime: slotStart,
        endTime: slotEnd,
        duration: duration,
      });

      current += duration + buffer; // Add duration + buffer
    }

    return slots;
  }

  // Helper: Parse time string to minutes (e.g., "09:00" -> 540)
  function parseTime(timeStr) {
    const [hours, minutes] = timeStr.split(":").map(Number);
    return hours * 60 + minutes;
  }

  // Helper: Format minutes to time string (e.g., 540 -> "09:00")
  function formatTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
  }
});
