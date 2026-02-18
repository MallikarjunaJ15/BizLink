import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../utils/multer.js";
import {
  createBusiness,
  deleteBusinessById,
  editBusinessByid,
  filertBusiness,
  getAllBusiness,
  getBusinessById,
  searchBusinesses,
  updateBusinessStatus,
} from "../controllers/business.controller.js";
import { asyncHandler } from "../utils/asyncHandler.js";
const businessRoutes = express.Router();

businessRoutes.post(
  "/create",
  isAuthenticated,
  upload.single("BusinessThumbnail"),
  createBusiness,
);
businessRoutes.get(
  "/business/:id",
  isAuthenticated,
  asyncHandler(getBusinessById),
);
businessRoutes.post(
  "/updateBusiness/:id",
  isAuthenticated,
  upload.single("BusinessThumbnail"),
  editBusinessByid,
);

businessRoutes.delete(
  "/deleteBusiness/:id",
  isAuthenticated,
  asyncHandler(deleteBusinessById),
);
businessRoutes.get("/all", isAuthenticated, asyncHandler(getAllBusiness));
businessRoutes.get("/search", isAuthenticated, asyncHandler(searchBusinesses));
businessRoutes.get("/filter", asyncHandler(filertBusiness));
businessRoutes.patch("/updateStatus/:id", asyncHandler(updateBusinessStatus));
export default businessRoutes;
