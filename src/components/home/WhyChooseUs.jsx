import React, { useState, useEffect } from 'react';
import { CheckCircle, Shield, Award, Lock, Headphones, Users, Star, Sparkles } from 'lucide-react';
import SectionHeader from '../common/SectionHeader';

const RED = '#E8453C';

const WhyChooseUs = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 150);
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 5);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    { icon: Award, title: 'Verified Experts', description: 'Certified experts with 10+ years experience' },
    { icon: CheckCircle, title: 'Authentic Samagri', description: 'Premium quality items from trusted vendors' },
    { icon: Lock, title: 'Secure Payments', description: 'SSL encrypted with multiple payment options' },
    { icon: Headphones, title: '24/7 Support', description: 'Available via call, chat or video call' },
    { icon: Users, title: 'Happy Clients', description: 'Trusted by thousands for spiritual needs' },
  ];

  const stats = [
    { icon: Shield, count: '50+', label: 'Pandits' },
    { icon: Star, count: '4.9/5', label: 'Rating' },
    { icon: Award, count: '100%', label: 'Authentic' },
    { icon: Users, count: '10K+', label: 'Clients' },
  ];

  return (
    <div className="relative py-12 px-4 overflow-hidden bg-white">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: `radial-gradient(circle, #E8453C 0.8px, transparent 0.8px)`,
        backgroundSize: '24px 24px'
      }} />

      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeader
          badge="Trust & Excellence"
          title="Why Choose Us"
          subtitle="Experience the perfect blend of tradition, technology and trust"
        />

        {/* Stats Row - Ultra Compact */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-3 text-center shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300 group"
            >
              <div className="w-10 h-10 mx-auto mb-2 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110" style={{ backgroundColor: RED }}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <div className="text-xl font-black mb-0.5 tracking-tight" style={{ color: RED }}>{stat.count}</div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Feature Cards - 5 Columns for modern desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isActive = activeFeature === index;
            return (
              <div
                key={index}
                className={`transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 50}ms` }}
                onMouseEnter={() => setActiveFeature(index)}
              >
                <div
                  className={`bg-white rounded-2xl p-5 text-center shadow-sm transition-all duration-300 h-full border relative overflow-hidden group ${isActive ? 'border-[#E8453C] shadow-md -translate-y-1' : 'border-slate-100'
                    }`}
                >
                  {/* Active Indicator */}
                  {isActive && (
                    <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: RED }} />
                  )}

                  <div className="relative mb-4 inline-block">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-sm transform transition-all duration-300 ${isActive ? 'scale-110 rotate-3' : ''}`}
                      style={{ backgroundColor: RED }}
                    >
                      <Icon className="w-6 h-6 text-white" strokeWidth={2} />
                    </div>
                    {isActive && (
                      <div className="absolute inset-0 rounded-xl blur-md opacity-20 animate-pulse" style={{ backgroundColor: RED }} />
                    )}
                  </div>

                  <h3 className="text-sm font-black mb-2 uppercase tracking-tight" style={{ color: RED }}>
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 text-[11px] leading-relaxed font-medium">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;