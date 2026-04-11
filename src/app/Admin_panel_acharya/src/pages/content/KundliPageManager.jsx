import React, { useState, useEffect } from 'react';
import {
    useGetAllKundliPagesQuery,
    useUpsertKundliPageMutation,
    useDeleteKundliPageMutation,
    useSeedKundliDataMutation,
    useForceSeedKundliDataMutation,
    useUpdateKundliPageStatusMutation
} from '../../../../../services/kundliContentApi';
import { useGetNavbarItemsQuery } from '../../../../../services/navbarApi';
import { BACKEND_URL } from '../../../../../config/apiConfig';
import { FiPlus, FiEdit2, FiTrash2, FiSave, FiX, FiDatabase, FiRefreshCw, FiChevronDown, FiChevronUp, FiEye, FiImage, FiCheckSquare, FiSquare } from 'react-icons/fi';

const DEFAULT_SLUGS = [
    { slug: 'get-your-kundli', label: 'Get Your Kundli' },
    { slug: 'kundli-matching', label: 'Kundli Matching' },
    { slug: 'manglik-dosh-check', label: 'Manglik Dosh Check' },
    { slug: 'kaal-sarp-dosh', label: 'Kaal Sarp Dosh' },
    { slug: 'pitru-dosh', label: 'Pitru Dosh' },
    { slug: 'shani-sade-sati', label: 'Shani Sade Sati' },
    { slug: 'dasha-analysis', label: 'Dasha Analysis' },
    { slug: 'kundli-remedies', label: 'Kundli Remedies' }
];

const emptyForm = {
    pageSlug: '',
    pageName: '',
    hero: { badge: 'DIVINE KUNDLI SERVICES', title: '', highlightedTitle: '', subtitle: '', imageUrl: '', buttonText: 'Generate Now', buttonLink: '/astrologer' },
    featuresTitle: 'Celestial Benefits',
    features: [{ title: '', description: '' }],
    formSection: {
        badge: 'Enter Your Details', title: 'Birth Information',
        nameLabel: 'Your Full Name', namePlaceholder: 'Enter your full name',
        dobLabel: 'Date of Birth', timeLabel: 'Time of Birth',
        placeLabel: 'Birth Place', placePlaceholder: 'e.g., Delhi, India',
        buttonText: 'Generate Kundli'
    },
    resultsSection: { badge: 'Generated Insights', title: 'Your Janam Kundli' },
    doshasSection: { badge: 'Dosha Analysis', title: 'Planetary Influences' },
    remediesSection: { badge: 'Spiritual Solutions', title: 'Divine Remedies' },
    cta: { title: 'Need Deeper Analysis?', subtitle: 'Connect with our master astrologers for deeper clarity on your cosmic blueprint.', buttonText: 'Consult with Expert', buttonLink: '/astrologer' },
    faqsTitle: 'Divine Clarification',
    faqs: [{ question: '', answer: '' }],
    isActive: true,
    activeSections: {
        features: true,
        form: true,
        results: true,
        doshas: true,
        remedies: true,
        cta: true,
        faqs: true
    }
};

