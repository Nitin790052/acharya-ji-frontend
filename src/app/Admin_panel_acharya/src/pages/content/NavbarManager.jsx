import React, { useState, useEffect } from "react";
import {
    FiMenu,
    FiPlus,
    FiEdit2,
    FiTrash2,
    FiChevronDown,
    FiChevronUp,
    FiSave,
    FiX,
    FiArrowUp,
    FiArrowDown,
    FiEye,
    FiRefreshCw
} from "react-icons/fi";
import { toast } from "react-toastify";
import { API_URL as BASE_API_URL } from "../../../../../config/apiConfig";

const NavbarManager = () => {
    const [navItems, setNavItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [currentItem, setCurrentItem] = useState({
        label: '',
        href: '',
        type: 'link',
        order: 0,
        children: []
    });
    const [viewItem, setViewItem] = useState(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);

    const API_URL = `${BASE_API_URL}/navbar`;

    const fetchNavbarItems = async () => {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            setNavItems(data);
        } catch (error) {
            toast.error("Failed to fetch navbar items");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNavbarItems();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const method = isEditing ? 'PUT' : 'POST';
        const url = isEditing ? `${API_URL}/${currentItem._id}` : API_URL;

        // Filter out dynamic children before saving to database
        const processedItem = {
            ...currentItem,
            children: currentItem.children ? currentItem.children.filter(c => !c.isDynamic) : []
        };

        try {
            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(processedItem)
            });

            if (response.ok) {
                toast.success(isEditing ? "Item updated!" : "Item added!");
                resetForm();
                fetchNavbarItems();
            }
        } catch (error) {
            toast.error("Error saving item");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this item?")) return;
        try {
            await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            toast.success("Item deleted");
            fetchNavbarItems();
        } catch (error) {
            toast.error("Error deleting item");
        }
    };

    const handleSeed = async () => {
        if (!window.confirm("This will reset all navbar links to defaults. Are you sure?")) return;
        try {
            const response = await fetch(`${API_URL}/seed`, { method: 'POST' });
            if (response.ok) {
                toast.success("Navbar items restored to defaults!");
                fetchNavbarItems();
            }
        } catch (error) {
            toast.error("Error seeding navbar");
        }
    };

    const handleEdit = (item) => {
        setCurrentItem(item);
        setIsEditing(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const resetForm = () => {
        setCurrentItem({
            label: '',
            href: '',
            type: 'link',
            order: 0,
            children: []
        });
        setIsEditing(false);
    };

    const handleChildLabelChange = (index, value) => {
        const updatedChildren = [...currentItem.children];
        const label = value;
        let href = label.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
        
        // Add prefix based on parent label for common categories
        const parentLabel = (currentItem.label || '').toLowerCase();
        if (parentLabel.includes('healing')) href = `/healing/${href}`;
        else if (parentLabel.includes('vastu')) href = `/vastu/${href}`;
        else if (parentLabel.includes('puja')) href = `/puja/${href}`;
        else if (parentLabel.includes('kundli')) href = `/kundli/${href}`;
        else if (parentLabel.includes('astrology')) href = `/astrology/${href}`;
        else if (!href.startsWith('/')) href = `/${href}`;

        updatedChildren[index] = { ...updatedChildren[index], label, href };
        setCurrentItem({ ...currentItem, children: updatedChildren });
    };

    const handleChildChange = (index, field, value) => {
        const updatedChildren = [...currentItem.children];
        updatedChildren[index] = { ...updatedChildren[index], [field]: value };
        setCurrentItem({ ...currentItem, children: updatedChildren });
    };

    const addChild = () => {
        setCurrentItem({
            ...currentItem,
            children: [...currentItem.children, { label: '', href: '' }]
        });
    };

    const removeChild = (index) => {
        const updatedChildren = currentItem.children.filter((_, i) => i !== index);
        setCurrentItem({ ...currentItem, children: updatedChildren });
    };

    const openViewModal = (item) => {
        setViewItem(item);
        setIsViewModalOpen(true);
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-gray-100 rounded-xl shadow-md text-blue-900 border border-blue-900/20">
                    <FiMenu size={24} />
                </div>
                <div>
                    <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight italic-none">Navbar <span className="text-orange-600">Manager</span></h1>
                    <p className="text-sm text-gray-500 font-medium italic-none">Add, edit and organize website navigation and dropdowns</p>
                </div>
                <button
                    onClick={handleSeed}
                    className="ml-auto flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg text-xs font-bold hover:bg-orange-700 transition-all shadow-md active:scale-95"
                >
                    <FiRefreshCw size={14} /> Restore Defaults
                </button>
            </div>

            {/* Form Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
                <h2 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
                    {isEditing ? <FiEdit2 className="text-blue-900" /> : <FiPlus className="text-blue-900" />}
                    {isEditing ? 'Edit Menu Item' : 'Add New Menu Item'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Display Label</label>
                            <input
                                type="text"
                                required
                                value={currentItem.label}
                                onChange={(e) => setCurrentItem({ ...currentItem, label: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-900/40 focus:border-transparent outline-none transition-all"
                                placeholder="e.g. Services"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Link URL (href)</label>
                            <input
                                type="text"
                                required
                                value={currentItem.href}
                                onChange={(e) => setCurrentItem({ ...currentItem, href: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-900/40 focus:border-transparent outline-none transition-all"
                                placeholder="e.g. /services"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Menu Type</label>
                            <select
                                value={currentItem.type}
                                onChange={(e) => setCurrentItem({ ...currentItem, type: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-900/40 outline-none"
                            >
                                <option value="link">Single Link</option>
                                <option value="dropdown">Dropdown Menu</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Order</label>
                            <input
                                type="number"
                                value={currentItem.order}
                                onChange={(e) => setCurrentItem({ ...currentItem, order: parseInt(e.target.value) })}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-900/40 outline-none"
                            />
                        </div>
                    </div>

                    {/* Sub-menu (Children) Section */}
                    {currentItem.type === 'dropdown' && (
                        <div className="mt-6 p-6 bg-gray-50 rounded-xl border border-gray-100">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider">Sub-Menu Items</h3>
                                <button
                                    type="button"
                                    onClick={addChild}
                                    className="flex items-center gap-1 text-xs font-bold text-blue-900 hover:brightness-90 bg-white px-3 py-1.5 rounded-lg border border-blue-900/20 shadow-sm transition-all"
                                >
                                    <FiPlus /> Add Child
                                </button>
                            </div>

                            <div className="space-y-3">
                                {currentItem.children.filter(c => !c.isDynamic).map((child, idx) => (
                                    <div key={idx} className="flex gap-3 items-center">
                                        <input
                                            type="text"
                                            required
                                            placeholder="Label"
                                            value={child.label}
                                            onChange={(e) => handleChildLabelChange(idx, e.target.value)}
                                            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm bg-white outline-none"
                                        />
                                        <input
                                            type="text"
                                            required
                                            placeholder="URL"
                                            value={child.href}
                                            onChange={(e) => handleChildChange(idx, 'href', e.target.value)}
                                            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm bg-white outline-none"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeChild(idx)}
                                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                        >
                                            <FiTrash2 size={18} />
                                        </button>
                                    </div>
                                ))}
                                {currentItem.children.some(c => c.isDynamic) && (
                                    <p className="text-[10px] text-orange-500 font-bold uppercase tracking-wider mt-2 px-1">
                                        + {currentItem.children.filter(c => c.isDynamic).length} automanaged dynamic items will be merged in frontend
                                    </p>
                                )}
                                {currentItem.children.length === 0 && (
                                    <p className="text-center text-xs text-gray-400 py-4 italic">No sub-menu items added yet</p>
                                )}
                            </div>
                        </div>
                    )}

                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-50">
                        <button
                            type="button"
                            onClick={resetForm}
                            className="px-6 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-all flex items-center gap-2 shadow-md cursor-pointer"
                        >
                            <FiX /> Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-8 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-md transition-all flex items-center gap-2"
                        >
                            <FiSave /> {isEditing ? 'Update Navigation' : 'Save Navigation'}
                        </button>
                    </div>
                </form>
            </div>

            {/* Table Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-800">Current Navigation Map</h2>
                    <span className="text-xs font-bold text-gray-400 bg-gray-50 px-3 py-1 rounded-full border border-gray-100 uppercase tracking-tighter">
                        Total {navItems.length} Items
                    </span>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-[#959190]/10">
                            <tr>
                                <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider w-16 text-center">Order</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Item Label</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Path / Link</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Type</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Children</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {navItems.map((item) => (
                                <tr key={item._id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4 text-center font-bold text-blue-900">{item.order}</td>
                                    <td className="px-6 py-4">
                                        <span className="font-semibold text-gray-800">{item.label}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <code className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">{item.href}</code>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase ${item.type === 'dropdown' ? 'bg-amber-100 text-amber-600 border border-amber-200' : 'bg-blue-100 text-blue-600'
                                            }`}>
                                            {item.type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm font-medium text-gray-500">
                                            {item.children?.length || 0} items
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => openViewModal(item)}
                                                className="p-2 text-emerald-500 hover:bg-emerald-50 rounded-lg transition-all"
                                                title="View Details"
                                            >
                                                <FiEye size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleEdit(item)}
                                                className="p-2 bg-green-50 text-green-600 hover:bg-green-100 rounded-lg transition-all border border-green-200"
                                                title="Edit"
                                            >
                                                <FiEdit2 size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(item._id)}
                                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                                title="Delete"
                                            >
                                                <FiTrash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {navItems.length === 0 && !loading && (
                                <tr>
                                    <td colSpan="6" className="px-6 py-12 text-center text-gray-400 italic">
                                        No navigation items found. Add your first item above.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* View Details Modal */}
            {isViewModalOpen && viewItem && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
                        {/* Modal Header */}
                        <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4 flex justify-between items-center text-white">
                            <div className="flex items-center gap-3">
                                <FiEye size={20} />
                                <h3 className="font-bold text-lg">Menu Item Details</h3>
                            </div>
                            <button
                                onClick={() => setIsViewModalOpen(false)}
                                className="hover:bg-white/20 p-2 rounded-lg transition-all"
                            >
                                <FiX size={20} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6">
                            <div className="grid grid-cols-2 gap-6 mb-8 bg-gray-50 p-4 rounded-xl border border-gray-100">
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Label</p>
                                    <p className="font-bold text-gray-800 text-lg">{viewItem.label}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Link Path</p>
                                    <code className="bg-blue-50 text-blue-900 px-2 py-0.5 rounded text-sm font-semibold">{viewItem.href}</code>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Type</p>
                                    <span className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase ${viewItem.type === 'dropdown' ? 'bg-amber-100 text-amber-600 border border-amber-200' : 'bg-blue-100 text-blue-600'
                                        }`}>
                                        {viewItem.type}
                                    </span>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Display Order</p>
                                    <p className="font-bold text-gray-800">{viewItem.order}</p>
                                </div>
                            </div>

                            {/* Children List */}
                            {viewItem.type === 'dropdown' && (
                                <div>
                                    <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                                        <FiMenu className="text-yellow-500" />
                                        Sub-Menu Items ({viewItem.children?.length || 0})
                                    </h4>
                                    <div className="max-h-60 overflow-y-auto pr-2 space-y-2 custom-scrollbar">
                                        {viewItem.children?.map((child, idx) => (
                                            <div key={idx} className="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-xl hover:shadow-sm transition-all group">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center text-blue-900 font-bold text-xs">
                                                        {idx + 1}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-gray-800 flex items-center gap-2">
                                                            {child.label}
                                                            {child.isDynamic && (
                                                                <span className="text-[9px] bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded-full font-black uppercase tracking-tighter border border-orange-200">Auto</span>
                                                            )}
                                                        </p>
                                                        <p className="text-xs text-gray-400">{child.href}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        {(!viewItem.children || viewItem.children.length === 0) && (
                                            <p className="text-center text-sm text-gray-400 py-8 italic">No child items found.</p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Modal Footer */}
                        <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3 border-t border-gray-100">
                            <button
                                onClick={() => {
                                    setIsViewModalOpen(false);
                                    handleEdit(viewItem);
                                }}
                                className="px-4 py-2 bg-green-600 text-white rounded-lg font-bold text-sm shadow-md hover:bg-green-700 transition-all flex items-center gap-2"
                            >
                                <FiEdit2 size={14} /> Edit This Menu
                            </button>
                            <button
                                onClick={() => setIsViewModalOpen(false)}
                                className="px-6 py-2 bg-red-600 text-white rounded-lg font-bold text-sm hover:bg-red-700 transition-all shadow-md"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NavbarManager;
