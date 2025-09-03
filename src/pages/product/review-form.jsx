import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import StarRating from '../../components/StarRating.jsx';
import axios from 'axios';

// --- Static category -> criteria mapping ---
const categoryCriteriaMap = {
  "Food & Beverages": ["Safety", "Freshness", "Taste/Nutrition"],
  "Cosmetics & Personal Care": ["Safety", "Effectiveness", "Skin Compatibility"],
  "Clothing & Apparel": ["Material Quality", "Size & Fit", "Durability"],
  "Electronics & Gadgets": ["Performance", "Durability", "Safety"],
  "Home Appliances": ["Performance", "Durability", "Safety"],
  "Toys & Baby Products": ["Safety", "Build Quality", "Durability"],
  "Furniture & Home Décor": ["Material Quality", "Durability", "Size/Dimensions"],
  "Pharmaceuticals & Health Products": ["Safety", "Effectiveness", "Label Accuracy"],
};

// --- Auth helper ---
const checkAuthentication = () => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  if (token && user) {
    try {
      return { token, user: JSON.parse(user) };
    } catch {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return null;
    }
  }
  return null;
};

const ReviewForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [rejected, setRejected] = useState(false);

  const [formData, setFormData] = useState({ text: '', overall_rating: 0, ratings: {} });
  const [authData, setAuthData] = useState(null);

  // --- Fetch product & check auth ---
  useEffect(() => {
    const auth = checkAuthentication();
    if (!auth) {
      navigate(`/login?returnUrl=${encodeURIComponent(window.location.pathname)}`);
      return;
    }
    setAuthData(auth);

    const fetchProduct = async () => {
      try {
        setLoading(true);
        const apiUrl = import.meta.env.VITE_API_URL;
        const res = await fetch(`${apiUrl}/products/${id}`);
        if (!res.ok) throw new Error('Failed to fetch product');
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error(err);
        setError('Failed to load product.');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, navigate]);

  // --- Handlers ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleCriteriaRating = (criterion, value) => {
    setFormData(prev => ({
      ...prev,
      ratings: { ...prev.ratings, [criterion]: value }
    }));
  };

  const validateForm = () => {
    if (!formData.text.trim()) { setError('Please enter your review'); return false; }
    if (formData.text.length < 10) { setError('Review must be at least 10 characters'); return false; }
    if (formData.text.length > 1000) { setError('Review cannot exceed 1000 characters'); return false; }
    if (formData.overall_rating === 0) { setError('Please provide an overall rating'); return false; }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm() || !authData) return;

    try {
      setSubmitting(true);
      setError('');
      setRejected(false);

      const apiUrl = import.meta.env.VITE_API_URL;
      const payload = {
      name: authData?.user?.name || 'Anonymous', // fallback to Anonymous if no auth
      productId: id,
      overall_rating: formData.overall_rating,
      ratings: formData.ratings,
      text: formData.text
    };

      const res = await fetch(`${apiUrl}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${authData.token}` },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (res.ok) {
        setSubmitted(true);
        setTimeout(() => navigate(`/products/${id}`), 3000);
      } else {
        setRejected(true);
        setError(result.message || 'Failed to submit review');
      }
    } catch (err) {
      console.error(err);
      setError('Server error. Try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  // --- Loading / Error / Submitted UI ---
  if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  if (!product) return <div className="flex justify-center items-center min-h-screen"><XCircle className="w-12 h-12 text-red-500" /> Product not found.</div>;
  if (submitted) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow text-center">
        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
        <h2 className="text-xl font-bold mb-2">Review Submitted!</h2>
        <p className="text-gray-600 mb-4">Thanks for your review. Redirecting...</p>
        <Link to={`/products/${id}`} className="text-blue-600 hover:underline">Go now</Link>
      </div>
    </div>
  );

  // --- Main Form UI ---
  const criteria = categoryCriteriaMap[product.category] || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link to={`/products/${id}`} className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Product</span>
          </Link>
          <div className="text-sm text-gray-600">Welcome, {authData.user.email}</div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8 flex items-center space-x-4">
          <img
            src={product.image_url || 'https://via.placeholder.com/64'}
            alt={product.name}
            className="w-16 h-16 object-cover rounded-lg"
          />
          <div>
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-500">{product.category}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          {error && (
            <div className="mb-6 p-4 border rounded-lg bg-red-50 border-red-200 flex items-center space-x-2">
              <XCircle className="h-5 w-5 text-red-500" />
              <p className="text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Overall Rating *</label>
              <StarRating value={formData.overall_rating} onChange={val => setFormData(prev => ({ ...prev, overall_rating: val }))} />
            </div>

            {criteria.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rate by Criteria ({product.category})</label>
                <div className="space-y-3">
                  {criteria.map(crit => (
                    <div key={crit} className="flex items-center justify-between">
                      <span>{crit}</span>
                      <StarRating
                        value={formData.ratings[crit] || 0}
                        onChange={val => handleCriteriaRating(crit, val)}
                        size={20}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Your Review *</label>
              <textarea
                name="text"
                value={formData.text}
                onChange={handleInputChange}
                rows={6}
                maxLength={1000}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-vertical"
                placeholder="Share your experience..."
              />
              <p className={`text-sm mt-1 ${formData.text.length > 900 ? 'text-red-500' : 'text-gray-500'}`}>
                {formData.text.length}/1000
              </p>
            </div>

            <div className="flex justify-end space-x-4">
              <Link to={`/products/${id}`} className="px-6 py-2 rounded-lg border border-gray-300 hover:bg-gray-100">Cancel</Link>
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {submitting ? 'Submitting...' : 'Submit Review'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;
