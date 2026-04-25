import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Phone, 
  Navigation, 
  CheckCircle,
  XCircle,
  AlertCircle,
  MoreVertical,
  Filter,
  Search,
  Download,
  User,
  CreditCard,
  Video,
  MessageSquare,
  Flag,
  ChevronRight
} from 'lucide-react';

import VendorPageHeader from '../../../components/VendorPageHeader';

const Bookings = () => {
  const [activeTab, setActiveTab] = useState('today');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Tabs Data
  const tabs = [
    { id: 'today', label: 'Today', count: 4 },
    { id: 'upcoming', label: 'Upcoming', count: 12 },
    { id: 'past', label: 'Past', count: 28 },
    { id: 'cancelled', label: 'Cancelled', count: 3 }
  ];
  
  // Sample Bookings Data
  const bookingsData = {
    today: [
      {
        id: 1,
        pujaName: "Satyanarayan Katha",
        customerName: "Sharma Family",
        date: "Today",
        time: "11:30 AM - 1:30 PM",
        location: "Sector 45, Noida",
        type: "offline",
        paymentStatus: "paid",
        bookingStatus: "confirmed",
        amount: 3500,
        phone: "+91 98765 43210"
      },
      {
        id: 2,
        pujaName: "Ganesh Puja",
        customerName: "Patel Ji",
        date: "Today",
        time: "9:00 AM - 10:30 AM",
        location: "Sector 62, Noida",
        type: "offline",
        paymentStatus: "paid",
        bookingStatus: "completed",
        amount: 2500,
        phone: "+91 98765 43211"
      },
      {
        id: 3,
        pujaName: "Online Rudrabhishek",
        customerName: "Rohit Kumar",
        date: "Today",
        time: "3:00 PM - 4:00 PM",
        location: "Online (Zoom)",
        type: "online",
        paymentStatus: "paid",
        bookingStatus: "upcoming",
        amount: 1500,
        phone: "+91 98765 43212",
        meetingLink: "https://zoom.us/j/123456789"
      },
      {
        id: 4,
        pujaName: "Griha Pravesh",
        customerName: "Verma Ji",
        date: "Today",
        time: "5:00 PM - 7:00 PM",
        location: "Sector 128, Noida",
        type: "offline",
        paymentStatus: "pending",
        bookingStatus: "confirmed",
        amount: 4000,
        phone: "+91 98765 43213"
      }
    ],
    upcoming: [
      {
        id: 5,
        pujaName: "Mundan Ceremony",
        customerName: "Gupta Family",
        date: "Tomorrow",
        time: "10:00 AM - 12:00 PM",
        location: "Sector 110, Noida",
        type: "offline",
        paymentStatus: "paid",
        bookingStatus: "confirmed",
        amount: 3000,
        phone: "+91 98765 43214"
      },
      {
        id: 6,
        pujaName: "Havan",
        customerName: "Singh Ji",
        date: "15 Dec 2024",
        time: "2:00 PM - 4:00 PM",
        location: "Sector 34, Noida",
        type: "offline",
        paymentStatus: "paid",
        bookingStatus: "confirmed",
        amount: 2800,
        phone: "+91 98765 43215"
      }
    ],
    past: [
      {
        id: 7,
        pujaName: "Diwali Puja",
        customerName: "Joshi Family",
        date: "12 Nov 2024",
        time: "6:00 PM - 8:00 PM",
        location: "Sector 18, Noida",
        type: "offline",
        paymentStatus: "paid",
        bookingStatus: "completed",
        amount: 3200,
        phone: "+91 98765 43216"
      }
    ],
    cancelled: [
      {
        id: 8,
        pujaName: "Navratri Puja",
        customerName: "Mehta Ji",
        date: "10 Oct 2024",
        time: "11:00 AM - 1:00 PM",
        location: "Sector 22, Noida",
        type: "offline",
        paymentStatus: "refunded",
        bookingStatus: "cancelled",
        amount: 2700,
        phone: "+91 98765 43217"
      }
    ]
  };
  
  // Get current bookings based on active tab
  const currentBookings = bookingsData[activeTab];
  
  // Status styling functions - आपके guidelines के according
  const getPaymentStatusStyle = (status) => {
    const base = "px-2 py-0.5 rounded-full text-sm font-medium flex items-center gap-1";
    switch(status) {
      case 'paid': 
        return `${base} bg-green-50 text-green-700`;
      case 'pending': 
        return `${base} bg-orange-50 text-orange-500`;
      case 'refunded': 
        return `${base} bg-blue-50 text-blue-600`;
      default: 
        return `${base} bg-gray-50 text-gray-600`;
    }
  };
  
  const getBookingStatusStyle = (status) => {
    const base = "px-2 py-0.5 rounded-full text-sm font-medium flex items-center gap-1";
    switch(status) {
      case 'confirmed': 
        return `${base} bg-blue-50 text-blue-600`;
      case 'completed': 
        return `${base} bg-green-50 text-green-700`;
      case 'upcoming': 
        return `${base} bg-orange-50 text-orange-500`;
      case 'cancelled': 
        return `${base} bg-red-50 text-red-700`;
      default: 
        return `${base} bg-gray-50 text-gray-600`;
    }
  };
  
  const getStatusIcon = (status, type = 'booking') => {
    switch(status) {
      case 'confirmed':
      case 'paid':
        return <CheckCircle className="w-4 h-4" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'upcoming':
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'cancelled':
      case 'refunded':
        return <XCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };
  
  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  // Filter bookings based on search
  const filteredBookings = currentBookings.filter(booking =>
    booking.pujaName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    booking.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    booking.location.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="min-h-screen bg-gray-50/30">
      <VendorPageHeader 
        title="BOOKINGS" 
        subtitle="Manage all your puja bookings in one place" 
      />
      <div className="space-y-4 px-6 pb-6 pt-2">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h1 className="text-[26px] font-bold text-gray-800"></h1>
            <p className="text-sm text-gray-600 mt-1"></p>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 text-sm bg-white text-gray-800 rounded-lg border border-gray-300 hover:bg-gray-50 flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </button>
            <button className="px-3 py-1.5 text-sm bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>
        </div>
        
        {/* Search Bar */}
        <div className="bg-white rounded-lg border border-gray-300 p-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by puja name, customer, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm border-none focus:ring-0 focus:outline-none"
            />
          </div>
        </div>
        
        {/* Tabs - आपके guidelines के according */}
        <div className="border-b border-gray-200">
          <div className="flex space-x-4 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-orange-500 text-orange-500'
                    : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300'
                }`}
              >
                {tab.label}
                <span className={`ml-2 px-1.5 py-0.5 rounded-full text-xs ${
                  activeTab === tab.id
                    ? 'bg-orange-100 text-orange-700'
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>
        
        {/* Bookings Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {filteredBookings.map((booking) => (
            <div key={booking.id} className="bg-white rounded-lg border border-gray-200 hover:border-orange-300 transition-colors">
              {/* Card Header */}
              <div className="p-3 border-b border-gray-200">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-[15px] font-bold text-gray-800">{booking.pujaName}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <User className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-700">{booking.customerName}</span>
                    </div>
                  </div>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <MoreVertical className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </div>
              
              {/* Card Body */}
              <div className="p-3 space-y-2">
                {/* Date & Time */}
                <div className="flex items-center gap-2 text-[14px] text-gray-700">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="font-medium">{booking.date}</span>
                  <span className="mx-1">•</span>
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span>{booking.time}</span>
                </div>
                
                {/* Location / Online */}
                <div className="flex items-center gap-2 text-[14px] text-gray-700">
                  {booking.type === 'online' ? (
                    <>
                      <Video className="w-4 h-4 text-blue-500" />
                      <span className="text-blue-600">{booking.location}</span>
                      {booking.meetingLink && (
                        <a
                          href={booking.meetingLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-2 text-xs text-blue-600 hover:underline"
                        >
                          Join Meeting
                        </a>
                      )}
                    </>
                  ) : (
                    <>
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span>{booking.location}</span>
                    </>
                  )}
                </div>
                
                {/* Status Badges - आपके guidelines के according */}
                <div className="flex flex-wrap gap-2 pt-2">
                  <div className={getPaymentStatusStyle(booking.paymentStatus)}>
                    {getStatusIcon(booking.paymentStatus, 'payment')}
                    <span className="hidden xs:inline">
                      {booking.paymentStatus.charAt(0).toUpperCase() + booking.paymentStatus.slice(1)}
                    </span>
                  </div>
                  
                  <div className={getBookingStatusStyle(booking.bookingStatus)}>
                    {getStatusIcon(booking.bookingStatus, 'booking')}
                    <span className="hidden xs:inline">
                      {booking.bookingStatus.charAt(0).toUpperCase() + booking.bookingStatus.slice(1)}
                    </span>
                  </div>
                  
                  <div className="px-2 py-0.5 bg-gray-50 text-gray-700 rounded-full text-sm font-medium">
                    {formatCurrency(booking.amount)}
                  </div>
                </div>
              </div>
              
              {/* Card Footer - Actions */}
              <div className="p-3 border-t border-gray-200">
                <div className="flex flex-wrap gap-2">
                  {booking.bookingStatus === 'confirmed' && activeTab === 'today' && (
                    <button className="flex-1 min-w-[120px] px-3 py-1.5 bg-gradient-to-r from-green-500 to-green-600 text-white text-sm font-medium rounded hover:from-green-600 hover:to-green-700 transition-all flex items-center justify-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Mark Complete
                    </button>
                  )}
                  
                  <button className="flex-1 min-w-[100px] px-3 py-1.5 bg-blue-50 text-blue-600 text-sm font-medium rounded border border-blue-200 hover:bg-blue-100 transition-colors flex items-center justify-center gap-2">
                    <Phone className="w-4 h-4" />
                    Call
                  </button>
                  
                  {booking.type === 'offline' && (
                    <button className="flex-1 min-w-[100px] px-3 py-1.5 bg-gray-50 text-gray-700 text-sm font-medium rounded border border-gray-300 hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                      <Navigation className="w-4 h-4" />
                      Navigate
                    </button>
                  )}
                  
                  {booking.type === 'online' && booking.meetingLink && (
                    <button className="flex-1 min-w-[100px] px-3 py-1.5 bg-purple-50 text-purple-600 text-sm font-medium rounded border border-purple-200 hover:bg-purple-100 transition-colors flex items-center justify-center gap-2">
                      <Video className="w-4 h-4" />
                      Join
                    </button>
                  )}
                  
                  <button className="flex-1 min-w-[100px] px-3 py-1.5 bg-red-50 text-red-600 text-sm font-medium rounded border border-red-200 hover:bg-red-100 transition-colors flex items-center justify-center gap-2">
                    <Flag className="w-4 h-4" />
                    Report
                  </button>
                </div>
                
                {/* Additional Info */}
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CreditCard className="w-4 h-4" />
                    <span>ID: {`BOOK-${booking.id.toString().padStart(3, '0')}`}</span>
                  </div>
                  
                  <button className="text-sm text-orange-500 hover:text-orange-600 flex items-center gap-1">
                    View Details
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Empty State / No Results */}
        {filteredBookings.length === 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Calendar className="w-6 h-6 text-gray-400" />
            </div>
            <h3 className="text-[15px] font-semibold text-gray-800 mb-1">No bookings found</h3>
            <p className="text-sm text-gray-600 mb-4">
              {searchQuery ? 'Try a different search term' : `No ${activeTab} bookings available`}
            </p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="px-3 py-1.5 text-sm bg-gray-100 text-gray-800 rounded border border-gray-300 hover:bg-gray-200"
              >
                Clear Search
              </button>
            )}
          </div>
        )}
        
        {/* Stats Summary */}
        <div className="bg-white rounded-lg border border-gray-200 p-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-center sm:text-left">
              <p className="text-sm text-gray-600">Total {activeTab} bookings</p>
              <p className="text-xl font-bold text-gray-800">{filteredBookings.length}</p>
            </div>
            
            <div className="flex items-center gap-4 text-sm">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Completed</span>
                </div>
                <p className="font-semibold text-gray-800">
                  {filteredBookings.filter(b => b.bookingStatus === 'completed').length}
                </p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center gap-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-700">Confirmed</span>
                </div>
                <p className="font-semibold text-gray-800">
                  {filteredBookings.filter(b => b.bookingStatus === 'confirmed').length}
                </p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center gap-1">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-gray-700">Upcoming</span>
                </div>
                <p className="font-semibold text-gray-800">
                  {filteredBookings.filter(b => b.bookingStatus === 'upcoming').length}
                </p>
              </div>
            </div>
            
            <div className="text-center sm:text-right">
              <p className="text-sm text-gray-600">Total Revenue</p>
              <p className="text-[15px] font-bold text-green-700">
                {formatCurrency(filteredBookings.reduce((sum, booking) => sum + booking.amount, 0))}
              </p>
            </div>
          </div>
        </div>
        
        {/* Quick Actions Footer */}
        <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg border border-orange-200 p-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <h4 className="text-[14px] font-semibold text-gray-800 mb-1">Need help with bookings?</h4>
              <p className="text-sm text-gray-600">Contact support for any booking-related queries</p>
            </div>
            
            <div className="flex gap-2">
              <button className="px-3 py-1.5 text-sm bg-white text-gray-800 rounded-lg border border-gray-300 hover:bg-gray-50 flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Chat Support
              </button>
              <button className="px-3 py-1.5 text-sm bg-white text-gray-800 rounded-lg border border-gray-300 hover:bg-gray-50 flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Call Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookings;