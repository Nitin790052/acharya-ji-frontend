import { ShoppingCart, User, Phone, Headphones, Calendar, Building } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useCart } from '../../contexts/CartContext';

// Hindu calendar months and current month festivals
const hinduMonths = [
  { name: 'Chaitra', festivals: ['Gudi Padwa', 'Ugadi', 'Chaitra Navratri'] },
  { name: 'Vaishakha', festivals: ['Akshaya Tritiya', 'Vaisakhi', 'Parshuram Jayanti'] },
  { name: 'Jyeshtha', festivals: ['Ganga Dussehra', 'Vat Savitri'] },
  { name: 'Ashadha', festivals: ['Guru Purnima', 'Rath Yatra'] },
  { name: 'Shravana', festivals: ['Raksha Bandhan', 'Nag Panchami', 'Janmashtami'] },
  { name: 'Bhadrapada', festivals: ['Ganesh Chaturthi', 'Hartalika Teej', 'Rishi Panchami'] },
  { name: 'Ashwin', festivals: ['Navratri', 'Dussehra', 'Karwa Chauth'] },
  { name: 'Kartika', festivals: ['Diwali', 'Bhai Dooj', 'Chhath Puja'] },
  { name: 'Margashirsha', festivals: ['Geeta Jayanti', 'Dattatreya Jayanti'] },
  { name: 'Pausha', festivals: ['Makar Sankranti', 'Pongal', 'Lohri'] },
  { name: 'Magha', festivals: ['Vasant Panchami', 'Maha Shivaratri'] },
  { name: 'Phalguna', festivals: ['Holi', 'Shigmo', 'Rang Panchami'] },
];

// Get current date and determine Hindu month based on actual calendar
const getCurrentHinduMonth = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth(); // 0-11 (Jan-Dec)
  const day = currentDate.getDate();

  // Hindu calendar mapping (approximate - varies by region and lunar calendar)
  // Creating date ranges for current year
  const hinduCalendarMap = [
    { startMonth: 11, startDay: 22, endMonth: 0, endDay: 20, monthIndex: 9 }, // Pausha (Dec 22 - Jan 20)
    { startMonth: 0, startDay: 21, endMonth: 1, endDay: 19, monthIndex: 10 }, // Magha (Jan 21 - Feb 19)
    { startMonth: 1, startDay: 20, endMonth: 2, endDay: 21, monthIndex: 11 }, // Phalguna (Feb 20 - Mar 21)
    { startMonth: 2, startDay: 22, endMonth: 3, endDay: 20, monthIndex: 0 }, // Chaitra (Mar 22 - Apr 20)
    { startMonth: 3, startDay: 21, endMonth: 4, endDay: 20, monthIndex: 1 }, // Vaishakha (Apr 21 - May 20)
    { startMonth: 4, startDay: 21, endMonth: 5, endDay: 21, monthIndex: 2 }, // Jyeshtha (May 21 - Jun 21)
    { startMonth: 5, startDay: 22, endMonth: 6, endDay: 22, monthIndex: 3 }, // Ashadha (Jun 22 - Jul 22)
    { startMonth: 6, startDay: 23, endMonth: 7, endDay: 22, monthIndex: 4 }, // Shravana (Jul 23 - Aug 22)
    { startMonth: 7, startDay: 23, endMonth: 8, endDay: 22, monthIndex: 5 }, // Bhadrapada (Aug 23 - Sep 22)
    { startMonth: 8, startDay: 23, endMonth: 9, endDay: 22, monthIndex: 6 }, // Ashwin (Sep 23 - Oct 22)
    { startMonth: 9, startDay: 23, endMonth: 10, endDay: 21, monthIndex: 7 }, // Kartika (Oct 23 - Nov 21)
    { startMonth: 10, startDay: 22, endMonth: 11, endDay: 21, monthIndex: 8 }, // Margashirsha (Nov 22 - Dec 21)
  ];


  // Find current Hindu month
  for (let mapping of hinduCalendarMap) {
    const { startMonth, startDay, endMonth, endDay, monthIndex } = mapping;

    // Handle year boundary (Dec-Jan case)
    if (startMonth > endMonth) {
      if ((month === startMonth && day >= startDay) || (month === endMonth && day <= endDay)) {
        return hinduMonths[monthIndex];
      }
    } else {
      // Normal case
      if ((month === startMonth && day >= startDay) ||
        (month === endMonth && day <= endDay) ||
        (month > startMonth && month < endMonth)) {
        return hinduMonths[monthIndex];
      }
    }
  }

  // Fallback
  return hinduMonths[0];
};

