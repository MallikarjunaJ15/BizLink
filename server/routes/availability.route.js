import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  getAvailability,
  getAvailableSlots,
  setAvailability,
} from "../controllers/OwnerAvailability.controller.js";

const availabilityRoutes = express.Router();
availabilityRoutes.post(
  "/set/:businessId",
  isAuthenticated,
  asyncHandler(setAvailability),
);

availabilityRoutes.get(
  "/:businessId",
  isAuthenticated,
  asyncHandler(getAvailability),
);
availabilityRoutes.get(
  "/availableSlots",
  isAuthenticated,
  asyncHandler(getAvailableSlots),
);
export default availabilityRoutes;
