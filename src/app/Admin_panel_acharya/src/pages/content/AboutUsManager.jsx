import React, { useState, useRef } from 'react';
import {
    FiSave, FiImage, FiUpload, FiRefreshCw, FiPlus, FiEdit2,
    FiTrash2, FiEye, FiX, FiUser, FiMinus
} from 'react-icons/fi';
import RichTextEditor from '../../components/RichTextEditor';
import { toast } from 'react-toastify';
import {
    useGetAllAboutUsQuery,
    useCreateAboutUsMutation,
    useUpdateAboutUsMutation,
    useDeleteAboutUsMutation,
    useActivateAboutUsMutation,
} from '../../../../../services/aboutUsApi';
import { API_URL as BASE_API_URL } from '../../../../../config/apiConfig';

const BACKEND_URL = BASE_API_URL.replace(/\/api\/?$/, '');

const emptyForm = {
    badge: '',
    title: '',
    highlightTitle: '',
    description1: '',
    description2: '',
    features: [''],
    buttonText: '',
    buttonLink: '',
    button2Text: '',
    button2Link: '',
};

const AboutUsManager = () => {
    const { data: rawData, isLoading, isError, refetch } = useGetAllAboutUsQuery();
    // Guard: API might return a single object (old backend) — always treat as array
    const records = Array.isArray(rawData) ? rawData : (rawData && rawData._id ? [rawData] : []);
    const [createAboutUs, { isLoading: isCreating }] = useCreateAboutUsMutation();
    const [updateAboutUs, { isLoading: isUpdating }] = useUpdateAboutUsMutation();
    const [deleteAboutUs] = useDeleteAboutUsMutation();
    const [activateAboutUs] = useActivateAboutUsMutation();

    const [formData, setFormData] = useState(emptyForm);
    const [editingId, setEditingId] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [viewRecord, setViewRecord] = useState(null);
    const [deleteConfirm, setDeleteConfirm] = useState(null);
    const fileInputRef = useRef(null);
    const formRef = useRef(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const resetForm = () => {
        setFormData(emptyForm);
        setEditingId(null);
        setImageFile(null);
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleFeatureChange = (idx, value) => {
        setFormData(prev => {
            const features = [...prev.features];
            features[idx] = value;
            return { ...prev, features };
        });
    };

    const addFeature = () => setFormData(prev => ({ ...prev, features: [...prev.features, ''] }));

    const removeFeature = (idx) => setFormData(prev => ({
        ...prev,
        features: prev.features.filter((_, i) => i !== idx)
    }));

    const handleEdit = (rec) => {
        setEditingId(rec._id);
        setFormData({
            badge: rec.badge || '',
            title: rec.title || '',
            highlightTitle: rec.highlightTitle || '',
            description1: rec.description1 || rec.description || '',
            description2: rec.description2 || '',
            features: rec.features && rec.features.length > 0 ? rec.features : [''],
            buttonText: rec.buttonText || '',
            buttonLink: rec.buttonLink || '',
            button2Text: rec.button2Text || '',
            button2Link: rec.button2Link || '',
        });
        setImageFile(null);
        setImagePreview((rec.imageUrl || rec.image) ? `${BACKEND_URL}${rec.imageUrl || rec.image}` : null);
        formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.title.trim()) { toast.error('Title is required.'); return; }
        try {
            const submitData = new FormData();
            submitData.append('badge', formData.badge);
            submitData.append('title', formData.title);
            submitData.append('highlightTitle', formData.highlightTitle);
            submitData.append('description1', formData.description1);
            submitData.append('description2', formData.description2);
            submitData.append('features', JSON.stringify(formData.features.filter(f => f.trim())));
            submitData.append('buttonText', formData.buttonText);
            submitData.append('buttonLink', formData.buttonLink);
            submitData.append('button2Text', formData.button2Text);
            submitData.append('button2Link', formData.button2Link);
            if (imageFile) submitData.append('image', imageFile);

            if (editingId) {
                await updateAboutUs({ id: editingId, formData: submitData }).unwrap();
                toast.success('Record updated successfully!');
            } else {
                await createAboutUs(submitData).unwrap();
                toast.success('Record created successfully!');
            }
            resetForm();
        } catch (err) {
            toast.error(err?.data?.message || 'Operation failed. Please try again.');
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteAboutUs(id).unwrap();
            toast.success('Record deleted.');
            setDeleteConfirm(null);
        } catch (err) {
            toast.error('Delete failed.');
        }
    };

    const handleToggleActive = async (id, e) => {
        if (e) e.stopPropagation();
        try {
            await activateAboutUs(id).unwrap();
            toast.success('Record set as active!');
        } catch (err) {
            console.error('Activation error:', err);
            toast.error('Failed to activate record.');
        }
    };

    const isSaving = isCreating || isUpdating;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* ── Page Header ── */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-gray-100 rounded-xl shadow-sm text-blue-900 border border-blue-900/20">
                        <FiUser size={22} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-gray-900 uppercase">About Us <span className="text-orange-600">Manager</span></h1>
                        <p className="text-sm text-gray-500 font-medium tracking-tight">Manage About Us section content displayed on the homepage</p>
                    </div>
                </div>
            </div>

            {/* ── Add / Edit Form ── */}
            <div ref={formRef} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
                <h2 className="text-base font-semibold text-gray-800 mb-5 flex items-center gap-2 border-b border-gray-100 pb-3">
                    {editingId ? <FiEdit2 className="text-blue-900" size={16} /> : <FiPlus className="text-blue-900" size={16} />}
                    {editingId ? 'Edit Record' : 'Add New About Us Record'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Row 1: Badge + Title */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Badge <span className="text-gray-400 normal-case font-normal">(optional)</span></label>
                            <input type="text" name="badge" value={formData.badge} onChange={handleInputChange}
                                placeholder="e.g. About Acharya Ji"
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-900/30 focus:border-blue-900 transition-all text-sm" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Main Title <span className="text-red-500">*</span></label>
                            <input type="text" name="title" value={formData.title} onChange={handleInputChange} required
                                placeholder="e.g. Bringing Divine Blessings to Your Home"
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-900/30 focus:border-blue-900 transition-all text-sm" />
                        </div>
                    </div>

                    {/* Row 2: Highlight Word */}
                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Highlight Word in Title <span className="text-gray-400 normal-case font-normal">(optional)</span></label>
                        <input type="text" name="highlightTitle" value={formData.highlightTitle} onChange={handleInputChange}
                            placeholder="Word(s) to highlight in brand color"
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-900/30 focus:border-blue-900 transition-all text-sm" />
                    </div>

                    {/* Row 3: Description Paragraph 1 */}
                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Description — Paragraph 1 (HTML)</label>
                        <RichTextEditor 
                            value={formData.description1} 
                            onChange={(content) => setFormData(p => ({ ...p, description1: content }))}
                            placeholder="First paragraph about Acharya Ji..."
                        />
                    </div>

                    {/* Row 4: Description Paragraph 2 */}
                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Description — Paragraph 2 (HTML)</label>
                        <RichTextEditor 
                            value={formData.description2} 
                            onChange={(content) => setFormData(p => ({ ...p, description2: content }))}
                            placeholder="Second paragraph about services..."
                        />
                    </div>

                    {/* Row 5: Features List */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Feature Bullet Points</label>
                            <button type="button" onClick={addFeature}
                                className="flex items-center gap-1 px-2.5 py-1 bg-blue-50 text-blue-900 border border-blue-100 rounded-lg text-xs font-medium hover:bg-blue-100 transition-colors">
                                <FiPlus size={11} /> Add Item
                            </button>
                        </div>
                        <div className="space-y-2">
                            {formData.features.map((feat, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        value={feat}
                                        onChange={(e) => handleFeatureChange(idx, e.target.value)}
                                        placeholder={`Feature ${idx + 1}, e.g. 24/7 Customer Support`}
                                        className="flex-1 px-3 py-1.5 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-900/30 focus:border-blue-900 transition-all text-sm"
                                    />
                                    <button type="button" onClick={() => removeFeature(idx)}
                                        disabled={formData.features.length === 1}
                                        className="p-1.5 rounded-lg bg-red-50 text-red-500 border border-red-100 hover:bg-red-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed">
                                        <FiMinus size={12} />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <p className="text-[11px] text-gray-400">These appear as checkmark bullets in the About section.</p>
                    </div>

                    {/* Row 6: Primary Button */}
                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Primary Button</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <input type="text" name="buttonText" value={formData.buttonText} onChange={handleInputChange}
                                placeholder="Label e.g. Learn More About Us"
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-900/30 focus:border-blue-900 transition-all text-sm" />
                            <input type="text" name="buttonLink" value={formData.buttonLink} onChange={handleInputChange}
                                placeholder="Link e.g. /about"
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-900/30 focus:border-blue-900 transition-all text-sm" />
                        </div>
                    </div>

                    {/* Row 7: Secondary Button */}
                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Secondary Button</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <input type="text" name="button2Text" value={formData.button2Text} onChange={handleInputChange}
                                placeholder="Label e.g. Get in Touch"
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-900/30 focus:border-blue-900 transition-all text-sm" />
                            <input type="text" name="button2Link" value={formData.button2Link} onChange={handleInputChange}
                                placeholder="Link e.g. /contact"
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-900/30 focus:border-blue-900 transition-all text-sm" />
                        </div>
                    </div>

                    {/* Row 8: Image Upload (inline compact) */}
                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">About Image</label>
                        <div className="flex items-center gap-4">
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className={`
                                    relative flex-shrink-0 w-28 h-20 rounded-lg overflow-hidden cursor-pointer
                                    border-2 border-dashed transition-all group
                                    ${imagePreview ? 'border-transparent' : 'border-gray-300 hover:border-blue-900'}
                                    bg-gray-50 flex items-center justify-center
                                `}
                            >
                                {imagePreview ? (
                                    <>
                                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover group-hover:brightness-75 transition-all duration-300" />
                                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 flex items-center justify-center">
                                            <FiUpload size={16} className="text-white drop-shadow" />
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex flex-col items-center gap-1">
                                        <FiImage size={18} className="text-gray-400 group-hover:text-blue-900 transition-colors" />
                                        <span className="text-[10px] text-gray-400">Upload</span>
                                    </div>
                                )}
                                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                            </div>
                            <div className="flex-1">
                                <button type="button" onClick={() => fileInputRef.current?.click()}
                                    className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-lg text-xs text-gray-600 hover:border-blue-900 hover:text-blue-900 transition-colors bg-gray-50">
                                    <FiUpload size={12} />
                                    {imageFile ? 'Change Image' : 'Choose File'}
                                </button>
                                {imageFile
                                    ? <p className="text-xs text-green-600 mt-1.5 font-medium">✓ {imageFile.name}</p>
                                    : <p className="text-xs text-gray-400 mt-1.5">Recommended: 800×600px (JPG / WebP)</p>
                                }
                            </div>
                        </div>
                    </div>

                    {/* ── Save / Cancel Buttons (bottom) ── */}
                    <div className="flex items-center gap-3 pt-4 border-t border-gray-100 mt-2">
                        <button type="submit" disabled={isSaving}
                            className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-semibold disabled:opacity-60">
                            {isSaving ? <FiRefreshCw className="animate-spin" size={14} /> : <FiSave size={14} />}
                            {isSaving ? 'Saving...' : (editingId ? 'Update Record' : 'Save Record')}
                        </button>
                        <button type="button" onClick={resetForm}
                            className="flex items-center gap-2 px-6 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium border border-gray-200">
                            <FiX size={14} /> Cancel
                        </button>
                    </div>
                </form>
            </div>

            {/* ── Records Table ── */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <h2 className="text-base font-semibold text-gray-800">All Records</h2>
                    <span className="text-sm text-gray-500">{records.length} record{records.length !== 1 ? 's' : ''}</span>
                </div>

                {isLoading ? (
                    <div className="flex items-center justify-center py-16">
                        <div className="w-8 h-8 border-4 border-blue-900 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : isError ? (
                    <div className="flex flex-col items-center justify-center py-16 gap-3">
                        <p className="text-red-500 font-medium">Error loading records</p>
                        <button onClick={() => refetch()} className="flex items-center gap-2 px-4 py-2 bg-blue-900 text-white rounded-xl text-sm">
                            <FiRefreshCw size={14} /> Retry
                        </button>
                    </div>
                ) : records.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                        <FiUser size={40} className="mb-3 opacity-30" />
                        <p className="font-medium">No records yet.</p>
                        <p className="text-sm">Use the form above to add the first About Us entry.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100 text-left">
                                    <th className="px-5 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider w-16">S.No.</th>
                                    <th className="px-5 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider">Badge</th>
                                    <th className="px-5 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider">Title</th>
                                    <th className="px-5 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider">Description</th>
                                    <th className="px-5 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider">Image</th>
                                    <th className="px-5 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Status</th>
                                    <th className="px-5 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider w-40">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {records.map((rec, idx) => (
                                    <tr key={rec._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-5 py-4 text-gray-500 font-medium">{idx + 1}</td>
                                        <td className="px-5 py-4">
                                            {rec.badge ? (
                                                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-900 border border-blue-100">
                                                    {rec.badge}
                                                </span>
                                            ) : <span className="text-gray-400 italic text-xs">—</span>}
                                        </td>
                                        <td className="px-5 py-4 text-gray-800 font-semibold max-w-[180px]">
                                            <div className="truncate">{rec.title}</div>
                                        </td>
                                        <td className="px-5 py-4 text-gray-500 max-w-[220px]">
                                            <div className="truncate mb-1">{rec.description1 || rec.description || <span className="italic text-gray-400">No primary description</span>}</div>
                                            <div className="truncate text-xs text-gray-400 italic font-normal">{rec.description2 ? rec.description2 : ''}</div>
                                        </td>
                                        <td className="px-5 py-4 text-center">
                                            {(rec.imageUrl || rec.image) ? (
                                                <div className="relative group mx-auto w-24 h-16 rounded-xl overflow-hidden border border-gray-200 shadow-sm transition-all hover:border-blue-900/30">
                                                    <img
                                                        src={`${BACKEND_URL}${rec.imageUrl || rec.image}`}
                                                        alt="About"
                                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="w-24 h-16 bg-gray-50 rounded-xl border border-gray-100 flex flex-col items-center justify-center gap-1 mx-auto text-gray-300">
                                                    <FiImage size={20} />
                                                    <span className="text-[9px] uppercase font-bold tracking-tighter">No Image</span>
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-5 py-4 text-center">
                                            <div className="flex flex-col items-center gap-1.5" onClick={e => e.stopPropagation()}>
                                                <button
                                                    onClick={(e) => handleToggleActive(rec._id, e)}
                                                    type="button"
                                                    className={`
                                                        relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300 focus:outline-none shadow-inner cursor-pointer
                                                        ${rec.isActive ? 'bg-green-500 shadow-green-200' : 'bg-gray-200'}
                                                    `}
                                                >
                                                    <span
                                                        className={`
                                                            ${rec.isActive ? 'translate-x-6' : 'translate-x-1'} 
                                                            inline-block h-4 w-4 transform rounded-full bg-white transition-all duration-300 shadow-md
                                                        `}
                                                    />
                                                </button>
                                                <span className={`text-[10px] font-bold uppercase tracking-widest ${rec.isActive ? 'text-green-600' : 'text-gray-400'}`}>
                                                    {rec.isActive ? 'Active' : 'Inactive'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-1.5">
                                                {/* View */}
                                                <button onClick={() => setViewRecord(rec)} title="View"
                                                    className="p-2 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors border border-blue-100">
                                                    <FiEye size={14} />
                                                </button>
                                                {/* Edit */}
                                                <button onClick={() => handleEdit(rec)} title="Edit"
                                                    className="p-2 rounded-lg bg-amber-50 text-amber-700 hover:bg-amber-100 transition-colors border border-amber-100">
                                                    <FiEdit2 size={14} />
                                                </button>
                                                {/* Delete */}
                                                <button onClick={() => setDeleteConfirm(rec)} title="Delete"
                                                    className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors border border-red-100">
                                                    <FiTrash2 size={14} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* ── View Modal ── */}
            {viewRecord && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setViewRecord(null)}>
                    <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                                <FiEye className="text-blue-900" /> View Record
                            </h3>
                            <button onClick={() => setViewRecord(null)} className="p-2 hover:bg-gray-100 rounded-xl text-gray-500 transition-colors">
                                <FiX size={18} />
                            </button>
                        </div>
                        <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar">
                            {/* Hero Image Section */}
                            <div className="relative group rounded-2xl overflow-hidden border border-gray-100 shadow-sm transition-transform duration-500 hover:scale-[1.01]">
                                {(viewRecord.imageUrl || viewRecord.image) ? (
                                    <img
                                        src={`${BACKEND_URL}${viewRecord.imageUrl || viewRecord.image}`}
                                        alt="About Banner"
                                        className="w-full aspect-[21/9] object-cover"
                                    />
                                ) : (
                                    <div className="w-full aspect-[21/9] bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center gap-3">
                                        <div className="p-4 bg-white rounded-full shadow-sm">
                                            <FiImage size={32} className="text-gray-300" />
                                        </div>
                                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">No Image Provided</p>
                                    </div>
                                )}
                                <div className="absolute top-4 left-4">
                                    <span className="px-3 py-1.5 bg-blue-900/90 text-white text-[10px] font-bold uppercase tracking-widest rounded-full backdrop-blur-md shadow-lg">
                                        Record Preview
                                    </span>
                                </div>
                            </div>

                            {/* Info Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100/50">
                                        <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-2 flex items-center gap-1.5">
                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-900"></div> Badge
                                        </p>
                                        <p className="text-gray-900 font-semibold px-1">{viewRecord.badge || '—'}</p>
                                    </div>
                                    <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100/50">
                                        <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-2 flex items-center gap-1.5">
                                            <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div> Highlight Word
                                        </p>
                                        <p className="text-gray-900 font-semibold px-1 font-serif italic text-lg">{viewRecord.highlightTitle || '—'}</p>
                                    </div>
                                </div>
                                <div className="bg-blue-900/[0.02] p-4 rounded-xl border border-blue-900/5 transition-colors hover:bg-blue-900/[0.04]">
                                    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-2 flex items-center gap-1.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div> Main Title
                                    </p>
                                    <p className="text-gray-800 font-bold text-xl leading-tight px-1">{viewRecord.title}</p>
                                </div>
                            </div>

                            {/* Descriptions */}
                            <div className="space-y-4 pt-2">
                                <div className="relative pl-6 border-l-2 border-blue-900/10">
                                    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-2">Description Paragraph 1</p>
                                    <p className="text-gray-600 text-[14px] leading-relaxed italic">{viewRecord.description1 || viewRecord.description || '—'}</p>
                                </div>
                                <div className="relative pl-6 border-l-2 border-amber-500/10">
                                    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-2">Description Paragraph 2</p>
                                    <p className="text-gray-600 text-[14px] leading-relaxed">{viewRecord.description2 || '—'}</p>
                                </div>
                            </div>

                            {/* Features Section */}
                            {viewRecord.features && viewRecord.features.length > 0 && (
                                <div className="bg-gray-50/30 p-5 rounded-2xl border border-gray-100/50">
                                    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-4 px-1">Feature Bullet Points</p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {viewRecord.features.map((feat, i) => (
                                            <div key={i} className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-gray-100 shadow-sm">
                                                <div className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center text-green-600 flex-shrink-0">
                                                    <FiSave size={10} />
                                                </div>
                                                <span className="text-sm font-medium text-gray-700">{feat}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Buttons Section */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                                <div className="p-4 bg-blue-900 rounded-2xl shadow-md space-y-2 border border-blue-800">
                                    <p className="text-[10px] text-blue-200 uppercase tracking-widest font-bold">Primary Button</p>
                                    <div className="flex flex-col">
                                        <span className="text-white font-bold text-lg">{viewRecord.buttonText || '—'}</span>
                                        <span className="text-blue-200/60 text-xs font-mono truncate">{viewRecord.buttonLink || '—'}</span>
                                    </div>
                                </div>
                                <div className="p-4 bg-white rounded-2xl shadow-sm border border-gray-200 space-y-2">
                                    <p className="text-[10px] text-amber-600 uppercase tracking-widest font-bold">Secondary Button</p>
                                    <div className="flex flex-col">
                                        <span className="text-gray-800 font-bold text-lg">{viewRecord.button2Text || '—'}</span>
                                        <span className="text-gray-400 text-xs font-mono truncate">{viewRecord.button2Link || '—'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3 rounded-b-2xl">
                            <button onClick={() => { setViewRecord(null); handleEdit(viewRecord); }}
                                className="flex items-center gap-2 px-5 py-2 bg-amber-50 text-amber-700 border border-amber-200 rounded-xl hover:bg-amber-100 transition-colors text-sm font-medium">
                                <FiEdit2 size={14} /> Edit
                            </button>
                            <button onClick={() => setViewRecord(null)}
                                className="px-5 py-2 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors text-sm font-medium">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Delete Confirm Modal ── */}
            {deleteConfirm && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
                        <div className="p-6 text-center">
                            <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-100">
                                <FiTrash2 size={24} className="text-red-600" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-800 mb-2">Delete Record?</h3>
                            <p className="text-gray-500 text-sm mb-1">
                                You're about to delete: <span className="font-semibold text-gray-700">"{deleteConfirm.title}"</span>
                            </p>
                            <p className="text-red-500 text-xs">This action cannot be undone.</p>
                        </div>
                        <div className="flex gap-3 px-6 pb-6">
                            <button onClick={() => setDeleteConfirm(null)}
                                className="flex-1 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium text-sm">
                                Cancel
                            </button>
                            <button onClick={() => handleDelete(deleteConfirm._id)}
                                className="flex-1 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-semibold text-sm">
                                Yes, Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AboutUsManager;
