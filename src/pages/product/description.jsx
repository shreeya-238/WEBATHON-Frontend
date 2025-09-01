import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../../components/navbar';
import { 
  Star, 
  Calendar, 
  Tag, 
  Building, 
  DollarSign, 
  Image as ImageIcon,
  BarChart3,
  Shield,
  AlertTriangle,
  ThumbsUp,
  ThumbsDown,
  ArrowLeft,
  ShoppingCart,
  Heart,
  Share2,
  Star as StarIcon,
  MessageSquare,
  FileText,
  User,
  Clock
} from 'lucide-react';

const ProductDescription = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [upvotes, setUpvotes] = useState({});

  useEffect(() => {
    // Scroll to top when component mounts or id changes
    window.scrollTo(0, 0);
    
    const fetchProduct = async () => {
      try {
        setLoading(true);
        // TODO: Replace with actual API endpoint
        const response = await fetch(`/api/products/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
        // Fallback to mock data if API fails
        setProduct({
          _id: id,
          name: "Premium Wireless Headphones",
          brand: "AudioTech Pro",
          category: "Electronics",
          subcategory: "Audio Equipment",
          description: "High-quality wireless headphones with noise cancellation technology, premium sound quality, and long battery life. Perfect for music enthusiasts and professionals who demand the best audio experience.",
          price: 299.99,
          currency: "USD",
          image_url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
          barcode: "1234567890123",
          specifications: {
            "Connectivity": "Bluetooth 5.0",
            "Battery Life": "Up to 30 hours",
            "Noise Cancellation": "Active",
            "Driver Size": "40mm",
            "Frequency Response": "20Hz - 20kHz",
            "Weight": "250g",
            "Warranty": "2 years"
          },
          trust_badges: ["ISO Certified", "CE Marked", "FCC Approved"],
          average_rating: 4.5,
          total_reviews: 127,
          total_complaints: 3,
          risk_score: 15,
          source: "Official Store",
          created_at: "2024-01-15T10:30:00Z"
        });
      } finally {
        setLoading(false);
      }
    };

    // Mock reviews and complaints data
    const mockReviews = [
      {
        _id: 'review1',
        user: 'John D.',
        rating: 5,
        title: 'Excellent sound quality!',
        comment: 'These headphones are amazing! The sound quality is crystal clear and the noise cancellation works perfectly. Battery life is impressive too.',
        date: '2024-01-20T10:30:00Z',
        helpful: 12
      },
      {
        _id: 'review2',
        user: 'Sarah M.',
        rating: 4,
        title: 'Great value for money',
        comment: 'Good headphones for the price. Comfortable to wear for long periods. Only giving 4 stars because the app could be better.',
        date: '2024-01-18T14:20:00Z',
        helpful: 8
      },
      {
        _id: 'review3',
        user: 'Mike R.',
        rating: 5,
        title: 'Perfect for work',
        comment: 'I use these for work calls and they are perfect. Clear audio, good microphone, and comfortable for all-day wear.',
        date: '2024-01-15T09:15:00Z',
        helpful: 15
      },
      {
        _id: 'review4',
        user: 'Lisa K.',
        rating: 3,
        title: 'Decent but not perfect',
        comment: 'The sound is good but the build quality could be better. Had some connectivity issues initially.',
        date: '2024-01-12T16:45:00Z',
        helpful: 3
      },
      {
        _id: 'review5',
        user: 'David P.',
        rating: 5,
        title: 'Best headphones I\'ve owned',
        comment: 'Absolutely love these! The bass is amazing and the noise cancellation is incredible. Worth every penny.',
        date: '2024-01-10T11:30:00Z',
        helpful: 22
      }
    ];

    const mockComplaints = [
      {
        _id: 'complaint1',
        user: 'Alex T.',
        title: 'Connectivity issues',
        description: 'The headphones keep disconnecting from my phone randomly. Very frustrating when I\'m on calls.',
        status: 'pending',
        date: '2024-01-22T08:30:00Z',
        category: 'Technical Issue'
      },
      {
        _id: 'complaint2',
        user: 'Emma W.',
        title: 'Poor battery life',
        description: 'The battery doesn\'t last as long as advertised. I only get about 15 hours instead of 30.',
        status: 'completed',
        date: '2024-01-19T13:20:00Z',
        category: 'Product Quality'
      },
      {
        _id: 'complaint3',
        user: 'Tom B.',
        title: 'Comfort issues',
        description: 'The ear cushions are too hard and cause discomfort after an hour of use.',
        status: 'investigation',
        date: '2024-01-16T10:15:00Z',
        category: 'Design Issue'
      }
    ];

    setReviews(mockReviews);
    setComplaints(mockComplaints);

    // Initialize upvotes from localStorage or set defaults
    const savedUpvotes = localStorage.getItem(`upvotes_${id}`);
    if (savedUpvotes) {
      setUpvotes(JSON.parse(savedUpvotes));
    } else {
      // Initialize with default upvote counts
      const initialUpvotes = {};
      mockReviews.forEach(review => {
        initialUpvotes[`review_${review._id}`] = review.helpful || 0;
      });
      mockComplaints.forEach(complaint => {
        initialUpvotes[`complaint_${complaint._id}`] = complaint.upvotes || 0;
      });
      setUpvotes(initialUpvotes);
    }

    fetchProduct();
  }, [id]);

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <StarIcon
        key={index}
        size={16}
        className={`${index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  const getRiskLevel = (score) => {
    if (score <= 20) return { level: "Low", color: "text-green-600", bg: "bg-green-100" };
    if (score <= 40) return { level: "Medium", color: "text-yellow-600", bg: "bg-yellow-100" };
    return { level: "High", color: "text-red-600", bg: "bg-red-100" };
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleUpvote = (type, itemId) => {
    const key = `${type}_${itemId}`;
    const newUpvotes = {
      ...upvotes,
      [key]: (upvotes[key] || 0) + 1
    };
    setUpvotes(newUpvotes);
    
    // Save to localStorage
    localStorage.setItem(`upvotes_${id}`, JSON.stringify(newUpvotes));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Product Not Found</h2>
          <p className="text-gray-600 mb-4">The product you're looking for doesn't exist.</p>
          <Link to="/" className="text-blue-600 hover:text-blue-700">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const riskLevel = getRiskLevel(product.risk_score);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <Navbar />
      
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <Link to="/" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Home</span>
            </Link>
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-700">
                <Heart className="h-5 w-5" />
                <span>Wishlist</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-700">
                <Share2 className="h-5 w-5" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="aspect-w-1 aspect-h-1 w-full">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/400x400?text=No+Image";
                }}
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Basic Info */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="space-y-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                  <p className="text-lg text-gray-600 mt-2">by {product.brand}</p>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    {renderStars(product.average_rating)}
                    <span className="text-sm text-gray-600">({product.average_rating}/5)</span>
                  </div>
                  <span className="text-sm text-gray-500">•</span>
                  <span className="text-sm text-gray-500">{product.total_reviews} reviews</span>
                  <span className="text-sm text-gray-500">•</span>
                  <span className="text-sm text-gray-500">{product.total_complaints} complaints</span>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Tag className="h-4 w-4 text-blue-500" />
                    <span className="text-sm text-gray-600">{product.category}</span>
                  </div>
                  <span className="text-sm text-gray-500">•</span>
                  <div className="flex items-center space-x-2">
                    <Building className="h-4 w-4 text-blue-500" />
                    <span className="text-sm text-gray-600">{product.subcategory}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-5 w-5 text-green-500" />
                    <span className="text-2xl font-bold text-gray-900">
                      {product.price} {product.currency}
                    </span>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                    <ShoppingCart className="h-5 w-5" />
                    <span>Add to Cart</span>
                  </button>
                  <button className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Heart className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>

            {/* Trust & Safety */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Trust & Safety</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Risk Score:</span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${riskLevel.bg} ${riskLevel.color}`}>
                    {riskLevel.level} ({product.risk_score}/100)
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Source:</span>
                  <span className="text-sm font-medium text-gray-900">{product.source}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Listed:</span>
                  <span className="text-sm text-gray-900">{formatDate(product.created_at)}</span>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            {product.trust_badges && product.trust_badges.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Certifications</h3>
                <div className="flex flex-wrap gap-2">
                  {product.trust_badges.map((badge, index) => (
                    <Link
                      key={index}
                      to="/"
                      className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full flex items-center space-x-1 hover:bg-green-200 transition-colors cursor-pointer"
                    >
                      <Shield className="h-3 w-3" />
                      <span>{badge}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Product Description */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Description</h3>
          <p className="text-gray-700 leading-relaxed">{product.description}</p>
        </div>

        {/* Specifications */}
        {product.specifications && Object.keys(product.specifications).length > 0 && (
          <div className="mt-8 bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Specifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">{key}:</span>
                  <span className="text-sm font-medium text-gray-900">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Product Information */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">Product ID:</span>
              <span className="text-sm font-medium text-gray-900">{product._id}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">Barcode:</span>
              <span className="text-sm font-medium text-gray-900">{product.barcode}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">Brand:</span>
              <span className="text-sm font-medium text-gray-900">{product.brand}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">Category:</span>
              <span className="text-sm font-medium text-gray-900">{product.category}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">Subcategory:</span>
              <span className="text-sm font-medium text-gray-900">{product.subcategory}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">Price:</span>
              <span className="text-sm font-medium text-gray-900">{product.price} {product.currency}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">Average Rating:</span>
              <span className="text-sm font-medium text-gray-900">{product.average_rating}/5</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">Total Reviews:</span>
              <span className="text-sm font-medium text-gray-900">{product.total_reviews}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">Total Complaints:</span>
              <span className="text-sm font-medium text-gray-900">{product.total_complaints}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">Risk Score:</span>
              <span className="text-sm font-medium text-gray-900">{product.risk_score}/100</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">Source:</span>
              <span className="text-sm font-medium text-gray-900">{product.source}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">Created:</span>
              <span className="text-sm font-medium text-gray-900">{formatDate(product.created_at)}</span>
            </div>
          </div>
        </div>

        {/* Reviews Summary */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Feedback</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 mb-2">
                {renderStars(product.average_rating)}
              </div>
              <p className="text-2xl font-bold text-gray-900">{product.average_rating}/5</p>
              <p className="text-sm text-gray-600">Average Rating</p>
            </div>
            <div className="text-center">
              <ThumbsUp className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{product.total_reviews}</p>
              <p className="text-sm text-gray-600">Total Reviews</p>
            </div>
            <div className="text-center">
              <ThumbsDown className="h-8 w-8 text-red-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{product.total_complaints}</p>
              <p className="text-sm text-gray-600">Complaints</p>
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Customer Reviews ({reviews.length})</h3>
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review._id} className="border-b border-gray-100 pb-6 last:border-b-0">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{review.user}</h4>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          {renderStars(review.rating)}
                        </div>
                        <span className="text-sm text-gray-500">•</span>
                        <span className="text-sm text-gray-500">{formatDate(review.date)}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleUpvote('review', review._id)}
                    className="flex items-center space-x-2 text-sm text-gray-500 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors"
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span>{upvotes[`review_${review._id}`] || review.helpful} upvotes</span>
                  </button>
                </div>
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">{review.title}</h5>
                  <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Complaints List */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Customer Complaints ({complaints.length})</h3>
          <div className="space-y-6">
            {complaints.map((complaint) => (
              <div key={complaint._id} className="border-b border-gray-100 pb-6 last:border-b-0">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{complaint.user}</h4>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">{formatDate(complaint.date)}</span>
                        <span className="text-sm text-gray-500">•</span>
                        <span className="text-sm text-gray-500">{complaint.category}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      complaint.status === 'completed' 
                        ? 'bg-green-100 text-green-800' 
                        : complaint.status === 'investigation'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {complaint.status === 'completed' ? 'Completed' : 
                       complaint.status === 'investigation' ? 'Investigation' : 'Pending'}
                    </span>
                  </div>
                </div>
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">{complaint.title}</h5>
                  <p className="text-gray-700 leading-relaxed">{complaint.description}</p>
                  <div className="mt-3 flex justify-end">
                    <button
                      onClick={() => handleUpvote('complaint', complaint._id)}
                      className="flex items-center space-x-2 text-sm text-gray-500 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors"
                    >
                      <ThumbsUp className="w-4 h-4" />
                      <span>{upvotes[`complaint_${complaint._id}`] || 0} upvotes</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Take Action</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link to={`/product/${id}/complaint`} className="flex items-center justify-center space-x-3 bg-blue-600 text-white py-4 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium">
              <FileText className="w-5 h-5" />
              <span>File a Complaint</span>
            </Link>
            <Link to={`/product/${id}/review`} className="flex items-center justify-center space-x-3 bg-green-600 text-white py-4 px-6 rounded-lg hover:bg-green-700 transition-colors font-medium">
              <MessageSquare className="w-5 h-5" />
              <span>Give a Review</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
