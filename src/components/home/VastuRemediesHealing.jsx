import React, { useState, useEffect } from 'react';
import { 
  Home, Building2, Gem, Circle, Leaf, ArrowRight, Sparkles, Shield, Star, CheckCircle,
  Book, Heart, AlertCircle, Calendar, Zap
} from 'lucide-react';
import SectionHeader from '../common/SectionHeader';
import { useGetActiveVastuServicesQuery, useGetVastuSettingsQuery } from '../../services/vastuApi';
import { BACKEND_URL, getImageUrl } from '../../config/apiConfig';

const IconMap = {
  Home, Building2, Gem, Circle, Leaf, Shield, Sparkles, Star,
  Book, Heart, AlertCircle, Calendar, Zap
};

const VastuRemediesHealing = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  const { data: services = [], isLoading: isServicesLoading } = useGetActiveVastuServicesQuery(undefined, { pollingInterval: 60000 });
  const { data: settings, isLoading: isSettingsLoading } = useGetVastuSettingsQuery(undefined, { pollingInterval: 60000 });

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 150);
  }, []);


  if (isServicesLoading || isSettingsLoading) {
    return <div className="py-20 text-center text-gray-400">Loading services...</div>;
  }

  return (
    <div className="relative py-10 px-3 overflow-hidden bg-gray-50/40">

      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeader
          badge={settings?.badge || "Transform Your Life"}
          title={settings?.title || "Vastu, Remedies & Healing"}
          subtitle={settings?.subtitle || "Ancient wisdom meets modern solutions for holistic well-being and prosperity"}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-10">
          {services.map((service, index) => {
            const Icon = IconMap[service.iconName] || Home;

            return (
              <div
                key={service._id}
                className={`relative transition-all duration-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'} ${index === 4 ? 'md:col-span-2 lg:col-span-1' : ''}`}
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <div className="relative block h-full bg-[#FFFCF5] rounded-3xl overflow-hidden border-2 border-[#FFC107]/20 hover:border-[#FFC107]/50 shadow-sm hover:shadow-[0_22px_50px_-12px_rgba(255,193,7,0.25)] transition-all duration-500 group">

                  {service.popular && (
                    <div className="absolute top-4 right-4 z-20">
                      <div className="text-[#FFFCF5] text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md uppercase tracking-wider bg-[#E8453C] flex items-center gap-1 animate-pulse">
                        <Star className="w-2.5 h-2.5 fill-white" />
                        Trending
                      </div>
                    </div>
                  )}

                  {/* Decorative Header Area with Inset Image */}
                  <div className="relative p-3 pb-0">
                    <div className="relative h-44 md:h-52 rounded-2xl overflow-hidden shadow-md bg-[#2A1D13]">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                        style={{ backgroundImage: `url('${getImageUrl(service.imageUrl)}')` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#2A1D13]/60 via-transparent to-transparent opacity-80" />


                      {/* Price Badge */}
                      <div className="absolute top-3 right-3 z-10">
                        <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg font-bold text-sm shadow" style={{ color: '#E8453C' }}>
                          {service.price}
                        </div>
                      </div>

                      {/* Vedic Corner Brackets */}
                      <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-[#FFC107] opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-x-1 -translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0" />
                      <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-[#FFC107] opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0" />
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

                    {/* Benefits Badges */}
                    <div className="flex flex-wrap justify-center gap-1.5 mb-3 w-full">
                      {(service.benefits || []).map((benefit, idx) => (
                        <div key={idx} className="bg-amber-50 border border-amber-200 text-amber-700 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wide shadow-sm">
                          {benefit}
                        </div>
                      ))}
                    </div>

                    {/* Features */}
                    <div className="w-full grid grid-cols-2 gap-1.5 mb-4 text-left">
                      {(service.features || []).slice(0, 4).map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-[10px] text-[#6D5B4F] ml-6">
                          <div className="w-3.5 h-3.5 rounded-full flex items-center justify-center flex-shrink-0 bg-amber-400/20">
                            <CheckCircle className="w-2 h-2 text-amber-500" strokeWidth={2.5} />
                          </div>
                          <span className="truncate">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Vedic Button */}
                    <button className="relative px-8 py-2.5 w-full bg-white border border-[#FFC107] text-[#E8453C] rounded-full font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] shadow-sm group-hover:bg-[#E8453C] group-hover:text-white group-hover:border-[#E8453C] transition-all duration-300 flex items-center justify-center gap-2">
                      <span>Consult Expert</span>
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


        <div className={`rounded-3xl p-6 md:p-8 text-center shadow-xl transition-all duration-700 delay-500 relative overflow-hidden ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ backgroundColor: '#E8453C' }}>
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 1px)', backgroundSize: '16px 16px' }} />

          <div className="max-w-3xl mx-auto relative z-10">
            <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-4">
              <Shield className="w-3 h-3" />
              Certified & Authentic
            </div>

            <h3 className="font-serif text-xl md:text-2xl font-black text-white mb-2 uppercase tracking-tight">
              Why Choose Our Services?
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              {[
                { icon: Shield, title: '100% Authentic', desc: 'Certified & Genuine' },
                { icon: Star, title: 'Expert Advice', desc: '20+ Years Exp.' },
                { icon: CheckCircle, title: 'Proven Results', desc: '10K+ Happy Seekers' }
              ].map((item, idx) => {
                const ItemIcon = item.icon;
                return (
                  <div key={idx} className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 hover:bg-white/15 transition-all text-left flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                      <ItemIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-black text-xs uppercase tracking-wide mb-0.5">{item.title}</h4>
                      <p className="text-white/70 text-[10px] font-medium leading-tight">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
              <button className="group bg-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg transition-all duration-300 flex items-center gap-2 hover:scale-105" style={{ color: '#E8453C' }}>
                <Sparkles className="w-4 h-4" />
                Get Free Consultation
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button className="group border border-white/30 text-white px-6 py-2.5 rounded-xl font-bold text-sm backdrop-blur-sm hover:bg-white transition-all duration-300 flex items-center gap-1.5 hover:text-[#E8453C]">
                <Shield className="w-4 h-4" />
                View Certificates
              </button>
            </div>
          </div>
        </div>

        <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 transition-all duration-800 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {[
            { number: '10K+', label: 'Clients', icon: Star },
            { number: '100%', label: 'Satisfaction', icon: CheckCircle },
            { number: '20+', label: 'Experience', icon: Shield },
            { number: '5K+', label: 'Remedies', icon: Sparkles }
          ].map((stat, index) => {
            const StatIcon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-4 text-center shadow-sm border border-slate-100 transition-all duration-300 hover:shadow-md group"
              >
                <StatIcon className="w-5 h-5 mx-auto mb-2 transition-transform group-hover:scale-110" style={{ color: '#E8453C' }} />
                <div className="text-xl font-black mb-0.5 tracking-tight" style={{ color: '#E8453C' }}>
                  {stat.number}
                </div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-16px) translateX(8px); }
        }

        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-24px); }
        }

        @keyframes float-slower {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }

        .animate-float-slower {
          animation: float-slower 10s ease-in-out infinite;
        }

        .from-saffron { --tw-gradient-from: #FF9933; }
        .to-saffron-dark { --tw-gradient-to: #FF6600; }
        .from-maroon { --tw-gradient-from: #800000; }
        .to-maroon-dark { --tw-gradient-to: #5C0000; }
        .from-gold { --tw-gradient-from: #FFD700; }
        .to-gold-dark { --tw-gradient-to: #DAA520; }
        .bg-cream { background-color: #FFF8E7; }
        .bg-saffron-light { background-color: #FFCC99; }
        .bg-gold-light { background-color: #FFEAA7; }
        .text-saffron { color: #FF9933; }
        .text-maroon { color: #800000; }
        .border-saffron { border-color: #FF9933; }
        .shadow-gold { box-shadow: 0 16px 40px rgba(255, 215, 0, 0.3); }
        .from-saffron\/10 { --tw-gradient-from: rgba(255, 153, 51, 0.1); }
        .bg-saffron\/20 { background-color: rgba(255, 153, 51, 0.2); }
        .bg-maroon\/20 { background-color: rgba(128, 0, 0, 0.2); }
        .bg-gold\/20 { background-color: rgba(255, 215, 0, 0.2); }
      `}</style>
    </div>
  );
};

export default VastuRemediesHealing;
