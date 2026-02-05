import Card from "@/components/Card";
import {
  User2,
  Mail,
  MapPin,
  Calendar,
  Briefcase,
  TrendingUp,
  Settings,
  LogOut,
  Edit,
  Star,
  Award,
  BadgeCheck,
  Building2,
  Phone,
  Clock,
  BarChart3,
  Eye,
  Heart,
  Share2,
} from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const MyProfile = () => {
  const user = useSelector((store) => store.auth.user);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("businesses");
  const stats = [
    {
      icon: Building2,
      label: "Total Listings",
      value: user?.businesses?.length || 0,
      color: "from-[#d90429] to-[#ef233c]",
      bgColor: "bg-red-50",
    },
    {
      icon: Eye,
      label: "Profile Views",
      value: "2.4K",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#edf2f4] via-white to-[#edf2f4] font-display">
      <div className="relative overflow-hidden bg-gradient-to-r from-[#2b2d42] via-[#2b2d42] to-[#8d99ae] pt-24 pb-32">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 -left-4 w-96 h-96 bg-[#d90429] rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-0 -right-4 w-96 h-96 bg-[#ef233c] rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-[#8d99ae] rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#d90429] to-[#ef233c] rounded-full blur-lg opacity-75 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative">
                  {user?.profilePicture ? (
                    <img
                      src={user?.profilePicture}
                      alt={user?.name}
                      className="w-32 h-32 lg:w-40 lg:h-40 rounded-full object-cover border-4 border-white shadow-xl"
                    />
                  ) : (
                    <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-full bg-gradient-to-br from-[#d90429] to-[#ef233c] flex items-center justify-center border-4 border-white shadow-xl">
                      <span className="text-5xl font-bold text-white">
                        {user?.name?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  <button className="absolute bottom-2 right-2 bg-white hover:bg-[#d90429] text-[#2b2d42] hover:text-white p-2.5 rounded-full shadow-lg transition-all hover:scale-110 group">
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
                <div className="absolute -top-2 -right-2 bg-blue-500 rounded-full p-1 shadow-lg">
                  <BadgeCheck className="w-6 h-6 text-white" />
                </div>
              </div>

              <div className="flex-1 text-white">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-4xl lg:text-5xl font-bold mb-2 flex items-center gap-3">
                      {user?.name}
                      <Award className="w-8 h-8 text-yellow-400" />
                    </h1>
                  </div>
                  <button className="hidden lg:flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full font-semibold transition-all hover:scale-105 border border-white/20">
                    <Settings className="w-5 h-5" />
                    Settings
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-3 rounded-xl border border-white/20">
                    <Mail className="w-5 h-5 text-[#ef233c]" />
                    <span className="text-sm">{user?.email}</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-3 rounded-xl border border-white/20">
                    <Phone className="w-5 h-5 text-[#ef233c]" />
                    <span className="text-sm">+91 98765 43210</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-3 rounded-xl border border-white/20">
                    <MapPin className="w-5 h-5 text-[#ef233c]" />
                    <span className="text-sm">Bengaluru, Karnataka</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-3 rounded-xl border border-white/20">
                    <Calendar className="w-5 h-5 text-[#ef233c]" />
                    <span className="text-sm">
                      Joined{" "}
                      {new Date().toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>

                {/* <button className="lg:hidden w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full font-semibold transition-all border border-white/20">
                  <Settings className="w-5 h-5" />
                  Settings
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-xl border-2 border-[#8d99ae]/10 hover:border-[#d90429]/30 transition-all hover:shadow-2xl hover:-translate-y-2 duration-300 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`${stat.bgColor} p-3 rounded-xl group-hover:scale-110 transition-transform`}
                  >
                    <Icon
                      className={`w-6 h-6 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                    />
                  </div>
                  <TrendingUp className="w-5 h-5 text-green-500" />
                </div>
                <h3 className="text-3xl font-bold text-[#2b2d42] mb-1">
                  {stat.value}
                </h3>
                <p className="text-[#8d99ae] text-sm font-medium">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-4 mb-8 bg-white rounded-2xl p-2 shadow-lg border-2 border-[#8d99ae]/10">
          <button
            onClick={() => setActiveTab("businesses")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold transition-all ${
              activeTab === "businesses"
                ? "bg-gradient-to-r from-[#d90429] to-[#ef233c] text-white shadow-lg"
                : "text-[#8d99ae] hover:text-[#2b2d42] hover:bg-[#edf2f4]"
            }`}
          >
            <Briefcase className="w-5 h-5" />
            <span className="hidden sm:inline">My Businesses</span>
            <span className="sm:hidden">Businesses</span>
            <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
              {user?.businesses?.length || 0}
            </span>
          </button>
          <button
            onClick={() => setActiveTab("sold")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold transition-all ${
              activeTab === "sold"
                ? "bg-gradient-to-r from-[#d90429] to-[#ef233c] text-white shadow-lg"
                : "text-[#8d99ae] hover:text-[#2b2d42] hover:bg-[#edf2f4]"
            }`}
          >
            <Heart className="w-5 h-5" />
            <span className="hidden sm:inline">Sold</span>
          </button>
          <button
            onClick={() => setActiveTab("analytics")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold transition-all ${
              activeTab === "analytics"
                ? "bg-gradient-to-r from-[#d90429] to-[#ef233c] text-white shadow-lg"
                : "text-[#8d99ae] hover:text-[#2b2d42] hover:bg-[#edf2f4]"
            }`}
          >
            <BarChart3 className="w-5 h-5" />
            <span className="hidden sm:inline">Analytics</span>
          </button>
        </div>

        {activeTab === "businesses" && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">
                <span className="bg-gradient-to-r from-[#d90429] to-[#ef233c] bg-clip-text text-transparent">
                  My Business Listings
                </span>
              </h2>
              <button
                onClick={() => navigate("/ListYourBiz")}
                className="flex items-center gap-2 bg-gradient-to-r from-[#d90429] to-[#ef233c] text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
              >
                <Building2 className="w-5 h-5" />
                Add New Listing
              </button>
            </div>

            {user?.businesses?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {user?.businesses?.map((business) => (
                  <Card key={business._id} {...business} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl shadow-xl p-16 text-center border-2 border-[#8d99ae]/10">
                <div className="bg-gradient-to-br from-[#edf2f4] to-white w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Building2 className="w-12 h-12 text-[#8d99ae]" />
                </div>
                <h3 className="text-2xl font-bold text-[#2b2d42] mb-3">
                  No Businesses Yet
                </h3>
                <p className="text-[#8d99ae] mb-8 max-w-md mx-auto">
                  Start your entrepreneurial journey by listing your first
                  business. It only takes a few minutes!
                </p>
                <button
                  onClick={() => navigate("/create-business")}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-[#d90429] to-[#ef233c] text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                >
                  <Building2 className="w-5 h-5" />
                  Create Your First Listing
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === "sold" && (
          <div className="bg-white rounded-3xl shadow-xl p-16 text-center border-2 border-[#8d99ae]/10">
            <div className="bg-gradient-to-br from-pink-50 to-white w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-12 h-12 text-pink-500" />
            </div>
            <h3 className="text-2xl font-bold text-[#2b2d42] mb-3">
              No Saved Businesses
            </h3>
            <p className="text-[#8d99ae] mb-8 max-w-md mx-auto">
              Save businesses you're interested in to view them later. Start
              exploring now!
            </p>
            <button
              onClick={() => navigate("/business")}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#d90429] to-[#ef233c] text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
            >
              <Building2 className="w-5 h-5" />
              Browse Businesses
            </button>
          </div>
        )}

        {activeTab === "analytics" && (
          <div className="bg-white rounded-3xl shadow-xl p-16 text-center border-2 border-[#8d99ae]/10">
            <div className="bg-gradient-to-br from-blue-50 to-white w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <BarChart3 className="w-12 h-12 text-blue-500" />
            </div>
            <h3 className="text-2xl font-bold text-[#2b2d42] mb-3">
              Analytics Coming Soon
            </h3>
            <p className="text-[#8d99ae] max-w-md mx-auto">
              Get insights into your listing performance, views, and engagement
              metrics.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
