import React, { useState, useEffect, useMemo } from 'react'; 
import { Link } from 'react-router-dom';
import ProductCard from '../components/productcard.jsx'; 

const categories = [
  'All',
  'Food & Beverages',
  'Personal Care', 
  'Fashion',       
  'Electronics',   
  'Home & Kitchen',
  'Health & Wellness', 
];


const Products = () => {
  const [allProducts, setAllProducts] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeCategory, setActiveCategory] = useState('All');
  const [query, setQuery] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await fetch(`${apiUrl}/products`);
        if (!response.ok) {
          throw new Error('Data could not be fetched!');
        }
        const data = await response.json();
        setAllProducts(data); 
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); 

  const filtered = useMemo(() => {
    let productsToFilter = allProducts;

    if (activeCategory !== 'All') {
      productsToFilter = productsToFilter.filter(p => p.category === activeCategory);
    }

    const q = query.trim().toLowerCase();
    if (!q) {
      return productsToFilter; 
    }

    return productsToFilter.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) || 
      (p.description || '').toLowerCase().includes(q)
    );
  }, [activeCategory, query, allProducts]); 

  if (loading) {
    return <div className="text-center text-gray-600 py-16">Loading products...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-16">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-white">

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-center text-3xl sm:text-4xl font-extrabold text-gray-900">Discover Products You Can Trust</h1>
      </section>

      <div className="bg-white border-t border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2 py-4" role="tablist">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)} /* ... your button styles ... */>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} /* ... your input styles ... */ />
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {filtered.length === 0 ? (
          <div className="text-center text-gray-600 py-16">No products found for your search.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        
            {filtered.map((product) => (
              <Link to={`/product/${product.id}`} key={product.id}>
                <ProductCard product={product} />
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">TrustConsumer</h4>
            <ul className="space-y-2 text-sm">
              <li><a className="hover:text-white" href="#">TrustConsumer</a></li>
              <li><a className="hover:text-white" href="#">Resources</a></li>
              <li><a className="hover:text-white" href="#">Legal</a></li>
              <li><a className="hover:text-white" href="#">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Follow</h4>
            <div className="flex space-x-4 text-xl">
              <a href="#" aria-label="Facebook" className="hover:text-white">📘</a>
              <a href="#" aria-label="Twitter" className="hover:text-white">🐦</a>
              <a href="#" aria-label="Instagram" className="hover:text-white">📸</a>
              <a href="#" aria-label="LinkedIn" className="hover:text-white">💼</a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-sm flex flex-col sm:flex-row items-center justify-between">
            <span>Made with ❤️ by Your Brand</span>
            <span className="mt-2 sm:mt-0">© {new Date().getFullYear()} TrustConsumer</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Products;


