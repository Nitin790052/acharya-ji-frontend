import React from 'react';
import { Sparkles } from 'lucide-react';

const SectionHeader = ({ badge, title, subtitle, light = false, className = "" }) => {
    const RED = '#E8453C';
    const GOLD = '#FFC107';

    // Handle title splitting
    const words = title.split(' ');
    const lastWord = words.pop();
    const mainTitle = words.join(' ');

    return (
        <div
            className={`text-center mb-10 md:mb-14 animate-fade-in-up ${className}`}
        >
            {badge && (
                <div
                    className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold mb-4 shadow-sm border animate-scale-in animation-delay-200 ${light
                        ? 'bg-white/20 text-white border-white/30'
                        : 'bg-red-50 text-[#E8453C] border-[#E8453C]/10'
                        }`}
                >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span className="uppercase tracking-wider">{badge}</span>
                </div>
            )}

            <h2 className={`font-serif text-3xl md:text-4xl font-black mb-1 uppercase tracking-tight ${light ? 'text-white' : 'text-[#1A1A1A]'
                }`}>
                {mainTitle}{' '}
                <span style={{ color: light ? GOLD : RED }}>
                    {lastWord}
                </span>
            </h2>

            {/* Decorative Divider */}
            <div className="flex items-center justify-center gap-2 mb-4">
                <div className={`w-12 h-1 rounded-full ${light ? 'bg-white/30' : 'bg-[#FFC107]/40'}`} />
                <Sparkles className={`w-5 h-5 ${light ? 'text-white' : 'text-[#FFC107]'}`} />
                <div className={`w-12 h-1 rounded-full ${light ? 'bg-white/30' : 'bg-[#FFC107]/40'}`} />
            </div>

            {subtitle && (
                <p className={`text-sm md:text-base max-w-2xl mx-auto leading-relaxed font-medium ${light ? 'text-white/80' : 'text-slate-600'
                    }`}>
                    {subtitle}
                </p>
            )}
        </div>
    );
};

export default SectionHeader;
