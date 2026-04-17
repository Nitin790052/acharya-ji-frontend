import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Layout, Save, Plus, Trash2, Edit, Eye, Database, Check, X } from 'lucide-react';
import RichTextEditor from '../../components/RichTextEditor';
import { BACKEND_URL, getImageUrl } from '../../../../../config/apiConfig';
import { 
    useGetAboutPageSettingsQuery, 
    useUpdateAboutPageSettingsMutation, 
    useSeedAboutPageMutation,
    useGetAboutPageItemsQuery,
    useCreateAboutPageItemMutation,
    useUpdateAboutPageItemMutation,
    useDeleteAboutPageItemMutation
} from '../../../../../services/aboutPageApi';

export default function AboutPageManager() {
    const { data: settings, isLoading: loadingSettings } = useGetAboutPageSettingsQuery();
    const [updateSettings] = useUpdateAboutPageSettingsMutation();
    const [seedPage] = useSeedAboutPageMutation();
    
    const [activeTab, setActiveTab] = useState('settings');

    const [formSettings, setFormSettings] = useState({
        journeyBadge: '', journeyTitle: '', journeyDesc1: '', journeyDesc2: '', journeyFeatures: [], journeyExpYears: '', journeyImage: '',
        offerBadge: '', offerTitle: '',
        whyChooseBadge: '', whyChooseTitle: '', valuesTitle: '',
        beliefTitle: '', beliefText: '',
        testimonialBadge: '', testimonialTitle: '',
        ctaTitle1: '', ctaHighlight: '', ctaTitle2: '', ctaDesc: '',
    });

    useEffect(() => {
        if (settings) setFormSettings(settings);
    }, [settings]);

    const handleSettingsSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateSettings(formSettings).unwrap();
            toast.success('Settings updated!');
        } catch { toast.error('Update failed'); }
    };

    const handleFeatureChange = (idx, val) => {
        const newArr = [...formSettings.journeyFeatures];
        newArr[idx] = val;
        setFormSettings({ ...formSettings, journeyFeatures: newArr });
    };

    const onSeed = async () => {
        if (window.confirm('Replace all About Page content with defaults?')) {
            try {
                await seedPage().unwrap();
                toast.success('Seeded successfully!');
            } catch { toast.error('Seed failed'); }
        }
    };

    if (loadingSettings) return <div className="p-10 text-center text-gray-400">Loading...</div>;

    return (
        <div className="p-6 max-w-6xl mx-auto space-y-6">
            <ToastContainer position="top-right" autoClose={2500} />
            
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 uppercase italic-none">About Page <span className="text-orange-600">Manager</span></h1>
                    <p className="text-sm text-gray-500 font-medium italic-none">Manage sacred journey, core values, and features of your about page</p>
                </div>
                <button type="button" onClick={onSeed} className="flex items-center gap-2 bg-amber-50 text-amber-600 px-4 py-2 rounded-lg font-bold text-sm hover:bg-amber-100">
                    <Database className="w-4 h-4" /> Seed Features
                </button>
            </div>

            <div className="flex gap-4 border-b border-gray-200 mb-6 font-bold text-sm">
                <button onClick={() => setActiveTab('settings')} className={`px-4 py-2 border-b-2 transition-colors ${activeTab === 'settings' ? 'border-amber-600 text-amber-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>General Settings</button>
                <button onClick={() => setActiveTab('service')} className={`px-4 py-2 border-b-2 transition-colors ${activeTab === 'service' ? 'border-amber-600 text-amber-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>Services (What We Offer)</button>
                <button onClick={() => setActiveTab('whyChoose')} className={`px-4 py-2 border-b-2 transition-colors ${activeTab === 'whyChoose' ? 'border-amber-600 text-amber-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>Why Choose Us</button>
                <button onClick={() => setActiveTab('value')} className={`px-4 py-2 border-b-2 transition-colors ${activeTab === 'value' ? 'border-amber-600 text-amber-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>Core Values</button>
            </div>

            {activeTab === 'settings' && (
                <form onSubmit={handleSettingsSubmit} className="space-y-6 bg-white p-6 rounded-xl border">
                    <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Sacred Journey</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <input className="p-2 border rounded" placeholder="e.g. SACRED JOURNEY" value={formSettings.journeyBadge} onChange={e=>setFormSettings({...formSettings, journeyBadge: e.target.value})} />
                        <input className="p-2 border rounded" placeholder="e.g. Our Path of Enlightened Wisdom" value={formSettings.journeyTitle} onChange={e=>setFormSettings({...formSettings, journeyTitle: e.target.value})} />
                        <input className="p-2 border rounded" placeholder="Experience Years (e.g., 20+)" value={formSettings.journeyExpYears} onChange={e=>setFormSettings({...formSettings, journeyExpYears: e.target.value})} />
                        <div className="col-span-2">
                             <label className="text-sm font-bold text-gray-600 mb-1 block">Journey Description — Paragraph 1 (HTML)</label>
                             <RichTextEditor 
                                 value={formSettings.journeyDesc1} 
                                 onChange={(content) => setFormSettings({...formSettings, journeyDesc1: content})} 
                                 placeholder="First paragraph of the journey description..."
                             />
                        </div>
                        <div className="col-span-2">
                             <label className="text-sm font-bold text-gray-600 mb-1 block">Journey Description — Paragraph 2 (HTML)</label>
                             <RichTextEditor 
                                 value={formSettings.journeyDesc2} 
                                 onChange={(content) => setFormSettings({...formSettings, journeyDesc2: content})} 
                                 placeholder="Second paragraph of the journey description..."
                             />
                        </div>
                        
                        <div className="col-span-2 mt-2">
                            <label className="text-sm font-bold text-gray-600 mb-2 block">Journey Features</label>
                            <div className="grid grid-cols-2 gap-2">
                                {formSettings.journeyFeatures.map((feat, idx) => (
                                    <div key={idx} className="flex gap-2">
                                        <input className="p-2 border rounded w-full" value={feat} onChange={e=>handleFeatureChange(idx, e.target.value)} />
                                        <button type="button" onClick={() => setFormSettings({...formSettings, journeyFeatures: formSettings.journeyFeatures.filter((_, i) => i !== idx)})} className="p-2 bg-red-50 text-red-500 rounded"><Trash2 className="w-4 h-4" /></button>
                                    </div>
                                ))}
                                <button type="button" onClick={() => setFormSettings({...formSettings, journeyFeatures: [...formSettings.journeyFeatures, '']})} className="p-2 bg-gray-50 text-gray-600 border rounded flex justify-center items-center"><Plus className="w-4 h-4" /></button>
                            </div>
                        </div>
                    </div>

                    <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2 mt-6">Section Headers</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <input className="p-2 border rounded" placeholder="Offer Badge (e.g. WHAT WE DO)" value={formSettings.offerBadge} onChange={e=>setFormSettings({...formSettings, offerBadge: e.target.value})} />
                        <input className="p-2 border rounded" placeholder="Offer Title (e.g. Sacred Services)" value={formSettings.offerTitle} onChange={e=>setFormSettings({...formSettings, offerTitle: e.target.value})} />
                        
                        <input className="p-2 border rounded" placeholder="Why Choose Badge" value={formSettings.whyChooseBadge} onChange={e=>setFormSettings({...formSettings, whyChooseBadge: e.target.value})} />
                        <input className="p-2 border rounded" placeholder="Why Choose Title" value={formSettings.whyChooseTitle} onChange={e=>setFormSettings({...formSettings, whyChooseTitle: e.target.value})} />
                        
                        <input className="p-2 border rounded" placeholder="Values Title (e.g. Our Core Principles)" value={formSettings.valuesTitle} onChange={e=>setFormSettings({...formSettings, valuesTitle: e.target.value})} />
                        
                        <input className="p-2 border rounded" placeholder="Testimonial Badge" value={formSettings.testimonialBadge} onChange={e=>setFormSettings({...formSettings, testimonialBadge: e.target.value})} />
                        <input className="p-2 border rounded" placeholder="Testimonial Title" value={formSettings.testimonialTitle} onChange={e=>setFormSettings({...formSettings, testimonialTitle: e.target.value})} />
                    </div>

                    <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2 mt-6">Belief Section</h2>
                    <div className="mb-4">
                        <label className="text-sm font-bold text-gray-600 mb-1 block">Philosophy / Belief Text (HTML)</label>
                        <RichTextEditor 
                            value={formSettings.beliefText} 
                            onChange={(content) => setFormSettings({...formSettings, beliefText: content})} 
                            placeholder="Describe the core belief or philosophy..."
                        />
                    </div>

                    <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2 mt-6">CTA Section</h2>
                    <div className="grid grid-cols-3 gap-4 mb-2">
                        <input className="p-2 border rounded" placeholder="Part 1 (e.g. Ready to)" value={formSettings.ctaTitle1} onChange={e=>setFormSettings({...formSettings, ctaTitle1: e.target.value})} />
                        <input className="p-2 border rounded" placeholder="Highlight (e.g. Transform)" value={formSettings.ctaHighlight} onChange={e=>setFormSettings({...formSettings, ctaHighlight: e.target.value})} />
                        <input className="p-2 border rounded" placeholder="Part 2 (e.g. Your Life?)" value={formSettings.ctaTitle2} onChange={e=>setFormSettings({...formSettings, ctaTitle2: e.target.value})} />
                    </div>
                    <div className="mt-4">
                        <label className="text-sm font-bold text-gray-600 mb-1 block">CTA Description (HTML)</label>
                        <RichTextEditor 
                            value={formSettings.ctaDesc} 
                            onChange={(content) => setFormSettings({...formSettings, ctaDesc: content})} 
                            placeholder="Write a compelling call to action description..."
                        />
                    </div>

                    <button type="submit" className="w-full bg-amber-600 text-white font-bold py-3 pt-3 mt-4 rounded-xl flex justify-center items-center gap-2 hover:bg-amber-700">
                        <Save className="w-5 h-5" /> Save General Settings
                    </button>
                </form>
            )}

            {activeTab !== 'settings' && <ItemsManager tag={activeTab} />}
        </div>
    );
}

function ItemsManager({ tag }) {
    const { data: items, isLoading } = useGetAboutPageItemsQuery(tag);
    const [createItem] = useCreateAboutPageItemMutation();
    const [updateItem] = useUpdateAboutPageItemMutation();
    const [deleteItem] = useDeleteAboutPageItemMutation();
    
    const [form, setForm] = useState({ title: '', description: '', icon: '', image: '', color: '', items: [], isActive: true, order: 0 });
    const [imageFile, setImageFile] = useState(null);
    const [editId, setEditId] = useState(null);
    const [viewData, setViewData] = useState(null);

    const resetForm = () => {
        setForm({ title: '', description: '', icon: '', image: '', color: '', items: [], isActive: true, order: 0 });
        setImageFile(null);
        setEditId(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('title', form.title);
            formData.append('description', form.description);
            formData.append('icon', form.icon);
            formData.append('color', form.color);
            formData.append('isActive', form.isActive);
            formData.append('order', form.order);
            form.items.forEach((item) => formData.append('items[]', item));
            
            if (imageFile) {
                formData.append('image', imageFile);
            } else if (form.image) {
                formData.append('image', form.image);
            }

            if (editId) {
                await updateItem({ id: editId, ...Object.fromEntries(formData), image: imageFile || form.image, items: form.items, formData }).unwrap();
            } else {
                await createItem(formData).unwrap();
            }
            toast.success('Saved!');
            resetForm();
        } catch (error) { toast.error('Error saving'); }
    };

    const handleEdit = (it) => { setForm(it); setImageFile(null); setEditId(it._id); };
    const handleDelete = async (id) => { if (window.confirm('Delete?')) await deleteItem(id).unwrap(); };
    const toggleActive = async (it) => {
        const formData = new FormData();
        formData.append('isActive', !it.isActive);
        await updateItem({ id: it._id, formData }).unwrap();
    };

    const renderFormHelp = () => {
        if (tag === 'service') return 'Uses: Title, Image upload, Color, Items array.';
        return 'Uses: Title, Description, Icon text (e.g. Heart, Award).';
    };

    if (isLoading) return <div>Loading items...</div>;

    return (
        <div className="space-y-6">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl border space-y-4">
                <h3 className="font-bold border-b pb-2">{editId ? 'Edit Item' : 'Add New Item'} <span className="text-xs text-gray-400 font-normal ml-2">({renderFormHelp()})</span></h3>
                <div className="grid grid-cols-2 gap-4">
                    <input className="p-2 border rounded" placeholder="Title" value={form.title} onChange={e=>setForm({...form, title: e.target.value})} required/>
                    <input className="p-2 border rounded" placeholder="Order (number)" type="number" value={form.order} onChange={e=>setForm({...form, order: Number(e.target.value)})} />
                    
                    {tag === 'service' && <input className="p-2 border rounded" type="file" accept="image/*" onChange={e=>setImageFile(e.target.files[0])} />}
                    {(tag === 'whyChoose' || tag === 'value') && <input className="p-2 border rounded" placeholder="Lucide Icon Name" value={form.icon} onChange={e=>setForm({...form, icon: e.target.value})} />}
                    {(tag === 'whyChoose' || tag === 'value') && (
                        <div className="col-span-2">
                             <label className="text-sm font-bold text-gray-600 mb-1 block">Description (HTML)</label>
                             <RichTextEditor 
                                 value={form.description} 
                                 onChange={(content) => setForm({...form, description: content})} 
                                 placeholder="Enter detailed description..."
                             />
                        </div>
                    )}
                    {tag === 'service' && <input className="p-2 border rounded w-full" placeholder="Color Gradient (e.g. from-orange-500 to-red-600)" value={form.color} onChange={e=>setForm({...form, color: e.target.value})} />}
                    {tag === 'service' && (
                        <div className="col-span-2">
                            <label className="text-sm font-bold mb-1 block">Service Items</label>
                            {form.items.map((it, idx) => (
                                <div key={idx} className="flex gap-2 mb-2">
                                    <input className="p-2 border rounded w-full" value={it} onChange={e=>{
                                        const newArr = [...form.items]; newArr[idx] = e.target.value; setForm({...form, items: newArr});
                                    }} />
                                    <button type="button" onClick={() => setForm({...form, items: form.items.filter((_, i) => i !== idx)})} className="p-2 bg-red-50 text-red-500 rounded"><Trash2 className="w-4 h-4" /></button>
                                </div>
                            ))}
                            <button type="button" onClick={() => setForm({...form, items: [...form.items, '']})} className="p-2 bg-gray-50 text-gray-600 border rounded flex text-xs">Add Item +</button>
                        </div>
                    )}
                    <label className="flex items-center gap-2 col-span-2 text-sm font-bold"><input type="checkbox" checked={form.isActive} onChange={e=>setForm({...form, isActive: e.target.checked})}/> Is Active</label>
                </div>
                <div className="flex gap-2 justify-end">
                    {editId && <button type="button" onClick={resetForm} className="px-4 py-2 border rounded">Cancel</button>}
                    <button type="submit" className="bg-amber-600 text-white px-4 py-2 rounded flex items-center gap-2"><Save className="w-4 h-4"/> Save Item</button>
                </div>
            </form>

            <div className="bg-white rounded-xl border overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="p-4">S.No</th>
                            {tag === 'service' && <th className="p-4">Image</th>}
                            <th className="p-4">Title</th>
                            {tag === 'service' ? <th className="p-4">Items Count</th> : <th className="p-4">Description</th>}
                            <th className="p-4">Order</th>
                            <th className="p-4">Active</th>
                            <th className="p-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {items?.map((it, idx) => (
                            <tr key={it._id} className="hover:bg-gray-50">
                                <td className="p-4 text-gray-500">{idx + 1}</td>
                                {tag === 'service' && (
                                    <td className="p-4">
                                        {it.image ? (
                                            <img
                                                src={getImageUrl(it.image)}
                                                alt={it.title}
                                                className="w-12 h-12 object-cover rounded-md shadow-sm"
                                            />
                                        ) : (
                                            <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center text-xs text-gray-400">None</div>
                                        )}
                                    </td>
                                )}
                                <td className="p-4 font-bold">{it.title}</td>
                                {tag === 'service' ? <td className="p-4">{it.items.length} items</td> : <td className="p-4 truncate max-w-[200px] text-gray-500">{it.description}</td>}
                                <td className="p-4 text-center">{it.order}</td>
                                <td className="p-4">
                                    <button onClick={() => toggleActive(it)} className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${it.isActive ? 'bg-amber-500' : 'bg-gray-300'}`}>
                                        <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${it.isActive ? 'translate-x-5' : 'translate-x-1'}`} />
                                    </button>
                                </td>
                                <td className="p-4 flex justify-center gap-2">
                                    <button onClick={() => setViewData(it)} className="p-1.5 bg-blue-50 text-blue-600 rounded hover:bg-blue-100"><Eye className="w-4 h-4"/></button>
                                    <button onClick={() => handleEdit(it)} className="p-1.5 bg-amber-50 text-amber-600 rounded hover:bg-amber-100"><Edit className="w-4 h-4"/></button>
                                    <button onClick={() => handleDelete(it._id)} className="p-1.5 bg-red-50 text-red-600 rounded hover:bg-red-100"><Trash2 className="w-4 h-4"/></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {viewData && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
                        {tag === 'service' && viewData.image && (
                            <div className="relative w-full h-48 bg-gray-100 shrink-0">
                                <img
                                    src={getImageUrl(viewData.image)}
                                    alt={viewData.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                                <h3 className="absolute bottom-4 left-4 font-bold text-2xl text-white">{viewData.title}</h3>
                                <button onClick={() => setViewData(null)} className="absolute top-4 right-4 p-1.5 bg-black/40 hover:bg-black/60 text-white rounded-full transition-colors"><X className="w-5 h-5"/></button>
                            </div>
                        )}
                        
                        <div className="p-6 overflow-y-auto">
                            {(!tag || tag !== 'service' || !viewData.image) && (
                                <div className="flex justify-between items-center border-b border-gray-100 pb-3 mb-4">
                                    <h3 className="font-bold text-xl text-gray-800">{viewData.title}</h3>
                                    <button onClick={() => setViewData(null)} className="p-1 hover:bg-gray-100 text-gray-500 rounded-full transition-colors"><X className="w-5 h-5"/></button>
                                </div>
                            )}

                            <div className="space-y-4 text-sm text-gray-600">
                                {tag !== 'service' && (
                                    <div className="bg-amber-50 rounded-xl p-4 border border-amber-100 flex items-center gap-4">
                                        <div className="bg-white p-2.5 rounded-lg text-amber-600 shadow-sm border border-amber-50">
                                            <span className="font-mono font-bold text-lg">{viewData.icon || 'No Icon'}</span>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-amber-600/70 font-bold uppercase tracking-wider mb-0.5">Assigned Icon</p>
                                            <p className="font-semibold text-amber-900">{viewData.icon}</p>
                                        </div>
                                    </div>
                                )}
                                
                                {viewData.description && (
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Description text</p>
                                        <p className="text-gray-700 leading-relaxed bg-gray-50 p-3.5 rounded-xl border border-gray-100">{viewData.description}</p>
                                    </div>
                                )}
                                
                                {tag === 'service' && viewData.items?.length > 0 && (
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                                            Provided Services <span className="bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full text-[10px]">{viewData.items.length}</span>
                                        </p>
                                        <ul className="grid grid-cols-1 gap-2">
                                            {viewData.items.map((i, idx) => (
                                                <li key={idx} className="flex items-center gap-2.5 bg-gray-50/50 hover:bg-gray-50 p-2.5 rounded-lg border border-gray-100 transition-colors">
                                                    <div className="bg-amber-100 p-1 rounded">
                                                        <Check className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                                                    </div>
                                                    <span className="text-gray-700 font-medium">{i}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                
                                <div className="flex items-center gap-4 pt-2 mt-4">
                                    <div className="flex-1 bg-gray-50 p-3 rounded-xl border border-gray-100 flex flex-col gap-1.5">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Visibility Status</p>
                                        <div className="flex items-center gap-2">
                                            <span className="relative flex h-2.5 w-2.5">
                                              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${viewData.isActive ? 'bg-green-400' : 'bg-red-400'}`}></span>
                                              <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${viewData.isActive ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                            </span>
                                            <span className="font-semibold text-gray-800">{viewData.isActive ? 'Currently Active' : 'Hidden'}</span>
                                        </div>
                                    </div>
                                    <div className="flex-1 bg-gray-50 p-3 rounded-xl border border-gray-100 flex flex-col gap-1.5">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Layout Order</p>
                                        <span className="font-bold text-gray-800 text-base">#{viewData.order}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end shrink-0">
                            <button onClick={() => setViewData(null)} className="px-6 py-2.5 bg-white border border-gray-200 hover:bg-gray-100 hover:text-gray-900 text-gray-700 font-bold rounded-xl transition-all shadow-sm">Close Details</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
