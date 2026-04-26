import React, { useState, useEffect } from 'react';
import {
    FiSave, FiRefreshCw, FiImage, FiUpload, FiGlobe, FiCode, FiLayers
} from 'react-icons/fi';
import { toast } from 'react-toastify';
import {
    useGetSEOByPageNameQuery,
    useUpdatePageSEOMutation
} from '../../../../../services/seoApi';
import { getImageUrl } from '../../../../../config/apiConfig';

// Define the pages available for SEO management
export const SEO_PAGES = [
    { value: 'home', label: 'Home Page' },
    { value: 'about', label: 'About Us' },
    { value: 'pujaServices', label: 'Puja Services Directory' },
    { value: 'samagri', label: 'Shop Puja Samagri' },
    { value: 'astrologer', label: 'Talk to Astrologer' },
    { value: 'kundli', label: 'Get Kundli' },
    { value: 'vastu', label: 'Vastu Consultation' },
    { value: 'blog', label: 'Blogs Directory' },
    { value: 'career', label: 'Career Hub' },
    { value: 'media', label: 'Media & Press Hub' },
    { value: 'contact', label: 'Contact Us' },
];

const emptyForm = {
    pageName: '',
    title: '',
    description: '',
    keywords: '',
    canonical: '',
    ogImage: '',
    ogType: 'website',
};

