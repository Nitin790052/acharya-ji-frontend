import React, { useState, useEffect, useCallback } from "react";
import { X, CheckCircle, User, Building2, Briefcase, Send, Calendar, Phone, Mail, MapPin, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "@/store/slices/cartSlice";
import { useGetAllOfferingsQuery } from "@/services/pujaOfferingApi";
import { useUserAuth } from "@/app/user/auth/AuthContext";
import { useRegisterUserMutation, useGetUserDashboardQuery } from "@/services/userApi";
import { toast } from "react-toastify";
import { getImageUrl } from "@/config/apiConfig";

const BookPoojaDrawer = ({ open, onClose, initialService }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data: offerings = [] } = useGetAllOfferingsQuery();
    const [registerUser, { isLoading: isRegistering }] = useRegisterUserMutation();
    
    // Get user from AuthContext as primary source
    const { user: contextUser, login: contextLogin } = useUserAuth();

    // Fallback source: Dashboard API (if logged in but context is empty)
    const token = localStorage.getItem('token');
    const { data: dashData } = useGetUserDashboardQuery(undefined, { skip: !token });
    const dashUser = dashData?.data?.user;

    // We will track the local user state when the drawer opens to ensure fresh data
    const [localUser, setLocalUser] = useState(null);

    const [submitted, setSubmitted] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const defaultFormData = {
        name: '',
        mobile: '',
        email: '',
        date: '',
        time: '',
        location: '',
        message: '',
        mode: 'Home Visit'
    };
    const [formData, setFormData] = useState(defaultFormData);

    // Helper to get user data from all possible sources
    const getFreshUserData = useCallback(() => {
        console.log('[DRAWER AUTH] Checking for user data...');
        
        // Helper to extract fields from any object
        const extract = (obj) => {
            if (!obj || typeof obj !== 'object') return null;
            return {
                name: obj.name || obj.fullName || obj.userName || '',
                phone: obj.phone || obj.mobile || obj.phoneNumber || obj.identifier || '',
                email: obj.email || obj.emailId || '',
                _id: obj._id || obj.id || null
            };
        };

        // Source 1: AuthContext (most reliable)
        const fromContext = extract(contextUser);
        if (fromContext && (fromContext.name || fromContext.phone)) {
            console.log('[DRAWER AUTH] ✅ Got user from AuthContext:', fromContext);
            return fromContext;
        }
        
        // Source 2: localStorage (multiple keys for redundancy)
        try {
            const storageKeys = ['authUser', 'user', 'userdata'];
            for (const key of storageKeys) {
                const data = localStorage.getItem(key);
                if (data) {
                    const parsed = JSON.parse(data);
                    const fromStorage = extract(parsed);
                    if (fromStorage && (fromStorage.name || fromStorage.phone)) {
                        console.log(`[DRAWER AUTH] ✅ Got user from localStorage ${key}:`, fromStorage);
                        return fromStorage;
                    }
                }
            }
        } catch(e) {
            console.error("[DRAWER AUTH] localStorage check error:", e);
        }
        
        return null;
    }, [contextUser]);

    useEffect(() => {
        if (open) {
            const freshUser = getFreshUserData();
            const dashUserObj = dashUser ? {
                name: dashUser.name,
                phone: dashUser.phone || dashUser.mobile,
                email: dashUser.email,
                _id: dashUser._id
            } : null;

            const effectiveUser = freshUser || dashUserObj;
            setLocalUser(effectiveUser);
            
            if (effectiveUser) {
                setFormData(prev => {
                    // Only autofill if the current field is empty
                    // This prevents overwriting what the user might have just typed
                    return {
                        ...prev,
                        name: prev.name === '' ? (effectiveUser.name || '') : prev.name,
                        mobile: prev.mobile === '' ? (effectiveUser.phone || '') : prev.mobile,
                        email: prev.email === '' ? (effectiveUser.email || '') : prev.email
                    };
                });
            }

            // Pre-select initial service logic
            if (initialService) {
                if (typeof initialService === 'object' && initialService.title) {
                    setSelectedService(initialService);
                    setFormData(prev => ({ ...prev, pujaType: initialService.title }));
                } else if (typeof initialService === 'string') {
                    const matched = offerings.find(o => 
                        (o.title || '').toLowerCase() === initialService.toLowerCase() ||
                        (o.name || '').toLowerCase() === initialService.toLowerCase()
                    );
                    if (matched) {
                        setSelectedService(matched);
                        setFormData(prev => ({ ...prev, pujaType: matched.title || matched.name }));
                    } else {
                        setFormData(prev => ({ ...prev, pujaType: initialService }));
                        setSelectedService({ title: initialService });
                    }
                }
            }
        }
    }, [open, initialService, offerings, getFreshUserData, dashUser]);

    useEffect(() => {
        if (!open) {
            const timer = setTimeout(() => {
                setSelectedService(null);
                setSubmitted(false);
                setLocalUser(null);
                setFormData(defaultFormData);
            }, 300);
            return () => clearTimeout(timer);
        } else {
            // When drawer opens, if initialService is an object, pre-select it immediately
            if (initialService && typeof initialService === 'object' && initialService.title) {
                // Use setTimeout to ensure this runs AFTER any pending reset
                setTimeout(() => {
                    setSelectedService(initialService);
                    setFormData(prev => ({ ...prev, pujaType: initialService.title }));
                }, 50);
            }
        }
    }, [open, initialService]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        let userId = localUser?._id || localUser?.id;

        // Auto-Register if user is a guest
        if (!localUser) {
            try {
                const generatedPassword = `${formData.mobile}@AJI`;
                const regPayload = {
                    name: formData.name,
                    phone: formData.mobile,
                    email: formData.email || `${formData.mobile}@acharyaji.com`,
                    password: generatedPassword,
                    location: formData.location
                };
                const regRes = await registerUser(regPayload).unwrap();
                
                if (regRes.token && regRes.data) {
                    contextLogin(regRes.data, regRes.token);
                    userId = regRes.data._id;
                }
                toast.success("Account securely created! Redirecting to cart...");
            } catch (err) {
                if (err.status === 400 && err.data?.message?.toLowerCase().includes('exists')) {
                    toast.info("Account already exists. Please login to continue to cart.");
                    onClose();
                    
                    const cartItemObj = {
                        id: selectedService._id,
                        title: selectedService.title,
                        price: selectedService.price || 1100,
                        description: selectedService.shortDescription,
                        imageUrl: selectedService.imageUrl,
                        date: formData.date,
                        time: formData.time || 'Morning',
                        mode: formData.mode || 'Home Visit',
                        location: formData.location || '',
                    };
                    
                    navigate('/user_login', { state: { returnTo: '/cart', addPujaToCart: cartItemObj } });
                    return;
                } else {
                    toast.error(err.data?.message || "Registration failed. Try logging in.");
                    return;
                }
            }
        }

        const cartItem = {
           id: selectedService._id,
           title: selectedService.title,
           price: selectedService.price || 1100,
           description: selectedService.shortDescription,
           imageUrl: selectedService.imageUrl,
           date: formData.date,
           time: formData.time || 'Morning',
           mode: formData.mode || 'Home Visit',
           location: formData.location || '',
        };
        
        dispatch(addToCart(cartItem));
        onClose();
        navigate('/cart');
    };

    const handleServiceSelect = (service) => {
        setSelectedService(service);
        setFormData(prev => ({ ...prev, pujaType: service.title }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const inputClasses = "rounded-none border-slate-200 h-10 focus:border-[#E8453C] focus:ring-[#E8453C]/10 transition-all font-inter text-sm bg-white disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-not-allowed";
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
                                {offerings.map((service) => (
                                    <div
                                        key={service._id}
                                        onClick={() => handleServiceSelect(service)}
                                        className="p-5 bg-white border border-slate-200 rounded-none cursor-pointer hover:border-[#E8453C]/30 hover:shadow-md transition-all group hover:translate-x-2"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="font-bold text-slate-900 group-hover:text-[#E8453C] transition-colors uppercase tracking-tight">{service.title}</h3>
                                                <p className="text-xs text-slate-500 mt-1 italic">"{service.shortDescription}"</p>
                                                <p className="text-[10px] font-black text-orange-600 mt-2 uppercase tracking-widest">Starts from ₹{service.price}</p>
                                            </div>
                                            <div className="w-8 h-8 rounded-none bg-slate-50 flex items-center justify-center group-hover:bg-[#E8453C]/10 transition-colors">
                                                <Calendar className="w-4 h-4 text-slate-400 group-hover:text-[#E8453C]" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {offerings.length === 0 && (
                                    <div className="text-center py-10">
                                        <div className="animate-spin mb-4">
                                            <Sparkles className="w-6 h-6 text-orange-300 mx-auto" />
                                        </div>
                                        <p className="text-xs text-gray-400 uppercase tracking-widest">Fetching sacred services...</p>
                                    </div>
                                )}
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
                                        <Input 
                                            name="name"
                                            required 
                                            placeholder="Your Name" 
                                            className={inputClasses} 
                                            value={formData.name}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-5">
                                    <div>
                                        <Label className={labelClasses}>Phone Number</Label>
                                        <Input 
                                            name="mobile"
                                            required 
                                            placeholder="+91 XXXX XXXX" 
                                            className={inputClasses} 
                                            value={formData.mobile}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <Label className={labelClasses}>Email Address</Label>
                                        <Input 
                                            name="email"
                                            type="email" 
                                            placeholder="Optional" 
                                            className={inputClasses} 
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Pooja Details */}
                            <div className="space-y-5">
                                <div className="flex items-center gap-2 mb-2 border-b border-slate-100 pb-2">
                                    <Calendar className="w-4 h-4 text-[#E8453C]" />
                                    <h4 className="text-[11px] font-bold uppercase tracking-widest text-slate-500">Ceremony Details</h4>
                                </div>

                                <div className="flex gap-4 items-center bg-white p-3 border border-slate-100 mb-2">
                                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-slate-50 shrink-0 border border-slate-100">
                                        {selectedService.imageUrl ? (
                                            <img src={getImageUrl(selectedService.imageUrl)} alt={selectedService.title} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <Sparkles className="w-6 h-6 text-orange-200" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <Label className={labelClasses}>Selected Service</Label>
                                        <p className="text-sm font-bold text-slate-800 uppercase">{selectedService.title}</p>
                                        <p className="text-[10px] text-[#E8453C] font-bold">₹{selectedService.price}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-5">
                                    <div>
                                        <Label className={labelClasses}>Preferred Date</Label>
                                        <Input 
                                            name="date"
                                            type="date" 
                                            required 
                                            className={inputClasses} 
                                            value={formData.date}
                                            onChange={handleChange}
                                            min={new Date().toISOString().split('T')[0]}
                                        />
                                    </div>
                                    <div>
                                        <Label className={labelClasses}>Preferred Time</Label>
                                        <Select 
                                            value={formData.time} 
                                            onValueChange={(val) => setFormData(prev => ({ ...prev, time: val }))}
                                        >
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
                                    <Textarea 
                                        name="location"
                                        required 
                                        placeholder="Enter the location for the ceremony..." 
                                        rows={2} 
                                        className="rounded-lg border-slate-200 focus:border-[#E8453C] focus:ring-[#E8453C]/10 transition-all font-inter text-sm bg-white" 
                                        value={formData.location}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            {/* Additional Notes */}
                            <div className="space-y-5">
                                <div className="flex items-center gap-2 mb-2 border-b border-slate-100 pb-2">
                                    <Send className="w-4 h-4 text-[#E8453C]" />
                                    <h4 className="text-[11px] font-bold uppercase tracking-widest text-slate-500">Special Requirements</h4>
                                </div>

                                <div>
                                    <Textarea 
                                        name="message"
                                        placeholder="Any specific requirements or questions..." 
                                        rows={3} 
                                        className="rounded-lg border-slate-200 focus:border-[#E8453C] focus:ring-[#E8453C]/10 transition-all font-inter text-sm bg-white" 
                                        value={formData.message}
                                        onChange={handleChange}
                                    />
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
                                disabled={isRegistering}
                                className="h-12 rounded-none bg-[#E8453C] hover:bg-[#D43F37] text-white font-bold text-sm uppercase tracking-widest transition-all shadow-xl shadow-[#E8453C]/20 flex items-center justify-center gap-3 mb-6 group"
                            >
                                {isRegistering ? "Processing Ritual..." : "Proceed to Cart"} 
                                {!isRegistering && <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />}
                            </Button>
                        </form>
                    )}
                </div>
            </div>
        </>
    );
};

export default BookPoojaDrawer;
