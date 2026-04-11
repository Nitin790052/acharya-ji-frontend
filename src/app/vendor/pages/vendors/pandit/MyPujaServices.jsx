import { useState, useEffect } from 'react';
import { 
  Plus, Edit, Eye, Trash2, Filter, Search, 
  CheckCircle, XCircle, TrendingUp, MoreVertical,
  Shield, Clock, DollarSign, Home, Globe, Building,
  ChevronDown, ChevronUp, X, Menu
} from 'lucide-react';

const MyPujaServices = () => {
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Sample data
  const sampleServices = [
    {
      id: 1,
      name: "Ganpati Puja",
      type: "home",
      duration: "2 hours",
      price: 2500,
      status: "active",
      isPopular: true,
      description: "Complete Ganpati Puja with all rituals",
      bookingCount: 45,
      lastUpdated: "2024-01-15"
    },
    {
      id: 2,
      name: "Satyanarayan Katha",
      type: "online",
      duration: "3 hours",
      price: 1800,
      status: "active",
      isPopular: true,
      description: "Online Satyanarayan Katha with video guidance",
      bookingCount: 32,
      lastUpdated: "2024-01-10"
    },
    {
      id: 3,
      name: "Maha Mrityunjay Jaap",
      type: "temple",
      duration: "4 hours",
      price: 3500,
      status: "inactive",
      isPopular: false,
      description: "Special Maha Mrityunjay Jaap for health",
      bookingCount: 18,
      lastUpdated: "2024-01-05"
    },
    {
      id: 4,
      name: "Vastu Puja",
      type: "home",
      duration: "3.5 hours",
      price: 3000,
      status: "active",
      isPopular: false,
      description: "Complete Vastu Shanti Puja for new home",
      bookingCount: 22,
      lastUpdated: "2024-01-12"
    },
    {
      id: 5,
      name: "Navgraha Shanti",
      type: "online",
      duration: "2.5 hours",
      price: 2200,
      status: "active",
      isPopular: true,
      description: "Navgraha Shanti Puja for planetary peace",
      bookingCount: 38,
      lastUpdated: "2024-01-08"
    }
  ];

  useEffect(() => {
    setServices(sampleServices);
  }, []);

  // Filter services
  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || service.type === filterType;
    const matchesStatus = filterStatus === 'all' || service.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  // Auto-suggest price
  const suggestPrice = (type) => {
    const basePrices = {
      'home': { min: 2000, max: 5000 },
      'online': { min: 1500, max: 3000 },
      'temple': { min: 1000, max: 2500 }
    };
    const range = basePrices[type] || basePrices.home;
    return Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
  };

  // Handle service actions
  const handleAddService = (newService) => {
    const serviceWithId = {
      ...newService,
      id: services.length + 1,
      bookingCount: 0,
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    setServices([...services, serviceWithId]);
    setShowAddModal(false);
  };

  const handleUpdateService = (updatedService) => {
    setServices(services.map(service => 
      service.id === updatedService.id 
        ? { ...updatedService, lastUpdated: new Date().toISOString().split('T')[0] }
        : service
    ));
    setShowEditModal(false);
    setSelectedService(null);
  };

  const toggleServiceStatus = (serviceId) => {
    setServices(services.map(service => {
      if (service.id === serviceId) {
        const newStatus = service.status === 'active' ? 'inactive' : 'active';
        if (newStatus === 'inactive') {
          console.log(`Stopping all bookings for service ${serviceId}`);
        }
        return { 
          ...service, 
          status: newStatus,
          lastUpdated: new Date().toISOString().split('T')[0]
        };
      }
      return service;
    }));
  };

  const handleDeleteService = (serviceId) => {
    if (window.confirm('Are you sure you want to delete this service? This will cancel all future bookings.')) {
      setServices(services.filter(service => service.id !== serviceId));
    }
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'home': return <Home className="w-4 h-4" />;
      case 'online': return <Globe className="w-4 h-4" />;
      case 'temple': return <Building className="w-4 h-4" />;
      default: return <Home className="w-4 h-4" />;
    }
  };

  return (
  <div className=' '>
  <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40  
                px-3 py-1.5 border border-orange-100">
  
  {/* Mobile: Column, Desktop: Row */}
  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
    
    {/* Title Section - Original size */}
    <div className="text-left sm:text-left flex items-end gap-2">
  <div>
    <h1 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-orange-900 uppercase
                   leading-tight">
      My Puja Services
    </h1>
    {/* Mobile: Below heading, Desktop: Right side */}
    <p className="sm:hidden text-sm text-gray-600 mt-0.5">
      Manage services and bookings
    </p>
  </div>
  
  {/* Desktop: Right side of heading */}
  <p className="hidden sm:block text-sm text-gray-600 mb-0.5">
    Manage services and bookings
  </p>
</div>
    
   
  </div>
</div>
    <div className="space-y-4 p-6">
      {/* Header - Compact */}
      
 {/* Button Section - Original size */}
    <div className="flex justify-end sm:justify-end mt-1 sm:mt-0">
      <button
        onClick={() => setShowAddModal(true)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 
                   bg-gradient-to-r from-orange-500 to-orange-600 text-white 
                   rounded-lg hover:from-orange-600 hover:to-orange-700 
                   transition-all shadow-sm text-sm"
      >
        <Plus className="w-4 h-4" />
        Add New
      </button>
    </div>
      {/* Stats Cards - Compact */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 p-3 rounded-lg border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-800">Total</p>
              <p className="text-xl font-semibold text-gray-800 mt-0.5">{services.length}</p>
            </div>
            <div className="p-1.5 bg-orange-50 rounded">
              <Shield className="text-orange-500 w-4 h-4" />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 p-3 rounded-lg border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-800">Active</p>
              <p className="text-xl font-semibold text-gray-800 mt-0.5">
                {services.filter(s => s.status === 'active').length}
              </p>
            </div>
            <div className="p-1.5 bg-green-50 rounded">
              <CheckCircle className="text-green-500 w-4 h-4" />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 p-3 rounded-lg border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-800">Bookings</p>
              <p className="text-xl font-semibold text-gray-800 mt-0.5">
                {services.reduce((sum, service) => sum + service.bookingCount, 0)}
              </p>
            </div>
            <div className="p-1.5 bg-blue-50 rounded">
              <TrendingUp className="text-blue-500 w-4 h-4" />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 p-3 rounded-lg border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-800">Avg. Price</p>
              <p className="text-xl font-semibold text-gray-800 mt-0.5">
                ₹{Math.round(services.reduce((sum, s) => sum + s.price, 0) / services.length) || 0}
              </p>
            </div>
            <div className="p-1.5 bg-purple-50 rounded">
              <DollarSign className="text-purple-500 w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters - Compact */}
      <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-xs">
        <div className="flex flex-col sm:flex-row gap-2">
          {/* Search Bar */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>
          
          {/* Desktop Filters */}
          <div className="hidden sm:flex gap-2">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-orange-500 focus:border-transparent min-w-[100px]"
            >
              <option value="all">All Types</option>
              <option value="home">Home</option>
              <option value="online">Online</option>
              <option value="temple">Temple</option>
            </select>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-orange-500 focus:border-transparent min-w-[100px]"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="sm:hidden flex items-center justify-center gap-1.5 px-3 py-2 border border-gray-300 rounded hover:bg-gray-50 text-sm"
          >
            <Filter className="w-4 h-4" />
            Filters
            {showMobileFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {/* Mobile Filters Dropdown */}
        {showMobileFilters && (
          <div className="sm:hidden mt-3 p-3 border border-gray-200 rounded bg-gray-50">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-orange-500"
                >
                  <option value="all">All Types</option>
                  <option value="home">Home</option>
                  <option value="online">Online</option>
                  <option value="temple">Temple</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-orange-500"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Services Table - Compact */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 border-b border-gray-200">
               <th className="py-2 px-12 text-left font-semibold text-gray-800 ">Puja Name</th>
                <th className="py-2 px-5 text-left font-semibold text-gray-800 hidden sm:table-cell">Type</th>
                <th className="py-2 px-5 text-left font-semibold text-gray-800">Price</th>
                <th className="py-2 px-5 text-left font-semibold text-gray-800 hidden xs:table-cell">Status</th>
                <th className="py-2 px-6 text-left font-semibold text-gray-800">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredServices.map((service) => (
                <tr key={service.id} className="hover:bg-gray-50">
                  <td className="py-2 px-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded bg-orange-50 flex items-center justify-center flex-shrink-0">
                        <span className="text-orange-600 font-bold text-sm">पू</span>
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1">
                          <h3 className="font-medium text-gray-800 truncate text-[15px]">{service.name}</h3>
                          {service.isPopular && (
                            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-red-50 text-red-700 text-sm font-medium flex-shrink-0">
                              <TrendingUp className="w-3 h-3" />
                            </span>
                          )}
                        </div>
                        <p className="text-[14px] text-gray-600 truncate mt-0.5">{service.description}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-sm text-gray-500 flex items-center gap-0.5 sm:hidden">
                            {getTypeIcon(service.type)}
                            {service.duration}
                          </span>
                          <span className="text-[14px] text-gray-500 hidden sm:inline-flex items-center gap-0.5">
                            {service.bookingCount} bookings
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="py-2 px-3 hidden sm:table-cell">
                    <div className="flex items-center gap-1.5">
                      {getTypeIcon(service.type)}
                      <span className="capitalize text-[14px]">{service.type}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[14px] text-gray-600 mt-0.5">
                      <Clock className="w-3 h-3" />
                      {service.duration}
                    </div>
                  </td>
                  
                  <td className="py-2 px-3">
                    <div>
                      <span className="font-semibold text-gray-800 text-[14px]">₹{service.price}</span>
                      <span className="text-[14px] text-gray-500 block">/session</span>
                    </div>
                  </td>
                  
                  <td className="py-2 px-3 hidden xs:table-cell">
                    <span className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-sm font-medium ${
                      service.status === 'active' 
                        ? 'bg-green-50 text-green-700 border border-green-200' 
                        : 'bg-red-50 text-red-700 border border-red-200'
                    }`}>
                      {service.status === 'active' ? (
                        <>
                          <CheckCircle className="w-3 h-3" />
                          Active
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3 h-3" />
                          Inactive
                        </>
                      )}
                    </span>
                  </td>
                  
                  <td className="py-2 px-3">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => {
                          setSelectedService(service);
                          setShowEditModal(true);
                        }}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      
                      <button
                        onClick={() => toggleServiceStatus(service.id)}
                        className={`p-1.5 rounded transition-colors ${
                          service.status === 'active' 
                            ? 'text-red-600 hover:bg-red-50' 
                            : 'text-green-600 hover:bg-green-50'
                        }`}
                        title={service.status === 'active' ? 'Disable' : 'Enable'}
                      >
                        {service.status === 'active' ? 
                          <XCircle className="w-5 h-5" /> : 
                          <CheckCircle className="w-5 h-5" />
                        }
                      </button>
                      
                      <button
                        onClick={() => handleDeleteService(service.id)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredServices.length === 0 && (
          <div className="text-center py-8">
            <div className="w-12 h-12 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-3">
              <Shield className="text-gray-400 w-6 h-6" />
            </div>
            <h3 className="text-base font-medium text-gray-700 mb-1.5">No services found</h3>
            <p className="text-sm text-gray-500 mb-4 max-w-md mx-auto">
              {searchTerm || filterType !== 'all' || filterStatus !== 'all' 
                ? 'Try adjusting your search or filters' 
                : 'Start by adding your first service'}
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 text-sm"
            >
              <Plus className="w-4 h-4" />
              Add First Service
            </button>
          </div>
        )}
      </div>

      {/* Add Service Modal - Compact */}
      {showAddModal && (
        <ServiceModal
          mode="add"
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddService}
          suggestPrice={suggestPrice}
        />
      )}

      {/* Edit Service Modal - Compact */}
      {showEditModal && selectedService && (
        <ServiceModal
          mode="edit"
          service={selectedService}
          onClose={() => {
            setShowEditModal(false);
            setSelectedService(null);
          }}
          onSubmit={handleUpdateService}
          suggestPrice={suggestPrice}
        />
      )}
    </div>
  </div>

  );
};

// Compact Service Modal Component
const ServiceModal = ({ mode, service, onClose, onSubmit, suggestPrice }) => {
  const [formData, setFormData] = useState(
    mode === 'edit' 
      ? { ...service }
      : {
          name: '',
          type: 'home',
          duration: '',
          price: '',
          description: '',
          isPopular: false,
          status: 'active'
        }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleTypeChange = (type) => {
    setFormData({
      ...formData,
      type,
      price: suggestPrice(type)
    });
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'home': return <Home className="w-4 h-4" />;
      case 'online': return <Globe className="w-4 h-4" />;
      case 'temple': return <Building className="w-4 h-4" />;
      default: return <Home className="w-4 h-4" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-3 sm:p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-lg max-h-[85vh] overflow-y-auto">
        <div className="p-4 sm:p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800">
              {mode === 'add' ? 'Add Puja Service' : 'Edit Service'}
            </h2>
            <button 
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded text-gray-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Service Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Puja Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-orange-500 focus:border-transparent"
                placeholder="e.g., Ganpati Puja"
              />
            </div>

            {/* Service Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Service Type *
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['home', 'online', 'temple'].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => handleTypeChange(type)}
                    className={`p-3 border rounded text-center transition-all ${
                      formData.type === type
                        ? 'border-orange-500 bg-orange-50 text-orange-700'
                        : 'border-gray-300 hover:border-orange-300'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-1">
                      {getTypeIcon(type)}
                      <span className="capitalize font-medium text-sm sm:text-sm">{type}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Duration */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={formData.duration}
                    onChange={(e) => setFormData({...formData, duration: e.target.value})}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-orange-500 focus:border-transparent"
                    placeholder="e.g., 2 hours"
                  />
                  <Clock className="absolute right-2.5 top-2.5 text-gray-400 w-4 h-4" />
                </div>
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price (₹) *
                  <span className="text-sm text-gray-500 ml-1">
                    Suggested: ₹{suggestPrice(formData.type)}
                  </span>
                </label>
                <div className="relative">
                  <span className="absolute left-2.5 top-2.5 text-gray-500 text-sm">₹</span>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    className="w-full pl-7 pr-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Enter price"
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={2}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-orange-500 focus:border-transparent"
                placeholder="Describe the puja..."
              />
            </div>

            {/* Settings */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-gray-50 rounded gap-3">
              <label className="flex items-start gap-2">
                <input
                  type="checkbox"
                  checked={formData.isPopular}
                  onChange={(e) => setFormData({...formData, isPopular: e.target.checked})}
                  className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500 mt-0.5"
                />
                <div>
                  <span className="font-medium text-gray-800 text-sm">Popular Service</span>
                  <p className="text-sm text-gray-600">Show "Popular" badge</p>
                </div>
              </label>

              {mode === 'edit' && (
                <label className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    checked={formData.status === 'active'}
                    onChange={(e) => setFormData({
                      ...formData, 
                      status: e.target.checked ? 'active' : 'inactive'
                    })}
                    className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500 mt-0.5"
                  />
                  <div>
                    <span className="font-medium text-gray-800 text-sm">Active</span>
                    <p className="text-sm text-gray-600">Allow bookings</p>
                  </div>
                </label>
              )}
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 pt-4 border-t">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 text-sm w-full sm:w-auto"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded hover:from-orange-600 hover:to-orange-700 text-sm w-full sm:w-auto"
              >
                {mode === 'add' ? 'Add Service' : 'Update Service'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MyPujaServices;