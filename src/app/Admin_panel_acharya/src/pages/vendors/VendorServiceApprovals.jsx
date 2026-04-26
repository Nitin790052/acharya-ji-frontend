import React, { useState, useEffect } from 'react';
import { Check, X, Eye, ShieldAlert, FileText, User, ShoppingBag, IndianRupee, Clock, AlertCircle } from 'lucide-react';
import { API_URL, getImageUrl } from '../../../../../config/apiConfig';

const VendorServiceApprovals = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch(`${API_URL}/vendors/admin/services?approvalStatus=pending`);
      const data = await response.json();
      if (data.success) {
        setServices(data.data);
      }
    } catch (error) {
      console.error('Error fetching pending services:', error);
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
      const response = await fetch(`${API_URL}/vendors/admin/services/${id}/approval`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          approvalStatus: status,
          rejectionReason: status === 'rejected' ? rejectionReason : undefined
        })
      });
      const data = await response.json();
      
      if (data.success) {
        alert(`Service ${status} successfully`);
        setIsModalOpen(false);
        setRejectionReason('');
        fetchServices();
      } else {
        alert(data.message || `Failed to ${status} service`);
      }
    } catch (error) {
      console.error(`Error updating service status:`, error);
      alert(error.message || `Failed to ${status} service`);
    } finally {
      setActionLoading(false);
    }
  };

  const viewDetails = (service) => {
    setSelectedService(service);
    setRejectionReason('');
    setIsModalOpen(true);
  };

  if (loading) {
    return <div className="p-6 flex justify-center items-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div></div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Vendor Service Approvals</h1>
        <span className="bg-orange-100 text-orange-800 text-sm font-medium px-3 py-1 rounded-full border border-orange-200">
          {services.length} Pending Services
        </span>
      </div>

      {services.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center text-gray-500">
          <ShieldAlert className="w-12 h-12 mx-auto text-gray-300 mb-3" />
          <p className="text-lg">No pending services found for review.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Service Name</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Vendor</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Price</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Category</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {services.map((service) => (
                <tr key={service._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {service.image && (
                        <img src={getImageUrl(service.image)} alt="" className="w-10 h-10 rounded-lg object-cover border border-gray-100" />
                      )}
                      <div className="font-medium text-gray-900">{service.title}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-800 font-medium">{service.vendor?.businessName || service.vendor?.name}</div>
                    <div className="text-xs text-gray-500 capitalize">{service.vendor?.category}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-semibold text-orange-600">₹{service.price}</div>
                    <div className="text-xs text-gray-400 flex items-center gap-1"><Clock className="w-3 h-3" /> {service.duration}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 capitalize">
                      {service.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => viewDetails(service)}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                    >
                      <Eye className="w-4 h-4" /> Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Detail Modal */}
      {isModalOpen && selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <ShoppingBag className="text-orange-500" /> Service Review
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
                
                {/* Service Info */}
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm md:col-span-2">
                   <div className="flex flex-col md:flex-row gap-6">
                      {selectedService.image && (
                        <div className="w-full md:w-48 h-48 rounded-xl overflow-hidden border border-gray-100 shadow-sm shrink-0">
                           <img src={getImageUrl(selectedService.image)} alt={selectedService.title} className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div className="flex-1 space-y-4">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{selectedService.title}</h3>
                          <p className="text-sm text-gray-500 italic mt-1">"{selectedService.description}"</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-orange-50 p-3 rounded-lg">
                             <p className="text-[10px] text-orange-600 font-bold uppercase tracking-wider mb-1">Pricing</p>
                             <p className="text-lg font-black text-orange-700">₹{selectedService.price}</p>
                          </div>
                          <div className="bg-blue-50 p-3 rounded-lg">
                             <p className="text-[10px] text-blue-600 font-bold uppercase tracking-wider mb-1">Duration</p>
                             <p className="text-lg font-black text-blue-700">{selectedService.duration}</p>
                          </div>
                          <div className="bg-purple-50 p-3 rounded-lg">
                             <p className="text-[10px] text-purple-600 font-bold uppercase tracking-wider mb-1">Category</p>
                             <p className="text-lg font-black text-purple-700 capitalize">{selectedService.category}</p>
                          </div>
                          <div className="bg-emerald-50 p-3 rounded-lg">
                             <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider mb-1">Max Bookings</p>
                             <p className="text-lg font-black text-emerald-700">{selectedService.slots}/day</p>
                          </div>
                        </div>
                      </div>
                   </div>
                </div>

                {/* Vendor Info */}
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                     Vendor Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 mb-4">
                       <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold">
                          {selectedService.vendor?.businessName?.[0] || selectedService.vendor?.name?.[0] || 'V'}
                       </div>
                       <div>
                          <p className="font-bold text-gray-800">{selectedService.vendor?.businessName || selectedService.vendor?.name}</p>
                          <p className="text-xs text-gray-500 capitalize">{selectedService.vendor?.category} Vendor</p>
                       </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Owner Name</p>
                      <p className="text-sm font-medium text-gray-800">{selectedService.vendor?.name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Contact</p>
                      <p className="text-sm font-medium text-gray-800">{selectedService.vendor?.phone}</p>
                      <p className="text-xs text-gray-500">{selectedService.vendor?.email}</p>
                    </div>
                  </div>
                </div>

                {/* Verification Points */}
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">
                     Review Checklist
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                       <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                       <p className="text-xs text-gray-600 font-medium">Service name and description are appropriate and clear.</p>
                    </div>
                    <div className="flex items-start gap-2">
                       <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                       <p className="text-xs text-gray-600 font-medium">Pricing is within platform guidelines for this category.</p>
                    </div>
                    <div className="flex items-start gap-2">
                       <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                       <p className="text-xs text-gray-600 font-medium">Image quality is acceptable and relevant to the service.</p>
                    </div>
                    <div className="flex items-start gap-2">
                       <AlertCircle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                       <p className="text-xs text-gray-600 font-medium italic">Approved services will be immediately visible to public users.</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Footer / Actions */}
            <div className="px-6 py-4 border-t border-gray-100 bg-white flex flex-col sm:flex-row justify-between items-center gap-4">
               <div className="flex-1 w-full relative">
                 <input 
                    type="text" 
                    placeholder="Reason for rejection (required if rejecting)" 
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    className="w-full text-sm border-gray-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-red-200 border bg-white"
                 />
               </div>
               <div className="flex gap-3 w-full sm:w-auto">
                <button
                  onClick={() => handleStatusUpdate(selectedService._id, 'rejected')}
                  disabled={actionLoading}
                  className="flex-1 sm:flex-none px-6 py-2.5 bg-red-50 text-red-600 font-medium rounded-xl hover:bg-red-100 transition-colors disabled:opacity-50"
                >
                  {actionLoading ? 'Processing...' : 'Reject'}
                </button>
                <button
                  onClick={() => handleStatusUpdate(selectedService._id, 'approved')}
                  disabled={actionLoading}
                  className="flex-1 sm:flex-none px-6 py-2.5 bg-green-500 text-white font-medium rounded-xl hover:bg-green-600 transition-colors disabled:opacity-50 shadow-sm shadow-green-500/30"
                >
                  {actionLoading ? 'Processing...' : 'Approve Service'}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default VendorServiceApprovals;
