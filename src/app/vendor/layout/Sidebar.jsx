import { NavLink, useNavigate } from "react-router-dom";
import { LogOut, X, ChevronRight } from "lucide-react";
import { useAuth } from "@/app/vendor/auth/AuthContext";
import { VENDOR_CONFIG } from "../config/vendorConfig.jsx";


const Sidebar = ({ closeSidebar }) => {

  const { user, logout } = useAuth();
  const category = user?.category || user?.vendorType || 'Pandit';

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Get menu from config or fallback to Pandit
  const menu = VENDOR_CONFIG.categories[category]?.menu || VENDOR_CONFIG.categories['Pandit'].menu;

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
              `group flex items-center justify-between px-3 py-[8px] rounded-md transition-all duration-200 ${isActive
                ? "bg-[#1E293B] text-orange-400 border-l-4 border-orange-500"
                : "text-white/90 hover:bg-[#1E293B]/60 "
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className="flex items-center gap-3 min-w-0 group-hover:text-orange-400">
                  <span className={`${isActive ? "text-orange-400" : "text-gray-400"} transition-colors flex-shrink-0`}>
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
              </>
            )}
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
