import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  User,
  Mail,
  Phone,
  Calendar,
  Globe,
  MapPin,
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  ChevronDown,
  Shield,
  Sparkles,
  ArrowLeft,
  Camera,
  Trash
} from 'lucide-react';
import { toast } from 'react-toastify';
import { useRegisterUserMutation, useSendOtpMutation, useVerifyOtpMutation } from '../../../services/userApi';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    country: '',
    state: '',
    city: '',
    password: '',
    confirmPassword: '',
    terms: false
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // OTP Verification States
  const [phoneOtpStep, setPhoneOtpStep] = useState('idle'); // idle, sent, verified
  const [emailOtpStep, setEmailOtpStep] = useState('idle'); // idle, sent, verified
  const [phoneOtp, setPhoneOtp] = useState('');
  const [emailOtp, setEmailOtp] = useState('');
  const [phoneTimer, setPhoneTimer] = useState(0);
  const [emailTimer, setEmailTimer] = useState(0);

  const isMobileValid = formData.mobile.length === 10 && !errors.mobile;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) && !errors.email;

  // RTK Query Mutations
  const [registerUser, { isLoading: isRegistering }] = useRegisterUserMutation();
  const [sendOtp] = useSendOtpMutation();
  const [verifyOtp] = useVerifyOtpMutation();

  // Timers
  useEffect(() => {
    let pInterval, eInterval;
    if (phoneTimer > 0) pInterval = setInterval(() => setPhoneTimer(t => t - 1), 1000);
    if (emailTimer > 0) eInterval = setInterval(() => setEmailTimer(t => t - 1), 1000);
    return () => {
      clearInterval(pInterval);
      clearInterval(eInterval);
    };
  }, [phoneTimer, emailTimer]);

  // Complete Country-State-City Data
  const locationData = {
    India: {
      Maharashtra: ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad'],
      Delhi: ['New Delhi', 'South Delhi', 'North Delhi', 'East Delhi'],
      Karnataka: ['Bengaluru', 'Mysore', 'Hubli', 'Mangalore'],
      'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Salem'],
      Gujarat: ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot'],
      'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Agra', 'Varanasi']
    },
    'United States': {
      California: ['Los Angeles', 'San Francisco', 'San Diego', 'Sacramento'],
      'New York': ['New York City', 'Buffalo', 'Rochester', 'Albany'],
      Texas: ['Houston', 'Dallas', 'Austin', 'San Antonio'],
      Florida: ['Miami', 'Orlando', 'Tampa', 'Jacksonville']
    },
    'United Kingdom': {
      England: ['London', 'Manchester', 'Birmingham', 'Liverpool'],
      Scotland: ['Edinburgh', 'Glasgow', 'Aberdeen'],
      Wales: ['Cardiff', 'Swansea', 'Newport']
    },
    Canada: {
      Ontario: ['Toronto', 'Ottawa', 'Mississauga', 'Hamilton'],
      'British Columbia': ['Vancouver', 'Victoria', 'Surrey'],
      Quebec: ['Montreal', 'Quebec City', 'Laval']
    },
    Australia: {
      'New South Wales': ['Sydney', 'Newcastle', 'Wollongong'],
      Victoria: ['Melbourne', 'Geelong', 'Ballarat'],
      Queensland: ['Brisbane', 'Gold Coast', 'Cairns']
    }
  };

  // Get countries
  const countries = Object.keys(locationData);

  // Get states based on selected country
  const getStates = () => {
    if (!formData.country) return [];
    return Object.keys(locationData[formData.country] || {});
  };

  // Get cities based on selected country and state
  const getCities = () => {
    if (!formData.country || !formData.state) return [];
    return locationData[formData.country]?.[formData.state] || [];
  };



  const validateField = (name, value) => {
    switch (name) {
      case 'fullName':
        return value.length < 3 ? 'Name must be at least 3 characters' : '';
      case 'mobile':
        return !/^\d{10}$/.test(value) ? 'Enter valid 10-digit mobile number' : '';
      case 'email':
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Enter valid email address' : '';
      case 'password':
        return value.length < 6 ? 'Password must be at least 6 characters' : '';
      case 'confirmPassword':
        return value !== formData.password ? 'Passwords do not match' : '';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    // Reset dependent fields
    if (name === 'country') {
      setFormData(prev => ({
        ...prev,
        country: newValue,
        state: '',
        city: ''
      }));
    } else if (name === 'state') {
      setFormData(prev => ({
        ...prev,
        state: newValue,
        city: ''
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: newValue
      }));
    }

    // Validate on change
    const error = validateField(name, newValue);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleBlur = (name) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, formData[name]);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };



  const isFormValid = () => {
    const requiredFields = ['fullName', 'mobile', 'email', 'password', 'confirmPassword', 'terms'];
    const fieldsTouched = requiredFields.every(field => {
      if (field === 'terms') return formData[field] === true;
      return formData[field] && !errors[field];
    });
    return fieldsTouched && phoneOtpStep === 'verified' && emailOtpStep === 'verified';
  };

  const handleSendVerification = async (identifier, type) => {
    try {
      const response = await sendOtp({ identifier, type }).unwrap();
      if (type === 'mobile') {
        setPhoneOtpStep('sent');
        setPhoneTimer(30);
      } else {
        setEmailOtpStep('sent');
        setEmailTimer(30);
      }
      if (response.debugOtp && type === 'mobile') toast.info(`OTP: ${response.debugOtp}`);
      toast.success(response.message || `OTP sent to ${type}`);
    } catch (err) {
      toast.error(err.data?.message || `Failed to send OTP to ${type}`);
    }
  };

  const handleVerifyOTP = async (identifier, otp, type) => {
    try {
      await verifyOtp({ identifier, otp }).unwrap();
      if (type === 'mobile') {
        setPhoneOtpStep('verified');
      } else {
        setEmailOtpStep('verified');
      }
      toast.success(`${type === 'mobile' ? 'Mobile' : 'Email'} verified successfully!`);
    } catch (err) {
      toast.error(err.data?.message || "Invalid OTP");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Mark all fields as touched
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);

    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0 && formData.terms) {
      if (phoneOtpStep !== 'verified' || emailOtpStep !== 'verified') {
        return toast.warning('Please verify both Mobile and Email first');
      }

      // Prepare FormData for multipart/form-data support (for image upload)
      const submitData = new FormData();
      submitData.append('name', formData.fullName);
      submitData.append('email', formData.email);
      submitData.append('phone', formData.mobile);
      submitData.append('password', formData.password);
      submitData.append('location', `${formData.city}, ${formData.state}, ${formData.country}`);


      // Submit form using RTK Mutation
      toast.promise(
        registerUser(submitData).unwrap(),
        {
          pending: 'Creating your account...',
          success: {
            render: ({ data }) => {
              setTimeout(() => {
                if (location.state?.returnTo) {
                  navigate('/user_login', { state: location.state });
                } else {
                  navigate('/user_login');
                }
              }, 2000);
              return 'Registration successful! Please login.';
            }
          },
          error: {
            render: ({ data }) => data?.message || 'Registration failed'
          }
        }
      );
    }
  };

  const availableStates = getStates();
  const availableCities = getCities();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      {/* Back to Website Arrow Button */}
      <button
        onClick={() => navigate("/")}
        className="fixed top-6 left-6 z-50 flex items-center justify-center w-10 h-10 bg-white border border-orange-100 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group"
        title="Back to Website"
      >
        <ArrowLeft size={18} className="text-orange-600 group-hover:-translate-x-1 transition-transform" />
      </button>

      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-amber-100/30 to-orange-100/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-amber-100/30 to-orange-100/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Main Container */}
      <div className="relative max-w-4xl mx-auto">
        {/* Premium Card */}
        <div className="bg-white rounded-3xl shadow-[0_20px_70px_-15px_rgba(0,0,0,0.15)] border border-white/50 overflow-hidden">
          {/* Decorative Header Line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-300 via-orange-400 to-amber-300"></div>

          <div className="p-6 sm:p-8 lg:p-10">
            {/* Header with Logo */}
            <div className="text-center mb-8">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-300 to-orange-300 rounded-2xl blur-xl opacity-50"></div>
                <div className="relative w-20 h-20 bg-gradient-to-br from-amber-300 to-orange-400 rounded-2xl shadow-lg flex items-center justify-center mx-auto mb-4">
                  <img
                    src="/logo.png"
                    alt="Acharya Ji Online"
                    className="w-14 h-14 object-contain"
                  />
                </div>
              </div>

              <h2 className="text-2xl sm:text-3xl font-light text-gray-900 mb-2 tracking-tight">
                Create Account
              </h2>
              <p className="text-sm text-gray-500 font-light">
                Join us to begin your spiritual journey
              </p>

              {/* Premium Badge */}
              <div className="inline-flex items-center gap-1.5 mt-3 px-3 py-1 bg-gradient-to-r from-amber-50 to-orange-50 rounded-full border border-amber-100">
                <Sparkles size={14} className="text-amber-500" />
                <span className="text-xs font-medium text-gray-700">Premium Registration</span>
              </div>


            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Details Section */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-6 bg-gradient-to-b from-amber-400 to-orange-500 rounded-full"></div>
                  <h3 className="text-lg font-medium text-gray-800">Basic Details</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Full Name */}
                  <div className="space-y-1">
                    <label className="flex items-center gap-1 text-xs font-medium text-gray-600 uppercase tracking-wider ml-1">
                      <User size={14} className="text-amber-500" />
                      Full Name <span className="text-red-400">*</span>
                    </label>
                    <div className="relative group">
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('fullName')}
                        onBlur={() => {
                          setFocusedField(null);
                          handleBlur('fullName');
                        }}
                        placeholder="John Doe"
                        className={`w-full bg-white border-2 ${touched.fullName && errors.fullName
                          ? 'border-red-300 focus:border-red-400'
                          : focusedField === 'fullName'
                            ? 'border-amber-300 shadow-lg shadow-amber-100'
                            : 'border-gray-200 hover:border-gray-300'
                          } rounded-xl px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none transition-all duration-300`}
                      />
                      {touched.fullName && errors.fullName && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          <AlertCircle size={16} className="text-red-400" />
                        </div>
                      )}
                    </div>
                    {touched.fullName && errors.fullName && (
                      <p className="text-xs text-red-500 mt-1 ml-1">{errors.fullName}</p>
                    )}
                  </div>

                  {/* Mobile Number */}
                  <div className="space-y-1">
                    <label className="flex items-center gap-1 text-xs font-medium text-gray-600 uppercase tracking-wider ml-1">
                      <Phone size={14} className="text-amber-500" />
                      Mobile Number <span className="text-red-400">*</span>
                    </label>
                    <div className="relative group">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                        <span className="text-sm font-medium text-gray-400">+91</span>
                        <div className="w-px h-4 bg-gray-300"></div>
                      </div>
                      <input
                        type="tel"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('mobile')}
                        onBlur={() => {
                          setFocusedField(null);
                          handleBlur('mobile');
                        }}
                        placeholder="9876543210"
                        maxLength="10"
                        className={`w-full bg-white border-2 ${touched.mobile && errors.mobile
                          ? 'border-red-300 focus:border-red-400'
                          : focusedField === 'mobile'
                            ? 'border-amber-300 shadow-lg shadow-amber-100'
                            : 'border-gray-200 hover:border-gray-300'
                          } rounded-xl px-4 py-2.5 pl-16 text-sm text-gray-700 placeholder-gray-400 focus:outline-none transition-all duration-300 ${phoneOtpStep === 'verified' ? 'bg-green-50/30' : ''}`}
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                        {phoneOtpStep === 'idle' && isMobileValid && (
                          <button
                            type="button"
                            onClick={() => handleSendVerification(formData.mobile, 'mobile')}
                            className="text-[10px] bg-amber-500 text-white px-2 py-1 rounded-lg font-bold hover:bg-amber-600"
                          >
                            Verify
                          </button>
                        )}
                        {phoneOtpStep === 'verified' && (
                          <CheckCircle size={18} className="text-green-500" />
                        )}
                        {touched.mobile && errors.mobile && phoneOtpStep !== 'verified' && (
                          <AlertCircle size={16} className="text-red-400" />
                        )}
                      </div>
                    </div>
                    {phoneOtpStep === 'sent' && (
                      <div className="mt-2 flex items-center gap-2">
                        <input
                          type="text"
                          placeholder="Enter OTP"
                          value={phoneOtp}
                          onChange={(e) => setPhoneOtp(e.target.value)}
                          className="w-24 px-2 py-1 text-xs border rounded-lg focus:outline-amber-400"
                        />
                        <button
                          type="button"
                          onClick={() => handleVerifyOTP(formData.mobile, phoneOtp, 'mobile')}
                          className="text-[10px] bg-green-500 text-white px-2 py-1 rounded-lg font-bold"
                        >
                          Verify
                        </button>
                        {phoneTimer > 0 ? (
                          <span className="text-[10px] text-gray-400">{phoneTimer}s</span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleSendVerification(formData.mobile, 'mobile')}
                            className="text-[10px] text-amber-600 font-bold"
                          >
                            Resend
                          </button>
                        )}
                      </div>
                    )}
                    {touched.mobile && errors.mobile && (
                      <p className="text-xs text-red-500 mt-1 ml-1">{errors.mobile}</p>
                    )}
                  </div>

                  {/* Email Address */}
                  <div className="space-y-1">
                    <label className="flex items-center gap-1 text-xs font-medium text-gray-600 uppercase tracking-wider ml-1">
                      <Mail size={14} className="text-amber-500" />
                      Email Address <span className="text-red-400">*</span>
                    </label>
                    <div className="relative group">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => {
                          setFocusedField(null);
                          handleBlur('email');
                        }}
                        placeholder="hello@example.com"
                        className={`w-full bg-white border-2 ${touched.email && errors.email
                          ? 'border-red-300 focus:border-red-400'
                          : focusedField === 'email'
                            ? 'border-amber-300 shadow-lg shadow-amber-100'
                            : 'border-gray-200 hover:border-gray-300'
                          } rounded-xl px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none transition-all duration-300 ${emailOtpStep === 'verified' ? 'bg-green-50/30' : ''}`}
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                        {emailOtpStep === 'idle' && isEmailValid && (
                          <button
                            type="button"
                            onClick={() => handleSendVerification(formData.email, 'email')}
                            className="text-[10px] bg-amber-500 text-white px-2 py-1 rounded-lg font-bold hover:bg-amber-600"
                          >
                            Verify
                          </button>
                        )}
                        {emailOtpStep === 'verified' && (
                          <CheckCircle size={18} className="text-green-500" />
                        )}
                        {touched.email && errors.email && emailOtpStep !== 'verified' && (
                          <AlertCircle size={16} className="text-red-400" />
                        )}
                      </div>
                    </div>
                    {emailOtpStep === 'sent' && (
                      <div className="mt-2 flex items-center gap-2">
                        <input
                          type="text"
                          placeholder="Enter OTP"
                          value={emailOtp}
                          onChange={(e) => setEmailOtp(e.target.value)}
                          className="w-24 px-2 py-1 text-xs border rounded-lg focus:outline-amber-400"
                        />
                        <button
                          type="button"
                          onClick={() => handleVerifyOTP(formData.email, emailOtp, 'email')}
                          className="text-[10px] bg-green-500 text-white px-2 py-1 rounded-lg font-bold"
                        >
                          Verify
                        </button>
                        {emailTimer > 0 ? (
                          <span className="text-[10px] text-gray-400">{emailTimer}s</span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleSendVerification(formData.email, 'email')}
                            className="text-[10px] text-amber-600 font-bold"
                          >
                            Resend
                          </button>
                        )}
                      </div>
                    )}
                    {touched.email && errors.email && (
                      <p className="text-xs text-red-500 mt-1 ml-1">{errors.email}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Personal Details Section */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-6 bg-gradient-to-b from-amber-400 to-orange-500 rounded-full"></div>
                  <h3 className="text-lg font-medium text-gray-800">Address Details</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                  {/* Country */}
                  <div className="space-y-1">
                    <label className="flex items-center gap-1 text-xs font-medium text-gray-600 uppercase tracking-wider ml-1">
                      <Globe size={14} className="text-amber-500" />
                      Country <span className="text-gray-400 text-[10px]">(Select Country)</span>
                    </label>
                    <div className="relative">
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('country')}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full bg-white border-2 ${focusedField === 'country'
                          ? 'border-amber-300 shadow-lg shadow-amber-100'
                          : 'border-gray-200 hover:border-gray-300'
                          } rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none transition-all duration-300 appearance-none`}
                      >
                        <option value="">Select Country</option>
                        {countries.map(country => (
                          <option key={country} value={country}>{country}</option>
                        ))}
                      </select>
                      <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* State */}
                  <div className="space-y-1">
                    <label className="flex items-center gap-1 text-xs font-medium text-gray-600 uppercase tracking-wider ml-1">
                      <MapPin size={14} className="text-amber-500" />
                      State <span className="text-gray-400 text-[10px]">(Select State)</span>
                    </label>
                    <div className="relative">
                      <select
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('state')}
                        onBlur={() => setFocusedField(null)}
                        disabled={!formData.country}
                        className={`w-full bg-white border-2 ${focusedField === 'state'
                          ? 'border-amber-300 shadow-lg shadow-amber-100'
                          : 'border-gray-200 hover:border-gray-300'
                          } rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none transition-all duration-300 appearance-none disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed`}
                      >
                        <option value="">Select State</option>
                        {availableStates.map(state => (
                          <option key={state} value={state}>{state}</option>
                        ))}
                      </select>
                      <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* City */}
                  <div className="space-y-1">
                    <label className="flex items-center gap-1 text-xs font-medium text-gray-600 uppercase tracking-wider ml-1">
                      <MapPin size={14} className="text-amber-500" />
                      City <span className="text-gray-400 text-[10px]">(Select City)</span>
                    </label>
                    <div className="relative">
                      <select
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('city')}
                        onBlur={() => setFocusedField(null)}
                        disabled={!formData.state}
                        className={`w-full bg-white border-2 ${focusedField === 'city'
                          ? 'border-amber-300 shadow-lg shadow-amber-100'
                          : 'border-gray-200 hover:border-gray-300'
                          } rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none transition-all duration-300 appearance-none disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed`}
                      >
                        <option value="">Select City</option>
                        {availableCities.map(city => (
                          <option key={city} value={city}>{city}</option>
                        ))}
                      </select>
                      <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Location Flow Indicator */}
                {(formData.country || formData.state || formData.city) && (
                  <div className="flex items-center gap-2 text-xs text-gray-500 bg-amber-50/50 p-2 rounded-lg">
                    <Globe size={14} className="text-amber-500" />
                    <span>Selected: </span>
                    {formData.country && <span className="font-medium text-gray-700">{formData.country}</span>}
                    {formData.state && (
                      <>
                        <ArrowRight size={12} className="text-amber-400" />
                        <span className="font-medium text-gray-700">{formData.state}</span>
                      </>
                    )}
                    {formData.city && (
                      <>
                        <ArrowRight size={12} className="text-amber-400" />
                        <span className="font-medium text-gray-700">{formData.city}</span>
                      </>
                    )}
                  </div>
                )}
              </div>


              {/* Security Section */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-6 bg-gradient-to-b from-amber-400 to-orange-500 rounded-full"></div>
                  <h3 className="text-lg font-medium text-gray-800">Security</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Password */}
                  <div className="space-y-1">
                    <label className="flex items-center gap-1 text-xs font-medium text-gray-600 uppercase tracking-wider ml-1">
                      <Lock size={14} className="text-amber-500" />
                      Password <span className="text-red-400">*</span>
                    </label>
                    <div className="relative group">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('password')}
                        onBlur={() => {
                          setFocusedField(null);
                          handleBlur('password');
                        }}
                        placeholder="••••••••"
                        className={`w-full bg-white border-2 ${touched.password && errors.password
                          ? 'border-red-300 focus:border-red-400'
                          : focusedField === 'password'
                            ? 'border-amber-300 shadow-lg shadow-amber-100'
                            : 'border-gray-200 hover:border-gray-300'
                          } rounded-xl px-4 py-2.5 pr-12 text-sm text-gray-700 placeholder-gray-400 focus:outline-none transition-all duration-300`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {touched.password && errors.password && (
                      <p className="text-xs text-red-500 mt-1 ml-1">{errors.password}</p>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div className="space-y-1">
                    <label className="flex items-center gap-1 text-xs font-medium text-gray-600 uppercase tracking-wider ml-1">
                      <Lock size={14} className="text-amber-500" />
                      Confirm Password <span className="text-red-400">*</span>
                    </label>
                    <div className="relative group">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('confirmPassword')}
                        onBlur={() => {
                          setFocusedField(null);
                          handleBlur('confirmPassword');
                        }}
                        placeholder="••••••••"
                        className={`w-full bg-white border-2 ${touched.confirmPassword && errors.confirmPassword
                          ? 'border-red-300 focus:border-red-400'
                          : focusedField === 'confirmPassword'
                            ? 'border-amber-300 shadow-lg shadow-amber-100'
                            : 'border-gray-200 hover:border-gray-300'
                          } rounded-xl px-4 py-2.5 pr-12 text-sm text-gray-700 placeholder-gray-400 focus:outline-none transition-all duration-300`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                      >
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {touched.confirmPassword && errors.confirmPassword && (
                      <p className="text-xs text-red-500 mt-1 ml-1">{errors.confirmPassword}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Terms & Conditions */}
              <div className="flex items-start gap-3">
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    name="terms"
                    checked={formData.terms}
                    onChange={handleChange}
                    className="w-4 h-4 text-amber-500 border-2 border-gray-300 rounded focus:ring-amber-200 focus:ring-2 transition-all"
                  />
                </div>
                <label className="text-sm text-gray-600">
                  I agree to the{' '}
                  <button type="button" className="text-amber-600 hover:text-amber-700 font-medium">
                    Terms of Service
                  </button>{' '}
                  and{' '}
                  <button type="button" className="text-amber-600 hover:text-amber-700 font-medium">
                    Privacy Policy
                  </button>
                  <span className="text-red-400 ml-1">*</span>
                </label>
              </div>
              {touched.terms && !formData.terms && (
                <p className="text-xs text-red-500 -mt-2">You must agree to terms to continue</p>
              )}

              {/* Submit Button */}
              <div className="pt-3">
                <button
                  type="submit"
                  disabled={!isFormValid()}
                  className={`w-full py-3 rounded-xl text-base font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${isFormValid()
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-xl shadow-amber-200 hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] border-l-4 border-blue-500'
                    : 'bg-amber-500 text-white  cursor-not-allowed  '
                    }`}
                >
                  <span>Create Premium Account</span>
                  <ArrowRight size={18} />
                </button>
              </div>

              {/* Login Link */}
              <div className="text-center">
                <p className="text-sm text-gray-500">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => navigate('/user_login')}
                    className="text-amber-600 hover:text-amber-700 font-medium"
                  >
                    Sign in here
                  </button>
                </p>
              </div>

              {/* Security Footer */}
              <div className="flex items-center justify-center gap-2 text-xs text-gray-400 pt-3 border-t border-gray-100">
                <Shield size={14} />
                <span>256-bit encrypted connection</span>
                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                <CheckCircle size={14} />
                <span>Verified & secure</span>
              </div>
            </form>
          </div>
        </div>

        {/* Version Badge */}
        <div className="text-center mt-3">
          <span className="text-xs text-gray-400">Premium Registration v2.0 • Secure & Encrypted</span>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;