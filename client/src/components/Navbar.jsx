

import { Menu, X, User, LogOut } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { useLogoutMutation } from "@/api/authApi";
import { useSelector } from "react-redux";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((store) => store.auth.user);
  const [logout] = useLogoutMutation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
  };

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/business", label: "Browse Businesses" },
    { path: "/ListYourBiz", label: "List Business" },
    { path: "/contact", label: "Contact" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className=" bg-white/95 backdrop-blur-md border-b-2 border-[#8d99ae]/10 shadow-sm font-display rounded-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-gradient-to-r from-[#d90429] to-[#ef233c] p-2 rounded-xl group-hover:scale-110 transition-transform">
              <div className="w-6 h-6 bg-white rounded-md"></div>
            </div>
            <h1 className="font-bold text-2xl bg-gradient-to-r from-[#d90429] to-[#ef233c] bg-clip-text text-transparent">
              BizLink
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative text-sm font-semibold transition-colors ${
                  isActive(link.path)
                    ? "text-[#d90429]"
                    : "text-[#2b2d42] hover:text-[#d90429]"
                }`}
              >
                {link.label}
                {isActive(link.path) && (
                  <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-[#d90429] to-[#ef233c] rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-2 bg-[#edf2f4] rounded-xl">
                  <Link className=" flex gap-4" to={"/profile"}>
                  <User className="w-4 h-4 text-[#2b2d42]" />
                  <span className="text-sm font-semibold text-[#2b2d42]">
                    {user.name}
                  </span>
                  </Link>
                </div>
                <Button
                  onClick={handleLogout}
                  className="bg-[#d90429] hover:bg-[#ef233c] text-white font-semibold rounded-xl transition-all shadow-md hover:shadow-lg flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Button
                  onClick={() => navigate("/login")}
                  className="bg-white border-2 border-[#8d99ae] hover:border-[#d90429] text-[#2b2d42] hover:text-[#d90429] font-semibold rounded-xl transition-all"
                >
                  Login
                </Button>
                <Button
                  onClick={() => navigate("/register")}
                  className="bg-gradient-to-r from-[#d90429] to-[#ef233c] hover:from-[#ef233c] hover:to-[#d90429] text-white font-semibold rounded-xl transition-all shadow-md hover:shadow-lg"
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-[#edf2f4] transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-[#2b2d42]" />
            ) : (
              <Menu className="w-6 h-6 text-[#2b2d42]" />
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#8d99ae]/20">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    isActive(link.path)
                      ? "bg-gradient-to-r from-[#d90429]/10 to-[#ef233c]/10 text-[#d90429]"
                      : "text-[#2b2d42] hover:bg-[#edf2f4]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 border-t border-[#8d99ae]/20 space-y-2">
                {user ? (
                  <>
                    <div className="px-4 py-2 bg-[#edf2f4] rounded-lg">
                      <span className="text-sm font-semibold text-[#2b2d42]">
                        {user.name || "User"}
                      </span>
                    </div>
                    <Button
                      onClick={handleLogout}
                      className="w-full bg-[#d90429] hover:bg-[#ef233c] text-white font-semibold rounded-xl"
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      onClick={() => {
                        navigate("/login");
                        setMobileMenuOpen(false);
                      }}
                      className="w-full bg-white border-2 border-[#8d99ae] text-[#2b2d42] font-semibold rounded-xl"
                    >
                      Login
                    </Button>
                    <Button
                      onClick={() => {
                        navigate("/register");
                        setMobileMenuOpen(false);
                      }}
                      className="w-full bg-gradient-to-r from-[#d90429] to-[#ef233c] text-white font-semibold rounded-xl"
                    >
                      Sign Up
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
