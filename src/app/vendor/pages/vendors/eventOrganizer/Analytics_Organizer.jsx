import React, { useState } from 'react';
import {
  // Core Icons
  TrendingUp,
  TrendingDown,
  CalendarDays,
  Ticket,
  IndianRupee,
  Users,
  Star,
  Award,
  Gift,
  Bell,
  Filter,
  Download,
  ChevronRight,
  BarChart3,
  PieChart,
  LineChart,
  Activity,
  Target,
  DollarSign,
  ShoppingBag,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Share2,
  Printer,
  RefreshCw
} from 'lucide-react';

import VendorPageHeader from '../../../components/VendorPageHeader';

const Analytics_Organizer = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [chartView, setChartView] = useState('revenue');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState('all');

  // ============ UNREAD COUNT ============
  const unreadCount = 3;

  // ============ REVENUE DATA ============
  const revenueData = {
    daily: [
      { day: '16 Feb', amount: 12500, bookings: 8 },
      { day: '17 Feb', amount: 18200, bookings: 12 },
      { day: '18 Feb', amount: 15400, bookings: 10 },
      { day: '19 Feb', amount: 22100, bookings: 15 },
      { day: '20 Feb', amount: 25800, bookings: 18 },
      { day: '21 Feb', amount: 19100, bookings: 13 },
      { day: '22 Feb', amount: 24700, bookings: 16 }
    ],
    weekly: [
      { week: 'Week 1', amount: 84500, bookings: 52 },
      { week: 'Week 2', amount: 91200, bookings: 58 },
      { week: 'Week 3', amount: 102500, bookings: 64 },
      { week: 'Week 4', amount: 115800, bookings: 71 }
    ],
    monthly: [
      { month: 'Sep 2025', amount: 245000, bookings: 156 },
      { month: 'Oct 2025', amount: 289000, bookings: 178 },
      { month: 'Nov 2025', amount: 312000, bookings: 195 },
      { month: 'Dec 2025', amount: 425000, bookings: 245 },
      { month: 'Jan 2026', amount: 398000, bookings: 234 },
      { month: 'Feb 2026', amount: 456000, bookings: 267 }
    ],
    yearly: [
      { year: '2021', amount: 2450000, bookings: 1450 },
      { year: '2022', amount: 3120000, bookings: 1870 },
      { year: '2023', amount: 4250000, bookings: 2560 },
      { year: '2024', amount: 5670000, bookings: 3450 },
      { year: '2025', amount: 7230000, bookings: 4320 },
      { year: '2026', amount: 1250000, bookings: 780 }
    ]
  };

  // ============ TICKET TYPE DISTRIBUTION ============
  const ticketTypeData = [
    { type: 'VIP', count: 450, revenue: 450000, percentage: 28, color: 'bg-purple-500' },
    { type: 'General', count: 850, revenue: 425000, percentage: 52, color: 'bg-blue-500' },
    { type: 'Student', count: 220, revenue: 44000, percentage: 14, color: 'bg-green-500' },
    { type: 'Free', count: 100, revenue: 0, percentage: 6, color: 'bg-gray-400' }
  ];

  // ============ EVENT CATEGORY DISTRIBUTION ============
  const categoryData = [
    { category: 'Festival', count: 1250, revenue: 625000, percentage: 55, color: 'bg-orange-500' },
    { category: 'Utsav', count: 450, revenue: 225000, percentage: 20, color: 'bg-purple-500' },
    { category: 'Spiritual', count: 320, revenue: 96000, percentage: 14, color: 'bg-yellow-500' },
    { category: 'Regular', count: 250, revenue: 0, percentage: 11, color: 'bg-blue-500' }
  ];

  // ============ TOP EVENTS DATA ============
  const topEvents = [
    { id: 1, name: 'Mahashivratri Celebration', tickets: 345, revenue: 172500, capacity: 500, percentage: 69, trend: '+12%' },
    { id: 2, name: 'Ram Navami', tickets: 245, revenue: 122500, capacity: 400, percentage: 61, trend: '+8%' },
    { id: 3, name: 'Annakut Utsav', tickets: 450, revenue: 225000, capacity: 1000, percentage: 45, trend: '+5%' },
    { id: 4, name: 'Hanuman Jayanti', tickets: 189, revenue: 94500, capacity: 350, percentage: 54, trend: '+3%' },
    { id: 5, name: 'Gita Jayanti', tickets: 120, revenue: 60000, capacity: 300, percentage: 40, trend: '+2%' }
  ];

  // ============ MONTHLY STATS ============
  const monthlyStats = {
    totalRevenue: 456000,
    totalBookings: 267,
    avgTicketPrice: 1707,
    conversionRate: 68.5,
    peakDay: '22 Feb 2026',
    peakRevenue: 24700,
    growth: 14.8,
    projectedRevenue: 525000
  };

  // ============ RECENT TRENDS ============
  const trends = [
    { metric: 'Revenue', value: '+14.8%', trend: 'up', color: 'text-green-600' },
    { metric: 'Bookings', value: '+12.3%', trend: 'up', color: 'text-green-600' },
    { metric: 'Avg. Ticket Price', value: '-2.1%', trend: 'down', color: 'text-red-500' },
    { metric: 'Conversion Rate', value: '+5.2%', trend: 'up', color: 'text-green-600' }
  ];

  // ============ EXACT MATCH to NotificationsPuja ============
  const getTrendIcon = (trend) => {
    return trend === 'up' 
      ? <ArrowUpRight className="w-3 h-3 text-green-600" />
      : <ArrowDownRight className="w-3 h-3 text-red-500" />;
  };

  // ============ CHART COMPONENTS ============

  // Line Chart - Revenue Over Time
  const RevenueLineChart = () => {
    const data = timeRange === 'week' ? revenueData.daily 
      : timeRange === 'month' ? revenueData.weekly 
      : timeRange === 'year' ? revenueData.monthly 
      : revenueData.yearly;
    
    const maxAmount = Math.max(...data.map(d => d.amount));
    
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-orange-50 rounded">
              <LineChart className="w-5 h-5 text-orange-500" />
            </div>
            <h3 className="text-[15px] font-bold text-gray-800">Revenue Trend</h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">
              {timeRange === 'week' ? 'Last 7 days' 
                : timeRange === 'month' ? 'Last 4 weeks' 
                : timeRange === 'year' ? 'Last 6 months' 
                : 'Last 6 years'}
            </span>
          </div>
        </div>

        {/* Chart Area */}
        <div className="relative h-48 mt-4">
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 bottom-0 w-10 flex flex-col justify-between text-right">
            <span className="text-xs text-gray-400">₹{(maxAmount/1000).toFixed(0)}k</span>
            <span className="text-xs text-gray-400">₹{(maxAmount*0.75/1000).toFixed(0)}k</span>
            <span className="text-xs text-gray-400">₹{(maxAmount*0.5/1000).toFixed(0)}k</span>
            <span className="text-xs text-gray-400">₹{(maxAmount*0.25/1000).toFixed(0)}k</span>
            <span className="text-xs text-gray-400">₹0</span>
          </div>

          {/* Chart lines */}
          <div className="absolute left-12 right-4 top-0 bottom-0">
            {/* Horizontal grid lines */}
            <div className="absolute top-0 left-0 right-0 border-t border-gray-100"></div>
            <div className="absolute top-1/4 left-0 right-0 border-t border-gray-100"></div>
            <div className="absolute top-2/4 left-0 right-0 border-t border-gray-100"></div>
            <div className="absolute top-3/4 left-0 right-0 border-t border-gray-100"></div>
            <div className="absolute bottom-0 left-0 right-0 border-t border-gray-100"></div>

            {/* Line chart visualization */}
            <svg className="w-full h-full" preserveAspectRatio="none">
              {/* Line */}
              <polyline
                points={data.map((d, i) => {
                  const x = (i / (data.length - 1)) * 100;
                  const y = 100 - (d.amount / maxAmount) * 80;
                  return `${x}%, ${y}%`;
                }).join(' ')}
                fill="none"
                stroke="#f97316"
                strokeWidth="2"
                className="drop-shadow-sm"
              />
              {/* Area under line */}
              <polygon
                points={`
                  0%,100% 
                  ${data.map((d, i) => {
                    const x = (i / (data.length - 1)) * 100;
                    const y = 100 - (d.amount / maxAmount) * 80;
                    return `${x}%, ${y}%`;
                  }).join(' ')}
                  100%,100%
                `}
                fill="url(#gradient)"
                opacity="0.1"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#f97316" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* Data points */}
              {data.map((d, i) => {
                const x = (i / (data.length - 1)) * 100;
                const y = 100 - (d.amount / maxAmount) * 80;
                return (
                  <circle
                    key={i}
                    cx={`${x}%`}
                    cy={`${y}%`}
                    r="4"
                    fill="white"
                    stroke="#f97316"
                    strokeWidth="2"
                    className="hover:r-6 transition-all cursor-pointer"
                  />
                );
              })}
            </svg>

            {/* X-axis labels */}
            <div className="absolute -bottom-6 left-0 right-0 flex justify-between">
              {data.map((d, i) => (
                <span key={i} className="text-xs text-gray-500 -rotate-45 origin-top-left">
                  {d.day || d.week || d.month || d.year}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="mt-10 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Total Revenue</span>
            <span className="text-lg font-bold text-gray-900">
              ₹{data.reduce((acc, d) => acc + d.amount, 0).toLocaleString('en-IN')}
            </span>
          </div>
          <div className="flex items-center justify-between mt-1">
            <span className="text-xs text-gray-500">Average</span>
            <span className="text-sm font-medium text-green-600">
              ₹{Math.round(data.reduce((acc, d) => acc + d.amount, 0) / data.length).toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      </div>
    );
  };

  // Bar Chart - Bookings Over Time
  const BookingsBarChart = () => {
    const data = timeRange === 'week' ? revenueData.daily 
      : timeRange === 'month' ? revenueData.weekly 
      : timeRange === 'year' ? revenueData.monthly 
      : revenueData.yearly;
    
    const maxBookings = Math.max(...data.map(d => d.bookings));

    return (
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-blue-50 rounded">
              <BarChart3 className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-[15px] font-bold text-gray-800">Booking Trends</h3>
          </div>
          <span className="text-xs text-gray-500">Tickets sold</span>
        </div>

        {/* Bar Chart */}
        <div className="relative h-48 mt-4">
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 bottom-0 w-10 flex flex-col justify-between text-right">
            <span className="text-xs text-gray-400">{maxBookings}</span>
            <span className="text-xs text-gray-400">{Math.round(maxBookings * 0.75)}</span>
            <span className="text-xs text-gray-400">{Math.round(maxBookings * 0.5)}</span>
            <span className="text-xs text-gray-400">{Math.round(maxBookings * 0.25)}</span>
            <span className="text-xs text-gray-400">0</span>
          </div>

          {/* Bars */}
          <div className="absolute left-12 right-4 top-0 bottom-0 flex items-end justify-between">
            {data.map((d, i) => {
              const height = (d.bookings / maxBookings) * 100;
              return (
                <div key={i} className="flex flex-col items-center w-8">
                  <div 
                    className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t transition-all hover:from-blue-600 hover:to-blue-500 cursor-pointer group relative"
                    style={{ height: `${height}%` }}
                  >
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {d.bookings} tickets
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 mt-2 -rotate-45 origin-top-left">
                    {d.day || d.week || d.month || d.year}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Summary */}
        <div className="mt-10 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Total Bookings</span>
            <span className="text-lg font-bold text-gray-900">
              {data.reduce((acc, d) => acc + d.bookings, 0).toLocaleString('en-IN')}
            </span>
          </div>
          <div className="flex items-center justify-between mt-1">
            <span className="text-xs text-gray-500">Average per period</span>
            <span className="text-sm font-medium text-blue-600">
              {Math.round(data.reduce((acc, d) => acc + d.bookings, 0) / data.length)}
            </span>
          </div>
        </div>
      </div>
    );
  };

  // Pie Chart - Ticket Type Distribution
  const TicketPieChart = () => {
    const total = ticketTypeData.reduce((acc, t) => acc + t.count, 0);
    
    // Calculate cumulative percentages for pie segments
    let cumulative = 0;
    const segments = ticketTypeData.map(t => {
      const start = cumulative;
      cumulative += (t.count / total) * 360;
      const end = cumulative;
      return { ...t, start, end };
    });

    return (
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-purple-50 rounded">
              <PieChart className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="text-[15px] font-bold text-gray-800">Ticket Distribution</h3>
          </div>
          <span className="text-xs text-gray-500">{total} total tickets</span>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Pie Chart Visualization */}
          <div className="relative w-40 h-40">
            <svg viewBox="0 0 100 100" className="transform -rotate-90">
              {segments.map((segment, i) => {
                const startAngle = (segment.start * Math.PI) / 180;
                const endAngle = (segment.end * Math.PI) / 180;
                
                const x1 = 50 + 40 * Math.cos(startAngle);
                const y1 = 50 + 40 * Math.sin(startAngle);
                const x2 = 50 + 40 * Math.cos(endAngle);
                const y2 = 50 + 40 * Math.sin(endAngle);
                
                const largeArcFlag = segment.end - segment.start > 180 ? 1 : 0;
                
                const pathData = [
                  `M 50 50`,
                  `L ${x1} ${y1}`,
                  `A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                  `Z`
                ].join(' ');

                return (
                  <path
                    key={i}
                    d={pathData}
                    fill={segment.color.replace('bg-', '#')}
                    stroke="white"
                    strokeWidth="1"
                    className="hover:opacity-80 transition-opacity cursor-pointer"
                  >
                    <title>{segment.type}: {segment.count} tickets (₹{segment.revenue.toLocaleString('en-IN')})</title>
                  </path>
                );
              })}
              <circle cx="50" cy="50" r="20" fill="white" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className="text-xl font-bold text-gray-800">{total}</span>
              <span className="text-xs text-gray-500">Total</span>
            </div>
          </div>

          {/* Legend */}
          <div className="flex-1 space-y-2">
            {ticketTypeData.map((type, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${type.color}`}></div>
                  <span className="text-xs text-gray-700">{type.type}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-medium text-gray-800">{type.count}</span>
                  <span className="text-xs text-gray-500 ml-1">({type.percentage}%)</span>
                </div>
              </div>
            ))}
            <div className="pt-2 mt-2 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-700">Total Revenue</span>
                <span className="text-sm font-bold text-green-600">
                  ₹{ticketTypeData.reduce((acc, t) => acc + t.revenue, 0).toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Category Distribution Pie Chart
  const CategoryPieChart = () => {
    const total = categoryData.reduce((acc, c) => acc + c.count, 0);
    
    let cumulative = 0;
    const segments = categoryData.map(c => {
      const start = cumulative;
      cumulative += (c.count / total) * 360;
      const end = cumulative;
      return { ...c, start, end };
    });

    return (
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-orange-50 rounded">
              <Award className="w-5 h-5 text-orange-500" />
            </div>
            <h3 className="text-[15px] font-bold text-gray-800">Event Categories</h3>
          </div>
          <span className="text-xs text-gray-500">{total} tickets</span>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Pie Chart */}
          <div className="relative w-40 h-40">
            <svg viewBox="0 0 100 100" className="transform -rotate-90">
              {segments.map((segment, i) => {
                const startAngle = (segment.start * Math.PI) / 180;
                const endAngle = (segment.end * Math.PI) / 180;
                
                const x1 = 50 + 40 * Math.cos(startAngle);
                const y1 = 50 + 40 * Math.sin(startAngle);
                const x2 = 50 + 40 * Math.cos(endAngle);
                const y2 = 50 + 40 * Math.sin(endAngle);
                
                const largeArcFlag = segment.end - segment.start > 180 ? 1 : 0;
                
                const pathData = [
                  `M 50 50`,
                  `L ${x1} ${y1}`,
                  `A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                  `Z`
                ].join(' ');

                return (
                  <path
                    key={i}
                    d={pathData}
                    fill={segment.color.replace('bg-', '#')}
                    stroke="white"
                    strokeWidth="1"
                    className="hover:opacity-80 transition-opacity cursor-pointer"
                  />
                );
              })}
              <circle cx="50" cy="50" r="20" fill="white" />
            </svg>
          </div>

          {/* Legend */}
          <div className="flex-1 space-y-2">
            {categoryData.map((cat, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${cat.color}`}></div>
                  <span className="text-xs text-gray-700">{cat.category}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-medium text-gray-800">{cat.count}</span>
                  <span className="text-xs text-gray-500 ml-1">({cat.percentage}%)</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // ============ TOP EVENTS TABLE ============
  const TopEventsTable = () => {
    return (
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-[15px] font-bold text-gray-800">Top Performing Events</h3>
            <button className="text-sm font-medium text-orange-500 hover:text-orange-600">
              View All
            </button>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {topEvents.map((event) => (
            <div key={event.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="text-sm font-semibold text-gray-800">{event.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-600">{event.tickets} tickets</span>
                    <span className="text-xs text-gray-300">•</span>
                    <span className="text-xs font-medium text-green-600">₹{event.revenue.toLocaleString('en-IN')}</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 bg-green-50 text-green-700 rounded-full text-xs font-medium flex items-center gap-1">
                  {getTrendIcon('up')}
                  {event.trend}
                </span>
              </div>
              
              {/* Progress Bar */}
              <div className="mt-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-500">Capacity Utilization</span>
                  <span className="text-xs font-medium text-gray-700">{event.percentage}%</span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-orange-400 to-orange-500 rounded-full"
                    style={{ width: `${event.percentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-3 bg-gray-50 border-t border-gray-200">
          <button className="text-sm font-medium text-orange-500 hover:text-orange-600 flex items-center justify-center gap-1 w-full">
            Download Report
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  };

  // ============ MONTHLY STATS CARD ============
  const MonthlyStatsCard = () => {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[15px] font-bold text-gray-800">Monthly Summary</h3>
          <span className="text-xs bg-orange-50 text-orange-500 px-2 py-1 rounded-full">
            Feb 2026
          </span>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-green-50 rounded">
                <IndianRupee className="w-4 h-4 text-green-600" />
              </div>
              <span className="text-xs text-gray-600">Total Revenue</span>
            </div>
            <div className="text-right">
              <span className="text-sm font-bold text-gray-900">
                ₹{monthlyStats.totalRevenue.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-green-600 ml-1">+{monthlyStats.growth}%</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-blue-50 rounded">
                <Ticket className="w-4 h-4 text-blue-600" />
              </div>
              <span className="text-xs text-gray-600">Total Bookings</span>
            </div>
            <span className="text-sm font-bold text-gray-900">{monthlyStats.totalBookings}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-purple-50 rounded">
                <DollarSign className="w-4 h-4 text-purple-600" />
              </div>
              <span className="text-xs text-gray-600">Avg. Ticket Price</span>
            </div>
            <span className="text-sm font-bold text-gray-900">₹{monthlyStats.avgTicketPrice}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-orange-50 rounded">
                <Target className="w-4 h-4 text-orange-500" />
              </div>
              <span className="text-xs text-gray-600">Conversion Rate</span>
            </div>
            <span className="text-sm font-bold text-gray-900">{monthlyStats.conversionRate}%</span>
          </div>

          <div className="pt-3 mt-1 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-600">Peak Day</span>
              <div className="text-right">
                <span className="text-xs font-medium text-gray-800">{monthlyStats.peakDay}</span>
                <span className="text-xs text-gray-500 ml-1">₹{monthlyStats.peakRevenue.toLocaleString('en-IN')}</span>
              </div>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-gray-600">Projected (Mar)</span>
              <span className="text-xs font-medium text-green-600">
                ₹{monthlyStats.projectedRevenue.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ============ TRENDS CARD ============
  const TrendsCard = () => {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="text-[15px] font-bold text-gray-800 mb-4">Key Trends</h3>
        
        <div className="space-y-3">
          {trends.map((trend, i) => (
            <div key={i} className="flex items-center justify-between">
              <span className="text-xs text-gray-600">{trend.metric}</span>
              <span className={`text-xs font-medium flex items-center gap-0.5 ${trend.color}`}>
                {getTrendIcon(trend.trend)}
                {trend.value}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <button className="w-full px-3 py-2 bg-orange-50 text-orange-500 text-sm font-medium rounded border border-orange-300 hover:bg-orange-100 transition-colors flex items-center justify-center gap-2">
            <RefreshCw className="w-4 h-4" />
            Refresh Data
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50/30">
      <VendorPageHeader 
        title="ANALYTICS & INSIGHTS" 
        subtitle="Business insights and performance overview" 
      />

      {/* Main Content - EXACT spacing */}
      <div className="space-y-4 p-6">
        {/* Welcome Section - EXACT match */}
        <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg px-3 py-2 border border-orange-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <p className="text-[18px] text-gray-600">
                Business insights • {timeRange === 'week' ? 'Weekly' : timeRange === 'month' ? 'Monthly' : timeRange === 'year' ? 'Yearly' : 'Annual'} overview
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm text-gray-600">Revenue Growth</p>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <p className="text-[15px] font-semibold text-green-600">
                    +{monthlyStats.growth}%
                  </p>
                </div>
              </div>
              <div className="w-8 h-8 bg-orange-50 rounded flex items-center justify-center">
                <Activity className="w-5 h-5 text-orange-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Time Range Selector */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <CalendarDays className="w-5 h-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Time Range:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setTimeRange('week')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                  timeRange === 'week' 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Week
              </button>
              <button
                onClick={() => setTimeRange('month')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                  timeRange === 'month' 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Month
              </button>
              <button
                onClick={() => setTimeRange('year')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                  timeRange === 'year' 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Year
              </button>
              <button
                onClick={() => setTimeRange('all')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                  timeRange === 'all' 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All Time
              </button>
            </div>
            <button className="px-3 py-1.5 text-sm bg-gray-100 text-gray-800 rounded border border-gray-300 hover:bg-gray-200 flex items-center gap-2 ml-auto">
              <Download className="w-4 h-4" />
              Export Report
            </button>
          </div>
        </div>

        {/* Stats Cards - EXACT match */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {/* Total Revenue */}
          <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg border border-gray-200 px-3 py-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-xl font-semibold text-gray-800 mt-1">
                  ₹{revenueData.monthly.reduce((acc, m) => acc + m.amount, 0).toLocaleString('en-IN')}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="w-3 h-3 text-green-600" />
                  <span className="text-sm text-green-600">+14.8%</span>
                </div>
              </div>
              <div className="p-2 bg-green-50 rounded">
                <IndianRupee className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </div>

          {/* Total Tickets */}
          <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg border border-gray-200 px-3 py-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tickets Sold</p>
                <p className="text-xl font-semibold text-gray-800 mt-1">
                  {revenueData.monthly.reduce((acc, m) => acc + m.bookings, 0).toLocaleString('en-IN')}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <Ticket className="w-3 h-3 text-blue-600" />
                  <span className="text-sm text-blue-600">+12.3%</span>
                </div>
              </div>
              <div className="p-2 bg-blue-50 rounded">
                <Ticket className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Active Events */}
          <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg border border-gray-200 px-3 py-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Events</p>
                <p className="text-xl font-semibold text-gray-800 mt-1">6</p>
                <p className="text-xs text-orange-500 mt-2">3 upcoming</p>
              </div>
              <div className="p-2 bg-orange-50 rounded">
                <CalendarDays className="w-5 h-5 text-orange-600" />
              </div>
            </div>
          </div>

          {/* Avg. Ticket Price */}
          <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg border border-gray-200 px-3 py-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg. Ticket Price</p>
                <p className="text-xl font-semibold text-gray-800 mt-1">
                  ₹{monthlyStats.avgTicketPrice}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingDown className="w-3 h-3 text-red-500" />
                  <span className="text-sm text-red-500">-2.1%</span>
                </div>
              </div>
              <div className="p-2 bg-purple-50 rounded">
                <DollarSign className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Grid - 2 columns on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Revenue Line Chart */}
          <RevenueLineChart />
          
          {/* Bookings Bar Chart */}
          <BookingsBarChart />
        </div>

        {/* Second Row - 2 columns on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Ticket Type Pie Chart */}
          <TicketPieChart />
          
          {/* Category Distribution Pie Chart */}
          <CategoryPieChart />
        </div>

        {/* Third Row - 2/3 + 1/3 Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Top Events - 2/3 width */}
          <div className="lg:col-span-2">
            <TopEventsTable />
          </div>
          
          {/* Right Column - 1/3 width */}
          <div className="space-y-4">
            <MonthlyStatsCard />
            <TrendsCard />
          </div>
        </div>

        {/* Bottom Section - EXACT match */}
        <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg border border-gray-200 p-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-center sm:text-left">
              <p className="text-sm text-gray-600">Custom Report</p>
              <p className="text-[14px] text-gray-800">Generate detailed analytics report for any date range</p>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 text-sm bg-gray-100 text-gray-800 rounded border border-gray-300 hover:bg-gray-200">
                Schedule Report
              </button>
              <button className="px-3 py-1.5 text-sm bg-gradient-to-r from-orange-300 to-orange-300 text-gray-800 hover:text-white rounded hover:from-orange-500 hover:to-orange-600">
                Export Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics_Organizer;
