import React, { useState, useEffect } from 'react';
import VendorPageHeader from '../../../components/VendorPageHeader';
import { useAuth } from '../../../auth/AuthContext';
import { 
  useGetVendorStaffQuery, 
  useAddVendorStaffMutation, 
  useUpdateVendorStaffMutation, 
  useDeleteVendorStaffMutation 
} from '../../../../../services/vendorApi';
import { toast } from 'react-toastify';

import {
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
  Save,
  RefreshCw
} from 'lucide-react';

const StaffManagement = () => {
  const { user } = useAuth();
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    role: 'Pandit',
    department: 'Puja',
    phone: '',
    email: '',
    experience: '',
    status: 'available',
    avatar: ''
  });

  // RTK Query
  const { data: staffResponse, isLoading: isFetching, refetch } = useGetVendorStaffQuery(user?._id, {
    skip: !user?._id
  });
  const [addStaff, { isLoading: isAdding }] = useAddVendorStaffMutation();
  const [updateStaff, { isLoading: isUpdating }] = useUpdateVendorStaffMutation();
  const [deleteStaff, { isLoading: isDeleting }] = useDeleteVendorStaffMutation();

  const staff = staffResponse?.data || [];
  const isLoading = isFetching || isAdding || isUpdating || isDeleting;

  // ============ STATS ============
  const stats = {
    total: staff.length,
    available: staff.filter(s => s.status === 'available').length,
    busy: staff.filter(s => s.status === 'busy').length,
    pandits: staff.filter(s => s.role?.includes('Pandit')).length,
    totalBookings: staff.reduce((acc, s) => acc + (s.assignedBookings || 0), 0),
    avgRating: staff.length > 0 ? (staff.reduce((acc, s) => acc + (s.rating || 0), 0) / staff.length).toFixed(1) : '5.0'
  };

  // ============ HELPERS ============
  const getStatusStyles = (status) => {
    const base = "px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest";
    switch(status?.toLowerCase()) {
      case 'available': return `${base} bg-green-100 text-green-700`;
      case 'busy': return `${base} bg-orange-100 text-orange-700`;
      case 'on-leave': return `${base} bg-red-100 text-red-700`;
      default: return `${base} bg-gray-100 text-gray-700`;
    }
  };

  const getDepartmentStyles = (dept) => {
    const base = "px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest";
    switch(dept?.toLowerCase()) {
      case 'puja': return `${base} bg-orange-50 text-orange-600`;
      case 'administration': return `${base} bg-blue-50 text-blue-600`;
      case 'finance': return `${base} bg-green-50 text-green-600`;
      default: return `${base} bg-gray-100 text-gray-600`;
    }
  };

  const handleAction = async (action, member = null) => {
    try {
      if (action === 'delete') {
        if (window.confirm('Remove this staff member?')) {
          await deleteStaff(member._id).unwrap();
          toast.success('Staff removed');
        }
        return;
      }

      if (action === 'edit') {
        setSelectedStaff(member);
        setFormData({ ...member });
        setShowModal(true);
        return;
      }

      if (action === 'add') {
        setSelectedStaff(null);
        setFormData({
          name: '', role: 'Pandit', department: 'Puja',
          phone: '', email: '', experience: '', status: 'available', avatar: ''
        });
        setShowModal(true);
        return;
      }

      if (action === 'toggleStatus') {
        const nextStatus = member.status === 'available' ? 'busy' : 'available';
        await updateStaff({ id: member._id, status: nextStatus }).unwrap();
        toast.success(`Status updated to ${nextStatus}`);
      }

      if (action === 'refresh') {
        refetch();
        toast.info('Refreshing staff records...');
      }
    } catch (err) {
      toast.error(err.data?.message || 'Action failed');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...formData, vendor: user._id };
      if (selectedStaff) {
        await updateStaff({ id: selectedStaff._id, ...payload }).unwrap();
        toast.success('Staff updated');
      } else {
        await addStaff(payload).unwrap();
        toast.success('Staff added');
      }
      setShowModal(false);
    } catch (err) {
      toast.error(err.data?.message || 'Save failed');
    }
  };

  const filteredStaff = staff.filter(s => {
    if (filter === 'all') return true;
    if (filter === 'available') return s.status === 'available';
    if (filter === 'busy') return s.status === 'busy';
    if (filter === 'pandits') return s.role?.includes('Pandit');
    return s.department?.toLowerCase() === filter.toLowerCase();
  }).filter(s => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return s.name.toLowerCase().includes(q) || s.role?.toLowerCase().includes(q) || s.phone?.includes(q);
  });

  const StaffModal = () => {
    if (!showModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
        <div className="bg-white rounded-3xl w-full max-w-xl max-h-[90vh] overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
          <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 px-6 py-4 border-b border-orange-100 flex items-center justify-between">
            <h3 className="text-lg font-black text-gray-800">{selectedStaff ? 'Edit Staff Details' : 'Add New Staff Member'}</h3>
            <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><X className="w-5 h-5 text-gray-500" /></button>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-4">
            <div className="flex justify-center mb-6">
               <div className="w-24 h-24 bg-gray-100 rounded-3xl flex items-center justify-center border-4 border-white shadow-lg relative group cursor-pointer overflow-hidden">
                  <UserCircle className="w-12 h-12 text-gray-300" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                     <PlusCircle className="w-6 h-6 text-white" />
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <div className="sm:col-span-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                  <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-orange-300 transition-all font-bold text-gray-800" required placeholder="e.g. Pandit Ravi Shastri" />
               </div>

               <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Role</label>
                  <select value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-orange-300 transition-all font-bold text-gray-800">
                     <option value="Head Pandit">Head Pandit</option>
                     <option value="Pandit">Pandit</option>
                     <option value="Temple Manager">Temple Manager</option>
                     <option value="Accountant">Accountant</option>
                     <option value="Other">Other</option>
                  </select>
               </div>

               <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Department</label>
                  <select value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-orange-300 transition-all font-bold text-gray-800">
                     <option value="Puja">Puja</option>
                     <option value="Administration">Administration</option>
                     <option value="Finance">Finance</option>
                     <option value="Other">Other</option>
                  </select>
               </div>

               <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Phone Number</label>
                  <input type="text" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-orange-300 transition-all font-bold text-gray-800" required placeholder="+91 98765 43210" />
               </div>

               <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Experience</label>
                  <input type="text" value={formData.experience} onChange={e => setFormData({...formData, experience: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-orange-300 transition-all font-bold text-gray-800" placeholder="e.g. 15 years" />
               </div>

               <div className="sm:col-span-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                  <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-orange-300 transition-all font-bold text-gray-800" placeholder="ravi.shastri@temple.org" />
               </div>
            </div>

            <div className="flex gap-3 pt-6">
               <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-6 py-3 bg-gray-100 text-gray-600 font-black rounded-2xl hover:bg-gray-200 transition-all uppercase tracking-widest text-xs">Cancel</button>
               <button type="submit" className="flex-1 px-6 py-3 bg-orange-500 text-white font-black rounded-2xl hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20 uppercase tracking-widest text-xs flex items-center justify-center gap-2">
                  <Save className="w-4 h-4" /> {selectedStaff ? 'Save Changes' : 'Add Staff Member'}
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
              <p className="text-sm font-black text-gray-800">Syncing Staff Records...</p>
           </div>
        </div>
      )}

      <VendorPageHeader title="STAFF & PANDIT MANAGEMENT" subtitle="Organize and monitor your temple team effectively" />

      <div className="space-y-4 p-6">
        <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-2xl p-4 border border-orange-100 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4">
           <div>
              <p className="text-lg font-black text-gray-800">{stats.available} Available Staff</p>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Team Availability Status</p>
           </div>
           <div className="flex items-center gap-6">
              <div className="text-right">
                 <p className="text-sm font-black text-orange-600">{stats.avgRating} / 5.0</p>
                 <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Avg. Devotee Rating</p>
              </div>
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                 <Star className="w-6 h-6 text-orange-500 fill-orange-500" />
              </div>
           </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
           {[
             { label: 'Total Team', val: stats.total, icon: Users, color: 'orange' },
             { label: 'Pandits', val: stats.pandits, icon: Award, color: 'amber' },
             { label: 'Busy Now', val: stats.busy, icon: Clock, color: 'blue' },
             { label: 'Total Tasks', val: stats.totalBookings, icon: CalendarDays, color: 'green' }
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
              <input type="text" placeholder="Search staff by name or phone..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full pl-11 pr-4 py-2.5 bg-white border-none rounded-2xl shadow-sm focus:ring-2 focus:ring-orange-300 text-sm font-bold" />
           </div>
           <div className="flex gap-2">
              <button onClick={() => handleAction('refresh')} className="p-2.5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:bg-gray-50 transition-all"><RefreshCw className={`w-5 h-5 text-gray-600 ${isFetching ? 'animate-spin' : ''}`} /></button>
              <button onClick={() => handleAction('add')} className="px-6 py-2.5 bg-orange-500 text-white font-black rounded-2xl shadow-lg shadow-orange-500/20 hover:bg-orange-600 transition-all flex items-center gap-2 uppercase tracking-widest text-xs"><PlusCircle className="w-4 h-4" /> Add Staff</button>
           </div>
        </div>

        <div className="flex flex-wrap gap-2 pb-2 overflow-x-auto no-scrollbar">
           {['all', 'available', 'busy', 'pandits', 'Puja', 'Administration', 'Finance'].map(f => (
             <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border-2 transition-all whitespace-nowrap ${filter === f ? 'bg-gray-800 border-gray-800 text-white' : 'bg-white border-gray-100 text-gray-400 hover:border-orange-200'}`}>
                {f}
             </button>
           ))}
        </div>

        <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm">
           <div className="p-5 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
              <h3 className="text-base font-black text-gray-800">Staff Directory</h3>
              <span className="text-xs font-bold text-orange-500 bg-orange-50 px-3 py-1 rounded-full">{filteredStaff.length} Members</span>
           </div>

           <div className="overflow-x-auto">
              <table className="w-full text-left">
                 <thead>
                    <tr className="bg-gray-50/50">
                       <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase">Profile</th>
                       <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase">Role & Dept</th>
                       <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase">Experience</th>
                       <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase">Status</th>
                       <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase">Tasks</th>
                       <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase text-right">Actions</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-50">
                    {filteredStaff.map((s) => (
                       <tr key={s._id} className={`group hover:bg-gray-50/80 transition-colors ${!s.isRead ? 'bg-orange-50/30' : ''}`}>
                          <td className="px-6 py-4">
                             <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-orange-100 to-amber-100 rounded-xl flex items-center justify-center text-orange-700 font-bold shadow-sm">
                                   {(s.name || '?')[0].toUpperCase()}
                                </div>
                                <div>
                                   <p className="text-sm font-bold text-gray-800">{s.name}</p>
                                   <p className="text-[10px] text-gray-500 font-medium">{s.phone}</p>
                                </div>
                             </div>
                          </td>
                          <td className="px-6 py-4">
                             <div className="space-y-1">
                                <p className="text-xs font-bold text-gray-800">{s.role}</p>
                                <span className={getDepartmentStyles(s.department)}>{s.department}</span>
                             </div>
                          </td>
                          <td className="px-6 py-4">
                             <div className="flex items-center gap-2 text-xs font-bold text-gray-600">
                                <Briefcase className="w-3 h-3" />
                                <span>{s.experience || 'N/A'}</span>
                             </div>
                          </td>
                          <td className="px-6 py-4">
                             <button onClick={() => handleAction('toggleStatus', s)} className="transition-transform active:scale-90">
                                <span className={getStatusStyles(s.status)}>{s.status}</span>
                             </button>
                          </td>
                          <td className="px-6 py-4">
                             <div className="flex items-center gap-2">
                                <div className="flex -space-x-2">
                                   {[1,2,3].slice(0, s.assignedBookings || 0).map(i => (
                                      <div key={i} className="w-5 h-5 rounded-full border-2 border-white bg-orange-100"></div>
                                   ))}
                                </div>
                                <span className="text-xs font-bold text-gray-800">{s.assignedBookings || 0}</span>
                             </div>
                          </td>
                          <td className="px-6 py-4 text-right">
                             <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => handleAction('edit', s)} className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-xl transition-all"><Edit3 className="w-4 h-4" /></button>
                                <button onClick={() => handleAction('delete', s)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"><Trash2 className="w-4 h-4" /></button>
                             </div>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>

           {filteredStaff.length === 0 && (
              <div className="p-16 text-center">
                 <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-200"><Users className="w-10 h-10" /></div>
                 <h4 className="text-xl font-black text-gray-800 mb-1">No staff found</h4>
                 <p className="text-sm text-gray-500">Add your first team member to start assigning bookings.</p>
              </div>
           )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
           <div className="lg:col-span-2 bg-gray-900 rounded-3xl p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl -mr-24 -mt-24"></div>
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                 <div className="w-20 h-20 bg-orange-500 rounded-3xl flex items-center justify-center shadow-xl shadow-orange-500/20">
                    <Award className="w-10 h-10" />
                 </div>
                 <div className="flex-1 text-center md:text-left">
                    <h4 className="text-xl font-black mb-2">Pandit Training Program</h4>
                    <p className="text-sm text-gray-400 max-w-md">Access our digital library of rituals, shlokas, and best practices to ensure consistent service quality across your team.</p>
                 </div>
                 <button className="px-6 py-3 bg-white text-gray-900 font-black rounded-2xl hover:bg-orange-500 hover:text-white transition-all uppercase tracking-widest text-xs">Access Library</button>
              </div>
           </div>

           <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">
              <h4 className="font-black text-gray-800 mb-4 flex items-center gap-2"><Bell className="w-5 h-5 text-orange-500" /> Notifications</h4>
              <div className="space-y-4">
                 {[
                   { msg: 'Pandit Suresh is busy for next 2 hours', time: '5m ago' },
                   { msg: 'New rating: 5.0 for Rudrabhishek', time: '1h ago' },
                   { msg: 'Attendance marked for morning shift', time: '3h ago' }
                 ].map((n, i) => (
                   <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-2xl border border-gray-50 group hover:border-orange-100 transition-all cursor-default">
                      <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-1.5 group-hover:scale-150 transition-transform"></div>
                      <div className="flex-1">
                         <p className="text-xs font-bold text-gray-700 leading-tight">{n.msg}</p>
                         <p className="text-[10px] text-gray-400 font-medium mt-1">{n.time}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
      <StaffModal />
    </div>
  );
};

export default StaffManagement;
