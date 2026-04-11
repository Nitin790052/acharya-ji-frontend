import React, { useState, useEffect } from 'react';
import {
    useGetAllHealingPagesQuery,
    useUpsertHealingPageMutation,
    useDeleteHealingPageMutation,
    useSeedHealingDataMutation,
    useForceSeedHealingDataMutation,
    useUpdateHealingPageStatusMutation
} from '../../../../../services/healingContentApi';
import { useGetNavbarItemsQuery } from '../../../../../services/navbarApi';
import { FiPlus, FiEdit2, FiTrash2, FiSave, FiX, FiDatabase, FiRefreshCw, FiChevronDown, FiChevronUp, FiEye } from 'react-icons/fi';

const DEFAULT_SLUGS = [
    { slug: 'reiki-healing', label: 'Reiki Healing' },
    { slug: 'crystal-healing', label: 'Crystal Healing' },
    { slug: 'chakra-balancing', label: 'Chakra Balancing' },
    { slug: 'aura-cleansing', label: 'Aura Cleansing' },
    { slug: 'meditation-guidance', label: 'Meditation Guidance' }
];

const emptyForm = {
    pageSlug: '',
    pageName: '',
    isActive: true,
    whatIsSection: {
        badge: 'Understanding Healing', title: 'What is', titleColored: 'Healing',
        description: '',
        items: [{ iconName: 'Zap', title: '', desc: '' }]
    },
    benefitsSection: {
        badge: 'Benefits', title: 'Benefits of', titleColored: 'Healing',
        benefits: [{ iconName: 'Brain', title: '', desc: '', colorClass: 'from-orange-500 to-red-600' }]
    },
    sessionsSection: {
        badge: 'Sessions', title: 'Types of', titleColored: 'Healing Sessions',
        sessions: [{ iconName: 'Globe', title: '', duration: '30 minutes', price: '₹999', desc: '', features: [''], colorClass: 'from-orange-500 to-red-600' }]
    },
    processSection: {
        badge: 'Process', title: 'How It', titleColored: 'Works',
        steps: [{ number: '01', iconName: 'Calendar', title: '', desc: '' }]
    },
    testimonialsSection: {
        badge: 'Testimonials', title: 'What Our', titleColored: 'Clients Say',
        reviews: [{ name: '', text: '', location: '', rating: 5 }]
    },
    faqSection: {
        badge: 'FAQ', title: 'Frequently Asked', titleColored: 'Questions',
        faqs: [{ question: '', answer: '' }]
    },
    ctaSection: {
        title: 'Begin Your', titleColored: 'Healing Journey Today',
        subtitle: '',
        buttons: [{ text: 'Start Healing', link: '/book-healing', iconName: 'Zap', btnClass: 'bg-[#E8453C]' }]
    }
};

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
        <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">{label}</label>
        {textarea ? (
            <textarea className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all shadow-sm" rows="3" value={value || ''} onChange={e => onChange(e.target.value)} placeholder={placeholder} />
        ) : (
            <input className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all shadow-sm" value={value || ''} onChange={e => onChange(e.target.value)} placeholder={placeholder} />
        )}
    </div>
);

