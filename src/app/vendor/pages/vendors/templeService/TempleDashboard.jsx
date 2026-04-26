import React, { useState, useEffect } from 'react';
import VendorPageHeader from '../../../components/VendorPageHeader';
import { useAuth } from '../../../auth/AuthContext';
import { 
  useGetVendorBookingsQuery, 
  useGetVendorDonationsQuery,
  useGetVendorEventsQuery,
  useGetVendorStaffQuery
} from '../../../../../services/vendorApi';
import { toast } from 'react-toastify';

import { 
  ShoppingBag,
  IndianRupee,
  Gift,
  Wallet,
  Users,
  Clock,
  TrendingUp,
  TrendingDown,
  Bell,
  ChevronRight,
  Filter,
  Search,
  Download,
  Eye,
  CheckCircle2,
  AlertCircle,
  CalendarDays,
  Star,
  MapPin,
  UserCircle,
  RefreshCw,
  Award
} from 'lucide-react';

const TempleDashboard = () => {
  const { user } = useAuth();
  const [filter, setFilter] = useState('all');

  // RTK Queries
  const { data: bookingsRes, isLoading: bLoading, refetch: bRefetch } = useGetVendorBookingsQuery(user?._id, { skip: !user?._id });
  const { data: donationsRes, isLoading: dLoading, refetch: dRefetch } = useGetVendorDonationsQuery(user?._id, { skip: !user?._id });
  const { data: eventsRes, isLoading: eLoading, refetch: eRefetch } = useGetVendorEventsQuery(user?._id, { skip: !user?._id });
  const { data: staffRes, isLoading: sLoading, refetch: sRefetch } = useGetVendorStaffQuery(user?._id, { skip: !user?._id });

  const bookings = bookingsRes?.data || [];
  const donations = donationsRes?.data || [];
  const events = eventsRes?.data || [];
  const staff = staffRes?.data || [];

  const isLoading = bLoading || dLoading || eLoading || sLoading;

  const refetchAll = () => {
    bRefetch();
    dRefetch();
    eRefetch();
    sRefetch();
    toast.info('Dashboard data refreshed');
  };

  // ============ STATS ============
  const today = new Date().toISOString().split('T')[0];
  const todayBookings = bookings.filter(b => b.date === today);
  const todayDonations = donations.filter(d => d.date === today && d.status === 'success');
  
  const dashboardStats = {
    todayBookings: todayBookings.length,
    todayDonationsAmount: todayDonations.reduce((acc, d) => acc + d.amount, 0),
    upcomingEvents: events.filter(e => e.status === 'upcoming').length,
    walletBalance: 284500, // This would usually come from a payout/wallet API
    staffOnDuty: staff.filter(s => s.status === 'available').length
  };

  const getStatusStyles = (status) => {
    const base = "px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest";
    switch(status?.toLowerCase()) {
      case 'confirmed':
      case 'success':
      case 'completed':
        return `${base} bg-green-100 text-green-700`;
      case 'pending':
        return `${base} bg-orange-100 text-orange-700`;
      case 'cancelled':
      case 'failed':
        return `${base} bg-red-100 text-red-700`;
      default:
        return `${base} bg-gray-100 text-gray-700`;
    }
  };

  const getActivityIcon = (type) => {
    switch(type) {
      case 'booking': return <ShoppingBag className="w-5 h-5 text-green-600" />;
      case 'donation': return <IndianRupee className="w-5 h-5 text-blue-600" />;
      case 'event': return <Gift className="w-5 h-5 text-purple-600" />;
      default: return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-20 z-[150] flex items-center justify-center backdrop-blur-sm">
           <div className="bg-white rounded-3xl p-8 shadow-2xl flex flex-col items-center gap-4">
              <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-sm font-black text-gray-800">Updating Dashboard...</p>
           </div>
        </div>
      )}

      <VendorPageHeader title="TEMPLE DASHBOARD" subtitle="Centralized management for your temple services" />

      <div className="space-y-4 p-6">
        <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-2xl p-4 border border-orange-100 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4">
           <div>
              <p className="text-lg font-black text-gray-800">Welcome, {user?.businessName || 'Admin'}</p>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">You have {dashboardStats.todayBookings} bookings today</p>
           </div>
           <div className="flex items-center gap-6">
              <div className="text-right">
                 <p className="text-sm font-black text-orange-600">₹{dashboardStats.todayDonationsAmount.toLocaleString('en-IN')}</p>
                 <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Today's Collection</p>
              </div>
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                 <Clock className="w-6 h-6 text-orange-600" />
              </div>
           </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
           {[
             { label: 'Today Bookings', val: dashboardStats.todayBookings, icon: ShoppingBag, color: 'green', sub: `+${todayBookings.length} today` },
             { label: 'Donations', val: `₹${dashboardStats.todayDonationsAmount.toLocaleString('en-IN')}`, icon: IndianRupee, color: 'blue', sub: 'Real-time sync' },
             { label: 'Upcoming Events', val: dashboardStats.upcomingEvents, icon: Gift, color: 'purple', sub: 'Next 30 days' },
             { label: 'Available Staff', val: dashboardStats.staffOnDuty, icon: Users, color: 'orange', sub: 'On duty now' }
           ].map((s, i) => (
             <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-all group">
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
           <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                 <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                    <h3 className="text-base font-black text-gray-800">Recent Bookings</h3>
                    <button onClick={refetchAll} className="p-2 hover:bg-white rounded-xl transition-all"><RefreshCw className="w-4 h-4 text-gray-400" /></button>
                 </div>
                 <div className="divide-y divide-gray-50">
                    {bookings.slice(0, 5).map(b => (
                       <div key={b._id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-all group">
                          <div className="flex items-center gap-4">
                             <div className="w-10 h-10 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600 font-bold group-hover:bg-orange-500 group-hover:text-white transition-all">
                                {(b.user?.name || b.name || '?')[0].toUpperCase()}
                             </div>
                             <div>
                                <p className="text-sm font-bold text-gray-800">{b.user?.name || b.name}</p>
                                <p className="text-[10px] font-bold text-gray-400 uppercase">{b.pujaType || b.seva}</p>
                             </div>
                          </div>
                          <div className="text-right">
                             <p className="text-sm font-black text-gray-800">₹{(b.amount || 0).toLocaleString('en-IN')}</p>
                             <span className={getStatusStyles(b.status)}>{b.status}</span>
                          </div>
                       </div>
                    ))}
                    {bookings.length === 0 && <div className="p-10 text-center text-gray-400 text-sm font-bold">No recent bookings</div>}
                 </div>
                 <div className="p-3 bg-gray-50/50 border-t border-gray-50">
                    <button className="w-full py-2 text-xs font-black text-orange-500 uppercase tracking-widest hover:text-orange-600 transition-colors">View All Bookings</button>
                 </div>
              </div>

              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                 <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                    <h3 className="text-base font-black text-gray-800">Latest Donations</h3>
                    <IndianRupee className="w-4 h-4 text-blue-500" />
                 </div>
                 <div className="divide-y divide-gray-50">
                    {donations.slice(0, 5).map(d => (
                       <div key={d._id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-all group">
                          <div className="flex items-center gap-4">
                             <div className="w-10 h-10 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 font-bold group-hover:bg-blue-500 group-hover:text-white transition-all">
                                {(d.name || d.devotee || '?')[0].toUpperCase()}
                             </div>
                             <div>
                                <p className="text-sm font-bold text-gray-800">{d.name || d.devotee}</p>
                                <p className="text-[10px] font-bold text-gray-400 uppercase">{d.category || 'General'}</p>
                             </div>
                          </div>
                          <div className="text-right">
                             <p className="text-sm font-black text-gray-800">₹{(d.amount || 0).toLocaleString('en-IN')}</p>
                             <span className={getStatusStyles(d.status)}>{d.status}</span>
                          </div>
                       </div>
                    ))}
                    {donations.length === 0 && <div className="p-10 text-center text-gray-400 text-sm font-bold">No recent donations</div>}
                 </div>
                 <div className="p-3 bg-gray-50/50 border-t border-gray-50">
                    <button className="w-full py-2 text-xs font-black text-blue-500 uppercase tracking-widest hover:text-blue-600 transition-colors">View All Donations</button>
                 </div>
              </div>
           </div>

           <div className="space-y-6">
              <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">
                 <h3 className="text-base font-black text-gray-800 mb-4 flex items-center gap-2"><Star className="w-5 h-5 text-orange-500" /> Upcoming Events</h3>
                 <div className="space-y-4">
                    {events.slice(0, 3).map(e => (
                       <div key={e._id} className="p-4 bg-gray-50 rounded-2xl border border-gray-50 group hover:border-orange-200 transition-all">
                          <p className="text-xs font-black text-gray-400 uppercase tracking-tighter mb-1">{e.date}</p>
                          <p className="text-sm font-bold text-gray-800 group-hover:text-orange-500 transition-colors">{e.name}</p>
                          <div className="flex items-center justify-between mt-2">
                             <span className="text-[10px] font-bold text-gray-500">{e.venue}</span>
                             <span className="text-[10px] font-black text-orange-500 bg-orange-50 px-2 py-0.5 rounded-full">{e.registeredCount || 0} Reg.</span>
                          </div>
                       </div>
                    ))}
                    {events.length === 0 && <div className="text-center text-gray-400 text-xs font-bold py-4">No upcoming events</div>}
                 </div>
              </div>

              <div className="bg-gray-900 rounded-3xl p-6 text-white relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
                 <h4 className="text-lg font-black mb-2 relative z-10">Quick Support</h4>
                 <p className="text-xs text-gray-400 mb-4 relative z-10">Need help managing your temple dashboard? Contact our dedicated support team.</p>
                 <button className="w-full py-3 bg-white text-gray-900 font-black rounded-2xl hover:bg-orange-500 hover:text-white transition-all text-xs uppercase tracking-widest relative z-10">Get Help Now</button>
              </div>

              <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">
                 <h4 className="text-sm font-black text-gray-800 mb-4">Quick Actions</h4>
                 <div className="grid grid-cols-2 gap-3">
                    <button className="flex flex-col items-center justify-center p-4 bg-orange-50 rounded-2xl hover:bg-orange-100 transition-all gap-2 group">
                       <ShoppingBag className="w-6 h-6 text-orange-500 group-hover:scale-110 transition-transform" />
                       <span className="text-[10px] font-black text-orange-600 uppercase">New Seva</span>
                    </button>
                    <button className="flex flex-col items-center justify-center p-4 bg-blue-50 rounded-2xl hover:bg-blue-100 transition-all gap-2 group">
                       <IndianRupee className="w-6 h-6 text-blue-500 group-hover:scale-110 transition-transform" />
                       <span className="text-[10px] font-black text-blue-600 uppercase">Donation</span>
                    </button>
                    <button className="flex flex-col items-center justify-center p-4 bg-purple-50 rounded-2xl hover:bg-purple-100 transition-all gap-2 group">
                       <Gift className="w-6 h-6 text-purple-500 group-hover:scale-110 transition-transform" />
                       <span className="text-[10px] font-black text-purple-600 uppercase">Add Event</span>
                    </button>
                    <button className="flex flex-col items-center justify-center p-4 bg-green-50 rounded-2xl hover:bg-green-100 transition-all gap-2 group">
                       <Users className="w-6 h-6 text-green-500 group-hover:scale-110 transition-transform" />
                       <span className="text-[10px] font-black text-green-600 uppercase">Staff</span>
                    </button>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default TempleDashboard;
