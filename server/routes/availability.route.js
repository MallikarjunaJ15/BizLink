import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  getAvailability,
  getAvailableSlots,
  setAvailability,
} from "../controllers/OwnerAvailability.controller.js";
import mongoose from "mongoose";

const availabilityRoutes = express.Router();
const validateObjectId = (req, res, next) => {
  const { businessId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(businessId)) {
    return res.status(400).json({
      success: false,
      error: `Invalid business ID: ${businessId}`,
    });
  }
  next();
};
availabilityRoutes.get(
  "/availableSlots",
  isAuthenticated,
  asyncHandler(getAvailableSlots),
);
availabilityRoutes.post(
  "/set/:businessId",
  isAuthenticated,
  validateObjectId,
  asyncHandler(setAvailability),
);

availabilityRoutes.get(
  "/:businessId",
  isAuthenticated,
  validateObjectId,
  asyncHandler(getAvailability),
);
export default availabilityRoutes;
