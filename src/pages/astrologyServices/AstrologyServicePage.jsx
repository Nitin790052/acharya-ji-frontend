import React from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { usePageBanner } from "@/hooks/usePageBanner";
import SEO from "@/components/layout/SEO";
import { useGetAstrologyPageBySlugQuery } from "@/services/astrologyContentApi";
import { BACKEND_URL, getImageUrl } from "@/config/apiConfig";
import {
    Target, TrendingUp, Shield, Navigation, Star, Compass, CheckCircle, ArrowRight,
    Trophy, Heart, Clock, Users, Activity, Calendar, Leaf, Brain, Hash, Edit,
    HelpCircle, Sparkles, Briefcase, Rocket, Gem, ChevronRight, Calculator,
    Eye, Map, BookOpen, Sun, Moon, Flame, Award, Sparkle
} from "lucide-react";

// Icon Map
const ICON_MAP = {
    Target, TrendingUp, Shield, Navigation, Star, Compass, CheckCircle, ArrowRight,
    Trophy, Heart, Clock, Users, Activity, Calendar, Leaf, Brain, Hash, Edit,
    HelpCircle, Sparkles, Briefcase, Rocket, Gem, ChevronRight, Calculator,
    Eye, Map, BookOpen, Sun, Moon, Flame
};

// Site Standard Other Services
const OTHER_SERVICES_LIST = [
    { name: "Career Astrology", slug: "career-astrology", icon: Briefcase },
    { name: "Marriage & Love", slug: "marriage-astrology", icon: Heart },
    { name: "Business Growth", slug: "business-astrology", icon: TrendingUp },
    { name: "Health & Wellness", slug: "health-astrology", icon: Activity },
    { name: "Numerology", slug: "numerology", icon: Hash },
    { name: "Tarot Reading", slug: "tarot-reading", icon: Star },
    { name: "Palmistry", slug: "palmistry", icon: Compass },
    { name: "Gemstone Guide", slug: "gemstone-suggestion", icon: Gem }
];

