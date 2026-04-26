import React, { useState, useEffect } from 'react';
import VendorPageHeader from '../../../components/VendorPageHeader';
import { useAuth } from '../../../auth/AuthContext';
import { 
  useGetVendorEventsQuery, 
  useAddVendorEventMutation, 
  useUpdateVendorEventMutation, 
  useDeleteVendorEventMutation 
} from '../../../../../services/vendorApi';
import { toast } from 'react-toastify';

import {
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
  Save,
  RefreshCw,
  Church
} from 'lucide-react';

const EventsTemple = () => {
  const { user } = useAuth();
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    date: '',
    time: '',
    duration: '',
    venue: '',
    address: '',
    category: 'festival',
    status: 'upcoming',
    priority: 'medium',
    capacity: 100,
    price: 'Free',
    organizers: '',
    contact: '',
    email: '',
    featured: false
  });

  // RTK Query
  const { data: eventsResponse, isLoading: isFetching, refetch } = useGetVendorEventsQuery(user?._id, {
    skip: !user?._id
  });
  const [addEvent, { isLoading: isAdding }] = useAddVendorEventMutation();
  const [updateEvent, { isLoading: isUpdating }] = useUpdateVendorEventMutation();
  const [deleteEvent, { isLoading: isDeleting }] = useDeleteVendorEventMutation();

  const events = eventsResponse?.data || [];
  const isLoading = isFetching || isAdding || isUpdating || isDeleting;

  // ============ STATS ============
  const stats = {
    total: events.length,
    upcoming: events.filter(e => e.status === 'upcoming').length,
    ongoing: events.filter(e => e.status === 'ongoing').length,
    planning: events.filter(e => e.status === 'planning').length,
    totalCapacity: events.reduce((acc, e) => acc + (e.capacity || 0), 0),
    featured: events.filter(e => e.featured).length
  };

  // ============ HELPERS ============
  const getCategoryIcon = (category) => {
    switch(category?.toLowerCase()) {
      case 'festival': return <Gift className="w-5 h-5 text-orange-500" />;
      case 'utsav': return <Award className="w-5 h-5 text-purple-600" />;
      case 'spiritual': return <Star className="w-5 h-5 text-yellow-500" />;
      case 'regular': return <CalendarDays className="w-5 h-5 text-blue-600" />;
      default: return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusStyles = (status) => {
    const base = "px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest";
    switch(status?.toLowerCase()) {
      case 'upcoming': return `${base} bg-blue-100 text-blue-700`;
      case 'ongoing': return `${base} bg-green-100 text-green-700`;
      case 'planning': return `${base} bg-orange-100 text-orange-700`;
      case 'completed': return `${base} bg-gray-100 text-gray-700`;
      default: return `${base} bg-gray-100 text-gray-700`;
    }
  };

  const handleAction = async (action, event = null) => {
    try {
      if (action === 'delete') {
        if (window.confirm('Delete this event?')) {
          await deleteEvent(event._id).unwrap();
          toast.success('Event deleted');
        }
        return;
      }

      if (action === 'edit') {
        setSelectedEvent(event);
        setFormData({
          ...event,
          organizers: event.organizers?.join(', ') || ''
        });
        setShowAddModal(true);
        return;
      }

      if (action === 'add') {
        setSelectedEvent(null);
        setFormData({
          name: '', description: '', date: '', time: '', duration: '',
          venue: '', address: '', category: 'festival', status: 'upcoming',
          priority: 'medium', capacity: 100, price: 'Free', organizers: '',
          contact: '', email: '', featured: false
        });
        setShowAddModal(true);
        return;
      }

      if (action === 'refresh') {
        refetch();
        toast.info('Refreshing events...');
      }
    } catch (err) {
      toast.error(err.data?.message || 'Action failed');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        vendor: user._id,
        organizers: formData.organizers.split(',').map(o => o.trim()).filter(o => o)
      };

      if (selectedEvent) {
        await updateEvent({ id: selectedEvent._id, ...payload }).unwrap();
        toast.success('Event updated');
      } else {
        await addEvent(payload).unwrap();
        toast.success('Event created');
      }
      setShowAddModal(false);
    } catch (err) {
      toast.error(err.data?.message || 'Save failed');
    }
  };

  const filteredEvents = events.filter(e => {
    if (filter === 'all') return true;
    return e.status === filter || e.category === filter;
  }).filter(e => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return e.name.toLowerCase().includes(q) || e.venue?.toLowerCase().includes(q);
  });

  const AddEventModal = () => {
    if (!showAddModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
        <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
          <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 px-6 py-4 border-b border-orange-100 flex items-center justify-between">
            <h3 className="text-lg font-black text-gray-800">{selectedEvent ? 'Edit Event' : 'Add New Event'}</h3>
            <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-gray-100 rounded-full"><X className="w-5 h-5" /></button>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-4 overflow-y-auto max-h-[calc(90vh-80px)]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <div className="sm:col-span-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Event Name</label>
                  <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-orange-300 transition-all font-bold text-gray-800" required placeholder="e.g. Mahashivratri Celebration" />
               </div>

               <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Date</label>
                  <input type="text" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-orange-300 transition-all font-bold text-gray-800" required placeholder="26 Feb 2026" />
               </div>

               <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Time</label>
                  <input type="text" value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-orange-300 transition-all font-bold text-gray-800" placeholder="06:00 PM - 06:00 AM" />
               </div>

               <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Category</label>
                  <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-orange-300 transition-all font-bold text-gray-800">
                     <option value="festival">Festival</option>
                     <option value="utsav">Utsav</option>
                     <option value="spiritual">Spiritual</option>
                     <option value="regular">Regular</option>
                  </select>
               </div>

               <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Status</label>
                  <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-orange-300 transition-all font-bold text-gray-800">
                     <option value="planning">Planning</option>
                     <option value="upcoming">Upcoming</option>
                     <option value="ongoing">Ongoing</option>
                     <option value="completed">Completed</option>
                  </select>
               </div>

               <div className="sm:col-span-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Venue</label>
                  <input type="text" value={formData.venue} onChange={e => setFormData({...formData, venue: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-orange-300 transition-all font-bold text-gray-800" placeholder="Main Temple Hall" />
               </div>

               <div className="sm:col-span-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Description</label>
                  <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows="3" className="w-full px-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-orange-300 transition-all font-bold text-gray-800" placeholder="Event details..." />
               </div>

               <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Capacity</label>
                  <input type="number" value={formData.capacity} onChange={e => setFormData({...formData, capacity: parseInt(e.target.value)})} className="w-full px-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-orange-300 transition-all font-bold text-gray-800" />
               </div>

               <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Price</label>
                  <input type="text" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-orange-300 transition-all font-bold text-gray-800" />
               </div>
            </div>

            <div className="flex gap-3 pt-6">
               <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 px-6 py-3 bg-gray-100 text-gray-600 font-black rounded-2xl hover:bg-gray-200 transition-all uppercase tracking-widest text-xs">Cancel</button>
               <button type="submit" className="flex-1 px-6 py-3 bg-orange-500 text-white font-black rounded-2xl hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20 uppercase tracking-widest text-xs flex items-center justify-center gap-2">
                  <Save className="w-4 h-4" /> {selectedEvent ? 'Update Event' : 'Create Event'}
               </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-20 z-[150] flex items-center justify-center backdrop-blur-sm">
           <div className="bg-white rounded-3xl p-8 shadow-2xl flex flex-col items-center gap-4">
              <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-sm font-black text-gray-800">Updating Events...</p>
           </div>
        </div>
      )}

      <VendorPageHeader title="EVENTS MANAGEMENT" subtitle="Plan and organize temple festivals and gatherings" />

      <div className="space-y-4 p-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
           {[
             { label: 'Total Events', val: stats.total, icon: CalendarDays, color: 'orange' },
             { label: 'Upcoming', val: stats.upcoming, icon: Clock, color: 'blue' },
             { label: 'Featured', val: stats.featured, icon: Star, color: 'yellow' },
             { label: 'Total Capacity', val: stats.totalCapacity, icon: Users, color: 'green' }
           ].map((s, i) => (
             <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-all group">
                <div className="flex items-center justify-between mb-2">
                   <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{s.label}</span>
                   <div className={`p-1.5 bg-${s.color}-50 rounded-lg group-hover:scale-110 transition-transform`}>
                      <s.icon className={`w-4 h-4 text-${s.color}-500`} />
                   </div>
                </div>
                <p className="text-xl font-black text-gray-800">{s.val}</p>
             </div>
           ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
           <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input type="text" placeholder="Search events..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full pl-11 pr-4 py-2.5 bg-white border-none rounded-2xl shadow-sm focus:ring-2 focus:ring-orange-300 text-sm font-bold" />
           </div>
           <div className="flex gap-2">
              <button onClick={() => handleAction('refresh')} className="p-2.5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:bg-gray-50 transition-all"><RefreshCw className={`w-5 h-5 text-gray-600 ${isFetching ? 'animate-spin' : ''}`} /></button>
              <button onClick={() => handleAction('add')} className="px-6 py-2.5 bg-orange-500 text-white font-black rounded-2xl shadow-lg shadow-orange-500/20 hover:bg-orange-600 transition-all flex items-center gap-2 uppercase tracking-widest text-xs"><PlusCircle className="w-4 h-4" /> Add Event</button>
           </div>
        </div>

        <div className="flex flex-wrap gap-2 pb-2 overflow-x-auto no-scrollbar">
           {['all', 'upcoming', 'ongoing', 'planning', 'completed', 'festival', 'utsav', 'spiritual', 'regular'].map(f => (
             <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border-2 transition-all whitespace-nowrap ${filter === f ? 'bg-gray-800 border-gray-800 text-white' : 'bg-white border-gray-100 text-gray-400 hover:border-orange-200'}`}>
                {f}
             </button>
           ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {filteredEvents.map(e => (
             <div key={e._id} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden group hover:shadow-xl transition-all relative">
                {e.featured && (
                  <div className="absolute top-4 right-4 z-10 bg-yellow-400 text-white p-1.5 rounded-xl shadow-lg animate-bounce">
                     <Star className="w-4 h-4 fill-current" />
                  </div>
                )}
                <div className="h-48 bg-gray-100 relative overflow-hidden">
                   {e.image ? (
                     <img src={e.image} alt={e.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                   ) : (
                     <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-100 to-amber-100">
                        <Church className="w-12 h-12 text-orange-200" />
                     </div>
                   )}
                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                   <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                      <span className={getStatusStyles(e.status)}>{e.status}</span>
                      <span className="text-xs font-black text-white bg-white/20 backdrop-blur-md px-3 py-1 rounded-lg border border-white/30 uppercase tracking-widest">{e.category}</span>
                   </div>
                </div>

                <div className="p-6 space-y-4">
                   <div>
                      <h4 className="text-lg font-black text-gray-800 mb-1 group-hover:text-orange-500 transition-colors">{e.name}</h4>
                      <p className="text-xs text-gray-500 line-clamp-2 font-medium">{e.description}</p>
                   </div>

                   <div className="space-y-2">
                      <div className="flex items-center gap-3 text-xs font-bold text-gray-600">
                         <div className="p-1.5 bg-orange-50 rounded-lg"><CalendarDays className="w-4 h-4 text-orange-500" /></div>
                         <span>{e.date} {e.time && `• ${e.time}`}</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs font-bold text-gray-600">
                         <div className="p-1.5 bg-blue-50 rounded-lg"><MapPin className="w-4 h-4 text-blue-500" /></div>
                         <span className="truncate">{e.venue}</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs font-bold text-gray-600">
                         <div className="p-1.5 bg-green-50 rounded-lg"><Users className="w-4 h-4 text-green-500" /></div>
                         <span>{e.registeredCount || 0} / {e.capacity} Registered</span>
                      </div>
                   </div>

                   <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-sm font-black text-gray-800">{e.price}</span>
                      <div className="flex gap-2">
                         <button onClick={() => handleAction('edit', e)} className="p-2 bg-gray-50 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-xl transition-all"><Edit3 className="w-4 h-4" /></button>
                         <button onClick={() => handleAction('delete', e)} className="p-2 bg-gray-50 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"><Trash2 className="w-4 h-4" /></button>
                         <button className="p-2 bg-gray-50 text-gray-400 hover:text-orange-500 hover:bg-orange-50 rounded-xl transition-all"><Share2 className="w-4 h-4" /></button>
                      </div>
                   </div>
                </div>
             </div>
           ))}
        </div>

        {filteredEvents.length === 0 && (
           <div className="p-20 text-center bg-white rounded-3xl border border-gray-100 shadow-sm">
              <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-200">
                 <CalendarDays className="w-12 h-12" />
              </div>
              <h4 className="text-xl font-black text-gray-800 mb-2">No events found</h4>
              <p className="text-sm text-gray-500 max-w-sm mx-auto">Click "Add Event" to start planning your first temple festival or gathering.</p>
           </div>
        )}
      </div>
      <AddEventModal />
    </div>
  );
};

export default EventsTemple;
