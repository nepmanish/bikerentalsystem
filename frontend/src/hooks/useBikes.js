import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import bikesService from '../services/bikesService';
import toast from 'react-hot-toast';

// Get all bikes
export const useBikes = (params = {}) => {
  return useQuery({
    queryKey: ['bikes', params],
    queryFn: () => bikesService.getAllBikes(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Get single bike
export const useBike = (id) => {
  return useQuery({
    queryKey: ['bike', id],
    queryFn: () => bikesService.getBike(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

// Get top cheap bikes
export const useTopCheapBikes = () => {
  return useQuery({
    queryKey: ['bikes', 'top-cheap'],
    queryFn: bikesService.getTopCheapBikes,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Get bike stats
export const useBikeStats = () => {
  return useQuery({
    queryKey: ['bikes', 'stats'],
    queryFn: bikesService.getBikeStats,
    staleTime: 10 * 60 * 1000,
  });
};

// Create bike mutation (admin)
export const useCreateBike = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: bikesService.createBike,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bikes'] });
      toast.success('Bike created successfully!');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to create bike');
    },
  });
};

// Update bike mutation (admin)
export const useUpdateBike = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }) => bikesService.updateBike(id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['bikes'] });
      queryClient.invalidateQueries({ queryKey: ['bike', variables.id] });
      toast.success('Bike updated successfully!');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update bike');
    },
  });
};

// Delete bike mutation (admin)
export const useDeleteBike = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: bikesService.deleteBike,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bikes'] });
      toast.success('Bike deleted successfully!');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to delete bike');
    },
  });
};

// Recluster bikes mutation (admin)
export const useReclusterBikes = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: bikesService.reclusterBikes,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bikes'] });
      toast.success('Bikes reclustered successfully!');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to recluster bikes');
    },
  });
};