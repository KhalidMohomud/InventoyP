import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  Save, 
  Download, 
  Send,
  User,
  Building,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';

const CreateInvoice = () => {
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: 'INV-001',
    issueDate: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    customer: {
      name: '',
      company: '',
      email: '',
      phone: '',
      address: ''
    },
    items: [
      {
        id: 1,
        description: '',
        quantity: 1,
        unitPrice: 0,
        total: 0
      }
    ],
    notes: '',
    terms: 'Net 30'
  });

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const customers = [
    { id: 1, name: 'John Doe', company: 'ABC Manufacturing Co.', email: 'john@abc.com', phone: '+1-555-0123', address: '123 Industrial Blvd, City, State 12345' },
    { id: 2, name: 'Jane Smith', company: 'XYZ Industries Ltd.', email: 'jane@xyz.com', phone: '+1-555-0456', address: '456 Factory Lane, City, State 12345' },
    { id: 3, name: 'Mike Johnson', company: 'Tech Solutions Inc.', email: 'mike@tech.com', phone: '+1-555-0789', address: '789 Innovation Drive, City, State 12345' }
  ];

  const products = [
    { id: 1, name: 'Steel Plates', description: 'High-grade steel plates 1/4" thick', unitPrice: 45.50 },
    { id: 2, name: 'Aluminum Bars', description: '6061-T6 aluminum bars 1" diameter', unitPrice: 12.75 },
    { id: 3, name: 'Copper Wire', description: 'Copper wire 12 AWG, 100ft spool', unitPrice: 28.90 },
    { id: 4, name: 'PVC Pipes', description: 'Schedule 40 PVC pipes 2" diameter', unitPrice: 8.25 }
  ];

  const addItem = () => {
    const newItem = {
      id: Date.now(),
      description: '',
      quantity: 1,
      unitPrice: 0,
      total: 0
    };
    setInvoiceData(prev => ({
      ...prev,
      items: [...prev.items, newItem]
    }));
  };

  const removeItem = (id) => {
    if (invoiceData.items.length > 1) {
      setInvoiceData(prev => ({
        ...prev,
        items: prev.items.filter(item => item.id !== id)
      }));
    }
  };

  const updateItem = (id, field, value) => {
    setInvoiceData(prev => ({
      ...prev,
      items: prev.items.map(item => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };
          if (field === 'quantity' || field === 'unitPrice') {
            updatedItem.total = updatedItem.quantity * updatedItem.unitPrice;
          }
          return updatedItem;
        }
        return item;
      })
    }));
  };

  const selectCustomer = (customer) => {
    setSelectedCustomer(customer);
    setInvoiceData(prev => ({
      ...prev,
      customer: {
        name: customer.name,
        company: customer.company,
        email: customer.email,
        phone: customer.phone,
        address: customer.address
      }
    }));
  };

  const selectProduct = (product, itemId) => {
    setInvoiceData(prev => ({
      ...prev,
      items: prev.items.map(item => {
        if (item.id === itemId) {
          return {
            ...item,
            description: product.name,
            unitPrice: product.unitPrice,
            total: item.quantity * product.unitPrice
          };
        }
        return item;
      })
    }));
  };

  const calculateSubtotal = () => {
    return invoiceData.items.reduce((sum, item) => sum + item.total, 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.08; // 8% tax rate
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Create Invoice</h1>
          <p className="text-gray-600 mt-1">Generate a new invoice for your customer</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="btn-secondary">
            <Save className="w-4 h-4 mr-2" />
            Save Draft
          </button>
          <button className="btn-primary">
            <Send className="w-4 h-4 mr-2" />
            Send Invoice
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Invoice Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Invoice Details */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Invoice Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Invoice Number</label>
                <input
                  type="text"
                  value={invoiceData.invoiceNumber}
                  onChange={(e) => setInvoiceData(prev => ({ ...prev, invoiceNumber: e.target.value }))}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Issue Date</label>
                <input
                  type="date"
                  value={invoiceData.issueDate}
                  onChange={(e) => setInvoiceData(prev => ({ ...prev, issueDate: e.target.value }))}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
                <input
                  type="date"
                  value={invoiceData.dueDate}
                  onChange={(e) => setInvoiceData(prev => ({ ...prev, dueDate: e.target.value }))}
                  className="input-field"
                />
              </div>
            </div>
          </div>

          {/* Customer Selection */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Customer</label>
              <select
                className="input-field"
                onChange={(e) => {
                  const customer = customers.find(c => c.id === parseInt(e.target.value));
                  if (customer) selectCustomer(customer);
                }}
              >
                <option value="">Choose a customer...</option>
                {customers.map(customer => (
                  <option key={customer.id} value={customer.id}>
                    {customer.company} - {customer.name}
                  </option>
                ))}
              </select>
            </div>
            
            {selectedCustomer && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Customer Name</label>
                  <input
                    type="text"
                    value={invoiceData.customer.name}
                    onChange={(e) => setInvoiceData(prev => ({ 
                      ...prev, 
                      customer: { ...prev.customer, name: e.target.value }
                    }))}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                  <input
                    type="text"
                    value={invoiceData.customer.company}
                    onChange={(e) => setInvoiceData(prev => ({ 
                      ...prev, 
                      customer: { ...prev.customer, company: e.target.value }
                    }))}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={invoiceData.customer.email}
                    onChange={(e) => setInvoiceData(prev => ({ 
                      ...prev, 
                      customer: { ...prev.customer, email: e.target.value }
                    }))}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={invoiceData.customer.phone}
                    onChange={(e) => setInvoiceData(prev => ({ 
                      ...prev, 
                      customer: { ...prev.customer, phone: e.target.value }
                    }))}
                    className="input-field"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <textarea
                    value={invoiceData.customer.address}
                    onChange={(e) => setInvoiceData(prev => ({ 
                      ...prev, 
                      customer: { ...prev.customer, address: e.target.value }
                    }))}
                    className="input-field"
                    rows="2"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Invoice Items */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Invoice Items</h3>
              <button
                onClick={addItem}
                className="btn-secondary"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Item
              </button>
            </div>
            
            <div className="space-y-4">
              {invoiceData.items.map((item, index) => (
                <div key={item.id} className="grid grid-cols-12 gap-4 items-end p-4 bg-gray-50 rounded-lg">
                  <div className="col-span-5">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <select
                      className="input-field"
                      value={item.description}
                      onChange={(e) => {
                        const product = products.find(p => p.name === e.target.value);
                        if (product) {
                          selectProduct(product, item.id);
                        } else {
                          updateItem(item.id, 'description', e.target.value);
                        }
                      }}
                    >
                      <option value="">Select product or enter description...</option>
                      {products.map(product => (
                        <option key={product.id} value={product.name}>
                          {product.name} - ${product.unitPrice}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Qty</label>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 0)}
                      className="input-field"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Unit Price</label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={item.unitPrice}
                      onChange={(e) => updateItem(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                      className="input-field"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Total</label>
                    <input
                      type="text"
                      value={`$${item.total.toFixed(2)}`}
                      className="input-field bg-gray-100"
                      readOnly
                    />
                  </div>
                  <div className="col-span-1">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="w-full p-2 text-danger-600 hover:text-danger-700 hover:bg-danger-50 rounded-lg transition-colors duration-200"
                      disabled={invoiceData.items.length === 1}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notes and Terms */}
          <div className="card">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                <textarea
                  value={invoiceData.notes}
                  onChange={(e) => setInvoiceData(prev => ({ ...prev, notes: e.target.value }))}
                  className="input-field"
                  rows="3"
                  placeholder="Additional notes for the customer..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Payment Terms</label>
                <select
                  value={invoiceData.terms}
                  onChange={(e) => setInvoiceData(prev => ({ ...prev, terms: e.target.value }))}
                  className="input-field"
                >
                  <option value="Net 15">Net 15</option>
                  <option value="Net 30">Net 30</option>
                  <option value="Net 45">Net 45</option>
                  <option value="Net 60">Net 60</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Invoice Summary */}
        <div className="space-y-6">
          {/* Invoice Preview */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Invoice Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-medium">${calculateSubtotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax (8%):</span>
                <span className="font-medium">${calculateTax().toFixed(2)}</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-primary-600">${calculateTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
            <div className="space-y-3">
              <button className="w-full btn-primary">
                <Send className="w-4 h-4 mr-2" />
                Send Invoice
              </button>
              <button className="w-full btn-secondary">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </button>
              <button className="w-full btn-secondary">
                <Save className="w-4 h-4 mr-2" />
                Save Draft
              </button>
            </div>
          </div>

          {/* Customer Quick Info */}
          {selectedCustomer && (
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Quick Info</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Building className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{selectedCustomer.company}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{selectedCustomer.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{selectedCustomer.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{selectedCustomer.phone}</span>
                </div>
                <div className="flex items-start space-x-2">
                  <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                  <span className="text-sm text-gray-600">{selectedCustomer.address}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateInvoice;
