import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Clock
} from 'lucide-react';
import { useAuth } from '../../../auth/AuthContext';
import { useParams, useNavigate } from 'react-router-dom';
import { VENDOR_CONFIG } from '../../../config/vendorConfig.jsx';
import VendorPageHeader from '../../../components/VendorPageHeader';

/**
 * UNIVERSAL RESOURCE MANAGER
 * This single component handles Listing, Filtering, and Management 
 * for ANY resource type defined in VENDOR_CONFIG.
 */
const UniversalResourceManager = ({ overrideType }) => {
  const { resourceType: urlResourceType } = useParams();
  const resourceType = overrideType || urlResourceType;
  
  const { user } = useAuth();
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Get configuration for this specific resource
  const config = VENDOR_CONFIG.resources[resourceType] || {
    title: resourceType?.charAt(0).toUpperCase() + resourceType?.slice(1),
    buttonLabel: `Add ${resourceType}`
  };

  useEffect(() => {
    // Simulate API fetch based on resourceType
    setLoading(true);
    setTimeout(() => {
      // Mock data generation
      const mockData = Array.from({ length: 8 }).map((_, i) => ({
        id: i + 1,
        name: `${config.title} Item #${i + 1}`,
        status: i % 3 === 0 ? 'Completed' : (i % 2 === 0 ? 'Pending' : 'Active'),
        date: new Date().toLocaleDateString(),
        amount: `₹${(Math.random() * 5000).toFixed(0)}`
      }));
      setItems(mockData);
      setLoading(false);
    }, 800);
  }, [resourceType]);

  return (
    <div className="min-h-screen bg-gray-50/30">
      <VendorPageHeader 
        title={config.title} 
        subtitle={config.subtitle} 
      />

      <div className="px-4 space-y-6 animate-in fade-in duration-500 pb-10">
        {/* Search & Actions Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text"
              placeholder={`Search ${resourceType}...`}
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-all shadow-sm">
              <Filter size={18} />
              Filter
            </button>
            <button className="flex items-center gap-2 px-5 py-2 bg-orange-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-orange-500/20 hover:bg-orange-600 transition-all active:scale-95">
              <Plus size={18} />
              {config.buttonLabel}
            </button>
          </div>
        </div>

      {/* 2. Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-orange-50 text-orange-600 rounded-lg"><CheckCircle size={20} /></div>
          <div>
            <p className="text-[10px] uppercase font-bold text-gray-400">Total Items</p>
            <p className="text-lg font-bold text-gray-800">{items.length}</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg"><Clock size={20} /></div>
          <div>
            <p className="text-[10px] uppercase font-bold text-gray-400">Recent Updates</p>
            <p className="text-lg font-bold text-gray-800">12 Today</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-green-50 text-green-600 rounded-lg"><AlertCircle size={20} /></div>
          <div>
            <p className="text-[10px] uppercase font-bold text-gray-400">Status</p>
            <p className="text-lg font-bold text-green-600">Healthy</p>
          </div>
        </div>
      </div>

      {/* 3. Table Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Quick search..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500/20 outline-none text-sm transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-500 hover:bg-gray-50 rounded-lg border border-gray-200"><Filter size={16} /></button>
            <button className="p-2 text-gray-500 hover:bg-gray-50 rounded-lg border border-gray-200"><Download size={16} /></button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50/50 text-[11px] uppercase font-bold text-gray-500 tracking-wider">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Details</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-10 text-center text-gray-400 italic">Loading data...</td>
                </tr>
              ) : items.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 text-xs font-medium text-gray-400">#{item.id}</td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-gray-800">{item.name}</p>
                    <p className="text-[10px] text-gray-500">Ref: {Math.random().toString(36).substring(7).toUpperCase()}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.date}</td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-900">{item.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      item.status === 'Completed' ? 'bg-green-100 text-green-700' : 
                      item.status === 'Pending' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all"><Edit2 size={14} /></button>
                      <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-all"><Trash2 size={14} /></button>
                      <button className="p-1.5 text-gray-400 hover:text-gray-600 rounded-md"><MoreVertical size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  );
};

export default UniversalResourceManager;
