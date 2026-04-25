import React, { useState, useEffect } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  XCircle,
  CheckCircle,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Filter,
  Download,
  Shield,
  AlertCircle,
  Settings,
  UserPlus,
  Lock,
  Unlock,
  Plus,
  Minus,
  Smartphone,
  Monitor
} from 'lucide-react';
import VendorPageHeader from '../../../components/VendorPageHeader';

const AvailabilityCalendar = () => {
  const [viewMode, setViewMode] = useState('month'); // 'month', 'week', 'day'
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isMobileView, setIsMobileView] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [bufferTime, setBufferTime] = useState(30); // minutes
  const [travelTime, setTravelTime] = useState(15); // minutes
  
  // Check mobile view on resize
  useEffect(() => {
    const checkMobile = () => setIsMobileView(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Default to week view on mobile
  useEffect(() => {
    if (isMobileView && viewMode === 'month') {
      setViewMode('week');
    }
  }, [isMobileView, viewMode]);
  
  // Sample data for slots
  const sampleSlots = {
    '2024-01-15': [
      { time: '09:00-11:00', status: 'booked', type: 'Ganesh Puja', customer: 'Patel Ji' },
      { time: '14:00-16:00', status: 'available', type: 'available' },
      { time: '17:00-19:00', status: 'blocked', type: 'personal' }
    ],
    '2024-01-16': [
      { time: '10:00-12:00', status: 'booked', type: 'Satyanarayan Katha', customer: 'Sharma Family' },
      { time: '15:00-17:00', status: 'available', type: 'available' }
    ],
    '2024-01-17': [
      { time: '09:00-18:00', status: 'blocked', type: 'full-day', reason: 'Leave' }
    ],
    today: [
      { time: '11:30-13:30', status: 'booked', type: 'Havan', customer: 'Verma Ji' },
      { time: '15:00-17:00', status: 'available', type: 'available' },
      { time: '18:00-20:00', status: 'available', type: 'available' }
    ]
  };
  
  // Navigation functions
  const goToPrevious = () => {
    const newDate = new Date(currentDate);
    if (viewMode === 'month') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else if (viewMode === 'week') {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setDate(newDate.getDate() - 1);
    }
    setCurrentDate(newDate);
  };
  
  const goToNext = () => {
    const newDate = new Date(currentDate);
    if (viewMode === 'month') {
      newDate.setMonth(newDate.getMonth() + 1);
    } else if (viewMode === 'week') {
      newDate.setDate(newDate.getDate() + 7);
    } else {
      newDate.setDate(newDate.getDate() + 1);
    }
    setCurrentDate(newDate);
  };
  
  const goToToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(new Date());
  };
  
  // Get days in month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  // Format date
  const formatDate = (date) => {
    return date.toLocaleDateString('en-IN', {
      weekday: 'short',
      day: 'numeric',
      month: 'short'
    });
  };
  
  // Get status color
  const getStatusColor = (status) => {
    switch(status) {
      case 'available': return 'bg-green-50 text-green-700 border-green-200';
      case 'booked': return 'bg-red-50 text-red-700 border-red-200';
      case 'blocked': return 'bg-gray-100 text-gray-700 border-gray-300';
      default: return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };
  
  // Get status icon
  const getStatusIcon = (status) => {
    switch(status) {
      case 'available': return <CheckCircle className="w-4 h-4" />;
      case 'booked': return <XCircle className="w-4 h-4" />;
      case 'blocked': return <Lock className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };
  
  // Render month view
  const renderMonthView = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = new Date(year, month, 1).getDay();
    
    const days = [];
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    // Add weekday headers
    days.push(
      <div key="weekdays" className="grid grid-cols-7 gap-1 mb-2">
        {weekdays.map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-600 py-2">
            {day}
          </div>
        ))}
      </div>
    );
    
    // Add empty cells for days before first day
    const dayRows = [];
    let currentWeek = [];
    
    for (let i = 0; i < firstDay; i++) {
      currentWeek.push(<div key={`empty-${i}`} className="h-24"></div>);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const isToday = new Date().toDateString() === new Date(year, month, day).toDateString();
      const isSelected = selectedDate.toDateString() === new Date(year, month, day).toDateString();
      
      const daySlots = sampleSlots[dateStr] || [];
      
      currentWeek.push(
        <div
          key={day}
          className={`h-24 p-1 border rounded-lg cursor-pointer transition-colors ${
            isToday ? 'border-orange-300 bg-orange-50' : 
            isSelected ? 'border-blue-300 bg-blue-50' : 
            'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
          }`}
          onClick={() => setSelectedDate(new Date(year, month, day))}
        >
          <div className="flex justify-between items-start mb-1">
            <span className={`text-sm font-medium ${
              isToday ? 'text-orange-600' : 
              isSelected ? 'text-blue-600' : 
              'text-gray-700'
            }`}>
              {day}
            </span>
            {isToday && (
              <span className="px-1.5 py-0.5 bg-orange-100 text-orange-700 text-xs rounded">
                Today
              </span>
            )}
          </div>
          
          <div className="space-y-1 overflow-y-auto max-h-16">
            {daySlots.slice(0, 2).map((slot, idx) => (
              <div
                key={idx}
                className={`px-1.5 py-0.5 rounded text-xs flex items-center gap-1 ${getStatusColor(slot.status)}`}
              >
                {getStatusIcon(slot.status)}
                <span className="truncate">{slot.time.split('-')[0]}</span>
              </div>
            ))}
            {daySlots.length > 2 && (
              <div className="text-xs text-gray-500 text-center">
                +{daySlots.length - 2} more
              </div>
            )}
          </div>
        </div>
      );
      
      if (currentWeek.length === 7) {
        dayRows.push(
          <div key={`week-${day}`} className="grid grid-cols-7 gap-1">
            {currentWeek}
          </div>
        );
        currentWeek = [];
      }
    }
    
    // Add remaining days
    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push(<div key={`empty-end-${currentWeek.length}`} className="h-24"></div>);
      }
      dayRows.push(
        <div key="last-week" className="grid grid-cols-7 gap-1">
          {currentWeek}
        </div>
      );
    }
    
    return [...days, ...dayRows];
  };
  
  // Render week view
  const renderWeekView = () => {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    
    const days = [];
    
    // Add weekday headers
    days.push(
      <div key="weekdays" className="grid grid-cols-7 gap-1 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, idx) => {
          const dayDate = new Date(startOfWeek);
          dayDate.setDate(startOfWeek.getDate() + idx);
          const isToday = new Date().toDateString() === dayDate.toDateString();
          const isSelected = selectedDate.toDateString() === dayDate.toDateString();
          
          return (
            <div
              key={day}
              className={`text-center py-2 rounded-lg cursor-pointer transition-colors ${
                isToday ? 'bg-orange-100 text-orange-700' :
                isSelected ? 'bg-blue-100 text-blue-700' :
                'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setSelectedDate(dayDate)}
            >
              <div className="text-xs text-gray-600">{day}</div>
              <div className="text-[15px] font-medium">{dayDate.getDate()}</div>
            </div>
          );
        })}
      </div>
    );
    
    // Time slots for selected day in week view
    const selectedDaySlots = sampleSlots.today || [];
    
    days.push(
      <div key="timeslots" className="mt-4">
        <h4 className="text-[15px] font-semibold text-gray-800 mb-3">
          Slots for {formatDate(selectedDate)}
        </h4>
        <div className="space-y-2">
          {selectedDaySlots.map((slot, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-lg border flex items-center justify-between ${getStatusColor(slot.status)}`}
            >
              <div className="flex items-center gap-3">
                {getStatusIcon(slot.status)}
                <div>
                  <div className="text-sm font-medium">{slot.time}</div>
                  <div className="text-xs text-gray-600">
                    {slot.type === 'available' ? 'Available Slot' : 
                     slot.type === 'booked' ? slot.type : 
                     slot.reason || 'Blocked'}
                  </div>
                </div>
              </div>
              <button className="p-1 hover:bg-white/50 rounded">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    );
    
    return days;
  };
  
  // Render day view (mobile optimized)
  const renderDayView = () => {
    const daySlots = sampleSlots.today || [];
    
    return (
      <div className="space-y-3">
        <div className="text-center py-3">
          <div className="text-[15px] font-medium text-gray-800">
            {selectedDate.toLocaleDateString('en-IN', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
          </div>
          <div className="text-sm text-gray-600">
            {selectedDate.toDateString() === new Date().toDateString() ? 'Today' : ''}
          </div>
        </div>
        
        <div className="space-y-2">
          {daySlots.map((slot, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-lg border ${getStatusColor(slot.status)}`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getStatusIcon(slot.status)}
                  <span className="text-sm font-medium">{slot.time}</span>
                </div>
                <div className="text-xs px-2 py-0.5 rounded bg-white/50">
                  {slot.status.toUpperCase()}
                </div>
              </div>
              
              {slot.type === 'booked' && (
                <div className="text-sm text-gray-700 mb-1">
                  {slot.type} • {slot.customer}
                </div>
              )}
              
              {slot.reason && (
                <div className="text-xs text-gray-600">{slot.reason}</div>
              )}
              
              <div className="flex gap-2 mt-3">
                {slot.status === 'available' && (
                  <button className="flex-1 px-2 py-1 text-xs bg-white text-gray-700 rounded border hover:bg-gray-50">
                    Block
                  </button>
                )}
                <button className="flex-1 px-2 py-1 text-xs bg-gray-50 text-gray-700 rounded border hover:bg-gray-100">
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Quick add slot */}
        <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Add New Slot</span>
            <Plus className="w-4 h-4 text-gray-600" />
          </div>
          <div className="flex gap-2">
            <input
              type="time"
              className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded"
              defaultValue="09:00"
            />
            <input
              type="time"
              className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded"
              defaultValue="11:00"
            />
            <button className="px-3 py-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm rounded hover:from-orange-600 hover:to-orange-700">
              Add
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  // Render selected date details
  const renderSelectedDateDetails = () => {
    const dateStr = selectedDate.toISOString().split('T')[0];
    const slots = sampleSlots[dateStr] || sampleSlots.today || [];
    
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-3">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[15px] font-bold text-gray-800">
            {formatDate(selectedDate)}
            {selectedDate.toDateString() === new Date().toDateString() && (
              <span className="ml-2 px-2 py-0.5 bg-orange-100 text-orange-700 text-xs rounded">
                Today
              </span>
            )}
          </h3>
          <button className="px-2.5 py-1.5 text-sm bg-white text-gray-800 rounded border border-gray-300 hover:bg-gray-50 flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Slot
          </button>
        </div>
        
        <div className="space-y-2 mb-4">
          {slots.map((slot, idx) => (
            <div
              key={idx}
              className={`p-2 rounded border flex items-center justify-between ${getStatusColor(slot.status)}`}
            >
              <div className="flex items-center gap-2">
                {getStatusIcon(slot.status)}
                <div>
                  <div className="text-sm font-medium">{slot.time}</div>
                  <div className="text-xs text-gray-600">
                    {slot.type === 'available' ? 'Available for booking' : 
                     slot.type === 'booked' ? `Booked: ${slot.type}` : 
                     slot.reason || 'Blocked'}
                  </div>
                </div>
              </div>
              <button className="p-1 hover:bg-white/50 rounded">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          ))}
          
          {slots.length === 0 && (
            <div className="text-center py-4 text-gray-500">
              No slots scheduled for this day
            </div>
          )}
        </div>
        
        {/* Quick actions */}
        <div className="flex gap-2">
          <button className="flex-1 px-2.5 py-1.5 text-sm bg-red-50 text-red-700 rounded border border-red-200 hover:bg-red-100 flex items-center justify-center gap-2">
            <Lock className="w-4 h-4" />
            Block Day
          </button>
          <button className="flex-1 px-2.5 py-1.5 text-sm bg-green-50 text-green-700 rounded border border-green-200 hover:bg-green-100 flex items-center justify-center gap-2">
            <Unlock className="w-4 h-4" />
            Mark Available
          </button>
        </div>
      </div>
    );
  };
  
  // Render mobile day list view
  const renderMobileDayListView = () => {
    const days = [];
    const today = new Date();
    
    for (let i = -1; i < 6; i++) {
      const day = new Date(today);
      day.setDate(today.getDate() + i);
      const dateStr = day.toISOString().split('T')[0];
      const daySlots = sampleSlots[dateStr] || (i === 0 ? sampleSlots.today : []);
      
      const bookedCount = daySlots.filter(s => s.status === 'booked').length;
      const availableCount = daySlots.filter(s => s.status === 'available').length;
      const blockedCount = daySlots.filter(s => s.status === 'blocked').length;
      
      const isToday = i === 0;
      const isSelected = selectedDate.toDateString() === day.toDateString();
      
      days.push(
        <div
          key={i}
          className={`p-3 rounded-lg border cursor-pointer transition-colors ${
            isToday ? 'border-orange-300 bg-orange-50' :
            isSelected ? 'border-blue-300 bg-blue-50' :
            'border-gray-200 hover:border-gray-300'
          }`}
          onClick={() => setSelectedDate(day)}
        >
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="text-sm font-medium text-gray-800">
                {formatDate(day)}
              </div>
              <div className="text-xs text-gray-600">
                {day.toLocaleDateString('en-IN', { weekday: 'long' })}
              </div>
            </div>
            
            {isToday && (
              <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-xs rounded">
                Today
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-3 text-xs">
            {bookedCount > 0 && (
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-gray-700">{bookedCount} booked</span>
              </div>
            )}
            {availableCount > 0 && (
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">{availableCount} available</span>
              </div>
            )}
            {blockedCount > 0 && (
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                <span className="text-gray-700">{blockedCount} blocked</span>
              </div>
            )}
            {daySlots.length === 0 && (
              <span className="text-gray-500">No slots</span>
            )}
          </div>
        </div>
      );
    }
    
    return days;
  };
  
  return (
    <div className="min-h-screen bg-gray-50/30">
      <VendorPageHeader 
        title="AVAILABILITY CALENDAR" 
        subtitle="Manage your time slots and prevent double bookings" 
      />
      {/* Main Content - आपके spacing guidelines के according */}
      <div className="space-y-4 px-6 pb-6 pt-2">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-end items-start sm:items-center gap-3">
          
          
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 text-sm bg-white text-gray-800 rounded-lg border border-gray-300 hover:bg-gray-50 flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </button>
            <button 
              onClick={() => setShowSettings(!showSettings)}
              className="px-3 py-1.5 text-sm bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 flex items-center gap-2"
            >
              <Settings className="w-4 h-4" />
              Settings
            </button>
          </div>
        </div>
        
        {/* View Mode Selector */}
        <div className="bg-white rounded-lg border border-gray-300 p-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('month')}
                className={`px-3 py-1.5 text-sm rounded-lg border ${
                  viewMode === 'month'
                    ? 'bg-orange-50 text-orange-600 border-orange-300'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                <CalendarDays className="w-4 h-4 inline mr-2" />
                Month
              </button>
              <button
                onClick={() => setViewMode('week')}
                className={`px-3 py-1.5 text-sm rounded-lg border ${
                  viewMode === 'week'
                    ? 'bg-orange-50 text-orange-600 border-orange-300'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                <CalendarIcon className="w-4 h-4 inline mr-2" />
                Week
              </button>
              <button
                onClick={() => setViewMode('day')}
                className={`px-3 py-1.5 text-sm rounded-lg border ${
                  viewMode === 'day'
                    ? 'bg-orange-50 text-orange-600 border-orange-300'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                <Clock className="w-4 h-4 inline mr-2" />
                Day
              </button>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={goToPrevious}
                className="p-1.5 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={goToToday}
                className="px-3 py-1.5 text-sm bg-gray-100 text-gray-800 rounded-lg border border-gray-300 hover:bg-gray-200"
              >
                Today
              </button>
              <div className="text-[15px] font-medium text-gray-800 min-w-[180px] text-center">
                {currentDate.toLocaleDateString('en-IN', {
                  month: 'long',
                  year: 'numeric'
                })}
              </div>
              <button
                onClick={goToNext}
                className="p-1.5 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Settings Panel */}
        {showSettings && (
          <div className="bg-white rounded-lg border border-gray-300 p-3">
            <h3 className="text-[15px] font-bold text-gray-800 mb-3">Smart Settings</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Buffer Time Between Bookings
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setBufferTime(Math.max(0, bufferTime - 15))}
                    className="p-1.5 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <div className="text-center flex-1">
                    <div className="text-xl font-bold text-gray-800">{bufferTime} min</div>
                    <div className="text-xs text-gray-600">Gap between bookings</div>
                  </div>
                  <button
                    onClick={() => setBufferTime(bufferTime + 15)}
                    className="p-1.5 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Travel Time Consideration
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setTravelTime(Math.max(0, travelTime - 5))}
                    className="p-1.5 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <div className="text-center flex-1">
                    <div className="text-xl font-bold text-gray-800">{travelTime} min</div>
                    <div className="text-xs text-gray-600">Between locations</div>
                  </div>
                  <button
                    onClick={() => setTravelTime(travelTime + 5)}
                    className="p-1.5 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="mt-4 flex flex-wrap gap-2">
              <button className="px-3 py-1.5 text-sm bg-green-50 text-green-700 rounded border border-green-200 hover:bg-green-100 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Auto-block after booking
              </button>
              <button className="px-3 py-1.5 text-sm bg-blue-50 text-blue-600 rounded border border-blue-200 hover:bg-blue-100 flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Smart time allocation
              </button>
              <button className="px-3 py-1.5 text-sm bg-purple-50 text-purple-600 rounded border border-purple-200 hover:bg-purple-100 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Location-based blocking
              </button>
            </div>
          </div>
        )}
        
        {/* Main Calendar Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Calendar View */}
          <div className={`lg:col-span-2 ${isMobileView && viewMode === 'day' ? '' : 'bg-white rounded-lg border border-gray-200 p-3'}`}>
            {isMobileView ? (
              // Mobile Optimized View
              viewMode === 'day' ? (
                renderDayView()
              ) : (
                <div className="space-y-3">
                  <div className="sticky top-0 bg-white z-10 pb-2">
                    {renderMobileDayListView()}
                  </div>
                  {selectedDate.toDateString() === new Date().toDateString() && (
                    <div className="space-y-2">
                      {sampleSlots.today.map((slot, idx) => (
                        <div
                          key={idx}
                          className={`p-3 rounded-lg border ${getStatusColor(slot.status)}`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {getStatusIcon(slot.status)}
                              <div>
                                <div className="text-sm font-medium">{slot.time}</div>
                                <div className="text-xs text-gray-600">
                                  {slot.type === 'available' ? 'Available' : 
                                   slot.type === 'booked' ? slot.type : 
                                   'Blocked'}
                                </div>
                              </div>
                            </div>
                            <button className="p-1 hover:bg-white/50 rounded">
                              <MoreVertical className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            ) : viewMode === 'month' ? (
              // Desktop Month View
              <div className="space-y-2">
                {renderMonthView()}
              </div>
            ) : viewMode === 'week' ? (
              // Desktop Week View
              <div className="space-y-2">
                {renderWeekView()}
              </div>
            ) : (
              // Desktop Day View
              renderDayView()
            )}
          </div>
          
          {/* Side Panel - Selected Date Details */}
          {!isMobileView && (
            <div className="space-y-4">
              {renderSelectedDateDetails()}
              
              {/* Legend */}
              <div className="bg-white rounded-lg border border-gray-200 p-3">
                <h4 className="text-[15px] font-bold text-gray-800 mb-3">Legend</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded"></div>
                    <span className="text-sm text-gray-700">Available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded"></div>
                    <span className="text-sm text-gray-700">Booked</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gray-400 rounded"></div>
                    <span className="text-sm text-gray-700">Blocked</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-orange-500 rounded"></div>
                    <span className="text-sm text-gray-700">Today</span>
                  </div>
                </div>
              </div>
              
              {/* Quick Actions */}
              <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg border border-orange-200 p-3">
                <h4 className="text-[15px] font-bold text-gray-800 mb-3">Quick Actions</h4>
                <div className="space-y-2">
                  <button className="w-full px-3 py-2 text-sm bg-white text-gray-800 rounded-lg border border-gray-300 hover:bg-gray-50 flex items-center justify-between">
                    <span>Block Next Weekend</span>
                    <Lock className="w-4 h-4" />
                  </button>
                  <button className="w-full px-3 py-2 text-sm bg-white text-gray-800 rounded-lg border border-gray-300 hover:bg-gray-50 flex items-center justify-between">
                    <span>Set Weekly Hours</span>
                    <Clock className="w-4 h-4" />
                  </button>
                  <button className="w-full px-3 py-2 text-sm bg-white text-gray-800 rounded-lg border border-gray-300 hover:bg-gray-50 flex items-center justify-between">
                    <span>Import Holidays</span>
                    <CalendarIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Mobile View Toggle */}
        <div className="bg-white rounded-lg border border-gray-200 p-3 lg:hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Mobile View</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('day')}
                className={`px-3 py-1 text-xs rounded border ${
                  viewMode === 'day'
                    ? 'bg-orange-50 text-orange-600 border-orange-300'
                    : 'bg-gray-100 text-gray-700 border-gray-300'
                }`}
              >
                Day
              </button>
              <button
                onClick={() => setViewMode('week')}
                className={`px-3 py-1 text-xs rounded border ${
                  viewMode === 'week'
                    ? 'bg-orange-50 text-orange-600 border-orange-300'
                    : 'bg-gray-100 text-gray-700 border-gray-300'
                }`}
              >
                Week
              </button>
            </div>
          </div>
        </div>
        
        {/* Stats Summary */}
        <div className="bg-white rounded-lg border border-gray-200 p-3">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <div className="text-center p-2">
              <div className="text-xl font-bold text-gray-800">4</div>
              <div className="text-sm text-gray-600">Today's Slots</div>
            </div>
            <div className="text-center p-2">
              <div className="text-xl font-bold text-green-700">12</div>
              <div className="text-sm text-gray-600">Available This Week</div>
            </div>
            <div className="text-center p-2">
              <div className="text-xl font-bold text-red-700">8</div>
              <div className="text-sm text-gray-600">Booked This Month</div>
            </div>
            <div className="text-center p-2">
              <div className="text-xl font-bold text-gray-700">3</div>
              <div className="text-sm text-gray-600">Blocked Days</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityCalendar;