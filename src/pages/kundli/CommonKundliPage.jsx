import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
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
    Sun,
    Moon,
    Sunrise,
    Sunset,
    AlertTriangle,
    Gem,
    Compass,
    User,
    Mail,
    MapPin as MapPinIcon,
    Globe as GlobeIcon,
    Loader,
    Download,
    Share2,
    ChevronDown
} from "lucide-react";
import { usePageBanner } from "@/hooks/usePageBanner";
import { BACKEND_URL } from "@/config/apiConfig";
import { Layout } from '@/components/layout/Layout';
import { useGetKundliPageBySlugQuery } from '@/services/kundliContentApi';
import SEO from '@/components/layout/SEO';

const CommonKundliPage = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const banner = usePageBanner({ pollingInterval: 3000 });
    const { data: pageData, isLoading, isError } = useGetKundliPageBySlugQuery(slug);

    const bannerImage = banner?.imageUrl ? (banner.imageUrl.startsWith('http') ? banner.imageUrl : `${BACKEND_URL}${banner.imageUrl}`) : null;

    const [formData, setFormData] = useState({
        name: '',
        gender: 'male',
        dob: '',
        time: '',
        place: '',
        language: 'hindi'
    });
    const [isGenerating, setIsGenerating] = useState(false);
    const [kundliGenerated, setKundliGenerated] = useState(false);
    const [selectedFaq, setSelectedFaq] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleGenerateKundli = (e) => {
        e.preventDefault();
        setIsGenerating(true);

        // Simulate API call
        setTimeout(() => {
            setIsGenerating(false);
            setKundliGenerated(true);
            // Scroll to chart
            const chartSection = document.getElementById('kundli-results');
            if (chartSection) {
                chartSection.scrollIntoView({ behavior: 'smooth' });
            }
        }, 2000);
    };

    // Sample Kundli Data (would come from API)
    const kundliData = {
        planets: [
            { name: 'Sun', sign: 'Leo', house: 5, degree: '12° 34\'', retrograde: false },
            { name: 'Moon', sign: 'Taurus', house: 2, degree: '8° 21\'', retrograde: false },
            { name: 'Mars', sign: 'Aries', house: 1, degree: '3° 45\'', retrograde: false },
            { name: 'Mercury', sign: 'Virgo', house: 6, degree: '18° 12\'', retrograde: true },
            { name: 'Jupiter', sign: 'Sagittarius', house: 9, degree: '22° 08\'', retrograde: false },
            { name: 'Venus', sign: 'Libra', house: 7, degree: '14° 30\'', retrograde: false },
            { name: 'Saturn', sign: 'Capricorn', house: 10, degree: '5° 17\'', retrograde: true },
            { name: 'Rahu', sign: 'Gemini', house: 3, degree: '19° 45\'', retrograde: true },
            { name: 'Ketu', sign: 'Sagittarius', house: 9, degree: '19° 45\'', retrograde: true }
        ],
        doshas: [
            { name: 'Manglik Dosha', present: true, severity: 'moderate', remedy: 'Perform Mangal Shanti Puja on Tuesday' },
            { name: 'Kaal Sarp Dosha', present: false, severity: 'none', remedy: '' },
            { name: 'Shani Sade Sati', present: true, severity: 'mild', remedy: 'Chant Shani Chalisa on Saturdays' },
            { name: 'Pitru Dosha', present: false, severity: 'none', remedy: '' }
        ],
        remedies: [
            'Chant Hanuman Chalisa daily for strength and protection',
            'Wear a Red Coral gemstone after consultation',
            'Perform Mangal Shanti Puja on Tuesdays',
            'Donate red items on Tuesdays to appease Mars',
            'Chant Shani Chalisa on Saturdays'
        ]
    };

    const FAQS_FALLBACK = [
        {
            q: "What is Janam Kundli?",
            a: "Janam Kundli is a birth chart based on Vedic astrology that maps the positions of planets at your exact time and place of birth. It reveals your life's path, strengths, challenges, and karmic patterns."
        },
        {
            q: "Is it really free?",
            a: "Yes, basic Janam Kundli generation is completely free. You can see your planet positions, houses, and basic dosha analysis at no cost."
        },
        {
            q: "Do I need exact birth time?",
            a: "For accurate Kundli analysis, exact birth time is essential. If you don't have it, we can still generate a basic chart but predictions may be less accurate."
        },
        {
            q: "How accurate is the analysis?",
            a: "We use precise Vedic calculations followed by traditional astrologers. Our system provides accurate planet positions, but for detailed life predictions, we recommend consulting our expert astrologers."
        }
    ];

    // North Indian Chart Layout
    const renderNorthIndianChart = () => {
        return (
            <div className="grid grid-cols-3 gap-1 max-w-md mx-auto">
                {/* Row 1 */}
                <div className="bg-orange-50 p-4 text-center border-2 border-orange-200 rounded-tl-xl">
                    <div className="font-bold text-[#2A1D13] mb-2">12</div>
                    <div className="space-y-1">
                        <span className="inline-block w-2 h-2 bg-red-500 rounded-full" title="Sun"></span>
                        <span className="inline-block w-2 h-2 bg-blue-500 rounded-full" title="Moon"></span>
                    </div>
                </div>
                <div className="bg-orange-50 p-4 text-center border-2 border-orange-200">
                    <div className="font-bold text-[#2A1D13] mb-2">1</div>
                    <div className="space-y-1">
                        <span className="inline-block w-2 h-2 bg-red-500 rounded-full" title="Mars"></span>
                    </div>
                </div>
                <div className="bg-orange-50 p-4 text-center border-2 border-orange-200 rounded-tr-xl">
                    <div className="font-bold text-[#2A1D13] mb-2">2</div>
                    <div className="space-y-1">
                        <span className="inline-block w-2 h-2 bg-yellow-500 rounded-full" title="Mercury"></span>
                    </div>
                </div>

                {/* Row 2 */}
                <div className="bg-orange-50 p-4 text-center border-2 border-orange-200">
                    <div className="font-bold text-[#2A1D13] mb-2">11</div>
                    <div className="space-y-1">
                        <span className="inline-block w-2 h-2 bg-purple-500 rounded-full" title="Venus"></span>
                    </div>
                </div>
                <div className="bg-orange-50 p-4 text-center border-2 border-orange-200 relative">
                    <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-orange-300">🕉️</div>
                </div>
                <div className="bg-orange-50 p-4 text-center border-2 border-orange-200">
                    <div className="font-bold text-[#2A1D13] mb-2">3</div>
                    <div className="space-y-1">
                        <span className="inline-block w-2 h-2 bg-orange-500 rounded-full" title="Rahu"></span>
                    </div>
                </div>

                {/* Row 3 */}
                <div className="bg-orange-50 p-4 text-center border-2 border-orange-200 rounded-bl-xl">
                    <div className="font-bold text-[#2A1D13] mb-2">10</div>
                    <div className="space-y-1">
                        <span className="inline-block w-2 h-2 bg-indigo-500 rounded-full" title="Saturn"></span>
                    </div>
                </div>
                <div className="bg-orange-50 p-4 text-center border-2 border-orange-200">
                    <div className="font-bold text-[#2A1D13] mb-2">9</div>
                    <div className="space-y-1">
                        <span className="inline-block w-2 h-2 bg-green-500 rounded-full" title="Jupiter"></span>
                        <span className="inline-block w-2 h-2 bg-gray-500 rounded-full" title="Ketu"></span>
                    </div>
                </div>
                <div className="bg-orange-50 p-4 text-center border-2 border-orange-200 rounded-br-xl">
                    <div className="font-bold text-[#2A1D13] mb-2">8</div>
                    <div className="space-y-1"></div>
                </div>
            </div>
        );
    };

    if (isLoading) return <div className="min-h-screen flex items-center justify-center bg-[#FAF9F6] font-black uppercase text-[10px] tracking-widest text-orange-900 text-center">Consulting Ancient Scripts...</div>;
    if (isError || !pageData) return <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#FAF9F6] text-center"><button onClick={() => navigate('/')} className="bg-orange-600 text-white px-8 py-3 font-bold uppercase tracking-widest text-xs">Wisdom Not Found - Return Home</button></div>;

    const { hero, features, faqs } = pageData;

    return (
        <Layout>
            <SEO pageName={slug} title={`${pageData.pageName} - Online Kundli`} description={hero.subtitle} />
            <div className="min-h-[80vh]">
                <div className="min-h-screen bg-background">
                    {/* Hero Section - Exact About Us Style */}
                    <section className="relative h-[320px] sm:h-[320px] md:h-[360px] lg:h-[380px] flex items-center py-[20px] text-white overflow-hidden">
                        <div className="absolute inset-0">
                            <img src={bannerImage} alt="Kundli Background" className="w-full h-full object-cover object-top" />
                            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
                            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,rgba(217,119,6,0.2),transparent_50%)]" />
                        </div>
                        <div className="container mx-auto px-4 relative z-10 w-full animate-fade-in-up">
                            <div className="max-w-4xl mx-auto text-center">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 mb-4 md:mb-8 shadow-2xl">
                                    <Award className="w-4 h-4 text-[#FFC107]" />
                                    <span className="text-[#FFC107] text-xs md:text-sm font-black uppercase tracking-widest">{banner.badge || hero.badge || "DIVINE SERVICES HUB"}</span>
                                </div>

                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)] uppercase">
                                    {hero.title} <br />
                                    <span className="text-yellow-300">{hero.highlightedTitle}</span>
                                </h1>

                                <p className="text-lg md:text-xl text-amber-100 leading-relaxed font-bold max-w-2xl mx-auto mb-10 drop-shadow italic">
                                    {hero.subtitle}
                                </p>

                                <div className="flex flex-wrap justify-center gap-4">
                                    <button onClick={() => document.getElementById('birth-details-section')?.scrollIntoView({ behavior: 'smooth' })} className="group relative bg-[#E8453C] hover:bg-black text-white px-8 py-4 rounded-none font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] shadow-xl transition-all duration-300 overflow-hidden">
                                        <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                        <span className="relative flex items-center gap-2.5"><Zap className="w-4 h-4" /> {hero.buttonText || "Start Calculation"}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Birth Details Form Section */}
                    <section id="birth-details-section" className="py-14 md:py-16 bg-[#FAF9F6] relative overflow-hidden text-center">
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #d97706 1px, transparent 0)', backgroundSize: '32px 32px' }} />
                        <div className="container mx-auto px-4 max-w-3xl relative z-10">
                            <div className="text-center mb-8 animate-fade-in-up">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 text-orange-600 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                                    <User className="w-3.5 h-3.5" />
                                    <span>{pageData.formSection?.badge || "Enter Your Details"}</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 uppercase text-center">
                                    {pageData.formSection?.title?.split(' ').slice(0, -1).join(' ') || "Birth"} <span className="text-orange-600">{pageData.formSection?.title?.split(' ').slice(-1) || "Information"}</span>
                                </h2>
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-12 h-1 bg-orange-200 rounded-full" />
                                    <Sparkles className="w-5 h-5 text-orange-400 animate-pulse" />
                                    <div className="w-12 h-1 bg-orange-200 rounded-full" />
                                </div>
                            </div>

                            <div className="bg-white p-8 md:p-10 rounded-3xl border-2 border-orange-100 shadow-xl animate-fade-in-up text-left">
                                <form onSubmit={handleGenerateKundli} className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-bold text-[#2A1D13] mb-2">{pageData.formSection?.nameLabel || "Your Full Name"}</label>
                                        <div className="relative">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-400" />
                                            <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder={pageData.formSection?.namePlaceholder || "Enter your full name"} required className="w-full pl-12 pr-4 py-3 bg-white border-2 border-orange-100 focus:border-orange-500 outline-none transition-colors rounded-xl font-semibold text-gray-800" />
                                        </div>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-bold text-[#2A1D13] mb-2">{pageData.formSection?.dobLabel || "Date of Birth"}</label>
                                            <div className="relative">
                                                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-400" />
                                                <input type="date" name="dob" value={formData.dob} onChange={handleInputChange} required className="w-full pl-12 pr-4 py-3 bg-white border-2 border-orange-100 focus:border-orange-500 outline-none transition-colors rounded-xl font-semibold text-gray-800" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-[#2A1D13] mb-2">{pageData.formSection?.timeLabel || "Time of Birth"}</label>
                                            <div className="relative">
                                                <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-400" />
                                                <input type="time" name="time" value={formData.time} onChange={handleInputChange} required className="w-full pl-12 pr-4 py-3 bg-white border-2 border-orange-100 focus:border-orange-500 outline-none transition-colors rounded-xl font-semibold text-gray-800" />
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-[#2A1D13] mb-2">{pageData.formSection?.placeLabel || "Birth Place"}</label>
                                        <div className="relative">
                                            <MapPinIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-400" />
                                            <input type="text" name="place" value={formData.place} onChange={handleInputChange} placeholder={pageData.formSection?.placePlaceholder || "e.g., Delhi, India"} required className="w-full pl-12 pr-4 py-3 bg-white border-2 border-orange-100 focus:border-orange-500 outline-none transition-colors rounded-xl font-semibold text-gray-800" />
                                        </div>
                                    </div>
                                    <button type="submit" disabled={isGenerating} className="w-full bg-[#E8453C] hover:bg-black text-white py-4 rounded-xl font-bold text-sm uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg">
                                        {isGenerating ? <><Loader className="w-5 h-5 animate-spin" /> Generating...</> : <><Star className="w-5 h-5" /> {pageData.formSection?.buttonText || "Generate Kundli"}</>}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </section>

                    {/* Features Section */}
                    <section className="py-16 bg-white text-center">
                        <div className="container mx-auto px-4 max-w-6xl">
                            <div className="text-center mb-16 animate-fade-in-up">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 text-orange-600 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                                    <Star className="w-3.5 h-3.5" />
                                    <span>Celestial Advantages</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 uppercase text-center">
                                    {pageData.featuresTitle?.split(' ')[0] || "Celestial"} <span className="text-orange-600">{pageData.featuresTitle?.split(' ').slice(1).join(' ') || "Benefits"}</span>
                                </h2>
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-12 h-1 bg-orange-200 rounded-full" />
                                    <Sparkles className="w-5 h-5 text-orange-400 animate-pulse" />
                                    <div className="w-12 h-1 bg-orange-200 rounded-full" />
                                </div>
                            </div>
                            <div className="grid md:grid-cols-3 gap-8">
                                {features?.map((f, i) => (
                                    <div key={i} className="bg-[#FAF9F6] p-10 border border-orange-100 hover:shadow-xl transition-all">
                                        <h3 className="text-xl font-black text-[#E8453C] mb-4 uppercase">{f.title}</h3>
                                        <p className="text-gray-500 font-bold text-sm">{f.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Results Section */}
                    {kundliGenerated && (
                        <div id="kundli-results" className="animate-fade-in-up">
                            <section className="py-14 bg-white border-t border-orange-50 text-center">
                                <div className="container mx-auto px-4 max-w-6xl">
                                    <div className="text-center mb-16 animate-fade-in-up">
                                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 text-orange-600 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                                            <Compass className="w-3.5 h-3.5" />
                                            <span>{pageData.resultsSection?.badge || "Generated Insights"}</span>
                                        </div>
                                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 uppercase text-center">
                                            {pageData.resultsSection?.title?.split(' ').slice(0, -1).join(' ') || "Your Janam"} <span className="text-orange-600">{pageData.resultsSection?.title?.split(' ').slice(-1) || "Kundli"}</span>
                                        </h2>
                                        <div className="flex items-center justify-center gap-2 mb-4 text-center">
                                            <div className="w-12 h-1 bg-orange-200 rounded-full" />
                                            <Sparkles className="w-5 h-5 text-orange-400 animate-pulse" />
                                            <div className="w-12 h-1 bg-orange-200 rounded-full" />
                                        </div>
                                        <p className="text-gray-400 font-bold italic tracking-wide">Calculated for {formData.name} at {formData.place}</p>
                                    </div>
                                    <div className="grid lg:grid-cols-2 gap-12 items-start text-left">
                                        <div className="bg-[#FAF9F6] p-10 rounded-3xl border-2 border-orange-100 shadow-lg">{renderNorthIndianChart()}</div>
                                        <div className="overflow-x-auto bg-[#FAF9F6] p-6 rounded-3xl border-2 border-orange-100">
                                            <table className="w-full text-sm">
                                                <thead><tr className="border-b-2 border-orange-100 text-left"><th className="py-3 text-left font-black uppercase text-[#2A1D13]">Planet</th><th className="py-3 text-left font-black uppercase text-[#2A1D13]">Sign</th><th className="py-3 text-left font-black uppercase text-[#2A1D13]">House</th></tr></thead>
                                                <tbody>{kundliData.planets.map((p, i) => (<tr key={i} className="border-b border-orange-50"><td className="py-3 font-bold text-gray-800">{p.name}</td><td className="py-3 text-gray-600 font-medium">{p.sign}</td><td className="py-3 font-black text-orange-600">{p.house}</td></tr>))}</tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Dosha Analysis Section */}
                            <section className="py-14 bg-[#FAF9F6] text-center">
                                <div className="container mx-auto px-4 max-w-4xl">
                                    <div className="text-center mb-12">
                                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 text-orange-600 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                                            <AlertTriangle className="w-3.5 h-3.5" />
                                            <span>{pageData.doshasSection?.badge || "Dosha Analysis"}</span>
                                        </div>
                                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 uppercase text-center">
                                            {pageData.doshasSection?.title?.split(' ').slice(0, -1).join(' ') || "Planetary"} <span className="text-orange-600">{pageData.doshasSection?.title?.split(' ').slice(-1) || "Influences"}</span>
                                        </h2>
                                        <div className="flex items-center justify-center gap-2">
                                            <div className="w-12 h-1 bg-orange-200 rounded-full" />
                                            <Sparkles className="w-5 h-5 text-orange-400 animate-pulse" />
                                            <div className="w-12 h-1 bg-orange-200 rounded-full" />
                                        </div>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-6 text-left">
                                        {kundliData.doshas.map((d, idx) => (
                                            <div key={idx} className="bg-white p-6 rounded-2xl border-2 border-orange-100 hover:shadow-lg transition-all">
                                                <div className="flex items-center justify-between mb-3 text-center">
                                                    <h3 className="text-lg font-black text-[#2A1D13] uppercase tracking-tight">{d.name}</h3>
                                                    <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider ${d.present ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'}`}>{d.present ? `YES - ${d.severity}` : 'NO'}</span>
                                                </div>
                                                {d.present && <p className="text-sm text-gray-500 mt-4 leading-relaxed italic"><span className="text-orange-600 font-black uppercase text-[10px] block mb-1">Remedy:</span> {d.remedy}</p>}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </section>

                            {/* Remedies Section */}
                            <section className="py-14 bg-white text-center">
                                <div className="container mx-auto px-4 max-w-4xl">
                                    <div className="text-center mb-12">
                                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 text-orange-600 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                                            <Heart className="w-3.5 h-3.5" />
                                            <span>{pageData.remediesSection?.badge || "Spiritual Solutions"}</span>
                                        </div>
                                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 uppercase text-center">
                                            {pageData.remediesSection?.title?.split(' ').slice(0, -1).join(' ') || "Divine"} <span className="text-orange-600">{pageData.remediesSection?.title?.split(' ').slice(-1) || "Remedies"}</span>
                                        </h2>
                                        <div className="flex items-center justify-center gap-2">
                                            <div className="w-12 h-1 bg-orange-200 rounded-full" />
                                            <Sparkles className="w-5 h-5 text-orange-400 animate-pulse" />
                                            <div className="w-12 h-1 bg-orange-200 rounded-full" />
                                        </div>
                                    </div>
                                    <div className="bg-[#FAF9F6] p-10 rounded-3xl border-2 border-orange-100 text-left">
                                        <ul className="space-y-4">
                                            {kundliData.remedies.map((remedy, idx) => (
                                                <li key={idx} className="flex items-start gap-4">
                                                    <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 mt-0.5"><CheckCircle className="w-4 h-4 text-orange-600" /></div>
                                                    <span className="text-gray-700 font-bold uppercase tracking-tight text-sm md:text-base">{remedy}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </section>
                        </div>
                    )}

                    {/* FAQ Section */}
                    <section className="py-20 bg-[#FAF9F6] text-center">
                        <div className="container mx-auto px-4 max-w-3xl">
                            <div className="text-center mb-16 animate-fade-in-up">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 text-orange-600 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                                    <HelpCircle className="w-3.5 h-3.5" />
                                    <span>Divine Clarity</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 uppercase text-center">
                                    {pageData.faqsTitle?.split(' ')[0] || "Divine"} <span className="text-orange-600">{pageData.faqsTitle?.split(' ').slice(1).join(' ') || "Clarification"}</span>
                                </h2>
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-12 h-1 bg-orange-200 rounded-full" />
                                    <Sparkles className="w-5 h-5 text-orange-400 animate-pulse" />
                                    <div className="w-12 h-1 bg-orange-200 rounded-full" />
                                </div>
                            </div>
                            <div className="space-y-4 text-left">
                                {(faqs && faqs.length > 0 ? faqs : FAQS_FALLBACK).map((f, i) => (
                                    <div key={i} className="bg-white border-2 border-orange-50 rounded-2xl overflow-hidden shadow-sm hover:border-orange-200 transition-all">
                                        <button onClick={() => setSelectedFaq(selectedFaq === i ? null : i)} className="w-full px-8 py-6 flex items-center justify-between text-[#2A1D13] font-extrabold uppercase tracking-tight text-sm">
                                            <span>Q. {f.question || f.q}</span>
                                            <ChevronDown className={`w-5 h-5 transition-transform ${selectedFaq === i ? 'rotate-180 text-orange-600' : 'text-gray-300'}`} />
                                        </button>
                                        {selectedFaq === i && <div className="px-8 pb-8 pt-2 text-gray-500 font-bold border-t border-orange-50 italic">A. {f.answer || f.a}</div>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* CTA Section */}
                    <section className="py-24 bg-white border-t border-orange-50 text-center relative overflow-hidden">
                        <div className="container mx-auto px-4 max-w-5xl relative z-10 text-center">
                            <h2 className="text-4xl md:text-6xl font-black text-[#2A1B13] mb-8 tracking-tighter uppercase leading-tight text-center">
                                {pageData.cta?.title?.split(' ').slice(0, -1).join(' ') || "Need Deeper"} <span className="text-[#E8453C]">{pageData.cta?.title?.split(' ').slice(-1) || "Analysis?"}</span>
                            </h2>
                            <div className="flex items-center justify-center gap-3 mb-8 text-center">
                                <div className="w-10 h-[1.5px] bg-orange-200" />
                                <Sparkles className="w-5 h-5 text-orange-400 animate-pulse" />
                                <div className="w-10 h-[1.5px] bg-orange-200" />
                            </div>
                            <p className="text-gray-400 mb-12 text-lg md:text-xl font-bold italic max-w-3xl mx-auto text-center uppercase tracking-tight">
                                "{pageData.cta?.subtitle || "Connect with our master astrologers for deeper clarity on your cosmic blueprint."}"
                            </p>
                            <Link to={pageData.cta?.buttonLink || "/astrologer"}>
                                <button className="group relative bg-[#E8453C] hover:bg-black text-white px-12 py-5 font-black text-xs uppercase tracking-[0.3em] shadow-xl transition-all">
                                    <span className="relative flex items-center gap-3">
                                        <Phone className="w-4 h-4" /> 
                                        {pageData.cta?.buttonText || "Consult with Expert"}
                                    </span>
                                </button>
                            </Link>
                        </div>
                    </section>
                </div>
            </div>
        </Layout>
    );
};

export default CommonKundliPage;
