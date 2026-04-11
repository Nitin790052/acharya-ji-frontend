import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Store, User, Eye, EyeOff, Smartphone, Mail, Lock, UserCircle, ChevronDown, Shield } from "lucide-react";
import { toast } from "react-toastify";

const CommonInfo = ({ onComplete }) => {
  const [role, setRole] = useState("");
  const [category, setCategory] = useState("");

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const roles = [
    { label: "Vendor", value: "vendor", icon: Store },
    { label: "Customer", value: "customer", icon: User },
  ];

  const vendorCategories = [
    "Pandit",
    "Astrologer",
    "Puja Samagri Seller",
    "Temple Services",
    "Event Organizer",
    "Spiritual Guide",
    "Spiritual Healer",
    "Vedic Scholar",
  ];

  /* HANDLERS */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleMobileChange = (e) => {
    setForm({
      ...form,
      mobile: e.target.value.replace(/\D/g, "").slice(0, 10),
    });
  };

  /* VALIDATIONS */
  const isNameValid = form.name.trim().length >= 3;
  const isMobileValid = form.mobile.length === 10;
  const isEmailValid = form.email.includes("@") && form.email.includes(".");
  const isPasswordValid = form.password.length >= 6;
  const isPasswordMatch = form.password === form.confirmPassword;

  const canCommonInfo =
    role &&
    isNameValid &&
    isMobileValid &&
    isEmailValid &&
    isPasswordValid &&
    isPasswordMatch &&
    (role !== "vendor" || category);

  /* SUBMIT */
  const handleCommonInfo = () => {
    if (!canCommonInfo) return;

    const payload = {
      role,
      category: role === "vendor" ? category : null,
      name: form.name,
      mobile: form.mobile,
      email: form.email,
      password: form.password,
    };
    
    console.log("CommonInfo PAYLOAD 👉", payload);
    
    if (onComplete && typeof onComplete === 'function') {
      onComplete(payload);
      toast.success("Information Saved Successfully");
    } else {
      console.error("onComplete prop is missing or not a function");
      toast.error("Failed to proceed. Please try again.");
      return;
    }
    
    resetForm();
  };

  const resetForm = () => {
    setForm({
      name: "",
      mobile: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    
    setRole("");
    setCategory("");
    
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  // Get button text based on role
  const getButtonText = () => {
    if (role === "vendor") {
      return "Continue to Vendor Details";
    } else if (role === "customer") {
      return "Create Customer Account";
    }
    return "Create Account";
  };

  // Handle what happens after form submission
  const handleSubmit = () => {
    if (role === "customer") {
      const payload = {
        role,
        category: null,
        name: form.name,
        mobile: form.mobile,
        email: form.email,
        password: form.password,
      };
      
      console.log("Customer payload:", payload);
      toast.success("Customer account created!");
      navigate("/login");
      resetForm();
    } else if (role === "vendor") {
      handleCommonInfo();
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center ">
      {/* Main Card - Fully Responsive */}
      <div className="w-full max-w-full sm:max-w-lg md:max-w-2xl lg:max-w-4xl">
        <div className="relative bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-[12px] sm:backdrop-blur-[16px] md:backdrop-blur-[20px] 
                        border border-white/60  
                        shadow-[0_10px_30px_-5px_rgba(249,115,22,0.1),inset_0_0_20px_rgba(255,255,255,0.3)] 
                        sm:shadow-[0_15px_40px_-10px_rgba(249,115,22,0.15),inset_0_0_30px_rgba(255,255,255,0.4)]
                        overflow-hidden">
          
          {/* Decorative Elements */}
          <div className="absolute -top-20 -left-20 w-40 h-40 sm:w-60 sm:h-60 bg-gradient-to-br from-orange-400/5 to-amber-400/3 rounded-full blur-xl"></div>
          <div className="absolute -bottom-20 -right-20 w-40 h-40 sm:w-60 sm:h-60 bg-gradient-to-tr from-amber-400/5 to-orange-400/3 rounded-full blur-xl"></div>
          
          <div className="relative z-10 p-4 sm:p-5 md:py-6 md:px-4 lg:py-6 lg:px-7">
            
            {/* Header */}
            <div className="text-center mb-4 sm:mb-5 md:mb-6">
              <h2 className="text-xl sm:text-2xl md:text-2.5xl leading-tight tracking-wide font-semibold text-gray-800 mb-1 sm:mb-1.5">
                Create Account
              </h2>
              <p className="text-[13px] sm:text-[13px] text-gray-600 mb-1 sm:mb-1.5">
                Join our spiritual community
              </p>
              <div className="inline-flex items-center gap-1 px-1 py-0.5 sm:px-3 sm:py-1 bg-gradient-to-r from-amber-50 to-orange-50 rounded-full border border-amber-100">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></div>
                <p className="text-[9px] sm:text-[9px] font-medium text-amber-700">
                  Begin your divine journey today
                </p>
              </div>
            </div>

            {/* Form Grid - Responsive Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              
              {/* Role Selection - Full width on mobile, spans 2 columns on larger */}
              <div className="col-span-1 sm:col-span-2 mb-3 sm:mb-4">
                <label className="block text-xs sm:text-sm font-medium text-gray-800 mb-1.5 sm:mb-2 ml-1">
                  <span className="flex items-center gap-1.5 sm:gap-2">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-md bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                      <span className="text-white text-[10px] sm:text-xs">✓</span>
                    </div>
                    Register As
                  </span>
                </label>
                <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
                  {roles.map((v) => {
                    const Icon = v.icon;
                    return (
                      <button
                        key={v.value}
                        onClick={() => {
                          setRole(v.value);
                          setCategory("");
                        }}
                        className={`flex flex-col items-center p-2 sm:p-2.5 rounded-lg sm:rounded-xl border-2 transition-all duration-200 relative overflow-hidden group ${
                          role === v.value
                            ? "border-orange-500 shadow-md sm:shadow-lg"
                            : "border-gray-300/80 hover:border-orange-400/60"
                        }`}
                        style={{
                          background: role === v.value 
                            ? 'linear-gradient(135deg, rgba(249, 115, 22, 0.08) 0%, rgba(251, 191, 36, 0.08) 100%)'
                            : 'rgba(255,255,255,0.9)'
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center mb-1 sm:mb-1.5 relative z-10 transition-all duration-300 ${
                          role === v.value ? "shadow-sm sm:shadow-md" : ""
                        }`} style={{
                          background: role === v.value 
                            ? 'linear-gradient(135deg, #f97316 0%, #fbbf24 100%)'
                            : 'rgba(243, 244, 246, 0.8)'
                        }}>
                          <Icon size={20} className={role === v.value ? "text-white" : "text-gray-600"} />
                        </div>
                        <span className={`text-xs sm:text-sm font-semibold relative z-10 ${
                          role === v.value ? "text-gray-900" : "text-gray-700"
                        }`}>
                          {v.label}
                        </span>
                        
                        {/* Selected indicator */}
                        {role === v.value && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center shadow-sm sm:shadow-md">
                            <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-white"></div>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Vendor Category */}
              {role === "vendor" && (
                <div className="col-span-1 sm:col-span-2 mb-3 sm:mb-4">
                  <label className="block text-xs sm:text-sm font-medium text-gray-800 mb-1.5 sm:mb-2 ml-1">
                    <span className="flex items-center gap-1.5 sm:gap-2">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-md bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                        <Store size={10} className="text-white" />
                      </div>
                      Vendor Category
                    </span>
                  </label>
                  <div className="relative group">
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-white/90 border-2 border-gray-300/80 rounded-lg sm:rounded-xl px-3 py-2 sm:px-3.5 sm:py-2.5 
                               text-xs sm:text-sm text-gray-900 appearance-none focus:outline-none focus:border-orange-500 
                               focus:ring-2 sm:focus:ring-3 focus:ring-orange-200/50 pr-10 sm:pr-12  
                               group-hover:border-orange-400/60 backdrop-blur-sm"
                      style={{
                        boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
                      }}
                    >
                      <option value="" className="text-gray-500 text-xs sm:text-sm">Select your service category</option>
                      {vendorCategories.map((c) => (
                        <option key={c} value={c} className="text-gray-900 text-xs sm:text-sm">
                          {c}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none transition-transform group-hover:translate-y-[-48%]">
                      <ChevronDown size={14} className="sm:w-5 sm:h-5" />
                    </div>
                    <div className="absolute inset-0 rounded-lg sm:rounded-xl border-2 border-transparent group-hover:border-orange-300/30 pointer-events-none transition-all duration-300"></div>
                  </div>
                  {!category && role === "vendor" && form.email && (
                    <div className="mt-1.5 flex items-center gap-2 px-2 py-1 sm:px-3 sm:py-1.5 bg-red-50/80 rounded-lg border border-red-200">
                      <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-[10px] sm:text-xs">!</span>
                      </div>
                      <p className="text-xs sm:text-sm text-red-700 font-medium">
                        Please select a category to proceed
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Full Name */}
              <div className="mb-2 sm:mb-2.5">
                <label className="block text-xs sm:text-sm font-medium text-gray-800 mb-1.5 sm:mb-1.5 ml-1">
                  <span className="flex items-center gap-1.5 sm:gap-2">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-md bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                      <UserCircle size={10} className="text-white" />
                    </div>
                    Full Name
                  </span>
                </label>
                <div className="relative group">
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full bg-white/90 border-2 border-gray-300/80 rounded-lg sm:rounded-xl 
                             px-3 py-2 sm:px-3.5 sm:py-2.5 text-xs sm:text-sm text-gray-900 
                             placeholder-gray-500 focus:outline-none focus:border-orange-500 
                             focus:ring-2 sm:focus:ring-3 focus:ring-orange-200/50 
                             group-hover:border-orange-400/60 backdrop-blur-sm"
                    style={{
                      boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
                    }}
                  />
                  <div className="absolute inset-0 rounded-lg sm:rounded-xl border-2 border-transparent group-hover:border-orange-300/30 pointer-events-none transition-all duration-300"></div>
                </div>
                {!isNameValid && form.name && (
                  <div className="mt-1.5 flex items-center gap-2 animate-fadeIn">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-[10px] sm:text-xs">!</span>
                    </div>
                    <p className="text-[10px] sm:text-xs text-amber-700 font-medium">
                      Name should be at least 3 characters
                    </p>
                  </div>
                )}
              </div>

              {/* Mobile */}
              <div className="mb-2 sm:mb-2.5">
                <label className="block text-xs sm:text-sm font-medium text-gray-800 mb-1.5 sm:mb-1.5 ml-1">
                  <span className="flex items-center gap-1.5 sm:gap-2">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-md bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                      <Smartphone size={10} className="text-white" />
                    </div>
                    Mobile Number
                  </span>
                </label>
                <div className="relative group">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1 pointer-events-none z-10">
                    <span className="text-xs sm:text-sm font-semibold text-gray-700">+91</span>
                    <div className="w-px h-3 sm:h-4 bg-gray-300"></div>
                  </div>
                  <input
                    value={form.mobile}
                    onChange={handleMobileChange}
                    placeholder="10-digit mobile number"
                    className="w-full bg-white/90 border-2 border-gray-300/80 rounded-lg sm:rounded-xl 
                             px-3 py-2 sm:px-3.5 sm:py-2.5 pl-12 sm:pl-16 text-xs sm:text-sm text-gray-900 
                             placeholder-gray-500 focus:outline-none focus:border-orange-500 
                             focus:ring-2 sm:focus:ring-3 focus:ring-orange-200/50 
                             group-hover:border-orange-400/60 backdrop-blur-sm"
                    style={{
                      boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
                    }}
                  />
                  <div className="absolute inset-0 rounded-lg sm:rounded-xl border-2 border-transparent group-hover:border-orange-300/30 pointer-events-none transition-all duration-300"></div>
                </div>
                {!isMobileValid && form.mobile && (
                  <div className="mt-1.5 flex items-center gap-2 animate-fadeIn">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-[10px] sm:text-xs">!</span>
                    </div>
                    <p className="text-[10px] sm:text-xs text-amber-700 font-medium">
                      Enter valid 10-digit mobile number
                    </p>
                  </div>
                )}
              </div>

              {/* Email */}
              <div className="mb-2 sm:mb-2.5">
                <label className="block text-xs sm:text-sm font-medium text-gray-800 mb-1.5 sm:mb-1.5 ml-1">
                  <span className="flex items-center gap-1.5 sm:gap-2">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-md bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                      <Mail size={10} className="text-white" />
                    </div>
                    Email Address
                  </span>
                </label>
                <div className="relative group">
                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    className="w-full bg-white/90 border-2 border-gray-300/80 rounded-lg sm:rounded-xl 
                             px-3 py-2 sm:px-3.5 sm:py-2.5 text-xs sm:text-sm text-gray-900 
                             placeholder-gray-500 focus:outline-none focus:border-orange-500 
                             focus:ring-2 sm:focus:ring-3 focus:ring-orange-200/50 
                             group-hover:border-orange-400/60 backdrop-blur-sm"
                    style={{
                      boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
                    }}
                  />
                  <div className="absolute inset-0 rounded-lg sm:rounded-xl border-2 border-transparent group-hover:border-orange-300/30 pointer-events-none transition-all duration-300"></div>
                </div>
                {!isEmailValid && form.email && (
                  <div className="mt-1.5 flex items-center gap-2 animate-fadeIn">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-[10px] sm:text-xs">!</span>
                    </div>
                    <p className="text-[10px] sm:text-xs text-amber-700 font-medium">
                      Please enter a valid email address
                    </p>
                  </div>
                )}
              </div>

              {/* Password */}
              <div className="mb-2 sm:mb-2.5">
                <label className="block text-xs sm:text-sm font-medium text-gray-800 mb-1.5 sm:mb-1.5 ml-1">
                  <span className="flex items-center gap-1.5 sm:gap-2">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-md bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                      <Lock size={10} className="text-white" />
                    </div>
                    Password
                  </span>
                </label>
                <div className="relative group">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Create strong password"
                    className="w-full bg-white/90 border-2 border-gray-300/80 rounded-lg sm:rounded-xl 
                             px-3 py-2 sm:px-3.5 sm:py-2.5 pr-10 sm:pr-12 text-xs sm:text-sm text-gray-900 
                             placeholder-gray-500 focus:outline-none focus:border-orange-500 
                             focus:ring-2 sm:focus:ring-3 focus:ring-orange-200/50 
                             group-hover:border-orange-400/60 backdrop-blur-sm"
                    style={{
                      boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
                    }}
                  />
                  <div className="absolute inset-0 rounded-lg sm:rounded-xl border-2 border-transparent group-hover:border-orange-300/30 pointer-events-none transition-all duration-300"></div>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800 p-0.5 sm:p-1 transition-colors duration-200 z-10"
                  >
                    {showPassword ? <EyeOff size={14} className="sm:w-5 sm:h-5" /> : <Eye size={14} className="sm:w-5 sm:h-5" />}
                  </button>
                </div>
                {!isPasswordValid && form.password && (
                  <div className="mt-1.5 flex items-center gap-2 animate-fadeIn">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-[10px] sm:text-xs">!</span>
                    </div>
                    <p className="text-[10px] sm:text-xs text-amber-700 font-medium">
                      Minimum 6 characters required
                    </p>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="mb-2 sm:mb-2.5">
                <label className="block text-xs sm:text-sm font-medium text-gray-800 mb-1.5 sm:mb-1.5 ml-1">
                  <span className="flex items-center gap-1.5 sm:gap-2">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-md bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                      <Lock size={10} className="text-white" />
                    </div>
                    Confirm Password
                  </span>
                </label>
                <div className="relative group">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    className="w-full bg-white/90 border-2 border-gray-300/80 rounded-lg sm:rounded-xl 
                             px-3 py-2 sm:px-3.5 sm:py-2.5 pr-10 sm:pr-12 text-xs sm:text-sm text-gray-900 
                             placeholder-gray-500 focus:outline-none focus:border-orange-500 
                             focus:ring-2 sm:focus:ring-3 focus:ring-orange-200/50 
                             group-hover:border-orange-400/60 backdrop-blur-sm"
                    style={{
                      boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
                    }}
                  />
                  <div className="absolute inset-0 rounded-lg sm:rounded-xl border-2 border-transparent group-hover:border-orange-300/30 pointer-events-none transition-all duration-300"></div>
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800 p-0.5 sm:p-1 transition-colors duration-200 z-10"
                  >
                    {showConfirmPassword ? <EyeOff size={14} className="sm:w-5 sm:h-5" /> : <Eye size={14} className="sm:w-5 sm:h-5" />}
                  </button>
                </div>
                {!isPasswordMatch && form.confirmPassword && (
                  <div className="mt-1.5 flex items-center gap-2 animate-fadeIn">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-[10px] sm:text-xs">!</span>
                    </div>
                    <p className="text-[10px] sm:text-xs text-red-700 font-medium">
                      Passwords do not match
                    </p>
                  </div>
                )}
              </div>

            </div> {/* End of Grid */}

            {/* Submit Button */}
            <div className="mt-4 sm:mt-5 relative group">
              <button
                onClick={handleSubmit}
                disabled={!canCommonInfo}
                className={`w-full py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 relative overflow-hidden ${
                  canCommonInfo
                    ? "shadow-md sm:shadow-lg hover:shadow-lg sm:hover:shadow-xl active:scale-[0.99]"
                    : "cursor-not-allowed"
                }`}
                style={{
                  background: canCommonInfo 
                    ? 'linear-gradient(135deg, #f97316 0%, #fbbf24 100%)'
                    : 'linear-gradient(135deg, #d1d5db 0%, #9ca3af 100%)',
                  color: canCommonInfo ? 'white' : '#6b7280'
                }}
              >
                {/* Hover shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                
                <span className="relative z-10 flex items-center justify-center gap-1.5 sm:gap-2">
                  {getButtonText()}
                  {canCommonInfo && (
                    <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-white/20 flex items-center justify-center">
                      <span className="text-[10px] sm:text-xs">→</span>
                    </div>
                  )}
                </span>
              </button>
              
              {/* Button glow effect when enabled */}
              {canCommonInfo && (
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/30 to-amber-500/30 blur-md rounded-lg sm:rounded-xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              )}
            </div>

            {/* Progress indicator for vendor */}
            {role === "vendor" && canCommonInfo && (
              <div className="mt-3 sm:mt-4 flex flex-col items-center">
                <div className="flex items-center justify-center gap-1 sm:gap-1.5 mb-1 sm:mb-1.5">
                  <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 shadow-sm sm:shadow-md"></div>
                  <div className="w-8 h-1 sm:w-10 sm:h-1 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full"></div>
                  <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-gray-300 shadow-sm"></div>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 px-2 py-1 sm:px-3 sm:py-1 bg-gradient-to-r from-amber-50 to-orange-50 rounded-full border border-amber-100">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse flex-shrink-0"></div>
                  <p className="text-[10px] sm:text-xs font-medium text-amber-800 whitespace-nowrap">
                    Step 1 of 2 - Basic Information Complete
                  </p>
                </div>
              </div>
            )}

            {/* Login Link */}
            <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-300/50">
              <p className="text-center text-xs sm:text-sm text-gray-600">
                Already have an account?{" "}
                <button
                  onClick={() => navigate("/login")}
                  className="text-transparent font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text hover:from-orange-700 hover:to-amber-700 transition-all duration-300 relative group"
                >
                  Login here
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-orange-600 to-amber-600 group-hover:w-full transition-all duration-300"></span>
                </button>
              </p>
            </div>

            {/* Security Note */}
            <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-300/50">
              <div className="flex items-center gap-2 p-2 sm:p-2.5 bg-gradient-to-r from-emerald-50/80 to-green-50/80 rounded-lg sm:rounded-xl border border-emerald-100">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center shadow-sm flex-shrink-0">
                  <Shield size={10} className="sm:w-4 sm:h-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] sm:text-xs font-semibold text-emerald-800 truncate">
                    Bank-level Security
                  </p>
                  <p className="text-[10px] sm:text-xs text-emerald-700 truncate">
                    Your data is encrypted and protected
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CommonInfo;