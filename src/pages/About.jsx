import { useState } from "react";
import { Link } from "react-router-dom";
import * as PhosphorIcons from "lucide-react";
import { Layout } from '@/components/layout/Layout';
import { usePageBanner } from "@/hooks/usePageBanner";
import { BACKEND_URL, getImageUrl } from "@/config/apiConfig";
import { useGetAboutPageSettingsQuery, useGetActiveAboutPageItemsQuery } from "@/services/aboutPageApi";
import { useGetActiveTestimonialsQuery } from "@/services/testimonialApi";
import SEO from "@/components/layout/SEO";

import fallbackAbout from "../assets/aboutImage/acharyaji.webp"

const LucideIcon = ({ name, className }) => {
  const IconComponent = PhosphorIcons[name] || PhosphorIcons.Star;
  return <IconComponent className={className} />;
};

const AboutUs = () => {
  const banner = usePageBanner({ pollingInterval: 3000 });

  const { data: settings, isLoading: loadingSettings } = useGetAboutPageSettingsQuery(undefined, { pollingInterval: 3000 });
  const { data: servicesData, isLoading: loadingServices } = useGetActiveAboutPageItemsQuery('service', { pollingInterval: 3000 });
  const { data: whyChooseData, isLoading: loadingWhy } = useGetActiveAboutPageItemsQuery('whyChoose', { pollingInterval: 3000 });
  const { data: valuesData, isLoading: loadingValues } = useGetActiveAboutPageItemsQuery('value', { pollingInterval: 3000 });
  const { data: testimonialsData } = useGetActiveTestimonialsQuery(undefined, { pollingInterval: 3000 });

  if (loadingSettings || loadingServices || loadingWhy || loadingValues) {
    return (
      <Layout>
        <div className="min-h-[80vh] flex items-center justify-center">
          <span className="text-gray-500 font-bold">Loading About Page...</span>
        </div>
      </Layout>
    );
  }

  const services = servicesData || [];
  const whyChoose = whyChooseData || [];
  const values = valuesData || [];
  const testimonials = (testimonialsData || []).slice(0, 3); // Get up to 3 reviews

  return (
    <Layout>
      <SEO 
        pageName="about"
        title={banner.metaTitle} 
        description={banner.metaDescription} 
        keywords={banner.metaKeywords}
        canonical={banner.canonicalUrl}
      />
      <div className="min-h-[80vh]">
        <div className="min-h-screen bg-background">
          {/* Hero Section */}
          <section className="relative h-[320px] sm:h-[320px] md:h-[360px] lg:h-[370px] flex items-center py-[20px] text-white overflow-hidden">
            <div className="absolute inset-0">
              {banner.imageUrl ? (
                <img src={getImageUrl(banner.imageUrl)} alt={banner.imageAlt || "About Acharya Ji Online"} className="w-full h-full object-cover object-top" />
              ) : (
                <div className="absolute inset-0 bg-[#2A1D13]/90" />
              )}
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,rgba(217,119,6,0.2),transparent_50%)]" />
            </div>
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/30 mb-4 md:mb-7  shadow-2xl">
                  <PhosphorIcons.Award className="w-4 h-4 text-[#FFC107]" />
                  <span className="text-[#FFC107] text-xs md:text-sm font-black uppercase tracking-widest">{banner.badge}</span>
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)] uppercase">
                  {banner.titleHighlight1} <br />
                  <span className="text-yellow-300">{banner.titleHighlight2} {banner.titleHighlight3}</span> {banner.titleEnd}
                </h1>
                <p className="text-lg md:text-xl text-amber-100 leading-relaxed max-w-2xl mx-auto font-medium drop-shadow">
                  {banner.subtitle}
                </p>
              </div>
            </div>
          </section>

          {/* Our Sacred Journey */}
          <section className="py-12 md:py-16 overflow-x-hidden relative">
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-orange-100/30 rounded-full blur-3xl -z-10" />
            <div className="container mx-auto px-4">
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-center">
                <div className="lg:order-1 order-1 animate-slide-in-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-[11px] font-bold uppercase tracking-wider mb-5">
                    <PhosphorIcons.Sparkles className="w-3.5 h-3.5" />
                    <span>{settings.journeyBadge}</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 leading-tight">
                    {/* Simplified split by space. You can enhance it to split exactly but using raw title for dynamic fields. */}
                    {settings.journeyTitle}
                  </h2>
                  <div className="flex items-center gap-2 mb-5">
                    <div className="w-12 h-1 bg-orange-200 rounded-full" />
                    <PhosphorIcons.Sparkles className="w-5 h-5 text-orange-400" />
                    <div className="w-12 h-1 bg-orange-200 rounded-full" />
                  </div>
                  <div className="space-y-3 text-gray-700 font-medium text-sm md:text-base">
                    <p className="leading-relaxed">{settings.journeyDesc1}</p>
                    <p className="leading-relaxed">{settings.journeyDesc2}</p>
                  </div>
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    {settings.journeyFeatures?.map((item) => (
                      <div key={item} className="flex items-center gap-2.5">
                        <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                          <PhosphorIcons.CheckCircle className="w-3.5 h-3.5 text-orange-600" />
                        </div>
                        <span className="text-sm font-medium text-gray-800">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="relative group lg:order-2 order-2 flex justify-center animate-slide-in-right">
                  <div className="relative w-[96%] max-w-lg mx-auto p-1.5 md:p-2 bg-gradient-to-br from-amber-100 to-amber-300 rounded-[2rem] shadow-[0_20px_50px_-15px_rgba(217,119,6,0.25)] hover:shadow-[0_20px_50px_-15px_rgba(217,119,6,0.4)] transition-shadow duration-500">
                    <div className="absolute -inset-1 border border-amber-300 rounded-[2.2rem] -z-10 group-hover:bg-amber-100/30 transition-all duration-500" />
                    <div className="w-full h-[315px] sm:h-[375px] md:h-[445px] rounded-3xl overflow-hidden border-[3px] border-white relative z-10">
                      <img src={fallbackAbout} alt="Acharya Ji" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#2A1D13]/60 via-transparent to-transparent opacity-80" />
                    </div>
                    {/* Years of Experience Badge */}
                    <div className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 bg-white p-2.5 md:p-3 rounded-2xl shadow-xl border border-amber-100 z-20 flex items-center gap-3 group-hover:-translate-y-2 transition-transform duration-500">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-amber-50 flex items-center justify-center border border-amber-200 shadow-inner">
                        <span className="text-amber-600 font-extrabold text-sm md:text-lg">{settings.journeyExpYears}</span>
                      </div>
                      <div className="text-[10px] md:text-xs font-bold text-gray-800 leading-tight uppercase tracking-wide pr-2">
                        Years Of<br /><span className="text-amber-600">Experience</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* What We Offer */}
          <section className="py-12 md:py-16 bg-[#FAF9F6] relative overflow-hidden">
            {/* Subtle Temple Pattern Background */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #d97706 1px, transparent 0)', backgroundSize: '32px 32px' }} />
            <div className="container mx-auto px-4 max-w-7xl relative z-10">
              <div className="text-center mb-16 animate-fade-in-up">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 text-orange-600 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                  <PhosphorIcons.Star className="w-3.5 h-3.5" />
                  <span>{settings.offerBadge}</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">{settings.offerTitle}</h2>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-12 h-1 bg-orange-200 rounded-full" />
                  <PhosphorIcons.Sparkles className="w-5 h-5 text-orange-400" />
                  <div className="w-12 h-1 bg-orange-200 rounded-full" />
                </div>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8 max-w-[90rem] mx-auto">
                {services.map((service, idx) => (
                  <div
                    key={idx}
                    className="group/card h-full animate-fade-in-up"
                    style={{ animationDelay: `${idx * 0.1}s`, animationFillMode: 'both' }}
                  >
                    {/* Thin & Sharp Premium Border - Visible all sides */}
                    <div className="relative h-full p-[1.5px] rounded-3xl bg-amber-400/40 hover:bg-amber-500 transition-all duration-700 shadow-xl shadow-amber-200/10 hover:shadow-amber-200/30 flex flex-col">
                      <div className="relative flex-grow bg-[#FCFBF7] rounded-[1.4rem] overflow-hidden flex flex-col group-hover/card:bg-white transition-all duration-500">
                        {/* Divine Background Ornaments */}
                        <div className="absolute top-0 right-0 w-48 h-48 bg-amber-100/40 rounded-full blur-[80px] -mr-24 -mt-24 group-hover/card:bg-amber-400/20 transition-all duration-1000" />

                        {/* Compact Image Frame */}
                        <div className="relative m-2.5 mb-3 rounded-2xl overflow-hidden shadow-lg h-36 md:h-40 z-10 bg-gray-200">
                          {/* Note: since image strings are being used, you might want to properly host them or map them here */}
                          {service.image && (
                            <img
                              src={getImageUrl(service.image)}
                              alt={service.title}
                              onError={(e) => { e.target.src = fallbackAbout }}
                              className="w-full h-full object-cover transition-all duration-[2.5s] group-hover/card:scale-110 group-hover/card:rotate-1"
                            />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-[#1A130F]/80 via-transparent to-transparent opacity-60 group-hover/card:opacity-40 transition-opacity duration-700" />

                          {/* Corner Accents */}
                          <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-white/60 rounded-tl-xl group-hover/card:border-amber-400 transition-all duration-500" />
                          <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-white/40 rounded-br-xl group-hover/card:border-amber-400 transition-all duration-500" />
                        </div>

                        {/* Card Content (Compact) */}
                        <div className="flex flex-col flex-grow px-4 pb-5 text-center relative z-20">
                          <h3 className="text-base md:text-lg font-black text-[#2A1D13] mb-1.5 tracking-wide uppercase transition-colors group-hover/card:text-amber-600">
                            {service.title}
                          </h3>

                          {/* Refined Ornamental Divider */}
                          <div className="flex items-center justify-center gap-3 mb-4">
                            <div className="h-[1.5px] w-8 bg-gradient-to-r from-transparent via-amber-200 to-amber-500 group-hover/card:w-12 transition-all duration-700" />
                            <PhosphorIcons.Sparkle className="w-5 h-5 text-amber-500 fill-amber-500/10 group-hover/card:rotate-90 transition-transform duration-700" />
                            <div className="h-[1.5px] w-8 bg-gradient-to-l from-transparent via-amber-200 to-amber-500 group-hover/card:w-12 transition-all duration-700" />
                          </div>

                          <ul className="space-y-2 mb-5 text-left">
                            {service.items.slice(0, 3).map((item, i) => (
                              <li key={i} className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-lg bg-amber-50 flex items-center justify-center flex-shrink-0 transition-all duration-500 group-hover/card:bg-amber-600">
                                  <PhosphorIcons.CheckCircle className="w-3.5 h-3.5 text-amber-600 group-hover/card:text-white" />
                                </div>
                                <span className="text-xs font-bold text-[#4A3427]/80 group-hover/card:text-[#2A1D13] transition-colors">{item}</span>
                              </li>
                            ))}
                          </ul>

                          {/* Sleek Action Button */}
                          <div className="mt-auto">
                            <Link
                              to="/services"
                              className="group/btn relative w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#2A1D13] text-amber-400 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-500 hover:bg-amber-600 hover:text-white shadow-lg group-hover/card:-translate-y-1"
                            >
                              <span>Explore Details</span>
                              <PhosphorIcons.ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
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

          {/* Why Choose Us */}
          <section className="py-12 md:py-16 bg-[#FFFDF7] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-100/30 rounded-full blur-3xl -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-100/30 rounded-full blur-3xl -ml-32 -mb-32" />
            <div className="container mx-auto px-4 max-w-7xl relative z-10">
              <div className="text-center mb-16 animate-fade-in-up">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 text-orange-600 rounded-full text-[10px] font-extrabold uppercase tracking-[0.2em] mb-4">
                  <PhosphorIcons.Shield className="w-3.5 h-3.5" />
                  <span>{settings.whyChooseBadge}</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">{settings.whyChooseTitle}</h2>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-12 h-1 bg-orange-200 rounded-full" /><PhosphorIcons.Sparkles className="w-5 h-5 text-orange-400" /><div className="w-12 h-1 bg-orange-200 rounded-full" />
                </div>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                {whyChoose.map((item, idx) => (
                  <div key={idx} className="group bg-white p-5 md:p-6 hover:shadow-[0_20px_40px_-15px_rgba(255,165,0,0.15)] transition-all duration-500 border-2 border-orange-100 flex items-start gap-4 md:gap-5 rounded-none relative overflow-hidden animate-fade-in-up" style={{ animationDelay: `${idx * 0.1}s`, animationFillMode: 'both' }}>
                    <div className="absolute top-0 right-0 w-2 h-0 group-hover:h-full bg-orange-500 transition-all duration-500" />
                    <div className="w-16 h-16 rounded-none bg-orange-50 flex items-center justify-center flex-shrink-0 group-hover:bg-orange-600 transition-all duration-500 shadow-inner">
                      <LucideIcon name={item.icon} className="w-8 h-8 text-orange-600 group-hover:text-white transition-all transform group-hover:scale-110" />
                    </div>
                    <div>
                      <h3 className="text-xl font-extrabold text-[#4A3427] mb-2 leading-tight group-hover:text-orange-600 transition-colors">{item.title}</h3>
                      <p className="text-gray-500 text-sm font-semibold leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Core Values */}
          <section className="py-12 md:py-16 bg-white">
            <div className="container mx-auto px-4 max-w-6xl">
              <div className="text-center mb-16 animate-fade-in-up">
                <h2 className="text-3xl md:text-4xl font-black text-[#4A3427] mb-2">{settings.valuesTitle}</h2>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-12 h-1 bg-orange-200 rounded-full" />
                  <PhosphorIcons.Sparkles className="w-5 h-5 text-orange-400" />
                  <div className="w-12 h-1 bg-orange-200 rounded-full" />
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-4 md:gap-5 max-w-5xl mx-auto">
                {values.map((value, index) => (
                  <div key={value.title} className="bg-[#FFFAF3] p-4 py-6 text-center border-b-[6px] border-orange-500 shadow-md hover:shadow-2xl transition-all duration-500 rounded-none relative group overflow-hidden animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'both' }}>
                    <div className="absolute top-4 right-4 text-orange-200/50 group-hover:text-orange-400 transition-all duration-700"><PhosphorIcons.Sparkles className="w-5 h-5" /></div>
                    <div className="w-14 h-14 rounded-sm bg-white mx-auto mb-5 flex items-center justify-center shadow-md group-hover:shadow-xl transition-all duration-500 border border-orange-100/50 relative">
                      <div className="absolute inset-0 bg-orange-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left opacity-10" />
                      <LucideIcon name={value.icon} className="w-7 h-7 text-orange-600 group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <h3 className="text-lg font-black text-[#4A3427] mb-3 uppercase tracking-wider group-hover:text-orange-600 transition-colors">{value.title}</h3>
                    <p className="text-gray-600 font-semibold leading-relaxed text-xs">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-12 md:py-16 bg-[#FFFCF5]">
            <div className="container mx-auto px-4 max-w-4xl text-center">
              <div className="animate-fade-in-up">
                <h2 className="text-3xl md:text-4xl font-black text-[#4A3427] mb-6 uppercase tracking-widest">{settings.beliefTitle}</h2>

                {/* Center Icon Section */}
                <div className="relative flex justify-center items-center mb-8">
                  <div className="absolute w-24 h-[1px] bg-orange-200 left-1/2 -translate-x-[160%]" />
                  <div className="relative group">
                    <PhosphorIcons.Shield className="w-20 h-20 text-orange-600 opacity-10 absolute inset-0 -z-10 animate-pulse" />
                    <PhosphorIcons.Shield className="w-16 h-16 text-orange-600/20" />
                    <PhosphorIcons.Sparkles className="w-5 h-5 text-orange-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  </div>
                  <div className="absolute w-24 h-[1px] bg-orange-200 left-1/2 translate-x-[60%]" />
                </div>

                <div className="max-w-3xl mx-auto italic text-lg md:text-2xl text-gray-700 font-semibold leading-relaxed relative">
                  <span className="text-5xl text-orange-100 absolute -top-4 -left-6 font-serif">"</span>
                  {settings.beliefText}
                  <span className="text-5xl text-orange-100 absolute -bottom-10 -right-6 font-serif">"</span>
                </div>
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <section className="py-12 md:py-16 bg-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-50 rounded-full blur-3xl -mr-32 -mt-32" />
            <div className="container mx-auto px-4 max-w-6xl relative z-10">
              <div className="text-center mb-16 animate-fade-in-up">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-50 text-green-700 rounded-full text-[10px] font-extrabold uppercase tracking-[0.2em] mb-4">
                  <span className="flex items-center gap-1"><PhosphorIcons.Star className="w-3.5 h-3.5 fill-green-700" /> {settings.testimonialBadge}</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-[#4A3427] mb-6">{settings.testimonialTitle}</h2>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-12 h-1 bg-orange-200 rounded-full" /><PhosphorIcons.Sparkles className="w-5 h-5 text-orange-400" /><div className="w-12 h-1 bg-orange-200 rounded-full" />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
                {testimonials.map((review, idx) => (
                  <div key={idx} className="bg-[#FFFDF7] p-6 md:p-7 border border-orange-100 shadow-lg rounded-2xl relative animate-fade-in-up" style={{ animationDelay: `${idx * 0.1}s`, animationFillMode: 'both' }}>
                    <div className="absolute -top-4 -left-2 text-6xl text-orange-100 font-serif">"</div>
                    <div className="flex gap-1 mb-4 relative z-10">
                      {[...Array(review.rating || 5)].map((_, i) => <PhosphorIcons.Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />)}
                    </div>
                    <p className="text-gray-600 font-medium text-sm mb-6 leading-relaxed relative z-10 italic">"{review.feedback}"</p>
                    <div className="border-t border-orange-100 pt-4">
                      <h4 className="font-extrabold text-[#4A3427] text-sm">{review.name}</h4>
                      <p className="text-xs text-orange-600 font-semibold">{review.location || review.city || "Unknown"}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-12 md:py-16 bg-white border-t border-orange-50">
            <div className="container mx-auto px-4 text-center max-w-5xl">
              <div className="animate-fade-in-up">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2A1B13] mb-4 tracking-tight uppercase">
                  {settings.ctaTitle1} <span className="text-[#E8453C]">{settings.ctaHighlight}</span> {settings.ctaTitle2}
                </h2>
                <div className="flex items-center justify-center gap-3 mb-8">
                  <div className="w-10 h-[1.5px] bg-orange-200" />
                  <PhosphorIcons.Sparkles className="w-5 h-5 text-orange-400" />
                  <div className="w-10 h-[1.5px] bg-orange-200" />
                </div>
                <p className="text-gray-600 mb-10 text-sm md:text-base font-medium max-w-2xl mx-auto leading-relaxed">{settings.ctaDesc}</p>
                <div className="flex flex-wrap justify-center gap-4">
                  <button
                    onClick={() => window.dispatchEvent(new CustomEvent('openPoojaDrawer'))}
                    className="group relative bg-[#E8453C] hover:bg-[#CC3B34] text-white px-8 py-4 rounded-none font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] shadow-xl transition-all duration-300 overflow-hidden">
                    <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    <span className="relative flex items-center gap-2"><PhosphorIcons.Calendar className="w-3.5 h-3.5" /> Book Puja Now</span>
                  </button>
                  <Link to="/astrology">
                    <button className="group relative bg-[#F59E0B] hover:bg-[#D97706] text-white px-7 py-4 rounded-none font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] shadow-xl transition-all duration-300 overflow-hidden">
                      <div className="absolute inset-0 bg-black/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                      <span className="relative flex items-center gap-2"><PhosphorIcons.Phone className="w-3.5 h-3.5" /> Consult Expert</span>
                    </button>
                  </Link>
                  <Link to="/kundli">
                    <button className="group relative bg-[#1E293B] hover:bg-[#0F172A] text-white px-7 py-4 rounded-none font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] shadow-xl transition-all duration-300 overflow-hidden">
                      <div className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                      <span className="relative flex items-center gap-2"><PhosphorIcons.BookOpen className="w-3.5 h-3.5" /> Free Kundli</span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default AboutUs;

