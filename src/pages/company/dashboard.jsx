import React, { useState, useEffect } from 'react';
import { Calendar, MessageCircle, Star, AlertTriangle, Building, Mail, Phone, Package, Users, TrendingUp, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

const CompanyDashboard = () => {
  const [activeTab, setActiveTab] = useState('products');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [companyInfo, setCompanyInfo] = useState(null);
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch company data from MongoDB
  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        setLoading(true);
        // TODO: Replace with actual API endpoints
        const response = await fetch('/api/company/profile');
        const data = await response.json();
        setCompanyInfo(data);
      } catch (error) {
        console.error('Error fetching company data:', error);
        // Fallback to mock data if API fails
        setCompanyInfo({
          name: "TechCorp Solutions",
          email: "contact@techcorp.com",
          phone: "+1 (555) 987-6543",
          industry: "Technology Services",
          founded: "2020",
          totalProducts: 8,
          totalReviews: 47,
          totalComplaints: 5,
          averageRating: 4.2
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyData();
  }, []);

  // Fetch products from MongoDB
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // TODO: Replace with actual API endpoints
        const response = await fetch('/api/company/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
        // Fallback to mock data if API fails
        setProducts([
          {
            _id: 1,
            name: "Web Development Package",
            description: "Complete website development with responsive design and SEO optimization",
            price: "$2,500",
            category: "Web Development",
            status: "Active",
            dateAdded: "2024-01-15",
            sales: 12
          },
          {
            _id: 2,
            name: "Mobile App Development",
            description: "iOS and Android app development with modern UI/UX design",
            price: "$5,000",
            category: "Mobile Development",
            status: "Active",
            dateAdded: "2024-02-20",
            sales: 8
          },
          {
            _id: 3,
            name: "Cloud Hosting Solution",
            description: "Scalable cloud hosting with 99.9% uptime guarantee",
            price: "$150/month",
            category: "Cloud Services",
            status: "Active",
            dateAdded: "2024-03-10",
            sales: 25
          },
          {
            _id: 4,
            name: "Digital Marketing Package",
            description: "Comprehensive digital marketing including SEO, PPC, and social media",
            price: "$800/month",
            category: "Marketing",
            status: "Active",
            dateAdded: "2024-04-05",
            sales: 15
          },
          {
            _id: 5,
            name: "IT Consulting Services",
            description: "Expert IT consulting for business optimization and digital transformation",
            price: "$200/hour",
            category: "Consulting",
            status: "Active",
            dateAdded: "2024-05-12",
            sales: 30
          },
          {
            _id: 6,
            name: "E-commerce Platform",
            description: "Custom e-commerce solution with payment integration and inventory management",
            price: "$3,500",
            category: "E-commerce",
            status: "Active",
            dateAdded: "2024-06-18",
            sales: 6
          },
          {
            _id: 7,
            name: "Data Analytics Dashboard",
            description: "Real-time data analytics and reporting dashboard for business insights",
            price: "$1,200/month",
            category: "Analytics",
            status: "Active",
            dateAdded: "2024-07-22",
            sales: 18
          },
          {
            _id: 8,
            name: "Cybersecurity Audit",
            description: "Comprehensive security audit and vulnerability assessment",
            price: "$1,500",
            category: "Security",
            status: "Active",
            dateAdded: "2024-08-08",
            sales: 9
          }
        ]);
      }
    };

    fetchProducts();
  }, []);

  // Fetch reviews from MongoDB
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // TODO: Replace with actual API endpoints
        const response = await fetch('/api/company/reviews');
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        // Fallback to mock data if API fails
        setReviews([
          {
            _id: 1,
            customer: "John Smith",
            product: "Web Development Package",
            rating: 5,
            content: "Excellent work! The website looks professional and loads quickly. The team was very responsive throughout the project.",
            date: "2024-08-15",
            status: "Verified"
          },
          {
            _id: 2,
            customer: "Sarah Johnson",
            product: "Mobile App Development",
            rating: 4,
            content: "Great app development experience. The app is user-friendly and the team delivered on time. Minor bugs were fixed quickly.",
            date: "2024-08-10",
            status: "Verified"
          },
          {
            _id: 3,
            customer: "Mike Davis",
            product: "Cloud Hosting Solution",
            rating: 5,
            content: "Outstanding cloud hosting service. 99.9% uptime as promised and excellent customer support when needed.",
            date: "2024-08-05",
            status: "Verified"
          },
          {
            _id: 4,
            customer: "Emily Wilson",
            product: "Digital Marketing Package",
            rating: 4,
            content: "Good results from the digital marketing campaign. Traffic increased significantly and ROI was positive.",
            date: "2024-07-28",
            status: "Verified"
          },
          {
            _id: 5,
            customer: "David Brown",
            product: "IT Consulting Services",
            rating: 5,
            content: "Expert consultation helped us optimize our IT infrastructure. Cost savings were substantial.",
            date: "2024-07-20",
            status: "Verified"
          },
          {
            _id: 6,
            customer: "Lisa Garcia",
            product: "E-commerce Platform",
            rating: 3,
            content: "The platform works well but there were some delays in delivery. Support team was helpful though.",
            date: "2024-07-15",
            status: "Verified"
          },
          {
            _id: 7,
            customer: "Robert Taylor",
            product: "Data Analytics Dashboard",
            rating: 4,
            content: "Great analytics dashboard. Provides valuable insights for our business decisions.",
            date: "2024-07-10",
            status: "Verified"
          },
          {
            _id: 8,
            customer: "Jennifer Lee",
            product: "Cybersecurity Audit",
            rating: 5,
            content: "Comprehensive security audit identified several vulnerabilities. The team provided clear recommendations.",
            date: "2024-07-05",
            status: "Verified"
          }
        ]);
      }
    };

    fetchReviews();
  }, []);

  // Fetch complaints from MongoDB
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        // TODO: Replace with actual API endpoints
        const response = await fetch('/api/company/complaints');
        const data = await response.json();
        setComplaints(data);
      } catch (error) {
        console.error('Error fetching complaints:', error);
        // Fallback to mock data if API fails
        setComplaints([
          {
            _id: 1,
            customer: "Alex Thompson",
            product: "Web Development Package",
            title: "Website Not Loading Properly",
            content: "The website takes too long to load and some features are not working as expected. Need immediate attention.",
            date: "2024-08-20",
            status: "Pending",
            priority: "High"
          },
          {
            _id: 2,
            customer: "Maria Rodriguez",
            product: "Mobile App Development",
            title: "App Crashes Frequently",
            content: "The mobile app crashes every time I try to use the payment feature. This is affecting my business.",
            date: "2024-08-18",
            status: "Pending",
            priority: "High"
          },
          {
            _id: 3,
            customer: "James Wilson",
            product: "Cloud Hosting Solution",
            title: "Downtime Issues",
            content: "Experienced unexpected downtime yesterday. This caused significant loss in business.",
            date: "2024-08-15",
            status: "Solved",
            priority: "Medium"
          },
          {
            _id: 4,
            customer: "Sophie Chen",
            product: "Digital Marketing Package",
            title: "Poor Campaign Performance",
            content: "The marketing campaign is not generating the expected results. Need to review the strategy.",
            date: "2024-08-12",
            status: "Pending",
            priority: "Medium"
          },
          {
            _id: 5,
            customer: "Kevin Martinez",
            product: "IT Consulting Services",
            title: "Delayed Response",
            content: "Consultant was late for scheduled meeting and didn't provide the promised documentation.",
            date: "2024-08-10",
            status: "Solved",
            priority: "Low"
          }
        ]);
      }
    };

    fetchComplaints();
  }, []);

  // Fetch chat messages for a specific complaint
  const fetchChatMessages = async (complaintId) => {
    try {
      // TODO: Replace with actual API endpoints
      const response = await fetch(`/api/company/complaints/${complaintId}/chat`);
      const data = await response.json();
      setChatMessages(data);
    } catch (error) {
      console.error('Error fetching chat messages:', error);
      // Fallback to mock data if API fails
      setChatMessages([
        {
          _id: 1,
          sender: "customer",
          message: "Hi, I'm having issues with the website loading speed. It's taking more than 10 seconds to load.",
          timestamp: "2024-08-20 09:30 AM"
        },
        {
          _id: 2,
          sender: "company",
          message: "Hello! We're sorry to hear about the loading issues. Could you please provide more details about which pages are slow?",
          timestamp: "2024-08-20 10:15 AM"
        },
        {
          _id: 3,
          sender: "customer",
          message: "The homepage and product pages are very slow. Also, the contact form is not working properly.",
          timestamp: "2024-08-20 10:30 AM"
        },
        {
          _id: 4,
          sender: "company",
          message: "Thank you for the details. We'll investigate this immediately and have our technical team look into the performance issues.",
          timestamp: "2024-08-20 11:00 AM"
        },
        {
          _id: 5,
          sender: "company",
          message: "We've identified the issue and are working on a fix. We'll deploy the solution within the next 2 hours.",
          timestamp: "2024-08-20 11:45 AM"
        }
      ]);
    }
  };

  const openChat = (complaint) => {
    setSelectedComplaint(complaint);
    setIsChatOpen(true);
    fetchChatMessages(complaint._id);
  };

  const closeChat = () => {
    setIsChatOpen(false);
    setSelectedComplaint(null);
    setChatMessages([]);
  };

  // Send message function for chat
  const sendMessage = async (message) => {
    try {
      // TODO: Replace with actual API endpoints
      const response = await fetch(`/api/company/complaints/${selectedComplaint._id}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          sender: 'company',
          timestamp: new Date().toISOString()
        })
      });
      
      if (response.ok) {
        // Refresh chat messages after sending
        fetchChatMessages(selectedComplaint._id);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        size={16}
        className={`${index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading dashboard...</p>
          </div>
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-6">
                <h1 className="text-3xl font-bold text-gray-900">Company Dashboard</h1>
                <div className="flex items-center space-x-4">
                  <Link to="/" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
                    <Home className="h-5 w-5" />
                    <span>Home</span>
                  </Link>
                  <Building className="h-6 w-6 text-gray-500" />
                  <span className="text-gray-700">{companyInfo?.name}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Company Information Section */}
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Company Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="flex items-center space-x-3">
                  <Building className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-500">Company Name</p>
                    <p className="font-medium text-gray-900">{companyInfo?.name}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium text-gray-900">{companyInfo?.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium text-gray-900">{companyInfo?.phone}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-500">Founded</p>
                    <p className="font-medium text-gray-900">{companyInfo?.founded}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Total Products</p>
                    <p className="text-2xl font-bold text-gray-900">{companyInfo?.totalProducts}</p>
                  </div>
                  <Package className="h-8 w-8 text-blue-400" />
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Total Reviews</p>
                    <p className="text-2xl font-bold text-gray-900">{companyInfo?.totalReviews}</p>
                  </div>
                  <Star className="h-8 w-8 text-yellow-400" />
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Total Complaints</p>
                    <p className="text-2xl font-bold text-gray-900">{companyInfo?.totalComplaints}</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-red-400" />
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Average Rating</p>
                    <p className="text-2xl font-bold text-gray-900">{companyInfo?.averageRating}/5</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-400" />
                </div>
              </div>
            </div>

        {/* Tabs Section */}
        <div className="bg-white rounded-lg shadow-sm border">
          {/* Tab Headers */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('products')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'products'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Products ({products.length})
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'reviews'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Reviews ({reviews.length})
              </button>
              <button
                onClick={() => setActiveTab('complaints')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'complaints'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Complaints ({complaints.length})
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'products' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Your Products</h3>
                  <Link
                    to="/company/add-product"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <Package className="h-4 w-4" />
                    <span>Add Product</span>
                  </Link>
                </div>
                                 {products.map((product) => (
                   <div key={product._id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-medium text-gray-900">{product.name}</h4>
                        <p className="text-sm text-gray-500">{product.category}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-lg font-semibold text-gray-900">{product.price}</span>
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                          {product.status}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        Added on {formatDate(product.dateAdded)}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Users className="h-4 w-4 mr-1" />
                        {product.sales} sales
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Customer Reviews</h3>
                                 {reviews.map((review) => (
                   <div key={review._id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-medium text-gray-900">{review.customer}</h4>
                        <p className="text-sm text-gray-500">{review.product}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex">
                          {renderStars(review.rating)}
                        </div>
                        <span className="text-sm text-gray-500">({review.rating}/5)</span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">{review.content}</p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        Posted on {formatDate(review.date)}
                      </div>
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                        {review.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'complaints' && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Customer Complaints</h3>
                                 {complaints.map((complaint) => (
                   <div key={complaint._id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-medium text-gray-900">{complaint.customer}</h4>
                        <p className="text-sm text-gray-500">{complaint.product}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                                                 <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                           complaint.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                           complaint.status === 'completed' ? 'bg-green-100 text-green-800' :
                           complaint.status === 'investigation' ? 'bg-blue-100 text-blue-800' :
                           'bg-yellow-100 text-yellow-800'
                         }`}>
                           {complaint.status === 'pending' ? 'Pending' :
                            complaint.status === 'completed' ? 'Completed' :
                            complaint.status === 'investigation' ? 'Investigation' : complaint.status}
                         </span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          complaint.priority === 'High' ? 'bg-red-100 text-red-800' :
                          complaint.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {complaint.priority}
                        </span>
                      </div>
                    </div>
                    <h5 className="font-medium text-gray-900 mb-2">{complaint.title}</h5>
                    <p className="text-gray-700 mb-4">{complaint.content}</p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        Filed on {formatDate(complaint.date)}
                      </div>
                      <button
                        onClick={() => openChat(complaint)}
                        className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <MessageCircle className="h-4 w-4" />
                        <span>Chat</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Chat Modal */}
      {isChatOpen && selectedComplaint && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[80vh] flex flex-col">
            {/* Chat Header */}
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Chat with {selectedComplaint.customer}</h3>
                <p className="text-sm text-gray-500">{selectedComplaint.title}</p>
              </div>
              <button
                onClick={closeChat}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                             {chatMessages.map((message) => (
                 <div
                   key={message._id}
                   className={`flex ${message.sender === 'customer' ? 'justify-start' : 'justify-end'}`}
                 >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.sender === 'customer'
                        ? 'bg-gray-100 text-gray-900'
                        : 'bg-blue-600 text-white'
                    }`}
                  >
                    <p className="text-sm">{message.message}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === 'customer' ? 'text-gray-500' : 'text-blue-100'
                    }`}>
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && e.target.value.trim()) {
                      sendMessage(e.target.value.trim());
                      e.target.value = '';
                    }
                  }}
                />
                <button 
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  onClick={(e) => {
                    const input = e.target.previousElementSibling;
                    if (input.value.trim()) {
                      sendMessage(input.value.trim());
                      input.value = '';
                    }
                  }}
                >
                  Send
                </button>
              </div>
            </div>
                    </div>
        </div>
      )}
        </>
      )}
    </div>
   );
};

export default CompanyDashboard;
