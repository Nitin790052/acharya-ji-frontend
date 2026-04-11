import React, { useState } from 'react';
import {
  // Core Icons
  IndianRupee,
  CalendarDays,
  Clock,
  Users,
  UserCircle,
  CheckCircle2,
  AlertCircle,
  Bell,
  Filter,
  Search,
  ChevronRight,
  Download,
  Eye,
  FileText,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  DollarSign,
  Gift,
  Heart,
  Upload,
  X,
  Printer,
  Mail,
  Phone,
  MapPin,
  Award,
  CreditCard,
  Wallet,
  Landmark,
  Star
} from 'lucide-react';

const Donations = () => {
  const [filter, setFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [dateRange, setDateRange] = useState('month');
  const [chartView, setChartView] = useState('daily');

  // ============ DONATIONS DATA ============
  const [donations, setDonations] = useState([
    {
      id: 'DON-001',
      receiptNo: 'RCT-2026-1001',
      devotee: 'Rajesh Kumar',
      devoteeAvatar: 'RK',
      amount: 5100,
      date: '22 Feb 2026',
      time: '11:30 AM',
      type: 'General Donation',
      category: 'general',
      paymentMode: 'UPI',
      status: 'success',
      phone: '+91 98765 43210',
      email: 'rajesh.k@email.com',
      address: '12, Juhu Scheme, Mumbai',
      message: 'For temple renovation fund',
      pan: 'ABCDE1234F',
      receiptSent: true,
      read: false,
      priority: 'medium'
    },
    {
      id: 'DON-002',
      receiptNo: 'RCT-2026-1002',
      devotee: 'Priya Sharma',
      devoteeAvatar: 'PS',
      amount: 2001,
      date: '22 Feb 2026',
      time: '10:50 AM',
      type: 'Temple Renovation',
      category: 'renovation',
      paymentMode: 'Card',
      status: 'success',
      phone: '+91 98765 43211',
      email: 'priya.s@email.com',
      address: '34, Andheri East, Mumbai',
      message: 'For mandir renovation',
      pan: 'FGHIJ5678K',
      receiptSent: true,
      read: true,
      priority: 'medium'
    },
    {
      id: 'DON-003',
      receiptNo: 'RCT-2026-1003',
      devotee: 'Amit Patel',
      devoteeAvatar: 'AP',
      amount: 1100,
      date: '22 Feb 2026',
      time: '09:15 AM',
      type: 'Annadanam',
      category: 'annadanam',
      paymentMode: 'NetBanking',
      status: 'success',
      phone: '+91 98765 43212',
      email: 'amit.p@email.com',
      address: '56, Goregaon West, Mumbai',
      message: 'For food donation',
      pan: 'KLMNO9012P',
      receiptSent: true,
      read: false,
      priority: 'high'
    },
    {
      id: 'DON-004',
      receiptNo: 'RCT-2026-1004',
      devotee: 'Sneha Reddy',
      devoteeAvatar: 'SR',
      amount: 501,
      date: '21 Feb 2026',
      time: '06:45 PM',
      type: 'General Donation',
      category: 'general',
      paymentMode: 'UPI',
      status: 'success',
      phone: '+91 98765 43213',
      email: 'sneha.r@email.com',
      address: '78, Borivali West, Mumbai',
      message: 'Monthly donation',
      pan: 'QRSTU3456V',
      receiptSent: false,
      read: true,
      priority: 'low'
    },
    {
      id: 'DON-005',
      receiptNo: 'RCT-2026-1005',
      devotee: 'Vikram Singh',
      devoteeAvatar: 'VS',
      amount: 2500,
      date: '21 Feb 2026',
      time: '03:20 PM',
      type: 'Festival Donation',
      category: 'festival',
      paymentMode: 'Cash',
      status: 'success',
      phone: '+91 98765 43214',
      email: 'vikram.s@email.com',
      address: '90, Chembur, Mumbai',
      message: 'Mahashivratri special',
      pan: 'WXYZA7890B',
      receiptSent: true,
      read: true,
      priority: 'medium'
    },
    {
      id: 'DON-006',
      receiptNo: 'RCT-2026-1006',
      devotee: 'Anita Desai',
      devoteeAvatar: 'AD',
      amount: 15000,
      date: '20 Feb 2026',
      time: '02:30 PM',
      type: 'Corpus Fund',
      category: 'corpus',
      paymentMode: 'NEFT',
      status: 'success',
      phone: '+91 98765 43215',
      email: 'anita.d@email.com',
      address: '23, Dadar, Mumbai',
      message: 'For temple corpus fund',
      pan: 'CDEFG1234H',
      receiptSent: true,
      read: false,
      priority: 'critical'
    },
    {
      id: 'DON-007',
      receiptNo: 'RCT-2026-1007',
      devotee: 'Ramesh Gupta',
      devoteeAvatar: 'RG',
      amount: 750,
      date: '20 Feb 2026',
      time: '11:15 AM',
      type: 'Annadanam',
      category: 'annadanam',
      paymentMode: 'UPI',
      status: 'pending',
      phone: '+91 98765 43216',
      email: 'ramesh.g@email.com',
      address: '45, Bandra West, Mumbai',
      message: 'Weekly annadanam',
      pan: 'IJKLM5678N',
      receiptSent: false,
      read: true,
      priority: 'high'
    }
  ]);

  // ============ DONATION STATS ============
  const stats = {
    totalDonations: donations.reduce((acc, d) => acc + (d.status === 'success' ? d.amount : 0), 0),
    todayDonations: donations
      .filter(d => d.date === '22 Feb 2026' && d.status === 'success')
      .reduce((acc, d) => acc + d.amount, 0),
    todayCount: donations.filter(d => d.date === '22 Feb 2026' && d.status === 'success').length,
    monthDonations: donations
      .filter(d => d.date.includes('Feb 2026') && d.status === 'success')
      .reduce((acc, d) => acc + d.amount, 0),
    monthCount: donations.filter(d => d.date.includes('Feb 2026') && d.status === 'success').length,
    avgDonation: Math.round(
      donations.filter(d => d.status === 'success')
        .reduce((acc, d) => acc + d.amount, 0) / 
      donations.filter(d => d.status === 'success').length
    ),
    pendingCount: donations.filter(d => d.status === 'pending').length,
    topDonation: Math.max(...donations.map(d => d.amount)),
    categories: {
      general: donations.filter(d => d.category === 'general' && d.status === 'success').reduce((acc, d) => acc + d.amount, 0),
      renovation: donations.filter(d => d.category === 'renovation' && d.status === 'success').reduce((acc, d) => acc + d.amount, 0),
      annadanam: donations.filter(d => d.category === 'annadanam' && d.status === 'success').reduce((acc, d) => acc + d.amount, 0),
      festival: donations.filter(d => d.category === 'festival' && d.status === 'success').reduce((acc, d) => acc + d.amount, 0),
      corpus: donations.filter(d => d.category === 'corpus' && d.status === 'success').reduce((acc, d) => acc + d.amount, 0)
    }
  };

  // ============ DAILY COLLECTION DATA (Last 7 Days) ============
  const dailyCollection = [
    { day: '16 Feb', amount: 12500, count: 8 },
    { day: '17 Feb', amount: 18200, count: 12 },
    { day: '18 Feb', amount: 15400, count: 10 },
    { day: '19 Feb', amount: 22100, count: 15 },
    { day: '20 Feb', amount: 25800, count: 18 },
    { day: '21 Feb', amount: 19100, count: 13 },
    { day: '22 Feb', amount: 24700, count: 16 }
  ];

  // ============ MONTHLY COLLECTION DATA (Last 6 Months) ============
  const monthlyCollection = [
    { month: 'Sep 2025', amount: 245000, count: 156 },
    { month: 'Oct 2025', amount: 289000, count: 178 },
    { month: 'Nov 2025', amount: 312000, count: 195 },
    { month: 'Dec 2025', amount: 425000, count: 245 },
    { month: 'Jan 2026', amount: 398000, count: 234 },
    { month: 'Feb 2026', amount: 356000, count: 212 }
  ];

  // ============ CATEGORY WISE DISTRIBUTION ============
  const categoryDistribution = [
    { name: 'General', amount: stats.categories.general, percentage: 35, color: 'bg-blue-500' },
    { name: 'Annadanam', amount: stats.categories.annadanam, percentage: 25, color: 'bg-green-500' },
    { name: 'Renovation', amount: stats.categories.renovation, percentage: 20, color: 'bg-orange-500' },
    { name: 'Corpus', amount: stats.categories.corpus, percentage: 12, color: 'bg-purple-500' },
    { name: 'Festival', amount: stats.categories.festival, percentage: 8, color: 'bg-red-500' }
  ];

  // ============ UNREAD COUNT ============
  const unreadCount = donations.filter(d => !d.read).length;

  // ============ EXACT MATCH to NotificationsPuja ============
  const getCategoryIcon = (category) => {
    switch(category) {
      case 'general':
        return <Heart className="w-5 h-5 text-red-500" />;
      case 'renovation':
        return <Landmark className="w-5 h-5 text-orange-600" />;
      case 'annadanam':
        return <Gift className="w-5 h-5 text-green-600" />;
      case 'festival':
        return <Star className="w-5 h-5 text-yellow-500" />;
      case 'corpus':
        return <Wallet className="w-5 h-5 text-purple-600" />;
      default:
        return <IndianRupee className="w-5 h-5 text-blue-600" />;
    }
  };

  const getPaymentIcon = (mode) => {
    switch(mode) {
      case 'UPI':
        return <Upload className="w-4 h-4 text-blue-600" />;
      case 'Card':
        return <CreditCard className="w-4 h-4 text-green-600" />;
      case 'NetBanking':
        return <Landmark className="w-4 h-4 text-purple-600" />;
      case 'Cash':
        return <Wallet className="w-4 h-4 text-orange-500" />;
      case 'NEFT':
        return <IndianRupee className="w-4 h-4 text-gray-600" />;
      default:
        return <IndianRupee className="w-4 h-4 text-gray-600" />;
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

  const getStatusStyles = (status) => {
    const base = "px-2 py-0.5 rounded-full text-xs font-medium";
    switch(status) {
      case 'success':
        return `${base} bg-green-50 text-green-700`;
      case 'pending':
        return `${base} bg-orange-50 text-orange-500`;
      case 'failed':
        return `${base} bg-red-50 text-red-700`;
      default:
        return `${base} bg-gray-100 text-gray-600`;
    }
  };

  // ============ HANDLE ACTIONS ============
  const handleAction = (action, donation = null) => {
    setIsLoading(true);
    
    switch(action) {
      case 'view':
        setSelectedDonation(donation);
        setShowReceiptModal(true);
        break;
      
      case 'downloadReceipt':
        console.log('Downloading receipt for:', donation?.receiptNo);
        break;
      
      case 'sendReceipt':
        setDonations(prev => prev.map(d => 
          d.id === donation.id ? { ...d, receiptSent: true, read: true } : d
        ));
        break;
      
      case 'markAsRead':
        setDonations(prev => prev.map(d => 
          d.id === donation.id ? { ...d, read: true } : d
        ));
        break;
      
      case 'exportCSV':
        console.log('Exporting donations to CSV');
        break;
      
      case 'print':
        window.print();
        break;
    }
    
    setTimeout(() => setIsLoading(false), 500);
  };

  // ============ FILTER DONATIONS ============
  const filteredDonations = donations.filter(donation => {
    if (filter === 'all') return true;
    if (filter === 'success') return donation.status === 'success';
    if (filter === 'pending') return donation.status === 'pending';
    if (filter === 'today') return donation.date === '22 Feb 2026';
    if (filter === 'month') return donation.date.includes('Feb 2026');
    return donation.category === filter;
  }).filter(donation => {
    if (!searchQuery) return true;
    return (
      donation.devotee.toLowerCase().includes(searchQuery.toLowerCase()) ||
      donation.receiptNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      donation.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      donation.type.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // ============ RECEIPT MODAL - EXACT match ============
  const ReceiptModal = () => {
    if (!showReceiptModal || !selectedDonation) return null;

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
                <h3 className="text-[15px] font-bold text-gray-800">
                  Donation Receipt • {selectedDonation.receiptNo}
                </h3>
              </div>
              <button 
                onClick={() => setShowReceiptModal(false)}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Modal Content */}
          <div className="p-6 space-y-4">
            {/* Temple Header */}
            <div className="text-center pb-4 border-b border-gray-200">
              <h2 className="text-lg font-bold text-orange-900">श्री राम मंदिर</h2>
              <p className="text-xs text-gray-600 mt-1">12, Temple Road, Juhu, Mumbai - 400049</p>
              <p className="text-xs text-gray-600">GSTIN: 27ABCDE1234F1Z5 | PAN: ABCDE1234F</p>
            </div>

            {/* Receipt Info */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Receipt No.</p>
                <p className="text-sm font-semibold text-gray-800">{selectedDonation.receiptNo}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">Date</p>
                <p className="text-sm font-semibold text-gray-800">{selectedDonation.date}</p>
              </div>
            </div>

            {/* Devotee Details */}
            <div className="p-3 bg-gray-50 rounded-lg">
              <h4 className="text-xs font-medium text-gray-600 mb-2">Donor Details</h4>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-semibold text-orange-700">
                    {selectedDonation.devoteeAvatar}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-800">{selectedDonation.devotee}</p>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-1">
                    <span className="text-xs text-gray-600 flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      {selectedDonation.phone}
                    </span>
                    <span className="text-xs text-gray-600 flex items-center gap-1">
                      <Mail className="w-3 h-3" />
                      {selectedDonation.email}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3" />
                    {selectedDonation.address}
                  </p>
                  <p className="text-xs text-gray-600 flex items-center gap-1 mt-1">
                    <FileText className="w-3 h-3" />
                    PAN: {selectedDonation.pan}
                  </p>
                </div>
              </div>
            </div>

            {/* Donation Details */}
            <div className="p-3 bg-gray-50 rounded-lg">
              <h4 className="text-xs font-medium text-gray-600 mb-2">Donation Details</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">Type</span>
                  <span className="text-sm font-medium text-gray-800">{selectedDonation.type}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">Payment Mode</span>
                  <span className="text-sm font-medium text-gray-800 flex items-center gap-1">
                    {getPaymentIcon(selectedDonation.paymentMode)}
                    {selectedDonation.paymentMode}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">Amount</span>
                  <span className="text-lg font-bold text-green-600">₹{selectedDonation.amount.toLocaleString('en-IN')}</span>
                </div>
                {selectedDonation.message && (
                  <div className="mt-2 pt-2 border-t border-gray-200">
                    <p className="text-xs text-gray-600">Message</p>
                    <p className="text-sm text-gray-700 mt-1">"{selectedDonation.message}"</p>
                  </div>
                )}
              </div>
            </div>

            {/* Amount in Words */}
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-xs text-blue-700">Amount in Words</p>
              <p className="text-sm font-medium text-gray-800 mt-1">
                Rupees {numberToWords(selectedDonation.amount)} Only
              </p>
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs text-gray-600">Authorized Signatory</p>
                  <p className="text-sm font-medium text-gray-800 mt-2">For Shri Ram Mandir</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-600">This is a computer generated receipt</p>
                  <p className="text-xs text-gray-500 mt-1">Valid without signature</p>
                </div>
              </div>
            </div>

            {/* Action Buttons - EXACT match */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200">
              <button
                onClick={() => {
                  handleAction('downloadReceipt', selectedDonation);
                }}
                className="px-3 py-1.5 text-sm bg-orange-50 text-orange-500 rounded border border-orange-300 hover:bg-orange-100 flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download Receipt
              </button>
              
              <button
                onClick={() => {
                  handleAction('sendReceipt', selectedDonation);
                  setShowReceiptModal(false);
                }}
                className="px-3 py-1.5 text-sm bg-green-50 text-green-700 rounded border border-green-300 hover:bg-green-100 flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                Email Receipt
              </button>
              
              <button
                onClick={() => handleAction('print')}
                className="px-3 py-1.5 text-sm bg-gray-100 text-gray-800 rounded border border-gray-300 hover:bg-gray-200 flex items-center gap-2"
              >
                <Printer className="w-4 h-4" />
                Print
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ============ HELPER FUNCTION ============
  const numberToWords = (num) => {
    // Simplified version - in production use a proper library
    if (num === 5100) return 'Five Thousand One Hundred';
    if (num === 2001) return 'Two Thousand One';
    if (num === 1100) return 'One Thousand One Hundred';
    if (num === 501) return 'Five Hundred One';
    if (num === 2500) return 'Two Thousand Five Hundred';
    if (num === 15000) return 'Fifteen Thousand';
    if (num === 750) return 'Seven Hundred Fifty';
    return 'Five Thousand One Hundred';
  };

  // ============ CHART COMPONENTS ============
  const DailyChart = () => {
    const maxAmount = Math.max(...dailyCollection.map(d => d.amount));
    
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[15px] font-bold text-gray-800">Daily Collection</h3>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">Last 7 days</span>
            <button className="p-1 hover:bg-gray-100 rounded">
              <Download className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>
        
        {/* Chart Bars */}
        <div className="space-y-3">
          {dailyCollection.map((day) => (
            <div key={day.day} className="flex items-center gap-3">
              <span className="w-12 text-xs font-medium text-gray-600">{day.day}</span>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-orange-400 to-orange-500 rounded-full"
                      style={{ width: `${(day.amount / maxAmount) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-xs font-semibold text-gray-800">₹{day.amount.toLocaleString('en-IN')}</span>
                </div>
                <span className="text-xs text-gray-500 mt-1 block">{day.count} donations</span>
              </div>
            </div>
          ))}
        </div>
        
        {/* Summary */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Total (7 days)</span>
            <span className="text-lg font-bold text-gray-800">
              ₹{dailyCollection.reduce((acc, d) => acc + d.amount, 0).toLocaleString('en-IN')}
            </span>
          </div>
          <div className="flex items-center justify-between mt-1">
            <span className="text-xs text-gray-500">Average daily</span>
            <span className="text-sm font-medium text-green-600">
              ₹{Math.round(dailyCollection.reduce((acc, d) => acc + d.amount, 0) / 7).toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      </div>
    );
  };

  const MonthlyChart = () => {
    const maxAmount = Math.max(...monthlyCollection.map(d => d.amount));
    
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[15px] font-bold text-gray-800">Monthly Collection</h3>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">Last 6 months</span>
            <button className="p-1 hover:bg-gray-100 rounded">
              <Download className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>
        
        {/* Chart Bars */}
        <div className="space-y-3">
          {monthlyCollection.map((month) => (
            <div key={month.month} className="flex items-center gap-3">
              <span className="w-16 text-xs font-medium text-gray-600">{month.month}</span>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full"
                      style={{ width: `${(month.amount / maxAmount) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-xs font-semibold text-gray-800">₹{(month.amount / 1000).toFixed(0)}k</span>
                </div>
                <span className="text-xs text-gray-500 mt-1 block">{month.count} donations</span>
              </div>
            </div>
          ))}
        </div>
        
        {/* Growth Indicator */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">vs Previous Period</span>
            <div className="flex items-center gap-1 text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-medium">+12.5%</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const CategoryPieChart = () => {
    const total = Object.values(stats.categories).reduce((acc, val) => acc + val, 0);
    
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="text-[15px] font-bold text-gray-800 mb-4">Category Distribution</h3>
        
        {/* Pie Chart Representation (Simplified) */}
        <div className="space-y-3">
          {categoryDistribution.map((cat) => (
            <div key={cat.name} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${cat.color}`}></div>
              <span className="flex-1 text-xs text-gray-700">{cat.name}</span>
              <span className="text-xs font-medium text-gray-800">
                ₹{(cat.amount / 1000).toFixed(0)}k
              </span>
              <span className="text-xs text-gray-500 w-12 text-right">{cat.percentage}%</span>
            </div>
          ))}
        </div>
        
        {/* Total */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-800">Total</span>
            <span className="text-lg font-bold text-gray-900">₹{(total / 1000).toFixed(0)}k</span>
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

      {/* Header - EXACT match to NotificationsPuja */}
      <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 px-3 py-1.5 border border-orange-100">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <div className="text-left sm:text-left flex-1 md:flex">
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold uppercase leading-tight text-orange-900">
              Donations & Reports
            </h1>
            <p className="text-sm text-gray-600 mt-1 md:mt-2.5 lg:mt-2.5">
              Track temple donations and generate reports
            </p>
          </div>
          
          {/* Notification Bell - EXACT match */}
          <div className="flex items-center gap-3">
            {unreadCount > 0 && (
              <div className="relative">
                <div className="w-8 h-8 bg-orange-50 rounded flex items-center justify-center">
                  <Bell className="w-5 h-5 text-orange-500" />
                </div>
                <div className="absolute -top-1 -right-1 w-[17px] h-[17px] bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {unreadCount}
                </div>
              </div>
            )}
           
          </div>
        </div>
      </div>
     

      {/* Main Content - EXACT spacing match */}
      <div className="space-y-4 p-6">
        
        {/* Welcome Section - EXACT match */}
        <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg px-3 py-2 border border-orange-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <p className="text-[17px] text-gray-600">
                Total Donations: ₹{stats.totalDonations.toLocaleString('en-IN')}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm text-gray-600">This Month</p>
                <p className="text-[15px] font-semibold text-orange-500">
                  ₹{stats.monthDonations.toLocaleString('en-IN')}
                </p>
              </div>
              <div className="w-8 h-8 bg-orange-50 rounded flex items-center justify-center">
                <IndianRupee className="w-5 h-5 text-orange-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards - EXACT match */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {/* Total Donations */}
          <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg border border-gray-200 px-3 py-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Donations</p>
                <p className="text-xl font-semibold text-gray-800 mt-1">
                  ₹{stats.totalDonations.toLocaleString('en-IN')}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="w-3 h-3 text-green-600" />
                  <span className="text-sm text-green-600">+15.8%</span>
                </div>
              </div>
              <div className="p-2 bg-orange-50 rounded">
                <IndianRupee className="w-5 h-5 text-orange-600" />
              </div>
            </div>
          </div>

          {/* Today's Donations */}
          <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg border border-gray-200 px-3 py-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Today</p>
                <p className="text-xl font-semibold text-gray-800 mt-1">
                  ₹{stats.todayDonations.toLocaleString('en-IN')}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <CalendarDays className="w-3 h-3 text-orange-500" />
                  <span className="text-sm text-orange-500">{stats.todayCount} donations</span>
                </div>
              </div>
              <div className="p-2 bg-green-50 rounded">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </div>

          {/* This Month */}
          <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg border border-gray-200 px-3 py-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">This Month</p>
                <p className="text-xl font-semibold text-gray-800 mt-1">
                  ₹{stats.monthDonations.toLocaleString('en-IN')}
                </p>
                <p className="text-xs text-blue-600 mt-2">{stats.monthCount} donors</p>
              </div>
              <div className="p-2 bg-blue-50 rounded">
                <CalendarDays className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Average Donation */}
          <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg border border-gray-200 px-3 py-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Average</p>
                <p className="text-xl font-semibold text-gray-800 mt-1">
                  ₹{stats.avgDonation.toLocaleString('en-IN')}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <Heart className="w-3 h-3 text-red-500" />
                  <span className="text-sm text-red-500">per donation</span>
                </div>
              </div>
              <div className="p-2 bg-purple-50 rounded">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </div>
        </div>
         <div className='flex justify-end '> 
            <button
              onClick={() => handleAction('exportCSV')}
              className="px-3 py-1.5 bg-orange-500 text-white text-sm font-medium rounded hover:bg-orange-600 transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
            </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Daily/Monthly Chart Toggle */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-2">
              <div className="flex gap-2">
                <button
                  onClick={() => setChartView('daily')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2 ${
                    chartView === 'daily' 
                      ? 'bg-orange-500 text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <CalendarDays className="w-4 h-4" />
                  Daily Collection
                </button>
                <button
                  onClick={() => setChartView('monthly')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2 ${
                    chartView === 'monthly' 
                      ? 'bg-orange-500 text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <BarChart3 className="w-4 h-4" />
                  Monthly Collection
                </button>
               
              </div>
            </div>
          </div>

          {/* Chart Display */}
          <div className="lg:col-span-1">
            {chartView === 'daily' ? <DailyChart /> : <MonthlyChart />}
          </div>
          
          {/* Category Distribution */}
          <div className="lg:col-span-1">
            <CategoryPieChart />
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
                placeholder="Search by name, receipt, type..."
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
                All ({donations.length})
              </button>
              <button
                onClick={() => setFilter('today')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                  filter === 'today' 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Today ({donations.filter(d => d.date === '22 Feb 2026').length})
              </button>
              <button
                onClick={() => setFilter('month')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                  filter === 'month' 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                This Month ({donations.filter(d => d.date.includes('Feb 2026')).length})
              </button>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mt-4">
            <button
              onClick={() => setFilter('success')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                filter === 'success' 
                  ? 'bg-green-50 text-green-700 border border-green-300' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Success ({donations.filter(d => d.status === 'success').length})
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                filter === 'pending' 
                  ? 'bg-orange-50 text-orange-500 border border-orange-300' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Pending ({donations.filter(d => d.status === 'pending').length})
            </button>
            <button
              onClick={() => setFilter('general')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                filter === 'general' 
                  ? 'bg-red-50 text-red-700 border border-red-300' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              General
            </button>
            <button
              onClick={() => setFilter('annadanam')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                filter === 'annadanam' 
                  ? 'bg-green-50 text-green-700 border border-green-300' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Annadanam
            </button>
            <button
              onClick={() => setFilter('renovation')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                filter === 'renovation' 
                  ? 'bg-orange-50 text-orange-600 border border-orange-300' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Renovation
            </button>
            <button
              onClick={() => setFilter('corpus')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                filter === 'corpus' 
                  ? 'bg-purple-50 text-purple-600 border border-purple-300' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Corpus
            </button>
          </div>
        </div>

        {/* Donations Table - EXACT match to NotificationsPuja */}
        <div className="bg-white rounded-lg border border-gray-200 w-full overflow-hidden">
          {/* Table Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-[15px] font-bold text-gray-800">Donation History</h3>
              <span className="text-sm text-gray-600">{filteredDonations.length} items</span>
            </div>
          </div>

          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto ">
            <table className="min-w-max whitespace-nowrap">
              <thead className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800 uppercase tracking-wider">Receipt No.</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800 uppercase tracking-wider">Donor</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800 uppercase tracking-wider">Type</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800 uppercase tracking-wider">Date & Time</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800 uppercase tracking-wider">Amount</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800 uppercase tracking-wider">Payment</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredDonations.map((donation) => (
                  <tr 
                    key={donation.id} 
                    className="hover:bg-gray-50"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-800">{donation.receiptNo}</span>
                        {!donation.read && (
                          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full flex items-center justify-center">
                          <span className="text-xs font-semibold text-orange-700">
                            {donation.devoteeAvatar}
                          </span>
                        </div>
                        <span className="text-sm font-medium text-gray-700">{donation.devotee}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className={`p-1.5 rounded ${
                          donation.category === 'general' ? 'bg-red-50' :
                          donation.category === 'renovation' ? 'bg-orange-50' :
                          donation.category === 'annadanam' ? 'bg-green-50' :
                          donation.category === 'festival' ? 'bg-yellow-50' :
                          'bg-purple-50'
                        }`}>
                          {getCategoryIcon(donation.category)}
                        </div>
                        <span className="text-sm text-gray-700">{donation.type}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-900">{donation.date}</span>
                        <span className="text-xs text-gray-500">{donation.time}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm font-semibold text-green-600">₹{donation.amount.toLocaleString('en-IN')}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-gray-700 flex items-center gap-1">
                        {getPaymentIcon(donation.paymentMode)}
                        {donation.paymentMode}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={getStatusStyles(donation.status)}>
                        {donation.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleAction('view', donation)}
                          className="p-1.5 text-gray-600 hover:bg-orange-50 hover:text-orange-600 rounded transition-colors"
                          title="View Receipt"
                        >
                          <Eye className="w-4 h-4" color='blue'/>
                        </button>
                        <button
                          onClick={() => handleAction('downloadReceipt', donation)}
                          className="p-1.5 text-gray-600 hover:bg-gray-100 rounded transition-colors"
                          title="Download Receipt"
                        >
                          <Download className="w-4 h-4" color='green'/>
                        </button>
                        {!donation.receiptSent && (
                          <button
                            onClick={() => handleAction('sendReceipt', donation)}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                            title="Send Receipt"
                          >
                            <Mail className="w-4 h-4" />
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
            {filteredDonations.map((donation) => (
              <div 
                key={donation.id} 
                className={`p-4 transition-colors ${!donation.read ? 'bg-orange-50/30' : 'hover:bg-gray-50'}`}
              >
                {/* Header Row */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      donation.status === 'success' ? 'bg-green-500' :
                      donation.status === 'pending' ? 'bg-orange-500' :
                      'bg-red-500'
                    }`}></div>
                    <span className="text-xs font-medium text-gray-500">{donation.receiptNo}</span>
                    {!donation.read && (
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    )}
                  </div>
                  <span className={getStatusStyles(donation.status)}>
                    {donation.status}
                  </span>
                </div>

                {/* Donor Info */}
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-semibold text-orange-700">
                      {donation.devoteeAvatar}
                    </span>
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="text-[14px] font-semibold text-gray-800">{donation.devotee}</h4>
                    <p className="text-xs text-gray-600 mt-1">{donation.type}</p>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500">Amount</p>
                    <p className="text-sm font-semibold text-green-600 mt-1">₹{donation.amount.toLocaleString('en-IN')}</p>
                  </div>
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500">Date & Time</p>
                    <p className="text-xs font-medium text-gray-800 mt-1">{donation.date}</p>
                    <p className="text-xs text-gray-600">{donation.time}</p>
                  </div>
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500">Payment</p>
                    <p className="text-xs font-medium text-gray-800 mt-1 flex items-center gap-1">
                      {getPaymentIcon(donation.paymentMode)}
                      {donation.paymentMode}
                    </p>
                  </div>
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500">Receipt</p>
                    <p className="text-xs font-medium text-gray-800 mt-1">
                      {donation.receiptSent ? 'Sent' : 'Pending'}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100">
                  <button
                    onClick={() => handleAction('view', donation)}
                    className="px-2.5 py-1 text-xs bg-orange-50 text-orange-500 rounded border border-orange-300 hover:bg-orange-100 flex items-center gap-1"
                  >
                    <Eye className="w-3 h-3" />
                    View
                  </button>
                  
                  <button
                    onClick={() => handleAction('downloadReceipt', donation)}
                    className="px-2.5 py-1 text-xs bg-gray-100 text-gray-800 rounded border border-gray-300 hover:bg-gray-200 flex items-center gap-1"
                  >
                    <Download className="w-3 h-3" />
                    Receipt
                  </button>

                  {!donation.receiptSent && (
                    <button
                      onClick={() => handleAction('sendReceipt', donation)}
                      className="px-2.5 py-1 text-xs bg-blue-50 text-blue-600 rounded border border-blue-300 hover:bg-blue-100 flex items-center gap-1"
                    >
                      <Mail className="w-3 h-3" />
                      Send
                    </button>
                  )}

                  {!donation.read && (
                    <button
                      onClick={() => handleAction('markAsRead', donation)}
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
          {filteredDonations.length === 0 && (
            <div className="p-8 text-center">
              <div className="p-4 rounded-full inline-flex items-center justify-center mb-4 bg-gray-100">
                <IndianRupee className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium mb-2 text-gray-800">
                No donations found
              </h3>
              <p className="text-sm text-gray-600">
                {searchQuery ? 'Try adjusting your search or filters' : 'No donations match the selected criteria'}
              </p>
            </div>
          )}

          {/* Footer */}
          {filteredDonations.length > 0 && (
            <div className="p-3 bg-gray-50 border-t border-gray-200">
              <button className="text-sm font-medium text-orange-500 hover:text-orange-600 flex items-center justify-center gap-1 w-full">
                View All Donations
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Bottom Section - EXACT match */}
        <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg border border-gray-200 p-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-center sm:text-left">
              <p className="text-sm text-gray-600">Need donation reports?</p>
              <p className="text-[14px] text-gray-800">Generate custom reports for any date range</p>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 text-sm bg-gray-100 text-gray-800 rounded border border-gray-300 hover:bg-gray-200">
                Custom Report
              </button>
              <button className="px-3 py-1.5 text-sm bg-gradient-to-r from-orange-300 to-orange-300 text-gray-800 hover:text-white rounded hover:from-orange-500 hover:to-orange-600">
                Export All Data
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <ReceiptModal />
    </div>
  );
};

export default Donations;