import React, { useState, useEffect } from 'react';
import { 
    Layout, 
    Plus, 
    Trash2, 
    Save, 
    Layers, 
    Settings, 
    Eye, 
    ArrowUp, 
    ArrowDown,
    Link,
    Type,
    FileText,
    HelpCircle,
    CheckCircle,
    Monitor,
    Smartphone,
    X,
    Upload,
    Video,
    Search as SearchIcon,
    Globe as GlobalIcon,
    Image as ImageIcon
} from 'lucide-react';
import { 
    useGetUniversalOverviewQuery, 
    useGetPageBySlugQuery, 
    useUpdatePageContentMutation, 
    useDeleteUniversalPageMutation,
    useUploadUniversalMediaMutation,
    usePurgeUniversalMediaMutation
} from '../../../../../services/universalContentApi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BACKEND_URL } from '../../../../../config/apiConfig';

const UniversalPageManager = () => {
    const [selectedSlug, setSelectedSlug] = useState('');
    const [activeTab, setActiveTab] = useState('architecture');
    const [localData, setLocalData] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const { data: overviewData, isLoading: isOverviewLoading } = useGetUniversalOverviewQuery();
    const { data: pageData, isLoading: isPageLoading, isFetching } = useGetPageBySlugQuery(selectedSlug, { skip: !selectedSlug });
    const [updateContent, { isLoading: isUpdating }] = useUpdatePageContentMutation();
    const [deletePage] = useDeleteUniversalPageMutation();
    const [uploadMedia] = useUploadUniversalMediaMutation();
    const [purgeMedia] = usePurgeUniversalMediaMutation();

    useEffect(() => {
        if (pageData?.success) {
            setLocalData(pageData.data);
        }
    }, [pageData]);

    const handleCreateNew = () => {
        const slug = prompt('Enter slug for new page (e.g., career-counseling):');
        if (slug) {
            setSelectedSlug(slug);
            setLocalData({
                slug,
                category: 'general',
                isActive: true,
                metadata: { title: '', description: '', keywords: '', imageAlt: '' },
                heroSection: { title: '', subtitle: '', image: '', imageAlt: '' },
                sections: [],
                features: [],
                faqs: [],
                ctaSection: { title: '', description: '', primaryBtnText: '', primaryBtnLink: '' }
            });
        }
    };

    const handleSave = async () => {
        try {
            await updateContent({ slug: selectedSlug, content: localData }).unwrap();
            toast.success('Page universe synchronized perfectly');
        } catch (err) {
            toast.error('Failed to update cosmic structure');
        }
    };

    const handleDelete = async (slug) => {
        if (window.confirm('Are you sure you want to erase this page from existence?')) {
            try {
                await deletePage(slug).unwrap();
                toast.success('Page erased');
                if (selectedSlug === slug) setSelectedSlug('');
            } catch (err) {
                toast.error('Failed to delete page');
            }
        }
    };

    const handleMediaUpload = async (file, path, sectionIndex = null, sectionField = 'image') => {
        const formData = new FormData();
        formData.append('media', file);
        try {
            const res = await uploadMedia(formData).unwrap();
            if (sectionIndex !== null) {
                const newSections = [...localData.sections];
                newSections[sectionIndex][sectionField] = res.imageUrl;
                setLocalData({ ...localData, sections: newSections });
            } else {
                setLocalData({ 
                    ...localData, 
                    [path]: { ...localData[path], [sectionField]: res.imageUrl } 
                });
            }
            toast.success('Media vaporized and uploaded');
        } catch (err) {
            toast.error('Media upload failed');
        }
    };

    const handlePurgeMedia = async (filePath, path, sectionIndex = null, sectionField = 'image') => {
        try {
            await purgeMedia(filePath).unwrap();
            if (sectionIndex !== null) {
                const newSections = [...localData.sections];
                newSections[sectionIndex][sectionField] = '';
                setLocalData({ ...localData, sections: newSections });
            } else {
                setLocalData({ 
                    ...localData, 
                    [path]: { ...localData[path], [sectionField]: '' } 
                });
            }
            toast.success('Media purged from reality');
        } catch (err) {
            toast.error('Failed to purge media');
        }
    };

    if (isOverviewLoading) return <div className="p-8 animate-pulse text-indigo-400">Scanning the multiverse...</div>;

    const filteredPages = overviewData?.data?.filter(p => 
        p.slug.toLowerCase().includes(searchTerm.toLowerCase()) || 
        p.metadata?.title?.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    return (
        <div className="flex h-screen bg-[#0f172a] text-slate-200 overflow-hidden">
            <ToastContainer position="top-right" autoClose={3000} theme="dark" />
            {/* Sidebar - Page Listing */}
            <div className="w-80 border-r border-slate-800 bg-[#1e293b]/50 flex flex-col">
                <div className="p-6 border-b border-slate-800">
                    <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent flex items-center gap-2">
                        <GlobalIcon size={24} className="text-indigo-400" />
                        Page Manager
                    </h2>
                    <div className="mt-4 relative">
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                        <input 
                            type="text" 
                            placeholder="Find page..." 
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
                    {filteredPages.map(page => (
                        <div 
                            key={page.slug}
                            onClick={() => setSelectedSlug(page.slug)}
                            className={`group p-3 rounded-xl cursor-pointer transition-all border ${selectedSlug === page.slug ? 'bg-indigo-600/20 border-indigo-500 shadow-lg shadow-indigo-500/10' : 'bg-slate-800/40 border-slate-800 hover:border-slate-700 hover:bg-slate-800/60'}`}
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-semibold text-sm text-slate-100 group-hover:text-indigo-300 transition-colors">
                                        {page.metadata?.title || 'Untitled Page'}
                                    </h3>
                                    <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider font-mono">
                                        /{page.slug}
                                    </p>
                                </div>
                                <button 
                                    onClick={(e) => { e.stopPropagation(); handleDelete(page.slug); }}
                                    className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-red-500/20 hover:text-red-400 rounded-md transition-all text-slate-500"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="p-4 border-t border-slate-800">
                    <button 
                        onClick={handleCreateNew}
                        className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-2.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-600/20"
                    >
                        <Plus size={18} />
                        Construct New Page
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {!selectedSlug ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-slate-600 space-y-4">
                        <div className="w-24 h-24 rounded-full bg-slate-800/50 flex items-center justify-center border border-slate-700 animate-pulse">
                            <Layers size={48} />
                        </div>
                        <p className="text-xl font-medium">Select a page or construct a new reality</p>
                    </div>
                ) : isPageLoading && !localData ? (
                    <div className="flex-1 flex items-center justify-center space-x-2 text-indigo-400">
                        <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce delay-75"></div>
                        <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce delay-150"></div>
                        <span className="ml-2">Manifesting Content...</span>
                    </div>
                ) : (
                    <>
                        {/* Header */}
                        <div className="h-20 border-b border-slate-800 px-8 flex items-center justify-between bg-[#0f172a]/80 backdrop-blur-md sticky top-0 z-10">
                            <div>
                                <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                                    <FileText className="text-indigo-400" />
                                    {localData?.metadata?.title || 'Editing Universe'}
                                    <span className="text-xs bg-slate-800 text-slate-500 px-2 py-1 rounded-full font-mono uppercase">
                                        {localData?.slug}
                                    </span>
                                </h1>
                            </div>
                            <div className="flex items-center gap-4">
                                <button className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-400 hover:text-white transition-all">
                                    <Eye size={20} />
                                </button>
                                <button 
                                    onClick={handleSave}
                                    disabled={isUpdating}
                                    className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-indigo-600/30"
                                >
                                    {isUpdating ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save size={20} />}
                                    Synchronize Changes
                                </button>
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="px-8 border-b border-slate-800 bg-[#0f172a]/50">
                            <div className="flex gap-8 overflow-x-auto no-scrollbar">
                                {[
                                    { id: 'architecture', label: 'Architecture', icon: <Layers size={18} /> },
                                    { id: 'seo', label: 'SEO & Meta', icon: <SearchIcon size={18} /> },
                                    { id: 'hero', label: 'Hero Section', icon: <Monitor size={18} /> },
                                    { id: 'sections', label: 'Content Blocks', icon: <Layers size={18} /> },
                                    { id: 'features', label: 'Features', icon: <CheckCircle size={18} /> },
                                    { id: 'faqs', label: 'FAQs', icon: <HelpCircle size={18} /> },
                                    { id: 'cta', label: 'Conversion (CTA)', icon: <CheckCircle size={18} /> },
                                ].map(tab => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex items-center gap-2 py-4 px-1 text-sm font-semibold transition-all border-b-2 whitespace-nowrap ${activeTab === tab.id ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
                                    >
                                        {tab.icon}
                                        {tab.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Editor Canvas */}
                        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar bg-slate-900/40">
                            <div className="max-w-4xl mx-auto space-y-12">
                                
                                {activeTab === 'architecture' && (
                                    <div className="space-y-8 animate-in fade-in duration-500">
                                        <h3 className="text-xl font-bold flex items-center gap-2 text-white">
                                            <Settings className="text-indigo-400" />
                                            Core Page Settings
                                        </h3>
                                        <div className="grid grid-cols-2 gap-8">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Page URL path (Slug)</label>
                                                <input 
                                                    type="text" 
                                                    className="w-full bg-slate-800 border border-slate-700 p-3 rounded-xl focus:outline-none focus:border-indigo-500 transition-all font-mono"
                                                    value={localData?.slug || ''}
                                                    onChange={(e) => setLocalData({ ...localData, slug: e.target.value })}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Category Identifier</label>
                                                <input 
                                                    type="text" 
                                                    className="w-full bg-slate-800 border border-slate-700 p-3 rounded-xl focus:outline-none focus:border-indigo-500 transition-all"
                                                    value={localData?.category || ''}
                                                    onChange={(e) => setLocalData({ ...localData, category: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4 p-4 bg-indigo-500/5 rounded-2xl border border-indigo-500/10">
                                            <input 
                                                type="checkbox" 
                                                id="isActive"
                                                className="w-6 h-6 rounded-lg accent-indigo-500 bg-slate-800 border-slate-700"
                                                checked={localData?.isActive}
                                                onChange={(e) => setLocalData({ ...localData, isActive: e.target.checked })}
                                            />
                                            <label htmlFor="isActive" className="text-lg font-semibold text-slate-200">Broadcast page live (Active)</label>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'seo' && (
                                    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
                                        <h3 className="text-xl font-bold flex items-center gap-2 text-white">
                                            <GlobalIcon className="text-indigo-400" />
                                            Search Engine Optimization
                                        </h3>
                                        <div className="space-y-6">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Meta Title Tag</label>
                                                <input 
                                                    type="text" 
                                                    placeholder="Max 60 characters recommended"
                                                    className="w-full bg-slate-800 border border-slate-700 p-3 rounded-xl focus:outline-none focus:border-indigo-500 transition-all"
                                                    value={localData?.metadata?.title || ''}
                                                    onChange={(e) => setLocalData({ ...localData, metadata: { ...localData.metadata, title: e.target.value } })}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Meta Description</label>
                                                <textarea 
                                                    rows={3}
                                                    placeholder="Focus on conversion and keywords"
                                                    className="w-full bg-slate-800 border border-slate-700 p-3 rounded-xl focus:outline-none focus:border-indigo-500 transition-all"
                                                    value={localData?.metadata?.description || ''}
                                                    onChange={(e) => setLocalData({ ...localData, metadata: { ...localData.metadata, description: e.target.value } })}
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Target Keywords</label>
                                                    <input 
                                                        type="text" 
                                                        placeholder="keyword1, keyword2"
                                                        className="w-full bg-slate-800 border border-slate-700 p-3 rounded-xl focus:outline-none focus:border-indigo-500 transition-all"
                                                        value={localData?.metadata?.keywords || ''}
                                                        onChange={(e) => setLocalData({ ...localData, metadata: { ...localData.metadata, keywords: e.target.value } })}
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Canonical URL</label>
                                                    <input 
                                                        type="text" 
                                                        className="w-full bg-slate-800 border border-slate-700 p-3 rounded-xl focus:outline-none focus:border-indigo-500 transition-all"
                                                        value={localData?.metadata?.canonicalUrl || ''}
                                                        onChange={(e) => setLocalData({ ...localData, metadata: { ...localData.metadata, canonicalUrl: e.target.value } })}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'hero' && (
                                    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
                                        <h3 className="text-xl font-bold flex items-center gap-2 text-white">
                                            <ImageIcon size={24} className="text-indigo-400" />
                                            Hero Visual & Content
                                        </h3>
                                        <div className="flex gap-10">
                                            <div className="flex-1 space-y-6">
                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Top Badge / Tagline</label>
                                                    <input 
                                                        type="text" 
                                                        className="w-full bg-slate-800 border border-slate-700 p-3 rounded-xl focus:outline-none focus:border-indigo-500 transition-all text-indigo-400 font-bold"
                                                        value={localData?.heroSection?.badge || ''}
                                                        onChange={(e) => setLocalData({ ...localData, heroSection: { ...localData.heroSection, badge: e.target.value } })}
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">H1 Hero Heading</label>
                                                    <textarea 
                                                        rows={2}
                                                        className="w-full bg-slate-800 border border-slate-700 p-3 rounded-xl focus:outline-none focus:border-indigo-500 transition-all text-xl font-bold"
                                                        value={localData?.heroSection?.title || ''}
                                                        onChange={(e) => setLocalData({ ...localData, heroSection: { ...localData.heroSection, title: e.target.value } })}
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Sub-heading (Lead Text)</label>
                                                    <textarea 
                                                        rows={3}
                                                        className="w-full bg-slate-800 border border-slate-700 p-3 rounded-xl focus:outline-none focus:border-indigo-500 transition-all text-slate-300"
                                                        value={localData?.heroSection?.subtitle || ''}
                                                        onChange={(e) => setLocalData({ ...localData, heroSection: { ...localData.heroSection, subtitle: e.target.value } })}
                                                    />
                                                </div>
                                            </div>

                                            <div className="w-80 space-y-4">
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Main Media (Image/Video)</label>
                                                <div className="aspect-video bg-slate-800 rounded-2xl border-2 border-dashed border-slate-700 hover:border-indigo-500 transition-all flex flex-col items-center justify-center relative group overflow-hidden">
                                                    {localData?.heroSection?.image ? (
                                                        <>
                                                            {localData.heroSection.image.endsWith('.mp4') ? (
                                                                <video src={localData.heroSection.image.startsWith('http') ? localData.heroSection.image : `${BACKEND_URL}${localData.heroSection.image}`} className="w-full h-full object-cover" />
                                                            ) : (
                                                                <img src={localData.heroSection.image.startsWith('http') ? localData.heroSection.image : `${BACKEND_URL}${localData.heroSection.image}`} alt="Hero" className="w-full h-full object-cover" />
                                                            )}
                                                            <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity gap-4">
                                                                <button 
                                                                    onClick={() => handlePurgeMedia(localData.heroSection.image, 'heroSection')}
                                                                    className="p-3 bg-red-500 hover:bg-red-600 rounded-full text-white transition-all shadow-xl scale-90 group-hover:scale-100"
                                                                >
                                                                    <Trash2 size={24} />
                                                                </button>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <div className="text-center p-6 space-y-3">
                                                            <div className="w-12 h-12 bg-indigo-500/10 rounded-full flex items-center justify-center text-indigo-400 mx-auto group-hover:scale-110 transition-transform">
                                                                <Upload size={24} />
                                                            </div>
                                                            <p className="text-xs font-bold text-slate-400">Transmit Media</p>
                                                            <input 
                                                                type="file" 
                                                                className="absolute inset-0 opacity-0 cursor-pointer" 
                                                                onChange={(e) => handleMediaUpload(e.target.files[0], 'heroSection')} 
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-bold text-slate-600 uppercase">Alt Description (SEO)</label>
                                                    <input 
                                                        type="text" 
                                                        className="w-full bg-slate-800 border border-slate-700 p-2 text-xs rounded-lg focus:outline-none focus:border-indigo-500"
                                                        value={localData?.heroSection?.imageAlt || ''}
                                                        onChange={(e) => setLocalData({ ...localData, heroSection: { ...localData.heroSection, imageAlt: e.target.value } })}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'sections' && (
                                    <div className="space-y-10 animate-in slide-in-from-bottom-4 duration-500">
                                        <div className="flex justify-between items-center">
                                            <h3 className="text-xl font-bold flex items-center gap-2 text-white">
                                                <Layers className="text-indigo-400" />
                                                Core Content Storyboard
                                            </h3>
                                            <button 
                                                onClick={() => setLocalData({
                                                    ...localData,
                                                    sections: [...(localData.sections || []), { title: '', content: '', layout: 'text-left', order: localData.sections?.length || 0 }]
                                                })}
                                                className="bg-slate-800 hover:bg-slate-700 text-indigo-400 border border-slate-700 px-4 py-2 rounded-xl flex items-center gap-2 font-bold transition-all"
                                            >
                                                <Plus size={18} /> Add Block
                                            </button>
                                        </div>

                                        <div className="space-y-6">
                                            {localData?.sections?.map((section, idx) => (
                                                <div key={idx} className="group bg-slate-800/40 border border-slate-800 rounded-3xl p-8 hover:bg-slate-800/60 hover:border-slate-700 transition-all shadow-xl">
                                                    <div className="flex justify-between items-start mb-8   ">
                                                        <div className="flex gap-4">
                                                            <div className="w-10 h-10 bg-indigo-600 flex items-center justify-center rounded-2xl font-bold text-white shadow-lg shadow-indigo-600/20">
                                                                {idx + 1}
                                                            </div>
                                                            <div>
                                                                <input 
                                                                    className="bg-transparent text-xl font-bold text-white focus:outline-none border-b border-transparent focus:border-indigo-500 placeholder-slate-700"
                                                                    placeholder="Block Title..."
                                                                    value={section.title}
                                                                    onChange={(e) => {
                                                                        const newSections = [...localData.sections];
                                                                        newSections[idx].title = e.target.value;
                                                                        setLocalData({ ...localData, sections: newSections });
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <button 
                                                                onClick={() => {
                                                                    const newSections = [...localData.sections];
                                                                    newSections.splice(idx, 1);
                                                                    setLocalData({ ...localData, sections: newSections });
                                                                }}
                                                                className="p-2.5 bg-red-500/10 hover:bg-red-500 rounded-xl text-red-400 hover:text-white transition-all scale-90 group-hover:scale-100"
                                                            >
                                                                <Trash2 size={18} />
                                                            </button>
                                                        </div>
                                                    </div>

                                                    <div className="grid grid-cols-3 gap-10">
                                                        <div className="col-span-2 space-y-6">
                                                            <div className="space-y-2">
                                                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Rich Content Editor (HTML supported)</label>
                                                                <textarea 
                                                                    rows={8}
                                                                    className="w-full bg-[#0f172a] border border-slate-700 p-4 rounded-2xl focus:outline-none focus:border-indigo-500 text-slate-300 leading-relaxed scrollbar-thin overflow-auto"
                                                                    value={section.content}
                                                                    onChange={(e) => {
                                                                        const newSections = [...localData.sections];
                                                                        newSections[idx].content = e.target.value;
                                                                        setLocalData({ ...localData, sections: newSections });
                                                                    }}
                                                                />
                                                            </div>
                                                            <div className="flex gap-4">
                                                                {['text-left', 'text-right', 'full-width', 'two-column'].map(layout => (
                                                                    <button 
                                                                        key={layout}
                                                                        onClick={() => {
                                                                            const newSections = [...localData.sections];
                                                                            newSections[idx].layout = layout;
                                                                            setLocalData({ ...localData, sections: newSections });
                                                                        }}
                                                                        className={`flex-1 py-3 px-2 rounded-xl border text-[10px] font-bold uppercase transition-all ${section.layout === layout ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg' : 'bg-slate-900 border-slate-700 text-slate-500 hover:text-white hover:border-slate-500'}`}
                                                                    >
                                                                        {layout.replace('-', ' ')}
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        <div className="space-y-4">
                                                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Section Media</label>
                                                            <div className="aspect-square bg-[#0f172a] rounded-3xl border-2 border-dashed border-slate-700 hover:border-indigo-500 transition-all flex flex-col items-center justify-center relative group overflow-hidden shadow-inner">
                                                                {section.image ? (
                                                                    <>
                                                                        <img src={section.image.startsWith('http') ? section.image : `${BACKEND_URL}${section.image}`} className="w-full h-full object-cover rounded-[inherit]" alt="" />
                                                                        <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                                                            <button 
                                                                                onClick={() => handlePurgeMedia(section.image, 'sections', idx)}
                                                                                className="p-3 bg-red-500 hover:bg-red-600 rounded-full text-white shadow-xl rotate-0 group-hover:rotate-12 transition-all"
                                                                            >
                                                                                <Trash2 size={24} />
                                                                            </button>
                                                                        </div>
                                                                    </>
                                                                ) : (
                                                                    <div className="text-center p-6 space-y-2">
                                                                        <Upload size={32} className="text-slate-600 mx-auto" />
                                                                        <p className="text-[10px] text-slate-500 font-bold uppercase">Inject Media</p>
                                                                        <input 
                                                                            type="file" 
                                                                            className="absolute inset-0 opacity-0 cursor-pointer" 
                                                                            onChange={(e) => handleMediaUpload(e.target.files[0], 'sections', idx)} 
                                                                        />
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <div className="space-y-2">
                                                                <label className="text-[10px] font-bold text-slate-600 uppercase">Alt Tags</label>
                                                                <input 
                                                                    type="text" 
                                                                    className="w-full bg-[#0f172a] border border-slate-700 p-2 text-[10px] rounded-xl focus:outline-none focus:border-indigo-500"
                                                                    placeholder="Describe image..."
                                                                    value={section.imageAlt || ''}
                                                                    onChange={(e) => {
                                                                        const ns = [...localData.sections];
                                                                        ns[idx].imageAlt = e.target.value;
                                                                        setLocalData({...localData, sections: ns});
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'features' && (
                                    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
                                        <div className="flex justify-between items-center">
                                            <h3 className="text-xl font-bold text-white">Engagement Features</h3>
                                            <button 
                                                onClick={() => setLocalData({ ...localData, features: [...(localData.features || []), { title: '', description: '', icon: 'Check' }] })}
                                                className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl flex items-center gap-2 font-bold transition-all"
                                            >
                                                <Plus size={18} /> New Feature
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-2 gap-6">
                                            {localData?.features?.map((feature, idx) => (
                                                <div key={idx} className="bg-slate-800/40 p-6 rounded-3xl border border-slate-800 space-y-4 hover:border-indigo-500/30 transition-all">
                                                    <div className="flex justify-between items-start">
                                                        <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-400">
                                                            <Type size={24} />
                                                        </div>
                                                        <button onClick={() => {
                                                            const nf = [...localData.features]; nf.splice(idx, 1); setLocalData({ ...localData, features: nf });
                                                        }} className="text-slate-600 hover:text-red-400 p-2 transition-colors">
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                    <input 
                                                        className="w-full bg-slate-900 border border-slate-800 p-2 rounded-xl font-bold placeholder-slate-700"
                                                        placeholder="Feature Title..."
                                                        value={feature.title}
                                                        onChange={(e) => {
                                                            const nf = [...localData.features]; nf[idx].title = e.target.value; setLocalData({ ...localData, features: nf });
                                                        }}
                                                    />
                                                    <textarea 
                                                        rows={2}
                                                        className="w-full bg-slate-900 border border-slate-800 p-2 rounded-xl text-sm text-slate-400 placeholder-slate-700"
                                                        placeholder="Quick description..."
                                                        value={feature.description}
                                                        onChange={(e) => {
                                                            const nf = [...localData.features]; nf[idx].description = e.target.value; setLocalData({ ...localData, features: nf });
                                                        }}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'faqs' && (
                                    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
                                        <div className="flex justify-between items-center">
                                            <h3 className="text-xl font-bold text-white">Frequently Asked Questions</h3>
                                            <button 
                                                onClick={() => setLocalData({ ...localData, faqs: [...(localData.faqs || []), { question: '', answer: '' }] })}
                                                className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 font-bold transition-all border border-slate-700"
                                            >
                                                <Plus size={18} /> New FAQ
                                            </button>
                                        </div>
                                        <div className="space-y-4">
                                            {localData?.faqs?.map((faq, idx) => (
                                                <div key={idx} className="bg-slate-800/40 p-6 rounded-2xl border border-slate-800 space-y-4">
                                                    <div className="flex gap-4">
                                                        <div className="flex-1 space-y-4">
                                                            <input 
                                                                className="w-full bg-slate-900 border border-slate-800 p-3 rounded-xl font-bold placeholder-slate-700 focus:outline-none focus:border-indigo-500"
                                                                placeholder="Inquisitive Question..."
                                                                value={faq.question}
                                                                onChange={(e) => {
                                                                    const nf = [...localData.faqs]; nf[idx].question = e.target.value; setLocalData({ ...localData, faqs: nf });
                                                                }}
                                                            />
                                                            <textarea 
                                                                rows={3}
                                                                className="w-full bg-slate-900 border border-slate-800 p-3 rounded-xl text-slate-400 placeholder-slate-700 focus:outline-none focus:border-indigo-500"
                                                                placeholder="The wisdom / answer..."
                                                                value={faq.answer}
                                                                onChange={(e) => {
                                                                    const nf = [...localData.faqs]; nf[idx].answer = e.target.value; setLocalData({ ...localData, faqs: nf });
                                                                }}
                                                            />
                                                        </div>
                                                        <button onClick={() => {
                                                            const nf = [...localData.faqs]; nf.splice(idx, 1); setLocalData({ ...localData, faqs: nf });
                                                        }} className="self-start p-3 bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500 hover:text-white transition-all">
                                                            <Trash2 size={20} />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'cta' && (
                                    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
                                        <h3 className="text-xl font-bold text-white">Call to Action (Conversion)</h3>
                                        <div className="bg-indigo-600/10 p-10 rounded-3xl border border-indigo-500/20 space-y-8 shadow-2xl">
                                            <div className="grid grid-cols-2 gap-8">
                                                <div className="space-y-4 col-span-2">
                                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Compelling CTA Title</label>
                                                    <input 
                                                        className="w-full bg-slate-900 border border-slate-800 p-4 rounded-2xl text-xl font-bold focus:outline-none focus:border-indigo-500"
                                                        value={localData?.ctaSection?.title || ''}
                                                        onChange={(e) => setLocalData({ ...localData, ctaSection: { ...localData.ctaSection, title: e.target.value } })}
                                                    />
                                                </div>
                                                <div className="space-y-4">
                                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Button Text</label>
                                                    <input 
                                                        className="w-full bg-slate-900 border border-slate-800 p-3 rounded-xl focus:outline-none focus:border-indigo-500"
                                                        value={localData?.ctaSection?.primaryBtnText || ''}
                                                        onChange={(e) => setLocalData({ ...localData, ctaSection: { ...localData.ctaSection, primaryBtnText: e.target.value } })}
                                                    />
                                                </div>
                                                <div className="space-y-4">
                                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Button Link</label>
                                                    <div className="relative">
                                                        <Link className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                                                        <input 
                                                            className="w-full bg-slate-900 border border-slate-800 p-3 pl-10 rounded-xl focus:outline-none focus:border-indigo-500"
                                                            value={localData?.ctaSection?.primaryBtnLink || ''}
                                                            onChange={(e) => setLocalData({ ...localData, ctaSection: { ...localData.ctaSection, primaryBtnLink: e.target.value } })}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                            </div>
                        </div>
                    </>
                )}
            </div>
            
            <style>
                {`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; border-radius: 20px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #475569; }
                `}
            </style>
        </div>
    );
};

export default UniversalPageManager;
