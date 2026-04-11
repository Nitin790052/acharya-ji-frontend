import React, { useState } from 'react';
import { Phone, HelpCircle, X } from 'lucide-react';

const WhatsAppIcon = ({ className }) => (
    <svg className={className} fill="white" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
);

const SupportSpeedDial = ({ isHomePage }) => {
    const [isOpen, setIsOpen] = useState(false);
    const phoneNumber = "919910008432";
    const whatsappMessage = encodeURIComponent("Hello! I would like to know more about Divine Services.");

    const items = [
        {
            id: 'whatsapp',
            icon: WhatsAppIcon,
            label: 'WhatsApp',
            color: '#25D366',
            href: `https://wa.me/${phoneNumber}?text=${whatsappMessage}`,
            target: '_blank',
            isWhatsApp: true
        },
        {
            id: 'call',
            icon: Phone,
            label: 'Call Us',
            gradient: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
            href: `tel:+${phoneNumber}`,
            target: '_self',
            isCall: true
        }
    ];

    return (
        <div
            className="fixed left-6 bottom-8 z-[999] flex flex-col-reverse items-center gap-6"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <style>{`
                @keyframes ringPulse {
                    0% { transform: scale(1); opacity: 0.8; }
                    100% { transform: scale(1.8); opacity: 0; }
                }
                .call-ring {
                    position: absolute;
                    inset: -2px;
                    border-radius: 50%;
                    border: 2px solid #3b82f6;
                    animation: ringPulse 2s ease-out infinite;
                    pointer-events: none;
                }
                .call-ring:nth-child(2) { animation-delay: 0.5s; }
                .call-ring:nth-child(3) { animation-delay: 1s; }
            `}</style>

            {/* Main Trigger Button */}
            <button
                className={`relative w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 z-20 hover:scale-110 active:scale-95 ${isHomePage ? 'animate-fade-in-up' : 'opacity-100'} ${isOpen ? 'bg-[#E8453C] text-white' : 'bg-white text-[#E8453C] border-2 border-[#FFD700]/20'
                    }`}
                style={isHomePage ? { animationDelay: '1s' } : {}}
            >
                {isOpen ? (
                    <div className="animate-[rotate-slow_0.3s_ease-out]">
                        <X className="w-6 h-6" />
                    </div>
                ) : (
                    <div className="flex flex-col items-center animate-[rotate-slow_0.3s_ease-out_reverse]">
                        <HelpCircle className="w-6 h-6" />
                        <span className="text-[8px] font-bold uppercase tracking-tighter">Support</span>
                    </div>
                )}

                {/* Pulse Effect for Support Button when closed */}
                {!isOpen && (
                    <div className="absolute inset-0 rounded-full border-2 border-[#FFD700] animate-ping opacity-60" />
                )}
            </button>

            {/* Speed Dial Menu Items */}
            <div className="flex flex-col items-center gap-5 mb-2 relative">
                {isOpen && items.map((item, index) => (
                    <a
                        key={item.id}
                        href={item.href}
                        target={item.target}
                        rel={item.target === '_blank' ? 'noopener noreferrer' : undefined}
                        className="group relative flex items-center justify-center w-12 h-12 rounded-full shadow-lg text-white animate-zoom-in hover:scale-110 transition-transform"
                        style={{
                            background: item.gradient || item.color,
                            animationDelay: `${index * 0.1}s`
                        }}
                    >
                        {/* Original Call Pulsing Rings */}
                        {item.isCall && (
                            <>
                                <div className="call-ring"></div>
                                <div className="call-ring"></div>
                                <div className="call-ring"></div>
                            </>
                        )}

                        {/* Original WhatsApp Ping Effect */}
                        {item.isWhatsApp && (
                            <div className="absolute inset-0 rounded-full bg-[#25D366] opacity-75 animate-ping" />
                        )}

                        <item.icon className="w-6 h-6 relative z-10" />

                        {/* Hover Label */}
                        <span className="absolute left-16 px-3 py-1 bg-gray-800 text-white text-[10px] font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl uppercase tracking-wider">
                            {item.label}
                        </span>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default SupportSpeedDial;
