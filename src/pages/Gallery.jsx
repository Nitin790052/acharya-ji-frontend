import { useState, useMemo } from "react";
import { X, Play, MapPin, Calendar, ChevronRight, MessageCircle, Phone, Star, Search, Award, Sparkles, Camera, Video, Clock, Leaf, Loader2 } from "lucide-react";
import { Layout } from '@/components/layout/Layout';
import { usePageBanner } from "@/hooks/usePageBanner";
import { BACKEND_URL, getImageUrl } from "@/config/apiConfig";
import { useGetAllGalleryQuery, useGetGallerySettingsQuery } from "@/services/galleryApi";
import image1 from "../assets/mediaPage/imageM1.webp";
import image2 from "../assets/mediaPage/imageM2.webp";
import image3 from "../assets/mediaPage/imageM3.webp";
import image4 from "../assets/mediaPage/imageM4.webp";
import image5 from "../assets/mediaPage/imageM5.webp";
import image6 from "../assets/mediaPage/imageM6.webp";
import image7 from "../assets/mediaPage/imageM7.webp";
import image8 from "../assets/mediaPage/imageM8.webp";
import image9 from "../assets/mediaPage/imageM9.webp";
import image10 from "../assets/bookPooja/image1.webp";
import image11 from "../assets/bookPooja/image2.webp";
import image12 from "../assets/bookPooja/image3.webp";
import image13 from "../assets/bookPooja/image4.webp";

const fallbackImages = [
  image1, image2, image3, image4, image5, image6, image7,
  image8, image9, image10, image11, image12, image13
];

