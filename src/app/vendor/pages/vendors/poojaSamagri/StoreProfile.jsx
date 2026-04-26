import React, { useState } from 'react';
import { 
  Store, 
  MapPin, 
  CreditCard, 
  Shield, 
  Clock,
  CheckCircle2,
  AlertCircle,
  Upload,
  Edit,
  Eye,
  Download,
  CalendarDays,
  Phone,
  Mail,
  Globe,
  Users,
  Package,
  TrendingUp,
  Settings,
  Camera,
  FileText,
  Lock,
  Star,
  Copy
} from 'lucide-react';

import VendorPageHeader from '../../../components/VendorPageHeader';

const StoreProfile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  // Store Profile Data
  const storeData = {
    // Basic Info
    storeName: 'Shri Ganesh Puja Samagri',
    storeTagline: 'Authentic Puja Items & Services',
    category: 'Religious & Spiritual',
    established: '2018',
    rating: 4.8,
    totalSales: 1245,
    
    // Contact Info
    email: 'contact@shriganeshpuja.com',
    phone: '+91 98765 43210',
    website: 'www.shriganeshpuja.com',
    
    // Address
    address: {
      street: 'Shop No. 45, Temple Street',
      area: 'Near Hanuman Temple',
      city: 'Noida',
      state: 'Uttar Pradesh',
      pincode: '201301',
      country: 'India'
    },
    
    // KYC Details
    kyc: {
      status: 'verified',
      gstNumber: '27AABCU9603R1Z2',
      panNumber: 'ABCDE1234F',
      aadhaarNumber: 'XXXX XXXX 5678',
      businessType: 'Proprietorship',
      documents: {
        gst: { uploaded: true, verified: true },
        pan: { uploaded: true, verified: true },
        aadhaar: { uploaded: true, verified: true },
        addressProof: { uploaded: true, verified: true }
      }
    },
    
    // Bank Details
    bank: {
      bankName: 'ICICI Bank',
      accountNumber: '0123456789',
      accountHolder: 'Shri Ganesh Puja Samagri',
      ifscCode: 'ICIC0000123',
      branch: 'Noida Sector 62',
      isVerified: true
    },
    
    // Business Hours
    businessHours: [
      { day: 'Monday', open: '9:00 AM', close: '8:00 PM', status: 'open' },
      { day: 'Tuesday', open: '9:00 AM', close: '8:00 PM', status: 'open' },
      { day: 'Wednesday', open: '9:00 AM', close: '8:00 PM', status: 'open' },
      { day: 'Thursday', open: '9:00 AM', close: '8:00 PM', status: 'open' },
      { day: 'Friday', open: '9:00 AM', close: '8:00 PM', status: 'open' },
      { day: 'Saturday', open: '10:00 AM', close: '9:00 PM', status: 'open' },
      { day: 'Sunday', open: '10:00 AM', close: '6:00 PM', status: 'open' }
    ],
    
    // Store Statistics
    stats: {
      totalProducts: 125,
      activeOrders: 18,
      monthlyRevenue: 152750,
      customerReviews: 342
    },
    
    // Documents
    documents: [
      { name: 'GST Certificate', type: 'gst', uploaded: 'Dec 15, 2023', status: 'verified' },
      { name: 'PAN Card', type: 'pan', uploaded: 'Dec 15, 2023', status: 'verified' },
      { name: 'Aadhaar Card', type: 'aadhaar', uploaded: 'Dec 15, 2023', status: 'verified' },
      { name: 'Address Proof', type: 'address', uploaded: 'Dec 15, 2023', status: 'verified' },
      { name: 'Bank Account Proof', type: 'bank', uploaded: 'Dec 15, 2023', status: 'pending' }
    ]
  };

  // Get status styles
  const getStatusStyles = (status) => {
    const base = "px-2 py-0.5 rounded-full text-sm font-medium flex items-center gap-1";
    switch(status) {
      case 'verified': 
      case 'open':
        return `${base} bg-green-50 text-green-700`;
      case 'pending': 
        return `${base} bg-yellow-50 text-yellow-600`;
      case 'rejected':
        return `${base} bg-red-50 text-red-700`;
      case 'closed':
        return `${base} bg-gray-100 text-gray-600`;
      default: 
        return `${base} bg-gray-100 text-gray-600`;
    }
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch(status) {
      case 'verified': 
      case 'open':
        return <CheckCircle2 className="w-4 h-4" />;
      case 'pending': 
        return <Clock className="w-4 h-4" />;
      case 'rejected':
      case 'closed':
        return <AlertCircle className="w-4 h-4" />;
      default: 
        return <Clock className="w-4 h-4" />;
    }
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Handle actions
  const handleAction = (action, data = null) => {
    setIsLoading(true);
    
    switch(action) {
      case 'editProfile':
        setIsEditing(true);
        break;
        
      case 'saveProfile':
        setIsEditing(false);
        console.log('Saving profile...');
        break;
        
      case 'cancelEdit':
        setIsEditing(false);
        break;
        
      case 'uploadLogo':
        console.log('Uploading logo...');
        // File upload logic
        break;
        
      case 'uploadBanner':
        console.log('Uploading banner...');
        // File upload logic
        break;
        
      case 'uploadDocument':
        console.log('Uploading document:', data);
        // File upload logic
        break;
        
      case 'downloadDocument':
        console.log('Downloading document:', data);
        // Download logic
        break;
        
      case 'viewDocument':
        console.log('Viewing document:', data);
        // View document logic
        break;
        
      case 'verifyKYC':
        console.log('Initiating KYC verification...');
        // KYC verification logic
        break;
        
      case 'updateBusinessHours':
        console.log('Updating business hours...');
        break;
        
      case 'copyBankDetails':
        navigator.clipboard.writeText(storeData.bank.accountNumber);
        alert('Account number copied to clipboard!');
        break;
        
      case 'refresh':
        console.log('Refreshing store data...');
        break;
    }
    
    setTimeout(() => setIsLoading(false), 500);
  };

  return (
    <div className="min-h-screen bg-gray-50/30">
      <VendorPageHeader 
        title="STORE PROFILE & KYC" 
        subtitle="Manage your store details, KYC, and business information" 
      />

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm text-gray-700">Processing...</p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="space-y-4 p-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg px-3 py-2 border border-orange-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <p className="text-[18px] text-gray-600 ">
                Complete your profile to unlock all features
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm text-gray-600">KYC Status</p>
                <div className={getStatusStyles(storeData.kyc.status)}>
                  {getStatusIcon(storeData.kyc.status)}
                  <span className="capitalize">{storeData.kyc.status}</span>
                </div>
              </div>
              <div className="w-8 h-8 bg-orange-50 rounded flex items-center justify-center">
                <Shield className="w-5 h-5 text-orange-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 border-b pb-3">
          {['profile', 'kyc', 'bank', 'hours', 'documents'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                activeTab === tab 
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              {tab.replace('-', ' ')}
            </button>
          ))}
        </div>

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {/* Store Rating */}
          <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg border border-gray-200 px-3 py-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Store Rating</p>
                <p className="text-xl font-semibold text-gray-800 mt-1">
                  {storeData.rating}/5
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <span className="text-sm text-gray-500">{storeData.stats.customerReviews} reviews</span>
                </div>
              </div>
              <div className="p-2 bg-yellow-50 rounded">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              </div>
            </div>
          </div>

          {/* Total Products */}
          <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg border border-gray-200 px-3 py-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Products</p>
                <p className="text-xl font-semibold text-gray-800 mt-1">
                  {storeData.stats.totalProducts}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <Package className="w-3 h-3 text-blue-600" />
                  <span className="text-sm text-blue-600">Active</span>
                </div>
              </div>
              <div className="p-2 bg-blue-50 rounded">
                <Package className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Monthly Revenue */}
          <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg border border-gray-200 px-3 py-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Monthly Revenue</p>
                <p className="text-xl font-semibold text-gray-800 mt-1">
                  {formatCurrency(storeData.stats.monthlyRevenue)}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="w-3 h-3 text-green-700" />
                  <span className="text-sm text-green-700">+12%</span>
                </div>
              </div>
              <div className="p-2 bg-green-50 rounded">
                <TrendingUp className="w-5 h-5 text-green-700" />
              </div>
            </div>
          </div>

          {/* Active Orders */}
          <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg border border-gray-200 px-3 py-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Orders</p>
                <p className="text-xl font-semibold text-gray-800 mt-1">
                  {storeData.stats.activeOrders}
                </p>
                <p className="text-xs text-orange-500 mt-2">Processing</p>
              </div>
              <div className="p-2 bg-orange-50 rounded">
                <Package className="w-5 h-5 text-orange-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        {activeTab === 'profile' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Left Column - Store Profile */}
            <div className="lg:col-span-2 space-y-4">
              {/* Store Profile Card */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[15px] font-bold text-gray-800">Store Profile</h3>
                    {!isEditing ? (
                      <button 
                        onClick={() => handleAction('editProfile')}
                        className="text-sm font-medium text-orange-500 hover:text-orange-600 flex items-center gap-2"
                      >
                        <Edit className="w-4 h-4" />
                        Edit Profile
                      </button>
                    ) : (
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleAction('cancelEdit')}
                          className="px-3 py-1.5 text-sm bg-gray-100 text-gray-800 rounded border border-gray-300 hover:bg-gray-200"
                        >
                          Cancel
                        </button>
                        <button 
                          onClick={() => handleAction('saveProfile')}
                          className="px-3 py-1.5 text-sm bg-gradient-to-r from-orange-300 to-orange-300 text-gray-800 hover:text-white rounded hover:from-orange-500 hover:to-orange-600"
                        >
                          Save Changes
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-4 space-y-6">
                  {/* Store Logo & Banner */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Store Logo
                      </label>
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-20 rounded-lg bg-orange-100 flex items-center justify-center">
                          <Store className="w-10 h-10 text-orange-500" />
                        </div>
                        <button 
                          onClick={() => handleAction('uploadLogo')}
                          className="px-4 py-2 text-sm bg-gray-100 text-gray-800 rounded border border-gray-300 hover:bg-gray-200 flex items-center gap-2"
                        >
                          <Upload className="w-4 h-4" />
                          Upload New Logo
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        Recommended: 400×400px, PNG or JPG, max 2MB
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Store Banner
                      </label>
                      <div className="h-32 rounded-lg bg-gradient-to-r from-orange-100 to-yellow-100 flex items-center justify-center border-2 border-dashed border-orange-200">
                        <button 
                          onClick={() => handleAction('uploadBanner')}
                          className="px-4 py-2 text-sm bg-white text-gray-800 rounded border border-gray-300 hover:bg-gray-100 flex items-center gap-2"
                        >
                          <Upload className="w-4 h-4" />
                          Upload Banner Image
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        Recommended: 1200×300px, JPG format, max 5MB
                      </p>
                    </div>
                  </div>

                  {/* Store Information */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-gray-800">Store Information</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Store Name *
                        </label>
                        <input
                          type="text"
                          defaultValue={storeData.storeName}
                          readOnly={!isEditing}
                          className={`w-full px-4 py-2 rounded-lg border ${
                            isEditing 
                              ? 'bg-white border-gray-300 text-gray-900 focus:ring-2 focus:ring-orange-500 focus:outline-none'
                              : 'bg-gray-50 border-gray-200 text-gray-600'
                          }`}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tagline
                        </label>
                        <input
                          type="text"
                          defaultValue={storeData.storeTagline}
                          readOnly={!isEditing}
                          className={`w-full px-4 py-2 rounded-lg border ${
                            isEditing 
                              ? 'bg-white border-gray-300 text-gray-900 focus:ring-2 focus:ring-orange-500 focus:outline-none'
                              : 'bg-gray-50 border-gray-200 text-gray-600'
                          }`}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Category *
                        </label>
                        <input
                          type="text"
                          defaultValue={storeData.category}
                          readOnly={!isEditing}
                          className={`w-full px-4 py-2 rounded-lg border ${
                            isEditing 
                              ? 'bg-white border-gray-300 text-gray-900 focus:ring-2 focus:ring-orange-500 focus:outline-none'
                              : 'bg-gray-50 border-gray-200 text-gray-600'
                          }`}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Year Established
                        </label>
                        <input
                          type="text"
                          defaultValue={storeData.established}
                          readOnly={!isEditing}
                          className={`w-full px-4 py-2 rounded-lg border ${
                            isEditing 
                              ? 'bg-white border-gray-300 text-gray-900 focus:ring-2 focus:ring-orange-500 focus:outline-none'
                              : 'bg-gray-50 border-gray-200 text-gray-600'
                          }`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-gray-800">Contact Information</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="email"
                            defaultValue={storeData.email}
                            readOnly={!isEditing}
                            className={`w-full px-4 py-2 rounded-lg border ${
                              isEditing 
                                ? 'bg-white border-gray-300 text-gray-900 focus:ring-2 focus:ring-orange-500 focus:outline-none'
                                : 'bg-gray-50 border-gray-200 text-gray-600'
                            }`}
                          />
                          <Mail className="w-5 h-5 text-gray-400" />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number *
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="tel"
                            defaultValue={storeData.phone}
                            readOnly={!isEditing}
                            className={`w-full px-4 py-2 rounded-lg border ${
                              isEditing 
                                ? 'bg-white border-gray-300 text-gray-900 focus:ring-2 focus:ring-orange-500 focus:outline-none'
                                : 'bg-gray-50 border-gray-200 text-gray-600'
                            }`}
                          />
                          <Phone className="w-5 h-5 text-gray-400" />
                        </div>
                      </div>
                      
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Website
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="url"
                            defaultValue={storeData.website}
                            readOnly={!isEditing}
                            className={`w-full px-4 py-2 rounded-lg border ${
                              isEditing 
                                ? 'bg-white border-gray-300 text-gray-900 focus:ring-2 focus:ring-orange-500 focus:outline-none'
                                : 'bg-gray-50 border-gray-200 text-gray-600'
                            }`}
                          />
                          <Globe className="w-5 h-5 text-gray-400" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Store Address */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-gray-800">Store Address</h4>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-5 h-5 text-gray-400" />
                        <span className="text-sm text-gray-700">
                          {storeData.address.street}, {storeData.address.area}, {storeData.address.city}, {storeData.address.state} {storeData.address.pincode}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Street Address *
                          </label>
                          <input
                            type="text"
                            defaultValue={storeData.address.street}
                            readOnly={!isEditing}
                            className={`w-full px-4 py-2 rounded-lg border ${
                              isEditing 
                                ? 'bg-white border-gray-300 text-gray-900 focus:ring-2 focus:ring-orange-500 focus:outline-none'
                                : 'bg-gray-50 border-gray-200 text-gray-600'
                            }`}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Area/Locality
                          </label>
                          <input
                            type="text"
                            defaultValue={storeData.address.area}
                            readOnly={!isEditing}
                            className={`w-full px-4 py-2 rounded-lg border ${
                              isEditing 
                                ? 'bg-white border-gray-300 text-gray-900 focus:ring-2 focus:ring-orange-500 focus:outline-none'
                                : 'bg-gray-50 border-gray-200 text-gray-600'
                            }`}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            City *
                          </label>
                          <input
                            type="text"
                            defaultValue={storeData.address.city}
                            readOnly={!isEditing}
                            className={`w-full px-4 py-2 rounded-lg border ${
                              isEditing 
                                ? 'bg-white border-gray-300 text-gray-900 focus:ring-2 focus:ring-orange-500 focus:outline-none'
                                : 'bg-gray-50 border-gray-200 text-gray-600'
                            }`}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Pincode *
                          </label>
                          <input
                            type="text"
                            defaultValue={storeData.address.pincode}
                            readOnly={!isEditing}
                            className={`w-full px-4 py-2 rounded-lg border ${
                              isEditing 
                                ? 'bg-white border-gray-300 text-gray-900 focus:ring-2 focus:ring-orange-500 focus:outline-none'
                                : 'bg-gray-50 border-gray-200 text-gray-600'
                            }`}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            State *
                          </label>
                          <input
                            type="text"
                            defaultValue={storeData.address.state}
                            readOnly={!isEditing}
                            className={`w-full px-4 py-2 rounded-lg border ${
                              isEditing 
                                ? 'bg-white border-gray-300 text-gray-900 focus:ring-2 focus:ring-orange-500 focus:outline-none'
                                : 'bg-gray-50 border-gray-200 text-gray-600'
                            }`}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Country *
                          </label>
                          <input
                            type="text"
                            defaultValue={storeData.address.country}
                            readOnly={!isEditing}
                            className={`w-full px-4 py-2 rounded-lg border ${
                              isEditing 
                                ? 'bg-white border-gray-300 text-gray-900 focus:ring-2 focus:ring-orange-500 focus:outline-none'
                                : 'bg-gray-50 border-gray-200 text-gray-600'
                            }`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - KYC Status & Quick Actions */}
            <div className="space-y-4">
              {/* KYC Status Card */}
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[15px] font-bold text-gray-800">KYC Status</h3>
                  <div className={getStatusStyles(storeData.kyc.status)}>
                    {getStatusIcon(storeData.kyc.status)}
                    <span className="capitalize">{storeData.kyc.status}</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="p-3 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-medium text-gray-800">GST Number</div>
                      {storeData.kyc.documents.gst.verified && (
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                      )}
                    </div>
                    <div className="text-sm text-gray-600">{storeData.kyc.gstNumber}</div>
                    <div className="text-xs text-gray-500 mt-1">Registered Business</div>
                  </div>
                  
                  <div className="p-3 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-medium text-gray-800">PAN Number</div>
                      {storeData.kyc.documents.pan.verified && (
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                      )}
                    </div>
                    <div className="text-sm text-gray-600">{storeData.kyc.panNumber}</div>
                  </div>
                  
                  <div className="p-3 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-medium text-gray-800">Business Type</div>
                    </div>
                    <div className="text-sm text-gray-600">{storeData.kyc.businessType}</div>
                  </div>
                </div>
                
                {storeData.kyc.status !== 'verified' && (
                  <button 
                    onClick={() => handleAction('verifyKYC')}
                    className="w-full mt-4 px-3 py-2 bg-gradient-to-r from-orange-300 to-orange-300 text-gray-800 hover:text-white rounded hover:from-orange-500 hover:to-orange-600 text-sm font-medium"
                  >
                    Complete KYC Verification
                  </button>
                )}
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <h3 className="text-[15px] font-bold text-gray-800 mb-4">Quick Actions</h3>
                
                <div className="space-y-2">
                  <button 
                    onClick={() => handleAction('editProfile')}
                    className="w-full px-3 py-2 bg-gray-100 text-gray-800 text-sm font-medium rounded border border-gray-300 hover:bg-gray-200 transition-colors flex items-center gap-2"
                  >
                    <Edit className="w-4 h-4" />
                    Edit Profile
                  </button>
                  
                  <button 
                    onClick={() => setActiveTab('kyc')}
                    className="w-full px-3 py-2 bg-orange-50 text-orange-500 text-sm font-medium rounded border border-orange-300 hover:bg-orange-100 transition-colors flex items-center gap-2"
                  >
                    <Shield className="w-4 h-4" />
                    Update KYC
                  </button>
                  
                  <button 
                    onClick={() => setActiveTab('bank')}
                    className="w-full px-3 py-2 bg-blue-50 text-blue-600 text-sm font-medium rounded border border-blue-300 hover:bg-blue-100 transition-colors flex items-center gap-2"
                  >
                    <CreditCard className="w-4 h-4" />
                    Bank Details
                  </button>
                  
                  <button 
                    onClick={() => setActiveTab('hours')}
                    className="w-full px-3 py-2 bg-green-50 text-green-700 text-sm font-medium rounded border border-green-300 hover:bg-green-100 transition-colors flex items-center gap-2"
                  >
                    <Clock className="w-4 h-4" />
                    Business Hours
                  </button>
                </div>
              </div>

              {/* Store Verification Tips */}
              <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg p-3 border border-orange-200">
                <div className="flex items-start gap-2">
                  <div className="p-1.5 bg-orange-50 rounded">
                    <Shield className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-800 mb-1">Verification Tips</h4>
                    <p className="text-xs text-gray-700">
                      Complete KYC verification to enable payment settlements, GST invoicing, and advanced business features.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'kyc' && (
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-[15px] font-bold text-gray-800">KYC Documents</h3>
                  <p className="text-sm text-gray-600">Upload and verify your business documents</p>
                </div>
                <div className={getStatusStyles(storeData.kyc.status)}>
                  {getStatusIcon(storeData.kyc.status)}
                  <span className="capitalize">{storeData.kyc.status}</span>
                </div>
              </div>
            </div>
            
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* GST Certificate */}
                <div className="p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-800">GST Certificate</h4>
                      <p className="text-xs text-gray-500">Required for GST-registered businesses</p>
                    </div>
                    {storeData.kyc.documents.gst.verified ? (
                      <span className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Verified
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-yellow-50 text-yellow-600 text-xs rounded">
                        Pending
                      </span>
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        GST Number
                      </label>
                      <input
                        type="text"
                        defaultValue={storeData.kyc.gstNumber}
                        className="w-full px-4 py-2 rounded-lg border bg-white border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Upload GST Certificate
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600 mb-2">Drag & drop or click to upload</p>
                        <button 
                          onClick={() => handleAction('uploadDocument', 'gst')}
                          className="px-4 py-2 text-sm bg-gray-100 text-gray-800 rounded border border-gray-300 hover:bg-gray-200"
                        >
                          Choose File
                        </button>
                        <p className="text-xs text-gray-500 mt-2">Max file size: 5MB (PDF, JPG, PNG)</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* PAN Card */}
                <div className="p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-800">PAN Card</h4>
                      <p className="text-xs text-gray-500">Permanent Account Number</p>
                    </div>
                    {storeData.kyc.documents.pan.verified ? (
                      <span className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Verified
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-yellow-50 text-yellow-600 text-xs rounded">
                        Pending
                      </span>
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        PAN Number
                      </label>
                      <input
                        type="text"
                        defaultValue={storeData.kyc.panNumber}
                        className="w-full px-4 py-2 rounded-lg border bg-white border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Upload PAN Card
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600 mb-2">Drag & drop or click to upload</p>
                        <button 
                          onClick={() => handleAction('uploadDocument', 'pan')}
                          className="px-4 py-2 text-sm bg-gray-100 text-gray-800 rounded border border-gray-300 hover:bg-gray-200"
                        >
                          Choose File
                        </button>
                        <p className="text-xs text-gray-500 mt-2">Max file size: 5MB (PDF, JPG, PNG)</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Aadhaar Card */}
                <div className="p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-800">Aadhaar Card</h4>
                      <p className="text-xs text-gray-500">For identity verification</p>
                    </div>
                    {storeData.kyc.documents.aadhaar.verified ? (
                      <span className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Verified
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-yellow-50 text-yellow-600 text-xs rounded">
                        Pending
                      </span>
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Aadhaar Number
                      </label>
                      <input
                        type="text"
                        defaultValue={storeData.kyc.aadhaarNumber}
                        className="w-full px-4 py-2 rounded-lg border bg-white border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Upload Aadhaar Card
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600 mb-2">Front & Back sides</p>
                        <button 
                          onClick={() => handleAction('uploadDocument', 'aadhaar')}
                          className="px-4 py-2 text-sm bg-gray-100 text-gray-800 rounded border border-gray-300 hover:bg-gray-200"
                        >
                          Choose File
                        </button>
                        <p className="text-xs text-gray-500 mt-2">Max file size: 5MB (PDF, JPG, PNG)</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Address Proof */}
                <div className="p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-800">Address Proof</h4>
                      <p className="text-xs text-gray-500">Utility bill, rental agreement, etc.</p>
                    </div>
                    {storeData.kyc.documents.addressProof.verified ? (
                      <span className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Verified
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-yellow-50 text-yellow-600 text-xs rounded">
                        Pending
                      </span>
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Document Type
                      </label>
                      <select className="w-full px-4 py-2 rounded-lg border bg-white border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500">
                        <option>Electricity Bill</option>
                        <option>Water Bill</option>
                        <option>Gas Bill</option>
                        <option>Rental Agreement</option>
                        <option>Property Tax Receipt</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Upload Address Proof
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600 mb-2">Latest utility bill or agreement</p>
                        <button 
                          onClick={() => handleAction('uploadDocument', 'address')}
                          className="px-4 py-2 text-sm bg-gray-100 text-gray-800 rounded border border-gray-300 hover:bg-gray-200"
                        >
                          Choose File
                        </button>
                        <p className="text-xs text-gray-500 mt-2">Max file size: 5MB (PDF, JPG, PNG)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end gap-2 mt-6 pt-6 border-t border-gray-200">
                <button className="px-4 py-2 text-sm bg-gray-100 text-gray-800 rounded border border-gray-300 hover:bg-gray-200">
                  Cancel
                </button>
                <button className="px-4 py-2 text-sm bg-gradient-to-r from-orange-300 to-orange-300 text-gray-800 hover:text-white rounded hover:from-orange-500 hover:to-orange-600">
                  Save & Submit for Verification
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'bank' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Bank Details Form */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="text-[15px] font-bold text-gray-800 mb-4">Bank Account Details</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bank Name *
                  </label>
                  <input
                    type="text"
                    defaultValue={storeData.bank.bankName}
                    className="w-full px-4 py-2 rounded-lg border bg-white border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Account Number *
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      defaultValue={storeData.bank.accountNumber}
                      className="w-full px-4 py-2 rounded-lg border bg-white border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    <button 
                      onClick={() => handleAction('copyBankDetails')}
                      className="p-2 bg-gray-100 hover:bg-gray-200 rounded"
                      title="Copy account number"
                    >
                      <Copy className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      IFSC Code *
                    </label>
                    <input
                      type="text"
                      defaultValue={storeData.bank.ifscCode}
                      className="w-full px-4 py-2 rounded-lg border bg-white border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Branch Name
                    </label>
                    <input
                      type="text"
                      defaultValue={storeData.bank.branch}
                      className="w-full px-4 py-2 rounded-lg border bg-white border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Account Holder Name *
                  </label>
                  <input
                    type="text"
                    defaultValue={storeData.bank.accountHolder}
                    className="w-full px-4 py-2 rounded-lg border bg-white border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="verifyAccount"
                      defaultChecked={storeData.bank.isVerified}
                      className="w-4 h-4 text-orange-600 rounded focus:ring-orange-500"
                    />
                    <label htmlFor="verifyAccount" className="text-sm text-gray-700">
                      This account is verified
                    </label>
                  </div>
                </div>
                
                <div className="flex gap-2 pt-4 border-t border-gray-200">
                  <button className="flex-1 px-4 py-2 text-sm bg-gray-100 text-gray-800 rounded border border-gray-300 hover:bg-gray-200">
                    Cancel
                  </button>
                  <button className="flex-1 px-4 py-2 text-sm bg-gradient-to-r from-orange-300 to-orange-300 text-gray-800 hover:text-white rounded hover:from-orange-500 hover:to-orange-600">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>

            {/* Bank Verification Info */}
            <div className="space-y-4">
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[15px] font-bold text-gray-800">Verification Status</h3>
                  {storeData.bank.isVerified ? (
                    <span className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Verified
                    </span>
                  ) : (
                    <span className="px-2 py-1 bg-yellow-50 text-yellow-600 text-xs rounded">
                      Pending
                    </span>
                  )}
                </div>
                
                <div className="space-y-3">
                  <div className="p-3 rounded-lg border border-gray-200">
                    <div className="text-sm font-medium text-gray-800 mb-2">Bank Account Uses</div>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        Payment settlements
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        Withdrawal requests
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        GST refunds
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        Vendor payments
                      </li>
                    </ul>
                  </div>
                  
                  <div className="p-3 rounded-lg border border-gray-200">
                    <div className="text-sm font-medium text-gray-800 mb-2">Verification Requirements</div>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        Valid bank account
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        Correct IFSC code
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        Account holder name matches
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Security Info */}
              <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg p-4 border border-orange-200">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-orange-50 rounded">
                    <Lock className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-800 mb-2">Security Information</h4>
                    <ul className="text-xs text-gray-700 space-y-1">
                      <li>• All bank details are encrypted and secure</li>
                      <li>• Two-factor authentication for changes</li>
                      <li>• Instant notifications for all transactions</li>
                      <li>• 24/7 fraud monitoring</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'hours' && (
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-[15px] font-bold text-gray-800">Business Hours</h3>
                  <p className="text-sm text-gray-600">Set your store operating hours</p>
                </div>
                <button 
                  onClick={() => handleAction('updateBusinessHours')}
                  className="text-sm font-medium text-orange-500 hover:text-orange-600 flex items-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  Edit Hours
                </button>
              </div>
            </div>
            
            <div className="p-4">
              <div className="space-y-3">
                {storeData.businessHours.map((day) => (
                  <div key={day.day} className="p-3 rounded-lg border border-gray-200 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="font-medium text-gray-800 w-24">{day.day}</span>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-700">{day.open} - {day.close}</span>
                        </div>
                      </div>
                      <div className={getStatusStyles(day.status)}>
                        {getStatusIcon(day.status)}
                        <span className="capitalize">{day.status}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h4 className="text-sm font-medium text-gray-800 mb-2">Special Hours</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Set special hours for holidays or events. These override regular business hours.
                </p>
                <button className="px-4 py-2 text-sm bg-white text-orange-500 rounded border border-orange-300 hover:bg-orange-50">
                  + Add Special Hours
                </button>
              </div>
              
              <div className="flex justify-end gap-2 mt-6 pt-6 border-t border-gray-200">
                <button className="px-4 py-2 text-sm bg-gray-100 text-gray-800 rounded border border-gray-300 hover:bg-gray-200">
                  Reset to Default
                </button>
                <button 
                  onClick={() => handleAction('updateBusinessHours')}
                  className="px-4 py-2 text-sm bg-gradient-to-r from-orange-300 to-orange-300 text-gray-800 hover:text-white rounded hover:from-orange-500 hover:to-orange-600"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'documents' && (
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-[15px] font-bold text-gray-800">Uploaded Documents</h3>
                  <p className="text-sm text-gray-600">All your business verification documents</p>
                </div>
                <button className="px-4 py-2 text-sm rounded-lg flex items-center gap-2 bg-gray-100 hover:bg-gray-200">
                  <Download className="w-4 h-4" />
                  Download All
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left p-4 text-sm font-medium">Document Name</th>
                    <th className="text-left p-4 text-sm font-medium">Type</th>
                    <th className="text-left p-4 text-sm font-medium">Uploaded Date</th>
                    <th className="text-left p-4 text-sm font-medium">Status</th>
                    <th className="text-left p-4 text-sm font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {storeData.documents.map((doc) => (
                    <tr key={doc.name} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="p-4">
                        <div className="font-medium">{doc.name}</div>
                      </td>
                      <td className="p-4">
                        <div className="text-sm text-gray-600 capitalize">{doc.type}</div>
                      </td>
                      <td className="p-4">
                        <div className="text-sm text-gray-600">{doc.uploaded}</div>
                      </td>
                      <td className="p-4">
                        <div className={getStatusStyles(doc.status)}>
                          {getStatusIcon(doc.status)}
                          <span>{doc.status}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => handleAction('viewDocument', doc.type)}
                            className="p-1.5 rounded hover:bg-gray-100"
                            title="View Document"
                          >
                            <Eye className="w-4 h-4 text-gray-500" />
                          </button>
                          <button 
                            onClick={() => handleAction('downloadDocument', doc.type)}
                            className="p-1.5 rounded hover:bg-gray-100"
                            title="Download"
                          >
                            <Download className="w-4 h-4 text-gray-500" />
                          </button>
                          <button 
                            onClick={() => handleAction('uploadDocument', doc.type)}
                            className="p-1.5 rounded hover:bg-gray-100"
                            title="Re-upload"
                          >
                            <Upload className="w-4 h-4 text-gray-500" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Bottom Section - Additional Info */}
        <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg border border-gray-200 px-3 py-2">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-center sm:text-left">
              <p className="text-sm text-gray-600">Need help with KYC verification?</p>
              <p className="text-[14px] text-gray-800">Contact support: +91 98765 43210</p>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => handleAction('refresh')}
                className="px-3 py-1.5 text-sm bg-gray-100 text-gray-800 rounded border border-gray-300 hover:bg-gray-200"
              >
                Refresh Status
              </button>
              <button 
                onClick={() => setActiveTab('kyc')}
                className="px-3 py-1.5 text-sm bg-gradient-to-r from-orange-300 to-orange-300 text-gray-800 hover:text-white rounded hover:from-orange-500 hover:to-orange-600"
              >
                Complete KYC
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreProfile;
