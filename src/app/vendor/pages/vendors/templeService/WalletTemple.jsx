import React, { useState, useEffect } from 'react';
import VendorPageHeader from '../../../components/VendorPageHeader';
import { useAuth } from '../../../auth/AuthContext';
import { 
  useGetVendorTransactionsQuery, 
  useAddVendorTransactionMutation 
} from '../../../../../services/vendorApi';
import { toast } from 'react-toastify';

import {
  Wallet,
  IndianRupee,
  TrendingUp,
  TrendingDown,
  Download,
  Upload,
  Clock,
  CheckCircle2,
  AlertCircle,
  Landmark,
  CreditCard,
  FileText,
  ChevronRight,
  Filter,
  CalendarDays,
  ArrowUpRight,
  ArrowDownLeft,
  Bell,
  Search,
  X,
  Save,
  Eye,
  Copy,
  PlusCircle,
  RefreshCw
} from 'lucide-react';

const WalletManagement = () => {
  const { user } = useAuth();
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  // RTK Query
  const { data: txRes, isLoading: isFetching, refetch } = useGetVendorTransactionsQuery(user?._id, { skip: !user?._id });
  const [addTransaction, { isLoading: isAdding }] = useAddVendorTransactionMutation();

  const transactions = txRes?.data || [];
  const isLoading = isFetching || isAdding;

  // ============ STATS ============
  const totalEarnings = transactions.filter(t => t.type === 'seva' || t.type === 'donation').reduce((acc, t) => acc + t.amount, 0);
  const totalWithdrawn = transactions.filter(t => t.type === 'withdrawal' && t.status === 'completed').reduce((acc, t) => acc + t.amount, 0);
  const availableBalance = totalEarnings - totalWithdrawn; // Simplified calculation

  const stats = {
    totalEarnings,
    availableBalance,
    pendingSettlement: transactions.filter(t => t.type === 'withdrawal' && t.status === 'processing').reduce((acc, t) => acc + t.amount, 0),
    totalWithdrawn,
    thisMonthEarnings: transactions.filter(t => (t.type === 'seva' || t.type === 'donation') && t.date.includes('2026')).reduce((acc, t) => acc + t.amount, 0) // Simplified
  };

  const handleAction = async (action, tx = null) => {
    if (action === 'refresh') {
      refetch();
      toast.info('Transaction history updated');
    }
    if (action === 'viewDetails') {
      setSelectedTransaction(tx);
    }
  };

  const handleWithdraw = async (amount) => {
    try {
      const payload = {
        vendor: user._id,
        type: 'withdrawal',
        category: 'Bank Transfer',
        amount: parseInt(amount),
        status: 'processing',
        date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
        time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        bank: 'ICICI Bank', // Should come from bank details
        accountNo: 'XXXX1234',
        reference: `WDL-${Date.now()}`,
        balance: availableBalance - amount
      };
      await addTransaction(payload).unwrap();
      toast.success('Withdrawal request submitted');
      setShowWithdrawModal(false);
    } catch (err) {
      toast.error(err.data?.message || 'Withdrawal failed');
    }
  };

  const filteredTransactions = transactions.filter(t => {
    if (filter === 'all') return true;
    return t.type === filter || t.status === filter;
  }).filter(t => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return t.id.toLowerCase().includes(q) || t.devotee?.toLowerCase().includes(q);
  });

  const WithdrawModal = () => {
    const [amount, setAmount] = useState('');
    if (!showWithdrawModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
        <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl animate-in fade-in zoom-in duration-200 overflow-hidden">
           <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 px-6 py-4 border-b border-orange-100 flex items-center justify-between">
              <h3 className="text-lg font-black text-gray-800">Withdraw Funds</h3>
              <button onClick={() => setShowWithdrawModal(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><X className="w-5 h-5 text-gray-500" /></button>
           </div>
           <div className="p-8 space-y-6">
              <div className="bg-gray-50 rounded-2xl p-4 flex justify-between items-center">
                 <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Available</span>
                 <span className="text-xl font-black text-gray-800">₹{availableBalance.toLocaleString('en-IN')}</span>
              </div>
              <div>
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Withdraw Amount</label>
                 <div className="relative">
                    <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input type="number" value={amount} onChange={e => setAmount(e.target.value)} className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-orange-300 transition-all font-bold text-gray-800" placeholder="0.00" />
                 </div>
              </div>
              <button onClick={() => handleWithdraw(amount)} disabled={!amount || amount > availableBalance} className="w-full py-4 bg-orange-500 text-white font-black rounded-2xl shadow-lg shadow-orange-500/20 hover:bg-orange-600 transition-all uppercase tracking-widest text-xs disabled:bg-gray-200 disabled:shadow-none">Initiate Withdrawal</button>
           </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-20 z-[150] flex items-center justify-center backdrop-blur-sm">
           <div className="bg-white rounded-3xl p-8 shadow-2xl flex flex-col items-center gap-4">
              <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-sm font-black text-gray-800">Syncing Wallet...</p>
           </div>
        </div>
      )}

      <VendorPageHeader title="WALLET & TRANSACTIONS" subtitle="Monitor your earnings and manage payouts" />

      <div className="space-y-4 p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
           <div className="lg:col-span-2 bg-gray-900 rounded-3xl p-8 text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl -mr-32 -mt-32 group-hover:scale-110 transition-transform duration-700"></div>
              <div className="relative z-10 flex flex-col h-full justify-between gap-8">
                 <div>
                    <p className="text-[10px] font-black text-orange-400 uppercase tracking-[0.2em] mb-2">Available Balance</p>
                    <h2 className="text-4xl font-black">₹{stats.availableBalance.toLocaleString('en-IN')}</h2>
                 </div>
                 <div className="flex gap-3">
                    <button onClick={() => setShowWithdrawModal(true)} className="flex-1 py-3 bg-white text-gray-900 font-black rounded-2xl hover:bg-orange-500 hover:text-white transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-2 shadow-lg shadow-black/20">
                       <Upload className="w-4 h-4" /> Withdraw
                    </button>
                    <button className="p-3 bg-white/10 rounded-2xl hover:bg-white/20 transition-all backdrop-blur-md">
                       <RefreshCw className={`w-5 h-5 ${isFetching ? 'animate-spin' : ''}`} onClick={() => refetch()} />
                    </button>
                 </div>
              </div>
           </div>

           <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm flex flex-col justify-between group hover:border-orange-200 transition-all">
              <div>
                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Lifetime Earnings</p>
                 <p className="text-2xl font-black text-gray-800">₹{stats.totalEarnings.toLocaleString('en-IN')}</p>
              </div>
              <div className="flex items-center gap-2 text-green-500 bg-green-50 px-3 py-1.5 rounded-xl w-fit">
                 <TrendingUp className="w-4 h-4" />
                 <span className="text-xs font-black">+12.5%</span>
              </div>
           </div>

           <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm flex flex-col justify-between group hover:border-blue-200 transition-all">
              <div>
                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Pending Settlement</p>
                 <p className="text-2xl font-black text-gray-800">₹{stats.pendingSettlement.toLocaleString('en-IN')}</p>
              </div>
              <div className="flex items-center gap-2 text-blue-500 bg-blue-50 px-3 py-1.5 rounded-xl w-fit font-black text-[10px] uppercase tracking-widest">
                 Processing
              </div>
           </div>
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
           <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-50/50">
              <h3 className="text-base font-black text-gray-800">Recent Transactions</h3>
              <div className="flex gap-2">
                 <div className="relative">
                    <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input type="text" placeholder="Search ID..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-orange-300 transition-all" />
                 </div>
                 <select value={filter} onChange={e => setFilter(e.target.value)} className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-black uppercase tracking-widest focus:ring-2 focus:ring-orange-300">
                    <option value="all">All</option>
                    <option value="seva">Sevas</option>
                    <option value="donation">Donations</option>
                    <option value="withdrawal">Withdrawals</option>
                 </select>
              </div>
           </div>

           <div className="overflow-x-auto">
              <table className="w-full text-left">
                 <thead>
                    <tr className="bg-gray-50/50">
                       <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase">Transaction ID</th>
                       <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase">Type & Source</th>
                       <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase">Amount</th>
                       <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase">Status</th>
                       <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase text-right">Date</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-50">
                    {filteredTransactions.map(t => (
                       <tr key={t._id} className="group hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                             <div className="flex items-center gap-2">
                                <span className="text-xs font-black text-gray-800">#{t.id || t._id.slice(-6).toUpperCase()}</span>
                                {!t.isRead && <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>}
                             </div>
                          </td>
                          <td className="px-6 py-4">
                             <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${t.type === 'withdrawal' ? 'bg-purple-50 text-purple-600' : 'bg-green-50 text-green-600'}`}>
                                   {t.type === 'withdrawal' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownLeft className="w-4 h-4" />}
                                </div>
                                <div>
                                   <p className="text-xs font-black text-gray-800 uppercase tracking-tighter">{t.type}</p>
                                   <p className="text-[10px] text-gray-500 font-medium">{t.category || t.devotee || 'General'}</p>
                                </div>
                             </div>
                          </td>
                          <td className="px-6 py-4">
                             <span className={`text-sm font-black ${t.type === 'withdrawal' ? 'text-red-500' : 'text-green-600'}`}>
                                {t.type === 'withdrawal' ? '-' : '+'}₹{t.amount.toLocaleString('en-IN')}
                             </span>
                          </td>
                          <td className="px-6 py-4">
                             <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest ${t.status === 'success' || t.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                                {t.status}
                             </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                             <p className="text-[10px] font-black text-gray-800">{t.date}</p>
                             <p className="text-[9px] text-gray-400 font-medium">{t.time}</p>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>

           {filteredTransactions.length === 0 && (
              <div className="p-16 text-center">
                 <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-200"><Wallet className="w-10 h-10" /></div>
                 <h4 className="text-xl font-black text-gray-800 mb-1">No transactions found</h4>
                 <p className="text-sm text-gray-500">Your financial movements will appear here.</p>
              </div>
           )}
        </div>
      </div>
      <WithdrawModal />
    </div>
  );
};

export default WalletManagement;
