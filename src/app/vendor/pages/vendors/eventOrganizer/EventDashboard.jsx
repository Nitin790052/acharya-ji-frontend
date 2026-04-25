import React, { useState } from 'react';
import {
  // Core Icons
  CalendarDays,
  Ticket,
  Users,
  IndianRupee,
  TrendingUp,
  TrendingDown,
  Clock,
  MapPin,
  Bell,
  ChevronRight,
  Filter,
  Download,
  Eye,
  CheckCircle2,
  AlertCircle,
  Gift,
  Star,
  Award,
  UserCircle,
  Phone,
  Mail,
  Share2,
  MoreVertical
} from 'lucide-react';
import image1 from "../../../../../assets/vendor/eventsDashboard/Mahashivratri Celebration.webp"
import image2 from "../../../../../assets/vendor/eventsDashboard/Ram Navami.webp"
import image3 from "../../../../../assets/vendor/eventsDashboard/Hanuman Jayanti.webp"
import image4 from "../../../../../assets/vendor/eventsDashboard/Annakut Utsav medium.webp"
import image5 from "../../../../../assets/vendor/eventsDashboard/Gita Jayanti.webp"

import VendorPageHeader from '../../../components/VendorPageHeader';

const EventDashboard = () => {
  const [filter, setFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  // ============ DASHBOARD STATS ============
  const [stats, setStats] = useState({
    totalEvents: 12,
    activeEvents: 8,
    upcomingEvents: 5,
    completedEvents: 7,
    totalTickets: 3450,
    ticketsSold: 2150,
    ticketsAvailable: 1300,
    todayBookings: 45,
    yesterdayBookings: 38,
    totalEarnings: 845000,
    todayEarnings: 45600,
    monthEarnings: 245000,
    avgTicketPrice: 350,
    conversionRate: 68.5
  });

  // ============ UPCOMING EVENTS DATA ============
  const [upcomingEvents, setUpcomingEvents] = useState([
    {
      id: 'EVT-001',
      name: 'Mahashivratri Celebration',
      date: '26 Feb 2026',
      day: 'Thursday',
      time: '06:00 PM - 06:00 AM',
      venue: 'Main Temple Hall',
      totalTickets: 500,
      soldTickets: 345,
      availableTickets: 155,
      revenue: 172500,
      status: 'upcoming',
      priority: 'critical',
      image: image1,
      registrations: 45,
      waitlist: 12
    },
    {
      id: 'EVT-002',
      name: 'Ram Navami',
      date: '06 Apr 2026',
      day: 'Monday',
      time: '05:00 AM - 10:00 PM',
      venue: 'Main Temple Hall',
      totalTickets: 400,
      soldTickets: 245,
      availableTickets: 155,
      revenue: 122500,
      status: 'upcoming',
      priority: 'high',
      image: image2,
      registrations: 28,
      waitlist: 8
    },
    {
      id: 'EVT-003',
      name: 'Hanuman Jayanti',
      date: '12 Apr 2026',
      day: 'Sunday',
      time: '05:30 AM - 09:00 PM',
      venue: 'Hanuman Temple',
      totalTickets: 350,
      soldTickets: 189,
      availableTickets: 161,
      revenue: 94500,
      status: 'upcoming',
      priority: 'high',
      image: image3,
      registrations: 15,
      waitlist: 5
    },
    {
      id: 'EVT-004',
      name: 'Annakut Utsav',
      date: '15 Nov 2026',
      day: 'Sunday',
      time: '08:00 AM - 10:00 PM',
      venue: 'Temple Ground',
      totalTickets: 1000,
      soldTickets: 450,
      availableTickets: 550,
      revenue: 225000,
      status: 'planning',
      priority: 'medium',
      image: image4,
      registrations: 0,
      waitlist: 0
    },
    {
      id: 'EVT-005',
      name: 'Gita Jayanti',
      date: '17 Dec 2026',
      day: 'Thursday',
      time: '09:00 AM - 08:00 PM',
      venue: 'Main Temple Hall',
      totalTickets: 300,
      soldTickets: 120,
      availableTickets: 180,
      revenue: 60000,
      status: 'planning',
      priority: 'medium',
      image: image5,
      registrations: 0,
      waitlist: 0
    }
  ]);

  // ============ RECENT REGISTRATIONS DATA ============
  const [recentRegistrations, setRecentRegistrations] = useState([
    {
      id: 'REG-001',
      bookingId: 'BKG-7890',
      eventName: 'Mahashivratri Celebration',
      eventId: 'EVT-001',
      devotee: 'Rajesh Kumar',
      avatar: 'RK',
      tickets: 4,
      amount: 2000,
      date: '22 Feb 2026',
      time: '10:23 AM',
      status: 'confirmed',
      paymentStatus: 'paid',
      phone: '+91 98765 43210',
      email: 'rajesh.k@email.com'
    },
    {
      id: 'REG-002',
      bookingId: 'BKG-7891',
      eventName: 'Ram Navami',
      eventId: 'EVT-002',
      devotee: 'Priya Sharma',
      avatar: 'PS',
      tickets: 2,
      amount: 1000,
      date: '22 Feb 2026',
      time: '09:45 AM',
      status: 'confirmed',
      paymentStatus: 'paid',
      phone: '+91 98765 43211',
      email: 'priya.s@email.com'
    },
    {
      id: 'REG-003',
      bookingId: 'BKG-7892',
      eventName: 'Hanuman Jayanti',
      eventId: 'EVT-003',
      devotee: 'Amit Patel',
      avatar: 'AP',
      tickets: 6,
      amount: 3000,
      date: '21 Feb 2026',
      time: '04:30 PM',
      status: 'confirmed',
      paymentStatus: 'paid',
      phone: '+91 98765 43212',
      email: 'amit.p@email.com'
    },
    {
      id: 'REG-004',
      bookingId: 'BKG-7893',
      eventName: 'Mahashivratri Celebration',
      eventId: 'EVT-001',
      devotee: 'Sneha Reddy',
      avatar: 'SR',
      tickets: 3,
      amount: 1500,
      date: '21 Feb 2026',
      time: '02:15 PM',
      status: 'pending',
      paymentStatus: 'pending',
      phone: '+91 98765 43213',
      email: 'sneha.r@email.com'
    },
    {
      id: 'REG-005',
      bookingId: 'BKG-7894',
      eventName: 'Annakut Utsav',
      eventId: 'EVT-004',
      devotee: 'Vikram Singh',
      avatar: 'VS',
      tickets: 5,
      amount: 2500,
      date: '20 Feb 2026',
      time: '11:20 AM',
      status: 'confirmed',
      paymentStatus: 'paid',
      phone: '+91 98765 43214',
      email: 'vikram.s@email.com'
    },
    {
      id: 'REG-006',
      bookingId: 'BKG-7895',
      eventName: 'Gita Jayanti',
      eventId: 'EVT-005',
      devotee: 'Anita Desai',
      avatar: 'AD',
      tickets: 2,
      amount: 1000,
      date: '20 Feb 2026',
      time: '09:30 AM',
      status: 'cancelled',
      paymentStatus: 'refunded',
      phone: '+91 98765 43215',
      email: 'anita.d@email.com'
    }
  ]);

  // ============ UNREAD COUNT ============
  const unreadCount = 3;

  // ============ EXACT MATCH to NotificationsPuja ============
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
      case 'paid':
        return `${base} bg-green-50 text-green-700`;
      case 'pending':
        return `${base} bg-orange-50 text-orange-500`;
      case 'cancelled':
      case 'refunded':
        return `${base} bg-red-50 text-red-700`;
      case 'upcoming':
        return `${base} bg-blue-50 text-blue-600`;
      case 'planning':
        return `${base} bg-purple-50 text-purple-600`;
      case 'completed':
        return `${base} bg-gray-100 text-gray-600`;
      default:
        return `${base} bg-gray-100 text-gray-600`;
    }
  };

  // ============ STATS CARD COMPONENT ============
  const StatCard = ({ title, value, subtitle, icon: Icon, color = 'orange', trend, trendValue, prefix = '', suffix = '' }) => {
    const getIconBackground = () => {
      switch(color) {
        case 'green': return 'bg-green-50';
        case 'blue': return 'bg-blue-50';
        case 'purple': return 'bg-purple-50';
        case 'red': return 'bg-red-50';
        case 'yellow': return 'bg-yellow-50';
        default: return 'bg-orange-50';
      }
    };

    const getIconColor = () => {
      switch(color) {
        case 'green': return 'text-green-600';
        case 'blue': return 'text-blue-600';
        case 'purple': return 'text-purple-600';
        case 'red': return 'text-red-500';
        case 'yellow': return 'text-yellow-600';
        default: return 'text-orange-600';
      }
    };

    return (
      <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg border border-gray-200 px-3 py-2">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-600 truncate">{title}</p>
            <p className="text-xl font-semibold text-gray-800 mt-1 truncate">
              {prefix}{typeof value === 'number' ? value.toLocaleString('en-IN') : value}{suffix}
            </p>
            {trend && (
              <div className="flex items-center gap-1 mt-2">
                {trend === 'up' ? (
                  <TrendingUp className="w-3 h-3 text-green-600" />
                ) : (
                  <TrendingDown className="w-3 h-3 text-red-500" />
                )}
                <span className={`text-sm ${trend === 'up' ? 'text-green-600' : 'text-red-500'}`}>
                  {trendValue}
                </span>
              </div>
            )}
            {subtitle && (
              <p className="text-xs text-gray-500 mt-2 truncate">{subtitle}</p>
            )}
          </div>
          <div className={`p-2 ${getIconBackground()} rounded flex-shrink-0 ml-2`}>
            <Icon className={`w-5 h-5 ${getIconColor()}`} />
          </div>
        </div>
      </div>
    );
  };

  // ============ HANDLE ACTIONS ============
  const handleAction = (action, item = null) => {
    setIsLoading(true);
    
    switch(action) {
      case 'viewEvent':
        console.log('Viewing event:', item?.id);
        break;
      case 'viewRegistration':
        console.log('Viewing registration:', item?.id);
        break;
      case 'downloadTickets':
        console.log('Downloading tickets for:', item?.bookingId);
        break;
      case 'export':
        console.log('Exporting data');
        break;
      case 'refresh':
        console.log('Refreshing dashboard');
        break;
    }
    
    setTimeout(() => setIsLoading(false), 500);
  };

  return (
    <div className="min-h-screen bg-gray-50/30">
      <VendorPageHeader 
        title="EVENT ORGANIZER DASHBOARD" 
        subtitle="Overview of events, tickets, and registrations" 
      />

      {/* Main Content - EXACT spacing */}
      <div className="space-y-4 p-6">
        {/* Welcome Section - EXACT match */}
        <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg px-3 py-2 border border-orange-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <p className="text-[18px] text-gray-600">
                {stats.activeEvents} active events • {stats.ticketsSold} tickets sold
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm text-gray-600">Today's Earnings</p>
                <p className="text-[15px] font-semibold text-orange-500">
                  ₹{stats.todayEarnings.toLocaleString('en-IN')}
                </p>
              </div>
              <div className="w-8 h-8 bg-orange-50 rounded flex items-center justify-center">
                <IndianRupee className="w-5 h-5 text-orange-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards Grid - 4 cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {/* Total Events */}
          <StatCard
            title="Total Events"
            value={stats.totalEvents}
            subtitle={`${stats.activeEvents} active`}
            icon={CalendarDays}
            color="orange"
          />
          
          {/* Tickets Sold */}
          <StatCard
            title="Tickets Sold"
            value={stats.ticketsSold}
            subtitle={`${stats.ticketsAvailable} available`}
            icon={Ticket}
            color="green"
            trend="up"
            trendValue="+12.5%"
          />
          
          {/* Today Bookings */}
          <StatCard
            title="Today Bookings"
            value={stats.todayBookings}
            subtitle={`vs ${stats.yesterdayBookings} yesterday`}
            icon={Users}
            color="blue"
            trend="up"
            trendValue="+18.4%"
          />
          
          {/* Total Earnings */}
          <StatCard
            title="Total Earnings"
            value={stats.totalEarnings}
            prefix="₹"
            subtitle={`₹${stats.monthEarnings.toLocaleString('en-IN')} this month`}
            icon={IndianRupee}
            color="purple"
          />
        </div>

        {/* Secondary Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {/* Average Ticket Price */}
          <div className="bg-white rounded-lg border border-gray-200 px-3 py-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600">Avg. Ticket Price</p>
                <p className="text-lg font-semibold text-gray-800 mt-1">₹{stats.avgTicketPrice}</p>
              </div>
              <div className="p-1.5 bg-gray-100 rounded">
                <Ticket className="w-4 h-4 text-gray-600" />
              </div>
            </div>
          </div>
          
          {/* Conversion Rate */}
          <div className="bg-white rounded-lg border border-gray-200 px-3 py-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600">Conversion Rate</p>
                <p className="text-lg font-semibold text-gray-800 mt-1">{stats.conversionRate}%</p>
              </div>
              <div className="p-1.5 bg-blue-50 rounded">
                <TrendingUp className="w-4 h-4 text-blue-600" />
              </div>
            </div>
          </div>
          
          {/* Available Tickets */}
          <div className="bg-white rounded-lg border border-gray-200 px-3 py-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600">Available Tickets</p>
                <p className="text-lg font-semibold text-gray-800 mt-1">{stats.ticketsAvailable}</p>
              </div>
              <div className="p-1.5 bg-yellow-50 rounded">
                <Ticket className="w-4 h-4 text-yellow-600" />
              </div>
            </div>
          </div>
          
          {/* Upcoming Events */}
          <div className="bg-white rounded-lg border border-gray-200 px-3 py-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600">Upcoming Events</p>
                <p className="text-lg font-semibold text-gray-800 mt-1">{stats.upcomingEvents}</p>
              </div>
              <div className="p-1.5 bg-purple-50 rounded">
                <CalendarDays className="w-4 h-4 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filter Bar - EXACT match */}
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
                All Events ({upcomingEvents.length})
              </button>
              <button
                onClick={() => setFilter('upcoming')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                  filter === 'upcoming' 
                    ? 'bg-blue-50 text-blue-600 border border-blue-300' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Upcoming ({upcomingEvents.filter(e => e.status === 'upcoming').length})
              </button>
              <button
                onClick={() => setFilter('planning')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                  filter === 'planning' 
                    ? 'bg-purple-50 text-purple-600 border border-purple-300' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Planning ({upcomingEvents.filter(e => e.status === 'planning').length})
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

        {/* Main Grid - 2/3 + 1/3 Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left Column - Upcoming Events (2/3 width) */}
          <div className="lg:col-span-2 space-y-4">
            {/* Upcoming Events Section */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-[15px] font-bold text-gray-800">Upcoming Events</h3>
                  <span className="text-sm text-gray-600">{upcomingEvents.length} events</span>
                </div>
              </div>

              <div className="divide-y divide-gray-200">
                {upcomingEvents.map((event) => (
                  <div 
                    key={event.id}
                    className="p-4 hover:bg-gray-50 transition-colors"
                    onClick={() => handleAction('viewEvent', event)}
                  >
                    <div className="flex gap-3">
                      {/* Event Image */}
                      <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-orange-100 to-amber-100 rounded-lg overflow-hidden">
                        <img 
                          src={event.image} 
                          alt={event.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Event Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="text-[14px] font-semibold text-gray-800">
                              {event.name}
                            </h4>
                            <span className={getPriorityStyles(event.priority)}>
                              {event.priority}
                            </span>
                            <span className={getStatusStyles(event.status)}>
                              {event.status}
                            </span>
                          </div>
                        </div>

                        <p className="text-xs text-gray-600 mb-2 flex items-center gap-2">
                          <CalendarDays className="w-3 h-3" />
                          {event.date} • {event.day}
                          <span className="text-gray-300">|</span>
                          <MapPin className="w-3 h-3" />
                          {event.venue}
                        </p>

                        {/* Ticket Progress */}
                        <div className="mb-2">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-gray-600">Ticket Sales</span>
                            <span className="text-xs font-medium text-gray-800">
                              {event.soldTickets}/{event.totalTickets}
                            </span>
                          </div>
                          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-orange-400 to-orange-500 rounded-full"
                              style={{ width: `${(event.soldTickets / event.totalTickets) * 100}%` }}
                            ></div>
                          </div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          <span className="px-2 py-0.5 bg-green-50 text-green-700 text-xs rounded flex items-center gap-1">
                            <IndianRupee className="w-3 h-3" />
                            ₹{event.revenue.toLocaleString('en-IN')}
                          </span>
                          <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs rounded flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {event.registrations} new today
                          </span>
                          {event.waitlist > 0 && (
                            <span className="px-2 py-0.5 bg-orange-50 text-orange-500 text-xs rounded">
                              {event.waitlist} on waitlist
                            </span>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-2 pt-3 mt-2 border-t border-gray-100">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAction('viewEvent', event);
                            }}
                            className="px-2.5 py-1 text-xs bg-orange-50 text-orange-500 rounded border border-orange-300 hover:bg-orange-100 flex items-center gap-1"
                          >
                            <Eye className="w-3 h-3" />
                            View Details
                          </button>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAction('downloadTickets', event);
                            }}
                            className="px-2.5 py-1 text-xs bg-gray-100 text-gray-800 rounded border border-gray-300 hover:bg-gray-200 flex items-center gap-1"
                          >
                            <Download className="w-3 h-3" />
                            Report
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* View All Link */}
              <div className="p-3 bg-gray-50 border-t border-gray-200">
                <button className="text-sm font-medium text-orange-500 hover:text-orange-600 flex items-center justify-center gap-1 w-full">
                  View All Events
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Quick Stats & Recent Activity (1/3 width) */}
          <div className="space-y-4">
            {/* Ticket Sales Summary */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="text-[15px] font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Ticket className="w-5 h-5 text-green-600" />
                Ticket Sales Summary
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-gray-600">Sold</span>
                  </div>
                  <span className="text-sm font-medium text-gray-800">{stats.ticketsSold}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-xs text-gray-600">Available</span>
                  </div>
                  <span className="text-sm font-medium text-gray-800">{stats.ticketsAvailable}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    <span className="text-xs text-gray-600">Total Capacity</span>
                  </div>
                  <span className="text-sm font-medium text-gray-800">{stats.totalTickets}</span>
                </div>
                
                <div className="pt-3 mt-1 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">Sold Percentage</span>
                    <span className="text-xs font-medium text-gray-800">
                      {Math.round((stats.ticketsSold / stats.totalTickets) * 100)}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mt-2">
                    <div 
                      className="h-full bg-green-500 rounded-full"
                      style={{ width: `${(stats.ticketsSold / stats.totalTickets) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="text-[15px] font-bold text-gray-800 mb-3">Quick Stats</h3>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">This Week's Revenue</span>
                  <span className="text-sm font-semibold text-green-600">₹{stats.monthEarnings.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">Avg. Daily Bookings</span>
                  <span className="text-sm font-medium text-gray-800">{Math.round(stats.todayBookings * 0.8)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">Most Popular Event</span>
                  <span className="text-sm font-medium text-gray-800 truncate">Mahashivratri</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">Peak Booking Time</span>
                  <span className="text-sm font-medium text-gray-800">10:00 AM - 12:00 PM</span>
                </div>
              </div>
            </div>

            {/* Quick Tip Card - EXACT match */}
            <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg p-3 border border-orange-200">
              <div className="flex items-start gap-2">
                <div className="p-1.5 bg-orange-50 rounded">
                  <AlertCircle className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-800 mb-1">Event Tip</h4>
                  <p className="text-xs text-gray-700">
                    Mahashivratri is 3 days away. 155 tickets still available. Send reminders to registered devotees.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Registrations Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-[15px] font-bold text-gray-800">Recent Registrations</h3>
              <div className="flex items-center gap-2">
                <button className="p-1.5 text-gray-600 hover:bg-gray-100 rounded">
                  <Filter className="w-4 h-4" />
                </button>
                <button className="p-1.5 text-gray-600 hover:bg-gray-100 rounded">
                  <Download className="w-4 h-4" />
                </button>
                <span className="text-sm text-gray-600">{recentRegistrations.length} items</span>
              </div>
            </div>
          </div>

          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Booking ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Devotee</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Event</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Date & Time</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Tickets</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Amount</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentRegistrations.map((reg) => (
                  <tr key={reg.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{reg.bookingId}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full flex items-center justify-center">
                          <span className="text-xs font-semibold text-orange-700">{reg.avatar}</span>
                        </div>
                        <span className="text-sm text-gray-900">{reg.devotee}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">{reg.eventName}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-900">{reg.date}</span>
                        <span className="text-xs text-gray-500">{reg.time}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">{reg.tickets}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-gray-900">₹{reg.amount}</td>
                    <td className="px-4 py-3">
                      <span className={getStatusStyles(reg.status)}>
                        {reg.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button 
                          onClick={() => handleAction('viewRegistration', reg)}
                          className="p-1.5 text-gray-600 hover:bg-orange-50 hover:text-orange-600 rounded"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleAction('downloadTickets', reg)}
                          className="p-1.5 text-gray-600 hover:bg-gray-100 rounded"
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
            {recentRegistrations.slice(0, 3).map((reg) => (
              <div key={reg.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-gray-500">{reg.bookingId}</span>
                  </div>
                  <span className={getStatusStyles(reg.status)}>
                    {reg.status}
                  </span>
                </div>

                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-orange-700">{reg.avatar}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-gray-800">{reg.devotee}</h4>
                    <p className="text-xs text-gray-600 mt-0.5">{reg.eventName}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-xs text-gray-500">{reg.date}</span>
                      <span className="text-xs text-gray-500">{reg.time}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      {reg.tickets} tickets
                    </span>
                    <span className="text-xs font-semibold text-green-600">
                      ₹{reg.amount}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <button className="p-1.5 text-gray-600 hover:bg-orange-50 rounded">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-gray-600 hover:bg-gray-100 rounded">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All Link */}
          <div className="p-3 bg-gray-50 border-t border-gray-200">
            <button className="text-sm font-medium text-orange-500 hover:text-orange-600 flex items-center justify-center gap-1 w-full">
              View All Registrations
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Section - EXACT match */}
        <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg border border-gray-200 p-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-center sm:text-left">
              <p className="text-sm text-gray-600">Event dashboard summary</p>
              <p className="text-[14px] text-gray-800">
                {stats.upcomingEvents} upcoming events • {stats.ticketsAvailable} tickets available
              </p>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 text-sm bg-gray-100 text-gray-800 rounded border border-gray-300 hover:bg-gray-200">
                View Calendar
              </button>
              <button className="px-3 py-1.5 text-sm bg-gradient-to-r from-orange-300 to-orange-300 text-gray-800 hover:text-white rounded hover:from-orange-500 hover:to-orange-600">
                Create Event
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDashboard;
