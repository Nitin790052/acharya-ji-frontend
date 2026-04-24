import React, { useState, useEffect } from 'react';
import { Check, X, Eye, ShieldAlert, FileText, User, Building, MapPin, IndianRupee } from 'lucide-react';
import { API_URL, getImageUrl } from '../../../../../config/apiConfig';

const ApprovedVendors = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      const response = await fetch(`${API_URL}/vendors?status=approved`);
      const data = await response.json();
      if (data.success) {
        setVendors(data.data);
      }
    } catch (error) {
      console.error('Error fetching pending vendors:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    if (status === 'rejected' && !rejectionReason.trim()) {
      alert("Please provide a reason for rejection");
      return;
    }

    setActionLoading(true);
    try {
      const response = await fetch(`${API_URL}/vendors/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          status,
          rejectionReason: status === 'rejected' ? rejectionReason : undefined
        })
      });
      const data = await response.json();
      
      if (data.success) {
        alert(`Vendor ${status} successfully`);
        setIsModalOpen(false);
        setRejectionReason('');
        fetchVendors();
      } else {
        alert(data.message || `Failed to ${status} vendor`);
      }
    } catch (error) {
      console.error(`Error updating vendor status:`, error);
      alert(error.message || `Failed to ${status} vendor`);
    } finally {
      setActionLoading(false);
    }
  };

  const viewDetails = (vendor) => {
    setSelectedVendor(vendor);
    setRejectionReason('');
    setIsModalOpen(true);
  };

  if (loading) {
    return <div className="p-6 flex justify-center items-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div></div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Approved Vendors</h1>
        <span className="bg-orange-100 text-orange-800 text-sm font-medium px-3 py-1 rounded-full border border-orange-200">
          {vendors.length} Approved
        </span>
      </div>

      {vendors.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center text-gray-500">
          <ShieldAlert className="w-12 h-12 mx-auto text-gray-300 mb-3" />
          <p className="text-lg">No approved vendors found.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Vendor Name</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Category</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Contact</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Applied On</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {vendors.map((vendor) => (
                <tr key={vendor._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{vendor.name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                      {vendor.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600">{vendor.phone}</div>
                    <div className="text-xs text-gray-500">{vendor.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600">{new Date(vendor.createdAt).toLocaleDateString()}</div>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => viewDetails(vendor)}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                    >
                      <Eye className="w-4 h-4" /> View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Detail Modal */}
      {isModalOpen && selectedVendor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <User className="text-orange-500" /> Vendor Details
              </h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-gray-200 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Basic Info */}
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                     Basic Information
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-400">Name</p>
                      <p className="font-medium text-gray-800">{selectedVendor.name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Category</p>
                      <p className="font-medium text-gray-800">{selectedVendor.category}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Email</p>
                      <p className="font-medium text-gray-800">{selectedVendor.email}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Phone</p>
                      <p className="font-medium text-gray-800">{selectedVendor.phone}</p>
                    </div>
                  </div>
                </div>

                {/* Bank Details */}
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                     Bank Details
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-400">Bank Name</p>
                      <p className="font-medium text-gray-800">{selectedVendor.bankName || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Account Number</p>
                      <p className="font-medium text-gray-800">{selectedVendor.accountNumber || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">IFSC Code</p>
                      <p className="font-medium text-gray-800">{selectedVendor.ifscCode || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                {/* Documents */}
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm md:col-span-2">
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-gray-400" /> Documents
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-3 border border-gray-100 rounded-lg bg-gray-50 text-center">
                      <p className="text-xs text-gray-500 mb-1">Aadhar Number</p>
                      <p className="font-medium text-gray-800 mb-2">{selectedVendor.aadharNumber || 'N/A'}</p>
                      {selectedVendor.aadharFile ? (
                        <a href={getImageUrl(selectedVendor.aadharFile)} target="_blank" rel="noreferrer" className="text-xs text-blue-600 hover:underline">View Document</a>
                      ) : <span className="text-xs text-gray-400">No file</span>}
                    </div>
                    <div className="p-3 border border-gray-100 rounded-lg bg-gray-50 text-center">
                      <p className="text-xs text-gray-500 mb-1">PAN Number</p>
                      <p className="font-medium text-gray-800 mb-2">{selectedVendor.panNumber || 'N/A'}</p>
                      {selectedVendor.panFile ? (
                        <a href={getImageUrl(selectedVendor.panFile)} target="_blank" rel="noreferrer" className="text-xs text-blue-600 hover:underline">View Document</a>
                      ) : <span className="text-xs text-gray-400">No file</span>}
                    </div>
                    <div className="p-3 border border-gray-100 rounded-lg bg-gray-50 text-center">
                      <p className="text-xs text-gray-500 mb-1">Bank Proof</p>
                      <p className="font-medium text-gray-800 mb-2">Passbook / Cheque</p>
                      {selectedVendor.bankFile ? (
                        <a href={getImageUrl(selectedVendor.bankFile)} target="_blank" rel="noreferrer" className="text-xs text-blue-600 hover:underline">View Document</a>
                      ) : <span className="text-xs text-gray-400">No file</span>}
                    </div>
                  </div>
                </div>

                {/* Extra Category Specific Data (Rendered as JSON for now or mapped) */}
                {selectedVendor.categoryData && Object.keys(selectedVendor.categoryData).length > 0 && (
                  <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm md:col-span-2">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">
                      Other Business Details
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {Object.entries(selectedVendor.categoryData).map(([key, value]) => {
                        // Skip rendering photos if there are any, handle specially if desired
                        let displayValue = value;
                        if (Array.isArray(value) && value.length > 0 && typeof value[0] === 'string' && value[0].includes('uploads')) {
                           displayValue = <span className="text-xs text-blue-500">{value.length} Photos Uploaded</span>;
                        } else if (Array.isArray(value)) {
                           displayValue = value.join(', ');
                        } else if (typeof value === 'boolean') {
                           displayValue = value ? 'Yes' : 'No';
                        }
                        
                        return (
                          <div key={key}>
                            <p className="text-xs text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                            <p className="font-medium text-gray-800">{displayValue || 'N/A'}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

              </div>
            </div>

            {/* Footer / Actions */}
            <div className="px-6 py-4 border-t border-gray-100 bg-white flex justify-end items-center">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors"
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

export default ApprovedVendors;
