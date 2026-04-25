import React, { useState, useEffect } from 'react';
import { 
  Truck, 
  Package, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Search,
  Filter,
  Download,
  ChevronRight,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Plus,
  ArrowUpRight,
  DollarSign,
  Globe
} from 'lucide-react';

import VendorPageHeader from '../../../components/VendorPageHeader';

const ShippingDelivery = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCourier, setSelectedCourier] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  
  // Mock Data
  const dashboardData = {
    totalShipments: 245,
    pendingDeliveries: 12,
    deliveredToday: 38,
    
    courierPartners: [
      { id: 1, name: 'BlueDart', value: 'bluedart', shipments: 89, rating: 4.7 },
      { id: 2, name: 'Delhivery', value: 'delhivery', shipments: 67, rating: 4.5 },
      { id: 3, name: 'DTDC', value: 'dtdc', shipments: 45, rating: 4.2 },
      { id: 4, name: 'Amazon Shipping', value: 'amazon', shipments: 32, rating: 4.8 },
      { id: 5, name: 'FedEx', value: 'fedex', shipments: 12, rating: 4.4 },
    ],
    
    recentShipments: [
      { 
        id: 'SHIP-001', 
        orderId: 'ORD-7890',
        customer: 'Rajesh Kumar',
        destination: 'Mumbai, Maharashtra',
        courier: 'BlueDart',
        trackingId: 'BLUEDART7890123456',
        status: 'delivered',
        date: '2024-01-15',
        amount: 125,
        weight: '2.5kg'
      },
      { 
        id: 'SHIP-002', 
        orderId: 'ORD-7891',
        customer: 'Priya Sharma',
        destination: 'Bangalore, Karnataka',
        courier: 'Delhivery',
        trackingId: 'DELHI7890123456',
        status: 'shipped',
        date: '2024-01-15',
        amount: 89,
        weight: '1.8kg'
      },
      { 
        id: 'SHIP-003', 
        orderId: 'ORD-7892',
        customer: 'Amit Patel',
        destination: 'Delhi, NCR',
        courier: 'DTDC',
        trackingId: 'DTDC7890123456',
        status: 'packed',
        date: '2024-01-14',
        amount: 145,
        weight: '3.2kg'
      },
      { 
        id: 'SHIP-004', 
        orderId: 'ORD-7893',
        customer: 'Sunita Singh',
        destination: 'Chennai, Tamil Nadu',
        courier: 'Amazon Shipping',
        trackingId: 'AMZN7890123456',
        status: 'processing',
        date: '2024-01-14',
        amount: 210,
        weight: '4.5kg'
      },
      { 
        id: 'SHIP-005', 
        orderId: 'ORD-7894',
        customer: 'Vikram Mehta',
        destination: 'Kolkata, West Bengal',
        courier: 'FedEx',
        trackingId: 'FEDEX7890123456',
        status: 'delivered',
        date: '2024-01-13',
        amount: 189,
        weight: '2.8kg'
      },
    ],
    
    shippingCharges: [
      { zone: 'Local (Same City)', weight: '0-500g', charge: 40 },
      { zone: 'Local (Same City)', weight: '501g-1kg', charge: 60 },
      { zone: 'Local (Same City)', weight: '1kg-2kg', charge: 90 },
      { zone: 'Zonal', weight: '0-500g', charge: 70 },
      { zone: 'Zonal', weight: '501g-1kg', charge: 110 },
      { zone: 'National', weight: '0-500g', charge: 120 },
      { zone: 'National', weight: '501g-1kg', charge: 180 },
    ],
    
    deliveryZones: [
      { name: 'North Zone', cities: ['Delhi', 'Chandigarh', 'Jaipur'], days: '2-3' },
      { name: 'South Zone', cities: ['Bangalore', 'Chennai', 'Hyderabad'], days: '3-4' },
      { name: 'West Zone', cities: ['Mumbai', 'Ahmedabad', 'Pune'], days: '2-3' },
      { name: 'East Zone', cities: ['Kolkata', 'Bhubaneswar', 'Guwahati'], days: '4-5' },
    ],
    
    returnRequests: [
      { id: 'RET-001', orderId: 'ORD-7885', reason: 'Wrong item', status: 'pending', date: '2024-01-15' },
      { id: 'RET-002', orderId: 'ORD-7886', reason: 'Damaged product', status: 'processing', date: '2024-01-14' },
      { id: 'RET-003', orderId: 'ORD-7887', reason: 'Size issue', status: 'completed', date: '2024-01-13' },
    ]
  };

  // Status styling
  const getStatusStyles = (status) => {
    const base = "px-2 py-0.5 rounded-full text-sm font-medium flex items-center gap-1 w-fit";
    
    switch(status) {
      case 'delivered': 
        return `${base} bg-green-50 text-green-700`;
      case 'shipped': 
        return `${base} bg-blue-50 text-blue-600`;
      case 'packed': 
        return `${base} bg-purple-50 text-purple-600`;
      case 'processing': 
        return `${base} bg-yellow-50 text-yellow-600`;
      case 'pending': 
        return `${base} bg-orange-50 text-orange-500`;
      case 'completed': 
        return `${base} bg-green-50 text-green-700`;
      default: 
        return `${base} bg-gray-100 text-gray-600`;
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'delivered': 
      case 'completed': 
        return <CheckCircle2 className="w-4 h-4" />;
      case 'shipped': 
        return <Truck className="w-4 h-4" />;
      case 'packed': 
        return <Package className="w-4 h-4" />;
      default: 
        return <Clock className="w-4 h-4" />;
    }
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Handle actions
  const handleAction = (action, data = null) => {
    setIsLoading(true);
    
    switch(action) {
      case 'trackShipment':
        console.log('Track shipment:', data);
        window.open(`https://www.bluedart.com/tracking/${data}`, '_blank');
        break;
        
      case 'editShipping':
        console.log('Edit shipping:', data);
        break;
        
      case 'addCourier':
        console.log('Add new courier');
        break;
        
      case 'downloadReport':
        const reportData = {
          date: new Date().toLocaleDateString('en-IN'),
          totalShipments: dashboardData.totalShipments,
          recentShipments: dashboardData.recentShipments,
          shippingCharges: dashboardData.shippingCharges
        };
        const dataStr = JSON.stringify(reportData, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        const exportFileDefaultName = `shipping-report-${new Date().toISOString().split('T')[0]}.json`;
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
        break;
        
      case 'refreshData':
        console.log('Refreshing data...');
        setTimeout(() => setIsLoading(false), 1000);
        return;
    }
    
    setTimeout(() => setIsLoading(false), 500);
  };

  // Filter shipments by courier
  const filteredShipments = selectedCourier === 'all' 
    ? dashboardData.recentShipments
    : dashboardData.recentShipments.filter(shipment => 
        shipment.courier.toLowerCase() === selectedCourier.toLowerCase()
      );

  // Search shipments
  const searchedShipments = searchTerm 
    ? filteredShipments.filter(shipment => 
        shipment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shipment.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shipment.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shipment.trackingId.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : filteredShipments;

  return (
    <div className="min-h-screen transition-colors duration-300 bg-gray-50/30 text-gray-900">
      <VendorPageHeader 
        title="SHIPPING & DELIVERY" 
        subtitle="Manage shipments, couriers, and delivery operations" 
      />

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="rounded-lg p-6 flex flex-col items-center gap-3 bg-white">
            <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm text-gray-700">Processing...</p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="p-4 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {/* Total Shipments */}
          <div className="rounded-lg border px-4 py-1.5 bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Shipments</p>
                <p className="text-xl font-semibold mt-1 text-gray-800">
                  {dashboardData.totalShipments}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <ArrowUpRight className="w-3 h-3 text-green-500" />
                  <span className="text-xs text-green-500">+12%</span>
                </div>
              </div>
              <div className="p-2 rounded bg-blue-50">
                <Truck className="w-5 h-5 text-blue-500" />
              </div>
            </div>
          </div>

          {/* Pending Deliveries */}
          <div className="rounded-lg border px-4 py-1.5 bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Deliveries</p>
                <p className="text-xl font-semibold mt-1 text-gray-800">
                  {dashboardData.pendingDeliveries}
                </p>
                <p className="text-xs text-yellow-500 mt-2">Requires attention</p>
              </div>
              <div className="p-2 rounded bg-yellow-50">
                <Clock className="w-5 h-5 text-yellow-500" />
              </div>
            </div>
          </div>

          {/* Delivered Today */}
          <div className="rounded-lg border px-4 py-1.5 bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Delivered Today</p>
                <p className="text-xl font-semibold mt-1 text-gray-800">
                  {dashboardData.deliveredToday}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <CheckCircle2 className="w-3 h-3 text-green-500" />
                  <span className="text-xs text-green-500">On track</span>
                </div>
              </div>
              <div className="p-2 rounded bg-green-50">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              </div>
            </div>
          </div>

          {/* Return Requests */}
          <div className="rounded-lg border px-4 py-1.5 bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Return Requests</p>
                <p className="text-xl font-semibold mt-1 text-gray-800">
                  {dashboardData.returnRequests.length}
                </p>
                <p className="text-xs text-orange-500 mt-2">Action needed</p>
              </div>
              <div className="p-2 rounded bg-orange-50">
                <AlertCircle className="w-5 h-5 text-orange-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 border-b pb-3">
          {['overview', 'shipments', 'couriers', 'charges', 'zones', 'returns'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                activeTab === tab 
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              {tab.replace('-', ' ')}
            </button>
          ))}
        </div>

        {/* Search and Filter Bar */}
        <div className="rounded-lg px-4 py-3 bg-white border border-gray-200">
          <div className="flex flex-col md:flex-row gap-3 text-sm">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by Order ID, Tracking ID, or Customer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-1.5 rounded-lg border bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            {/* Courier Filter */}
            <div className="flex gap-2">
              <select
                value={selectedCourier}
                onChange={(e) => setSelectedCourier(e.target.value)}
                className="px-4 py-1.5 rounded-lg border bg-white border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Couriers</option>
                {dashboardData.courierPartners.map(courier => (
                  <option key={courier.id} value={courier.value}>
                    {courier.name}
                  </option>
                ))}
              </select>
              
              <button className="px-4 py-1.5 rounded-lg border bg-gray-50 border-gray-300 hover:bg-gray-100 flex items-center gap-2">
                <Filter className="w-4 h-4" />
                <span className="hidden sm:inline">More Filters</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Left Column - Recent Shipments */}
            <div className="lg:col-span-2 space-y-4">
              {/* Recent Shipments Table */}
              <div className="rounded-lg border overflow-hidden bg-white border-gray-200">
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Recent Shipments</h3>
                    <button 
                      onClick={() => handleAction('downloadReport')}
                      className="px-3 py-1.5 text-sm rounded-lg flex items-center gap-2 bg-gray-100 hover:bg-gray-200"
                    >
                      <Download className="w-4 h-4" />
                      Export
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40">
                        <th className="text-left p-3 text-sm font-medium">Order ID</th>
                        <th className="text-left p-3 text-sm font-medium">Customer</th>
                        <th className="text-left p-3 text-sm font-medium">Courier</th>
                        <th className="text-left p-3 text-sm font-medium">Status</th>
                        <th className="text-left p-3 text-sm font-medium">Amount</th>
                        <th className="text-left p-3 text-sm font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {searchedShipments.map((shipment) => (
                        <tr key={shipment.id} className="border-b border-gray-200 hover:bg-gray-50">
                          <td className="p-3">
                            <div>
                              <div className="font-medium">{shipment.orderId}</div>
                              <div className="text-xs text-gray-500">{shipment.id}</div>
                            </div>
                          </td>
                          <td className="p-3">
                            <div>
                              <div className="font-medium">{shipment.customer}</div>
                              <div className="text-xs text-gray-500">{shipment.destination}</div>
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="font-medium">{shipment.courier}</div>
                            <div className="text-xs text-gray-500">{shipment.trackingId}</div>
                          </td>
                          <td className="p-3">
                            <div className={getStatusStyles(shipment.status)}>
                              {getStatusIcon(shipment.status)}
                              <span>{shipment.status}</span>
                            </div>
                          </td>
                          <td className="p-3 font-medium">
                            {formatCurrency(shipment.amount)}
                          </td>
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <button 
                                onClick={() => handleAction('trackShipment', shipment.trackingId)}
                                className="p-1.5 rounded hover:bg-gray-100"
                                title="Track Shipment"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button 
                                className="p-1.5 rounded hover:bg-gray-100"
                                title="Edit"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Right Column - Courier Partners */}
            <div className="space-y-4">
              {/* Courier Partners */}
              <div className="rounded-lg border p-4 bg-white border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Courier Partners</h3>
                  <button 
                    onClick={() => handleAction('addCourier')}
                    className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="space-y-3">
                  {dashboardData.courierPartners.map((courier) => (
                    <div 
                      key={courier.id}
                      className="p-3 rounded-lg border border-gray-200 hover:bg-gray-50"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{courier.name}</div>
                          <div className="text-sm text-gray-500">
                            {courier.shipments} shipments
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-yellow-500">★ {courier.rating}</span>
                          <button className="p-1 rounded hover:bg-gray-100">
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Zones */}
              <div className="rounded-lg border p-4 bg-white border-gray-200">
                <h3 className="text-lg font-semibold mb-4">Delivery Zones</h3>
                <div className="space-y-3">
                  {dashboardData.deliveryZones.map((zone) => (
                    <div key={zone.name} className="p-3 rounded-lg border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium flex items-center gap-2">
                          <Globe className="w-4 h-4" />
                          {zone.name}
                        </div>
                        <span className="px-2 py-1 rounded text-sm bg-blue-50 text-blue-600">
                          {zone.days} days
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">
                        {zone.cities.join(', ')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'charges' && (
          <div className="rounded-lg border overflow-hidden bg-white border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Shipping Charge Rules</h3>
                <button className="px-4 py-2 rounded-lg flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white">
                  <Plus className="w-4 h-4" />
                  Add Rule
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left p-4 text-sm font-medium">Zone</th>
                    <th className="text-left p-4 text-sm font-medium">Weight Range</th>
                    <th className="text-left p-4 text-sm font-medium">Shipping Charge</th>
                    <th className="text-left p-4 text-sm font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboardData.shippingCharges.map((charge, index) => (
                    <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="p-4">
                        <div className="font-medium flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {charge.zone}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="font-medium">{charge.weight}</div>
                      </td>
                      <td className="p-4">
                        <div className="font-medium flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-green-500" />
                          {formatCurrency(charge.charge)}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <button className="p-1.5 rounded hover:bg-gray-100">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 rounded hover:bg-red-50 text-red-500">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'returns' && (
          <div className="rounded-lg border overflow-hidden bg-white border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Return Requests</h3>
                <button className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white">
                  Manage Returns
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left p-4 text-sm font-medium">Return ID</th>
                    <th className="text-left p-4 text-sm font-medium">Order ID</th>
                    <th className="text-left p-4 text-sm font-medium">Reason</th>
                    <th className="text-left p-4 text-sm font-medium">Status</th>
                    <th className="text-left p-4 text-sm font-medium">Date</th>
                    <th className="text-left p-4 text-sm font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboardData.returnRequests.map((request) => (
                    <tr key={request.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="p-4 font-medium">{request.id}</td>
                      <td className="p-4 font-medium">{request.orderId}</td>
                      <td className="p-4">{request.reason}</td>
                      <td className="p-4">
                        <div className={getStatusStyles(request.status)}>
                          {getStatusIcon(request.status)}
                          <span>{request.status}</span>
                        </div>
                      </td>
                      <td className="p-4">{request.date}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <button className="px-3 py-1.5 rounded text-sm bg-gray-100 hover:bg-gray-200">
                            View Details
                          </button>
                          <button className="px-3 py-1.5 rounded text-sm bg-blue-50 hover:bg-blue-100 text-blue-600">
                            Process
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Status Flow Visual */}
       <div className="rounded-lg border p-4 bg-white border-gray-200 shadow-sm">
  <h3 className="text-lg font-semibold mb-4 text-gray-800">
    Shipment Status Flow
  </h3>

  <div className="flex flex-col md:flex-row items-center justify-between">

    {['Processing', 'Packed', 'Shipped', 'Delivered'].map((status, index) => (

      <div key={status} className="flex items-center relative">

        {/* Step */}
        <div className={`flex flex-col items-center ${index > 0 ? 'md:ml-8' : ''}`}>

          {/* ICON (size same w-12 h-12) */}
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center mb-2
              border shadow-sm transition-all
              ${
                index === 0 ? 'bg-yellow-50 border-yellow-200' :
                index === 1 ? 'bg-purple-50 border-purple-200' :
                index === 2 ? 'bg-blue-50 border-blue-200' :
                'bg-green-50 border-green-200'
              }
            `}
          >
            {index === 0 && <Package className="w-6 h-6 text-yellow-500" />}
            {index === 1 && <Package className="w-6 h-6 text-purple-500" />}
            {index === 2 && <Truck className="w-6 h-6 text-blue-500" />}
            {index === 3 && <CheckCircle2 className="w-6 h-6 text-green-500" />}
          </div>

          {/* Text */}
          <div className="text-center">
            <div className="font-medium text-gray-800 text-sm">
              {status}
            </div>

            <div className="text-xs text-gray-500 mt-0.5">
              {index === 0 && 'Order received'}
              {index === 1 && 'Package ready'}
              {index === 2 && 'In transit'}
              {index === 3 && 'Delivered'}
            </div>
          </div>
        </div>

        {/* Desktop connector */}
        {index < 3 && (
          <div className="hidden md:block mx-4 w-8 h-0.5 bg-gradient-to-r from-gray-300 to-gray-200 rounded-full"></div>
        )}

        {/* Mobile vertical connector */}
        {index < 3 && (
          <div className="md:hidden absolute top-14 w-0.5 h-6 bg-gray-200"></div>
        )}

      </div>

    ))}

  </div>
</div>

      </div>
    </div>
  );
};

export default ShippingDelivery;