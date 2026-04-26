import React, { useState, useEffect } from 'react';
import { Search, UserCheck, Calendar, MapPin, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import SectionHeader from '../common/SectionHeader';

const RED = '#E8453C';

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 150);
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    { icon: Search, title: 'Choose Service', description: 'Select from Pooja, Astrology, or Spiritual Consultation' },
    { icon: UserCheck, title: 'Select Pandit/Astrologer', description: 'Pick verified expert based on ratings and experience' },
    { icon: Calendar, title: 'Book Date & Time', description: 'Choose your convenient date and time slot' },
    { icon: MapPin, title: 'Online/Offline Service', description: 'Get service at home or connect virtually via video call' },
  ];

  return (
    <div className="relative py-10 px-3 overflow-hidden bg-white">
      {/* Subtle dot pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `radial-gradient(circle, #E8453C 0.8px, transparent 0.8px)`,
        backgroundSize: '24px 24px'
      }} />

      {/* Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-16 left-8 w-60 h-60 rounded-full mix-blend-multiply filter blur-2xl" style={{ backgroundColor: 'rgba(232,69,60,0.07)' }} />
        <div className="absolute top-32 right-8 w-60 h-60 rounded-full mix-blend-multiply filter blur-2xl" style={{ backgroundColor: 'rgba(232,69,60,0.05)' }} />
        <div className="absolute -bottom-16 left-1/2 w-60 h-60 rounded-full mix-blend-multiply filter blur-2xl" style={{ backgroundColor: 'rgba(232,69,60,0.06)' }} />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <SectionHeader
          badge="Simple & Easy Process"
          title="How It Works"
          subtitle="Book your spiritual service in just 4 simple steps"
        />

        {/* Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = activeStep === index;
            return (
              <div
                key={index}
                className={`relative transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
                style={{ transitionDelay: `${index * 120}ms` }}
                onMouseEnter={() => setActiveStep(index)}
              >
                <div
                  className={`relative bg-white rounded-2xl p-6 shadow hover:shadow-xl transition-all duration-300 h-full border ${isActive ? 'scale-[1.02]' : 'scale-100'}`}
                  style={{ borderColor: isActive ? RED : 'transparent' }}
                >
                  {/* Step number badge */}
                  <div
                    className="absolute -top-3 -left-3 w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-base shadow transform rotate-12 hover:rotate-0 transition-transform duration-300"
                    style={{ backgroundColor: RED }}
                  >
                    {index + 1}
                  </div>

                  <div className="relative mb-5">
                    <div
                      className={`w-16 h-16 mx-auto rounded-xl flex items-center justify-center shadow transform transition-all duration-300 ${isActive ? 'scale-105 rotate-3' : ''}`}
                      style={{ backgroundColor: RED }}
                    >
                      <Icon className="w-8 h-8 text-white" strokeWidth={1.8} />
                    </div>
                    {isActive && (
                      <div className="absolute inset-0 rounded-xl blur-xl opacity-25 animate-pulse" style={{ backgroundColor: RED }} />
                    )}
                  </div>

                  <h3 className="text-lg font-bold mb-2 text-center font-serif" style={{ color: RED }}>
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-center leading-relaxed text-xs">{step.description}</p>

                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-2xl" style={{ backgroundColor: RED }} />
                  )}
                </div>

                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 z-20 transform -translate-y-1/2">
                    <ArrowRight className={`w-6 h-6 transition-all duration-300 ${isActive ? 'scale-110' : 'text-gray-300'}`} style={isActive ? { color: RED } : {}} strokeWidth={2} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Progress Bar */}
        <div className="max-w-3xl mx-auto mb-10">
          <div className="bg-gray-200 h-2 rounded-full overflow-hidden shadow-inner">
            <div
              className="h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${((activeStep + 1) / steps.length) * 100}%`, backgroundColor: RED }}
            />
          </div>
          <div className="flex justify-between mt-2 px-1">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveStep(index)}
                className="w-2.5 h-2.5 rounded-full transition-all duration-300"
                style={{ backgroundColor: index <= activeStep ? RED : '#d1d5db', transform: index <= activeStep ? 'scale(1.1)' : 'scale(1)' }}
              />
            ))}
          </div>
        </div>

        {/* CTA Row */}
        <div className={`text-center transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 bg-white rounded-xl p-5 shadow border" style={{ borderColor: 'rgba(232,69,60,0.15)' }}>
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: RED }}>
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <p className="text-xs text-gray-500">Ready to begin?</p>
                <p className="font-bold font-serif text-sm text-gray-900">Start Your Spiritual Journey</p>
              </div>
            </div>
            <button
              className="group text-white px-6 py-2.5 rounded-lg font-bold shadow hover:shadow-lg transition-all duration-300 flex items-center gap-1.5 text-sm hover:opacity-90"
              style={{ backgroundColor: RED }}
            >
              Book Now
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
