import React, { useState } from 'react';
import { useBikes } from '../hooks/useBikes';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Button from '../components/common/Button';
import { 
  Search, 
  Filter, 
  Star, 
  Engine, 
  Weight,
  DollarSign,
  SlidersHorizontal
} from 'lucide-react';
import { formatCurrency, generateStarRating, truncateText } from '../utils/helpers';
import { Link } from 'react-router-dom';

const BikeCard = ({ bike }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-w-16 aspect-h-9 bg-gray-200">
        <div className="flex items-center justify-center h-48 bg-gradient-to-br from-blue-50 to-indigo-100">
          <Engine className="h-16 w-16 text-blue-400" />
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{bike.name}</h3>
            <p className="text-sm text-gray-600 mb-2">
              {truncateText(bike.summary, 100)}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4 mb-4 text-sm text-gray-500">
          <div className="flex items-center">
            <Engine className="h-4 w-4 mr-1" />
            <span>{bike.engineCC}cc</span>
          </div>
          <div className="flex items-center">
            <Weight className="h-4 w-4 mr-1" />
            <span>{bike.weight}kg</span>
          </div>
          <div className="flex items-center">
            <Star className="h-4 w-4 mr-1 text-yellow-400" />
            <span>{bike.ratingsAverage}</span>
            <span className="ml-1">({bike.ratingsQuantity})</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-gray-900">
              {formatCurrency(bike.price)}
            </span>
            <span className="text-sm text-gray-600">/day</span>
            {bike.priceDiscount && (
              <div className="text-sm text-gray-500 line-through">
                {formatCurrency(bike.price + bike.priceDiscount)}
              </div>
            )}
          </div>
          <Link to={`/bikes/${bike._id}`}>
            <Button size="sm">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const BikesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    sort: 'name',
    minPrice: '',
    maxPrice: '',
    minRating: '',
  });
  const [showFilters, setShowFilters] = useState(false);

  const { data: bikesData, isLoading, error } = useBikes({
    search: searchTerm,
    ...filters,
  });

  if (isLoading) {
    return <LoadingSpinner text="Loading bikes..." />;
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <h1 className="text-2xl font-bold text-red-600">Error Loading Bikes</h1>
        <p className="text-gray-600 mt-2">Please try again later.</p>
      </div>
    );
  }

  const bikes = bikesData?.data?.bikes || [];

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Available Bikes</h1>
          <p className="text-gray-600 mt-2">
            Choose from our wide selection of bikes for your adventure
          </p>
        </div>
        <div className="text-sm text-gray-500">
          {bikes.length} bikes available
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search bikes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Filter Toggle */}
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center"
          >
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Expanded Filters */}
        {showFilters && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sort by
                </label>
                <select
                  value={filters.sort}
                  onChange={(e) => handleFilterChange('sort', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="name">Name</option>
                  <option value="price">Price: Low to High</option>
                  <option value="-price">Price: High to Low</option>
                  <option value="-ratingsAverage">Rating</option>
                  <option value="engineCC">Engine CC</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Min Price
                </label>
                <input
                  type="number"
                  placeholder="0"
                  value={filters.minPrice}
                  onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Max Price
                </label>
                <input
                  type="number"
                  placeholder="1000"
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Min Rating
                </label>
                <select
                  value={filters.minRating}
                  onChange={(e) => handleFilterChange('minRating', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Any</option>
                  <option value="1">1+ Stars</option>
                  <option value="2">2+ Stars</option>
                  <option value="3">3+ Stars</option>
                  <option value="4">4+ Stars</option>
                  <option value="4.5">4.5+ Stars</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bikes Grid */}
      {bikes.length === 0 ? (
        <div className="text-center py-12">
          <Engine className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No bikes found</h3>
          <p className="text-gray-600">Try adjusting your search or filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bikes.map((bike) => (
            <BikeCard key={bike._id} bike={bike} />
          ))}
        </div>
      )}

      {/* Load More (if pagination is implemented) */}
      {bikes.length > 0 && (
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Bikes
          </Button>
        </div>
      )}
    </div>
  );
};

export default BikesPage;