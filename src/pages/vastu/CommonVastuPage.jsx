import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    CheckCircle,
    Phone,
    Calendar,
    Home,
    Building2,
    MapPin,
    Factory,
    Store,
    Building,
    TrendingUp,
    Heart,
    Users,
    Briefcase,
    Sun,
    Star,
    ArrowRight,
    MessageCircle,
    FileText,
    Upload,
    Search,
    FileCheck,
    IndianRupee,
    Clock,
    User,
    Quote,
    Sparkles,
    Sparkle,
    Award,
    Shield,
    BookOpen,
    ChevronRight,
    MessageSquare
} from "lucide-react";
import { Layout } from '@/components/layout/Layout';
import { Link } from "react-router-dom";
import { usePageBanner } from "@/hooks/usePageBanner";
import { BACKEND_URL, getImageUrl } from "@/config/apiConfig";
import { useGetVastuPageBySlugQuery } from "@/services/vastuContentApi";
import SEO from "@/components/layout/SEO";
import { useUserAuth } from "@/app/user/auth/AuthContext";

const IconMap = {
    CheckCircle, Phone, Calendar, Home, Building2, MapPin, Factory, Store, Building, TrendingUp, Heart, Users, Briefcase, Sun, Star, ArrowRight, MessageCircle, FileText, Upload, Search, FileCheck, IndianRupee, Clock, User, Quote, Sparkles, Sparkle, Award, Shield, BookOpen, ChevronRight, MessageSquare
};

