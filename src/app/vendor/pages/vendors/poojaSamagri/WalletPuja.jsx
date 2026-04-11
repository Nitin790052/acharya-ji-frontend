import React, { useState } from 'react';
import { 
  Wallet, 
  TrendingUp, 
  Download, 
  ChevronRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  CreditCard,
  Banknote,
  CalendarDays,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  Search,
  MoreVertical,
  Copy,
  Eye,
  Edit,
  Plus,
  Shield,
  RefreshCw
} from 'lucide-react';

const WalletPuja = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  
  // Mock Data
  const walletData = {
    totalEarnings: 152750,
    availableBalance: 32500,
    withdrawnAmount: 120250,
    pendingSettlements: 12500,
    
    recentTransactions: [
      {
        id: 'TXN-001',
        type: 'credit',
        amount: 3500,
        description: 'Satyanarayan Puja - Sharma Family',
        date: 'Today, 11:30 AM',
        status: 'completed',
        reference: 'ORD-7890'
      },
      {
        id: 'TXN-002',
        type: 'credit',
        amount: 2500,
        description: 'Ganesh Puja - Patel Ji',
        date: 'Today, 9:00 AM',
        status: 'completed',
        reference: 'ORD-7889'
      },
      {
        id: 'TXN-003',
        type: 'debit',
        amount: 15000,
        description: 'Withdrawal to ICICI Bank',
        date: 'Yesterday, 4:15 PM',
        status: 'completed',
        reference: 'WDL-0123'
      },
      {
        id: 'TXN-004',
        type: 'credit',
        amount: 3000,
        description: 'Havan - Verma Ji',
        date: 'Yesterday, 2:00 PM',
        status: 'completed',
        reference: 'ORD-7888'
      },
      {
        id: 'TXN-005',
        type: 'credit',
        amount: 4200,
        description: 'Griha Pravesh - Gupta Family',
        date: 'Jan 12, 2024',
        status: 'completed',
        reference: 'ORD-7887'
      },
    ],
    
    pendingSettlementsList: [
      {
        id: 'SET-001',
        orderId: 'ORD-7891',
        amount: 1899,
        description: 'Premium Diya Set',
        date: 'Jan 15, 2024',
        settlementDate: 'Jan 20, 2024',
        status: 'processing'
      },
      {
        id: 'SET-002',
        orderId: 'ORD-7892',
        amount: 6299,
        description: 'Smart Watch Pro',
        date: 'Jan 14, 2024',
        settlementDate: 'Jan 19, 2024',
        status: 'processing'
      },
      {
        id: 'SET-003',
        orderId: 'ORD-7893',
        amount: 3199,
        description: 'Phone Case',
        date: 'Jan 14, 2024',
        settlementDate: 'Jan 19, 2024',
        status: 'pending'
      },
    ],
    
    bankDetails: {
      bankName: 'ICICI Bank',
      accountNumber: '0123456789',
      accountHolder: 'Rajesh Pandit',
      ifscCode: 'ICIC0000123',
      branch: 'Noida Sector 62',
      isVerified: true,
      lastUpdated: 'Dec 15, 2023'
    },
    
    settlementHistory: [
      {
        id: 'SH-001',
        date: 'Jan 10, 2024',
        amount: 25000,
        status: 'completed',
        reference: 'SET-0123',
        bankDetails: 'ICICI Bank ****6789'
      },
      {
        id: 'SH-002',
        date: 'Jan 3, 2024',
        amount: 18000,
        status: 'completed',
        reference: 'SET-0122',
        bankDetails: 'ICICI Bank ****6789'
      },
      {
        id: 'SH-003',
        date: 'Dec 27, 2023',
        amount: 22000,
        status: 'completed',
        reference: 'SET-0121',
        bankDetails: 'ICICI Bank ****6789'
      },
      {
        id: 'SH-004',
        date: 'Dec 20, 2023',
        amount: 15000,
        status: 'completed',
        reference: 'SET-0120',
        bankDetails: 'ICICI Bank ****6789'
      },
    ],
    
    earningsByDay: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      data: [8500, 12500, 9800, 15200, 18900, 14500, 11200]
    }
  };

  // Status styling
  const getStatusStyles = (status) => {
    const base = "px-2 py-0.5 rounded-full text-sm font-medium flex items-center gap-1";
    switch(status) {
      case 'completed': 
        return `${base} bg-green-50 text-green-700`;
      case 'processing': 
        return `${base} bg-blue-50 text-blue-600`;
      case 'pending': 
        return `${base} bg-yellow-50 text-yellow-600`;
      default: 
        return `${base} bg-gray-100 text-gray-600`;
    }
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch(status) {
      case 'completed': 
        return <CheckCircle2 className="w-4 h-4" />;
      case 'processing': 
        return <Clock className="w-4 h-4" />;
      case 'pending': 
        return <AlertCircle className="w-4 h-4" />;
      default: 
        return <MoreVertical className="w-4 h-4" />;
    }
  };

  // Format currency - Indian format
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Handle actions
  const handleAction = (action, data = null) => {
    setIsLoading(true);
    
    switch(action) {
      case 'withdraw':
        setShowWithdrawModal(true);
        break;
        
      case 'submitWithdrawal':
        if (withdrawAmount && parseFloat(withdrawAmount) <= walletData.availableBalance) {
          console.log('Processing withdrawal:', withdrawAmount);
          // Process withdrawal
          setShowWithdrawModal(false);
          setWithdrawAmount('');
        } else {
          alert('Please enter a valid amount less than available balance');
        }
        break;
        
      case 'downloadInvoice':
        const invoiceData = {
          date: new Date().toLocaleDateString('en-IN'),
          transactions: walletData.recentTransactions,
          totalEarnings: walletData.totalEarnings
        };
        const dataStr = JSON.stringify(invoiceData, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        const exportFileDefaultName = `invoice-${new Date().toISOString().split('T')[0]}.json`;
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
        break;
        
      case 'viewStatement':
        // Navigate to full statement
        console.log('View full statement');
        break;
        
      case 'addBank':
        // Navigate to add bank page
        console.log('Add bank account');
        break;
        
      case 'editBank':
        // Navigate to edit bank page
        console.log('Edit bank details');
        break;
        
      case 'copyAccountNumber':
        navigator.clipboard.writeText(walletData.bankDetails.accountNumber);
        alert('Account number copied to clipboard!');
        break;
        
      case 'refresh':
        // Refresh data
        console.log('Refreshing wallet data');
        break;
    }
    
    setTimeout(() => setIsLoading(false), 500);
  };

  // Calculate next settlement date (3 days from now)
  const getNextSettlementDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 3);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 px-3 py-1.5 border border-orange-100">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          {/* Title Section */}
           <div className="text-left sm:text-left flex-1 md:flex ">
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold uppercase leading-tight text-orange-900">
                Wallet & Settlements
            </h1>
            <p className="text-sm text-gray-600 mt-1 md:mt-2.5 lg:mt-2.5">
               Manage earnings, withdrawals, and bank details
            </p>
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm text-gray-700">Processing...</p>
          </div>
        </div>
      )}

      {/* Withdrawal Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg border border-gray-200 max-w-md w-full">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">Withdraw Funds</h3>
                <button 
                  onClick={() => setShowWithdrawModal(false)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <span className="text-gray-500">×</span>
                </button>
              </div>
            </div>
            
            <div className="p-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount to Withdraw
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                  <input
                    type="number"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="w-full pl-8 pr-4 py-2 rounded-lg border bg-white border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Available: {formatCurrency(walletData.availableBalance)}
                </p>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bank Account
                </label>
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-800">{walletData.bankDetails.bankName}</div>
                      <div className="text-sm text-gray-600">****{walletData.bankDetails.accountNumber.slice(-4)}</div>
                    </div>
                    {walletData.bankDetails.isVerified && (
                      <span className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Verified
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Funds will be transferred within 2-3 business days</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-gray-200 flex justify-end gap-2">
              <button 
                onClick={() => setShowWithdrawModal(false)}
                className="px-4 py-2 text-sm bg-gray-100 text-gray-800 rounded border border-gray-300 hover:bg-gray-200"
              >
                Cancel
              </button>
              <button 
                onClick={() => handleAction('submitWithdrawal')}
                className="px-4 py-2 text-sm bg-gradient-to-r from-orange-300 to-orange-300 text-gray-800 hover:text-white rounded hover:from-orange-500 hover:to-orange-600"
              >
                Confirm Withdrawal
              </button>
            </div>
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
                Next settlement: {getNextSettlementDate()}
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm text-gray-600">Available Balance</p>
                <p className="text-[15px] font-semibold text-orange-500">
                  {formatCurrency(walletData.availableBalance)}
                </p>
              </div>
              <div className="w-8 h-8 bg-orange-50 rounded flex items-center justify-center">
                <Wallet className="w-5 h-5 text-orange-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 border-b pb-3">
          {['overview', 'transactions', 'settlements', 'bank'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                activeTab === tab 
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              {tab.replace('-', ' ')}
            </button>
          ))}
        </div>

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {/* Total Earnings */}
          <div className="bg-white rounded-lg border border-gray-200 p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Earnings</p>
                <p className="text-xl font-semibold text-gray-800 mt-1">
                  {formatCurrency(walletData.totalEarnings)}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="w-3 h-3 text-green-700" />
                  <span className="text-sm text-green-700">+₹12,500 this month</span>
                </div>
              </div>
              <div className="p-2 bg-green-50 rounded">
                <TrendingUp className="w-5 h-5 text-green-700" />
              </div>
            </div>
          </div>

          {/* Available Balance */}
          <div className="bg-white rounded-lg border border-gray-200 p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Available Balance</p>
                <p className="text-xl font-semibold text-gray-800 mt-1">
                  {formatCurrency(walletData.availableBalance)}
                </p>
                <button 
                  onClick={() => handleAction('withdraw')}
                  className="text-sm text-orange-500 font-medium mt-2 hover:text-orange-600 flex items-center gap-1"
                >
                  Withdraw now
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>
              <div className="p-2 bg-orange-50 rounded">
                <Wallet className="w-5 h-5 text-orange-500" />
              </div>
            </div>
          </div>

          {/* Withdrawn Amount */}
          <div className="bg-white rounded-lg border border-gray-200 p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Withdrawn</p>
                <p className="text-xl font-semibold text-gray-800 mt-1">
                  {formatCurrency(walletData.withdrawnAmount)}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <ArrowDownRight className="w-3 h-3 text-blue-600" />
                  <span className="text-sm text-blue-600">8 withdrawals</span>
                </div>
              </div>
              <div className="p-2 bg-blue-50 rounded">
                <Banknote className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Pending Settlements */}
          <div className="bg-white rounded-lg border border-gray-200 p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Settlements</p>
                <p className="text-xl font-semibold text-gray-800 mt-1">
                  {formatCurrency(walletData.pendingSettlements)}
                </p>
                <p className="text-xs text-yellow-500 mt-2">Clearing in 3 days</p>
              </div>
              <div className="p-2 bg-yellow-50 rounded">
                <Clock className="w-5 h-5 text-yellow-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Left Column - Recent Transactions */}
            <div className="lg:col-span-2 space-y-4">
              {/* Recent Transactions */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[15px] font-bold text-gray-800">Recent Transactions</h3>
                    <button 
                      onClick={() => handleAction('viewStatement')}
                      className="text-sm font-medium text-orange-500 hover:text-orange-600"
                    >
                      View Statement →
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40">
                        <th className="text-left p-3 text-sm font-medium">Transaction ID</th>
                        <th className="text-left p-3 text-sm font-medium">Description</th>
                        <th className="text-left p-3 text-sm font-medium">Amount</th>
                        <th className="text-left p-3 text-sm font-medium">Date</th>
                        <th className="text-left p-3 text-sm font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {walletData.recentTransactions.map((txn) => (
                        <tr key={txn.id} className="border-b border-gray-200 hover:bg-gray-50">
                          <td className="p-3">
                            <div>
                              <div className="font-medium">{txn.id}</div>
                              <div className="text-xs text-gray-500">{txn.reference}</div>
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="font-medium">{txn.description}</div>
                          </td>
                          <td className="p-3">
                            <div className={`font-medium flex items-center gap-1 ${
                              txn.type === 'credit' ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {txn.type === 'credit' ? (
                                <ArrowUpRight className="w-4 h-4" />
                              ) : (
                                <ArrowDownRight className="w-4 h-4" />
                              )}
                              {formatCurrency(txn.amount)}
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="text-sm text-gray-600">{txn.date}</div>
                          </td>
                          <td className="p-3">
                            <div className={getStatusStyles(txn.status)}>
                              {getStatusIcon(txn.status)}
                              <span>{txn.status}</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Quick Actions */}
              <div>
                <h3 className="text-[15px] font-bold text-gray-800 mb-3">Quick Actions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button 
                    onClick={() => handleAction('withdraw')}
                    className="bg-white rounded-lg p-3 border border-gray-200 hover:border-orange-300 hover:bg-gray-50 transition-all group text-left"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-orange-50 rounded">
                          <Banknote className="w-5 h-5 text-orange-500" />
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-800 block">Withdraw Funds</span>
                          <span className="text-xs text-gray-600">Available: {formatCurrency(walletData.availableBalance)}</span>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-orange-500" />
                    </div>
                  </button>

                  <button 
                    onClick={() => handleAction('downloadInvoice')}
                    className="bg-white rounded-lg p-3 border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all group text-left"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-blue-50 rounded">
                          <Download className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-800 block">Download Invoice</span>
                          <span className="text-xs text-gray-600">Last 30 days transactions</span>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column - Bank Details & Pending Settlements */}
            <div className="space-y-4">
              {/* Bank Details Card */}
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[15px] font-bold text-gray-800">Bank Details</h3>
                  <button 
                    onClick={() => handleAction('editBank')}
                    className="text-sm font-medium text-orange-500 hover:text-orange-600"
                  >
                    Edit →
                  </button>
                </div>
                
                <div className="space-y-3">
                  <div className="p-3 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium text-gray-800 flex items-center gap-2">
                        <CreditCard className="w-4 h-4" />
                        {walletData.bankDetails.bankName}
                      </div>
                      {walletData.bankDetails.isVerified && (
                        <span className="px-2 py-0.5 bg-green-50 text-green-700 text-xs rounded flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          Verified
                        </span>
                      )}
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Account Number</span>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">****{walletData.bankDetails.accountNumber.slice(-4)}</span>
                          <button 
                            onClick={() => handleAction('copyAccountNumber')}
                            className="p-1 hover:bg-gray-100 rounded"
                            title="Copy account number"
                          >
                            <Copy className="w-3 h-3 text-gray-500" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Account Holder</span>
                        <span className="font-medium">{walletData.bankDetails.accountHolder}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">IFSC Code</span>
                        <span className="font-medium">{walletData.bankDetails.ifscCode}</span>
                      </div>
                    </div>
                    
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <div className="text-xs text-gray-500">
                        Last updated: {walletData.bankDetails.lastUpdated}
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => handleAction('addBank')}
                    className="w-full px-3 py-2 text-orange-500 text-sm font-medium rounded border border-orange-300 hover:bg-orange-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Bank Account
                  </button>
                </div>
              </div>

              {/* Pending Settlements */}
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <h3 className="text-[15px] font-bold text-gray-800 mb-4">Pending Settlements</h3>
                
                <div className="space-y-3">
                  {walletData.pendingSettlementsList.map((settlement) => (
                    <div key={settlement.id} className="p-3 rounded-lg border border-gray-200 hover:bg-gray-50">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium text-gray-800">{settlement.orderId}</div>
                        <span className={getStatusStyles(settlement.status)}>
                          {getStatusIcon(settlement.status)}
                          <span className="ml-1">{settlement.status}</span>
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 mb-2">{settlement.description}</div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">
                          {formatCurrency(settlement.amount)}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">Settles: {settlement.settlementDate}</span>
                          <button className="p-1 hover:bg-gray-100 rounded">
                            <Eye className="w-4 h-4 text-gray-500" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Tip Card */}
              <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg p-3 border border-orange-200">
                <div className="flex items-start gap-2">
                  <div className="p-1.5 bg-orange-50 rounded">
                    <Shield className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-800 mb-1">Security Tip</h4>
                    <p className="text-xs text-gray-700">
                      Never share your bank details, OTP, or password with anyone. All transactions are secure.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settlements' && (
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-[15px] font-bold text-gray-800">Settlement History</h3>
                  <p className="text-sm text-gray-600">Track all your settlement transactions</p>
                </div>
                <button 
                  onClick={() => handleAction('downloadInvoice')}
                  className="px-4 py-2 text-sm rounded-lg flex items-center gap-2 bg-gray-100 hover:bg-gray-200"
                >
                  <Download className="w-4 h-4" />
                  Export History
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left p-4 text-sm font-medium">Settlement ID</th>
                    <th className="text-left p-4 text-sm font-medium">Date</th>
                    <th className="text-left p-4 text-sm font-medium">Amount</th>
                    <th className="text-left p-4 text-sm font-medium">Bank Details</th>
                    <th className="text-left p-4 text-sm font-medium">Status</th>
                    <th className="text-left p-4 text-sm font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {walletData.settlementHistory.map((settlement) => (
                    <tr key={settlement.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="p-4 font-medium">{settlement.id}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <CalendarDays className="w-4 h-4 text-gray-400" />
                          <span>{settlement.date}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="font-medium text-green-600">
                          {formatCurrency(settlement.amount)}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="text-sm text-gray-600">{settlement.bankDetails}</div>
                      </td>
                      <td className="p-4">
                        <div className={getStatusStyles(settlement.status)}>
                          {getStatusIcon(settlement.status)}
                          <span>{settlement.status}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => handleAction('downloadInvoice')}
                            className="px-3 py-1.5 text-sm bg-gray-100 text-gray-800 rounded border border-gray-300 hover:bg-gray-200"
                          >
                            Download
                          </button>
                          <button className="p-1.5 rounded hover:bg-gray-100">
                            <MoreVertical className="w-4 h-4 text-gray-500" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'bank' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Bank Details Form */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="text-[15px] font-bold text-gray-800 mb-4">Bank Account Details</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bank Name
                  </label>
                  <input
                    type="text"
                    defaultValue={walletData.bankDetails.bankName}
                    className="w-full px-4 py-2 rounded-lg border bg-white border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Account Number
                  </label>
                  <input
                    type="text"
                    defaultValue={walletData.bankDetails.accountNumber}
                    className="w-full px-4 py-2 rounded-lg border bg-white border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      IFSC Code
                    </label>
                    <input
                      type="text"
                      defaultValue={walletData.bankDetails.ifscCode}
                      className="w-full px-4 py-2 rounded-lg border bg-white border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Account Holder
                    </label>
                    <input
                      type="text"
                      defaultValue={walletData.bankDetails.accountHolder}
                      className="w-full px-4 py-2 rounded-lg border bg-white border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Branch Name
                  </label>
                  <input
                    type="text"
                    defaultValue={walletData.bankDetails.branch}
                    className="w-full px-4 py-2 rounded-lg border bg-white border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="verifyAccount"
                      defaultChecked={walletData.bankDetails.isVerified}
                      className="w-4 h-4 text-orange-600 rounded focus:ring-orange-500"
                    />
                    <label htmlFor="verifyAccount" className="text-sm text-gray-700">
                      This account is verified
                    </label>
                  </div>
                </div>
                
                <div className="flex gap-2 pt-4 border-t border-gray-200">
                  <button className="flex-1 px-4 py-2 text-sm bg-gray-100 text-gray-800 rounded border border-gray-300 hover:bg-gray-200">
                    Cancel
                  </button>
                  <button className="flex-1 px-4 py-2 text-sm bg-gradient-to-r from-orange-300 to-orange-300 text-gray-800 hover:text-white rounded hover:from-orange-500 hover:to-orange-600">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>

            {/* Bank Verification Info */}
            <div className="space-y-4">
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <h3 className="text-[15px] font-bold text-gray-800 mb-4">Verification Status</h3>
                
                <div className="space-y-4">
                  <div className="p-3 rounded-lg border border-green-200 bg-green-50">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                      <div>
                        <div className="font-medium text-green-800">Account Verified</div>
                        <div className="text-sm text-green-600">
                          Your bank account has been successfully verified
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-gray-800">Verification Requirements:</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        Valid bank account number
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        Correct IFSC code
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        Account holder name matches
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        Bank branch verification
                      </li>
                    </ul>
                  </div>
                  
                  <div className="text-xs text-gray-500">
                    Last verified: {walletData.bankDetails.lastUpdated}
                  </div>
                </div>
              </div>

              {/* Security Info */}
              <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg p-4 border border-orange-200">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-orange-50 rounded">
                    <Shield className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-800 mb-2">Security Information</h4>
                    <ul className="text-xs text-gray-700 space-y-1">
                      <li>• All bank details are encrypted and secure</li>
                      <li>• Two-factor authentication for withdrawals</li>
                      <li>• Instant notifications for all transactions</li>
                      <li>• 24/7 fraud monitoring</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Section - Additional Info */}
        <div className="bg-white rounded-lg border border-gray-200 p-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-center sm:text-left">
              <p className="text-sm text-gray-600">Need help with withdrawals?</p>
              <p className="text-[14px] text-gray-800">Contact support: +91 98765 43210</p>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => handleAction('downloadInvoice')}
                className="px-3 py-1.5 text-sm bg-gray-100 text-gray-800 rounded border border-gray-300 hover:bg-gray-200"
              >
                Download Statement
              </button>
              <button 
                onClick={() => handleAction('withdraw')}
                className="px-3 py-1.5 text-sm bg-gradient-to-r from-orange-300 to-orange-300 text-gray-800 hover:text-white rounded hover:from-orange-500 hover:to-orange-600"
              >
                Withdraw Funds
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletPuja;