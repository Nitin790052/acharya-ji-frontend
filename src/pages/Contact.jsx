import React, { useState } from 'react';
import {
  Phone, Mail, MessageCircle, MapPin, Clock, Globe, Send,
  CheckCircle, Award, Sparkles, ChevronDown
} from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { usePageBanner } from "@/hooks/usePageBanner";
import { BACKEND_URL, getImageUrl } from "@/config/apiConfig";
import { useGetContactSettingsQuery } from "@/services/contactApi";
import SEO from "@/components/layout/SEO";


export default function ContactPage() {
  const banner = usePageBanner({ pollingInterval: 60000 });
  const { data: contactSettings, isLoading } = useGetContactSettingsQuery();

  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        mobile: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 4000);
  };

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const getIcon = (type) => {
    switch (type) {
      case 'phone': return Phone;
      case 'message': return MessageCircle;
      case 'award': return Award;
      case 'mail': return Mail;
      default: return Phone;
    }
  };

  const quickContacts = contactSettings?.quickContacts || [
    { title: 'Call / WhatsApp', desc: 'Talk to our support team directly.', icon: Phone, action: '+91 98765 43210' },
    { title: 'Talk to Astrologer', desc: 'Instant or scheduled consultation.', icon: MessageCircle, action: 'Book Now' },
    { title: 'Book Puja', desc: 'Online or home-visit puja booking.', icon: Award, action: 'Book Puja' },
    { title: 'Email Support', desc: 'Detailed queries & documents.', icon: Mail, action: 'support@acharyajionline.com' }
  ];

  const supportInfo = contactSettings?.supportInfo || {
    location: 'Delhi NCR, India',
    supportHours1: 'Monday - Sunday',
    supportHours2: '8 AM - 10 PM',
    serviceArea: 'Pan-India & International (Online)'
  };

  const commitments = contactSettings?.commitments || [
    "100% Confidentiality",
    "No spam calls",
    "Authentic Guidance",
    "Transparent pricing"
  ];

  const mapEmbedUrl = contactSettings?.mapEmbedUrl || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.83923192776!2d77.06889754720782!3d28.52758200617607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x52c2b7494e204dce!2sNew%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1709999999999!5m2!1sen!2sin";

  const faqs = [
    { q: "How soon will I get a callback?", a: "Hum 24 hours ke andar aapko contact karenge. Urgent cases ke liye directly call ya WhatsApp karein." },
    { q: "Is online puja as effective?", a: "Ji haan, hamare experienced Acharyas Vedic rituals ko poori shraddha aur accuracy ke saath perform karte hain. Aapka sankalp aur vishwas sabse important hai." },
    { q: "How are astrologers verified?", a: "Hamare sabhi astrologers experienced hain aur verified certifications ke saath. Unke profile check kar sakte hain." },
    { q: "Can I book puja for parents / family?", a: "Bilkul! Aap apne parivar ke kisi bhi sadasya ke liye puja book kar sakte hain. Bas unki details provide karni hogi." }
  ];

  return (
    <Layout>
      <SEO pageName="contact" title="Contact Us | Acharya Ji Online" />
      <div className="min-h-screen bg-background">

        {/* Hero Section */}
        <section className="relative h-[320px] sm:h-[320px] md:h-[360px] lg:h-[370px] flex items-center py-[20px] text-white overflow-hidden">
          <div className="absolute inset-0">
            {banner.imageUrl ? (
              <img src={getImageUrl(banner.imageUrl)} alt="Background" className="w-full h-full object-cover object-top" />
            ) : (
              <div className="absolute inset-0 bg-[#2A1D13]/90" />
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,rgba(217,119,6,0.2),transparent_50%)]" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 mb-4 md:mb-8 shadow-2xl">
                <Award className="w-4 h-4 text-[#FFC107]" />
                <span className="text-[#FFC107] text-xs md:text-sm font-black uppercase tracking-widest">{banner.badge}</span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)] uppercase">
                {banner.titleHighlight1} <br />
                <span className="text-yellow-300">{banner.titleHighlight2} {banner.titleHighlight3}</span> {banner.titleEnd}
              </h1>
              <p className="text-lg md:text-xl text-amber-100 leading-relaxed font-medium max-w-2xl mx-auto mb-4 md:mb-7 drop-shadow">
                {banner.subtitle}
              </p>
            </div>
          </div>
        </section>

        {/* Quick Contact Options - Matching Career Page Grid UI */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
              {quickContacts.map((value, index) => {
                const IconComponent = value.icon || getIcon(value.iconType);
                return (
                  <div
                    key={value.title}
                    className="bg-[#FFFAF3] p-4 py-8 text-center border-b-[6px] border-orange-500 shadow-md hover:shadow-2xl transition-all duration-500 rounded-none relative group overflow-hidden flex flex-col items-center animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'both' }}
                  >
                    <div className="absolute top-4 right-4 text-orange-200/50 group-hover:text-orange-400 transition-all duration-700"><Sparkles className="w-5 h-5" /></div>
                    <div className="w-14 h-14 rounded-sm bg-white mx-auto mb-5 flex items-center justify-center shadow-md group-hover:shadow-xl transition-all duration-500 border border-orange-100/50 relative">
                      <div className="absolute inset-0 bg-orange-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left opacity-10" />
                      <IconComponent className="w-7 h-7 text-orange-600 group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <h3 className="text-lg font-black text-[#4A3427] mb-3 uppercase tracking-wider group-hover:text-orange-600 transition-colors">{value.title}</h3>
                    <p className="text-gray-600 font-semibold leading-relaxed text-xs mb-4 flex-grow">{value.desc}</p>
                    <span className="text-orange-600 font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] cursor-pointer hover:underline">{value.action}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Main Content Grid */}
        <section className="py-12 md:py-16 bg-[#FAF9F6]">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

              {/* Contact Form - Matching About/Career Page UI */}
              <div className="lg:col-span-2">
                <div className="bg-white p-6 md:p-12 border-t-[8px] border-orange-600 shadow-2xl rounded-none relative overflow-hidden h-full animate-fade-in-up">
                  <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 px-4 py-1 bg-orange-50 text-orange-600 rounded-full text-[10px] font-bold uppercase tracking-wider mb-4 border border-orange-100">
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Message</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black text-[#2A1D13] mb-4 uppercase tracking-tight">Send Your <span className="text-orange-600">Query</span></h2>
                    <div className="flex items-center justify-center gap-2 mb-8">
                      <div className="w-12 h-1 bg-orange-200 rounded-full" /><Sparkles className="w-5 h-5 text-orange-400" /><div className="w-12 h-1 bg-orange-200 rounded-full" />
                    </div>
                  </div>

                  {submitted && (
                    <div className="mb-8 bg-green-50 border-2 border-green-500 text-green-800 px-6 py-4 rounded-xl flex items-center gap-4 animate-fade-in">
                      <CheckCircle className="w-6 h-6 text-green-600 shrink-0" />
                      <p className="text-xs font-bold uppercase tracking-wider">Query Sent! Our team will contact you shortly.</p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-[10px] font-black text-[#4A3427] uppercase tracking-widest mb-2">Full Name <span className="text-red-500">*</span></label>
                      <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-5 py-4 rounded-xl bg-[#FAF9F6] border-2 border-orange-100 focus:border-orange-500 focus:outline-none transition-all font-bold text-sm" placeholder="Your full name" required />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[10px] font-black text-[#4A3427] uppercase tracking-widest mb-2">Mobile Number <span className="text-red-500">*</span></label>
                        <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} pattern="[0-9]{10}" className="w-full px-5 py-4 rounded-xl bg-[#FAF9F6] border-2 border-orange-100 focus:border-orange-500 focus:outline-none transition-all font-bold text-sm" placeholder="10 Digit Number" required />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-[#4A3427] uppercase tracking-widest mb-2">Email (Optional)</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-5 py-4 rounded-xl bg-[#FAF9F6] border-2 border-orange-100 focus:border-orange-500 focus:outline-none transition-all font-bold text-sm" placeholder="your@email.com" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-black text-[#4A3427] uppercase tracking-widest mb-2">Subject <span className="text-red-500">*</span></label>
                      <select name="subject" value={formData.subject} onChange={handleChange} className="w-full px-5 py-4 rounded-xl bg-[#FAF9F6] border-2 border-orange-100 focus:border-orange-500 focus:outline-none transition-all font-bold text-sm appearance-none" required>
                        <option value="">Select a subject</option>
                        <option value="puja">Puja Booking</option>
                        <option value="astrology">Astrology Consultation</option>
                        <option value="kundli">Kundli / Dosh</option>
                        <option value="vastu">Vastu Healing</option>
                        <option value="general">General Query</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-black text-[#4A3427] uppercase tracking-widest mb-2">Message <span className="text-red-500">*</span></label>
                      <textarea name="message" value={formData.message} onChange={handleChange} rows="5" className="w-full px-5 py-4 rounded-xl bg-[#FAF9F6] border-2 border-orange-100 focus:border-orange-500 focus:outline-none transition-all font-bold text-sm italic resize-none" placeholder="Apni query detail mein likhein..." required></textarea>
                    </div>

                    <button type="submit" className="w-full bg-[#E8453C] hover:bg-[#CC3B34] text-white py-5 rounded-xl font-black text-xs uppercase tracking-[0.3em] shadow-2xl transition-all flex items-center justify-center gap-3">
                      <Send className="w-4 h-4" /> Request a Callback
                    </button>
                  </form>
                </div>
              </div>

              {/* Sidebar Info - Match the premium styling */}
              <div className="space-y-6">

                {/* Office Information */}
                <div className="bg-white p-6 md:p-8 border-l-[6px] border-orange-500 shadow-xl rounded-none relative animate-fade-in-right">
                  <h3 className="text-xl font-black text-[#4A3427] mb-6 uppercase tracking-wider">Support <span className="text-orange-600">Info</span></h3>
                  <div className="space-y-5">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-sm bg-orange-50 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <p className="font-extrabold text-[#4A3427] text-sm uppercase tracking-wider mb-1">Location</p>
                        <p className="text-xs text-gray-600 font-bold">{supportInfo.location}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-sm bg-orange-50 flex items-center justify-center flex-shrink-0">
                        <Clock className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <p className="font-extrabold text-[#4A3427] text-sm uppercase tracking-wider mb-1">Support Hours</p>
                        <p className="text-xs text-gray-600 font-bold mb-0.5">{supportInfo.supportHours1}</p>
                        <p className="text-xs text-gray-600 font-bold">{supportInfo.supportHours2}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-sm bg-orange-50 flex items-center justify-center flex-shrink-0">
                        <Globe className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <p className="font-extrabold text-[#4A3427] text-sm uppercase tracking-wider mb-1">Service Area</p>
                        <p className="text-xs text-gray-600 font-bold">{supportInfo.serviceArea}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Trust Section - Premium Dark Card */}
                <div className="bg-gradient-to-br from-[#2A1D13] to-[#1A130F] p-6 md:p-8 shadow-xl rounded-none relative overflow-hidden animate-fade-in-right" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
                  <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #f97316 1px, transparent 0)', backgroundSize: '24px 24px' }} />
                  <h3 className="text-lg font-black text-[#FFC107] mb-5 uppercase tracking-wider relative z-10 w-full text-center">Our Commitment</h3>
                  <div className="space-y-4 relative z-10">
                    {commitments.map((text, i) => (
                      <div key={i} className="flex items-center gap-3 border-b border-white/10 pb-3 last:border-0 last:pb-0">
                        <CheckCircle className="w-4 h-4 text-[#25D366] flex-shrink-0" />
                        <span className="text-xs text-amber-50 font-semibold tracking-wider uppercase">{text}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* Google Map Section */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl mb-10">
            <div className="text-center animate-fade-in-up">
              <h2 className="text-3xl md:text-4xl font-black text-[#4A3427] mb-4">Find Us <span className="text-orange-600">On Map</span></h2>
              <div className="flex items-center justify-center gap-2">
                <div className="w-12 h-1 bg-orange-200 rounded-full" /><Sparkles className="w-5 h-5 text-orange-400" /><div className="w-12 h-1 bg-orange-200 rounded-full" />
              </div>
            </div>
          </div>
          <div className="w-full h-[400px] md:h-[500px]">
            <iframe
              src={mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Map Location"
              className="grayscale hover:grayscale-0 transition-all duration-700"
            ></iframe>
          </div>
        </section>
      </div>
    </Layout>
  );
}