// Button component
const Button = ({ variant, size, className, children, onClick, ...props }) => {
  return (
    <button
      className={`inline-flex items-center justify-center transition-colors ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default function TopBar() {
  const { totalItems: samagriCount, setIsCartOpen } = useCart();
  const poojaCartItems = useSelector(state => state.cart?.cartItems || []);
  const cartCount = samagriCount + poojaCartItems.length;

  const currentHinduMonth = getCurrentHinduMonth();
  const navigate = useNavigate();

  return (
    <div
      className="bg-black/90 backdrop-blur-md text-white py-1 border-b border-amber-500/20 sticky top-0 z-50 shadow-lg shadow-black/20 animate-[slide-in-top_0.3s_ease-out]"
    >
      <div className="container mx-auto px-2 sm:px-3 md:px-4 py-0">
        <div className="flex items-center justify-between">

          {/* Left Side - Hindu Month & Festivals - PREMIUM VEDIC CARD */}
          <div className="flex items-center gap-2">
            <a
              href="/panchang"
              className="flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-amber-950/20 border border-amber-500/20 hover:bg-amber-950/30 hover:border-amber-500/40 transition-all duration-300 group"
            >
              <div className="p-1 rounded-full bg-gradient-to-br from-amber-500/20 to-orange-500/20 group-hover:from-amber-500/30 group-hover:to-orange-500/30">
                <Calendar className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
              </div>

              {/* Desktop View */}
              <div className="hidden md:flex items-center gap-2 text-xs">
                <span className="text-amber-400 font-bold uppercase tracking-wider">{currentHinduMonth.name}</span>
                <span className="w-1 h-1 rounded-full bg-amber-500/40" />
                <span className="text-gray-300 truncate max-w-[150px] lg:max-w-[250px]">
                  {currentHinduMonth.festivals.slice(0, 1).join(', ')}
                </span>
              </div>

              {/* Mobile View */}
              <div className="md:hidden flex items-center gap-1.5 text-[10px] sm:text-xs">
                <span className="text-amber-400 font-bold">{currentHinduMonth.name}</span>
                <span className="text-gray-500">•</span>
                <span className="text-gray-400 truncate max-w-[70px] xs:max-w-[90px]">
                  {currentHinduMonth.festivals[0]}
                </span>
              </div>
            </a>
          </div>

          {/* Right Side - Action Buttons - FULLY RESPONSIVE */}
          <div className="flex items-center gap-1 xs:gap-1.5 sm:gap-2">

            {/* Book Consultation - Saffron Glow */}
            <Button
              size="sm"
              className="hidden xs:flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold px-3 py-1 h-6 sm:h-7 text-[8px] sm:text-[10px] rounded-full shadow-[0_0_15px_rgba(245,158,11,0.2)] hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all duration-300 hover:scale-105 border border-amber-400/20"
            >
              <Headphones className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span className="hidden sm:inline">Book Consultation</span>
              <span className="sm:hidden">Book</span>
            </Button>            {/* User Login - Crimson Theme */}
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-1.5 bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-700 hover:to-rose-800 text-white border border-red-500/20 px-3 py-1 h-6 sm:h-7 text-[8px] sm:text-[10px] rounded-full shadow-md transition-all duration-300 hover:scale-105"
              onClick={() => navigate("/user_login")}
            >
              <User className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span className="hidden sm:inline">User Login</span>
              <span className="sm:hidden">User</span>
            </Button>

            {/* Vendor Login - Dark Professional */}
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-1.5 bg-[#1a1a1a] hover:bg-[#252525] text-gray-300 hover:text-white border border-white/10 px-3 py-1 h-6 sm:h-7 text-[8px] sm:text-[10px] rounded-full shadow-inner transition-all duration-300 hover:scale-105"
              onClick={() => navigate("/login")}
            >
              <Building className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span className="hidden sm:inline">Vendor Login</span>
              <span className="sm:hidden">Vendor</span>
            </Button>

            {/* Cart - Golden Glow */}
            <Button
              variant="ghost"
              size="sm"
              className="relative flex items-center gap-1.5 bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 hover:from-yellow-500 hover:via-amber-600 hover:to-orange-600 text-black font-bold px-3 py-1 h-6 sm:h-7 text-[8px] sm:text-[10px] rounded-full shadow-[0_0_15px_rgba(251,191,36,0.3)] hover:shadow-[0_0_20px_rgba(251,191,36,0.5)] transition-all duration-300 hover:scale-105"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden xs:inline">Cart</span>
              {cartCount > 0 && (
                <span
                  className="absolute top-0 -right-1 bg-red-600 text-white text-[9px] sm:text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-black shadow-lg border border-white/20 animate-scale-in"
                >
                  {cartCount}
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
