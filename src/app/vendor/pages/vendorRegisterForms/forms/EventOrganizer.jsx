import React, { useState } from 'react';
import { Camera, Users, MapPin, DollarSign, Building, Calendar, CheckCircle, AlertCircle, Upload, X, Sparkles, Target, Globe, Award, ArrowLeft } from 'lucide-react';
import DocumentUploadSection from '../../../components/DocumentUploadSection';

export default function EventOrganizer({ commonData, onBack, onSubmit }) {
  const [formData, setFormData] = useState({
    organizationName: '',
    eventTypes: [],
    eventsHandled: '',
    teamSize: '',
    cityCoverage: '',
    equipmentProvided: '',
    startingPrice: '',
    pastEventPhotos: [],
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
  const [photoPreview, setPhotoPreview] = useState([]);
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
      eventTypes: prev.eventTypes.includes(value)
        ? prev.eventTypes.filter(item => item !== value)
        : [...prev.eventTypes, value]
    }));
    if (errors.eventTypes) {
      setErrors(prev => ({ ...prev, eventTypes: '' }));
    }
  };

  const handleRadioChange = (value) => {
    setFormData(prev => ({
      ...prev,
      equipmentProvided: value
    }));
    if (errors.equipmentProvided) {
      setErrors(prev => ({ ...prev, equipmentProvided: '' }));
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length + formData.pastEventPhotos.length > 5) {
      alert('You can upload a maximum of 5 photos');
      return;
    }

    const validFiles = files.filter(file => {
      const isValidType = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type);
      const isValidSize = file.size <= 5 * 1024 * 1024;
      
      if (!isValidType) {
        alert(`${file.name} is not a valid image format. Please upload JPG, PNG, or WEBP.`);
        return false;
      }
      if (!isValidSize) {
        alert(`${file.name} exceeds 5MB. Please upload a smaller file.`);
        return false;
      }
      return true;
    });

    if (validFiles.length > 0) {
      setFormData(prev => ({
        ...prev,
        pastEventPhotos: [...prev.pastEventPhotos, ...validFiles]
      }));

      const newPreviews = validFiles.map(file => URL.createObjectURL(file));
      setPhotoPreview(prev => [...prev, ...newPreviews]);

      if (errors.pastEventPhotos) {
        setErrors(prev => ({ ...prev, pastEventPhotos: '' }));
      }
    }
  };

  const handleDocumentFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));
    }
  };

  const removePhoto = (index) => {
    URL.revokeObjectURL(photoPreview[index]);
    
    setFormData(prev => ({
      ...prev,
      pastEventPhotos: prev.pastEventPhotos.filter((_, i) => i !== index)
    }));
    setPhotoPreview(prev => prev.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.organizationName.trim()) {
      newErrors.organizationName = 'Organization name is required';
    }

    if (formData.eventTypes.length === 0) {
      newErrors.eventTypes = 'Please select at least one event type';
    }

    if (!formData.eventsHandled || formData.eventsHandled < 0) {
      newErrors.eventsHandled = 'Please enter valid number of events handled';
    }

    if (!formData.teamSize || formData.teamSize < 1) {
      newErrors.teamSize = 'Please enter valid team size (minimum 1)';
    }

    if (!formData.cityCoverage.trim()) {
      newErrors.cityCoverage = 'City coverage is required';
    }

    if (!formData.equipmentProvided) {
      newErrors.equipmentProvided = 'Please specify if equipment is provided';
    }

    if (!formData.startingPrice || formData.startingPrice < 0) {
      newErrors.startingPrice = 'Please enter valid starting price';
    }

    if (formData.pastEventPhotos.length === 0) {
      newErrors.pastEventPhotos = 'Please upload at least one past event photo';
    }

    if (formData.aadharNumber && formData.aadharNumber.length !== 12) {
      newErrors.aadharNumber = 'Aadhar number must be 12 digits';
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
        vendorType: 'eventOrganizer'
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
    photoPreview.forEach(url => URL.revokeObjectURL(url));
    
    setFormData({
      organizationName: '',
      eventTypes: [],
      eventsHandled: '',
      teamSize: '',
      cityCoverage: '',
      equipmentProvided: '',
      startingPrice: '',
      pastEventPhotos: []
    });
    setPhotoPreview([]);
    setErrors({});
  };

  const eventTypeOptions = [
    { value: 'Katha', label: 'Katha' },
    { value: 'Yagya', label: 'Yagya' },
    { value: 'Bhajan Sandhya', label: 'Bhajan Sandhya' },
    { value: 'Puja Ceremony', label: 'Puja Ceremony' },
    { value: 'Religious Seminar', label: 'Religious Seminar' }
  ];

  const equipmentOptions = [
    { value: 'yes', label: 'Yes, We Provide' },
    { value: 'no', label: 'No, Client Provides' }
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
                Event Organizer Registration
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-1.5">
                Complete your vendor profile details
              </p>
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-3.5 sm:py-1.5 bg-gradient-to-r from-amber-100 to-orange-100 rounded-full border border-amber-200">
                <Award size={12} className="sm:w-4 sm:h-4 text-amber-600" />
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

            <form onSubmit={handleSubmit}>
              {/* Form Grid - Compact spacing */}
              <div className="space-y-3 sm:space-y-3.5">
                
                {/* Organization Name */}
                <div className="mb-3 sm:mb-3.5">
                  <label className="block text-xs sm:text-sm font-medium text-gray-800 mb-1.5 sm:mb-1.5 ml-1">
                    <span className="flex items-center gap-1.5 sm:gap-2">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-md bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                        <span className="text-white text-[10px] sm:text-xs font-bold">🏢</span>
                      </div>
                      Organization Name
                      <span className="text-red-500 text-sm sm:text-base">*</span>
                    </span>
                  </label>
                  <div className="relative group">
                    <input
                      type="text"
                      name="organizationName"
                      value={formData.organizationName}
                      onChange={handleInputChange}
                      placeholder="Enter your organization name"
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
                  {errors.organizationName && (
                    <div className="mt-1.5 flex items-center gap-2 animate-fadeIn px-2 py-1.5 sm:px-3 sm:py-2 bg-red-50/80 rounded-lg border border-red-200">
                      <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-[10px] sm:text-xs">!</span>
                      </div>
                      <p className="text-[10px] sm:text-xs text-red-700 font-medium">
                        {errors.organizationName}
                      </p>
                    </div>
                  )}
                </div>

                {/* Event Types */}
                <div className="mb-3 sm:mb-3.5">
                  <label className="block text-xs sm:text-sm font-medium text-gray-800 mb-1.5 sm:mb-1.5 ml-1">
                    <span className="flex items-center gap-1.5 sm:gap-2">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-md bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                        <Calendar size={10} className="sm:w-3 sm:h-3 text-white" />
                      </div>
                      Event Types (Select one or more)
                      <span className="text-red-500 text-sm sm:text-base">*</span>
                    </span>
                  </label>
                  <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
                    {eventTypeOptions.map(({ value, label }) => (
                      <label
                        key={value}
                        className={`relative overflow-hidden group cursor-pointer p-2 sm:p-2.5 rounded-lg sm:rounded-xl border-2 transition-all duration-300 ${
                          formData.eventTypes.includes(value)
                            ? 'border-orange-500 shadow-md sm:shadow-lg'
                            : 'border-gray-300/80 hover:border-orange-400/60'
                        } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                        style={{
                          background: formData.eventTypes.includes(value)
                            ? 'linear-gradient(135deg, rgba(249, 115, 22, 0.08) 0%, rgba(251, 191, 36, 0.08) 100%)'
                            : 'rgba(255,255,255,0.9)'
                        }}
                      >
                        <input
                          type="checkbox"
                          className="sr-only"
                          value={value}
                          checked={formData.eventTypes.includes(value)}
                          onChange={() => handleCheckboxChange(value)}
                          disabled={isSubmitting}
                        />
                        
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-0 group-hover:opacity-100 translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-700"></div>
                        
                        <div className="relative z-10 flex items-center gap-2 sm:gap-2.5">
                          <div className={`w-3 h-3 sm:w-4 sm:h-4 rounded flex items-center justify-center transition-all duration-300 ${
                            formData.eventTypes.includes(value)
                              ? 'bg-gradient-to-br from-orange-500 to-amber-500'
                              : 'bg-gray-200 border border-gray-300'
                          }`}>
                            {formData.eventTypes.includes(value) && (
                              <svg className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                          <span className={`text-xs sm:text-sm font-medium ${
                            formData.eventTypes.includes(value)
                              ? 'text-gray-900'
                              : 'text-gray-700'
                          }`}>
                            {label}
                          </span>
                        </div>
                        
                        {formData.eventTypes.includes(value) && (
                          <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/10 to-amber-500/10 blur-md rounded-lg sm:rounded-xl -z-10"></div>
                        )}
                      </label>
                    ))}
                  </div>
                  {errors.eventTypes && (
                    <div className="mt-2 flex items-center gap-2 animate-fadeIn px-2 py-1.5 sm:px-3 sm:py-2 bg-red-50/80 rounded-lg border border-red-200">
                      <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-[10px] sm:text-xs">!</span>
                      </div>
                      <p className="text-[10px] sm:text-xs text-red-700 font-medium">
                        {errors.eventTypes}
                      </p>
                    </div>
                  )}
                </div>

                {/* Experience & Team Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5 mb-3 sm:mb-3.5">
                  {/* Events Handled */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-800 mb-1.5 sm:mb-1.5 ml-1">
                      <span className="flex items-center gap-1.5 sm:gap-2">
                        <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-md bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                          <CheckCircle size={10} className="sm:w-3 sm:h-3 text-white" />
                        </div>
                        Events Handled
                        <span className="text-red-500 text-sm sm:text-base">*</span>
                      </span>
                    </label>
                    <div className="relative group">
                      <input
                        type="number"
                        name="eventsHandled"
                        value={formData.eventsHandled}
                        onChange={handleInputChange}
                        min="0"
                        placeholder="Number of events"
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
                    {errors.eventsHandled && (
                      <div className="mt-1.5 flex items-center gap-2 animate-fadeIn">
                        <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-[10px] sm:text-xs">!</span>
                        </div>
                        <p className="text-[10px] sm:text-xs text-amber-700 font-medium">
                          {errors.eventsHandled}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Team Size */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-800 mb-1.5 sm:mb-1.5 ml-1">
                      <span className="flex items-center gap-1.5 sm:gap-2">
                        <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-md bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                          <Users size={10} className="sm:w-3 sm:h-3 text-white" />
                        </div>
                        Team Size
                        <span className="text-red-500 text-sm sm:text-base">*</span>
                      </span>
                    </label>
                    <div className="relative group">
                      <input
                        type="number"
                        name="teamSize"
                        value={formData.teamSize}
                        onChange={handleInputChange}
                        min="1"
                        placeholder="Number of team members"
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
                    {errors.teamSize && (
                      <div className="mt-1.5 flex items-center gap-2 animate-fadeIn">
                        <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-[10px] sm:text-xs">!</span>
                        </div>
                        <p className="text-[10px] sm:text-xs text-amber-700 font-medium">
                          {errors.teamSize}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* City Coverage */}
                <div className="mb-3 sm:mb-3.5">
                  <label className="block text-xs sm:text-sm font-medium text-gray-800 mb-1.5 sm:mb-1.5 ml-1">
                    <span className="flex items-center gap-1.5 sm:gap-2">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-md bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                        <MapPin size={10} className="sm:w-3 sm:h-3 text-white" />
                      </div>
                      City Coverage
                      <span className="text-red-500 text-sm sm:text-base">*</span>
                    </span>
                  </label>
                  <div className="relative group">
                    <input
                      type="text"
                      name="cityCoverage"
                      value={formData.cityCoverage}
                      onChange={handleInputChange}
                      placeholder="e.g., Mumbai, Pune, Nashik, Delhi"
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
                  {errors.cityCoverage && (
                    <div className="mt-1.5 flex items-center gap-2 animate-fadeIn px-2 py-1.5 sm:px-3 sm:py-2 bg-red-50/80 rounded-lg border border-red-200">
                      <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-[10px] sm:text-xs">!</span>
                      </div>
                      <p className="text-[10px] sm:text-xs text-red-700 font-medium">
                        {errors.cityCoverage}
                      </p>
                    </div>
                  )}
                </div>

                {/* Equipment Provided */}
                <div className="mb-3 sm:mb-3.5">
                  <label className="block text-xs sm:text-sm font-medium text-gray-800 mb-1.5 sm:mb-1.5 ml-1">
                    <span className="flex items-center gap-1.5 sm:gap-2">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-md bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                        <span className="text-white text-[10px] sm:text-sm font-bold">⚙️</span>
                      </div>
                      Equipment Provided
                      <span className="text-red-500 text-sm sm:text-base">*</span>
                    </span>
                  </label>
                  <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
                    {equipmentOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => handleRadioChange(option.value)}
                        className={`relative overflow-hidden group flex items-center justify-center p-2 sm:p-2.5 rounded-lg sm:rounded-xl border-2 transition-all duration-300 ${
                          formData.equipmentProvided === option.value
                            ? 'border-orange-500 shadow-sm sm:shadow-md'
                            : 'border-gray-300/80 hover:border-orange-400/60'
                        } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                        style={{
                          background: formData.equipmentProvided === option.value
                            ? 'linear-gradient(135deg, rgba(249, 115, 22, 0.08) 0%, rgba(251, 191, 36, 0.08) 100%)'
                            : 'rgba(255,255,255,0.9)'
                        }}
                        disabled={isSubmitting}
                      >
                        <input
                          type="radio"
                          className="hidden"
                          name="equipmentProvided"
                          value={option.value}
                          checked={formData.equipmentProvided === option.value}
                          onChange={() => {}}
                          disabled={isSubmitting}
                        />
                        
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-700"></div>
                        
                        <span className={`text-xs sm:text-sm font-semibold relative z-10 ${
                          formData.equipmentProvided === option.value ? 'text-gray-900' : 'text-gray-700'
                        }`}>
                          {option.label}
                        </span>
                        
                        {formData.equipmentProvided === option.value && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center shadow-sm sm:shadow-md">
                            <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-white"></div>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                  {errors.equipmentProvided && (
                    <div className="mt-2 flex items-center gap-2 animate-fadeIn px-2 py-1.5 sm:px-3 sm:py-2 bg-red-50/80 rounded-lg border border-red-200">
                      <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-[10px] sm:text-xs">!</span>
                      </div>
                      <p className="text-[10px] sm:text-xs text-red-700 font-medium">
                        {errors.equipmentProvided}
                      </p>
                    </div>
                  )}
                </div>

                {/* Starting Price */}
                <div className="mb-3 sm:mb-3.5">
                  <label className="block text-xs sm:text-sm font-medium text-gray-800 mb-1.5 sm:mb-1.5 ml-1">
                    <span className="flex items-center gap-1.5 sm:gap-2">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-md bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                        <span className="text-white text-[10px] sm:text-sm font-bold">₹</span>
                      </div>
                      Starting Price (₹)
                      <span className="text-red-500 text-sm sm:text-base">*</span>
                    </span>
                  </label>
                  <div className="relative group">
                    <input
                      type="number"
                      name="startingPrice"
                      value={formData.startingPrice}
                      onChange={handleInputChange}
                      min="0"
                      placeholder="Enter starting price in ₹"
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
                  {errors.startingPrice && (
                    <div className="mt-1.5 flex items-center gap-2 animate-fadeIn px-2 py-1.5 sm:px-3 sm:py-2 bg-red-50/80 rounded-lg border border-red-200">
                      <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-[10px] sm:text-xs">!</span>
                      </div>
                      <p className="text-[10px] sm:text-xs text-red-700 font-medium">
                        {errors.startingPrice}
                      </p>
                    </div>
                  )}
                </div>

                {/* Past Event Photos */}
                <div className="mb-3 sm:mb-3.5">
                  <label className="block text-xs sm:text-sm font-medium text-gray-800 mb-1.5 sm:mb-1.5 ml-1">
                    <span className="flex items-center gap-1.5 sm:gap-2">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-md bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                        <Camera size={10} className="sm:w-3 sm:h-3 text-white" />
                      </div>
                      Past Event Photos
                      <span className="text-red-500 text-sm sm:text-base">*</span>
                    </span>
                  </label>
                  
                  {/* Upload Area */}
                  <div className="relative group">
                    <input
                      type="file"
                      className="sr-only"
                      id="photo-upload"
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      multiple
                      onChange={handleFileChange}
                      disabled={formData.pastEventPhotos.length >= 5 || isSubmitting}
                    />
                    <label htmlFor="photo-upload" className="cursor-pointer">
                      <div className={`border-2 border-dashed ${formData.pastEventPhotos.length >= 5 ? 'border-gray-200/50' : 'border-gray-300/80'} rounded-lg sm:rounded-xl p-3 sm:p-4 text-center hover:border-orange-400/60 transition-all duration-300 group-hover:shadow-sm backdrop-blur-sm`} style={{
                        background: 'rgba(255,255,255,0.9)'
                      }}>
                        <div className="flex flex-col items-center">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center mb-1.5 sm:mb-2">
                            <Upload className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
                          </div>
                          <p className="text-xs sm:text-sm text-gray-600 mb-1">
                            Click to upload or drag and drop
                          </p>
                          <p className="text-[10px] sm:text-xs text-gray-500">
                            Maximum 5 photos (JPG, PNG, WEBP up to 5MB each)
                          </p>
                          <div className="mt-1.5 sm:mt-2 flex items-center gap-1.5 sm:gap-2">
                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-amber-500"></div>
                            <p className="text-[10px] sm:text-xs font-medium text-amber-700">
                              {formData.pastEventPhotos.length}/5 photos uploaded
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="absolute inset-0 rounded-lg sm:rounded-xl border-2 border-transparent group-hover:border-orange-300/30 pointer-events-none transition-all duration-300"></div>
                    </label>
                  </div>

                  {/* Photo Previews */}
                  {photoPreview.length > 0 && (
                    <div className="mt-3 grid grid-cols-3 gap-2">
                      {photoPreview.map((preview, index) => (
                        <div key={index} className="relative group">
                          <div className="relative overflow-hidden rounded-lg border-2 border-gray-300/80 hover:border-orange-400/60 transition-all duration-300">
                            <img
                              src={preview}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-20 sm:h-24 object-cover hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          </div>
                          <button
                            type="button"
                            onClick={() => removePhoto(index)}
                            disabled={isSubmitting}
                            className="absolute -top-1.5 -right-1.5 sm:-top-2 sm:-right-2 bg-gradient-to-br from-red-500 to-red-600 text-white rounded-full p-0.5 sm:p-1 shadow-lg hover:scale-110 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <X size={10} className="sm:w-3 sm:h-3" />
                          </button>
                          <div className="absolute bottom-1 right-1 text-[10px] sm:text-xs text-white bg-black/50 px-1 py-0.5 rounded">
                            {index + 1}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {errors.pastEventPhotos && (
                    <div className="mt-2 flex items-center gap-2 animate-fadeIn px-2 py-1.5 sm:px-3 sm:py-2 bg-red-50/80 rounded-lg border border-red-200">
                      <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-[10px] sm:text-xs">!</span>
                      </div>
                      <p className="text-[10px] sm:text-xs text-red-700 font-medium">
                        {errors.pastEventPhotos}
                      </p>
                    </div>
                  )}
                </div>

                {/* Document Upload Section */}
                <DocumentUploadSection 
                  formData={formData} 
                  handleInputChange={handleInputChange} 
                  handleFileChange={handleDocumentFileChange} 
                  errors={errors} 
                  vendorType="eventOrganizer" 
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
                      Please ensure all information is accurate before submitting your registration.
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
                  {isSubmitting ? 'Submitting...' : 'Step 2 of 2 - Professional Information Complete'}
                </p>
              </div>
            </div>

            {/* Footer Note */}
            <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-300/50">
              <div className="flex items-center justify-center gap-2 sm:gap-2.5">
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-br from-orange-500/10 to-amber-500/10 flex items-center justify-center">
                  <CheckCircle size={10} className="sm:w-3 sm:h-3 text-orange-600" />
                </div>
                <p className="text-center text-[10px] sm:text-xs text-gray-600">
                  By submitting, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}