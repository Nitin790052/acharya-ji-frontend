import React, { useState } from 'react';
import {
  PlusCircle,
  Edit3,
  Trash2,
  Clock,
  IndianRupee,
  Users,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Bell,
  Filter,
  Search,
  ChevronRight,
  X,
  Save,
  CalendarDays,
  FileText,
  Eye,
  Power,
  Copy,
  Star,
  Gift
} from 'lucide-react';

const SevasPujas = () => {
  const [filter, setFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedSeva, setSelectedSeva] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [sevas, setSevas] = useState([
    {
      id: 'SEVA-001',
      title: 'Annadanam Seva',
      description: 'Food donation to devotees. Includes prasadam for 50 people.',
      time: 'Active since Jan 2026',
      read: true,
      priority: 'medium',
      price: 1100,
      duration: '2 hours',
      slots: 50,
      bookedToday: 12,
      status: 'active',
      category: 'donation',
      type: 'Seva'
    },
    {
      id: 'SEVA-002',
      title: 'Rudrabhishek',
      description: 'Special abhishek with rudra mantra chanting by priests.',
      time: 'Active since Jan 2026',
      read: false,
      priority: 'high',
      price: 501,
      duration: '1 hour',
      slots: 25,
      bookedToday: 8,
      status: 'active',
      category: 'puja',
      type: 'Puja'
    },
    {
      id: 'SEVA-003',
      title: 'Satyanarayan Katha',
      description: 'Recitation of Satyanarayan Katha with full vidhi.',
      time: 'Active since Jan 2026',
      read: true,
      priority: 'medium',
      price: 2500,
      duration: '3 hours',
      slots: 100,
      bookedToday: 15,
      status: 'active',
      category: 'katha',
      type: 'Katha'
    },
    {
      id: 'SEVA-004',
      title: 'Abhishek Puja',
      description: 'Panchamrit abhishek with Vedic mantras.',
      time: 'Inactive since Feb 2026',
      read: true,
      priority: 'low',
      price: 750,
      duration: '45 mins',
      slots: 30,
      bookedToday: 0,
      status: 'inactive',
      category: 'puja',
      type: 'Puja'
    },
    {
      id: 'SEVA-005',
      title: 'Laghu Rudra',
      description: 'Eleven times Rudra abhishek with eleven priests.',
      time: 'Active since Jan 2026',
      read: false,
      priority: 'critical',
      price: 5100,
      duration: '4 hours',
      slots: 15,
      bookedToday: 2,
      status: 'active',
      category: 'special',
      type: 'Special'
    }
  ]);

  const unreadCount = sevas.filter(s => !s.read).length;

  // EXACT match to NotificationsPuja icon styles
  const getSevaIcon = (category) => {
    switch(category) {
      case 'puja':
        return <Bell className="w-5 h-5 text-orange-500" />;
      case 'donation':
        return <IndianRupee className="w-5 h-5 text-green-600" />;
      case 'katha':
        return <FileText className="w-5 h-5 text-purple-600" />;
      case 'special':
        return <Star className="w-5 h-5 text-red-500" />;
      default:
        return <Gift className="w-5 h-5 text-blue-600" />;
    }
  };

  // EXACT match to NotificationsPuja priority styles
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

  // EXACT match to NotificationsPuja status styles
  const getStatusStyles = (status) => {
    const base = "px-2 py-0.5 rounded-full text-xs font-medium";
    switch(status) {
      case 'active':
        return `${base} bg-green-50 text-green-700`;
      case 'inactive':
        return `${base} bg-gray-100 text-gray-600`;
      default:
        return `${base} bg-gray-100 text-gray-600`;
    }
  };

  // EXACT match to NotificationsPuja type label
  const getTypeLabel = (type) => {
    switch(type) {
      case 'Seva': return 'Seva';
      case 'Puja': return 'Puja';
      case 'Katha': return 'Katha';
      case 'Special': return 'Special';
      default: return 'Seva';
    }
  };

  const handleAction = (action, seva = null) => {
    setIsLoading(true);
    
    switch(action) {
      case 'add':
        setModalMode('add');
        setSelectedSeva(null);
        setShowModal(true);
        break;
      case 'edit':
        setModalMode('edit');
        setSelectedSeva(seva);
        setShowModal(true);
        break;
      case 'delete':
        if (window.confirm('Are you sure you want to delete this seva?')) {
          setSevas(prev => prev.filter(s => s.id !== seva.id));
        }
        break;
      case 'toggleStatus':
        setSevas(prev => prev.map(s => 
          s.id === seva.id 
            ? { ...s, status: s.status === 'active' ? 'inactive' : 'active' } 
            : s
        ));
        break;
      case 'markAsRead':
        setSevas(prev => prev.map(s => 
          s.id === seva.id ? { ...s, read: true } : s
        ));
        break;
    }
    
    setTimeout(() => setIsLoading(false), 500);
  };

  // EXACT match to NotificationsPuja filter
  const filteredSevas = filter === 'all' 
    ? sevas
    : filter === 'active' 
      ? sevas.filter(s => s.status === 'active')
      : filter === 'inactive'
        ? sevas.filter(s => s.status === 'inactive')
        : sevas.filter(s => s.category === filter);

  const filteredBySearch = filteredSevas.filter(seva =>
    seva.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    seva.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    seva.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // EXACT match to NotificationsPuja modal
  const SevaModal = () => {
    if (!showModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          {/* Modal Header - EXACT match */}
          <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 px-4 py-3 border-b border-orange-100">
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
                  {modalMode === 'add' ? 'Add New Seva' : 'Edit Seva'}
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

          {/* Modal Form - EXACT spacing match */}
          <form onSubmit={(e) => { e.preventDefault(); setIsLoading(false); setShowModal(false); }} className="p-6 space-y-4">
            {/* Seva Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Seva Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                defaultValue={selectedSeva?.title || ''}
                required
                placeholder="e.g., Annadanam Seva"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm"
              />
            </div>

            {/* Price & Duration Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price (₹) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <IndianRupee className="w-4 h-4 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    name="price"
                    defaultValue={selectedSeva?.price || ''}
                    required
                    min="1"
                    placeholder="1100"
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Clock className="w-4 h-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="duration"
                    defaultValue={selectedSeva?.duration || ''}
                    required
                    placeholder="e.g., 2 hours"
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Max Bookings */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Max Bookings Per Day <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Users className="w-4 h-4 text-gray-400" />
                </div>
                <input
                  type="number"
                  name="slots"
                  defaultValue={selectedSeva?.slots || ''}
                  required
                  min="1"
                  placeholder="50"
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                defaultValue={selectedSeva?.description || ''}
                rows="3"
                placeholder="Describe the seva, its significance, and what's included..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm"
              />
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
                {modalMode === 'add' ? 'Add Seva' : 'Save Changes'}
              </button>
            </div>
          </form>
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

      {/* Header - EXACT match - ONLY HEADING & SUBTITLE - NO BUTTON, NO NOTIFICATION */}
      <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 px-3 py-1.5 border border-orange-100">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <div className="text-left sm:text-left flex-1 md:flex">
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold uppercase leading-tight text-orange-900">
              Sevas & Pujas
            </h1>
            <p className="text-sm text-gray-600 mt-1 md:mt-2.5 lg:mt-2.5">
              Manage temple services and offerings
            </p>

            {/* EMPTY - NO BUTTON, NO NOTIFICATION BELL */}
          <div className="flex items-center gap-3"></div>
          </div>
          
        </div>
      </div>

      {/* Main Content - EXACT spacing match */}
      <div className="space-y-4 p-6">
        {/* Welcome Section - EXACT match */}
        <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg px-3 py-2 border border-orange-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <p className="text-[17px] text-gray-600">
                {sevas.filter(s => s.status === 'active').length} active sevas • {sevas.reduce((acc, s) => acc + s.bookedToday, 0)} bookings today
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm text-gray-600">Today's Revenue</p>
                <p className="text-[15px] font-semibold text-orange-500">
                  ₹{sevas.reduce((acc, s) => acc + (s.price * s.bookedToday), 0).toLocaleString('en-IN')}
                </p>
              </div>
              <div className="w-8 h-8 bg-orange-50 rounded flex items-center justify-center">
                <IndianRupee className="w-5 h-5 text-orange-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards - EXACT match to NotificationsPuja */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {/* Total Sevas */}
          <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg border border-gray-200 px-3 py-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Sevas</p>
                <p className="text-xl font-semibold text-gray-800 mt-1">{sevas.length}</p>
                <div className="flex items-center gap-1 mt-2">
                  <CheckCircle2 className="w-3 h-3 text-green-700" />
                  <span className="text-sm text-green-700">{sevas.filter(s => s.status === 'active').length} active</span>
                </div>
              </div>
              <div className="p-2 bg-orange-50 rounded">
                <Bell className="w-5 h-5 text-orange-600" />
              </div>
            </div>
          </div>

          {/* Active Sevas */}
          <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg border border-gray-200 px-3 py-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Sevas</p>
                <p className="text-xl font-semibold text-gray-800 mt-1">{sevas.filter(s => s.status === 'active').length}</p>
                <p className="text-xs text-orange-500 mt-2">Ready for bookings</p>
              </div>
              <div className="p-2 bg-green-50 rounded">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </div>

          {/* Today's Bookings */}
          <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg border border-gray-200 px-3 py-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Today's Bookings</p>
                <p className="text-xl font-semibold text-gray-800 mt-1">
                  {sevas.reduce((acc, s) => acc + s.bookedToday, 0)}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <Users className="w-3 h-3 text-blue-600" />
                  <span className="text-sm text-blue-600">Across {sevas.filter(s => s.bookedToday > 0).length} sevas</span>
                </div>
              </div>
              <div className="p-2 bg-blue-50 rounded">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Unread Updates */}
          <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg border border-gray-200 px-3 py-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Unread Updates</p>
                <p className="text-xl font-semibold text-gray-800 mt-1">{unreadCount}</p>
                <p className="text-xs text-orange-500 mt-2">Requires attention</p>
              </div>
              <div className="p-2 bg-yellow-50 rounded">
                <AlertCircle className="w-5 h-5 text-yellow-500" />
              </div>
            </div>
          </div>
        </div>

        {/* ADD SEVA BUTTON - MOVED HERE (BELOW STATS CARDS) */}
        <div className="flex justify-end">
          <button
            onClick={() => handleAction('add')}
            className="px-4 py-2 bg-orange-500 text-white text-sm font-medium rounded-lg hover:bg-orange-600 transition-colors flex items-center gap-2 shadow-sm"
          >
            <PlusCircle className="w-4 h-4" />
            Add New Seva
          </button>
        </div>

        {/* Search & Filter Bar - EXACT match to NotificationsPuja */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Search Input */}
            <div className="w-full sm:w-64 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search sevas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
              />
            </div>

            {/* Filter Buttons - EXACT match */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                  filter === 'all' 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All ({sevas.length})
              </button>
              <button
                onClick={() => setFilter('active')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2 ${
                  filter === 'active' 
                    ? 'bg-green-50 text-green-700 border border-green-300' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                Active ({sevas.filter(s => s.status === 'active').length})
              </button>
              <button
                onClick={() => setFilter('inactive')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2 ${
                  filter === 'inactive' 
                    ? 'bg-gray-100 text-gray-700 border border-gray-300' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <XCircle className="w-4 h-4" />
                Inactive ({sevas.filter(s => s.status === 'inactive').length})
              </button>
            </div>
          </div>
        </div>

        {/* Sevas List - EXACT match to NotificationsPuja */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left Column - Sevas List (2/3 width) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-[15px] font-bold text-gray-800">All Sevas & Pujas</h3>
                  <span className="text-sm text-gray-600">{filteredBySearch.length} items</span>
                </div>
              </div>

              <div className="divide-y divide-gray-200">
                {filteredBySearch.map((seva) => (
                  <div 
                    key={seva.id}
                    className={`p-4 transition-colors ${!seva.read ? 'bg-orange-50/30' : 'hover:bg-gray-50'}`}
                    onClick={() => handleAction('edit', seva)}
                  >
                    <div className="flex gap-3">
                      {/* Icon - EXACT match */}
                      <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
                        !seva.read ? 'bg-white border border-orange-200' : 'bg-gray-100'
                      }`}>
                        {getSevaIcon(seva.category)}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className={`text-[14px] font-semibold ${
                              !seva.read ? 'text-gray-800' : 'text-gray-600'
                            }`}>
                              {seva.title}
                            </h4>
                            <span className={getPriorityStyles(seva.priority)}>
                              {seva.priority}
                            </span>
                            <span className={getStatusStyles(seva.status)}>
                              {seva.status}
                            </span>
                            {!seva.read && (
                              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                            )}
                          </div>
                          <span className="text-xs text-gray-500">{seva.time}</span>
                        </div>

                        <p className="text-sm text-gray-700 mb-2">
                          {seva.description}
                        </p>

                        {/* Tags - EXACT match */}
                        <div className="flex flex-wrap gap-2 mb-3">
                          <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded flex items-center gap-1">
                            <IndianRupee className="w-3 h-3" />
                            ₹{seva.price}
                          </span>
                          <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {seva.duration}
                          </span>
                          <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {seva.slots}/day
                          </span>
                          <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs rounded flex items-center gap-1">
                            <CalendarDays className="w-3 h-3" />
                            {seva.bookedToday} booked today
                          </span>
                        </div>

                        {/* Action Buttons - EXACT match */}
                        <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100">
                          {!seva.read && (
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAction('markAsRead', seva);
                              }}
                              className="px-2.5 py-1 text-xs bg-gray-100 text-gray-800 rounded border border-gray-300 hover:bg-gray-200"
                            >
                              Mark as Read
                            </button>
                          )}
                          
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAction('edit', seva);
                            }}
                            className="px-2.5 py-1 text-xs bg-orange-50 text-orange-500 rounded border border-orange-300 hover:bg-orange-100 flex items-center gap-1"
                          >
                            <Edit3 className="w-3 h-3" />
                            Edit
                          </button>
                          
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAction('toggleStatus', seva);
                            }}
                            className={`px-2.5 py-1 text-xs rounded border flex items-center gap-1 ${
                              seva.status === 'active'
                                ? 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                                : 'bg-green-50 text-green-700 border-green-300 hover:bg-green-100'
                            }`}
                          >
                            <Power className="w-3 h-3" />
                            {seva.status === 'active' ? 'Deactivate' : 'Activate'}
                          </button>
                          
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAction('delete', seva);
                            }}
                            className="px-2.5 py-1 text-xs bg-white text-red-600 rounded border border-red-300 hover:bg-red-50 flex items-center gap-1"
                          >
                            <Trash2 className="w-3 h-3" />
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Empty State - EXACT match */}
                {filteredBySearch.length === 0 && (
                  <div className="p-8 text-center">
                    <div className="p-4 rounded-full inline-flex items-center justify-center mb-4 bg-gray-100">
                      <Bell className="w-12 h-12 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium mb-2 text-gray-800">
                      No sevas found
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {searchQuery ? 'Try adjusting your search' : 'Get started by adding your first seva'}
                    </p>
                    <button
                      onClick={() => handleAction('add')}
                      className="px-4 py-2 bg-orange-500 text-white text-sm font-medium rounded hover:bg-orange-600 transition-colors inline-flex items-center gap-2"
                    >
                      <PlusCircle className="w-4 h-4" />
                      Add New Seva
                    </button>
                  </div>
                )}
              </div>

              {/* Footer - EXACT match */}
              {filteredBySearch.length > 0 && (
                <div className="p-3 bg-gray-50 border-t border-gray-200">
                  <button className="text-sm font-medium text-orange-500 hover:text-orange-600 flex items-center justify-center gap-1 w-full">
                    View All Sevas
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Stats & Quick Actions */}
          <div className="space-y-4">
            {/* Category Stats - EXACT match to NotificationsPuja settings style */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[15px] font-bold text-gray-800">Categories</h3>
                <span className="text-sm font-medium text-orange-500">Total {sevas.length}</span>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-orange-50 rounded">
                      <Bell className="w-4 h-4 text-orange-600" />
                    </div>
                    <span className="text-sm text-gray-700">Puja</span>
                  </div>
                  <span className="text-sm font-medium text-gray-800">
                    {sevas.filter(s => s.category === 'puja').length}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-green-50 rounded">
                      <IndianRupee className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-sm text-gray-700">Donation</span>
                  </div>
                  <span className="text-sm font-medium text-gray-800">
                    {sevas.filter(s => s.category === 'donation').length}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-purple-50 rounded">
                      <FileText className="w-4 h-4 text-purple-600" />
                    </div>
                    <span className="text-sm text-gray-700">Katha</span>
                  </div>
                  <span className="text-sm font-medium text-gray-800">
                    {sevas.filter(s => s.category === 'katha').length}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-red-50 rounded">
                      <Star className="w-4 h-4 text-red-500" />
                    </div>
                    <span className="text-sm text-gray-700">Special</span>
                  </div>
                  <span className="text-sm font-medium text-gray-800">
                    {sevas.filter(s => s.category === 'special').length}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="text-[15px] font-bold text-gray-800 mb-4">Quick Stats</h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Capacity</span>
                  <span className="text-sm font-medium text-gray-800">
                    {sevas.reduce((acc, s) => acc + s.slots, 0)}/day
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Today's Utilization</span>
                  <span className="text-sm font-medium text-gray-800">
                    {((sevas.reduce((acc, s) => acc + s.bookedToday, 0) / sevas.reduce((acc, s) => acc + s.slots, 0)) * 100).toFixed(0)}%
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Avg. Price</span>
                  <span className="text-sm font-medium text-gray-800">
                    ₹{Math.round(sevas.reduce((acc, s) => acc + s.price, 0) / sevas.length)}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Tip Card - EXACT match */}
            <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg p-3 border border-orange-200">
              <div className="flex items-start gap-2">
                <div className="p-1.5 bg-orange-50 rounded">
                  <AlertCircle className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-800 mb-1">Quick Tips</h4>
                  <p className="text-xs text-gray-700">
                    • Active sevas are visible to devotees for booking
                  </p>
                  <p className="text-xs text-gray-700 mt-1">
                    • Set max bookings to manage daily capacity
                  </p>
                  <p className="text-xs text-gray-700 mt-1">
                    • Add detailed descriptions for better understanding
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-2">
              <button className="w-full px-3 py-2 bg-white text-gray-800 text-sm font-medium rounded border border-gray-300 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                <Filter className="w-4 h-4" />
                Advanced Filters
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section - EXACT match */}
        <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg border border-gray-200 p-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-center sm:text-left">
              <p className="text-sm text-gray-600">Need help managing sevas?</p>
              <p className="text-[14px] text-gray-800">Contact support: +91 98765 43210</p>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 text-sm bg-gray-100 text-gray-800 rounded border border-gray-300 hover:bg-gray-200">
                View Guide
              </button>
              <button className="px-3 py-1.5 text-sm bg-gradient-to-r from-orange-300 to-orange-300 text-gray-800 hover:text-white rounded hover:from-orange-500 hover:to-orange-600">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <SevaModal />
    </div>
  );
};

export default SevasPujas;