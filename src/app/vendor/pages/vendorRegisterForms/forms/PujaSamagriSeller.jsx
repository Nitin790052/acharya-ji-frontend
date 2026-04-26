import React, { useState } from 'react';
import { Store, Package, Truck, RefreshCw, ShoppingBag, Tag, AlertCircle, Home, ArrowLeft, Sparkles, Target, Star } from 'lucide-react';
import DocumentUploadSection from '../../../components/DocumentUploadSection';

export default function PujaSamagriSeller({ commonData, onBack, onSubmit }) {
  const [formData, setFormData] = useState({
    shopName: '',
    gstNumber: '',
    productCategories: [],
    productType: '',
    deliveryAvailable: '',
    deliveryCities: '',
    returnPolicy: '',
    wholesaleAvailable: '',
    // Document Details
    aadharNumber: '',
    panNumber: '',
    bankName: '',
    accountNumber: '',
    ifscCode: '',
    // Files
    aadharFile: null,
    panFile: null,
    bankFile: null
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleCheckboxChange = (value) => {
    setFormData(prev => ({
      ...prev,
      productCategories: prev.productCategories.includes(value)
        ? prev.productCategories.filter(item => item !== value)
        : [...prev.productCategories, value]
    }));
    if (errors.productCategories) {
      setErrors(prev => ({ ...prev, productCategories: '' }));
    }
  };

  const handleRadioChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));
    }
  };

  const validateGST = (gst) => {
    const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    return gstRegex.test(gst);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.shopName.trim()) {
      newErrors.shopName = 'Shop/Business name is required';
    }

    if (formData.gstNumber.trim() && !validateGST(formData.gstNumber.trim())) {
      newErrors.gstNumber = 'Invalid GST number format';
    }

    if (formData.productCategories.length === 0) {
      newErrors.productCategories = 'Please select at least one product category';
    }

    if (!formData.productType) {
      newErrors.productType = 'Please select product type';
    }

    if (!formData.deliveryAvailable) {
      newErrors.deliveryAvailable = 'Please specify if delivery is available';
    }

    if (formData.deliveryAvailable === 'yes' && !formData.deliveryCities.trim()) {
      newErrors.deliveryCities = 'Please enter delivery cities';
    }

    if (!formData.returnPolicy) {
      newErrors.returnPolicy = 'Please specify return policy';
    }

    if (!formData.wholesaleAvailable) {
      newErrors.wholesaleAvailable = 'Please specify if wholesale is available';
    }

    if (formData.aadharNumber && formData.aadharNumber.length !== 12) {
      newErrors.aadharNumber = 'Aadhar number must be 12 digits';
    }

    if (!formData.bankName) {
      newErrors.bankName = 'Bank name is required';
    }

    if (!formData.accountNumber) {
      newErrors.accountNumber = 'Account number is required';
    }

    if (!formData.ifscCode) {
      newErrors.ifscCode = 'IFSC code is required';
    } else if (formData.ifscCode.length !== 11) {
      newErrors.ifscCode = 'IFSC must be exactly 11 characters';
    } else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.ifscCode)) {
      newErrors.ifscCode = 'Invalid IFSC format (e.g. ABCD0123456)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const completeData = {
        ...commonData,
        ...formData,
        vendorType: 'pujaSamagriSeller'
      };
      
      console.log('Complete Registration Data:', completeData);
      
      if (onSubmit) {
        await onSubmit(completeData);
      }
      
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      shopName: '',
      gstNumber: '',
      productCategories: [],
      productType: '',
      deliveryAvailable: '',
      deliveryCities: '',
      returnPolicy: '',
      wholesaleAvailable: ''
    });
    setErrors({});
  };

  const productCategoryOptions = [
    { value: 'havan_samagri', label: 'Havan Samagri' },
    { value: 'idols_murtis', label: 'Idols & Murtis' },
    { value: 'pooja_kits', label: 'Pooja Kits' },
    { value: 'rudraksha', label: 'Rudraksha' },
    { value: 'incense', label: 'Incense' }
  ];

  const productTypeOptions = [
    { value: 'handmade', label: 'Handmade' },
    { value: 'factory_made', label: 'Factory Made' },
    { value: 'both', label: 'Both' }
  ];

  const yesNoOptions = [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' }
  ];

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center">
      {/* Main Card - Fully Responsive */}
      <div className="w-full max-w-full sm:max-w-lg md:max-w-2xl lg:max-w-4xl">
        {/* Glass Card Container */}
        <div className="relative bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-[12px] sm:backdrop-blur-[16px] md:backdrop-blur-[20px] 
                        border border-white/60 
                        shadow-[0_10px_30px_-5px_rgba(249,115,22,0.1),inset_0_0_20px_rgba(255,255,255,0.3)] 
                        sm:shadow-[0_15px_40px_-10px_rgba(249,115,22,0.15),inset_0_0_30px_rgba(255,255,255,0.4)]
                        overflow-hidden">
          
          {/* Decorative Elements */}
          <div className="absolute -top-20 -left-20 w-40 h-40 sm:w-60 sm:h-60 bg-gradient-to-br from-orange-400/5 to-amber-400/3 rounded-full blur-xl"></div>
          <div className="absolute -bottom-20 -right-20 w-40 h-40 sm:w-60 sm:h-60 bg-gradient-to-tr from-amber-400/5 to-orange-400/3 rounded-full blur-xl"></div>
          
          <div className="relative z-10 p-3 sm:p-4 md:py-6 md:px-4 lg:py-5 lg:px-7">
            
            {/* Header with Back Button */}
            <div className="text-center mb-4 sm:mb-5 md:mb-6">
              
              {/* Back Button - Mobile/Desktop */}
              <button
                onClick={onBack}
                disabled={isSubmitting}
                className="flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 sm:px-3 sm:py-2 bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl border border-gray-300/70 hover:bg-white hover:border-gray-400 transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowLeft size={14} className="sm:w-4 sm:h-4 text-gray-700 group-hover:text-orange-500 transition-colors" />
                <span className="text-xs sm:text-sm font-medium text-gray-800 group-hover:text-orange-500 transition-colors">
                  Back
                </span>
              </button>
              
              <h2 className="text-xl sm:text-2xl md:text-2.5xl font-semibold text-gray-800 mb-1 sm:mb-1.5">
                Puja Samagri Seller Registration
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-1.5">
                Complete your seller business details
              </p>
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-3.5 sm:py-1.5 bg-gradient-to-r from-amber-100 to-orange-100 rounded-full border border-amber-200">
                <Store size={12} className="sm:w-4 sm:h-4 text-amber-600" />
                <p className="text-[10px] sm:text-xs font-medium text-amber-700 whitespace-nowrap">
                  Step 2 of 2 - Business Details
                </p>
              </div>
              
              {/* Mobile Mandatory Fields Notice */}
              <div className="mt-3 sm:mt-4 md:hidden flex items-center justify-center gap-2 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl px-3 py-1.5 sm:px-4 sm:py-2 border border-amber-200">
                <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">*</span>
                </div>
                <p className="text-xs sm:text-sm font-medium text-amber-800">
                  All fields are mandatory
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Form Grid - Compact spacing */}
              <div className="space-y-3 sm:space-y-3.5">
                
                {/* Shop Name */}
                <div className="mb-3 sm:mb-3.5">
                  <label className="block text-xs sm:text-sm font-medium text-gray-800 mb-1.5 sm:mb-1.5 ml-1">
                    <span className="flex items-center gap-1.5 sm:gap-2">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-md bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                        <Home size={10} className="sm:w-3 sm:h-3 text-white" />
                      </div>
                      Shop / Business Name
                      <span className="text-red-500 text-sm sm:text-base">*</span>
                    </span>
                  </label>
                  <div className="relative group">
                    <input
                      type="text"
                      name="shopName"
                      value={formData.shopName}
                      onChange={handleInputChange}
                      placeholder="Enter your shop or business name"
                      className="w-full bg-white/90 border-2 border-gray-300/80 rounded-lg sm:rounded-xl 
                               px-3 py-2 sm:px-3.5 sm:py-2.5 text-xs sm:text-sm text-gray-900 
                               placeholder-gray-500 focus:outline-none focus:border-orange-500 
                               focus:ring-2 sm:focus:ring-3 focus:ring-orange-200/50 transition-all duration-300 
                               group-hover:border-orange-400/60 backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{
                        boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
                      }}
                      disabled={isSubmitting}
                    />
                    <div className="absolute inset-0 rounded-lg sm:rounded-xl border-2 border-transparent group-hover:border-orange-300/30 pointer-events-none transition-all duration-300"></div>
                  </div>
                  {errors.shopName && (
                    <div className="mt-1.5 flex items-center gap-2 animate-fadeIn px-2 py-1.5 sm:px-3 sm:py-2 bg-red-50/80 rounded-lg border border-red-200">
                      <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-[10px] sm:text-xs">!</span>
                      </div>
                      <p className="text-[10px] sm:text-xs text-red-700 font-medium">
                        {errors.shopName}
                      </p>
                    </div>
                  )}
                </div>

                {/* GST Number */}
                <div className="mb-3 sm:mb-3.5">
                  <label className="block text-xs sm:text-sm font-medium text-gray-800 mb-1.5 sm:mb-1.5 ml-1">
                    <span className="flex items-center gap-1.5 sm:gap-2">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-md bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                        <Tag size={10} className="sm:w-3 sm:h-3 text-white" />
                      </div>
                      GST Number (Optional)
                    </span>
                  </label>
                  <div className="relative group">
                    <input
                      type="text"
                      name="gstNumber"
                      value={formData.gstNumber}
                      onChange={handleInputChange}
                      placeholder="Enter 15-digit GST number"
                      className="w-full bg-white/90 border-2 border-gray-300/80 rounded-lg sm:rounded-xl 
                               px-3 py-2 sm:px-3.5 sm:py-2.5 text-xs sm:text-sm text-gray-900 
                               placeholder-gray-500 focus:outline-none focus:border-orange-500 
                               focus:ring-2 sm:focus:ring-3 focus:ring-orange-200/50 transition-all duration-300 
                               group-hover:border-orange-400/60 backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed uppercase"
                      style={{
                        boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
                      }}
                      disabled={isSubmitting}
                    />
                    <div className="absolute inset-0 rounded-lg sm:rounded-xl border-2 border-transparent group-hover:border-orange-300/30 pointer-events-none transition-all duration-300"></div>
                  </div>
                  {errors.gstNumber && (
                    <div className="mt-1.5 flex items-center gap-2 animate-fadeIn px-2 py-1.5 sm:px-3 sm:py-2 bg-red-50/80 rounded-lg border border-red-200">
                      <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-[10px] sm:text-xs">!</span>
                      </div>
                      <p className="text-[10px] sm:text-xs text-red-700 font-medium">
                        {errors.gstNumber}
                      </p>
                    </div>
                  )}
                </div>

                {/* Product Categories */}
                <div className="mb-3 sm:mb-3.5">
                  <label className="block text-xs sm:text-sm font-medium text-gray-800 mb-1.5 sm:mb-1.5 ml-1">
                    <span className="flex items-center gap-1.5 sm:gap-2">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-md bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                        <Package size={10} className="sm:w-3 sm:h-3 text-white" />
                      </div>
                      Product Categories
                      <span className="text-red-500 text-sm sm:text-base">*</span>
                    </span>
                  </label>
                  <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
                    {productCategoryOptions.map(({ value, label }) => (
                      <label
                        key={value}
                        className={`relative overflow-hidden group cursor-pointer p-2 sm:p-2.5 rounded-lg sm:rounded-xl border-2 transition-all duration-300 ${
                          formData.productCategories.includes(value)
                            ? 'border-orange-500 shadow-md sm:shadow-lg'
                            : 'border-gray-300/80 hover:border-orange-400/60'
                        } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                        style={{
                          background: formData.productCategories.includes(value)
                            ? 'linear-gradient(135deg, rgba(249, 115, 22, 0.08) 0%, rgba(251, 191, 36, 0.08) 100%)'
                            : 'rgba(255,255,255,0.9)'
                        }}
                      >
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={formData.productCategories.includes(value)}
                          onChange={() => handleCheckboxChange(value)}
                          disabled={isSubmitting}
                        />
                        
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-0 group-hover:opacity-100 translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-700"></div>
                        
                        <div className="relative z-10 flex items-center gap-2 sm:gap-2.5">
                          <div className={`w-3 h-3 sm:w-4 sm:h-4 rounded flex items-center justify-center transition-all duration-300 ${
                            formData.productCategories.includes(value)
                              ? 'bg-gradient-to-br from-orange-500 to-amber-500'
                              : 'bg-gray-200 border border-gray-300'
                          }`}>
                            {formData.productCategories.includes(value) && (
                              <svg className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                          <span className={`text-xs sm:text-sm font-medium ${
                            formData.productCategories.includes(value)
                              ? 'text-gray-900'
                              : 'text-gray-700'
                          }`}>
                            {label}
                          </span>
                        </div>
                        
                        {formData.productCategories.includes(value) && (
                          <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/10 to-amber-500/10 blur-md rounded-lg sm:rounded-xl -z-10"></div>
                        )}
                      </label>
                    ))}
                  </div>
                  {errors.productCategories && (
                    <div className="mt-2 flex items-center gap-2 animate-fadeIn px-2 py-1.5 sm:px-3 sm:py-2 bg-red-50/80 rounded-lg border border-red-200">
                      <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-[10px] sm:text-xs">!</span>
                      </div>
                      <p className="text-[10px] sm:text-xs text-red-700 font-medium">
                        {errors.productCategories}
                      </p>
                    </div>
                  )}
                </div>

                {/* Product Type */}
                <div className="mb-3 sm:mb-3.5">
                  <label className="block text-xs sm:text-sm font-medium text-gray-800 mb-1.5 sm:mb-1.5 ml-1">
                    <span className="flex items-center gap-1.5 sm:gap-2">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-md bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                        <Package size={10} className="sm:w-3 sm:h-3 text-white" />
                      </div>
                      Product Type
                      <span className="text-red-500 text-sm sm:text-base">*</span>
                    </span>
                  </label>
                  <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
                    {productTypeOptions.map(({ value, label }) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => handleRadioChange('productType', value)}
                        className={`relative overflow-hidden group flex items-center justify-center p-2 sm:p-2.5 rounded-lg sm:rounded-xl border-2 transition-all duration-300 ${
                          formData.productType === value
                            ? 'border-orange-500 shadow-sm sm:shadow-md'
                            : 'border-gray-300/80 hover:border-orange-400/60'
                        } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                        style={{
                          background: formData.productType === value
                            ? 'linear-gradient(135deg, rgba(249, 115, 22, 0.08) 0%, rgba(251, 191, 36, 0.08) 100%)'
                            : 'rgba(255,255,255,0.9)'
                        }}
                        disabled={isSubmitting}
                      >
                        <input
                          type="radio"
                          className="hidden"
                          name="productType"
                          value={value}
                          checked={formData.productType === value}
                          onChange={() => {}}
                          disabled={isSubmitting}
                        />
                        
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-700"></div>
                        
                        <span className={`text-xs sm:text-sm font-semibold relative z-10 ${
                          formData.productType === value ? 'text-gray-900' : 'text-gray-700'
                        }`}>
                          {label}
                        </span>
                        
                        {formData.productType === value && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center shadow-sm sm:shadow-md">
                            <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-white"></div>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                  {errors.productType && (
                    <div className="mt-2 flex items-center gap-2 animate-fadeIn px-2 py-1.5 sm:px-3 sm:py-2 bg-red-50/80 rounded-lg border border-red-200">
                      <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-[10px] sm:text-xs">!</span>
                      </div>
                      <p className="text-[10px] sm:text-xs text-red-700 font-medium">
                        {errors.productType}
                      </p>
                    </div>
                  )}
                </div>

                {/* Delivery Available */}
                <div className="mb-3 sm:mb-3.5">
                  <label className="block text-xs sm:text-sm font-medium text-gray-800 mb-1.5 sm:mb-1.5 ml-1">
                    <span className="flex items-center gap-1.5 sm:gap-2">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-md bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                        <Truck size={10} className="sm:w-3 sm:h-3 text-white" />
                      </div>
                      Delivery Available
                      <span className="text-red-500 text-sm sm:text-base">*</span>
                    </span>
                  </label>
                  <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
                    {yesNoOptions.map(({ value, label }) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => handleRadioChange('deliveryAvailable', value)}
                        className={`relative overflow-hidden group flex items-center justify-center p-2 sm:p-2.5 rounded-lg sm:rounded-xl border-2 transition-all duration-300 ${
                          formData.deliveryAvailable === value
                            ? 'border-orange-500 shadow-sm sm:shadow-md'
                            : 'border-gray-300/80 hover:border-orange-400/60'
                        } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                        style={{
                          background: formData.deliveryAvailable === value
                            ? 'linear-gradient(135deg, rgba(249, 115, 22, 0.08) 0%, rgba(251, 191, 36, 0.08) 100%)'
                            : 'rgba(255,255,255,0.9)'
                        }}
                        disabled={isSubmitting}
                      >
                        <input
                          type="radio"
                          className="hidden"
                          name="deliveryAvailable"
                          value={value}
                          checked={formData.deliveryAvailable === value}
                          onChange={() => {}}
                          disabled={isSubmitting}
                        />
                        
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-700"></div>
                        
                        <span className={`text-xs sm:text-sm font-semibold relative z-10 ${
                          formData.deliveryAvailable === value ? 'text-gray-900' : 'text-gray-700'
                        }`}>
                          {label}
                        </span>
                        
                        {formData.deliveryAvailable === value && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center shadow-sm sm:shadow-md">
                            <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-white"></div>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                  {errors.deliveryAvailable && (
                    <div className="mt-2 flex items-center gap-2 animate-fadeIn px-2 py-1.5 sm:px-3 sm:py-2 bg-red-50/80 rounded-lg border border-red-200">
                      <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-[10px] sm:text-xs">!</span>
                      </div>
                      <p className="text-[10px] sm:text-xs text-red-700 font-medium">
                        {errors.deliveryAvailable}
                      </p>
                    </div>
                  )}
                </div>

                {/* Delivery Cities - Conditional */}
                {formData.deliveryAvailable === 'yes' && (
                  <div className="mb-3 sm:mb-3.5">
                    <label className="block text-xs sm:text-sm font-medium text-gray-800 mb-1.5 sm:mb-1.5 ml-1">
                      <span className="flex items-center gap-1.5 sm:gap-2">
                        <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-md bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                          <Truck size={10} className="sm:w-3 sm:h-3 text-white" />
                        </div>
                        Delivery Cities
                        <span className="text-red-500 text-sm sm:text-base">*</span>
                      </span>
                    </label>
                    <div className="relative group">
                      <input
                        type="text"
                        name="deliveryCities"
                        value={formData.deliveryCities}
                        onChange={handleInputChange}
                        placeholder="e.g., Delhi, Mumbai, Bangalore"
                        className="w-full bg-white/90 border-2 border-gray-300/80 rounded-lg sm:rounded-xl 
                                 px-3 py-2 sm:px-3.5 sm:py-2.5 text-xs sm:text-sm text-gray-900 
                                 placeholder-gray-500 focus:outline-none focus:border-orange-500 
                                 focus:ring-2 sm:focus:ring-3 focus:ring-orange-200/50 transition-all duration-300 
                                 group-hover:border-orange-400/60 backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{
                          boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
                        }}
                        disabled={isSubmitting}
                      />
                      <div className="absolute inset-0 rounded-lg sm:rounded-xl border-2 border-transparent group-hover:border-orange-300/30 pointer-events-none transition-all duration-300"></div>
                    </div>
                    {errors.deliveryCities && (
                      <div className="mt-1.5 flex items-center gap-2 animate-fadeIn px-2 py-1.5 sm:px-3 sm:py-2 bg-red-50/80 rounded-lg border border-red-200">
                        <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-[10px] sm:text-xs">!</span>
                        </div>
                        <p className="text-[10px] sm:text-xs text-red-700 font-medium">
                          {errors.deliveryCities}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Return Policy & Wholesale Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5 mb-3 sm:mb-3.5">
                  {/* Return Policy */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-800 mb-1.5 sm:mb-1.5 ml-1">
                      <span className="flex items-center gap-1.5 sm:gap-2">
                        <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-md bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                          <RefreshCw size={10} className="sm:w-3 sm:h-3 text-white" />
                        </div>
                        Return Policy
                        <span className="text-red-500 text-sm sm:text-base">*</span>
                      </span>
                    </label>
                    <div className="space-y-2">
                      {yesNoOptions.map(({ value, label }) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => handleRadioChange('returnPolicy', value)}
                          className={`relative overflow-hidden group flex items-center justify-center p-2 sm:p-2.5 rounded-lg sm:rounded-xl border-2 transition-all duration-300 w-full ${
                            formData.returnPolicy === value
                              ? 'border-orange-500 shadow-sm sm:shadow-md'
                              : 'border-gray-300/80 hover:border-orange-400/60'
                          } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                          style={{
                            background: formData.returnPolicy === value
                              ? 'linear-gradient(135deg, rgba(249, 115, 22, 0.08) 0%, rgba(251, 191, 36, 0.08) 100%)'
                              : 'rgba(255,255,255,0.9)'
                          }}
                          disabled={isSubmitting}
                        >
                          <input
                            type="radio"
                            className="hidden"
                            name="returnPolicy"
                            value={value}
                            checked={formData.returnPolicy === value}
                            onChange={() => {}}
                            disabled={isSubmitting}
                          />
                          
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-700"></div>
                          
                          <span className={`text-xs sm:text-sm font-semibold relative z-10 ${
                            formData.returnPolicy === value ? 'text-gray-900' : 'text-gray-700'
                          }`}>
                            {label}
                          </span>
                          
                          {formData.returnPolicy === value && (
                            <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center shadow-sm sm:shadow-md">
                              <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-white"></div>
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                    {errors.returnPolicy && (
                      <div className="mt-1.5 flex items-center gap-2 animate-fadeIn px-2 py-1.5 sm:px-3 sm:py-2 bg-red-50/80 rounded-lg border border-red-200">
                        <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-[10px] sm:text-xs">!</span>
                        </div>
                        <p className="text-[10px] sm:text-xs text-red-700 font-medium">
                          {errors.returnPolicy}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Wholesale Available */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-800 mb-1.5 sm:mb-1.5 ml-1">
                      <span className="flex items-center gap-1.5 sm:gap-2">
                        <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-md bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                          <ShoppingBag size={10} className="sm:w-3 sm:h-3 text-white" />
                        </div>
                        Wholesale Available
                        <span className="text-red-500 text-sm sm:text-base">*</span>
                      </span>
                    </label>
                    <div className="space-y-2">
                      {yesNoOptions.map(({ value, label }) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => handleRadioChange('wholesaleAvailable', value)}
                          className={`relative overflow-hidden group flex items-center justify-center p-2 sm:p-2.5 rounded-lg sm:rounded-xl border-2 transition-all duration-300 w-full ${
                            formData.wholesaleAvailable === value
                              ? 'border-orange-500 shadow-sm sm:shadow-md'
                              : 'border-gray-300/80 hover:border-orange-400/60'
                          } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                          style={{
                            background: formData.wholesaleAvailable === value
                              ? 'linear-gradient(135deg, rgba(249, 115, 22, 0.08) 0%, rgba(251, 191, 36, 0.08) 100%)'
                              : 'rgba(255,255,255,0.9)'
                          }}
                          disabled={isSubmitting}
                        >
                          <input
                            type="radio"
                            className="hidden"
                            name="wholesaleAvailable"
                            value={value}
                            checked={formData.wholesaleAvailable === value}
                            onChange={() => {}}
                            disabled={isSubmitting}
                          />
                          
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-700"></div>
                          
                          <span className={`text-xs sm:text-sm font-semibold relative z-10 ${
                            formData.wholesaleAvailable === value ? 'text-gray-900' : 'text-gray-700'
                          }`}>
                            {label}
                          </span>
                          
                          {formData.wholesaleAvailable === value && (
                            <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center shadow-sm sm:shadow-md">
                              <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-white"></div>
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                    {errors.wholesaleAvailable && (
                      <div className="mt-1.5 flex items-center gap-2 animate-fadeIn px-2 py-1.5 sm:px-3 sm:py-2 bg-red-50/80 rounded-lg border border-red-200">
                        <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-[10px] sm:text-xs">!</span>
                        </div>
                        <p className="text-[10px] sm:text-xs text-red-700 font-medium">
                          {errors.wholesaleAvailable}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Document Upload Section */}
                <DocumentUploadSection 
                  formData={formData} 
                  handleInputChange={handleInputChange} 
                  handleFileChange={handleFileChange} 
                  errors={errors} 
                  vendorType="pujaSamagriSeller" 
                />

              </div> {/* End of Form Grid */}

              {/* Mandatory Fields Notice - Bottom */}
              <div className="mt-4 p-3 sm:p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg sm:rounded-xl border border-amber-200">
                <div className="flex items-start gap-2.5 sm:gap-3">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs sm:text-sm font-bold">*</span>
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-gray-800 mb-1">Important Note</h4>
                    <p className="text-[10px] sm:text-xs text-gray-700">
                      All fields marked with <span className="text-red-500 font-bold">*</span> are mandatory. 
                      GST Number is optional. Please ensure all information is accurate before submitting.
                    </p>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-2.5 mt-4 sm:mt-5 relative group">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 relative overflow-hidden group/submit disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    background: 'linear-gradient(135deg, #f97316 0%, #fbbf24 100%)',
                    boxShadow: '0 10px 25px -5px rgba(249, 115, 22, 0.3)'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover/submit:translate-x-[100%] transition-transform duration-700"></div>
                  
                  <span className="relative z-10 flex items-center justify-center gap-1.5 sm:gap-2">
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-3 w-3 sm:h-4 sm:w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Target size={12} className="sm:w-4 sm:h-4" />
                        Complete Registration
                        <span className="text-[10px] sm:text-xs opacity-90">→</span>
                      </>
                    )}
                  </span>
                  
                  <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/30 to-amber-500/30 blur-md rounded-lg sm:rounded-xl -z-10 opacity-0 group-hover/submit:opacity-100 transition-opacity duration-300"></div>
                </button>
                
                <button
                  type="button"
                  onClick={handleReset}
                  disabled={isSubmitting}
                  className="px-4 py-2.5 sm:px-5 sm:py-2.5 rounded-lg sm:rounded-xl border-2 border-gray-300/80 font-semibold transition-all duration-300 hover:bg-gray-50/80 hover:border-gray-400 relative overflow-hidden group/reset disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    color: '#4b5563'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-100/20 to-transparent translate-x-[-100%] group-hover/reset:translate-x-[100%] transition-transform duration-700"></div>
                  
                  <span className="relative z-10 flex items-center justify-center gap-1.5 sm:gap-2">
                    <span className="text-xs">↺</span>
                    <span className="text-xs sm:text-sm">Reset</span>
                  </span>
                </button>
              </div>
            </form>

            {/* Progress Indicator */}
            <div className="mt-3 sm:mt-4 flex flex-col items-center">
              <div className="flex items-center justify-center gap-1 sm:gap-1.5 mb-1 sm:mb-1.5">
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 shadow-sm sm:shadow-md"></div>
                <div className="w-8 h-1 sm:w-12 sm:h-1 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full"></div>
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 shadow-sm sm:shadow-md"></div>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 px-2 py-1 sm:px-3 sm:py-1 bg-gradient-to-r from-amber-50 to-orange-50 rounded-full border border-amber-100">
                <div className={`w-1.5 h-1.5 rounded-full ${isSubmitting ? 'bg-green-500 animate-pulse' : 'bg-orange-500 animate-pulse'}`}></div>
                <p className="text-[10px] sm:text-xs font-medium text-amber-800 whitespace-nowrap">
                  {isSubmitting ? 'Submitting...' : 'Step 2 of 2 - Business Details Complete'}
                </p>
              </div>
            </div>

            {/* Footer Note */}
            <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-300/50">
              <div className="flex items-center justify-center gap-2 sm:gap-2.5">
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-br from-orange-500/10 to-amber-500/10 flex items-center justify-center">
                  <Store size={10} className="sm:w-3 sm:h-3 text-orange-600" />
                </div>
                <p className="text-center text-[10px] sm:text-xs text-gray-600">
                  Provide quality products to support spiritual practices
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
