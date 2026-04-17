import React, { useState } from 'react';
import {
    Plus, Search, Edit2, Trash2, Eye, X, Check,
    AlertCircle, Image as ImageIcon, PlusCircle, MinusCircle,
    List, HelpCircle, Save, Database, Clock, Star
} from 'lucide-react';
import RichTextEditor from '../../components/RichTextEditor';
import {
    useGetAllOfferingsQuery,
    useCreateOfferingMutation,
    useUpdateOfferingMutation,
    useDeleteOfferingMutation,
    useSeedOfferingsMutation
} from '../../../../../services/pujaOfferingApi';
import { toast } from 'react-toastify';
import { BACKEND_URL, getImageUrl } from '../../../../../config/apiConfig';

const PujaOfferingManager = () => {
    const { data: offerings = [], isLoading } = useGetAllOfferingsQuery();
    const [createOffering] = useCreateOfferingMutation();
    const [updateOffering] = useUpdateOfferingMutation();
    const [deleteOffering] = useDeleteOfferingMutation();
    const [seedOfferings, { isLoading: isSeeding }] = useSeedOfferingsMutation();

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editId, setEditId] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        shortDescription: '',
        longDescription: '',
        price: '',
        duration: '',
        order: 0,
        benefits: [''],
        faqs: [{ question: '', answer: '' }],
        serviceModes: [
            { mode: 'Home Visit', title: 'Home Visit Puja', description: 'Experienced Pandit visits your home', price: 0, points: ['Experienced Acharya', 'Full Samagri Included', 'Traditional Mantra Vidhi', 'Personal Connection'], imageUrl: '' },
            { mode: 'Online', title: 'Online Video Puja', description: 'Live interactive session via video call', price: 0, points: ['Live Interactive Session', 'Step-by-Step Guidance', 'Global Accessibility', 'Perfect for Busy Schedules'], imageUrl: '' },
            { mode: 'Muhurat', title: 'Muhurat Consultation', description: 'Find the most auspicious time', price: 0, points: ['Personalized Kundli Check', 'Nakshatra Alignment', 'Exact Timing Guidance', 'Family Shanti Analysis'], imageUrl: '' }
        ],
        metaTitle: '',
        metaDescription: '',
        metaKeywords: '',
        canonicalUrl: '',
        imageAlt: ''
    });
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [serviceModeFiles, setServiceModeFiles] = useState({});
    const [serviceModePreviews, setServiceModePreviews] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Slug Auto Generator
    const handleTitleChange = (e) => {
        const title = e.target.value;
        const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
        setFormData(prev => ({ ...prev, title, slug }));
    };

    const handleEdit = (item) => {
        setFormData({
            title: item.title,
            slug: item.slug,
            shortDescription: item.shortDescription,
            longDescription: item.longDescription,
            price: item.price,
            duration: item.duration,
            order: item.order,
            benefits: item.benefits || [''],
            faqs: item.faqs || [{ question: '', answer: '' }],
            serviceModes: item.serviceModes || [
                { mode: 'Home Visit', title: 'Home Visit Puja', description: 'Experienced Pandit visits your home', price: 0, points: ['Experienced Acharya', 'Full Samagri Included', 'Traditional Mantra Vidhi', 'Personal Connection'], imageUrl: '' },
                { mode: 'Online', title: 'Online Video Puja', description: 'Live interactive session via video call', price: 0, points: ['Live Interactive Session', 'Step-by-Step Guidance', 'Global Accessibility', 'Perfect for Busy Schedules'], imageUrl: '' },
                { mode: 'Muhurat', title: 'Muhurat Consultation', description: 'Find the most auspicious time', price: 0, points: ['Personalized Kundli Check', 'Nakshatra Alignment', 'Exact Timing Guidance', 'Family Shanti Analysis'], imageUrl: '' }
            ],
            metaTitle: item.metaTitle || '',
            metaDescription: item.metaDescription || '',
            metaKeywords: item.metaKeywords || '',
            canonicalUrl: item.canonicalUrl || '',
            imageAlt: item.imageAlt || ''
        });
        setEditId(item._id);
        setImagePreview(getImageUrl(item.imageUrl));

        // Load previews for modes
        const newPrevs = {};
        item.serviceModes?.forEach((sm, idx) => {
            if (sm.imageUrl) {
                newPrevs[idx] = getImageUrl(sm.imageUrl);
            }
        });
        setServiceModePreviews(newPrevs);
        setServiceModeFiles({});

        setIsFormOpen(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Benefits Management
    const addBenefit = () => setFormData(prev => ({ ...prev, benefits: [...prev.benefits, ''] }));
    const removeBenefit = (index) => {
        const newBenefits = [...formData.benefits];
        newBenefits.splice(index, 1);
        setFormData(prev => ({ ...prev, benefits: newBenefits }));
    };
    const updateBenefit = (index, value) => {
        const newBenefits = [...formData.benefits];
        newBenefits[index] = value;
        setFormData(prev => ({ ...prev, benefits: newBenefits }));
    };

    // FAQ Management
    const addFAQ = () => setFormData(prev => ({ ...prev, faqs: [...prev.faqs, { question: '', answer: '' }] }));
    const removeFAQ = (index) => {
        const newFAQs = [...formData.faqs];
        newFAQs.splice(index, 1);
        setFormData(prev => ({ ...prev, faqs: newFAQs }));
    };
    const updateFAQ = (index, field, value) => {
        const newFAQs = [...formData.faqs];
        newFAQs[index][field] = value;
        setFormData(prev => ({ ...prev, faqs: newFAQs }));
    };

    // Service Mode Management
    const addServiceMode = () => setFormData(prev => ({
        ...prev,
        serviceModes: [...prev.serviceModes, { mode: '', title: '', description: '', price: 0, points: [''], imageUrl: '' }]
    }));
    const removeServiceMode = (index) => {
        const newModes = [...formData.serviceModes];
        newModes.splice(index, 1);
        setFormData(prev => ({ ...prev, serviceModes: newModes }));
    };
    const updateServiceMode = (index, field, value) => {
        const newModes = [...formData.serviceModes];
        newModes[index] = { ...newModes[index], [field]: value };
        setFormData(prev => ({ ...prev, serviceModes: newModes }));
    };
    const addModePoint = (modeIdx) => {
        const newModes = [...formData.serviceModes];
        newModes[modeIdx].points = [...newModes[modeIdx].points, ''];
        setFormData(prev => ({ ...prev, serviceModes: newModes }));
    };
    const updateModePoint = (modeIdx, pointIdx, value) => {
        const newModes = [...formData.serviceModes];
        newModes[modeIdx].points[pointIdx] = value;
        setFormData(prev => ({ ...prev, serviceModes: newModes }));
    };
    const removeModePoint = (modeIdx, pointIdx) => {
        const newModes = [...formData.serviceModes];
        newModes[modeIdx].points.splice(pointIdx, 1);
        setFormData(prev => ({ ...prev, serviceModes: newModes }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleModeImageChange = (index, e) => {
        const file = e.target.files[0];
        if (file) {
            setServiceModeFiles(prev => ({ ...prev, [index]: file }));
            setServiceModePreviews(prev => ({ ...prev, [index]: URL.createObjectURL(file) }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.keys(formData).forEach(key => {
            if (key === 'benefits' || key === 'faqs' || key === 'serviceModes') {
                data.append(key, JSON.stringify(formData[key]));
            } else {
                data.append(key, formData[key]);
            }
        });

        // Main Image
        if (imageFile) data.append('image', imageFile);

        // Service Mode Images
        Object.keys(serviceModeFiles).forEach(idx => {
            data.append(`serviceModeImage_${idx}`, serviceModeFiles[idx]);
        });

        try {
            if (editId) {
                await updateOffering({ id: editId, formData: data }).unwrap();
                toast.success('Offering updated successfully');
            } else {
                await createOffering(data).unwrap();
                toast.success('Offering created successfully');
            }
            resetForm();
        } catch (err) {
            toast.error(err.data?.message || 'Action failed');
        }
    };

    const resetForm = () => {
        setFormData({
            title: '', slug: '', shortDescription: '', longDescription: '',
            price: '', duration: '', order: 0, benefits: [''],
            faqs: [{ question: '', answer: '' }],
            serviceModes: [
                { mode: 'Home Visit', title: 'Home Visit Puja', description: 'Experienced Pandit visits your home', price: 0, points: ['Experienced Acharya', 'Full Samagri Included', 'Traditional Mantra Vidhi', 'Personal Connection'], imageUrl: '' },
                { mode: 'Online', title: 'Online Video Puja', description: 'Live interactive session via video call', price: 0, points: ['Live Interactive Session', 'Step-by-Step Guidance', 'Global Accessibility', 'Perfect for Busy Schedules'], imageUrl: '' },
                { mode: 'Muhurat', title: 'Muhurat Consultation', description: 'Find the most auspicious time', price: 0, points: ['Personalized Kundli Check', 'Nakshatra Alignment', 'Exact Timing Guidance', 'Family Shanti Analysis'], imageUrl: '' }
            ],
            metaTitle: '', metaDescription: '', metaKeywords: '', canonicalUrl: '', imageAlt: ''
        });
        setEditId(null);
        setImageFile(null);
        setImagePreview(null);
        setServiceModeFiles({});
        setServiceModePreviews({});
        setIsFormOpen(false);
    };

    return (
        <div className="p-6 bg-gray-50/50 min-h-screen">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 uppercase">Puja Offerings <span className="text-orange-600">Manager</span></h1>
                    <p className="text-sm text-gray-500 font-medium italic-none">Manage and curate sacred puja services and dynamic rituals in the divine community</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={async () => {
                            if (window.confirm('Seed sample offerings?')) {
                                try { await seedOfferings().unwrap(); toast.success('Offerings seeded'); }
                                catch (e) { toast.error('Seeding failed'); }
                            }
                        }}
                        disabled={isSeeding}
                        className="px-4 py-2 bg-white text-gray-700 font-bold rounded-xl border border-gray-200 hover:bg-gray-50 flex items-center gap-2 text-sm shadow-sm transition-all"
                    >
                        <Database size={16} /> Seed Samples
                    </button>
                    <button
                        onClick={() => setIsFormOpen(!isFormOpen)}
                        className="px-6 py-2 bg-blue-900 text-white font-bold rounded-xl shadow-lg shadow-blue-200 hover:bg-orange-600 flex items-center gap-2 text-sm transition-all"
                    >
                        {isFormOpen ? <X size={18} /> : <Plus size={18} />}
                        {isFormOpen ? 'Close Form' : 'Add New Offering'}
                    </button>
                </div>
            </div>

            {isFormOpen && (
                <div className="mb-12 bg-white p-8 rounded-[2rem] border border-gray-100 shadow-xl shadow-blue-900/5 animate-fade-in">
                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-50">
                        <h2 className="text-xl font-black text-gray-800 tracking-tight flex items-center gap-3">
                            <Database className="text-blue-900" size={24} /> {editId ? 'Modify Offering' : 'New Puja Offering'}
                        </h2>
                        <button onClick={resetForm} className="p-2 hover:bg-red-50 text-red-400 rounded-full transition-all"><X size={20} /></button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* 3-Column Basic Info Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold text-gray-800 uppercase tracking-wider pl-1">Puja Title</label>
                                    <input
                                        type="text" value={formData.title} onChange={handleTitleChange} required
                                        className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-900 transition-all font-bold text-gray-700"
                                        placeholder="e.g. Mahalakshmi Puja"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider pl-1">Safe-Slug (Auto)</label>
                                    <input
                                        type="text" value={formData.slug} onChange={handleInputChange} required
                                        className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-900 transition-all font-mono text-blue-600"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider pl-1">Starting Price (₹)</label>
                                    <input
                                        type="number" name="price" value={formData.price} onChange={handleInputChange} required
                                        className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-900 transition-all font-black text-gray-800"
                                    />
                                </div>
                                <div className="md:col-span-2 space-y-1.5">
                                    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider pl-1">Marketing Tagline</label>
                                    <input
                                        type="text" name="shortDescription" value={formData.shortDescription} onChange={handleInputChange} required
                                        className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-900 transition-all"
                                        placeholder="One-liner to catch user attention..."
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider pl-1">Average Duration</label>
                                    <div className="relative">
                                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                        <input
                                            type="text" name="duration" value={formData.duration} onChange={handleInputChange}
                                            className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-900 transition-all"
                                            placeholder="2-3 Hours"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Intro Section Image Selector */}
                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block text-center">Intro Section Visual</label>
                                    <div className="relative h-44 w-full border-2 border-dashed border-gray-200 rounded-[2rem] bg-gray-50 hover:bg-blue-50/50 hover:border-blue-200 transition-all flex flex-col items-center justify-center overflow-hidden cursor-pointer group">
                                        {imagePreview ? (
                                            <>
                                                <img src={imagePreview} className="absolute inset-0 w-full h-full object-cover rounded-[2rem]" />
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                    <p className="text-white text-[10px] font-black uppercase tracking-widest">Change visual</p>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <ImageIcon size={32} className="text-gray-300 mb-1" />
                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">Detail View<br />Upload</p>
                                            </>
                                        )}
                                        <input type="file" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-slate-400 pl-1">Image Alt Text (SEO)</label>
                                    <input
                                        type="text" name="imageAlt" value={formData.imageAlt} onChange={handleInputChange}
                                        className="w-full px-3 py-1.5 text-[10px] bg-white border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500/30"
                                        placeholder="e.g. Traditional Hawan Vidhi at home..."
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Long Description Area */}
                        <div className="space-y-2">
                            <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider pl-1">Detailed Content (Full Story)</label>
                            <RichTextEditor
                                value={formData.longDescription}
                                onChange={(content) => setFormData(prev => ({ ...prev, longDescription: content }))}
                                placeholder="Write the complete details about what happens in this puja..."
                            />
                        </div>

                        {/* Benefits & FAQ Sections */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-4">

                            {/* Benefits Manager */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-xs font-black text-blue-900 uppercase tracking-widest flex items-center gap-2">
                                        <List size={20} /> Key Benefits
                                    </h3>
                                    <button type="button" onClick={addBenefit} className="p-1.5 text-blue-900 hover:bg-blue-50 rounded-lg transition-all"><PlusCircle size={20} /></button>
                                </div>
                                <div className="space-y-3">
                                    {formData.benefits.map((benefit, idx) => (
                                        <div key={idx} className="flex gap-2">
                                            <input
                                                value={benefit} onChange={(e) => updateBenefit(idx, e.target.value)}
                                                className="flex-1 px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-900 transition-all font-bold"
                                                placeholder={`Benefit #${idx + 1}`}
                                            />
                                            <button type="button" onClick={() => removeBenefit(idx)} className="text-red-300 hover:text-red-500 transition-colors"><MinusCircle size={20} /></button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* FAQ Manager */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-xs font-black text-blue-900 uppercase tracking-widest flex items-center gap-2">
                                        <HelpCircle size={20} /> FAQ Builder
                                    </h3>
                                    <button type="button" onClick={addFAQ} className="p-1.5 text-blue-900 hover:bg-blue-50 rounded-lg transition-all"><PlusCircle size={20} /></button>
                                </div>
                                <div className="space-y-4">
                                    {formData.faqs.map((faq, idx) => (
                                        <div key={idx} className="p-4 bg-blue-50/30 rounded-2xl border border-blue-100/30 relative group">
                                            <button
                                                type="button" onClick={() => removeFAQ(idx)}
                                                className="absolute -top-2 -right-2 bg-white text-red-400 p-1 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <X size={14} />
                                            </button>
                                            <div className="space-y-3">
                                                <input
                                                    value={faq.question} onChange={(e) => updateFAQ(idx, 'question', e.target.value)}
                                                    className="w-full px-4 py-2 text-sm bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-900 transition-all font-bold"
                                                    placeholder="The Question..."
                                                />
                                                <RichTextEditor
                                                    value={faq.answer}
                                                    onChange={(content) => updateFAQ(idx, 'answer', content)}
                                                    placeholder="The Answer..."
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>

                        {/* Service Modes Manager */}
                        <div className="pt-8 border-t border-gray-50">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-xs font-black text-orange-600 uppercase tracking-[0.2em] flex items-center gap-3">
                                    <Star size={18} /> Service Modes (Category Options)
                                </h3>
                                <button type="button" onClick={addServiceMode} className="flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-600 rounded-xl font-bold text-[10px] hover:bg-orange-600 hover:text-white transition-all uppercase tracking-widest">
                                    Add Custom Mode
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {formData.serviceModes?.map((mode, mIdx) => (
                                    <div key={mIdx} className="p-6 bg-gray-50 rounded-[2.5rem] border border-gray-100 relative group transition-all hover:bg-white hover:shadow-xl hover:shadow-orange-900/5">
                                        <button type="button" onClick={() => removeServiceMode(mIdx)} className="absolute top-4 right-4 text-red-300 hover:text-red-500 transition-colors"><MinusCircle size={20} /></button>

                                        <div className="space-y-4">
                                            <div className="grid grid-cols-2 gap-3">
                                                <div className="space-y-1.5">
                                                    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider pl-1">Pricing Type</label>
                                                    <input
                                                        value={mode.mode} onChange={(e) => updateServiceMode(mIdx, 'mode', e.target.value)}
                                                        className="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-900 transition-all font-bold"
                                                        placeholder="e.g. Home Visit"
                                                    />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider pl-1">Title</label>
                                                    <input
                                                        value={mode.title} onChange={(e) => updateServiceMode(mIdx, 'title', e.target.value)}
                                                        className="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-900 transition-all font-bold"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-1.5">
                                                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider pl-1">Update Mode Image</label>
                                                <div className="relative h-20 bg-white border border-gray-200 rounded-xl flex items-center justify-center overflow-hidden group/img">
                                                    {serviceModePreviews[mIdx] ? (
                                                        <img src={serviceModePreviews[mIdx]} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="text-gray-300 flex flex-col items-center">
                                                            <ImageIcon size={20} />
                                                            <span className="text-[8px] font-black uppercase tracking-tighter">Photo</span>
                                                        </div>
                                                    )}
                                                    <input
                                                        type="file" onChange={(e) => handleModeImageChange(mIdx, e)}
                                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-3">
                                                <div className="flex items-center justify-between">
                                                    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider pl-1">Service Highlights</label>
                                                    <button type="button" onClick={() => addModePoint(mIdx)} className="text-orange-600 hover:bg-orange-50 p-1 rounded-lg transition-all"><PlusCircle size={16} /></button>
                                                </div>
                                                <div className="space-y-2 max-h-32 overflow-y-auto pr-1">
                                                    {mode.points.map((pt, pIdx) => (
                                                        <div key={pIdx} className="flex gap-2">
                                                            <input
                                                                value={pt} onChange={(e) => updateModePoint(mIdx, pIdx, e.target.value)}
                                                                className="flex-1 px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-900 transition-all font-bold"
                                                                placeholder={`Point #${pIdx + 1}`}
                                                            />
                                                            <button type="button" onClick={() => removeModePoint(mIdx, pIdx)} className="text-red-300 hover:text-red-500"><MinusCircle size={14} /></button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Professional SEO Infrastructure for Child Pages */}
                        <div className="pt-8 border-t border-gray-100">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-orange-50 rounded-xl shadow-sm">
                                    <Database className="text-orange-600 w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-xs font-black text-orange-600 uppercase tracking-[0.2em]">SEO Metadata (Specific to this Puja)</h3>
                                    <p className="text-[10px] text-gray-400 font-medium">Character-calibrated fields for guaranteed search visibility</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider pl-1 flex justify-between">
                                        Meta Title
                                        <span className={`text-[10px] font-medium ${formData.metaTitle?.length > 65 ? 'text-red-500' : 'text-green-600'}`}>({formData.metaTitle?.length || 0}/65)</span>
                                    </label>
                                    <input
                                        type="text" name="metaTitle" value={formData.metaTitle} onChange={handleInputChange}
                                        className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-900 transition-all font-medium"
                                        placeholder="Enter the title exactly as it should appear in Google..."
                                    />
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider pl-1 flex justify-between">
                                        Meta Description
                                        <span className={`text-[10px] font-medium ${formData.metaDescription?.length > 160 ? 'text-red-500' : 'text-green-600'}`}>({formData.metaDescription?.length || 0}/160)</span>
                                    </label>
                                    <textarea
                                        name="metaDescription" value={formData.metaDescription} onChange={handleInputChange}
                                        className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-900 transition-all h-24 resize-none leading-relaxed"
                                        placeholder="Provide a click-worthy summary that includes your main keywords..."
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider pl-1 font-black">Focus Keywords</label>
                                    <input
                                        type="text" name="metaKeywords" value={formData.metaKeywords} onChange={handleInputChange}
                                        className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-900 transition-all"
                                        placeholder="e.g. Mahalakshmi Puja, Wealth, Blessings"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider pl-1">Canonical URL</label>
                                    <input
                                        type="text" name="canonicalUrl" value={formData.canonicalUrl} onChange={handleInputChange}
                                        className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-900 transition-all"
                                        placeholder="https://acharya-ji.com/puja/mhalakshmi-puja"
                                    />
                                </div>
                            </div>
                        </div>                        <div className="flex justify-end gap-3 pt-6 border-t border-gray-50">
                            <button type="button" onClick={resetForm} className="px-5 py-2 text-[11px] font-black uppercase tracking-wider text-white bg-red-400 hover:bg-red-500 rounded-xl transition-all">
                                Clear Form
                            </button>
                            <button type="submit" className="px-10 py-2.5 bg-green-600 text-white font-black rounded-xl shadow-lg shadow-green-200 hover:bg-green-700 transition-all flex items-center gap-2 uppercase tracking-widest text-[11px]">
                                <Save size={16} /> Save Puja Offering
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {offerings.map(item => (
                    <div key={item._id} className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden group hover:shadow-2xl hover:shadow-blue-900/10 transition-all">
                        <div className="h-44 relative overflow-hidden">
                            <img
                                src={getImageUrl(item.imageUrl)}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-2 shadow-sm">
                                <span className="text-[10px] font-black text-gray-800 uppercase tracking-wider">₹{item.price}</span>
                            </div>
                            <div className="absolute inset-0 bg-blue-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                <a href={`/puja/${item.slug}`} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-blue-900 shadow-lg hover:scale-110 transition-all"><Eye size={18} /></a>
                            </div>
                        </div>
                        <div className="p-6">
                            <h3 className="font-black text-gray-800 text-xl leading-tight mb-2 group-hover:text-blue-900 transition-colors uppercase tracking-tight">{item.title}</h3>
                            <p className="text-gray-500 text-sm line-clamp-2 font-medium mb-4">{item.shortDescription}</p>
                            <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-1 text-[10px] font-bold text-blue-900 bg-blue-50 px-2 py-1 rounded-md">
                                        <Clock size={12} /> {item.duration}
                                    </div>
                                </div>
                                <div className="flex items-center gap-1">
                                    <button
                                        onClick={() => handleEdit(item)}
                                        className="p-2 text-gray-300 hover:text-blue-900 transition-colors"
                                    >
                                        <Edit2 size={18} />
                                    </button>
                                    <button
                                        onClick={async () => {
                                            if (window.confirm('Delete offering?')) {
                                                try { await deleteOffering(item._id).unwrap(); toast.success('Deleted'); }
                                                catch (e) { toast.error('Delete failed'); }
                                            }
                                        }}
                                        className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PujaOfferingManager;
