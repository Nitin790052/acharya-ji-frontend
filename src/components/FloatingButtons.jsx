import React, { useState } from "react";
import { Sparkles, Bot } from "lucide-react";
import BookPoojaDrawer from "./home/BookPoojaDrawer";
import { useUserAuth } from "@/app/user/auth/AuthContext";
import { useNavigate } from "react-router-dom";

const FloatingButtons = ({ isHomePage }) => {
  const [poojaOpen, setPoojaOpen] = useState(false);
  const [initialService, setInitialService] = useState(null);
  const { user } = useUserAuth();
  const navigate = useNavigate();
  
  React.useEffect(() => {
    const handleOpen = (e) => {
        setPoojaOpen(true);
        if (e.detail) {
            setInitialService(e.detail);
        } else {
            setInitialService(null);
        }
    };
    window.addEventListener('openPoojaDrawer', handleOpen);
    return () => window.removeEventListener('openPoojaDrawer', handleOpen);
  }, []);

  return (
    <>
      {/* LEFT CENTER - Book Pooja Trigger */}
      <div className="fixed left-0 top-1/2 -translate-y-1/2 z-[999]">
        <button
          onClick={() => {
            setPoojaOpen(true);
          }}
          className={`group relative bg-[#E8453C] text-yellow-300 px-2 py-5 rounded-r-xl shadow-[4px_0_15px_rgba(232,69,60,0.25)] flex items-center justify-center gap-3 [writing-mode:vertical-lr] border-y border-r border-[#c73530] transition-all hover:translate-x-1 active:scale-95 ${isHomePage ? 'animate-slide-in-left' : 'opacity-100'}`}
          style={isHomePage ? { animationDelay: '0.5s' } : {}}
        >
          {/* Shine Effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent -translate-y-full group-hover:translate-y-full transition-transform duration-1000" />

          <div className="relative flex items-center gap-2">
            <Sparkles className="w-3 h-3 rotate-90 text-yellow-300/80" />
            <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.15em] font-inter text-yellow-300">Book Your Pooja</span>
            <span className="w-1 h-1 bg-yellow-300 rounded-full animate-pulse shadow-[0_0_8px_rgba(253,224,71,0.6)]" />
          </div>
        </button>
      </div>

      {/* RIGHT BOTTOM - Chatbot */}
      <div className="fixed right-5 bottom-8 z-[999]">
        <button
          className={`relative bg-gradient-to-br from-orange-500 to-red-600 text-yellow-300 p-4 rounded-full shadow-2xl transition-all duration-300 group overflow-hidden hover:scale-110 active:scale-95 ${isHomePage ? 'animate-fade-in-up' : 'opacity-100'}`}
          style={isHomePage ? { animationDelay: '0.8s' } : {}}
        >
          <Bot className="w-6 h-6 relative z-10" />
          <div
            className="absolute inset-0 border-2 border-orange-300 rounded-full animate-ping opacity-30"
          />
        </button>
      </div>

      <BookPoojaDrawer open={poojaOpen} onClose={() => setPoojaOpen(false)} initialService={initialService} />
    </>
  );
};

export default FloatingButtons;
