import { Outlet } from "react-router-dom";
import Sidebar from "../../vendor/layout/Sidebar";
import Header from "../../vendor/layout/Header";
import Footer from "../../vendor/layout/Footer";
import { useState } from "react";

const VendorDashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 overflow-x-hidden">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex h-screen">
        {/* Sidebar - Fixed on desktop, overlay on mobile */}
        <div className={`
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 fixed lg:sticky lg:top-0 z-50
          transition-transform duration-300
        `}>
          <Sidebar closeSidebar={() => setSidebarOpen(false)} />
        </div>

        {/* Main Content Area - Flex container */}
        <div className="flex-1 flex flex-col min-h-0 w-full max-w-full overflow-x-hidden">
          {/* Header - Fixed height */}
          <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

          {/* Main Content - Scrollable */}
          <main className="flex-1 min-h-0 overflow-y-auto">
            <div className=" bg-gray-50">
              <Outlet />
            </div>
          </main>

          {/* Footer - Fixed height */}
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default VendorDashboardLayout;
