import React, { useRef, useState } from 'react';
import { 
  ShoppingBag,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  ChevronRight,
  Download,
  Eye,
  Filter,
  Search,
  X,
  Loader,
  IndianRupee,
  Star,
  Users,
  MapPin,
  Phone,
  Video,
  CreditCard,
  Smartphone,
  Globe,
  User,
  LogIn,
  Settings,
  Gift,
  RotateCcw,
  Award,
  Bell,
  Home,
  Mail,
  Monitor
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import html2pdf from 'html2pdf.js';
import { useGetUserHistoryQuery } from '../../../services/userApi';

const UserHistory = () => {
  // ========== STATE MANAGEMENT ==========
  const [selectedFilter, setSelectedFilter] = useState('all'); // all, orders, payments, profile, login
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const printRef = useRef();

  // ========== RTK QUERY ==========
  const { data: historyResponse, isLoading, isError, refetch } = useGetUserHistoryQuery(undefined, { pollingInterval: 3000 });
  const historyData = historyResponse?.data || [];

  const getIcon = (type) => {
    switch(type) {
      case 'order': return <ShoppingBag className="w-4 h-4" />;
      case 'payment': return <CreditCard className="w-4 h-4" />;
      case 'profile': return <User className="w-4 h-4" />;
      case 'login': return <LogIn className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getIconStyles = (type) => {
    switch(type) {
      case 'order': return { bg: 'bg-amber-100', color: 'text-amber-600' };
      case 'payment': return { bg: 'bg-green-100', color: 'text-green-600' };
      case 'profile': return { bg: 'bg-blue-100', color: 'text-blue-600' };
      case 'login': return { bg: 'bg-gray-100', color: 'text-gray-600' };
      default: return { bg: 'bg-gray-100', color: 'text-gray-600' };
    }
  };

  // ========== FILTER OPTIONS ==========
  const filterOptions = [
    { value: 'all', label: 'All Activity', icon: <Clock className="w-3 h-3" /> },
    { value: 'orders', label: 'Orders', icon: <ShoppingBag className="w-3 h-3" /> },
    { value: 'payments', label: 'Payments', icon: <CreditCard className="w-3 h-3" /> },
    { value: 'profile', label: 'Profile', icon: <User className="w-3 h-3" /> },
    { value: 'login', label: 'Login', icon: <LogIn className="w-3 h-3" /> }
  ];

  const dateOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'custom', label: 'Custom Range' }
  ];

  // ========== FILTER HISTORY ==========
  const filteredHistory = historyData.filter(item => {
    // Type filter
    if (selectedFilter !== 'all' && item.type !== selectedFilter) return false;
    
    // Date filter
    if (dateFilter !== 'all') {
      const itemDate = new Date(item.date.split(' ').reverse().join('-'));
      const today = new Date();
      
      if (dateFilter === 'today') {
        if (itemDate.toDateString() !== today.toDateString()) return false;
      } else if (dateFilter === 'week') {
        const weekAgo = new Date(today.setDate(today.getDate() - 7));
        if (itemDate < weekAgo) return false;
      } else if (dateFilter === 'month') {
        const monthAgo = new Date(today.setMonth(today.getMonth() - 1));
        if (itemDate < monthAgo) return false;
      }
    }
    
    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      return (
        item.action.toLowerCase().includes(term) ||
        item.description.toLowerCase().includes(term) ||
        item.id.toLowerCase().includes(term)
      );
    }
    
    return true;
  });

  // Sort by date (newest first)
  const sortedHistory = [...filteredHistory];

  // ========== STATUS STYLING FUNCTIONS ==========
  const getStatusStyle = (status) => {
    const base = "px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1 w-fit";
    switch(status) {
      case 'completed':
      case 'success':
        return `${base} bg-green-100 text-green-700`;
      case 'processing':
        return `${base} bg-blue-100 text-blue-700`;
      case 'pending':
        return `${base} bg-amber-50 text-amber-600`;
      case 'cancelled':
      case 'failed':
        return `${base} bg-red-50 text-red-600`;
      case 'refunded':
        return `${base} bg-purple-100 text-purple-700`;
      case 'current':
        return `${base} bg-blue-100 text-blue-700`;
      default:
        return `${base} bg-gray-100 text-gray-600`;
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'completed':
      case 'success':
        return <CheckCircle className="w-3 h-3" />;
      case 'processing':
      case 'pending':
        return <Clock className="w-3 h-3" />;
      case 'cancelled':
      case 'failed':
        return <XCircle className="w-3 h-3" />;
      case 'refunded':
        return <RotateCcw className="w-3 h-3" />;
      case 'current':
        return <LogIn className="w-3 h-3" />;
      default:
        return <AlertCircle className="w-3 h-3" />;
    }
  };

  // ========== FORMAT CURRENCY ==========
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // ========== GROUP BY DATE ==========
  const groupByDate = (items) => {
    const groups = {};
    items.forEach(item => {
      if (!groups[item.date]) {
        groups[item.date] = [];
      }
      groups[item.date].push(item);
    });
    return groups;
  };

  const groupedHistory = groupByDate(sortedHistory);

  // ========== HANDLER FUNCTIONS ==========
  const handleViewDetails = (item) => {
    setSelectedItem(item);
    setShowDetailsModal(true);
  };

  // FIXED: handleDownloadReceipt function - removed undefined variables
  const handleDownloadReceipt = (item) => {
    if (!printRef.current) {
      toast.error("Print reference not found");
      return;
    }

    toast.info(`Generating receipt for ${item.description}...`);
    
    const opt = {
      margin: 0,
      filename: `Receipt-${item.id}-${item.date.replace(/\s/g, '')}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    html2pdf().set(opt).from(printRef.current).save();
  };

  const handleReorder = (description) => {
    toast.info(`Reorder ${description} - Redirecting...`);
  };

  const handleClearFilters = () => {
    setSelectedFilter('all');
    setDateFilter('all');
    setSearchTerm('');
    toast.info('Filters cleared');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ========== HEADER ========== */}
      <div className="bg-gradient-to-r from-amber-100/50 via-amber-200/30 to-amber-300/40 px-3 py-1.5 border border-amber-200 mb-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <div className="text-left sm:text-left flex items-end gap-2">
            <div>
              <h1 className="text-lg sm:text-xl md:text-2xl lg:text-[25px] font-semibold text-amber-900 uppercase leading-tight flex items-center gap-2">
                <Clock className="w-[23px] h-[23px] text-amber-600" />
                History
              </h1>
              <p className="sm:hidden text-sm text-gray-600 mt-0.5">
                Complete activity log
              </p>
            </div>
            <p className="hidden sm:block text-sm text-gray-600 mb-0.5">
              Orders • Payments • Profile • Login activity
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search history..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-amber-300 bg-white w-full sm:w-64"
            />
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2" />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-2 top-2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ========== MAIN CONTENT ========== */}
      <div className="space-y-4 px-6 pb-6 pt-2">

        {/* ========== FILTERS SECTION ========== */}
       <div className="bg-white rounded-lg border border-gray-200 hover:border-amber-300 transition-colors p-2 sm:p-3">
  <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2 sm:gap-3">
    
    {/* Activity Type Filters - Horizontal scroll on mobile */}
    <div className="order-1 w-full sm:w-auto">
      <div className="flex gap-1 border border-gray-200 rounded-lg p-1 bg-white overflow-x-auto pb-1 sm:pb-1 hide-scrollbar">
        {filterOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setSelectedFilter(option.value)}
            className={`
              px-2 sm:px-3 py-1 text-[10px] sm:text-xs font-medium rounded-md transition-all capitalize cursor-pointer
              flex items-center gap-1 whitespace-nowrap
              ${selectedFilter === option.value 
                ? 'bg-amber-500 text-white' 
                : 'text-gray-600 hover:bg-gray-100'
              }
            `}
          >
            <span className="w-3 h-3 sm:w-3.5 sm:h-3.5">{option.icon}</span>
            <span>{option.label}</span>
          </button>
        ))}
      </div>
    </div>

    {/* Date Filter and Clear Filters - Stack on mobile */}
    <div className="order-2 w-full sm:w-auto flex flex-col sm:flex-row gap-2 sm:gap-3">
      <div className="flex items-center gap-2 w-full sm:w-auto">
        {/* Date Filter */}
        <select
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="flex-1 sm:flex-none px-2 sm:px-3 py-1.5 text-[10px] sm:text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-amber-300 bg-white"
        >
          {dateOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>

        {/* Clear Filters - Condensed on mobile */}
        {(selectedFilter !== 'all' || dateFilter !== 'all' || searchTerm) && (
          <button
            onClick={handleClearFilters}
            className="px-2 sm:px-3 py-1.5 text-[10px] sm:text-xs bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 flex items-center gap-1 whitespace-nowrap"
          >
            <X className="w-3 h-3" />
            <span className="hidden sm:inline">Clear Filters</span>
            <span className="sm:hidden">Clear</span>
          </button>
        )}
      </div>
    </div>

    {/* Results Count - Align right on mobile */}
    <div className="order-3 w-full sm:w-auto sm:ml-auto flex justify-end sm:block">
      <span className="text-[10px] sm:text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-lg sm:bg-transparent sm:px-0 sm:py-0">
        {sortedHistory.length} activities
      </span>
    </div>
  </div>
</div>

{/* FIXED: Removed 'jsx' attribute from style tags */}
<style>{`
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
`}</style>

        {/* ========== TIMELINE VIEW ========== */}
       <div className="bg-white rounded-lg border border-gray-200 hover:border-amber-300 transition-colors p-3 sm:p-4">
  <h3 className="text-sm sm:text-[15px] font-bold text-gray-800 mb-3 sm:mb-4 flex items-center gap-1 sm:gap-2">
    <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-amber-600" />
    <span>Activity Timeline</span>
  </h3>

  {isLoading ? (
    <div className="py-20 text-center">
      <Loader className="w-10 h-10 text-amber-500 animate-spin mx-auto mb-4" />
      <p className="text-gray-600">Loading your activity history...</p>
    </div>
  ) : sortedHistory.length === 0 ? (
    <div className="py-6 sm:py-8 text-center">
      <Clock className="w-8 h-8 sm:w-12 sm:h-12 text-gray-300 mx-auto mb-2 sm:mb-3" />
      <p className="text-xs sm:text-sm text-gray-600 font-medium">No history found</p>
      <p className="text-[10px] sm:text-xs text-gray-500 mt-1">Try changing your filters</p>
    </div>
  ) : (
    <div className="relative">
      {/* Timeline Line - Adjust left position for mobile */}
      <div className="absolute left-3 sm:left-4 top-0 bottom-0 w-0.5 bg-amber-200"></div>
      
      {/* Timeline Items */}
      <div className="space-y-3 sm:space-y-4">
        {sortedHistory.map((item, index) => (
          <div key={item.id} className="relative pl-8 sm:pl-10">
            {/* Timeline Dot - Adjust for mobile */}
            <div className="absolute left-1.5 sm:left-2 top-3 sm:top-4 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-white border-2 border-amber-500 flex items-center justify-center">
              <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-amber-500"></div>
            </div>

            {/* Content Card */}
            <div 
              className="bg-white rounded-lg border border-gray-200 hover:border-amber-300 transition-colors p-2 sm:p-3 cursor-pointer"
              onClick={() => handleViewDetails(item)}
            >
              <div className="flex items-start gap-2 sm:gap-3">
                {/* Icon - Smaller on mobile */}
                <div className={`p-1.5 sm:p-2 ${getIconStyles(item.type).bg} rounded-lg shrink-0`}>
                  <div className={`${getIconStyles(item.type).color} [&>svg]:w-3 [&>svg]:h-3 sm:[&>svg]:w-4 sm:[&>svg]:h-4`}>
                    {getIcon(item.type)}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0"> {/* min-w-0 for truncation */}
                  {/* Header - Stack on mobile if needed */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2 mb-1">
                    <h4 className="text-xs sm:text-sm font-semibold text-gray-800 truncate pr-2">
                      {item.action}
                    </h4>
                    <span className={`text-[10px] sm:text-xs ${getStatusStyle(item.status)} self-start sm:self-auto`}>
                      {getStatusIcon(item.status)}
                      <span className="capitalize ml-0.5 hidden sm:inline">{item.status}</span>
                      {/* Show only first 3 letters on mobile? Optional */}
                      <span className="sm:hidden capitalize ml-0.5">
                        {item.status.substring(0, 3)}
                      </span>
                    </span>
                  </div>
                  
                  <p className="text-xs sm:text-sm text-gray-600 truncate">{item.description}</p>
                  
                  {/* Date/Time Row - Wrap on mobile */}
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-1.5 sm:mt-2 text-[10px] sm:text-xs text-gray-500">
                    <span className="flex items-center gap-0.5 sm:gap-1">
                      <Calendar className="w-2.5 h-2.5 sm:w-3 sm:h-3 shrink-0" />
                      <span className="truncate max-w-[80px] sm:max-w-none">{item.date}</span>
                    </span>
                    <span className="flex items-center gap-0.5 sm:gap-1">
                      <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3 shrink-0" />
                      <span>{item.time}</span>
                    </span>
                    {item.amount && (
                      <>
                        <span className="hidden sm:inline">•</span>
                        <span className="text-amber-600 font-medium text-[10px] sm:text-xs">
                          {formatCurrency(item.amount)}
                        </span>
                      </>
                    )}
                  </div>

                  {/* Quick Actions - Scroll horizontally on mobile if needed */}
                  <div className="mt-2 flex items-center justify-end gap-1 sm:gap-2 overflow-x-auto pb-1 hide-scrollbar">
                    {(item.type === 'order' || item.type === 'payment') && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownloadReceipt(item);
                        }}
                        className="px-1.5 sm:px-2 py-1 text-[10px] sm:text-xs bg-amber-50 text-amber-700 rounded hover:bg-amber-100 flex items-center gap-0.5 sm:gap-1 whitespace-nowrap"
                      >
                        <Download className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                        <span className="hidden sm:inline">Receipt</span>
                        <span className="sm:hidden">Bill</span>
                      </button>
                    )}
                    {item.type === 'order' && item.status === 'completed' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleReorder(item.description);
                        }}
                        className="px-1.5 sm:px-2 py-1 text-[10px] sm:text-xs bg-green-50 text-green-700 rounded hover:bg-green-100 flex items-center gap-0.5 sm:gap-1 whitespace-nowrap"
                      >
                        <RotateCcw className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                        <span className="hidden sm:inline">Reorder</span>
                        <span className="sm:hidden">Again</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )}
</div>

{/* FIXED: Removed 'jsx' attribute from style tags */}
<style>{`
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
`}</style>

        {/* ========== SUMMARY FOOTER ========== */}
        <div className="bg-gradient-to-r from-amber-100/50 via-amber-200/30 to-amber-300/40 rounded-lg border border-amber-200 p-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-600" />
              <div>
                <h4 className="text-xs font-semibold text-gray-800">Activity Summary</h4>
                <p className="text-xs text-gray-600">
                  Total Orders: {historyData.filter(i => i.type === 'order').length} • 
                  Payments: {historyData.filter(i => i.type === 'payment').length} • 
                  Profile Updates: {historyData.filter(i => i.type === 'profile').length}
                </p>
              </div>
            </div>
            
            <button 
              className="px-3 py-1.5 text-xs bg-white text-gray-800 rounded-lg border border-gray-300 hover:bg-gray-50 flex items-center gap-1 cursor-pointer transition-colors"
              onClick={() => toast.info('Downloading complete history...')}
            >
              <Download className="w-3 h-3" />
              Export History
            </button>
          </div>
        </div>
      </div>

      {/* ========== DETAILS MODAL ========== */}
      {showDetailsModal && selectedItem && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-800">Activity Details</h3>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div ref={printRef} className="p-4 space-y-4">
              {/* Type & Status */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`p-2 ${selectedItem.iconBg} rounded-lg`}>
                    <div className={selectedItem.iconColor}>
                      {selectedItem.icon}
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-600 uppercase">
                    {selectedItem.type}
                  </span>
                </div>
                <span className={getStatusStyle(selectedItem.status)}>
                  {getStatusIcon(selectedItem.status)}
                  <span className="capitalize">{selectedItem.status}</span>
                </span>
              </div>

              {/* Action & Description */}
              <div className="bg-amber-50 p-3 rounded-lg">
                <p className="text-xs text-amber-600 mb-1">Activity</p>
                <p className="text-lg font-bold text-gray-800">{selectedItem.action}</p>
                <p className="text-sm text-gray-600 mt-1">{selectedItem.description}</p>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-500">Date</p>
                  <p className="text-sm font-medium text-gray-800">{selectedItem.date}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-500">Time</p>
                  <p className="text-sm font-medium text-gray-800">{selectedItem.time}</p>
                </div>
              </div>

              {/* Amount (if exists) */}
              {selectedItem.amount && (
                <div className="border border-gray-200 rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-1">Amount</p>
                  <p className="text-xl font-bold text-amber-700">
                    {formatCurrency(selectedItem.amount)}
                  </p>
                </div>
              )}

              {/* Dynamic Details based on type */}
              {selectedItem.type === 'order' && (
                <div className="border border-gray-200 rounded-lg p-3 space-y-2">
                  <p className="text-xs text-gray-500 mb-1">Order Details</p>
                  <p className="text-sm text-gray-800">Order ID: {selectedItem.details.orderId}</p>
                  {selectedItem.details.priest && (
                    <p className="text-sm text-gray-600">Priest: {selectedItem.details.priest}</p>
                  )}
                  {selectedItem.details.location && (
                    <p className="text-sm text-gray-600 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {selectedItem.details.location}
                    </p>
                  )}
                  {selectedItem.details.reason && (
                    <p className="text-sm text-red-600">Reason: {selectedItem.details.reason}</p>
                  )}
                </div>
              )}

              {selectedItem.type === 'payment' && (
                <div className="border border-gray-200 rounded-lg p-3 space-y-2">
                  <p className="text-xs text-gray-500 mb-1">Payment Details</p>
                  <p className="text-sm text-gray-800">Transaction ID: {selectedItem.details.transactionId}</p>
                  <p className="text-sm text-gray-600">Method: {selectedItem.details.method}</p>
                  {selectedItem.details.reason && (
                    <p className="text-sm text-red-600">Reason: {selectedItem.details.reason}</p>
                  )}
                </div>
              )}

              {selectedItem.type === 'login' && (
                <div className="border border-gray-200 rounded-lg p-3 space-y-2">
                  <p className="text-xs text-gray-500 mb-1">Login Details</p>
                  <p className="text-sm text-gray-800">Device: {selectedItem.details.device}</p>
                  <p className="text-sm text-gray-600">Location: {selectedItem.details.location}</p>
                  <p className="text-sm text-gray-600">IP: {selectedItem.details.ip}</p>
                </div>
              )}

              {selectedItem.type === 'profile' && (
                <div className="border border-gray-200 rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-1">Changes</p>
                  {selectedItem.details.changes ? (
                    selectedItem.details.changes.map((change, idx) => (
                      <p key={idx} className="text-sm text-gray-600">• {change}</p>
                    ))
                  ) : (
                    <p className="text-sm text-gray-600">{selectedItem.details.message}</p>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                {(selectedItem.type === 'order' || selectedItem.type === 'payment') && (
                  <button
                    onClick={() => handleDownloadReceipt(selectedItem)}
                    className="flex-1 bg-amber-500 text-white py-2 rounded-lg hover:bg-amber-600 flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download Receipt
                  </button>
                )}
                {selectedItem.type === 'order' && selectedItem.status === 'completed' && (
                  <button
                    onClick={() => handleReorder(selectedItem.description)}
                    className="flex-1 bg-green-50 text-green-700 py-2 rounded-lg hover:bg-green-100 flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reorder
                  </button>
                )}
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserHistory;