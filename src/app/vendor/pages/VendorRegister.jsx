import { useState, useEffect } from "react";
import image from "../../../assets/login/imageLo5.webp";
import CommonInfo from "../pages/vendorRegisterForms/CommonInfo";
import Pandit from "../../vendor/pages/vendorRegisterForms/forms/Pandit";
import Astrologer from "../../vendor/pages/vendorRegisterForms/forms/Astrologer";
import EventOrganizer from "../../vendor/pages/vendorRegisterForms/forms/EventOrganizer";
import PujaSamagriSeller from "../../vendor/pages/vendorRegisterForms/forms/PujaSamagriSeller";
import SpritualGuide from "../../vendor/pages/vendorRegisterForms/forms/SpritualGuide";
import TempleServices from "../../vendor/pages/vendorRegisterForms/forms/TempleServices";
import VedicScholar from "../../vendor/pages/vendorRegisterForms/forms/VedicScholar";
import SpiritualHealer from "../../vendor/pages/vendorRegisterForms/forms/SpiritualHealer";
import SuccessPage from "../../vendor/pages/vendorRegisterForms/SuccessPage";
import { ArrowLeft, CheckCircle, Circle, User, FileText, Home, Mail } from "lucide-react";

const VendorRegister = () => {
  const [step, setStep] = useState(1);
  const [commonData, setCommonData] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Handle CommonInfo completion
  const handleCommonInfoComplete = (data) => {
    console.log("CommonInfo data received:", data);
    setCommonData(data);
    setStep(2); // Move to vendor-specific form
  };

  // Handle form submission from vendor forms
  const handleFormSubmit = () => {
    console.log("Form submitted successfully!");
    setFormSubmitted(true);
    setStep(3); // Move to success page
  };

  // Map category from CommonInfo to vendorType
  const getVendorTypeFromCategory = (category) => {
    if (!category) return "";

    const categoryMap = {
      "Pandit": "pandit",
      "Astrologer": "astrologer",
      "Puja Samagri Seller": "pujaSamagriSeller",
      "Temple Services": "templeServices",
      "Event Organizer": "eventOrganizer",
      "Spiritual Guide": "spritualGuide",
      "Spiritual Healer": "spiritualHealer",
      "Vedic Scholar": "vedicScholar"
    };

    return categoryMap[category] || "";
  };

  // Handle back from vendor form
  const handleBackFromVendorForm = () => {
    setStep(1); // Go back to CommonInfo
  };

  // Get vendor type from commonData
  const vendorType = commonData ? getVendorTypeFromCategory(commonData.category) : "";

  // Get step title based on category
  const getStepTitle = () => {
    if (step === 1) return "Basic Information";
    if (step === 2 && vendorType) {
      const titleMap = {
        "pandit": "Pandit Details",
        "astrologer": "Astrologer Details",
        "pujaSamagriSeller": "Puja Samagri Seller Details",
        "templeServices": "Temple Services Details",
        "eventOrganizer": "Event Organizer Details",
        "spritualGuide": "Spiritual Guide Details",
        "spiritualHealer": "Spiritual Healer Details",
        "vedicScholar": "Vedic Scholar Details"
      };
      return titleMap[vendorType] || "Vendor Details";
    }
    return "Registration";
  };

  // Desktop Back Button - Only show on step 2 for vendor forms
  const DesktopBackButton = () => {
    if (step === 2) {
      return (
        <button
          onClick={handleBackFromVendorForm}
          className="hidden lg:flex items-center gap-2 absolute top-6 right-6 z-30 px-5 py-2.5 bg-white/95  rounded-xl shadow-lg hover:bg-white transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 text-gray-700 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-semibold text-gray-700">Back to Basic Info</span>
        </button>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-6">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={image}
          alt="Divine Nature"
          className="w-full h-full object-cover"
        />
        {/* Clean gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-black/10 to-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20"></div>
      </div>

      {/* Main Card Container */}
      <div className="relative z-20 w-full max-w-4xl mx-auto ">
        {/* Card with background image */}
        <div className="bg-white/95   rounded-sm shadow-2xl border-2 border-white/80 overflow-hidden">
          {/* Card Background with your image */}
          <div className="absolute inset-0 z-0  rounded-sm overflow-hidden">
            <img
              src={image}
              alt="Card Background"
              className="w-full h-full object-cover "
            />
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 via-orange-300/25 to-amber-400/20"></div>
          </div>

          {/* Card Content */}
          <div className="relative z-10">
            {/* Progress Steps - Top Section */}
            <div className="p-6 lg:p-8 border-b border-white/40 bg-gradient-to-r from-white/40 to-white/20 ">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="mb-6 lg:mb-0">
                  <div className="flex items-center gap-3">
                    <div className="w-[74px] h-[74px] rounded-xl flex items-center justify-center bg-gradient-to-br from-orange-400 to-amber-400 ring-2 ring-orange-300/70 shadow-lg">
                      <img src="/logo.png" alt="logo" className="w-14 h-14" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800"> Registration</h2>
                      <p className="text-sm text-gray-600">Join Our Divine Community</p>
                    </div>
                  </div>
                </div>

                {/* Progress Steps */}
<div className="flex items-center justify-between lg:justify-end gap-3">
  {[1, 2, 3].map((s) => (
    <div key={s} className="flex items-center gap-3">
      
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
          step >= s
            ? "bg-gradient-to-br from-orange-400 to-amber-500 border-orange-300 shadow-lg"
            : "bg-white/80 border-gray-300"
        }`}
      >
        {step > s ? (
          <CheckCircle className="w-6 h-6 text-white" />
        ) : step === s ? (
          <FileText className="w-6 h-6 text-white" />
        ) : (
          <Circle className="w-6 h-6 text-gray-400" />
        )}
      </div>

      <div className="hidden sm:block">
        <p className="text-sm font-medium text-gray-700">
          Step {s}
        </p>

        <p className="text-xs text-gray-500">
          {s === 1 && "Basic Info"}
     
{s === 2 && (
  step === 2 && commonData?.category ? (
    <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold 
                     bg-gradient-to-r from-amber-400 to-orange-500 
                     text-white">
      {commonData.category}
    </span>
  ) : (
    <span className="text-xs text-gray-500">
      Vendor Details
    </span>
  )
)}



          {s === 3 && "Complete"}
        </p>
      </div>

      {s < 3 && (
        <div className="hidden lg:block w-10 h-px bg-gray-400/80"></div>
      )}
    </div>
  ))}
</div>

              </div>

              {/* Progress Bar */}
              <div className="mt-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[18px] font-medium text-gray-700">
                    {step === 1 ? "Basic Information" : step === 2 ? getStepTitle() : "Registration Complete"}
                  </span>
                  <span className="text-sm font-semibold text-orange-600">
                    {step === 1 ? "33%" : step === 2 ? "66%" : "100%"}
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full transition-all duration-500 rounded-full"
                    style={{
                      width: step === 1 ? "33%" : step === 2 ? "66%" : "100%",
                      background:
                        step === 3
                          ? "linear-gradient(90deg, #22c55e, #16a34a)"
                          : "linear-gradient(90deg, #f59e0b, #fbbf24)",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Form Section - Middle */}
            <div className="p-2 lg:p-0">
              {/* Desktop Back Button */}
              {/* {step === 2 && (
                <button
                  onClick={handleBackFromVendorForm}
                  className="hidden lg:flex items-center gap-2 mb-6 px-4 py-2 text-orange-600 hover:text-orange-700 transition-colors group"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  <span className="text-sm font-medium">Back to Basic Information</span>
                </button>
              )} */}

              {/* Mobile Step Indicator */}
              <div className="lg:hidden mb-6">
                <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border border-orange-100">
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      Step {step} of 3: {step === 1 ? "Basic Info" : step === 2 ? getStepTitle() : "Complete"}
                    </p>
                    <p className="text-xs text-gray-600">
                      {step === 1 ? "Fill in your basic details" : step === 2 ? "Provide vendor specific information" : "Registration successful!"}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className={`w-3 h-3 rounded-full ${step >= 1 ? "bg-orange-500" : "bg-gray-300"}`} />
                    <div className={`w-3 h-3 rounded-full ${step >= 2 ? "bg-orange-500" : "bg-gray-300"}`} />
                    <div className={`w-3 h-3 rounded-full ${step >= 3 ? "bg-green-500" : "bg-gray-300"}`} />
                  </div>
                </div>
              </div>

              {/* Form Content */}
              <div className="min-h-[400px]">
                {/* STEP 1: Common Information */}
                {step === 1 && (
                  <CommonInfo onComplete={handleCommonInfoComplete} />
                )}

                {/* STEP 2: Vendor Specific Form */}
                {step === 2 && commonData && (
                  <>
                    {vendorType === "pandit" && (
                      <Pandit
                        commonData={commonData}
                        onBack={handleBackFromVendorForm}
                        onSubmit={handleFormSubmit}
                      />
                    )}

                    {vendorType === "astrologer" && (
                      <Astrologer
                        commonData={commonData}
                        onBack={handleBackFromVendorForm}
                        onSubmit={handleFormSubmit}
                      />
                    )}

                    {vendorType === "eventOrganizer" && (
                      <EventOrganizer
                        commonData={commonData}
                        onBack={handleBackFromVendorForm}
                        onSubmit={handleFormSubmit}
                      />
                    )}

                    {vendorType === "pujaSamagriSeller" && (
                      <PujaSamagriSeller
                        commonData={commonData}
                        onBack={handleBackFromVendorForm}
                        onSubmit={handleFormSubmit}
                      />
                    )}

                    {vendorType === "spritualGuide" && (
                      <SpritualGuide
                        commonData={commonData}
                        onBack={handleBackFromVendorForm}
                        onSubmit={handleFormSubmit}
                      />
                    )}

                    {vendorType === "templeServices" && (
                      <TempleServices
                        commonData={commonData}
                        onBack={handleBackFromVendorForm}
                        onSubmit={handleFormSubmit}
                      />
                    )}

                    {vendorType === "vedicScholar" && (
                      <VedicScholar
                        commonData={commonData}
                        onBack={handleBackFromVendorForm}
                        onSubmit={handleFormSubmit}
                      />
                    )}

                    {vendorType === "spiritualHealer" && (
                      <SpiritualHealer
                        commonData={commonData}
                        onBack={handleBackFromVendorForm}
                        onSubmit={handleFormSubmit}
                      />
                    )}

                    {/* Fallback if no vendor type found */}
                    {!vendorType && (
                      <div className="bg-white/80  rounded-xl p-8 text-center border border-white/60">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Category Not Found</h2>
                        <p className="text-gray-600 mb-6">Selected category: {commonData.category}</p>
                        <button
                          onClick={handleBackFromVendorForm}
                          className="px-6 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg hover:from-orange-600 hover:to-amber-600 transition-all shadow-lg"
                        >
                          Go Back
                        </button>
                      </div>
                    )}
                  </>
                )}

                {/* STEP 3: Success Page */}
                {step === 3 && <SuccessPage />}
              </div>
            </div>

            {/* Footer Section - Bottom */}
            <div className="p-6 border-t border-white/40 bg-gradient-to-r from-white/30 to-white/20 ">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-sm text-gray-600 text-center sm:text-left">
                  Need help? Contact{" "}
                  <a
                    href="mailto:support@acharyaji.online"
                    className="text-orange-600 hover:text-orange-700 font-medium"
                  >
                    support@acharyaji.online
                  </a>
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span>Secure & Encrypted Registration</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorRegister;
