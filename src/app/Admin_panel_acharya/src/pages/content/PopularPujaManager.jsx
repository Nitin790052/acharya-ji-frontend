import React, { useState, useEffect } from 'react';
import {
    useGetAllPujasQuery,
    useCreatePujaMutation,
    useUpdatePujaMutation,
    useDeletePujaMutation,
    useSeedPujasMutation,
    useGetSettingsQuery,
    useUpdateSettingsMutation
} from '../../../../../services/popularPujaApi';
import { BACKEND_URL } from '../../../../../config/apiConfig';
import { FiEdit, FiTrash2, FiEye, FiPlus, FiSettings } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { useRef } from 'react';

const PopularPujaManager = () => {
    // Settings RTK
    const { data: serverSettings, isLoading: isLoadingSettings } = useGetSettingsQuery();
    const [updateSettings, { isLoading: isUpdatingSettings }] = useUpdateSettingsMutation();

    // Pujas RTK
    const { data: pujas = [], isLoading } = useGetAllPujasQuery();
    const [createPuja, { isLoading: isCreating }] = useCreatePujaMutation();
    const [updatePuja, { isLoading: isUpdating }] = useUpdatePujaMutation();
    const [deletePuja] = useDeletePujaMutation();
    const [seedPujas, { isLoading: isSeeding }] = useSeedPujasMutation();

    const imageref = useRef(null);


    // Settings State
    const [settings, setSettings] = useState({
        badge: 'Most Booked Services',
        title: 'Popular Puja Services',
        subtitle: 'Traditional rituals performed by experienced priests with authentic Vedic mantras',
        buttonText: 'View All Puja Services',
        buttonLink: '/pujaServices'
    });

    useEffect(() => {
        if (serverSettings) {
            setSettings({
                badge: serverSettings.badge || '',
                title: serverSettings.title || '',
                subtitle: serverSettings.subtitle || '',
                buttonText: serverSettings.buttonText || '',
                buttonLink: serverSettings.buttonLink || ''
            });
        }
    }, [serverSettings]);

    // Puja State
    const [isEditing, setIsEditing] = useState(false);
    const [currentPuja, setCurrentPuja] = useState({
        name: '', description: '', duration: '', price: '', order: 0,
        popular: false, isActive: true, iconName: 'Home', image: null
    });

    const [imagePreview, setImagePreview] = useState(null);
    const [viewModal, setViewModal] = useState({ isOpen: false, puja: null });

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
                await seedPujas().unwrap();
                toast.success('Pujas seeded successfully!');
            } catch (err) {
                toast.error(err?.data?.message || 'Failed to seed pujas');
            }
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCurrentPuja({ ...currentPuja, image: file });
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', currentPuja.name);
        formData.append('description', currentPuja.description);
        formData.append('duration', currentPuja.duration);
        formData.append('price', currentPuja.price);
        formData.append('order', currentPuja.order || 0);
        formData.append('popular', currentPuja.popular);
        formData.append('isActive', currentPuja.isActive);
        formData.append('iconName', currentPuja.iconName);
        if (currentPuja.image) formData.append('image', currentPuja.image);

        try {
            if (isEditing) {
                await updatePuja({ id: currentPuja._id, formData }).unwrap();
                toast.success('Puja updated successfully');
            } else {
                if (!currentPuja.image) {
                    toast.error("Please select an image");
                    return;
                }
                await createPuja(formData).unwrap();
                toast.success('Puja added successfully');
            }
            resetForm();
        } catch (err) {
            toast.error(err?.data?.message || 'Failed to save puja');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this specific puja?')) {
            try {
                await deletePuja(id).unwrap();
                toast.success('Deleted successfully!');
            } catch (err) {
                toast.error(err?.data?.message || 'Failed to delete');
            }
        }
    };

    const handleEdit = (puja) => {
        setIsEditing(true);
        setCurrentPuja({
            ...puja,
            order: puja.order || "",
            image: null
        });
        setImagePreview(puja.imageUrl.startsWith('http') ? puja.imageUrl : `${BACKEND_URL}${puja.imageUrl}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const resetForm = () => {
        setIsEditing(false);
        setCurrentPuja({ name: '', description: '', duration: '', price: '', order: "", popular: false, isActive: true, iconName: 'Home', image: null });
        setImagePreview(null);
        if (imageref.current) imageref.current.value = "";
    };

    const toggleStatus = async (puja, field) => {
        const formData = new FormData();
        // Append all required fields so backend validation passes
        formData.append('name', puja.name);
        formData.append('description', puja.description);
        formData.append('duration', puja.duration);
        formData.append('price', puja.price);
        formData.append('popular', puja.popular);
        formData.append('isActive', puja.isActive);
        formData.append('order', puja.order || 0);

        // Update the specific status field
        formData.set(field, !puja[field]);

        try {
            await updatePuja({ id: puja._id, formData }).unwrap();
            toast.success(`Status updated!`);
        } catch (err) {
            toast.error(err?.data?.message || 'Failed to update status');
        }
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 uppercase">Popular Puja <span className="text-orange-600">Manager</span></h1>
                    <p className="text-sm text-gray-500 font-medium">Manage the dynamic 'Popular Puja Services' section on the homepage.</p>
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
                        <p className="text-sm text-gray-500">Update the top texts and bottom button of the Popular Pujas section.</p>
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
                                    placeholder="e.g. Most Booked Services"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Main Title</label>
                                <input
                                    type="text" required value={settings.title}
                                    onChange={(e) => setSettings({ ...settings, title: e.target.value })}
                                    className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                                />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-sm font-medium text-gray-700">Subtitle</label>
                                <textarea
                                    required value={settings.subtitle}
                                    onChange={(e) => setSettings({ ...settings, subtitle: e.target.value })}
                                    className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                                    rows="2"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Bottom CTA Button Text</label>
                                <input
                                    type="text" required value={settings.buttonText}
                                    onChange={(e) => setSettings({ ...settings, buttonText: e.target.value })}
                                    className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Bottom CTA Button Link</label>
                                <input
                                    type="text" required value={settings.buttonLink}
                                    onChange={(e) => setSettings({ ...settings, buttonLink: e.target.value })}
                                    className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
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

            {/* Puja Cards Form Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col mb-8">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b">
                    <div className="p-2 bg-yellow-100 text-yellow-600 rounded-lg">
                        <FiPlus size={24} />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-gray-800">{isEditing ? 'Edit Puja Service' : 'Add New Puja Service'}</h2>
                        <p className="text-sm text-gray-500">Fill details below to update the homepage section.</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="space-y-2 lg:col-span-2">
                            <label className="text-sm font-medium text-gray-700">Service Name</label>
                            <input
                                type="text" required value={currentPuja.name}
                                onChange={(e) => setCurrentPuja({ ...currentPuja, name: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
                                placeholder="e.g. Griha Pravesh"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Duration</label>
                            <input
                                type="text" required value={currentPuja.duration}
                                onChange={(e) => setCurrentPuja({ ...currentPuja, duration: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
                                placeholder="e.g. 2-3 hrs"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Price (incl. currency prefix if any)</label>
                            <input
                                type="text" required value={currentPuja.price}
                                onChange={(e) => setCurrentPuja({ ...currentPuja, price: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
                                placeholder="e.g. ₹5,100"
                            />
                        </div>

                        <div className="space-y-2 lg:col-span-3">
                            <label className="text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                required value={currentPuja.description}
                                onChange={(e) => setCurrentPuja({ ...currentPuja, description: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
                                rows="3" placeholder="Brief description of the puja..."
                            />
                        </div>

                        <div className="space-y-2 xl:col-span-1">
                            <label className="text-sm font-medium text-gray-700">Order (Priority)</label>
                            <input
                                type="number" value={currentPuja.order}
                                onChange={(e) => setCurrentPuja({ ...currentPuja, order: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
                                placeholder="e.g. 1"
                            />
                        </div>

                        <div className="space-y-2 lg:col-span-1">
                            <label className="text-sm font-medium text-gray-700">Icon UI</label>
                            <select
                                value={currentPuja.iconName}
                                onChange={(e) => setCurrentPuja({ ...currentPuja, iconName: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
                            >
                                <option value="Home">Home (Griha Pravesh)</option>
                                <option value="Book">Book (Katha)</option>
                                <option value="Droplets">Droplets (Jal/Abhishek)</option>
                                <option value="Star">Star (Graha/Shanti)</option>
                                <option value="Users">Users (Pitru Dosh/Family)</option>
                                <option value="Sparkles">Sparkles (Lakshmi/Wealth)</option>
                            </select>
                        </div>

                        <div className="space-y-2 lg:col-span-1">
                            <label className="text-sm font-medium text-gray-700">{isEditing ? 'Change Image (Optional)' : 'Service Image'}</label>
                            <input
                                type="file" accept="image/*" ref={imageref} onChange={handleImageChange} required={!isEditing}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
                            />
                            {imagePreview && (
                                <img src={imagePreview} alt="Preview" className="h-32 rounded-lg object-cover mt-2 shadow" />
                            )}
                        </div>

                        <div className="space-y-2 flex flex-col pt-8 lg:col-span-2">
                            <label className="flex items-center space-x-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={currentPuja.popular}
                                    onChange={(e) => setCurrentPuja({ ...currentPuja, popular: e.target.checked })}
                                    className="w-5 h-5 text-yellow-500 rounded border-gray-300 focus:ring-yellow-400"
                                />
                                <span className="text-gray-700 font-medium">Mark as "Popular" (Shows Badge)</span>
                            </label>
                            <label className="flex items-center space-x-3 cursor-pointer pt-2">
                                <input
                                    type="checkbox"
                                    checked={currentPuja.isActive}
                                    onChange={(e) => setCurrentPuja({ ...currentPuja, isActive: e.target.checked })}
                                    className="w-5 h-5 text-yellow-500 rounded border-gray-300 focus:ring-yellow-400"
                                />
                                <span className="text-gray-700 font-medium">Active (Visible on website)</span>
                            </label>
                        </div>
                    </div>

                    <div className="flex gap-4 pt-4 border-t">
                        <button type="submit" disabled={isCreating || isUpdating}
                            className="px-6 py-2.5 bg-yellow-400 text-yellow-900 font-bold rounded-lg hover:bg-yellow-500 disabled:bg-gray-300 disabled:text-gray-500">
                            {isCreating || isUpdating ? 'Saving...' : (isEditing ? 'Update Service' : 'Add Service')}
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
                                    <th className="py-4 px-6 font-semibold">Service Name</th>
                                    <th className="py-4 px-6 font-semibold">Duration/Price</th>
                                    <th className="py-4 px-6 font-semibold">Status</th>
                                    <th className="py-4 px-6 font-semibold text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {pujas.map((puja, index) => (
                                    <tr key={puja._id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="py-4 px-6 text-gray-500 font-bold relative">
                                            <div className="bg-gray-100 w-8 h-8 rounded-full flex items-center justify-center text-sm border border-gray-200 shadow-sm">{puja.order || index + 1}</div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <img
                                                src={puja.imageUrl.startsWith('http') ? puja.imageUrl : `${BACKEND_URL}${puja.imageUrl}`}
                                                alt={puja.name}
                                                className="w-16 h-16 object-cover rounded-lg border border-gray-200 shadow-sm"
                                            />
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="font-bold text-gray-800">{puja.name}</div>
                                            <div className="text-xs text-gray-500 line-clamp-1 max-w-xs mt-1">{puja.description}</div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="text-sm font-medium text-gray-700">{puja.duration}</div>
                                            <div className="text-sm font-bold text-green-600">{puja.price}</div>
                                        </td>
                                        <td className="py-4 px-6 space-y-3">
                                            {/* Active Toggle */}
                                            <label className="flex items-center cursor-pointer">
                                                <div className="relative">
                                                    <input
                                                        type="checkbox" className="sr-only"
                                                        checked={puja.isActive}
                                                        onChange={() => toggleStatus(puja, 'isActive')}
                                                    />
                                                    <div className={`block w-10 h-6 rounded-full transition-colors ${puja.isActive ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                                    <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${puja.isActive ? 'transform translate-x-4' : ''}`}></div>
                                                </div>
                                                <div className={`ml-3 text-xs font-bold ${puja.isActive ? 'text-green-600' : 'text-gray-500'}`}>
                                                    {puja.isActive ? 'Active' : 'Inactive'}
                                                </div>
                                            </label>

                                            {/* Popular Toggle */}
                                            <label className="flex items-center cursor-pointer">
                                                <div className="relative">
                                                    <input
                                                        type="checkbox" className="sr-only"
                                                        checked={puja.popular}
                                                        onChange={() => toggleStatus(puja, 'popular')}
                                                    />
                                                    <div className={`block w-10 h-6 rounded-full transition-colors ${puja.popular ? 'bg-yellow-500' : 'bg-gray-300'}`}></div>
                                                    <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${puja.popular ? 'transform translate-x-4' : ''}`}></div>
                                                </div>
                                                <div className={`ml-3 text-xs font-bold ${puja.popular ? 'text-yellow-600' : 'text-gray-500'}`}>
                                                    {puja.popular ? 'Popular' : 'Regular'}
                                                </div>
                                            </label>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center justify-end gap-2">
                                                <button onClick={() => setViewModal({ isOpen: true, puja })} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                                                    <FiEye size={18} />
                                                </button>
                                                <button onClick={() => handleEdit(puja)} className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg">
                                                    <FiEdit size={18} />
                                                </button>
                                                <button onClick={() => handleDelete(puja._id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                                                    <FiTrash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {pujas.length === 0 && (
                                    <tr>
                                        <td colSpan="6" className="py-8 text-center text-gray-500">No popular pujas found. Use seed data or add manually.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* View Modal */}
            {viewModal.isOpen && viewModal.puja && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
                    <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl relative">
                        <button onClick={() => setViewModal({ isOpen: false, puja: null })} className="absolute top-4 right-4 w-8 h-8 bg-black/20 text-white rounded-full flex items-center justify-center hover:bg-black/40 z-10 transition-colors">
                            ×
                        </button>
                        <div className="h-64 relative">
                            <img
                                src={viewModal.puja.imageUrl.startsWith('http') ? viewModal.puja.imageUrl : `${BACKEND_URL}${viewModal.puja.imageUrl}`}
                                className="w-full h-full object-cover"
                                alt={viewModal.puja.name}
                            />
                            {viewModal.puja.popular && (
                                <div className="absolute top-4 left-4 bg-[#E8453C] text-white px-3 py-1 text-xs font-bold rounded-full shadow-lg">POPULAR</div>
                            )}
                        </div>
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-2xl font-black text-gray-800 tracking-tight">{viewModal.puja.name}</h3>
                                    <div className="flex gap-4 mt-2 font-bold text-gray-600 text-sm">
                                        <span className="flex items-center gap-1">⏰ {viewModal.puja.duration}</span>
                                        <span className="flex items-center gap-1 text-green-600">💸 {viewModal.puja.price}</span>
                                    </div>
                                </div>
                            </div>
                            <p className="text-gray-600 leading-relaxed text-sm bg-gray-50 p-4 rounded-xl border border-gray-100 italic">
                                "{viewModal.puja.description}"
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PopularPujaManager;
