import api from './api';

export const bikesService = {
  // Get all bikes
  getAllBikes: async (params = {}) => {
    const response = await api.get('/bikes', { params });
    return response.data;
  },

  // Get single bike
  getBike: async (id) => {
    const response = await api.get(`/bikes/${id}`);
    return response.data;
  },

  // Get top 5 cheap bikes
  getTopCheapBikes: async () => {
    const response = await api.get('/bikes/top-5-cheap');
    return response.data;
  },

  // Get bike statistics
  getBikeStats: async () => {
    const response = await api.get('/bikes/bike-stats');
    return response.data;
  },

  // Admin operations
  createBike: async (bikeData) => {
    const response = await api.post('/bikes', bikeData);
    return response.data;
  },

  updateBike: async (id, bikeData) => {
    const response = await api.patch(`/bikes/${id}`, bikeData);
    return response.data;
  },

  deleteBike: async (id) => {
    const response = await api.delete(`/bikes/${id}`);
    return response.data;
  },

  // Recluster bikes (admin only)
  reclusterBikes: async () => {
    const response = await api.post('/bikes/recluster');
    return response.data;
  },
};

export default bikesService;