const AstrologyServicePage = ({ slug: propSlug }) => {
    const { slug: paramSlug } = useParams();
    const slug = propSlug || paramSlug;

    // Exactly match site-wide standard banner logic
    const banner = usePageBanner({ pollingInterval: 60000 });
    const { data: page, isLoading, isError } = useGetAstrologyPageBySlugQuery(slug, { skip: !slug });

    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    if (isLoading) {
        return (
            <Layout>
                <div className="min-h-screen flex items-center justify-center bg-[#FAF9F6]">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-12 h-12 border-4 border-orange-200 border-t-[#F59E0B] rounded-full animate-spin"></div>
                        <p className="text-orange-900 font-black uppercase tracking-widest text-[10px]">Aligning with the Stars...</p>
                    </div>
                </div>
            </Layout>
        );
    }

    if (isError || !page) {
        return (
            <Layout>
                <div className="min-h-screen flex items-center justify-center bg-[#FAF9F6]">
                    <div className="text-center max-w-md p-8 bg-white border-2 border-orange-100 shadow-xl rounded-sm">
                        <div className="w-16 h-16 bg-orange-50 rounded-sm flex items-center justify-center mx-auto mb-6">
                            <Star className="w-8 h-8 text-[#FFC107]" />
                        </div>
                        <h2 className="text-2xl font-black text-[#2A1D13] mb-4 uppercase tracking-tighter">Service Not Found</h2>
                        <p className="text-gray-500 mb-8 font-bold italic">The stars are rearranging. This service will be available shortly.</p>
                        <Link to="/" className="inline-flex items-center gap-2 px-8 py-3 bg-[#F59E0B] text-white font-black text-xs uppercase tracking-widest hover:bg-[#D97706] transition-all shadow-lg rounded-sm">
                            Go Home <ArrowRight size={14} />
                        </Link>
                    </div>
                </div>
            </Layout>
        );
    }

    const { features, deepDive, steps, cta, faqs, hero: astrologyHero } = page;

    // Hierarchy of content:
    // 1. Manually assigned banner for this exact route in Database (Carousel Manager)
    // 2. Specialized content from Astrology Content Manager (if banner is just generic fallback)
    // 3. Generic site-wide fallback banner

    const isGenericBanner = banner && banner.titleHighlight1 === 'Welcome to' && banner.titleHighlight2 === 'Divine';

    const activeHero = (!isGenericBanner && banner && banner.titleHighlight1) ? {
        badge: banner.badge,
        titleHighlight1: banner.titleHighlight1,
        titleHighlight2: banner.titleHighlight2,
        titleHighlight3: banner.titleHighlight3,
        titleEnd: banner.titleEnd,
        subtitle: banner.subtitle,
        imageUrl: banner.imageUrl,
        buttonText: "Consult Expert Now",
        buttonLink: "/astrologer"
    } : {
        badge: astrologyHero?.badge,
        titleHighlight1: astrologyHero?.title,
        titleHighlight2: astrologyHero?.highlightedTitle,
        titleHighlight3: "",
        titleEnd: "",
        subtitle: astrologyHero?.subtitle,
        imageUrl: astrologyHero?.imageUrl,
        buttonText: astrologyHero?.buttonText,
        buttonLink: astrologyHero?.buttonLink
    };

    return (
        <Layout>
            <SEO
                pageName={slug}
                title={banner.metaTitle || `${activeHero.titleHighlight1} - Astrology Services`}
                description={banner.metaDescription}
                keywords={banner.metaKeywords}
                canonical={banner.canonicalUrl}
            />

            <div className="min-h-screen bg-[#FAF9F6]">

                {/* Hero Section - Exact Design from Career.jsx */}
                <section className="relative h-[320px] sm:h-[320px] md:h-[360px] lg:h-[370px] flex items-center py-[20px] text-white overflow-hidden">
                    <div className="absolute inset-0">
                        {activeHero.imageUrl ? (
                            <img
                                src={getImageUrl(activeHero.imageUrl)}
                                alt={activeHero.titleHighlight1}
                                className="w-full h-full object-cover object-top"
                            />
                        ) : (
                            <div className="absolute inset-0 bg-[#2A1D13]" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" />
                        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,rgba(245,158,11,0.2),transparent_50%)]" />
                    </div>

                    <div className="container mx-auto px-4 relative z-10">
                        <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
                            {activeHero.badge && (
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 mb-6 md:mb-8 shadow-2xl">
                                    <Award className="w-4 h-4 text-[#FFC107]" />
                                    <span className="text-[#FFC107] text-[10px] md:text-sm font-black uppercase tracking-widest">{activeHero.badge}</span>
                                </div>
                            )}
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)] uppercase">
                                {activeHero.titleHighlight1}{' '}
                                <span className="text-[#FFC107]">{activeHero.titleHighlight2}</span>{' '}
                                <span className="text-white">{activeHero.titleHighlight3}</span> {activeHero.titleEnd}
                            </h1>
                            <p className="text-base md:text-lg text-amber-100/90 leading-relaxed max-w-2xl mx-auto font-medium drop-shadow italic">
                                {activeHero.subtitle}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Main Content Grid */}
                {features && features.length > 0 && (
                    <section className="py-10 md:py-16 relative z-20">
                        <div className="container mx-auto px-4 max-w-7xl">
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                                {features.map((feature, idx) => {
                                    const IconComp = ICON_MAP[feature.iconName] || Star;
                                    return (
                                        <div key={idx} className="group bg-white px-8 py-7 md:px-10 md:py-9 hover:shadow-[0_20px_40px_-15px_rgba(245,158,11,0.1)] transition-all duration-500 border-2 border-orange-100 flex flex-col items-center text-center animate-fade-in-up rounded-sm" style={{ animationDelay: `${idx * 0.1}s` }}>
                                            <div className="w-16 h-16 mb-5 bg-orange-50 flex items-center justify-center group-hover:bg-[#F59E0B] transition-all duration-500 shadow-inner rounded-sm">
                                                <IconComp className="w-8 h-8 text-[#D97706] group-hover:text-white transition-all transform group-hover:rotate-12" />
                                            </div>
                                            <h3 className="text-xl font-black text-[#2A1D13] mb-3 uppercase tracking-tighter">{feature.title}</h3>
                                            <p className="text-gray-500 font-bold text-sm leading-relaxed">{feature.description}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </section>
                )}

                {/* Insight Section */}
                {deepDive && deepDive.title && (
                    <section className="py-16 md:py-24 bg-white border-y border-orange-50">
                        <div className="container mx-auto px-4 max-w-6xl">
                            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                                <div className="lg:w-1/2 relative group">
                                    <div className="absolute inset-0 bg-[#F59E0B] scale-95 opacity-10 group-hover:scale-100 transition-transform duration-700 rounded-sm"></div>
                                    {deepDive.imageUrl && (
                                        <img
                                            src={getImageUrl(deepDive.imageUrl)}
                                            alt={deepDive.title}
                                            className="relative z-10 w-full object-cover h-[450px] shadow-2xl border-b-[10px] border-[#F59E0B] rounded-sm"
                                        />
                                    )}
                                    <div className="absolute -top-4 -left-4 text-orange-200 opacity-20"><Sparkles size={60} /></div>
                                </div>
                                <div className="lg:w-1/2">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-50 text-orange-600 rounded-sm text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                                        <Compass size={14} />
                                        <span>Deep Insight</span>
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-black text-[#2A1D13] mb-6 uppercase leading-tight">
                                        {deepDive.title} <span className="text-[#F59E0B]">{deepDive.highlightedTitle}</span>
                                    </h2>
                                    <p className="text-lg text-gray-600 mb-10 leading-relaxed font-semibold italic">{deepDive.description}</p>

                                    <div className="grid sm:grid-cols-2 gap-4 mb-10">
                                        {deepDive.checklist?.map((item, i) => (
                                            <div key={i} className="flex items-center gap-3 group/item">
                                                <div className="w-8 h-8 rounded-sm bg-orange-50 flex flex-shrink-0 items-center justify-center group-hover/item:bg-[#FFC107] transition-all">
                                                    <CheckCircle size={16} className="text-[#D97706] group-hover/item:text-white" />
                                                </div>
                                                <span className="font-black text-xs text-[#2A1D13] uppercase tracking-wide group-hover/item:translate-x-1 transition-transform">{item}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <Link to={activeHero.buttonLink}>
                                        <button className="group px-10 py-4 bg-[#2A1D13] hover:bg-black text-white font-black text-xs uppercase tracking-[0.2em] transition-all shadow-xl flex items-center gap-3 rounded-sm">
                                            {activeHero.buttonText}
                                            <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* Process Steps */}
                {steps && steps.length > 0 && (
                    <section className="py-16 md:py-24 bg-[#FAF9F6]">
                        <div className="container mx-auto px-4 max-w-7xl text-center">
                            <div className="mb-16 animate-fade-in-up">
                                <h2 className="text-3xl md:text-5xl font-black text-[#2A1D13] mb-4 uppercase tracking-tighter">Divine <span className="text-[#F59E0B]">Process</span></h2>
                                <div className="flex items-center justify-center gap-3">
                                    <div className="w-12 h-1 bg-orange-200 rounded-full" />
                                    <Sparkles className="w-5 h-5 text-orange-400" />
                                    <div className="w-12 h-1 bg-orange-200 rounded-full" />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-3 gap-6 lg:gap-10">
                                {steps.map((step, idx) => (
                                    <div key={idx} className="bg-white p-8 lg:p-12 text-center border-b-[8px] border-[#F59E0B] shadow-lg hover:shadow-2xl transition-all duration-500 group animate-fade-in-up rounded-sm" style={{ animationDelay: `${idx * 0.1}s` }}>
                                        <div className="w-16 h-16 bg-[#FAF9F6] mx-auto mb-8 flex items-center justify-center text-3xl font-black text-[#2A1D13] group-hover:bg-[#F59E0B] group-hover:text-white transition-all transform group-hover:rotate-[360deg] duration-1000 rounded-sm">
                                            {step.number}
                                        </div>
                                        <h3 className="text-2xl font-black text-[#2A1D13] mb-4 uppercase tracking-tighter">{step.title}</h3>
                                        <p className="text-gray-500 font-bold text-sm leading-relaxed">{step.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Explore Other Services */}
                <section className="py-20 bg-white border-t border-orange-100">
                    <div className="container mx-auto px-4 max-w-7xl text-center">
                        <h2 className="text-2xl md:text-4xl font-black text-[#2A1D13] mb-12 uppercase tracking-tighter">Explore Other <span className="text-[#F59E0B]">Services</span></h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                            {OTHER_SERVICES_LIST.filter(s => s.slug !== slug).map((service, idx) => {
                                const Icon = service.icon;
                                return (
                                    <Link
                                        key={idx}
                                        to={`/${service.slug}`}
                                        className="p-5 bg-[#FAF9F6] border-2 border-orange-50 hover:bg-white hover:border-[#F59E0B] hover:shadow-xl transition-all duration-300 group rounded-sm"
                                    >
                                        <div className="w-10 h-10 bg-white mx-auto mb-3 flex items-center justify-center group-hover:bg-[#F59E0B] transition-colors rounded-sm">
                                            <Icon size={18} className="text-[#D97706] group-hover:text-white" />
                                        </div>
                                        <span className="block font-black text-[#2A1D13] text-[9px] uppercase tracking-widest leading-tight">{service.name}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                {faqs && faqs.length > 0 && (
                    <FAQSection faqs={faqs} />
                )}

                {/* Standard Final CTA */}
                {cta && cta.title && (
                    <section className="py-20 bg-white border-t border-orange-50">
                        <div className="container mx-auto px-4 text-center max-w-5xl">
                            <div className="animate-fade-in-up">
                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#2A1D13] mb-6 tracking-tight uppercase leading-tight">
                                    {cta.title} <br className="hidden md:block" />
                                    <span className="text-[#F59E0B]">Divine Transformation</span>
                                </h2>
                                <div className="flex items-center justify-center gap-3 mb-8">
                                    <div className="w-10 h-[1.5px] bg-orange-200" />
                                    <Sparkles className="w-5 h-5 text-orange-400" />
                                    <div className="w-10 h-[1.5px] bg-orange-200" />
                                </div>
                                <p className="text-gray-600 mb-12 text-base font-bold max-w-2xl mx-auto italic">
                                    {cta.subtitle}
                                </p>
                                <div className="flex flex-wrap justify-center gap-4">
                                    <Link to={activeHero.buttonLink}>
                                        <button className="group relative bg-[#F59E0B] hover:bg-[#D97706] text-white px-10 py-5 rounded-sm font-black text-xs uppercase tracking-[0.3em] shadow-2xl transition-all duration-300 overflow-hidden active:translate-y-1">
                                            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                            <span className="relative flex items-center gap-2">{activeHero.buttonText} <Sparkle size={14} /></span>
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>
                )}
            </div>
        </Layout>
    );
};

// Site Standard Accordion
const FAQSection = ({ faqs }) => {
    const [openIdx, setOpenIdx] = React.useState(null);
    return (
        <section className="py-20 bg-[#FAF9F6]">
            <div className="container mx-auto px-4 max-w-3xl">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 text-orange-600 rounded-sm text-[10px] font-black uppercase tracking-widest mb-4">
                        <HelpCircle size={14} />
                        <span>Clarification</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black text-[#2A1D13] uppercase">Divine <span className="text-[#F59E0B]">Questions</span></h2>
                </div>
                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <div key={i} className="group bg-white border-2 border-orange-50 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-orange-200 overflow-hidden rounded-sm">
                            <button
                                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                                className="w-full px-8 py-6 flex items-center justify-between text-left"
                            >
                                <span className={`font-black text-lg transition-colors ${openIdx === i ? 'text-[#F59E0B]' : 'text-[#2A1D13]'}`}>{faq.question}</span>
                                <div className={`w-8 h-8 rounded-sm flex items-center justify-center transition-all ${openIdx === i ? 'bg-[#F59E0B] rotate-90 text-white' : 'bg-orange-50 text-orange-200'}`}>
                                    <ChevronRight size={18} />
                                </div>
                            </button>
                            <div className={`transition-all duration-500 ease-in-out overflow-hidden ${openIdx === i ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                <div className="px-8 pb-8 pt-2">
                                    <div className="p-6 bg-orange-50/50 border-l-[6px] border-[#FFC107] shadow-inner rounded-sm">
                                        <p className="text-gray-600 font-bold leading-relaxed italic italic-none">{faq.answer}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AstrologyServicePage;
