import { useState } from 'react';
import { 
  Calendar, Clock, MessageSquare, TrendingUp, 
  DollarSign, Users, FileText, Star, 
  Video, Upload, CalendarDays, Bell,
  ArrowUpRight, ArrowDownRight, CheckCircle,
  MoreVertical, Filter, ChevronRight,
  Shield, Home, User, BarChart,
  Eye, Edit, Plus, XCircle
} from 'lucide-react';

const AstrologerDashboard = () => {
  const [timeFilter, setTimeFilter] = useState('today');
  const [showNotifications, setShowNotifications] = useState(false);

  // Sample Data
  const todayAppointments = [
    { id: 1, client: 'Rajesh Kumar', time: '10:00 AM', service: 'Ganpati Puja', status: 'confirmed', type: 'home' },
    { id: 2, client: 'Priya Sharma', time: '11:30 AM', service: 'Satyanarayan Katha', status: 'confirmed', type: 'online' },
    { id: 3, client: 'Amit Patel', time: '2:00 PM', service: 'Vastu Puja', status: 'pending', type: 'home' },
    { id: 4, client: 'Sonia Verma', time: '4:30 PM', service: 'Navgraha Shanti', status: 'confirmed', type: 'online' },
  ];

  const pendingReports = [
    { id: 1, client: 'Vikram Singh', service: 'Maha Mrityunjay Jaap', due: 'Today', priority: 'high' },
    { id: 2, client: 'Anjali Mehta', service: 'Ganpati Puja', due: 'Tomorrow', priority: 'medium' },
    { id: 3, client: 'Rohan Gupta', service: 'Satyanarayan Katha', due: 'In 2 days', priority: 'low' },
  ];

  const earningsData = {
    today: { amount: 12500, change: '+12%', trend: 'up' },
    week: { amount: 78500, change: '+8%', trend: 'up' },
    month: { amount: 285000, change: '+15%', trend: 'up' }
  };

  const newMessages = [
    { id: 1, client: 'Neha Kapoor', time: '10 min ago', preview: 'Can we schedule for next week?', unread: true },
    { id: 2, client: 'Ravi Malhotra', time: '25 min ago', preview: 'Thank you for the wonderful puja...', unread: true },
    { id: 3, client: 'Geeta Reddy', time: '1 hour ago', preview: 'Need to discuss about timing...', unread: false },
  ];

  const ratingData = {
    average: 4.8,
    total: 142,
    breakdown: [
      { stars: 5, count: 120, percent: 84 },
      { stars: 4, count: 18, percent: 13 },
      { stars: 3, count: 3, percent: 2 },
      { stars: 2, count: 1, percent: 1 },
      { stars: 1, count: 0, percent: 0 }
    ]
  };

  const availability = [
    { day: 'Today', slots: 3, status: 'busy' },
    { day: 'Tomorrow', slots: 5, status: 'available' },
    { day: 'Wed', slots: 2, status: 'busy' },
    { day: 'Thu', slots: 6, status: 'available' },
    { day: 'Fri', slots: 4, status: 'available' },
  ];

  // Stats Cards
  const stats = [
    { 
      title: 'Total Appointments', 
      value: '24', 
      change: '+3', 
      icon: Calendar, 
      color: 'orange',
      trend: 'up'
    },
    { 
      title: 'Pending Reports', 
      value: '7', 
      change: '-2', 
      icon: FileText, 
      color: 'blue',
      trend: 'down'
    },
    { 
      title: 'Active Clients', 
      value: '48', 
      change: '+5', 
      icon: Users, 
      color: 'green',
      trend: 'up'
    },
    { 
      title: 'Response Rate', 
      value: '94%', 
      change: '+2%', 
      icon: MessageSquare, 
      color: 'purple',
      trend: 'up'
    },
  ];

  // Quick Actions
  const quickActions = [
    { 
      title: 'Start Consultation', 
      icon: Video, 
      color: 'from-blue-400 to-blue-500',
      description: 'Video call with client',
      shortcut: 'Ctrl + C'
    },
    { 
      title: 'Upload Report', 
      icon: Upload, 
      color: 'from-green-400 to-green-500',
      description: 'Share puja report',
      shortcut: 'Ctrl + U'
    },
    { 
      title: 'Set Availability', 
      icon: CalendarDays, 
      color: 'from-purple-400 to-purple-500',
      description: 'Update calendar slots',
      shortcut: 'Ctrl + A'
    },
    { 
      title: 'Quick Message', 
      icon: MessageSquare, 
      color: 'from-orange-400 to-orange-500',
      description: 'Reply to clients',
      shortcut: 'Ctrl + M'
    },
  ];

  return (
    <div className=''>
      {/* Header Section - Exact Same Styling */}
      <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40  
                    px-3 py-1.5 border border-orange-100">
        
        {/* Mobile: Column, Desktop: Row */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          
          {/* Title Section */}
          <div className="text-left sm:text-left flex items-end gap-2">
            <div>
              <h1 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-orange-900 uppercase
                            leading-tight">
                Astrologer Dashboard
              </h1>
              {/* Mobile: Below heading, Desktop: Right side */}
              <p className="sm:hidden text-sm text-gray-600 mt-0.5">
                Your action center for today
              </p>
            </div>
            
            {/* Desktop: Right side of heading */}
            <p className="hidden sm:block text-sm text-gray-600 mb-0.5">
              Your action center for today
            </p>
          </div>
          
          {/* Right Section */}
          <div className="flex items-center justify-between sm:justify-end gap-2">
            {/* Time Filter */}
            <div className="hidden sm:flex items-center gap-1 bg-white border border-gray-300 rounded-lg p-0.5">
              {['today', 'week', 'month'].map((period) => (
                <button
                  key={period}
                  onClick={() => setTimeFilter(period)}
                  className={`px-2.5 py-1 text-xs font-medium rounded transition-colors ${
                    timeFilter === period
                      ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {period.charAt(0).toUpperCase() + period.slice(1)}
                </button>
              ))}
            </div>
            
            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-1.5 hover:bg-white/50 rounded-lg transition-colors relative"
              >
                <Bell className="w-5 h-5 text-orange-700" />
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full border border-white text-[10px] text-white">2</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-4 p-6">
        {/* Quick Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {stats.map((stat, index) => (
            <div key={index} className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 
                                      p-3 rounded-lg border border-gray-200 shadow-xs">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-800">{stat.title}</p>
                  <div className="flex items-baseline gap-1.5 mt-0.5">
                    <p className="text-[20px] font-semibold text-gray-800">{stat.value}</p>
                    <span className={`text-xs font-medium flex items-center ${
                      stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.trend === 'up' ? 
                        <ArrowUpRight className="w-3 h-3" /> : 
                        <ArrowDownRight className="w-3 h-3" />
                      }
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className={`p-1.5 rounded ${
                  stat.color === 'orange' ? 'bg-orange-50' :
                  stat.color === 'blue' ? 'bg-blue-50' :
                  stat.color === 'green' ? 'bg-green-50' :
                  'bg-purple-50'
                }`}>
                  <stat.icon className={`w-4 h-4 ${
                    stat.color === 'orange' ? 'text-orange-500' :
                    stat.color === 'blue' ? 'text-blue-500' :
                    stat.color === 'green' ? 'text-green-500' :
                    'text-purple-500'
                  }`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Earnings Summary Card */}
        <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 
                      p-4 rounded-lg border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-semibold text-gray-800">Earnings Summary</h2>
            <div className="flex items-center gap-1">
              <span className="text-xs text-gray-600">As of {timeFilter}</span>
              <ChevronRight className="w-4 h-4 text-gray-500" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {Object.entries(earningsData).map(([period, data]) => (
              <div key={period} className="bg-white/80 p-3 rounded-lg border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-600 uppercase">{period}</p>
                    <p className="text-lg font-bold text-gray-800 mt-0.5">₹{data.amount.toLocaleString()}</p>
                  </div>
                  <span className={`text-xs font-medium flex items-center gap-0.5 ${
                    data.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {data.trend === 'up' ? 
                      <ArrowUpRight className="w-3 h-3" /> : 
                      <ArrowDownRight className="w-3 h-3" />
                    }
                    {data.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-4">
            {/* Quick Action Buttons */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-xs p-4">
              <h2 className="text-base font-semibold text-gray-800 mb-3">Quick Actions</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all
                              bg-gradient-to-r ${action.color} text-white  hover:shadow-md`}
                  >
                    <action.icon className="w-5 h-5 mb-1.5" />
                    <span className="text-xs font-medium text-center">{action.title}</span>
                    <span className="text-xs opacity-80 mt-0.5">{action.shortcut}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Today's Appointments */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-xs">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-semibold text-gray-800">Today's Appointments</h2>
                  <span className="text-xs text-gray-600">{todayAppointments.length} total</span>
                </div>
              </div>
              
              <div className="divide-y divide-gray-200">
                {todayAppointments.map((appointment) => (
                  <div key={appointment.id} className="p-3 hover:bg-gray-50">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-2">
                        <div className="w-8 h-8 rounded bg-orange-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <User className="w-4 h-4 text-orange-600" />
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h3 className="font-medium text-gray-800 text-sm">{appointment.client}</h3>
                            <span className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-xs ${
                              appointment.status === 'confirmed' 
                                ? 'bg-green-50 text-green-700 border border-green-200' 
                                : 'bg-yellow-50 text-yellow-700 border border-yellow-200'
                            }`}>
                              {appointment.status === 'confirmed' ? 
                                <CheckCircle className="w-3 h-3" /> : 
                                <Clock className="w-3 h-3" />
                              }
                              {appointment.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mt-0.5">{appointment.service}</p>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-xs text-gray-500 flex items-center gap-0.5">
                              <Clock className="w-3 h-3" />
                              {appointment.time}
                            </span>
                            <span className="text-xs text-gray-500 flex items-center gap-0.5">
                              <Home className="w-3 h-3" />
                              {appointment.type}
                            </span>
                          </div>
                        </div>
                      </div>
                      <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors">
                        <Video className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {/* Pending Reports */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-xs">
              <div className="p-3 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-semibold text-gray-800">Pending Reports</h2>
                  <span className="text-xs bg-red-100 text-red-700 px-1.5 py-0.5 rounded">
                    {pendingReports.length} urgent
                  </span>
                </div>
              </div>
              
              <div className="divide-y divide-gray-200">
                {pendingReports.map((report) => (
                  <div key={report.id} className="p-3 hover:bg-gray-50">
                    <div className="flex items-start gap-2">
                      <div className={`p-1.5 rounded ${
                        report.priority === 'high' ? 'bg-red-50' :
                        report.priority === 'medium' ? 'bg-yellow-50' :
                        'bg-blue-50'
                      }`}>
                        <FileText className={`w-4 h-4 ${
                          report.priority === 'high' ? 'text-red-500' :
                          report.priority === 'medium' ? 'text-yellow-500' :
                          'text-blue-500'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-800 text-sm">{report.client}</h3>
                        <p className="text-sm text-gray-600 mt-0.5">{report.service}</p>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs text-gray-500">Due: {report.due}</span>
                          <button className="text-xs text-orange-600 hover:text-orange-700 font-medium">
                            Complete →
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Rating Snapshot */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-xs p-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-base font-semibold text-gray-800">Rating Snapshot</h2>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="font-bold text-gray-800">{ratingData.average}</span>
                  <span className="text-xs text-gray-600">({ratingData.total} reviews)</span>
                </div>
              </div>
              
              <div className="space-y-1.5">
                {ratingData.breakdown.map((rating, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="flex items-center gap-1 w-8">
                      <span className="text-xs text-gray-600">{rating.stars}</span>
                      <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                    </div>
                    <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-yellow-500 rounded-full"
                        style={{ width: `${rating.percent}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-600 w-8 text-right">{rating.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Availability */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-xs p-4">
              <h2 className="text-base font-semibold text-gray-800 mb-3">Upcoming Availability</h2>
              <div className="space-y-2">
                {availability.map((slot, index) => (
                  <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        slot.status === 'available' ? 'bg-green-500' : 'bg-red-500'
                      }`} />
                      <span className="text-sm font-medium text-gray-800">{slot.day}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-600">{slot.slots} slots</span>
                      <span className={`text-xs px-1.5 py-0.5 rounded ${
                        slot.status === 'available' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {slot.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-3 text-center text-sm text-orange-600 hover:text-orange-700 font-medium">
                View Full Calendar →
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section - New Messages */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-xs">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-gray-800">New Messages</h2>
              <span className="text-xs bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded">
                {newMessages.filter(m => m.unread).length} unread
              </span>
            </div>
          </div>
          
          <div className="divide-y divide-gray-200">
            {newMessages.map((message) => (
              <div key={message.id} className={`p-3 hover:bg-gray-50 ${message.unread ? 'bg-blue-50/50' : ''}`}>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 
                                flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">
                      {message.client.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-medium text-gray-800 text-sm">{message.client}</h3>
                          {message.unread && (
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-0.5 truncate">{message.preview}</p>
                      </div>
                      <span className="text-xs text-gray-500 whitespace-nowrap">{message.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-3 border-t border-gray-200">
            <button className="w-full text-center text-sm text-orange-600 hover:text-orange-700 font-medium">
              View All Messages →
            </button>
          </div>
        </div>
      </div>

      {/* Notifications Panel */}
      {showNotifications && (
        <div className="fixed right-4 top-20 bg-white rounded-lg border border-gray-200 shadow-lg w-80 z-50">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-800">Notifications</h3>
              <button 
                onClick={() => setShowNotifications(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <XCircle className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          </div>
          <div className="p-2">
            <div className="p-3 hover:bg-gray-50 rounded cursor-pointer">
              <div className="flex items-start gap-2">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-800">Appointment confirmed with Rajesh Kumar</p>
                  <p className="text-xs text-gray-500 mt-0.5">2 minutes ago</p>
                </div>
              </div>
            </div>
            <div className="p-3 hover:bg-gray-50 rounded cursor-pointer">
              <div className="flex items-start gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-800">New message from Priya Sharma</p>
                  <p className="text-xs text-gray-500 mt-0.5">15 minutes ago</p>
                </div>
              </div>
            </div>
            <div className="p-3 hover:bg-gray-50 rounded cursor-pointer">
              <div className="flex items-start gap-2">
                <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-800">Upcoming appointment in 30 minutes</p>
                  <p className="text-xs text-gray-500 mt-0.5">1 hour ago</p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-3 border-t border-gray-200">
            <button className="w-full text-center text-sm text-orange-600 hover:text-orange-700 font-medium">
              Mark all as read
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AstrologerDashboard;