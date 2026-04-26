import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Home, Clock, CheckCircle, Star, Phone, Calendar, Users, Shield, ArrowRight, X, Sparkles, Award, BookOpen, MapPin, Heart, Sparkle, ChevronRight, AlertCircle } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { useGetAllOfferingsQuery } from '@/services/pujaOfferingApi';
import { API_URL, BACKEND_URL } from '@/config/apiConfig';

import homeImg from "@/assets/grihaPraveshPuja/home_visit.webp"
import onlineImg from "@/assets/grihaPraveshPuja/online_puja.webp"
import muhuratImg from "@/assets/grihaPraveshPuja/muhurat.webp"

export default function GrihaPraveshPuja() {
  const { data: offerings = [], isLoading, isError } = useGetAllOfferingsQuery(undefined, { pollingInterval: 60000 });

  // Find the offering that matches Griha or Girha Pravesh
  const offering = offerings.find(o =>
    o.slug === 'griha-pravesh-puja' ||
    o.slug === 'girha-pravesh-puja' ||
    o.slug?.includes('pravesh') ||
    o.title?.toLowerCase().includes('pravesh') ||
    o.title?.toLowerCase().includes('pooja')
  );

  console.log('--- FOUND OFFERING DEBUG ---', {
    offerings_count: offerings.length,
    found_title: offering?.title,
    found_slug: offering?.slug,
    found_image: offering?.imageUrl
  });

  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showMuhuratModal, setShowMuhuratModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', city: '', preferredDate: '', pujaType: 'home', message: ''
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
            <p className="text-gray-500 font-medium text-lg leading-relaxed">Griha Pravesh Puja details are currently being updated by our Acharyas.</p>
          </div>
          <Link to="/" className="px-10 py-4 bg-blue-900 text-white font-black rounded-2xl shadow-xl shadow-blue-200 hover:bg-orange-600 transition-all uppercase tracking-widest text-xs">
            Return to Sanctuary
          </Link>
        </div>
      </Layout>
    );
  }

  const { title, shortDescription, longDescription, benefits } = offering;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    alert('Booking request submitted! Our team will contact you soon.');
    setShowBookingModal(false);
  };

  const handleMuhuratChange = (e) => {
    setMuhuratData({ ...muhuratData, [e.target.name]: e.target.value });
  };

  const handleMuhuratSubmit = (e) => {
    e.preventDefault();
    alert('Muhurat consultation request submitted! Our Acharya will contact you soon.');
    setShowMuhuratModal(false);
  };

  return (
    <Layout>
      <div className="min-h-[80vh]">
        <div className="min-h-screen bg-background">

          {/* Hero Section */}
          <section className="relative h-[320px] sm:h-[320px] md:h-[360px] lg:h-[370px] flex items-center pt-20 pb-6 text-white overflow-hidden">
            <div className="absolute inset-0">
              <img
                src={offering.imageUrl?.startsWith('http') ? offering.imageUrl : `${BACKEND_URL}${offering.imageUrl}`}
                alt={title}
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-black/40" />
            </div>
            <div className="container mx-auto px-4 relative z-10 w-full animate-fade-in-up">
              <div className="max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 mb-4 md:mb-8 shadow-2xl">
                  <Award className="w-4 h-4 text-[#FFC107]" />
                  <span className="text-[#FFC107] text-xs md:text-sm font-black uppercase tracking-widest">DIVINE SERVICES HUB</span>
                </div>
                <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)] uppercase">
                  {title.split(' ').slice(0, -1).join(' ')} <br />
                  <span className="text-yellow-300">{title.split(' ').slice(-1).join(' ')}</span>
                </h1>
                <p className="text-sm md:text-xl text-amber-100 leading-relaxed font-medium max-w-2xl mx-auto mb-6 md:mb-8 drop-shadow">
                  {shortDescription}
                </p>
              </div>
            </div>
          </section>

          {/* Intro Section */}
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
                    {benefits?.map((item) => (
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
                      <img src={offering.imageUrl?.startsWith('http') ? offering.imageUrl : `${BACKEND_URL}${offering.imageUrl}`} alt={title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
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

          {/* Offerings Section */}
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
                {(offering.serviceModes?.length > 0 ? offering.serviceModes : [
                  { title: "Home Visit Puja", points: ["Experienced Acharya", "Full Samagri Included", "Traditional Mantra Vidhi"], mode: 'Home Visit', image: homeImg },
                  { title: "Online Video Puja", points: ["Live Interactive Session", "Step-by-Step Guidance", "Global Accessibility"], mode: 'Online', image: onlineImg },
                  { title: "Muhurat Consultation", points: ["Personalized Kundli Check", "Nakshatra Alignment", "Exact Timing Guidance"], mode: 'Muhurat', image: muhuratImg }
                ]).map((service, idx) => (
                  <div key={idx} className="group/card h-full animate-fade-in-up" style={{ animationDelay: `${idx * 0.1}s`, animationFillMode: 'both' }}>
                    <div className="relative h-full p-[1.5px] rounded-3xl bg-amber-400/40 hover:bg-amber-500 transition-all duration-700 shadow-xl flex flex-col">
                      <div className="relative flex-grow bg-[#FCFBF7] rounded-[1.4rem] overflow-hidden flex flex-col group-hover/card:bg-white transition-all duration-500">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-amber-100/40 rounded-full blur-[80px] -mr-24 -mt-24" />

                        <div className="relative m-2.5 mb-3 rounded-2xl overflow-hidden shadow-lg h-36 md:h-44 z-10 flex items-center justify-center bg-amber-50 group-hover/card:bg-white transition-all duration-500">
                          <img
                            src={service.imageUrl ? (service.imageUrl.startsWith('http') ? service.imageUrl : `${BACKEND_URL}${service.imageUrl}`) : (service.mode?.toLowerCase().includes('online') ? onlineImg : service.mode?.toLowerCase().includes('muhurat') ? muhuratImg : homeImg)}
                            alt={service.title}
                            className="absolute inset-0 w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-[1.5s]"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#1A130F]/50 via-transparent to-transparent opacity-60" />
                        </div>

                        <div className="flex flex-col flex-grow px-4 pb-5 text-center relative z-20">
                          <h3 className="text-base md:text-lg font-black text-[#2A1D13] mb-1.5 tracking-wide uppercase transition-colors group-hover/card:text-amber-600">
                            {service.title}
                          </h3>
                          <div className="flex items-center justify-center gap-3 mb-4">
                            <div className="h-[1.5px] w-8 bg-gradient-to-r from-transparent via-amber-200 to-amber-500" />
                            <Sparkle className="w-5 h-5 text-amber-500 fill-amber-500/10" />
                            <div className="h-[1.5px] w-8 bg-gradient-to-l from-transparent via-amber-200 to-amber-500" />
                          </div>
                          <ul className="space-y-2 mb-5 text-left">
                            {service.points?.slice(0, 4).map((item, i) => (
                              <li key={i} className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-lg bg-amber-50 flex items-center justify-center flex-shrink-0 transition-all duration-500 group-hover/card:bg-amber-600">
                                  <CheckCircle className="w-3.5 h-3.5 text-amber-600 group-hover/card:text-white" />
                                </div>
                                <span className="text-xs font-bold text-[#4A3427]/80 group-hover/card:text-[#2A1D13]">{item}</span>
                              </li>
                            ))}
                          </ul>
                          <div className="mt-auto">
                            <button onClick={() => service.title.includes('Muhurat') ? setShowMuhuratModal(true) : setShowBookingModal(true)} className="group/btn relative w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#2A1D13] text-amber-400 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-500 hover:bg-orange-600 hover:text-white shadow-lg">
                              <span>Book Selection</span>
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

          {/* Why Choose Us - Using the boxy style from About Us */}
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
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                {[
                  { icon: Shield, title: "Verified Acharyas", desc: "Learned pandits with deep shastra knowledge." },
                  { icon: CheckCircle, title: "Complete Samagri", desc: "We provide everything needed for puja." },
                  { icon: Clock, title: "Punctual Service", desc: "Respecting your shubh muhurat timings." },
                  { icon: Heart, title: "Sacred Devotion", desc: "Every ritual performed with full sincerity." },
                  { icon: Sparkles, title: "Transparent Pricing", desc: "No hidden costs, clear donation slabs." },
                  { icon: Users, title: "Customer Support", desc: "Dedicated guidance for your spiritual journey." }
                ].map((item, idx) => (
                  <div key={idx} className="group bg-white p-5 md:p-6 transition-all duration-500 border-2 border-orange-100 flex items-start gap-4 md:gap-5 rounded-none relative overflow-hidden hover:shadow-[0_20px_40px_-15px_rgba(255,165,0,0.15)] animate-fade-in-up" style={{ animationDelay: `${idx * 0.1}s`, animationFillMode: 'both' }}>
                    <div className="absolute top-0 right-0 w-2 h-0 group-hover:h-full bg-orange-500 transition-all duration-500" />
                    <div className="w-16 h-16 bg-orange-50 flex items-center justify-center flex-shrink-0 group-hover:bg-orange-600 transition-all duration-500">
                      <item.icon className="w-8 h-8 text-orange-600 group-hover:text-white transition-all" />
                    </div>
                    <div>
                      <h3 className="text-xl font-extrabold text-[#4A3427] mb-2 leading-tight group-hover:text-orange-600 transition-colors">{item.title}</h3>
                      <p className="text-gray-500 text-sm font-semibold leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Belief Section Style - Simple but Deep */}
          <section className="py-12 md:py-16 bg-[#FFFCF5]">
            <div className="container mx-auto px-4 max-w-4xl text-center animate-fade-in-up">
              <h2 className="text-3xl md:text-4xl font-black text-[#4A3427] mb-6 uppercase tracking-widest">Ghar ka <span className="text-orange-600">Aashirwad</span></h2>
              <div className="relative flex justify-center items-center mb-8">
                <div className="absolute w-24 h-[1px] bg-orange-200 left-1/2 -translate-x-[160%]" />
                <div className="relative group">
                  <Shield className="w-16 h-16 text-orange-600/20" />
                  <Sparkles className="w-5 h-5 text-orange-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>
                <div className="absolute w-24 h-[1px] bg-orange-200 left-1/2 translate-x-[60%]" />
              </div>
              <div className="max-w-3xl mx-auto italic text-lg md:text-2xl text-gray-700 font-semibold leading-relaxed relative">
                <span className="text-5xl text-orange-100 absolute -top-4 -left-6 font-serif">"</span>
                Naye ghar mein pravesh sirf ek physical shift nahi hai, ye ek naye jeevan ki shuruaat hai. Hamara lakshya hai ki aapke naye ghar mein har kona sakaratmak urja se bhar jaye.
                <span className="text-5xl text-orange-100 absolute -bottom-10 -right-6 font-serif">"</span>
              </div>
            </div>
          </section>

          {/* Testimonials - Matching About Us deeply */}
          <section className="py-12 md:py-16 bg-white relative overflow-hidden">
            <div className="container mx-auto px-4 max-w-6xl relative z-10">
              <div className="text-center mb-16 animate-fade-in-up">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-50 text-green-700 rounded-full text-[10px] font-extrabold uppercase tracking-[0.2em] mb-4">
                  <Star className="w-3.5 h-3.5 fill-green-700" />
                  <span>Devotee Experiences</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-[#4A3427] mb-6">What Our <span className="text-orange-600">Yajamans Say</span></h2>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-12 h-1 bg-orange-200 rounded-full" /><Sparkles className="w-5 h-5 text-orange-400" /><div className="w-12 h-1 bg-orange-200 rounded-full" />
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
                {[
                  { name: "Rahul Deshmukh", text: "Acharya ji performed the puja with so much patience and explained every ritual. My home feels peaceful now.", location: "Pune, India" },
                  { name: "Sneha Kapur", text: "The online puja experience was surprisingly emotional and authentic. Excellent coordination and timing.", location: "London, UK" },
                  { name: "Vikram Negi", text: "Truly learned Acharya. The samagri list was perfect and the whole process was very systematic.", location: "Dehradun, India" }
                ].map((review, idx) => (
                  <div key={idx} className="bg-[#FFFDF7] p-6 md:p-7 border border-orange-100 shadow-lg rounded-2xl relative hover:border-orange-400 transition-all animate-fade-in-up" style={{ animationDelay: `${idx * 0.1}s`, animationFillMode: 'both' }}>
                    <div className="absolute -top-4 -left-2 text-6xl text-orange-100 font-serif">"</div>
                    <div className="flex gap-1 mb-4 relative z-10">
                      {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />)}
                    </div>
                    <p className="text-gray-600 font-medium text-sm mb-6 leading-relaxed italic relative z-10">"{review.text}"</p>
                    <div className="border-t border-orange-100 pt-4">
                      <h4 className="font-extrabold text-[#4A3427] text-sm uppercase">{review.name}</h4>
                      <p className="text-xs text-orange-600 font-semibold">{review.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section - Matching About Us deeply */}
          <section className="py-12 md:py-16 bg-white border-t border-orange-50">
            <div className="container mx-auto px-4 text-center max-w-5xl animate-fade-in-up">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2A1B13] mb-4 uppercase">Bless Your New <br /><span className="text-[#E8453C]">Aashiyana</span> Today</h2>
              <div className="flex items-center justify-center gap-3 mb-8">
                <div className="w-10 h-[1.5px] bg-orange-200" /><Sparkles className="w-5 h-5 text-orange-400" /><div className="w-10 h-[1.5px] bg-orange-200" />
              </div>
              <p className="text-gray-600 mb-10 text-sm md:text-base font-medium max-w-2xl mx-auto leading-relaxed">Don't compromise on your first entry. Book a verified Acharya for a shastra-based Griha Pravesh that brings success and health.</p>
              <div className="flex flex-wrap justify-center gap-4">
                <button onClick={() => setShowBookingModal(true)} className="group relative bg-[#E8453C] hover:bg-black text-white px-8 py-4 rounded-none font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <span className="relative flex items-center gap-2"><Calendar className="w-3.5 h-3.5" /> Book 2026 Muhurat</span>
                </button>
                <button onClick={() => setShowMuhuratModal(true)} className="group relative bg-[#F59E0B] hover:bg-black text-white px-7 py-4 rounded-none font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="absolute inset-0 bg-black/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <span className="relative flex items-center gap-2"><Phone className="w-3.5 h-3.5" /> Call Acharya Ji</span>
                </button>
              </div>
            </div>
          </section>

          {/* Booking Modal */}
          {showBookingModal && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
              <div className="absolute inset-0" onClick={() => setShowBookingModal(false)} />
              <div
                className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl relative animate-scale-in"
              >
                <div className="absolute top-0 right-0 w-4 h-4 bg-orange-600 rounded-tr-2xl" />
                <div className="p-8">
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="text-2xl font-black text-[#2A1D13] uppercase tracking-tight">Book <span className="text-orange-600">Griha Pravesh</span></h3>
                    <button onClick={() => setShowBookingModal(false)} className="text-gray-400 hover:text-orange-600 transition-colors">
                      <X size={24} />
                    </button>
                  </div>
                  <form onSubmit={handleBookingSubmit} className="space-y-5">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em] pl-1">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-white border border-gray-400 px-5 py-4 font-bold text-[#4A3427] focus:border-orange-500 outline-none transition-all placeholder:text-gray-300 rounded-none shadow-sm"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em] pl-1">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-white border border-gray-400 px-5 py-4 font-bold text-[#4A3427] focus:border-orange-500 outline-none placeholder:text-gray-300 rounded-none shadow-sm"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em] pl-1">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-white border border-gray-400 px-5 py-4 font-bold text-[#4A3427] focus:border-orange-500 outline-none placeholder:text-gray-300 rounded-none shadow-sm"
                        placeholder="your.email@example.com"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em] pl-1">City *</label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-white border border-gray-400 px-5 py-4 font-bold text-[#4A3427] focus:border-orange-500 outline-none placeholder:text-gray-300 rounded-none shadow-sm"
                          placeholder="Enter city"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em] pl-1">Puja Date *</label>
                        <input
                          type="date"
                          name="preferredDate"
                          value={formData.preferredDate}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-white border border-gray-400 px-5 py-4 font-normal text-[#4A3427] focus:border-orange-500 outline-none rounded-none shadow-sm"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em] pl-1">Puja Mode *</label>
                      <select
                        name="pujaType"
                        value={formData.pujaType}
                        onChange={handleInputChange}
                        className="w-full bg-white border border-gray-400 px-5 py-4 font-normal text-[#4A3427] focus:border-orange-500 outline-none rounded-none shadow-sm appearance-none"
                      >
                        <option value="home">Home Visit Puja</option>
                        <option value="online">Online Puja (Live Video)</option>
                      </select>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-orange-600 hover:bg-black text-white font-black text-xs uppercase tracking-[0.3em] py-5 shadow-2xl transition-all duration-300 rounded-none mt-4"
                    >
                      Confirm Booking Request
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* Muhurat Modal */}
          {showMuhuratModal && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
              <div className="absolute inset-0" onClick={() => setShowMuhuratModal(false)} />
              <div
                className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl relative animate-scale-in"
              >
                <div className="absolute top-0 right-0 w-4 h-4 bg-orange-600 rounded-tr-2xl" />
                <div className="p-8">
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="text-2xl font-black text-[#2A1D13] uppercase tracking-tight">Kumbh <span className="text-orange-600">Muhurat</span></h3>
                    <button onClick={() => setShowMuhuratModal(false)} className="text-gray-400 hover:text-orange-600 transition-colors">
                      <X size={24} />
                    </button>
                  </div>
                  <form onSubmit={handleMuhuratSubmit} className="space-y-5">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] pl-1">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={muhuratData.name}
                        onChange={handleMuhuratChange}
                        required
                        className="w-full bg-white border border-gray-200 px-5 py-4 font-bold text-[#4A3427] focus:border-orange-500 outline-none rounded-none shadow-sm"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] pl-1">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={muhuratData.phone}
                        onChange={handleMuhuratChange}
                        required
                        className="w-full bg-white border border-gray-200 px-5 py-4 font-bold text-[#4A3427] focus:border-orange-500 outline-none rounded-none shadow-sm"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] pl-1">Date of Birth *</label>
                        <input
                          type="date"
                          name="dob"
                          value={muhuratData.dob}
                          onChange={handleMuhuratChange}
                          required
                          className="w-full bg-white border border-gray-200 px-5 py-4 font-bold text-[#4A3427] focus:border-orange-500 outline-none rounded-none shadow-sm"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] pl-1">Time of Birth</label>
                        <input
                          type="time"
                          name="time"
                          value={muhuratData.time}
                          onChange={handleMuhuratChange}
                          className="w-full bg-white border border-gray-200 px-5 py-4 font-bold text-[#4A3427] focus:border-orange-500 outline-none rounded-none shadow-sm"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] pl-1">Place of Birth *</label>
                      <input
                        type="text"
                        name="place"
                        value={muhuratData.place}
                        onChange={handleMuhuratChange}
                        required
                        className="w-full bg-white border border-gray-200 px-5 py-4 font-bold text-[#4A3427] focus:border-orange-500 outline-none rounded-none shadow-sm"
                        placeholder="City, State"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-orange-600 hover:bg-black text-white font-black text-xs uppercase tracking-[0.3em] py-5 shadow-2xl transition-all duration-300 rounded-none mt-4"
                    >
                      Get Muhurat Consultation
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
