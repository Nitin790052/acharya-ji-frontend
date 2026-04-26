import React, { useState, useEffect } from 'react';
import { Smartphone, Download, Star, Zap, Shield, Clock, ArrowRight, Sparkles, CheckCircle } from 'lucide-react';
import SectionHeader from '../common/SectionHeader';

import { useGetAppDownloadSettingsQuery } from '../../services/appDownloadApi';

const AppDownloadCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { data: settings, isLoading } = useGetAppDownloadSettingsQuery();

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 150);
  }, []);

  const iconMap = { Zap, Clock, Shield, Star, Smartphone, Download, ArrowRight, Sparkles, CheckCircle };

  if (isLoading || !settings) return null;

  return (
    <div className="relative py-8 px-3 overflow-hidden bg-gradient-to-br from-[#E8453C] via-[#ff5b52] to-[#ff8c85]">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='48' height='48' viewBox='0 0 48 48' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFFFFF' fill-opacity='0.15'%3E%3Cpath d='M28.8 27.2v-3.2h-1.6v3.2h-3.2v1.6h3.2v3.2h1.6v-3.2h3.2v-1.6h-3.2zm0-24V0h-1.6v3.2h-3.2v1.6h3.2v3.2h1.6V4.8h3.2V3.2h-3.2zM4.8 27.2v-3.2H3.2v3.2H0v1.6h3.2v3.2h1.6v-3.2h3.2v-1.6H4.8zM4.8 3.2V0H3.2v3.2H0v1.6h3.2v3.2h1.6V4.8h3.2V3.2H4.8z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '48px 48px'
        }} />
      </div>

      {/* Glowing Orbs - Brighter */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-[100px] bg-white/20 animate-pulse-slow" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full blur-[80px] bg-yellow-400/10 animate-pulse-slower" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center">

          {/* Left Content */}
          <div className={`transition-all duration-800 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <SectionHeader
              badge={settings.badge}
              title={settings.title}
              subtitle={settings.subtitle}
              light={true}
              compact={true}
              className="text-left mb-5"
            />

            {/* Features Grid - Glassmorphism */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              {settings.features.map((feature, index) => {
                const Icon = iconMap[feature.icon] || Zap;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-2.5 bg-white/15 backdrop-blur-xl rounded-xl p-3 border border-white/30 hover:bg-white/25 transition-all duration-300 group shadow-lg shadow-black/5"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-sm">
                      <Icon className="w-4 h-4" strokeWidth={2.5} style={{ color: '#E8453C' }} />
                    </div>
                    <span className="text-white font-bold text-xs">{feature.text}</span>
                  </div>
                );
              })}
            </div>

            {/* App Store Buttons - Compact */}
            <div className="flex flex-wrap gap-3 mb-5">
              <a href={settings.googlePlayUrl} className="flex items-center gap-2.5 bg-black hover:bg-gray-900 text-white px-5 py-2.5 rounded-xl transition-all duration-300 hover:scale-[1.03] shadow-lg border border-white/10">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" /></svg>
                <div className="text-left">
                  <div className="text-[10px] opacity-70">GET IT ON</div>
                  <div className="text-sm font-bold leading-tight">Google Play</div>
                </div>
              </a>
              <a href={settings.appStoreUrl} className="flex items-center gap-2.5 bg-black hover:bg-gray-900 text-white px-5 py-2.5 rounded-xl transition-all duration-300 hover:scale-[1.03] shadow-lg border border-white/10">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" /></svg>
                <div className="text-left">
                  <div className="text-[10px] opacity-70">Download on the</div>
                  <div className="text-sm font-bold leading-tight">App Store</div>
                </div>
              </a>
            </div>

            {/* Stats - Horizontal */}
            <div className="flex gap-6 border-t border-white/10 pt-4">
              {settings.stats.map((stat, index) => (
                <div key={index}>
                  <div className="text-xl font-black text-white">{stat.number}</div>
                  <div className="text-[10px] text-white/70 uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Phone Mockup - Scaled down */}
          <div className={`relative transition-all duration-800 delay-250 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="relative mx-auto max-w-[260px]">
              {/* Phone Frame */}
              <div className="relative bg-gray-900 rounded-[2.2rem] p-2 shadow-2xl border-2 border-white/10 scale-95 origin-center">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-gray-900 rounded-b-xl z-10" />
                <div className="relative bg-[#FDFCFB] rounded-[1.8rem] overflow-hidden aspect-[9/18]">
                  <div className="absolute inset-0">
                    <div className="p-4 pb-8" style={{ background: 'linear-gradient(135deg, #E8453C, #ff6b6b)' }}>
                      <div className="flex items-center justify-between text-white mb-4">
                        <div className="flex items-center gap-1">
                          <Sparkles className="w-4 h-4" />
                          <span className="font-bold text-sm">Acharya Ji</span>
                        </div>
                        <div className="bg-white/20 rounded-full px-1.5 py-0.2">
                          <Star className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400" />
                        </div>
                      </div>
                      <h3 className="text-white text-lg font-bold">Welcome Back!</h3>
                      <p className="text-white/80 text-[9px]">Book spiritual services today</p>
                    </div>

                    <div className="px-2.5 -mt-4 space-y-2">
                      <div className="bg-white rounded-lg p-2.5 shadow-sm border border-gray-100 flex items-center gap-2">
                        <div className="w-8 h-8 rounded bg-[#E8453C] flex items-center justify-center">
                          <Sparkles className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-[10px]" style={{ color: '#E8453C' }}>Book Puja</h4>
                          <p className="text-gray-500 text-[8px]">Live Darshan</p>
                        </div>
                        <CheckCircle className="w-3 h-3 text-green-500" />
                      </div>

                      <div className="bg-white rounded-lg p-2.5 shadow-sm border border-gray-100 flex items-center gap-2">
                        <div className="w-8 h-8 rounded bg-[#E8453C] flex items-center justify-center">
                          <Star className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-[10px]" style={{ color: '#E8453C' }}>Consultation</h4>
                          <p className="text-gray-500 text-[8px]">Verified Acharyas</p>
                        </div>
                        <CheckCircle className="w-3 h-3 text-green-500" />
                      </div>
                    </div>
                  </div>
                  {/* Glass Shine */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Floaties */}
              <div className="absolute -top-4 -right-2 w-12 h-12 rounded-full flex items-center justify-center shadow-lg animate-float bg-white z-20">
                <Download className="w-6 h-6 text-[#E8453C]" />
              </div>
              <div className="absolute bottom-10 -left-4 w-10 h-10 rounded-full flex items-center justify-center shadow-lg animate-float bg-white z-20" style={{ animationDelay: '0.5s' }}>
                <Star className="w-5 h-5 fill-[#E8453C] text-[#E8453C]" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Banner - Brighter & More Integrated */}
        <div className={`mt-8 bg-white/10 backdrop-blur-md border border-white/30 rounded-2xl p-4 md:p-5 text-center transition-all duration-800 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-white">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md">
              <Smartphone className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 text-left md:text-center">
              <h3 className="text-lg font-bold">{settings.offerTitle}</h3>
              <p className="text-white/80 text-xs font-medium">{settings.offerDescription}</p>
            </div>
            <button className="bg-white text-[#E8453C] px-6 py-2.5 rounded-xl font-bold text-sm shadow-xl hover:shadow-white/20 hover:scale-105 transition-all flex items-center gap-1.5">
              {settings.offerButtonText}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(5deg); }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 0.25; transform: scale(1.1); }
        }

        @keyframes pulse-slower {
          0%, 100% { opacity: 0.08; transform: scale(1); }
          50% { opacity: 0.15; transform: scale(1.15); }
        }

        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 8s ease-in-out infinite; }
        .animate-pulse-slower { animation: pulse-slower 12s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default AppDownloadCTA;
