import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    FiPlus, FiEdit2, FiTrash2, FiSave, FiX, FiDatabase,
    FiChevronDown, FiChevronUp, FiEye, FiBookOpen, FiCheckCircle, FiStar, FiUsers, FiAward, FiUploadCloud, FiFilm, FiImage
} from 'react-icons/fi';
import {
    useGetLearningPageBySlugQuery,
    useGetLearningOverviewQuery,
    useUpdatePageSettingsMutation,
    useUpdatePortalStatusMutation,
    useCreateLearningItemMutation,
    useUpdateLearningItemMutation,
    useDeleteLearningItemMutation,
    useSeedLearningHubMutation,
    useUploadLearningImageMutation,
    useDeleteLearningMediaMutation
} from '../../../../../services/learningContentApi';
import { toast } from 'react-toastify';
import { BACKEND_URL } from '../../../../../config/apiConfig';

const COURSE_CATEGORIES = [
    { id: 'astrology', label: 'Astrology Courses' },
    { id: 'puja-vidhi', label: 'Puja Vidhi Guides' },
    { id: 'mantra', label: 'Mantra Chanting' }
];

const SectionHeader = ({ title, section, count, expandedSection, toggleSection }) => (
    <button onClick={() => toggleSection(section)} className={`w-full flex items-center justify-between p-4 rounded-xl transition-all border ${expandedSection === section ? 'bg-orange-600 text-white shadow-lg border-orange-600' : 'bg-gray-50 text-gray-700 border-gray-100 hover:bg-gray-100'}`}>
        <span className="font-black uppercase tracking-widest text-xs flex items-center gap-2">
            {title}
            {count !== undefined && <span className={`text-[10px] px-2 py-0.5 rounded-full font-black ${expandedSection === section ? 'bg-white/20 text-white' : 'bg-orange-100 text-orange-700'}`}>{count}</span>}
        </span>
        {expandedSection === section ? <FiChevronUp /> : <FiChevronDown />}
    </button>
);

const InputField = ({ label, value, onChange, placeholder, textarea }) => (
    <div className="space-y-1.5">
        <label className="block text-[10px] font-black text-gray-700 uppercase tracking-widest ml-1">{label}</label>
        {textarea ? (
            <textarea className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all shadow-sm" rows="3" value={value || ''} onChange={e => onChange(e.target.value)} placeholder={placeholder} />
        ) : (
            <input className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all shadow-sm" value={value || ''} onChange={e => onChange(e.target.value)} placeholder={placeholder} />
        )}
    </div>
);

