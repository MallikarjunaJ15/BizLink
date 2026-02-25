import express from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  cancelMeeting,
  completeMeeting,
  geetUserMeeting,
  getMeetingById,
  handleMeetingApproval,
  requestMeeting,
} from "../controllers/meeting.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
const meetingRoutes = express.Router();
meetingRoutes.post("/book", isAuthenticated, asyncHandler(requestMeeting));
meetingRoutes.get(
  "/my-meetings",
  isAuthenticated,
  asyncHandler(geetUserMeeting),
);
meetingRoutes.patch(
  "/:meetingId/approval",
  isAuthenticated,
  asyncHandler(handleMeetingApproval),
);
meetingRoutes.patch(
  "/:meetingId/cancel",
  isAuthenticated,
  asyncHandler(cancelMeeting),
);
meetingRoutes.patch(
  "/:meetingId/complete",
  isAuthenticated,
  asyncHandler(completeMeeting),
);
meetingRoutes.get("/:meetingId", isAuthenticated, asyncHandler(getMeetingById));
export default meetingRoutes;