const SectionHeader = ({ title, section, count, subtitle, expandedSection, toggleSection, isActive, onToggleActive }) => (
    <div className="space-y-4">
        <div className="flex gap-2">
            <button onClick={() => onToggleActive && onToggleActive(!isActive)} className={`px-4 flex items-center justify-center rounded-2xl transition-all border ${isActive ? 'bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-100' : 'bg-gray-100 text-gray-400 border-gray-200 hover:bg-gray-200'}`} title={isActive ? "Deactivate (Delete from page)" : "Activate (Add to page)"}>
                {isActive ? <FiCheckSquare size={18} /> : <FiSquare size={18} />}
            </button>
            <button onClick={() => toggleSection(section)} className={`flex-1 flex items-center justify-between p-5 rounded-2xl transition-all border ${expandedSection === section ? 'bg-indigo-600 text-white shadow-lg border-indigo-600' : 'bg-gray-50 text-gray-700 border-gray-100 hover:bg-gray-100'} ${!isActive && 'opacity-50 grayscale'}`}>
                <div className="flex items-center gap-3">
                    <span className="font-black uppercase tracking-widest text-xs tracking-tight">{title}</span>
                    {count !== undefined && <span className={`text-[10px] px-2 py-0.5 rounded-full font-black ${expandedSection === section ? 'bg-white/20 text-white' : 'bg-indigo-100 text-indigo-700'}`}>{count}</span>}
                    {!isActive && <span className="text-[9px] font-black uppercase text-red-500 bg-red-100 px-2 py-0.5 rounded-full">Inactive</span>}
                </div>
                {expandedSection === section ? <FiChevronUp /> : <FiChevronDown />}
            </button>
        </div>
        {expandedSection === section && subtitle && (
            <div className="px-5 pb-2">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{subtitle}</p>
            </div>
        )}
    </div>
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

const KundliPageManager = () => {
    const { data: allPages = [], isLoading } = useGetAllKundliPagesQuery();
    const { data: navItems = [] } = useGetNavbarItemsQuery();
    const [upsertPage] = useUpsertKundliPageMutation();
    const [deletePage] = useDeleteKundliPageMutation();
    const [seedData, { isLoading: isSeeding }] = useSeedKundliDataMutation();
    const [forceSeed, { isLoading: isForceSeeding }] = useForceSeedKundliDataMutation();
    const [updateStatus] = useUpdateKundliPageStatusMutation();

    const [selectedSlug, setSelectedSlug] = React.useState('get-your-kundli');
    const [form, setForm] = React.useState(emptyForm);
    const [isEditing, setIsEditing] = React.useState(false);
    const [isNewPage, setIsNewPage] = React.useState(false);
    const [expandedSection, setExpandedSection] = React.useState('hero');
    const [toast, setToast] = React.useState('');
    const [viewData, setViewData] = React.useState(null);
    const [heroImage, setHeroImage] = React.useState(null);

    const dynamicSlugs = React.useMemo(() => {
        // Get slugs from both Navbar and already created pages
        const kundliItem = navItems?.find(item => item.label === 'Kundli' || item.title === 'Kundli');
        const navbarChildren = kundliItem?.children || [];

        const unique = [];
        const seenSlugs = new Set();
        const seenLabels = new Set();

        const addToUnique = (label, href) => {
            if (!label) return;
            const normalizedLabel = label.trim().toLowerCase();

            // Robust slug extraction: remove /kundli/ prefix, leading/trailing slashes, hash, spaces
            const slug = (href || label)
                .replace(/^\/kundli\//, '')
                .replace(/^\//, '')
                .replace(/\/$/, '')
                .replace(/^#/, '')
                .toLowerCase()
                .replace(/ /g, '-')
                .trim();

            // Avoid empty or single character rogue slugs like 'L' unless it's intended
            if (slug && slug.length > 1 && !seenSlugs.has(slug) && !seenLabels.has(normalizedLabel)) {
                seenSlugs.add(slug);
                seenLabels.add(normalizedLabel);
                unique.push({ slug, label: label.trim() });
            }
        };

        // 1. Add navbar children first
        navbarChildren.forEach(item => addToUnique(item.label || item.title, item.href));

        // 2. Add already existing pages
        allPages.forEach(p => addToUnique(p.pageName, `/kundli/${p.pageSlug}`));

        // 3. Add default fallbacks
        DEFAULT_SLUGS.forEach(d => addToUnique(d.label, `/kundli/${d.slug}`));

        return unique;
    }, [navItems, allPages]);

    React.useEffect(() => {
        const page = allPages.find(p => p.pageSlug === selectedSlug);
        if (page) {
            setForm({ ...emptyForm, ...page });
            setIsNewPage(false);
        } else {
            // New page: Pre-fill with premium default data structure
            const label = dynamicSlugs.find(s => s.slug === selectedSlug)?.label || 'New Kundli Page';
            setForm({
                ...emptyForm,
                pageSlug: selectedSlug,
                pageName: label,
                hero: { ...emptyForm.hero, title: `Unlock Your ${label}`, highlightedTitle: 'Destiny' },
                features: [
                    { title: 'Vedic Accuracy', description: 'Calculations based on precise mathematical algorithms.', iconName: 'Shield' },
                    { title: 'Personalized Insights', description: 'Detailed analysis of planetary positions.', iconName: 'Star' },
                    { title: 'Dosha Analysis', description: 'Identification of Manglik and other major doshas.', iconName: 'Zap' }
                ],
                steps: [
                    { number: '01', title: 'Enter Details', description: 'Provide your birth date and time.' },
                    { number: '02', title: 'Generate Chart', description: 'Our system calculates house positions.' },
                    { number: '03', title: 'Get Insights', description: 'Understand your life through Vedic wisdom.' }
                ]
            });
            setIsNewPage(true);
        }
        setHeroImage(null);
    }, [selectedSlug, allPages, dynamicSlugs]);

    const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

    const handleSave = async () => {
        try {
            const formData = new FormData();
            Object.keys(form).forEach(key => {
                if (['hero', 'features', 'formSection', 'resultsSection', 'doshasSection', 'remediesSection', 'cta', 'faqs', 'activeSections'].includes(key)) {
                    formData.append(key, JSON.stringify(form[key]));
                } else {
                    formData.append(key, form[key]);
                }
            });
            if (heroImage) formData.append('heroImage', heroImage);

            await upsertPage(formData).unwrap();
            showToast('✨ Divine wisdom saved successfully!');
            setIsEditing(false);
        } catch (err) { showToast('❌ Failed to save. Check connections.'); }
    };

    const handleDelete = async (slug) => {
        if (window.confirm(`Delete content for "${dynamicSlugs.find(p => p.slug === slug)?.label}"?`)) {
            await deletePage(slug).unwrap();
            showToast('🗑️ Page content deleted');
        }
    };

    const handleToggleStatus = async (page) => {
        try {
            await updateStatus({
                slug: page.pageSlug,
                isActive: page.isActive === false ? true : false
            }).unwrap();
            showToast(`✨ Page ${page.isActive === false ? 'Activated' : 'Paused'}`);
        } catch (err) {
            showToast('❌ Status change failed');
        }
    };

    const handleSeed = async () => { await seedData({ slugs: dynamicSlugs }).unwrap(); showToast('🌱 Default data seeded'); };
    const handleForceSeed = async () => { if (window.confirm('OVERWRITE all content?')) { await forceSeed({ slugs: dynamicSlugs }).unwrap(); showToast('🔄 All pages restored'); } };

    const toggleSection = (section) => setExpandedSection(expandedSection === section ? '' : section);

    const addItem = (key) => {
        const defaults = {
            features: { title: '', description: '' },
            faqs: { question: '', answer: '' }
        };
        setForm({ ...form, [key]: [...(form[key] || []), defaults[key]] });
    };

    const removeItem = (key, idx) => setForm({ ...form, [key]: form[key].filter((_, i) => i !== idx) });
    const updateItem = (key, idx, field, value) => {
        const updated = [...form[key]];
        updated[idx] = { ...updated[idx], [field]: value };
        setForm({ ...form, [key]: updated });
    };

    if (isLoading) return <div className="p-20 text-center font-black uppercase tracking-[0.3em] text-gray-300">Consulting Ancient Scripts...</div>;

    const existingPage = allPages.find(p => p.pageSlug === selectedSlug);

    return (
        <div className="p-6 max-w-6xl mx-auto">
            {toast && <div className="fixed top-6 right-6 z-50 bg-white shadow-2xl border border-indigo-100 px-6 py-3 rounded-xl text-sm font-bold text-gray-800 animate-fade-in-up">{toast}</div>}

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Kundli Pages <span className="text-orange-600">Manager</span></h1>
                    <p className="text-gray-500 mt-1 text-sm">Manage divine content across all kundli service pages</p>
                </div>
                <div className="flex gap-2">
                    <button onClick={handleSeed} disabled={isSeeding} className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700 disabled:opacity-50 shadow-sm transition-all active:scale-95">
                        <FiDatabase /> Seed Pages
                    </button>
                </div>
            </div>

            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6">
                <label className="block text-xs font-black text-gray-600 uppercase tracking-wide mb-2">Select Page</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {dynamicSlugs.map(p => (
                        <button key={p.slug} onClick={() => { setSelectedSlug(p.slug); setIsEditing(false); }} className={`px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${selectedSlug === p.slug ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/30' : allPages.find(x => x.pageSlug === p.slug) ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100' : 'bg-gray-50 text-gray-500 border border-gray-200 hover:bg-gray-100'}`}>{p.label}{allPages.find(x => x.pageSlug === p.slug) && ' ✓'}</button>
                    ))}
                </div>
            </div>

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
                        <SectionHeader title="🏠 Hero Section" section="hero" expandedSection={expandedSection} toggleSection={toggleSection} />
                        {expandedSection === 'hero' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-xl">
                                <InputField label="Badge" value={form.hero.badge} onChange={v => setForm({ ...form, hero: { ...(form.hero || {}), badge: v } })} />
                                <InputField label="Title" value={form.hero.title} onChange={v => setForm({ ...form, hero: { ...(form.hero || {}), title: v } })} />
                                <InputField label="Highlight" value={form.hero.highlightedTitle} onChange={v => setForm({ ...form, hero: { ...(form.hero || {}), highlightedTitle: v } })} />
                                <div className="space-y-2">
                                    <label className="block text-xs font-bold text-gray-600 uppercase">Banner Image</label>
                                    <div className="flex items-center gap-4">
                                        <div className="w-24 h-16 bg-gray-200 rounded border flex items-center justify-center overflow-hidden">{heroImage ? <img src={URL.createObjectURL(heroImage)} className="w-full h-full object-cover" /> : form.hero.imageUrl ? <img src={form.hero.imageUrl.startsWith('http') ? form.hero.imageUrl : `${BACKEND_URL}${form.hero.imageUrl}`} className="w-full h-full object-cover" /> : <FiImage className="text-gray-400" />}</div>
                                        <input type="file" accept="image/*" onChange={e => setHeroImage(e.target.files[0])} className="text-xs file:bg-indigo-50 file:border-0 file:rounded-full file:px-4 file:py-2 file:text-indigo-700" />
                                    </div>
                                </div>
                                <div className="space-y-1.5"><InputField label="Hero Image Alt Tag" value={form.hero.imageAlt} onChange={v => setForm({ ...form, hero: { ...(form.hero || {}), imageAlt: v } })} placeholder="e.g. Generated Kundli Chart" /></div>
                                <InputField label="Button Text" value={form.hero.buttonText} onChange={v => setForm({ ...form, hero: { ...(form.hero || {}), buttonText: v } })} />
                                <div className="md:col-span-2"><InputField label="Subtitle" value={form.hero.subtitle} onChange={v => setForm({ ...form, hero: { ...(form.hero || {}), subtitle: v } })} textarea /></div>
                            </div>
                        )}

                        <SectionHeader title="⭐ Features" section="features" count={form.features?.length} expandedSection={expandedSection} toggleSection={toggleSection} isActive={form.activeSections?.features !== false} onToggleActive={v => setForm({ ...form, activeSections: { ...(form.activeSections || {}), features: v } })} />
                        {expandedSection === 'features' && (
                            <div className="p-4 bg-gray-50 rounded-xl space-y-3">
                                <InputField label="Section Title" value={form.featuresTitle} onChange={v => setForm({ ...form, featuresTitle: v })} />
                                {form.features?.map((f, i) => (
                                    <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end bg-white p-3 rounded-lg border border-gray-100">
                                        <InputField label="Feature Title" value={f.title} onChange={v => updateItem('features', i, 'title', v)} />
                                        <InputField label="Description" value={f.description} onChange={v => updateItem('features', i, 'description', v)} />
                                        <button onClick={() => removeItem('features', i)} className="text-red-500 hover:bg-red-50 p-2 rounded text-xs font-bold">Remove</button>
                                    </div>
                                ))}
                                <button onClick={() => addItem('features')} className="text-orange-600 text-xs font-bold flex items-center gap-1 px-3 py-2"><FiPlus /> Add Feature</button>
                            </div>
                        )}

                        <SectionHeader title="📝 Form Section" section="form" expandedSection={expandedSection} toggleSection={toggleSection} isActive={form.activeSections?.form !== false} onToggleActive={v => setForm({ ...form, activeSections: { ...(form.activeSections || {}), form: v } })} />
                        {expandedSection === 'form' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-xl">
                                <InputField label="Badge" value={form.formSection?.badge} onChange={v => setForm({ ...form, formSection: { ...(form.formSection || {}), badge: v } })} />
                                <InputField label="Title" value={form.formSection?.title} onChange={v => setForm({ ...form, formSection: { ...(form.formSection || {}), title: v } })} />
                            </div>
                        )}

                        <SectionHeader title="📊 Chart Section" section="results" expandedSection={expandedSection} toggleSection={toggleSection} isActive={form.activeSections?.results !== false} onToggleActive={v => setForm({ ...form, activeSections: { ...(form.activeSections || {}), results: v } })} />
                        {expandedSection === 'results' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-xl">
                                <InputField label="Badge" value={form.resultsSection?.badge} onChange={v => setForm({ ...form, resultsSection: { ...(form.resultsSection || {}), badge: v } })} />
                                <InputField label="Title" value={form.resultsSection?.title} onChange={v => setForm({ ...form, resultsSection: { ...(form.resultsSection || {}), title: v } })} />
                            </div>
                        )}

                        <SectionHeader title="⚡ Dosha Section" section="doshas" expandedSection={expandedSection} toggleSection={toggleSection} isActive={form.activeSections?.doshas !== false} onToggleActive={v => setForm({ ...form, activeSections: { ...(form.activeSections || {}), doshas: v } })} />
                        {expandedSection === 'doshas' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-xl">
                                <InputField label="Badge" value={form.doshasSection?.badge} onChange={v => setForm({ ...form, doshasSection: { ...(form.doshasSection || {}), badge: v } })} />
                                <InputField label="Title" value={form.doshasSection?.title} onChange={v => setForm({ ...form, doshasSection: { ...(form.doshasSection || {}), title: v } })} />
                            </div>
                        )}

                        <SectionHeader title="🌿 Remedies Section" section="remedies" expandedSection={expandedSection} toggleSection={toggleSection} isActive={form.activeSections?.remedies !== false} onToggleActive={v => setForm({ ...form, activeSections: { ...(form.activeSections || {}), remedies: v } })} />
                        {expandedSection === 'remedies' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-xl">
                                <InputField label="Badge" value={form.remediesSection?.badge} onChange={v => setForm({ ...form, remediesSection: { ...(form.remediesSection || {}), badge: v } })} />
                                <InputField label="Title" value={form.remediesSection?.title} onChange={v => setForm({ ...form, remediesSection: { ...(form.remediesSection || {}), title: v } })} />
                            </div>
                        )}

                        <SectionHeader title="📢 CTA Section" section="cta" expandedSection={expandedSection} toggleSection={toggleSection} isActive={form.activeSections?.cta !== false} onToggleActive={v => setForm({ ...form, activeSections: { ...(form.activeSections || {}), cta: v } })} />
                        {expandedSection === 'cta' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-xl">
                                <InputField label="Title" value={form.cta?.title} onChange={v => setForm({ ...form, cta: { ...(form.cta || {}), title: v } })} />
                                <InputField label="Button Text" value={form.cta?.buttonText} onChange={v => setForm({ ...form, cta: { ...(form.cta || {}), buttonText: v } })} />
                                <InputField label="Button Link" value={form.cta?.buttonLink} onChange={v => setForm({ ...form, cta: { ...(form.cta || {}), buttonLink: v } })} />
                                <div className="md:col-span-2"><InputField label="Subtitle" value={form.cta?.subtitle} onChange={v => setForm({ ...form, cta: { ...(form.cta || {}), subtitle: v } })} textarea /></div>
                            </div>
                        )}

                        <SectionHeader title="❓ FAQs" section="faqs" count={form.faqs?.length} expandedSection={expandedSection} toggleSection={toggleSection} isActive={form.activeSections?.faqs !== false} onToggleActive={v => setForm({ ...form, activeSections: { ...(form.activeSections || {}), faqs: v } })} />
                        {expandedSection === 'faqs' && (
                            <div className="p-4 bg-gray-50 rounded-xl space-y-3">
                                <InputField label="Section Title" value={form.faqsTitle} onChange={v => setForm({ ...form, faqsTitle: v })} />
                                {form.faqs?.map((f, i) => (
                                    <div key={i} className="bg-white p-3 rounded-lg border border-gray-100 space-y-2">
                                        <div className="flex gap-2 items-center">
                                            <span className="text-xs font-bold text-orange-600 w-8">Q{i + 1}</span>
                                            <input className="flex-1 border rounded-lg px-3 py-2 text-sm bg-gray-50" value={f.question} onChange={e => updateItem('faqs', i, 'question', e.target.value)} />
                                            <button onClick={() => removeItem('faqs', i)} className="text-red-400">✕</button>
                                        </div>
                                        <textarea className="w-full border rounded-lg px-3 py-2 text-sm bg-gray-50 resize-none" rows="2" value={f.answer} onChange={e => updateItem('faqs', i, 'answer', e.target.value)} />
                                    </div>
                                ))}
                                <button onClick={() => addItem('faqs')} className="text-orange-600 text-xs font-bold"><FiPlus /> Add FAQ</button>
                            </div>
                        )}
                    </div>

                    <div className="p-5 bg-gray-50 border-t flex justify-end gap-3">
                        <button onClick={() => setIsEditing(false)} className="px-5 py-2.5 text-gray-600 text-sm font-bold">Cancel</button>
                        <button onClick={handleSave} className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-indigo-500/30 transition-all"><FiSave /> Save Content</button>
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
                                <th className="w-[18%] text-left px-3 py-3 font-bold text-gray-600 text-xs uppercase tracking-wide">Page Name</th>
                                <th className="w-[10%] text-center px-1 py-3 font-bold text-gray-600 text-xs uppercase tracking-wide">Banner</th>
                                <th className="w-[10%] text-center px-1 py-3 font-bold text-gray-600 text-xs uppercase tracking-wide">Features</th>
                                <th className="w-[10%] text-center px-1 py-3 font-bold text-gray-600 text-xs uppercase tracking-wide">Insights</th>
                                <th className="w-[10%] text-center px-1 py-3 font-bold text-gray-600 text-xs uppercase tracking-wide">Doshas</th>
                                <th className="w-[10%] text-center px-1 py-3 font-bold text-gray-600 text-xs uppercase tracking-wide">Remedies</th>
                                <th className="w-[10%] text-center px-1 py-3 font-bold text-gray-600 text-xs uppercase tracking-wide">FAQs</th>
                                <th className="w-[10%] text-center px-1 py-3 font-bold text-gray-600 text-xs uppercase tracking-wide">Status</th>
                                <th className="w-[12%] text-right px-4 py-3 font-bold text-gray-600 text-xs uppercase tracking-wide">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dynamicSlugs.map(({ slug, label }) => {
                                const page = allPages.find(p => p.pageSlug === slug);
                                return (
                                    <tr key={slug} className={`border-b hover:bg-gray-50 transition-colors ${selectedSlug === slug ? 'bg-indigo-50/50' : ''}`}>
                                        <td className="px-3 py-3 font-bold text-gray-800 truncate" title={label}>{label}</td>
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
                                            {page?.features?.length ? <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{page.features.length}</span> : <span className="text-gray-300">—</span>}
                                        </td>
                                        <td className="text-center px-2 py-3">
                                            {page?.resultsSection?.title ? <span className="text-emerald-600 text-lg">●</span> : <span className="text-gray-300 text-lg">○</span>}
                                        </td>
                                        <td className="text-center px-2 py-3">
                                            {page?.doshasSection?.title ? <span className="text-emerald-600 text-lg">●</span> : <span className="text-gray-300 text-lg">○</span>}
                                        </td>
                                        <td className="text-center px-2 py-3">
                                            {page?.remediesSection?.title ? <span className="text-emerald-600 text-lg">●</span> : <span className="text-gray-300 text-lg">○</span>}
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
                                        <td className="text-right px-4 py-3">
                                            <div className="flex items-center justify-end gap-1">
                                                <button onClick={() => setViewData(page)} className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors" title="View Summary">
                                                    <FiEye size={16} />
                                                </button>
                                                <button onClick={() => { setSelectedSlug(slug); setIsEditing(true); }} className="p-1 text-indigo-600 hover:bg-indigo-50 rounded transition-colors" title="Edit">
                                                    <FiEdit2 size={16} />
                                                </button>
                                                {page && (
                                                    <button onClick={() => handleDelete(slug)} className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors" title="Delete">
                                                        <FiTrash2 size={16} />
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

            {viewData && (
                <div className="fixed inset-0 bg-black/60 z-[2000] flex items-center justify-center p-4 backdrop-blur-md" onClick={() => setViewData(null)}>
                    <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col relative" onClick={e => e.stopPropagation()}>
                        <div className="h-2 bg-gradient-to-r from-orange-400 to-indigo-600" />
                        <button onClick={() => setViewData(null)} className="absolute top-6 right-6 p-2 bg-gray-100 rounded-full hover:rotate-90 transition-all"><FiX /></button>
                        <div className="p-10 space-y-8 overflow-y-auto">
                            <div className="flex items-center gap-5">
                                <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center shadow-inner"><FiEye size={32} /></div>
                                <div><h3 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">{viewData.pageName}</h3><p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Divine Discovery Portal</p></div>
                            </div>
                            {viewData.hero.imageUrl && <div className="rounded-3xl overflow-hidden border aspect-[16/6] bg-gray-50"><img src={viewData.hero.imageUrl.startsWith('http') ? viewData.hero.imageUrl : `${BACKEND_URL}${viewData.hero.imageUrl}`} className="w-full h-full object-cover" /></div>}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100">
                                    <p className="text-[9px] font-black text-orange-600 uppercase tracking-widest mb-4">Hero Presence</p>
                                    <h4 className="text-xl font-bold text-gray-800 leading-tight mb-3">{viewData.hero.title} <span className="text-orange-600">{viewData.hero.highlightedTitle}</span></h4>
                                    <p className="text-xs text-gray-500 italic">"{viewData.hero.subtitle}"</p>
                                </div>
                                <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100">
                                    <p className="text-[9px] font-black text-orange-600 uppercase tracking-widest mb-6">Celestial Metrics</p>
                                    <div className="space-y-4">
                                        {[
                                            { l: 'Features', v: viewData.features?.length || 0, c: 'bg-emerald-50 text-emerald-600' },
                                            { l: 'Insights', v: viewData.resultsSection?.title ? 'YES' : 'NO', c: 'bg-blue-50 text-blue-600' },
                                            { l: 'Doshas', v: viewData.doshasSection?.title ? 'YES' : 'NO', c: 'bg-orange-50 text-orange-600' },
                                            { l: 'FAQs', v: viewData.faqs?.length || 0, c: 'bg-purple-50 text-purple-600' }
                                        ].map(s => (
                                            <div key={s.l} className="flex justify-between items-center"><span className="text-xs font-bold text-gray-400">{s.l}</span><span className={`px-4 py-1.5 rounded-xl text-xs font-black ${s.c}`}>{s.v}</span></div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-10 border-t flex justify-between items-center gap-6">
                            <p className="text-[9px] font-black text-gray-300">v3.5.0 Premium Divine Edition</p>
                            <button onClick={() => { setViewData(null); setSelectedSlug(viewData.pageSlug); setIsEditing(true); }} className="px-8 py-4 bg-gray-900 text-white rounded-2xl text-[10px] font-black tracking-widest uppercase hover:bg-orange-600 transition-all">Open Editor</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default KundliPageManager;
