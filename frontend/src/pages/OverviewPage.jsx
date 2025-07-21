import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useBikes, useTopCheapBikes, useBikeStats } from '../hooks/useBikes';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Button from '../components/common/Button';
import { 
  Bike, 
  Star, 
  DollarSign, 
  TrendingUp, 
  Calendar,
  MapPin,
  Users,
  BarChart3
} from 'lucide-react';
import { formatCurrency, generateStarRating, truncateText } from '../utils/helpers';
import { Link } from 'react-router-dom';

const StatCard = ({ title, value, icon: Icon, color = 'blue' }) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
    orange: 'bg-orange-50 text-orange-600',
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
};

const BikeCard = ({ bike }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">{bike.name}</h3>
            <p className="text-sm text-gray-600 mt-1">
              {truncateText(bike.summary, 80)}
            </p>
            <div className="flex items-center mt-2 space-x-4">
              <div className="flex items-center text-sm text-gray-500">
                <span>{generateStarRating(bike.ratingsAverage)}</span>
                <span className="ml-1">({bike.ratingsQuantity})</span>
              </div>
              <div className="text-sm text-gray-500">
                {bike.engineCC}cc
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-gray-900">
              {formatCurrency(bike.price)}/day
            </p>
            {bike.priceDiscount && (
              <p className="text-sm text-gray-500 line-through">
                {formatCurrency(bike.price + bike.priceDiscount)}
              </p>
            )}
          </div>
        </div>
        <div className="mt-4">
          <Link to={`/bikes/${bike._id}`}>
            <Button size="sm" fullWidth>
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const OverviewPage = () => {
  const { user } = useAuth();
  const { data: bikesData, isLoading: bikesLoading } = useBikes({ limit: 6 });
  const { data: topCheapBikes, isLoading: topCheapLoading } = useTopCheapBikes();
  const { data: bikeStats, isLoading: statsLoading } = useBikeStats();

  if (bikesLoading || topCheapLoading || statsLoading) {
    return <LoadingSpinner text="Loading dashboard..." />;
  }

  const bikes = bikesData?.data?.bikes || [];
  const cheapBikes = topCheapBikes?.data?.bikes || [];
  const stats = bikeStats?.data || {};

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.name}! 🏍️
        </h1>
        <p className="text-gray-600 mt-2">
          Here's what's happening with your bike rental system today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Bikes"
          value={stats.totalBikes || bikes.length}
          icon={Bike}
          color="blue"
        />
        <StatCard
          title="Average Rating"
          value={stats.averageRating?.toFixed(1) || '4.5'}
          icon={Star}
          color="green"
        />
        <StatCard
          title="Average Price"
          value={formatCurrency(stats.averagePrice || 50)}
          icon={DollarSign}
          color="purple"
        />
        <StatCard
          title="Active Users"
          value={stats.totalUsers || '100+'}
          icon={Users}
          color="orange"
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link to="/bikes">
            <Button variant="outline" fullWidth className="h-20 flex-col">
              <Bike className="h-6 w-6 mb-2" />
              Browse Bikes
            </Button>
          </Link>
          <Link to="/bookings">
            <Button variant="outline" fullWidth className="h-20 flex-col">
              <Calendar className="h-6 w-6 mb-2" />
              My Bookings
            </Button>
          </Link>
          <Link to="/profile">
            <Button variant="outline" fullWidth className="h-20 flex-col">
              <MapPin className="h-6 w-6 mb-2" />
              Update Profile
            </Button>
          </Link>
          <Link to="/bikes/stats">
            <Button variant="outline" fullWidth className="h-20 flex-col">
              <BarChart3 className="h-6 w-6 mb-2" />
              View Stats
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Cheap Bikes */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Top Budget-Friendly Bikes
            </h2>
            <Link to="/bikes?sort=price">
              <Button variant="ghost" size="sm">
                View all
              </Button>
            </Link>
          </div>
          <div className="space-y-4">
            {cheapBikes.slice(0, 3).map((bike) => (
              <div key={bike._id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{bike.name}</h4>
                  <p className="text-sm text-gray-600">{bike.engineCC}cc</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600">{formatCurrency(bike.price)}/day</p>
                  <p className="text-xs text-gray-500">{generateStarRating(bike.ratingsAverage)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Bikes */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Latest Bikes
            </h2>
            <Link to="/bikes">
              <Button variant="ghost" size="sm">
                View all
              </Button>
            </Link>
          </div>
          <div className="space-y-4">
            {bikes.slice(0, 3).map((bike) => (
              <div key={bike._id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{bike.name}</h4>
                  <p className="text-sm text-gray-600">{truncateText(bike.summary, 50)}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-blue-600">{formatCurrency(bike.price)}/day</p>
                  <Link to={`/bikes/${bike._id}`}>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Popular Bikes Grid */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Popular Bikes</h2>
          <Link to="/bikes">
            <Button variant="outline">
              View All Bikes
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bikes.slice(0, 6).map((bike) => (
            <BikeCard key={bike._id} bike={bike} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;