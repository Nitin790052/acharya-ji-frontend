import React from 'react';
import { 
  TrendingUp, 
  Users, 
  Calendar, 
  Wallet, 
  ArrowUpRight, 
  ArrowDownRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  MoreHorizontal,
  Plus,
  MessageSquare,
  Loader2
} from 'lucide-react';
import { useAuth } from '../../../auth/AuthContext';
import { VENDOR_CONFIG } from '../../../config/vendorConfig.jsx';
import VendorPageHeader from '../../../components/VendorPageHeader';
import { useGetDashboardStatsQuery } from '../../../../../services/vendorApi';

const PremiumCommonDashboard = () => {
  const { user } = useAuth();
  const category = user?.category || user?.vendorType || 'Pandit';
  const config = VENDOR_CONFIG.categories[category];
  const theme = config?.theme || VENDOR_CONFIG.categories['Pandit'].theme;

  const { data, isLoading, isError, refetch } = useGetDashboardStatsQuery(user?._id, {
    skip: !user?._id
  });

  const dashboardData = data?.data || {
    stats: [
      { label: 'Total Revenue', value: '₹0', change: '0%', isUp: true },
      { label: 'Active Bookings', value: '0', change: '0%', isUp: true },
      { label: 'Total Customers', value: '0', change: '0%', isUp: true },
      { label: 'Avg. Rating', value: '5.0', change: '0%', isUp: true },
    ],
    recentActivity: [],
    profileCompletion: 85
  };

  const getIcon = (label) => {
    switch (label) {
      case 'Total Revenue': return <Wallet size={20} />;
      case 'Active Bookings': return <Calendar size={20} />;
      case 'Total Customers': return <Users size={20} />;
      case 'Avg. Rating': return <TrendingUp size={20} />;
      default: return <TrendingUp size={20} />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50/30">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-10 h-10 animate-spin text-orange-500" />
          <p className="text-gray-500 font-medium animate-pulse">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/30 pb-10">
      <VendorPageHeader 
        title="DASHBOARD" 
        subtitle={`Welcome back, ${user?.name || 'Acharya'}! Manage your ${category} activities here.`} 
      />

      <div className="px-4 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
      {/* 2. Stats Grid (Bento Style) - More Compact */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {dashboardData.stats.map((stat, i) => (
          <div key={i} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2 ${theme.light} rounded-xl group-hover:scale-110 transition-transform`} style={{ color: theme.primary }}>
                {getIcon(stat.label)}
              </div>
              <div className={`flex items-center gap-1 text-[10px] font-bold ${stat.isUp ? 'text-green-500' : 'text-red-500'} bg-gray-50 px-2 py-0.5 rounded-lg`}>
                {stat.isUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {stat.change}
              </div>
            </div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{stat.label}</p>
            <h3 className="text-xl font-black text-gray-800 mt-0.5">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* 3. Main Bento Content Area - More Compact */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Activity (Spans 2 columns) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b border-gray-50 flex items-center justify-between">
            <h3 className="text-base font-bold text-gray-800 flex items-center gap-2">
              <Clock size={18} className="text-gray-400" />
              Recent Activity
            </h3>
            <button className="text-xs font-bold hover:underline" style={{ color: theme.primary }}>View All</button>
          </div>
          <div className="p-0 flex-1">
            <div className="divide-y divide-gray-50">
              {dashboardData.recentActivity.length > 0 ? (
                dashboardData.recentActivity.map((item, index) => (
                  <div key={item.id || index} className="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between group">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-white group-hover:shadow-sm transition-all text-xs font-bold uppercase">
                        {item.customer?.[0] || 'A'}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-800">{item.title}</p>
                        <p className="text-[10px] text-gray-400 font-medium">
                          {item.customer} • {item.time ? new Date(item.time).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : 'Recently'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                        item.status === 'Completed' || item.status === 'SUCCESS' ? 'bg-green-50 text-green-600' :
                        item.status === 'Pending' ? 'bg-amber-50 text-amber-600' :
                        'bg-blue-50 text-blue-600'
                      }`}>
                        {item.status?.toUpperCase() || 'SUCCESS'}
                      </span>
                      <button className="p-1.5 text-gray-300 hover:text-gray-600 transition-colors">
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-10 text-center flex flex-col items-center justify-center">
                   <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                      <Clock size={32} className="text-gray-200" />
                   </div>
                   <p className="text-sm font-bold text-gray-400">No recent activity found</p>
                   <p className="text-xs text-gray-300 mt-1">Activities will appear here once you start receiving bookings.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Status / Quick Tools (1 Column) */}
        <div className="space-y-6">
          
          {/* Profile Completion - More Compact */}
          <div className={`p-6 rounded-2xl bg-gradient-to-br ${theme.gradient} text-white shadow-xl relative overflow-hidden group`}>
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform">
              <CheckCircle2 size={100} />
            </div>
            <div className="relative z-10">
              <h3 className="text-lg font-bold mb-1.5">Profile Status</h3>
              <p className="text-white/80 text-[11px] font-medium mb-4 leading-relaxed">
                Your profile is {dashboardData.profileCompletion}% complete. 
                {dashboardData.profileCompletion < 100 ? " Add KYC docs to verify." : " Your profile is all set!"}
              </p>
              <div className="w-full bg-white/20 h-1.5 rounded-full mb-4">
                <div className="bg-white h-full rounded-full transition-all duration-1000" style={{ width: `${dashboardData.profileCompletion}%` }} />
              </div>
              <button className="w-full py-2 bg-white text-gray-900 rounded-xl font-black text-xs shadow-lg hover:bg-gray-50 transition-all active:scale-95">
                {dashboardData.profileCompletion < 100 ? "Complete Now" : "View Profile"}
              </button>
            </div>
          </div>

          {/* Quick Support - More Compact */}
          <div className="p-5 bg-gray-900 rounded-2xl text-white shadow-xl">
            <h3 className="text-sm font-bold mb-3 flex items-center gap-2">
              <AlertCircle size={16} className="text-orange-400" />
              Need Assistance?
            </h3>
            <p className="text-gray-400 text-[11px] mb-4 leading-relaxed">Partner support is available 24/7 to help you.</p>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                <MessageSquare size={14} className="text-white" />
              </div>
              <div>
                <p className="text-[10px] font-bold">Chat with Support</p>
                <p className="text-[9px] text-gray-500 uppercase font-black">Typical response: 5 mins</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  </div>
  );
};

export default PremiumCommonDashboard;
