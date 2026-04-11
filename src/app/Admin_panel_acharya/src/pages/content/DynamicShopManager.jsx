import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    useGetShopDataQuery,
    useGetShopOverviewQuery,
    useUpdateShopContentMutation,
    useUpdateShopStatusMutation,
    useAddCategoryMutation,
    useAddProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
    useDeleteCategoryMutation,
    useSeedShopMutation,
    useSeedAllShopsMutation
} from '../../../../../services/dynamicShopApi';
import { toast } from 'react-toastify';
import { BACKEND_URL } from '../../../../../config/apiConfig';
import {
    FiPlus, FiEdit2, FiTrash2, FiSave, FiX, FiDatabase, FiRefreshCw,
    FiChevronDown, FiChevronUp, FiEye, FiShoppingBag, FiCheckCircle
} from 'react-icons/fi';

const SHOP_PAGES = [
    { id: 'puja-samagri', label: 'Puja Samagri' },
    { id: 'gemstones', label: 'Gemstones' },
    { id: 'yantra', label: 'Yantra' },
    { id: 'rudraksha', label: 'Rudraksha' },
    { id: 'spiritual-items', label: 'Spiritual Items' }
];

const SectionHeader = ({ title, section, count, expandedSection, toggleSection }) => (
    <button onClick={() => toggleSection(section)} className={`w-full flex items-center justify-between p-4 rounded-xl transition-all border ${expandedSection === section ? 'bg-indigo-600 text-white shadow-lg border-indigo-600' : 'bg-gray-50 text-gray-700 border-gray-100 hover:bg-gray-100'}`}>
        <span className="font-black uppercase tracking-widest text-xs flex items-center gap-2">
            {title}
            {count !== undefined && <span className={`text-[10px] px-2 py-0.5 rounded-full font-black ${expandedSection === section ? 'bg-white/20 text-white' : 'bg-indigo-100 text-indigo-700'}`}>{count}</span>}
        </span>
        {expandedSection === section ? <FiChevronUp /> : <FiChevronDown />}
    </button>
);

const InputField = ({ label, value, onChange, placeholder, textarea }) => (
    <div className="space-y-1.5">
        <label className="block text-[10px] font-black text-gray-700 uppercase tracking-widest ml-1">{label}</label>
        {textarea ? (
            <textarea className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all shadow-sm" rows="3" value={value || ''} onChange={e => onChange(e.target.value)} placeholder={placeholder} />
        ) : (
            <input className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all shadow-sm" value={value || ''} onChange={e => onChange(e.target.value)} placeholder={placeholder} />
        )}
    </div>
);

