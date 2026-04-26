import React, { useRef, useState } from 'react';
import {
  ShoppingBag,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  ChevronRight,
  Download,
  Eye,
  Filter,
  Search,
  X,
  Loader,
  IndianRupee,
  Star,
  Users,
  MapPin,
  Phone,
  Video,
  CreditCard,
  Smartphone,
  Globe,
  Printer,
  EyeOff,
  ChevronLeft,
  MoreHorizontal,
  Trash2
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { useReactToPrint } from 'react-to-print';
import html2pdf from 'html2pdf.js';
import { useGetUserOrdersQuery, useCancelOrderMutation, useDeleteOrderMutation } from '../../../../services/userApi';

const UserOrders = () => {
  // ========== STATE MANAGEMENT ==========
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const printRef = useRef();
  const statementRef = useRef();

  // navigation logic 
  const navigate = useNavigate();

  // print logic
  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: "Order Detail PDF"
  })

  // ========== RTK QUERY ==========
  const { data: ordersResponse, isLoading, isError, refetch } = useGetUserOrdersQuery('all', { pollingInterval: 60000 });
  const [cancelOrder, { isLoading: isCancelling }] = useCancelOrderMutation();
  const [deleteOrder] = useDeleteOrderMutation();

  const handleDeleteOrder = async (orderId) => {
    if (window.confirm("Are you sure you want to permanently delete this order from your history?")) {
      try {
        await deleteOrder(orderId).unwrap();
        toast.success("Order deleted successfully");
      } catch (err) {
        toast.error(err.data?.message || "Failed to delete order");
      }
    }
  };

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

  const orders = ordersResponse?.data || [];

  // ========== ORDERS DATA ==========
  // Mock data removed for dynamic RTK Query data

  // ========== FILTER OPTIONS ==========
  const statusOptions = ['all', 'pending', 'processing', 'completed', 'cancelled'];
  const paymentOptions = ['all', 'paid', 'pending', 'refunded'];
  const dateOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'custom', label: 'Custom Range' }
  ];

  // ========== FILTER ORDERS ==========
  const filteredOrders = orders.filter(order => {
    // Status filter
    if (statusFilter !== 'all' && order.status !== statusFilter) return false;

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
    switch (status) {
      case 'completed':
        return `${base} bg-green-100 text-green-700`;
      case 'processing':
        return `${base} bg-blue-100 text-blue-700`;
      case 'pending':
        return `${base} bg-amber-50 text-amber-600`;
      case 'cancelled':
        return `${base} bg-red-50 text-red-600`;
      default:
        return `${base} bg-gray-100 text-gray-600`;
    }
  };

  const getPaymentStatusStyle = (status) => {
    const base = "px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1 w-fit";
    switch (status) {
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
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-3 h-3" />;
      case 'processing':
        return <Clock className="w-3 h-3" />;
      case 'pending':
        return <Clock className="w-3 h-3" />;
      case 'cancelled':
        return <XCircle className="w-3 h-3" />;
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

  const handleDownloadInvoice = (orderId, orderData) => {

    if (showDetailsModal === true) {
      navigate(`/user/dashboard/modal/invoice/${orderId}`, { state: orderData },);
      toast.success("Invoice has been generated Successfully!!");
    } else {
      navigate(`/user/dashboard/invoice/${orderId}`, { state: orderData },);
      toast.success("Invoice has been Successfully Downloaded ");
    };
  }

  const handlePrintInvoice = (orderId) => {
    toast.success(`🖨️ Printing invoice for ${orderId}`);
    handlePrint();
  };

  const handleReorder = (serviceName) => {
    toast.info(`Reorder ${serviceName} - Redirecting to booking...`);
  };

  const handleTrackOrder = (orderId) => {
    toast.info(`Tracking order ${orderId}`);
  };

  const handleClearFilters = () => {
    setStatusFilter('all');
    setPaymentFilter('all');
    setDateFilter('all');
    setSearchTerm('');
    setCurrentPage(1); // Reset to first page
    toast.info('Filters cleared');
  };

  const handleExportOrders = () => {
    if (filteredOrders.length === 0) {
      toast.error("No orders to include in statement");
      return;
    }

    const loadingToast = toast.loading("Preparing your premium order statement...");

    // Slight delay to ensure the hidden template is ready
    setTimeout(() => {
      const element = statementRef.current;
      const opt = {
        margin: 10,
        filename: `Orders-Statement-${new Date().getTime()}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      html2pdf()
        .set(opt)
        .from(element)
        .save()
        .then(() => {
          toast.dismiss(loadingToast);
          toast.success("Order statement exported successfully!");
        })
        .catch(err => {
          toast.dismiss(loadingToast);
          toast.error("Failed to generate PDF");
          console.error(err);
        });
    }, 500);
  };

  // ========== STATS CARDS ==========
  const statsCards = [
    {
      label: 'Total Orders',
      value: orders.length,
      bgColor: 'bg-amber-50',
      icon: <ShoppingBag className="text-amber-600" size={20} />
    },
    {
      label: 'Pending',
      value: orders.filter(o => o.status === 'pending').length,
      bgColor: 'bg-amber-50',
      icon: <Clock className="text-amber-600" size={20} />
    },
    {
      label: 'Processing',
      value: orders.filter(o => o.status === 'processing').length,
      bgColor: 'bg-blue-50',
      icon: <Clock className="text-blue-600" size={20} />
    },
    {
      label: 'Completed',
      value: orders.filter(o => o.status === 'completed').length,
      bgColor: 'bg-green-50',
      icon: <CheckCircle className="text-green-600" size={20} />
    },
    {
      label: 'Cancelled',
      value: orders.filter(o => o.status === 'cancelled').length,
      bgColor: 'bg-red-50',
      icon: <XCircle className="text-red-600" size={20} />
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
                <ShoppingBag className="w-[23px] h-[23px] text-amber-600" />
                Orders
              </h1>
              <p className="sm:hidden text-sm text-gray-600 mt-0.5">
                Manage your orders
              </p>
            </div>
            <p className="hidden sm:block text-sm text-gray-600 mb-0.5">
              Track, view and manage all your orders
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset to first page
              }}
              className="pl-8 pr-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-amber-300 bg-white w-full sm:w-64"
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
        </div>
      </div>

      {/* ========== MAIN CONTENT ========== */}
      <div className="space-y-4 px-6 pb-6 pt-2">

        {/* ========== STATS CARDS ========== */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {statsCards.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-lg border border-gray-200 hover:border-amber-300 transition-colors p-3 cursor-pointer"
              onClick={() => {
                if (stat.label === 'Pending') setStatusFilter('pending');
                else if (stat.label === 'Processing') setStatusFilter('processing');
                else if (stat.label === 'Completed') setStatusFilter('completed');
                else if (stat.label === 'Cancelled') setStatusFilter('cancelled');
                else setStatusFilter('all');
                setCurrentPage(1); // Reset to first page
              }}
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
            {/* Filter Icon */}
            <div className="flex items-center gap-1 text-sm font-medium text-gray-700">
              <Filter className="w-4 h-4 text-amber-600" />
              <span>Filters:</span>
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1); // Reset to first page
              }}
              className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-amber-300 bg-white"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>

            {/* Payment Status Filter */}
            <select
              value={paymentFilter}
              onChange={(e) => {
                setPaymentFilter(e.target.value);
                setCurrentPage(1); // Reset to first page
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
                setCurrentPage(1); // Reset to first page
              }}
              className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-amber-300 bg-white"
            >
              {dateOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>

            {/* Clear Filters */}
            {(statusFilter !== 'all' || paymentFilter !== 'all' || dateFilter !== 'all' || searchTerm) && (
              <button
                onClick={handleClearFilters}
                className="px-3 py-1.5 text-xs bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 flex items-center gap-1"
              >
                <X className="w-3 h-3" />
                Clear Filters
              </button>
            )}

            {/* Results Count */}
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
                  <th className="px-7 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-7 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {isLoading ? (
                  <tr>
                    <td colSpan="7" className="px-4 py-8 text-center text-gray-500">
                      <Loader className="w-10 h-10 text-amber-500 mx-auto animate-spin mb-3" />
                      <p className="text-sm font-medium text-gray-600">Loading orders...</p>
                    </td>
                  </tr>
                ) : filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-4 py-8 text-center text-gray-500">
                      <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-sm font-medium text-gray-600">No orders found</p>
                      <p className="text-xs text-gray-500 mt-1">Try changing your filters</p>
                    </td>
                  </tr>
                ) : (
                  currentOrders.map((order) => ( // Changed from filteredOrders to currentOrders
                    <tr
                      key={order.id}
                      className="hover:bg-amber-50/30 transition-colors "
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
                        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>

                          {/*logic of view Buttons */}
                          {order.status === "pending" || order.status === "processing" ? (<button
                            className="p-1 text-red-600 hover:bg-amber-50 rounded cursor-not-allowed"
                            title="View Details"
                          >
                            <EyeOff className="w-4 h-4" />
                          </button>) : (<button
                            onClick={() => handleViewDetails(order)}
                            className="p-1 text-amber-600 hover:bg-amber-50 rounded"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>)}
                          {/*Download button logic*/}
                          {order.status === "pending" || order.status === "processing" ? (<button
                            className="p-1 text-red-600 hover:bg-amber-50 rounded cursor-not-allowed"
                            title="Download Invoice"
                          >
                            <Download className="w-4 h-4" />
                          </button>) : (<button
                            onClick={() => {
                              setSelectedOrder(order);
                              setTimeout(() => {
                                handleDownloadInvoice(order.id, order);
                              }, 500);
                            }}
                            className="p-1 text-amber-600 hover:bg-amber-50 rounded"
                            title="Download Invoice"
                          >
                            <Download className="w-4 h-4" />
                          </button>)}

                          {/* Cancel Order Button */}
                          {order.status === 'pending' && (
                            <button
                              onClick={() => handleCancelOrder(order.dbId)}
                              className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                              title="Cancel Order"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          )}

                          {/* Delete Order Button */}
                          {order.status === 'cancelled' && (
                            <button
                              onClick={() => handleDeleteOrder(order.dbId)}
                              className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                              title="Delete Order"
                            >
                              <Trash2 className="w-4 h-4" />
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
                  className={`px-3 py-1 text-xs rounded-lg flex items-center gap-1 transition-colors ${currentPage === 1
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
                      className={`px-3 py-1 text-xs rounded-lg transition-colors ${currentPage === page
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
                  className={`px-3 py-1 text-xs rounded-lg flex items-center gap-1 transition-colors ${currentPage === totalPages
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

        {/* ========== QUICK ACTIONS FOOTER ========== */}
        <div className="bg-gradient-to-r from-amber-100/50 via-amber-200/30 to-amber-300/40 rounded-lg border border-amber-200 p-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-amber-600" />
              <div>
                <h4 className="text-xs font-semibold text-gray-800">Need help with an order?</h4>
                <p className="text-xs text-gray-600">Contact our support team for assistance</p>
              </div>
            </div>

            <button
              className="px-3 py-1.5 text-xs bg-white text-gray-800 rounded-lg border border-gray-300 hover:bg-gray-50 flex items-center gap-1 cursor-pointer transition-colors"
              onClick={handleExportOrders}
            >
              <Download className="w-3 h-3" />
              Export Orders
            </button>
          </div>
        </div>
      </div>

      {/* ========== ORDER DETAILS MODAL ========== */}
      {showDetailsModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-800">Order Details</h3>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div ref={printRef} className="p-4 space-y-4 print:p-8">
              {/* Order ID and Status */}
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

              {/* Service Info */}
              <div className="bg-amber-50 p-3 rounded-lg">
                <p className="text-xs text-amber-600 mb-1">Service</p>
                <p className="text-base font-semibold text-gray-800">{selectedOrder.serviceName}</p>
                <p className="text-sm text-gray-600 mt-1">Priest: {selectedOrder.priest}</p>
                <p className="text-sm text-gray-600">Customer: {selectedOrder.customerName}</p>
              </div>

              {/* Date & Time */}
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

              {/* Location */}
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

              {/* Payment Details */}
              <div className="border border-gray-200 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-2">Payment Details</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-800">{formatCurrency(selectedOrder.amount - 100)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax</span>
                    <span className="text-gray-800">₹100</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold pt-2 border-t border-gray-200">
                    <span className="text-gray-800">Total</span>
                    <span className="text-amber-700">{formatCurrency(selectedOrder.amount)}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Paid via {selectedOrder.paymentMethod}</p>
                </div>
              </div>

              {/* Items List */}
              {selectedOrder.items && (
                <div className="border border-gray-200 rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-2">Items</p>
                  <div className="space-y-2">
                    {selectedOrder.items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-gray-600">{item.name} x{item.quantity}</span>
                        <span className="text-gray-800">{formatCurrency(item.price)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Cancellation Reason */}
              {selectedOrder.status === 'cancelled' && selectedOrder.cancelReason && (
                <div className="bg-red-50 p-3 rounded-lg ">
                  <p className="text-xs text-red-600 mb-1">Cancellation Reason</p>
                  <p className="text-sm text-red-700">{selectedOrder.cancelReason}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-2 print:hidden">
                <button
                  onClick={() => handleDownloadInvoice(selectedOrder.id, selectedOrder)}  // This is correct
                  className="bg-amber-500 text-white py-2 rounded-lg hover:bg-amber-600 flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download Invoice
                </button>
                <button
                  onClick={() => handlePrintInvoice(selectedOrder.id)}
                  className="bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 flex items-center justify-center gap-2"
                >
                  <Printer className="w-4 h-4" />
                  Print
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {selectedOrder.status !== 'cancelled' && selectedOrder.status !== 'completed' && (
                  <button
                    onClick={() => handleTrackOrder(selectedOrder.id)}
                    className="bg-blue-50 text-blue-700 py-2 rounded-lg hover:bg-blue-100"
                  >
                    Track Order
                  </button>
                )}
                {selectedOrder.status === 'completed' && (
                  <button
                    onClick={() => handleReorder(selectedOrder.serviceName)}
                    className="bg-green-50 text-green-700 py-2 rounded-lg hover:bg-green-100"
                  >
                    Reorder
                  </button>
                )}
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========== HIDDEN PREMIUM ORDER STATEMENT TEMPLATE ========== */}
      <div className="hidden">
        <div ref={statementRef} className="p-4 bg-white text-gray-800" style={{ width: '190mm', margin: '0 auto' }}>

          {/* Header Table */}
          <table className="w-full mb-8 border-b-2 border-amber-500 pb-4">
            <tbody>
              <tr>
                <td className="align-middle" style={{ width: '65%' }}>
                  <table className="border-collapse">
                    <tbody>
                      <tr>
                        <td className="pr-4 align-middle">
                          <img src="/logo.png" alt="Logo" className="w-[70px] h-[60px] object-contain" />
                        </td>
                        <td className="align-middle border-l border-amber-200 pl-4">
                          <h1 className="text-3xl font-bold text-amber-900 tracking-wider text-left m-0 leading-none">ACHARYA JI</h1>
                          <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1 text-left m-0">Official Order Statement</p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
                <td className="text-right align-middle" style={{ width: '35%' }}>
                  <p className="font-bold text-gray-700 text-sm m-0">STATEMENT OF SERVICE</p>
                  <p className="text-[9px] text-gray-500 mt-1">Generated: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                  <div className="mt-2 inline-block px-2 py-0.5 bg-amber-50 border border-amber-100 rounded text-[9px] text-amber-700 font-bold uppercase">
                    Filter: {statusFilter.toUpperCase()}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          {/* Metrics Table */}
          <table className="w-full mb-8 border-collapse" style={{ tableLayout: 'fixed' }}>
            <tbody>
              <tr>
                <td className="p-1">
                  <div className="bg-amber-50 p-2 rounded border border-amber-100 text-left">
                    <p className="text-[8px] text-amber-600 uppercase font-bold mb-1">Total Orders</p>
                    <p className="text-lg font-bold text-amber-900">{filteredOrders.length}</p>
                  </div>
                </td>
                <td className="p-1">
                  <div className="bg-green-50 p-2 rounded border border-green-100 text-left">
                    <p className="text-[8px] text-green-600 uppercase font-bold mb-1">Completed</p>
                    <p className="text-lg font-bold text-green-800">{filteredOrders.filter(o => o.status === 'completed').length}</p>
                  </div>
                </td>
                <td className="p-1">
                  <div className="bg-gray-50 p-2 rounded border border-gray-200 text-left">
                    <p className="text-[8px] text-gray-500 uppercase font-bold mb-1">Avg. Amount</p>
                    <p className="text-lg font-bold text-gray-800">
                      {formatCurrency(filteredOrders.length > 0 ? filteredOrders.reduce((sum, o) => sum + o.amount, 0) / filteredOrders.length : 0)}
                    </p>
                  </div>
                </td>
                <td className="p-1">
                  <div className="bg-amber-900 p-2 rounded shadow-sm text-left">
                    <p className="text-[8px] text-amber-200 uppercase font-bold mb-1">Total Value</p>
                    <p className="text-lg font-bold text-white">
                      {formatCurrency(filteredOrders.reduce((sum, o) => sum + o.amount, 0))}
                    </p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          {/* Orders Main Table */}
          <table className="w-full text-[10px] border-collapse" style={{ tableLayout: 'fixed' }}>
            <thead>
              <tr className="bg-amber-100 border-y border-amber-200 text-amber-900">
                <th className="p-2 text-left" style={{ width: '15%' }}>DATE</th>
                <th className="p-2 text-left" style={{ width: '15%' }}>ORDER ID</th>
                <th className="p-2 text-left" style={{ width: '35%' }}>SERVICE / PUJA</th>
                <th className="p-2 text-left" style={{ width: '12%' }}>STATUS</th>
                <th className="p-2 text-left" style={{ width: '13%' }}>PAYMENT</th>
                <th className="p-2 text-right" style={{ width: '10%' }}>AMOUNT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {filteredOrders.map((o) => (
                <tr key={o.id}>
                  <td className="p-2 text-gray-600 text-left">{o.date}</td>
                  <td className="p-2 font-mono font-bold text-amber-700 text-left">{o.id}</td>
                  <td className="p-2 text-left">
                    <p className="font-bold m-0">{o.serviceName}</p>
                    <p className="text-[8px] text-gray-400 italic m-0 overflow-hidden text-ellipsis whitespace-nowrap">ID: {o.dbId}</p>
                  </td>
                  <td className="p-2 text-left"><span className="uppercase font-bold text-[8px]">{o.status}</span></td>
                  <td className="p-2 text-left"><span className="uppercase text-[8px]">{o.paymentStatus}</span></td>
                  <td className="p-2 text-right font-bold text-gray-800">{formatCurrency(o.amount).replace('₹', '')}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-50 font-bold text-[11px]">
                <td colSpan="5" className="p-3 text-right text-gray-600 uppercase">Grand Total</td>
                <td className="p-3 text-right text-amber-900 border-b-2 border-amber-500">
                  {formatCurrency(filteredOrders.reduce((sum, o) => sum + o.amount, 0))}
                </td>
              </tr>
            </tfoot>
          </table>

          {/* Footer Info */}
          <div className="mt-6 p-3 bg-amber-50/50 rounded border border-dashed border-amber-200 text-left">
            <p className="text-[8px] text-amber-800 uppercase font-bold mb-1">Amount in Words:</p>
            <p className="text-[10px] italic text-amber-900 border-l-2 border-amber-400 pl-2">
              {convertNumberToWords(filteredOrders.reduce((sum, o) => sum + o.amount, 0))} Rupees Only
            </p>
          </div>

          {/* Verification Footer */}
          <table className="w-full mt-10 border-t border-gray-100 pt-4 opacity-70">
            <tbody>
              <tr>
                <td className="text-left">
                  <p className="text-[8px] font-bold text-amber-900 uppercase">Verified Official Report</p>
                  <p className="text-[7px] text-gray-400 mt-0.5 uppercase tracking-widest">Acharya Ji Spiritual Platform • Noida</p>
                </td>
                <td className="text-right">
                  <p className="text-[7px] text-gray-400">© 2026 Acharya Ji. Digital system report.</p>
                  <p className="text-[7px] text-gray-400">Portrait Layout Optimized</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Helper function to convert number to words
function convertNumberToWords(num) {
  if (num === 0) return 'Zero';
  const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  const numToWords = (n) => {
    if (n < 20) return ones[n];
    if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? ' ' + ones[n % 10] : '');
    if (n < 1000) return ones[Math.floor(n / 100)] + ' Hundred' + (n % 100 ? ' ' + numToWords(n % 100) : '');
    if (n < 100000) return numToWords(Math.floor(n / 1000)) + ' Thousand' + (n % 1000 ? ' ' + numToWords(n % 1000) : '');
    return '';
  };
  return numToWords(Math.floor(num));
}

export default UserOrders;
