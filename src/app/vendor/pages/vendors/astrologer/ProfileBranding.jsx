import { useState, useEffect, useRef } from 'react';
import { 
  User, Edit, Camera, Upload, CheckCircle,
  Shield, Award, Globe, Calendar, Star,
  FileText, Video, Mail, Phone, MapPin,
  X, Plus, Trash2, Eye, Download,
  Share2, Printer, Settings, Users,
  TrendingUp, BarChart, MessageSquare,
  ChevronDown, ChevronUp, MoreVertical,
  Hash, Sparkles, Zap, Moon, Sun,
  BookOpen, GraduationCap, Languages,
  Briefcase, Clock, Shield as ShieldIcon,
  Globe as GlobeIcon, CreditCard, Bell
} from 'lucide-react';

import VendorPageHeader from '../../../components/VendorPageHeader';

const ProfileBranding = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showCertModal, setShowCertModal] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [introVideo, setIntroVideo] = useState(null);
  const [certifications, setCertifications] = useState([]);
  const fileInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const certInputRef = useRef(null);

  // Tabs
  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'branding', label: 'Branding', icon: Sparkles },
    { id: 'verification', label: 'Verification', icon: Shield },
    { id: 'stats', label: 'Statistics', icon: BarChart }
  ];

  // Profile data
  const [profileData, setProfileData] = useState({
    name: 'Dr. Rajesh Sharma',
    title: 'Vedic Astrologer & Puja Specialist',
    experience: '15',
    languages: ['Hindi', 'English', 'Marathi', 'Sanskrit'],
    email: 'rajesh.sharma@vedicastrology.com',
    phone: '+91 98765 43210',
    location: 'Varanasi, Uttar Pradesh',
    bio: 'With over 15 years of experience in Vedic astrology, I specialize in birth chart analysis, marriage compatibility, and vastu consultations. My approach combines ancient wisdom with practical guidance to help clients navigate life\'s challenges.',
    expertise: ['Vedic Astrology', 'KP System', 'Muhurta', 'Remedial Astrology', 'Vastu Shastra'],
    availability: 'Mon-Sat: 10 AM - 7 PM',
    consultationTypes: ['Home Visit', 'Video Call', 'Temple Puja'],
    education: 'M.A. in Astrology, Banaras Hindu University',
    achievements: ['Certified Jyotish Visharad', 'Best Astrologer Award 2022', '1000+ Satisfied Clients']
  });

  // Branding data
  const [brandingData, setBrandingData] = useState({
    tagline: 'Guiding Lives Through Cosmic Wisdom',
    colorTheme: 'orange',
    showExperience: true,
    showCertifications: true,
    showTestimonials: true,
    socialLinks: {
      facebook: 'facebook.com/rajeshastrologer',
      instagram: '@rajesh_vedic',
      youtube: 'youtube.com/rajeshastrology'
    }
  });

  // Verification data
  const [verificationData, setVerificationData] = useState({
    emailVerified: true,
    phoneVerified: true,
    idVerified: true,
    certificationVerified: true,
    premiumMember: true,
    badges: [
      { id: 1, name: 'Verified Astrologer', icon: ShieldIcon, color: 'blue', verified: true },
      { id: 2, name: 'Certified Expert', icon: Award, color: 'green', verified: true },
      { id: 3, name: 'Top Performer', icon: Star, color: 'orange', verified: true },
      { id: 4, name: 'Quick Responder', icon: Zap, color: 'purple', verified: true }
    ]
  });

  // Stats data
  const statsData = {
    totalConsultations: 1250,
    averageRating: 4.8,
    clientRetention: '78%',
    responseRate: '94%',
    monthlyGrowth: '+12%'
  };

  // Sample certifications
  const sampleCertifications = [
    { id: 1, name: 'Jyotish Visharad', issuer: 'All India Federation of Astrologers', year: '2010' },
    { id: 2, name: 'Vastu Consultant Certification', issuer: 'Indian Institute of Vastu', year: '2015' },
    { id: 3, name: 'Remedial Astrology Specialist', issuer: 'International Astrology Council', year: '2018' }
  ];

  // Stats cards
  const stats = [
    { title: 'Experience', value: `${profileData.experience} years`, icon: Calendar, color: 'orange' },
    { title: 'Avg. Rating', value: statsData.averageRating, icon: Star, color: 'yellow' },
    { title: 'Consultations', value: statsData.totalConsultations.toLocaleString(), icon: Users, color: 'blue' },
    { title: 'Languages', value: profileData.languages.length, icon: Globe, color: 'green' }
  ];

  // Expertise options
  const expertiseOptions = [
    'Vedic Astrology', 'KP System', 'Nadi Astrology', 'Tropical Astrology',
    'Horary Astrology', 'Muhurta', 'Remedial Astrology', 'Vastu Shastra',
    'Numerology', 'Tarot Reading', 'Palmistry', 'Gemstone Consultation',
    'Marriage Compatibility', 'Career Guidance', 'Health Astrology'
  ];

  // Language options
  const languageOptions = [
    'Hindi', 'English', 'Marathi', 'Sanskrit', 'Bengali', 'Tamil',
    'Telugu', 'Kannada', 'Malayalam', 'Gujarati', 'Punjabi', 'Urdu'
  ];

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle video upload
  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // In a real app, you would upload to server
      setIntroVideo({
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
        url: URL.createObjectURL(file)
      });
    }
  };

  // Handle certification upload
  const handleCertUpload = (e) => {
    const files = Array.from(e.target.files);
    const newCerts = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
      file: file
    }));
    setCertifications([...certifications, ...newCerts]);
  };

  // Remove certification
  const removeCertification = (id) => {
    setCertifications(certifications.filter(cert => cert.id !== id));
  };

  // Add expertise tag
  const addExpertiseTag = (tag) => {
    if (!profileData.expertise.includes(tag) && profileData.expertise.length < 8) {
      setProfileData({
        ...profileData,
        expertise: [...profileData.expertise, tag]
      });
    }
  };

  // Remove expertise tag
  const removeExpertiseTag = (tag) => {
    setProfileData({
      ...profileData,
      expertise: profileData.expertise.filter(t => t !== tag)
    });
  };

  // Add language
  const addLanguage = (lang) => {
    if (!profileData.languages.includes(lang) && profileData.languages.length < 6) {
      setProfileData({
        ...profileData,
        languages: [...profileData.languages, lang]
      });
    }
  };

  // Remove language
  const removeLanguage = (lang) => {
    setProfileData({
      ...profileData,
      languages: profileData.languages.filter(l => l !== lang)
    });
  };

  // Get verification badge
  const getVerificationBadge = (verified) => {
    return verified ? (
      <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-200 text-xs">
        <CheckCircle className="w-3 h-3" /> Verified
      </span>
    ) : (
      <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-yellow-50 text-yellow-700 border border-yellow-200 text-xs">
        <Clock className="w-3 h-3" /> Pending
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50/30">
      <VendorPageHeader 
        title="PROFILE & BRANDING" 
        subtitle="Build your professional astrologer identity" 
      />

      {/* Main Content */}
      <div className="p-6">
        {/* Tabs */}
        <div className="bg-white p-2 rounded-lg border border-gray-200 shadow-xs mb-4">
          <div className="flex flex-wrap gap-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-orange-400 to-orange-500 text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Profile Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg border border-gray-200 shadow-xs sticky top-6">
                {/* Profile Image */}
                <div className="relative">
                  <div className="h-48 bg-gradient-to-r from-orange-400 to-orange-500 rounded-t-lg"></div>
                  <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full border-4 border-white bg-white">
                        {profileImage ? (
                          <img
                            src={profileImage}
                            alt="Profile"
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
                            <User className="w-12 h-12 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute bottom-0 right-0 w-8 h-8 bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-full border-2 border-white flex items-center justify-center hover:from-orange-600 hover:to-orange-700"
                      >
                        <Camera className="w-4 h-4" />
                      </button>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        accept="image/*"
                        className="hidden"
                      />
                    </div>
                  </div>
                </div>

                {/* Profile Info */}
                <div className="pt-16 px-4 pb-4">
                  <div className="text-center">
                    <h2 className="text-xl font-bold text-gray-800">{profileData.name}</h2>
                    <p className="text-sm text-gray-600 mt-1">{profileData.title}</p>
                    
                    {/* Verification Badges */}
                    <div className="flex flex-wrap gap-1 justify-center mt-2">
                      {verificationData.badges.slice(0, 2).map(badge => (
                        <span
                          key={badge.id}
                          className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-xs ${
                            badge.color === 'blue' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                            badge.color === 'green' ? 'bg-green-50 text-green-700 border border-green-200' :
                            badge.color === 'orange' ? 'bg-orange-50 text-orange-700 border border-orange-200' :
                            'bg-purple-50 text-purple-700 border border-purple-200'
                          }`}
                        >
                          <badge.icon className="w-3 h-3" />
                          {badge.name}
                        </span>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-2 mt-4">
                      {stats.map((stat, index) => (
                        <div key={index} className="bg-gray-50 p-2 rounded text-center">
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <stat.icon className={`w-4 h-4 ${
                              stat.color === 'orange' ? 'text-orange-500' :
                              stat.color === 'yellow' ? 'text-yellow-500' :
                              stat.color === 'blue' ? 'text-blue-500' :
                              'text-green-500'
                            }`} />
                            <span className="text-xs text-gray-600">{stat.title}</span>
                          </div>
                          <div className="font-bold text-gray-800">{stat.value}</div>
                        </div>
                      ))}
                    </div>

                    {/* Contact Info */}
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center justify-center gap-2 text-sm text-gray-700">
                        <Mail className="w-4 h-4" />
                        {profileData.email}
                      </div>
                      <div className="flex items-center justify-center gap-2 text-sm text-gray-700">
                        <Phone className="w-4 h-4" />
                        {profileData.phone}
                      </div>
                      <div className="flex items-center justify-center gap-2 text-sm text-gray-700">
                        <MapPin className="w-4 h-4" />
                        {profileData.location}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 mt-4">
                      <button className="flex-1 px-3 py-1.5 bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded text-sm">
                        <Share2 className="inline w-4 h-4 mr-1" />
                        Share
                      </button>
                      <button className="flex-1 px-3 py-1.5 border border-gray-300 text-gray-700 rounded text-sm">
                        <Eye className="inline w-4 h-4 mr-1" />
                        Preview
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Profile Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Bio Section */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-xs">
                <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                  <h2 className="text-base font-semibold text-gray-800">Professional Bio</h2>
                  <button
                    onClick={() => setShowEditModal(true)}
                    className="text-sm text-orange-600 hover:text-orange-700"
                  >
                    <Edit className="inline w-4 h-4 mr-1" />
                    Edit
                  </button>
                </div>
                <div className="p-4">
                  <p className="text-gray-700">{profileData.bio}</p>
                </div>
              </div>

              {/* Expertise Tags */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-xs">
                <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                  <h2 className="text-base font-semibold text-gray-800">Expertise Tags</h2>
                  <span className="text-sm text-gray-600">{profileData.expertise.length}/8 selected</span>
                </div>
                <div className="p-4">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {profileData.expertise.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-orange-50 to-orange-100 text-orange-700 rounded-full border border-orange-200"
                      >
                        {tag}
                        <button
                          onClick={() => removeExpertiseTag(tag)}
                          className="ml-1 text-orange-600 hover:text-orange-800"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="text-sm text-gray-600 mb-2">Add more expertise:</div>
                  <div className="flex flex-wrap gap-1">
                    {expertiseOptions
                      .filter(tag => !profileData.expertise.includes(tag))
                      .slice(0, 6)
                      .map((tag, index) => (
                        <button
                          key={index}
                          onClick={() => addExpertiseTag(tag)}
                          className="px-2 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50"
                        >
                          + {tag}
                        </button>
                      ))}
                  </div>
                </div>
              </div>

              {/* Languages */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-xs">
                <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                  <h2 className="text-base font-semibold text-gray-800">Languages</h2>
                  <span className="text-sm text-gray-600">{profileData.languages.length}/6 selected</span>
                </div>
                <div className="p-4">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {profileData.languages.map((lang, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 rounded-full border border-blue-200"
                      >
                        <Globe className="w-4 h-4" />
                        {lang}
                        <button
                          onClick={() => removeLanguage(lang)}
                          className="ml-1 text-blue-600 hover:text-blue-800"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="text-sm text-gray-600 mb-2">Add more languages:</div>
                  <div className="flex flex-wrap gap-1">
                    {languageOptions
                      .filter(lang => !profileData.languages.includes(lang))
                      .slice(0, 6)
                      .map((lang, index) => (
                        <button
                          key={index}
                          onClick={() => addLanguage(lang)}
                          className="px-2 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50"
                        >
                          + {lang}
                        </button>
                      ))}
                  </div>
                </div>
              </div>

              {/* Education & Achievements */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg border border-gray-200 shadow-xs">
                  <div className="p-4 border-b border-gray-200">
                    <h2 className="text-base font-semibold text-gray-800">Education</h2>
                  </div>
                  <div className="p-4">
                    <div className="flex items-start gap-2">
                      <GraduationCap className="w-5 h-5 text-purple-600 mt-0.5" />
                      <div>
                        <div className="font-medium text-gray-800">{profileData.education}</div>
                        <div className="text-sm text-gray-600 mt-1">Banaras Hindu University</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 shadow-xs">
                  <div className="p-4 border-b border-gray-200">
                    <h2 className="text-base font-semibold text-gray-800">Achievements</h2>
                  </div>
                  <div className="p-4 space-y-2">
                    {profileData.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <Award className="w-4 h-4 text-yellow-600 mt-0.5" />
                        <span className="text-sm text-gray-700">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Branding Tab */}
        {activeTab === 'branding' && (
          <div className="space-y-6">
            {/* Branding Overview */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-xs">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-base font-semibold text-gray-800">Brand Identity</h2>
                <p className="text-sm text-gray-600 mt-0.5">How clients see your professional brand</p>
              </div>
              
              <div className="p-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left - Brand Elements */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Brand Tagline</label>
                      <div className="text-lg font-bold text-orange-700">{brandingData.tagline}</div>
                      <p className="text-sm text-gray-600 mt-1">This appears under your name on your profile</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Color Theme</label>
                      <div className="flex gap-2">
                        {['orange', 'blue', 'purple', 'green'].map(color => (
                          <button
                            key={color}
                            onClick={() => setBrandingData({...brandingData, colorTheme: color})}
                            className={`w-10 h-10 rounded-full border-2 ${
                              brandingData.colorTheme === color ? 'border-gray-800' : 'border-gray-300'
                            } ${
                              color === 'orange' ? 'bg-gradient-to-r from-orange-400 to-orange-500' :
                              color === 'blue' ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
                              color === 'purple' ? 'bg-gradient-to-r from-purple-500 to-purple-600' :
                              'bg-gradient-to-r from-green-500 to-green-600'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Display Options */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Display Options</label>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={brandingData.showExperience}
                            onChange={(e) => setBrandingData({...brandingData, showExperience: e.target.checked})}
                            className="w-4 h-4 text-orange-500 rounded"
                          />
                          <span className="text-sm text-gray-700">Show experience years prominently</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={brandingData.showCertifications}
                            onChange={(e) => setBrandingData({...brandingData, showCertifications: e.target.checked})}
                            className="w-4 h-4 text-orange-500 rounded"
                          />
                          <span className="text-sm text-gray-700">Display certifications on profile</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={brandingData.showTestimonials}
                            onChange={(e) => setBrandingData({...brandingData, showTestimonials: e.target.checked})}
                            className="w-4 h-4 text-orange-500 rounded"
                          />
                          <span className="text-sm text-gray-700">Show client testimonials</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Right - Social Links */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Social Media Links</h3>
                    <div className="space-y-3">
                      {Object.entries(brandingData.socialLinks).map(([platform, link]) => (
                        <div key={platform} className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                            <span className="text-xs font-medium text-gray-700">{platform.charAt(0).toUpperCase()}</span>
                          </div>
                          <input
                            type="text"
                            value={link}
                            onChange={(e) => setBrandingData({
                              ...brandingData,
                              socialLinks: {...brandingData.socialLinks, [platform]: e.target.value}
                            })}
                            className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded"
                            placeholder={`${platform} link`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Intro Video */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-xs">
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <div>
                  <h2 className="text-base font-semibold text-gray-800">Introduction Video</h2>
                  <p className="text-sm text-gray-600 mt-0.5">Upload a short video introducing yourself to clients</p>
                </div>
                <button
                  onClick={() => videoInputRef.current?.click()}
                  className="px-3 py-1.5 bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded text-sm"
                >
                  <Upload className="inline w-4 h-4 mr-1" />
                  {introVideo ? 'Replace Video' : 'Upload Video'}
                </button>
                <input
                  type="file"
                  ref={videoInputRef}
                  onChange={handleVideoUpload}
                  accept="video/*"
                  className="hidden"
                />
              </div>
              
              <div className="p-4">
                {introVideo ? (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded border border-gray-200">
                    <Video className="w-8 h-8 text-orange-600" />
                    <div className="flex-1">
                      <div className="font-medium text-gray-800">{introVideo.name}</div>
                      <div className="text-sm text-gray-600">{introVideo.size}</div>
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={() => setShowVideoModal(true)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setIntroVideo(null)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                    <Video className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <h3 className="text-base font-medium text-gray-700 mb-1">No video uploaded</h3>
                    <p className="text-sm text-gray-500 mb-3">Upload a 1-2 minute introduction video</p>
                    <button
                      onClick={() => videoInputRef.current?.click()}
                      className="px-3 py-1.5 bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded text-sm"
                    >
                      <Upload className="inline w-4 h-4 mr-1" />
                      Upload Video
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Profile Preview */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-xs">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-base font-semibold text-gray-800">Profile Preview</h2>
                <p className="text-sm text-gray-600 mt-0.5">How your profile appears to clients</p>
              </div>
              
              <div className="p-4">
                <div className="max-w-md mx-auto border border-gray-300 rounded-lg overflow-hidden">
                  {/* Preview Header */}
                  <div className={`h-20 ${
                    brandingData.colorTheme === 'orange' ? 'bg-gradient-to-r from-orange-400 to-orange-500' :
                    brandingData.colorTheme === 'blue' ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
                    brandingData.colorTheme === 'purple' ? 'bg-gradient-to-r from-purple-500 to-purple-600' :
                    'bg-gradient-to-r from-green-500 to-green-600'
                  }`}></div>
                  
                  {/* Preview Content */}
                  <div className="p-4 relative">
                    <div className="absolute -top-6 left-4">
                      <div className="w-12 h-12 rounded-full bg-gray-200 border-2 border-white"></div>
                    </div>
                    
                    <div className="ml-16">
                      <h3 className="font-bold text-gray-800">{profileData.name}</h3>
                      <p className="text-sm text-gray-600">{brandingData.tagline}</p>
                      
                      {brandingData.showExperience && (
                        <div className="flex items-center gap-1 mt-1">
                          <Calendar className="w-3.5 h-3.5 text-gray-500" />
                          <span className="text-sm text-gray-700">{profileData.experience} years experience</span>
                        </div>
                      )}
                      
                      <div className="flex flex-wrap gap-1 mt-2">
                        {profileData.expertise.slice(0, 3).map((tag, index) => (
                          <span key={index} className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Verification Tab */}
        {activeTab === 'verification' && (
          <div className="space-y-6">
            {/* Verification Status */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-xs">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-base font-semibold text-gray-800">Verification Status</h2>
                <p className="text-sm text-gray-600 mt-0.5">Verified profiles get 3x more bookings</p>
              </div>
              
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(verificationData)
                    .filter(([key]) => key.endsWith('Verified') || key === 'premiumMember')
                    .map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded border border-gray-200">
                        <div className="flex items-center gap-2">
                          {key === 'emailVerified' && <Mail className="w-5 h-5 text-gray-600" />}
                          {key === 'phoneVerified' && <Phone className="w-5 h-5 text-gray-600" />}
                          {key === 'idVerified' && <User className="w-5 h-5 text-gray-600" />}
                          {key === 'certificationVerified' && <Award className="w-5 h-5 text-gray-600" />}
                          {key === 'premiumMember' && <Shield className="w-5 h-5 text-gray-600" />}
                          <div>
                            <div className="font-medium text-gray-800">
                              {key === 'emailVerified' && 'Email Verification'}
                              {key === 'phoneVerified' && 'Phone Verification'}
                              {key === 'idVerified' && 'ID Verification'}
                              {key === 'certificationVerified' && 'Certification Verification'}
                              {key === 'premiumMember' && 'Premium Membership'}
                            </div>
                            <div className="text-sm text-gray-600">
                              {key === 'premiumMember' ? 'Active until Dec 2024' : 'Last verified: 2 months ago'}
                            </div>
                          </div>
                        </div>
                        {getVerificationBadge(value)}
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Certification Upload */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-xs">
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <div>
                  <h2 className="text-base font-semibold text-gray-800">Certifications</h2>
                  <p className="text-sm text-gray-600 mt-0.5">Upload your certificates for verification</p>
                </div>
                <button
                  onClick={() => certInputRef.current?.click()}
                  className="px-3 py-1.5 bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded text-sm"
                >
                  <Upload className="inline w-4 h-4 mr-1" />
                  Upload Certificate
                </button>
                <input
                  type="file"
                  ref={certInputRef}
                  onChange={handleCertUpload}
                  accept=".pdf,.jpg,.jpeg,.png"
                  multiple
                  className="hidden"
                />
              </div>
              
              <div className="p-4">
                {/* Existing Certifications */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Verified Certifications</h3>
                  <div className="space-y-2">
                    {sampleCertifications.map(cert => (
                      <div key={cert.id} className="flex items-center justify-between p-3 bg-green-50 rounded border border-green-200">
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-green-600" />
                          <div>
                            <div className="font-medium text-gray-800">{cert.name}</div>
                            <div className="text-sm text-gray-600">{cert.issuer} • {cert.year}</div>
                          </div>
                        </div>
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Uploaded Certifications */}
                {certifications.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Pending Uploads ({certifications.length})</h3>
                    <div className="space-y-2">
                      {certifications.map(cert => (
                        <div key={cert.id} className="flex items-center justify-between p-3 bg-yellow-50 rounded border border-yellow-200">
                          <div className="flex items-center gap-3">
                            <FileText className="w-5 h-5 text-yellow-600" />
                            <div>
                              <div className="font-medium text-gray-800">{cert.name}</div>
                              <div className="text-sm text-gray-600">{cert.size} • Pending verification</div>
                            </div>
                          </div>
                          <div className="flex gap-1">
                            <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => removeCertification(cert.id)}
                              className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {certifications.length === 0 && sampleCertifications.length > 0 && (
                  <div className="text-center py-4">
                    <p className="text-sm text-gray-600">All certifications verified ✓</p>
                  </div>
                )}
              </div>
            </div>

            {/* Badges & Achievements */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-xs">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-base font-semibold text-gray-800">Badges & Achievements</h2>
                <p className="text-sm text-gray-600 mt-0.5">Earn badges by completing achievements</p>
              </div>
              
              <div className="p-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {verificationData.badges.map(badge => (
                    <div key={badge.id} className="text-center p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
                      <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-2 ${
                        badge.color === 'blue' ? 'bg-blue-100' :
                        badge.color === 'green' ? 'bg-green-100' :
                        badge.color === 'orange' ? 'bg-orange-100' :
                        'bg-purple-100'
                      }`}>
                        <badge.icon className={`w-6 h-6 ${
                          badge.color === 'blue' ? 'text-blue-600' :
                          badge.color === 'green' ? 'text-green-600' :
                          badge.color === 'orange' ? 'text-orange-600' :
                          'text-purple-600'
                        }`} />
                      </div>
                      <div className="font-medium text-gray-800 text-sm">{badge.name}</div>
                      <div className="text-xs text-gray-500 mt-1">Earned</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Statistics Tab */}
        {activeTab === 'stats' && (
          <div className="space-y-6">
            {/* Performance Overview */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-xs">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-base font-semibold text-gray-800">Profile Performance</h2>
                <p className="text-sm text-gray-600 mt-0.5">How your profile is performing</p>
              </div>
              
              <div className="p-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-4 rounded-lg border border-orange-200">
                    <div className="text-xl font-bold text-gray-800 mb-1">{statsData.totalConsultations.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Total Consultations</div>
                    <div className="text-xs text-green-600 flex items-center gap-1 mt-1">
                      <TrendingUp className="w-3 h-3" />
                      +45 this month
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-lg border border-blue-200">
                    <div className="text-xl font-bold text-gray-800 mb-1">{statsData.averageRating}</div>
                    <div className="text-sm text-gray-600">Average Rating</div>
                    <div className="flex items-center mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
                    <div className="text-xl font-bold text-gray-800 mb-1">{statsData.clientRetention}</div>
                    <div className="text-sm text-gray-600">Client Retention</div>
                    <div className="text-xs text-green-600 flex items-center gap-1 mt-1">
                      <TrendingUp className="w-3 h-3" />
                      +8% from last month
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-purple-50 to-violet-50 p-4 rounded-lg border border-purple-200">
                    <div className="text-xl font-bold text-gray-800 mb-1">{statsData.responseRate}</div>
                    <div className="text-sm text-gray-600">Response Rate</div>
                    <div className="text-xs text-gray-600 mt-1">Avg. response: 12 min</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Views */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-xs">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-base font-semibold text-gray-800">Profile Visibility</h2>
                <p className="text-sm text-gray-600 mt-0.5">How many clients are viewing your profile</p>
              </div>
              
              <div className="p-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-800">Monthly Profile Views</div>
                      <div className="text-sm text-gray-600">Last 30 days</div>
                    </div>
                    <div className="text-xl font-bold text-gray-800">1,245</div>
                  </div>
                  
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-orange-400 to-orange-500 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-800">42%</div>
                      <div className="text-sm text-gray-600">From search</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-800">38%</div>
                      <div className="text-sm text-gray-600">From recommendations</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-800">20%</div>
                      <div className="text-sm text-gray-600">Direct visits</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Improvement Suggestions */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-xs">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-base font-semibold text-gray-800">Improvement Suggestions</h2>
                <p className="text-sm text-gray-600 mt-0.5">Tips to improve your profile performance</p>
              </div>
              
              <div className="p-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-2 p-3 bg-blue-50 rounded border border-blue-200">
                    <Sparkles className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-gray-800">Add an introduction video</div>
                      <div className="text-sm text-gray-600">Profiles with videos get 2x more bookings</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2 p-3 bg-green-50 rounded border border-green-200">
                    <MessageSquare className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-gray-800">Respond to reviews</div>
                      <div className="text-sm text-gray-600">Reply to 3 pending reviews to improve rating</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2 p-3 bg-purple-50 rounded border border-purple-200">
                    <Award className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-gray-800">Add more certifications</div>
                      <div className="text-sm text-gray-600">Upload 2 more certifications for expert badge</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-3 sm:p-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[85vh] overflow-y-auto">
            <div className="p-4 sm:p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-800">Edit Profile</h2>
                <button 
                  onClick={() => setShowEditModal(false)}
                  className="p-1 hover:bg-gray-100 rounded text-gray-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form className="space-y-4">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      defaultValue={profileData.name}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-orange-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Professional Title *
                    </label>
                    <input
                      type="text"
                      defaultValue={profileData.title}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-orange-500"
                      placeholder="e.g., Vedic Astrologer"
                    />
                  </div>
                </div>

                {/* Experience */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Years of Experience *
                  </label>
                  <select
                    defaultValue={profileData.experience}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-orange-500"
                  >
                    {[...Array(50)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>{i + 1} years</option>
                    ))}
                  </select>
                </div>

                {/* Bio */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Professional Bio *
                  </label>
                  <textarea
                    rows={4}
                    defaultValue={profileData.bio}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-orange-500"
                    placeholder="Describe your expertise, approach, and experience..."
                  />
                  <p className="text-xs text-gray-500 mt-1">Minimum 150 characters recommended</p>
                </div>

                {/* Contact Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      defaultValue={profileData.email}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-orange-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      defaultValue={profileData.phone}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-orange-500"
                    />
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    defaultValue={profileData.location}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-orange-500"
                    placeholder="City, State, Country"
                  />
                </div>

                {/* Education */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Education
                  </label>
                  <input
                    type="text"
                    defaultValue={profileData.education}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-orange-500"
                    placeholder="Your educational background in astrology"
                  />
                </div>

                {/* Modal Actions */}
                <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 pt-4 border-t">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 text-sm w-full sm:w-auto"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowEditModal(false);
                      alert('Profile updated successfully!');
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded hover:from-orange-600 hover:to-orange-700 text-sm w-full sm:w-auto"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Video Preview Modal */}
      {showVideoModal && introVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-3 sm:p-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-2xl">
            <div className="p-4 sm:p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-800">Introduction Video Preview</h2>
                <button 
                  onClick={() => setShowVideoModal(false)}
                  className="p-1 hover:bg-gray-100 rounded text-gray-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center mb-4">
                <div className="text-center">
                  <Video className="w-16 h-16 text-white mx-auto mb-3" />
                  <p className="text-white">{introVideo.name}</p>
                  <p className="text-gray-400 text-sm mt-1">Video preview would appear here</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 px-4 py-2 bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded text-sm">
                  <Eye className="inline w-4 h-4 mr-1" />
                  View Full Video
                </button>
                <button className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded text-sm">
                  <Download className="inline w-4 h-4 mr-1" />
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileBranding;
