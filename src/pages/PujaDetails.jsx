import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import HeroBanner from '../components/home/HeroBanner';
import { useGetOfferingBySlugQuery } from '../services/pujaOfferingApi';
import { useGetPublicVendorServiceByIdQuery } from '../services/vendorApi';
import homeImg from "@/assets/grihaPraveshPuja/home_visit.webp"
import onlineImg from "@/assets/grihaPraveshPuja/online_puja.webp"
import muhuratImg from "@/assets/grihaPraveshPuja/muhurat.webp"

import {
    CheckCircle, Clock, Calendar, Shield,
    ArrowRight, ChevronRight, HelpCircle, AlertCircle,
    Sparkles, Award, Heart, Phone, Users, Sparkle, X, Star, Home, MessageCircle
} from 'lucide-react';
import { API_URL, BACKEND_URL, getImageUrl } from '../config/apiConfig';
import { usePageBanner } from '../hooks/usePageBanner';
import SEO from '../components/layout/SEO';
import { useUserAuth } from '../app/user/auth/AuthContext';
import { useNavigate } from 'react-router-dom';


const PujaDetails = () => {
    const { slug } = useParams();
    const isVendorService = slug.startsWith('vendor-service-');
    const vendorServiceRef = isVendorService ? slug : null;

    // Fetch from appropriate API
    const { 
        data: systemOffering, 
        isLoading: isSystemLoading, 
        isError: isSystemError 
    } = useGetOfferingBySlugQuery(slug, { skip: isVendorService, pollingInterval: 3000 });

    const { 
        data: vendorServiceRes, 
        isLoading: isVendorLoading, 
        isError: isVendorError 
    } = useGetPublicVendorServiceByIdQuery(vendorServiceRef, { skip: !isVendorService });

    const banner = usePageBanner();
    const { user } = useUserAuth();
    const navigate = useNavigate();

    // Data Normalization
    const isLoading = isSystemLoading || isVendorLoading;
    const isError = isSystemError || isVendorError;
    
    const offering = isVendorService ? (vendorServiceRes?.data ? {
        ...vendorServiceRes.data,
        shortDescription: vendorServiceRes.data.description,
        longDescription: vendorServiceRes.data.description, // Vendor services only have one description field
        imageUrl: vendorServiceRes.data.image,
        benefits: ['Sacred Vedic Rituals', 'Experienced Guidance', 'Complete Samagri Support', 'Shastra Compliant'],
        faqs: []
    } : null) : systemOffering;


    // Modal States
    const [showMuhuratModal, setShowMuhuratModal] = useState(false);

    // Form States
    const [formData, setFormData] = useState({
        name: '', phone: '', email: '', city: '',
        preferredDate: '', pujaType: 'home', message: ''
    });

    const [muhuratData, setMuhuratData] = useState({
        name: '', phone: '', dob: '', time: '', place: ''
    });

    if (isLoading) {
        return (
            <Layout>
                <div className="min-h-[80vh] flex items-center justify-center">
                    <div className="animate-pulse flex flex-col items-center gap-4">
                        <div className="w-16 h-16 bg-orange-200 rounded-full animate-bounce"></div>
                        <p className="font-black text-blue-900 uppercase tracking-[0.2em] text-xs">Purifying Sacred Content...</p>
                    </div>
                </div>
            </Layout>
        );
    }

    if (isError || !offering) {
        return (
            <Layout>
                <div className="min-h-[70vh] flex flex-col items-center justify-center gap-8 px-6 bg-[#FAF9F6]">
                    <div className="p-8 bg-white rounded-full shadow-2xl">
                        <AlertCircle size={80} className="text-red-500" />
                    </div>
                    <div className="text-center max-w-lg">
                        <h2 className="text-4xl font-black text-gray-900 mb-4 uppercase tracking-tighter">Temple Closed?</h2>
                        <p className="text-gray-500 font-medium text-lg leading-relaxed">This specific puja offering is currently not in our sacred list or has been moved to a new shubh muhurat.</p>
                    </div>
                    <Link to="/" className="px-10 py-4 bg-blue-900 text-white font-black rounded-2xl shadow-xl shadow-blue-200 hover:bg-orange-600 transition-all uppercase tracking-widest text-xs">
                        Return to Sanctuary
                    </Link>
                </div>
            </Layout>
        );
    }

    const { title, shortDescription, longDescription, price, duration, benefits, faqs } = offering;

    const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleMuhuratChange = (e) => setMuhuratData({ ...muhuratData, [e.target.name]: e.target.value });



    const handleMuhuratSubmit = (e) => {
        e.preventDefault();
        alert('Muhurat consultation request submitted! Our Acharya will contact you soon.');
        setShowMuhuratModal(false);
    };

    const faqSchema = faqs && faqs.length > 0 ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    } : null;

    return (
        <Layout>
            <SEO
                title={offering.metaTitle || banner.metaTitle}
                description={offering.metaDescription || banner.metaDescription}
                keywords={offering.metaKeywords || banner.metaKeywords}
                canonical={offering.canonicalUrl || banner.canonicalUrl}
                schemaData={faqSchema}
            />
            <div className="min-h-screen bg-white">
                {/* Hero Section - Matching Griha Pravesh deeply */}
                <section className="relative h-[300px] sm:h-[300px] md:h-[380px] lg:h-[390px] flex items-center pt-16 pb-4 sm:pt-20 sm:pb-20 text-white overflow-hidden">
                    <div className="absolute inset-0">
                        {banner.imageUrl ? (
                            <img
                                src={getImageUrl(banner.imageUrl)}
                                alt={banner.imageAlt || offering.title}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-blue-950/80 flex items-center justify-center">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-rose-400 opacity-20" />
                            </div>
                        )}
                        <div className="absolute inset-0 bg-black/40" />
                    </div>
                    <div className="container mx-auto px-4 relative z-10 w-full animate-fade-in-up">
                        <div className="max-w-4xl mx-auto text-center">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 mb-4 md:mb-8 shadow-2xl">
                                <Award className="w-4 h-4 text-[#FFC107]" />
                                <span className="text-[#FFC107] text-xs md:text-sm font-black uppercase tracking-widest">
                                    {isVendorService ? `SACRED PROVIDER: ${offering?.vendor?.businessName || 'TEMPLE PARTNER'}` : (banner.badge || 'DIVINE SERVICES HUB')}
                                </span>
                            </div>

                            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)] uppercase">
                                {(banner.titleHighlight1 || banner.titleHighlight2 || banner.titleHighlight3) ? (
                                    <>
                                        {banner.titleHighlight1 && <span>{banner.titleHighlight1} </span>}
                                        {banner.titleHighlight2 && <span className="text-yellow-300">{banner.titleHighlight2} </span>}
                                        {banner.titleHighlight3 && <span className="text-yellow-300">{banner.titleHighlight3} </span>}
                                        {banner.titleEnd && <span> {banner.titleEnd}</span>}
                                    </>
                                ) : (
                                    title.includes(' ') ? (
                                        <>
                                            {title.split(' ').slice(0, -1).join(' ')} <br />
                                            <span className="text-yellow-300">{title.split(' ').slice(-1)}</span>
                                        </>
                                    ) : (
                                        <span className="text-yellow-300">{title}</span>
                                    )
                                )}
                            </h1>

                            <p className="text-sm md:text-xl text-amber-100 leading-relaxed font-medium max-w-2xl mx-auto mb-6 md:mb-8 drop-shadow">
                                {banner.subtitle || shortDescription}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Intro Section - Sacred Journey Style */}
                <section className="py-12 md:py-16 overflow-x-hidden relative">
                    <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-orange-100/30 rounded-full blur-3xl -z-10" />
                    <div className="container mx-auto px-4">
                        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-center">
                            <div className="animate-fade-in-left">
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-[11px] font-bold uppercase tracking-wider mb-5">
                                    <Sparkles className="w-3.5 h-3.5" />
                                    <span>Sacred Introduction</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 leading-tight">
                                    Why Perform <span className="text-orange-600">{title}</span>?
                                </h2>
                                <div className="flex items-center gap-2 mb-5">
                                    <div className="w-12 h-1 bg-orange-200 rounded-full" />
                                    <Sparkles className="w-5 h-5 text-orange-400" />
                                    <div className="w-12 h-1 bg-orange-200 rounded-full" />
                                </div>
                                <div className="space-y-3 text-gray-700 font-medium text-sm md:text-base">
                                    <p className="leading-relaxed">{longDescription}</p>
                                </div>
                                <div className="mt-6 grid grid-cols-2 gap-3">
                                    {(benefits || ['Cleanses negative energy', 'Spiritual protection', 'Invites Prosperity', 'Family Happiness']).map((item) => (
                                        <div key={item} className="flex items-center gap-2.5">
                                            <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                                                <CheckCircle className="w-3.5 h-3.5 text-orange-600" />
                                            </div>
                                            <span className="text-sm font-medium text-gray-800">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="relative group flex justify-center animate-fade-in-right">
                                <div className="relative w-[96%] max-w-lg mx-auto p-1.5 md:p-2 bg-gradient-to-br from-amber-100 to-amber-300 rounded-[2rem] shadow-[0_20px_50px_-15px_rgba(217,119,6,0.25)]">
                                    <div className="w-full h-[315px] sm:h-[375px] md:h-[445px] rounded-3xl overflow-hidden border-[3px] border-white relative z-10">
                                        <img src={getImageUrl(offering.imageUrl)} alt={title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#2A1D13]/60 via-transparent to-transparent opacity-80" />
                                    </div>
                                    <div className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 bg-white p-2.5 md:p-3 rounded-2xl shadow-xl border border-amber-100 z-20 flex items-center gap-3">
                                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-amber-50 flex items-center justify-center border border-amber-200">
                                            <Shield className="w-5 h-5 md:w-6 md:h-6 text-amber-600" />
                                        </div>
                                        <div className="text-[10px] md:text-xs font-bold text-gray-800 uppercase tracking-wide">
                                            100% Authentic<br /><span className="text-amber-600">Vedic Rituals</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Offerings Section - Three Modes from user demo */}
                <section className="py-12 md:py-16 bg-[#FAF9F6] relative overflow-hidden">
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #d97706 1px, transparent 0)', backgroundSize: '32px 32px' }} />
                    <div className="container mx-auto px-4 max-w-7xl relative z-10">
                        <div className="text-center mb-16 animate-fade-in-up">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 text-orange-600 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                                <Star className="w-3.5 h-3.5" />
                                <span>Our Service Modes</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">Modes of <span className="text-orange-600">{title}</span></h2>
                            <div className="flex items-center justify-center gap-2">
                                <div className="w-12 h-1 bg-orange-200 rounded-full" />
                                <Sparkles className="w-5 h-5 text-orange-400" />
                                <div className="w-12 h-1 bg-orange-200 rounded-full" />
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8 max-w-[70rem] mx-auto">
                            {(offering.serviceModes && offering.serviceModes.length > 0
                                ? offering.serviceModes.map(m => ({
                                    title: m.title,
                                    img: m.imageUrl ? getImageUrl(m.imageUrl) : (m.mode?.toLowerCase().includes('online') ? onlineImg : m.mode?.toLowerCase().includes('muhurat') ? muhuratImg : homeImg),
                                    items: m.points
                                }))
                                : [
                                    { title: "Home Visit Puja", img: homeImg, items: ["Experienced Acharya", "Full Samagri Included", "Traditional Mantra Vidhi", "Personal Connection"] },
                                    { title: "Online Video Puja", img: onlineImg, items: ["Live Interactive Session", "Step-by-Step Guidance", "Global Accessibility", "Perfect for Busy Schedules"] },
                                    { title: "Muhurat Consultation", img: muhuratImg, items: ["Personalized Kundli Check", "Nakshatra Alignment", "Exact Timing Guidance", "Family Shanti Analysis"] }
                                ]
                            ).map((service, idx) => (
                                <div key={idx} className="group/card h-full animate-fade-in-up" style={{ animationDelay: `${idx * 0.1}s`, animationFillMode: 'both' }}>
                                    <div className="relative h-full p-[1.5px] rounded-3xl bg-amber-400/40 hover:bg-amber-500 transition-all duration-700 shadow-xl flex flex-col">
                                        <div className="relative flex-grow bg-[#FCFBF7] rounded-[1.4rem] overflow-hidden flex flex-col group-hover/card:bg-white transition-all duration-500">
                                            {/* Full Width Top Image */}
                                            <div className="h-44 w-full overflow-hidden relative">
                                                <img
                                                    src={service.img}
                                                    alt={service.title}
                                                    className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-700"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                            </div>

                                            <div className="p-6 flex flex-col flex-grow">
                                                <h3 className="text-lg font-black text-[#2A1D13] mb-4 uppercase tracking-wide group-hover/card:text-orange-600">{service.title}</h3>
                                                <ul className="space-y-3 mb-8 flex-grow">
                                                    {service.items.map((item, i) => (
                                                        <li key={i} className="flex items-center gap-3">
                                                            <CheckCircle size={14} className="text-orange-400" />
                                                            <span className="text-xs font-bold text-gray-600">{item}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                                <button
                                                    onClick={() => {
                                                        if (service.title.includes('Muhurat')) {
                                                            setShowMuhuratModal(true);
                                                        } else {
                                                            window.dispatchEvent(new CustomEvent('openPoojaDrawer', { detail: offering }));
                                                        }
                                                    }}
                                                    className="w-full py-3 bg-[#2A1D13] text-amber-400 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-orange-600 hover:text-white transition-all shadow-lg"
                                                >
                                                    Book Selection
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Why Choose Us */}
                <section className="py-12 md:py-16 bg-[#FFFDF7] relative overflow-hidden">
                    <div className="container mx-auto px-4 max-w-7xl relative z-10">
                        <div className="text-center mb-16 animate-fade-in-up">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 text-orange-600 rounded-full text-[10px] font-extrabold uppercase tracking-[0.2em] mb-4">
                                <Shield className="w-3.5 h-3.5" />
                                <span>The Standard of Purity</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6 uppercase">Why Book With <span className="text-orange-600">Us</span></h2>
                            <div className="flex items-center justify-center gap-2">
                                <div className="w-12 h-1 bg-orange-200 rounded-full" /><Sparkles className="w-5 h-5 text-orange-400" /><div className="w-12 h-1 bg-orange-200 rounded-full" />
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {[
                                { icon: Shield, title: "Verified Acharyas", desc: "Learned pandits with deep shastra knowledge." },
                                { icon: CheckCircle, title: "Complete Samagri", desc: "We provide everything needed for puja." },
                                { icon: Clock, title: "Punctual Service", desc: "Respecting your shubh muhurat timings." },
                                { icon: Heart, title: "Sacred Devotion", desc: "Every ritual performed with full sincerity." },
                                { icon: Sparkles, title: "Transparent Pricing", desc: "No hidden costs, clear donation slabs." },
                                { icon: Users, title: "Customer Support", desc: "Dedicated guidance for your spiritual journey." }
                            ].map((item, idx) => (
                                <div key={idx} className="group bg-white p-6 border-2 border-orange-100 flex items-start gap-5 hover:shadow-xl transition-all animate-fade-in-up">
                                    <div className="w-14 h-14 bg-orange-50 flex items-center justify-center flex-shrink-0 group-hover:bg-orange-600 transition-all">
                                        <item.icon className="text-orange-600 group-hover:text-white" size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-black text-[#4A3427] mb-2 group-hover:text-orange-600">{item.title}</h3>
                                        <p className="text-gray-500 text-sm font-semibold leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Belief Section */}
                <section className="py-12 md:py-16 bg-[#FFFCF5]">
                    <div className="container mx-auto px-4 max-w-4xl text-center">

                        <div className="text-center mb-16 animate-fade-in-up">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 text-orange-600 rounded-full text-[10px] font-extrabold uppercase tracking-[0.2em] mb-4">
                                <Shield className="w-3.5 h-3.5" />
                                <span>The Standard of Purity</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6 uppercase">Divinity in <span className="text-orange-600">Every Ritual</span></h2>
                            <div className="flex items-center justify-center gap-2">
                                <div className="w-12 h-1 bg-orange-200 rounded-full" /><Sparkles className="w-5 h-5 text-orange-400" /><div className="w-12 h-1 bg-orange-200 rounded-full" />
                            </div>
                        </div>
                        <div className="max-w-3xl mx-auto italic text-lg md:text-2xl text-gray-700 font-semibold leading-relaxed relative">
                            <span className="text-5xl text-orange-100 absolute -top-4 -left-6 font-serif">"</span>
                            Hamara lakshya hai ki aapke har naye shubh karya mein Ishwar ki kripa aur sakaratmak urja ka vaas ho. Hamari veda-shastra vidhi se aapke jeevan mein mangal hi mangal ho.
                            <span className="text-5xl text-orange-100 absolute -bottom-10 -right-6 font-serif">"</span>
                        </div>
                    </div>
                </section>

                {/* Testimonials */}
                {/* FAQ Section */}
                {faqs && faqs.length > 0 && (
                    <section className="py-16 bg-white">
                        <div className="container mx-auto px-4 max-w-4xl">
                            <div className="text-center mb-16 animate-fade-in-up">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 text-orange-600 rounded-full text-[10px] font-extrabold uppercase tracking-[0.2em] mb-4">
                                    <Shield className="w-3.5 h-3.5" />
                                    <span>The Standard of Purity</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6 uppercase">Common <span className="text-orange-600">Questions</span></h2>
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-12 h-1 bg-orange-200 rounded-full" /><Sparkles className="w-5 h-5 text-orange-400" /><div className="w-12 h-1 bg-orange-200 rounded-full" />
                                </div>
                            </div>

                            <div className="space-y-4">
                                {faqs.map((faq, idx) => (
                                    <div key={idx} className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                                        <h4 className="font-black text-lg text-gray-800 mb-2">? {faq.question}</h4>
                                        <p className="text-gray-600 font-medium">{faq.answer}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Sacred Connections CTA - Compact Style */}
                <section className="py-16 bg-white relative overflow-hidden">
                    <div className="container mx-auto px-4 text-center max-w-4xl relative z-10">
                        {/* Heading */}
                        <h2 className="text-3xl md:text-5xl font-black text-[#262626] mb-6 uppercase tracking-tighter leading-none">
                            BEGIN YOUR <span className="text-[#E8453C]">DIVINE JOURNEY</span>
                        </h2>

                        {/* Divider with Star */}
                        <div className="flex items-center justify-center gap-4 mb-8">
                            <div className="w-12 h-1 bg-orange-200 rounded-full" />
                            <Sparkles className="w-5 h-5 text-orange-400" />
                            <div className="w-12 h-1 bg-orange-200 rounded-full" />
                        </div>

                        {/* Subtext */}
                        <p className="text-[#4B5563] text-sm md:text-base font-medium max-w-2xl mx-auto mb-10 leading-relaxed tracking-tight">
                            Book your personalized Vedic rituals and experience the profound impact of
                            authentic spiritual ceremonies performed with devotion.
                        </p>

                        {/* Buttons - Compact and Squared */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <button
                                onClick={() => {
                                    window.dispatchEvent(new CustomEvent('openPoojaDrawer', { detail: offering }));
                                }}
                                className="flex items-center justify-center gap-3 bg-[#E8453C] text-white px-8 py-3.5  font-black text-xs uppercase tracking-widest shadow-lg hover:brightness-110 transition-all w-full sm:w-60"
                            >
                                <MessageCircle size={18} />
                                <span>Book Puja Now</span>
                            </button>

                            <button
                                onClick={() => {
                                    if (!user) {
                                        navigate('/user_login/registeration');
                                    } else {
                                        setShowMuhuratModal(true);
                                    }
                                }}
                                className="flex items-center justify-center gap-3 bg-[#F59E0B] text-white px-8 py-3.5  font-black text-xs uppercase tracking-widest shadow-lg hover:brightness-110 transition-all w-full sm:w-60"
                            >
                                <Phone size={18} />
                                <span>Consult Expert</span>
                            </button>
                        </div>
                    </div>
                </section>

                {/* Modals from user demo */}


                {showMuhuratModal && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-2xl max-w-md w-full p-8 relative animate-scale-in">
                            <button onClick={() => setShowMuhuratModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-orange-600"><X size={24} /></button>
                            <h3 className="text-2xl font-black mb-6 uppercase">Muhurat <span className="text-orange-600">Consultation</span></h3>
                            <form onSubmit={handleMuhuratSubmit} className="space-y-4">
                                <input name="name" onChange={handleMuhuratChange} className="w-full border-2 border-gray-100 p-4 rounded-xl outline-none focus:border-orange-500 font-bold" placeholder="Your Name" required />
                                <input name="phone" onChange={handleMuhuratChange} className="w-full border-2 border-gray-100 p-4 rounded-xl outline-none focus:border-orange-500 font-bold" placeholder="Phone Number" required />
                                <div className="grid grid-cols-2 gap-4">
                                    <input name="dob" type="date" onChange={handleMuhuratChange} className="w-full border-2 border-gray-100 p-4 rounded-xl outline-none focus:border-orange-500 font-bold" required />
                                    <input name="time" type="time" onChange={handleMuhuratChange} className="w-full border-2 border-gray-100 p-4 rounded-xl outline-none focus:border-orange-500 font-bold" />
                                </div>
                                <input name="place" onChange={handleMuhuratChange} className="w-full border-2 border-gray-100 p-4 rounded-xl outline-none focus:border-orange-500 font-bold" placeholder="Place of Birth" required />
                                <button className="w-full py-4 bg-blue-900 text-white font-black uppercase tracking-widest hover:bg-black transition-all">Get consultation</button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default PujaDetails;
