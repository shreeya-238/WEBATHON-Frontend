import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CompanySignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: '',
    ownerName: '',
    email: '',
    phone: '',
    password: '',
    companyAddress: '',
    city: '',
    state: '',
    pincode: '',
    panNumber: '',
    gstinNumber: '',
    businessType: '',
    businessDescription: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const businessTypes = [
    'Manufacturing',
    'Retail',
    'Wholesale',
    'Service',
    'Technology',
    'Healthcare',
    'Food & Beverage',
    'Fashion',
    'Automotive',
    'Other'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Form submission - Mock signup without backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate processing time
    setTimeout(() => {
      // Store user data in localStorage to simulate login
      const userData = {
        role: 'company',
        companyName: formData.companyName,
        ownerName: formData.ownerName,
        email: formData.email
      };
      localStorage.setItem('user', JSON.stringify(userData));
      
      // Success - Show popup and navigate to products page
      alert('Account created successfully!');
      navigate('/products');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/products" className="flex justify-center mb-6">
          <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mr-3">
            <span className="text-white text-2xl font-bold">L</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">LetsGo</h1>
        </Link>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your company account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <Link to="/auth/company-login" className="font-medium text-indigo-600 hover:text-indigo-500">
            sign in to your existing account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {errors.submit && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {errors.submit}
              </div>
            )}

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                  Company Name *
                </label>
                <input
                  id="companyName"
                  name="companyName"
                  type="text"
                  required
                  value={formData.companyName}
                  onChange={handleChange}
                    className={`mt-1 block w-full border rounded-md px-3 py-2 ${
                    errors.companyName ? 'border-red-300' : 'border-gray-300'
                  } focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                  placeholder="Enter company name"
                />
                {errors.companyName && (
                  <p className="mt-1 text-sm text-red-600">{errors.companyName}</p>
                )}
              </div>

              <div>
                <label htmlFor="ownerName" className="block text-sm font-medium text-gray-700">
                  Owner Name *
                </label>
                <input
                  id="ownerName"
                  name="ownerName"
                  type="text"
                  required
                  value={formData.ownerName}
                  onChange={handleChange}
                    className={`mt-1 block w-full border rounded-md px-3 py-2 ${
                    errors.ownerName ? 'border-red-300' : 'border-gray-300'
                  } focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                  placeholder="Enter owner name"
                />
                {errors.ownerName && (
                  <p className="mt-1 text-sm text-red-600">{errors.ownerName}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                    className={`mt-1 block w-full border rounded-md px-3 py-2 ${
                    errors.email ? 'border-red-300' : 'border-gray-300'
                  } focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                  placeholder="Enter email address"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone Number *
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                    className={`mt-1 block w-full border rounded-md px-3 py-2 ${
                    errors.phone ? 'border-red-300' : 'border-gray-300'
                  } focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                  placeholder="Enter 10-digit phone number"
                  maxLength="10"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password *
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className={`mt-1 block w-full border rounded-md px-3 py-2 ${
                  errors.password ? 'border-red-300' : 'border-gray-300'
                } focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                placeholder="Minimum 8 characters with number and special character"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                Password must be at least 8 characters long and contain at least one number and one special character (!@#$%^&*)
              </p>
            </div>

            <div>
              <label htmlFor="companyAddress" className="block text-sm font-medium text-gray-700">
                Company Address *
              </label>
              <textarea
                id="companyAddress"
                name="companyAddress"
                required
                value={formData.companyAddress}
                onChange={handleChange}
                rows="3"
                className={`mt-1 block w-full border rounded-md px-3 py-2 ${
                  errors.companyAddress ? 'border-red-300' : 'border-gray-300'
                } focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                placeholder="Enter company complete address"
              />
              {errors.companyAddress && (
                <p className="mt-1 text-sm text-red-600">{errors.companyAddress}</p>
              )}
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                  City *
                </label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  required
                  value={formData.city}
                  onChange={handleChange}
                    className={`mt-1 block w-full border rounded-md px-3 py-2 ${
                    errors.city ? 'border-red-300' : 'border-gray-300'
                  } focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                  placeholder="Enter city"
                />
                {errors.city && (
                  <p className="mt-1 text-sm text-red-600">{errors.city}</p>
                )}
              </div>

              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                  State *
                </label>
                <input
                  id="state"
                  name="state"
                  type="text"
                  required
                  value={formData.state}
                  onChange={handleChange}
                    className={`mt-1 block w-full border rounded-md px-3 py-2 ${
                    errors.state ? 'border-red-300' : 'border-gray-300'
                  } focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                  placeholder="Enter state"
                />
                {errors.state && (
                  <p className="mt-1 text-sm text-red-600">{errors.state}</p>
                )}
              </div>

              <div>
                <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">
                  Pincode *
                </label>
                <input
                  id="pincode"
                  name="pincode"
                  type="text"
                  required
                  value={formData.pincode}
                  onChange={handleChange}
                    className={`mt-1 block w-full border rounded-md px-3 py-2 ${
                    errors.pincode ? 'border-red-300' : 'border-gray-300'
                  } focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                  placeholder="Enter 6-digit pincode"
                  maxLength="6"
                />
                {errors.pincode && (
                  <p className="mt-1 text-sm text-red-600">{errors.pincode}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="panNumber" className="block text-sm font-medium text-gray-700">
                  PAN Number *
                </label>
                <input
                  id="panNumber"
                  name="panNumber"
                  type="text"
                  required
                  value={formData.panNumber}
                  onChange={handleChange}
                    className={`mt-1 block w-full border rounded-md px-3 py-2 ${
                    errors.panNumber ? 'border-red-300' : 'border-gray-300'
                  } focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                  placeholder="e.g., ABCDE1234F"
                  maxLength="10"
                />
                {errors.panNumber && (
                  <p className="mt-1 text-sm text-red-600">{errors.panNumber}</p>
                )}
                <p className="mt-1 text-xs text-gray-500">
                  Format: ABCDE1234F (5 letters + 4 numbers + 1 letter)
                </p>
              </div>

              <div>
                <label htmlFor="gstinNumber" className="block text-sm font-medium text-gray-700">
                  GSTIN *
                </label>
                <input
                  id="gstinNumber"
                  name="gstinNumber"
                  type="text"
                  required
                  value={formData.gstinNumber}
                  onChange={handleChange}
                    className={`mt-1 block w-full border rounded-md px-3 py-2 ${
                    errors.gstinNumber ? 'border-red-300' : 'border-gray-300'
                  } focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                  placeholder="Enter 15-character GSTIN"
                  maxLength="15"
                />
                {errors.gstinNumber && (
                  <p className="mt-1 text-sm text-red-600">{errors.gstinNumber}</p>
                )}
                <p className="mt-1 text-xs text-gray-500">
                  Format: 15 characters (numbers and letters)
                </p>
              </div>
            </div>

            <div>
              <label htmlFor="businessType" className="block text-sm font-medium text-gray-700">
                Business Type *
              </label>
              <select
                id="businessType"
                name="businessType"
                required
                value={formData.businessType}
                onChange={handleChange}
                className={`mt-1 block w-full border rounded-md px-3 py-2 ${
                  errors.businessType ? 'border-red-300' : 'border-gray-300'
                } focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
              >
                <option value="">Select business type</option>
                {businessTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.businessType && (
                <p className="mt-1 text-sm text-red-600">{errors.businessType}</p>
              )}
            </div>

            <div>
              <label htmlFor="businessDescription" className="block text-sm font-medium text-gray-700">
                Business Description *
              </label>
              <textarea
                id="businessDescription"
                name="businessDescription"
                required
                value={formData.businessDescription}
                onChange={handleChange}
                rows="4"
                maxLength="500"
                className={`mt-1 block w-full border rounded-md px-3 py-2 ${
                  errors.businessDescription ? 'border-red-300' : 'border-gray-300'
                } focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                placeholder="Describe your business (max 500 characters)"
              />
              {errors.businessDescription && (
                <p className="mt-1 text-sm text-red-600">{errors.businessDescription}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                {formData.businessDescription.length}/500 characters
              </p>
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Creating Company Account...' : 'Create Company Account'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CompanySignup;
