import React, { useState } from 'react';
import VendorPageHeader from '../../../components/VendorPageHeader';

import { 
  // Core Icons
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
  Download,
  Eye,
  CheckCircle2,
  AlertCircle,
  CalendarDays,
  Star,
  MapPin,
  UserCircle
} from 'lucide-react';

const TempleDashboard = () => {
  // ============ STATE MANAGEMENT ============
  const [filter, setFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('today');

  // ============ DASHBOARD STATS ============
  const [dashboardStats, setDashboardStats] = useState({
    todayBookings: 24,
    todayDonations: 12500,
    upcomingEvents: 3,
    walletBalance: 284500,
    staffOnDuty: 8
  });

  // ============ RECENT BOOKINGS ============
  const [recentBookings] = useState([
    {
      id: 'BKG-7890',
      devotee: 'Rajesh Kumar',
      seva: 'Annadanam Seva',
      date: '22 Feb 2026',
      time: '10:23 AM',
      amount: 1100,
      status: 'confirmed',
      items: 2
    },
    {
      id: 'BKG-7891',
      devotee: 'Priya Sharma',
      seva: 'Rudrabhishek',
      date: '22 Feb 2026',
      time: '09:45 AM',
      amount: 501,
      status: 'pending',
      items: 1
    },
    {
      id: 'BKG-7892',
      devotee: 'Amit Patel',
      seva: 'Satyanarayan Katha',
      date: '22 Feb 2026',
      time: '08:30 AM',
      amount: 2500,
      status: 'completed',
      items: 5
    },
    {
      id: 'BKG-7893',
      devotee: 'Sneha Reddy',
      seva: 'Abhishek Puja',
      date: '21 Feb 2026',
      time: '04:20 PM',
      amount: 750,
      status: 'confirmed',
      items: 1
    },
    {
      id: 'BKG-7894',
      devotee: 'Vikram Singh',
      seva: 'Vrat Puja',
      date: '21 Feb 2026',
      time: '02:15 PM',
      amount: 1100,
      status: 'cancelled',
      items: 3
    }
  ]);

  // ============ RECENT DONATIONS ============
  const [recentDonations] = useState([
    {
      id: 'DON-001',
      devotee: 'Ramesh Gupta',
      amount: 5100,
      date: '22 Feb 2026',
      time: '11:30 AM',
      type: 'General Donation',
      paymentMode: 'UPI',
      status: 'success'
    },
    {
      id: 'DON-002',
      devotee: 'Anita Desai',
      amount: 2001,
      date: '22 Feb 2026',
      time: '10:50 AM',
      type: 'Temple Renovation',
      paymentMode: 'Card',
      status: 'success'
    },
    {
      id: 'DON-003',
      devotee: 'Suresh Nair',
      amount: 1100,
      date: '22 Feb 2026',
      time: '09:15 AM',
      type: 'Annadanam',
      paymentMode: 'NetBanking',
      status: 'pending'
    },
    {
      id: 'DON-004',
      devotee: 'Meera Krishnan',
      amount: 501,
      date: '21 Feb 2026',
      time: '06:45 PM',
      type: 'General Donation',
      paymentMode: 'UPI',
      status: 'success'
    },
    {
      id: 'DON-005',
      devotee: 'Arjun Reddy',
      amount: 2500,
      date: '21 Feb 2026',
      time: '03:20 PM',
      type: 'Festival Donation',
      paymentMode: 'Cash',
      status: 'success'
    }
  ]);

  // ============ UPCOMING EVENTS ============
  const [upcomingEvents] = useState([
    {
      id: 'EVT-001',
      name: 'Mahashivratri Celebration',
      date: '26 Feb 2026',
      devotees: 500,
      status: 'planning',
      time: '06:00 AM - 09:00 PM'
    },
    {
      id: 'EVT-002',
      name: 'Ram Navami',
      date: '06 Apr 2026',
      devotees: 350,
      status: 'planning',
      time: '05:00 AM - 10:00 PM'
    },
    {
      id: 'EVT-003',
      name: 'Hanuman Jayanti',
      date: '12 Apr 2026',
      devotees: 400,
      status: 'upcoming',
      time: '05:30 AM - 09:00 PM'
    }
  ]);

  // ============ RECENT ACTIVITY ============
  const [recentActivity] = useState([
    {
      id: 'ACT-001',
      type: 'booking',
      message: 'Rajesh Kumar booked Annadanam Seva',
      time: '2 minutes ago',
      amount: 1100
    },
    {
      id: 'ACT-002',
      type: 'donation',
      message: 'Priya Sharma donated ₹501',
      time: '15 minutes ago',
      amount: 501
    },
    {
      id: 'ACT-003',
      type: 'event',
      message: 'Mahashivratri event created',
      time: '1 hour ago',
      amount: null
    },
    {
      id: 'ACT-004',
      type: 'booking',
      message: 'Amit Patel booked Rudrabhishek',
      time: '2 hours ago',
      amount: 2500
    }
  ]);

  // ============ UNREAD COUNT ============
  const unreadCount = 3;

  // ============ UTILITY FUNCTIONS ============
  const getStatusStyles = (status) => {
    const base = "px-2 py-0.5 rounded-full text-xs font-medium";
    switch(status) {
      case 'confirmed':
      case 'success':
      case 'completed':
        return `${base} bg-green-50 text-green-700`;
      case 'pending':
        return `${base} bg-orange-50 text-orange-500`;
      case 'cancelled':
        return `${base} bg-red-50 text-red-700`;
      case 'planning':
        return `${base} bg-blue-50 text-blue-600`;
      case 'upcoming':
        return `${base} bg-purple-50 text-purple-600`;
      default:
        return `${base} bg-gray-100 text-gray-600`;
    }
  };

  const getIcon = (type) => {
    switch(type) {
      case 'booking':
        return <ShoppingBag className="w-5 h-5 text-green-600" />;
      case 'donation':
        return <IndianRupee className="w-5 h-5 text-blue-600" />;
      case 'event':
        return <Gift className="w-5 h-5 text-purple-600" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const getTypeLabel = (type) => {
    switch(type) {
      case 'booking': return 'Booking';
      case 'donation': return 'Donation';
      case 'event': return 'Event';
      default: return 'Activity';
    }
  };

  // ============ HANDLE ACTIONS ============
  const handleAction = (action, id = null) => {
    setIsLoading(true);
    
    switch(action) {
      case 'viewBooking':
        console.log('Viewing booking:', id);
        break;
      case 'viewDonation':
        console.log('Viewing donation:', id);
        break;
      case 'viewEvent':
        console.log('Viewing event:', id);
        break;
      case 'refresh':
        console.log('Refreshing dashboard');
        break;
      case 'export':
        console.log('Exporting data');
        break;
    }
    
    setTimeout(() => setIsLoading(false), 500);
  };

  // ============ STATS CARD COMPONENT ============
  const StatsCard = ({ title, value, subtitle, icon: Icon, color = 'orange', trend, trendValue }) => {
    const getIconBackground = () => {
      switch(color) {
        case 'green': return 'bg-green-50';
        case 'blue': return 'bg-blue-50';
        case 'purple': return 'bg-purple-50';
        case 'red': return 'bg-red-50';
        default: return 'bg-orange-50';
      }
    };

    const getIconColor = () => {
      switch(color) {
        case 'green': return 'text-green-600';
        case 'blue': return 'text-blue-600';
        case 'purple': return 'text-purple-600';
        case 'red': return 'text-red-500';
        default: return 'text-orange-600';
      }
    };

    return (
      <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg border border-gray-200 px-3 py-2">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">{title}</p>
            <p className="text-xl font-semibold text-gray-800 mt-1">
              {typeof value === 'number' && title.includes('₹') 
                ? `₹${value.toLocaleString('en-IN')}` 
                : value}
            </p>
            {trend && (
              <div className="flex items-center gap-1 mt-2">
                {trend === 'up' ? (
                  <TrendingUp className="w-3 h-3 text-green-600" />
                ) : (
                  <TrendingDown className="w-3 h-3 text-red-500" />
                )}
                <span className={`text-sm ${
                  trend === 'up' ? 'text-green-600' : 'text-red-500'
                }`}>
                  {trendValue}
                </span>
              </div>
            )}
            {subtitle && (
              <p className="text-sm text-gray-500 mt-2">{subtitle}</p>
            )}
          </div>
          <div className={`p-2 ${getIconBackground()} rounded`}>
            <Icon className={`w-5 h-5 ${getIconColor()}`} />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Loading Overlay - Exact match to NotificationsPuja */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm text-gray-700">Processing...</p>
          </div>
        </div>
      )}

      <VendorPageHeader 
        title="TEMPLE DASHBOARD" 
        subtitle="Manage all seva, puja & hall bookings" 
      />


      {/* Main Content - EXACT spacing match */}
      <div className="space-y-4 p-6">
        {/* Welcome Section - EXACT match */}
        <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg px-3 py-2 border border-orange-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <p className="text-[17px] text-gray-600">
                You have {dashboardStats.todayBookings} bookings today
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm text-gray-600">Today's Collection</p>
                <p className="text-[15px] font-semibold text-orange-500">
                  ₹{dashboardStats.todayDonations.toLocaleString('en-IN')}
                </p>
              </div>
              <div className="w-8 h-8 bg-orange-50 rounded flex items-center justify-center">
                <Clock className="w-5 h-5 text-orange-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards Grid - EXACT match to NotificationsPuja */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {/* Today Bookings */}
          <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg border border-gray-200 px-3 py-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Today Bookings</p>
                <p className="text-xl font-semibold text-gray-800 mt-1">
                  {dashboardStats.todayBookings}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <ShoppingBag className="w-3 h-3 text-green-700" />
                  <span className="text-sm text-green-700">+8 today</span>
                </div>
              </div>
              <div className="p-2 bg-green-50 rounded">
                <ShoppingBag className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </div>

          {/* Today Donations */}
          <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg border border-gray-200 px-3 py-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Today Donations</p>
                <p className="text-xl font-semibold text-gray-800 mt-1">
                  ₹{dashboardStats.todayDonations.toLocaleString('en-IN')}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="w-3 h-3 text-green-600" />
                  <span className="text-sm text-green-600">+₹2.5k</span>
                </div>
              </div>
              <div className="p-2 bg-blue-50 rounded">
                <IndianRupee className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg border border-gray-200 px-3 py-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Upcoming Events</p>
                <p className="text-xl font-semibold text-gray-800 mt-1">
                  {dashboardStats.upcomingEvents}
                </p>
                <p className="text-xs text-orange-500 mt-2">Next: Mahashivratri</p>
              </div>
              <div className="p-2 bg-purple-50 rounded">
                <Gift className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </div>

          {/* Wallet Balance */}
          <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg border border-gray-200 px-3 py-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Wallet Balance</p>
                <p className="text-xl font-semibold text-gray-800 mt-1">
                  ₹{dashboardStats.walletBalance.toLocaleString('en-IN')}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <Wallet className="w-3 h-3 text-blue-600" />
                  <span className="text-sm text-blue-600">₹45k pending</span>
                </div>
              </div>
              <div className="p-2 bg-yellow-50 rounded">
                <Wallet className="w-5 h-5 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filter Bar - EXACT match to NotificationsPuja */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                  filter === 'all' 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All Activity
              </button>
              <button
                onClick={() => setFilter('bookings')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2 ${
                  filter === 'bookings' 
                    ? 'bg-green-50 text-green-700 border border-green-300' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                Bookings
              </button>
              <button
                onClick={() => setFilter('donations')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2 ${
                  filter === 'donations' 
                    ? 'bg-blue-50 text-blue-600 border border-blue-300' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <IndianRupee className="w-4 h-4" />
                Donations
              </button>
              <button
                onClick={() => setFilter('events')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2 ${
                  filter === 'events' 
                    ? 'bg-purple-50 text-purple-600 border border-purple-300' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Gift className="w-4 h-4" />
                Events
              </button>
            </div>
            
            <div className="flex gap-2">
              <button 
                onClick={() => handleAction('export')}
                className="px-3 py-1.5 text-sm bg-gray-100 text-gray-800 rounded border border-gray-300 hover:bg-gray-200 flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
              <button 
                onClick={() => handleAction('refresh')}
                className="px-3 py-1.5 text-sm bg-orange-50 text-orange-500 rounded border border-orange-300 hover:bg-orange-100 flex items-center gap-2"
              >
                <Clock className="w-4 h-4" />
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Main Grid - EXACT match to NotificationsPuja layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left Column - Recent Bookings & Donations */}
          <div className="lg:col-span-2 space-y-4">
            {/* Recent Bookings - EXACT styling match */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-[15px] font-bold text-gray-800">Recent Bookings</h3>
                  <span className="text-sm text-gray-600">{recentBookings.length} items</span>
                </div>
              </div>

              <div className="divide-y divide-gray-200">
                {recentBookings.map((booking) => (
                  <div 
                    key={booking.id}
                    className="p-4 hover:bg-gray-50 transition-colors"
                    onClick={() => handleAction('viewBooking', booking.id)}
                  >
                    <div className="flex gap-3">
                      {/* Icon */}
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                        <ShoppingBag className="w-5 h-5 text-green-600" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <h4 className="text-[14px] font-semibold text-gray-800">
                              {booking.devotee}
                            </h4>
                            <span className={getStatusStyles(booking.status)}>
                              {booking.status}
                            </span>
                          </div>
                          <span className="text-xs text-gray-500">{booking.time}</span>
                        </div>

                        <p className="text-sm text-gray-700 mb-2">
                          {booking.seva} • #{booking.id}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-3">
                          <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded flex items-center gap-1">
                            <CalendarDays className="w-3 h-3" />
                            {booking.date}
                          </span>
                          <span className="px-2 py-0.5 bg-green-50 text-green-700 text-xs rounded flex items-center gap-1">
                            <IndianRupee className="w-3 h-3" />
                            ₹{booking.amount}
                          </span>
                          <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                            {booking.items} items
                          </span>
                        </div>

                        {/* Action Buttons - EXACT match */}
                        <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAction('viewBooking', booking.id);
                            }}
                            className="px-2.5 py-1 text-xs bg-orange-50 text-orange-500 rounded border border-orange-300 hover:bg-orange-100"
                          >
                            View Details →
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* View All Link - EXACT match */}
              <div className="p-3 bg-gray-50 border-t border-gray-200">
                <button className="text-sm font-medium text-orange-500 hover:text-orange-600 flex items-center justify-center gap-1">
                  View All Bookings
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Recent Donations - EXACT styling match */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-[15px] font-bold text-gray-800">Recent Donations</h3>
                  <span className="text-sm text-gray-600">{recentDonations.length} items</span>
                </div>
              </div>

              <div className="divide-y divide-gray-200">
                {recentDonations.map((donation) => (
                  <div 
                    key={donation.id}
                    className="p-4 hover:bg-gray-50 transition-colors"
                    onClick={() => handleAction('viewDonation', donation.id)}
                  >
                    <div className="flex gap-3">
                      {/* Icon */}
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                        <IndianRupee className="w-5 h-5 text-blue-600" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <h4 className="text-[14px] font-semibold text-gray-800">
                              {donation.devotee}
                            </h4>
                            <span className={getStatusStyles(donation.status)}>
                              {donation.status}
                            </span>
                          </div>
                          <span className="text-xs text-gray-500">{donation.time}</span>
                        </div>

                        <p className="text-sm text-gray-700 mb-2">
                          {donation.type} • #{donation.id}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-3">
                          <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded flex items-center gap-1">
                            <CalendarDays className="w-3 h-3" />
                            {donation.date}
                          </span>
                          <span className="px-2 py-0.5 bg-green-50 text-green-700 text-xs rounded flex items-center gap-1">
                            <IndianRupee className="w-3 h-3" />
                            ₹{donation.amount.toLocaleString('en-IN')}
                          </span>
                          <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                            {donation.paymentMode}
                          </span>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAction('viewDonation', donation.id);
                            }}
                            className="px-2.5 py-1 text-xs bg-orange-50 text-orange-500 rounded border border-orange-300 hover:bg-orange-100"
                          >
                            View Receipt →
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* View All Link */}
              <div className="p-3 bg-gray-50 border-t border-gray-200">
                <button className="text-sm font-medium text-orange-500 hover:text-orange-600 flex items-center justify-center gap-1">
                  View All Donations
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Events & Activity */}
          <div className="space-y-4">
            {/* Upcoming Events - EXACT match to NotificationsPuja settings card style */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[15px] font-bold text-gray-800">Upcoming Events</h3>
                <button className="text-sm font-medium text-orange-500 hover:text-orange-600">
                  View All
                </button>
              </div>
              
              <div className="space-y-3">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-purple-50 rounded">
                        <Gift className="w-4 h-4 text-purple-600" />
                      </div>
                      <div>
                        <span className="text-sm text-gray-700">{event.name}</span>
                        <p className="text-xs text-gray-500 mt-0.5">{event.date}</p>
                      </div>
                    </div>
                    <span className={getStatusStyles(event.status)}>
                      {event.devotees}+
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity - EXACT match to NotificationsPuja stats card style */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="text-[15px] font-bold text-gray-800 mb-4">Recent Activity</h3>
              
              <div className="space-y-3">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-2">
                    <div className="p-1.5 bg-gray-100 rounded flex-shrink-0">
                      {getIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-700 truncate">{activity.message}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-gray-500">{activity.time}</span>
                        {activity.amount && (
                          <>
                            <span className="text-xs text-gray-300">•</span>
                            <span className="text-xs font-medium text-green-600">
                              ₹{activity.amount}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
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
                  <h4 className="text-sm font-medium text-gray-800 mb-1">Today's Overview</h4>
                  <p className="text-xs text-gray-700">
                    45 devotees expected for Sandhya Aarti. 3 pending bookings.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions - EXACT match to NotificationsPuja button styles */}
            <div className="space-y-2">
              <button className="w-full px-3 py-2 bg-orange-50 text-orange-500 text-sm font-medium rounded border border-orange-300 hover:bg-orange-100 transition-colors flex items-center justify-center gap-2">
                <ShoppingBag className="w-4 h-4" />
                Add New Seva
              </button>
              
              <button className="w-full px-3 py-2 bg-white text-gray-800 text-sm font-medium rounded border border-gray-300 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                <Gift className="w-4 h-4" />
                Create New Event
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section - EXACT match to NotificationsPuja */}
        <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg border border-gray-200 p-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-center sm:text-left">
              <p className="text-sm text-gray-600">Need help with dashboard?</p>
              <p className="text-[14px] text-gray-800">Contact support: +91 98765 43210</p>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => handleAction('refresh')}
                className="px-3 py-1.5 text-sm bg-gray-100 text-gray-800 rounded border border-gray-300 hover:bg-gray-200"
              >
                Refresh Dashboard
              </button>
              <button className="px-3 py-1.5 text-sm bg-gradient-to-r from-orange-300 to-orange-300 text-gray-800 hover:text-white rounded hover:from-orange-500 hover:to-orange-600">
                Get Help
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TempleDashboard;