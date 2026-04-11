import React from 'react';
import { Heart, Shield, FileText, HelpCircle, ExternalLink } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto">
        {/* Mobile Layout (Stacked) */}
   {/* Mobile Layout (Ultra Compact) */}
<div className="lg:hidden">

  <div className="p-3 ">

    {/* Top row : Logo + Links together */}
    <div className="flex items-center justify-between">

      {/* Logo */}
      <div className="flex items-center gap-1">
        <div className="h-5 w-5 bg-gradient-to-br from-orange-500 to-amber-600 rounded-md flex items-center justify-center">
          <img src="/logo.png" alt="" className="w-2.5 h-2.5" />
        </div>
        <span className="font-medium text-gray-900 text-[11px]">
          Acharya Ji
        </span>
      </div>

      {/* Links inline (big height saving) */}
      <div className="flex items-center gap-3 text-[10px] text-gray-500">

        <a className="flex items-center gap-1 hover:text-orange-600">
          <Shield size={9} /> Privacy
        </a>

        <a className="flex items-center gap-1 hover:text-orange-600">
          <FileText size={9} /> Terms
        </a>

        <a className="flex items-center gap-1 hover:text-orange-600">
          <HelpCircle size={9} /> Help
        </a>

      </div>
    </div>

    {/* Bottom line */}
    <div className="flex items-center justify-center gap-1 text-[9px] text-gray-400 mt-0.5 border-t border-gray-100 pt-0.5">
      <span>© 2026</span>
      <span>•</span>
      <Heart size={7} className="text-red-500 fill-red-500" />
      <span>India</span>
      <span>•</span>
      <span>v2.1.4</span>
    </div>

  </div>
</div>


        {/* Desktop Layout (Horizontal) */}
        <div className="hidden lg:block">
          <div className="px-6 py-2">
            <div className="flex items-center justify-between">
              {/* Left side */}
              <div className="flex items-center gap-6">
               
                
                <p className="text-sm text-gray-500">
                  © 2026 All rights reserved.
                </p>
              </div>

              {/* Right side */}
              <div className="flex items-center gap-6">
                <a 
                  href="#" 
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-orange-600 transition-colors"
                >
                  <Shield size={14} />
                  <span>Privacy Policy</span>
                </a>
                
                <a 
                  href="#" 
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-orange-600 transition-colors"
                >
                  <FileText size={14} />
                  <span>Terms of Service</span>
                </a>
                
                <a 
                  href="#" 
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-orange-600 transition-colors"
                >
                  <HelpCircle size={14} />
                  <span>Help Center</span>
                </a>
                
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;