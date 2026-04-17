import React, { useState, useEffect } from 'react';
import { Home, Book, Droplets, Star, Users, ArrowRight, Sparkles, Clock, IndianRupee, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionHeader from '../common/SectionHeader';
import { useGetActivePujasQuery, useGetSettingsQuery } from '../../services/popularPujaApi';
import { BACKEND_URL, getImageUrl } from '../../config/apiConfig';

const RED = '#E8453C';

// Map icon strings to Lucide components
const iconMap = {
  Home,
  Book,
  Droplets,
  Star,
  Users,
  Sparkles
};

const PopularPujaServices = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // RTK Query
  const { data: pujaServices = [], isLoading: isPujasLoading } = useGetActivePujasQuery(undefined, { pollingInterval: 3000 });
  const { data: settings, isLoading: isSettingsLoading } = useGetSettingsQuery(undefined, { pollingInterval: 3000 });

  useEffect(() => { setTimeout(() => setIsVisible(true), 200); }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % pujaServices.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + pujaServices.length) % pujaServices.length);

  if (isPujasLoading || isSettingsLoading) {
      return <div className="py-20 text-center">Loading popular pujas...</div>;
  }

  return (
    <div className="relative py-10 px-3 sm:px-4 overflow-hidden bg-white">
      {/* Background patterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-16 left-8 w-60 h-60 rounded-full blur-2xl" style={{ backgroundColor: 'rgba(232,69,60,0.08)' }} />
        <div className="absolute bottom-16 right-8 w-80 h-80 rounded-full blur-2xl" style={{ backgroundColor: 'rgba(232,69,60,0.05)' }} />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <SectionHeader
          badge={settings?.badge || ''}
          title={settings?.title || ''}
          subtitle={settings?.subtitle || ''}
        />

        {/* Desktop Grid */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6 md:gap-8 mb-8">
          {pujaServices.map((puja, index) => {
            const Icon = iconMap[puja.iconName] || Star;
            const imageUrl = getImageUrl(puja.imageUrl);

            return (
              <div key={puja._id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.15}s`, animationFillMode: 'both' }}>
                <div className="relative block h-full bg-[#FFFCF5] rounded-3xl overflow-hidden border-2 border-[#FFC107]/20 hover:border-[#FFC107]/50 shadow-sm hover:shadow-[0_22px_50px_-12px_rgba(255,193,7,0.25)] transition-all duration-500 group">
                  {puja.popular && (
                    <div className="absolute top-4 right-4 z-20">
                      <div className="text-[#FFFCF5] text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md uppercase tracking-wider bg-[#E8453C]">Popular</div>
                    </div>
                  )}

                  {/* Decorative Header Area with Inset Image */}
                  <div className="relative p-3 pb-0">
                    <div className="relative h-44 md:h-52 rounded-2xl overflow-hidden shadow-md bg-[#2A1D13]">
                      {puja.imageUrl && (
                        <img
                          src={imageUrl}
                          alt={puja.name}
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                          loading="lazy"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#2A1D13]/60 via-transparent to-transparent opacity-80" />

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
                        {puja.name}
                      </h3>
                      <div className="w-10 h-0.5 bg-[#FFC107] mx-auto group-hover:w-20 transition-all duration-500 rounded-full" />
                    </div>

                    <p className="text-[#6D5B4F] text-[11px] md:text-xs leading-relaxed mb-4 font-medium line-clamp-2 h-8">
                      {puja.description}
                    </p>

                    <div className="flex items-center justify-between w-full mb-6 font-bold text-[#E8453C]">
                      <div className="flex items-center gap-1.5 text-xs bg-[#FFC107]/10 px-2.5 py-1 rounded-full border border-[#FFC107]/20">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{puja.duration}</span>
                      </div>
                      <div className="flex items-center gap-0.5 text-sm sm:text-base border border-[#E8453C]/20 px-2.5 py-1 rounded-full">
                        <IndianRupee className="w-3.5 h-3.5" />
                        <span>{puja.price.replace('₹', '')}</span>
                      </div>
                    </div>

                    {/* Vedic Button */}
                    <button 
                      onClick={() => window.dispatchEvent(new CustomEvent('openPoojaDrawer'))}
                      className="relative px-8 py-2.5 w-full bg-white border border-[#FFC107] text-[#E8453C] rounded-full font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] shadow-sm group-hover:bg-[#E8453C] group-hover:text-white group-hover:border-[#E8453C] transition-all duration-300">
                      <div className="flex items-center justify-center gap-2">
                        <span>Book Now</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
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

        {/* Mobile Carousel */}
        <div className="lg:hidden relative">
          <div className="overflow-hidden">
            <div className="flex transition-transform duration-300 ease-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              {pujaServices.map((puja) => {
                const Icon = iconMap[puja.iconName] || Star;
                const imageUrl = getImageUrl(puja.imageUrl);

                return (
                  <div key={puja._id} className="w-full flex-shrink-0 px-3">
                    <div className="relative block h-full bg-[#FFFCF5] rounded-3xl overflow-hidden border-2 border-[#FFC107]/20 hover:border-[#FFC107]/50 shadow-sm transition-all duration-500 group">

                      {puja.popular && (
                        <div className="absolute top-4 right-4 z-20">
                          <div className="text-[#FFFCF5] text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md uppercase tracking-wider bg-[#E8453C]">Popular</div>
                        </div>
                      )}

                      {/* Decorative Header Area with Inset Image */}
                      <div className="relative p-3 pb-0">
                        <div className="relative h-44 rounded-2xl overflow-hidden shadow-md bg-[#2A1D13]">
                          {puja.imageUrl && (
                            <img
                              src={imageUrl}
                              alt={puja.name}
                              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                              loading="lazy"
                            />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-[#2A1D13]/60 via-transparent to-transparent opacity-80" />
                          <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-[#FFC107] opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-1 -translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0" />
                          <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-[#FFC107] opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0" />
                        </div>
                      </div>

                      {/* Elegant Content Area */}
                      <div className="p-4 md:p-6 text-center relative flex flex-col items-center flex-grow">
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                          <div className="w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center border-4 border-[#FFFCF5] transition-transform duration-500 group-hover:scale-110">
                            <Icon className="w-5 h-5 text-[#E8453C]" strokeWidth={2.5} />
                          </div>
                        </div>

                        <div className="mt-5 mb-3 w-full">
                          <h3 className="text-lg font-bold text-[#4A3427] mb-1.5 tracking-tight group-hover:text-[#E8453C] transition-colors uppercase truncate px-2">
                            {puja.name}
                          </h3>
                          <div className="w-10 h-0.5 bg-[#FFC107] mx-auto group-hover:w-20 transition-all duration-500 rounded-full" />
                        </div>

                        <p className="text-[#6D5B4F] text-[11px] leading-relaxed mb-4 font-medium line-clamp-2 h-8">
                          {puja.description}
                        </p>

                        <div className="flex items-center justify-between w-full mb-6 font-bold text-[#E8453C]">
                          <div className="flex items-center gap-1.5 text-xs bg-[#FFC107]/10 px-2.5 py-1 rounded-full border border-[#FFC107]/20">
                            <Clock className="w-3" />
                            <span>{puja.duration}</span>
                          </div>
                          <div className="flex items-center gap-0.5 text-sm border border-[#E8453C]/20 px-2.5 py-1 rounded-full">
                            <IndianRupee className="w-3" />
                            <span>{puja.price.replace('₹', '')}</span>
                          </div>
                        </div>

                        {/* Vedic Button */}
                        <button 
                          onClick={() => window.dispatchEvent(new CustomEvent('openPoojaDrawer'))}
                          className="relative px-8 py-2.5 w-full bg-white border border-[#FFC107] text-[#E8453C] rounded-full font-bold text-[10px] uppercase tracking-[0.2em] shadow-sm group-hover:bg-[#E8453C] group-hover:text-white transition-all duration-300">
                          <div className="flex items-center justify-center gap-2">
                            <span>Book Now</span>
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {pujaServices.length > 1 && (
            <>
              <button onClick={prevSlide} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center transition-all z-10 hover:opacity-90 border border-[#FFC107]/20">
                <ChevronLeft className="w-5 h-5 text-[#E8453C]" />
              </button>
              <button onClick={nextSlide} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center transition-all z-10 hover:opacity-90 border border-[#FFC107]/20">
                <ChevronRight className="w-5 h-5 text-[#E8453C]" />
              </button>
              <div className="flex justify-center gap-1.5 mt-4">
                {[...Array(pujaServices.length)].map((_, idx) => (
                  <button key={idx} onClick={() => setCurrentSlide(idx)} className="h-1.5 rounded-full transition-all duration-300" style={{ backgroundColor: RED, width: idx === currentSlide ? '1.5rem' : '0.375rem', opacity: idx === currentSlide ? 1 : 0.3 }} />
                ))}
            </div>
            </>
          )}
        </div>

        {/* Bottom CTA */}
        {settings?.buttonText && (
          <div className={`text-center mt-10 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Link to={settings.buttonLink || '/pujaServices'} className="group inline-flex items-center gap-2 text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest text-xs shadow-[0_8px_25px_rgba(232,69,60,0.3)] hover:shadow-lg transition-all duration-300 hover:opacity-90 hover:-translate-y-1" style={{ backgroundColor: RED }}>
              {settings.buttonText}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default PopularPujaServices;