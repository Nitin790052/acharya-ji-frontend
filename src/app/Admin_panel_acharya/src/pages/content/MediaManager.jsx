import React, { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import {
    Eye, Edit, Trash2, X, Plus, Save, Database,
    Video, Newspaper, Calendar, Award, Share2, Image as ImageIcon,
    ExternalLink, MapPin, Loader2, Clock,
    Sparkle,
    NewspaperIcon,
    YoutubeIcon,
    ChevronDown,
    Instagram,
    Users
} from 'lucide-react';
import RichTextEditor from '../../components/RichTextEditor';
import {
    useGetAllMediaQuery,
    useCreateMediaMutation,
    useUpdateMediaMutation,
    useDeleteMediaMutation,
    useSeedMediaMutation,
    useGetMediaSettingsQuery,
    useUpdateMediaSettingsMutation
} from '../../../../../services/mediaApi';
import { BACKEND_URL } from '../../../../../config/apiConfig';

const emptyForm = {
    type: 'news',
    title: '',
    image: '',
    date: '',
    // News
    excerpt: '',
    publication: '',
    link: '',
    // Video
    duration: '',
    views: '',
    videoId: '',
    // Event
    location: '',
    attendees: '',
    description: '',
    // Award
    organization: '',
    year: '',
    // Social
    platform: 'instagram',
    engagement: '',
    video: '',
};

export default function MediaManager() {
    const { data: records = [], isLoading, refetch } = useGetAllMediaQuery(undefined, { pollingInterval: 60000 });
    const [createMedia, { isLoading: isCreating }] = useCreateMediaMutation();
    const [updateMedia, { isLoading: isUpdating }] = useUpdateMediaMutation();
    const [deleteMedia] = useDeleteMediaMutation();
    const [seedMedia, { isLoading: isSeeding }] = useSeedMediaMutation();
    const isWorking = isCreating || isUpdating || isSeeding;

    const [formData, setFormData] = useState(emptyForm);
    const [editingId, setEditingId] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [videoFile, setVideoFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [viewRecord, setViewRecord] = useState(null);
    const [openIconIdx, setOpenIconIdx] = useState(null); // Custom dropdown state
    const [filterType, setFilterType] = useState('all'); // Table filter state
    const fileInputRef = useRef(null);

    const extractYTId = (url) => {
        if (!url || typeof url !== 'string') return url;
        const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[7].length === 11) ? match[7] : url;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        let finalValue = value;

        // Smart YouTube ID extraction if user pastes full link into videoId field
        if ((name === 'videoId' || name === 'link') && (value.includes('youtube.com') || value.includes('youtu.be'))) {
            finalValue = extractYTId(value);
            if (finalValue && finalValue.length === 11) {
                fetchYTMetadata(finalValue);
            }
        }

        setFormData(prev => ({ ...prev, [name]: finalValue }));
    };

    const fetchYTMetadata = async (id) => {
        try {
            const response = await fetch(`${BACKEND_URL}/api/media/fetch-yt-metadata/${id}`);
            if (response.ok) {
                const data = await response.json();
                setFormData(prev => ({
                    ...prev,
                    title: data.title || prev.title,
                    date: data.date || prev.date,
                    views: data.views || prev.views,
                    duration: data.duration || prev.duration,
                    videoId: id,
                    // Priority to fetched thumbnail if no manual file selected
                    image: data.thumbnail || prev.image
                }));
                setImagePreview(data.thumbnail);
                toast.success('Divine Wisdom Fetched: Title, Date, Views & Duration Synchronized!', { autoClose: 2000 });
            } else {
                toast.warn('Could not fetch all metadata. Some fields may remain empty.');
            }
        } catch (err) {
            console.error('YT Metadata fetch failed', err);
            toast.error('Failed to connect to divine stream.');
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const resetForm = () => {
        setFormData(emptyForm);
        setEditingId(null);
        setImageFile(null);
        setVideoFile(null);
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleEdit = (rec) => {
        setEditingId(rec._id);
        setFormData({
            type: rec.type || 'news',
            title: rec.title || '',
            date: rec.date || '',
            excerpt: rec.excerpt || '',
            publication: rec.publication || '',
            link: rec.link || '',
            duration: rec.duration || '',
            views: rec.views || '',
            videoId: rec.videoId || '',
            location: rec.location || '',
            attendees: rec.attendees || '',
            description: rec.description || '',
            organization: rec.organization || '',
            year: rec.year || '',
            platform: rec.platform || 'instagram',
            engagement: rec.engagement || '',
            video: rec.video || '',
        });
        setImageFile(null);
        setImagePreview(rec.image ? (rec.image.startsWith('http') ? rec.image : `${BACKEND_URL}${rec.image}`) : null);
        setVideoFile(null); // Clear any pending uploaded file when editing existing
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const submitData = new FormData();
            Object.entries(formData).forEach(([k, v]) => {
                if (v !== undefined && v !== null) submitData.append(k, v);
            });
            if (imageFile) submitData.append('image', imageFile);
            if (videoFile) submitData.append('video', videoFile);

            if (editingId) {
                await updateMedia({ id: editingId, formData: submitData }).unwrap();
                toast.success('Media updated successfully!');
            } else {
                await createMedia(submitData).unwrap();
                toast.success('Media created successfully!');
            }
            // Trigger sync for Media page
            localStorage.setItem('media_data_updated', Date.now().toString());
            resetForm();
        } catch (err) {
            toast.error(err?.data?.message || 'Error occurred');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this media asset?')) return;
        try {
            await deleteMedia(id).unwrap();
            // Trigger sync for Media page
            localStorage.setItem('media_data_updated', Date.now().toString());
            toast.success('Deleted!');
        } catch (err) {
            toast.error('Delete failed');
        }
    };

    const handleSeed = async () => {
        if (!window.confirm('Seed will replace all media and stats data. Continue?')) return;
        try {
            await seedMedia().unwrap();
            toast.success('Seeded!');
        } catch (err) {
            toast.error('Seed failed');
        }
    };

    const handleSeedStats = async () => {
        if (!window.confirm('Reset stats to defaults?')) return;
        try {
            const defaultStats = [
                { value: '50K+', label: 'Subscribers', iconType: 'youtube' },
                { value: '35K+', label: 'Followers', iconType: 'instagram' },
                { value: '100+', label: 'Features', iconType: 'newspaper' },
                { value: '25+', label: 'Public Events', iconType: 'users' }
            ];
            await updateSettings({ stats: defaultStats }).unwrap();
            toast.success('Stats reset to defaults!');
        } catch (err) {
            toast.error('Failed to reset stats');
        }
    };

    const { data: mediaSettings, isLoading: isSettingsLoading } = useGetMediaSettingsQuery(undefined, { pollingInterval: 60000 });
    const [updateSettings, { isLoading: isUpdatingSettings }] = useUpdateMediaSettingsMutation();
    const [stats, setStats] = useState([]);
    const [cta, setCta] = useState({
        badge: '',
        title: '',
        titleHighlight: '',
        description: '',
        primaryBtnText: '',
        primaryBtnLink: '',
        secondaryBtnText: '',
        secondaryBtnLink: ''
    });

    React.useEffect(() => {
        if (mediaSettings?.stats) {
            setStats(mediaSettings.stats);
        }
        if (mediaSettings?.cta) {
            setCta(mediaSettings.cta);
        }
    }, [mediaSettings]);

    const handleCtaChange = (e) => {
        const { name, value } = e.target;
        setCta(prev => ({ ...prev, [name]: value }));
    };

    const handleStatChange = (index, field, value) => {
        const newStats = [...stats];
        newStats[index] = { ...newStats[index], [field]: value };
        setStats(newStats);
    };

    const handleAddStat = () => {
        setStats([...stats, { value: '0', label: 'New Stat', iconType: 'youtube' }]);
    };

    const handleDeleteStat = (index) => {
        if (!window.confirm('Remove this stat card?')) return;
        setStats(stats.filter((_, i) => i !== index));
    };

    const handleSettingsSubmit = async () => {
        try {
            await updateSettings({ stats, cta }).unwrap();
            // Trigger sync for other tabs
            localStorage.setItem('media_data_updated', Date.now().toString());
            toast.success('Media settings updated successfully!');
        } catch (err) {
            toast.error('Failed to update settings');
        }
    };

    const isSaving = isCreating || isUpdating;
    const inputCls = "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-400 bg-white";
    const labelCls = "block text-[10px] font-black text-gray-800 mb-1.5 uppercase tracking-[0.15em]";

    const availableIcons = [
        { id: 'youtube', Icon: YoutubeIcon, label: 'YouTube', color: 'text-red-600' },
        { id: 'instagram', Icon: Instagram, label: 'Instagram', color: 'text-pink-600' },
        { id: 'newspaper', Icon: NewspaperIcon, label: 'News', color: 'text-blue-600' },
        { id: 'users', Icon: Users, label: 'Users', color: 'text-indigo-600' }
    ];

    const getImg = (url) => !url ? '' : url.startsWith('http') ? url : `${BACKEND_URL}${url}`;

    return (
        <div className="p-6 max-w-7xl mx-auto">

            {/* Page Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 uppercase">Media Hub <span className="text-orange-600">Manager</span></h1>
                    <p className="text-sm text-gray-500 font-medium">Manage news, videos, events and social updates</p>
                </div>
                <button onClick={handleSeed} disabled={isSeeding} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700">
                    <Database className="w-4 h-4" /> {isSeeding ? 'Seeding...' : 'Seed Data'}
                </button>
            </div>

            {/* Add / Edit Form Part */}
            <div className="bg-white rounded-xl shadow-sm border p-5 mb-6">
                <h2 className="text-base font-bold text-gray-700 mb-4 border-b pb-2">{editingId ? 'Edit Media Asset' : 'Add New Media Asset'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                            <label className={labelCls}>Media Category *</label>
                            <select name="type" value={formData.type} onChange={handleInputChange} className={inputCls} required>
                                <option value="news">Press Release</option>
                                <option value="video">Spiritual Video</option>
                                <option value="event">Sacred Event</option>
                                <option value="award">Glory Archive</option>
                                <option value="social">Social Ripple</option>
                            </select>
                        </div>
                        <div className="md:col-span-2">
                            <label className={labelCls}>Headline / Title *</label>
                            <input name="title" value={formData.title} onChange={handleInputChange} className={inputCls} required placeholder="Asset title..." />
                        </div>
                        <div>
                            <label className={labelCls}>Timeline / Date</label>
                            <input name="date" value={formData.date} onChange={handleInputChange} className={inputCls} placeholder="e.g. 15 Dec 2024" />
                        </div>

                        {/* Conditional Rendering Based on type */}
                        {formData.type === 'news' && (
                            <>
                                <div><label className={labelCls}>Publication</label><input name="publication" value={formData.publication} onChange={handleInputChange} className={inputCls} placeholder="e.g. Divine Times" /></div>
                                <div><label className={labelCls}>Link</label><input name="link" value={formData.link} onChange={handleInputChange} className={inputCls} placeholder="https://..." /></div>
                                <div className="md:col-span-3">
                                    <label className={labelCls}>Excerpt (HTML Content)</label>
                                    <RichTextEditor 
                                        value={formData.excerpt} 
                                        onChange={(content) => setFormData(p => ({ ...p, excerpt: content }))}
                                        placeholder="Article summary..."
                                    />
                                </div>
                            </>
                        )}

                        {formData.type === 'video' && (
                            <>
                                <div><label className={labelCls}>YouTube ID</label><input disabled={!!videoFile} name="videoId" value={formData.videoId} onChange={(e) => { handleInputChange(e); if (e.target.value) setVideoFile(null); }} className={`${inputCls} ${!!videoFile ? 'opacity-50 cursor-not-allowed bg-gray-100' : ''}`} placeholder="e.g. dQw4w9WgXcQ" /></div>
                                <div className="md:col-span-2"><label className={labelCls}>Video Link / URL</label><input disabled={!!videoFile} name="link" value={formData.link} onChange={(e) => { handleInputChange(e); if (e.target.value) setVideoFile(null); }} className={`${inputCls} ${!!videoFile ? 'opacity-50 cursor-not-allowed bg-gray-100' : ''}`} placeholder="https://..." /></div>
                                <div><label className={labelCls}>Duration</label><input name="duration" value={formData.duration} onChange={handleInputChange} className={inputCls} placeholder="e.g. 10:30" /></div>
                                <div><label className={labelCls}>Total Views</label><input name="views" value={formData.views} onChange={handleInputChange} className={inputCls} placeholder="e.g. 25K" /></div>
                                <div className="md:col-span-2">
                                    <label className={labelCls}>Upload Stored Video</label>
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="file"
                                            accept="video/*"
                                            disabled={!!formData.videoId || !!formData.link}
                                            onChange={(e) => {
                                                const file = e.target.files[0];
                                                if (file) {
                                                    setVideoFile(file);
                                                    setFormData(prev => ({ ...prev, videoId: '', link: '' })); // Priority to file
                                                }
                                            }}
                                            className={`grow text-xs text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100 cursor-pointer ${(!!formData.videoId || !!formData.link) ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        />
                                        {(videoFile || formData.video) && (
                                            <div className="flex items-center gap-1 text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded">
                                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                                                {videoFile ? 'New File' : 'Stored File'}
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-[9px] text-gray-400 mt-1 uppercase font-bold tracking-tighter italic">
                                        {!!formData.videoId || !!formData.link ? 'Link/YouTube ID active - File upload disabled' : 'Max 150MB per video asset'}
                                    </p>
                                </div>
                            </>
                        )}

                        {formData.type === 'event' && (
                            <>
                                <div><label className={labelCls}>Location</label><input name="location" value={formData.location} onChange={handleInputChange} className={inputCls} placeholder="e.g. New Delhi" /></div>
                                <div><label className={labelCls}>Attendees</label><input name="attendees" value={formData.attendees} onChange={handleInputChange} className={inputCls} placeholder="e.g. 500+" /></div>
                                <div className="md:col-span-3">
                                    <label className={labelCls}>Event Brief (HTML Content)</label>
                                    <RichTextEditor 
                                        value={formData.description} 
                                        onChange={(content) => setFormData(p => ({ ...p, description: content }))}
                                        placeholder="Brief about the event..."
                                    />
                                </div>
                            </>
                        )}

                        {formData.type === 'award' && (
                            <>
                                <div className="md:col-span-2"><label className={labelCls}>Organization</label><input name="organization" value={formData.organization} onChange={handleInputChange} className={inputCls} placeholder="Award given by..." /></div>
                                <div><label className={labelCls}>Honor Year</label><input name="year" value={formData.year} onChange={handleInputChange} className={inputCls} placeholder="e.g. 2024" /></div>
                            </>
                        )}

                        {formData.type === 'social' && (
                            <>
                                <div>
                                    <label className={labelCls}>Platform</label>
                                    <select name="platform" value={formData.platform} onChange={handleInputChange} className={inputCls}>
                                        <option value="instagram">Instagram</option>
                                        <option value="youtube">YouTube</option>
                                        <option value="facebook">Facebook</option>
                                        <option value="twitter">X (Twitter)</option>
                                    </select>
                                </div>
                                <div><label className={labelCls}>Reach / Engagement</label><input name="engagement" value={formData.engagement} onChange={handleInputChange} className={inputCls} placeholder="e.g. 15K Likes" /></div>
                            </>
                        )}

                        <div className="md:col-span-3">
                            <label className={labelCls}>{formData.type === 'video' ? 'Video Thumbnail / Cover Image (Optional)' : 'Image Asset'}</label>
                            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} className="w-full text-sm text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-red-50 file:text-red-600 hover:file:bg-red-100 cursor-pointer" />
                            {imagePreview && (
                                <div className="relative mt-2 inline-block">
                                    <img src={imagePreview} alt="preview" className="h-24 w-40 object-cover rounded-lg border shadow-sm" />
                                    <div className="absolute top-1 right-1 bg-white/80 backdrop-blur-sm px-1.5 py-0.5 rounded text-[8px] font-bold text-gray-600 border border-gray-100">PREVIEW</div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <button type="submit" disabled={isSaving} className="flex items-center gap-2 bg-red-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-red-700 disabled:opacity-50">
                            <Plus className="w-4 h-4" /> {isSaving ? 'Processing...' : (editingId ? 'Update Asset' : 'Add Asset')}
                        </button>
                        {editingId && <button type="button" onClick={resetForm} className="flex items-center gap-2 bg-gray-200 text-gray-700 px-5 py-2 rounded-lg text-sm font-semibold hover:bg-gray-300"><X className="w-4 h-4" /> Cancel</button>}
                    </div>
                </form>
            </div>

            {/* Media Stats Manager */}
            <div className="bg-white rounded-xl shadow-sm border p-5 mb-6">
                <div className="flex items-center justify-between mb-4 border-b pb-2">
                    <div className="flex items-center gap-2">
                        <Share2 className="w-5 h-5 text-blue-600" />
                        <h2 className="text-base font-bold text-gray-700">Media Hub Settings</h2>
                        <button
                            onClick={handleSeedStats}
                            className="p-1 bg-amber-50 text-amber-600 rounded-md hover:bg-amber-100 transition-colors"
                            title="Reset to Defaults"
                        >
                            <Database className="w-3.5 h-3.5" />
                        </button>
                    </div>
                    <button
                        onClick={handleSettingsSubmit}
                        disabled={isUpdatingSettings}
                        className="flex items-center gap-1.5 bg-green-600 text-white px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-green-700 disabled:opacity-50 transition-all shadow-lg hover:shadow-green-100"
                    >
                        {isUpdatingSettings ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                        {isUpdatingSettings ? 'Saving...' : 'Save Hub Settings'}
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Stats Section */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xs font-black uppercase text-gray-400 tracking-widest">Digital Footprint Statistics</h3>
                            <button
                                onClick={handleAddStat}
                                className="flex items-center gap-1 text-[10px] font-black uppercase text-blue-600 hover:text-blue-700"
                            >
                                <Plus className="w-3 h-3" /> Add Stat
                            </button>
                        </div>
                        {isSettingsLoading ? <div className="py-4 text-center text-xs text-gray-400 font-bold uppercase italic tracking-widest animate-pulse">Establishing Connection...</div> : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {stats.map((stat, idx) => (
                                    <div key={idx} className="relative space-y-2 p-4 bg-gray-50/50 rounded-xl border border-gray-200 group/stat hover:bg-white hover:shadow-md transition-all">
                                        <button
                                            onClick={() => handleDeleteStat(idx)}
                                            className="absolute -top-1 -right-1 p-1 bg-red-100 text-red-600 rounded-full opacity-0 group-hover/stat:opacity-100 transition-opacity hover:bg-red-200"
                                            title="Delete Stat"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                        <div className="flex items-center gap-3 mb-2">
                                            {/* Custom Premium Dropdown */}
                                            <div className="relative">
                                                <button
                                                    type="button"
                                                    onClick={() => setOpenIconIdx(openIconIdx === idx ? null : idx)}
                                                    className="w-12 h-12 bg-white rounded-xl border-2 border-gray-100 shadow-sm flex items-center justify-center hover:border-red-400 transition-all group/icon"
                                                >
                                                    {(() => {
                                                        const active = availableIcons.find(i => i.id === stat.iconType) || availableIcons[0];
                                                        const ActiveIcon = active.Icon;
                                                        return <ActiveIcon className={`w-6 h-6 ${active.color} group-hover/icon:scale-110 transition-transform`} />;
                                                    })()}
                                                    <div className="absolute -bottom-1 -right-1 bg-gray-100 rounded-full p-0.5 border border-white shadow-sm">
                                                        <ChevronDown className="w-2.5 h-2.5 text-gray-400" />
                                                    </div>
                                                </button>

                                                {openIconIdx === idx && (
                                                    <>
                                                        <div className="fixed inset-0 z-[60]" onClick={() => setOpenIconIdx(null)} />
                                                        <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 z-[70] overflow-hidden animate-fade-in-up p-2">
                                                            {availableIcons.map((icon) => (
                                                                <button
                                                                    key={icon.id}
                                                                    onClick={() => {
                                                                        handleStatChange(idx, 'iconType', icon.id);
                                                                        setOpenIconIdx(null);
                                                                    }}
                                                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${stat.iconType === icon.id ? 'bg-red-50 text-red-600' : 'hover:bg-gray-50 text-gray-600'}`}
                                                                >
                                                                    <div className={`p-2 rounded-lg ${stat.iconType === icon.id ? 'bg-white shadow-sm' : 'bg-gray-100'}`}>
                                                                        <icon.Icon className={`w-4 h-4 ${icon.color}`} />
                                                                    </div>
                                                                    <span className="text-xs font-black uppercase tracking-widest">{icon.label}</span>
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                            <div className="flex-grow">
                                                <input
                                                    className="w-full bg-transparent border-0 font-black text-[#2A1D13] p-0 focus:ring-0 text-sm scale-y-110"
                                                    value={stat.value}
                                                    onChange={(e) => handleStatChange(idx, 'value', e.target.value)}
                                                    placeholder="50K+"
                                                />
                                                <input
                                                    className="w-full bg-transparent border-0 font-bold text-gray-400 p-0 focus:ring-0 text-[10px] uppercase tracking-widest"
                                                    value={stat.label}
                                                    onChange={(e) => handleStatChange(idx, 'label', e.target.value)}
                                                    placeholder="Subscribers"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* CTA Section */}
                    <div className="space-y-4 border-l pl-8 border-gray-100">
                        <h3 className="text-xs font-black uppercase text-gray-400 tracking-widest">Divine CTA Settings</h3>
                        <div className="space-y-4 bg-gray-50/50 p-5 rounded-2xl border border-gray-100">
                            <div>
                                <label className={labelCls}>Badge Label</label>
                                <input name="badge" value={cta.badge} onChange={handleCtaChange} className={inputCls} placeholder="SPIRITUAL CONNECTION" />
                            </div>
                            <div>
                                <label className={labelCls}>Title Main</label>
                                <input name="title" value={cta.title} onChange={handleCtaChange} className={inputCls} placeholder="EXPERIENCE THE" />
                            </div>
                            <div>
                                <label className={labelCls}>Title Highlight</label>
                                <input name="titleHighlight" value={cta.titleHighlight} onChange={handleCtaChange} className={inputCls} placeholder="DIVINE GRACE" />
                            </div>
                            <div>
                                <label className={labelCls}>Brief Description</label>
                                <textarea name="description" value={cta.description} onChange={handleCtaChange} className={inputCls} rows={2} placeholder="Join family..." />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div><label className={labelCls}>Btn 1 Text</label><input name="primaryBtnText" value={cta.primaryBtnText} onChange={handleCtaChange} className={inputCls} placeholder="Book Puja" /></div>
                                <div><label className={labelCls}>Btn 1 Link</label><input name="primaryBtnLink" value={cta.primaryBtnLink} onChange={handleCtaChange} className={inputCls} placeholder="/link" /></div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div><label className={labelCls}>Btn 2 Text</label><input name="secondaryBtnText" value={cta.secondaryBtnText} onChange={handleCtaChange} className={inputCls} placeholder="Chat" /></div>
                                <div><label className={labelCls}>Btn 2 Link</label><input name="secondaryBtnLink" value={cta.secondaryBtnLink} onChange={handleCtaChange} className={inputCls} placeholder="/link" /></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                <div className="p-4 border-b flex items-center justify-between bg-gray-50 pr-6">
                    <div className="flex items-center gap-4">
                        <h2 className="text-base font-bold text-gray-700">All Media Assets ({records.length})</h2>
                        <select
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                            className="bg-white border border-gray-200 rounded-lg text-[10px] font-black uppercase tracking-widest px-3 py-1.5 focus:ring-2 focus:ring-red-100 outline-none cursor-pointer text-gray-500 hover:border-red-400 transition-all"
                        >
                            <option value="all">Unfiltered View</option>
                            <option value="news">Press Releases</option>
                            <option value="video">Spiritual Videos</option>
                            <option value="event">Sacred Events</option>
                            <option value="award">Glory Archive</option>
                            <option value="social">Social Ripple</option>
                        </select>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div> Hub Records
                    </div>
                </div>
                {isLoading ? <div className="p-8 text-center text-gray-400">Loading library...</div> : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    {['#', 'Image', 'Cluster', 'Headline & Info', 'Timeline', 'Actions'].map(h => (
                                        <th key={h} className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wide">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 font-medium">
                                {records
                                    .filter(rec => filterType === 'all' || rec.type === filterType)
                                    .map((rec, i) => (
                                        <tr key={rec._id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-4 py-3 text-gray-400">{i + 1}</td>
                                            <td className="px-4 py-3">
                                                {rec.image ? (
                                                    <img src={getImg(rec.image)} alt="" className="w-12 h-8 object-cover rounded-lg border shadow-sm" onError={e => e.target.style.display = 'none'} />
                                                ) : rec.videoId ? (
                                                    <img src={`https://img.youtube.com/vi/${rec.videoId}/hqdefault.jpg`} alt="" className="w-12 h-8 object-cover rounded-lg border shadow-sm opacity-80" />
                                                ) : (
                                                    <div className="w-12 h-8 bg-gray-100 rounded-lg border border-dashed flex items-center justify-center">
                                                        <ImageIcon className="w-4 h-4 text-gray-300" />
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className={`px-2 py-1 inline-block rounded text-[8px] font-black uppercase tracking-[0.2em] shadow-sm ${rec.type === 'video' ? 'bg-amber-100 text-amber-700' :
                                                    rec.type === 'news' ? 'bg-blue-100 text-blue-700' :
                                                        rec.type === 'event' ? 'bg-teal-100 text-teal-700' :
                                                            rec.type === 'award' ? 'bg-rose-100 text-rose-700' :
                                                                'bg-gray-100 text-gray-600'
                                                    }`}>
                                                    {rec.type === 'video' ? 'Video Hub' :
                                                        rec.type === 'news' ? 'Press' :
                                                            rec.type === 'event' ? 'Event' :
                                                                rec.type === 'award' ? 'Honors' :
                                                                    rec.type}
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 max-w-sm">
                                                <div className="font-bold text-gray-800 line-clamp-1">{rec.title}</div>
                                                <div className="text-[10px] text-gray-400 truncate mt-0.5">{rec.publication || rec.excerpt || 'Acharya Hub'}</div>
                                            </td>
                                            <td className="px-4 py-3 text-gray-500 text-xs">{rec.date || 'LATEST'}</td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-2">
                                                    <button onClick={() => setViewRecord(rec)} className="p-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100" title="Inspect"><Eye className="w-4 h-4" /></button>
                                                    <button onClick={() => handleEdit(rec)} className="p-1.5 bg-amber-50 text-amber-600 rounded-lg hover:bg-amber-100" title="Modify"><Edit className="w-4 h-4" /></button>
                                                    <button onClick={() => handleDelete(rec._id)} className="p-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100" title="Delete"><Trash2 className="w-4 h-4" /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                {records.length === 0 && <tr><td colSpan={6} className="px-4 py-12 text-center text-gray-400">Library is empty. Add a record or Seed data.</td></tr>}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* View Modal */}
            {viewRecord && (
                <div className="fixed inset-0 bg-black/60 z-[2000] flex items-center justify-center p-4 backdrop-blur-md animate-fade-in" onClick={() => setViewRecord(null)}>
                    <div className="bg-white p-2  shadow-[0_50px_100px_rgba(0,0,0,0.3)] max-w-xl w-full max-h-[90vh] overflow-y-auto border border-white animate-scale-in" onClick={e => e.stopPropagation()}>
                        <div className="relative">
                            {viewRecord.video ? (
                                <div className="w-full h-64 bg-black   overflow-hidden flex items-center justify-center">
                                    <video
                                        controls
                                        className="w-full h-full object-contain"
                                        src={`${BACKEND_URL}${viewRecord.video}`}
                                    />
                                </div>
                            ) : viewRecord.image ? (
                                <img src={getImg(viewRecord.image)} alt="" className="w-full h-64 object-cover rounded-sm " />
                            ) : viewRecord.videoId ? (
                                <img src={`https://img.youtube.com/vi/${viewRecord.videoId}/maxresdefault.jpg`} alt="" className="w-full h-64 object-cover rounded-t-[2.5rem]" onError={(e) => e.target.src = `https://img.youtube.com/vi/${viewRecord.videoId}/hqdefault.jpg`} />
                            ) : (
                                <div className="w-full h-64 bg-[#2A1D13]  flex items-center justify-center">
                                    <ImageIcon className="w-16 h-16 text-white opacity-10" />
                                </div>
                            )}
                            <button onClick={() => setViewRecord(null)} className="absolute top-6 right-6 bg-black/40 backdrop-blur-xl text-white rounded-full p-3 hover:bg-black/60 shadow-2xl border border-white/20 transition-all"><X className="w-6 h-6" /></button>
                            <div className="absolute top-6 left-6 bg-red-600 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] shadow-2xl border border-red-500">
                                {viewRecord.type} Resonance Hub
                            </div>
                        </div>

                        <div className="p-8 sm:p-10">
                            <div className="flex items-center gap-2 mb-2 text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                                <Sparkle className="w-3 h-3" /> {viewRecord.type} Details
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">{viewRecord.title}</h3>
                            <div className="flex items-center gap-3 text-xs text-gray-500 mb-8 pb-4 border-b">
                                <Calendar className="w-4 h-4 text-gray-400" /> {viewRecord.date || 'No Date'}
                                {viewRecord.views && <><div className="w-1 h-1 bg-gray-300 rounded-full" /><Video className="w-4 h-4 text-gray-400 ml-1" /> {viewRecord.views} Views</>}
                            </div>

                            <div className="space-y-6">
                                {(viewRecord.excerpt || viewRecord.description) && (
                                    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                                        <p className="text-sm text-gray-600 leading-relaxed">
                                            {viewRecord.excerpt || viewRecord.description}
                                        </p>
                                    </div>
                                )}

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {/* Simplified Details */}
                                    {viewRecord.publication && <div className="p-4 bg-white border border-gray-100 rounded-xl shadow-sm"><p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Publication</p><p className="text-sm font-semibold text-gray-800 flex items-center gap-2"><Newspaper className="w-4 h-4 text-blue-500" /> {viewRecord.publication}</p></div>}
                                    {viewRecord.location && <div className="p-4 bg-white border border-gray-100 rounded-xl shadow-sm"><p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Location</p><p className="text-sm font-semibold text-gray-800 flex items-center gap-2"><MapPin className="w-4 h-4 text-rose-500" /> {viewRecord.location}</p></div>}
                                    {viewRecord.duration && <div className="p-4 bg-white border border-gray-100 rounded-xl shadow-sm"><p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Duration</p><p className="text-sm font-semibold text-gray-800 flex items-center gap-2"><Clock className="w-4 h-4 text-amber-500" /> {viewRecord.duration}</p></div>}
                                    {viewRecord.attendees && <div className="p-4 bg-white border border-gray-100 rounded-xl shadow-sm"><p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Attendees</p><p className="text-sm font-semibold text-gray-800 flex items-center gap-2"><Users className="w-4 h-4 text-teal-500" /> {viewRecord.attendees}</p></div>}
                                    {viewRecord.organization && <div className="p-4 bg-white border border-gray-100 rounded-xl shadow-sm"><p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Organization</p><p className="text-sm font-semibold text-gray-800 flex items-center gap-2"><Award className="w-4 h-4 text-amber-500" /> {viewRecord.organization}</p></div>}
                                    {viewRecord.year && <div className="p-4 bg-white border border-gray-100 rounded-xl shadow-sm"><p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Year</p><p className="text-sm font-semibold text-gray-800 flex items-center gap-2"><Calendar className="w-4 h-4 text-red-500" /> {viewRecord.year}</p></div>}
                                    {viewRecord.platform && <div className="p-4 bg-white border border-gray-100 rounded-xl shadow-sm"><p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Social Platform</p><p className="text-sm font-semibold text-gray-800 flex items-center gap-2"><Share2 className="w-4 h-4 text-pink-500" /> {viewRecord.platform}</p></div>}
                                </div>
                            </div>

                            <div className="mt-10 pt-6 border-t flex items-center justify-end gap-3">
                                <button onClick={() => { setViewRecord(null); handleEdit(viewRecord); }} className="px-6 py-2.5 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100 transition-all">Edit Record</button>
                                <button onClick={() => setViewRecord(null)} className="px-8 py-2.5 bg-gray-900 text-white rounded-xl text-xs font-bold hover:bg-gray-800 transition-all shadow-lg active:scale-95">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
