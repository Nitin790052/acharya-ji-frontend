import React, { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  Download,
  Upload,
  Plus,
  Eye,
  Edit,
  Trash2,
  Copy,
  Grid,
  List,
  Package,
  Tag,
  IndianRupee,
  Scale,
  Layers,
  Hash,
  FileText,
  CheckCircle,
  XCircle,
  MoreVertical,
  ChevronDown,
  Image as ImageIcon,
  AlertCircle,
  CheckSquare,
  Square
} from 'lucide-react';
import image1 from "../../../../../assets/vendor/sellerDashboard/Satyanarayan Puja.webp"
import image2 from "../../../../../assets/vendor/sellerDashboard/Navratri Special Diya Set.webp"
import image3 from "../../../../../assets/vendor/sellerDashboard/Premium Incense Sticks.webp"
import image4 from "../../../../../assets/vendor/sellerDashboard/Ganesh Idol (Silver Finish).webp"
import image5 from "../../../../../assets/vendor/sellerDashboard/Rudraksha Mala.webp"
import image6 from "../../../../../assets/vendor/sellerDashboard/Pooja Thali Set.webp"
import image7 from "../../../../../assets/vendor/sellerDashboard/Havan Samagri Pack.webp"
import image8 from "../../../../../assets/vendor/sellerDashboard/Brass Oil Lamp.webp"


import VendorPageHeader from '../../../components/VendorPageHeader';

