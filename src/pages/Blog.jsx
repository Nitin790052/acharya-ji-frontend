import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  X, Calendar, MapPin, Clock, Search, ChevronRight, BookOpen, Star, TrendingUp,
  MessageCircle, Phone, Bell, Moon, Shield, Leaf, Sparkles, Award, Sparkle
} from "lucide-react";
import { Layout } from '@/components/layout/Layout';
import { usePageBanner } from "@/hooks/usePageBanner";
import { BACKEND_URL } from "@/config/apiConfig";
import { useGetActiveBlogsQuery, useGetBlogSettingsQuery } from "@/services/blogApi";

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMedia, setSelectMedia] = useState(null);

  const banner = usePageBanner({ pollingInterval: 3000 });
  const { data: blogData = [], isLoading } = useGetActiveBlogsQuery(undefined, { pollingInterval: 60000 });
  const { data: blogSettings } = useGetBlogSettingsQuery();

  // Dynamically extract categories
  const categories = ["All", ...new Set(blogData.map(b => b.category))];

  // For visual separation, just split them up arbitrarily (first 3 vs rest)
  const allArticles = useMemo(() => blogData, [blogData]);

  const filteredArticles = useMemo(() => {
    let result = allArticles;
    if (activeCategory !== "All") result = result.filter(article => article.category === activeCategory);
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(article =>
        article.title.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query) ||
        article.category.toLowerCase().includes(query)
      );
    }
    return result;
  }, [activeCategory, searchQuery, allArticles]);

  // Split logic dynamically based on filtered results
  const filteredFeaturedBlogs = filteredArticles.slice(0, 3);
  const filteredLatestArticles = filteredArticles.slice(3);
  const noResultsFound = filteredArticles.length === 0;

  const resetFilters = () => {
    setActiveCategory("All");
    setSearchQuery("");
  };

  const BlogCard = ({ blog, isFeatured = false, index }) => (
    <div
      className="group/card h-full cursor-pointer animate-fade-in-up"
      style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'both' }}
      onClick={() => setSelectMedia(blog)}
    >
      <div className={`relative h-full p-[1.5px] rounded-3xl bg-amber-400/40 hover:bg-amber-500 transition-all duration-700 shadow-xl shadow-amber-200/10 hover:shadow-amber-200/30 flex flex-col`}>
        <div className="relative flex-grow bg-[#FCFBF7] rounded-[1.4rem] overflow-hidden flex flex-col group-hover/card:bg-white transition-all duration-500">
          <div className="absolute top-0 right-0 w-48 h-48 bg-amber-100/40 rounded-full blur-[80px] -mr-24 -mt-24 group-hover/card:bg-amber-400/20 transition-all duration-1000" />

          <div className={`relative m-2.5 mb-3 rounded-2xl overflow-hidden shadow-lg ${isFeatured ? 'h-48' : 'h-40'} z-10`}>
            <img src={blog.imageUrl ? `${BACKEND_URL}${blog.imageUrl}` : 'https://placehold.co/600x400/FFF8F0/D97706?text=Blog+Image'} alt={blog.title} className="w-full h-full object-cover transition-all duration-[2.5s] group-hover/card:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
            <div className="absolute top-3 left-3 px-2 py-1 bg-white/20 backdrop-blur-md rounded-lg border border-white/30 text-[10px] text-white font-medium uppercase tracking-wider">
              {blog.category}
            </div>
          </div>

          <div className="flex flex-col flex-grow px-5 pb-5 text-center relative z-20">
            <h3 className="text-base md:text-lg font-black text-[#2A1D13] mb-2 line-clamp-2 uppercase group-hover/card:text-amber-600 transition-colors">
              {blog.title}
            </h3>

            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-[1px] w-8 bg-amber-200 group-hover/card:w-12 transition-all duration-700" />
              <Sparkle className="w-4 h-4 text-amber-500 group-hover/card:rotate-90 transition-transform duration-700" />
              <div className="h-[1px] w-8 bg-amber-200 group-hover/card:w-12 transition-all duration-700" />
            </div>

            <p className="text-gray-600 font-medium text-xs mb-4 line-clamp-2 leading-relaxed italic">
              "{blog.excerpt}"
            </p>

            <div className="mt-auto flex items-center justify-between border-t border-amber-100 pt-4">
              <span className="text-[10px] font-medium text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-600" />
                {blog.date}
              </span>
              <span className="text-amber-600 text-[10px] font-medium uppercase tracking-widest flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {blog.readTime}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Layout>
      <div className="min-h-screen bg-[#FAF9F6] relative overflow-hidden">
        {/* Divine Background Ornaments */}
        <div className="absolute top-[10%] right-0 w-[500px] h-[500px] bg-orange-100/20 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-[20%] left-0 w-[500px] h-[500px] bg-amber-100/20 rounded-full blur-[120px] -z-10" />

        {/* Hero Section (Dynamic) */}
        <section className="relative h-[320px] sm:h-[320px] md:h-[360px] lg:h-[370px] flex items-center py-[20px] text-white overflow-hidden">
          <div className="absolute inset-0">
            {banner?.imageUrl ? (
              <img
                src={`${BACKEND_URL}${banner.imageUrl}`}
                alt="Background"
                className="w-full h-full object-cover object-center"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-orange-900 to-red-900 opacity-80" />
            )}
            <div className="absolute inset-0 bg-black/40" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 mb-4 md:mb-8 shadow-2xl">
                <Sparkles className="w-3.5 h-3.5 text-[#FFC107]" />
                <span className="text-[#FFC107] text-xs md:text-sm font-black uppercase tracking-widest">
                  {banner?.badge || blogSettings?.badge || "KNOWLEDGE HUB"}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)] uppercase">
                {banner?.titleHighlight1 ? (
                  <>
                    {banner?.titleHighlight1}{" "}
                    <span className="text-yellow-300">{banner?.titleHighlight2}</span>{" "}
                    {banner?.titleHighlight3} {banner?.titleEnd}
                  </>
                ) : (
                  blogSettings?.title || "Discover Ancient Wisdom for Modern Life"
                )}
              </h1>

              <p className="text-lg md:text-xl text-amber-100 leading-relaxed drop-shadow max-w-2xl mx-auto mb-4 md:mb-7">
                {banner?.subtitle || blogSettings?.subtitle || "Curated spiritual knowledge blending timeless traditions with contemporary insights."}
              </p>

              <div className="max-w-2xl mx-auto relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-orange-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                <div className="relative">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-600" />
                  <input
                    type="text"
                    placeholder="Search for puja vidhi, astrology tips..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-14 pr-10 py-1.5 md:py-2.5 rounded-xl bg-white/95 backdrop-blur-md text-gray-900 font-medium shadow-2xl focus:outline-none border-2 border-amber-100/50 focus:border-amber-500 transition-all placeholder:text-gray-400"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-600 font-black"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Bar (Premium Sticky) */}
        <section className="py-6 sticky top-0 bg-white/80 backdrop-blur-md z-40 border-b border-orange-100/50 shadow-sm overflow-x-auto">
          <div className="container mx-auto px-4">
            <div className="flex justify-center gap-3 min-w-max">
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
                  {activeCategory === category && <Sparkles className="w-3 h-3 text-amber-400" />}
                </button>
              ))}
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 max-w-7xl py-12 md:py-16">
          {noResultsFound ? (
            <section className="py-12 md:py-16 text-center animate-fade-in">
              <BookOpen className="w-20 h-20 text-orange-200 mx-auto mb-6" />
              <h2 className="text-3xl font-black text-[#2A1D13] mb-4 uppercase tracking-tight">No articles found!</h2>
              <p className="text-gray-500 font-medium mb-10 max-w-md mx-auto">We couldn't find any articles matching your search. Please try different keywords or category.</p>
              <button onClick={resetFilters} className="bg-[#E8453C] hover:bg-black text-white px-10 py-4 rounded-xl font-medium text-xs uppercase tracking-widest transition-all">Show All Articles</button>
            </section>
          ) : (
            <div className="space-y-16">
              {/* Featured Section */}
              {filteredFeaturedBlogs.length > 0 && (activeCategory === "All" || filteredFeaturedBlogs.some(b => b.category === activeCategory)) && (
                <section>
                  <div className="text-center mb-12 animate-fade-in-up">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 text-orange-600 rounded-full text-xs font-medium uppercase tracking-wider mb-4">
                      <Star className="w-3.5 h-3.5" />
                      <span>Featured Reading</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black text-[#2A1D13] mb-4 uppercase tracking-tight">Must-Read <span className="text-orange-600">Guides</span></h2>
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-12 h-1 bg-orange-200 rounded-full" />
                      <Sparkles className="w-5 h-5 text-orange-400" />
                      <div className="w-12 h-1 bg-orange-200 rounded-full" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredFeaturedBlogs.map((blog, idx) => (
                      <BlogCard key={blog._id} blog={blog} isFeatured={true} index={idx} />
                    ))}
                  </div>
                </section>
              )}

              {/* Latest Articles */}
              <section>
                <div className="text-center mb-12 animate-fade-in-up">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 text-orange-600 rounded-full text-xs font-medium uppercase tracking-wider mb-4">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Deep Wisdom</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black text-[#2A1D13] mb-4 uppercase tracking-tight">{searchQuery ? 'Search Results' : 'Latest Articles'}</h2>
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-12 h-1 bg-orange-200 rounded-full" /><Sparkles className="w-5 h-5 text-orange-400" /><div className="w-12 h-1 bg-orange-200 rounded-full" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredLatestArticles.map((article, idx) => (
                    <BlogCard key={article._id} blog={article} index={idx} />
                  ))}
                </div>
              </section>
            </div>
          )}
        </div>

        {/* CTA Section (Matching About Page Perfectly) */}
        <section className="py-12 md:py-16 bg-white border-t border-orange-50">
          <div className="container mx-auto px-4 text-center max-w-5xl">
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50/50 text-orange-600 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6">
                <Leaf className="w-3.5 h-3.5" />
                <span>Spiritual Growth</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2A1B13] mb-4 tracking-tight uppercase">Begin Your <span className="text-[#E8453C]">Divine Journey</span></h2>
              <div className="flex items-center justify-center gap-3 mb-8">
                <div className="w-10 h-[1.5px] bg-orange-200" />
                <Sparkles className="w-5 h-5 text-orange-400" />
                <div className="w-10 h-[1.5px] bg-orange-200" />
              </div>
              <p className="text-gray-600 mb-10 text-sm md:text-base font-medium max-w-2xl mx-auto leading-relaxed">
                Get personalized guidance from experienced Acharyas following authentic Vedic traditions. Experience the profound impact of divine wisdom in your life.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent('openPoojaDrawer'))}
                  className="group relative bg-[#E8453C] hover:bg-[#CC3B34] text-white px-8 py-4 rounded-none font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <span className="relative flex items-center gap-2.5">
                    <MessageCircle className="w-4 h-4" /> Book Puja Now
                  </span>
                </button>
                <Link to="/contact">
                  <button className="group relative bg-[#F59E0B] hover:bg-[#D97706] text-white px-8 py-4 rounded-none font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] shadow-xl transition-all duration-300 overflow-hidden">
                    <div className="absolute inset-0 bg-black/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    <span className="relative flex items-center gap-2.5">
                      <Phone className="w-4 h-4" /> Contact Us
                    </span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Modal Lightbox */}
        {selectedMedia && (
          <div onClick={() => setSelectMedia(null)} className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
            <button onClick={() => setSelectMedia(null)} className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all group overflow-hidden">
              <X className="w-6 h-6 text-white group-hover:scale-125 transition-transform" />
            </button>
            <div onClick={(e) => e.stopPropagation()} className="bg-[#FCFBF7] rounded-[2rem] w-full max-w-4xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] border border-amber-200 animate-scale-in">
              <div className="relative h-64 sm:h-80 md:h-[400px]">
                <img src={selectedMedia.imageUrl ? `${BACKEND_URL}${selectedMedia.imageUrl}` : 'https://placehold.co/1200x800/FFF8F0/D97706?text=Blog+Image'} alt={selectedMedia.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2A1D13] to-transparent" />
                <div className="absolute bottom-10 left-10 right-10">
                  <span className="bg-amber-500 text-white px-3 py-1 text-[10px] font-medium uppercase tracking-widest mb-4 inline-block rounded-full">Vedic Insight</span>
                  <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight leading-tight drop-shadow-2xl">{selectedMedia.title}</h2>
                </div>
              </div>
              <div className="p-10 md:p-12">
                <div className="flex items-center justify-center gap-3 mb-8">
                  <div className="h-[1px] w-12 bg-amber-200" />
                  <Sparkle className="w-6 h-6 text-amber-500" />
                  <div className="h-[1px] w-12 bg-amber-200" />
                </div>
                <p className="text-gray-700 text-lg md:text-xl font-medium leading-relaxed mb-10 italic text-center">"{selectedMedia.excerpt}"</p>
                <div className="flex justify-center gap-10 mb-12 pb-8 border-b border-orange-100">
                  <div className="text-center">
                    <span className="text-[10px] font-medium text-gray-400 uppercase tracking-widest mb-2 block">Read Time</span>
                    <span className="font-medium text-amber-600 text-base uppercase">{selectedMedia.readTime}</span>
                  </div>
                  <div className="text-center">
                    <span className="text-[10px] font-medium text-gray-400 uppercase tracking-widest mb-2 block">Published</span>
                    <span className="font-medium text-[#2A1D13] text-base uppercase">{selectedMedia.date}</span>
                  </div>
                  <div className="text-center">
                    <span className="text-[10px] font-medium text-gray-400 uppercase tracking-widest mb-2 block">Category</span>
                    <span className="font-medium text-amber-600 text-base uppercase">{selectedMedia.category}</span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-6">
                  <button className="flex-1 bg-[#E8453C] hover:bg-black text-white py-5 rounded-xl font-medium text-[10px] sm:text-xs uppercase tracking-[0.3em] shadow-2xl transition-all">Read Full Article</button>
                  <button className="flex-1 bg-[#2A1D13] hover:bg-black text-white py-5 rounded-xl font-medium text-[10px] sm:text-xs uppercase tracking-[0.3em] shadow-2xl transition-all border border-amber-400/30">Consult Acharya</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Blog;
