import React, { useEffect, useMemo } from "react";
import { useRegisterBusinessMutation } from "@/api/BusinessApi";
import { toast } from "sonner";
import { ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Step4ReviewSubmit = ({ formData, prev }) => {
  const navigate = useNavigate();
  const [registerBusiness, { error, isSuccess, isLoading }] =
    useRegisterBusinessMutation();
  const imagePreviewUrl = useMemo(() => {
    if (formData.BusinessThumbnail instanceof File) {
      const url = URL.createObjectURL(formData.BusinessThumbnail);
      return url;
    }
    return null;
  }, [formData.BusinessThumbnail]);

  useEffect(() => {
    return () => {
      if (imagePreviewUrl) {
        URL.revokeObjectURL(imagePreviewUrl);
      }
    };
  }, [imagePreviewUrl]);

  const submitHandler = () => {
    const fd = new FormData();
    fd.append("Businessname", formData.Businessname);
    fd.append("BusinessThumbnail", formData.BusinessThumbnail);
    fd.append("Businessbio", formData.Businessbio);
    fd.append("category", formData.category);
    fd.append("price", formData.price);
    fd.append("location", formData.address?.location || "");
    fd.append("landmark", formData.address?.landmark || "");
    fd.append("pincode", formData.address?.pincode || "");
    fd.append("phoneNumber", formData.phoneNumber);
    registerBusiness(fd);
    console.log(formData);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Business listed successfully 🚀");
      navigate("/business");
    }
    if (error) toast.error(error?.data?.message || "Failed to submit");
  }, [isSuccess, error]);

  return (
    <div className="w-full bg-white rounded-3xl shadow-xl p-8 border-2 border-[#8d99ae]/10">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-gradient-to-br from-[#d90429] to-[#ef233c] p-3 rounded-xl">
          <CheckCircle2 className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-[#2b2d42]">
          Review Your Business
        </h2>
      </div>

      {/* Image Preview */}
      {imagePreviewUrl && (
        <div className="mb-6">
          <img
            src={imagePreviewUrl}
            alt="Business preview"
            className="w-full h-64 object-cover rounded-2xl border-2 border-[#8d99ae]/20"
          />
        </div>
      )}

      {/* Details Grid */}
      <div className="space-y-4 mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#edf2f4]/50 p-4 rounded-xl">
            <p className="text-xs text-[#8d99ae] font-medium mb-1">
              Business Name
            </p>
            <p className="font-bold text-[#2b2d42]">
              {formData.Businessname || "N/A"}
            </p>
          </div>
          <div className="bg-[#edf2f4]/50 p-4 rounded-xl">
            <p className="text-xs text-[#8d99ae] font-medium mb-1">Category</p>
            <p className="font-bold text-[#2b2d42]">
              {formData.category || "N/A"}
            </p>
          </div>
          <div className="bg-[#edf2f4]/50 p-4 rounded-xl">
            <p className="text-xs text-[#8d99ae] font-medium mb-1">Price</p>
            <p className="font-bold text-[#2b2d42]">
              ₹{formData.price || "N/A"}
            </p>
          </div>
          <div className="bg-[#edf2f4]/50 p-4 rounded-xl">
            <p className="text-xs text-[#8d99ae] font-medium mb-1">Phone</p>
            <p className="font-bold text-[#2b2d42]">
              {formData.phoneNumber || "N/A"}
            </p>
          </div>
        </div>

        <div className="bg-[#edf2f4]/50 p-4 rounded-xl">
          <p className="text-xs text-[#8d99ae] font-medium mb-1">Description</p>
          <p className="text-[#2b2d42]">{formData.Businessbio || "N/A"}</p>
        </div>

        <div className="bg-[#edf2f4]/50 p-4 rounded-xl">
          <p className="text-xs text-[#8d99ae] font-medium mb-1">Address</p>
          <p className="text-[#2b2d42]">
            {formData.address?.location || "N/A"},{" "}
            {formData.address?.landmark || "N/A"} -{" "}
            {formData.address?.pincode || "N/A"}
          </p>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={prev}
          className="flex-1 bg-white border-2 border-[#d90429] text-[#d90429] hover:bg-[#d90429] hover:text-white py-4 px-6 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-2 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back
        </button>
        <button
          onClick={submitHandler}
          disabled={isLoading}
          className="flex-1 bg-gradient-to-r from-[#d90429] to-[#ef233c] hover:from-[#ef233c] hover:to-[#d90429] text-white py-4 px-6 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              Submit Business
              <CheckCircle2 className="w-5 h-5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Step4ReviewSubmit;
