import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useUserAuth } from '../auth/AuthContext';
import { 
  Home,
  Star,
  Sparkles,
  ShoppingBag,
  LogOut,
  User,
  History,
  Wallet,
  CreditCard,
  ChevronDown,
  ChevronRight,
  Settings,
  HelpCircle,
  Gift,
  Award,
  Clock,
  Package,
  XCircle
} from 'lucide-react';
import { toast } from 'react-toastify';

const Sidebar = ({ closeSidebar, isMobile, isCollapsed, toggleCollapse }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useUserAuth();
  
  // State for managing expanded submenus - only one can be open at a time
  const [expandedMenu, setExpandedMenu] = useState(null);

  // Handle logout
  const handleLogout = () => {
    logout();
    toast.success('Logout successful!');
    navigate('/user_login');
  };

  // Toggle submenu - closes others when opening a new one
  const toggleSubmenu = (menuLabel) => {
    setExpandedMenu(prevExpanded => 
      prevExpanded === menuLabel ? null : menuLabel
    );
  };

  // Close any open submenu when clicking on a regular menu item
  const handleRegularMenuClick = () => {
    // Close any open submenu
    setExpandedMenu(null);
    // Close mobile sidebar if needed
    closeSidebar();
  };

  // Check if any child is active
  const isAnyChildActive = (children) => {
    return children.some(child => location.pathname === child.path);
  };

  // Check if a menu item is active (either itself or its children)
  const isMenuItemActive = (item) => {
    if (item.path && location.pathname === item.path) {
      return true; // Direct match
    }
    if (item.submenu && isAnyChildActive(item.submenu)) {
      return true; // Child is active
    }
    return false;
  };

  // Auto-expand the menu that has an active child on initial load
  useEffect(() => {
    const findActiveParent = () => {
      for (const item of mainNavItems) {
        if (item.submenu && isAnyChildActive(item.submenu)) {
          setExpandedMenu(item.label);
          break;
        }
      }
    };
    
    findActiveParent();
  }, [location.pathname]);

  // Close submenu when navigating to a regular menu item
  useEffect(() => {
    // Check if current path matches any regular menu item (without submenu)
    const isRegularMenuActive = mainNavItems.some(item => 
      !item.submenu && location.pathname === item.path
    );
    
    if (isRegularMenuActive) {
      setExpandedMenu(null);
    }
  }, [location.pathname]);

  // Main Menu Items with Submenus
  const mainNavItems = [
    {
      icon: <Home size={20} />,
      label: 'Dashboard',
      path: '/user/dashboard',
      exact: true
    },
    {
      icon: <User size={20} />,
      label: 'Profile',
      path: '/user/dashboard/profile-user'
    },
    {
      icon: <ShoppingBag size={20} />,
      label: 'Orders',
      path: '/user/dashboard/order-user',
      submenu: [
        {
          icon: <ShoppingBag size={18} />,
          label: 'All Orders',
          path: '/user/dashboard/order-user/order-all'
        },
        {
          icon: <Clock size={18} />,
          label: 'Pending Orders',
          path: '/user/dashboard/order-user/order-pendings'
        },
        {
          icon: <Package size={18} />,
          label: 'Processing Orders',
          path: '/user/dashboard/order-user/order-processing'
        },
          {
          icon: <Award size={18} />,
          label: 'Completed Orders',
          path: '/user/dashboard/order-user/order-completed'
        },
          {
          icon: <XCircle size={18} />,
          label: 'Cancelled Orders',
          path: '/user/dashboard/order-user/order-cancelled'
        }
      ]
    },
    {
      icon: <History size={20} />,
      label: 'History',
      path: '/user/dashboard/history-user',
      // submenu: [
      //   {
      //     icon: <History size={18} />,
      //     label: 'Order History',
      //     path: '/user/dashboard/history-user/orders'
      //   },
      //   {
      //     icon: <Wallet size={18} />,
      //     label: 'Payment History',
      //     path: '/user/dashboard/history-user/payments'
      //   }
      // ]
    },
    {
      icon: <CreditCard size={20} />,
      label: 'Payments',
      path: '/user/dashboard/payments-user',
      // submenu: [
      //   {
      //     icon: <CreditCard size={18} />,
      //     label: 'Payment Methods',
      //     path: '/user/dashboard/payments-user/methods'
      //   },
      //   {
      //     icon: <Wallet size={18} />,
      //     label: 'Wallet',
      //     path: '/user/dashboard/payments-user/wallet'
      //   },
      //   {
      //     icon: <History size={18} />,
      //     label: 'Transactions',
      //     path: '/user/dashboard/payments-user/transactions'
      //   }
      // ]
    },
   
  ];

  // Tooltip component for collapsed mode
  const Tooltip = ({ label, children }) => (
    <div className="relative group">
      {children}
      {isCollapsed && (
        <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
          {label}
        </div>
      )}
    </div>
  );

  // Submenu Item Component
  const SubmenuItem = ({ item, onClick }) => (
    <NavLink
      to={item.path}
      onClick={onClick}
      className={({ isActive }) => `
        relative flex items-center gap-3 px-4 py-2.5 ml-9 rounded-xl
        transition-all duration-300 group
        ${isCollapsed ? 'justify-center' : ''}

        ${
          isActive
            ? `
              bg-gradient-to-r from-orange-500/20 to-orange-600/10
              text-orange-400
              border-l-2 border-l-orange-500
            `
            : `
              text-gray-400
              hover:bg-[#1f2937]
              hover:text-white
            `
        }
      `}
    >
      <span className="transition-all duration-300 group-hover:scale-110">
        {item.icon}
      </span>
      
      {(!isCollapsed || isMobile) && (
        <span className="flex-1 text-left text-sm font-medium">
          {item.label}
        </span>
      )}
    </NavLink>
  );

  return (
    <aside 
      className={`
        relative h-full bg-[#111827] text-white
        transition-all duration-300 ease-in-out
        ${
      isMobile
        ? 'w-[260px]'
        : isCollapsed
        ? 'w-20'
        : 'w-[274px]'
    }
        flex flex-col shadow-xl
      `}
    >
      
      {/* Top Section - Brand Area */}
      <div className="flex-shrink-0 h-28 px-5 border-b border-white/10 
        bg-gradient-to-b from-[#1f2937]/95 to-[#111827]/95 
        backdrop-blur-xl relative overflow-hidden">

        {/* Subtle Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-transparent to-red-500/5 pointer-events-none" />

        <div className={`flex items-center h-full transition-all duration-300
          ${isCollapsed ? 'justify-center' : 'gap-4'}`}>

          {/* Logo */}
          <div className="relative w-16 h-16 rounded-2xl 
            bg-gradient-to-br from-orange-500 to-red-500 
            flex items-center justify-center
            shadow-[0_10px_30px_rgba(255,115,0,0.35)]
            transition-all duration-300 hover:scale-105">

            {/* Inner Shine */}
            <div className="absolute inset-0 rounded-2xl bg-white/10 backdrop-blur-sm" />

            <img 
              src="/logo.png" 
              alt="Acharya Ji" 
              className="w-14 h-14 object-contain relative z-10"
            />
          </div>

          {/* Brand Text */}
          <div className={`transition-all duration-300 origin-left
            ${isCollapsed 
              ? 'opacity-0 scale-95 w-0 overflow-hidden' 
              : 'opacity-100 scale-100 w-auto'
            }`}>

            <h2 className="font-extrabold text-white text-2xl tracking-wide leading-tight">
              Acharya Ji
            </h2>

            <p className="text-sm text-orange-400 font-semibold mt-1">
              {user?.name || 'Welcome Back'}
            </p>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
        <ul className="space-y-1 px-3">
          {mainNavItems.map((item, index) => {
            const isActive = isMenuItemActive(item);
            
            return (
              <li key={index}>
                {item.submenu && !isCollapsed ? (
                  // Menu with submenu (only when expanded)
                  <div>
                    <button
                      onClick={() => toggleSubmenu(item.label)}
                      className={`
                        w-full flex items-center gap-4 px-4 py-3 rounded-xl
                        transition-all duration-300 group
                        ${isCollapsed ? 'justify-center' : ''}
                        ${
                          isActive
                            ? 'bg-gradient-to-r from-orange-500/20 to-orange-600/10 text-orange-400 border-l-4 border-l-orange-500'
                            : 'bg-[#1f2937]/70 text-gray-300 hover:bg-[#1f2937] hover:text-white'
                        }
                      `}
                    >
                      <span className="transition-all duration-300 group-hover:scale-110">
                        {item.icon}
                      </span>
                      
                      {(!isCollapsed || isMobile) && (
                        <>
                          <span className="flex-1 text-left text-sm font-semibold tracking-wide">
                            {item.label}
                          </span>
                          <span className={`transition-transform duration-300 ${
                            expandedMenu === item.label ? 'rotate-180' : ''
                          }`}>
                            <ChevronDown size={16} />
                          </span>
                        </>
                      )}
                    </button>

                    {/* Submenu - with animation */}
                    <div className={`
                      overflow-hidden transition-all duration-300 ease-in-out
                      ${expandedMenu === item.label ? 'max-h-96 opacity-100 mt-1' : 'max-h-0 opacity-0'}
                    `}>
                      <ul className="space-y-0.5">
                        {item.submenu.map((subItem, subIndex) => (
                          <li key={subIndex}>
                            <SubmenuItem item={subItem} onClick={closeSidebar} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  // Regular menu item (without submenu)
                  <Tooltip label={item.label}>
                    <NavLink
                      to={item.path}
                      onClick={handleRegularMenuClick}
                      end={item.exact}
                      className={({ isActive: linkActive }) => `
                        relative flex items-center gap-4 px-4 py-3 rounded-xl
                        transition-all duration-300 group
                        ${isCollapsed ? 'justify-center' : ''}

                        ${
                          linkActive
                            ? `
                              bg-gradient-to-r from-orange-500/20 to-orange-600/10
                              text-orange-400
                              shadow-lg shadow-orange-500/20
                              border border-orange-500/20
                              border-l-4 border-l-orange-500
                            `
                            : `
                              bg-[#1f2937]/70
                              text-gray-300
                              border border-transparent
                              hover:bg-[#1f2937]
                              hover:text-white
                            `
                        }
                      `}
                    >
                      {/* Icon */}
                      <span className="transition-all duration-300 group-hover:scale-110">
                        {item.icon}
                      </span>

                      {(!isCollapsed || isMobile) && (
                        <span className="flex-1 text-left text-sm font-semibold tracking-wide">
                          {item.label}
                        </span>
                      )}
                    </NavLink>
                  </Tooltip>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Divider */}
      <div className="mx-3 my-2 border-t border-gray-800"></div>

      {/* Bottom Section - Logout Button */}
      <nav className="flex-shrink-0 py-6 px-4">
        <ul>
          <li>
            <Tooltip label="Logout">
              <button
                onClick={handleLogout}
                className={`
                  relative w-full flex items-center gap-4 px-4 py-3 rounded-2xl
                  transition-all duration-300 group overflow-hidden
                  ${isCollapsed ? 'justify-center' : ''}

                  bg-gradient-to-r from-red-500/15 via-red-600/10 to-red-500/15
                  border bg-white/5 border-white/20 
                  hover:bg-orange-500/20 hover:border-orange-400 transition-all duration-300 
                  text-gray-300 hover:text-white
                `}
              >

                {/* Left glowing strip */}
                <span className="absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-red-500 to-red-700 rounded-l-2xl opacity-80"></span>

                {/* Background hover animation */}
                <span className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 opacity-0 group-hover:opacity-100 transition-all duration-300 -z-10"></span>

                {/* Icon */}
                <span className="relative transition-all duration-300 group-hover:rotate-12 group-hover:scale-110">
                  <LogOut size={20} />
                </span>

                {!isCollapsed && (
                  <span className="flex-1 text-left text-sm font-semibold tracking-wide">
                    Logout
                  </span>
                )}

                {!isCollapsed && (
                  <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 text-sm font-semibold">
                    →
                  </span>
                )}
              </button>
            </Tooltip>
          </li>
        </ul>
      </nav>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .scrollbar-thin::-webkit-scrollbar {
          width: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #4b5563;
          border-radius: 20px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #f97316;
        }
      `}</style>
    </aside>
  );
};

export default Sidebar;
