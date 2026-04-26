import React, { useState, useEffect } from "react";
import {
    CheckCircle,
    Phone,
    Calendar,
    Home,
    Building2,
    MapPin,
    ArrowRight,
    MessageCircle,
    FileText,
    Upload,
    Search,
    IndianRupee,
    Clock,
    User,
    Sparkles,
    Award,
    Shield,
    ChevronRight,
    MessageSquare,
    DollarSign,
    Heart,
    Users,
    Briefcase,
    Sun,
    Star,
    Stethoscope,
    Layout as LayoutIcon,
    Frown,
    Target,
    DoorOpen,
    Utensils,
    Church,
    TrendingUp,
    Compass,
    Zap,
    Gem,
    MoveRight,
    Sparkle,
    FileCheck,
    ThumbsUp,
    HelpCircle,
    ChevronDown,
    GraduationCap,
    Languages,
    Wallet,
    Star as StarIcon
} from "lucide-react";
import { Layout } from '@/components/layout/Layout';
import { Link } from "react-router-dom";
import { usePageBanner } from "@/hooks/usePageBanner";
import { BACKEND_URL } from "@/config/apiConfig";

// Assets

import homeVastuImg from "../../assets/vastuRamadies/Home Vastu.webp";
import officeVastuImg from "../../assets/vastuRamadies/Office Vastu.webp";
import vastueAbout from "../../assets/vastuRamadies/vastueAbout.webp";

