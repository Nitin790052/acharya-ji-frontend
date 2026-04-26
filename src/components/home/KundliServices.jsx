import React, { useState, useEffect } from 'react';
import {
  Book, Heart, AlertCircle, Calendar, ArrowRight, Sparkles, Star, Zap, Shield,
  Home, Building2, Gem, Circle, Leaf
} from 'lucide-react';
import SectionHeader from '../common/SectionHeader';
import { useGetActiveKundliServicesQuery, useGetKundliSettingsQuery } from '../../services/kundliApi';
import { BACKEND_URL } from '../../config/apiConfig';

const IconMap = {
  Book, Heart, AlertCircle, Calendar, Star, Sparkles, Shield, Zap,
  Home, Building2, Gem, Circle, Leaf
};

const KundliServices = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeService, setActiveService] = useState(0);

  const { data: services = [], isLoading: isServicesLoading } = useGetActiveKundliServicesQuery(undefined, { pollingInterval: 60000 });
  const { data: settings, isLoading: isSettingsLoading } = useGetKundliSettingsQuery(undefined, { pollingInterval: 60000 });

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 150);
  }, []);

  useEffect(() => {
    if (services.length > 0) {
      const interval = setInterval(() => {
        setActiveService((prev) => (prev + 1) % services.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [services.length]);

  const getImg = (url) => !url ? '' : url.startsWith('http') ? url : `${BACKEND_URL}${url}`;

  if (isServicesLoading || isSettingsLoading) {
    return <div className="py-20 text-center text-gray-400">Loading services...</div>;
  }

  return (
    <div className="relative py-10 px-3 overflow-hidden bg-white">
      <div className="absolute inset-0 opacity-3">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle, #E8453C 0.6px, transparent 0.6px)`,
          backgroundSize: '30px 30px'
        }} />
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full blur-3xl" style={{ backgroundColor: 'rgba(232,69,60,0.05)' }} />
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full blur-3xl" style={{ backgroundColor: 'rgba(232,69,60,0.04)' }} />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeader
          badge={settings?.badge || "Accurate Vedic Astrology"}
          title={settings?.title || "Kundli Services"}
          subtitle={settings?.subtitle || "Get detailed astrological insights with authentic Vedic calculations"}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-10">
          {services.map((service, index) => {
            const Icon = IconMap[service.iconName] || Book;
            const isActive = activeService === index;

            return (
              <div
                key={service._id}
                className={`relative transition-all duration-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
                style={{ transitionDelay: `${index * 120}ms` }}
                onMouseEnter={() => setActiveService(index)}
              >
                <div className="relative block h-full bg-[#FFFCF5] rounded-3xl overflow-hidden border-2 border-[#FFC107]/20 hover:border-[#FFC107]/50 shadow-sm hover:shadow-[0_22px_50px_-12px_rgba(255,193,7,0.25)] transition-all duration-500 group">

                  {service.popular && (
                    <div className="absolute top-4 right-4 z-20">
                      <div className="text-[#FFFCF5] text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md uppercase tracking-wider bg-[#E8453C] flex items-center gap-1">
                        <Zap className="w-2.5 h-2.5" />
                        Popular
                      </div>
                    </div>
                  )}

                  {/* Decorative Header Area with Inset Image */}
                  <div className="relative p-3 pb-0">
                    <div className="relative h-44 md:h-52 rounded-2xl overflow-hidden shadow-md bg-[#2A1D13]">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                        style={{ backgroundImage: `url('${getImg(service.imageUrl)}')` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#2A1D13]/60 via-transparent to-transparent opacity-80" />

                      {/* Price Badge */}
                      <div className="absolute bottom-3 right-3 z-10">
                        <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg font-bold text-sm shadow" style={{ color: '#E8453C' }}>
                          {service.price}
                        </div>
                      </div>

                      {/* Vedic Corner Brackets */}
                      <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-[#FFC107] opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-1 -translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0" />
                      <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-[#FFC107] opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0" />
                    </div>
                  </div>

                  {/* Elegant Content Area */}
                  <div className="p-5 md:p-6 text-center relative flex flex-col items-center flex-grow">
                    {/* Floating Icon Badge */}
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                      <div className="w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center border-4 border-[#FFFCF5] transition-transform duration-500 group-hover:scale-110">
                        <Icon className="w-5 h-5 text-amber-500" strokeWidth={2.5} />
                      </div>
                    </div>

                    <div className="mt-5 mb-3 w-full">
                      <h3 className="text-lg md:text-xl font-bold text-[#4A3427] mb-1.5 tracking-tight group-hover:text-[#E8453C] transition-colors uppercase truncate px-2">
                        {service.title}
                      </h3>
                      <div className="w-10 h-0.5 bg-[#FFC107] mx-auto group-hover:w-20 transition-all duration-500 rounded-full" />
                    </div>

                    <p className="text-[#6D5B4F] text-[11px] md:text-xs leading-relaxed mb-3 font-medium line-clamp-2 h-8">
                      {service.description}
                    </p>

                    {/* Features */}
                    <div className="w-full space-y-1 mb-4 text-left">
                      {(service.features || []).slice(0, 3).map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-[10px] text-[#6D5B4F]">
                          <div className="w-3.5 h-3.5 rounded-full flex items-center justify-center flex-shrink-0 bg-amber-400/20">
                            <Shield className="w-2 h-2 text-amber-500" strokeWidth={2.5} />
                          </div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Vedic Button */}
                    <button className="relative px-8 py-2.5 w-full bg-white border border-[#FFC107] text-[#E8453C] rounded-full font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] shadow-sm group-hover:bg-[#E8453C] group-hover:text-white group-hover:border-[#E8453C] transition-all duration-300 flex items-center justify-center gap-2">
                      <span>{service.cta || "Generate Free Kundli"}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Background Mandala-style Pattern (Subtle) */}
                  <div className="absolute -bottom-10 -right-10 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-700 pointer-events-none">
                    <Sparkles className="w-40 h-40 text-[#FFC107]" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>


        {/* Premium Slim Horizontal CTA Strip */}
        <div className={`mt-10 relative overflow-hidden rounded-2xl transition-all duration-700 delay-500 shadow-xl ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="absolute inset-0" style={{ backgroundColor: '#E8453C' }} />

          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 opacity-15 mix-blend-overlay" style={{
            backgroundImage: `radial-gradient(circle, #FFFFFF 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }} />

          {/* Golden Accents */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 transform -translate-x-1/2 translate-y-1/2"></div>

          <div className="relative z-10 px-6 py-5 md:py-6 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10">
            {/* Left Side: Text Content */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2 border border-white/20">
                <Star className="w-3 h-3 text-amber-300 animate-pulse" />
                Trusted by 50K+ Users
              </div>
              <h3 className="font-serif text-xl md:text-2xl font-bold text-white mb-1">
                Unlock Your Destiny with Vedic Wisdom
              </h3>
              <p className="text-sm text-white/90">
                Discover your life path through accurate Kundli analysis
              </p>
            </div>

            {/* Middle: Horizontal Action Buttons */}
            <div className="flex-shrink-0 flex sm:flex-row items-center gap-3 w-full sm:w-auto">
              <button className="flex-1 sm:flex-none group bg-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 hover:bg-slate-50 border border-white" style={{ color: '#E8453C' }}>
                <Book className="w-4 h-4" />
                Get Free Kundli
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                className="flex-1 sm:flex-none group px-5 py-2.5 rounded-xl font-bold text-sm text-white backdrop-blur-sm transition-all duration-300 flex items-center justify-center gap-2 border border-white/40 hover:bg-white/10"
              >
                <Heart className="w-4 h-4 text-amber-300" />
                Match Kundli
              </button>
            </div>

            {/* Right Side: Trust Horizontal Strip */}
            <div className="flex-shrink-0 hidden xl:flex text-white gap-8 border-l border-white/20 pl-10 py-1">
              <div className="flex flex-col items-center justify-center">
                <span className="text-lg font-black text-amber-300 mb-0.5">100%</span>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-white/80">Accurate</span>
              </div>
              <div className="flex flex-col items-center justify-center">
                <span className="text-lg font-black text-amber-300 mb-0.5">24/7</span>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-white/80">Support</span>
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="flex text-amber-300 mb-1">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-white/80">4.9/5 Rated</span>
              </div>
            </div>
          </div>

          {/* Subtle Mobile Stats (only visible on smaller screens when the right side is hidden) */}
          <div className="xl:hidden border-t border-white/10 px-6 py-3 bg-black/10 flex justify-between items-center text-[11px] text-white/90">
            <div className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-amber-300" /> <span>100% Accurate</span></div>
            <div className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-amber-300" /> <span>Free Basic</span></div>
            <div className="flex items-center gap-1.5"><Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300" /> <span>4.9/5 Rated</span></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }

        .from-saffron { --tw-gradient-from: #FF9933; }
        .to-saffron-dark { --tw-gradient-to: #FF6600; }
        .from-maroon { --tw-gradient-from: #800000; }
        .to-maroon-dark { --tw-gradient-to: #5C0000; }
        .from-gold { --tw-gradient-from: #FFD700; }
        .to-gold-dark { --tw-gradient-to: #DAA520; }
        .bg-cream { background-color: #FFF8E7; }
        .bg-gold-light { background-color: #FFEAA7; }
        .bg-saffron-light { background-color: #FFCC99; }
        .text-saffron { color: #FF9933; }
        .text-maroon { color: #800000; }
        .text-gold-light { color: #FFEAA7; }
        .border-saffron { border-color: #FF9933; }
        .shadow-gold { box-shadow: 0 16px 40px rgba(255, 215, 0, 0.2); }
      `}</style>
    </div>
  );
};

export default KundliServices;
