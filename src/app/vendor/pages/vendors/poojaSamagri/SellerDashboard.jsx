import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown,
  Package,
  CreditCard,
  AlertCircle,
  CheckCircle,
  Clock,
  ShoppingBag,
  DollarSign,
  Star,
  Users,
  Calendar,
  Download,
  MoreVertical,
  ArrowUpRight,
  ArrowDownRight,
  ShoppingCart,
  Filter
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

import VendorPageHeader from '../../../components/VendorPageHeader';

const SellerDashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [timeRange, setTimeRange] = useState('7d');
  const [data, setData] = useState(null);

  // Sample Data - For Acharya Ji Online Puja Supplies
  const dashboardData = {
    stats: {
      todayOrders: { value: 42, change: '+12%', trend: 'up' },
      revenue: { value: 152750, change: '+8.5%', trend: 'up' },
      pendingOrders: { value: 18, change: '-3%', trend: 'down' },
      lowStockItems: { value: 7, change: '+2', trend: 'up' }
    },
    salesData: {
      '7d': [
        { day: 'Mon', sales: 21500, orders: 32 },
        { day: 'Tue', sales: 23800, orders: 38 },
        { day: 'Wed', sales: 20500, orders: 30 },
        { day: 'Thu', sales: 27800, orders: 42 },
        { day: 'Fri', sales: 31200, orders: 48 },
        { day: 'Sat', sales: 29500, orders: 45 },
        { day: 'Sun', sales: 18400, orders: 28 }
      ],
      '30d': [
        { day: 'Week 1', sales: 98500, orders: 152 },
        { day: 'Week 2', sales: 112300, orders: 178 },
        { day: 'Week 3', sales: 124500, orders: 192 },
        { day: 'Week 4', sales: 142800, orders: 218 }
      ]
    },
    topProducts: [
      { name: 'Premium Diya Set', sales: 420, revenue: 126000, growth: '15%', category: 'Puja Items' },
      { name: 'Pure Cow Ghee', sales: 380, revenue: 114000, growth: '22%', category: 'Puja Items' },
      { name: 'Natural Incense Sticks', sales: 245, revenue: 36750, growth: '8%', category: 'Puja Items' },
      { name: 'Sandalwood Paste', sales: 520, revenue: 26000, growth: '32%', category: 'Puja Items' },
      { name: 'Kumkum Powder', sales: 310, revenue: 46500, growth: '18%', category: 'Puja Items' }
    ],
    recentOrders: [
      { id: 'ORD-1001', customer: 'Raj Sharma', amount: 4250, status: 'delivered', date: 'Today, 10:30 AM', pujaType: 'Satyanarayan Katha Kit' },
      { id: 'ORD-1002', customer: 'Priya Patel', amount: 1899, status: 'processing', date: 'Today, 09:15 AM', pujaType: 'Ganesh Puja Kit' },
      { id: 'ORD-1003', customer: 'Amit Kumar', amount: 6299, status: 'shipped', date: 'Yesterday, 04:45 PM', pujaType: 'Navratri Special Kit' },
      { id: 'ORD-1004', customer: 'Neha Gupta', amount: 3199, status: 'pending', date: 'Yesterday, 02:20 PM', pujaType: 'Daily Puja Kit' },
      { id: 'ORD-1005', customer: 'Vikram Singh', amount: 8499, status: 'delivered', date: 'Nov 28, 11:10 AM', pujaType: 'Wedding Puja Kit' }
    ],
    lowStockAlerts: [
      { product: 'Premium Diya Set', stock: 8, minStock: 20, alert: 'high', category: 'Puja Items' },
      { product: 'Red Sandalwood Powder', stock: 3, minStock: 15, alert: 'critical', category: 'Puja Items' },
      { product: 'Camphor Tablets', stock: 12, minStock: 25, alert: 'medium', category: 'Puja Items' },
      { product: 'Rudraksha Mala', stock: 5, minStock: 20, alert: 'critical', category: 'Spiritual' },
      { product: 'Brass Bell', stock: 15, minStock: 30, alert: 'low', category: 'Puja Tools' }
    ],
    recentReviews: [
      { product: 'Premium Diya Set', customer: 'Rahul Verma', rating: 5, comment: 'Excellent quality! The diyas are beautifully crafted and burn perfectly.', date: '2 hours ago' },
      { product: 'Pure Cow Ghee', customer: 'Anjali Mehta', rating: 4, comment: 'Good quality ghee, authentic smell. Packaging could be better though.', date: '5 hours ago' },
      { product: 'Natural Incense Sticks', customer: 'Karan Malhotra', rating: 3, comment: 'Average fragrance, burns quickly. Expected better for the price.', date: '1 day ago' },
      { product: 'Sandalwood Paste', customer: 'Sneha Reddy', rating: 5, comment: 'Pure sandalwood! Perfect consistency and authentic fragrance. Will buy again.', date: '2 days ago' }
    ],
    upcomingPujas: [
      { date: 'Today, 11:30 AM', type: 'Satyanarayan Katha', customer: 'Sharma Family', location: 'Sector 45, Noida' },
      { date: 'Today, 2:00 PM', type: 'Havan', customer: 'Verma Ji', location: 'Sector 128, Noida' },
      { date: 'Tomorrow, 10:00 AM', type: 'Griha Pravesh', customer: 'Gupta Family', location: 'Sector 62, Noida' }
    ]
  };

  // Initialize data
  useEffect(() => {
    setData(dashboardData);
  }, []);

  // Format currency - Indian format
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Get status styles
  const getStatusStyles = (status) => {
    const base = "px-2 py-0.5 rounded-full text-sm font-medium";
    switch(status) {
      case 'delivered': 
        return `${base} bg-green-50 text-green-700`;
      case 'shipped': 
        return `${base} bg-blue-50 text-blue-600`;
      case 'processing': 
        return `${base} bg-orange-50 text-orange-500`;
      case 'pending': 
        return `${base} bg-gray-50 text-gray-600`;
      default: 
        return `${base} bg-gray-50 text-gray-600`;
    }
  };

  // Get stock alert styles
  const getStockAlertStyles = (alert) => {
    const base = "px-2 py-0.5 rounded-full text-sm font-medium";
    switch(alert) {
      case 'critical': 
        return `${base} bg-red-50 text-red-700`;
      case 'high': 
        return `${base} bg-orange-50 text-orange-500`;
      case 'medium': 
        return `${base} bg-yellow-50 text-yellow-600`;
      case 'low': 
        return `${base} bg-blue-50 text-blue-600`;
      default: 
        return `${base} bg-gray-50 text-gray-600`;
    }
  };

  // Handle actions
  const handleAction = (action) => {
    setIsLoading(true);
    
    switch(action) {
      case 'refresh':
        // Refresh data
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
        break;
        
      case 'downloadReport':
        const reportData = {
          date: new Date().toLocaleDateString('en-IN'),
          stats: dashboardData.stats,
          salesData: dashboardData.salesData[timeRange],
          recentOrders: dashboardData.recentOrders
        };
        const dataStr = JSON.stringify(reportData, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        const exportFileDefaultName = `acharya-report-${new Date().toISOString().split('T')[0]}.json`;
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
        break;
        
      case 'viewAllOrders':
        console.log('Navigate to orders page');
        break;
        
      case 'viewInventory':
        console.log('Navigate to inventory page');
        break;
        
      case 'viewReviews':
        console.log('Navigate to reviews page');
        break;

      case 'viewUpcomingPujas':
        console.log('Navigate to upcoming pujas');
        break;
    }
    
    setTimeout(() => setIsLoading(false), 500);
  };

  // Chart colors
  const chartColors = {
    primary: '#FF6B35',
    secondary: '#42A5F5',
    success: '#66BB6A',
    warning: '#FFA726'
  };

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/30">
      <VendorPageHeader 
        title="STORE DASHBOARD" 
        subtitle="Manage your sales, inventory, and orders" 
      />

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="rounded-lg p-6 flex flex-col items-center gap-3 bg-white">
            <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm text-gray-700">Processing...</p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="space-y-4 p-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg px-3 py-2 border border-orange-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <p className="text-[18px] text-gray-600 mt-1">
                {new Date().toLocaleDateString('en-IN', { 
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-[15px] font-semibold text-orange-500">
                  {formatCurrency(152750)}
                </p>
              </div>
              <div className="w-8 h-8 rounded flex items-center justify-center bg-orange-50">
                <DollarSign className="w-5 h-5 text-orange-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {/* Today's Orders */}
          <div className="rounded-lg border p-3 bg-white border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Today's Orders</p>
                <p className="text-xl font-semibold mt-1 text-gray-800">
                  {data.stats.todayOrders.value}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="w-3 h-3 text-green-700" />
                  <span className="text-sm text-green-700">{data.stats.todayOrders.change}</span>
                </div>
              </div>
              <div className="p-2 rounded bg-orange-50">
                <ShoppingBag className="w-5 h-5 text-orange-500" />
              </div>
            </div>
          </div>

          {/* Revenue */}
          <div className="rounded-lg border p-3 bg-white border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Revenue</p>
                <p className="text-xl font-semibold mt-1 text-gray-800">
                  {formatCurrency(data.stats.revenue.value)}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="w-3 h-3 text-green-700" />
                  <span className="text-sm text-green-700">{data.stats.revenue.change}</span>
                </div>
              </div>
              <div className="p-2 rounded bg-green-50">
                <DollarSign className="w-5 h-5 text-green-700" />
              </div>
            </div>
          </div>

          {/* Pending Orders */}
          <div className="rounded-lg border p-3 bg-white border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Orders</p>
                <p className="text-xl font-semibold mt-1 text-gray-800">
                  {data.stats.pendingOrders.value}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingDown className="w-3 h-3 text-orange-500" />
                  <span className="text-sm text-orange-500">{data.stats.pendingOrders.change}</span>
                </div>
              </div>
              <div className="p-2 rounded bg-blue-50">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Low Stock Items */}
          <div className="rounded-lg border p-3 bg-white border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Low Stock Items</p>
                <p className="text-xl font-semibold mt-1 text-gray-800">
                  {data.stats.lowStockItems.value}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <AlertCircle className="w-3 h-3 text-red-500" />
                  <span className="text-sm text-red-500">{data.stats.lowStockItems.change}</span>
                </div>
              </div>
              <div className="p-2 rounded bg-red-50">
                <Package className="w-5 h-5 text-red-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left Column - Charts */}
          <div className="lg:col-span-2 space-y-4">
            {/* Sales Chart */}
            <div className="rounded-lg border overflow-hidden bg-white border-gray-300">
              <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded flex items-center justify-center bg-white/20 backdrop-blur-sm">
                      <TrendingUp className="w-5 h-5 text-gray-800" />
                    </div>
                    <div>
                      <h3 className="text-[15px] font-bold text-gray-800">Sales Overview</h3>
                      <p className="text-sm text-gray-600">Last {timeRange === '7d' ? '7 days' : '30 days'} performance</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setTimeRange('7d')}
                      className={`px-2 py-0.5 rounded-full text-sm ${timeRange === '7d' ? 'bg-gray-100 text-gray-800' : 'bg-gray-50 text-gray-600'}`}
                    >
                      7D
                    </button>
                    <button 
                      onClick={() => setTimeRange('30d')}
                      className={`px-2 py-0.5 rounded-full text-sm ${timeRange === '30d' ? 'bg-gray-100 text-gray-800' : 'bg-gray-50 text-gray-600'}`}
                    >
                      30D
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-3">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data.salesData[timeRange]}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis 
                        dataKey="day" 
                        stroke="#6B7280"
                        fontSize={12}
                      />
                      <YAxis 
                        stroke="#6B7280"
                        fontSize={12}
                        tickFormatter={(value) => `₹${value/1000}k`}
                      />
                      <Tooltip 
                        formatter={(value) => [formatCurrency(value), 'Sales']}
                        labelStyle={{ fontSize: 12 }}
                        contentStyle={{
                          backgroundColor: '#ffffff',
                          borderColor: '#e5e7eb',
                          color: '#000000',
                          borderRadius: '8px'
                        }}
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="sales" 
                        stroke={chartColors.primary}
                        strokeWidth={2}
                        dot={{ stroke: chartColors.primary, strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="orders" 
                        stroke={chartColors.secondary}
                        strokeWidth={2}
                        dot={{ stroke: chartColors.secondary, strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h3 className="text-[15px] font-bold mb-3 text-gray-800">Quick Insights</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button 
                  onClick={() => handleAction('viewAllOrders')}
                  className="rounded-lg p-3 border transition-all group text-left bg-white border-gray-200 hover:border-orange-300 hover:bg-gray-50"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded bg-orange-50">
                        <ShoppingBag className="w-5 h-5 text-orange-500" />
                      </div>
                      <div>
                        <span className="text-sm font-medium block text-gray-800">View All Orders</span>
                        <span className="text-xs text-gray-600">See all {data.recentOrders.length} orders</span>
                      </div>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-orange-500" />
                  </div>
                </button>

                <button 
                  onClick={() => handleAction('downloadReport')}
                  className="rounded-lg p-3 border transition-all group text-left bg-white border-gray-200 hover:border-green-300 hover:bg-green-50"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded bg-green-50">
                        <Download className="w-5 h-5 text-green-700" />
                      </div>
                      <div>
                        <span className="text-sm font-medium block text-gray-800">Download Report</span>
                        <span className="text-xs text-gray-600">Export sales data</span>
                      </div>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-green-700" />
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Top Products & Lists */}
          <div className="space-y-4">
            {/* Top Products List */}
            <div className="rounded-lg border overflow-hidden bg-white border-gray-200">
              <div className="p-3 border-b border-gray-200 bg-gray-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-[15px] font-bold text-gray-800">Top Products</h3>
                  <span className="text-sm text-gray-600">5 items</span>
                </div>
              </div>

              <div className="divide-y divide-gray-200">
                {data.topProducts.map((product, index) => (
                  <div key={index} className="p-3 transition-colors hover:bg-gray-50">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-[14px] font-semibold text-gray-800">{product.name}</h4>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${product.growth.includes('+') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                              {product.growth}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className="text-sm text-gray-700">
                                Sales: {product.sales}
                              </span>
                              <span className="text-sm text-gray-700">
                                {formatCurrency(product.revenue)}
                              </span>
                            </div>
                            <span className="text-xs text-gray-500">{product.category}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Pujas */}
            <div className="rounded-lg border overflow-hidden bg-white border-gray-200">
              <div className="p-3 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-[15px] font-bold text-gray-800">Upcoming Pujas</h3>
                  <button 
                    onClick={() => handleAction('viewUpcomingPujas')}
                    className="text-sm font-medium text-orange-500 hover:text-orange-600"
                  >
                    View All →
                  </button>
                </div>
              </div>

              <div className="divide-y divide-gray-200">
                {data.upcomingPujas.map((puja, index) => (
                  <div key={index} className="p-3 transition-colors hover:bg-gray-50">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Calendar className="w-4 h-4 text-orange-500" />
                        <span className="text-sm font-medium text-gray-800">{puja.type}</span>
                      </div>
                      <p className="text-sm text-gray-600">{puja.customer}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{puja.location}</span>
                        <span className="text-xs text-gray-400">{puja.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Tip Card */}
            <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg p-3 border border-orange-200">
              <div className="flex items-start gap-2">
                <div className="p-1.5 rounded bg-orange-50">
                  <AlertCircle className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1 text-gray-800">Business Tip</h4>
                  <p className="text-xs text-gray-700">
                    Restock low inventory items to avoid missed sales opportunities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lists Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Recent Orders */}
          <div className="rounded-lg border overflow-hidden bg-white border-gray-200">
            <div className="p-3 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-[15px] font-bold text-gray-800">Recent Orders</h3>
                <button 
                  onClick={() => handleAction('viewAllOrders')}
                  className="text-sm font-medium text-orange-500 hover:text-orange-600"
                >
                  View All →
                </button>
              </div>
            </div>

            <div className="divide-y divide-gray-200">
              {data.recentOrders.map((order) => (
                <div key={order.id} className="p-3 transition-colors hover:bg-gray-50">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-[14px] font-semibold text-gray-800">{order.id}</h4>
                          <span className={getStatusStyles(order.status)}>
                            <span className="hidden xs:inline">{order.status}</span>
                          </span>
                        </div>
                        <p className="text-sm mb-1 text-gray-600">{order.customer}</p>
                        <p className="text-xs text-gray-500 mb-2">{order.pujaType}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-700">
                              {formatCurrency(order.amount)}
                            </span>
                            <span className="text-sm text-gray-600">{order.date}</span>
                          </div>
                          <button 
                            onClick={() => console.log('View order:', order.id)}
                            className="p-1 rounded hover:bg-gray-100"
                          >
                            <MoreVertical className="w-5 h-5 text-gray-500" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Low Stock Alerts */}
          <div className="rounded-lg border overflow-hidden bg-white border-gray-200">
            <div className="p-3 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-[15px] font-bold text-gray-800">Low Stock Alerts</h3>
                <button 
                  onClick={() => handleAction('viewInventory')}
                  className="text-sm font-medium text-orange-500 hover:text-orange-600"
                >
                  Manage →
                </button>
              </div>
            </div>

            <div className="divide-y divide-gray-200">
              {data.lowStockAlerts.map((item, index) => (
                <div key={index} className="p-3 transition-colors hover:bg-gray-50">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-[14px] font-semibold text-gray-800">{item.product}</h4>
                          <span className={getStockAlertStyles(item.alert)}>
                            <span className="hidden xs:inline">{item.alert}</span>
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-700">
                              Stock: {item.stock}/{item.minStock}
                            </span>
                            <span className="text-xs text-gray-500">{item.category}</span>
                          </div>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="mt-2">
                          <div className="w-full h-2 rounded-full bg-gray-200">
                            <div 
                              className={`h-2 rounded-full ${
                                item.alert === 'critical' ? 'bg-red-500' :
                                item.alert === 'high' ? 'bg-orange-500' :
                                item.alert === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'
                              }`}
                              style={{ width: `${Math.min(100, (item.stock / item.minStock) * 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Reviews */}
          <div className="rounded-lg border overflow-hidden bg-white border-gray-200">
            <div className="p-3 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-[15px] font-bold text-gray-800">Recent Reviews</h3>
                <button 
                  onClick={() => handleAction('viewReviews')}
                  className="text-sm font-medium text-orange-500 hover:text-orange-600"
                >
                  All Reviews →
                </button>
              </div>
            </div>

            <div className="divide-y divide-gray-200">
              {data.recentReviews.map((review, index) => (
                <div key={index} className="p-3 transition-colors hover:bg-gray-50">
                  <div className="flex items-start gap-3">
                    <div className="p-1.5 rounded bg-orange-50">
                      <Star className="w-4 h-4 text-orange-500 fill-orange-500" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-800">{review.product}</span>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-3 h-3 ${i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm mb-2 text-gray-700">{review.comment}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-600">{review.customer}</span>
                        <span className="text-xs text-gray-400">{review.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section - Additional Info */}
        <div className="rounded-lg border p-3 bg-white border-gray-200">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-center sm:text-left">
              <p className="text-sm text-gray-600">Need help with your business?</p>
              <p className="text-[14px] text-gray-800">Contact support: +91 98765 43210</p>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => handleAction('downloadReport')}
                className="px-3 py-1.5 text-sm rounded border bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200"
              >
                Download Report
              </button>
              <button 
                onClick={() => handleAction('refresh')}
                className="px-3 py-1.5 text-sm rounded border bg-gradient-to-r from-orange-300 to-orange-300 text-gray-800 hover:text-white border-orange-300 hover:from-orange-500 hover:to-orange-600"
              >
                Refresh Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;