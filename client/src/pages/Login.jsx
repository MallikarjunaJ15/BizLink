
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Loader2, Mail, Lock, ArrowRight, CheckCircle2, Shield, Users, TrendingUp } from "lucide-react";
import { useLoginUserMutation } from "@/api/authApi";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    setErrors(""); 
  };

  const [loginUser, { data, error, isLoading, isSuccess }] = useLoginUserMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     await loginUser(input).unwrap();
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
    if (error) {
      setErrors(error?.data?.message || "Either the password or email is incorrect");
    }
  }, [isSuccess, error, navigate]);

  const features = [
    { icon: CheckCircle2, text: "Direct owner connections" },
    { icon: Shield, text: "100% verified businesses" },
    { icon: TrendingUp, text: "Best deals guaranteed" },
  ];

  return (
    <div className="min-h-screen bg-[#edf2f4] font-display flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#2b2d42] to-[#8d99ae] p-12 flex-col justify-between relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#d90429]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#ef233c]/10 rounded-full blur-3xl" />

        {/* Logo */}
        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-gradient-to-r from-[#d90429] to-[#ef233c] p-3 rounded-xl group-hover:scale-110 transition-transform">
              <div className="w-8 h-8 bg-white rounded-lg"></div>
            </div>
            <h1 className="text-3xl font-bold text-white">BizLink</h1>
          </Link>
        </div>

        {/* Main Content */}
        <div className="relative z-10 space-y-8">
          <div>
            <h2 className="text-5xl font-bold text-white mb-4 leading-tight">
              Welcome Back to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d90429] to-[#ef233c]">BizLink</span>
            </h2>
            <p className="text-xl text-[#edf2f4]/80">
              Connect with business owners directly. No middlemen, no hassle.
            </p>
          </div>

          {/* Features */}
          <div className="space-y-4">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={idx} className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="bg-gradient-to-br from-[#d90429] to-[#ef233c] p-2 rounded-lg shrink-0">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-white font-medium">{feature.text}</span>
                </div>
              );
            })}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/20">
            <div>
              <div className="text-3xl font-bold text-white">500+</div>
              <div className="text-sm text-[#edf2f4]/70">Active Listings</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">10K+</div>
              <div className="text-sm text-[#edf2f4]/70">Happy Users</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">100%</div>
              <div className="text-sm text-[#edf2f4]/70">Verified</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 my-6 text-center">
          <p className="text-[#edf2f4]/60 text-sm">
            © 2025 BizLink. All rights reserved.
          </p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-8 text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[#d90429] to-[#ef233c] bg-clip-text text-transparent">
              BizLink
            </h1>
            <p className="text-[#8d99ae] mt-2">Welcome back!</p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-[#8d99ae]/10">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-[#2b2d42] mb-2">Sign In</h2>
              <p className="text-[#8d99ae]">Enter your credentials to access your account</p>
            </div>

            {/* Error Message */}
            {errors && (
              <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl">
                <p className="text-red-600 text-sm font-medium">{errors}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div>
                <label className="block text-sm font-bold text-[#2b2d42] mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8d99ae]" />
                  <Input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={input.email}
                    onChange={handleInputChange}
                    className="pl-12 h-12 border-2 border-[#8d99ae]/30 rounded-2xl focus:ring-2 focus:ring-[#d90429] focus:border-[#d90429] transition-all"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-bold text-[#2b2d42] mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8d99ae]" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={input.password}
                    onChange={handleInputChange}
                    className="pl-12 pr-12 h-12 border-2 border-[#8d99ae]/30 rounded-2xl focus:ring-2 focus:ring-[#d90429] focus:border-[#d90429] transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8d99ae] hover:text-[#2b2d42] transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

          

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-[#d90429] to-[#ef233c] hover:from-[#ef233c] hover:to-[#d90429] text-white h-12 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2 border-[#8d99ae]/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-[#8d99ae] font-medium">or</span>
              </div>
            </div>

            {/* Sign Up Link */}
            <div className="text-center">
              <p className="text-[#2b2d42]">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-[#d90429] hover:text-[#ef233c] font-bold hover:underline transition-colors"
                >
                  Sign up for free
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;