import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Package, 
  Save,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

const AddProduct = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  
  // Form state
  const [formData, setFormData] = useState({
    id: `PROD-${Date.now()}`, // Auto-generated ID
    name: '',
    brand: '',
    category: '',
    subcategory: '',
    description: '',
    price: '',
    currency: 'INR',
    image_url: '',
    barcode: '',
    specifications: {},
    made_in_india: false,
    eco_friendly: false,
    FSSAI_certified: false
  });

  const categories = [
    'Fashion',
    'Food & Beverages',
    'Electronics',
    'Personal Care',
    'Home & Kitchen',
    'Health & Wellness'
  ];

  const currencies = ['INR', 'USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD'];

  // Dynamic specifications based on category
  const categorySpecifications = {
    'Fashion': ['gender', 'season', 'colour'],
    'Food & Beverages': ['weight_volume', 'shelf_life', 'vegetarian'],
    'Electronics': ['warranty', 'power', 'connectivity'],
    'Personal Care': ['volume', 'skin_type', 'shelf_life'],
    'Home & Kitchen': ['material', 'warranty', 'dimension'],
    'Health & Wellness': ['serving_size', 'capsules_daily', 'quantity']
  };

  // Update specifications when category changes
  useEffect(() => {
    if (formData.category && categorySpecifications[formData.category]) {
      const newSpecs = {};
      categorySpecifications[formData.category].forEach(field => {
        newSpecs[field] = formData.specifications[field] || '';
      });
      setFormData(prev => ({ ...prev, specifications: newSpecs }));
    }
  }, [formData.category]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSpecificationChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      specifications: {
        ...prev.specifications,
        [field]: value
      }
    }));
  };

  const handleBooleanChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim()) {
      setError('Product name is required');
      return;
    }
    if (!formData.brand.trim()) {
      setError('Brand is required');
      return;
    }
    if (!formData.category) {
      setError('Category is required');
      return;
    }
    if (!formData.description.trim()) {
      setError('Description is required');
      return;
    }
    if (!formData.price.trim()) {
      setError('Price is required');
      return;
    }

    try {
      setSubmitting(true);
      setError('');

      // Mock API call - replace with actual API endpoint
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        created_at: new Date().toISOString(),
        status: 'Active'
      };

      console.log('Submitting product:', productData);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmitted(true);
      
      // Redirect back to dashboard after 2 seconds
      setTimeout(() => {
        navigate('/company/dashboard');
      }, 2000);

    } catch (error) {
      console.error('Error adding product:', error);
      setError('Failed to add product. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-sm border p-8 text-center max-w-md">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Added Successfully!</h2>
          <p className="text-gray-600 mb-4">
            Your product has been added to the catalog and is now available for customers.
          </p>
          <p className="text-sm text-gray-500">
            Redirecting you back to the dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-4">
            <Link to="/company/dashboard" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Dashboard</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Form Header */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Package className="h-6 w-6 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
          </div>
          <p className="text-gray-600">
            Fill in the details below to add a new product to your catalog.
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-red-500" />
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="id" className="block text-sm font-medium text-gray-700 mb-2">
                  Product ID (Auto-generated)
                </label>
                <input
                  type="text"
                  id="id"
                  name="id"
                  value={formData.id}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed"
                  disabled
                />
              </div>

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter product name"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-2">
                  Brand *
                </label>
                <input
                  type="text"
                  id="brand"
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter brand name"
                  required
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="subcategory" className="block text-sm font-medium text-gray-700 mb-2">
                Subcategory
              </label>
              <input
                type="text"
                id="subcategory"
                name="subcategory"
                value={formData.subcategory}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter subcategory (optional)"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                placeholder="Enter detailed product description"
                required
              />
            </div>

            {/* Price and Currency */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                  Price *
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  step="0.01"
                  min="0"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter price"
                  required
                />
              </div>

              <div>
                <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-2">
                  Currency
                </label>
                <select
                  id="currency"
                  name="currency"
                  value={formData.currency}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {currencies.map((currency) => (
                    <option key={currency} value={currency}>
                      {currency}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Image URL and Barcode */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="image_url" className="block text-sm font-medium text-gray-700 mb-2">
                  Image URL
                </label>
                <input
                  type="url"
                  id="image_url"
                  name="image_url"
                  value={formData.image_url}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter image URL"
                />
              </div>

              <div>
                <label htmlFor="barcode" className="block text-sm font-medium text-gray-700 mb-2">
                  Barcode
                </label>
                <input
                  type="text"
                  id="barcode"
                  name="barcode"
                  value={formData.barcode}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter barcode"
                />
              </div>
            </div>

            {/* Dynamic Specifications based on Category */}
            {formData.category && categorySpecifications[formData.category] && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Category Specifications
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {categorySpecifications[formData.category].map((field) => (
                    <div key={field}>
                      <label htmlFor={field} className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                        {field.replace('_', ' / ')} {field === 'vegetarian' ? '' : '*'}
                      </label>
                      {field === 'vegetarian' ? (
                        <div className="flex space-x-4">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="vegetarian"
                              value="true"
                              checked={formData.specifications.vegetarian === 'true'}
                              onChange={(e) => handleSpecificationChange('vegetarian', e.target.value)}
                              className="mr-2"
                            />
                            Yes
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="vegetarian"
                              value="false"
                              checked={formData.specifications.vegetarian === 'false'}
                              onChange={(e) => handleSpecificationChange('vegetarian', e.target.value)}
                              className="mr-2"
                            />
                            No
                          </label>
                        </div>
                      ) : (
                        <input
                          type="text"
                          id={field}
                          value={formData.specifications[field] || ''}
                          onChange={(e) => handleSpecificationChange(field, e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder={`Enter ${field.replace('_', ' / ')}`}
                          required
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Boolean Toggles */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Product Certifications
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Made in India */}
                <div className="flex items-center justify-between p-4 border border-gray-300 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">Made in India</span>
                  <button
                    type="button"
                    onClick={() => handleBooleanChange('made_in_india', !formData.made_in_india)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      formData.made_in_india ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        formData.made_in_india ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {/* Eco Friendly */}
                <div className="flex items-center justify-between p-4 border border-gray-300 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">Eco Friendly</span>
                  <button
                    type="button"
                    onClick={() => handleBooleanChange('eco_friendly', !formData.eco_friendly)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      formData.eco_friendly ? 'bg-green-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        formData.eco_friendly ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {/* FSSAI Certified - only show for Food & Beverages or Personal Care */}
                {(formData.category === 'Food & Beverages' || formData.category === 'Personal Care') && (
                  <div className="flex items-center justify-between p-4 border border-gray-300 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">FSSAI Certified</span>
                    <button
                      type="button"
                      onClick={() => handleBooleanChange('FSSAI_certified', !formData.FSSAI_certified)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        formData.FSSAI_certified ? 'bg-orange-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          formData.FSSAI_certified ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <Link
                to="/company/dashboard"
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={submitting}
                className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Adding Product...</span>
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    <span>Add Product</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