const DynamicShopManager = () => {
    const { shopType: urlShopType } = useParams();
    const navigate = useNavigate();
    const selectedSlug = urlShopType || 'puja-samagri';

    const { data: shopResponse, isLoading } = useGetShopDataQuery(selectedSlug, { pollingInterval: 3000 });
    const { data: overviewResponse } = useGetShopOverviewQuery(undefined, { pollingInterval: 3000 });

    const [updateContent] = useUpdateShopContentMutation();
    const [updateStatus] = useUpdateShopStatusMutation();
    const [addCategory] = useAddCategoryMutation();
    const [deleteCategory] = useDeleteCategoryMutation();
    const [addProduct] = useAddProductMutation();
    const [updateProduct] = useUpdateProductMutation();
    const [deleteProduct] = useDeleteProductMutation();
    const [seedAll, { isLoading: isSeeding }] = useSeedAllShopsMutation();

    const [form, setForm] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [expandedSection, setExpandedSection] = useState('branding');
    const [viewData, setViewData] = useState(null);

    // Modal States
    const [prodForm, setProdForm] = useState({ name: '', slug: '', price: '', category: '', description: '', imageAlt: '' });
    const [prodImage, setProdImage] = useState(null);
    const [editingProductId, setEditingProductId] = useState(null);

    useEffect(() => {
        if (shopResponse?.data?.content) {
            setForm(JSON.parse(JSON.stringify(shopResponse.data.content)));
        }
    }, [shopResponse]);

    const toggleSection = (s) => setExpandedSection(expandedSection === s ? '' : s);

    const handleSave = async () => {
        try {
            await updateContent({ shopType: selectedSlug, data: form }).unwrap();
            toast.success('✨ Shop portal saved successfully!');
            setIsEditing(false);
        } catch (err) { toast.error('❌ Failed to save'); }
    };

    const handleToggleStatus = async (type, currentStatus) => {
        try {
            await updateStatus({ shopType: type, isActive: !currentStatus }).unwrap();
            toast.success(`✨ Portal ${!currentStatus ? 'Activated' : 'Deactivated'}`);
        } catch (err) { toast.error('❌ Status toggle failed'); }
    };

    const handleSeed = async () => {
        try {
            await seedAll().unwrap();
            toast.success('🌱 All Portals Seeded Successfully!');
        } catch (err) {
            toast.error('❌ Global seed failed');
        }
    };

    const handleSaveProduct = async () => {
        try {
            const formData = new FormData();
            Object.keys(prodForm).forEach(k => formData.append(k, prodForm[k]));
            if (prodImage) formData.append('image', prodImage);

            if (editingProductId) {
                await updateProduct({ id: editingProductId, data: formData }).unwrap();
                toast.success('✨ Product updated!');
            } else {
                await addProduct({ shopType: selectedSlug, data: formData }).unwrap();
                toast.success('✨ Product added!');
            }

            setProdForm({ name: '', slug: '', price: '', category: '', description: '', imageAlt: '' });
            setProdImage(null);
            setEditingProductId(null);
        } catch (err) { toast.error('❌ Failed to save product'); }
    };

    const handleEditProduct = (prod) => {
        setProdForm({
            name: prod.name || '',
            slug: prod.slug || '',
            price: prod.price || '',
            category: prod.category || '',
            description: prod.description || '',
            imageAlt: prod.imageAlt || ''
        });
        setEditingProductId(prod._id);
        setProdImage(null); // Clear previous file selection

        // Scroll to the product form securely
        window.scrollTo({ top: 400, behavior: 'smooth' });
    };

    const handleCancelEditProduct = () => {
        setProdForm({ name: '', slug: '', price: '', category: '', description: '', imageAlt: '' });
        setEditingProductId(null);
        setProdImage(null);
    };

    const handleDeleteProduct = async (id) => {
        if (window.confirm('Delete this artifact?')) {
            await deleteProduct(id).unwrap();
            toast.success('🗑️ Product removed');
        }
    };

    const handleKitImageUpload = async (file, index) => {
        if (!file) return;
        const formData = new FormData();
        formData.append('image', file);
        try {
            const token = localStorage.getItem('token') || localStorage.getItem('adminToken') || '';
            const res = await fetch(`${BACKEND_URL}/api/dynamic-shop/upload-image`, {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await res.json();
            if (data.success) {
                const arr = [...form.pujaKits];
                arr[index] = { ...arr[index], image: data.imageUrl };
                setForm({ ...form, pujaKits: arr });
                toast.success('✨ Image applied to kit!');
            } else {
                toast.error('❌ Upload failed: ' + (data.message || 'Unknown error'));
            }
        } catch (error) {
            toast.error('❌ Server error uploading image');
        }
    };

    const allPortals = overviewResponse?.data || [];
    const activePage = allPortals.find(p => p.shopType === selectedSlug);

    if (isLoading) return <div className="p-20 text-center font-black uppercase tracking-[0.3em] text-gray-300">Loading shop portals...</div>;

    return (
        <div className="p-6 max-w-6xl mx-auto">

            {/* Header - EXACT SAME as Screenshot */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Divine Shop <span className="text-orange-600">Manager</span></h1>
                    <p className="text-gray-500 mt-1 text-sm">Manage content for all spiritual commerce portals (Samagri, Gemstones, etc.)</p>
                </div>
                <div className="flex gap-2">
                    <button onClick={handleSeed} disabled={isSeeding} className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700 disabled:opacity-50 shadow-sm transition-all active:scale-95"><FiDatabase /> Seed Data</button>
                </div>
            </div>

            {/* Selector - EXACT SAME as Screenshot */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6">
                <label className="block text-xs font-black text-gray-600 uppercase tracking-wide mb-2">Select Page</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2">
                    {SHOP_PAGES.map(p => {
                        const data = allPortals.find(x => x.shopType === p.id);
                        return (
                            <button
                                key={p.id}
                                onClick={() => { navigate(`/admin-acharya/dashboard/content/shop/${p.id}`); setIsEditing(false); }}
                                className={`px-3 py-2.5 rounded-xl text-xs font-bold transition-all border ${selectedSlug === p.id ? 'bg-orange-600 text-white shadow-lg border-orange-600' : (data?.categoriesCount > 0 ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100' : 'bg-gray-50 text-gray-500 border border-gray-200 hover:bg-gray-100')}`}
                            >
                                {p.label}{data?.categoriesCount > 0 && ' ✓'}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Status Bar - EXACT SAME as Screenshot */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-6 flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-gray-800">{SHOP_PAGES.find(p => p.id === selectedSlug)?.label}</h2>
                    <p className="text-xs text-gray-500">{activePage?.content ? `Updated: ${new Date().toLocaleDateString()}` : 'No content established yet'}</p>
                </div>
                <div className="flex gap-2">
                    <button onClick={() => setIsEditing(!isEditing)} className="flex items-center gap-1.5 px-4 py-2 bg-orange-600 text-white rounded-lg text-xs font-bold shadow-sm">{isEditing ? <><FiX /> Close</> : <><FiEdit2 /> Edit</>}</button>
                    {activePage?.content && <button onClick={() => navigate('/admin-acharya/dashboard/content/shop/puja-samagri')} className="flex items-center gap-1.5 px-4 py-2 bg-[#fef2f2] text-red-600 rounded-lg text-xs font-bold hover:bg-red-100"><FiTrash2 /> Delete</button>}
                </div>
            </div>

            {isEditing && (
                <div className="bg-white rounded-2xl shadow-xl border border-indigo-100 mb-8 overflow-hidden animate-fade-in-up">
                    <div className="p-5 bg-gradient-to-r from-indigo-600 to-blue-600 text-white flex justify-between items-center">
                        <h3 className="font-bold text-lg uppercase tracking-tight">Editing: {SHOP_PAGES.find(p => p.id === selectedSlug)?.label}</h3>
                    </div>
                    <div className="p-5 space-y-4">
                        <SectionHeader title="✨ Hero Section" section="branding" expandedSection={expandedSection} toggleSection={toggleSection} />
                        {expandedSection === 'branding' && (
                            <div className="p-4 bg-gray-50 rounded-xl space-y-4 font-bold">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <InputField label="Hero Badge" value={form.heroBadge} onChange={v => setForm({ ...form, heroBadge: v })} />
                                    <div className="grid grid-cols-2 gap-2">
                                        <InputField label="H1 Start" value={form.heroTitleHighlight1} onChange={v => setForm({ ...form, heroTitleHighlight1: v })} />
                                        <InputField label="H1 End" value={form.heroTitleEnd} onChange={v => setForm({ ...form, heroTitleEnd: v })} />
                                    </div>
                                </div>
                                <InputField label="Description" value={form.heroSubtitle} onChange={v => setForm({ ...form, heroSubtitle: v })} textarea />
                            </div>
                        )}

                        <SectionHeader title="🛒 Portal Artifacts" section="inventory" count={shopResponse?.data?.products?.length} expandedSection={expandedSection} toggleSection={toggleSection} />
                        {expandedSection === 'inventory' && (
                            <div className="p-4 bg-gray-50 rounded-xl space-y-6">
                                {/* Direct Add Product Form */}
                                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                                    <div className="flex justify-between items-center border-b border-gray-50 pb-4">
                                        <h3 className="font-bold text-gray-800 uppercase ">{editingProductId ? 'Update' : 'Add'} <span className="text-orange-600">Product Entry</span></h3>
                                    </div>
                                    <div className="group p-6 border-2 border-dashed border-gray-100 rounded-2xl flex flex-col items-center justify-center bg-gray-50/50 hover:bg-white hover:border-emerald-200 transition-all cursor-crosshair relative min-h-[160px]">
                                        {prodImage ? (
                                            <>
                                                <img src={URL.createObjectURL(prodImage)} className="absolute inset-0 w-full h-full object-cover rounded-2xl opacity-40 group-hover:opacity-100 transition-opacity" />
                                                <div className="relative z-10 bg-white/90 backdrop-blur px-3 py-2 rounded-lg border border-gray-100 shadow-sm flex flex-col items-center gap-1 max-w-[80%]">
                                                    <FiCheckCircle className="text-emerald-500" />
                                                    <span className="text-[8px] font-black text-gray-800 uppercase truncate w-full text-center">{prodImage.name}</span>
                                                    <span className="text-[7px] text-gray-500 uppercase font-bold">Click to change</span>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <FiShoppingBag size={32} className="text-gray-300 mb-2 group-hover:text-emerald-500 transition-colors" />
                                                <span className="text-[9px] font-black text-gray-800 uppercase tracking-widest">UPLOAD PRODUCT IMAGE</span>
                                            </>
                                        )}
                                        <input type="file" onChange={e => setProdImage(e.target.files[0])} className="absolute inset-0 opacity-0 cursor-pointer" />
                                    </div>
                                    <div className="space-y-3">
                                        <InputField label="Name" value={prodForm.name} onChange={v => setProdForm({ ...prodForm, name: v })} placeholder="Enter Product Name" />
                                        <div className="grid grid-cols-2 gap-4">
                                            <InputField label="Price (₹)" value={prodForm.price} onChange={v => setProdForm({ ...prodForm, price: v })} placeholder="Enter Product Price" />
                                            <InputField label="Slug" value={prodForm.slug} onChange={v => setProdForm({ ...prodForm, slug: v })} placeholder="Enter Product Slug" />
                                        </div>
                                        <InputField label="SEO Image Alt" value={prodForm.imageAlt} onChange={v => setProdForm({ ...prodForm, imageAlt: v })} placeholder="Enter SEO Image Alt" />
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={handleSaveProduct} className="flex-1 py-4 bg-black text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-xl active:scale-95 ">{editingProductId ? 'Update Entry' : 'Establish Entry'}</button>
                                        {editingProductId && (
                                            <button onClick={handleCancelEditProduct} className="px-6 py-4 bg-gray-100 text-gray-600 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-gray-200 transition-all active:scale-95">Cancel</button>
                                        )}
                                    </div>
                                </div>

                                <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-gray-100">
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Inventory List</span>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {shopResponse?.data?.products?.map((prod) => (
                                        <div key={prod._id} className="bg-white p-3 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center group relative">
                                            <div className="aspect-square bg-gray-50 rounded-xl mb-3 overflow-hidden border border-gray-50 w-full">
                                                <img src={prod.image?.startsWith('http') ? prod.image : `${BACKEND_URL}${prod.image}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                                            </div>
                                            <p className="text-[10px] font-black uppercase text-gray-900 truncate w-full text-center">{prod.name}</p>
                                            <p className="text-emerald-600 text-xs font-black mt-1">₹{prod.price}</p>
                                            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
                                                <button onClick={() => handleEditProduct(prod)} className="p-1.5 bg-white text-indigo-500 rounded-lg shadow-sm hover:scale-110 transition-transform"><FiEdit2 size={14} /></button>
                                                <button onClick={() => handleDeleteProduct(prod._id)} className="p-1.5 bg-white text-red-500 rounded-lg shadow-sm hover:scale-110 transition-transform"><FiTrash2 size={14} /></button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <SectionHeader title="🛡️ Trust Badges" section="badges" count={form.trustBadges?.length} expandedSection={expandedSection} toggleSection={toggleSection} />
                        {expandedSection === 'badges' && (
                            <div className="p-4 bg-gray-50 rounded-xl space-y-4">
                                {form.trustBadges?.map((b, i) => (
                                    <div key={i} className="bg-white p-4 rounded-xl border border-gray-100 space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-[10px] font-bold text-gray-400 uppercase">Trust Badge {i + 1}</span>
                                            <button onClick={() => setForm({ ...form, trustBadges: form.trustBadges.filter((_, idx) => idx !== i) })} className="text-red-400 font-bold text-[10px] uppercase">Remove</button>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            <InputField label="Icon Name (Lucide)" value={b.iconName} onChange={v => { const arr = [...form.trustBadges]; arr[i] = { ...arr[i], iconName: v }; setForm({ ...form, trustBadges: arr }); }} />
                                            <InputField label="Title" value={b.title} onChange={v => { const arr = [...form.trustBadges]; arr[i] = { ...arr[i], title: v }; setForm({ ...form, trustBadges: arr }); }} />
                                        </div>
                                        <InputField label="Description" value={b.desc} onChange={v => { const arr = [...form.trustBadges]; arr[i] = { ...arr[i], desc: v }; setForm({ ...form, trustBadges: arr }); }} />
                                    </div>
                                ))}
                                <button onClick={() => setForm({ ...form, trustBadges: [...(form.trustBadges || []), { iconName: '', title: '', desc: '' }] })} className="text-orange-600 text-xs font-bold flex items-center gap-1 uppercase tracking-widest"><FiPlus /> Add Trust Badge</button>
                            </div>
                        )}

                        <SectionHeader title="💬 Testimonials" section="testimonials" count={form.testimonials?.length} expandedSection={expandedSection} toggleSection={toggleSection} />
                        {expandedSection === 'testimonials' && (
                            <div className="p-4 bg-gray-50 rounded-xl space-y-4">
                                {form.testimonials?.map((t, i) => (
                                    <div key={i} className="bg-white p-4 rounded-xl border border-gray-100 space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-[10px] font-bold text-gray-400 uppercase">Testimonial {i + 1}</span>
                                            <button onClick={() => setForm({ ...form, testimonials: form.testimonials.filter((_, idx) => idx !== i) })} className="text-red-400 font-bold text-[10px] uppercase">Remove</button>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            <InputField label="Devotee Name" value={t.name} onChange={v => { const arr = [...form.testimonials]; arr[i] = { ...arr[i], name: v }; setForm({ ...form, testimonials: arr }); }} />
                                            <InputField label="Date" value={t.date} onChange={v => { const arr = [...form.testimonials]; arr[i] = { ...arr[i], date: v }; setForm({ ...form, testimonials: arr }); }} />
                                        </div>
                                        <InputField label="Review Text" value={t.text} onChange={v => { const arr = [...form.testimonials]; arr[i] = { ...arr[i], text: v }; setForm({ ...form, testimonials: arr }); }} textarea />
                                    </div>
                                ))}
                                <button onClick={() => setForm({ ...form, testimonials: [...(form.testimonials || []), { name: '', text: '', date: '' }] })} className="text-orange-600 text-xs font-bold flex items-center gap-1 uppercase tracking-widest"><FiPlus /> Add Testimonial</button>
                            </div>
                        )}

                        <SectionHeader title="📞 Call To Action" section="cta" expandedSection={expandedSection} toggleSection={toggleSection} />
                        {expandedSection === 'cta' && (
                            <div className="p-4 bg-gray-50 rounded-xl space-y-4 font-bold">
                                <InputField label="CTA Badge" value={form.ctaBadge} onChange={v => setForm({ ...form, ctaBadge: v })} />
                                <InputField label="Heading" value={form.ctaHeading} onChange={v => setForm({ ...form, ctaHeading: v })} />
                                <InputField label="Subtitle" value={form.ctaSubtitle} onChange={v => setForm({ ...form, ctaSubtitle: v })} textarea />
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-white p-3 rounded-lg border border-gray-100 space-y-2">
                                        <p className="text-[10px] text-gray-400 uppercase tracking-widest">Button 1</p>
                                        <InputField label="Text" value={form.ctaButton1Text} onChange={v => setForm({ ...form, ctaButton1Text: v })} />
                                        <InputField label="Link" value={form.ctaButton1Link} onChange={v => setForm({ ...form, ctaButton1Link: v })} />
                                    </div>
                                    <div className="bg-white p-3 rounded-lg border border-gray-100 space-y-2">
                                        <p className="text-[10px] text-gray-400 uppercase tracking-widest">Button 2</p>
                                        <InputField label="Text" value={form.ctaButton2Text} onChange={v => setForm({ ...form, ctaButton2Text: v })} />
                                        <InputField label="Link" value={form.ctaButton2Link} onChange={v => setForm({ ...form, ctaButton2Link: v })} />
                                    </div>
                                </div>
                            </div>
                        )}

                        <SectionHeader title="💝 Sacred Kits" section="kits" count={form.pujaKits?.length} expandedSection={expandedSection} toggleSection={toggleSection} />
                        {expandedSection === 'kits' && (
                            <div className="p-4 bg-gray-50 rounded-xl space-y-4">
                                {form.pujaKits?.map((k, i) => (
                                    <div key={i} className="bg-white p-4 rounded-xl border border-gray-100 space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-[10px] font-bold text-gray-400 uppercase">Kit {i + 1}</span>
                                            <button onClick={() => setForm({ ...form, pujaKits: form.pujaKits.filter((_, idx) => idx !== i) })} className="text-red-400 font-bold text-[10px] uppercase">Remove</button>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            <InputField label="Kit Name" value={k.name} onChange={v => { const arr = [...form.pujaKits]; arr[i] = { ...arr[i], name: v }; setForm({ ...form, pujaKits: arr }); }} />
                                            <InputField label="Price (₹)" value={k.price} onChange={v => { const arr = [...form.pujaKits]; arr[i] = { ...arr[i], price: v }; setForm({ ...form, pujaKits: arr }); }} />
                                        </div>
                                        <div className="grid grid-cols-4 gap-4 items-center">
                                            <div className="col-span-3">
                                                <InputField label="Comma-separated Items" value={k.items?.join(', ') || ''} onChange={v => { const arr = [...form.pujaKits]; arr[i] = { ...arr[i], items: v.split(',').map(s => s.trim()) }; setForm({ ...form, pujaKits: arr }); }} />
                                            </div>
                                            <div className="col-span-1 border-2 border-dashed border-gray-200 rounded-xl relative min-h-[60px] flex flex-col items-center justify-center group overflow-hidden bg-gray-50/50 hover:bg-white hover:border-orange-200 transition-all cursor-pointer">
                                                {k.image ? (
                                                    <>
                                                        <img src={k.image.startsWith('http') ? k.image : `${BACKEND_URL}${k.image}`} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                                            <span className="text-[7px] font-black text-white uppercase tracking-tighter">Change Image</span>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <div className="flex flex-col items-center gap-1">
                                                        <FiPlus size={14} className="text-gray-400 group-hover:text-orange-600 transition-colors" />
                                                        <span className="text-[7px] font-black text-gray-800 uppercase tracking-widest text-center px-2">Upload Kit Image</span>
                                                    </div>
                                                )}
                                                <input type="file" onChange={e => handleKitImageUpload(e.target.files[0], i)} className="absolute inset-0 opacity-0 cursor-pointer" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <button onClick={() => setForm({ ...form, pujaKits: [...(form.pujaKits || []), { name: '', price: '', items: [], image: '' }] })} className="text-orange-600 text-xs font-bold flex items-center gap-1 uppercase tracking-widest"><FiPlus /> Add Sacred Kit</button>
                            </div>
                        )}

                        <SectionHeader title="❓ FAQ Management" section="faqs" count={form.faqs?.length} expandedSection={expandedSection} toggleSection={toggleSection} />
                        {expandedSection === 'faqs' && (

                            <div className="p-4 bg-gray-50 rounded-xl space-y-4">
                                <InputField label="FAQ Component Heading" value={form.faqHeading} onChange={v => setForm({ ...form, faqHeading: v })} />
                                {form.faqs?.map((f, i) => (
                                    <div key={i} className="bg-white p-4 rounded-xl border border-gray-100 space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-[10px] font-bold text-gray-400 uppercase">Artifact Q&A {i + 1}</span>
                                            <button onClick={() => setForm({ ...form, faqs: form.faqs.filter((_, idx) => idx !== i) })} className="text-red-400 font-bold text-[10px] uppercase">Remove</button>
                                        </div>
                                        <input className="w-full border border-gray-200 rounded-lg p-2 text-xs" value={f.question} onChange={e => {
                                            const arr = [...form.faqs]; arr[i] = { ...arr[i], question: e.target.value }; setForm({ ...form, faqs: arr });
                                        }} placeholder="Question" />
                                        <textarea className="w-full border border-gray-200 rounded-lg p-2 text-xs" rows="2" value={f.answer} onChange={e => {
                                            const arr = [...form.faqs]; arr[i] = { ...arr[i], answer: e.target.value }; setForm({ ...form, faqs: arr });
                                        }} placeholder="Answer" />
                                    </div>
                                ))}
                                <button onClick={() => setForm({ ...form, faqs: [...(form.faqs || []), { question: '', answer: '' }] })} className="text-orange-600 text-xs font-bold flex items-center gap-1 uppercase tracking-widest"><FiPlus /> Add Sacred Question</button>
                            </div>
                        )}
                    </div>
                    <div className="p-5 bg-gray-50 border-t flex justify-end gap-3 font-bold">
                        <button onClick={() => setIsEditing(false)} className="px-5 py-2.5 text-gray-600 text-sm hover:text-black">Cancel</button>
                        <button onClick={handleSave} className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-8 py-3 rounded-xl text-xs uppercase tracking-widest font-black shadow-lg shadow-indigo-500/30"><FiSave /> Save Content</button>
                    </div>
                </div>
            )}

            {/* Overview Table - EXACT SAME as Screenshot */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-12 animate-fade-in-up">
                <div className="p-5 border-b bg-gray-50">
                    <h3 className="font-bold text-gray-800 flex items-center gap-2 text-sm uppercase"><FiEye size={18} /> All Divine Portals Overview</h3>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1 italic">Green = has content, Gray = empty (use Seed to populate)</p>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                        <thead>
                            <tr className="bg-white border-b">
                                <th className="text-left px-5 py-4 font-bold text-gray-400 text-[10px] uppercase tracking-widest">Page Name</th>
                                <th className="text-center py-4 font-bold text-gray-400 text-[10px] uppercase tracking-widest">Collections</th>
                                <th className="text-center py-4 font-bold text-gray-400 text-[10px] uppercase tracking-widest">Artifacts</th>
                                <th className="text-center py-4 font-bold text-gray-400 text-[10px] uppercase tracking-widest">Branding</th>
                                <th className="text-center py-4 font-bold text-gray-400 text-[10px] uppercase tracking-widest">FAQs</th>
                                <th className="text-center py-4 font-bold text-gray-400 text-[10px] uppercase tracking-widest">Status</th>
                                <th className="text-right px-5 py-4 font-bold text-gray-400 text-[10px] uppercase tracking-widest">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allPortals.map((portal) => {
                                const label = SHOP_PAGES.find(p => p.id === portal.shopType)?.label || portal.shopType;
                                return (
                                    <tr key={portal.shopType} className={`border-b hover:bg-gray-50 transition-colors ${selectedSlug === portal.shopType ? 'bg-indigo-50/20' : ''}`}>
                                        <td className="px-5 py-4 font-bold text-gray-800 uppercase tracking-tight">{label}</td>
                                        <td className="text-center py-4">
                                            {portal.categoriesCount > 0 ? <span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full">{portal.categoriesCount}</span> : <span className="text-gray-200">—</span>}
                                        </td>
                                        <td className="text-center py-4">
                                            {portal.productsCount > 0 ? <span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full">{portal.productsCount}</span> : <span className="text-gray-200">—</span>}
                                        </td>
                                        <td className="text-center py-4">
                                            {portal.content ? <span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full">Sync</span> : <span className="text-gray-200">—</span>}
                                        </td>
                                        <td className="text-center py-4">
                                            {portal.faqsCount > 0 ? <span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full">{portal.faqsCount}</span> : <span className="text-gray-200">—</span>}
                                        </td>
                                        <td className="text-center py-4">
                                            <button
                                                onClick={() => handleToggleStatus(portal.shopType, portal.isActive)}
                                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300 ${portal.isActive ? 'bg-[#22c55e]' : 'bg-gray-300'}`}
                                            >
                                                <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-md transition-all duration-300 ${portal.isActive ? 'translate-x-6' : 'translate-x-1'}`} />
                                            </button>
                                        </td>
                                        <td className="text-right px-5 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <button onClick={() => setViewData(portal)} className="p-1.5 text-orange-600 hover:bg-orange-50 rounded-lg"><FiEye size={16} /></button>
                                                <button onClick={() => { navigate(`/admin-acharya/dashboard/content/shop/${portal.shopType}`); setIsEditing(true); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="p-1.5 text-[#6366f1] hover:bg-indigo-50 rounded-lg"><FiEdit2 size={16} /></button>
                                                <button className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"><FiTrash2 size={16} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Inspection Modal - Twin Logic */}
            {viewData && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-[2rem] shadow-2xl overflow-hidden flex flex-col animate-scale-in">
                        <div className="p-6 bg-gradient-to-r from-orange-600 to-red-600 text-white flex justify-between items-center">
                            <div>
                                <h2 className="text-xl font-black uppercase tracking-tight">{SHOP_PAGES.find(p => p.id === viewData.shopType)?.label} Details</h2>
                                <p className="text-xs opacity-80 uppercase font-bold tracking-widest mt-1 italic">Audit status active</p>
                            </div>
                            <button onClick={() => setViewData(null)} className="p-2 hover:bg-white/20 rounded-full transition-all"><FiX size={24} /></button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
                                    <h3 className="text-[10px] font-black text-indigo-700 uppercase mb-3 flex items-center gap-2 italic">🔍 Branding Hub</h3>
                                    <p className="text-sm font-bold text-gray-800 mb-2 uppercase tracking-tight underline decoration-indigo-200 underline-offset-4">{viewData.content?.heroTitleHighlight1} {viewData.content?.heroTitleEnd}</p>
                                    <p className="text-xs text-gray-600 italic">"{viewData.content?.heroSubtitle}"</p>
                                </div>
                                <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
                                    <h3 className="text-[10px] font-black text-emerald-700 uppercase mb-3 flex items-center gap-2 italic">📦 established metrics</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-white p-4 rounded-xl text-center shadow-sm">
                                            <p className="text-2xl font-black text-emerald-600 leading-none">{viewData.categoriesCount}</p>
                                            <p className="text-[8px] font-black text-gray-400 uppercase mt-1">Collections</p>
                                        </div>
                                        <div className="bg-white p-4 rounded-xl text-center shadow-sm">
                                            <p className="text-2xl font-black text-emerald-600 leading-none">{viewData.productsCount}</p>
                                            <p className="text-[8px] font-black text-gray-400 uppercase mt-1">Artifacts</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-6 bg-gray-50 border-t flex justify-end">
                            <button onClick={() => setViewData(null)} className="px-10 py-3 bg-black text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-gray-400/20 active:scale-95">Close Portal Inspector</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default DynamicShopManager;
