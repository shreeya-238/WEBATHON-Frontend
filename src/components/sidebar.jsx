import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Menu, 
  X, 
  User, 
  Building2, 
  LogIn,
  LayoutDashboard,
  ChevronRight,
  ShoppingBag,
  Laptop,
  Car,
  Shirt,
  Utensils,
  Gamepad2,
  Heart,
  Book,
  Wrench
} from 'lucide-react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const location = useLocation();

  // Categories with icons
  const categories = [
    { name: 'Electronics', slug: 'electronics', icon: Laptop },
    { name: 'Fashion', slug: 'fashion', icon: Shirt },
    { name: 'Home & Garden', slug: 'home-garden', icon: Home },
    { name: 'Sports & Outdoors', slug: 'sports-outdoors', icon: Heart },
    { name: 'Automotive', slug: 'automotive', icon: Car },
    { name: 'Food & Beverages', slug: 'food-beverages', icon: Utensils },
    { name: 'Books & Media', slug: 'books-media', icon: Book },
    { name: 'Gaming', slug: 'gaming', icon: Gamepad2 },
    { name: 'Tools & Hardware', slug: 'tools-hardware', icon: Wrench },
    { name: 'Health & Beauty', slug: 'health-beauty', icon: Heart }
  ];

  useEffect(() => {
    // Check authentication status
    const checkAuth = () => {
      const user = localStorage.getItem('currentUser');
      if (user) {
        const userData = JSON.parse(user);
        setIsAuthenticated(true);
        setCurrentUser(userData);
      } else {
        setIsAuthenticated(false);
        setCurrentUser(null);
      }
    };

    checkAuth();
    
    // Listen for storage changes (when user logs in/out)
    window.addEventListener('storage', checkAuth);
    
    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, []);

  // Close sidebar when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Don't render on home page
  if (location.pathname === '/') {
    return null;
  }

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setIsAuthenticated(false);
    setCurrentUser(null);
    setIsOpen(false);
  };

  return (
    <>
      {/* Menu Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 bg-blue-600 text-white p-3 rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="bg-green-600 text-white p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-green-600 text-lg font-bold">T</span>
                </div>
                <h2 className="text-xl font-bold">TrustTag</h2>
              </div>
              <button
                onClick={toggleSidebar}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
          </div>

          {/* Navigation Content */}
          <div className="flex-1 overflow-y-auto py-4">
            {/* Home Link */}
            <div className="px-4 mb-6">
              <Link
                to="/"
                className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 p-3 rounded-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Home size={20} />
                <span className="font-medium">Home</span>
              </Link>
            </div>

            {/* Categories Section */}
            <div className="px-4 mb-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                Categories
              </h3>
              <div className="space-y-1">
                {categories.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <Link
                      key={category.slug}
                      to={`/category/${category.slug}`}
                      className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 p-3 rounded-lg transition-colors group"
                      onClick={() => setIsOpen(false)}
                    >
                      <IconComponent size={18} />
                      <span className="flex-1">{category.name}</span>
                      <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Authentication Section */}
            <div className="px-4 border-t border-gray-200 pt-4">
              {isAuthenticated ? (
                <div className="space-y-2">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <User size={16} className="text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{currentUser?.name}</p>
                      <p className="text-xs text-gray-500">{currentUser?.email}</p>
                    </div>
                  </div>
                  
                  <Link
                    to="/customer/dashboard"
                    className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 p-3 rounded-lg transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <LayoutDashboard size={18} />
                    <span>Dashboard</span>
                  </Link>
                  
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 text-gray-700 hover:text-red-600 hover:bg-red-50 p-3 rounded-lg transition-colors text-left"
                  >
                    <LogIn size={18} />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                    Sign In
                  </h3>
                  
                  <Link
                    to="/auth/consumer-login"
                    className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 p-3 rounded-lg transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <User size={18} />
                    <span>Sign in as Customer</span>
                  </Link>
                  
                  <Link
                    to="/auth/company-login"
                    className="flex items-center space-x-3 text-gray-700 hover:text-green-600 hover:bg-green-50 p-3 rounded-lg transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <Building2 size={18} />
                    <span>Sign in as Company</span>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 p-4">
            <p className="text-xs text-gray-500 text-center">
              © 2024 LetsGo. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
