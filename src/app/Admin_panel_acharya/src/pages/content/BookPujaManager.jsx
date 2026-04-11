import React, { useState } from 'react';
import {
    Plus, Search, Edit2, Trash2, Eye, X, Check,
    AlertCircle, Phone, MapPin, Calendar, Clock,
    MessageCircle, User, Info, Save, ChevronRight,
    Search as SearchIcon, Filter, ExternalLink, Activity
} from 'lucide-react';
import {
    useGetAllBookingsQuery,
    useCreateBookingMutation,
    useUpdateBookingMutation,
    useDeleteBookingMutation,
    useToggleActiveBookingMutation
} from '../../../../../services/bookingApi';
import { useGetAllOfferingsQuery } from '../../../../../services/pujaOfferingApi';
import { toast } from 'react-toastify';

const BookPujaManager = () => {
    // Queries & Mutations
    const { data: bookings = [], isLoading } = useGetAllBookingsQuery();
    const { data: offerings = [] } = useGetAllOfferingsQuery();
    const [createBooking] = useCreateBookingMutation();
    const [updateBooking] = useUpdateBookingMutation();
    const [deleteBooking] = useDeleteBookingMutation();
    const [toggleActive] = useToggleActiveBookingMutation();

    // State
    const [editingId, setEditingId] = useState(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');

    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        city: '',
        pujaType: '',
        date: '',
        mode: 'Online',
        message: '',
        status: 'Pending'
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const resetForm = () => {
        setFormData({
            name: '',
            mobile: '',
            city: '',
            pujaType: '',
            date: '',
            mode: 'Online',
            message: '',
            status: 'Pending'
        });
        setEditingId(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await updateBooking({ id: editingId, formData }).unwrap();
                toast.success('Booking updated successfully');
            } else {
                await createBooking(formData).unwrap();
                toast.success('New booking created');
            }
            resetForm();
        } catch (err) {
            toast.error(err.data?.message || 'Action failed');
        }
    };

    const handleEdit = (booking) => {
        setFormData({
            name: booking.name,
            mobile: booking.mobile,
            city: booking.city,
            pujaType: booking.pujaType,
            date: booking.date,
            mode: booking.mode,
            message: booking.message || '',
            status: booking.status || 'Pending'
        });
        setEditingId(booking._id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleView = (booking) => {
        setSelectedBooking(booking);
        setIsViewModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this booking?')) {
            try {
                await deleteBooking(id).unwrap();
                toast.success('Booking deleted');
            } catch (err) {
                toast.error('Failed to delete');
            }
        }
    };

    // Filter Logic
    const filteredBookings = bookings.filter(b => {
        const matchesSearch = b.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             b.mobile.includes(searchTerm) ||
                             b.pujaType.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'All' || b.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    if (isLoading) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
        </div>
    );

    return (
        <div className="p-4 md:p-6 bg-gray-50/50 min-h-screen">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight italic-none">Puja Bookings <span className="text-orange-600">Manager</span></h1>
                    <p className="text-sm text-gray-500 font-medium italic-none">Monitor and manage all customer puja reservation requests</p>
                </div>
            </div>

            {/* Compact Form Section */}
            <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-xl shadow-blue-900/5 mb-8">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-900 font-bold">
                        {editingId ? <Edit2 size={18} /> : <Plus size={18} />}
                    </div>
                    <h2 className="text-lg font-black text-gray-800 uppercase tracking-tight">
                        {editingId ? 'Edit Booking Entry' : 'Add Manual Booking'}
                    </h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Row 1 */}
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider pl-1 font-black">Customer Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                <input
                                    type="text" name="name" value={formData.name} onChange={handleInputChange} required
                                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-900 transition-all font-bold text-gray-700"
                                    placeholder="e.g. Rahul Kumar"
                                />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider pl-1 font-black">Mobile Number</label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                <input
                                    type="tel" name="mobile" value={formData.mobile} onChange={handleInputChange} required
                                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-900 transition-all font-bold text-gray-700"
                                    placeholder="98765 43210"
                                />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider pl-1 font-black">City</label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                <input
                                    type="text" name="city" value={formData.city} onChange={handleInputChange} required
                                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-900 transition-all font-bold text-gray-700"
                                    placeholder="e.g. New Delhi"
                                />
                            </div>
                        </div>

                        {/* Row 2 */}
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider pl-1 font-black">Puja Type</label>
                            <select
                                name="pujaType" value={formData.pujaType} onChange={handleInputChange} required
                                className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-900 transition-all font-bold text-gray-700"
                            >
                                <option value="">Select a Puja</option>
                                {offerings.map(o => (
                                    <option key={o._id} value={o.title}>{o.title}</option>
                                ))}
                                <option value="Other">Other / Custom</option>
                            </select>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider pl-1 font-black">Date</label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                <input
                                    type="date" name="date" value={formData.date} onChange={handleInputChange} required
                                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-900 transition-all font-bold text-gray-700"
                                />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider pl-1 font-black">Mode</label>
                            <select
                                name="mode" value={formData.mode} onChange={handleInputChange} required
                                className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-900 transition-all font-bold text-gray-700"
                            >
                                <option value="Online">Online Video Call</option>
                                <option value="Home Visit">Pandit at Home</option>
                                <option value="Muhurat">Only Muhurat</option>
                            </select>
                        </div>

                        {/* Row 3 */}
                        <div className="md:col-span-2 space-y-1.5">
                            <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider pl-1 font-black">Message / Special Requirements</label>
                            <div className="relative">
                                <MessageCircle className="absolute left-3 top-3 text-gray-400" size={16} />
                                <textarea
                                    name="message" value={formData.message} onChange={handleInputChange}
                                    className="w-full pl-10 pr-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-xl h-14 resize-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-900 transition-all"
                                    placeholder="Any specific family requirements or rituals..."
                                />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider pl-1 font-black">Status</label>
                            <select
                                name="status" value={formData.status} onChange={handleInputChange}
                                className={`w-full px-4 py-2.5 text-sm border-2 rounded-xl focus:ring-2 transition-all font-black uppercase tracking-widest ${
                                    formData.status === 'Pending' ? 'bg-amber-50 border-amber-200 text-amber-700' :
                                    formData.status === 'Confirmed' ? 'bg-blue-50 border-blue-200 text-blue-700' :
                                    formData.status === 'Cancelled' ? 'bg-red-50 border-red-200 text-red-700' :
                                    'bg-green-50 border-green-200 text-green-700'
                                }`}
                            >
                                <option value="Pending">Pending</option>
                                <option value="Confirmed">Confirmed</option>
                                <option value="Completed">Completed</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-50">
                        <button type="button" onClick={resetForm} className="px-5 py-2 text-[10px] font-black text-white bg-red-400 hover:bg-red-500 rounded-xl transition-all uppercase tracking-[0.2em]">
                            Clear / Cancel
                        </button>
                        <button type="submit" className="px-8 py-2.5 bg-green-600 text-white font-black rounded-xl shadow-lg shadow-green-100 hover:bg-green-700 transition-all flex items-center gap-2 uppercase tracking-widest text-xs">
                            <Save size={18} /> {editingId ? 'Update Booking' : 'Save Booking'}
                        </button>
                    </div>
                </form>
            </div>

            {/* Table Section */}
            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-blue-900/5 overflow-hidden">
                {/* Table Filters */}
                <div className="p-6 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="relative flex-1 max-w-md">
                        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search by name, phone or puja..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:ring-2 focus:ring-blue-500/10 outline-none"
                        />
                    </div>
                    <div className="flex items-center gap-3 overflow-x-auto pb-1">
                        {['All', 'Pending', 'Confirmed', 'Completed', 'Cancelled'].map(status => (
                            <button
                                key={status}
                                onClick={() => setFilterStatus(status)}
                                className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                                    filterStatus === status 
                                    ? 'bg-blue-900 text-white shadow-lg shadow-blue-200' 
                                    : 'bg-white text-gray-500 border border-gray-100 hover:bg-gray-50'
                                }`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="overflow-x-auto scrollbar-hide">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50/50">
                            <tr>
                                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">S.No</th>
                                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Customer Details</th>
                                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Puja Required</th>
                                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Scheduling</th>
                                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Status</th>
                                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredBookings.map((booking, idx) => (
                                <tr key={booking._id} className="hover:bg-blue-50/30 transition-colors group">
                                    <td className="px-6 py-4">
                                        <span className="text-xs font-black text-gray-400">{idx + 1}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-gray-800 uppercase leading-none mb-1">{booking.name}</span>
                                            <span className="text-[11px] font-black text-blue-900 flex items-center gap-1">
                                                <Phone size={10} /> {booking.mobile}
                                            </span>
                                            <span className="text-[10px] font-bold text-gray-400 uppercase flex items-center gap-1">
                                                <MapPin size={10} /> {booking.city}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-black text-gray-700 uppercase leading-tight mb-1">{booking.pujaType}</span>
                                            <span className={`text-[10px] font-black px-2 py-0.5 rounded-full w-max uppercase tracking-tighter ${
                                                booking.mode === 'Online' ? 'bg-purple-100 text-purple-700' :
                                                booking.mode === 'Home Visit' ? 'bg-teal-100 text-teal-700' :
                                                'bg-amber-100 text-amber-700'
                                            }`}>
                                                {booking.mode}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <div className="flex items-center gap-1.5 text-gray-600 mb-1">
                                                <Calendar size={13} strokeWidth={2.5} />
                                                <span className="text-xs font-black uppercase">{booking.date}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-gray-400">
                                                <Clock size={13} />
                                                <span className="text-[10px] font-bold uppercase">Reserved Slot</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`inline-flex px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-full border ${
                                            booking.status === 'Pending' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                                            booking.status === 'Confirmed' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                                            booking.status === 'Cancelled' ? 'bg-red-50 text-red-600 border-red-100' :
                                            'bg-green-50 text-green-600 border-green-100'
                                        }`}>
                                            {booking.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            <button onClick={() => handleView(booking)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all" title="View Details">
                                                <Eye size={18} />
                                            </button>
                                            <button onClick={() => handleEdit(booking)} className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-all" title="Edit Entry">
                                                <Edit2 size={18} />
                                            </button>
                                            <button onClick={() => handleDelete(booking._id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all" title="Delete Booking">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* View Modal */}
            {isViewModalOpen && selectedBooking && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div onClick={() => setIsViewModalOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
                    <div className="relative bg-white w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-2xl animate-scale-in">
                        <div className="bg-blue-900 px-8 py-10 text-white relative">
                            <button onClick={() => setIsViewModalOpen(false)} className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors">
                                <X size={24} />
                            </button>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-yellow-400 shadow-inner">
                                    <Activity size={28} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black uppercase tracking-tight">{selectedBooking.pujaType}</h3>
                                    <p className="text-white/60 text-xs font-bold uppercase tracking-widest tracking-tighter">Booking ID: #{selectedBooking._id.slice(-6).toUpperCase()}</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest tracking-tighter">Client Name</p>
                                    <p className="text-sm font-bold text-gray-800 uppercase">{selectedBooking.name}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest tracking-tighter">Contact Number</p>
                                    <p className="text-sm font-bold text-blue-900">{selectedBooking.mobile}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest tracking-tighter">Location</p>
                                    <p className="text-sm font-bold text-gray-800 uppercase">{selectedBooking.city}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest tracking-tighter">Puja Mode</p>
                                    <p className="text-sm font-bold text-gray-800 uppercase">{selectedBooking.mode}</p>
                                </div>
                            </div>

                            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Message / Notes</p>
                                <p className="text-sm text-gray-600 italic font-medium">"{selectedBooking.message || 'No special requirements mentioned.'}"</p>
                            </div>

                            <div className="flex items-center justify-between pb-2">
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Registered on {new Date(selectedBooking.createdAt).toLocaleDateString()}</span>
                                </div>
                                <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                                    selectedBooking.status === 'Pending' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                                    selectedBooking.status === 'Confirmed' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                                    'bg-green-50 text-green-600 border-green-100'
                                }`}>
                                    {selectedBooking.status}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                .animate-scale-in { animation: scaleIn 0.3s ease-out; }
                @keyframes scaleIn { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
            `}</style>
        </div>
    );
};

export default BookPujaManager;
