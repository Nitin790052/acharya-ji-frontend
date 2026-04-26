import React, { useEffect, useRef, useState } from 'react';
import { 
  Menu,
  X,
  Bell,
  ChevronDown,
  User,
  Calendar,
  CreditCard,
  Settings,
  LogOut,
  Search,
  Clock,
  MessageSquare,
  Rows3,
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  History,
  Wallet
} from 'lucide-react';
import { useUserAuth } from '../auth/AuthContext';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useGetUserDashboardQuery } from '../../../services/userApi';
import { API_URL, getImageUrl } from '../../../config/apiConfig';
import { useSelector } from 'react-redux';
import { useCart } from '../../../contexts/CartContext';

const Header = ({ toggleSidebar, sidebarOpen, isCollapsed, toggleCollapse, isMobile }) => {
  const { data: dashboardData } = useGetUserDashboardQuery(undefined, { pollingInterval: 60000 });
  const { setIsCartOpen, totalItems: samagriCount } = useCart();
  const poojaCartItems = useSelector(state => state.cart?.cartItems || []);
  const cartCount = samagriCount + poojaCartItems.length;

  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { logout } = useUserAuth();
  const navigate = useNavigate();

  const notifications = dashboardData?.data?.notifications || [];
  const unreadNotificationsCount = notifications.filter(n => n.unread).length;
  const unreadMessagesCount = dashboardData?.data?.unreadMessagesCount || 0;
  const userData = dashboardData?.data?.user || {};
  const userInitials = userData.name ? userData.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'U';
  const userAvatar = getImageUrl(userData.avatar);

  const profileRef = useRef();

  useEffect(() => {
  const handleClickOutside = (event) => {
    if (profileRef.current && !profileRef.current.contains(event.target)) {
      setShowUserMenu(false);
    }
  };

  if (showUserMenu) {
    document.addEventListener("mousedown", handleClickOutside);
  }

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [showUserMenu]);

{/* logout logic */}

const handleLogout =()=>{
  logout();
  toast.success("User Logout successfully");
  navigate("/user_login");
};


  return (
    <header className="bg-gradient-to-r from-[#0f172a] via-[#111827] to-[#0f172a] backdrop-blur-xl shadow-lg border-b border-white/10 sticky top-0 z-30">

      <div className="px-4 sm:px-6 lg:px-8">

        {/* 👇 Height control here */}
        <div className="flex items-center justify-between h-12 lg:h-14">

          {/* LEFT */}
          <div className="flex items-center gap-3 lg:gap-4">

            {/* Sidebar Toggle */}
            {!isMobile && (
              <div 
              onClick={()=>toggleCollapse(!isCollapsed)}
              className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg 
                         
                         hover:bg-orange-500/20 hover:border-orange-400 
                         transition-all duration-300 cursor-pointer ${!isCollapsed?"bg-white/5 border border-white/20 ":"bg-orange-400/20 border border-orange-300 "}`}
            >
              {!isCollapsed?(<><ChevronLeft size={18} className="text-gray-300" />
              <Rows3 size={18} className="text-gray-300" /></>):(<>
              <Rows3 size={18} className="text-orange-300" /><ChevronRight size={18} className="text-orange-300" /></>)}
            </div>
            )}

            <button
              onClick={toggleSidebar}
              className="lg:hidden p-2 rounded-lg bg-white/5 border border-white/10 
                         hover:bg-orange-500/20 transition-all duration-300"
            >
              {sidebarOpen ? (
                <X size={20} className="text-gray-300" />
              ) : (
                <Menu size={20} className="text-gray-300" />
              )}
            </button>

          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-3 lg:gap-4">

            {/* Notifications */}
            <div 
              className="relative group"
              onMouseEnter={() => setShowNotifications(true)}
              onMouseLeave={() => setShowNotifications(false)}
            >
              <button
                className="relative p-2 rounded-lg bg-white/5 border border-white/20 
                           hover:bg-orange-500/20 hover:border-orange-400 transition-all duration-300 
                           text-gray-300 hover:text-white"
              >
                <Bell size={18} />
                {unreadNotificationsCount > 0 && (
                  <>
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] 
                                     rounded-full w-4 h-4 flex items-center justify-center">
                      {unreadNotificationsCount}
                    </span>
                  </>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-0 pt-2 w-80 z-50">
                  <div className="bg-[#1f2937] border border-white/10 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] py-2 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-2 border-b border-white/10 flex justify-between items-center bg-white/5">
                      <h3 className="text-sm font-semibold text-white">
                        Notifications
                      </h3>
                      {unreadNotificationsCount > 0 && (
                        <span className="text-[10px] bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded-full border border-orange-500/30">
                          {unreadNotificationsCount} New
                        </span>
                      )}
                    </div>

                    <div className="max-h-80 overflow-y-auto custom-scrollbar">
                      {notifications.length > 0 ? (
                        notifications.map((item, index) => {
                          const Icon = item.type === 'payment' ? CreditCard : 
                                       item.type === 'reminder' ? Clock :
                                       item.type === 'offer' ? Bell : Bell;
                          
                          // Determine where to link based on type
                          const linkTo = item.type === 'payment' ? '/user/dashboard/payments-user' :
                                         item.type === 'reminder' ? '/user/dashboard/order-user/order-all' :
                                         '/user/dashboard/profile-user';

                          return (
                            <Link 
                              to={linkTo}
                              key={index} 
                              className="block px-4 py-3 hover:bg-white/5 transition-all cursor-pointer border-b border-white/5 last:border-0 relative"
                            >
                              <div className="flex gap-3">
                                <div className={`p-1.5 rounded-lg ${item.unread ? 'bg-orange-500/10' : 'bg-gray-500/10'}`}>
                                  <Icon size={14} className={`${item.unread ? 'text-orange-400' : 'text-gray-400'}`} />
                                </div>
                                <div className="flex-1">
                                  <p className={`text-xs leading-relaxed ${item.unread ? 'text-gray-100 font-medium' : 'text-gray-400'}`}>
                                    {item.message}
                                  </p>
                                  <p className="text-[10px] text-gray-500 mt-1 flex items-center gap-1">
                                    <Clock size={10} /> {item.time}
                                  </p>
                                </div>
                                {item.unread && (
                                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1 shadow-[0_0_8px_rgba(249,115,22,0.8)]"></div>
                                )}
                              </div>
                            </Link>
                          );
                        })
                      ) : (
                        <div className="px-4 py-8 text-center">
                          <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-3">
                            <Bell size={20} className="text-gray-600 opacity-50" />
                          </div>
                          <p className="text-xs text-gray-500">All caught up!</p>
                        </div>
                      )}
                    </div>

                    <div className="px-4 py-2 border-t border-white/10 bg-white/5">
                      <Link 
                        to="/user/dashboard/profile-user" 
                        className="text-xs text-orange-400 hover:text-orange-300 font-medium flex items-center gap-1 transition-colors"
                      >
                        View Notification Settings <ChevronRight size={12} />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="text-gray-600 text-lg hidden sm:block">|</div>

            {/* Cart */}
            <button 
              className="relative p-2 rounded-lg bg-white/5 border border-white/20 
                         hover:bg-[#E8453C]/20 hover:border-[#E8453C]/40 transition-all duration-300 
                         text-gray-300 hover:text-white"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBag size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#E8453C] text-white text-[10px] 
                                 rounded-full w-4 h-4 flex items-center justify-center border border-[#0f172a] shadow-lg">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Chat */}

            {/* Profile */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 p-1.5 rounded-lg 
                           bg-white/5 border border-white/20 
                           hover:bg-orange-500/20 hover:border-orange-400 transition-all duration-300"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-r 
                                from-orange-500 to-orange-600 
                                flex items-center justify-center shadow-md overflow-hidden">
                  {userAvatar ? (
                    <img src={userAvatar} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-white text-xs font-semibold">{userInitials}</span>
                  )}
                </div>
                <ChevronDown size={16} className="text-gray-400 hidden lg:block" />
              </button>

              {showUserMenu && (
   <div className="absolute right-0 mt-3 w-60 
                backdrop-blur-2xl 
                bg-gradient-to-b from-[#1f2937]/95 to-[#111827]/95
                border border-white/10 
                rounded-2xl 
                shadow-[0_20px_60px_rgba(0,0,0,0.6)]
                ring-1 ring-white/5
                p-3 
                z-50">

  <div className="space-y-2">

    <Link to={"profile-user"} 
       className="group flex items-center gap-3 px-4 py-2.5 
                  rounded-xl 
                  bg-white/5 border border-white/5
                  text-sm text-gray-200 
                  hover:bg-orange-500/15 hover:border-orange-400/40
                  transition-all duration-300">
      <User size={15} className="text-orange-400 group-hover:scale-110 transition-all" />
      <span className="group-hover:text-white transition-colors">Profile</span>
    </Link>

     <Link to={"order-user/order-all"} 
       className="group flex items-center gap-3 px-4 py-2.5 
                  rounded-xl 
                  bg-white/5 border border-white/5
                  text-sm text-gray-200 
                  hover:bg-orange-500/15 hover:border-orange-400/40
                  transition-all duration-300">
      <ShoppingBag size={15} className="text-orange-400 group-hover:scale-110 transition-all" />
      <span className="group-hover:text-white transition-colors">Orders</span>
     </Link>

  <Link to={"history-user"} 
       className="group flex items-center gap-3 px-4 py-2.5 
                  rounded-xl 
                  bg-white/5 border border-white/5
                  text-sm text-gray-200 
                  hover:bg-orange-500/15 hover:border-orange-400/40
                  transition-all duration-300">
      <History size={15} className="text-orange-400 group-hover:scale-110 transition-all" />
      <span className="group-hover:text-white transition-colors">History</span>
    </Link>

   <Link to={"payments-user"} 
       className="group flex items-center gap-3 px-4 py-2.5 
                  rounded-xl 
                  bg-white/5 border border-white/5
                  text-sm text-gray-200 
                  hover:bg-orange-500/15 hover:border-orange-400/40
                  transition-all duration-300">
      <CreditCard size={15} className="text-orange-400 group-hover:scale-110 transition-all" />
      <span className="group-hover:text-white transition-colors">Payments</span>
    </Link>

  </div>

  {/* Logout Section */}
  <div className="mt-3 pt-3 border-t border-white/10">

    <button onClick={handleLogout} className="group flex items-center gap-3 px-4 py-2.5 w-full
                  rounded-xl 
                  bg-red-500/10 border border-red-500/20
                  text-sm text-red-400
                  hover:bg-red-600/30 hover:text-white
                  transition-all duration-300">
       
      <LogOut size={15} className="group-hover:rotate-12 group-hover:scale-110 transition-all" />
      <span className="font-medium tracking-wide">Logout</span>
   </button> 

  </div>

</div>


              )}
            </div>

          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;