const Gallery = () => {
  const banner = usePageBanner({ pollingInterval: 60000 });
  const { data: galleryData = [], isLoading: isGalleryLoading } = useGetAllGalleryQuery(undefined, { pollingInterval: 60000 });
  const { data: settings } = useGetGallerySettingsQuery();
  const ctaSettings = settings?.cta || {};

  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Build dynamic categories from backend data
  const categories = useMemo(() => {
    const cats = [...new Set(galleryData.filter(i => i.isActive !== false).map(i => i.category))];
    return ["All", ...cats.sort()];
  }, [galleryData]);

  // Only show active items and ensure no duplicate titles
  const activeItems = useMemo(() => {
    const active = galleryData.filter(item => item.isActive !== false);
    return active.filter((item, index, self) =>
      index === self.findIndex((t) => t.title.toLowerCase().trim() === item.title.toLowerCase().trim())
    );
  }, [galleryData]);

  // Get image source — backend URL or fallback
  // Extract YouTube ID from any YouTube URL format
  const extractYTId = (url) => {
    if (!url) return null;
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : null;
  };

  // Smart thumbnail: custom image > YouTube auto-thumbnail > fallback
  const getImageSrc = (item, index) => {
    // 1. Custom uploaded thumbnail
    if (item.image) {
      return getImageUrl(item.image);
    }
    // 2. Auto YouTube thumbnail from videoLink
    if (item.videoLink) {
      const ytId = extractYTId(item.videoLink);
      if (ytId) return `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
    }
    // 3. Fallback static image
    return fallbackImages[index % fallbackImages.length];
  };

  const filteredGallery = activeItems.filter(item => {
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    const matchesSearch = searchQuery === "" ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.caption || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.tags || []).some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <Layout>
      <div className="min-h-screen bg-[#FCFBF7]">
        <div className="absolute top-[10%] right-0 w-[500px] h-[500px] bg-orange-100/20 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-[20%] left-0 w-[500px] h-[500px] bg-amber-100/20 rounded-full blur-[120px] -z-10" />

        {/* Hero Section (Untouched — uses usePageBanner) */}
        <section className="relative h-[320px] sm:h-[320px] md:h-[360px] lg:h-[370px] flex items-center py-[20px] text-white overflow-hidden">
          <div className="absolute inset-0">
            {banner.imageUrl ? (
              <img src={getImageUrl(banner.imageUrl)} alt="Background" className="w-full h-full object-cover object-top" />
            ) : (
              <div className="absolute inset-0 bg-[#2A1D13]/90" />
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,rgba(217,119,6,0.2),transparent_50%)]" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 mb-4 md:mb-7 shadow-2xl">
                <Award className="w-4 h-4 text-[#FFC107]" />
                <span className="text-[#FFC107] text-xs md:text-sm font-black uppercase tracking-widest">{banner.badge}</span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)] uppercase">
                {banner.titleHighlight1} <br />
                <span className="text-yellow-300">{banner.titleHighlight2} {banner.titleHighlight3}</span> {banner.titleEnd}
              </h1>
              <p className="text-lg md:text-xl text-amber-100 leading-relaxed max-w-2xl mx-auto font-medium drop-shadow mb-4 md:mb-8">
                {banner.subtitle}
              </p>

              <div className="max-w-lg mx-auto relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-orange-600 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-orange-600" />
                  <input
                    type="text"
                    placeholder="Search archives..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white/95 backdrop-blur-xl text-gray-900 font-bold shadow-2xl focus:outline-none border-2 border-transparent focus:border-amber-500 transition-all placeholder:text-gray-400 text-xs"
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-600 font-black">✕</button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dynamic Category Filter */}
        <section className="py-5 sticky top-0 bg-white/90 backdrop-blur-md z-40 border-b border-orange-100/50 shadow-sm overflow-x-auto [&::-webkit-scrollbar]:h-2.5 [&::-webkit-scrollbar-track]:bg-orange-50 [&::-webkit-scrollbar-thumb]:bg-orange-400/80 hover:[&::-webkit-scrollbar-thumb]:bg-orange-500 [&::-webkit-scrollbar-thumb]:rounded-full">
          <div className="container mx-auto px-4">
            <div className="flex gap-4 min-w-max justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-500 flex items-center gap-2 border ${activeCategory === category
                    ? "bg-[#2A1D13] text-amber-400 border-[#2A1D13] shadow-lg -translate-y-0.5"
                    : "bg-white text-gray-600 border-orange-100 hover:border-orange-200 hover:bg-orange-50/50"
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Dynamic Gallery Grid */}
        <section className="py-12 md:py-16 relative">
          <div className="container mx-auto px-4 max-w-7xl">
            {isGalleryLoading ? (
              <div className="text-center py-20 animate-fade-in">
                <Loader2 className="w-12 h-12 text-orange-400 mx-auto mb-4 animate-spin" />
                <p className="text-gray-400 font-bold text-sm uppercase tracking-widest">Loading Sacred Archives...</p>
              </div>
            ) : filteredGallery.length === 0 ? (
              <div className="text-center py-12 md:py-16 animate-fade-in">
                <Camera className="w-20 h-20 text-orange-200 mx-auto mb-6" />
                <h2 className="text-3xl font-black text-[#2A1D13] mb-4 uppercase tracking-tight">No moments found!</h2>
                <p className="text-gray-500 font-medium mb-10 max-w-md mx-auto">We couldn't find any results matching your filters. Please try again.</p>
                <button onClick={() => { setActiveCategory("All"); setSearchQuery(""); }} className="bg-[#E8453C] hover:bg-black text-white px-10 py-4 rounded-xl font-medium text-xs uppercase tracking-widest transition-all">Show All Moments</button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredGallery.map((item, idx) => (
                  <div
                    key={item._id || idx}
                    onClick={() => setSelectedMedia(item)}
                    className="group/card cursor-pointer animate-fade-in-up"
                    style={{ animationDelay: `${idx * 0.05}s`, animationFillMode: 'both' }}
                  >
                    <div className="relative h-full p-[1.5px] rounded-3xl bg-amber-400/40 hover:bg-amber-500 transition-all duration-700 shadow-xl flex flex-col group-hover/card:bg-orange-500">
                      <div className="relative flex-grow bg-[#FCFBF7] rounded-[1.4rem] overflow-hidden flex flex-col group-hover/card:bg-white transition-all duration-500 text-center">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-100/40 rounded-full blur-[60px] -mr-16 -mt-16 group-hover/card:bg-amber-400/20 transition-all duration-1000" />
                        <div className="relative m-2.5 mb-3 rounded-2xl overflow-hidden shadow-lg h-56 z-10">
                          <img
                            src={getImageSrc(item, idx)}
                            alt={item.title}
                            className="w-full h-full object-cover transition-all duration-[2.5s] group-hover/card:scale-110"
                            onError={(e) => { e.target.src = fallbackImages[idx % fallbackImages.length]; }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                          <div className="absolute top-4 left-4 px-3 py-1 bg-white/20 backdrop-blur-md rounded-lg border border-white/30 text-[10px] text-white font-medium uppercase tracking-wider">
                            {item.type === "video" ? <div className="flex items-center gap-1.5"><Video className="w-3 h-3" /> Video</div> : <div className="flex items-center gap-1.5"><Camera className="w-3 h-3" /> Photo</div>}
                          </div>
                          {item.type === "video" && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-xl group-hover/card:scale-110 transition-transform">
                                <Play className="w-6 h-6 text-[#E8453C] ml-1" fill="currentColor" />
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="px-5 pb-6 flex flex-col flex-1 relative z-20">
                          <h3 className="text-lg font-black text-[#2A1D13] mb-2 line-clamp-1 uppercase tracking-wider group-hover/card:text-orange-600 transition-colors">
                            {item.title}
                          </h3>
                          <div className="flex items-center justify-center gap-3 mb-4">
                            <div className="h-[1.5px] w-8 bg-gradient-to-r from-transparent via-amber-200 to-amber-500 group-hover/card:w-12 transition-all duration-700" />
                            <Sparkles className="w-5 h-5 text-amber-500" />
                            <div className="h-[1.5px] w-8 bg-gradient-to-l from-transparent via-amber-200 to-amber-500 group-hover/card:w-12 transition-all duration-700" />
                          </div>
                          <p className="text-gray-500 font-medium text-xs mb-4 line-clamp-2 leading-relaxed italic">
                            {item.caption || 'A sacred moment captured for eternity'}
                          </p>
                          <div className="mt-auto flex items-center justify-between border-t border-amber-100 pt-4">
                            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
                              <MapPin className="w-3.5 h-3.5 text-amber-600" />
                              {item.location || 'Sacred Space'}
                            </span>
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                              {item.date || 'Eternal'}
                              <ChevronRight className="w-4 h-4 text-orange-600 group-hover/card:translate-x-1 transition-transform ml-1" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-16 bg-white border-t border-orange-50">
          <div className="container mx-auto px-4 text-center max-w-5xl">
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50/50 text-orange-600 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{ctaSettings.badge || 'Sacred Connections'}</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2A1B13] mb-4 tracking-tight uppercase">
                {ctaSettings.title || 'Begin Your'} <span className="text-[#E8453C]">{ctaSettings.titleHighlight || 'Divine Journey'}</span>
              </h2>
              <div className="flex items-center justify-center gap-3 mb-8">
                <div className="w-10 h-[1.5px] bg-orange-200" />
                <Sparkles className="w-5 h-5 text-orange-400" />
                <div className="w-10 h-[1.5px] bg-orange-200" />
              </div>
              <p className="text-gray-600 mb-12 text-sm md:text-base font-medium max-w-2xl mx-auto leading-relaxed">
                {ctaSettings.description || 'Book your personalized Vedic rituals and experience the profound impact of authentic spiritual ceremonies performed with devotion.'}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent('openPoojaDrawer'))}
                  className="group relative bg-[#E8453C] hover:bg-[#CC3B34] text-white px-8 py-4 rounded-none font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <span className="relative flex items-center gap-2.5">
                    <MessageCircle className="w-4 h-4" /> {ctaSettings.primaryBtnText || 'Book Puja Now'}
                  </span>
                </button>
                <button className="group relative bg-[#F59E0B] hover:bg-[#D97706] text-white px-8 py-4 rounded-none font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="absolute inset-0 bg-black/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <span className="relative flex items-center gap-2.5">
                    <Phone className="w-4 h-4" /> {ctaSettings.secondaryBtnText || 'Consult Expert'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Lightbox Modal */}
        {selectedMedia && (
          <div
            onClick={() => setSelectedMedia(null)}
            className="fixed inset-0 bg-[#1A130F]/95 backdrop-blur-md z-[100] flex items-center justify-center p-4 scrollbar-hide animate-fade-in"
          >
            <button onClick={() => setSelectedMedia(null)} className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-[#E8453C] rounded-full flex items-center justify-center transition-all duration-300 z-[110] shadow-2xl border border-white/20 group">
              <X className="w-6 h-6 text-white group-hover:rotate-90 transition-transform" />
            </button>
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-[2rem] overflow-hidden max-w-5xl w-full max-h-[90vh] shadow-[0_0_100px_rgba(0,0,0,0.5)] flex flex-col md:flex-row animate-scale-in"
            >
              <div className="w-full md:w-3/5 h-[300px] md:h-auto relative bg-[#1A130F] min-h-[350px]">
                {/* Smart Video/Image Player */}
                {selectedMedia.type === 'video' && selectedMedia.video ? (
                  /* Uploaded video file */
                  <video
                    controls
                    autoPlay
                    className="w-full h-full object-contain bg-black"
                    src={getImageUrl(selectedMedia.video)}
                  >
                    Your browser does not support the video tag.
                  </video>
                ) : selectedMedia.type === 'video' && selectedMedia.videoLink ? (
                  /* Video from link (YouTube embed) */
                  (() => {
                    const url = selectedMedia.videoLink;
                    let embedUrl = url;
                    // Extract YouTube ID and build embed URL
                    const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([a-zA-Z0-9_-]{11})/);
                    if (ytMatch) {
                      embedUrl = `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1`;
                    }
                    return (
                      <iframe
                        src={embedUrl}
                        title={selectedMedia.title}
                        className="w-full h-full min-h-[350px]"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{ border: 'none' }}
                      />
                    );
                  })()
                ) : (
                  /* Photo or fallback image */
                  <>
                    <img
                      src={getImageSrc(selectedMedia, 0)}
                      alt={selectedMedia.title}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.src = fallbackImages[0]; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2A1D13] to-transparent opacity-60" />
                  </>
                )}
                <div className="absolute bottom-8 left-8 right-8 text-white pointer-events-none">
                  <span className="bg-amber-500 text-white px-3 py-1 text-[10px] font-medium uppercase tracking-widest mb-3 inline-block rounded-full">
                    {selectedMedia.type === 'video' ? '🎬 Sacred Video' : '📸 Sacred Vision'}
                  </span>
                  <h2 className="text-3xl font-black uppercase tracking-tight leading-tight drop-shadow-2xl">{selectedMedia.title}</h2>
                </div>
              </div>
              <div className="w-full md:w-2/5 p-8 md:p-10 overflow-y-auto bg-white flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-[1.5px] bg-amber-500" />
                  <span className="text-xs font-black text-amber-600 uppercase tracking-[0.2em]">{selectedMedia.category}</span>
                </div>
                <p className="text-gray-700 text-lg font-medium leading-relaxed mb-8 italic">{selectedMedia.caption || 'A sacred moment captured for eternity.'}</p>
                <div className="space-y-4 mb-10 border-t border-orange-50 pt-8">
                  <div className="flex items-center justify-between pb-3 border-b border-orange-50 text-[10px] font-medium text-gray-400 uppercase tracking-widest">
                    <span>Location & Date</span>
                    <span className="font-black text-[#2A1D13] text-sm uppercase flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-orange-600" /> {selectedMedia.location || 'Sacred Space'} • {selectedMedia.date || 'Eternal'}</span>
                  </div>
                  {selectedMedia.tags && selectedMedia.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {selectedMedia.tags.map((tag, i) => (
                        <span key={i} className="px-2.5 py-1 bg-amber-50 text-amber-700 rounded-full text-[9px] font-bold uppercase tracking-wider border border-amber-100">{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-4">
                  <button
                    onClick={() => window.dispatchEvent(new CustomEvent('openPoojaDrawer'))}
                    className="w-full bg-[#E8453C] hover:bg-black text-white py-5 rounded-xl font-medium text-[10px] uppercase tracking-[0.3em] transition-all"
                  >
                    Book Similar Puja
                  </button>
                  <button onClick={() => setSelectedMedia(null)} className="w-full bg-[#2A1D13] hover:bg-black text-white py-5 rounded-xl font-medium text-[10px] uppercase tracking-[0.3em] transition-all border border-amber-400/30">Back to Gallery</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Gallery;
