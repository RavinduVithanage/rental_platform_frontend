import { useState, useEffect, useRef } from "react";
import api from "../api";

export default function Listings() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    location: "",
    type: "",
    category: "",
    min_price: "",
    max_price: "",
  });


  const [form, setForm] = useState({
    title: "",
    description: "",
    type: "",
    category: "",
    price: "",
    location: "",
    amenities: [],
    images: [],
  });
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        const response = await api.get('/rental-items');
        console.log('API Response:', response.data); // Log the response to inspect its structure
        // The listings array is at response.data.data.data
        let filteredListings = Array.isArray(response.data?.data?.data) ? response.data.data.data : [];
        console.log('Filtered Listings Before Filters:', filteredListings); // Log before applying filters

        if (filters.location) {
          filteredListings = filteredListings.filter(listing => 
            listing.location.toLowerCase().includes(filters.location.toLowerCase())
          );
        }
        
        if (filters.type) {
          filteredListings = filteredListings.filter(listing => 
            listing.type === filters.type
          );
        }
        
        if (filters.category) {
          filteredListings = filteredListings.filter(listing => 
            listing.category === filters.category
          );
        }
        
        if (filters.min_price) {
          filteredListings = filteredListings.filter(listing => 
            listing.price >= parseInt(filters.min_price)
          );
        }
        
        if (filters.max_price) {
          filteredListings = filteredListings.filter(listing => 
            listing.price <= parseInt(filters.max_price)
          );
        }
        
        setListings(filteredListings);
      } catch (error) {
        console.error("Error fetching listings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleFormChange = (e) => {
    const { name, value, type } = e.target;
    if (name === "amenities") {
      setForm((prev) => ({
        ...prev,
        amenities: value
          .split(",")
          .map((a) => a.trim())
          .filter(Boolean),
      }));
    } else if (name === "images") {
      setForm((prev) => ({
        ...prev,
        images: value
          .split(",")
          .map((img) => img.trim())
          .filter(Boolean),
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: type === "number" ? Number(value) : value,
      }));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    try {
      const response = await api.post('/rental-items', form);
      const newListing = response.data;
      setListings(prev => [newListing, ...prev]);
      // Assuming you have a state for showing the form
      // setShowForm(false);
      setForm({
        title: "",
        description: "",
        type: "",
        category: "",
        price: "",
        location: "",
        amenities: [],
        images: [],
      });
    } catch (err) {
      setFormError("Failed to create listing");
    }
  };

  const FilterSidebar = ({ filters, onChange }) => (
    <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-white/20 sticky top-6">
      <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
        🎯 Filter Results
      </h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">📍 Location</label>
          <input
            type="text"
            value={filters.location}
            onChange={(e) => onChange({ ...filters, location: e.target.value })}
            className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
            placeholder="Enter location"
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">🏠 Type</label>
          <select
            value={filters.type}
            onChange={(e) => onChange({ ...filters, type: e.target.value })}
            className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
          >
            <option value="">All Types</option>
            <option value="home">Home</option>
            <option value="room">Room</option>
            <option value="cabana">Cabana</option>
            <option value="hotel">Hotel</option>
            <option value="car">Car</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">📋 Category</label>
          <select
            value={filters.category}
            onChange={(e) => onChange({ ...filters, category: e.target.value })}
            className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
          >
            <option value="">All Categories</option>
            <option value="vehicle">Vehicle</option>
            <option value="residence">Residence</option>
            <option value="other">Other</option>
          </select>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">💰 Min Price</label>
            <input
              type="number"
              value={filters.min_price}
              onChange={(e) => onChange({ ...filters, min_price: e.target.value })}
              className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
              placeholder="Min"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">💰 Max Price</label>
            <input
              type="number"
              value={filters.max_price}
              onChange={(e) => onChange({ ...filters, max_price: e.target.value })}
              className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
              placeholder="Max"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const ListingCard = ({ listing }) => (
    <div className="group cursor-pointer transform hover:scale-105 hover:-translate-y-2 transition-all duration-500">
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-300 h-full">
        <div className="relative overflow-hidden">
          <img
            src={listing.images && listing.images.length > 0 ? listing.images[0] : "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"}
            alt={listing.title}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-4 left-4">
            <span className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-semibold capitalize">
              {listing.type}
            </span>
          </div>
          <div className="absolute top-4 right-4">
            <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-bold">
              ${listing.price}/day
            </span>
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">
            {listing.title}
          </h3>
          
          <p className="text-gray-600 mb-4 line-clamp-2">
            {listing.description}
          </p>
          
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <span className="flex items-center">
              📍 {listing.location}
            </span>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {listing.amenities.slice(0, 3).map((amenity, index) => (
              <span
                key={index}
                className="bg-gradient-to-r from-blue-100 to-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-medium"
              >
                {amenity}
              </span>
            ))}
            {listing.amenities.length > 3 && (
              <span className="text-xs text-gray-500 px-3 py-1">
                +{listing.amenities.length - 3} more
              </span>
            )}
          </div>
          
          <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 rounded-2xl group-hover:from-pink-500 group-hover:to-purple-500 transition-all duration-300 transform group-hover:scale-105">
            View Details
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-out;
        }
        .animate-slide-up {
          animation: slideUp 0.8s ease-out;
        }
        .animate-slide-up-delay {
          animation: slideUp 0.8s ease-out 0.3s both;
        }
        .shimmer {
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>

      {/* Hero Section */}
      <div className="relative py-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")'
          }}
        ></div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 6 }, (_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-yellow-400 rounded-full opacity-60 animate-pulse"
              style={{
                left: `${15 + i * 15}%`,
                top: `${25 + i * 10}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + i * 0.5}s`
              }}
            />
          ))}
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
            <span className="block bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              Discover Amazing
            </span>
            <span className="block text-3xl md:text-4xl mt-2 text-cyan-200">
              Rental Experiences
            </span>
          </h1>
          
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto animate-slide-up">
            Find your perfect home, vehicle, or unique experience in beautiful Sri Lanka
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Sidebar */}
          <div className="lg:w-1/4">
            <FilterSidebar filters={filters} onChange={handleFilterChange} />
          </div>

          {/* Listings Content */}
          <div className="lg:w-3/4">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="animate-slide-up">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Available Rentals
                </h2>
                <p className="text-gray-600 mt-2">
                  {loading ? "Loading..." : `${listings.length} amazing options found`}
                </p>
              </div>
            </div>
            {/* Listings Grid */}
            {loading ? (
              <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white/90 rounded-3xl overflow-hidden shadow-xl">
                    <div className="shimmer h-48 w-full"></div>
                    <div className="p-6 space-y-4">
                      <div className="shimmer h-6 w-3/4 rounded"></div>
                      <div className="shimmer h-4 w-full rounded"></div>
                      <div className="shimmer h-4 w-2/3 rounded"></div>
                      <div className="shimmer h-10 w-full rounded-2xl"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : listings.length === 0 ? (
              <div className="text-center py-20">
                <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-12 shadow-xl border border-white/20 max-w-md mx-auto">
                  <div className="text-6xl mb-6">🔍</div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    No listings found
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your filters or search criteria
                  </p>
                  <button
                    onClick={() => setFilters({
                      location: "",
                      type: "",
                      category: "",
                      min_price: "",
                      max_price: "",
                    })}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold px-6 py-3 rounded-2xl hover:from-pink-500 hover:to-purple-500 transition-all duration-300"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {listings.map((listing, index) => (
                  <div 
                    key={listing.id} 
                    className="animate-slide-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <ListingCard listing={listing} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}