const CommonVastuPage = ({ slugOverride }) => {
    const { slug: urlSlug } = useParams();
    const slug = slugOverride || urlSlug;
    const navigate = useNavigate();
    const { user } = useUserAuth();
    const banner = usePageBanner({ pollingInterval: 3000 });
    const { data: pageData, isLoading, isError } = useGetVastuPageBySlugQuery(slug, { pollingInterval: 3000 });

    const bannerImage = getImageUrl(banner?.imageUrl);

    if (isLoading) return <div className="min-h-screen flex items-center justify-center bg-[#FAF9F6] font-black uppercase text-[10px] tracking-widest text-orange-900 text-center">Consulting Ancient Scripts...</div>;
    if (isError || !pageData) return <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#FAF9F6] text-center"><button onClick={() => navigate('/')} className="bg-orange-600 text-white px-8 py-3 font-bold uppercase tracking-widest text-xs">Wisdom Not Found - Return Home</button></div>;

    const { hero, about, servicesSection, processSection, benefitsSection, pricingSection, testimonialsSection, ctaSection, activeSections } = pageData;

    const renderIcon = (iconName, className = "w-4 h-4") => {
        const Icon = IconMap[iconName] || Star;
        return <Icon className={className} />;
    };

    return (
        <Layout>
            <SEO pageName={slug} title={`${pageData.pageName} - Online Vastu`} description={hero.subtitle} />
            <div className="min-h-screen bg-[#FAF9F6] relative overflow-hidden">
                {/* Divine Background Ornaments */}
                <div className="absolute top-[20%] right-0 w-[500px] h-[500px] bg-orange-100/20 rounded-full blur-[120px] -z-10" />
                <div className="absolute bottom-[20%] left-0 w-[500px] h-[500px] bg-amber-100/20 rounded-full blur-[120px] -z-10" />

                {/* Hero Section */}
                <section className="relative h-[320px] sm:h-[320px] md:h-[360px] lg:h-[370px] flex items-center py-[20px] text-white overflow-hidden">
                    <div className="absolute inset-0">
                        <img src={getImageUrl(hero.imageUrl) || bannerImage} alt="Background" className="w-full h-full object-cover object-top" />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
                        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,rgba(217,119,6,0.2),transparent_50%)]" />
                    </div>
                    <div className="container mx-auto px-4 relative z-10">
                        <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 mb-1 md:mb-8 shadow-2xl">
                                <Award className="w-4 h-4 text-[#FFC107]" />
                                <span className="text-[#FFC107] text-xs md:text-sm font-black uppercase tracking-widest">{banner.badge || hero.badge || "DIVINE SERVICES HUB"}</span>
                            </div>
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-1 md:mb-6 leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)] uppercase">
                                {hero.titleHighlight1} {hero.titleEnd} <br />
                                <span className="text-yellow-300">{hero.titleHighlight2} {hero.titleHighlight3}</span>
                            </h1>
                            <p className="text-lg md:text-xl text-amber-100 leading-relaxed font-medium max-w-2xl mx-auto mb-1 md:mb-8 drop-shadow">
                                {hero.subtitle}
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                {hero.buttons?.map((btn, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => btn.link?.startsWith('#') ? document.getElementById(btn.link.substring(1))?.scrollIntoView({ behavior: 'smooth' }) : (btn.link ? window.location.href = btn.link : null)}
                                        className={`group relative ${idx === 0 ? 'bg-[#E8453C] hover:bg-[#CC3B34]' : 'bg-[#25D366] hover:bg-[#128C7E]'} text-white px-8 py-4 rounded-none font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] shadow-xl transition-all duration-300 overflow-hidden`}
                                    >
                                        <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                        <span className="relative flex items-center gap-2.5">
                                            {renderIcon(btn.iconName)} {btn.text}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* What is Vastu */}
                {activeSections?.about && (
                    <section className="py-12 md:py-16 bg-white overflow-x-hidden relative">
                        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-orange-100/30 rounded-full blur-3xl -z-10" />
                        <div className="container mx-auto px-4">
                            <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-center">
                                <div className="animate-slide-in-left">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-[11px] font-bold uppercase tracking-wider mb-5">
                                        {renderIcon('Sparkles', 'w-3.5 h-3.5')}
                                        <span>{about.badge}</span>
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 leading-tight">
                                        {about.title} <span className="text-orange-600">{about.titleColored}</span>
                                    </h2>
                                    <div className="flex items-center gap-2 mb-5">
                                        <div className="w-12 h-1 bg-orange-200 rounded-full" />
                                        <Sparkles className="w-5 h-5 text-orange-400" />
                                        <div className="w-12 h-1 bg-orange-200 rounded-full" />
                                    </div>
                                    <div className="space-y-4 text-gray-700 font-medium text-sm md:text-base">
                                        <p className="leading-relaxed">{about.description}</p>
                                        <p className="leading-relaxed font-bold text-orange-600 italic">{about.descriptionBold}</p>
                                    </div>
                                    <div className="mt-8 grid grid-cols-2 gap-4">
                                        {about.points?.map((point, idx) => (
                                            <div key={idx} className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center border border-orange-100">
                                                    {renderIcon(point.iconName, "w-5 h-5 text-orange-600")}
                                                </div>
                                                <span className="text-xs font-black text-[#2A1D13] uppercase tracking-widest">{point.title}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="relative group flex justify-center animate-slide-in-right">
                                    <div className="relative w-full max-w-lg p-2 bg-gradient-to-br from-amber-100 to-amber-300 rounded-[2rem] shadow-2xl">
                                        <div className="w-full h-[300px] md:h-[400px] rounded-3xl overflow-hidden border-[4px] border-white relative z-10">
                                            <img
                                                src={getImageUrl(about.image)}
                                                alt="Vastu Alignment"
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                            <div className="absolute bottom-6 left-6 right-6 text-white">
                                                <p className="text-sm font-black uppercase tracking-[0.2em] mb-1">{about.imageOverlayBadge}</p>
                                                <h4 className="text-xl font-bold italic">"{about.imageOverlayText}"</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* Our Vastu Services */}
                {activeSections?.services && (
                    <section className="py-12 md:py-16 bg-[#FAF9F6] relative overflow-hidden">
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #d97706 1px, transparent 0)', backgroundSize: '32px 32px' }} />
                        <div className="container mx-auto px-4 max-w-7xl relative z-10">
                            <div className="text-center mb-12 animate-fade-in-up">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 text-orange-600 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                                    {renderIcon('Star', 'w-3.5 h-3.5')}
                                    <span>{servicesSection.badge}</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 uppercase">{servicesSection.title} <span className="text-orange-600">{servicesSection.titleColored}</span></h2>
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-12 h-1 bg-orange-200 rounded-full" />
                                    <Sparkles className="w-5 h-5 text-orange-400" />
                                    <div className="w-12 h-1 bg-orange-200 rounded-full" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {servicesSection.services?.map((service, idx) => (
                                    <div
                                        key={idx}
                                        className="group/card h-full animate-fade-in-up"
                                        style={{ animationDelay: `${idx * 0.1}s`, animationFillMode: 'both' }}
                                    >
                                        <div className="relative h-full p-[1.5px] rounded-3xl bg-amber-400/40 hover:bg-amber-500 transition-all duration-700 shadow-xl flex flex-col">
                                            <div className="relative flex-grow bg-[#FCFBF7] rounded-[1.4rem] overflow-hidden flex flex-col group-hover/card:bg-white transition-all duration-500">
                                                <div className="relative m-2.5 mb-3 rounded-2xl overflow-hidden shadow-lg h-48 z-10">
                                                    <img src={getImageUrl(service.image)} alt={service.title} className="w-full h-full object-cover transition-all duration-[2.5s] group-hover/card:scale-110" />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />
                                                    <div className="absolute top-4 right-4 bg-orange-600 text-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] shadow-lg flex items-center gap-1.5">
                                                        <Award className="w-3 h-3 fill-white" /> Vastu
                                                    </div>
                                                    <div className="absolute bottom-6 left-6 right-6">
                                                        <h3 className="text-2xl font-bold text-white leading-tight uppercase tracking-tight group-hover:text-orange-300 transition-colors">{service.title}</h3>
                                                    </div>
                                                </div>

                                                <div className="flex flex-col flex-grow px-6 pb-6 text-center relative z-20">
                                                    <p className="text-gray-500 text-sm font-semibold mb-4 italic">"{service.desc}"</p>

                                                    <div className="flex flex-col gap-2.5 mb-6 text-left">
                                                        {service.features?.map((feature, i) => (
                                                            <div key={i} className="flex items-center gap-3">
                                                                <div className="w-6 h-6 rounded-lg bg-orange-50 flex items-center justify-center flex-shrink-0 group-hover/card:bg-orange-600 transition-colors">
                                                                    <CheckCircle className="w-3.5 h-3.5 text-orange-600 group-hover/card:text-white" />
                                                                </div>
                                                                <span className="text-xs font-bold text-[#4A3427]/80">{feature}</span>
                                                            </div>
                                                        ))}
                                                    </div>

                                                    <button 
                                                        onClick={() => {
                                                            if (!user) {
                                                                navigate('/user_login/registeration');
                                                            } else {
                                                                window.dispatchEvent(new CustomEvent('openPoojaDrawer', { detail: service.title }));
                                                            }
                                                        }}
                                                        className="mt-auto group/btn relative w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#2A1D13] text-amber-400 rounded-none font-black text-[10px] uppercase tracking-[0.2em] transition-all hover:bg-orange-600 hover:text-white shadow-lg"
                                                    >
                                                        Book Consultation <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Consultation Process */}
                {activeSections?.process && (
                    <section className="py-12 md:py-16 bg-white relative overflow-hidden">
                        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-orange-100/30 rounded-full blur-3xl -z-10" />
                        <div className="container mx-auto px-4 relative z-10">
                            <div className="text-center mb-12 animate-fade-in-up">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50/50 text-orange-600 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                                    {renderIcon('Sparkles', 'w-3.5 h-3.5')}
                                    <span>{processSection.badge}</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold text-[#2A1B13] mb-4 uppercase tracking-tight">{processSection.title} <span className="text-orange-600">{processSection.titleColored}</span></h2>
                                <div className="flex items-center justify-center gap-3 mb-8">
                                    <div className="w-10 h-[1.5px] bg-orange-200" />
                                    <Sparkles className="w-5 h-5 text-orange-400" />
                                    <div className="w-10 h-[1.5px] bg-orange-200" />
                                </div>
                            </div>

                            <div className="relative max-w-5xl mx-auto">
                                <div className="hidden md:block absolute top-10 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-orange-200 to-transparent"></div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
                                    {processSection.steps?.map((step, idx) => (
                                        <div key={idx} className="relative flex flex-col items-center animate-fade-in-up" style={{ animationDelay: `${idx * 0.1}s`, animationFillMode: 'both' }}>
                                            <div className="relative w-20 h-20 bg-gradient-to-br from-orange-50 to-amber-50 rounded-none flex flex-col items-center justify-center mb-5 border-4 border-white shadow-xl z-10">
                                                <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">{step.number}</span>
                                                {idx === 0 && <div className="absolute inset-0 rounded-none border-2 border-orange-300 animate-ping opacity-30"></div>}
                                                <div className="absolute -top-2 -right-2 p-1 bg-white rounded-full shadow-md text-orange-600">
                                                    {renderIcon(step.iconName)}
                                                </div>
                                            </div>
                                            <div className="text-center">
                                                <h3 className="font-bold text-[#4A3427] text-sm uppercase tracking-wider mb-1">{step.title}</h3>
                                                <p className="text-orange-600 text-[10px] font-bold uppercase mb-1">{step.description}</p>
                                                <p className="text-gray-400 text-[9px] font-bold uppercase tracking-widest">{step.subtitle}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* Benefits Section */}
                {activeSections?.benefits && (
                    <section className="py-12 md:py-16 bg-[#FFFDF7] relative overflow-hidden">
                        <div className="container mx-auto px-4 max-w-7xl relative z-10">
                            <div className="text-center mb-16 animate-fade-in-up">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 text-orange-600 rounded-full text-[10px] font-extrabold uppercase tracking-[0.2em] mb-4">
                                    {renderIcon('Shield', 'w-3.5 h-3.5')}
                                    <span>{benefitsSection.badge}</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6 uppercase">{benefitsSection.title} <span className="text-orange-600">{benefitsSection.titleColored}</span></h2>
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-12 h-1 bg-orange-200 rounded-full" /><Sparkles className="w-5 h-5 text-orange-400" /><div className="w-12 h-1 bg-orange-200 rounded-full" />
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {benefitsSection.benefits?.map((item, idx) => (
                                    <div key={idx} className="group bg-white p-6 hover:shadow-2xl transition-all duration-500 border-2 border-orange-100 flex items-start gap-5 rounded-none animate-fade-in-up" style={{ animationDelay: `${idx * 0.1}s`, animationFillMode: 'both' }}>
                                        <div className="w-16 h-16 rounded-none bg-orange-50 flex items-center justify-center flex-shrink-0 group-hover:bg-orange-600 transition-all duration-500 shadow-inner">
                                            {renderIcon(item.iconName, "w-8 h-8 text-orange-600 group-hover:text-white transition-all transform group-hover:scale-110")}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-extrabold text-[#4A3427] mb-2 leading-tight uppercase group-hover:text-orange-600 transition-colors">{item.title}</h3>
                                            <p className="text-gray-500 text-[10px] font-bold leading-relaxed uppercase tracking-widest">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Pricing Plans */}
                {activeSections?.pricing && (
                    <section className="py-12 md:py-16 bg-[#FAF9F6] relative overflow-hidden">
                        <div className="container mx-auto px-4 max-w-5xl relative z-10">
                            <div className="text-center mb-12 animate-fade-in-up">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 text-orange-600 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                                    {renderIcon('IndianRupee', 'w-3.5 h-3.5')}
                                    <span>{pricingSection.badge}</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-extrabold text-[#2A1D13] mb-4 uppercase tracking-tight">{pricingSection.title} <span className="text-orange-600">{pricingSection.titleColored}</span></h2>
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-12 h-1 bg-orange-200 rounded-full" />
                                    <Sparkles className="w-5 h-5 text-orange-400" />
                                    <div className="w-12 h-1 bg-orange-200 rounded-full" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {pricingSection.plans?.map((plan, index) => (
                                    <div key={index} className="bg-white p-8 border-b-[6px] border-orange-500 shadow-xl hover:-translate-y-2 transition-all duration-500 relative group animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'both' }}>
                                        <div className="w-14 h-14 rounded-none bg-orange-50 flex items-center justify-center mb-6 shadow-inner border border-orange-100 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                                            {renderIcon(plan.iconName, "w-7 h-7")}
                                        </div>
                                        <h3 className="text-xl font-black text-[#2A1D13] mb-2 uppercase tracking-tight">{plan.name}</h3>
                                        <div className="flex items-baseline gap-1 mb-4">
                                            <span className="text-4xl font-black text-orange-600">₹{plan.price}</span>
                                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest text-center">One-time</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs font-bold text-[#4A3427] mb-6 uppercase tracking-widest">
                                            {renderIcon('Clock', 'w-4 h-4 text-orange-600')}
                                            <span>{plan.duration}</span>
                                        </div>
                                        <p className="text-gray-500 text-[10px] font-bold mb-8 uppercase tracking-widest leading-relaxed h-10 line-clamp-2">{plan.desc}</p>
                                        <button 
                                            onClick={() => {
                                                if (!user) {
                                                    navigate('/user_login/registeration');
                                                } else {
                                                    window.dispatchEvent(new CustomEvent('openPoojaDrawer', { detail: plan.name }));
                                                }
                                            }}
                                            className="w-full bg-[#E8453C] hover:bg-black text-white font-black text-xs uppercase tracking-[0.2em] py-4 transition-all shadow-lg"
                                        >
                                            Book Now
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Testimonials */}
                {activeSections?.testimonials && (
                    <section className="py-12 md:py-16 bg-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-50 rounded-full blur-3xl -mr-32 -mt-32" />
                        <div className="container mx-auto px-4 max-w-6xl relative z-10">
                            <div className="text-center mb-12 animate-fade-in-up">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-50 text-green-700 rounded-full text-[10px] font-extrabold uppercase tracking-[0.2em] mb-4">
                                    <span className="flex items-center gap-1">{renderIcon('Star', 'w-3.5 h-3.5 fill-green-700')} <span>{testimonialsSection.badge}</span></span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-black text-[#4A3427] mb-6">{testimonialsSection.title} <span className="text-orange-600">{testimonialsSection.titleColored}</span></h2>
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-12 h-1 bg-orange-200 rounded-full" /><Sparkles className="w-5 h-5 text-orange-400" /><div className="w-12 h-1 bg-orange-200 rounded-full" />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-3 gap-8">
                                {testimonialsSection.reviews?.map((review, idx) => (
                                    <div key={idx} className="bg-[#FFFDF7] p-8 border border-orange-100 shadow-lg rounded-none relative animate-fade-in-up" style={{ animationDelay: `${idx * 0.1}s`, animationFillMode: 'both' }}>
                                        <div className="absolute -top-4 -left-2 text-6xl text-orange-100 font-serif opacity-50">"</div>
                                        <div className="flex gap-1 mb-6">
                                            {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />)}
                                        </div>
                                        <p className="text-gray-600 font-medium text-sm mb-6 leading-relaxed italic">"{review.quote}"</p>
                                        <div className="border-t border-orange-50 pt-5">
                                            <h4 className="font-extrabold text-[#4A3427] text-sm uppercase tracking-wider">{review.author}</h4>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] text-orange-600 font-black uppercase tracking-[0.2em]">{review.role}</span>
                                                {renderIcon('CheckCircle', 'w-3 h-3 text-green-500 fill-green-50')}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Final CTA Section */}
                {activeSections?.cta && (
                    <section className="py-12 md:py-16 bg-white border-t border-orange-50">
                        <div className="container mx-auto px-4 text-center max-w-5xl animate-fade-in-up">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50/50 text-orange-600 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6">
                                {renderIcon('Sparkles', 'w-3.5 h-3.5')}
                                <span>{ctaSection.badge}</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2A1B13] mb-4 tracking-tight uppercase">
                                {ctaSection.title} <span className="text-[#E8453C]">{ctaSection.titleColored}</span>
                            </h2>
                            <div className="flex items-center justify-center gap-3 mb-8">
                                <div className="w-10 h-[1.5px] bg-orange-200" />
                                <Sparkles className="w-5 h-5 text-orange-400" />
                                <div className="w-10 h-[1.5px] bg-orange-200" />
                            </div>
                            <p className="text-gray-600 mb-10 text-sm md:text-base font-medium max-w-2xl mx-auto leading-relaxed uppercase tracking-wide">
                                {ctaSection.subtitle}
                            </p>

                            <div className="flex flex-wrap justify-center gap-4">
                                {ctaSection.buttons?.map((btn, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => btn.link?.startsWith('#') ? document.getElementById(btn.link.substring(1))?.scrollIntoView({ behavior: 'smooth' }) : (btn.link ? window.location.href = btn.link : null)}
                                        className={`group relative ${idx === 0 ? 'bg-[#E8453C] hover:bg-[#CC3B34]' : 'bg-[#F59E0B] hover:bg-[#D97706]'} text-white px-10 py-4 rounded-none font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] shadow-xl transition-all duration-300 overflow-hidden`}
                                    >
                                        <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                        <span className="relative flex items-center gap-2.5">
                                            {renderIcon(btn.iconName)} {btn.text}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </section>
                )}
            </div>
        </Layout>
    );
};

export default CommonVastuPage;
