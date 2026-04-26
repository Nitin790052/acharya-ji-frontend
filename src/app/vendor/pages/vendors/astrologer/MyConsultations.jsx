import { useState, useEffect } from 'react';
import {
  Video, MessageSquare, Calendar, Clock,
  User, Phone, Camera, Mic, MicOff,
  X, MoreVertical, FileText, Edit,
  Download, RefreshCw, CheckCircle,
  XCircle, AlertCircle, ChevronRight,
  Star, Home, Globe, Building,
  Plus, Filter, Search, History,
  BookOpen, Send, Volume2, Share2,
  CalendarDays, DollarSign, MapPin,
  ExternalLink, PhoneCall, PhoneForwarded, Lightbulb, Save
} from 'lucide-react';

import VendorPageHeader from '../../../components/VendorPageHeader';

const MyConsultations = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [isCallActive, setIsCallActive] = useState(false);
  const [callTimer, setCallTimer] = useState(0);
  const [sessionNotes, setSessionNotes] = useState('');
  const [showClientHistory, setShowClientHistory] = useState(false);
  const [filterType, setFilterType] = useState('all');
  const [showAddNote, setShowAddNote] = useState(false);

  // Tabs
  const tabs = [
    { id: 'upcoming', label: 'Upcoming', count: 4 },
    { id: 'ongoing', label: 'Ongoing', count: 2 },
    { id: 'completed', label: 'Completed', count: 12 },
    { id: 'cancelled', label: 'Cancelled', count: 3 },
    { id: 'missed', label: 'Missed', count: 1 }
  ];

  // Sample consultations data
  const consultations = {
    upcoming: [
      {
        id: 1,
        client: 'Rajesh Kumar',
        type: 'video',
        service: 'Ganpati Puja Consultation',
        date: 'Today',
        time: '10:30 AM',
        duration: '30 mins',
        status: 'confirmed',
        serviceType: 'home',
        amount: 1500,
        clientNotes: 'First time consultation, wants detailed explanation',
        platform: 'Zoom',
        link: 'https://zoom.us/j/123456'
      },
      {
        id: 2,
        client: 'Priya Sharma',
        type: 'chat',
        service: 'Satyanarayan Katha Planning',
        date: 'Tomorrow',
        time: '2:00 PM',
        duration: '45 mins',
        status: 'pending',
        serviceType: 'online',
        amount: 1200,
        clientNotes: 'Needs guidance on materials required',
        platform: 'WhatsApp'
      },
      {
        id: 3,
        client: 'Amit Patel',
        type: 'video',
        service: 'Vastu Consultation',
        date: 'Jan 20',
        time: '11:00 AM',
        duration: '60 mins',
        status: 'confirmed',
        serviceType: 'home',
        amount: 2000,
        clientNotes: 'Follow-up for home puja',
        platform: 'Google Meet'
      }
    ],
    ongoing: [
      {
        id: 4,
        client: 'Neha Kapoor',
        type: 'video',
        service: 'Navgraha Shanti Guidance',
        date: 'Now',
        time: 'Started: 10:00 AM',
        duration: '30 mins',
        status: 'live',
        serviceType: 'online',
        amount: 1800,
        elapsedTime: '15:23',
        platform: 'Zoom',
        link: 'https://zoom.us/j/789012'
      },
      {
        id: 5,
        client: 'Ravi Malhotra',
        type: 'chat',
        service: 'Puja Materials Discussion',
        date: 'Now',
        time: 'Active chat',
        duration: 'Ongoing',
        status: 'chatting',
        serviceType: 'online',
        amount: 800,
        lastMessage: 'What about the flowers?',
        platform: 'WhatsApp'
      }
    ],
    completed: [
      {
        id: 6,
        client: 'Sonia Verma',
        type: 'video',
        service: 'Ganpati Puja Consultation',
        date: 'Jan 15',
        time: 'Completed: 11:30 AM',
        duration: '45 mins',
        status: 'completed',
        serviceType: 'home',
        amount: 1500,
        rating: 4.5,
        notes: 'Client satisfied with explanation',
        followUp: 'Recommended'
      },
      {
        id: 7,
        client: 'Vikram Singh',
        type: 'chat',
        service: 'Maha Mrityunjay Jaap Query',
        date: 'Jan 14',
        time: 'Completed: 3:00 PM',
        duration: '25 mins',
        status: 'completed',
        serviceType: 'online',
        amount: 1000,
        rating: 5,
        notes: 'Quick query resolved',
        followUp: 'Not needed'
      }
    ],
    cancelled: [
      {
        id: 8,
        client: 'Anjali Mehta',
        type: 'video',
        service: 'Satyanarayan Katha',
        date: 'Jan 13',
        time: 'Cancelled',
        duration: '30 mins',
        status: 'cancelled',
        serviceType: 'home',
        amount: 1200,
        reason: 'Client emergency',
        refundStatus: 'processed'
      }
    ],
    missed: [
      {
        id: 9,
        client: 'Rohan Gupta',
        type: 'video',
        service: 'Vastu Consultation',
        date: 'Jan 12',
        time: 'Missed',
        duration: '60 mins',
        status: 'missed',
        serviceType: 'home',
        amount: 2000,
        reason: 'No show',
        followUp: 'Attempted call'
      }
    ]
  };

  // Sample client history
  const clientHistory = [
    { id: 1, date: 'Jan 10', service: 'Ganpati Puja', type: 'consultation', status: 'completed' },
    { id: 2, date: 'Dec 28', service: 'Satyanarayan Katha', type: 'puja', status: 'completed' },
    { id: 3, date: 'Dec 15', service: 'General Query', type: 'chat', status: 'completed' },
    { id: 4, date: 'Dec 5', service: 'Navgraha Shanti', type: 'consultation', status: 'completed' }
  ];

  // Timer for ongoing calls
  useEffect(() => {
    let interval;
    if (isCallActive) {
      interval = setInterval(() => {
        setCallTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isCallActive]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startCall = (consultation) => {
    setSelectedConsultation(consultation);
    setIsCallActive(true);
    setCallTimer(0);
  };

  const endCall = () => {
    setIsCallActive(false);
    // Move to completed tab logic here
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'confirmed':
        return <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-200 text-xs font-medium">
          <CheckCircle className="w-3 h-3" /> Confirmed
        </span>;
      case 'pending':
        return <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-yellow-50 text-yellow-700 border border-yellow-200 text-xs font-medium">
          <Clock className="w-3 h-3" /> Pending
        </span>;
      case 'live':
        return <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-200 text-xs font-medium animate-pulse">
          <Video className="w-3 h-3" /> LIVE
        </span>;
      case 'chatting':
        return <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-medium">
          <MessageSquare className="w-3 h-3" /> Active
        </span>;
      case 'completed':
        return <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 border border-gray-200 text-xs font-medium">
          <CheckCircle className="w-3 h-3" /> Completed
        </span>;
      case 'cancelled':
        return <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-red-100 text-red-700 border border-red-200 text-xs font-medium">
          <XCircle className="w-3 h-3" /> Cancelled
        </span>;
      case 'missed':
        return <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 border border-orange-200 text-xs font-medium">
          <PhoneCall className="w-3 h-3" /> Missed  {/* Changed from PhoneMissed to PhoneCall */}
        </span>;
      default:
        return null;
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'video': return <Video className="w-4 h-4 text-blue-600" />;
      case 'chat': return <MessageSquare className="w-4 h-4 text-green-600" />;
      default: return <Video className="w-4 h-4" />;
    }
  };

  const getServiceTypeIcon = (serviceType) => {
    switch (serviceType) {
      case 'home': return <Home className="w-4 h-4 text-orange-600" />;
      case 'online': return <Globe className="w-4 h-4 text-blue-600" />;
      case 'temple': return <Building className="w-4 h-4 text-purple-600" />;
      default: return <Home className="w-4 h-4" />;
    }
  };

  const ConsultationCard = ({ consultation, tab }) => {
    const [showActions, setShowActions] = useState(false);

    return (
      <div className="bg-white rounded-lg border border-gray-200 shadow-xs hover:shadow-sm transition-shadow">
        <div className="p-3">
          {/* Header */}
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-start gap-2 flex-1">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 
                            flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm">
                  {consultation.client.charAt(0)}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <h3 className="font-semibold text-gray-800 text-sm">{consultation.client}</h3>
                  {getStatusBadge(consultation.status)}
                </div>
                <p className="text-sm text-gray-600 mt-0.5">{consultation.service}</p>
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
                  <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex items-center gap-2">
                    <Edit className="w-3 h-3" /> Edit Notes
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex items-center gap-2">
                    <History className="w-3 h-3" /> View History
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex items-center gap-2">
                    <RefreshCw className="w-3 h-3" /> Reschedule
                  </button>
                  {tab !== 'cancelled' && tab !== 'missed' && (
                    <button className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
                      <XCircle className="w-3 h-3" /> Cancel
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="grid grid-cols-2 gap-3 mt-3">
            <div className="flex items-center gap-1.5">
              {getTypeIcon(consultation.type)}
              <span className="text-xs text-gray-600 capitalize">{consultation.type}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span className="text-xs text-gray-600">{consultation.date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="text-xs text-gray-600">{consultation.time}</span>
            </div>
            <div className="flex items-center gap-1.5">
              {getServiceTypeIcon(consultation.serviceType)}
              <span className="text-xs text-gray-600 capitalize">{consultation.serviceType}</span>
            </div>
          </div>

          {/* Amount */}
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
            <div className="flex items-center gap-1">
              <DollarSign className="w-4 h-4 text-gray-600" />
              <span className="font-medium text-gray-800">₹{consultation.amount}</span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-1.5">
              {tab === 'upcoming' && (
                <>
                  {consultation.type === 'video' && (
                    <button
                      onClick={() => startCall(consultation)}
                      className="flex items-center gap-1 px-2.5 py-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded text-xs hover:from-blue-600 hover:to-blue-700"
                    >
                      <Video className="w-3 h-3" />
                      Start Call
                    </button>
                  )}
                  {consultation.type === 'chat' && (
                    <button className="flex items-center gap-1 px-2.5 py-1 bg-gradient-to-r from-green-500 to-green-600 text-white rounded text-xs hover:from-green-600 hover:to-green-700">
                      <MessageSquare className="w-3 h-3" />
                      Open Chat
                    </button>
                  )}
                </>
              )}

              {tab === 'ongoing' && (
                <>
                  {consultation.type === 'video' && (
                    <button
                      onClick={() => startCall(consultation)}
                      className="flex items-center gap-1 px-2.5 py-1 bg-gradient-to-r from-red-500 to-red-600 text-white rounded text-xs hover:from-red-600 hover:to-red-700 animate-pulse"
                    >
                      <Video className="w-3 h-3" />
                      Join Call
                    </button>
                  )}
                  {consultation.type === 'chat' && (
                    <button className="flex items-center gap-1 px-2.5 py-1 bg-gradient-to-r from-green-500 to-green-600 text-white rounded text-xs hover:from-green-600 hover:to-green-700">
                      <MessageSquare className="w-3 h-3" />
                      Continue Chat
                    </button>
                  )}
                </>
              )}

              {(tab === 'completed' || tab === 'cancelled' || tab === 'missed') && (
                <button
                  onClick={() => setSelectedConsultation(consultation)}
                  className="flex items-center gap-1 px-2.5 py-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded text-xs hover:from-orange-600 hover:to-orange-700"
                >
                  <FileText className="w-3 h-3" />
                  View Details
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50/30">
      <VendorPageHeader 
        title="MY CONSULTATIONS" 
        subtitle="Manage all client consultations" 
      />

      {/* Main Content */}
      <div className="space-y-4 p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`p-3 rounded-lg border transition-all text-left ${activeTab === tab.id
                  ? 'bg-gradient-to-r from-orange-500/80 to-orange-400/80 text-white border-orange-400'
                  : 'bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 border-gray-200 hover:border-orange-300'
                }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium">{tab.label}</p>
                  <p className={`text-xl font-bold mt-0.5 ${activeTab === tab.id ? 'text-white' : 'text-gray-800'
                    }`}>
                    {tab.count}
                  </p>
                </div>
                {activeTab === tab.id && (
                  <ChevronRight className="w-4 h-4" />
                )}
              </div>
            </button>
          ))}
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
                  placeholder="Search consultations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Desktop Filters */}
            <div className="hidden sm:flex gap-2">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-orange-500 focus:border-transparent min-w-[120px]"
              >
                <option value="all">All Types</option>
                <option value="video">Video Calls</option>
                <option value="chat">Chat Sessions</option>
              </select>
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="sm:hidden flex items-center justify-center gap-1.5 px-3 py-2 border border-gray-300 rounded hover:bg-gray-50 text-sm"
            >
              <Filter className="w-4 h-4" />
              Filters
              {showFilters ? <ChevronRight className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
          </div>

          {/* Mobile Filters Dropdown */}
          {showFilters && (
            <div className="sm:hidden mt-3 p-3 border border-gray-200 rounded bg-gray-50">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-orange-500"
                  >
                    <option value="all">All Types</option>
                    <option value="video">Video Calls</option>
                    <option value="chat">Chat Sessions</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Consultations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {consultations[activeTab]?.map(consultation => (
            <ConsultationCard
              key={consultation.id}
              consultation={consultation}
              tab={activeTab}
            />
          ))}
        </div>

        {(!consultations[activeTab] || consultations[activeTab].length === 0) && (
          <div className="text-center py-8">
            <div className="w-12 h-12 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-3">
              <Calendar className="text-gray-400 w-6 h-6" />
            </div>
            <h3 className="text-base font-medium text-gray-700 mb-1.5">No consultations found</h3>
            <p className="text-sm text-gray-500 mb-4 max-w-md mx-auto">
              {activeTab === 'upcoming' ? 'You have no upcoming consultations' :
                activeTab === 'ongoing' ? 'No active consultations' :
                  activeTab === 'completed' ? 'No completed consultations yet' :
                    activeTab === 'cancelled' ? 'No cancelled consultations' :
                      'No missed consultations'}
            </p>
          </div>
        )}
      </div>

      {/* Active Call Modal */}
      {isCallActive && selectedConsultation && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-4xl overflow-hidden">
            {/* Call Header */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold">{selectedConsultation.client}</h2>
                    <p className="text-sm opacity-90">{selectedConsultation.service}</p>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-mono font-bold">{formatTime(callTimer)}</div>
                  <div className="text-xs opacity-90">Call duration</div>
                </div>
              </div>
            </div>

            {/* Call Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3">
              {/* Video Area */}
              <div className="lg:col-span-2 bg-gray-900 p-4">
                <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center relative">
                  {/* Video feed would go here */}
                  <div className="text-center">
                    <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center mx-auto mb-4">
                      <User className="w-12 h-12 text-white" />
                    </div>
                    <p className="text-white text-lg">Connected to {selectedConsultation.client}</p>
                    <p className="text-gray-400">Platform: {selectedConsultation.platform}</p>
                  </div>

                  {/* Self view */}
                  <div className="absolute bottom-4 right-4 w-32 h-24 bg-gray-800 rounded border-2 border-white">
                    <div className="w-full h-full flex items-center justify-center">
                      <User className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </div>

                {/* Call Controls */}
                <div className="flex items-center justify-center gap-4 mt-4">
                  <button className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 text-white">
                    <Mic className="w-5 h-5" />
                  </button>
                  <button className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 text-white">
                    <Camera className="w-5 h-5" />
                  </button>
                  <button
                    onClick={endCall}
                    className="p-4 rounded-full bg-red-600 hover:bg-red-700 text-white"
                  >
                    <Phone className="w-5 h-5" />
                  </button>
                  <button className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 text-white">
                    <Volume2 className="w-5 h-5" />
                  </button>
                  <button className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 text-white">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Side Panel - Notes and Info */}
              <div className="bg-white p-4 border-l border-gray-200">
                <h3 className="font-semibold text-gray-800 mb-3">Session Notes</h3>
                <textarea
                  value={sessionNotes}
                  onChange={(e) => setSessionNotes(e.target.value)}
                  placeholder="Take notes during the consultation..."
                  className="w-full h-32 px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-orange-500 focus:border-transparent mb-3"
                  rows={4}
                />

                <div className="space-y-2 mb-4">
                  <button className="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded border border-gray-200 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-yellow-500" /> AI Note Suggestions
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded border border-gray-200 flex items-center gap-2">
                    <Save className="w-4 h-4 text-blue-500" /> Save Transcript
                  </button>
                </div>

                <div className="pt-3 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Quick Actions</h4>
                  <div className="flex flex-wrap gap-2">
                    <button className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded border border-blue-200">
                      Share Screen
                    </button>
                    <button className="px-2 py-1 text-xs bg-green-50 text-green-700 rounded border border-green-200">
                      Send File
                    </button>
                    <button className="px-2 py-1 text-xs bg-purple-50 text-purple-700 rounded border border-purple-200">
                      Record Call
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Consultation Details Modal */}
      {selectedConsultation && !isCallActive && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[85vh] overflow-y-auto">
            <div className="p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-800">Consultation Details</h2>
                <button
                  onClick={() => setSelectedConsultation(null)}
                  className="p-1 hover:bg-gray-100 rounded text-gray-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Client Info */}
              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-4 rounded-lg mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 
                                flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-xl">
                      {selectedConsultation.client.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-800">{selectedConsultation.client}</h3>
                    <p className="text-sm text-gray-600">{selectedConsultation.service}</p>
                    {getStatusBadge(selectedConsultation.status)}
                  </div>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="space-y-1">
                  <label className="text-xs text-gray-500">Date & Time</label>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">{selectedConsultation.date}, {selectedConsultation.time}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-gray-500">Duration</label>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">{selectedConsultation.duration}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-gray-500">Type</label>
                  <div className="flex items-center gap-1.5">
                    {getTypeIcon(selectedConsultation.type)}
                    <span className="font-medium capitalize">{selectedConsultation.type}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-gray-500">Amount</label>
                  <div className="flex items-center gap-1.5">
                    <DollarSign className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">₹{selectedConsultation.amount}</span>
                  </div>
                </div>
              </div>

              {/* Session Notes */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Session Notes</label>
                <div className="bg-gray-50 p-3 rounded border border-gray-200">
                  <p className="text-sm text-gray-700">
                    {selectedConsultation.notes || 'No notes recorded for this session.'}
                  </p>
                </div>
              </div>

              {/* Client History Preview */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-gray-700">Client History</h4>
                  <button
                    onClick={() => setShowClientHistory(true)}
                    className="text-xs text-orange-600 hover:text-orange-700 font-medium"
                  >
                    View Full History →
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {clientHistory.slice(0, 2).map(history => (
                    <div key={history.id} className="bg-gray-50 p-2 rounded border border-gray-200">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium">{history.service}</span>
                        <span className="text-xs text-gray-500">{history.date}</span>
                      </div>
                      <span className="text-xs text-gray-600 block mt-1">{history.type}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t">
                <button className="flex-1 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded hover:from-orange-600 hover:to-orange-700 text-sm">
                  <RefreshCw className="inline w-4 h-4 mr-1" />
                  Rebook Session
                </button>
                <button className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 text-sm">
                  <Download className="inline w-4 h-4 mr-1" />
                  Download Transcript
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 text-sm">
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyConsultations;
