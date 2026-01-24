import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  Search as SearchIcon,
  MapPin,
  Building2,
  TrendingUp,
  Filter,
  X,
  SlidersHorizontal,
  ArrowRight,
  Loader2,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { useSearchBusinessQuery } from "@/api/BusinessApi";
import Card from "./Card";


const Search = () => {
   const [searchParams] = useSearchParams();
const navigate = useNavigate();
     const Businessname = searchParams.get("Businessname") || "";
     const location = searchParams.get("location") || "";
     const category = searchParams.get("category") || "";

     const hasSearchParams = Businessname || location || category;

     const { data, isLoading, error } = useSearchBusinessQuery(
       { Businessname, location, category },
       { skip: !hasSearchParams },
     );
  
  const clearFilters = () => {
    setLocalFilters({ Businessname: "", location: "", category: "" });
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-[#edf2f4] font-display">
      <div className="bg-gradient-to-r from-[#2b2d42] to-[#8d99ae] text-white py-8 sticky top-0 z-40 shadow-xl">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-1">Search Results</h1>
              <p className="text-[#edf2f4]/80">
                {hasSearchParams ? (
                  <>
                    Showing results for "{Businessname || location || category}"
                  </>
                ) : (
                  <>Start searching to find your perfect business</>
                )}
              </p>
            </div>
            <button
              onClick={() => navigate("/business")}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl transition-all border border-white/20"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
              Back to Browse
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6 border-2 border-[#8d99ae]/10">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-[#d90429] to-[#ef233c] p-3 rounded-xl">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#2b2d42]">
                  {isLoading
                    ? "Searching..."
                    : `${data?.businesses?.length || 0} Results`}
                </h2>
                <p className="text-sm text-[#8d99ae]">
                  {hasSearchParams
                    ? "Matching your criteria"
                    : "No search filters applied"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <select
                value={""}
                onChange={(e) => setSortBy(e.target.value)}
                className="border-2 border-[#8d99ae]/30 rounded-xl px-4 py-2 text-sm font-semibold text-[#2b2d42] focus:outline-none focus:ring-2 focus:ring-[#d90429] transition-all"
              >
                <option value="recent">Most Recent</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="popular">Most Popular</option>
              </select>
              {hasSearchParams && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-2 bg-[#8d99ae]/10 hover:bg-[#8d99ae]/20 text-[#2b2d42] px-4 py-2 rounded-xl font-semibold transition-all"
                >
                  <X className="w-4 h-4" />
                  Clear Filters
                </button>
              )}
            </div>
          </div>
          {hasSearchParams && (
            <div className="mt-4 pt-4 border-t-2 border-[#8d99ae]/10">
              <p className="text-xs text-[#8d99ae] font-semibold mb-2">
                ACTIVE FILTERS:
              </p>
              <div className="flex flex-wrap gap-2">
                {Businessname && (
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#d90429]/10 to-[#ef233c]/10 border border-[#d90429]/30 text-[#2b2d42] px-3 py-1.5 rounded-full text-sm font-medium">
                    <SearchIcon className="w-3 h-3 text-[#d90429]" />
                    Name: {Businessname}
                  </div>
                )}
                {location && (
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#d90429]/10 to-[#ef233c]/10 border border-[#d90429]/30 text-[#2b2d42] px-3 py-1.5 rounded-full text-sm font-medium">
                    <MapPin className="w-3 h-3 text-[#d90429]" />
                    Location: {location}
                  </div>
                )}
                {category && (
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#d90429]/10 to-[#ef233c]/10 border border-[#d90429]/30 text-[#2b2d42] px-3 py-1.5 rounded-full text-sm font-medium">
                    <Building2 className="w-3 h-3 text-[#d90429]" />
                    Category: {category}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-16 h-16 text-[#d90429] animate-spin mb-4" />
            <p className="text-xl font-semibold text-[#2b2d42]">
              Searching businesses...
            </p>
            <p className="text-[#8d99ae] mt-2">This won't take long</p>
          </div>
        ) : error ? (
          <div className="bg-white rounded-2xl shadow-md p-12 text-center border-2 border-red-200">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-[#2b2d42] mb-2">
              Oops! Something went wrong
            </h3>
            <p className="text-[#8d99ae] mb-6">
              We couldn't load the search results. Please try again.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#d90429] to-[#ef233c] text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl"
            >
              <RefreshCw className="w-5 h-5" />
              Retry
            </button>
          </div>
        ) : !data?.businesses?.length ? (
          <div className="bg-white rounded-2xl shadow-md p-12 text-center border-2 border-[#8d99ae]/10">
            <div className="bg-gradient-to-br from-[#d90429]/10 to-[#ef233c]/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
              <SearchIcon className="w-12 h-12 text-[#d90429]" />
            </div>
            <h3 className="text-2xl font-bold text-[#2b2d42] mb-2">
              No Businesses Found
            </h3>
            <p className="text-[#8d99ae] mb-6">
              {hasSearchParams
                ? "Try adjusting your search criteria or filters"
                : "Start searching to discover amazing businesses"}
            </p>
            <div className="flex gap-3 justify-center">
              {hasSearchParams && (
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center gap-2 bg-white border-2 border-[#8d99ae] text-[#2b2d42] hover:bg-[#8d99ae]/10 px-6 py-3 rounded-xl font-bold transition-all"
                >
                  <X className="w-5 h-5" />
                  Clear Filters
                </button>
              )}
              <button
                onClick={() => navigate("/business")}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#d90429] to-[#ef233c] text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl"
              >
                Browse All
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.businesses.map((business) => (
              <Card key={business._id} {...business} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
