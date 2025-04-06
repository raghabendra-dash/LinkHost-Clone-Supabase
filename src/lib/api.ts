import axios from 'axios';

const API_URL = '/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Mock data for development
const mockUsers = [
  {
    id: '1',
    email: 'admin@example.com',
    firstName: 'John',
    lastName: 'Doe',
  }
];

const mockWebsites = [
  {
    id: '1',
    url: 'example.com',
    metrics: {
      domainRating: 50,
      referringDomains: '5.3K',
      totalBacklinks: '33.1K',
      totalKeywords: '5.4K',
      spamScore: '4%',
      language: 'English',
      linkValidity: '1 Year',
      trafficByCountry: 'India'
    },
    price: 36
  },
  {
    id: '2',
    url: 'techblog.com',
    metrics: {
      domainRating: 65,
      referringDomains: '8.2K',
      totalBacklinks: '45.6K',
      totalKeywords: '12.1K',
      spamScore: '2%',
      language: 'English',
      linkValidity: '1 Year',
      trafficByCountry: 'USA'
    },
    price: 89
  }
];

export const auth = {
  login: async (email: string, password: string) => {
    // For development, return mock data
    const user = mockUsers.find(u => u.email === email);
    if (!user) {
      throw new Error('User not found');
    }
    return { user, token: 'mock-token' };
    
    // Uncomment for real API call
    // const response = await api.post('/auth/login', { email, password });
    // return response.data;
  },
  register: async (userData: any) => {
    // For development, return mock data
    const newUser = {
      id: Date.now().toString(),
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
    };
    mockUsers.push(newUser);
    return { user: newUser, token: 'mock-token' };
    
    // Uncomment for real API call
    // const response = await api.post('/auth/register', userData);
    // return response.data;
  },
  getProfile: async () => {
    // For development, return mock data
    return mockUsers[0];
    
    // Uncomment for real API call
    // const response = await api.get('/auth/profile');
    // return response.data;
  },
  updateProfile: async (profileData: any) => {
    // For development, return mock data
    const user = mockUsers[0];
    Object.assign(user, profileData);
    return user;
    
    // Uncomment for real API call
    // const response = await api.put('/auth/profile', profileData);
    // return response.data;
  },
};

export const marketplace = {
  getWebsites: async (filters: any) => {
    // For development, return mock data
    return mockWebsites;
    
    // Uncomment for real API call
    // const response = await api.get('/marketplace/websites', { params: filters });
    // return response.data;
  },
  getWebsiteDetails: async (id: string) => {
    // For development, return mock data
    const website = mockWebsites.find(w => w.id === id);
    if (!website) {
      throw new Error('Website not found');
    }
    return website;
    
    // Uncomment for real API call
    // const response = await api.get(`/marketplace/websites/${id}`);
    // return response.data;
  },
};

export const orders = {
  getOrders: async () => {
    // For development, return mock data
    return [];
    
    // Uncomment for real API call
    // const response = await api.get('/orders');
    // return response.data;
  },
  createOrder: async (orderData: any) => {
    // For development, return mock data
    return {
      id: Date.now().toString(),
      ...orderData,
      status: 'new',
      createdAt: new Date().toISOString()
    };
    
    // Uncomment for real API call
    // const response = await api.post('/orders', orderData);
    // return response.data;
  },
};

export default api;