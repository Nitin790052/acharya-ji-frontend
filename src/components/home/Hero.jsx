import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const slides = [
  {
    id: 1,
    title: "Divine Blessings at Your Doorstep",
    subtitle: "Experience sacred rituals performed by experienced priests",
    cta: "Book a Puja",
    ctaLink: "/puja/online",
    image: image1,
  },
  {
    id: 2,
    title: "Sacred Rituals & Anushthans",
    subtitle: "Traditional ceremonies with authentic Vedic mantras",
    cta: "Explore Services",
    ctaLink: "/puja/anushthan",
    image: image2,
  },
  {
    id: 3,
    title: "Pure Puja Samagri Delivered",
    subtitle: "Premium quality items for your spiritual practices",
    cta: "Shop Now",
    ctaLink: "/products",
    image: image3,
  },
];

export function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const goTo = (index) => {
    setCurrent(index);
  };

  const prev = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const next = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="relative h-[75vh] min-h-[460px] overflow-hidden">
      <div key={current} className="absolute inset-0 animate-fade-in">
        {/* Background Image */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 animate-[zoom-in_10s_linear_forwards]">
            <img
              src={slides[current].image}
              alt={slides[current].title}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: 'brightness(1) contrast(1)' }}
            />
          </div>

          {/* Subtle Transparent Overlay for Text Contrast */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to right, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)'
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 40%)'
            }}
          />

          {/* Subtler Animated effects */}
          <div
            className="absolute -top-40 -right-40 w-96 h-96 rounded-full blur-3xl opacity-20 animate-rotate-slow"
            style={{ backgroundColor: 'rgba(232,69,60,0.15)' }}
          />
        </div>

        <div className="container mx-auto px-5 h-full flex items-start pt-20 md:pt-28 lg:pt-36">
          <div className="max-w-3xl text-white relative z-10 drop-shadow-2xl font-normal">

            <div className="mb-4 animate-fade-in-up">
              <span className="inline-block px-4 py-2 bg-white/25 backdrop-blur-md rounded-full text-sm font-medium text-white border border-white/40">
                <Sparkles className="w-4 h-4 inline-block mr-2" /> Welcome to Acharya Ji
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white animate-fade-in-up animation-delay-200">
              {slides[current].title}
            </h1>

            <p className="text-sm md:text-base lg:text-lg text-white font-normal leading-relaxed max-w-xl p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl mb-4 animate-fade-in-up animation-delay-400">
              {slides[current].subtitle}
            </p>

            <div className="flex flex-wrap gap-4 animate-fade-in-up animation-delay-600">
              <Link
                to={slides[current].ctaLink}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-bold text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: '#E8453C' }}
              >
                {slides[current].cta}
              </Link>

              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-bold bg-white/20 text-white border-2 border-white hover:bg-white hover:text-[#E8453C] shadow-lg backdrop-blur-md transition-all duration-300"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>


      {/* Nav Arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/25 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-[#E8453C] transition-all z-20 shadow-xl border border-white/40"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/25 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-[#E8453C] transition-all z-20 shadow-xl border border-white/40"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            className={`h-3 rounded-full transition-all duration-300 ${index === current ? "w-8" : "w-3 bg-white/70 hover:bg-white/90"
              }`}
            style={index === current ? { backgroundColor: '#E8453C', width: '2rem' } : {}}
          />
        ))}
      </div>
    </section>
  );
}
