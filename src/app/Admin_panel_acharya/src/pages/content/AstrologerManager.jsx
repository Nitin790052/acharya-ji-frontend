import React, { useState, useEffect, useRef } from 'react';
import {
    useGetAllAstrologersQuery,
    useCreateAstrologerMutation,
    useUpdateAstrologerMutation,
    useDeleteAstrologerMutation,
    useSeedAstrologersMutation,
    useGetSettingsQuery,
    useUpdateSettingsMutation
} from '../../../../../services/astrologerApi';
import { BACKEND_URL } from '../../../../../config/apiConfig';
import { FiEdit, FiTrash2, FiEye, FiPlus, FiSettings } from 'react-icons/fi';
import { toast } from 'react-toastify';

const AstrologerManager = () => {
    // Settings RTK
    const { data: serverSettings, isLoading: isLoadingSettings } = useGetSettingsQuery();
    const [updateSettings, { isLoading: isUpdatingSettings }] = useUpdateSettingsMutation();

    // Astrologers RTK
    const { data: astrologers = [], isLoading } = useGetAllAstrologersQuery();
    const [createAstrologer, { isLoading: isCreating }] = useCreateAstrologerMutation();
    const [updateAstrologer, { isLoading: isUpdating }] = useUpdateAstrologerMutation();
    const [deleteAstrologer] = useDeleteAstrologerMutation();
    const [seedAstrologers, { isLoading: isSeeding }] = useSeedAstrologersMutation();

    const imageref = useRef(null);

    // Settings State
    const [settings, setSettings] = useState({
        badge: 'Live Consultation Available',
        title: 'Talk to Expert Astrologers',
        subtitle: 'Get personalized guidance from verified astrologers available 24/7',
    });

    useEffect(() => {
        if (serverSettings) {
            setSettings({
                badge: serverSettings.badge || '',
                title: serverSettings.title || '',
                subtitle: serverSettings.subtitle || '',
            });
        }
    }, [serverSettings]);

    // Astrologer State
    const [isEditing, setIsEditing] = useState(false);
    const [currentAstrologer, setCurrentAstrologer] = useState({
        name: '', experience: '', rating: 5.0, reviews: 0,
        specialization: '', languages: '', consultations: '0+', expertise: '',
        online: false, isActive: true, order: "", image: null
    });

    const [imagePreview, setImagePreview] = useState(null);
    const [viewModal, setViewModal] = useState({ isOpen: false, data: null });

    const handleSettingsSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateSettings(settings).unwrap();
            toast.success('Section Header Settings updated successfully!');
        } catch (err) {
            toast.error('Failed to update Settings');
        }
    };

    const handleSeed = async () => {
        if (window.confirm("Are you sure you want to seed initial data? This will overwrite existing data.")) {
            try {
                await seedAstrologers().unwrap();
                toast.success('Astrologers seeded successfully!');
            } catch (err) {
                toast.error(err?.data?.message || 'Failed to seed');
            }
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCurrentAstrologer({ ...currentAstrologer, image: file });
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', currentAstrologer.name);
        formData.append('experience', currentAstrologer.experience);
        formData.append('rating', currentAstrologer.rating);
        formData.append('reviews', currentAstrologer.reviews);
        formData.append('specialization', currentAstrologer.specialization);
        formData.append('languages', currentAstrologer.languages);
        formData.append('consultations', currentAstrologer.consultations);
        formData.append('expertise', currentAstrologer.expertise);
        formData.append('online', currentAstrologer.online);
        formData.append('isActive', currentAstrologer.isActive);
        formData.append('order', currentAstrologer.order || 0);
        if (currentAstrologer.image) formData.append('image', currentAstrologer.image);

        try {
            if (isEditing) {
                await updateAstrologer({ id: currentAstrologer._id, formData }).unwrap();
                toast.success('Updated successfully');
            } else {
                if (!currentAstrologer.image) {
                    toast.error("Please select an image");
                    return;
                }
                await createAstrologer(formData).unwrap();
                toast.success('Added successfully');
            }
            resetForm();
        } catch (err) {
            toast.error(err?.data?.message || 'Failed to save');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this record?')) {
            try {
                await deleteAstrologer(id).unwrap();
                toast.success('Deleted successfully!');
            } catch (err) {
                toast.error(err?.data?.message || 'Failed to delete');
            }
        }
    };

    const handleEdit = (data) => {
        setIsEditing(true);
        setCurrentAstrologer({
            ...data,
            specialization: data.specialization.join(', '),
            languages: data.languages.join(', '),
            expertise: data.expertise.join(', '),
            order: data.order || "",
            image: null
        });
        setImagePreview(data.imageUrl.startsWith('http') ? data.imageUrl : `${BACKEND_URL}${data.imageUrl}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const resetForm = () => {
        setIsEditing(false);
        setCurrentAstrologer({
            name: '', experience: '', rating: 5.0, reviews: 0,
            specialization: '', languages: '', consultations: '0+', expertise: '',
            online: false, isActive: true, order: "", image: null
        });
        setImagePreview(null);
        if (imageref.current) imageref.current.value = "";
    };

    const toggleStatus = async (data, field) => {
        const formData = new FormData();
        // Append all required fields
        formData.append('name', data.name);
        formData.append('experience', data.experience);
        formData.append('rating', data.rating);
        formData.append('reviews', data.reviews);
        formData.append('specialization', data.specialization.join(', '));
        formData.append('languages', data.languages.join(', '));
        formData.append('consultations', data.consultations);
        formData.append('expertise', data.expertise.join(', '));
        // Append current statuses
        formData.append('online', data.online);
        formData.append('isActive', data.isActive);
        formData.append('order', data.order || 0);

        // Update target field
        formData.set(field, !data[field]);

        try {
            await updateAstrologer({ id: data._id, formData }).unwrap();
            toast.success(`Status updated!`);
        } catch (err) {
            toast.error(err?.data?.message || 'Failed to update');
        }
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 uppercase">Astrologer <span className="text-orange-600">Manager</span></h1>
                    <p className="text-sm text-gray-500 font-medium italic-none">Manage expert astrologer profiles and consultation settings in the divine community</p>
                </div>
                <button
                    onClick={handleSeed} disabled={isSeeding}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400"
                >
                    {isSeeding ? 'Seeding...' : 'Seed Initial Data'}
                </button>
            </div>

            {/* Section Settings Form */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col mb-8">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b">
                    <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                        <FiSettings size={24} />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-gray-800">Section Header Settings</h2>
                        <p className="text-sm text-gray-500">Update the texts for the top area of the Astrologers section.</p>
                    </div>
                </div>

                {isLoadingSettings ? (
                    <div className="py-4 text-gray-500">Loading settings...</div>
                ) : (
                    <form onSubmit={handleSettingsSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Badge Text (optional)</label>
                                <input
                                    type="text" value={settings.badge}
                                    onChange={(e) => setSettings({ ...settings, badge: e.target.value })}
                                    className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                                    placeholder="e.g. Live Consultation Available"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Main Title</label>
                                <input
                                    type="text" required value={settings.title}
                                    onChange={(e) => setSettings({ ...settings, title: e.target.value })}
                                    className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                                    placeholder="e.g. Talk to Expert Astrologers"
                                />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-sm font-medium text-gray-700">Subtitle</label>
                                <textarea
                                    required value={settings.subtitle}
                                    onChange={(e) => setSettings({ ...settings, subtitle: e.target.value })}
                                    className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                                    rows="2"
                                    placeholder="e.g. Get personalized guidance from verified astrologers available 24/7"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end pt-2">
                            <button type="submit" disabled={isUpdatingSettings}
                                className="px-6 py-2.5 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:text-gray-500">
                                {isUpdatingSettings ? 'Updating...' : 'Save Settings'}
                            </button>
                        </div>
                    </form>
                )}
            </div>

            {/* Record Form Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col mb-8">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b">
                    <div className="p-2 bg-yellow-100 text-yellow-600 rounded-lg">
                        <FiPlus size={24} />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-gray-800">{isEditing ? 'Edit Astrologer' : 'Add New Astrologer'}</h2>
                        <p className="text-sm text-gray-500">Fill details below to update the homepage section.</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="space-y-2 lg:col-span-2">
                            <label className="text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text" required value={currentAstrologer.name}
                                onChange={(e) => setCurrentAstrologer({ ...currentAstrologer, name: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
                                placeholder="e.g. Pandit Rajesh Sharma"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Experience</label>
                            <input
                                type="text" required value={currentAstrologer.experience}
                                onChange={(e) => setCurrentAstrologer({ ...currentAstrologer, experience: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
                                placeholder="e.g. 15+ Years"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Consultations</label>
                            <input
                                type="text" required value={currentAstrologer.consultations}
                                onChange={(e) => setCurrentAstrologer({ ...currentAstrologer, consultations: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
                                placeholder="e.g. 5000+"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Rating (0-5)</label>
                            <input
                                type="number" step="0.1" min="0" max="5" required value={currentAstrologer.rating}
                                onChange={(e) => setCurrentAstrologer({ ...currentAstrologer, rating: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
                                placeholder="e.g. 4.8"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Reviews (Count)</label>
                            <input
                                type="number" required value={currentAstrologer.reviews}
                                onChange={(e) => setCurrentAstrologer({ ...currentAstrologer, reviews: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
                                placeholder="e.g. 1923"
                            />
                        </div>
                        <div className="space-y-2 lg:col-span-2">
                            <label className="text-sm font-medium text-gray-700">Specialization (Comma separated)</label>
                            <input
                                type="text" value={currentAstrologer.specialization}
                                onChange={(e) => setCurrentAstrologer({ ...currentAstrologer, specialization: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
                                placeholder="e.g. Vedic Astrology, Kundli Analysis"
                            />
                        </div>
                        <div className="space-y-2 lg:col-span-2">
                            <label className="text-sm font-medium text-gray-700">Expertise (Comma separated)</label>
                            <input
                                type="text" value={currentAstrologer.expertise}
                                onChange={(e) => setCurrentAstrologer({ ...currentAstrologer, expertise: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
                                placeholder="e.g. Career, Marriage, Business"
                            />
                        </div>

                        <div className="space-y-2 lg:col-span-2">
                            <label className="text-sm font-medium text-gray-700">Languages (Comma separated)</label>
                            <input
                                type="text" value={currentAstrologer.languages}
                                onChange={(e) => setCurrentAstrologer({ ...currentAstrologer, languages: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
                                placeholder="e.g. Hindi, English"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Order (Priority)</label>
                            <input
                                type="number" value={currentAstrologer.order}
                                onChange={(e) => setCurrentAstrologer({ ...currentAstrologer, order: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
                                placeholder="e.g. 1"
                            />
                        </div>

                        <div className="space-y-2 lg:col-span-1">
                            <label className="text-sm font-medium text-gray-700">{isEditing ? 'Change Image (Optional)' : 'Astrologer Image'}</label>
                            <input
                                type="file" accept="image/*" ref={imageref} onChange={handleImageChange} required={!isEditing}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
                            />
                            {imagePreview && (
                                <img src={imagePreview} alt="Preview" className="h-32 rounded-lg object-cover mt-2 shadow" />
                            )}
                        </div>

                        <div className="space-y-2 flex flex-col justify-center">
                            <label className="flex items-center space-x-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={currentAstrologer.online}
                                    onChange={(e) => setCurrentAstrologer({ ...currentAstrologer, online: e.target.checked })}
                                    className="w-5 h-5 text-yellow-500 rounded border-gray-300 focus:ring-yellow-400"
                                />
                                <span className="text-gray-700 font-medium">Online (Shows Green blip)</span>
                            </label>
                            <label className="flex items-center space-x-3 cursor-pointer pt-2">
                                <input
                                    type="checkbox"
                                    checked={currentAstrologer.isActive}
                                    onChange={(e) => setCurrentAstrologer({ ...currentAstrologer, isActive: e.target.checked })}
                                    className="w-5 h-5 text-yellow-500 rounded border-gray-300 focus:ring-yellow-400"
                                />
                                <span className="text-gray-700 font-medium">Active (Visible on website)</span>
                            </label>
                        </div>
                    </div>

                    <div className="flex gap-4 pt-4 border-t">
                        <button type="submit" disabled={isCreating || isUpdating}
                            className="px-6 py-2.5 bg-yellow-400 text-yellow-900 font-bold rounded-lg hover:bg-yellow-500 disabled:bg-gray-300 disabled:text-gray-500">
                            {isCreating || isUpdating ? 'Saving...' : (isEditing ? 'Update Record' : 'Add Record')}
                        </button>
                        {isEditing && (
                            <button type="button" onClick={resetForm} className="px-6 py-2.5 bg-gray-100 text-gray-700 font-bold rounded-lg hover:bg-gray-200">
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {/* Table Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {isLoading ? (
                    <div className="p-8 text-center text-gray-500">Loading data...</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-gray-600 text-sm">
                                <tr>
                                    <th className="py-4 px-6 font-semibold">Order</th>
                                    <th className="py-4 px-6 font-semibold">Image</th>
                                    <th className="py-4 px-6 font-semibold">Name & Spec.</th>
                                    <th className="py-4 px-6 font-semibold">Experience</th>
                                    <th className="py-4 px-6 font-semibold">Status</th>
                                    <th className="py-4 px-6 font-semibold text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {astrologers.map((item, index) => (
                                    <tr key={item._id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="py-4 px-6 text-gray-500 font-bold relative">
                                            <div className="bg-gray-100 w-8 h-8 rounded-full flex items-center justify-center text-sm border border-gray-200 shadow-sm">{item.order || index + 1}</div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <img
                                                src={item.imageUrl.startsWith('http') ? item.imageUrl : `${BACKEND_URL}${item.imageUrl}`}
                                                alt={item.name}
                                                className="w-16 h-16 object-cover rounded-lg border border-gray-200 shadow-sm"
                                            />
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="font-bold text-gray-800">{item.name}</div>
                                            <div className="text-xs text-gray-500 line-clamp-1 max-w-xs mt-1">{item.specialization.join(', ')}</div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="text-sm font-medium text-gray-700">{item.experience}</div>
                                            <div className="text-sm font-bold text-gray-500">
                                                {item.consultations} Consults | ⭐ {item.rating} ({item.reviews})
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 space-y-3">
                                            {/* Active Toggle */}
                                            <label className="flex items-center cursor-pointer">
                                                <div className="relative">
                                                    <input
                                                        type="checkbox" className="sr-only"
                                                        checked={item.isActive}
                                                        onChange={() => toggleStatus(item, 'isActive')}
                                                    />
                                                    <div className={`block w-10 h-6 rounded-full transition-colors ${item.isActive ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                                    <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${item.isActive ? 'transform translate-x-4' : ''}`}></div>
                                                </div>
                                                <div className={`ml-3 text-xs font-bold ${item.isActive ? 'text-green-600' : 'text-gray-500'}`}>
                                                    {item.isActive ? 'Active' : 'Inactive'}
                                                </div>
                                            </label>

                                            {/* Online Toggle */}
                                            <label className="flex items-center cursor-pointer">
                                                <div className="relative">
                                                    <input
                                                        type="checkbox" className="sr-only"
                                                        checked={item.online}
                                                        onChange={() => toggleStatus(item, 'online')}
                                                    />
                                                    <div className={`block w-10 h-6 rounded-full transition-colors ${item.online ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                                                    <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${item.online ? 'transform translate-x-4' : ''}`}></div>
                                                </div>
                                                <div className={`ml-3 text-xs font-bold ${item.online ? 'text-blue-600' : 'text-gray-500'}`}>
                                                    {item.online ? 'Online' : 'Offline'}
                                                </div>
                                            </label>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center justify-end gap-2">
                                                <button onClick={() => setViewModal({ isOpen: true, data: item })} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                                                    <FiEye size={18} />
                                                </button>
                                                <button onClick={() => handleEdit(item)} className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg">
                                                    <FiEdit size={18} />
                                                </button>
                                                <button onClick={() => handleDelete(item._id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                                                    <FiTrash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {astrologers.length === 0 && (
                                    <tr>
                                        <td colSpan="6" className="py-8 text-center text-gray-500">No astrologers found. Use seed data or add manually.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* View Modal */}
            {viewModal.isOpen && viewModal.data && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
                    <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl relative">
                        <button onClick={() => setViewModal({ isOpen: false, data: null })} className="absolute top-4 right-4 w-8 h-8 bg-black/20 text-white rounded-full flex items-center justify-center hover:bg-black/40 z-10 transition-colors">
                            ×
                        </button>
                        <div className="h-64 relative">
                            <img
                                src={viewModal.data.imageUrl.startsWith('http') ? viewModal.data.imageUrl : `${BACKEND_URL}${viewModal.data.imageUrl}`}
                                className="w-full h-full object-cover object-top"
                                alt={viewModal.data.name}
                            />
                            {viewModal.data.online && (
                                <div className="absolute top-4 left-4 bg-[#22C55E] text-white px-3 py-1 text-xs font-bold rounded-full shadow-lg">ONLINE</div>
                            )}
                        </div>
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-2xl font-black text-gray-800 tracking-tight">{viewModal.data.name}</h3>
                                    <div className="flex gap-4 mt-2 font-bold text-gray-600 text-sm">
                                        <span className="flex items-center gap-1">⭐ {viewModal.data.rating}</span>
                                        <span className="flex items-center gap-1 text-yellow-600">({viewModal.data.reviews} reviews)</span>
                                        <span className="flex items-center gap-1 text-blue-600">Cons.: {viewModal.data.consultations}</span>
                                    </div>
                                    <div className="flex gap-2 mt-2 font-bold text-gray-600 text-sm">
                                        <span className="flex items-center gap-1">Languages: {viewModal.data.languages.join(', ')}</span>
                                    </div>
                                </div>
                            </div>
                            <p className="text-gray-600 leading-relaxed text-sm bg-gray-50 p-4 rounded-xl border border-gray-100 italic">
                                Specialization: {viewModal.data.specialization.join(', ')}
                            </p>
                            <p className="text-gray-600 leading-relaxed text-sm bg-gray-50 p-4 mt-2 rounded-xl border border-gray-100 italic">
                                Expertise: {viewModal.data.expertise.join(', ')}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AstrologerManager;
