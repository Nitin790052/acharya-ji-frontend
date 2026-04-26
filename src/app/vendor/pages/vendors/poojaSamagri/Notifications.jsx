import React, { useState } from 'react';
import { 
  Bell, 
  ShoppingBag, 
  Package, 
  TrendingUp, 
  Star, 
  Clock,
  CheckCircle2,
  AlertCircle,
  DollarSign,
  MessageSquare,
  Users,
  CalendarDays,
  Filter,
  MoreVertical,
  Eye,
  Trash2,
  Settings,
  RefreshCw,
  X,
  ChevronRight
} from 'lucide-react';

import VendorPageHeader from '../../../components/VendorPageHeader';

const NotificationsPuja = () => {
  const [filter, setFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 'NOT-001',
      type: 'new_order',
      title: 'New Order Received',
      description: 'Customer placed order #ORD-7890 for ₹4,250',
      time: '2 minutes ago',
      read: false,
      priority: 'high',
      data: {
        orderId: 'ORD-7890',
        amount: 4250,
        customer: 'Rajesh Kumar',
        items: 3
      }
    },
    {
      id: 'NOT-002',
      type: 'low_stock',
      title: 'Low Stock Alert',
      description: 'Premium Diya Set stock is low (8 items remaining)',
      time: '15 minutes ago',
      read: false,
      priority: 'high',
      data: {
        product: 'Premium Diya Set',
        currentStock: 8,
        minStock: 20,
        productId: 'P001'
      }
    },
    {
      id: 'NOT-003',
      type: 'payout_success',
      title: 'Payout Successful',
      description: '₹15,000 transferred to your bank account',
      time: '1 hour ago',
      read: true,
      priority: 'medium',
      data: {
        amount: 15000,
        reference: 'WDL-0123',
        bank: 'ICICI Bank'
      }
    },
    {
      id: 'NOT-004',
      type: 'new_review',
      title: 'New Product Review',
      description: 'Rajesh Kumar rated Premium Diya Set 5 stars',
      time: '3 hours ago',
      read: true,
      priority: 'medium',
      data: {
        product: 'Premium Diya Set',
        rating: 5,
        customer: 'Rajesh Kumar',
        reviewId: 'REV-001'
      }
    },
    {
      id: 'NOT-005',
      type: 'new_order',
      title: 'New Order Received',
      description: 'Customer placed order #ORD-7891 for ₹1,899',
      time: '5 hours ago',
      read: true,
      priority: 'medium',
      data: {
        orderId: 'ORD-7891',
        amount: 1899,
        customer: 'Priya Sharma',
        items: 2
      }
    },
    {
      id: 'NOT-006',
      type: 'low_stock',
      title: 'Critical Stock Alert',
      description: 'Phone Case (Black) stock is critical (3 items remaining)',
      time: '1 day ago',
      read: true,
      priority: 'critical',
      data: {
        product: 'Phone Case (Black)',
        currentStock: 3,
        minStock: 15,
        productId: 'P008'
      }
    },
    {
      id: 'NOT-007',
      type: 'payout_success',
      title: 'Payout Processed',
      description: '₹12,500 settlement completed',
      time: '2 days ago',
      read: true,
      priority: 'low',
      data: {
        amount: 12500,
        reference: 'SET-0123',
        bank: 'ICICI Bank'
      }
    },
    {
      id: 'NOT-008',
      type: 'new_review',
      title: 'New Product Review',
      description: 'Amit Patel rated Natural Agarbatti 3 stars',
      time: '2 days ago',
      read: true,
      priority: 'low',
      data: {
        product: 'Natural Agarbatti',
        rating: 3,
        customer: 'Amit Patel',
        reviewId: 'REV-002'
      }
    },
  ]);

  // Get notifications icon based on type
  const getNotificationsIcon = (type) => {
    switch(type) {
      case 'new_order':
        return <ShoppingBag className="w-5 h-5 text-green-600" />;
      case 'low_stock':
        return <Package className="w-5 h-5 text-red-500" />;
      case 'payout_success':
        return <TrendingUp className="w-5 h-5 text-blue-600" />;
      case 'new_review':
        return <Star className="w-5 h-5 text-yellow-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  // Get priority styles
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

  // Get notifications type label
  const getTypeLabel = (type) => {
    switch(type) {
      case 'new_order': return 'New Order';
      case 'low_stock': return 'Low Stock';
      case 'payout_success': return 'Payout';
      case 'new_review': return 'Review';
      default: return 'Notifications';
    }
  };

  // Filter notifications
  const filteredNotifications = filter === 'all' 
    ? notifications
    : notifications.filter(notifications => notifications.type === filter);

  const unreadCount = notifications.filter(n => !n.read).length;

  // Handle actions
  const handleAction = (action, notificationsId = null) => {
    setIsLoading(true);
    
    switch(action) {
      case 'markAsRead':
        if (notificationsId) {
          setNotifications(prev => 
            prev.map(notif => 
              notif.id === notificationsId ? { ...notif, read: true } : notif
            )
          );
        }
        break;
        
      case 'markAllAsRead':
        setNotifications(prev => 
          prev.map(notif => ({ ...notif, read: true }))
        );
        break;
        
      case 'deleteNotifications':
        if (notificationsId) {
          setNotifications(prev => 
            prev.filter(notif => notif.id !== notificationsId)
          );
        }
        break;
        
      case 'clearAll':
        if (window.confirm('Are you sure you want to clear all notifications?')) {
          setNotifications([]);
        }
        break;
        
      case 'refresh':
        // Refresh notifications
        console.log('Refreshing notifications');
        break;
        
      case 'viewOrder':
        console.log('Viewing order for notifications:', notificationsId);
        // Navigate to order page
        break;
        
      case 'viewProduct':
        console.log('Viewing product for notifications:', notificationsId);
        // Navigate to product page
        break;
        
      case 'viewReview':
        console.log('Viewing review for notifications:', notificationsId);
        // Navigate to reviews page
        break;
        
      case 'viewPayout':
        console.log('Viewing payout for notifications:', notificationsId);
        // Navigate to wallet page
        break;
        
      case 'openSettings':
        console.log('Opening notifications settings');
        // Open settings modal
        break;
    }
    
    setTimeout(() => setIsLoading(false), 500);
  };

  // Get action for notifications type
  const getNotificationsAction = (notifications) => {
    switch(notifications.type) {
      case 'new_order':
        return () => handleAction('viewOrder', notifications.id);
      case 'low_stock':
        return () => handleAction('viewProduct', notifications.id);
      case 'payout_success':
        return () => handleAction('viewPayout', notifications.id);
      case 'new_review':
        return () => handleAction('viewReview', notifications.id);
      default:
        return () => {};
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/30">
      <VendorPageHeader 
        title="NOTIFICATIONS" 
        subtitle="Stay updated with your business activities" 
      />

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm text-gray-700">Processing...</p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="space-y-4 p-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg px-3 py-2 border border-orange-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <p className="text-[18px] text-gray-600 ">
                {unreadCount > 0 
                  ? `You have ${unreadCount} unread notifications${unreadCount > 1 ? 's' : ''}`
                  : 'All notifications read'
                }
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm text-gray-600">Today</p>
                <p className="text-[15px] font-semibold text-orange-500">
                  {notifications.filter(n => n.time.includes('minutes') || n.time.includes('hour')).length} new
                </p>
              </div>
              <div className="w-8 h-8 bg-orange-50 rounded flex items-center justify-center">
                <Clock className="w-5 h-5 text-orange-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {/* New Orders */}
          <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg border border-gray-200 px-3 py-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">New Orders</p>
                <p className="text-xl font-semibold text-gray-800 mt-1">
                  {notifications.filter(n => n.type === 'new_order').length}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <ShoppingBag className="w-3 h-3 text-green-700" />
                  <span className="text-sm text-green-700">+2 today</span>
                </div>
              </div>
              <div className="p-2 bg-green-50 rounded">
                <ShoppingBag className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </div>

          {/* Low Stock */}
          <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg border border-gray-200 px-3 py-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Low Stock</p>
                <p className="text-xl font-semibold text-gray-800 mt-1">
                  {notifications.filter(n => n.type === 'low_stock').length}
                </p>
                <p className="text-xs text-orange-500 mt-2">Requires attention</p>
              </div>
              <div className="p-2 bg-red-50 rounded">
                <Package className="w-5 h-5 text-red-500" />
              </div>
            </div>
          </div>

          {/* Payouts */}
          <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg border border-gray-200 px-3 py-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Payouts</p>
                <p className="text-xl font-semibold text-gray-800 mt-1">
                  {notifications.filter(n => n.type === 'payout_success').length}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <DollarSign className="w-3 h-3 text-blue-600" />
                  <span className="text-sm text-blue-600">₹27,500</span>
                </div>
              </div>
              <div className="p-2 bg-blue-50 rounded">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Reviews */}
          <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg border border-gray-200 px-3 py-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">New Reviews</p>
                <p className="text-xl font-semibold text-gray-800 mt-1">
                  {notifications.filter(n => n.type === 'new_review').length}
                </p>
                <p className="text-sm text-gray-500 mt-2">Avg. 4.5 stars</p>
              </div>
              <div className="p-2 bg-yellow-50 rounded">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
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
                All ({notifications.length})
              </button>
              <button
                onClick={() => setFilter('new_order')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2 ${
                  filter === 'new_order' 
                    ? 'bg-green-50 text-green-700 border border-green-300' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                Orders ({notifications.filter(n => n.type === 'new_order').length})
              </button>
              <button
                onClick={() => setFilter('low_stock')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2 ${
                  filter === 'low_stock' 
                    ? 'bg-red-50 text-red-700 border border-red-300' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Package className="w-4 h-4" />
                Stock ({notifications.filter(n => n.type === 'low_stock').length})
              </button>
              <button
                onClick={() => setFilter('payout_success')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2 ${
                  filter === 'payout_success' 
                    ? 'bg-blue-50 text-blue-600 border border-blue-300' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <DollarSign className="w-4 h-4" />
                Payouts ({notifications.filter(n => n.type === 'payout_success').length})
              </button>
              <button
                onClick={() => setFilter('new_review')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2 ${
                  filter === 'new_review' 
                    ? 'bg-yellow-50 text-yellow-600 border border-yellow-300' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Star className="w-4 h-4" />
                Reviews ({notifications.filter(n => n.type === 'new_review').length})
              </button>
            </div>
            
            <div className="flex gap-2">
              <button 
                onClick={() => handleAction('markAllAsRead')}
                className="px-3 py-1.5 text-sm bg-gray-100 text-gray-800 rounded border border-gray-300 hover:bg-gray-200 flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                Mark All Read
              </button>
              <button 
                onClick={() => handleAction('clearAll')}
                className="px-3 py-1.5 text-sm bg-red-50 text-red-700 rounded border border-red-300 hover:bg-red-100 flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Clear All
              </button>
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left Column - Notifications List */}
          <div className="lg:col-span-2 space-y-4">
            {/* Notifications List */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-[15px] font-bold text-gray-800">All Notifications</h3>
                  <span className="text-sm text-gray-600">{filteredNotifications.length} items</span>
                </div>
              </div>

              <div className="divide-y divide-gray-200">
                {filteredNotifications.map((notifications) => (
                  <div 
                    key={notifications.id}
                    className={`p-4 transition-colors ${!notifications.read ? 'bg-orange-50/30' : 'hover:bg-gray-50'}`}
                    onClick={getNotificationsAction(notifications)}
                  >
                    <div className="flex gap-3">
                      {/* Notifications Icon */}
                      <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
                        !notifications.read ? 'bg-white border border-orange-200' : 'bg-gray-100'
                      }`}>
                        {getNotificationsIcon(notifications.type)}
                      </div>

                      {/* Notifications Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <h4 className={`text-[14px] font-semibold ${
                              !notifications.read ? 'text-gray-800' : 'text-gray-600'
                            }`}>
                              {notifications.title}
                            </h4>
                            <span className={getPriorityStyles(notifications.priority)}>
                              {notifications.priority}
                            </span>
                            {!notifications.read && (
                              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                            )}
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-xs text-gray-500">{notifications.time}</span>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAction('deleteNotifications', notifications.id);
                              }}
                              className="p-1 hover:bg-gray-100 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="w-4 h-4 text-gray-400" />
                            </button>
                          </div>
                        </div>

                        <p className="text-sm text-gray-700 mb-2">
                          {notifications.description}
                        </p>

                        {/* Notifications Data */}
                        <div className="flex flex-wrap gap-2 mb-3">
                          {notifications.type === 'new_order' && (
                            <>
                              <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded flex items-center gap-1">
                                <ShoppingBag className="w-3 h-3" />
                                {notifications.data.items} items
                              </span>
                              <span className="px-2 py-0.5 bg-green-50 text-green-700 text-xs rounded flex items-center gap-1">
                                <DollarSign className="w-3 h-3" />
                                ₹{notifications.data.amount}
                              </span>
                            </>
                          )}
                          
                          {notifications.type === 'low_stock' && (
                            <>
                              <span className="px-2 py-0.5 bg-red-50 text-red-700 text-xs rounded">
                                Stock: {notifications.data.currentStock}/{notifications.data.minStock}
                              </span>
                              <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                                ID: {notifications.data.productId}
                              </span>
                            </>
                          )}
                          
                          {notifications.type === 'payout_success' && (
                            <>
                              <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs rounded flex items-center gap-1">
                                <TrendingUp className="w-3 h-3" />
                                ₹{notifications.data.amount}
                              </span>
                              <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                                {notifications.data.bank}
                              </span>
                            </>
                          )}
                          
                          {notifications.type === 'new_review' && (
                            <>
                              <span className="px-2 py-0.5 bg-yellow-50 text-yellow-600 text-xs rounded flex items-center gap-1">
                                <Star className="w-3 h-3 fill-yellow-500" />
                                {notifications.data.rating} stars
                              </span>
                              <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                                Verified
                              </span>
                            </>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100">
                          {!notifications.read && (
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAction('markAsRead', notifications.id);
                              }}
                              className="px-2.5 py-1 text-xs bg-gray-100 text-gray-800 rounded border border-gray-300 hover:bg-gray-200"
                            >
                              Mark as Read
                            </button>
                          )}
                          
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAction('deleteNotifications', notifications.id);
                            }}
                            className="px-2.5 py-1 text-xs bg-white text-red-600 rounded border border-red-300 hover:bg-red-50"
                          >
                            Delete
                          </button>
                          
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              getNotificationsAction(notifications)();
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

                {filteredNotifications.length === 0 && (
                  <div className="p-8 text-center">
                    <div className="p-4 rounded-full inline-flex items-center justify-center mb-4 bg-gray-100">
                      <Bell className="w-12 h-12 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium mb-2 text-gray-800">
                      No notifications
                    </h3>
                    <p className="text-sm text-gray-600">
                      {filter === 'all' 
                        ? 'You\'re all caught up!' 
                        : `No ${getTypeLabel(filter).toLowerCase()} notifications`
                      }
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Notifications Settings & Stats */}
          <div className="space-y-4">
            {/* Notifications Settings */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[15px] font-bold text-gray-800">Notifications Settings</h3>
                <button 
                  onClick={() => handleAction('openSettings')}
                  className="text-sm font-medium text-orange-500 hover:text-orange-600 flex items-center gap-1"
                >
                  <Settings className="w-4 h-4" />
                  Manage
                </button>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-gray-700">New Orders</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-red-500" />
                    <span className="text-sm text-gray-700">Low Stock</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-gray-700">Payouts</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm text-gray-700">Reviews</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-500"></div>
                  </label>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Push Notifications</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                  </label>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Receive notifications on your device
                </p>
              </div>
            </div>

            {/* Notifications Stats */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="text-[15px] font-bold text-gray-800 mb-4">Notifications Stats</h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Today</span>
                  <span className="text-sm font-medium text-gray-800">
                    {notifications.filter(n => n.time.includes('minutes') || n.time.includes('hour')).length}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">This Week</span>
                  <span className="text-sm font-medium text-gray-800">
                    {notifications.filter(n => n.time.includes('day') || n.time.includes('hour') || n.time.includes('minutes')).length}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Unread</span>
                  <span className="text-sm font-medium text-gray-800">{unreadCount}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total</span>
                  <span className="text-sm font-medium text-gray-800">{notifications.length}</span>
                </div>
              </div>
            </div>

            {/* Quick Tip Card */}
            <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg p-3 border border-orange-200">
              <div className="flex items-start gap-2">
                <div className="p-1.5 bg-orange-50 rounded">
                  <Bell className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-800 mb-1">Best Practice</h4>
                  <p className="text-xs text-gray-700">
                    Check notifications regularly and respond promptly to customer orders and reviews.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-2">
              <button 
                onClick={() => handleAction('markAllAsRead')}
                className="w-full px-3 py-2 bg-white text-gray-800 text-sm font-medium rounded border border-gray-300 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                Mark All as Read
              </button>
              
              <button 
                onClick={() => handleAction('openSettings')}
                className="w-full px-3 py-2 bg-orange-50 text-orange-500 text-sm font-medium rounded border border-orange-300 hover:bg-orange-100 transition-colors flex items-center justify-center gap-2"
              >
                <Settings className="w-4 h-4" />
                Notifications Settings
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section - Additional Info */}
        <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg border border-gray-200 p-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-center sm:text-left">
              <p className="text-sm text-gray-600">Notifications preferences not updating?</p>
              <p className="text-[14px] text-gray-800">Contact support: +91 98765 43210</p>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => handleAction('refresh')}
                className="px-3 py-1.5 text-sm bg-gray-100 text-gray-800 rounded border border-gray-300 hover:bg-gray-200"
              >
                Refresh Notifications
              </button>
              <button 
                onClick={() => handleAction('openSettings')}
                className="px-3 py-1.5 text-sm bg-gradient-to-r from-orange-300 to-orange-300 text-gray-800 hover:text-white rounded hover:from-orange-500 hover:to-orange-600"
              >
                Manage Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPuja;
