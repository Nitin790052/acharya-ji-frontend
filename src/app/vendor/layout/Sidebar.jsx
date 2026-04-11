import { NavLink, useNavigate } from "react-router-dom";
import { House, ClipboardList, Grid2x2, Wallet, Compass, LayoutGrid, Bell, Settings, Info, X, LogOut ,User, ChevronRight,Calendar,Star,FileChartLine, MessageSquare, Truck, Wallet2, BellIcon, Settings2, Package, Tag, HouseIcon, LayoutGridIcon, ClipboardListIcon, Users, BarChart} from "lucide-react";
import  {useAuth}  from "@/app/vendor/auth/AuthContext";


const Sidebar = ({ closeSidebar }) => {

 const { user ,logout } = useAuth();
const category = user?.category || user?.vendorType;

const navigate = useNavigate();

const handleLogout = () => {
  logout();
  navigate("/login");
};


 const categoryMenus = {
  Pandit: [
  { label: "Dashboard", path: "/vendor/dashboard", icon: <House size={20} /> },
  { label: "My Puja Services", path: "/vendor/dashboard/services", icon: <LayoutGrid size={20} /> },
  { label: "Bookings", path: "/vendor/dashboard/bookings", icon: <ClipboardList size={20} /> },
  { label: "Availability Calendar", path: "/vendor/dashboard/calendar", icon: <Calendar size={20} /> },
  { label: "Wallet & Earnings", path: "/vendor/dashboard/wallet", icon: <Wallet size={20} /> },
  { label: "Reviews & Ratings", path: "/vendor/dashboard/reviews", icon: <Star size={20} /> },
  { label: "Notifications", path: "/vendor/dashboard/notifications", icon: <Bell size={20} /> },
  { label: "Profile & KYC", path: "/vendor/dashboard/settings", icon: <Settings size={20} /> },
],
  Astrologer: [
    { label: "Dashboard", path: "/vendor/dashboard", icon: <House size={20} /> },
    { label: "My Consultations", path: "/vendor/dashboard/consultations", icon: <Grid2x2 size={20} /> },
    { label: "Reports & Kundli", path: "/vendor/dashboard/reports", icon: <Compass size={20} /> },
    { label: "Reports & Kundli Generator", path: "/vendor/dashboard/generate", icon: <FileChartLine size={20} /> },
    { label: "Availability", path: "/vendor/dashboard/availability", icon: <ClipboardList size={20} /> },
    { label: "Wallet & Earnings", path: "/vendor/dashboard/wallet", icon: <Wallet size={20} /> },
    { label: "Reviews & Ratings", path: "/vendor/dashboard/reviews", icon: < Star size={20} /> },
    { label: "Chat Center", path: "/vendor/dashboard/chatCenter", icon: <MessageSquare size={20} /> },
    { label: "Notifications", path: "/vendor/dashboard/astroNotifications", icon: <Bell size={20} /> },
    { label: "Profile & Branding", path: "/vendor/dashboard/profile", icon: <Settings size={20} /> },
  ],

  "Puja Samagri Seller": [
  { label: "Dashboard", path: "/vendor/dashboard", icon: <House /> },
  { label: "Orders", path: "/vendor/dashboard/orders_puja", icon: <ClipboardList /> },
  { label: "Products", path: "/vendor/dashboard/products_puja", icon: <LayoutGrid /> },
  { label: "Puja Kits", path:"/vendor/dashboard/pujaKits_puja", icon: <Package /> },
  { label: "Inventory", path: "/vendor/dashboard/inventory_puja", icon: <Grid2x2 /> },
  { label: "Offers & Coupons", path:"/vendor/dashboard/offers_puja", icon: <Tag /> },
  { label: "Shipping & Delivery", path:"/vendor/dashboard/delivery_puja", icon: <Truck /> },
  { label: "Wallet & Settlements",  path: "/vendor/dashboard/settlement_puja", icon: <Wallet2 /> },
  { label: "Reviews & Ratings", path:"/vendor/dashboard/ratings_puja", icon: <Star /> },
  { label: "Notifications", path: "/vendor/dashboard/notifications_puja", icon: <BellIcon /> },
  { label: "Store Profile & KYC", path: "/vendor/dashboard/settings_puja", icon: <Settings2 /> },
],

  "Temple Services": [
  { label: "Dashboard", path: "/vendor/dashboard", icon: <HouseIcon size={20} /> },
  { label: "Sevas / Pujas", path: "/vendor/dashboard/sevas_temple", icon: <LayoutGridIcon size={20} /> },
  { label: "Bookings", path: "/vendor/dashboard/bookings_temple", icon: <ClipboardListIcon size={20} /> },
  { label: "Donations", path: "/vendor/dashboard/donations_temple", icon: <Wallet size={20} /> },
  { label: "Events", path: "/vendor/dashboard/events_temple", icon: <Grid2x2 size={20} /> },
  { label: "Staff / Pandit", path: "/vendor/dashboard/staff_temple", icon: <Users size={20} /> },
  { label: "Wallet & Accounts", path: "/vendor/dashboard/wallet_temple", icon: <Wallet2 size={20} /> },
  { label: "Temple Settings", path: "/vendor/dashboard/settings_temple", icon: <Settings size={20} /> },
],

  "Event Organizer": [
  { label: "Dashboard", path: "/vendor/dashboard", icon: <House size={20} /> },
  { label: "Events", path: "/vendor/dashboard/events_Organizer", icon: <Grid2x2 size={20} /> },
  { label: "Bookings / Registrations", path: "/vendor/dashboard/bookings_Organizer", icon: <ClipboardList size={20} /> },
  { label: "Attendees", path: "/vendor/dashboard/attendees_Organizer", icon: <Users size={20} /> },
  { label: "Wallet & Payments", path: "/vendor/dashboard/wallet_Organizer", icon: <Wallet size={20} /> },
  { label: "Analytics", path: "/vendor/dashboard/analytics_Organizer", icon: <BarChart size={20} /> },
  { label: "Profile & Settings", path: "/vendor/dashboard/settings_Organizer", icon: <Settings size={20} /> },
]
,

  "Spiritual Guide": [
    { label: "Dashboard", path: "/vendor/dashboard", icon: <House size={20} /> },
    { label: "Sessions", path: "/vendor/dashboard/sessions", icon: <Grid2x2 size={20} /> },
    { label: "Teachings", path: "/vendor/dashboard/teachings", icon: <LayoutGrid size={20} /> },
    { label: "Followers", path: "/vendor/dashboard/followers", icon: <User size={20} /> },
    { label: "Wallet & Payments", path: "/vendor/dashboard/wallet", icon: <Wallet size={20} /> },
    { label: "Profile & Settings", path: "/vendor/dashboard/settings", icon: <Settings size={20} /> },
  ],

  "Spiritual Healer": [
    { label: "Dashboard", path: "/vendor/dashboard", icon: <House size={20} /> },
    { label: "Healing Sessions", path: "/vendor/dashboard/sessions", icon: <Grid2x2 size={20} /> },
    { label: "Clients", path: "/vendor/dashboard/clients", icon: <User size={20} /> },
    { label: "Wallet & Payments", path: "/vendor/dashboard/wallet", icon: <Wallet size={20} /> },
    { label: "Profile & Settings", path: "/vendor/dashboard/settings", icon: <Settings size={20} /> },
  ],

  "Vedic Scholar": [
    { label: "Dashboard", path: "/vendor/dashboard", icon: <House size={20} /> },
    { label: "Articles", path: "/vendor/dashboard/articles", icon: <LayoutGrid size={20} /> },
    { label: "Research Requests", path: "/vendor/dashboard/requests", icon: <ClipboardList size={20} /> },
    { label: "Wallet & Payments", path: "/vendor/dashboard/wallet", icon: <Wallet size={20} /> },
    { label: "Profile & Settings", path: "/vendor/dashboard/settings", icon: <Settings size={20} /> },
  ],
};

const menu = categoryMenus[category] || [];

return (

<aside
  className="
    w-full lg:w-[266px]
    h-screen lg:h-full lg:min-h-screen
    bg-[#0F172A]
    text-white flex flex-col
    border-r border-white/10
    relative
  "
>
  {/* ================= MOBILE HEADER ================= */}
  <div className="lg:hidden flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#020617] flex-shrink-0">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
        AS
      </div>
      <div>
        <h3 className="font-semibold text-sm truncate max-w-[150px]">Acharya Pandit Sharma</h3>
        <p className="text-xs text-orange-400 truncate max-w-[150px]">Verified Acharya</p>
      </div>
    </div>

    <button
      onClick={handleLogout}
      className="p-2 rounded-full bg-white/10 hover:bg-white/20 flex-shrink-0"
      aria-label="Close menu"
    >
      <X size={20} />
    </button>
  </div>

  {/* ================= LOGO SECTION (DESKTOP) ================= */}
  <div className="hidden lg:block px-4 py-4 border-b border-white/10 bg-[#030929] flex-shrink-0">
    <div className="flex flex-col items-center gap-3">
      <div className="relative">
        <div
          className="
            w-20 h-20 rounded-full
            bg-gradient-to-br from-orange-500 to-orange-600
            flex items-center justify-center
            border-2 border-white/60
            shadow-md
            mx-auto
          "
        >
          <img
            src="/logo.png"
            alt="AstroGuru Logo"
            className="w-[60px] h-[60px] object-contain"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.parentElement.innerHTML = `
                <span class="text-white font-bold text-2xl">अ</span>
              `;
            }}
          />
        </div>

        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#0F172A]"></div>
      </div>

      <div className="text-center w-full">
        <h1 className="text-xl font-bold text-white truncate">AstroGuru</h1>
        <p className="text-xs text-gray-400 mt-1 truncate">
          Premium Astrology Partner
        </p>
      </div>
    </div>
  </div>

  {/* ================= MENU ================= */}
  <nav
    className="flex-1 px-3 py-4 space-y-1 overflow-y-auto"
    style={{
      scrollbarWidth: "thin",
      scrollbarColor: "rgba(251,146,60,.6) rgba(255,255,255,.05)",
    }}
  >
    <style
      dangerouslySetInnerHTML={{
        __html: `
          nav::-webkit-scrollbar { width: 4px; }
          nav::-webkit-scrollbar-track { background: rgba(255,255,255,.05); }
          nav::-webkit-scrollbar-thumb {
            background: rgba(251,146,60,.6);
            border-radius: 2px;
          }
          @media (max-width: 1024px) {
            nav::-webkit-scrollbar { display: none; }
          }
        `,
      }}
    />

    {menu.map((item) => (
      <NavLink
        key={item.label}
        to={item.path}
        end
        onClick={closeSidebar}
        className={({ isActive }) =>
          `group flex items-center justify-between px-3 py-[8px] rounded-md transition-all duration-200 ${
            isActive
              ? "bg-[#1E293B] text-orange-400 border-l-4 border-orange-500"
              : "text-white/90 hover:bg-[#1E293B]/60 "
          }`
        }
      >
        <div className="flex items-center gap-3 min-w-0 group-hover:text-orange-400">
          <span
            className={({isActive})=>`${isActive?"text-orange-400":"text-gray-400"}  transition-colors flex-shrink-0`}
          >
            {item.icon}
          </span>

          <span className="text-[15px] font-normal truncate min-w-0 group-hover:text-orange-400">
            {item.label}
          </span>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {item.badge && (
            <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full min-w-[26px] text-center flex-shrink-0">
              {item.badge}
            </span>
          )}

          <ChevronRight
            size={16}
            className="text-gray-500 group-hover:text-orange-400 transition-colors flex-shrink-0"
          />
        </div>
      </NavLink>
    ))}
  </nav>

  {/* ================= LOGOUT ================= */}
  <div className="px-4 py-6 border-t border-white/10 bg-[#030929] flex-shrink-0">
    {/* Mobile */}
    <div className="lg:hidden">
      <button
        className="
          w-full flex items-center justify-center gap-2
          px-3 py-2.5 rounded-lg
          bg-red-900/60 hover:bg-red-900/80
          text-orange-300
          transition
          border border-white/10
          active:scale-95
        "
        onClick={closeSidebar}
      >
        <LogOut size={18} className="flex-shrink-0" />
        <span className="font-medium truncate">Logout</span>
      </button>
      
      
    </div>

    {/* Desktop */}
    <div className="hidden lg:block ">
      <button
        className="
          w-full flex items-center justify-center gap-2
          px-3 py-2 rounded-lg
          bg-[#020617] hover:bg-red-900/80
          text-orange-400
          transition
          border border-white/10
          group
        "
      >
        <LogOut size={18} className="group-hover:scale-110 transition-transform flex-shrink-0" />
        <span onClick={handleLogout} className="font-medium">Logout</span>
      </button>

     
    </div>
  </div>

  {/* ================= TOUCH FRIENDLY SPACING FOR MOBILE ================= */}
  <div className="lg:hidden absolute bottom-0 left-0 right-0 h-4 bg-[#0F172A] pointer-events-none"></div>
</aside>

  );
};

export default Sidebar;