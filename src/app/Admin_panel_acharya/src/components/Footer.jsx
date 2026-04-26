import React from "react";
import { FiHeart } from "react-icons/fi";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#f7f6f5] border-t border-[#e3e1e0] py-3 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4">

        {/* Left Section - Copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
          <p className="text-xs sm:text-sm text-gray-500">
            © {currentYear} <span className="font-medium text-gray-700">Admin Panel</span>
          </p>
          <span className="hidden sm:inline text-gray-300">•</span>
          <p className="text-xs sm:text-sm text-gray-500">
            All rights reserved
          </p>
        </div>

        {/* Center Section - Made with love */}
        <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-500">
          <span>Made with</span>
          <FiHeart className="text-red-500 mx-1" size={14} />
          <span>by Your Team</span>
        </div>

        {/* Right Section - Links & Version */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="#"
            className="text-xs text-gray-500 hover:text-gray-900 transition-colors"
          >
            About
          </a>
          <span className="text-gray-300">|</span>
          <a
            href="#"
            className="text-xs text-gray-500 hover:text-gray-900 transition-colors"
          >
            Support
          </a>
          <span className="text-gray-300">|</span>
          <a
            href="#"
            className="text-xs text-gray-500 hover:text-gray-900 transition-colors"
          >
            Privacy
          </a>
          <span className="text-gray-300">|</span>
          <span className="text-xs text-gray-400 font-mono">
            v2.1.0
          </span>
        </div>
      </div>



    </footer>
  );
};

export default Footer;
