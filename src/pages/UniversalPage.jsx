import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGetPageBySlugQuery } from '../services/universalContentApi';
import { Helmet } from 'react-helmet-async';
import { BACKEND_URL } from '../config/apiConfig';
import { 
    ArrowRight, 
    CheckCircle2, 
    MessageCircle, 
    HelpCircle,
    Loader2
} from 'lucide-react';

const UniversalPage = () => {
    const { slug } = useParams();
    const { data: response, isLoading, error } = useGetPageBySlugQuery(slug);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-orange-50/20">
                <div className="text-center space-y-4">
                    <Loader2 className="w-12 h-12 text-orange-600 animate-spin mx-auto" />
                    <p className="text-orange-900 font-medium">Aligning cosmic energies...</p>
                </div>
            </div>
        );
    }

    if (error || !response?.success || !response?.data) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white px-6">
                <div className="text-center max-w-md space-y-6">
                    <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                        <Loader2 className="w-12 h-12 text-orange-600 rotate-45" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900">Universe Not Found</h1>
                    <p className="text-gray-600">The path you seek does not exist in our current dimensions. Let us guide you back.</p>
                    <Link to="/" className="inline-flex items-center gap-2 bg-orange-600 text-white px-8 py-3 rounded-full font-bold hover:bg-orange-700 transition-all shadow-lg hover:shadow-orange-200">
                        Return Home
                    </Link>
                </div>
            </div>
        );
    }

    const page = response.data;

    return (
        <div className="bg-white min-h-screen">
            {/* SEO Metadata */}
            <Helmet>
                <title>{page.metadata?.title || 'Acharya Ji'}</title>
                <meta name="description" content={page.metadata?.description} />
                <meta name="keywords" content={page.metadata?.keywords} />
                <link rel="canonical" href={page.metadata?.canonicalUrl || window.location.href} />
                <meta property="og:title" content={page.metadata?.title} />
                <meta property="og:description" content={page.metadata?.description} />
                {page.heroSection?.image && <meta property="og:image" content={page.heroSection.image.startsWith('http') ? page.heroSection.image : `${BACKEND_URL}${page.heroSection.image}`} />}
            </Helmet>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-b from-orange-50 to-white">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            {page.heroSection?.badge && (
                                <span className="inline-block px-4 py-1.5 bg-orange-100 text-orange-700 rounded-full text-sm font-bold uppercase tracking-wider">
                                    {page.heroSection.badge}
                                </span>
                            )}
                            <h1 className="text-5xl md:text-6xl font-black text-gray-900 leading-tight">
                                {page.heroSection?.title}
                            </h1>
                            <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
                                {page.heroSection?.subtitle}
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link to="#content" className="bg-orange-600 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-orange-700 transition-all shadow-xl hover:shadow-orange-200">
                                    Explore More
                                </Link>
                                <button className="border-2 border-orange-200 text-orange-700 px-10 py-4 rounded-2xl font-bold text-lg hover:bg-orange-50 transition-all">
                                    Contact Us
                                </button>
                            </div>
                        </div>
                        <div className="relative group">
                            <div className="absolute -inset-4 bg-orange-200/50 rounded-3xl blur-2xl group-hover:bg-orange-300/50 transition-all duration-500"></div>
                            {page.heroSection?.image && (
                                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                                    {page.heroSection.image.endsWith('.mp4') ? (
                                        <video src={page.heroSection.image.startsWith('http') ? page.heroSection.image : `${BACKEND_URL}${page.heroSection.image}`} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                                    ) : (
                                        <img src={page.heroSection.image.startsWith('http') ? page.heroSection.image : `${BACKEND_URL}${page.heroSection.image}`} alt={page.heroSection.imageAlt} className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105" />
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                {/* Background Decor */}
                <div className="absolute top-20 right-0 w-96 h-96 bg-orange-100/30 rounded-full blur-[100px] -z-10"></div>
                <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-orange-100/30 rounded-full blur-[80px] -z-10"></div>
            </section>

            {/* Dynamic Content Blocks */}
            <section id="content" className="py-24 space-y-24">
                {page.sections?.map((section, idx) => (
                    <div key={idx} className="container mx-auto px-6">
                        <div className={`grid lg:grid-cols-2 gap-16 items-center ${section.layout === 'text-right' ? 'lg:flex-row-reverse' : ''} ${section.layout === 'full-width' ? 'lg:grid-cols-1' : ''}`}>
                            <div className={`space-y-6 ${section.layout === 'full-width' ? 'text-center max-w-4xl mx-auto' : ''}`}>
                                <h2 className="text-4xl font-bold text-gray-900 leading-tight">
                                    {section.title}
                                </h2>
                                <div 
                                    className="prose prose-lg prose-orange max-w-none text-gray-600 leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: section.content }}
                                />
                            </div>
                            {section.image && section.layout !== 'full-width' && (
                                <div className={`relative ${idx % 2 === 0 ? 'lg:order-first' : ''} ${section.layout === 'text-right' ? 'lg:order-last' : ''}`}>
                                    <div className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl relative z-10">
                                        <img src={section.image.startsWith('http') ? section.image : `${BACKEND_URL}${section.image}`} alt={section.imageAlt} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-orange-50 rounded-full -z-10 blur-3xl"></div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </section>

            {/* Features Grid */}
            {page.features?.length > 0 && (
                <section className="py-24 bg-gray-50">
                    <div className="container mx-auto px-6">
                        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                            <h2 className="text-4xl font-bold text-gray-900">Why Choose This Path?</h2>
                            <p className="text-lg text-gray-600">Discover the unique benefits and distinct features that set our offerings apart in the spiritual domain.</p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {page.features.map((feature, idx) => (
                                <div key={idx} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 hover:border-orange-200 hover:-translate-y-2 transition-all duration-300">
                                    <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 mb-6">
                                        <CheckCircle2 size={32} />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* FAQs Section */}
            {page.faqs?.length > 0 && (
                <section className="py-24 bg-white overflow-hidden relative">
                    <div className="container mx-auto px-6 relative z-10">
                        <div className="max-w-4xl mx-auto">
                            <div className="text-center mb-16 space-y-4">
                                <span className="text-orange-600 font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-2">
                                    <HelpCircle size={18} /> Enlightenment
                                </span>
                                <h2 className="text-4xl font-bold text-gray-900">Seeking Answers?</h2>
                            </div>
                            <div className="space-y-4">
                                {page.faqs.map((faq, idx) => (
                                    <details key={idx} className="group bg-gray-50 rounded-3xl overflow-hidden border border-transparent hover:border-orange-100 transition-all">
                                        <summary className="list-none p-8 flex justify-between items-center cursor-pointer font-bold text-xl text-gray-900 group-open:text-orange-600">
                                            {faq.question}
                                            <span className="transition-transform duration-300 group-open:rotate-180">
                                                <ArrowRight className="rotate-90" />
                                            </span>
                                        </summary>
                                        <div className="px-8 pb-8 pt-0 text-gray-600 leading-relaxed text-lg">
                                            {faq.answer}
                                        </div>
                                    </details>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="absolute -right-20 bottom-20 w-96 h-96 bg-orange-50 rounded-full blur-[100px] -z-10"></div>
                </section>
            )}

            {/* CTA Section */}
            {page.ctaSection?.title && (
                <section className="py-24">
                    <div className="container mx-auto px-6">
                        <div className="relative rounded-[3rem] overflow-hidden bg-[#1e293b] p-12 md:p-20 text-center text-white shadow-2xl">
                            <div className="absolute inset-0 opacity-20 pointer-events-none">
                                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500/30 via-transparent to-transparent"></div>
                                <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-500 rounded-full blur-[100px]"></div>
                            </div>
                            <div className="max-w-3xl mx-auto space-y-8 relative z-10">
                                <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                                    {page.ctaSection.title}
                                </h2>
                                <p className="text-xl text-slate-300">
                                    {page.ctaSection.description}
                                </p>
                                <div className="pt-4 flex flex-col md:flex-row items-center justify-center gap-6">
                                    {page.ctaSection.primaryBtnText && (
                                        <Link 
                                            to={page.ctaSection.primaryBtnLink} 
                                            className="w-full md:w-auto bg-orange-600 text-white px-12 py-5 rounded-2xl font-black text-xl hover:bg-orange-700 transition-all shadow-2xl shadow-orange-600/30 flex items-center justify-center gap-3"
                                        >
                                            {page.ctaSection.primaryBtnText}
                                            <ArrowRight />
                                        </Link>
                                    )}
                                    <button className="w-full md:w-auto flex items-center justify-center gap-2 text-lg font-bold hover:text-orange-400 transition-colors">
                                        <MessageCircle /> Talk to Achievement
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};

export default UniversalPage;
