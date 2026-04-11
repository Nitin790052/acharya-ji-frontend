import React, { useState } from 'react';
import {
  User,
  Shield,
  CreditCard,
  MapPin,
  Globe,
  Camera,
  Edit2,
  Save,
  Upload,
  Download,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
  FileText,
  Percent,
  Banknote,
  Mail,
  Phone,
  Calendar,
  Award,
  Verified,
  ChevronRight,
  MoreVertical,
  Eye,
  EyeOff,
  Lock,
  Key,
  Bell
} from 'lucide-react';

const ProfileKyc = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    personalInfo: {
      fullName: 'Pandit Ji',
      email: 'panditji@example.com',
      phone: '+91 98765 43210',
      dob: '15-08-1985',
      experience: '15 years',
      specialization: 'Vedic Pujas, Havan, Samskaras'
    },
    
    kycStatus: {
      verified: false,
      progress: 65,
      aadhaar: { uploaded: true, verified: true },
      pan: { uploaded: true, verified: true },
      photo: { uploaded: true, verified: false },
      addressProof: { uploaded: false, verified: false }
    },
    
    bankDetails: {
      verified: true,
      accountName: 'Pandit Ji',
      accountNumber: 'XXXXXXX1234',
      bankName: 'State Bank of India',
      ifscCode: 'SBIN0001234',
      upiId: 'panditji@upi'
    },
    
    workingInfo: {
      cities: ['Noida', 'Delhi', 'Ghaziabad'],
      areas: ['Sector 62', 'Sector 128', 'Sector 45'],
      languages: ['Hindi', 'English', 'Sanskrit'],
      workingHours: '7 AM - 9 PM',
      travelRadius: '25 km'
    },
    
    documents: {
      aadhaarFront: 'uploaded',
      aadhaarBack: 'uploaded',
      panCard: 'uploaded',
      profilePhoto: 'pending',
      addressProof: 'missing'
    }
  });

  const [formData, setFormData] = useState(profileData);
  const [activeSection, setActiveSection] = useState('personal');
  const [showKYCWarning, setShowKYCWarning] = useState(!profileData.kycStatus.verified);

  // Calculate profile completion percentage
  const calculateCompletion = () => {
    const totalFields = 15;
    const completedFields = [
      profileData.personalInfo.fullName ? 1 : 0,
      profileData.personalInfo.email ? 1 : 0,
      profileData.personalInfo.phone ? 1 : 0,
      profileData.kycStatus.aadhaar.uploaded ? 1 : 0,
      profileData.kycStatus.pan.uploaded ? 1 : 0,
      profileData.kycStatus.photo.uploaded ? 1 : 0,
      profileData.kycStatus.addressProof.uploaded ? 1 : 0,
      profileData.bankDetails.accountName ? 1 : 0,
      profileData.bankDetails.accountNumber ? 1 : 0,
      profileData.bankDetails.bankName ? 1 : 0,
      profileData.bankDetails.ifscCode ? 1 : 0,
      profileData.workingInfo.cities.length > 0 ? 1 : 0,
      profileData.workingInfo.areas.length > 0 ? 1 : 0,
      profileData.workingInfo.languages.length > 0 ? 1 : 0,
      profileData.workingInfo.workingHours ? 1 : 0
    ].reduce((a, b) => a + b, 0);
    
    return Math.round((completedFields / totalFields) * 100);
  };

  const completionPercentage = calculateCompletion();

  // Handle form changes
  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  // Handle save
  const handleSave = () => {
    setProfileData(formData);
    setIsEditing(false);
  };

  // Handle cancel
  const handleCancel = () => {
    setFormData(profileData);
    setIsEditing(false);
  };

  // Get status color
  const getStatusColor = (status) => {
    switch(status) {
      case 'verified':
      case 'uploaded':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'pending':
        return 'bg-orange-50 text-orange-500 border-orange-200';
      case 'missing':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch(status) {
      case 'verified':
      case 'uploaded':
        return <CheckCircle className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'missing':
        return <XCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  // Format phone number
  const formatPhone = (phone) => {
    return phone.replace(/(\d{2})(\d{5})(\d{5})/, '$1 $2 $3');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/*Main Header*/}
     <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40  
                px-3 py-1.5 border border-orange-100">
  
  {/* Mobile: Column, Desktop: Row */}
  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
    
    {/* Title Section - Original size */}
    <div className="text-left sm:text-left flex items-end gap-2">
  <div>
    <h1 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-orange-900 uppercase
                   leading-tight">
      Profile & KYC
    </h1>
    {/* Mobile: Below heading, Desktop: Right side */}
    <p className="sm:hidden text-sm text-gray-600 mt-0.5">
      Complete your profile for verification and payouts
    </p>
  </div>
  
  {/* Desktop: Right side of heading */}
  <p className="hidden sm:block text-sm text-gray-600 mb-0.5">
   Complete your profile for verification and payouts
  </p>
</div>
    
   
  </div>
</div>

      {/* Main Content - आपके spacing guidelines के according */}
      <div className="space-y-4 p-6">
        {/* Page Header */}
       
        
        {/* KYC Warning Banner (Show only if KYC incomplete) */}
        {showKYCWarning && !profileData.kycStatus.verified && (
          <div className="bg-gradient-to-r from-orange-100 via-orange-50 to-amber-100 rounded-lg border border-orange-300 p-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-gray-800 mb-1">
                    KYC Verification Required
                  </h3>
                  <p className="text-sm text-gray-700">
                    Complete your KYC to receive payments. Your profile is {completionPercentage}% complete.
                    {completionPercentage < 100 && ' Upload missing documents to continue.'}
                  </p>
                </div>
              </div>
              
              <button className="px-3 py-1.5 text-sm bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded hover:from-orange-600 hover:to-orange-700 flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Complete KYC Now
              </button>
            </div>
          </div>
        )}
        
        {/* Profile Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {/* Profile Completion */}
          <div className="bg-white rounded-lg border border-gray-200 p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-blue-50 rounded">
                  <Percent className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-sm text-gray-600">Profile Completion</span>
              </div>
              <Award className="w-5 h-5 text-yellow-500" />
            </div>
            <div className="mb-3">
              <div className="text-xl font-semibold text-gray-800">{completionPercentage}%</div>
              <div className="w-full h-2 bg-gray-200 rounded-full mt-2 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full"
                  style={{ width: `${completionPercentage}%` }}
                ></div>
              </div>
            </div>
            <div className="text-xs text-gray-500">
              {completionPercentage >= 100 ? 'Complete! All set for payments' : 
               `${100 - completionPercentage}% remaining`}
            </div>
          </div>
          
          {/* KYC Status */}
          <div className="bg-white rounded-lg border border-gray-200 p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className={`p-1.5 rounded ${
                  profileData.kycStatus.verified ? 'bg-green-50' : 'bg-orange-50'
                }`}>
                  <Shield className={`w-5 h-5 ${
                    profileData.kycStatus.verified ? 'text-green-700' : 'text-orange-500'
                  }`} />
                </div>
                <span className="text-sm text-gray-600">KYC Status</span>
              </div>
              <div className={`px-2 py-0.5 rounded-full text-xs ${
                profileData.kycStatus.verified 
                  ? 'bg-green-50 text-green-700' 
                  : 'bg-orange-50 text-orange-500'
              }`}>
                {profileData.kycStatus.verified ? 'Verified' : 'Pending'}
              </div>
            </div>
            <div className="mb-3">
              <div className="text-xl font-semibold text-gray-800">
                {profileData.kycStatus.progress}%
              </div>
              <div className="text-sm text-gray-500">{profileData.kycStatus.verified ? 'All documents verified' : 'Documents under review'}</div>
            </div>
            <button className="text-sm text-orange-500 hover:text-orange-600 font-medium">
              View Details →
            </button>
          </div>
          
          {/* Bank Status */}
          <div className="bg-white rounded-lg border border-gray-200 p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className={`p-1.5 rounded ${
                  profileData.bankDetails.verified ? 'bg-green-50' : 'bg-red-50'
                }`}>
                  <CreditCard className={`w-5 h-5 ${
                    profileData.bankDetails.verified ? 'text-green-700' : 'text-red-600'
                  }`} />
                </div>
                <span className="text-sm text-gray-600">Bank Status</span>
              </div>
              {profileData.bankDetails.verified ? (
                <Verified className="w-5 h-5 text-green-600" />
              ) : (
                <XCircle className="w-5 h-5 text-red-600" />
              )}
            </div>
            <div className="mb-3">
              <div className="text-xl font-semibold text-gray-800">
                {profileData.bankDetails.verified ? 'Active' : 'Pending'}
              </div>
              <div className="text-sm text-gray-500">
                {profileData.bankDetails.verified 
                  ? 'Ready for payouts' 
                  : 'Add bank details for withdrawals'}
              </div>
            </div>
            <button className="text-sm text-orange-500 hover:text-orange-600 font-medium">
              {profileData.bankDetails.verified ? 'Update Bank' : 'Add Bank'}
            </button>
          </div>
          
          {/* Payout Eligibility */}
          <div className="bg-white rounded-lg border border-gray-200 p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className={`p-1.5 rounded ${
                  profileData.kycStatus.verified && profileData.bankDetails.verified 
                    ? 'bg-green-50' 
                    : 'bg-gray-100'
                }`}>
                  <Banknote className={`w-5 h-5 ${
                    profileData.kycStatus.verified && profileData.bankDetails.verified 
                      ? 'text-green-700' 
                      : 'text-gray-600'
                  }`} />
                </div>
                <span className="text-sm text-gray-600">Payout Eligibility</span>
              </div>
              {profileData.kycStatus.verified && profileData.bankDetails.verified ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <Lock className="w-5 h-5 text-gray-500" />
              )}
            </div>
            <div className="mb-3">
              <div className="text-xl font-semibold text-gray-800">
                {profileData.kycStatus.verified && profileData.bankDetails.verified 
                  ? 'Eligible' 
                  : 'Not Eligible'}
              </div>
              <div className="text-sm text-gray-500">
                {profileData.kycStatus.verified && profileData.bankDetails.verified 
                  ? 'Can withdraw earnings' 
                  : 'Complete KYC + Bank'}
              </div>
            </div>
            {!(profileData.kycStatus.verified && profileData.bankDetails.verified) && (
              <button className="text-sm text-orange-500 hover:text-orange-600 font-medium">
                Check Requirements →
              </button>
            )}
          </div>
        </div>
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left Column - Navigation */}
          <div className="space-y-4">
            {/* Navigation Tabs */}
            <div className="bg-white rounded-lg border border-gray-200 p-3">
              <h3 className="text-[15px] font-bold text-gray-800 mb-3">Profile Sections</h3>
              
              <div className="space-y-2">
                {[
                  { id: 'personal', label: 'Personal Info', icon: User },
                  { id: 'kyc', label: 'KYC Documents', icon: Shield },
                  { id: 'bank', label: 'Bank Details', icon: CreditCard },
                  { id: 'working', label: 'Working Area', icon: MapPin },
                  { id: 'languages', label: 'Languages', icon: Globe }
                ].map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full px-3 py-2 text-sm rounded-lg border flex items-center justify-between ${
                        activeSection === section.id
                          ? 'bg-orange-50 text-orange-600 border-orange-300'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <Icon className="w-4 h-4" />
                        {section.label}
                      </span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  );
                })}
              </div>
            </div>
            
            {/* Quick Actions */}
            <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg border border-orange-200 p-3">
              <h3 className="text-[15px] font-bold text-gray-800 mb-3">Quick Actions</h3>
              
              <div className="space-y-2">
                <button className="w-full px-3 py-2 text-sm bg-white text-gray-800 rounded-lg border border-gray-300 hover:bg-gray-50 flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Download Documents
                  </span>
                  <FileText className="w-4 h-4" />
                </button>
                
                <button className="w-full px-3 py-2 text-sm bg-white text-gray-800 rounded-lg border border-gray-300 hover:bg-gray-50 flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    View Public Profile
                  </span>
                  <User className="w-4 h-4" />
                </button>
                
                <button className="w-full px-3 py-2 text-sm bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Verify Now
                  </span>
                  <Verified className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            {/* Document Status */}
            <div className="bg-white rounded-lg border border-gray-200 p-3">
              <h3 className="text-[15px] font-bold text-gray-800 mb-3">Document Status</h3>
              
              <div className="space-y-2">
                {Object.entries(profileData.documents).map(([doc, status]) => (
                  <div key={doc} className="flex items-center justify-between">
                    <span className="text-sm text-gray-700 capitalize">
                      {doc.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-xs flex items-center gap-1 ${getStatusColor(status)}`}>
                      {getStatusIcon(status)}
                      {status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right Column - Active Section Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              {/* Section Header */}
              <div className="p-3 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-[15px] font-bold text-gray-800">
                    {activeSection === 'personal' && 'Personal Information'}
                    {activeSection === 'kyc' && 'KYC Documents'}
                    {activeSection === 'bank' && 'Bank Details'}
                    {activeSection === 'working' && 'Working City / Area'}
                    {activeSection === 'languages' && 'Languages Spoken'}
                  </h3>
                  
                  {isEditing && (
                    <button className="px-2.5 py-1 text-sm bg-green-50 text-green-700 rounded border border-green-200 hover:bg-green-100 flex items-center gap-2">
                      <Upload className="w-3 h-3" />
                      Upload New
                    </button>
                  )}
                </div>
              </div>
              
              {/* Section Content */}
              <div className="p-3">
                {activeSection === 'personal' && (
                  <div className="space-y-4">
                    {/* Profile Photo */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="relative">
                        <div className="w-20 h-20 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                          PJ
                        </div>
                        {isEditing && (
                          <button className="absolute bottom-0 right-0 p-1.5 bg-white rounded-full border border-gray-300 shadow-sm hover:bg-gray-50">
                            <Camera className="w-4 h-4 text-gray-700" />
                          </button>
                        )}
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-800">{profileData.personalInfo.fullName}</h4>
                        <p className="text-sm text-gray-600">Pandit ID: PAN001</p>
                        {isEditing && (
                          <button className="mt-2 text-sm text-orange-500 hover:text-orange-600 flex items-center gap-1">
                            <Edit2 className="w-3 h-3" />
                            Change Photo
                          </button>
                        )}
                      </div>
                    </div>
                    
                    {/* Personal Info Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={formData.personalInfo.fullName}
                            onChange={(e) => handleInputChange('personalInfo', 'fullName', e.target.value)}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-orange-500 focus:border-transparent"
                          />
                        ) : (
                          <div className="px-3 py-2 text-sm bg-gray-50 rounded border border-gray-200">
                            {profileData.personalInfo.fullName}
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        {isEditing ? (
                          <input
                            type="email"
                            value={formData.personalInfo.email}
                            onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-orange-500 focus:border-transparent"
                          />
                        ) : (
                          <div className="px-3 py-2 text-sm bg-gray-50 rounded border border-gray-200 flex items-center gap-2">
                            <Mail className="w-4 h-4 text-gray-500" />
                            {profileData.personalInfo.email}
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        {isEditing ? (
                          <input
                            type="tel"
                            value={formData.personalInfo.phone}
                            onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-orange-500 focus:border-transparent"
                          />
                        ) : (
                          <div className="px-3 py-2 text-sm bg-gray-50 rounded border border-gray-200 flex items-center gap-2">
                            <Phone className="w-4 h-4 text-gray-500" />
                            {formatPhone(profileData.personalInfo.phone)}
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                        {isEditing ? (
                          <input
                            type="date"
                            value={formData.personalInfo.dob}
                            onChange={(e) => handleInputChange('personalInfo', 'dob', e.target.value)}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-orange-500 focus:border-transparent"
                          />
                        ) : (
                          <div className="px-3 py-2 text-sm bg-gray-50 rounded border border-gray-200 flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-500" />
                            {profileData.personalInfo.dob}
                          </div>
                        )}
                      </div>
                      
                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
                        {isEditing ? (
                          <textarea
                            value={formData.personalInfo.specialization}
                            onChange={(e) => handleInputChange('personalInfo', 'specialization', e.target.value)}
                            rows="2"
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-orange-500 focus:border-transparent"
                          />
                        ) : (
                          <div className="px-3 py-2 text-sm bg-gray-50 rounded border border-gray-200">
                            {profileData.personalInfo.specialization}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                
                {activeSection === 'kyc' && (
                  <div className="space-y-4">
                    {/* KYC Status Overview */}
                    <div className="bg-gray-50 rounded-lg p-3 mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm font-medium text-gray-800">KYC Verification Progress</div>
                        <div className="text-sm font-bold text-gray-800">{profileData.kycStatus.progress}%</div>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"
                          style={{ width: `${profileData.kycStatus.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    {/* Document Upload Sections */}
                    <div className="space-y-3">
                      {[
                        { 
                          title: 'Aadhaar Card', 
                          status: profileData.kycStatus.aadhaar,
                          description: 'Upload front and back of your Aadhaar card'
                        },
                        { 
                          title: 'PAN Card', 
                          status: profileData.kycStatus.pan,
                          description: 'Upload clear photo of your PAN card'
                        },
                        { 
                          title: 'Profile Photo', 
                          status: profileData.kycStatus.photo,
                          description: 'Recent passport size photo'
                        },
                        { 
                          title: 'Address Proof', 
                          status: profileData.kycStatus.addressProof,
                          description: 'Utility bill or rental agreement'
                        }
                      ].map((doc, idx) => (
                        <div key={idx} className="border border-gray-200 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h4 className="text-sm font-bold text-gray-800">{doc.title}</h4>
                              <p className="text-xs text-gray-600">{doc.description}</p>
                            </div>
                            <div className={`px-2 py-0.5 rounded-full text-xs flex items-center gap-1 ${
                              doc.status.verified ? 'bg-green-50 text-green-700' :
                              doc.status.uploaded ? 'bg-orange-50 text-orange-500' :
                              'bg-red-50 text-red-700'
                            }`}>
                              {doc.status.verified ? <CheckCircle className="w-3 h-3" /> :
                               doc.status.uploaded ? <Clock className="w-3 h-3" /> :
                               <XCircle className="w-3 h-3" />}
                              {doc.status.verified ? 'Verified' :
                               doc.status.uploaded ? 'Under Review' :
                               'Not Uploaded'}
                            </div>
                          </div>
                          
                          <div className="flex gap-2 mt-3">
                            {doc.status.uploaded ? (
                              <>
                                <button className="px-2.5 py-1 text-xs bg-blue-50 text-blue-600 rounded border border-blue-200 hover:bg-blue-100 flex items-center gap-1">
                                  <Eye className="w-3 h-3" />
                                  View
                                </button>
                                <button className="px-2.5 py-1 text-xs bg-white text-gray-700 rounded border border-gray-300 hover:bg-gray-50 flex items-center gap-1">
                                  <Upload className="w-3 h-3" />
                                  Replace
                                </button>
                              </>
                            ) : (
                              <button className="px-2.5 py-1 text-xs bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded hover:from-orange-600 hover:to-orange-700 flex items-center gap-1">
                                <Upload className="w-3 h-3" />
                                Upload Document
                              </button>
                            )}
                            
                            <button className="px-2.5 py-1 text-xs bg-white text-gray-700 rounded border border-gray-300 hover:bg-gray-50 flex items-center gap-1">
                              <Download className="w-3 h-3" />
                              Sample
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {activeSection === 'bank' && (
                  <div className="space-y-4">
                    <div className="bg-green-50 rounded-lg p-3 mb-4 border border-green-200">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <div>
                          <h4 className="text-sm font-bold text-gray-800">Bank Account Verified</h4>
                          <p className="text-xs text-gray-600">You can receive payments to this account</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        { label: 'Account Name', value: profileData.bankDetails.accountName },
                        { label: 'Account Number', value: profileData.bankDetails.accountNumber },
                        { label: 'Bank Name', value: profileData.bankDetails.bankName },
                        { label: 'IFSC Code', value: profileData.bankDetails.ifscCode },
                        { label: 'UPI ID', value: profileData.bankDetails.upiId, colSpan: 'sm:col-span-2' }
                      ].map((field, idx) => (
                        <div key={idx} className={field.colSpan || ''}>
                          <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                          {isEditing ? (
                            <input
                              type="text"
                              value={formData.bankDetails[field.label.toLowerCase().replace(/ /g, '')]}
                              onChange={(e) => handleInputChange('bankDetails', field.label.toLowerCase().replace(/ /g, ''), e.target.value)}
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-orange-500 focus:border-transparent"
                            />
                          ) : (
                            <div className="px-3 py-2 text-sm bg-gray-50 rounded border border-gray-200">
                              {field.value}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    
                    <div className="pt-4 border-t border-gray-200">
                      <div className="text-sm text-gray-600 mb-2">Bank verification usually takes 24-48 hours</div>
                      <button className="px-3 py-1.5 text-sm bg-white text-orange-500 rounded border border-orange-300 hover:bg-orange-50">
                        Update Bank Details
                      </button>
                    </div>
                  </div>
                )}
                
                {activeSection === 'working' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Working Cities</label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={formData.workingInfo.cities.join(', ')}
                            onChange={(e) => handleInputChange('workingInfo', 'cities', e.target.value.split(', '))}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-orange-500 focus:border-transparent"
                            placeholder="Delhi, Noida, Ghaziabad"
                          />
                        ) : (
                          <div className="px-3 py-2 text-sm bg-gray-50 rounded border border-gray-200">
                            {profileData.workingInfo.cities.join(', ')}
                          </div>
                        )}
                      </div>
                      
                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Service Areas</label>
                        {isEditing ? (
                          <textarea
                            value={formData.workingInfo.areas.join(', ')}
                            onChange={(e) => handleInputChange('workingInfo', 'areas', e.target.value.split(', '))}
                            rows="2"
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-orange-500 focus:border-transparent"
                            placeholder="Sector 62, Sector 128, Sector 45"
                          />
                        ) : (
                          <div className="px-3 py-2 text-sm bg-gray-50 rounded border border-gray-200">
                            {profileData.workingInfo.areas.join(', ')}
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Working Hours</label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={formData.workingInfo.workingHours}
                            onChange={(e) => handleInputChange('workingInfo', 'workingHours', e.target.value)}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-orange-500 focus:border-transparent"
                          />
                        ) : (
                          <div className="px-3 py-2 text-sm bg-gray-50 rounded border border-gray-200">
                            {profileData.workingInfo.workingHours}
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Travel Radius</label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={formData.workingInfo.travelRadius}
                            onChange={(e) => handleInputChange('workingInfo', 'travelRadius', e.target.value)}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-orange-500 focus:border-transparent"
                          />
                        ) : (
                          <div className="px-3 py-2 text-sm bg-gray-50 rounded border border-gray-200">
                            {profileData.workingInfo.travelRadius}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                
                {activeSection === 'languages' && (
                  <div className="space-y-4">
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Languages Spoken</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={formData.workingInfo.languages.join(', ')}
                          onChange={(e) => handleInputChange('workingInfo', 'languages', e.target.value.split(', '))}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-orange-500 focus:border-transparent"
                          placeholder="Hindi, English, Sanskrit"
                        />
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {profileData.workingInfo.languages.map((lang, idx) => (
                            <span key={idx} className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full border border-blue-200">
                              {lang}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                      <div className="flex items-start gap-3">
                        <Globe className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div>
                          <h4 className="text-sm font-bold text-gray-800 mb-1">Language Tips</h4>
                          <p className="text-xs text-gray-600">
                            Add languages you're comfortable speaking during pujas. Customers prefer pandits who can explain rituals in their preferred language.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Section Footer */}
              {isEditing && (
                <div className="p-3 border-t border-gray-200">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={handleCancel}
                      className="px-3 py-1.5 text-sm bg-white text-gray-800 rounded border border-gray-300 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="px-3 py-1.5 text-sm bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded hover:from-orange-600 hover:to-orange-700 flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      Save Changes
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Help & Support */}
        <div className="bg-white rounded-lg border border-gray-200 p-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <h4 className="text-sm font-medium text-gray-800 mb-1">Need help with KYC verification?</h4>
              <p className="text-sm text-gray-600">Contact our support team for document-related queries</p>
            </div>
            
            <div className="flex gap-2">
              <button className="px-3 py-1.5 text-sm bg-white text-gray-800 rounded-lg border border-gray-300 hover:bg-gray-50 flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Call Support
              </button>
              <button className="px-3 py-1.5 text-sm bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Documents
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileKyc;