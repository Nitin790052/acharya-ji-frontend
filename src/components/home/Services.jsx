import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/slices/cartSlice';
import { Sparkles, Home, Video, Star, Package, Truck, Gift, ArrowRight, Flame, Moon, ScrollText, Shield, Leaf, ShoppingCart } from 'lucide-react';
import SectionHeader from '../common/SectionHeader';
import { useGetActiveServicesQuery } from '../../services/serviceApi';
import { API_URL, getImageUrl } from '../../config/apiConfig';


// Import local assets for fallbacks
import Puja_Services from "../../assets/coreServices/poojaServices.webp"
import Astrology_Consultation from "../../assets/coreServices/astrologer.webp"
import Kundli_Services from "../../assets/coreServices/KundliServices.webp"
import Vastu_Remedies from "../../assets/coreServices/Vastu&Remedies.webp"
import Healing_Spiritual from "../../assets/coreServices/Healing&Spiritual.webp"
import Shop from "../../assets/coreServices/Samagri&Gemstones.webp"
import HomePooja from "../../assets/detailedServices/HomeVisitPuja.webp"
import OnlinePuja from "../../assets/detailedServices/OnlinePuja.webp"
import SpecialAnushthan from "../../assets/detailedServices/SpecialAnushthan.webp"
import PujaSamagri from "../../assets/detailedServices/PujaSamagri.webp"
import PrasadDelivery from "../../assets/detailedServices/PrasadDelivery.webp"
import FestivalSpecials from "../../assets/detailedServices/FestivalSpecials.webp"

const iconMap = {
  Flame, Moon, ScrollText, Shield, Leaf, ShoppingCart, 
  Video, Home, Star, Package, Truck, Gift, ArrowRight, Sparkles
};

const imageFallbackMap = {
  'Puja Services': Puja_Services,
  'Astrology Consultation': Astrology_Consultation,
  'Kundli Services': Kundli_Services,
  'Vastu & Remedies': Vastu_Remedies,
  'Healing & Spiritual': Healing_Spiritual,
  'Shop': Shop,
  'Online Puja': OnlinePuja,
  'Home Visit Puja': HomePooja,
  'Special Anushthan': SpecialAnushthan,
  'Puja Samagri': PujaSamagri,
  'Prasad Delivery': PrasadDelivery,
  'Festival Specials': FestivalSpecials
};

