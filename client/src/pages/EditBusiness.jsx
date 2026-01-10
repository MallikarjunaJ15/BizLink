import React, { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  Save,
  X,
  Building2,
  FileText,
  DollarSign,
  MapPin,
  Navigation,
  Phone,
  Upload,
  ImageIcon,
  AlertCircle,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useEditBusinessMutation,
  useGetBusinessByIdQuery,
} from "@/api/BusinessApi";
import { SkeletonCard } from "@/components/SkeletonCard";
import { toast } from "sonner";

const EditBusiness = () => {
  const navigate = useNavigate();
  const fileRef = useRef(null);
  const { id } = useParams();
  const [editBusiness, { isSuccess, error }] = useEditBusinessMutation(id);
  useEffect(() => {
    if (isSuccess) {
      toast.success(
        data?.result?.message || "Business updated successfully! 🎉"
      );
      navigate(`/business/description/${id}`);
    }
    if (error) {
      toast.error(error?.data?.message || "Failed to update business");
    }
  }, [isSuccess, error]);
  const [preview, setPreview] = useState();
  const [originalData, setOriginalData] = useState(null);
  const [inputData, setInputData] = useState({
    BusinessThumbnail: null,
    Businessname: "",
    location: "",
    pincode: "",
    phoneNumber: "",
    price: "",
    Businessbio: "",
  });
  const { data, isLoading } = useGetBusinessByIdQuery(id);
  useEffect(() => {
    if (data?.Business) {
      const business = data?.Business;
      const initialData = {
        BusinessThumbnail: null,
        Businessname: business.Businessname || "",
        location: business?.address?.location || "",
        pincode: business?.address?.pincode || "",
        phoneNumber: business?.phoneNumber || "",
        price: business?.price || "",
        Businessbio: business?.Businessbio,
      };
      setOriginalData(initialData);
      setInputData(initialData);
    }
  }, [data]);
  if (isLoading) {
    return (
      <>
        <SkeletonCard />
      </>
    );
  }

  const business = data?.Business;
  const upload = () => {
    fileRef.current.click();
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setInputData({ ...inputData, BusinessThumbnail: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const reset = () => {
    if (originalData) {
      setInputData(originalData);
      setPreview(null);
    }
  };

  const dissable = originalData === inputData;
  const save = async () => {
    const formData = new FormData();
    formData.append("Businessname", inputData.Businessname);
    formData.append("BusinessThumbnail", inputData.BusinessThumbnail);
    console.log(inputData.BusinessThumbnail);
    formData.append("location", inputData.location);
    formData.append("pincode", inputData.pincode);
    formData.append("phoneNumber", inputData.phoneNumber);
    formData.append("price", inputData.price);
    formData.append("Businessbio", inputData.Businessbio);

    await editBusiness({ id, formData }).unwrap();

    console.log(inputData);
  };

  return (
    <div className="min-h-screen bg-[#edf2f4] font-display py-8">
      <div className="max-w-full mx-auto px-4">
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center gap-2 text-[#2b2d42] hover:text-[#d90429] transition-colors font-semibold mb-4"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to My Businesses
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-[#2b2d42] mb-2">
                Edit Business
              </h1>
              <p className="text-[#8d99ae] text-lg">
                Update your business information
              </p>
            </div>
            {/* <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 bg-white border-2 border-[#8d99ae] text-[#2b2d42] hover:bg-[#8d99ae]/10 px-6 py-3 rounded-xl font-bold transition-all shadow-md">
                <X className="w-5 h-5" />
                Cancel
              </button>
              <button className="flex items-center gap-2 bg-gradient-to-r from-[#d90429] to-[#ef233c] hover:from-[#ef233c] hover:to-[#d90429] text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl">
                <Save className="w-5 h-5" />
                Save Changes
              </button>
            </div> */}
          </div>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-3xl  border-2 border-[#8d99ae]/10 overflow-hidden">
          {/* Business Thumbnail Section */}
          <div className="bg-gradient-to-r from-[#2b2d42] to-[#8d99ae] p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                <ImageIcon className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">Business Image</h2>
            </div>

            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex-shrink-0">
                <div className="relative group">
                  <img
                    src={business.BusinessThumbnail}
                    alt="Business"
                    className="w-64 h-48 object-cover rounded-2xl border-4 border-white/20 shadow-xl"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-center justify-center">
                    <Upload className="w-12 h-12 text-white" />
                  </div>
                </div>
                <p className="text-xs text-white/70 mt-2 text-center">
                  Current Image
                </p>
              </div>

              <div className="flex-1">
                <input
                  type="file"
                  className="hidden"
                  ref={fileRef}
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <div
                  className={`h-64 border-2 border-dashed border-white/30 rounded-2xl ${
                    preview ? "p-0" : "p-8"
                  } bg-white/10 backdrop-blur-sm hover:bg-white/15 transition-all cursor-pointer`}
                >
                  {preview ? (
                    <img
                      src={preview}
                      alt=""
                      className="w-full h-full  object-cover  rounded-2xl"
                    />
                  ) : (
                    <div className="text-center" onClick={upload}>
                      <Upload className="w-12 h-12 text-white mx-auto mb-4" />
                      <p className="text-white font-bold text-lg mb-2">
                        Click to upload new image
                      </p>
                      <p className="text-white/70 text-sm mb-4">
                        or drag and drop
                      </p>
                      <p className="text-white/50 text-xs">
                        PNG, JPG up to 10MB
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="p-8 space-y-8">
            {/* Business Information Section */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-br from-[#d90429] to-[#ef233c] p-3 rounded-xl">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-[#2b2d42]">
                  Business Information
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Business Name */}
                <div>
                  <label className="block text-sm font-bold text-[#2b2d42] mb-2">
                    Business Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Enter business name"
                    value={inputData.Businessname}
                    onChange={(e) => {
                      setInputData({
                        ...inputData,
                        Businessname: e.target.value,
                      });
                    }}
                    className="w-full px-4 py-3 border-2 border-[#8d99ae]/30 rounded-2xl text-[#2b2d42] placeholder:text-[#8d99ae] focus:outline-none focus:ring-2 focus:ring-[#d90429] focus:border-[#d90429] transition-all"
                  />
                </div>

                {/* Price */}
                <div>
                  <label className="block text-sm font-bold text-[#2b2d42] mb-2">
                    Price (₹) *
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8d99ae]" />
                    <input
                      type="text"
                      placeholder="Enter price"
                      value={inputData.price}
                      onChange={(e) => {
                        setInputData({ ...inputData, price: e.target.value });
                      }}
                      className="w-full pl-12 pr-4 py-3 border-2 border-[#8d99ae]/30 rounded-2xl text-[#2b2d42] placeholder:text-[#8d99ae] focus:outline-none focus:ring-2 focus:ring-[#d90429] focus:border-[#d90429] transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Business Bio */}
              <div className="mt-6">
                <label className="block text-sm font-bold text-[#2b2d42] mb-2">
                  Business Description *
                </label>
                <div className="relative">
                  <FileText className="absolute left-4 top-4 w-5 h-5 text-[#8d99ae]" />
                  <textarea
                    placeholder="Tell us about your business..."
                    value={inputData.Businessbio}
                    onChange={(e) => {
                      setInputData({
                        ...inputData,
                        Businessbio: e.target.value,
                      });
                    }}
                    rows={6}
                    className="w-full pl-12 pr-4 py-3 border-2 border-[#8d99ae]/30 rounded-2xl text-[#2b2d42] placeholder:text-[#8d99ae] focus:outline-none focus:ring-2 focus:ring-[#d90429] focus:border-[#d90429] transition-all resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t-2 border-[#8d99ae]/10"></div>

            {/* Location Information Section */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-br from-[#d90429] to-[#ef233c] p-3 rounded-xl">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-[#2b2d42]">
                  Location Details
                </h2>
              </div>

              <div className="space-y-6">
                {/* Location */}
                <div>
                  <label className="block text-sm font-bold text-[#2b2d42] mb-2">
                    Location *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8d99ae]" />
                    <input
                      type="text"
                      placeholder="City, State"
                      value={inputData.location}
                      onChange={(e) => {
                        setInputData({
                          ...inputData,
                          location: e.target.value,
                        });
                      }}
                      className="w-full pl-12 pr-4 py-3 border-2 border-[#8d99ae]/30 rounded-2xl text-[#2b2d42] placeholder:text-[#8d99ae] focus:outline-none focus:ring-2 focus:ring-[#d90429] focus:border-[#d90429] transition-all"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Pincode */}
                  <div>
                    <label className="block text-sm font-bold text-[#2b2d42] mb-2">
                      Pincode *
                    </label>
                    <div className="relative">
                      <Navigation className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8d99ae]" />
                      <input
                        type="text"
                        placeholder="000000"
                        value={inputData.pincode}
                        onChange={(e) => {
                          setInputData({
                            ...inputData,
                            pincode: e.target.value,
                          });
                        }}
                        className="w-full pl-12 pr-4 py-3 border-2 border-[#8d99ae]/30 rounded-2xl text-[#2b2d42] placeholder:text-[#8d99ae] focus:outline-none focus:ring-2 focus:ring-[#d90429] focus:border-[#d90429] transition-all"
                      />
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-sm font-bold text-[#2b2d42] mb-2">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8d99ae]" />
                      <input
                        type="text"
                        placeholder="+91 00000 00000"
                        value={inputData.phoneNumber}
                        onChange={(e) => {
                          setInputData({
                            ...inputData,
                            phoneNumber: e.target.value,
                          });
                        }}
                        className="w-full pl-12 pr-4 py-3 border-2 border-[#8d99ae]/30 rounded-2xl text-[#2b2d42] placeholder:text-[#8d99ae] focus:outline-none focus:ring-2 focus:ring-[#d90429] focus:border-[#d90429] transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Info Banner */}
            <div className="bg-gradient-to-r from-[#d90429]/5 to-[#ef233c]/5 border-2 border-[#d90429]/20 rounded-xl p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-[#d90429] mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-[#2b2d42] mb-1">
                  Important Information
                </p>
                <p className="text-sm text-[#8d99ae]">
                  Fields marked with * are required. Make sure all information
                  is accurate before saving changes.
                </p>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="bg-[#edf2f4] p-6 flex items-center justify-between border-t-2 border-[#8d99ae]/10">
            <p className="text-sm text-[#8d99ae]">
              Last updated:
              <span className="font-semibold text-[#2b2d42]">
                {business?.updatedAt?.split("T")[0]}
              </span>
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={reset}
                className="flex items-center gap-2 bg-white border-2 border-[#8d99ae] text-[#2b2d42] hover:bg-[#8d99ae]/10 px-6 py-3 rounded-2xl font-bold transition-all shadow-md"
              >
                <X className="w-5 h-5" />
                Cancel
              </button>
              <button
                onClick={save}
                disabled={dissable}
                className={`flex items-center gap-2 ${
                  dissable
                    ? "bg-gradient-to-r from-[#d90427a5] to-[#ef233b8a]"
                    : "bg-gradient-to-r from-[#d90429] to-[#ef233c] hover:from-[#ef233c] hover:to-[#d90429]"
                } text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-lg hover:shadow-xl`}
              >
                <Save className="w-5 h-5" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBusiness;
