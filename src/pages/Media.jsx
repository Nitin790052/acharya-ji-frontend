import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import {
  Play, ExternalLink, Calendar, MapPin, Award, Newspaper,
  Video, Users, Instagram, Facebook, Youtube, X,
  Sparkle, Sparkles, Star, CheckCircle, Shield,
  ChevronRight, Phone, BookOpen, Clock, Heart, Globe
} from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { usePageBanner } from "@/hooks/usePageBanner";
import { BACKEND_URL, getImageUrl } from "@/config/apiConfig";
import { useGetAllMediaQuery, useGetMediaSettingsQuery } from "@/services/mediaApi";
import SEO from "@/components/layout/SEO";

const fallbackStats = [
  { value: '50K+', label: 'Subscribers', iconType: 'youtube' },
  { value: '35K+', label: 'Followers', iconType: 'instagram' },
  { value: '100+', label: 'Features', iconType: 'newspaper' },
  { value: '25+', label: 'Public Events', iconType: 'users' }
];

const AnimatedCounter = React.memo(({ value, duration = 1500 }) => {
  const parts = value.match(/(\d+)(.*)/) || ["0", "0", ""];
  const target = parseInt(parts[1], 10);
  const suffix = parts[2];

  const [displayCount, setDisplayCount] = useState(0);
  const prevTargetRef = useRef(0);

  useEffect(() => {
    if (prevTargetRef.current === target) {
      setDisplayCount(target);
      return;
    }

    let start = prevTargetRef.current;
    const end = target;
    const range = end - start;

    let startTime = null;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const currentCount = Math.floor(progress * range + start);

      setDisplayCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        prevTargetRef.current = end;
      }
    };

    requestAnimationFrame(animate);
  }, [target, duration]);

  return (
    <div className="text-2xl font-black text-[#2A1D13] tabular-nums">
      {displayCount}{suffix}
    </div>
  );
}, (prev, next) => prev.value === next.value);

const StatCard = React.memo(({ item, index }) => {
  const iconMap = {
    youtube: Youtube,
    instagram: Instagram,
    newspaper: Newspaper,
    users: Users
  };
  const Icon = iconMap[item.iconType] || Youtube;

  return (
    <div
      className="bg-white/80 backdrop-blur-xl px-8 py-5 rounded-2xl border-b-4 border-orange-500 shadow-xl flex flex-col items-center min-w-[160px] group hover:-translate-y-2 transition-transform animate-fade-in-up"
      style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'both' }}
    >
      <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center mb-3 group-hover:bg-orange-600 transition-colors">
        <Icon className="w-5 h-5 text-orange-600 group-hover:text-white" />
      </div>
      <AnimatedCounter value={item.value} />
      <div className="text-orange-600 text-[10px] font-black uppercase tracking-widest">{item.label}</div>
    </div>
  );
}, (prev, next) => {
  return prev.item.value === next.item.value &&
    prev.item.label === next.item.label &&
    prev.item.iconType === next.item.iconType;
});

