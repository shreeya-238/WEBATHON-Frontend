// API Configuration
const API_CONFIG = {
  // Update this with your actual backend URL
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:3000',
  
  // Consumer endpoints
  CONSUMER: {
    SIGNUP: '/api/consumer/signup',
    LOGIN: '/api/consumer/login',
    PROFILE: '/api/consumer/profile',
  },
  
  // Company endpoints
  COMPANY: {
    SIGNUP: '/api/company/signup',
    LOGIN: '/api/company/login',
    PROFILE: '/api/company/profile',
  },
  
  // Admin endpoints
  ADMIN: {
    SIGNUP: '/api/admin/signup',
    LOGIN: '/api/admin/login',
  },
  
  // Product endpoints
  PRODUCTS: {
    CREATE: '/api/products',
    GET_ALL: '/api/products',
    GET_BY_ID: '/api/products/:id',
    UPDATE: '/api/products/:id',
    DELETE: '/api/products/:id',
  }
};

// Helper function to build full API URLs
export const buildApiUrl = (endpoint) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Helper function to make API calls
export const apiCall = async (endpoint, options = {}) => {
  const url = buildApiUrl(endpoint);
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, defaultOptions);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};

export default API_CONFIG;
