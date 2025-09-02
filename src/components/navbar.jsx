import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { label: 'Products', to: '/products' },
    { label: 'Analytics Dashboard', to: '/analytics' },
  ];

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Navigation */}
        <div className="flex items-center h-16 gap-4 py-2">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="bg-green-600 text-white rounded-lg p-2">
              <span className="text-xl font-bold">T</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">TrustConsumer</h1>
          </Link>

          {/* Center: Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-6 ml-2">
            {navItems.map((item) => (
              <Link key={item.to} to={item.to} className="text-gray-700 hover:text-green-600 transition-colors">
                {item.label}
              </Link>
            ))}
          </div>

          {/* Center-right: Search (Desktop) */}
          <div className="hidden md:flex items-center flex-1 max-w-xl mx-6">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Right: Actions + Mobile Menu Button */}
          <div className="ml-auto flex items-center space-x-2">
            <button className="hidden md:inline-flex items-center justify-center px-4 py-2 rounded-lg font-medium bg-gradient-to-r from-green-600 to-green-500 text-white hover:from-green-700 hover:to-green-600">My Account</button>
            <button className="hidden md:inline-flex items-center justify-center px-4 py-2 rounded-lg font-medium border border-gray-300 text-gray-900 hover:bg-gray-50">Share</button>
            <div className="hidden md:flex w-9 h-9 rounded-full bg-gray-100 items-center justify-center text-gray-700">👤</div>
            <Link to="/auth/consumer-signup" className="hidden lg:inline-flex items-center justify-center px-3 py-2 rounded-lg font-medium text-gray-700 hover:text-green-600">Login / Sign Up</Link>
            <button
              className="md:hidden p-2 rounded-md hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>


        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100">
            <div className="px-4 py-4 space-y-3">
              {/* Mobile Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              {/* Links */}
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-gray-700 hover:text-green-600"
                >
                  {item.label}
                </Link>
              ))}

              {/* Actions */}
              <div className="flex items-center space-x-3 pt-2">
                <button className="flex-1 px-4 py-2 rounded-lg font-medium bg-gradient-to-r from-green-600 to-green-500 text-white">My Account</button>
                <button className="px-4 py-2 rounded-lg font-medium border border-gray-300 text-gray-900">Share</button>
              </div>
              <Link
                to="/auth/consumer-signup"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-center text-gray-700 hover:text-green-600"
              >
                Login / Sign Up
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
