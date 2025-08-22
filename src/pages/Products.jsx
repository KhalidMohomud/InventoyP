import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Package,
  Tag,
  DollarSign,
  TrendingUp
} from 'lucide-react';

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const products = [
    {
      id: 1,
      name: 'Steel Plates',
      description: 'High-grade steel plates 1/4" thick, various sizes available',
      category: 'Raw Materials',
      unitPrice: 45.50,
      stock: 150,
      unit: 'pieces',
      sku: 'STL-001',
      lastUpdated: '2024-01-15'
    },
    {
      id: 2,
      name: 'Aluminum Bars',
      description: '6061-T6 aluminum bars 1" diameter, 12ft length',
      category: 'Raw Materials',
      unitPrice: 12.75,
      stock: 200,
      unit: 'pieces',
      sku: 'ALM-002',
      lastUpdated: '2024-01-14'
    },
    {
      id: 3,
      name: 'Copper Wire',
      description: 'Copper wire 12 AWG, 100ft spool, high conductivity',
      category: 'Electrical',
      unitPrice: 28.90,
      stock: 75,
      unit: 'spools',
      sku: 'COP-003',
      lastUpdated: '2024-01-13'
    },
    {
      id: 4,
      name: 'PVC Pipes',
      description: 'Schedule 40 PVC pipes 2" diameter, 10ft length',
      category: 'Plumbing',
      unitPrice: 8.25,
      stock: 300,
      unit: 'pieces',
      sku: 'PVC-004',
      lastUpdated: '2024-01-12'
    },
    {
      id: 5,
      name: 'Welding Rods',
      description: 'E6013 welding rods, 1/8" diameter, 50lb box',
      category: 'Welding',
      unitPrice: 125.00,
      stock: 25,
      unit: 'boxes',
      sku: 'WLD-005',
      lastUpdated: '2024-01-11'
    },
    {
      id: 6,
      name: 'Safety Glasses',
      description: 'ANSI Z87.1 certified safety glasses, clear lens',
      category: 'Safety',
      unitPrice: 15.99,
      stock: 100,
      unit: 'pairs',
      sku: 'SFG-006',
      lastUpdated: '2024-01-10'
    }
  ];

  const categories = ['all', 'Raw Materials', 'Electrical', 'Plumbing', 'Welding', 'Safety'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const getStockColor = (stock) => {
    if (stock > 100) return 'text-success-600';
    if (stock > 50) return 'text-warning-600';
    return 'text-danger-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600 mt-1">Manage your product catalog and inventory</p>
        </div>
        <button className="btn-primary">
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </button>
      </div>

      {/* Filters and Search */}
      <div className="card">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products by name, description, or SKU..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="input-field"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="card hover:shadow-lg transition-shadow duration-200">
            {/* Product Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                  <p className="text-sm text-gray-600">{product.category}</p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <button className="p-1 text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-1 text-danger-600 hover:text-danger-700 hover:bg-danger-50 rounded">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-3 mb-4">
              <p className="text-sm text-gray-600">{product.description}</p>
              <div className="flex items-center space-x-2">
                <Tag className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">SKU: {product.sku}</span>
              </div>
            </div>

            {/* Price and Stock */}
            <div className="border-t pt-4 mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-gray-400" />
                  <span className="text-lg font-semibold text-gray-900">
                    ${product.unitPrice.toFixed(2)}
                  </span>
                  <span className="text-sm text-gray-500">per {product.unit}</span>
                </div>
                <div className="text-right">
                  <div className={`text-lg font-semibold ${getStockColor(product.stock)}`}>
                    {product.stock} {product.unit}
                  </div>
                  <div className="text-xs text-gray-500">in stock</div>
                </div>
              </div>
            </div>

            {/* Last Updated */}
            <div className="border-t pt-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Last Updated:</span>
                <span className="font-medium text-gray-900">{product.lastUpdated}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card text-center">
          <div className="text-2xl font-bold text-primary-600">{products.length}</div>
          <div className="text-sm text-gray-600">Total Products</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-success-600">
            {categories.filter(cat => cat !== 'all').length}
          </div>
          <div className="text-sm text-gray-600">Categories</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-warning-600">
            ${products.reduce((sum, p) => sum + (p.unitPrice * p.stock), 0).toLocaleString('en-US', { minimumFractionDigits: 0 })}
          </div>
          <div className="text-sm text-gray-600">Inventory Value</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-purple-600">
            {products.reduce((sum, p) => sum + p.stock, 0).toLocaleString('en-US')}
          </div>
          <div className="text-sm text-gray-600">Total Stock</div>
        </div>
      </div>
    </div>
  );
};

export default Products;
