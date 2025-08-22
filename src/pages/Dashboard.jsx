import React from 'react';
import { 
  DollarSign, 
  FileText, 
  Users, 
  Package, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  Clock,
  PlusCircle
} from 'lucide-react';

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Revenue',
      value: '$124,563.00',
      change: '+12.5%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Total Invoices',
      value: '1,234',
      change: '+8.2%',
      changeType: 'positive',
      icon: FileText,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Active Customers',
      value: '89',
      change: '+3.1%',
      changeType: 'positive',
      icon: Users,
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Products',
      value: '156',
      change: '+5.7%',
      changeType: 'positive',
      icon: Package,
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const recentInvoices = [
    {
      id: 'INV-001',
      customer: 'ABC Manufacturing Co.',
      amount: '$2,450.00',
      status: 'Paid',
      date: '2024-01-15'
    },
    {
      id: 'INV-002',
      customer: 'XYZ Industries Ltd.',
      amount: '$1,890.00',
      status: 'Pending',
      date: '2024-01-14'
    },
    {
      id: 'INV-003',
      customer: 'Tech Solutions Inc.',
      amount: '$3,200.00',
      status: 'Paid',
      date: '2024-01-13'
    },
    {
      id: 'INV-004',
      customer: 'Global Parts Corp.',
      amount: '$950.00',
      status: 'Overdue',
      date: '2024-01-10'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Paid':
        return 'bg-success-100 text-success-800';
      case 'Pending':
        return 'bg-warning-100 text-warning-800';
      case 'Overdue':
        return 'bg-danger-100 text-danger-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Welcome back! Here's what's happening with your business.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="btn-secondary">
            <Calendar className="w-4 h-4 mr-2" />
            This Month
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="flex items-center mt-4">
                {stat.changeType === 'positive' ? (
                  <TrendingUp className="w-4 h-4 text-success-500 mr-1" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-danger-500 mr-1" />
                )}
                <span className={`text-sm font-medium ${
                  stat.changeType === 'positive' ? 'text-success-600' : 'text-danger-600'
                }`}>
                  {stat.change}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">from last month</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Revenue Overview</h3>
            <select className="input-field w-32">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
          </div>
          <div className="h-64 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-8 h-8 text-primary-600 dark:text-primary-400" />
              </div>
              <p className="text-gray-500 dark:text-gray-400">Chart visualization will be implemented here</p>
              <p className="text-sm text-gray-400 dark:text-gray-500">Revenue tracking and analytics</p>
            </div>
          </div>
        </div>

        {/* Recent Invoices */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Invoices</h3>
            <button className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentInvoices.map((invoice) => (
              <div key={invoice.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{invoice.customer}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs text-gray-500 dark:text-gray-400">{invoice.id}</span>
                    <span className="text-xs text-gray-400 dark:text-gray-500">•</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{invoice.date}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">{invoice.amount}</span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(invoice.status)}`}>
                    {invoice.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center p-4 bg-primary-50 dark:bg-primary-900/20 hover:bg-primary-100 dark:hover:bg-primary-900/30 rounded-lg transition-colors duration-200">
            <PlusCircle className="w-6 h-6 text-primary-600 dark:text-primary-400 mr-3" />
            <div className="text-left">
              <p className="font-medium text-primary-900 dark:text-primary-100">Create Invoice</p>
              <p className="text-sm text-primary-600 dark:text-primary-300">Generate new invoice</p>
            </div>
          </button>
          <button className="flex items-center p-4 bg-success-50 dark:bg-success-900/20 hover:bg-success-100 dark:hover:bg-success-900/30 rounded-lg transition-colors duration-200">
            <Users className="w-6 h-6 text-success-600 dark:text-success-400 mr-3" />
            <div className="text-left">
              <p className="font-medium text-success-900 dark:text-success-100">Add Customer</p>
              <p className="text-sm text-success-600 dark:text-success-300">Register new customer</p>
            </div>
          </button>
          <button className="flex items-center p-4 bg-warning-50 dark:bg-warning-900/20 hover:bg-warning-100 dark:hover:bg-warning-900/30 rounded-lg transition-colors duration-200">
            <Package className="w-6 h-6 text-warning-600 dark:text-warning-400 mr-3" />
            <div className="text-left">
              <p className="font-medium text-warning-900 dark:text-warning-100">Add Product</p>
              <p className="text-sm text-warning-600 dark:text-warning-300">Create new product</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
