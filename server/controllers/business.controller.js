import { Businesses } from "../models/business.model.js";
import { User } from "../models/user.model.js";
import formatBufferToDataUri from "../utils/dataUri.js";
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";
import { asynHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
export const createBusiness = asynHandler(async (req, res) => {
  const {
    Businessname,
    Businessbio,
    category,
    location,
    landmark,
    pincode,
    phoneNumber,
    price,
    listingType,
  } = req.body;
  console.log(req.body);
  if (!Businessname || !location || !pincode || !phoneNumber || !listingType) {
    throw new ApiError(401, "Fill in all the fields");
  }

  const BusinessThumbnail = req.file;
  // console.log(BusinessThumbnail)
  if (!BusinessThumbnail) {
    throw new ApiError(401, "Thumbnail is required");
  }
  const buffer = await formatBufferToDataUri(BusinessThumbnail);
  const uploadRes = await uploadMedia(buffer);
  if (!uploadRes) {
    throw new ApiError(500, "Image upload failed");
  }
  const { secure_url } = uploadRes;
  const Business = await Businesses.create({
    Businessname,
    BusinessThumbnail: secure_url,
    price,
    Businessbio,
    category,
    owner: req.id,
    address: { location, landmark, pincode },
    phoneNumber,
    listingType,
  });
  await User.findByIdAndUpdate(req.id, {
    $push: { businesses: Business._id },
  });
  return res.status(200).json({
    message: "Business created successfully",
    Business,
    success: true,
  });
});

export const editBusinessByid = asynHandler(async (req, res) => {
  const { id } = req.params;
  let Business = await Businesses.findById(id);
  if (!Business) throw new ApiError(404, "Business not found");
  const { Businessname, location, pincode, phoneNumber, price, Businessbio } =
    req.body;
  console.log(req.body);
  const thumbail = req.file;
  console.log("File received from multer:", thumbail);
  let BusinessThumbnail = null;
  let secure_url = Business.BusinessThumbnail;
  if (thumbail) {
    if (Business.BusinessThumbnail) {
      const publicId = Business.BusinessThumbnail.split("/")
        .pop()
        .split(".")[0];
      await deleteMediaFromCloudinary(publicId);
    }
    const buffer = await formatBufferToDataUri(thumbail);
    console.log("Buffer generated", buffer);
    BusinessThumbnail = await uploadMedia(buffer);
    if (!BusinessThumbnail) {
      throw new ApiError(500, "Image upload failed");
    }
    secure_url = BusinessThumbnail.secure_url;
  }
  if (Businessname) Business.Businessname = Businessname;
  if (Businessbio) Business.Businessbio = Businessbio;
  if (price) Business.price = price;
  if (phoneNumber) Business.phoneNumber = phoneNumber;
  if (location) Business.address.location = location;
  if (pincode) Business.address.pincode = pincode;
  Business.BusinessThumbnail = secure_url;
  await Business.save();
  return res.status(200).json({
    message: "Business details updted sucessfully",
    Business,
    success: true,
  });
});
export const getBusinessById = asynHandler(async (req, res) => {
  const { id } = req.params;
  const Business = await Businesses.findById(id)
    .populate("owner")
    .select("-password");
  if (!Business) {
    throw new ApiError(404, "The page is unavailable");
  }
  return res.status(200).json({ Business, success: true });
});

export const deleteBusinessById = asynHandler(async (req, res) => {
  const { BusinessId } = req.params;
  const Business = await Businesses.findByIdAndDelete(BusinessId);
  if (!Business) throw new ApiError(404, "Business not found");
  if (Business.owner.toString() !== req.id)
    throw new ApiError(403, "You are not authorized to delete this business");
  if (Business.BusinessThumbnail) {
    const publicId = await Business.BusinessThumbnail.split("/")
      .pop()
      .split(".")[0];
    await deleteMediaFromCloudinary(publicId);
  }
  await Businesses.save();
  await User.findByIdAndUpdate(req.id, {
    $pull: { businesses: Business._id },
  });
  return res.status(200).json({ message: "Business deleted successfully" });
});

export const getAllBusiness = asynHandler(async (req, res) => {
  const business = await Businesses.find({ status: "Active" });
  return res.status(200).json(business);
});

// let query = {};
// if (location) {
//   query["address.location"] = {
//     $regex: location,
//     $options: "i",
//   };
// }
// if (category) {
//   query.category = category;
// }
// if (Businessname) {
//   query.Businessname = {
//     $regex: Businessname,
//     $options: "i",
//   };
// }

export const searchBusinesses = asynHandler(async (req, res) => {
  const { location, Businessname, category } = req.query;
  const searchFilter = {};
  if (location) {
    searchFilter["address.location"] = {
      $regex: location,
      $options: "i",
    };
  }
  const orConditions = [];
  if (Businessname) {
    orConditions.push({
      Businessname: { $regex: Businessname, $options: "i" },
    });
  } 

  if (category) {
    orConditions.push({
      category: { $regex: category, $options: "i" },
    });
  }

  if (orConditions.length > 0) {
    searchFilter.$or = orConditions;
  }

  const businesses = await Businesses.find(searchFilter).sort({
    createdAt: -1,
  });

  res.status(200).json({
    success: true,
    count: businesses.length,
    businesses,
  });
});

