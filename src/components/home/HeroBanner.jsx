import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowRight, Sparkles, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useGetActiveBannersQuery } from '../../services/heroBannerApi';
import { BACKEND_URL, getImageUrl } from '../../config/apiConfig';

const HeroBanner = () => {
    const location = useLocation();
    const { data: bannersData, isLoading } = useGetActiveBannersQuery(undefined, {
        pollingInterval: 60000,
        refetchOnMountOrArgChange: true
    });

    // Helper to normalize paths for comparison
    const normalizePath = (path) => {
        if (!path) return '';
        let p = path.trim().toLowerCase();
        if (!p.startsWith('/')) p = '/' + p;
        if (p.endsWith('/') && p.length > 1) p = p.slice(0, -1);
        return p;
    };

    // Filter banners based on the current page path
    const banners = bannersData
        ? bannersData.filter(banner => {
            const currentPath = normalizePath(location.pathname);
            const bannerPath = normalizePath(banner.pagePath);
            // Smart Match: Exact or starts with (for dynamic segments)
            return bannerPath === currentPath || (currentPath.startsWith(bannerPath + '/') && bannerPath !== '/');
        })
        : [];

    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        if (banners.length > 1) {
            const intervalId = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % banners.length);
            }, 5000);
            return () => clearInterval(intervalId);
        }
    }, [banners]);

    // Fallback logic for different pages if no banner exists in database
    const getDefaultContent = (path) => {
        const defaults = {
            '/about': {
                badge: 'DIVINE SERVICES HUB',
                titleHighlight1: 'About Our',
                titleHighlight2: 'Divine',
                titleHighlight3: 'Journey',
                titleEnd: '',
                subtitle: 'Discover the story behind Acharya Ji Online — our mission to bring authentic Vedic traditions and spiritual guidance to seekers worldwide.',
                linkText: 'Learn More',
                linkUrl: '/about',
                imageUrl: null
            },
            '/career': {
                badge: 'DIVINE SERVICES HUB',
                titleHighlight1: 'Empowering Ancient',
                titleHighlight2: 'Traditions via',
                titleHighlight3: 'Modern',
                titleEnd: 'Expertise',
                subtitle: "Join India's most trusted spiritual network of learned Acharyas, Astrologers, and Wellness Experts dedicated to preserving Vedic wisdom.",
                linkText: 'Join Us',
                linkUrl: '#apply',
                imageUrl: null
            },
            '/gallery': {
                badge: 'DIVINE SERVICES HUB',
                titleHighlight1: 'Sacred Moments',
                titleHighlight2: '&',
                titleHighlight3: 'Divine',
                titleEnd: 'Rituals',
                subtitle: 'Experience the sanctity of Vedic traditions through our captured moments. Real pujas, real blessings, real spiritual journeys.',
                linkText: 'View Gallery',
                linkUrl: '/gallery',
                imageUrl: null
            },
            '/contact': {
                badge: 'DIVINE SERVICES HUB',
                titleHighlight1: 'Connect',
                titleHighlight2: 'With',
                titleHighlight3: 'Divine',
                titleEnd: 'Guidance',
                subtitle: 'Reach out to Acharya Ji for personalized consultations, puja bookings, or any spiritual queries. We are here to guide you.',
                linkText: 'Contact Us',
                linkUrl: '/contact',
                imageUrl: null
            }
        };
        return defaults[path] || {
            badge: 'Authentic Vedic Services',
            titleHighlight1: 'Experience',
            titleHighlight2: 'Divine',
            titleHighlight3: 'Blessings',
            titleEnd: 'At Your Doorstep',
            subtitle: 'Connect with sacred traditions through authentic rituals, expert consultations, and premium spiritual essentials delivered with devotion.',
            linkText: 'Explore Services',
            linkUrl: '/puja',
            imageUrl: null
        };
    };

    const activeBanner = banners.length > 0 ? banners[currentSlide] : getDefaultContent(location.pathname);
    const imageUrl = getImageUrl(activeBanner.imageUrl);

    return (
        <section className="relative w-full h-[60vh] min-h-[500px] lg:h-[75vh] flex items-start overflow-hidden bg-[#FAF9F6]">
            {/* Background Image with Gradient Overlay and Fade effect */}
            {banners.length > 0 ? (
                banners.map((banner, index) => (
                    <div
                        key={banner._id || index}
                        className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                    >
                        <img
                            src={getImageUrl(banner.imageUrl)}
                            alt="Vedic Temple Banner"
                            className="w-full h-full object-cover object-right lg:object-center bg-gray-200"
                        />
                        <div className="absolute inset-0 bg-black/10" />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent opacity-60" />
                    </div>
                ))
            ) : (
                <div className="absolute inset-0 z-0 bg-orange-50">
                    <div className="absolute inset-0 bg-black/10" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent opacity-60" />
                </div>
            )}

            <div className="container mx-auto px-6 relative z-10 lg:flex lg:items-center pt-8 md:pt-10 pb-20">
                <div key={currentSlide} className="max-w-2xl animate-fade-in-up">
                    {/* Animated Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 mb-6 shadow-2xl">
                        <Award className="w-4 h-4 text-[#FFC107]" />
                        <span className="text-[#FFC107] text-[10px] md:text-sm font-black uppercase tracking-widest">{activeBanner.badge}</span>
                    </div>

                    {/* Headline */}
                    <h1 className="text-3xl md:text-4xl lg:text-6xl font-extrabold text-[#2A1D13] leading-[1.1] mb-6 font-serif uppercase drop-shadow-sm">
                        {activeBanner.titleHighlight1}{' '}
                        <span className="text-[#E8453C]">{activeBanner.titleHighlight2}</span>{' '}
                        <span className="text-[#FFC107]">{activeBanner.titleHighlight3}</span>
                        {activeBanner.titleEnd ? ` ${activeBanner.titleEnd}` : ''}
                    </h1>

                    {/* Subheadline with Glassmorphism */}
                    <p className="text-sm md:text-base lg:text-lg text-white font-normal leading-relaxed max-w-xl p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl mb-4">
                        {activeBanner.subtitle}
                    </p>

                    {/* CTA Section */}
                    <div className="flex flex-wrap gap-4">
                        {activeBanner.buttons && activeBanner.buttons.length > 0 ? (
                            activeBanner.buttons.map((btn, idx) => (
                                btn.text && (
                                    <Link
                                        key={idx}
                                        to={btn.link || "#"}
                                        className={`group relative inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-base shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden ${idx === 0
                                            ? "bg-[#E8453C] text-white hover:shadow-[0_20px_40px_-10px_rgba(232,69,60,0.4)]"
                                            : "bg-white text-[#2A1D13] hover:bg-gray-50 shadow-white/10"
                                            }`}
                                    >
                                        <span className="relative z-10">{btn.text}</span>
                                        <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                                        <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                    </Link>
                                )
                            ))
                        ) : (activeBanner.linkText && (
                            <Link
                                to={activeBanner.linkUrl || "#"}
                                className="group relative inline-flex items-center gap-2 px-6 py-3 bg-[#E8453C] text-white rounded-full font-bold text-base shadow-xl hover:shadow-[0_20px_40px_-10px_rgba(232,69,60,0.4)] transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                            >
                                <span className="relative z-10">{activeBanner.linkText}</span>
                                <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Carousel Indicators */}
            {banners.length > 1 && (
                <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                    {banners.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-10 h-1.5 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-[#E8453C] w-16' : 'bg-white/50 hover:bg-white/80'
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            )}

            {/* Vedic Aesthetic Bottom Wave */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px] fill-[#FAF9F6]">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C57.21,103.42,115.42,115.24,173.12,108,232.61,100.55,282.72,70.9,321.39,56.44Z"></path>
                </svg>
            </div>
        </section>
    );
};

export default HeroBanner;
