import React, { useState, useRef } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Eye, Edit, Trash2, X, Plus, Database, Star, Calendar, Clock, User } from 'lucide-react';
import RichTextEditor from '../../components/RichTextEditor';
import {
    useGetAllBlogsQuery, useCreateBlogMutation,
    useUpdateBlogMutation, useDeleteBlogMutation,
    useSeedBlogsMutation, useGetBlogSettingsQuery,
    useUpdateBlogSettingsMutation
} from '../../../../../services/blogApi';
import { BACKEND_URL } from '../../../../../config/apiConfig';

const emptyForm = { title: '', excerpt: '', category: '', readTime: '', date: '', author: '', url: '', rating: '', isActive: true, order: '', metaTitle: '', metaDescription: '', metaKeywords: '', slug: '' };

export default function BlogManager() {
    const [form, setForm] = useState(emptyForm);
    const [settingsForm, setSettingsForm] = useState({ badge: '', title: '', subtitle: '' });
    const [editId, setEditId] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [viewItem, setViewItem] = useState(null);
    const fileRef = useRef();

    const { data: blogs = [], isLoading } = useGetAllBlogsQuery(undefined, { pollingInterval: 60000 });
    const { data: settings } = useGetBlogSettingsQuery();
    const [createBlog] = useCreateBlogMutation();
    const [updateBlog] = useUpdateBlogMutation();
    const [deleteBlog] = useDeleteBlogMutation();
    const [seedBlogs] = useSeedBlogsMutation();
    const [updateSettings] = useUpdateBlogSettingsMutation();

    React.useEffect(() => {
        if (settings) setSettingsForm({ badge: settings.badge, title: settings.title, subtitle: settings.subtitle });
    }, [settings]);

    const getImg = (url) => !url ? '' : url.startsWith('http') ? url : `${BACKEND_URL}${url}`;

    const handleImage = (e) => {
        const file = e.target.files[0];
        if (file) { setImageFile(file); setImagePreview(URL.createObjectURL(file)); }
    };

    const handleSettingsSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateSettings(settingsForm).unwrap();
            toast.success('Section headers updated!');
        } catch { toast.error('Settings update failed'); }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const fd = new FormData();
            Object.entries(form).forEach(([k, v]) => fd.append(k, v));
            if (imageFile) fd.append('image', imageFile);
            if (editId) {
                await updateBlog({ id: editId, formData: fd }).unwrap();
                toast.success('Blog updated!');
            } else {
                await createBlog(fd).unwrap();
                toast.success('Blog created!');
            }
            resetForm();
        } catch (err) { toast.error(err?.data?.message || 'Error occurred'); }
    };

    const handleEdit = (b) => {
        setForm({
            title: b.title, excerpt: b.excerpt, category: b.category, readTime: b.readTime, date: b.date, author: b.author || '', url: b.url, rating: b.rating, isActive: b.isActive !== false, order: b.order || '',
            metaTitle: b.metaTitle || '', metaDescription: b.metaDescription || '', metaKeywords: b.metaKeywords || '', slug: b.slug || ''
        });
        setImagePreview(getImg(b.imageUrl));
        setEditId(b._id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this blog?')) return;
        try { await deleteBlog(id).unwrap(); toast.success('Deleted!'); } catch { toast.error('Delete failed'); }
    };

    const handleToggle = async (b, field) => {
        try {
            const fd = new FormData();
            fd.append(field, !b[field]);
            await updateBlog({ id: b._id, formData: fd }).unwrap();
            toast.success('Updated!');
        } catch { toast.error('Update failed'); }
    };

    const handleSeed = async () => {
        if (!window.confirm('Seed will replace all data. Continue?')) return;
        try { await seedBlogs().unwrap(); toast.success('Seeded!'); } catch { toast.error('Seed failed'); }
    };

    const resetForm = () => { setForm(emptyForm); setEditId(null); setImageFile(null); setImagePreview(''); if (fileRef.current) fileRef.current.value = ''; };

    const inputCls = "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white";
    const labelCls = "block text-xs font-semibold text-gray-800 mb-1 uppercase tracking-wide";

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <ToastContainer position="top-right" autoClose={2500} />
            <div className="flex justify-between items-center mb-10 pb-6 border-b border-gray-100">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 uppercase">Blog Content <span className="text-orange-600">Manager</span></h1>
                    <p className="text-sm text-gray-500 font-medium italic-none">Create, edit and manage articles and section headers in the divine community</p>
                </div>
                <button onClick={handleSeed} className="flex items-center gap-2 bg-orange-50 text-orange-600 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-orange-100 border border-orange-100 transition-all active:scale-95">
                    <Database className="w-4 h-4" /> Seed Sample Blogs
                </button>
            </div>

            {/* Section Settings */}
            <div className="bg-white rounded-xl shadow-sm border p-5 mb-6">
                <h2 className="text-base font-bold text-gray-700 mb-4 border-b pb-2">Section Headers Settings</h2>
                <form onSubmit={handleSettingsSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div><label className={labelCls}>Badge</label><input className={inputCls} value={settingsForm.badge} onChange={e => setSettingsForm(p => ({ ...p, badge: e.target.value }))} placeholder="e.g. BLOG HUB" /></div>
                        <div className="md:col-span-2"><label className={labelCls}>Title</label><input className={inputCls} value={settingsForm.title} onChange={e => setSettingsForm(p => ({ ...p, title: e.target.value }))} placeholder="e.g. Ancient Wisdom & Blogs" /></div>
                        <div className="md:col-span-3"><label className={labelCls}>Subtitle</label><input className={inputCls} value={settingsForm.subtitle} onChange={e => setSettingsForm(p => ({ ...p, subtitle: e.target.value }))} placeholder="e.g. Exploring the mysteries of the cosmos and ancient sciences" /></div>
                    </div>
                    <button type="submit" className="bg-gray-800 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-black transition-colors">Save Section Settings</button>
                </form>
            </div>

            {/* Add/Edit Form */}
            <div className="bg-white rounded-xl shadow-sm border p-5 mb-6">
                <h2 className="text-base font-bold text-gray-700 mb-4 border-b pb-2">{editId ? 'Edit Article' : 'Add New Article'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <div className="md:col-span-2"><label className={labelCls}>Title *</label><input className={inputCls} value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} required placeholder='Enter blog title' /></div>
                        <div><label className={labelCls}>Category *</label><input className={inputCls} value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} required placeholder="e.g. Astrology Science" /></div>
                        <div><label className={labelCls}>Rating</label><input type="number" step="0.1" min="0" max="5" className={inputCls} value={form.rating} onChange={e => setForm(p => ({ ...p, rating: e.target.value }))} placeholder="Enter rating (0-5)" /></div>

                        <div className="md:col-span-4">
                            <label className={labelCls}>Article Content / Excerpt *</label>
                            <RichTextEditor
                                value={form.excerpt}
                                onChange={(content) => setForm(p => ({ ...p, excerpt: content }))}
                                placeholder="Enter the main content or short summary of the blog"
                            />
                        </div>

                        <div><label className={labelCls}>Read Time</label><input className={inputCls} value={form.readTime} onChange={e => setForm(p => ({ ...p, readTime: e.target.value }))} placeholder="e.g. 5 min" /></div>
                        <div><label className={labelCls}>Date</label><input className={inputCls} value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))} placeholder="e.g. Jan 12, 2026" /></div>
                        <div><label className={labelCls}>Author / Pandit</label><input className={inputCls} value={form.author} onChange={e => setForm(p => ({ ...p, author: e.target.value }))} placeholder="Enter author name" /></div>
                        <div><label className={labelCls}>URL Path *</label><input className={inputCls} value={form.url} onChange={e => setForm(p => ({ ...p, url: e.target.value }))} required placeholder="e.g. /blog/my-article" /></div>

                        <div className="md:col-span-2">
                            <label className={labelCls}>Order</label>
                            <input type="number" className={inputCls} value={form.order} onChange={e => setForm(p => ({ ...p, order: e.target.value }))} placeholder="Enter display order (e.g. 1)" />
                            <div className="mt-4 flex items-center gap-2">
                                <input type="checkbox" checked={form.isActive} onChange={e => setForm(p => ({ ...p, isActive: e.target.checked }))} className="w-4 h-4 accent-green-600" />
                                <span className="text-sm text-gray-600 font-semibold">Active Article</span>
                            </div>
                        </div>

                        <div className="md:col-span-2">
                            <label className={labelCls}>Article Image {!editId && '*'}</label>
                            <input ref={fileRef} type="file" accept="image/*" onChange={handleImage} className="w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-orange-50 file:text-orange-600 hover:file:bg-orange-100" />
                            {imagePreview && <img src={imagePreview} alt="preview" className="mt-2 h-20 w-32 object-cover rounded-lg border shadow-sm" />}
                        </div>

                        {/* Professional SEO Infrastructure for Child Pages */}
                        <div className="md:col-span-4 mt-6 pt-6 border-t border-dashed border-gray-200">
                            <h3 className="text-xs font-black text-orange-600 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                                <Database className="w-4 h-4" /> SEO Metadata (Specific to this Article)
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="md:col-span-2">
                                    <label className={labelCls}>
                                        Meta Title
                                        <span className={`ml-2 normal-case font-medium ${form.metaTitle?.length > 65 ? 'text-red-500' : 'text-green-500'}`}>({form.metaTitle?.length || 0}/65)</span>
                                    </label>
                                    <input className={inputCls} value={form.metaTitle} onChange={e => setForm(p => ({ ...p, metaTitle: e.target.value }))} placeholder="Optimal length is around 60 characters" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className={labelCls}>
                                        Meta Description
                                        <span className={`ml-2 normal-case font-medium ${form.metaDescription?.length > 160 ? 'text-red-500' : 'text-green-500'}`}>({form.metaDescription?.length || 0}/160)</span>
                                    </label>
                                    <textarea className={inputCls} rows={2} value={form.metaDescription} onChange={e => setForm(p => ({ ...p, metaDescription: e.target.value }))} placeholder="Provide a compelling summary for search engine results" />
                                </div>
                                <div>
                                    <label className={labelCls}>URL Slug (Keyword in URL)</label>
                                    <input className={inputCls} value={form.slug} onChange={e => setForm(p => ({ ...p, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') }))} placeholder="e.g. how-to-learn-astrology" />
                                </div>
                                <div>
                                    <label className={labelCls}>Focus Keywords</label>
                                    <input className={inputCls} value={form.metaKeywords} onChange={e => setForm(p => ({ ...p, metaKeywords: e.target.value }))} placeholder="e.g. astrology, vedic learning, kundli" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button type="submit" className="flex items-center gap-2 bg-orange-600 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-orange-700 transition-all shadow-md">
                            <Plus className="w-4 h-4" />{editId ? 'Update Article' : 'Add Article'}
                        </button>
                        {editId && <button type="button" onClick={resetForm} className="flex items-center gap-2 bg-gray-200 text-gray-700 px-6 py-2 rounded-lg text-sm font-semibold hover:bg-gray-300 transition-all"><X className="w-4 h-4" /> Cancel</button>}
                    </div>
                </form>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                <div className="p-4 border-b font-bold text-gray-700">All Articles ({blogs.length})</div>
                {isLoading ? <div className="p-8 text-center text-gray-400 font-medium">Loading content...</div> : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    {['#', 'Order', 'Image', 'Title & Excerpt', 'Category', 'Rating', 'Active Status', 'Actions'].map(h => (
                                        <th key={h} className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-widest">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 italic-none">
                                {blogs.map((b, i) => (
                                    <tr key={b._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-4 py-3 text-gray-500 font-medium">{i + 1}</td>
                                        <td className="px-4 py-3 font-bold text-gray-700">{b.order}</td>
                                        <td className="px-4 py-3">
                                            <img src={getImg(b.imageUrl)} alt={b.title} className="w-16 h-10 object-cover rounded border bg-gray-100" onError={e => e.target.src = 'https://via.placeholder.com/100x60'} />
                                        </td>
                                        <td className="px-4 py-3 max-w-xs">
                                            <div className="font-bold text-gray-800 truncate mb-0.5">{b.title}</div>
                                            <div className="text-[10px] text-gray-400 truncate font-semibold uppercase">{b.excerpt}</div>
                                        </td>
                                        <td className="px-4 py-3 text-xs font-bold text-slate-500">{b.category}</td>
                                        <td className="px-4 py-3"><div className="flex items-center gap-1 text-amber-500 font-bold "><Star className="w-3.5 h-3.5 fill-current" /> {b.rating}</div></td>
                                        <td className="px-4 py-3">
                                            <button onClick={() => handleToggle(b, 'isActive')} className={`relative inline-flex h-5 w-9 rounded-full transition-colors ${b.isActive ? 'bg-orange-500' : 'bg-gray-300'}`}>
                                                <span className={`inline-block h-4 w-4 translate-y-0.5 rounded-full bg-white shadow transition-transform ${b.isActive ? 'translate-x-4' : 'translate-x-0.5'}`} />
                                            </button>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-2">
                                                <button onClick={() => setViewItem(b)} className="p-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"><Eye className="w-4 h-4" /></button>
                                                <button onClick={() => handleEdit(b)} className="p-1.5 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100"><Edit className="w-4 h-4" /></button>
                                                <button onClick={() => handleDelete(b._id)} className="p-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"><Trash2 className="w-4 h-4" /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {blogs.length === 0 && <tr><td colSpan={8} className="px-4 py-12 text-center text-gray-400 font-medium italic">No articles yet. Start by seeding sample data!</td></tr>}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* View Modal */}
            {viewItem && (
                <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setViewItem(null)}>
                    <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                        <div className="relative h-64 overflow-hidden">
                            <img src={getImg(viewItem.imageUrl)} alt={viewItem.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                            <div className="absolute bottom-6 left-6 right-6">
                                <span className="px-3 py-1 bg-orange-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full mb-3 inline-block">{viewItem.category}</span>
                                <h3 className="text-2xl font-black text-white leading-tight">{viewItem.title}</h3>
                            </div>
                            <button onClick={() => setViewItem(null)} className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full backdrop-blur-md transition-colors"><X className="w-5 h-5" /></button>
                        </div>
                        <div className="p-8">
                            <div className="flex flex-wrap items-center gap-6 mb-8 text-xs font-bold uppercase tracking-widest text-slate-400">
                                <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-orange-600" /> {viewItem.date}</div>
                                <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-orange-600" /> {viewItem.readTime}</div>
                                {viewItem.author && <div className="flex items-center gap-2"><User className="w-4 h-4 text-orange-600" /> {viewItem.author}</div>}
                                <div className="flex items-center gap-2 text-amber-500"><Star className="w-4 h-4 fill-current" /> {viewItem.rating} Rating</div>
                            </div>

                            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-orange-600 mb-2">Short Summary</h4>
                            <p className="text-slate-600 font-medium leading-relaxed mb-8 italic">"{viewItem.excerpt}"</p>

                            <div className="flex justify-between items-center pt-6 border-t border-slate-100">
                                <div className="text-xs font-bold uppercase tracking-widest text-slate-400">Path: <span className="text-slate-900">{viewItem.url}</span></div>
                                <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${viewItem.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{viewItem.isActive ? 'Live on Website' : 'Draft Mode'}</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
