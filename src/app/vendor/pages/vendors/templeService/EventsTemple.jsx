import React, { useState } from 'react';
import {
  // Core Icons
  CalendarDays,
  Clock,
  MapPin,
  Users,
  UserCircle,
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
  Heart,
  Share2,
  Camera,
  FileText,
  Mail,
  Phone,
  Save
} from 'lucide-react';
import image1 from "../../../../../assets/vendor/eventTemple/Mahashivratri Celebration.webp"
import image2 from "../../../../../assets/vendor/eventTemple/Ram Navami.webp"
import image3 from "../../../../../assets/vendor/eventTemple/Hanuman Jayanti.webp"
import image4 from "../../../../../assets/vendor/eventTemple/Annakut Utsav.webp"
import image5 from "../../../../../assets/vendor/eventTemple/Gita Jayanti.webp"
import image6 from "../../../../../assets/vendor/eventTemple/Weekly Bhajan Sandhya.webp"

const EventsTemple = () => {
  const [filter, setFilter] = useState('upcoming');
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showRegistrationsModal, setShowRegistrationsModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // ============ EVENTS DATA ============
  const [events, setEvents] = useState([
    {
      id: 'EVT-001',
      name: 'Mahashivratri Celebration',
      description: 'Grand celebration of Lord Shiva with night-long prayers, abhishek, and cultural programs.',
      date: '26 Feb 2026',
      day: 'Thursday',
      time: '06:00 PM - 06:00 AM',
      duration: '12 hours',
      venue: 'Main Temple Hall',
      address: 'Shri Ram Mandir, Juhu, Mumbai',
      category: 'festival',
      status: 'upcoming',
      priority: 'critical',
      registrations: 345,
      capacity: 500,
      registeredDevotees: 345,
      waitlist: 12,
      poster: 'https://images.unsplash.com/photo-1627896162219-5a1f1906c7b2?w=500',
      image: image1,
      organizers: ['Pandit Ravi Shastri', 'Shri Ram Seva Mandal'],
      contact: '+91 98765 43210',
      email: 'events@rammandir.com',
      price: 'Free',
      read: false,
      featured: true
    },
    {
      id: 'EVT-002',
      name: 'Ram Navami',
      description: 'Celebration of Lord Rama\'s birth with special puja, bhajans, and Ramayan recitation.',
      date: '06 Apr 2026',
      day: 'Monday',
      time: '05:00 AM - 10:00 PM',
      duration: '17 hours',
      venue: 'Main Temple Hall',
      address: 'Shri Ram Mandir, Juhu, Mumbai',
      category: 'festival',
      status: 'upcoming',
      priority: 'high',
      registrations: 245,
      capacity: 400,
      registeredDevotees: 245,
      waitlist: 8,
      poster: 'https://images.unsplash.com/photo-1580746887057-99d3a6ed8fae?w=500',
      image: image2,
      organizers: ['Pandit Suresh Joshi', 'Bhakta Mandal'],
      contact: '+91 98765 43211',
      email: 'ramnavami@rammandir.com',
      price: 'Free',
      read: true,
      featured: true
    },
    {
      id: 'EVT-003',
      name: 'Hanuman Jayanti',
      description: 'Birth celebration of Lord Hanuman with special abhishek, Sundarkand path, and prasad.',
      date: '12 Apr 2026',
      day: 'Sunday',
      time: '05:30 AM - 09:00 PM',
      duration: '15.5 hours',
      venue: 'Hanuman Temple',
      address: 'Shri Ram Mandir Complex, Juhu, Mumbai',
      category: 'festival',
      status: 'upcoming',
      priority: 'high',
      registrations: 189,
      capacity: 350,
      registeredDevotees: 189,
      waitlist: 5,
      poster: 'https://images.unsplash.com/photo-1627896161898-6c1b8a2d0b7a?w=500',
      image: image3,
      organizers: ['Pandit Mahesh Upadhyay'],
      contact: '+91 98765 43212',
      email: 'hanuman@rammandir.com',
      price: 'Free',
      read: false,
      featured: false
    },
    {
      id: 'EVT-004',
      name: 'Annakut Utsav',
      description: 'Govardhan Puja celebration with 56 types of bhog, cultural performances, and fireworks.',
      date: '15 Nov 2026',
      day: 'Sunday',
      time: '08:00 AM - 10:00 PM',
      duration: '14 hours',
      venue: 'Temple Ground',
      address: 'Shri Ram Mandir Ground, Juhu, Mumbai',
      category: 'utsav',
      status: 'planning',
      priority: 'medium',
      registrations: 0,
      capacity: 1000,
      registeredDevotees: 0,
      waitlist: 0,
      poster: 'https://images.unsplash.com/photo-1627896162345-6c1b8a2d0b7b?w=500',
      image: image4,
      organizers: ['Temple Management Committee'],
      contact: '+91 98765 43213',
      email: 'annakut@rammandir.com',
      price: 'Free',
      read: true,
      featured: false
    },
    {
      id: 'EVT-005',
      name: 'Gita Jayanti',
      description: 'Celebration of Bhagavad Gita with discourse, shloka chanting, and quiz competitions.',
      date: '17 Dec 2026',
      day: 'Thursday',
      time: '09:00 AM - 08:00 PM',
      duration: '11 hours',
      venue: 'Main Temple Hall',
      address: 'Shri Ram Mandir, Juhu, Mumbai',
      category: 'spiritual',
      status: 'planning',
      priority: 'medium',
      registrations: 0,
      capacity: 300,
      registeredDevotees: 0,
      waitlist: 0,
      poster: 'https://images.unsplash.com/photo-1627896162567-8c9e3b4f0a1c?w=500',
      image: image5,
      organizers: ['Gita Study Circle'],
      contact: '+91 98765 43214',
      email: 'gita@rammandir.com',
      price: 'Free',
      read: true,
      featured: false
    },
    {
      id: 'EVT-006',
      name: 'Weekly Bhajan Sandhya',
      description: 'Every Saturday evening devotional singing with kirtan and aarti.',
      date: 'Every Saturday',
      day: 'Saturday',
      time: '06:30 PM - 08:30 PM',
      duration: '2 hours',
      venue: 'Bhajan Hall',
      address: 'Shri Ram Mandir, Juhu, Mumbai',
      category: 'regular',
      status: 'ongoing',
      priority: 'low',
      registrations: 45,
      capacity: 100,
      registeredDevotees: 45,
      waitlist: 0,
      poster: 'https://images.unsplash.com/photo-1627896162789-9e3e3c4a5b6d?w=500',
      image: image6,
      organizers: ['Bhajan Mandali'],
      contact: '+91 98765 43215',
      email: 'bhajan@rammandir.com',
      price: 'Free',
      read: false,
      featured: false
    }
  ]);

  // ============ REGISTRATIONS DATA ============
  const [registrations, setRegistrations] = useState([
    {
      id: 'REG-001',
      eventId: 'EVT-001',
      devotee: 'Rajesh Kumar',
      avatar: 'RK',
      date: '22 Feb 2026',
      time: '10:23 AM',
      slots: 4,
      phone: '+91 98765 43210',
      email: 'rajesh.k@email.com',
      status: 'confirmed',
      amount: 0
    },
    {
      id: 'REG-002',
      eventId: 'EVT-001',
      devotee: 'Priya Sharma',
      avatar: 'PS',
      date: '22 Feb 2026',
      time: '09:45 AM',
      slots: 2,
      phone: '+91 98765 43211',
      email: 'priya.s@email.com',
      status: 'confirmed',
      amount: 0
    },
    {
      id: 'REG-003',
      eventId: 'EVT-001',
      devotee: 'Amit Patel',
      avatar: 'AP',
      date: '21 Feb 2026',
      time: '04:30 PM',
      slots: 6,
      phone: '+91 98765 43212',
      email: 'amit.p@email.com',
      status: 'confirmed',
      amount: 0
    },
    {
      id: 'REG-004',
      eventId: 'EVT-002',
      devotee: 'Sneha Reddy',
      avatar: 'SR',
      date: '22 Feb 2026',
      time: '11:15 AM',
      slots: 3,
      phone: '+91 98765 43213',
      email: 'sneha.r@email.com',
      status: 'waitlist',
      amount: 0
    },
    {
      id: 'REG-005',
      eventId: 'EVT-002',
      devotee: 'Vikram Singh',
      avatar: 'VS',
      date: '21 Feb 2026',
      time: '02:20 PM',
      slots: 5,
      phone: '+91 98765 43214',
      email: 'vikram.s@email.com',
      status: 'confirmed',
      amount: 0
    }
  ]);

  // ============ EVENT STATS ============
  const stats = {
    total: events.length,
    upcoming: events.filter(e => e.status === 'upcoming').length,
    ongoing: events.filter(e => e.status === 'ongoing').length,
    planning: events.filter(e => e.status === 'planning').length,
    totalRegistrations: events.reduce((acc, e) => acc + e.registrations, 0),
    totalCapacity: events.reduce((acc, e) => acc + e.capacity, 0),
    featured: events.filter(e => e.featured).length
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

  // ============ ADD EVENT MODAL ============
const AddEventModal = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    date: '',
    day: '',
    time: '',
    duration: '',
    venue: '',
    address: '',
    category: 'festival',
    status: 'planning',
    priority: 'medium',
    capacity: '',
    price: 'Free',
    contact: '',
    email: '',
    organizers: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Calculate day from date if needed
    const dateObj = new Date(formData.date);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayName = days[dateObj.getDay()];
    
    const newEvent = {
      id: `EVT-${String(events.length + 1).padStart(3, '0')}`,
      name: formData.name,
      description: formData.description,
      date: formData.date,
      day: dayName || formData.day,
      time: formData.time,
      duration: formData.duration || '2 hours',
      venue: formData.venue,
      address: formData.address,
      category: formData.category,
      status: formData.status,
      priority: formData.priority,
      capacity: parseInt(formData.capacity) || 100,
      registeredDevotees: 0,
      registrations: 0,
      waitlist: 0,
      poster: 'https://images.unsplash.com/photo-1627896162219-5a1f1906c7b2?w=500',
      image: image1,
      organizers: formData.organizers.split(',').map(o => o.trim()),
      contact: formData.contact,
      email: formData.email,
      price: formData.price,
      read: false,
      featured: false
    };

    setEvents(prev => [newEvent, ...prev]);
    setShowAddModal(false);
    setFormData({
      name: '',
      description: '',
      date: '',
      day: '',
      time: '',
      duration: '',
      venue: '',
      address: '',
      category: 'festival',
      status: 'planning',
      priority: 'medium',
      capacity: '',
      price: 'Free',
      contact: '',
      email: '',
      organizers: ''
    });
  };

  if (!showAddModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 px-4 py-3 border-b border-orange-100 sticky top-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-orange-50 rounded flex items-center justify-center">
                <PlusCircle className="w-5 h-5 text-orange-500" />
              </div>
              <h3 className="text-[15px] font-bold text-gray-800">
                Add New Event
              </h3>
            </div>
            <button 
              onClick={() => setShowAddModal(false)}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Poster Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Event Poster
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-orange-300 transition-colors">
              <div className="flex flex-col items-center">
                <div className="p-3 bg-gray-50 rounded-full mb-2">
                  <Upload className="w-6 h-6 text-gray-400" />
                </div>
                <p className="text-sm font-medium text-gray-700">Click to upload poster</p>
                <p className="text-xs text-gray-500 mt-1">PNG, JPG, JPEG up to 5MB</p>
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
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Mahashivratri Celebration"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm"
              required
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
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  placeholder="26 Feb 2026"
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Day
              </label>
              <input
                type="text"
                name="day"
                value={formData.day}
                onChange={handleChange}
                placeholder="Thursday (auto-calculated)"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm bg-gray-50"
                readOnly
              />
            </div>
          </div>

          {/* Time & Duration Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  placeholder="06:00 PM - 06:00 AM"
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Duration
              </label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="12 hours"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm"
              />
            </div>
          </div>

          {/* Venue & Address */}
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
                name="venue"
                value={formData.venue}
                onChange={handleChange}
                placeholder="Main Temple Hall"
                className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Shri Ram Mandir, Juhu, Mumbai"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              placeholder="Describe the event, schedule, and special highlights..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm"
            />
          </div>

          {/* Category, Status, Priority Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm"
              >
                <option value="festival">Festival</option>
                <option value="utsav">Utsav</option>
                <option value="spiritual">Spiritual</option>
                <option value="regular">Regular</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm"
              >
                <option value="planning">Planning</option>
                <option value="upcoming">Upcoming</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Priority
              </label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm"
              >
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>

          {/* Capacity & Price Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Capacity
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Users className="w-4 h-4 text-gray-400" />
                </div>
                <input
                  type="number"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleChange}
                  placeholder="500"
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price
              </label>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Free"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm"
              />
            </div>
          </div>

          {/* Contact & Email Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contact Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="w-4 h-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
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
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="events@rammandir.com"
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm"
                />
              </div>
            </div>
          </div>

          {/* Organizers */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Organizers
            </label>
            <input
              type="text"
              name="organizers"
              value={formData.organizers}
              onChange={handleChange}
              placeholder="Pandit Ravi Shastri, Shri Ram Seva Mandal (comma separated)"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm"
            />
          </div>

          {/* Modal Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="px-4 py-2 text-sm bg-gray-100 text-gray-800 rounded border border-gray-300 hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Create Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

  const getCategoryBg = (category) => {
    switch(category) {
      case 'festival': return 'bg-orange-50';
      case 'utsav': return 'bg-purple-50';
      case 'spiritual': return 'bg-yellow-50';
      case 'regular': return 'bg-blue-50';
      default: return 'bg-gray-100';
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
      case 'completed':
        return `${base} bg-gray-100 text-gray-600`;
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
        if (window.confirm(`Are you sure you want to delete ${event.name}?`)) {
          setEvents(prev => prev.filter(e => e.id !== event.id));
        }
        break;
      
      case 'viewRegistrations':
        setSelectedEvent(event);
        setShowRegistrationsModal(true);
        break;
      
      case 'markAsRead':
        setEvents(prev => prev.map(e => 
          e.id === event.id ? { ...e, read: true } : e
        ));
        break;
      
      case 'feature':
        setEvents(prev => prev.map(e => 
          e.id === event.id ? { ...e, featured: !e.featured } : e
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
      event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.category.toLowerCase().includes(searchQuery.toLowerCase())
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
          <form onSubmit={(e) => { e.preventDefault(); setShowModal(false); }} className="p-6 space-y-4">
            {/* Poster Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Poster
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-orange-300 transition-colors">
                <div className="flex flex-col items-center">
                  <div className="p-3 bg-gray-50 rounded-full mb-2">
                    <Upload className="w-6 h-6 text-gray-400" />
                  </div>
                  <p className="text-sm font-medium text-gray-700">Click to upload poster</p>
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG, JPEG up to 5MB</p>
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
                defaultValue={selectedEvent?.name || ''}
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
                    defaultValue={selectedEvent?.date || ''}
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
                    defaultValue={selectedEvent?.time || ''}
                    placeholder="06:00 PM - 06:00 AM"
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Venue & Capacity Row */}
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
                  Capacity
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
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                rows="3"
                defaultValue={selectedEvent?.description || ''}
                placeholder="Describe the event, schedule, and special highlights..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm"
              />
            </div>

            {/* Category & Status Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  defaultValue={selectedEvent?.status || 'planning'}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm"
                >
                  <option value="planning">Planning</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
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
                {modalMode === 'add' ? 'Create Event' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // ============ REGISTRATIONS MODAL ============
  const RegistrationsModal = () => {
    if (!showRegistrationsModal || !selectedEvent) return null;

    const eventRegistrations = registrations.filter(r => r.eventId === selectedEvent.id);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
          {/* Modal Header - EXACT match */}
          <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 px-4 py-3 border-b border-orange-100 sticky top-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-orange-50 rounded flex items-center justify-center">
                  <Users className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-gray-800">
                    Registrations - {selectedEvent.name}
                  </h3>
                  <p className="text-xs text-gray-600 mt-0.5">
                    {selectedEvent.registeredDevotees} registered • {selectedEvent.capacity - selectedEvent.registeredDevotees} spots left
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setShowRegistrationsModal(false)}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Modal Content */}
          <div className="p-6">
            {/* Stats Summary */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="p-3 bg-blue-50 rounded-lg text-center">
                <p className="text-xs text-gray-600">Registered</p>
                <p className="text-xl font-bold text-blue-600 mt-1">{selectedEvent.registeredDevotees}</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg text-center">
                <p className="text-xs text-gray-600">Capacity</p>
                <p className="text-xl font-bold text-green-600 mt-1">{selectedEvent.capacity}</p>
              </div>
              <div className="p-3 bg-orange-50 rounded-lg text-center">
                <p className="text-xs text-gray-600">Waitlist</p>
                <p className="text-xl font-bold text-orange-500 mt-1">{selectedEvent.waitlist}</p>
              </div>
            </div>

            {/* Registrations List */}
            <div className="space-y-3">
              {eventRegistrations.map((reg) => (
                <div key={reg.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-orange-700">{reg.avatar}</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-800">{reg.devotee}</h4>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-gray-600 flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {reg.slots} slots
                        </span>
                        <span className="text-xs text-gray-600 flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {reg.phone}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      reg.status === 'confirmed' ? 'bg-green-50 text-green-700' : 'bg-orange-50 text-orange-500'
                    }`}>
                      {reg.status}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">{reg.date}</p>
                  </div>
                </div>
              ))}

              {eventRegistrations.length === 0 && (
                <div className="p-8 text-center">
                  <div className="p-3 rounded-full inline-flex items-center justify-center mb-3 bg-gray-100">
                    <Users className="w-8 h-8 text-gray-400" />
                  </div>
                  <h4 className="text-sm font-medium text-gray-800">No registrations yet</h4>
                  <p className="text-xs text-gray-600 mt-1">Be the first to promote this event</p>
                </div>
              )}
            </div>

            {/* Export Button */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <button className="w-full px-3 py-2 bg-orange-50 text-orange-500 text-sm font-medium rounded border border-orange-300 hover:bg-orange-100 transition-colors flex items-center justify-center gap-2">
                <Download className="w-4 h-4" />
                Export Registrations List
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ============ EVENT CARD COMPONENT ============
 const EventCard = ({ event }) => {
    const CategoryIcon = getCategoryIcon(event.category);
    const categoryBg = getCategoryBg(event.category);
    const [imageError, setImageError] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    // Compute card border classes - single border only
    const getCardBorderClass = () => {
        if (!event.read) {
            return 'ring-2 ring-orange-200 ring-offset-2'; // Unread gets ring only
        }
        if (event.featured) {
            return 'border-2 border-orange-300'; // Featured read gets orange border
        }
        return 'border border-gray-200'; // Default card border
    };

    return (
        <div 
            className={`group bg-white rounded-lg overflow-hidden transition-all duration-300 ${getCardBorderClass()} 
                hover:shadow-xl hover:-translate-y-1 hover:border-orange-200`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Event Image */}
            <div className="relative h-44 bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 overflow-hidden">
                {!imageError ? (
                    <div className="relative w-full h-full">
                        <img 
                            src={event.image} 
                            alt={event.name}
                            className={`w-full h-full object-fill transition-all duration-500 ${
                                isHovered ? 'scale-110 brightness-110' : 'scale-100 brightness-95'
                            }`}
                            onError={() => setImageError(true)}
                        />
                        {/* Overlay gradient on hover */}
                        <div className={`absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent transition-opacity duration-300 ${
                            isHovered ? 'opacity-100' : 'opacity-0'
                        }`}></div>
                    </div>
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-50">
                        <ImageIcon className={`w-12 h-12 text-gray-400 transition-all duration-300 ${
                            isHovered ? 'scale-110 text-gray-500' : ''
                        }`} />
                    </div>
                )}
                
                {/* Badges */}
                <div className="absolute top-2 left-2 flex gap-1">
                    <span className={`${getStatusStyles(event.status)} transition-all duration-300 ${
                        isHovered ? 'scale-105 shadow-md' : ''
                    }`}>
                        {event.status}
                    </span>
                    {event.featured && (
                        <span className="px-2 py-0.5 bg-yellow-50 text-yellow-600 rounded-full text-xs font-medium flex items-center gap-1 border border-yellow-200 transition-all duration-300 hover:bg-yellow-100 hover:shadow-md">
                            <Star className="w-3 h-3 fill-yellow-500" />
                            Featured
                        </span>
                    )}
                </div>
                
                {/* Category Icon */}
                <div className="absolute top-2 right-2">
                    <div className={`p-1.5 ${categoryBg} rounded-lg shadow-sm transition-all duration-300 ${
                        isHovered ? 'scale-110 shadow-lg' : ''
                    }`}>
                        {CategoryIcon}
                    </div>
                </div>
                
                {/* Unread Dot - Pulsing effect */}
                {!event.read && (
                    <div className="absolute bottom-2 right-2">
                        <div className="relative">
                            <div className="w-3 h-3 bg-orange-500 rounded-full ring-2 ring-white"></div>
                            <div className="absolute inset-0 w-3 h-3 bg-orange-500 rounded-full animate-ping opacity-75"></div>
                        </div>
                    </div>
                )}
            </div>

            {/* Event Details */}
            <div className={`p-4 transition-all duration-300 ${
                isHovered ? 'bg-gradient-to-b from-white to-orange-50/30' : ''
            }`}>
                {/* Title & Priority */}
                <div className="flex items-start justify-between mb-2">
                    <h3 className={`text-[14px] font-semibold text-gray-800 line-clamp-1 flex-1 transition-all duration-300 ${
                        isHovered ? 'text-orange-600' : ''
                    }`}>
                        {event.name}
                    </h3>
                    <span className={`${getPriorityStyles(event.priority)} transition-all duration-300 ${
                        isHovered ? 'scale-105 shadow-sm' : ''
                    }`}>
                        {event.priority}
                    </span>
                </div>

                {/* Description */}
                <p className={`text-xs text-gray-600 mb-3 line-clamp-2 transition-all duration-300 ${
                    isHovered ? 'text-gray-700' : ''
                }`}>
                    {event.description}
                </p>

                {/* Event Meta */}
                <div className="space-y-2 mb-3">
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                        <CalendarDays className={`w-3.5 h-3.5 flex-shrink-0 transition-all duration-300 ${
                            isHovered ? 'text-orange-500' : ''
                        }`} />
                        <span className="truncate">{event.date} • {event.day}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                        <Clock className={`w-3.5 h-3.5 flex-shrink-0 transition-all duration-300 ${
                            isHovered ? 'text-orange-500' : ''
                        }`} />
                        <span className="truncate">{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                        <MapPin className={`w-3.5 h-3.5 flex-shrink-0 transition-all duration-300 ${
                            isHovered ? 'text-orange-500' : ''
                        }`} />
                        <span className="truncate">{event.venue}</span>
                    </div>
                </div>

                {/* Registration Progress */}
                <div className="mb-3">
                    <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-600">Registrations</span>
                        <span className="text-xs font-medium text-gray-800">
                            {event.registeredDevotees}/{event.capacity}
                        </span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                            className={`h-full bg-gradient-to-r from-orange-400 to-orange-500 rounded-full transition-all duration-500 ${
                                isHovered ? 'from-orange-500 to-orange-600' : ''
                            }`}
                            style={{ width: `${(event.registeredDevotees / event.capacity) * 100}%` }}
                        ></div>
                    </div>
                    {event.waitlist > 0 && (
                        <p className="text-xs text-orange-500 mt-1 animate-pulse">
                            {event.waitlist} on waitlist
                        </p>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100">
                    <button
                        onClick={() => handleAction('viewRegistrations', event)}
                        className="px-2.5 py-1 text-xs bg-orange-50 text-orange-500 rounded border border-orange-300 hover:bg-orange-100 hover:border-orange-400 hover:shadow-md hover:scale-105 transition-all duration-200 flex items-center gap-1"
                    >
                        <Users className="w-3 h-3" />
                        Registrations ({event.registeredDevotees})
                    </button>
                    
                    <button
                        onClick={() => handleAction('edit', event)}
                        className="px-2.5 py-1 text-xs bg-gray-100 text-gray-800 rounded border border-gray-300 hover:bg-gray-200 hover:border-gray-400 hover:shadow-md hover:scale-105 transition-all duration-200 flex items-center gap-1"
                    >
                        <Edit3 className="w-3 h-3" />
                        Edit
                    </button>
                    
                    <button
                        onClick={() => handleAction('feature', event)}
                        className={`px-2.5 py-1 text-xs rounded border flex items-center gap-1 transition-all duration-200 ${
                            event.featured
                                ? 'bg-yellow-50 text-yellow-600 border-yellow-300 hover:bg-yellow-100 hover:border-yellow-400 hover:shadow-md hover:scale-105'
                                : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50 hover:border-gray-400 hover:shadow-md hover:scale-105'
                        }`}
                    >
                        <Star className={`w-3 h-3 ${event.featured ? 'fill-yellow-500' : ''}`} />
                        {event.featured ? 'Featured' : 'Feature'}
                    </button>
                    
                    <button
                        onClick={() => handleAction('delete', event)}
                        className="px-2.5 py-1 text-xs bg-white text-red-600 rounded border border-red-300 hover:bg-red-50 hover:border-red-400 hover:shadow-md hover:scale-105 transition-all duration-200 flex items-center gap-1"
                    >
                        <Trash2 className="w-3 h-3" />
                        Delete
                    </button>

                    {!event.read && (
                        <button
                            onClick={() => handleAction('markAsRead', event)}
                            className="px-2.5 py-1 text-xs bg-gray-100 text-gray-800 rounded border border-gray-300 hover:bg-gray-200 hover:border-gray-400 hover:shadow-md hover:scale-105 transition-all duration-200"
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

      {/* Header - EXACT match to NotificationsPuja */}
      <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 px-3 py-1.5 border border-orange-100">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <div className="text-left sm:text-left flex-1 md:flex">
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold uppercase leading-tight text-orange-900">
              Temple Events
            </h1>
            <p className="text-sm text-gray-600 mt-1 md:mt-2.5 lg:mt-2.5">
              Manage festivals, programs & celebrations
            </p>
          </div>
          
          {/* Notification Bell & Add Button - EXACT match */}
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

      {/* Main Content - EXACT spacing match */}
      <div className="space-y-4 p-6">
        {/* Welcome Section - EXACT match */}
        <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg px-3 py-2 border border-orange-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <p className="text-[17px] text-gray-600">
                {stats.upcoming} upcoming events • {stats.totalRegistrations} total registrations
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm text-gray-600">Featured Events</p>
                <p className="text-[15px] font-semibold text-orange-500">
                  {stats.featured} active
                </p>
              </div>
              <div className="w-8 h-8 bg-orange-50 rounded flex items-center justify-center">
                <Star className="w-5 h-5 text-orange-500 fill-orange-500" />
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

          {/* Ongoing Events */}
          <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg border border-gray-200 px-3 py-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Ongoing</p>
                <p className="text-xl font-semibold text-gray-800 mt-1">{stats.ongoing}</p>
                <div className="flex items-center gap-1 mt-2">
                  <Users className="w-3 h-3 text-green-600" />
                  <span className="text-sm text-green-600">{stats.ongoing} active</span>
                </div>
              </div>
              <div className="p-2 bg-green-50 rounded">
                <Users className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </div>

          {/* Total Registrations */}
          <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg border border-gray-200 px-3 py-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Registrations</p>
                <p className="text-xl font-semibold text-gray-800 mt-1">{stats.totalRegistrations}</p>
                <p className="text-xs text-purple-600 mt-2">{Math.round(stats.totalRegistrations / stats.total)} avg/event</p>
              </div>
              <div className="p-2 bg-purple-50 rounded">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

          {/*Add Event */}
          <div className='flex justify-end'>
              <button
              onClick={() => setShowAddModal(true)}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                {searchQuery ? 'Try adjusting your search or filters' : 'Get started by adding your first event'}
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
              <p className="text-sm text-gray-600">Need help with event management?</p>
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
      <EventModal />
      <RegistrationsModal />
      <AddEventModal/>
    </div>
  );
};

export default EventsTemple;
