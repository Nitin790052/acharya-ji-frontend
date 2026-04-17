import React, { useState } from "react";
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

import homeVastuImg from "../../assets/vastuRamadies/Home Vastu.webp";
import officeVastuImg from "../../assets/vastuRamadies/Office Vastu.webp";
import plotVastuImg from "../../assets/vastuRamadies/plotvastu.webp";
import factoryVastuImg from "../../assets/vastuRamadies/factoryvastu.webp";
import apartmentVastuImg from "../../assets/vastuRamadies/apartmentvastu.webp";
import commercialVastuImg from "../../assets/vastuRamadies/commercialvastu.webp";
import vastueAbout from "../../assets/vastuRamadies/vastueAbout.webp";

const VastuConsultation = () => {
    const banner = usePageBanner({ pollingInterval: 3000 });
    const bannerImage = getImageUrl(banner?.imageUrl);
    const [selectedFaq, setSelectedFaq] = useState(null);

    // Benefits data
    const benefits = [
        { icon: TrendingUp, text: "Financial Growth", desc: "Attract wealth and prosperity through proper direction alignment." },
        { icon: Heart, text: "Better Health", desc: "Improve physical and mental well-being with natural energy flow." },
        { icon: Users, text: "Peaceful Relationships", desc: "Foster harmony and love among family members and colleagues." },
        { icon: Briefcase, text: "Business Success", desc: "Optimize your workplace for productivity and market growth." },
        { icon: Sun, text: "Positive Energy", desc: "Clear negative vibrations and welcome divine positivity." },
        { icon: Star, text: "Career Growth", desc: "Unlock new opportunities and achieve professional excellence." },
    ];

    // Services data
    const services = [
        {
            title: "Home Vastu",
            icon: Home,
            features: ["Energy Balance", "Room Placement", "Direction Correction"],
            desc: "Bring peace and prosperity to your living space.",
            image: homeVastuImg
        },
        {
            title: "Office Vastu",
            icon: Building2,
            features: ["Workflow Optimization", "Cubicle Placement", "Entry Direction"],
            desc: "Boost productivity and success in your professional life.",
            image: officeVastuImg
        },
        {
            title: "Plot Vastu",
            icon: MapPin,
            features: ["Land Analysis", "Shape Correction", "Boundary Setup"],
            desc: "Select and prepare the perfect foundation for your dreams.",
            image: plotVastuImg
        },
        {
            title: "Factory Vastu",
            icon: Factory,
            features: ["Production Flow", "Machine Placement", "Warehouse Zoning"],
            desc: "Optimize industrial layouts for maximum output.",
            image: factoryVastuImg
        },
        {
            title: "Commercial Vastu",
            icon: Store,
            features: ["Customer Flow", "Cash Counter", "Display Areas"],
            desc: "Attract customers and increase retail profitability.",
            image: commercialVastuImg
        },
        {
            title: "Apartment Vastu",
            icon: Building,
            features: ["Flat Selection", "Room Alignment", "Main Door Direction"],
            desc: "Expert guidance for choosing the right urban home.",
            image: apartmentVastuImg
        },
    ];

    // Pricing data
    const pricingPlans = [
        {
            name: "Online Consultation",
            price: "999",
            duration: "30 minute consultation",
            icon: MessageCircle,
            desc: "Quick video/call guidance for minor issues."
        },
        {
            name: "Home Vastu Report",
            price: "2500",
            duration: "Detailed report with remedies",
            icon: FileText,
            desc: "In-depth analysis and written solution guide."
        },
        {
            name: "On-Site Consultation",
            price: "7000",
            duration: "Acharya Ji visits your property",
            icon: User,
            desc: "Personal visit for complete energy scanning."
        },
    ];

    // Testimonials data
    const testimonials = [
        {
            quote: "After Vastu consultation my business improved significantly. The remedies were simple yet effective.",
            author: "Rajesh Kumar",
            role: "Business Owner",
        },
        {
            quote: "Very accurate guidance by Acharya Ji. Our home feels more peaceful and harmonious now.",
            author: "Priya Sharma",
            role: "Homemaker",
        },
        {
            quote: "The team was professional and provided detailed analysis. Highly recommended for anyone seeking balance.",
            author: "Amit Patel",
            role: "Architect",
        },
    ];

    return (
        <Layout>
            <div className="min-h-screen bg-[#FAF9F6] relative overflow-hidden">
                {/* Divine Background Ornaments */}
                <div className="absolute top-[20%] right-0 w-[500px] h-[500px] bg-orange-100/20 rounded-full blur-[120px] -z-10" />
                <div className="absolute bottom-[20%] left-0 w-[500px] h-[500px] bg-amber-100/20 rounded-full blur-[120px] -z-10" />

                {/* Hero Section */}
                <section className="relative h-[320px] sm:h-[320px] md:h-[360px] lg:h-[370px] flex items-center py-[20px] text-white overflow-hidden">
                    <div className="absolute inset-0">
                        <img src={bannerImage} alt="Background" className="w-full h-full object-cover object-top" />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
                        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,rgba(217,119,6,0.2),transparent_50%)]" />
                    </div>
                    <div className="container mx-auto px-4 relative z-10">
                        <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 mb-1 md:mb-8 shadow-2xl">
                                <Award className="w-4 h-4 text-[#FFC107]" />
                                <span className="text-[#FFC107] text-xs md:text-sm font-black uppercase tracking-widest">{banner.badge || "DIVINE SERVICES HUB"}</span>
                            </div>
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-1 md:mb-6 leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)] uppercase">
                                {banner.titleHighlight1} {banner.titleEnd} <br />
                                <span className="text-yellow-300">{banner.titleHighlight2} {banner.titleHighlight3}</span>
                            </h1>
                            <p className="text-lg md:text-xl text-amber-100 leading-relaxed font-medium max-w-2xl mx-auto mb-1 md:mb-8 drop-shadow">
                                {banner.subtitle}
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                {banner.buttons && banner.buttons.length > 0 ? (
                                    banner.buttons.map((btn, idx) => (
                                        btn.text && (
                                            <button
                                                key={idx}
                                                onClick={() => btn.link?.startsWith('#') ? document.getElementById(btn.link.substring(1))?.scrollIntoView({ behavior: 'smooth' }) : (btn.link ? window.location.href = btn.link : null)}
                                                className={`group relative ${idx === 0 ? 'bg-[#E8453C] hover:bg-[#CC3B34]' : 'bg-[#25D366] hover:bg-[#128C7E]'} text-white px-8 py-4 rounded-none font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] shadow-xl transition-all duration-300 overflow-hidden`}
                                            >
                                                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                                <span className="relative flex items-center gap-2.5">
                                                    {idx === 0 ? <Calendar className="w-4 h-4" /> : <Phone className="w-4 h-4" />} {btn.text}
                                                </span>
                                            </button>
                                        )
                                    ))
                                ) : (
                                    <>
                                        <button className="group relative bg-[#E8453C] hover:bg-[#CC3B34] text-white px-8 py-4 rounded-none font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] shadow-xl transition-all duration-300 overflow-hidden">
                                            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                            <span className="relative flex items-center gap-2.5">
                                                <Calendar className="w-4 h-4" /> {banner.button1Text || "Book Consultation"}
                                            </span>
                                        </button>
                                        <button className="group relative bg-[#25D366] hover:bg-[#128C7E] text-white px-8 py-4 rounded-none font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] shadow-xl transition-all duration-300 overflow-hidden">
                                            <div className="absolute inset-0 bg-black/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                            <span className="relative flex items-center gap-2.5">
                                                <Phone className="w-4 h-4" /> {banner.button2Text || "WhatsApp Now"}
                                            </span>
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* What is Vastu (About Style) */}
                <section className="py-12 md:py-16 bg-white overflow-x-hidden relative">
                    <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-orange-100/30 rounded-full blur-3xl -z-10" />
                    <div className="container mx-auto px-4">
                        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-center">
                            <div className="animate-slide-in-left">
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-[11px] font-bold uppercase tracking-wider mb-5">
                                    <Sparkles className="w-3.5 h-3.5" />
                                    <span>Ancient Science</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 leading-tight">
                                    What is <span className="text-orange-600">Vastu Shastra?</span>
                                </h2>
                                <div className="flex items-center gap-2 mb-5">
                                    <div className="w-12 h-1 bg-orange-200 rounded-full" />
                                    <Sparkles className="w-5 h-5 text-orange-400" />
                                    <div className="w-12 h-1 bg-orange-200 rounded-full" />
                                </div>
                                <div className="space-y-4 text-gray-700 font-medium text-sm md:text-base">
                                    <p className="leading-relaxed">
                                        Vastu Shastra is the ancient Indian science of architecture and energy alignment.
                                        It helps balance the five natural elements to bring peace, prosperity, and success.
                                    </p>
                                    <p className="leading-relaxed font-bold text-orange-600 italic">
                                        Our Vastu consultation helps identify energy imbalances in your home or office and provides remedies to correct them.
                                    </p>
                                </div>
                                <div className="mt-8 grid grid-cols-2 gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center border border-orange-100">
                                            <Shield className="w-5 h-5 text-orange-600" />
                                        </div>
                                        <span className="text-xs font-black text-[#2A1D13] uppercase tracking-widest">Scientific Basis</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center border border-orange-100">
                                            <Heart className="w-5 h-5 text-orange-600" />
                                        </div>
                                        <span className="text-xs font-black text-[#2A1D13] uppercase tracking-widest">Peace of Mind</span>
                                    </div>
                                </div>
                            </div>
                            <div className="relative group flex justify-center animate-slide-in-right">
                                <div className="relative w-full max-w-lg p-2 bg-gradient-to-br from-amber-100 to-amber-300 rounded-[2rem] shadow-2xl">
                                    <div className="w-full h-[300px] md:h-[400px] rounded-3xl overflow-hidden border-[4px] border-white relative z-10">
                                        <img
                                            src={vastueAbout}
                                            alt="Vastu Alignment"
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                        <div className="absolute bottom-6 left-6 right-6 text-white">
                                            <p className="text-sm font-black uppercase tracking-[0.2em] mb-1">Energy Harmony</p>
                                            <h4 className="text-xl font-bold italic">"Balancing Elements, Enhancing Life"</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Our Vastu Services */}
                <section className="py-12 md:py-16 bg-[#FAF9F6] relative overflow-hidden">
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #d97706 1px, transparent 0)', backgroundSize: '32px 32px' }} />
                    <div className="container mx-auto px-4 max-w-7xl relative z-10">
                        <div className="text-center mb-12 animate-fade-in-up">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 text-orange-600 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                                <Star className="w-3.5 h-3.5" />
                                <span>Expert Services</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 uppercase">Our <span className="text-orange-600">Vastu Services</span></h2>
                            <div className="flex items-center justify-center gap-2">
                                <div className="w-12 h-1 bg-orange-200 rounded-full" />
                                <Sparkles className="w-5 h-5 text-orange-400" />
                                <div className="w-12 h-1 bg-orange-200 rounded-full" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {services.map((service, idx) => (
                                <div
                                    key={idx}
                                    className="group/card h-full animate-fade-in-up"
                                    style={{ animationDelay: `${idx * 0.1}s`, animationFillMode: 'both' }}
                                >
                                    <div className="relative h-full p-[1.5px] rounded-3xl bg-amber-400/40 hover:bg-amber-500 transition-all duration-700 shadow-xl flex flex-col">
                                        <div className="relative flex-grow bg-[#FCFBF7] rounded-[1.4rem] overflow-hidden flex flex-col group-hover/card:bg-white transition-all duration-500">
                                            <div className="relative m-2.5 mb-3 rounded-2xl overflow-hidden shadow-lg h-48 z-10">
                                                <img src={service.image} alt={service.title} className="w-full h-full object-cover transition-all duration-[2.5s] group-hover/card:scale-110" />
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
                                                    {service.features.map((feature, i) => (
                                                        <div key={i} className="flex items-center gap-3">
                                                            <div className="w-6 h-6 rounded-lg bg-orange-50 flex items-center justify-center flex-shrink-0 group-hover/card:bg-orange-600 transition-colors">
                                                                <CheckCircle className="w-3.5 h-3.5 text-orange-600 group-hover/card:text-white" />
                                                            </div>
                                                            <span className="text-xs font-bold text-[#4A3427]/80">{feature}</span>
                                                        </div>
                                                    ))}
                                                </div>

                                                <button className="mt-auto group/btn relative w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#2A1D13] text-amber-400 rounded-none font-black text-[10px] uppercase tracking-[0.2em] transition-all hover:bg-orange-600 hover:text-white shadow-lg">
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

                {/* Consultation Process (How it Works Style) */}
                <section className="py-12 md:py-16 bg-white relative overflow-hidden">
                    <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-orange-100/30 rounded-full blur-3xl -z-10" />
                    <div className="container mx-auto px-4 relative z-10">
                        <div className="text-center mb-12 animate-fade-in-up">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50/50 text-orange-600 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                                <Sparkles className="w-3.5 h-3.5" />
                                <span>The Journey</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-[#2A1B13] mb-4 uppercase tracking-tight">How We <span className="text-orange-600">Consult</span></h2>
                            <div className="flex items-center justify-center gap-3 mb-8">
                                <div className="w-10 h-[1.5px] bg-orange-200" />
                                <Sparkles className="w-5 h-5 text-orange-400" />
                                <div className="w-10 h-[1.5px] bg-orange-200" />
                            </div>
                        </div>

                        <div className="relative max-w-5xl mx-auto">
                            <div className="hidden md:block absolute top-10 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-orange-200 to-transparent"></div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
                                {[
                                    { n: "1", t: "Submit Details", s: "Property Information", d: "Submit Property Details", icon: FileText },
                                    { n: "2", t: "Upload Map", s: "Layout Plan", d: "Upload House Map / Layout", icon: Upload },
                                    { n: "3", t: "Analysis", s: "Expert Review", d: "Get Vastu Analysis", icon: Search },
                                    { n: "4", t: "Solutions", s: "Final Report", d: "Receive Remedies & Report", icon: FileCheck }
                                ].map((step, idx) => (
                                    <div key={idx} className="relative flex flex-col items-center animate-fade-in-up" style={{ animationDelay: `${idx * 0.1}s`, animationFillMode: 'both' }}>
                                        <div className="relative w-20 h-20 bg-gradient-to-br from-orange-50 to-amber-50 rounded-none flex flex-col items-center justify-center mb-5 border-4 border-white shadow-xl z-10">
                                            <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">{step.n}</span>
                                            {idx === 0 && <div className="absolute inset-0 rounded-none border-2 border-orange-300 animate-ping opacity-30"></div>}
                                            <div className="absolute -top-2 -right-2 p-1 bg-white rounded-full shadow-md text-orange-600">
                                                <step.icon className="w-4 h-4" />
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <h3 className="font-bold text-[#4A3427] text-sm uppercase tracking-wider mb-1">{step.t}</h3>
                                            <p className="text-orange-600 text-[10px] font-bold uppercase mb-1">{step.d}</p>
                                            <p className="text-gray-400 text-[9px] font-bold uppercase tracking-widest">{step.s}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Benefits Section (Why Choose Style) */}
                <section className="py-12 md:py-16 bg-[#FFFDF7] relative overflow-hidden">
                    <div className="container mx-auto px-4 max-w-7xl relative z-10">
                        <div className="text-center mb-16 animate-fade-in-up">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 text-orange-600 rounded-full text-[10px] font-extrabold uppercase tracking-[0.2em] mb-4">
                                <Shield className="w-3.5 h-3.5" />
                                <span>Life Changing Impact</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6 uppercase">Benefits Of <span className="text-orange-600">Vastu Alignment</span></h2>
                            <div className="flex items-center justify-center gap-2">
                                <div className="w-12 h-1 bg-orange-200 rounded-full" /><Sparkles className="w-5 h-5 text-orange-400" /><div className="w-12 h-1 bg-orange-200 rounded-full" />
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {benefits.map((item, idx) => (
                                <div key={idx} className="group bg-white p-6 hover:shadow-2xl transition-all duration-500 border-2 border-orange-100 flex items-start gap-5 rounded-none animate-fade-in-up" style={{ animationDelay: `${idx * 0.1}s`, animationFillMode: 'both' }}>
                                    <div className="w-16 h-16 rounded-none bg-orange-50 flex items-center justify-center flex-shrink-0 group-hover:bg-orange-600 transition-all duration-500 shadow-inner">
                                        <item.icon className="w-8 h-8 text-orange-600 group-hover:text-white transition-all transform group-hover:scale-110" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-extrabold text-[#4A3427] mb-2 leading-tight uppercase group-hover:text-orange-600 transition-colors">{item.text}</h3>
                                        <p className="text-gray-500 text-[10px] font-bold leading-relaxed uppercase tracking-widest">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Pricing Plans */}
                <section className="py-12 md:py-16 bg-[#FAF9F6] relative overflow-hidden">
                    <div className="container mx-auto px-4 max-w-5xl relative z-10">
                        <div className="text-center mb-12 animate-fade-in-up">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 text-orange-600 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                                <IndianRupee className="w-3.5 h-3.5" />
                                <span>Our Plans</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-extrabold text-[#2A1D13] mb-4 uppercase tracking-tight">Consultation <span className="text-orange-600">Pricing</span></h2>
                            <div className="flex items-center justify-center gap-2">
                                <div className="w-12 h-1 bg-orange-200 rounded-full" />
                                <Sparkles className="w-5 h-5 text-orange-400" />
                                <div className="w-12 h-1 bg-orange-200 rounded-full" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {pricingPlans.map((plan, index) => (
                                <div key={index} className="bg-white p-8 border-b-[6px] border-orange-500 shadow-xl hover:-translate-y-2 transition-all duration-500 relative group animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'both' }}>
                                    <div className="w-14 h-14 rounded-none bg-orange-50 flex items-center justify-center mb-6 shadow-inner border border-orange-100 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                                        <plan.icon className="w-7 h-7" />
                                    </div>
                                    <h3 className="text-xl font-black text-[#2A1D13] mb-2 uppercase tracking-tight">{plan.name}</h3>
                                    <div className="flex items-baseline gap-1 mb-4">
                                        <span className="text-4xl font-black text-orange-600">₹{plan.price}</span>
                                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest text-center">One-time</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs font-bold text-[#4A3427] mb-6 uppercase tracking-widest">
                                        <Clock className="w-4 h-4 text-orange-600" />
                                        <span>{plan.duration}</span>
                                    </div>
                                    <p className="text-gray-500 text-[10px] font-bold mb-8 uppercase tracking-widest leading-relaxed h-10 line-clamp-2">{plan.desc}</p>
                                    <button className="w-full bg-[#E8453C] hover:bg-black text-white font-black text-xs uppercase tracking-[0.2em] py-4 transition-all shadow-lg">
                                        Book Now
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Testimonials */}
                <section className="py-12 md:py-16 bg-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-amber-50 rounded-full blur-3xl -mr-32 -mt-32" />
                    <div className="container mx-auto px-4 max-w-6xl relative z-10">
                        <div className="text-center mb-12 animate-fade-in-up">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-50 text-green-700 rounded-full text-[10px] font-extrabold uppercase tracking-[0.2em] mb-4">
                                <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 fill-green-700" /> Success Stories</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-black text-[#4A3427] mb-6">Client <span className="text-orange-600">Reviews</span></h2>
                            <div className="flex items-center justify-center gap-2">
                                <div className="w-12 h-1 bg-orange-200 rounded-full" /><Sparkles className="w-5 h-5 text-orange-400" /><div className="w-12 h-1 bg-orange-200 rounded-full" />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {testimonials.map((review, idx) => (
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
                                            <CheckCircle className="w-3 h-3 text-green-500 fill-green-50" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Final CTA Section */}
                <section className="py-12 md:py-16 bg-white border-t border-orange-50">
                    <div className="container mx-auto px-4 text-center max-w-5xl animate-fade-in-up">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50/50 text-orange-600 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Preserving Tradition</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2A1B13] mb-4 tracking-tight uppercase">
                            Balance Your <span className="text-[#E8453C]">Divine Energy</span>
                        </h2>
                        <div className="flex items-center justify-center gap-3 mb-8">
                            <div className="w-10 h-[1.5px] bg-orange-200" />
                            <Sparkles className="w-5 h-5 text-orange-400" />
                            <div className="w-10 h-[1.5px] bg-orange-200" />
                        </div>
                        <p className="text-gray-600 mb-10 text-sm md:text-base font-medium max-w-2xl mx-auto leading-relaxed uppercase tracking-wide">
                            preservation of ancient Vedic architecture for modern success. Contact Acharya Ji today for a detailed scanning of your property.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4">
                            <button className="group relative bg-[#E8453C] hover:bg-[#CC3B34] text-white px-10 py-4 rounded-none font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] shadow-xl transition-all duration-300 overflow-hidden">
                                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                <span className="relative flex items-center gap-2.5">
                                    <Users className="w-4 h-4" /> Professional Consultation
                                </span>
                            </button>
                            <Link to="/contact">
                                <button className="group relative bg-[#F59E0B] hover:bg-[#D97706] text-white px-10 py-4 rounded-none font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] shadow-xl transition-all duration-300 overflow-hidden">
                                    <div className="absolute inset-0 bg-black/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                    <span className="relative flex items-center gap-2.5">
                                        <MessageSquare className="w-4 h-4" /> Inquire More
                                    </span>
                                </button>
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default VastuConsultation;
