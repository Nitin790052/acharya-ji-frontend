import React, { useState } from 'react';
import { Star, Calendar, Phone, Video, Users, MessageSquare, Globe, AlertCircle, Sparkles, Brain, Target, Zap, ArrowLeft, Info, CheckCircle2 } from 'lucide-react';

export default function Astrologer({ commonData, onBack, onSubmit }) {
  const [formData, setFormData] = useState({
    astrologyTypes: [],
    yearsOfExperience: '',
    consultationModes: [],
    perSessionCharges: '',
    dailySlotCapacity: '',
    languages: '',
    samplePrediction: ''
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

  const handleCheckboxChange = (field, value) => {
    setFormData(prev => {
      const currentValues = prev[field];
      if (currentValues.includes(value)) {
        return {
          ...prev,
          [field]: currentValues.filter(item => item !== value)
        };
      } else {
        return {
          ...prev,
          [field]: [...currentValues, value]
        };
      }
    });
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const isChecked = (field, value) => {
    return formData[field].includes(value);
  };

  const validateForm = () => {
    const newErrors = {};

    if (formData.astrologyTypes.length === 0) {
      newErrors.astrologyTypes = 'Please select at least one astrology type';
    }

    if (!formData.yearsOfExperience || formData.yearsOfExperience < 0) {
      newErrors.yearsOfExperience = 'Please enter valid years of experience';
    }

    if (formData.consultationModes.length === 0) {
      newErrors.consultationModes = 'Please select at least one consultation mode';
    }

    if (!formData.perSessionCharges || formData.perSessionCharges < 0) {
      newErrors.perSessionCharges = 'Please enter valid charges';
    }

    if (!formData.dailySlotCapacity || formData.dailySlotCapacity < 1) {
      newErrors.dailySlotCapacity = 'Please enter valid slot capacity (minimum 1)';
    }

    if (!formData.languages.trim()) {
      newErrors.languages = 'Please enter languages known';
    }

    if (!formData.samplePrediction.trim()) {
      newErrors.samplePrediction = 'Please provide sample prediction';
    }

    if (formData.samplePrediction.trim().length < 50) {
      newErrors.samplePrediction = 'Please provide at least 50 characters';
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
        vendorType: 'astrologer',
        submittedAt: new Date().toISOString(),
        registrationId: `ASTRO-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
      };
      
      console.log('Complete Registration Data:', completeData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (onSubmit) {
        onSubmit();
      }
      
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    if (!isSubmitting) {
      const confirmed = window.confirm('Are you sure you want to reset all fields? This action cannot be undone.');
      if (confirmed) {
        setFormData({
          astrologyTypes: [],
          yearsOfExperience: '',
          consultationModes: [],
          perSessionCharges: '',
          dailySlotCapacity: '',
          languages: '',
          samplePrediction: ''
        });
        setErrors({});
      }
    }
  };

  const handleBackClick = () => {
    if (onBack) {
      onBack();
    }
  };

  const astrologyTypes = [
    { label: 'Vedic', value: 'vedic' },
    { label: 'KP System', value: 'kp_system' },
    { label: 'Numerology', value: 'numerology' },
    { label: 'Tarot', value: 'tarot' }
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
                onClick={handleBackClick}
                disabled={isSubmitting}
                className="flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 sm:px-3 sm:py-2 bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl border border-gray-300/70 hover:bg-white hover:border-gray-400 transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowLeft size={14} className="sm:w-4 sm:h-4 text-gray-700 group-hover:text-orange-500 transition-colors" />
                <span className="text-xs sm:text-sm font-medium text-gray-800 group-hover:text-orange-500 transition-colors">
                  Back
                </span>
              </button>
              
              <h2 className="text-xl sm:text-2xl md:text-2.5xl font-semibold text-gray-800 mb-1 sm:mb-1.5">
                Astrologer Registration
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-1.5">
                Complete your professional astrologer profile
              </p>
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-3.5 sm:py-1.5 bg-gradient-to-r from-amber-100 to-orange-100 rounded-full border border-amber-200">
                <Brain size={12} className="sm:w-4 sm:h-4 text-amber-600" />
                <p className="text-[10px] sm:text-xs font-medium text-amber-700 whitespace-nowrap">
                  Step 2 of 2 - Professional Information
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

            {/* Mandatory Fields Notice - Top */}
            <div className="mb-4 sm:mb-5 p-3 sm:p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg sm:rounded-xl border border-amber-200">
              <div className="flex items-start gap-2.5 sm:gap-3">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center flex-shrink-0">
                  <Info size={12} className="sm:w-4 sm:h-4 text-white" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-gray-800 mb-1">Important Note</h4>
                  <p className="text-[10px] sm:text-xs text-gray-700">
                    All fields marked with <span className="text-red-500 font-bold">*</span> are mandatory. 
                    Please ensure all information is accurate before submitting your registration.
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Form Grid - Compact spacing */}
              <div className="space-y-3 sm:space-y-3.5">
                
                {/* Section 1: Professional Specialization */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-1.5 h-6 bg-gradient-to-b from-orange-500 to-amber-500 rounded-full"></div>
                    <h2 className="text-sm sm:text-base font-semibold text-gray-800">Specialization & Experience</h2>
                  </div>

                  {/* Astrology Types */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs sm:text-sm font-semibold text-gray-800 flex items-center gap-1.5 sm:gap-2">
                        <Brain size={12} className="sm:w-4 sm:h-4 text-orange-600" />
                        Astrology Types
                        <span className="text-red-500 text-sm sm:text-base">*</span>
                      </label>
                      {errors.astrologyTypes && (
                        <span className="text-[10px] sm:text-xs text-red-600 font-medium flex items-center gap-1">
                          <AlertCircle size={10} className="sm:w-3 sm:h-3" />
                          {errors.astrologyTypes}
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
                      {astrologyTypes.map(({ label, value }) => {
                        const checked = isChecked('astrologyTypes', value);
                        return (
                          <label
                            key={value}
                            className={`relative overflow-hidden group cursor-pointer p-2 sm:p-2.5 rounded-lg sm:rounded-xl border-2 transition-all duration-300 ${
                              checked
                                ? 'border-orange-500 shadow-md sm:shadow-lg'
                                : 'border-gray-300/80 hover:border-orange-400/60'
                            } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                            style={{
                              background: checked
                                ? 'linear-gradient(135deg, rgba(249, 115, 22, 0.08) 0%, rgba(251, 191, 36, 0.08) 100%)'
                                : 'rgba(255,255,255,0.9)'
                            }}
                          >
                            <input
                              type="checkbox"
                              className="sr-only"
                              checked={checked}
                              onChange={() => handleCheckboxChange('astrologyTypes', value)}
                              disabled={isSubmitting}
                            />
                            
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-0 group-hover:opacity-100 translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-700"></div>
                            
                            <div className="relative z-10 flex items-center justify-between gap-2 sm:gap-2.5">
                              <span className={`text-xs sm:text-sm font-medium ${checked ? 'text-gray-900' : 'text-gray-700'}`}>
                                {label}
                              </span>
                              {checked && (
                                <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center flex-shrink-0">
                                  <CheckCircle2 size={10} className="sm:w-2.5 sm:h-2.5 text-white" />
                                </div>
                              )}
                            </div>
                            
                            {checked && (
                              <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/10 to-amber-500/10 blur-md rounded-lg sm:rounded-xl -z-10"></div>
                            )}
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Experience & Capacity Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-800 mb-1.5 sm:mb-1.5 ml-1">
                        <span className="flex items-center gap-1.5 sm:gap-2">
                          <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-md bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                            <Calendar size={10} className="sm:w-3 sm:h-3 text-white" />
                          </div>
                          Years of Experience
                          <span className="text-red-500 text-sm sm:text-base">*</span>
                        </span>
                      </label>
                      <div className="relative group">
                        <input
                          type="number"
                          name="yearsOfExperience"
                          value={formData.yearsOfExperience}
                          onChange={handleInputChange}
                          min="0"
                          placeholder="e.g., 5"
                          className="w-full bg-white/90 border-2 border-gray-300/80 rounded-lg sm:rounded-xl 
                                   px-3 py-2 sm:px-3.5 sm:py-2.5 text-xs sm:text-sm text-gray-900 
                                   placeholder-gray-500 focus:outline-none focus:border-orange-500 
                                   focus:ring-2 sm:focus:ring-3 focus:ring-orange-200/50 transition-all duration-300 
                                   group-hover:border-orange-400/60 backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed input field: [appearance:textfield] 
                            [&::-webkit-inner-spin-button]:appearance-none 
                            [&::-webkit-outer-spin-button]:appearance-none"
                          style={{
                            boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
                          }}
                          disabled={isSubmitting}
                        />
                        <div className="absolute inset-0 rounded-lg sm:rounded-xl border-2 border-transparent group-hover:border-orange-300/30 pointer-events-none transition-all duration-300"></div>
                      </div>
                      {errors.yearsOfExperience && (
                        <div className="mt-1.5 flex items-center gap-2 animate-fadeIn px-2 py-1.5 sm:px-3 sm:py-2 bg-red-50/80 rounded-lg border border-red-200">
                          <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-[10px] sm:text-xs">!</span>
                          </div>
                          <p className="text-[10px] sm:text-xs text-red-700 font-medium">
                            {errors.yearsOfExperience}
                          </p>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-800 mb-1.5 sm:mb-1.5 ml-1">
                        <span className="flex items-center gap-1.5 sm:gap-2">
                          <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-md bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                            <Users size={10} className="sm:w-3 sm:h-3 text-white" />
                          </div>
                          Daily Slots
                          <span className="text-red-500 text-sm sm:text-base">*</span>
                        </span>
                      </label>
                      <div className="relative group">
                        <input
                          type="number"
                          name="dailySlotCapacity"
                          value={formData.dailySlotCapacity}
                          onChange={handleInputChange}
                          min="1"
                          placeholder="e.g., 10"
                          className="w-full bg-white/90 border-2 border-gray-300/80 rounded-lg sm:rounded-xl 
                                   px-3 py-2 sm:px-3.5 sm:py-2.5 text-xs sm:text-sm text-gray-900 
                                   placeholder-gray-500 focus:outline-none focus:border-orange-500 
                                   focus:ring-2 sm:focus:ring-3 focus:ring-orange-200/50 transition-all duration-300 
                                   group-hover:border-orange-400/60 backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed input field: [appearance:textfield] 
                            [&::-webkit-inner-spin-button]:appearance-none 
                            [&::-webkit-outer-spin-button]:appearance-none"
                          style={{
                            boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
                          }}
                          disabled={isSubmitting}
                        />
                        <div className="absolute inset-0 rounded-lg sm:rounded-xl border-2 border-transparent group-hover:border-orange-300/30 pointer-events-none transition-all duration-300"></div>
                      </div>
                      {errors.dailySlotCapacity && (
                        <div className="mt-1.5 flex items-center gap-2 animate-fadeIn px-2 py-1.5 sm:px-3 sm:py-2 bg-red-50/80 rounded-lg border border-red-200">
                          <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-[10px] sm:text-xs">!</span>
                          </div>
                          <p className="text-[10px] sm:text-xs text-red-700 font-medium">
                            {errors.dailySlotCapacity}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Section 2: Services & Communication */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-1.5 h-6 bg-gradient-to-b from-orange-500 to-amber-500 rounded-full"></div>
                    <h2 className="text-sm sm:text-base font-semibold text-gray-800">Services & Communication</h2>
                  </div>

                  {/* Consultation Modes */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs sm:text-sm font-semibold text-gray-800 flex items-center gap-1.5 sm:gap-2">
                        <Phone size={12} className="sm:w-4 sm:h-4 text-orange-600" />
                        Consultation Modes
                        <span className="text-red-500 text-sm sm:text-base">*</span>
                      </label>
                      {errors.consultationModes && (
                        <span className="text-[10px] sm:text-xs text-red-600 font-medium flex items-center gap-1">
                          <AlertCircle size={10} className="sm:w-3 sm:h-3" />
                          {errors.consultationModes}
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
                      {[
                        { label: 'Video', icon: Video, value: 'video' },
                        { label: 'Phone', icon: Phone, value: 'phone' },
                        { label: 'In-Person', icon: Users, value: 'in_person' }
                      ].map((mode) => {
                        const checked = isChecked('consultationModes', mode.value);
                        return (
                          <button
                            key={mode.value}
                            type="button"
                            onClick={() => handleCheckboxChange('consultationModes', mode.value)}
                            className={`relative overflow-hidden group flex flex-col items-center p-2 sm:p-2.5 rounded-lg sm:rounded-xl border-2 transition-all duration-300 ${
                              checked
                                ? 'border-orange-500 shadow-sm sm:shadow-md'
                                : 'border-gray-300/80 hover:border-orange-400/60'
                            } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                            style={{
                              background: checked
                                ? 'linear-gradient(135deg, rgba(249, 115, 22, 0.08) 0%, rgba(251, 191, 36, 0.08) 100%)'
                                : 'rgba(255,255,255,0.9)'
                            }}
                            disabled={isSubmitting}
                          >
                            <input
                              type="checkbox"
                              className="sr-only"
                              checked={checked}
                              onChange={() => {}}
                              disabled={isSubmitting}
                            />
                            
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-700"></div>
                            
                            <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 mb-1.5 sm:mb-2 ${
                              checked
                                ? 'bg-gradient-to-br from-orange-500 to-amber-500 shadow-md'
                                : 'bg-gray-100'
                            }`}>
                              <mode.icon size={14} className={`sm:w-4 sm:h-4 ${checked ? "text-white" : "text-gray-600"}`} />
                            </div>
                            <span className={`text-xs font-medium ${checked ? 'text-gray-900' : 'text-gray-700'}`}>
                              {mode.label}
                            </span>
                            
                            {checked && (
                              <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center shadow-sm sm:shadow-md">
                                <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-white"></div>
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Languages & Pricing Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-800 mb-1.5 sm:mb-1.5 ml-1">
                        <span className="flex items-center gap-1.5 sm:gap-2">
                          <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-md bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                            <Globe size={10} className="sm:w-3 sm:h-3 text-white" />
                          </div>
                          Languages Known
                          <span className="text-red-500 text-sm sm:text-base">*</span>
                        </span>
                      </label>
                      <div className="relative group">
                        <input
                          type="text"
                          name="languages"
                          value={formData.languages}
                          onChange={handleInputChange}
                          placeholder="e.g., Hindi, English"
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
                      {errors.languages && (
                        <div className="mt-1.5 flex items-center gap-2 animate-fadeIn px-2 py-1.5 sm:px-3 sm:py-2 bg-red-50/80 rounded-lg border border-red-200">
                          <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-[10px] sm:text-xs">!</span>
                          </div>
                          <p className="text-[10px] sm:text-xs text-red-700 font-medium">
                            {errors.languages}
                          </p>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-800 mb-1.5 sm:mb-1.5 ml-1">
                        <span className="flex items-center gap-1.5 sm:gap-2">
                          <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-md bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                            <span className="text-white text-[10px] sm:text-sm font-bold">₹</span>
                          </div>
                          Session Charges (₹)
                          <span className="text-red-500 text-sm sm:text-base">*</span>
                        </span>
                      </label>
                      <div className="relative group">
                        <div className="relative">
                          <input
                            type="number"
                            name="perSessionCharges"
                            value={formData.perSessionCharges}
                            onChange={handleInputChange}
                            min="0"
                            placeholder="Amount"
                            className="w-full bg-white/90 border-2 border-gray-300/80 rounded-lg sm:rounded-xl 
                                     pl-8 pr-3 py-2 sm:pl-10 sm:px-3.5 sm:py-2.5 text-xs sm:text-sm text-gray-900 
                                     placeholder-gray-500 focus:outline-none focus:border-orange-500 
                                     focus:ring-2 sm:focus:ring-3 focus:ring-orange-200/50 transition-all duration-300 
                                     group-hover:border-orange-400/60 backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed input field: [appearance:textfield] 
                            [&::-webkit-inner-spin-button]:appearance-none 
                            [&::-webkit-outer-spin-button]:appearance-none"
                            style={{
                              boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
                            }}
                            disabled={isSubmitting}
                          />
                          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 font-bold text-sm sm:text-base">
                            ₹
                          </div>
                        </div>
                        <div className="absolute inset-0 rounded-lg sm:rounded-xl border-2 border-transparent group-hover:border-orange-300/30 pointer-events-none transition-all duration-300"></div>
                      </div>
                      {errors.perSessionCharges && (
                        <div className="mt-1.5 flex items-center gap-2 animate-fadeIn px-2 py-1.5 sm:px-3 sm:py-2 bg-red-50/80 rounded-lg border border-red-200">
                          <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-[10px] sm:text-xs">!</span>
                          </div>
                          <p className="text-[10px] sm:text-xs text-red-700 font-medium">
                            {errors.perSessionCharges}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Section 3: About & Sample */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-1.5 h-6 bg-gradient-to-b from-orange-500 to-amber-500 rounded-full"></div>
                    <h2 className="text-sm sm:text-base font-semibold text-gray-800">About Your Practice</h2>
                  </div>

                  {/* Sample Prediction */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs sm:text-sm font-semibold text-gray-800 flex items-center gap-1.5 sm:gap-2">
                        <MessageSquare size={12} className="sm:w-4 sm:h-4 text-orange-600" />
                        About Your Style & Sample
                        <span className="text-red-500 text-sm sm:text-base">*</span>
                      </label>
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${formData.samplePrediction.length >= 50 ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
                        <span className={`text-[10px] sm:text-xs font-medium ${formData.samplePrediction.length >= 50 ? 'text-emerald-700' : 'text-amber-700'}`}>
                          {formData.samplePrediction.length}/50
                        </span>
                        {formData.samplePrediction.length >= 50 && (
                          <Zap size={10} className="sm:w-3 sm:h-3 text-emerald-500" />
                        )}
                      </div>
                    </div>
                    <div className="relative">
                      <textarea
                        name="samplePrediction"
                        value={formData.samplePrediction}
                        onChange={handleInputChange}
                        rows="3"
                        placeholder="Describe your astrological approach, specialization areas, prediction style..."
                        className="w-full bg-white/90 border-2 border-gray-300/80 rounded-lg sm:rounded-xl 
                                 px-3 py-2 sm:px-3.5 sm:py-2.5 text-xs sm:text-sm text-gray-900 
                                 placeholder-gray-500 focus:outline-none focus:border-orange-500 
                                 focus:ring-2 sm:focus:ring-3 focus:ring-orange-200/50 transition-all duration-300 
                                 resize-none backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{
                          boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
                        }}
                        disabled={isSubmitting}
                      />
                      {errors.samplePrediction && (
                        <div className="mt-1.5 flex items-center gap-2 animate-fadeIn px-2 py-1.5 sm:px-3 sm:py-2 bg-red-50/80 rounded-lg border border-red-200">
                          <AlertCircle size={12} className="sm:w-3 sm:h-3 text-red-500 flex-shrink-0" />
                          <p className="text-[10px] sm:text-xs text-red-700">
                            {errors.samplePrediction}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

              </div> {/* End of Form Grid */}

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
              
              {/* Submission Status */}
              <div className="mt-3 text-center">
                {isSubmitting ? (
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-amber-50 to-orange-50 rounded-full border border-amber-200">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></div>
                    <span className="text-xs text-amber-700 font-medium">Submitting...</span>
                  </div>
                ) : (
                  <p className="text-xs text-gray-500">
                    Your information will be reviewed within 24-48 hours
                  </p>
                )}
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
                  {isSubmitting ? 'Submitting...' : 'Step 2 of 2 - Professional Information Complete'}
                </p>
              </div>
            </div>

            {/* Footer Note */}
            <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-300/50">
              <div className="flex items-center justify-center gap-2 sm:gap-2.5">
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-br from-orange-500/10 to-amber-500/10 flex items-center justify-center">
                  <Sparkles size={10} className="sm:w-3 sm:h-3 text-orange-600" />
                </div>
                <p className="text-center text-[10px] sm:text-xs text-gray-600">
                  Join 500+ certified astrologers
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}