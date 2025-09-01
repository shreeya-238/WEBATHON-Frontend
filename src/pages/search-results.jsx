import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Navbar from '../components/navbar';
import ProductCard from '../components/productcard';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('relevance');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 });
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Mock search data - in real app, this would come from API
  const mockSearchData = [
    // Electronics
    { _id: 'smartphone-x1', name: 'Smartphone X1 Pro', price: 25000, rating: 4.6, image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400', category: 'Electronics & Tech', badge: 'BIS Certified', safetyScore: 92 },
    { _id: 'laptop-ultra', name: 'Laptop Ultra Book', price: 45000, rating: 4.7, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400', category: 'Electronics & Tech', badge: 'Energy Star', safetyScore: 94 },
    { _id: 'wireless-earbuds-pro', name: 'Wireless Earbuds Pro', price: 3500, rating: 4.3, image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400', category: 'Electronics & Tech', badge: 'Bluetooth Certified', safetyScore: 88 },
    
    // Health & Wellness
    { _id: 'vitamin-c-1000', name: 'Vitamin C 1000mg Tablets', price: 450, rating: 4.6, image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400', category: 'Health & Wellness', badge: 'FSSAI Approved', safetyScore: 94 },
    { _id: 'protein-powder-whey', name: 'Whey Protein Powder', price: 1200, rating: 4.3, image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400', category: 'Health & Wellness', badge: 'Lab Tested', safetyScore: 89 },
    
    // Food & Beverages
    { _id: 'organic-apples', name: 'Organic Red Apples', price: 120, rating: 4.5, image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400', category: 'Food & Beverages', badge: 'FSSAI Certified', safetyScore: 95 },
    { _id: 'fresh-tomatoes', name: 'Fresh Tomatoes', price: 40, rating: 4.2, image: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400', category: 'Food & Beverages', badge: 'Pesticide Free', safetyScore: 88 },
    
    // Beauty & Personal Care
    { _id: 'face-cream-anti-aging', name: 'Anti-Aging Face Cream', price: 850, rating: 4.6, image: 'https://images.unsplash.com/photo-1485925832434-374f4b0e0b04?w=400', category: 'Beauty & Personal Care', badge: 'Dermatologist Tested', safetyScore: 92 },
    { _id: 'shampoo-natural', name: 'Natural Herbal Shampoo', price: 450, rating: 4.4, image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400', category: 'Beauty & Personal Care', badge: 'Sulfate Free', safetyScore: 88 },
    
    // Home & Lifestyle
    { _id: 'air-purifier-hepa', name: 'HEPA Air Purifier', price: 8500, rating: 4.6, image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400', category: 'Home & Lifestyle', badge: 'HEPA Filter', safetyScore: 93 },
    { _id: 'water-filter-ro', name: 'RO Water Filter System', price: 3200, rating: 4.8, image: 'https://images.unsplash.com/photo-1467003909585-2f8a72719488?w=400', category: 'Home & Lifestyle', badge: 'NSF Certified', safetyScore: 96 }
  ];

  const categories = [
    'Electronics & Tech',
    'Health & Wellness', 
    'Food & Beverages',
    'Beauty & Personal Care',
    'Home & Lifestyle',
    'Automotive & Transport',
    'Financial Services',
    'Education & Learning',
    'Travel & Tourism'
  ];

  useEffect(() => {
    // Scroll to top when component mounts or query changes
    window.scrollTo(0, 0);
    
    const searchProducts = () => {
      setLoading(true);
      
      // Simulate API delay
      setTimeout(() => {
        let searchResults = [];
        
        if (query.trim()) {
          // Search in product names, categories, and badges
          searchResults = mockSearchData.filter(product => 
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.category.toLowerCase().includes(query.toLowerCase()) ||
            product.badge.toLowerCase().includes(query.toLowerCase())
          );
        } else {
          searchResults = mockSearchData;
        }
        
        setResults(searchResults);
        setFilteredResults(searchResults);
        setLoading(false);
      }, 500);
    };

    searchProducts();
  }, [query]);

  useEffect(() => {
    let filtered = [...results];

    // Filter by categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product => 
        selectedCategories.includes(product.category)
      );
    }

    // Filter by price range
    filtered = filtered.filter(product => 
      product.price >= priceRange.min && product.price <= priceRange.max
    );

    // Sort results
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'safety':
        filtered.sort((a, b) => b.safetyScore - a.safetyScore);
        break;
      default:
        // Relevance - keep original order
        break;
    }

    setFilteredResults(filtered);
  }, [results, selectedCategories, priceRange, sortBy]);

  const handleCategoryToggle = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Searching products...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
            <Link to="/" className="hover:text-green-600 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Search Results</span>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                {query ? `Search Results for "${query}"` : 'All Products'}
              </h1>
              <p className="text-gray-600 mt-2">
                {filteredResults.length} products found
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-4">
              <div className="flex items-center space-x-2 mb-6">
                <SlidersHorizontal className="h-5 w-5 text-gray-600" />
                <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
              </div>

              {/* Sort By */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="relevance">Relevance</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="safety">Safety Score</option>
                </select>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Price Range</label>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Min Price</label>
                    <input
                      type="number"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, min: parseInt(e.target.value) || 0 }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Max Price</label>
                    <input
                      type="number"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, max: parseInt(e.target.value) || 100000 }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="100000"
                    />
                  </div>
                </div>
              </div>

              {/* Categories */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Categories</label>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => handleCategoryToggle(category)}
                        className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              {(selectedCategories.length > 0 || priceRange.min > 0 || priceRange.max < 100000) && (
                <button
                  onClick={() => {
                    setSelectedCategories([]);
                    setPriceRange({ min: 0, max: 100000 });
                  }}
                  className="w-full mt-6 px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          {/* Results Grid */}
          <div className="lg:col-span-3">
            {filteredResults.length === 0 ? (
              <div className="text-center py-12">
                <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600">
                  {query ? `No products match "${query}". Try adjusting your search or filters.` : 'No products available.'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredResults.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
