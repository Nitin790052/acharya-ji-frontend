import { useState, useEffect } from 'react';
import { 
  Bell, Calendar, DollarSign, Star,
  MessageSquare, AlertCircle, CheckCircle,
  Clock, XCircle, Filter, Search,
  MoreVertical, Eye, Trash2, Archive,
  ChevronDown, ChevronUp, X, Check,
  Users, Shield, RefreshCw, Settings,
  ArrowUpRight, ArrowDownRight, BellOff,
  Volume2, VolumeX, Download, Printer,
  Mail, Phone, Video, FileText,
  Home, Globe, Building, User
} from 'lucide-react';

import VendorPageHeader from '../../../components/VendorPageHeader';

const AstroNotifications = () => {
  const [activeFilter, setActiveFilter] = useState('all'); // all, important, finance, messages, unread
  const [showFilters, setShowFilters] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [doNotDisturb, setDoNotDisturb] = useState(false);
  const [AstronotificationSound, setAstroNotificationSound] = useState(true);

  // Filter categories
  const filters = [
    { id: 'all', label: 'All', count: 48, icon: Bell },
    { id: 'important', label: 'Important', count: 12, icon: AlertCircle },
    { id: 'finance', label: 'Finance', count: 8, icon: DollarSign },
    { id: 'messages', label: 'Messages', count: 16, icon: MessageSquare },
    { id: 'unread', label: 'Unread', count: 5, icon: Bell }
  ];

  // Notification settings
  const AstronotificationSettings = {
    booking: { push: true, email: true, sound: true },
    payment: { push: true, email: true, sound: true },
    review: { push: true, email: true, sound: false },
    system: { push: true, email: true, sound: false },
    marketing: { push: false, email: true, sound: false }
  };

  // Sample Astronotifications data
  const Astronotifications = [
    {
      id: 1,
      type: 'booking',
      title: 'New Booking Confirmed',
      message: 'Rajesh Kumar booked Ganpati Puja for Tomorrow, 10:30 AM',
      time: '10 minutes ago',
      priority: 'high',
      read: false,
      important: true,
      client: 'Rajesh Kumar',
      service: 'Ganpati Puja',
      date: 'Tomorrow, 10:30 AM',
      amount: 2500,
      actions: ['View Details', 'Confirm', 'Reschedule']
    },
    {
      id: 2,
      type: 'payment',
      title: 'Payment Received',
      message: 'Payment of ₹1,800 received from Priya Sharma for Satyanarayan Katha',
      time: '25 minutes ago',
      priority: 'high',
      read: false,
      important: true,
      client: 'Priya Sharma',
      service: 'Satyanarayan Katha',
      amount: 1800,
      method: 'UPI',
      actions: ['View Invoice', 'Send Receipt']
    },
    {
      id: 3,
      type: 'review',
      title: 'New 5-Star Review',
      message: 'Amit Patel gave you a 5-star rating for Vastu Consultation',
      time: '1 hour ago',
      priority: 'medium',
      read: false,
      important: true,
      client: 'Amit Patel',
      service: 'Vastu Consultation',
      rating: 5,
      actions: ['View Review', 'Reply', 'Share']
    },
    {
      id: 4,
      type: 'system',
      title: 'System Maintenance',
      message: 'Scheduled maintenance tonight from 2 AM to 4 AM. Some features may be unavailable.',
      time: '2 hours ago',
      priority: 'medium',
      read: true,
      important: false,
      actions: ['View Details', 'Dismiss']
    },
    {
      id: 5,
      type: 'booking',
      title: 'Booking Reminder',
      message: 'You have a consultation with Sonia Verma in 30 minutes',
      time: '30 minutes ago',
      priority: 'high',
      read: true,
      important: true,
      client: 'Sonia Verma',
      service: 'Navgraha Shanti',
      date: 'Today, 3:00 PM',
      actions: ['Join Call', 'Reschedule', 'Cancel']
    },
    {
      id: 6,
      type: 'finance',
      title: 'Withdrawal Successful',
      message: '₹25,000 has been transferred to your bank account',
      time: '1 day ago',
      priority: 'medium',
      read: true,
      important: true,
      amount: 25000,
      method: 'Bank Transfer',
      actions: ['View Statement', 'Download Receipt']
    },
    {
      id: 7,
      type: 'message',
      title: 'New Message',
      message: 'Vikram Singh sent a message about Maha Mrityunjay Jaap follow-up',
      time: '2 days ago',
      priority: 'low',
      read: true,
      important: false,
      client: 'Vikram Singh',
      service: 'Maha Mrityunjay Jaap',
      actions: ['Reply', 'View Chat']
    },
    {
      id: 8,
      type: 'system',
      title: 'Feature Update',
      message: 'New Kundli matching feature is now available. Try it now!',
      time: '3 days ago',
      priority: 'low',
      read: true,
      important: false,
      actions: ['Try Now', 'Learn More']
    }
  ];

  // Stats
  const stats = [
    { title: 'Total', value: '48', change: '+8', icon: Bell, color: 'orange', trend: 'up' },
    { title: 'Unread', value: '5', change: '-2', icon: AlertCircle, color: 'blue', trend: 'down' },
    { title: 'Important', value: '12', change: '+3', icon: Star, color: 'green', trend: 'up' },
    { title: 'Today', value: '8', change: '+4', icon: Calendar, color: 'purple', trend: 'up' }
  ];

  // Get icon for notification type
  const getNotificationIcon = (type) => {
    switch(type) {
      case 'booking':
        return { icon: Calendar, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' };
      case 'payment':
        return { icon: DollarSign, color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' };
      case 'review':
        return { icon: Star, color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200' };
      case 'system':
        return { icon: Shield, color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-200' };
      case 'message':
        return { icon: MessageSquare, color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200' };
      case 'finance':
        return { icon: DollarSign, color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' };
      default:
        return { icon: Bell, color: 'text-gray-600', bg: 'bg-gray-50', border: 'border-gray-200' };
    }
  };

  // Get priority badge
  const getPriorityBadge = (priority) => {
    switch(priority) {
      case 'high':
        return <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-200 text-xs">
          <AlertCircle className="w-3 h-3" /> High
        </span>;
      case 'medium':
        return <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-yellow-50 text-yellow-700 border border-yellow-200 text-xs">
          <Clock className="w-3 h-3" /> Medium
        </span>;
      case 'low':
        return <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 border border-gray-200 text-xs">
          <Bell className="w-3 h-3" /> Low
        </span>;
      default:
        return null;
    }
  };

  // Filter Astronotifications
  const filteredAstroNotifications = Astronotifications.filter(notification => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'important') return notification.important;
    if (activeFilter === 'finance') return notification.type === 'payment' || notification.type === 'finance';
    if (activeFilter === 'messages') return notification.type === 'message';
    if (activeFilter === 'unread') return !notification.read;
    return true;
  });

  // Mark as read
  const markAsRead = (id) => {
    // In real app, this would be an API call
    console.log(`Marked notification ${id} as read`);
  };

  // Mark all as read
  const markAllAsRead = () => {
    // In real app, this would be an API call
    console.log('Marked all Astronotifications as read');
    alert('All Astronotifications marked as read');
  };

  // Delete notification
  const deleteNotification = (id) => {
    if (window.confirm('Are you sure you want to delete this notification?')) {
      // In real app, this would be an API call
      console.log(`Deleted notification ${id}`);
    }
  };

  // Archive notification
  const archiveNotification = (id) => {
    // In real app, this would be an API call
    console.log(`Archived notification ${id}`);
  };

  // Notification Card Component
  const NotificationCard = ({ notification }) => {
    const [showActions, setShowActions] = useState(false);
    const typeInfo = getNotificationIcon(notification.type);

    return (
      <div className={`bg-white rounded-lg border ${
        notification.read ? 'border-gray-200' : 'border-orange-300 bg-orange-50/30'
      } shadow-xs hover:shadow-sm transition-all`}>
        <div className="p-3">
          <div className="flex items-start gap-3">
            {/* Icon */}
            <div className={`w-10 h-10 rounded-full ${typeInfo.bg} border ${typeInfo.border} flex items-center justify-center flex-shrink-0`}>
              <typeInfo.icon className={`w-5 h-5 ${typeInfo.color}`} />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold text-gray-800 text-sm">{notification.title}</h3>
                  {!notification.read && (
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  )}
                  {notification.important && (
                    <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                  )}
                  {getPriorityBadge(notification.priority)}
                </div>
                
                <div className="relative">
                  <button 
                    onClick={() => setShowActions(!showActions)}
                    className="p-1 hover:bg-gray-100 rounded text-gray-500"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>
                  
                  {showActions && (
                    <div className="absolute right-0 top-6 bg-white border border-gray-200 rounded-lg shadow-lg z-10 w-40">
                      {!notification.read && (
                        <button 
                          onClick={() => markAsRead(notification.id)}
                          className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex items-center gap-2"
                        >
                          <Check className="w-3 h-3" /> Mark as Read
                        </button>
                      )}
                      <button 
                        onClick={() => setSelectedNotification(notification)}
                        className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex items-center gap-2"
                      >
                        <Eye className="w-3 h-3" /> View Details
                      </button>
                      <button 
                        onClick={() => archiveNotification(notification.id)}
                        className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex items-center gap-2"
                      >
                        <Archive className="w-3 h-3" /> Archive
                      </button>
                      <button 
                        onClick={() => deleteNotification(notification.id)}
                        className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                      >
                        <Trash2 className="w-3 h-3" /> Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
              
              <p className="text-sm text-gray-700 mb-2">{notification.message}</p>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">{notification.time}</span>
                
                {/* Quick Actions */}
                <div className="flex items-center gap-1">
                  {notification.actions?.slice(0, 2).map((action, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        if (action === 'View Details') {
                          setSelectedNotification(notification);
                        } else {
                          console.log(`Action: ${action} for notification ${notification.id}`);
                        }
                      }}
                      className="px-2 py-0.5 text-xs border border-gray-300 rounded hover:bg-gray-50"
                    >
                      {action}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50/30">
      <VendorPageHeader 
        title="NOTIFICATIONS CENTER" 
        subtitle="Stay updated with alerts and updates" 
      />

      {/* Main Content */}
      <div className="space-y-4 p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {stats.map((stat, index) => (
            <div key={index} className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 
                                      p-3 rounded-lg border border-gray-200 shadow-xs">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-800">{stat.title}</p>
                  <div className="flex items-baseline gap-1.5 mt-0.5">
                    <p className="text-xl font-semibold text-gray-800">{stat.value}</p>
                    <span className={`text-xs font-medium flex items-center ${
                      stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.trend === 'up' ? 
                        <ArrowUpRight className="w-3 h-3" /> : 
                        <ArrowDownRight className="w-3 h-3" />
                      }
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className={`p-1.5 rounded ${
                  stat.color === 'orange' ? 'bg-orange-50' :
                  stat.color === 'blue' ? 'bg-blue-50' :
                  stat.color === 'green' ? 'bg-green-50' :
                  'bg-purple-50'
                }`}>
                  <stat.icon className={`w-4 h-4 ${
                    stat.color === 'orange' ? 'text-orange-500' :
                    stat.color === 'blue' ? 'text-blue-500' :
                    stat.color === 'green' ? 'text-green-500' :
                    'text-purple-500'
                  }`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-xs">
          <div className="flex flex-col sm:flex-row gap-2">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search Astronotifications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>
            
            {/* Desktop Filters */}
            <div className="hidden sm:flex gap-2">
              {filters.map(filter => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded text-sm font-medium transition-all ${
                    activeFilter === filter.id
                      ? 'bg-gradient-to-r from-orange-400 to-orange-500 text-white'
                      : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <filter.icon className="w-4 h-4" />
                  {filter.label}
                  <span className={`px-1.5 py-0.5 text-xs rounded-full ${
                    activeFilter === filter.id
                      ? 'bg-white/20'
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {filter.count}
                  </span>
                </button>
              ))}
            </div>
            
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="sm:hidden flex items-center justify-center gap-1.5 px-3 py-2 border border-gray-300 rounded hover:bg-gray-50 text-sm"
            >
              <Filter className="w-4 h-4" />
              Filter: {filters.find(f => f.id === activeFilter)?.label}
              {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            
            {/* Settings Button */}
            <button
              onClick={() => setShowSettings(true)}
              className="px-3 py-2 border border-gray-300 rounded hover:bg-gray-50 text-sm"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline ml-1">Settings</span>
            </button>
          </div>
          
          {/* Mobile Filters */}
          {showFilters && (
            <div className="sm:hidden mt-3 pt-3 border-t border-gray-200">
              <div className="grid grid-cols-2 gap-2">
                {filters.map(filter => (
                  <button
                    key={filter.id}
                    onClick={() => {
                      setActiveFilter(filter.id);
                      setShowFilters(false);
                    }}
                    className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded text-sm font-medium ${
                      activeFilter === filter.id
                        ? 'bg-gradient-to-r from-orange-400 to-orange-500 text-white'
                        : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <filter.icon className="w-4 h-4" />
                    {filter.label}
                    <span className={`px-1.5 py-0.5 text-xs rounded-full ${
                      activeFilter === filter.id
                        ? 'bg-white/20'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {filter.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Do Not Disturb Toggle (Mobile) */}
        <div className="sm:hidden bg-white p-3 rounded-lg border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {doNotDisturb ? (
                <>
                  <BellOff className="w-5 h-5 text-red-600" />
                  <span className="font-medium text-gray-800">Do Not Disturb is ON</span>
                </>
              ) : (
                <>
                  <Bell className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-gray-800">Do Not Disturb is OFF</span>
                </>
              )}
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={doNotDisturb}
                onChange={() => setDoNotDisturb(!doNotDisturb)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
            </label>
          </div>
          {doNotDisturb && (
            <p className="text-sm text-gray-600 mt-2">
              You will not receive notification sounds or vibrations. AstroNotifications will still appear in the center.
            </p>
          )}
        </div>

        {/* AstroNotifications Grid */}
        <div className="grid grid-cols-1 gap-3">
          {filteredAstroNotifications.map(notification => (
            <NotificationCard key={notification.id} notification={notification} />
          ))}
        </div>

        {filteredAstroNotifications.length === 0 && (
          <div className="text-center py-8">
            <div className="w-12 h-12 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-3">
              <Bell className="text-gray-400 w-6 h-6" />
            </div>
            <h3 className="text-base font-medium text-gray-700 mb-1.5">No Astronotifications found</h3>
            <p className="text-sm text-gray-500 mb-4 max-w-md mx-auto">
              {activeFilter === 'unread' ? 'You have no unread Astronotifications' :
               activeFilter === 'important' ? 'No important Astronotifications' :
               'All caught up! No Astronotifications at the moment.'}
            </p>
            <button
              onClick={() => setActiveFilter('all')}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-lg text-sm"
            >
              View All AstroNotifications
            </button>
          </div>
        )}

        {/* Notification Summary */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-xs">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-base font-semibold text-gray-800">Notification Summary</h2>
            <p className="text-sm text-gray-600 mt-0.5">Last 7 days activity</p>
          </div>
          
          <div className="p-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">24</div>
                <div className="text-sm text-gray-600">Bookings</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">18</div>
                <div className="text-sm text-gray-600">Payments</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">7</div>
                <div className="text-sm text-gray-600">Reviews</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">12</div>
                <div className="text-sm text-gray-600">Messages</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notification Details Modal */}
      {selectedNotification && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-3 sm:p-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-lg">
            <div className="p-4 sm:p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-800">Notification Details</h2>
                <button 
                  onClick={() => setSelectedNotification(null)}
                  className="p-1 hover:bg-gray-100 rounded text-gray-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center gap-3">
                  {(() => {
                    const typeInfo = getNotificationIcon(selectedNotification.type);
                    return (
                      <div className={`w-12 h-12 rounded-full ${typeInfo.bg} border ${typeInfo.border} flex items-center justify-center`}>
                        <typeInfo.icon className={`w-6 h-6 ${typeInfo.color}`} />
                      </div>
                    );
                  })()}
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg">{selectedNotification.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-gray-600">{selectedNotification.time}</span>
                      {getPriorityBadge(selectedNotification.priority)}
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <p className="text-gray-700">{selectedNotification.message}</p>
                </div>

                {/* Additional Details */}
                <div className="grid grid-cols-2 gap-3">
                  {selectedNotification.client && (
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Client</label>
                      <div className="flex items-center gap-1.5">
                        <User className="w-4 h-4 text-gray-500" />
                        <span className="font-medium">{selectedNotification.client}</span>
                      </div>
                    </div>
                  )}
                  
                  {selectedNotification.service && (
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Service</label>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span className="font-medium">{selectedNotification.service}</span>
                      </div>
                    </div>
                  )}
                  
                  {selectedNotification.date && (
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Date & Time</label>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="font-medium">{selectedNotification.date}</span>
                      </div>
                    </div>
                  )}
                  
                  {selectedNotification.amount && (
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Amount</label>
                      <div className="flex items-center gap-1.5">
                        <DollarSign className="w-4 h-4 text-gray-500" />
                        <span className="font-medium">₹{selectedNotification.amount.toLocaleString()}</span>
                      </div>
                    </div>
                  )}
                  
                  {selectedNotification.method && (
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Method</label>
                      <div className="font-medium">{selectedNotification.method}</div>
                    </div>
                  )}
                  
                  {selectedNotification.rating && (
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Rating</label>
                      <div className="flex items-center gap-1">
                        {[...Array(selectedNotification.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-2 pt-4 border-t">
                  {selectedNotification.actions?.map((action, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        console.log(`Action: ${action} for notification ${selectedNotification.id}`);
                        setSelectedNotification(null);
                      }}
                      className={`px-3 py-2 rounded text-sm ${
                        action.includes('Delete') || action.includes('Cancel')
                          ? 'border border-red-300 text-red-600 hover:bg-red-50'
                          : action.includes('View') || action.includes('Download')
                          ? 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                          : 'bg-gradient-to-r from-orange-400 to-orange-500 text-white hover:from-orange-600 hover:to-orange-700'
                      }`}
                    >
                      {action}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notification Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-3 sm:p-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[85vh] overflow-y-auto">
            <div className="p-4 sm:p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-800">Notification Settings</h2>
                <button 
                  onClick={() => setShowSettings(false)}
                  className="p-1 hover:bg-gray-100 rounded text-gray-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Do Not Disturb */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <BellOff className="w-5 h-5 text-gray-700" />
                      <div>
                        <h3 className="font-semibold text-gray-800">Do Not Disturb</h3>
                        <p className="text-sm text-gray-600">Temporarily silence all Astronotifications</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={doNotDisturb}
                        onChange={() => setDoNotDisturb(!doNotDisturb)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
                    </label>
                  </div>
                  {doNotDisturb && (
                    <div className="mt-2">
                      <label className="block text-sm text-gray-700 mb-1">Duration</label>
                      <select className="w-full px-3 py-2 text-sm border border-gray-300 rounded">
                        <option value="1h">1 hour</option>
                        <option value="2h">2 hours</option>
                        <option value="4h">4 hours</option>
                        <option value="8h">8 hours</option>
                        <option value="until_tomorrow">Until tomorrow 8 AM</option>
                      </select>
                    </div>
                  )}
                </div>

                {/* Notification Sound */}
                <div>
                  <h3 className="text-base font-semibold text-gray-800 mb-3">Notification Sounds</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded border border-gray-200">
                      <div className="flex items-center gap-2">
                        {AstronotificationSound ? (
                          <Volume2 className="w-5 h-5 text-green-600" />
                        ) : (
                          <VolumeX className="w-5 h-5 text-gray-500" />
                        )}
                        <div>
                          <div className="font-medium text-gray-800">Notification Sound</div>
                          <div className="text-sm text-gray-600">Play sound for new Astronotifications</div>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={AstronotificationSound}
                          onChange={() => setAstroNotificationSound(!AstronotificationSound)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                      </label>
                    </div>
                    
                    {AstronotificationSound && (
                      <div>
                        <label className="block text-sm text-gray-700 mb-1">Sound Type</label>
                        <select className="w-full px-3 py-2 text-sm border border-gray-300 rounded">
                          <option value="default">Default</option>
                          <option value="gentle">Gentle</option>
                          <option value="chime">Chime</option>
                          <option value="bell">Bell</option>
                          <option value="ding">Ding</option>
                        </select>
                      </div>
                    )}
                  </div>
                </div>

                {/* Notification Types */}
                <div>
                  <h3 className="text-base font-semibold text-gray-800 mb-3">Notification Types</h3>
                  <div className="space-y-3">
                    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                      <div className="grid grid-cols-4 bg-gray-50 p-3 border-b border-gray-200">
                        <div className="font-medium text-gray-800">Type</div>
                        <div className="text-center font-medium text-gray-800">Push</div>
                        <div className="text-center font-medium text-gray-800">Email</div>
                        <div className="text-center font-medium text-gray-800">Sound</div>
                      </div>
                      
                      {Object.entries(AstronotificationSettings).map(([type, settings]) => (
                        <div key={type} className="grid grid-cols-4 p-3 border-b border-gray-200 last:border-b-0">
                          <div className="font-medium text-gray-800 capitalize">{type}</div>
                          <div className="text-center">
                            <input
                              type="checkbox"
                              defaultChecked={settings.push}
                              className="w-4 h-4 text-orange-500 rounded"
                            />
                          </div>
                          <div className="text-center">
                            <input
                              type="checkbox"
                              defaultChecked={settings.email}
                              className="w-4 h-4 text-orange-500 rounded"
                            />
                          </div>
                          <div className="text-center">
                            <input
                              type="checkbox"
                              defaultChecked={settings.sound}
                              className="w-4 h-4 text-orange-500 rounded"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Priority Settings */}
                <div>
                  <h3 className="text-base font-semibold text-gray-800 mb-3">Priority Settings</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded border border-gray-200">
                      <div>
                        <div className="font-medium text-gray-800">High Priority AstroNotifications</div>
                        <div className="text-sm text-gray-600">Always show with sound and vibration</div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          defaultChecked={true}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded border border-gray-200">
                      <div>
                        <div className="font-medium text-gray-800">Vibrate on Notification</div>
                        <div className="text-sm text-gray-600">Vibrate device for important Astronotifications</div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          defaultChecked={true}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Modal Actions */}
                <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 pt-4 border-t">
                  <button
                    onClick={() => setShowSettings(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 text-sm w-full sm:w-auto"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setShowSettings(false);
                      alert('Notification settings saved successfully!');
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded hover:from-orange-600 hover:to-orange-700 text-sm w-full sm:w-auto"
                  >
                    Save Settings
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AstroNotifications;
