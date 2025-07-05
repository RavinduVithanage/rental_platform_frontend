import { useState, useEffect } from "react";
import { Plus, Edit3, Eye, Heart, Star, Calendar, MapPin, DollarSign, TrendingUp, Users, Settings, Bell, Search, Filter, Grid, List, MoreVertical, Trash2 } from "lucide-react";

export default function UserDashboard() {
  const [myListings, setMyListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingListing, setEditingListing] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock data for demonstration
  const mockListings = [
    {
      id: 1,
      title: "Beachfront Villa in Mirissa",
      location: "Mirissa, Southern Province",
      price: 150,
      currency: "USD",
      category: "Villa",
      status: "active",
      views: 234,
      likes: 18,
      bookings: 12,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "Mountain Retreat in Ella",
      location: "Ella, Uva Province",
      price: 85,
      currency: "USD",
      category: "Cottage",
      status: "active",
      views: 189,
      likes: 24,
      bookings: 8,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      title: "Luxury SUV - Toyota Prado",
      location: "Colombo, Western Province",
      price: 65,
      currency: "USD",
      category: "Vehicle",
      status: "pending",
      views: 156,
      likes: 15,
      bookings: 5,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1562141961-d306ad2c6c1c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  const dashboardStats = [
    { label: "Total Listings", value: "12", icon: Grid, color: "from-blue-500 to-cyan-500", change: "+2" },
    { label: "Total Views", value: "2,341", icon: Eye, color: "from-purple-500 to-pink-500", change: "+15%" },
    { label: "Total Bookings", value: "89", icon: Calendar, color: "from-green-500 to-emerald-500", change: "+8" },
    { label: "Total Earnings", value: "$4,250", icon: DollarSign, color: "from-orange-500 to-red-500", change: "+12%" }
  ];

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
    // Simulate API call
    const timer = setTimeout(() => {
      setMyListings(mockListings);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const filteredListings = myListings.filter(listing => {
    const matchesSearch = listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || listing.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleEdit = (listing) => {
    setEditingListing(listing);
    setForm({
      title: listing.title,
      description: listing.description || "",
      type: listing.type || "",
      category: listing.category,
      price: listing.price.toString(),
      location: listing.location,
      amenities: listing.amenities || [],
      images: listing.images || [listing.image],
    });
    setShowForm(true);
  };

  const handleAdd = () => {
    setEditingListing(null);
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
    setShowForm(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'amenities') {
      setForm(prev => ({
        ...prev,
        amenities: value.split(',').map(item => item.trim()).filter(Boolean)
      }));
    } else {
      setForm(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleFormSubmit = (e) => {
    if (e) e.preventDefault();
    setFormError(null);

    // Basic validation
    if (!form.title || !form.location || !form.type || !form.category || !form.price) {
      setFormError("Please fill in all required fields");
      return;
    }

    if (isNaN(parseFloat(form.price)) || parseFloat(form.price) <= 0) {
      setFormError("Please enter a valid price");
      return;
    }

    // Create new listing object
    const newListing = {
      id: editingListing ? editingListing.id : Date.now(),
      title: form.title,
      description: form.description,
      type: form.type,
      category: form.category,
      price: parseFloat(form.price),
      location: form.location,
      amenities: form.amenities,
      images: form.images,
      image: form.images[0] || "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      status: "pending",
      views: 0,
      likes: 0,
      bookings: 0,
      rating: 0,
      currency: "USD"
    };

    if (editingListing) {
      // Update existing listing
      setMyListings(prev => 
        prev.map(listing => 
          listing.id === editingListing.id ? { ...listing, ...newListing } : listing
        )
      );
    } else {
      // Add new listing
      setMyListings(prev => [...prev, newListing]);
    }

    // Reset form and close
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
    setShowForm(false);
    setEditingListing(null);
  };

  const ListingCard = ({ listing }) => (
    <div className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1">
      <div className="relative overflow-hidden">
        <img 
          src={listing.image} 
          alt={listing.title}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="absolute top-3 left-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            listing.status === 'active' 
              ? 'bg-green-100 text-green-800' 
              : listing.status === 'pending'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-red-100 text-red-800'
          }`}>
            {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
          </span>
        </div>

        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => handleEdit(listing)}
            className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
          >
            <Edit3 size={16} className="text-gray-700" />
          </button>
          <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
            <MoreVertical size={16} className="text-gray-700" />
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">{listing.title}</h3>
            <p className="text-sm text-gray-500 flex items-center">
              <MapPin size={14} className="mr-1" />
              {listing.location}
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-900">${listing.price}</p>
            <p className="text-sm text-gray-500">per night</p>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-4">
            <span className="flex items-center">
              <Eye size={14} className="mr-1" />
              {listing.views}
            </span>
            <span className="flex items-center">
              <Heart size={14} className="mr-1" />
              {listing.likes}
            </span>
            <span className="flex items-center">
              <Calendar size={14} className="mr-1" />
              {listing.bookings}
            </span>
          </div>
          <div className="flex items-center">
            <Star size={14} className="text-yellow-400 mr-1" />
            <span className="font-medium">{listing.rating}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium py-2 px-4 rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300">
            View Details
          </button>
          <button className="px-4 py-2 border-2 border-gray-200 text-gray-700 rounded-xl hover:border-gray-300 transition-colors">
            <Settings size={16} />
          </button>
        </div>
      </div>
    </div>
  );

  const ListingRow = ({ listing }) => (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6 border border-gray-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img 
            src={listing.image} 
            alt={listing.title}
            className="w-16 h-16 object-cover rounded-xl"
          />
          <div>
            <h3 className="font-semibold text-gray-900">{listing.title}</h3>
            <p className="text-sm text-gray-500 flex items-center">
              <MapPin size={14} className="mr-1" />
              {listing.location}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-8">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">${listing.price}</p>
            <p className="text-sm text-gray-500">per night</p>
          </div>
          
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <span className="flex items-center">
              <Eye size={14} className="mr-1" />
              {listing.views}
            </span>
            <span className="flex items-center">
              <Heart size={14} className="mr-1" />
              {listing.likes}
            </span>
            <span className="flex items-center">
              <Calendar size={14} className="mr-1" />
              {listing.bookings}
            </span>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => handleEdit(listing)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <Edit3 size={16} />
            </button>
            <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
              <MoreVertical size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 mt-16">
      <div className="bg-white/70 backdrop-blur-lg border-b border-white/20 relative top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Dashboard
              </h1>
              <p className="text-gray-600 mt-1">Manage your rental listings</p>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell size={20} />
              </button>
              <button
                className="group relative px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300 overflow-hidden"
                onClick={handleAdd}
              >
                <span className="relative z-10">✨ Create Listing</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardStats.map((stat, index) => (
            <div key={index} className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-green-600 font-medium">{stat.change}</p>
                </div>
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                  <stat.icon size={24} className="text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-lg mb-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 w-full lg:w-auto">
              <div className="relative flex-1 lg:w-80">
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search listings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
              </div>
              
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-xl transition-all duration-300 ${
                  viewMode === 'grid' 
                    ? 'bg-blue-500 text-white shadow-lg' 
                    : 'bg-white/50 text-gray-600 hover:bg-white/70'
                }`}
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 rounded-xl transition-all duration-300 ${
                  viewMode === 'list' 
                    ? 'bg-blue-500 text-white shadow-lg' 
                    : 'bg-white/50 text-gray-600 hover:bg-white/70'
                }`}
              >
                <List size={20} />
              </button>
            </div>
          </div>
        </div>

        {showForm && (
          <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/20 mb-8">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
              🏠 {editingListing ? 'Edit' : 'Create New'} Listing
            </h3>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Title *</label>
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
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Location *</label>
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
                  rows={4}
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                  placeholder="Describe your listing"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Type *</label>
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
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
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
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Price per day *</label>
                  <input
                    name="price"
                    type="number"
                    min="0"
                    step="0.01"
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
                  ✨ {editingListing ? 'Update' : 'Create'} Listing
                </button>
                <button
                  type="button"
                  className="flex-1 bg-gray-200 text-gray-700 font-semibold py-3 rounded-2xl hover:bg-gray-300 transition-all duration-300"
                  onClick={() => {
                    setShowForm(false);
                    setEditingListing(null);
                    setFormError(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white/70 rounded-3xl p-6 animate-pulse">
                <div className="h-48 bg-gray-200 rounded-2xl mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="flex gap-2">
                  <div className="h-8 bg-gray-200 rounded flex-1"></div>
                  <div className="h-8 w-8 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredListings.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Grid size={40} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No listings found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || filterStatus !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : 'Create your first listing to get started!'
              }
            </p>
            <button
              onClick={handleAdd}
              className="bg-gradient-to-r from-orange-500 to-pink-500 text-white font-medium px-8 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Create First Listing
            </button>
          </div>
        ) : (
          <div className={
            viewMode === 'grid' 
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4'
          }>
            {filteredListings.map((listing) => (
              viewMode === 'grid' 
                ? <ListingCard key={listing.id} listing={listing} />
                : <ListingRow key={listing.id} listing={listing} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}