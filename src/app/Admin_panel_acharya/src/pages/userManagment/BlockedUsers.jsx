import React, { useState, useEffect } from "react";
import {
  FiUsers,
  FiUserX,
  FiLock,
  FiUnlock,
  FiAlertCircle,
  FiClock,
  FiCalendar,
  FiMail,
  FiPhone,
  FiMapPin,
  FiEye,
  FiMoreVertical,
  FiFilter,
  FiDownload,
  FiRefreshCw,
  FiChevronLeft,
  FiChevronRight,
  FiShield,
  FiCheckCircle,
  FiXCircle,
  FiSearch,
  FiUserCheck,
  FiDownloadCloud
} from "react-icons/fi";

import { useGetUsersQuery, useGetUserStatsQuery, useUpdateUserStatusMutation } from '../../../../../services/userApi';
import { BACKEND_URL } from "../../../../../config/apiConfig";
const BlockedUsers = () => {
  // ========== STATE MANAGEMENT ==========
  const [searchTerm, setSearchTerm] = useState('');
  const [blockType, setBlockType] = useState('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showUnblockModal, setShowUnblockModal] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const itemsPerPage = 10;

  // Fetch blocked users
  const { data: usersResponse, isLoading, refetch } = useGetUsersQuery({
    status: 'blocked',
    searchTerm: searchTerm,
    page: currentPage,
    limit: itemsPerPage
  });

  // Fetch statistics
  const { data: statsResponse } = useGetUserStatsQuery();

  // Mutation for unblocking
  const [updateStatus] = useUpdateUserStatusMutation();

  const usersData = usersResponse?.data || [];
  const filteredUsers = usersData;
  const totalUsersCount = usersResponse?.total || 0;
  const stats = statsResponse?.data || { totalUsers: 0, activeUsers: 0, blockedUsers: 0, newThisMonth: 0 };
  const totalBlocked = stats.blockedUsers;
  const temporaryBlocks = Math.floor(stats.blockedUsers * 0.4);
  const permanentBlocks = stats.blockedUsers - temporaryBlocks;
  const appealsPending = 0;

  const paginatedUsers = usersData;
  const totalPages = usersResponse?.pages || 0;
  const startIndex = (currentPage - 1) * itemsPerPage;

  // ========== HANDLER FUNCTIONS ==========
  const handleViewUser = (user) => {
    setSelectedUser(user);
    setShowViewModal(true);
  };

  const handleUnblockClick = (user) => {
    setSelectedUser(user);
    setShowUnblockModal(true);
  };

  const confirmUnblock = async () => {
    try {
      await updateStatus({ id: selectedUser._id, status: 'active' }).unwrap();
      setShowUnblockModal(false);
      setSelectedUser(null);

      setToastMessage(`${selectedUser.name} has been unblocked successfully`);
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 3000);
      refetch();
    } catch (error) {
      setToastMessage(error.data?.message || 'Failed to unblock user');
      setShowSuccessToast(true);
    }
  };

  const handleExportCSV = () => {
    // ...
  };

  const handleRefresh = () => {
    refetch();
    setToastMessage('Data refreshed successfully');
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 3000);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setBlockType('all');
    setDateRange({ start: '', end: '' });
    setShowFilters(false);
  };

  // ========== FORMATTING FUNCTIONS ==========
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'N/A';
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

  // ========== LOADING SKELETON ==========
  const TableSkeleton = () => (
    <div className="animate-pulse">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex items-center space-x-4 py-4 border-b border-gray-200">
          <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/3"></div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ========== GLOBAL STYLES ========== */}
      <style> {`
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
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
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
        
        /* Table Row Hover */
        .table-row-hover {
          transition: all 0.2s ease;
        }
        
        .table-row-hover:hover {
          background-color: #f9fafb;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }
      `}</style>

      {/* ========== SUCCESS TOAST ========== */}
      {showSuccessToast && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2"
          style={{ animation: 'slideInRight 0.3s ease-out' }}>
          <FiCheckCircle size={18} />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* ========== HEADER SECTION ========== */}
      <div className="bg-white border-b border-blue-900/20 sticky top-0 z-10 ">
        <div className="px-6 py-2">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <FiUserX className="text-red-600 w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-black text-gray-900 uppercase">Blocked & Suspended <span className="text-orange-600">Accounts</span></h1>
                <p className="text-sm text-gray-500 font-medium">Manage and review restricted user accounts in the divine community</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`p-2 rounded-lg border transition-all duration-200 cursor-pointer
                  ${showFilters
                    ? 'bg-blue-50 border-blue-900/20 text-blue-900'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                title="Filters"
              >
                <FiFilter size={16} className={showFilters ? 'text-blue-900' : 'text-gray-500'} />
              </button>

              <button
                onClick={handleExportCSV}
                className="p-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-200 cursor-pointer"
                title="Export Data"
              >
                <FiDownload size={16} className="text-gray-500" />
              </button>

              <button
                onClick={handleRefresh}
                className="p-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-200 cursor-pointer"
                title="Refresh"
              >
                <FiRefreshCw size={16} className={`text-gray-500 ${isLoading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ========== MAIN CONTENT ========== */}
      <div className="px-6 py-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Total Blocked Users */}
          <div className="stats-card bg-white border-l-8 border-l-red-400 border-b-8 border-b-red-400 rounded-s-xl rounded-br border border-red-200 p-4 relative">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-lg bg-red-50">
                <FiUserX className="text-red-600 w-5 h-5" />
              </div>
              <span className="text-xs font-medium flex items-center gap-1 text-red-600">
                <FiAlertCircle size={12} />
                Blocked
              </span>
            </div>
            <h3 className="text-[23px] font-bold text-gray-900">{totalBlocked}</h3>
            <p className="text-sm text-gray-500 mt-1">Total Blocked Users</p>
          </div>

          {/* Temporary Blocks */}
          <div className="stats-card bg-white border-l-8 border-l-yellow-400 border-b-8 border-b-yellow-400 rounded-s-xl rounded-br border border-yellow-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-lg bg-yellow-50">
                <FiClock className="text-yellow-600 w-5 h-5" />
              </div>
            </div>
            <h3 className="text-[23px] font-bold text-gray-900">{temporaryBlocks}</h3>
            <p className="text-sm text-gray-500 mt-1">Temporary Blocks</p>
            {totalBlocked > 0 && (
              <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
                <div
                  className="bg-yellow-500 h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${(temporaryBlocks / totalBlocked) * 100}%` }}
                ></div>
              </div>
            )}
          </div>

          {/* Permanent Blocks */}
          <div className="stats-card bg-white border-l-8 border-l-red-700 border-b-8 border-b-red-700 rounded-s-xl rounded-br border border-red-400 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-lg bg-red-100">
                <FiLock className="text-red-700 w-5 h-5" />
              </div>
            </div>
            <h3 className="text-[23px] font-bold text-gray-900">{permanentBlocks}</h3>
            <p className="text-sm text-gray-500 mt-1">Permanent Blocks</p>
          </div>

          {/* Appeals Pending */}
          <div className="stats-card bg-white border-l-8 border-l-blue-400 border-b-8 border-b-blue-400 rounded-s-xl rounded-br border border-blue-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-lg bg-blue-50">
                <FiShield className="text-blue-600 w-5 h-5" />
              </div>
            </div>
            <h3 className="text-[23px] font-bold text-gray-900">{appealsPending}</h3>
            <p className="text-sm text-gray-500 mt-1">Appeals Pending</p>
            {appealsPending > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
            )}
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl border border-blue-900/20 p-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search by name, email, phone, location, or block reason..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900/40 focus:border-transparent"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <FiXCircle size={16} />
                </button>
              )}
            </div>

            {/* Block Type Filter */}
            <div className="flex gap-2 bg-white rounded-lg p-1 border border-[#959190]/20">
              <button
                onClick={() => setBlockType('all')}
                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors flex items-center gap-1 cursor-pointer
                  ${blockType === 'all'
                    ? 'bg-[#959190]/20 text-gray-900'
                    : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <FiUserX size={14} />
                All
              </button>
              <button
                onClick={() => setBlockType('temporary')}
                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors flex items-center gap-1 cursor-pointer
                  ${blockType === 'temporary'
                    ? 'bg-[#959190]/20 text-gray-900'
                    : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <FiClock size={14} />
                Temporary
              </button>
              <button
                onClick={() => setBlockType('permanent')}
                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors flex items-center gap-1 cursor-pointer
                  ${blockType === 'permanent'
                    ? 'bg-[#959190]/20 text-gray-900'
                    : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <FiLock size={14} />
                Permanent
              </button>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200" style={{ animation: 'fadeIn 0.3s ease-out' }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Date Range Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                    <FiCalendar size={14} className="text-blue-900" />
                    Block Date Range
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="date"
                      value={dateRange.start}
                      onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/40"
                    />
                    <span className="text-gray-400 self-center">to</span>
                    <input
                      type="date"
                      value={dateRange.end}
                      onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/40"
                    />
                  </div>
                </div>
              </div>

              {/* Active Filters Summary */}
              {(searchTerm || blockType !== 'all' || dateRange.start || dateRange.end) && (
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {searchTerm && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-orange-50 text-orange-600 rounded-lg text-xs">
                        Search: {searchTerm}
                        <button onClick={() => setSearchTerm('')}>
                          <FiXCircle size={12} />
                        </button>
                      </span>
                    )}
                    {blockType !== 'all' && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-orange-50 text-orange-600 rounded-lg text-xs">
                        Type: {blockType}
                        <button onClick={() => setBlockType('all')}>
                          <FiXCircle size={12} />
                        </button>
                      </span>
                    )}
                    {dateRange.start && dateRange.end && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-orange-50 text-orange-600 rounded-lg text-xs">
                        {new Date(dateRange.start).toLocaleDateString()} - {new Date(dateRange.end).toLocaleDateString()}
                        <button onClick={() => setDateRange({ start: '', end: '' })}>
                          <FiXCircle size={12} />
                        </button>
                      </span>
                    )}
                  </div>
                  <button
                    onClick={clearFilters}
                    className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1"
                  >
                    <FiXCircle size={14} />
                    Clear All
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Blocked Users Table */}
        <div className="bg-white rounded-xl border border-blue-900/20 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <FiUserX className="text-red-500" />
              Blocked Users List
            </h2>
            <div className="text-sm text-gray-500">
              Showing {filteredUsers.length > 0 ? startIndex + 1 : 0} to {Math.min(startIndex + itemsPerPage, filteredUsers.length)} of {filteredUsers.length}
            </div>
          </div>

          <div className="overflow-x-auto">
            {isLoading ? (
              <TableSkeleton />
            ) : (
              <table className="w-full">
                <thead className="bg-[#959190]/10">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">User</th>
                    <th className="px-1 py-3 text-left text-sm font-medium text-gray-900">Block Reason</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Block Date</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Blocked By</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Type</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Activity</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Appeal</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {paginatedUsers.map((user, index) => (
                    <tr key={user._id || index} className="table-row-hover">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-red-600 font-semibold text-sm">
                            <img
                              src={`${BACKEND_URL}${user.avatar.startsWith('/') ? '' : '/'}${user.avatar}`}
                              alt={user.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`;
                              }}
                            />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{user.name}</p>
                            <p className="text-xs text-gray-500 flex items-center gap-1">
                              <FiMapPin size={10} />
                              {user.location}
                            </p>
                            <p className="text-xs text-gray-400">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="max-w-xs">
                          <p className="text-sm text-gray-900 font-medium">{user.blockReason}</p>
                          <p className="text-xs text-gray-500 mt-1">{user.notes}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-col">
                          <span className="text-sm text-gray-600">{formatDate(user.blockDate)}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-gray-600">{user.blockedBy}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border
                          ${user.blockType === 'temporary'
                            ? 'bg-yellow-100 text-yellow-700 border-yellow-200'
                            : 'bg-red-100 text-red-700 border-red-200'
                          }`}>
                          {user.blockType === 'temporary' ? <FiClock size={10} /> : <FiLock size={10} />}
                          <span className="capitalize">{user.blockType}</span>
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="space-y-1">
                          <span className="text-xs text-gray-600">Spent: {formatCurrency(user.totalSpend)}</span>
                          <div className="text-xs text-gray-500">
                            {user.totalBookings} bookings • {user.totalOrders} orders
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        {user.appealSubmitted ? (
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 border border-blue-200">
                            <FiShield size={10} />
                            Appeal Submitted
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                            <FiXCircle size={10} />
                            No Appeal
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleViewUser(user)}
                            className="p-1.5 bg-green-50 hover:bg-green-100 text-green-600 rounded-lg transition-colors border border-green-200 cursor-pointer"
                            title="View Details"
                          >
                            <FiEye size={16} />
                          </button>
                          {!user.unblockDate && (
                            <button
                              onClick={() => handleUnblockClick(user)}
                              className="p-1.5 bg-green-50 hover:bg-green-100 text-green-600 rounded-lg transition-colors border border-green-200 cursor-pointer"
                              title="Unblock User"
                            >
                              <FiUnlock size={16} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {/* Empty State */}
            {!isLoading && filteredUsers.length === 0 && (
              <div className="text-center py-16">
                <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <FiUserCheck size={32} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No blocked users found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria</p>
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 bg-gray-100 text-blue-900 border border-blue-900/20 rounded-lg hover:brightness-110 transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
              <div className="text-sm text-gray-500">
                Page {currentPage} of {totalPages}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-lg border transition-all duration-200 cursor-pointer
                    ${currentPage === 1
                      ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-orange-300'}`}
                >
                  <FiChevronLeft size={16} />
                </button>

                {[...Array(totalPages)].map((_, i) => {
                  const pageNum = i + 1;
                  if (
                    pageNum === 1 ||
                    pageNum === totalPages ||
                    (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-8 h-8 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer
                          ${currentPage === pageNum
                            ? 'bg-[#daf1e5] text-gray-900 border border-lime-300'
                            : 'text-gray-600 hover:bg-gray-100 border border-gray-300'
                          }`}
                      >
                        {pageNum}
                      </button>
                    );
                  } else if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
                    return <span key={i} className="text-gray-400">...</span>;
                  }
                  return null;
                })}

                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className={`p-2 rounded-lg border transition-all duration-200 cursor-pointer
                    ${currentPage === totalPages
                      ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-orange-300'}`}
                >
                  <FiChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Block Reasons Summary */}
        <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl border border-red-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-4">
            <FiAlertCircle className="text-red-500" />
            Block Reasons Summary
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/50 backdrop-blur-sm p-4 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Payment Issues</p>
              <p className="text-xl font-bold text-gray-900">
                {usersData.filter(u => u.blockReason?.toLowerCase().includes('payment')).length}
              </p>
              <p className="text-xs text-gray-400 mt-1">Failed payments, disputes</p>
            </div>

            <div className="bg-white/50 backdrop-blur-sm p-4 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Suspicious Activity</p>
              <p className="text-xl font-bold text-gray-900">
                {usersData.filter(u => u.blockReason?.toLowerCase().includes('suspicious') || u.blockReason?.toLowerCase().includes('multiple')).length}
              </p>
              <p className="text-xs text-gray-400 mt-1">Fraud, multiple accounts</p>
            </div>

            <div className="bg-white/50 backdrop-blur-sm p-4 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Terms Violation</p>
              <p className="text-xl font-bold text-gray-900">
                {usersData.filter(u => u.blockReason?.toLowerCase().includes('terms') || u.blockReason?.toLowerCase().includes('inappropriate')).length}
              </p>
              <p className="text-xs text-gray-400 mt-1">Content, behavior issues</p>
            </div>

            <div className="bg-white/50 backdrop-blur-sm p-4 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Other Reasons</p>
              <p className="text-xl font-bold text-gray-900">
                {usersData.filter(u => !u.blockReason?.toLowerCase().includes('payment') &&
                  !u.blockReason?.toLowerCase().includes('suspicious') &&
                  !u.blockReason?.toLowerCase().includes('multiple') &&
                  !u.blockReason?.toLowerCase().includes('terms') &&
                  !u.blockReason?.toLowerCase().includes('inappropriate')).length}
              </p>
              <p className="text-xs text-gray-400 mt-1">Miscellaneous blocks</p>
            </div>
          </div>
        </div>
      </div>

      {/* ========== VIEW USER MODAL ========== */}
      {showViewModal && selectedUser && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ animation: 'fadeIn 0.2s ease-out' }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowViewModal(false)} />

          <div
            className="relative z-10 bg-white rounded-2xl shadow-2xl w-full max-w-2xl"
            style={{ animation: 'slideUp 0.3s ease-out' }}
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-red-500 to-orange-500 px-6 py-5 text-white flex justify-between items-center rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <FiEye size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">User Details</h3>
                  <p className="text-sm text-orange-100">{selectedUser.name}</p>
                </div>
              </div>
              <button
                onClick={() => setShowViewModal(false)}
                className="hover:bg-white/20 p-2 rounded-lg transition-all duration-200 cursor-pointer"
              >
                <FiXCircle size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 max-h-[70vh] overflow-y-auto">
              {/* User Info Card */}
              <div className="bg-gradient-to-br from-gray-50 to-white p-5 rounded-xl border border-gray-200 mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-red-600 font-bold text-xl">
                    {selectedUser.avatar}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">{selectedUser.name}</h4>
                    <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                      <FiMapPin size={14} />
                      {selectedUser.location}
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Email</p>
                  <p className="text-sm font-medium text-gray-900 flex items-center gap-2">
                    <FiMail className="text-gray-400" size={14} />
                    {selectedUser.email}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Phone</p>
                  <p className="text-sm font-medium text-gray-900 flex items-center gap-2">
                    <FiPhone className="text-gray-400" size={14} />
                    {selectedUser.phone}
                  </p>
                </div>
              </div>

              {/* Block Details */}
              <div className="bg-red-50 p-4 rounded-lg mb-4">
                <h5 className="text-sm font-semibold text-gray-700 mb-3">Block Information</h5>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500">Block Date:</span>
                    <span className="text-xs font-medium text-gray-900">{formatDate(selectedUser.blockDate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500">Blocked By:</span>
                    <span className="text-xs font-medium text-gray-900">{selectedUser.blockedBy}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500">Block Type:</span>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border
                      ${selectedUser.blockType === 'temporary'
                        ? 'bg-yellow-100 text-yellow-700 border-yellow-200'
                        : 'bg-red-100 text-red-700 border-red-200'
                      }`}>
                      {selectedUser.blockType === 'temporary' ? <FiClock size={10} /> : <FiLock size={10} />}
                      <span className="capitalize">{selectedUser.blockType}</span>
                    </span>
                  </div>
                  <div className="pt-2">
                    <span className="text-xs text-gray-500">Reason:</span>
                    <p className="text-sm text-gray-900 mt-1">{selectedUser.blockReason}</p>
                    <p className="text-xs text-gray-600 mt-1">{selectedUser.notes}</p>
                  </div>
                </div>
              </div>

              {/* Activity Summary */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-blue-50 p-3 rounded-lg text-center">
                  <p className="text-lg font-bold text-blue-600">{selectedUser.totalBookings}</p>
                  <p className="text-xs text-gray-500">Bookings</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg text-center">
                  <p className="text-lg font-bold text-green-600">{selectedUser.totalOrders}</p>
                  <p className="text-xs text-gray-500">Orders</p>
                </div>
                <div className="bg-amber-100 p-3 rounded-lg text-center border border-amber-200">
                  <p className="text-lg font-bold text-amber-700">{formatCurrency(selectedUser.totalSpend)}</p>
                  <p className="text-xs text-gray-500">Spend</p>
                </div>
              </div>

              {selectedUser.appealSubmitted && (
                <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-xs text-blue-700 flex items-start gap-2">
                    <FiShield size={14} className="shrink-0 mt-0.5" />
                    <span>
                      Appeal submitted on {formatDate(selectedUser.appealDate)}. Pending review.
                    </span>
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3 border-t border-lime-200 rounded-b-2xl">
              <button
                onClick={() => setShowViewModal(false)}
                className="px-5 py-2.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer"
              >
                <FiXCircle size={16} /> Close
              </button>
              {!selectedUser.unblockDate && (
                <button
                  onClick={() => {
                    setShowViewModal(false);
                    handleUnblockClick(selectedUser);
                  }}
                  className="px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer"
                >
                  <FiUnlock size={16} />
                  Unblock User
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========== UNBLOCK CONFIRMATION MODAL ========== */}
      {showUnblockModal && selectedUser && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ animation: 'fadeIn 0.2s ease-out' }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowUnblockModal(false)} />

          <div
            className="relative z-10 bg-white rounded-2xl shadow-2xl w-full max-w-md"
            style={{ animation: 'slideUp 0.3s ease-out' }}
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-red-500 to-orange-500 px-6 py-5 text-white flex justify-between items-center rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <FiUnlock size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Confirm Unblock</h3>
                  <p className="text-sm text-orange-100">{selectedUser.name}</p>
                </div>
              </div>
              <button
                onClick={() => setShowUnblockModal(false)}
                className="hover:bg-white/20 p-2 rounded-lg transition-all duration-200 cursor-pointer"
              >
                <FiXCircle size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4 p-4 bg-red-50 rounded-lg">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <FiUserX size={24} className="text-red-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{selectedUser.name}</p>
                  <p className="text-xs text-gray-500">Blocked on: {formatDate(selectedUser.blockDate)}</p>
                  <p className="text-xs text-gray-500">Reason: {selectedUser.blockReason}</p>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-4">
                Are you sure you want to unblock this user? They will regain access to the platform and be able to:
              </p>

              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <FiCheckCircle className="text-green-500" size={14} />
                  Login to their account
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <FiCheckCircle className="text-green-500" size={14} />
                  Make new bookings and orders
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <FiCheckCircle className="text-green-500" size={14} />
                  Contact vendors and support
                </li>
              </ul>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-6">
                <p className="text-xs text-yellow-700 flex items-start gap-2">
                  <FiAlertCircle size={14} className="shrink-0 mt-0.5" />
                  <span>
                    This action will be logged. Please ensure you have reviewed the case before unblocking.
                  </span>
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3 border-t border-lime-200 rounded-b-2xl">
              <button
                onClick={() => setShowUnblockModal(false)}
                className="px-5 py-2.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer"
              >
                <FiXCircle size={16} /> Cancel
              </button>
              <button
                onClick={confirmUnblock}
                className="px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer"
              >
                <FiUnlock size={16} />
                Unblock User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlockedUsers;
