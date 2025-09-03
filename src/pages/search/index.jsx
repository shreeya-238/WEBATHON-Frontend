import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Search } from 'lucide-react';

// Mock data - replace with actual API calls
const mockProducts = [
  { id: 1, name: 'Organic Cotton T-Shirt', category: 'Clothing', image: '/images/category1-a.png' },
  { id: 2, name: 'Bamboo Toothbrush', category: 'Personal Care', image: '/images/category2-a.png' },
  // Add more mock data as needed
];

const mockCategories = [
  { id: 1, name: 'Clothing', count: 24 },
  { id: 2, name: 'Personal Care', count: 15 },
  // Add more mock categories as needed
];

const SearchResults = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState({
    products: [],
    categories: [],
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('q') || '';
    setSearchQuery(query);

    if (query) {
      performSearch(query);
    }
  }, [location.search]);

  const performSearch = async (query) => {
    setLoading(true);
    try {
      // TODO: Replace with actual API calls
      const filteredProducts = mockProducts.filter(item => 
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      );
      
      const filteredCategories = mockCategories.filter(cat => 
        cat.name.toLowerCase().includes(query.toLowerCase())
      );

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setResults({
        products: filteredProducts,
        categories: filteredCategories,
      });
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto mb-8">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products & categories..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
          <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Searching for "{searchQuery}"...</p>
        </div>
      ) : (
        <>
          {results.products.length > 0 && (
            <div className="mb-12">
              <h2 className="text-xl font-semibold mb-4">Products</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.products.map((product) => (
                  <Link 
                    key={product.id} 
                    to={`/products/${product.id}`}
                    className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4"
                  >
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-48 object-cover rounded-md mb-3"
                    />
                    <h3 className="font-medium text-gray-900">{product.name}</h3>
                    <p className="text-sm text-gray-500">{product.category}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {results.categories.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Categories</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {results.categories.map((category) => (
                  <Link
                    key={category.id}
                    to={`/category/${category.id}`}
                    className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 flex justify-between items-center"
                  >
                    <span className="font-medium">{category.name}</span>
                    <span className="text-sm text-gray-500">{category.count} items</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {!loading && searchQuery && results.products.length === 0 && results.categories.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-2">
                <Search className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">No results found</h3>
              <p className="mt-1 text-gray-500">We couldn't find any products or categories matching "{searchQuery}"</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchResults;
