import React, { useRef, useState } from 'react';
import { 
  Wallet,
  CreditCard,
  Smartphone,
  Globe,
  IndianRupee,
  ChevronRight,
  Download,
  Gift,
  RotateCcw,
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  Percent,
  Zap,
  Shield,
  Copy,
  ExternalLink,
  X,
  Loader,
  Bell,
  Home,
  Star,
  TrendingUp,
  History,
  Receipt,
  Eye,
  Filter,
  Search,
  Printer,
  Banknote,
  Landmark,
} from 'lucide-react';
import { useReactToPrint } from 'react-to-print';
import html2pdf from 'html2pdf.js';
import { useGetUserDashboardQuery, useGetUserHistoryQuery } from '../../../services/userApi';

const UserPayments = () => {
  // ========== STATE MANAGEMENT ==========
  const [selectedTime, setSelectedTime] = useState('month');
  const [showAddMoneyModal, setShowAddMoneyModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterMethod, setFilterMethod] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  
  // Add Money States
  const [addMoneyAmount, setAddMoneyAmount] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('razorpay');
  const [isProcessing, setIsProcessing] = useState(false);
  const printRef = useRef();

  // ========== RTK QUERY ==========
  const { data: dashboardResponse, isLoading: isDashboardLoading } = useGetUserDashboardQuery(undefined, { pollingInterval: 3000 });
  const { data: historyResponse, isLoading: isHistoryLoading } = useGetUserHistoryQuery(undefined, { pollingInterval: 3000 });

  const dashboardData = dashboardResponse?.data;
  const historyData = historyResponse?.data || [];

  // ========== WALLET DATA ==========
  const walletData = {
    availableBalance: dashboardData?.user?.walletBalance || 0,
    totalSpent: String(dashboardData?.summary?.find(s => s.type === 'payment')?.value || '0').replace('₹', ''),
    totalPaid: dashboardData?.user?.totalPaid || 0,
    totalCredits: dashboardData?.user?.totalCredits || 0,
    pendingPayments: dashboardData?.totalPendingAmount || 0,
    currency: 'INR'
  };

  // ========== PAYMENT METHODS ==========
  const paymentMethods = [
    { 
      id: 'razorpay', 
      name: 'Razorpay', 
      icon: <CreditCard className="w-5 h-5" />,
      description: 'Credit/Debit Card, UPI, NetBanking'
    },
    { 
      id: 'upi', 
      name: 'UPI', 
      icon: <Smartphone className="w-5 h-5" />,
      description: 'Google Pay, PhonePe, Paytm'
    },
    { 
      id: 'card', 
      name: 'Credit/Debit Card', 
      icon: <CreditCard className="w-5 h-5" />,
      description: 'Visa, Mastercard, RuPay'
    },
    { 
      id: 'netbanking', 
      name: 'Net Banking', 
      icon: <Landmark className="w-5 h-5" />,
      description: 'All major banks'
    }
  ];

  // ========== PAYMENT HISTORY ==========
  const paymentHistory = historyData
    .filter(item => item.type === 'payment')
    .map(item => ({
      id: item.id,
      transactionId: item.details?.transactionId || item.id,
      date: item.date,
      time: item.time,
      description: item.description,
      amount: item.amount,
      type: 'credit', // In history, we currently show bookings as payments (credits to the system)
      method: item.details?.method || 'N/A',
      methodType: (item.details?.method || '').toLowerCase().includes('upi') ? 'upi' : 
                  (item.details?.method || '').toLowerCase().includes('card') ? 'card' : 'razorpay',
      status: item.status,
      balance: item.details?.balance || 0,
      category: item.type,
      invoiceAvailable: true,
      orderId: item.details?.orderId
    }));

  // ========== FILTER OPTIONS ==========
  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'success', label: 'Success' },
    { value: 'pending', label: 'Pending' },
    { value: 'failed', label: 'Failed' }
  ];

  const methodOptions = [
    { value: 'all', label: 'All Methods' },
    { value: 'razorpay', label: 'Razorpay' },
    { value: 'upi', label: 'UPI' },
    { value: 'card', label: 'Card' },
    { value: 'netbanking', label: 'Net Banking' },
    { value: 'wallet', label: 'Wallet' },
    { value: 'promo', label: 'Promo' }
  ];

  const dateOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'custom', label: 'Custom Range' }
  ];

  // ========== FILTER PAYMENTS ==========
  const filteredPayments = paymentHistory.filter(payment => {
    // Status filter
    if (filterStatus !== 'all' && payment.status !== filterStatus) return false;
    
    // Method filter
    if (filterMethod !== 'all' && payment.methodType !== filterMethod) return false;
    
    // Date filter
    if (dateFilter !== 'all') {
      const paymentDate = new Date(payment.date.split(' ').reverse().join('-'));
      const today = new Date();
      
      if (dateFilter === 'today') {
        if (paymentDate.toDateString() !== today.toDateString()) return false;
      } else if (dateFilter === 'week') {
        const weekAgo = new Date(today.setDate(today.getDate() - 7));
        if (paymentDate < weekAgo) return false;
      } else if (dateFilter === 'month') {
        const monthAgo = new Date(today.setMonth(today.getMonth() - 1));
        if (paymentDate < monthAgo) return false;
      }
    }
    
    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      return (
        payment.transactionId.toLowerCase().includes(term) ||
        payment.description.toLowerCase().includes(term) ||
        payment.id.toLowerCase().includes(term)
      );
    }
    
    return true;
  });

  // ========== PAGINATION LOGIC ==========
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPayments = filteredPayments.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // ========== PROFESSIONAL PAGINATION FUNCTION ==========
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);
      
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);
      
      if (currentPage <= 3) {
        start = 2;
        end = 4;
      } else if (currentPage >= totalPages - 2) {
        start = totalPages - 3;
        end = totalPages - 1;
      }
      
      if (start > 2) {
        pageNumbers.push('ellipsis1');
      }
      
      for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
      }
      
      if (end < totalPages - 1) {
        pageNumbers.push('ellipsis2');
      }
      
      pageNumbers.push(totalPages);
    }
    
    return pageNumbers;
  };

  // ========== STATUS STYLING FUNCTIONS ==========
  const getStatusStyle = (status) => {
    const base = "px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1 w-fit";
    switch(status) {
      case 'success':
        return `${base} bg-green-100 text-green-700`;
      case 'pending':
        return `${base} bg-amber-50 text-amber-600`;
      case 'failed':
        return `${base} bg-red-50 text-red-600`;
      default:
        return `${base} bg-gray-100 text-gray-600`;
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'success':
        return <CheckCircle className="w-3 h-3" />;
      case 'pending':
        return <Clock className="w-3 h-3" />;
      case 'failed':
        return <XCircle className="w-3 h-3" />;
      default:
        return <AlertCircle className="w-3 h-3" />;
    }
  };

  const getMethodIcon = (methodType) => {
    switch(methodType) {
      case 'razorpay':
      case 'card':
        return <CreditCard className="w-4 h-4" />;
      case 'upi':
        return <Smartphone className="w-4 h-4" />;
      case 'netbanking':
        return <Landmark className="w-4 h-4" />;
      case 'wallet':
        return <Wallet className="w-4 h-4" />;
      case 'promo':
        return <Gift className="w-4 h-4" />;
      default:
        return <CreditCard className="w-4 h-4" />;
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

  // ========== HANDLER FUNCTIONS ==========
  const handleViewTransaction = (transaction) => {
    setSelectedTransaction(transaction);
    setShowTransactionModal(true);
  };

 const handleDownloadInvoice = (txId) => {
  if (!printRef.current) {
    toast.error("Invoice not ready. Open transaction first.");
    return;
  }

  const element = printRef.current;

  const opt = {
    margin: 10,
    filename: `Invoice-${txId}.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
  };

  html2pdf()
    .set(opt)
    .from(element)
    .save()
    .then(() => {
      toast.success(`📄 Invoice ${txId} downloaded`);
    })
    .catch(() => {
      toast.error("PDF generation failed");
    });
};


  const handlePrintInvoice = (txId) => {
    toast.success(`🖨️ Printing invoice for ${txId}`);
    handlePrint();
  };

  // print logic
  const handlePrint = useReactToPrint({
      contentRef:printRef,
      documentTitle:"Invoice PDF print",
    });

  const handleMakePayment = () => {
    setShowPaymentModal(true);
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

  const handleProcessPayment = () => {
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

  const handleCopyTransactionId = (txId) => {
    navigator.clipboard.writeText(txId)
    .then(()=>{
     toast.success('✅ Transaction ID copied!');
    })
    .catch(()=>{
      toast.error("Failed to copy!");
    })
    
  };

  const handleClearFilters = () => {
    setFilterStatus('all');
    setFilterMethod('all');
    setDateFilter('all');
    setSearchTerm('');
    setCurrentPage(1); // Reset to first page
    toast.info('Filters cleared');
  };

  // Loading Spinner
  const LoadingSpinner = () => (
    <div className="animate-spin">
      <Loader className="w-4 h-4" />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ========== HEADER ========== */}
      <div className="bg-gradient-to-r from-amber-100/50 via-amber-200/30 to-amber-300/40 px-3 py-1.5 border border-amber-200 mb-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <div className="text-left sm:text-left flex items-end gap-2">
            <div>
              <h1 className="text-lg sm:text-xl md:text-2xl lg:text-[25px] font-semibold text-amber-900 uppercase leading-tight flex  items-center gap-2">
                <CreditCard className="w-[23px] h-[23px] text-amber-600" />
                Payments
              </h1>
              <p className="sm:hidden text-sm text-gray-600 mt-0.5">
                Manage your payments & transactions
              </p>
            </div>
            <p className="hidden sm:block text-sm text-gray-600 mb-0.5">
              Wallet • Payment History • Transactions
            </p>
          </div>

          {/* Time Filter Tabs */}
          <div className="flex gap-1 border border-gray-200 rounded-lg p-1 bg-white w-fit sm:w-auto">
            {['day', 'week', 'month', 'year'].map((time) => (
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

        {/* ========== A) WALLET / BALANCE OVERVIEW ========== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Available Balance */}
          <div className="bg-gradient-to-br from-amber-100 to-yellow-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-white/50 rounded-lg">
                <Wallet className="w-5 h-5 text-amber-700" />
              </div>
              <span className="text-xs text-amber-800">Available Balance</span>
            </div>
            <p className="text-3xl font-bold text-amber-900">{formatCurrency(walletData.availableBalance)}</p>
            <button
              onClick={() => setShowAddMoneyModal(true)}
              className="mt-2 text-xs bg-white/50 text-amber-700 px-2 py-1 rounded-lg hover:bg-white/80 transition-colors flex items-center gap-1 w-fit"
            >
              <Plus className="w-3 h-3" />
              Add Money
            </button>
          </div>

          {/* Total Spent */}
          <div className="bg-white rounded-lg border border-gray-200 hover:border-amber-300 transition-colors p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-red-50 rounded-lg">
                <ArrowUpRight className="w-5 h-5 text-red-600" />
              </div>
              <span className="text-xs text-gray-600">Total Spent</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">{formatCurrency(walletData.totalSpent)}</p>
            <p className="text-xs text-gray-500 mt-1">Last {selectedTime}</p>
          </div>

          {/* Total Paid */}
          <div className="bg-white rounded-lg border border-gray-200 hover:border-amber-300 transition-colors p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-green-50 rounded-lg">
                <ArrowDownLeft className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-xs text-gray-600">Total Paid</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">{formatCurrency(walletData.totalPaid)}</p>
            <p className="text-xs text-gray-500 mt-1">Including all credits</p>
          </div>
        </div>

        {/* Quick Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-white rounded-lg border border-gray-200 p-3">
            <p className="text-xs text-gray-500">Pending Payments</p>
            <p className="text-lg font-bold text-amber-600">{formatCurrency(walletData.pendingPayments)}</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-3">
            <p className="text-xs text-gray-500">Total Credits</p>
            <p className="text-lg font-bold text-green-600">{formatCurrency(walletData.totalCredits)}</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-3">
            <p className="text-xs text-gray-500">Transactions</p>
            <p className="text-lg font-bold text-gray-800">{paymentHistory.length}</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-3">
            <p className="text-xs text-gray-500">Success Rate</p>
            <p className="text-lg font-bold text-green-600">
              {Math.round((paymentHistory.filter(p => p.status === 'success').length / paymentHistory.length) * 100)}%
            </p>
          </div>
        </div>

        {/* ========== C) MAKE PAYMENT BUTTON ========== */}
        <div className="bg-gradient-to-r from-amber-600 to-yellow-600 rounded-lg p-4 text-white">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-white/80" />
              <div>
                <h3 className="text-base font-bold">Secure Payment Gateway</h3>
                <p className="text-xs text-white/80">100% secure transactions • UPI • Card • NetBanking</p>
              </div>
            </div>
            <button
              onClick={handleMakePayment}
              className="px-6 py-2 bg-white text-amber-700 rounded-lg hover:bg-gray-100 transition-colors font-medium flex items-center gap-2"
            >
              <CreditCard className="w-4 h-4" />
              Make Payment
            </button>
          </div>
        </div>

        {/* ========== FILTERS SECTION ========== */}
        <div className="bg-white rounded-lg border border-gray-200 hover:border-amber-300 transition-colors p-3">
          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative flex-1 min-w-[200px]">
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // Reset to first page
                }}
                className="w-full pl-8 pr-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-amber-300"
              />
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2" />
              {searchTerm && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setCurrentPage(1); // Reset to first page
                  }}
                  className="absolute right-2 top-2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => {
                setFilterStatus(e.target.value);
                setCurrentPage(1); // Reset to first page
              }}
              className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-amber-300 bg-white"
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>

            {/* Method Filter */}
            <select
              value={filterMethod}
              onChange={(e) => {
                setFilterMethod(e.target.value);
                setCurrentPage(1); // Reset to first page
              }}
              className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-amber-300 bg-white"
            >
              {methodOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>

            {/* Date Filter */}
            <select
              value={dateFilter}
              onChange={(e) => {
                setDateFilter(e.target.value);
                setCurrentPage(1); // Reset to first page
              }}
              className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-amber-300 bg-white"
            >
              {dateOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>

            {/* Clear Filters */}
            {(filterStatus !== 'all' || filterMethod !== 'all' || dateFilter !== 'all' || searchTerm) && (
              <button
                onClick={handleClearFilters}
                className="px-3 py-1.5 text-xs bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 flex items-center gap-1"
              >
                <X className="w-3 h-3" />
                Clear
              </button>
            )}
          </div>
        </div>

        {/* ========== B) PAYMENT HISTORY TABLE ========== */}
        <div className="bg-white rounded-lg border border-gray-200 hover:border-amber-300 transition-colors overflow-hidden">
          <div className="p-3 border-b border-gray-200 bg-gradient-to-r from-amber-50/50 to-transparent">
            <h3 className="text-[15px] font-bold text-gray-800 flex items-center gap-2">
              <History className="w-4 h-4 text-amber-600" />
              Payment History
              <span className="text-xs font-normal text-gray-500 ml-2">
                ({filteredPayments.length} transactions)
              </span>
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredPayments.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-4 py-8 text-center text-gray-500">
                      <CreditCard className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-sm font-medium text-gray-600">No transactions found</p>
                      <p className="text-xs text-gray-500 mt-1">Try changing your filters</p>
                    </td>
                  </tr>
                ) : (
                  currentPayments.map((payment) => ( // Changed from filteredPayments to currentPayments
                    <tr 
                      key={payment.id} 
                      className="hover:bg-amber-50/30 transition-colors cursor-pointer"
                      onClick={() => handleViewTransaction(payment)}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-medium text-amber-600">{payment.transactionId}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCopyTransactionId(payment.transactionId);
                            }}
                            className="text-gray-400 hover:text-amber-600"
                          >
                            <Copy className="w-3 h-3" />
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-sm text-gray-600">{payment.date}</div>
                        <div className="text-xs text-gray-400">{payment.time}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-sm font-medium text-gray-800">{payment.description}</div>
                        <div className="text-xs text-gray-500">
                          {payment.type === 'credit' ? 'Credit' : 'Debit'} • {payment.category}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-sm font-bold ${payment.type === 'credit' ? 'text-green-600' : 'text-gray-900'}`}>
                          {payment.type === 'credit' ? '+' : '-'}{formatCurrency(payment.amount)}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <div className="p-1 bg-gray-100 rounded">
                            {getMethodIcon(payment.methodType)}
                          </div>
                          <span className="text-xs text-gray-600">{payment.method}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className={getStatusStyle(payment.status)}>
                          {getStatusIcon(payment.status)}
                          <span className="capitalize">{payment.status}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => handleViewTransaction(payment)}
                            className="p-1 text-amber-600 hover:bg-amber-50 rounded"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          {payment.invoiceAvailable && (
                            <button
                              onClick={() => handleDownloadInvoice(payment.id)}
                              className="p-1 text-amber-600 hover:bg-amber-50 rounded"
                              title="Download Invoice"
                            >
                              <Download className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* ========== PROFESSIONAL PAGINATION ========== */}
          {filteredPayments.length > 0 && totalPages > 1 && (
            <div className="px-4 py-3 border-t border-gray-200 bg-gray-50 flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-xs text-gray-500">
                Page {currentPage} of {totalPages}
              </p>
              <div className="flex items-center gap-1">
                {/* Previous Button */}
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 text-xs rounded-lg flex items-center gap-1 transition-colors ${
                    currentPage === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white border border-gray-200 hover:bg-gray-50 text-gray-600'
                  }`}
                >
                  <ChevronLeft className="w-3 h-3" />
                  Previous
                </button>
                
                {/* Page Numbers with Ellipsis */}
                {getPageNumbers().map((page, index) => {
                  if (page === 'ellipsis1' || page === 'ellipsis2') {
                    return (
                      <span
                        key={page}
                        className="px-2 py-1 text-xs text-gray-400"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </span>
                    );
                  }
                  
                  return (
                    <button
                      key={index}
                      onClick={() => paginate(page)}
                      className={`px-3 py-1 text-xs rounded-lg transition-colors ${
                        currentPage === page
                          ? 'bg-amber-500 text-white hover:bg-amber-600'
                          : 'bg-white border border-gray-200 hover:bg-gray-50 text-gray-600'
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
                
                {/* Next Button */}
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 text-xs rounded-lg flex items-center gap-1 transition-colors ${
                    currentPage === totalPages
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white border border-gray-200 hover:bg-gray-50 text-gray-600'
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ========== PAYMENT METHODS SUMMARY ========== */}
       <div className="bg-white rounded-lg border border-gray-200 hover:border-amber-300 transition-colors p-2 sm:p-3">
  <h3 className="text-sm sm:text-[15px] font-bold text-gray-800 mb-2 flex items-center gap-1 sm:gap-2">
    <CreditCard className="w-3 h-3 sm:w-4 sm:h-4 text-amber-600" />
    <span>Available Payment Methods</span>
  </h3>
  
  {/* Grid - Mobile: 1 column, Tablet: 2 columns, Desktop: 4 columns (UNCHANGED) */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
    {paymentMethods.map((method) => (
      <div key={method.id} className="p-1.5 border border-gray-200 rounded-lg hover:border-amber-300 transition-colors">
        <div className="flex items-center gap-2">
          {/* Icon - slightly smaller on mobile */}
          <div className="p-1 sm:p-1.5 bg-amber-50 rounded-lg shrink-0">
            <div className="[&>svg]:w-3 [&>svg]:h-3 sm:[&>svg]:w-4 sm:[&>svg]:h-4">
              {method.icon}
            </div>
          </div>
          
          {/* Text - stack on mobile, side by side on desktop */}
          <div className="flex-1 min-w-0">
            <p className="text-xs sm:text-sm font-semibold text-gray-800 truncate">{method.name}</p>
            {/* Hide description on mobile, show on tablet/desktop */}
            <p className="hidden sm:block text-xs text-gray-500 truncate">{method.description}</p>
            {/* Show shortened description on mobile? Optional */}
            <p className="sm:hidden text-[10px] text-gray-500 truncate">
              {method.description.split(',')[0]}
            </p>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

        {/* ========== SECURITY FOOTER ========== */}
        <div className="bg-gradient-to-r from-amber-100/50 via-amber-200/30 to-amber-300/40 rounded-lg border border-amber-200 p-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-amber-600" />
              <div>
                <h4 className="text-xs font-semibold text-gray-800">Secure Transactions</h4>
                <p className="text-xs text-gray-600">Your payment information is encrypted and secure</p>
              </div>
            </div>
            
            <button 
              className="px-3 py-1.5 text-xs bg-white text-gray-800 rounded-lg border border-gray-300 hover:bg-gray-50 flex items-center gap-1 cursor-pointer transition-colors"
              onClick={() => toast.info('Downloading payment statement...')}
            >
              <Download className="w-3 h-3" />
              Download Statement
            </button>
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
              <p className="text-2xl font-bold text-amber-700">{formatCurrency(walletData.availableBalance)}</p>
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
              {[500, 1000, 2000, 5000].map((amount) => (
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
              <p className="text-xs text-amber-600">Available Balance</p>
              <p className="text-2xl font-bold text-amber-700">{formatCurrency(walletData.availableBalance)}</p>
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
              {[500, 1000, 2000, 5000].map((amount) => (
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
                onClick={handleProcessPayment}
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

            <p className="text-xs text-gray-500 text-center mt-3 flex items-center justify-center gap-1">
              <Shield className="w-3 h-3" />
              Secure payment powered by Razorpay
            </p>
          </div>
        </div>
      )}

      {/* ========== TRANSACTION DETAILS MODAL ========== */}
      {showTransactionModal && selectedTransaction && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-800">Transaction Details</h3>
              <button
                onClick={() => setShowTransactionModal(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div ref={printRef} className="space-y-4 print:m-3 print:p-5 print:border print:border-orange-500/30 print:rounded-md">
              {/* Status & Type */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`p-2 ${selectedTransaction.type === 'credit' ? 'bg-green-50' : 'bg-red-50'} rounded-lg`}>
                    {selectedTransaction.type === 'credit' ? 
                      <ArrowDownLeft className="w-4 h-4 text-green-600" /> : 
                      <ArrowUpRight className="w-4 h-4 text-red-600" />
                    }
                  </div>
                  <span className="text-sm font-medium text-gray-600">
                    {selectedTransaction.type === 'credit' ? 'Credit' : 'Debit'}
                  </span>
                </div>
                <span className={getStatusStyle(selectedTransaction.status)}>
                  {getStatusIcon(selectedTransaction.status)}
                  <span className="capitalize">{selectedTransaction.status}</span>
                </span>
              </div>

              {/* Amount */}
              <div className={`p-4 rounded-lg ${selectedTransaction.type === 'credit' ? 'bg-green-50' : 'bg-red-50'}`}>
                <p className="text-xs text-gray-600 mb-1">Amount</p>
                <p className={`text-2xl font-bold ${selectedTransaction.type === 'credit' ? 'text-green-700' : 'text-red-700'}`}>
                  {selectedTransaction.type === 'credit' ? '+' : '-'}{formatCurrency(selectedTransaction.amount)}
                </p>
              </div>

              {/* Transaction Details */}
              <div className="border border-gray-200 rounded-lg p-3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Transaction ID</span>
                  <div className="flex items-center gap-1">
                    <span className="text-gray-800 font-medium">{selectedTransaction.transactionId}</span>
                    <button
                      onClick={() => handleCopyTransactionId(selectedTransaction.transactionId)}
                      className="text-gray-400 hover:text-amber-600"
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Description</span>
                  <span className="text-gray-800">{selectedTransaction.description}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Date & Time</span>
                  <span className="text-gray-800">{selectedTransaction.date} • {selectedTransaction.time}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Payment Method</span>
                  <div className="flex items-center gap-1">
                    <div className="p-1 bg-gray-100 rounded">
                      {getMethodIcon(selectedTransaction.methodType)}
                    </div>
                    <span className="text-gray-800">{selectedTransaction.method}</span>
                  </div>
                </div>
                {selectedTransaction.upiId && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">UPI ID</span>
                    <span className="text-gray-800">{selectedTransaction.upiId}</span>
                  </div>
                )}
                {selectedTransaction.cardLast4 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Card</span>
                    <span className="text-gray-800">•••• {selectedTransaction.cardLast4}</span>
                  </div>
                )}
                {selectedTransaction.promoCode && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Promo Code</span>
                    <span className="text-purple-600 font-medium">{selectedTransaction.promoCode}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm pt-2 border-t border-gray-200">
                  <span className="text-gray-600">Balance After</span>
                  <span className="text-gray-800 font-bold">{formatCurrency(selectedTransaction.balance)}</span>
                </div>
              </div>

              {/* Failure Reason */}
              {selectedTransaction.failureReason && (
                <div className="bg-red-50 p-3 rounded-lg">
                  <p className="text-xs text-red-600 mb-1">Failure Reason</p>
                  <p className="text-sm text-red-700">{selectedTransaction.failureReason}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-2 print:hidden">
                {selectedTransaction.invoiceAvailable && (
                  <button
                 onClick={() => {
                 handleDownloadInvoice(selectedTransaction.id);
               }}
                    className="bg-amber-500 text-white py-2 rounded-lg hover:bg-amber-600 flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Invoice
                  </button>
                )}
                <button
                  onClick={() => handlePrintInvoice(selectedTransaction.id)}
                  className="bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 flex items-center justify-center gap-2"
                >
                  <Printer className="w-4 h-4" />
                  Print
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPayments;