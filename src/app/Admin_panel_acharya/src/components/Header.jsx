import React, { useState } from "react";
import {
  FiMenu,
  FiBell,
  FiUser,
  FiChevronLeft,
  FiChevronRight,
  FiSettings,
  FiLogOut,
  FiHelpCircle,
  FiMail
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const Header = ({ toggleSidebar, sidebarOpen, isCollapsed, toggleCollapse, isMobile }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [notifications] = useState(3);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const theme = {
    primary: "#1e3a8a",
    secondary: "#959190",
    bg: "#ffffff",
    hover: "#e3e1e0",
    text: "#4D4441",
    ring: "#ffffff",
    gradient: "from-blue-900 to-[#959190]"
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header
      className="sticky top-0 z-30 shadow-sm w-full"
      style={{ backgroundColor: theme.bg }}
    >
      <div className="px-4 py-1 flex items-center justify-between">

        {/* Left Section */}
        <div className="flex items-center gap-3">

          {/* Mobile Menu Button - FIXED */}
          {isMobile && (
            <button
              onClick={toggleSidebar}  // ✅ FIXED: Using toggleSidebar function
              className="p-2 hover:bg-white/60 rounded-lg transition-all"
              style={{ color: theme.primary }}
              aria-label="Toggle Sidebar"
            >
              <FiMenu size={22} />
            </button>
          )}

          {/* Desktop Collapse Button */}
          {!isMobile && (
            <button
              onClick={toggleCollapse}
              className="p-1.5 hover:bg-white/60 rounded-lg transition-all border"
              style={{
                color: "#1e3a8a",
                borderColor: `${theme.primary}20`
              }}
              aria-label={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              {isCollapsed ? <FiChevronRight size={20} /> : <FiChevronLeft size={20} />}
            </button>
          )}

        </div>

        {/* Right Section - Icons and Profile */}
        <div className="flex items-center gap-2 sm:gap-3">

          {/* Messages Icon */}
          <button
            className="relative p-2 hover:bg-white/60 rounded-lg transition-all cursor-pointer"
            style={{ color: theme.primary }}
            aria-label="Messages"
          >
            <FiMail size={20} />
            <span
              className="absolute -top-1 -right-2 w-5 h-5 text-xs flex items-center justify-center rounded-full ring-2 font-medium"
              style={{
                backgroundColor: theme.primary,
                color: 'white',
                ringColor: theme.ring
              }}
            >4</span>
          </button>

          {/* Notifications Icon */}
          <button
            className="relative p-2 hover:bg-white/60 rounded-lg transition-all cursor-pointer"
            style={{ color: theme.primary }}
            aria-label="Notifications"
          >
            <FiBell size={20} />
            {notifications > 0 && (
              <span
                className="absolute -top-1 -right-1 w-5 h-5 text-xs flex items-center justify-center rounded-full ring-2 font-medium"
                style={{
                  backgroundColor: theme.primary,
                  color: 'white',
                  ringColor: theme.ring
                }}
              >
                {notifications}
              </span>
            )}
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 sm:gap-3 p-1 sm:p-1.5 pl-2 sm:pl-3 hover:bg-white/60 rounded-lg transition-all group"
              aria-label="Profile menu"
            >
              <div className="text-right hidden sm:block">
                <p
                  className="text-xs sm:text-sm transition-colors"
                  style={{ color: `${theme.primary}90` }}
                >
                  Admin
                </p>
                <p
                  className="text-xs sm:text-sm font-medium transition-colors"
                  style={{ color: theme.text }}
                >
                  John Doe
                </p>
              </div>

              <div
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shadow-md"
                style={{
                  background: `linear-gradient(to bottom right, ${theme.primary}, ${theme.secondary})`,
                  color: 'white'
                }}
              >
                <FiUser size={16} />
              </div>
            </button>

            {/* Dropdown Menu */}
            {isProfileOpen && (
              <>
                {/* Backdrop for closing dropdown */}
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsProfileOpen(false)}
                />

                {/* Dropdown Panel */}
                <div
                  className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border py-2 z-50"
                  style={{ borderColor: `${theme.primary}20` }}
                >
                  {/* User Info */}
                  <div className="px-4 py-2 border-b" style={{ borderColor: `${theme.primary}10` }}>
                    <p className="text-sm font-medium text-gray-900">John Doe</p>
                    <p className="text-xs text-gray-500">john@example.com</p>
                  </div>

                  {/* Menu Items */}
                  <button
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-white transition-all"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = theme.primary;
                      e.currentTarget.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = '#4b5563';
                    }}
                  >
                    <FiUser size={14} />
                    Profile
                  </button>

                  <button
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-white transition-all"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = theme.primary;
                      e.currentTarget.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = '#4b5563';
                    }}
                  >
                    <FiSettings size={14} />
                    Settings
                  </button>

                  <button
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-white transition-all"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = theme.primary;
                      e.currentTarget.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = '#4b5563';
                    }}
                  >
                    <FiHelpCircle size={14} />
                    Help
                  </button>

                  <hr className="my-2" style={{ borderColor: `${theme.primary}10` }} />

                  <button
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-all"
                    onClick={handleLogout}
                  >
                    <FiLogOut size={14} />
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;