import React, { useState, useRef } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Eye, Edit, Trash2, X, Plus, Database, Star } from 'lucide-react';
import RichTextEditor from '../../components/RichTextEditor';
import {
    useGetAllTestimonialsQuery, useCreateTestimonialMutation,
    useUpdateTestimonialMutation, useDeleteTestimonialMutation,
    useSeedTestimonialsMutation,
    useGetTestimonialSettingsQuery, useUpdateTestimonialSettingsMutation,
} from '../../../../../services/testimonialApi';
import { BACKEND_URL } from '../../../../../config/apiConfig';

const emptyForm = { name: '', city: '', rating: '', feedback: '', service: '', designation: '', date: '', readTime: '', isActive: true, order: '' };

export default function TestimonialManager() {
    const [form, setForm] = useState(emptyForm);
    const [settingsForm, setSettingsForm] = useState({ badge: '', title: '', subtitle: '' });
    const [editId, setEditId] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [viewItem, setViewItem] = useState(null);
    const fileRef = useRef();

    const { data: testimonials = [], isLoading } = useGetAllTestimonialsQuery(undefined, { pollingInterval: 3000 });
    const { data: settings } = useGetTestimonialSettingsQuery();
    const [createTestimonial] = useCreateTestimonialMutation();
    const [updateTestimonial] = useUpdateTestimonialMutation();
    const [deleteTestimonial] = useDeleteTestimonialMutation();
    const [seedTestimonials] = useSeedTestimonialsMutation();
    const [updateSettings] = useUpdateTestimonialSettingsMutation();

    React.useEffect(() => {
        if (settings) setSettingsForm({ badge: settings.badge, title: settings.title, subtitle: settings.subtitle });
    }, [settings]);

    const handleSettingsSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateSettings(settingsForm).unwrap();
            toast.success('Header settings updated!');
        } catch { toast.error('Settings update failed'); }
    };

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
                await updateTestimonial({ id: editId, formData: fd }).unwrap();
                toast.success('Testimonial updated!');
            } else {
                await createTestimonial(fd).unwrap();
                toast.success('Testimonial created!');
            }
            resetForm();
        } catch (err) { toast.error(err?.data?.message || 'Error occurred'); }
    };

    const handleEdit = (t) => {
        setForm({ name: t.name, city: t.city, rating: t.rating, feedback: t.feedback, service: t.service, designation: t.designation, date: t.date, readTime: t.readTime, isActive: t.isActive !== false, order: t.order || '' });
        setImagePreview(getImg(t.imageUrl));
        setEditId(t._id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this testimonial?')) return;
        try { await deleteTestimonial(id).unwrap(); toast.success('Deleted!'); } catch { toast.error('Delete failed'); }
    };

    const handleToggle = async (t, field) => {
        try {
            const fd = new FormData();
            fd.append(field, !t[field]);
            await updateTestimonial({ id: t._id, formData: fd }).unwrap();
            toast.success('Updated!');
        } catch { toast.error('Update failed'); }
    };

    const handleSeed = async () => {
        if (!window.confirm('Seed will replace all data. Continue?')) return;
        try { await seedTestimonials().unwrap(); toast.success('Seeded!'); } catch { toast.error('Seed failed'); }
    };

    const resetForm = () => { setForm(emptyForm); setEditId(null); setImageFile(null); setImagePreview(''); if (fileRef.current) fileRef.current.value = ''; };

    const inputCls = "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-400 bg-white";
    const labelCls = "block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide";

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <ToastContainer position="top-right" autoClose={2500} />
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Testimonial <span className="text-orange-600">Manager</span></h1>
                    <p className="text-sm text-gray-500 font-medium">Manage and organize sacred reviews and divine experiences</p>
                </div>
                <button onClick={handleSeed} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700">
                    <Database className="w-4 h-4" /> Seed Data
                </button>
            </div>

            {/* Section Settings */}
            <div className="bg-white rounded-xl shadow-sm border p-5 mb-6">
                <h2 className="text-base font-bold text-gray-700 mb-4 border-b pb-2">Section Headers Settings</h2>
                <form onSubmit={handleSettingsSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div><label className={labelCls}>Badge</label><input className={inputCls} value={settingsForm.badge} onChange={e => setSettingsForm(p => ({ ...p, badge: e.target.value }))} /></div>
                        <div className="md:col-span-2"><label className={labelCls}>Title</label><input className={inputCls} value={settingsForm.title} onChange={e => setSettingsForm(p => ({ ...p, title: e.target.value }))} /></div>
                        <div className="md:col-span-3"><label className={labelCls}>Subtitle</label><input className={inputCls} value={settingsForm.subtitle} onChange={e => setSettingsForm(p => ({ ...p, subtitle: e.target.value }))} /></div>
                    </div>
                    <button type="submit" className="bg-gray-800 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-black transition-colors">Save Settings</button>
                </form>
            </div>

            {/* Add/Edit Form */}
            <div className="bg-white rounded-xl shadow-sm border p-5 mb-6">
                <h2 className="text-base font-bold text-gray-700 mb-4 border-b pb-2">{editId ? 'Edit Testimonial' : 'Add New Testimonial'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <div><label className={labelCls}>Name *</label><input className={inputCls} value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} required placeholder="Client Name" /></div>
                        <div><label className={labelCls}>City *</label><input className={inputCls} value={form.city} onChange={e => setForm(p => ({ ...p, city: e.target.value }))} required placeholder="Location" /></div>
                        <div><label className={labelCls}>Designation *</label><input className={inputCls} value={form.designation} onChange={e => setForm(p => ({ ...p, designation: e.target.value }))} required placeholder="e.g. Homeowner" /></div>
                        <div><label className={labelCls}>Rating (1-5)</label><input type="number" min="1" max="5" className={inputCls} value={form.rating} onChange={e => setForm(p => ({ ...p, rating: e.target.value }))} required /></div>
                        
                        <div className="md:col-span-2"><label className={labelCls}>Service Name *</label><input className={inputCls} value={form.service} onChange={e => setForm(p => ({ ...p, service: e.target.value }))} required placeholder="e.g. Griha Pravesh Puja" /></div>
                        <div><label className={labelCls}>Date / Time Ago</label><input className={inputCls} value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))} placeholder="e.g. 2 weeks ago" /></div>
                        <div><label className={labelCls}>Read Time</label><input className={inputCls} value={form.readTime} onChange={e => setForm(p => ({ ...p, readTime: e.target.value }))} placeholder="e.g. 2 min" /></div>
                        
                        <div className="md:col-span-3">
                            <label className={labelCls}>Feedback Statement (HTML Content) *</label>
                            <RichTextEditor 
                                value={form.feedback} 
                                onChange={(content) => setForm(p => ({ ...p, feedback: content }))}
                                placeholder="Enter detailed feedback..."
                            />
                        </div>
                        <div className="md:col-span-1">
                            <label className={labelCls}>Order</label><input type="number" className={inputCls} value={form.order} onChange={e => setForm(p => ({ ...p, order: e.target.value }))} placeholder="e.g. 1" />
                            <div className="mt-4 flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" checked={form.isActive} onChange={e => setForm(p => ({ ...p, isActive: e.target.checked }))} className="w-4 h-4 accent-green-500" />
                                <span className="text-sm text-gray-600 font-medium">Active Status</span>
                            </div>
                        </div>

                        <div className="md:col-span-2">
                            <label className={labelCls}>Profile Image {!editId && '*'}</label>
                            <input ref={fileRef} type="file" accept="image/*" onChange={handleImage} className="w-full text-sm text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-red-50 file:text-red-600 hover:file:bg-red-100" />
                            {imagePreview && <img src={imagePreview} alt="preview" className="mt-2 h-16 w-16 object-cover rounded-full border shadow-sm" />}
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button type="submit" className="flex items-center gap-2 bg-red-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-red-700">
                            <Plus className="w-4 h-4" />{editId ? 'Update Review' : 'Add Review'}
                        </button>
                        {editId && <button type="button" onClick={resetForm} className="flex items-center gap-2 bg-gray-200 text-gray-700 px-5 py-2 rounded-lg text-sm font-semibold hover:bg-gray-300"><X className="w-4 h-4" /> Cancel</button>}
                    </div>
                </form>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                <div className="p-4 border-b font-bold text-gray-700 flex justify-between items-center">
                    <span>All Reviews ({testimonials.length})</span>
                </div>
                {isLoading ? <div className="p-8 text-center text-gray-400">Loading...</div> : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    {['#', 'Order', 'Client', 'Service', 'Rating', 'Active', 'Actions'].map(h => (
                                        <th key={h} className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {testimonials.map((t, i) => (
                                    <tr key={t._id} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 text-gray-500">{i + 1}</td>
                                        <td className="px-4 py-3 font-bold">{t.order}</td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-3">
                                                <img src={getImg(t.imageUrl)} alt={t.name} className="w-10 h-10 rounded-full object-cover border" onError={e => e.target.src = 'https://via.placeholder.com/40'} />
                                                <div>
                                                    <div className="font-bold text-gray-800">{t.name}</div>
                                                    <div className="text-[10px] text-gray-400">{t.city} | {t.designation}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-xs font-semibold text-gray-600">{t.service}</td>
                                        <td className="px-4 py-3"><div className="flex text-amber-500 gap-0.5">{[...Array(t.rating)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}</div></td>
                                        <td className="px-4 py-3">
                                            <button onClick={() => handleToggle(t, 'isActive')} className={`relative inline-flex h-5 w-9 rounded-full transition-colors ${t.isActive ? 'bg-green-500' : 'bg-gray-300'}`}>
                                                <span className={`inline-block h-4 w-4 translate-y-0.5 rounded-full bg-white shadow transition-transform ${t.isActive ? 'translate-x-4' : 'translate-x-0.5'}`} />
                                            </button>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-2">
                                                <button onClick={() => setViewItem(t)} className="p-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"><Eye className="w-4 h-4" /></button>
                                                <button onClick={() => handleEdit(t)} className="p-1.5 bg-amber-50 text-amber-600 rounded-lg hover:bg-amber-100"><Edit className="w-4 h-4" /></button>
                                                <button onClick={() => handleDelete(t._id)} className="p-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"><Trash2 className="w-4 h-4" /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {testimonials.length === 0 && <tr><td colSpan={7} className="px-4 py-8 text-center text-gray-400">No reviews found. Click Seed or Add New.</td></tr>}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* View Modal */}
            {viewItem && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setViewItem(null)}>
                    <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex items-center gap-4">
                                    <img src={getImg(viewItem.imageUrl)} alt={viewItem.name} className="w-16 h-16 rounded-full object-cover border-2 border-red-50 shadow-sm" />
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-800">{viewItem.name}</h3>
                                        <p className="text-xs text-slate-500 font-bold uppercase">{viewItem.designation} | {viewItem.city}</p>
                                    </div>
                                </div>
                                <button onClick={() => setViewItem(null)} className="p-1 hover:bg-gray-100 rounded-full"><X className="w-5 h-5" /></button>
                            </div>
                            
                            <div className="flex gap-0.5 mb-4 text-amber-500">
                                {[...Array(5)].map((_, i) => <Star key={i} className={`w-4 h-4 ${i < viewItem.rating ? 'fill-current' : 'text-gray-200'}`} />)}
                            </div>

                            <div className="bg-gray-50 rounded-xl p-4 italic text-gray-700 text-sm mb-6 border-l-4 border-red-500">
                                "{viewItem.feedback}"
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-xs font-bold uppercase text-gray-500">
                                <div className="bg-white border rounded-lg p-3">
                                    <div className="text-[10px] mb-1 opacity-60">Service Taken</div>
                                    <div className="text-gray-800">{viewItem.service}</div>
                                </div>
                                <div className="bg-white border rounded-lg p-3">
                                    <div className="text-[10px] mb-1 opacity-60">Status</div>
                                    <div className={viewItem.isActive ? 'text-green-600' : 'text-red-600'}>{viewItem.isActive ? 'Active' : 'Hidden'}</div>
                                </div>
                                <div className="bg-white border rounded-lg p-3">
                                    <div className="text-[10px] mb-1 opacity-60">Date Posted</div>
                                    <div className="text-gray-800">{viewItem.date}</div>
                                </div>
                                <div className="bg-white border rounded-lg p-3">
                                    <div className="text-[10px] mb-1 opacity-60">Read Time</div>
                                    <div className="text-gray-800">{viewItem.readTime}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
