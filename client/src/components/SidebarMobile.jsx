import { Search, SlidersHorizontal, X } from "lucide-react";
import React from "react";

const SidebarMobile = ({
  setShowMobileFilters,
  filters,
  setFilters,
  resetFilters,
}) => {
  //        const handleChage = (e) => {
  //     setFilters({ ...filters, [e.target.name]: e.target.value });
  //    };
  return (
    <>
      {/* Backdrop */}
      <div
        className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={() => setShowMobileFilters(false)}
      />

      {/* Mobile Filter Panel */}
      <div className="lg:hidden fixed inset-y-0 right-0 w-80 bg-white z-50 shadow-2xl overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-[#d90429] to-[#ef233c] p-2.5 rounded-xl">
                <SlidersHorizontal className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-[#2b2d42]">Filters</h2>
            </div>
            <button
              onClick={() => setShowMobileFilters(false)}
              className="p-2 hover:bg-[#edf2f4] rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-[#2b2d42]" />
            </button>
          </div>

          {/* Type Filter */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-[#2b2d42] mb-2">
              Business Type
            </label>
            <select
              className="w-full border-2 border-[#8d99ae]/30 rounded-xl p-3 text-[#2b2d42] focus:outline-none focus:ring-2 focus:ring-[#d90429] focus:border-[#d90429] transition-all"
              onChange={(e) =>
                setFilters({ ...filters, listingType: e.target.value })
              }
              value={filters.listingType}
            >
              <option value="">All Types</option>
              <option value="SELL_BUSINESS">In selling</option>
              <option value="RENT_BUSINESS">Rent</option>
              <option value="FRANCHISE">Franchise</option>
              <option value="SELL_ASSETS">Assets</option>
            </select>
          </div>

          {/* Category Filter */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-[#2b2d42] mb-2">
              Category
            </label>
            <select
              className="w-full border-2 border-[#8d99ae]/30 rounded-xl p-3 text-[#2b2d42] focus:outline-none focus:ring-2 focus:ring-[#d90429] focus:border-[#d90429] transition-all"
              onChange={(e) =>
                setFilters({ ...filters, category: e.target.value })
              }
              value={filters.category}
            >
              <option value="">All Categories</option>
              <option value="retail">Retail</option>
              <option value="food">Food & Beverage</option>
              <option value="it">IT Services</option>
              <option value="manufacturing">Manufacturing</option>
            </select>
          </div>

          {/* Location Filter */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-[#2b2d42] mb-2">
              Location
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8d99ae]" />
              <input
                type="text"
                placeholder="Search city or area..."
                className="w-full border-2 border-[#8d99ae]/30 rounded-xl p-3 pl-11 text-[#2b2d42] placeholder:text-[#8d99ae] focus:outline-none focus:ring-2 focus:ring-[#d90429] focus:border-[#d90429] transition-all"
                onChange={(e) =>
                  setFilters({ ...filters, location: e.target.value })
                }
                value={filters.location}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button
              onClick={resetFilters}
              className="w-full bg-[#8d99ae]/10 hover:bg-[#8d99ae]/20 text-[#2b2d42] py-3 px-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
            >
              <X className="w-4 h-4" />
              Reset Filters
            </button>
            {/* <button
              onClick={() => setShowMobileFilters(false)}
              className="w-full bg-gradient-to-r from-[#d90429] to-[#ef233c] hover:from-[#ef233c] hover:to-[#d90429] text-white py-3 px-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl"
            >
              Apply Filters
            </button> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarMobile;
