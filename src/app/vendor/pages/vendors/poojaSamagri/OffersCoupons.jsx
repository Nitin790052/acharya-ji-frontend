import React, { useState, useEffect } from 'react';
import { 
  Search,
  Filter,
  Tag,
  Percent,
  Calendar,
  Hash,
  IndianRupee,
  Plus,
  Copy,
  Edit,
  Trash2,
  Eye,
  CheckSquare,
  Square,
  Download,
  MoreVertical,
  ChevronDown,
  TrendingUp,
  Bell,
  Clock,
  Users,
  ShoppingBag,
  CheckCircle,
  XCircle,
  Sparkles,
  Award
} from 'lucide-react';

import VendorPageHeader from '../../../components/VendorPageHeader';

const OffersCoupons = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedCoupons, setSelectedCoupons] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const [editingCoupon, setEditingCoupon] = useState(null);
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    description: '',
    discountType: 'percentage',
    discountValue: '',
    minOrderValue: '',
    maxDiscount: '',
    expiryDate: '',
    usageLimit: '',
    perUserLimit: '1',
    isActive: true,
    applicableTo: 'all',
    categories: []
  });

  // Sample Coupons Data
  const couponsData = [
    {
      id: 'CPN-001',
      code: 'NAVRATRI20',
      name: 'Navratri Special',
      description: '20% off on all Navratri items',
      discountType: 'percentage',
      discountValue: 20,
      minOrderValue: 1000,
      maxDiscount: 500,
      expiryDate: '2023-12-31',
      usageLimit: 100,
      usedCount: 42,
      perUserLimit: 1,
      isActive: true,
      applicableTo: 'categories',
      categories: ['Navratri', 'Decorations'],
      createdAt: '2023-11-01',
      salesGenerated: 12500
    },
    {
      id: 'CPN-002',
      code: 'WELCOME100',
      name: 'Welcome Offer',
      description: 'Flat ₹100 off for new customers',
      discountType: 'flat',
      discountValue: 100,
      minOrderValue: 500,
      maxDiscount: 100,
      expiryDate: '2024-01-15',
      usageLimit: 200,
      usedCount: 89,
      perUserLimit: 1,
      isActive: true,
      applicableTo: 'all',
      categories: [],
      createdAt: '2023-10-15',
      salesGenerated: 25600
    },
    {
      id: 'CPN-003',
      code: 'DIWALI25',
      name: 'Diwali Festival',
      description: '25% off on Diwali collection',
      discountType: 'percentage',
      discountValue: 25,
      minOrderValue: 2000,
      maxDiscount: 1000,
      expiryDate: '2023-11-15',
      usageLimit: 50,
      usedCount: 50,
      perUserLimit: 1,
      isActive: false,
      applicableTo: 'categories',
      categories: ['Diwali', 'Decorations'],
      createdAt: '2023-10-01',
      salesGenerated: 45000
    },
    {
      id: 'CPN-004',
      code: 'FIRSTORDER',
      name: 'First Order',
      description: '15% off on first order',
      discountType: 'percentage',
      discountValue: 15,
      minOrderValue: 0,
      maxDiscount: 300,
      expiryDate: '2024-03-31',
      usageLimit: 500,
      usedCount: 156,
      perUserLimit: 1,
      isActive: true,
      applicableTo: 'new_users',
      categories: [],
      createdAt: '2023-09-01',
      salesGenerated: 68900
    },
    {
      id: 'CPN-005',
      code: 'FREESHIP',
      name: 'Free Shipping',
      description: 'Free shipping on orders above ₹999',
      discountType: 'shipping',
      discountValue: 0,
      minOrderValue: 999,
      maxDiscount: 0,
      expiryDate: '2023-12-25',
      usageLimit: 1000,
      usedCount: 234,
      perUserLimit: 3,
      isActive: true,
      applicableTo: 'all',
      categories: [],
      createdAt: '2023-11-10',
      salesGenerated: 152300
    },
    {
      id: 'CPN-006',
      code: 'SATYANARAYAN',
      name: 'Puja Special',
      description: '10% off on Satyanarayan puja items',
      discountType: 'percentage',
      discountValue: 10,
      minOrderValue: 1500,
      maxDiscount: 250,
      expiryDate: '2023-12-20',
      usageLimit: 75,
      usedCount: 28,
      perUserLimit: 2,
      isActive: true,
      applicableTo: 'categories',
      categories: ['Satyanarayan', 'Puja Items'],
      createdAt: '2023-11-05',
      salesGenerated: 18500
    },
    {
      id: 'CPN-007',
      code: 'BULK500',
      name: 'Bulk Order',
      description: 'Flat ₹500 off on orders above ₹3000',
      discountType: 'flat',
      discountValue: 500,
      minOrderValue: 3000,
      maxDiscount: 500,
      expiryDate: '2024-02-28',
      usageLimit: 150,
      usedCount: 45,
      perUserLimit: 2,
      isActive: true,
      applicableTo: 'all',
      categories: [],
      createdAt: '2023-10-20',
      salesGenerated: 75000
    },
    {
      id: 'CPN-008',
      code: 'LOYALTY15',
      name: 'Loyalty Reward',
      description: '15% off for loyal customers',
      discountType: 'percentage',
      discountValue: 15,
      minOrderValue: 0,
      maxDiscount: 750,
      expiryDate: '2024-06-30',
      usageLimit: 100,
      usedCount: 12,
      perUserLimit: 5,
      isActive: false,
      applicableTo: 'loyal_users',
      categories: [],
      createdAt: '2023-09-15',
      salesGenerated: 32000
    },
  ];

  // Categories for filtering
  const categories = ['All', 'Navratri', 'Diwali', 'Satyanarayan', 'Decorations', 'Puja Items'];
  const statusTypes = ['All', 'Active', 'Inactive', 'Expired', 'Limited Use'];
  const discountTypes = ['All', 'Percentage', 'Flat', 'Shipping'];

  // Initialize
  useEffect(() => {
    setCoupons(couponsData);
  }, []);

  // Format currency - Indian format
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Generate coupon code
  const generateCouponCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData(prev => ({ ...prev, code }));
  };

  // Calculate coupon stats
  const stats = {
    totalCoupons: coupons.length,
    activeCoupons: coupons.filter(c => c.isActive && new Date(c.expiryDate) > new Date()).length,
    totalUses: coupons.reduce((sum, c) => sum + c.usedCount, 0),
    totalSales: coupons.reduce((sum, c) => sum + c.salesGenerated, 0),
    expiringSoon: coupons.filter(c => {
      const expiryDate = new Date(c.expiryDate);
      const today = new Date();
      const diffDays = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
      return diffDays <= 7 && diffDays > 0 && c.isActive;
    }).length,
  };

  // Filter coupons
  const filteredCoupons = coupons.filter(coupon => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        coupon.code.toLowerCase().includes(query) ||
        coupon.name.toLowerCase().includes(query) ||
        coupon.description.toLowerCase().includes(query)
      );
    }
    
    // Status filter
    if (statusFilter !== 'all') {
      if (statusFilter === 'active' && (!coupon.isActive || new Date(coupon.expiryDate) <= new Date())) {
        return false;
      }
      if (statusFilter === 'inactive' && coupon.isActive) {
        return false;
      }
      if (statusFilter === 'expired' && new Date(coupon.expiryDate) > new Date()) {
        return false;
      }
      if (statusFilter === 'limited_use' && coupon.usedCount < coupon.usageLimit) {
        return false;
      }
    }
    
    // Type filter
    if (typeFilter !== 'all') {
      if (typeFilter === 'percentage' && coupon.discountType !== 'percentage') {
        return false;
      }
      if (typeFilter === 'flat' && coupon.discountType !== 'flat') {
        return false;
      }
      if (typeFilter === 'shipping' && coupon.discountType !== 'shipping') {
        return false;
      }
    }
    
    return true;
  });

  // Save coupon
  const saveCoupon = () => {
    // Validate form
    if (!formData.code || !formData.name) {
      alert('Please fill in all required fields');
      return;
    }

    const couponData = {
      ...formData,
      discountValue: parseFloat(formData.discountValue),
      minOrderValue: parseFloat(formData.minOrderValue) || 0,
      maxDiscount: parseFloat(formData.maxDiscount) || 0,
      usageLimit: parseInt(formData.usageLimit) || 0,
      perUserLimit: parseInt(formData.perUserLimit) || 1,
      usedCount: 0,
      salesGenerated: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };

    if (editingCoupon) {
      // Update existing coupon
      setCoupons(prev => prev.map(c => 
        c.id === editingCoupon.id 
          ? { ...couponData, id: editingCoupon.id, usedCount: editingCoupon.usedCount, salesGenerated: editingCoupon.salesGenerated }
          : c
      ));
      setEditingCoupon(null);
    } else {
      // Add new coupon
      const newCoupon = {
        ...couponData,
        id: `CPN-${String(coupons.length + 1).padStart(3, '0')}`
      };
      setCoupons(prev => [newCoupon, ...prev]);
    }

    // Reset form
    setShowCreateForm(false);
    setFormData({
      code: '',
      name: '',
      description: '',
      discountType: 'percentage',
      discountValue: '',
      minOrderValue: '',
      maxDiscount: '',
      expiryDate: '',
      usageLimit: '',
      perUserLimit: '1',
      isActive: true,
      applicableTo: 'all',
      categories: []
    });
  };

  // Edit coupon
  const editCoupon = (coupon) => {
    setEditingCoupon(coupon);
    setFormData({
      code: coupon.code,
      name: coupon.name,
      description: coupon.description,
      discountType: coupon.discountType,
      discountValue: coupon.discountValue,
      minOrderValue: coupon.minOrderValue,
      maxDiscount: coupon.maxDiscount,
      expiryDate: coupon.expiryDate,
      usageLimit: coupon.usageLimit,
      perUserLimit: coupon.perUserLimit.toString(),
      isActive: coupon.isActive,
      applicableTo: coupon.applicableTo,
      categories: coupon.categories || []
    });
    setShowCreateForm(true);
  };

  // Delete coupon
  const deleteCoupon = (id) => {
    if (window.confirm('Are you sure you want to delete this coupon?')) {
      setCoupons(prev => prev.filter(c => c.id !== id));
    }
  };

  // Duplicate coupon
  const duplicateCoupon = (coupon) => {
    const newCoupon = {
      ...coupon,
      id: `CPN-${String(coupons.length + 1).padStart(3, '0')}`,
      code: `${coupon.code}-COPY`,
      name: `${coupon.name} (Copy)`,
      usedCount: 0,
      salesGenerated: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setCoupons(prev => [newCoupon, ...prev]);
  };

  // Toggle coupon active status
  const toggleCouponActive = (id) => {
    setCoupons(prev => prev.map(c => 
      c.id === id ? { ...c, isActive: !c.isActive } : c
    ));
  };

  // Get coupon status
  const getCouponStatus = (coupon) => {
    if (!coupon.isActive) return 'Inactive';
    if (new Date(coupon.expiryDate) <= new Date()) return 'Expired';
    if (coupon.usedCount >= coupon.usageLimit && coupon.usageLimit > 0) return 'Limit Reached';
    return 'Active';
  };

  // Get status style
  const getStatusStyle = (coupon) => {
    const status = getCouponStatus(coupon);
    switch(status) {
      case 'Active':
        return 'bg-green-50 text-green-700';
      case 'Inactive':
        return 'bg-gray-50 text-gray-600';
      case 'Expired':
        return 'bg-red-50 text-red-700';
      case 'Limit Reached':
        return 'bg-orange-50 text-orange-500';
      default:
        return 'bg-gray-50 text-gray-600';
    }
  };

  // Get discount display
  const getDiscountDisplay = (coupon) => {
    if (coupon.discountType === 'percentage') {
      return `${coupon.discountValue}% OFF`;
    } else if (coupon.discountType === 'flat') {
      return `${formatCurrency(coupon.discountValue)} OFF`;
    } else {
      return 'FREE SHIPPING';
    }
  };

  // Get usage percentage
  const getUsagePercentage = (coupon) => {
    if (coupon.usageLimit === 0) return 0;
    return Math.min(100, (coupon.usedCount / coupon.usageLimit) * 100);
  };

  // Toggle coupon selection
  const toggleCouponSelection = (couponId) => {
    setSelectedCoupons(prev => 
      prev.includes(couponId) 
        ? prev.filter(id => id !== couponId)
        : [...prev, couponId]
    );
  };

  // Select all coupons
  const selectAllCoupons = () => {
    if (selectedCoupons.length === filteredCoupons.length) {
      setSelectedCoupons([]);
    } else {
      setSelectedCoupons(filteredCoupons.map(coupon => coupon.id));
    }
  };

  // Export coupons
  const exportCoupons = () => {
    const headers = ['Code', 'Name', 'Discount Type', 'Discount Value', 'Min Order', 'Expiry Date', 'Usage Limit', 'Used Count', 'Status'];
    const csvContent = [
      headers.join(','),
      ...coupons.map(coupon => [
        coupon.code,
        coupon.name,
        coupon.discountType,
        coupon.discountValue,
        coupon.minOrderValue,
        coupon.expiryDate,
        coupon.usageLimit,
        coupon.usedCount,
        getCouponStatus(coupon)
      ].join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `coupons-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  // Copy coupon code to clipboard
  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    alert(`Copied: ${code}`);
  };

  return (
    <div className="min-h-screen bg-gray-50/30">
      <VendorPageHeader 
        title="OFFERS & COUPONS" 
        subtitle="Create and manage discount coupons" 
      />

      {/* Main Content */}
      <div className="p-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
          <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg border border-gray-200 px-3 py-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Coupons</p>
                <p className="text-xl font-semibold mt-1 text-gray-800">
                  {stats.totalCoupons}
                </p>
              </div>
              <div className="p-2 rounded bg-blue-50 mt-4">
                <Tag className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg border border-gray-200 px-3 py-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Coupons</p>
                <p className="text-xl font-semibold mt-1 text-gray-800">
                  {stats.activeCoupons}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="w-3 h-3 text-green-600" />
                  <span className="text-xs text-green-600">+2 this week</span>
                </div>
              </div>
              <div className="p-2 rounded bg-green-50">
                <CheckCircle className="w-5 h-5 text-green-700" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg border border-gray-200 px-3 py-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Uses</p>
                <p className="text-xl font-semibold mt-1 text-gray-800">
                  {stats.totalUses}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <Users className="w-3 h-3 text-blue-600" />
                  <span className="text-xs text-blue-600">156 today</span>
                </div>
              </div>
              <div className="p-2 rounded bg-purple-50">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg border border-gray-200 px-3 py-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Sales Generated</p>
                <p className="text-xl font-semibold mt-1 text-gray-800">
                  {formatCurrency(stats.totalSales)}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <ShoppingBag className="w-3 h-3 text-orange-600" />
                  <span className="text-xs text-orange-600">+₹25K today</span>
                </div>
              </div>
              <div className="p-2 rounded bg-orange-50">
                <ShoppingBag className="w-5 h-5 text-orange-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Expiring Soon Alert */}
        {stats.expiringSoon > 0 && (
          <div className="bg-orange-50 rounded-lg border border-orange-200 p-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded bg-orange-100">
                <Bell className="w-5 h-5 text-orange-500" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-800">
                  ⏰ {stats.expiringSoon} coupon{stats.expiringSoon !== 1 ? 's' : ''} expiring soon!
                </h3>
                <p className="text-sm text-gray-700">
                  Check and renew coupons expiring within 7 days
                </p>
              </div>
              <button 
                onClick={() => setStatusFilter('expiring_soon')}
                className="px-3 py-1.5 text-sm rounded border border-orange-300 text-orange-600 hover:bg-orange-50"
              >
                View Expiring
              </button>
            </div>
          </div>
        )}

        {/* Bulk Actions Bar */}
        {selectedCoupons.length > 0 && (
          <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg border border-gray-200 px-3 py-2 mb-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded bg-blue-50">
                  <CheckSquare className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {selectedCoupons.length} coupon{selectedCoupons.length !== 1 ? 's' : ''} selected
                  </p>
                  <p className="text-xs text-gray-600">
                    Click to select/deselect all
                  </p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={() => {
                    // Bulk activate
                    setCoupons(prev => prev.map(c => 
                      selectedCoupons.includes(c.id) ? { ...c, isActive: true } : c
                    ));
                    setSelectedCoupons([]);
                  }}
                  className="px-3 py-1.5 text-sm rounded border bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                >
                  Activate Selected
                </button>
                <button 
                  onClick={() => {
                    // Bulk deactivate
                    setCoupons(prev => prev.map(c => 
                      selectedCoupons.includes(c.id) ? { ...c, isActive: false } : c
                    ));
                    setSelectedCoupons([]);
                  }}
                  className="px-3 py-1.5 text-sm rounded border bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                >
                  Deactivate Selected
                </button>
                <button 
                  onClick={() => {
                    // Bulk delete
                    if (window.confirm(`Delete ${selectedCoupons.length} selected coupons?`)) {
                      setCoupons(prev => prev.filter(c => !selectedCoupons.includes(c.id)));
                      setSelectedCoupons([]);
                    }
                  }}
                  className="px-3 py-1.5 text-sm rounded border bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
                >
                  Delete Selected
                </button>
                <button 
                  onClick={() => setSelectedCoupons([])}
                  className="px-3 py-1.5 text-sm rounded border border-gray-300 hover:bg-gray-100"
                >
                  Clear Selection
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Create Coupon Form */}
        {showCreateForm && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                {editingCoupon ? 'Edit Coupon' : 'Create New Coupon'}
              </h2>
              <button 
                onClick={() => {
                  setShowCreateForm(false);
                  setEditingCoupon(null);
                  setFormData({
                    code: '',
                    name: '',
                    description: '',
                    discountType: 'percentage',
                    discountValue: '',
                    minOrderValue: '',
                    maxDiscount: '',
                    expiryDate: '',
                    usageLimit: '',
                    perUserLimit: '1',
                    isActive: true,
                    applicableTo: 'all',
                    categories: []
                  });
                }}
                className="p-1.5 hover:bg-gray-100 rounded"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                {/* Coupon Code */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700">
                      Coupon Code *
                    </label>
                    <button 
                      type="button"
                      onClick={generateCouponCode}
                      className="text-xs text-orange-500 hover:text-orange-600 flex items-center gap-1"
                    >
                      <Sparkles className="w-3 h-3" />
                      Generate Code
                    </button>
                  </div>
                  <div className="relative">
                    <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      name="code"
                      value={formData.code}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2 rounded-lg border bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="e.g., NAVRATRI20"
                      required
                    />
                  </div>
                  <p className="text-xs mt-1 text-gray-600">
                    Example: NAVRATRI20 → 20% off during Navratri
                  </p>
                </div>

                {/* Coupon Name */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    Coupon Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="e.g., Navratri Special Offer"
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-2 rounded-lg border bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Describe this coupon offer..."
                  />
                </div>

                {/* Discount Type */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    Discount Type *
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, discountType: 'percentage' }))}
                      className={`px-3 py-2 rounded-lg border flex items-center justify-center gap-1 ${
                        formData.discountType === 'percentage'
                          ? 'bg-orange-50 text-orange-600 border-orange-200'
                          : 'border-gray-300 hover:bg-gray-100'
                      }`}
                    >
                      <Percent className="w-4 h-4" />
                      Percentage
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, discountType: 'flat' }))}
                      className={`px-3 py-2 rounded-lg border flex items-center justify-center gap-1 ${
                        formData.discountType === 'flat'
                          ? 'bg-orange-50 text-orange-600 border-orange-200'
                          : 'border-gray-300 hover:bg-gray-100'
                      }`}
                    >
                      <IndianRupee className="w-4 h-4" />
                      Flat Amount
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, discountType: 'shipping' }))}
                      className={`px-3 py-2 rounded-lg border flex items-center justify-center gap-1 ${
                        formData.discountType === 'shipping'
                          ? 'bg-orange-50 text-orange-600 border-orange-200'
                          : 'border-gray-300 hover:bg-gray-100'
                      }`}
                    >
                      <Tag className="w-4 h-4" />
                      Free Shipping
                    </button>
                  </div>
                </div>

                {/* Discount Value */}
                {formData.discountType !== 'shipping' && (
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                      {formData.discountType === 'percentage' ? 'Discount Percentage *' : 'Discount Amount *'}
                    </label>
                    <div className="relative">
                      {formData.discountType === 'percentage' ? (
                        <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      ) : (
                        <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      )}
                      <input
                        type="number"
                        name="discountValue"
                        value={formData.discountValue}
                        onChange={handleInputChange}
                        min="0"
                        max={formData.discountType === 'percentage' ? '100' : ''}
                        className={`w-full ${formData.discountType === 'percentage' ? 'pl-10' : 'pl-10'} pr-4 py-2 rounded-lg border bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500`}
                        placeholder={formData.discountType === 'percentage' ? '20' : '100'}
                        required
                      />
                    </div>
                  </div>
                )}

                {/* Maximum Discount (for percentage) */}
                {formData.discountType === 'percentage' && (
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                      Maximum Discount Amount
                    </label>
                    <div className="relative">
                      <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="number"
                        name="maxDiscount"
                        value={formData.maxDiscount}
                        onChange={handleInputChange}
                        min="0"
                        className="w-full pl-10 pr-4 py-2 rounded-lg border bg-gray-50 border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="e.g., 500"
                      />
                    </div>
                    <p className="text-xs mt-1 text-gray-600">
                      Maximum discount amount (optional)
                    </p>
                  </div>
                )}
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                {/* Minimum Order Value */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    Minimum Order Value
                  </label>
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="number"
                      name="minOrderValue"
                      value={formData.minOrderValue}
                      onChange={handleInputChange}
                      min="0"
                      className="w-full pl-10 pr-4 py-2 rounded-lg border bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="e.g., 1000"
                    />
                  </div>
                  <p className="text-xs mt-1 text-gray-600">
                    Leave 0 for no minimum order
                  </p>
                </div>

                {/* Expiry Date */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    Expiry Date *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="date"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full pl-10 pr-4 py-2 rounded-lg border bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                    />
                  </div>
                </div>

                {/* Usage Limit */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    Usage Limit
                  </label>
                  <div className="relative">
                    <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="number"
                      name="usageLimit"
                      value={formData.usageLimit}
                      onChange={handleInputChange}
                      min="0"
                      className="w-full pl-10 pr-4 py-2 rounded-lg border bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="e.g., 100"
                    />
                  </div>
                  <p className="text-xs mt-1 text-gray-600">
                    Leave 0 for unlimited uses
                  </p>
                </div>

                {/* Per User Limit */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    Uses Per Customer
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="number"
                      name="perUserLimit"
                      value={formData.perUserLimit}
                      onChange={handleInputChange}
                      min="1"
                      className="w-full pl-10 pr-4 py-2 rounded-lg border bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="1"
                    />
                  </div>
                </div>

                {/* Applicable To */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    Applicable To
                  </label>
                  <select
                    name="applicableTo"
                    value={formData.applicableTo}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="all">All Products</option>
                    <option value="categories">Specific Categories</option>
                    <option value="new_users">New Customers Only</option>
                    <option value="loyal_users">Loyal Customers Only</option>
                  </select>
                </div>

                {/* Active Toggle */}
                <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded bg-gray-100">
                      {formData.isActive ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        <XCircle className="w-4 h-4 text-gray-400" />
                      )}
                    </div>
                    <span className="text-sm text-gray-700">
                      {formData.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer ml-auto">
                    <input
                      type="checkbox"
                      name="isActive"
                      checked={formData.isActive}
                      onChange={handleInputChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                  </label>
                </div>

                {/* Preview Card */}
                <div className="p-4 rounded-lg border bg-orange-50 border-orange-200">
                  <h4 className="font-medium mb-3 text-gray-800">
                    Coupon Preview
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Code:</span>
                      <span className="font-mono font-bold text-gray-800">
                        {formData.code || 'COUPONCODE'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Discount:</span>
                      <span className="font-bold text-orange-600">
                        {formData.discountType === 'percentage' 
                          ? `${formData.discountValue || '0'}% OFF`
                          : formData.discountType === 'flat'
                            ? `${formatCurrency(formData.discountValue || 0)} OFF`
                            : 'FREE SHIPPING'}
                      </span>
                    </div>
                    {formData.minOrderValue && (
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Min. Order:</span>
                        <span className="text-sm text-gray-700">
                          {formatCurrency(formData.minOrderValue)}
                        </span>
                      </div>
                    )}
                    {formData.expiryDate && (
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Valid Till:</span>
                        <span className="text-sm text-gray-700">
                          {formatDate(formData.expiryDate)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-200">
              <button
                onClick={() => {
                  setShowCreateForm(false);
                  setEditingCoupon(null);
                  setFormData({
                    code: '',
                    name: '',
                    description: '',
                    discountType: 'percentage',
                    discountValue: '',
                    minOrderValue: '',
                    maxDiscount: '',
                    expiryDate: '',
                    usageLimit: '',
                    perUserLimit: '1',
                    isActive: true,
                    applicableTo: 'all',
                    categories: []
                  });
                }}
                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={saveCoupon}
                disabled={!formData.code || !formData.name || !formData.expiryDate}
                className={`px-4 py-2 rounded-lg ${!formData.code || !formData.name || !formData.expiryDate ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700'}`}
              >
                {editingCoupon ? 'Update Coupon' : 'Create Coupon'}
              </button>
            </div>
          </div>
        )}

        {/* Controls Bar */}
        <div className="bg-white rounded-lg border border-gray-200 p-3 mb-4">
          <div className="flex flex-col lg:flex-row gap-4 text-sm">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search coupons by code, name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-1.5 w-full rounded-lg border bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            {/* Filters and Actions */}
            <div className="flex flex-col sm:flex-row gap-2">
              {/* Status Filter */}
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="appearance-none pl-10 pr-8 py-1.5  rounded-lg border bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="expired">Expired</option>
                  <option value="limited_use">Limited Use</option>
                </select>
                <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>

              {/* Type Filter */}
              <div className="relative">
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="appearance-none pl-10 pr-8 py-1.5 rounded-lg border bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="all">All Types</option>
                  <option value="percentage">Percentage</option>
                  <option value="flat">Flat Amount</option>
                  <option value="shipping">Free Shipping</option>
                </select>
                <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button 
                  onClick={() => setShowCreateForm(true)}
                  className="px-4 py-1.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Create Coupon
                </button>
                <button 
                  onClick={exportCoupons}
                  className="px-4 py-1.5 rounded-lg border flex items-center gap-2 bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200"
                >
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Coupons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCoupons.map(coupon => {
            const usagePercent = getUsagePercentage(coupon);
            const isExpired = new Date(coupon.expiryDate) <= new Date();
            
            return (
              <div 
                key={coupon.id} 
                className="bg-white rounded-lg border border-gray-200 overflow-hidden"
              >
                {/* Coupon Header */}
                <div className="p-4 bg-gradient-to-r from-orange-50 to-amber-50">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-lg text-gray-800">
                          {coupon.code}
                        </h3>
                        <button 
                          onClick={() => copyToClipboard(coupon.code)}
                          className="p-1 rounded hover:bg-gray-100"
                          title="Copy code"
                        >
                          <Copy className="w-3 h-3" />
                        </button>
                      </div>
                      <p className="text-sm text-gray-700">
                        {coupon.name}
                      </p>
                    </div>
                    <button 
                      onClick={() => toggleCouponSelection(coupon.id)}
                      className="z-10"
                    >
                      {selectedCoupons.includes(coupon.id) ? (
                        <CheckSquare className="w-5 h-5 text-blue-600" />
                      ) : (
                        <Square className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                  
                  {/* Discount Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 rounded-full text-sm font-bold bg-orange-100 text-orange-600">
                      {getDiscountDisplay(coupon)}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusStyle(coupon)}`}>
                      {getCouponStatus(coupon)}
                    </span>
                  </div>
                  
                  {/* Description */}
                  <p className="text-sm mb-3 text-gray-700">
                    {coupon.description}
                  </p>
                </div>
                
                {/* Coupon Details */}
                <div className="p-4">
                  {/* Conditions */}
                  <div className="space-y-2 mb-4">
                    {coupon.minOrderValue > 0 && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                          Min. Order:
                        </span>
                        <span className="text-sm font-medium text-gray-700">
                          {formatCurrency(coupon.minOrderValue)}
                        </span>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        Valid Till:
                      </span>
                      <span className={`text-sm font-medium ${isExpired ? 'text-red-500' : 'text-gray-700'}`}>
                        {formatDate(coupon.expiryDate)}
                        {isExpired && ' (Expired)'}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        Usage Limit:
                      </span>
                      <span className="text-sm font-medium text-gray-700">
                        {coupon.usageLimit === 0 ? 'Unlimited' : `${coupon.usedCount}/${coupon.usageLimit}`}
                      </span>
                    </div>
                    
                    {coupon.applicableTo !== 'all' && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                          Applicable To:
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded bg-blue-50 text-blue-600">
                          {coupon.applicableTo === 'new_users' ? 'New Customers' : 
                           coupon.applicableTo === 'loyal_users' ? 'Loyal Customers' : 
                           'Specific Categories'}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {/* Usage Progress */}
                  {coupon.usageLimit > 0 && (
                    <div className="mb-4">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-600">
                          Usage: {coupon.usedCount}/{coupon.usageLimit}
                        </span>
                        <span className={usagePercent >= 80 ? 'text-red-500' : 'text-gray-600'}>
                          {Math.round(usagePercent)}%
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-gray-200">
                        <div 
                          className={`h-2 rounded-full ${
                            usagePercent >= 80 ? 'bg-red-500' :
                            usagePercent >= 50 ? 'bg-orange-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${usagePercent}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                  
                  {/* Sales Generated */}
                  <div className="p-3 rounded-lg mb-4 bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-600">Sales Generated</p>
                        <p className="font-bold text-gray-800">
                          {formatCurrency(coupon.salesGenerated)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-600">Uses Today</p>
                        <div className="flex items-center gap-1 justify-end">
                          <Users className="w-3 h-3 text-green-600" />
                          <span className="font-medium text-gray-800">
                            {Math.floor(coupon.usedCount / 30)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <div className="flex items-center gap-1">
                      <button 
                        onClick={() => editCoupon(coupon)}
                        className="p-1.5 rounded hover:bg-gray-100"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => duplicateCoupon(coupon)}
                        className="p-1.5 rounded hover:bg-gray-100"
                        title="Duplicate"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => toggleCouponActive(coupon.id)}
                        className="p-1.5 rounded hover:bg-gray-100"
                        title={coupon.isActive ? 'Deactivate' : 'Activate'}
                      >
                        {coupon.isActive ? (
                          <XCircle className="w-4 h-4 text-gray-500" />
                        ) : (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        )}
                      </button>
                    </div>
                    <button 
                      onClick={() => deleteCoupon(coupon.id)}
                      className="p-1.5 rounded hover:bg-gray-100"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredCoupons.length === 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
            <div className="p-4 rounded-full inline-flex items-center justify-center mb-4 bg-gray-100">
              <Tag className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium mb-2 text-gray-800">
              No coupons found
            </h3>
            <p className="text-sm text-gray-600">
              {searchQuery ? 'Try a different search term' : 'Create your first coupon to get started'}
            </p>
            <button 
              onClick={() => setShowCreateForm(true)}
              className="mt-4 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700"
            >
              Create Your First Coupon
            </button>
          </div>
        )}

        {/* Popular Examples Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mt-6">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-gray-800">
            <Award className="w-5 h-5 text-orange-500" />
            Popular Coupon Examples
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-gray-50">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 rounded bg-green-100">
                  <Tag className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">NAVRATRI20</h4>
                  <p className="text-xs text-gray-600">20% off during Navratri</p>
                </div>
              </div>
              <p className="text-sm text-gray-700">
                Min. order: ₹1,000 • Valid till: 31 Dec 2023
              </p>
            </div>
            
            <div className="p-4 rounded-lg bg-gray-50">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 rounded bg-blue-100">
                  <Tag className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">WELCOME100</h4>
                  <p className="text-xs text-gray-600">Flat ₹100 off for new customers</p>
                </div>
              </div>
              <p className="text-sm text-gray-700">
                Min. order: ₹500 • Valid till: 15 Jan 2024
              </p>
            </div>
            
            <div className="p-4 rounded-lg bg-gray-50">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 rounded bg-purple-100">
                  <Tag className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">DIWALI25</h4>
                  <p className="text-xs text-gray-600">25% off Diwali collection</p>
                </div>
              </div>
              <p className="text-sm text-gray-700">
                Min. order: ₹2,000 • Max discount: ₹1,000
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OffersCoupons;
