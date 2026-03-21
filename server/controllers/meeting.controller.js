import { MeetingRateLimit } from "../models/MeetingRateLimit.model.js";
import { Meeting } from "../models/videoCall.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { v4 as uuidv4 } from "uuid";
import { Businesses } from "../models/business.model.js";
import { io } from "../server.js";
export const requestMeeting = asyncHandler(async (req, res) => {
  try {
    const { businessId, date, startTime, endTime } = req.body;
    const buyerId = req.user._id;

    if (!businessId || !date || !startTime || !endTime) {
      throw new ApiError(400, "All fields are required");
    }

    // Get business
    const business = await Businesses.findById(businessId).populate("owner");
    if (!business) {
      throw new ApiError(404, "Business not found");
    }

    const ownerId = business.owner._id;

    // Prevent self-booking
    if (buyerId.toString() === ownerId.toString()) {
      throw new ApiError(400, "You cannot book a meeting with yourself");
    }

    // ============================================
    // RATE LIMIT CHECK (1 booking per day)
    // ============================================
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const rateLimit = await MeetingRateLimit.findOne({
      buyer: buyerId,
      business: businessId,
    });

    if (rateLimit) {
      const lastMeetingDate = new Date(rateLimit.lastMeetingDate);
      lastMeetingDate.setHours(0, 0, 0, 0);

      if (lastMeetingDate.getTime() === today.getTime()) {
        throw new ApiError(
          429,
          "You can only book one meeting per day for this business. Please try again tomorrow.",
        );
      }
    }

    // ============================================
    // CHECK IF SLOT IS STILL AVAILABLE
    // ============================================
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

    // ============================================
    // DETERMINE MEETING TYPE
    // ============================================
    const previousMeetingsCount = await Meeting.countDocuments({
      buyer: buyerId,
      business: businessId,
      status: "COMPLETED",
    });

    const isFirstMeeting = previousMeetingsCount === 0;
    const meetingType = isFirstMeeting ? "FIRST_MEETING" : "FOLLOW_UP";

    console.log("🔍 Is first meeting:", isFirstMeeting);

    // ============================================
    // CREATE MEETING
    // ============================================
    const scheduledDate = new Date(date + "T" + startTime);

    const meeting = await Meeting.create({
      buyer: buyerId,
      owner: ownerId,
      business: businessId,
      scheduledDate: scheduledDate,
      startTime: startTime,
      endTime: endTime,
      duration: calculateDuration(startTime, endTime),
      status: "SCHEDULED",
      meetingType: meetingType,
      requiresApproval: !isFirstMeeting,
      approvalStatus: isFirstMeeting ? "PENDING" : "ACCEPTED",
      meetingId: uuidv4(),
    });

    // console.log("✅ Meeting created:", meeting.meetingId);

    // ============================================
    // UPDATE RATE LIMIT
    // ============================================
    await MeetingRateLimit.findOneAndUpdate(
      {
        buyer: buyerId,
        business: businessId,
      },
      {
        buyer: buyerId,
        business: businessId,
        lastMeetingDate: new Date(),
        $inc: { meetingCount: 1 },
      },
      {
        upsert: true, // Create if doesn't exist
        new: true, // Return updated document
      },
    );

    // ============================================
    // POPULATE MEETING DETAILS
    // ============================================
    await meeting.populate([
      { path: "buyer", select: "name email profilePicture" },
      { path: "owner", select: "name email profilePicture" },
      { path: "business", select: "Businessname BusinessThumbnail category" },
    ]);

    io.emit("send:notification", {
      recipientId: ownerId.toString(),
      notification: {
        type: "MEETING_REQUEST",
        title: "New Meeting Request",
        message: `${meeting.buyer.name} request a meeting for ${business.Businessname}`,
        meetingId: meeting.id,
        timestamp: new Date(),
      },
    });
    return res.status(201).json({
      success: true,
      message: isFirstMeeting
        ? "Meeting booked successfully! 🎉"
        : "Meeting request sent. Waiting for owner approval.",
      meeting,
      isFirstMeeting,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export const getUserMeeting = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const { filter } = req.query;
    const now = new Date();
    let query = {
      $or: [{ buyer: userId }, { owner: userId }],
    };
    if (filter === "upcoming") {
      query.scheduledDate = { $gte: now };
      query.approvalStatus = "ACCEPTED";
    } else if (filter === "past") {
      query.$and = [
        { $or: [{ buyer: userId }, { owner: userId }] },
        {
          $or: [
            { scheduledDate: { $lt: now } },
            { status: { $in: ["COMPLETED", "CANCELLED", "NO_SHOW"] } },
          ],
        },
      ];
      delete query.$or;
    } else if (filter === "pending") {
      query.approvalStatus = "PENDING";
      query.requiresApproval = true;
    }

    const meetings = await Meeting.find(query)
      .populate("buyer", "name email profilePicture")
      .populate("owner", "name email profilePicture")
      .populate("business", "Businessname BusinessThumbnail category")
      .sort({ scheduledDate: 1 });

    return res
      .status(200)
      .json({ success: true, count: meetings.length, meetings });
  } catch (error) {
    console.error("[getUserMeeting] error:", error.stack);
    return res.status(500).json({ error: error.message });
  }
});
export const handleMeetingApproval = asyncHandler(async (req, res) => {
  const { meetingId } = req.params;
  const { action, reason } = req.body;
  const ownerId = req.user._id;
  if (!["ACCEPTED", "REJECTED"].includes(action)) {
    throw new ApiError(400, "Action must be 'ACCEPTED' or 'REJECTED'");
  }

  const meeting = await Meeting.findById(meetingId)
    .populate("buyer", "name email")
    .populate("business", "Businessname");

  if (!meeting) {
    throw new ApiError(404, "Meeting not found");
  }

  if (meeting.owner.toString() !== ownerId.toString()) {
    throw new ApiError(403, "You are not authorized to approve this meeting");
  }

  if (!meeting.requiresApproval) {
    throw new ApiError(400, "This meeting doesn't require approval");
  }

  if (meeting.approvalStatus !== "PENDING") {
    throw new ApiError(
      400,
      `Meeting has already been ${meeting.approvalStatus.toLowerCase()}`,
    );
  }

  if (action === "ACCEPTED") {
    meeting.approvalStatus = "ACCEPTED";
    meeting.status = "SCHEDULED";
  } else {
    meeting.approvalStatus = "REJECTED";
    meeting.status = "CANCELLED";
    meeting.cancelReason = reason || "Rejected by owner";
  }

  await meeting.save();
  io.emit("send:notification", {
    recipientId: meeting.buyer.toString(),
    type: action === "ACCEPTED" ? "MEETING_APPROVED" : "MEETIG_REJECTED",
    title: action === "ACCEPTED" ? "Meeting Approved! 🎉" : "Meeting Rejected",
    message:
      action === "ACCEPTED"
        ? `Your meeting request for ${meeting.business.Businessname} has been approved!`
        : `Your meeting request for ${meeting.business.Businessname} was rejected.`,
    meetingId: meeting._id,
    timestamp: new Date(),
  });
  return res.status(200).json({
    success: true,
    message:
      action === "ACCEPTED"
        ? "Meeting approved successfully!"
        : "Meeting rejected",
    meeting,
  });
});

export const cancelMeeting = asyncHandler(async (req, res) => {
  try {
    const { meetingId } = req.params;
    const { reason } = req.body;
    const userId = req.user._id;
    const meeting = await Meeting.findById(meetingId);
    if (!meeting) {
      throw new ApiError(404, "Meeting not found");
    }
    if (
      meeting.buyer.toString() !== userId.toString() &&
      meeting.owner.toString() !== userId.toString()
    ) {
      throw new ApiError(403, "You are not authorized to cancel this meeting");
    }

    if (meeting.status !== "SCHEDULED") {
      throw new ApiError(400, "Only scheduled meetings can be cancelled");
    }

    meeting.status = "CANCELLED";
    meeting.cancelReason = reason || "Cancelled by user";
    await meeting.save();

    return res.status(200).json({
      success: true,
      message: "Meeting cancelled successfully",
      meeting,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server Error" });
  }
});

export const completeMeeting = asyncHandler(async (req, res) => {
  try {
    const { meetingId } = req.params;
    const userId = req.user._id;
    const meeting = await Meeting.findById(meetingId);
    if (!meeting) {
      throw new ApiError(404, "Meeting not found");
    }
    if (meeting.owner.toString() !== userId.toString()) {
      throw new ApiError(403, "Only the owner can mark meeting as completed");
    }
    meeting.status = "COMPLETED";
    await meeting.save();

    return res.status(200).json({
      success: true,
      message: "Meeting marked as completed",
      meeting,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server Error" });
  }
});
export const getMeetingById = asyncHandler(async (req, res) => {
  try {
    const { meetingId } = req.params;
    const userId = req.user._id;
    const meeting = await Meeting.findById(meetingId)
      .populate("buyer", "name email profilePicture")
      .populate("owner", "name email profilePicture")
      .populate("business", "Businessname BusinessThumbnail category price");

    if (!meeting) {
      throw new ApiError(404, "Meeting not found");
    }

    // Verify access
    if (
      meeting.buyer._id.toString() !== userId.toString() &&
      meeting.owner._id.toString() !== userId.toString()
    ) {
      throw new ApiError(403, "You don't have access to this meeting");
    }

    return res.status(200).json({
      success: true,
      meeting,
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
