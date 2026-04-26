import { useState } from "react";
import { Link } from "react-router-dom";
import {
    Calendar,
    Phone,
    Users,
    Heart,
    Award,
    Globe,
    Shield,
    Sparkle,
    Sparkles,
    BookOpen,
    Star,
    CheckCircle,
    Clock,
    MapPin,
    ChevronRight,
    Zap,
    Leaf,
    HelpCircle,
    MessageSquare,
    Gem
} from "lucide-react";
import { Layout } from '@/components/layout/Layout';
import { usePageBanner } from "@/hooks/usePageBanner";
import { BACKEND_URL } from "@/config/apiConfig";

const CrystalHealing = () => {
    const banner = usePageBanner({ pollingInterval: 60000 });
    const [selectedFaq, setSelectedFaq] = useState(null);

    const crystals = [
        {
            Image: "https://images.unsplash.com/photo-1567696153798-9111f9cd3d0d?auto=format&fit=crop&q=80&w=800",
            title: "Amethyst",
            items: ["Calms the mind & spirit", "Relieves stress and anxiety", "Enhances intuition", "Promotes restful sleep"],
            color: "from-purple-500 to-indigo-600"
        },
        {
            Image: "https://images.unsplash.com/photo-1615485290382-441e4d019cb0?auto=format&fit=crop&q=80&w=800",
            title: "Rose Quartz",
            items: ["Attracts love & harmony", "Heals emotional wounds", "Boosts self-compassion", "Opens the heart chakra"],
            color: "from-pink-400 to-rose-600"
        },
        {
            Image: "https://images.unsplash.com/photo-1611082536814-ddf0012217ec?auto=format&fit=crop&q=80&w=800",
            title: "Citrine",
            items: ["Attracts wealth & success", "Increases creativity", "Boosts physical energy", "Protects from negativity"],
            color: "from-yellow-400 to-orange-600"
        },
        {
            Image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800",
            title: "Clear Quartz",
            items: ["Amplifies other crystals", "Masters physical healing", "Clarifies the soul", "Aligns all chakras"],
            color: "from-blue-200 to-teal-400"
        }
    ];

    const healingValues = [
        {
            icon: Gem,
            title: 'Vibrational Therapy',
            description: 'Every crystal resonates at a unique frequency that aligns with your body energy.',
        },
        {
            icon: Shield,
            title: 'Aura Protection',
            description: 'Shield yourself from environmental stressors and negative vibrations.',
        },
        {
            icon: Heart,
            title: 'Emotional Mirror',
            description: 'Crystals reflect your inner state, allowing for deep subconscious healing.',
        },
    ];

    const whyChooseCrystals = [
        { icon: Sparkles, title: "Natural Resonance", desc: "100% authentic earth gemstones" },
        { icon: Users, title: "Personalized Selection", desc: "Consultation based on your birth chart" },
        { icon: Globe, title: "Global Sourcing", desc: "Ethically sourced from deep mines" },
        { icon: Clock, title: "Lasting Energy", desc: "Vibrations that stay after therapy" },
        { icon: Heart, title: "Spiritual Connection", desc: "Reconnect with earth's core" },
        { icon: Shield, title: "Protection Amulets", desc: "Carry energy wherever you go" }
    ];

    const testimonials = [
        {
            name: "Meera Sharma",
            text: "The Amethyst cluster I bought has transformed my meditation practice. The energy is truly palpable and calming.",
            location: "Delhi, India",
            rating: 5
        },
        {
            name: "Arjun Singh",
            text: "Rose Quartz helped me heal after a difficult breakup. I feel more open to love and self-compassion now.",
            location: "Mumbai, India",
            rating: 5
        },
        {
            name: "Kavita Patel",
            text: "The crystal consultation was eye-opening. I was matched with stones that perfectly align with my birth chart.",
            location: "Bangalore, India",
            rating: 5
        }
    ];

    const FAQS = [
        {
            q: "How do crystals heal?",
            a: "Crystals act as conduits for healing; they allow positive, healing energy to flow into the body as negative, disease-causing energy flows out."
        },
        {
            q: "Do I need to clean my crystals?",
            a: "Yes, crystals absorb various energies. We recommend cleansing them under moonlight or with sage smoke once a month to reset their frequency."
        },
        {
            q: "Can I wear multiple crystals?",
            a: "Absolutely. Many crystals work in synergy (e.g., Amethyst and Rose Quartz for peaceful love). Our experts can guide you on the right combinations."
        },
        {
            q: "How do you energize crystals?",
            a: "We perform Vedic rituals and mantra chanting to activate the crystals' natural healing properties before shipping them to you."
        }
    ];

    return (
        <Layout>
            <div className="min-h-[80vh]">
                <div className="min-h-screen bg-background">
                    {/* Hero Section - Exact About Us Style */}
                    <section className="relative h-[320px] sm:h-[320px] md:h-[360px] lg:h-[370px] flex items-center py-[20px] text-white overflow-hidden">
                        <div className="absolute inset-0">
                            {banner.imageUrl ? (
                                <img src={banner.imageUrl.startsWith('http') ? banner.imageUrl : `${BACKEND_URL}${banner.imageUrl}`} alt="Background" className="w-full h-full object-cover object-top" />
                            ) : (
                                <div className="absolute inset-0 bg-[#2A1D13]/90" />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
                            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,rgba(217,119,6,0.2),transparent_50%)]" />
                        </div>
                        <div className="container mx-auto px-4 relative z-10 w-full animate-fade-in-up text-center">
                            <div className="max-w-4xl mx-auto">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 mb-8 shadow-2xl">
                                    <Award className="w-4 h-4 text-[#FFC107]" />
                                    <span className="text-[#FFC107] text-xs md:text-sm font-black uppercase tracking-widest">{banner.badge || "DIVINE SERVICES HUB"}</span>
                                </div>
                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)] uppercase">
                                    {banner.titleHighlight1} <br />
                                    <span className="text-yellow-300">{banner.titleHighlight2} {banner.titleHighlight3}</span> {banner.titleEnd}
                                </h1>
                                <p className="text-lg md:text-xl text-amber-100 leading-relaxed font-medium max-w-2xl mx-auto mb-8 drop-shadow">
                                    {banner.subtitle}
                                </p>

                                <div className="flex flex-wrap justify-center gap-4">
                                    {banner.buttons && banner.buttons.length > 0 ? (
                                        banner.buttons.map((btn, idx) => (
                                            btn.text && (
                                                <button
                                                    key={idx}
                                                    onClick={() => btn.link?.startsWith('#') ? document.getElementById(btn.link.substring(1))?.scrollIntoView({ behavior: 'smooth' }) : (btn.link ? (btn.link.startsWith('http') ? window.location.href = btn.link : window.location.pathname = btn.link) : null)}
                                                    className={`group relative ${idx === 0 ? 'bg-[#E8453C] hover:bg-[#CC3B34]' : 'bg-[#F59E0B] hover:bg-[#D97706]'} text-white px-8 py-4 rounded-none font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] shadow-xl transition-all duration-300 overflow-hidden`}
                                                >
                                                    <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                                    <span className="relative flex items-center gap-2.5">
                                                        {btn.text}
                                                    </span>
                                                </button>
                                            )
                                        ))
                                    ) : (
                                        <>
                                            <button className="group relative bg-[#E8453C] hover:bg-[#CC3B34] text-white px-8 py-4 rounded-none font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] shadow-xl transition-all duration-300 overflow-hidden">
                                                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                                <span className="relative flex items-center gap-2.5">
                                                    <Gem className="w-3.5 h-3.5" /> Book Therapy
                                                </span>
                                            </button>
                                            <button className="group relative bg-[#F59E0B] hover:bg-[#D97706] text-white px-8 py-4 rounded-none font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] shadow-xl transition-all duration-300 overflow-hidden">
                                                <div className="absolute inset-0 bg-black/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                                <span className="relative flex items-center gap-2.5">
                                                    <Phone className="w-3.5 h-3.5" /> Free Consultation
                                                </span>
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Our Sacred Journey Section - Exact About Us Style */}
                    <section className="py-12 md:py-16 overflow-x-hidden relative">
                        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-orange-100/30 rounded-full blur-3xl -z-10" />
                        <div className="container mx-auto px-4">
                            <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-center">
                                <div className="lg:order-1 order-1 animate-fade-in-left">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-[11px] font-bold uppercase tracking-wider mb-5">
                                        <Sparkles className="w-3.5 h-3.5" />
                                        <span>Mineral Wisdom</span>
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 leading-tight">
                                        More Than Just <span className="text-orange-600">Gemstones</span>
                                    </h2>
                                    <div className="flex items-center gap-2 mb-5">
                                        <div className="w-12 h-1 bg-orange-200 rounded-full" />
                                        <Sparkles className="w-5 h-5 text-orange-400" />
                                        <div className="w-12 h-1 bg-orange-200 rounded-full" />
                                    </div>
                                    <div className="space-y-3 text-gray-700 font-medium text-sm md:text-base">
                                        <p className="leading-relaxed"><strong className="text-orange-600 font-semibold">Crystals</strong> have been used for millennia by various civilizations to promote physical health, emotional well-being, and spiritual enlightenment.</p>
                                        <p className="leading-relaxed">At Acharya Ji, we combine Vedic principles with Crystal therapy to ensure you are matched with the stones that harmonize perfectly with your energy frequency.</p>
                                    </div>
                                    <div className="mt-6 grid grid-cols-2 gap-3">
                                        {['Authentic Gemstones', 'Energized Crystals', 'Customized Healing', 'Aura Cleansing'].map((item) => (
                                            <div key={item} className="flex items-center gap-2.5">
                                                <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                                                    <CheckCircle className="w-3.5 h-3.5 text-orange-600" />
                                                </div>
                                                <span className="text-sm font-medium text-gray-800">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="relative group lg:order-2 order-2 flex justify-center animate-fade-in-right">
                                    <div className="relative w-[96%] max-w-lg mx-auto p-1.5 md:p-2 bg-gradient-to-br from-orange-100 to-amber-300 rounded-[2rem] shadow-[0_20px_50px_-15px_rgba(217,119,6,0.25)] hover:shadow-[0_20px_50px_-15px_rgba(217,119,6,0.4)] transition-shadow duration-500">
                                        <div className="absolute -inset-1 border border-amber-300 rounded-[2.2rem] -z-10 group-hover:bg-amber-100/30 transition-all duration-500" />
                                        <div className="w-full h-[315px] sm:h-[375px] md:h-[445px] rounded-3xl overflow-hidden border-[3px] border-white relative z-10">
                                            <img
                                                src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800"
                                                alt="Crystal Therapy"
                                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#2A1D13]/60 via-transparent to-transparent opacity-80" />
                                        </div>
                                        {/* Experience Badge */}
                                        <div className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 bg-white p-2.5 md:p-3 rounded-2xl shadow-xl border border-amber-100 z-20 flex items-center gap-3 group-hover:-translate-y-2 transition-transform duration-500">
                                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-amber-50 flex items-center justify-center border border-amber-200 shadow-inner">
                                                <Gem className="w-4 h-4 md:w-6 md:h-6 text-amber-600" />
                                            </div>
                                            <div className="text-[10px] md:text-xs font-bold text-gray-800 leading-tight uppercase tracking-wide pr-2">
                                                Ancient<br /><span className="text-amber-600">Wisdom</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* What We Offer Section - Exact About Us Style */}
                    <section className="py-12 md:py-16 bg-[#FAF9F6] relative overflow-hidden">
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #d97706 1px, transparent 0)', backgroundSize: '32px 32px' }} />
                        <div className="container mx-auto px-4 max-w-7xl relative z-10">
                            <div className="text-center mb-16 animate-fade-in-up">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 text-orange-600 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                                    <Star className="w-3.5 h-3.5" />
                                    <span>Sacred Mineralogy</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">Explore the <span className="text-orange-600">Vibration</span></h2>
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-12 h-1 bg-orange-200 rounded-full" />
                                    <Sparkles className="w-5 h-5 text-orange-400" />
                                    <div className="w-12 h-1 bg-orange-200 rounded-full" />
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8 max-w-[90rem] mx-auto">
                                {crystals.map((crystal, idx) => (
                                    <div
                                        key={idx}
                                        className="group/card h-full animate-fade-in-up"
                                        style={{ animationDelay: `${idx * 0.1}s`, animationFillMode: 'both' }}
                                    >
                                        {/* Premium Border */}
                                        <div className="relative h-full p-[1.5px] rounded-3xl bg-orange-400/40 hover:bg-orange-500 transition-all duration-700 shadow-xl shadow-orange-200/10 hover:shadow-orange-200/30 flex flex-col">
                                            <div className="relative flex-grow bg-[#FCFBF7] rounded-[1.4rem] overflow-hidden flex flex-col group-hover/card:bg-white transition-all duration-500">
                                                {/* Background Ornament */}
                                                <div className="absolute top-0 right-0 w-48 h-48 bg-orange-100/40 rounded-full blur-[80px] -mr-24 -mt-24 group-hover/card:bg-orange-400/20 transition-all duration-1000" />

                                                {/* Image Frame */}
                                                <div className="relative m-2.5 mb-3 rounded-2xl overflow-hidden shadow-lg h-36 md:h-40 z-10">
                                                    <img
                                                        src={crystal.Image}
                                                        alt={crystal.title}
                                                        className="w-full h-full object-cover transition-all duration-[2.5s] group-hover/card:scale-110 group-hover/card:rotate-1"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-[#2A1D13]/80 via-transparent to-transparent opacity-60 group-hover/card:opacity-40 transition-opacity duration-700" />

                                                    {/* Corner Accents */}
                                                    <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-white/60 rounded-tl-xl group-hover/card:border-orange-400 transition-all duration-500" />
                                                    <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-white/40 rounded-br-xl group-hover/card:border-orange-400 transition-all duration-500" />
                                                </div>

                                                {/* Card Content */}
                                                <div className="flex flex-col flex-grow px-4 pb-5 text-center relative z-20">
                                                    <h3 className="text-base md:text-lg font-black text-[#2A1D13] mb-1.5 tracking-wide uppercase transition-colors group-hover/card:text-orange-600">
                                                        {crystal.title}
                                                    </h3>

                                                    {/* Ornamental Divider */}
                                                    <div className="flex items-center justify-center gap-3 mb-4">
                                                        <div className="h-[1.5px] w-8 bg-gradient-to-r from-transparent via-orange-200 to-orange-500 group-hover/card:w-12 transition-all duration-700" />
                                                        <Sparkle className="w-5 h-5 text-orange-500 fill-orange-500/10 group-hover/card:rotate-90 transition-transform duration-700" />
                                                        <div className="h-[1.5px] w-8 bg-gradient-to-l from-transparent via-orange-200 to-orange-500 group-hover/card:w-12 transition-all duration-700" />
                                                    </div>

                                                    <ul className="space-y-2 mb-5 text-left">
                                                        {crystal.items.slice(0, 3).map((item, i) => (
                                                            <li key={i} className="flex items-center gap-3">
                                                                <div className="w-6 h-6 rounded-lg bg-orange-50 flex items-center justify-center flex-shrink-0 transition-all duration-500 group-hover/card:bg-orange-600">
                                                                    <CheckCircle className="w-3.5 h-3.5 text-orange-600 group-hover/card:text-white" />
                                                                </div>
                                                                <span className="text-xs font-bold text-[#4A3427]/80 group-hover/card:text-[#2A1D13] transition-colors">{item}</span>
                                                            </li>
                                                        ))}
                                                    </ul>

                                                    {/* Action Button */}
                                                    <div className="mt-auto">
                                                        <button className="group/btn relative w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#2A1D13] text-orange-400 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-500 hover:bg-orange-600 hover:text-white shadow-lg group-hover/card:-translate-y-1">
                                                            <span>Buy & Energize</span>
                                                            <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Why Choose Us Section - Exact About Us Style */}
                    <section className="py-12 md:py-16 bg-[#FFFDF7] relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-100/30 rounded-full blur-3xl -mr-32 -mt-32" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-100/30 rounded-full blur-3xl -ml-32 -mb-32" />
                        <div className="container mx-auto px-4 max-w-7xl relative z-10">
                            <div className="text-center mb-16 animate-fade-in-up">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 text-orange-600 rounded-full text-[10px] font-extrabold uppercase tracking-[0.2em] mb-4">
                                    <Shield className="w-3.5 h-3.5" />
                                    <span>The Crystal Standard</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">Why Choose <span className="text-orange-600">Crystals</span></h2>
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-12 h-1 bg-orange-200 rounded-full" />
                                    <Sparkles className="w-5 h-5 text-orange-400" />
                                    <div className="w-12 h-1 bg-orange-200 rounded-full" />
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                                {whyChooseCrystals.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="group bg-white p-5 md:p-6 hover:shadow-[0_20px_40px_-15px_rgba(234,88,12,0.15)] transition-all duration-500 border-2 border-orange-100 flex items-start gap-4 md:gap-5 rounded-none relative overflow-hidden animate-fade-in-up"
                                        style={{ animationDelay: `${idx * 0.1}s`, animationFillMode: 'both' }}
                                    >
                                        <div className="absolute top-0 right-0 w-2 h-0 group-hover:h-full bg-orange-600 transition-all duration-500" />
                                        <div className="w-16 h-16 rounded-none bg-orange-50 flex items-center justify-center flex-shrink-0 group-hover:bg-orange-600 transition-all duration-500 shadow-inner">
                                            <item.icon className="w-8 h-8 text-orange-600 group-hover:text-white transition-all transform group-hover:scale-110" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-extrabold text-[#2A1D13] mb-2 leading-tight group-hover:text-orange-600 transition-colors uppercase tracking-tight">{item.title}</h3>
                                            <p className="text-gray-500 text-sm font-semibold leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Core Values Section - Exact About Us Style */}
                    <section className="py-12 md:py-16 bg-white">
                        <div className="container mx-auto px-4 max-w-6xl">
                            <div className="text-center mb-16 animate-fade-in-up">
                                <h2 className="text-3xl md:text-4xl font-black text-[#2A1D13] mb-2 uppercase">Healing <span className="text-orange-600">Philosophy</span></h2>
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-12 h-1 bg-orange-200 rounded-full" />
                                    <Sparkles className="w-5 h-5 text-orange-400" />
                                    <div className="w-12 h-1 bg-orange-200 rounded-full" />
                                </div>
                            </div>
                            <div className="grid md:grid-cols-3 gap-4 md:gap-5 max-w-5xl mx-auto">
                                {healingValues.map((value, index) => (
                                    <div
                                        key={index}
                                        className="bg-[#FFFAF3] p-4 py-6 text-center border-b-[6px] border-orange-600 shadow-md hover:shadow-2xl transition-all duration-500 rounded-none relative group overflow-hidden animate-fade-in-up"
                                        style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'both' }}
                                    >
                                        <div className="absolute top-4 right-4 text-orange-200/50 group-hover:text-orange-400 transition-all duration-700">
                                            <Sparkles className="w-5 h-5" />
                                        </div>
                                        <div className="w-14 h-14 rounded-sm bg-white mx-auto mb-5 flex items-center justify-center shadow-md group-hover:shadow-xl transition-all duration-500 border border-orange-100/50 relative">
                                            <div className="absolute inset-0 bg-orange-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left opacity-10" />
                                            <value.icon className="w-7 h-7 text-orange-600 group-hover:scale-110 transition-transform duration-500" />
                                        </div>
                                        <h3 className="text-lg font-black text-[#2A1D13] mb-3 uppercase tracking-wider group-hover:text-orange-600 transition-colors">{value.title}</h3>
                                        <p className="text-gray-600 font-semibold leading-relaxed text-xs">{value.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Testimonials Section - Exact About Us Style */}
                    <section className="py-12 md:py-16 bg-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-50 rounded-full blur-3xl -mr-32 -mt-32" />
                        <div className="container mx-auto px-4 max-w-6xl relative z-10">
                            <div className="text-center mb-16 animate-fade-in-up">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 text-orange-700 rounded-full text-[10px] font-extrabold uppercase tracking-[0.2em] mb-4">
                                    <Star className="w-3.5 h-3.5 fill-orange-700" />
                                    <span>Crystal Experiences</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-black text-[#2A1D13] mb-6 uppercase">What Our <span className="text-orange-600">Clients Say</span></h2>
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-12 h-1 bg-orange-200 rounded-full" />
                                    <Sparkles className="w-5 h-5 text-orange-400" />
                                    <div className="w-12 h-1 bg-orange-200 rounded-full" />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
                                {testimonials.map((review, idx) => (
                                    <div
                                        key={idx}
                                        className="bg-[#FFFDF7] p-6 md:p-7 border border-orange-100 shadow-lg rounded-2xl relative animate-fade-in-up"
                                        style={{ animationDelay: `${idx * 0.1}s`, animationFillMode: 'both' }}
                                    >
                                        <div className="absolute -top-4 -left-2 text-6xl text-orange-100 font-serif">"</div>
                                        <div className="flex gap-1 mb-4 relative z-10">
                                            {[...Array(review.rating)].map((_, i) => (
                                                <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                                            ))}
                                        </div>
                                        <p className="text-gray-600 font-medium text-sm mb-6 leading-relaxed relative z-10 italic">"{review.text}"</p>
                                        <div className="border-t border-orange-100 pt-4">
                                            <h4 className="font-extrabold text-[#2A1D13] text-sm uppercase tracking-tight">{review.name}</h4>
                                            <p className="text-xs text-orange-600 font-semibold uppercase tracking-widest">{review.location}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Belief Section - Exact About Us Style */}
                    <section className="py-12 md:py-16 bg-[#FFFCF5]">
                        <div className="container mx-auto px-4 max-w-4xl text-center animate-fade-in-up">
                            <h2 className="text-3xl md:text-4xl font-black text-[#2A1D13] mb-6 uppercase tracking-widest">The <span className="text-orange-600">Essence</span></h2>

                            {/* Center Icon Section */}
                            <div className="relative flex justify-center items-center mb-8">
                                <div className="absolute w-24 h-[1px] bg-orange-200 left-1/2 -translate-x-[160%]" />
                                <div className="relative group">
                                    <Gem className="w-20 h-20 text-orange-600 opacity-10 absolute inset-0 -z-10 animate-pulse" />
                                    <Gem className="w-16 h-16 text-orange-600/20" />
                                    <Sparkles className="w-5 h-5 text-orange-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                                </div>
                                <div className="absolute w-24 h-[1px] bg-orange-200 left-1/2 translate-x-[60%]" />
                            </div>

                            <div className="max-w-3xl mx-auto italic text-lg md:text-2xl text-gray-700 font-semibold leading-relaxed relative">
                                <span className="text-5xl text-orange-100 absolute -top-4 -left-6 font-serif">"</span>
                                Every crystal is a gift from the earth, carrying millions of years of wisdom. When you hold a crystal, you're connecting with the very essence of our planet's healing energy.
                                <span className="text-5xl text-orange-100 absolute -bottom-10 -right-6 font-serif">"</span>
                            </div>
                        </div>
                    </section>

                    {/* FAQ Section - Exact About Us Style */}
                    <section className="py-12 md:py-16 bg-white">
                        <div className="container mx-auto px-4 max-w-3xl">
                            <div className="text-center mb-16 animate-fade-in-up">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 text-orange-600 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                                    <HelpCircle className="w-3.5 h-3.5" />
                                    <span>FAQ</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-black text-[#2A1D13] mb-2 uppercase tracking-tight">Common <span className="text-orange-600">Doubts</span></h2>
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-12 h-1 bg-orange-200 rounded-full" />
                                    <Sparkles className="w-5 h-5 text-orange-400" />
                                    <div className="w-12 h-1 bg-orange-200 rounded-full" />
                                </div>
                            </div>

                            <div className="space-y-4">
                                {FAQS.map((faq, i) => (
                                    <div key={i} className="border-2 border-orange-50 rounded-2xl overflow-hidden hover:border-orange-200 transition-all">
                                        <button
                                            onClick={() => setSelectedFaq(selectedFaq === i ? null : i)}
                                            className="w-full px-8 py-6 flex items-center justify-between text-left bg-[#FFFDF7]"
                                        >
                                            <span className="font-extrabold text-[#2A1D13] text-sm md:text-base uppercase tracking-tight">Q. {faq.q}</span>
                                            <HelpCircle className={`w-5 h-5 transition-transform duration-300 ${selectedFaq === i ? 'rotate-180 text-orange-600' : 'text-gray-400'}`} />
                                        </button>
                                        <div
                                            className={`bg-white transition-all duration-300 ease-in-out overflow-hidden ${selectedFaq === i ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
                                        >
                                            <p className="px-8 pb-8 pt-2 text-gray-600 font-medium leading-relaxed border-t border-orange-50">A. {faq.a}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Final CTA - Exact About Us Style */}
                    <section className="py-12 md:py-16 bg-white border-t border-orange-50">
                        <div className="container mx-auto px-4 text-center max-w-5xl animate-fade-in-up">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2A1B13] mb-4 tracking-tight uppercase">Begin Your <span className="text-[#E8453C]">Crystal Journey</span> Today</h2>
                            <div className="flex items-center justify-center gap-3 mb-8">
                                <div className="w-10 h-[1.5px] bg-orange-200" />
                                <Sparkles className="w-5 h-5 text-orange-400" />
                                <div className="w-10 h-[1.5px] bg-orange-200" />
                            </div>
                            <p className="text-gray-600 mb-10 text-sm md:text-base font-medium max-w-2xl mx-auto leading-relaxed">
                                Join thousands who have discovered the transformative power of crystal healing and Vedic wisdom.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <Link to="/shop/crystals">
                                    <button className="group relative bg-[#E8453C] hover:bg-black text-white px-8 py-4 rounded-none font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] shadow-xl transition-all duration-300 overflow-hidden">
                                        <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                        <span className="relative flex items-center gap-2"><Gem className="w-3.5 h-3.5" /> Shop Crystals</span>
                                    </button>
                                </Link>
                                <Link to="/consultation">
                                    <button className="group relative bg-[#F59E0B] hover:bg-black text-white px-8 py-4 rounded-none font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] shadow-xl transition-all duration-300 overflow-hidden">
                                        <div className="absolute inset-0 bg-black/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                        <span className="relative flex items-center gap-2"><Phone className="w-3.5 h-3.5" /> Free Consultation</span>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </Layout>
    );
};

export default CrystalHealing;
