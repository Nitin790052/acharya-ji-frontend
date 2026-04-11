import React, { useState, useEffect } from 'react';
import {
    useGetAllAstrologyPagesQuery,
    useUpsertAstrologyPageMutation,
    useDeleteAstrologyPageMutation,
    useSeedAstrologyDataMutation,
    useForceSeedAstrologyDataMutation
} from '../../../../../services/astrologyContentApi';
import { useGetNavbarItemsQuery } from '../../../../../services/navbarApi';
import { BACKEND_URL } from '../../../../../config/apiConfig';
import { FiPlus, FiEdit2, FiTrash2, FiSave, FiX, FiDatabase, FiRefreshCw, FiChevronDown, FiChevronUp, FiEye, FiImage } from 'react-icons/fi';

const DEFAULT_SLUGS = [
    { slug: 'career-astrology', label: 'Career Astrology' },
    { slug: 'marriage-astrology', label: 'Marriage Astrology' },
    { slug: 'business-astrology', label: 'Business Astrology' },
    { slug: 'health-astrology', label: 'Health Astrology' },
    { slug: 'numerology', label: 'Numerology' },
    { slug: 'tarot-reading', label: 'Tarot Reading' },
    { slug: 'palmistry', label: 'Palmistry' },
    { slug: 'gemstone-suggestion', label: 'Gemstone Suggestion' }
];

const emptyForm = {
    pageSlug: 'career-astrology',
    pageName: 'Career Astrology',
    hero: { badge: '', title: '', highlightedTitle: '', subtitle: '', imageUrl: '', imageAlt: '', buttonText: 'Consult Expert Now', buttonLink: '/astrologer' },
    features: [{ title: '', description: '', iconName: 'Star' }],
    deepDive: { badge: '', title: '', highlightedTitle: '', description: '', imageUrl: '', imageAlt: '', checklist: [''], statLabel: '', statValue: '', buttonText: '', buttonLink: '/astrologer' },
    steps: [{ number: '01', title: '', description: '' }],
    cta: { title: '', subtitle: '', buttonText: 'Book Your Session Now', buttonLink: '/astrologer' },
    faqs: [{ question: '', answer: '' }],
    isActive: true
};

