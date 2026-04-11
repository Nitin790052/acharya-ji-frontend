import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HelpCircle, Plus, Trash2, Edit, Eye, Save, ToggleLeft, ToggleRight, Database } from 'lucide-react';
import RichTextEditor from '../../components/RichTextEditor';
import { 
    useGetFAQsQuery, useCreateFAQMutation, useUpdateFAQMutation, useDeleteFAQMutation,
    useGetFAQSettingsQuery, useUpdateFAQSettingsMutation, useSeedFAQsMutation 
} from '../../../../../services/faqApi';

const emptyForm = { question: '', answer: '', isActive: true, order: 0 };

export default function FAQManager() {
    const { data: faqs = [], isLoading } = useGetFAQsQuery();
    const { data: settings } = useGetFAQSettingsQuery();
    
    const [createFAQ] = useCreateFAQMutation();
    const [updateFAQ] = useUpdateFAQMutation();
    const [deleteFAQ] = useDeleteFAQMutation();
    const [updateSettings] = useUpdateFAQSettingsMutation();
    const [seedFAQs] = useSeedFAQsMutation();

    const [form, setForm] = useState(emptyForm);
    const [editId, setEditId] = useState(null);
    const [viewData, setViewData] = useState(null);
    const [settingsForm, setSettingsForm] = useState({ badge: '', title: '', subtitle: '', ctaText: '', ctaLinkText: '', ctaLink: '' });

    useEffect(() => {
        if (settings) setSettingsForm({ ...settings });
    }, [settings]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editId) {
                await updateFAQ({ id: editId, ...form }).unwrap();
                toast.success('FAQ updated!');
            } else {
                await createFAQ(form).unwrap();
                toast.success('FAQ created!');
            }
            resetForm();
        } catch (err) { toast.error(err?.data?.message || 'Error occurred'); }
    };

    const handleSettingsSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateSettings(setFormState).unwrap();
            toast.success('Settings updated!');
        } catch { toast.error('Update failed'); }
    };

    const resetForm = () => { setForm(emptyForm); setEditId(null); };
    const onEdit = (faq) => { setForm(faq); setEditId(faq._id); };
    const onToggle = async (faq) => { await updateFAQ({ id: faq._id, isActive: !faq.isActive }); };
    const onDelete = async (id) => { if (window.confirm('Delete this FAQ?')) await deleteFAQ(id); };
    const onSeed = async () => { if (window.confirm('This will replace all current FAQs. Continue?')) await seedFAQs(); };

    const inputCls = "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-400 bg-white";
    const labelCls = "block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide";

    if (isLoading) return <div className="p-10 text-center font-bold text-gray-400">Loading FAQs...</div>;

    return (
        <div className="p-6 max-w-6xl mx-auto space-y-8">
            <ToastContainer position="top-right" autoClose={2500} />
            
            <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 uppercase">Faq <span className="text-orange-600">Manager</span></h1>
                    <p className="text-sm text-gray-500 font-medium">Manage frequently asked questions and section settings</p>
                </div>
                <button onClick={onSeed} className="flex items-center gap-2 bg-amber-50 text-amber-600 px-4 py-2 rounded-lg font-bold text-sm border border-amber-100 hover:bg-amber-100 transition-all">
                    <Database className="w-4 h-4" /> Seed Sample Data
                </button>
            </div>

            {/* Section Settings Form */}
            <div className="bg-white rounded-xl shadow-md border p-6">
                <h2 className="text-base font-bold text-gray-700 mb-4 border-b pb-2 flex items-center gap-2 italic">
                    <Edit className="w-4 h-4 text-red-400" /> Section Header & CTA Settings
                </h2>
                <form onSubmit={handleSettingsSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div><label className={labelCls}>Badge</label><input className={inputCls} value={settingsForm.badge} onChange={e => setSettingsForm(p => ({ ...p, badge: e.target.value }))} placeholder="Common Questions" /></div>
                    <div className="md:col-span-2"><label className={labelCls}>Title</label><input className={inputCls} value={settingsForm.title} onChange={e => setSettingsForm(p => ({ ...p, title: e.target.value }))} placeholder="Frequently Asked Questions" /></div>
                    <div className="md:col-span-3"><label className={labelCls}>Subtitle</label><textarea className={inputCls} rows={1} value={settingsForm.subtitle} onChange={e => setSettingsForm(p => ({ ...p, subtitle: e.target.value }))} /></div>
                    
                    <div><label className={labelCls}>CTA Main Text</label><input className={inputCls} value={settingsForm.ctaText} onChange={e => setSettingsForm(p => ({ ...p, ctaText: e.target.value }))} /></div>
                    <div><label className={labelCls}>CTA Link Text</label><input className={inputCls} value={settingsForm.ctaLinkText} onChange={e => setSettingsForm(p => ({ ...p, ctaLinkText: e.target.value }))} /></div>
                    <div><label className={labelCls}>CTA Link URL</label><input className={inputCls} value={settingsForm.ctaLink} onChange={e => setSettingsForm(p => ({ ...p, ctaLink: e.target.value }))} /></div>
                    
                    <div className="md:col-span-3 flex justify-end pt-2">
                        <button type="submit" className="bg-gray-800 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-black transition-all flex items-center gap-2">
                            <Save className="w-4 h-4" /> Save Settings
                        </button>
                    </div>
                </form>
            </div>

            {/* FAQ Item Form */}
            <div className={`bg-white rounded-xl shadow-md border p-6 transition-all duration-500 ${editId ? 'ring-2 ring-red-400' : ''}`}>
                <h2 className="text-base font-bold text-gray-700 mb-4 border-b pb-2 flex items-center gap-2">
                    {editId ? <Edit className="w-5 h-5 text-red-500" /> : <Plus className="w-5 h-5 text-green-500" />}
                    {editId ? 'Edit Question' : 'Add New Question'}
                </h2>
                <form onSubmit={handleFormSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <div className="md:col-span-3">
                            <label className={labelCls}>Question *</label>
                            <input className={inputCls} value={form.question} onChange={e => setForm(p => ({ ...p, question: e.target.value }))} required placeholder="Enter question..." />
                        </div>
                        <div>
                            <label className={labelCls}>Display Order</label>
                            <input type="number" className={inputCls} value={form.order} onChange={e => setForm(p => ({ ...p, order: e.target.value }))} />
                        </div>
                        <div className="md:col-span-4">
                            <label className={labelCls}>Answer (HTML Content) *</label>
                            <RichTextEditor 
                                value={form.answer} 
                                onChange={(content) => setForm(p => ({ ...p, answer: content }))}
                                placeholder="Enter faq answer..."
                            />
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <input type="checkbox" checked={form.isActive} onChange={e => setForm(p => ({ ...p, isActive: e.target.checked }))} className="w-4 h-4 accent-red-600" />
                            <span className="text-sm font-semibold text-gray-600">Active / Published</span>
                        </div>
                        <div className="flex gap-3">
                            {editId && <button type="button" onClick={resetForm} className="px-6 py-2 border rounded-xl text-gray-600 font-bold hover:bg-gray-50 uppercase text-xs tracking-widest">Cancel</button>}
                            <button type="submit" className="bg-red-600 text-white px-8 py-2 rounded-xl font-bold hover:bg-red-700 transition-all shadow-lg text-sm">
                                {editId ? 'Update Question' : 'Create Question'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            {/* FAQs Table */}
            <div className="bg-white rounded-xl shadow-md border overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">S.No</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Question</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Order</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase text-center">Status</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 italic">
                        {faqs.map((faq, idx) => (
                            <tr key={faq._id} className="hover:bg-gray-50/50 transition-colors group">
                                <td className="px-6 py-4 text-sm font-bold text-gray-400">{idx + 1}</td>
                                <td className="px-6 py-4">
                                    <div className="text-sm font-bold text-gray-700 truncate max-w-md">{faq.question}</div>
                                    <div className="text-[10px] text-gray-400 truncate max-w-md">{faq.answer}</div>
                                </td>
                                <td className="px-6 py-4 text-sm font-semibold text-gray-600">{faq.order}</td>
                                <td className="px-6 py-4">
                                    <button onClick={() => onToggle(faq)} className="mx-auto flex items-center justify-center">
                                        {faq.isActive ? <ToggleRight className="w-8 h-8 text-green-500" /> : <ToggleLeft className="w-8 h-8 text-gray-300" />}
                                    </button>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button onClick={() => setViewData(faq)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-all" title="View"><Eye className="w-4 h-4" /></button>
                                        <button onClick={() => onEdit(faq)} className="p-2 text-amber-500 hover:bg-amber-50 rounded-lg transition-all" title="Edit"><Edit className="w-4 h-4" /></button>
                                        <button onClick={() => onDelete(faq._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all" title="Delete"><Trash2 className="w-4 h-4" /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* View Modal */}
            {viewData && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-scale-in">
                        <div className="p-8">
                            <div className="flex justify-between items-start mb-6">
                                <div className="p-3 bg-red-50 rounded-2xl"><HelpCircle className="w-8 h-8 text-red-500" /></div>
                                <button onClick={() => setViewData(null)} className="text-gray-400 hover:text-gray-600 transition-colors">
                                    <Plus className="w-6 h-6 rotate-45" />
                                </button>
                            </div>
                            <div className="space-y-6">
                                <div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-red-500 bg-red-50 px-3 py-1 rounded-full mb-3 inline-block">Question</span>
                                    <h3 className="text-2xl font-black text-gray-800 leading-tight">{viewData.question}</h3>
                                </div>
                                <div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3 block">Answer</span>
                                    <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 text-gray-600 leading-relaxed italic">
                                        {viewData.answer}
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4 pt-4">
                                    <div className="bg-gray-50 p-4 rounded-2xl">
                                        <span className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Status</span>
                                        <span className={`text-sm font-bold ${viewData.isActive ? 'text-green-600' : 'text-gray-500'}`}>{viewData.isActive ? 'Active' : 'Hidden'}</span>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-2xl">
                                        <span className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Display Order</span>
                                        <span className="text-sm font-bold text-gray-700">Position: {viewData.order}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
