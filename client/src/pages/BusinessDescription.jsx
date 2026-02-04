import React from "react";
import {
  ArrowLeft,
  MapPin,
  Mail,
  Phone,
  Tag,
  DollarSign,
  User,
  Navigation,
  Clock,
  Star,
  Share2,
  Heart,
  Building2,
  CheckCircle2,
  Loader2,
  IndianRupee,
  Delete,
  Trash,
  Hand,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetBusinessByIdQuery,
  useUpdateStatusMutation,
} from "@/api/BusinessApi";
import { useSelector } from "react-redux";

const BusinessDescription = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useSelector((store) => store.auth.user);
  const { data, isLoading, error } = useGetBusinessByIdQuery(id);
  const [
    updateStatus,
    { data: updateStatusData, isLoading: updateStatusIsLoading },
  ] = useUpdateStatusMutation();
  const isOwner = user?._id == data?.Business?.owner._id;
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin" size={48} />
        <p className="ml-4">Loading business details...</p>
      </div>
    );
  }
  console.log(updateStatusData);
  const sold = async () => {
    await updateStatus(id);
  };
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600">Error!</h2>
          <p className="mt-2">
            {error?.data?.message || "Failed to load business"}
          </p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 bg-blue-500 text-white px-6 py-2 rounded"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const business = data?.Business;

  return (
    <div className="min-h-screen bg-[#edf2f4] font-display">
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center gap-2 text-gray-600 hover:text-[#d90429] transition-colors font-medium"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Listings
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-[#8d99ae]/10">
          <div className="relative h-[400px] lg:h-[500px]">
            <img
              src={business?.BusinessThumbnail}
              alt={business?.Businessname}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2b2d42]/80 via-[#2b2d42]/30 to-transparent" />

            <div className="absolute top-6 right-6">
              <button className="bg-white/95 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-[#d90429] hover:text-white transition-all hover:scale-110 group">
                <Share2 className="w-5 h-5 text-[#2b2d42] group-hover:text-white" />
              </button>
            </div>
            <div className="absolute top-6 left-6">
              <span className="inline-flex items-center gap-2 bg-[#d90429] text-[#edf2f4] px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                <Building2 className="w-4 h-4" />
                {business?.category}
              </span>
            </div>
            <div className="absolute top-20 left-6">
              <span className="inline-flex items-center gap-2 bg-[#8d99ae] text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                <Clock className="w-4 h-4" />
                {business?.createdAt.split("T")[0]}
              </span>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
              <h1 className="text-4xl lg:text-5xl font-bold text-[#edf2f4] mb-3 drop-shadow-2xl">
                {business?.Businessname}
              </h1>
              <div className="flex items-center gap-2 text-[#edf2f4]">
                <MapPin className="w-5 h-5" />
                <span className="text-lg font-medium">
                  {business?.address?.location}
                </span>
              </div>
            </div>
          </div>

          <div className="p-8 lg:p-12">
            <div className="mb-8 p-6 bg-gradient-to-br from-[#ef233c]/5 to-[#d90429]/5 rounded-2xl border-2 border-[#d90429]/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#8d99ae] mb-1">
                    Price
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-[#d90429]">
                      ₹{parseInt(business.price).toLocaleString()}
                    </span>
                    {/* <span className="text-[#8d99ae] font-medium">
                      / project
                    </span> */}
                  </div>
                </div>
                <div className="bg-[#d90429] p-4 rounded-xl shadow-md">
                  <IndianRupee className="w-8 h-8 text-[#edf2f4]" />
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#2b2d42] mb-4 flex items-center gap-3">
                <div className="w-1.5 h-8 bg-[#d90429] rounded-full" />
                About This Business
              </h2>
              <p className="text-[#2b2d42]/80 leading-relaxed text-lg">
                {business?.Businessbio}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gradient-to-br from-[#edf2f4] to-white p-6 rounded-2xl border-2 border-[#8d99ae]/20 hover:border-[#d90429]/30 transition-all">
                <div className="flex items-start gap-4">
                  <div className="bg-[#d90429] p-3 rounded-xl shrink-0">
                    <Navigation className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-[#2b2d42] mb-3 text-lg">
                      Location Details
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-[#8d99ae] font-medium mb-1">
                          Address
                        </p>
                        <p className="text-[#2b2d42] font-semibold">
                          {business?.address.location}
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-[#8d99ae] font-medium mb-1">
                            Landmark
                          </p>
                          <p className="text-[#2b2d42]">
                            {business?.address.landmark}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-[#8d99ae] font-medium mb-1">
                            Pincode
                          </p>
                          <p className="text-[#2b2d42] font-mono font-semibold">
                            {business?.address.pincode}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#edf2f4] to-white p-6 rounded-2xl border-2 border-[#8d99ae]/20 hover:border-[#d90429]/30 transition-all">
                <div className="flex items-start gap-4">
                  <div className="bg-[#d90429] p-3 rounded-xl shrink-0">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-[#2b2d42] mb-3 text-lg">
                      Contact Information
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-[#8d99ae] font-medium mb-1">
                          Owner
                        </p>
                        <p className="text-[#2b2d42] font-semibold text-lg">
                          {business?.owner?.name}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-[#8d99ae]/20">
                        <Mail className="w-5 h-5 text-[#d90429]" />
                        <span className="text-[#2b2d42] font-medium text-sm">
                          {business?.owner?.email}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-[#8d99ae]/20">
                        <Phone className="w-5 h-5 text-[#d90429]" />
                        <span className="text-[#2b2d42] font-medium font-mono">
                          {business.phoneNumber}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {!isOwner ? (
              <div className="flex flex-col sm:flex-row gap-6 mt-8">
                <button className="flex-1 bg-[#d90429] hover:bg-[#ef233c] text-[#edf2f4] py-4 px-8 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-3">
                  <Phone className="w-5 h-5" />
                  Contact Now
                </button>
                <button className="flex-1 bg-white border-2 border-[#d90429] text-[#d90429] hover:bg-[#d90429] hover:text-white py-4 px-8 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-3">
                  <Mail className="w-5 h-5" />
                  Send Inquiry
                </button>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-6 mt-8">
                <button className="cursor-pointer flex-1 bg-[#d90429] hover:bg-[#ef233c] text-[#edf2f4] py-4 px-8 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-3">
                  <Trash className="w-5 h-5" />
                  Delete
                </button>

                <button
                  disabled={updateStatusIsLoading}
                  onClick={sold}
                  className="cursor-pointer flex-1 bg-white border-2 border-[#d90429] text-[#d90429] hover:bg-[#d90429] hover:text-white py-4 px-8 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-3"
                >
                  <Hand className="w-5 h-5" />
                  Sold
                </button>
              </div>
            )}

            <div className="mt-8 pt-8 border-t-2 border-[#8d99ae]/20">
              <div className="flex flex-wrap items-center justify-center gap-8 text-center">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#d90429]" />
                  <span className="text-[#2b2d42] font-semibold">
                    Verified Business
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#d90429]" />
                  <span className="text-[#2b2d42] font-semibold">
                    Quick Response
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-[#d90429] fill-[#d90429]" />
                  <span className="text-[#2b2d42] font-semibold">
                    Trusted by 1000+ Clients
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-white border-t-2 border-[#8d99ae]/20 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <p className="text-[#2b2d42] font-medium">
            © 2025 <span className="font-bold text-[#d90429]">BizLink</span>.
            All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default BusinessDescription;
