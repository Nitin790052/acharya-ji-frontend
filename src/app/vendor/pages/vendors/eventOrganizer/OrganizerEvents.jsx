import React, { useState } from 'react';
import {
  // Core Icons
  CalendarDays,
  Clock,
  MapPin,
  Users,
  IndianRupee,
  Ticket,
  Bell,
  Filter,
  Search,
  ChevronRight,
  PlusCircle,
  Edit3,
  Trash2,
  X,
  Upload,
  Image as ImageIcon,
  Download,
  Eye,
  CheckCircle2,
  AlertCircle,
  Gift,
  Star,
  Award,
  Copy,
  Save,
  Camera
} from 'lucide-react';
import image1 from "../../../../../assets/vendor/eventsDashboard/Mahashivratri Celebration.webp"
import image2 from "../../../../../assets/vendor/eventsDashboard/Ram Navami.webp"
import image3 from "../../../../../assets/vendor/eventsDashboard/Hanuman Jayanti.webp"
import image4 from "../../../../../assets/vendor/eventsDashboard/Annakut Utsav medium.webp"
import image5 from "../../../../../assets/vendor/eventsDashboard/Gita Jayanti.webp"
import image6 from "../../../../../assets/vendor/eventsDashboard/Mahashivratri Celebration.webp"