const CourseManager = () => {
    const { type: urlSlug } = useParams();
    const navigate = useNavigate();
    const validSlug = (urlSlug && urlSlug !== 'undefined') ? urlSlug : 'astrology';
    const selectedSlug = validSlug;

    const { data: pageData, isLoading: pageLoading } = useGetLearningPageBySlugQuery(selectedSlug, {
        skip: selectedSlug === 'undefined' || !selectedSlug,
        pollingInterval: 3000,
    });
    const { data: overviewResponse } = useGetLearningOverviewQuery(undefined, { pollingInterval: 3000 });

    const [updateSettings] = useUpdatePageSettingsMutation();
    const [updateStatus] = useUpdatePortalStatusMutation();
    const [createItem] = useCreateLearningItemMutation();
    const [updateItem] = useUpdateLearningItemMutation();
    const [deleteItem] = useDeleteLearningItemMutation();
    const [seedHub, { isLoading: isSeeding }] = useSeedLearningHubMutation();
    const [uploadLearningImage] = useUploadLearningImageMutation();
    const [deleteLearningMedia] = useDeleteLearningMediaMutation();

    const [isEditing, setIsEditing] = useState(false);
    const [expandedSection, setExpandedSection] = useState('branding');
    const [viewData, setViewData] = useState(null);

    // Form States
    const [brandingForm, setBrandingForm] = useState({ badge: '', title: '', subtitle: '', highlightText: '', image: '', imageAlt: '' });
    const [benefits, setBenefits] = useState([]);
    const [testimonials, setTestimonials] = useState([]);
    const [faqs, setFaqs] = useState([]);
    const [categories, setCategories] = useState([]);
    const [ctaForm, setCtaForm] = useState({ badge: '', title: '', description: '', primaryBtnText: '', secondaryBtnText: '', trustBadges: '' });

    // Single Course Modal State
    const [itemForm, setItemForm] = useState({ title: '', duration: '', price: '', level: 'Beginner', category: 'beginner', students: 0, rating: 5, description: '', modules: '', imageAlt: '' });
    const [itemImage, setItemImage] = useState(null);
    const [editingItemId, setEditingItemId] = useState(null);

    useEffect(() => {
        if (pageData) {
            setBrandingForm({
                badge: pageData.introSection?.badge || '',
                title: pageData.introSection?.title || '',
                subtitle: pageData.introSection?.subtitle || '',
                highlightText: pageData.introSection?.highlightText || '',
                image: pageData.introSection?.image || '',
                imageAlt: pageData.introSection?.imageAlt || ''
            });
            setBenefits(pageData.benefits || []);
            setTestimonials(pageData.testimonials || []);
            setFaqs(pageData.faqs || []);
            setCategories(pageData.categories || []);
            setCtaForm({
                badge: pageData.ctaSection?.badge || 'Begin Your Cosmic Journey',
                title: pageData.ctaSection?.title || 'Ready to Begin Your Journey?',
                description: pageData.ctaSection?.description || 'Join thousands of students who have transformed their lives through ancient Vedic wisdom.',
                primaryBtnText: pageData.ctaSection?.primaryBtnText || 'Browse All Courses',
                secondaryBtnText: pageData.ctaSection?.secondaryBtnText || 'Free Consultation',
                trustBadges: pageData.ctaSection?.trustBadges?.join(', ') || '30-day money-back guarantee, Lifetime access to course materials, Certificate included'
            });
        }
    }, [pageData]);

    const toggleSection = (s) => setExpandedSection(expandedSection === s ? '' : s);

    const handleSavePageSettings = async () => {
        try {
            await updateSettings({
                slug: selectedSlug,
                settings: {
                    introSection: { ...pageData.introSection, ...brandingForm },
                    benefits,
                    testimonials,
                    faqs: faqs.map(f => ({ question: f.question || f.q, answer: f.answer || f.a })),
                    categories,
                    ctaSection: {
                        ...ctaForm,
                        trustBadges: ctaForm.trustBadges.split(',').map(b => b.trim()).filter(b => b)
                    }
                }
            }).unwrap();
            toast.success('✨ Page configuration preserved!');
            setIsEditing(false);
        } catch (err) { toast.error('❌ Failed to save settings'); }
    };

    const handleToggleStatus = async (slug, currentStatus) => {
        try {
            await updateStatus({ slug, isActive: !currentStatus }).unwrap();
            toast.success(`✨ ${slug} portal ${!currentStatus ? 'Activated' : 'Deactivated'}`);
        } catch (err) { toast.error('❌ Status toggle failed'); }
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('image', file);
            try {
                const res = await uploadLearningImage(formData).unwrap();
                // Set both the source and a default alt if none exists
                setBrandingForm(prev => ({ 
                    ...prev, 
                    image: res.imageUrl,
                    imageAlt: prev.imageAlt || `Visual for ${selectedSlug} portal`
                }));
                toast.success('🖼️ Image uploaded successfully!');
            } catch (err) {
                toast.error('❌ Failed to upload image');
            }
        }
    };

    const handleRemoveBrandingMedia = async (e) => {
        e.stopPropagation();
        const oldPath = brandingForm.image;
        if (oldPath && window.confirm("Completely purge this media from existence?")) {
            try {
                // 1. Physically delete file
                await deleteLearningMedia(oldPath).unwrap();
                // 2. Clear local state
                setBrandingForm(prev => ({ ...prev, image: '', imageAlt: '' }));
                // 3. Immediately sync database
                await updateSettings({
                    slug: selectedSlug,
                    settings: {
                        introSection: { ...pageData.introSection, image: '', imageAlt: '' }
                    }
                }).unwrap();
                toast.success("Media purged and connection severed.");
            } catch (err) { toast.error("Vibrational interference during purge."); }
        } else if (!oldPath) {
            setBrandingForm(prev => ({ ...prev, image: '', imageAlt: '' }));
        }
    };

    const handleSeed = async () => {
        try {
            await seedHub().unwrap();
            toast.success('🌱 Seeds planted successfully!');
        } catch (err) { toast.error('❌ Seed failed'); }
    };

    const handleSaveItemEntry = async () => {
        try {
            const formData = new FormData();
            Object.keys(itemForm).forEach(k => formData.append(k, itemForm[k]));
            if (itemImage) formData.append('image', itemImage);

            if (editingItemId) {
                await updateItem({ slug: selectedSlug, itemId: editingItemId, formData }).unwrap();
                toast.success('✨ Entry updated!');
            } else {
                await createItem({ slug: selectedSlug, formData }).unwrap();
                toast.success('✨ New path established!');
            }

            resetItemForm();
        } catch (err) { toast.error('❌ Failed to save entry'); }
    };

    const resetItemForm = () => {
        setItemForm({ title: '', duration: '8 Weeks', price: '', level: 'Beginner', students: '', rating: 5, category: 'beginner', description: '', modules: '', image: '', imageAlt: '' });
        setItemImage(null);
        setEditingItemId(null);
    };

    const handleEditItem = (item) => {
        setItemForm({
            title: item.title,
            duration: item.duration,
            price: item.price,
            level: item.level,
            category: item.category,
            students: item.students,
            rating: item.rating,
            description: item.description,
            modules: (item.modules || []).join(', '),
            image: item.image || '',
            imageAlt: item.imageAlt || ''
        });
        setEditingItemId(item._id);
        window.scrollTo({ top: 400, behavior: 'smooth' });
    };

    const allPortals = overviewResponse?.data || [];
    const activePageSummary = allPortals.find(p => p.slug === selectedSlug);

    if (pageLoading) return <div className="p-20 text-center font-black uppercase tracking-[0.3em] text-gray-300">Synchronizing Sacred Knowledge...</div>;

    return (
        <div className="p-6 max-w-6xl mx-auto">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Learning Hub <span className="text-orange-600">Manager</span></h1>
                    <p className="text-gray-500 mt-1 text-sm">Orchestrate educational content for Astrology, Puja Vidhi and Sacred Mantras</p>
                </div>
                <div className="flex gap-2">
                    <button onClick={handleSeed} className="flex items-center gap-1.5 px-4 py-2 bg-[#10b981] text-white rounded-lg text-xs font-bold hover:bg-emerald-700 transition-all"><FiDatabase /> Seed Data</button>
                </div>
            </div>

            {/* Selector */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6">
                <label className="block text-xs font-black text-gray-600 uppercase tracking-wide mb-2">Select category</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {COURSE_CATEGORIES.map(cat => {
                        const summary = allPortals.find(x => x.slug === cat.id);
                        return (
                            <button
                                key={cat.id}
                                onClick={() => { navigate(`/admin-acharya/dashboard/content/learn/${cat.id}`); setIsEditing(false); }}
                                className={`px-4 py-3 rounded-xl text-xs font-bold transition-all border flex items-center justify-between ${selectedSlug === cat.id ? 'bg-orange-600 text-white shadow-lg border-orange-600' : (summary?.itemCount > 0 ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100' : 'bg-gray-50 text-gray-500 border border-gray-200 hover:bg-gray-100')}`}
                            >
                                {cat.label} {summary?.itemCount > 0 && <FiCheckCircle />}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Status Bar */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-6 flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-gray-800 uppercase tracking-tight">{COURSE_CATEGORIES.find(c => c.id === selectedSlug)?.label}</h2>
                    <p className="text-xs text-gray-500">{activePageSummary?.updatedAt ? `Last Sync: ${new Date(activePageSummary.updatedAt).toLocaleDateString()}` : 'No content established yet'}</p>
                </div>
                <div className="flex gap-2">
                    <button onClick={() => setIsEditing(!isEditing)} className="flex items-center gap-1.5 px-4 py-2 bg-orange-600 text-white rounded-lg text-xs font-bold shadow-sm">{isEditing ? <><FiX /> Close Editor</> : <><FiEdit2 /> Edit Content</>}</button>
                </div>
            </div>

            {isEditing && (
                <div className="bg-white rounded-2xl shadow-xl border border-orange-100 mb-8 overflow-hidden animate-fade-in-up">
                    <div className="p-5 bg-gradient-to-r from-orange-600 to-red-600 text-white flex justify-between items-center">
                        <h3 className="font-bold text-lg uppercase tracking-tight">Orchestrating: {selectedSlug}</h3>
                    </div>
                    <div className="p-5 space-y-4">
                        <SectionHeader title="✨ Brand Identity" section="branding" expandedSection={expandedSection} toggleSection={toggleSection} />
                        {expandedSection === 'branding' && (
                            <div className="p-4 bg-gray-50 rounded-xl space-y-4 font-bold">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <InputField label="Hub Badge" value={brandingForm.badge} onChange={v => setBrandingForm({ ...brandingForm, badge: v })} />
                                    <InputField label="Headline Title" value={brandingForm.title} onChange={v => setBrandingForm({ ...brandingForm, title: v })} />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <InputField label="Subtitle" value={brandingForm.subtitle} onChange={v => setBrandingForm({ ...brandingForm, subtitle: v })} textarea />
                                    <InputField label="Highlight Text" value={brandingForm.highlightText} onChange={v => setBrandingForm({ ...brandingForm, highlightText: v })} textarea />
                                    <InputField label="Image Alt Tag (SEO)" value={brandingForm.imageAlt} onChange={v => setBrandingForm({ ...brandingForm, imageAlt: v })} placeholder="e.g. Master Astrology Mentor in session" />
                                </div>
                                <div className="grid grid-cols-1 gap-4">
                                    <div>
                                        <label className="block text-[11px] font-black text-[#4A3427] uppercase tracking-widest mb-2">Section Media</label>
                                        <div className="border-2 border-dashed border-orange-200 rounded-2xl p-5 bg-gradient-to-br from-orange-50/50 to-amber-50/30 hover:from-orange-50 hover:to-amber-50 hover:border-orange-400 transition-all duration-300 cursor-pointer relative group">
                                            {brandingForm.image ? (
                                                <div className="flex items-center gap-4">
                                                    <div className="w-20 h-20 rounded-xl overflow-hidden border-2 border-orange-200 shadow-md flex-shrink-0 bg-white">
                                                        {(() => {
                                                            const mediaSrc = brandingForm.image?.startsWith('http') ? brandingForm.image : `${BACKEND_URL}${brandingForm.image}`;
                                                            return brandingForm.image?.match(/\.(mp4|webm|ogg)$/i)
                                                                ? <video src={mediaSrc} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                                                                : <img src={mediaSrc} alt={brandingForm.imageAlt || "Portal Preview"} className="w-full h-full object-cover" />;
                                                        })()}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-xs font-black text-gray-800 truncate">Current Media</p>
                                                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1">{brandingForm.image?.match(/\.(mp4|webm|ogg)$/i) ? 'Video File' : 'Image File'}</p>
                                                        <button 
                                                            onClick={handleRemoveBrandingMedia} 
                                                            className="mt-2 text-[9px] font-black text-red-500 uppercase tracking-widest hover:text-red-700 transition-colors flex items-center gap-1"
                                                        >
                                                            <FiX size={10} /> Remove Media
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="flex flex-col items-center justify-center py-3">
                                                    <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-2 group-hover:bg-orange-200 group-hover:scale-110 transition-all duration-300">
                                                        <FiUploadCloud className="w-6 h-6 text-orange-500" />
                                                    </div>
                                                    <p className="text-xs font-black text-gray-700 uppercase tracking-wide mb-1">Upload Section Media</p>
                                                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-2">Click to browse files</p>
                                                    <div className="flex items-center gap-2">
                                                        <span className="flex items-center gap-1 px-2.5 py-1 bg-white border border-orange-100 rounded-full text-[8px] font-black text-orange-600 uppercase tracking-widest shadow-sm"><FiImage size={10} /> Images</span>
                                                        <span className="flex items-center gap-1 px-2.5 py-1 bg-white border border-purple-100 rounded-full text-[8px] font-black text-purple-600 uppercase tracking-widest shadow-sm"><FiFilm size={10} /> Videos</span>
                                                    </div>
                                                </div>
                                            )}
                                            <input 
                                                type="file" 
                                                accept="image/*,video/*" 
                                                onChange={handleImageUpload} 
                                                className={`absolute inset-0 opacity-0 cursor-pointer ${brandingForm.image ? 'pointer-events-none' : 'z-10'}`} 
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <SectionHeader title="🎓 Education Artifacts" section="inventory" count={pageData?.items?.length} expandedSection={expandedSection} toggleSection={toggleSection} />
                        {expandedSection === 'inventory' && (
                            <div className="p-4 bg-gray-50 rounded-xl space-y-6">
                                {/* Add Item Form */}
                                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                                    <h3 className="font-black text-gray-800 uppercase text-xs tracking-[0.2em] border-b pb-4">{editingItemId ? 'Refine' : 'Establish'} <span className="text-orange-600">Learning Path</span></h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-4">
                                            <InputField label="Path Title" value={itemForm.title} onChange={v => setItemForm({ ...itemForm, title: v })} />
                                            <div className="grid grid-cols-2 gap-2">
                                                <InputField label="Duration" value={itemForm.duration} onChange={v => setItemForm({ ...itemForm, duration: v })} />
                                                <InputField label="Base Price (₹)" value={itemForm.price} onChange={v => setItemForm({ ...itemForm, price: v })} />
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="grid grid-cols-2 gap-2">
                                                <div className="space-y-1.5">
                                                    <label className="block text-[10px] font-black text-gray-700 uppercase tracking-widest ml-1">Path Level</label>
                                                    <select value={itemForm.level} onChange={e => setItemForm({ ...itemForm, level: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white outline-none">
                                                        <option value="Beginner">Beginner</option>
                                                        <option value="Professional">Professional</option>
                                                        <option value="Spiritual">Spiritual</option>
                                                    </select>
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="block text-[10px] font-black text-gray-700 uppercase tracking-widest ml-1">Tab Visibility</label>
                                                    <select value={itemForm.category} onChange={e => setItemForm({ ...itemForm, category: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white outline-none">
                                                        <option value="beginner">Beginner Tab</option>
                                                        <option value="professional">Professional Tab</option>
                                                        <option value="spiritual">Spiritual Tab</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-2">
                                                <InputField label="Students" value={itemForm.students} onChange={v => setItemForm({ ...itemForm, students: v })} />
                                                <InputField label="Rating" value={itemForm.rating} onChange={v => setItemForm({ ...itemForm, rating: v })} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <InputField label="Description" value={itemForm.description} onChange={v => setItemForm({ ...itemForm, description: v })} textarea />
                                        <div className="space-y-4">
                                            <InputField label="Modules (comma separated)" value={itemForm.modules} onChange={v => setItemForm({ ...itemForm, modules: v })} placeholder="Lesson 1, Lesson 2..." />
                                            <InputField label="Image Alt Tag (SEO)" value={itemForm.imageAlt} onChange={v => setItemForm({ ...itemForm, imageAlt: v })} placeholder="e.g. Vastu Chart Illustration" />
                                        </div>
                                    </div>

                                    <div className="border-2 border-dashed border-orange-200 rounded-2xl p-6 bg-gradient-to-br from-orange-50/50 to-amber-50/30 hover:from-orange-50 hover:to-amber-50 hover:border-orange-400 transition-all duration-300 cursor-pointer relative group">
                                        {(itemImage || itemForm.image) ? (
                                            <div className="flex items-center gap-4">
                                                <div className="w-20 h-20 rounded-xl overflow-hidden border-2 border-orange-200 shadow-md flex-shrink-0 bg-white">
                                                    {itemImage ? (
                                                        itemImage.type?.startsWith('video/')
                                                            ? <video src={URL.createObjectURL(itemImage)} className="w-full h-full object-cover" muted />
                                                            : <img src={URL.createObjectURL(itemImage)} alt="Preview" className="w-full h-full object-cover" />
                                                    ) : (
                                                        itemForm.image.match(/\.(mp4|webm|ogg)$/i)
                                                            ? <video src={`${BACKEND_URL}${itemForm.image}`} className="w-full h-full object-cover" muted />
                                                            : <img src={`${BACKEND_URL}${itemForm.image}`} alt="Preview" className="w-full h-full object-cover" />
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-xs font-black text-gray-800 truncate">Course Media Preview</p>
                                                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1">{itemImage?.name || 'Embedded Artifact'}</p>
                                                    <button 
                                                        onClick={async (e) => { 
                                                            e.stopPropagation(); 
                                                            const oldPath = itemForm.image;
                                                            if (oldPath && window.confirm("Purge this course artifact?")) {
                                                                try {
                                                                    await deleteLearningMedia(oldPath).unwrap();
                                                                    if (editingItemId) {
                                                                        // Immediate DB update for existing item
                                                                        const upData = new FormData();
                                                                        upData.append('image', ''); 
                                                                        upData.append('imageAlt', '');
                                                                        await updateItem({ slug: selectedSlug, itemId: editingItemId, formData: upData }).unwrap();
                                                                    }
                                                                    setItemForm(prev => ({ ...prev, image: '', imageAlt: '' }));
                                                                    toast.success("Artifact purged.");
                                                                } catch (err) { toast.error("Purge failed."); }
                                                            } else {
                                                                setItemImage(null); 
                                                                setItemForm(prev => ({ ...prev, image: '', imageAlt: '' }));
                                                            }
                                                        }} 
                                                        className="mt-2 text-[9px] font-black text-red-500 uppercase tracking-widest hover:text-red-700 transition-colors flex items-center gap-1"
                                                    >
                                                        <FiX size={10} /> Remove Media
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center justify-center py-4">
                                                <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center mb-3 group-hover:bg-orange-200 group-hover:scale-110 transition-all duration-300">
                                                    <FiUploadCloud className="w-7 h-7 text-orange-500" />
                                                </div>
                                                <p className="text-xs font-black text-gray-700 uppercase tracking-wide mb-1">Drop your media here</p>
                                                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-3">or click to browse files</p>
                                                <div className="flex items-center gap-2">
                                                    <span className="flex items-center gap-1 px-2.5 py-1 bg-white border border-orange-100 rounded-full text-[8px] font-black text-orange-600 uppercase tracking-widest shadow-sm"><FiImage size={10} /> JPG, PNG, WEBP</span>
                                                    <span className="flex items-center gap-1 px-2.5 py-1 bg-white border border-purple-100 rounded-full text-[8px] font-black text-purple-600 uppercase tracking-widest shadow-sm"><FiFilm size={10} /> MP4, WEBM</span>
                                                </div>
                                            </div>
                                        )}
                                        <input 
                                            type="file" 
                                            accept="image/*,video/*" 
                                            onChange={e => setItemImage(e.target.files[0])} 
                                            className={`absolute inset-0 opacity-0 cursor-pointer ${(itemImage || itemForm.image) ? 'pointer-events-none' : 'z-10'}`} 
                                        />
                                    </div>

                                    <div className="flex gap-2">
                                        <button onClick={handleSaveItemEntry} className="flex-1 py-4 bg-black text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-orange-600 transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2"><FiPlus /> {editingItemId ? 'Update Entry' : 'Establish Entry'}</button>
                                        {editingItemId && <button onClick={resetItemForm} className="px-6 py-4 bg-gray-100 text-gray-600 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-gray-200 transition-all active:scale-95">Cancel</button>}
                                    </div>
                                </div>

                                {/* List Items */}
                                <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b pb-2">Established Paths</div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {pageData?.items?.map(item => (
                                        <div key={item._id} className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm group relative flex items-center gap-4 transition-all hover:ring-2 hover:ring-orange-100">
                                            <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gray-50 flex-shrink-0">
                                                {(() => {
                                                    const mediaSrc = item.image?.startsWith('http') ? item.image : `${BACKEND_URL}${item.image}`;
                                                    return item.image?.match(/\.(mp4|webm|ogg)$/i)
                                                        ? <video src={mediaSrc} autoPlay loop muted playsInline className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                                        : <img src={mediaSrc} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />;
                                                })()}
                                            </div>
                                            <div className="flex-grow min-w-0">
                                                <h4 className="text-[10px] font-black text-gray-900 uppercase truncate">{item.title}</h4>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="text-[8px] font-black text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full uppercase">{item.level}</span>
                                                    <span className="text-[9px] font-bold text-gray-400 italic">₹{item.price}</span>
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <button onClick={() => handleEditItem(item)} className="p-1.5 text-indigo-500 hover:bg-indigo-50 rounded-lg"><FiEdit2 size={12} /></button>
                                                <button onClick={async () => { if (window.confirm('Wipe this path?')) await deleteItem({ slug: selectedSlug, itemId: item._id }); }} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"><FiTrash2 size={12} /></button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <SectionHeader title="🛡️ Trust Artifacts" section="benefits" count={benefits.length} expandedSection={expandedSection} toggleSection={toggleSection} />
                        {expandedSection === 'benefits' && (
                            <div className="p-4 bg-gray-50 rounded-xl space-y-4">
                                {benefits.map((item, i) => (
                                    <div key={i} className="bg-white p-4 rounded-xl border border-gray-100 space-y-3">
                                        <InputField label="Title" value={item.title} onChange={v => { const nl = [...benefits]; nl[i] = { ...nl[i], title: v }; setBenefits(nl); }} />
                                        <InputField label="Icon Name (Lucide)" value={item.icon} onChange={v => { const nl = [...benefits]; nl[i] = { ...nl[i], icon: v }; setBenefits(nl); }} />
                                        <InputField label="Reasoning" value={item.description} onChange={v => { const nl = [...benefits]; nl[i] = { ...nl[i], description: v }; setBenefits(nl); }} textarea />
                                        <button onClick={() => setBenefits(benefits.filter((_, idx) => idx !== i))} className="text-red-400 text-[10px] font-black uppercase">Wipe</button>
                                    </div>
                                ))}
                                <button onClick={() => setBenefits([...benefits, { icon: 'Star', title: '', description: '' }])} className="text-orange-600 text-[10px] font-black flex items-center gap-1 uppercase tracking-widest"><FiPlus /> Establish Benefit</button>
                            </div>
                        )}
                        <SectionHeader title="🏷️ Path Categories" section="categories" count={categories.length} expandedSection={expandedSection} toggleSection={toggleSection} />
                        {expandedSection === 'categories' && (
                            <div className="p-4 bg-gray-50 rounded-xl space-y-4">
                                {categories.map((item, i) => (
                                    <div key={i} className="bg-white p-4 rounded-xl border border-gray-100 space-y-3">
                                        <div className="grid grid-cols-2 gap-4">
                                            <InputField label="Category Key" value={item.key} onChange={v => { const nl = [...categories]; nl[i] = { ...nl[i], key: v }; setCategories(nl); }} placeholder="e.g. beginner" />
                                            <InputField label="Display Label" value={item.label} onChange={v => { const nl = [...categories]; nl[i] = { ...nl[i], label: v }; setCategories(nl); }} placeholder="e.g. Beginner Courses" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <InputField label="Icon (Lucide)" value={item.icon} onChange={v => { const nl = [...categories]; nl[i] = { ...nl[i], icon: v }; setCategories(nl); }} />
                                            <InputField label="Gradient Color" value={item.color} onChange={v => { const nl = [...categories]; nl[i] = { ...nl[i], color: v }; setCategories(nl); }} placeholder="e.g. from-orange-500 to-amber-500" />
                                        </div>
                                        <InputField label="Feature Items (comma separated)" value={item.items ? item.items.join(', ') : ''} onChange={v => { const nl = [...categories]; nl[i] = { ...nl[i], items: v.split(',').map(s => s.trim()) }; setCategories(nl); }} />
                                        <button onClick={() => setCategories(categories.filter((_, idx) => idx !== i))} className="text-red-400 text-[10px] font-black uppercase tracking-widest mt-2 hover:text-red-600 transition-colors">Wipe Category</button>
                                    </div>
                                ))}
                                <button onClick={() => setCategories([...categories, { key: '', label: '', icon: 'Star', color: 'from-gray-500 to-gray-400', items: [] }])} className="text-orange-600 text-[10px] font-black flex items-center gap-1 uppercase tracking-widest mt-2"><FiPlus /> Establish Category</button>
                            </div>
                        )}

                        <SectionHeader title="🗣️ Student Testimonials" section="testimonials" count={testimonials.length} expandedSection={expandedSection} toggleSection={toggleSection} />
                        {expandedSection === 'testimonials' && (
                            <div className="p-4 bg-gray-50 rounded-xl space-y-4">
                                {testimonials.map((item, i) => (
                                    <div key={i} className="bg-white p-4 rounded-xl border border-gray-100 space-y-3">
                                        <InputField label="Student Quote" value={item.quote} onChange={v => { const nl = [...testimonials]; nl[i] = { ...nl[i], quote: v }; setTestimonials(nl); }} textarea />
                                        <div className="grid grid-cols-2 gap-4">
                                            <InputField label="Student Name" value={item.author} onChange={v => { const nl = [...testimonials]; nl[i] = { ...nl[i], author: v }; setTestimonials(nl); }} />
                                            <InputField label="Role/Profession" value={item.role} onChange={v => { const nl = [...testimonials]; nl[i] = { ...nl[i], role: v }; setTestimonials(nl); }} />
                                        </div>
                                        <button onClick={() => setTestimonials(testimonials.filter((_, idx) => idx !== i))} className="text-red-400 text-[10px] font-black uppercase tracking-widest mt-2 hover:text-red-600 transition-colors">Wipe Testimonial</button>
                                    </div>
                                ))}
                                <button onClick={() => setTestimonials([...testimonials, { quote: '', author: '', role: '' }])} className="text-orange-600 text-[10px] font-black flex items-center gap-1 uppercase tracking-widest mt-2"><FiPlus /> Establish Testimonial</button>
                            </div>
                        )}

                        <SectionHeader title="❓ Knowledge Base (FAQ)" section="faqs" count={faqs.length} expandedSection={expandedSection} toggleSection={toggleSection} />
                        {expandedSection === 'faqs' && (
                            <div className="p-4 bg-gray-50 rounded-xl space-y-4">
                                {faqs.map((item, i) => (
                                    <div key={i} className="bg-white p-4 rounded-xl border border-gray-100 space-y-3">
                                        <InputField label="Question" value={item.question || item.q} onChange={v => { const nl = [...faqs]; nl[i] = { ...nl[i], question: v, q: undefined }; setFaqs(nl); }} />
                                        <InputField label="Answer" value={item.answer || item.a} onChange={v => { const nl = [...faqs]; nl[i] = { ...nl[i], answer: v, a: undefined }; setFaqs(nl); }} textarea />
                                        <button onClick={() => setFaqs(faqs.filter((_, idx) => idx !== i))} className="text-red-400 text-[10px] font-black uppercase tracking-widest mt-2 hover:text-red-600 transition-colors">Wipe FAQ</button>
                                    </div>
                                ))}
                                <button onClick={() => setFaqs([...faqs, { question: '', answer: '' }])} className="text-orange-600 text-[10px] font-black flex items-center gap-1 uppercase tracking-widest mt-2"><FiPlus /> Establish FAQ</button>
                            </div>
                        )}

                        <SectionHeader title="📢 Final Call to Action" section="cta" count="Ready" expandedSection={expandedSection} toggleSection={toggleSection} />
                        {expandedSection === 'cta' && (
                            <div className="p-4 bg-gray-50 rounded-xl space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <InputField label="Badge Text" value={ctaForm.badge} onChange={v => setCtaForm({ ...ctaForm, badge: v })} placeholder="e.g. BEGIN YOUR COSMIC JOURNEY" />
                                    <InputField label="CTA Title" value={ctaForm.title} onChange={v => setCtaForm({ ...ctaForm, title: v })} placeholder="e.g. Ready to Begin Your Journey?" />
                                </div>
                                <InputField label="Description" value={ctaForm.description} onChange={v => setCtaForm({ ...ctaForm, description: v })} textarea placeholder="Describe the benefits of joining..." />
                                <div className="grid grid-cols-2 gap-4">
                                    <InputField label="Primary Button Text" value={ctaForm.primaryBtnText} onChange={v => setCtaForm({ ...ctaForm, primaryBtnText: v })} placeholder="e.g. Browse All Courses" />
                                    <InputField label="Secondary Button Text" value={ctaForm.secondaryBtnText} onChange={v => setCtaForm({ ...ctaForm, secondaryBtnText: v })} placeholder="e.g. Free Consultation" />
                                </div>
                                <InputField label="Trust Badges (Comma Separated)" value={ctaForm.trustBadges} onChange={v => setCtaForm({ ...ctaForm, trustBadges: v })} placeholder="Badge 1, Badge 2, Badge 3" />
                            </div>
                        )}
                    </div>
                    <div className="p-6 bg-gray-50 border-t flex justify-end gap-3 font-bold sticky bottom-0 z-10">
                        <button onClick={() => setIsEditing(false)} className="px-6 py-3 text-gray-500 text-xs uppercase tracking-widest hover:text-black transition-colors">Discard</button>
                        <button onClick={handleSavePageSettings} className="flex items-center gap-2 bg-black text-white px-10 py-3.5 rounded-2xl text-[10px] uppercase tracking-[0.2em] font-black shadow-2xl hover:bg-orange-600 transition-all active:scale-95"><FiSave /> Preserve Hub Configuration</button>
                    </div>
                </div>
            )}

            {/* View Modal */}
            {viewData && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-slide-in-up">
                        <div className="p-6 bg-gradient-to-r from-orange-600 to-red-600 flex justify-between items-center text-white">
                            <h3 className="font-black text-lg uppercase tracking-widest flex items-center gap-2"><FiEye /> Portal Inspection</h3>
                            <button onClick={() => setViewData(null)} className="p-1 hover:bg-white/20 rounded-lg transition-colors"><FiX size={20} /></button>
                        </div>
                        <div className="p-6 space-y-4">
                            {/* Large Media Preview */}
                            <div className="aspect-[21/9] w-full max-h-48 rounded-2xl bg-gray-50 border border-gray-100 overflow-hidden relative shadow-inner flex items-center justify-center mb-6">
                                {(() => {
                                    const hubImage = viewData.image || viewData.introSection?.image;
                                    const fallbackImages = {
                                        'astrology': 'https://images.unsplash.com/photo-1532960401447-7ee05323791b?auto=format&fit=crop&q=80&w=600',
                                        'puja-vidhi': 'https://images.unsplash.com/photo-1545065096-2244f77651e7?auto=format&fit=crop&q=80&w=600',
                                        'mantra': 'https://images.unsplash.com/photo-1544924405-45968d904435?auto=format&fit=crop&q=80&w=600'
                                    };
                                    if (hubImage) {
                                        const src = hubImage.startsWith('http') ? hubImage : `${BACKEND_URL}${hubImage}`;
                                        return hubImage.match(/\.(mp4|webm|ogg)$/i)
                                            ? <video src={src} controls className="w-full h-full object-cover" />
                                            : <img src={src} alt={viewData.imageAlt || "Portal Identity"} className="w-full h-full object-cover" />;
                                    }
                                    return <img src={fallbackImages[viewData.slug] || 'https://images.unsplash.com/photo-1514467950395-8142f013bd0c?auto=format&fit=crop&q=80&w=600'} alt="System Default" className="w-full h-full object-cover opacity-60" />;
                                })()}
                            </div>
                            <div className="border-b border-gray-100 pb-4">
                                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Target Slug</h4>
                                <p className="text-lg font-black text-gray-900 uppercase">{viewData.slug}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 list-none">
                                    <h4 className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-2">Metrics</h4>
                                    <ul className="space-y-1.5 text-xs font-bold text-gray-700">
                                        <li className="flex justify-between"><span>Items (Courses)</span> <span className="text-orange-600">{viewData.itemCount}</span></li>
                                        <li className="flex justify-between"><span>Benefits</span> <span className="text-orange-600">{viewData.benefitsCount}</span></li>
                                        <li className="flex justify-between"><span>Testimonials</span> <span className="text-orange-600">{viewData.testimonialsCount}</span></li>
                                        <li className="flex justify-between"><span>FAQs</span> <span className="text-orange-600">{viewData.faqsCount}</span></li>
                                    </ul>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                    <h4 className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-2">Status</h4>
                                    <div className="flex flex-col gap-2">
                                        <div className="text-xs font-bold flex items-center justify-between">
                                            <span>Branding</span> {viewData.hasBranding ? <FiCheckCircle className="text-green-500" /> : <FiX className="text-red-500" />}
                                        </div>
                                        <div className="text-xs font-bold flex items-center justify-between">
                                            <span>Resonance</span> {viewData.isActive ? <span className="text-green-500 uppercase">Active</span> : <span className="text-red-500 uppercase">Inactive</span>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end">
                            <button onClick={() => setViewData(null)} className="px-6 py-2.5 bg-black text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-orange-600 transition-colors shadow-lg shadow-black/10">Acknowledge</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Overview Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-12 animate-fade-in-up">
                <div className="p-5 border-b bg-gray-50 flex items-center justify-between">
                    <h3 className="font-bold text-gray-800 flex items-center gap-2 text-sm uppercase tracking-tight"><FiEye className="text-orange-600" /> Sacred Learning Overview</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm table-fixed">
                        <thead>
                            <tr className="bg-white border-b">
                                <th className="w-20 text-left px-5 py-5 font-black text-gray-900 text-[9px] uppercase tracking-widest">Sr. No.</th>
                                <th className="text-left px-5 py-5 font-black text-gray-900 text-[9px] uppercase tracking-widest">Hub Portal</th>
                                <th className="w-20 text-center py-5 font-black text-gray-900 text-[9px] uppercase tracking-widest">Items</th>
                                <th className="w-24 text-center py-5 font-black text-gray-900 text-[9px] uppercase tracking-widest">Benefits</th>
                                <th className="w-28 text-center py-5 font-black text-gray-900 text-[9px] uppercase tracking-widest">Testimonials</th>
                                <th className="w-20 text-center py-5 font-black text-gray-900 text-[9px] uppercase tracking-widest">FAQs</th>
                                <th className="w-28 text-center py-5 font-black text-gray-900 text-[9px] uppercase tracking-widest">Resonance</th>
                                <th className="w-36 text-right px-5 py-5 font-black text-gray-900 text-[9px] uppercase tracking-widest">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allPortals.map((portal, index) => (
                                <tr key={portal.slug} className={`border-b hover:bg-orange-50/10 ${selectedSlug === portal.slug ? 'bg-orange-50/20' : ''}`}>
                                    <td className="px-5 py-5 font-black text-gray-500 text-xs">{(index + 1).toString().padStart(2, '0')}</td>
                                    <td className="px-5 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-xl bg-gray-50 flex-shrink-0 overflow-hidden border border-gray-100 shadow-sm flex items-center justify-center relative group">
                                                {(() => {
                                                    const hubImage = portal.image;
                                                    const fallbackImages = {
                                                        'astrology': 'https://images.unsplash.com/photo-1532960401447-7ee05323791b?auto=format&fit=crop&q=80&w=200',
                                                        'puja-vidhi': 'https://images.unsplash.com/photo-1545065096-2244f77651e7?auto=format&fit=crop&q=80&w=200',
                                                        'mantra': 'https://images.unsplash.com/photo-1544924405-45968d904435?auto=format&fit=crop&q=80&w=200'
                                                    };
                                                    if (hubImage) {
                                                        const src = hubImage.startsWith('http') ? hubImage : `${BACKEND_URL}${hubImage}`;
                                                        return hubImage.match(/\.(mp4|webm|ogg)$/i)
                                                            ? <video src={src} muted className="w-full h-full object-cover" />
                                                            : <img src={src} alt={portal.imageAlt || "Portal Thumbnail"} className="w-full h-full object-cover" />;
                                                    }
                                                    return <img src={fallbackImages[portal.slug] || 'https://images.unsplash.com/photo-1514467950395-8142f013bd0c?auto=format&fit=crop&q=80&w=200'} alt="Default Thumbnail" className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all" />;
                                                })()}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-black text-gray-900 uppercase text-xs truncate leading-none mb-1">{portal.slug}</span>
                                                <span className="text-[9px] font-bold text-gray-400 tracking-widest italic">{portal.image ? 'Custom' : 'System'}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="text-center py-5">
                                        <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-[9px] font-black">{portal.itemCount}</span>
                                    </td>
                                    <td className="text-center py-5">
                                        <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[9px] font-black">{portal.benefitsCount}</span>
                                    </td>
                                    <td className="text-center py-5">
                                        <span className="bg-purple-50 text-purple-600 px-3 py-1 rounded-full text-[9px] font-black">{portal.testimonialsCount}</span>
                                    </td>
                                    <td className="text-center py-5">
                                        <span className="bg-amber-50 text-amber-600 px-3 py-1 rounded-full text-[9px] font-black">{portal.faqsCount}</span>
                                    </td>
                                    <td className="text-center py-5">
                                        <button onClick={() => handleToggleStatus(portal.slug, portal.isActive)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all ${portal.isActive ? 'bg-[#22c55e]' : 'bg-gray-200'}`}>
                                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-all ${portal.isActive ? 'translate-x-6' : 'translate-x-1'}`} />
                                        </button>
                                    </td>
                                    <td className="text-right px-5 py-5">
                                        <div className="flex items-center justify-end gap-1">
                                            <button onClick={() => setViewData(portal)} className="p-2 text-indigo-500 hover:bg-indigo-50 rounded-xl transition-all" title="Inspect Portal"><FiEye size={16} /></button>
                                            <button onClick={() => { navigate(`/admin-acharya/dashboard/content/learn/${portal.slug}`); setIsEditing(true); window.scrollTo(0, 0); }} className="p-2 text-gray-700 hover:bg-gray-100 rounded-xl transition-all" title="Edit Portal"><FiEdit2 size={16} /></button>
                                            <button onClick={() => window.alert("Wiping a foundational hub portal requires direct root database privileges. Please clear items individually inside the editor.")} className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-all" title="Wipe Portal"><FiTrash2 size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CourseManager;
