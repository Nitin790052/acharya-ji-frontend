import React, { useState } from "react";
import { X, CheckCircle, User, Building2, Briefcase, Send, Calendar, Phone, Mail, MapPin, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const poojaServices = [
    { id: 1, name: "Griha Pravesh Puja", desc: "House warming ceremony for peace & prosperity" },
    { id: 2, name: "Satyanarayan Katha", desc: "For divine blessings and family wellbeing" },
    { id: 3, name: "Rudrabhishek", desc: "Lord Shiva worship for health and strength" },
    { id: 4, name: "Navgraha Shanti Puja", desc: "Planetary peace ritual for success" },
    { id: 5, name: "Marriage Puja", desc: "Traditional wedding ceremonies & rituals" },
    { id: 6, name: "Generic Consultation", desc: "Talk to us about any other spiritual service" }
];

const BookPoojaDrawer = ({ open, onClose }) => {
    const [submitted, setSubmitted] = useState(false);
    const [selectedService, setSelectedService] = useState(null);

    React.useEffect(() => {
        if (!open) {
            const timer = setTimeout(() => {
                setSelectedService(null);
                setSubmitted(false);
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [open]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };

    const handleServiceSelect = (service) => {
        setSelectedService(service);
    };

    const inputClasses = "rounded-none border-slate-200 h-10 focus:border-[#E8453C] focus:ring-[#E8453C]/10 transition-all font-inter text-sm bg-white";
    const labelClasses = "text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1.5 block font-inter";

    if (!open) return null;

    return (
        <>
            <div
                onClick={onClose}
                className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[1000] animate-fade-in"
            />
            <div
                className="fixed left-0 top-0 bottom-0 w-full max-w-lg bg-[#F7F8F0] z-[1001] shadow-2xl flex flex-col font-inter animate-slide-in-left"
            >
                {/* Header */}
                <div className="relative py-4 px-8 bg-white border-b border-slate-100 flex flex-col items-center">
                    {selectedService && !submitted && (
                        <button
                            onClick={() => setSelectedService(null)}
                            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-slate-50 text-[#E8453C] transition-all flex items-center gap-1 group"
                            title="Back to selection"
                        >
                            <div className="transition-transform group-hover:-translate-x-1">
                                <Send className="w-4 h-4 rotate-180" />
                            </div>
                            <span className="text-[9px] font-bold uppercase tracking-widest hidden md:inline">Change Service</span>
                        </button>
                    )}

                    <button
                        onClick={onClose}
                        className="absolute top-3 right-4 p-2 rounded-full bg-slate-50 hover:bg-[#E8453C]/5 hover:text-[#E8453C] transition-all group lg:hidden"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    <div className="flex flex-col items-center gap-1 w-full">
                        <div className="flex items-center gap-3 mb-1">
                            <div className="h-px w-6 bg-[#E8453C]" />
                            <span className="text-[10px] font-bold text-[#E8453C] uppercase tracking-[0.4em]">Spiritual Services</span>
                            <div className="h-px w-6 bg-[#E8453C]" />
                        </div>

                        <h2 className="text-2xl font-bold text-slate-900 tracking-tight text-center relative px-6">
                            BOOK YOUR{" "}
                            <span className="text-[#E8453C] relative inline-block">
                                POOJA
                                <svg
                                    className="absolute -bottom-2.5 left-0 w-full h-2.5 text-[#E8453C]/30"
                                    viewBox="0 0 200 12"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M2 10C60 2, 140 2, 198 10"
                                        stroke="currentColor"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        className="animate-[draw_1.5s_ease-in-out_forwards] animate-delay-200"
                                        style={{ strokeDasharray: 200, strokeDashoffset: 200 }}
                                    />
                                </svg>
                            </span>
                        </h2>

                        <button
                            onClick={onClose}
                            className="absolute top-6 right-8 p-2 rounded-full hover:bg-slate-50 transition-colors hidden lg:block"
                        >
                            <X className="w-6 h-6 text-slate-400 hover:text-[#E8453C]" />
                        </button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                    {submitted ? (
                        <div
                            className="flex flex-col items-center justify-center h-full text-center animate-scale-in"
                        >
                            <div className="w-20 h-20 bg-[#E8453C]/10 rounded-full flex items-center justify-center mb-6">
                                <CheckCircle className="w-10 h-10 text-[#E8453C]" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">Requirement Received!</h3>
                            <p className="text-slate-600 mb-8 max-w-xs leading-relaxed text-sm">
                                Thank you for choosing Divine Services. Our team will contact you shortly to finalize your poja ceremony details.
                            </p>
                            <Button
                                onClick={() => { setSubmitted(false); setSelectedService(null); onClose(); }}
                                className="h-12 px-10 rounded-none bg-[#E8453C] hover:bg-[#D43F37] text-white font-bold transition-all shadow-lg shadow-[#E8453C]/20"
                            >
                                Close
                            </Button>
                        </div>
                    ) : !selectedService ? (
                        <div className="space-y-6">
                            <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
                                <Sparkles className="w-4 h-4 text-[#E8453C]" />
                                <h4 className="text-[11px] font-bold uppercase tracking-widest text-slate-500">Select a Service</h4>
                            </div>
                            <div className="grid gap-4">
                                {poojaServices.map((service) => (
                                    <div
                                        key={service.id}
                                        onClick={() => handleServiceSelect(service)}
                                        className="p-5 bg-white border border-slate-200 rounded-none cursor-pointer hover:border-[#E8453C]/30 hover:shadow-md transition-all group hover:translate-x-2"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="font-bold text-slate-900 group-hover:text-[#E8453C] transition-colors">{service.name}</h3>
                                                <p className="text-xs text-slate-500 mt-1">{service.desc}</p>
                                            </div>
                                            <div className="w-8 h-8 rounded-none bg-slate-50 flex items-center justify-center group-hover:bg-[#E8453C]/10 transition-colors">
                                                <Calendar className="w-4 h-4 text-slate-400 group-hover:text-[#E8453C]" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col gap-8 animate-fade-in">

                            {/* Personal Information */}
                            <div className="space-y-5">
                                <div className="flex items-center gap-2 mb-2 border-b border-slate-100 pb-2">
                                    <User className="w-4 h-4 text-[#E8453C]" />
                                    <h4 className="text-[11px] font-bold uppercase tracking-widest text-slate-500">Direct Contact Details</h4>
                                </div>

                                <div className="grid grid-cols-1 gap-5">
                                    <div>
                                        <Label className={labelClasses}>Full Name</Label>
                                        <Input required placeholder="Your Name" className={inputClasses} />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-5">
                                    <div>
                                        <Label className={labelClasses}>Phone Number</Label>
                                        <Input required placeholder="+91 XXXX XXXX" className={inputClasses} />
                                    </div>
                                    <div>
                                        <Label className={labelClasses}>Email Address</Label>
                                        <Input type="email" placeholder="Optional" className={inputClasses} />
                                    </div>
                                </div>
                            </div>

                            {/* Pooja Details */}
                            <div className="space-y-5">
                                <div className="flex items-center gap-2 mb-2 border-b border-slate-100 pb-2">
                                    <Calendar className="w-4 h-4 text-[#E8453C]" />
                                    <h4 className="text-[11px] font-bold uppercase tracking-widest text-slate-500">Ceremony Details</h4>
                                </div>

                                <div>
                                    <Label className={labelClasses}>Selected Service</Label>
                                    <Input disabled value={selectedService.name} className={inputClasses + " bg-slate-50"} />
                                </div>

                                <div className="grid grid-cols-2 gap-5">
                                    <div>
                                        <Label className={labelClasses}>Preferred Date</Label>
                                        <Input type="date" required className={inputClasses} />
                                    </div>
                                    <div>
                                        <Label className={labelClasses}>Preferred Time</Label>
                                        <Select>
                                            <SelectTrigger className={inputClasses}>
                                                <SelectValue placeholder="Select Time" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="morning">Morning (6 AM - 12 PM)</SelectItem>
                                                <SelectItem value="afternoon">Afternoon (12 PM - 4 PM)</SelectItem>
                                                <SelectItem value="evening">Evening (4 PM - 9 PM)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div>
                                    <Label className={labelClasses}>Location / Full Address</Label>
                                    <Textarea required placeholder="Enter the location for the ceremony..." rows={2} className="rounded-lg border-slate-200 focus:border-[#E8453C] focus:ring-[#E8453C]/10 transition-all font-inter text-sm bg-white" />
                                </div>
                            </div>

                            {/* Additional Notes */}
                            <div className="space-y-5">
                                <div className="flex items-center gap-2 mb-2 border-b border-slate-100 pb-2">
                                    <Send className="w-4 h-4 text-[#E8453C]" />
                                    <h4 className="text-[11px] font-bold uppercase tracking-widest text-slate-500">Special Requirements</h4>
                                </div>

                                <div>
                                    <Textarea placeholder="Any specific requirements or questions..." rows={3} className="rounded-lg border-slate-200 focus:border-[#E8453C] focus:ring-[#E8453C]/10 transition-all font-inter text-sm bg-white" />
                                </div>
                            </div>

                            <div className="flex flex-col gap-4 py-2">
                                <label className="flex items-start gap-3 cursor-pointer group">
                                    <Checkbox required className="mt-1 rounded-none border-slate-300 data-[state=checked]:bg-[#E8453C] data-[state=checked]:border-[#E8453C]" />
                                    <span className="text-[10px] text-slate-500 leading-normal font-medium">
                                        I agree to be contacted by Divine Services regarding my spiritual ceremony requirements.
                                    </span>
                                </label>
                            </div>

                            <Button
                                type="submit"
                                className="h-12 rounded-none bg-[#E8453C] hover:bg-[#D43F37] text-white font-bold text-sm uppercase tracking-widest transition-all shadow-xl shadow-[#E8453C]/20 flex items-center justify-center gap-3 mb-6 group"
                            >
                                Submit Booking <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                            </Button>
                        </form>
                    )}
                </div>
            </div>
        </>
    );
};

export default BookPoojaDrawer;
