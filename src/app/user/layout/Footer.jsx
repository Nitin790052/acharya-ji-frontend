import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-gray-200 py-2 px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm text-gray-500">
        {/* Copyright */}
        <div>
          © {currentYear} Acharya Ji Online • All Rights Reserved
        </div>

        {/* Links */}
        <div className="flex gap-3 mt-2 sm:mt-0">
          <Link to="/privacy" className="hover:text-orange-600 transition-colors">
            Privacy
          </Link>
          <span>•</span>
          <Link to="/terms" className="hover:text-orange-600 transition-colors">
            Terms
          </Link>
          <span>•</span>
          <Link to="/support" className="hover:text-orange-600 transition-colors">
            Support
          </Link>
        </div>
      </div>
      
     
    </footer>
  );
};

export default Footer;