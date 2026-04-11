import React, { useState } from "react";
import {
  FiUsers,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiCalendar,
  FiTrendingUp,
  FiGlobe,
  FiMail,
  FiFacebook,
  FiUserPlus,
  FiShoppingBag,
  FiFilter,
  FiDownload,
  FiEye,
  FiMoreVertical,
  FiChevronLeft,
  FiChevronRight,
  FiAward,
  FiStar,
  FiRefreshCw,
  FiMapPin
} from "react-icons/fi";

import { useGetUsersQuery, useGetUserStatsQuery } from '../../../../../services/userApi';

const NewRegistrations = () => {
  const [timeRange, setTimeRange] = useState('7days');
  const [selectedSource, setSelectedSource] = useState('all');
  const [selectedVerification, setSelectedVerification] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch users with real-time filters
  const { data: usersResponse, isLoading, isError } = useGetUsersQuery({
    status: 'all', // For new registrations, we might want to filter by date instead
    page: currentPage,
    limit: itemsPerPage
  });

  // Fetch statistics
  const { data: statsResponse } = useGetUserStatsQuery();

  const usersData = usersResponse?.data || [];
  const totalUsersCount = usersResponse?.total || 0;
  const totalPages = usersResponse?.pages || 0;
  const stats = statsResponse?.data || { totalUsers: 0, activeUsers: 0, blockedUsers: 0, newThisMonth: 0 };

  // For "New Registrations", we filter the fetched users by date locally if the backend doesn't support date filtering yet
  // But ideally the backend should handle this. For now, we'll use the fetched data.
  const filteredRegistrations = usersData;

  // Calculate metrics from stats API
  const totalRegistrations = stats.newThisMonth;
  const verifiedCount = stats.activeUsers; // Placeholder logic
  const pendingCount = stats.totalUsers - stats.activeUsers - stats.blockedUsers;
  const withFirstBooking = usersData.filter(r => r.bookings && r.bookings.length > 0).length;
  const conversionRate = totalRegistrations > 0 ? ((withFirstBooking / totalRegistrations) * 100).toFixed(1) : 0;

  const googleCount = usersData.filter(r => r.signupSource === 'Google').length;
  const manualCount = usersData.filter(r => r.signupSource === 'Manual').length;
  const facebookCount = usersData.filter(r => r.signupSource === 'Facebook').length;
  const paginatedRegistrations = usersData;
  const startIndex = (currentPage - 1) * itemsPerPage;

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'Not Available';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Not Available';
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  // Export CSV
  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Signup Source', 'Signup Date', 'Verification Status', 'First Booking', 'Location'];
    const csvData = filteredRegistrations.map(user => [
      user.name,
      user.email,
      user.phone,
      user.signupSource,
      new Date(user.signupDate).toLocaleString(),
      user.verificationStatus,
      user.firstBooking ? 'Yes' : 'No',
      user.location
    ]);

    const csvContent = [headers, ...csvData]
      .map(row => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `new-registrations-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  // Loading skeleton component
  const TableSkeleton = () => (
    <div className="animate-pulse">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex items-center space-x-4 py-4 border-b border-gray-200">
          <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
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
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        
        .shimmer {
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 1000px 100%;
          animation: shimmer 2s infinite;
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
        
        /* Stats Card Hover Effect */
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
        }
        
        /* Responsive */
        @media (max-width: 640px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }
          
          .table-container {
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
          }
        }
      `}</style>
      {/* Header Section */}
      <div className="bg-white border-b border-blue-900/20 sticky top-0 z-10 ">
        <div className="px-6 py-2">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <FiUserPlus className="text-blue-900 w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-black text-gray-900 uppercase">New Registrations <span className="text-orange-600">Track</span></h1>
                <p className="text-sm text-gray-500 font-medium">Track and manage user signups in the divine community</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              {/* Time Range Selector */}
              <div className="flex items-center gap-2 bg-white rounded-lg p-1 border border-[#959190]/20">
                {[
                  { value: '7days', label: '7 Days', icon: FiClock },
                  { value: '30days', label: '30 Days', icon: FiCalendar }
                ].map((range) => (
                  <button
                    key={range.value}
                    onClick={() => setTimeRange(range.value)}
                    className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors flex items-center gap-1
                      ${timeRange === range.value
                        ? 'bg-[#959190]/20 text-gray-900'
                        : 'text-gray-600 hover:bg-gray-100'
                      }`}
                  >
                    <range.icon size={14} />
                    {range.label}
                  </button>
                ))}
              </div>

              {/* Filter Button */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`p-2 rounded-lg border transition-all duration-200
                  ${showFilters
                    ? 'bg-blue-50 border-blue-900/20 text-blue-900'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                title="Filters"
              >
                <FiFilter size={16} className={showFilters ? 'text-blue-900' : 'text-gray-500'} />
              </button>

              {/* Export Button */}
              <button
                onClick={exportToCSV}
                className="p-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-200"
                title="Export CSV"
              >
                <FiDownload size={16} className="text-gray-500" />
              </button>

              {/* Refresh Button */}
              <button
                onClick={() => window.location.reload()}
                className="p-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-200"
                title="Refresh"
              >
                <FiRefreshCw size={16} className="text-gray-500" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-6 space-y-6">
        {/* Stats Cards - Dashboard Premium Design */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Total Registrations Card */}
          <div className="stats-card bg-white border-l-8 border-l-[#959190]/20 border-b-8 border-b-[#959190]/20 rounded-s-xl rounded-br border border-blue-900/20 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-lg bg-blue-50">
                <FiUsers className="text-blue-600 w-5 h-5" />
              </div>
              <span className="text-xs font-medium flex items-center gap-1 text-green-600">
                <FiTrendingUp size={12} />
                +{totalRegistrations} new
              </span>
            </div>
            <h3 className="text-[23px] font-bold text-gray-900">{totalRegistrations}</h3>
            <p className="text-sm text-gray-500 mt-1">Total Registrations</p>
          </div>

          {/* Verified Users Card */}
          <div className="stats-card bg-white border-l-8 border-l-[#959190]/20 border-b-8 border-b-[#959190]/20 rounded-s-xl rounded-br border border-blue-900/20 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-lg bg-green-50">
                <FiCheckCircle className="text-green-600 w-5 h-5" />
              </div>
            </div>
            <h3 className="text-[23px] font-bold text-gray-900">{verifiedCount}</h3>
            <p className="text-sm text-gray-500 mt-1">Verified Users</p>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
              <div
                className="bg-green-600 h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${(verifiedCount / totalRegistrations) * 100 || 0}%` }}
              ></div>
            </div>
          </div>

          {/* First Booking Card */}
          <div className="stats-card bg-white border-l-8 border-l-[#959190]/20 border-b-8 border-b-[#959190]/20 rounded-s-xl rounded-br border border-blue-900/20 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-lg bg-blue-50">
                <FiShoppingBag className="text-blue-900 w-5 h-5" />
              </div>
              <span className="text-xs font-medium flex items-center gap-1 text-blue-900">
                <FiAward size={12} />
                {conversionRate}% conversion
              </span>
            </div>
            <h3 className="text-[23px] font-bold text-gray-900">{withFirstBooking}</h3>
            <p className="text-sm text-gray-500 mt-1">Made First Booking</p>
          </div>

          {/* Pending Verification Card */}
          <div className="stats-card bg-white border-l-8 border-l-[#959190]/20 border-b-8 border-b-[#959190]/20 rounded-s-xl rounded-br border border-blue-900/20 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-lg bg-yellow-50">
                <FiClock className="text-yellow-600 w-5 h-5" />
              </div>
            </div>
            <h3 className="text-[23px] font-bold text-gray-900">{pendingCount}</h3>
            <p className="text-sm text-gray-500 mt-1">Pending Verification</p>
            {pendingCount > 0 && (
              <span className="pending-pulse absolute top-2 right-2 w-2 h-2 bg-yellow-500 rounded-full"></span>
            )}
          </div>
        </div>

        {/* Source Breakdown Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-blue-900/20 p-5 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-blue-50">
                <FiGlobe className="text-blue-600" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Google Signups</p>
                <p className="text-2xl font-bold text-gray-900">{googleCount}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {totalRegistrations > 0 ? ((googleCount / totalRegistrations) * 100).toFixed(0) : 0}% of total
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-blue-900/20 p-5 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-amber-50">
                <FiMail className="text-amber-600" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Manual Signups</p>
                <p className="text-2xl font-bold text-gray-900">{manualCount}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {totalRegistrations > 0 ? ((manualCount / totalRegistrations) * 100).toFixed(0) : 0}% of total
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-blue-900/20 p-5 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-indigo-50">
                <FiFacebook className="text-indigo-600" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Facebook Signups</p>
                <p className="text-2xl font-bold text-gray-900">{facebookCount}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {totalRegistrations > 0 ? ((facebookCount / totalRegistrations) * 100).toFixed(0) : 0}% of total
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        {showFilters && (
          <div className="bg-white rounded-xl border border-blue-900/20 p-6 animate-slideDown">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                  <FiGlobe size={14} className="text-blue-900" />
                  Signup Source
                </label>
                <select
                  value={selectedSource}
                  onChange={(e) => setSelectedSource(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900/40 text-sm"
                >
                  <option value="all">All Sources</option>
                  <option value="google">Google</option>
                  <option value="manual">Manual</option>
                  <option value="facebook">Facebook</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                  <FiCheckCircle size={14} className="text-blue-900" />
                  Verification Status
                </label>
                <select
                  value={selectedVerification}
                  onChange={(e) => setSelectedVerification(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900/40 text-sm"
                >
                  <option value="all">All Status</option>
                  <option value="verified">Verified</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </div>

            {/* Active Filters */}
            {(selectedSource !== 'all' || selectedVerification !== 'all') && (
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => {
                    setSelectedSource('all');
                    setSelectedVerification('all');
                  }}
                  className="flex items-center gap-1 px-3 py-1.5 text-sm text-red-600 hover:text-red-700"
                >
                  <FiXCircle size={16} />
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        )}

        {/* Registrations Table */}
        <div className="bg-white rounded-xl border border-blue-900/20 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <FiUserPlus className="text-blue-900" />
              Recent Signups
            </h2>
            <div className="text-sm text-gray-500">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredRegistrations.length)} of {filteredRegistrations.length}
            </div>
          </div>

          <div className="overflow-x-auto">
            {isLoading ? (
              <TableSkeleton />
            ) : (
              <table className="w-full">
                <thead className="bg-[#959190]/10">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">User</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Signup Source</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Signup Date</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Verification</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">First Booking</th>
                    <th className="px-10 py-3 text-left text-sm font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {paginatedRegistrations.map((user) => (
                    <tr key={user.id} className="table-row-hover even:bg-orange-50/20">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center text-blue-900 font-bold text-sm overflow-hidden border border-blue-100 shadow-sm">
                            {user.profileImage ? (
                              <img src={user.profileImage} alt="" className="w-full h-full object-cover" />
                            ) : (
                              user.name.charAt(0)
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{user.name}</p>
                            <p className="text-xs text-gray-500 flex items-center gap-1">
                              <FiMapPin size={10} />
                              {user.location}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium
                          ${user.signupSource === 'Google' ? 'bg-blue-100 text-blue-700 border border-blue-200' : ''}
                          ${user.signupSource === 'Manual' ? 'bg-amber-100 text-amber-700 border border-amber-200' : ''}
                          ${user.signupSource === 'Facebook' ? 'bg-indigo-100 text-indigo-700 border border-indigo-200' : ''}
                        `}>
                          {user.signupSource === 'Google' && <FiGlobe size={10} />}
                          {user.signupSource === 'Manual' && <FiMail size={10} />}
                          {user.signupSource === 'Facebook' && <FiFacebook size={10} />}
                          {user.signupSource}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-col">
                          <span className="text-sm text-gray-600">{formatDate(user.createdAt || user.signupDate)}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border
                          ${user.verificationStatus === 'verified'
                            ? 'bg-green-100 text-green-700 border-green-200'
                            : 'bg-yellow-100 text-yellow-700 border-yellow-200'
                          }`}>
                          {user.verificationStatus === 'verified'
                            ? <FiCheckCircle size={10} />
                            : <FiClock size={10} />
                          }
                          {user.verificationStatus}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {user.firstBooking ? (
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 border border-green-200">
                            <FiCheckCircle size={10} />
                            Completed
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                            <FiXCircle size={10} />
                            Not Started
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button className="p-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors border border-blue-200 cursor-pointer" title="View Details">
                            <FiEye size={16} />
                          </button>
                          <button className="p-1.5 bg-green-50 hover:bg-green-100 text-green-600 rounded-lg transition-colors border border-green-200 cursor-pointer" title="Verify User">
                            <FiCheckCircle size={16} />
                          </button>
                          <button className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors border border-red-200 cursor-pointer" title="Reject/Delete">
                            <FiXCircle size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {/* Empty State */}
            {!isLoading && paginatedRegistrations.length === 0 && (
              <div className="text-center py-16">
                <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <FiUsers size={32} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No registrations found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your filters or time range</p>
                <button
                  onClick={() => {
                    setSelectedSource('all');
                    setSelectedVerification('all');
                    setTimeRange('7days');
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-md"
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
                  className={`p-2 rounded-lg border transition-all duration-200
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
                        className={`w-8 h-8 rounded-lg text-sm font-medium transition-all duration-200
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
                  className={`p-2 rounded-lg border transition-all duration-200
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

        {/* Growth Insights */}
        <div className="bg-gradient-to-r from-[#959190]/10 to-white rounded-xl border border-blue-900/20 p-6">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-4">
            <FiTrendingUp className="text-blue-900" />
            Growth Insights
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white/50 backdrop-blur-sm p-4 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Conversion Rate</p>
              <p className="text-3xl font-bold text-gray-900">{conversionRate}%</p>
              <p className="text-xs text-gray-400 mt-1">of new users make first booking</p>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
                <div className="bg-green-600 h-1.5 rounded-full"
                  style={{ width: `${conversionRate}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-white/50 backdrop-blur-sm p-4 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Top Source</p>
              <p className="text-3xl font-bold text-gray-900">
                {googleCount >= manualCount && googleCount >= facebookCount ? 'Google' :
                  manualCount >= googleCount && manualCount >= facebookCount ? 'Manual' : 'Facebook'}
              </p>
              <p className="text-xs text-gray-400 mt-1">highest signup source</p>
              <div className="mt-2 flex items-center gap-1">
                <FiStar className="text-yellow-500" size={14} />
                <span className="text-xs font-medium">
                  {Math.max(googleCount, manualCount, facebookCount)} signups
                </span>
              </div>
            </div>

            <div className="bg-white/50 backdrop-blur-sm p-4 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Verification Rate</p>
              <p className="text-3xl font-bold text-gray-900">
                {totalRegistrations > 0 ? ((verifiedCount / totalRegistrations) * 100).toFixed(0) : 0}%
              </p>
              <p className="text-xs text-gray-400 mt-1">users verified</p>
              <div className="mt-2 flex items-center gap-2 text-xs">
                <span className="text-green-600">{verifiedCount} verified</span>
                <span className="text-gray-300">•</span>
                <span className="text-yellow-600">{pendingCount} pending</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRegistrations;