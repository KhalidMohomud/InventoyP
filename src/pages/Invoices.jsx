import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Edit, 
  Trash2,
  Plus,
  MoreHorizontal
} from 'lucide-react';

const Invoices = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const invoices = [
    {
      id: 'INV-001',
      customer: 'ABC Manufacturing Co.',
      amount: 2450.00,
      status: 'Paid',
      issueDate: '2024-01-15',
      dueDate: '2024-02-14',
      items: 5
    },
    {
      id: 'INV-002',
      customer: 'XYZ Industries Ltd.',
      amount: 1890.00,
      status: 'Pending',
      issueDate: '2024-01-14',
      dueDate: '2024-02-13',
      items: 3
    },
    {
      id: 'INV-003',
      customer: 'Tech Solutions Inc.',
      amount: 3200.00,
      status: 'Paid',
      issueDate: '2024-01-13',
      dueDate: '2024-02-12',
      items: 7
    },
    {
      id: 'INV-004',
      customer: 'Global Parts Corp.',
      amount: 950.00,
      status: 'Overdue',
      issueDate: '2024-01-10',
      dueDate: '2024-02-09',
      items: 2
    },
    {
      id: 'INV-005',
      customer: 'Metal Works LLC',
      amount: 1750.00,
      status: 'Draft',
      issueDate: '2024-01-12',
      dueDate: '2024-02-11',
      items: 4
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
      case 'Draft':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Invoices</h1>
          <p className="text-gray-600 mt-1">Manage and track all your invoices</p>
        </div>
        <button className="btn-primary">
          <Plus className="w-4 h-4 mr-2" />
          Create Invoice
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
                placeholder="Search invoices by customer or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="input-field"
            >
              <option value="all">All Status</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
              <option value="Overdue">Overdue</option>
              <option value="Draft">Draft</option>
            </select>
            <button className="btn-secondary">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </button>
          </div>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="table-header">Invoice</th>
                <th className="table-header">Customer</th>
                <th className="table-header">Amount</th>
                <th className="table-header">Status</th>
                <th className="table-header">Issue Date</th>
                <th className="table-header">Due Date</th>
                <th className="table-header">Items</th>
                <th className="table-header">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50">
                  <td className="table-cell">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                          <span className="text-sm font-medium text-primary-600">
                            {invoice.id.split('-')[1]}
                          </span>
                        </div>
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{invoice.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="table-cell">
                    <div className="text-sm font-medium text-gray-900">{invoice.customer}</div>
                  </td>
                  <td className="table-cell">
                    <div className="text-sm font-semibold text-gray-900">
                      ${invoice.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </div>
                  </td>
                  <td className="table-cell">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(invoice.status)}`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="table-cell">
                    <div className="text-sm text-gray-900">{invoice.issueDate}</div>
                  </td>
                  <td className="table-cell">
                    <div className="text-sm text-gray-900">{invoice.dueDate}</div>
                  </td>
                  <td className="table-cell">
                    <div className="text-sm text-gray-900">{invoice.items} items</div>
                  </td>
                  <td className="table-cell">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-warning-600 hover:text-warning-700 hover:bg-warning-50 rounded">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-success-600 hover:text-success-700 hover:bg-success-50 rounded">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-3 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center text-sm text-gray-700">
            <span>Showing 1 to {filteredInvoices.length} of {filteredInvoices.length} results</span>
          </div>
          <div className="flex items-center space-x-2">
            <button className="btn-secondary px-3 py-1 text-sm">Previous</button>
            <button className="btn-primary px-3 py-1 text-sm">1</button>
            <button className="btn-secondary px-3 py-1 text-sm">Next</button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card text-center">
          <div className="text-2xl font-bold text-success-600">
            {invoices.filter(inv => inv.status === 'Paid').length}
          </div>
          <div className="text-sm text-gray-600">Paid Invoices</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-warning-600">
            {invoices.filter(inv => inv.status === 'Pending').length}
          </div>
          <div className="text-sm text-gray-600">Pending Invoices</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-danger-600">
            {invoices.filter(inv => inv.status === 'Overdue').length}
          </div>
          <div className="text-sm text-gray-600">Overdue Invoices</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-gray-600">
            {invoices.filter(inv => inv.status === 'Draft').length}
          </div>
          <div className="text-sm text-gray-600">Draft Invoices</div>
        </div>
      </div>
    </div>
  );
};

export default Invoices;
