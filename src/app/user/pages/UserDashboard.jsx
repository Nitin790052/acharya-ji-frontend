import React, { useState, useEffect } from 'react';
import { 
  Calendar,
  Star,
  Sparkles,
  ShoppingBag,
  Wallet,
  Clock,
  ChevronRight,
  Download,
  MessageCircle,
  Bell,
  Users,
  TrendingUp,
  Gift,
  MapPin,
  Phone,
  Video,
  CheckCircle,
  AlertCircle,
  XCircle,
  Home,
  X,
  Loader,
  CreditCard,
  Globe,
  Smartphone,
  IndianRupee,
  User,
  LogIn,
  Award,
  CreditCard as PaymentIcon,
  History,
  Settings,
  Hand
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { useGetUserDashboardQuery } from '../../../services/userApi';
import { getTranslation } from '../../../utils/translations';

const DashboardMain = () => {
  // ========== STATE MANAGEMENT ==========
  const [selectedTime, setSelectedTime] = useState('week');
  
  // Modal States
  const [showAddMoneyModal, setShowAddMoneyModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  
  // Add Money States
  const [addMoneyAmount, setAddMoneyAmount] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('razorpay');
  const [isProcessing, setIsProcessing] = useState(false);

  // ========== DATA FETCHING ==========
  const { data: dashboardData, isLoading, isError, error } = useGetUserDashboardQuery();

  // Format Last Login
  const formatLastLogin = (lastLogin) => {
    if (!lastLogin || lastLogin === 'Just now') return 'Just now';
    
    // If it's the new object format from backend
    if (typeof lastLogin === 'object' && lastLogin.timestamp) {
      const { device, location, timestamp } = lastLogin;
      const date = new Date(timestamp);
      const timeStr = date.toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
      return `${device || 'Unknown'} from ${location || 'Unknown'} at ${timeStr}`;
    }

    try {
      const date = new Date(lastLogin);
      return isNaN(date.getTime()) ? lastLogin : date.toLocaleString('en-GB');
    } catch (e) {
      return lastLogin;
    }
  };

  // Mock User Data (Fallback)
  const userData = dashboardData?.data?.user ? {
    ...dashboardData.data.user,
    lastLogin: formatLastLogin(dashboardData.data.user.lastLogin)
  } : {
    name: 'Loading...',
    email: '...',
    memberSince: '2023',
    membershipType: 'Gold Member',
    walletBalance: '0',
    lastLogin: 'Today, 9:30 AM'
  };

  // ========== A) WELCOME SECTION DATA ==========
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  // ========== B) SUMMARY CARDS (Important Metrics) ==========
  const getIcon = (type) => {
    switch (type) {
      case 'order': return <ShoppingBag className="text-amber-600" size={20} />;
      case 'payment': return <PaymentIcon className="text-amber-600" size={20} />;
      case 'history': return <History className="text-amber-600" size={20} />;
      case 'wallet': return <Wallet className="text-amber-600" size={20} />;
      case 'membership': return <Award className="text-amber-600" size={20} />;
      default: return <Sparkles className="text-amber-600" size={20} />;
    }
  };

  const summaryCards = dashboardData?.data?.summary.map(s => ({
    ...s,
    icon: getIcon(s.type),
    bgColor: 'bg-amber-50',
    growthColor: s.growth.startsWith('+') ? 'text-green-600' : 'text-orange-600'
  })) || [];

  // ========== C) RECENT ACTIVITY SECTION ==========

  // Last 5 Orders
  const recentOrders = dashboardData?.data?.recentOrders || [];

  // Latest Payment Status
  const latestPayment = dashboardData?.data?.latestPayment || {
    status: 'success',
    amount: '₹0',
    method: 'N/A',
    date: '...',
    time: '...'
  };

  // Notifications
  const notifications = dashboardData?.data?.notifications || [];

  // ========== D) QUICK ACTIONS ==========
  const quickActions = [
    { id: 1, icon: <PaymentIcon className="w-4 h-4" />, label: 'Make Payment', action: 'payment', color: 'from-amber-600 to-yellow-600', path:"/user/dashboard/payments-user" },
    { id: 2, icon: <User className="w-4 h-4" />, label: 'Update Profile', action: 'profile', color: 'from-amber-600 to-yellow-600', path:"/user/dashboard/profile-user"},
    { id: 3, icon: <ShoppingBag className="w-4 h-4" />, label: 'View All Orders', action: 'orders', color: 'from-amber-600 to-yellow-600', path:"/user/dashboard/order-user" },
    { id: 4, icon: <Download className="w-4 h-4" />, label: 'Download Invoice', action: 'invoice', color: 'from-amber-600 to-yellow-600', }
  ];

  // Payment methods for modal
  const paymentMethods = [
    { id: 'razorpay', name: 'Razorpay', icon: <CreditCard className="w-4 h-4" /> },
    { id: 'upi', name: 'UPI', icon: <Smartphone className="w-4 h-4" /> },
    { id: 'card', name: 'Credit/Debit Card', icon: <CreditCard className="w-4 h-4" /> },
    { id: 'netbanking', name: 'Net Banking', icon: <Globe className="w-4 h-4" /> }
  ];

  // Quick amounts
  const quickAmounts = [500, 1000, 2000, 5000];

  // ========== STATUS STYLING FUNCTIONS ==========
  const getStatusStyle = (status) => {
    const base = "px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1 w-fit";
    switch(status) {
      case 'confirmed':
      case 'completed':
      case 'success':
        return `${base} bg-green-100 text-green-700`;
      case 'pending':
        return `${base} bg-amber-50 text-amber-600`;
      case 'cancelled':
        return `${base} bg-red-50 text-red-600`;
      default:
        return `${base} bg-gray-100 text-gray-600`;
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'confirmed':
      case 'completed':
      case 'success':
        return <CheckCircle className="w-3 h-3" />;
      case 'pending':
        return <Clock className="w-3 h-3" />;
      case 'cancelled':
        return <XCircle className="w-3 h-3" />;
      default:
        return <AlertCircle className="w-3 h-3" />;
    }
  };

  const getNotificationIcon = (type) => {
    switch(type) {
      case 'reminder':
        return <Calendar className="w-3 h-3 text-blue-600" />;
      case 'payment':
        return <PaymentIcon className="w-3 h-3 text-green-600" />;
      case 'offer':
        return <Gift className="w-3 h-3 text-purple-600" />;
      case 'alert':
        return <AlertCircle className="w-3 h-3 text-orange-600" />;
      default:
        return <Bell className="w-3 h-3 text-gray-600" />;
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

  // navigation logic 
  const navigate = useNavigate();

  // ========== HANDLER FUNCTIONS ==========
  const handleQuickAction = (action) => {
    switch(action) {
      case 'payment':
        setShowPaymentModal(true);
        break;
      case 'profile':
        toast.info('Redirecting to profile...');
        navigate("/user/dashboard/profile-user");
        break;
      case 'orders':
        toast.info('Redirecting to orders...');
        navigate("/user/dashboard/order-user");
        break;
      case 'invoice':
        toast.info('Downloading latest invoice...');
        break;
      default:
        toast.info(`${action} feature coming soon!`);
    }
  };

  const handleAddMoney = () => {
    if (!addMoneyAmount || parseInt(addMoneyAmount) < 1) {
      toast.info('Please enter a valid amount');
      return;
    }

    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      setShowAddMoneyModal(false);
      setAddMoneyAmount('');
      toast.success(`✅ ₹${addMoneyAmount} added successfully to your wallet!`)
    }, 2000);
  };

  const handleQuickAmount = (amount) => {
    setAddMoneyAmount(amount.toString());
  };

  const handleMakePayment = () => {
    if (!addMoneyAmount || parseInt(addMoneyAmount) < 1) {
      toast.info('Please enter payment amount');
      return;
    }

    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      setShowPaymentModal(false);
      setAddMoneyAmount('');
      toast.success(`✅ Payment of ₹${addMoneyAmount} completed successfully!`)
    }, 2000);
  };

  // Loading Spinner
  const LoadingSpinner = () => (
    <div className="animate-spin">
      <Loader className="w-4 h-4" />
    </div>
  );

  // ========== EFFECTS ==========
  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message || "Failed to load dashboard data");
    }
  }, [isError, error]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <Loader className="w-10 h-10 text-amber-500 animate-spin mb-4" />
        <p className="text-gray-600 font-medium">Loading your spiritual dashboard...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 text-center">
        <XCircle className="w-12 h-12 text-red-500 mb-4" />
        <h2 className="text-xl font-bold text-gray-800">Connection Error</h2>
        <p className="text-gray-600 mt-2 max-w-sm">{error?.data?.message || "Could not connect to the server."}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-6 px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  const selectedLanguage = dashboardData?.data?.user?.language || 'English (India)';
  const t = (key) => getTranslation(selectedLanguage, key);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ========== HEADER - Same as UserDashboard ========== */}
      <div className="bg-gradient-to-r from-amber-100/50 via-amber-200/30 to-amber-300/40 px-3 py-1.5 border border-amber-200 mb-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <div className="text-left sm:text-left flex items-end gap-2">
            <div>
              <h1 className="text-lg sm:text-xl md:text-2xl lg:text-[25px] font-semibold text-amber-900 uppercase leading-tight flex items-center gap-2">
                <Home className="w-[23px] h-[23px] text-amber-600" />
                {t('dashboard')}
              </h1>
              <p className="sm:hidden text-sm text-gray-600 mt-0.5">
                Welcome back, {userData.name}
              </p>
            </div>
            <p className="hidden sm:block text-sm text-gray-600 mb-0.5">
              Welcome back, {userData.name} • {userData.membershipType}
            </p>
          </div>

          {/* Time Filter Tabs */}
          <div className="flex gap-1 border border-gray-200 rounded-lg p-1 bg-white w-fit sm:w-fit md:w-auto lg:w-auto">
            {['day', 'week', 'month'].map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`
                  px-3 py-1 text-xs font-medium rounded-md transition-all capitalize cursor-pointer
                  ${selectedTime === time 
                    ? 'bg-amber-500 text-white' 
                    : 'text-gray-600 hover:bg-gray-100'
                  }
                `}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ========== MAIN CONTENT ========== */}
      <div className="space-y-4 px-6 pb-6 pt-2">

        {/* ========== A) WELCOME SECTION ========== */}
       <div className="bg-gradient-to-br from-amber-100 to-yellow-200 rounded-lg p-3 sm:p-4 text-amber-900">
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">
    
    {/* Left Section - User Info */}
    <div className="flex items-center gap-2 sm:gap-3">
      {/* Icon - slightly smaller on mobile */}
      <div className="p-1.5 sm:p-2 bg-white/50 rounded-lg shrink-0">
        <User className="w-4 h-4 sm:w-5 sm:h-5 text-amber-700" />
      </div>
      
      {/* Welcome Text */}
      <div className="flex-1 min-w-0"> {/* min-w-0 for truncation */}
        <h2 className="text-sm sm:text-base lg:text-lg font-bold text-amber-900 flex items-center gap-0.5 flex-wrap">
          <span className="truncate">{t('welcome_back')}, {userData.name}!</span>
          <Hand className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
        </h2>
        <p className="text-[10px] sm:text-xs text-amber-800 mt-0.5 truncate">
          {formattedDate}
        </p>
      </div>
    </div>

    {/* Motivational Line - Hidden on very small screens, visible on mobile+ */}
    <div className="bg-white/40 backdrop-blur-sm rounded-lg px-2 sm:px-3 py-1 sm:py-1.5 self-start sm:self-auto w-full sm:w-auto">
      <p className="text-[10px] sm:text-xs text-amber-800 text-center sm:text-left">
        "Your spiritual journey continues..."
      </p>
    </div>
  </div>
  
  {/* Last Login Info */}
  <div className="mt-2 sm:mt-3 flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-amber-800">
    <LogIn className="w-2.5 h-2.5 sm:w-3 sm:h-3 shrink-0" />
    <span className="truncate">{t('last_login')}: {userData.lastLogin}</span>
  </div>
