import React, { useState } from 'react';
import {
  // Core Icons
  Users,
  Ticket,
  IndianRupee,
  CalendarDays,
  Clock,
  MapPin,
  Bell,
  Filter,
  Search,
  ChevronRight,
  Download,
  Eye,
  CheckCircle2,
  AlertCircle,
  XCircle,
  RefreshCw,
  UserCircle,
  Phone,
  Mail,
  FileText,
  CreditCard,
  Wallet,
  MoreVertical,
  X,
  Check,
  Ban,
  RotateCcw
} from 'lucide-react';

const  Bookings_Organizer = () => {
  const [filter, setFilter] = useState('all');
  const [eventFilter, setEventFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [dateRange, setDateRange] = useState('all');

  // ============ BOOKINGS DATA ============
  const [bookings, setBookings] = useState([
    {
      id: 'BKG-7890',
      bookingId: 'BKG-7890',
      devotee: 'Rajesh Kumar',
      avatar: 'RK',
      eventName: 'Mahashivratri Celebration',
      eventId: 'EVT-001',
      eventDate: '26 Feb 2026',
      bookingDate: '22 Feb 2026',
      bookingTime: '10:23 AM',
      tickets: 4,
      ticketType: 'VIP',
      amount: 4000,
      paymentMethod: 'UPI',
      paymentId: 'UPI-123456789',
      status: 'confirmed',
      paymentStatus: 'paid',
      phone: '+91 98765 43210',
      email: 'rajesh.k@email.com',
      address: '12, Juhu Scheme, Mumbai',
      notes: 'Prefers front row seating',
      read: false,
      priority: 'medium'
    },
    {
      id: 'BKG-7891',
      bookingId: 'BKG-7891',
      devotee: 'Priya Sharma',
      avatar: 'PS',
      eventName: 'Ram Navami',
      eventId: 'EVT-002',
      eventDate: '06 Apr 2026',
      bookingDate: '22 Feb 2026',
      bookingTime: '09:45 AM',
      tickets: 2,
      ticketType: 'General',
      amount: 800,
      paymentMethod: 'Card',
      paymentId: 'CARD-987654321',
      status: 'confirmed',
      paymentStatus: 'paid',
      phone: '+91 98765 43211',
      email: 'priya.s@email.com',
      address: '34, Andheri East, Mumbai',
      notes: '',
      read: true,
      priority: 'low'
    },
    {
      id: 'BKG-7892',
      bookingId: 'BKG-7892',
      devotee: 'Amit Patel',
      avatar: 'AP',
      eventName: 'Hanuman Jayanti',
      eventId: 'EVT-003',
      eventDate: '12 Apr 2026',
      bookingDate: '21 Feb 2026',
      bookingTime: '04:30 PM',
      tickets: 6,
      ticketType: 'VIP',
      amount: 4200,
      paymentMethod: 'NetBanking',
      paymentId: 'NEFT-567890123',
      status: 'confirmed',
      paymentStatus: 'paid',
      phone: '+91 98765 43212',
      email: 'amit.p@email.com',
      address: '56, Goregaon West, Mumbai',
      notes: 'Family of 6 attending',
      read: false,
      priority: 'medium'
    },
    {
      id: 'BKG-7893',
      bookingId: 'BKG-7893',
      devotee: 'Sneha Reddy',
      avatar: 'SR',
      eventName: 'Mahashivratri Celebration',
      eventId: 'EVT-001',
      eventDate: '26 Feb 2026',
      bookingDate: '21 Feb 2026',
      bookingTime: '02:15 PM',
      tickets: 3,
      ticketType: 'General',
      amount: 1500,
      paymentMethod: 'UPI',
      paymentId: 'UPI-789012345',
      status: 'pending',
      paymentStatus: 'pending',
      phone: '+91 98765 43213',
      email: 'sneha.r@email.com',
      address: '78, Borivali West, Mumbai',
      notes: 'Waiting for payment confirmation',
      read: true,
      priority: 'high'
    },
    {
      id: 'BKG-7894',
      bookingId: 'BKG-7894',
      devotee: 'Vikram Singh',
      avatar: 'VS',
      eventName: 'Annakut Utsav',
      eventId: 'EVT-004',
      eventDate: '15 Nov 2026',
      bookingDate: '20 Feb 2026',
      bookingTime: '11:20 AM',
      tickets: 5,
      ticketType: 'General',
      amount: 1500,
      paymentMethod: 'Card',
      paymentId: 'CARD-345678901',
      status: 'confirmed',
      paymentStatus: 'paid',
      phone: '+91 98765 43214',
      email: 'vikram.s@email.com',
      address: '90, Chembur, Mumbai',
      notes: '',
      read: true,
      priority: 'low'
    },
    {
      id: 'BKG-7895',
      bookingId: 'BKG-7895',
      devotee: 'Anita Desai',
      avatar: 'AD',
      eventName: 'Gita Jayanti',
      eventId: 'EVT-005',
      eventDate: '17 Dec 2026',
      bookingDate: '20 Feb 2026',
      bookingTime: '09:30 AM',
      tickets: 2,
      ticketType: 'Student',
      amount: 200,
      paymentMethod: 'UPI',
      paymentId: 'UPI-901234567',
      status: 'cancelled',
      paymentStatus: 'refunded',
      phone: '+91 98765 43215',
      email: 'anita.d@email.com',
      address: '23, Dadar, Mumbai',
      notes: 'Cancelled due to personal reasons',
      read: false,
      priority: 'medium'
    },
    {
      id: 'BKG-7896',
      bookingId: 'BKG-7896',
      devotee: 'Ramesh Gupta',
      avatar: 'RG',
      eventName: 'Weekly Bhajan Sandhya',
      eventId: 'EVT-006',
      eventDate: '27 Feb 2026',
      bookingDate: '22 Feb 2026',
      bookingTime: '08:15 AM',
      tickets: 1,
      ticketType: 'Free',
      amount: 0,
      paymentMethod: 'Free',
      paymentId: 'FREE-001',
      status: 'confirmed',
      paymentStatus: 'paid',
      phone: '+91 98765 43216',
      email: 'ramesh.g@email.com',
      address: '45, Bandra West, Mumbai',
      notes: '',
      read: false,
      priority: 'low'
    }
  ]);

  // ============ EVENTS LIST FOR FILTER ============
  const events = [
    { id: 'all', name: 'All Events' },
    { id: 'EVT-001', name: 'Mahashivratri Celebration' },
    { id: 'EVT-002', name: 'Ram Navami' },
    { id: 'EVT-003', name: 'Hanuman Jayanti' },
    { id: 'EVT-004', name: 'Annakut Utsav' },
    { id: 'EVT-005', name: 'Gita Jayanti' },
    { id: 'EVT-006', name: 'Weekly Bhajan Sandhya' }
  ];

  // ============ STATS ============
  const stats = {
    total: bookings.length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    pending: bookings.filter(b => b.status === 'pending').length,
    cancelled: bookings.filter(b => b.status === 'cancelled').length,
    totalTickets: bookings.reduce((acc, b) => acc + b.tickets, 0),
    totalRevenue: bookings
      .filter(b => b.paymentStatus === 'paid')
      .reduce((acc, b) => acc + b.amount, 0),
    todayBookings: bookings.filter(b => b.bookingDate === '22 Feb 2026').length
  };

  // ============ UNREAD COUNT ============
  const unreadCount = bookings.filter(b => !b.read).length;

  // ============ EXACT MATCH to NotificationsPuja ============
  const getStatusStyles = (status) => {
    const base = "px-2 py-0.5 rounded-full text-xs font-medium";
    switch(status) {
      case 'confirmed':
      case 'paid':
        return `${base} bg-green-50 text-green-700`;
      case 'pending':
        return `${base} bg-orange-50 text-orange-500`;
      case 'cancelled':
      case 'refunded':
        return `${base} bg-red-50 text-red-700`;
      default:
        return `${base} bg-gray-100 text-gray-600`;
    }
  };

  const getPaymentStatusStyles = (status) => {
    const base = "px-2 py-0.5 rounded-full text-xs font-medium";
    switch(status) {
      case 'paid':
        return `${base} bg-green-50 text-green-700`;
      case 'pending':
        return `${base} bg-orange-50 text-orange-500`;
      case 'refunded':
        return `${base} bg-purple-50 text-purple-600`;
      default:
        return `${base} bg-gray-100 text-gray-600`;
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

  // ============ HANDLE ACTIONS ============
  const handleAction = (action, booking = null) => {
    setIsLoading(true);
    
    switch(action) {
      case 'view':
        setSelectedBooking(booking);
        setShowDetailsModal(true);
        break;
      
      case 'confirm':
        setBookings(prev => prev.map(b => 
          b.id === booking.id 
            ? { ...b, status: 'confirmed', paymentStatus: 'paid', read: true } 
            : b
        ));
        break;
      
      case 'cancel':
        setSelectedBooking(booking);
        setShowCancelModal(true);
        break;
      
      case 'refund':
        setSelectedBooking(booking);
        setShowRefundModal(true);
        break;
      
      case 'processRefund':
        setBookings(prev => prev.map(b => 
          b.id === selectedBooking.id 
            ? { ...b, status: 'cancelled', paymentStatus: 'refunded', read: true } 
            : b
        ));
        setShowRefundModal(false);
        break;
      
      case 'processCancel':
        setBookings(prev => prev.map(b => 
          b.id === selectedBooking.id 
            ? { ...b, status: 'cancelled', paymentStatus: 'refunded', read: true } 
            : b
        ));
        setShowCancelModal(false);
        break;
      
      case 'downloadCSV':
        console.log('Downloading CSV...');
        break;
      
      case 'markAsRead':
        setBookings(prev => prev.map(b => 
          b.id === booking.id ? { ...b, read: true } : b
        ));
        break;
      
      case 'refresh':
        console.log('Refreshing bookings...');
        break;
    }
    
    setTimeout(() => setIsLoading(false), 500);
  };

  // ============ FILTER BOOKINGS ============
  const filteredBookings = bookings.filter(booking => {
    // Status filter
    if (filter === 'all') return true;
    if (filter === 'confirmed') return booking.status === 'confirmed';
    if (filter === 'pending') return booking.status === 'pending';
    if (filter === 'cancelled') return booking.status === 'cancelled';
    if (filter === 'paid') return booking.paymentStatus === 'paid';
    if (filter === 'refunded') return booking.paymentStatus === 'refunded';
    return true;
  }).filter(booking => {
    // Event filter
    if (eventFilter === 'all') return true;
    return booking.eventId === eventFilter;
  }).filter(booking => {
    // Search
    if (!searchQuery) return true;
    return (
      booking.devotee.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.bookingId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.eventName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.phone.includes(searchQuery) ||
      booking.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // ============ BOOKING DETAILS MODAL - EXACT match ============
  const BookingDetailsModal = () => {
    if (!showDetailsModal || !selectedBooking) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          {/* Modal Header - EXACT match */}
          <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 px-4 py-3 border-b border-orange-100 sticky top-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-orange-50 rounded flex items-center justify-center">
                  <FileText className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-gray-800">
                    Booking Details
                  </h3>
                  <p className="text-xs text-gray-600 mt-0.5">{selectedBooking.bookingId}</p>
                </div>
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
            {/* Status & Priority */}
            <div className="flex items-center justify-between">
              <span className={getStatusStyles(selectedBooking.status)}>
                {selectedBooking.status}
              </span>
              <span className={getPriorityStyles(selectedBooking.priority)}>
                {selectedBooking.priority} priority
              </span>
            </div>

            {/* Devotee Details */}
            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-semibold text-orange-700">
                  {selectedBooking.avatar}
                </span>
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-gray-800">{selectedBooking.devotee}</h4>
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

            {/* Event Details */}
            <div className="p-3 bg-gray-50 rounded-lg">
              <h4 className="text-xs font-medium text-gray-700 mb-2">Event Details</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-gray-500">Event Name</p>
                  <p className="text-sm font-medium text-gray-800 mt-1">{selectedBooking.eventName}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Event Date</p>
                  <p className="text-sm font-medium text-gray-800 mt-1">{selectedBooking.eventDate}</p>
                </div>
              </div>
            </div>

            {/* Booking & Payment Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500 mb-2">Booking Details</p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-600">Booking Date</span>
                    <span className="text-xs font-medium text-gray-800">{selectedBooking.bookingDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-600">Booking Time</span>
                    <span className="text-xs font-medium text-gray-800">{selectedBooking.bookingTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-600">Tickets</span>
                    <span className="text-xs font-medium text-gray-800">{selectedBooking.tickets} ({selectedBooking.ticketType})</span>
                  </div>
                </div>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500 mb-2">Payment Details</p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-600">Amount</span>
                    <span className="text-xs font-semibold text-green-600">₹{selectedBooking.amount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-600">Method</span>
                    <span className="text-xs font-medium text-gray-800">{selectedBooking.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-600">Payment ID</span>
                    <span className="text-xs font-medium text-gray-800">{selectedBooking.paymentId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-600">Status</span>
                    <span className={getPaymentStatusStyles(selectedBooking.paymentStatus)}>
                      {selectedBooking.paymentStatus}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Notes */}
            {selectedBooking.notes && (
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-xs font-medium text-blue-700 mb-1">Notes</p>
                <p className="text-sm text-gray-700">{selectedBooking.notes}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200">
              {selectedBooking.status === 'pending' && (
                <>
                  <button
                    onClick={() => {
                      handleAction('confirm', selectedBooking);
                      setShowDetailsModal(false);
                    }}
                    className="px-3 py-1.5 text-sm bg-green-50 text-green-700 rounded border border-green-300 hover:bg-green-100 flex items-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    Confirm Booking
                  </button>
                  <button
                    onClick={() => {
                      handleAction('cancel', selectedBooking);
                      setShowDetailsModal(false);
                    }}
                    className="px-3 py-1.5 text-sm bg-orange-50 text-orange-500 rounded border border-orange-300 hover:bg-orange-100 flex items-center gap-2"
                  >
                    <Ban className="w-4 h-4" />
                    Cancel Booking
                  </button>
                </>
              )}
              
              {selectedBooking.status === 'confirmed' && (
                <button
                  onClick={() => {
                    handleAction('refund', selectedBooking);
                    setShowDetailsModal(false);
                  }}
                  className="px-3 py-1.5 text-sm bg-purple-50 text-purple-600 rounded border border-purple-300 hover:bg-purple-100 flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Process Refund
                </button>
              )}
              
              <button
                onClick={() => {
                  handleAction('downloadCSV', selectedBooking);
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

  // ============ CANCEL CONFIRM MODAL ============
  const CancelModal = () => {
    if (!showCancelModal || !selectedBooking) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg w-full max-w-md">
          <div className="bg-gradient-to-r from-orange-50 to-orange-100/50 px-4 py-3 border-b border-orange-200">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-orange-50 rounded flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-orange-500" />
              </div>
              <h3 className="text-[15px] font-bold text-gray-800">Cancel Booking</h3>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <p className="text-sm text-gray-600">
              Are you sure you want to cancel this booking? A refund will be processed to the devotee.
            </p>
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <button
                onClick={() => setShowCancelModal(false)}
                className="px-4 py-2 text-sm bg-gray-100 text-gray-800 rounded border border-gray-300 hover:bg-gray-200"
              >
                No, Keep It
              </button>
              <button
                onClick={() => handleAction('processCancel')}
                className="px-4 py-2 text-sm bg-orange-500 text-white rounded hover:bg-orange-600 flex items-center gap-2"
              >
                <Ban className="w-4 h-4" />
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ============ REFUND MODAL ============
  const RefundModal = () => {
    if (!showRefundModal || !selectedBooking) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg w-full max-w-md">
          <div className="bg-gradient-to-r from-purple-50 to-purple-100/50 px-4 py-3 border-b border-purple-200">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-50 rounded flex items-center justify-center">
                <RotateCcw className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="text-[15px] font-bold text-gray-800">Process Refund</h3>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600">Refund Amount</span>
              <span className="text-lg font-bold text-green-600">₹{selectedBooking.amount}</span>
            </div>
            <p className="text-sm text-gray-600">
              This amount will be refunded to the devotee's original payment method.
            </p>
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <button
                onClick={() => setShowRefundModal(false)}
                className="px-4 py-2 text-sm bg-gray-100 text-gray-800 rounded border border-gray-300 hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={() => handleAction('processRefund')}
                className="px-4 py-2 text-sm bg-purple-600 text-white rounded hover:bg-purple-700 flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Process Refund
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

      {/* Header - EXACT match - ONLY MAIN HEADING */}
      <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 px-3 py-1.5 border border-orange-100">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <div className="text-left sm:text-left flex-1">
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold uppercase leading-tight text-orange-900">
              Bookings & Registrations
            </h1>
          </div>
          
          {/* Only Notification Bell - No subtitle */}
          <div className="flex items-center gap-3">
            {unreadCount > 0 && (
              <div className="relative">
                <div className="w-8 h-8 bg-orange-50 rounded flex items-center justify-center">
                  <Bell className="w-5 h-5 text-orange-500" />
                </div>
                <div className="absolute -top-1 -right-1 w-[17px] h-[17px] bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {unreadCount}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content - EXACT spacing */}
      <div className="space-y-4 p-6">
        {/* Welcome Section - EXACT match */}
        <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg px-3 py-2 border border-orange-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <p className="text-[18px] text-gray-600">
                {stats.total} total bookings • {stats.todayBookings} new today
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-[15px] font-semibold text-orange-500">
                  ₹{stats.totalRevenue.toLocaleString('en-IN')}
                </p>
              </div>
              <div className="w-8 h-8 bg-orange-50 rounded flex items-center justify-center">
                <IndianRupee className="w-5 h-5 text-orange-500" />
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
                  <Ticket className="w-3 h-3 text-orange-600" />
                  <span className="text-sm text-orange-600">{stats.totalTickets} tickets</span>
                </div>
              </div>
              <div className="p-2 bg-orange-50 rounded">
                <Ticket className="w-5 h-5 text-orange-600" />
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
                  <span className="text-sm text-green-600">Paid</span>
                </div>
              </div>
              <div className="p-2 bg-green-50 rounded">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </div>

          {/* Pending */}
          <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg border border-gray-200 px-3 py-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-xl font-semibold text-gray-800 mt-1">{stats.pending}</p>
                <p className="text-xs text-orange-500 mt-2">Awaiting payment</p>
              </div>
              <div className="p-2 bg-orange-50 rounded">
                <AlertCircle className="w-5 h-5 text-orange-500" />
              </div>
            </div>
          </div>

          {/* Cancelled */}
          <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg border border-gray-200 px-3 py-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Cancelled</p>
                <p className="text-xl font-semibold text-gray-800 mt-1">{stats.cancelled}</p>
                <p className="text-xs text-red-600 mt-2">Refunded</p>
              </div>
              <div className="p-2 bg-red-50 rounded">
                <XCircle className="w-5 h-5 text-red-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Filter Bar - EXACT match */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            {/* Search */}
            <div className="w-full lg:w-64 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by name, ID, event..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
              />
            </div>

            {/* Event Filter */}
            <div className="w-full lg:w-64">
              <select
                value={eventFilter}
                onChange={(e) => setEventFilter(e.target.value)}
                className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 bg-white"
              >
                {events.map(event => (
                  <option key={event.id} value={event.id}>{event.name}</option>
                ))}
              </select>
            </div>

            {/* Status Filters */}
            <div className="flex flex-wrap gap-2">
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
                onClick={() => setFilter('paid')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                  filter === 'paid' 
                    ? 'bg-green-50 text-green-700 border border-green-300' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Paid ({stats.confirmed})
              </button>
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
        </div>

        {/* Bookings Table - EXACT match */}
        <div className="bg-white rounded-lg border border-gray-200 w-full overflow-hidden">
          {/* Table Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-[15px] font-bold text-gray-800">All Bookings</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleAction('downloadCSV')}
                  className="px-3 py-1.5 text-sm bg-orange-50 text-orange-500 rounded border border-orange-300 hover:bg-orange-100 flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Export CSV
                </button>
                <span className="text-sm text-gray-600">{filteredBookings.length} items</span>
              </div>
            </div>
          </div>

          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="min-w-max whitespace-nowrap">
              <thead className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-800 uppercase tracking-wider">Booking ID</th>
                  <th className="px-5 py-3 text-left text-sm font-medium text-gray-800 uppercase tracking-wider">Devotee</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-800 uppercase tracking-wider">Event</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-800 uppercase tracking-wider">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-800 uppercase tracking-wider">Tickets</th>
                  <th className="px-3 py-3 text-left text-sm font-medium text-gray-800 uppercase tracking-wider">Amount</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-800 uppercase tracking-wider">Payment</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-800 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-800 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredBookings.map((booking) => (
                  <tr 
                    key={booking.id} 
                    className='hover:bg-gray-50'
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-800">{booking.bookingId}</span>
                        {!booking.read && (
                          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full flex items-center justify-center">
                          <span className="text-xs font-semibold text-orange-700">
                            {booking.avatar}
                          </span>
                        </div>
                        <span className="text-sm font-medium text-gray-800">{booking.devotee}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-900">{booking.eventName}</span>
                        <span className="text-xs text-gray-500">{booking.eventDate}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-900">{booking.bookingDate}</span>
                        <span className="text-xs text-gray-500">{booking.bookingTime}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-gray-900">{booking.tickets}</span>
                      <span className="text-xs text-gray-500 ml-1">({booking.ticketType})</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm font-semibold text-green-600">₹{booking.amount}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={getPaymentStatusStyles(booking.paymentStatus)}>
                        {booking.paymentStatus}
                      </span>
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
                              onClick={() => handleAction('confirm', booking)}
                              className="p-1.5 text-green-600 hover:bg-green-50 rounded transition-colors"
                              title="Confirm Booking"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleAction('cancel', booking)}
                              className="p-1.5 text-orange-500 hover:bg-orange-50 rounded transition-colors"
                              title="Cancel Booking"
                            >
                              <Ban className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        
                        {booking.status === 'confirmed' && (
                          <button
                            onClick={() => handleAction('refund', booking)}
                            className="p-1.5 text-purple-600 hover:bg-purple-50 rounded transition-colors"
                            title="Process Refund"
                          >
                            <RotateCcw className="w-4 h-4" />
                          </button>
                        )}
                        
                        <button
                          onClick={() => handleAction('downloadCSV', booking)}
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
                    <span className="text-xs font-medium text-gray-500">{booking.bookingId}</span>
                    {!booking.read && (
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    )}
                  </div>
                  <span className={getStatusStyles(booking.status)}>
                    {booking.status}
                  </span>
                </div>

                {/* Devotee & Event */}
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-semibold text-orange-700">{booking.avatar}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-gray-800">{booking.devotee}</h4>
                    <p className="text-xs text-gray-600 mt-0.5">{booking.eventName}</p>
                    <p className="text-xs text-gray-500 mt-1">{booking.eventDate}</p>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500">Tickets</p>
                    <p className="text-sm font-medium text-gray-800 mt-1">
                      {booking.tickets} ({booking.ticketType})
                    </p>
                  </div>
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500">Amount</p>
                    <p className="text-sm font-semibold text-green-600 mt-1">₹{booking.amount}</p>
                  </div>
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500">Payment</p>
                    <span className={getPaymentStatusStyles(booking.paymentStatus)}>
                      {booking.paymentStatus}
                    </span>
                  </div>
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500">Booking Date</p>
                    <p className="text-xs font-medium text-gray-800 mt-1">{booking.bookingDate}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-1 pt-2 border-t border-gray-100">
                  <button
                    onClick={() => handleAction('view', booking)}
                    className="px-2.5 py-1 text-xs bg-orange-50 text-orange-500 rounded border border-orange-300 hover:bg-orange-100 flex items-center gap-1"
                  >
                    <Eye className="w-3 h-3" />
                    View
                  </button>
                  
                  {booking.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleAction('confirm', booking)}
                        className="px-2.5 py-1 text-xs bg-green-50 text-green-700 rounded border border-green-300 hover:bg-green-100 flex items-center gap-1"
                      >
                        <Check className="w-3 h-3" />
                        Confirm
                      </button>
                      <button
                        onClick={() => handleAction('cancel', booking)}
                        className="px-2.5 py-1 text-xs bg-orange-50 text-orange-500 rounded border border-orange-300 hover:bg-orange-100 flex items-center gap-1"
                      >
                        <Ban className="w-3 h-3" />
                        Cancel
                      </button>
                    </>
                  )}
                  
                  <button
                    onClick={() => handleAction('downloadCSV', booking)}
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
                <Ticket className="w-12 h-12 text-gray-400" />
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

        {/* Bottom Section - EXACT match */}
        <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg border border-gray-200 p-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-center sm:text-left">
              <p className="text-sm text-gray-600">Need help with bookings?</p>
              <p className="text-[14px] text-gray-800">Contact support: +91 98765 43210</p>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 text-sm bg-gray-100 text-gray-800 rounded border border-gray-300 hover:bg-gray-200">
                Bulk Actions
              </button>
              <button className="px-3 py-1.5 text-sm bg-gradient-to-r from-orange-300 to-orange-300 text-gray-800 hover:text-white rounded hover:from-orange-500 hover:to-orange-600">
                Export Report
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showDetailsModal && <BookingDetailsModal />}
      {showCancelModal && <CancelModal />}
      {showRefundModal && <RefundModal />}
    </div>
  );
};

export default Bookings_Organizer;