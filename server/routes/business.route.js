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
} from "../controllers/business.controller.js";
import { asynHandler } from "../utils/asyncHandler.js";
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
  asynHandler(getBusinessById),
);
businessRoutes.post(
  "/updateBusiness/:id",
  isAuthenticated,
  upload.single("BusinessThumbnail"),
  editBusinessByid,
);

businessRoutes.delete(
  "/deleteBusiness/:BusinessId",
  isAuthenticated,
  asynHandler(deleteBusinessById),
);
businessRoutes.get("/all", isAuthenticated, asynHandler(getAllBusiness));
businessRoutes.get("/search", isAuthenticated, asynHandler(searchBusinesses));
businessRoutes.get("/filter", asynHandler(filertBusiness));
export default businessRoutes;
