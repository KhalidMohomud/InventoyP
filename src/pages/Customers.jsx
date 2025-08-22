import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Mail, 
  Phone, 
  MapPin,
  Building,
  User
} from 'lucide-react';

const Customers = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const customers = [
    {
      id: 1,
      name: 'John Doe',
      company: 'ABC Manufacturing Co.',
      email: 'john@abc.com',
      phone: '+1-555-0123',
      address: '123 Industrial Blvd, City, State 12345',
      totalInvoices: 15,
      totalSpent: 45600.00,
      lastInvoice: '2024-01-15'
    },
    {
      id: 2,
      name: 'Jane Smith',
      company: 'XYZ Industries Ltd.',
      email: 'jane@xyz.com',
      phone: '+1-555-0456',
      address: '456 Factory Lane, City, State 12345',
      totalInvoices: 8,
      totalSpent: 23400.00,
      lastInvoice: '2024-01-14'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      company: 'Tech Solutions Inc.',
      email: 'mike@tech.com',
      phone: '+1-555-0789',
      address: '789 Innovation Drive, City, State 12345',
      totalInvoices: 22,
      totalSpent: 78900.00,
      lastInvoice: '2024-01-13'
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      company: 'Global Parts Corp.',
      email: 'sarah@global.com',
      phone: '+1-555-0321',
      address: '321 Parts Street, City, State 12345',
      totalInvoices: 12,
      totalSpent: 32100.00,
      lastInvoice: '2024-01-10'
    },
    {
      id: 5,
      name: 'David Brown',
      company: 'Metal Works LLC',
      email: 'david@metal.com',
      phone: '+1-555-0654',
      address: '654 Metal Road, City, State 12345',
      totalInvoices: 6,
      totalSpent: 15600.00,
      lastInvoice: '2024-01-12'
    }
  ];

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
          <p className="text-gray-600 mt-1">Manage your customer relationships</p>
        </div>
        <button className="btn-primary">
          <Plus className="w-4 h-4 mr-2" />
          Add Customer
        </button>
      </div>

      {/* Search */}
      <div className="card">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search customers by name, company, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
          />
        </div>
      </div>

      {/* Customers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCustomers.map((customer) => (
          <div key={customer.id} className="card hover:shadow-lg transition-shadow duration-200">
            {/* Customer Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{customer.name}</h3>
                  <p className="text-sm text-gray-600">{customer.company}</p>
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

            {/* Contact Info */}
            <div className="space-y-3 mb-4">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">{customer.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">{customer.phone}</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                <span className="text-sm text-gray-600">{customer.address}</span>
              </div>
            </div>

            {/* Stats */}
            <div className="border-t pt-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-lg font-semibold text-primary-600">{customer.totalInvoices}</div>
                  <div className="text-xs text-gray-500">Invoices</div>
                </div>
                <div>
                  <div className="text-lg font-semibold text-success-600">
                    ${customer.totalSpent.toLocaleString('en-US', { minimumFractionDigits: 0 })}
                  </div>
                  <div className="text-xs text-gray-500">Total Spent</div>
                </div>
                <div>
                  <div className="text-lg font-semibold text-warning-600">
                    ${(customer.totalSpent / customer.totalInvoices).toLocaleString('en-US', { minimumFractionDigits: 0 })}
                  </div>
                  <div className="text-xs text-gray-500">Avg. Invoice</div>
                </div>
              </div>
            </div>

            {/* Last Invoice */}
            <div className="mt-4 pt-4 border-t">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Last Invoice:</span>
                <span className="font-medium text-gray-900">{customer.lastInvoice}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card text-center">
          <div className="text-2xl font-bold text-primary-600">{customers.length}</div>
          <div className="text-sm text-gray-600">Total Customers</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-success-600">
            ${customers.reduce((sum, c) => sum + c.totalSpent, 0).toLocaleString('en-US', { minimumFractionDigits: 0 })}
          </div>
          <div className="text-sm text-gray-600">Total Revenue</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-warning-600">
            {customers.reduce((sum, c) => sum + c.totalInvoices, 0)}
          </div>
          <div className="text-sm text-gray-600">Total Invoices</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-purple-600">
            ${(customers.reduce((sum, c) => sum + c.totalSpent, 0) / customers.length).toLocaleString('en-US', { minimumFractionDigits: 0 })}
          </div>
          <div className="text-sm text-gray-600">Avg. Customer Value</div>
        </div>
      </div>
    </div>
  );
};

export default Customers;
