import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
    Star, Clock, Users, BookOpen, ChevronRight, Award, Sparkles,
    CheckCircle, Shield, TrendingUp, Heart, Briefcase, Sun,
    MessageSquare, IndianRupee, Phone, PlayCircle, Sprout, GraduationCap, Compass
} from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Link } from 'react-router-dom';
import { usePageBanner } from "@/hooks/usePageBanner";
import { BACKEND_URL, getImageUrl } from "@/config/apiConfig";
import { useGetLearningPageBySlugQuery } from '@/services/learningContentApi';
import SEO from '@/components/layout/SEO';

import rudrakshaImg from '../../assets/vastuRamadies/Rudraksha.webp';

// Icon Map for dynamic icons from backend
const iconMap = {
    Star, Clock, Users, BookOpen, ChevronRight, Award, Sparkles,
    CheckCircle, Shield, TrendingUp, Heart, Briefcase, Sun,
    MessageSquare, IndianRupee, Phone, PlayCircle, Sprout, GraduationCap, Compass
};

const DynamicIcon = ({ name, className }) => {
    const IconComponent = iconMap[name] || Star;
    return <IconComponent className={className} />;
};

// ─── Course Card Component ──────────────────────────────────────────────────
const CourseCard = ({ title, duration, price, level, rating, students, image, isFeatured, slug, pageSlug }) => (
    <div className="group/card h-full animate-fade-in-up">
        <div className="relative h-full p-[1.5px] rounded-3xl bg-amber-400/40 hover:bg-amber-500 transition-all duration-700 shadow-xl flex flex-col">
            <div className="relative flex-grow bg-[#FCFBF7] rounded-[1.4rem] overflow-hidden flex flex-col group-hover/card:bg-white transition-all duration-500">

                {/* Image / Video */}
                <div className="relative m-2.5 mb-3 rounded-2xl overflow-hidden shadow-lg h-48 z-10">
                    {(() => {
                        const mediaSrc = getImageUrl(image);
                        const isVideo = mediaSrc?.match(/\.(mp4|webm|ogg)$/i);
                        return isVideo ? (
                            <video src={mediaSrc} autoPlay loop muted playsInline className="w-full h-full object-cover transition-all duration-[2.5s] group-hover/card:scale-110" />
                        ) : (
                            <img src={mediaSrc || rudrakshaImg} alt={title} className="w-full h-full object-cover transition-all duration-[2.5s] group-hover/card:scale-110" />
                        );
                    })()}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />
                    <div className="absolute top-4 right-4 bg-orange-600 text-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] shadow-lg flex items-center gap-1.5">
                        <Award className="w-3 h-3" /> {level}
                    </div>
                    {isFeatured && (
                        <div className="absolute top-4 left-4 bg-amber-400 text-black px-3 py-1 text-[9px] font-black uppercase tracking-widest shadow-lg">
                            Featured
                        </div>
                    )}
                    <div className="absolute bottom-6 left-6 right-6">
                        <h3 className="text-xl font-bold text-white leading-tight uppercase tracking-tight group-hover/card:text-orange-300 transition-colors">
                            {title}
                        </h3>
                    </div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-grow px-5 pb-5 relative z-20">

                    {/* Meta */}
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-[#4A3427] uppercase tracking-widest">
                            <Clock className="w-3.5 h-3.5 text-orange-600" />
                            <span>{duration || "Flexible"}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs font-bold text-[#4A3427] uppercase tracking-widest">
                            <Users className="w-3.5 h-3.5 text-orange-600" />
                            <span>{students || 0}+ Enrolled</span>
                        </div>
                    </div>

                    {/* Stars */}
                    <div className="flex items-center justify-center gap-0.5 mb-4">
                        {[1, 2, 3, 4, 5].map(s => (
                            <Star key={s} className={`w-3.5 h-3.5 ${s <= (rating || 5) ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`} />
                        ))}
                        <span className="text-[10px] text-gray-400 font-bold ml-1.5">({rating || 5}.0)</span>
                    </div>

                    {/* Price + CTA */}
                    <div className="mt-auto pt-4 border-t border-orange-50 flex items-center justify-between">
                        <div>
                            <span className="text-[9px] text-gray-400 font-black uppercase tracking-widest block">Starting At</span>
                            <span className="text-xl font-black text-orange-600">₹{price?.toLocaleString() || 0}</span>
                        </div>
                        <Link to={`/learn/${pageSlug}/${slug}`}>
                            <button className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#2A1D13] text-amber-400 font-black text-[10px] uppercase tracking-[0.2em] transition-all hover:bg-orange-600 hover:text-white shadow-lg">
                                View Details <ChevronRight className="w-3.5 h-3.5 group-hover/card:translate-x-1 transition-transform" />
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

// ─── Main Component ──────────────────────────────────────────────────────────
const CommonLearningPage = ({ slug: slugOverride }) => {
    const { slug: slugParam } = useParams();
    const derivedSlug = slugOverride || slugParam;
    const slug = (derivedSlug && derivedSlug !== 'undefined') ? derivedSlug : 'astrology';
    const validSlug = slug;

    const banner = usePageBanner({ pollingInterval: 60000 });
    const bannerImage = getImageUrl(banner?.imageUrl);

    const { data: pageData, isLoading, isError } = useGetLearningPageBySlugQuery(validSlug, {
        skip: validSlug === 'undefined' || !validSlug,
        pollingInterval: 60000,
    });


    const [activeCategory, setActiveCategory] = useState('all');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [validSlug]);

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center bg-orange-50/20">
            <div className="w-16 h-16 border-4 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
        </div>;
    }

    if (isError || !pageData) {
        return <div className="min-h-screen flex items-center justify-center">Error loading page content.</div>;
    }

    if (pageData.isActive === false) {
        return (
            <Layout>
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-orange-50/30 to-amber-50/20 relative overflow-hidden">
                    <div className="absolute top-[20%] right-0 w-[500px] h-[500px] bg-orange-100/20 rounded-full blur-[120px]" />
                    <div className="absolute bottom-[20%] left-0 w-[500px] h-[500px] bg-amber-100/20 rounded-full blur-[120px]" />
                    <div className="text-center relative z-10 max-w-lg mx-auto px-4">
                        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-orange-100 flex items-center justify-center">
                            <Shield className="w-12 h-12 text-orange-400" />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-black text-gray-900 uppercase tracking-tight mb-3">
                            Page <span className="text-orange-600">Unavailable</span>
                        </h1>
                        <div className="flex items-center justify-center gap-2 mb-6">
                            <div className="w-12 h-1 bg-orange-200 rounded-full" />
                            <Sparkles className="w-5 h-5 text-orange-400" />
                            <div className="w-12 h-1 bg-orange-200 rounded-full" />
                        </div>
                        <p className="text-gray-500 text-sm font-medium leading-relaxed mb-8">
                            This learning portal is currently under maintenance. Our team is working on updating the content. Please check back soon.
                        </p>
                        <Link to="/">
                            <button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 font-black text-xs uppercase tracking-[0.2em] transition-all shadow-lg">
                                Return to Home
                            </button>
                        </Link>
                    </div>
                </div>
            </Layout>
        );
    }

    const filteredItems = activeCategory === 'all'
        ? pageData.items
        : pageData.items.filter(item => item.category === activeCategory);

    return (
        <Layout>
            <SEO
                title={pageData.seo?.title || pageData.pageName}
                description={pageData.seo?.description}
                keywords={pageData.seo?.keywords}
            />
            <div className="min-h-screen bg-[#FAF9F6] relative overflow-hidden">
                {/* Background Ornaments */}
                <div className="absolute top-[20%] right-0 w-[500px] h-[500px] bg-orange-100/20 rounded-full blur-[120px] -z-10" />
                <div className="absolute bottom-[20%] left-0 w-[500px] h-[500px] bg-amber-100/20 rounded-full blur-[120px] -z-10" />

                {/* ── Hero Section ─────────────────────────────────────────── */}
                <section className="relative h-[320px] sm:h-[320px] md:h-[360px] lg:h-[380px] flex items-center text-white overflow-hidden">
                    <div className="absolute inset-0">
                        <img src={bannerImage} alt={`${pageData.pageName} Banner`} className="w-full h-full object-cover object-top" />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black/65" />
                        <div className="absolute inset-0 backdrop-blur-[1px]" />
                        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,rgba(217,119,6,0.2),transparent_50%)]" />
                    </div>
                    <div className="container mx-auto px-4 relative z-10">
                        <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 mb-4 md:mb-8 shadow-2xl">
                                <Award className="w-4 h-4 text-[#FFC107]" />
                                <span className="text-[#FFC107] text-xs md:text-sm font-serif font-bold uppercase tracking-[0.2em]">{banner.badge || "DIVINE HUB"}</span>
                            </div>
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4 leading-tight drop-shadow-[0_8px_24px_rgba(0,0,0,0.5)] uppercase tracking-wide">
                                {banner.titleHighlight1} {banner.titleEnd} <br />
                                <span className="text-amber-400 drop-shadow-[0_2px_10px_rgba(251,191,36,0.2)]">{banner.titleHighlight2} {banner.titleHighlight3}</span>
                            </h1>
                            <p className="text-lg md:text-xl text-amber-50 leading-relaxed font-medium max-w-2xl mx-auto mb-2 md:mb-8 italic opacity-90 drop-shadow-lg">
                                {banner.subtitle}
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                {banner.buttons && banner.buttons.length > 0 ? (
                                    banner.buttons.map((btn, idx) => (
                                        btn.text && (
                                            <button
                                                key={idx}
                                                onClick={() => btn.link?.startsWith('#') ? document.getElementById(btn.link.substring(1))?.scrollIntoView({ behavior: 'smooth' }) : (btn.link === '#book-pooja' ? window.dispatchEvent(new CustomEvent('openPoojaDrawer')) : (btn.link ? window.location.href = btn.link : null))}
                                                className={`group relative ${idx === 0 ? 'bg-[#E8453C] hover:bg-[#CC3B34] w-72 md:w-auto' : 'bg-[#25D366] hover:bg-[#128C7E] hidden md:flex'} text-white px-8 py-4 rounded-none font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] shadow-xl transition-all duration-300 overflow-hidden`}
                                            >
                                                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                                <span className="relative flex items-center gap-2.5">
                                                    {idx === 0 ? <BookOpen className="w-4 h-4" /> : <PlayCircle className="w-4 h-4" />}
                                                    {btn.text}
                                                </span>
                                            </button>
                                        )
                                    ))
                                ) : (
                                    <>
                                        <button
                                            onClick={() => document.getElementById('courses-section')?.scrollIntoView({ behavior: 'smooth' })}
                                            className="group relative bg-[#E8453C] hover:bg-[#CC3B34] text-white w-72 md:w-auto px-8 py-4 rounded-none font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] shadow-xl transition-all duration-300 overflow-hidden"
                                        >
                                            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                            <span className="relative flex items-center justify-center gap-2.5"><BookOpen className="w-4 h-4" /> Explore Courses</span>
                                        </button>
                                        <button className="group relative bg-[#25D366] hover:bg-[#128C7E] text-white px-8 py-4 rounded-none font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] shadow-xl transition-all duration-300 overflow-hidden hidden md:block">
                                            <div className="absolute inset-0 bg-black/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                            <span className="relative flex items-center gap-2.5"><PlayCircle className="w-4 h-4" /> Free Webinar</span>
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── What is Section (2-col About style) ─────────────────── */}
                <section className="py-12 md:py-16 bg-white overflow-x-hidden relative">
                    <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-orange-100/30 rounded-full blur-3xl -z-10" />
                    <div className="container mx-auto px-4">
                        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                            <div className="animate-slide-in-left">
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-[11px] font-bold uppercase tracking-wider mb-5">
                                    <Sparkles className="w-3.5 h-3.5" />
                                    <span>{pageData.introSection?.badge || 'Sacred Knowledge'}</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 leading-tight">
                                    {(pageData.introSection?.title || '').split(' ').map((word, i, arr) =>
                                        i === arr.length - 1 ? <span key={i} className="text-orange-600"> {word}</span> : word + ' '
                                    )}
                                </h2>
                                <div className="flex items-center gap-2 mb-5">
                                    <div className="w-12 h-1 bg-orange-200 rounded-full" />
                                    <Sparkles className="w-5 h-5 text-orange-400" />
                                    <div className="w-12 h-1 bg-orange-200 rounded-full" />
                                </div>
                                <div className="space-y-4 text-gray-700 font-medium text-sm md:text-base">
                                    <p className="leading-relaxed">
                                        {pageData.introSection?.subtitle}
                                    </p>
                                    <p className="leading-relaxed font-bold text-orange-600 italic">
                                        {pageData.introSection?.highlightText}
                                    </p>
                                </div>
                                <div className="mt-8 grid grid-cols-2 gap-4">
                                    {pageData.introSection?.features?.map((feat, idx) => (
                                        <div key={idx} className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center border border-orange-100">
                                                <DynamicIcon name={feat.icon} className="w-5 h-5 text-orange-600" />
                                            </div>
                                            <span className="text-xs font-black text-[#2A1D13] uppercase tracking-widest">{feat.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="relative group flex justify-center animate-slide-in-right">
                                <div className="relative w-full max-w-lg p-2 bg-gradient-to-br from-amber-100 to-amber-300 rounded-[2rem] shadow-2xl">
                                    <div className="w-full h-[300px] md:h-[400px] rounded-3xl overflow-hidden border-[4px] border-white relative z-10">
                                        {(() => {
                                            const mediaSrc = getImageUrl(pageData.introSection?.image);
                                            const isVideo = mediaSrc?.match(/\.(mp4|webm|ogg)$/i);
                                            return isVideo ? (
                                                <video src={mediaSrc} autoPlay loop muted playsInline className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                                            ) : (
                                                <img src={mediaSrc || rudrakshaImg} alt={pageData.pageName} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                                            );
                                        })()}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                        <div className="absolute bottom-6 left-6 right-6 text-white">
                                            <p className="text-sm font-black uppercase tracking-[0.2em] mb-1">Divine Knowledge</p>
                                            <h4 className="text-xl font-bold italic">"Unlocking Sacred Wisdom"</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Course Categories + Cards ─────────────────────────────── */}
                <section id="courses-section" className="py-12 md:py-16 bg-[#FAF9F6] relative overflow-hidden">
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #d97706 1px, transparent 0)', backgroundSize: '32px 32px' }} />
                    <div className="container mx-auto px-4 max-w-7xl relative z-10">

                        {/* Section Header */}
                        <div className="text-center mb-12 animate-fade-in-up">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 text-orange-600 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                                <Star className="w-3.5 h-3.5" />
                                <span>Sacred Learning Paths</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 uppercase">
                                Explore Our <span className="text-orange-600">Categories</span>
                            </h2>
                            <div className="flex items-center justify-center gap-2">
                                <div className="w-12 h-1 bg-orange-200 rounded-full" />
                                <Sparkles className="w-5 h-5 text-orange-400" />
                                <div className="w-12 h-1 bg-orange-200 rounded-full" />
                            </div>
                        </div>

                        {/* Category Overview Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
                            {pageData.categories?.map(cat => (
                                <button
                                    key={cat.key}
                                    onClick={() => setActiveCategory(cat.key)}
                                    className={`group text-left bg-gradient-to-br ${cat.color || 'from-orange-500 to-amber-500'} text-white p-7 shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl ${activeCategory === cat.key ? 'ring-4 ring-amber-400 ring-offset-2 scale-[1.02]' : ''}`}
                                >
                                    <div className="mb-4">
                                        <DynamicIcon name={cat.icon} className="w-12 h-12 text-white/90 group-hover:scale-110 transition-transform" />
                                    </div>
                                    <h3 className="text-xl font-black mb-2 uppercase tracking-tight">{cat.label || cat.title}</h3>
                                    <ul className="space-y-1.5 text-sm opacity-90">
                                        {cat.items?.map(item => <li key={item} className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 opacity-70" /> {item}</li>)}
                                    </ul>
                                </button>
                            ))}
                        </div>

                        {/* Filter Pills */}
                        <div className="flex flex-wrap justify-center gap-3 mb-10">
                            <button
                                onClick={() => setActiveCategory('all')}
                                className={`px-6 py-2.5 font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-300 ${activeCategory === 'all'
                                    ? 'bg-orange-600 text-white shadow-xl scale-105'
                                    : 'bg-white text-[#4A3427] border border-orange-100 hover:border-orange-400 hover:text-orange-600'}`}
                            >
                                All Contents
                            </button>
                            {pageData.categories?.map(({ key, label, title }) => (
                                <button
                                    key={key}
                                    onClick={() => setActiveCategory(key)}
                                    className={`px-6 py-2.5 font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-300 ${activeCategory === key
                                        ? 'bg-orange-600 text-white shadow-xl scale-105'
                                        : 'bg-white text-[#4A3427] border border-orange-100 hover:border-orange-400 hover:text-orange-600'}`}
                                >
                                    {label || title}
                                </button>
                            ))}
                        </div>

                        {/* Course Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredItems?.map(item => (
                                <CourseCard key={item._id || item.id} {...item} pageSlug={slug} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Benefits Section ───────────────────────── */}
                <section className="py-12 md:py-16 bg-[#FFFDF7] relative overflow-hidden">
                    <div className="container mx-auto px-4 max-w-7xl relative z-10">
                        <div className="text-center mb-16 animate-fade-in-up">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 text-orange-600 rounded-full text-[10px] font-extrabold uppercase tracking-[0.2em] mb-4">
                                <Shield className="w-3.5 h-3.5" />
                                <span>Life Changing Impact</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6 uppercase">
                                Why Learn <span className="text-orange-600">With Us?</span>
                            </h2>
                            <div className="flex items-center justify-center gap-2">
                                <div className="w-12 h-1 bg-orange-200 rounded-full" /><Sparkles className="w-5 h-5 text-orange-400" /><div className="w-12 h-1 bg-orange-200 rounded-full" />
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {pageData.benefits?.map((item, idx) => (
                                <div key={idx} className="group bg-white p-6 hover:shadow-2xl transition-all duration-500 border-2 border-orange-100 flex items-start gap-5 rounded-none animate-fade-in-up" style={{ animationDelay: `${idx * 0.1}s`, animationFillMode: 'both' }}>
                                    <div className="w-16 h-16 rounded-none bg-orange-50 flex items-center justify-center flex-shrink-0 group-hover:bg-orange-600 transition-all duration-500 shadow-inner">
                                        <DynamicIcon name={item.icon} className="w-8 h-8 text-orange-600 group-hover:text-white transition-all transform group-hover:scale-110" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-extrabold text-[#4A3427] mb-2 leading-tight uppercase group-hover:text-orange-600 transition-colors">{item.title}</h3>
                                        <p className="text-gray-500 text-[10px] font-bold leading-relaxed uppercase tracking-widest">{item.description || item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Student Testimonials ──────────────────────────────────── */}
                <section className="py-12 md:py-16 bg-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-amber-50 rounded-full blur-3xl -mr-32 -mt-32" />
                    <div className="container mx-auto px-4 max-w-6xl relative z-10">
                        <div className="text-center mb-12 animate-fade-in-up">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-50 text-green-700 rounded-full text-[10px] font-extrabold uppercase tracking-[0.2em] mb-4">
                                <Star className="w-3.5 h-3.5 fill-green-700" /> Student Stories
                            </div>
                            <h2 className="text-3xl md:text-4xl font-black text-[#4A3427] mb-6">
                                What Our <span className="text-orange-600">Students Say</span>
                            </h2>
                            <div className="flex items-center justify-center gap-2">
                                <div className="w-12 h-1 bg-orange-200 rounded-full" /><Sparkles className="w-5 h-5 text-orange-400" /><div className="w-12 h-1 bg-orange-200 rounded-full" />
                            </div>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                            {pageData.testimonials?.map((review, idx) => (
                                <div key={idx} className="bg-[#FFFDF7] p-8 border border-orange-100 shadow-lg rounded-none relative animate-fade-in-up" style={{ animationDelay: `${idx * 0.1}s`, animationFillMode: 'both' }}>
                                    <div className="absolute -top-4 -left-2 text-6xl text-orange-100 font-serif opacity-50">"</div>
                                    <div className="flex gap-1 mb-6">
                                        {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />)}
                                    </div>
                                    <p className="text-gray-600 font-medium text-sm mb-6 leading-relaxed italic">"{review.quote}"</p>
                                    <div className="border-t border-orange-50 pt-5">
                                        <h4 className="font-extrabold text-[#4A3427] text-sm uppercase tracking-wider">{review.author}</h4>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-[10px] text-orange-600 font-black uppercase tracking-[0.2em]">{review.role}</span>
                                            <CheckCircle className="w-3 h-3 text-green-500" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── FAQ ──────────────────────────────────────────────────── */}
                <section className="py-12 md:py-16 bg-[#FAF9F6] relative overflow-hidden">
                    <div className="container mx-auto px-4 max-w-5xl relative z-10">
                        <div className="text-center mb-12 animate-fade-in-up">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50/50 text-orange-600 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                                <BookOpen className="w-3.5 h-3.5" />
                                <span>Knowledge Base</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-[#2A1B13] mb-4 uppercase tracking-tight">
                                Frequently Asked <span className="text-orange-600">Questions</span>
                            </h2>
                            <div className="flex items-center justify-center gap-3">
                                <div className="w-10 h-[1.5px] bg-orange-200" />
                                <Sparkles className="w-5 h-5 text-orange-400" />
                                <div className="w-10 h-[1.5px] bg-orange-200" />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {pageData.faqs?.map((faq, idx) => (
                                <div key={idx} className="group bg-white p-8 border border-orange-100 hover:border-orange-500 transition-all duration-500 relative rounded-none animate-fade-in-up">
                                    <div className="absolute top-0 right-0 w-8 h-8 bg-orange-50 group-hover:bg-orange-600 transition-colors" />
                                    <h3 className="text-sm font-bold text-[#4A3427] mb-3 uppercase tracking-tight leading-tight group-hover:text-orange-600 transition-colors flex items-start gap-2">
                                        <ChevronRight className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                                        {faq.question || faq.q}
                                    </h3>
                                    <p className="text-gray-400 text-[10px] font-semibold uppercase tracking-[0.15em] leading-relaxed italic ml-6">{faq.answer || faq.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Final CTA ─────────────────────────────────────────────── */}
                <section className="py-12 md:py-16 bg-white border-t border-orange-50">
                    <div className="container mx-auto px-4 text-center max-w-5xl animate-fade-in-up">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50/50 text-orange-600 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>{pageData.ctaSection?.badge || 'Begin Your Cosmic Journey'}</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2A1B13] mb-4 tracking-tight uppercase">
                            {(pageData.ctaSection?.title || 'Ready to Begin Your Journey?').split(' ').slice(0, -1).join(' ')} <span className="text-[#E8453C]">{(pageData.ctaSection?.title || 'Ready to Begin Your Journey?').split(' ').slice(-1)}</span>
                        </h2>
                        <div className="flex items-center justify-center gap-3 mb-8">
                            <div className="w-10 h-[1.5px] bg-orange-200" />
                            <Sparkles className="w-5 h-5 text-orange-400" />
                            <div className="w-10 h-[1.5px] bg-orange-200" />
                        </div>
                        <p className="text-gray-600 mb-10 text-sm md:text-base font-medium max-w-2xl mx-auto leading-relaxed uppercase tracking-wide">
                            {pageData.ctaSection?.description || 'Join thousands of students who have transformed their lives through ancient Vedic wisdom. 30-day money-back guarantee included.'}
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <button
                                onClick={() => document.getElementById('courses-section')?.scrollIntoView({ behavior: 'smooth' })}
                                className="group relative bg-[#E8453C] hover:bg-[#CC3B34] text-white px-10 py-4 rounded-none font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] shadow-xl transition-all duration-300 overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                <span className="relative flex items-center gap-2.5"><BookOpen className="w-4 h-4" /> {pageData.ctaSection?.primaryBtnText || 'Browse All Courses'}</span>
                            </button>
                            <Link to="/contact">
                                <button className="group relative bg-[#F59E0B] hover:bg-[#D97706] text-white px-10 py-4 rounded-none font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] shadow-xl transition-all duration-300 overflow-hidden">
                                    <div className="absolute inset-0 bg-black/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                    <span className="relative flex items-center gap-2.5"><MessageSquare className="w-4 h-4" /> {pageData.ctaSection?.secondaryBtnText || 'Free Consultation'}</span>
                                </button>
                            </Link>
                        </div>
                        <p className="mt-8 text-[9px] font-bold uppercase tracking-widest text-gray-400 flex flex-wrap justify-center gap-6">
                            {(pageData.ctaSection?.trustBadges?.length > 0 ? pageData.ctaSection.trustBadges : ['30-day money-back guarantee', 'Lifetime access to course materials', 'Certificate included']).map((badge, idx) => (
                                <span key={idx}>✓ {badge}</span>
                            ))}
                        </p>
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default CommonLearningPage;
