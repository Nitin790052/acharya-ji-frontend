import React, { useState, useMemo } from 'react';
import {
  Clock, CheckCircle, MessageCircle, Users, Award, Star, Home, Video,
  Sparkles, Sparkle, Shield, Calendar, Phone, MapPin, ChevronRight, BookOpen, X,
  AlertCircle
} from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/slices/cartSlice";
import { Layout } from '@/components/layout/Layout';
import { usePageBanner } from "@/hooks/usePageBanner";
import { useGetAllOfferingsQuery } from "@/services/pujaOfferingApi";
import { useCreateBookingMutation } from "@/services/bookingApi";
import {
  useGetStepsQuery,
  useGetExpertsQuery,
  useGetSamagriQuery,
  useGetFAQsQuery
} from "@/services/bookPujaContentApi";
import { API_URL } from '@/config/apiConfig';
import { toast } from 'react-toastify';

const BACKEND_URL = API_URL.replace(/\/api\/?$/, '');

export default function BookPuja() {
  const navigate = useNavigate();
  const banner = usePageBanner({ pollingInterval: 3000 });

  // Dynamic Content Queries
  const { data: pujaServices = [] } = useGetAllOfferingsQuery(undefined, { pollingInterval: 3000 });
  const { data: dbSteps = [] } = useGetStepsQuery();
  const { data: dbExperts = [] } = useGetExpertsQuery();
  const { data: dbSamagri = [] } = useGetSamagriQuery();
  const { data: dbFAQs = [] } = useGetFAQsQuery();
  const [createBooking] = useCreateBookingMutation();

  // Mapping DB Steps to local format
  const bookingSteps = useMemo(() => {
    if (dbSteps && dbSteps.length > 0) {
      return [...dbSteps].sort((a, b) => (a.order || 0) - (b.order || 0)).map(s => ({
        n: s.number, t: s.title, s: s.subtitle, d: s.hindiTitle, f: s.fields || []
      }));
    }
    return [
      { n: "1", t: "Select Puja", s: "Browse catalog", d: "अपनी पूजा चुनें", f: [] },
      { n: "2", t: "Date & Time", s: "Pick a slot", d: "तारीख और समय", f: [] },
      {
        n: "3", t: "Provide Info", s: "Fill detail form", d: "जानकारी दें", f: [
          { name: "name", label: "Full Name", placeholder: "Karan Singh", type: "text", required: true },
          { name: "mobile", label: "Mobile Number", placeholder: "98XXXXXXXX", type: "tel", required: true },
          { name: "city", label: "City / Location", placeholder: "Mumbai", type: "text", required: true },
          { name: "message", label: "Personal Message", placeholder: "Any specific requirements for your puja?", type: "textarea", required: false }
        ]
      },
      { n: "4", t: "Priest Match", s: "Expert assigned", d: "आचार्य नियुक्ति", f: [] },
      { n: "5", t: "Ritual Done", s: "Divine blessings", d: "पूजा संपन्न", f: [] }
    ];
  }, [dbSteps]);

  const acharyas = dbExperts.length > 0 ? dbExperts : [
    { name: 'Pandit Raghunath Sharma', experience: '25+ years', expertise: 'Vedic Rituals & Havan', rating: 4.9 },
    { name: 'Acharya Vishwanath Joshi', experience: '18+ years', expertise: 'Graha Dosh & Puja', rating: 4.8 },
    { name: 'Pandit Hari Om Tiwari', experience: '20+ years', expertise: 'Marriage & Vivah Puja', rating: 4.9 }
  ];

  const samagriList = dbSamagri.length > 0 ? dbSamagri : [
    { title: "Samagri Included", subtitle: "सभी आवश्यक सामग्री शामिल", description: "Pure and authenticated samagri provided for every ritual type." },
    { title: "Verified Sources", subtitle: "आचार्य द्वारा व्यवस्था", description: "Directly sourced from trusted Vedic material suppliers." },
    { title: "On-Time Arrival", subtitle: "घर पर उपलब्धता", description: "Materials delivered to your doorstep 1 hour before the puja." }
  ];

  const dispatch = useDispatch();
  const [selectedPuja, setSelectedPuja] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '', mobile: '', city: '', pujaType: '', date: '', mode: '', message: ''
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validateStep = (step) => {
    let newErrors = {};
    const stepData = bookingSteps.find(s => Number(s.n) === Number(step));

    if (step === 1) {
      if (!formData.pujaType) newErrors.pujaType = "Please select a puja";
    } else if (step === 2) {
      if (!formData.date) newErrors.date = "Please select a date";
      if (!formData.mode) newErrors.mode = "Please select a mode";
    } else if (stepData && stepData.f && stepData.f.length > 0) {
      // Dynamic validation for steps with fields
      stepData.f.forEach(field => {
        if (field.required && !formData[field.name]) {
          newErrors[field.name] = `${field.label} is required`;
        }
        if (field.type === 'tel' && formData[field.name] && formData[field.name].length < 10) {
          newErrors[field.name] = "Valid mobile number is required";
        }
      });
    }

    // Safety check: if we are at step 3 and have no errors but fields are missing, something is wrong
    if (step === 3 && Object.keys(newErrors).length === 0 && (!stepData || stepData.f.length === 0)) {
      console.error("Step 3 data not found or has no fields. Blocking submit.");
      toast.error("Form configuration error. Please sync defaults in admin panel.");
      return false;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    console.log("Current Booking Steps Data:", bookingSteps);
    if (validateStep(currentStep)) {
      if (currentStep === 3) {
        // Automatically move to step 4 (Simulated match)
        setCurrentStep(4);
        handleSubmit();
      } else {
        setCurrentStep(prev => prev + 1);
      }
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handlePujaSelect = (puja) => {
    const token = localStorage.getItem("token");
    const cartItem = {
      id: puja._id,
      title: puja.title,
      price: puja.price || 1100,
      description: puja.shortDescription || puja.description,
      imageUrl: puja.imageUrl?.startsWith('http') ? puja.imageUrl : `${BACKEND_URL}${puja.imageUrl}`
    };

    if (token) {
      dispatch(addToCart(cartItem));
      navigate('/cart');
    } else {
      navigate('/user_login', { state: { returnTo: '/cart', addPujaToCart: cartItem } });
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    try {
      // Final sanity check
      if (!formData.name || !formData.mobile || !formData.city) {
        throw new Error("Core fields are missing. Please ensure Step 3 is correctly populated.");
      }
      console.log('Sending final booking data:', formData);
      await createBooking(formData).unwrap();
      setSubmitted(true);
      setCurrentStep(5);
      setTimeout(() => {
        setSubmitted(false);
        setShowBookingForm(false);
        setSelectedPuja(null);
        setCurrentStep(1);
        setFormData({
          name: '', mobile: '', city: '', pujaType: '', date: '', mode: '', message: ''
        });
      }, 4000);
    } catch (err) {
      console.error('Submit Error Details:', err);
      toast.error(err.message || err.data?.message || 'Booking failed. Please check all fields.');
      setCurrentStep(3); // Go back to form
    }
  };

  return (
    <Layout>
      <div className="min-h-[80vh]">
        <div className="min-h-screen bg-background">
          {/* Hero Section */}
          <section className="relative h-[320px] sm:h-[320px] md:h-[360px] lg:h-[370px] flex items-center pt-20 md:pt-7 lg:pt-7 pb-6 text-white overflow-hidden">
            <div className="absolute inset-0">
              {banner.imageUrl ? (
                <img src={`${BACKEND_URL}${banner.imageUrl}`} alt="Background" className="w-full h-full object-cover object-top" />
              ) : (
                <div className="absolute inset-0 bg-[#2A1D13]/90" />
              )}
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,rgba(217,119,6,0.2),transparent_50%)]" />
            </div>
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/30 mb-4 md:mb-8 shadow-2xl">
                  <Award className="w-4 h-4 text-[#FFC107]" />
                  <span className="text-[#FFC107] text-xs md:text-sm font-black uppercase tracking-widest">{banner.badge}</span>
                </div>
                <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)] uppercase text-center">
                  {banner.titleHighlight1} <br />
                  <span className="text-yellow-300">{banner.titleHighlight2} {banner.titleHighlight3}</span> {banner.titleEnd}
                </h1>
                <p className="text-sm md:text-xl text-amber-100 leading-relaxed max-w-2xl mx-auto font-medium drop-shadow mb-6 md:mb-10 text-center">
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
                              document.getElementById(btn.link.substring(1))?.scrollIntoView({ behavior: 'smooth' });
                            } else if (btn.link?.startsWith('http')) {
                              window.location.href = btn.link;
                            } else if (btn.link) {
                              navigate(btn.link);
                            }
                          }}
                          className={`group relative ${idx === 0 ? 'bg-[#E8453C] hover:bg-[#CC3B34]' : 'bg-[#2A1D13]/80 backdrop-blur-md border border-white/20 hover:bg-[#2A1D13]'} text-white px-6 py-3 md:px-10 md:py-4 font-black text-[10px] md:text-sm uppercase tracking-[0.2em] shadow-2xl transition-all duration-300 overflow-hidden rounded-none`}
                        >
                          <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                          <span className="relative flex items-center gap-1.5 md:gap-2 font-black">
                            {idx === 0 ? <Calendar className="w-4 h-4 md:w-5 md:h-5" /> : <Phone className="w-4 h-4 md:w-5 md:h-5 text-yellow-300" />} {btn.text}
                          </span>
                        </button>
                      )
                    ))
                  ) : (
                    <>
                      <button
                        onClick={() => window.dispatchEvent(new CustomEvent('openPoojaDrawer'))}
                        className="group relative bg-[#E8453C] hover:bg-[#CC3B34] text-white px-6 py-3 md:px-10 md:py-4 font-black text-[10px] md:text-sm uppercase tracking-[0.2em] shadow-2xl transition-all duration-300 overflow-hidden rounded-none"
                      >
                        <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        <span className="relative flex items-center gap-1.5 md:gap-2 font-black"><Calendar className="w-4 h-4 md:w-5 md:h-5" /> Book Puja Now</span>
                      </button>
                      <button
                        className="group relative bg-[#2A1D13]/80 backdrop-blur-md border border-white/20 hover:bg-[#2A1D13] text-white px-6 py-3 md:px-10 md:py-4 font-black text-[10px] md:text-sm uppercase tracking-[0.2em] shadow-2xl transition-all duration-300 rounded-none"
                      >
                        <span className="relative flex items-center gap-1.5 md:gap-2 font-black"><Phone className="w-4 h-4 md:w-5 md:h-5 text-yellow-300" /> Talk to Expert</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* How It Works Section */}
          <section className="py-12 md:py-16 bg-white relative overflow-hidden">
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-orange-100/30 rounded-full blur-3xl -z-10" />
            <div className="container mx-auto px-4 relative z-10">
              <div className="text-center mb-12 animate-fade-in-up">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50/50 text-orange-600 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Our Process</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#2A1B13] mb-4 uppercase tracking-tight">How It <span className="text-orange-600">Works</span></h2>
                <div className="flex items-center justify-center gap-3 mb-8">
                  <div className="w-10 h-[1.5px] bg-orange-200" />
                  <Sparkles className="w-5 h-5 text-orange-400" />
                  <div className="w-10 h-[1.5px] bg-orange-200" />
                </div>
              </div>

              <div className="relative max-w-5xl mx-auto">
                <div className="hidden md:block absolute top-10 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-orange-200 to-transparent"></div>
                <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-8 md:gap-4">
                  {bookingSteps.map((step, idx) => (
                    <div key={idx} className="relative flex flex-col items-center animate-fade-in-up" style={{ animationDelay: `${idx * 0.1}s`, animationFillMode: 'both' }}>
                      <div className="relative w-20 h-20 bg-gradient-to-br from-orange-50 to-amber-50 rounded-none flex flex-col items-center justify-center mb-5 border-4 border-white shadow-xl z-10">
                        <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">{step.n}</span>
                        {idx === 0 && <div className="absolute inset-0 rounded-none border-2 border-orange-300 animate-ping opacity-30"></div>}
                        {idx === 4 && (
                          <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-none flex items-center justify-center border-2 border-white shadow-md">
                            <CheckCircle className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="text-center">
                        <h3 className="font-bold text-[#4A3427] text-sm uppercase tracking-wider mb-1">{step.t}</h3>
                        <p className="text-orange-600 text-xs font-semibold mb-1">{step.d}</p>
                        <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">{step.s}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Puja Selection Section */}
          <section id="puja-selection" className="py-12 md:py-16 bg-[#FAF9F6] relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #d97706 1px, transparent 0)', backgroundSize: '32px 32px' }} />
            <div className="container mx-auto px-4 max-w-6xl relative z-10">
              <div className="text-center mb-12 animate-fade-in-up">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50/50 text-orange-600 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                  <Star className="w-3.5 h-3.5" />
                  <span>Divine Selection</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#2A1B13] mb-4 uppercase tracking-tight">Select Your <span className="text-orange-600">Puja Service</span></h2>
                <div className="flex items-center justify-center gap-3 mb-8">
                  <div className="w-10 h-[1.5px] bg-orange-200" />
                  <Sparkles className="w-5 h-5 text-orange-400" />
                  <div className="w-10 h-[1.5px] bg-orange-200" />
                </div>
              </div>

              <div className="relative">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-h-[1200px] overflow-y-auto pr-2 custom-scrollbar p-2">
                  {pujaServices.map((puja, idx) => (
                    <div
                      key={puja._id}
                      className="bg-white rounded-none shadow-xl hover:shadow-2xl border border-orange-100 hover:border-orange-400 transition-all duration-500 overflow-hidden flex flex-col group animate-fade-in-up"
                      style={{ animationDelay: `${idx * 0.1}s`, animationFillMode: 'both' }}
                    >
                      <div className="relative h-52 overflow-hidden shrink-0">
                        <img
                          src={puja.imageUrl?.startsWith('http') ? puja.imageUrl : `${BACKEND_URL}${puja.imageUrl}`}
                          alt={puja.title}
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90"></div>
                        <div className="absolute top-4 right-4 bg-orange-600 text-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] shadow-lg flex items-center gap-1.5">
                          <Star className="w-3 h-3 fill-white" /> Vedic
                        </div>
                        <div className="absolute bottom-6 left-6 right-6 text-left">
                          <h3 className="text-2xl font-bold text-white leading-tight uppercase tracking-tight group-hover:text-orange-300 transition-colors drop-shadow-lg">{puja.title}</h3>
                        </div>
                      </div>
                      <div className="p-6 flex flex-col flex-grow text-left">
                        <p className="text-gray-500 text-sm font-semibold mb-4 line-clamp-2 leading-relaxed italic">"{puja.shortDescription}"</p>
                        <div className="flex flex-col gap-3 mb-6">
                          <div className="flex items-center gap-2 text-xs font-bold text-[#4A3427] bg-[#FFFAF3] w-max px-3 py-1.5 border border-orange-100 uppercase tracking-widest">
                            <Clock className="w-4 h-4 text-orange-600" />
                            <span>{puja.duration}</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {(puja.serviceModes?.length > 0 ? puja.serviceModes : [{ mode: 'Home Visit' }]).map((sm, i) => (
                              <span key={i} className={`inline-flex items-center gap-1 text-[10px] font-black px-2.5 py-1 uppercase tracking-widest ${sm.mode === 'Online' ? 'bg-blue-50 text-blue-700 border border-blue-100' : 'bg-green-50 text-green-700 border border-green-100'}`}>
                                {sm.mode === 'Online' ? <Video className="w-3 h-3" /> : <Home className="w-3 h-3" />}
                                {sm.mode}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="mt-auto pt-5 border-t border-orange-50 flex items-center justify-between">
                          <div className="flex flex-col text-left">
                            <span className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mb-1">Starting From</span>
                            <span className="text-xl font-black text-[#2A1D13] uppercase">₹{puja.price}</span>
                          </div>
                          <div className="flex gap-2">
                            <Link
                              to={`/puja/${puja.slug}`}
                              className="bg-white border border-[#2A1D13] hover:bg-[#2A1D13] hover:text-white text-[#2A1D13] font-black text-[10px] uppercase tracking-wider px-4 py-3 transition-all duration-300 rounded-none no-underline"
                            >
                              Details
                            </Link>
                            <button
                              onClick={() => handlePujaSelect(puja)}
                              className="bg-[#E8453C] hover:bg-black text-white font-black text-[10px] uppercase tracking-wider px-4 py-3 shadow-lg transition-all duration-300 rounded-none"
                            >
                              Book Now
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {pujaServices.length > 6 && (
                  <div className="mt-6 text-center">
                    <div className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-orange-600 bg-orange-50 px-6 py-2.5 rounded-none shadow-sm animate-bounce cursor-default border border-orange-100">
                      <span>↓ Scroll for more services ↓</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Booking Modal */}
          {showBookingForm && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4">
              <div
                onClick={() => { if (currentStep < 4) setShowBookingForm(false); }}
                className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity"
              />

              <div
                className="relative w-full max-w-5xl bg-white shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col max-h-[98vh] md:max-h-[90vh] rounded-none animate-scale-in"
              >
                {/* Close Button */}
                {currentStep < 5 && (
                  <button
                    onClick={() => setShowBookingForm(false)}
                    className="absolute top-6 right-6 z-50 text-gray-400 hover:text-orange-600 transition-all p-2 bg-white/50 backdrop-blur-md border border-gray-100"
                  >
                    <X className="w-6 h-6" />
                  </button>
                )}

                <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
                  {/* Sidebar Info - Persistent Summary */}
                  <div className="hidden lg:flex w-80 bg-[#2A1D13] p-10 text-white flex-col relative overflow-hidden text-left">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/10 rounded-full -mr-16 -mt-16 blur-3xl opacity-50" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-600/10 rounded-full -ml-16 -mb-16 blur-3xl opacity-50" />

                    <div className="relative z-10 flex flex-col h-full">
                      <div className="w-14 h-14 bg-orange-600 flex items-center justify-center mb-10 shadow-xl border border-orange-500/20">
                        <Award className="w-7 h-7 text-white" />
                      </div>

                      <h3 className="text-2xl font-black mb-10 uppercase tracking-tighter border-b border-white/10 pb-6 flex items-center gap-3">
                        <Sparkle className="w-6 h-6 text-orange-500" />
                        Status
                      </h3>

                      <div className="space-y-10 flex-1">
                        <div className={`transition-all duration-500 ${currentStep >= 1 ? 'opacity-100 translate-x-0' : 'opacity-30 translate-x-4'}`}>
                          <p className="text-orange-400 text-[10px] font-black uppercase tracking-[0.3em] mb-2 flex items-center gap-2">
                            Selected Ritual
                          </p>
                          <p className="text-lg font-black text-white uppercase leading-tight tracking-tight">
                            {formData.pujaType || "Not Selected"}
                          </p>
                        </div>

                        <div className={`transition-all duration-500 delay-100 ${currentStep >= 2 ? 'opacity-100 translate-x-0' : 'opacity-30 translate-x-4'}`}>
                          <p className="text-orange-400 text-[10px] font-black uppercase tracking-[0.3em] mb-2 flex items-center gap-2">
                            Schedule
                          </p>
                          <div className="space-y-1">
                            <p className="text-sm font-bold text-white uppercase">{formData.date || "Date Not Set"}</p>
                            <p className="text-xs font-bold text-amber-200/60 uppercase tracking-widest">{formData.mode || "--"}</p>
                          </div>
                        </div>

                        <div className={`transition-all duration-500 delay-200 ${currentStep >= 3 ? 'opacity-100 translate-x-0' : 'opacity-30 translate-x-4'}`}>
                          <p className="text-orange-400 text-[10px] font-black uppercase tracking-[0.3em] mb-2 flex items-center gap-2">
                            Details
                          </p>
                          <p className="text-sm font-bold text-white uppercase">{formData.name || "Awaiting Info"}</p>
                          <p className="text-[10px] font-medium text-amber-100/50 uppercase tracking-widest mt-1">{formData.mobile}</p>
                        </div>
                      </div>

                      <div className="pt-10 border-t border-white/10 mt-auto">
                        <div className="flex items-center gap-3 text-orange-500 mb-2">
                          <CheckCircle className="w-4 h-4" />
                          <span className="text-[10px] font-black uppercase tracking-widest">Verified Expert Puja</span>
                        </div>
                        <p className="text-[9px] text-white/40 font-bold leading-relaxed uppercase tracking-wider">
                          Vedic Traditions • Modern Tech
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Main Interaction Area */}
                  <div className="flex-1 flex flex-col min-h-0 bg-[#FAF9F6]">
                    {/* Header Progress Header */}
                    <div className="bg-white border-b border-orange-100 p-6 md:p-8 shrink-0 shadow-sm relative z-20">
                      <div className="max-w-4xl mx-auto">
                        <div className="flex justify-between items-center mb-6 text-left">
                          <div>
                            <h2 className="text-xl md:text-2xl font-black text-[#2A1D13] uppercase tracking-normal">
                              {bookingSteps[currentStep - 1]?.t}
                            </h2>
                            <p className="text-orange-600 text-[10px] font-black uppercase tracking-[0.2em]">{bookingSteps[currentStep - 1]?.d}</p>
                          </div>
                          <div className="text-right">
                            <span className="text-2xl md:text-3xl font-black text-orange-100">{currentStep} / 5</span>
                          </div>
                        </div>

                        <div className="relative flex justify-between items-center">
                          <div className="absolute top-1/2 left-0 right-0 h-[1.5px] bg-orange-50 -translate-y-1/2 -z-10" />
                          <div
                            className="absolute top-1/2 left-0 h-[1.5px] bg-orange-500 -translate-y-1/2 transition-all duration-1000 -z-10"
                            style={{ width: `${Math.max(0, ((currentStep - 1) / 4) * 100)}%` }}
                          />

                          {bookingSteps.map((step, idx) => {
                            const stepNum = idx + 1;
                            const isActive = currentStep === stepNum;
                            const isCompleted = currentStep > stepNum;
                            return (
                              <div key={idx} className="relative group">
                                <div className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center transition-all duration-500 border-2 ${isActive ? 'bg-orange-600 border-orange-600 scale-110 shadow-lg' :
                                  isCompleted ? 'bg-orange-100 border-orange-100' : 'bg-white border-orange-50'
                                  }`}>
                                  {isCompleted ? (
                                    <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-orange-600" />
                                  ) : (
                                    <span className={`text-[10px] md:text-sm font-black ${isActive ? 'text-white' : 'text-orange-200'}`}>{step.n}</span>
                                  )}
                                </div>
                                <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 hidden lg:block w-max">
                                  <p className={`text-[8px] font-black uppercase tracking-[0.15em] ${isActive ? 'text-orange-600' : 'text-gray-300'}`}>
                                    {step.t}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Step Content Area */}
                    <div className="flex-1 overflow-y-auto p-6 md:p-14 custom-scrollbar text-left text-[#2A1D13]">
                      <div className="max-w-3xl mx-auto">
                        {currentStep === 1 && (
                          <div className="space-y-8 animate-fade-in-up">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              {pujaServices.map((puja) => (
                                <button
                                  key={puja._id}
                                  onClick={() => handlePujaSelect(puja)}
                                  className={`p-5 text-left transition-all duration-300 flex items-center gap-5 border-2 group relative overflow-hidden ${formData.pujaType === puja.title
                                    ? 'border-orange-500 bg-white shadow-xl'
                                    : 'border-white bg-white/50 hover:border-orange-100'
                                    }`}
                                >
                                  <div className="w-14 h-14 shrink-0 shadow-lg overflow-hidden border-2 border-white">
                                    <img src={puja.imageUrl?.startsWith('http') ? puja.imageUrl : `${BACKEND_URL}${puja.imageUrl}`} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                  </div>
                                  <div className="flex-1">
                                    <h4 className={`text-xs font-black uppercase tracking-tight transition-colors ${formData.pujaType === puja.title ? 'text-orange-600' : 'text-[#4A3427]'}`}>
                                      {puja.title}
                                    </h4>
                                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">₹{puja.price}</p>
                                  </div>
                                </button>
                              ))}
                            </div>
                            {errors.pujaType && <p className="text-red-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-2"><AlertCircle size={14} /> {errors.pujaType}</p>}
                            <div className="pt-10 flex justify-end">
                              <button onClick={nextStep} className="group bg-[#E8453C] hover:bg-black text-white font-black text-[10px] uppercase tracking-[0.25em] px-14 py-4 shadow-xl transition-all duration-500 flex items-center gap-3">
                                Ritual Choice <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                              </button>
                            </div>
                          </div>
                        )}

                        {currentStep === 2 && (
                          <div className="space-y-10 animate-fade-in-up">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                              <div className="space-y-3">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] flex items-center gap-2">
                                  <Calendar className="w-4 h-4 text-orange-600" /> Preferred Date *
                                </label>
                                <input
                                  type="date"
                                  name="date"
                                  min={new Date().toISOString().split('T')[0]}
                                  value={formData.date}
                                  onChange={handleChange}
                                  className={`w-full bg-white border-2 ${errors.date ? 'border-red-300' : 'border-orange-50'} px-6 py-5 font-black text-[#4A3427] text-sm focus:border-orange-500 outline-none transition-all`}
                                />
                                {errors.date && <p className="text-red-500 text-[10px] font-black uppercase tracking-widest">{errors.date}</p>}
                              </div>

                              <div className="space-y-3">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] flex items-center gap-2">
                                  <Shield className="w-4 h-4 text-orange-600" /> Puja Mode *
                                </label>
                                <div className="grid grid-cols-1 gap-3">
                                  {['Online', 'Home Visit'].map(mode => (
                                    <button
                                      key={mode}
                                      type="button"
                                      onClick={() => setFormData(prev => ({ ...prev, mode }))}
                                      className={`flex items-center gap-4 p-5 border-2 transition-all duration-300 ${formData.mode === mode
                                        ? 'border-orange-500 bg-white shadow-xl'
                                        : 'border-white bg-white/50 hover:border-orange-50'
                                        }`}
                                    >
                                      <div className={`w-10 h-10 flex items-center justify-center transition-all ${formData.mode === mode ? 'bg-orange-600 text-white' : 'bg-orange-50 text-orange-600'}`}>
                                        {mode === 'Online' ? <Video className="w-5 h-5" /> : <Home className="w-5 h-5" />}
                                      </div>
                                      <div className="text-left">
                                        <h4 className="text-[10px] font-black uppercase tracking-wider">{mode}</h4>
                                        <p className="text-[9px] text-gray-400 font-bold uppercase tracking-[0.1em] mt-0.5">{mode === 'Online' ? 'Sacred Video Call' : 'Acharya at Home'}</p>
                                      </div>
                                    </button>
                                  ))}
                                </div>
                                {errors.mode && <p className="text-red-500 text-[10px] font-black uppercase tracking-widest">{errors.mode}</p>}
                              </div>
                            </div>

                            <div className="pt-10 flex justify-between items-center border-t border-orange-50">
                              <button onClick={prevStep} className="text-gray-400 hover:text-orange-600 font-black text-[10px] uppercase tracking-[0.3em] flex items-center gap-2 transition-colors">
                                <ChevronRight className="w-4 h-4 rotate-180" /> Previous
                              </button>
                              <button onClick={nextStep} className="bg-[#E8453C] hover:bg-black text-white font-black text-[10px] uppercase tracking-[0.3em] px-14 py-4 shadow-xl transition-all flex items-center gap-3">
                                Set Schedule <ChevronRight className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                        )}

                        {currentStep === 3 && (
                          <div className="space-y-8 animate-fade-in-up">
                            <div className="space-y-6">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {(bookingSteps.find(s => Number(s.n) === 3)?.f || []).filter(f => f.type !== 'textarea').map((field, idx) => (
                                  <div key={idx} className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">{field.label} {field.required && '*'}</label>
                                    <div className="relative">
                                      {field.type === 'tel' ? <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-200" /> : <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-200" />}
                                      <input
                                        type={field.type === 'tel' ? 'tel' : 'text'}
                                        name={field.name}
                                        value={formData[field.name] || ''}
                                        onChange={handleChange}
                                        className={`w-full bg-white border-2 ${errors[field.name] ? 'border-red-300' : 'border-orange-50'} pl-12 pr-6 py-4 font-black text-[#4A3427] text-sm focus:border-orange-500 outline-none transition-all`}
                                        placeholder={field.placeholder}
                                      />
                                    </div>
                                    {errors[field.name] && <p className="text-red-500 text-[10px] font-black uppercase tracking-widest">{errors[field.name]}</p>}
                                  </div>
                                ))}
                              </div>

                              {/* Textarea fields */}
                              {(bookingSteps.find(s => Number(s.n) === 3)?.f || []).filter(f => f.type === 'textarea').map((field, idx) => (
                                <div key={idx} className="space-y-2">
                                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">{field.label} {field.required && '*'}</label>
                                  <div className="relative">
                                    <MessageCircle className="absolute left-4 top-6 w-4 h-4 text-orange-200" />
                                    <textarea
                                      name={field.name}
                                      value={formData[field.name] || ''}
                                      onChange={handleChange}
                                      rows="3"
                                      className={`w-full bg-white border-2 ${errors[field.name] ? 'border-red-300' : 'border-orange-50'} pl-12 pr-6 py-4 font-black text-[#4A3427] text-sm focus:border-orange-500 outline-none transition-all resize-none font-medium`}
                                      placeholder={field.placeholder}
                                    ></textarea>
                                  </div>
                                  {errors[field.name] && <p className="text-red-500 text-[10px] font-black uppercase tracking-widest">{errors[field.name]}</p>}
                                </div>
                              ))}
                            </div>

                            <div className="pt-10 flex justify-between items-center border-t border-orange-50">
                              <button onClick={prevStep} className="text-gray-400 hover:text-orange-600 font-black text-[10px] uppercase tracking-[0.3em] flex items-center gap-2 transition-colors">
                                <ChevronRight className="w-4 h-4 rotate-180" /> Previous
                              </button>
                              <button onClick={nextStep} className="bg-orange-600 hover:bg-black text-white font-black text-[10px] uppercase tracking-[0.3em] px-14 py-4 shadow-xl transition-all flex items-center gap-3">
                                Final Review <ChevronRight className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                        )}

                        {currentStep === 4 && (
                          <div className="h-full flex flex-col items-center justify-center text-center py-10 animate-fade-in">
                            <div className="relative mb-12">
                              <div className="w-40 h-40 bg-orange-50/50 rounded-full flex items-center justify-center animate-[spin_10s_linear_infinite] border-4 border-dashed border-orange-200">
                                <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-lg">
                                  <Users className="w-16 h-16 text-orange-600 animate-pulse" />
                                </div>
                              </div>
                              <div className="absolute -top-2 -right-2 w-10 h-10 bg-white rounded-none flex items-center justify-center shadow-lg border border-orange-100 animate-bounce">
                                <Shield className="w-5 h-5 text-orange-600" />
                              </div>
                            </div>
                            <h2 className="text-2xl font-black text-[#2A1D13] uppercase tracking-tighter mb-4">
                              {bookingSteps[3]?.t || "Assigning Verified Acharya"}
                            </h2>
                            <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.3em] max-w-sm mx-auto leading-relaxed">
                              {bookingSteps[3]?.s || `Matching the most qualified specialist for your ${formData.pujaType}...`}
                            </p>

                            <div className="mt-16 bg-white p-5 border border-orange-50 inline-flex items-center gap-4">
                              <span className="flex gap-1.5">
                                <span className="w-2.5 h-2.5 bg-orange-600 animate-bounce" style={{ animationDelay: '0s' }}></span>
                                <span className="w-2.5 h-2.5 bg-orange-600 animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                                <span className="w-2.5 h-2.5 bg-orange-600 animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                              </span>
                              <span className="text-[9px] font-black uppercase text-orange-600 tracking-[0.2em]">{bookingSteps[3]?.d || "Locating Expert"}</span>
                            </div>
                          </div>
                        )}

                        {currentStep === 5 && (
                          <div className="h-full flex flex-col items-center justify-center text-center py-10 animate-fade-in-up">
                            <div className="w-32 h-32 bg-green-50 rounded-full flex items-center justify-center mb-10 shadow-inner relative">
                              <CheckCircle className="w-20 h-20 text-green-600 animate-[bounce_2s_ease-in-out_infinite]" />
                              <div className="absolute inset-0 border-4 border-green-500/20 rounded-full animate-ping opacity-10" />
                            </div>

                            <h2 className="text-3xl md:text-4xl font-black text-[#2A1D13] uppercase tracking-tighter mb-8 bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
                              {bookingSteps[4]?.t || "Booking Confirmed!"}
                            </h2>

                            <div className="space-y-4 mb-10">
                              <p className="text-[#4A3427] font-black text-lg md:text-xl leading-relaxed uppercase">
                                {bookingSteps[4]?.d || "आपकी पूजा सफलतापूर्वक बुक हो गई है।"}
                              </p>
                              <div className="w-16 h-[2px] bg-orange-600 mx-auto" />
                              <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em] max-w-md mx-auto leading-relaxed">
                                {bookingSteps[4]?.s || `Our spiritual desk will reach you at ${formData.mobile} within 15-30 minutes to confirm final schedule details.`}
                              </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-sm">
                              <div className="bg-white p-5 border border-orange-50 flex flex-col items-center">
                                <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Ritual ID</p>
                                <p className="text-xs font-black text-[#2A1D13] tracking-tighter uppercase">#{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                              </div>
                              <button
                                onClick={() => setShowBookingForm(false)}
                                className="bg-[#2A1D13] hover:bg-black text-white p-5 flex items-center justify-center text-[10px] font-black uppercase tracking-[0.2em] transition-all group"
                              >
                                Exit Dashboard <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Puja Samagri Section */}
          <section className="py-12 md:py-16 bg-[#FFFDF7] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-100/30 rounded-full blur-3xl -mr-32 -mt-32" />
            <div className="container mx-auto px-4 max-w-6xl relative z-10">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50/50 text-orange-600 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Sacred Materials</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-[#2A1B13] mb-4 uppercase tracking-tight">Pure <span className="text-orange-600">Puja Samagri</span></h2>
                <div className="flex items-center justify-center gap-3">
                  <div className="w-10 h-[1.5px] bg-orange-200" />
                  <Sparkles className="w-5 h-5 text-orange-400" />
                  <div className="w-10 h-[1.5px] bg-orange-200" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {samagriList.map((item, idx) => (
                  <div key={idx} className="bg-white p-8 border border-orange-100 shadow-xl shadow-orange-900/5 hover:border-orange-500 transition-all duration-500 group rounded-none text-left">
                    <div className="w-14 h-14 bg-orange-50 flex items-center justify-center mb-6 group-hover:bg-orange-600 group-hover:text-white transition-all rounded-none">
                      <Shield className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-black text-[#2A1D13] mb-2 uppercase tracking-tight leading-tight">{item.title}</h3>
                    <p className="text-orange-600 text-[10px] font-black uppercase tracking-[0.2em] mb-4">{item.subtitle}</p>
                    <p className="text-gray-400 text-xs font-medium leading-relaxed italic">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-12 md:py-16 bg-[#FAF9F6]">
            <div className="container mx-auto px-4 max-w-6xl">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-black text-[#2A1B13] mb-4 uppercase tracking-tight">Booking <span className="text-orange-600">FAQs</span></h2>
                <div className="flex items-center justify-center gap-3 mb-8">
                  <div className="w-10 h-[1.5px] bg-orange-200" />
                  <MessageCircle className="w-5 h-5 text-orange-400" />
                  <div className="w-10 h-[1.5px] bg-orange-200" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                {(dbFAQs.length > 0 ? dbFAQs : [
                  { question: "Online puja kaise hoti hai?", answer: "Online puja में आचार्य जी video call के माध्यम से पूजा करते हैं। आप अपने घर से ही देख सकते हैं और पूजा में शामिल हो सकते हैं।" },
                  { question: "Home visit puja में क्या include होता है?", answer: "Home visit में आचार्य जी आपके घर आकर पूजा करते हैं। सभी आवश्यक सामग्री और पूजा की पूर्ण विधि शामिल है।" },
                  { question: "Kitne din pehle book karna chahiye?", answer: "सामान्य पूजा के लिए 2-3 दिन पहले और विशेष आयोजनों के लिए 7-10 दिन पहले बुक करना बेहतर है।" },
                  { question: "Puja के बाद क्या follow karna hota hai?", answer: "आचार्य जी पूजा के बाद आपको प्रसाद और विशेष आशीर्वाद निर्देश देंगे जिनका पालन करना शुभ होता है।" }
                ]).map((faq, idx) => (
                  <div
                    key={idx}
                    className={`group bg-white p-8 border border-orange-100 hover:border-orange-500 transition-all duration-500 relative rounded-none animate-fade-in-${idx % 2 === 0 ? 'left' : 'right'}`}
                  >
                    <div className="absolute top-0 right-0 w-8 h-8 bg-orange-50 flex items-center justify-center group-hover:bg-orange-600 transition-colors rounded-none" />
                    <h3 className="text-base font-bold text-[#4A3427] mb-2 uppercase tracking-tight leading-tight group-hover:text-orange-600 transition-colors">"{faq.question}"</h3>
                    <p className="text-gray-400 text-[10px] font-semibold uppercase tracking-[0.15em] leading-relaxed italic">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Final CTA Section */}
          <section className="py-12 md:py-16 bg-white border-t border-orange-50">
            <div className="container mx-auto px-4 text-center max-w-5xl">
              <div className="animate-fade-in-up">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50/50 text-orange-600 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Sacred Connections</span>
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2A1B13] mb-4 tracking-tight uppercase">Begin Your <span className="text-[#E8453C]">Divine Journey</span></h2>
                <div className="flex items-center justify-center gap-3 mb-8">
                  <div className="w-10 h-[1.5px] bg-orange-200" />
                  <Sparkles className="w-5 h-5 text-orange-400" />
                  <div className="w-10 h-[1.5px] bg-orange-200" />
                </div>
                <p className="text-gray-600 mb-10 text-sm md:text-base font-medium max-w-2xl mx-auto leading-relaxed">
                  Experience the sacred traditions with digital convenience and ancient wisdom. Book your personalized Vedic rituals today.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <button
                    onClick={() => window.dispatchEvent(new CustomEvent('openPoojaDrawer'))}
                    className="group relative bg-[#E8453C] hover:bg-[#CC3B34] text-white px-10 py-4 rounded-none font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] shadow-xl transition-all duration-300 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    <span className="relative z-10 flex items-center gap-3"><Calendar className="w-5 h-5" /> Book Now</span>
                  </button>
                  <button className="group relative bg-white hover:bg-orange-50 text-[#F59E0B] border-2 border-[#F59E0B] px-10 py-4 rounded-none font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] transition-all duration-300 overflow-hidden">
                    <span className="relative flex items-center gap-3"><Phone className="w-5 h-5" /> Contact Us</span>
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #FFFAF3; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #FFC107; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #E8453C; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
      `}</style>
    </Layout>
  );
}
