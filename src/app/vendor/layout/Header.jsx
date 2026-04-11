import React, { useState } from 'react';
import { 
  Bell, Circle, MessageSquare, Menu, User, Wallet, Settings, 
  HelpCircle, LogOut, ChevronDown, CreditCard, Shield, 
  FileText, Globe, Smartphone, Mail, Key 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const Header = ({ toggleSidebar }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  // Get user initials
  const getInitials = (name) => {
    if (!name) return "AS";
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const userName = user?.name || "Acharya Sharma";
  const userInitials = getInitials(userName);
  const vendorType = user?.vendorType || "Pandit";

  const handleLogout = () => {
    logout();
    navigate("/vendor/login");
  };

  // Category-based dropdown sections
  const dropdownSections = [
    {
      id: 'profile',
      title: 'Profile',
      icon: <User className="h-4 w-4 text-amber-400" />,
      items: [
        { label: 'My Profile', icon: <User className="h-4 w-4" />, onClick: () => navigate('/vendor/dashboard/settings') },
        { label: 'Edit Profile', icon: <Settings className="h-4 w-4" />, onClick: () => console.log('Edit Profile') },
        { label: 'Change Avatar', icon: <User className="h-4 w-4" />, onClick: () => console.log('Change Avatar') },
      ]
    },
    {
      id: 'wallet',
      title: 'Wallet & Payments',
      icon: <Wallet className="h-4 w-4 text-green-400" />,
      items: [
        { label: 'Wallet Balance', icon: <Wallet className="h-4 w-4" />, onClick: () => navigate('/vendor/dashboard/wallet') },
        { label: 'Transactions', icon: <CreditCard className="h-4 w-4" />, onClick: () => console.log('Transactions') },
        { label: 'Withdraw Funds', icon: <Wallet className="h-4 w-4" />, onClick: () => console.log('Withdraw') },
        { label: 'Payment Methods', icon: <CreditCard className="h-4 w-4" />, onClick: () => console.log('Payment Methods') },
      ]
    },
    {
      id: 'account',
      title: 'Account Settings',
      icon: <Settings className="h-4 w-4 text-blue-400" />,
      items: [
        { label: 'Security', icon: <Shield className="h-4 w-4" />, onClick: () => console.log('Security') },
        { label: 'Notifications', icon: <Bell className="h-4 w-4" />, onClick: () => navigate('/vendor/dashboard/notifications') },
        { label: 'Privacy', icon: <FileText className="h-4 w-4" />, onClick: () => console.log('Privacy') },
        { label: 'Language', icon: <Globe className="h-4 w-4" />, onClick: () => console.log('Language') },
      ]
    },
    {
      id: 'support',
      title: 'Help & Support',
      icon: <HelpCircle className="h-4 w-4 text-purple-400" />,
      items: [
        { label: 'Help Center', icon: <HelpCircle className="h-4 w-4" />, onClick: () => console.log('Help Center') },
        { label: 'Contact Support', icon: <Smartphone className="h-4 w-4" />, onClick: () => console.log('Contact') },
        { label: 'FAQs', icon: <FileText className="h-4 w-4" />, onClick: () => console.log('FAQs') },
        { label: 'Report Issue', icon: <Mail className="h-4 w-4" />, onClick: () => console.log('Report') },
      ]
    },
  ];

  const toggleSection = (sectionId) => {
    setActiveSection(activeSection === sectionId ? null : sectionId);
  };

  const renderMobileDropdown = () => (
    <div className="absolute right-0 top-full mt-2 w-80 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl z-50 overflow-y-auto max-h-[80vh]">
      {/* Profile Header */}
      <div className="p-4 bg-gradient-to-r from-gray-900 to-gray-800 border-b border-gray-700 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="h-14 w-14 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
              <span className="text-white font-bold text-lg">{userInitials}</span>
            </div>
            <div className="absolute -bottom-1 -right-1 h-5 w-5 bg-green-500 rounded-full border-2 border-gray-800"></div>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-white text-sm">{userName}</h3>
            <p className="text-xs text-orange-300">{vendorType} • Verified</p>
          </div>
        </div>
      </div>

      {/* Balance Display */}
      <div className="p-3 bg-gradient-to-r from-gray-900/50 to-gray-800/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wallet className="h-4 w-4 text-green-400" />
            <span className="text-sm text-gray-300">Wallet Balance</span>
          </div>
          <span className="text-lg font-bold text-green-400">₹5,250</span>
        </div>
      </div>

      {/* Category Sections */}
      <div className="p-2 space-y-1">
        {dropdownSections.map((section) => (
          <div key={section.id} className="border border-gray-700 rounded-lg overflow-hidden">
            {/* Section Header */}
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full flex items-center justify-between px-3 py-3 bg-gray-900 hover:bg-gray-800 transition-colors"
            >
              <div className="flex items-center gap-3">
                {section.icon}
                <span className="text-sm font-medium text-gray-200">{section.title}</span>
              </div>
              <ChevronDown 
                className={`h-4 w-4 text-gray-400 transition-transform ${
                  activeSection === section.id ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Section Items - Animated */}
            {activeSection === section.id && (
              <div className="bg-gray-900/50">
                {section.items.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      item.onClick();
                      setIsProfileOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-gray-800 text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    <div className="h-8 w-8 rounded-lg bg-gray-800 flex items-center justify-center">
                      {item.icon}
                    </div>
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Divider */}
        <div className="my-2 h-px bg-gray-700"></div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-red-500/10 text-red-400 hover:text-red-300 transition-colors text-sm"
        >
          <div className="h-8 w-8 rounded-lg bg-red-900/20 flex items-center justify-center">
            <LogOut className="h-4 w-4" />
          </div>
          <span>Logout</span>
        </button>
      </div>

      {/* Footer */}
      <div className="px-4 py-3 bg-gray-900 border-t border-gray-700">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Status: <span className="text-green-400">Active</span></span>
          <span>v2.1.4</span>
        </div>
      </div>
    </div>
  );

  const renderDesktopDropdown = () => (
    <div className="absolute right-0 top-full mt-2 w-72 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl z-50">
      {/* Profile Header */}
      <div className="p-4 bg-gradient-to-r from-gray-900 to-gray-800 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
              <span className="text-white font-bold text-lg">{userInitials}</span>
            </div>
            <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-gray-800"></div>
          </div>
          <div>
            <h3 className="font-semibold text-white text-sm">{userName}</h3>
            <p className="text-xs text-orange-300">{vendorType}</p>
          </div>
        </div>
      </div>

      {/* Balance Display */}
      <div className="p-3 bg-gradient-to-r from-gray-900/50 to-gray-800/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wallet className="h-4 w-4 text-green-400" />
            <span className="text-sm text-gray-300">Wallet Balance</span>
          </div>
          <span className="text-lg font-bold text-green-400">₹5,250</span>
        </div>
      </div>

      {/* Category Sections */}
      <div className="p-2 space-y-1 max-h-[400px] overflow-y-auto">
        {dropdownSections.map((section) => (
          <div key={section.id} className="mb-1">
            {/* Section Header */}
            <div className="px-2 py-1">
              <div className="flex items-center gap-2">
                {section.icon}
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {section.title}
                </span>
              </div>
            </div>

            {/* Section Items */}
            {section.items.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  item.onClick();
                  setIsProfileOpen(false);
                }}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-700 text-gray-300 hover:text-white transition-colors text-sm"
              >
                <div className="h-7 w-7 rounded-lg bg-gray-800 flex items-center justify-center">
                  {item.icon}
                </div>
                <span>{item.label}</span>
              </button>
            ))}
            
            {section.id !== 'support' && (
              <div className="mx-2 my-1 h-px bg-gray-700"></div>
            )}
          </div>
        ))}

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-red-500/10 text-red-400 hover:text-red-300 transition-colors text-sm mt-2"
        >
          <div className="h-7 w-7 rounded-lg bg-red-900/20 flex items-center justify-center">
            <LogOut className="h-4 w-4" />
          </div>
          <span>Logout</span>
        </button>
      </div>

      {/* Footer */}
      <div className="px-4 py-2 bg-gray-900 border-t border-gray-700">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Account: <span className="text-green-400">Active</span></span>
          <span>v2.1.4</span>
        </div>
      </div>
    </div>
  );

  return (
    <header className="sticky top-0 z-50 bg-gray-950 border-b border-gray-200 shadow-xl px-3 py-1.5 sm:px-4 sm:py-1.5">
      <div className="flex items-center justify-between">
        {/* Left side */}
        <div className='flex items-center gap-1 sm:gap-2 flex-1 min-w-0'>
          <button 
            onClick={toggleSidebar}
            className="lg:hidden p-1.5 rounded-md text-amber-300 hover:bg-gray-800 mr-2 flex-shrink-0"
            aria-label="Toggle menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          
          <div className="flex items-center gap-2 sm:hidden min-w-0">
            <div className="h-7 w-7 rounded-full bg-gradient-to-br from-white to-gray-100 flex items-center justify-center text-amber-800 text-xs font-bold border border-amber-300">
              {userInitials}
            </div>
            <div className="min-w-0">
              <h1 className="text-sm font-semibold text-amber-300 truncate">
                {userName}
              </h1>
              <div className="flex items-center gap-1 mt-0.5">
                <Circle className="h-1.5 w-1.5 text-green-500 fill-green-500 animate-pulse" />
                <span className="text-[10px] text-green-400">Online</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <div className="relative">
            <button className="p-1 sm:p-1.5 hover:bg-orange-200 rounded-lg hover:text-gray-900">
              <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-white hover:text-gray-900" />
              <span className="absolute -top-0.5 -right-0.5 h-3 w-3 sm:h-[16px] sm:w-[16px] bg-red-500 text-[8px] sm:text-[10px] text-white rounded-full flex items-center justify-center">
                3
              </span>
            </button>
          </div>

          <div className='hidden sm:block px-1'>
            <span className='text-white text-lg sm:text-2xl font-normal'>|</span>
          </div>
          
          <div className='relative'>
            <button className='p-1 sm:p-1.5  rounded-lg hover:bg-orange-200 hover:text-gray-900'>
              <MessageSquare className='w-4 h-4 sm:w-5 sm:h-5 text-white hover:text-gray-900' />
              <span className="absolute -top-0.5 -right-1.5 h-2.5 w-2.5 sm:h-[16px] sm:w-[16px] bg-red-500 text-[8px] sm:text-[10px] text-white rounded-full flex items-center justify-center">
                3
              </span>
            </button>
          </div>

          {/* MOBILE: Profile Dropdown */}
          <div className="sm:hidden relative">
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="p-1 rounded-lg hover:bg-gray-800"
            >
              <div className="h-7 w-7 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-xs font-bold border border-orange-300">
                {userInitials}
              </div>
            </button>

            {isProfileOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setIsProfileOpen(false)}
                />
                {renderMobileDropdown()}
              </>
            )}
          </div>

          {/* DESKTOP: Profile Dropdown */}
          <div className="hidden sm:flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Circle className="h-2 w-2 text-green-500 fill-green-500 animate-pulse" />
              <span className="text-xs text-green-400 font-medium">Online</span>
            </div>
            
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-1 p-1 rounded-lg hover:bg-gray-800 group"
              >
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-sm font-bold border border-orange-300 group-hover:scale-105">
                  {userInitials}
                </div>
                <ChevronDown className={`h-4 w-4 text-gray-400 ${isProfileOpen ? 'rotate-180' : ''}`} />
              </button>

              {isProfileOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setIsProfileOpen(false)}
                  />
                  {renderDesktopDropdown()}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;