import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { removeFromCart, clearCart, addToCart } from '../store/slices/cartSlice';
import { ArrowLeft, Trash2, CheckCircle, Shield, ShoppingBag, Loader2, ShoppingCart, Sparkles, Package } from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import { useCreateBookingMutation } from '../services/bookingApi';
import { useCart } from '../contexts/CartContext';
import { toast } from 'react-toastify';
import { getImageUrl } from '../config/apiConfig';

const CartCheckout = () => {
    // Redux Items (Pooja Services)
    const { cartItems: poojaItems, cartTotal: poojaTotal } = useSelector(state => state.cart);
    
    // Context Items (Samagri Items)
    const { 
        items: samagriItems, 
        totalPrice: samagriTotal, 
        removeItem: removeSamagri, 
        clearCart: clearSamagri 
    } = useCart();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [createBooking] = useCreateBookingMutation();
    const [isProcessing, setIsProcessing] = useState(false);
    
    // Auth Check
    const token = localStorage.getItem("token");
    const savedUserString = localStorage.getItem("authUser");
    const savedUser = savedUserString ? JSON.parse(savedUserString) : null;

    useEffect(() => {
        if (!token) {
            navigate('/user_login', { state: { returnTo: '/cart' } });
            return;
        }

        if (location.state?.addPujaToCart) {
            dispatch(addToCart(location.state.addPujaToCart));
            navigate('/cart', { replace: true });
        }
    }, [token, location.state, navigate, dispatch]);

    const handleRemovePooja = (item) => {
        dispatch(removeFromCart(item));
    };

    const handleRemoveSamagri = (id) => {
        removeSamagri(id);
    };

    const handlePayment = async () => {
        setIsProcessing(true);
        toast.info("Initializing Secure Payment...");

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));

            // 1. Process Pooja Services from Redux
            for (const item of poojaItems) {
                const validModes = ['Online', 'Home Visit', 'Muhurat'];
                const safeMode = validModes.includes(item.mode) ? item.mode : 'Home Visit';

                await createBooking({
                    pujaType: item.title,
                    date: item.date || new Date().toISOString().split('T')[0],
                    time: item.time || undefined,
                    mode: safeMode,
                    name: savedUser?.name || 'Checkout User',
                    mobile: savedUser?.phone || 'Not Provided',
                    city: item.location || 'Not Provided',
                    message: `Service ID: ${item.id}`,
                    amount: item.price,
                    paymentStatus: 'paid'
                }).unwrap();
            }

            // 2. Process Samagri Items from Context
            for (const item of samagriItems) {
                await createBooking({
                    pujaType: `[Product] ${item.name}`,
                    date: new Date().toISOString().split('T')[0],
                    mode: 'Online',
                    name: savedUser?.name || 'Checkout User',
                    mobile: savedUser?.phone || 'Not Provided',
                    city: 'Delivery Order',
                    message: `Qty: ${item.quantity} | Category: ${item.category}`,
                    amount: item.price * item.quantity,
                    paymentStatus: 'paid'
                }).unwrap();
            }

            dispatch(clearCart());
            clearSamagri();
            navigate('/payment-success');
        } catch (error) {
            console.error("Booking Error", error);
            toast.error("Failed to process order. Please try again.");
            setIsProcessing(false);
        }
    };

    const totalCount = poojaItems.length + samagriItems.length;
    const finalTotal = poojaTotal + samagriTotal;

    if (!token) return null;

    return (
        <Layout>
            <div className="min-h-screen bg-slate-50 pt-24 pb-12">
                <div className="container mx-auto px-4 max-w-6xl">
                    <button 
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 text-slate-600 hover:text-orange-600 mb-6 font-semibold uppercase tracking-wider text-sm transition-colors"
                    >
                        <ArrowLeft size={16} /> Continue Shopping
                    </button>

                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 shadow-inner">
                                <ShoppingCart size={24} />
                            </div>
                            <div>
                                <h1 className="text-3xl font-black text-slate-800 uppercase tracking-tight">Your Divine Cart</h1>
                                <p className="text-xs font-bold text-[#E8453C] uppercase tracking-widest">{totalCount} items selected</p>
                            </div>
                        </div>
                    </div>

                    {totalCount === 0 ? (
                        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-16 text-center flex flex-col items-center">
                            <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mb-6">
                                <ShoppingBag size={40} className="text-orange-300" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-700 mb-2 font-serif">Your cart is empty</h2>
                            <p className="text-slate-500 mb-8 max-w-sm font-medium">Explore our sacred services and divine samagri to start your spiritual journey.</p>
                            <button 
                                onClick={() => navigate('/')}
                                className="bg-orange-600 hover:bg-orange-700 text-white px-10 py-4 rounded-xl font-bold shadow-lg transition-transform hover:-translate-y-1 uppercase tracking-[0.2em] text-xs"
                            >
                                Explore Offerings
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Combined Items List */}
                            <div className="lg:col-span-2 space-y-8">
                                
                                {/* Pooja Services Section */}
                                {poojaItems.length > 0 && (
                                    <div className="space-y-4">
                                        <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 flex items-center gap-3">
                                            <Sparkles size={14} className="text-orange-400" /> Pooja Services
                                        </h3>
                                        {poojaItems.map((item, idx) => (
                                            <div key={`pooja-${idx}`} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex gap-5 items-center relative group hover:border-orange-200 transition-all">
                                                <div className="w-20 h-20 bg-orange-50 rounded-xl overflow-hidden shrink-0 border border-slate-100">
                                                    <img src={getImageUrl(item.imageUrl)} alt={item.title} className="w-full h-full object-cover" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-tight truncate">{item.title}</h3>
                                                            <div className="flex gap-3 mt-1.5">
                                                                <span className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1">
                                                                    <div className="w-1.5 h-1.5 rounded-full bg-orange-400"></div> {item.mode}
                                                                </span>
                                                                <span className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1">
                                                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div> {item.date}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="text-right">
                                                            <div className="text-base font-black text-slate-900">₹{item.price}</div>
                                                            <button onClick={() => handleRemovePooja(item)} className="text-slate-300 hover:text-red-500 mt-2"><Trash2 size={16} /></button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Samagri Items Section */}
                                {samagriItems.length > 0 && (
                                    <div className="space-y-4">
                                        <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 flex items-center gap-3">
                                            <Package size={14} className="text-blue-400" /> Sacred Samagri
                                        </h3>
                                        {samagriItems.map((item, idx) => (
                                            <div key={`samagri-${idx}`} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex gap-5 items-center relative group hover:border-blue-200 transition-all">
                                                <div className="w-20 h-20 bg-slate-50 rounded-xl overflow-hidden shrink-0 border border-slate-100">
                                                    <img src={getImageUrl(item.image)} alt={item.name} className="w-full h-full object-cover" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <p className="text-[9px] font-black text-orange-600 uppercase tracking-widest mb-1">{item.category}</p>
                                                            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-tight truncate">{item.name}</h3>
                                                            <p className="text-[10px] text-slate-500 font-bold mt-1">Quantity: {item.quantity}</p>
                                                        </div>
                                                        <div className="text-right">
                                                            <div className="text-base font-black text-slate-900">₹{item.price * item.quantity}</div>
                                                            <button onClick={() => handleRemoveSamagri(item.id || item._id)} className="text-slate-300 hover:text-red-500 mt-2"><Trash2 size={16} /></button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Order Summary */}
                            <div className="lg:col-span-1">
                                <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl shadow-slate-200/50 sticky top-24">
                                    <h3 className="text-sm font-black text-slate-800 border-b border-slate-100 pb-5 mb-6 uppercase tracking-[0.2em] font-serif">Order Summary</h3>
                                    
                                    <div className="space-y-4 mb-8">
                                        <div className="flex justify-between text-slate-500 font-bold text-xs uppercase tracking-widest">
                                            <span>Subtotal ({totalCount} items)</span>
                                            <span className="text-slate-800 font-black">₹{finalTotal}</span>
                                        </div>
                                        <div className="flex justify-between text-slate-500 font-bold text-xs uppercase tracking-widest">
                                            <span>Divine Delivery</span>
                                            <span className="text-green-600">FREE</span>
                                        </div>
                                    </div>
                                    
                                    <div className="border-t-2 border-dashed border-slate-100 pt-6 mb-8 flex justify-between items-end">
                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Grand total</p>
                                            <span className="text-3xl font-black text-slate-900">₹{finalTotal}</span>
                                        </div>
                                    </div>
                                    
                                    <button 
                                        onClick={handlePayment}
                                        disabled={isProcessing}
                                        className="w-full bg-[#E8453C] hover:bg-black text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl shadow-red-500/20 transition-all flex items-center justify-center gap-2 mb-6 group disabled:opacity-75 disabled:cursor-wait"
                                    >
                                        {isProcessing ? (
                                            <>Processing... <Loader2 className="w-5 h-5 animate-spin text-white" /></>
                                        ) : (
                                            <>Complete Checkout <CheckCircle className="w-5 h-5 group-hover:scale-110 transition-transform text-white/80" /></>
                                        )}
                                    </button>

                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                            <Shield size={20} className="text-green-500 shrink-0" />
                                            <p className="text-[10px] font-bold text-slate-500 uppercase leading-relaxed">Your transaction is protected with 256-bit encryption for absolute security.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default CartCheckout;
