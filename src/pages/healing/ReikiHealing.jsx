import { useState } from "react";
import { Link } from "react-router-dom";
import {
    Calendar,
    Phone,
    Users,
    Heart,
    Award,
    Globe,
    Shield,
    Sparkle,
    Sparkles,
    BookOpen, Star, CheckCircle, Clock, MapPin, ChevronRight, Zap, Leaf, HelpCircle, MessageSquare, Sun, Moon, Wind, Feather, Activity, Coffee, Battery, Brain, Droplet, Flower2
} from "lucide-react";
import { Layout } from '@/components/layout/Layout';
import { usePageBanner } from "@/hooks/usePageBanner";
import { BACKEND_URL } from "@/config/apiConfig";
import bgImage from "../../assets/healing/ReikiHealing.webp";

const ReikiHealing = () => {
    const banner = usePageBanner({ pollingInterval: 3000 });
    const [selectedFaq, setSelectedFaq] = useState(null);
    const [selectedSession, setSelectedSession] = useState(null);

    // What is Reiki Content
    const whatIsReiki = [
        {
            icon: Zap,
            title: "Energy Flows",
            desc: "Life force energy flows through every cell of your body"
        },
        {
            icon: Shield,
            title: "Blockages Cause Issues",
            desc: "When energy is blocked → stress, illness, emotional problems"
        },
        {
            icon: Heart,
            title: "Restores Balance",
            desc: "Reiki helps restore natural energy balance and harmony"
        }
    ];

    // Benefits of Reiki
    const benefits = [
        {
            icon: Brain,
            title: "Stress Reduction",
            desc: "Releases negative energy and deeply relaxes the mind",
            color: "from-orange-500 to-red-600"
        },
        {
            icon: Heart,
            title: "Emotional Healing",
            desc: "Helps overcome anxiety, trauma and emotional blockages",
            color: "from-purple-500 to-pink-600"
        },
        {
            icon: Moon,
            title: "Better Sleep",
            desc: "Improves sleep patterns and cures insomnia naturally",
            color: "from-blue-500 to-indigo-600"
        },
        {
            icon: Brain,
            title: "Mental Clarity",
            desc: "Clears mental fog and enhances focus and decision making",
            color: "from-amber-500 to-orange-600"
        },
        {
            icon: Sun,
            title: "Spiritual Peace",
            desc: "Deepens meditation and connects you with higher consciousness",
            color: "from-yellow-500 to-amber-600"
        },
        {
            icon: Activity,
            title: "Physical Healing",
            desc: "Accelerates recovery and boosts immune system",
            color: "from-green-500 to-emerald-600"
        }
    ];

    // Types of Reiki Sessions
    const sessionTypes = [
        {
            icon: Globe,
            title: "Distance Reiki",
            duration: "30 minutes",
            price: "₹999",
            desc: "Healing energy transmitted remotely across any distance",
            features: ["No geographical limits", "Same energy as in-person", "Flexible scheduling"],
            color: "from-orange-500 to-red-600"
        },
        {
            icon: Sun,
            title: "Chakra Healing",
            duration: "45 minutes",
            price: "₹1,499",
            desc: "Balance all 7 chakras for complete energy alignment",
            features: ["Chakra scanning", "Blockage removal", "Chakra balancing"],
            color: "from-purple-500 to-indigo-600"
        },
        {
            icon: Wind,
            title: "Aura Cleansing",
            duration: "30 minutes",
            price: "₹999",
            desc: "Remove negative energies from your auric field",
            features: ["Aura scanning", "Negative energy removal", "Protection shield"],
            color: "from-blue-500 to-cyan-600"
        },
        {
            icon: Feather,
            title: "Emotional Healing",
            duration: "45 minutes",
            price: "₹1,499",
            desc: "Deep healing for emotional trauma and blockages",
            features: ["Trauma release", "Emotional balance", "Inner peace"],
            color: "from-pink-500 to-rose-600"
        }
    ];

    // How It Works Steps
    const howItWorks = [
        {
            step: "01",
            icon: Calendar,
            title: "Book a Session",
            desc: "Choose your preferred session type and time slot"
        },
        {
            step: "02",
            icon: MessageSquare,
            title: "Share Your Concern",
            desc: "Tell us about your health issues or emotional concerns"
        },
        {
            step: "03",
            icon: Zap,
            title: "Receive Healing",
            desc: "Practitioner performs Reiki and transmits healing energy"
        },
        {
            step: "04",
            icon: Heart,
            title: "Feel Transformed",
            desc: "Experience deep relaxation and restored energy balance"
        }
    ];

    const testimonials = [
        {
            name: "Priya Sharma",
            text: "After just three Reiki sessions, my chronic anxiety has significantly reduced. The energy work is truly transformative.",
            location: "Mumbai, India",
            rating: 5
        },
        {
            name: "Rahul Verma",
            text: "The distance healing session was incredibly powerful. I felt a deep sense of peace and relaxation throughout.",
            location: "Delhi, India",
            rating: 5
        },
        {
            name: "Anjali Patel",
            text: "My sleep has improved dramatically. The healer was compassionate and explained every step of the process.",
            location: "Bangalore, India",
            rating: 5
        }
    ];

    const FAQS = [
        {
            q: "Is Reiki safe?",
            a: "Yes, Reiki is a gentle and natural healing practice. It is non-invasive and works in harmony with all other medical or therapeutic techniques to support recovery."
        },
        {
            q: "Can Reiki be done remotely?",
            a: "Yes, distance Reiki sessions are common and highly effective. Energy is not limited by physical distance, allowing practitioners to send healing vibrations regardless of where you are."
        },
        {
            q: "How long does a session take?",
            a: "Usually 20–45 minutes. The duration depends on your specific needs and the intensity of the healing required for that session."
        },
        {
            q: "How many sessions will I need?",
            a: "It varies per person. Some feel benefits after 1 session, while others with chronic issues may need 3-5 sessions for optimal results."
        }
    ];

    return (
        <Layout>
            <div className="min-h-[80vh]">
                <div className="min-h-screen bg-background">
                    {/* Hero Section */}
                    <section className="relative h-[320px] sm:h-[320px] md:h-[360px] lg:h-[370px] flex items-center py-[20px] text-white overflow-hidden">
                        <div className="absolute inset-0">
                            {banner.imageUrl ? (
                                <img src={banner.imageUrl.startsWith('http') ? banner.imageUrl : `${BACKEND_URL}${banner.imageUrl}`} alt="Background" className="w-full h-full object-cover object-top" />
                            ) : (
                                <img src={bgImage} alt="Reiki Background" className="w-full h-full object-cover object-top" />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
                            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,rgba(217,119,6,0.2),transparent_50%)]" />
                        </div>
                        <div className="container mx-auto px-4 relative z-10 w-full animate-fade-in-up text-center">
                            <div className="max-w-4xl mx-auto">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 mb-2 md:mb-8 shadow-2xl">
                                    <Award className="w-4 h-4 text-[#FFC107]" />
                                    <span className="text-[#FFC107] text-xs md:text-sm font-black uppercase tracking-widest">{banner.badge || "DIVINE SERVICES HUB"}</span>
                                </div>

                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-6 leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)] uppercase">
                                    {banner.titleHighlight1} <br />
                                    <span className="text-yellow-300">{banner.titleHighlight2} {banner.titleHighlight3}</span> {banner.titleEnd}
                                </h1>

                                <p className="text-lg md:text-xl text-amber-100 leading-relaxed font-medium max-w-2xl mx-auto mb-2 md:mb-8 drop-shadow">
                                    {banner.subtitle}
                                </p>

                                <div className="flex flex-wrap justify-center gap-4">
                                    {banner.buttons && banner.buttons.length > 0 ? (
                                        banner.buttons.map((btn, idx) => (
                                            btn.text && (
                                                <button
                                                    key={idx}
                                                    onClick={() => btn.link?.startsWith('#') ? document.getElementById(btn.link.substring(1))?.scrollIntoView({ behavior: 'smooth' }) : (btn.link ? (btn.link.startsWith('http') ? window.location.href = btn.link : window.location.pathname = btn.link) : null)}
                                                    className={`group relative ${idx === 0 ? 'bg-[#E8453C] hover:bg-[#CC3B34]' : 'bg-[#F59E0B] hover:bg-[#D97706] hidden md:flex'} text-white px-8 py-4 rounded-none font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] shadow-xl transition-all duration-300 overflow-hidden`}
                                                >
                                                    <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                                    <span className="relative flex items-center gap-2.5">
                                                        {btn.text}
                                                    </span>
                                                </button>
                                            )
                                        ))
                                    ) : (
                                        <>
                                            <button
                                                onClick={() => document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' })}
                                                className="group relative bg-[#E8453C] hover:bg-[#CC3B34] text-white px-8 py-4 rounded-none font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] shadow-xl transition-all duration-300 overflow-hidden">
                                                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                                <span className="relative flex items-center gap-2.5">
                                                    <Zap className="w-3.5 h-3.5" /> Book Session
                                                </span>
                                            </button>
                                            <button
                                                onClick={() => window.location.href = 'tel:+919910008432'}
                                                className="group relative bg-[#F59E0B] hover:bg-[#D97706] text-white px-8 py-4 rounded-none font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] shadow-xl transition-all duration-300 overflow-hidden hidden md:block">
                                                <div className="absolute inset-0 bg-black/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                                <span className="relative flex items-center gap-2.5">
                                                    <Phone className="w-3.5 h-3.5" /> Free Consultation
                                                </span>
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* What is Reiki Healing Section */}
                    <section className="py-12 md:py-16 bg-white relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-64 h-64 bg-orange-100/30 rounded-full blur-3xl -ml-32 -mt-32" />
                        <div className="container mx-auto px-4 max-w-6xl relative z-10">
                            <div className="text-center mb-12 animate-fade-in-up">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 text-orange-600 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                                    <Sparkles className="w-3.5 h-3.5" />
                                    <span>Understanding Reiki</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 uppercase">What is <span className="text-orange-600">Reiki Healing</span></h2>
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-12 h-1 bg-orange-200 rounded-full" />
                                    <Sparkles className="w-5 h-5 text-orange-400" />
                                    <div className="w-12 h-1 bg-orange-200 rounded-full" />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                                {whatIsReiki.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="bg-[#FFFAF3] p-6 text-center border-b-[6px] border-orange-600 shadow-lg hover:shadow-2xl transition-all duration-500 relative group animate-fade-in-up"
                                        style={{ animationDelay: `${idx * 0.1}s`, animationFillMode: 'both' }}
                                    >
                                        <div className="w-16 h-16 rounded-full bg-orange-100 mx-auto mb-4 flex items-center justify-center group-hover:bg-orange-600 transition-all duration-500">
                                            <item.icon className="w-8 h-8 text-orange-600 group-hover:text-white transition-colors" />
                                        </div>
                                        <h3 className="text-lg font-black text-[#2A1D13] mb-3 uppercase tracking-tight">{item.title}</h3>
                                        <p className="text-gray-600 font-medium text-sm">{item.desc}</p>
                                    </div>
                                ))}
                            </div>

                            <p className="text-center text-gray-600 font-medium max-w-3xl mx-auto mt-8 p-6 bg-orange-50/50 rounded-2xl border border-orange-100 animate-fade-in-up">
                                <span className="font-bold text-orange-600">Reiki</span> is based on the idea that energy flows through the body.
                                When energy is blocked, it leads to stress, illness, and emotional problems.
                                Reiki helps restore natural energy balance.
                            </p>
                        </div>
                    </section>

                    {/* Benefits of Reiki Section */}
                    <section className="py-12 md:py-16 bg-[#FAF9F6] relative overflow-hidden">
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #d97706 1px, transparent 0)', backgroundSize: '32px 32px' }} />
                        <div className="container mx-auto px-4 max-w-7xl relative z-10">
                            <div className="text-center mb-12 animate-fade-in-up">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 text-orange-600 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                                    <Heart className="w-3.5 h-3.5" />
                                    <span>Benefits</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 uppercase">Benefits of <span className="text-orange-600">Reiki</span></h2>
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-12 h-1 bg-orange-200 rounded-full" />
                                    <Sparkles className="w-5 h-5 text-orange-400" />
                                    <div className="w-12 h-1 bg-orange-200 rounded-full" />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {benefits.map((benefit, idx) => (
                                    <div
                                        key={idx}
                                        className="group bg-white p-6 hover:shadow-[0_20px_40px_-15px_rgba(234,88,12,0.15)] transition-all duration-500 border-2 border-orange-100 flex items-start gap-4 relative overflow-hidden animate-fade-in-up"
                                        style={{ animationDelay: `${idx * 0.1}s`, animationFillMode: 'both' }}
                                    >
                                        <div className="absolute top-0 right-0 w-2 h-0 group-hover:h-full bg-orange-600 transition-all duration-500" />
                                        <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${benefit.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                                            <benefit.icon className="w-7 h-7 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-extrabold text-[#2A1D13] mb-2 group-hover:text-orange-600 transition-colors uppercase tracking-tight">{benefit.title}</h3>
                                            <p className="text-gray-500 text-sm font-medium leading-relaxed">{benefit.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Types of Reiki Sessions */}
                    <section className="py-12 md:py-16 bg-white">
                        <div className="container mx-auto px-4 max-w-7xl">
                            <div className="text-center mb-12 animate-fade-in-up">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 text-orange-600 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                                    <Calendar className="w-3.5 h-3.5" />
                                    <span>Sessions</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 uppercase">Types of <span className="text-orange-600">Reiki Sessions</span></h2>
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-12 h-1 bg-orange-200 rounded-full" />
                                    <Sparkles className="w-5 h-5 text-orange-400" />
                                    <div className="w-12 h-1 bg-orange-200 rounded-full" />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {sessionTypes.map((session, idx) => (
                                    <div
                                        key={idx}
                                        className="group/card h-full animate-fade-in-up"
                                        style={{ animationDelay: `${idx * 0.1}s`, animationFillMode: 'both' }}
                                    >
                                        <div className="relative h-full p-[1.5px] rounded-3xl bg-orange-400/40 hover:bg-orange-500 transition-all duration-700 shadow-xl flex flex-col">
                                            <div className="relative flex-grow bg-[#FCFBF7] rounded-[1.4rem] overflow-hidden flex flex-col group-hover/card:bg-white transition-all duration-500">
                                                <div className="absolute top-0 right-0 w-48 h-48 bg-orange-100/40 rounded-full blur-[80px] -mr-24 -mt-24" />

                                                <div className="p-6 text-center">
                                                    <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${session.color} flex items-center justify-center shadow-lg`}>
                                                        <session.icon className="w-8 h-8 text-white" />
                                                    </div>

                                                    <h3 className="text-lg font-black text-[#2A1D13] mb-2 uppercase tracking-tight transition-colors group-hover/card:text-orange-600">{session.title}</h3>
                                                    <p className="text-sm text-gray-600 mb-3">{session.desc}</p>

                                                    <div className="flex justify-center gap-3 mb-4">
                                                        <span className="text-xs font-bold text-orange-600 bg-orange-50 px-3 py-1 rounded-full">{session.duration}</span>
                                                        <span className="text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full">{session.price}</span>
                                                    </div>

                                                    <ul className="text-left space-y-2 mb-5">
                                                        {session.features.map((feature, i) => (
                                                            <li key={i} className="flex items-center gap-2 text-xs">
                                                                <CheckCircle className="w-4 h-4 text-orange-600 flex-shrink-0" />
                                                                <span className="text-gray-600 font-medium">{feature}</span>
                                                            </li>
                                                        ))}
                                                    </ul>

                                                    <button
                                                        onClick={() => setSelectedSession(session.title)}
                                                        className="w-full bg-[#2A1D13] hover:bg-orange-600 text-white py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2"
                                                    >
                                                        <Calendar className="w-4 h-4" />
                                                        Book Session
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* How It Works */}
                    <section className="py-12 md:py-16 bg-[#FAF9F6] relative overflow-hidden">
                        <div className="container mx-auto px-4 max-w-6xl">
                            <div className="text-center mb-12 animate-fade-in-up">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 text-orange-600 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                                    <Activity className="w-3.5 h-3.5" />
                                    <span>Process</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 uppercase">How It <span className="text-orange-600">Works</span></h2>
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-12 h-1 bg-orange-200 rounded-full" />
                                    <Sparkles className="w-5 h-5 text-orange-400" />
                                    <div className="w-12 h-1 bg-orange-200 rounded-full" />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-4 gap-6">
                                {howItWorks.map((step, idx) => (
                                    <div
                                        key={idx}
                                        className="relative text-center group animate-fade-in-up"
                                        style={{ animationDelay: `${idx * 0.1}s`, animationFillMode: 'both' }}
                                    >
                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-8xl font-black text-orange-100/50 -z-10">
                                            {step.step}
                                        </div>
                                        <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-orange-100 flex items-center justify-center group-hover:bg-orange-600 transition-all duration-500">
                                            <step.icon className="w-10 h-10 text-orange-600 group-hover:text-white transition-colors" />
                                        </div>
                                        <h3 className="text-lg font-black text-[#2A1D13] mb-2 uppercase tracking-tight">{step.title}</h3>
                                        <p className="text-sm text-gray-600 font-medium">{step.desc}</p>
                                        {idx < 3 && (
                                            <ChevronRight className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 text-orange-300" />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Booking Section */}
                    <section className="py-12 md:py-16 bg-white">
                        <div className="container mx-auto px-4 max-w-4xl">
                            <div className="text-center mb-12 animate-fade-in-up">
                                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 uppercase">Book <span className="text-orange-600">Reiki Session</span></h2>
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-12 h-1 bg-orange-200 rounded-full" />
                                    <Sparkles className="w-5 h-5 text-orange-400" />
                                    <div className="w-12 h-1 bg-orange-200 rounded-full" />
                                </div>
                            </div>

                            <div className="bg-[#FAF9F6] p-8 md:p-10 rounded-3xl border-2 border-orange-100 shadow-xl animate-fade-in-up">
                                <form className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-bold text-[#2A1D13] mb-2">Your Name</label>
                                            <input
                                                type="text"
                                                placeholder="Enter your full name"
                                                className="w-full px-4 py-3 bg-white border-2 border-orange-100 focus:border-orange-500 outline-none transition-colors rounded-xl font-semibold text-gray-800 placeholder-gray-400"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-[#2A1D13] mb-2">Email Address</label>
                                            <input
                                                type="email"
                                                placeholder="Enter your email"
                                                className="w-full px-4 py-3 bg-white border-2 border-orange-100 focus:border-orange-500 outline-none transition-colors rounded-xl font-semibold text-gray-800 placeholder-gray-400"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-[#2A1D13] mb-2">Your Concern / Problem</label>
                                        <textarea
                                            rows="4"
                                            placeholder="Briefly describe your health issues or emotional concerns..."
                                            className="w-full px-4 py-3 bg-white border-2 border-orange-100 focus:border-orange-500 outline-none transition-colors rounded-xl font-semibold text-gray-800 placeholder-gray-400 resize-none"
                                        />
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-bold text-[#2A1D13] mb-2">Session Type</label>
                                            <select className="w-full px-4 py-3 bg-white border-2 border-orange-100 focus:border-orange-500 outline-none transition-colors rounded-xl font-semibold text-gray-800">
                                                <option>Select session type</option>
                                                <option>Distance Reiki</option>
                                                <option>Chakra Healing</option>
                                                <option>Aura Cleansing</option>
                                                <option>Emotional Healing</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-[#2A1D13] mb-2">Preferred Date & Time</label>
                                            <input
                                                type="datetime-local"
                                                className="w-full px-4 py-3 bg-white border-2 border-orange-100 focus:border-orange-500 outline-none transition-colors rounded-xl font-semibold text-gray-800"
                                            />
                                        </div>
                                    </div>

                                    <button className="w-full bg-[#E8453C] hover:bg-black text-white py-4 rounded-xl font-bold text-sm uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2">
                                        <Zap className="w-5 h-5" />
                                        Book Reiki Session
                                    </button>
                                </form>
                            </div>
                        </div>
                    </section>

                    {/* Testimonials Section */}
                    <section className="py-12 md:py-16 bg-[#FAF9F6] relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-50 rounded-full blur-3xl -mr-32 -mt-32" />
                        <div className="container mx-auto px-4 max-w-6xl relative z-10">
                            <div className="text-center mb-12 animate-fade-in-up">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 text-orange-700 rounded-full text-[10px] font-extrabold uppercase tracking-[0.2em] mb-4">
                                    <Star className="w-3.5 h-3.5 fill-orange-700" />
                                    <span>Testimonials</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-black text-[#2A1D13] mb-2 uppercase">What Our <span className="text-orange-600">Clients Say</span></h2>
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-12 h-1 bg-orange-200 rounded-full" />
                                    <Sparkles className="w-5 h-5 text-orange-400" />
                                    <div className="w-12 h-1 bg-orange-200 rounded-full" />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
                                {testimonials.map((review, idx) => (
                                    <div
                                        key={idx}
                                        className="bg-white p-6 md:p-7 border border-orange-100 shadow-lg rounded-2xl relative animate-fade-in-up hover:border-orange-400 transition-all group"
                                        style={{ animationDelay: `${idx * 0.1}s`, animationFillMode: 'both' }}
                                    >
                                        <div className="absolute -top-4 -left-2 text-6xl text-orange-100 font-serif group-hover:text-orange-200 transition-colors">"</div>
                                        <div className="flex gap-1 mb-4 relative z-10">
                                            {[...Array(review.rating)].map((_, i) => (
                                                <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                                            ))}
                                        </div>
                                        <p className="text-gray-600 font-medium text-sm mb-6 leading-relaxed relative z-10 italic">"{review.text}"</p>
                                        <div className="border-t border-orange-100 pt-4">
                                            <h4 className="font-extrabold text-[#2A1D13] text-sm uppercase tracking-tight">{review.name}</h4>
                                            <p className="text-xs text-orange-600 font-bold uppercase tracking-widest">{review.location}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* FAQ Section */}
                    <section className="py-12 md:py-16 bg-white">
                        <div className="container mx-auto px-4 max-w-3xl">
                            <div className="text-center mb-12 animate-fade-in-up">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 text-orange-600 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                                    <HelpCircle className="w-3.5 h-3.5" />
                                    <span>FAQ</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-black text-[#2A1D13] mb-2 uppercase tracking-tight">Frequently Asked <span className="text-orange-600">Questions</span></h2>
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-12 h-1 bg-orange-200 rounded-full" />
                                    <Sparkles className="w-5 h-5 text-orange-400" />
                                    <div className="w-12 h-1 bg-orange-200 rounded-full" />
                                </div>
                            </div>

                            <div className="space-y-4">
                                {FAQS.map((faq, i) => (
                                    <div key={i} className="border-2 border-orange-50 rounded-2xl overflow-hidden hover:border-orange-200 transition-all">
                                        <button
                                            onClick={() => setSelectedFaq(selectedFaq === i ? null : i)}
                                            className="w-full px-8 py-6 flex items-center justify-between text-left bg-[#FFFDF7]"
                                        >
                                            <span className="font-extrabold text-[#2A1D13] text-sm md:text-base uppercase tracking-tight">Q. {faq.q}</span>
                                            <HelpCircle className={`w-5 h-5 transition-transform duration-300 ${selectedFaq === i ? 'rotate-180 text-orange-600' : 'text-gray-400'}`} />
                                        </button>
                                        <div
                                            className={`bg-white transition-all duration-300 ease-in-out overflow-hidden ${selectedFaq === i ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
                                        >
                                            <p className="px-8 pb-8 pt-2 text-gray-600 font-medium leading-relaxed border-t border-orange-50">A. {faq.a}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Final CTA */}
                    <section className="py-12 md:py-16 bg-[#FAF9F6] border-t border-orange-50">
                        <div className="container mx-auto px-4 text-center max-w-5xl animate-fade-in-up">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2A1B13] mb-4 tracking-tight uppercase">Begin Your <span className="text-[#E8453C]">Healing Journey</span> Today</h2>
                            <div className="flex items-center justify-center gap-3 mb-8">
                                <div className="w-10 h-[1.5px] bg-orange-200" />
                                <Sparkles className="w-5 h-5 text-orange-400" />
                                <div className="w-10 h-[1.5px] bg-orange-200" />
                            </div>
                            <p className="text-gray-600 mb-10 text-sm md:text-base font-medium max-w-2xl mx-auto leading-relaxed">
                                Join thousands who have experienced the transformative power of Reiki healing.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <Link to="/book-reiki">
                                    <button className="group relative bg-[#E8453C] hover:bg-black text-white px-8 py-4 rounded-none font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] shadow-xl transition-all duration-300 overflow-hidden">
                                        <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                        <span className="relative flex items-center gap-2"><Zap className="w-3.5 h-3.5" /> Start Healing</span>
                                    </button>
                                </Link>
                                <Link to="/contact">
                                    <button className="group relative bg-[#F59E0B] hover:bg-black text-white px-8 py-4 rounded-none font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] shadow-xl transition-all duration-300 overflow-hidden">
                                        <div className="absolute inset-0 bg-black/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                        <span className="relative flex items-center gap-2"><MessageSquare className="w-3.5 h-3.5" /> Contact Us</span>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </Layout>
    );
};

export default ReikiHealing;
