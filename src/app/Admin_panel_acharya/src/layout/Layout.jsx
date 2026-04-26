import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Toggle sidebar function
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Toggle sidebar collapse
  const toggleCollapse = () => {
    setIsCollapsed(prev => !prev);
  };

  // Close sidebar on route change (mobile only)
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [location.pathname, isMobile]);

  return (
    <div className="h-screen overflow-hidden bg-[#fbfaf9]">

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Container */}
      <div className="flex h-full">

        {/* Sidebar - Mobile: Full width with text */}
        <div className={`
          fixed lg:relative inset-y-0 left-0 z-50 h-full
          transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:transform-none lg:translate-x-0
          transition-transform duration-300 ease-in-out
          w-70 lg:w-auto  // Fixed width for mobile
        `}>
          <Sidebar
            closeSidebar={() => setSidebarOpen(false)}
            isMobile={isMobile}
            isCollapsed={isMobile ? false : isCollapsed}
            toggleCollapse={toggleCollapse}
            isMobileOpen={sidebarOpen}
          />
        </div>

        {/* Right Side */}
        <div className="flex-1 flex flex-col h-full overflow-hidden">

          {/* Header */}
          <Header
            toggleSidebar={toggleSidebar}
            sidebarOpen={sidebarOpen}
            isCollapsed={isCollapsed}
            toggleCollapse={toggleCollapse}
            isMobile={isMobile}
          />

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto">
            <div key={location.pathname} className="min-h-full">
              <Outlet />
            </div>
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Layout;
