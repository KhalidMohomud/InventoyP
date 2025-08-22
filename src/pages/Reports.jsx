import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Download, 
  Calendar,
  DollarSign,
  FileText,
  Users,
  Package
} from 'lucide-react';

const Reports = () => {
  const [dateRange, setDateRange] = useState('30');

  const revenueData = [
    { month: 'Jan', revenue: 45000, invoices: 45 },
    { month: 'Feb', revenue: 52000, invoices: 52 },
    { month: 'Mar', revenue: 48000, invoices: 48 },
    { month: 'Apr', revenue: 61000, invoices: 61 },
    { month: 'May', revenue: 55000, invoices: 55 },
    { month: 'Jun', revenue: 67000, invoices: 67 }
  ];

  const topCustomers = [
    { name: 'Tech Solutions Inc.', revenue: 15600, invoices: 8 },
    { name: 'ABC Manufacturing Co.', revenue: 12450, invoices: 6 },
    { name: 'XYZ Industries Ltd.', revenue: 11890, invoices: 5 },
    { name: 'Global Parts Corp.', revenue: 9950, invoices: 4 },
    { name: 'Metal Works LLC', revenue: 8750, invoices: 3 }
  ];

  const topProducts = [
    { name: 'Steel Plates', sold: 450, revenue: 20475 },
    { name: 'Aluminum Bars', sold: 320, revenue: 4080 },
    { name: 'Copper Wire', sold: 280, revenue: 8092 },
    { name: 'PVC Pipes', sold: 520, revenue: 4290 },
    { name: 'Welding Rods', sold: 85, revenue: 10625 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600 mt-1">Business insights and performance metrics</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="input-field"
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
            <option value="365">Last year</option>
          </select>
          <button className="btn-secondary">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">
                ${revenueData.reduce((sum, item) => sum + item.revenue, 0).toLocaleString('en-US')}
              </p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Invoices</p>
              <p className="text-2xl font-bold text-gray-900">
                {revenueData.reduce((sum, item) => sum + item.invoices, 0)}
              </p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Customers</p>
              <p className="text-2xl font-bold text-gray-900">89</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Products Sold</p>
              <p className="text-2xl font-bold text-gray-900">1,655</p>
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Revenue Trend</h3>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Revenue</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-success-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Invoices</span>
            </div>
          </div>
        </div>
        <div className="h-80 bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <BarChart3 className="w-8 h-8 text-primary-600" />
            </div>
            <p className="text-gray-500">Chart visualization will be implemented here</p>
            <p className="text-sm text-gray-400">Revenue and invoice trends over time</p>
          </div>
        </div>
      </div>

      {/* Top Performers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Customers */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Customers</h3>
          <div className="space-y-4">
            {topCustomers.map((customer, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-primary-600">{index + 1}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{customer.name}</p>
                    <p className="text-xs text-gray-500">{customer.invoices} invoices</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">
                    ${customer.revenue.toLocaleString('en-US')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Products</h3>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-success-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-success-600">{index + 1}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{product.name}</p>
                    <p className="text-xs text-gray-500">{product.sold} units sold</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">
                    ${product.revenue.toLocaleString('en-US')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card text-center">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-8 h-8 text-primary-600" />
          </div>
          <h4 className="text-lg font-semibold text-gray-900 mb-2">Growth Rate</h4>
          <p className="text-3xl font-bold text-success-600">+12.5%</p>
          <p className="text-sm text-gray-500 mt-1">vs last period</p>
        </div>
        <div className="card text-center">
          <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <DollarSign className="w-8 h-8 text-success-600" />
          </div>
          <h4 className="text-lg font-semibold text-gray-900 mb-2">Average Invoice</h4>
          <p className="text-3xl font-bold text-gray-900">$1,247</p>
          <p className="text-sm text-gray-500 mt-1">per invoice</p>
        </div>
        <div className="card text-center">
          <div className="w-16 h-16 bg-warning-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-warning-600" />
          </div>
          <h4 className="text-lg font-semibold text-gray-900 mb-2">Customer Retention</h4>
          <p className="text-3xl font-bold text-gray-900">94.2%</p>
          <p className="text-sm text-gray-500 mt-1">repeat customers</p>
        </div>
      </div>
    </div>
  );
};

export default Reports;
