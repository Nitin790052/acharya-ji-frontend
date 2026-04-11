import React, { useState, useRef } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    Eye, Edit, Trash2, X, Plus, Save, Database, Image as ImageIcon,
    MapPin, Calendar, Camera, Video, Tag, Loader2, Search, ChevronDown, Sparkles
} from 'lucide-react';
import {
    useGetAllGalleryQuery,
    useCreateGalleryMutation,
    useUpdateGalleryMutation,
    useDeleteGalleryMutation,
    useSeedGalleryMutation,
    useGetGallerySettingsQuery,
    useUpdateGallerySettingsMutation
} from '../../../../../services/galleryApi';
import { BACKEND_URL } from '../../../../../config/apiConfig';

const defaultCategories = [
    'Puja Rituals', 'Home Puja', 'Online Puja', 'Temple Puja', 'Festival Puja',
    'Astrology Sessions', 'Vastu Visits', 'Healing Sessions', 'Client Moments', 'Behind the Scenes'
];

const emptyForm = {
    title: '',
    caption: '',
    category: 'Puja Rituals',
    type: 'image',
    location: '',
    date: '',
    tags: '',
    videoLink: '',
    isActive: true,
};

export default function GalleryManager() {
    const { data: items = [], isLoading, refetch } = useGetAllGalleryQuery();
    const [createGallery, { isLoading: isCreating }] = useCreateGalleryMutation();
    const [updateGallery, { isLoading: isUpdating }] = useUpdateGalleryMutation();
    const [deleteGallery] = useDeleteGalleryMutation();
    const [seedGallery, { isLoading: isSeeding }] = useSeedGalleryMutation();
    const isSaving = isCreating || isUpdating;

    const [formData, setFormData] = useState(emptyForm);
    const [editingId, setEditingId] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [videoFile, setVideoFile] = useState(null);
    const [videoSource, setVideoSource] = useState('upload'); // 'upload' or 'link'
    const [viewRecord, setViewRecord] = useState(null);
    const [filterCategory, setFilterCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('content'); // 'content' or 'settings'
    const fileInputRef = useRef(null);
    const videoInputRef = useRef(null);

    const inputCls = "w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent bg-white transition-all";
    const labelCls = "block text-[10px] font-black text-gray-700 mb-1.5 uppercase tracking-[0.15em]";

    const getImg = (url) => !url ? '' : url.startsWith('http') ? url : `${BACKEND_URL}${url}`;

    const getThumbnail = (rec) => {
        if (rec.image) return getImg(rec.image);
        if (rec.videoLink) {
            const match = rec.videoLink.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([a-zA-Z0-9_-]{11})/);
            if (match) return `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`;
        }
        return null; // Will show placeholder
    };

    const resetForm = () => {
        setFormData(emptyForm);
        setEditingId(null);
        setImageFile(null);
        setImagePreview(null);
        setVideoFile(null);
        setVideoSource('upload');
        if (fileInputRef.current) fileInputRef.current.value = '';
        if (videoInputRef.current) videoInputRef.current.value = '';
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleEdit = (rec) => {
        setEditingId(rec._id);
        setFormData({
            title: rec.title || '',
            caption: rec.caption || '',
            category: rec.category || 'Puja Rituals',
            type: rec.type || 'image',
            location: rec.location || '',
            date: rec.date || '',
            tags: (rec.tags || []).join(', '),
            isActive: rec.isActive !== false,
        });
        setImageFile(null);
        setImagePreview(rec.image ? getImg(rec.image) : null);
        setVideoFile(null);
        setVideoSource(rec.videoLink ? 'link' : 'upload');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.type === 'image' && !editingId && !imageFile) {
            toast.error('Thumbnail image is required for Photo type');
            return;
        }
        try {
            const submitData = new FormData();
            Object.entries(formData).forEach(([k, v]) => {
                if (v !== undefined && v !== null) submitData.append(k, v);
            });
            if (imageFile) submitData.append('image', imageFile);
            if (videoFile && videoSource === 'upload') submitData.append('video', videoFile);
            if (videoSource === 'link') {
                submitData.delete('video'); // ensure no file conflict
            }
            if (videoSource === 'upload') {
                submitData.set('videoLink', ''); // clear link if uploading file
            }

            if (editingId) {
                await updateGallery({ id: editingId, formData: submitData }).unwrap();
                toast.success('Gallery item updated!');
            } else {
                await createGallery(submitData).unwrap();
                toast.success('Gallery item created!');
            }
            resetForm();
        } catch (err) {
            toast.error(err?.data?.message || 'Error occurred');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this gallery item?')) return;
        try {
            await deleteGallery(id).unwrap();
            toast.success('Deleted!');
        } catch (err) {
            toast.error('Delete failed');
        }
    };

    const handleSeed = async () => {
        if (!window.confirm('Seed will replace all gallery data. Continue?')) return;
        try {
            await seedGallery().unwrap();
            toast.success('Gallery seeded with sample data!');
        } catch (err) {
            toast.error('Seed failed');
        }
    };

    const handleToggleActive = async (rec) => {
        try {
            const fd = new FormData();
            fd.append('isActive', !rec.isActive);
            await updateGallery({ id: rec._id, formData: fd }).unwrap();
            toast.success(`${rec.title} is now ${!rec.isActive ? 'visible' : 'hidden'}`);
        } catch (err) {
            toast.error('Toggle failed');
        }
    };

    // --- Settings Logic ---
    const { data: settingsData } = useGetGallerySettingsQuery();
    const [updateSettings, { isLoading: isUpdatingSettings }] = useUpdateGallerySettingsMutation();
    const [settingsForm, setSettingsForm] = useState({
        badge: '', title: '', titleHighlight: '', description: '', primaryBtnText: '', secondaryBtnText: ''
    });

    React.useEffect(() => {
        if (settingsData?.cta) {
            setSettingsForm(settingsData.cta);
        }
    }, [settingsData]);

    const handleSettingsSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateSettings({ cta: settingsForm }).unwrap();
            toast.success('Gallery CTA settings updated successfully!');
        } catch (err) {
            toast.error(err?.data?.message || 'Error updating settings');
        }
    };

    // Dynamic categories from existing data
    const existingCategories = [...new Set(items.map(i => i.category))];
    const allCategories = [...new Set([...defaultCategories, ...existingCategories])];

    const filteredItems = items.filter(item => {
        const matchCategory = filterCategory === 'all' || item.category === filterCategory;
        const matchSearch = searchQuery === '' ||
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.caption.toLowerCase().includes(searchQuery.toLowerCase());
        return matchCategory && matchSearch;
    });

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <ToastContainer position="top-right" autoClose={2500} />

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-orange-50 rounded-full blur-[80px] -mr-20 -mt-20 pointer-events-none" />
                <div className="relative">
                    <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight italic-none">Gallery Content <span className="text-orange-600">Manager</span></h1>
                    <p className="text-sm text-gray-500 font-medium italic-none">Manage sacred moments & divine archives and page settings</p>
                </div>
                <div className="flex gap-3 relative">
                    <button
                        onClick={() => setActiveTab('content')}
                        className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'content' ? 'bg-orange-600 text-white shadow-lg shadow-orange-200' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    >
                        Media Content
                    </button>
                    <button
                        onClick={() => setActiveTab('settings')}
                        className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'settings' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    >
                        Page Settings
                    </button>
                    <button onClick={handleSeed} disabled={isSeeding} className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 disabled:opacity-50 ml-2">
                        <Database className="w-4 h-4" />
                        Seed Data
                    </button>
                </div>
            </div>

            {activeTab === 'settings' && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-indigo-500" />
                    <h2 className="text-lg font-black text-gray-800 mb-6 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-blue-600" /> Gallery Page CTA Settings
                    </h2>
                    <form onSubmit={handleSettingsSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        <div>
                            <label className={labelCls}>Top Badge</label>
                            <input value={settingsForm.badge} onChange={(e) => setSettingsForm({ ...settingsForm, badge: e.target.value })} className={inputCls} placeholder="e.g. Sacred Connections" />
                        </div>
                        <div>
                            <label className={labelCls}>Primary Title</label>
                            <input value={settingsForm.title} onChange={(e) => setSettingsForm({ ...settingsForm, title: e.target.value })} className={inputCls} placeholder="e.g. Begin Your" />
                        </div>
                        <div>
                            <label className={labelCls}>Highlighted Title Word(s)</label>
                            <input value={settingsForm.titleHighlight} onChange={(e) => setSettingsForm({ ...settingsForm, titleHighlight: e.target.value })} className={inputCls} placeholder="e.g. Divine Journey" />
                        </div>
                        <div className="md:col-span-2">
                            <label className={labelCls}>Description text</label>
                            <textarea value={settingsForm.description} onChange={(e) => setSettingsForm({ ...settingsForm, description: e.target.value })} className={inputCls} rows={2} placeholder="Book your personalized Vedic rituals..." />
                        </div>
                        <div>
                            <label className={labelCls}>Primary Button Text</label>
                            <input value={settingsForm.primaryBtnText} onChange={(e) => setSettingsForm({ ...settingsForm, primaryBtnText: e.target.value })} className={inputCls} placeholder="e.g. Book Puja Now" />
                        </div>
                        <div>
                            <label className={labelCls}>Secondary Button Text</label>
                            <input value={settingsForm.secondaryBtnText} onChange={(e) => setSettingsForm({ ...settingsForm, secondaryBtnText: e.target.value })} className={inputCls} placeholder="e.g. Consult Expert" />
                        </div>
                        <div className="md:col-span-2 pt-4">
                            <button type="submit" disabled={isUpdatingSettings} className="bg-blue-600 text-white px-8 py-3 rounded-xl text-sm font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all flex items-center gap-2">
                                {isUpdatingSettings ? <Loader2 className="w-4 h-4 animate-spin" /> : <Edit className="w-4 h-4" />}
                                Save Settings
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {activeTab === 'content' && (
                <>
                    {/* Add / Edit Form */}
                    <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
                        <h2 className="text-base font-bold text-gray-700 mb-4 border-b pb-2 flex items-center gap-2">
                            {editingId ? <Edit className="w-4 h-4 text-amber-600" /> : <Plus className="w-4 h-4 text-green-600" />}
                            {editingId ? 'Edit Gallery Item' : 'Add New Gallery Item'}
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
                                <div className="md:col-span-2">
                                    <label className={labelCls}>Title *</label>
                                    <input name="title" value={formData.title} onChange={handleInputChange} className={inputCls} required placeholder="e.g. Griha Pravesh Puja" />
                                </div>
                                <div>
                                    <label className={labelCls}>Category *</label>
                                    <select name="category" value={formData.category} onChange={handleInputChange} className={inputCls}>
                                        {allCategories.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                                <div className="md:col-span-3">
                                    <label className={labelCls}>Caption / Description</label>
                                    <textarea name="caption" value={formData.caption} onChange={handleInputChange} className={inputCls} rows={2} placeholder="Brief description of this moment..." />
                                </div>
                                <div>
                                    <label className={labelCls}>Media Type</label>
                                    <select name="type" value={formData.type} onChange={handleInputChange} className={inputCls}>
                                        <option value="image">📸 Photo</option>
                                        <option value="video">🎬 Video</option>
                                    </select>
                                </div>
                                <div>
                                    <label className={labelCls}>Location</label>
                                    <input name="location" value={formData.location} onChange={handleInputChange} className={inputCls} placeholder="e.g. South Delhi" />
                                </div>
                                <div>
                                    <label className={labelCls}>Date</label>
                                    <input name="date" value={formData.date} onChange={handleInputChange} className={inputCls} placeholder="e.g. Jan 15, 2026" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className={labelCls}>Tags (comma separated)</label>
                                    <input name="tags" value={formData.tags} onChange={handleInputChange} className={inputCls} placeholder="e.g. griha pravesh, new home, puja" />
                                </div>
                                <div>
                                    <label className={labelCls}>Status</label>
                                    <select name="isActive" value={formData.isActive} onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.value === 'true' }))} className={inputCls}>
                                        <option value="true">✅ Active</option>
                                        <option value="false">🚫 Hidden</option>
                                    </select>
                                </div>
                                <div className="md:col-span-3">
                                    <label className={labelCls}>Thumbnail Image {(!editingId && formData.type === 'image') && '*'}</label>
                                    <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} className="w-full text-sm text-gray-500 file:mr-3 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-orange-50 file:text-orange-600 hover:file:bg-orange-100 cursor-pointer" />
                                    {imagePreview && <img src={imagePreview} alt="preview" className="mt-3 h-24 w-36 object-cover rounded-xl border-2 border-orange-100 shadow-sm" />}
                                </div>

                                {/* Video Source Section — only visible when type is 'video' */}
                                {formData.type === 'video' && (
                                    <div className="md:col-span-3 border-t border-dashed border-orange-200 pt-5 mt-1">
                                        <label className={labelCls}>Video Source</label>
                                        <div className="flex gap-2 mb-4">
                                            <button
                                                type="button"
                                                onClick={() => { setVideoSource('upload'); setFormData(prev => ({ ...prev, videoLink: '' })); }}
                                                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest border-2 transition-all duration-300 ${videoSource === 'upload'
                                                        ? 'bg-orange-600 text-white border-orange-600 shadow-lg shadow-orange-100'
                                                        : 'bg-white text-gray-400 border-gray-200 hover:border-orange-300 hover:text-orange-500'
                                                    }`}
                                            >
                                                <Video className="w-4 h-4" /> Upload Video File
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => { setVideoSource('link'); setVideoFile(null); if (videoInputRef.current) videoInputRef.current.value = ''; }}
                                                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest border-2 transition-all duration-300 ${videoSource === 'link'
                                                        ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-100'
                                                        : 'bg-white text-gray-400 border-gray-200 hover:border-blue-300 hover:text-blue-500'
                                                    }`}
                                            >
                                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>
                                                Paste Video Link
                                            </button>
                                        </div>

                                        {videoSource === 'upload' ? (
                                            <div className="p-4 bg-orange-50/50 rounded-xl border border-orange-100">
                                                <input
                                                    ref={videoInputRef}
                                                    type="file"
                                                    accept="video/*"
                                                    onChange={(e) => setVideoFile(e.target.files[0])}
                                                    className="w-full text-sm text-gray-500 file:mr-3 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-orange-100 file:text-orange-700 hover:file:bg-orange-200 cursor-pointer"
                                                />
                                                {videoFile && <p className="text-[10px] text-green-600 font-bold mt-2 uppercase tracking-wider">✓ {videoFile.name} ({(videoFile.size / 1024 / 1024).toFixed(1)} MB)</p>}
                                                <p className="text-[9px] text-gray-400 mt-1 uppercase tracking-widest font-bold">Max 50MB • MP4, MOV, WebM supported</p>
                                            </div>
                                        ) : (
                                            <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100">
                                                <input
                                                    name="videoLink"
                                                    value={formData.videoLink}
                                                    onChange={handleInputChange}
                                                    className="w-full px-3 py-2.5 border border-blue-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white transition-all"
                                                    placeholder="https://youtube.com/watch?v=... or https://youtu.be/..."
                                                />
                                                <p className="text-[9px] text-gray-400 mt-1 uppercase tracking-widest font-bold">YouTube, Vimeo, or any public video URL</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="flex gap-3">
                                <button type="submit" disabled={isSaving} className="flex items-center gap-2 bg-orange-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-orange-700 disabled:opacity-50 shadow-lg shadow-orange-100 transition-all active:scale-95">
                                    {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                                    {isSaving ? 'Saving...' : (editingId ? 'Update Item' : 'Add Item')}
                                </button>
                                {editingId && <button type="button" onClick={resetForm} className="flex items-center gap-2 bg-gray-100 text-gray-600 px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-200"><X className="w-4 h-4" /> Cancel</button>}
                            </div>
                        </form>
                    </div>

                    {/* Table */}
                    <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                        <div className="p-4 border-b flex flex-wrap items-center justify-between gap-3 bg-gray-50">
                            <div className="flex items-center gap-3">
                                <h2 className="text-base font-bold text-gray-700">Gallery Items ({filteredItems.length})</h2>
                                <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}
                                    className="bg-white border border-gray-200 rounded-lg text-[10px] font-black uppercase tracking-widest px-3 py-1.5 focus:ring-2 focus:ring-orange-100 outline-none cursor-pointer text-gray-500 hover:border-orange-400 transition-all">
                                    <option value="all">All Categories</option>
                                    {allCategories.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search gallery..."
                                    className="pl-9 pr-4 py-1.5 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-orange-100 w-48"
                                />
                            </div>
                        </div>
                        {isLoading ? <div className="p-8 text-center text-gray-400">Loading gallery...</div> : (
                            <div className="overflow-x-auto max-h-[580px] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-50 [&::-webkit-scrollbar-thumb]:bg-orange-300/60 hover:[&::-webkit-scrollbar-thumb]:bg-orange-400 [&::-webkit-scrollbar-thumb]:rounded-full">
                                <table className="w-full text-sm">
                                    <thead className="bg-gray-50 border-b sticky top-0 z-10">
                                        <tr>
                                            {['#', 'Preview', 'Category', 'Title & Caption', 'Location', 'Date', 'Status', 'Actions'].map(h => (
                                                <th key={h} className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wide">{h}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 font-medium">
                                        {filteredItems.map((rec, i) => (
                                            <tr key={rec._id} className="hover:bg-orange-50/30 transition-colors">
                                                <td className="px-4 py-3 text-gray-400">{i + 1}</td>
                                                <td className="px-4 py-3">
                                                    {getThumbnail(rec) ? (
                                                        <img src={getThumbnail(rec)} alt="" className="w-14 h-10 object-cover rounded-lg border shadow-sm" onError={e => e.target.style.display = 'none'} />
                                                    ) : (
                                                        <div className="w-14 h-10 bg-orange-50 rounded-lg border border-dashed border-orange-200 flex items-center justify-center">
                                                            {rec.type === 'video' ? <Video className="w-4 h-4 text-orange-300" /> : <ImageIcon className="w-4 h-4 text-orange-300" />}
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center gap-1.5">
                                                        {rec.type === 'video' ? <Video className="w-3 h-3 text-red-500" /> : <Camera className="w-3 h-3 text-blue-500" />}
                                                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{rec.category}</span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 max-w-xs">
                                                    <div className="font-bold text-gray-800 line-clamp-1">{rec.title}</div>
                                                    <div className="text-[10px] text-gray-400 truncate mt-0.5">{rec.caption || 'Sacred moment'}</div>
                                                </td>
                                                <td className="px-4 py-3 text-xs text-gray-500">
                                                    <div className="flex items-center gap-1"><MapPin className="w-3 h-3 text-orange-500" /> {rec.location || '—'}</div>
                                                </td>
                                                <td className="px-4 py-3 text-xs text-gray-400">{rec.date || '—'}</td>
                                                <td className="px-4 py-3">
                                                    <button
                                                        onClick={() => handleToggleActive(rec)}
                                                        className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-offset-1"
                                                        style={{ backgroundColor: rec.isActive !== false ? '#22c55e' : '#d1d5db' }}
                                                        title={rec.isActive !== false ? 'Active — Click to hide' : 'Hidden — Click to show'}
                                                    >
                                                        <span
                                                            className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-md transition-transform duration-300 ${rec.isActive !== false ? 'translate-x-6' : 'translate-x-1'}`}
                                                        />
                                                    </button>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center gap-1.5">
                                                        <button onClick={() => setViewRecord(rec)} className="p-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-all" title="View"><Eye className="w-4 h-4" /></button>
                                                        <button onClick={() => handleEdit(rec)} className="p-1.5 bg-amber-50 text-amber-600 rounded-lg hover:bg-amber-100 transition-all" title="Edit"><Edit className="w-4 h-4" /></button>
                                                        <button onClick={() => handleDelete(rec._id)} className="p-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all" title="Delete"><Trash2 className="w-4 h-4" /></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                        {filteredItems.length === 0 && <tr><td colSpan={8} className="px-4 py-12 text-center text-gray-400">No gallery items found. Add one or Seed data.</td></tr>}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>

                </>
            )}

            {/* View Modal */}
            {viewRecord && (
                <div className="fixed inset-0 bg-black/60 z-[2000] flex items-center justify-center p-4 backdrop-blur-md" onClick={() => setViewRecord(null)}>
                    <div className="bg-white rounded-[2rem] shadow-[0_50px_100px_rgba(0,0,0,0.3)] max-w-xl w-full max-h-[90vh] overflow-y-auto border border-white" onClick={e => e.stopPropagation()}>
                        <div className="relative">
                            {viewRecord.image ? (
                                <img src={getImg(viewRecord.image)} alt="" className="w-full h-72 object-cover rounded-t-[2rem]" />
                            ) : (
                                <div className="w-full h-72 bg-gradient-to-br from-orange-100 to-amber-50 rounded-t-[2rem] flex items-center justify-center">
                                    <Camera className="w-20 h-20 text-orange-200" />
                                </div>
                            )}
                            <button onClick={() => setViewRecord(null)} className="absolute top-5 right-5 bg-black/40 backdrop-blur-xl text-white rounded-full p-2.5 hover:bg-black/60 shadow-2xl border border-white/20 transition-all"><X className="w-5 h-5" /></button>
                            <div className="absolute top-5 left-5 bg-orange-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-xl">
                                {viewRecord.type === 'video' ? '🎬' : '📸'} {viewRecord.category}
                            </div>
                        </div>
                        <div className="p-8">
                            <h3 className="text-2xl font-black text-[#2A1D13] mb-2 uppercase tracking-tight">{viewRecord.title}</h3>
                            <p className="text-gray-500 text-sm italic mb-6 leading-relaxed">"{viewRecord.caption || 'A sacred moment captured for eternity.'}"</p>
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="p-4 bg-orange-50/50 rounded-xl border border-orange-100">
                                    <p className={labelCls}>Location</p>
                                    <p className="text-sm font-bold text-gray-700 flex items-center gap-2"><MapPin className="w-4 h-4 text-orange-600" /> {viewRecord.location || 'Sacred Space'}</p>
                                </div>
                                <div className="p-4 bg-orange-50/50 rounded-xl border border-orange-100">
                                    <p className={labelCls}>Date</p>
                                    <p className="text-sm font-bold text-gray-700 flex items-center gap-2"><Calendar className="w-4 h-4 text-orange-600" /> {viewRecord.date || 'Eternal'}</p>
                                </div>
                            </div>
                            {viewRecord.tags && viewRecord.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {viewRecord.tags.map((tag, idx) => (
                                        <span key={idx} className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-[10px] font-bold uppercase tracking-wider border border-amber-100">
                                            <Tag className="w-3 h-3 inline mr-1" />{tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                                <button onClick={() => { setViewRecord(null); handleEdit(viewRecord); }} className="px-5 py-2 hover:bg-gray-100 rounded-xl text-xs font-bold uppercase text-gray-500 transition-colors">Edit</button>
                                <button onClick={() => setViewRecord(null)} className="px-8 py-2.5 bg-orange-600 text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-orange-700 shadow-lg shadow-orange-100 transition-all">Done</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
