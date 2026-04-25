import React, { useState, useEffect } from 'react';
import { 
  Search,
  Filter,
  Download,
  Printer,
  Eye,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  MoreVertical,
  ChevronDown,
  ArrowUpDown,
  Calendar,
  User,
  IndianRupee,
  ExternalLink,
  AlertCircle,
  CheckSquare,
  Square
} from 'lucide-react';

import VendorPageHeader from '../../../components/VendorPageHeader';

const Orders = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [orders, setOrders] = useState([]);

  // Sample Orders Data
  const ordersData = [
    {
      id: 'ORD-2023-00123',
      customer: { name: 'Raj Sharma', email: 'raj@example.com', phone: '+91 98765 43210' },
      date: '2023-12-15',
      amount: 4250,
      status: 'delivered',
      items: 3,
      payment: 'Paid',
      shipping: 'Standard',
      address: 'H-45, Sector 45, Noida, UP 201301'
    },
    {
      id: 'ORD-2023-00124',
      customer: { name: 'Priya Patel', email: 'priya@example.com', phone: '+91 98765 43211' },
      date: '2023-12-15',
      amount: 1899,
      status: 'pending',
      items: 2,
      payment: 'Pending',
      shipping: 'Express',
      address: 'Sector 62, Noida, UP 201309'
    },
    {
      id: 'ORD-2023-00125',
      customer: { name: 'Amit Kumar', email: 'amit@example.com', phone: '+91 98765 43212' },
      date: '2023-12-14',
      amount: 6299,
      status: 'shipped',
      items: 5,
      payment: 'Paid',
      shipping: 'Standard',
      address: 'Sector 128, Noida, UP 201304'
    },
    {
      id: 'ORD-2023-00126',
      customer: { name: 'Neha Gupta', email: 'neha@example.com', phone: '+91 98765 43213' },
      date: '2023-12-14',
      amount: 3199,
      status: 'packed',
      items: 4,
      payment: 'Paid',
      shipping: 'Standard',
      address: 'Sector 18, Noida, UP 201301'
    },
    {
      id: 'ORD-2023-00127',
      customer: { name: 'Vikram Singh', email: 'vikram@example.com', phone: '+91 98765 43214' },
      date: '2023-12-13',
      amount: 8499,
      status: 'delivered',
      items: 7,
      payment: 'Paid',
      shipping: 'Express',
      address: 'Sector 104, Noida, UP 201301'
    },
    {
      id: 'ORD-2023-00128',
      customer: { name: 'Ananya Reddy', email: 'ananya@example.com', phone: '+91 98765 43215' },
      date: '2023-12-13',
      amount: 2599,
      status: 'cancelled',
      items: 2,
      payment: 'Refunded',
      shipping: 'Standard',
      address: 'Sector 76, Noida, UP 201301'
    },
    {
      id: 'ORD-2023-00129',
      customer: { name: 'Rahul Verma', email: 'rahul@example.com', phone: '+91 98765 43216' },
      date: '2023-12-12',
      amount: 5499,
      status: 'shipped',
      items: 6,
      payment: 'Paid',
      shipping: 'Standard',
      address: 'Sector 135, Noida, UP 201305'
    },
    {
      id: 'ORD-2023-00130',
      customer: { name: 'Sneha Mehta', email: 'sneha@example.com', phone: '+91 98765 43217' },
      date: '2023-12-12',
      amount: 1299,
      status: 'pending',
      items: 1,
      payment: 'Pending',
      shipping: 'Standard',
      address: 'Sector 44, Noida, UP 201301'
    },
  ];

  // Initialize
  useEffect(() => {
    setOrders(ordersData);
  }, []);

  // Format currency - Indian format
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  // Get status styles
  const getStatusStyles = (status) => {
    const base = "px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1";
    switch(status) {
      case 'delivered': 
        return `${base} bg-green-50 text-green-700`;
      case 'shipped': 
        return `${base} bg-blue-50 text-blue-600`;
      case 'packed': 
        return `${base} bg-purple-50 text-purple-600`;
      case 'pending': 
        return `${base} bg-orange-50 text-orange-500`;
      case 'cancelled': 
        return `${base} bg-red-50 text-red-700`;
      default: 
        return `${base} bg-gray-50 text-gray-600`;
    }
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch(status) {
      case 'delivered': return <CheckCircle className="w-3 h-3" />;
      case 'shipped': return <Truck className="w-3 h-3" />;
      case 'packed': return <Package className="w-3 h-3" />;
      case 'pending': return <AlertCircle className="w-3 h-3" />;
      case 'cancelled': return <XCircle className="w-3 h-3" />;
      default: return <AlertCircle className="w-3 h-3" />;
    }
  };

  // Filter orders based on active tab and search
  const filteredOrders = orders.filter(order => {
    // Tab filter
    if (activeTab !== 'all' && order.status !== activeTab) {
      return false;
    }
    
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        order.id.toLowerCase().includes(query) ||
        order.customer.name.toLowerCase().includes(query) ||
        order.customer.email.toLowerCase().includes(query) ||
        order.customer.phone.includes(query)
      );
    }
    
    // Date filter
    if (dateFilter !== 'all') {
      const orderDate = new Date(order.date);
      const today = new Date();
      const diffDays = Math.floor((today - orderDate) / (1000 * 60 * 60 * 24));
      
      switch(dateFilter) {
        case 'today':
          return diffDays === 0;
        case 'week':
          return diffDays <= 7;
        case 'month':
          return diffDays <= 30;
        default:
          return true;
      }
    }
    
    return true;
  });

  // Handle actions
  const handleAction = (action, orderId = null) => {
    const actions = {
      viewDetails: (id) => {
        console.log('View order details:', id);
        // Navigate to order details page
        window.location.href = `/orders/${id}`;
      },
      printInvoice: (id) => {
        console.log('Print invoice for order:', id);
        // Generate and print invoice
        const order = orders.find(o => o.id === id);
        const invoiceWindow = window.open('', '_blank');
        invoiceWindow.document.write(`
          <html>
            <head><title>Invoice - ${id}</title></head>
            <body>
              <h1>Invoice ${id}</h1>
              <p>Customer: ${order.customer.name}</p>
              <p>Amount: ${formatCurrency(order.amount)}</p>
              <button onclick="window.print()">Print</button>
            </body>
          </html>
        `);
      },
      updateStatus: (id, newStatus) => {
        setOrders(prev => prev.map(order => 
          order.id === id ? { ...order, status: newStatus } : order
        ));
        console.log(`Updated order ${id} status to ${newStatus}`);
      },
      cancelOrder: (id) => {
        setOrders(prev => prev.map(order => 
          order.id === id ? { ...order, status: 'cancelled' } : order
        ));
        console.log(`Cancelled order ${id}`);
      },
      refundOrder: (id) => {
        const order = orders.find(o => o.id === id);
        if (order) {
          setOrders(prev => prev.map(o => 
            o.id === id ? { ...o, payment: 'Refunded', status: 'cancelled' } : o
          ));
          console.log(`Refunded order ${id}`);
        }
      },
      exportCSV: () => {
        const headers = ['Order ID', 'Customer', 'Date', 'Amount', 'Status', 'Items', 'Payment'];
        const csvContent = [
          headers.join(','),
          ...filteredOrders.map(order => [
            order.id,
            order.customer.name,
            order.date,
            order.amount,
            order.status,
            order.items,
            order.payment
          ].join(','))
        ].join('\n');
        
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `orders-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
      },
      bulkUpdateStatus: (status) => {
        setOrders(prev => prev.map(order => 
          selectedOrders.includes(order.id) ? { ...order, status } : order
        ));
        setSelectedOrders([]);
        setShowBulkActions(false);
        console.log(`Bulk updated ${selectedOrders.length} orders to ${status}`);
      },
      selectAll: () => {
        if (selectedOrders.length === filteredOrders.length) {
          setSelectedOrders([]);
        } else {
          setSelectedOrders(filteredOrders.map(order => order.id));
        }
      }
    };

    if (actions[action]) {
      if (orderId !== null) {
        actions[action](orderId);
      } else if (action === 'bulkUpdateStatus') {
        // Get status from parameter
        const status = arguments[1];
        actions[action](status);
      } else {
        actions[action]();
      }
    }
  };

  // Toggle order selection
  const toggleOrderSelection = (orderId) => {
    setSelectedOrders(prev => 
      prev.includes(orderId) 
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  };

  // Tab configuration
  const tabs = [
    { id: 'all', label: 'All Orders', count: orders.length },
    { id: 'pending', label: 'Pending', count: orders.filter(o => o.status === 'pending').length },
    { id: 'packed', label: 'Packed', count: orders.filter(o => o.status === 'packed').length },
    { id: 'shipped', label: 'Shipped', count: orders.filter(o => o.status === 'shipped').length },
    { id: 'delivered', label: 'Delivered', count: orders.filter(o => o.status === 'delivered').length },
    { id: 'cancelled', label: 'Cancelled', count: orders.filter(o => o.status === 'cancelled').length },
  ];

  return (
    <div className="min-h-screen bg-gray-50/30">
      <VendorPageHeader 
        title="ORDERS MANAGEMENT" 
        subtitle="Track and manage your order fulfillment" 
      />

      {/* Main Content */}
      <div className="p-6">
        {/* Stats Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
          <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg border border-gray-200 p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Orders</p>
                <p className="text-xl font-semibold mt-1 text-gray-800">
                  {orders.length}
                </p>
              </div>
              <div className="p-2 rounded bg-blue-50">
                <Package className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg border border-gray-200 p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-xl font-semibold mt-1 text-gray-800">
                  {orders.filter(o => o.status === 'pending').length}
                </p>
              </div>
              <div className="p-2 rounded bg-orange-50">
                <AlertCircle className="w-5 h-5 text-orange-500" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg border border-gray-200 p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Revenue</p>
                <p className="text-xl font-semibold mt-1 text-gray-800">
                  {formatCurrency(orders.reduce((sum, order) => sum + order.amount, 0))}
                </p>
              </div>
              <div className="p-2 rounded bg-green-50">
                <IndianRupee className="w-5 h-5 text-green-700" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg border border-gray-200 p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg. Order</p>
                <p className="text-xl font-semibold mt-1 text-gray-800">
                  {formatCurrency(orders.reduce((sum, order) => sum + order.amount, 0) / orders.length)}
                </p>
              </div>
              <div className="p-2 rounded bg-purple-50">
                <Truck className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Bulk Actions Bar */}
        {selectedOrders.length > 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-3 mb-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded bg-blue-50">
                  <CheckSquare className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {selectedOrders.length} orders selected
                  </p>
                  <p className="text-xs text-gray-600">
                    Click to select/deselect all
                  </p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={() => setShowBulkActions(!showBulkActions)}
                  className="px-3 py-1.5 text-sm rounded border flex items-center gap-2 bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200"
                >
                  Bulk Actions
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                {showBulkActions && (
                  <div className="absolute mt-12 rounded-lg border shadow-lg z-10 bg-white border-gray-200">
                    <div className="p-2 space-y-1">
                      <button 
                        onClick={() => handleAction('bulkUpdateStatus', 'packed')}
                        className="w-full px-3 py-1.5 text-left text-sm hover:bg-gray-100 rounded flex items-center gap-2"
                      >
                        <Package className="w-4 h-4" />
                        Mark as Packed
                      </button>
                      <button 
                        onClick={() => handleAction('bulkUpdateStatus', 'shipped')}
                        className="w-full px-3 py-1.5 text-left text-sm hover:bg-gray-100 rounded flex items-center gap-2"
                      >
                        <Truck className="w-4 h-4" />
                        Mark as Shipped
                      </button>
                      <button 
                        onClick={() => handleAction('bulkUpdateStatus', 'delivered')}
                        className="w-full px-3 py-1.5 text-left text-sm hover:bg-gray-100 rounded flex items-center gap-2"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Mark as Delivered
                      </button>
                      <hr className="border-gray-200" />
                      <button 
                        onClick={() => handleAction('bulkUpdateStatus', 'cancelled')}
                        className="w-full px-3 py-1.5 text-left text-sm hover:bg-gray-100 rounded flex items-center gap-2 text-red-600"
                      >
                        <XCircle className="w-4 h-4" />
                        Cancel Orders
                      </button>
                    </div>
                  </div>
                )}
                
                <button 
                  onClick={() => setSelectedOrders([])}
                  className="px-3 py-1.5 text-sm rounded border border-gray-300 hover:bg-gray-100"
                >
                  Clear Selection
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Filters and Search */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
          <div className="flex flex-col lg:flex-row gap-4 text-sm">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by Order ID, Customer, Phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-1.5 w-full rounded-lg border bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-2">
              {/* Date Filter */}
              <div className="relative">
                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="appearance-none pl-10 pr-8 py-1.5 rounded-lg border bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="all">All Dates</option>
                  <option value="today">Today</option>
                  <option value="week">Last 7 days</option>
                  <option value="month">Last 30 days</option>
                </select>
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>

              {/* Export Button */}
              <button 
                onClick={() => handleAction('exportCSV')}
                className="px-4 py-1.5 rounded-lg border flex items-center gap-2 bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                  activeTab === tab.id 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tab.label}
                <span className={`px-1.5 py-0.5 text-xs rounded-full ${
                  activeTab === tab.id 
                    ? 'bg-white/20' 
                    : 'bg-gray-200'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm border-gray-200 bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40">
                  <th className="p-4">
                    <button 
                      onClick={() => handleAction('selectAll')}
                      className="flex items-center gap-2"
                    >
                      {selectedOrders.length === filteredOrders.length && filteredOrders.length > 0 ? (
                        <CheckSquare className="w-4 h-4 text-blue-600" />
                      ) : (
                        <Square className="w-4 h-4 text-gray-400" />
                      )}
                      <span className="font-medium text-gray-700">Order ID</span>
                    </button>
                  </th>
                  <th className="p-4">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span className="font-medium text-gray-700">Customer</span>
                    </div>
                  </th>
                  <th className="p-4 px-8">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span className="font-medium text-gray-700">Date</span>
                    </div>
                  </th>
                  <th className="p-4">
                    <div className="flex items-center gap-1 ">
                      <IndianRupee className="w-4 h-4" />
                      <span className="font-medium text-gray-700">Amount</span>
                    </div>
                  </th>
                  <th className="p-4 px-7">
                    <span className="font-medium text-gray-700">Status</span>
                  </th>
                  <th className="p-4 px-8">
                    <span className="font-medium text-gray-700">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map(order => (
                  <tr 
                    key={order.id} 
                    className="border-t border-gray-200 hover:bg-gray-50 even:bg-gray-50"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => toggleOrderSelection(order.id)}
                          className="flex items-center gap-2"
                        >
                          {selectedOrders.includes(order.id) ? (
                            <CheckSquare className="w-4 h-4 text-blue-600" />
                          ) : (
                            <Square className="w-4 h-4 text-gray-400" />
                          )}
                        </button>
                        <div>
                          <span className="font-medium text-gray-800">
                            {order.id}
                          </span>
                          <p className="text-xs text-gray-600">
                            {order.items} items • {order.shipping}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <span className="font-medium text-gray-800">
                          {order.customer.name}
                        </span>
                        <p className="text-xs text-gray-600">
                          {order.customer.phone}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-gray-700">
                        {formatDate(order.date)}
                      </span>
                    </td>
                    <td className="px-4 py-3 pl-9">
                      <span className="font-bold text-gray-800 ">
                        {formatCurrency(order.amount)}
                      </span>
                      <p className="text-xs text-gray-600">
                        {order.payment}
                      </p>
                    </td>
                    <td className="p-4 ">
                      <span className={getStatusStyles(order.status)}>
                        {getStatusIcon(order.status)}
                        <span>{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span>
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {/* View Details */}
                        <button 
                          onClick={() => handleAction('viewDetails', order.id)}
                          className="p-1.5 rounded hover:bg-gray-100"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        
                        {/* Print Invoice */}
                        <button 
                          onClick={() => handleAction('printInvoice', order.id)}
                          className="p-1.5 rounded hover:bg-gray-100"
                          title="Print Invoice"
                        >
                          <Printer className="w-4 h-4" />
                        </button>
                        
                        {/* More Actions Dropdown */}
                        <div className="relative">
                          <button 
                            className="p-1.5 rounded hover:bg-gray-100"
                            onClick={() => {
                              // Toggle dropdown
                              const dropdown = document.getElementById(`dropdown-${order.id}`);
                              dropdown.classList.toggle('hidden');
                            }}
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>
                          
                          <div 
                            id={`dropdown-${order.id}`}
                            className="hidden absolute right-0 mt-1 rounded-lg border shadow-lg z-10 min-w-[200px] bg-white border-gray-200"
                          >
                            <div className="p-2 space-y-1">
                              {/* Update Status Options */}
                              {order.status !== 'packed' && (
                                <button 
                                  onClick={() => handleAction('updateStatus', order.id, 'packed')}
                                  className="w-full px-3 py-1.5 text-left text-sm hover:bg-gray-100 rounded flex items-center gap-2"
                                >
                                  <Package className="w-4 h-4" />
                                  Mark as Packed
                                </button>
                              )}
                              {order.status !== 'shipped' && order.status !== 'pending' && (
                                <button 
                                  onClick={() => handleAction('updateStatus', order.id, 'shipped')}
                                  className="w-full px-3 py-1.5 text-left text-sm hover:bg-gray-100 rounded flex items-center gap-2"
                                >
                                  <Truck className="w-4 h-4" />
                                  Mark as Shipped
                                </button>
                              )}
                              {order.status !== 'delivered' && order.status !== 'pending' && (
                                <button 
                                  onClick={() => handleAction('updateStatus', order.id, 'delivered')}
                                  className="w-full px-3 py-1.5 text-left text-sm hover:bg-gray-100 rounded flex items-center gap-2"
                                >
                                  <CheckCircle className="w-4 h-4" />
                                  Mark as Delivered
                                </button>
                              )}
                              
                              <hr className="border-gray-200" />
                              
                              {/* Cancel/Refund */}
                              {order.status !== 'cancelled' && (
                                <button 
                                  onClick={() => handleAction('cancelOrder', order.id)}
                                  className="w-full px-3 py-1.5 text-left text-sm hover:bg-gray-100 rounded flex items-center gap-2 text-red-600"
                                >
                                  <XCircle className="w-4 h-4" />
                                  Cancel Order
                                </button>
                              )}
                              {order.payment === 'Paid' && order.status === 'cancelled' && (
                                <button 
                                  onClick={() => handleAction('refundOrder', order.id)}
                                  className="w-full px-3 py-1.5 text-left text-sm hover:bg-gray-100 rounded flex items-center gap-2 text-red-600"
                                >
                                  <IndianRupee className="w-4 h-4" />
                                  Process Refund
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredOrders.length === 0 && (
            <div className="p-8 text-center">
              <div className="p-4 rounded-full inline-flex items-center justify-center mb-4 bg-gray-100">
                <Package className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium mb-2 text-gray-800">
                No orders found
              </h3>
              <p className="text-sm text-gray-600">
                {searchQuery ? 'Try a different search term' : 'No orders match the current filters'}
              </p>
            </div>
          )}

          {/* Pagination */}
          {filteredOrders.length > 0 && (
            <div className="p-4 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-gray-600">
                    Showing {filteredOrders.length} of {orders.length} orders
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1.5 rounded border border-gray-300 text-gray-600 hover:bg-gray-100">
                    Previous
                  </button>
                  <span className="px-3 py-1.5 rounded bg-gray-100 text-gray-800">
                    1
                  </span>
                  <button className="px-3 py-1.5 rounded border border-gray-300 text-gray-600 hover:bg-gray-100">
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;