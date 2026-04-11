import React, { useState } from 'react';
import {
  // Core Icons
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
  const [filter, setFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [dateFilter, setDateFilter] = useState('today');

  // ============ BOOKINGS DATA ============
  const [bookings, setBookings] = useState([
    {
      id: 'BKG-7890',
      user: 'Rajesh Kumar',
      userAvatar: 'RK',
      seva: 'Annadanam Seva',
      type: 'seva',
      date: '22 Feb 2026',
      time: '10:23 AM',
      amount: 1100,
      status: 'pending',
      priority: 'high',
      pandit: 'Not Assigned',
      slots: 2,
      phone: '+91 98765 43210',
      email: 'rajesh.k@email.com',
      address: '12, Juhu Scheme, Mumbai',
      notes: 'Prefer morning slot. Vegetarian meal required.',
      read: false,
      receiptNo: 'RCT-2026-089'
    },
    {
      id: 'BKG-7891',
      user: 'Priya Sharma',
      userAvatar: 'PS',
      seva: 'Rudrabhishek',
      type: 'puja',
      date: '22 Feb 2026',
      time: '09:45 AM',
      amount: 501,
      status: 'confirmed',
      priority: 'medium',
      pandit: 'Pandit Ravi Shastri',
      slots: 1,
      phone: '+91 98765 43211',
      email: 'priya.s@email.com',
      address: '34, Andheri East, Mumbai',
      notes: 'Family of 4 attending.',
      read: true,
      receiptNo: 'RCT-2026-090'
    },
    {
      id: 'BKG-7892',
      user: 'Amit Patel',
      userAvatar: 'AP',
      seva: 'Satyanarayan Katha',
      type: 'katha',
      date: '22 Feb 2026',
      time: '08:30 AM',
      amount: 2500,
      status: 'completed',
      priority: 'medium',
      pandit: 'Pandit Suresh Joshi',
      slots: 5,
      phone: '+91 98765 43212',
      email: 'amit.p@email.com',
      address: '56, Goregaon West, Mumbai',
      notes: 'Anniversary celebration.',
      read: true,
      receiptNo: 'RCT-2026-091'
    },
    {
      id: 'BKG-7893',
      user: 'Sneha Reddy',
      userAvatar: 'SR',
      seva: 'Main Hall Booking',
      type: 'hall',
      date: '23 Feb 2026',
      time: '04:00 PM',
      amount: 5000,
      status: 'pending',
      priority: 'high',
      pandit: 'Not Assigned',
      slots: 50,
      phone: '+91 98765 43213',
      email: 'sneha.r@email.com',
      address: '78, Borivali West, Mumbai',
      notes: 'Wedding reception. Need stage setup.',
      read: false,
      receiptNo: 'RCT-2026-092'
    },
    {
      id: 'BKG-7894',
      user: 'Vikram Singh',
      userAvatar: 'VS',
      seva: 'Abhishek Puja',
      type: 'puja',
      date: '23 Feb 2026',
      time: '07:30 AM',
      amount: 750,
      status: 'confirmed',
      priority: 'medium',
      pandit: 'Pandit Ravi Shastri',
      slots: 1,
      phone: '+91 98765 43214',
      email: 'vikram.s@email.com',
      address: '90, Chembur, Mumbai',
      notes: 'Birthday puja.',
      read: true,
      receiptNo: 'RCT-2026-093'
    },
    {
      id: 'BKG-7895',
      user: 'Anita Desai',
      userAvatar: 'AD',
      seva: 'Laghu Rudra',
      type: 'special',
      date: '24 Feb 2026',
      time: '06:00 AM',
      amount: 5100,
      status: 'cancelled',
      priority: 'low',
      pandit: 'Pandit Suresh Joshi',
      slots: 11,
      phone: '+91 98765 43215',
      email: 'anita.d@email.com',
      address: '23, Dadar, Mumbai',
      notes: 'Cancelled due to family emergency.',
      read: true,
      receiptNo: 'RCT-2026-094'
    },
    {
      id: 'BKG-7896',
      user: 'Ramesh Gupta',
      userAvatar: 'RG',
      seva: 'Small Hall Booking',
      type: 'hall',
      date: '24 Feb 2026',
      time: '05:00 PM',
      amount: 3000,
      status: 'confirmed',
      priority: 'medium',
      pandit: 'Not Required',
      slots: 25,
      phone: '+91 98765 43216',
      email: 'ramesh.g@email.com',
      address: '45, Bandra West, Mumbai',
      notes: 'Bhajan sandhya event.',
      read: false,
      receiptNo: 'RCT-2026-095'
    }
  ]);

  // ============ PANDITS DATA ============
  const [pandits] = useState([
    { id: 1, name: 'Pandit Ravi Shastri', available: true },
    { id: 2, name: 'Pandit Suresh Joshi', available: true },
    { id: 3, name: 'Pandit Mahesh Upadhyay', available: false },
    { id: 4, name: 'Pandit Krishna Sharma', available: true }
  ]);

  // ============ STATS ============
  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === 'pending').length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    completed: bookings.filter(b => b.status === 'completed').length,
    cancelled: bookings.filter(b => b.status === 'cancelled').length,
    todayRevenue: bookings
      .filter(b => b.date === '22 Feb 2026' && b.status !== 'cancelled')
      .reduce((acc, b) => acc + b.amount, 0),
    todayBookings: bookings.filter(b => b.date === '22 Feb 2026').length
  };

  // ============ UNREAD COUNT ============
  const unreadCount = bookings.filter(b => !b.read).length;

  // ============ EXACT MATCH to NotificationsPuja ============
  const getTypeIcon = (type) => {
    switch(type) {
      case 'seva':
        return <ShoppingBag className="w-5 h-5 text-green-600" />;
      case 'puja':
        return <Bell className="w-5 h-5 text-orange-500" />;
      case 'katha':
        return <FileText className="w-5 h-5 text-purple-600" />;
      case 'hall':
        return <Home className="w-5 h-5 text-blue-600" />;
      case 'special':
        return <Award className="w-5 h-5 text-red-500" />;
      default:
        return <CalendarDays className="w-5 h-5 text-gray-500" />;
    }
  };

  const getPriorityStyles = (priority) => {
    const base = "px-2 py-0.5 rounded-full text-xs font-medium";
    switch(priority) {
      case 'critical':
        return `${base} bg-red-50 text-red-700`;
      case 'high':
        return `${base} bg-orange-50 text-orange-500`;
      case 'medium':
        return `${base} bg-blue-50 text-blue-600`;
      case 'low':
        return `${base} bg-gray-100 text-gray-600`;
      default:
        return `${base} bg-gray-100 text-gray-600`;
    }
  };

  const getStatusStyles = (status) => {
    const base = "px-2 py-0.5 rounded-full text-xs font-medium";
    switch(status) {
      case 'confirmed':
        return `${base} bg-green-50 text-green-700`;
      case 'pending':
        return `${base} bg-orange-50 text-orange-500`;
      case 'completed':
        return `${base} bg-blue-50 text-blue-600`;
      case 'cancelled':
        return `${base} bg-red-50 text-red-700`;
      default:
        return `${base} bg-gray-100 text-gray-600`;
    }
  };

  const getTypeLabel = (type) => {
    switch(type) {
      case 'seva': return 'Seva';
      case 'puja': return 'Puja';
      case 'katha': return 'Katha';
      case 'hall': return 'Hall';
      case 'special': return 'Special';
      default: return 'Booking';
    }
  };

  // ============ HANDLE ACTIONS ============
  const handleAction = (action, booking = null) => {
    setIsLoading(true);
    
    switch(action) {
      case 'view':
        setSelectedBooking(booking);
        setShowDetailsModal(true);
        break;
      
      case 'accept':
        setBookings(prev => prev.map(b => 
          b.id === booking.id 
            ? { ...b, status: 'confirmed', pandit: pandits[0].name, read: true } 
            : b
        ));
        break;
      
      case 'reject':
        if (window.confirm('Are you sure you want to reject this booking?')) {
          setBookings(prev => prev.map(b => 
            b.id === booking.id ? { ...b, status: 'cancelled', read: true } : b
          ));
        }
        break;
      
      case 'assignPandit':
        const pandit = prompt('Enter pandit name:', booking?.pandit || '');
        if (pandit) {
          setBookings(prev => prev.map(b => 
            b.id === booking.id ? { ...b, pandit, read: true } : b
          ));
        }
        break;
      
      case 'markAsRead':
        setBookings(prev => prev.map(b => 
          b.id === booking.id ? { ...b, read: true } : b
        ));
        break;
      
      case 'downloadReceipt':
        console.log('Downloading receipt for:', booking?.id);
        break;
      
      case 'refresh':
        console.log('Refreshing bookings');
        break;
    }
    
    setTimeout(() => setIsLoading(false), 500);
  };

  // ============ FILTER BOOKINGS ============
  const filteredBookings = bookings.filter(booking => {
    // Filter by main category
    if (filter === 'all') return true;
    if (filter === 'seva') return booking.type === 'seva';
    if (filter === 'puja') return booking.type === 'puja';
    if (filter === 'katha') return booking.type === 'katha';
    if (filter === 'hall') return booking.type === 'hall';
    if (filter === 'special') return booking.type === 'special';
    if (filter === 'pending') return booking.status === 'pending';
    if (filter === 'confirmed') return booking.status === 'confirmed';
    if (filter === 'completed') return booking.status === 'completed';
    if (filter === 'cancelled') return booking.status === 'cancelled';
    return true;
  }).filter(booking => {
    // Filter by date
    if (dateFilter === 'today') return booking.date === '22 Feb 2026';
    if (dateFilter === 'tomorrow') return booking.date === '23 Feb 2026';
    if (dateFilter === 'week') return true;
    return true;
  }).filter(booking => {
    // Search
    if (!searchQuery) return true;
    return (
      booking.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.seva.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.phone.includes(searchQuery)
    );
  });

  // ============ DETAILS MODAL - EXACT match ============
  const DetailsModal = () => {
    if (!showDetailsModal || !selectedBooking) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          {/* Modal Header - EXACT match */}
          <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 px-4 py-3 border-b border-orange-100 sticky top-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-orange-50 rounded flex items-center justify-center">
                  <Eye className="w-5 h-5 text-orange-500" />
                </div>
                <h3 className="text-[15px] font-bold text-gray-800">
                  Booking Details • {selectedBooking.id}
                </h3>
              </div>
              <button 
                onClick={() => setShowDetailsModal(false)}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Modal Content */}
          <div className="p-6 space-y-4">
            {/* Status Badge */}
            <div className="flex items-center justify-between">
              <span className={getStatusStyles(selectedBooking.status)}>
                {selectedBooking.status.toUpperCase()}
              </span>
              <span className={getPriorityStyles(selectedBooking.priority)}>
                {selectedBooking.priority} priority
              </span>
            </div>

            {/* User Info */}
            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-semibold text-orange-700">
                  {selectedBooking.userAvatar}
                </span>
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-gray-800">{selectedBooking.user}</h4>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-1">
                  <span className="text-xs text-gray-600 flex items-center gap-1">
                    <Phone className="w-3 h-3" />
                    {selectedBooking.phone}
                  </span>
                  <span className="text-xs text-gray-600 flex items-center gap-1">
                    <Mail className="w-3 h-3" />
                    {selectedBooking.email}
                  </span>
                </div>
                <p className="text-xs text-gray-600 flex items-center gap-1 mt-1">
                  <MapPin className="w-3 h-3" />
                  {selectedBooking.address}
                </p>
              </div>
            </div>

            {/* Booking Details Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-2 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500">Seva/Puja</p>
                <p className="text-sm font-medium text-gray-800 mt-1">{selectedBooking.seva}</p>
              </div>
              <div className="p-2 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500">Date & Time</p>
                <p className="text-sm font-medium text-gray-800 mt-1">{selectedBooking.date}</p>
                <p className="text-xs text-gray-600">{selectedBooking.time}</p>
              </div>
              <div className="p-2 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500">Amount</p>
                <p className="text-sm font-semibold text-green-600 mt-1">₹{selectedBooking.amount}</p>
              </div>
              <div className="p-2 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500">Slots/Devotees</p>
                <p className="text-sm font-medium text-gray-800 mt-1">{selectedBooking.slots}</p>
              </div>
              <div className="p-2 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500">Receipt No.</p>
                <p className="text-sm font-medium text-gray-800 mt-1">{selectedBooking.receiptNo}</p>
              </div>
              <div className="p-2 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500">Pandit</p>
                <p className="text-sm font-medium text-gray-800 mt-1">
                  {selectedBooking.pandit || 'Not Assigned'}
                </p>
              </div>
            </div>

            {/* Notes */}
            {selectedBooking.notes && (
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-xs font-medium text-blue-700 mb-1">Notes</p>
                <p className="text-sm text-gray-700">{selectedBooking.notes}</p>
              </div>
            )}

            {/* Action Buttons - EXACT match */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200">
              {selectedBooking.status === 'pending' && (
                <>
                  <button
                    onClick={() => {
                      handleAction('accept', selectedBooking);
                      setShowDetailsModal(false);
                    }}
                    className="px-3 py-1.5 text-sm bg-green-50 text-green-700 rounded border border-green-300 hover:bg-green-100 flex items-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    Accept Booking
                  </button>
                  <button
                    onClick={() => {
                      handleAction('reject', selectedBooking);
                      setShowDetailsModal(false);
                    }}
                    className="px-3 py-1.5 text-sm bg-red-50 text-red-700 rounded border border-red-300 hover:bg-red-100 flex items-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Reject Booking
                  </button>
                </>
              )}
              
              <button
                onClick={() => {
                  handleAction('assignPandit', selectedBooking);
                  setShowDetailsModal(false);
                }}
                className="px-3 py-1.5 text-sm bg-orange-50 text-orange-500 rounded border border-orange-300 hover:bg-orange-100 flex items-center gap-2"
              >
                <UserCircle className="w-4 h-4" />
                Assign Pandit
              </button>
              
              <button
                onClick={() => {
                  handleAction('downloadReceipt', selectedBooking);
                }}
                className="px-3 py-1.5 text-sm bg-gray-100 text-gray-800 rounded border border-gray-300 hover:bg-gray-200 flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download Receipt
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Loading Overlay - EXACT match */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm text-gray-700">Processing...</p>
          </div>
        </div>
      )}

      {/* Header - EXACT UI as specified */}
      <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 px-3 py-1.5 border border-orange-100">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <div className="text-left sm:text-left flex-1 md:flex">
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold uppercase leading-tight text-orange-900">
              Bookings Management
            </h1>
            <p className="text-sm text-gray-600 mt-1 md:mt-2.5 lg:mt-2.5">
              Manage all seva, puja & hall bookings
            </p>
          </div>
          
          {/* EMPTY - NO BUTTON, NO NOTIFICATION BELL */}
          <div className="flex items-center gap-3"></div>
        </div>
      </div>

      {/* Main Content - EXACT spacing match */}
      <div className="space-y-4 p-6">
        {/* Welcome Section - EXACT match */}
        <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg px-3 py-2 border border-orange-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <p className="text-[17px] text-gray-600">
                {stats.todayBookings} bookings today • ₹{stats.todayRevenue.toLocaleString('en-IN')} collected
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm text-gray-600">Pending Approval</p>
                <p className="text-[15px] font-semibold text-orange-500">
                  {stats.pending} bookings
                </p>
              </div>
              <div className="w-8 h-8 bg-orange-50 rounded flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-orange-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards - EXACT match */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {/* Total Bookings */}
          <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg border border-gray-200 px-3 py-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Bookings</p>
                <p className="text-xl font-semibold text-gray-800 mt-1">{stats.total}</p>
                <div className="flex items-center gap-1 mt-2">
                  <CalendarDays className="w-3 h-3 text-orange-600" />
                  <span className="text-sm text-orange-600">+{stats.todayBookings} today</span>
                </div>
              </div>
              <div className="p-2 bg-orange-50 rounded">
                <CalendarDays className="w-5 h-5 text-orange-600" />
              </div>
            </div>
          </div>

          {/* Pending */}
          <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg border border-gray-200 px-3 py-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-xl font-semibold text-gray-800 mt-1">{stats.pending}</p>
                <p className="text-xs text-orange-500 mt-2">Requires action</p>
              </div>
              <div className="p-2 bg-orange-50 rounded">
                <AlertCircle className="w-5 h-5 text-orange-500" />
              </div>
            </div>
          </div>

          {/* Confirmed */}
          <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg border border-gray-200 px-3 py-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Confirmed</p>
                <p className="text-xl font-semibold text-gray-800 mt-1">{stats.confirmed}</p>
                <div className="flex items-center gap-1 mt-2">
                  <CheckCircle2 className="w-3 h-3 text-green-600" />
                  <span className="text-sm text-green-600">Active</span>
                </div>
              </div>
              <div className="p-2 bg-green-50 rounded">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </div>

          {/* Completed */}
          <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg border border-gray-200 px-3 py-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-xl font-semibold text-gray-800 mt-1">{stats.completed}</p>
                <p className="text-xs text-blue-600 mt-2">This week</p>
              </div>
              <div className="p-2 bg-blue-50 rounded">
                <CheckCircle2 className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* REFRESH BUTTON - MOVED HERE (BELOW STATS CARDS) */}
        <div className="flex justify-end">
          <button
            onClick={() => handleAction('refresh')}
            className="px-4 py-2 bg-white text-gray-700 text-sm font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors flex items-center gap-2 shadow-sm"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh Bookings
          </button>
        </div>

        {/* Search & Filter Bar - EXACT match */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            {/* Search */}
            <div className="w-full lg:w-64 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by name, ID, seva..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
              />
            </div>

            {/* Date Filters */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setDateFilter('today')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                  dateFilter === 'today' 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Today
              </button>
              <button
                onClick={() => setDateFilter('tomorrow')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                  dateFilter === 'tomorrow' 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Tomorrow
              </button>
              <button
                onClick={() => setDateFilter('week')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                  dateFilter === 'week' 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                This Week
              </button>
            </div>
          </div>

          {/* Category Filters - EXACT match */}
          <div className="flex flex-wrap gap-2 mt-4">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                filter === 'all' 
                  ? 'bg-orange-500 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All ({stats.total})
            </button>
            <button
              onClick={() => setFilter('seva')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2 ${
                filter === 'seva' 
                  ? 'bg-green-50 text-green-700 border border-green-300' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              Seva ({bookings.filter(b => b.type === 'seva').length})
            </button>
            <button
              onClick={() => setFilter('puja')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2 ${
                filter === 'puja' 
                  ? 'bg-orange-50 text-orange-600 border border-orange-300' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Bell className="w-4 h-4" />
              Puja ({bookings.filter(b => b.type === 'puja').length})
            </button>
            <button
              onClick={() => setFilter('katha')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2 ${
                filter === 'katha' 
                  ? 'bg-purple-50 text-purple-600 border border-purple-300' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <FileText className="w-4 h-4" />
              Katha ({bookings.filter(b => b.type === 'katha').length})
            </button>
            <button
              onClick={() => setFilter('hall')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2 ${
                filter === 'hall' 
                  ? 'bg-blue-50 text-blue-600 border border-blue-300' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Home className="w-4 h-4" />
              Hall ({bookings.filter(b => b.type === 'hall').length})
            </button>
            <button
              onClick={() => setFilter('special')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2 ${
                filter === 'special' 
                  ? 'bg-red-50 text-red-500 border border-red-300' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Award className="w-4 h-4" />
              Special ({bookings.filter(b => b.type === 'special').length})
            </button>
          </div>

          {/* Status Filters */}
          <div className="flex flex-wrap gap-2 mt-2">
            <button
              onClick={() => setFilter('pending')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                filter === 'pending' 
                  ? 'bg-orange-50 text-orange-500 border border-orange-300' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Pending ({stats.pending})
            </button>
            <button
              onClick={() => setFilter('confirmed')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                filter === 'confirmed' 
                  ? 'bg-green-50 text-green-700 border border-green-300' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Confirmed ({stats.confirmed})
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                filter === 'completed' 
                  ? 'bg-blue-50 text-blue-600 border border-blue-300' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Completed ({stats.completed})
            </button>
            <button
              onClick={() => setFilter('cancelled')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                filter === 'cancelled' 
                  ? 'bg-red-50 text-red-700 border border-red-300' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Cancelled ({stats.cancelled})
            </button>
          </div>
        </div>

        {/* Bookings Table - EXACT match to NotificationsPuja */}
        <div className="bg-white rounded-lg border border-gray-200 w-full overflow-hidden">
          {/* Table Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-[15px] font-bold text-gray-800">All Bookings</h3>
              <span className="text-sm text-gray-600">{filteredBookings.length} items</span>
            </div>
          </div>

          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="min-w-max whitespace-nowrap">
              <thead className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40">
                <tr>
                  <th className="px-4 py-3 text-left text-[13px] font-semibold text-gray-800 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-[13px] font-semibold text-gray-800 uppercase tracking-wider">Devotee</th>
                  <th className="px-6 py-3 text-left text-[13px] font-semibold text-gray-800 uppercase tracking-wider">Seva/Puja</th>
                  <th className="px-4 py-3 text-left text-[13px] font-semibold text-gray-800 uppercase tracking-wider">Date & Time</th>
                  <th className="px-4 py-3 text-left text-[13px] font-semibold text-gray-800 uppercase tracking-wider">Amount</th>
                  <th className="px-4 py-3 text-left text-[13px] font-semibold text-gray-800 uppercase tracking-wider">Pandit</th>
                  <th className="px-6 py-3 text-left text-[13px] font-semibold text-gray-800 uppercase tracking-wider">Status</th>
                  <th className="px-8 py-3 text-left text-[13px] font-semibold text-gray-800 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredBookings.map((booking) => (
                  <tr 
                    key={booking.id} 
                    className="hover:bg-gray-50"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-800">#{booking.id}</span>
                        {!booking.read && (
                          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full flex items-center justify-center">
                          <span className="text-xs font-semibold text-orange-700">
                            {booking.userAvatar}
                          </span>
                        </div>
                        <span className="text-sm font-medium text-gray-900">{booking.user}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className={`p-1.5 rounded ${
                          booking.type === 'seva' ? 'bg-green-50' :
                          booking.type === 'puja' ? 'bg-orange-50' :
                          booking.type === 'katha' ? 'bg-purple-50' :
                          booking.type === 'hall' ? 'bg-blue-50' :
                          'bg-red-50'
                        }`}>
                          {getTypeIcon(booking.type)}
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-900">{booking.seva}</span>
                          <span className="text-xs text-gray-500 block">{getTypeLabel(booking.type)}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-900">{booking.date}</span>
                        <span className="text-xs text-gray-500">{booking.time}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm font-semibold text-gray-900">₹{booking.amount}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-gray-700">{booking.pandit}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={getStatusStyles(booking.status)}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleAction('view', booking)}
                          className="p-1.5 text-gray-600 hover:bg-orange-50 hover:text-orange-600 rounded transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {booking.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleAction('accept', booking)}
                              className="p-1.5 text-green-600 hover:bg-green-50 rounded transition-colors"
                              title="Accept"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleAction('reject', booking)}
                              className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                              title="Reject"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => handleAction('downloadReceipt', booking)}
                          className="p-1.5 text-gray-600 hover:bg-gray-100 rounded transition-colors"
                          title="Download Receipt"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="block lg:hidden divide-y divide-gray-200">
            {filteredBookings.map((booking) => (
              <div 
                key={booking.id} 
                className={`p-4 transition-colors ${!booking.read ? 'bg-orange-50/30' : 'hover:bg-gray-50'}`}
              >
                {/* Header Row */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      booking.status === 'confirmed' ? 'bg-green-500' :
                      booking.status === 'pending' ? 'bg-orange-500' :
                      booking.status === 'completed' ? 'bg-blue-500' :
                      'bg-red-500'
                    }`}></div>
                    <span className="text-xs font-medium text-gray-500">#{booking.id}</span>
                    {!booking.read && (
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    )}
                  </div>
                  <span className={getStatusStyles(booking.status)}>
                    {booking.status}
                  </span>
                </div>

                {/* User & Seva Info */}
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-semibold text-orange-700">
                      {booking.userAvatar}
                    </span>
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="text-[14px] font-semibold text-gray-800">{booking.user}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <div className={`p-1 rounded ${
                        booking.type === 'seva' ? 'bg-green-50' :
                        booking.type === 'puja' ? 'bg-orange-50' :
                        booking.type === 'katha' ? 'bg-purple-50' :
                        booking.type === 'hall' ? 'bg-blue-50' :
                        'bg-red-50'
                      }`}>
                        {getTypeIcon(booking.type)}
                      </div>
                      <span className="text-sm text-gray-700">{booking.seva}</span>
                    </div>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500">Date & Time</p>
                    <p className="text-xs font-medium text-gray-800 mt-1">{booking.date}</p>
                    <p className="text-xs text-gray-600">{booking.time}</p>
                  </div>
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500">Amount</p>
                    <p className="text-sm font-semibold text-green-600 mt-1">₹{booking.amount}</p>
                  </div>
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500">Pandit</p>
                    <p className="text-xs font-medium text-gray-800 mt-1">{booking.pandit}</p>
                  </div>
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500">Slots</p>
                    <p className="text-xs font-medium text-gray-800 mt-1">{booking.slots}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100">
                  <button
                    onClick={() => handleAction('view', booking)}
                    className="px-2.5 py-1 text-xs bg-orange-50 text-orange-500 rounded border border-orange-300 hover:bg-orange-100 flex items-center gap-1"
                  >
                    <Eye className="w-3 h-3" />
                    View
                  </button>
                  
                  {booking.status === 'pending' && (
                    <>Booking Overview
                      <button
                        onClick={() => handleAction('accept', booking)}
                        className="px-2.5 py-1 text-xs bg-green-50 text-green-700 rounded border border-green-300 hover:bg-green-100 flex items-center gap-1"
                      >
                        <Check className="w-3 h-3" />
                        Accept
                      </button>
                      <button
                        onClick={() => handleAction('reject', booking)}
                        className="px-2.5 py-1 text-xs bg-red-50 text-red-700 rounded border border-red-300 hover:bg-red-100 flex items-center gap-1"
                      >
                        <X className="w-3 h-3" />
                        Reject
                      </button>
                    </>
                  )}
                  
                  <button
                    onClick={() => handleAction('downloadReceipt', booking)}
                    className="px-2.5 py-1 text-xs bg-gray-100 text-gray-800 rounded border border-gray-300 hover:bg-gray-200 flex items-center gap-1"
                  >
                    <Download className="w-3 h-3" />
                    Receipt
                  </button>

                  {!booking.read && (
                    <button
                      onClick={() => handleAction('markAsRead', booking)}
                      className="px-2.5 py-1 text-xs bg-gray-100 text-gray-800 rounded border border-gray-300 hover:bg-gray-200"
                    >
                      Mark Read
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Empty State - EXACT match */}
          {filteredBookings.length === 0 && (
            <div className="p-8 text-center">
              <div className="p-4 rounded-full inline-flex items-center justify-center mb-4 bg-gray-100">
                <CalendarDays className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium mb-2 text-gray-800">
                No bookings found
              </h3>
              <p className="text-sm text-gray-600">
                {searchQuery ? 'Try adjusting your search or filters' : 'No bookings match the selected criteria'}
              </p>
            </div>
          )}

          {/* Footer */}
          {filteredBookings.length > 0 && (
            <div className="p-3 bg-gray-50 border-t border-gray-200">
              <button className="text-sm font-medium text-orange-500 hover:text-orange-600 flex items-center justify-center gap-1 w-full">
                View All Bookings
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Right Column - Quick Stats & Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Right Column - EXACT match to NotificationsPuja style */}
          <div className="lg:col-span-1 space-y-4">
            {/* Booking Stats */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[15px] font-bold text-gray-800">Booking Overview</h3>
                <Filter className="w-4 h-4 text-gray-400" />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-green-50 rounded">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-sm text-gray-700">Confirmed</span>
                  </div>
                  <span className="text-sm font-medium text-gray-800">{stats.confirmed}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-orange-50 rounded">
                      <AlertCircle className="w-4 h-4 text-orange-500" />
                    </div>
                    <span className="text-sm text-gray-700">Pending</span>
                  </div>
                  <span className="text-sm font-medium text-gray-800">{stats.pending}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-blue-50 rounded">
                      <CheckCircle2 className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-sm text-gray-700">Completed</span>
                  </div>
                  <span className="text-sm font-medium text-gray-800">{stats.completed}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-red-50 rounded">
                      <XCircle className="w-4 h-4 text-red-700" />
                    </div>
                    <span className="text-sm text-gray-700">Cancelled</span>
                  </div>
                  <span className="text-sm font-medium text-gray-800">{stats.cancelled}</span>
                </div>

                <div className="pt-3 mt-3 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Today's Revenue</span>
                    <span className="text-sm font-semibold text-green-600">₹{stats.todayRevenue.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Available Pandits */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="text-[15px] font-bold text-gray-800 mb-4">Available Pandits</h3>
              
              <div className="space-y-3">
                {pandits.filter(p => p.available).map(pandit => (
                  <div key={pandit.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-green-50 rounded">
                        <UserCircle className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="text-sm text-gray-700">{pandit.name}</span>
                    </div>
                    <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full">
                      Available
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Tip Card - EXACT match */}
            <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg p-3 border border-orange-200">
              <div className="flex items-start gap-2">
                <div className="p-1.5 bg-orange-50 rounded">
                  <Bell className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-800 mb-1">Quick Tips</h4>
                  <p className="text-xs text-gray-700">
                    • Accept pending bookings within 2 hours
                  </p>
                  <p className="text-xs text-gray-700 mt-1">
                    • Assign pandits for puja and katha bookings
                  </p>
                  <p className="text-xs text-gray-700 mt-1">
                    • Download receipts for completed bookings
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-2">
              <button className="w-full px-3 py-2 bg-orange-50 text-orange-500 text-sm font-medium rounded border border-orange-300 hover:bg-orange-100 transition-colors flex items-center justify-center gap-2">
                <PlusCircle className="w-4 h-4" />
                Create New Booking
              </button>
              
              <button className="w-full px-3 py-2 bg-white text-gray-800 text-sm font-medium rounded border border-gray-300 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                <Download className="w-4 h-4" />
                Export Bookings
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section - EXACT match */}
        <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg border border-gray-200 p-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-center sm:text-left">
              <p className="text-sm text-gray-600">Need help with bookings?</p>
              <p className="text-[14px] text-gray-800">Contact support: +91 98765 43210</p>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 text-sm bg-gray-100 text-gray-800 rounded border border-gray-300 hover:bg-gray-200">
                View Guide
              </button>
              <button className="px-3 py-1.5 text-sm bg-gradient-to-r from-orange-300 to-orange-300 text-gray-800 hover:text-white rounded hover:from-orange-500 hover:to-orange-600">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <DetailsModal />
    </div>
  );
};

export default BookingsTemple;