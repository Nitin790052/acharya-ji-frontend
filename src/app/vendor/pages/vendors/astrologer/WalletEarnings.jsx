import { useState } from 'react';
import { 
  DollarSign, TrendingUp, TrendingDown, 
  Download, Wallet, CreditCard, Landmark,  // Changed Bank to Landmark
  Calendar, Clock, Filter, Search,
  MoreVertical, RefreshCw, ArrowUpRight,
  ArrowDownRight, CheckCircle, AlertCircle,
  XCircle, PieChart, BarChart, LineChart,
  Share2, Printer, Eye, ChevronDown,
  ChevronUp, X, Plus, Minus,
  Receipt, Shield, Zap, Gift,
  Users, Home, Globe, Building,
  Smartphone, Mail, QrCode, History
} from 'lucide-react';

const WalletEarnings = () => {
  const [timeFilter, setTimeFilter] = useState('month'); // day, week, month, year
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showTransactionDetails, setShowTransactionDetails] = useState(null);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [selectedChart, setSelectedChart] = useState('income'); // income, sessions, avg
  const [showFilters, setShowFilters] = useState(false);

  // Earnings data
  const earningsData = {
    total: 285500,
    available: 128750,
    pending: 56750,
    withdrawn: 100000,
    thisMonth: 78500,
    lastMonth: 65200,
    change: '+20%'
  };

  // Income trends
  const incomeTrend = [
    { month: 'Jan', income: 65000, sessions: 45 },
    { month: 'Feb', income: 72000, sessions: 52 },
    { month: 'Mar', income: 81000, sessions: 58 },
    { month: 'Apr', income: 78500, sessions: 54 },
    { month: 'May', income: 92000, sessions: 63 },
    { month: 'Jun', income: 88000, sessions: 60 }
  ];

  // Transaction history
  const transactions = [
    { 
      id: 1, 
      client: 'Rajesh Kumar', 
      type: 'earning', 
      amount: 2500, 
      date: '2024-01-15', 
      time: '10:30 AM',
      service: 'Ganpati Puja',
      method: 'online',
      status: 'completed',
      reference: 'TX-789456'
    },
    { 
      id: 2, 
      client: 'Priya Sharma', 
      type: 'earning', 
      amount: 1800, 
      date: '2024-01-14', 
      time: '02:15 PM',
      service: 'Satyanarayan Katha',
      method: 'UPI',
      status: 'completed',
      reference: 'TX-789457'
    },
    { 
      id: 3, 
      client: 'Amit Patel', 
      type: 'refund', 
      amount: -1200, 
      date: '2024-01-13', 
      time: '11:45 AM',
      service: 'Maha Mrityunjay Jaap',
      method: 'bank',
      status: 'processed',
      reference: 'RF-123456'
    },
    { 
      id: 4, 
      client: 'Sonia Verma', 
      type: 'earning', 
      amount: 3000, 
      date: '2024-01-12', 
      time: '04:30 PM',
      service: 'Vastu Puja',
      method: 'card',
      status: 'pending',
      reference: 'TX-789458'
    },
    { 
      id: 5, 
      client: 'Neha Kapoor', 
      type: 'bonus', 
      amount: 500, 
      date: '2024-01-11', 
      time: '09:15 AM',
      service: 'Referral Bonus',
      method: 'system',
      status: 'completed',
      reference: 'BN-789123'
    }
  ];

  // Pending payouts
  const pendingPayouts = [
    { id: 1, amount: 25000, requested: '2024-01-14', status: 'processing', method: 'Bank Transfer' },
    { id: 2, amount: 18000, requested: '2024-01-10', status: 'pending', method: 'UPI' },
    { id: 3, amount: 13750, requested: '2024-01-05', status: 'processing', method: 'Bank Transfer' }
  ];

  // Commission breakdown
  const commissionBreakdown = [
    { type: 'Home Pujas', amount: 125000, percentage: 44, count: 45 },
    { type: 'Online Consultations', amount: 98500, percentage: 34, count: 68 },
    { type: 'Temple Services', amount: 45000, percentage: 16, count: 22 },
    { type: 'Reports & Kundli', amount: 17000, percentage: 6, count: 32 }
  ];

  // Withdrawal methods - Updated Bank to Landmark
  const withdrawalMethods = [
    { id: 'bank', name: 'Bank Transfer', icon: Landmark, processingTime: '1-2 business days', fee: '₹25' },
    { id: 'upi', name: 'UPI', icon: Smartphone, processingTime: 'Instant', fee: '₹5' },
    { id: 'paytm', name: 'PayTM Wallet', icon: Wallet, processingTime: 'Instant', fee: '₹10' }
  ];

  // Stats cards
  const stats = [
    { 
      title: 'Total Earnings', 
      value: `₹${earningsData.total.toLocaleString()}`,
      change: earningsData.change,
      icon: DollarSign,
      color: 'orange',
      trend: 'up'
    },
    { 
      title: 'Available Balance', 
      value: `₹${earningsData.available.toLocaleString()}`,
      change: '+15%',
      icon: Wallet,
      color: 'green',
      trend: 'up'
    },
    { 
      title: 'Pending Payouts', 
      value: `₹${earningsData.pending.toLocaleString()}`,
      change: '+8%',
      icon: Clock,
      color: 'blue',
      trend: 'up'
    },
    { 
      title: 'This Month', 
      value: `₹${earningsData.thisMonth.toLocaleString()}`,
      change: '+20%',
      icon: Calendar,
      color: 'purple',
      trend: 'up'
    }
  ];

  // Time filter options
  const timeFilters = [
    { id: 'day', label: 'Today' },
    { id: 'week', label: 'This Week' },
    { id: 'month', label: 'This Month' },
    { id: 'year', label: 'This Year' },
    { id: 'all', label: 'All Time' }
  ];

  // Format date
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  // Format amount
  const formatAmount = (amount) => {
    return `₹${Math.abs(amount).toLocaleString()}`;
  };

  // Get status badge
  const getStatusBadge = (status) => {
    switch(status) {
      case 'completed':
        return <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-200 text-xs font-medium">
          <CheckCircle className="w-3 h-3" /> Completed
        </span>;
      case 'pending':
        return <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-yellow-50 text-yellow-700 border border-yellow-200 text-xs font-medium">
          <Clock className="w-3 h-3" /> Pending
        </span>;
      case 'processing':
        return <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-medium">
          <RefreshCw className="w-3 h-3" /> Processing
        </span>;
      case 'processed':
        return <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 border border-gray-200 text-xs font-medium">
          <CheckCircle className="w-3 h-3" /> Processed
        </span>;
      default:
        return null;
    }
  };

  // Get type icon and color
  const getTransactionType = (type) => {
    switch(type) {
      case 'earning':
        return { 
          icon: <ArrowUpRight className="w-4 h-4" />, 
          color: 'text-green-600',
          bg: 'bg-green-50',
          border: 'border-green-200',
          label: 'Earning'
        };
      case 'refund':
        return { 
          icon: <ArrowDownRight className="w-4 h-4" />, 
          color: 'text-red-600',
          bg: 'bg-red-50',
          border: 'border-red-200',
          label: 'Refund'
        };
      case 'bonus':
        return { 
          icon: <Gift className="w-4 h-4" />, 
          color: 'text-purple-600',
          bg: 'bg-purple-50',
          border: 'border-purple-200',
          label: 'Bonus'
        };
      case 'withdrawal':
        return { 
          icon: <Download className="w-4 h-4" />, 
          color: 'text-blue-600',
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          label: 'Withdrawal'
        };
      default:
        return { 
          icon: <DollarSign className="w-4 h-4" />, 
          color: 'text-gray-600',
          bg: 'bg-gray-50',
          border: 'border-gray-200',
          label: 'Transaction'
        };
    }
  };

  // Get method icon - Updated bank case to use Landmark
  const getMethodIcon = (method) => {
    switch(method) {
      case 'online': return <Globe className="w-3.5 h-3.5 text-blue-500" />;
      case 'UPI': return <Smartphone className="w-3.5 h-3.5 text-green-500" />;
      case 'bank': return <Landmark className="w-3.5 h-3.5 text-purple-500" />;  // Changed Bank to Landmark
      case 'card': return <CreditCard className="w-3.5 h-3.5 text-orange-500" />;
      case 'system': return <Zap className="w-3.5 h-3.5 text-yellow-500" />;
      default: return <Wallet className="w-3.5 h-3.5 text-gray-500" />;
    }
  };

  // Handle withdrawal
  const handleWithdrawal = () => {
    if (!withdrawAmount || parseFloat(withdrawAmount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }
    
    if (parseFloat(withdrawAmount) > earningsData.available) {
      alert('Amount exceeds available balance');
      return;
    }
    
    // In a real app, this would be an API call
    console.log(`Withdrawing ₹${withdrawAmount}`);
    setShowWithdrawModal(false);
    setWithdrawAmount('');
  };

  // Calculate chart data
  const calculateChartData = () => {
    if (selectedChart === 'income') {
      return incomeTrend.map(item => item.income);
    } else if (selectedChart === 'sessions') {
      return incomeTrend.map(item => item.sessions);
    } else {
      return incomeTrend.map(item => Math.round(item.income / item.sessions));
    }
  };

  const chartData = calculateChartData();
  const maxValue = Math.max(...chartData);
  const minValue = Math.min(...chartData);

  return (
    <div className=''>
      {/* Header Section - Exact Same Styling */}
      <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40  
                    px-3 py-1.5 border border-orange-100">
        
        {/* Mobile: Column, Desktop: Row */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          
          {/* Title Section */}
          <div className="text-left sm:text-left flex items-end gap-2">
            <div>
              <h1 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-orange-900 uppercase
                            leading-tight">
                Wallet & Earnings
              </h1>
              {/* Mobile: Below heading, Desktop: Right side */}
              <p className="sm:hidden text-sm text-gray-600 mt-0.5">
                Track your income and manage payouts
              </p>
            </div>
            
            {/* Desktop: Right side of heading */}
            <p className="hidden sm:block text-sm text-gray-600 mb-0.5">
              Track your income and manage payouts
            </p>
          </div>
          
          {/* Right Section */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowWithdrawModal(true)}
              disabled={earningsData.available <= 0}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm transition-all ${
                earningsData.available > 0
                  ? 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Download className="w-4 h-4" />
              Withdraw
            </button>
            <button className="flex items-center gap-1.5 px-2.5 py-1.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm">
              <Receipt className="w-4 h-4" />
              Statement
            </button>
          </div>
        </div>
      </div>

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
                        <TrendingUp className="w-3 h-3" /> : 
                        <TrendingDown className="w-3 h-3" />
                      }
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className={`p-1.5 rounded ${
                  stat.color === 'orange' ? 'bg-orange-50' :
                  stat.color === 'green' ? 'bg-green-50' :
                  stat.color === 'blue' ? 'bg-blue-50' :
                  'bg-purple-50'
                }`}>
                  <stat.icon className={`w-4 h-4 ${
                    stat.color === 'orange' ? 'text-orange-500' :
                    stat.color === 'green' ? 'text-green-500' :
                    stat.color === 'blue' ? 'text-blue-500' :
                    'text-purple-500'
                  }`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Income Chart Section */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-xs">
          <div className="p-4 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-semibold text-gray-800">Income Analytics</h2>
                <p className="text-sm text-gray-600 mt-0.5">Track your earnings growth over time</p>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="flex bg-gray-100 rounded-lg p-0.5">
                  <button
                    onClick={() => setSelectedChart('income')}
                    className={`px-3 py-1 text-sm rounded transition-all ${
                      selectedChart === 'income'
                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white'
                        : 'text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Income
                  </button>
                  <button
                    onClick={() => setSelectedChart('sessions')}
                    className={`px-3 py-1 text-sm rounded transition-all ${
                      selectedChart === 'sessions'
                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white'
                        : 'text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Sessions
                  </button>
                  <button
                    onClick={() => setSelectedChart('avg')}
                    className={`px-3 py-1 text-sm rounded transition-all ${
                      selectedChart === 'avg'
                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white'
                        : 'text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Avg. Price
                  </button>
                </div>
                
                <div className="flex bg-gray-100 rounded-lg p-0.5">
                  {timeFilters.map(filter => (
                    <button
                      key={filter.id}
                      onClick={() => setTimeFilter(filter.id)}
                      className={`px-2 py-1 text-xs rounded transition-all ${
                        timeFilter === filter.id
                          ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white'
                          : 'text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-4">
            {/* Chart Container */}
            <div className="h-64 relative">
              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 bottom-0 w-12 flex flex-col justify-between text-xs text-gray-500">
                <span>₹{maxValue.toLocaleString()}</span>
                <span>₹{Math.round((maxValue + minValue) / 2).toLocaleString()}</span>
                <span>₹{minValue.toLocaleString()}</span>
              </div>
              
              {/* Chart bars */}
              <div className="ml-12 h-full flex items-end justify-between">
                {chartData.map((value, index) => {
                  const percentage = ((value - minValue) / (maxValue - minValue)) * 100;
                  const height = Math.max(20, percentage); // Minimum height of 20%
                  
                  return (
                    <div key={index} className="flex flex-col items-center justify-end h-full">
                      {/* Bar */}
                      <div 
                        className="w-8 md:w-10 bg-gradient-to-t from-orange-500 to-orange-600 rounded-t-lg relative group"
                        style={{ height: `${height}%` }}
                      >
                        {/* Tooltip */}
                        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                          {selectedChart === 'income' && `₹${value.toLocaleString()}`}
                          {selectedChart === 'sessions' && `${value} sessions`}
                          {selectedChart === 'avg' && `₹${value}/session`}
                        </div>
                      </div>
                      
                      {/* Month label */}
                      <span className="text-xs text-gray-600 mt-1">{incomeTrend[index].month}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Chart Legend */}
            <div className="flex items-center justify-center gap-4 mt-4">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-orange-500 to-orange-600"></div>
                <span className="text-xs text-gray-700">
                  {selectedChart === 'income' && 'Monthly Income'}
                  {selectedChart === 'sessions' && 'Sessions Count'}
                  {selectedChart === 'avg' && 'Average Price per Session'}
                </span>
              </div>
              <div className="text-xs text-gray-500">
                {selectedChart === 'income' && 'Total earnings per month'}
                {selectedChart === 'sessions' && 'Number of consultations per month'}
                {selectedChart === 'avg' && 'Average earning per consultation'}
              </div>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Left Column - Commission Breakdown */}
          <div className="space-y-4">
            {/* Commission Breakdown */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-xs">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-base font-semibold text-gray-800">Commission Breakdown</h2>
                <p className="text-sm text-gray-600 mt-0.5">Earnings by service type</p>
              </div>
              
              <div className="p-4 space-y-3">
                {commissionBreakdown.map((item, index) => (
                  <div key={index} className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${
                          index === 0 ? 'bg-orange-500' :
                          index === 1 ? 'bg-blue-500' :
                          index === 2 ? 'bg-purple-500' :
                          'bg-green-500'
                        }`}></div>
                        <span className="font-medium text-gray-800 text-sm">{item.type}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-800">{formatAmount(item.amount)}</span>
                        <span className="text-xs text-gray-500">({item.count})</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs">
                      <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full"
                          style={{ 
                            width: `${item.percentage}%`,
                            backgroundColor: index === 0 ? '#f97316' :
                                          index === 1 ? '#3b82f6' :
                                          index === 2 ? '#8b5cf6' :
                                          '#10b981'
                          }}
                        />
                      </div>
                      <span className="ml-2 text-gray-600 min-w-[40px]">{item.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-4 border-t border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-gray-800">Total</span>
                  <span className="font-bold text-gray-800">{formatAmount(commissionBreakdown.reduce((sum, item) => sum + item.amount, 0))}</span>
                </div>
              </div>
            </div>

            {/* Pending Payouts */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-xs">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-base font-semibold text-gray-800">Pending Payouts</h2>
                <p className="text-sm text-gray-600 mt-0.5">Withdrawal requests in process</p>
              </div>
              
              <div className="p-4 space-y-3">
                {pendingPayouts.map((payout) => (
                  <div key={payout.id} className="flex items-center justify-between p-3 bg-gray-50 rounded border border-gray-200">
                    <div>
                      <div className="font-medium text-gray-800">{formatAmount(payout.amount)}</div>
                      <div className="text-xs text-gray-500 mt-0.5">
                        Requested: {formatDate(payout.requested)} • {payout.method}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(payout.status)}
                      <button className="p-1.5 text-gray-500 hover:bg-gray-100 rounded">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
                
                <div className="pt-3 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-800">Total Pending</span>
                    <span className="font-bold text-gray-800">
                      {formatAmount(pendingPayouts.reduce((sum, payout) => sum + payout.amount, 0))}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Recent Transactions */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-xs">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-semibold text-gray-800">Recent Transactions</h2>
                  <p className="text-sm text-gray-600 mt-0.5">Last 30 days of activity</p>
                </div>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-50 text-sm"
                >
                  <Filter className="w-4 h-4" />
                  Filter
                  {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>
            </div>
            
            {/* Filters */}
            {showFilters && (
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Type</label>
                    <select className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded">
                      <option value="all">All Types</option>
                      <option value="earning">Earnings</option>
                      <option value="refund">Refunds</option>
                      <option value="bonus">Bonuses</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Status</label>
                    <select className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded">
                      <option value="all">All Status</option>
                      <option value="completed">Completed</option>
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
            
            {/* Transactions List */}
            <div className="divide-y divide-gray-200">
              {transactions.map((transaction) => {
                const typeInfo = getTransactionType(transaction.type);
                
                return (
                  <div 
                    key={transaction.id} 
                    className="p-4 hover:bg-gray-50 cursor-pointer"
                    onClick={() => setShowTransactionDetails(transaction)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-full ${typeInfo.bg} border ${typeInfo.border} flex items-center justify-center`}>
                          <div className={typeInfo.color}>
                            {typeInfo.icon}
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h3 className="font-medium text-gray-800">{transaction.client}</h3>
                            <span className="text-xs px-1.5 py-0.5 bg-gray-100 text-gray-700 rounded">
                              {typeInfo.label}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mt-0.5">{transaction.service}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-gray-500 flex items-center gap-0.5">
                              {getMethodIcon(transaction.method)}
                              {transaction.method}
                            </span>
                            <span className="text-xs text-gray-500">
                              {formatDate(transaction.date)} • {transaction.time}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className={`font-bold ${
                          transaction.type === 'refund' ? 'text-red-600' : 'text-green-600'
                        }`}>
                          {transaction.type === 'refund' ? '-' : '+'}{formatAmount(transaction.amount)}
                        </div>
                        <div className="mt-1">
                          {getStatusBadge(transaction.status)}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="p-4 border-t border-gray-200">
              <button className="w-full text-center text-sm text-orange-600 hover:text-orange-700 font-medium">
                View All Transactions →
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-4 rounded-lg border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-orange-600" />
              <h3 className="font-semibold text-gray-800">Highest Earning Day</h3>
            </div>
            <div className="text-2xl font-bold text-gray-800">₹18,500</div>
            <div className="text-sm text-gray-600 mt-1">Monday, Jan 15 • 7 sessions</div>
          </div>
          
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-lg border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-gray-800">Repeat Clients</h3>
            </div>
            <div className="text-2xl font-bold text-gray-800">28</div>
            <div className="text-sm text-gray-600 mt-1">Generate 65% of total revenue</div>
          </div>
          
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold text-gray-800">Conversion Rate</h3>
            </div>
            <div className="text-2xl font-bold text-gray-800">78%</div>
            <div className="text-sm text-gray-600 mt-1">From consultation to booking</div>
          </div>
        </div>
      </div>

      {/* Withdraw Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-3 sm:p-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-md">
            <div className="p-4 sm:p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-800">Withdraw Funds</h2>
                <button 
                  onClick={() => {
                    setShowWithdrawModal(false);
                    setWithdrawAmount('');
                  }}
                  className="p-1 hover:bg-gray-100 rounded text-gray-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Available Balance */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
                  <div className="text-center">
                    <div className="text-sm text-gray-600">Available Balance</div>
                    <div className="text-3xl font-bold text-gray-800 mt-1">
                      ₹{earningsData.available.toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* Amount Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Amount to Withdraw *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                    <input
                      type="number"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 text-lg border border-gray-300 rounded focus:ring-1 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Enter amount"
                      max={earningsData.available}
                      min="100"
                    />
                  </div>
                  <div className="flex gap-2 mt-2">
                    {[1000, 5000, 10000, earningsData.available].map((amount) => (
                      <button
                        key={amount}
                        type="button"
                        onClick={() => setWithdrawAmount(amount === earningsData.available ? amount : amount.toString())}
                        className="px-2 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50"
                      >
                        {amount === earningsData.available ? 'Max' : `₹${amount.toLocaleString()}`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Withdrawal Method */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Withdrawal Method
                  </label>
                  <div className="space-y-2">
                    {withdrawalMethods.map((method) => (
                      <label key={method.id} className="flex items-center gap-3 p-3 border border-gray-300 rounded cursor-pointer hover:border-orange-500">
                        <input
                          type="radio"
                          name="withdrawalMethod"
                          defaultChecked={method.id === 'upi'}
                          className="text-orange-500"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <method.icon className="w-5 h-5 text-gray-500" />
                            <span className="font-medium text-gray-800">{method.name}</span>
                          </div>
                          <div className="text-xs text-gray-600 mt-0.5">
                            Processing: {method.processingTime} • Fee: {method.fee}
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Summary */}
                <div className="bg-gray-50 p-3 rounded border border-gray-200">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Withdrawal Amount</span>
                      <span className="font-medium">₹{withdrawAmount ? parseFloat(withdrawAmount).toLocaleString() : '0'}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Processing Fee</span>
                      <span className="font-medium">₹5</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Tax (18% GST)</span>
                      <span className="font-medium">
                        ₹{withdrawAmount ? Math.round(parseFloat(withdrawAmount) * 0.18).toLocaleString() : '0'}
                      </span>
                    </div>
                    <div className="pt-1.5 border-t border-gray-200">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-gray-800">You will receive</span>
                        <span className="font-bold text-green-600">
                          ₹{withdrawAmount ? (parseFloat(withdrawAmount) - 5 - Math.round(parseFloat(withdrawAmount) * 0.18)).toLocaleString() : '0'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Terms */}
                <div className="text-xs text-gray-500">
                  <p>• Minimum withdrawal amount: ₹100</p>
                  <p>• Processing time: 1-2 business days for bank transfers, instant for UPI</p>
                  <p>• Withdrawals are processed Monday-Friday, 9 AM - 6 PM</p>
                </div>

                {/* Modal Actions */}
                <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 pt-4 border-t">
                  <button
                    onClick={() => {
                      setShowWithdrawModal(false);
                      setWithdrawAmount('');
                    }}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 text-sm w-full sm:w-auto"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleWithdrawal}
                    className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded hover:from-green-600 hover:to-green-700 text-sm w-full sm:w-auto"
                  >
                    Confirm Withdrawal
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Transaction Details Modal */}
      {showTransactionDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-md">
            <div className="p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-800">Transaction Details</h2>
                <button 
                  onClick={() => setShowTransactionDetails(null)}
                  className="p-1 hover:bg-gray-100 rounded text-gray-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Transaction Header */}
                <div className="text-center">
                  <div className={`w-16 h-16 rounded-full mx-auto ${
                    showTransactionDetails.type === 'refund' ? 'bg-red-50' : 'bg-green-50'
                  } border ${
                    showTransactionDetails.type === 'refund' ? 'border-red-200' : 'border-green-200'
                  } flex items-center justify-center`}>
                    {showTransactionDetails.type === 'refund' ? (
                      <ArrowDownRight className="w-8 h-8 text-red-600" />
                    ) : (
                      <ArrowUpRight className="w-8 h-8 text-green-600" />
                    )}
                  </div>
                  <div className={`text-2xl font-bold mt-3 ${
                    showTransactionDetails.type === 'refund' ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {showTransactionDetails.type === 'refund' ? '-' : '+'}{formatAmount(showTransactionDetails.amount)}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">{showTransactionDetails.service}</div>
                </div>

                {/* Details Grid */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Client</span>
                      <span className="font-medium">{showTransactionDetails.client}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Date & Time</span>
                      <span className="font-medium">
                        {formatDate(showTransactionDetails.date)} • {showTransactionDetails.time}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Payment Method</span>
                      <div className="flex items-center gap-1.5">
                        {getMethodIcon(showTransactionDetails.method)}
                        <span className="font-medium">{showTransactionDetails.method}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Transaction ID</span>
                      <span className="font-medium text-xs">{showTransactionDetails.reference}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Status</span>
                      {getStatusBadge(showTransactionDetails.status)}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 text-sm">
                    <Receipt className="inline w-4 h-4 mr-1" />
                    Download Receipt
                  </button>
                  <button className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 text-sm">
                    <Share2 className="inline w-4 h-4 mr-1" />
                    Share
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

export default WalletEarnings;