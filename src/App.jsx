import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Category from './pages/category';

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
import AddProduct from './pages/company/add-product';

// Product Pages
import ProductDescription from './pages/product/description';
import ReviewForm from './pages/product/review-form';
import ComplaintForm from './pages/product/complaint-form';
import SearchResults from './pages/search-results';

// Components
import Sidebar from './components/sidebar';

function App() {
  return (
    <Router>
      <div className="relative">
        <Sidebar />
        <Routes>
          {/* Main Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/category/:slug" element={<Category />} />
          
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
          <Route path="/company/add-product" element={<AddProduct />} />
          
          {/* Product Routes */}
          <Route path="/product/:id" element={<ProductDescription />} />
          <Route path="/product/:id/review" element={<ReviewForm />} />
          <Route path="/product/:id/complaint" element={<ComplaintForm />} />
          <Route path="/search" element={<SearchResults />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