const SEOManager = () => {
    const [selectedPage, setSelectedPage] = useState(SEO_PAGES[0].value);
    const [formData, setFormData] = useState(emptyForm);

    const { data: seoConfig, isLoading, isFetching } = useGetSEOByPageNameQuery(selectedPage, {
        skip: !selectedPage,
        pollingInterval: 60000
    });
    
    const [updateSEO, { isLoading: isUpdating }] = useUpdatePageSEOMutation();

    // Populate form when data changes
    useEffect(() => {
        if (seoConfig && !isFetching) {
            setFormData({
                pageName: seoConfig.pageName || selectedPage,
                title: seoConfig.title || '',
                description: seoConfig.description || '',
                keywords: seoConfig.keywords || '',
                canonical: seoConfig.canonical || '',
                ogImage: seoConfig.ogImage || '',
                ogType: seoConfig.ogType || 'website',
            });
        } else if (!seoConfig && !isFetching) {
            setFormData({ ...emptyForm, pageName: selectedPage });
        }
    }, [seoConfig, isFetching, selectedPage]);

    const handleSave = async () => {
        if (!selectedPage) {
            toast.error("Please select a page first.");
            return;
        }

        try {
            await updateSEO({ ...formData, pageName: selectedPage }).unwrap();
            toast.success(`SEO configurations for ${SEO_PAGES.find(p => p.value === selectedPage)?.label} saved successfully!`);
        } catch (error) {
            toast.error(error?.data?.message || 'Failed to save SEO configurations');
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
                <div>
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight">SEO Hub Manager</h1>
                    <p className="text-sm text-gray-500 mt-1 font-medium">Centralized Search Engine Optimization</p>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={() => setSelectedPage(selectedPage)} // Refresh trigger
                        className="p-2 text-gray-400 hover:text-orange-500 hover:bg-orange-50 rounded-xl transition-colors"
                        title="Refresh"
                    >
                        <FiRefreshCw className={`w-5 h-5 ${isFetching ? 'animate-spin' : ''}`} />
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={isUpdating}
                        className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-md shadow-orange-500/20 font-semibold disabled:opacity-50"
                    >
                        {isUpdating ? <FiRefreshCw className="w-5 h-5 animate-spin" /> : <FiSave className="w-5 h-5" />}
                        Save SEO Settings
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                
                {/* Master Page Selector */}
                <div className="lg:col-span-1 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-2 mb-4">
                        <FiLayers className="w-5 h-5 text-orange-500" />
                        <h2 className="text-lg font-bold text-gray-900">Select Page</h2>
                    </div>
                    <div className="space-y-2">
                        {SEO_PAGES.map((page) => (
                            <button
                                key={page.value}
                                onClick={() => setSelectedPage(page.value)}
                                className={`w-full text-left px-4 py-3 rounded-xl transition-all font-semibold ${
                                    selectedPage === page.value 
                                    ? 'bg-orange-50 text-orange-600 border border-orange-200 shadow-sm' 
                                    : 'text-gray-600 hover:bg-gray-50 border border-transparent'
                                }`}
                            >
                                {page.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Metadata Editor */}
                <div className="lg:col-span-3 space-y-6">
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-2 mb-6">
                            <FiGlobe className="w-5 h-5 text-orange-500" />
                            <h2 className="text-lg font-bold text-gray-900">Global Metadata</h2>
                        </div>
                        
                        {(isLoading || isFetching) ? (
                             <div className="flex justify-center items-center h-40">
                                <div className="w-8 h-8 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1 md:col-span-2">
                                    <label className="text-[10px] font-black uppercase text-gray-600 tracking-wider">Meta Title</label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-bold text-gray-800"
                                        placeholder="e.g., Professional Astrology Services | Acharya Ji Online"
                                    />
                                    <p className="text-xs text-gray-500 mt-1 font-medium">Recommended length: 50-60 characters</p>
                                </div>

                                <div className="space-y-1 md:col-span-2">
                                    <label className="text-[10px] font-black uppercase text-gray-600 tracking-wider">Meta Description</label>
                                    <textarea
                                        value={formData.description}
                                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all resize-none h-24 text-gray-700"
                                        placeholder="Brief, compelling summary of this page for search results..."
                                    />
                                    <p className="text-xs text-gray-500 mt-1 font-medium">Recommended length: 150-160 characters</p>
                                </div>

                                <div className="space-y-1 md:col-span-2">
                                    <label className="text-[10px] font-black uppercase text-gray-600 tracking-wider">Keywords (Comma Separated)</label>
                                    <input
                                        type="text"
                                        value={formData.keywords}
                                        onChange={e => setFormData({ ...formData, keywords: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-gray-700"
                                        placeholder="astrology, online puja, kundli reading..."
                                    />
                                </div>
                                
                                <div className="space-y-1 md:col-span-2">
                                    <label className="text-[10px] font-black uppercase text-gray-600 tracking-wider">Canonical URL (Optional)</label>
                                    <input
                                        type="text"
                                        value={formData.canonical}
                                        onChange={e => setFormData({ ...formData, canonical: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-mono text-sm text-gray-600"
                                        placeholder="https://acharya-ji.com/services"
                                    />
                                    <p className="text-xs text-gray-500 mt-1 font-medium">Leave blank to use default route URL</p>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-2 mb-6">
                            <FiImage className="w-5 h-5 text-orange-500" />
                            <h2 className="text-lg font-bold text-gray-900">Social Graph Data (OG Tags)</h2>
                        </div>
                        
                        {(isLoading || isFetching) ? (
                            <div className="flex justify-center items-center h-20"></div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase text-gray-600 tracking-wider">OG Type</label>
                                    <select
                                        value={formData.ogType}
                                        onChange={e => setFormData({ ...formData, ogType: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-semibold text-gray-800"
                                    >
                                        <option value="website">Website</option>
                                        <option value="article">Article</option>
                                        <option value="profile">Profile</option>
                                        <option value="product">Product</option>
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase text-gray-600 tracking-wider">OG Image URL</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={formData.ogImage}
                                            onChange={e => setFormData({ ...formData, ogImage: e.target.value })}
                                            className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-mono text-sm text-gray-600"
                                            placeholder="/images/og-share.jpg"
                                        />
                                    </div>
                                    {formData.ogImage && (
                                        <div className="mt-2 w-full h-32 rounded-xl overflow-hidden border border-gray-200 relative">
                                            <img 
                                                src={getImageUrl(formData.ogImage)} 
                                                alt="OG Preview" 
                                                className="w-full h-full object-cover" 
                                                onError={(e) => { 
                                                    e.target.onerror = null; 
                                                    e.target.parentNode.classList.add('bg-gray-100', 'flex', 'items-center', 'justify-center'); 
                                                    e.target.style.display = 'none'; 
                                                    e.target.insertAdjacentHTML('afterend', '<span class="text-gray-400 text-sm font-semibold">Image Preview Unavailable</span>'); 
                                                }} 
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SEOManager;
