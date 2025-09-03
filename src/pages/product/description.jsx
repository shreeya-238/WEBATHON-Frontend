
// 


import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
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
  const [activeTab, setActiveTab] = useState("reviews");
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showComplaintModal, setShowComplaintModal] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchProduct = async () => {
      try {
        setLoading(true);
        const apiUrl = import.meta.env.VITE_API_URL; // ✅ Use your .env API base
        const response = await fetch(`${apiUrl}/products/${id}`);
        if (!response.ok) throw new Error("Failed to fetch product");
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    const fetchReviews = async () => {
      try {
        const res = await fetch(`/api/products/${id}/review`);
        if (!res.ok) throw new Error("Failed");
        const data = await res.json();
        setReviews(Array.isArray(data) ? data : []);
      } catch (e) {
        // fallback handled later
      }
    };

    const fetchComplaints = async () => {
      try {
        const res = await fetch(`/api/products/${id}/complaints`);
        if (!res.ok) throw new Error("Failed");
        const data = await res.json();
        setComplaints(Array.isArray(data) ? data : []);
      } catch (e) {
        // fallback handled later
      }
    };

    // Load product from DB
    fetchProduct();
    // Reviews & complaints remain as-is
    fetchReviews();
    fetchComplaints();

    // Mock fallback for reviews and complaints (still kept)
    const mockReviews = [
      {
        _id: "review1",
        user: "John D.",
        rating: 5,
        title: "Excellent sound quality!",
        comment: "These headphones are amazing! The sound quality is crystal clear and the noise cancellation works perfectly. Battery life is impressive too.",
        date: "2024-01-20T10:30:00Z",
        helpful: 12,
        sentiment: "Positive",
      },
      {
        _id: "review2",
        user: "Sarah M.",
        rating: 4,
        title: "Great value for money",
        comment: "Good headphones for the price. Comfortable to wear for long periods. Only giving 4 stars because the app could be better.",
        date: "2024-01-18T14:20:00Z",
        helpful: 8,
        sentiment: "Positive",
      },
    ];

    const mockComplaints = [
      {
        _id: "complaint1",
        user: "Alex T.",
        title: "Connectivity issues",
        description: "The headphones keep disconnecting from my phone randomly. Very frustrating when I'm on calls.",
        status: "pending",
        date: "2024-01-22T08:30:00Z",
        category: "Technical Issue",
      },
    ];

    setReviews((prev) => (prev.length ? prev : mockReviews));
    setComplaints((prev) => (prev.length ? prev : mockComplaints));

    // Initialize upvotes from localStorage
    const savedUpvotes = localStorage.getItem(`upvotes_${id}`);
    if (savedUpvotes) {
      setUpvotes(JSON.parse(savedUpvotes));
    } else {
      const initialUpvotes = {};
      mockReviews.forEach((review) => {
        initialUpvotes[`review_${review._id}`] = review.helpful || 0;
      });
      mockComplaints.forEach((complaint) => {
        initialUpvotes[`complaint_${complaint._id}`] = complaint.upvotes || 0;
      });
      setUpvotes(initialUpvotes);
    }
  }, [id]);

  const renderStars = (rating) =>
    [...Array(5)].map((_, index) => (
      <StarIcon
        key={index}
        size={16}
        className={`${index < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ));

  const getRiskLevel = (score) => {
    if (score <= 20) return { level: "Low", color: "text-green-600", bg: "bg-green-100" };
    if (score <= 40) return { level: "Medium", color: "text-yellow-600", bg: "bg-yellow-100" };
    return { level: "High", color: "text-red-600", bg: "bg-red-100" };
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  };

  const handleUpvote = (type, itemId) => {
    const key = `${type}_${itemId}`;
    const newUpvotes = { ...upvotes, [key]: (upvotes[key] || 0) + 1 };
    setUpvotes(newUpvotes);
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

      {/* Product Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Large Image */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/600x600?text=No+Image";
              }}
            />
          </div>

          {/* Right: Details */}
          <div className="bg-white rounded-lg shadow-sm border p-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                <p className="text-lg text-gray-600 mt-1">by {product.brand}</p>
              </div>

              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1">{renderStars(product.average_rating)}</div>
                <span className="text-sm text-gray-600">{product.average_rating}/5</span>
                <span className="text-sm text-gray-500">·</span>
                <span className="text-sm text-gray-600">{product.total_reviews} reviews</span>
              </div>

              <p className="text-gray-700 leading-relaxed">{product.description}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {product.eco_friendly && (
                  <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">Env-Friendly</span>
                )}
                {product.made_in_india && (
                  <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700">Made in India</span>
                )}
                {product.FSSAI_certified && (
                  <span className="px-3 py-1 text-xs rounded-full bg-amber-100 text-amber-700">FSSAI Certified</span>
                )}
              </div>
            </div>

            {/* Actions */}
            
          </div>
        </div>
      </div>

      {/* Product Description */}
      <div className="mt-8 bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Description</h3>
        <p className="text-gray-700 leading-relaxed">{product.description}</p>
      </div>

      {/* Reviews & Complaints Tabs */}
      <div className="mt-8 bg-white rounded-lg shadow-sm border">
        <div className="flex items-center border-b">
          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-6 py-3 text-sm font-medium ${activeTab === 'reviews' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
          >
            Reviews
          </button>
          <button
            onClick={() => setActiveTab('complaints')}
            className={`px-6 py-3 text-sm font-medium ${activeTab === 'complaints' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
          >
            Complaints
          </button>
        </div>
        <div className="p-6">
          {activeTab === 'reviews' ? (
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center space-x-1">{renderStars(product.average_rating)}</div>
                <span className="text-sm text-gray-600">{product.average_rating}/5</span>
                <span className="text-sm text-gray-500">·</span>
                <span className="text-sm text-gray-600">{product.total_reviews} reviews</span>
              </div>
              <div className="space-y-6 max-h-96 overflow-y-auto pr-2">
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
                            <div className="flex items-center space-x-1">{renderStars(review.rating)}</div>
                            <span className="text-sm text-gray-500">·</span>
                            <span className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</span>
                            {review.sentiment && (
                              <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${review.sentiment === 'Positive' ? 'bg-green-100 text-green-700' : review.sentiment === 'Negative' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'}`}>
                                {review.sentiment}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleUpvote('review', review._id)}
                        className="flex items-center space-x-2 text-sm text-gray-500 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors"
                      >
                        <ThumbsUp className="w-4 h-4" />
                        <span>{upvotes[`review_${review._id}`] || review.helpful || 0} upvotes</span>
                      </button>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6 max-h-96 overflow-y-auto pr-2">
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
                          <span className="text-sm text-gray-500">{new Date(complaint.date).toLocaleDateString()}</span>
                          <span className="text-sm text-gray-500">·</span>
                          <span className="text-sm text-gray-500">{complaint.category}</span>
                        </div>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${complaint.status === 'completed' ? 'bg-green-100 text-green-800' : complaint.status === 'investigation' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {complaint.status === 'completed' ? 'Completed' : complaint.status === 'investigation' ? 'Investigation' : 'Pending'}
                    </span>
                  </div>
                  <h5 className="font-medium text-gray-900 mb-1">{complaint.title}</h5>
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
              ))}
            </div>
          )}
        </div>
      </div>

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

      {/* Action Buttons */}
      <div className="mt-8 bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Take Action</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link to={`/products/${id}/complaint`} className="flex items-center justify-center space-x-3 bg-blue-600 text-white py-4 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium">
            <FileText className="w-5 h-5" />
            <span>File a Complaint</span>
          </Link>
          <Link to={`/products/${product._id}/review`} className="flex items-center justify-center space-x-3 bg-green-600 text-white py-4 px-6 rounded-lg hover:bg-green-700 transition-colors font-medium">
            <MessageSquare className="w-5 h-5" />
            <span>Give a Review</span>
          </Link>

        </div>
      </div>

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-30 bg-black/50 flex items-center justify-center px-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Leave a Review</h3>
            <p className="text-gray-600 mb-6">You will be redirected to the review form.</p>
            <div className="flex justify-end space-x-3">
              <button onClick={() => setShowReviewModal(false)} className="px-4 py-2 rounded-lg border text-gray-900 hover:bg-gray-50">Cancel</button>
              <Link to={`/product/${id}/review`} className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">Continue</Link>
            </div>
          </div>
        </div>
      )}

      {/* Complaint Modal */}
      {showComplaintModal && (
        <div className="fixed inset-0 z-30 bg-black/50 flex items-center justify-center px-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">File a Complaint</h3>
            <p className="text-gray-600 mb-6">You will be redirected to the complaint form.</p>
            <div className="flex justify-end space-x-3">
              <button onClick={() => setShowComplaintModal(false)} className="px-4 py-2 rounded-lg border text-gray-900 hover:bg-gray-50">Cancel</button>
              <Link to={`/product/${id}/complaint`} className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700">Continue</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDescription;
