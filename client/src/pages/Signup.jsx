// import React, { useRef, useState, useEffect } from "react";
// import { Input } from "@/components/ui/input";
// import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
// import { Edit, Loader } from "lucide-react";
// import { useRegisterUserMutation } from "@/api/authApi";
// import { Link, useNavigate } from "react-router-dom";

// const Signup = () => {
//   const fileInputRef = useRef(null);
//   const navigate = useNavigate();
//   const [seletectedImage, setSelectedIamge] = useState(
//     "https://github.com/shadcn.png"
//   );
//   const [errors, setErrors] = useState({});
//   const handleEditClick = () => {
//     fileInputRef.current.click();
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const previewUrl = URL.createObjectURL(file);
//       setSelectedIamge(previewUrl);
//     }
//   };
//   const [input, setInput] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });
//   const handleInputChange = (e) => {
//     setInput({ ...input, [e.target.name]: e.target.value });
//   };

//   const [registerUser, { isLoading, isSuccess }] = useRegisterUserMutation();
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const newErrors = {};
//     if (!input.name.trim()) newErrors.name = "Full name is required";
//     if (!input.email.includes("@")) newErrors.email = "Enter a valid email";
//     if (input.password.length < 6)
//       newErrors.password = "Password must be at least 6 characters";
//     if (input.password.length > 12)
//       newErrors.password = "Password must be less than 12 characters";
//     setErrors(newErrors);
//     if (Object.keys(newErrors).length > 0) return;

//     const formData = new FormData();
//     if (fileInputRef.current.files[0]) {
//       formData.append("profilePicture", fileInputRef.current.files[0]);
//     }
//     formData.append("name", input.name);
//     formData.append("email", input.email);
//     formData.append("password", input.password);

//     try {
//       await registerUser(formData).unwrap();
//     } catch (error) {
//       console.error("Registration error:", error);
//     }
//   };

//   useEffect(() => {
//     if (isSuccess) {
//       navigate("/");
//       setInput("");
//     }
//   }, [isSuccess]);

//   return (
//     <div className="flex flex-col justify-between min-h-screen bg-[#edf2f4ff]">
//       {/* Main Form Section */}
//       <div className="flex flex-1 items-center justify-center">
//         <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm flex flex-col items-center gap-6">
//           {/* Avatar */}
//           <div className="relative">
//             <Avatar>
//               <AvatarImage
//                 src={seletectedImage}
//                 className="rounded-full object-cover w-20 h-20"
//               />
//               <AvatarFallback>CN</AvatarFallback>
//             </Avatar>
//             <button
//               onClick={handleEditClick}
//               type="button"
//               className="cursor-pointer absolute -bottom-[6px] -right-1 bg-[#1976d2] p-1 rounded-full text-white hover:scale-110 hover:bg-[#125ea5] transition-all"
//             >
//               <Edit size={10} />
//             </button>
//             <input
//               type="file"
//               className="hidden"
//               ref={fileInputRef}
//               onChange={handleFileChange}
//             />
//           </div>

//           {/* Form */}
//           <form className="w-full flex flex-col gap-5" onSubmit={handleSubmit}>
//             <div>
//               <Input
//                 placeholder="fullname"
//                 name="name"
//                 value={input.name}
//                 onChange={handleInputChange}
//               />
//               {errors.name && (
//                 <p className="text-red-500 text-xs mt-1">{errors.name}</p>
//               )}
//             </div>
//             <div>
//               <Input
//                 type="email"
//                 placeholder="email"
//                 name="email"
//                 value={input.email}
//                 onChange={handleInputChange}
//               />
//               {errors.email && (
//                 <p className="text-red-500 text-xs mt-1">{errors.email}</p>
//               )}
//             </div>
//             <div>
//               <Input
//                 type="password"
//                 placeholder="Password"
//                 name="password"
//                 value={input.password}
//                 onChange={handleInputChange}
//               />
//               {errors.password && (
//                 <p className="text-red-500 text-xs mt-1">{errors.password}</p>
//               )}
//             </div>
//             <button
//               disabled={isLoading}
//               type="submit"
//               className="w-full bg-[#ef233cff] hover:bg-[#d90429ff] text-white py-2 px-4 rounded-full font-medium transition-all shadow-md hover:shadow-lg"
//             >
//               {isLoading ? <Loader className="animate-spin" /> : "Submit"}
//             </button>
//             <div>
//               <p className="font-display text-sm text-center text-[#8d99ae]">
//                 Already have an account{" "}
//                 <Link
//                   to={"/login"}
//                   className="text-[#d90429ff] hover:underline hover:text-blue-500 hover:transition-transform"
//                 >
//                   Login
//                 </Link>
//               </p>
//             </div>
//           </form>
//         </div>
//       </div>
//       <footer className="text-center text-[#2b2d42ff] py-2">
//         <p>
//           All rights reserved &copy;{" "}
//           <span className="font-semibold">BizLink</span>
//         </p>
//       </footer>
//     </div>
//   );
// };

