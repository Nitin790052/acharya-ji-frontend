import { useState, useEffect } from 'react';
import { 
  Calendar, Clock, Settings, Plus, 
  X, Edit, Trash2, CheckCircle,
  AlertCircle, ChevronLeft, ChevronRight,
  MoreVertical, Filter, Search,
  Zap, Moon, Sun, Coffee,
  Bell, Lock, Unlock, RefreshCw,
  DollarSign, Users, BarChart,
  Shield, PauseCircle, PlayCircle,
  CalendarDays, Watch, Timer,
  Grid, List, MapPin, Globe,
  Home, Building, Video
} from 'lucide-react';

import VendorPageHeader from '../../../components/VendorPageHeader';

const AvailabilitySchedule = () => {
  const [view, setView] = useState('week'); // 'week', 'day', 'month'
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showAddSlot, setShowAddSlot] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isVacationMode, setIsVacationMode] = useState(false);
  const [isEmergencyPause, setIsEmergencyPause] = useState(false);
  const [autoBreak, setAutoBreak] = useState(15); // minutes between sessions
  const [peakHourPricing, setPeakHourPricing] = useState(false);
  
  // Days of the week
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  // Time slots
  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', 
    '12:00', '13:00', '14:00', '15:00', 
    '16:00', '17:00', '18:00', '19:00'
  ];

  // Sample availability slots
  const [availabilitySlots, setAvailabilitySlots] = useState([
    { id: 1, day: 'Mon', startTime: '10:00', endTime: '11:00', type: 'home', status: 'available', maxBookings: 3, booked: 1 },
    { id: 2, day: 'Mon', startTime: '14:00', endTime: '15:30', type: 'online', status: 'available', maxBookings: 2, booked: 0 },
    { id: 3, day: 'Tue', startTime: '11:00', endTime: '12:00', type: 'temple', status: 'available', maxBookings: 1, booked: 1 },
    { id: 4, day: 'Wed', startTime: '16:00', endTime: '17:30', type: 'online', status: 'available', maxBookings: 3, booked: 2 },
    { id: 5, day: 'Thu', startTime: '09:00', endTime: '10:30', type: 'home', status: 'booked', maxBookings: 2, booked: 2 },
    { id: 6, day: 'Fri', startTime: '13:00', endTime: '14:00', type: 'online', status: 'available', maxBookings: 2, booked: 1 },
  ]);

  // Weekly schedule
  const weeklySchedule = [
    { day: 'Mon', enabled: true, slots: 3, startTime: '10:00', endTime: '17:00' },
    { day: 'Tue', enabled: true, slots: 4, startTime: '09:00', endTime: '18:00' },
    { day: 'Wed', enabled: true, slots: 2, startTime: '11:00', endTime: '16:00' },
    { day: 'Thu', enabled: true, slots: 3, startTime: '10:00', endTime: '17:00' },
    { day: 'Fri', enabled: true, slots: 4, startTime: '09:00', endTime: '18:00' },
    { day: 'Sat', enabled: false, slots: 0, startTime: '--:--', endTime: '--:--' },
    { day: 'Sun', enabled: false, slots: 0, startTime: '--:--', endTime: '--:--' },
  ];

  // Peak hours
  const peakHours = [
    { time: '10:00', label: 'Morning Peak', multiplier: 1.5 },
    { time: '15:00', label: 'Afternoon Peak', multiplier: 1.3 },
    { time: '18:00', label: 'Evening Peak', multiplier: 1.8 },
  ];

  // Stats
  const stats = [
    { title: 'Weekly Slots', value: '18', change: '+3', icon: Calendar, color: 'orange' },
    { title: 'Booked This Week', value: '12', change: '+4', icon: Users, color: 'blue' },
    { title: 'Utilization Rate', value: '67%', change: '+8%', icon: BarChart, color: 'green' },
    { title: 'Avg. Session Time', value: '45 mins', change: '-5', icon: Clock, color: 'purple' }
  ];

  // Get current week dates
  const getCurrentWeek = () => {
    const current = new Date(currentDate);
    const weekStart = new Date(current.setDate(current.getDate() - current.getDay()));
    const week = [];
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(weekStart);
      date.setDate(date.getDate() + i);
      week.push({
        day: daysOfWeek[i],
        date: date.getDate(),
        month: date.getMonth() + 1,
        fullDate: date.toISOString().split('T')[0]
      });
    }
    
    return week;
  };

  const currentWeek = getCurrentWeek();

  // Navigate weeks
  const navigateWeek = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + (direction * 7));
    setCurrentDate(newDate);
  };

  // Navigate to today
  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Format time
  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    return `${hour > 12 ? hour - 12 : hour}:${minutes} ${hour >= 12 ? 'PM' : 'AM'}`;
  };

  // Get slots for specific day
  const getSlotsForDay = (day) => {
    return availabilitySlots.filter(slot => slot.day === day);
  };

  // Get type icon
  const getTypeIcon = (type) => {
    switch(type) {
      case 'home': return <Home className="w-3.5 h-3.5" />;
      case 'online': return <Globe className="w-3.5 h-3.5" />;
      case 'temple': return <Building className="w-3.5 h-3.5" />;
      default: return <Video className="w-3.5 h-3.5" />;
    }
  };

  // Get type color
  const getTypeColor = (type) => {
    switch(type) {
      case 'home': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'online': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'temple': return 'bg-purple-100 text-purple-700 border-purple-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  // Get status badge
  const getStatusBadge = (status) => {
    return status === 'available' ? 
      <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-200 text-xs">
        <CheckCircle className="w-3 h-3" /> Available
      </span> : 
      <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-200 text-xs">
        <AlertCircle className="w-3 h-3" /> Booked
      </span>;
  };

  // Add new slot
  const handleAddSlot = (newSlot) => {
    const slotWithId = {
      ...newSlot,
      id: availabilitySlots.length + 1,
      booked: 0
    };
    setAvailabilitySlots([...availabilitySlots, slotWithId]);
    setShowAddSlot(false);
  };

  // Delete slot
  const handleDeleteSlot = (slotId) => {
    if (window.confirm('Are you sure you want to delete this time slot?')) {
      setAvailabilitySlots(availabilitySlots.filter(slot => slot.id !== slotId));
    }
  };

  // Toggle vacation mode
  const toggleVacationMode = () => {
    if (!isVacationMode) {
      if (window.confirm('Enable vacation mode? All upcoming bookings will be cancelled and no new bookings will be accepted.')) {
        setIsVacationMode(true);
      }
    } else {
      setIsVacationMode(false);
    }
  };

  // Toggle emergency pause
  const toggleEmergencyPause = () => {
    if (!isEmergencyPause) {
      if (window.confirm('Pause all bookings immediately? Current bookings will continue but no new bookings will be accepted.')) {
        setIsEmergencyPause(true);
      }
    } else {
      setIsEmergencyPause(false);
    }
  };

  // Slot Card Component
  const SlotCard = ({ slot }) => {
    const [showActions, setShowActions] = useState(false);

    return (
      <div className="bg-white rounded-lg border border-gray-200 shadow-xs hover:shadow-sm transition-all">
        <div className="p-3">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${getTypeColor(slot.type)}`}>
                {getTypeIcon(slot.type)}
                {slot.type}
              </span>
              {getStatusBadge(slot.status)}
            </div>
            
            <div className="relative">
              <button 
                onClick={() => setShowActions(!showActions)}
                className="p-1 hover:bg-gray-100 rounded text-gray-500"
              >
                <MoreVertical className="w-4 h-4" />
              </button>
              
              {showActions && (
                <div className="absolute right-0 top-6 bg-white border border-gray-200 rounded-lg shadow-lg z-10 w-36">
                  <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex items-center gap-2">
                    <Edit className="w-3 h-3" /> Edit
                  </button>
                  <button 
                    onClick={() => handleDeleteSlot(slot.id)}
                    className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                  >
                    <Trash2 className="w-3 h-3" /> Delete
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="font-medium text-gray-800">
                  {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                </span>
              </div>
              <span className="text-xs text-gray-500">
                {slot.day}
              </span>
            </div>
            
            <div className="flex items-center justify-between text-xs text-gray-600">
              <span>Capacity: {slot.booked}/{slot.maxBookings}</span>
              <span>{slot.duration || '1h'}</span>
            </div>
            
            {/* Progress bar for bookings */}
            <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden mt-1">
              <div 
                className="h-full bg-gradient-to-r from-orange-400 to-orange-500 rounded-full"
                style={{ width: `${(slot.booked / slot.maxBookings) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50/30">
      <VendorPageHeader 
        title="AVAILABILITY & SCHEDULE" 
        subtitle="Manage your consultation calendar" 
      />

      {/* Main Content */}
      <div className="space-y-4 p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {stats.map((stat, index) => (
            <div key={index} className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 
                                      p-3 rounded-lg border border-gray-200 shadow-xs">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-800">{stat.title}</p>
                  <div className="flex items-baseline gap-1.5 mt-0.5">
                    <p className="text-xl font-semibold text-gray-800">{stat.value}</p>
                    <span className="text-xs font-medium text-green-600">
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

        {/* Mode Toggles */}
        <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              {/* Vacation Mode */}
              <button
                onClick={toggleVacationMode}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all ${
                  isVacationMode
                    ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white'
                    : 'border border-gray-300 hover:border-yellow-400'
                }`}
              >
                {isVacationMode ? (
                  <>
                    <Unlock className="w-4 h-4" />
                    Vacation Mode ON
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    Vacation Mode
                  </>
                )}
              </button>

              {/* Emergency Pause (Mobile) */}
              <button
                onClick={toggleEmergencyPause}
                className={`sm:hidden flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all ${
                  isEmergencyPause
                    ? 'bg-gradient-to-r from-red-500 to-red-600 text-white'
                    : 'border border-red-500 text-red-600 hover:bg-red-50'
                }`}
              >
                {isEmergencyPause ? (
                  <>
                    <PlayCircle className="w-4 h-4" />
                    Resume
                  </>
                ) : (
                  <>
                    <PauseCircle className="w-4 h-4" />
                    Emergency Pause
                  </>
                )}
              </button>
            </div>

            {/* Auto Break Settings */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700">Auto-break:</span>
              <select
                value={autoBreak}
                onChange={(e) => setAutoBreak(parseInt(e.target.value))}
                className="px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-orange-500"
              >
                <option value="0">No break</option>
                <option value="5">5 mins</option>
                <option value="10">10 mins</option>
                <option value="15">15 mins</option>
                <option value="20">20 mins</option>
                <option value="30">30 mins</option>
              </select>
              <span className="text-sm text-gray-600">between sessions</span>
            </div>
          </div>

          {/* Warning Messages */}
          {isVacationMode && (
            <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-yellow-600" />
                <span className="text-sm text-yellow-700 font-medium">Vacation mode is ON</span>
              </div>
              <p className="text-xs text-yellow-600 mt-0.5">
                All upcoming bookings have been cancelled. No new bookings will be accepted until vacation mode is turned off.
              </p>
            </div>
          )}

          {isEmergencyPause && (
            <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600" />
                <span className="text-sm text-red-700 font-medium">Emergency pause is ON</span>
              </div>
              <p className="text-xs text-red-600 mt-0.5">
                No new bookings are being accepted. Current bookings will continue as scheduled.
              </p>
            </div>
          )}
        </div>

        {/* Calendar Navigation */}
        <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigateWeek(-1)}
                className="p-1.5 hover:bg-gray-100 rounded"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              <h2 className="font-semibold text-gray-800">
                Week of {currentWeek[0].date} - {currentWeek[6].date} {currentWeek[0].month}
              </h2>
              
              <button
                onClick={() => navigateWeek(1)}
                className="p-1.5 hover:bg-gray-100 rounded"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              
              <button
                onClick={goToToday}
                className="ml-2 px-2.5 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50"
              >
                Today
              </button>
            </div>
            
            <div className="flex items-center gap-1">
              <button
                onClick={() => setView('day')}
                className={`px-2.5 py-1 text-sm rounded ${
                  view === 'day' 
                    ? 'bg-gradient-to-r from-orange-400 to-orange-500 text-white' 
                    : 'border border-gray-300 hover:bg-gray-50'
                }`}
              >
                Day
              </button>
              <button
                onClick={() => setView('week')}
                className={`px-2.5 py-1 text-sm rounded ${
                  view === 'week' 
                    ? 'bg-gradient-to-r from-orange-400 to-orange-500 text-white' 
                    : 'border border-gray-300 hover:bg-gray-50'
                }`}
              >
                Week
              </button>
              <button
                onClick={() => setView('month')}
                className={`px-2.5 py-1 text-sm rounded ${
                  view === 'month' 
                    ? 'bg-gradient-to-r from-orange-400 to-orange-500 text-white' 
                    : 'border border-gray-300 hover:bg-gray-50'
                }`}
              >
                Month
              </button>
            </div>
          </div>

          {/* Week View */}
          {view === 'week' && (
            <div className="overflow-x-auto">
              <div className="min-w-[800px]">
                {/* Days Header */}
                <div className="grid grid-cols-8 border-b border-gray-200">
                  <div className="p-2 border-r border-gray-200"></div>
                  {currentWeek.map((day, index) => (
                    <div 
                      key={index} 
                      className={`p-2 border-r border-gray-200 text-center ${
                        day.day === 'Sun' || day.day === 'Sat' ? 'bg-gray-50' : ''
                      }`}
                    >
                      <div className="font-medium text-gray-800">{day.day}</div>
                      <div className={`text-sm ${
                        new Date().getDate() === day.date ? 
                        'text-orange-600 font-bold' : 'text-gray-600'
                      }`}>
                        {day.date}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Time Slots Grid */}
                <div className="relative">
                  {timeSlots.map((time, timeIndex) => (
                    <div key={timeIndex} className="grid grid-cols-8 border-b border-gray-200 min-h-[60px]">
                      <div className="p-2 border-r border-gray-200 text-xs text-gray-500">
                        {formatTime(time)}
                      </div>
                      
                      {currentWeek.map((day, dayIndex) => {
                        const slotsInCell = availabilitySlots.filter(slot => 
                          slot.day === day.day && 
                          slot.startTime === time
                        );
                        
                        return (
                          <div 
                            key={dayIndex} 
                            className="p-1 border-r border-gray-200 relative hover:bg-gray-50"
                          >
                            {slotsInCell.map(slot => (
                              <div 
                                key={slot.id}
                                className={`absolute left-1 right-1 p-1 rounded text-xs cursor-pointer ${
                                  slot.status === 'booked' 
                                    ? 'bg-red-100 border border-red-200' 
                                    : 'bg-green-100 border border-green-200'
                                }`}
                                style={{
                                  top: '4px',
                                  height: 'calc(60px - 8px)'
                                }}
                                onClick={() => setSelectedSlot(slot)}
                              >
                                <div className="flex items-center gap-1">
                                  {getTypeIcon(slot.type)}
                                  <span className="font-medium">{slot.type}</span>
                                </div>
                                <div className="text-xs truncate">
                                  {slot.booked}/{slot.maxBookings} booked
                                </div>
                              </div>
                            ))}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Day View */}
          {view === 'day' && (
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-800">Today's Schedule</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {availabilitySlots
                  .filter(slot => slot.day === daysOfWeek[new Date().getDay()])
                  .map(slot => (
                    <SlotCard key={slot.id} slot={slot} />
                  ))}
              </div>
            </div>
          )}
        </div>

        {/* Weekly Schedule Settings */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-xs">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-gray-800">Weekly Schedule</h2>
              <button
                onClick={() => setShowSettings(true)}
                className="flex items-center gap-1 text-sm text-orange-600 hover:text-orange-700"
              >
                <Settings className="w-4 h-4" />
                Edit Schedule
              </button>
            </div>
          </div>
          
          <div className="p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
              {weeklySchedule.map((day, index) => (
                <div 
                  key={index} 
                  className={`p-3 rounded-lg border ${
                    day.enabled 
                      ? 'border-orange-200 bg-orange-50' 
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-800">{day.day}</span>
                    <div className={`w-2 h-2 rounded-full ${
                      day.enabled ? 'bg-green-500' : 'bg-gray-400'
                    }`} />
                  </div>
                  
                  {day.enabled ? (
                    <>
                      <div className="text-sm text-gray-600 mb-1">
                        {day.startTime} - {day.endTime}
                      </div>
                      <div className="text-xs text-gray-500">
                        {day.slots} time slots
                      </div>
                    </>
                  ) : (
                    <div className="text-sm text-gray-500 italic">
                      Unavailable
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Slots */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Available Slots */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-xs">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-base font-semibold text-gray-800">Available Time Slots</h2>
              <p className="text-sm text-gray-600 mt-0.5">Click on any slot to edit</p>
            </div>
            
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {availabilitySlots
                  .filter(slot => slot.status === 'available')
                  .slice(0, 4)
                  .map(slot => (
                    <SlotCard key={slot.id} slot={slot} />
                  ))}
              </div>
              
              <button className="w-full mt-3 text-center text-sm text-orange-600 hover:text-orange-700 font-medium">
                View All Available Slots →
              </button>
            </div>
          </div>

          {/* Peak Hours & Settings */}
          <div className="space-y-4">
            {/* Peak Hours (Optional Future Feature) */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-xs p-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-base font-semibold text-gray-800">Peak Hour Pricing</h2>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={peakHourPricing}
                    onChange={() => setPeakHourPricing(!peakHourPricing)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                </label>
              </div>
              
              {peakHourPricing ? (
                <div className="space-y-2">
                  {peakHours.map((peak, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-yellow-50 rounded border border-yellow-200">
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-yellow-600" />
                        <span className="font-medium text-gray-800">{peak.label}</span>
                        <span className="text-sm text-gray-600">({peak.time})</span>
                      </div>
                      <span className="font-bold text-yellow-700">x{peak.multiplier}</span>
                    </div>
                  ))}
                  <p className="text-xs text-gray-500 mt-2">
                    * Peak hour pricing automatically applies during these hours
                  </p>
                </div>
              ) : (
                <div className="text-center py-4">
                  <Zap className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Enable peak hour pricing to charge more during busy hours</p>
                </div>
              )}
            </div>

            {/* Break Settings */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-xs p-4">
              <h2 className="text-base font-semibold text-gray-800 mb-3">Auto-Break Settings</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Coffee className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700">Break between sessions</span>
                  </div>
                  <span className="font-medium">{autoBreak} minutes</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Timer className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700">Session buffer time</span>
                  </div>
                  <span className="font-medium">5 minutes</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700">Max sessions per day</span>
                  </div>
                  <span className="font-medium">8 sessions</span>
                </div>
              </div>
              
              <button 
                onClick={() => setShowSettings(true)}
                className="w-full mt-3 px-3 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 text-sm"
              >
                Configure All Settings
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add Time Slot Modal */}
      {showAddSlot && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-3 sm:p-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-lg">
            <div className="p-4 sm:p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-800">Add Time Slot</h2>
                <button 
                  onClick={() => setShowAddSlot(false)}
                  className="p-1 hover:bg-gray-100 rounded text-gray-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                handleAddSlot({
                  day: formData.get('day'),
                  startTime: formData.get('startTime'),
                  endTime: formData.get('endTime'),
                  type: formData.get('type'),
                  maxBookings: parseInt(formData.get('maxBookings')),
                  status: 'available'
                });
              }} className="space-y-4">
                {/* Day Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Day of Week *
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {daysOfWeek.map(day => (
                      <label key={day} className="relative">
                        <input
                          type="radio"
                          name="day"
                          value={day}
                          required
                          className="sr-only peer"
                        />
                        <div className="p-2 border border-gray-300 rounded text-center cursor-pointer peer-checked:border-orange-500 peer-checked:bg-orange-50">
                          <span className="text-sm font-medium">{day}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Time Selection */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Time *
                    </label>
                    <select
                      name="startTime"
                      required
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-orange-500"
                    >
                      {timeSlots.map(time => (
                        <option key={time} value={time}>{formatTime(time)}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      End Time *
                    </label>
                    <select
                      name="endTime"
                      required
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-orange-500"
                    >
                      {timeSlots.map(time => (
                        <option key={time} value={time}>{formatTime(time)}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Consultation Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Consultation Type *
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <label className="relative">
                      <input
                        type="radio"
                        name="type"
                        value="home"
                        required
                        className="sr-only peer"
                      />
                      <div className="p-3 border border-gray-300 rounded text-center cursor-pointer peer-checked:border-orange-500 peer-checked:bg-orange-50">
                        <Home className="w-5 h-5 mx-auto mb-1 text-orange-600" />
                        <span className="text-sm font-medium">Home</span>
                      </div>
                    </label>
                    
                    <label className="relative">
                      <input
                        type="radio"
                        name="type"
                        value="online"
                        required
                        className="sr-only peer"
                      />
                      <div className="p-3 border border-gray-300 rounded text-center cursor-pointer peer-checked:border-orange-500 peer-checked:bg-orange-50">
                        <Globe className="w-5 h-5 mx-auto mb-1 text-blue-600" />
                        <span className="text-sm font-medium">Online</span>
                      </div>
                    </label>
                    
                    <label className="relative">
                      <input
                        type="radio"
                        name="type"
                        value="temple"
                        required
                        className="sr-only peer"
                      />
                      <div className="p-3 border border-gray-300 rounded text-center cursor-pointer peer-checked:border-orange-500 peer-checked:bg-orange-50">
                        <Building className="w-5 h-5 mx-auto mb-1 text-purple-600" />
                        <span className="text-sm font-medium">Temple</span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Capacity */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Maximum Bookings *
                  </label>
                  <select
                    name="maxBookings"
                    required
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-orange-500"
                  >
                    <option value="1">1 session</option>
                    <option value="2">2 sessions</option>
                    <option value="3">3 sessions</option>
                    <option value="4">4 sessions</option>
                    <option value="5">5 sessions</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">Maximum number of bookings allowed for this time slot</p>
                </div>

                {/* Auto-break reminder */}
                <div className="bg-gray-50 p-3 rounded border border-gray-200">
                  <div className="flex items-center gap-2">
                    <Timer className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-800">Auto-break reminder</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    {autoBreak > 0 
                      ? `A ${autoBreak} minute break will be automatically added after this session`
                      : 'No auto-break is currently configured'}
                  </p>
                </div>

                {/* Modal Actions */}
                <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 pt-4 border-t">
                  <button
                    type="button"
                    onClick={() => setShowAddSlot(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 text-sm w-full sm:w-auto"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded hover:from-orange-600 hover:to-orange-700 text-sm w-full sm:w-auto"
                  >
                    Add Time Slot
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-3 sm:p-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[85vh] overflow-y-auto">
            <div className="p-4 sm:p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-800">Schedule Settings</h2>
                <button 
                  onClick={() => setShowSettings(false)}
                  className="p-1 hover:bg-gray-100 rounded text-gray-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Working Hours */}
                <div>
                  <h3 className="text-base font-semibold text-gray-800 mb-3">Weekly Working Hours</h3>
                  <div className="space-y-3">
                    {weeklySchedule.map((day, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded border border-gray-200">
                        <div className="flex items-center gap-3">
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={day.enabled}
                              onChange={() => {}}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                          </label>
                          <span className="font-medium text-gray-800 min-w-[60px]">{day.day}</span>
                        </div>
                        
                        {day.enabled ? (
                          <div className="flex items-center gap-2">
                            <input
                              type="time"
                              defaultValue={day.startTime}
                              className="px-2 py-1 text-sm border border-gray-300 rounded"
                            />
                            <span className="text-gray-500">to</span>
                            <input
                              type="time"
                              defaultValue={day.endTime}
                              className="px-2 py-1 text-sm border border-gray-300 rounded"
                            />
                          </div>
                        ) : (
                          <span className="text-sm text-gray-500 italic">Day off</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Break Settings */}
                <div>
                  <h3 className="text-base font-semibold text-gray-800 mb-3">Break Settings</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Auto-break between sessions (minutes)
                      </label>
                      <select
                        value={autoBreak}
                        onChange={(e) => setAutoBreak(parseInt(e.target.value))}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-orange-500"
                      >
                        <option value="0">No break</option>
                        <option value="5">5 minutes</option>
                        <option value="10">10 minutes</option>
                        <option value="15">15 minutes</option>
                        <option value="20">20 minutes</option>
                        <option value="30">30 minutes</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Session buffer time (minutes)
                      </label>
                      <select
                        defaultValue="5"
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-orange-500"
                      >
                        <option value="0">No buffer</option>
                        <option value="5">5 minutes</option>
                        <option value="10">10 minutes</option>
                        <option value="15">15 minutes</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Session Limits */}
                <div>
                  <h3 className="text-base font-semibold text-gray-800 mb-3">Session Limits</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Max sessions per day
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="20"
                        defaultValue="8"
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-orange-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Max sessions per week
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="100"
                        defaultValue="40"
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-orange-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Peak Hour Pricing */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-base font-semibold text-gray-800">Peak Hour Pricing</h3>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={peakHourPricing}
                        onChange={() => setPeakHourPricing(!peakHourPricing)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                    </label>
                  </div>
                  
                  {peakHourPricing && (
                    <div className="space-y-3">
                      {peakHours.map((peak, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-yellow-50 rounded border border-yellow-200">
                          <div>
                            <div className="font-medium text-gray-800">{peak.label}</div>
                            <div className="text-sm text-gray-600">{peak.time}</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">Price multiplier:</span>
                            <input
                              type="number"
                              step="0.1"
                              min="1"
                              max="3"
                              defaultValue={peak.multiplier}
                              className="w-20 px-2 py-1 text-sm border border-gray-300 rounded"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Modal Actions */}
                <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 pt-4 border-t">
                  <button
                    onClick={() => setShowSettings(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 text-sm w-full sm:w-auto"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setShowSettings(false)}
                    className="px-4 py-2 bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded hover:from-orange-600 hover:to-orange-700 text-sm w-full sm:w-auto"
                  >
                    Save Settings
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AvailabilitySchedule;
