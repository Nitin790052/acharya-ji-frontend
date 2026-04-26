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
import { API_URL } from '../../../../../config/apiConfig';

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [statsCards, setStatsCards] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [pendingActions, setPendingActions] = useState([]);
  const [topAstrologers, setTopAstrologers] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const printref = useRef();

  const handleprint = useReactToPrint({
    contentRef: printref,
    documentTitle: "print pdf"
  });

  const fmt = (n) => {
    if (n >= 100000) return '₹' + (n / 100000).toFixed(2).replace(/\.?0+$/, '') + 'L';
    return n?.toLocaleString('en-IN') ?? '0';
  };

  const timeAgo = (d) => {
    const diff = (Date.now() - new Date(d)) / 60000;
    if (diff < 1) return 'Just now';
    if (diff < 60) return `${Math.floor(diff)} minutes ago`;
    if (diff < 1440) return `${Math.floor(diff / 60)} hours ago`;
    return `${Math.floor(diff / 1440)} days ago`;
  };

  const fetchDashboard = async () => {
    setLoading(true);
    try {
      const [usersRes, vendorsRes, bookingsRes, servicesRes] = await Promise.all([
        fetch(`${API_URL}/users/stats`).then(r => r.json()),
        fetch(`${API_URL}/vendors`).then(r => r.json()),
        fetch(`${API_URL}/bookings`).then(r => r.json()),
        fetch(`${API_URL}/services`).then(r => r.json()).catch(() => ({ data: [] }))
      ]);

      const uStats = usersRes?.data || {};
      const vendors = vendorsRes?.data || [];
      const bookings = Array.isArray(bookingsRes) ? bookingsRes : (bookingsRes?.data || []);
      const services = Array.isArray(servicesRes) ? servicesRes : (servicesRes?.data || []);

      // Today's bookings
      const todayStart = new Date(); todayStart.setHours(0,0,0,0);
      const todayBookings = bookings.filter(b => new Date(b.createdAt) >= todayStart);

      // Revenue & pending
      const now = new Date();
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
      const monthBookings = bookings.filter(b => new Date(b.createdAt) >= monthStart);
      const monthRevenue = monthBookings.reduce((s, b) => s + (Number(b.amount) || 0), 0);
      const pendingPayAmt = bookings.filter(b => b.paymentStatus === 'pending').reduce((s, b) => s + (Number(b.amount) || 0), 0);
      const activeServices = services.filter(s => s.isActive !== false).length;

      setStatsCards([
        { id:1, title:'Total Users', value: fmt(uStats.totalUsers || 0), change:`+${uStats.newThisMonth||0} this month`, icon:<FiUsers className="w-6 h-6"/>, bgLight:'bg-blue-50', textColor:'text-blue-600' },
        { id:2, title:'Total Vendors', value: String(vendors.length), change:`+${vendors.filter(v=>v.status==='pending').length} pending`, icon:<FiUserCheck className="w-6 h-6"/>, bgLight:'bg-amber-50', textColor:'text-amber-600' },
        { id:3, title:'Today Bookings', value: String(todayBookings.length), change:`${bookings.length} total`, icon:<FiCalendar className="w-6 h-6"/>, bgLight:'bg-green-50', textColor:'text-green-600' },
        { id:4, title:'Monthly Revenue', value: monthRevenue > 0 ? `₹${fmt(monthRevenue)}` : '₹0', change:`${monthBookings.length} orders`, icon:<FiDollarSign className="w-6 h-6"/>, bgLight:'bg-orange-50', textColor:'text-orange-600' },
        { id:5, title:'Pending Payments', value: pendingPayAmt > 0 ? `₹${fmt(pendingPayAmt)}` : '₹0', change:`${bookings.filter(b=>b.paymentStatus==='pending').length} pending`, icon:<FiCreditCard className="w-6 h-6"/>, bgLight:'bg-red-50', textColor:'text-red-600' },
        { id:6, title:'Active Services', value: String(activeServices), change:`+${services.length - activeServices} inactive`, icon:<FiActivity className="w-6 h-6"/>, bgLight:'bg-indigo-50', textColor:'text-indigo-600' }
      ]);

      // Recent Activities from bookings + users
      const acts = bookings.slice(0, 6).map((b, i) => ({
        id: i + 1,
        type: 'booking',
        action: b.status === 'Completed' ? 'Booking completed' : b.status === 'Confirmed' ? 'Booking confirmed' : 'New booking created',
        user: b.name || 'Customer',
        details: `${b.pujaType || 'Service'} - ${b.date || ''}`,
        time: timeAgo(b.createdAt),
        icon: b.status === 'Completed' ? <FiCheckCircle className="text-green-500"/> : b.status === 'Cancelled' ? <FiXCircle className="text-red-500"/> : <FiCalendar className="text-green-500"/>
      }));
      setRecentActivities(acts);

      // Pending Actions
      const pendingVendors = vendors.filter(v => v.status === 'pending').length;
      const pendingPay = bookings.filter(b => b.paymentStatus === 'pending' && b.status !== 'Cancelled').length;
      const unconfirmed = bookings.filter(b => b.status === 'Pending').length;
      const refunds = bookings.filter(b => b.paymentStatus === 'refunded').length;
      setPendingActions([
        { id:1, type:'vendor', title:'Vendor Approval Pending', count:pendingVendors, icon:<FiUserCheck/>, color:'text-amber-600', bgColor:'bg-amber-100' },
        { id:2, type:'payment', title:'Payment Settlements', count:pendingPay, icon:<FiCreditCard/>, color:'text-orange-600', bgColor:'bg-orange-100' },
        { id:3, type:'booking', title:'Unconfirmed Bookings', count:unconfirmed, icon:<FiClock/>, color:'text-yellow-600', bgColor:'bg-yellow-100' },
        { id:4, type:'refund', title:'Refund Requests', count:refunds, icon:<FiRefreshCw/>, color:'text-red-600', bgColor:'bg-red-100' },
        { id:5, type:'support', title:'Support Tickets', count:0, icon:<FiHelpCircle/>, color:'text-blue-600', bgColor:'bg-blue-100' }
      ]);

      // Top Vendors (approved, sorted by name)
      const approved = vendors.filter(v => v.status === 'approved').slice(0, 5);
      setTopAstrologers(approved.map((v, i) => ({
        id: i + 1, name: v.name, bookings: 0, rating: 4.5 + Math.random() * 0.5,
        icon: i % 2 === 0 ? <FiAward className="text-yellow-500"/> : <FiStar className="text-yellow-500"/>
      })));

      // Recent Orders from bookings
      const statusIcon = (s) => {
        if (s === 'Completed') return <FiCheckCircle className="text-green-500"/>;
        if (s === 'Pending') return <FiClock className="text-yellow-500"/>;
        if (s === 'Confirmed') return <FiRefreshCw className="text-blue-500"/>;
        return <FiXCircle className="text-red-500"/>;
      };
      setRecentOrders(bookings.slice(0, 5).map(b => ({
        id: `#${(b._id || '').slice(-5).toUpperCase()}`,
        customer: b.name || 'N/A',
        customerFull: b.name || 'N/A',
        customerEmail: b.email || 'N/A',
        customerPhone: b.mobile || 'N/A',
        puja: b.pujaType || 'Service',
        pujaDetails: b.message || b.pujaType || '',
        amount: `₹${b.amount || 0}`,
        status: (b.status || 'pending').toLowerCase(),
        date: b.date || new Date(b.createdAt).toLocaleDateString('en-IN'),
        time: new Date(b.createdAt).toLocaleTimeString('en-US', {hour:'2-digit',minute:'2-digit'}),
        address: b.city || 'N/A',
        paymentMethod: b.paymentMethod || 'Razorpay',
        astrologer: 'Assigned',
        items: [{ name: b.pujaType || 'Service', quantity: 1, price: `₹${b.amount||0}` }],
        totalItems: 1,
        icon: statusIcon(b.status)
      })));
    } catch (err) {
      console.error('Dashboard fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchDashboard(); }, [timeRange]);

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

      {/* ─── Premium Order Details Modal ─── */}
      {isModalOpen && selectedOrder && (
        <div
          className="fixed inset-0 flex items-center justify-center p-4"
          style={{
            zIndex: 99999,
            animation: 'modalFadeIn 0.25s ease-out forwards'
          }}
        >
          {/* Overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: 'rgba(15, 23, 42, 0.65)',
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)'
            }}
            onClick={closeModal}
          />

          {/* Modal Panel */}
          <div
            className="relative bg-white w-full max-w-2xl flex flex-col"
            style={{
              zIndex: 10,
              maxHeight: 'calc(100vh - 48px)',
              borderRadius: '16px',
              boxShadow: '0 25px 60px -12px rgba(0,0,0,0.35), 0 0 0 1px rgba(0,0,0,0.05)',
              animation: 'modalSlideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards'
            }}
          >

            {/* ─── Header ─── */}
            <div
              className="flex-shrink-0 flex items-center justify-between px-6 py-4"
              style={{
                background: 'linear-gradient(135deg, #166534 0%, #15803d 50%, #16a34a 100%)',
                borderRadius: '16px 16px 0 0'
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="flex items-center justify-center"
                  style={{
                    width: '40px', height: '40px',
                    background: 'rgba(255,255,255,0.18)',
                    borderRadius: '10px',
                    backdropFilter: 'blur(4px)'
                  }}
                >
                  <FiShoppingBag className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="text-white font-bold text-base tracking-wide">Order Details</h3>
                  <p className="text-green-200 text-xs font-medium mt-0.5">{selectedOrder.id}</p>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="text-white/80 hover:text-white hover:bg-white/15 p-2 rounded-lg transition-all duration-200 cursor-pointer"
              >
                <FiX size={20} />
              </button>
            </div>

            {/* ─── Scrollable Content ─── */}
            <div
              className="flex-1 overflow-y-auto px-6 py-5"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: '#d1d5db transparent'
              }}
            >

              {/* Status Badge */}
              <div className="flex justify-end mb-5">
                <span
                  className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase
                    ${selectedOrder.status === 'completed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : ''}
                    ${selectedOrder.status === 'pending' ? 'bg-amber-50 text-amber-700 border border-amber-200' : ''}
                    ${selectedOrder.status === 'processing' || selectedOrder.status === 'confirmed' ? 'bg-sky-50 text-sky-700 border border-sky-200' : ''}
                    ${selectedOrder.status === 'cancelled' ? 'bg-rose-50 text-rose-700 border border-rose-200' : ''}
                  `}
                  style={{ letterSpacing: '0.06em' }}
                >
                  {selectedOrder.icon}
                  {selectedOrder.status}
                </span>
              </div>

              {/* ─── Customer + Puja Grid ─── */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Customer Card */}
                <div
                  className="p-4 rounded-xl"
                  style={{
                    background: 'linear-gradient(145deg, #fafafa 0%, #ffffff 100%)',
                    border: '1px solid #e5e7eb'
                  }}
                >
                  <h4 className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
                    <FiUserCheck className="text-orange-500" size={14} />
                    Customer Info
                  </h4>
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="flex items-center justify-center rounded-full font-bold text-sm text-orange-600"
                      style={{
                        width: '36px', height: '36px',
                        background: 'linear-gradient(135deg, #fff7ed, #fed7aa)'
                      }}
                    >
                      {selectedOrder.customerFull.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{selectedOrder.customerFull}</p>
                      <p className="text-[11px] text-gray-400">Customer</p>
                    </div>
                  </div>
                  <div className="space-y-2 pl-1">
                    <p className="text-xs text-gray-500 flex items-center gap-2">
                      <FiMail size={12} className="text-gray-400" />
                      {selectedOrder.customerEmail}
                    </p>
                    <p className="text-xs text-gray-500 flex items-center gap-2">
                      <FiPhone size={12} className="text-gray-400" />
                      {selectedOrder.customerPhone}
                    </p>
                  </div>
                </div>

                {/* Puja Card */}
                <div
                  className="p-4 rounded-xl"
                  style={{
                    background: 'linear-gradient(145deg, #fafafa 0%, #ffffff 100%)',
                    border: '1px solid #e5e7eb'
                  }}
                >
                  <h4 className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
                    <FiCalendar className="text-orange-500" size={14} />
                    Puja Details
                  </h4>
                  <div className="space-y-2.5">
                    {[
                      { label: 'Type', value: selectedOrder.puja },
                      { label: 'Astrologer', value: selectedOrder.astrologer },
                      { label: 'Date', value: selectedOrder.date },
                      { label: 'Time', value: selectedOrder.time }
                    ].map((row, i) => (
                      <div key={i} className="flex justify-between items-center">
                        <span className="text-xs text-gray-400">{row.label}</span>
                        <span className="text-sm font-medium text-gray-800">{row.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Service ID / Description */}
              {selectedOrder.pujaDetails && (
                <div
                  className="mt-4 px-4 py-3 rounded-lg"
                  style={{
                    background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
                    border: '1px solid #fde68a'
                  }}
                >
                  <p className="text-xs text-amber-800 italic leading-relaxed">
                    "{selectedOrder.pujaDetails}"
                  </p>
                </div>
              )}

              {/* ─── Payment + Items ─── */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-4">

                {/* Payment */}
                <div
                  className="md:col-span-2 p-4 rounded-xl"
                  style={{
                    background: 'linear-gradient(145deg, #fafafa 0%, #ffffff 100%)',
                    border: '1px solid #e5e7eb'
                  }}
                >
                  <h4 className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
                    <FiCreditCard className="text-orange-500" size={14} />
                    Payment
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-[11px] text-gray-400 uppercase tracking-wide">Amount</p>
                      <p className="text-xl font-extrabold text-gray-900 mt-0.5">{selectedOrder.amount}</p>
                    </div>
                    <div>
                      <p className="text-[11px] text-gray-400 uppercase tracking-wide">Method</p>
                      <p className="text-sm font-medium text-gray-700 mt-0.5">{selectedOrder.paymentMethod}</p>
                    </div>
                  </div>
                </div>

                {/* Items */}
                <div
                  className="md:col-span-3 p-4 rounded-xl"
                  style={{
                    background: 'linear-gradient(145deg, #fafafa 0%, #ffffff 100%)',
                    border: '1px solid #e5e7eb'
                  }}
                >
                  <h4 className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
                    <FiPackage className="text-orange-500" size={14} />
                    Order Items ({selectedOrder.totalItems})
                  </h4>
                  <div className="space-y-1.5">
                    {selectedOrder.items?.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-800">{item.name}</span>
                          <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-md font-medium">
                            ×{item.quantity}
                          </span>
                        </div>
                        <span className="text-sm font-semibold text-gray-800">{item.price}</span>
                      </div>
                    ))}
                    <div
                      className="flex justify-between items-center pt-3 mt-2"
                      style={{ borderTop: '2px solid #d1fae5' }}
                    >
                      <span className="text-sm font-bold text-gray-600">Total</span>
                      <span className="text-lg font-extrabold text-green-600">{selectedOrder.amount}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ─── Address ─── */}
              <div
                className="mt-4 p-4 rounded-xl flex items-start gap-3"
                style={{
                  background: 'linear-gradient(145deg, #fafafa 0%, #ffffff 100%)',
                  border: '1px solid #e5e7eb'
                }}
              >
                <div
                  className="flex-shrink-0 flex items-center justify-center rounded-lg"
                  style={{
                    width: '34px', height: '34px',
                    background: 'linear-gradient(135deg, #fff7ed, #fed7aa)'
                  }}
                >
                  <FiMapPin className="text-orange-600" size={16} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Delivery Address</p>
                  <p className="text-sm text-gray-700 leading-relaxed">{selectedOrder.address}</p>
                </div>
              </div>

              {/* Timestamp */}
              <p className="text-[11px] text-gray-400 text-right mt-3 tracking-wide">
                Order placed on {selectedOrder.date}
              </p>
            </div>

            {/* ─── Footer ─── */}
            <div
              className="flex-shrink-0 flex items-center justify-end gap-2.5 px-6 py-3.5"
              style={{
                background: '#f9fafb',
                borderTop: '1px solid #e5e7eb',
                borderRadius: '0 0 16px 16px'
              }}
            >
              <button
                onClick={closeModal}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                  color: 'white',
                  boxShadow: '0 2px 8px rgba(239,68,68,0.3)'
                }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 14px rgba(239,68,68,0.4)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = '0 2px 8px rgba(239,68,68,0.3)'}
              >
                <FiX size={15} /> Close
              </button>
              <button
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #16a34a, #15803d)',
                  color: 'white',
                  boxShadow: '0 2px 8px rgba(22,163,74,0.3)'
                }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 14px rgba(22,163,74,0.4)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = '0 2px 8px rgba(22,163,74,0.3)'}
              >
                <FiCheckCircle size={15} /> Update Status
              </button>
              <button
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                  color: 'white',
                  boxShadow: '0 2px 8px rgba(37,99,235,0.3)'
                }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 14px rgba(37,99,235,0.4)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = '0 2px 8px rgba(37,99,235,0.3)'}
              >
                <FiMessageCircle size={15} /> Contact
              </button>
            </div>
          </div>

          {/* Keyframe Animations */}
          <style>{`
            @keyframes modalFadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes modalSlideUp {
              from { opacity: 0; transform: translateY(24px) scale(0.97); }
              to { opacity: 1; transform: translateY(0) scale(1); }
            }
          `}</style>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