export function Services() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { data: servicesData, isLoading, isError } = useGetActiveServicesQuery(undefined, {
    pollingInterval: 60000,
    refetchOnMountOrArgChange: true
  });

  const handleBookNow = (e, service) => {
    e.preventDefault();
    const displayImage = getImageUrl(service.imageUrl) || (imageFallbackMap[service.title] || OnlinePuja);
    
    window.dispatchEvent(new CustomEvent('openPoojaDrawer', { 
        detail: { 
            _id: service._id, 
            title: service.title, 
            price: service.price || 1100, 
            shortDescription: service.description, 
            imageUrl: displayImage 
        } 
    }));
  };

  if (isLoading || isError || !servicesData) {
    return null;
  }

  const { coreServices = [], detailedServices = [] } = servicesData;

  return (
    <>
      {/* Core Services Grid */}
      <section className="py-12 md:py-20 relative overflow-hidden bg-white">
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

        <div className="container mx-auto px-4 relative z-10">
          <SectionHeader
            badge="Quick Access"
            title="Our Core Services"
            subtitle="Choose from our comprehensive range of spiritual and wellness services"
          />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5">
            {coreServices.map((service, index) => {
              const IconComp = iconMap[service.icon] || Sparkles;
              const displayImage = getImageUrl(service.imageUrl) || (imageFallbackMap[service.title] || Puja_Services);
              return (
                <div
                  key={service._id}
                  className="group relative animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'both' }}
                >
                  <Link
                    to={service.href}
                    className="relative flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-12px_rgba(232,69,60,0.12)] hover:border-[#E8453C]/20 transition-all duration-500 group/card"
                  >
                    <div className="relative h-28 md:h-36 overflow-hidden bg-slate-50">
                      <img
                        src={displayImage}
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-60" />
                      <div className="absolute top-3 right-3 z-20">
                        <div className="w-8 h-8 md:w-9 md:h-9 rounded-xl bg-white/90 backdrop-blur-md flex items-center justify-center border border-white/50 shadow-sm group-hover/card:shadow-md transition-all group-hover/card:bg-[#E8453C] group-hover/card:border-[#E8453C] group-hover/card:rotate-[360deg] duration-500">
                          <IconComp className="w-4 h-4 md:w-4.5 md:h-4.5 text-[#E8453C] group-hover/card:text-white transition-colors duration-500" />
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 p-3 md:p-4 flex flex-col items-center text-center relative bg-white">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-slate-100 group-hover/card:bg-[#E8453C]/30 transition-colors" />
                      <h3 className="text-xs md:text-[13px] font-bold text-slate-800 mb-1 group-hover/card:text-[#E8453C] transition-colors line-clamp-1 uppercase tracking-wider">
                        {service.title}
                      </h3>
                      <p className="text-[10px] md:text-[11px] text-slate-500 group-hover/card:text-slate-600 transition-colors line-clamp-1 font-medium">
                        {service.description}
                      </p>
                      <div className="mt-4 flex items-center justify-center gap-1 opacity-0 group-hover/card:opacity-100 -translate-y-2 group-hover/card:translate-y-0 transition-all duration-300">
                        <span className="text-[10px] font-bold text-[#E8453C] uppercase tracking-widest">Explore</span>
                        <ArrowRight className="w-3 h-3 text-[#E8453C]" />
                      </div>
                    </div>
                    <div className="h-1 w-0 group-hover/card:w-full bg-[#E8453C] transition-all duration-500" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Detailed Services */}
      <section className="py-5 md:py-6 relative overflow-hidden bg-white">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-16 left-8 w-60 h-60 rounded-full blur-2xl" style={{ backgroundColor: 'rgba(232,69,60,0.08)' }} />
          <div className="absolute bottom-16 right-8 w-80 h-80 rounded-full blur-2xl" style={{ backgroundColor: 'rgba(232,69,60,0.05)' }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <SectionHeader
            badge="Our Divine Services"
            title="Spiritual Services for Every Need"
            subtitle="From daily worship to grand ceremonies, we offer comprehensive spiritual services to bring divine blessings into your life."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {detailedServices.map((service, index) => {
              const IconComp = iconMap[service.icon] || Sparkles;
              const displayImage = getImageUrl(service.imageUrl) || (imageFallbackMap[service.title] || OnlinePuja);
              return (
                <div key={service._id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.15}s`, animationFillMode: 'both' }}>
                  <div
                    onClick={(e) => handleBookNow(e, service)}
                    className="relative block h-full bg-[#FFFCF5] rounded-3xl overflow-hidden border-2 border-[#FFC107]/20 hover:border-[#FFC107]/50 shadow-sm hover:shadow-[0_22px_50px_-12px_rgba(255,193,7,0.25)] transition-all duration-500 group cursor-pointer"
                  >
                    <div className="relative p-3 pb-0">
                      <div className="relative h-44 md:h-52 rounded-2xl overflow-hidden shadow-md">
                        <img
                          src={displayImage}
                          alt={service.title}
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#2A1D13]/60 via-transparent to-transparent opacity-80" />
                        <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-[#FFC107] opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-1 -translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0" />
                        <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-[#FFC107] opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0" />
                      </div>
                    </div>
                    <div className="p-5 md:p-6 text-center relative flex flex-col items-center flex-grow">
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                        <div className="w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center border-4 border-[#FFFCF5] transition-transform duration-500 group-hover:scale-110">
                          <IconComp className="w-5 h-5 text-amber-500" strokeWidth={2.5} />
                        </div>
                      </div>
                      <div className="mt-5 mb-3 w-full">
                        <h3 className="text-lg md:text-xl font-bold text-[#4A3427] mb-1.5 tracking-tight group-hover:text-[#E8453C] transition-colors uppercase">
                          {service.title}
                        </h3>
                        <div className="w-10 h-0.5 bg-[#FFC107] mx-auto group-hover:w-20 transition-all duration-500 rounded-full" />
                      </div>
                      <p className="text-[#6D5B4F] text-[11px] md:text-xs leading-relaxed mb-6 flex-grow font-medium line-clamp-3">
                        {service.description}
                      </p>
                      <div className="relative px-8 py-2.5 bg-white border border-[#FFC107] text-[#E8453C] rounded-full font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] shadow-sm group-hover:bg-[#E8453C] group-hover:text-white group-hover:border-[#E8453C] transition-all duration-300">
                        <div className="flex items-center gap-2">
                          <span>Book Now</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                    <div className="absolute -bottom-10 -right-10 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-700 pointer-events-none">
                      <Sparkles className="w-40 h-40 text-[#FFC107]" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
