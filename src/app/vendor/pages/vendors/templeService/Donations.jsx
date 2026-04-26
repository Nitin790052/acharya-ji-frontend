import React, { useState, useEffect } from 'react';
import VendorPageHeader from '../../../components/VendorPageHeader';
import { useAuth } from '../../../auth/AuthContext';
import { useGetVendorDonationsQuery } from '../../../../../services/vendorApi';
import { toast } from 'react-toastify';

import {
  IndianRupee,
  CalendarDays,
  Clock,
  Users,
  UserCircle,
  CheckCircle2,
  AlertCircle,
  Bell,
  Filter,
  Search,
  ChevronRight,
  Download,
  Eye,
  FileText,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  DollarSign,
  Gift,
  Heart,
  Upload,
  X,
  Printer,
  Mail,
  Phone,
  MapPin,
  Award,
  CreditCard,
  Wallet,
  Landmark,
  Star,
  RefreshCw
} from 'lucide-react';

const Donations = () => {
  const { user } = useAuth();
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [dateRange, setDateRange] = useState('month');

  // RTK Query
  const { data: donationsResponse, isLoading: isFetching, refetch } = useGetVendorDonationsQuery(user?._id, {
    skip: !user?._id
  });

  const donations = donationsResponse?.data || [];
  const isLoading = isFetching;

  // ============ STATS CALCULATION ============
  const getTodayDateString = () => {
    return new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const getMonthYearString = () => {
    return new Date().toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });
  };

  const stats = {
    totalDonations: donations.reduce((acc, d) => acc + (d.status === 'success' ? d.amount : 0), 0),
    todayDonations: donations
      .filter(d => d.date === getTodayDateString() && d.status === 'success')
      .reduce((acc, d) => acc + d.amount, 0),
    todayCount: donations.filter(d => d.date === getTodayDateString() && d.status === 'success').length,
    monthDonations: donations
      .filter(d => d.date?.includes(getMonthYearString()) && d.status === 'success')
      .reduce((acc, d) => acc + d.amount, 0),
    monthCount: donations.filter(d => d.date?.includes(getMonthYearString()) && d.status === 'success').length,
    avgDonation: donations.filter(d => d.status === 'success').length > 0 
      ? Math.round(donations.filter(d => d.status === 'success').reduce((acc, d) => acc + d.amount, 0) / donations.filter(d => d.status === 'success').length)
      : 0,
    pendingCount: donations.filter(d => d.status === 'pending').length,
    topDonation: donations.length > 0 ? Math.max(...donations.map(d => d.amount)) : 0,
    categories: {
      general: donations.filter(d => d.category === 'general' && d.status === 'success').reduce((acc, d) => acc + d.amount, 0),
      renovation: donations.filter(d => d.category === 'renovation' && d.status === 'success').reduce((acc, d) => acc + d.amount, 0),
      annadanam: donations.filter(d => d.category === 'annadanam' && d.status === 'success').reduce((acc, d) => acc + d.amount, 0),
      festival: donations.filter(d => d.category === 'festival' && d.status === 'success').reduce((acc, d) => acc + d.amount, 0),
      corpus: donations.filter(d => d.category === 'corpus' && d.status === 'success').reduce((acc, d) => acc + d.amount, 0)
    }
  };

  const unreadCount = donations.filter(d => !d.isRead).length;

  const categoryDistribution = [
    { name: 'General', amount: stats.categories.general, color: 'bg-blue-500' },
    { name: 'Annadanam', amount: stats.categories.annadanam, color: 'bg-green-500' },
    { name: 'Renovation', amount: stats.categories.renovation, color: 'bg-orange-500' },
    { name: 'Corpus', amount: stats.categories.corpus, color: 'bg-purple-500' },
    { name: 'Festival', amount: stats.categories.festival, color: 'bg-red-500' }
  ];

  // ============ HELPERS ============
  const getCategoryIcon = (category) => {
    switch(category?.toLowerCase()) {
      case 'general': return <Heart className="w-5 h-5 text-red-500" />;
      case 'renovation': return <Landmark className="w-5 h-5 text-orange-600" />;
      case 'annadanam': return <Gift className="w-5 h-5 text-green-600" />;
      case 'festival': return <Star className="w-5 h-5 text-yellow-500" />;
      case 'corpus': return <Wallet className="w-5 h-5 text-purple-600" />;
      default: return <IndianRupee className="w-5 h-5 text-blue-600" />;
    }
  };

  const getStatusStyles = (status) => {
    const base = "px-2 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider";
    switch(status?.toLowerCase()) {
      case 'success': return `${base} bg-green-100 text-green-700`;
      case 'pending': return `${base} bg-yellow-100 text-yellow-700`;
      case 'failed': return `${base} bg-red-100 text-red-700`;
      default: return `${base} bg-gray-100 text-gray-700`;
    }
  };

  const handleAction = (action, donation = null) => {
    switch(action) {
      case 'view':
        setSelectedDonation(donation);
        setShowReceiptModal(true);
        break;
      case 'refresh':
        refetch();
        toast.info('Refreshing donation records...');
        break;
      case 'print':
        window.print();
        break;
      case 'downloadReceipt':
        toast.info('Downloading receipt...');
        break;
    }
  };

  // ============ FILTERING ============
  const filteredDonations = donations.filter(d => {
    if (filter === 'all') return true;
    if (filter === 'success') return d.status === 'success';
    if (filter === 'pending') return d.status === 'pending';
    if (filter === 'today') return d.date === getTodayDateString();
    if (filter === 'month') return d.date?.includes(getMonthYearString());
    return d.category === filter;
  }).filter(d => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      (d.name || d.devotee || '').toLowerCase().includes(q) ||
      (d.receiptNo || '').toLowerCase().includes(q) ||
      (d._id || '').toLowerCase().includes(q)
    );
  });

  const ReceiptModal = () => {
    if (!showReceiptModal || !selectedDonation) return null;
    const d = selectedDonation;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
        <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
          <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 px-6 py-4 border-b border-orange-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                <FileText className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800">Donation Receipt</h3>
                <p className="text-xs text-gray-500">#{d.receiptNo || d._id?.slice(-8).toUpperCase()}</p>
              </div>
            </div>
            <button onClick={() => setShowReceiptModal(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><X className="w-5 h-5 text-gray-500" /></button>
          </div>

          <div className="p-8 space-y-6 overflow-y-auto max-h-[calc(90vh-80px)]">
            <div className="text-center space-y-2 pb-6 border-b border-gray-100">
               <div className="w-20 h-20 bg-orange-500 rounded-3xl flex items-center justify-center mx-auto shadow-lg shadow-orange-500/20 mb-4">
                  <Church className="w-10 h-10 text-white" />
               </div>
               <h2 className="text-2xl font-black text-gray-900">{user?.businessName || 'Shri Ram Mandir'}</h2>
               <p className="text-sm text-gray-500 font-medium">{user?.address || 'Temple Complex, Juhu, Mumbai'}</p>
               <div className="flex items-center justify-center gap-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  <span>GSTIN: {user?.gstin || '27ABCDE1234F'}</span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                  <span>PAN: {user?.pan || 'ABCDE1234F'}</span>
               </div>
            </div>

            <div className="flex justify-between items-start bg-gray-50 p-4 rounded-2xl border border-gray-100">
               <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter mb-1">Donor Details</p>
                  <p className="text-lg font-black text-gray-800">{d.name || d.devotee}</p>
                  <p className="text-sm text-gray-600 font-medium">{d.mobile || d.phone}</p>
               </div>
               <div className="text-right">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter mb-1">Receipt Date</p>
                  <p className="text-sm font-bold text-gray-800">{d.date || new Date(d.createdAt).toLocaleDateString()}</p>
               </div>
            </div>

            <div className="space-y-4">
               <div className="flex justify-between items-center p-4 rounded-2xl border border-gray-100">
                  <span className="text-sm font-bold text-gray-500">Donation Type</span>
                  <span className="text-sm font-black text-gray-800 capitalize">{d.type || d.category}</span>
               </div>
               <div className="flex justify-between items-center p-4 rounded-2xl border border-gray-100">
                  <span className="text-sm font-bold text-gray-500">Payment Mode</span>
                  <span className="text-sm font-black text-gray-800">{d.paymentMode}</span>
               </div>
               <div className="flex justify-between items-center p-6 rounded-3xl bg-orange-500 text-white shadow-xl shadow-orange-500/20">
                  <span className="text-lg font-bold">Total Amount</span>
                  <span className="text-3xl font-black">₹{(d.amount || 0).toLocaleString('en-IN')}</span>
               </div>
            </div>

            {d.message && (
               <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                  <p className="text-xs font-bold text-blue-700 uppercase tracking-widest mb-1">Donor's Message</p>
                  <p className="text-sm text-gray-700 italic">"{d.message}"</p>
               </div>
            )}

            <div className="pt-8 border-t border-gray-100 flex items-end justify-between">
               <div className="space-y-1">
                  <div className="h-12 w-32 border-b border-gray-300"></div>
                  <p className="text-xs font-bold text-gray-400 uppercase">Authorized Signatory</p>
               </div>
               <p className="text-[10px] font-bold text-gray-300 uppercase max-w-[200px] text-right">This is a computer-generated receipt and does not require a physical signature.</p>
            </div>

            <div className="flex gap-3 no-print">
               <button onClick={() => handleAction('downloadReceipt', d)} className="flex-1 px-6 py-3 bg-gray-900 text-white font-bold rounded-2xl hover:bg-black transition-all flex items-center justify-center gap-2"><Download className="w-5 h-5" /> Download</button>
               <button onClick={() => handleAction('print')} className="px-6 py-3 bg-gray-100 text-gray-700 font-bold rounded-2xl hover:bg-gray-200 transition-all flex items-center justify-center gap-2"><Printer className="w-5 h-5" /> Print</button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-20 z-[150] flex items-center justify-center backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 shadow-2xl flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm font-bold text-gray-700">Fetching Records...</p>
          </div>
        </div>
      )}

      <VendorPageHeader title="DONATIONS & REPORTS" subtitle="Real-time tracking of temple contributions" />

      <div className="space-y-4 p-6">
        <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-2xl p-4 border border-orange-100 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4">
           <div>
              <p className="text-lg font-black text-gray-800">₹{stats.totalDonations.toLocaleString('en-IN')}</p>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Lifetime Total Collection</p>
           </div>
           <div className="flex items-center gap-6">
              <div className="text-right">
                 <p className="text-sm font-bold text-orange-600">₹{stats.monthDonations.toLocaleString('en-IN')}</p>
                 <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Current Month</p>
              </div>
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                 <IndianRupee className="w-6 h-6 text-orange-600" />
              </div>
           </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
           {[
             { label: 'Today', val: `₹${stats.todayDonations.toLocaleString('en-IN')}`, sub: `${stats.todayCount} donations`, color: 'orange', icon: TrendingUp },
             { label: 'Avg. Donation', val: `₹${stats.avgDonation.toLocaleString('en-IN')}`, sub: 'Per donor', color: 'blue', icon: Heart },
             { label: 'Top Donor', val: `₹${stats.topDonation.toLocaleString('en-IN')}`, sub: 'Lifetime peak', color: 'green', icon: Award },
             { label: 'Pending', val: stats.pendingCount, sub: 'Needs sync', color: 'amber', icon: AlertCircle }
           ].map((s, i) => (
             <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm group hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-2">
                   <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{s.label}</span>
                   <div className={`p-1.5 bg-${s.color}-50 rounded-lg group-hover:scale-110 transition-transform`}>
                      <s.icon className={`w-4 h-4 text-${s.color}-500`} />
                   </div>
                </div>
                <p className="text-xl font-black text-gray-800">{s.val}</p>
                <p className={`text-[10px] font-bold text-${s.color}-500`}>{s.sub}</p>
             </div>
           ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
           <div className="lg:col-span-2 space-y-4">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                 <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
                    <h3 className="text-base font-black text-gray-800">Donation History</h3>
                    <div className="flex gap-2">
                       <div className="relative">
                          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input type="text" placeholder="Search donors..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9 pr-4 py-2 bg-gray-50 border-none rounded-xl text-xs focus:ring-2 focus:ring-orange-300 w-full sm:w-48 transition-all" />
                       </div>
                       <button onClick={() => handleAction('refresh')} className="p-2 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"><RefreshCw className={`w-4 h-4 text-gray-600 ${isFetching ? 'animate-spin' : ''}`} /></button>
                    </div>
                 </div>

                 <div className="p-4 flex flex-wrap gap-2 border-b border-gray-50">
                    {['all', 'today', 'month', 'general', 'annadanam', 'renovation', 'corpus'].map(f => (
                       <button key={f} onClick={() => setFilter(f)} className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border-2 transition-all ${filter === f ? 'bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/20' : 'bg-white border-gray-100 text-gray-400 hover:border-orange-200'}`}>
                          {f}
                       </button>
                    ))}
                 </div>

                 <div className="overflow-x-auto">
                    <table className="w-full text-left">
                       <thead>
                          <tr className="bg-gray-50/50">
                             <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase">Devotee</th>
                             <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase">Category</th>
                             <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase">Amount</th>
                             <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase">Status</th>
                             <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase text-right">Receipt</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-gray-50">
                          {filteredDonations.map((d) => (
                             <tr key={d._id} className="group hover:bg-gray-50/80 transition-colors">
                                <td className="px-6 py-4">
                                   <div className="flex items-center gap-3">
                                      <div className="w-9 h-9 bg-gradient-to-br from-orange-100 to-amber-100 rounded-xl flex items-center justify-center text-orange-700 font-bold text-xs">{(d.name || d.devotee || '?')[0].toUpperCase()}</div>
                                      <div>
                                         <p className="text-sm font-bold text-gray-800">{d.name || d.devotee}</p>
                                         <p className="text-[10px] text-gray-400">{d.date || new Date(d.createdAt).toLocaleDateString()}</p>
                                      </div>
                                   </div>
                                </td>
                                <td className="px-6 py-4">
                                   <div className="flex items-center gap-2">
                                      <div className="p-1 bg-gray-100 rounded-lg">{getCategoryIcon(d.category)}</div>
                                      <span className="text-xs font-bold text-gray-600 capitalize">{d.category}</span>
                                   </div>
                                </td>
                                <td className="px-6 py-4">
                                   <p className="text-sm font-black text-gray-800">₹{(d.amount || 0).toLocaleString('en-IN')}</p>
                                   <p className="text-[10px] text-gray-400 font-bold">{d.paymentMode}</p>
                                </td>
                                <td className="px-6 py-4"><span className={getStatusStyles(d.status)}>{d.status}</span></td>
                                <td className="px-6 py-4 text-right">
                                   <button onClick={() => handleAction('view', d)} className="p-2 text-gray-400 hover:text-orange-500 hover:bg-orange-50 rounded-xl transition-all"><Eye className="w-5 h-5" /></button>
                                </td>
                             </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>

                 {filteredDonations.length === 0 && (
                    <div className="p-16 text-center">
                       <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300"><Heart className="w-10 h-10" /></div>
                       <h4 className="text-lg font-bold text-gray-800 mb-1">No donations found</h4>
                       <p className="text-sm text-gray-500">Records will appear here once devotees start contributing.</p>
                    </div>
                 )}
              </div>
           </div>

           <div className="space-y-4">
              <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
                 <h3 className="text-base font-black text-gray-800 mb-4 flex items-center gap-2"><PieChart className="w-5 h-5 text-orange-500" /> Category Split</h3>
                 <div className="space-y-4">
                    {categoryDistribution.map((cat, i) => (
                       <div key={i} className="space-y-1.5">
                          <div className="flex justify-between text-xs font-bold">
                             <span className="text-gray-500 capitalize">{cat.name}</span>
                             <span className="text-gray-800">₹{(cat.amount || 0).toLocaleString('en-IN')}</span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                             <div className={`h-full ${cat.color} rounded-full`} style={{ width: `${stats.totalDonations > 0 ? (cat.amount / stats.totalDonations) * 100 : 0}%` }}></div>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>

              <div className="bg-gray-900 rounded-3xl p-6 text-white relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/20 rounded-full blur-2xl -mr-8 -mt-8"></div>
                 <div className="relative z-10">
                    <TrendingUp className="w-8 h-8 text-orange-500 mb-4" />
                    <h4 className="text-lg font-black mb-1">Insights</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">Donations are up 12% this month compared to last. Most contributions are coming through UPI for Annadanam.</p>
                    <button className="mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">Download Full Report</button>
                 </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
                 <h4 className="text-sm font-black text-gray-800 mb-4">Quick Links</h4>
                 <div className="grid grid-cols-2 gap-2">
                    <button className="p-3 bg-gray-50 rounded-2xl hover:bg-orange-50 hover:text-orange-600 transition-all flex flex-col items-center gap-2">
                       <Printer className="w-5 h-5" />
                       <span className="text-[10px] font-bold">Batch Print</span>
                    </button>
                    <button className="p-3 bg-gray-50 rounded-2xl hover:bg-blue-50 hover:text-blue-600 transition-all flex flex-col items-center gap-2">
                       <Mail className="w-5 h-5" />
                       <span className="text-[10px] font-bold">Resend All</span>
                    </button>
                 </div>
              </div>
           </div>
        </div>
      </div>
      <ReceiptModal />
    </div>
  );
};

export default Donations;
