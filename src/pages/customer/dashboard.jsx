import React, { useState, useEffect } from 'react';
import { Calendar, MessageCircle, Star, AlertTriangle, User, Mail, Phone, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

const CustomerDashboard = () => {
  const [activeTab, setActiveTab] = useState('reviews');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [customerInfo, setCustomerInfo] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch customer data from MongoDB
  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        setLoading(true);
        // TODO: Replace with actual API endpoints
        const response = await fetch('/api/customer/profile');
        const data = await response.json();
        setCustomerInfo(data);
      } catch (error) {
        console.error('Error fetching customer data:', error);
        // Fallback to mock data if API fails
        setCustomerInfo({
          name: "John Doe",
          email: "john.doe@email.com",
          phone: "+1 (555) 123-4567",
          joinDate: "January 2024",
          totalReviews: 15,
          totalComplaints: 3
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerData();
  }, []);

  // Fetch reviews from MongoDB
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // TODO: Replace with actual API endpoints
        const response = await fetch('/api/customer/reviews');
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        // Fallback to mock data if API fails
        setReviews([
          {
            _id: 1,
            company: "TechCorp Solutions",
            rating: 5,
            content: "Excellent service! The team was very professional and delivered exactly what was promised. Highly recommend!",
            date: "2024-08-15",
            product: "Web Development Services"
          },
          {
            _id: 2,
            company: "GreenEnergy Co.",
            rating: 4,
            content: "Good experience overall. The installation was smooth and the team was knowledgeable. Minor delays but nothing major.",
            date: "2024-07-22",
            product: "Solar Panel Installation"
          },
          {
            _id: 3,
            company: "FoodExpress Delivery",
            rating: 3,
            content: "Average service. Food arrived warm but delivery was a bit slow. Could be better.",
            date: "2024-06-10",
            product: "Food Delivery Service"
          },
          {
            _id: 4,
            company: "HomeFix Pro",
            rating: 5,
            content: "Outstanding work! Fixed our plumbing issue quickly and professionally. Fair pricing too.",
            date: "2024-05-28",
            product: "Plumbing Services"
          },
          {
            _id: 5,
            company: "EduTech Learning",
            rating: 4,
            content: "Great learning platform. The courses are well-structured and the instructors are helpful.",
            date: "2024-04-15",
            product: "Online Learning Platform"
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
        const response = await fetch('/api/customer/complaints');
        const data = await response.json();
        setComplaints(data);
      } catch (error) {
        console.error('Error fetching complaints:', error);
        // Fallback to mock data if API fails
        setComplaints([
          {
            _id: 1,
            company: "QuickFix Repairs",
            title: "Poor Service Quality",
            content: "The repair work was not done properly. The issue reoccurred within a week of the service. Very disappointed with the quality.",
            date: "2024-08-20",
            status: "Pending",
            category: "Service Quality"
          },
          {
            _id: 2,
            company: "FastDelivery Co.",
            title: "Delayed Delivery",
            content: "Package was supposed to be delivered on Monday but arrived on Thursday. No communication about the delay.",
            date: "2024-07-12",
            status: "Solved",
            category: "Delivery Issues"
          },
          {
            _id: 3,
            company: "TechSupport Plus",
            title: "Unresponsive Customer Service",
            content: "Called customer service multiple times but no one picked up. Emails were also not responded to for over a week.",
            date: "2024-06-05",
            status: "Pending",
            category: "Customer Service"
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
      const response = await fetch(`/api/customer/complaints/${complaintId}/chat`);
      const data = await response.json();
      setChatMessages(data);
    } catch (error) {
      console.error('Error fetching chat messages:', error);
      // Fallback to mock data if API fails
      setChatMessages([
        {
          _id: 1,
          sender: "customer",
          message: "Hi, I'm not satisfied with the repair work done on my appliance.",
          timestamp: "2024-08-20 10:30 AM"
        },
        {
          _id: 2,
          sender: "company",
          message: "Hello! We're sorry to hear that. Could you please provide more details about the issue?",
          timestamp: "2024-08-20 11:15 AM"
        },
        {
          _id: 3,
          sender: "customer",
          message: "The problem reoccurred within a week. I expected better quality work.",
          timestamp: "2024-08-20 11:30 AM"
        },
        {
          _id: 4,
          sender: "company",
          message: "We understand your concern. We'll send a technician to re-inspect and fix the issue at no additional cost.",
          timestamp: "2024-08-20 12:00 PM"
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
      const response = await fetch(`/api/customer/complaints/${selectedComplaint._id}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          sender: 'customer',
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
                <h1 className="text-3xl font-bold text-gray-900">Customer Dashboard</h1>
                <div className="flex items-center space-x-4">
                  <Link to="/" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
                    <Home className="h-5 w-5" />
                    <span>Home</span>
                  </Link>
                  <User className="h-6 w-6 text-gray-500" />
                  <span className="text-gray-700">{customerInfo?.name}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Personal Information Section */}
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-medium text-gray-900">{customerInfo?.name}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium text-gray-900">{customerInfo?.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium text-gray-900">{customerInfo?.phone}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-500">Member Since</p>
                    <p className="font-medium text-gray-900">{customerInfo?.joinDate}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Total Reviews</p>
                    <p className="text-2xl font-bold text-gray-900">{customerInfo?.totalReviews}</p>
                  </div>
                  <Star className="h-8 w-8 text-yellow-400" />
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Total Complaints</p>
                    <p className="text-2xl font-bold text-gray-900">{customerInfo?.totalComplaints}</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-red-400" />
                </div>
              </div>
            </div>

        {/* Tabs Section */}
        <div className="bg-white rounded-lg shadow-sm border">
          {/* Tab Headers */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
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
            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Your Reviews</h3>
                                 {reviews.map((review) => (
                   <div key={review._id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-medium text-gray-900">{review.company}</h4>
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
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      Posted on {formatDate(review.date)}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'complaints' && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Your Complaints</h3>
                                 {complaints.map((complaint) => (
                   <div key={complaint._id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-medium text-gray-900">{complaint.company}</h4>
                        <p className="text-sm text-gray-500">{complaint.category}</p>
                      </div>
                                             <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                         complaint.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                         complaint.status === 'Solved' ? 'bg-green-100 text-green-800' :
                         complaint.status === 'Open' ? 'bg-red-100 text-red-800' :
                         complaint.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                         'bg-green-100 text-green-800'
                       }`}>
                         {complaint.status}
                       </span>
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
                <h3 className="text-lg font-medium text-gray-900">Chat with {selectedComplaint.company}</h3>
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
                   className={`flex ${message.sender === 'customer' ? 'justify-end' : 'justify-start'}`}
                 >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.sender === 'customer'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm">{message.message}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === 'customer' ? 'text-blue-100' : 'text-gray-500'
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

export default CustomerDashboard;
