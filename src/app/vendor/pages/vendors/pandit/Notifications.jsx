import React, { useState, useEffect } from 'react';
import {
  Bell,
  Calendar,
  XCircle,
  CheckCircle,
  CreditCard,
  Star,
  Shield,
  MessageSquare, // ✅ Only once
  Mail,
  Smartphone,
  Settings,
  Filter,
  Trash2,
  Eye,
  EyeOff,
  Pin,
  PinOff,
  Clock,
  User,
  MapPin,
  AlertCircle,
  ChevronRight,
  MoreVertical,
  RefreshCw,
  Volume2,
  VolumeX,
  BellOff
} from 'lucide-react';

// Custom WhatsApp Icon
const WhatsAppIcon = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zm-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.76.982.998-3.677-.236-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.9 6.994c-.004 5.45-4.438 9.88-9.888 9.88zm8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.333.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.333 11.893-11.893 0-3.18-1.24-6.162-3.495-8.411z" />
  </svg>
);

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('all');
  const [showSettings, setShowSettings] = useState(false);
  const [smsEnabled, setSmsEnabled] = useState(true);
  const [whatsappEnabled, setWhatsappEnabled] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const initialNotifications = [
    {
      id: 1,
      type: 'new_booking',
      title: 'New Booking Received',
      message: 'Satyanarayan Katha booked for 11:30 AM tomorrow',
      customer: 'Sharma Family',
      time: '10 min ago',
      read: false,
      critical: true,
      icon: Calendar,
      color: 'green'
    },
    {
      id: 2,
      type: 'payment',
      title: 'Payment Received',
      message: '₹3,500 received for Griha Pravesh Puja',
      amount: 3500,
      time: '1 hour ago',
      read: false,
      critical: false,
      icon: CreditCard,
      color: 'blue'
    },
    {
      id: 3,
      type: 'review',
      title: 'New Review Posted',
      message: 'Sharma Family gave you 5 stars for Satyanarayan Katha',
      rating: 5,
      time: '2 hours ago',
      read: true,
      critical: false,
      icon: Star,
      color: 'yellow'
    },
    {
      id: 4,
      type: 'cancellation',
      title: 'Booking Cancelled',
      message: 'Mundan Ceremony cancelled by Gupta Family',
      time: '5 hours ago',
      read: false,
      critical: true,
      icon: XCircle,
      color: 'red'
    },
    {
      id: 5,
      type: 'kyc',
      title: 'KYC Update Required',
      message: 'Your KYC documents need renewal by Dec 31',
      time: '1 day ago',
      read: true,
      critical: true,
      icon: Shield,
      color: 'orange'
    },
    {
      id: 6,
      type: 'reminder',
      title: 'Puja Reminder',
      message: 'Ganesh Puja at 9:00 AM tomorrow with Patel Ji',
      time: '1 day ago',
      read: true,
      critical: false,
      icon: Bell,
      color: 'purple'
    },
    {
      id: 7,
      type: 'payment',
      title: 'Payment Pending',
      message: '₹2,500 pending for Havan with Singh Ji',
      amount: 2500,
      time: '2 days ago',
      read: true,
      critical: true,
      icon: AlertCircle,
      color: 'orange'
    },
    {
      id: 8,
      type: 'system',
      title: 'System Maintenance',
      message: 'Platform will be offline tonight 2 AM - 4 AM',
      time: '3 days ago',
      read: true,
      critical: false,
      icon: Settings,
      color: 'gray'
    }
  ];

  useEffect(() => {
    setNotifications(initialNotifications);
  }, []);

  const getFilteredNotifications = () => {
    switch (filter) {
      case 'unread':
        return notifications.filter(n => !n.read);
      case 'read':
        return notifications.filter(n => n.read);
      case 'critical':
        return notifications.filter(n => n.critical);
      default:
        return notifications;
    }
  };

  const markAsRead = (id) => {
    setNotifications(prev => prev.map(n =>
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const togglePin = (id) => {
    setNotifications(prev => prev.map(n =>
      n.id === id ? { ...n, critical: !n.critical } : n
    ));
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;
  const criticalCount = notifications.filter(n => n.critical).length;

  const getIconColor = (color) => {
    switch (color) {
      case 'green': return 'text-green-600 bg-green-50';
      case 'blue': return 'text-blue-600 bg-blue-50';
      case 'red': return 'text-red-600 bg-red-50';
      case 'yellow': return 'text-yellow-600 bg-yellow-50';
      case 'orange': return 'text-orange-600 bg-orange-50';
      case 'purple': return 'text-purple-600 bg-purple-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'new_booking': return 'Booking';
      case 'payment': return 'Payment';
      case 'review': return 'Review';
      case 'cancellation': return 'Cancellation';
      case 'kyc': return 'KYC';
      case 'reminder': return 'Reminder';
      default: return 'System';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/*Main Header */}
      <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40  
                px-3 py-1.5 border border-orange-100 mb-4">

        {/* Mobile: Column, Desktop: Row */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">

          {/* Title Section - Original size */}
          <div className="text-left sm:text-left flex items-end gap-2">
            <div>
              <h1 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-orange-900 uppercase
                   leading-tight">
                <div>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Bell className="w-6 h-6 text-orange-500" />
                      {unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                          {unreadCount}
                        </span>
                      )}
                    </div>
                    <h1 className="text-[26px] font-bold text-gray-800">Notifications</h1>
                  </div>
                </div>
              </h1>
              {/* Mobile: Below heading, Desktop: Right side */}
              <p className="sm:hidden text-sm text-gray-600 mt-0.5">
                Never miss important updates
              </p>
            </div>

            {/* Desktop: Right side of heading */}
            <p className="hidden sm:block text-sm text-gray-600 mb-0.5">
              Never miss important updates
            </p>
          </div>

        </div>
      </div>
      <div className="space-y-4 px-6 pb-6 pt-2">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-end items-start sm:items-center gap-3">


          <div className="flex items-center gap-2">
            <button
              onClick={markAllAsRead}
              className="px-3 py-1.5 text-sm bg-white text-gray-800 rounded-lg border border-gray-300 hover:bg-gray-50 flex items-center gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              Mark All Read
            </button>
            <button
              onClick={clearAll}
              className="px-3 py-1.5 text-sm bg-white text-gray-800 rounded-lg border border-gray-300 hover:bg-gray-50 flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Clear All
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <div className="bg-white rounded-lg border border-gray-200 p-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xl font-bold text-gray-800">{notifications.length}</div>
                <div className="text-sm text-gray-600">Total</div>
              </div>
              <Bell className="w-5 h-5 text-gray-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xl font-bold text-red-600">{unreadCount}</div>
                <div className="text-sm text-gray-600">Unread</div>
              </div>
              <EyeOff className="w-5 h-5 text-red-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xl font-bold text-orange-600">{criticalCount}</div>
                <div className="text-sm text-gray-600">Critical</div>
              </div>
              <Pin className="w-5 h-5 text-orange-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xl font-bold text-green-600">
                  {Math.round(((notifications.length - unreadCount) / notifications.length) * 100)}%
                </div>
                <div className="text-sm text-gray-600">Read</div>
              </div>
              <Eye className="w-5 h-5 text-green-500" />
            </div>
          </div>
        </div>

        {/* Settings & Filters */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left Column - Filters & Settings */}
          <div className="space-y-4">
            {/* Filter Card */}
            <div className="bg-white rounded-lg border border-gray-200 p-3">
              <h3 className="text-[15px] font-bold text-gray-800 mb-3">Filter Notifications</h3>

              <div className="space-y-2">
                {[
                  { label: 'All Notifications', value: 'all', count: notifications.length },
                  { label: 'Unread', value: 'unread', count: unreadCount },
                  { label: 'Read', value: 'read', count: notifications.length - unreadCount },
                  { label: 'Critical', value: 'critical', count: criticalCount }
                ].map((item) => (
                  <button
                    key={item.value}
                    onClick={() => setFilter(item.value)}
                    className={`w-full px-3 py-2 text-sm rounded-lg border flex items-center justify-between ${filter === item.value
                        ? 'bg-orange-50 text-orange-600 border-orange-300'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      }`}
                  >
                    <span>{item.label}</span>
                    <span className="px-1.5 py-0.5 bg-gray-100 text-gray-700 text-xs rounded">
                      {item.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* Notification Types Filter */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-700 mb-2">By Type</h4>
                <div className="flex flex-wrap gap-2">
                  {['Booking', 'Payment', 'Review', 'KYC', 'Reminder'].map((type) => (
                    <button
                      key={type}
                      className="px-2.5 py-1 text-xs bg-gray-100 text-gray-700 rounded border border-gray-300 hover:bg-gray-200"
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Settings Toggle */}
            <div className="bg-white rounded-lg border border-gray-200 p-3">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[15px] font-bold text-gray-800">Notification Settings</h3>
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <Settings className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {showSettings && (
                <div className="space-y-3">
                  {/* SMS Toggle */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Smartphone className="w-4 h-4 text-gray-600" />
                      <span className="text-sm text-gray-700">SMS Notifications</span>
                    </div>
                    <button
                      onClick={() => setSmsEnabled(!smsEnabled)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full ${smsEnabled ? 'bg-green-500' : 'bg-gray-300'
                        }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${smsEnabled ? 'translate-x-6' : 'translate-x-1'
                        }`} />
                    </button>
                  </div>

                  {/* WhatsApp Toggle */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <WhatsAppIcon className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-gray-700">WhatsApp Notifications</span>
                      <span className="px-1.5 py-0.5 bg-blue-100 text-blue-700 text-xs rounded">
                        Future
                      </span>
                    </div>
                    <button
                      onClick={() => setWhatsappEnabled(!whatsappEnabled)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full ${whatsappEnabled ? 'bg-green-500' : 'bg-gray-300'
                        }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${whatsappEnabled ? 'translate-x-6' : 'translate-x-1'
                        }`} />
                    </button>
                  </div>

                  {/* Sound Toggle */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {soundEnabled ? (
                        <Volume2 className="w-4 h-4 text-gray-600" />
                      ) : (
                        <VolumeX className="w-4 h-4 text-gray-600" />
                      )}
                      <span className="text-sm text-gray-700">Sound Alerts</span>
                    </div>
                    <button
                      onClick={() => setSoundEnabled(!soundEnabled)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full ${soundEnabled ? 'bg-blue-500' : 'bg-gray-300'
                        }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${soundEnabled ? 'translate-x-6' : 'translate-x-1'
                        }`} />
                    </button>
                  </div>

                  {/* Critical Alerts */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Bell className="w-4 h-4 text-orange-500" />
                      <span className="text-sm text-gray-700">Critical Alerts</span>
                    </div>
                    <div className="text-xs text-green-600">Always On</div>
                  </div>

                  <button className="w-full mt-2 px-3 py-1.5 text-sm bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded hover:from-orange-600 hover:to-orange-700">
                    Save Settings
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Notifications List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="p-3 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <h3 className="text-[15px] font-bold text-gray-800">
                    {filter === 'all' ? 'All Notifications' :
                      filter === 'unread' ? 'Unread Notifications' :
                        filter === 'read' ? 'Read Notifications' : 'Critical Notifications'}
                    <span className="ml-2 text-sm font-normal text-gray-600">
                      ({getFilteredNotifications().length})
                    </span>
                  </h3>

                  <div className="flex items-center gap-2">
                    <button className="px-2.5 py-1.5 text-sm bg-white text-gray-800 rounded border border-gray-300 hover:bg-gray-50 flex items-center gap-2">
                      <RefreshCw className="w-4 h-4" />
                      Refresh
                    </button>
                    <button className="px-2.5 py-1.5 text-sm bg-white text-gray-800 rounded border border-gray-300 hover:bg-gray-50 flex items-center gap-2">
                      <Filter className="w-4 h-4" />
                      Sort
                    </button>
                  </div>
                </div>
              </div>

              <div className="divide-y divide-gray-100">
                {getFilteredNotifications().length > 0 ? (
                  getFilteredNotifications().map((notification) => {
                    const Icon = notification.icon;
                    return (
                      <div
                        key={notification.id}
                        className={`p-3 hover:bg-gray-50 transition-colors ${!notification.read ? 'bg-blue-50/30' : ''
                          }`}
                      >
                        <div className="flex items-start gap-3">
                          {/* Icon */}
                          <div className={`p-2 rounded-lg ${getIconColor(notification.color)}`}>
                            <Icon className="w-5 h-5" />
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-1">
                              <div>
                                <div className="flex items-center gap-2">
                                  <h4 className="text-sm font-bold text-gray-800">
                                    {notification.title}
                                  </h4>
                                  {notification.critical && (
                                    <span className="px-1.5 py-0.5 bg-red-50 text-red-700 text-xs rounded-full flex items-center gap-1">
                                      <Pin className="w-3 h-3" />
                                      Critical
                                    </span>
                                  )}
                                  {!notification.read && (
                                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                  )}
                                </div>
                                <div className="text-xs text-gray-500 mt-1 flex items-center gap-2">
                                  <span className="px-1.5 py-0.5 bg-gray-100 text-gray-700 rounded">
                                    {getTypeLabel(notification.type)}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {notification.time}
                                  </span>
                                </div>
                              </div>

                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() => togglePin(notification.id)}
                                  className="p-1 hover:bg-gray-200 rounded"
                                  title={notification.critical ? 'Unpin' : 'Pin as critical'}
                                >
                                  {notification.critical ? (
                                    <PinOff className="w-4 h-4 text-orange-500" />
                                  ) : (
                                    <Pin className="w-4 h-4 text-gray-500" />
                                  )}
                                </button>
                                <button
                                  onClick={() => deleteNotification(notification.id)}
                                  className="p-1 hover:bg-gray-200 rounded"
                                >
                                  <Trash2 className="w-4 h-4 text-gray-500" />
                                </button>
                              </div>
                            </div>

                            <div className="text-sm text-gray-700 mb-2">
                              {notification.message}
                            </div>

                            {/* Additional Info */}
                            <div className="flex flex-wrap items-center gap-3 text-sm">
                              {notification.customer && (
                                <div className="flex items-center gap-1 text-gray-600">
                                  <User className="w-3 h-3" />
                                  {notification.customer}
                                </div>
                              )}

                              {notification.amount && (
                                <div className="font-medium text-green-700">
                                  {formatCurrency(notification.amount)}
                                </div>
                              )}

                              {notification.rating && (
                                <div className="flex items-center gap-1 text-yellow-600">
                                  <Star className="w-3 h-3 fill-yellow-500" />
                                  {notification.rating}.0
                                </div>
                              )}
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-2 mt-3">
                              {!notification.read && (
                                <button
                                  onClick={() => markAsRead(notification.id)}
                                  className="px-2.5 py-1 text-xs bg-blue-50 text-blue-600 rounded border border-blue-200 hover:bg-blue-100 flex items-center gap-1"
                                >
                                  <CheckCircle className="w-3 h-3" />
                                  Mark as Read
                                </button>
                              )}

                              {notification.type === 'new_booking' && (
                                <button className="px-2.5 py-1 text-xs bg-green-50 text-green-700 rounded border border-green-200 hover:bg-green-100 flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  View Booking
                                </button>
                              )}

                              {notification.type === 'payment' && (
                                <button className="px-2.5 py-1 text-xs bg-purple-50 text-purple-600 rounded border border-purple-200 hover:bg-purple-100 flex items-center gap-1">
                                  <CreditCard className="w-3 h-3" />
                                  View Payment
                                </button>
                              )}

                              <button className="px-2.5 py-1 text-xs bg-gray-50 text-gray-700 rounded border border-gray-300 hover:bg-gray-100 flex items-center gap-1">
                                <MoreVertical className="w-3 h-3" />
                                More
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="p-8 text-center">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <BellOff className="w-6 h-6 text-gray-400" />
                    </div>
                    <h3 className="text-[15px] font-semibold text-gray-800 mb-1">
                      {filter === 'all' ? 'No notifications yet' :
                        filter === 'unread' ? 'No unread notifications' :
                          filter === 'read' ? 'No read notifications' : 'No critical notifications'}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {filter === 'all' ? 'You\'re all caught up!' :
                        'All caught up in this category'}
                    </p>
                    {filter !== 'all' && (
                      <button
                        onClick={() => setFilter('all')}
                        className="px-3 py-1.5 text-sm bg-gray-100 text-gray-800 rounded border border-gray-300 hover:bg-gray-200"
                      >
                        View All Notifications
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Notification Types Legend */}
            <div className="mt-4 bg-white rounded-lg border border-gray-200 p-3">
              <h4 className="text-sm font-medium text-gray-800 mb-3">Notification Types</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded"></div>
                  <span className="text-sm text-gray-700">New Bookings</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded"></div>
                  <span className="text-sm text-gray-700">Payments</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                  <span className="text-sm text-gray-700">Reviews</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded"></div>
                  <span className="text-sm text-gray-700">Cancellations</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-500 rounded"></div>
                  <span className="text-sm text-gray-700">KYC Updates</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-500 rounded"></div>
                  <span className="text-sm text-gray-700">Reminders</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg border border-orange-200 p-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h4 className="text-sm font-medium text-gray-800 mb-1 flex items-center gap-1.5"><Pin className="w-4 h-4 text-orange-600" /> Critical Notifications</h4>
              <p className="text-sm text-gray-600">
                Pinned notifications stay at top. Critical alerts include new bookings, cancellations, and payment issues.
              </p>
            </div>

            <div className="flex gap-2">
              <button className="px-3 py-1.5 text-sm bg-white text-gray-800 rounded-lg border border-gray-300 hover:bg-gray-50 flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Test Alert
              </button>
              <button className="px-3 py-1.5 text-sm bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Alert Settings
              </button>
            </div>
          </div>
        </div>

        {/* Help & Support */}
        <div className="bg-white rounded-lg border border-gray-200 p-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <h4 className="text-sm font-medium text-gray-800 mb-1">Need help with notifications?</h4>
              <p className="text-sm text-gray-600">
                Contact support if you're not receiving important alerts
              </p>
            </div>

            <div className="flex gap-2">
              <button className="px-3 py-1.5 text-sm bg-white text-gray-800 rounded-lg border border-gray-300 hover:bg-gray-50 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Support
              </button>
              <button className="px-3 py-1.5 text-sm bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 flex items-center gap-2">
                <WhatsAppIcon className="w-4 h-4" />
                WhatsApp Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;