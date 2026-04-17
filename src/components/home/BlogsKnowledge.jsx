import React, { useState, useEffect } from 'react';
import { BookOpen, Calendar, ArrowRight, Clock, Star, Sparkles, Tag, TrendingUp, Zap, Users, Globe, BarChart, Award, ChevronRight } from 'lucide-react';
import SectionHeader from '../common/SectionHeader';
import { Link } from 'react-router-dom';

import Astrology_vs_Horoscope_Complete_Guide from "../../assets/blogs/Astrology vs Horoscope_ Complete Guide.webp"
import Gemstones_Celestial_Healing from "../../assets/blogs/Gemstones_ Celestial Healing.webp"
import Griha_Pravesh_Puja_Ultimate_Guide from "../../assets/blogs/Griha Pravesh Puja_ Ultimate Guide.webp"
import Meditation_Techniques_Ancient_to_Modern from "../../assets/blogs/Meditation Techniques_ Ancient to Modern.webp"
import Navgraha_Shanti_Planetary_Harmony from "../../assets/blogs/Navgraha Shanti_ Planetary Harmony.webp"
import Vastu_Shastra_Modern_Applications from "../../assets/blogs/Vastu Shastra_ Modern Applications.webp"

import { useGetActiveBlogsQuery, useGetBlogSettingsQuery } from '../../services/blogApi';
import { BACKEND_URL, getImageUrl } from '../../config/apiConfig';

const BlogsKnowledge = () => {
  const { data: blogs = [], isLoading } = useGetActiveBlogsQuery(undefined, { pollingInterval: 5000 });
  const { data: settings } = useGetBlogSettingsQuery();


  const categoryIcons = {
    'Astrology Knowledge': Sparkles,
    'Puja Masterclass': Tag,
    'Advanced Rituals': Star,
    'Vastu Science': TrendingUp,
    'Healing Remedies': Zap,
    'Mind & Spirit': BookOpen
  };

  const categories = [
    { name: 'All Articles', count: blogs.length, icon: BookOpen, bg: 'bg-purple-50' },
    ...Array.from(new Set(blogs.map(b => b.category))).map(cat => ({
      name: cat,
      count: blogs.filter(b => b.category === cat).length,
      icon: categoryIcons[cat] || Zap,
      bg: 'bg-orange-50'
    }))
  ];

  if (isLoading && blogs.length === 0) return null;


  return (
    <section className="relative py-12 md:py-16 px-4 sm:px-6 overflow-hidden bg-gray-50/40">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `radial-gradient(circle, #E8453C 0.8px, transparent 0.8px)`,
          backgroundSize: '28px 28px'
        }} />
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl" style={{ backgroundColor: 'rgba(232,69,60,0.04)' }} />
        <div className="absolute bottom-20 right-10 w-64 h-64 rounded-full blur-3xl" style={{ backgroundColor: 'rgba(232,69,60,0.03)' }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeader
          badge={settings?.badge || "Knowledge Hub"}
          title={settings?.title || "Discover Ancient Wisdom for Modern Life"}
          subtitle={settings?.subtitle || "Curated spiritual knowledge blending timeless traditions with contemporary insights"}
        />

        {/* Featured Blogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
          {blogs.map((blog, index) => (
            <Link
                to={blog.url}
                key={blog._id} 
                className="group relative flex flex-col h-full rounded-2xl bg-white border border-slate-100 hover:border-orange-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl overflow-hidden animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'both' }}
            >
                {/* IMAGE */}
                <div className="relative h-48 overflow-hidden">
                    <img
                        src={getImageUrl(blog.imageUrl)}
                        alt={blog.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                    />

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                        <span className="bg-white/95 backdrop-blur-md text-[#E8453C] text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg border border-orange-100">
                            {blog.category}
                        </span>
                    </div>

                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
                </div>

                {/* CONTENT */}
                <div className="p-6 relative flex flex-col flex-1 bg-white">
                    <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-3">
                        <Calendar className="w-3.5 h-3.5 text-orange-600" />
                        {blog.date}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-3 leading-tight line-clamp-2 group-hover:text-orange-600 transition-colors">
                        {blog.title}
                    </h3>
                    <p className="text-slate-600 text-xs leading-relaxed mb-6 line-clamp-3 font-medium flex-1">
                        {blog.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-50 mt-auto">
                        <span className="text-slate-900 font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-2 group-hover:text-orange-600 transition-all">
                            Read Article <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 rounded-lg">
                            <Clock className="w-3 h-3 text-orange-600" />
                            <span className="text-slate-500 text-[9px] font-bold uppercase tracking-wider">
                                {blog.readTime}
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
          ))}
        </div>

        {/* Categories Bar */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <button
                key={index}
                className={`group relative overflow-hidden ${category.bg} rounded-full px-6 py-3 border border-orange-100/50 hover:border-orange-500/30 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-4 h-4 text-orange-600" strokeWidth={2.5} />
                  </div>
                  <span className="text-sm font-bold text-slate-700 group-hover:text-orange-600 transition-colors duration-300">
                    {category.name}
                  </span>
                  <div className="px-2 py-0.5 bg-orange-100 text-orange-700 rounded-md text-[10px] font-black group-hover:bg-orange-600 group-hover:text-white transition-all">
                    {category.count}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* View All CTA */}
        <div className="mt-12 text-center">
            <Link to="/blog">
                <button className="group relative inline-flex items-center gap-3 px-8 py-4 bg-[#2A1D13] text-white rounded-none font-black text-xs uppercase tracking-[0.3em] overflow-hidden shadow-2xl transition-all hover:bg-orange-600">
                    <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                    <span className="relative">Browse All Wisdom</span>
                    <ChevronRight className="w-4 h-4 relative group-hover:translate-x-1 transition-transform" />
                </button>
            </Link>
        </div>
      </div>

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default BlogsKnowledge;