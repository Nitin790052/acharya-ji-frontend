import React, { useState } from 'react';
import VendorPageHeader from '../../../components/VendorPageHeader';

import {
  // Core Icons
  UserCircle,
  Phone,
  Mail,
  MapPin,
  CalendarDays,
  Clock,
  Bell,
  Filter,
  Search,
  ChevronRight,
  PlusCircle,
  Edit3,
  Trash2,
  X,
  CheckCircle2,
  AlertCircle,
  Users,
  Award,
  Star,
  BookOpen,
  Briefcase,
  GraduationCap,
  ToggleLeft,
  ToggleRight,
  Save
} from 'lucide-react';

const StaffManagement = () => {
  const [filter, setFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedStaff, setSelectedStaff] = useState(null);

  // ============ STAFF DATA ============
  const [staff, setStaff] = useState([
    {
      id: 'STF-001',
      name: 'Pandit Ravi Shastri',
      avatar: 'RS',
      role: 'Head Pandit',
      department: 'Puja',
      phone: '+91 98765 43210',
      email: 'ravi.shastri@temple.org',
      experience: '15 years',
      status: 'available',
      assignedBookings: 3,
      rating: 4.9,
      read: false,
      priority: 'high'
    },
    {
      id: 'STF-002',
      name: 'Pandit Suresh Joshi',
      avatar: 'SJ',
      role: 'Pandit',
      department: 'Puja',
      phone: '+91 98765 43212',
      email: 'suresh.joshi@temple.org',
      experience: '10 years',
      status: 'busy',
      assignedBookings: 5,
      rating: 4.7,
      read: true,
      priority: 'medium'
    },
    {
      id: 'STF-003',
      name: 'Rajesh Iyer',
      avatar: 'RI',
      role: 'Temple Manager',
      department: 'Administration',
      phone: '+91 98765 43216',
      email: 'rajesh.iyer@temple.org',
      experience: '12 years',
      status: 'available',
      assignedBookings: 0,
      rating: 4.8,
      read: false,
      priority: 'high'
    },
    {
      id: 'STF-004',
      name: 'Suresh Nair',
      avatar: 'SN',
      role: 'Accountant',
      department: 'Finance',
      phone: '+91 98765 43217',
      email: 'suresh.nair@temple.org',
      experience: '9 years',
      status: 'busy',
      assignedBookings: 0,
      rating: 4.6,
      read: true,
      priority: 'medium'
    },
    {
      id: 'STF-005',
      name: 'Pandit Mahesh Upadhyay',
      avatar: 'MU',
      role: 'Pandit',
      department: 'Puja',
      phone: '+91 98765 43214',
      email: 'mahesh.upadhyay@temple.org',
      experience: '8 years',
      status: 'available',
      assignedBookings: 1,
      rating: 4.5,
      read: false,
      priority: 'medium'
    }
  ]);

  // ============ PENDING BOOKINGS ============
  const [pendingBookings] = useState([
    {
      id: 'BKG-7890',
      devotee: 'Rajesh Kumar',
      seva: 'Rudrabhishek',
      date: '23 Feb 2026',
      time: '09:00 AM',
      priority: 'high'
    },
    {
      id: 'BKG-7891',
      devotee: 'Priya Sharma',
      seva: 'Satyanarayan Katha',
      date: '23 Feb 2026',
      time: '04:00 PM',
      priority: 'medium'
    },
    {
      id: 'BKG-7892',
      devotee: 'Amit Patel',
      seva: 'Abhishek Puja',
      date: '24 Feb 2026',
      time: '08:30 AM',
      priority: 'critical'
    }
  ]);

  // ============ STATS ============
  const stats = {
    total: staff.length,
    available: staff.filter(s => s.status === 'available').length,
    busy: staff.filter(s => s.status === 'busy').length,
    pandits: staff.filter(s => s.role.includes('Pandit')).length,
    totalBookings: staff.reduce((acc, s) => acc + s.assignedBookings, 0),
    avgRating: (staff.reduce((acc, s) => acc + s.rating, 0) / staff.length).toFixed(1)
  };

  // ============ UNREAD COUNT ============
  const unreadCount = staff.filter(s => !s.read).length;

  // ============ EXACT MATCH to NotificationsPuja ============
  const getPriorityStyles = (priority) => {
    const base = "px-2 py-0.5 rounded-full text-xs font-medium";
    switch(priority) {
      case 'critical':
        return `${base} bg-red-50 text-red-700`;
      case 'high':
        return `${base} bg-orange-50 text-orange-500`;
      case 'medium':
        return `${base} bg-blue-50 text-blue-600`;
      case 'low':
        return `${base} bg-gray-100 text-gray-600`;
      default:
        return `${base} bg-gray-100 text-gray-600`;
    }
  };

  const getStatusStyles = (status) => {
    const base = "px-2 py-0.5 rounded-full text-xs font-medium";
    switch(status) {
      case 'available':
        return `${base} bg-green-50 text-green-700`;
      case 'busy':
        return `${base} bg-orange-50 text-orange-500`;
      default:
        return `${base} bg-gray-100 text-gray-600`;
    }
  };

  const getDepartmentStyles = (dept) => {
    const base = "px-2 py-0.5 rounded-full text-xs font-medium";
    switch(dept) {
      case 'Puja':
        return `${base} bg-orange-50 text-orange-600`;
      case 'Administration':
        return `${base} bg-blue-50 text-blue-600`;
      case 'Finance':
        return `${base} bg-green-50 text-green-600`;
      default:
        return `${base} bg-gray-100 text-gray-600`;
    }
  };

  // ============ HANDLE ACTIONS ============
  const handleAction = (action, staffMember = null) => {
    setIsLoading(true);
    
    switch(action) {
      case 'add':
        setModalMode('add');
        setSelectedStaff(null);
        setShowModal(true);
        break;
      case 'edit':
        setModalMode('edit');
        setSelectedStaff(staffMember);
        setShowModal(true);
        break;
      case 'delete':
        if (window.confirm(`Are you sure you want to remove ${staffMember.name}?`)) {
          setStaff(prev => prev.filter(s => s.id !== staffMember.id));
        }
        break;
      case 'toggleStatus':
        setStaff(prev => prev.map(s => 
          s.id === staffMember.id 
            ? { ...s, status: s.status === 'available' ? 'busy' : 'available' } 
            : s
        ));
        break;
      case 'assignBookings':
        setSelectedStaff(staffMember);
        setShowAssignModal(true);
        break;
      case 'markAsRead':
        setStaff(prev => prev.map(s => 
          s.id === staffMember.id ? { ...s, read: true } : s
        ));
        break;
      case 'save':
        setShowModal(false);
        break;
    }
    
    setTimeout(() => setIsLoading(false), 500);
  };

  // ============ FILTER STAFF ============
  const filteredStaff = staff.filter(member => {
    if (filter === 'all') return true;
    if (filter === 'available') return member.status === 'available';
    if (filter === 'busy') return member.status === 'busy';
    if (filter === 'pandits') return member.role.includes('Pandit');
    if (filter === 'admin') return member.department === 'Administration';
    if (filter === 'finance') return member.department === 'Finance';
    return member.department === filter;
  }).filter(member => {
    if (!searchQuery) return true;
    return (
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.phone.includes(searchQuery) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // ============ STAFF MODAL - EXACT match ============
  const StaffModal = () => {
    if (!showModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          {/* Modal Header - EXACT match */}
          <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 px-4 py-3 border-b border-orange-100 sticky top-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-orange-50 rounded flex items-center justify-center">
                  {modalMode === 'add' ? (
                    <PlusCircle className="w-5 h-5 text-orange-500" />
                  ) : (
                    <Edit3 className="w-5 h-5 text-orange-500" />
                  )}
                </div>
                <h3 className="text-[15px] font-bold text-gray-800">
                  {modalMode === 'add' ? 'Add New Staff' : 'Edit Staff'}
                </h3>
              </div>
              <button 
                onClick={() => setShowModal(false)}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Modal Form */}
          <form onSubmit={(e) => { e.preventDefault(); handleAction('save'); }} className="p-6 space-y-4">
            {/* Name & Role */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserCircle className="w-4 h-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    defaultValue={selectedStaff?.name || ''}
                    placeholder="e.g., Pandit Ravi Shastri"
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role <span className="text-red-500">*</span>
                </label>
                <select
                  defaultValue={selectedStaff?.role || 'Pandit'}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm"
                >
                  <option value="Head Pandit">Head Pandit</option>
                  <option value="Pandit">Pandit</option>
                  <option value="Temple Manager">Temple Manager</option>
                  <option value="Accountant">Accountant</option>
                </select>
              </div>
            </div>

            {/* Department & Experience */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Department
                </label>
                <select
                  defaultValue={selectedStaff?.department || 'Puja'}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm"
                >
                  <option value="Puja">Puja</option>
                  <option value="Administration">Administration</option>
                  <option value="Finance">Finance</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Experience
                </label>
                <input
                  type="text"
                  defaultValue={selectedStaff?.experience || ''}
                  placeholder="e.g., 10 years"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm"
                />
              </div>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="w-4 h-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    defaultValue={selectedStaff?.phone || ''}
                    placeholder="+91 98765 43210"
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="w-4 h-4 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    defaultValue={selectedStaff?.email || ''}
                    placeholder="name@temple.org"
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Status Toggle - EXACT match to NotificationsPuja toggle */}
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">Availability Status</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    defaultChecked={selectedStaff?.status === 'available'} 
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Set to Available if staff can take new bookings
              </p>
            </div>

            {/* Modal Actions - EXACT match */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-sm bg-gray-100 text-gray-800 rounded border border-gray-300 hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                {modalMode === 'add' ? 'Add Staff' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // ============ ASSIGN BOOKINGS MODAL ============
  const AssignBookingsModal = () => {
    if (!showAssignModal || !selectedStaff) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          {/* Modal Header - EXACT match */}
          <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 px-4 py-3 border-b border-orange-100 sticky top-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-orange-50 rounded flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-gray-800">
                    Assign Bookings - {selectedStaff.name}
                  </h3>
                  <span className={getStatusStyles(selectedStaff.status)}>
                    {selectedStaff.status}
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setShowAssignModal(false)}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Modal Content */}
          <div className="p-6">
            {/* Staff Summary */}
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold text-orange-700">{selectedStaff.avatar}</span>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-800">{selectedStaff.name}</h4>
                <p className="text-xs text-gray-600 mt-0.5">{selectedStaff.role} • {selectedStaff.department}</p>
              </div>
            </div>

            {/* Pending Bookings List */}
            <h4 className="text-[14px] font-semibold text-gray-800 mb-3">Pending Bookings</h4>
            <div className="space-y-3">
              {pendingBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-gray-500">#{booking.id}</span>
                      <span className={getPriorityStyles(booking.priority)}>
                        {booking.priority}
                      </span>
                    </div>
                    <h5 className="text-sm font-medium text-gray-800">{booking.seva}</h5>
                    <p className="text-xs text-gray-600 mt-1">{booking.devotee}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <CalendarDays className="w-3 h-3" />
                        {booking.date}
                      </span>
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {booking.time}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowAssignModal(false)}
                    className="px-2.5 py-1 text-xs bg-orange-50 text-orange-500 rounded border border-orange-300 hover:bg-orange-100 flex items-center gap-1 ml-2"
                  >
                    <CheckCircle2 className="w-3 h-3" />
                    Assign
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Loading Overlay - EXACT match */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm text-gray-700">Processing...</p>
          </div>
        </div>
      )}

      <VendorPageHeader 
        title="STAFF & PANDIT MANAGEMENT" 
        subtitle="Manage temple staff and their assignments" 
      />


      {/* Main Content - EXACT spacing */}
      <div className="space-y-4 p-6">
        {/* Welcome Section - EXACT match */}
        <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg px-3 py-2 border border-orange-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <p className="text-[17px] text-gray-600">
                {stats.available} staff available • {stats.busy} currently busy
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm text-gray-600">Avg. Rating</p>
                <div className="flex items-center gap-1">
                  <p className="text-[15px] font-semibold text-orange-500">{stats.avgRating}</p>
                  <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                </div>
              </div>
              <div className="w-8 h-8 bg-orange-50 rounded flex items-center justify-center">
                <Star className="w-5 h-5 text-orange-500 fill-orange-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards - EXACT match */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {/* Total Staff */}
          <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg border border-gray-200 px-3 py-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Staff</p>
                <p className="text-xl font-semibold text-gray-800 mt-1">{stats.total}</p>
                <div className="flex items-center gap-1 mt-2">
                  <Users className="w-3 h-3 text-blue-600" />
                  <span className="text-sm text-blue-600">{stats.pandits} pandits</span>
                </div>
              </div>
              <div className="p-2 bg-blue-50 rounded">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Available Staff */}
          <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg border border-gray-200 px-3 py-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Available</p>
                <p className="text-xl font-semibold text-gray-800 mt-1">{stats.available}</p>
                <div className="flex items-center gap-1 mt-2">
                  <CheckCircle2 className="w-3 h-3 text-green-600" />
                  <span className="text-sm text-green-600">Ready</span>
                </div>
              </div>
              <div className="p-2 bg-green-50 rounded">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </div>

          {/* Busy Staff */}
          <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg border border-gray-200 px-3 py-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Busy</p>
                <p className="text-xl font-semibold text-gray-800 mt-1">{stats.busy}</p>
                <p className="text-xs text-orange-500 mt-2">On duty</p>
              </div>
              <div className="p-2 bg-orange-50 rounded">
                <Clock className="w-5 h-5 text-orange-500" />
              </div>
            </div>
          </div>

          {/* Assigned Bookings */}
          <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg border border-gray-200 px-3 py-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Assigned</p>
                <p className="text-xl font-semibold text-gray-800 mt-1">{stats.totalBookings}</p>
                <div className="flex items-center gap-1 mt-2">
                  <CalendarDays className="w-3 h-3 text-purple-600" />
                  <span className="text-sm text-purple-600">bookings</span>
                </div>
              </div>
              <div className="p-2 bg-purple-50 rounded">
                <CalendarDays className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/*Add button */}
          <div className='flex justify-end'>
            <button
              onClick={() => handleAction('add')}
              className="px-3 py-1.5 bg-orange-500 text-white text-sm font-medium rounded hover:bg-orange-600 transition-colors flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              Add Staff
            </button>
          </div>

        {/* Filter Bar - EXACT match */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            {/* Search */}
            <div className="w-full lg:w-64 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search staff..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
              />
            </div>

            {/* Filter Buttons */}
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
                onClick={() => setFilter('available')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                  filter === 'available' 
                    ? 'bg-green-50 text-green-700 border border-green-300' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Available ({stats.available})
              </button>
              <button
                onClick={() => setFilter('busy')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                  filter === 'busy' 
                    ? 'bg-orange-50 text-orange-500 border border-orange-300' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Busy ({stats.busy})
              </button>
              <button
                onClick={() => setFilter('pandits')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                  filter === 'pandits' 
                    ? 'bg-orange-50 text-orange-600 border border-orange-300' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Pandits ({stats.pandits})
              </button>
            </div>
          </div>

          {/* Department Filters */}
          <div className="flex flex-wrap gap-2 mt-4">
            <button
              onClick={() => setFilter('Puja')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                filter === 'Puja' 
                  ? 'bg-orange-50 text-orange-600 border border-orange-300' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Puja Dept.
            </button>
            <button
              onClick={() => setFilter('Administration')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                filter === 'Administration' 
                  ? 'bg-blue-50 text-blue-600 border border-blue-300' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Admin
            </button>
            <button
              onClick={() => setFilter('Finance')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                filter === 'Finance' 
                  ? 'bg-green-50 text-green-600 border border-green-300' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Finance
            </button>
          </div>
        </div>

        {/* Staff Table - EXACT match */}
        <div className="bg-white rounded-lg border border-gray-200 w-full overflow-hidden">
          {/* Table Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-[15px] font-bold text-gray-800">Staff Directory</h3>
              <span className="text-sm text-gray-600">{filteredStaff.length} members</span>
            </div>
          </div>

          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto scrollbar-thin scrollbar-thumb-orange-100 scrollbar-track-gray-100">
            <table className="min-w-max whitespace-nowrap">
              <thead className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 ">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800 uppercase tracking-wider">ID</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800 uppercase tracking-wider">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800 uppercase tracking-wider">Role</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800 uppercase tracking-wider">Department</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800 uppercase tracking-wider">Phone</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800 uppercase tracking-wider">Experience</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800 uppercase tracking-wider">Bookings</th>
                 <th className="px-12 py-3 text-left text-sm font-semibold text-gray-800 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredStaff.map((member) => (
                  <tr 
                    key={member.id} 
                    className="hover:bg-gray-50"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-800">#{member.id}</span>
                        {!member.read && (
                          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full flex items-center justify-center">
                          <span className="text-xs font-semibold text-orange-700">
                            {member.avatar}
                          </span>
                        </div>
                        <span className="text-sm font-medium text-gray-800">{member.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-gray-900">{member.role}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={getDepartmentStyles(member.department)}>
                        {member.department}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-gray-700">{member.phone}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-gray-700">{member.experience}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={getStatusStyles(member.status)}>
                        {member.status}
                      </span>
                    </td>
                    <td className="px-10 py-3">
                      <span className="text-sm font-medium text-gray-900">{member.assignedBookings}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleAction('toggleStatus', member)}
                          className={`p-1.5 rounded transition-colors ${
                            member.status === 'available' 
                              ? 'text-green-600 hover:bg-green-50' 
                              : 'text-orange-500 hover:bg-orange-50'
                          }`}
                        >
                          {member.status === 'available' ? (
                            <ToggleRight className="w-4 h-4" />
                          ) : (
                            <ToggleLeft className="w-4 h-4" />
                          )}
                        </button>
                        
                        <button
                          onClick={() => handleAction('assignBookings', member)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        >
                          <BookOpen className="w-4 h-4" />
                        </button>
                        
                        <button
                          onClick={() => handleAction('edit', member)}
                          className="p-1.5 text-gray-600 hover:bg-orange-50 hover:text-orange-600 rounded transition-colors"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        
                        <button
                          onClick={() => handleAction('delete', member)}
                          className="p-1.5 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
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
            {filteredStaff.map((member) => (
              <div 
                key={member.id} 
                className={`p-4 transition-colors ${!member.read ? 'bg-orange-50/30' : 'hover:bg-gray-50'}`}
              >
                {/* Header Row */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-gray-500">#{member.id}</span>
                    {!member.read && (
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    )}
                  </div>
                  <span className={getStatusStyles(member.status)}>
                    {member.status}
                  </span>
                </div>

                {/* Staff Info */}
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-orange-700">
                      {member.avatar}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[14px] font-semibold text-gray-800">{member.name}</h4>
                    <p className="text-xs text-gray-600 mt-1">{member.role}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={getDepartmentStyles(member.department)}>
                        {member.department}
                      </span>
                      <span className="text-xs text-gray-500">{member.experience}</span>
                    </div>
                  </div>
                </div>

                {/* Contact & Bookings */}
                <div className="space-y-2 mb-3">
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <Phone className="w-3.5 h-3.5" />
                    <span>{member.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <Mail className="w-3.5 h-3.5" />
                    <span className="truncate">{member.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <Star className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />
                    <span>{member.rating} • {member.assignedBookings} bookings</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-1 pt-2 border-t border-gray-100">
                  <button
                    onClick={() => handleAction('toggleStatus', member)}
                    className={`p-2 rounded-lg ${
                      member.status === 'available' 
                        ? 'text-green-600 hover:bg-green-50' 
                        : 'text-orange-500 hover:bg-orange-50'
                    }`}
                  >
                    {member.status === 'available' ? (
                      <ToggleRight className="w-4 h-4" />
                    ) : (
                      <ToggleLeft className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={() => handleAction('assignBookings', member)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                  >
                    <BookOpen className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleAction('edit', member)}
                    className="p-2 text-gray-600 hover:bg-orange-50 hover:text-orange-600 rounded-lg"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleAction('delete', member)}
                    className="p-2 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State - EXACT match */}
          {filteredStaff.length === 0 && (
            <div className="p-8 text-center">
              <div className="p-4 rounded-full inline-flex items-center justify-center mb-4 bg-gray-100">
                <Users className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium mb-2 text-gray-800">
                No staff found
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                {searchQuery ? 'Try adjusting your search' : 'Add your first staff member'}
              </p>
              <button
                onClick={() => handleAction('add')}
                className="px-4 py-2 bg-orange-500 text-white text-sm font-medium rounded hover:bg-orange-600 inline-flex items-center gap-2"
              >
                <PlusCircle className="w-4 h-4" />
                Add Staff
              </button>
            </div>
          )}

          {/* Footer */}
          {filteredStaff.length > 0 && (
            <div className="p-3 bg-gray-50 border-t border-gray-200">
              <button className="text-sm font-medium text-orange-500 hover:text-orange-600 flex items-center justify-center gap-1 w-full">
                View All Staff
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Bottom Section - EXACT match */}
        <div className="bg-gray-200/80 rounded-lg border border-gray-200 p-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-center sm:text-left">
              <p className="text-sm text-gray-600">Staff management tips</p>
              <p className="text-[14px] text-gray-800">Toggle status to show availability for bookings</p>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 text-sm bg-gray-100 text-gray-800 rounded border border-gray-300 hover:bg-gray-200">
                View Schedule
              </button>
              <button className="px-3 py-1.5 text-sm bg-gradient-to-r from-orange-300 to-orange-300 text-gray-800 hover:text-white rounded hover:from-orange-500 hover:to-orange-600">
                Manage Leave
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <StaffModal />
      <AssignBookingsModal />
    </div>
  );
};

export default StaffManagement;