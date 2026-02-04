import React, { useState } from "react";
import Card from "@/components/Card";
import {
  useFilterBusinessQuery,
  useGetAllBusinessQuery,
} from "@/api/BusinessApi";
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
import SidebarMobile from "@/components/SidebarMobile";

const BrowseBusinesses = () => {
  const [filters, setFilters] = useState({
    listingType: "",
    category: "",
    location: "",
  });

  const [debouncedFilters, setDebouncedFilters] = useState(filters);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedFilters(filters);
    }, 500);
    return () => clearTimeout(timer);
  }, [filters]);

  // console.log(filters);
  // console.log(debouncedFilters);
  // const hasActiveFilters =
  //   filters.listingType || filters.category || filters.location;
  const hasActiveFilters =
    debouncedFilters.listingType ||
    debouncedFilters.category ||
    debouncedFilters.location;
  // const {
  //   data: filteredData,
  //   error: filterError,
  //   isLoading: isFilterLoading,
  // } = useFilterBusinessQuery(filters, {
  //   skip: !hasActiveFilters,
  // });
  const {
    data: filteredData,
    error: filterError,
    isLoading: isFilterLoading,
  } = useFilterBusinessQuery(debouncedFilters, {
    skip: !hasActiveFilters,
  });

  const {
    data: allData,
    error: allDataError,
    isLoading: isAllDataLoading,
  } = useGetAllBusinessQuery({
    skip: hasActiveFilters,
  });

  const displayData = hasActiveFilters ? filteredData?.business : allData;
  const isLoading = hasActiveFilters ? isFilterLoading : isAllDataLoading;
  const error = hasActiveFilters ? filterError : allDataError;

  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  }, [error]);

  const resetFilters = () => {
    setFilters({
      listingType: "",
      category: "",
      location: "",
    });
  };

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

              {/* Reset Filters */}
              <button
                onClick={resetFilters}
                className="w-full bg-[#8d99ae]/10 hover:bg-[#8d99ae]/20 text-[#2b2d42] py-3 px-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
              >
                <X className="w-4 h-4" />
                Reset Filters
              </button>
            </div>
          </aside>

          {/* Mobile Filters */}
          {showMobileFilters && (
            <SidebarMobile
              setShowMobileFilters={setShowMobileFilters}
              filters={filters}
              setFilters={setFilters}
              resetFilters={resetFilters}
            />
          )}

          {/* Mobile Filter Button */}
          <button
            className="lg:hidden fixed bottom-6 right-6 z-30 bg-gradient-to-r from-[#d90429] to-[#ef233c] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform"
            onClick={() => setShowMobileFilters(true)}
          >
            <Filter className="w-6 h-6" />
          </button>

          {/* Main Content */}
          <main className="flex-1">
            <div className="bg-white rounded-2xl shadow-md p-6 mb-6 border-2 border-[#8d99ae]/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-[#d90429]" />
                  <h2 className="text-xl font-bold text-[#2b2d42]">
                    {isLoading
                      ? "Loading..."
                      : `${displayData?.length || 0} Businesses Found`}
                  </h2>
                </div>
              </div>
            </div>

            {isLoading ? (
              <div className="bg-white rounded-2xl shadow-md p-12 text-center border-2 border-[#8d99ae]/10">
                <p className="text-[#8d99ae]">Loading businesses...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {displayData?.map((business) => (
                  <Card key={business._id} {...business} />
                ))}
              </div>
            )}

            {!isLoading && displayData?.length === 0 && (
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
