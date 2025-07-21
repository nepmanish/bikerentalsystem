import api from './api';

export const authService = {
  // Authentication
  signup: async (userData) => {
    const response = await api.post('/users/signup', userData);
    return response.data;
  },

  login: async (credentials) => {
    const response = await api.post('/users/login', credentials);
    return response.data;
  },

  logout: async () => {
    // Since JWT is httpOnly cookie, we just need to redirect to clear it
    window.location.href = '/login';
  },

  // Password management
  forgotPassword: async (email) => {
    const response = await api.post('/users/forgotPassword', { email });
    return response.data;
  },

  resetPassword: async (token, passwords) => {
    const response = await api.patch(`/users/resetPassword/${token}`, passwords);
    return response.data;
  },

  updatePassword: async (passwords) => {
    const response = await api.patch('/users/updateMyPassword', passwords);
    return response.data;
  },

  // Profile management
  updateProfile: async (userData) => {
    const response = await api.patch('/users/updateMe', userData);
    return response.data;
  },

  deleteAccount: async () => {
    const response = await api.delete('/users/deleteMe');
    return response.data;
  },

  // User preferences
  setPreferences: async (preferences) => {
    const response = await api.patch('/users/preferences', preferences);
    return response.data;
  },

  getRecommendations: async () => {
    const response = await api.get('/users/recommend');
    return response.data;
  },

  // Check if user is authenticated
  checkAuth: async () => {
    try {
      const response = await api.get('/users/recommend'); // Use any protected route
      return { isAuthenticated: true };
    } catch (error) {
      return { isAuthenticated: false };
    }
  }
};

export default authService;