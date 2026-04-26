import React, { useState, useEffect } from 'react';
import VendorPageHeader from '../../../components/VendorPageHeader';
import { useAuth } from '../../../auth/AuthContext';
import {
  useGetVendorServicesQuery,
  useAddVendorServiceMutation,
  useUpdateVendorServiceMutation,
  useDeleteVendorServiceMutation,
  useUploadVendorFileMutation
} from '../../../../../services/vendorApi';
import { toast } from 'react-toastify';

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
  Search,
  ChevronRight,
  X,
  Save,
  CalendarDays,
  FileText,
  Power,
  Star,
  Gift,
  Filter,
  Upload,
  RefreshCw
} from 'lucide-react';

const SevasPujas = () => {
  const { user } = useAuth();
  const [filter, setFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedSeva, setSelectedSeva] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [tempImageUrl, setTempImageUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  // RTK Query hooks
  const { data: servicesResponse, isLoading: isFetching } = useGetVendorServicesQuery(user?._id, {
    skip: !user?._id
  });
  const [addService, { isLoading: isAdding }] = useAddVendorServiceMutation();
  const [updateService, { isLoading: isUpdating }] = useUpdateVendorServiceMutation();
  const [deleteService, { isLoading: isDeleting }] = useDeleteVendorServiceMutation();
  const [uploadFile] = useUploadVendorFileMutation();

  const sevas = servicesResponse?.data || [];
  const isLoading = isFetching || isAdding || isUpdating || isDeleting;

  const unreadCount = sevas.filter(s => !s.isRead).length;

  const getSevaIcon = (category) => {
    switch (category) {
      case 'puja': return <Bell className="w-5 h-5 text-orange-500" />;
      case 'donation': return <IndianRupee className="w-5 h-5 text-green-600" />;
      case 'katha': return <FileText className="w-5 h-5 text-purple-600" />;
      case 'special': return <Star className="w-5 h-5 text-red-500" />;
      default: return <Gift className="w-5 h-5 text-blue-600" />;
    }
  };

  const getPriorityStyles = (priority) => {
    const base = "px-2 py-0.5 rounded-full text-xs font-medium";
    switch (priority) {
      case 'critical': return `${base} bg-red-50 text-red-700`;
      case 'high': return `${base} bg-orange-50 text-orange-500`;
      case 'medium': return `${base} bg-blue-50 text-blue-600`;
      case 'low': return `${base} bg-gray-100 text-gray-600`;
      default: return `${base} bg-gray-100 text-gray-600`;
    }
  };

  const getStatusStyles = (status) => {
    const base = "px-2 py-0.5 rounded-full text-xs font-medium";
    switch (status) {
      case 'active': return `${base} bg-green-50 text-green-700`;
      case 'inactive': return `${base} bg-gray-100 text-gray-600`;
      default: return `${base} bg-gray-100 text-gray-600`;
    }
  };

  const getApprovalStatusStyles = (status) => {
    const base = "px-2 py-0.5 rounded-full text-xs font-medium uppercase tracking-wider";
    switch (status) {
      case 'approved': return `${base} bg-emerald-50 text-emerald-600 border border-emerald-100`;
      case 'pending': return `${base} bg-amber-50 text-amber-600 border border-amber-100`;
      case 'rejected': return `${base} bg-red-50 text-red-600 border border-red-100`;
      default: return `${base} bg-gray-100 text-gray-600`;
    }
  };

  const handleAction = async (action, seva = null) => {
    switch (action) {
      case 'add':
        setModalMode('add');
        setSelectedSeva(null);
        setTempImageUrl('');
        setShowModal(true);
        break;
      case 'edit':
        setModalMode('edit');
        setSelectedSeva(seva);
        setTempImageUrl(seva.image || '');
        setShowModal(true);
        break;
      case 'delete':
        if (window.confirm('Are you sure you want to delete this seva?')) {
          try {
            await deleteService(seva._id).unwrap();
            toast.success('Seva deleted successfully');
          } catch (err) {
            toast.error(err.data?.message || 'Failed to delete seva');
          }
        }
        break;
      case 'toggleStatus':
        try {
          const newStatus = seva.status === 'active' ? 'inactive' : 'active';
          await updateService({ id: seva._id, status: newStatus }).unwrap();
          toast.success(`Seva ${newStatus === 'active' ? 'activated' : 'deactivated'}`);
        } catch (err) {
          toast.error(err.data?.message || 'Failed to update status');
        }
        break;
      case 'markAsRead':
        if (!seva.isRead) {
          try {
            await updateService({ id: seva._id, isRead: true }).unwrap();
          } catch (err) {
            console.error('Failed to mark as read', err);
          }
        }
        break;
    }
  };

  const filteredSevas = filter === 'all'
    ? sevas
    : filter === 'active'
      ? sevas.filter(s => s.status === 'active')
      : filter === 'inactive'
        ? sevas.filter(s => s.status === 'inactive')
        : sevas.filter(s => s.category === filter);

  const filteredBySearch = filteredSevas.filter(seva =>
    seva.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    seva.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      title: formData.get('title'),
      price: Number(formData.get('price')),
      duration: formData.get('duration'),
      slots: Number(formData.get('slots')),
      description: formData.get('description'),
      category: formData.get('category'),
      priority: formData.get('priority'),
      image: tempImageUrl,
      imageAlt: formData.get('imageAlt'),
      slug: formData.get('slug'),
      vendorId: user?._id
    };

    try {
      if (modalMode === 'add') {
        await addService(data).unwrap();
        toast.success('Seva added successfully');
      } else {
        await updateService({ id: selectedSeva._id, ...data }).unwrap();
        toast.success('Seva updated successfully');
      }
      setShowModal(false);
    } catch (err) {
      toast.error(err.data?.message || 'Something went wrong');
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      setIsUploading(true);
      const res = await uploadFile(formData).unwrap();
      setTempImageUrl(res.url);
      toast.success('Image uploaded successfully');
    } catch (err) {
      toast.error('Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[150] flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 flex flex-col items-center gap-3 shadow-xl">
            <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm text-gray-700">Processing...</p>
          </div>
        </div>
      )}
      <VendorPageHeader title="SEVAS & PUJAS" subtitle="Manage temple services and offerings" />

      <div className="space-y-4 p-6">
        <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg px-3 py-2 border border-orange-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <p className="text-[17px] text-gray-600">
                {sevas.filter(s => s.status === 'active').length} active sevas • {sevas.length} total services
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm text-gray-600">Avg. Service Price</p>
                <p className="text-[15px] font-semibold text-orange-500">
                  ₹{sevas.length > 0 ? Math.round(sevas.reduce((acc, s) => acc + s.price, 0) / sevas.length).toLocaleString('en-IN') : 0}
                </p>
              </div>
              <div className="w-8 h-8 bg-orange-50 rounded flex items-center justify-center">
                <IndianRupee className="w-5 h-5 text-orange-500" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg border border-gray-200 px-3 py-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Sevas</p>
                <p className="text-xl font-semibold text-gray-800 mt-1">{sevas.length}</p>
              </div>
              <div className="p-2 bg-orange-50 rounded"><Bell className="w-5 h-5 text-orange-600" /></div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg border border-gray-200 px-3 py-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Sevas</p>
                <p className="text-xl font-semibold text-gray-800 mt-1">{sevas.filter(s => s.status === 'active').length}</p>
              </div>
              <div className="p-2 bg-green-50 rounded"><CheckCircle2 className="w-5 h-5 text-green-600" /></div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg border border-gray-200 px-3 py-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Capacity</p>
                <p className="text-xl font-semibold text-gray-800 mt-1">{sevas.reduce((acc, s) => acc + (s.slots || 0), 0)}</p>
              </div>
              <div className="p-2 bg-blue-50 rounded"><Users className="w-5 h-5 text-blue-600" /></div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg border border-gray-200 px-3 py-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Unread Updates</p>
                <p className="text-xl font-semibold text-gray-800 mt-1">{unreadCount}</p>
              </div>
              <div className="p-2 bg-yellow-50 rounded"><AlertCircle className="w-5 h-5 text-yellow-500" /></div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button onClick={() => handleAction('add')} className="px-4 py-2 bg-orange-500 text-white text-sm font-medium rounded-lg hover:bg-orange-600 flex items-center gap-2 shadow-sm">
            <PlusCircle className="w-4 h-4" /> Add New Seva
          </button>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="w-full sm:w-64 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Search className="w-4 h-4 text-gray-400" /></div>
              <input type="text" placeholder="Search sevas..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-8 pr-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-300" />
            </div>

            <div className="flex flex-wrap gap-2">
              {['all', 'active', 'inactive'].map((f) => (
                <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 rounded-lg text-sm font-medium capitalize transition-all ${filter === f ? 'bg-orange-500 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                  {f} ({f === 'all' ? sevas.length : sevas.filter(s => s.status === f).length})
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
              <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gray-50/50">
                <h3 className="text-[15px] font-bold text-gray-800">All Sevas & Pujas</h3>
                <span className="text-sm text-gray-600 font-medium">{filteredBySearch.length} items</span>
              </div>

              <div className="divide-y divide-gray-200">
                {filteredBySearch.map((seva) => (
                  <div key={seva._id} className={`p-4 transition-all cursor-pointer ${!seva.isRead ? 'bg-orange-50/40' : 'hover:bg-gray-50/80'}`} onClick={() => handleAction('markAsRead', seva)}>
                    <div className="flex gap-4">
                      <div className={`flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden flex items-center justify-center shadow-sm border ${!seva.isRead ? 'bg-white border-orange-200' : 'bg-gray-100 border-gray-100'}`}>
                        {seva.image ? (
                          <img src={seva.image} alt={seva.imageAlt || seva.title} className="w-full h-full object-cover" />
                        ) : (
                          getSevaIcon(seva.category)
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="text-[14px] font-semibold text-gray-800">{seva.title}</h4>
                            <span className={getPriorityStyles(seva.priority)}>{seva.priority}</span>
                            <span className={getStatusStyles(seva.status)}>{seva.status}</span>
                            <span className={getApprovalStatusStyles(seva.approvalStatus)}>{seva.approvalStatus}</span>
                            {!seva.isRead && <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>}
                          </div>
                          <span className="text-xs text-gray-500 font-medium">{new Date(seva.createdAt).toLocaleDateString()}</span>
                        </div>

                        <p className="text-sm text-gray-700 mb-2 line-clamp-2">{seva.description}</p>

                        {seva.approvalStatus === 'rejected' && seva.rejectionReason && (
                          <div className="mb-3 p-2 bg-red-50 border border-red-100 rounded-lg flex items-start gap-2">
                            <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                            <p className="text-xs text-red-700 italic">Rejection Reason: {seva.rejectionReason}</p>
                          </div>
                        )}

                        <div className="flex flex-wrap gap-2 mb-3">
                          <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full flex items-center gap-1 border border-gray-200"><IndianRupee className="w-3 h-3" />₹{seva.price}</span>
                          <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full flex items-center gap-1 border border-gray-200"><Clock className="w-3 h-3" />{seva.duration}</span>
                          <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full flex items-center gap-1 border border-gray-200"><Users className="w-3 h-3" />{seva.slots}/day</span>
                        </div>

                        <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100">
                          <button onClick={(e) => { e.stopPropagation(); handleAction('edit', seva); }} className="px-3 py-1 text-xs bg-orange-50 text-orange-600 rounded-md border border-orange-200 hover:bg-orange-100 transition-colors flex items-center gap-1 font-medium"><Edit3 className="w-3 h-3" /> Edit</button>
                          <button onClick={(e) => { e.stopPropagation(); handleAction('toggleStatus', seva); }} className={`px-3 py-1 text-xs rounded-md border transition-colors flex items-center gap-1 font-medium ${seva.status === 'active' ? 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50' : 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100'}`}><Power className="w-3 h-3" /> {seva.status === 'active' ? 'Deactivate' : 'Activate'}</button>
                          <button onClick={(e) => { e.stopPropagation(); handleAction('delete', seva); }} className="px-3 py-1 text-xs bg-white text-red-600 rounded-md border border-red-200 hover:bg-red-50 transition-colors flex items-center gap-1 font-medium"><Trash2 className="w-3 h-3" /> Delete</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {filteredBySearch.length === 0 && (
                  <div className="p-12 text-center">
                    <div className="p-5 rounded-full inline-flex bg-gray-100 mb-4 text-gray-400"><Bell className="w-12 h-12" /></div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">No sevas found</h3>
                    <p className="text-sm text-gray-500 mb-6">Start growing your temple services by adding your first seva today.</p>
                    <button onClick={() => handleAction('add')} className="px-5 py-2 bg-orange-500 text-white text-sm font-bold rounded-xl hover:bg-orange-600 flex items-center gap-2 mx-auto shadow-lg shadow-orange-500/20 transition-all active:scale-95"><PlusCircle className="w-5 h-5" /> Add First Seva</button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
              <h3 className="text-[15px] font-bold text-gray-800 mb-4 flex items-center gap-2"><Filter className="w-4 h-4 text-orange-500" /> Categories</h3>
              <div className="space-y-3">
                {['puja', 'donation', 'katha', 'special'].map(cat => (
                  <div key={cat} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="flex items-center gap-2">
                      <div className={`p-1.5 rounded-lg ${cat === 'puja' ? 'bg-orange-50' : cat === 'donation' ? 'bg-green-50' : cat === 'katha' ? 'bg-purple-50' : 'bg-red-50'}`}>
                        {cat === 'puja' ? <Bell className="w-4 h-4 text-orange-600" /> : cat === 'donation' ? <IndianRupee className="w-4 h-4 text-green-600" /> : cat === 'katha' ? <FileText className="w-4 h-4 text-purple-600" /> : <Star className="w-4 h-4 text-red-500" />}
                      </div>
                      <span className="text-sm text-gray-700 capitalize font-medium">{cat}</span>
                    </div>
                    <span className="text-sm font-bold text-gray-800 bg-gray-100 px-2 py-0.5 rounded-md">{sevas.filter(s => s.category === cat).length}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
              <h3 className="text-[15px] font-bold text-gray-800 mb-4 flex items-center gap-2"><CalendarDays className="w-4 h-4 text-blue-500" /> Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm"><span className="text-gray-600">Total Capacity</span><span className="font-bold text-gray-800">{sevas.reduce((acc, s) => acc + (s.slots || 0), 0)}/day</span></div>
                <div className="flex items-center justify-between text-sm"><span className="text-gray-600">Avg. Price</span><span className="font-bold text-gray-800">₹{sevas.length > 0 ? Math.round(sevas.reduce((acc, s) => acc + s.price, 0) / sevas.length) : 0}</span></div>
                <div className="flex items-center justify-between text-sm"><span className="text-gray-600">Active %</span><span className="font-bold text-green-600">{sevas.length > 0 ? Math.round((sevas.filter(s => s.status === 'active').length / sevas.length) * 100) : 0}%</span></div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-5 text-white shadow-lg shadow-orange-500/30">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md">
                  <AlertCircle className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold">Pro Tip</h4>
              </div>
              <p className="text-sm text-orange-50 leading-relaxed">
                Keeping your service descriptions detailed helps devotees understand the significance of the ritual and increases bookings.
              </p>
            </div>
          </div>
        </div>

        {/* Support Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
              <Gift className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-gray-800">Need help managing services?</h4>
              <p className="text-sm text-gray-500">Our support team is available 24/7 to help you optimize your offerings.</p>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none px-6 py-2.5 text-sm font-bold text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all">View Docs</button>
            <button className="flex-1 md:flex-none px-6 py-2.5 text-sm font-bold text-white bg-gray-800 rounded-xl hover:bg-gray-900 transition-all shadow-lg shadow-gray-200">Contact Support</button>
          </div>
        </div>
      </div>
      <SevaModal
        showModal={showModal}
        setShowModal={setShowModal}
        modalMode={modalMode}
        selectedSeva={selectedSeva}
        tempImageUrl={tempImageUrl}
        isUploading={isUploading}
        handleFileChange={handleFileChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

const SevaModal = ({
  showModal,
  setShowModal,
  modalMode,
  selectedSeva,
  tempImageUrl,
  isUploading,
  handleFileChange,
  handleSubmit
}) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 px-4 py-3 border-b border-orange-100 sticky top-0 bg-white z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-orange-50 rounded flex items-center justify-center">
                {modalMode === 'add' ? <PlusCircle className="w-5 h-5 text-orange-500" /> : <Edit3 className="w-5 h-5 text-orange-500" />}
              </div>
              <h3 className="text-[15px] font-bold text-gray-800">
                {modalMode === 'add' ? 'Add New Seva' : 'Edit Seva'}
              </h3>
            </div>
            <button onClick={() => setShowModal(false)} className="p-1 hover:bg-gray-100 rounded transition-colors">
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Seva Name <span className="text-red-500">*</span></label>
            <input 
              type="text" 
              name="title" 
              defaultValue={selectedSeva?.title || ''} 
              required 
              onChange={(e) => {
                const title = e.target.value;
                const slugInput = e.target.form.slug;
                if (modalMode === 'add' && slugInput) {
                  slugInput.value = title.toLowerCase().split(' ').join('-').replace(/[^\w-]+/g, '');
                }
              }}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-500 text-sm outline-none shadow-sm" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL Path) <span className="text-orange-500 text-[10px] uppercase font-bold ml-1">SEO Friendly</span></label>
            <input type="text" name="slug" defaultValue={selectedSeva?.slug || ''} placeholder="e.g. maha-aarti-special" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 text-sm" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹) <span className="text-red-500">*</span></label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><IndianRupee className="w-4 h-4 text-gray-400" /></div>
                <input type="number" name="price" defaultValue={selectedSeva?.price || ''} required min="1" className="w-full pl-8 pr-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-500 text-sm outline-none shadow-sm" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duration <span className="text-red-500">*</span></label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Clock className="w-4 h-4 text-gray-400" /></div>
                <input type="text" name="duration" defaultValue={selectedSeva?.duration || ''} required className="w-full pl-8 pr-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-500 text-sm outline-none shadow-sm" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Max Bookings Per Day <span className="text-red-500">*</span></label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Users className="w-4 h-4 text-gray-400" /></div>
                <input type="number" name="slots" defaultValue={selectedSeva?.slots || ''} required min="1" className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 text-sm" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category <span className="text-red-500">*</span></label>
              <select name="category" defaultValue={selectedSeva?.category || 'puja'} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 text-sm">
                <option value="puja">Puja</option>
                <option value="donation">Donation</option>
                <option value="katha">Katha</option>
                <option value="special">Special</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
            <select name="priority" defaultValue={selectedSeva?.priority || 'medium'} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 text-sm">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea name="description" defaultValue={selectedSeva?.description || ''} rows="3" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 text-sm" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Service Image <span className="text-red-500">*</span></label>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="relative group cursor-pointer">
                    <input
                      type="file"
                      onChange={handleFileChange}
                      accept="image/*"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="w-full px-4 py-3 bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl flex items-center justify-center gap-2 group-hover:border-orange-300 transition-all">
                      {isUploading ? (
                        <RefreshCw className="w-4 h-4 text-orange-500 animate-spin" />
                      ) : (
                        <Upload className="w-4 h-4 text-gray-400 group-hover:text-orange-500" />
                      )}
                      <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                        {isUploading ? 'Uploading...' : tempImageUrl ? 'Change Image' : 'Select Photo'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image Alt Tag (SEO) <span className="text-orange-500 text-[10px] uppercase font-bold ml-1">Critical for Google</span></label>
              <input type="text" name="imageAlt" defaultValue={selectedSeva?.imageAlt || ''} placeholder="e.g. Maha Aarti at Shri Ram Mandir" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 text-sm" />
            </div>
          </div>

          {tempImageUrl && (
            <div className="p-3 bg-gray-50 rounded-xl border border-dashed border-gray-200">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Image Preview</p>
              <img src={tempImageUrl} alt="Preview" className="w-full h-32 object-cover rounded-lg shadow-sm" />
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 sticky bottom-0 bg-white">
            <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-sm bg-gray-100 text-gray-800 rounded border border-gray-300 hover:bg-gray-200">Cancel</button>
            <button type="submit" disabled={isUploading} className="px-4 py-2 text-sm bg-orange-500 text-white rounded hover:bg-orange-600 flex items-center gap-2">
              <Save className="w-4 h-4" />
              {modalMode === 'add' ? 'Add Seva' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SevasPujas;
