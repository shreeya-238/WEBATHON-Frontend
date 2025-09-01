import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu } from 'lucide-react';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();


  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Navigate to search results or filter products
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Navigation */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="bg-green-600 text-white rounded-lg p-2">
              <span className="text-xl font-bold">T</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">TrustTag</h1>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Search products, brands, or categories..."
                className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <button
                type="submit"
                className="absolute right-2 top-1.5 bg-green-600 text-white p-1 rounded-md hover:bg-green-700 transition-colors"
              >
                <Search className="h-4 w-4" />
              </button>
            </form>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">

            {/* User Account Dropdown - Desktop */}
            <div className="hidden md:block relative group">
              <button className="text-gray-600 hover:text-gray-900 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-30 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="px-4 py-2 text-sm text-gray-700 border-b">
                  <p className="font-medium">Account Options</p>
                </div>
                <div className="px-4 py-2">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Consumer</p>
                  <Link to="/auth/consumer-login" className="block text-sm text-gray-700 hover:text-green-600 py-1">
                    Consumer Login
                  </Link>
                  <Link to="/auth/consumer-signup" className="block text-sm text-gray-700 hover:text-green-600 py-1">
                    Consumer Signup
                  </Link>
                </div>
                <div className="px-4 py-2 border-t">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Business</p>
                  <Link to="/auth/company-login" className="block text-sm text-gray-700 hover:text-green-600 py-1">
                    Company Login
                  </Link>
                  <Link to="/auth/company-signup" className="block text-sm text-gray-700 hover:text-green-600 py-1">
                    Company Signup
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100">
            {/* Mobile Search */}
            <div className="p-4">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  placeholder="Search products, brands, or categories..."
                  className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <button
                  type="submit"
                  className="absolute right-2 top-1.5 bg-green-600 text-white p-1 rounded-md hover:bg-green-700 transition-colors"
                >
                  <Search className="h-4 w-4" />
                </button>
              </form>
            </div>


            {/* Mobile User Actions */}
            <div className="px-4 pb-4 border-t border-gray-100 pt-4">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Account</h3>
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Consumer</p>
                  <Link 
                    to="/auth/consumer-login" 
                    className="block text-sm text-gray-700 hover:text-green-600 py-1"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Consumer Login
                  </Link>
                  <Link 
                    to="/auth/consumer-signup" 
                    className="block text-sm text-gray-700 hover:text-green-600 py-1"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Consumer Signup
                  </Link>
                </div>
                <div className="pt-2">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Business</p>
                  <Link 
                    to="/auth/company-login" 
                    className="block text-sm text-gray-700 hover:text-green-600 py-1"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Company Login
                  </Link>
                  <Link 
                    to="/auth/company-signup" 
                    className="block text-sm text-gray-700 hover:text-green-600 py-1"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Company Signup
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
