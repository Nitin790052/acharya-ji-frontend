import React, { useState } from 'react';
import VendorPageHeader from '../../../components/VendorPageHeader';

import {
  // Core Icons
  Wallet,
  IndianRupee,
  TrendingUp,
  TrendingDown,
  Download,
  Upload,
  Clock,
  CheckCircle2,
  AlertCircle,
  Landmark,
  CreditCard,
  FileText,
  ChevronRight,
  Filter,
  CalendarDays,
  ArrowUpRight,
  ArrowDownLeft,
  Bell,
  Search,
  X,
  Save,
  Eye,
  Copy,
  PlusCircle,
  RefreshCw
} from 'lucide-react';

const WalletManagement = () => {
  const [filter, setFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [dateRange, setDateRange] = useState('month');

  // ============ WALLET DATA ============
  const [walletData, setWalletData] = useState({
    totalEarnings: 284500,
    availableBalance: 125000,
    pendingSettlement: 45000,
    totalWithdrawn: 159500,
    lifetimeEarnings: 1250000,
    thisMonthEarnings: 356000,
    lastMonthEarnings: 289000
  });

  // ============ TRANSACTIONS DATA ============
  const [transactions, setTransactions] = useState([
    {
      id: 'TXN-1001',
      type: 'donation',
      category: 'General Donation',
      amount: 5100,
      status: 'success',
      date: '22 Feb 2026',
      time: '11:30 AM',
      devotee: 'Rajesh Kumar',
      paymentMode: 'UPI',
      reference: 'UPI-123456789',
      receiptNo: 'RCT-2026-1001',
      balance: 125000,
      read: false,
      priority: 'medium'
    },
    {
      id: 'TXN-1002',
      type: 'seva',
      category: 'Annadanam Seva',
      amount: 1100,
      status: 'success',
      date: '22 Feb 2026',
      time: '10:23 AM',
      devotee: 'Priya Sharma',
      paymentMode: 'Card',
      reference: 'CARD-987654321',
      receiptNo: 'RCT-2026-1002',
      balance: 119900,
      read: true,
      priority: 'medium'
    },
    {
      id: 'TXN-1003',
      type: 'withdrawal',
      category: 'Bank Transfer',
      amount: 15000,
      status: 'processing',
      date: '21 Feb 2026',
      time: '02:30 PM',
      bank: 'ICICI Bank',
      accountNo: 'XXXX1234',
      reference: 'WDL-2026-001',
      balance: 110000,
      read: false,
      priority: 'high'
    },
    {
      id: 'TXN-1004',
      type: 'donation',
      category: 'Temple Renovation',
      amount: 2001,
      status: 'success',
      date: '21 Feb 2026',
      time: '11:15 AM',
      devotee: 'Amit Patel',
      paymentMode: 'NetBanking',
      reference: 'NEFT-567890123',
      receiptNo: 'RCT-2026-1003',
      balance: 125000,
      read: true,
      priority: 'low'
    },
    {
      id: 'TXN-1005',
      type: 'refund',
      category: 'Booking Cancellation',
      amount: 750,
      status: 'completed',
      date: '20 Feb 2026',
      time: '04:20 PM',
      devotee: 'Sneha Reddy',
      paymentMode: 'UPI',
      reference: 'REF-789012345',
      receiptNo: 'RCT-2026-1004',
      balance: 123000,
      read: false,
      priority: 'medium'
    },
    {
      id: 'TXN-1006',
      type: 'withdrawal',
      category: 'Bank Transfer',
      amount: 25000,
      status: 'completed',
      date: '18 Feb 2026',
      time: '10:15 AM',
      bank: 'ICICI Bank',
      accountNo: 'XXXX1234',
      reference: 'WDL-2026-002',
      balance: 125000,
      read: true,
      priority: 'medium'
    },
    {
      id: 'TXN-1007',
      type: 'donation',
      category: 'Corpus Fund',
      amount: 15000,
      status: 'success',
      date: '18 Feb 2026',
      time: '09:30 AM',
      devotee: 'Anita Desai',
      paymentMode: 'NEFT',
      reference: 'NEFT-890123456',
      receiptNo: 'RCT-2026-1005',
      balance: 150000,
      read: false,
      priority: 'critical'
    }
  ]);

  // ============ SETTLEMENTS DATA ============
  const [settlements, setSettlements] = useState([
    {
      id: 'SET-001',
      amount: 25000,
      date: '20 Feb 2026',
      status: 'completed',
      reference: 'WDL-2026-001',
      bank: 'ICICI Bank',
      accountNo: 'XXXX1234',
      utr: 'ICIC123456789',
      processedOn: '20 Feb 2026, 03:30 PM'
    },
    {
      id: 'SET-002',
      amount: 15000,
      date: '18 Feb 2026',
      status: 'completed',
      reference: 'WDL-2026-002',
      bank: 'ICICI Bank',
      accountNo: 'XXXX1234',
      utr: 'ICIC987654321',
      processedOn: '18 Feb 2026, 04:15 PM'
    },
    {
      id: 'SET-003',
      amount: 12000,
      date: '15 Feb 2026',
      status: 'completed',
      reference: 'WDL-2026-003',
      bank: 'ICICI Bank',
      accountNo: 'XXXX1234',
      utr: 'ICIC567890123',
      processedOn: '15 Feb 2026, 02:45 PM'
    },
    {
      id: 'SET-004',
      amount: 45000,
      date: '22 Feb 2026',
      status: 'pending',
      reference: 'WDL-2026-004',
      bank: 'ICICI Bank',
      accountNo: 'XXXX1234',
      utr: 'Pending',
      processedOn: 'Scheduled for 24 Feb'
    }
  ]);

  // ============ BANK DETAILS ============
  const [bankDetails] = useState({
    bankName: 'ICICI Bank',
    accountNo: '123456789012',
    maskedAccount: 'XXXX XXXX 9012',
    ifsc: 'ICIC001234',
    accountName: 'Shri Ram Mandir Trust',
    accountType: 'Current',
    upiId: 'rammandir@icici',
    branch: 'Juhu Branch, Mumbai'
  });

  // ============ STATS ============
  const stats = {
    totalEarnings: walletData.totalEarnings,
    availableBalance: walletData.availableBalance,
    pendingSettlement: walletData.pendingSettlement,
    totalWithdrawn: walletData.totalWithdrawn,
    thisMonthEarnings: walletData.thisMonthEarnings,
    lastMonthEarnings: walletData.lastMonthEarnings,
    growth: ((walletData.thisMonthEarnings - walletData.lastMonthEarnings) / walletData.lastMonthEarnings * 100).toFixed(1),
    totalTransactions: transactions.length,
    successfulTransactions: transactions.filter(t => t.status === 'success' || t.status === 'completed').length,
    pendingTransactions: transactions.filter(t => t.status === 'processing' || t.status === 'pending').length
  };

  // ============ UNREAD COUNT ============
  const unreadCount = transactions.filter(t => !t.read).length;

  // ============ EXACT MATCH to NotificationsPuja ============
  const getTransactionIcon = (type) => {
    switch(type) {
      case 'donation':
        return <ArrowDownLeft className="w-5 h-5 text-green-600" />;
      case 'seva':
        return <ArrowDownLeft className="w-5 h-5 text-orange-500" />;
      case 'withdrawal':
        return <ArrowUpRight className="w-5 h-5 text-purple-600" />;
      case 'refund':
        return <ArrowUpRight className="w-5 h-5 text-red-500" />;
      default:
        return <IndianRupee className="w-5 h-5 text-gray-500" />;
    }
  };

  const getTypeStyles = (type) => {
    const base = "px-2 py-0.5 rounded-full text-xs font-medium";
    switch(type) {
      case 'donation':
        return `${base} bg-green-50 text-green-700`;
      case 'seva':
        return `${base} bg-orange-50 text-orange-500`;
      case 'withdrawal':
        return `${base} bg-purple-50 text-purple-600`;
      case 'refund':
        return `${base} bg-red-50 text-red-700`;
      default:
        return `${base} bg-gray-100 text-gray-600`;
    }
  };

  const getStatusStyles = (status) => {
    const base = "px-2 py-0.5 rounded-full text-xs font-medium";
    switch(status) {
      case 'success':
      case 'completed':
        return `${base} bg-green-50 text-green-700`;
      case 'processing':
      case 'pending':
        return `${base} bg-orange-50 text-orange-500`;
      case 'failed':
        return `${base} bg-red-50 text-red-700`;
      default:
        return `${base} bg-gray-100 text-gray-600`;
    }
  };

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

  // ============ HANDLE ACTIONS ============
  const handleAction = (action, transaction = null) => {
    setIsLoading(true);
    
    switch(action) {
      case 'withdraw':
        setShowWithdrawModal(true);
        break;
      
      case 'viewDetails':
        setSelectedTransaction(transaction);
        setShowDetailsModal(true);
        break;
      
      case 'downloadReceipt':
        console.log('Downloading receipt for:', transaction?.receiptNo);
        break;
      
      case 'copyReference':
        navigator.clipboard?.writeText(transaction?.reference || '');
        break;
      
      case 'markAsRead':
        setTransactions(prev => prev.map(t => 
          t.id === transaction.id ? { ...t, read: true } : t
        ));
        break;
      
      case 'refresh':
        console.log('Refreshing wallet data');
        break;
      
      case 'export':
        console.log('Exporting transactions');
        break;
    }
    
    setTimeout(() => setIsLoading(false), 500);
  };

  // ============ HANDLE WITHDRAW ============
  const handleWithdraw = (amount) => {
    setIsLoading(true);
    setTimeout(() => {
      setWalletData(prev => ({
        ...prev,
        availableBalance: prev.availableBalance - amount,
        pendingSettlement: prev.pendingSettlement + amount,
        totalWithdrawn: prev.totalWithdrawn + amount
      }));
      
      setTransactions(prev => [{
        id: `TXN-${Date.now()}`,
        type: 'withdrawal',
        category: 'Bank Transfer',
        amount: amount,
        status: 'processing',
        date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
        time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        bank: bankDetails.bankName,
        accountNo: bankDetails.maskedAccount,
        reference: `WDL-${Date.now()}`,
        balance: walletData.availableBalance - amount,
        read: false,
        priority: 'high'
      }, ...prev]);
      
      setSettlements(prev => [{
        id: `SET-${String(prev.length + 1).padStart(3, '0')}`,
        amount: amount,
        date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
        status: 'pending',
        reference: `WDL-${Date.now()}`,
        bank: bankDetails.bankName,
        accountNo: bankDetails.maskedAccount,
        utr: 'Pending',
        processedOn: 'Scheduled for 2-3 business days'
      }, ...prev]);
      
      setShowWithdrawModal(false);
      setIsLoading(false);
    }, 1500);
  };

  // ============ FILTER TRANSACTIONS ============
  const filteredTransactions = transactions.filter(t => {
    if (filter === 'all') return true;
    if (filter === 'donation') return t.type === 'donation';
    if (filter === 'seva') return t.type === 'seva';
    if (filter === 'withdrawal') return t.type === 'withdrawal';
    if (filter === 'refund') return t.type === 'refund';
    if (filter === 'success') return t.status === 'success' || t.status === 'completed';
    if (filter === 'pending') return t.status === 'processing' || t.status === 'pending';
    return true;
  }).filter(t => {
    if (!searchQuery) return true;
    return (
      t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.devotee?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.reference?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.receiptNo?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // ============ WITHDRAW MODAL - EXACT match ============
  const WithdrawModal = () => {
    const [amount, setAmount] = useState('');
    const [selectedAmount, setSelectedAmount] = useState('');

    const presetAmounts = [5000, 10000, 25000, 50000];

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg w-full max-w-md">
          {/* Modal Header - EXACT match */}
          <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 px-4 py-3 border-b border-orange-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-orange-50 rounded flex items-center justify-center">
                  <Upload className="w-5 h-5 text-orange-500" />
                </div>
                <h3 className="text-[15px] font-bold text-gray-800">
                  Withdraw Funds
                </h3>
              </div>
              <button 
                onClick={() => setShowWithdrawModal(false)}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Modal Content */}
          <div className="p-6 space-y-4">
            {/* Available Balance */}
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-600">Available Balance</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">
                ₹{walletData.availableBalance.toLocaleString('en-IN')}
              </p>
            </div>

            {/* Amount Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Amount (₹) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <IndianRupee className="w-4 h-4 text-gray-400" />
                </div>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                    setSelectedAmount(e.target.value);
                  }}
                  placeholder="Enter amount"
                  max={walletData.availableBalance}
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm"
                />
              </div>
            </div>

            {/* Preset Amounts */}
            <div>
              <p className="text-xs text-gray-600 mb-2">Quick select</p>
              <div className="flex flex-wrap gap-2">
                {presetAmounts.map((preset) => (
                  <button
                    key={preset}
                    onClick={() => {
                      setAmount(preset.toString());
                      setSelectedAmount(preset.toString());
                    }}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                      selectedAmount === preset.toString()
                        ? 'bg-orange-50 text-orange-500 border-orange-300'
                        : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                    }`}
                  >
                    ₹{preset.toLocaleString('en-IN')}
                  </button>
                ))}
              </div>
            </div>

            {/* Bank Account */}
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <Landmark className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-medium text-blue-700">Withdraw to</span>
              </div>
              <p className="text-sm font-medium text-gray-800">{bankDetails.accountName}</p>
              <p className="text-xs text-gray-600 mt-1">
                {bankDetails.bankName} • {bankDetails.maskedAccount}
              </p>
              <p className="text-xs text-gray-600">IFSC: {bankDetails.ifsc}</p>
            </div>

            {/* Modal Actions - EXACT match */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={() => setShowWithdrawModal(false)}
                className="px-4 py-2 text-sm bg-gray-100 text-gray-800 rounded border border-gray-300 hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleWithdraw(parseInt(amount))}
                disabled={!amount || parseInt(amount) < 100 || parseInt(amount) > walletData.availableBalance}
                className={`px-4 py-2 text-sm text-white rounded flex items-center gap-2 transition-colors ${
                  !amount || parseInt(amount) < 100 || parseInt(amount) > walletData.availableBalance
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-orange-500 hover:bg-orange-600'
                }`}
              >
                <Upload className="w-4 h-4" />
                Withdraw
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ============ TRANSACTION DETAILS MODAL ============
  const TransactionDetailsModal = () => {
    if (!showDetailsModal || !selectedTransaction) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          {/* Modal Header - EXACT match */}
          <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 px-4 py-3 border-b border-orange-100 sticky top-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-orange-50 rounded flex items-center justify-center">
                  <FileText className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-gray-800">
                    Transaction Details
                  </h3>
                  <p className="text-xs text-gray-600 mt-0.5">{selectedTransaction.id}</p>
                </div>
              </div>
              <button 
                onClick={() => setShowDetailsModal(false)}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Modal Content */}
          <div className="p-6 space-y-4">
            {/* Status & Amount */}
            <div className="flex items-center justify-between">
              <span className={getStatusStyles(selectedTransaction.status)}>
                {selectedTransaction.status}
              </span>
              <span className="text-2xl font-bold text-gray-900">
                ₹{selectedTransaction.amount.toLocaleString('en-IN')}
              </span>
            </div>

            {/* Transaction Details Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500">Transaction Type</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className={`p-1 rounded ${
                    selectedTransaction.type === 'donation' ? 'bg-green-50' :
                    selectedTransaction.type === 'seva' ? 'bg-orange-50' :
                    selectedTransaction.type === 'withdrawal' ? 'bg-purple-50' :
                    'bg-red-50'
                  }`}>
                    {getTransactionIcon(selectedTransaction.type)}
                  </div>
                  <span className="text-sm font-medium text-gray-800 capitalize">
                    {selectedTransaction.type}
                  </span>
                </div>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500">Category</p>
                <p className="text-sm font-medium text-gray-800 mt-1">{selectedTransaction.category}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500">Date & Time</p>
                <p className="text-sm font-medium text-gray-800 mt-1">{selectedTransaction.date}</p>
                <p className="text-xs text-gray-600">{selectedTransaction.time}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500">Reference</p>
                <div className="flex items-center gap-1 mt-1">
                  <p className="text-sm font-medium text-gray-800">{selectedTransaction.reference}</p>
                  <button 
                    onClick={() => handleAction('copyReference', selectedTransaction)}
                    className="p-1 text-gray-400 hover:text-gray-600"
                  >
                    <Copy className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* Donor/Bank Details */}
            {selectedTransaction.devotee ? (
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500 mb-2">Donor Details</p>
                <p className="text-sm font-medium text-gray-800">{selectedTransaction.devotee}</p>
                <p className="text-xs text-gray-600 mt-1">Payment: {selectedTransaction.paymentMode}</p>
                {selectedTransaction.receiptNo && (
                  <p className="text-xs text-gray-600 mt-1">Receipt: {selectedTransaction.receiptNo}</p>
                )}
              </div>
            ) : (
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500 mb-2">Bank Details</p>
                <p className="text-sm font-medium text-gray-800">{selectedTransaction.bank}</p>
                <p className="text-xs text-gray-600 mt-1">A/C: {selectedTransaction.accountNo}</p>
                <p className="text-xs text-gray-600 mt-1">Ref: {selectedTransaction.reference}</p>
              </div>
            )}

            {/* Balance Info */}
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-xs text-blue-700">Balance after transaction</p>
              <p className="text-lg font-bold text-gray-800 mt-1">
                ₹{selectedTransaction.balance?.toLocaleString('en-IN') || walletData.availableBalance.toLocaleString('en-IN')}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200">
              {selectedTransaction.receiptNo && (
                <button
                  onClick={() => handleAction('downloadReceipt', selectedTransaction)}
                  className="px-3 py-1.5 text-sm bg-orange-50 text-orange-500 rounded border border-orange-300 hover:bg-orange-100 flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download Receipt
                </button>
              )}
              {!selectedTransaction.read && (
                <button
                  onClick={() => {
                    handleAction('markAsRead', selectedTransaction);
                    setShowDetailsModal(false);
                  }}
                  className="px-3 py-1.5 text-sm bg-gray-100 text-gray-800 rounded border border-gray-300 hover:bg-gray-200 flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Mark as Read
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Loading Overlay - EXACT match */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm text-gray-700">Processing...</p>
          </div>
        </div>
      )}

      <VendorPageHeader 
        title="WALLET & TRANSACTIONS" 
        subtitle="Manage temple finances and withdrawals" 
      />


      {/* Main Content - EXACT spacing */}
      <div className="space-y-4 p-6">
        {/* Welcome Section - EXACT match */}
        <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg px-3 py-2 border border-orange-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <p className="text-[18px] text-gray-600">
                Total Earnings: ₹{stats.totalEarnings.toLocaleString('en-IN')}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm text-gray-600">This Month</p>
                <p className="text-[15px] font-semibold text-orange-500">
                  ₹{stats.thisMonthEarnings.toLocaleString('en-IN')}
                </p>
              </div>
              <div className="w-8 h-8 bg-orange-50 rounded flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-orange-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards - EXACT match */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {/* Available Balance */}
          <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg border border-gray-200 px-3 py-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Available Balance</p>
                <p className="text-xl font-semibold text-gray-800 mt-1">
                  ₹{stats.availableBalance.toLocaleString('en-IN')}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <Wallet className="w-3 h-3 text-green-600" />
                  <span className="text-sm text-green-600">Ready to withdraw</span>
                </div>
              </div>
              <div className="p-2 bg-green-50 rounded">
                <Wallet className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </div>

          {/* Pending Settlement */}
          <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg border border-gray-200 px-3 py-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Settlement</p>
                <p className="text-xl font-semibold text-gray-800 mt-1">
                  ₹{stats.pendingSettlement.toLocaleString('en-IN')}
                </p>
                <p className="text-xs text-orange-500 mt-2">Processing</p>
              </div>
              <div className="p-2 bg-orange-50 rounded">
                <Clock className="w-5 h-5 text-orange-500" />
              </div>
            </div>
          </div>

          {/* Total Withdrawn */}
          <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg border border-gray-200 px-3 py-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Withdrawn</p>
                <p className="text-xl font-semibold text-gray-800 mt-1">
                  ₹{stats.totalWithdrawn.toLocaleString('en-IN')}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <Download className="w-3 h-3 text-purple-600" />
                  <span className="text-sm text-purple-600">Lifetime</span>
                </div>
              </div>
              <div className="p-2 bg-purple-50 rounded">
                <Download className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </div>

          {/* Growth */}
          <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg border border-gray-200 px-3 py-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">vs Last Month</p>
                <p className="text-xl font-semibold text-gray-800 mt-1">
                  {stats.growth}%
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="w-3 h-3 text-green-600" />
                  <span className="text-sm text-green-600">Growth</span>
                </div>
              </div>
              <div className="p-2 bg-blue-50 rounded">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

         <div className='flex justify-end'>
          <button
              onClick={() => handleAction('refresh')}
              className="px-3 py-1.5 bg-white text-gray-700 text-sm font-medium rounded border border-gray-300 hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
        </div>

        {/* Balance Card & Withdraw Button */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-orange-100 to-amber-100 rounded-lg">
                <Landmark className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-xs text-gray-600">Current Balance</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  ₹{stats.availableBalance.toLocaleString('en-IN')}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {bankDetails.bankName} • {bankDetails.maskedAccount}
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setShowWithdrawModal(true);
              }}
              className="px-4 py-2.5 bg-orange-500 text-white text-sm font-medium rounded-lg hover:bg-orange-600 transition-colors flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              <Upload className="w-4 h-4" />
              Withdraw Funds
            </button>
          </div>
        </div>

        {/* Filter Bar - EXACT match */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            {/* Search */}
            <div className="w-full lg:w-64 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                  filter === 'all' 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All ({transactions.length})
              </button>
              <button
                onClick={() => setFilter('donation')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2 ${
                  filter === 'donation' 
                    ? 'bg-green-50 text-green-700 border border-green-300' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <ArrowDownLeft className="w-4 h-4" />
                Donations
              </button>
              <button
                onClick={() => setFilter('withdrawal')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2 ${
                  filter === 'withdrawal' 
                    ? 'bg-purple-50 text-purple-600 border border-purple-300' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <ArrowUpRight className="w-4 h-4" />
                Withdrawals
              </button>
            </div>
          </div>

          {/* Status Filters */}
          <div className="flex flex-wrap gap-2 mt-4">
            <button
              onClick={() => setFilter('success')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                filter === 'success' 
                  ? 'bg-green-50 text-green-700 border border-green-300' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Success ({stats.successfulTransactions})
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                filter === 'pending' 
                  ? 'bg-orange-50 text-orange-500 border border-orange-300' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Pending ({stats.pendingTransactions})
            </button>
            <button
              onClick={() => setDateRange('today')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                dateRange === 'today' 
                  ? 'bg-orange-500 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Today
            </button>
            <button
              onClick={() => setDateRange('week')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                dateRange === 'week' 
                  ? 'bg-orange-500 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              This Week
            </button>
            <button
              onClick={() => setDateRange('month')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                dateRange === 'month' 
                  ? 'bg-orange-500 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              This Month
            </button>
          </div>
        </div>

        {/* Transactions Table - EXACT match */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {/* Table Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-[15px] font-bold text-gray-800">Transaction History</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleAction('export')}
                  className="px-3 py-1.5 text-sm bg-gray-100 text-gray-800 rounded border border-gray-300 hover:bg-gray-200 flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Export
                </button>
                <span className="text-sm text-gray-600">{filteredTransactions.length} items</span>
              </div>
            </div>
          </div>

          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">ID</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Type</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Description</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Date & Time</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Amount</th>
                  <th className="px-8 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredTransactions.map((txn) => (
                  <tr 
                    key={txn.id} 
                    className='hover:bg-gray-50'
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-900">{txn.id}</span>
                        {!txn.read && (
                          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className={`p-1.5 rounded ${
                          txn.type === 'donation' ? 'bg-green-50' :
                          txn.type === 'seva' ? 'bg-orange-50' :
                          txn.type === 'withdrawal' ? 'bg-purple-50' :
                          'bg-red-50'
                        }`}>
                          {getTransactionIcon(txn.type)}
                        </div>
                        <span className="text-sm text-gray-900 capitalize">{txn.type}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-900">{txn.category}</span>
                        <span className="text-xs text-gray-500">
                          {txn.devotee || txn.bank || 'Bank Transfer'}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-900">{txn.date}</span>
                        <span className="text-xs text-gray-500">{txn.time}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-sm font-semibold ${
                        txn.type === 'withdrawal' || txn.type === 'refund' 
                          ? 'text-red-600' 
                          : 'text-green-600'
                      }`}>
                        {txn.type === 'withdrawal' || txn.type === 'refund' ? '-' : '+'}
                        ₹{txn.amount.toLocaleString('en-IN')}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={getStatusStyles(txn.status)}>
                        {txn.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => {
                            setSelectedTransaction(txn);
                            setShowDetailsModal(true);
                          }}
                          className="p-1.5 text-gray-600 hover:bg-orange-50 hover:text-orange-600 rounded transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {txn.receiptNo && (
                          <button
                            onClick={() => handleAction('downloadReceipt', txn)}
                            className="p-1.5 text-gray-600 hover:bg-gray-100 rounded transition-colors"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="block lg:hidden divide-y divide-gray-200">
            {filteredTransactions.map((txn) => (
              <div 
                key={txn.id} 
                className={`p-4 transition-colors ${!txn.read ? 'bg-orange-50/30' : 'hover:bg-gray-50'}`}
              >
                {/* Header Row */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded ${
                      txn.type === 'donation' ? 'bg-green-50' :
                      txn.type === 'seva' ? 'bg-orange-50' :
                      txn.type === 'withdrawal' ? 'bg-purple-50' :
                      'bg-red-50'
                    }`}>
                      {getTransactionIcon(txn.type)}
                    </div>
                    <div>
                      <span className="text-xs font-medium text-gray-500">{txn.id}</span>
                      {!txn.read && (
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-1"></div>
                      )}
                    </div>
                  </div>
                  <span className={getStatusStyles(txn.status)}>
                    {txn.status}
                  </span>
                </div>

                {/* Transaction Details */}
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-800 capitalize">{txn.type}</h4>
                    <p className="text-xs text-gray-600 mt-0.5">{txn.category}</p>
                    <p className="text-xs text-gray-500 mt-1">{txn.devotee || txn.bank}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-base font-bold ${
                      txn.type === 'withdrawal' || txn.type === 'refund' 
                        ? 'text-red-600' 
                        : 'text-green-600'
                    }`}>
                      {txn.type === 'withdrawal' || txn.type === 'refund' ? '-' : '+'}
                      ₹{txn.amount.toLocaleString('en-IN')}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{txn.date}</p>
                    <p className="text-xs text-gray-400">{txn.time}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-1 pt-2 border-t border-gray-100">
                  <button
                    onClick={() => {
                      setSelectedTransaction(txn);
                      setShowDetailsModal(true);
                    }}
                    className="px-2.5 py-1 text-xs bg-orange-50 text-orange-500 rounded border border-orange-300 hover:bg-orange-100 flex items-center gap-1"
                  >
                    <Eye className="w-3 h-3" />
                    View
                  </button>
                  {txn.receiptNo && (
                    <button
                      onClick={() => handleAction('downloadReceipt', txn)}
                      className="px-2.5 py-1 text-xs bg-gray-100 text-gray-800 rounded border border-gray-300 hover:bg-gray-200 flex items-center gap-1"
                    >
                      <Download className="w-3 h-3" />
                      Receipt
                    </button>
                  )}
                  {!txn.read && (
                    <button
                      onClick={() => handleAction('markAsRead', txn)}
                      className="px-2.5 py-1 text-xs bg-gray-100 text-gray-800 rounded border border-gray-300 hover:bg-gray-200"
                    >
                      Mark Read
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Empty State - EXACT match */}
          {filteredTransactions.length === 0 && (
            <div className="p-8 text-center">
              <div className="p-4 rounded-full inline-flex items-center justify-center mb-4 bg-gray-100">
                <IndianRupee className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium mb-2 text-gray-800">
                No transactions found
              </h3>
              <p className="text-sm text-gray-600">
                {searchQuery ? 'Try adjusting your search' : 'No transactions match the selected filters'}
              </p>
            </div>
          )}

          {/* Footer */}
          {filteredTransactions.length > 0 && (
            <div className="p-3 bg-gray-50 border-t border-gray-200">
              <button className="text-sm font-medium text-orange-500 hover:text-orange-600 flex items-center justify-center gap-1 w-full">
                View All Transactions
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Settlement History */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-[15px] font-bold text-gray-800">Settlement History</h3>
          </div>
          
          <div className="divide-y divide-gray-200">
            {settlements.map((settlement) => (
              <div key={settlement.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      settlement.status === 'completed' ? 'bg-green-50' : 'bg-orange-50'
                    }`}>
                      {settlement.status === 'completed' ? (
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                      ) : (
                        <Clock className="w-5 h-5 text-orange-500" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-semibold text-gray-800">
                          ₹{settlement.amount.toLocaleString('en-IN')}
                        </h4>
                        <span className={getStatusStyles(settlement.status)}>
                          {settlement.status}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">Ref: {settlement.reference}</p>
                      <p className="text-xs text-gray-500 mt-1">{settlement.processedOn}</p>
                    </div>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="text-xs text-gray-600">{settlement.bank}</p>
                    <p className="text-xs text-gray-500 mt-1">UTR: {settlement.utr}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-3 bg-gray-50 border-t border-gray-200">
            <button className="text-sm font-medium text-orange-500 hover:text-orange-600 flex items-center justify-center gap-1 w-full">
              View All Settlements
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Section - EXACT match */}
        <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg border border-gray-200 p-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-center sm:text-left">
              <p className="text-sm text-gray-600">Bank Account Verified</p>
              <p className="text-[14px] text-gray-800">
                {bankDetails.bankName} • {bankDetails.maskedAccount} • IFSC: {bankDetails.ifsc}
              </p>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 text-sm bg-gray-100 text-gray-800 rounded border border-gray-300 hover:bg-gray-200">
                View Statement
              </button>
              <button className="px-3 py-1.5 text-sm bg-gradient-to-r from-orange-300 to-orange-300 text-gray-800 hover:text-white rounded hover:from-orange-500 hover:to-orange-600">
                Update Bank
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals - Now Opening Correctly */}
      {showWithdrawModal && <WithdrawModal />}
      {showDetailsModal && selectedTransaction && <TransactionDetailsModal />}
    </div>
  );
};

export default WalletManagement;