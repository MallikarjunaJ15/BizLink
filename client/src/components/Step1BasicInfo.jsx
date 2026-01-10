import React, { useState } from "react";
import { Input } from "./ui/input";
import { ArrowRight, Building2, Upload } from "lucide-react";

const Step1BasicInfo = ({ formData, setFormData, next }) => {
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, BusinessThumbnail: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="w-full bg-white rounded-3xl shadow-xl p-8 border-2 border-[#8d99ae]/10">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-gradient-to-br from-[#d90429] to-[#ef233c] p-3 rounded-xl">
          <Building2 className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-[#2b2d42]">Basic Information</h2>
      </div>

      {/* File Upload */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-[#2b2d42] mb-2">
          Business Thumbnail
        </label>
        <div className="relative">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-[#d90429]/30 rounded-2xl cursor-pointer bg-[#edf2f4]/50 hover:bg-[#edf2f4] transition-all group"
          >
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover rounded-2xl"
              />
            ) : (
              <>
                <Upload className="w-12 h-12 text-[#d90429] mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-[#2b2d42] font-medium">
                  Click to upload image
                </p>
                <p className="text-xs text-[#8d99ae] mt-1">
                  PNG, JPG up to 5MB
                </p>
              </>
            )}
          </label>
        </div>
      </div>

      {/* Business Name */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-[#2b2d42] mb-2">
          Business Name
        </label>
        <Input
          type="text"
          placeholder="Enter your business name"
          value={formData.Businessname}
          onChange={(e) =>
            setFormData({ ...formData, Businessname: e.target.value })
          }
        />
      </div>

      {/* Business Bio */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-[#2b2d42] mb-2">
          Business Description
        </label>
        <textarea
          placeholder="Tell us about your business..."
          className="flex w-full rounded-2xl border-2 border-[#8d99ae]/30 bg-white px-4 py-3 text-sm text-[#2b2d42] placeholder:text-[#8d99ae] shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d90429] focus-visible:border-[#d90429] transition-all duration-200 resize-none"
          rows={6}
          value={formData.Businessbio}
          onChange={(e) =>
            setFormData({ ...formData, Businessbio: e.target.value })
          }
        />
      </div>

      <button
        onClick={next}
        className="w-full bg-gradient-to-r from-[#d90429] to-[#ef233c] hover:from-[#ef233c] hover:to-[#d90429] text-white py-4 px-6 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
      >
        Next
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
};

export default Step1BasicInfo;