const OrganizerEvents = () => {
  const [filter, setFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteEventId, setDeleteEventId] = useState(null);

  // ============ EVENTS DATA ============
  const [events, setEvents] = useState([
    {
      id: 'EVT-001',
      title: 'Mahashivratri Celebration',
      description: 'Grand celebration of Lord Shiva with night-long prayers, Rudra Abhishek, and cultural programs.',
      time: '26 Feb 2026 • 06:00 PM',
      read: false,
      priority: 'critical',
      status: 'upcoming',
      category: 'festival',
      venue: 'Main Temple Hall',
      price: 500,
      capacity: 500,
      sold: 345,
      registrations: 45,
      waitlist: 12,
      image: image1,
      featured: true
    },
    {
      id: 'EVT-002',
      title: 'Ram Navami',
      description: 'Celebration of Lord Rama\'s birth with special puja, bhajans, Ramayan recitation.',
      time: '06 Apr 2026 • 05:00 AM',
      read: true,
      priority: 'high',
      status: 'upcoming',
      category: 'festival',
      venue: 'Main Temple Hall',
      price: 400,
      capacity: 400,
      sold: 245,
      registrations: 28,
      waitlist: 8,
      image: image2,
      featured: true
    },
    {
      id: 'EVT-003',
      title: 'Hanuman Jayanti',
      description: 'Birth celebration of Lord Hanuman with special abhishek, Sundarkand path.',
      time: '12 Apr 2026 • 05:30 AM',
      read: false,
      priority: 'high',
      status: 'upcoming',
      category: 'festival',
      venue: 'Hanuman Temple',
      price: 350,
      capacity: 350,
      sold: 189,
      registrations: 15,
      waitlist: 5,
      image: image3,
      featured: false
    },
    {
      id: 'EVT-004',
      title: 'Annakut Utsav',
      description: 'Govardhan Puja celebration with 56 types of bhog, cultural performances.',
      time: '15 Nov 2026 • 08:00 AM',
      read: true,
      priority: 'medium',
      status: 'planning',
      category: 'utsav',
      venue: 'Temple Ground',
      price: 300,
      capacity: 1000,
      sold: 450,
      registrations: 0,
      waitlist: 0,
      image: image4,
      featured: false
    },
    {
      id: 'EVT-005',
      title: 'Gita Jayanti',
      description: 'Celebration of Bhagavad Gita with discourse, shloka chanting, quiz.',
      time: '17 Dec 2026 • 09:00 AM',
      read: false,
      priority: 'medium',
      status: 'planning',
      category: 'spiritual',
      venue: 'Main Temple Hall',
      price: 200,
      capacity: 300,
      sold: 120,
      registrations: 0,
      waitlist: 0,
      image: image5,
      featured: false
    },
    {
      id: 'EVT-006',
      title: 'Weekly Bhajan Sandhya',
      description: 'Every Saturday evening devotional singing with kirtan and aarti.',
      time: 'Every Saturday • 06:30 PM',
      read: true,
      priority: 'low',
      status: 'ongoing',
      category: 'regular',
      venue: 'Bhajan Hall',
      price: 0,
      capacity: 100,
      sold: 45,
      registrations: 12,
      waitlist: 0,
      image: image6,
      featured: false
    }
  ]);

  // ============ STATS ============
  const stats = {
    total: events.length,
    upcoming: events.filter(e => e.status === 'upcoming').length,
    ongoing: events.filter(e => e.status === 'ongoing').length,
    planning: events.filter(e => e.status === 'planning').length,
    featured: events.filter(e => e.featured).length,
    totalSold: events.reduce((acc, e) => acc + e.sold, 0),
    totalRevenue: events.reduce((acc, e) => acc + (e.sold * e.price), 0)
  };

  // ============ UNREAD COUNT ============
  const unreadCount = events.filter(e => !e.read).length;

  // ============ EXACT MATCH to NotificationsPuja ============
  const getCategoryIcon = (category) => {
    switch(category) {
      case 'festival':
        return <Gift className="w-5 h-5 text-orange-500" />;
      case 'utsav':
        return <Award className="w-5 h-5 text-purple-600" />;
      case 'spiritual':
        return <Star className="w-5 h-5 text-yellow-500" />;
      case 'regular':
        return <CalendarDays className="w-5 h-5 text-blue-600" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

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
      case 'upcoming':
        return `${base} bg-blue-50 text-blue-600`;
      case 'ongoing':
        return `${base} bg-green-50 text-green-700`;
      case 'planning':
        return `${base} bg-orange-50 text-orange-500`;
      default:
        return `${base} bg-gray-100 text-gray-600`;
    }
  };

  // ============ HANDLE ACTIONS ============
  const handleAction = (action, event = null) => {
    setIsLoading(true);
    
    switch(action) {
      case 'add':
        setModalMode('add');
        setSelectedEvent(null);
        setShowModal(true);
        break;
      case 'edit':
        setModalMode('edit');
        setSelectedEvent(event);
        setShowModal(true);
        break;
      case 'delete':
        setDeleteEventId(event.id);
        setShowDeleteConfirm(true);
        break;
      case 'confirmDelete':
        setEvents(prev => prev.filter(e => e.id !== deleteEventId));
        setShowDeleteConfirm(false);
        setDeleteEventId(null);
        break;
      case 'toggleFeatured':
        setEvents(prev => prev.map(e => 
          e.id === event.id ? { ...e, featured: !e.featured } : e
        ));
        break;
      case 'markAsRead':
        setEvents(prev => prev.map(e => 
          e.id === event.id ? { ...e, read: true } : e
        ));
        break;
    }
    
    setTimeout(() => setIsLoading(false), 500);
  };

  // ============ FILTER EVENTS ============
  const filteredEvents = events.filter(event => {
    if (filter === 'all') return true;
    if (filter === 'upcoming') return event.status === 'upcoming';
    if (filter === 'ongoing') return event.status === 'ongoing';
    if (filter === 'planning') return event.status === 'planning';
    if (filter === 'featured') return event.featured === true;
    return event.category === filter;
  }).filter(event => {
    if (!searchQuery) return true;
    return (
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.venue.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // ============ EVENT MODAL - EXACT match ============
  const EventModal = () => {
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
                  {modalMode === 'add' ? 'Add New Event' : 'Edit Event'}
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
          <div className="p-6 space-y-4">
            {/* Poster Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Event Poster
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-orange-300 transition-colors">
                <div className="flex flex-col items-center">
                  <div className="p-2 bg-gray-50 rounded-full mb-2">
                    <Upload className="w-5 h-5 text-gray-400" />
                  </div>
                  <p className="text-xs text-gray-600">Click to upload poster</p>
                  <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
                </div>
              </div>
            </div>

            {/* Event Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Event Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                defaultValue={selectedEvent?.title || ''}
                placeholder="e.g., Mahashivratri Celebration"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm"
              />
            </div>

            {/* Date & Time Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <CalendarDays className="w-4 h-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    defaultValue={selectedEvent?.time.split(' • ')[0] || ''}
                    placeholder="26 Feb 2026"
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Time <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Clock className="w-4 h-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    defaultValue={selectedEvent?.time.split(' • ')[1] || ''}
                    placeholder="06:00 PM"
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Venue & Price Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Venue <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="w-4 h-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    defaultValue={selectedEvent?.venue || ''}
                    placeholder="Main Temple Hall"
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ticket Price (₹)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <IndianRupee className="w-4 h-4 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    defaultValue={selectedEvent?.price || ''}
                    placeholder="500"
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Capacity & Category Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Total Capacity
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Users className="w-4 h-4 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    defaultValue={selectedEvent?.capacity || ''}
                    placeholder="500"
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  defaultValue={selectedEvent?.category || 'festival'}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm"
                >
                  <option value="festival">Festival</option>
                  <option value="utsav">Utsav</option>
                  <option value="spiritual">Spiritual</option>
                  <option value="regular">Regular</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                rows="3"
                defaultValue={selectedEvent?.description || ''}
                placeholder="Event description..."
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
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-sm bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                {modalMode === 'add' ? 'Create Event' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ============ DELETE CONFIRM MODAL ============
  const DeleteConfirmModal = () => {
    if (!showDeleteConfirm) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg w-full max-w-md">
          <div className="bg-gradient-to-r from-red-50 to-red-100/50 px-4 py-3 border-b border-red-200">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-red-50 rounded flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-red-500" />
              </div>
              <h3 className="text-[15px] font-bold text-gray-800">Delete Event</h3>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <p className="text-sm text-gray-600">
              Are you sure you want to delete this event? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 text-sm bg-gray-100 text-gray-800 rounded border border-gray-300 hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={() => handleAction('confirmDelete')}
                className="px-4 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600 flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ============ EVENT CARD COMPONENT - EXACT match to NotificationsPuja ============
  const EventCard = ({ event }) => {
    const soldPercentage = (event.sold / event.capacity) * 100;
    const [imageError, setImageError] = useState(false);

    return (
      <div 
        className={`bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200 ${
          !event.read ? 'bg-orange-50/30' : ''
        }`}
      >
        {/* Event Image */}
        <div className="relative h-40 bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40">
          {!imageError ? (
            <img 
              src={event.image} 
              alt={event.title}
              className="w-full h-full bg-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ImageIcon className="w-10 h-10 text-gray-300" />
            </div>
          )}
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-wrap gap-1">
            <span className={getStatusStyles(event.status)}>
              {event.status}
            </span>
            {event.featured && (
              <span className="px-2 py-0.5 bg-yellow-50 text-yellow-600 rounded-full text-xs font-medium flex items-center gap-1">
                <Star className="w-3 h-3 fill-yellow-500" />
                Featured
              </span>
            )}
            {event.price === 0 && (
              <span className="px-2 py-0.5 bg-green-50 text-green-700 rounded-full text-xs font-medium">
                Free
              </span>
            )}
          </div>
          
          {/* Category Icon */}
          <div className="absolute top-2 right-2">
            <div className="p-1.5 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm">
              {getCategoryIcon(event.category)}
            </div>
          </div>
          
          {/* Unread Dot */}
          {!event.read && (
            <div className="absolute bottom-2 right-2 w-2 h-2 bg-orange-500 rounded-full ring-2 ring-white"></div>
          )}
        </div>

        {/* Event Details */}
        <div className="p-4">
          {/* Title & Priority */}
          <div className="flex items-start justify-between mb-2">
            <h4 className="text-[14px] font-semibold text-gray-800 line-clamp-1 flex-1">
              {event.title}
            </h4>
            <span className={getPriorityStyles(event.priority)}>
              {event.priority}
            </span>
          </div>

          {/* Description */}
          <p className="text-xs text-gray-600 mb-3 line-clamp-2">
            {event.description}
          </p>

          {/* Event Meta */}
          <div className="space-y-1.5 mb-3">
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <CalendarDays className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="truncate">{event.time}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="truncate">{event.venue}</span>
            </div>
          </div>

          {/* Price & Bookings */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1">
              <IndianRupee className="w-4 h-4 text-green-600" />
              <span className="text-sm font-bold text-gray-800">
                {event.price === 0 ? 'Free' : `₹${event.price}`}
              </span>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-600">
              <Users className="w-3.5 h-3.5" />
              <span>{event.registrations} new</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-600">Bookings</span>
              <span className="text-xs font-medium text-gray-800">
                {event.sold}/{event.capacity}
              </span>
            </div>
            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-orange-400 to-orange-500 rounded-full"
                style={{ width: `${soldPercentage}%` }}
              ></div>
            </div>
            {event.waitlist > 0 && (
              <p className="text-xs text-orange-500 mt-1">
                {event.waitlist} on waitlist
              </p>
            )}
          </div>

          {/* Action Buttons - EXACT match */}
          <div className="flex flex-wrap items-center justify-between pt-2 border-t border-gray-100">
            <div className="flex items-center gap-1">
              <button
                onClick={() => handleAction('edit', event)}
                className="p-1.5 text-gray-600 hover:bg-orange-50 hover:text-orange-600 rounded transition-colors"
                title="Edit Event"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleAction('toggleFeatured', event)}
                className={`p-1.5 rounded transition-colors ${
                  event.featured
                    ? 'text-yellow-600 hover:bg-yellow-50'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                title={event.featured ? 'Remove Featured' : 'Mark Featured'}
              >
                <Star className={`w-4 h-4 ${event.featured ? 'fill-yellow-500' : ''}`} />
              </button>
              <button
                onClick={() => handleAction('delete', event)}
                className="p-1.5 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded transition-colors"
                title="Delete Event"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            
            {!event.read && (
              <button
                onClick={() => handleAction('markAsRead', event)}
                className="px-2.5 py-1 text-xs bg-gray-100 text-gray-800 rounded border border-gray-300 hover:bg-gray-200"
              >
                Mark Read
              </button>
            )}
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

      {/* Header - EXACT match */}
      <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 px-3 py-1.5 border border-orange-100">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <div className="text-left sm:text-left flex-1 md:flex">
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold uppercase leading-tight text-orange-900">
              Events Management
            </h1>
            <p className="text-sm text-gray-600 mt-1 md:mt-2.5 lg:mt-2.5">
              Manage temple festivals and programs
            </p>
          </div>
          
          {/* Notification Bell & Add Button */}
          <div className="flex items-center gap-3">
            {unreadCount > 0 && (
              <div className="relative">
                <div className="w-8 h-8 bg-orange-50 rounded flex items-center justify-center">
                  <Bell className="w-5 h-5 text-orange-500" />
                </div>
                <div className="absolute -top-1 -right-1 w-[17px] h-[17px] bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {unreadCount}
                </div>
              </div>
            )}
            
          </div>
        </div>
      </div>

      {/* Main Content - EXACT spacing */}
      <div className="space-y-4 p-6">
        {/* Welcome Section - EXACT match */}
        <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg px-3 py-2 border border-orange-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <p className="text-[18px] text-gray-600">
                {stats.upcoming} upcoming events • {stats.totalSold} tickets sold
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-[15px] font-semibold text-orange-500">
                  ₹{stats.totalRevenue.toLocaleString('en-IN')}
                </p>
              </div>
              <div className="w-8 h-8 bg-orange-50 rounded flex items-center justify-center">
                <IndianRupee className="w-5 h-5 text-orange-500" />
              </div>
            </div>
          </div>
        </div>
       

        {/* Stats Cards - EXACT match */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {/* Total Events */}
          <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg border border-gray-200 px-3 py-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Events</p>
                <p className="text-xl font-semibold text-gray-800 mt-1">{stats.total}</p>
                <div className="flex items-center gap-1 mt-2">
                  <CalendarDays className="w-3 h-3 text-orange-600" />
                  <span className="text-sm text-orange-600">{stats.upcoming} upcoming</span>
                </div>
              </div>
              <div className="p-2 bg-orange-50 rounded">
                <CalendarDays className="w-5 h-5 text-orange-600" />
              </div>
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg border border-gray-200 px-3 py-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Upcoming</p>
                <p className="text-xl font-semibold text-gray-800 mt-1">{stats.upcoming}</p>
                <p className="text-xs text-blue-600 mt-2">Next: Mahashivratri</p>
              </div>
              <div className="p-2 bg-blue-50 rounded">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Featured Events */}
          <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg border border-gray-200 px-3 py-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Featured</p>
                <p className="text-xl font-semibold text-gray-800 mt-1">{stats.featured}</p>
                <div className="flex items-center gap-1 mt-2">
                  <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                  <span className="text-sm text-yellow-600">Highlighted</span>
                </div>
              </div>
              <div className="p-2 bg-yellow-50 rounded">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              </div>
            </div>
          </div>

          {/* Tickets Sold */}
          <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg border border-gray-200 px-3 py-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tickets Sold</p>
                <p className="text-xl font-semibold text-gray-800 mt-1">{stats.totalSold}</p>
                <p className="text-xs text-green-600 mt-2">Across all events</p>
              </div>
              <div className="p-2 bg-green-50 rounded">
                <Ticket className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </div>
        </div>

         
         {/*Add events */}
        <div className='flex justify-end'>
          <button
              onClick={() => handleAction('add')}
              className="px-3 py-1.5 bg-orange-500 text-white text-sm font-medium rounded hover:bg-orange-600 transition-colors flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              Add Event
            </button>
        </div>

        {/* Search & Filter Bar - EXACT match */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            {/* Search */}
            <div className="w-full lg:w-64 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search events..."
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
                onClick={() => setFilter('upcoming')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                  filter === 'upcoming' 
                    ? 'bg-blue-50 text-blue-600 border border-blue-300' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Upcoming ({stats.upcoming})
              </button>
              <button
                onClick={() => setFilter('ongoing')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                  filter === 'ongoing' 
                    ? 'bg-green-50 text-green-700 border border-green-300' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Ongoing ({stats.ongoing})
              </button>
              <button
                onClick={() => setFilter('planning')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                  filter === 'planning' 
                    ? 'bg-orange-50 text-orange-500 border border-orange-300' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Planning ({stats.planning})
              </button>
              <button
                onClick={() => setFilter('featured')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1 ${
                  filter === 'featured' 
                    ? 'bg-yellow-50 text-yellow-600 border border-yellow-300' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Star className="w-4 h-4 fill-yellow-500" />
                Featured ({stats.featured})
              </button>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mt-4">
            <button
              onClick={() => setFilter('festival')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2 ${
                filter === 'festival' 
                  ? 'bg-orange-50 text-orange-600 border border-orange-300' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Gift className="w-4 h-4" />
              Festival
            </button>
            <button
              onClick={() => setFilter('utsav')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2 ${
                filter === 'utsav' 
                  ? 'bg-purple-50 text-purple-600 border border-purple-300' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Award className="w-4 h-4" />
              Utsav
            </button>
            <button
              onClick={() => setFilter('spiritual')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2 ${
                filter === 'spiritual' 
                  ? 'bg-yellow-50 text-yellow-600 border border-yellow-300' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Star className="w-4 h-4" />
              Spiritual
            </button>
            <button
              onClick={() => setFilter('regular')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2 ${
                filter === 'regular' 
                  ? 'bg-blue-50 text-blue-600 border border-blue-300' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <CalendarDays className="w-4 h-4" />
              Regular
            </button>
          </div>
        </div>

        {/* Events Grid - CARD VIEW */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}

          {/* Empty State - EXACT match */}
          {filteredEvents.length === 0 && (
            <div className="col-span-full p-8 text-center">
              <div className="p-4 rounded-full inline-flex items-center justify-center mb-4 bg-gray-100">
                <CalendarDays className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium mb-2 text-gray-800">
                No events found
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                {searchQuery ? 'Try adjusting your search' : 'Get started by adding your first event'}
              </p>
              <button
                onClick={() => handleAction('add')}
                className="px-4 py-2 bg-orange-500 text-white text-sm font-medium rounded hover:bg-orange-600 transition-colors inline-flex items-center gap-2"
              >
                <PlusCircle className="w-4 h-4" />
                Add New Event
              </button>
            </div>
          )}
        </div>

        {/* Bottom Section - EXACT match */}
        <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg border border-gray-200 p-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-center sm:text-left">
              <p className="text-sm text-gray-600">Need help with events?</p>
              <p className="text-[14px] text-gray-800">Contact events team: +91 98765 43210</p>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 text-sm bg-gray-100 text-gray-800 rounded border border-gray-300 hover:bg-gray-200">
                View Calendar
              </button>
              <button className="px-3 py-1.5 text-sm bg-gradient-to-r from-orange-300 to-orange-300 text-gray-800 hover:text-white rounded hover:from-orange-500 hover:to-orange-600">
                Event Guidelines
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showModal && <EventModal />}
      {showDeleteConfirm && <DeleteConfirmModal />}
    </div>
  );
};

export default OrganizerEvents;
