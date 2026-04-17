import React, { useState, useEffect } from 'react';
import {
    useGetAllVastuPagesQuery,
    useUpsertVastuPageMutation,
    useDeleteVastuPageMutation,
    useSeedVastuDataMutation,
    useForceSeedVastuDataMutation,
    useUpdateVastuPageStatusMutation
} from '../../../../../services/vastuContentApi';
import { useGetNavbarItemsQuery } from '../../../../../services/navbarApi';
import { BACKEND_URL, getImageUrl } from '../../../../../config/apiConfig';
import {
    FiPlus, FiEdit2, FiTrash2, FiSave, FiX, FiDatabase, FiRefreshCw,
    FiChevronDown, FiChevronUp, FiEye, FiImage, FiCheckSquare,
    FiSquare, FiInfo, FiLayout, FiTag, FiClock
} from 'react-icons/fi';

const DEFAULT_SLUGS = [
    { slug: 'vastu-consultation', label: 'Vastu Consultation' },
    { slug: 'home-office-vastu', label: 'Home / Office Vastu' },
    { slug: 'feng-shui', label: 'Feng Shui' },
    { slug: 'gemstones', label: 'Gemstones' },
    { slug: 'rudraksha', label: 'Rudraksha' },
    { slug: 'yantra', label: 'Yantra' },
    { slug: 'energized-products', label: 'Energized Products' }
];

const emptyForm = {
    pageSlug: '',
    pageName: '',
    hero: { badge: 'DIVINE VASTU SERVICES', titleHighlight1: '', titleEnd: '', titleHighlight2: '', titleHighlight3: '', subtitle: '', imageUrl: '', imageAlt: '', buttons: [] },
    about: { badge: 'Ancient Science', title: 'What is', titleColored: 'Vastu Shastra?', subtitle: '', description: '', descriptionBold: '', image: '', imageAlt: '', imageOverlayBadge: '', imageOverlayText: '', points: [] },
    servicesSection: { badge: 'Expert Services', title: 'Our', titleColored: 'Vastu Services', services: [] },
    processSection: { badge: 'The Journey', title: 'How We', titleColored: 'Consult', steps: [] },
    benefitsSection: { badge: 'Life Changing Impact', title: 'Benefits Of', titleColored: 'Vastu Alignment', benefits: [] },
    pricingSection: { badge: 'Our Plans', title: 'Consultation', titleColored: 'Pricing', plans: [] },
    testimonialsSection: { badge: 'Success Stories', title: 'Client', titleColored: 'Reviews', reviews: [] },
    ctaSection: { badge: 'Preserving Tradition', title: 'Balance Your', titleColored: 'Divine Energy', subtitle: '', buttons: [] },
    isActive: true,
    activeSections: {
        about: true,
        services: true,
        process: true,
        benefits: true,
        pricing: true,
        testimonials: true,
        cta: true
    }
};

