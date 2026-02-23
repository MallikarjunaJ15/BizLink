import { Businesses } from "../models/business.model";
import { MeetingRateLimit } from "../models/MeetingRateLimit.model";
import { Meeting } from "../models/videoCall.model,";
import { asyncHandler } from "../utils/asyncHandler";
import { v4 as uuidv4 } from "uuid";
export const requestMeeting = asyncHandler(async (req, res) => {
  try {
    const { businessId, date, startTime, endTime } = req.body;
    const buyerId = req.user._id;

    if (!businessId || !date || !startTime || !endTime) {
      throw new ApiError(400, "All fields are required");
    }
    const business = await Businesses.findById(businessId).populate("owner");
    if (!business) {
      throw new ApiError(404, "Business not found");
    }
    const ownerId = business.owner._id;
    if (buyerId.toString() === ownerId.toString()) {
      throw new ApiError(400, "You cannot book a meeting with yourself");
    }

    // Rate Limit check
    const today = new Date().setHours(0, 0, 0, 0);
    const selectedDate = new Date().setHours(0, 0, 0, 0);
    const rateLimit = await MeetingRateLimit.findOne({
      buyer: buyerId,
      business: businessId,
    });
    if (rateLimit) {
      const lastMeetingDate = new Date(rateLimit.lastMeetingDate).setHours(
        0,
        0,
        0,
        0,
      );
      if (lastMeetingDate === today) {
        throw new ApiError(
          429,
          "You can only book one meeting per day for this business. Please try again tomorrow.",
        );
      }
    }

    //CHECK IF SLOT IS STILL AVAILABLE
    const schedulatedDate = new Date(date + "T" + startTime);
    const conflictingMeeting = await Meeting.findOne({
      owner: ownerId,
      scheduledDate: {
        $gte: new Date(date + "T00:00:00"),
        $lt: new Date(date + "T23:59:59"),
      },
      startTime: startTime,
      status: "SCHEDULED",
    });

    if (conflictingMeeting) {
      throw new ApiError(
        409,
        "This time slot has already been booked. Please select another slot.",
      );
    }

    const previousMeetingsCount = await Meeting.countDocuments({
      buyer: buyerId,
      business: businessId,
      status: "COMPLETED",
    });
    const isFirstMeeting = previousMeetingsCount == 0;
    const meetingType = isFirstMeeting ? "FIRST_MEETING" : "FOLLOW_UP";
    const meeting = await Meeting.create({
      buyer: buyerId,
      owner: ownerId,
      business: businessId,
      schedulatedDate: schedulatedDate,
      startTime: startTime,
      endTime: endTime,
      duration: calculateDuration(startTime, endTime),
      status: "COMPLETED",
      meetingType: meetingType,
      requiresApproval: !isFirstMeeting,
      approvalStatus: isFirstMeeting ? "ACCEPTED" : "PENDING",
      meetingId: uuidv4(),
    });
    // ============================================
    // UPDATE RATE LIMIT
    // ============================================
    await MeetingRateLimit.findByIdAndUpdate(
      { buyer: buyerId, business: businessId },
      {
        buyer: buyerId,
        business: businessId,
        lastMeetingDate: new Date(),
        $inc: { meetingCount: 1 },
      },
      { upsert: true, new: true },
    );

    // Populate meeting details
    await meeting.populate([
      { path: "buyer", select: "name email profilePicture" },
      { path: "owner", select: "name email profilePicture" },
      { path: "business", select: "Businessname BusinessThumbnail category" },
    ]);

    return res.status(200).json({
      message: isFirstMeeting
        ? "Meeting booked successfully!"
        : "Meeting request sent. Waiting for owner approval.",
      success: true,
      meeting,
      isFirstMeeting,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server Error" });
  }
});

function calculateDuration(startTime, endTime) {
  const start = parseTime(startTime);
  const end = parseTime(endTime);
  return end - start;
}

function parseTime(timeStr) {
  const [hours, minutes] = timeStr.split(":").map(Number);
  return hours * 60 + minutes;
}
