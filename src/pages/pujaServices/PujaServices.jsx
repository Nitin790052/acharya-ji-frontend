import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Search, ChevronRight, BookOpen, Star,
  Clock, Sparkles, Award, Video, Home, MessageCircle, Phone,
  Leaf, Calendar, Sparkle, Search as SearchIcon
} from "lucide-react";
import { Layout } from '@/components/layout/Layout';
import { usePageBanner } from "@/hooks/usePageBanner";
import { useGetAllOfferingsQuery } from "@/services/pujaOfferingApi";
import { useGetActivePujasQuery } from "@/services/popularPujaApi";
import { useGetActiveServicesQuery } from "@/services/serviceApi";
import { BACKEND_URL } from "@/config/apiConfig";

const PujaServices = () => {
  const banner = usePageBanner({ pollingInterval: 3000 });
  const bannerImage = banner?.imageUrl ? (banner.imageUrl.startsWith('http') ? banner.imageUrl : `${BACKEND_URL}${banner.imageUrl}`) : null;

  // --- FETCHING FROM ALL RELEVANT APIs ---
  const { data: offerings = [], isLoading: isOfferingsLoading } = useGetAllOfferingsQuery();
  const { data: popularPujas = [], isLoading: isPopularLoading } = useGetActivePujasQuery();
  const { data: generalServices = [], isLoading: isServicesLoading } = useGetActiveServicesQuery();

  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // --- CONSOLIDATE AND NORMALIZE DATA ---
  const allServicesCombined = useMemo(() => {
    // Safety check: Ensure all sources are arrays
    const safeOfferings = Array.isArray(offerings) ? offerings : [];
    const safePopular = Array.isArray(popularPujas) ? popularPujas : [];
    const safeServices = Array.isArray(generalServices) ? generalServices : [];

    // Normalize Puja Offerings (Primary Source)
    const normalizedOfferings = safeOfferings.map(o => ({
      ...o,
      _id: o._id || o.id,
      title: o.title,
      shortDescription: o.shortDescription,
      price: o.price,
      duration: o.duration,
      imageUrl: o.imageUrl,
      category: o.category || "Puja Rituals",
      slug: o.slug,
      source: 'offering'
    }));

    // Normalize Popular Pujas
    const normalizedPopular = safePopular.map(p => ({
      ...p,
      _id: p._id || p.id,
      title: p.name, // Mapping 'name' to 'title'
      shortDescription: p.description, // Mapping 'description' to 'shortDescription'
      price: p.price,
      duration: p.duration,
      imageUrl: p.imageUrl,
      category: p.category || "Popular Rituals",
      slug: p.slug || `puja/${p._id}`,
      source: 'popular'
    }));

    // Normalize General Services
    const normalizedServices = safeServices.map(s => ({
      ...s,
      _id: s._id || s.id,
      title: s.title || s.name,
      shortDescription: s.shortDescription || s.description,
      price: s.price,
      duration: s.duration || "Consultation",
      imageUrl: s.imageUrl,
      category: s.category || "Vedic Services",
      slug: s.slug || `service/${s._id}`,
      source: 'service'
    }));

    // De-duplicate based on title/slug to avoid showing the same thing twice if it's in multiple APIs
    const merged = [...normalizedOfferings, ...normalizedPopular, ...normalizedServices];
    const seen = new Set();
    return merged.filter(item => {
      const duplicate = seen.has(item.title);
      seen.add(item.title);
      return !duplicate;
    });
  }, [offerings, popularPujas, generalServices]);

  const isLoading = isOfferingsLoading || isPopularLoading || isServicesLoading;

  const categories = useMemo(() => {
    const cats = ["All", ...new Set(allServicesCombined.map(o => o.category))];
    return cats;
  }, [allServicesCombined]);

  const filteredPujas = useMemo(() => {
    return allServicesCombined.filter(puja => {
      const matchesCategory = activeCategory === "All" || puja.category === activeCategory;
      const matchesSearch = searchQuery === "" ||
        puja.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        puja.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery, allServicesCombined]);

  const handleOpenDrawer = () => {
    window.dispatchEvent(new CustomEvent('openPoojaDrawer'));
  };

  return (
    <Layout>
      <div className="min-h-screen bg-[#FAF9F6] relative overflow-hidden">
        {/* Divine Background Accents */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #d97706 1px, transparent 0)', backgroundSize: '32px 32px' }} />

        {/* --- PREMIUM HERO SECTION --- */}
        <section className="relative h-[320px] md:h-[400px] lg:h-[420px] flex items-center justify-center text-white overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={bannerImage}
              alt="Sacred Background"
              className="w-full h-full object-cover object-center scale-105 animate-slow-zoom"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(232,69,60,0.2),transparent_70%)]" />
          </div>

          <div className="container mx-auto px-4 relative z-10 text-center">
            <div className={`transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 mb-5 shadow-2xl">
                <Award className="w-4 h-4 text-[#FFC107]" />
                <span className="text-[#FFC107] text-[9px] md:text-sm font-black uppercase tracking-[0.3em]">{banner.badge || "DIVINE SERVICES HUB"}</span>
              </div>

              <h1 className="text-lg md:text-2xl font-bold mb-2 uppercase tracking-[0.2em] opacity-90">
                {banner.titleHighlight1}
              </h1>
              <div className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 leading-none uppercase tracking-tighter drop-shadow-2xl">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-100 to-orange-500">
                  {banner.titleHighlight2} {banner.titleHighlight3} {banner.titleEnd}
                </span>
              </div>

              <p className="text-xs md:text-sm lg:text-base text-white/80 leading-relaxed max-w-xl mx-auto font-bold mb-8 drop-shadow-lg italic font-serif px-4">
                {banner.subtitle}
              </p>

              <div className="flex flex-wrap justify-center gap-4 mb-4">
                {banner.buttons && banner.buttons.length > 0 ? (
                  banner.buttons.map((btn, idx) => (
                    btn.text && (
                      <button
                        key={idx}
                        onClick={() => btn.link?.startsWith('#') ? document.getElementById(btn.link.substring(1))?.scrollIntoView({ behavior: 'smooth' }) : (btn.link === '#book-pooja' ? window.dispatchEvent(new CustomEvent('openPoojaDrawer')) : (btn.link ? (btn.link.startsWith('http') ? window.location.href = btn.link : window.location.pathname = btn.link) : null))}
                        className={`group relative ${idx === 0 ? 'bg-[#E8453C] hover:bg-black' : 'bg-white/10 backdrop-blur-md hover:bg-white text-white hover:text-black'} px-8 py-3.5 rounded-none font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] shadow-xl transition-all duration-300 overflow-hidden border border-white/10`}
                      >
                        <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        <span className="relative flex items-center gap-2.5">
                          {idx === 0 ? <Calendar className="w-4 h-4" /> : <Phone className="w-4 h-4" />}
                          {btn.text}
                        </span>
                      </button>
                    )
                  ))
                ) : (
                  <>
                    <button
                      onClick={handleOpenDrawer}
                      className="group relative bg-[#E8453C] hover:bg-black text-white px-8 py-3.5 rounded-none font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] shadow-xl transition-all duration-300 overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                      <span className="relative flex items-center gap-2.5"><Calendar className="w-4 h-4" /> Book Your Puja</span>
                    </button>
                    <Link to="/contact">
                      <button className="group relative bg-white/10 backdrop-blur-md hover:bg-white text-white hover:text-black px-8 py-3.5 rounded-none font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] shadow-xl transition-all duration-300 overflow-hidden border border-white/10">
                        <div className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        <span className="relative flex items-center gap-2.5"><Phone className="w-4 h-4" /> Talk to Expert</span>
                      </button>
                    </Link>
                  </>
                )}
              </div>

              {/* Enhanced Search Input */}
              <div className="max-w-xl mx-auto relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-400/30 to-amber-400/30 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-1000" />
                <div className="relative">
                  <SearchIcon className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-600" />
                  <input
                    type="text"
                    placeholder="Search for a specific puja by name or ritual..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-14 pr-10 py-3.5 rounded-2xl bg-white text-gray-900 font-bold shadow-2xl transition-all border-none focus:ring-2 focus:ring-orange-500/50 text-sm md:text-base placeholder:text-gray-400"
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery("")} className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-600 font-black">✕</button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Decorative Corner Brackets (Vedic Theme) */}
          <div className="absolute top-10 left-10 w-20 h-20 border-t-2 border-l-2 border-white/20 pointer-events-none" />
          <div className="absolute top-10 right-10 w-20 h-20 border-t-2 border-r-2 border-white/20 pointer-events-none" />
        </section>

        {/* --- MAIN CONTENT AREA --- */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            {/* Category Header Styling */}
            <div className="text-center mb-12 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 text-orange-600 rounded-full text-[10px] font-extrabold uppercase tracking-widest mb-4">
                <Star className="w-3.5 h-3.5" />
                <span>Sacred Categories</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-2 uppercase">Discover Your <span className="text-orange-600">Sacred Path</span></h2>
              <div className="flex items-center justify-center gap-2">
                <div className="w-12 h-1 bg-orange-200 rounded-full" />
                <Sparkles className="w-5 h-5 text-orange-400" />
                <div className="w-12 h-1 bg-orange-200 rounded-full" />
              </div>
            </div>

            {/* Category selection bar */}
            <div className="flex gap-4 justify-center flex-wrap mb-20">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-8 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-500 border-2 ${activeCategory === category
                    ? "bg-[#2A1D13] text-amber-400 border-[#2A1D13] shadow-[0_15px_30px_-5px_rgba(42,29,19,0.4)] -translate-y-1"
                    : "bg-white text-gray-500 border-orange-100 hover:border-orange-200 shadow-sm"
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Listings Grid - Using Griha Pravesh Card UI */}
            <div className="container mx-auto max-w-7xl">
              {isLoading ? (
                <div className="text-center py-24 flex flex-col items-center">
                  <div className="w-16 h-16 border-4 border-orange-100 border-t-orange-600 rounded-full animate-spin mb-6"></div>
                  <p className="text-orange-900 font-bold uppercase tracking-[0.3em] text-[10px]">Invoking Sacred Offerings...</p>
                </div>
              ) : filteredPujas.length === 0 ? (
                <div className="text-center py-24 bg-white rounded-[3rem] border border-orange-50 shadow-xl p-12">
                  <BookOpen className="w-20 h-20 text-orange-100 mx-auto mb-6" />
                  <h2 className="text-3xl font-black text-[#2A1D13] mb-4 uppercase">No Offerings Found</h2>
                  <p className="text-gray-500 font-medium mb-10 max-w-md mx-auto italic">The ritual you seek hasn't manifested yet. Please broaden your search or filter.</p>
                  <button onClick={() => { setActiveCategory("All"); setSearchQuery(""); }} className="bg-orange-600 text-white px-12 py-4 rounded-full font-bold uppercase tracking-widest text-xs shadow-xl">Reset Selection</button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
                  {filteredPujas.map((puja, idx) => (
                    <div key={puja._id} className="group/card h-full animate-fade-in-up" style={{ animationDelay: `${idx * 0.1}s`, animationFillMode: 'both' }}>
                      <div className="relative h-full p-[1.5px] rounded-[2rem] bg-amber-400/40 hover:bg-amber-500 transition-all duration-700 shadow-xl hover:shadow-amber-500/20 flex flex-col transition-shadow">
                        <div className="relative flex-grow bg-[#FCFBF7] rounded-[1.9rem] overflow-hidden flex flex-col group-hover/card:bg-white transition-all duration-500">
                          {/* Inner radial glow */}
                          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-100/30 rounded-full blur-[90px] -mr-32 -mt-32 pointer-events-none" />                          {/* Top Image Area - REDUCED HEIGHT */}
                          <div className="relative m-2.5 mb-3 rounded-2xl overflow-hidden shadow-md h-44 md:h-52 z-10 flex items-center justify-center bg-amber-50 group-hover/card:bg-white transition-all duration-500">
                            <img
                              src={puja.imageUrl?.startsWith('http') ? puja.imageUrl : `${BACKEND_URL}${puja.imageUrl}`}
                              alt={puja.title}
                              className="absolute inset-0 w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-[2.5s]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#1A130F]/70 via-transparent to-transparent opacity-60" />

                            {/* Category Mini Badge */}
                            <div className="absolute top-4 left-4 z-20">
                              <span className="px-3.5 py-1 rounded-xl bg-black/40 backdrop-blur-md border border-white/20 text-white text-[9px] font-black uppercase tracking-widest">
                                {puja.category || "Ritual"}
                              </span>
                            </div>
                          </div>                          {/* Card Body - PREMIUM REFINEMENT */}
                          <div className="flex flex-col flex-grow px-5 pb-5 text-center relative z-20">
                            {/* Title with focus effect */}
                            <div className="mb-2">
                              <h3 className="text-lg md:text-xl font-black text-[#2A1D13] tracking-tight uppercase group-hover/card:text-orange-600 transition-colors duration-300 line-clamp-1 leading-tight mb-1">
                                {puja.title}
                              </h3>
                              <div className="flex items-center justify-center gap-2">
                                <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-amber-400 opacity-60" />
                                <Sparkle className="w-3.5 h-3.5 text-amber-500 fill-amber-500/20 animate-pulse" />
                                <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-amber-400 opacity-60" />
                              </div>
                            </div>

                            <p className="text-[#6D5B4F]/90 text-[10px] md:text-[11px] font-medium mb-5 line-clamp-2 leading-relaxed italic px-2 opacity-80 grow">
                              "{puja.shortDescription}"
                            </p>

                            {/* Refined Info Grid */}
                            <div className="flex items-center justify-center gap-4 mb-5">
                              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-50/50 border border-orange-100/50 group-hover/card:bg-white transition-all shadow-sm">
                                <Clock className="w-3 h-3 text-orange-600" />
                                <span className="text-[9px] font-black text-[#2A1D13] uppercase tracking-wider">{puja.duration}</span>
                              </div>
                              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50/50 border border-amber-100/50 group-hover/card:bg-white transition-all shadow-sm">
                                <Star className="w-3 h-3 text-amber-600 fill-amber-600/10" />
                                <span className="text-[9px] font-black text-amber-700 uppercase tracking-wider">₹{puja.price}</span>
                              </div>
                            </div>

                            {/* Card Footer Actions - MORE COMPACT */}
                            <div className="mt-auto grid grid-cols-2 gap-3 px-0.5">
                              <Link
                                to={`/puja/${puja.slug}`}
                                className="group/btn relative inline-flex items-center justify-center gap-1.5 px-4 py-3 bg-white border-2 border-[#2A1D13] text-[#2A1D13] rounded-2xl font-black text-[9px] uppercase tracking-[0.1em] transition-all duration-500 hover:bg-[#2A1D13] hover:text-white no-underline shadow-sm"
                              >
                                <span>Details</span>
                                <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                              </Link>
                              <button
                                onClick={handleOpenDrawer}
                                className="group/btn relative inline-flex items-center justify-center gap-1.5 px-4 py-3 bg-orange-600 text-white rounded-2xl font-black text-[9px] uppercase tracking-[0.1em] transition-all duration-500 hover:bg-[#2A1D13] hover:text-amber-400 shadow-lg"
                              >
                                <span>Book Now</span>
                                <Calendar className="w-3.5 h-3.5 group-hover/btn:animate-bounce transition-all" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* --- BOTTOM CTA --- */}
        <section className="py-24 bg-white border-t border-orange-50 relative overflow-hidden">
          {/* Subtle pattern background for footer */}
          <div className="absolute bottom-0 right-0 w-96 h-96 opacity-[0.05] -mr-48 -mb-48 pointer-events-none">
            <Sparkles className="w-full h-full text-orange-600" />
          </div>

          <div className="container mx-auto px-4 text-center max-w-5xl animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#2A1B13] mb-8 uppercase tracking-tighter">Bless Your Journey With <br /><span className="text-[#E8453C]">Divine Rituals</span></h2>
            <div className="flex items-center justify-center gap-4 mb-12">
              <div className="w-16 h-[2.5px] bg-orange-200 rounded-full" /><Sparkles className="w-7 h-7 text-orange-400 animate-pulse" /><div className="w-16 h-[2.5px] bg-orange-200 rounded-full" />
            </div>
            <p className="text-gray-600 mb-14 text-base md:text-xl font-medium max-w-2xl mx-auto leading-relaxed italic">"Experience the profound impact of authentic spiritual ceremonies performed with pure Vedic devotion and complete ritual purity."</p>

            <div className="flex flex-wrap justify-center gap-8">
              <button
                onClick={handleOpenDrawer}
                className="group relative bg-[#E8453C] hover:bg-black text-white px-12 py-4 rounded-none font-black text-xs md:text-sm uppercase tracking-[0.3em] shadow-[0_20px_45px_-10px_rgba(232,69,60,0.4)] transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative flex items-center gap-3"><Calendar className="w-5 h-5 group-hover:animate-bounce transition-all text-amber-300" /> Book Your Puja</span>
              </button>
              <Link to="/contact">
                <button className="group relative bg-[#F59E0B] hover:bg-[#D97706] text-white px-12 py-4 rounded-none font-black text-xs md:text-sm uppercase tracking-[0.3em] shadow-2xl transition-all duration-300 overflow-hidden border border-amber-400/30">
                  <div className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <span className="relative flex items-center gap-3"><Phone className="w-5 h-5 text-amber-500" /> Call Acharya Ji</span>
                </button>
              </Link>
            </div>
          </div>
        </section>

        <style jsx>{`
          @keyframes slow-zoom {
            from { transform: scale(1); }
            to { transform: scale(1.1); }
          }
          .animate-slow-zoom { animation: slow-zoom 20s ease-in-out infinite alternate; }

          @keyframes fade-in-up {
            from { opacity: 0; transform: translateY(40px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in-up { animation: fade-in-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        `}</style>
      </div>
    </Layout>
  );
};

export default PujaServices;
