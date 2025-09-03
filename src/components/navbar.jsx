import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthDropdownOpen, setIsAuthDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Check authentication status
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  // Handle My Account click
  const handleMyAccountClick = () => {
    if (user) {
      // User is logged in - redirect to appropriate dashboard
      if (user.role === 'company') {
        navigate('/company/dashboard');
      } else if (user.role === 'consumer') {
        navigate('/customer/dashboard');
      }
    } else {
      // User not logged in - redirect to signup page
      navigate('/auth/consumer-signup');
    }
  };

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-20 w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12 w-full">
          {/* Logo and Site Name */}
          <div className="flex items-center">
            <Link to="/products" className="flex items-center space-x-2">
              <div className="bg-green-600 text-white rounded-md p-1">
                <span className="text-sm font-bold">T</span>
              </div>
              <h1 className="text-lg font-semibold text-gray-900">TrustConsumer</h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/products" 
              className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors"
            >
              Products
            </Link>
            <Link 
              to="/analytics" 
              className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors"
            >
              Analytics
            </Link>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-3">
            {/* Search Bar */}
            <div className="hidden md:block relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-64 pl-8 pr-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
              />
              <svg className="absolute left-2.5 top-2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {user ? (
              // User is logged in
              <div className="flex items-center space-x-4">
                <span className="hidden md:inline text-sm text-gray-700">
                  {user.email || 'My Account'}
                </span>
                <button 
                  onClick={() => {
                    localStorage.removeItem('user');
                    setUser(null);
                    navigate('/');
                  }}
                  className="hidden md:inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-red-600 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              // User is not logged in
              <div className="hidden md:flex items-center space-x-3">
                <button 
                  onClick={() => navigate('/auth/consumer-login')}
                  className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-green-600 transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate('/auth/consumer-signup')}
                  className="px-3 py-1.5 text-sm font-medium bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  Sign Up
                </button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-1.5 rounded-md hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100">
            <div className="px-4 py-3 space-y-2">
              {/* Mobile Search */}
              <div className="relative mb-3">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-8 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                />
                <svg className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              {/* Navigation Links */}
              <Link
                to="/products"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2 text-sm font-medium text-gray-700 hover:text-green-600"
              >
                Products
              </Link>
              <Link
                to="/analytics"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2 text-sm font-medium text-gray-700 hover:text-green-600"
              >
                Analytics
              </Link>

              {user ? (
                // Mobile - User is logged in
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <div className="text-sm text-gray-700 mb-2">
                    Logged in as: {user.email}
                  </div>
                  <button
                    onClick={() => {
                      localStorage.removeItem('user');
                      setUser(null);
                      setIsMobileMenuOpen(false);
                      navigate('/');
                    }}
                    className="w-full text-left py-2 text-sm text-red-600 hover:text-red-800"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                // Mobile - User is not logged in
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                    Consumer
                  </div>
                  <Link
                    to="/auth/consumer-signup"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-2 text-sm text-gray-700 hover:text-green-600"
                  >
                    Sign Up
                  </Link>
                  <Link
                    to="/auth/consumer-login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-2 text-sm text-gray-700 hover:text-green-600"
                  >
                    Login
                  </Link>
                  
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mt-4 mb-2">
                    Company
                  </div>
                  <Link
                    to="/auth/company-signup"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-2 text-sm text-gray-700 hover:text-green-600"
                  >
                    Sign Up
                  </Link>
                  <Link
                    to="/auth/company-login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-2 text-sm text-gray-700 hover:text-green-600"
                  >
                    Login
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
