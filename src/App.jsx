import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Products from './pages/products.jsx';
import Analytics from './pages/analytics.jsx';
import Stories from './pages/stories';
import Category from './pages/category';
import ScrollToTop from './components/ScrollToTop';

// Auth Pages
import ConsumerSignup from './pages/auth/consumer-signup';
import ConsumerLogin from './pages/auth/consumer-login';
import CompanySignup from './pages/auth/company-signup';
import CompanyLogin from './pages/auth/company-login';
import AdminSignup from './pages/auth/admin-signup';
import AdminLogin from './pages/auth/admin-login';

// Dashboard Pages
import CustomerDashboard from './pages/customer/dashboard';
import CompanyDashboard from './pages/company/dashboard';
import CompanyAnalytics from './pages/company/analytics';
import AddProduct from './pages/company/add-product';

// Product Pages
import ProductDescription from './pages/product/description';
import ReviewForm from './pages/product/review-form';
import ComplaintForm from './pages/product/complaint-form';
import SearchResults from './pages/search';

// Components
import Sidebar from './components/sidebar';
import Navbar from './components/navbar.jsx';

function App() {
  return (
    <Router>
      <div className="relative">
        <ScrollToTop>
          <Navbar />
          <Routes>
          {/* Main Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/category/:slug" element={<Category />} />
          <Route path="/search" element={<SearchResults />} />
          
          {/* Consumer Authentication */}
          <Route path="/auth/consumer-signup" element={<ConsumerSignup />} />
          <Route path="/auth/consumer-login" element={<ConsumerLogin />} />
          
          {/* Company Authentication */}
          <Route path="/auth/company-signup" element={<CompanySignup />} />
          <Route path="/auth/company-login" element={<CompanyLogin />} />
         
          {/* Admin Authentication */}
          <Route path="/auth/admin-signup" element={<AdminSignup />} />
          <Route path="/auth/admin-login" element={<AdminLogin />} />
          
          {/* Dashboard Routes */}
          <Route path="/customer/dashboard" element={<CustomerDashboard />} />
          <Route path="/company/dashboard" element={<CompanyDashboard />} />
          <Route path="/company/analytics" element={<CompanyAnalytics />} />
          <Route path="/company/add-product" element={<AddProduct />} />
          
          {/* Product Routes */}
          <Route path="/products/:id" element={<ProductDescription />} />
          <Route path="/products/:id/review" element={<ReviewForm />} />
          <Route path="/products/:id/complaint" element={<ComplaintForm />} />
          <Route path="/search" element={<SearchResults />} />
          </Routes>
        </ScrollToTop>
      </div>
    </Router>
  );
}

export default App;
