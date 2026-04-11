import { Link } from 'react-router-dom';
import { Phone, Calendar } from 'lucide-react';

const RED = '#E8453C';

export function CTA() {
  return (
    <section className="py-20 relative overflow-hidden" style={{ backgroundColor: RED }}>
      <style>{`
        @keyframes blobFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes blobFloatReverse {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(20px); }
        }
        .animate-blob-float {
          animation: blobFloat 5s ease-in-out infinite;
        }
        .animate-blob-float-reverse {
          animation: blobFloatReverse 6s ease-in-out infinite;
        }
      `}</style>

      {/* Decorative blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-10 left-10 w-32 h-32 rounded-full blur-2xl animate-blob-float"
          style={{ backgroundColor: 'rgba(255,255,255,0.12)' }}
        />
        <div
          className="absolute bottom-10 right-10 w-40 h-40 rounded-full blur-2xl animate-blob-float-reverse"
          style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
        />
        {/* Decorative circle pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `radial-gradient(circle, #ffffff 0.8px, transparent 0.8px)`,
          backgroundSize: '28px 28px'
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center text-white">
          <div className="animate-fade-in-up">
            <span className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-6 border border-white/40" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
              Begin Your Spiritual Journey
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6 text-white">
              Ready to Experience Divine Blessings?
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              Book your puja today and let our experienced priests bring sacred rituals
              to your doorstep. Experience peace, prosperity, and spiritual fulfillment.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/puja/online"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: '#ffffff', color: RED }}
              >
                <Calendar className="w-5 h-5" />
                Book a Puja Now
              </Link>
              <a
                href="tel:+919876543210"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold border-2 border-white text-white hover:bg-white transition-all duration-300 hover:scale-105"
                style={{ ['--hover-color']: RED }}
                onMouseEnter={e => { e.currentTarget.style.color = RED; }}
                onMouseLeave={e => { e.currentTarget.style.color = '#fff'; }}
              >
                <Phone className="w-5 h-5" />
                Call Us: +91 98765 43210
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}