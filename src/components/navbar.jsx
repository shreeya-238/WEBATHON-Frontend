import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, ChevronDown, UserCircle } from 'lucide-react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthDropdownOpen, setIsAuthDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Check authentication status and listen for changes
  useEffect(() => {
    const checkAuth = () => {
      const userData = localStorage.getItem('user');
      setUser(userData ? JSON.parse(userData) : null);
    };

    // Initial check
    checkAuth();

    // Listen for storage events (triggered by other tabs/windows)
    const handleStorageChange = (e) => {
      if (e.key === 'user' || e.key === 'token') {
        checkAuth();
      }
    };

    // Listen for custom auth events (triggered by login/logout)
    const handleAuthChange = () => checkAuth();
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('authChange', handleAuthChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('authChange', handleAuthChange);
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.closest('.auth-dropdown') === null) {
        setIsAuthDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthDropdownOpen(false);
    // Dispatch event to update all navbar instances
    window.dispatchEvent(new Event('authChange'));
    navigate('/');
  };

  // Add this to window for other components to use
  window.handleLogin = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    // Dispatch event to update all navbar instances
    window.dispatchEvent(new Event('authChange'));
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
              <h1 className="text-lg font-semibold text-gray-900">Trustify</h1>
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
            <Link 
              to="/stories" 
              className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors"
            >
              Stories
            </Link>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="hidden md:block relative">
              <form onSubmit={(e) => {
                e.preventDefault();
                const searchQuery = e.target.search.value.trim();
                if (searchQuery) {
                  navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
                }
              }}>
                <input
                  type="text"
                  name="search"
                  placeholder="Search products & categories..."
                  className="w-64 pl-8 pr-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                />
                <button type="submit" className="absolute left-2.5 top-2">
                  <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </form>
            </div>

            {user ? (
              // User is logged in - Show My Account and Logout
              <div className="flex items-center space-x-4">
                <Link
                  to={user.role === 'company' ? '/company/dashboard' : '/customer/dashboard'}
                  className="hidden md:inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-green-600 transition-colors"
                >
                  My Account
                </Link>
                <button 
                  onClick={handleLogout}
                  className="hidden md:inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-red-600 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              // User is not logged in - Show Auth Dropdown
              <div className="relative auth-dropdown">
                <button
                  onClick={() => setIsAuthDropdownOpen(!isAuthDropdownOpen)}
                  className="flex items-center space-x-1 text-sm font-medium text-gray-700 hover:text-green-600 transition-colors"
                >
                  <span>Sign In / Register</span>
                  <svg 
                    className={`h-4 w-4 transition-transform ${isAuthDropdownOpen ? 'transform rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Auth Dropdown Menu */}
                {isAuthDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <div className="px-4 py-2 border-b">
                      <p className="text-xs font-medium text-gray-500">CONSUMER</p>
                    </div>
                    <Link
                      to="/auth/consumer-login"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsAuthDropdownOpen(false)}
                    >
                      Consumer Login
                    </Link>
                    <Link
                      to="/auth/consumer-signup"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsAuthDropdownOpen(false)}
                    >
                      Consumer Sign Up
                    </Link>
                    <div className="px-4 py-2 border-t border-b">
                      <p className="text-xs font-medium text-gray-500">COMPANY</p>
                    </div>
                    <Link
                      to="/auth/company-login"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsAuthDropdownOpen(false)}
                    >
                      Company Login
                    </Link>
                    <Link
                      to="/auth/company-signup"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsAuthDropdownOpen(false)}
                    >
                      Company Sign Up
                    </Link>
                  </div>
                )}
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
              <Link
                to="/stories"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2 text-sm font-medium text-gray-700 hover:text-green-600"
              >
                Stories
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
