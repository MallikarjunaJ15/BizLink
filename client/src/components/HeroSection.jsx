import React from "react";
import {
  Search,
  TrendingUp,
  Shield,
  Users,
  ArrowRight,
  Building2,
  Sparkles,
  CheckCircle2,
  Store,
  Briefcase,
  MapPin,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const stats = [
    { icon: Building2, value: "500+", label: "Active Listings" },
    { icon: Users, value: "10K+", label: "Happy Customers" },
    { icon: Shield, value: "100%", label: "Verified Businesses" },
  ];

  const features = [
    "Direct owner connections",
    "No broker fees",
    "Verified listings only",
    "Quick response time",
  ];

  const navigate = useNavigate();
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#edf2f4] via-white to-[#edf2f4] font-display">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#d90429]/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#ef233c]/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#d90429]/10 to-[#ef233c]/10 border-2 border-[#d90429]/20 rounded-full px-4 py-2">
              <Sparkles className="w-4 h-4 text-[#d90429]" />
              <span className="text-sm font-bold text-[#2b2d42]">
                #1 Platform for Business Owners
              </span>
            </div>

            <div>
              <h1 className="text-5xl lg:text-6xl font-black text-[#2b2d42] leading-tight mb-4">
                Sell or Rent Your Business.
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d90429] to-[#ef233c]">
                  {" "}
                  No Brokers.
                </span>
              </h1>
              <p className="text-xl text-[#8d99ae] font-medium leading-relaxed">
                Discover businesses for sale, lease, or vacant spaces directly
                from owners. Connect, negotiate, and close deals faster than
                ever.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#d90429] shrink-0" />
                  <span className="text-sm font-medium text-[#2b2d42]">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate("/business")}
                className="group bg-gradient-to-r from-[#d90429] to-[#ef233c] hover:from-[#ef233c] hover:to-[#d90429] text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all flex items-center gap-2"
              >
                <Store className="w-5 h-5" />
                Browse Businesses
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => navigate("/ListYourBiz")}
                className="group bg-white border-2 border-[#d90429] text-[#d90429] hover:bg-[#d90429] hover:text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
              >
                <Briefcase className="w-5 h-5" />
                List Your Business
              </button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8 border-t-2 border-[#8d99ae]/20">
              {stats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div key={idx} className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <div className="bg-gradient-to-br from-[#d90429]/10 to-[#ef233c]/10 p-2 rounded-lg">
                        <Icon className="w-5 h-5 text-[#d90429]" />
                      </div>
                    </div>
                    <div className="text-2xl font-black text-[#2b2d42]">
                      {stat.value}
                    </div>
                    <div className="text-sm text-[#8d99ae] font-medium">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative">
            <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-[#8d99ae]/10 relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-br from-[#d90429] to-[#ef233c] p-3 rounded-xl">
                  <Search className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#2b2d42]">
                  Find Your Perfect Business
                </h3>
              </div>

            
              <div className="space-y-4">
          
                <div className="relative rounded-2xl">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8d99ae]" />
                  <input
                    type="text"
                    placeholder="What business are you looking for?"
                    className="w-full pl-12 pr-4 py-4 border-2 border-[#8d99ae]/30 rounded-2xl text-[#2b2d42] placeholder:text-[#8d99ae] focus:outline-none focus:ring-2 focus:ring-[#d90429] focus:border-[#d90429] transition-all"
                  />
                </div>

                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8d99ae]" />
                  <input
                    type="text"
                    placeholder="Enter location (city, area)"
                    className="w-full pl-12 pr-4 py-4 border-2 border-[#8d99ae]/30 rounded-2xl text-[#2b2d42] placeholder:text-[#8d99ae] focus:outline-none focus:ring-2 focus:ring-[#d90429] focus:border-[#d90429] transition-all"
                  />
                </div>

            
                <select className="w-full px-4 py-4 border-2 border-[#8d99ae]/30 rounded-2xl text-[#2b2d42] focus:outline-none focus:ring-2 focus:ring-[#d90429] focus:border-[#d90429] transition-all">
                  <option>Select Category</option>
                  <option>Restaurant & Food</option>
                  <option>Retail Store</option>
                  <option>IT Services</option>
                  <option>Manufacturing</option>
                  <option>Healthcare</option>
                </select>

             
                <button className="w-full bg-gradient-to-r from-[#d90429] to-[#ef233c] hover:from-[#ef233c] hover:to-[#d90429] text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2">
                  Search Businesses
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-6 pt-6 border-t-2 border-[#8d99ae]/10">
                <p className="text-xs text-[#8d99ae] font-semibold mb-3">
                  POPULAR SEARCHES
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Restaurants", "Retail Shops", "IT Companies", "Cafes"].map(
                    (tag, idx) => (
                      <button
                        key={idx}
                        className="px-4 py-2 bg-[#edf2f4] hover:bg-gradient-to-r hover:from-[#d90429] hover:to-[#ef233c] text-[#2b2d42] hover:text-white rounded-full text-sm font-medium transition-all"
                      >
                        {tag}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>


            <div className="absolute -top-12 -right-6 bg-white rounded-2xl shadow-xl p-4 border-2 border-[#8d99ae]/10 animate-float z-0">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-[#d90429]/10 to-[#ef233c]/10 p-2 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-[#d90429]" />
                </div>
                <div>
                  <div className="text-sm font-bold text-[#2b2d42]">
                    150+ New
                  </div>
                  <div className="text-xs text-[#8d99ae]">This Week</div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-16 -left-6 bg-white rounded-2xl shadow-xl p-4 border-2 border-[#8d99ae]/10 animate-float-delayed z-0">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-[#d90429]/10 to-[#ef233c]/10 p-2 rounded-lg">
                  <Shield className="w-6 h-6 text-[#d90429]" />
                </div>
                <div>
                  <div className="text-sm font-bold text-[#2b2d42]">
                    100% Verified
                  </div>
                  <div className="text-xs text-[#8d99ae]">Trusted Sellers</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes float-delayed {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 3s ease-in-out infinite 1s;
        }
      `}</style>
    </div>
  );
};

export default HeroSection;
