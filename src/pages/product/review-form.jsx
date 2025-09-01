import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Star, 
  User, 
  MessageSquare, 
  Send,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

const ReviewForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  
  // Form state
  const [formData, setFormData] = useState({
    user_name: '',
    review_text: ''
  });

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

    // Fetch product details
    const fetchProduct = async () => {
      try {
        setLoading(true);
        // Mock product data - replace with actual API call
        const mockProduct = {
          _id: id,
          name: "Premium Wireless Headphones",
          brand: "AudioTech Pro",
          category: "Electronics",
          image_url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"
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
    
    if (!isAuthenticated) {
      setError('Please sign up or log in to submit a review');
      return;
    }

    if (!formData.review_text.trim()) {
      setError('Please enter your review');
      return;
    }

    try {
      setSubmitting(true);
      setError('');

      // Mock API call - replace with actual API endpoint
      const reviewData = {
        product_id: id,
        user_name: formData.user_name,
        review_text: formData.review_text,
        date: new Date().toISOString()
      };

      console.log('Submitting review:', reviewData);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubmitted(true);
      
      // Redirect back to product page after 2 seconds
      setTimeout(() => {
        navigate(`/product/${id}`);
      }, 2000);

    } catch (error) {
      console.error('Error submitting review:', error);
      setError('Failed to submit review. Please try again.');
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

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50">
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

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
            <AlertCircle className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Authentication Required</h2>
            <p className="text-gray-600 mb-6">
              You need to be signed up and logged in to submit a review.
            </p>
            <div className="flex justify-center space-x-4">
              <Link 
                to={`/auth/consumer-signup?returnUrl=${encodeURIComponent(window.location.pathname)}`}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Sign Up
              </Link>
              <Link 
                to={`/auth/consumer-login?returnUrl=${encodeURIComponent(window.location.pathname)}`}
                className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Log In
              </Link>
            </div>
          </div>
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
            Thank you for your review. It will help other customers make informed decisions.
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
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-red-500" />
                <p className="text-red-700">{error}</p>
              </div>
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


            {/* Review Text */}
            <div>
              <label htmlFor="review_text" className="block text-sm font-medium text-gray-700 mb-2">
                Your Review *
              </label>
              <textarea
                id="review_text"
                name="review_text"
                value={formData.review_text}
                onChange={handleInputChange}
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                placeholder="Share your experience with this product. What did you like or dislike? How was the quality, value, and performance?"
                required
              />
              <p className="mt-1 text-sm text-gray-500">
                {formData.review_text.length}/1000 characters
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
                    <span>Submitting...</span>
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
