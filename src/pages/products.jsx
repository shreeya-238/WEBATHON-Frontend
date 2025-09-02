import React, { useMemo, useState } from 'react';
import ProductCard from '../components/productcard.jsx';

const categories = [
  'Food & Beverages',
  'Cosmetics & Personal Care',
  'Clothing & Apparel',
  'Electronics & Gadgets',
  'Home Appliances',
  'Toys & Baby Products',
  'Furniture & Home Décor',
  'Pharmaceuticals & Health Products',
];

const allProducts = [
  {
    name: 'Organic Almond Milk',
    category: 'Food & Beverages',
    rating: 4.5,
    reviewCount: 124,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=60',
    description: 'Dairy-free, lactose-free almond milk with no added sugar. Great for smoothies and cereals.',
    tags: ['Env-Friendly', 'Made in India', 'FSSAI Certified'],
    safetyScore: 92,
    price: 199,
  },
  {
    name: 'Herbal Face Cleanser',
    category: 'Cosmetics & Personal Care',
    rating: 4.2,
    reviewCount: 89,
    image: 'https://images.unsplash.com/photo-1585238342028-4bbc6df6f486?w=600&q=60',
    description: 'Gentle cleanser with natural extracts suitable for all skin types.',
    tags: ['Ethically Sourced', 'Paraben Free'],
    safetyScore: 85,
    price: 349,
  },
  {
    name: 'Cotton Crew T-Shirt',
    category: 'Clothing & Apparel',
    rating: 4.0,
    reviewCount: 210,
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=600&q=60',
    description: '100% cotton, soft-touch, classic fit with durable stitching.',
    tags: ['Made in India', 'Ethically Sourced'],
    safetyScore: 80,
    price: 599,
  },
  {
    name: 'Wireless Earbuds Pro',
    category: 'Electronics & Gadgets',
    rating: 4.6,
    reviewCount: 540,
    image: 'https://images.unsplash.com/photo-1518446224431-6fbf295f95df?w=600&q=60',
    description: 'Noise cancellation, long battery life, and ergonomic design for all-day comfort.',
    tags: ['Fast Charging', '1-Year Warranty'],
    safetyScore: 88,
    price: 2999,
  },
  {
    name: 'Energy Efficient Mixer',
    category: 'Home Appliances',
    rating: 4.1,
    reviewCount: 62,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31b?w=600&q=60',
    description: 'Powerful motor, stainless steel blades, and multi-speed control for everyday kitchen tasks.',
    tags: ['Energy Star', '2-Year Warranty'],
    safetyScore: 83,
    price: 1899,
  },
  {
    name: 'Wooden Study Table',
    category: 'Furniture & Home Décor',
    rating: 4.3,
    reviewCount: 34,
    image: 'https://images.unsplash.com/photo-1616628182508-e2b9f02c1525?w=600&q=60',
    description: 'Solid wood, minimalist design with rounded corners and cable management.',
    tags: ['Sustainably Sourced', 'Handcrafted'],
    safetyScore: 86,
    price: 6499,
  },
  {
    name: 'Baby Soft Plush Toy',
    category: 'Toys & Baby Products',
    rating: 4.7,
    reviewCount: 155,
    image: 'https://images.unsplash.com/photo-1470115636492-6d2b56f9146e?w=600&q=60',
    description: 'Non-toxic materials, soft and safe for infants and toddlers.',
    tags: ['Non-toxic', 'Durable'],
    safetyScore: 94,
    price: 499,
  },
  {
    name: 'Vitamin C Tablets',
    category: 'Pharmaceuticals & Health Products',
    rating: 4.4,
    reviewCount: 410,
    image: 'https://images.unsplash.com/photo-1544989164-31dc3c645987?w=600&q=60',
    description: 'Boost immunity with high-quality vitamin C. Lab-tested and label-accurate.',
    tags: ['Label Accurate', 'GMP Certified'],
    safetyScore: 90,
    price: 299,
  },
];

const Products = () => {
  const [activeCategory, setActiveCategory] = useState('Food & Beverages');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const byCategory = allProducts.filter(p => p.category === activeCategory);
    const q = query.trim().toLowerCase();
    if (!q) return byCategory;
    return byCategory.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      (p.description || '').toLowerCase().includes(q)
    );
  }, [activeCategory, query]);

  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-center text-3xl sm:text-4xl font-extrabold text-gray-900">Discover Products You Can Trust</h1>
      </section>

      {/* Category Tabs (wrap, responsive) */}
      <div className="bg-white border-t border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2 py-4" role="tablist">
            {categories.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                  activeCategory === cat ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Search below categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <input
          type="text"
          placeholder="Search products, brands, or categories"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Product Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {filtered.length === 0 ? (
          <div className="text-center text-gray-600 py-16">No products found for your search.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((p) => (
              <ProductCard key={p.name} product={p} />
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