// export default Signup;
import React, { useRef, useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  User,
  Mail,
  Lock,
  Upload,
  Loader2,
  ArrowRight,
  CheckCircle2,
  Shield,
  TrendingUp,
  Camera,
  Eye,
  EyeOff,
} from "lucide-react";
import { useRegisterUserMutation } from "@/api/authApi";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setSelectedImage(previewUrl);
    }
  };

  const handleInputChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    // Clear error for this field when user types
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const [registerUser, { isLoading, isSuccess }] = useRegisterUserMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!input.name.trim()) newErrors.name = "Full name is required";
    if (!input.email.includes("@")) newErrors.email = "Enter a valid email";
    if (input.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (input.password.length > 12)
      newErrors.password = "Password must be less than 12 characters";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const formData = new FormData();
    if (fileInputRef.current.files[0]) {
      formData.append("profilePicture", fileInputRef.current.files[0]);
    }
    formData.append("name", input.name);
    formData.append("email", input.email);
    formData.append("password", input.password);

    try {
      await registerUser(formData).unwrap();
    } catch (error) {
      console.error("Registration error:", error);
      setErrors({ submit: error?.data?.message || "Registration failed" });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess, navigate]);

  const features = [
    { icon: CheckCircle2, text: "Connect directly with owners" },
    { icon: Shield, text: "100% secure & verified" },
    { icon: TrendingUp, text: "Access to premium listings" },
  ];

  // Password strength indicator
  const getPasswordStrength = () => {
    const len = input.password.length;
    if (len === 0) return { strength: "", color: "" };
    if (len < 6) return { strength: "Weak", color: "text-red-500" };
    if (len < 10) return { strength: "Medium", color: "text-yellow-500" };
    return { strength: "Strong", color: "text-green-500" };
  };

  const passwordStrength = getPasswordStrength();

  return (
    <div className="min-h-screen bg-[#edf2f4] font-display flex">
      {/* Left Side - Branding (Same as Login) */}
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
              Start Your Journey with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d90429] to-[#ef233c]">
                BizLink
              </span>
            </h2>
            <p className="text-xl text-[#edf2f4]/80">
              Join thousands of business owners buying and selling directly.
            </p>
          </div>

          {/* Features */}
          <div className="space-y-4">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
                >
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
        <div className="relative z-10">
          <p className="text-[#edf2f4]/60 text-sm text-center">
            © 2025 BizLink. All rights reserved.
          </p>
        </div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-8 text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[#d90429] to-[#ef233c] bg-clip-text text-transparent">
              BizLink
            </h1>
            <p className="text-[#8d99ae] mt-2">Create your account</p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-[#8d99ae]/10">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-[#2b2d42] mb-2">
                Create Account
              </h2>
              <p className="text-[#8d99ae]">
                Join BizLink and start connecting today
              </p>
            </div>

            {/* Profile Picture Upload */}
            <div className="flex justify-center mb-8">
              <div className="relative group">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#8d99ae]/20 group-hover:border-[#d90429]/50 transition-all bg-[#edf2f4]">
                  {selectedImage ? (
                    <img
                      src={selectedImage}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User className="w-12 h-12 text-[#8d99ae]" />
                    </div>
                  )}
                </div>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  type="button"
                  className="absolute bottom-0 right-0 bg-gradient-to-r from-[#d90429] to-[#ef233c] p-2 rounded-full text-white hover:scale-110 transition-all shadow-lg"
                >
                  <Camera className="w-4 h-4" />
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>
            </div>

            {/* Error Message */}
            {errors.submit && (
              <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl">
                <p className="text-red-600 text-sm font-medium">
                  {errors.submit}
                </p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Input */}
              <div>
                <label className="block text-sm font-bold text-[#2b2d42] mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8d99ae]" />
                  <Input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    value={input.name}
                    onChange={handleInputChange}
                    className="pl-12 h-12 border-2 border-[#8d99ae]/30 rounded-2xl focus:ring-2 focus:ring-[#d90429] focus:border-[#d90429] transition-all"
                    required
                  />
                </div>
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <span>⚠</span> {errors.name}
                  </p>
                )}
              </div>

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
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <span>⚠</span> {errors.email}
                  </p>
                )}
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
                    placeholder="Create a strong password"
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
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <span>⚠</span> {errors.password}
                  </p>
                )}
                {/* Password Strength */}
                {input.password && passwordStrength.strength && (
                  <p
                    className={`text-xs mt-1 font-semibold ${passwordStrength.color}`}
                  >
                    Password strength: {passwordStrength.strength}
                  </p>
                )}
              </div>

              {/* Terms & Conditions */}
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  className="mt-1 w-4 h-4 rounded border-2 border-[#8d99ae]/30 text-[#d90429] focus:ring-[#d90429]"
                />
                <span className="text-sm text-[#2b2d42]">
                  I agree to the{" "}
                  <Link
                    to="/terms"
                    className="text-[#d90429] hover:text-[#ef233c] font-semibold"
                  >
                    Terms & Conditions
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/privacy"
                    className="text-[#d90429] hover:text-[#ef233c] font-semibold"
                  >
                    Privacy Policy
                  </Link>
                </span>
              </label>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-[#d90429] to-[#ef233c] hover:from-[#ef233c] hover:to-[#d90429] text-white h-12 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  <>
                    Create Account
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
                <span className="px-4 bg-white text-[#8d99ae] font-medium">
                  or
                </span>
              </div>
            </div>

            {/* Login Link */}
            <div className="text-center">
              <p className="text-[#2b2d42]">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-[#d90429] hover:text-[#ef233c] font-bold hover:underline transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
