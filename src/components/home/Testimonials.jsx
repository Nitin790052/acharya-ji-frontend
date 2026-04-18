import React, { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, Sparkles, MapPin, Award, ThumbsUp, CheckCircle, Calendar, Phone, Users, TrendingUp, Shield, Clock, MessageCircle } from 'lucide-react';
import SectionHeader from '../common/SectionHeader';

import { useGetActiveTestimonialsQuery, useGetTestimonialSettingsQuery } from '../../services/testimonialApi';
import { BACKEND_URL } from '../../config/apiConfig';

const Testimonials = () => {
  const [isMobile, setIsMobile] = useState(false);
  const { data: testimonials = [], isLoading } = useGetActiveTestimonialsQuery(undefined, { pollingInterval: 5000 });
  const { data: settings } = useGetTestimonialSettingsQuery();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const getImg = (url) => !url ? '' : url.startsWith('http') ? url : `${BACKEND_URL}${url}`;

  if (isLoading && testimonials.length === 0) return null;

  return (
    <div className="relative py-12 md:py-16 px-4 bg-white overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #E8453C 0.8px, transparent 0.8px)`,
            backgroundSize: '24px 24px'
          }}
        />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#E8453C] opacity-[0.02] rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#E8453C] opacity-[0.02] rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeader
          badge={settings?.badge || "Testimonials"}
          title={settings?.title || "What Our Clients Say"}
          subtitle={settings?.subtitle || "Real experiences from people who have transformed their lives with our spiritual services"}
        />

        {/* Stats Row - Compact Style */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-16">
          {[
            { icon: Star, value: '4.9/5', label: 'Avg Rating' },
            { icon: Award, value: '98%', label: 'Satisfaction' },
            { icon: Users, value: '10K+', label: 'Clients' },
            { icon: MapPin, value: '50+', label: 'Cities' }
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-4 shadow-md border-2 border-orange-50 border-t-4 border-t-[#E8453C] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group text-center relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-8 h-8 bg-orange-50 rounded-bl-full opacity-50" />
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-md transition-transform group-hover:scale-110" style={{ backgroundColor: '#E8453C' }}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <div className="text-xl font-black mb-0.5 tracking-tight" style={{ color: '#E8453C' }}>{stat.value}</div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {testimonials.map((testimonial, index) => (
                <div 
                    key={testimonial._id || testimonial.id || index}
                    className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 relative overflow-hidden group animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'both' }}
                >
                    {/* Decorative Quote Mark */}
                    <Quote className="absolute -top-4 -right-4 w-20 h-20 text-slate-50 transition-colors group-hover:text-red-50/50" />

                    {/* Content */}
                    <div className="relative z-10">
                        {/* Rating */}
                        <div className="flex gap-0.5 mb-4">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-3.5 h-3.5 fill-[#E8453C] text-[#E8453C]" />
                            ))}
                        </div>

                        {/* Feedback */}
                        <p className="text-slate-700 font-medium leading-relaxed mb-6 italic text-sm">
                            "{testimonial.feedback}"
                        </p>

                        {/* Profile - Horizontal Layout */}
                        <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                            <div className="relative">
                                <img
                                    src={getImg(testimonial.imageUrl)}
                                    alt={testimonial.name}
                                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm transition-transform group-hover:scale-110"
                                />
                                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-white">
                                    <CheckCircle className="w-3 h-3 text-white" />
                                </div>
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-slate-900 leading-none mb-1 group-hover:text-orange-600 transition-colors">{testimonial.name}</h4>
                                <div className="text-[10px] items-center flex gap-1.5 text-slate-500 font-semibold uppercase tracking-wider">
                                    <span>{testimonial.designation}</span>
                                    <span className="w-1 h-1 rounded-full bg-slate-300" />
                                    <span>{testimonial.city}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        {/* Compact CTA Banner */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-[#E8453C] group animate-fade-in-up">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
          </div>

          <div className="relative p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div className="flex-1">
              <h3 className="text-lg md:text-xl font-black text-white mb-1 uppercase tracking-[0.1em]">
                Experience Divine Results Today
              </h3>
              <p className="text-white/80 text-sm font-medium max-w-xl">
                Join 10,000+ seekers who have found their spiritual path through our guidance.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              <button className="bg-white text-[#E8453C] px-6 py-3 rounded-none font-bold text-xs uppercase tracking-widest shadow-xl hover:bg-black hover:text-white transition-all transform hover:-translate-y-1">
                Book Ritual Now
              </button>
              <button className="bg-transparent border-2 border-white/40 text-white px-6 py-3 rounded-none font-bold text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all transform hover:-translate-y-1">
                View All Reviews
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;