const Media = () => {
  const banner = usePageBanner();
  const navigate = useNavigate();
  const { data: mediaItems = [], isLoading, refetch: refetchMedia } = useGetAllMediaQuery();
  // Using a longer polling interval (fallback) but we'll use storage events for instant updates
  const { data: settings, refetch: refetchSettings } = useGetMediaSettingsQuery(undefined, { pollingInterval: 60000 });
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedVideo, setSelectedVideo] = useState(null);

  // Listen for updates from Admin Panel (different tab/window on same origin)
  useEffect(() => {
    const handleStorageUpdate = (e) => {
      if (e.key === 'media_data_updated') {
        refetchSettings();
        refetchMedia();
      }
    };
    window.addEventListener('storage', handleStorageUpdate);
    return () => window.removeEventListener('storage', handleStorageUpdate);
  }, [refetchSettings, refetchMedia]);

  const filters = [
    { id: 'all', label: 'All Media', icon: Newspaper },
    { id: 'news', label: 'News & Press', icon: Newspaper },
    { id: 'videos', label: 'Videos', icon: Video },
    { id: 'event', label: 'Events', icon: Users },
    { id: 'award', label: 'Awards', icon: Award },
    { id: 'social', label: 'Social Media', icon: Instagram }
  ];

  const getFilteredItems = () => {
    if (activeFilter === 'all') return mediaItems;
    // Map 'videos' filter to 'video' type in backend
    const filterType = activeFilter === 'videos' ? 'video' : activeFilter;
    return mediaItems.filter(item => item.type === filterType);
  };

  const NewsCard = React.memo(({ item }) => (
    <div className="group/card h-full animate-fade-in-up" style={{ animationFillMode: 'both' }}>
      <div className="relative h-full p-[1.5px] rounded-3xl bg-amber-400/40 hover:bg-amber-500 transition-all duration-700 shadow-xl shadow-amber-200/10 hover:shadow-amber-200/30 flex flex-col">
        <div className="relative flex-grow bg-[#FCFBF7] rounded-[1.4rem] overflow-hidden flex flex-col group-hover/card:bg-white transition-all duration-500">
          <div className="absolute top-0 right-0 w-48 h-48 bg-amber-100/40 rounded-full blur-[80px] -mr-24 -mt-24 group-hover/card:bg-amber-400/20 transition-all duration-1000" />

          <div className="relative m-2.5 mb-3 rounded-2xl overflow-hidden shadow-lg h-44 z-10">
            <img src={getImageUrl(item.image)} alt={item.title} className="w-full h-full bg-cover transition-all duration-[2.5s] group-hover/card:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
            <div className="absolute top-3 left-3 px-2 py-1 bg-white/20 backdrop-blur-md rounded-lg border border-white/30 text-[10px] text-white font-bold uppercase tracking-wider">
              {item.publication}
            </div>
          </div>

          <div className="flex flex-col flex-grow px-5 pb-5 text-center relative z-20">
            <h3 className="text-base font-black text-[#2A1D13] mb-2 line-clamp-2 uppercase group-hover/card:text-amber-600 transition-colors">
              {item.title}
            </h3>

            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-[1px] w-8 bg-amber-200 group-hover/card:w-12 transition-all duration-700" />
              <Sparkle className="w-4 h-4 text-amber-500 group-hover/card:rotate-90 transition-transform duration-700" />
              <div className="h-[1px] w-8 bg-amber-200 group-hover/card:w-12 transition-all duration-700" />
            </div>

            <p className="text-gray-600 text-xs font-semibold mb-4 line-clamp-2 leading-relaxed italic">
              "{item.excerpt}"
            </p>

            <div className="mt-auto flex items-center justify-between border-t border-amber-100 pt-4">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-600" />
                {item.date}
              </span>
              <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:text-amber-700 text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                Read More <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  ), (prev, next) => {
    return prev.item._id === next.item._id &&
      prev.item.title === next.item.title &&
      prev.item.image === next.item.image;
  });

  const VideoCard = React.memo(({ item, onSelect }) => (
    <div
      className="group/card h-full cursor-pointer animate-fade-in-up"
      style={{ animationFillMode: 'both' }}
      onClick={() => onSelect(item)}
    >
      <div className="relative h-full p-[1.5px] rounded-3xl bg-amber-400/40 hover:bg-amber-500 transition-all duration-700 shadow-xl shadow-amber-200/10 flex flex-col">
        <div className="relative flex-grow bg-[#FCFBF7] rounded-[1.4rem] overflow-hidden flex flex-col group-hover/card:bg-white transition-all duration-500">
          <div className="relative m-2.5 mb-3 rounded-2xl overflow-hidden shadow-lg h-44 z-10 group/video">
            {(item.image && item.image.trim().length > 5) ? (
              <img src={getImageUrl(item.image)} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110" onError={(e) => { e.target.style.display = 'none'; if (item.videoId) e.target.nextSibling.style.display = 'block'; }} />
            ) : item.videoId ? (
              <img src={`https://img.youtube.com/vi/${item.videoId}/maxresdefault.jpg`} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110" onError={(e) => e.target.src = `https://img.youtube.com/vi/${item.videoId}/hqdefault.jpg`} />
            ) : item.video ? (
              <div className="w-full h-full bg-black relative">
                <video
                  src={getImageUrl(item.video) + "#t=0.1"}
                  className="w-full h-full object-cover opacity-60 transition-transform duration-[2s] group-hover:scale-110"
                  muted
                  preload="metadata"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-amber-400 gap-1 mt-2">
                  <Video className="w-6 h-6 animate-pulse" />
                  <span className="text-[8px] font-black uppercase tracking-widest opacity-40">Stored Asset</span>
                </div>
              </div>
            ) : (
              <div className="w-full h-full bg-[#2A1D13] flex flex-col items-center justify-center text-amber-100 italic gap-2">
                <Play className="w-10 h-10 opacity-30 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-30">Divine Record</span>
              </div>
            )}
            {item.videoId && item.image && <img src={`https://img.youtube.com/vi/${item.videoId}/maxresdefault.jpg`} style={{ display: 'none' }} className="absolute inset-0 w-full h-full object-cover" onError={(e) => e.target.src = `https://img.youtube.com/vi/${item.videoId}/hqdefault.jpg`} />}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover/video:bg-black/50 transition-all">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full border border-white/40 flex items-center justify-center group-hover/video:scale-110 transition-transform shadow-2xl">
                <Play className="w-6 h-6 text-white ml-1 fill-white" />
              </div>
            </div>
            <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-lg border border-white/20">
              {item.duration}
            </div>
          </div>

          <div className="flex flex-col flex-grow px-5 pb-5 text-center relative z-20">
            <h3 className="text-base font-black text-[#2A1D13] mb-2 line-clamp-2 uppercase group-hover/card:text-amber-600 transition-colors">
              {item.title}
            </h3>

            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-[1px] w-8 bg-amber-200 group-hover/card:w-12 transition-all duration-700" />
              <Video className="w-4 h-4 text-amber-500" />
              <div className="h-[1px] w-8 bg-amber-200 group-hover/card:w-12 transition-all duration-700" />
            </div>

            <div className="mt-auto flex items-center justify-between border-t border-amber-100 pt-4">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                {item.views} views
              </span>
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-600" />
                {item.date}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  ), (prev, next) => {
    return prev.item._id === next.item._id &&
      prev.item.title === next.item.title &&
      prev.item.views === next.item.views;
  });

  const EventCard = React.memo(({ item }) => (
    <div className="group/card h-full animate-fade-in-up" style={{ animationFillMode: 'both' }}>
      <div className="relative h-full p-[1.5px] rounded-3xl bg-amber-400/40 hover:bg-amber-500 transition-all duration-700 shadow-xl shadow-amber-200/10 flex flex-col">
        <div className="relative flex-grow bg-[#FCFBF7] rounded-[1.4rem] overflow-hidden flex flex-col group-hover/card:bg-white transition-all duration-500">
          <div className="relative m-2.5 mb-3 rounded-2xl overflow-hidden shadow-lg h-44 z-10">
            <img src={getImageUrl(item.image)} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
            <div className="absolute top-3 left-3 px-3 py-1 bg-orange-600 text-white text-[10px] font-bold rounded-full border border-orange-400 shadow-lg uppercase tracking-wider">
              {item.attendees} attendees
            </div>
          </div>

          <div className="flex flex-col flex-grow px-5 pb-5 text-center relative z-20">
            <h3 className="text-base font-black text-[#2A1D13] mb-2 uppercase group-hover/card:text-amber-600 transition-colors">
              {item.title}
            </h3>

            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-[1px] w-8 bg-amber-200 group-hover/card:w-12 transition-all duration-700" />
              <Users className="w-4 h-4 text-amber-500" />
              <div className="h-[1px] w-8 bg-amber-200 group-hover/card:w-12 transition-all duration-700" />
            </div>

            <p className="text-gray-600 text-xs font-semibold mb-4 line-clamp-2 leading-relaxed">
              {item.description}
            </p>

            <div className="mt-auto space-y-2 border-t border-amber-100 pt-4">
              <div className="flex items-center justify-center gap-2 text-gray-500 text-[10px] font-bold uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5 text-amber-600" />
                <span>{item.location}</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-gray-500 text-[10px] font-bold uppercase tracking-wider">
                <Calendar className="w-3.5 h-3.5 text-amber-600" />
                <span>{item.date}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ), (prev, next) => {
    return prev.item._id === next.item._id &&
      prev.item.title === next.item.title &&
      prev.item.attendees === next.item.attendees;
  });

  const AwardCard = React.memo(({ item }) => (
    <div className="group/card h-full animate-fade-in-up" style={{ animationFillMode: 'both' }}>
      <div className="relative h-full p-[1.5px] rounded-3xl bg-gradient-to-br from-amber-400 to-orange-500 hover:shadow-2xl transition-all duration-500 flex flex-col">
        <div className="relative flex-grow bg-[#FCFBF7] rounded-[1.4rem] overflow-hidden flex flex-col p-6 group-hover/card:bg-white transition-all">
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-amber-100 to-amber-200 rounded-full flex items-center justify-center mb-4 shadow-inner group-hover/card:scale-110 transition-transform duration-500">
              <Award className="w-10 h-10 text-amber-600" />
            </div>

            <h3 className="text-lg font-black text-[#2A1D13] mb-1 uppercase tracking-wide">
              {item.title}
            </h3>

            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-[1px] w-6 bg-amber-300" />
              <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
              <div className="h-[1px] w-6 bg-amber-300" />
            </div>

            <p className="text-gray-600 text-xs font-bold uppercase mb-4 tracking-widest">{item.organization}</p>

            <div className="mt-auto">
              <span className="inline-block bg-[#2A1D13] text-amber-400 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] shadow-lg">
                Year: {item.year}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  ), (prev, next) => {
    return prev.item._id === next.item._id &&
      prev.item.title === next.item.title &&
      prev.item.year === next.item.year;
  });

  const SocialCard = React.memo(({ item }) => {
    const platformIcons = {
      instagram: Instagram,
      youtube: Youtube,
      facebook: Facebook
    };
    const PlatformIcon = platformIcons[item.platform] || Instagram;

    return (
      <div className="group/card h-full animate-fade-in-up" style={{ animationFillMode: 'both' }}>
        <div className="relative h-full p-[1.5px] rounded-3xl bg-amber-400/40 hover:bg-amber-500 transition-all duration-700 shadow-xl flex flex-col">
          <div className="relative flex-grow bg-[#FCFBF7] rounded-[1.4rem] overflow-hidden flex flex-col group-hover/card:bg-white transition-all duration-500">
            <div className="relative m-2.5 mb-3 rounded-2xl overflow-hidden shadow-lg h-44 z-10">
              <img src={getImageUrl(item.image)} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110" />
              <div className="absolute inset-0 bg-black/30 group-hover/card:bg-black/40 transition-all" />
              <div className="absolute top-3 right-3 w-8 h-8 bg-white/20 backdrop-blur-md rounded-lg border border-white/30 flex items-center justify-center">
                <PlatformIcon className="w-4 h-4 text-white" />
              </div>
            </div>

            <div className="flex flex-col flex-grow px-5 pb-5 text-center relative z-20">
              <h3 className="text-base font-black text-[#2A1D13] mb-3 uppercase group-hover/card:text-amber-600 transition-colors">
                {item.title}
              </h3>

              <div className="mt-auto flex items-center justify-between border-t border-amber-100 pt-4">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                  {item.engagement}
                </span>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                  {item.date}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }, (prev, next) => {
    return prev.item._id === next.item._id &&
      prev.item.title === next.item.title &&
      prev.item.engagement === next.item.engagement;
  });

  const renderCard = (item) => {
    switch (item.type) {
      case 'news': return <NewsCard item={item} />;
      case 'video': return <VideoCard item={item} onSelect={setSelectedVideo} />;
      case 'event': return <EventCard item={item} />;
      case 'award': return <AwardCard item={item} />;
      case 'social': return <SocialCard item={item} />;
      default: return null;
    }
  };

  return (
    <Layout>
      <SEO 
        pageName="media"
        title={banner.metaTitle} 
        description={banner.metaDescription} 
        keywords={banner.metaKeywords}
        canonical={banner.canonicalUrl}
      />
      <div className="min-h-screen bg-[#FAF9F6] relative overflow-hidden">
        {/* Divine Background Ornaments */}
        <div className="absolute top-[20%] right-0 w-[500px] h-[500px] bg-orange-100/20 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-[20%] left-0 w-[500px] h-[500px] bg-amber-100/20 rounded-full blur-[120px] -z-10" />

        {/* Hero Section */}
        <section className="relative h-[320px] sm:h-[320px] md:h-[360px] lg:h-[370px] flex items-center py-[20px] text-white overflow-hidden">
          <div className="absolute inset-0">
            {banner.imageUrl ? (
              <img src={getImageUrl(banner.imageUrl)} alt="Background" className="w-full h-full object-cover object-top " />
            ) : (
              <div className="absolute inset-0 bg-[#2A1D13]/90" />
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,rgba(217,119,6,0.2),transparent_50%)]" />
          </div>
          <div className="container mx-auto px-4 relative z-10 w-full animate-fade-in-up">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 mb-2 md:mb-7 shadow-2xl">
                <Newspaper className="w-4 h-4 text-[#FFC107]" />
                <span className="text-[#FFC107] text-xs md:text-sm font-black uppercase tracking-widest">{banner.badge || "DIVINE SERVICES HUB"}</span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-5 leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)] uppercase">
                {banner.titleHighlight1} {banner.titleEnd} <br />
                <span className="text-yellow-300">{banner.titleHighlight2} {banner.titleHighlight3}</span>
              </h1>
              <p className="text-lg md:text-xl text-amber-100 leading-relaxed max-w-2xl mx-auto font-medium drop-shadow mb-2 md:mb-7">
                {banner.subtitle}
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                {banner.buttons && banner.buttons.length > 0 ? (
                  banner.buttons.map((btn, idx) => (
                    btn.text && (
                      <button
                        key={idx}
                        onClick={() => {
                          if (btn.link === '#book-pooja') {
                            window.dispatchEvent(new CustomEvent('openPoojaDrawer'));
                          } else if (btn.link?.startsWith('#')) {
                            document.getElementById(btn.link.substring(1))?.scrollIntoView({ behavior: 'smooth' });
                          } else if (btn.link?.startsWith('http')) {
                            window.location.href = btn.link;
                          } else if (btn.link) {
                            navigate(btn.link);
                          }
                        }}
                        className={`group relative ${idx === 0 ? 'bg-[#E8453C] hover:bg-[#CC3B34]' : 'bg-[#1E293B] hover:bg-[#0F172A]'} text-white px-8 py-4 rounded-none font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] shadow-xl transition-all duration-300 overflow-hidden`}
                      >
                        <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        <span className="relative flex items-center gap-2">
                          {idx === 0 ? <Calendar className="w-4 h-4" /> : <Play className="w-4 h-4" />} {btn.text}
                        </span>
                      </button>
                    )
                  ))
                ) : (
                  <>
                    <button className="group relative bg-[#E8453C] hover:bg-[#CC3B34] text-white px-8 py-4 rounded-none font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] shadow-xl transition-all duration-300 overflow-hidden">
                      <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                      <span className="relative flex items-center gap-2"><Calendar className="w-4 h-4" /> Media Inquiry</span>
                    </button>
                    <button className="group relative bg-[#1E293B] hover:bg-[#0F172A] text-white px-8 py-4 rounded-none font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] shadow-xl transition-all duration-300 overflow-hidden">
                      <div className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                      <span className="relative flex items-center gap-2"><Play className="w-4 h-4" /> View Channel</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 md:py-16 -mt-10 relative z-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              {(settings?.stats || fallbackStats).map((item, i) => (
                <StatCard key={item._id || `stat-${i}`} item={item} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* Filter Tabs */}
        <div className="sticky top-0 z-40 bg-[#FAF9F6]/80 backdrop-blur-md border-b border-orange-100/50 mb-12">
          <div className="container mx-auto px-4 overflow-x-auto">
            <div className="flex justify-center gap-3 py-6 min-w-max">
              {filters.map(filter => {
                const Icon = filter.icon;
                const isActive = activeFilter === filter.id;
                return (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={`flex items-center gap-2.5 px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-500 border ${isActive
                      ? 'bg-[#2A1D13] text-amber-400 border-[#2A1D13] shadow-lg -translate-y-0.5'
                      : 'bg-white text-gray-600 border-orange-100 hover:border-orange-200 hover:bg-orange-50/50'
                      }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-orange-600'}`} />
                    {filter.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Media Grid */}
        <section className="pb-20">
          <div className="container mx-auto px-4 max-w-7xl">
            {isLoading ? (
              <div className="flex justify-center py-20">
                <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {getFilteredItems().map(item => (
                    <React.Fragment key={item._id}>
                      {renderCard(item)}
                    </React.Fragment>
                  ))}
                </div>

                {getFilteredItems().length === 0 && (
                  <div className="text-center py-12 md:py-16 flex flex-col items-center animate-fade-in">
                    <Sparkles className="w-12 h-12 text-orange-200 mb-4" />
                    <p className="text-gray-400 font-bold uppercase tracking-widest">Divine content arriving soon...</p>
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-16 bg-white border-t border-orange-50">
          <div className="container mx-auto px-4 text-center max-w-5xl">
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50/50 text-orange-600 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6 border border-orange-100">
                <Heart className="w-3.5 h-3.5" />
                <span>{settings?.cta?.badge || 'Spiritual Connection'}</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2A1B13] mb-4 tracking-tight uppercase">
                {settings?.cta?.title || 'Experience the'} <span className="text-[#E8453C]">{settings?.cta?.titleHighlight || 'Divine Grace'}</span>
              </h2>
              <div className="flex items-center justify-center gap-3 mb-8">
                <div className="w-10 h-[1.5px] bg-orange-200" />
                <Sparkles className="w-5 h-5 text-orange-400" />
                <div className="w-10 h-[1.5px] bg-orange-200" />
              </div>
              <p className="text-gray-600 mb-10 text-sm md:text-base font-medium max-w-2xl mx-auto leading-relaxed">
                {settings?.cta?.description || "Join Acharya Ji's spiritual family and discover the profound impact of authentic Vedic rituals and divine guidance in your life."}
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <Link to={settings?.cta?.primaryBtnLink || "/puja/online"}>
                  <button className="group relative bg-[#E8453C] hover:bg-[#CC3B34] text-white px-8 py-4 rounded-none font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] shadow-xl transition-all duration-300 overflow-hidden">
                    <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    <span className="relative flex items-center gap-2.5">
                      <Calendar className="w-4 h-4" /> {settings?.cta?.primaryBtnText || 'Book Sacred Puja'}
                    </span>
                  </button>
                </Link>
                <Link to={settings?.cta?.secondaryBtnLink || "/talk-to-astrologer"}>
                  <button className="group relative bg-[#F59E0B] hover:bg-[#D97706] text-white px-8 py-4 rounded-none font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] shadow-xl transition-all duration-300 overflow-hidden">
                    <div className="absolute inset-0 bg-black/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    <span className="relative flex items-center gap-2.5">
                      <Phone className="w-4 h-4" /> {settings?.cta?.secondaryBtnText || 'Professional Consultation'}
                    </span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Video Modal */}
        {selectedVideo && (
          <div
            className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in"
            onClick={() => setSelectedVideo(null)}
          >
            <div
              className="bg-[#FCFBF7] rounded-3xl max-w-4xl w-full overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-amber-200/50 animate-scale-in"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-5 border-b border-amber-100 flex items-center justify-between bg-white">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-8 bg-orange-600 rounded-full" />
                  <h3 className="font-black text-[#2A1D13] text-sm md:text-base uppercase tracking-wider">{selectedVideo.title}</h3>
                </div>
                <button onClick={() => setSelectedVideo(null)} className="p-2 hover:bg-orange-50 rounded-full transition-colors group">
                  <X className="w-6 h-6 text-gray-400 group-hover:text-orange-600 transition-colors" />
                </button>
              </div>
              <div className="aspect-video bg-black flex items-center justify-center">
                {selectedVideo.video ? (
                  <video
                    controls
                    autoPlay
                    playsInline
                    className="w-full h-full"
                    src={getImageUrl(selectedVideo.video)}
                    onError={(e) => {
                      console.error('Video loading failed:', e);
                      const parent = e.target.parentElement;
                      parent.innerHTML = `
                         <div class="flex flex-col items-center justify-center text-white p-10 text-center gap-4">
                            <div class="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center">
                              <span class="text-3xl">⚠️</span>
                            </div>
                            <div>
                              <p class="text-lg font-black uppercase tracking-widest text-red-500 mb-2">Manifestation Failed</p>
                              <p class="text-xs opacity-60 italic max-w-xs mx-auto">This sacred visual could not be materialized. The file may have moved to another universal plane or is still manifestating.</p>
                            </div>
                         </div>
                      `;
                    }}
                  />
                ) : selectedVideo.videoId ? (
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${selectedVideo.videoId}?autoplay=1`}
                    title={selectedVideo.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : selectedVideo.link ? (
                  <div className="w-full h-full flex flex-col items-center justify-center text-white bg-amber-950 p-10 text-center gap-6">
                    <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center animate-pulse">
                      <ExternalLink className="w-10 h-10 text-amber-500" />
                    </div>
                    <div>
                      <p className="text-xl font-black uppercase tracking-widest mb-2">Sacred External Portal</p>
                      <p className="text-sm opacity-60 italic mb-8">This manifestation exists on an external universal plane.</p>
                      <a href={selectedVideo.link} target="_blank" rel="noopener noreferrer" className="px-10 py-4 bg-orange-600 text-white rounded-none font-black text-xs uppercase tracking-widest hover:bg-orange-700 shadow-2xl transition-all inline-block hover:-translate-y-1">
                        Go to Manifestation <ChevronRight className="w-4 h-4 inline ml-1" />
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="text-white text-xs font-black uppercase tracking-[0.5em] animate-pulse">Asset Materializing...</div>
                )}
              </div>
              <div className="p-6 bg-white flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-xs font-black text-gray-400 uppercase tracking-widest">{selectedVideo.views} Views</span>
                  <div className="w-1 h-1 bg-gray-300 rounded-full" />
                  <span className="text-xs font-black text-orange-600 uppercase tracking-widest">{selectedVideo.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest">Acharya Ji Official</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Media;
