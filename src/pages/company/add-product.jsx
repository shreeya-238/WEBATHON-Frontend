import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Package, 
  Save,
  AlertCircle,
  CheckCircle,
  Plus,
  X
} from 'lucide-react';

const AddProduct = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  
  // Form state
  const [formData, setFormData] = useState({
    product_id: '',
    name: '',
    brand: '',
    category: '',
    subcategory: '',
    description: '',
    price: '',
    currency: 'USD',
    image_url: '',
    barcode: '',
    specifications: {},
    trust_badges: []
  });

  // Dynamic specification fields
  const [specificationFields, setSpecificationFields] = useState([{ key: '', value: '' }]);
  
  // Dynamic trust badge fields
  const [trustBadgeFields, setTrustBadgeFields] = useState(['']);

  const categories = [
    'Electronics',
    'Fashion',
    'Home & Garden',
    'Sports & Outdoors',
    'Automotive',
    'Food & Beverages',
    'Books & Media',
    'Gaming',
    'Tools & Hardware',
    'Health & Beauty'
  ];

  const currencies = ['USD', 'EUR', 'GBP', 'INR', 'JPY', 'CAD', 'AUD'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSpecificationChange = (index, field, value) => {
    const newSpecs = [...specificationFields];
    newSpecs[index][field] = value;
    setSpecificationFields(newSpecs);
    
    // Update formData specifications
    const specifications = {};
    newSpecs.forEach(spec => {
      if (spec.key && spec.value) {
        specifications[spec.key] = spec.value;
      }
    });
    setFormData(prev => ({ ...prev, specifications }));
  };

  const addSpecificationField = () => {
    setSpecificationFields([...specificationFields, { key: '', value: '' }]);
  };

  const removeSpecificationField = (index) => {
    if (specificationFields.length > 1) {
      const newSpecs = specificationFields.filter((_, i) => i !== index);
      setSpecificationFields(newSpecs);
      
      // Update formData specifications
      const specifications = {};
      newSpecs.forEach(spec => {
        if (spec.key && spec.value) {
          specifications[spec.key] = spec.value;
        }
      });
      setFormData(prev => ({ ...prev, specifications }));
    }
  };

  const handleTrustBadgeChange = (index, value) => {
    const newBadges = [...trustBadgeFields];
    newBadges[index] = value;
    setTrustBadgeFields(newBadges);
    
    // Update formData trust_badges
    const trust_badges = newBadges.filter(badge => badge.trim() !== '');
    setFormData(prev => ({ ...prev, trust_badges }));
  };

  const addTrustBadgeField = () => {
    setTrustBadgeFields([...trustBadgeFields, '']);
  };

  const removeTrustBadgeField = (index) => {
    if (trustBadgeFields.length > 1) {
      const newBadges = trustBadgeFields.filter((_, i) => i !== index);
      setTrustBadgeFields(newBadges);
      
      // Update formData trust_badges
      const trust_badges = newBadges.filter(badge => badge.trim() !== '');
      setFormData(prev => ({ ...prev, trust_badges }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.product_id.trim()) {
      setError('Product ID is required');
      return;
    }
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
                <label htmlFor="product_id" className="block text-sm font-medium text-gray-700 mb-2">
                  Product ID *
                </label>
                <input
                  type="text"
                  id="product_id"
                  name="product_id"
                  value={formData.product_id}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter unique product ID"
                  required
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

            {/* Specifications */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-medium text-gray-700">
                  Specifications
                </label>
                <button
                  type="button"
                  onClick={addSpecificationField}
                  className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Specification</span>
                </button>
              </div>
              <div className="space-y-3">
                {specificationFields.map((spec, index) => (
                  <div key={index} className="flex space-x-3">
                    <input
                      type="text"
                      value={spec.key}
                      onChange={(e) => handleSpecificationChange(index, 'key', e.target.value)}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Specification name (e.g., Weight)"
                    />
                    <input
                      type="text"
                      value={spec.value}
                      onChange={(e) => handleSpecificationChange(index, 'value', e.target.value)}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Specification value (e.g., 2.5kg)"
                    />
                    {specificationFields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSpecificationField(index)}
                        className="px-3 py-3 text-red-600 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Trust Badges */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-medium text-gray-700">
                  Trust Badges
                </label>
                <button
                  type="button"
                  onClick={addTrustBadgeField}
                  className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Badge</span>
                </button>
              </div>
              <div className="space-y-3">
                {trustBadgeFields.map((badge, index) => (
                  <div key={index} className="flex space-x-3">
                    <input
                      type="text"
                      value={badge}
                      onChange={(e) => handleTrustBadgeChange(index, e.target.value)}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter trust badge (e.g., ISO Certified)"
                    />
                    {trustBadgeFields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeTrustBadgeField(index)}
                        className="px-3 py-3 text-red-600 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
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
