import { useState, useEffect, useRef } from "react";

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

  const [showForm, setShowForm] = useState(false);
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

  // Sample listings data
  const sampleListings = [
    {
      id: 1,
      title: "🏖️ Beachfront Villa in Mirissa",
      description: "Stunning oceanfront villa with infinity pool and direct beach access. Perfect for families and groups.",
      type: "home",
      category: "residence",
      price: 250,
      location: "Mirissa",
      amenities: ["Infinity Pool", "WiFi", "Beach Access", "Full Kitchen", "Air Conditioning"],
      images: ["https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"]
    },
    {
      id: 2,
      title: "🏔️ Mountain Retreat in Kandy",
      description: "Cozy mountain cabin surrounded by lush tea plantations with breathtaking valley views.",
      type: "cabana",
      category: "residence",
      price: 120,
      location: "Kandy",
      amenities: ["Mountain View", "Tea Garden", "Fireplace", "Hiking Trails"],
      images: ["https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"]
    },
    {
      id: 3,
      title: "🚗 Luxury SUV Rental",
      description: "Premium 4WD vehicle perfect for exploring Sri Lanka's diverse landscapes in comfort.",
      type: "car",
      category: "vehicle",
      price: 80,
      location: "Colombo",
      amenities: ["GPS Navigation", "Air Conditioning", "Full Insurance", "4WD"],
      images: ["https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"]
    },
    {
      id: 4,
      title: "🌴 Tropical Resort Room",
      description: "Luxurious resort room with palm tree views and access to spa facilities.",
      type: "room",
      category: "residence",
      price: 180,
      location: "Bentota",
      amenities: ["Spa Access", "Room Service", "Balcony", "Mini Bar"],
      images: ["https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"]
    },
    {
      id: 5,
      title: "🏛️ Heritage Hotel in Galle",
      description: "Historic colonial hotel in the heart of Galle Fort with modern amenities.",
      type: "hotel",
      category: "residence",
      price: 200,
      location: "Galle",
      amenities: ["Historic Building", "City Center", "Restaurant", "WiFi"],
      images: ["https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"]
    },
    {
      id: 6,
      title: "🏍️ Motorbike Adventure",
      description: "Explore Sri Lanka's scenic routes on this reliable motorbike rental.",
      type: "car",
      category: "vehicle", 
      price: 45,
      location: "Ella",
      amenities: ["Helmet Included", "Route Maps", "Insurance", "24/7 Support"],
      images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"]
    }
  ];

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Filter listings based on current filters
        let filteredListings = sampleListings;
        
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Add new listing to the list
      const newListing = {
        id: Date.now(),
        ...form,
        price: Number(form.price),
        images: form.images.length > 0 ? form.images : ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"]
      };
      
      setListings(prev => [newListing, ...prev]);
      setShowForm(false);
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
            src={listing.images[0]}
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
      <style jsx>{`
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
              
              <button
                className="group relative px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300 overflow-hidden animate-slide-up-delay"
                onClick={() => setShowForm(true)}
              >
                <span className="relative z-10">✨ Create Listing</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>

            {/* Create Listing Form */}
            {showForm && (
              <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/20 mb-8 animate-slide-up">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
                  🏠 Create New Listing
                </h3>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                      <input
                        name="title"
                        value={form.title}
                        onChange={handleFormChange}
                        required
                        className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                        placeholder="Enter listing title"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                      <input
                        name="location"
                        value={form.location}
                        onChange={handleFormChange}
                        required
                        className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                        placeholder="Enter location"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                    <textarea
                      name="description"
                      value={form.description}
                      onChange={handleFormChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                      placeholder="Describe your listing"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Type</label>
                      <select
                        name="type"
                        value={form.type}
                        onChange={handleFormChange}
                        required
                        className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                      >
                        <option value="">Select type</option>
                        <option value="home">Home</option>
                        <option value="room">Room</option>
                        <option value="cabana">Cabana</option>
                        <option value="hotel">Hotel</option>
                        <option value="car">Car</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                      <select
                        name="category"
                        value={form.category}
                        onChange={handleFormChange}
                        required
                        className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                      >
                        <option value="">Select category</option>
                        <option value="vehicle">Vehicle</option>
                        <option value="residence">Residence</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Price per day</label>
                      <input
                        name="price"
                        type="number"
                        min="0"
                        value={form.price}
                        onChange={handleFormChange}
                        required
                        className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                        placeholder="Enter price"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Amenities (comma separated)</label>
                    <input
                      name="amenities"
                      value={form.amenities.join(", ")}
                      onChange={handleFormChange}
                      className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                      placeholder="WiFi, Pool, Kitchen, etc."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Image URLs (comma separated)</label>
                    <input
                      name="images"
                      type="text"
                      value={form.images.join(", ")}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          images: e.target.value
                            .split(",")
                            .map((img) => img.trim())
                            .filter(Boolean),
                        }))
                      }
                      className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                      placeholder="Enter image URLs"
                    />
                  </div>
                  
                  {formError && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl">
                      {formError}
                    </div>
                  )}
                  
                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={handleFormSubmit}
                      className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold py-3 rounded-2xl hover:from-blue-500 hover:to-green-500 transition-all duration-300 transform hover:scale-105"
                    >
                      ✨ Create Listing
                    </button>
                    <button
                      type="button"
                      className="flex-1 bg-gray-200 text-gray-700 font-semibold py-3 rounded-2xl hover:bg-gray-300 transition-all duration-300"
                      onClick={() => setShowForm(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

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