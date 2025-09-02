// Backend Configuration
// Update this file with your actual backend URL

export const BACKEND_CONFIG = {
  // Update this with your actual backend URL
  BASE_URL: 'http://localhost:5000', // Backend is running on port 5000
  
  // Example URLs:
  // Local development: 'http://localhost:3000'
  // Production: 'https://yourdomain.com'
  // Custom port: 'http://localhost:5000'
  
  // API endpoints
  ENDPOINTS: {
    AUTH: {
      REGISTER: '/api/auth/register',
      LOGIN: '/api/auth/login',
    },
    CONSUMER: {
      PROFILE: '/api/consumer/profile',
    },
    COMPANY: {
      PROFILE: '/api/company/profile',
    },
    PRODUCTS: {
      CREATE: '/api/products',
      GET_ALL: '/api/products',
      GET_BY_ID: '/api/products/:id',
      UPDATE: '/api/products/:id',
      DELETE: '/api/products/:id',
    }
  }
};

// Helper function to build full API URLs
export const buildApiUrl = (endpoint) => {
  return `${BACKEND_CONFIG.BASE_URL}${endpoint}`;
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

export default BACKEND_CONFIG;
