import React from "react";
import { Input } from "./ui/input";
import { ArrowLeft, ArrowRight, MapPin, Navigation, Phone } from "lucide-react";

const Step3AddressContact = ({ formData, setFormData, next, prev }) => {
  return (
    <div className="w-full bg-white rounded-3xl shadow-xl p-8 border-2 border-[#8d99ae]/10">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-gradient-to-br from-[#d90429] to-[#ef233c] p-3 rounded-xl">
          <MapPin className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-[#2b2d42]">
          Contact Information
        </h2>
      </div>

   
      <div className="mb-6">
        <label className="block text-sm font-semibold text-[#2b2d42] mb-2">
          Location
        </label>
        <div className="relative">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8d99ae]" />
          <Input
            type="text"
            className="pl-12"
            placeholder="Enter complete adress"
            value={formData.address.location}
            onChange={(e) =>
              setFormData({
                ...formData,
                address: { ...formData.address, location: e.target.value },
              })
            }
          />
        </div>
      </div>

      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-semibold text-[#2b2d42] mb-2">
            Landmark
          </label>
          <div className="relative">
            <Navigation className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8d99ae]" />
            <Input
              type="text"
              className="pl-12"
              placeholder="Nearby landmark"
              value={formData.address.landmark}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  address: { ...formData.address, landmark: e.target.value },
                })
              }
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-[#2b2d42] mb-2">
            Pincode
          </label>
          <Input
            type="text"
            placeholder="000000"
            value={formData.address.pincode}
            onChange={(e) =>
              setFormData({
                ...formData,
                address: { ...formData.address, pincode: e.target.value },
              })
            }
          />
        </div>
      </div>


      <div className="mb-6">
        <label className="block text-sm font-semibold text-[#2b2d42] mb-2">
          Phone Number
        </label>
        <div className="relative">
          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8d99ae]" />
          <Input
            type="text"
            className="pl-12"
            placeholder="+91 00000 00000"
            value={formData.phoneNumber}
            onChange={(e) =>
              setFormData({ ...formData, phoneNumber: e.target.value })
            }
          />
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
          onClick={next}
          className="flex-1 bg-gradient-to-r from-[#d90429] to-[#ef233c] hover:from-[#ef233c] hover:to-[#d90429] text-white py-4 px-6 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
        >
          Next
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default Step3AddressContact;
