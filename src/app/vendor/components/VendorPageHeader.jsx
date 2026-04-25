import React from 'react';
import { RefreshCw, FileText } from 'lucide-react';

const VendorPageHeader = ({ title, subtitle }) => {
  return (
    <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 px-3 py-1.5 border border-orange-100 mb-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">

        {/* Title Section */}
        <div className="text-left flex items-end gap-2">
          <div>
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-orange-900 uppercase leading-tight">
              {title}
            </h1>
            {/* Mobile Subtitle */}
            {subtitle && (
              <p className="sm:hidden text-sm text-gray-600 mt-0.5">
                {subtitle}
              </p>
            )}
          </div>

          {/* Desktop Subtitle */}
          {subtitle && (
            <p className="hidden sm:block text-sm text-gray-600 mb-0.5">
              {subtitle}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 text-sm bg-white text-gray-800 rounded-lg border border-gray-300 hover:bg-gray-50 flex items-center gap-2 transition-all active:scale-95 shadow-sm">
            <RefreshCw className="w-4 h-4 text-orange-500" />
            <span className="hidden xs:inline">Refresh</span>
          </button>

        </div>

      </div>
    </div>
  );
};

export default VendorPageHeader;
