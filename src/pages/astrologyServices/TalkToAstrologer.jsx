import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
    Video,
    Mic,
    Search,
    Filter,
    DollarSign,
    Globe2,
    Briefcase,
    ThumbsUp,
    User,
    Mail,
    MapPin as MapPinIcon,
    Globe as GlobeIcon,
    Loader,
    Download,
    Share2,
    Star as StarIcon,
    MessageCircle,
    PhoneCall,
    VideoIcon,
    Circle,
    CheckCircle2,
    Award as AwardIcon,
    GraduationCap,
    Languages,
    Wallet,
    Clock as ClockIcon,
    ChevronDown,
    X
} from "lucide-react";
import { usePageBanner } from "@/hooks/usePageBanner";
import { BACKEND_URL } from "@/config/apiConfig";
import { Layout } from '@/components/layout/Layout';

// Import Astrologer Images from assets
import rajSharmaImg from "../../assets/astrologors/PanditRajeshSharma.webp";
import acharyaPriyaImg from "../../assets/astrologors/DrPriyaMishra.webp";
import sureshKumarImg from "../../assets/astrologors/PanditSureshPandey.webp";
import lakshmiDeviImg from "../../assets/astrologors/AcharyaVikramJoshi.webp";

const TalkToAstrologer = () => {
    const navigate = useNavigate();
    const banner = usePageBanner({ pollingInterval: 3000 });
    const bannerImage = banner?.imageUrl ? (banner.imageUrl.startsWith('http') ? banner.imageUrl : `${BACKEND_URL}${banner.imageUrl}`) : null;

    const [selectedFaq, setSelectedFaq] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        language: 'all',
        skill: 'all',
        experience: 'all',
        priceRange: 'all',
        rating: 'all',
        online: false
    });
    const [selectedAstrologer, setSelectedAstrologer] = useState(null);

    // Sample Astrologers Data
    const astrologers = [
        {
            id: 1,
            name: "Pandit Raj Sharma",
            photo: rajSharmaImg,
            rating: 4.8,
            reviews: 124,
            skills: ["Vedic Astrology", "Tarot", "Numerology"],
            experience: 12,
            languages: ["Hindi", "English", "Sanskrit"],
            pricePerMin: 25,
            status: "online",
            about: "Expert in Vedic astrology with 12+ years of experience. Specialized in career predictions and marriage matching.",
            education: "Jyotish Acharya from Sampurnanand Sanskrit University",
            specialization: ["Career", "Marriage", "Finance", "Health"]
        },
        {
            id: 2,
            name: "Acharya Priya",
            photo: acharyaPriyaImg,
            rating: 4.9,
            reviews: 256,
            skills: ["Numerology", "Tarot", "Vastu"],
            experience: 15,
            languages: ["Hindi", "English", "Punjabi"],
            pricePerMin: 35,
            status: "busy",
            about: "Renowned numerologist and tarot reader. Helped thousands with relationship and career guidance.",
            education: "Certified Numerologist, Tarot Master",
            specialization: ["Relationships", "Career", "Business", "Spiritual"]
        },
        {
            id: 3,
            name: "Dr. Suresh Kumar",
            photo: sureshKumarImg,
            rating: 4.7,
            reviews: 89,
            skills: ["Vedic Astrology", "Palmistry", "Gemology"],
            experience: 20,
            languages: ["Hindi", "English", "Telugu"],
            pricePerMin: 45,
            status: "online",
            about: "PhD in Vedic Astrology, specialized in gemstone recommendations and planetary remedies.",
            education: "PhD in Vedic Astrology, Certified Palmist",
            specialization: ["Gemstones", "Remedies", "Health", "Wealth"]
        },
        {
            id: 4,
            name: "Maa Lakshmi Devi",
            photo: lakshmiDeviImg,
            rating: 5.0,
            reviews: 312,
            skills: ["Tarot", "Reiki Healing", "Angel Cards"],
            experience: 8,
            languages: ["Hindi", "English", "Bengali"],
            pricePerMin: 30,
            status: "offline",
            about: "Spiritual healer and tarot card reader. Expert in emotional healing and relationship advice.",
            education: "Certified Tarot Master, Reiki Grand Master",
            specialization: ["Emotional Healing", "Relationships", "Spiritual", "Family"]
        }
    ];

    // Filter options
    const languages = ["Hindi", "English", "Sanskrit", "Tamil", "Telugu", "Bengali", "Punjabi", "Gujarati"];
    const skills = ["Vedic Astrology", "Numerology", "Tarot", "Palmistry", "Vastu", "Reiki Healing", "Gemology", "Nadi Astrology"];
    const experienceLevels = ["0-5 years", "5-10 years", "10-15 years", "15+ years"];
    const priceRanges = ["Under ₹20/min", "₹20-30/min", "₹30-40/min", "₹40-50/min", "Above ₹50/min"];
    const ratings = ["4.5+", "4.0+", "3.5+", "3.0+"];

    const getStatusColor = (status) => {
        switch (status) {
            case 'online': return 'text-green-600 bg-green-50 border-green-200';
            case 'busy': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
            case 'offline': return 'text-gray-600 bg-gray-50 border-gray-200';
            default: return 'text-gray-600 bg-gray-50 border-gray-200';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'online': return <Circle className="w-3 h-3 fill-green-500 text-green-500" />;
            case 'busy': return <Circle className="w-3 h-3 fill-yellow-500 text-yellow-500" />;
            case 'offline': return <Circle className="w-3 h-3 fill-gray-400 text-gray-400" />;
            default: return <Circle className="w-3 h-3 fill-gray-400 text-gray-400" />;
        }
    };

    const FAQS = [
        {
            q: "How does talk to astrologer work?",
            a: "Simply choose an astrologer, select chat or call option, and get connected instantly. You can discuss your problems and get personalized guidance."
        },
        {
            q: "Is consultation private?",
            a: "Yes, all consultations are completely private and confidential. Your conversations are encrypted and never shared with third parties."
        },
        {
            q: "How much does it cost?",
            a: "Prices vary by astrologer, typically ranging from ₹10 to ₹50 per minute. You only pay for the time you use, and the first 2 minutes are free with every astrologer."
        },
        {
            q: "Can I switch between chat and call?",
            a: "Yes, you can seamlessly switch between chat and call during your consultation based on your preference and comfort."
        },
        {
            q: "What if I'm not satisfied?",
            a: "We offer a satisfaction guarantee. If you're not happy with your consultation, we'll refund your money or provide a free consultation with another astrologer."
        }
    ];

    return (
        <Layout>
            <div className="min-h-[80vh]">
                <div className="min-h-screen bg-background">
                    {/* Hero Section - Exact About Us Style */}
                    <section className="relative h-[320px] sm:h-[320px] md:h-[360px] lg:h-[370px] flex items-center py-[20px] text-white overflow-hidden">
                        <div className="absolute inset-0">
                            <img src={bannerImage} alt="Astrologer Background" className="w-full h-full object-cover object-top" />
                            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
                            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,rgba(217,119,6,0.2),transparent_50%)]" />
                        </div>
                        <div className="container mx-auto px-4 relative z-10 w-full animate-fade-in-up">
                            <div className="max-w-4xl mx-auto text-center">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 mb-2 md:mb-8 shadow-2xl">
                                    <Award className="w-4 h-4 text-[#FFC107]" />
                                    <span className="text-[#FFC107] text-xs md:text-sm font-black uppercase tracking-widest">{banner.badge || "DIVINE SERVICES HUB"}</span>
                                </div>

                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-6 leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)] uppercase">
                                    {banner.titleHighlight1} {banner.titleEnd} <br />
                                    <span className="text-yellow-300">{banner.titleHighlight2} {banner.titleHighlight3}</span>
                                </h1>

                                <p className="text-lg md:text-xl text-amber-100 leading-relaxed font-medium max-w-2xl mx-auto mb-4 md:mb-7 drop-shadow">
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
                                                            const el = document.getElementById(btn.link.substring(1));
                                                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                                                        } else if (btn.link?.startsWith('http')) {
                                                            window.location.href = btn.link;
                                                        } else if (btn.link) {
                                                            navigate(btn.link);
                                                        }
                                                    }}
                                                    className={`group relative ${idx === 0 ? 'bg-[#E8453C] hover:bg-[#CC3B34]' : 'bg-[#2A1D13]/80 backdrop-blur-md border border-white/20 hover:bg-[#2A1D13] hidden md:flex'} text-white px-10 py-4 font-black text-xs md:text-sm uppercase tracking-[0.2em] shadow-2xl transition-all duration-300 overflow-hidden rounded-none`}
                                                >
                                                    <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                                    <span className="relative flex items-center gap-2 font-black">
                                                        {idx === 0 ? <MessageCircle className="w-5 h-5" /> : <Phone className="w-5 h-5 text-yellow-300" />} {btn.text}
                                                    </span>
                                                </button>
                                            )
                                        ))
                                    ) : (
                                        <>
                                            <Link to="/chat">
                                                <button className="group relative bg-[#E8453C] hover:bg-[#CC3B34] text-white px-10 py-4 font-black text-xs md:text-sm uppercase tracking-[0.2em] shadow-2xl transition-all duration-300 overflow-hidden rounded-none">
                                                    <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                                    <span className="relative flex items-center gap-2 font-black"><MessageCircle className="w-5 h-5" /> Chat Now</span>
                                                </button>
                                            </Link>
                                            <Link to="/call" className="hidden md:block">
                                                <button className="group relative bg-[#2A1D13]/80 backdrop-blur-md border border-white/20 hover:bg-[#2A1D13] text-white px-10 py-4 font-black text-xs md:text-sm uppercase tracking-[0.2em] shadow-2xl transition-all duration-300 rounded-none w-full">
                                                    <span className="relative flex items-center gap-2 font-black"><Phone className="w-5 h-5 text-yellow-300" /> Call Expert</span>
                                                </button>
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Intro & Filters Section - Sacred Journey Style from Puja Page */}
                    <section className="py-12 md:py-16 overflow-x-hidden relative bg-[#FAF9F6]">
                        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-orange-100/30 rounded-full blur-3xl -z-10" />
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #d97706 1px, transparent 0)', backgroundSize: '32px 32px' }} />

                        <div className="container mx-auto px-4 max-w-7xl relative z-10">
                            <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
                                {/* Left Content: Intro text matching Puja section layout but with Astrology content */}
                                <div className="lg:col-span-2 animate-fade-in-left">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-[11px] font-bold uppercase tracking-wider mb-5">
                                        <Sparkles className="w-3.5 h-3.5" />
                                        <span>Divine Guidance</span>
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 leading-tight">
                                        The Wisdom of <br /><span className="text-orange-600">Celestial Stars</span>
                                    </h2>
                                    <div className="flex items-center gap-2 mb-6">
                                        <div className="w-12 h-1 bg-orange-200 rounded-full" />
                                        <Sparkles className="w-5 h-5 text-orange-400" />
                                        <div className="w-12 h-1 bg-orange-200 rounded-full" />
                                    </div>
                                    <p className="text-gray-700 font-medium text-sm md:text-base leading-relaxed mb-6">
                                        Astrology is more than just predictions; it's a map of your soul's journey. Our verified experts help you navigate life's challenges with ancient Vedic wisdom.
                                    </p>
                                    <div className="grid grid-cols-2 gap-3 mb-8">
                                        {['Lal Kitab Remedies', 'Career Clarity', 'Marriage Matching', 'Pitra Dosh Puja'].map((item) => (
                                            <div key={item} className="flex items-center gap-2.5">
                                                <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                                                    <CheckCircle className="w-3.5 h-3.5 text-orange-600" />
                                                </div>
                                                <span className="text-sm font-bold text-gray-800">{item}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Small Achievement Box matching Puja style */}
                                    <div className="bg-white p-4 rounded-2xl shadow-xl border border-amber-100 flex items-center gap-4 inline-flex">
                                        <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center border border-amber-200">
                                            <Shield className="w-6 h-6 text-amber-600" />
                                        </div>
                                        <div className="text-xs font-bold text-gray-800 uppercase tracking-wide">
                                            100% Confidential<br /><span className="text-amber-600">& Secure Calls</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Content: Filters matching Puja's boxy/clean style */}
                                <div className="lg:col-span-3 animate-fade-in-right">
                                    <div className="bg-white p-6 md:p-8 border-2 border-orange-100 shadow-[0_20px_50px_-15px_rgba(217,119,6,0.15)] relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 w-2 h-0 group-hover:h-full bg-orange-500 transition-all duration-500" />

                                        <h3 className="text-xl font-black text-[#2A1D13] mb-6 uppercase tracking-tight flex items-center gap-2">
                                            <Filter className="w-5 h-5 text-orange-600" /> Filter <span className="text-orange-600">Results</span>
                                        </h3>

                                        {/* Search Bar */}
                                        <div className="relative mb-8">
                                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-400" />
                                            <input
                                                type="text"
                                                placeholder="Search by name or specialty..."
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                className="w-full bg-white border border-gray-400 px-12 py-4 font-bold text-[#4A3427] focus:border-orange-500 outline-none transition-all placeholder:text-gray-300 rounded-none shadow-sm"
                                            />
                                        </div>

                                        {/* Filters Grid */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                            <div>
                                                <label className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em] pl-1 mb-1.5 block">Language</label>
                                                <select
                                                    className="w-full bg-white border border-gray-400 px-4 py-3 font-normal text-[#4A3427] focus:border-orange-500 outline-none rounded-none shadow-sm appearance-none"
                                                    value={filters.language}
                                                    onChange={(e) => setFilters({ ...filters, language: e.target.value })}
                                                >
                                                    <option value="all">All Languages</option>
                                                    {languages.map(lang => <option key={lang} value={lang}>{lang}</option>)}
                                                </select>
                                            </div>

                                            <div>
                                                <label className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em] pl-1 mb-1.5 block">Skills</label>
                                                <select
                                                    className="w-full bg-white border border-gray-400 px-4 py-3 font-normal text-[#4A3427] focus:border-orange-500 outline-none rounded-none shadow-sm appearance-none"
                                                    value={filters.skill}
                                                    onChange={(e) => setFilters({ ...filters, skill: e.target.value })}
                                                >
                                                    <option value="all">All Skills</option>
                                                    {skills.map(skill => <option key={skill} value={skill}>{skill}</option>)}
                                                </select>
                                            </div>

                                            <div>
                                                <label className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em] pl-1 mb-1.5 block">Experience</label>
                                                <select
                                                    className="w-full bg-white border border-gray-400 px-4 py-3 font-normal text-[#4A3427] focus:border-orange-500 outline-none rounded-none shadow-sm appearance-none"
                                                    value={filters.experience}
                                                    onChange={(e) => setFilters({ ...filters, experience: e.target.value })}
                                                >
                                                    <option value="all">Any Experience</option>
                                                    {experienceLevels.map(exp => <option key={exp} value={exp}>{exp}</option>)}
                                                </select>
                                            </div>

                                            <div>
                                                <label className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em] pl-1 mb-1.5 block">Price/min</label>
                                                <select
                                                    className="w-full bg-white border border-gray-400 px-4 py-3 font-normal text-[#4A3427] focus:border-orange-500 outline-none rounded-none shadow-sm appearance-none"
                                                    value={filters.priceRange}
                                                    onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                                                >
                                                    <option value="all">Any Price</option>
                                                    {priceRanges.map(price => <option key={price} value={price}>{price}</option>)}
                                                </select>
                                            </div>

                                            <div>
                                                <label className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em] pl-1 mb-1.5 block">Rating</label>
                                                <select
                                                    className="w-full bg-white border border-gray-400 px-4 py-3 font-normal text-[#4A3427] focus:border-orange-500 outline-none rounded-none shadow-sm appearance-none"
                                                    value={filters.rating}
                                                    onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
                                                >
                                                    <option value="all">Any Rating</option>
                                                    {ratings.map(rating => <option key={rating} value={rating}>{rating}</option>)}
                                                </select>
                                            </div>

                                            <div className="flex items-end pb-1 text-center">
                                                <label className="flex items-center gap-3 cursor-pointer w-full justify-center">
                                                    <input
                                                        type="checkbox"
                                                        checked={filters.online}
                                                        onChange={(e) => setFilters({ ...filters, online: e.target.checked })}
                                                        className="w-4 h-4 text-orange-600 rounded-none border-gray-400 focus:ring-orange-500"
                                                    />
                                                    <span className="text-xs font-black text-[#2A1D13] uppercase tracking-wider">Online Now Only</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Astrologer Cards Grid - Matching Puja's Offering Style */}
                    <section className="py-12 md:py-16 bg-white relative overflow-hidden">
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #d97706 1px, transparent 0)', backgroundSize: '32px 32px' }} />
                        <div className="container mx-auto px-4 max-w-7xl relative z-10">
                            <div className="text-center mb-16 animate-fade-in-up">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 text-orange-600 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                                    <Star className="w-3.5 h-3.5" />
                                    <span>Verified Specialists</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 uppercase">Expert <span className="text-orange-600">Astrologers</span></h2>
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-12 h-1 bg-orange-200 rounded-full" />
                                    <Sparkles className="w-5 h-5 text-orange-400" />
                                    <div className="w-12 h-1 bg-orange-200 rounded-full" />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 xl:gap-8 max-w-[85rem] mx-auto">
                                {astrologers.map((astrologer, idx) => (
                                    <div
                                        key={astrologer.id}
                                        className="group/card h-full animate-fade-in-up"
                                        style={{ animationDelay: `${idx * 0.1}s`, animationFillMode: 'both' }}
                                    >
                                        <div className="relative h-full p-[1.5px] rounded-3xl bg-amber-400/40 hover:bg-amber-500 transition-all duration-700 shadow-xl flex flex-col">
                                            <div className="relative flex-grow bg-[#FCFBF7] rounded-[1.4rem] overflow-hidden flex flex-col group-hover/card:bg-white transition-all duration-500">
                                                <div className="absolute top-0 right-0 w-48 h-48 bg-amber-100/40 rounded-full blur-[80px] -mr-24 -mt-24" />

                                                {/* Image Area with Badge - Height reduced */}
                                                <div className="relative m-2 mb-2 rounded-2xl overflow-hidden shadow-lg h-44 z-10 flex items-center justify-center bg-amber-50 group-hover/card:bg-white transition-all duration-500">
                                                    <img
                                                        src={astrologer.photo}
                                                        alt={astrologer.name}
                                                        className="absolute inset-0 w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-[1.5s]"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A130F]/50 via-transparent to-transparent opacity-60" />

                                                    {/* Status Badge - Matching Puja Theme */}
                                                    <div className={`absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded-full border shadow-lg backdrop-blur-md z-20 ${astrologer.status === 'online' ? 'bg-green-500/20 border-green-400/30 text-green-100' :
                                                        astrologer.status === 'busy' ? 'bg-orange-500/20 border-orange-400/30 text-orange-200' :
                                                            'bg-gray-500/20 border-gray-400/30 text-gray-300'
                                                        }`}>
                                                        <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${astrologer.status === 'online' ? 'bg-green-400' :
                                                            astrologer.status === 'busy' ? 'bg-orange-400' :
                                                                'bg-gray-400'
                                                            }`} />
                                                        <span className="text-[9px] font-black uppercase tracking-widest">{astrologer.status}</span>
                                                    </div>
                                                </div>

                                                <div className="flex flex-col flex-grow px-3 pb-3 text-center relative z-20">
                                                    <h3 className="text-base md:text-lg font-black text-[#2A1D13] mb-1 tracking-tight uppercase transition-colors group-hover/card:text-amber-600">
                                                        {astrologer.name}
                                                    </h3>
                                                    <div className="flex items-center justify-center gap-1.5 mb-2">
                                                        <div className="h-[1px] w-8 bg-gradient-to-r from-transparent via-amber-200 to-amber-500" />
                                                        <Sparkle className="w-3.5 h-3.5 text-amber-500 fill-amber-500/10" />
                                                        <div className="h-[1px] w-8 bg-gradient-to-l from-transparent via-amber-200 to-amber-500" />
                                                    </div>

                                                    <div className="flex items-center justify-center gap-1 mb-2">
                                                        {[1, 2, 3, 4, 5].map(i => (
                                                            <Star key={i} className={`w-3 h-3 ${i <= Math.floor(astrologer.rating) ? 'fill-amber-500 text-amber-500' : 'text-gray-300'}`} />
                                                        ))}
                                                        <span className="text-[10px] font-black text-[#4A3427] ml-1">{astrologer.rating}</span>
                                                    </div>

                                                    <ul className="space-y-1.5 mb-3 text-left">
                                                        <li className="flex items-center gap-2">
                                                            <div className="w-5 h-5 rounded-lg bg-orange-50 flex items-center justify-center flex-shrink-0 group-hover/card:bg-orange-600 transition-all duration-300">
                                                                <Briefcase className="w-3 h-3 text-orange-600 group-hover/card:text-white" />
                                                            </div>
                                                            <span className="text-[11px] font-bold text-[#4A3427]/80 group-hover/card:text-[#2A1D13]">{astrologer.experience} Years Exp.</span>
                                                        </li>
                                                        <li className="flex items-center gap-2">
                                                            <div className="w-5 h-5 rounded-lg bg-orange-50 flex items-center justify-center flex-shrink-0 group-hover/card:bg-orange-600 transition-all duration-300">
                                                                <Languages className="w-3 h-3 text-orange-600 group-hover/card:text-white" />
                                                            </div>
                                                            <span className="text-[11px] font-bold text-[#4A3427]/80 group-hover/card:text-[#2A1D13] line-clamp-1">{astrologer.languages.join(', ')}</span>
                                                        </li>
                                                        <li className="flex items-center gap-2">
                                                            <div className="w-5 h-5 rounded-lg bg-orange-50 flex items-center justify-center flex-shrink-0 group-hover/card:bg-orange-600 transition-all duration-300">
                                                                <Wallet className="w-3 h-3 text-orange-600 group-hover/card:text-white" />
                                                            </div>
                                                            <span className="text-[11px] font-bold text-[#4A3427]/80 group-hover/card:text-[#2A1D13]">₹{astrologer.pricePerMin}/min</span>
                                                        </li>
                                                    </ul>

                                                    <div className="mt-auto grid grid-cols-2 gap-2">
                                                        <Link to={`/chat/${astrologer.id}`} className="w-full">
                                                            <button className="group/btn relative w-full inline-flex items-center justify-center gap-1 px-2 py-2 bg-[#2A1D13] text-amber-400 rounded-xl font-black text-[9px] uppercase tracking-[0.1em] transition-all duration-500 hover:bg-orange-600 hover:text-white shadow-lg">
                                                                <MessageCircle className="w-3.5 h-3.5" />
                                                                <span>Chat</span>
                                                            </button>
                                                        </Link>
                                                        <Link to={`/call/${astrologer.id}`} className="w-full">
                                                            <button className="group/btn relative w-full inline-flex items-center justify-center gap-1 px-2 py-2 bg-[#E8453C] text-white rounded-xl font-black text-[9px] uppercase tracking-[0.1em] transition-all duration-500 hover:bg-black shadow-lg">
                                                                <Phone className="w-3.5 h-3.5" />
                                                                <span>Call</span>
                                                            </button>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Why Consult Us - Boxy Style matching Puja page */}
                    <section className="py-12 md:py-16 bg-[#FFFDF7] relative overflow-hidden">
                        <div className="container mx-auto px-4 max-w-7xl relative z-10">
                            <div className="text-center mb-16 animate-fade-in-up">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 text-orange-600 rounded-full text-[10px] font-extrabold uppercase tracking-[0.2em] mb-4">
                                    <Shield className="w-3.5 h-3.5" />
                                    <span>The Standard of Trust</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6 uppercase">Why Consult Our <span className="text-orange-600">Experts</span></h2>
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-12 h-1 bg-orange-200 rounded-full" /><Sparkles className="w-5 h-5 text-orange-400" /><div className="w-12 h-1 bg-orange-200 rounded-full" />
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                                {[
                                    { icon: Shield, title: "Verified Experts", desc: "Every astrologer goes through a 4-step manual verification process." },
                                    { icon: CheckCircle, title: "Confidentiality", desc: "Your identity and conversations are 100% private and secure." },
                                    { icon: Clock, title: "24/7 Availability", desc: "Connect with top specialists anytime, anywhere in the world." },
                                    { icon: Heart, title: "Empathetic Guidance", desc: "Our experts listen with compassion and guide with sincerity." },
                                    { icon: Sparkles, title: "Authentic Remedies", desc: "Remedies based on pure Vedic and Lal Kitab traditions." },
                                    { icon: Users, title: "Trusted Community", desc: "Join millions who trust us for their life's big decisions." }
                                ].map((item, idx) => (
                                    <div key={idx} className="group bg-white p-5 md:p-6 transition-all duration-500 border-2 border-orange-100 flex items-start gap-4 md:gap-5 rounded-none relative overflow-hidden hover:shadow-[0_20px_40px_-15px_rgba(255,165,0,0.15)] animate-fade-in-up" style={{ animationDelay: `${idx * 0.1}s`, animationFillMode: 'both' }}>
                                        <div className="absolute top-0 right-0 w-2 h-0 group-hover:h-full bg-orange-500 transition-all duration-500" />
                                        <div className="w-16 h-16 bg-orange-50 flex items-center justify-center flex-shrink-0 group-hover:bg-orange-600 transition-all duration-500">
                                            <item.icon className="w-8 h-8 text-orange-600 group-hover:text-white transition-all" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-extrabold text-[#4A3427] mb-2 leading-tight group-hover:text-orange-600 transition-colors uppercase tracking-tight">{item.title}</h3>
                                            <p className="text-gray-500 text-sm font-semibold leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Testimonials - Deeply Styled from Puja Page */}
                    <section className="py-12 md:py-16 bg-white relative overflow-hidden">
                        <div className="container mx-auto px-4 max-w-7xl relative z-10">
                            <div className="text-center mb-16 animate-fade-in-up">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-50 text-green-700 rounded-full text-[10px] font-extrabold uppercase tracking-[0.2em] mb-4">
                                    <ThumbsUp className="w-3.5 h-3.5 fill-green-700" />
                                    <span>Devotee Experiences</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-black text-[#4A3427] mb-6 uppercase">What Our <span className="text-orange-600">Seekers Say</span></h2>
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-12 h-1 bg-orange-200 rounded-full" /><Sparkles className="w-5 h-5 text-orange-400" /><div className="w-12 h-1 bg-orange-200 rounded-full" />
                                </div>
                                <div className="mt-8 flex items-center justify-center gap-6">
                                    <div className="text-5xl font-black text-[#2A1D13] tracking-tighter">4.9<span className="text-orange-600 text-2xl">/5</span></div>
                                    <div className="h-10 w-px bg-orange-200" />
                                    <div className="text-left">
                                        <div className="flex gap-0.5 mb-1">
                                            {[1, 2, 3, 4, 5].map(i => <StarIcon key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />)}
                                        </div>
                                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">10,000+ Happy Consultations</p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
                                {[
                                    { name: "Rohit Sharma", text: "Pandit Raj Sharma's predictions were very accurate. He guided me through a difficult career phase and now I'm in a much better position.", location: "Delhi, India" },
                                    { name: "Priya Singh", text: "Acharya Priya helped me with my marriage problems. Her tarot reading was spot on and the remedies really worked. Highly recommended!", location: "Mumbai, India" },
                                    { name: "Amit Patel", text: "Very professional and knowledgeable. Dr. Suresh explained everything in detail and gave practical remedies that are easy to follow.", location: "USA" }
                                ].map((review, idx) => (
                                    <div
                                        key={idx}
                                        className="bg-[#FFFDF7] p-6 md:p-8 border border-orange-100 shadow-xl rounded-2xl relative hover:border-orange-400 transition-all group animate-fade-in-up"
                                        style={{ animationDelay: `${idx * 0.1}s`, animationFillMode: 'both' }}
                                    >
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


                    {/* FAQ Section - Refined with Puja styling */}
                    <section className="py-12 md:py-16 bg-[#FAF9F6] relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-100/20 rounded-full blur-3xl -z-10" />
                        <div className="container mx-auto px-4 max-w-3xl relative z-10">
                            <div className="text-center mb-16 animate-fade-in-up">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 text-orange-600 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                                    <HelpCircle className="w-3.5 h-3.5" />
                                    <span>Knowledge Hub</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-black text-[#2A1D13] mb-4 uppercase tracking-tighter">Common <span className="text-orange-600">Queries</span></h2>
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-12 h-1 bg-orange-200 rounded-full" /><Sparkles className="w-5 h-5 text-orange-400" /><div className="w-12 h-1 bg-orange-200 rounded-full" />
                                </div>
                            </div>

                            <div className="space-y-4">
                                {FAQS.map((faq, i) => (
                                    <div key={i} className="bg-white border-2 border-orange-50 hover:border-orange-200 transition-all shadow-sm rounded-none overflow-hidden">
                                        <button
                                            onClick={() => setSelectedFaq(selectedFaq === i ? null : i)}
                                            className="w-full px-6 md:px-8 py-5 md:py-6 flex items-center justify-between text-left"
                                        >
                                            <span className="font-extrabold text-[#2A1D13] text-sm md:text-base uppercase tracking-tight">Q. {faq.q}</span>
                                            <div className={`p-1.5 rounded-lg transition-colors ${selectedFaq === i ? 'bg-orange-600 text-white' : 'bg-orange-50 text-orange-400'}`}>
                                                <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${selectedFaq === i ? 'rotate-90' : ''}`} />
                                            </div>
                                        </button>
                                        <div
                                            className={`bg-white transition-all duration-300 ease-in-out overflow-hidden ${selectedFaq === i ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
                                        >
                                            <div className="px-6 md:px-8 pb-6 md:pb-8 pt-0 border-t border-orange-50">
                                                <p className="text-gray-600 font-medium text-sm md:text-base leading-relaxed mt-4">A. {faq.a}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Final CTA Section - Exact Puja Page Style */}
                    <section className="py-12 md:py-16 bg-white border-t border-orange-50">
                        <div className="container mx-auto px-4 text-center max-w-5xl animate-fade-in-up">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2A1B13] mb-6 uppercase tracking-tight">
                                Illuminate Your <br /><span className="text-[#E8453C]">Pathway</span> Today
                            </h2>
                            <div className="flex items-center justify-center gap-3 mb-10">
                                <div className="w-14 h-[2px] bg-orange-200" />
                                <Sparkles className="w-6 h-6 text-orange-400" />
                                <div className="w-14 h-[2px] bg-orange-200" />
                            </div>
                            <p className="text-gray-600 mb-12 text-base md:text-lg font-medium max-w-2xl mx-auto leading-relaxed">
                                Don't leave your future to chance. Consult our verified Vedic experts for clarity and ancient remedies that work.
                            </p>
                            <div className="flex flex-wrap justify-center gap-5">
                                <Link to="/chat">
                                    <button className="group relative bg-[#E8453C] hover:bg-black text-white px-10 py-5 rounded-none font-black text-xs md:text-sm uppercase tracking-[0.3em] shadow-2xl transition-all duration-300 overflow-hidden">
                                        <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                        <span className="relative flex items-center gap-2"><MessageCircle className="w-4 h-4" /> Start Live Chat</span>
                                    </button>
                                </Link>
                                <Link to="/call">
                                    <button className="group relative bg-[#F59E0B] hover:bg-black text-white px-10 py-5 rounded-none font-black text-xs md:text-sm uppercase tracking-[0.3em] shadow-2xl transition-all duration-300 overflow-hidden">
                                        <div className="absolute inset-0 bg-black/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                        <span className="relative flex items-center gap-2"><Phone className="w-4 h-4" /> Call Astrologer</span>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            {/* Astrologer Profile Modal */}
            {selectedAstrologer && (
                <div
                    className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in"
                    onClick={() => setSelectedAstrologer(null)}
                >
                    <div
                        className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setSelectedAstrologer(null)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-orange-600 transition-colors z-10"
                        >
                            <X size={24} />
                        </button>
                        {/* Profile content would go here */}
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default TalkToAstrologer;
