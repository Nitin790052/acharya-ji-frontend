import React, { useState } from 'react';
import { 
  useGetCareerContentQuery, 
  useCreateCareerContentMutation, 
  useUpdateCareerContentMutation, 
  useDeleteCareerContentMutation,
  useSeedCareerContentWithTypeMutation
} from '../../../../../services/careerContentApi';
import { 
  Plus, Edit2, Trash2, Eye, X, Check, AlertCircle, Save, 
  Users, TrendingUp, Clock, Shield, Award, Heart, GraduationCap,
  Sparkles, Star, MapPin, Briefcase, Globe, BookOpen, Database
} from 'lucide-react';
import RichTextEditor from '../../components/RichTextEditor';
import { toast } from 'react-toastify';
import { BACKEND_URL } from '../../../../../config/apiConfig';

const API_URL = BACKEND_URL;

const CONTENT_TYPES = [
  { id: 'eligibility', label: 'Eligibility', icon: Star },
  { id: 'benefit', label: 'Benefits', icon: Shield },
  { id: 'role', label: 'Roles', icon: Briefcase },
  { id: 'testimonial', label: 'Testimonials', icon: Users }
];

const LUCIDE_ICONS = {
  Users, TrendingUp, Clock, Shield, Award, Heart, 
  GraduationCap, Sparkles, Star, MapPin, Briefcase, 
  Globe, BookOpen
};

export default function CareerContentManager() {
  const { data: content, isLoading } = useGetCareerContentQuery();
  const [createContent] = useCreateCareerContentMutation();
  const [updateContent] = useUpdateCareerContentMutation();
  const [deleteContent] = useDeleteCareerContentMutation();
  const [seedContent, { isLoading: isSeeding }] = useSeedCareerContentWithTypeMutation();

  const [activeTab, setActiveTab] = useState('eligibility');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [viewingData, setViewingData] = useState(null);

  const [formData, setFormData] = useState({
    type: 'eligibility',
    title: '',
    subtitle: '',
    description: '',
    icon: 'Star',
    image: null,
    items: '',
    location: '',
    name: '',
    order: 0,
    isActive: true
  });

  const handleOpenModal = (data = null) => {
    if (data) {
      setEditingId(data._id);
      setFormData({
        ...data,
        items: data.items ? data.items.join(', ') : '',
        image: null
      });
    } else {
      setEditingId(null);
      setFormData({
        type: activeTab,
        title: '',
        subtitle: '',
        description: '',
        icon: 'Star',
        image: null,
        items: '',
        location: '',
        name: '',
        order: content ? content.filter(c => c.type === activeTab).length + 1 : 0,
        isActive: true
      });
    }
    setIsModalOpen(true);
  };

  const handleOpenViewModal = (data) => {
    setViewingData(data);
    setIsViewModalOpen(true);
  };

  const handleSeed = async () => {
    if (window.confirm(`Are you sure you want to seed default data for ${activeTab}? This will replace existing data for this category.`)) {
      try {
        await seedContent(activeTab).unwrap();
        toast.success(`${activeTab} seeded successfully`);
      } catch (err) {
        toast.error('Seeding failed');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submitData = new FormData();
    
    Object.keys(formData).forEach(key => {
      if (key === 'image') {
        if (formData[key] instanceof File) {
          submitData.append('image', formData[key]);
        }
      } else if (key === 'items') {
        submitData.append(key, formData[key]);
      } else {
        submitData.append(key, formData[key] !== null ? formData[key] : '');
      }
    });

    try {
      if (editingId) {
        await updateContent({ id: editingId, body: submitData }).unwrap();
        toast.success('Updated successfully');
      } else {
        await createContent(submitData).unwrap();
        toast.success('Created successfully');
      }
      setIsModalOpen(false);
    } catch (err) {
      toast.error(err.data?.message || 'Action failed');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this item?')) {
      try {
        await deleteContent(id).unwrap();
        toast.success('Deleted successfully');
      } catch (err) {
        toast.error('Delete failed');
      }
    }
  };

  const filteredContent = content?.filter(c => c.type === activeTab) || [];

  if (isLoading) return <div className="p-8 text-center text-orange-600 font-bold">Loading Career Manager...</div>;

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-orange-100">
          <div>
            <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Career Content <span className="text-orange-600">Manager</span></h1>
            <p className="text-sm text-gray-500 font-medium">Manage eligibility, benefits, roles and testimonials for careers</p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <button 
              onClick={handleSeed}
              disabled={isSeeding}
              className="flex items-center gap-2 bg-amber-50 hover:bg-amber-100 text-amber-700 px-5 py-3 rounded-xl font-bold transition-all border border-amber-200 disabled:opacity-50"
              title="Add default seed data for this category"
            >
              <Database size={18} className={isSeeding ? 'animate-pulse' : ''} /> 
              {isSeeding ? 'Seeding...' : 'Quick Seed'}
            </button>
            <button 
              onClick={() => handleOpenModal()}
              className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-orange-200 flex-1 md:flex-none justify-center"
            >
              <Plus size={20} /> Add New {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 bg-white p-2 rounded-2xl shadow-sm border border-orange-50">
          {CONTENT_TYPES.map((type) => (
            <button
              key={type.id}
              onClick={() => setActiveTab(type.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                activeTab === type.id 
                ? 'bg-orange-600 text-white shadow-md' 
                : 'text-gray-500 hover:bg-orange-50'
              }`}
            >
              <type.icon size={18} /> {type.label}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-orange-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-orange-50/50 border-b border-orange-100">
              <tr>
                <th className="p-4 text-[10px] font-black uppercase tracking-widest text-[#4A3427]">SR.</th>
                <th className="p-4 text-[10px] font-black uppercase tracking-widest text-[#4A3427]">Display</th>
                <th className="p-4 text-[10px] font-black uppercase tracking-widest text-[#4A3427]">Title / Name</th>
                <th className="p-4 text-[10px] font-black uppercase tracking-widest text-[#4A3427]">Order</th>
                <th className="p-4 text-[10px] font-black uppercase tracking-widest text-[#4A3427]">Status</th>
                <th className="p-4 text-[10px] font-black uppercase tracking-widest text-[#4A3427] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-orange-50">
              {filteredContent.map((item, idx) => {
                const IconComponent = LUCIDE_ICONS[item.icon] || Star;
                return (
                  <tr key={item._id} className="hover:bg-orange-50/20 transition-colors">
                    <td className="p-4 text-sm font-bold text-gray-400">{idx + 1}</td>
                    <td className="p-4">
                      {item.image ? (
                        <img src={`${API_URL}${item.image}`} className="w-12 h-12 object-cover rounded-lg border border-orange-100" alt="display" />
                      ) : (
                        <div className="w-10 h-10 bg-orange-100 text-orange-600 flex items-center justify-center rounded-lg">
                          <IconComponent size={20} />
                        </div>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-[#2A1D13]">{item.title || item.name}</span>
                        {item.description && <span className="text-[10px] text-gray-400 line-clamp-1">{item.description}</span>}
                      </div>
                    </td>
                    <td className="p-4 text-sm font-black text-orange-600">{item.order}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 text-[10px] font-black uppercase rounded-full ${item.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {item.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => handleOpenViewModal(item)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Eye size={18}/></button>
                        <button onClick={() => handleOpenModal(item)} className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"><Edit2 size={18}/></button>
                        <button onClick={() => handleDelete(item._id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={18}/></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filteredContent.length === 0 && (
                <tr>
                  <td colSpan="6" className="p-12 text-center text-gray-400 font-medium italic">No {activeTab} content found. Click "Add New" to begin.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Editor Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="relative bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl">
            <div className="bg-orange-600 p-6 flex justify-between items-center text-white">
              <h2 className="text-xl font-black uppercase tracking-tight">{editingId ? 'Edit' : 'Add'} {activeTab}</h2>
              <button onClick={() => setIsModalOpen(false)}><X size={24}/></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Title / Category Name</label>
                  <input 
                    type="text" 
                    value={formData.title || formData.name || ''} 
                    onChange={(e) => setFormData({...formData, title: e.target.value, name: e.target.value})} 
                    className="w-full px-4 py-3 bg-gray-50 border border-orange-100 rounded-xl focus:border-orange-500 outline-none font-bold"
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Order Priority</label>
                  <input 
                    type="number" 
                    value={formData.order} 
                    onChange={(e) => setFormData({...formData, order: parseInt(e.target.value)})} 
                    className="w-full px-4 py-3 bg-gray-50 border border-orange-100 rounded-xl focus:border-orange-500 outline-none font-bold"
                  />
                </div>
              </div>

              {(activeTab === 'benefit' || activeTab === 'role') && (
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Select Icon</label>
                  <div className="grid grid-cols-6 gap-2">
                    {Object.keys(LUCIDE_ICONS).map(iconName => {
                      const IconComp = LUCIDE_ICONS[iconName];
                      return (
                        <button
                          key={iconName}
                          type="button"
                          onClick={() => setFormData({...formData, icon: iconName})}
                          className={`p-3 rounded-lg flex items-center justify-center transition-all ${
                            formData.icon === iconName ? 'bg-orange-600 text-white shadow-md' : 'bg-gray-50 text-gray-400 hover:bg-orange-50'
                          }`}
                        >
                          <IconComp size={20} />
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {activeTab === 'eligibility' && (
                <>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Bullet Points (Comma Separated)</label>
                    <textarea 
                      value={formData.items || ''} 
                      onChange={(e) => setFormData({...formData, items: e.target.value})} 
                      className="w-full px-4 py-3 bg-gray-50 border border-orange-100 rounded-xl focus:border-orange-500 outline-none font-bold min-h-[100px]"
                      placeholder="Bullet 1, Bullet 2, Bullet 3"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Feature Image</label>
                    <input 
                      type="file" 
                      onChange={(e) => setFormData({...formData, image: e.target.files[0]})} 
                      className="w-full px-4 py-3 bg-gray-50 border border-orange-100 rounded-xl focus:border-orange-500 outline-none font-bold"
                    />
                  </div>
                </>
              )}

              {(activeTab === 'testimonial' || activeTab === 'benefit' || activeTab === 'role') && (
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Description / Feedback Text (HTML Content)</label>
                  <RichTextEditor 
                    value={formData.description || ''} 
                    onChange={(content) => setFormData({...formData, description: content})} 
                    placeholder="Enter detailed description..."
                  />
                </div>
              )}

              {activeTab === 'testimonial' && (
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Location</label>
                  <input 
                    type="text" 
                    value={formData.location || ''} 
                    onChange={(e) => setFormData({...formData, location: e.target.value})} 
                    className="w-full px-4 py-3 bg-gray-50 border border-orange-100 rounded-xl focus:border-orange-500 outline-none font-bold"
                    placeholder="e.g. Varanasi, India"
                  />
                </div>
              )}

              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  checked={formData.isActive} 
                  onChange={(e) => setFormData({...formData, isActive: e.target.checked})} 
                  className="w-5 h-5 accent-orange-600" 
                />
                <span className="text-sm font-bold text-gray-600">Active and Visibility</span>
              </div>

              <div className="pt-6 flex gap-4">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)} 
                  className="flex-1 px-8 py-4 border-2 border-gray-100 rounded-xl font-bold hover:bg-gray-50 transition-all text-gray-500"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="flex-1 bg-orange-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-orange-700 transition-all shadow-lg shadow-orange-200"
                >
                  Save Data
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Modal */}
      {isViewModalOpen && viewingData && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsViewModalOpen(false)} />
          <div className="relative bg-[#FFFDF7] w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl">
            <div className="p-8 space-y-6">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-orange-600 text-white flex items-center justify-center rounded-2xl shadow-lg ring-4 ring-orange-100">
                    {viewingData.image ? (
                      <img src={`${API_URL}${viewingData.image}`} className="w-full h-full object-cover rounded-2xl" alt="View" />
                    ) : (
                      React.createElement(LUCIDE_ICONS[viewingData.icon] || Star, { size: 30 })
                    )}
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-[#2A1D13] uppercase tracking-tighter leading-none">{viewingData.title || viewingData.name}</h3>
                    <p className="text-orange-600 text-[10px] font-black uppercase tracking-widest mt-1">{viewingData.type}</p>
                  </div>
                </div>
                <button onClick={() => setIsViewModalOpen(false)} className="text-gray-300 hover:text-orange-600 transition-colors"><X size={24}/></button>
              </div>

              <div className="space-y-4 border-t border-orange-100 pt-6">
                {viewingData.description && (
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase text-gray-400">Description</p>
                    <p className="text-gray-600 font-medium leading-relaxed italic">"{viewingData.description}"</p>
                  </div>
                )}
                
                {viewingData.items?.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-[10px] font-black uppercase text-gray-400">Points & Criteria</p>
                    <div className="flex flex-wrap gap-2">
                      {viewingData.items.map((item, i) => (
                        <span key={i} className="flex items-center gap-2 px-4 py-2 bg-white border border-orange-100 text-[10px] font-bold text-gray-700 rounded-full">
                          <Check size={12} className="text-orange-600" /> {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4 pt-4">
                   <div className="bg-white p-4 rounded-2xl border border-orange-50">
                     <p className="text-[8px] font-black text-gray-400 uppercase mb-1">Display Order</p>
                     <p className="text-xl font-black text-orange-600">{viewingData.order}</p>
                   </div>
                   <div className="bg-white p-4 rounded-2xl border border-orange-50">
                     <p className="text-[8px] font-black text-gray-400 uppercase mb-1">Current Status</p>
                     <p className={`text-xs font-black uppercase ${viewingData.isActive ? 'text-green-600' : 'text-red-600'}`}>
                       {viewingData.isActive ? 'Enabled' : 'Disabled'}
                     </p>
                   </div>
                </div>
              </div>

              <button 
                onClick={() => setIsViewModalOpen(false)}
                className="w-full bg-[#2A1D13] text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-orange-600 transition-all shadow-xl"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