const HomeOfficeVastu = () => {
    const banner = usePageBanner({ pollingInterval: 60000 });
    const bannerImage = banner?.imageUrl ? (banner.imageUrl.startsWith('http') ? banner.imageUrl : `${BACKEND_URL}${banner.imageUrl}`) : null;
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Checker tool state
    const [checkerData, setCheckerData] = useState({
        mainDoor: "",
        kitchen: "",
        bedroom: "",
    });
    const [checkerResult, setCheckerResult] = useState(null);
    const [selectedFaq, setSelectedFaq] = useState(null);

    // Form state for map upload
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        propertyType: "",
        propertySize: "",
        consultationType: "",
        description: "",
        map: null,
    });

    const handleCheckerChange = (e) => {
        setCheckerData({ ...checkerData, [e.target.name]: e.target.value });
    };

    const runVastuChecker = (e) => {
        e.preventDefault();
        const suggestions = [];
        if (checkerData.mainDoor === "north" || checkerData.mainDoor === "east") {
            suggestions.push({ type: 'success', text: "Main entrance is in a highly positive direction for abundance." });
        } else {
            suggestions.push({ type: 'warning', text: "Main door orientation may hinder energy flow. Correction recommended." });
        }

        if (checkerData.kitchen === "southeast") {
            suggestions.push({ type: 'success', text: "Kitchen in Southeast is ideal according to Agni Kona." });
        } else {
            suggestions.push({ type: 'warning', text: "Kitchen placement could cause health and energy clash." });
        }

        if (checkerData.bedroom === "southwest") {
            suggestions.push({ type: 'success', text: "Master bedroom in Southwest ensures stability and leadership." });
        } else {
            suggestions.push({ type: 'warning', text: "Master bedroom position might affect the authority of the head." });
        }
        setCheckerResult(suggestions);
    };

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "map") {
            setFormData({ ...formData, map: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Thank you! Your map and details have been submitted. Acharya Ji will analyze them personally.");
    };

    const FAQS = [
        {
            q: "How does property map analysis work?",
            a: "Upload your map, and Acharya Ji scans the 16 zones and seismic energy nodes to provide a detailed remedial PDF within 48 hours."
        },
        {
            q: "Do I need to break walls for Vastu correction?",
            a: "No, we specialize in non-destructive Vastu using metal strips, color therapy, and sacred yantras without any structural changes."
        },
        {
            q: "Is an online Vastu report effective?",
            a: "Yes, precisely drafted maps provide accurate data for directional alignment, making online remedies highly effective for the modern age."
        }
    ];

    return (
        <Layout>
            <div className="min-h-screen bg-white">
                {/* Section 1 — Hero (Styled like TalkToAstrologer) */}
                <section className="relative h-[320px] sm:h-[320px] md:h-[360px] lg:h-[370px] flex items-center py-[20px] text-white overflow-hidden">
                    <div className="absolute inset-0">
                        <img src={bannerImage} alt="Vastu Background" className="w-full h-full object-cover object-top" />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
                        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,rgba(217,119,6,0.2),transparent_50%)]" />
                    </div>
                    <div className="container mx-auto px-4 relative z-10 w-full animate-fade-in-up text-center">
                        <div className="max-w-4xl mx-auto">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-xl border border-white/30  mb-4 md:mb-8 shadow-2xl">
                                <Award className="w-4 h-4 text-[#FFC107]" />
                                <span className="text-[#FFC107] text-xs md:text-sm font-black uppercase tracking-widest">{banner.badge || "DIVINE SERVICES HUB"}</span>
                            </div>

                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)] uppercase">
                                {banner.titleHighlight1} {banner.titleEnd} <br />
                                <span className="text-yellow-300">{banner.titleHighlight2} {banner.titleHighlight3}</span>
                            </h1>

                            <p className="text-lg md:text-xl text-amber-100 leading-relaxed font-medium max-w-2xl mx-auto mb-4 md:mb-8 drop-shadow">
                                {banner.subtitle}
                            </p>

                            <div className="flex flex-wrap justify-center gap-5">
                                {banner.buttons && banner.buttons.length > 0 ? (
                                    banner.buttons.map((btn, idx) => (
                                        btn.text && (
                                            <button
                                                key={idx}
                                                onClick={() => btn.link?.startsWith('#') ? document.getElementById(btn.link.substring(1))?.scrollIntoView({ behavior: 'smooth' }) : (btn.link ? window.location.href = btn.link : null)}
                                                className={`group relative ${idx === 0 ? 'bg-[#E8453C] hover:bg-[#CC3B34]' : 'bg-[#F59E0B] hover:bg-[#D97706]'} text-white px-8 py-4 rounded-none font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] shadow-xl transition-all duration-300 overflow-hidden`}
                                            >
                                                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                                <span className="relative flex items-center gap-2">{btn.text}</span>
                                            </button>
                                        )
                                    ))
                                ) : (
                                    <>
                                        <button
                                            onClick={() => document.getElementById('checker-tool').scrollIntoView({ behavior: 'smooth' })}
                                            className="group relative bg-[#E8453C] hover:bg-[#CC3B34] text-white px-8 py-4 rounded-none font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] shadow-xl transition-all duration-300 overflow-hidden"
                                        >
                                            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                            <span className="relative flex items-center gap-2">{banner.button1Text || "Check My Home Vastu"}</span>
                                        </button>
                                        <button
                                            onClick={() => document.getElementById('booking-form').scrollIntoView({ behavior: 'smooth' })}
                                            className="group relative bg-[#F59E0B] hover:bg-[#D97706] text-white px-8 py-4 rounded-none font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] shadow-xl transition-all duration-300 overflow-hidden"
                                        >
                                            <div className="absolute inset-0 bg-black/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                            <span className="relative flex items-center gap-2">{banner.button2Text || "Book Office Consultation"}</span>
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 2 — Home Vastu Services (Styled Cards from TalkToAstrologer) */}
                <section className="py-12 md:py-16 bg-[#FAF9F6] relative overflow-hidden">
                    <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-orange-100/30 rounded-full blur-3xl -z-10" />
                    <div className="container mx-auto px-4 max-w-7xl relative z-10">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-[11px] font-bold uppercase tracking-wider mb-5">
                                <Sparkles className="w-3.5 h-3.5" />
                                <span>Core Residential Analysis</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-2 uppercase tracking-tighter">
                                Home Vastu <span className="text-orange-600">Services</span>
                            </h2>
                            <p className="text-gray-500 font-bold uppercase text-[10px] tracking-widest italic">Ensuring domestic bliss and family health.</p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                { title: "Bedroom Direction", desc: "Position for stability and authoritative leadership of the house head.", icon: Heart },
                                { title: "Kitchen Placement", desc: "Balancing the Agni (Fire) element for health and prosperity.", icon: Utensils },
                                { title: "Main Door Direction", desc: "Aligning the gateway of energy with positive cosmic nodes.", icon: DoorOpen },
                                { title: "Pooja Room Placement", desc: "Establishing a divine connection in the auspicious NE zone.", icon: Church },
                                { title: "Bathroom Vastu", desc: "Preventing energy drain and financial leakage through placement.", icon: Zap },
                                { title: "Energy Flow", desc: "Cleaning the Brahmasthan for unhindered positive vibes.", icon: Sun },
                            ].map((service, idx) => (
                                <div key={idx} className="group/card relative h-full p-[1.5px] rounded-3xl bg-amber-400/20 hover:bg-amber-500 transition-all duration-700 shadow-xl">
                                    <div className="relative h-full bg-white rounded-[1.4rem] p-8 flex flex-col items-center text-center group-hover/card:bg-[#FFFDF7] transition-all">
                                        <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mb-6 border border-orange-100 group-hover/card:bg-orange-600 group-hover/card:text-white transition-all duration-500">
                                            <service.icon className="w-8 h-8 text-orange-600 group-hover/card:text-white" />
                                        </div>
                                        <h3 className="text-xl font-black text-[#2A1D13] mb-4 uppercase tracking-tight group-hover/card:text-orange-600">{service.title}</h3>
                                        <p className="text-gray-500 text-xs font-bold leading-relaxed uppercase tracking-widest">{service.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Section 3 — Office Vastu (Dark High-Tech Styling) */}
                <section className="py-12 md:py-16 bg-gray-900 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-[100px]" />
                    <div className="container mx-auto px-4 max-w-7xl relative z-10">
                        <div className="grid lg:grid-cols-5 gap-12 items-center">
                            <div className="lg:col-span-2">
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 text-orange-400 rounded-full text-[10px] font-bold uppercase tracking-wider mb-5 border border-white/10">
                                    <Building2 className="w-3.5 h-3.5" />
                                    <span>Enterprise Success</span>
                                </div>
                                <h2 className="text-3xl md:text-5xl font-black mb-6 uppercase tracking-tighter leading-none">
                                    Office & Commercial <br /><span className="text-orange-500">Vastu Expert</span>
                                </h2>
                                <p className="text-gray-400 font-bold mb-8 italic text-sm">Empower your workspace to attract financial gains and market leadership.</p>
                                <div className="space-y-4">
                                    {["MD Cabin Positioning", "Staff Seating Strategy", "Cash Counter Vastu", "Meeting Room Energy"].map((item, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <div className="w-2 h-2 bg-orange-500 rounded-full" />
                                            <span className="text-xs font-black uppercase text-gray-300">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {[
                                    { title: "Entrance Vastu", desc: "First touchpoint for clients and wealth flow.", icon: DoorOpen },
                                    { title: "Work Desk Flow", desc: "Facing North/East for maximum productivity.", icon: Target },
                                    { title: "Accounts Zone", desc: "Securing the Kuber corner for profit growth.", icon: IndianRupee },
                                    { title: "Storage Space", desc: "Managing inventory for smooth turnover.", icon: Briefcase },
                                ].map((item, i) => (
                                    <div key={i} className="p-8 bg-white/5 border border-white/10 hover:border-orange-500 transition-all rounded-none group">
                                        <item.icon className="w-10 h-10 text-orange-500 mb-6 group-hover:scale-110 transition-transform" />
                                        <h3 className="text-lg font-bold mb-3 uppercase tracking-widest">{item.title}</h3>
                                        <p className="text-gray-500 text-[10px] font-bold uppercase leading-relaxed">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 4 — Vastu Problems We Solve (Grid matching TalkToAstrologer Experience) */}
                <section className="py-12 md:py-16 bg-white relative overflow-hidden">
                    <div className="container mx-auto px-4 max-w-7xl relative z-10">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 uppercase tracking-tighter">Problems We <span className="text-red-600 text-3xl">Eliminate</span></h2>
                            <div className="w-12 h-1 bg-red-600 mx-auto rounded-full" />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                            {[
                                { title: "Financial Loss", icon: DollarSign, color: "red" },
                                { title: "Career Block", icon: Briefcase, color: "orange" },
                                { title: "Health Issues", icon: Stethoscope, color: "rose" },
                                { title: "Relationship Stress", icon: Heart, color: "pink" },
                                { title: "Business Failure", icon: TrendingUp, color: "amber" },
                            ].map((item, i) => (
                                <div key={i} className="group p-8 text-center border-2 border-dashed border-gray-100 hover:border-orange-500 hover:bg-orange-50/30 transition-all duration-500">
                                    <div className="w-16 h-16 bg-white shadow-xl rounded-full flex items-center justify-center mb-6 mx-auto group-hover:rotate-[360deg] transition-transform duration-700">
                                        <item.icon className="w-8 h-8 text-orange-600" />
                                    </div>
                                    <h4 className="text-xs font-black uppercase text-gray-800 tracking-tight">{item.title}</h4>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Section 5 — Remedies (Clean Grid) */}
                <section className="py-12 md:py-16 bg-[#FFFDF7] relative overflow-hidden">
                    <div className="container mx-auto px-4 max-w-7xl relative z-10">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-2 uppercase tracking-tighter">Vedic <span className="text-orange-600">Remedies</span></h2>
                            <p className="text-gray-500 font-bold uppercase text-[10px] tracking-widest italic">Scientific correction without building changes.</p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                { title: "Yantra Placement", desc: "Geometric energy maps to fix directional flaws.", icon: LayoutIcon },
                                { title: "Mirror Correction", desc: "Strategic reflection to balance spatial prana.", icon: Star },
                                { title: "Color Therapy", desc: "Tattva-specific hues for elemental balance.", icon: Zap },
                                { title: "Gemstones", desc: "Mineral grounding for planetary harmony.", icon: Gem },
                                { title: "Energy Balancing", desc: "Metal strips for non-destructive healing.", icon: Shield },
                                { title: "Spatial Prana", desc: "Rituals to cleanse environmental energies.", icon: Sparkles },
                            ].map((item, i) => (
                                <div key={i} className="flex gap-5 items-start p-6 bg-white border border-orange-100 group hover:shadow-2xl transition-all">
                                    <div className="w-12 h-12 bg-orange-600 text-white flex items-center justify-center shrink-0">
                                        <item.icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-black text-sm uppercase tracking-widest text-[#2A1D13] mb-2 group-hover:text-orange-600 transition-colors">{item.title}</h3>
                                        <p className="text-[10px] font-bold text-gray-400 leading-relaxed uppercase italic">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Section 6 — Vastu Checker (Styled like Filters in TalkToAstrologer) */}
                <section id="checker-tool" className="py-12 md:py-16 bg-white relative">
                    <div className="container mx-auto px-4 max-w-5xl relative z-10">
                        <div className="bg-white border-4 border-orange-100 p-8 md:p-12 shadow-[0_30px_60px_-15px_rgba(217,119,6,0.15)] relative group">
                            <div className="absolute top-0 right-0 w-3 h-0 group-hover:h-full bg-orange-600 transition-all duration-700" />

                            <div className="text-center mb-10">
                                <h2 className="text-3xl font-black text-gray-900 mb-4 uppercase tracking-tighter">Vastu <span className="text-orange-600">Checker Tool</span></h2>
                                <p className="text-gray-500 font-bold uppercase text-[10px] tracking-widest italic">Get a basic diagnostic report instantly.</p>
                            </div>

                            <form onSubmit={runVastuChecker} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest pl-1 mb-1 block">Main Door</label>
                                    <select name="mainDoor" value={checkerData.mainDoor} onChange={handleCheckerChange} className="w-full bg-[#FAF9F6] border-2 border-orange-50 px-5 py-4 font-bold text-[#4A3427] focus:border-orange-500 outline-none transition-all rounded-none appearance-none cursor-pointer" required>
                                        <option value="">Select Direction</option>
                                        <option value="north">North</option>
                                        <option value="south">South</option>
                                        <option value="east">East</option>
                                        <option value="west">West</option>
                                        <option value="northeast">North-East</option>
                                        <option value="northwest">North-West</option>
                                        <option value="southeast">South-East</option>
                                        <option value="southwest">South-West</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest pl-1 mb-1 block">Kitchen</label>
                                    <select name="kitchen" value={checkerData.kitchen} onChange={handleCheckerChange} className="w-full bg-[#FAF9F6] border-2 border-orange-50 px-5 py-4 font-bold text-[#4A3427] focus:border-orange-500 outline-none transition-all rounded-none appearance-none cursor-pointer" required>
                                        <option value="">Select Direction</option>
                                        <option value="southeast">South-East (Fire)</option>
                                        <option value="north">North</option>
                                        <option value="west">West</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest pl-1 mb-1 block">Bedroom</label>
                                    <select name="bedroom" value={checkerData.bedroom} onChange={handleCheckerChange} className="w-full bg-[#FAF9F6] border-2 border-orange-50 px-5 py-4 font-bold text-[#4A3427] focus:border-orange-500 outline-none transition-all rounded-none appearance-none cursor-pointer" required>
                                        <option value="">Select Direction</option>
                                        <option value="southwest">South-West (Stability)</option>
                                        <option value="east">East</option>
                                        <option value="north">North</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                            </form>

                            <button type="submit" className="w-full bg-orange-600 hover:bg-black text-white font-black text-xs uppercase tracking-[0.4em] py-5 shadow-xl transition-all duration-500 flex items-center justify-center gap-4">
                                Generate basic Report <ArrowRight className="w-5 h-5" />
                            </button>

                            {checkerResult && (
                                <div className="mt-12 animate-fade-in-up">
                                    <div className="bg-[#FAF9F6] p-8 border-2 border-orange-100">
                                        <h4 className="text-sm font-black text-gray-900 mb-6 uppercase tracking-widest flex items-center gap-3">
                                            <FileText className="w-5 h-5 text-orange-600" /> Diagnostic Result:
                                        </h4>
                                        <div className="space-y-4">
                                            {checkerResult.map((res, i) => (
                                                <div key={i} className={`p-5 rounded-none border-l-8 ${res.type === 'success' ? 'bg-green-50 border-green-500 text-green-800' : 'bg-orange-50 border-orange-500 text-orange-800'} text-[10px] font-black uppercase tracking-tight flex items-center gap-4`}>
                                                    {res.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <Frown className="w-5 h-5" />}
                                                    <span>{res.text}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* Section — Upload Property Map & Booking Form (Styled like Profile Modal content) */}
                <section id="booking-form" className="py-12 md:py-16 bg-[#FAF9F6] relative overflow-hidden">
                    <div className="container mx-auto px-4 max-w-6xl relative z-10">
                        <div className="grid lg:grid-cols-2 gap-16 items-start">
                            <div>
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-[10px] font-bold uppercase tracking-wider mb-5">
                                    <Sparkles className="w-3.5 h-3.5" />
                                    <span>Personalized Deep Audit</span>
                                </div>
                                <h2 className="text-3xl md:text-5xl font-black text-[#2A1D13] mb-6 uppercase tracking-tighter leading-tight">
                                    Get Your <span className="text-orange-600 italic">Vastu Report</span> <br />By Acharya Ji
                                </h2>
                                <p className="text-gray-600 font-bold mb-10 text-sm leading-relaxed uppercase tracking-widest italic">
                                    Upload your property blueprints or a hand-drawn layout. Our team will perform a 16-zone seismic scan for precise energy remedies.
                                </p>

                                <div className="space-y-6">
                                    {[
                                        { title: "5000+ Happy Clients", icon: Users },
                                        { title: "15+ Years Experience", icon: Clock },
                                        { title: "Authentic Vedic Methods", icon: Shield }
                                    ].map((badge, i) => (
                                        <div key={i} className="flex items-center gap-4 p-5 bg-white border border-orange-100 shadow-sm">
                                            <div className="w-12 h-12 bg-orange-600 flex items-center justify-center shrink-0">
                                                <badge.icon className="w-6 h-6 text-white" />
                                            </div>
                                            <span className="text-[11px] font-black uppercase tracking-widest text-gray-800">{badge.title}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-12 p-6 bg-orange-600 text-white font-black text-xs uppercase tracking-widest text-center shadow-xl">
                                    Limited Offer: Free 15-min Consultation On First Map Upload!
                                </div>
                            </div>

                            <div className="bg-white p-8 md:p-12 border-2 border-orange-100 shadow-[0_30px_100px_rgba(217,119,6,0.1)] relative group">
                                <div className="absolute top-0 right-0 w-3 h-0 group-hover:h-full bg-orange-600 transition-all duration-700" />
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block pl-1">Full Name</label>
                                            <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full bg-[#FAF9F6] border border-gray-200 px-5 py-4 font-bold focus:border-orange-500 outline-none rounded-none" placeholder="John Doe" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block pl-1">Phone Number</label>
                                            <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required className="w-full bg-[#FAF9F6] border border-gray-200 px-5 py-4 font-bold focus:border-orange-500 outline-none rounded-none" placeholder="+91 0000 0000" />
                                        </div>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block pl-1">Email Id</label>
                                            <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full bg-[#FAF9F6] border border-gray-200 px-5 py-4 font-bold focus:border-orange-500 outline-none rounded-none" placeholder="john@example.com" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block pl-1">Property Type</label>
                                            <select name="propertyType" value={formData.propertyType} onChange={handleInputChange} required className="w-full bg-[#FAF9F6] border border-gray-200 px-5 py-4 font-bold focus:border-orange-500 outline-none rounded-none appearance-none cursor-pointer">
                                                <option value="">Select Property</option>
                                                <option value="Home">Home (Flat/Villa)</option>
                                                <option value="Office">Commercial Office</option>
                                                <option value="Shop">Retail Shop</option>
                                                <option value="Industrial">Factory/Industry</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block pl-1">Size (Sq.Ft.)</label>
                                            <input type="text" name="propertySize" value={formData.propertySize} onChange={handleInputChange} className="w-full bg-[#FAF9F6] border border-gray-200 px-5 py-4 font-bold focus:border-orange-500 outline-none rounded-none" placeholder="e.g. 1500" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block pl-1">Consultation Mode</label>
                                            <select name="consultationType" value={formData.consultationType} onChange={handleInputChange} required className="w-full bg-[#FAF9F6] border border-gray-200 px-5 py-4 font-bold focus:border-orange-500 outline-none rounded-none appearance-none cursor-pointer">
                                                <option value="">Online/On-Site</option>
                                                <option value="Online">Online Report</option>
                                                <option value="OnSite">On-Site Visit</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                                            <Upload className="w-4 h-4 text-orange-600" /> Upload Property Map
                                        </label>
                                        <div className="relative border-4 border-dashed border-gray-100 hover:border-orange-500 transition-all p-10 flex flex-col items-center justify-center bg-[#FAF9F6] group/upload">
                                            <input type="file" name="map" onChange={handleInputChange} accept=".jpg,.jpeg,.png,.pdf" required className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                                            <FileText className="w-10 h-10 text-gray-300 group-hover/upload:text-orange-600 transition-colors mb-4" />
                                            <p className="text-[11px] font-black uppercase text-gray-500">{formData.map ? formData.map.name : "Choose File or Drag Map"}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block pl-1">Description</label>
                                        <textarea name="description" value={formData.description} onChange={handleInputChange} rows="3" className="w-full bg-[#FAF9F6] border border-gray-200 px-5 py-4 font-bold focus:border-orange-500 outline-none rounded-none resize-none" placeholder="Quickly describe your major Vastu issues..." />
                                    </div>

                                    <button type="submit" className="w-full bg-[#E8453C] hover:bg-black text-white font-black text-xs uppercase tracking-[0.4em] py-5 shadow-2xl transition-all duration-500 flex items-center justify-center gap-4">
                                        Book Consultation <ArrowRight className="w-5 h-5" />
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Final CTA Section (Exact Style from TalkToAstrologer) */}
                <section className="py-12 md:py-16 bg-white border-t border-orange-50">
                    <div className="container mx-auto px-4 text-center max-w-5xl animate-fade-in-up">
                        <h2 className="text-3xl md:text-5xl font-black text-[#2A1B13] mb-8 uppercase tracking-widest leading-none">
                            Align Your Space for <br /><span className="text-[#E8453C]">Divine Success</span>
                        </h2>
                        <div className="flex items-center justify-center gap-3 mb-10">
                            <div className="w-14 h-[2px] bg-orange-200" />
                            <Sparkles className="w-6 h-6 text-orange-400" />
                            <div className="w-14 h-[2px] bg-orange-200" />
                        </div>
                        <p className="text-gray-500 mb-12 text-sm md:text-base font-bold max-w-2xl mx-auto leading-relaxed uppercase tracking-[0.2em] italic">
                            Don't let directional faults block your prosperity. Talk to Acharya Ji for an instant spatial energy scan.
                        </p>
                        <div className="flex flex-wrap justify-center gap-6">
                            <a href="https://wa.me/919910008432" className="group relative bg-[#25D366] hover:bg-black text-white px-12 py-5 rounded-none font-black text-xs uppercase tracking-[0.3em] shadow-2xl transition-all duration-300 overflow-hidden flex items-center gap-3">
                                <MessageCircle className="w-5 h-5" /> WhatsApp Support
                            </a>
                            <a href="tel:+919910008432" className="group relative bg-[#2A1D13] hover:bg-black text-amber-400 px-12 py-5 rounded-none font-black text-xs uppercase tracking-[0.3em] shadow-2xl transition-all duration-300 overflow-hidden border border-[#2A1D13] flex items-center gap-3">
                                <Phone className="w-5 h-5" /> Call Directly
                            </a>
                        </div>
                    </div>
                </section>

                {/* Section — Consultation Process (How it Works) */}
                <section className="py-12 md:py-16 bg-[#FAF9F6] relative overflow-hidden">
                    <div className="container mx-auto px-4 relative z-10">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-black text-[#2A1B13] mb-4 uppercase tracking-tighter">The <span className="text-orange-600">Consultation Path</span></h2>
                            <div className="w-20 h-1.5 bg-orange-500 mx-auto rounded-full mb-8" />
                        </div>

                        <div className="relative max-w-5xl mx-auto">
                            <div className="hidden md:block absolute top-10 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-orange-200 to-transparent"></div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 md:gap-4">
                                {[
                                    { n: "1", t: "Submit Details", d: "Property Info", icon: FileText },
                                    { n: "2", t: "Upload Map", d: "Blueprints / Map", icon: Upload },
                                    { n: "3", t: "Energy Analysis", d: "Expert Scan", icon: Search },
                                    { n: "4", t: "Get Solutions", d: "Final Report", icon: FileCheck }
                                ].map((step, idx) => (
                                    <div key={idx} className="relative flex flex-col items-center group">
                                        <div className="relative w-24 h-24 bg-white rounded-none flex flex-col items-center justify-center mb-6 border-2 border-orange-100 shadow-xl z-10 group-hover:bg-orange-600 transition-all duration-500">
                                            <span className="text-2xl font-black text-orange-600 group-hover:text-white">{step.n}</span>
                                            <div className="absolute -top-3 -right-3 p-2 bg-orange-600 text-white rounded-none shadow-lg group-hover:bg-white group-hover:text-orange-600 transition-all">
                                                <step.icon className="w-4 h-4" />
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <h3 className="font-black text-[#4A3427] text-xs uppercase tracking-wider mb-2 group-hover:text-orange-600 transition-colors">{step.t}</h3>
                                            <p className="text-gray-400 text-[9px] font-bold uppercase tracking-[0.2em]">{step.d}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section — Testimonials (Styled like TalkToAstrologer) */}
                <section className="py-12 md:py-16 bg-white relative overflow-hidden">
                    <div className="container mx-auto px-4 max-w-7xl relative z-10">
                        <div className="text-center mb-16 animate-fade-in-up">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-50 text-green-700 rounded-full text-[10px] font-extrabold uppercase tracking-[0.2em] mb-4">
                                <ThumbsUp className="w-3.5 h-3.5 fill-green-700" />
                                <span>Seeker Testimonials</span>
                            </div>
                            <h2 className="text-3xl md:text-5xl font-black text-[#4A3427] mb-6 uppercase">Praise for <span className="text-orange-600">Vedic Balance</span></h2>
                            <div className="mt-8 flex items-center justify-center gap-6">
                                <div className="text-5xl font-black text-[#2A1D13] tracking-tighter">4.9<span className="text-orange-600 text-2xl">/5</span></div>
                                <div className="h-10 w-px bg-orange-200" />
                                <div className="text-left">
                                    <div className="flex gap-0.5 mb-1">
                                        {[1, 2, 3, 4, 5].map(i => <StarIcon key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />)}
                                    </div>
                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">3000+ Vastu Map Scans</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                            {[
                                { name: "Anil Kapoor", text: "Acharya Ji's office Vastu transformation was life-changing for my tech startup. The cash flow problems vanished within 3 months of applying simple remedies.", location: "Bangalore" },
                                { name: "Megha Gupta", text: "I was skeptical about online Vastu, but the report provided based on my house map was incredibly detailed. My family health improved significantly.", location: "Delhi, India" },
                                { name: "Sanjay Verma", text: "The non-destructive remedies are the best part. No walls broken, yet the energy of my factory shifted completely towards profit.", location: "Guwahati" }
                            ].map((review, idx) => (
                                <div key={idx} className="bg-[#FFFDF7] p-8 border border-orange-100 shadow-xl relative hover:border-orange-400 transition-all group rounded-none">
                                    <div className="absolute -top-4 -left-2 text-6xl text-orange-50 font-serif group-hover:text-orange-100 transition-colors">"</div>
                                    <div className="flex gap-1 mb-5 relative z-10">
                                        {[1, 2, 3, 4, 5].map(i => <StarIcon key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />)}
                                    </div>
                                    <p className="text-gray-600 font-medium text-sm mb-8 leading-relaxed italic relative z-10">"{review.text}"</p>
                                    <div className="border-t border-orange-100 pt-5 mt-auto">
                                        <h4 className="font-extrabold text-[#4A3427] text-sm uppercase tracking-wide">{review.name}</h4>
                                        <p className="text-[10px] text-orange-600 font-bold uppercase tracking-widest">{review.location}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQ Section (Styled like TalkToAstrologer) */}
                <section className="py-16 bg-[#FAF9F6] relative overflow-hidden">
                    <div className="container mx-auto px-4 max-w-3xl relative z-10">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 text-orange-600 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                                <HelpCircle className="w-3.5 h-3.5" />
                                <span>Knowledge Hub</span>
                            </div>
                            <h2 className="text-3xl font-black text-[#2A1D13] mb-4 uppercase tracking-tighter">Common <span className="text-orange-600">Queries</span></h2>
                        </div>

                        <div className="space-y-4">
                            {FAQS.map((faq, i) => (
                                <div key={i} className="bg-white border-2 border-orange-50 hover:border-orange-200 transition-all shadow-sm">
                                    <button
                                        onClick={() => setSelectedFaq(selectedFaq === i ? null : i)}
                                        className="w-full px-8 py-6 flex items-center justify-between text-left"
                                    >
                                        <span className="font-extrabold text-[#2A1D13] text-sm md:text-base uppercase tracking-tight">Q. {faq.q}</span>
                                        <div className={`p-1.5 rounded-lg transition-colors ${selectedFaq === i ? 'bg-orange-600 text-white' : 'bg-orange-50 text-orange-400'}`}>
                                            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${selectedFaq === i ? 'rotate-180' : ''}`} />
                                        </div>
                                    </button>
                                    <div
                                        className={`overflow-hidden transition-all duration-300 ${selectedFaq === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                                    >
                                        <div className="px-8 pb-8 pt-0 border-t border-orange-50 text-gray-600 font-medium text-sm leading-relaxed mt-6">
                                            A. {faq.a}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default HomeOfficeVastu;
