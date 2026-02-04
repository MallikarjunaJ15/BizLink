import React from "react";
import {
  MapPin,
  Building2,
  ArrowRight,
  Calendar,
  IndianRupee,
  Edit,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Card = (business) => {
  const user = useSelector((store) => store.auth.user);
  const isOwner = user._id === business.owner;
  const navigate = useNavigate();
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl border-2 border-[#8d99ae]/10 hover:border-[#d90429]/30 transition-all duration-300 font-display">
      <div className="relative h-48 overflow-hidden">
        <img
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          src={
            business?.BusinessThumbnail ||
            "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400"
          }
          alt="Business"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2b2d42]/60 to-transparent" />

        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center bg-[#d90429] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
            {business?.status}
          </span>
        </div>

        <div className="absolute top-3 right-3">
          <span className="inline-flex items-center gap-1 bg-white/95 backdrop-blur-sm text-[#2b2d42] text-xs font-medium px-3 py-1.5 rounded-full shadow-lg">
            <Calendar className="w-3 h-3" />
            {business?.createdAt?.split("T")[0]}
          </span>
        </div>
      </div>

      <div className="p-5 space-y-3">
        <h2 className="text-lg font-bold text-[#2b2d42] line-clamp-1 group-hover:text-[#d90429] transition-colors">
          {business?.Businessname}
        </h2>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 bg-[#edf2f4] px-3 py-1.5 rounded-lg">
            <Building2 className="w-4 h-4 text-[#8d99ae]" />
            <span className="text-sm font-medium text-[#2b2d42]">
              {business?.category || "General"}
            </span>
          </div>
          <div className="flex items-center gap-1 text-[#d90429] font-bold">
            <IndianRupee className="w-4 h-4" />
            <span className="text-lg">
              {parseInt(business?.price || 0).toLocaleString()}
            </span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#edf2f4]/50 to-white p-3 rounded-xl border border-[#8d99ae]/20">
          <div className="flex items-start gap-2 mb-2">
            <MapPin className="w-4 h-4 text-[#d90429] mt-0.5 shrink-0" />
            <p className="text-sm font-semibold text-[#2b2d42] line-clamp-1">
              {business?.address?.location}
            </p>
          </div>
          <div className="flex items-center justify-between text-xs text-[#8d99ae]">
            <span>{business?.address?.landmark || "N/A"}</span>
            <span className="font-mono font-semibold">
              {business?.address?.pincode || "000000"}
            </span>
          </div>
        </div>

        {isOwner ? (
          <div className="grid grid-cols-2 gap-2">
            {" "}
            <button
              onClick={() => navigate(`/business/description/${business?._id}`)}
              className="bg-gradient-to-r from-[#d90429] to-[#ef233c] hover:from-[#ef233c] hover:to-[#d90429] text-white py-1 px-4 rounded-xl font-bold transition-all shadow-md hover:shadow-xl flex items-center justify-center gap-2 group/btn"
            >
              View Details
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </button>
            <Link
              to={`/edit/${business._id}`}
              // onClick={() => navigate(`/profile/edit/${business._id}`)}
              className=" bg-gradient-to-r from-[#d90429] to-[#ef233c] hover:from-[#ef233c] hover:to-[#d90429] text-white py-3 px-4 rounded-xl font-bold transition-all shadow-md hover:shadow-xl flex items-center justify-center gap-2 group/btn"
            >
              Edit
              <Edit className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
            {/* <button
              // onClick={() => navigate(`/business/description/${business?._id}`)}
              className="bg-gradient-to-r from-[#d90429] to-[#ef233c] hover:from-[#ef233c] hover:to-[#d90429] text-white py-3 px-4 rounded-xl font-bold transition-all shadow-md hover:shadow-xl flex items-center justify-center gap-2 group/btn"
            >
              Delete
              <Edit className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </button> */}
          </div>
        ) : (
          <button
            onClick={() => navigate(`/business/description/${business?._id}`)}
            className="w-full bg-gradient-to-r from-[#d90429] to-[#ef233c] hover:from-[#ef233c] hover:to-[#d90429] text-white py-3 px-4 rounded-xl font-bold transition-all shadow-md hover:shadow-xl flex items-center justify-center gap-2 group/btn"
          >
            View Details
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        )}
      </div>
    </div>
  );
};
export default Card;