</div>

        {/* ========== B) SUMMARY CARDS (5 Cards) ========== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {summaryCards.map((card, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg border border-gray-200 hover:border-amber-300 transition-colors p-3 cursor-pointer"
              onClick={() => {
                if (card.label === "Wallet Balance") {
                  setShowAddMoneyModal(true);
                } else {
                  toast.info(`${card.label} details`);
                }
              }}
            >
              <div className="flex items-start justify-between">
                <div className={`${card.bgColor} p-2 rounded-lg`}>
                  {card.icon}
                </div>
                <span className={`text-xs font-medium ${card.growthColor}`}>
                  {card.growth}
                </span>
              </div>
              <div className="mt-2">
                <p className="text-xl font-bold text-gray-800">{card.value}</p>
                <p className="text-xs text-gray-600">{t(card.type)}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ========== C) RECENT ACTIVITY SECTION ========== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          {/* Left Column - Recent Orders (Last 5) */}
         <div className="lg:col-span-2 space-y-3">
  <div className="bg-white rounded-lg border border-gray-200 hover:border-amber-300 transition-colors">
    <div className="p-2 sm:p-3 border-b border-gray-200">
      <div className="flex items-center justify-between">
        <h3 className="text-sm sm:text-[15px] font-bold text-gray-800 flex items-center gap-1 sm:gap-2">
          <ShoppingBag className="w-3 h-3 sm:w-4 sm:h-4 text-amber-600" />
          <span>{t('recent_orders')}</span>
          <span className="text-[10px] sm:text-xs font-normal text-gray-500 ml-1">(Last 5)</span>
        </h3>
        <Link to="/user/orders" className="text-xs sm:text-sm text-amber-600 hover:text-amber-700 flex items-center gap-0.5 sm:gap-1">
          <span>{t('view_all')}</span>
          <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
        </Link>
      </div>
    </div>

    <div className="divide-y divide-gray-200">
      {recentOrders.map((order) => (
        <div key={order.id} className="p-2 sm:p-3 hover:bg-amber-50/30 transition-colors">
          <div className="flex items-center justify-between gap-2">
            {/* Left side - Order info */}
            <div className="flex-1 min-w-0"> {/* min-w-0 enables truncation */}
              <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
                <h4 className="text-xs sm:text-sm font-semibold text-gray-800 truncate max-w-[120px] sm:max-w-[200px]">
                  {order.service}
                </h4>
                <span className="text-[10px] sm:text-xs text-gray-500 shrink-0">{order.id}</span>
              </div>
              <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">{order.date}</p>
            </div>
            
            {/* Right side - Amount & Status */}
            <div className="flex items-center gap-1 sm:gap-2 shrink-0">
              <span className="text-xs sm:text-sm font-medium text-gray-800 whitespace-nowrap">
                {order.amount}
              </span>
              <div className={getStatusStyle(order.status)}>
                {getStatusIcon(order.status)}
                {/* Hide text on mobile, show only icon */}
                <span className="hidden sm:inline capitalize text-xs ml-0.5">{order.status}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

          {/* Right Column - Latest Payment & Notifications */}
          <div className="space-y-3">
            {/* Latest Payment Status */}
            <div className="bg-white rounded-lg border border-gray-200 hover:border-amber-300 transition-colors p-3">
              <h3 className="text-[15px] font-bold text-gray-800 mb-2 flex items-center gap-2">
                <PaymentIcon className="w-4 h-4 text-amber-600" />
                Latest Payment
              </h3>
              <div className="bg-green-50 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-green-600">Status</span>
                  <span className={getStatusStyle(latestPayment.status)}>
                    {getStatusIcon(latestPayment.status)}
                    <span className="capitalize">Success</span>
                  </span>
                </div>
                <p className="text-lg font-bold text-gray-800">{latestPayment.amount}</p>
                <p className="text-xs text-gray-600 mt-1">{latestPayment.method}</p>
                <p className="text-xs text-gray-500 mt-1">{latestPayment.date} • {latestPayment.time}</p>
                <button 
                  className="mt-2 w-full text-xs text-amber-600 hover:text-amber-700 font-medium flex items-center justify-center gap-1"
                  onClick={() => toast.info('Downloading receipt...')}
                >
                  <Download className="w-3 h-3" />
                  Download Receipt
                </button>
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-white rounded-lg border border-gray-200 hover:border-amber-300 transition-colors p-3">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-[15px] font-bold text-gray-800 flex items-center gap-2">
                  <Bell className="w-4 h-4 text-amber-600" />
                  Notifications
                </h3>
                <button 
                  className="text-xs text-amber-600 hover:text-amber-700"
                  onClick={() => setShowNotifications(true)}
                >
                  View All
                </button>
              </div>

              <div className="space-y-2 max-h-48 overflow-y-auto">
                {notifications.slice(0, 3).map((notif) => (
                  <div key={notif.id} className={`p-2 rounded-lg ${notif.unread ? 'bg-amber-50/50' : 'hover:bg-gray-50'} transition-colors cursor-pointer`}>
                    <div className="flex items-start gap-2">
                      <div className="p-1 bg-gray-100 rounded-lg mt-0.5">
                        {getNotificationIcon(notif.type)}
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-800">{notif.message}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{notif.time}</p>
                      </div>
                      {notif.unread && (
                        <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-1.5"></span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ========== D) QUICK ACTIONS ========== */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {quickActions.map((action) => (
            <button
              key={action.id}
              onClick={() => handleQuickAction(action.action)}
              className="bg-gradient-to-br from-amber-100 to-yellow-100 rounded-lg p-3 hover:from-amber-200 hover:to-yellow-200 transition-colors text-center cursor-pointer group"
            >
              <div className="p-2 bg-white rounded-lg w-fit mx-auto mb-2 group-hover:scale-110 transition-transform">
                <div className="text-amber-600">
                  {action.icon}
                </div>
              </div>
              <span className="text-xs font-medium text-gray-700">{action.label}</span>
            </button>
          ))}
        </div>

        {/* ========== QUICK STATS SUMMARY ========== */}
        <div className="bg-gradient-to-r from-amber-100/50 via-amber-200/30 to-amber-300/40 rounded-lg border border-amber-200 p-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-amber-600" />
              <div>
                <h4 className="text-xs font-semibold text-gray-800">This {selectedTime}'s Summary</h4>
                <p className="text-xs text-gray-600">
                  Total Spent: ₹7,299 • Orders: 5 • Pending: ₹1,200
                </p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button 
                className="px-3 py-1.5 text-xs bg-white text-gray-800 rounded-lg border border-gray-300 hover:bg-gray-50 flex items-center gap-1 cursor-pointer transition-colors"
                onClick={() => toast.info('Downloading statement...')}
              >
                <Download className="w-3 h-3" />
                Statement
              </button>
              <button 
                className="px-3 py-1.5 text-xs bg-white text-gray-800 rounded-lg border border-gray-300 hover:bg-gray-50 flex items-center gap-1 cursor-pointer transition-colors"
                onClick={() => toast.info('Contacting support...')}
              >
                <MessageCircle className="w-3 h-3" />
                Support
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ========== ADD MONEY MODAL ========== */}
      {showAddMoneyModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl max-w-md w-full p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-800">Add Money to Wallet</h3>
              <button
                onClick={() => setShowAddMoneyModal(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-amber-50 p-3 rounded-lg mb-4">
              <p className="text-xs text-amber-600">Current Balance</p>
              <p className="text-2xl font-bold text-amber-700">₹{userData.walletBalance}</p>
            </div>

            <div className="mb-4">
              <label className="block text-xs text-gray-600 mb-1">Enter Amount</label>
              <input
                type="number"
                value={addMoneyAmount}
                onChange={(e) => setAddMoneyAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-amber-300"
                min="1"
              />
            </div>

            <div className="flex gap-2 mb-4">
              {quickAmounts.map((amount) => (
                <button
                  key={amount}
                  onClick={() => handleQuickAmount(amount)}
                  className="flex-1 px-2 py-1.5 bg-amber-50 text-amber-600 rounded hover:bg-amber-100 text-xs"
                >
                  ₹{amount}
                </button>
              ))}
            </div>

            <div className="mb-4">
              <label className="block text-xs text-gray-600 mb-2">Select Payment Method</label>
              <div className="grid grid-cols-2 gap-2">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedPaymentMethod(method.id)}
                    className={`p-2 border rounded-lg flex items-center justify-center gap-2 text-xs ${
                      selectedPaymentMethod === method.id
                        ? 'border-amber-300 bg-amber-50 text-amber-700'
                        : 'border-gray-200 hover:border-amber-300'
                    }`}
                  >
                    {method.icon}
                    {method.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleAddMoney}
                disabled={isProcessing || !addMoneyAmount}
                className="flex-1 bg-amber-500 text-white py-2 rounded-lg hover:bg-amber-600 disabled:bg-amber-300 flex items-center justify-center gap-2"
              >
                {isProcessing ? <LoadingSpinner /> : 'Add Money'}
              </button>
              <button
                onClick={() => setShowAddMoneyModal(false)}
                className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========== PAYMENT MODAL ========== */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl max-w-md w-full p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-800">Make Payment</h3>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-amber-50 p-3 rounded-lg mb-4">
              <p className="text-xs text-amber-600">Pending Amount</p>
              <p className="text-2xl font-bold text-amber-700">₹1,200</p>
            </div>

            <div className="mb-4">
              <label className="block text-xs text-gray-600 mb-1">Enter Amount</label>
              <input
                type="number"
                value={addMoneyAmount}
                onChange={(e) => setAddMoneyAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-amber-300"
                min="1"
              />
            </div>

            <div className="flex gap-2 mb-4">
              {[500, 1000, 1200, 2000].map((amount) => (
                <button
                  key={amount}
                  onClick={() => setAddMoneyAmount(amount.toString())}
                  className="flex-1 px-2 py-1.5 bg-amber-50 text-amber-600 rounded hover:bg-amber-100 text-xs"
                >
                  ₹{amount}
                </button>
              ))}
            </div>

            <div className="mb-4">
              <label className="block text-xs text-gray-600 mb-2">Select Payment Method</label>
              <div className="grid grid-cols-2 gap-2">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedPaymentMethod(method.id)}
                    className={`p-2 border rounded-lg flex items-center justify-center gap-2 text-xs ${
                      selectedPaymentMethod === method.id
                        ? 'border-amber-300 bg-amber-50 text-amber-700'
                        : 'border-gray-200 hover:border-amber-300'
                    }`}
                  >
                    {method.icon}
                    {method.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleMakePayment}
                disabled={isProcessing || !addMoneyAmount}
                className="flex-1 bg-amber-500 text-white py-2 rounded-lg hover:bg-amber-600 disabled:bg-amber-300 flex items-center justify-center gap-2"
              >
                {isProcessing ? <LoadingSpinner /> : 'Pay Now'}
              </button>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardMain;