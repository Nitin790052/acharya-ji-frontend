import React, { useState, useMemo } from 'react';
import {
    Plus, Search, Edit2, Trash2, Eye, X, Check, AlertCircle,
    Image as ImageIcon, Flame, Moon, ScrollText, Shield, Leaf,
    ShoppingCart, Video, Home, Star, Package, Truck, Gift, ArrowRight, Sparkles, Database
} from 'lucide-react';
import RichTextEditor from '../../components/RichTextEditor';
import {
    useGetAllServicesQuery,
    useCreateServiceMutation,
    useUpdateServiceMutation,
    useDeleteServiceMutation,
    useToggleActiveServiceMutation,
    useSeedServicesMutation
} from '../../../../../services/serviceApi';
import { toast } from 'react-toastify';
import { BACKEND_URL, getImageUrl } from '../../../../../config/apiConfig';

const ServiceManager = () => {
    const { data: services = [], isLoading, isError } = useGetAllServicesQuery(undefined, { pollingInterval: 3000 });
    const [createService] = useCreateServiceMutation();
    const [updateService] = useUpdateServiceMutation();
    const [deleteService] = useDeleteServiceMutation();
    const [toggleActive] = useToggleActiveServiceMutation();
    const [seedServices, { isLoading: isSeeding }] = useSeedServicesMutation();


    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [selectedService, setSelectedService] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('all');

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        href: '',
        category: 'core',
        icon: 'Sparkles',
        order: 0,
        slug: '',
        metaTitle: '',
        metaDescription: '',
        metaKeywords: '',
        canonicalUrl: '',
        imageAlt: ''
    });
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const iconList = [
        { name: 'Flame', icon: Flame },
        { name: 'Moon', icon: Moon },
        { name: 'ScrollText', icon: ScrollText },
        { name: 'Shield', icon: Shield },
        { name: 'Leaf', icon: Leaf },
        { name: 'ShoppingCart', icon: ShoppingCart },
        { name: 'Video', icon: Video },
        { name: 'Home', icon: Home },
        { name: 'Star', icon: Star },
        { name: 'Package', icon: Package },
        { name: 'Truck', icon: Truck },
        { name: 'Gift', icon: Gift },
        { name: 'ArrowRight', icon: ArrowRight },
        { name: 'Sparkles', icon: Sparkles }
    ];

    const filteredServices = useMemo(() => {
        return services.filter(s => {
            const matchesSearch = s.title.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = filterCategory === 'all' || s.category === filterCategory;
            return matchesSearch && matchesCategory;
        });
    }, [services, searchTerm, filterCategory]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleTitleChange = (e) => {
        const title = e.target.value;
        const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
        setFormData(prev => ({ ...prev, title, slug }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const resetForm = () => {
        setFormData({ title: '', description: '', href: '', category: 'core', icon: 'Sparkles', order: 0, slug: '', metaTitle: '', metaDescription: '', metaKeywords: '', canonicalUrl: '', imageAlt: '' });
        setImageFile(null);
        setImagePreview(null);
        setEditingId(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.keys(formData).forEach(key => data.append(key, formData[key]));
        if (imageFile) data.append('image', imageFile);

        try {
            if (editingId) {
                await updateService({ id: editingId, formData: data }).unwrap();
                toast.success('Service updated successfully');
            } else {
                await createService(data).unwrap();
                toast.success('Service created successfully');
            }
            resetForm();
        } catch (err) {
            toast.error(err.data?.message || 'Action failed');
        }
    };

    const handleEdit = (service) => {
        setFormData({
            title: service.title,
            description: service.description,
            href: service.href,
            category: service.category,
            icon: service.icon || 'Sparkles',
            order: service.order || 0,
            slug: service.slug || '',
            metaTitle: service.metaTitle || '',
            metaDescription: service.metaDescription || '',
            metaKeywords: service.metaKeywords || '',
            canonicalUrl: service.canonicalUrl || '',
            imageAlt: service.imageAlt || ''
        });
        setImagePreview(service.imageUrl ? getImageUrl(service.imageUrl) : null);
        setEditingId(service._id);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this service?')) {
            try {
                await deleteService(id).unwrap();
                toast.success('Service deleted');
            } catch (err) {
                toast.error('Deletion failed');
            }
        }
    };

    const handleToggleActive = async (id) => {
        try {
            await toggleActive(id).unwrap();
        } catch (err) {
            toast.error('Status update failed');
        }
    };

    const handleView = (service) => {
        setSelectedService(service);
        setIsViewModalOpen(true);
    };

    return (
        <div className="p-6 bg-gray-50/50 min-h-screen">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 uppercase">Service <span className="text-orange-600">Manager</span></h1>
                    <p className="text-sm text-gray-500 font-medium mt-1">Manage core and detailed services for the homepage</p>
                </div>
                <button
                    onClick={async () => {
                        if (window.confirm('Seed sample services? Current services will be deleted.')) {
                            try {
                                await seedServices().unwrap();
                                toast.success('Services seeded successfully');
                            } catch (err) {
                                toast.error('Seeding failed');
                            }
                        }
                    }}
                    disabled={isSeeding}
                    className="px-6 py-2.5 bg-blue-900 text-white font-bold rounded-xl hover:bg-blue-800 shadow-md transition-all text-sm disabled:opacity-50 flex items-center gap-2"
                >
                    {isSeeding ? 'Seeding...' : '🔥 Seed Services'}
                </button>
            </div>

            <form onSubmit={handleSubmit} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold text-gray-800">{editingId ? 'Edit Service' : 'Add New Service'}</h2>
                    {editingId && (
                        <button type="button" onClick={resetForm} className="text-sm text-amber-600 font-bold hover:underline">
                            Cancel Edit
                        </button>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Row 1: Title, Category, Href */}
                    <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-gray-800 uppercase tracking-wider pl-1 font-black">Title</label>
                        <input
                            type="text" name="title" value={formData.title} onChange={handleTitleChange} required
                            className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-bold"
                            placeholder="e.g. Online Puja"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">URL Slug (SEO Friendly)</label>
                        <input
                            type="text" name="slug" value={formData.slug} onChange={handleInputChange}
                            className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-mono text-blue-600"
                            placeholder="e.g. online-puja"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Category</label>
                        <select
                            name="category" value={formData.category} onChange={handleInputChange}
                            className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-bold"
                        >
                            <option value="core">Core Service (Top 6)</option>
                            <option value="detailed">Detailed Service (Bottom)</option>
                        </select>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Link (Href)</label>
                        <input
                            type="text" name="href" value={formData.href} onChange={handleInputChange} required
                            className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-bold"
                            placeholder="/puja/online"
                        />
                    </div>

                    {/* Row 2: Description (2/3) and Order (1/3) */}
                    <div className="md:col-span-2 space-y-1.5">
                        <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Service Overview (HTML Description)</label>
                        <RichTextEditor
                            value={formData.description}
                            onChange={(content) => setFormData(p => ({ ...p, description: content }))}
                            placeholder="Enter service overview..."
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Display Order</label>
                        <div className="relative">
                            <input
                                type="number" name="order" value={formData.order} onChange={handleInputChange}
                                className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-bold h-20"
                            />
                            <p className="absolute bottom-2 right-3 text-[9px] text-gray-400 font-bold">LOWER = FIRST</p>
                        </div>
                    </div>

                    {/* Row 3: Icons (2/3) and Image (1/3) */}
                    <div className="md:col-span-2 space-y-1.5">
                        <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Icon Selection</label>
                        <div className="grid grid-cols-7 sm:grid-cols-10 md:grid-cols-14 gap-1.5 border border-gray-200 p-2 rounded-xl bg-gray-50">
                            {iconList.map(item => (
                                <button
                                    key={item.name}
                                    type="button"
                                    onClick={() => setFormData(prev => ({ ...prev, icon: item.name }))}
                                    className={`p-1.5 rounded-lg flex items-center justify-center transition-all ${formData.icon === item.name ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400 hover:bg-white hover:text-gray-700'}`}
                                    title={item.name}
                                >
                                    <item.icon size={18} />
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-1.5 flex flex-col">
                        <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Service Image & Alt Text</label>
                        <div className="flex gap-2 items-start">
                            <div className="w-24 h-[46px] border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors relative overflow-hidden flex items-center justify-center">
                                {imagePreview ? (
                                    <div className="relative group w-full h-full">
                                        <img src={imagePreview} className="w-full h-full object-cover" />
                                        <input type="file" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <ImageIcon className="text-gray-400" size={16} />
                                        <input type="file" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
                                    </div>
                                )}
                            </div>
                            <input
                                type="text" name="imageAlt" value={formData.imageAlt} onChange={handleInputChange}
                                className="flex-1 px-3 py-2 text-[10px] bg-gray-50 border border-gray-200 rounded-xl h-[46px]"
                                placeholder="Image Alt Description..."
                            />
                        </div>
                    </div>
                </div>

                {/* Professional SEO Infrastructure for Child Pages */}
                <div className="mt-6 pt-6 border-t border-dashed border-gray-200">
                    <h3 className="text-[10px] font-black text-orange-600 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                        <Database size={14} className="fill-current" /> SEO Metadata (Specific to this Service)
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2 space-y-1.5">
                            <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wide flex justify-between">
                                Meta Title
                                <span className={`text-[10px] ${formData.metaTitle?.length > 65 ? 'text-red-500' : 'text-green-600'}`}>({formData.metaTitle?.length || 0}/65)</span>
                            </label>
                            <input
                                type="text" name="metaTitle" value={formData.metaTitle} onChange={handleInputChange}
                                className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 font-medium"
                                placeholder="Page title as it appears in Google..."
                            />
                        </div>
                        <div className="md:col-span-2 space-y-1.5">
                            <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wide flex justify-between">
                                Meta Description
                                <span className={`text-[10px] ${formData.metaDescription?.length > 160 ? 'text-red-500' : 'text-green-600'}`}>({formData.metaDescription?.length || 0}/160)</span>
                            </label>
                            <textarea
                                name="metaDescription" value={formData.metaDescription} onChange={handleInputChange}
                                className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl h-20 resize-none font-medium"
                                placeholder="Compelling summary for search results..."
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">Focus Keywords</label>
                            <input
                                type="text" name="metaKeywords" value={formData.metaKeywords} onChange={handleInputChange}
                                className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20"
                                placeholder="e.g. Reiki, Healing, Energy"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">Canonical URL</label>
                            <input
                                type="text" name="canonicalUrl" value={formData.canonicalUrl} onChange={handleInputChange}
                                className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20"
                                placeholder="https://acharya-ji.com/services/reiki"
                            />
                        </div>
                    </div>
                </div>


                <div className="flex justify-end gap-3 mt-5 pt-4 border-t border-gray-50">
                    <button type="button" onClick={resetForm} className="px-5 py-2 text-xs font-bold text-white bg-red-400 hover:bg-red-700 rounded-xl transition-all uppercase tracking-wider">
                        Clear Form
                    </button>
                    <button type="submit" className="px-6 py-2 text-xs font-bold bg-green-600 text-white rounded-xl shadow-[0_4px_12px_rgba(37,99,235,0.2)] hover:shadow-[0_6px_16px_rgba(37,99,235,0.3)] transition-all uppercase tracking-wider">
                        {editingId ? 'Save Changes' : 'Create Service'}
                    </button>
                </div>
            </form>

            {/* Filters */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6 flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search services..."
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <select
                    className="w-full md:w-48 px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none"
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                >
                    <option value="all">All Categories</option>
                    <option value="core">Core Services</option>
                    <option value="detailed">Detailed Services</option>
                </select>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50/50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">#</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Service</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Category</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Icon</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Order</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {isLoading ? (
                                <tr><td colSpan="7" className="px-6 py-10 text-center text-gray-400">Loading services...</td></tr>
                            ) : filteredServices.length === 0 ? (
                                <tr><td colSpan="7" className="px-6 py-10 text-center text-gray-400">No services found</td></tr>
                            ) : filteredServices.map((service, idx) => (
                                <tr key={service._id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4 text-sm text-gray-500">{idx + 1}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            {service.imageUrl ? (
                                                <img
                                                    src={getImageUrl(service.imageUrl)}
                                                    className="w-10 h-10 rounded-lg object-cover border border-gray-100"
                                                />
                                            ) : (
                                                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center"><ImageIcon size={18} className="text-gray-400" /></div>
                                            )}
                                            <div>
                                                <p className="font-bold text-gray-800 text-sm">{service.title}</p>
                                                <p className="text-xs text-gray-400 truncate w-40">{service.description}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-[10px] font-bold uppercase rounded-full ${service.category === 'core' ? 'bg-amber-100 text-amber-700' : 'bg-purple-100 text-purple-700'}`}>
                                            {service.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-blue-600">
                                            {(() => {
                                                const IconComp = iconList.find(i => i.name === service.icon)?.icon || Sparkles;
                                                return <IconComp size={16} />;
                                            })()}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-600">{service.order}</td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => handleToggleActive(service._id)}
                                            className={`relative inline-flex h-5 w-10 p-0.5 rounded-full transition-colors ${service.isActive ? 'bg-green-500' : 'bg-gray-300'}`}
                                        >
                                            <span className={`h-4 w-4 transform rounded-full bg-white transition-transform ${service.isActive ? 'translate-x-5' : 'translate-x-0'}`} />
                                        </button>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-center gap-2">
                                            <button onClick={() => handleView(service)} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"><Eye size={18} /></button>
                                            <button onClick={() => handleEdit(service)} className="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all"><Edit2 size={18} /></button>
                                            <button onClick={() => handleDelete(service._id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={18} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>


            {/* View Modal */}
            {isViewModalOpen && selectedService && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-gray-900/60" onClick={() => setIsViewModalOpen(false)}></div>
                    <div className="relative bg-white w-full max-w-lg rounded-3xl overflow-hidden animate-scale-in">
                        <div className="relative h-48">
                            {selectedService.imageUrl ? (
                                <img
                                    src={getImageUrl(selectedService.imageUrl)}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-blue-50 flex items-center justify-center text-blue-200"><ImageIcon size={64} /></div>
                            )}
                            <button onClick={() => setIsViewModalOpen(false)} className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 backdrop-blur-md p-2 rounded-full text-white transition-all"><X size={20} /></button>
                        </div>
                        <div className="p-6 relative">
                            <div className="absolute -top-10 left-6">
                                <div className="w-20 h-20 rounded-2xl bg-white shadow-xl border-4 border-white flex items-center justify-center">
                                    {(() => {
                                        const IconComp = iconList.find(i => i.name === selectedService.icon)?.icon || Sparkles;
                                        return <IconComp size={36} className="text-blue-600" />;
                                    })()}
                                </div>
                            </div>
                            <div className="mt-12 space-y-4">
                                <div>
                                    <span className={`px-2 py-0.5 text-[9px] font-black uppercase rounded-full ${selectedService.category === 'core' ? 'bg-amber-100 text-amber-700' : 'bg-purple-100 text-purple-700'}`}>
                                        {selectedService.category} Service
                                    </span>
                                    <h2 className="text-2xl font-black text-gray-800 mt-1 uppercase tracking-tight">{selectedService.title}</h2>
                                    <p className="text-sm font-bold text-blue-600 mt-1">{selectedService.href}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Description</p>
                                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-4">{selectedService.description}</p>
                                </div>
                                <div className="pt-4 flex border-t border-gray-100">
                                    <div className="flex-1 text-center border-r border-gray-100">
                                        <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Sort Order</p>
                                        <p className="font-black text-gray-800">{selectedService.order}</p>
                                    </div>
                                    <div className="flex-1 text-center">
                                        <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Status</p>
                                        <p className={`font-black ${selectedService.isActive ? 'text-green-600' : 'text-red-600'}`}>
                                            {selectedService.isActive ? 'ACTIVE' : 'INACTIVE'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ServiceManager;
