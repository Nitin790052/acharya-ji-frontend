import React, { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  Package,
  Tag,
  IndianRupee,
  Plus,
  Trash2,
  Edit,
  Eye,
  Copy,
  CheckSquare,
  Square,
  Percent,
  Calculator,
  Layers,
  Grid,
  List,
  Download,
  Upload,
  ChevronDown,
  MoreVertical,
  ShoppingBag,
  Sparkles,
  AlertCircle,
  CheckCircle,
  XCircle
} from 'lucide-react';
import image1 from "../../../../../assets/vendor/pujaKits/Satyanarayan Puja Kit.webp"
import image2 from "../../../../../assets/vendor/pujaKits/Navratri Special Kit.webp"
import image3 from "../../../../../assets/vendor/pujaKits/Ganesh Chaturthi Kit.webp"
import image4 from "../../../../../assets/vendor/pujaKits/Diwali Puja Kit.webp"
import image5 from "../../../../../assets/vendor/pujaKits/Daily Puja Basic Kit.webp"
import image6 from "../../../../../assets/vendor/pujaKits/Maha Shivratri Kit.webp"

import VendorPageHeader from '../../../components/VendorPageHeader';

const PujaKits = () => {
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedKits, setSelectedKits] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [kits, setKits] = useState([]);
  const [editingKit, setEditingKit] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    discountPercent: 0,
    category: '',
    isActive: true,
    products: [],
    image: ''
  });

  // Sample Products for Bundles
  const sampleProducts = [
    { id: 'P001', name: 'Premium Diya Set', price: 250, category: 'Decorations', stock: 100, image: '🪔' },
    { id: 'P002', name: 'Pure Cow Ghee', price: 350, category: 'Puja Items', stock: 50, image: '🫙' },
    { id: 'P003', name: 'Natural Agarbatti', price: 150, category: 'Puja Items', stock: 200, image: '🪔' },
    { id: 'P004', name: 'Fresh Coconut', price: 50, category: 'Puja Items', stock: 300, image: '🥥' },
    { id: 'P005', name: 'Sandalwood Paste', price: 200, category: 'Puja Items', stock: 80, image: '🎨' },
    { id: 'P006', name: 'Flower Garland', price: 180, category: 'Decorations', stock: 120, image: '🌸' },
    { id: 'P007', name: 'Camphor Tablets', price: 100, category: 'Puja Items', stock: 150, image: '⚪' },
    { id: 'P008', name: 'Betel Leaves', price: 80, category: 'Puja Items', stock: 90, image: '🍃' },
    { id: 'P009', name: 'Kumkum Powder', price: 120, category: 'Puja Items', stock: 200, image: '🔴' },
    { id: 'P010', name: 'Brass Bell', price: 450, category: 'Utensils', stock: 40, image: '🔔' },
  ];

  // Sample Kits Data
  const kitsData = [
    {
      id: 'KIT-001',
      name: 'Satyanarayan Puja Kit',
      description: 'Complete kit for Satyanarayan Katha with all essential items',
      originalPrice: 1380,
      discountPercent: 15,
      finalPrice: 1173,
      products: ['P001', 'P002', 'P003', 'P004', 'P005'],
      category: 'Satyanarayan',
      isActive: true,
      sales: 42,
      createdAt: '2023-12-01',
      image: image1
    },
    {
      id: 'KIT-002',
      name: 'Navratri Special Kit',
      description: 'Everything needed for 9 days of Navratri worship',
      originalPrice: 2450,
      discountPercent: 20,
      finalPrice: 1960,
      products: ['P001', 'P006', 'P007', 'P009'],
      category: 'Navratri',
      isActive: true,
      sales: 28,
      createdAt: '2023-11-15',
      image: image2
    },
    {
      id: 'KIT-003',
      name: 'Ganesh Chaturthi Kit',
      description: 'Complete puja items for Ganesh worship',
      originalPrice: 1780,
      discountPercent: 10,
      finalPrice: 1602,
      products: ['P001', 'P002', 'P003', 'P008', 'P010'],
      category: 'Ganesh',
      isActive: true,
      sales: 35,
      createdAt: '2023-11-20',
      image: image3
    },
    {
      id: 'KIT-004',
      name: 'Diwali Puja Kit',
      description: 'Traditional Diwali puja items with decoration',
      originalPrice: 1950,
      discountPercent: 25,
      finalPrice: 1463,
      products: ['P001', 'P003', 'P005', 'P006', 'P009'],
      category: 'Diwali',
      isActive: false,
      sales: 18,
      createdAt: '2023-10-25',
      image: image4
    },
    {
      id: 'KIT-005',
      name: 'Daily Puja Basic Kit',
      description: 'Essential items for daily worship',
      originalPrice: 850,
      discountPercent: 5,
      finalPrice: 808,
      products: ['P001', 'P003', 'P009'],
      category: 'General',
      isActive: true,
      sales: 56,
      createdAt: '2023-12-05',
      image: image5
    },
    {
      id: 'KIT-006',
      name: 'Maha Shivratri Kit',
      description: 'Special items for Shivratri fasting and puja',
      originalPrice: 1850,
      discountPercent: 12,
      finalPrice: 1628,
      products: ['P001', 'P003', 'P006', 'P009'],
      category: 'Shiva',
      isActive: true,
      sales: 31,
      createdAt: '2024-01-10',
      image: image6
    },
  ];

  // Categories
  const categories = ['All', 'Satyanarayan', 'Navratri', 'Ganesh', 'Diwali', 'General'];

  // Initialize
  useEffect(() => {
    setKits(kitsData);
    setAllProducts(sampleProducts);
  }, []);

  // Format currency - Indian format
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Calculate kit price
  const calculateKitPrice = (productIds, discountPercent = 0) => {
    const products = allProducts.filter(p => productIds.includes(p.id));
    const total = products.reduce((sum, p) => sum + p.price, 0);
    const discount = total * (discountPercent / 100);
    return {
      original: total,
      discount: discount,
      final: total - discount
    };
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Toggle product selection in form
  const toggleProductSelection = (productId) => {
    setSelectedProducts(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  // Save kit
  const saveKit = () => {
    if (selectedProducts.length === 0) {
      alert('Please select at least one product for the kit');
      return;
    }

    const prices = calculateKitPrice(selectedProducts, formData.discountPercent);

    const kitData = {
      ...formData,
      products: [...selectedProducts],
      originalPrice: prices.original,
      discountPercent: parseFloat(formData.discountPercent),
      finalPrice: prices.final,
      sales: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };

    if (editingKit) {
      // Update existing kit
      setKits(prev => prev.map(k =>
        k.id === editingKit.id ? { ...kitData, id: editingKit.id, sales: editingKit.sales } : k
      ));
      setEditingKit(null);
    } else {
      // Add new kit
      const newKit = {
        ...kitData,
        id: `KIT-${String(kits.length + 1).padStart(3, '0')}`
      };
      setKits(prev => [newKit, ...prev]);
    }

    // Reset form
    setShowCreateForm(false);
    setSelectedProducts([]);
    setFormData({
      name: '',
      description: '',
      discountPercent: 0,
      category: '',
      isActive: true,
      products: [],
      image: ''
    });
  };

  // Edit kit
  const editKit = (kit) => {
    setEditingKit(kit);
    setSelectedProducts(kit.products);
    setFormData({
      name: kit.name,
      description: kit.description,
      discountPercent: kit.discountPercent,
      category: kit.category,
      isActive: kit.isActive,
      products: kit.products,
      image: kit.image
    });
    setShowCreateForm(true);
  };

  // Delete kit
  const deleteKit = (id) => {
    if (window.confirm('Are you sure you want to delete this kit?')) {
      setKits(prev => prev.filter(k => k.id !== id));
    }
  };

  // Duplicate kit
  const duplicateKit = (kit) => {
    const newKit = {
      ...kit,
      id: `KIT-${String(kits.length + 1).padStart(3, '0')}`,
      name: `${kit.name} (Copy)`,
      sales: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setKits(prev => [newKit, ...prev]);
  };

  // Toggle kit activation
  const toggleKitActive = (id) => {
    setKits(prev => prev.map(k =>
      k.id === id ? { ...k, isActive: !k.isActive } : k
    ));
  };

  // Filter kits
  const filteredKits = kits.filter(kit => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        kit.name.toLowerCase().includes(query) ||
        kit.id.toLowerCase().includes(query) ||
        kit.description.toLowerCase().includes(query) ||
        kit.category.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (categoryFilter !== 'all' && kit.category !== categoryFilter) {
      return false;
    }

    return true;
  });

  // Toggle kit selection
  const toggleKitSelection = (kitId) => {
    setSelectedKits(prev =>
      prev.includes(kitId)
        ? prev.filter(id => id !== kitId)
        : [...prev, kitId]
    );
  };

  // Select all kits
  const selectAllKits = () => {
    if (selectedKits.length === filteredKits.length) {
      setSelectedKits([]);
    } else {
      setSelectedKits(filteredKits.map(kit => kit.id));
    }
  };

  // Get status style
  const getStatusStyle = (isActive) => {
    return isActive
      ? 'bg-green-50 text-green-700'
      : 'bg-red-50 text-gray-600';
  };

  // Get category style
  const getCategoryStyle = (category) => {
    const styles = {
      'Satyanarayan': 'bg-blue-50 text-blue-700',
      'Navratri': 'bg-purple-50 text-purple-700',
      'Ganesh': 'bg-orange-50 text-orange-700',
      'Diwali': 'bg-yellow-50 text-yellow-700',
      'General': 'bg-gray-50 text-gray-700',
    };
    return styles[category] || styles.General;
  };

  return (
    <div className="min-h-screen transition-colors duration-200 bg-gray-50/30">
      <VendorPageHeader 
        title="PUJA KITS" 
        subtitle="Increase order value with bundled products" 
      />

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="rounded-lg p-6 flex flex-col items-center gap-3 bg-white">
            <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm text-gray-700">Processing...</p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="p-6">
        {/* Stats Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
          <div className="rounded-lg border p-3 bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Kits</p>
                <p className="text-xl font-semibold mt-1 text-gray-800">
                  {kits.length}
                </p>
              </div>
              <div className="p-2 rounded bg-blue-50">
                <Package className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="rounded-lg border p-3 bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Kits</p>
                <p className="text-xl font-semibold mt-1 text-gray-800">
                  {kits.filter(k => k.isActive).length}
                </p>
              </div>
              <div className="p-2 rounded bg-green-50">
                <CheckCircle className="w-5 h-5 text-green-700" />
              </div>
            </div>
          </div>

          <div className="rounded-lg border p-3 bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Sales</p>
                <p className="text-xl font-semibold mt-1 text-gray-800">
                  {kits.reduce((sum, k) => sum + k.sales, 0)}
                </p>
              </div>
              <div className="p-2 rounded bg-purple-50">
                <ShoppingBag className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="rounded-lg border p-3 bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg. Discount</p>
                <p className="text-xl font-semibold mt-1 text-gray-800">
                  {Math.round(kits.reduce((sum, k) => sum + k.discountPercent, 0) / kits.length)}%
                </p>
              </div>
              <div className="p-2 rounded bg-orange-50">
                <Percent className="w-5 h-5 text-orange-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Create Kit Form */}
        {showCreateForm && (
          <div className="rounded-lg border p-6 mb-6 bg-white border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                {editingKit ? 'Edit Puja Kit' : 'Create New Puja Kit'}
              </h2>
              <button
                onClick={() => {
                  setShowCreateForm(false);
                  setEditingKit(null);
                  setSelectedProducts([]);
                  setFormData({
                    name: '',
                    description: '',
                    discountPercent: 0,
                    category: '',
                    isActive: true,
                    products: [],
                    image: ''
                  });
                }}
                className="p-1.5 hover:bg-gray-100 rounded"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column - Kit Details */}
              <div className="space-y-4">
                {/* Kit Name */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    Kit Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-1 rounded-lg border bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="e.g., Satyanarayan Puja Kit"
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
                    className="w-full px-4 py-1 rounded-lg border bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Describe this kit and its purpose..."
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-1 rounded-lg border bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.slice(1).map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                {/* Discount Percentage */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    Bundle Discount (%)
                  </label>
                  <div className="relative">
                    <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="number"
                      name="discountPercent"
                      value={formData.discountPercent}
                      onChange={handleInputChange}
                      min="0"
                      max="100"
                      className="w-full pl-10 pr-4 py-1.5 rounded-lg border bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="15"
                    />
                  </div>
                  <p className="text-xs mt-1 text-gray-600">
                    Percentage discount applied to total bundle price
                  </p>
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
              </div>

              {/* Right Column - Product Selection */}
              <div className="space-y-4">
                {/* Product Selection Header */}
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-800">
                    Select Products for Bundle
                  </h3>
                  <span className="text-sm text-gray-600">
                    {selectedProducts.length} selected
                  </span>
                </div>

                {/* Search Products */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="pl-10 pr-4 py-1.5 w-full rounded-lg border bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                {/* Products List */}
                <div className="border rounded-lg overflow-hidden border-gray-200">
                  <div className="max-h-64 overflow-y-auto">
                    {allProducts.map(product => (
                      <div
                        key={product.id}
                        className="flex items-center gap-3 p-3 border-b cursor-pointer border-gray-200 hover:bg-gray-50"
                        onClick={() => toggleProductSelection(product.id)}
                      >
                        <div className="flex-shrink-0">
                          {selectedProducts.includes(product.id) ? (
                            <CheckSquare className="w-5 h-5 text-blue-600" />
                          ) : (
                            <Square className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center">
                          <Package className="w-4 h-4 text-orange-500" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-gray-800">
                              {product.name}
                            </span>
                            <span className="font-bold text-gray-800">
                              {formatCurrency(product.price)}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-600">
                              {product.category} • Stock: {product.stock}
                            </span>
                            <span className="text-xs text-gray-600">
                              {product.id}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Calculation */}
                {selectedProducts.length > 0 && (
                  <div className="rounded-lg border p-4 bg-white border-gray-200">
                    <h4 className="font-medium mb-3 text-gray-800">
                      Price Calculation
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">
                          Original Price:
                        </span>
                        <span className="font-medium text-gray-800">
                          {formatCurrency(calculateKitPrice(selectedProducts).original)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">
                          Discount ({formData.discountPercent}%):
                        </span>
                        <span className="font-medium text-green-600">
                          -{formatCurrency(calculateKitPrice(selectedProducts, formData.discountPercent).discount)}
                        </span>
                      </div>
                      <hr className="border-gray-200" />
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-800">
                          Final Bundle Price:
                        </span>
                        <span className="text-lg font-bold text-gray-800">
                          {formatCurrency(calculateKitPrice(selectedProducts, formData.discountPercent).final)}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs mt-3 text-gray-600">
                      Customers save {formatCurrency(calculateKitPrice(selectedProducts, formData.discountPercent).discount)} on this bundle!
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-200">
              <button
                onClick={() => {
                  setShowCreateForm(false);
                  setEditingKit(null);
                  setSelectedProducts([]);
                  setFormData({
                    name: '',
                    description: '',
                    discountPercent: 0,
                    category: '',
                    isActive: true,
                    products: [],
                    image: ''
                  });
                }}
                className="px-4 py-1 rounded-lg border border-gray-300 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={saveKit}
                disabled={selectedProducts.length === 0 || !formData.name || !formData.category}
                className={`px-4 py-1 rounded-lg ${selectedProducts.length === 0 || !formData.name || !formData.category ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700'}`}
              >
                {editingKit ? 'Update Kit' : 'Create Kit'}
              </button>
            </div>
          </div>
        )}

        {/* Controls Bar */}
        <div className="rounded-lg border px-4 py-3 mb-4 bg-white border-gray-200">
          <div className="flex flex-col lg:flex-row gap-4 text-sm">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search kits by name, category, description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-1.5 w-full rounded-lg border bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            {/* Filters and Actions */}
            <div className="flex flex-col sm:flex-row gap-2">
              {/* Category Filter */}
              <div className="relative">
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="appearance-none pl-10 pr-8 py-1.5 rounded-lg border bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="all">All Categories</option>
                  {categories.slice(1).map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <Layers className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>

              {/* View Toggle */}
              <div className="flex rounded-lg border overflow-hidden border-gray-300">
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-gray-100' : ''}`}
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-gray-100' : ''}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bulk Actions Bar */}
        {selectedKits.length > 0 && (
          <div className="rounded-lg border p-3 mb-4 bg-white border-gray-200">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded bg-blue-50">
                  <CheckSquare className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {selectedKits.length} kits selected
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
                    setKits(prev => prev.map(k =>
                      selectedKits.includes(k.id) ? { ...k, isActive: true } : k
                    ));
                    setSelectedKits([]);
                  }}
                  className="px-3 py-1.5 text-sm rounded border bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                >
                  Activate Selected
                </button>
                <button
                  onClick={() => {
                    // Bulk deactivate
                    setKits(prev => prev.map(k =>
                      selectedKits.includes(k.id) ? { ...k, isActive: false } : k
                    ));
                    setSelectedKits([]);
                  }}
                  className="px-3 py-1.5 text-sm rounded border bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                >
                  Deactivate Selected
                </button>
                <button
                  onClick={() => {
                    if (window.confirm(`Delete ${selectedKits.length} selected kits?`)) {
                      setKits(prev => prev.filter(k => !selectedKits.includes(k.id)));
                      setSelectedKits([]);
                    }
                  }}
                  className="px-3 py-1.5 text-sm rounded border bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
                >
                  Delete Selected
                </button>
                <button
                  onClick={() => setSelectedKits([])}
                  className="px-3 py-1.5 text-sm rounded border border-gray-300 hover:bg-gray-100"
                >
                  Clear Selection
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={() => setShowCreateForm(true)}
            className="px-4 py-1.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Create New Kit
          </button>
          <button
            onClick={() => {
              // Export kits
              const headers = ['ID', 'Name', 'Category', 'Original Price', 'Discount %', 'Final Price', 'Products', 'Sales', 'Status'];
              const csvContent = [
                headers.join(','),
                ...kits.map(kit => [
                  kit.id,
                  kit.name,
                  kit.category,
                  kit.originalPrice,
                  kit.discountPercent,
                  kit.finalPrice,
                  kit.products.length,
                  kit.sales,
                  kit.isActive ? 'Active' : 'Inactive'
                ].join(','))
              ].join('\n');

              const blob = new Blob([csvContent], { type: 'text/csv' });
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `puja-kits-${new Date().toISOString().split('T')[0]}.csv`;
              a.click();
            }}
            className="px-4 py-1 rounded-lg border border-gray-300 hover:bg-gray-100 flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export Kits
          </button>
        </div>

        {/* Kits Display */}
        {viewMode === 'list' ? (
          /* List View */
          <div className="rounded-lg border overflow-hidden bg-white border-gray-200">
            <div className="rounded-lg border bg-white overflow-hidden">

              {/* 🔥 mobile horizontal scroll */}
              <div className="overflow-x-auto">

                <table className="min-w-[900px] w-full text-[15px]">

                  {/* ================= HEADER ================= */}
                  <thead className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 border-b sticky top-0 z-10">

                    <tr className="text-gray-600 text-xs uppercase tracking-wide">

                      <th className="px-4 py-3">
                        <button onClick={selectAllKits}>
                          {selectedKits.length === filteredKits.length && filteredKits.length > 0 ? (
                            <CheckSquare className="w-4 h-4 text-blue-600" />
                          ) : (
                            <Square className="w-4 h-4 text-gray-400" />
                          )}
                        </button>
                      </th>

                      <th className="px-4 py-3 text-left">Kit Details</th>
                      <th className="px-4 py-3">Category</th>
                      <th className="px-4 py-3">Pricing</th>
                      <th className="px-4 py-3">Products</th>
                      <th className="px-4 py-3">Sales</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3 text-center">Actions</th>

                    </tr>
                  </thead>


                  {/* ================= BODY ================= */}
                  <tbody>

                    {filteredKits.map((kit, i) => (
                      <tr
                        key={kit.id}
                        className={`
              border-t
              hover:bg-gray-50
              transition
              ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/40'}
            `}
                      >

                        {/* SELECT */}
                        <td className="px-4 py-3">
                          <button onClick={() => toggleKitSelection(kit.id)}>
                            {selectedKits.includes(kit.id) ? (
                              <CheckSquare className="w-4 h-4 text-blue-600" />
                            ) : (
                              <Square className="w-4 h-4 text-gray-400" />
                            )}
                          </button>
                        </td>


                        {/* KIT DETAILS */}
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">

                            {/* slightly bigger image */}
                            <div className="w-16 h-16 rounded-md bg-white border overflow-hidden flex-shrink-0">
                              <img
                                src={kit.image}
                                alt={kit.name}
                                className="w-full h-full object-contain p-1"
                              />
                            </div>

                            <div>
                              <p className="font-medium text-gray-800">
                                {kit.name}
                              </p>
                              <p className="text-xs text-gray-500">{kit.id}</p>
                            </div>

                          </div>
                        </td>


                        {/* CATEGORY */}
                        <td className="px-4 py-3">
                          <span className={`px-3 py-1 rounded-full text-xs ${getCategoryStyle(kit.category)}`}>
                            {kit.category}
                          </span>
                        </td>


                        {/* PRICING */}
                        <td className="px-4 py-3">
                          <div className="leading-tight">
                            <span className="line-through text-xs text-gray-400 mr-1">
                              {formatCurrency(kit.originalPrice)}
                            </span>
                            <span className="text-xs text-red-500">
                              -{kit.discountPercent}%
                            </span>

                            <div className="font-semibold text-gray-900">
                              {formatCurrency(kit.finalPrice)}
                            </div>
                          </div>
                        </td>


                        {/* PRODUCTS */}
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            <span>{kit.products.length}</span>
                            <Eye className="w-4 h-4 text-gray-400" />
                          </div>
                        </td>


                        {/* SALES */}
                        <td className="px-4 py-3 font-medium">
                          {kit.sales}
                        </td>


                        {/* STATUS */}
                        <td className="px-4 py-3">
                          <span className={`px-3 py-1 rounded-full text-xs ${getStatusStyle(kit.isActive)}`}>
                            {kit.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>


                        {/* ACTIONS */}
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-center gap-2">

                            <button className="p-1.5 hover:bg-gray-200 rounded" onClick={() => editKit(kit)}>
                              <Edit className="w-4 h-4 " color='blue' />
                            </button>

                            <button className="p-1.5 hover:bg-gray-200 rounded" onClick={() => duplicateKit(kit)}>
                              <Copy className="w-4 h-4 " color='orange' />
                            </button>

                            <button className="p-1.5 hover:bg-gray-200 rounded" onClick={() => toggleKitActive(kit.id)}>
                              {kit.isActive
                                ? <XCircle className="w-4 h-4 " color='red' />
                                : <CheckCircle className="w-4 h-4 " color='green' />}
                            </button>

                            <button className="p-1.5 hover:bg-gray-200 rounded" onClick={() => deleteKit(kit.id)}>
                              <Trash2 className="w-4 h-4 " color='red' />
                            </button>

                          </div>
                        </td>

                      </tr>
                    ))}

                  </tbody>
                </table>

              </div>
            </div>


            {/* Empty State */}
            {filteredKits.length === 0 && (
              <div className="p-8 text-center">
                <div className="p-4 rounded-full inline-flex items-center justify-center mb-4 bg-gray-100">
                  <Package className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium mb-2 text-gray-800">
                  No kits found
                </h3>
                <p className="text-sm text-gray-600">
                  {searchQuery ? 'Try a different search term' : 'Click "Create New Kit" to get started'}
                </p>
                <button
                  onClick={() => setShowCreateForm(true)}
                  className="mt-4 px-4 py-1.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700"
                >
                  Create Your First Kit
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Grid View */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredKits.map(kit => (
              <div
                key={kit.id}
                className="
        rounded-2xl
        border border-gray-200
        bg-white
        overflow-hidden
        shadow-sm
        hover:shadow-lg
        transition-all duration-300
      "
              >
                <div className="relative">

                  {/* Header */}
                  <div className="p-4"> {/* ↓ reduced */}
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2"> {/* ↓ gap */}

                        <div className="w-20 h-20 rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden">
                          <img
                            src={kit.image}
                            alt=""
                            className="w-full h-full object-cover rounded-xl"
                          />
                        </div>

                        <div>
                          <h3 className="font-semibold text-gray-900 text-sm"> {/* ↓ */}
                            {kit.name}
                          </h3>
                          <span className="text-[11px] text-gray-500">
                            {kit.id}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => toggleKitSelection(kit.id)}
                        className="z-10"
                      >
                        {selectedKits.includes(kit.id) ? (
                          <CheckSquare className="w-5 h-5 text-blue-600" />
                        ) : (
                          <Square className="w-5 h-5 text-gray-400" />
                        )}
                      </button>
                    </div>

                    <p className="text-xs mb-2 text-gray-600 leading-snug"> {/* ↓ */}
                      {kit.description.length > 100
                        ? `${kit.description.substring(0, 100)}...`
                        : kit.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${getCategoryStyle(kit.category)}`}>
                        {kit.category}
                      </span>

                      <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${getStatusStyle(kit.isActive)}`}>
                        {kit.isActive ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="px-4 py-3 bg-orange-50 border-t border-orange-100"> {/* ↓ */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="line-through text-xs text-gray-400">
                            {formatCurrency(kit.originalPrice)}
                          </span>
                          <span className="px-2 py-0.5 rounded text-[11px] bg-red-100 text-red-600">
                            -{kit.discountPercent}%
                          </span>
                        </div>

                        <div className="font-bold text-lg text-gray-900"> {/* ↓ */}
                          {formatCurrency(kit.finalPrice)}
                        </div>
                      </div>

                      <div className="text-right text-xs text-gray-600">
                        <div className="flex items-center gap-1 justify-end">
                          <ShoppingBag className="w-3.5 h-3.5" />
                          {kit.sales}
                        </div>
                        <div>{kit.products.length} items</div>
                      </div>
                    </div>
                  </div>

                  {/* Products */}
                  <div className="p-4"> {/* ↓ */}
                    <h4 className="text-xs font-medium mb-1 text-gray-600">
                      Includes:
                    </h4>

                    <div className="flex flex-wrap gap-1"> {/* ↓ */}
                      {kit.products.slice(0, 4).map(pid => {
                        const product = allProducts.find(p => p.id === pid);

                        return product ? (
                          <span
                            key={pid}
                            className="px-2 py-0.5 rounded-md text-[11px] bg-gray-100 text-gray-600"
                            title={product.name}
                          >
                            {product.name.substring(0, 10)}...
                          </span>
                        ) : null;
                      })}

                      {kit.products.length > 4 && (
                        <span className="px-2 py-0.5 rounded-md text-[11px] bg-gray-100 text-gray-600">
                          +{kit.products.length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="p-3 border-t border-gray-200 bg-gray-50"> {/* ↓ */}
                    <div className="flex items-center justify-between">

                      <div className="flex items-center gap-1">
                        <button onClick={() => editKit(kit)} className="p-1.5 rounded hover:bg-blue-100">
                          <Edit className="w-4 h-4 text-blue-600" />
                        </button>

                        <button onClick={() => duplicateKit(kit)} className="p-1.5 rounded hover:bg-yellow-100">
                          <Copy className="w-4 h-4 text-yellow-600" />
                        </button>
                      </div>

                      <div className="flex items-center gap-1">
                        <button onClick={() => toggleKitActive(kit.id)} className="p-1.5 rounded hover:bg-green-100">
                          {kit.isActive ? (
                            <XCircle className="w-4 h-4 text-red-600" />
                          ) : (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          )}
                        </button>

                        <button onClick={() => deleteKit(kit.id)} className="p-1.5 rounded hover:bg-red-100">
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>

                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>

        )}

        {/* Empty State for Grid View */}
        {viewMode === 'grid' && filteredKits.length === 0 && (
          <div className="rounded-lg border p-8 text-center bg-white border-gray-200">
            <div className="p-4 rounded-full inline-flex items-center justify-center mb-4 bg-gray-100">
              <Package className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium mb-2 text-gray-800">
              No kits found
            </h3>
            <p className="text-sm text-gray-600">
              {searchQuery ? 'Try a different search term' : 'Click "Create New Kit" to get started'}
            </p>
            <button
              onClick={() => setShowCreateForm(true)}
              className="mt-4 px-4 py-1.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700"
            >
              Create Your First Kit
            </button>
          </div>
        )}

        {/* Example Kits Section */}
        <div className="rounded-lg border p-4 mt-6 bg-white border-gray-200">
          <h3 className="text-base font-semibold mb-3 text-gray-800 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-orange-500" /> Example Kit Ideas
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">

            {/* Card 1 */}
            <div className="p-3 rounded-xl bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 shadow-sm hover:shadow-md transition">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-9 h-9 overflow-hidden rounded-md"> {/* ↓ */}
                  <img src={image1} alt="" className="w-full h-full object-cover" />
                </div>
                <h4 className="font-medium text-sm text-gray-800">
                  Satyanarayan Kit
                </h4>
              </div>

              <p className="text-xs mb-2 text-gray-700 leading-snug">
                Diya + Ghee + Agarbatti + Coconut + Sandalwood
              </p>

              <div className="text-[11px] text-gray-500">
                Original: ₹1,150 • Bundle: ₹978 (15% off)
              </div>
            </div>


            {/* Card 2 */}
            <div className="p-3 rounded-xl bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 shadow-sm hover:shadow-md transition">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-9 h-9 overflow-hidden rounded-md">
                  <img src={image6} alt="" className="w-full h-full object-cover" />
                </div>
                <h4 className="font-medium text-sm text-gray-800">
                  Navratri Special
                </h4>
              </div>

              <p className="text-xs mb-2 text-gray-700 leading-snug">
                Diya Set + Flowers + Camphor + Kumkum + Bell
              </p>

              <div className="text-[11px] text-gray-500">
                Original: ₹1,200 • Bundle: ₹960 (20% off)
              </div>
            </div>


            {/* Card 3 */}
            <div className="p-3 rounded-xl bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 shadow-sm hover:shadow-md transition">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-9 h-9 overflow-hidden rounded-md">
                  <img src={image4} alt="" className="w-full h-full object-cover" />
                </div>
                <h4 className="font-medium text-sm text-gray-800">
                  Diwali Ultimate
                </h4>
              </div>

              <p className="text-xs mb-2 text-gray-700 leading-snug">
                Premium Diyas + Rangoli + Candles + Sweets Box
              </p>

              <div className="text-[11px] text-gray-500">
                Original: ₹2,500 • Bundle: ₹1,875 (25% off)
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default PujaKits;
