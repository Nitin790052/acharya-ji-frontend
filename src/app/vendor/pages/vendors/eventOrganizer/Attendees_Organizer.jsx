import React, { useState } from 'react';
import {
  // Core Icons
  Users,
  Ticket,
  IndianRupee,
  CalendarDays,
  Clock,
  MapPin,
  Bell,
  Filter,
  Search,
  ChevronRight,
  Download,
  Eye,
  CheckCircle2,
  AlertCircle,
  XCircle,
  RefreshCw,
  UserCircle,
  Phone,
  Mail,
  FileText,
  CreditCard,
  QrCode,
  ScanLine,
  Printer,
  BadgeCheck,
  UserCheck,
  UserX,
  Camera,
  Smartphone,
  Wifi,
  Settings,
  X,
  Check,
  Ban,
  RotateCcw,
  Printer as PrinterIcon,
  Award
} from 'lucide-react';

import VendorPageHeader from '../../../components/VendorPageHeader';

const Attendees_Organizer = () => {
  const [filter, setFilter] = useState('all');
  const [eventFilter, setEventFilter] = useState('EVT-001');
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showQrModal, setShowQrModal] = useState(false);
  const [showScannerModal, setShowScannerModal] = useState(false);
  const [showBadgeModal, setShowBadgeModal] = useState(false);
  const [selectedAttendee, setSelectedAttendee] = useState(null);
  const [scanMode, setScanMode] = useState(false);

  // ============ EVENTS LIST ============
  const events = [
    { id: 'EVT-001', name: 'Mahashivratri Celebration', date: '26 Feb 2026', total: 345, checkedIn: 156 },
    { id: 'EVT-002', name: 'Ram Navami', date: '06 Apr 2026', total: 245, checkedIn: 0 },
    { id: 'EVT-003', name: 'Hanuman Jayanti', date: '12 Apr 2026', total: 189, checkedIn: 0 },
    { id: 'EVT-004', name: 'Annakut Utsav', date: '15 Nov 2026', total: 450, checkedIn: 0 },
    { id: 'EVT-005', name: 'Gita Jayanti', date: '17 Dec 2026', total: 120, checkedIn: 0 },
    { id: 'EVT-006', name: 'Weekly Bhajan Sandhya', date: 'Every Saturday', total: 45, checkedIn: 12 }
  ];

  // ============ ATTENDEES DATA ============
  const [attendees, setAttendees] = useState([
    {
      id: 'ATT-001',
      bookingId: 'BKG-7890',
      qrCode: 'QR-MHS-7890-001',
      devotee: 'Rajesh Kumar',
      avatar: 'RK',
      eventName: 'Mahashivratri Celebration',
      eventId: 'EVT-001',
      ticketType: 'VIP',
      tickets: 4,
      amount: 4000,
      checkIn: 'checked',
      checkInTime: '10:23 AM',
      checkInDate: '26 Feb 2026',
      badgePrinted: true,
      phone: '+91 98765 43210',
      email: 'rajesh.k@email.com',
      status: 'confirmed'
    },
    {
      id: 'ATT-002',
      bookingId: 'BKG-7893',
      qrCode: 'QR-MHS-7893-002',
      devotee: 'Sneha Reddy',
      avatar: 'SR',
      eventName: 'Mahashivratri Celebration',
      eventId: 'EVT-001',
      ticketType: 'General',
      tickets: 3,
      amount: 1500,
      checkIn: 'pending',
      checkInTime: null,
      checkInDate: null,
      badgePrinted: false,
      phone: '+91 98765 43213',
      email: 'sneha.r@email.com',
      status: 'confirmed'
    },
    {
      id: 'ATT-003',
      bookingId: 'BKG-7897',
      qrCode: 'QR-MHS-7897-003',
      devotee: 'Deepa Nair',
      avatar: 'DN',
      eventName: 'Mahashivratri Celebration',
      eventId: 'EVT-001',
      ticketType: 'VIP',
      tickets: 2,
      amount: 2000,
      checkIn: 'checked',
      checkInTime: '09:15 AM',
      checkInDate: '26 Feb 2026',
      badgePrinted: true,
      phone: '+91 98765 43217',
      email: 'deepa.n@email.com',
      status: 'confirmed'
    },
    {
      id: 'ATT-004',
      bookingId: 'BKG-7901',
      qrCode: 'QR-MHS-7901-004',
      devotee: 'Arjun Mehta',
      avatar: 'AM',
      eventName: 'Mahashivratri Celebration',
      eventId: 'EVT-001',
      ticketType: 'General',
      tickets: 1,
      amount: 500,
      checkIn: 'pending',
      checkInTime: null,
      checkInDate: null,
      badgePrinted: false,
      phone: '+91 98765 43218',
      email: 'arjun.m@email.com',
      status: 'confirmed'
    },
    {
      id: 'ATT-005',
      bookingId: 'BKG-7902',
      qrCode: 'QR-MHS-7902-005',
      devotee: 'Kavita Singh',
      avatar: 'KS',
      eventName: 'Mahashivratri Celebration',
      eventId: 'EVT-001',
      ticketType: 'Student',
      tickets: 2,
      amount: 500,
      checkIn: 'checked',
      checkInTime: '08:45 AM',
      checkInDate: '26 Feb 2026',
      badgePrinted: true,
      phone: '+91 98765 43219',
      email: 'kavita.s@email.com',
      status: 'confirmed'
    },
    {
      id: 'ATT-006',
      bookingId: 'BKG-7903',
      qrCode: 'QR-MHS-7903-006',
      devotee: 'Rahul Verma',
      avatar: 'RV',
      eventName: 'Mahashivratri Celebration',
      eventId: 'EVT-001',
      ticketType: 'VIP',
      tickets: 3,
      amount: 3000,
      checkIn: 'pending',
      checkInTime: null,
      checkInDate: null,
      badgePrinted: false,
      phone: '+91 98765 43220',
      email: 'rahul.v@email.com',
      status: 'confirmed'
    },
    {
      id: 'ATT-007',
      bookingId: 'BKG-7904',
      qrCode: 'QR-MHS-7904-007',
      devotee: 'Priya Sharma',
      avatar: 'PS',
      eventName: 'Mahashivratri Celebration',
      eventId: 'EVT-001',
      ticketType: 'General',
      tickets: 2,
      amount: 1000,
      checkIn: 'checked',
      checkInTime: '09:45 AM',
      checkInDate: '26 Feb 2026',
      badgePrinted: true,
      phone: '+91 98765 43211',
      email: 'priya.s@email.com',
      status: 'confirmed'
    },
    {
      id: 'ATT-008',
      bookingId: 'BKG-7905',
      qrCode: 'QR-BHJ-7905-008',
      devotee: 'Ramesh Gupta',
      avatar: 'RG',
      eventName: 'Weekly Bhajan Sandhya',
      eventId: 'EVT-006',
      ticketType: 'Free',
      tickets: 1,
      amount: 0,
      checkIn: 'checked',
      checkInTime: '06:15 PM',
      checkInDate: '22 Feb 2026',
      badgePrinted: false,
      phone: '+91 98765 43216',
      email: 'ramesh.g@email.com',
      status: 'confirmed'
    },
    {
      id: 'ATT-009',
      bookingId: 'BKG-7906',
      qrCode: 'QR-BHJ-7906-009',
      devotee: 'Sunita Patil',
      avatar: 'SP',
      eventName: 'Weekly Bhajan Sandhya',
      eventId: 'EVT-006',
      ticketType: 'Free',
      tickets: 2,
      amount: 0,
      checkIn: 'pending',
      checkInTime: null,
      checkInDate: null,
      badgePrinted: false,
      phone: '+91 98765 43221',
      email: 'sunita.p@email.com',
      status: 'confirmed'
    }
  ]);

  // ============ STATS ============
  const currentEvent = events.find(e => e.id === eventFilter) || events[0];
  const eventAttendees = attendees.filter(a => a.eventId === eventFilter);
  
  const stats = {
    total: eventAttendees.length,
    checkedIn: eventAttendees.filter(a => a.checkIn === 'checked').length,
    pending: eventAttendees.filter(a => a.checkIn === 'pending').length,
    percentage: eventAttendees.length > 0 
      ? Math.round((eventAttendees.filter(a => a.checkIn === 'checked').length / eventAttendees.length) * 100) 
      : 0,
    badgesPrinted: eventAttendees.filter(a => a.badgePrinted).length
  };

  // ============ UNREAD COUNT ============
  const unreadCount = attendees.filter(a => a.checkIn === 'pending').length;

  // ============ EXACT MATCH to NotificationsPuja ============
  const getCheckInStyles = (status) => {
    const base = "px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1";
    switch(status) {
      case 'checked':
        return `${base} bg-green-50 text-green-700`;
      case 'pending':
        return `${base} bg-orange-50 text-orange-500`;
      case 'absent':
        return `${base} bg-red-50 text-red-700`;
      default:
        return `${base} bg-gray-100 text-gray-600`;
    }
  };

  const getStatusStyles = (status) => {
    const base = "px-2 py-0.5 rounded-full text-xs font-medium";
    switch(status) {
      case 'confirmed':
        return `${base} bg-green-50 text-green-700`;
      case 'pending':
        return `${base} bg-orange-50 text-orange-500`;
      case 'cancelled':
        return `${base} bg-red-50 text-red-700`;
      default:
        return `${base} bg-gray-100 text-gray-600`;
    }
  };

  // ============ HANDLE ACTIONS ============
  const handleAction = (action, attendee = null) => {
    setIsLoading(true);
    
    switch(action) {
      case 'checkIn':
        setAttendees(prev => prev.map(a => 
          a.id === attendee.id 
            ? { 
                ...a, 
                checkIn: 'checked', 
                checkInTime: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
                checkInDate: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
              } 
            : a
        ));
        break;
      
      case 'checkInByQr':
        setSelectedAttendee(attendee);
        setShowQrModal(true);
        break;
      
      case 'processQrCheckIn':
        setAttendees(prev => prev.map(a => 
          a.id === selectedAttendee.id 
            ? { 
                ...a, 
                checkIn: 'checked', 
                checkInTime: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
                checkInDate: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
              } 
            : a
        ));
        setShowQrModal(false);
        setSelectedAttendee(null);
        break;
      
      case 'printBadge':
        setSelectedAttendee(attendee);
        setShowBadgeModal(true);
        break;
      
      case 'processPrintBadge':
        setAttendees(prev => prev.map(a => 
          a.id === selectedAttendee.id 
            ? { ...a, badgePrinted: true } 
            : a
        ));
        setShowBadgeModal(false);
        setSelectedAttendee(null);
        break;
      
      case 'printAllBadges':
        setAttendees(prev => prev.map(a => 
          a.eventId === eventFilter 
            ? { ...a, badgePrinted: true } 
            : a
        ));
        break;
      
      case 'exportList':
        console.log('Exporting attendee list...');
        break;
      
      case 'scanQr':
        setShowScannerModal(true);
        break;
      
      case 'simulateScan':
        // Simulate QR scan - check in first pending attendee
        const pendingAttendee = eventAttendees.find(a => a.checkIn === 'pending');
        if (pendingAttendee) {
          setAttendees(prev => prev.map(a => 
            a.id === pendingAttendee.id 
              ? { 
                  ...a, 
                  checkIn: 'checked', 
                  checkInTime: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
                  checkInDate: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
                } 
              : a
          ));
        }
        setShowScannerModal(false);
        break;
    }
    
    setTimeout(() => setIsLoading(false), 500);
  };

  // ============ FILTER ATTENDEES ============
  const filteredAttendees = attendees.filter(attendee => {
    // Event filter
    if (eventFilter !== 'all') {
      return attendee.eventId === eventFilter;
    }
    return true;
  }).filter(attendee => {
    // Status filter
    if (filter === 'all') return true;
    if (filter === 'checked') return attendee.checkIn === 'checked';
    if (filter === 'pending') return attendee.checkIn === 'pending';
    return true;
  }).filter(attendee => {
    // Search
    if (!searchQuery) return true;
    return (
      attendee.devotee.toLowerCase().includes(searchQuery.toLowerCase()) ||
      attendee.bookingId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      attendee.qrCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      attendee.phone.includes(searchQuery)
    );
  });

  // ============ QR SCAN MODAL ============
  const QrScanModal = () => {
    if (!showQrModal || !selectedAttendee) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg w-full max-w-md">
          {/* Modal Header - EXACT match */}
          <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 px-4 py-3 border-b border-orange-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-orange-50 rounded flex items-center justify-center">
                  <QrCode className="w-5 h-5 text-orange-500" />
                </div>
                <h3 className="text-[15px] font-bold text-gray-800">
                  QR Code Check-In
                </h3>
              </div>
              <button 
                onClick={() => setShowQrModal(false)}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Modal Content */}
          <div className="p-6 space-y-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full flex items-center justify-center">
                <span className="text-lg font-semibold text-orange-700">{selectedAttendee.avatar}</span>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-800">{selectedAttendee.devotee}</h4>
                <p className="text-xs text-gray-600 mt-0.5">{selectedAttendee.ticketType} • {selectedAttendee.tickets} tickets</p>
                <p className="text-xs text-gray-500 mt-0.5">Booking: {selectedAttendee.bookingId}</p>
              </div>
            </div>

            {/* QR Code Simulation */}
            <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
              <div className="w-40 h-40 bg-white p-2 rounded-lg flex items-center justify-center">
                <div className="grid grid-cols-7 gap-0.5">
                  {Array.from({ length: 49 }).map((_, i) => (
                    <div 
                      key={i} 
                      className={`w-2 h-2 ${
                        Math.random() > 0.6 ? 'bg-black' : 'bg-white'
                      }`}
                    ></div>
                  ))}
                </div>
              </div>
              <p className="text-xs font-mono text-gray-600 mt-2">{selectedAttendee.qrCode}</p>
              <p className="text-xs text-gray-500 mt-1">Scan this QR code at the entrance</p>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <button
                onClick={() => setShowQrModal(false)}
                className="px-4 py-2 text-sm bg-gray-100 text-gray-800 rounded border border-gray-300 hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={() => handleAction('processQrCheckIn')}
                className="px-4 py-2 text-sm bg-green-50 text-green-700 rounded border border-green-300 hover:bg-green-100 flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                Confirm Check-In
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ============ QR SCANNER SIMULATION MODAL ============
  const QrScannerModal = () => {
    if (!showScannerModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg w-full max-w-md">
          {/* Modal Header - EXACT match */}
          <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 px-4 py-3 border-b border-orange-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-orange-50 rounded flex items-center justify-center">
                  <ScanLine className="w-5 h-5 text-orange-500" />
                </div>
                <h3 className="text-[15px] font-bold text-gray-800">
                  Scan QR Code
                </h3>
              </div>
              <button 
                onClick={() => setShowScannerModal(false)}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Modal Content */}
          <div className="p-6 space-y-4">
            {/* Camera Simulation */}
            <div className="relative bg-gray-900 rounded-lg overflow-hidden aspect-square flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 border-2 border-white rounded-lg relative">
                  <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-orange-500"></div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-orange-500"></div>
                  <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-orange-500"></div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-orange-500"></div>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 flex items-end justify-center pb-6">
                <div className="text-white text-center">
                  <ScanLine className="w-8 h-8 mx-auto mb-2 animate-pulse" />
                  <p className="text-sm font-medium">Position QR code in frame</p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-xs text-gray-600 mb-2">Simulated QR Scanner</p>
              <button
                onClick={() => handleAction('simulateScan')}
                className="px-4 py-2 text-sm bg-orange-500 text-white rounded hover:bg-orange-600 flex items-center gap-2 mx-auto"
              >
                <Camera className="w-4 h-4" />
                Simulate Scan
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ============ BADGE PRINT MODAL ============
  const BadgePrintModal = () => {
    if (!showBadgeModal || !selectedAttendee) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg w-full max-w-md">
          {/* Modal Header - EXACT match */}
          <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 px-4 py-3 border-b border-orange-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-orange-50 rounded flex items-center justify-center">
                  <PrinterIcon className="w-5 h-5 text-orange-500" />
                </div>
                <h3 className="text-[15px] font-bold text-gray-800">
                  Print Name Badge
                </h3>
              </div>
              <button 
                onClick={() => setShowBadgeModal(false)}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Modal Content */}
          <div className="p-6 space-y-4">
            {/* Badge Preview */}
            <div className="border-2 border-gray-200 rounded-lg p-4 bg-gradient-to-r from-orange-50/30 to-amber-50/30">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full flex items-center justify-center">
                  <span className="text-lg font-semibold text-orange-700">{selectedAttendee.avatar}</span>
                </div>
                <div>
                  <h4 className="text-base font-bold text-gray-800">{selectedAttendee.devotee}</h4>
                  <p className="text-xs text-gray-600">{selectedAttendee.eventName}</p>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-3 mt-1">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Ticket Type</span>
                  <span className="text-xs font-semibold text-orange-600">{selectedAttendee.ticketType}</span>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-xs text-gray-500">Booking ID</span>
                  <span className="text-xs font-mono text-gray-700">{selectedAttendee.bookingId}</span>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-xs text-gray-500">Date</span>
                  <span className="text-xs text-gray-700">{currentEvent.date}</span>
                </div>
              </div>
              <div className="mt-3 text-center">
                <Award className="w-8 h-8 text-orange-500 mx-auto" />
                <p className="text-[10px] text-gray-500 mt-1">Shri Ram Mandir</p>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <button
                onClick={() => setShowBadgeModal(false)}
                className="px-4 py-2 text-sm bg-gray-100 text-gray-800 rounded border border-gray-300 hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={() => handleAction('processPrintBadge')}
                className="px-4 py-2 text-sm bg-orange-500 text-white rounded hover:bg-orange-600 flex items-center gap-2"
              >
                <PrinterIcon className="w-4 h-4" />
                Print Badge
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50/30">
      <VendorPageHeader 
        title="ATTENDEES MANAGEMENT" 
        subtitle="Manage event registrations and check-ins" 
      />

      {/* Main Content - EXACT spacing */}
      <div className="space-y-4 p-6">
        {/* Welcome Section - EXACT match */}
        <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg px-3 py-2 border border-orange-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <p className="text-[18px] text-gray-600">
                {currentEvent.name} • {stats.checkedIn}/{stats.total} checked in
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm text-gray-600">Check-in Rate</p>
                <p className="text-[15px] font-semibold text-orange-500">
                  {stats.percentage}%
                </p>
              </div>
              <div className="w-8 h-8 bg-orange-50 rounded flex items-center justify-center">
                <BadgeCheck className="w-5 h-5 text-orange-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards - EXACT match */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {/* Total Attendees */}
          <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg border border-gray-200 px-3 py-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Attendees</p>
                <p className="text-xl font-semibold text-gray-800 mt-1">{stats.total}</p>
                <div className="flex items-center gap-1 mt-2">
                  <Users className="w-3 h-3 text-orange-600" />
                  <span className="text-sm text-orange-600">Registered</span>
                </div>
              </div>
              <div className="p-2 bg-orange-50 rounded">
                <Users className="w-5 h-5 text-orange-600" />
              </div>
            </div>
          </div>

          {/* Checked In */}
          <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg border border-gray-200 px-3 py-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Checked In</p>
                <p className="text-xl font-semibold text-gray-800 mt-1">{stats.checkedIn}</p>
                <div className="flex items-center gap-1 mt-2">
                  <UserCheck className="w-3 h-3 text-green-600" />
                  <span className="text-sm text-green-600">Present</span>
                </div>
              </div>
              <div className="p-2 bg-green-50 rounded">
                <UserCheck className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </div>

          {/* Pending Check-in */}
          <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg border border-gray-200 px-3 py-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-xl font-semibold text-gray-800 mt-1">{stats.pending}</p>
                <p className="text-xs text-orange-500 mt-2">Awaiting arrival</p>
              </div>
              <div className="p-2 bg-orange-50 rounded">
                <UserX className="w-5 h-5 text-orange-500" />
              </div>
            </div>
          </div>

          {/* Badges Printed */}
          <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg border border-gray-200 px-3 py-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Badges Printed</p>
                <p className="text-xl font-semibold text-gray-800 mt-1">{stats.badgesPrinted}</p>
                <div className="flex items-center gap-1 mt-2">
                  <PrinterIcon className="w-3 h-3 text-purple-600" />
                  <span className="text-sm text-purple-600">Ready</span>
                </div>
              </div>
              <div className="p-2 bg-purple-50 rounded">
                <PrinterIcon className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Event Selector & Action Bar - EXACT match */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            {/* Event Selector */}
            <div className="w-full lg:w-80">
              <select
                value={eventFilter}
                onChange={(e) => setEventFilter(e.target.value)}
                className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 bg-white"
              >
                {events.map(event => (
                  <option key={event.id} value={event.id}>
                    {event.name} • {event.checkedIn}/{event.total} checked in
                  </option>
                ))}
              </select>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleAction('scanQr')}
                className="px-3 py-1.5 bg-orange-500 text-white text-sm font-medium rounded hover:bg-orange-600 transition-colors flex items-center gap-2"
              >
                <ScanLine className="w-4 h-4" />
                Scan QR
              </button>
              <button
                onClick={() => handleAction('printAllBadges')}
                className="px-3 py-1.5 bg-purple-50 text-purple-600 text-sm font-medium rounded border border-purple-300 hover:bg-purple-100 flex items-center gap-2"
              >
                <PrinterIcon className="w-4 h-4" />
                Print All Badges
              </button>
              <button
                onClick={() => handleAction('exportList')}
                className="px-3 py-1.5 bg-gray-100 text-gray-800 text-sm font-medium rounded border border-gray-300 hover:bg-gray-200 flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export List
              </button>
            </div>
          </div>

          {/* Search & Filter */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-4">
            {/* Search */}
            <div className="w-full sm:w-64 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by name, booking ID, QR..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
              />
            </div>

            {/* Status Filters */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                  filter === 'all' 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All ({stats.total})
              </button>
              <button
                onClick={() => setFilter('checked')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                  filter === 'checked' 
                    ? 'bg-green-50 text-green-700 border border-green-300' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Checked In ({stats.checkedIn})
              </button>
              <button
                onClick={() => setFilter('pending')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                  filter === 'pending' 
                    ? 'bg-orange-50 text-orange-500 border border-orange-300' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Pending ({stats.pending})
              </button>
            </div>
          </div>
        </div>

        {/* Attendees Table - EXACT match */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {/* Table Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-[15px] font-bold text-gray-800">Attendee List</h3>
              <div className="flex items-center gap-2">
                <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full">
                  {stats.checkedIn} Checked In
                </span>
                <span className="text-sm text-gray-600">{filteredAttendees.length} attendees</span>
              </div>
            </div>
          </div>

          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">QR Code</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Devotee</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Booking ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Ticket</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Check-in Time</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Badge</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredAttendees.map((attendee) => (
                  <tr key={attendee.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleAction('checkInByQr', attendee)}
                        className="flex items-center gap-1 text-xs bg-gray-100 hover:bg-orange-50 px-2 py-1 rounded transition-colors"
                      >
                        <QrCode className="w-3.5 h-3.5 text-gray-600" />
                        <span className="text-gray-700">View QR</span>
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full flex items-center justify-center">
                          <span className="text-xs font-semibold text-orange-700">
                            {attendee.avatar}
                          </span>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-900">{attendee.devotee}</span>
                          <span className="text-xs text-gray-500 block">{attendee.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-gray-700">{attendee.bookingId}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <span className="text-sm text-gray-900">{attendee.ticketType}</span>
                        <span className="text-xs text-gray-500 block">{attendee.tickets} ticket(s)</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {attendee.checkIn === 'checked' ? (
                        <div>
                          <span className="text-sm text-gray-900">{attendee.checkInTime}</span>
                          <span className="text-xs text-gray-500 block">{attendee.checkInDate}</span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className={getCheckInStyles(attendee.checkIn)}>
                        {attendee.checkIn === 'checked' ? (
                          <><CheckCircle2 className="w-3 h-3" /> Checked In</>
                        ) : (
                          <><Clock className="w-3 h-3" /> Pending</>
                        )}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {attendee.badgePrinted ? (
                        <span className="px-2 py-0.5 bg-green-50 text-green-700 rounded-full text-xs font-medium">
                          Printed
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                          Not Printed
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        {attendee.checkIn === 'pending' && (
                          <button
                            onClick={() => handleAction('checkIn', attendee)}
                            className="p-1.5 text-green-600 hover:bg-green-50 rounded transition-colors"
                            title="Check In"
                          >
                            <UserCheck className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => handleAction('printBadge', attendee)}
                          className="p-1.5 text-purple-600 hover:bg-purple-50 rounded transition-colors"
                          title="Print Badge"
                        >
                          <PrinterIcon className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleAction('checkInByQr', attendee)}
                          className="p-1.5 text-orange-500 hover:bg-orange-50 rounded transition-colors"
                          title="Show QR"
                        >
                          <QrCode className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="block lg:hidden divide-y divide-gray-200">
            {filteredAttendees.map((attendee) => (
              <div key={attendee.id} className="p-4 hover:bg-gray-50 transition-colors">
                {/* Header Row */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-orange-700">{attendee.avatar}</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-800">{attendee.devotee}</h4>
                      <p className="text-xs text-gray-600">{attendee.bookingId}</p>
                    </div>
                  </div>
                  <span className={getCheckInStyles(attendee.checkIn)}>
                    {attendee.checkIn === 'checked' ? 'Checked In' : 'Pending'}
                  </span>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500">Ticket</p>
                    <p className="text-sm font-medium text-gray-800 mt-1">{attendee.ticketType}</p>
                    <p className="text-xs text-gray-500">{attendee.tickets} ticket(s)</p>
                  </div>
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500">Check-in Time</p>
                    {attendee.checkIn === 'checked' ? (
                      <>
                        <p className="text-sm font-medium text-gray-800 mt-1">{attendee.checkInTime}</p>
                        <p className="text-xs text-gray-500">{attendee.checkInDate}</p>
                      </>
                    ) : (
                      <p className="text-sm text-gray-400 mt-1">—</p>
                    )}
                  </div>
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500">Badge</p>
                    <p className="text-sm font-medium text-gray-800 mt-1">
                      {attendee.badgePrinted ? 'Printed' : 'Not Printed'}
                    </p>
                  </div>
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500">QR Code</p>
                    <button
                      onClick={() => handleAction('checkInByQr', attendee)}
                      className="text-xs text-orange-500 hover:text-orange-600 flex items-center gap-1 mt-1"
                    >
                      <QrCode className="w-3.5 h-3.5" />
                      View QR
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-1 pt-2 border-t border-gray-100">
                  {attendee.checkIn === 'pending' && (
                    <button
                      onClick={() => handleAction('checkIn', attendee)}
                      className="px-2.5 py-1 text-xs bg-green-50 text-green-700 rounded border border-green-300 hover:bg-green-100 flex items-center gap-1"
                    >
                      <UserCheck className="w-3 h-3" />
                      Check In
                    </button>
                  )}
                  <button
                    onClick={() => handleAction('printBadge', attendee)}
                    className="px-2.5 py-1 text-xs bg-purple-50 text-purple-600 rounded border border-purple-300 hover:bg-purple-100 flex items-center gap-1"
                  >
                    <PrinterIcon className="w-3 h-3" />
                    Print Badge
                  </button>
                  <button
                    onClick={() => handleAction('checkInByQr', attendee)}
                    className="px-2.5 py-1 text-xs bg-orange-50 text-orange-500 rounded border border-orange-300 hover:bg-orange-100 flex items-center gap-1"
                  >
                    <QrCode className="w-3 h-3" />
                    Show QR
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State - EXACT match */}
          {filteredAttendees.length === 0 && (
            <div className="p-8 text-center">
              <div className="p-4 rounded-full inline-flex items-center justify-center mb-4 bg-gray-100">
                <Users className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium mb-2 text-gray-800">
                No attendees found
              </h3>
              <p className="text-sm text-gray-600">
                {searchQuery ? 'Try adjusting your search' : 'No attendees for this event yet'}
              </p>
            </div>
          )}

          {/* Footer */}
          {filteredAttendees.length > 0 && (
            <div className="p-3 bg-gray-50 border-t border-gray-200">
              <button className="text-sm font-medium text-orange-500 hover:text-orange-600 flex items-center justify-center gap-1 w-full">
                View All Attendees
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Bottom Section - EXACT match */}
        <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg border border-gray-200 p-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-center sm:text-left">
              <p className="text-sm text-gray-600">QR Scan Check-in</p>
              <p className="text-[14px] text-gray-800">Scan attendee QR codes for fast contactless entry</p>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => handleAction('scanQr')}
                className="px-3 py-1.5 text-sm bg-gray-100 text-gray-800 rounded border border-gray-300 hover:bg-gray-200 flex items-center gap-2"
              >
                <Smartphone className="w-4 h-4" />
                Launch Scanner
              </button>
              <button className="px-3 py-1.5 text-sm bg-gradient-to-r from-orange-300 to-orange-300 text-gray-800 hover:text-white rounded hover:from-orange-500 hover:to-orange-600">
                Print Station
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showQrModal && <QrScanModal />}
      {showScannerModal && <QrScannerModal />}
      {showBadgeModal && <BadgePrintModal />}
    </div>
  );
};

export default Attendees_Organizer;
