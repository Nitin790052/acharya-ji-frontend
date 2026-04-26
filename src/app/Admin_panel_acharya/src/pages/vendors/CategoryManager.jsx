import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
    FiSearch,
    FiFilter,
    FiEye,
    FiEdit2,
    FiTrash2,
    FiStar,
    FiMapPin,
    FiPhone,
    FiCheckCircle,
    FiClock,
    FiMail,
    FiPackage,
    FiX,
    FiInfo,
    FiImage,
    FiEyeOff
} from 'react-icons/fi';
import { API_URL, getImageUrl } from '../../../../../config/apiConfig';

const CategoryManager = () => {
    const { categoryType } = useParams();
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [vendors, setVendors] = useState([]);
    
    // Modal States
    const [selectedVendor, setSelectedVendor] = useState(null);
    const [services, setServices] = useState([]);
    const [servicesLoading, setServicesLoading] = useState(false);
    const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [updateLoading, setUpdateLoading] = useState(false);

    const categoryName = categoryType || 'Vendor';

    useEffect(() => {
        fetchVendors();
    }, [categoryType]);

    const fetchVendors = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/vendors?category=${encodeURIComponent(categoryType)}`);
            const data = await response.json();
            if (data.success) {
                setVendors(data.data);
            }
        } catch (error) {
            console.error('Error fetching vendors:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchVendorServices = async (vendor) => {
        setSelectedVendor(vendor);
        setIsServiceModalOpen(true);
        setServicesLoading(true);
        try {
            const response = await fetch(`${API_URL}/vendors/services/${vendor._id}`);
            const data = await response.json();
            if (data.success) {
                setServices(data.data);
            }
        } catch (error) {
            console.error('Error fetching services:', error);
        } finally {
            setServicesLoading(false);
        }
    };

    const handleUpdateVendor = async (e) => {
        e.preventDefault();
        setUpdateLoading(true);
        const formData = new FormData(e.target);
        
        // No need to manually create an object, just send the FormData
        // because it now includes a file.

        try {
            const response = await fetch(`${API_URL}/vendors/${selectedVendor._id}`, {
                method: 'PATCH',
                body: formData // Send as FormData for file upload
            });
            const data = await response.json();
            if (data.success) {
                setVendors(prev => prev.map(v => v._id === selectedVendor._id ? data.data : v));
                setIsEditModalOpen(false);
                alert('Vendor updated successfully!');
            }
        } catch (error) {
            console.error('Error updating vendor:', error);
            alert('Failed to update vendor');
        } finally {
            setUpdateLoading(false);
        }
    };

    const handleAddVendor = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const password = formData.get('password');

        // --- Validations ---
        if (name.trim().length < 3) {
            return alert('Name must be at least 3 characters long');
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return alert('Please enter a valid email address');
        }

        if (!/^\d{10}$/.test(phone)) {
            return alert('Phone number must be exactly 10 digits');
        }

        if (password.length < 6) {
            return alert('Password must be at least 6 characters long');
        }

        setUpdateLoading(true);
        
        // Add additional required fields for registration
        formData.append('mobile', phone);
        formData.append('category', categoryType);
        formData.append('status', 'approved');

        try {
            const response = await fetch(`${API_URL}/vendors/register`, {
                method: 'POST',
                body: formData // Send as FormData for file upload
            });
            const data = await response.json();
            if (data.success) {
                fetchVendors(); // Refresh list
                setIsAddModalOpen(false);
                alert('New vendor added successfully!');
            } else {
                alert(data.message || 'Failed to add vendor');
            }
        } catch (error) {
            console.error('Error adding vendor:', error);
            alert('Server error while adding vendor');
        } finally {
            setUpdateLoading(false);
        }
    };

    const handleDeleteVendor = async (vendorId) => {
        if (!window.confirm('Are you sure you want to delete this vendor? This action cannot be undone.')) return;

        try {
            const response = await fetch(`${API_URL}/vendors/${vendorId}`, {
                method: 'DELETE'
            });
            const data = await response.json();
            if (data.success) {
                setVendors(prev => prev.filter(v => v._id !== vendorId));
                alert('Vendor deleted successfully!');
            } else {
                alert(data.message || 'Failed to delete vendor');
            }
        } catch (error) {
            console.error('Error deleting vendor:', error);
            alert('Server error while deleting vendor');
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'approved': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
            case 'pending': return 'bg-amber-100 text-amber-700 border-amber-200';
            case 'rejected': return 'bg-rose-100 text-rose-700 border-rose-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    const getServiceStatusStyles = (status) => {
        const base = "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border";
        switch(status) {
          case 'approved': return `${base} bg-emerald-50 text-emerald-600 border-emerald-100`;
          case 'pending': return `${base} bg-amber-50 text-amber-600 border-amber-100`;
          case 'rejected': return `${base} bg-red-50 text-red-600 border-red-100`;
          default: return `${base} bg-gray-100 text-gray-600 border-gray-200`;
        }
    };

    const filteredVendors = vendors.filter(vendor =>
        vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.phone?.includes(searchTerm)
    );

    // --- Vendor Details Modal ---
    const VendorDetailsModal = () => {
        if (!isDetailsModalOpen || !selectedVendor) return null;
        return (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={() => setIsDetailsModalOpen(false)}></div>
                <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                    <div className="bg-gradient-to-r from-blue-900 to-indigo-900 p-6 text-white flex justify-between items-start">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl font-black backdrop-blur-md border border-white/30 capitalize">
                                {selectedVendor.name.charAt(0)}
                            </div>
                            <div>
                                <h3 className="text-xl font-black uppercase tracking-tight">{selectedVendor.name}</h3>
                                <p className="text-blue-100 text-xs font-medium uppercase tracking-widest">{selectedVendor.category} Vendor</p>
                            </div>
                        </div>
                        <button onClick={() => setIsDetailsModalOpen(false)} className="p-2 hover:bg-white/10 rounded-xl transition-all">
                            <FiX size={24} />
                        </button>
                    </div>
                    <div className="p-6 space-y-4">
                        <DetailItem icon={<FiMail />} label="Email Address" value={selectedVendor.email} color="blue" />
                        <DetailItem icon={<FiPhone />} label="Phone Number" value={selectedVendor.phone} color="indigo" />
                        <DetailItem icon={<FiMapPin />} label="Location" value={selectedVendor.categoryData?.location || 'Not Provided'} color="emerald" />
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">Status</p>
                                <span className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase ${getStatusColor(selectedVendor.status)}`}>
                                    {selectedVendor.status}
                                </span>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">Registered On</p>
                                <p className="text-sm font-bold text-gray-800">{new Date(selectedVendor.createdAt).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-6 bg-gray-50 border-t border-gray-100 flex gap-3">
                        <button onClick={() => setIsDetailsModalOpen(false)} className="flex-1 py-3 bg-white border border-gray-200 text-gray-700 font-bold rounded-2xl hover:bg-gray-100 uppercase text-xs tracking-widest">Close</button>
                        <button onClick={() => { setIsDetailsModalOpen(false); fetchVendorServices(selectedVendor); }} className="flex-1 py-3 bg-blue-900 text-white font-bold rounded-2xl hover:bg-blue-800 uppercase text-xs tracking-widest flex items-center justify-center gap-2 shadow-lg">
                            <FiPackage /> View Services
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    const DetailItem = ({ icon, label, value, color }) => (
        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
            <div className={`w-10 h-10 bg-${color}-100 text-${color}-600 rounded-xl flex items-center justify-center text-lg`}>
                {icon}
            </div>
            <div>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{label}</p>
                <p className="text-sm font-bold text-gray-800">{value}</p>
            </div>
        </div>
    );

    return (
        <div className="p-4 md:p-6 space-y-6">
            <VendorDetailsModal />
            <EditVendorModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} vendor={selectedVendor} onUpdate={handleUpdateVendor} loading={updateLoading} />
            <AddVendorModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onAdd={handleAddVendor} loading={updateLoading} categoryName={categoryName} />
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 uppercase">{categoryName} <span className="text-orange-600">Management</span></h1>
                    <p className="text-sm text-gray-500 font-medium mt-1">Manage and monitor all {categoryName} vendors</p>
                </div>
                <div className="flex items-center gap-3">
                    <button onClick={fetchVendors} className="p-2 hover:bg-gray-100 rounded-lg text-gray-600" title="Refresh">
                        <FiClock className={loading ? 'animate-spin' : ''} />
                    </button>
                    <button 
                        onClick={() => setIsAddModalOpen(true)}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl font-medium shadow-sm flex items-center gap-2 transition-all active:scale-95"
                    >
                        <span>+ Add New {categoryName}</span>
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between items-center">
                    <div className="relative w-full sm:w-96">
                        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input type="text" placeholder={`Search ${categoryName}...`} className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none text-sm" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 border border-gray-100 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all"><FiFilter /> Filter</button>
                        <button className="flex-1 sm:flex-none px-4 py-2 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-gray-800 transition-all">Export</button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50/50 text-gray-500 text-xs uppercase font-semibold">
                            <tr>
                                <th className="px-6 py-4">Vendor Info</th>
                                <th className="px-6 py-4">Contact</th>
                                <th className="px-6 py-4 text-center">Status</th>
                                <th className="px-6 py-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading ? (
                                <tr><td colSpan="4" className="px-6 py-12 text-center text-gray-500">Loading {categoryName}s...</td></tr>
                            ) : filteredVendors.length === 0 ? (
                                <tr><td colSpan="4" className="px-6 py-12 text-center text-gray-500">No vendors found.</td></tr>
                            ) : (
                                filteredVendors.map((vendor) => (
                                    <tr key={vendor._id} className="hover:bg-gray-50/50 transition-all">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-900 font-bold border-2 border-white shadow-sm capitalize">{vendor.name.charAt(0)}</div>
                                                <div><p className="text-sm font-bold text-gray-800">{vendor.name}</p><p className="text-[10px] text-gray-400 font-bold uppercase">{vendor.categoryData?.location || 'N/A'}</p></div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1.5 text-xs text-gray-600 mb-1"><FiMail size={12} /> {vendor.email}</div>
                                            <div className="flex items-center gap-1.5 text-xs text-gray-600"><FiPhone size={12} /> {vendor.phone}</div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase border ${getStatusColor(vendor.status)}`}>{vendor.status}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center gap-2">
                                                <ActionButton onClick={() => fetchVendorServices(vendor)} icon={<FiPackage />} color="orange" title="Services" />
                                                <ActionButton onClick={() => { setSelectedVendor(vendor); setIsDetailsModalOpen(true); }} icon={<FiEye />} color="green" title="View" />
                                                <ActionButton onClick={() => { setSelectedVendor(vendor); setIsEditModalOpen(true); }} icon={<FiEdit2 />} color="blue" title="Edit" />
                                                <ActionButton onClick={() => handleDeleteVendor(vendor._id)} icon={<FiTrash2 />} color="red" title="Delete" />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Service Modal */}
            {isServiceModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={() => setIsServiceModalOpen(false)}></div>
                    <div className="relative bg-white w-full max-w-4xl max-h-[80vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <h2 className="text-xl font-black uppercase">Services for <span className="text-orange-600">{selectedVendor?.name}</span></h2>
                            <button onClick={() => setIsServiceModalOpen(false)} className="p-2 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-xl"><FiX size={24} /></button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-6">
                            {servicesLoading ? (
                                <div className="text-center py-10 font-bold text-gray-400 uppercase tracking-widest">Loading Services...</div>
                            ) : services.length === 0 ? (
                                <div className="text-center py-10 text-gray-500 font-medium">No services added by this vendor.</div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {services.map(s => (
                                        <div key={s._id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all">
                                            <div className="aspect-video bg-gray-100 relative">
                                                {s.image ? <img src={getImageUrl(s.image)} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-gray-300"><FiImage size={30} /></div>}
                                                <span className={`absolute top-2 right-2 px-2 py-0.5 rounded-lg text-[10px] font-black uppercase ${getServiceStatusStyles(s.approvalStatus)}`}>{s.approvalStatus}</span>
                                            </div>
                                            <div className="p-4">
                                                <div className="flex justify-between items-start mb-1"><h4 className="font-bold text-gray-900 truncate">{s.title}</h4><span className="text-orange-600 font-black text-sm">₹{s.price}</span></div>
                                                <p className="text-[10px] text-gray-500 line-clamp-2">{s.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const ActionButton = ({ onClick, icon, color, title }) => (
    <button onClick={onClick} className={`p-2 bg-${color}-50 hover:bg-${color}-100 rounded-lg text-${color}-600 shadow-sm border border-${color}-200 transition-all cursor-pointer`} title={title}>
        {React.cloneElement(icon, { size: 16 })}
    </button>
);

const EditVendorModal = ({ isOpen, onClose, vendor, onUpdate, loading }) => {
    const [previewUrl, setPreviewUrl] = useState(null);
    const [logoPreview, setLogoPreview] = useState(null);

    useEffect(() => {
        if (vendor?.avatar) {
            setPreviewUrl(getImageUrl(vendor.avatar));
        } else {
            setPreviewUrl(null);
        }
        if (vendor?.logo) {
            setLogoPreview(getImageUrl(vendor.logo));
        } else {
            setLogoPreview(null);
        }
    }, [vendor]);

    if (!isOpen || !vendor) return null;

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={onClose}></div>
            <div className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 text-white flex justify-between items-center shadow-lg">
                    <h3 className="text-xl font-black uppercase tracking-tight">Edit {vendor.category || 'Vendor'} Info</h3>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-xl transition-all"><FiX size={24} /></button>
                </div>
                <form onSubmit={onUpdate} className="p-6 space-y-4">
                    {/* Profile & Logo Upload Section */}
                    <div className="grid grid-cols-2 gap-6 mb-6">
                        {/* Profile Picture */}
                        <div className="flex flex-col items-center">
                            <p className="text-[10px] text-gray-500 font-bold uppercase mb-2 tracking-widest">Profile Photo</p>
                            <div className="relative group cursor-pointer" onClick={() => document.getElementById('avatar-input').click()}>
                                <div className="w-24 h-24 rounded-3xl overflow-hidden border-4 border-orange-100 shadow-md bg-gray-50 flex items-center justify-center transition-all group-hover:border-orange-500">
                                    {previewUrl ? (
                                        <img src={previewUrl} className="w-full h-full object-cover" alt="Preview" />
                                    ) : (
                                        <div className="text-gray-300 flex flex-col items-center">
                                            <FiImage size={32} />
                                            <span className="text-[8px] font-black uppercase mt-1">No Avatar</span>
                                        </div>
                                    )}
                                </div>
                                <div className="absolute -bottom-1 -right-1 bg-orange-600 text-white p-1.5 rounded-lg shadow-lg border-2 border-white transition-transform group-hover:scale-110">
                                    <FiImage size={12} />
                                </div>
                                <input type="file" id="avatar-input" name="avatar" className="hidden" accept="image/*" onChange={handleImageChange} />
                            </div>
                        </div>

                        {/* Business Logo */}
                        <div className="flex flex-col items-center">
                            <p className="text-[10px] text-gray-500 font-bold uppercase mb-2 tracking-widest">Business Logo</p>
                            <div className="relative group cursor-pointer" onClick={() => document.getElementById('logo-input').click()}>
                                <div className="w-24 h-24 rounded-3xl overflow-hidden border-4 border-orange-100 shadow-md bg-gray-50 flex items-center justify-center transition-all group-hover:border-orange-500">
                                    {logoPreview ? (
                                        <img src={logoPreview} className="w-full h-full object-cover" alt="Logo Preview" />
                                    ) : (
                                        <div className="text-gray-300 flex flex-col items-center">
                                            <FiImage size={32} />
                                            <span className="text-[8px] font-black uppercase mt-1">No Logo</span>
                                        </div>
                                    )}
                                </div>
                                <div className="absolute -bottom-1 -right-1 bg-orange-600 text-white p-1.5 rounded-lg shadow-lg border-2 border-white transition-transform group-hover:scale-110">
                                    <FiImage size={12} />
                                </div>
                                <input type="file" id="logo-input" name="logo" className="hidden" accept="image/*" onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) setLogoPreview(URL.createObjectURL(file));
                                }} />
                            </div>
                        </div>
                    </div>

                    <InputField label="Vendor Name" name="name" value={vendor.name} />
                    <InputField label="Email Address" name="email" type="email" value={vendor.email} />
                    <InputField label="Phone Number" name="phone" value={vendor.phone} />
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[10px] text-gray-500 font-bold uppercase mb-1">Status</label>
                            <select name="status" defaultValue={vendor.status} className="w-full px-4 py-2 bg-white border border-gray-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all">
                                <option value="approved">Approved</option>
                                <option value="pending">Pending</option>
                                <option value="rejected">Rejected</option>
                            </select>
                        </div>
                        <InputField label="Category" name="category" value={vendor.category} />
                    </div>

                    <div className="pt-4 flex gap-3">
                        <button type="button" onClick={onClose} className="flex-1 py-3 bg-gray-100 text-gray-700 font-bold rounded-2xl hover:bg-gray-200 uppercase text-xs tracking-widest">Cancel</button>
                        <button type="submit" disabled={loading} className="flex-1 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-2xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-500/30 uppercase text-xs tracking-widest flex items-center justify-center gap-2">
                            {loading ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <FiCheckCircle />} Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const InputField = ({ label, name, type = "text", value, ...props }) => (
    <div>
        <label className="block text-[10px] text-gray-500 font-bold uppercase mb-1">{label}</label>
        <input 
            name={name} 
            type={type} 
            defaultValue={value} 
            {...props}
            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 outline-none transition-all" 
        />
    </div>
);

const AddVendorModal = ({ isOpen, onClose, onAdd, loading, categoryName }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [logoPreview, setLogoPreview] = useState(null);

    if (!isOpen) return null;

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={onClose}></div>
            <div className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="bg-green-600 p-6 text-white flex justify-between items-center">
                    <h3 className="text-xl font-black uppercase">Add New {categoryName}</h3>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-xl transition-all"><FiX size={24} /></button>
                </div>
                <form onSubmit={onAdd} className="p-6 space-y-4">
                    {/* Profile & Logo Upload Section */}
                    <div className="grid grid-cols-2 gap-6 mb-6">
                        {/* Profile Picture */}
                        <div className="flex flex-col items-center">
                            <p className="text-[10px] text-gray-500 font-bold uppercase mb-2 tracking-widest">Profile Photo</p>
                            <div className="relative group cursor-pointer" onClick={() => document.getElementById('add-avatar-input').click()}>
                                <div className="w-24 h-24 rounded-3xl overflow-hidden border-4 border-green-100 shadow-md bg-gray-50 flex items-center justify-center transition-all group-hover:border-green-500">
                                    {previewUrl ? (
                                        <img src={previewUrl} className="w-full h-full object-cover" alt="Preview" />
                                    ) : (
                                        <div className="text-gray-300 flex flex-col items-center">
                                            <FiImage size={32} />
                                            <span className="text-[8px] font-black uppercase mt-1">No Avatar</span>
                                        </div>
                                    )}
                                </div>
                                <div className="absolute -bottom-1 -right-1 bg-green-600 text-white p-1.5 rounded-lg shadow-lg border-2 border-white transition-transform group-hover:scale-110">
                                    <FiImage size={12} />
                                </div>
                                <input type="file" id="add-avatar-input" name="avatar" className="hidden" accept="image/*" onChange={handleImageChange} />
                            </div>
                        </div>

                        {/* Business Logo */}
                        <div className="flex flex-col items-center">
                            <p className="text-[10px] text-gray-500 font-bold uppercase mb-2 tracking-widest">Business Logo</p>
                            <div className="relative group cursor-pointer" onClick={() => document.getElementById('add-logo-input').click()}>
                                <div className="w-24 h-24 rounded-3xl overflow-hidden border-4 border-green-100 shadow-md bg-gray-50 flex items-center justify-center transition-all group-hover:border-green-500">
                                    {logoPreview ? (
                                        <img src={logoPreview} className="w-full h-full object-cover" alt="Logo Preview" />
                                    ) : (
                                        <div className="text-gray-300 flex flex-col items-center">
                                            <FiImage size={32} />
                                            <span className="text-[8px] font-black uppercase mt-1">No Logo</span>
                                        </div>
                                    )}
                                </div>
                                <div className="absolute -bottom-1 -right-1 bg-green-600 text-white p-1.5 rounded-lg shadow-lg border-2 border-white transition-transform group-hover:scale-110">
                                    <FiImage size={12} />
                                </div>
                                <input type="file" id="add-logo-input" name="logo" className="hidden" accept="image/*" onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) setLogoPreview(URL.createObjectURL(file));
                                }} />
                            </div>
                        </div>
                    </div>

                    <InputField label="Full Name" name="name" placeholder="Enter vendor name" required minLength={3} />
                    <InputField label="Email Address" name="email" type="email" placeholder="vendor@example.com" required />
                    <InputField 
                        label="Phone Number" 
                        name="phone" 
                        placeholder="10-digit mobile number" 
                        required 
                        pattern="[0-9]{10}" 
                        maxLength={10}
                        title="Please enter exactly 10 digits"
                        onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')}
                    />
                    <div className="relative">
                        <InputField 
                            label="Login Password" 
                            name="password" 
                            type={showPassword ? "text" : "password"} 
                            placeholder="Min 6 characters" 
                            required 
                            minLength={6} 
                        />
                        <button 
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-[32px] text-gray-400 hover:text-gray-600 transition-all"
                        >
                            {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                        </button>
                    </div>
                    
                    <div className="pt-4 flex gap-3">
                        <button type="button" onClick={onClose} className="flex-1 py-3 bg-gray-100 text-gray-700 font-bold rounded-2xl hover:bg-gray-200 uppercase text-xs">Cancel</button>
                        <button type="submit" disabled={loading} className="flex-1 py-3 bg-green-600 text-white font-bold rounded-2xl hover:bg-green-700 transition-all shadow-lg shadow-green-600/20 uppercase text-xs flex items-center justify-center gap-2">
                            {loading ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <FiCheckCircle />} Confirm Add
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CategoryManager;
