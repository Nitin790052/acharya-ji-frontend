import React, { useRef, useState } from 'react';
import { 
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Download,
  Eye,
  Filter,
  Search,
  X,
  MapPin,
  Video,
  Printer,
  EyeOff,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal
} from 'lucide-react';
import { toast } from "react-toastify";
import { useReactToPrint } from 'react-to-print';
import html2pdf from 'html2pdf.js';
import { useGetUserOrdersQuery, useCancelOrderMutation } from '../../../../services/userApi';

const PendingOrders = () => {
  // ========== STATE MANAGEMENT ==========
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const printRef = useRef();
  
  // print logic
  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: "Order Detail PDF"
  })

  // ========== RTK QUERY ==========
  const { data: ordersResponse, isLoading } = useGetUserOrdersQuery('pending');
  const [cancelOrder] = useCancelOrderMutation();

  const handleCancelOrder = async (orderId) => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      try {
        const res = await cancelOrder(orderId).unwrap();
        if (res.success) {
          toast.success("Order cancelled successfully");
        }
      } catch (err) {
        toast.error(err.data?.message || "Failed to cancel order");
      }
    }
  };

  const pendingOrders = ordersResponse?.data || [];

  // ========== PENDING ORDERS DATA ==========
  // Mock data removed for dynamic RTK Query data

  // ========== FILTER OPTIONS ==========
  const paymentOptions = ['all', 'paid', 'pending', 'refunded'];
  const dateOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' }
  ];

  // ========== FILTER ORDERS ==========
  const filteredOrders = pendingOrders.filter(order => {
    // Payment filter
    if (paymentFilter !== 'all' && order.paymentStatus !== paymentFilter) return false;
    
    // Date filter
    if (dateFilter !== 'all') {
      const orderDate = new Date(order.date.split(' ').reverse().join('-'));
      const today = new Date();
      
      if (dateFilter === 'today') {
        if (orderDate.toDateString() !== today.toDateString()) return false;
      } else if (dateFilter === 'week') {
        const weekAgo = new Date(today.setDate(today.getDate() - 7));
        if (orderDate < weekAgo) return false;
      } else if (dateFilter === 'month') {
        const monthAgo = new Date(today.setMonth(today.getMonth() - 1));
        if (orderDate < monthAgo) return false;
      }
    }
    
    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      return (
        order.id.toLowerCase().includes(term) ||
        order.serviceName.toLowerCase().includes(term) ||
        order.customerName.toLowerCase().includes(term)
      );
    }
    
    return true;
  });

  // ========== PAGINATION LOGIC ==========
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

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
      case 'pending':
        return `${base} bg-amber-50 text-amber-600`;
      default:
        return `${base} bg-gray-100 text-gray-600`;
    }
  };

  const getPaymentStatusStyle = (status) => {
    const base = "px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1 w-fit";
    switch(status) {
      case 'paid':
        return `${base} bg-green-100 text-green-700`;
      case 'pending':
        return `${base} bg-amber-50 text-amber-600`;
      case 'refunded':
        return `${base} bg-purple-100 text-purple-700`;
      default:
        return `${base} bg-gray-100 text-gray-600`;
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'pending':
        return <Clock className="w-3 h-3" />;
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

  // ========== HANDLER FUNCTIONS ==========
  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setShowDetailsModal(true);
  };

  const handleDownloadInvoice = (orderId) => {
    toast.success(`📄 Invoice for ${orderId} downloaded`);
    if (!printRef.current) return;
    
    const element = printRef.current;
    const opt = {
      margin: 10,
      filename: `Invoice-${orderId}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };
    html2pdf().set(opt).from(element).save();
  };

  const handlePrintInvoice = () => {
    toast.success(`🖨️ Printing invoice`);
    handlePrint();
  };

  const handleClearFilters = () => {
    setPaymentFilter('all');
    setDateFilter('all');
    setSearchTerm('');
    setCurrentPage(1); // Only this line added
    toast.info('Filters cleared');
  };

  // ========== STATS CARDS ==========
  const statsCards = [
    { 
      label: 'Total Pending',
      value: pendingOrders.length,
      bgColor: 'bg-amber-50',
      icon: <Clock className="text-amber-600" size={20} />
    },
    { 
      label: 'Payment Pending',
      value: pendingOrders.filter(o => o.paymentStatus === 'pending').length,
      bgColor: 'bg-amber-50',
      icon: <AlertCircle className="text-amber-600" size={20} />
    },
    { 
      label: 'Paid',
      value: pendingOrders.filter(o => o.paymentStatus === 'paid').length,
      bgColor: 'bg-green-50',
      icon: <CheckCircle className="text-green-600" size={20} />
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ========== HEADER ========== */}
      <div className="bg-gradient-to-r from-amber-100/50 via-amber-200/30 to-amber-300/40 px-3 py-1.5 border border-amber-200 mb-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <div className="text-left sm:text-left flex items-end gap-2">
            <div>
              <h1 className="text-lg sm:text-xl md:text-2xl lg:text-[25px] font-semibold text-amber-900 uppercase leading-tight flex items-center gap-2">
                <Clock className="w-[23px] h-[23px] text-amber-600" />
                Pending Orders
              </h1>
              <p className="sm:hidden text-sm text-gray-600 mt-0.5">
                View pending orders
              </p>
            </div>
            <p className="hidden sm:block text-sm text-gray-600 mb-0.5">
              Track and manage your pending orders
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search pending orders..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Only this line added
              }}
              className="pl-8 pr-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-amber-300 bg-white w-full sm:w-64"
            />
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2" />
            {searchTerm && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setCurrentPage(1); // Only this line added
                }}
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

        {/* ========== STATS CARDS ========== */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {statsCards.map((stat, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg border border-gray-200 hover:border-amber-300 transition-colors p-3"
            >
              <div className="flex items-start justify-between">
                <div className={`${stat.bgColor} p-2 rounded-lg`}>
                  {stat.icon}
                </div>
              </div>
              <div className="mt-2">
                <p className="text-xl font-bold text-gray-800">{stat.value}</p>
                <p className="text-xs text-gray-600">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ========== FILTERS SECTION ========== */}
        <div className="bg-white rounded-lg border border-gray-200 hover:border-amber-300 transition-colors p-3">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1 text-sm font-medium text-gray-700">
              <Filter className="w-4 h-4 text-amber-600" />
              <span>Filters:</span>
            </div>

            {/* Payment Status Filter */}
            <select
              value={paymentFilter}
              onChange={(e) => {
                setPaymentFilter(e.target.value);
                setCurrentPage(1); // Only this line added
              }}
              className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-amber-300 bg-white"
            >
              <option value="all">All Payments</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="refunded">Refunded</option>
            </select>

            {/* Date Filter */}
            <select
              value={dateFilter}
              onChange={(e) => {
                setDateFilter(e.target.value);
                setCurrentPage(1); // Only this line added
              }}
              className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-amber-300 bg-white"
            >
              {dateOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>

            {/* Clear Filters */}
            {(paymentFilter !== 'all' || dateFilter !== 'all' || searchTerm) && (
              <button
                onClick={handleClearFilters}
                className="px-3 py-1.5 text-xs bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 flex items-center gap-1"
              >
                <X className="w-3 h-3" />
                Clear Filters
              </button>
            )}

            <span className="text-xs text-gray-500 ml-auto">
              Showing {filteredOrders.length > 0 ? indexOfFirstItem + 1 : 0} to {Math.min(indexOfLastItem, filteredOrders.length)} of {filteredOrders.length} orders
            </span>
          </div>
        </div>

        {/* ========== ORDERS TABLE ========== */}
        <div className="bg-white rounded-lg border border-gray-200 hover:border-amber-300 transition-colors overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service/Product</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                  {isLoading ? (
                    <tr>
                      <td colSpan="7" className="px-4 py-8 text-center text-gray-500">
                        <div className="w-10 h-10 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin mx-auto mb-3"></div>
                        <p className="text-sm font-medium text-gray-600">Loading pending orders...</p>
                      </td>
                    </tr>
                  ) : filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="px-4 py-8 text-center text-gray-500">
                        <Clock className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-sm font-medium text-gray-600">No pending orders found</p>
                        <p className="text-xs text-gray-500 mt-1">Try changing your filters</p>
                      </td>
                    </tr>
                  ) : (
                    currentOrders.map((order) => ( // Changed from filteredOrders to currentOrders
                    <tr 
                      key={order.id} 
                      className="hover:bg-amber-50/30 transition-colors "
                    //   onClick={() => handleViewDetails(order)}
                    >
                      <td className="px-4 py-3 text-sm font-medium text-amber-600">{order.id}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        <div>{order.date}</div>
                        <div className="text-xs text-gray-400">{order.time}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-sm font-medium text-gray-800">{order.serviceName}</div>
                        <div className="text-xs text-gray-500">{order.customerName}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className={getStatusStyle(order.status)}>
                          {getStatusIcon(order.status)}
                          <span className="capitalize">{order.status}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className={getPaymentStatusStyle(order.paymentStatus)}>
                          {order.paymentStatus === 'paid' && <CheckCircle className="w-3 h-3" />}
                          {order.paymentStatus === 'pending' && <Clock className="w-3 h-3" />}
                          {order.paymentStatus === 'refunded' && <XCircle className="w-3 h-3" />}
                          <span className="capitalize">{order.paymentStatus}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">
                        {formatCurrency(order.amount)}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2" >
                          <button
                            className="p-1 text-red-600 hover:bg-amber-50 rounded cursor-not-allowed"
                            title="View Details"
                          >
                            <EyeOff className="w-4 h-4" />
                          </button>
                          <button
                            className="p-1 text-red-600 hover:bg-amber-50 rounded cursor-not-allowed"
                            title="Download Invoice"
                          >
                            <Download className="w-4 h-4" />
                          </button>

                           {/* Cancel Order Button */}
                           <button
                             onClick={() => handleCancelOrder(order.dbId)}
                             className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                             title="Cancel Order"
                           >
                             <XCircle className="w-4 h-4" />
                           </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* ========== PAGINATION SECTION - ONLY THIS ADDED ========== */}
          {filteredOrders.length > 0 && totalPages > 1 && (
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
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ========== QUICK ACTIONS FOOTER ========== */}
        <div className="bg-gradient-to-r from-amber-100/50 via-amber-200/30 to-amber-300/40 rounded-lg border border-amber-200 p-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-600" />
              <div>
                <h4 className="text-xs font-semibold text-gray-800">Pending orders need attention</h4>
                <p className="text-xs text-gray-600">Complete payment or contact support</p>
              </div>
            </div>
            <button 
              className="px-3 py-1.5 text-xs bg-white text-gray-800 rounded-lg border border-gray-300 hover:bg-gray-50 flex items-center gap-1 cursor-pointer transition-colors"
              onClick={() => toast.info('Contacting support...')}
            >
              Get Support
            </button>
          </div>
        </div>
      </div>

      {/* ========== ORDER DETAILS MODAL ========== */}
      {showDetailsModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-800">Order Details</h3>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div ref={printRef} className="p-4 space-y-4 print:p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">Order ID</p>
                  <p className="text-lg font-bold text-gray-800">{selectedOrder.id}</p>
                </div>
                <div className="flex gap-2">
                  <div className={getStatusStyle(selectedOrder.status)}>
                    {getStatusIcon(selectedOrder.status)}
                    <span className="capitalize">{selectedOrder.status}</span>
                  </div>
                  <div className={getPaymentStatusStyle(selectedOrder.paymentStatus)}>
                    {selectedOrder.paymentStatus === 'paid' && <CheckCircle className="w-3 h-3" />}
                    {selectedOrder.paymentStatus === 'pending' && <Clock className="w-3 h-3" />}
                    {selectedOrder.paymentStatus === 'refunded' && <XCircle className="w-3 h-3" />}
                    <span className="capitalize">{selectedOrder.paymentStatus}</span>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 p-3 rounded-lg">
                <p className="text-xs text-amber-600 mb-1">Service</p>
                <p className="text-base font-semibold text-gray-800">{selectedOrder.serviceName}</p>
                <p className="text-sm text-gray-600 mt-1">Priest: {selectedOrder.priest}</p>
                <p className="text-sm text-gray-600">Customer: {selectedOrder.customerName}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-500">Date</p>
                  <p className="text-sm font-medium text-gray-800">{selectedOrder.date}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-500">Time</p>
                  <p className="text-sm font-medium text-gray-800">{selectedOrder.time}</p>
                </div>
              </div>

              {selectedOrder.location && (
                <div className="border border-gray-200 rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-1">Location</p>
                  <p className="text-sm text-gray-800 flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    {selectedOrder.location}
                  </p>
                </div>
              )}

              {selectedOrder.type === 'online' && (
                <div className="border border-gray-200 rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-1">Meeting Details</p>
                  <p className="text-sm text-amber-600 flex items-center gap-1">
                    <Video className="w-4 h-4" />
                    Online Session
                  </p>
                </div>
              )}

              <div className="border border-gray-200 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-2">Payment Details</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-bold pt-2 border-t border-gray-200">
                    <span className="text-gray-800">Total</span>
                    <span className="text-amber-700">{formatCurrency(selectedOrder.amount)}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Payment via {selectedOrder.paymentMethod}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 print:hidden">
                <button
                //   onClick={() => handleDownloadInvoice(selectedOrder.id)}
                  className="bg-amber-500 text-white py-2 rounded-lg hover:bg-red-600 flex items-center justify-center gap-2 cursor-not-allowed"
                >
                  <Download className="w-4 h-4" />
                  Download Invoice
                </button>
                <button
                //   onClick={handlePrintInvoice}
                  className="bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 flex items-center justify-center gap-2 cursor-not-allowed"
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

export default PendingOrders;