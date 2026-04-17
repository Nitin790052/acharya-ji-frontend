import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { removeFromCart, clearCart, addToCart } from '../store/slices/cartSlice';
import { ArrowLeft, Trash2, CheckCircle, Shield, ShoppingBag, Loader2, ShoppingCart, Sparkles } from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import { useCreateBookingMutation } from '../services/bookingApi';
import { toast } from 'react-toastify';

const CartCheckout = () => {
    const { cartItems, cartTotal } = useSelector(state => state.cart);
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
            // Redirect to login if not logged in
            navigate('/user_login', { state: { returnTo: '/cart' } });
            return;
        }

        // Check if there's a pending item from state redirection
        if (location.state?.addPujaToCart) {
            dispatch(addToCart(location.state.addPujaToCart));
            // Ensure we clear the state so it doesn't add again on refresh
            navigate('/cart', { replace: true });
        }
    }, [token, location.state, navigate, dispatch]);

    const handleRemove = (item) => {
        dispatch(removeFromCart(item));
    };

    const handlePayment = async () => {
        setIsProcessing(true);
        toast.info("Initializing Dummy Payment...");

        try {
            // Wait 2 seconds for effect
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Create backend records for each cart item so they appear in Dashboard!
            for (const item of cartItems) {
                await createBooking({
                    pujaType: item.title,
                    date: item.date || new Date().toISOString().split('T')[0],
                    mode: item.mode || 'Online',
                    name: savedUser?.name || 'Checkout User',
                    mobile: savedUser?.phone || 'Attached to Token',
                    city: 'Not Provided',
                    message: item.description,
                    amount: item.price,
                }).unwrap();
            }

            dispatch(clearCart());
            navigate('/payment-success');
        } catch (error) {
            console.error("Booking Error", error);
            toast.error("Failed to process bookings. Please try again.");
            setIsProcessing(false);
        }
    };

    if (!token) return null; // Wait for redirect

    return (
        <Layout>
            <div className="min-h-screen bg-slate-50 pt-24 pb-12">
                <div className="container mx-auto px-4 max-w-6xl">
                    <button 
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 text-slate-600 hover:text-orange-600 mb-6 font-semibold uppercase tracking-wider text-sm transition-colors"
                    >
                        <ArrowLeft size={16} /> Back to Services
                    </button>

                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                            <ShoppingCart size={24} />
                        </div>
                        <h1 className="text-3xl font-black text-slate-800 uppercase tracking-tight">Your Divine Cart</h1>
                    </div>

                    {cartItems.length === 0 ? (
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 text-center flex flex-col items-center">
                            <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mb-6">
                                <ShoppingBag size={40} className="text-orange-300" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-700 mb-2">Cart is empty</h2>
                            <p className="text-slate-500 mb-8 max-w-sm font-medium">You haven't selected any Puja services yet. Explore our spiritual offerings to book a ritual.</p>
                            <button 
                                onClick={() => navigate('/')}
                                className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3.5 rounded-full font-bold shadow-lg transition-transform hover:-translate-y-1 uppercase tracking-wider text-sm"
                            >
                                Explore Services
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Cart Items List */}
                            <div className="lg:col-span-2 space-y-4">
                                {cartItems.map((item, idx) => (
                                    <div key={idx} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-5 items-start sm:items-center relative group">
                                        <div className="w-full sm:w-32 h-24 bg-orange-50 rounded-xl overflow-hidden shrink-0">
                                            {item.imageUrl ? (
                                                <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <Sparkles className="text-orange-200" size={32} />
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-bold text-slate-800 mb-1 uppercase tracking-tight">{item.title}</h3>
                                            <p className="text-sm text-slate-500 font-medium mb-3 line-clamp-2">{item.description}</p>
                                            <div className="flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wider">
                                                {item.mode && <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded border border-blue-100">{item.mode}</span>}
                                                {item.date && <span className="bg-green-50 text-green-700 px-2 py-1 rounded border border-green-100">{item.date}</span>}
                                            </div>
                                        </div>
                                        <div className="text-right sm:text-right w-full sm:w-auto mt-2 sm:mt-0 flex sm:flex-col items-center sm:items-end justify-between sm:justify-center">
                                            <div className="text-xl font-black text-slate-900">₹{item.price || 0}</div>
                                            <button 
                                                onClick={() => handleRemove(item)}
                                                className="text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-full transition-colors mt-2"
                                                title="Remove Item"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Order Summary */}
                            <div className="lg:col-span-1">
                                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm sticky top-24">
                                    <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-4 mb-4 uppercase tracking-wider">Checkout Summary</h3>
                                    
                                    <div className="space-y-3 mb-6">
                                        <div className="flex justify-between text-slate-600 font-medium">
                                            <span>Subtotal ({cartItems.length} items)</span>
                                            <span>₹{cartTotal}</span>
                                        </div>
                                        <div className="flex justify-between text-slate-600 font-medium">
                                            <span>Taxes & Fees</span>
                                            <span className="text-green-600 font-bold text-xs uppercase tracking-wider border border-green-200 bg-green-50 px-2 rounded flex items-center">Included</span>
                                        </div>
                                    </div>
                                    
                                    <div className="border-t border-slate-100 pt-4 mb-6 flex justify-between items-end">
                                        <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Total Amount</span>
                                        <span className="text-3xl font-black text-orange-600">₹{cartTotal}</span>
                                    </div>
                                    
                                    <button 
                                        onClick={handlePayment}
                                        disabled={isProcessing}
                                        className="w-full bg-slate-900 hover:bg-black text-white py-4 rounded-xl font-black uppercase tracking-[0.2em] shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 mb-4 group disabled:opacity-75 disabled:cursor-wait"
                                    >
                                        {isProcessing ? (
                                            <>Processing... <Loader2 className="w-5 h-5 animate-spin text-orange-500" /></>
                                        ) : (
                                            <>Proceed to Pay <CheckCircle className="w-5 h-5 group-hover:scale-110 transition-transform text-orange-500" /></>
                                        )}
                                    </button>

                                    <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mt-4">
                                        <Shield size={14} className="text-green-500" />
                                        100% Secure Checkout
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
