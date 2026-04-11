import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, Star, Award, TrendingUp, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import SectionHeader from '../common/SectionHeader';
import { useGetActiveAstrologersQuery, useGetSettingsQuery } from '../../services/astrologerApi';
import { BACKEND_URL } from '../../config/apiConfig';

const RED = '#E8453C';

const TalkToAstrologer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // RTK Query - with pollingInterval for real-time updates
  const { data: astrologers = [], isLoading: isAstrologersLoading } = useGetActiveAstrologersQuery(undefined, {
    pollingInterval: 3000
  });
  const { data: settings, isLoading: isSettingsLoading } = useGetSettingsQuery(undefined, {
    pollingInterval: 3000
  });

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 150);
    if (astrologers.length === 0) return;
    const interval = setInterval(() => setCurrentSlide((prev) => (prev + 1) % astrologers.length), 5000);
    return () => clearInterval(interval);
  }, [astrologers.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % astrologers.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + astrologers.length) % astrologers.length);

  const getImageSrc = (imageUrl) => {
    if (!imageUrl) return '';
    return imageUrl.startsWith('http') ? imageUrl : `${BACKEND_URL}${imageUrl}`;
  };

  if (isAstrologersLoading || isSettingsLoading) {
    return (
      <div className="relative py-12 md:py-10 bg-white flex items-center justify-center min-h-[300px]">
        <div className="text-gray-400 text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="relative py-12 md:py-10 overflow-hidden bg-white">
      {/* Artistic Background Design */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white to-[#FFFBEA]" />
        <div className="absolute top-0 right-0 w-[45%] h-full">
          <div className="absolute inset-0 bg-gradient-to-l from-orange-50/50 to-transparent" />
          <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#FFF3D0]/40 rounded-full blur-[120px] mix-blend-multiply" />
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: `repeating-linear-gradient(45deg, #F59E0B 0, #F59E0B 1px, transparent 0, transparent 20px)`,
              maskImage: 'linear-gradient(to left, black, transparent)'
            }}
          />
          <div
            className="absolute bottom-[-5%] right-[-5%] w-96 h-96 opacity-[0.05]"
            style={{
              backgroundImage: `radial-gradient(#B45309 2px, transparent 2px)`,
              backgroundSize: '40px 40px'
            }}
          />
        </div>
        <div className="absolute top-0 left-0 w-64 h-64 bg-slate-50 rounded-full blur-[100px] opacity-60" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header - Dynamic */}
        <SectionHeader
          badge={settings?.badge || 'Live Consultation Available'}
          title={settings?.title || 'Talk to Expert Astrologers'}
          subtitle={settings?.subtitle || 'Get personalized guidance from verified astrologers available 24/7'}
        />

        {/* Astrologer Cards */}
        <div className={`transition-all duration-700 delay-150 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

          {/* Desktop Grid */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-8 mb-12">
            {astrologers.map((astrologer) => (
              <div key={astrologer._id} className="relative group h-full">
                <div className="relative h-full bg-[#FFFCF5] rounded-[2rem] overflow-hidden border-2 border-[#FFC107]/20 hover:border-[#FFC107]/60 shadow-sm hover:shadow-[0_20px_45px_-12px_rgba(255,193,7,0.3)] transition-all duration-500 flex flex-col group/card">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#FFC107]/5 rounded-full -mr-12 -mt-12 transition-transform duration-700 group-hover/card:scale-150" />

                  {/* Image Section */}
                  <div className="relative p-2 pb-0">
                    <div className="relative h-52 rounded-2xl overflow-hidden shadow-md bg-[#2A1D13]">
                      <img
                        src={getImageSrc(astrologer.imageUrl)}
                        alt={astrologer.name}
                        className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover/card:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#2A1D13]/70 via-transparent to-transparent opacity-80" />

                      {/* Online Badge */}
                      {astrologer.online && (
                        <div className="absolute top-3 right-3 z-20">
                          <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full shadow-lg border border-green-100">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                            <span className="text-[9px] font-black uppercase tracking-widest text-green-600">Online</span>
                          </div>
                        </div>
                      )}
                      <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-[#FFC107] opacity-0 group-hover/card:opacity-100 transition-all duration-500 -translate-x-1 -translate-y-1 group-hover/card:translate-x-0 group-hover/card:translate-y-0" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 pt-4 text-center flex flex-col items-center flex-grow relative">
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                      <div className="w-11 h-11 rounded-full bg-white shadow-xl flex items-center justify-center border-4 border-[#FFFCF5] transition-transform duration-500 group-hover/card:scale-110">
                        <Sparkles className="w-4.5 h-4.5 text-amber-500" />
                      </div>
                    </div>

                    <div className="mt-4 mb-3 w-full">
                      <h4 className="text-lg font-bold text-[#4A3427] mb-1.5 tracking-tight group-hover/card:text-[#FFC107] transition-colors uppercase font-serif px-2">
                        {astrologer.name}
                      </h4>
                      <div className="w-8 h-0.5 bg-[#FFC107] mx-auto transition-all duration-500 rounded-full" />
                    </div>

                    <div className="flex items-center justify-center gap-3 mb-3">
                      <div className="flex items-center gap-1.5 bg-white px-2.5 py-0.5 rounded-full shadow-sm border border-amber-100 font-black">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="text-xs text-[#E8453C]">{astrologer.rating}</span>
                      </div>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none">
                        {astrologer.reviews} Reviews
                      </span>
                    </div>

                    <div className="flex items-center justify-center gap-4 mb-4 w-full text-[10px] font-bold uppercase tracking-wider text-[#6D5B4F]">
                      <div className="flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5 text-amber-500" />
                        <span>{astrologer.experience}</span>
                      </div>
                      <div className="w-1 h-1 bg-slate-300 rounded-full" />
                      <div className="flex items-center gap-1.5">
                        <TrendingUp className="w-3.5 h-3.5 text-amber-500" />
                        <span>{astrologer.consultations}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap justify-center gap-1.5 mb-5">
                      {(astrologer.expertise || []).map((exp, idx) => (
                        <span key={idx} className="text-[8px] font-black uppercase tracking-widest px-2.5 py-1.5 rounded-full bg-white border border-[#FFC107]/20 text-[#E8453C] shadow-sm group-hover/card:border-[#E8453C]/20 transition-colors">
                          {exp}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-2.5 w-full mt-auto">
                      <button className="group/btn relative px-3 py-2.5 bg-[#22C55E] text-white rounded-xl font-black text-[9px] uppercase tracking-[0.2em] shadow-lg shadow-green-100 hover:shadow-green-200 transition-all active:scale-95 overflow-hidden flex items-center justify-center gap-1.5">
                        <div className="absolute inset-0 bg-white/10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                        <Phone className="w-3 h-3 relative z-10" />
                        <span className="relative z-10">Call</span>
                      </button>
                      <button className="group/btn relative px-3 py-2.5 bg-[#E8453C] text-white rounded-xl font-black text-[9px] uppercase tracking-[0.2em] shadow-lg shadow-red-100 hover:shadow-red-200 transition-all active:scale-95 overflow-hidden flex items-center justify-center gap-1.5">
                        <div className="absolute inset-0 bg-white/10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                        <MessageCircle className="w-3 h-3 relative z-10" />
                        <span className="relative z-10">Chat</span>
                      </button>
                    </div>
                  </div>

                  <div className="absolute -bottom-10 -right-10 opacity-[0.03] group-hover/card:opacity-[0.08] transition-opacity duration-700 pointer-events-none">
                    <Sparkles className="w-40 h-40 text-[#FFC107]" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Carousel */}
          {astrologers.length > 0 && (
            <div className="lg:hidden relative">
              <div className="overflow-hidden">
                <div className="flex transition-transform duration-300 ease-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                  {astrologers.map((astrologer) => (
                    <div key={astrologer._id} className="w-full flex-shrink-0 px-3">
                      <div className="relative bg-[#FFFCF5] rounded-[2rem] overflow-hidden border-2 border-[#FFC107]/20 shadow-lg flex flex-col">
                        <div className="relative p-2.5 pb-0">
                          <div className="relative h-48 rounded-2xl overflow-hidden shadow-md bg-[#2A1D13]">
                            <img src={getImageSrc(astrologer.imageUrl)} alt={astrologer.name} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#2A1D13] via-transparent to-transparent opacity-60" />
                          </div>
                        </div>
                        <div className="p-6 text-center">
                          <h4 className="text-lg font-serif font-black text-[#4A3427] mb-2 uppercase tracking-wide">{astrologer.name}</h4>
                          <div className="flex items-center justify-center gap-3 mb-6">
                            <div className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-full shadow-sm border border-amber-100 font-black">
                              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                              <span className="text-[10px] text-[#E8453C]">{astrologer.rating}</span>
                            </div>
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{astrologer.reviews} Reviews</span>
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <button className="flex items-center justify-center gap-2 bg-[#22C55E] text-white py-3.5 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-green-50">
                              <Phone className="w-4 h-4" /> Call
                            </button>
                            <button className="flex items-center justify-center gap-2 bg-[#E8453C] text-white py-3.5 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-red-50">
                              <MessageCircle className="w-4 h-4" /> Chat
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button onClick={prevSlide} className="absolute left-0 top-[40%] -translate-y-1/2 -translate-x-2 w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center transition-all z-20 border border-amber-100">
                <ChevronLeft className="w-5 h-5 text-[#E8453C]" />
              </button>
              <button onClick={nextSlide} className="absolute right-0 top-[40%] -translate-y-1/2 translate-x-2 w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center transition-all z-20 border border-amber-100">
                <ChevronRight className="w-5 h-5 text-[#E8453C]" />
              </button>
              <div className="flex justify-center gap-1.5 mt-6">
                {astrologers.map((_, idx) => (
                  <button key={idx} onClick={() => setCurrentSlide(idx)} className="h-1.5 rounded-full transition-all duration-300" style={{ backgroundColor: RED, width: idx === currentSlide ? '1.5rem' : '0.375rem', opacity: idx === currentSlide ? 1 : 0.3 }} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TalkToAstrologer;