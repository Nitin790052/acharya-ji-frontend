import { Outlet } from "react-router-dom";
import Header from "../../user/layout/Header";
import Sidebar from "../../user/layout/Sidebar";
import Footer from "../../user/layout/Footer";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const UserDashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);


  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

   const toggleCollapse = () => {
    setIsCollapsed(prev => !prev);
  };

  // Close sidebar on route change (mobile only)
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [location.pathname, isMobile]);

  // Get page title based on route
  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('dashboard')) return 'Dashboard';
    if (path.includes('bookings')) return 'My Bookings';
    if (path.includes('profile')) return 'Profile';
    if (path.includes('orders')) return 'Orders';
    if (path.includes('astrology')) return 'Astrology';
    if (path.includes('kundli')) return 'Kundli';
    if (path.includes('wallet')) return 'Wallet';
    if (path.includes('favorites')) return 'Favorites';
    if (path.includes('notifications')) return 'Notifications';
    if (path.includes('settings')) return 'Settings';
    if (path.includes('support')) return 'Support';
    return 'Dashboard';
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex h-screen">
        {/* Sidebar */}
        <div className={`
          fixed lg:relative inset-y-0 left-0 z-50
          transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:transform-none lg:translate-x-0
          transition-transform duration-300 ease-in-out
        `}>
          <Sidebar 
            closeSidebar={() => setSidebarOpen(false)} 
            isMobile={isMobile}
              isCollapsed={isCollapsed} 
       toggleCollapse={toggleCollapse}
          />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
          {/* Header */}
          <Header 
            toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
            sidebarOpen={sidebarOpen}
            pageTitle={getPageTitle()}
              isCollapsed={isCollapsed} 
        toggleCollapse={toggleCollapse}
        isMobile={isMobile}
          />
          
          {/* Main Content - Scrollable */}
          <main className="flex-1 overflow-y-auto ">
            
              <Outlet />
            
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default UserDashboardLayout;
