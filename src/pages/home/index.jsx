import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import landingImage from './landing_page.png';

const Home = () => {
  const [contact, setContact] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGetOtp = async (e) => {
    e.preventDefault();
    navigate('/auth/consumer-signup');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero Landing */}
      <main className="flex-1">
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-12 lg:px-16 py-12 lg:py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
              Empowering consumers with trust, transparency, and safer choices.
            </h1>
            <p className="text-gray-600 text-lg mb-8">
              Trustify provides detailed product information, user-generated reviews, and AI-driven insights to help you make informed decisions.
            </p>
            <div className="bg-white rounded-xl shadow-md border p-6 max-w-md space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 text-center">Welcome to Trustify</h2>
              <Link
                to="/auth/consumer-signup"
                className="block w-full bg-green-600 text-white text-center py-3 rounded-lg hover:bg-green-700 transition-colors"
              >
                Sign Up
              </Link>
              <Link
                to="/auth/consumer-login"
                className="block w-full bg-white text-green-600 border border-green-600 text-center py-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Login
              </Link>
              <div className="pt-4 text-center">
                <Link to="/auth/company-signup" className="text-sm text-gray-600 hover:text-green-600">
                  For Businesses
                </Link>
              </div>
            </div>
          </div>
          <div className="flex justify-center w-[32rem] h-[42.67rem]">
            <img
              src={landingImage}
              alt="Trustify - Empowering consumers with trust and transparency"
              className="w-full h-full rounded-2xl shadow-lg object-cover"
            />
          </div>
        </section>
      </main>

      {/* Footer (all <Link> components updated to use href) */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Trustify</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li><Link href="/products" className="hover:text-white">Products</Link></li>
              <li><Link href="/analytics" className="hover:text-white">Analytics Dashboard</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>
          <div>
        <h4 className="text-white text-lg font-semibold mb-4">Resources</h4>
        <ul className="space-y-2 text-sm">
          <li><a className="hover:text-white" href="#">Docs</a></li>
          <li><a className="hover:text-white" href="#">Blog</a></li>
          <li><a className="hover:text-white" href="#">Community</a></li>
          </ul>
        </div>
        <div>
        <h4 className="text-white text-lg font-semibold mb-4">Legal</h4>
        <ul className="space-y-2 text-sm">
          <li><a className="hover:text-white" href="#">Privacy</a></li>
          <li><a className="hover:text-white" href="#">Terms</a></li>
          <li><a className="hover:text-white" href="#">Compliance</a></li>
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
          {/* Other footer sections are fine, just make sure any <Link> uses href */}
        </div>
        <div className="border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-sm flex flex-col sm:flex-row items-center justify-between">
            <span>Made with ❤️ by Your Brand</span>
            <span className="mt-2 sm:mt-0">© {new Date().getFullYear()} Trustify</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;