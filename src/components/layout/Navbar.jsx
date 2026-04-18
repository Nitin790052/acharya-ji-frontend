import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useGetNavbarItemsQuery } from '../../services/navbarApi';

// Utility function for className merging
const cn = (...classes) => classes.filter(Boolean).join(' ');

// Button component
const Button = ({ variant, size, className, onClick, children, ...props }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'inline-flex items-center justify-center transition-colors',
        variant === 'ghost' && 'hover:bg-gray-100',
        size === 'icon' && 'h-10 w-10',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const { data: navItems = [], isLoading, isError } = useGetNavbarItemsQuery(undefined, {
    pollingInterval: 3000,
    refetchOnMountOrArgChange: true
  });

  const isActive = (href) => {
    return window.location.pathname === href;
  };

  if (isError) {
    console.error("Navbar failed to load from backend");
  }

  return (
    <nav
      className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-orange-100/50 animate-[fade-in_0.4s_ease-out]"
    >
      <div className="container mx-auto px-4 lg:px-4">
        <div className="flex items-center justify-between h-16 md:h-20 ">

          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center no-underline">
              <img
                src="/logo.png"
                alt="Acharya Ji"
                className="h-10 md:h-16 w-auto object-contain block"
                onError={(e) => {
                  console.error("Logo failed to load");
                  e.target.src = 'https://via.placeholder.com/150?text=Acharya+Ji';
                }}
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2 ml-auto">
            {!isLoading && navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children?.length > 0 && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={item.href || '#'}
                  className={cn(
                    "relative px-2 py-1.5 flex items-center gap-1 text-[13px] font-semibold whitespace-nowrap transition-all duration-300 no-underline",
                    "before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-[4px] before:h-0 before:bg-amber-600 before:rounded-full before:transition-all before:duration-300 before:ease-out",
                    (isActive(item.href) || activeDropdown === item.label) && "before:h-3 text-amber-600",
                    "hover:before:h-3 hover:text-amber-600"
                  )}
                >
                  {item.label}
                  {item.children?.length > 0 && (
                    <ChevronDown
                      className={cn(
                        "w-3.5 h-3.5 transition-transform duration-300",
                        activeDropdown === item.label && "rotate-180"
                      )}
                    />
                  )}
                </Link>

                {/* Dropdown Desktop */}
                {item.children?.length > 0 && activeDropdown === item.label && (
                  <div
                    className="absolute top-full left-0 mt-0.5 w-64 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-amber-500/10 overflow-hidden z-50 animate-scale-in"
                  >
                    <div className="h-1 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600" />
                    <div className="p-2 space-y-1 max-h-[340px] overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-amber-200 hover:[&::-webkit-scrollbar-thumb]:bg-amber-400 [&::-webkit-scrollbar-thumb]:rounded-full">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          to={child.href}
                          className="relative block p-2.5 pl-6 rounded-xl hover:bg-amber-50/50 transition-all group"
                        >
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[8px] h-0 bg-amber-600 rounded-full transition-all duration-300 group-hover:h-2/3 shadow-[0_0_12px_rgba(217,119,6,0.4)]" />

                          <span className="block text-[13px] font-bold text-gray-800 group-hover:text-amber-600 transition-colors flex items-center justify-between">
                            {child.label}
                            <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-amber-500 text-[10px]">→</span>
                          </span>
                        </Link>
                      ))}
                    </div>
                    <div className="h-1 bg-gradient-to-r from-orange-400 to-red-600" />
                  </div>
                )}
              </div>
            ))}
            
            {isLoading && (
              <div className="flex gap-4 items-center animate-pulse">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-4 w-16 bg-gray-100 rounded" />
                ))}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-red-700 hover:bg-orange-50 rounded-xl"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Menu Content */}
        <div
          className={cn(
            "lg:hidden overflow-hidden border-t border-orange-100 bg-white transition-all duration-300 ease-in-out",
            mobileMenuOpen ? "max-h-[85vh] opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="py-2 pb-10 space-y-1 overflow-y-auto">
            {!isLoading && navItems.map((item) => (
              <MobileNavItem
                key={item.label}
                item={item}
                onClose={() => setMobileMenuOpen(false)}
                isActive={isActive}
              />
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

function MobileNavItem({ item, onClose, isActive }) {
  const [isOpen, setIsOpen] = useState(false);
  const active = isActive(item.href);

  if (!item.children || item.children.length === 0) {
    return (
      <Link
        to={item.href || '#'}
        onClick={onClose}
        className={cn(
          "block px-4 py-2.5 mx-2 rounded-lg font-semibold text-sm transition-all",
          active
            ? "bg-orange-50 text-red-700 shadow-sm"
            : "text-gray-700 hover:bg-orange-50/50 hover:text-red-700"
        )}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div className="space-y-1 mx-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full flex items-center justify-between px-4 py-2.5 rounded-lg font-semibold text-sm transition-all",
          isOpen ? "bg-orange-50 text-red-700" : "text-gray-700 hover:bg-orange-50/50"
        )}
      >
        {item.label}
        <ChevronDown
          className={cn(
            "w-4 h-4 transition-transform duration-300",
            isOpen && "rotate-180"
          )}
        />
      </button>

      <div
        className={cn(
          "overflow-hidden bg-orange-50/40 rounded-lg ml-2 transition-all duration-300 ease-in-out",
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="py-1.5">
          {item.children.map((child) => (
            <Link
              key={child.label}
              to={child.href}
              onClick={onClose}
              className="flex flex-col px-4 py-2 rounded-md hover:bg-white/80 transition-all group"
            >
              <span className="text-sm font-semibold text-gray-700 group-hover:text-red-700">
                {child.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}