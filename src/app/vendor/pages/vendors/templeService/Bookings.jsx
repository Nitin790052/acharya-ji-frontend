import React, { useState, useEffect } from 'react';
import VendorPageHeader from '../../../components/VendorPageHeader';
import { useAuth } from '../../../auth/AuthContext';
import { 
  useGetVendorBookingsQuery, 
  useUpdateBookingMutation 
} from '../../../../../services/vendorApi';
import { toast } from 'react-toastify';

import {
  ShoppingBag,
  IndianRupee,
  CalendarDays,
  Clock,
  Users,
  UserCircle,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Bell,
  Filter,
  Search,
  ChevronRight,
  Download,
  Eye,
  Edit3,
  Trash2,
  X,
  Check,
  MapPin,
  Phone,
  Mail,
  FileText,
  Home,
  Church,
  Award,
  PlusCircle,
  RefreshCw
} from 'lucide-react';

const BookingsTemple = () => {
  const { user } = useAuth();
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [dateFilter, setDateFilter] = useState('today');

  // RTK Query
  const { data: bookingsResponse, isLoading: isFetching, refetch } = useGetVendorBookingsQuery(user?._id, {
    skip: !user?._id
  });
  const [updateBooking, { isLoading: isUpdating }] = useUpdateBookingMutation();

  const bookings = bookingsResponse?.data || [];
  const isLoading = isFetching || isUpdating;

  // ============ STATS ============
  const getTodayDateString = () => {
    const today = new Date();
    return today.toISOString().split('T')[0]; // YYYY-MM-DD
  };

  const getTomorrowDateString = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const isThisWeek = (dateStr) => {
    const date = new Date(dateStr);
    const now = new Date();
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
    const endOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 6));
    return date >= startOfWeek && date <= endOfWeek;
  };

  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status.toLowerCase() === 'pending').length,
    confirmed: bookings.filter(b => b.status.toLowerCase() === 'confirmed').length,
    completed: bookings.filter(b => b.status.toLowerCase() === 'completed').length,
    cancelled: bookings.filter(b => b.status.toLowerCase() === 'cancelled').length,
    todayRevenue: bookings
      .filter(b => b.date === getTodayDateString() && b.status.toLowerCase() !== 'cancelled')
      .reduce((acc, b) => acc + (b.amount || 0), 0),
    todayBookings: bookings.filter(b => b.date === getTodayDateString()).length
  };

  const unreadCount = bookings.filter(b => !b.isRead).length;

  // ============ HELPERS ============
  const getTypeIcon = (type) => {
    switch(type?.toLowerCase()) {
      case 'seva': return <ShoppingBag className="w-5 h-5 text-green-600" />;
      case 'puja': return <Bell className="w-5 h-5 text-orange-500" />;
      case 'katha': return <FileText className="w-5 h-5 text-purple-600" />;
      case 'hall': return <Home className="w-5 h-5 text-blue-600" />;
      case 'special': return <Award className="w-5 h-5 text-red-500" />;
      default: return <CalendarDays className="w-5 h-5 text-gray-500" />;
    }
  };

  const getPriorityStyles = (priority) => {
    const base = "px-2 py-0.5 rounded-full text-xs font-medium capitalize";
    switch(priority?.toLowerCase()) {
      case 'critical': return `${base} bg-red-50 text-red-700`;
      case 'high': return `${base} bg-orange-50 text-orange-500`;
      case 'medium': return `${base} bg-blue-50 text-blue-600`;
      case 'low': return `${base} bg-gray-100 text-gray-600`;
      default: return `${base} bg-gray-100 text-gray-600`;
    }
  };

  const getStatusStyles = (status) => {
    const base = "px-2 py-0.5 rounded-full text-xs font-medium capitalize";
    switch(status?.toLowerCase()) {
      case 'confirmed': return `${base} bg-green-50 text-green-700`;
      case 'pending': return `${base} bg-orange-50 text-orange-500`;
      case 'completed': return `${base} bg-blue-50 text-blue-600`;
      case 'cancelled': return `${base} bg-red-50 text-red-700`;
      default: return `${base} bg-gray-100 text-gray-600`;
    }
  };

  const handleAction = async (action, booking = null) => {
    try {
      switch(action) {
        case 'view':
          setSelectedBooking(booking);
          setShowDetailsModal(true);
          if (!booking.isRead) {
            await updateBooking({ id: booking._id, isRead: true }).unwrap();
          }
          break;
        
        case 'accept':
          await updateBooking({ 
            id: booking._id, 
            status: 'Confirmed', 
            isRead: true 
          }).unwrap();
          toast.success('Booking confirmed');
          break;
        
        case 'reject':
          if (window.confirm('Are you sure you want to reject this booking?')) {
            await updateBooking({ 
              id: booking._id, 
              status: 'Cancelled', 
              isRead: true 
            }).unwrap();
            toast.success('Booking cancelled');
          }
          break;
        
        case 'assignPandit':
          const pandit = prompt('Enter pandit name:', booking?.pandit || '');
          if (pandit) {
            await updateBooking({ id: booking._id, pandit }).unwrap();
            toast.success('Pandit assigned');
          }
          break;
        
        case 'markAsRead':
          await updateBooking({ id: booking._id, isRead: true }).unwrap();
          break;
        
        case 'refresh':
          refetch();
          toast.info('Refreshing bookings...');
          break;

        case 'downloadReceipt':
          toast.info('Generating receipt...');
          break;
      }
    } catch (err) {
      toast.error(err.data?.message || 'Action failed');
    }
  };

  // ============ FILTERING LOGIC ============
  const filteredBookings = bookings.filter(b => {
    // Category/Status filter
    if (filter === 'all') return true;
    if (['seva', 'puja', 'katha', 'hall', 'special'].includes(filter)) {
      return (b.pujaType || b.type)?.toLowerCase() === filter;
    }
    return b.status?.toLowerCase() === filter;
  }).filter(b => {
    // Date filter
    const today = getTodayDateString();
    const tomorrow = getTomorrowDateString();
    if (dateFilter === 'today') return b.date === today;
    if (dateFilter === 'tomorrow') return b.date === tomorrow;
    if (dateFilter === 'week') return isThisWeek(b.date);
    return true;
  }).filter(b => {
    // Search filter
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    const name = (b.user?.name || b.name || '').toLowerCase();
    const puja = (b.pujaType || b.seva || '').toLowerCase();
    const id = (b._id || b.id || '').toLowerCase();
    return name.includes(q) || puja.includes(q) || id.includes(q) || b.mobile?.includes(q);
  });

  const DetailsModal = () => {
    if (!showDetailsModal || !selectedBooking) return null;
    const b = selectedBooking;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
        <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
          <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 px-6 py-4 border-b border-orange-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                <Eye className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800">Booking Details</h3>
                <p className="text-xs text-gray-500">ID: #{b._id?.slice(-8).toUpperCase()}</p>
              </div>
            </div>
            <button onClick={() => setShowDetailsModal(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><X className="w-5 h-5 text-gray-500" /></button>
          </div>

          <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-80px)]">
            <div className="flex items-center justify-between">
              <span className={getStatusStyles(b.status)}>{b.status}</span>
              <span className={getPriorityStyles(b.priority || 'medium')}>{b.priority || 'medium'} priority</span>
            </div>

            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-orange-500/20">
                {(b.user?.name || b.name || '?')[0].toUpperCase()}
              </div>
              <div className="flex-1">
                <h4 className="text-base font-bold text-gray-800">{b.user?.name || b.name}</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                  <span className="text-sm text-gray-600 flex items-center gap-2"><Phone className="w-4 h-4 text-gray-400" />{b.user?.mobile || b.mobile}</span>
                  <span className="text-sm text-gray-600 flex items-center gap-2"><Mail className="w-4 h-4 text-gray-400" />{b.user?.email || 'N/A'}</span>
                </div>
                <p className="text-sm text-gray-600 flex items-center gap-2 mt-2"><MapPin className="w-4 h-4 text-gray-400" />{b.city || 'N/A'}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Service</p>
                <p className="text-sm font-bold text-gray-800">{b.pujaType || b.seva}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Date & Time</p>
                <p className="text-sm font-bold text-gray-800">{b.date}</p>
                <p className="text-xs text-gray-500">{b.time || b.mode}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Amount</p>
                <p className="text-sm font-bold text-green-600">₹{(b.amount || 0).toLocaleString('en-IN')}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Pandit</p>
                <p className="text-sm font-bold text-gray-800">{b.pandit || 'Not Assigned'}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Payment</p>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${b.paymentStatus === 'paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                  {b.paymentStatus?.toUpperCase()}
                </span>
              </div>
            </div>

            {b.message && (
              <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                <p className="text-xs font-bold text-blue-700 uppercase tracking-wider mb-2">Devotee Message</p>
                <p className="text-sm text-gray-700 leading-relaxed">{b.message}</p>
              </div>
            )}

            <div className="flex flex-wrap gap-3 pt-6 border-t border-gray-100">
              {b.status.toLowerCase() === 'pending' && (
                <>
                  <button onClick={() => { handleAction('accept', b); setShowDetailsModal(false); }} className="flex-1 px-4 py-2.5 bg-green-600 text-white text-sm font-bold rounded-xl hover:bg-green-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-600/20"><Check className="w-4 h-4" /> Accept</button>
                  <button onClick={() => { handleAction('reject', b); setShowDetailsModal(false); }} className="flex-1 px-4 py-2.5 bg-red-50 text-red-600 text-sm font-bold rounded-xl border border-red-100 hover:bg-red-100 transition-all flex items-center justify-center gap-2"><X className="w-4 h-4" /> Reject</button>
                </>
              )}
              <button onClick={() => { handleAction('assignPandit', b); setShowDetailsModal(false); }} className="flex-1 px-4 py-2.5 bg-orange-50 text-orange-600 text-sm font-bold rounded-xl border border-orange-100 hover:bg-orange-100 transition-all flex items-center justify-center gap-2"><UserCircle className="w-4 h-4" /> {b.pandit ? 'Change Pandit' : 'Assign Pandit'}</button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-[150] flex items-center justify-center backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 flex flex-col items-center gap-4 shadow-2xl">
            <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm font-bold text-gray-700">Syncing Bookings...</p>
          </div>
        </div>
      )}

      <VendorPageHeader title="BOOKINGS MANAGEMENT" subtitle="Track and manage your temple services efficiently" />

      <div className="space-y-4 p-6">
        <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-2xl px-4 py-3 border border-orange-200 shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <p className="text-lg font-bold text-gray-800">
                {stats.todayBookings} Bookings Today
              </p>
              <p className="text-sm text-gray-500">₹{stats.todayRevenue.toLocaleString('en-IN')} Revenue Collected</p>
            </div>
            <div className="flex items-center gap-4 bg-white/60 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/50">
              <div className="text-right">
                <p className="text-xs font-bold text-gray-400 uppercase">Pending Approval</p>
                <p className="text-lg font-black text-orange-500">{stats.pending}</p>
              </div>
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-orange-500" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Total', val: stats.total, icon: CalendarDays, color: 'orange', sub: `+${stats.todayBookings} today` },
            { label: 'Pending', val: stats.pending, icon: AlertCircle, color: 'amber', sub: 'Action required' },
            { label: 'Confirmed', val: stats.confirmed, icon: CheckCircle2, color: 'green', sub: 'Live services' },
            { label: 'Completed', val: stats.completed, icon: CheckCircle2, color: 'blue', sub: 'Successfully done' }
          ].map((s, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-all group">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{s.label}</p>
                <div className={`p-2 bg-${s.color}-50 rounded-xl group-hover:scale-110 transition-transform`}>
                  <s.icon className={`w-5 h-5 text-${s.color}-500`} />
                </div>
              </div>
              <p className="text-2xl font-black text-gray-800">{s.val}</p>
              <p className={`text-xs font-medium text-${s.color}-500 mt-1`}>{s.sub}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <button onClick={() => handleAction('refresh')} className="px-5 py-2.5 bg-white text-gray-800 text-sm font-bold rounded-xl border border-gray-200 hover:bg-gray-50 transition-all flex items-center gap-2 shadow-sm active:scale-95">
            <RefreshCw className={`w-4 h-4 ${isFetching ? 'animate-spin' : ''}`} /> Refresh Feed
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm space-y-4">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><Search className="w-4 h-4 text-gray-400" /></div>
              <input type="text" placeholder="Search by name, ID, or phone..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-orange-300 transition-all" />
            </div>

            <div className="flex gap-2 p-1 bg-gray-100 rounded-xl">
              {['today', 'tomorrow', 'week'].map((d) => (
                <button key={d} onClick={() => setDateFilter(d)} className={`flex-1 px-4 py-1.5 rounded-lg text-sm font-bold capitalize transition-all ${dateFilter === d ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {['all', 'seva', 'puja', 'katha', 'hall', 'special'].map((f) => (
              <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-xl text-sm font-bold capitalize border-2 transition-all ${filter === f ? 'bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/20' : 'bg-white border-gray-100 text-gray-500 hover:border-orange-200'}`}>
                {f} ({f === 'all' ? stats.total : bookings.filter(b => (b.pujaType || b.type)?.toLowerCase() === f).length})
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-50">
            {['pending', 'confirmed', 'completed', 'cancelled'].map((s) => (
              <button key={s} onClick={() => setFilter(s)} className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${filter === s ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
                {s} ({bookings.filter(b => b.status.toLowerCase() === s).length})
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
            <h3 className="text-base font-black text-gray-800">Recent Bookings</h3>
            <span className="text-sm font-bold text-orange-500 bg-orange-50 px-3 py-1 rounded-full">{filteredBookings.length} Bookings</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Devotee</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Service</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Schedule</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Payment</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredBookings.map((b) => (
                  <tr key={b._id} className={`group hover:bg-gray-50/80 transition-colors ${!b.isRead ? 'bg-orange-50/30' : ''}`}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-orange-100 to-amber-100 rounded-xl flex items-center justify-center text-orange-700 font-bold shadow-sm">
                          {(b.user?.name || b.name || '?')[0].toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-800">{b.user?.name || b.name}</p>
                          <p className="text-xs text-gray-500">#{b._id?.slice(-6).toUpperCase()}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">{getTypeIcon(b.pujaType || b.type)}</div>
                        <div>
                          <p className="text-sm font-bold text-gray-800">{b.pujaType || b.seva}</p>
                          <p className="text-xs text-gray-500 capitalize">{b.type || 'puja'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-gray-800">{b.date}</span>
                        <span className="text-xs text-gray-500">{b.time || b.mode}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-bold text-gray-800">₹{(b.amount || 0).toLocaleString('en-IN')}</p>
                        <p className={`text-[10px] font-black uppercase tracking-tighter ${b.paymentStatus === 'paid' ? 'text-green-500' : 'text-orange-500'}`}>{b.paymentStatus || 'pending'}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={getStatusStyles(b.status)}>{b.status}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => handleAction('view', b)} className="p-2 text-gray-400 hover:text-orange-500 hover:bg-orange-50 rounded-xl transition-all" title="View"><Eye className="w-5 h-5" /></button>
                        {b.status.toLowerCase() === 'pending' && (
                          <button onClick={() => handleAction('accept', b)} className="p-2 text-green-500 hover:bg-green-50 rounded-xl transition-all" title="Accept"><Check className="w-5 h-5" /></button>
                        )}
                        <button onClick={() => handleAction('downloadReceipt', b)} className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-xl transition-all" title="Receipt"><Download className="w-5 h-5" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredBookings.length === 0 && (
            <div className="p-16 text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                <CalendarDays className="w-10 h-10" />
              </div>
              <h4 className="text-lg font-bold text-gray-800 mb-1">No bookings match your filter</h4>
              <p className="text-sm text-gray-500 max-w-xs mx-auto">Try changing your search keywords or date filters to find what you're looking for.</p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
           <div className="lg:col-span-2 space-y-6">
              {/* Dynamic support card */}
              <div className="bg-gray-900 rounded-3xl p-6 text-white flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
                 <div className="relative z-10">
                    <h4 className="text-xl font-bold mb-2">Grow your Temple Services</h4>
                    <p className="text-gray-400 text-sm max-w-md">Check out our latest insights on how to improve your devotee engagement and booking experience.</p>
                 </div>
                 <button className="relative z-10 px-6 py-3 bg-white text-gray-900 font-bold rounded-2xl hover:bg-orange-500 hover:text-white transition-all active:scale-95 whitespace-nowrap">Explore Guide</button>
              </div>
           </div>

           <div className="space-y-6">
              <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">
                 <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><Filter className="w-5 h-5 text-orange-500" /> Quick Overview</h4>
                 <div className="space-y-4">
                    {[
                      { label: 'Unread Bookings', val: unreadCount, color: 'orange' },
                      { label: 'Avg. Value', val: `₹${bookings.length > 0 ? Math.round(bookings.reduce((a, b) => a + (b.amount || 0), 0) / bookings.length) : 0}`, color: 'blue' },
                      { label: 'Completion Rate', val: `${bookings.length > 0 ? Math.round((stats.completed / bookings.length) * 100) : 0}%`, color: 'green' }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between">
                         <span className="text-sm text-gray-500 font-medium">{item.label}</span>
                         <span className={`text-sm font-bold text-${item.color}-600 bg-${item.color}-50 px-2.5 py-1 rounded-lg`}>{item.val}</span>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      </div>
      <DetailsModal />
    </div>
  );
};

export default BookingsTemple;
