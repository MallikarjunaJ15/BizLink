import React from "react";
import { Input } from "./ui/input";
import { ArrowLeft, ArrowRight, DollarSign, IndianRupee, Tag } from "lucide-react";

const Step2CategoryPricing = ({ formData, setFormData, next, prev }) => {
  return (
    <div className="w-full bg-white rounded-3xl shadow-xl p-8 border-2 border-[#8d99ae]/10">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-gradient-to-br from-[#d90429] to-[#ef233c] p-3 rounded-xl">
          <Tag className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-[#2b2d42]">
          Category & Pricing
        </h2>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-semibold text-[#2b2d42] mb-2">
          Business Category
        </label>
        <div className="relative">
          <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8d99ae]" />
          <Input
            className="pl-12"
            placeholder="e.g., Restaurant, IT Services, Retail"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-semibold text-[#2b2d42] mb-2">
       Price
        </label>
        <div className="relative">
          <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8d99ae]" />
          <Input
            type="text"
            className="pl-12"
            placeholder="Enter price range (₹)"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
          />
        </div>
        <p className="text-xs text-[#8d99ae] mt-2">
          Enter the selling  or renting price
        </p>
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

export default Step2CategoryPricing;
