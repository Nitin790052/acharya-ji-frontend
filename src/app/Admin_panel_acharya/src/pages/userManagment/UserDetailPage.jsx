import React, { useState } from "react";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiCalendar,
  FiClock,
  FiGlobe,
  FiSmartphone,
  FiMonitor,
  FiShoppingBag,
  FiDollarSign,
  FiCreditCard,
  FiMessageCircle,
  FiAlertCircle,
  FiCheckCircle,
  FiXCircle,
  FiEye,
  FiDownload,
  FiPrinter,
  FiArrowLeft,
  FiAward,
  FiTrendingUp,
  FiPackage,
  FiHelpCircle,
  FiRefreshCw,
  FiStar,
  FiMoreVertical,
  FiChevronRight
} from "react-icons/fi";

const UserDetailPage = () => {
  const [activeTab, setActiveTab] = useState('bookings');
  const [isLoading, setIsLoading] = useState(false);

  // Mock User Data
  const userData = {
    id: 1,
    name: "Rajesh Kumar",
    email: "rajesh.k@email.com",
    phone: "+91 98765 43210",
    location: "Mumbai, Maharashtra",
    avatar: "RK",
    profileImage: null,
    registrationDate: "2024-01-15T10:30:00",
    lastLogin: "2024-03-15T09:45:00",
    ipAddress: "192.168.1.105",
    deviceInfo: "Chrome / Windows 11",
    status: "active",
    totalBookings: 24,
    totalOrders: 15,
    totalSpend: 45600,
    totalRefunds: 3200,
    activeDisputes: 1
  };

  // Mock Booking History
  const bookingsData = [
    {
      id: "BKG001",
      serviceType: "Ganesh Puja",
      vendor: "Pt. Ramesh",
      date: "2024-03-15T10:00:00",
      amount: 2500,
      status: "completed"
    },
    {
      id: "BKG002",
      serviceType: "Lakshmi Puja",
      vendor: "Dr. Sharma",
      date: "2024-03-10T18:30:00",
      amount: 3500,
      status: "upcoming"
    },
    {
      id: "BKG003",
      serviceType: "Satyanarayan Katha",
      vendor: "Acharya Singh",
      date: "2024-03-05T07:00:00",
      amount: 4000,
      status: "completed"
    },
    {
      id: "BKG004",
      serviceType: "Shiv Puja",
      vendor: "Pt. Verma",
      date: "2024-02-28T09:00:00",
      amount: 2800,
      status: "cancelled"
    },
    {
      id: "BKG005",
      serviceType: "Durga Puja",
      vendor: "Acharya Gupta",
      date: "2024-02-20T16:00:00",
      amount: 5500,
      status: "completed"
    }
  ];

  // Mock Order History
  const ordersData = [
    {
      id: "ORD001",
      products: [
        { name: "Puja Thali", quantity: 1, price: 500 },
        { name: "Modak", quantity: 21, price: 1000 },
        { name: "Flowers", quantity: 2, price: 500 }
      ],
      totalAmount: 2000,
      paymentMode: "UPI",
      status: "delivered",
      deliveryStatus: "delivered"
    },
    {
      id: "ORD002",
      products: [
        { name: "Lakshmi Idol", quantity: 1, price: 1500 },
        { name: "Lotus Flowers", quantity: 108, price: 1000 },
        { name: "Incense Sticks", quantity: 2, price: 500 }
      ],
      totalAmount: 3000,
      paymentMode: "Credit Card",
      status: "shipped",
      deliveryStatus: "shipped"
    },
    {
      id: "ORD003",
      products: [
        { name: "Puja Kit", quantity: 1, price: 2000 },
        { name: "Prasad", quantity: 5, price: 1000 },
        { name: "Fruits", quantity: 5, price: 500 }
      ],
      totalAmount: 3500,
      paymentMode: "Net Banking",
      status: "processing",
      deliveryStatus: "processing"
    },
    {
      id: "ORD004",
      products: [
        { name: "Durga Idol", quantity: 1, price: 3000 },
        { name: "Puja Items", quantity: 1, price: 1500 },
        { name: "Flowers", quantity: 5, price: 500 }
      ],
      totalAmount: 5000,
      paymentMode: "UPI",
      status: "cancelled",
      deliveryStatus: "cancelled"
    }
  ];

  // Mock Support Tickets
  const supportTickets = [
    {
      id: "TKT001",
      subject: "Payment not reflected",
      status: "resolved",
      date: "2024-03-14T11:30:00"
    },
    {
      id: "TKT002",
      subject: "Vendor not responding",
      status: "in-progress",
      date: "2024-03-13T15:45:00"
    },
    {
      id: "TKT003",
      subject: "Wrong product delivered",
      status: "pending",
      date: "2024-03-12T09:20:00"
    },
    {
      id: "TKT004",
      subject: "Refund not processed",
      status: "resolved",
      date: "2024-03-10T14:15:00"
    }
  ];

  // Mock Refund History
  const refundsData = [
    {
      id: "REF001",
      referenceId: "BKG004",
      referenceType: "Booking",
      amount: 2800,
      reason: "Customer cancelled",
      status: "approved",
      date: "2024-02-29T10:00:00"
    },
    {
      id: "REF002",
      referenceId: "ORD004",
      referenceType: "Order",
      amount: 5000,
      reason: "Wrong item delivered",
      status: "approved",
      date: "2024-03-01T14:30:00"
    },
    {
      id: "REF003",
      referenceId: "BKG006",
      referenceType: "Booking",
      amount: 3200,
      reason: "Vendor unavailable",
      status: "pending",
      date: "2024-03-15T09:00:00"
    }
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      completed: { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-200', icon: FiCheckCircle },
      delivered: { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-200', icon: FiCheckCircle },
      upcoming: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-200', icon: FiClock },
      processing: { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-200', icon: FiRefreshCw },
      shipped: { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-200', icon: FiPackage },
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-200', icon: FiClock },
      cancelled: { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-200', icon: FiXCircle },
      resolved: { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-200', icon: FiCheckCircle },
      'in-progress': { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-200', icon: FiRefreshCw },
      approved: { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-200', icon: FiCheckCircle },
      rejected: { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-200', icon: FiXCircle }
    };

    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${config.bg} ${config.text} ${config.border}`}>
        <Icon size={10} />
        <span className="capitalize">{status}</span>
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Global Styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Custom Scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #959190/20;
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #c0e0d0;
        }
        
        /* Card Hover Effect */
        .stats-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .stats-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        
        /* Tab Transition */
        .tab-content {
          animation: fadeIn 0.3s ease-out;
        }
        
        @media (max-width: 640px) {
          .profile-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* Header with Back Button */}
      <div className="bg-white border-b border-blue-900/20 sticky top-0 z-10 ">
        <div className="px-6 py-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <FiUser className="text-blue-900 w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-gray-900 uppercase">User Profile <span className="text-orange-600">Overview</span></h1>
              <p className="text-sm text-gray-500 font-medium italic-none">View detailed user information and activity history in the divine community</p>
            </div>

          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-6 space-y-6">
        {/* Profile Section - Premium Card Design */}
        <div className="bg-white rounded-xl border border-blue-900/20 p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Profile Image/Avatar */}
            <div className="shrink-0">
              <div className="w-32 h-32 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-4xl">{userData.avatar}</span>
              </div>
            </div>

            {/* User Info Grid */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <FiUser className="text-blue-900" size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Full Name</p>
                    <p className="text-sm font-medium text-gray-900">{userData.name}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FiMail className="text-blue-600" size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Email Address</p>
                    <p className="text-sm font-medium text-gray-900">{userData.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <FiPhone className="text-green-600" size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Phone Number</p>
                    <p className="text-sm font-medium text-gray-900">{userData.phone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="p-2 bg-amber-100 rounded-lg border border-amber-200">
                    <FiMapPin className="text-amber-600" size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Location</p>
                    <p className="text-sm font-medium text-gray-900">{userData.location}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <FiCalendar className="text-yellow-600" size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Registration Date</p>
                    <p className="text-sm font-medium text-gray-900">{formatDate(userData.registrationDate)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="p-2 bg-indigo-100 rounded-lg">
                    <FiClock className="text-indigo-600" size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Last Login</p>
                    <p className="text-sm font-medium text-gray-900">{formatDate(userData.lastLogin)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <FiGlobe className="text-red-600" size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">IP Address</p>
                    <p className="text-sm font-medium text-gray-900">{userData.ipAddress}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="p-2 bg-teal-100 rounded-lg">
                    <FiMonitor className="text-teal-600" size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Device Info</p>
                    <p className="text-sm font-medium text-gray-900">{userData.deviceInfo}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Total Bookings */}
          <div className="stats-card bg-white border-l-8 border-l-[#959190]/20 border-b-8 border-b-[#959190]/20 rounded-s-xl rounded-br border border-blue-900/20 p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 rounded-lg bg-blue-50">
                <FiCalendar className="text-blue-600 w-5 h-5" />
              </div>
            </div>
            <h3 className="text-[23px] font-bold text-gray-900">{userData.totalBookings}</h3>
            <p className="text-sm text-gray-500">Total Bookings</p>
          </div>

          {/* Total Orders */}
          <div className="stats-card bg-white border-l-8 border-l-[#959190]/20 border-b-8 border-b-[#959190]/20 rounded-s-xl rounded-br border border-blue-900/20 p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 rounded-lg bg-green-50">
                <FiShoppingBag className="text-green-600 w-5 h-5" />
              </div>
            </div>
            <h3 className="text-[23px] font-bold text-gray-900">{userData.totalOrders}</h3>
            <p className="text-sm text-gray-500">Total Orders</p>
          </div>

          {/* Total Spend */}
          <div className="stats-card bg-white border-l-8 border-l-[#959190]/20 border-b-8 border-b-[#959190]/20 rounded-s-xl rounded-br border border-blue-900/20 p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 rounded-lg bg-orange-50">
                <FiDollarSign className="text-orange-600 w-5 h-5" />
              </div>
            </div>
            <h3 className="text-[23px] font-bold text-gray-900">{formatCurrency(userData.totalSpend)}</h3>
            <p className="text-sm text-gray-500">Total Spend</p>
          </div>

          {/* Total Refunds */}
          <div className="stats-card bg-white border-l-8 border-l-[#959190]/20 border-b-8 border-b-[#959190]/20 rounded-s-xl rounded-br border border-blue-900/20 p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 rounded-lg bg-red-50">
                <FiCreditCard className="text-red-600 w-5 h-5" />
              </div>
            </div>
            <h3 className="text-[23px] font-bold text-gray-900">{formatCurrency(userData.totalRefunds)}</h3>
            <p className="text-sm text-gray-500">Total Refunds</p>
          </div>

          {/* Active Disputes */}
          <div className="stats-card bg-white border-l-8 border-l-[#959190]/20 border-b-8 border-b-[#959190]/20 rounded-s-xl rounded-br border border-blue-900/20 p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 rounded-lg bg-yellow-50">
                <FiAlertCircle className="text-yellow-600 w-5 h-5" />
              </div>
            </div>
            <h3 className="text-[23px] font-bold text-gray-900">{userData.activeDisputes}</h3>
            <p className="text-sm text-gray-500">Active Disputes</p>
            {userData.activeDisputes > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
            )}
          </div>
        </div>

        {/* Tabs Section */}
        <div className="bg-white rounded-xl border border-blue-900/20 overflow-hidden">
          {/* Tab Headers */}
          <div className="border-b border-blue-900/20">
            <div className="flex overflow-x-auto">
              {[
                { id: 'bookings', label: 'Booking History', icon: FiCalendar },
                { id: 'orders', label: 'Order History', icon: FiShoppingBag },
                { id: 'support', label: 'Support History', icon: FiMessageCircle },
                { id: 'refunds', label: 'Refund History', icon: FiCreditCard }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-all duration-200 border-b-2 whitespace-nowrap
                    ${activeTab === tab.id
                      ? 'border-blue-900 text-blue-900 bg-blue-50/50'
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                >
                  <tab.icon size={16} className={activeTab === tab.id ? 'text-blue-900' : 'text-gray-400'} />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6 tab-content">
            {/* Booking History Tab */}
            {activeTab === 'bookings' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <FiCalendar className="text-blue-900" />
                  Booking History
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-[#959190]/10">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Booking ID</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Service Type</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Vendor</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Date</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Amount</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Status</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {bookingsData.map((booking) => (
                        <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3 text-sm font-medium text-gray-900">{booking.id}</td>
                          <td className="px-4 py-3 text-sm text-gray-600">{booking.serviceType}</td>
                          <td className="px-4 py-3 text-sm text-gray-600">{booking.vendor}</td>
                          <td className="px-4 py-3 text-sm text-gray-600">{formatDate(booking.date)}</td>
                          <td className="px-4 py-3 text-sm font-semibold text-gray-900">{formatCurrency(booking.amount)}</td>
                          <td className="px-4 py-3">{getStatusBadge(booking.status)}</td>
                          <td className="px-4 py-3">
                            <button className="p-1 rounded-lg bg-green-50 hover:bg-green-100 text-green-600 transition-colors border border-green-200">
                              <FiEye size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Order History Tab */}
            {activeTab === 'orders' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <FiShoppingBag className="text-blue-900" />
                  Order History
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-[#959190]/10">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Order ID</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Products</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Amount</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Payment Mode</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Status</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Delivery Status</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {ordersData.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3 text-sm font-medium text-gray-900">{order.id}</td>
                          <td className="px-4 py-3">
                            <div className="space-y-1">
                              {order.products.map((product, idx) => (
                                <div key={idx} className="text-xs text-gray-600">
                                  {product.name} x{product.quantity}
                                </div>
                              ))}
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm font-semibold text-gray-900">{formatCurrency(order.totalAmount)}</td>
                          <td className="px-4 py-3 text-sm text-gray-600">{order.paymentMode}</td>
                          <td className="px-4 py-3">{getStatusBadge(order.status)}</td>
                          <td className="px-4 py-3">{getStatusBadge(order.deliveryStatus)}</td>
                          <td className="px-4 py-3">
                            <button className="p-1 rounded-lg bg-green-50 hover:bg-green-100 text-green-600 transition-colors border border-green-200">
                              <FiEye size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Support History Tab */}
            {activeTab === 'support' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <FiMessageCircle className="text-blue-900" />
                  Support History
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-[#959190]/10">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Ticket ID</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Subject</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Status</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Date</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {supportTickets.map((ticket) => (
                        <tr key={ticket.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3 text-sm font-medium text-gray-900">{ticket.id}</td>
                          <td className="px-4 py-3 text-sm text-gray-600">{ticket.subject}</td>
                          <td className="px-4 py-3">{getStatusBadge(ticket.status)}</td>
                          <td className="px-4 py-3 text-sm text-gray-600">{formatDate(ticket.date)}</td>
                          <td className="px-4 py-3">
                            <button className="p-1 rounded-lg bg-green-50 hover:bg-green-100 text-green-600 transition-colors border border-green-200">
                              <FiEye size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Refund History Tab */}
            {activeTab === 'refunds' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <FiCreditCard className="text-blue-900" />
                  Refund History
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-[#959190]/10">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Refund ID</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Booking/Order ID</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Amount</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Reason</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Status</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {refundsData.map((refund) => (
                        <tr key={refund.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3 text-sm font-medium text-gray-900">{refund.id}</td>
                          <td className="px-4 py-3 text-sm text-gray-600">
                            {refund.referenceId} ({refund.referenceType})
                          </td>
                          <td className="px-4 py-3 text-sm font-semibold text-gray-900">{formatCurrency(refund.amount)}</td>
                          <td className="px-4 py-3 text-sm text-gray-600">{refund.reason}</td>
                          <td className="px-4 py-3">{getStatusBadge(refund.status)}</td>
                          <td className="px-4 py-3 text-sm text-gray-600">{formatDate(refund.date)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions Footer */}
        <div className="flex items-center justify-end gap-3">
          <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors border border-gray-300 flex items-center gap-2">
            <FiPrinter size={16} />
            Print Profile
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors border border-gray-300 flex items-center gap-2">
            <FiDownload size={16} />
            Export Data
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors flex items-center gap-2 shadow-md">
            <FiMessageCircle size={16} />
            Contact User
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetailPage;
