import React, { useState } from "react";
import Card from "@/components/Card";
import { useGetAllBusinessQuery } from "@/api/BusinessApi";
import { useEffect } from "react";
import { toast } from "sonner";
import {
  Building2,
  Filter,
  Search,
  SlidersHorizontal,
  TrendingUp,
  X,
} from "lucide-react";

const BrowseBusinesses = () => {
  const [filters, setFilters] = useState({
    type: "",
    industry: "",
    location: "",
    price: [0, 500000],
  });
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const { data, error } = useGetAllBusinessQuery();
  console.log(data);
  useEffect(() => {
    if (error) {
      toast.error(error?.data.message || "Something went wrong");
    }
  }, [error]);

  return (
    <div className="min-h-screen bg-[#edf2f4] font-display">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#2b2d42] to-[#8d99ae] text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">
            Discover Your Next Business
          </h1>
          <p className="text-[#edf2f4]/90 text-lg">
            Browse hundreds of verified businesses for sale, rent, or lease
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-6">
          {/* Desktop Sidebar Filters */}
          <aside className="hidden lg:block w-80 shrink-0">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-6 border-2 border-[#8d99ae]/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-br from-[#d90429] to-[#ef233c] p-2.5 rounded-xl">
                  <SlidersHorizontal className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-[#2b2d42]">Filters</h2>
              </div>

              {/* Type Filter */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-[#2b2d42] mb-2">
                  Business Type
                </label>
                <select
                  className="w-full border-2 border-[#8d99ae]/30 rounded-xl p-3 text-[#2b2d42] focus:outline-none focus:ring-2 focus:ring-[#d90429] focus:border-[#d90429] transition-all"
                  onChange={(e) =>
                    setFilters({ ...filters, type: e.target.value })
                  }
                  value={filters.type}
                >
                  <option value="">All Types</option>
                  <option value="sale">For Sale</option>
                  <option value="rent">For Rent</option>
                  <option value="vacant">Vacant Space</option>
                </select>
              </div>

              {/* Industry Filter */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-[#2b2d42] mb-2">
                  Industry
                </label>
                <select
                  className="w-full border-2 border-[#8d99ae]/30 rounded-xl p-3 text-[#2b2d42] focus:outline-none focus:ring-2 focus:ring-[#d90429] focus:border-[#d90429] transition-all"
                  onChange={(e) =>
                    setFilters({ ...filters, industry: e.target.value })
                  }
                  value={filters.industry}
                >
                  <option value="">All Industries</option>
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

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-[#2b2d42] mb-2">
                  Price Range
                </label>
                <input
                  type="range"
                  min="0"
                  max="500000"
                  step="10000"
                  className="w-full h-2 bg-[#8d99ae]/20 rounded-lg appearance-none cursor-pointer accent-[#d90429]"
                  onChange={(e) =>
                    setFilters({ ...filters, price: [0, e.target.value] })
                  }
                  value={filters.price[1]}
                />
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm text-[#8d99ae]">₹0</span>
                  <span className="text-sm font-bold text-[#d90429]">
                    ₹{parseInt(filters.price[1]).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Reset Filters */}
              <button className="w-full bg-[#8d99ae]/10 hover:bg-[#8d99ae]/20 text-[#2b2d42] py-3 px-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2">
                <X className="w-4 h-4" />
                Reset Filters
              </button>
            </div>
          </aside>

          {/* Mobile Filter Button */}
          <button
            className="lg:hidden fixed bottom-6 right-6 z-50 bg-gradient-to-r from-[#d90429] to-[#ef233c] text-white p-4 rounded-full shadow-2xl"
            onClick={() => setShowMobileFilters(!showMobileFilters)}
          >
            <Filter className="w-6 h-6" />
          </button>

          <main className="flex-1">
            <div className="bg-white rounded-2xl shadow-md p-6 mb-6 border-2 border-[#8d99ae]/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-[#d90429]" />
                  <h2 className="text-xl font-bold text-[#2b2d42]">
                    {data?.length} Businesses Found
                  </h2>
                </div>
                <select className="border-2 border-[#8d99ae]/30 rounded-xl px-4 py-2 text-sm font-medium text-[#2b2d42] focus:outline-none focus:ring-2 focus:ring-[#d90429]">
                  <option>Most Recent</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Most Popular</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {data?.map((business) => (
                <Card key={business._id} {...business} />
              ))}
            </div>

            {data?.length === 0 && (
              <div className="bg-white rounded-2xl shadow-md p-12 text-center border-2 border-[#8d99ae]/10">
                <Building2 className="w-16 h-16 text-[#8d99ae] mx-auto mb-4" />
                <h3 className="text-xl font-bold text-[#2b2d42] mb-2">
                  No Businesses Found
                </h3>
                <p className="text-[#8d99ae]">
                  Try adjusting your filters to see more results
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default BrowseBusinesses;