const Products = () => {
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [stockFilter, setStockFilter] = useState('all');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showBulkUpload, setShowBulkUpload] = useState(false);
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    weight: '',
    category: '',
    stock: '',
    description: '',
    pujaType: '',
    images: [],
    isActive: true
  });

  // Sample Products Data
  const productsData = [
    {
      id: 'PROD-001',
      name: 'Satyanarayan Puja Kit',
      price: 1250,
      weight: '2.5 kg',
      category: 'Puja Kits',
      stock: 42,
      description: 'Complete puja kit for Satyanarayan Puja',
      pujaType: 'Satyanarayan',
      image: image1,
      isActive: true,
      createdAt: '2023-12-01'
    },
    {
      id: 'PROD-002',
      name: 'Navratri Special Diya Set',
      price: 850,
      weight: '1.2 kg',
      category: 'Decorations',
      stock: 28,
      description: 'Handcrafted diya set for Navratri celebrations',
      pujaType: 'Navratri',
      image: image2,
      isActive: true,
      createdAt: '2023-12-05'
    },
    {
      id: 'PROD-003',
      name: 'Premium Incense Sticks',
      price: 350,
      weight: '200 g',
      category: 'Puja Items',
      stock: 5,
      description: 'Natural fragrant incense sticks',
      pujaType: 'General',
      image: image3,
      isActive: true,
      createdAt: '2023-11-28'
    },
    {
      id: 'PROD-004',
      name: 'Ganesh Idol (Silver Finish)',
      price: 4200,
      weight: '3.5 kg',
      category: 'Idols',
      stock: 12,
      description: 'Beautiful Ganesh idol for home temple',
      pujaType: 'Ganesh Chaturthi',
      image: image4,
      isActive: false,
      createdAt: '2023-11-20'
    },
    {
      id: 'PROD-005',
      name: 'Rudraksha Mala',
      price: 1899,
      weight: '150 g',
      category: 'Accessories',
      stock: 35,
      description: 'Genuine rudraksha beads mala',
      pujaType: 'General',
      image: image5,
      isActive: true,
      createdAt: '2023-12-10'
    },
    {
      id: 'PROD-006',
      name: 'Pooja Thali Set',
      price: 950,
      weight: '1.8 kg',
      category: 'Utensils',
      stock: 0,
      description: 'Complete pooja thali with accessories',
      pujaType: 'General',
      image: image6,
      isActive: true,
      createdAt: '2023-12-08'
    },
    {
      id: 'PROD-007',
      name: 'Havan Samagri Pack',
      price: 1650,
      weight: '4.2 kg',
      category: 'Puja Kits',
      stock: 18,
      description: 'Complete havan samagri for rituals',
      pujaType: 'Havan',
      image: image7,
      isActive: true,
      createdAt: '2023-12-12'
    },
    {
      id: 'PROD-008',
      name: 'Brass Oil Lamp',
      price: 650,
      weight: '800 g',
      category: 'Utensils',
      stock: 25,
      description: 'Traditional brass oil lamp',
      pujaType: 'Diwali',
      image: image8,
      isActive: true,
      createdAt: '2023-12-03'
    },
  ];

  // Categories
  const categories = ['All', 'Puja Kits', 'Decorations', 'Puja Items', 'Idols', 'Accessories', 'Utensils'];

  // Puja Types
  const pujaTypes = ['Satyanarayan', 'Navratri', 'Ganesh Chaturthi', 'Diwali', 'Havan', 'General'];

  // Initialize
  useEffect(() => {
    setProducts(productsData);
  }, []);

  // Format currency - Indian format
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Filter products
  const filteredProducts = products.filter(product => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        product.name.toLowerCase().includes(query) ||
        product.id.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.pujaType.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (categoryFilter !== 'all' && product.category !== categoryFilter) {
      return false;
    }

    // Stock filter
    if (stockFilter === 'in-stock' && product.stock <= 0) {
      return false;
    }
    if (stockFilter === 'out-of-stock' && product.stock > 0) {
      return false;
    }
    if (stockFilter === 'low-stock' && (product.stock > 10 || product.stock <= 0)) {
      return false;
    }

    return true;
  });

  // Handle actions
  const handleAction = (action, productId = null) => {
    const actions = {
      addProduct: () => {
        if (editingProduct) {
          // Update existing product
          setProducts(prev => prev.map(p =>
            p.id === editingProduct.id ? { ...formData, id: editingProduct.id } : p
          ));
          setEditingProduct(null);
        } else {
          // Add new product
          const newProduct = {
            ...formData,
            id: `PROD-${String(products.length + 1).padStart(3, '0')}`,
            createdAt: new Date().toISOString().split('T')[0]
          };
          setProducts(prev => [newProduct, ...prev]);
        }
        setShowAddForm(false);
        setFormData({
          name: '',
          price: '',
          weight: '',
          category: '',
          stock: '',
          description: '',
          pujaType: '',
          images: [],
          isActive: true
        });
      },
      editProduct: (id) => {
        const product = products.find(p => p.id === id);
        if (product) {
          setEditingProduct(product);
          setFormData({
            name: product.name,
            price: product.price,
            weight: product.weight,
            category: product.category,
            stock: product.stock,
            description: product.description,
            pujaType: product.pujaType,
            images: [],
            isActive: product.isActive
          });
          setShowAddForm(true);
        }
      },
      deleteProduct: (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
          setProducts(prev => prev.filter(p => p.id !== id));
        }
      },
      duplicateProduct: (id) => {
        const product = products.find(p => p.id === id);
        if (product) {
          const duplicatedProduct = {
            ...product,
            id: `PROD-${String(products.length + 1).padStart(3, '0')}`,
            name: `${product.name} (Copy)`,
            createdAt: new Date().toISOString().split('T')[0]
          };
          setProducts(prev => [duplicatedProduct, ...prev]);
        }
      },
      toggleActive: (id) => {
        setProducts(prev => prev.map(p =>
          p.id === id ? { ...p, isActive: !p.isActive } : p
        ));
      },
      exportCSV: () => {
        const headers = ['ID', 'Name', 'Price', 'Weight', 'Category', 'Stock', 'Puja Type', 'Status'];
        const csvContent = [
          headers.join(','),
          ...products.map(product => [
            product.id,
            product.name,
            product.price,
            product.weight,
            product.category,
            product.stock,
            product.pujaType,
            product.isActive ? 'Active' : 'Inactive'
          ].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `products-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
      },
      bulkUpload: (file) => {
        // Simulate CSV upload
        console.log('Uploading CSV file:', file);
        // In real app, you would parse CSV and add products
        setTimeout(() => {
          setShowBulkUpload(false);
          alert('Products uploaded successfully!');
        }, 1500);
      },
      selectAll: () => {
        if (selectedProducts.length === filteredProducts.length) {
          setSelectedProducts([]);
        } else {
          setSelectedProducts(filteredProducts.map(product => product.id));
        }
      },
      bulkDelete: () => {
        if (window.confirm(`Delete ${selectedProducts.length} selected products?`)) {
          setProducts(prev => prev.filter(p => !selectedProducts.includes(p.id)));
          setSelectedProducts([]);
        }
      },
      bulkActivate: () => {
        setProducts(prev => prev.map(p =>
          selectedProducts.includes(p.id) ? { ...p, isActive: true } : p
        ));
        setSelectedProducts([]);
      },
      bulkDeactivate: () => {
        setProducts(prev => prev.map(p =>
          selectedProducts.includes(p.id) ? { ...p, isActive: false } : p
        ));
        setSelectedProducts([]);
      }
    };

    if (actions[action]) {
      if (productId !== null) {
        actions[action](productId);
      } else if (action === 'bulkUpload') {
        const file = arguments[1];
        actions[action](file);
      } else {
        actions[action]();
      }
    }
  };

  // Toggle product selection
  const toggleProductSelection = (productId) => {
    setSelectedProducts(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  // Handle CSV file upload
  const handleCSVUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleAction('bulkUpload', file);
    }
  };

  // Get stock status style
  const getStockStatusStyle = (stock) => {
    if (stock <= 0) {
      return 'bg-red-50 text-red-700';
    } else if (stock <= 10) {
      return 'bg-orange-50 text-orange-500';
    } else {
      return 'bg-green-50 text-green-700';
    }
  };

  // Get status style
  const getStatusStyle = (isActive) => {
    return isActive
      ? 'bg-green-50 text-green-700'
      : 'bg-gray-50 text-gray-600';
  };

  return (
    <div className="min-h-screen bg-gray-50/30">
      <VendorPageHeader 
        title="PRODUCTS MANAGEMENT" 
        subtitle="Add and manage your puja items" 
      />

      {/* Main Content */}
      <div className="p-6">
        {/* Stats Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
          <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg border border-gray-200 p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Products</p>
                <p className="text-xl font-semibold mt-1 text-gray-800">
                  {products.length}
                </p>
              </div>
              <div className="p-2 rounded bg-blue-50">
                <Package className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg border border-gray-200 p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Products</p>
                <p className="text-xl font-semibold mt-1 text-gray-800">
                  {products.filter(p => p.isActive).length}
                </p>
              </div>
              <div className="p-2 rounded bg-green-50">
                <CheckCircle className="w-5 h-5 text-green-700" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg border border-gray-200 p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Out of Stock</p>
                <p className="text-xl font-semibold mt-1 text-gray-800">
                  {products.filter(p => p.stock <= 0).length}
                </p>
              </div>
              <div className="p-2 rounded bg-red-50">
                <AlertCircle className="w-5 h-5 text-red-500" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg border border-gray-200 p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Value</p>
                <p className="text-xl font-semibold mt-1 text-gray-800">
                  {formatCurrency(products.reduce((sum, p) => sum + (p.price * p.stock), 0))}
                </p>
              </div>
              <div className="p-2 rounded bg-purple-50">
                <IndianRupee className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Bulk Actions Bar */}
        {selectedProducts.length > 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-3 mb-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded bg-blue-50">
                  <CheckSquare className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {selectedProducts.length} products selected
                  </p>
                  <p className="text-xs text-gray-600">
                    Click to select/deselect all
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleAction('bulkActivate')}
                  className="px-3 py-1.5 text-sm rounded border bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                >
                  Activate Selected
                </button>
                <button
                  onClick={() => handleAction('bulkDeactivate')}
                  className="px-3 py-1.5 text-sm rounded border bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                >
                  Deactivate Selected
                </button>
                <button
                  onClick={() => handleAction('bulkDelete')}
                  className="px-3 py-1.5 text-sm rounded border bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
                >
                  Delete Selected
                </button>
                <button
                  onClick={() => setSelectedProducts([])}
                  className="px-3 py-1.5 text-sm rounded border border-gray-300 hover:bg-gray-100"
                >
                  Clear Selection
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Product Form */}
        {showAddForm && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button
                onClick={() => {
                  setShowAddForm(false);
                  setEditingProduct(null);
                  setFormData({
                    name: '',
                    price: '',
                    weight: '',
                    category: '',
                    stock: '',
                    description: '',
                    pujaType: '',
                    images: [],
                    isActive: true
                  });
                }}
                className="p-1.5 hover:bg-gray-100 rounded"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                {/* Product Name */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-1.5 rounded-lg border bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="e.g., Satyanarayan Puja Kit"
                    required
                  />
                </div>

                {/* Price */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    Price (INR) *
                  </label>
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-1.5 rounded-lg border bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="1250"
                      required
                    />
                  </div>
                </div>

                {/* Weight */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    Weight
                  </label>
                  <div className="relative">
                    <Scale className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      name="weight"
                      value={formData.weight}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-1.5 rounded-lg border bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="e.g., 2.5 kg"
                    />
                  </div>
                </div>

                {/* Stock */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    Stock Quantity *
                  </label>
                  <div className="relative">
                    <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-1.5 rounded-lg border bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="42"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                {/* Category */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-1.5 rounded-lg border bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.slice(1).map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                {/* Puja Type */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    Puja Type
                  </label>
                  <select
                    name="pujaType"
                    value={formData.pujaType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-1.5 rounded-lg border bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="">Select Puja Type</option>
                    {pujaTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                {/* Active/Inactive Toggle */}
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
                    className="w-full px-4 py-1.5 rounded-lg border bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Product description..."
                  />
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-200">
              <button
                onClick={() => {
                  setShowAddForm(false);
                  setEditingProduct(null);
                  setFormData({
                    name: '',
                    price: '',
                    weight: '',
                    category: '',
                    stock: '',
                    description: '',
                    pujaType: '',
                    images: [],
                    isActive: true
                  });
                }}
                className="px-4 py-1 rounded-lg border border-gray-300 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={() => handleAction('addProduct')}
                className="px-4 py-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700"
              >
                {editingProduct ? 'Update Product' : 'Add Product'}
              </button>
            </div>
          </div>
        )}

        {/* Bulk Upload Modal */}
        {showBulkUpload && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-800">
                  Bulk Upload Products
                </h3>
                <button
                  onClick={() => setShowBulkUpload(false)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-lg border-2 border-dashed border-gray-300">
                  <div className="text-center">
                    <Upload className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                    <p className="text-sm mb-2 text-gray-700">
                      Upload CSV file with product data
                    </p>
                    <p className="text-xs text-gray-600">
                      CSV format: Name,Price,Weight,Category,Stock,PujaType,Description
                    </p>
                  </div>
                </div>

                <input
                  type="file"
                  accept=".csv"
                  onChange={handleCSVUpload}
                  className="w-full"
                />

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    onClick={() => setShowBulkUpload(false)}
                    className="px-4 py-1 rounded-lg border border-gray-300 hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => document.querySelector('input[type="file"]').click()}
                    className="px-4 py-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700"
                  >
                    Upload CSV
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Controls Bar */}
        <div className="bg-white rounded-lg border border-gray-200 px-4 p-4 mb-4">
          <div className="flex flex-col lg:flex-row gap-4 text-sm">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products by name, ID, description..."
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

              {/* Stock Filter */}
              <div className="relative">
                <select
                  value={stockFilter}
                  onChange={(e) => setStockFilter(e.target.value)}
                  className="appearance-none pl-10 pr-8 py-1.5 rounded-lg border bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="all">All Stock</option>
                  <option value="in-stock">In Stock</option>
                  <option value="out-of-stock">Out of Stock</option>
                  <option value="low-stock">Low Stock (≤10)</option>
                </select>
                <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>

              {/* View Toggle */}
              <div className="flex rounded-lg border overflow-hidden border-gray-300">
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-2  ${viewMode === 'list' ? 'bg-gray-100' : ''}`}
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-2  ${viewMode === 'grid' ? 'bg-gray-100' : ''}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 mb-4 text-sm">
          <button
            onClick={() => setShowAddForm(true)}
            className="px-4 py-1.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Product
          </button>
          <button
            onClick={() => setShowBulkUpload(true)}
            className="px-4 py-1.5 rounded-lg border border-gray-300 hover:bg-gray-100 flex items-center gap-2"
          >
            <Upload className="w-4 h-4" />
            Bulk Upload
          </button>
          <button
            onClick={() => handleAction('exportCSV')}
            className="px-4 py-1.5 rounded-lg border border-gray-300 hover:bg-gray-100 flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>

        {/* Products Display */}
        {viewMode === 'list' ? (
          /* List View */
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm border-gray-200 bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40">
                    <th className="p-4">
                      <button
                        onClick={() => handleAction('selectAll')}
                        className="flex items-center gap-2"
                      >
                        {selectedProducts.length === filteredProducts.length && filteredProducts.length > 0 ? (
                          <CheckSquare className="w-4 h-4 text-blue-600" />
                        ) : (
                          <Square className="w-4 h-4 text-gray-400" />
                        )}
                      </button>
                    </th>
                    <th className="p-4 pl-5">
                      <span className="font-medium text-gray-700 text-sm">Product</span>
                    </th>
                    <th className="p-4">
                      <span className="font-medium text-gray-700 text-sm">Category</span>
                    </th>
                    <th className="p-4">
                      <span className="font-medium text-gray-700 text-sm">Price</span>
                    </th>
                    <th className="p-4 pl-6">
                      <span className="font-medium text-gray-700 text-sm">Stock</span>
                    </th>
                    <th className="p-4">
                      <span className="font-medium text-gray-700 text-sm">Status</span>
                    </th>
                    <th className="p-4 pl-12">
                      <span className="font-medium text-gray-700 text-sm">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map(product => (
                    <tr
                      key={product.id}
                      className="border-t border-gray-200 hover:bg-gray-50"
                    >
                      <td className="px-4 py-2.5">
                        <button
                          onClick={() => toggleProductSelection(product.id)}
                          className="flex items-center"
                        >
                          {selectedProducts.includes(product.id) ? (
                            <CheckSquare className="w-4 h-4 text-blue-600" />
                          ) : (
                            <Square className="w-4 h-4 text-gray-400" />
                          )}
                        </button>
                      </td>
                      <td className="px-4 py-2.5">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                            {product.image ? (
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-fill"
                              />
                            ) : (
                              <ImageIcon className="w-full h-full p-2 text-gray-400" />
                            )}
                          </div>
                          <div>
                            <span className="font-medium block text-gray-800">
                              {product.name}
                            </span>
                            <span className="text-xs text-gray-600">
                              {product.id} • {product.pujaType}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-2.5">
                        <span className="text-gray-700 text-sm">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-4 py-2.5">
                        <span className="font-bold text-gray-800 text-[15px]">
                          {formatCurrency(product.price)}
                        </span>
                        <p className="text-xs text-gray-600">
                          {product.weight}
                        </p>
                      </td>
                      <td className="px-4 py-2.5">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStockStatusStyle(product.stock)}`}>
                          {product.stock} units
                        </span>
                      </td>
                      <td className="px-4 py-2.5">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusStyle(product.isActive)}`}>
                          {product.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-4 py-2.5">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleAction('editProduct', product.id)}
                            className="p-1.5 rounded  hover:bg-yellow-200 "
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" color='blue' />
                          </button>
                          <button
                            onClick={() => handleAction('duplicateProduct', product.id)}
                            className="p-1.5 rounded  hover:bg-yellow-200 "
                            title="Duplicate"
                          >
                            <Copy className="w-4 h-4" color='orange' />
                          </button>
                          <button
                            onClick={() => handleAction('toggleActive', product.id)}
                            className="p-1.5 rounded  hover:bg-yellow-200 "
                            title={product.isActive ? 'Deactivate' : 'Activate'}
                          >
                            {product.isActive ? (
                              <XCircle className="w-4 h-4 " color='red' />
                            ) : (
                              <CheckCircle className="w-4 h-4" color='green' />
                            )}
                          </button>
                          <button
                            onClick={() => handleAction('deleteProduct', product.id)}
                            className="p-1.5 rounded  hover:bg-yellow-200 "
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4 " color='red' />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Empty State */}
            {filteredProducts.length === 0 && (
              <div className="p-8 text-center">
                <div className="p-4 rounded-full inline-flex items-center justify-center mb-4 bg-gray-100">
                  <Package className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium mb-2 text-gray-800">
                  No products found
                </h3>
                <p className="text-sm text-gray-600">
                  {searchQuery ? 'Try a different search term' : 'Click "Add Product" to get started'}
                </p>
              </div>
            )}
          </div>
        ) : (
          /* Grid View */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {filteredProducts.map(product => (
              <div
                key={product.id}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200"
              >
                {/* Product Image - Mobile pe uper, full width */}
                <div className="relative h-48 md:h-40 bg-gradient-to-br from-gray-50 to-gray-100">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-fill"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package className="w-10 h-10 text-gray-400" />
                    </div>
                  )}
                  {/* Selection Checkbox */}
                  <button
                    onClick={() => toggleProductSelection(product.id)}
                    className="absolute top-2 left-2 z-10 bg-white/80 backdrop-blur-sm rounded-full p-1"
                  >
                    {selectedProducts.includes(product.id) ? (
                      <CheckSquare className="w-5 h-5 text-blue-600" />
                    ) : (
                      <Square className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                  {/* Status Badge */}
                  <div className="absolute top-2 right-2">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStockStatusStyle(product.stock)}`}>
                      {product.stock} units
                    </span>
                  </div>
                </div>

                {/* Product Info - Mobile pe neeche */}
                <div className="p-3 md:p-4">
                  {/* Title and Status Row */}
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800 text-sm md:text-base">
                        {product.name}
                      </h3>
                      <p className="text-xs text-gray-600 mt-1">
                        {product.id} • {product.category}
                      </p>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusStyle(product.isActive)} ml-2`}>
                      {product.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs md:text-sm text-gray-700 mb-3 line-clamp-2">
                    {product.description}
                  </p>

                  {/* Price and Details */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-base md:text-lg text-gray-800">
                        {formatCurrency(product.price)}
                      </div>
                      <div className="text-xs text-gray-600 flex items-center gap-1 mt-1">
                        <span className="px-1.5 py-0.5 bg-gray-100 rounded text-xs">{product.weight}</span>
                        <span>•</span>
                        <span>{product.pujaType}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions - Mobile pe better spacing */}
                  <div className="flex items-center justify-between mt-3 md:mt-4 pt-3 md:pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-1 md:gap-2">
                      <button
                        onClick={() => handleAction('editProduct', product.id)}
                        className="p-1.5 rounded hover:bg-blue-50 transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4 text-blue-600" />
                      </button>
                      <button
                        onClick={() => handleAction('duplicateProduct', product.id)}
                        className="p-1.5 rounded hover:bg-orange-50 transition-colors"
                        title="Duplicate"
                      >
                        <Copy className="w-4 h-4 text-orange-600" />
                      </button>
                      <button
                        onClick={() => handleAction('toggleActive', product.id)}
                        className="p-1.5 rounded hover:bg-gray-100 transition-colors"
                        title={product.isActive ? 'Deactivate' : 'Activate'}
                      >
                        {product.isActive ? (
                          <XCircle className="w-4 h-4 text-red-500" />
                        ) : (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        )}
                      </button>
                    </div>
                    <button
                      onClick={() => handleAction('deleteProduct', product.id)}
                      className="p-1.5 rounded hover:bg-red-50 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State for Grid View */}
        {viewMode === 'grid' && filteredProducts.length === 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
            <div className="p-4 rounded-full inline-flex items-center justify-center mb-4 bg-gray-100">
              <Package className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium mb-2 text-gray-800">
              No products found
            </h3>
            <p className="text-sm text-gray-600">
              {searchQuery ? 'Try a different search term' : 'Click "Add Product" to get started'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
