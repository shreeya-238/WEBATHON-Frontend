import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  User, 
  MessageSquare, 
  Send,
  AlertCircle,
  CheckCircle,
  XCircle
} from 'lucide-react';
import StarRating from '../../components/StarRating.jsx';

const ReviewForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [rejected, setRejected] = useState(false);
  const [error, setError] = useState('');
  
  // Form state
  const [formData, setFormData] = useState({
    user_name: '',
    text: '', // Changed from review_text to text
    overall_rating: 0,
    ratings: {} // Changed from criteria_ratings to ratings
  });

  const categoryCriteria = [
    {
      category: "Food & Beverages",
      criteria: ["Safety", "Freshness", "Taste/Nutrition"],
    },
    {
      category: "Cosmetics & Personal Care",
      criteria: ["Safety", "Effectiveness", "Skin Compatibility"],
    },
    {
      category: "Clothing & Apparel",
      criteria: ["Material Quality", "Size & Fit", "Durability"],
    },
    {
      category: "Electronics & Gadgets",
      criteria: ["Performance", "Durability", "Safety"],
    },
    {
      category: "Home Appliances",
      criteria: ["Performance", "Durability", "Safety"],
    },
    {
      category: "Toys & Baby Products",
      criteria: ["Safety", "Build Quality", "Durability"],
    },
    {
      category: "Furniture & Home Décor",
      criteria: ["Material Quality", "Durability", "Size/Dimensions"],
    },
    {
      category: "Pharmaceuticals & Health Products",
      criteria: ["Safety", "Effectiveness", "Label Accuracy"],
    },
  ];

  const getCriteriaForCategory = (category) => {
    if (!category) return [];
    const exact = categoryCriteria.find(c => c.category === category);
    if (exact) return exact.criteria;
    const normalized = category.toLowerCase();
    const fuzzy = categoryCriteria.find(c => normalized.includes(c.category.toLowerCase().split('&')[0].trim()));
    return fuzzy ? fuzzy.criteria : [];
  };

  // Check if user is authenticated (mock implementation)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Mock authentication check - replace with actual auth logic
    const checkAuth = () => {
      const user = localStorage.getItem('currentUser');
      if (user) {
        const userData = JSON.parse(user);
        setIsAuthenticated(true);
        setCurrentUser(userData);
        setFormData(prev => ({
          ...prev,
          user_name: userData.name || userData.username || ''
        }));
      } else {
        setIsAuthenticated(false);
      }
    };

    // Fetch product details - REPLACE WITH ACTUAL API CALL
    const fetchProduct = async () => {
      try {
        setLoading(true);
        // TODO: Replace with actual API call to your backend
        // const response = await fetch(`http://localhost:5000/api/products/${id}`);
        // const productData = await response.json();
        
        // Mock product data for now
        const mockProduct = {
          _id: id,
          name: "Organic Almond Milk",
          brand: "GreenHarvest",
          category: "Food & Beverages",
          image_url: "https://images.unsplash.com/photo-1544025162-d76694265947?w=500&auto=format&fit=crop&q=60"
        };
        setProduct(mockProduct);
      } catch (error) {
        console.error('Error fetching product:', error);
        setError('Failed to load product details');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
    fetchProduct();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.text.trim()) {
      setError('Please enter your review');
      return;
    }

    if (!formData.user_name.trim()) {
      setError('Please enter your name');
      return;
    }

    if (formData.overall_rating === 0) {
      setError('Please provide an overall rating');
      return;
    }

    try {
      setSubmitting(true);
      setError('');
      setRejected(false);

      // Prepare review data for backend
      const reviewData = {
        productId: id, // Changed from product_id to productId
        user_name: formData.user_name,
        text: formData.text, // Changed from review_text to text
        overall_rating: formData.overall_rating,
        ratings: formData.ratings, // Changed from criteria_ratings to ratings
        // userId will be added when authentication is implemented
      };

      console.log('Submitting review:', reviewData);
      
      // ACTUAL API CALL TO YOUR BACKEND
      const response = await fetch('http://localhost:5000/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      });

      const result = await response.json();
      
      if (response.ok && result.success) {
        console.log('Review submitted successfully:', result);
        setSubmitted(true);
        
        // Redirect back to product page after 3 seconds
        setTimeout(() => {
          navigate(`/product/${id}`);
        }, 3000);
        
      } else {
        // Handle rejection by ML pipeline
        if (result.rejected) {
          setRejected(true);
          setError(result.message + (result.reason ? `: ${result.reason}` : ''));
        } else {
          setError(result.message || 'Failed to submit review. Please try again.');
        }
      }

    } catch (error) {
      console.error('Error submitting review:', error);
      setError('Failed to connect to server. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-sm border p-8 text-center max-w-md">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Review Submitted!</h2>
          <p className="text-gray-600 mb-4">
            Thank you for your review. It has passed our moderation system and will help other customers make informed decisions.
          </p>
          <p className="text-sm text-gray-500">
            Redirecting you back to the product page...
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
            <Link to={`/product/${id}`} className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Product</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Product Info */}
        {product && (
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
            <div className="flex items-center space-x-4">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-16 h-16 object-cover rounded-lg"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/64x64?text=No+Image";
                }}
              />
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{product.name}</h2>
                <p className="text-gray-600">by {product.brand}</p>
              </div>
            </div>
          </div>
        )}

        {/* Review Form */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center space-x-3 mb-6">
            <MessageSquare className="h-6 w-6 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Write a Review</h1>
          </div>

          {error && (
            <div className={`mb-6 p-4 border rounded-lg ${rejected ? 'bg-red-50 border-red-200' : 'bg-red-50 border-red-200'}`}>
              <div className="flex items-center space-x-2">
                {rejected ? (
                  <XCircle className="h-5 w-5 text-red-500" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-500" />
                )}
                <p className="text-red-700">{error}</p>
              </div>
              {rejected && (
                <p className="text-sm text-red-600 mt-2">
                  Please modify your review to comply with our community guidelines and try again.
                </p>
              )}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* User Name */}
            <div>
              <label htmlFor="user_name" className="block text-sm font-medium text-gray-700 mb-2">
                <User className="h-4 w-4 inline mr-2" />
                Your Name
              </label>
              <input
                type="text"
                id="user_name"
                name="user_name"
                value={formData.user_name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your name"
                required
                disabled={currentUser && currentUser.name}
              />
              {currentUser && currentUser.name && (
                <p className="mt-1 text-sm text-gray-500">
                  Name automatically filled from your account
                </p>
              )}
            </div>

            {/* Overall Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Overall Rating *
              </label>
              <StarRating
                value={formData.overall_rating}
                onChange={(val) => setFormData(prev => ({ ...prev, overall_rating: val }))}
                name="overall_rating"
              />
            </div>

            {/* Criteria Ratings by Category */}
            {product?.category && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rate by Criteria ({product.category})
                </label>
                <div className="space-y-3">
                  {getCriteriaForCategory(product.category).map((crit) => (
                    <div key={crit} className="flex items-center justify-between">
                      <span className="text-sm text-gray-700 mr-4">{crit}</span>
                      <StarRating
                        value={formData.ratings[crit] || 0}
                        onChange={(val) => setFormData(prev => ({
                          ...prev,
                          ratings: { ...prev.ratings, [crit]: val }
                        }))}
                        name={`criteria_${crit}`}
                        size={20}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Review Text */}
            <div>
              <label htmlFor="text" className="block text-sm font-medium text-gray-700 mb-2">
                Overall Description *
              </label>
              <textarea
                id="text"
                name="text"
                value={formData.text}
                onChange={handleInputChange}
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                placeholder="Share your overall experience. Include details that explain your ratings."
                required
              />
              <p className="mt-1 text-sm text-gray-500">
                {formData.text.length}/1000 characters
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <Link
                to={`/product/${id}`}
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
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>Submit Review</span>
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

export default ReviewForm;