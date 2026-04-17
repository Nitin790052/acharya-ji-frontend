import React, { useState, useEffect } from 'react';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Camera,
  Lock,
  Shield,
  LogIn,
  Bell,
  Globe,
  Sun,
  Moon,
  ChevronRight,
  Save,
  X,
  CheckCircle,
  AlertCircle,
  Edit2,
  Eye,
  EyeOff,
  Smartphone,
  Monitor,
  Clock,
  Loader
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useUploadAvatarMutation
} from '../../../../services/userApi';
import { API_URL, getImageUrl } from '../../../../config/apiConfig';
import { getTranslation } from '../../../../utils/translations';

const UserProfile = () => {
  // ========== RTK QUERY HOOKS ==========
  const { data: profileResponse, isLoading, isError } = useGetProfileQuery(undefined, { pollingInterval: 3000 });
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const [changePassword, { isLoading: isChangingPassword }] = useChangePasswordMutation();
  const [uploadAvatar, { isLoading: isUploadingAvatar }] = useUploadAvatarMutation();

  // ========== STATE MANAGEMENT ==========
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [show2FAModal, setShow2FAModal] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [showAllLogins, setShowAllLogins] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // ========== PROFILE DATA ==========
  const [profile, setProfile] = useState({
    photo: null,
    fullName: '',
    email: '',
    phone: '',
    address: '',
    memberSince: '2023',
    lastLogin: 'Today, 9:30 AM'
  });

  // ========== EDIT FORM STATE ==========
  const [editForm, setEditForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: ''
  });

  // ========== NOTIFICATION SETTINGS ==========
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: true,
    whatsAppUpdates: false,
    promotionalEmails: true,
    bookingReminders: true,
    paymentAlerts: true,
    newsletter: false
  });

  // ========== LOGIN ACTIVITY ==========
  const [loginActivity, setLoginActivity] = useState([]);

  // ========== LANGUAGE ==========
  const [language, setLanguage] = useState('English (India)');
  const languages = [
    { id: 1, name: 'English (India)', native: 'English' },
    { id: 2, name: 'हिन्दी (Hindi)', native: 'हिन्दी' }
  ];

  // ========== THEME ==========
  const [theme, setTheme] = useState('light'); // light, dark, system

  // Sync state with fetched data
  useEffect(() => {
    if (profileResponse?.success && profileResponse.data) {
      const userData = profileResponse.data;
      const baseUrl = API_URL.replace('/api', '');

      const formatDateTime = (timestamp) => {
        if (!timestamp) return 'Just now';
        const date = new Date(timestamp);
        return date.toLocaleString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        });
      };

      const formattedProfile = {
        photo: getImageUrl(userData.avatar),
        fullName: userData.name || '',
        email: userData.email || '',
        phone: userData.phone || '',
        address: userData.address || '',
        memberSince: userData.createdAt ? new Date(userData.createdAt).getFullYear().toString() : '2023',
        lastLogin: userData.loginHistory && userData.loginHistory.length > 1
          ? `${userData.loginHistory[1].device} from ${userData.loginHistory[1].location || 'Unknown location'} at ${formatDateTime(userData.loginHistory[1].timestamp)}`
          : (userData.createdAt ? `First Login on ${new Date(userData.createdAt).toLocaleDateString('en-GB')}` : 'Just now')
      };
      setProfile(formattedProfile);
      setEditForm({
        fullName: formattedProfile.fullName,
        email: formattedProfile.email,
        phone: formattedProfile.phone,
        address: formattedProfile.address
      });
      if (userData.notificationSettings) {
        setNotificationSettings(userData.notificationSettings);
      }
      if (userData.language) setLanguage(userData.language);
      if (userData.theme) setTheme(userData.theme);
      if (userData.loginHistory) {
        setLoginActivity(userData.loginHistory.map((h, index) => ({
          id: h._id,
          device: h.device,
          location: h.location,
          time: formatDateTime(h.timestamp),
          current: index === 0
        })));
      }
    }
  }, [profileResponse]);

  // ========== PASSWORD CHANGE STATE ==========
  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  // ========== 2FA STATE ==========
  const [twoFA, setTwoFA] = useState({
    enabled: false,
    method: 'app', // app, sms, email
    verified: false
  });

  // ========== HANDLER FUNCTIONS ==========
  const handleEditToggle = () => {
    if (isEditing) {
      setEditForm({
        fullName: profile.fullName,
        email: profile.email,
        phone: profile.phone,
        address: profile.address
      });
    }
    setIsEditing(!isEditing);
  };

  const handleSaveProfile = async () => {
    try {
      await updateProfile({
        name: editForm.fullName,
        phone: editForm.phone,
        address: editForm.address
      }).unwrap();

      setIsEditing(false);
      toast.success('✅ Profile updated successfully!');
    } catch (err) {
      toast.error(err.data?.message || 'Failed to update profile');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    const formData = new FormData();
    formData.append('avatar', file);

    toast.promise(
      uploadAvatar(formData).unwrap(),
      {
        pending: 'Uploading profile picture...',
        success: '✅ Profile picture updated!',
        error: 'Failed to upload image'
      }
    );
  };

  const handlePasswordChange = async () => {
    if (!passwordData.current || !passwordData.new || !passwordData.confirm) {
      toast.info('Please fill all fields');
      return;
    }
    if (passwordData.new !== passwordData.confirm) {
      toast.error('New password and confirm password do not match');
      return;
    }
    if (passwordData.new.length < 6) {
      toast.info('Password must be at least 6 characters');
      return;
    }

    try {
      await changePassword({
        currentPassword: passwordData.current,
        newPassword: passwordData.new
      }).unwrap();

      toast.success('✅ Password changed successfully!');
      setShowPasswordModal(false);
      setPasswordData({ current: '', new: '', confirm: '' });
    } catch (err) {
      toast.error(err.data?.message || 'Failed to change password');
    }
  };

  const handle2FAToggle = () => {
    setTwoFA({ ...twoFA, enabled: !twoFA.enabled });
    toast.success(twoFA.enabled ? '✅ 2FA disabled' : '✅ 2FA enabled');
  };

  const handleNotificationToggle = async (key) => {
    const updatedSettings = { ...notificationSettings, [key]: !notificationSettings[key] };
    try {
      await updateProfile({
        notificationSettings: updatedSettings
      }).unwrap();
      setNotificationSettings(updatedSettings);
      toast.success('✅ Preference updated');
    } catch (err) {
      toast.error('Failed to update preference');
    }
  };

  const handleLanguageChange = async (lang) => {
    try {
      await updateProfile({ language: lang.name }).unwrap();
      setLanguage(lang.name);
      setShowLanguageModal(false);
      toast.success(`✅ Language changed to ${lang.name}`);
    } catch (err) {
      toast.error('Failed to update language');
    }
  };

  const handleThemeChange = async (newTheme) => {
    try {
      await updateProfile({ theme: newTheme }).unwrap();
      setTheme(newTheme);
      toast.success(`✅ Theme changed to ${newTheme}`);
    } catch (err) {
      toast.error('Failed to update theme');
    }
  };

  const handleExportData = () => {
    try {
      if (!profileResponse?.data) {
        toast.error("No data available to export");
        return;
      }

      const userData = profileResponse.data;
      const exportObject = {
        exportedAt: new Date().toISOString(),
        platform: "Acharya Ji Online",
        profile: {
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          address: userData.address,
          membership: userData.membershipType || 'Free Member',
          memberSince: userData.createdAt,
          walletBalance: userData.walletBalance || 0
        },
        preferences: {
          language: userData.language,
          theme: userData.theme,
          notifications: userData.notificationSettings
        },
        security: {
          loginHistory: userData.loginHistory?.map(h => ({
            device: h.device,
            location: h.location,
            timestamp: h.timestamp,
            ip: h.ip
          })) || []
        }
      };

      const blob = new Blob([JSON.stringify(exportObject, null, 2)], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Acharya_Ji_Profile_${userData.name.replace(/\s+/g, '_')}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success('✅ Profile data exported successfully!');
    } catch (err) {
      console.error(err);
      toast.error('Failed to export profile data');
    }
  };

  const handleLogoutAll = () => {
    toast.info('Logging out from all devices...');
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-2">
          <Loader className="w-8 h-8 text-amber-500 animate-spin" />
          <p className="text-amber-600 font-medium">Loading profile...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center max-w-md">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-800 mb-2">Failed to load profile</h2>
          <p className="text-gray-600 mb-6">There was an error fetching your profile details. Please try again later.</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-amber-500 text-white px-6 py-2 rounded-lg hover:bg-amber-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // ========== STATUS STYLING ==========
  const getStatusStyle = (isActive) => {
    const base = "px-2 py-0.5 rounded-full text-xs font-medium w-fit";
    return isActive ? `${base} bg-green-100 text-green-700` : `${base} bg-gray-100 text-gray-600`;
  };

  // Loading Spinner
  const LoadingSpinner = () => (
    <div className="animate-spin">
      <Loader className="w-4 h-4" />
    </div>
  );

  const t = (key) => getTranslation(language, key);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ========== HEADER ========== */}
      <div className="bg-gradient-to-r from-amber-100/50 via-amber-200/30 to-amber-300/40 px-3 py-1.5 border border-amber-200 mb-4">
        <div className="flex flex-row sm:flex-row sm:justify-between sm:items-center gap-12 sm:gap-2">
          <div className="text-left sm:text-left flex items-end gap-2">
            <div>
              <h1 className="text-lg sm:text-xl md:text-2xl lg:text-[25px] font-semibold text-amber-900 uppercase leading-tight flex items-center gap-2">
                <User className="w-[23px] h-[23px] text-amber-600" />
                {t('profile')}
              </h1>
              <p className="sm:hidden text-sm text-gray-600 mt-0.5">
                Manage your account
              </p>
            </div>
            <p className="hidden sm:block text-sm text-gray-600 mb-0.5">
              Personal information • Security • Preferences
            </p>
          </div>

          {/* Edit/Save Button */}
          <div className="flex gap-1">
            <button
              onClick={isEditing ? handleSaveProfile : handleEditToggle}
              className={`
                px-4 py-1.5 text-sm font-medium rounded-md transition-all capitalize cursor-pointer
                ${isEditing
                  ? 'bg-green-500 text-white hover:bg-green-600'
                  : 'bg-amber-500 text-white hover:bg-amber-600'
                }
              `}
            >
              {isEditing ? (
                <span className="flex items-center gap-1">
                  <Save className="w-4 h-4" />
                  {t('save_changes')}
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  <Edit2 className="w-4 h-4" />
                  {t('edit_profile')}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ========== MAIN CONTENT ========== */}
      <div className="space-y-4 px-6 pb-6 pt-2">

        {/* ========== A) PERSONAL INFORMATION ========== */}
        <div className="bg-white rounded-lg border border-gray-200 hover:border-amber-300 transition-colors p-4">
          <h3 className="text-[15px] font-bold text-gray-800 mb-3 flex items-center gap-2">
            <User className="w-4 h-4 text-amber-600" />
            {t('personal_info')}
          </h3>

          <div className="flex flex-col sm:flex-row gap-4">
            {/* Profile Photo */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="w-24 h-24 bg-amber-50 rounded-lg flex items-center justify-center border-2 border-amber-200 overflow-hidden">
                  {profile.photo ? (
                    <img src={profile.photo} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-12 h-12 text-amber-600" />
                  )}
                  {isUploadingAvatar && (
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <Loader className="w-6 h-6 text-white animate-spin" />
                    </div>
                  )}
                </div>
                <label
                  htmlFor="avatar-upload"
                  className="absolute -bottom-1 -right-1 p-1.5 bg-amber-500 rounded-lg text-white hover:bg-amber-600 transition-colors cursor-pointer shadow-sm"
                >
                  <Camera className="w-4 h-4" />
                </label>
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">{t('member_since')} {profile.memberSince}</p>
            </div>

            {/* Personal Details */}
            <div className="flex-1">
              {isEditing ? (
                // EDIT MODE
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={editForm.fullName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-amber-300 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={editForm.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-amber-300 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={editForm.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-amber-300 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Address</label>
                    <textarea
                      name="address"
                      value={editForm.address}
                      onChange={handleInputChange}
                      rows="2"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-amber-300 text-sm resize-none"
                    />
                  </div>
                </div>
              ) : (
                // VIEW MODE
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-amber-500" />
                    <span className="text-sm text-gray-800">{profile.fullName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-amber-500" />
                    <span className="text-sm text-gray-600">{profile.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-amber-500" />
                    <span className="text-sm text-gray-600">{profile.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-amber-500" />
                    <span className="text-sm text-gray-600">{profile.address}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Stats */}
            <div className="bg-amber-50 rounded-lg p-3 min-w-[120px]">
              <Clock className="w-4 h-4 text-amber-600 mb-1" />
              <p className="text-xs text-amber-600">{t('last_login')}</p>
              <p className="text-sm font-bold text-amber-700 mt-1 leading-tight">{profile.lastLogin}</p>
            </div>
          </div>
        </div>

        {/* ========== B) SECURITY SETTINGS ========== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Change Password */}
          <div className="bg-white rounded-lg border border-gray-200 hover:border-amber-300 transition-colors p-3">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-[15px] font-bold text-gray-800 flex items-center gap-2">
                <Lock className="w-4 h-4 text-amber-600" />
                {t('change_password')}
              </h3>
              <button
                onClick={() => setShowPasswordModal(true)}
                className="text-xs text-amber-600 hover:text-amber-700 font-medium"
              >
                Update
              </button>
            </div>
            <p className="text-xs text-gray-500">Last changed: 3 months ago</p>
            <div className="mt-2 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
              <div className="h-1 w-3/4 bg-amber-400 rounded-full"></div>
            </div>
          </div>

          {/* Two-factor Authentication */}
          <div className="bg-white rounded-lg border border-gray-200 hover:border-amber-300 transition-colors p-3">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-[15px] font-bold text-gray-800 flex items-center gap-2">
                <Shield className="w-4 h-4 text-amber-600" />
                {t('two_fa')}
              </h3>
              <button
                onClick={() => setShow2FAModal(true)}
                className="text-xs text-amber-600 hover:text-amber-700 font-medium"
              >
                Configure
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-600">Status</span>
              <span className={twoFA.enabled ? 'text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full' : 'text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full'}>
                {twoFA.enabled ? 'Enabled' : 'Disabled'}
              </span>
            </div>
          </div>

          {/* Login Activity */}
          <div className="bg-white rounded-lg border border-gray-200 hover:border-amber-300 transition-colors p-3">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-[15px] font-bold text-gray-800 flex items-center gap-2">
                <LogIn className="w-4 h-4 text-amber-600" />
                {t('login_activity')}
              </h3>
              <button
                onClick={() => setShowAllLogins(!showAllLogins)}
                className="text-xs text-amber-600 hover:text-amber-700 font-medium"
              >
                {showAllLogins ? 'Show Less' : 'View All'}
              </button>
            </div>
            <p className="text-xs text-gray-600">Current session: {loginActivity.length > 0 ? loginActivity[0].device : 'Searching...'}</p>
          </div>
        </div>

        {/* Login Activity List */}
        <div className="bg-white rounded-lg border border-gray-200 hover:border-amber-300 transition-colors p-3">
          <h3 className="text-[15px] font-bold text-gray-800 mb-2 flex items-center gap-2">
            <LogIn className="w-4 h-4 text-amber-600" />
            {t('recent_login')}
          </h3>
          <div className="space-y-2">
            {loginActivity.length > 0 ? (
              (showAllLogins ? loginActivity : loginActivity.slice(0, 5)).map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    {activity.device?.includes('iPhone') || activity.device?.includes('Mobile') ? (
                      <Smartphone className="w-3 h-3 text-gray-500" />
                    ) : (
                      <Monitor className="w-3 h-3 text-gray-500" />
                    )}
                    <div>
                      <p className="text-xs font-medium text-gray-800">{activity.device}</p>
                      <p className="text-xs text-gray-500">{activity.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">{activity.time}</span>
                    {activity.current && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Current</span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-gray-500 py-4 text-center">No recent login activity found.</p>
            )}
          </div>
          <div className="flex items-center justify-between mt-2">
            <button
              onClick={handleLogoutAll}
              className="text-xs text-red-600 hover:text-red-700 font-medium"
            >
              {t('logout_all')}
            </button>
            {loginActivity.length > 5 && (
              <button
                onClick={() => setShowAllLogins(!showAllLogins)}
                className="text-xs text-amber-600 hover:text-amber-700 font-medium"
              >
                {showAllLogins ? `Show Less` : `View All Activity (${loginActivity.length})`}
              </button>
            )}
          </div>
        </div>

        {/* ========== C) PREFERENCES ========== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Notification Settings */}
          <div className="bg-white rounded-lg border border-gray-200 hover:border-amber-300 transition-colors p-3">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-[15px] font-bold text-gray-800 flex items-center gap-2">
                <Bell className="w-4 h-4 text-amber-600" />
                {t('notifications')}
              </h3>
              <button
                onClick={() => setShowNotificationModal(true)}
                className="text-xs text-amber-600 hover:text-amber-700 font-medium"
              >
                Manage
              </button>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">Email</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${notificationSettings.emailNotifications ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                  {notificationSettings.emailNotifications ? 'On' : 'Off'}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">SMS</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${notificationSettings.smsNotifications ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                  {notificationSettings.smsNotifications ? 'On' : 'Off'}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">WhatsApp</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${notificationSettings.whatsAppUpdates ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                  {notificationSettings.whatsAppUpdates ? 'On' : 'Off'}
                </span>
              </div>
            </div>
          </div>

          {/* Language */}
          <div className="bg-white rounded-lg border border-gray-200 hover:border-amber-300 transition-colors p-3">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-[15px] font-bold text-gray-800 flex items-center gap-2">
                <Globe className="w-4 h-4 text-amber-600" />
                {t('language')}
              </h3>
              <button
                onClick={() => setShowLanguageModal(true)}
                className="text-xs text-amber-600 hover:text-amber-700 font-medium"
              >
                Change
              </button>
            </div>
            <p className="text-sm text-gray-800">{language}</p>
          </div>

          {/* Theme */}
          <div className="bg-white rounded-lg border border-gray-200 hover:border-amber-300 transition-colors p-3">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-[15px] font-bold text-gray-800 flex items-center gap-2">
                {theme === 'light' ? <Sun className="w-4 h-4 text-amber-600" /> : <Moon className="w-4 h-4 text-amber-600" />}
                {t('theme')}
              </h3>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleThemeChange('light')}
                className={`flex-1 px-2 py-1 text-xs rounded-lg flex items-center justify-center gap-1 ${theme === 'light' ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
              >
                <Sun className="w-3 h-3" />
                Light
              </button>
              <button
                onClick={() => handleThemeChange('dark')}
                className={`flex-1 px-2 py-1 text-xs rounded-lg flex items-center justify-center gap-1 ${theme === 'dark' ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
              >
                <Moon className="w-3 h-3" />
                Dark
              </button>
              <button
                onClick={() => handleThemeChange('system')}
                className={`flex-1 px-2 py-1 text-xs rounded-lg flex items-center justify-center gap-1 ${theme === 'system' ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
              >
                System
              </button>
            </div>
          </div>
        </div>

        {/* ========== PROFILE SUMMARY FOOTER ========== */}
        <div className="bg-gradient-to-r from-amber-100/50 via-amber-200/30 to-amber-300/40 rounded-lg border border-amber-200 p-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-amber-600" />
              <div>
                <h4 className="text-xs font-semibold text-gray-800">Profile Summary</h4>
                <p className="text-xs text-gray-600">
                  Member since {profile.memberSince} • Last login: {profile.lastLogin}
                </p>
              </div>
            </div>

            <button
              className="px-3 py-1.5 text-xs bg-white text-gray-800 rounded-lg border border-gray-300 hover:bg-gray-50 flex items-center gap-1 cursor-pointer transition-colors"
              onClick={handleExportData}
            >
              <Save className="w-3 h-3" />
              {t('export_data')}
            </button>
          </div>
        </div>
      </div>

      {/* ========== CHANGE PASSWORD MODAL ========== */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl max-w-md w-full p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-800">Change Password</h3>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 mb-4">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Current Password</label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? 'text' : 'password'}
                    value={passwordData.current}
                    onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-amber-300 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-2 top-2 text-gray-400"
                  >
                    {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">New Password</label>
                <div className="relative">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    value={passwordData.new}
                    onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-amber-300 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-2 top-2 text-gray-400"
                  >
                    {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Confirm New Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={passwordData.confirm}
                    onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-amber-300 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-2 top-2 text-gray-400"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handlePasswordChange}
                className="flex-1 bg-amber-500 text-white py-2 rounded-lg hover:bg-amber-600"
              >
                Update Password
              </button>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========== 2FA MODAL ========== */}
      {show2FAModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl max-w-md w-full p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-800">Two-Factor Authentication</h3>
              <button
                onClick={() => setShow2FAModal(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-amber-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-800">Enable 2FA</p>
                    <p className="text-xs text-gray-500">Protect your account with extra security</p>
                  </div>
                </div>
                <button
                  onClick={handle2FAToggle}
                  className={`px-3 py-1 text-xs rounded-full ${twoFA.enabled ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'
                    }`}
                >
                  {twoFA.enabled ? 'Enabled' : 'Disabled'}
                </button>
              </div>

              <div>
                <label className="block text-xs text-gray-600 mb-2">Authentication Method</label>
                <div className="space-y-2">
                  <button
                    onClick={() => setTwoFA({ ...twoFA, method: 'app' })}
                    className={`w-full p-2 text-left rounded-lg flex items-center gap-2 ${twoFA.method === 'app' ? 'bg-amber-50 border border-amber-200' : 'hover:bg-gray-50'
                      }`}
                  >
                    <Smartphone className="w-4 h-4 text-amber-600" />
                    <span className="text-sm text-gray-800">Authenticator App</span>
                  </button>
                  <button
                    onClick={() => setTwoFA({ ...twoFA, method: 'sms' })}
                    className={`w-full p-2 text-left rounded-lg flex items-center gap-2 ${twoFA.method === 'sms' ? 'bg-amber-50 border border-amber-200' : 'hover:bg-gray-50'
                      }`}
                  >
                    <Phone className="w-4 h-4 text-amber-600" />
                    <span className="text-sm text-gray-800">SMS Authentication</span>
                  </button>
                  <button
                    onClick={() => setTwoFA({ ...twoFA, method: 'email' })}
                    className={`w-full p-2 text-left rounded-lg flex items-center gap-2 ${twoFA.method === 'email' ? 'bg-amber-50 border border-amber-200' : 'hover:bg-gray-50'
                      }`}
                  >
                    <Mail className="w-4 h-4 text-amber-600" />
                    <span className="text-sm text-gray-800">Email Authentication</span>
                  </button>
                </div>
              </div>

              <button
                onClick={() => setShow2FAModal(false)}
                className="w-full bg-amber-500 text-white py-2 rounded-lg hover:bg-amber-600"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========== NOTIFICATION SETTINGS MODAL ========== */}
      {showNotificationModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl max-w-md w-full p-5 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-800">Notification Settings</h3>
              <button
                onClick={() => setShowNotificationModal(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-800">Email Notifications</p>
                  <p className="text-xs text-gray-500">Receive updates via email</p>
                </div>
                <button
                  onClick={() => handleNotificationToggle('emailNotifications')}
                  className={`px-3 py-1 text-xs rounded-full ${notificationSettings.emailNotifications ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                    }`}
                >
                  {notificationSettings.emailNotifications ? 'On' : 'Off'}
                </button>
              </div>

              <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-800">SMS Notifications</p>
                  <p className="text-xs text-gray-500">Receive updates via SMS</p>
                </div>
                <button
                  onClick={() => handleNotificationToggle('smsNotifications')}
                  className={`px-3 py-1 text-xs rounded-full ${notificationSettings.smsNotifications ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                    }`}
                >
                  {notificationSettings.smsNotifications ? 'On' : 'Off'}
                </button>
              </div>

              <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-800">WhatsApp Updates</p>
                  <p className="text-xs text-gray-500">Receive updates on WhatsApp</p>
                </div>
                <button
                  onClick={() => handleNotificationToggle('whatsAppUpdates')}
                  className={`px-3 py-1 text-xs rounded-full ${notificationSettings.whatsAppUpdates ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                    }`}
                >
                  {notificationSettings.whatsAppUpdates ? 'On' : 'Off'}
                </button>
              </div>

              <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-800">Promotional Emails</p>
                  <p className="text-xs text-gray-500">Receive offers and discounts</p>
                </div>
                <button
                  onClick={() => handleNotificationToggle('promotionalEmails')}
                  className={`px-3 py-1 text-xs rounded-full ${notificationSettings.promotionalEmails ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                    }`}
                >
                  {notificationSettings.promotionalEmails ? 'On' : 'Off'}
                </button>
              </div>

              <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-800">Booking Reminders</p>
                  <p className="text-xs text-gray-500">Get reminders for upcoming bookings</p>
                </div>
                <button
                  onClick={() => handleNotificationToggle('bookingReminders')}
                  className={`px-3 py-1 text-xs rounded-full ${notificationSettings.bookingReminders ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                    }`}
                >
                  {notificationSettings.bookingReminders ? 'On' : 'Off'}
                </button>
              </div>

              <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-800">Payment Alerts</p>
                  <p className="text-xs text-gray-500">Get alerts for payment status</p>
                </div>
                <button
                  onClick={() => handleNotificationToggle('paymentAlerts')}
                  className={`px-3 py-1 text-xs rounded-full ${notificationSettings.paymentAlerts ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                    }`}
                >
                  {notificationSettings.paymentAlerts ? 'On' : 'Off'}
                </button>
              </div>

              <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-800">Newsletter</p>
                  <p className="text-xs text-gray-500">Weekly spiritual newsletter</p>
                </div>
                <button
                  onClick={() => handleNotificationToggle('newsletter')}
                  className={`px-3 py-1 text-xs rounded-full ${notificationSettings.newsletter ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                    }`}
                >
                  {notificationSettings.newsletter ? 'On' : 'Off'}
                </button>
              </div>
            </div>

            <button
              onClick={() => setShowNotificationModal(false)}
              className="w-full bg-amber-500 text-white py-2 rounded-lg hover:bg-amber-600 mt-4"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* ========== LANGUAGE MODAL ========== */}
      {showLanguageModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl max-w-md w-full p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-800">Select Language</h3>
              <button
                onClick={() => setShowLanguageModal(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {languages.map((lang) => (
                <button
                  key={lang.id}
                  onClick={() => handleLanguageChange(lang)}
                  className={`w-full p-3 text-left rounded-lg hover:bg-amber-50 transition-colors flex items-center justify-between ${language === lang.name ? 'bg-amber-50 border border-amber-200' : ''
                    }`}
                >
                  <div>
                    <p className="text-sm font-medium text-gray-800">{lang.name}</p>
                    <p className="text-xs text-gray-500">{lang.native}</p>
                  </div>
                  {language === lang.name && (
                    <CheckCircle className="w-4 h-4 text-amber-600" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;