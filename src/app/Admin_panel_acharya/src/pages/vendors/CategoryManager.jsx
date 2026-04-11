import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
    FiSearch,
    FiFilter,
    FiMoreVertical,
    FiEye,
    FiEdit2,
    FiTrash2,
    FiStar,
    FiMapPin,
    FiPhone,
    FiCheckCircle,
    FiClock
} from 'react-icons/fi';

const CategoryManager = () => {
    const { categoryType } = useParams();
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    // Capitalize category name for display
    const categoryName = categoryType
        ? categoryType.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
        : 'Vendor';

    // Mock data for demonstration - in a real app, this would be fetched based on categoryType
    const [vendors, setVendors] = useState([
        { id: 1, name: "Pandit Rajesh Sharma", rating: 4.8, experience: "15 Years", location: "Varanasi", status: "Active", bookings: 124 },
        { id: 2, name: "Acharya Vivek Ji", rating: 4.7, experience: "10 Years", location: "Haridwar", status: "Pending", bookings: 89 },
        { id: 3, name: "Pandit Alok Nath", rating: 4.9, experience: "20 Years", location: "Mathura", status: "Active", bookings: 256 },
        { id: 4, name: "Shastri Manoj Kumar", rating: 4.5, experience: "8 Years", location: "Ujjain", status: "Blocked", bookings: 45 },
    ]);

    useEffect(() => {
        // Simulate API fetch delay
        setLoading(true);
        const timer = setTimeout(() => {
            setLoading(false);
        }, 500);
        return () => clearTimeout(timer);
    }, [categoryType]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Active': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
            case 'Pending': return 'bg-amber-100 text-amber-700 border-amber-200';
            case 'Blocked': return 'bg-rose-100 text-rose-700 border-rose-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    return (
        <div className="p-4 md:p-6 space-y-6">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 uppercase">{categoryName} <span className="text-orange-600">Management</span></h1>
                    <p className="text-sm text-gray-500 font-medium mt-1">Manage and monitor all {categoryName} vendors</p>
                </div>
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl font-medium transition-all shadow-sm flex items-center gap-2">
                    <span>+ Add New {categoryName}</span>
                </button>
            </div>

            {/* Stats Cards (Mini) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: `Total ${categoryName}s`, value: '450', icon: <FiCheckCircle />, color: 'text-blue-600', bg: 'bg-blue-50' },
                    { label: 'Recently Added', value: '12', icon: <FiClock />, color: 'text-purple-600', bg: 'bg-purple-50' },
                    { label: 'Top Rated', value: '85', icon: <FiStar />, color: 'text-blue-900', bg: 'bg-blue-50' },
                    { label: 'Under Review', value: '24', icon: <FiFilter />, color: 'text-[#959190]', bg: 'bg-[#959190]/10' },
                ].map((stat, idx) => (
                    <div key={idx} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                        <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center text-xl`}>
                            {stat.icon}
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 font-medium">{stat.label}</p>
                            <h3 className="text-lg font-bold text-gray-800">{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* Table Section */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                {/* Table Filters */}
                <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between items-center">
                    <div className="relative w-full sm:w-96">
                        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder={`Search ${categoryName}...`}
                            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all text-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 border border-gray-100 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all">
                            <FiFilter /> Filter
                        </button>
                        <button className="flex-1 sm:flex-none px-4 py-2 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-gray-800 transition-all">
                            Export
                        </button>
                    </div>
                </div>

                {/* Dynamic Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50/50 text-gray-500 text-xs uppercase tracking-wider font-semibold">
                            <tr>
                                <th className="px-6 py-4">Vendor Info</th>
                                <th className="px-6 py-4">Rating & Exp</th>
                                <th className="px-6 py-4">Total Bookings</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center">
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="w-8 h-8 border-4 border-blue-900 border-t-transparent rounded-full animate-spin"></div>
                                            <p className="text-gray-500 text-sm">Loading {categoryName}s...</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                vendors.map((vendor) => (
                                    <tr key={vendor.id} className="hover:bg-gray-50/50 transition-all">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-900 font-bold border-2 border-white shadow-sm">
                                                    {vendor.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-gray-800">{vendor.name}</p>
                                                    <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                                                        <FiMapPin size={12} /> {vendor.location}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1.5 bg-blue-50 text-blue-900 px-2 py-1 rounded-lg w-fit">
                                                <FiStar className="fill-blue-900 text-blue-900" size={14} />
                                                <span className="text-sm font-bold">{vendor.rating}</span>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1 font-medium">{vendor.experience} experience</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-semibold text-gray-700">{vendor.bookings}</p>
                                            <p className="text-xs text-gray-500">Completed Orders</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusColor(vendor.status)}`}>
                                                {vendor.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center gap-2 transition-all">
                                                <button className="p-2 bg-green-50 hover:bg-green-100 rounded-lg text-green-600 shadow-sm border border-green-200 transition-all cursor-pointer" title="View Details">
                                                    <FiEye size={18} />
                                                </button>
                                                <button className="p-2 bg-green-50 hover:bg-green-100 rounded-lg text-green-600 shadow-sm border border-green-200 transition-all cursor-pointer" title="Edit">
                                                    <FiEdit2 size={18} />
                                                </button>
                                                <button className="p-2 bg-red-50 hover:bg-red-100 rounded-lg text-red-600 shadow-sm border border-red-200 transition-all cursor-pointer" title="Delete">
                                                    <FiTrash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Placeholder */}
                <div className="p-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
                    <p>Showing 1 to 4 of 450 vendors</p>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 border border-gray-100 rounded-lg hover:bg-gray-50 disabled:opacity-50">Previous</button>
                        <button className="px-3 py-1 border border-gray-100 rounded-lg hover:bg-gray-50">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryManager;
