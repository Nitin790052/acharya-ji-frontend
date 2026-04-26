import { useState } from "react";
import { HelpCircle, Minus, Plus } from "lucide-react";
import SectionHeader from '../common/SectionHeader';
import { useGetActiveFAQsQuery, useGetFAQSettingsQuery } from '../../services/faqApi';

const RED = '#E8453C';

export function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const { data: faqs = [], isLoading } = useGetActiveFAQsQuery();
  const { data: settings } = useGetFAQSettingsQuery();

  const toggleFAQ = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  if (isLoading && faqs.length === 0) return null;

  return (
    <section className="py-12 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle, ${RED} 0.8px, transparent 0.8px)`,
        backgroundSize: '24px 24px'
      }} />
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl opacity-10 pointer-events-none" style={{ backgroundColor: RED }} />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-3xl opacity-5 pointer-events-none" style={{ backgroundColor: RED }} />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Simplified Centered Header */}
        <SectionHeader
          badge={settings?.badge || "Common Questions"}
          title={settings?.title || "Frequently Asked Questions"}
          subtitle={settings?.subtitle || "Quick solutions to common queries about our divine services and process"}
        />

        {/* Compact 2-Column FAQ Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={faq._id || idx} className="group">
                <div className={`rounded-xl border transition-all duration-300 ${isOpen ? 'shadow-lg' : 'hover:shadow-md'}`}
                  style={{ borderColor: isOpen ? RED : '#f3f4f6', backgroundColor: 'white' }}>
                  <button
                    onClick={() => toggleFAQ(idx)}
                    className="w-full p-4 text-left flex items-center justify-between gap-4"
                  >
                    <span className={`text-sm font-bold transition-colors ${isOpen ? '' : 'text-gray-800'}`} style={isOpen ? { color: RED } : {}}>
                      {faq.question}
                    </span>
                    <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all ${isOpen ? 'text-white' : 'bg-gray-200 text-gray-500'}`}
                      style={isOpen ? { backgroundColor: RED } : {}}>
                      {isOpen ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                    </div>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                      }`}
                  >
                    <div className="px-4 pb-4 text-xs text-gray-600 leading-relaxed border-t border-gray-50 pt-3">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Minimal Bottom CTA */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500 flex items-center justify-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5" style={{ color: RED }} />
            {settings?.ctaText || "Still have questions? "} <a href={settings?.ctaLink || "#"} className="font-bold underline cursor-pointer hover:opacity-80 transition-opacity" style={{ color: RED }}>{settings?.ctaLinkText || "Contact our support team"}</a>
          </p>
        </div>
      </div>
    </section>
  );
}
