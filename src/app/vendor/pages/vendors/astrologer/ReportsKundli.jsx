import { useState } from 'react';
import { 
  User, Star, Calendar, Phone, Mail, 
  MapPin, Clock, FileText, Edit, Trash2,
  Filter, Search, Plus, Download, Share2,
  MoreVertical, ChevronDown, ChevronUp,
  BookOpen, History, Heart, Eye,
  X, Shield, AlertCircle, CheckCircle,
  BarChart, Globe, Home, Building,
  Hash, Cloud,
  Database, Lock, Unlock, Users
} from 'lucide-react';

import VendorPageHeader from '../../../components/VendorPageHeader';

const ReportsKundli = () => {
  const [activeTab, setActiveTab] = useState('clients');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showKundliModal, setShowKundliModal] = useState(false);
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterGender, setFilterGender] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  // Tabs
  const tabs = [
    { id: 'clients', label: 'Clients', count: 48, icon: Users },
    { id: 'kundlis', label: 'Kundlis', count: 32, icon: BookOpen },
    { id: 'favorites', label: 'Favorites', count: 18, icon: Heart },
    { id: 'recent', label: 'Recent', count: 12, icon: History }
  ];

  // Sample clients data
  const clients = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      gender: 'male',
      age: 38,
      phone: '+91 98765 43210',
      email: 'rajesh.k@gmail.com',
      location: 'Mumbai, Maharashtra',
      status: 'active',
      isFavorite: true,
      lastConsultation: '2024-01-15',
      totalConsultations: 7,
      kundliSaved: true,
      notes: 'Regular client, interested in career guidance',
      birthDetails: {
        date: '1986-07-15',
        time: '08:30 AM',
        place: 'Mumbai',
        coordinates: '18.9750° N, 72.8258° E'
      }
    },
    {
      id: 2,
      name: 'Priya Sharma',
      gender: 'female',
      age: 32,
      phone: '+91 87654 32109',
      email: 'priya.s@email.com',
      location: 'Delhi, NCR',
      status: 'active',
      isFavorite: true,
      lastConsultation: '2024-01-14',
      totalConsultations: 12,
      kundliSaved: true,
      notes: 'Marriage consultation pending',
      birthDetails: {
        date: '1992-03-22',
        time: '03:15 PM',
        place: 'Delhi',
        coordinates: '28.6139° N, 77.2090° E'
      }
    },
    {
      id: 3,
      name: 'Amit Patel',
      gender: 'male',
      age: 45,
      phone: '+91 76543 21098',
      email: 'amit.p@email.com',
      location: 'Ahmedabad, Gujarat',
      status: 'inactive',
      isFavorite: false,
      lastConsultation: '2023-12-10',
      totalConsultations: 3,
      kundliSaved: false,
      notes: 'Follow up needed for business consultation',
      birthDetails: {
        date: '1979-11-05',
        time: '10:45 AM',
        place: 'Ahmedabad',
        coordinates: '23.0225° N, 72.5714° E'
      }
    },
    {
      id: 4,
      name: 'Sonia Verma',
      gender: 'female',
      age: 28,
      phone: '+91 65432 10987',
      email: 'sonia.v@gmail.com',
      location: 'Bangalore, Karnataka',
      status: 'active',
      isFavorite: false,
      lastConsultation: '2024-01-12',
      totalConsultations: 5,
      kundliSaved: true,
      notes: 'Health-related queries',
      birthDetails: {
        date: '1996-08-30',
        time: '06:20 AM',
        place: 'Bangalore',
        coordinates: '12.9716° N, 77.5946° E'
      }
    },
    {
      id: 5,
      name: 'Vikram Singh',
      gender: 'male',
      age: 52,
      phone: '+91 54321 09876',
      email: 'vikram.s@email.com',
      location: 'Lucknow, Uttar Pradesh',
      status: 'active',
      isFavorite: true,
      lastConsultation: '2024-01-10',
      totalConsultations: 15,
      kundliSaved: true,
      notes: 'VIP client, long-term relationship',
      birthDetails: {
        date: '1972-01-18',
        time: '11:11 PM',
        place: 'Lucknow',
        coordinates: '26.8467° N, 80.9462° E'
      }
    }
  ];

  // Sample kundlis data
  const kundlis = [
    {
      id: 1,
      clientId: 1,
      clientName: 'Rajesh Kumar',
      chartType: 'Vedic',
      createdAt: '2024-01-10',
      lastUpdated: '2024-01-15',
      status: 'active',
      predictions: ['Career growth in 2024', 'Health needs attention'],
      isFavorite: true
    },
    {
      id: 2,
      clientId: 2,
      clientName: 'Priya Sharma',
      chartType: 'Matching',
      createdAt: '2024-01-05',
      lastUpdated: '2024-01-14',
      status: 'active',
      predictions: ['Marriage compatibility good', 'Travel opportunities'],
      isFavorite: true
    }
  ];

  // Sample consultation history
  const consultationHistory = [
    { id: 1, clientId: 1, date: '2024-01-15', type: 'Video Call', topic: 'Career Guidance', duration: '45 mins', notes: 'Positive response to suggestions' },
    { id: 2, clientId: 1, date: '2023-12-20', type: 'Chat', topic: 'Health Consultation', duration: '30 mins', notes: 'Follow-up scheduled' },
    { id: 3, clientId: 1, date: '2023-11-25', type: 'Video Call', topic: 'Financial Planning', duration: '60 mins', notes: 'Investment advice given' },
  ];

  // Stats
  const stats = [
    { title: 'Total Clients', value: '48', change: '+8%', icon: Users, color: 'orange' },
    { title: 'Kundlis Saved', value: '32', change: '+12%', icon: BookOpen, color: 'blue' },
    { title: 'Repeat Clients', value: '28', change: '+15%', icon: History, color: 'green' },
    { title: 'Avg. Sessions', value: '4.2', change: '+0.3', icon: BarChart, color: 'purple' }
  ];

  // Filtered clients
  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.notes.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || client.status === filterStatus;
    const matchesGender = filterGender === 'all' || client.gender === filterGender;
    
    return matchesSearch && matchesStatus && matchesGender;
  });

  // Format date
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  // Custom Gender Icon Component
  const GenderIcon = ({ gender, className = "w-4 h-4" }) => {
    if (gender === 'male') {
      return (
        <div className={`${className} rounded-full bg-blue-100 flex items-center justify-center`}>
          <span className="text-blue-600 text-base font-bold">M</span>
        </div>
      );
    } else {
      return (
        <div className={`${className} rounded-full bg-pink-100 flex items-center justify-center`}>
          <span className="text-pink-600 text-base font-bold">F</span>
        </div>
      );
    }
  };

  // Get gender icon
  const getGenderIcon = (gender) => {
    return <GenderIcon gender={gender} className="w-8 h-8" />;
  };

  // Get small gender icon
  const getSmallGenderIcon = (gender) => {
    return <GenderIcon gender={gender} className="w-4 h-4" />;
  };

  // Get status badge
  const getStatusBadge = (status) => {
    return status === 'active' ? 
      <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-200 text-xs font-medium">
        <CheckCircle className="w-3 h-3" /> Active
      </span> : 
      <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-200 text-xs font-medium">
        <AlertCircle className="w-3 h-3" /> Inactive
      </span>;
  };

  // Client Card Component
  const ClientCard = ({ client }) => {
    const [showActions, setShowActions] = useState(false);

    return (
      <div className="bg-white rounded-lg border border-gray-200 shadow-xs hover:shadow-sm transition-all">
        <div className="p-3">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-start gap-2">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0  ${
                client.gender === 'male' ? 'bg-blue-100 ' : 'bg-pink-100'
              }`}>
                {getGenderIcon(client.gender)}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-semibold text-gray-800 text-base">{client.name}</h3>
                  {client.isFavorite && (
                    <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                  )}
                  {client.kundliSaved && (
                    <BookOpen className="w-3.5 h-3.5 text-green-500" />
                  )}
                </div>
                <p className="text-xs text-gray-600 mt-0.5">{client.age} years • {client.location}</p>
                <div className="flex items-center gap-1.5 mt-1">
                  {getStatusBadge(client.status)}
                </div>
              </div>
            </div>
            
            <div className="relative">
              <button 
                onClick={() => setShowActions(!showActions)}
                className="p-1 hover:bg-gray-100 rounded text-gray-500"
              >
                <MoreVertical className="w-4 h-4" />
              </button>
              
              {showActions && (
                <div className="absolute right-0 top-6 bg-white border border-gray-200 rounded-lg shadow-lg z-10 w-40">
                  <button 
                    onClick={() => {
                      setSelectedClient(client);
                      setShowNotesModal(true);
                    }}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex items-center gap-2"
                  >
                    <Edit className="w-3 h-3" /> Edit Notes
                  </button>
                  <button 
                    onClick={() => setSelectedClient(client)}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex items-center gap-2"
                  >
                    <Eye className="w-3 h-3" /> View Details
                  </button>
                  <button 
                    onClick={() => setShowKundliModal(true)}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex items-center gap-2"
                  >
                    <BookOpen className="w-3 h-3" /> View Kundli
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
                    <Trash2 className="w-3 h-3" /> Archive
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-gray-500" />
              <span className="text-xs text-gray-700 truncate">{client.phone}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-gray-500" />
              <span className="text-xs text-gray-700 truncate">{client.email}</span>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex items-center justify-between bg-gray-50 p-2 rounded mb-3">
            <div className="text-center">
              <div className="text-sm font-bold text-gray-800">{client.totalConsultations}</div>
              <div className="text-xs text-gray-600">Sessions</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-bold text-gray-800">
                {formatDate(client.lastConsultation)}
              </div>
              <div className="text-xs text-gray-600">Last Visit</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-bold text-gray-800">
                {client.kundliSaved ? 'Yes' : 'No'}
              </div>
              <div className="text-xs text-gray-600">Kundli</div>
            </div>
          </div>

          {/* Notes Preview */}
          <div className="pt-2 border-t border-gray-100">
            <p className="text-xs text-gray-600 line-clamp-2">{client.notes}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-gray-100">
            <button 
              onClick={() => setSelectedClient(client)}
              className="flex-1 px-2 py-1.5 bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded text-xs hover:from-orange-600 hover:to-orange-700"
            >
              View Profile
            </button>
            <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded">
              <Phone className="w-4 h-4" />
            </button>
            <button className="p-1.5 text-green-600 hover:bg-green-50 rounded">
              <Mail className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50/30">
      <VendorPageHeader 
        title="CLIENTS & KUNDLI LIBRARY" 
        subtitle="Manage client records and birth charts" 
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
                    <p className="text-[20px] font-semibold text-gray-800">{stat.value}</p>
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

        {/* Tabs */}
        <div className="bg-white p-2 rounded-lg border border-gray-200 shadow-xs">
          <div className="flex flex-wrap gap-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-orange-400 to-orange-500 text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
                <span className={`px-1.5 py-0.5 text-xs rounded-full ${
                  activeTab === tab.id
                    ? 'bg-white/20'
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-xs">
          <div className="flex flex-col sm:flex-row gap-2">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search clients by name, location, or notes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>
            
            {/* Desktop Filters */}
            <div className="hidden sm:flex gap-2">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-orange-500 focus:border-transparent min-w-[100px]"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              
              <select
                value={filterGender}
                onChange={(e) => setFilterGender(e.target.value)}
                className="px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-orange-500 focus:border-transparent min-w-[100px]"
              >
                <option value="all">All Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-orange-500 focus:border-transparent min-w-[120px]"
              >
                <option value="recent">Most Recent</option>
                <option value="name">Name (A-Z)</option>
                <option value="consultations">Most Sessions</option>
                <option value="favorites">Favorites First</option>
              </select>
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="sm:hidden flex items-center justify-center gap-1.5 px-3 py-2 border border-gray-300 rounded hover:bg-gray-50 text-sm"
            >
              <Filter className="w-4 h-4" />
              Filters
              {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          {/* Mobile Filters Dropdown */}
          {showFilters && (
            <div className="sm:hidden mt-3 p-3 border border-gray-200 rounded bg-gray-50">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-orange-500"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                  <select
                    value={filterGender}
                    onChange={(e) => setFilterGender(e.target.value)}
                    className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-orange-500"
                  >
                    <option value="all">All Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-orange-500"
                  >
                    <option value="recent">Most Recent</option>
                    <option value="name">Name (A-Z)</option>
                    <option value="consultations">Most Sessions</option>
                    <option value="favorites">Favorites First</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Content based on active tab */}
        {activeTab === 'clients' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredClients.map(client => (
              <ClientCard key={client.id} client={client} />
            ))}
          </div>
        )}

        {activeTab === 'kundlis' && (
          <div className="bg-white rounded-lg border border-gray-200 shadow-xs">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-base font-semibold text-gray-800">Saved Kundlis</h2>
              <p className="text-sm text-gray-600 mt-0.5">Access and manage all birth charts</p>
            </div>
            
            <div className="divide-y divide-gray-200">
              {kundlis.map(kundli => (
                <div key={kundli.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 
                                    flex items-center justify-center flex-shrink-0">
                        <BookOpen className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-gray-800 text-base">{kundli.clientName}</h3>
                          {kundli.isFavorite && (
                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          )}
                          <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                            {kundli.chartType}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-0.5">
                          Updated: {formatDate(kundli.lastUpdated)}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {kundli.predictions.map((pred, idx) => (
                            <span key={idx} className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded">
                              {pred}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-gray-600 hover:bg-gray-50 rounded">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-gray-600 hover:bg-gray-50 rounded">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'favorites' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {clients.filter(client => client.isFavorite).map(client => (
              <ClientCard key={client.id} client={client} />
            ))}
          </div>
        )}

        {activeTab === 'recent' && (
          <div className="bg-white rounded-lg border border-gray-200 shadow-xs">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-base font-semibold text-gray-800">Recent Activity</h2>
              <p className="text-sm text-gray-600 mt-0.5">Last 30 days client interactions</p>
            </div>
            
            <div className="divide-y divide-gray-200">
              {consultationHistory.map(session => (
                <div key={session.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-400 to-orange-500 
                                    flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-gray-800">{session.topic}</h3>
                          <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs font-medium rounded">
                            {session.type}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-0.5">
                          {formatDate(session.date)} • {session.duration}
                        </p>
                        <p className="text-sm text-gray-700 mt-2">{session.notes}</p>
                      </div>
                    </div>
                    <button className="p-1.5 text-orange-600 hover:bg-orange-50 rounded">
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {filteredClients.length === 0 && activeTab === 'clients' && (
          <div className="text-center py-8">
            <div className="w-12 h-12 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-3">
              <Users className="text-gray-400 w-6 h-6" />
            </div>
            <h3 className="text-base font-medium text-gray-700 mb-1.5">No clients found</h3>
            <p className="text-sm text-gray-500 mb-4 max-w-md mx-auto">
              {searchTerm ? 'Try adjusting your search terms' : 'Start by adding your first client'}
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 text-sm"
            >
              <Plus className="w-4 h-4" />
              Add First Client
            </button>
          </div>
        )}
      </div>

      {/* Add Client Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-3 sm:p-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-lg max-h-[85vh] overflow-y-auto">
            <div className="p-4 sm:p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-800">Add New Client</h2>
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="p-1 hover:bg-gray-100 rounded text-gray-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form className="space-y-4">
                {/* Basic Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Enter full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Gender *
                    </label>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        className="flex-1 p-2 border rounded text-center hover:bg-blue-50 transition-colors"
                      >
                        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-1">
                          <span className="text-blue-600 text-base font-bold">M</span>
                        </div>
                        <span className="text-sm text-gray-700">Male</span>
                      </button>
                      <button
                        type="button"
                        className="flex-1 p-2 border rounded text-center hover:bg-pink-50 transition-colors"
                      >
                        <div className="w-6 h-6 rounded-full bg-pink-100 flex items-center justify-center mx-auto mb-1">
                          <span className="text-pink-600 text-base font-bold">F</span>
                        </div>
                        <span className="text-sm text-gray-700">Female</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-orange-500 focus:border-transparent"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-orange-500 focus:border-transparent"
                      placeholder="client@email.com"
                    />
                  </div>
                </div>

                {/* Birth Details */}
                <div className="bg-gray-50 p-3 rounded-lg">
                  <h3 className="text-sm font-semibold text-gray-800 mb-2">Birth Details (For Kundli)</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Date of Birth *</label>
                      <input
                        type="date"
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Time of Birth *</label>
                      <input
                        type="time"
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs text-gray-600 mb-1">Place of Birth *</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-orange-500 focus:border-transparent"
                        placeholder="City, State, Country"
                      />
                    </div>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Initial Notes
                  </label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Add any important notes about the client..."
                  />
                </div>

                {/* Settings */}
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <label className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500 mt-0.5"
                    />
                    <div>
                      <span className="font-medium text-gray-800 text-sm">Mark as Favorite</span>
                      <p className="text-sm text-gray-600">Quick access from favorites</p>
                    </div>
                  </label>
                  
                  <label className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500 mt-0.5"
                    />
                    <div>
                      <span className="font-medium text-gray-800 text-sm">Generate Kundli</span>
                      <p className="text-sm text-gray-600">Create birth chart now</p>
                    </div>
                  </label>
                </div>

                {/* Modal Actions */}
                <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 pt-4 border-t">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 text-sm w-full sm:w-auto"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded hover:from-orange-600 hover:to-orange-700 text-sm w-full sm:w-auto"
                  >
                    Save Client
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Client Details Modal */}
      {selectedClient && !showNotesModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-4xl max-h-[85vh] overflow-y-auto">
            <div className="p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-800">Client Profile</h2>
                <button 
                  onClick={() => setSelectedClient(null)}
                  className="p-1 hover:bg-gray-100 rounded text-gray-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Client Header */}
              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-4 rounded-lg mb-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center ${
                    selectedClient.gender === 'male' ? 'bg-blue-100' : 'bg-pink-100'
                  }`}>
                    {getGenderIcon(selectedClient.gender)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="text-xl font-bold text-gray-800">{selectedClient.name}</h2>
                      {selectedClient.isFavorite && (
                        <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                      )}
                      {getStatusBadge(selectedClient.status)}
                    </div>
                    <p className="text-gray-600 mt-1">{selectedClient.age} years • {selectedClient.location}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-sm text-gray-700 flex items-center gap-1">
                        <Phone className="w-4 h-4" /> {selectedClient.phone}
                      </span>
                      <span className="text-sm text-gray-700 flex items-center gap-1">
                        <Mail className="w-4 h-4" /> {selectedClient.email}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded text-sm">
                      <Phone className="inline w-4 h-4 mr-1" />
                      Call
                    </button>
                    <button className="px-3 py-1.5 bg-gradient-to-r from-green-500 to-green-600 text-white rounded text-sm">
                      <Mail className="inline w-4 h-4 mr-1" />
                      Email
                    </button>
                  </div>
                </div>
              </div>

              {/* Tabs within Modal */}
              <div className="flex border-b border-gray-200 mb-4">
                <button className="px-4 py-2 border-b-2 border-orange-500 text-orange-600 font-medium">
                  Overview
                </button>
                <button className="px-4 py-2 text-gray-600 hover:text-gray-800">
                  Kundli Details
                </button>
                <button className="px-4 py-2 text-gray-600 hover:text-gray-800">
                  History
                </button>
                <button className="px-4 py-2 text-gray-600 hover:text-gray-800">
                  Notes
                </button>
              </div>

              {/* Two Column Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Left Column - Birth Details */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-3">Birth Details</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-gray-500">Date of Birth</label>
                      <div className="flex items-center gap-2 mt-1">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span className="font-medium">{formatDate(selectedClient.birthDetails.date)}</span>
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500">Time of Birth</label>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="font-medium">{selectedClient.birthDetails.time}</span>
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500">Place of Birth</label>
                      <div className="flex items-center gap-2 mt-1">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span className="font-medium">{selectedClient.birthDetails.place}</span>
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500">Coordinates</label>
                      <div className="mt-1">
                        <code className="text-xs bg-white px-2 py-1 rounded border border-gray-200">
                          {selectedClient.birthDetails.coordinates}
                        </code>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h4 className="font-medium text-gray-800 mb-2">Kundli Status</h4>
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full ${
                      selectedClient.kundliSaved 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {selectedClient.kundliSaved ? (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          Kundli Saved
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-4 h-4" />
                          Kundli Pending
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Column - Statistics */}
                <div className="space-y-4">
                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white p-3 rounded-lg border border-gray-200">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-800">{selectedClient.totalConsultations}</div>
                        <div className="text-sm text-gray-600">Total Sessions</div>
                      </div>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-gray-200">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-800">
                          {formatDate(selectedClient.lastConsultation)}
                        </div>
                        <div className="text-sm text-gray-600">Last Consultation</div>
                      </div>
                    </div>
                  </div>

                  {/* Client Notes */}
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-800">Client Notes</h4>
                      <button 
                        onClick={() => setShowNotesModal(true)}
                        className="text-orange-600 hover:text-orange-700 text-sm"
                      >
                        <Edit className="inline w-4 h-4 mr-1" />
                        Edit
                      </button>
                    </div>
                    <p className="text-gray-700 text-sm">{selectedClient.notes}</p>
                  </div>

                  {/* Recent History */}
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-800 mb-2">Recent Consultations</h4>
                    <div className="space-y-2">
                      {consultationHistory.slice(0, 2).map(session => (
                        <div key={session.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                          <div>
                            <div className="font-medium text-sm text-gray-800">{session.topic}</div>
                            <div className="text-xs text-gray-600">{formatDate(session.date)} • {session.type}</div>
                          </div>
                          <span className="text-xs text-gray-500">{session.duration}</span>
                        </div>
                      ))}
                    </div>
                    <button className="w-full text-center text-sm text-orange-600 hover:text-orange-700 mt-2">
                      View All History →
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2 pt-4 mt-4 border-t">
                <button className="px-4 py-2 bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded text-sm">
                  <BookOpen className="inline w-4 h-4 mr-1" />
                  View Kundli
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 text-sm">
                  <Calendar className="inline w-4 h-4 mr-1" />
                  Schedule Follow-up
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 text-sm">
                  <Download className="inline w-4 h-4 mr-1" />
                  Export Data
                </button>
                <button className="px-4 py-2 border border-gray-300 text-red-600 rounded hover:bg-red-50 text-sm">
                  <Trash2 className="inline w-4 h-4 mr-1" />
                  Archive Client
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Notes Modal */}
      {showNotesModal && selectedClient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-md">
            <div className="p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-800">Edit Notes for {selectedClient.name}</h2>
                <button 
                  onClick={() => setShowNotesModal(false)}
                  className="p-1 hover:bg-gray-100 rounded text-gray-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <textarea
                rows={6}
                defaultValue={selectedClient.notes}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-orange-500 focus:border-transparent"
                placeholder="Add detailed notes about the client..."
              />

              <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 pt-4 mt-4 border-t">
                <button
                  onClick={() => setShowNotesModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 text-sm w-full sm:w-auto"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowNotesModal(false)}
                  className="px-4 py-2 bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded hover:from-orange-600 hover:to-orange-700 text-sm w-full sm:w-auto"
                >
                  Save Notes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportsKundli;