const AstrologyContentManager = () => {
    const { data: allPages = [], isLoading, refetch } = useGetAllAstrologyPagesQuery();
    const { data: navItems = [] } = useGetNavbarItemsQuery();
    const [upsertPage] = useUpsertAstrologyPageMutation();
    const [deletePage] = useDeleteAstrologyPageMutation();
    const [seedData, { isLoading: isSeeding }] = useSeedAstrologyDataMutation();
    const [forceSeed, { isLoading: isForceSeeding }] = useForceSeedAstrologyDataMutation();

    const [selectedSlug, setSelectedSlug] = React.useState('career-astrology');
    const [form, setForm] = React.useState(emptyForm);
    const [isEditing, setIsEditing] = React.useState(false);
    const [viewData, setViewData] = React.useState(null);
    const [expandedSection, setExpandedSection] = React.useState('hero');
    const [toast, setToast] = React.useState('');

    // Dynamically derive page list from Navbar Services
    const dynamicSlugs = React.useMemo(() => {
        const servicesItem = navItems.find(item => item.title === 'Astrology Services' || item.label === 'Astrology Services');
        const navbarChildren = servicesItem?.children || [];

        const unique = [];
        const seen = new Set();

        const addToUnique = (label, path) => {
            if (!label) return;
            // Robust slug extraction: remove leading/trailing slashes, lowercase, trim
            const slug = (path || label)
                .replace(/^\/astrology\//, '')
                .replace(/^\//, '')
                .replace(/\/$/, '')
                .replace(/^#/, '')
                .toLowerCase()
                .replace(/ /g, '-')
                .trim();

            if (slug && slug.length > 1 && !seen.has(slug)) {
                seen.add(slug);
                unique.push({ slug, label: label.trim() });
            }
        };

        // 1. Navbar Items
        navbarChildren.forEach(item => addToUnique(item.title || item.label, item.path || item.href));
        // 2. Existing Pages
        allPages.forEach(p => addToUnique(p.pageName, p.pageSlug));
        // 3. Defaults
        DEFAULT_SLUGS.forEach(d => addToUnique(d.label, d.slug));

        return unique;
    }, [navItems, allPages]);

    // Local file states for upload
    const [heroImage, setHeroImage] = React.useState(null);
    const [deepDiveImage, setDeepDiveImage] = React.useState(null);

    // Stable fingerprint
    const dataFingerprint = allPages.map(p => p._id).join(',');

    useEffect(() => {
        const existing = allPages.find(p => p.pageSlug === selectedSlug);
        let nextForm;
        if (existing) {
            nextForm = JSON.parse(JSON.stringify(existing));
        } else {
            const label = dynamicSlugs.find(p => p.slug === selectedSlug)?.label || '';
            nextForm = { ...emptyForm, pageSlug: selectedSlug, pageName: label };
        }

        // Only update if something actually changed to avoid infinite loops
        if (JSON.stringify(form) !== JSON.stringify(nextForm)) {
            setForm(nextForm);
            setHeroImage(null);
            setDeepDiveImage(null);
        }
    }, [selectedSlug, dataFingerprint, dynamicSlugs, form]);

    const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

    const handleSave = async () => {
        try {
            const formData = new FormData();

            // Append basic fields
            formData.append('pageSlug', form.pageSlug);
            formData.append('pageName', form.pageName);
            formData.append('isActive', form.isActive);

            // Append nested objects as JSON strings
            const jsonFields = ['hero', 'features', 'deepDive', 'steps', 'cta', 'faqs'];
            jsonFields.forEach(field => {
                formData.append(field, JSON.stringify(form[field]));
            });

            // Append Files if present
            if (heroImage) formData.append('heroImage', heroImage);
            if (deepDiveImage) formData.append('deepDiveImage', deepDiveImage);

            await upsertPage(formData).unwrap();
            showToast(`✅ ${form.pageName} saved successfully!`);
            setIsEditing(false);
            setHeroImage(null);
            setDeepDiveImage(null);
        } catch (err) {
            console.error('Save error:', err);
            showToast('❌ Failed to save');
        }
    };

    const handleDelete = async (slug) => {
        if (window.confirm(`Delete all content for "${dynamicSlugs.find(p => p.slug === slug)?.label}"? You can recover using Seed.`)) {
            await deletePage(slug).unwrap();
            showToast('🗑️ Page content deleted');
        }
    };

    const handleSeed = async () => {
        await seedData([]).unwrap();
        showToast('🌱 Default data seeded (only missing pages)');
    };

    const handleForceSeed = async () => {
        if (window.confirm('This will OVERWRITE all existing content with defaults. Are you sure?')) {
            await forceSeed([]).unwrap();
            showToast('🔄 All pages restored to defaults');
        }
    };

    const handleToggleStatus = async (page) => {
        try {
            const updatedPage = { ...page, isActive: !page.isActive };
            await upsertPage(updatedPage).unwrap();
            showToast(`✅ ${page.pageName} is now ${updatedPage.isActive ? 'Active' : 'Inactive'}`);
        } catch (err) {
            showToast('❌ Failed to update status');
        }
    };

    const toggleSection = (section) => setExpandedSection(expandedSection === section ? '' : section);

    // Array helpers
    const addItem = (key) => {
        const defaults = {
            features: { title: '', description: '', iconName: 'Star' },
            steps: { number: String(form.steps.length + 1).padStart(2, '0'), title: '', description: '' },
            faqs: { question: '', answer: '' }
        };
        setForm({ ...form, [key]: [...form[key], defaults[key]] });
    };

    const removeItem = (key, idx) => {
        setForm({ ...form, [key]: form[key].filter((_, i) => i !== idx) });
    };

    const updateItem = (key, idx, field, value) => {
        const updated = [...form[key]];
        updated[idx] = { ...updated[idx], [field]: value };
        setForm({ ...form, [key]: updated });
    };

    const addChecklist = () => {
        setForm({ ...form, deepDive: { ...form.deepDive, checklist: [...(form.deepDive.checklist || []), ''] } });
    };

    const removeChecklist = (idx) => {
        setForm({ ...form, deepDive: { ...form.deepDive, checklist: form.deepDive.checklist.filter((_, i) => i !== idx) } });
    };

    const updateChecklist = (idx, value) => {
        const updated = [...form.deepDive.checklist];
        updated[idx] = value;
        setForm({ ...form, deepDive: { ...form.deepDive, checklist: updated } });
    };

    const existingPage = allPages.find(p => p.pageSlug === selectedSlug);

    if (isLoading) return <div className="p-8 text-center text-gray-500">Loading Astrology Pages...</div>;

    const SectionHeader = ({ title, section, count }) => (
        <button onClick={() => toggleSection(section)} className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl hover:from-indigo-100 transition-all">
            <span className="font-bold text-indigo-900 flex items-center gap-2">
                {title} {count !== undefined && <span className="text-xs bg-indigo-200 text-indigo-800 px-2 py-0.5 rounded-full">{count}</span>}
            </span>
            {expandedSection === section ? <FiChevronUp className="text-indigo-600" /> : <FiChevronDown className="text-indigo-400" />}
        </button>
    );

    const InputField = ({ label, value, onChange, placeholder, textarea }) => (
        <div>
            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1">{label}</label>
            {textarea ? (
                <textarea className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-50 focus:ring-2 focus:ring-indigo-500 outline-none resize-none" rows="3" value={value || ''} onChange={e => onChange(e.target.value)} placeholder={placeholder} />
            ) : (
                <input className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-50 focus:ring-2 focus:ring-indigo-500 outline-none" value={value || ''} onChange={e => onChange(e.target.value)} placeholder={placeholder} />
            )}
        </div>
    );

    return (
        <div className="p-6 max-w-6xl mx-auto">
            {/* Toast */}
            {toast && (
                <div className="fixed top-6 right-6 z-50 bg-white shadow-2xl border border-indigo-100 px-6 py-3 rounded-xl text-sm font-bold text-gray-800 animate-fade-in-up">
                    {toast}
                </div>
            )}

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight italic-none">Astrology Pages <span className="text-orange-600">Manager</span></h1>
                    <p className="text-gray-500 mt-1 text-sm">Manage content for all astrology service pages from one place</p>
                </div>
                <div className="flex gap-2 flex-wrap">
                    <button onClick={handleSeed} disabled={isSeeding} className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700 transition-all shadow-sm disabled:opacity-50">
                        <FiDatabase size={14} /> {isSeeding ? 'Seeding...' : 'Seed Missing'}
                    </button>
                </div>
            </div>

            {/* Page Selector */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6">
                <label className="block text-xs font-black text-gray-600 uppercase tracking-wide mb-2">Select Page to Manage</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {dynamicSlugs.map(p => (
                        <button
                            key={p.slug}
                            onClick={() => { setSelectedSlug(p.slug); setIsEditing(false); }}
                            className={`px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${selectedSlug === p.slug
                                ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/30'
                                : allPages.find(x => x.pageSlug === p.slug)
                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                                    : 'bg-gray-50 text-gray-500 border border-gray-200 hover:bg-gray-100'
                                }`}
                        >
                            {p.label}
                            {allPages.find(x => x.pageSlug === p.slug) && <span className="ml-1">✓</span>}
                        </button>
                    ))}
                </div>
            </div>

            {/* Current Page Status */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-6 flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-gray-800">{dynamicSlugs.find(p => p.slug === selectedSlug)?.label}</h2>
                    <p className="text-xs text-gray-500 mt-0.5">
                        {existingPage ? `Last updated: ${new Date(existingPage.updatedAt).toLocaleString()}` : 'No content yet — click Edit or use Seed'}
                    </p>
                </div>
                <div className="flex gap-2">
                    <button onClick={() => setIsEditing(!isEditing)} className="flex items-center gap-1.5 px-4 py-2 bg-orange-600 text-white rounded-lg text-xs font-bold hover:bg-orange-700 transition-all">
                        {isEditing ? <><FiX size={14} /> Close</> : <><FiEdit2 size={14} /> Edit</>}
                    </button>
                    {existingPage && (
                        <button onClick={() => handleDelete(selectedSlug)} className="flex items-center gap-1.5 px-4 py-2 bg-red-50 text-red-600 rounded-lg text-xs font-bold hover:bg-red-100 transition-all">
                            <FiTrash2 size={14} /> Delete
                        </button>
                    )}
                </div>
            </div>

            {/* Edit Form */}
            {isEditing && (
                <div className="bg-white rounded-2xl shadow-xl border border-indigo-100 mb-8 overflow-hidden">
                    <div className="p-5 bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
                        <h3 className="font-bold text-lg">Editing: {form.pageName}</h3>
                        <p className="text-indigo-200 text-xs mt-1">Fill each section below. Click Save when done.</p>
                    </div>

                    <div className="p-5 space-y-4">
                        {/* HERO */}
                        <SectionHeader title="🏠 Hero Section" section="hero" />
                        {expandedSection === 'hero' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-xl">
                                <InputField label="Badge Text" value={form.hero.badge} onChange={v => setForm({ ...form, hero: { ...form.hero, badge: v } })} placeholder="e.g. EXPERT CAREER ASTROLOGY" />
                                <InputField label="Title (Line 1)" value={form.hero.title} onChange={v => setForm({ ...form, hero: { ...form.hero, title: v } })} placeholder="e.g. Unlock Your True" />
                                <InputField label="Highlighted Title (Line 2)" value={form.hero.highlightedTitle} onChange={v => setForm({ ...form, hero: { ...form.hero, highlightedTitle: v } })} placeholder="e.g. Professional Destiny" />

                                <div className="space-y-2">
                                    <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide">Hero Banner Image</label>
                                    <div className="flex items-center gap-4">
                                        <div className="relative group">
                                            <div className="w-24 h-16 bg-gray-200 rounded-lg overflow-hidden border border-gray-300 flex items-center justify-center">
                                                {heroImage ? (
                                                    <img src={URL.createObjectURL(heroImage)} alt="Preview" className="w-full h-full object-cover" />
                                                ) : form.hero.imageUrl ? (
                                                    <img src={form.hero.imageUrl.startsWith('http') ? form.hero.imageUrl : `${BACKEND_URL}${form.hero.imageUrl}`} alt="Current" className="w-full h-full object-cover" />
                                                ) : (
                                                    <FiImage className="text-gray-400" size={24} />
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => setHeroImage(e.target.files[0])}
                                                className="block w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 transition-all"
                                            />
                                            <p className="text-[10px] text-gray-400 mt-1 italic">Resolution: 1600x600 recommended</p>
                                        </div>
                                    </div>
                                    <div className="mt-3"><InputField label="Hero Image Alt Tag" value={form.hero.imageAlt} onChange={v => setForm({ ...form, hero: { ...form.hero, imageAlt: v } })} placeholder="e.g. Expert Astrologer Consultation" /></div>
                                </div>

                                <InputField label="Button Text" value={form.hero.buttonText} onChange={v => setForm({ ...form, hero: { ...form.hero, buttonText: v } })} placeholder="e.g. Consult Expert Now" />
                                <div className="md:col-span-2">
                                    <InputField label="Subtitle" value={form.hero.subtitle} onChange={v => setForm({ ...form, hero: { ...form.hero, subtitle: v } })} placeholder="Hero description..." textarea />
                                </div>
                                <InputField label="Button Link" value={form.hero.buttonLink} onChange={v => setForm({ ...form, hero: { ...form.hero, buttonLink: v } })} placeholder="/astrologer" />
                            </div>
                        )}

                        {/* FEATURES */}
                        <SectionHeader title="⭐ Features" section="features" count={form.features?.length} />
                        {expandedSection === 'features' && (
                            <div className="p-4 bg-gray-50 rounded-xl space-y-3">
                                {form.features?.map((f, idx) => (
                                    <div key={idx} className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end bg-white p-3 rounded-lg border border-gray-100">
                                        <InputField label="Title" value={f.title} onChange={v => updateItem('features', idx, 'title', v)} placeholder="Feature title" />
                                        <InputField label="Icon Name" value={f.iconName} onChange={v => updateItem('features', idx, 'iconName', v)} placeholder="e.g. Target, Star" />
                                        <div className="md:col-span-1">
                                            <InputField label="Description" value={f.description} onChange={v => updateItem('features', idx, 'description', v)} placeholder="Short desc" />
                                        </div>
                                        <button onClick={() => removeItem('features', idx)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg self-end text-xs font-bold">Remove</button>
                                    </div>
                                ))}
                                <button onClick={() => addItem('features')} className="text-orange-600 text-xs font-bold flex items-center gap-1 hover:bg-indigo-50 px-3 py-2 rounded-lg">
                                    <FiPlus size={14} /> Add Feature
                                </button>
                            </div>
                        )}

                        {/* DEEP DIVE */}
                        <SectionHeader title="🔍 Deep Dive Section" section="deepDive" />
                        {expandedSection === 'deepDive' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-xl">
                                <InputField label="Badge" value={form.deepDive.badge} onChange={v => setForm({ ...form, deepDive: { ...form.deepDive, badge: v } })} placeholder="e.g. Vedic Accuracy" />
                                <InputField label="Title" value={form.deepDive.title} onChange={v => setForm({ ...form, deepDive: { ...form.deepDive, title: v } })} placeholder="Is it the Right Time to" />
                                <InputField label="Highlighted Title" value={form.deepDive.highlightedTitle} onChange={v => setForm({ ...form, deepDive: { ...form.deepDive, highlightedTitle: v } })} placeholder="Change Jobs?" />

                                <div className="space-y-2">
                                    <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide">Section Image</label>
                                    <div className="flex items-center gap-4">
                                        <div className="w-24 h-16 bg-gray-200 rounded-lg overflow-hidden border border-gray-300 flex items-center justify-center">
                                            {deepDiveImage ? (
                                                <img src={URL.createObjectURL(deepDiveImage)} alt="Preview" className="w-full h-full object-cover" />
                                            ) : form.deepDive.imageUrl ? (
                                                <img src={form.deepDive.imageUrl.startsWith('http') ? form.deepDive.imageUrl : `${BACKEND_URL}${form.deepDive.imageUrl}`} alt="Current" className="w-full h-full object-cover" />
                                            ) : (
                                                <FiImage className="text-gray-400" size={24} />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => setDeepDiveImage(e.target.files[0])}
                                                className="block w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100 transition-all"
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-3"><InputField label="Deep Dive Image Alt Tag" value={form.deepDive.imageAlt} onChange={v => setForm({ ...form, deepDive: { ...form.deepDive, imageAlt: v } })} placeholder="e.g. Detailed Vedic Analysis Chart" /></div>
                                </div>

                                <InputField label="Stat Label" value={form.deepDive.statLabel} onChange={v => setForm({ ...form, deepDive: { ...form.deepDive, statLabel: v } })} placeholder="Success Rate" />
                                <InputField label="Stat Value" value={form.deepDive.statValue} onChange={v => setForm({ ...form, deepDive: { ...form.deepDive, statValue: v } })} placeholder="98%" />
                                <InputField label="Button Text" value={form.deepDive.buttonText} onChange={v => setForm({ ...form, deepDive: { ...form.deepDive, buttonText: v } })} />
                                <InputField label="Button Link" value={form.deepDive.buttonLink} onChange={v => setForm({ ...form, deepDive: { ...form.deepDive, buttonLink: v } })} />
                                <div className="md:col-span-2">
                                    <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-2">Checklist Items</label>
                                    {form.deepDive.checklist?.map((item, idx) => (
                                        <div key={idx} className="flex gap-2 mb-2">
                                            <input className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white" value={item} onChange={e => updateChecklist(idx, e.target.value)} placeholder={`Checklist item ${idx + 1}`} />
                                            <button onClick={() => removeChecklist(idx)} className="text-red-400 hover:text-red-600 text-xs px-2">✕</button>
                                        </div>
                                    ))}
                                    <button onClick={addChecklist} className="text-orange-600 text-xs font-bold flex items-center gap-1 hover:bg-indigo-50 px-3 py-1 rounded"><FiPlus size={12} /> Add Item</button>
                                </div>
                            </div>
                        )}

                        {/* STEPS */}
                        <SectionHeader title="📋 How It Works (Steps)" section="steps" count={form.steps?.length} />
                        {expandedSection === 'steps' && (
                            <div className="p-4 bg-gray-50 rounded-xl space-y-3">
                                {form.steps?.map((s, idx) => (
                                    <div key={idx} className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end bg-white p-3 rounded-lg border border-gray-100">
                                        <InputField label="Number" value={s.number} onChange={v => updateItem('steps', idx, 'number', v)} placeholder="01" />
                                        <InputField label="Title" value={s.title} onChange={v => updateItem('steps', idx, 'title', v)} placeholder="Step title" />
                                        <InputField label="Description" value={s.description} onChange={v => updateItem('steps', idx, 'description', v)} placeholder="Step description" />
                                        <button onClick={() => removeItem('steps', idx)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg self-end text-xs font-bold">Remove</button>
                                    </div>
                                ))}
                                <button onClick={() => addItem('steps')} className="text-orange-600 text-xs font-bold flex items-center gap-1 hover:bg-indigo-50 px-3 py-2 rounded-lg">
                                    <FiPlus size={14} /> Add Step
                                </button>
                            </div>
                        )}

                        {/* CTA */}
                        <SectionHeader title="🎯 Call to Action" section="cta" />
                        {expandedSection === 'cta' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-xl">
                                <InputField label="CTA Title" value={form.cta.title} onChange={v => setForm({ ...form, cta: { ...form.cta, title: v } })} placeholder="Take Control of Your Career Today" />
                                <InputField label="Button Text" value={form.cta.buttonText} onChange={v => setForm({ ...form, cta: { ...form.cta, buttonText: v } })} />
                                <div className="md:col-span-2">
                                    <InputField label="Subtitle" value={form.cta.subtitle} onChange={v => setForm({ ...form, cta: { ...form.cta, subtitle: v } })} textarea />
                                </div>
                                <InputField label="Button Link" value={form.cta.buttonLink} onChange={v => setForm({ ...form, cta: { ...form.cta, buttonLink: v } })} />
                            </div>
                        )}

                        {/* FAQs */}
                        <SectionHeader title="❓ FAQs" section="faqs" count={form.faqs?.length} />
                        {expandedSection === 'faqs' && (
                            <div className="p-4 bg-gray-50 rounded-xl space-y-3">
                                {form.faqs?.map((faq, idx) => (
                                    <div key={idx} className="bg-white p-3 rounded-lg border border-gray-100 space-y-2">
                                        <div className="flex gap-2 items-center">
                                            <span className="text-xs font-bold text-orange-600 w-8">Q{idx + 1}</span>
                                            <input className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-50" value={faq.question} onChange={e => updateItem('faqs', idx, 'question', e.target.value)} placeholder="Question" />
                                            <button onClick={() => removeItem('faqs', idx)} className="text-red-400 hover:text-red-600 text-xs px-2">✕</button>
                                        </div>
                                        <textarea className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-50 resize-none" rows="2" value={faq.answer} onChange={e => updateItem('faqs', idx, 'answer', e.target.value)} placeholder="Answer..." />
                                    </div>
                                ))}
                                <button onClick={() => addItem('faqs')} className="text-orange-600 text-xs font-bold flex items-center gap-1 hover:bg-indigo-50 px-3 py-2 rounded-lg">
                                    <FiPlus size={14} /> Add FAQ
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Save Button */}
                    <div className="p-5 bg-gray-50 border-t flex justify-end gap-3">
                        <button onClick={() => setIsEditing(false)} className="px-5 py-2.5 text-gray-600 hover:bg-gray-200 rounded-xl text-sm font-bold">Cancel</button>
                        <button onClick={handleSave} className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-6 py-2.5 rounded-xl hover:shadow-lg hover:shadow-indigo-500/30 transition-all text-sm font-bold">
                            <FiSave /> Save Content
                        </button>
                    </div>
                </div>
            )}

            {/* Data Table — Shows all pages with their content summary */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-5 border-b bg-gradient-to-r from-gray-50 to-white">
                    <h3 className="font-bold text-gray-800 flex items-center gap-2"><FiEye /> All Pages Content Overview</h3>
                    <p className="text-xs text-gray-500 mt-1">Green = has content, Gray = empty (use Seed to populate)</p>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm table-fixed border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b">
                                <th className="w-[22%] text-left px-5 py-3 font-bold text-gray-600 text-xs uppercase tracking-wide">Page Name</th>
                                <th className="w-[10%] text-center px-2 py-3 font-bold text-gray-600 text-xs uppercase tracking-wide">Banner</th>
                                <th className="w-[9%] text-center px-2 py-3 font-bold text-gray-600 text-xs uppercase tracking-wide">Hero</th>
                                <th className="w-[9%] text-center px-2 py-3 font-bold text-gray-600 text-xs uppercase tracking-wide">Features</th>
                                <th className="w-[11%] text-center px-2 py-3 font-bold text-gray-600 text-xs uppercase tracking-wide">Deep Dive</th>
                                <th className="w-[9%] text-center px-2 py-3 font-bold text-gray-600 text-xs uppercase tracking-wide">Steps</th>
                                <th className="w-[9%] text-center px-2 py-3 font-bold text-gray-600 text-xs uppercase tracking-wide">FAQs</th>
                                <th className="w-[10%] text-center px-2 py-3 font-bold text-gray-600 text-xs uppercase tracking-wide">Status</th>
                                <th className="w-[13%] text-right px-10 py-3 font-bold text-gray-600 text-xs uppercase tracking-wide">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dynamicSlugs.map(({ slug, label }) => {
                                const page = allPages.find(p => p.pageSlug === slug);
                                return (
                                    <tr key={slug} className={`border-b hover:bg-gray-50 transition-colors ${selectedSlug === slug ? 'bg-indigo-50/50' : ''}`}>
                                        <td className="px-5 py-3 font-bold text-gray-800 truncate" title={label}>{label}</td>
                                        <td className="text-center px-2 py-3">
                                            <div className="w-12 h-8 bg-gray-100 rounded border border-gray-200 mx-auto overflow-hidden">
                                                {page?.hero?.imageUrl ? (
                                                    <img
                                                        src={page.hero.imageUrl.startsWith('http') ? page.hero.imageUrl : `${BACKEND_URL}${page.hero.imageUrl}`}
                                                        className="w-full h-full object-cover"
                                                        alt=""
                                                    />
                                                ) : <FiImage className="w-full h-full p-1.5 text-gray-300" />}
                                            </div>
                                        </td>
                                        <td className="text-center px-2 py-3">
                                            {page?.hero?.title ? <span className="text-emerald-600 text-lg">●</span> : <span className="text-gray-300 text-lg">○</span>}
                                        </td>
                                        <td className="text-center px-2 py-3">
                                            {page?.features?.length ? <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{page.features.length}</span> : <span className="text-gray-300">—</span>}
                                        </td>
                                        <td className="text-center px-2 py-3">
                                            {page?.deepDive?.title ? <span className="text-emerald-600 text-lg">●</span> : <span className="text-gray-300 text-lg">○</span>}
                                        </td>
                                        <td className="text-center px-2 py-3">
                                            {page?.steps?.length ? <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{page.steps.length}</span> : <span className="text-gray-300">—</span>}
                                        </td>
                                        <td className="text-center px-2 py-3">
                                            {page?.faqs?.length ? <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{page.faqs.length}</span> : <span className="text-gray-300">—</span>}
                                        </td>
                                        <td className="text-center px-2 py-3">
                                            {page ? (
                                                <button
                                                    onClick={() => handleToggleStatus(page)}
                                                    className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-offset-1"
                                                    style={{ backgroundColor: page.isActive !== false ? '#22c55e' : '#d1d5db' }}
                                                    title={page.isActive !== false ? 'Active — Click to hide' : 'Hidden — Click to show'}
                                                >
                                                    <span
                                                        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-md transition-transform duration-300 ${page.isActive !== false ? 'translate-x-6' : 'translate-x-1'}`}
                                                    />
                                                </button>
                                            ) : (
                                                <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded-full">Empty</span>
                                            )}
                                        </td>
                                        <td className="text-right px-5 py-3">
                                            <div className="flex items-center justify-end gap-1">
                                                <button onClick={() => setViewData(page)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View Summary">
                                                    <FiEye size={14} />
                                                </button>
                                                <button onClick={() => { setSelectedSlug(slug); setIsEditing(true); }} className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="Edit">
                                                    <FiEdit2 size={14} />
                                                </button>
                                                {page && (
                                                    <button onClick={() => handleDelete(slug)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                                                        <FiTrash2 size={14} />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* View Modal - Premium Discovery Window */}
            {viewData && (
                <div className="fixed inset-0 bg-black/60 z-[2000] flex items-center justify-center p-4 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setViewData(null)}>
                    <div className="bg-white rounded-sm shadow-2xl max-w-2xl w-full max-h-[95vh] border border-white relative overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col" onClick={e => e.stopPropagation()}>
                        {/* Header Accent */}
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-400 via-orange-600 to-[#2A1D13] z-50"></div>

                        <button onClick={() => setViewData(null)} className="absolute top-6 right-6 bg-gray-100 text-gray-500 hover:text-gray-900 rounded-full p-2.5 transition-all z-[60] hover:rotate-90"><FiX className="w-5 h-5" /></button>

                        <div className="p-10 pb-0 space-y-8 flex-grow overflow-y-auto custom-scrollbar">
                            {/* Title Segment */}
                            <div className="flex items-center gap-5">
                                <div className="w-16 h-16 bg-orange-100/50 text-orange-600 rounded-sm flex items-center justify-center shadow-inner border border-orange-100">
                                    <FiEye size={32} />
                                </div>
                                <div>
                                    <h3 className="text-3xl font-black text-gray-900 uppercase tracking-tighter italic-none">{viewData.pageName}</h3>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mt-1 flex items-center gap-2">
                                        <span className="w-2 h-2 bg-orange-600 rounded-full animate-pulse shadow-[0_0_8px_rgba(234,88,12,0.6)]"></span>
                                        Divine Content Portal
                                    </p>
                                </div>
                            </div>

                            {/* Banner Preview Section */}
                            {viewData.hero.imageUrl && (
                                <div className="rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm relative group bg-gray-50 aspect-[16/6]">
                                    <img
                                        src={viewData.hero.imageUrl.startsWith('http') ? viewData.hero.imageUrl : `${BACKEND_URL}${viewData.hero.imageUrl}`}
                                        alt="Banner Preview"
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                    <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md border border-white/30 text-white text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-full">
                                        Active Hero Banner
                                    </div>
                                </div>
                            )}

                            {/* Core Info Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Hero Card */}
                                <div className="p-8 bg-gray-50/50 rounded-[2rem] border border-gray-100 relative group transition-all hover:bg-white hover:shadow-xl hover:shadow-gray-100/50">
                                    <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <FiDatabase size={40} />
                                    </div>
                                    <p className="text-[9px] font-black text-orange-600 uppercase tracking-widest mb-4">Hero Presence</p>
                                    <h4 className="text-xl font-black text-gray-800 leading-tight mb-3">
                                        {viewData.hero.title} <span className="text-orange-600 italic-none">{viewData.hero.highlightedTitle}</span>
                                    </h4>
                                    <p className="text-xs text-gray-500 leading-relaxed italic opacity-80">"{viewData.hero.subtitle}"</p>
                                </div>

                                {/* Tech Stats Card */}
                                <div className="p-8 bg-gray-50/50 rounded-[2rem] border border-gray-100 relative group transition-all hover:bg-white hover:shadow-xl hover:shadow-gray-100/50">
                                    <p className="text-[9px] font-black text-orange-600 uppercase tracking-widest mb-6">Sacred Metrics</p>
                                    <div className="space-y-4">
                                        {[
                                            { label: 'Features', value: viewData.features?.length || 0, color: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
                                            { label: 'Steps', value: viewData.steps?.length || 0, color: 'bg-blue-50 text-blue-600 border-blue-100' },
                                            { label: 'FAQs', value: viewData.faqs?.length || 0, color: 'bg-purple-50 text-purple-600 border-purple-100' }
                                        ].map((stat, idx) => (
                                            <div key={idx} className="flex items-center justify-between">
                                                <span className="text-xs font-bold text-gray-400 uppercase tracking-tight">{stat.label} Inventory</span>
                                                <span className={`px-4 py-1.5 rounded-xl text-xs font-black border ${stat.color} shadow-sm group-hover:scale-110 transition-transform`}>{stat.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Deep Dive Section Preview (Optional) */}
                            {viewData.deepDive.imageUrl && (
                                <div className="space-y-3 pb-6">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] pl-4">Secondary Visual (Deep Dive)</p>
                                    <div className="rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm relative group bg-gray-50 aspect-[21/9]">
                                        <img
                                            src={viewData.deepDive.imageUrl.startsWith('http') ? viewData.deepDive.imageUrl : `${BACKEND_URL}${viewData.deepDive.imageUrl}`}
                                            alt="Deep Dive Preview"
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Footer & Actions */}
                        <div className="p-10 pt-6 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-6 bg-white shrink-0">
                            <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest">Portal Version : v2.1.0_PRO</p>
                            <div className="flex gap-3 w-full sm:w-auto">
                                <button
                                    onClick={() => { setViewData(null); setSelectedSlug(viewData.pageSlug); setIsEditing(true); }}
                                    className="flex-1 sm:flex-none px-8 py-4 bg-[#2A1D13] text-white rounded-[1.5rem] text-[10px] font-black tracking-widest uppercase hover:bg-orange-600 transition-all shadow-xl shadow-[#2A1D13]/10 active:scale-95"
                                >
                                    Open Editor
                                </button>
                                <button
                                    onClick={() => setViewData(null)}
                                    className="flex-1 sm:flex-none px-8 py-4 bg-gray-100 text-gray-500 rounded-[1.5rem] text-[10px] font-black tracking-widest uppercase hover:bg-gray-200 transition-all active:scale-90"
                                >
                                    Dismiss
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AstrologyContentManager;
