import React, { useState, useEffect } from 'react';
import { 
  Search,
  Filter,
  Package,
  Plus,
  Minus,
  AlertCircle,
  History,
  Download,
  Upload,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  ChevronDown,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  CheckSquare,
  Square,
  BarChart3,
  Calculator,
  Bell,
  ShoppingCart,
  XCircle,
  CheckCircle,
  Clock,
  ArrowRight
} from 'lucide-react';

const Inventory = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [stockFilter, setStockFilter] = useState('all');
  const [selectedItems, setSelectedItems] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [stockHistory, setStockHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [showAdjustModal, setShowAdjustModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [adjustData, setAdjustData] = useState({
    type: 'add',
    quantity: 1,
    reason: '',
    notes: ''
  });

  // Sample Inventory Data
  const inventoryData = [
    {
      id: 'INV-001',
      productId: 'P001',
      name: 'Premium Diya Set',
      category: 'Decorations',
      currentStock: 85,
      minStock: 20,
      price: 250,
      lastUpdated: '2023-12-15',
      status: 'in-stock',
      supplier: 'Artisan Crafts',
      location: 'Shelf A1'
    },
    {
      id: 'INV-002',
      productId: 'P002',
      name: 'Pure Cow Ghee',
      category: 'Puja Items',
      currentStock: 8,
      minStock: 15,
      price: 350,
      lastUpdated: '2023-12-14',
      status: 'low-stock',
      supplier: 'Dairy Delight',
      location: 'Fridge F2'
    },
    {
      id: 'INV-003',
      productId: 'P003',
      name: 'Natural Agarbatti',
      category: 'Puja Items',
      currentStock: 195,
      minStock: 50,
      price: 150,
      lastUpdated: '2023-12-15',
      status: 'in-stock',
      supplier: 'Natural Scents',
      location: 'Shelf B3'
    },
    {
      id: 'INV-004',
      productId: 'P004',
      name: 'Fresh Coconut',
      category: 'Puja Items',
      currentStock: 3,
      minStock: 25,
      price: 50,
      lastUpdated: '2023-12-15',
      status: 'out-of-stock',
      supplier: 'Fresh Farms',
      location: 'Storage S1'
    },
    {
      id: 'INV-005',
      productId: 'P005',
      name: 'Sandalwood Paste',
      category: 'Puja Items',
      currentStock: 42,
      minStock: 20,
      price: 200,
      lastUpdated: '2023-12-14',
      status: 'in-stock',
      supplier: 'Herbal Haven',
      location: 'Shelf C2'
    },
    {
      id: 'INV-006',
      productId: 'P006',
      name: 'Flower Garland',
      category: 'Decorations',
      currentStock: 0,
      minStock: 30,
      price: 180,
      lastUpdated: '2023-12-13',
      status: 'out-of-stock',
      supplier: 'Floral Creations',
      location: 'Cool Room R1'
    },
    {
      id: 'INV-007',
      productId: 'P007',
      name: 'Camphor Tablets',
      category: 'Puja Items',
      currentStock: 125,
      minStock: 40,
      price: 100,
      lastUpdated: '2023-12-15',
      status: 'in-stock',
      supplier: 'Pure Products',
      location: 'Shelf D1'
    },
    {
      id: 'INV-008',
      productId: 'P008',
      name: 'Brass Oil Lamp',
      category: 'Utensils',
      currentStock: 28,
      minStock: 15,
      price: 650,
      lastUpdated: '2023-12-14',
      status: 'in-stock',
      supplier: 'Metal Arts',
      location: 'Display D3'
    },
    {
      id: 'INV-009',
      productId: 'P009',
      name: 'Kumkum Powder',
      category: 'Puja Items',
      currentStock: 4,
      minStock: 25,
      price: 120,
      lastUpdated: '2023-12-15',
      status: 'low-stock',
      supplier: 'Traditional Colors',
      location: 'Shelf A3'
    },
    {
      id: 'INV-010',
      productId: 'P010',
      name: 'Rudraksha Mala',
      category: 'Accessories',
      currentStock: 18,
      minStock: 10,
      price: 1899,
      lastUpdated: '2023-12-13',
      status: 'in-stock',
      supplier: 'Spiritual Store',
      location: 'Display D4'
    },
  ];

  // Sample Stock History
  const historyData = [
    {
      id: 'H001',
      productId: 'P002',
      productName: 'Pure Cow Ghee',
      type: 'sale',
      quantity: 5,
      previousStock: 13,
      newStock: 8,
      date: '2023-12-15 14:30',
      user: 'Rajesh Kumar',
      notes: 'Order #ORD-2023-00123'
    },
    {
      id: 'H002',
      productId: 'P004',
      productName: 'Fresh Coconut',
      type: 'sale',
      quantity: 10,
      previousStock: 13,
      newStock: 3,
      date: '2023-12-15 11:15',
      user: 'Priya Sharma',
      notes: 'Order #ORD-2023-00124'
    },
    {
      id: 'H003',
      productId: 'P002',
      productName: 'Pure Cow Ghee',
      type: 'restock',
      quantity: 20,
      previousStock: 8,
      newStock: 28,
      date: '2023-12-14 16:45',
      user: 'Warehouse Staff',
      notes: 'Supplier delivery'
    },
    {
      id: 'H004',
      productId: 'P006',
      productName: 'Flower Garland',
      type: 'adjustment',
      quantity: 5,
      previousStock: 5,
      newStock: 0,
      date: '2023-12-14 10:20',
      user: 'Admin',
      notes: 'Damaged items removed'
    },
    {
      id: 'H005',
      productId: 'P009',
      productName: 'Kumkum Powder',
      type: 'sale',
      quantity: 8,
      previousStock: 12,
      newStock: 4,
      date: '2023-12-13 15:40',
      user: 'Amit Patel',
      notes: 'Order #ORD-2023-00120'
    },
  ];

  // Categories
  const categories = ['All', 'Puja Items', 'Decorations', 'Utensils', 'Accessories'];

  // Initialize
  useEffect(() => {
    setInventory(inventoryData);
    setStockHistory(historyData);
    
    // Check for low stock alerts
    checkLowStockAlerts();
  }, []);

  // Check low stock alerts
  const checkLowStockAlerts = () => {
    const lowStockItems = inventoryData.filter(item => item.currentStock < 5);
    if (lowStockItems.length > 0) {
      console.log(`Alert: ${lowStockItems.length} items below 5 in stock!`);
      // In real app, send notification/email
    }
  };

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

  // Format datetime
  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return date.toLocaleString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get stock status style
  const getStockStatusStyle = (status) => {
    switch(status) {
      case 'out-of-stock':
        return 'bg-red-50 text-red-700';
      case 'low-stock':
        return 'bg-orange-50 text-orange-500';
      case 'in-stock':
        return 'bg-green-50 text-green-700';
      default:
        return 'bg-gray-50 text-gray-600';
    }
  };

  // Get stock status text
  const getStockStatus = (stock, minStock) => {
    if (stock === 0) return 'Out of Stock';
    if (stock < 5) return 'Very Low (<5)';
    if (stock < minStock) return 'Low Stock';
    return 'In Stock';
  };

  // Get stock status from quantity
  const getStockStatusFromQuantity = (stock, minStock) => {
    if (stock === 0) return 'out-of-stock';
    if (stock < 5) return 'low-stock';
    if (stock < minStock) return 'low-stock';
    return 'in-stock';
  };

  // Filter inventory
  const filteredInventory = inventory.filter(item => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        item.name.toLowerCase().includes(query) ||
        item.id.toLowerCase().includes(query) ||
        item.productId.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
      );
    }
    
    // Category filter
    if (categoryFilter !== 'all' && item.category !== categoryFilter) {
      return false;
    }
    
    // Stock filter
    if (stockFilter === 'low-stock' && item.currentStock >= item.minStock) {
      return false;
    }
    if (stockFilter === 'out-of-stock' && item.currentStock > 0) {
      return false;
    }
    if (stockFilter === 'critical' && item.currentStock >= 5) {
      return false;
    }
    if (stockFilter === 'in-stock' && (item.currentStock < item.minStock || item.currentStock === 0)) {
      return false;
    }
    
    return true;
  });

  // Calculate statistics
  const stats = {
    totalItems: inventory.length,
    totalValue: inventory.reduce((sum, item) => sum + (item.price * item.currentStock), 0),
    lowStockItems: inventory.filter(item => item.currentStock < item.minStock && item.currentStock > 0).length,
    outOfStockItems: inventory.filter(item => item.currentStock === 0).length,
    criticalItems: inventory.filter(item => item.currentStock < 5 && item.currentStock > 0).length,
  };

  // Handle stock adjustment
  const adjustStock = () => {
    if (!selectedProduct) return;
    
    const newQuantity = adjustData.type === 'add' 
      ? selectedProduct.currentStock + parseInt(adjustData.quantity)
      : selectedProduct.currentStock - parseInt(adjustData.quantity);
    
    if (newQuantity < 0) {
      alert('Cannot reduce stock below 0');
      return;
    }

    // Update inventory
    setInventory(prev => prev.map(item => 
      item.id === selectedProduct.id 
        ? { 
            ...item, 
            currentStock: newQuantity,
            status: getStockStatusFromQuantity(newQuantity, item.minStock),
            lastUpdated: new Date().toISOString().split('T')[0]
          }
        : item
    ));

    // Add to history
    const historyEntry = {
      id: `H${Date.now()}`,
      productId: selectedProduct.productId,
      productName: selectedProduct.name,
      type: adjustData.type === 'add' ? 'restock' : 'adjustment',
      quantity: parseInt(adjustData.quantity),
      previousStock: selectedProduct.currentStock,
      newStock: newQuantity,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      user: 'Admin',
      notes: adjustData.notes || adjustData.reason
    };
    
    setStockHistory(prev => [historyEntry, ...prev]);

    // Check for low stock alerts
    if (newQuantity < 5) {
      alert(`⚠️ Alert: ${selectedProduct.name} is now below 5 units!`);
    }

    // Reset modal
    setShowAdjustModal(false);
    setSelectedProduct(null);
    setAdjustData({
      type: 'add',
      quantity: 1,
      reason: '',
      notes: ''
    });
  };

  // Quick actions
  const quickAddStock = (productId, quantity) => {
    setInventory(prev => prev.map(item => {
      if (item.productId === productId) {
        const newStock = item.currentStock + quantity;
        return {
          ...item,
          currentStock: newStock,
          status: getStockStatusFromQuantity(newStock, item.minStock),
          lastUpdated: new Date().toISOString().split('T')[0]
        };
      }
      return item;
    }));
  };

  const quickReduceStock = (productId, quantity) => {
    setInventory(prev => prev.map(item => {
      if (item.productId === productId) {
        const newStock = Math.max(0, item.currentStock - quantity);
        return {
          ...item,
          currentStock: newStock,
          status: getStockStatusFromQuantity(newStock, item.minStock),
          lastUpdated: new Date().toISOString().split('T')[0]
        };
      }
      return item;
    }));
  };

  // Toggle item selection
  const toggleItemSelection = (itemId) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  // Select all items
  const selectAllItems = () => {
    if (selectedItems.length === filteredInventory.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredInventory.map(item => item.id));
    }
  };

  // Export inventory data
  const exportInventory = () => {
    const headers = ['ID', 'Product ID', 'Name', 'Category', 'Current Stock', 'Min Stock', 'Price', 'Status', 'Location', 'Last Updated'];
    const csvContent = [
      headers.join(','),
      ...inventory.map(item => [
        item.id,
        item.productId,
        item.name,
        item.category,
        item.currentStock,
        item.minStock,
        item.price,
        getStockStatus(item.currentStock, item.minStock),
        item.location,
        item.lastUpdated
      ].join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `inventory-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 px-3 py-1.5 border border-orange-100">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <div className="text-left sm:text-left flex-1 md:flex ">
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold uppercase leading-tight text-orange-900">
               Inventory Management
            </h1>
            <p className="text-sm text-gray-600 mt-1 md:mt-2.5 lg:mt-2.5">
              Track and manage your stock levels
            </p>
          </div>
          
        </div>
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm text-gray-700">Updating inventory...</p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="p-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
          <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg border border-gray-200 px-3 py-1.5 ">
            <div className="flex items-center justify-between ">
              <div>
                <p className="text-sm text-gray-600">Total Items</p>
                <p className="text-xl font-semibold mt-1 text-gray-800">
                  {stats.totalItems}
                </p>
              </div>
              <div className="p-2 mt-5 rounded bg-blue-50">
                <Package className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg border border-gray-200 px-3 py-1.5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Value</p>
                <p className="text-xl font-semibold mt-1 text-gray-800">
                  {formatCurrency(stats.totalValue)}
                </p>
              </div>
              <div className="p-2 mt-5 rounded bg-green-50">
                <Calculator className="w-5 h-5 text-green-700" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg border border-gray-200 px-3 py-1.5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Low Stock</p>
                <p className="text-xl font-semibold mt-1 text-gray-800">
                  {stats.lowStockItems}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="w-3 h-3 text-orange-500" />
                  <span className="text-xs text-orange-500">+2 this week</span>
                </div>
              </div>
              <div className="p-2 rounded bg-orange-50">
                <AlertCircle className="w-5 h-5 text-orange-500" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg border border-gray-200 px-3 py-1.5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Out of Stock</p>
                <p className="text-xl font-semibold mt-1 text-gray-800">
                  {stats.outOfStockItems}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingDown className="w-3 h-3 text-red-500" />
                  <span className="text-xs text-red-500">-1 this week</span>
                </div>
              </div>
              <div className="p-2 rounded bg-red-50">
                <XCircle className="w-5 h-5 text-red-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Critical Alerts */}
        {stats.criticalItems > 0 && (
          <div className="bg-red-50 rounded-lg border border-red-200 p-3 mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded bg-red-100">
                <Bell className="w-5 h-5 text-red-500" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-800">
                  ⚠️ Critical Stock Alert
                </h3>
                <p className="text-sm text-gray-700">
                  {stats.criticalItems} item{stats.criticalItems !== 1 ? 's' : ''} below 5 units in stock. Restock immediately!
                </p>
              </div>
              <button 
                onClick={() => setStockFilter('critical')}
                className="px-3 py-1.5 text-sm rounded border border-red-300 text-red-600 hover:bg-red-50"
              >
                View Critical Items
              </button>
            </div>
          </div>
        )}

        {/* Bulk Actions Bar */}
        {selectedItems.length > 0 && (
          <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg border border-gray-200 px-3 py-1.5 mb-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded bg-blue-50">
                  <CheckSquare className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {selectedItems.length} item{selectedItems.length !== 1 ? 's' : ''} selected
                  </p>
                  <p className="text-xs text-gray-600">
                    Click to select/deselect all
                  </p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={() => {
                    // Bulk restock
                    setInventory(prev => prev.map(item => 
                      selectedItems.includes(item.id) 
                        ? { ...item, currentStock: item.currentStock + 10 }
                        : item
                    ));
                    setSelectedItems([]);
                  }}
                  className="px-3 py-1.5 text-sm rounded border bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                >
                  Add 10 Units Each
                </button>
                <button 
                  onClick={() => {
                    // Export selected
                    const selectedData = inventory.filter(item => selectedItems.includes(item.id));
                    const headers = ['ID', 'Name', 'Category', 'Current Stock', 'Min Stock', 'Status'];
                    const csvContent = [
                      headers.join(','),
                      ...selectedData.map(item => [
                        item.id,
                        item.name,
                        item.category,
                        item.currentStock,
                        item.minStock,
                        getStockStatus(item.currentStock, item.minStock)
                      ].join(','))
                    ].join('\n');
                    
                    const blob = new Blob([csvContent], { type: 'text/csv' });
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `selected-inventory-${new Date().toISOString().split('T')[0]}.csv`;
                    a.click();
                  }}
                  className="px-3 py-1.5 text-sm rounded border bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
                >
                  Export Selected
                </button>
                <button 
                  onClick={() => setSelectedItems([])}
                  className="px-3 py-1.5 text-sm rounded border border-gray-300 hover:bg-gray-100"
                >
                  Clear Selection
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Controls Bar */}
        <div className="bg-white rounded-lg border border-gray-200 px-4 py-3 mb-4">
          <div className="flex flex-col lg:flex-row gap-4 text-sm">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search inventory by name, ID, category..."
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
                <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
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
                  <option value="low-stock">Low Stock</option>
                  <option value="critical">Critical (&lt;5)</option>
                  <option value="out-of-stock">Out of Stock</option>
                </select>
                <AlertCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button 
                  onClick={() => setShowHistory(!showHistory)}
                  className="px-3 py-1.5 rounded-lg border flex items-center gap-2 bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200"
                >
                  <History className="w-4 h-4" />
                  History
                </button>
                <button 
                  onClick={exportInventory}
                  className="px-3 py-1.5 rounded-lg border flex items-center gap-2 bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200"
                >
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stock History Panel */}
        {showHistory && (
          <div className="bg-white rounded-lg border border-gray-200 mb-4">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-800">
                Stock History
              </h3>
              <button 
                onClick={() => setShowHistory(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            
            <div className="max-h-96 overflow-y-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm border-gray-200 bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40">
                    <th className="p-3 font-medium">Date & Time</th>
                    <th className="p-3 pl-5 font-medium">Product</th>
                    <th className="p-3 pl-5 font-medium">Type</th>
                    <th className="p-3 pl-2 font-medium">Quantity</th>
                    <th className="p-3 pl-1 font-medium">Stock Change</th>
                    <th className="p-3 pl-5 font-medium">User</th>
                    <th className="p-3 pl-12 font-medium">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {stockHistory.map(record => (
                    <tr 
                      key={record.id} 
                      className="border-t border-gray-200 hover:bg-gray-50 even:bg-gray-50"
                    >
                      <td className="px-3 py-2">
                        <span className="text-sm text-gray-700">
                          {formatDateTime(record.date)}
                        </span>
                      </td>
                      <td className="px-3 py-2">
                        <div>
                          <span className="font-medium text-gray-800">
                            {record.productName}
                          </span>
                          <p className="text-xs text-gray-600">
                            {record.productId}
                          </p>
                        </div>
                      </td>
                      <td className="px-3 py-2">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          record.type === 'restock' ? 'bg-green-50 text-green-700' :
                          record.type === 'sale' ? 'bg-blue-50 text-blue-600' :
                          'bg-gray-50 text-gray-600'
                        }`}>
                          {record.type.charAt(0).toUpperCase() + record.type.slice(1)}
                        </span>
                      </td>
                      <td className="px-3 py-2">
                        <div className="flex items-center gap-2">
                          {record.type === 'restock' ? (
                            <Plus className="w-4 h-4 text-green-600" />
                          ) : (
                            <Minus className="w-4 h-4 text-red-600" />
                          )}
                          <span className="font-medium text-gray-800">
                            {record.quantity}
                          </span>
                        </div>
                      </td>
                      <td className="px-3 py-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">
                            {record.previousStock}
                          </span>
                          <ArrowRight className="w-4 h-4 text-gray-400" />
                          <span className="font-medium text-gray-800">
                            {record.newStock}
                          </span>
                        </div>
                      </td>
                      <td className="px-3 py-2">
                        <span className="text-sm text-gray-700">
                          {record.user}
                        </span>
                      </td>
                      <td className="px-3 py-2">
                        <span className="text-sm text-gray-700">
                          {record.notes}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {stockHistory.length === 0 && (
                <div className="p-8 text-center">
                  <History className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                  <h3 className="text-lg font-medium mb-2 text-gray-800">
                    No stock history yet
                  </h3>
                  <p className="text-sm text-gray-600">
                    Stock adjustments will appear here
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Inventory Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm border-gray-200 bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40">
                  <th className="p-4">
                    <button 
                      onClick={selectAllItems}
                      className="flex items-center gap-2"
                    >
                      {selectedItems.length === filteredInventory.length && filteredInventory.length > 0 ? (
                        <CheckSquare className="w-4 h-4 text-blue-600" />
                      ) : (
                        <Square className="w-4 h-4 text-gray-400" />
                      )}
                    </button>
                  </th>
                  <th className="p-4">
                    <span className="font-medium text-gray-700">Product Details</span>
                  </th>
                  <th className="p-4">
                    <span className="pl-2 font-medium text-gray-700">Category</span>
                  </th>
                  <th className="p-4">
                    <span className="font-medium text-gray-700">Stock Level</span>
                  </th>
                  <th className="p-4">
                    <span className="font-medium text-gray-700">Price</span>
                  </th>
                  <th className="p-4">
                    <span className="font-medium text-gray-700">Location</span>
                  </th>
                  <th className="p-4">
                    <span className="font-medium text-gray-700">Quick Actions</span>
                  </th>
                  <th className="p-4">
                    <span className="pl-2 font-medium text-gray-700">More</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredInventory.map(item => {
                  const stockPercent = (item.currentStock / item.minStock) * 100;
                  const isCritical = item.currentStock < 5;
                  
                  return (
                    <tr 
                      key={item.id} 
                      className={`border-t border-gray-200 hover:bg-gray-50 even:bg-gray-50 ${isCritical ? 'bg-red-50/30' : ''}`}
                    >
                      <td className="px-4 py-">
                        <button 
                          onClick={() => toggleItemSelection(item.id)} 
                          className="flex items-center"
                        >
                          {selectedItems.includes(item.id) ? (
                            <CheckSquare className="w-4 h-4 text-blue-600" />
                          ) : (
                            <Square className="w-4 h-4 text-gray-400" />
                          )}
                        </button>
                      </td>
                      <td className="px-4 py-">
                        <div>
                          <span className="font-medium block text-gray-800">
                            {item.name}
                          </span>
                          <span className="text-xs text-gray-600">
                            {item.id} • {item.productId}
                          </span>
                          <div className="flex items-center gap-1 mt-1">
                            <span className="text-xs text-gray-600">
                              Supplier: {item.supplier}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          item.category === 'Puja Items' ? 'bg-blue-50 text-blue-700' :
                          item.category === 'Decorations' ? 'bg-purple-50 text-purple-700' :
                          item.category === 'Utensils' ? 'bg-orange-50 text-orange-700' :
                          'bg-gray-50 text-gray-700'
                        }`}>
                          {item.category}
                        </span>
                      </td>
                      <td className="px-4 py-">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-gray-800">
                              {item.currentStock}
                            </span>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStockStatusStyle(item.status)}`}>
                              {getStockStatus(item.currentStock, item.minStock)}
                            </span>
                          </div>
                          
                          {/* Stock Progress Bar */}
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span className="text-gray-600">
                                Min: {item.minStock}
                              </span>
                              <span className={isCritical ? 'text-red-500' : 'text-gray-600'}>
                                {Math.round(stockPercent)}%
                              </span>
                            </div>
                            <div className="w-full h-2 rounded-full bg-gray-200">
                              <div 
                                className={`h-2 rounded-full ${
                                  item.currentStock === 0 ? 'bg-red-500' :
                                  isCritical ? 'bg-red-500' :
                                  stockPercent < 100 ? 'bg-orange-500' : 'bg-green-500'
                                }`}
                                style={{ width: `${Math.min(100, stockPercent)}%` }}
                              ></div>
                            </div>
                          </div>
                          
                          {isCritical && (
                            <div className="flex items-center gap-1 text-xs text-red-500">
                              <AlertCircle className="w-3 h-3" />
                              <span>Critical: Below 5 units!</span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-">
                        <span className="font-bold text-gray-800">
                          {formatCurrency(item.price)}
                        </span>
                        <p className="text-xs text-gray-600">
                          Total: {formatCurrency(item.price * item.currentStock)}
                        </p>
                      </td>
                      <td className="px-4 py-">
                        <span className="text-sm text-gray-700">
                          {item.location}
                        </span>
                        <p className="text-xs text-gray-400">
                          Updated: {formatDate(item.lastUpdated)}
                        </p>
                      </td>
                      <td className="px-4 py-">
                        <div className="flex items-center gap-1">
                          <button 
                            onClick={() => quickAddStock(item.productId, 5)}
                            className="p-1.5 rounded hover:bg-gray-100"
                            title="Add 5 units"
                          >
                            <Plus className="w-4 h-4 text-green-600" />
                          </button>
                          <button 
                            onClick={() => quickAddStock(item.productId, 1)}
                            className="p-1.5 rounded hover:bg-gray-100"
                            title="Add 1 unit"
                          >
                            <Plus className="w-3 h-3 text-green-600" />
                          </button>
                          <button 
                            onClick={() => quickReduceStock(item.productId, 1)}
                            disabled={item.currentStock === 0}
                            className={`p-1.5 rounded ${item.currentStock === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
                            title="Reduce 1 unit"
                          >
                            <Minus className="w-3 h-3 text-red-600" />
                          </button>
                          <button 
                            onClick={() => {
                              setSelectedProduct(item);
                              setAdjustData({
                                type: 'add',
                                quantity: 1,
                                reason: '',
                                notes: ''
                              });
                              setShowAdjustModal(true);
                            }}
                            className="p-1.5 rounded hover:bg-gray-100"
                            title="Adjust stock"
                          >
                            <Calculator className="w-4 h-4 text-blue-600" />
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-">
                        <div className="flex items-center gap-1">
                          <button 
                            onClick={() => setShowHistory(true)}
                            className="p-1.5 rounded hover:bg-gray-100"
                            title="View history"
                          >
                            <History className="w-4 h-4" />
                          </button>
                          <button 
                            className="p-1.5 rounded hover:bg-gray-100"
                            title="More actions"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredInventory.length === 0 && (
            <div className="p-8 text-center">
              <div className="p-4 rounded-full inline-flex items-center justify-center mb-4 bg-gray-100">
                <Package className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium mb-2 text-gray-800">
                No inventory items found
              </h3>
              <p className="text-sm text-gray-600">
                {searchQuery ? 'Try a different search term' : 'Add products to manage inventory'}
              </p>
            </div>
          )}
        </div>

        {/* Stock Adjustment Modal */}
        {showAdjustModal && selectedProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-800">
                  Adjust Stock: {selectedProduct.name}
                </h3>
                <button 
                  onClick={() => {
                    setShowAdjustModal(false);
                    setSelectedProduct(null);
                  }}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                {/* Current Stock Info */}
                <div className="p-3 rounded-lg bg-gray-50">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Current Stock</p>
                      <p className="text-xl font-bold text-gray-800">
                        {selectedProduct.currentStock}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Minimum Required</p>
                      <p className="text-xl font-bold text-gray-800">
                        {selectedProduct.minStock}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Adjustment Type */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    Adjustment Type
                  </label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setAdjustData(prev => ({ ...prev, type: 'add' }))}
                      className={`flex-1 px-4 py-2 rounded-lg border ${
                        adjustData.type === 'add'
                          ? 'bg-green-50 text-green-700 border-green-200'
                          : 'border-gray-300 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <Plus className="w-4 h-4" />
                        Add Stock
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setAdjustData(prev => ({ ...prev, type: 'reduce' }))}
                      className={`flex-1 px-4 py-2 rounded-lg border ${
                        adjustData.type === 'reduce'
                          ? 'bg-red-50 text-red-700 border-red-200'
                          : 'border-gray-300 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <Minus className="w-4 h-4" />
                        Reduce Stock
                      </div>
                    </button>
                  </div>
                </div>

                {/* Quantity */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    Quantity
                  </label>
                  <input
                    type="number"
                    value={adjustData.quantity}
                    onChange={(e) => setAdjustData(prev => ({ ...prev, quantity: e.target.value }))}
                    min="1"
                    className="w-full px-4 py-2 rounded-lg border bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                {/* Reason */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    Reason
                  </label>
                  <select
                    value={adjustData.reason}
                    onChange={(e) => setAdjustData(prev => ({ ...prev, reason: e.target.value }))}
                    className="w-full px-4 py-2 rounded-lg border bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="">Select reason</option>
                    <option value="restock">Restock from supplier</option>
                    <option value="sale">Sale/Order fulfillment</option>
                    <option value="damaged">Damaged items</option>
                    <option value="return">Customer return</option>
                    <option value="adjustment">Inventory adjustment</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    Notes (Optional)
                  </label>
                  <textarea
                    value={adjustData.notes}
                    onChange={(e) => setAdjustData(prev => ({ ...prev, notes: e.target.value }))}
                    rows="2"
                    className="w-full px-4 py-2 rounded-lg border bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Additional details..."
                  />
                </div>

                {/* New Stock Preview */}
                <div className="p-3 rounded-lg bg-gray-50">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-600">
                        New stock will be:
                      </p>
                      <p className="text-xl font-bold mt-1 text-gray-800">
                        {adjustData.type === 'add'
                          ? selectedProduct.currentStock + parseInt(adjustData.quantity)
                          : selectedProduct.currentStock - parseInt(adjustData.quantity)
                        }
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Status:</p>
                      <p className={`text-sm font-medium mt-1 ${
                        adjustData.type === 'add'
                          ? 'text-green-600'
                          : 'text-red-600'
                      }`}>
                        {adjustData.type === 'add' ? 'Increasing' : 'Decreasing'} stock
                      </p>
                    </div>
                  </div>
                </div>

                {/* Warning for critical stock */}
                {adjustData.type === 'reduce' && (selectedProduct.currentStock - adjustData.quantity) < 5 && (
                  <div className="p-3 rounded-lg bg-red-50 border border-red-200">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-red-500" />
                      <p className="text-sm text-red-700">
                        ⚠️ This will bring stock below 5 units!
                      </p>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => {
                      setShowAdjustModal(false);
                      setSelectedProduct(null);
                    }}
                    className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={adjustStock}
                    className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700"
                  >
                    Confirm Adjustment
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Inventory;