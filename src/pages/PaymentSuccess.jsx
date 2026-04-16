import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowRight, ShieldCheck, Home } from 'lucide-react';
import { Layout } from '../components/layout/Layout';

const PaymentSuccess = () => {
    const navigate = useNavigate();

    return (
        <Layout>
            <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
                <div className="bg-white max-w-lg w-full rounded-3xl shadow-xl shadow-green-900/5 border border-slate-100 p-10 text-center relative overflow-hidden">
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-green-50 rounded-full blur-3xl -z-10 -mr-20 -mt-20"></div>
                    
                    <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8 relative">
                        <CheckCircle className="w-12 h-12 text-green-500 relative z-10" />
                        <div className="absolute inset-0 border-4 border-green-500/20 rounded-full animate-ping opacity-20"></div>
                    </div>

                    <h1 className="text-3xl font-black text-slate-800 uppercase tracking-tight mb-2">Payment Successful!</h1>
                    <p className="text-slate-500 font-medium mb-8">Your divine booking has been received. Your Order ID revolves within our system and is completely secure.</p>

                    <div className="bg-slate-50 rounded-2xl p-5 mb-8 border border-slate-100 flex items-center justify-center gap-2">
                         <ShieldCheck className="text-green-500 w-5 h-5"/>
                         <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Secured Virtual Payment</span>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 w-full">
                        <button 
                            onClick={() => navigate('/user/dashboard')}
                            className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-bold uppercase tracking-wider text-sm py-4 px-6 rounded-xl shadow-lg transition-transform hover:-translate-y-1 flex items-center justify-center gap-2"
                        >
                            Go to Dashboard <ArrowRight size={18} />
                        </button>
                        <button 
                            onClick={() => navigate('/')}
                            className="flex-1 bg-white hover:bg-slate-50 text-slate-700 border-2 border-slate-200 font-bold uppercase tracking-wider text-sm py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-2"
                        >
                            <Home size={18} /> Back Home
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default PaymentSuccess;
