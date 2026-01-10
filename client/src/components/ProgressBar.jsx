import React, { useState, useMemo } from "react";
import { Building2, Tag, MapPin, CheckCircle2 } from "lucide-react";

const ProgressBar = ({ step }) => {
  const steps = [
    { number: 1, title: "Basic Info", icon: Building2 },
    { number: 2, title: "Category", icon: Tag },
    { number: 3, title: "Contact", icon: MapPin },
    { number: 4, title: "Review", icon: CheckCircle2 },
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between relative">
        <div className="absolute top-6 left-0 right-0 h-1 bg-[#8d99ae]/20 -z-10" />
        <div
          className="absolute top-6 left-0 h-1 bg-gradient-to-r from-[#d90429] to-[#ef233c] transition-all duration-500 -z-10"
          style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
        />

        {steps.map((s, idx) => {
          const Icon = s.icon;
          const isActive = step >= s.number;
          const isCurrent = step === s.number;

          return (
            <div key={s.number} className="flex flex-col items-center">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-br from-[#d90429] to-[#ef233c] text-white shadow-lg scale-110"
                    : "bg-white border-2 border-[#8d99ae]/30 text-[#8d99ae]"
                } ${isCurrent ? "ring-4 ring-[#d90429]/20 animate-pulse" : ""}`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span
                className={`mt-2 text-xs font-semibold transition-colors ${
                  isActive ? "text-[#2b2d42]" : "text-[#8d99ae]"
                }`}
              >
                {s.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default ProgressBar;
// // Step 1: Basic Info
// const Step1BasicInfo = ({ formData, setFormData, next }) => {
//   const [preview, setPreview] = useState(null);

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFormData({ ...formData, BusinessThumbnail: file });
//       setPreview(URL.createObjectURL(file));
//     }
//   };

//   return (
//     <div className="w-full bg-white rounded-3xl shadow-xl p-8 border-2 border-[#8d99ae]/10">
//       <div className="flex items-center gap-3 mb-6">
//         <div className="bg-gradient-to-br from-[#d90429] to-[#ef233c] p-3 rounded-xl">
//           <Building2 className="w-6 h-6 text-white" />
//         </div>
//         <h2 className="text-2xl font-bold text-[#2b2d42]">Basic Information</h2>
//       </div>

//       {/* File Upload */}
//       <div className="mb-6">
//         <label className="block text-sm font-semibold text-[#2b2d42] mb-2">
//           Business Thumbnail
//         </label>
//         <div className="relative">
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleFileChange}
//             className="hidden"
//             id="file-upload"
//           />
//           <label
//             htmlFor="file-upload"
//             className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-[#d90429]/30 rounded-2xl cursor-pointer bg-[#edf2f4]/50 hover:bg-[#edf2f4] transition-all group"
//           >
//             {preview ? (
//               <img
//                 src={preview}
//                 alt="Preview"
//                 className="w-full h-full object-cover rounded-2xl"
//               />
//             ) : (
//               <>
//                 <Upload className="w-12 h-12 text-[#d90429] mb-2 group-hover:scale-110 transition-transform" />
//                 <p className="text-[#2b2d42] font-medium">
//                   Click to upload image
//                 </p>
//                 <p className="text-xs text-[#8d99ae] mt-1">
//                   PNG, JPG up to 10MB
//                 </p>
//               </>
//             )}
//           </label>
//         </div>
//       </div>

//       {/* Business Name */}
//       <div className="mb-6">
//         <label className="block text-sm font-semibold text-[#2b2d42] mb-2">
//           Business Name
//         </label>
//         <Input
//           type="text"
//           placeholder="Enter your business name"
//           value={formData.Businessname}
//           onChange={(e) =>
//             setFormData({ ...formData, Businessname: e.target.value })
//           }
//         />
//       </div>

//       {/* Business Bio */}
//       <div className="mb-6">
//         <label className="block text-sm font-semibold text-[#2b2d42] mb-2">
//           Business Description
//         </label>
//         <textarea
//           placeholder="Tell us about your business..."
//           className="flex w-full rounded-xl border-2 border-[#8d99ae]/30 bg-white px-4 py-3 text-sm text-[#2b2d42] placeholder:text-[#8d99ae] shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d90429] focus-visible:border-[#d90429] transition-all duration-200 resize-none"
//           rows={6}
//           value={formData.Businessbio}
//           onChange={(e) =>
//             setFormData({ ...formData, Businessbio: e.target.value })
//           }
//         />
//       </div>

//       <button
//         onClick={next}
//         className="w-full bg-gradient-to-r from-[#d90429] to-[#ef233c] hover:from-[#ef233c] hover:to-[#d90429] text-white py-4 px-6 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
//       >
//         Continue
//         <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//       </button>
//     </div>
//   );
// };

// // Step 2: Category & Pricing
// const Step2CategoryPricing = ({ formData, setFormData, next, prev }) => {
//   return (
//     <div className="w-full bg-white rounded-3xl shadow-xl p-8 border-2 border-[#8d99ae]/10">
//       <div className="flex items-center gap-3 mb-6">
//         <div className="bg-gradient-to-br from-[#d90429] to-[#ef233c] p-3 rounded-xl">
//           <Tag className="w-6 h-6 text-white" />
//         </div>
//         <h2 className="text-2xl font-bold text-[#2b2d42]">
//           Category & Pricing
//         </h2>
//       </div>

//       {/* Category */}
//       <div className="mb-6">
//         <label className="block text-sm font-semibold text-[#2b2d42] mb-2">
//           Business Category
//         </label>
//         <div className="relative">
//           <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8d99ae]" />
//           <Input
//             className="pl-12"
//             placeholder="e.g., Restaurant, IT Services, Retail"
//             value={formData.category}
//             onChange={(e) =>
//               setFormData({ ...formData, category: e.target.value })
//             }
//           />
//         </div>
//       </div>

//       {/* Price */}
//       <div className="mb-6">
//         <label className="block text-sm font-semibold text-[#2b2d42] mb-2">
//           Starting Price
//         </label>
//         <div className="relative">
//           <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8d99ae]" />
//           <Input
//             type="text"
//             className="pl-12"
//             placeholder="Enter price range (₹)"
//             value={formData.price}
//             onChange={(e) =>
//               setFormData({ ...formData, price: e.target.value })
//             }
//           />
//         </div>
//         <p className="text-xs text-[#8d99ae] mt-2">
//           Enter the starting price for your services/products
//         </p>
//       </div>

//       <div className="flex gap-4">
//         <button
//           onClick={prev}
//           className="flex-1 bg-white border-2 border-[#d90429] text-[#d90429] hover:bg-[#d90429] hover:text-white py-4 px-6 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-2 group"
//         >
//           <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
//           Back
//         </button>
//         <button
//           onClick={next}
//           className="flex-1 bg-gradient-to-r from-[#d90429] to-[#ef233c] hover:from-[#ef233c] hover:to-[#d90429] text-white py-4 px-6 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
//         >
//           Continue
//           <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//         </button>
//       </div>
//     </div>
//   );
// };

// // Step 3: Contact Info
// const Step3AddressContact = ({ formData, setFormData, next, prev }) => {
//   return (
//     <div className="w-full bg-white rounded-3xl shadow-xl p-8 border-2 border-[#8d99ae]/10">
//       <div className="flex items-center gap-3 mb-6">
//         <div className="bg-gradient-to-br from-[#d90429] to-[#ef233c] p-3 rounded-xl">
//           <MapPin className="w-6 h-6 text-white" />
//         </div>
//         <h2 className="text-2xl font-bold text-[#2b2d42]">
//           Contact Information
//         </h2>
//       </div>

//       {/* Location */}
//       <div className="mb-6">
//         <label className="block text-sm font-semibold text-[#2b2d42] mb-2">
//           Location
//         </label>
//         <div className="relative">
//           <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8d99ae]" />
//           <Input
//             type="text"
//             className="pl-12"
//             placeholder="City, State"
//             value={formData.address.location}
//             onChange={(e) =>
//               setFormData({
//                 ...formData,
//                 address: { ...formData.address, location: e.target.value },
//               })
//             }
//           />
//         </div>
//       </div>

//       {/* Landmark & Pincode */}
//       <div className="grid grid-cols-2 gap-4 mb-6">
//         <div>
//           <label className="block text-sm font-semibold text-[#2b2d42] mb-2">
//             Landmark
//           </label>
//           <div className="relative">
//             <Navigation className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8d99ae]" />
//             <Input
//               type="text"
//               className="pl-12"
//               placeholder="Nearby landmark"
//               value={formData.address.landmark}
//               onChange={(e) =>
//                 setFormData({
//                   ...formData,
//                   address: { ...formData.address, landmark: e.target.value },
//                 })
//               }
//             />
//           </div>
//         </div>
//         <div>
//           <label className="block text-sm font-semibold text-[#2b2d42] mb-2">
//             Pincode
//           </label>
//           <Input
//             type="text"
//             placeholder="000000"
//             value={formData.address.pincode}
//             onChange={(e) =>
//               setFormData({
//                 ...formData,
//                 address: { ...formData.address, pincode: e.target.value },
//               })
//             }
//           />
//         </div>
//       </div>

//       {/* Phone */}
//       <div className="mb-6">
//         <label className="block text-sm font-semibold text-[#2b2d42] mb-2">
//           Phone Number
//         </label>
//         <div className="relative">
//           <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8d99ae]" />
//           <Input
//             type="text"
//             className="pl-12"
//             placeholder="+91 00000 00000"
//             value={formData.phoneNumber}
//             onChange={(e) =>
//               setFormData({ ...formData, phoneNumber: e.target.value })
//             }
//           />
//         </div>
//       </div>

//       <div className="flex gap-4">
//         <button
//           onClick={prev}
//           className="flex-1 bg-white border-2 border-[#d90429] text-[#d90429] hover:bg-[#d90429] hover:text-white py-4 px-6 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-2 group"
//         >
//           <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
//           Back
//         </button>
//         <button
//           onClick={next}
//           className="flex-1 bg-gradient-to-r from-[#d90429] to-[#ef233c] hover:from-[#ef233c] hover:to-[#d90429] text-white py-4 px-6 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
//         >
//           Continue
//           <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//         </button>
//       </div>
//     </div>
//   );
// };

// // Step 4: Review & Submit
// const Step4ReviewSubmit = ({ formData, prev }) => {
//   const [isLoading, setIsLoading] = useState(false);

//   const imagePreviewUrl = useMemo(() => {
//     if (formData.BusinessThumbnail instanceof File) {
//       return URL.createObjectURL(formData.BusinessThumbnail);
//     }
//     return null;
//   }, [formData.BusinessThumbnail]);

//   const submitHandler = () => {
//     setIsLoading(true);
//     // Your submit logic here
//     setTimeout(() => setIsLoading(false), 2000);
//   };

//   return (
//     <div className="w-full bg-white rounded-3xl shadow-xl p-8 border-2 border-[#8d99ae]/10">
//       <div className="flex items-center gap-3 mb-6">
//         <div className="bg-gradient-to-br from-[#d90429] to-[#ef233c] p-3 rounded-xl">
//           <CheckCircle2 className="w-6 h-6 text-white" />
//         </div>
//         <h2 className="text-2xl font-bold text-[#2b2d42]">
//           Review Your Business
//         </h2>
//       </div>

//       {/* Image Preview */}
//       {imagePreviewUrl && (
//         <div className="mb-6">
//           <img
//             src={imagePreviewUrl}
//             alt="Business preview"
//             className="w-full h-64 object-cover rounded-2xl border-2 border-[#8d99ae]/20"
//           />
//         </div>
//       )}

//       {/* Details Grid */}
//       <div className="space-y-4 mb-6">
//         <div className="grid grid-cols-2 gap-4">
//           <div className="bg-[#edf2f4]/50 p-4 rounded-xl">
//             <p className="text-xs text-[#8d99ae] font-medium mb-1">
//               Business Name
//             </p>
//             <p className="font-bold text-[#2b2d42]">
//               {formData.Businessname || "N/A"}
//             </p>
//           </div>
//           <div className="bg-[#edf2f4]/50 p-4 rounded-xl">
//             <p className="text-xs text-[#8d99ae] font-medium mb-1">Category</p>
//             <p className="font-bold text-[#2b2d42]">
//               {formData.category || "N/A"}
//             </p>
//           </div>
//           <div className="bg-[#edf2f4]/50 p-4 rounded-xl">
//             <p className="text-xs text-[#8d99ae] font-medium mb-1">Price</p>
//             <p className="font-bold text-[#2b2d42]">
//               ₹{formData.price || "N/A"}
//             </p>
//           </div>
//           <div className="bg-[#edf2f4]/50 p-4 rounded-xl">
//             <p className="text-xs text-[#8d99ae] font-medium mb-1">Phone</p>
//             <p className="font-bold text-[#2b2d42]">
//               {formData.phoneNumber || "N/A"}
//             </p>
//           </div>
//         </div>

//         <div className="bg-[#edf2f4]/50 p-4 rounded-xl">
//           <p className="text-xs text-[#8d99ae] font-medium mb-1">Description</p>
//           <p className="text-[#2b2d42]">{formData.Businessbio || "N/A"}</p>
//         </div>

//         <div className="bg-[#edf2f4]/50 p-4 rounded-xl">
//           <p className="text-xs text-[#8d99ae] font-medium mb-1">Address</p>
//           <p className="text-[#2b2d42]">
//             {formData.address?.location || "N/A"},{" "}
//             {formData.address?.landmark || "N/A"} -{" "}
//             {formData.address?.pincode || "N/A"}
//           </p>
//         </div>
//       </div>

//       <div className="flex gap-4">
//         <button
//           onClick={prev}
//           className="flex-1 bg-white border-2 border-[#d90429] text-[#d90429] hover:bg-[#d90429] hover:text-white py-4 px-6 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-2 group"
//         >
//           <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
//           Back
//         </button>
//         <button
//           onClick={submitHandler}
//           disabled={isLoading}
//           className="flex-1 bg-gradient-to-r from-[#d90429] to-[#ef233c] hover:from-[#ef233c] hover:to-[#d90429] text-white py-4 px-6 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           {isLoading ? (
//             <>
//               <Loader2 className="w-5 h-5 animate-spin" />
//               Submitting...
//             </>
//           ) : (
//             <>
//               Submit Business
//               <CheckCircle2 className="w-5 h-5" />
//             </>
//           )}
//         </button>
//       </div>
//     </div>
//   );
// };

// // Main Component
// const ListBusiness = () => {
//   const [steps, setSteps] = useState(1);
//   const [formData, setFormData] = useState({
//     Businessname: "",
//     BusinessThumbnail: null,
//     Businessbio: "",
//     price: "",
//     category: "",
//     address: {
//       location: "",
//       landmark: "",
//       pincode: "",
//     },
//     phoneNumber: "",
//   });

//   const next = () => setSteps((s) => s + 1);
//   const prev = () => setSteps((s) => s - 1);

//   return (
//     <div className="min-h-screen bg-[#edf2f4] font-display py-12 px-4">
//       <div className="max-w-3xl mx-auto">
//         <ProgressBar step={steps} />

//         <div className="flex items-center justify-center">
//           {steps === 1 && (
//             <Step1BasicInfo
//               formData={formData}
//               setFormData={setFormData}
//               next={next}
//             />
//           )}
//           {steps === 2 && (
//             <Step2CategoryPricing
//               formData={formData}
//               setFormData={setFormData}
//               next={next}
//               prev={prev}
//             />
//           )}
//           {steps === 3 && (
//             <Step3AddressContact
//               formData={formData}
//               setFormData={setFormData}
//               next={next}
//               prev={prev}
//             />
//           )}
//           {steps === 4 && <Step4ReviewSubmit formData={formData} prev={prev} />}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ListBusiness;
