import React, { useState, useEffect, useRef } from "react";
import {
  FiUsers,
  FiUserCheck,
  FiCalendar,
  FiDollarSign,
  FiClock,
  FiActivity,
  FiTrendingUp,
  FiStar,
  FiMapPin,
  FiCreditCard,
  FiAlertCircle,
  FiRefreshCw,
  FiEye,
  FiMoreVertical,
  FiShoppingBag,
  FiPackage,
  FiAward,
  FiBookOpen,
  FiMessageCircle,
  FiCheckCircle,
  FiXCircle,
  FiHelpCircle,
  FiHome,
  FiFilter,
  FiDownload,
  FiUpload,
  FiPrinter,
  FiMail,
  FiPhone,
  FiX
} from "react-icons/fi";
import { useReactToPrint } from "react-to-print";

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const printref = useRef();

  // print logic 
  const handleprint = useReactToPrint({
    contentRef: printref,
    documentTitle: "print pdf"
  });



  // Stats Cards Data
  const statsCards = [
    {
      id: 1,
      title: "Total Users",
      value: "45,678",
      change: "+12.5%",
      icon: <FiUsers className="w-6 h-6" />,
      bgLight: "bg-blue-50",
      textColor: "text-blue-600"
    },
    {
      id: 2,
      title: "Total Vendors",
      value: "234",
      change: "+8.2%",
      icon: <FiUserCheck className="w-6 h-6" />,
      bgLight: "bg-amber-50",
      textColor: "text-amber-600"
    },
    {
      id: 3,
      title: "Today Bookings",
      value: "156",
      change: "+23.1%",
      icon: <FiCalendar className="w-6 h-6" />,
      bgLight: "bg-green-50",
      textColor: "text-green-600"
    },
    {
      id: 4,
      title: "Monthly Revenue",
      value: "₹12,45,678",
      change: "+18.3%",
      icon: <FiDollarSign className="w-6 h-6" />,
      bgLight: "bg-orange-50",
      textColor: "text-orange-600"
    },
    {
      id: 5,
      title: "Pending Payments",
      value: "₹2,34,567",
      change: "-5.2%",
      icon: <FiCreditCard className="w-6 h-6" />,
      bgLight: "bg-red-50",
      textColor: "text-red-600"
    },
    {
      id: 6,
      title: "Active Services",
      value: "48",
      change: "+4",
      icon: <FiActivity className="w-6 h-6" />,
      bgLight: "bg-indigo-50",
      textColor: "text-indigo-600"
    }
  ];

  // Recent Activity Data
  const recentActivities = [
    {
      id: 1,
      type: 'user',
      action: 'New user registered',
      user: 'Rajesh Kumar',
      time: '2 minutes ago',
      icon: <FiUsers className="text-blue-500" />
    },
    {
      id: 2,
      type: 'booking',
      action: 'New booking created',
      user: 'Priya Singh',
      details: 'Ganesh Puja - Tomorrow 10 AM',
      time: '15 minutes ago',
      icon: <FiCalendar className="text-green-500" />
    },
    {
      id: 3,
      type: 'vendor',
      action: 'Vendor accepted booking',
      user: 'Pt. Ramesh',
      details: 'Booking #12345',
      time: '25 minutes ago',
      icon: <FiUserCheck className="text-purple-500" />
    },
    {
      id: 4,
      type: 'blog',
      action: 'New blog posted',
      user: 'Acharya Sharma',
      details: 'Significance of Maha Shivratri',
      time: '1 hour ago',
      icon: <FiBookOpen className="text-orange-500" />
    },
    {
      id: 5,
      type: 'payment',
      action: 'Payment received',
      user: 'Vendor: Pt. Ramesh',
      details: '₹5,000 - Booking #12340',
      time: '2 hours ago',
      icon: <FiDollarSign className="text-green-500" />
    },
    {
      id: 6,
      type: 'message',
      action: 'New message from user',
      user: 'Amit Patel',
      time: '3 hours ago',
      icon: <FiMessageCircle className="text-blue-500" />
    }
  ];

  // Pending Actions
  const pendingActions = [
    {
      id: 1,
      type: 'vendor',
      title: 'Vendor Approval Pending',
      count: 12,
      icon: <FiUserCheck />,
      color: 'text-amber-600',
      bgColor: 'bg-amber-100'
    },
    {
      id: 2,
      type: 'payment',
      title: 'Payment Settlements',
      count: 8,
      icon: <FiCreditCard />,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      id: 3,
      type: 'booking',
      title: 'Unconfirmed Bookings',
      count: 23,
      icon: <FiClock />,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    },
    {
      id: 4,
      type: 'refund',
      title: 'Refund Requests',
      count: 5,
      icon: <FiRefreshCw />,
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    },
    {
      id: 5,
      type: 'support',
      title: 'Support Tickets',
      count: 7,
      icon: <FiHelpCircle />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    }
  ];

  // Top Astrologers
  const topAstrologers = [
    { id: 1, name: 'Pt. Ramesh', bookings: 145, rating: 4.8, icon: <FiAward className="text-yellow-500" /> },
    { id: 2, name: 'Dr. Sharma', bookings: 132, rating: 4.9, icon: <FiStar className="text-yellow-500" /> },
    { id: 3, name: 'Acharya Singh', bookings: 128, rating: 4.7, icon: <FiAward className="text-yellow-500" /> },
    { id: 4, name: 'Pt. Verma', bookings: 118, rating: 4.8, icon: <FiStar className="text-yellow-500" /> },
    { id: 5, name: 'Acharya Gupta', bookings: 105, rating: 4.6, icon: <FiAward className="text-yellow-500" /> }
  ];

  // Recent Orders with complete data
  const recentOrders = [
    {
      id: '#12345',
      customer: 'Rajesh K.',
      customerFull: 'Rajesh Kumar',
      customerEmail: 'rajesh.k@email.com',
      customerPhone: '+91 98765 43210',
      puja: 'Ganesh Puja',
      pujaDetails: 'Ganesh Chaturthi Special Puja with 108 chants',
      amount: '₹2,500',
      status: 'completed',
      date: '2024-03-15',
      time: '10:00 AM',
      address: '123 MG Road, Bangalore',
      paymentMethod: 'UPI',
      astrologer: 'Pt. Ramesh',
      items: [
        { name: 'Puja Thali', quantity: 1, price: '₹500' },
        { name: 'Modak', quantity: 21, price: '₹1,000' },
        { name: 'Flowers', quantity: 2, price: '₹500' }
      ],
      totalItems: 3,
      icon: <FiCheckCircle className="text-green-500" />
    },
    {
      id: '#12346',
      customer: 'Priya S.',
      customerFull: 'Priya Singh',
      customerEmail: 'priya.s@email.com',
      customerPhone: '+91 98765 43211',
      puja: 'Lakshmi Puja',
      pujaDetails: 'Lakshmi Puja for wealth and prosperity',
      amount: '₹3,500',
      status: 'pending',
      date: '2024-03-16',
      time: '06:00 PM',
      address: '456 Park Street, Mumbai',
      paymentMethod: 'Credit Card',
      astrologer: 'Dr. Sharma',
      items: [
        { name: 'Lakshmi Idol', quantity: 1, price: '₹1,500' },
        { name: 'Lotus Flowers', quantity: 108, price: '₹1,000' },
        { name: 'Incense Sticks', quantity: 2, price: '₹500' }
      ],
      totalItems: 3,
      icon: <FiClock className="text-yellow-500" />
    },
    {
      id: '#12347',
      customer: 'Amit P.',
      customerFull: 'Amit Patel',
      customerEmail: 'amit.p@email.com',
      customerPhone: '+91 98765 43212',
      puja: 'Satyanarayan',
      pujaDetails: 'Satyanarayan Katha for family peace',
      amount: '₹4,000',
      status: 'processing',
      date: '2024-03-16',
      time: '07:30 PM',
      address: '789 Lake Road, Delhi',
      paymentMethod: 'Net Banking',
      astrologer: 'Acharya Singh',
      items: [
        { name: 'Puja Kit', quantity: 1, price: '₹2,000' },
        { name: 'Prasad', quantity: 5, price: '₹1,000' },
        { name: 'Fruits', quantity: 5, price: '₹500' }
      ],
      totalItems: 3,
      icon: <FiRefreshCw className="text-blue-500" />
    },
    {
      id: '#12348',
      customer: 'Neha G.',
      customerFull: 'Neha Gupta',
      customerEmail: 'neha.g@email.com',
      customerPhone: '+91 98765 43213',
      puja: 'Durga Puja',
      pujaDetails: 'Durga Puja for protection and strength',
      amount: '₹5,500',
      status: 'cancelled',
      date: '2024-03-14',
      time: '09:00 AM',
      address: '321 Hill Road, Pune',
      paymentMethod: 'UPI',
      astrologer: 'Pt. Verma',
      items: [
        { name: 'Durga Idol', quantity: 1, price: '₹3,000' },
        { name: 'Puja Items', quantity: 1, price: '₹1,500' },
        { name: 'Flowers', quantity: 5, price: '₹500' }
      ],
      totalItems: 3,
      icon: <FiXCircle className="text-red-500" />
    },
    {
      id: '#12349',
      customer: 'Vikram S.',
      customerFull: 'Vikram Singh',
      customerEmail: 'vikram.s@email.com',
      customerPhone: '+91 98765 43214',
      puja: 'Shiv Puja',
      pujaDetails: 'Shiv Puja for spiritual growth',
      amount: '₹2,000',
      status: 'completed',
      date: '2024-03-15',
      time: '05:00 PM',
      address: '654 Temple Street, Chennai',
      paymentMethod: 'Debit Card',
      astrologer: 'Acharya Gupta',
      items: [
        { name: 'Shivling', quantity: 1, price: '₹1,000' },
        { name: 'Bel Patra', quantity: 108, price: '₹500' },
        { name: 'Dhatura', quantity: 50, price: '₹500' }
      ],
      totalItems: 3,
      icon: <FiCheckCircle className="text-green-500" />
    }
  ];

  const openModal = (order) => {
    console.log("Opening modal for order:", order);
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    console.log("Closing modal");
    setIsModalOpen(false);
    setSelectedOrder(null);
  };



  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b border-lime-200  top-0 z-10">
        <div className="px-6 py-2">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-black text-gray-900 uppercase flex items-center gap-3">
                <div className="p-2 bg-orange-50 rounded-lg">
                  <FiHome className="text-orange-600 w-6 h-6" />
                </div>
                <span>Dashboard <span className="text-orange-600">Overview</span></span>
              </h1>
            </div>

            {/* Action Buttons - Only Time Range Selector */}
            <div className="flex items-center gap-3">
              {/* Time Range Selector */}
              <div className="flex items-center gap-2 bg-white rounded-lg p-1 border border-[#daf1e5]">
                {['week', 'month', 'year'].map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-3 py-1.5 text-sm font-medium rounded-md capitalize transition-colors flex items-center gap-1
                      ${timeRange === range
                        ? 'bg-[#959190]/20 text-black'
                        : 'text-gray-600 hover:bg-gray-100'
                      }`}
                  >
                    {range === 'week' && <FiClock size={14} />}
                    {range === 'month' && <FiCalendar size={14} />}
                    {range === 'year' && <FiTrendingUp size={14} />}
                    {range}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content with proper spacing */}
      <div className="px-6 py-6 space-y-6">
        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {statsCards.map((card) => (
            <div
              key={card.id}
              className="bg-white border-l-8 border-l-[#959190]/20 border-b-8 border-b-[#959190]/20 rounded-s-xl rounded-br border border-[#959190]/20 p-4 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg ${card.bgLight}`}>
                  <div className={card.textColor}>{card.icon}</div>
                </div>
                <span className={`text-xs font-medium flex items-center gap-1 ${card.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                  }`}>
                  {card.change.startsWith('+') ? <FiTrendingUp size={12} /> : <FiTrendingUp size={12} className="rotate-180" />}
                  {card.change}
                </span>
              </div>
              <h3 className="text-[23px] font-bold text-gray-900">{card.value}</h3>
              <p className="text-sm text-gray-500 mt-1">{card.title}</p>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity - Takes 2 columns */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-[#959190]/20 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <FiActivity className="text-blue-900" />
                Recent Activity
              </h2>
              <div className="flex items-center gap-2">
                <button className="p-1.5 hover:bg-gray-100 rounded-sm border border-gray-300 cursor-pointer">
                  <FiFilter size={16} className="text-gray-500" />
                </button>
                <button className="p-1.5 hover:bg-gray-100 rounded-sm border border-gray-300 cursor-pointer">
                  <FiDownload size={16} className="text-gray-500" />
                </button>
                <button className="text-sm text-green-600 hover:text-green-700 font-bold">
                  View All
                </button>
              </div>
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="p-2 rounded-full bg-gray-100">
                    {activity.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-600">{activity.user}</p>
                    {activity.details && (
                      <p className="text-xs text-gray-500 mt-1">{activity.details}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">{activity.time}</span>
                    <FiMoreVertical size={14} className="text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Pending Actions & Top Astrologers */}
          <div className="space-y-6">
            {/* Pending Actions */}
            <div className="bg-white rounded-xl border border-[#959190]/20 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FiAlertCircle className="text-blue-900" />
                Pending Actions
              </h2>
              <div className="space-y-4">
                {pendingActions.map((action) => (
                  <div key={action.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${action.bgColor}`}>
                        <div className={action.color}>{action.icon}</div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{action.title}</p>
                        <p className="text-xs text-gray-500">Requires attention</p>
                      </div>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${action.bgColor} ${action.color}`}>
                      {action.count}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Astrologers */}
            <div className="bg-white rounded-xl border border-[#959190]/20 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FiStar className="text-blue-900" />
                Top Astrologers
              </h2>
              <div className="space-y-4">
                {topAstrologers.map((astro) => (
                  <div key={astro.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                        {astro.icon}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{astro.name}</p>
                        <p className="text-xs text-gray-500">{astro.bookings} bookings</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <FiStar className="text-yellow-500" size={14} />
                      <span className="text-sm font-medium text-gray-900">{astro.rating}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Orders Table */}
        <div ref={printref} className="bg-white rounded-xl border border-[#959190]/20 p-6 print:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <FiShoppingBag className="text-blue-900" />
              Recent Orders
            </h2>
            <div className="flex items-center gap-2 print:hidden">
              <button onClick={handleprint} className="p-1.5 hover:bg-gray-100 rounded-sm border border-gray-300 cursor-pointer">
                <FiPrinter size={16} className="text-gray-500" />
              </button>
              <button className="p-1.5 hover:bg-gray-100 rounded-sm border border-gray-300 cursor-pointer">
                <FiUpload size={16} className="text-gray-500" />
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#959190]/10">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Order ID</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Customer</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Puja Type</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Amount</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">{order.id}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{order.customer}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{order.puja}</td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{order.amount}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium
                        ${order.status === 'completed' ? 'bg-green-100 text-green-600' : ''}
                        ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-600' : ''}
                        ${order.status === 'processing' ? 'bg-blue-100 text-blue-600' : ''}
                        ${order.status === 'cancelled' ? 'bg-red-100 text-red-600' : ''}
                      `}>
                        {order.icon}
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => openModal(order)}
                        className="p-1.5 bg-green-50 hover:bg-green-100 text-green-600 rounded-lg transition-colors border border-green-200 cursor-pointer"
                        title="View Details"
                      >
                        <FiEye size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Simple Modal - exactly as you wanted */}
      {isModalOpen && selectedOrder && (
        <div
          className="fixed inset-0 z-9999 flex items-center justify-center p-4"
          style={{
            animation: 'fadeIn 0.2s ease-out'
          }}
        >

          {/* Overlay with blur effect */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeModal}
          />

          {/* Modal Panel with animation */}
          <div
            className="relative z-10 bg-white rounded-2xl shadow-2xl w-full max-w-3xl transform transition-all duration-300 scale-100"
            style={{
              animation: 'slideUp 0.3s ease-out'
            }}
          >

            {/* Modal Header with gradient */}
            <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-5 text-white flex justify-between items-center rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <FiShoppingBag className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Order Details</h3>
                  <p className="text-sm text-orange-50">{selectedOrder.id}</p>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="hover:bg-white/20 p-2 rounded-lg transition-all duration-200"
              >
                <FiX size={20} />
              </button>
            </div>

            {/* Modal Content with better spacing */}
            <div className="p-6 max-h-[70vh] overflow-y-auto">

              {/* Status Badge - Floating at top */}
              <div className="flex justify-end mb-4">
                <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium shadow-sm
            ${selectedOrder.status === 'completed' ? 'bg-green-100 text-green-700 border border-green-200' : ''}
            ${selectedOrder.status === 'pending' ? 'bg-yellow-100 text-yellow-700 border border-yellow-200' : ''}
            ${selectedOrder.status === 'processing' ? 'bg-blue-100 text-blue-700 border border-blue-200' : ''}
            ${selectedOrder.status === 'cancelled' ? 'bg-red-100 text-red-700 border border-red-200' : ''}
          `}>
                  {selectedOrder.icon}
                  <span className="capitalize">{selectedOrder.status}</span>
                </span>
              </div>

              {/* Two Column Layout for better organization */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* Customer Info Card */}
                <div className="bg-gradient-to-br from-gray-50 to-white p-5 rounded-xl border border-gray-100 shadow-sm">
                  <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                    <FiUserCheck className="text-orange-500" size={16} />
                    Customer Information
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                        <span className="text-orange-600 font-semibold text-sm">
                          {selectedOrder.customerFull.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{selectedOrder.customerFull}</p>
                        <p className="text-xs text-gray-500">Customer</p>
                      </div>
                    </div>
                    <div className="pl-2 space-y-2">
                      <p className="text-sm flex items-center gap-2">
                        <FiMail className="text-gray-400" size={14} />
                        <span className="text-gray-600">{selectedOrder.customerEmail}</span>
                      </p>
                      <p className="text-sm flex items-center gap-2">
                        <FiPhone className="text-gray-400" size={14} />
                        <span className="text-gray-600">{selectedOrder.customerPhone}</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Puja Details Card */}
                <div className="bg-gradient-to-br from-gray-50 to-white p-5 rounded-xl border border-gray-100 shadow-sm">
                  <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                    <FiCalendar className="text-orange-500" size={16} />
                    Puja Details
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Type</span>
                      <span className="font-medium text-gray-900">{selectedOrder.puja}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Astrologer</span>
                      <span className="font-medium text-gray-900">{selectedOrder.astrologer}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Date</span>
                      <span className="font-medium text-gray-900">{selectedOrder.date}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Time</span>
                      <span className="font-medium text-gray-900">{selectedOrder.time}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Puja Details Description */}
              <div className="mt-5 bg-orange-50 p-4 rounded-xl border border-orange-100">
                <p className="text-sm text-gray-700 italic">"{selectedOrder.pujaDetails}"</p>
              </div>

              {/* Payment & Items Section */}
              <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-5">

                {/* Payment Card */}
                <div className="md:col-span-1 bg-gradient-to-br from-gray-50 to-white p-5 rounded-xl border border-gray-100 shadow-sm">
                  <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                    <FiCreditCard className="text-orange-500" size={16} />
                    Payment
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-500">Amount</p>
                      <p className="text-xl font-bold text-gray-900">{selectedOrder.amount}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Method</p>
                      <p className="text-sm font-medium text-gray-700">{selectedOrder.paymentMethod}</p>
                    </div>
                  </div>
                </div>

                {/* Items Card */}
                <div className="md:col-span-2 bg-gradient-to-br from-gray-50 to-white p-5 rounded-xl border border-gray-100 shadow-sm">
                  <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                    <FiPackage className="text-orange-500" size={16} />
                    Order Items ({selectedOrder.totalItems})
                  </h4>
                  <div className="space-y-2">
                    {selectedOrder.items?.map((item, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                        <div>
                          <span className="text-sm font-medium text-gray-900">{item.name}</span>
                          <span className="text-xs text-gray-500 ml-2">x{item.quantity}</span>
                        </div>
                        <span className="text-sm font-semibold text-gray-900">{item.price}</span>
                      </div>
                    ))}
                    <div className="flex justify-between items-center pt-2 mt-2 border-t border-lime-200">
                      <span className="text-sm font-semibold text-gray-700">Total</span>
                      <span className="text-lg font-bold text-green-600">{selectedOrder.amount}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Address Card */}
              <div className="mt-5 bg-gradient-to-br from-gray-50 to-white p-5 rounded-xl border border-gray-100 shadow-sm">
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2 text-sm uppercase tracking-wider">
                  <FiMapPin className="text-orange-500" size={16} />
                  Delivery Address
                </h4>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <FiMapPin className="text-orange-600" size={18} />
                  </div>
                  <p className="text-sm text-gray-700 flex-1">{selectedOrder.address}</p>
                </div>
              </div>

              {/* Additional Info */}
              <div className="mt-4 text-xs text-gray-400 flex justify-end">
                <span>Order placed on {selectedOrder.date}</span>
              </div>
            </div>

            {/* Modal Footer with better buttons */}
            <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3 border-t border-lime-200 rounded-b-2xl">
              <button
                onClick={closeModal}
                className="px-5 py-2.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer"
              >
                <FiX size={16} /> Close
              </button>
              <button className="px-5 py-2.5 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2">
                <FiCheckCircle size={16} />
                Update Status
              </button>
              <button className="px-5 py-2.5 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2">
                <FiMessageCircle size={16} />
                Contact
              </button>
            </div>
          </div>

          {/* Animation styles inside component using style tag */}
          <style>{`
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
    `}</style>
        </div>
      )}
    </div>
  );
};

export default Dashboard;