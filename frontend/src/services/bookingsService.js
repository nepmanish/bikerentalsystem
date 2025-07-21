import api from './api';

export const bookingsService = {
  // Create a new booking
  createBooking: async (bookingData) => {
    const response = await api.post('/bookings', bookingData);
    return response.data;
  },

  // Cancel a booking
  cancelBooking: async (id) => {
    const response = await api.patch(`/bookings/cancel/${id}`);
    return response.data;
  },

  // Get user's bookings (we'll need to add this endpoint to backend or use user data)
  getUserBookings: async () => {
    // This might need to be implemented in the backend
    // For now, we'll handle this through user profile data
    const response = await api.get('/users/me'); // Assuming this includes bookings
    return response.data;
  },
};

export default bookingsService;