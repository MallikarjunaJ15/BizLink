import ProgressBar from "../components/ProgressBar";
import Step1BasicInfo from "@/components/Step1BasicInfo";
import Step2CategoryPricing from "@/components/Step2CategoryPricing";
import Step3AddressContact from "@/components/Step3AddressContact";
import Step4ReviewSubmit from "@/components/Step4ReviewSubmit";
import React, { useState } from "react";

const ListBusiness = () => {
  const [steps, setSteps] = useState(1);

  const [formData, setFormData] = useState({
    Businessname: "",
    BusinessThumbnail: null,
    Businessbio: "",
    price: "",
    category: "",
    address: {
      location: "",
      landmark: "",
      pincode: "",
    },
    phoneNumber: "",
    listingType: "",
  });

  const next = () => setSteps((s) => s + 1);
  const prev = () => setSteps((s) => s - 1);

  return (
    // <div className="bg-[#edf2f4]  font-display min-h-screen bg-linear-to-t from-red-500 from-[-110%] to-white to-84% w-full ">
    <div className="bg-[#edf2f4]  font-display min-h-screen bg-linear-to-br from-red-100 to-sky-100">
      <div className={" max-w-3xl mx-auto p-10"}>
        <ProgressBar step={steps} />
        <div className="flex items-center justify-center">
          {steps == 1 && (
            <Step1BasicInfo
              formData={formData}
              setFormData={setFormData}
              next={next}
            />
          )}
          {steps == 2 && (
            <Step2CategoryPricing
              formData={formData}
              setFormData={setFormData}
              next={next}
              prev={prev}
            />
          )}
          {steps == 3 && (
            <Step3AddressContact
              formData={formData}
              setFormData={setFormData}
              next={next}
              prev={prev}
            />
          )}
          {steps == 4 && (
            <Step4ReviewSubmit
              formData={formData}
              setFormData={setFormData}
              prev={prev}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ListBusiness;