const SectionHeader = ({ title, section, count, expandedSection, toggleSection, isActive, onToggleActive }) => (
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

const VastuPageManager = () => {
    const { data: allPages = [], isLoading } = useGetAllVastuPagesQuery();
    const { data: navItems = [] } = useGetNavbarItemsQuery();
    const [upsertPage] = useUpsertVastuPageMutation();
    const [deletePage] = useDeleteVastuPageMutation();
    const [seedData, { isLoading: isSeeding }] = useSeedVastuDataMutation();
    const [forceSeed, { isLoading: isForceSeeding }] = useForceSeedVastuDataMutation();
    const [updateStatus] = useUpdateVastuPageStatusMutation();

    const [selectedSlug, setSelectedSlug] = useState('vastu-consultation');
    const [form, setForm] = useState(emptyForm);
    const [isEditing, setIsEditing] = useState(false);
    const [expandedSection, setExpandedSection] = useState('hero');
    const [toast, setToast] = useState('');
    const [heroImage, setHeroImage] = useState(null);
    const [aboutImage, setAboutImage] = useState(null);
    const [serviceImages, setServiceImages] = useState({}); // { index: File }

    const dynamicSlugs = React.useMemo(() => {
        const vastuItem = navItems?.find(item => item.label === 'Vastu' || item.title === 'Vastu');
        const navbarChildren = vastuItem?.children || [];
        const unique = [];
        const seen = new Set();
        const addToUnique = (label, href) => {
            if (!label) return;
            let slug = href 
                ? href.replace(/^\/vastu\//, '').replace(/\/$/, '').replace(/^#/, '').toLowerCase().trim()
                : label.toLowerCase().replace(/ /g, '-').replace(/\/$/, '').trim();
            
            if (slug && slug.length > 1 && !seen.has(slug)) {
                seen.add(slug);
                unique.push({ slug, label: label.trim() });
            }
        };
        navbarChildren.forEach(item => addToUnique(item.label || item.title, item.href));
        allPages.forEach(p => addToUnique(p.pageName, `/vastu/${p.pageSlug}`));
        DEFAULT_SLUGS.forEach(d => addToUnique(d.label, `/vastu/${d.slug}`));
        return unique;
    }, [navItems, allPages]);

    useEffect(() => {
        const page = allPages.find(p => p.pageSlug === selectedSlug);
        if (page) {
            setForm({ ...emptyForm, ...JSON.parse(JSON.stringify(page)) });
        } else {
            const label = dynamicSlugs.find(s => s.slug === selectedSlug)?.label || 'New Vastu Page';
            setForm({ ...emptyForm, pageSlug: selectedSlug, pageName: label });
        }
        setHeroImage(null);
        setAboutImage(null);
        setServiceImages({});
    }, [selectedSlug, allPages, dynamicSlugs]);

    const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

    const handleSave = async () => {
        try {
            const formData = new FormData();
            Object.keys(form).forEach(key => {
                if (typeof form[key] === 'object') formData.append(key, JSON.stringify(form[key]));
                else formData.append(key, form[key]);
            });
            if (heroImage) formData.append('heroImage', heroImage);
            if (aboutImage) formData.append('aboutImage', aboutImage);
            Object.entries(serviceImages).forEach(([idx, file]) => {
                formData.append(`serviceImage_${idx}`, file);
            });

            await upsertPage(formData).unwrap();
            showToast('✨ Vastu content saved successfully!');
            setIsEditing(false);
        } catch (err) { showToast('❌ Failed to save.'); }
    };

    const handleDelete = async (slug) => {
        if (window.confirm(`Delete content for "${dynamicSlugs.find(p => p.slug === slug)?.label}"?`)) {
            await deletePage(slug).unwrap();
            showToast('🗑️ Page content deleted');
        }
    };

    const handleToggleStatus = async (page) => {
        try {
            await updateStatus({ slug: page.pageSlug, isActive: !page.isActive }).unwrap();
            showToast(`✨ Page ${!page.isActive ? 'Activated' : 'Paused'}`);
        } catch (err) { showToast('❌ Status change failed'); }
    };

    const handleSeed = async () => { await seedData({ slugs: dynamicSlugs }).unwrap(); showToast('🌱 Default data seeded'); };
    const handleForceSeed = async () => { if (window.confirm('OVERWRITE all content?')) { await forceSeed({ slugs: dynamicSlugs }).unwrap(); showToast('🔄 All pages restored'); } };

    const toggleSection = (section) => setExpandedSection(expandedSection === section ? '' : section);

    const updateNested = (section, field, value) => {
        setForm({ ...form, [section]: { ...form[section], [field]: value } });
    };

    const updateArrayItem = (section, index, field, value) => {
        const key = section.replace('Section', '') || section;
        const newArr = [...form[section][key]];
        newArr[index] = { ...newArr[index], [field]: value };
        setForm({ ...form, [section]: { ...form[section], [key]: newArr } });
    };

    if (isLoading) return <div className="p-20 text-center font-black uppercase tracking-[0.3em] text-gray-300">Consulting Ancient Scripts...</div>;

    const existingPage = allPages.find(p => p.pageSlug === selectedSlug);

    return (
        <div className="p-6 max-w-6xl mx-auto">
            {toast && <div className="fixed top-6 right-6 z-50 bg-white shadow-2xl border border-indigo-100 px-6 py-3 rounded-xl text-sm font-bold text-gray-800 animate-fade-in-up">{toast}</div>}

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Vastu Pages <span className="text-orange-600">Manager</span></h1>
                    <p className="text-gray-500 mt-1 text-sm">Manage divine content across all vastu service pages</p>
                </div>
                <div className="flex gap-2">
                    <button onClick={handleSeed} disabled={isSeeding} className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700 disabled:opacity-50 shadow-sm transition-all active:scale-95"><FiDatabase /> Seed Missing</button>
                </div>
            </div>

            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6">
                <label className="block text-xs font-black text-gray-600 uppercase tracking-wide mb-2 ml-1">Select Page</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {dynamicSlugs.map(p => {
                        const exists = allPages.find(x => x.pageSlug === p.slug);
                        return (
                            <button
                                key={p.slug}
                                onClick={() => { setSelectedSlug(p.slug); setIsEditing(false); }}
                                className={`px-3 py-2.5 rounded-xl text-xs font-bold transition-all border ${selectedSlug === p.slug ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/30' : exists ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100' : 'bg-gray-50 text-gray-500 border border-gray-200 hover:bg-gray-100'}`}
                            >
                                {p.label}{exists && ' ✓'}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-6 flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-gray-800">{dynamicSlugs.find(p => p.slug === selectedSlug)?.label}</h2>
                    <p className="text-xs text-gray-500">{existingPage ? `Updated: ${new Date(existingPage.updatedAt).toLocaleString()}` : '/vastu/' + selectedSlug}</p>
                </div>
                <div className="flex gap-2">
                    <button onClick={() => setIsEditing(!isEditing)} className={`flex items-center gap-1.5 px-4 py-2 ${isEditing ? 'bg-gray-900' : 'bg-orange-600'} text-white rounded-lg text-xs font-bold transition-all active:scale-95 hover:shadow-lg`}>
                        {isEditing ? <><FiX /> Close</> : <><FiEdit2 /> Edit</>}
                    </button>
                    {existingPage && (
                        <>
                            <a href={`/vastu/${selectedSlug}`} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-bold hover:bg-indigo-100"><FiEye /> View</a>
                            <button onClick={() => handleDelete(selectedSlug)} className="flex items-center gap-1.5 px-4 py-2 bg-red-50 text-red-600 rounded-lg text-xs font-bold hover:bg-red-100"><FiTrash2 /> Delete</button>
                        </>
                    )}
                </div>
            </div>

            {isEditing && (
                <div className="bg-white rounded-2xl shadow-xl border border-indigo-100 mb-8 overflow-hidden animate-fade-in-up">
                    <div className="p-5 bg-gradient-to-r from-indigo-600 to-blue-600 text-white"><h3 className="font-bold text-lg">Editing: {form.pageName}</h3></div>
                    <div className="p-5 space-y-4">
                        {/* HERO SECTION */}
                        <SectionHeader title="🏠 Hero Section" section="hero" expandedSection={expandedSection} toggleSection={toggleSection} isActive={true} />
                        {expandedSection === 'hero' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-xl">
                                <InputField label="Badge text" value={form.hero.badge} onChange={v => updateNested('hero', 'badge', v)} />
                                <InputField label="Title Highlight 1" value={form.hero.titleHighlight1} onChange={v => updateNested('hero', 'titleHighlight1', v)} />
                                <InputField label="Title End" value={form.hero.titleEnd} onChange={v => updateNested('hero', 'titleEnd', v)} />
                                <InputField label="Title Highlight 2" value={form.hero.titleHighlight2} onChange={v => updateNested('hero', 'titleHighlight2', v)} />
                                <InputField label="Title Highlight 3" value={form.hero.titleHighlight3} onChange={v => updateNested('hero', 'titleHighlight3', v)} />
                                <div className="space-y-1.5">
                                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Banner Graphics</label>
                                    <div className="flex items-center gap-4 bg-white p-3 rounded-xl border border-gray-200 shadow-sm">
                                        <div className="w-24 h-16 bg-gray-200 rounded border flex items-center justify-center overflow-hidden relative group">
                                            {heroImage ? (
                                                <>
                                                    <img src={URL.createObjectURL(heroImage)} className="w-full h-full object-cover" />
                                                    <button type="button" onClick={() => setHeroImage(null)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-all shadow-sm"><FiX size={12}/></button>
                                                </>
                                            ) : form.hero.imageUrl ? (
                                                <>
                                                    <img src={getImageUrl(form.hero.imageUrl)} className="w-full h-full object-cover" />
                                                    <button type="button" onClick={() => setForm({...form, hero: {...form.hero, imageUrl: ''}})} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-all shadow-sm"><FiX size={12}/></button>
                                                </>
                                            ) : (
                                                <FiImage className="text-gray-400" />
                                            )}
                                        </div>
                                        <input type="file" onChange={e => setHeroImage(e.target.files[0])} className="text-xs file:bg-indigo-50 file:border-0 file:rounded-full file:px-4 file:py-2 file:text-indigo-700" />
                                    </div>
                                </div>
                                <div className="space-y-1.5"><InputField label="Hero Image Alt Tag" value={form.hero.imageAlt} onChange={v => updateNested('hero', 'imageAlt', v)} placeholder="e.g. Vastu Consultant at Home" /></div>
                                <div className="md:col-span-2"><InputField label="Divine Subtitle" value={form.hero.subtitle} onChange={v => updateNested('hero', 'subtitle', v)} textarea /></div>
                            </div>
                        )}

                        {/* ABOUT SECTION */}
                        <SectionHeader title="📜 About Section" section="about" expandedSection={expandedSection} toggleSection={toggleSection} isActive={form.activeSections.about} onToggleActive={v => setForm({ ...form, activeSections: { ...form.activeSections, about: v } })} />
                        {expandedSection === 'about' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-xl">
                                <InputField label="Section Badge" value={form.about.badge} onChange={v => updateNested('about', 'badge', v)} />
                                <InputField label="Regular Title" value={form.about.title} onChange={v => updateNested('about', 'title', v)} />
                                <InputField label="Colored Title" value={form.about.titleColored} onChange={v => updateNested('about', 'titleColored', v)} />
                                <div className="space-y-1.5">
                                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">About Visual</label>
                                    <div className="flex items-center gap-4 bg-white p-3 rounded-xl border border-gray-200">
                                        <div className="w-24 h-16 bg-gray-200 rounded border flex items-center justify-center overflow-hidden relative group">
                                            {aboutImage ? (
                                                <>
                                                    <img src={URL.createObjectURL(aboutImage)} className="w-full h-full object-cover" />
                                                    <button type="button" onClick={() => setAboutImage(null)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-all shadow-sm"><FiX size={12}/></button>
                                                </>
                                            ) : form.about.image ? (
                                                <>
                                                    <img src={getImageUrl(form.about.image)} className="w-full h-full object-cover" />
                                                    <button type="button" onClick={() => setForm({...form, about: {...form.about, image: ''}})} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-all shadow-sm"><FiX size={12}/></button>
                                                </>
                                            ) : (
                                                <FiImage className="text-gray-400" />
                                            )}
                                        </div>
                                        <input type="file" onChange={e => setAboutImage(e.target.files[0])} className="text-xs file:bg-indigo-50 file:border-0 file:rounded-full file:px-4 file:py-2 file:text-indigo-700" />
                                    </div>
                                </div>
                                <div className="space-y-1.5"><InputField label="About Image Alt Tag" value={form.about.imageAlt} onChange={v => updateNested('about', 'imageAlt', v)} placeholder="e.g. Detailed Vastu Blueprint" /></div>
                                <div className="md:col-span-2"><InputField label="Description" value={form.about.description} onChange={v => updateNested('about', 'description', v)} textarea /></div>
                                <div className="md:col-span-2"><InputField label="Bold Summary" value={form.about.descriptionBold} onChange={v => updateNested('about', 'descriptionBold', v)} textarea /></div>
                            </div>
                        )}

                        {/* SERVICES SECTION */}
                        <SectionHeader title="✨ Services Offering" section="services" count={form.servicesSection.services.length} expandedSection={expandedSection} toggleSection={toggleSection} isActive={form.activeSections.services} onToggleActive={v => setForm({ ...form, activeSections: { ...form.activeSections, services: v } })} />
                        {expandedSection === 'services' && (
                            <div className="p-4 bg-gray-50 rounded-xl space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
                                    <InputField label="H.Badge" value={form.servicesSection.badge} onChange={v => updateNested('servicesSection', 'badge', v)} />
                                    <InputField label="H.Title" value={form.servicesSection.title} onChange={v => updateNested('servicesSection', 'title', v)} />
                                    <InputField label="H.Colored" value={form.servicesSection.titleColored} onChange={v => updateNested('servicesSection', 'titleColored', v)} />
                                </div>
                                <div className="space-y-3">
                                    {form.servicesSection.services.map((svc, idx) => (
                                        <div key={idx} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm space-y-4">
                                            <div className="flex items-center justify-between border-b border-dashed border-gray-100 pb-2">
                                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Service Item {idx + 1}</h4>
                                                <button onClick={() => setForm({ ...form, servicesSection: { ...form.servicesSection, services: form.servicesSection.services.filter((_, i) => i !== idx) } })} className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-all"><FiTrash2 size={16} /></button>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <InputField label="Title" value={svc.title} onChange={v => updateArrayItem('servicesSection', idx, 'title', v)} />
                                                <InputField label="Icon Name" value={svc.iconName} onChange={v => updateArrayItem('servicesSection', idx, 'iconName', v)} placeholder="Home, Shield, Star" />
                                                <div className="md:col-span-2 space-y-1.5">
                                                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Service Illustration</label>
                                                    <div className="flex items-center gap-4 bg-gray-50/50 p-3 rounded-xl border border-gray-100">
                                                        <div className="w-20 h-14 bg-white rounded border flex items-center justify-center overflow-hidden flex-shrink-0 relative group">
                                                            {serviceImages[idx] ? (
                                                                <>
                                                                    <img src={URL.createObjectURL(serviceImages[idx])} className="w-full h-full object-cover" />
                                                                    <button type="button" onClick={() => setServiceImages({ ...serviceImages, [idx]: null })} className="absolute top-0.5 right-0.5 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-all shadow-sm"><FiX size={10}/></button>
                                                                </>
                                                            ) : svc.image ? (
                                                                <>
                                                                    <img src={getImageUrl(svc.image)} className="w-full h-full object-cover" />
                                                                    <button type="button" onClick={() => updateArrayItem('servicesSection', idx, 'image', '')} className="absolute top-0.5 right-0.5 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-all shadow-sm"><FiX size={10}/></button>
                                                                </>
                                                            ) : (
                                                                <FiImage className="text-gray-300" />
                                                            )}
                                                        </div>
                                                        <div className="flex-1 space-y-2">
                                                            <input type="file" onChange={e => setServiceImages({ ...serviceImages, [idx]: e.target.files[0] })} className="text-[10px] w-full file:bg-indigo-50 file:border-0 file:rounded-full file:px-3 file:py-1 file:text-[10px] file:font-black file:text-indigo-600 file:mr-2" />
                                                            <input className="w-full bg-transparent border-b border-gray-200 text-[10px] py-1 outline-none text-gray-500" value={svc.image || ''} onChange={e => updateArrayItem('servicesSection', idx, 'image', e.target.value)} placeholder="Or link image path here..." />
                                                            <input className="w-full bg-transparent border-b border-gray-200 text-[10px] py-1 outline-none text-gray-500" value={svc.imageAlt || ''} onChange={e => updateArrayItem('servicesSection', idx, 'imageAlt', e.target.value)} placeholder="Alt tag for SEO..." />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="md:col-span-2"><InputField label="Description" value={svc.desc} onChange={v => updateArrayItem('servicesSection', idx, 'desc', v)} /></div>
                                                <div className="md:col-span-2"><InputField label="Features (Comma Separated)" value={svc.features?.join(', ') || ''} onChange={v => updateArrayItem('servicesSection', idx, 'features', v.split(',').map(s => s.trim()))} /></div>
                                            </div>
                                        </div>
                                    ))}
                                    <button onClick={() => setForm({ ...form, servicesSection: { ...form.servicesSection, services: [...form.servicesSection.services, { title: '', desc: '', iconName: 'Star', features: [], imageAlt: '' }] } })} className="w-full py-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 font-bold text-xs uppercase tracking-widest hover:bg-gray-50 transition-all flex items-center justify-center gap-2"><FiPlus /> Add New Offering</button>
                                </div>
                            </div>
                        )}

                        {/* PROCESS SECTION */}
                        <SectionHeader title="🛤️ Consultation Process" section="process" count={form.processSection.steps.length} expandedSection={expandedSection} toggleSection={toggleSection} isActive={form.activeSections.process} onToggleActive={v => setForm({ ...form, activeSections: { ...form.activeSections, process: v } })} />
                        {expandedSection === 'process' && (
                            <div className="p-4 bg-gray-50 rounded-xl space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
                                    <InputField label="H.Badge" value={form.processSection.badge} onChange={v => updateNested('processSection', 'badge', v)} />
                                    <InputField label="H.Title" value={form.processSection.title} onChange={v => updateNested('processSection', 'title', v)} />
                                    <InputField label="H.Colored" value={form.processSection.titleColored} onChange={v => updateNested('processSection', 'titleColored', v)} />
                                </div>
                                <div className="space-y-4">
                                    {form.processSection.steps.map((step, idx) => (
                                        <div key={idx} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 items-center group transition-all">
                                            <div className="w-12 h-12 bg-indigo-600 text-white rounded-xl flex items-center justify-center font-black text-lg">{idx + 1}</div>
                                            <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                                                <InputField label="Title" value={step.title} onChange={v => updateArrayItem('processSection', idx, 'title', v)} />
                                                <InputField label="Tag" value={step.subtitle} onChange={v => updateArrayItem('processSection', idx, 'subtitle', v)} />
                                                <InputField label="Summary" value={step.description} onChange={v => updateArrayItem('processSection', idx, 'description', v)} />
                                                <InputField label="Icon" value={step.iconName} onChange={v => updateArrayItem('processSection', idx, 'iconName', v)} />
                                            </div>
                                            <button onClick={() => setForm({ ...form, processSection: { ...form.processSection, steps: form.processSection.steps.filter((_, i) => i !== idx) } })} className="text-red-300 hover:text-red-500 transition-colors p-2"><FiTrash2 size={20} /></button>
                                        </div>
                                    ))}
                                    <button onClick={() => setForm({ ...form, processSection: { ...form.processSection, steps: [...form.processSection.steps, { number: (form.processSection.steps.length + 1).toString(), title: '', subtitle: '', description: '', iconName: 'ArrowRight' }] } })} className="w-full py-4 bg-white border border-gray-100 rounded-xl text-indigo-500 text-xs font-bold uppercase tracking-widest hover:bg-gray-50 transition-all shadow-sm">
                                        <FiPlus className="inline mr-2" /> Add Process Step
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* BENEFITS SECTION */}
                        <SectionHeader title="💎 Vastu Benefits" section="benefits" count={form.benefitsSection.benefits.length} expandedSection={expandedSection} toggleSection={toggleSection} isActive={form.activeSections.benefits} onToggleActive={v => setForm({ ...form, activeSections: { ...form.activeSections, benefits: v } })} />
                        {expandedSection === 'benefits' && (
                            <div className="p-4 bg-gray-50 rounded-xl space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
                                    <InputField label="Badge" value={form.benefitsSection.badge} onChange={v => updateNested('benefitsSection', 'badge', v)} />
                                    <InputField label="Title" value={form.benefitsSection.title} onChange={v => updateNested('benefitsSection', 'title', v)} />
                                    <InputField label="Colored" value={form.benefitsSection.titleColored} onChange={v => updateNested('benefitsSection', 'titleColored', v)} />
                                </div>
                                <div className="grid md:grid-cols-2 gap-4">
                                    {form.benefitsSection.benefits.map((benefit, idx) => (
                                        <div key={idx} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm relative group">
                                            <button onClick={() => setForm({ ...form, benefitsSection: { ...form.benefitsSection, benefits: form.benefitsSection.benefits.filter((_, i) => i !== idx) } })} className="absolute top-2 right-2 text-red-300 hover:text-red-500"><FiTrash2 /></button>
                                            <div className="grid gap-3">
                                                <div className="grid grid-cols-2 gap-3">
                                                    <InputField label="Title" value={benefit.title} onChange={v => updateArrayItem('benefitsSection', idx, 'title', v)} />
                                                    <InputField label="Icon" value={benefit.iconName} onChange={v => updateArrayItem('benefitsSection', idx, 'iconName', v)} />
                                                </div>
                                                <InputField label="Summary" value={benefit.desc} onChange={v => updateArrayItem('benefitsSection', idx, 'desc', v)} textarea />
                                            </div>
                                        </div>
                                    ))}
                                    <button onClick={() => setForm({ ...form, benefitsSection: { ...form.benefitsSection, benefits: [...form.benefitsSection.benefits, { title: '', desc: '', iconName: 'Sparkle' }] } })} className="md:col-span-2 py-4 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 font-bold text-xs uppercase tracking-widest hover:bg-white transition-all"><FiPlus className="inline mr-1" /> Add Benefit Card</button>
                                </div>
                            </div>
                        )}

                        {/* PRICING SECTION */}
                        <SectionHeader title="💰 Exchange Models" section="pricing" count={form.pricingSection.plans.length} expandedSection={expandedSection} toggleSection={toggleSection} isActive={form.activeSections.pricing} onToggleActive={v => setForm({ ...form, activeSections: { ...form.activeSections, pricing: v } })} />
                        {expandedSection === 'pricing' && (
                            <div className="p-4 bg-gray-50 rounded-xl space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
                                    <InputField label="Badge" value={form.pricingSection.badge} onChange={v => updateNested('pricingSection', 'badge', v)} />
                                    <InputField label="Title" value={form.pricingSection.title} onChange={v => updateNested('pricingSection', 'title', v)} />
                                    <InputField label="Colored" value={form.pricingSection.titleColored} onChange={v => updateNested('pricingSection', 'titleColored', v)} />
                                </div>
                                <div className="space-y-3">
                                    {form.pricingSection.plans.map((plan, idx) => (
                                        <div key={idx} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm grid md:grid-cols-5 gap-4 items-end">
                                            <InputField label="Plan Name" value={plan.name} onChange={v => updateArrayItem('pricingSection', idx, 'name', v)} />
                                            <InputField label="Price (₹)" value={plan.price} onChange={v => updateArrayItem('pricingSection', idx, 'price', v)} />
                                            <InputField label="Duration" value={plan.duration} onChange={v => updateArrayItem('pricingSection', idx, 'duration', v)} />
                                            <InputField label="Icon" value={plan.iconName} onChange={v => updateArrayItem('pricingSection', idx, 'iconName', v)} />
                                            <div className="flex gap-2">
                                                <div className="flex-1"><InputField label="Short Desc" value={plan.desc} onChange={v => updateArrayItem('pricingSection', idx, 'desc', v)} /></div>
                                                <button onClick={() => setForm({ ...form, pricingSection: { ...form.pricingSection, plans: form.pricingSection.plans.filter((_, i) => i !== idx) } })} className="text-red-500 p-2"><FiTrash2 /></button>
                                            </div>
                                        </div>
                                    ))}
                                    <button onClick={() => setForm({ ...form, pricingSection: { ...form.pricingSection, plans: [...form.pricingSection.plans, { name: '', price: '', duration: '', iconName: 'IndianRupee', desc: '' }] } })} className="w-full py-3 bg-white border border-gray-100 rounded-xl text-indigo-600 font-bold text-xs uppercase transition-all shadow-sm"><FiPlus className="inline mr-1" /> Append Pricing Tier</button>
                                </div>
                            </div>
                        )}

                        {/* TESTIMONIALS SECTION */}
                        <SectionHeader title="💬 Client Reviews" section="testimonials" count={form.testimonialsSection.reviews.length} expandedSection={expandedSection} toggleSection={toggleSection} isActive={form.activeSections.testimonials} onToggleActive={v => setForm({ ...form, activeSections: { ...form.activeSections, testimonials: v } })} />
                        {expandedSection === 'testimonials' && (
                            <div className="p-4 bg-gray-50 rounded-xl space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
                                    <InputField label="Badge" value={form.testimonialsSection.badge} onChange={v => updateNested('testimonialsSection', 'badge', v)} />
                                    <InputField label="Title" value={form.testimonialsSection.title} onChange={v => updateNested('testimonialsSection', 'title', v)} />
                                    <InputField label="Colored" value={form.testimonialsSection.titleColored} onChange={v => updateNested('testimonialsSection', 'titleColored', v)} />
                                </div>
                                <div className="grid md:grid-cols-2 gap-4">
                                    {form.testimonialsSection.reviews.map((rev, idx) => (
                                        <div key={idx} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm space-y-3 relative">
                                            <button onClick={() => setForm({ ...form, testimonialsSection: { ...form.testimonialsSection, reviews: form.testimonialsSection.reviews.filter((_, i) => i !== idx) } })} className="absolute top-2 right-2 text-red-300 hover:text-red-500"><FiTrash2 /></button>
                                            <InputField label="Review quote" value={rev.quote} onChange={v => updateArrayItem('testimonialsSection', idx, 'quote', v)} textarea />
                                            <div className="grid grid-cols-2 gap-4">
                                                <InputField label="Author Name" value={rev.author} onChange={v => updateArrayItem('testimonialsSection', idx, 'author', v)} />
                                                <InputField label="Author Role" value={rev.role} onChange={v => updateArrayItem('testimonialsSection', idx, 'role', v)} />
                                            </div>
                                        </div>
                                    ))}
                                    <button onClick={() => setForm({ ...form, testimonialsSection: { ...form.testimonialsSection, reviews: [...form.testimonialsSection.reviews, { quote: '', author: '', role: '' }] } })} className="md:col-span-2 py-4 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 font-bold text-xs uppercase tracking-widest hover:bg-white transition-all"><FiPlus className="inline mr-1" /> Log New Feedback</button>
                                </div>
                            </div>
                        )}

                        {/* CTA SECTION */}
                        <SectionHeader title="📞 CTA Section" section="cta" expandedSection={expandedSection} toggleSection={toggleSection} isActive={form.activeSections.cta} onToggleActive={v => setForm({ ...form, activeSections: { ...form.activeSections, cta: v } })} />
                        {expandedSection === 'cta' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-xl">
                                <InputField label="Badge" value={form.ctaSection.badge} onChange={v => updateNested('ctaSection', 'badge', v)} />
                                <InputField label="Title" value={form.ctaSection.title} onChange={v => updateNested('ctaSection', 'title', v)} />
                                <InputField label="Colored Title" value={form.ctaSection.titleColored} onChange={v => updateNested('ctaSection', 'titleColored', v)} />
                                <div className="md:col-span-2"><InputField label="Subtitle" value={form.ctaSection.subtitle} onChange={v => updateNested('ctaSection', 'subtitle', v)} textarea /></div>
                            </div>
                        )}
                    </div>

                    <div className="p-5 bg-gray-50 border-t flex justify-end gap-3">
                        <button onClick={() => setIsEditing(false)} className="px-5 py-2.5 text-gray-600 text-sm font-bold">Cancel</button>
                        <button onClick={handleSave} className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-indigo-500/30 transition-all active:scale-95"><FiSave /> Save Content</button>
                    </div>
                </div>
            )}

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mt-8">
                <div className="p-5 border-b bg-gradient-to-r from-gray-50 to-white flex justify-between items-center">
                    <h3 className="font-bold text-gray-800 flex items-center gap-2 uppercase tracking-tight"><FiLayout className="text-orange-500" /> Vastu Content Catalog</h3>
                    <div className="bg-white px-4 py-1.5 rounded-full border border-gray-200">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                            Total {dynamicSlugs.length} Pages
                        </span>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b">
                                <th className="text-left px-5 py-3 font-bold text-gray-600 text-xs uppercase tracking-wide w-1/3">Portal Identity</th>
                                <th className="text-center px-4 py-3 font-bold text-gray-600 text-xs uppercase tracking-wide">Assets</th>
                                <th className="text-center px-4 py-3 font-bold text-gray-600 text-xs uppercase tracking-wide">Services</th>
                                <th className="text-center px-4 py-3 font-bold text-gray-600 text-xs uppercase tracking-wide">Benefits</th>
                                <th className="text-center px-4 py-3 font-bold text-gray-600 text-xs uppercase tracking-wide">Plans</th>
                                <th className="text-center px-4 py-3 font-bold text-gray-600 text-xs uppercase tracking-wide">Reviews</th>
                                <th className="text-center px-4 py-3 font-bold text-gray-600 text-xs uppercase tracking-wide">Status</th>
                                <th className="text-right px-11 py-3 font-bold text-gray-600 text-xs uppercase tracking-wide">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dynamicSlugs.map(({ slug, label }) => {
                                const page = allPages.find(p => p.pageSlug === slug);
                                return (
                                    <tr key={slug} className={`border-b hover:bg-gray-50/50 transition-all ${selectedSlug === slug ? 'bg-indigo-50/50' : ''}`}>
                                        <td className="px-5 py-4">
                                            <p className="font-bold text-gray-800 uppercase tracking-tight text-sm">{label}</p>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">/vastu/{slug}</p>
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="flex justify-center gap-2">
                                                <div className={`w-8 h-6 rounded ${page?.hero?.imageUrl ? 'bg-indigo-50 text-indigo-600 border border-indigo-100' : 'bg-gray-50 text-gray-200 border border-gray-100'} flex items-center justify-center`} title="Hero Graphic"><FiImage size={12} /></div>
                                                <div className={`w-8 h-6 rounded ${page?.about?.image ? 'bg-orange-50 text-orange-600 border border-orange-100' : 'bg-gray-50 text-gray-200 border border-gray-100'} flex items-center justify-center`} title="About Philosophy Graphic"><FiImage size={12} /></div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-center">
                                            <span className={`text-[11px] font-black ${page?.servicesSection?.services?.length ? 'text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full' : 'text-gray-300'}`}>{page?.servicesSection?.services?.length || 0}</span>
                                        </td>
                                        <td className="px-4 py-4 text-center">
                                            <span className={`text-[11px] font-black ${page?.benefitsSection?.benefits?.length ? 'text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full' : 'text-gray-300'}`}>{page?.benefitsSection?.benefits?.length || 0}</span>
                                        </td>
                                        <td className="px-4 py-4 text-center">
                                            <span className={`text-[11px] font-black ${page?.pricingSection?.plans?.length ? 'text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full' : 'text-gray-300'}`}>{page?.pricingSection?.plans?.length || 0}</span>
                                        </td>
                                        <td className="px-4 py-4 text-center">
                                            <span className={`text-[11px] font-black ${page?.testimonialsSection?.reviews?.length ? 'text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full' : 'text-gray-300'}`}>{page?.testimonialsSection?.reviews?.length || 0}</span>
                                        </td>
                                        <td className="px-4 py-4 text-center">
                                            <button onClick={() => page && handleToggleStatus(page)} className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300" style={{ backgroundColor: page?.isActive ? '#22c55e' : '#d1d5db' }}>
                                                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-all ${page?.isActive ? 'translate-x-6' : 'translate-x-1'}`} />
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                <a href={`/vastu/${slug}`} target="_blank" rel="noreferrer" className="p-2 text-indigo-600 hover:bg-indigo-50 rounded transition-colors" title="View"><FiEye size={18} /></a>
                                                <button onClick={() => { setSelectedSlug(slug); setIsEditing(true); }} className="p-2 text-orange-600 hover:bg-orange-50 rounded transition-colors" title="Edit"><FiEdit2 size={18} /></button>
                                                {page && <button onClick={() => handleDelete(slug)} className="p-2 text-red-500 hover:bg-red-50 rounded transition-colors" title="Delete"><FiTrash2 size={18} /></button>}
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default VastuPageManager;
