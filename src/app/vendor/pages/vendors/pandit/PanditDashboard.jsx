import React, { useState, useEffect } from 'react';
import { 
  CalendarDays, 
  Clock, 
  Wallet, 
  TrendingUp, 
  MapPin, 
  ChevronRight,
  Bell,
  Shield,
  Download,
  AlertCircle,
  CheckCircle2,
  MoreVertical,
  Navigation,
  Phone,
  Users,
  FileText
} from 'lucide-react';

import VendorPageHeader from '../../../components/VendorPageHeader';

const PanditDashboard = () => {
  const [timeLeft, setTimeLeft] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [pujas, setPujas] = useState([]);
  
  // Sample Data - आपके guidelines के according
  const dashboardData = {
    todayPujaCount: 4,
    upcomingBookings: 12,
    todaysEarnings: 12500,
    walletBalance: 32500,
    nextPuja: {
      name: "Satyanarayan Katha",
      time: "11:30 AM",
      location: "Sector 45, Noida",
      clientName: "Sharma Family",
      startsIn: 45,
      status: "confirmed",
      pujaId: "PUJA-001",
      phone: "+91 98765 43210",
      address: "H-45, Sector 45, Noida, UP 201301"
    },
    todayPujas: [
      { 
        id: 1, 
        name: "Ganesh Puja", 
        time: "9:00 AM", 
        status: "completed", 
        client: "Patel Ji",
        address: "Sector 62, Noida",
        amount: 2500,
        phone: "+91 98765 43211"
      },
      { 
        id: 2, 
        name: "Griha Pravesh", 
        time: "11:30 AM", 
        status: "ongoing", 
        client: "Sharma Family",
        address: "Sector 45, Noida",
        amount: 3500,
        phone: "+91 98765 43210"
      },
      { 
        id: 3, 
        name: "Havan", 
        time: "2:00 PM", 
        status: "upcoming", 
        client: "Verma Ji",
        address: "Sector 128, Noida",
        amount: 3000,
        phone: "+91 98765 43212"
      }
    ]
  };

  // Initialize pujas
  useEffect(() => {
    setPujas(dashboardData.todayPujas);
  }, []);

  // Countdown Timer
  useEffect(() => {
    const updateTimer = () => {
      const minutes = dashboardData.nextPuja.startsIn;
      if (minutes <= 0) {
        setTimeLeft("Started");
        return;
      }
      
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      
      if (hours > 0) {
        setTimeLeft(`${hours}h ${mins}m`);
      } else {
        setTimeLeft(`${mins} min`);
      }
    };
    
    updateTimer();
    const interval = setInterval(updateTimer, 60000);
    
    return () => clearInterval(interval);
  }, []);

  // Format currency - Indian format
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Status styling - आपके guidelines के according
  const getStatusStyles = (status) => {
    const base = "px-2 py-0.5 rounded-full text-sm font-medium";
    switch(status) {
      case 'completed': 
        return `${base} bg-green-50 text-green-700`;
      case 'ongoing': 
        return `${base} bg-blue-50 text-blue-600`;
      case 'upcoming': 
        return `${base} bg-orange-50 text-orange-500`;
      default: 
        return `${base} bg-gray-50 text-gray-600`;
    }
  };

  // Status icon - w-4 h-4 (your guideline)
  const getStatusIcon = (status) => {
    switch(status) {
      case 'completed': return <CheckCircle2 className="w-4 h-4" />;
      case 'ongoing': return <Clock className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  // Handle button clicks
  const handleAction = (action, pujaId = null) => {
    setIsLoading(true);
    
    switch(action) {
      case 'call':
        const phone = pujaId 
          ? pujas.find(p => p.id === pujaId)?.phone 
          : dashboardData.nextPuja.phone;
        window.open(`tel:${phone}`, '_blank');
        break;
        
      case 'directions':
        const address = pujaId 
          ? pujas.find(p => p.id === pujaId)?.address 
          : dashboardData.nextPuja.address;
        window.open(`https://maps.google.com/?q=${encodeURIComponent(address)}`, '_blank');
        break;
        
      case 'complete':
        setPujas(prev => prev.map(p => 
          p.id === pujaId ? { ...p, status: 'completed' } : p
        ));
        break;
        
      case 'viewBookings':
        // Navigate to bookings page
        console.log('Navigate to bookings page');
        window.location.href = '/bookings';
        break;
        
      case 'withdraw':
        // Navigate to wallet page
        console.log('Navigate to wallet page');
        window.location.href = '/wallet';
        break;
        
      case 'viewToday':
        // Navigate to today's bookings
        console.log('Navigate to today\'s bookings');
        window.location.href = '/bookings?filter=today';
        break;
        
      case 'blockSlot':
        // Navigate to calendar page
        console.log('Navigate to calendar page');
        window.location.href = '/calendar';
        break;
        
      case 'setAvailability':
        // Navigate to settings page
        console.log('Navigate to settings page');
        window.location.href = '/settings';
        break;
        
      case 'addPuja':
        // Navigate to add puja page
        console.log('Navigate to add puja page');
        window.location.href = '/bookings/add';
        break;
        
      case 'downloadReport':
        // Generate and download report
        const reportData = {
          date: new Date().toLocaleDateString('en-IN'),
          pujas: pujas,
          earnings: dashboardData.todaysEarnings,
          nextPuja: dashboardData.nextPuja
        };
        const dataStr = JSON.stringify(reportData, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        const exportFileDefaultName = `puja-report-${new Date().toISOString().split('T')[0]}.json`;
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
        break;
        
      case 'callSupport':
        window.open('tel:+919876543210', '_blank');
        break;
        
      case 'viewPujaDetails':
        // View puja details
        console.log('View puja details for ID:', pujaId);
        window.location.href = `/pujas/${pujaId}`;
        break;
    }
    
    setTimeout(() => setIsLoading(false), 500);
  };

  return (
    <div className="min-h-screen bg-gray-50/30">
      <VendorPageHeader 
        title="ACHARYA DASHBOARD" 
        subtitle="Manage your daily pujas and bookings" 
      />
     
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm text-gray-700">Processing...</p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="space-y-4  p-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg p-3 border border-orange-200">
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
                <p className="text-sm text-gray-600">Next Puja In</p>
                <p className="text-[15px] font-semibold text-orange-500">{timeLeft}</p>
              </div>
              <div className="w-8 h-8 bg-orange-50 rounded flex items-center justify-center">
                <Clock className="w-5 h-5 text-orange-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards Grid - आपके exact measurements */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {/* Today's Puja Count */}
          <div className="bg-white rounded-lg border border-gray-200 p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Today's Puja</p>
                <p className="text-xl font-semibold text-gray-800 mt-1">{dashboardData.todayPujaCount}</p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="w-3 h-3 text-green-700" />
                  <span className="text-sm text-green-700">+2</span>
                </div>
              </div>
              <div className="p-2 bg-orange-50 rounded">
                <CalendarDays className="w-5 h-5 text-orange-500" />
              </div>
            </div>
          </div>

          {/* Upcoming Bookings */}
          <div className="bg-white rounded-lg border border-gray-200 p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Upcoming (7 days)</p>
                <p className="text-xl font-semibold text-gray-800 mt-1">{dashboardData.upcomingBookings}</p>
                <p className="text-sm text-gray-500 mt-2">12 families</p>
              </div>
              <div className="p-2 bg-blue-50 rounded">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Today's Earnings */}
          <div className="bg-white rounded-lg border border-gray-200 p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Today's Earnings</p>
                <p className="text-xl font-semibold text-gray-800 mt-1">
                  {formatCurrency(dashboardData.todaysEarnings)}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="w-3 h-3 text-green-700" />
                  <span className="text-sm text-green-700">+₹2,500</span>
                </div>
              </div>
              <div className="p-2 bg-green-50 rounded">
                <TrendingUp className="w-5 h-5 text-green-700" />
              </div>
            </div>
          </div>

          {/* Wallet Balance */}
          <div className="bg-white rounded-lg border border-gray-200 p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Wallet Balance</p>
                <p className="text-xl font-semibold text-gray-800 mt-1">
                  {formatCurrency(dashboardData.walletBalance)}
                </p>
                <button 
                  onClick={() => handleAction('withdraw')}
                  className="text-sm text-orange-500 font-medium mt-2 hover:text-orange-600"
                >
                  Withdraw →
                </button>
              </div>
              <div className="p-2 bg-purple-50 rounded">
                <Wallet className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left Column - Next Puja */}
          <div className="lg:col-span-2 space-y-4">
            {/* Next Puja Card */}
            <div className="bg-white rounded-lg border border-gray-300 overflow-hidden">
              <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded flex items-center justify-center">
                      <CalendarDays className="w-5 h-5 text-gray-800" />
                    </div>
                    <div>
                      <h3 className="text-[15px] font-bold text-gray-800">Next Puja</h3>
                      <p className="text-sm text-gray-600">Starts in {timeLeft}</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 bg-gray-100 backdrop-blur-sm rounded-full text-sm text-gray-800">
                    #{dashboardData.nextPuja.pujaId}
                  </span>
                </div>
              </div>

              <div className="p-3 space-y-3">
                <div>
                  <h4 className="text-[15px] font-bold text-gray-800 mb-2">
                    {dashboardData.nextPuja.name}
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[14px] text-gray-700">
                      <Clock className="w-4 h-4" />
                      <span>{dashboardData.nextPuja.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[14px] text-gray-700">
                      <MapPin className="w-4 h-4" />
                      <span>{dashboardData.nextPuja.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[14px] text-gray-700">
                      <Users className="w-4 h-4" />
                      <span>{dashboardData.nextPuja.clientName}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons - आपके button sizing guidelines */}
                <div className="flex flex-col sm:flex-row gap-2 pt-3 border-t border-gray-200">
                  <button 
                    onClick={() => handleAction('directions')}
                    className="flex-1 px-3 py-2 bg-gray-50 text-gray-800 text-sm font-medium rounded border border-gray-300 hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
                  >
                    <Navigation className="w-4 h-4" />
                    Directions
                  </button>
                  <button 
                    onClick={() => handleAction('call')}
                    className="flex-1 px-3 py-2 bg-gradient-to-r from-orange-300 to-orange-300 text-gray-800 hover:text-white text-sm font-medium rounded hover:from-orange-600 hover:to-orange-700 transition-all flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    Call Client
                  </button>
                  <button 
                    onClick={() => handleAction('viewPujaDetails')}
                    className="flex-1 px-3 py-2 bg-white text-orange-500 text-sm font-medium rounded border border-orange-300 hover:bg-orange-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <FileText className="w-4 h-4" />
                    Details
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Actions - आपके spacing guidelines */}
            <div>
              <h3 className="text-[15px] font-bold text-gray-800 mb-3">Quick Actions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button 
                  onClick={() => handleAction('viewToday')}
                  className="bg-white rounded-lg p-3 border border-gray-200 hover:border-orange-300 hover:bg-gray-50 transition-all group text-left"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-orange-50 rounded">
                        <CalendarDays className="w-5 h-5 text-orange-500" />
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-800 block">View Today's Puja</span>
                        <span className="text-xs text-gray-600">See all {dashboardData.todayPujaCount} pujas</span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-orange-500" />
                  </div>
                </button>

                <button 
                  onClick={() => handleAction('blockSlot')}
                  className="bg-white rounded-lg p-3 border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all group text-left"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-blue-50 rounded">
                        <Shield className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-800 block">Block Time Slot</span>
                        <span className="text-xs text-gray-600">Mark unavailable time</span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
                  </div>
                </button>

                <button 
                  onClick={() => handleAction('withdraw')}
                  className="bg-white rounded-lg p-3 border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-all group text-left"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-green-50 rounded">
                        <Download className="w-5 h-5 text-green-700" />
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-800 block">Withdraw Earnings</span>
                        <span className="text-xs text-gray-600">Available: {formatCurrency(dashboardData.walletBalance)}</span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-green-700" />
                  </div>
                </button>

                <button 
                  onClick={() => handleAction('setAvailability')}
                  className="bg-white rounded-lg p-3 border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all group text-left"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-purple-50 rounded">
                        <Bell className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-800 block">Set Availability</span>
                        <span className="text-xs text-gray-600">Update working hours</span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600" />
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Today's Schedule */}
          <div className="space-y-4">
            {/* Today's Puja List - Table-like structure */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="p-3 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-[15px] font-bold text-gray-800">Today's Schedule</h3>
                  <span className="text-sm text-gray-600">{dashboardData.todayPujaCount} pujas</span>
                </div>
              </div>

              <div className="divide-y divide-gray-200">
                {pujas.map((puja) => (
                  <div key={puja.id} className="p-3 hover:bg-gray-50 transition-colors">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-[14px] font-semibold text-gray-800">{puja.name}</h4>
                            <span className={getStatusStyles(puja.status)}>
                              {getStatusIcon(puja.status)}
                              <span className="hidden xs:inline ml-1">{puja.status}</span>
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">{puja.client}</p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className="text-sm text-gray-700 flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {puja.time}
                              </span>
                              <span className="text-sm text-gray-700">
                                {formatCurrency(puja.amount)}
                              </span>
                            </div>
                            <button 
                              onClick={() => handleAction('viewPujaDetails', puja.id)}
                              className="p-1 hover:bg-gray-100 rounded"
                            >
                              <MoreVertical className="w-5 h-5 text-gray-500" />
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      {puja.status === 'ongoing' && (
                        <div className="flex gap-2 pt-2">
                          <button 
                            onClick={() => handleAction('complete', puja.id)}
                            className="flex-1 px-2.5 py-1.5 bg-green-50 text-green-700 text-sm font-medium rounded border border-green-300 hover:bg-green-100"
                          >
                            Complete
                          </button>
                          <button 
                            onClick={() => handleAction('directions', puja.id)}
                            className="flex-1 px-2.5 py-1.5 bg-blue-50 text-blue-600 text-sm font-medium rounded border border-blue-300 hover:bg-blue-100"
                          >
                            Navigate
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 border-t border-gray-200">
                <button 
                  onClick={() => handleAction('viewBookings')}
                  className="w-full px-3 py-2 text-orange-500 text-sm font-medium rounded border border-orange-300 hover:bg-orange-50 transition-colors"
                >
                  View All Bookings
                </button>
              </div>
            </div>

            {/* Quick Tip Card */}
            <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg p-3 border border-orange-200">
              <div className="flex items-start gap-2">
                <div className="p-1.5 bg-orange-50 rounded">
                  <Bell className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-800 mb-1">Reminder</h4>
                  <p className="text-xs text-gray-700">
                    Prepare puja samagri 30 minutes before. Check traffic for your next booking.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Additional Info */}
        <div className="bg-white rounded-lg border border-gray-200 p-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-center sm:text-left">
              <p className="text-sm text-gray-600">Need help with your bookings?</p>
              <p className="text-[14px] text-gray-800">Call support: +91 98765 43210</p>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => handleAction('downloadReport')}
                className="px-3 py-1.5 text-sm bg-gray-100 text-gray-800 rounded border border-gray-300 hover:bg-gray-200"
              >
                Download Report
              </button>
              <button 
                onClick={() => handleAction('addPuja')}
                className="px-3 py-1.5 text-sm bg-gradient-to-r from-orange-300 to-orange-300 text-gray-800 hover:text-white rounded hover:from-orange-500 hover:to-orange-600"
              >
                Add New Puja
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PanditDashboard;
