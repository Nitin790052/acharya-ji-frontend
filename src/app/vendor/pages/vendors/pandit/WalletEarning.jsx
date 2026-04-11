import React, { useState } from 'react';
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  Download,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  CreditCard,
  Banknote,
  Calendar,
  Filter,
  FileText,
  ChevronRight,
  Shield,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  RefreshCw,
  BarChart3,
  IndianRupee,
  PlusCircle
} from 'lucide-react';

const WalletEarning = () => {
  const [activeTimeframe, setActiveTimeframe] = useState('today'); // today, weekly, monthly
  const [showBalance, setShowBalance] = useState(true);
  const [isKYCVerified, setIsKYCVerified] = useState(true);
  const [isBankVerified, setIsBankVerified] = useState(true);
  
  // Wallet Data
  const walletData = {
    availableBalance: 32500,
    pendingPayout: 12500,
    totalEarnings: 87500,
    platformCommission: 8750, // 10% of total earnings
    withdrawals: 55000,
    
    breakdown: {
      today: {
        earnings: 12500,
        bookings: 4,
        commission: 1250,
        transactions: [
          { id: 1, type: 'credit', amount: 3500, description: 'Satyanarayan Katha', time: '11:30 AM', status: 'completed' },
          { id: 2, type: 'credit', amount: 2500, description: 'Ganesh Puja', time: '9:00 AM', status: 'completed' },
          { id: 3, type: 'credit', amount: 1500, description: 'Online Rudrabhishek', time: '3:00 PM', status: 'pending' }
        ]
      },
      weekly: {
        earnings: 52500,
        bookings: 18,
        commission: 5250,
        trend: '+15%'
      },
      monthly: {
        earnings: 87500,
        bookings: 42,
        commission: 8750,
        trend: '+28%'
      }
    },
    
    recentTransactions: [
      { id: 1, date: '15 Dec 2024', description: 'Withdrawal to Bank', amount: 15000, type: 'debit', status: 'completed' },
      { id: 2, date: '14 Dec 2024', description: 'Griha Pravesh Puja', amount: 4000, type: 'credit', status: 'completed' },
      { id: 3, date: '13 Dec 2024', description: 'Mundan Ceremony', amount: 3000, type: 'credit', status: 'completed' },
      { id: 4, date: '12 Dec 2024', description: 'Platform Commission', amount: -700, type: 'debit', status: 'completed' },
      { id: 5, date: '11 Dec 2024', description: 'Havan', amount: 2800, type: 'credit', status: 'pending' }
    ],
    
    bankDetails: {
      accountName: 'Pandit Ji',
      accountNumber: 'XXXXXXX1234',
      bankName: 'State Bank of India',
      ifscCode: 'SBIN0001234',
      verified: true
    },
    
    kycStatus: {
      verified: true,
      lastVerified: '15 Nov 2024',
      nextReview: '15 May 2025'
    }
  };
  
  // Get active data based on timeframe
  const activeData = walletData.breakdown[activeTimeframe];
  
  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  // Get status color
  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'bg-green-50 text-green-700';
      case 'pending': return 'bg-orange-50 text-orange-500';
      case 'failed': return 'bg-red-50 text-red-700';
      default: return 'bg-gray-50 text-gray-600';
    }
  };
  
  // Get status icon
  const getStatusIcon = (status) => {
    switch(status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'failed': return <XCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };
  
  // Get type color
  const getTypeColor = (type) => {
    return type === 'credit' ? 'text-green-700' : 'text-red-700';
  };
  
  // Get type symbol
  const getTypeSymbol = (type) => {
    return type === 'credit' ? '+' : '-';
  };
  
  // Calculate withdrawal eligibility
  const canWithdraw = isKYCVerified && isBankVerified && walletData.availableBalance > 0;
  
  // Calculate next payout date (next Monday)
  const getNextPayoutDate = () => {
    const today = new Date();
    const nextMonday = new Date(today);
    nextMonday.setDate(today.getDate() + ((7 - today.getDay() + 1) % 7 || 7));
    return nextMonday.toLocaleDateString('en-IN', { 
      day: 'numeric',
      month: 'short'
    });
  };
  
  return (
    <div className="min-h-screen bg-gray-50">

               <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40  
                px-3 py-1.5 border border-orange-100 mb-4">
  
  {/* Mobile: Column, Desktop: Row */}
  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
    
    {/* Title Section - Original size */}
    <div className="text-left sm:text-left flex items-end gap-2">
  <div>
    <h1 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-orange-900 uppercase
                   leading-tight">
      Wallet & Earnings
    </h1>
    {/* Mobile: Below heading, Desktop: Right side */}
    <p className="sm:hidden text-sm text-gray-600 mt-0.5">
    Track your earnings and manage withdrawals
    </p>
  </div>
  
  {/* Desktop: Right side of heading */}
  <p className="hidden sm:block text-sm text-gray-600 mb-0.5">
  Track your earnings and manage withdrawals
  </p>
</div>
    
   
  </div>
</div> 
      {/* Main Content - आपके spacing guidelines के according */}
      <div className="space-y-4 px-6 pb-6 pt-2">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-end items-start sm:items-center gap-3">
          
          
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 text-sm bg-white text-gray-800 rounded-lg border border-gray-300 hover:bg-gray-50 flex items-center gap-2">
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
            <button className="px-3 py-1.5 text-sm bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Statement
            </button>
          </div>
        </div>
        
        {/* Verification Status Banner */}
        <div className={`rounded-lg p-3 border ${
          canWithdraw 
            ? 'bg-green-50 border-green-200' 
            : 'bg-orange-50 border-orange-200'
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded ${
                canWithdraw ? 'bg-green-100' : 'bg-orange-100'
              }`}>
                {canWithdraw ? (
                  <Shield className="w-5 h-5 text-green-700" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-orange-600" />
                )}
              </div>
              <div>
                <h3 className="text-[15px] font-bold text-gray-800 mb-1">
                  {canWithdraw ? 'Verification Complete' : 'Verification Required'}
                </h3>
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    {isKYCVerified ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-600" />
                    )}
                    <span className={isKYCVerified ? 'text-gray-700' : 'text-red-700'}>
                      KYC {isKYCVerified ? 'Verified' : 'Pending'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {isBankVerified ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-600" />
                    )}
                    <span className={isBankVerified ? 'text-gray-700' : 'text-red-700'}>
                      Bank {isBankVerified ? 'Verified' : 'Pending'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {!canWithdraw && (
              <button className="px-3 py-1.5 text-sm bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded hover:from-orange-600 hover:to-orange-700 flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Complete Verification
              </button>
            )}
          </div>
        </div>
        
        {/* Main Wallet Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {/* Available Balance */}
          <div className="bg-white rounded-lg border border-gray-200 p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-green-50 rounded">
                  <Wallet className="w-5 h-5 text-green-700" />
                </div>
                <span className="text-sm text-gray-600">Available Balance</span>
              </div>
              <button 
                onClick={() => setShowBalance(!showBalance)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                {showBalance ? (
                  <EyeOff className="w-4 h-4 text-gray-500" />
                ) : (
                  <Eye className="w-4 h-4 text-gray-500" />
                )}
              </button>
            </div>
            <div className="mb-3">
              <div className="text-lg font-bold text-gray-800">
                {showBalance ? formatCurrency(walletData.availableBalance) : '••••••'}
              </div>
              <div className="text-xs text-gray-500">Ready to withdraw</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1">
                {canWithdraw ? (
                  <button className="w-full px-2.5 py-1.5 text-sm bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded hover:from-orange-600 hover:to-orange-700 flex items-center justify-center gap-2">
                    <Banknote className="w-4 h-4" />
                    Withdraw
                  </button>
                ) : (
                  <button 
                    disabled
                    className="w-full px-2.5 py-1.5 text-sm bg-gray-100 text-gray-500 rounded border border-gray-300 flex items-center justify-center gap-2 cursor-not-allowed"
                  >
                    <Lock className="w-4 h-4" />
                    Verify to Withdraw
                  </button>
                )}
              </div>
            </div>
          </div>
          
          {/* Pending Payout */}
          <div className="bg-white rounded-lg border border-gray-200 p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-orange-50 rounded">
                  <Clock className="w-5 h-5 text-orange-500" />
                </div>
                <span className="text-sm text-gray-600">Pending Payout</span>
              </div>
              <div className="text-xs text-gray-500">Next: {getNextPayoutDate()}</div>
            </div>
            <div className="mb-3">
              <div className="text-lg font-bold text-gray-800">
                {formatCurrency(walletData.pendingPayout)}
              </div>
              <div className="text-xs text-gray-500">Will be cleared on Monday</div>
            </div>
            <button className="w-full px-2.5 py-1.5 text-sm bg-white text-gray-700 rounded border border-gray-300 hover:bg-gray-50 flex items-center justify-center gap-2">
              <Calendar className="w-4 h-4" />
              View Schedule
            </button>
          </div>
          
          {/* Total Earnings */}
          <div className="bg-white rounded-lg border border-gray-200 p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-blue-50 rounded">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-sm text-gray-600">Total Earnings</span>
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-green-600" />
                <span className="text-xs text-green-600">+28%</span>
              </div>
            </div>
            <div className="mb-3">
              <div className="text-lg font-bold text-gray-800">
                {formatCurrency(walletData.totalEarnings)}
              </div>
              <div className="text-xs text-gray-500">Lifetime earnings</div>
            </div>
            <button className="w-full px-2.5 py-1.5 text-sm bg-white text-gray-700 rounded border border-gray-300 hover:bg-gray-50 flex items-center justify-center gap-2">
              <BarChart3 className="w-4 h-4" />
              View Analytics
            </button>
          </div>
          
          {/* Platform Commission */}
          <div className="bg-white rounded-lg border border-gray-200 p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-purple-50 rounded">
                  <CreditCard className="w-5 h-5 text-purple-600" />
                </div>
                <span className="text-sm text-gray-600">Platform Fee</span>
              </div>
              <div className="text-xs text-gray-500">10% per booking</div>
            </div>
            <div className="mb-3">
              <div className="text-lg font-bold text-gray-800">
                {formatCurrency(walletData.platformCommission)}
              </div>
              <div className="text-xs text-gray-500">Total commission paid</div>
            </div>
            <button className="w-full px-2.5 py-1.5 text-sm bg-white text-gray-700 rounded border border-gray-300 hover:bg-gray-50 flex items-center justify-center gap-2">
              <FileText className="w-4 h-4" />
              Fee Details
            </button>
          </div>
        </div>
        
        {/* Earnings Breakdown Section */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="p-3 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h2 className="text-[15px] font-bold text-gray-800">Earnings Breakdown</h2>
              
              {/* Timeframe Selector */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                {['today', 'weekly', 'monthly'].map((timeframe) => (
                  <button
                    key={timeframe}
                    onClick={() => setActiveTimeframe(timeframe)}
                    className={`px-3 py-1 text-sm rounded transition-colors ${
                      activeTimeframe === timeframe
                        ? 'bg-white text-gray-800 shadow-sm'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    {timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="p-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
              {/* Total Earnings */}
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Total Earnings</span>
                  <IndianRupee className="w-4 h-4 text-gray-500" />
                </div>
                <div className="text-lg font-bold text-gray-800 mb-1">
                  {formatCurrency(activeData.earnings)}
                </div>
                {activeData.trend && (
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-green-600" />
                    <span className="text-xs text-green-600">{activeData.trend}</span>
                  </div>
                )}
              </div>
              
              {/* Number of Bookings */}
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Bookings</span>
                  <Calendar className="w-4 h-4 text-gray-500" />
                </div>
                <div className="text-lg font-bold text-gray-800 mb-1">{activeData.bookings}</div>
                <div className="text-xs text-gray-500">{activeTimeframe === 'today' ? 'Today' : 'Completed'}</div>
              </div>
              
              {/* Platform Commission */}
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Platform Fee</span>
                  <CreditCard className="w-4 h-4 text-gray-500" />
                </div>
                <div className="text-lg font-bold text-gray-800 mb-1">
                  {formatCurrency(activeData.commission)}
                </div>
                <div className="text-xs text-gray-500">10% of earnings</div>
              </div>
            </div>
            
            {/* Today's Transactions (only for today view) */}
            {activeTimeframe === 'today' && activeData.transactions && (
              <div className="mt-4">
                <h3 className="text-sm font-semibold text-gray-800 mb-3">Today's Transactions</h3>
                <div className="space-y-2">
                  {activeData.transactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                      <div className="flex items-center gap-3">
                        <div className={`p-1.5 rounded ${
                          transaction.type === 'credit' ? 'bg-green-50' : 'bg-red-50'
                        }`}>
                          {transaction.type === 'credit' ? (
                            <PlusCircle className="w-4 h-4 text-green-600" />
                          ) : (
                            <TrendingDown className="w-4 h-4 text-red-600" />
                          )}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-800">{transaction.description}</div>
                          <div className="text-xs text-gray-500">{transaction.time}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className={`text-sm font-medium ${getTypeColor(transaction.type)}`}>
                          {getTypeSymbol(transaction.type)}{formatCurrency(transaction.amount)}
                        </div>
                        <div className={`px-2 py-0.5 rounded-full text-xs flex items-center gap-1 ${getStatusColor(transaction.status)}`}>
                          {getStatusIcon(transaction.status)}
                          {transaction.status}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Recent Transactions & Bank Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Recent Transactions */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="p-3 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-[15px] font-bold text-gray-800">Recent Transactions</h3>
                <button className="text-sm text-orange-500 hover:text-orange-600 flex items-center gap-1">
                  View All
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="divide-y divide-gray-100">
              {walletData.recentTransactions.map((transaction) => (
                <div key={transaction.id} className="p-3 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-gray-800">{transaction.description}</div>
                      <div className="text-xs text-gray-500">{transaction.date}</div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className={`text-sm font-medium ${getTypeColor(transaction.type)}`}>
                        {getTypeSymbol(transaction.type)}{formatCurrency(Math.abs(transaction.amount))}
                      </div>
                      <div className={`px-2 py-0.5 rounded-full text-xs ${getStatusColor(transaction.status)}`}>
                        {transaction.status}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-3 border-t border-gray-200">
              <div className="flex gap-2">
                <button className="flex-1 px-2.5 py-1.5 text-sm bg-white text-gray-700 rounded border border-gray-300 hover:bg-gray-50 flex items-center justify-center gap-2">
                  <Filter className="w-4 h-4" />
                  Filter
                </button>
                <button className="flex-1 px-2.5 py-1.5 text-sm bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded hover:from-orange-600 hover:to-orange-700 flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" />
                  Download PDF
                </button>
              </div>
            </div>
          </div>
          
          {/* Bank Details & Quick Actions */}
          <div className="space-y-4">
            {/* Bank Details */}
            <div className="bg-white rounded-lg border border-gray-200 p-3">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[15px] font-bold text-gray-800">Bank Details</h3>
                <div className={`px-2 py-0.5 rounded-full text-xs flex items-center gap-1 ${
                  walletData.bankDetails.verified 
                    ? 'bg-green-50 text-green-700' 
                    : 'bg-orange-50 text-orange-500'
                }`}>
                  {walletData.bankDetails.verified ? (
                    <CheckCircle className="w-3 h-3" />
                  ) : (
                    <AlertCircle className="w-3 h-3" />
                  )}
                  {walletData.bankDetails.verified ? 'Verified' : 'Pending'}
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Account Name</span>
                  <span className="font-medium text-gray-800">{walletData.bankDetails.accountName}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Account Number</span>
                  <span className="font-medium text-gray-800">{walletData.bankDetails.accountNumber}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Bank Name</span>
                  <span className="font-medium text-gray-800">{walletData.bankDetails.bankName}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">IFSC Code</span>
                  <span className="font-medium text-gray-800">{walletData.bankDetails.ifscCode}</span>
                </div>
              </div>
              
              <button className="w-full mt-4 px-2.5 py-1.5 text-sm bg-white text-gray-700 rounded border border-gray-300 hover:bg-gray-50">
                Update Bank Details
              </button>
            </div>
            
            {/* Quick Withdrawal */}
            <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg border border-orange-200 p-3">
              <h3 className="text-[15px] font-bold text-gray-800 mb-3">Quick Withdrawal</h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-700">Available Balance</span>
                  <span className="font-bold text-gray-800">{formatCurrency(walletData.availableBalance)}</span>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Withdrawal Amount</label>
                  <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                    <div className="px-3 py-2 bg-gray-100">
                      <IndianRupee className="w-5 h-5 text-gray-600" />
                    </div>
                    <input
                      type="number"
                      className="flex-1 px-3 py-2 text-sm border-none focus:ring-0"
                      placeholder="Enter amount"
                      max={walletData.availableBalance}
                      defaultValue={walletData.availableBalance}
                    />
                  </div>
                </div>
                
                <div className="text-xs text-gray-600">
                  Min. withdrawal: ₹500 • Processing time: 24-48 hours
                </div>
                
                <button 
                  className={`w-full px-3 py-2 text-sm rounded font-medium flex items-center justify-center gap-2 ${
                    canWithdraw
                      ? 'bg-gradient-to-r from-orange-400 to-orange-500 text-white hover:from-orange-600 hover:to-orange-700'
                      : 'bg-gray-100 text-gray-500 border border-gray-300 cursor-not-allowed'
                  }`}
                  disabled={!canWithdraw}
                >
                  <Banknote className="w-4 h-4" />
                  {canWithdraw ? 'Withdraw Now' : 'Complete Verification First'}
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* KYC Status Card */}
        <div className="bg-white rounded-lg border border-gray-200 p-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-50 rounded">
                <Shield className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-[15px] font-bold text-gray-800 mb-1">KYC Status</h3>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">Status:</span>
                    <span className={`px-2 py-0.5 rounded-full ${
                      walletData.kycStatus.verified 
                        ? 'bg-green-50 text-green-700' 
                        : 'bg-orange-50 text-orange-500'
                    }`}>
                      {walletData.kycStatus.verified ? 'Verified' : 'Pending'}
                    </span>
                  </div>
                  <div className="text-gray-600">
                    Last verified: {walletData.kycStatus.lastVerified} • Next review: {walletData.kycStatus.nextReview}
                  </div>
                </div>
              </div>
            </div>
            
            <button className="px-3 py-1.5 text-sm bg-white text-gray-800 rounded-lg border border-gray-300 hover:bg-gray-50 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              View KYC Documents
            </button>
          </div>
        </div>
        
        {/* Help & Support */}
        <div className="bg-gray-50 rounded-lg border border-gray-200 p-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <h4 className="text-sm font-medium text-gray-800 mb-1">Need help with withdrawals?</h4>
              <p className="text-sm text-gray-600">Contact our support team for any payment-related queries</p>
            </div>
            
            <div className="flex gap-2">
              <button className="px-3 py-1.5 text-sm bg-white text-gray-800 rounded-lg border border-gray-300 hover:bg-gray-50">
                Chat Support
              </button>
              <button className="px-3 py-1.5 text-sm bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-lg hover:from-orange-600 hover:to-orange-700">
                Call Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletEarning;