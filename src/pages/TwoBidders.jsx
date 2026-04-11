import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { FileText, Calendar, Users, CheckCircle, Award } from 'lucide-react';

export default function TwoBidders() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[320px] sm:h-[320px] md:h-[360px] lg:h-[370px] flex items-center py-[20px] text-primary-foreground overflow-hidden bg-gradient-to-br from-gold-dark/90 to-saffron/80">
        <div className="absolute inset-0 divine-pattern opacity-30" />
        <div className="container mx-auto px-4 relative z-10 w-full animate-fade-in-up">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 mb-8 shadow-2xl">
              <Award className="w-4 h-4 text-[#FFC107]" />
              <span className="text-[#FFC107] text-xs md:text-sm font-black uppercase tracking-widest">DIVINE SERVICES HUB</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)] uppercase">
              Two Bidders <br />
              <span className="text-yellow-300">Service</span>
            </h1>

            <p className="text-lg md:text-xl text-amber-100 leading-relaxed font-medium max-w-2xl mx-auto mb-8 drop-shadow">
              Request quotes from multiple priests for your ceremony. Compare and choose the best fit for your spiritual needs.
            </p>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="font-serif text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground font-medium max-w-2xl mx-auto">
              Get competitive quotes and choose the perfect priest for your ceremony.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Submit Request', desc: 'Fill in your ceremony details', icon: FileText },
              { step: '02', title: 'Receive Bids', desc: 'Get quotes from verified priests', icon: Users },
              { step: '03', title: 'Compare & Choose', desc: 'Review profiles and pricing', icon: CheckCircle },
              { step: '04', title: 'Confirm Booking', desc: 'Finalize with your chosen priest', icon: Calendar },
            ].map((item, index) => (
              <div
                key={item.step}
                className="text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'both' }}
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-divine mx-auto mb-4 flex items-center justify-center">
                  <item.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Request Form */}
      <section id="request-form" className="py-12 md:py-16 bg-gradient-warm">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-card rounded-2xl p-8 shadow-xl border border-border animate-fade-in-up">
              <h2 className="font-serif text-2xl font-bold mb-6 text-center">Submit Your Request</h2>

              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Your Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary font-semibold text-gray-800 placeholder-gray-400"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone Number</label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary font-semibold text-gray-800 placeholder-gray-400"
                      placeholder="Enter your phone"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Type of Ceremony</label>
                  <select className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary font-semibold text-gray-800">
                    <option>Select ceremony type</option>
                    <option>Wedding Ceremony</option>
                    <option>Griha Pravesh</option>
                    <option>Satyanarayan Puja</option>
                    <option>Mundan Ceremony</option>
                    <option>Namkaran</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Preferred Date</label>
                    <input
                      type="date"
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary font-semibold text-gray-800"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Location</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary font-semibold text-gray-800 placeholder-gray-400"
                      placeholder="City, Area"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Additional Details</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none font-semibold text-gray-800 placeholder-gray-400"
                    placeholder="Any specific requirements or preferences..."
                  />
                </div>

                <Button type="submit" variant="divine" size="lg" className="w-full">
                  Submit Request
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
