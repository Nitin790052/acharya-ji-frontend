import React, { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { Eye, Edit, Trash2, X, Plus, Save, Database } from 'lucide-react';
import {
    useGetKundliSettingsQuery, useUpdateKundliSettingsMutation,
    useGetAllKundliServicesQuery, useCreateKundliServiceMutation,
    useUpdateKundliServiceMutation, useDeleteKundliServiceMutation,
    useSeedKundliServicesMutation,
} from '../../../../../services/kundliApi';
import { BACKEND_URL } from '../../../../../config/apiConfig';

const iconOptions = ['Book', 'Heart', 'AlertCircle', 'Calendar', 'Star', 'Sparkles', 'Shield', 'Zap'];

const emptyForm = { title: '', description: '', features: '', price: '', cta: 'Learn More', iconName: 'Book', gradient: 'from-saffron to-orange-600', popular: false, isActive: true, order: '' };

export default function KundliManager() {
    const [form, setForm] = useState(emptyForm);
    const [editId, setEditId] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [viewItem, setViewItem] = useState(null);
    const [settingsForm, setSettingsForm] = useState({ badge: '', title: '', subtitle: '' });
    const [settingsLoaded, setSettingsLoaded] = useState(false);
    const fileRef = useRef();

    const { data: services = [], isLoading } = useGetAllKundliServicesQuery(undefined, { pollingInterval: 60000 });
    const { data: settings } = useGetKundliSettingsQuery(undefined, {
        pollingInterval: 60000,
        onSuccess: (d) => { if (!settingsLoaded) { setSettingsForm({ badge: d.badge || '', title: d.title || '', subtitle: d.subtitle || '' }); setSettingsLoaded(true); } }
    });
    const [updateSettings] = useUpdateKundliSettingsMutation();
    const [createService] = useCreateKundliServiceMutation();
    const [updateService] = useUpdateKundliServiceMutation();
    const [deleteService] = useDeleteKundliServiceMutation();
    const [seedServices] = useSeedKundliServicesMutation();

    // Sync settings when loaded
    React.useEffect(() => { if (settings && !settingsLoaded) { setSettingsForm({ badge: settings.badge || '', title: settings.title || '', subtitle: settings.subtitle || '' }); setSettingsLoaded(true); } }, [settings]);

    const getImg = (url) => !url ? '' : url.startsWith('http') ? url : `${BACKEND_URL}${url}`;

    const handleImage = (e) => {
        const file = e.target.files[0];
        if (file) { setImageFile(file); setImagePreview(URL.createObjectURL(file)); }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const fd = new FormData();
            Object.entries(form).forEach(([k, v]) => fd.append(k, v));
            if (imageFile) fd.append('image', imageFile);
            if (editId) {
                await updateService({ id: editId, formData: fd }).unwrap();
                toast.success('Service updated!');
            } else {
                await createService(fd).unwrap();
                toast.success('Service created!');
            }
            resetForm();
        } catch (err) { toast.error(err?.data?.message || 'Error occurred'); }
    };

    const handleEdit = (s) => {
        setForm({ title: s.title, description: s.description, features: (s.features || []).join(', '), price: s.price, cta: s.cta || 'Learn More', iconName: s.iconName || 'Book', gradient: s.gradient || 'from-saffron to-orange-600', popular: s.popular || false, isActive: s.isActive !== false, order: s.order || '' });
        setImagePreview(getImg(s.imageUrl));
        setEditId(s._id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this service?')) return;
        try { await deleteService(id).unwrap(); toast.success('Deleted!'); } catch { toast.error('Delete failed'); }
    };

    const handleToggle = async (s, field) => {
        try {
            const fd = new FormData();
            // Send both toggle states to ensure they stay in sync correctly
            fd.append('isActive', field === 'isActive' ? !s.isActive : s.isActive);
            fd.append('popular', field === 'popular' ? !s.popular : s.popular);
            await updateService({ id: s._id, formData: fd }).unwrap();
            toast.success('Status updated!');
        } catch { toast.error('Update failed'); }
    };

    const handleSettingsSave = async () => {
        try { await updateSettings(settingsForm).unwrap(); toast.success('Settings saved!'); } catch { toast.error('Settings save failed'); }
    };

    const handleSeed = async () => {
        if (!window.confirm('Seed will replace all data. Continue?')) return;
        try { await seedServices().unwrap(); toast.success('Seeded!'); } catch { toast.error('Seed failed'); }
    };

    const resetForm = () => { setForm(emptyForm); setEditId(null); setImageFile(null); setImagePreview(''); if (fileRef.current) fileRef.current.value = ''; };

    const inputCls = "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-400 bg-white";
    const labelCls = "block text-xs font-semibold text-gray-900 mb-1 uppercase tracking-wide";

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 uppercase">Kundli Services <span className="text-orange-600">Manager</span></h1>
                    <p className="text-sm text-gray-500 font-medium">Manage and organize astrological kundli services and offerings</p>
                </div>
                <button onClick={handleSeed} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700">
                    <Database className="w-4 h-4" /> Seed Data
                </button>
            </div>

            {/* Section Settings */}
            <div className="bg-white rounded-xl shadow-sm border p-5 mb-6">
                <h2 className="text-base font-bold text-gray-700 mb-4 border-b pb-2">Section Settings (Header)</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div><label className={labelCls}>Badge Text</label><input className={inputCls} value={settingsForm.badge} onChange={e => setSettingsForm(p => ({ ...p, badge: e.target.value }))} placeholder="e.g. Accurate Vedic Astrology" /></div>
                    <div><label className={labelCls}>Section Title</label><input className={inputCls} value={settingsForm.title} onChange={e => setSettingsForm(p => ({ ...p, title: e.target.value }))} placeholder="e.g. Kundli Services" /></div>
                    <div><label className={labelCls}>Subtitle</label><input className={inputCls} value={settingsForm.subtitle} onChange={e => setSettingsForm(p => ({ ...p, subtitle: e.target.value }))} placeholder="Section subtitle..." /></div>
                </div>
                <button onClick={handleSettingsSave} className="mt-4 flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-700"><Save className="w-4 h-4" /> Save Settings</button>
            </div>

            {/* Add/Edit Form */}
            <div className="bg-white rounded-xl shadow-sm border p-5 mb-6">
                <h2 className="text-base font-bold text-gray-700 mb-4 border-b pb-2">{editId ? 'Edit Service' : 'Add New Service'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div><label className={labelCls}>Title *</label><input className={inputCls} value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} required placeholder="e.g. Get Free Kundli" /></div>
                        <div><label className={labelCls}>Price *</label><input className={inputCls} value={form.price} onChange={e => setForm(p => ({ ...p, price: e.target.value }))} required placeholder="e.g. FREE or ₹500" /></div>
                        <div><label className={labelCls}>CTA Button Text</label><input className={inputCls} value={form.cta} onChange={e => setForm(p => ({ ...p, cta: e.target.value }))} placeholder="e.g. Generate Free Kundli" /></div>
                        <div><label className={labelCls}>Icon Name</label>
                            <select className={inputCls} value={form.iconName} onChange={e => setForm(p => ({ ...p, iconName: e.target.value }))}>
                                {iconOptions.map(i => <option key={i} value={i}>{i}</option>)}
                            </select>
                        </div>
                        <div><label className={labelCls}>Gradient</label><input className={inputCls} value={form.gradient} onChange={e => setForm(p => ({ ...p, gradient: e.target.value }))} placeholder="e.g. from-saffron to-orange-600" /></div>
                        <div><label className={labelCls}>Order</label><input type="number" className={inputCls} value={form.order} onChange={e => setForm(p => ({ ...p, order: e.target.value }))} placeholder="e.g. 1" /></div>
                        <div className="flex items-end gap-6 pb-1">
                            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={form.popular} onChange={e => setForm(p => ({ ...p, popular: e.target.checked }))} className="w-4 h-4 accent-red-500" /><span className="text-sm text-gray-600 font-medium">Popular</span></label>
                            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={form.isActive} onChange={e => setForm(p => ({ ...p, isActive: e.target.checked }))} className="w-4 h-4 accent-green-500" /><span className="text-sm text-gray-600 font-medium">Active</span></label>
                        </div>
                        <div className="md:col-span-3"><label className={labelCls}>Description *</label><textarea className={inputCls} rows={2} value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} required placeholder="Service description..." /></div>
                        <div className="md:col-span-2"><label className={labelCls}>Features (comma-separated)</label><input className={inputCls} value={form.features} onChange={e => setForm(p => ({ ...p, features: e.target.value }))} placeholder="e.g. Birth Chart, Planetary Positions, Dasha" /></div>
                        <div>
                            <label className={labelCls}>Image {!editId && '*'}</label>
                            <input ref={fileRef} type="file" accept="image/*" onChange={handleImage} className="w-full text-sm text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-red-50 file:text-red-600 hover:file:bg-red-100" />
                            {imagePreview && <img src={imagePreview} alt="preview" className="mt-2 h-20 w-28 object-cover rounded-lg border" />}
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button type="submit" className="flex items-center gap-2 bg-red-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-red-700">
                            <Plus className="w-4 h-4" />{editId ? 'Update Service' : 'Add Service'}
                        </button>
                        {editId && <button type="button" onClick={resetForm} className="flex items-center gap-2 bg-gray-200 text-gray-700 px-5 py-2 rounded-lg text-sm font-semibold hover:bg-gray-300"><X className="w-4 h-4" /> Cancel</button>}
                    </div>
                </form>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                <div className="p-4 border-b"><h2 className="text-base font-bold text-gray-700">All Services ({services.length})</h2></div>
                {isLoading ? <div className="p-8 text-center text-gray-400">Loading...</div> : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    {['#', 'Order', 'Image', 'Title & Description', 'Price', 'CTA', 'Active', 'Popular', 'Actions'].map(h => (
                                        <th key={h} className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wide">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {services.map((s, i) => (
                                    <tr key={s._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-4 py-3 text-gray-500 font-medium">{i + 1}</td>
                                        <td className="px-4 py-3 font-bold text-gray-700">{s.order}</td>
                                        <td className="px-4 py-3">
                                            {s.imageUrl && <img src={getImg(s.imageUrl)} alt={s.title} className="w-12 h-12 object-cover rounded-lg border" onError={e => e.target.style.display = 'none'} />}
                                        </td>
                                        <td className="px-4 py-3 max-w-xs">
                                            <div className="font-semibold text-gray-800 truncate">{s.title}</div>
                                            <div className="text-xs text-gray-400 truncate">{s.description}</div>
                                        </td>
                                        <td className="px-4 py-3 font-bold text-red-600">{s.price}</td>
                                        <td className="px-4 py-3 text-xs text-gray-500">{s.cta}</td>
                                        <td className="px-4 py-3">
                                            <button onClick={() => handleToggle(s, 'isActive')} className={`relative inline-flex h-5 w-9 rounded-full transition-colors ${s.isActive ? 'bg-green-500' : 'bg-gray-300'}`}>
                                                <span className={`inline-block h-4 w-4 translate-y-0.5 rounded-full bg-white shadow transition-transform ${s.isActive ? 'translate-x-4' : 'translate-x-0.5'}`} />
                                            </button>
                                        </td>
                                        <td className="px-4 py-3">
                                            <button onClick={() => handleToggle(s, 'popular')} className={`relative inline-flex h-5 w-9 rounded-full transition-colors ${s.popular ? 'bg-amber-500' : 'bg-gray-300'}`}>
                                                <span className={`inline-block h-4 w-4 translate-y-0.5 rounded-full bg-white shadow transition-transform ${s.popular ? 'translate-x-4' : 'translate-x-0.5'}`} />
                                            </button>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-2">
                                                <button onClick={() => setViewItem(s)} className="p-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"><Eye className="w-4 h-4" /></button>
                                                <button onClick={() => handleEdit(s)} className="p-1.5 bg-amber-50 text-amber-600 rounded-lg hover:bg-amber-100"><Edit className="w-4 h-4" /></button>
                                                <button onClick={() => handleDelete(s._id)} className="p-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"><Trash2 className="w-4 h-4" /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {services.length === 0 && <tr><td colSpan={9} className="px-4 py-8 text-center text-gray-400">No services yet. Add one or click Seed Data.</td></tr>}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* View Modal */}
            {viewItem && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setViewItem(null)}>
                    <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                        <div className="relative">
                            {viewItem.imageUrl && <img src={getImg(viewItem.imageUrl)} alt={viewItem.title} className="w-full h-52 object-cover rounded-t-2xl" onError={e => e.target.style.display = 'none'} />}
                            <button onClick={() => setViewItem(null)} className="absolute top-3 right-3 bg-black/50 text-white rounded-full p-1.5 hover:bg-black/70"><X className="w-4 h-4" /></button>
                        </div>
                        <div className="p-5">
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800">{viewItem.title}</h3>
                                    <span className="text-lg font-black text-red-600">{viewItem.price}</span>
                                </div>
                                <div className="flex gap-2">
                                    {viewItem.popular && <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full text-xs font-bold">Popular</span>}
                                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${viewItem.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{viewItem.isActive ? 'Active' : 'Inactive'}</span>
                                </div>
                            </div>
                            <p className="text-gray-600 text-sm mb-3">{viewItem.description}</p>
                            <div className="mb-3"><span className="text-xs font-bold text-gray-500 uppercase">Icon:</span> <span className="text-sm ml-1">{viewItem.iconName}</span></div>
                            <div className="mb-3"><span className="text-xs font-bold text-gray-500 uppercase">CTA:</span> <span className="text-sm ml-1">{viewItem.cta}</span></div>
                            <div className="mb-3"><span className="text-xs font-bold text-gray-500 uppercase">Order:</span> <span className="text-sm ml-1">{viewItem.order}</span></div>
                            {viewItem.features?.length > 0 && (
                                <div><span className="text-xs font-bold text-gray-500 uppercase block mb-1">Features:</span>
                                    <div className="flex flex-wrap gap-1.5">{viewItem.features.map((f, i) => <span key={i} className="bg-red-50 text-red-700 px-2 py-0.5 rounded-full text-xs">{f}</span>)}</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
