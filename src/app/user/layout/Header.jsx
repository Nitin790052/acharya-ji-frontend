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

const Header = ({ toggleSidebar, sidebarOpen, isCollapsed,toggleCollapse,isMobile}) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const {logout} = useUserAuth();
  const navigate = useNavigate();

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
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-lg bg-white/5 border border-white/20 
                           hover:bg-orange-500/20 hover:border-orange-400  transition-all duration-300 
                           text-gray-300 hover:text-white"
              >
                <Bell size={18} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] 
                                 rounded-full w-4 h-4 flex items-center justify-center">
                  3
                </span>
              </button>

              {/* {showNotifications && (
                <div className="absolute right-0 mt-2 w-72 bg-[#1f2937] 
                                border border-white/10 rounded-xl shadow-2xl py-2 z-50">
                  <div className="px-4 py-2 border-b border-white/10">
                    <h3 className="text-sm font-semibold text-white">
                      Notifications
                    </h3>
                  </div>

                  <div className="max-h-80 overflow-y-auto">
                    {[
                      { title: 'Puja reminder tomorrow', time: '5 min ago', icon: Clock },
                      { title: 'Consultation in 2 hours', time: '1 hour ago', icon: Calendar },
                      { title: 'Special offer on Kundli', time: '1 day ago', icon: Bell }
                    ].map((item, index) => (
                      <div key={index} className="px-4 py-2 hover:bg-white/5 transition-all cursor-pointer">
                        <div className="flex gap-3">
                          <item.icon size={14} className="text-orange-400 mt-1" />
                          <div>
                            <p className="text-xs text-gray-200">{item.title}</p>
                            <p className="text-[11px] text-gray-400">{item.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="px-4 py-2 border-t border-white/10">
                    <button className="text-xs text-orange-400 hover:text-orange-300">
                      View all notifications
                    </button>
                  </div>
                </div>
              )} */}
            </div>

            <div className="text-gray-600 text-lg hidden sm:block">|</div>

            {/* Chat */}
            <button className="hidden sm:block p-2 rounded-lg bg-white/5 border border-white/20 
                               hover:bg-orange-500/20 hover:border-orange-400 transition-all duration-300 
                               text-gray-300 hover:text-white">
              <MessageSquare size={18} />
            </button>

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
                                flex items-center justify-center shadow-md">
                  <span className="text-white text-xs font-semibold">RJ</span>
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