const HealingPageManager = () => {
    const { data: allPages = [], isLoading } = useGetAllHealingPagesQuery();
    const { data: navItems = [] } = useGetNavbarItemsQuery();
    const [upsertPage] = useUpsertHealingPageMutation();
    const [deletePage] = useDeleteHealingPageMutation();
    const [seedData, { isLoading: isSeeding }] = useSeedHealingDataMutation();
    const [forceSeed, { isLoading: isForceSeeding }] = useForceSeedHealingDataMutation();
    const [updateStatus] = useUpdateHealingPageStatusMutation();

    const [selectedSlug, setSelectedSlug] = useState('reiki-healing');
    const [form, setForm] = useState(emptyForm);
    const [isEditing, setIsEditing] = useState(false);
    const [expandedSection, setExpandedSection] = useState('whatIs');
    const [toast, setToast] = useState('');
    const [viewData, setViewData] = useState(null);

    const dynamicSlugs = React.useMemo(() => {
        const unique = [];
        const seen = new Set();
        const addItem = (slug, label) => {
            if (!slug || seen.has(slug)) return;
            seen.add(slug);
            unique.push({ slug, label });
        };

        // 1. Pages already in database
        allPages.forEach(p => addItem(p.pageSlug, p.pageName));

        // 2. Default hardcoded slugs
        DEFAULT_SLUGS.forEach(d => addItem(d.slug, d.label));

        // 3. Extract items from Navbar (Healing sub-menu)
        const healingMenu = navItems.find(item => item.label === 'Healing');
        if (healingMenu && healingMenu.children) {
            healingMenu.children.forEach(child => {
                // Extract slug from href (e.g., /healing/chakra-balancing -> chakra-balancing)
                const slug = child.href.replace('/healing/', '').replace(/^\//, '');
                if (slug && slug !== '#') addItem(slug, child.label);
            });
        }

        return unique;
    }, [allPages, navItems]);

    useEffect(() => {
        const page = allPages.find(p => p.pageSlug === selectedSlug);
        if (page) {
            setForm(JSON.parse(JSON.stringify(page)));
        } else {
            const label = dynamicSlugs.find(s => s.slug === selectedSlug)?.label || 'New Healing Page';
            setForm({ ...emptyForm, pageSlug: selectedSlug, pageName: label });
        }
    }, [selectedSlug, allPages, dynamicSlugs]);

    const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };
    const toggleSection = (s) => setExpandedSection(expandedSection === s ? '' : s);

    const handleSave = async () => {
        try {
            await upsertPage(form).unwrap();
            showToast('✨ Healing page saved successfully!');
            setIsEditing(false);
        } catch (err) { showToast('❌ Failed to save'); }
    };

    const handleDelete = async (slug) => {
        if (window.confirm(`Delete content for "${dynamicSlugs.find(p => p.slug === slug)?.label}"?`)) {
            await deletePage(slug).unwrap();
            showToast('🗑️ Page content deleted');
        }
    };

    const handleToggleStatus = async (page) => {
        try {
            await updateStatus({ id: page.pageSlug, isActive: !page.isActive }).unwrap();
            showToast(`✨ Page ${page.isActive ? 'Deactivated' : 'Activated'}`);
        } catch (err) { showToast('❌ Status change failed'); }
    };

    const handleSeed = async () => { await seedData(dynamicSlugs).unwrap(); showToast('🌱 Default data seeded'); };
    const handleForceSeed = async () => { if (window.confirm('OVERWRITE all content?')) { await forceSeed(dynamicSlugs).unwrap(); showToast('🔄 All pages restored'); } };

    // Array helpers for nested sections
    const updateNested = (section, key, value) => {
        setForm({ ...form, [section]: { ...(form[section] || {}), [key]: value } });
    };

    const updateArrayField = (section, arrayKey, idx, field, value) => {
        const arr = [...(form[section]?.[arrayKey] || [])];
        arr[idx] = { ...arr[idx], [field]: value };
        setForm({ ...form, [section]: { ...(form[section] || {}), [arrayKey]: arr } });
    };

    const addArrayItem = (section, arrayKey, defaultItem) => {
        const arr = [...(form[section]?.[arrayKey] || []), defaultItem];
        setForm({ ...form, [section]: { ...(form[section] || {}), [arrayKey]: arr } });
    };

    const removeArrayItem = (section, arrayKey, idx) => {
        const arr = (form[section]?.[arrayKey] || []).filter((_, i) => i !== idx);
        setForm({ ...form, [section]: { ...(form[section] || {}), [arrayKey]: arr } });
    };

    // Feature array inside session
    const updateSessionFeature = (sessionIdx, featureIdx, value) => {
        const sessions = [...(form.sessionsSection?.sessions || [])];
        const features = [...(sessions[sessionIdx]?.features || [])];
        features[featureIdx] = value;
        sessions[sessionIdx] = { ...sessions[sessionIdx], features };
        setForm({ ...form, sessionsSection: { ...form.sessionsSection, sessions } });
    };

    const addSessionFeature = (sessionIdx) => {
        const sessions = [...(form.sessionsSection?.sessions || [])];
        const features = [...(sessions[sessionIdx]?.features || []), ''];
        sessions[sessionIdx] = { ...sessions[sessionIdx], features };
        setForm({ ...form, sessionsSection: { ...form.sessionsSection, sessions } });
    };

    const removeSessionFeature = (sessionIdx, featureIdx) => {
        const sessions = [...(form.sessionsSection?.sessions || [])];
        const features = (sessions[sessionIdx]?.features || []).filter((_, i) => i !== featureIdx);
        sessions[sessionIdx] = { ...sessions[sessionIdx], features };
        setForm({ ...form, sessionsSection: { ...form.sessionsSection, sessions } });
    };

    const existingPage = allPages.find(p => p.pageSlug === selectedSlug);

    if (isLoading) return <div className="p-20 text-center font-black uppercase tracking-[0.3em] text-gray-300">Loading Healing Pages...</div>;

    return (
        <div className="p-6 max-w-6xl mx-auto">
            {toast && <div className="fixed top-6 right-6 z-50 bg-white shadow-2xl border border-indigo-100 px-6 py-3 rounded-xl text-sm font-bold text-gray-800 animate-fade-in-up">{toast}</div>}

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Healing Pages <span className="text-orange-600">Manager</span></h1>
                    <p className="text-gray-500 mt-1 text-sm">Manage content for all healing service pages (Reiki, Crystal, etc.)</p>
                </div>
                <div className="flex gap-2">
                    <button onClick={handleSeed} disabled={isSeeding} className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700 disabled:opacity-50 shadow-sm transition-all active:scale-95"><FiDatabase /> Seed Missing</button>
                </div>
            </div>

            {/* Page Selector */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6">
                <label className="block text-xs font-black text-gray-600 uppercase tracking-wide mb-2">Select Page</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2">
                    {dynamicSlugs.map(p => (
                        <button key={p.slug} onClick={() => { setSelectedSlug(p.slug); setIsEditing(false); }} className={`px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${selectedSlug === p.slug ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/30' : allPages.find(x => x.pageSlug === p.slug) ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100' : 'bg-gray-50 text-gray-500 border border-gray-200 hover:bg-gray-100'}`}>{p.label}{allPages.find(x => x.pageSlug === p.slug) && ' ✓'}</button>
                    ))}
                </div>
            </div>

            {/* Status Bar */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-6 flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-gray-800">{dynamicSlugs.find(p => p.slug === selectedSlug)?.label}</h2>
                    <p className="text-xs text-gray-500">{existingPage ? `Updated: ${new Date(existingPage.updatedAt).toLocaleString()}` : 'No content yet'}</p>
                </div>
                <div className="flex gap-2">
                    <button onClick={() => setIsEditing(!isEditing)} className="flex items-center gap-1.5 px-4 py-2 bg-orange-600 text-white rounded-lg text-xs font-bold">{isEditing ? <><FiX /> Close</> : <><FiEdit2 /> Edit</>}</button>
                    {existingPage && <button onClick={() => handleDelete(selectedSlug)} className="flex items-center gap-1.5 px-4 py-2 bg-red-50 text-red-600 rounded-lg text-xs font-bold hover:bg-red-100"><FiTrash2 /> Delete</button>}
                </div>
            </div>

            {isEditing && (
                <div className="bg-white rounded-2xl shadow-xl border border-indigo-100 mb-8 overflow-hidden">
                    <div className="p-5 bg-gradient-to-r from-indigo-600 to-blue-600 text-white"><h3 className="font-bold text-lg">Editing: {form.pageName}</h3></div>
                    <div className="p-5 space-y-4">

                        {/* What Is Section */}
                        <SectionHeader title="✨ What Is Section" section="whatIs" count={form.whatIsSection?.items?.length} expandedSection={expandedSection} toggleSection={toggleSection} />
                        {expandedSection === 'whatIs' && (
                            <div className="p-4 bg-gray-50 rounded-xl space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <InputField label="Badge" value={form.whatIsSection?.badge} onChange={v => updateNested('whatIsSection', 'badge', v)} />
                                    <InputField label="Title" value={form.whatIsSection?.title} onChange={v => updateNested('whatIsSection', 'title', v)} />
                                    <InputField label="Title Colored" value={form.whatIsSection?.titleColored} onChange={v => updateNested('whatIsSection', 'titleColored', v)} />
                                </div>
                                <InputField label="Description" value={form.whatIsSection?.description} onChange={v => updateNested('whatIsSection', 'description', v)} textarea />
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Items</label>
                                    {form.whatIsSection?.items?.map((item, idx) => (
                                        <div key={idx} className="grid grid-cols-1 md:grid-cols-4 gap-3 bg-white p-3 rounded-lg border border-gray-100 items-end">
                                            <InputField label="Icon Name" value={item.iconName} onChange={v => updateArrayField('whatIsSection', 'items', idx, 'iconName', v)} placeholder="Zap, Shield, Heart..." />
                                            <InputField label="Title" value={item.title} onChange={v => updateArrayField('whatIsSection', 'items', idx, 'title', v)} />
                                            <InputField label="Description" value={item.desc} onChange={v => updateArrayField('whatIsSection', 'items', idx, 'desc', v)} />
                                            <button onClick={() => removeArrayItem('whatIsSection', 'items', idx)} className="text-red-500 hover:bg-red-50 p-2 rounded text-xs font-bold self-end">Remove</button>
                                        </div>
                                    ))}
                                    <button onClick={() => addArrayItem('whatIsSection', 'items', { iconName: 'Zap', title: '', desc: '' })} className="text-orange-600 text-xs font-bold flex items-center gap-1"><FiPlus /> Add Item</button>
                                </div>
                            </div>
                        )}

                        {/* Benefits Section */}
                        <SectionHeader title="💎 Benefits Section" section="benefits" count={form.benefitsSection?.benefits?.length} expandedSection={expandedSection} toggleSection={toggleSection} />
                        {expandedSection === 'benefits' && (
                            <div className="p-4 bg-gray-50 rounded-xl space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <InputField label="Badge" value={form.benefitsSection?.badge} onChange={v => updateNested('benefitsSection', 'badge', v)} />
                                    <InputField label="Title" value={form.benefitsSection?.title} onChange={v => updateNested('benefitsSection', 'title', v)} />
                                    <InputField label="Title Colored" value={form.benefitsSection?.titleColored} onChange={v => updateNested('benefitsSection', 'titleColored', v)} />
                                </div>
                                {form.benefitsSection?.benefits?.map((b, idx) => (
                                    <div key={idx} className="grid grid-cols-1 md:grid-cols-5 gap-3 bg-white p-3 rounded-lg border border-gray-100 items-end">
                                        <InputField label="Icon" value={b.iconName} onChange={v => updateArrayField('benefitsSection', 'benefits', idx, 'iconName', v)} placeholder="Brain, Heart..." />
                                        <InputField label="Title" value={b.title} onChange={v => updateArrayField('benefitsSection', 'benefits', idx, 'title', v)} />
                                        <InputField label="Description" value={b.desc} onChange={v => updateArrayField('benefitsSection', 'benefits', idx, 'desc', v)} />
                                        <InputField label="Color Class" value={b.colorClass} onChange={v => updateArrayField('benefitsSection', 'benefits', idx, 'colorClass', v)} placeholder="from-orange-500 to-red-600" />
                                        <button onClick={() => removeArrayItem('benefitsSection', 'benefits', idx)} className="text-red-500 hover:bg-red-50 p-2 rounded text-xs font-bold self-end">Remove</button>
                                    </div>
                                ))}
                                <button onClick={() => addArrayItem('benefitsSection', 'benefits', { iconName: 'Brain', title: '', desc: '', colorClass: 'from-orange-500 to-red-600' })} className="text-orange-600 text-xs font-bold flex items-center gap-1"><FiPlus /> Add Benefit</button>
                            </div>
                        )}

                        {/* Sessions Section */}
                        <SectionHeader title="📅 Sessions Section" section="sessions" count={form.sessionsSection?.sessions?.length} expandedSection={expandedSection} toggleSection={toggleSection} />
                        {expandedSection === 'sessions' && (
                            <div className="p-4 bg-gray-50 rounded-xl space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <InputField label="Badge" value={form.sessionsSection?.badge} onChange={v => updateNested('sessionsSection', 'badge', v)} />
                                    <InputField label="Title" value={form.sessionsSection?.title} onChange={v => updateNested('sessionsSection', 'title', v)} />
                                    <InputField label="Title Colored" value={form.sessionsSection?.titleColored} onChange={v => updateNested('sessionsSection', 'titleColored', v)} />
                                </div>
                                {form.sessionsSection?.sessions?.map((s, sIdx) => (
                                    <div key={sIdx} className="bg-white p-4 rounded-lg border border-gray-100 space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs font-black text-indigo-600 uppercase">Session {sIdx + 1}</span>
                                            <button onClick={() => removeArrayItem('sessionsSection', 'sessions', sIdx)} className="text-red-500 text-xs font-bold">✕ Remove</button>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                                            <InputField label="Icon" value={s.iconName} onChange={v => updateArrayField('sessionsSection', 'sessions', sIdx, 'iconName', v)} />
                                            <InputField label="Title" value={s.title} onChange={v => updateArrayField('sessionsSection', 'sessions', sIdx, 'title', v)} />
                                            <InputField label="Duration" value={s.duration} onChange={v => updateArrayField('sessionsSection', 'sessions', sIdx, 'duration', v)} />
                                            <InputField label="Price" value={s.price} onChange={v => updateArrayField('sessionsSection', 'sessions', sIdx, 'price', v)} />
                                            <InputField label="Color Class" value={s.colorClass} onChange={v => updateArrayField('sessionsSection', 'sessions', sIdx, 'colorClass', v)} />
                                        </div>
                                        <InputField label="Description" value={s.desc} onChange={v => updateArrayField('sessionsSection', 'sessions', sIdx, 'desc', v)} />
                                        <div>
                                            <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 ml-1">Features</label>
                                            {s.features?.map((f, fIdx) => (
                                                <div key={fIdx} className="flex gap-2 mb-2">
                                                    <input className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white" value={f} onChange={e => updateSessionFeature(sIdx, fIdx, e.target.value)} placeholder={`Feature ${fIdx + 1}`} />
                                                    <button onClick={() => removeSessionFeature(sIdx, fIdx)} className="text-red-400 hover:text-red-600 text-xs px-2">✕</button>
                                                </div>
                                            ))}
                                            <button onClick={() => addSessionFeature(sIdx)} className="text-orange-600 text-xs font-bold flex items-center gap-1"><FiPlus size={12} /> Add Feature</button>
                                        </div>
                                    </div>
                                ))}
                                <button onClick={() => addArrayItem('sessionsSection', 'sessions', { iconName: 'Globe', title: '', duration: '30 minutes', price: '₹999', desc: '', features: [''], colorClass: 'from-orange-500 to-red-600' })} className="w-full py-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 font-bold text-xs uppercase tracking-widest hover:bg-gray-50 flex items-center justify-center gap-2"><FiPlus /> Add Session</button>
                            </div>
                        )}

                        {/* Process Section */}
                        <SectionHeader title="⚙️ Process Section" section="process" count={form.processSection?.steps?.length} expandedSection={expandedSection} toggleSection={toggleSection} />
                        {expandedSection === 'process' && (
                            <div className="p-4 bg-gray-50 rounded-xl space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <InputField label="Badge" value={form.processSection?.badge} onChange={v => updateNested('processSection', 'badge', v)} />
                                    <InputField label="Title" value={form.processSection?.title} onChange={v => updateNested('processSection', 'title', v)} />
                                    <InputField label="Title Colored" value={form.processSection?.titleColored} onChange={v => updateNested('processSection', 'titleColored', v)} />
                                </div>
                                {form.processSection?.steps?.map((step, idx) => (
                                    <div key={idx} className="grid grid-cols-1 md:grid-cols-5 gap-3 bg-white p-3 rounded-lg border border-gray-100 items-end">
                                        <InputField label="Number" value={step.number} onChange={v => updateArrayField('processSection', 'steps', idx, 'number', v)} placeholder="01" />
                                        <InputField label="Icon" value={step.iconName} onChange={v => updateArrayField('processSection', 'steps', idx, 'iconName', v)} />
                                        <InputField label="Title" value={step.title} onChange={v => updateArrayField('processSection', 'steps', idx, 'title', v)} />
                                        <InputField label="Description" value={step.desc} onChange={v => updateArrayField('processSection', 'steps', idx, 'desc', v)} />
                                        <button onClick={() => removeArrayItem('processSection', 'steps', idx)} className="text-red-500 hover:bg-red-50 p-2 rounded text-xs font-bold self-end">Remove</button>
                                    </div>
                                ))}
                                <button onClick={() => addArrayItem('processSection', 'steps', { number: String(form.processSection?.steps?.length + 1 || 1).padStart(2, '0'), iconName: 'Calendar', title: '', desc: '' })} className="text-orange-600 text-xs font-bold flex items-center gap-1"><FiPlus /> Add Step</button>
                            </div>
                        )}

                        {/* Testimonials Section */}
                        <SectionHeader title="⭐ Testimonials" section="testimonials" count={form.testimonialsSection?.reviews?.length} expandedSection={expandedSection} toggleSection={toggleSection} />
                        {expandedSection === 'testimonials' && (
                            <div className="p-4 bg-gray-50 rounded-xl space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <InputField label="Badge" value={form.testimonialsSection?.badge} onChange={v => updateNested('testimonialsSection', 'badge', v)} />
                                    <InputField label="Title" value={form.testimonialsSection?.title} onChange={v => updateNested('testimonialsSection', 'title', v)} />
                                    <InputField label="Title Colored" value={form.testimonialsSection?.titleColored} onChange={v => updateNested('testimonialsSection', 'titleColored', v)} />
                                </div>
                                {form.testimonialsSection?.reviews?.map((r, idx) => (
                                    <div key={idx} className="bg-white p-3 rounded-lg border border-gray-100 space-y-2">
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                            <InputField label="Name" value={r.name} onChange={v => updateArrayField('testimonialsSection', 'reviews', idx, 'name', v)} />
                                            <InputField label="Location" value={r.location} onChange={v => updateArrayField('testimonialsSection', 'reviews', idx, 'location', v)} />
                                            <InputField label="Rating (1-5)" value={r.rating} onChange={v => updateArrayField('testimonialsSection', 'reviews', idx, 'rating', Number(v))} />
                                        </div>
                                        <div className="flex gap-2 items-start">
                                            <div className="flex-1"><InputField label="Review Text" value={r.text} onChange={v => updateArrayField('testimonialsSection', 'reviews', idx, 'text', v)} textarea /></div>
                                            <button onClick={() => removeArrayItem('testimonialsSection', 'reviews', idx)} className="text-red-500 mt-6 font-bold text-xs">✕</button>
                                        </div>
                                    </div>
                                ))}
                                <button onClick={() => addArrayItem('testimonialsSection', 'reviews', { name: '', text: '', location: '', rating: 5 })} className="text-orange-600 text-xs font-bold flex items-center gap-1"><FiPlus /> Add Review</button>
                            </div>
                        )}

                        {/* FAQ Section */}
                        <SectionHeader title="❓ FAQs" section="faqs" count={form.faqSection?.faqs?.length} expandedSection={expandedSection} toggleSection={toggleSection} />
                        {expandedSection === 'faqs' && (
                            <div className="p-4 bg-gray-50 rounded-xl space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <InputField label="Badge" value={form.faqSection?.badge} onChange={v => updateNested('faqSection', 'badge', v)} />
                                    <InputField label="Title" value={form.faqSection?.title} onChange={v => updateNested('faqSection', 'title', v)} />
                                    <InputField label="Title Colored" value={form.faqSection?.titleColored} onChange={v => updateNested('faqSection', 'titleColored', v)} />
                                </div>
                                {form.faqSection?.faqs?.map((faq, idx) => (
                                    <div key={idx} className="bg-white p-3 rounded-lg border border-gray-100 space-y-2">
                                        <div className="flex gap-2 items-center">
                                            <span className="text-xs font-bold text-orange-600 w-8">Q{idx + 1}</span>
                                            <input className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-50" value={faq.question} onChange={e => updateArrayField('faqSection', 'faqs', idx, 'question', e.target.value)} placeholder="Question" />
                                            <button onClick={() => removeArrayItem('faqSection', 'faqs', idx)} className="text-red-400 hover:text-red-600 text-xs px-2">✕</button>
                                        </div>
                                        <textarea className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-50 resize-none" rows="2" value={faq.answer} onChange={e => updateArrayField('faqSection', 'faqs', idx, 'answer', e.target.value)} placeholder="Answer..." />
                                    </div>
                                ))}
                                <button onClick={() => addArrayItem('faqSection', 'faqs', { question: '', answer: '' })} className="text-orange-600 text-xs font-bold flex items-center gap-1"><FiPlus /> Add FAQ</button>
                            </div>
                        )}

                        {/* CTA Section */}
                        <SectionHeader title="📢 CTA Section" section="cta" expandedSection={expandedSection} toggleSection={toggleSection} />
                        {expandedSection === 'cta' && (
                            <div className="p-4 bg-gray-50 rounded-xl space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <InputField label="Title" value={form.ctaSection?.title} onChange={v => updateNested('ctaSection', 'title', v)} />
                                    <InputField label="Title Colored" value={form.ctaSection?.titleColored} onChange={v => updateNested('ctaSection', 'titleColored', v)} />
                                </div>
                                <InputField label="Subtitle" value={form.ctaSection?.subtitle} onChange={v => updateNested('ctaSection', 'subtitle', v)} textarea />
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Buttons</label>
                                    {form.ctaSection?.buttons?.map((btn, idx) => (
                                        <div key={idx} className="grid grid-cols-1 md:grid-cols-5 gap-3 bg-white p-3 rounded-lg border border-gray-100 items-end">
                                            <InputField label="Text" value={btn.text} onChange={v => updateArrayField('ctaSection', 'buttons', idx, 'text', v)} />
                                            <InputField label="Link" value={btn.link} onChange={v => updateArrayField('ctaSection', 'buttons', idx, 'link', v)} />
                                            <InputField label="Icon" value={btn.iconName} onChange={v => updateArrayField('ctaSection', 'buttons', idx, 'iconName', v)} />
                                            <InputField label="Button Class" value={btn.btnClass} onChange={v => updateArrayField('ctaSection', 'buttons', idx, 'btnClass', v)} />
                                            <button onClick={() => removeArrayItem('ctaSection', 'buttons', idx)} className="text-red-500 hover:bg-red-50 p-2 rounded text-xs font-bold self-end">Remove</button>
                                        </div>
                                    ))}
                                    <button onClick={() => addArrayItem('ctaSection', 'buttons', { text: '', link: '/', iconName: 'Zap', btnClass: 'bg-[#E8453C]' })} className="text-orange-600 text-xs font-bold flex items-center gap-1"><FiPlus /> Add Button</button>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="p-5 bg-gray-50 border-t flex justify-end gap-3">
                        <button onClick={() => setIsEditing(false)} className="px-5 py-2.5 text-gray-600 text-sm font-bold">Cancel</button>
                        <button onClick={handleSave} className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-indigo-500/30"><FiSave /> Save Content</button>
                    </div>
                </div>
            )}

            {/* Data Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-5 border-b bg-gradient-to-r from-gray-50 to-white">
                    <h3 className="font-bold text-gray-800 flex items-center gap-2"><FiEye /> All Healing Pages Overview</h3>
                    <p className="text-xs text-gray-500 mt-1">Green = has content, Gray = empty (use Seed to populate)</p>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm table-fixed border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b">
                                <th className="w-[20%] text-left px-5 py-3 font-bold text-gray-600 text-xs uppercase tracking-wide">Page Name</th>
                                <th className="w-[10%] text-center px-2 py-3 font-bold text-gray-600 text-xs uppercase">What Is</th>
                                <th className="w-[10%] text-center px-2 py-3 font-bold text-gray-600 text-xs uppercase">Benefits</th>
                                <th className="w-[10%] text-center px-2 py-3 font-bold text-gray-600 text-xs uppercase">Sessions</th>
                                <th className="w-[10%] text-center px-2 py-3 font-bold text-gray-600 text-xs uppercase">Steps</th>
                                <th className="w-[10%] text-center px-2 py-3 font-bold text-gray-600 text-xs uppercase">Reviews</th>
                                <th className="w-[10%] text-center px-2 py-3 font-bold text-gray-600 text-xs uppercase">FAQs</th>
                                <th className="w-[10%] text-center px-2 py-3 font-bold text-gray-600 text-xs uppercase">Status</th>
                                <th className="w-[10%] text-right px-5 py-3 font-bold text-gray-600 text-xs uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dynamicSlugs.map(({ slug, label }) => {
                                const page = allPages.find(p => p.pageSlug === slug);
                                return (
                                    <tr key={slug} className={`border-b hover:bg-gray-50 transition-colors ${selectedSlug === slug ? 'bg-indigo-50/50' : ''}`}>
                                        <td className="px-5 py-3 font-bold text-gray-800 truncate" title={label}>{label}</td>
                                        <td className="text-center px-2 py-3">{page?.whatIsSection?.items?.length ? <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{page.whatIsSection.items.length}</span> : <span className="text-gray-300">—</span>}</td>
                                        <td className="text-center px-2 py-3">{page?.benefitsSection?.benefits?.length ? <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{page.benefitsSection.benefits.length}</span> : <span className="text-gray-300">—</span>}</td>
                                        <td className="text-center px-2 py-3">{page?.sessionsSection?.sessions?.length ? <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{page.sessionsSection.sessions.length}</span> : <span className="text-gray-300">—</span>}</td>
                                        <td className="text-center px-2 py-3">{page?.processSection?.steps?.length ? <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{page.processSection.steps.length}</span> : <span className="text-gray-300">—</span>}</td>
                                        <td className="text-center px-2 py-3">{page?.testimonialsSection?.reviews?.length ? <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{page.testimonialsSection.reviews.length}</span> : <span className="text-gray-300">—</span>}</td>
                                        <td className="text-center px-2 py-3">{page?.faqSection?.faqs?.length ? <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{page.faqSection.faqs.length}</span> : <span className="text-gray-300">—</span>}</td>
                                        <td className="text-center px-2 py-3">
                                            {page ? (
                                                <button onClick={() => handleToggleStatus(page)} className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300" style={{ backgroundColor: page.isActive !== false ? '#22c55e' : '#d1d5db' }}>
                                                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-md transition-transform duration-300 ${page.isActive !== false ? 'translate-x-6' : 'translate-x-1'}`} />
                                                </button>
                                            ) : <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded-full">Empty</span>}
                                        </td>
                                        <td className="text-right px-5 py-3">
                                            <div className="flex items-center justify-end gap-1">
                                                <button onClick={() => setViewData(page || { pageName: label, pageSlug: slug, status: 'No Content' })} className="p-1.5 text-orange-600 hover:bg-orange-50 rounded-lg" title="View Details"><FiEye size={14} /></button>
                                                <button onClick={() => { setSelectedSlug(slug); setIsEditing(true); }} className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg" title="Edit Content"><FiEdit2 size={14} /></button>
                                                {page && <button onClick={() => handleDelete(slug)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg" title="Delete Content"><FiTrash2 size={14} /></button>}
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* View Modal */}
            {viewData && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-[2rem] shadow-2xl overflow-hidden flex flex-col animate-scale-in">
                        <div className="p-6 bg-gradient-to-r from-orange-600 to-red-600 text-white flex justify-between items-center">
                            <div>
                                <h2 className="text-xl font-black uppercase tracking-tight">{viewData.pageName}</h2>
                                <p className="text-xs opacity-80 font-bold uppercase tracking-widest">Page Details Overview</p>
                            </div>
                            <button onClick={() => setViewData(null)} className="p-2 hover:bg-white/20 rounded-full transition-all"><FiX size={24} /></button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Left Column: Section Summaries */}
                                <div className="space-y-6">
                                    <div className="bg-orange-50 p-5 rounded-2xl border border-orange-100">
                                        <h3 className="text-xs font-black text-orange-700 uppercase mb-3 flex items-center gap-2">🔍 What is Section</h3>
                                        <p className="text-sm font-bold text-gray-800 mb-2">{viewData.whatIsSection?.title} {viewData.whatIsSection?.titleColored}</p>
                                        <p className="text-xs text-gray-600 leading-relaxed mb-4 italic">"{viewData.whatIsSection?.description}"</p>
                                        <div className="flex flex-wrap gap-2">
                                            {viewData.whatIsSection?.items?.map((it, i) => (
                                                <span key={i} className="text-[10px] font-black bg-white px-3 py-1.5 rounded-full border border-orange-200 text-orange-600">{it.title}</span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="bg-indigo-50 p-5 rounded-2xl border border-indigo-100">
                                        <h3 className="text-xs font-black text-indigo-700 uppercase mb-3 flex items-center gap-2">💎 Benefits</h3>
                                        <div className="grid grid-cols-2 gap-2">
                                            {viewData.benefitsSection?.benefits?.map((b, i) => (
                                                <div key={i} className="bg-white p-3 rounded-xl border border-indigo-100">
                                                    <p className="text-[10px] font-black text-indigo-800 uppercase mb-1">{b.title}</p>
                                                    <p className="text-[9px] text-gray-500 line-clamp-2">{b.desc}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column: Sessions & Process */}
                                <div className="space-y-6">
                                    <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-100">
                                        <h3 className="text-xs font-black text-emerald-700 uppercase mb-3 flex items-center gap-2">📅 Sessions</h3>
                                        <div className="space-y-3">
                                            {viewData.sessionsSection?.sessions?.map((s, i) => (
                                                <div key={i} className="bg-white p-3 rounded-xl border border-emerald-100 flex justify-between items-center">
                                                    <div>
                                                        <p className="text-[10px] font-black text-gray-800 uppercase">{s.title}</p>
                                                        <p className="text-[9px] text-emerald-600 font-bold">{s.duration} • {s.price}</p>
                                                    </div>
                                                    <div className="flex -space-x-1">
                                                        {s.features?.slice(0, 3).map((_, fi) => <div key={fi} className="w-1.5 h-1.5 rounded-full bg-emerald-400" />)}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="bg-amber-50 p-5 rounded-2xl border border-amber-100">
                                        <h3 className="text-xs font-black text-amber-700 uppercase mb-3 flex items-center gap-2">⚙️ Process</h3>
                                        <div className="flex flex-col gap-2">
                                            {viewData.processSection?.steps?.map((step, i) => (
                                                <div key={i} className="flex items-center gap-3">
                                                    <span className="w-5 h-5 rounded-full bg-amber-600 text-white text-[10px] font-black flex items-center justify-center flex-shrink-0">{step.number}</span>
                                                    <p className="text-[10px] font-bold text-gray-700 uppercase truncate">{step.title}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* FAQs Bottom Full Width */}
                            <div className="mt-8 pt-8 border-t border-gray-100">
                                <h3 className="text-xs font-black text-gray-400 uppercase mb-5 flex items-center gap-2 italic">❓ Frequently Asked Questions</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {viewData.faqSection?.faqs?.map((faq, i) => (
                                        <div key={i} className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                            <p className="text-[10px] font-black text-gray-900 uppercase mb-2">Q. {faq.question}</p>
                                            <p className="text-[11px] text-gray-600 leading-relaxed italic">A. {faq.answer}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="p-6 bg-gray-50 border-t flex justify-end">
                            <button onClick={() => setViewData(null)} className="px-8 py-3 bg-gray-900 text-white rounded-full text-xs font-black uppercase tracking-widest hover:bg-black transition-all shadow-xl">Close Preview</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HealingPageManager;
