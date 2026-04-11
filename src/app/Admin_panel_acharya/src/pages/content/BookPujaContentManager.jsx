import React, { useState } from 'react';
import {
    Plus, Edit2, Trash2, X, Save, Database,
    Layers, Users, Shield, HelpCircle, Star,
    ArrowUp, ArrowDown, Check, Sparkles, Award
} from 'lucide-react';
import RichTextEditor from '../../components/RichTextEditor';
import {
    useGetStepsQuery, useCreateStepMutation, useUpdateStepMutation, useDeleteStepMutation,
    useGetExpertsQuery, useCreateExpertMutation, useUpdateExpertMutation, useDeleteExpertMutation,
    useGetSamagriQuery, useCreateSamagriMutation, useUpdateSamagriMutation, useDeleteSamagriMutation,
    useGetFAQsQuery, useCreateFAQMutation, useUpdateFAQMutation, useDeleteFAQMutation,
    useSeedContentMutation
} from '../../../../../services/bookPujaContentApi';
import { toast } from 'react-toastify';

const BookPujaContentManager = () => {
    const [activeTab, setActiveTab] = useState('Steps');
    const [editingId, setEditingId] = useState(null);
    const [seedContent, { isLoading: isSeeding }] = useSeedContentMutation();

    const tabs = [
        { id: 'Steps', icon: <Layers size={18} />, label: 'Puja Process' },
        { id: 'Experts', icon: <Users size={18} />, label: 'Verified Experts' },
        { id: 'Samagri', icon: <Shield size={18} />, label: 'Quality Assurance' },
        { id: 'FAQs', icon: <HelpCircle size={18} />, label: 'Support FAQs' }
    ];

    const { data: steps = [] } = useGetStepsQuery();
    const { data: experts = [] } = useGetExpertsQuery();
    const { data: samagri = [] } = useGetSamagriQuery();
    const { data: faqs = [] } = useGetFAQsQuery();

    const [itemFormData, setItemFormData] = useState({});

    // Mutation Hooks
    const [createStep] = useCreateStepMutation();
    const [updateStep] = useUpdateStepMutation();
    const [deleteStep] = useDeleteStepMutation();

    const [createExpert] = useCreateExpertMutation();
    const [updateExpert] = useUpdateExpertMutation();
    const [deleteExpert] = useDeleteExpertMutation();

    const [createSamagri] = useCreateSamagriMutation();
    const [updateSamagri] = useUpdateSamagriMutation();
    const [deleteSamagri] = useDeleteSamagriMutation();

    const [createFAQ] = useCreateFAQMutation();
    const [updateFAQ] = useUpdateFAQMutation();
    const [deleteFAQ] = useDeleteFAQMutation();

    const handleEdit = (item) => {
        setEditingId(item._id);
        setItemFormData(item);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const resetForm = () => {
        setEditingId(null);
        setItemFormData({});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (activeTab === 'Steps') {
                editingId ? await updateStep({ id: editingId, ...itemFormData }).unwrap() : await createStep(itemFormData).unwrap();
            } else if (activeTab === 'Experts') {
                editingId ? await updateExpert({ id: editingId, ...itemFormData }).unwrap() : await createExpert(itemFormData).unwrap();
            } else if (activeTab === 'Samagri') {
                editingId ? await updateSamagri({ id: editingId, ...itemFormData }).unwrap() : await createSamagri(itemFormData).unwrap();
            } else if (activeTab === 'FAQs') {
                editingId ? await updateFAQ({ id: editingId, ...itemFormData }).unwrap() : await createFAQ(itemFormData).unwrap();
            }
            toast.success('Saved successfully');
            resetForm();
        } catch (err) {
            toast.error('Action failed');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            if (activeTab === 'Steps') await deleteStep(id).unwrap();
            else if (activeTab === 'Experts') await deleteExpert(id).unwrap();
            else if (activeTab === 'Samagri') await deleteSamagri(id).unwrap();
            else if (activeTab === 'FAQs') await deleteFAQ(id).unwrap();
            toast.success('Deleted');
        } catch (err) {
            toast.error('Delete failed');
        }
    };

    const renderForm = () => {
        if (activeTab === 'Steps') return (
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-gray-400">Step No.</label>
                        <input type="text" value={itemFormData.number || ''} onChange={e => setItemFormData({...itemFormData, number: e.target.value})} className="w-full px-4 py-2 border rounded-xl font-bold" placeholder="e.g. 1" required />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-gray-400">English Title</label>
                        <input type="text" value={itemFormData.title || ''} onChange={e => setItemFormData({...itemFormData, title: e.target.value})} className="w-full px-4 py-2 border rounded-xl font-bold" placeholder="e.g. Select Puja" required />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-gray-400">Subtitle</label>
                        <input type="text" value={itemFormData.subtitle || ''} onChange={e => setItemFormData({...itemFormData, subtitle: e.target.value})} className="w-full px-4 py-2 border rounded-xl font-bold" placeholder="e.g. Browse catalog" required />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-gray-400">Hindi Heading</label>
                        <input type="text" value={itemFormData.hindiTitle || ''} onChange={e => setItemFormData({...itemFormData, hindiTitle: e.target.value})} className="w-full px-4 py-2 border rounded-xl font-bold" placeholder="अपनी पूजा चुनें" required />
                    </div>
                </div>
                
                {/* Fields Builder */}
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="text-[11px] font-black uppercase text-blue-900 tracking-widest">Form Fields Manager</h4>
                        <button type="button" onClick={() => setItemFormData(p => ({ ...p, fields: [...(p.fields || []), { name: '', label: '', placeholder: '', type: 'text', required: true }] }))} className="px-3 py-1 bg-blue-900 text-white text-[10px] font-bold rounded-lg uppercase">Add Field</button>
                    </div>
                    <div className="space-y-3">
                        {(itemFormData.fields || []).map((f, i) => (
                            <div key={i} className="grid grid-cols-1 md:grid-cols-6 gap-2 bg-white p-3 border border-gray-100 rounded-xl relative">
                                <input type="text" value={f.label} onChange={e => { let n = [...itemFormData.fields]; n[i] = {...n[i], label: e.target.value}; setItemFormData({...itemFormData, fields: n}) }} className="text-[10px] font-bold px-2 py-1 border rounded" placeholder="Label" />
                                <input type="text" value={f.name} onChange={e => { let n = [...itemFormData.fields]; n[i] = {...n[i], name: e.target.value}; setItemFormData({...itemFormData, fields: n}) }} className="text-[10px] font-bold px-2 py-1 border rounded" placeholder="Field Name" />
                                <input type="text" value={f.placeholder} onChange={e => { let n = [...itemFormData.fields]; n[i] = {...n[i], placeholder: e.target.value}; setItemFormData({...itemFormData, fields: n}) }} className="text-[10px] font-bold px-2 py-1 border rounded md:col-span-2" placeholder="Placeholder" />
                                <select value={f.type} onChange={e => { let n = [...itemFormData.fields]; n[i] = {...n[i], type: e.target.value}; setItemFormData({...itemFormData, fields: n}) }} className="text-[10px] font-bold px-2 py-1 border rounded">
                                    <option value="text">Input</option>
                                    <option value="tel">Phone</option>
                                    <option value="date">Date</option>
                                    <option value="textarea">Text Area</option>
                                </select>
                                <div className="flex items-center justify-center gap-2">
                                    <input type="checkbox" checked={f.required} onChange={e => { let n = [...itemFormData.fields]; n[i] = {...n[i], required: e.target.checked}; setItemFormData({...itemFormData, fields: n}) }} />
                                    <span className="text-[9px] font-black uppercase">Req</span>
                                    <button onClick={() => { let n = [...itemFormData.fields]; n.splice(i, 1); setItemFormData({...itemFormData, fields: n}) }} className="ml-2 text-red-400"><X size={14}/></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );

        if (activeTab === 'Experts') return (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-gray-400">Acharya Name</label>
                    <input type="text" value={itemFormData.name || ''} onChange={e => setItemFormData({...itemFormData, name: e.target.value})} className="w-full px-4 py-2 border rounded-xl font-bold" placeholder="e.g. Pandit Raghunath" required />
                </div>
                <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-gray-400">Experience</label>
                    <input type="text" value={itemFormData.experience || ''} onChange={e => setItemFormData({...itemFormData, experience: e.target.value})} className="w-full px-4 py-2 border rounded-xl font-bold" placeholder="e.g. 25+ years" required />
                </div>
                <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-gray-400">Expertise</label>
                    <input type="text" value={itemFormData.expertise || ''} onChange={e => setItemFormData({...itemFormData, expertise: e.target.value})} className="w-full px-4 py-2 border rounded-xl font-bold" placeholder="e.g. Vedic Rituals" required />
                </div>
                <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-gray-400">Rating</label>
                    <input type="number" step="0.1" value={itemFormData.rating || 4.9} onChange={e => setItemFormData({...itemFormData, rating: e.target.value})} className="w-full px-4 py-2 border rounded-xl font-bold" required />
                </div>
            </div>
        );

        if (activeTab === 'Samagri') return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-gray-400">Item Title</label>
                    <input type="text" value={itemFormData.title || ''} onChange={e => setItemFormData({...itemFormData, title: e.target.value})} className="w-full px-4 py-2 border rounded-xl font-bold" required />
                </div>
                <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-gray-400">Hindi Tagline</label>
                    <input type="text" value={itemFormData.subtitle || ''} onChange={e => setItemFormData({...itemFormData, subtitle: e.target.value})} className="w-full px-4 py-2 border rounded-xl font-bold" required />
                </div>
                <div className="space-y-1 md:col-span-3">
                    <label className="text-[10px] font-black uppercase text-gray-400">Description (HTML)</label>
                    <RichTextEditor 
                        value={itemFormData.description || ''} 
                        onChange={(content) => setItemFormData({...itemFormData, description: content})} 
                        placeholder="Enter item description..."
                    />
                </div>
            </div>
        );

        if (activeTab === 'FAQs') return (
            <div className="grid grid-cols-1 gap-4">
                <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-gray-400">Question</label>
                    <input type="text" value={itemFormData.question || ''} onChange={e => setItemFormData({...itemFormData, question: e.target.value})} className="w-full px-4 py-2 border rounded-xl font-bold" required />
                </div>
                <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-gray-400">Answer (HTML)</label>
                    <RichTextEditor 
                        value={itemFormData.answer || ''} 
                        onChange={(content) => setItemFormData({...itemFormData, answer: content})} 
                        placeholder="Enter faq answer..."
                    />
                </div>
            </div>
        );
    };

    const currentItems = activeTab === 'Steps' ? steps : activeTab === 'Experts' ? experts : activeTab === 'Samagri' ? samagri : faqs;

    return (
        <div className="p-6 bg-gray-50/50 min-h-screen font-sans">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Book Puja Content <span className="text-orange-600">Manager</span></h1>
                    <p className="text-sm text-gray-500 font-medium">Manage steps, experts, and FAQs for the book puja page</p>
                </div>
                <button
                    onClick={async () => {
                        if (window.confirm('Reset/Seed default content?')) {
                            try { await seedContent().unwrap(); toast.success('Content Synchronized'); }
                            catch (e) { toast.error('Sync failed'); }
                        }
                    }}
                    disabled={isSeeding}
                    className="px-6 py-2 bg-white text-blue-900 border-2 border-blue-900 font-bold rounded-xl flex items-center gap-2 hover:bg-blue-900 hover:text-white transition-all shadow-lg shadow-blue-900/10"
                >
                    <Database size={18} /> Sync Defaults
                </button>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-2 mb-8 bg-white p-2 rounded-2xl shadow-sm border border-gray-100 max-w-max">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => { setActiveTab(tab.id); resetForm(); }}
                        className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2.5 transition-all ${
                            activeTab === tab.id ? 'bg-blue-900 text-white shadow-lg shadow-blue-200' : 'bg-transparent text-gray-400 hover:bg-gray-50'
                        }`}
                    >
                        {tab.icon} {tab.label}
                    </button>
                ))}
            </div>

            {/* Form */}
            <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-xl shadow-blue-900/5 mb-10 overflow-hidden relative">
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-50">
                    <h3 className="text-lg font-black text-gray-800 uppercase tracking-tight flex items-center gap-3">
                        <Plus className="text-blue-900" size={24} /> {editingId ? `Update ${activeTab}` : `Add New ${activeTab.slice(0, -1)}`}
                    </h3>
                    {editingId && <button onClick={resetForm} className="p-2 hover:bg-red-50 text-red-500 rounded-lg"><X size={20} /></button>}
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {renderForm()}
                    <div className="flex justify-end pt-4 border-t border-gray-50">
                        <button type="submit" className="px-10 py-3 bg-green-600 text-white font-black rounded-xl shadow-lg shadow-green-200 hover:bg-green-700 transition-all flex items-center gap-2 uppercase tracking-widest text-xs">
                            <Save size={18} /> {editingId ? 'Update Entry' : `Save ${activeTab.slice(0, -1)}`}
                        </button>
                    </div>
                </form>
            </div>

            {/* List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentItems.map((item, idx) => (
                    <div key={item._id} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm relative group hover:shadow-2xl hover:shadow-blue-900/10 transition-all">
                        <div className="absolute top-4 right-4 flex items-center gap-1">
                            <button onClick={() => handleEdit(item)} className="p-2 text-blue-900 bg-blue-50/50 hover:bg-blue-50 rounded-lg transition-all"><Edit2 size={18} /></button>
                            <button onClick={() => handleDelete(item._id)} className="p-2 text-red-500 bg-red-50/50 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={18} /></button>
                        </div>

                        {activeTab === 'Steps' && (
                            <div className="space-y-4">
                                <div className="w-12 h-12 bg-blue-50 text-blue-900 font-black rounded-xl flex items-center justify-center text-xl">{item.number}</div>
                                <h4 className="font-black text-gray-800 uppercase text-lg">{item.title}</h4>
                                <p className="text-xs font-bold text-blue-900 uppercase tracking-widest">{item.hindiTitle}</p>
                                <p className="text-xs font-medium text-gray-400 uppercase tracking-widest">{item.subtitle}</p>
                            </div>
                        )}

                        {activeTab === 'Experts' && (
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center"><Award size={24} /></div>
                                    <div>
                                        <h4 className="font-black text-gray-800 uppercase leading-none">{item.name}</h4>
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{item.experience}</span>
                                    </div>
                                </div>
                                <p className="text-xs font-bold text-blue-900 uppercase tracking-widest">{item.expertise}</p>
                                <div className="flex items-center gap-1 text-yellow-400">
                                    <Star size={14} fill="currentColor" /> <span className="text-gray-800 text-xs font-black">{item.rating}</span>
                                </div>
                            </div>
                        )}

                        {activeTab === 'Samagri' && (
                            <div className="space-y-4 text-center">
                                <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center mx-auto"><Shield size={24} /></div>
                                <h4 className="font-black text-gray-800 uppercase text-lg">{item.title}</h4>
                                <p className="text-xs font-black text-orange-600 uppercase tracking-widest">{item.subtitle}</p>
                                <p className="text-xs font-medium text-gray-500 line-clamp-2">{item.description}</p>
                            </div>
                        )}

                        {activeTab === 'FAQs' && (
                            <div className="space-y-4">
                                <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center"><HelpCircle size={20} /></div>
                                <h4 className="font-bold text-gray-800 uppercase text-sm leading-tight">"{item.question}"</h4>
                                <p className="text-[11px] font-medium text-gray-400 italic line-clamp-3">{item.answer}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BookPujaContentManager;
