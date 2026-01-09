import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { 
  Plus, Edit3, Eye, Heart, Calendar, MapPin, DollarSign, 
  TrendingUp, Users, Settings, Bell, Search, Grid, List, 
  Trash2, Home, Package, Clock, ChevronLeft, ChevronRight,
  AlertTriangle, CheckCircle, ShoppingCart, RefreshCw,
  LogOut, Menu, X, BarChart3, Sparkles, ArrowUpRight,
  Activity, Star, Layers, Wrench, Construction
} from "lucide-react";
import api from "../../api";
import SearchSelect from "../../components/ui/SearchSelect";

export default function UserDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [myListings, setMyListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingListing, setEditingListing] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [dateRange, setDateRange] = useState('7d');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const dashboardStats = [
    { 
      label: "Total Listings", 
      value: myListings.length.toString(), 
      icon: Home, 
      gradient: "from-cyan-500 to-blue-600",
      bgGlow: "bg-cyan-500/10",
      change: "+2",
    },
    { 
      label: "Total Views", 
      value: "2,341", 
      icon: Eye, 
      gradient: "from-blue-500 to-indigo-600",
      bgGlow: "bg-blue-500/10",
      change: "+15%",
    },
    { 
      label: "Active Bookings", 
      value: "89", 
      icon: Calendar, 
      gradient: "from-indigo-500 to-violet-600",
      bgGlow: "bg-indigo-500/10",
      change: "+8",
    },
    { 
      label: "Revenue", 
      value: "Rs. 45,250", 
      icon: DollarSign, 
      gradient: "from-violet-500 to-purple-600",
      bgGlow: "bg-violet-500/10",
      change: "+12%",
    }
  ];

  const recentActivities = [
    { icon: CheckCircle, gradient: "from-cyan-500 to-blue-500", text: "Booking #2024-0001 confirmed", time: "2 min ago" },
    { icon: Users, gradient: "from-blue-500 to-indigo-500", text: "New inquiry: Beach Villa", time: "15 min ago" },
    { icon: AlertTriangle, gradient: "from-amber-500 to-orange-500", text: "Low availability alert", time: "1 hour ago" },
    { icon: ShoppingCart, gradient: "from-indigo-500 to-violet-500", text: "Booking #2024-0003 created", time: "2 hours ago" },
    { icon: Star, gradient: "from-violet-500 to-purple-500", text: "New 5-star review received", time: "3 hours ago" },
  ];

  // Pages with content
  const pagesWithContent = ['dashboard', 'listings'];

  const sidebarMenuItems = [
    { icon: BarChart3, label: "Dashboard", id: "dashboard" },
    { icon: Home, label: "Listings", id: "listings", badge: myListings.length || null },
    { icon: Calendar, label: "Bookings", id: "bookings", badge: "5" },
    { icon: Heart, label: "Favorites", id: "favorites" },
    { icon: Users, label: "Messages", id: "messages", badge: "3" },
    { icon: TrendingUp, label: "Analytics", id: "analytics" },
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

  const typeOptions = [
    { value: 'home', label: '🏡 Home' },
    { value: 'room', label: '🛏️ Room' },
    { value: 'cabana', label: '🏖️ Cabana' },
    { value: 'hotel', label: '🏨 Hotel' },
    { value: 'car', label: '🚗 Car' },
  ];

  const categoryOptions = [
    { value: 'vehicle', label: '🚙 Vehicle' },
    { value: 'residence', label: '🏠 Residence' },
    { value: 'other', label: '📦 Other' },
  ];

  const statusOptions = [
    { value: 'all', label: '📋 All Status' },
    { value: 'active', label: '✅ Active' },
    { value: 'pending', label: '⏳ Pending' },
    { value: 'inactive', label: '❌ Inactive' },
  ];

  useEffect(() => {
    const fetchMyListings = async () => {
      try {
        setLoading(true);
        const response = await api.get('/rental-items');
        setMyListings(response.data.data.data || []);
      } catch (error) {
        console.error("Error fetching listings:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMyListings();
  }, []);

  const filteredListings = myListings.filter(listing => {
    const matchesSearch = listing.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.location?.toLowerCase().includes(searchTerm.toLowerCase());
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
    setForm({ title: "", description: "", type: "", category: "", price: "", location: "", amenities: [], images: [] });
    setShowForm(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    if (name === 'amenities') {
      setForm(prev => ({ ...prev, amenities: value.split(',').map(item => item.trim()).filter(Boolean) }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFormSubmit = async (e) => {
    if (e) e.preventDefault();
    setFormError(null);
    if (!form.title || !form.location || !form.type || !form.category || !form.price) {
      setFormError("Please fill in all required fields");
      return;
    }
    if (isNaN(parseFloat(form.price)) || parseFloat(form.price) <= 0) {
      setFormError("Please enter a valid price");
      return;
    }
    try {
      if (editingListing) {
        const response = await api.put(`/rental-items/${editingListing.id}`, form);
        setMyListings(prev => prev.map(listing => listing.id === editingListing.id ? response.data.data : listing));
      } else {
        const response = await api.post('/create-rental-item', form);
        setMyListings(prev => [...prev, response.data.data]);
      }
      setForm({ title: "", description: "", type: "", category: "", price: "", location: "", amenities: [], images: [] });
      setShowForm(false);
      setEditingListing(null);
    } catch (error) {
      console.error("Failed to save listing:", error);
      setFormError("Failed to save listing. Please try again.");
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const weeklyData = [
    { day: 'Mon', value: 35 },
    { day: 'Tue', value: 45 },
    { day: 'Wed', value: 55 },
    { day: 'Thu', value: 65 },
    { day: 'Fri', value: 75 },
    { day: 'Sat', value: 95 },
    { day: 'Sun', value: 40 },
  ];
  const maxValue = Math.max(...weeklyData.map(d => d.value));

  // Under Maintenance Component
  const UnderMaintenance = ({ pageName }) => (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex-1 flex items-center justify-center p-8"
    >
      <div className="text-center max-w-md">
        <motion.div 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", bounce: 0.5 }}
          className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-3xl flex items-center justify-center border border-amber-500/30"
        >
          <Construction className="w-12 h-12 text-amber-400" />
        </motion.div>
        <h2 className="text-2xl font-bold text-white mb-3">Under Maintenance</h2>
        <p className="text-slate-400 mb-6">
          The <span className="text-cyan-400 font-semibold capitalize">{pageName}</span> page is currently under development. 
          We're working hard to bring you new features soon!
        </p>
        <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
          <Wrench className="w-4 h-4 animate-pulse" />
          <span>Coming Soon</span>
        </div>
      </div>
    </motion.div>
  );

  // Dashboard Content Component
  const DashboardContent = () => (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        {dashboardStats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`relative bg-[#0a0f1a]/60 backdrop-blur-sm rounded-2xl p-4 lg:p-5 border border-white/5 overflow-hidden group hover:border-cyan-500/20 transition-all duration-300`}
          >
            <div className={`absolute inset-0 ${stat.bgGlow} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            <div className="relative flex items-start justify-between">
              <div className={`w-10 h-10 lg:w-11 lg:h-11 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <div className="flex items-center gap-1 text-xs font-semibold text-cyan-400">
                <ArrowUpRight className="w-3 h-3" />
                {stat.change}
              </div>
            </div>
            <div className="relative mt-3">
              <p className="text-slate-500 text-xs font-medium">{stat.label}</p>
              <p className="text-xl lg:text-2xl font-bold text-white mt-1">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts & Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-[#0a0f1a]/60 backdrop-blur-sm rounded-2xl p-5 border border-white/5"
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-base font-bold text-white">Revenue Overview</h3>
              <p className="text-xs text-slate-500">Weekly performance</p>
            </div>
            <button className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-all">
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex items-end justify-between h-36 lg:h-44 gap-2 lg:gap-3">
            {weeklyData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(data.value / maxValue) * 100}%` }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.6, ease: "easeOut" }}
                  className={`w-full rounded-lg bg-gradient-to-t ${
                    data.day === 'Sat' ? 'from-indigo-600 to-violet-400' : 'from-cyan-600/80 to-blue-400/80'
                  }`}
                />
                <span className="text-[10px] lg:text-xs text-slate-500 font-medium">{data.day}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-[#0a0f1a]/60 backdrop-blur-sm rounded-2xl p-5 border border-white/5"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-white">Activity</h3>
            <Activity className="w-4 h-4 text-cyan-500" />
          </div>
          <div className="space-y-3">
            {recentActivities.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="flex items-start gap-3 group"
              >
                <div className={`w-8 h-8 bg-gradient-to-br ${activity.gradient} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <activity.icon className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-slate-300 group-hover:text-white transition-colors truncate">{activity.text}</p>
                  <p className="text-[10px] text-slate-600">{activity.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );

  // Listings Content Component
  const ListingsContent = () => (
    <div className="p-4 lg:p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#0a0f1a]/60 backdrop-blur-sm rounded-2xl p-5 border border-white/5"
      >
        {/* Listings Header */}
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Layers className="w-5 h-5 text-cyan-500" />
              <h3 className="text-base lg:text-lg font-bold text-white">My Listings</h3>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAdd}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-medium rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add Listing</span>
            </motion.button>
          </div>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search listings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-all"
              />
            </div>
            
            {/* Status Filter */}
            <div className="w-full sm:w-48">
              <SearchSelect
                options={statusOptions}
                value={statusOptions.find(opt => opt.value === filterStatus)}
                onChange={(option) => setFilterStatus(option?.value || 'all')}
                placeholder="Filter status..."
                isClearable={false}
              />
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-white/5 rounded-xl p-1 border border-white/5 self-start">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Form Modal */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-[#060912] rounded-2xl p-5 border border-white/10 mb-6"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                  {editingListing ? <Edit3 className="w-5 h-5 text-white" /> : <Plus className="w-5 h-5 text-white" />}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white">{editingListing ? 'Edit Listing' : 'Create New Listing'}</h4>
                  <p className="text-xs text-slate-500">Fill in the details below</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Title *</label>
                  <input name="title" value={form.title} onChange={handleFormChange} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-all" placeholder="Enter listing title" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Location *</label>
                  <input name="location" value={form.location} onChange={handleFormChange} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-all" placeholder="Enter location" />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
                <textarea name="description" value={form.description} onChange={handleFormChange} rows={3} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-all resize-none" placeholder="Describe your listing" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <SearchSelect label="Type *" icon="🏠" options={typeOptions} value={typeOptions.find(opt => opt.value === form.type)} onChange={(option) => setForm(prev => ({ ...prev, type: option?.value || '' }))} placeholder="Select type..." />
                <SearchSelect label="Category *" icon="📋" options={categoryOptions} value={categoryOptions.find(opt => opt.value === form.category)} onChange={(option) => setForm(prev => ({ ...prev, category: option?.value || '' }))} placeholder="Select category..." />
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2"><span>💰</span> Price per day *</label>
                  <input name="price" type="number" value={form.price} onChange={handleFormChange} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-all" placeholder="Enter price" />
                </div>
              </div>

              {formError && (
                <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0" />
                  <p className="text-sm text-red-400">{formError}</p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} onClick={handleFormSubmit} className="flex-1 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all">
                  {editingListing ? 'Update Listing' : 'Create Listing'}
                </motion.button>
                <button onClick={() => { setShowForm(false); setEditingListing(null); setFormError(null); }} className="px-6 py-3 bg-white/5 text-slate-300 font-medium rounded-xl hover:bg-white/10 border border-white/10 transition-all">
                  Cancel
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Listings Grid/List */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white/5 rounded-xl p-4 animate-pulse border border-white/5">
                <div className="h-32 bg-white/10 rounded-lg mb-4" />
                <div className="h-4 bg-white/10 rounded mb-2" />
                <div className="h-4 bg-white/10 rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : filteredListings.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/10">
              <Home className="w-8 h-8 text-cyan-500" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">No listings found</h4>
            <p className="text-slate-500 mb-6 text-sm max-w-sm mx-auto">
              {searchTerm || filterStatus !== 'all' ? 'Try adjusting your filters' : 'Create your first listing to get started!'}
            </p>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleAdd} className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl">
              <Plus className="w-4 h-4 inline mr-2" />Create First Listing
            </motion.button>
          </div>
        ) : (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-3'}>
            {filteredListings.map((listing, index) => (
              <motion.div
                key={listing.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`bg-[#060912] rounded-xl border border-white/5 overflow-hidden group hover:border-cyan-500/30 transition-all duration-300 ${viewMode === 'list' ? 'flex items-center p-3 gap-4' : ''}`}
              >
                <div className={viewMode === 'grid' ? 'relative h-32' : 'w-16 h-16 flex-shrink-0'}>
                  <img src={listing.image || 'https://via.placeholder.com/300x200'} alt={listing.title} className={`w-full h-full object-cover ${viewMode === 'list' ? 'rounded-lg' : ''}`} />
                  {viewMode === 'grid' && (
                    <div className="absolute top-2 left-2">
                      <span className={`px-2 py-1 rounded-lg text-[10px] font-bold backdrop-blur-sm ${listing.status === 'active' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'}`}>
                        {listing.status || 'Active'}
                      </span>
                    </div>
                  )}
                </div>
                <div className={viewMode === 'grid' ? 'p-4' : 'flex-1 min-w-0'}>
                  <h4 className="font-semibold text-white text-sm truncate group-hover:text-cyan-400 transition-colors">{listing.title}</h4>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3 text-cyan-500" />
                    <span className="truncate">{listing.location}</span>
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <p className="text-base font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Rs. {listing.price}</p>
                    <div className="flex gap-1">
                      <button onClick={() => handleEdit(listing)} className="p-1.5 text-slate-500 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition-all">
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-[#030712] overflow-hidden">
      {/* Ambient Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-cyan-500/15 rounded-full blur-[150px]" />
        <div className="absolute top-1/3 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute -bottom-40 right-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative h-full flex flex-col">
        {/* Top Header with User Details */}
        <header className="flex-shrink-0 bg-[#0a0f1a]/80 backdrop-blur-2xl border-b border-white/5 z-50">
          <div className="h-16 flex items-center justify-between px-4 lg:px-6">
            {/* Left: Mobile Menu + Logo */}
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
                className="lg:hidden p-2 text-slate-400 hover:text-white rounded-xl hover:bg-white/5"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-lg font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">FasoRent</h1>
                  <p className="text-[10px] text-slate-500 font-medium tracking-wide">DASHBOARD</p>
                </div>
              </div>
            </div>

            {/* Center: Date Range */}
            <div className="hidden md:flex items-center bg-white/5 rounded-xl p-1 border border-white/5">
              {['24h', '7d', '30d'].map((range) => (
                <button
                  key={range}
                  onClick={() => setDateRange(range)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${dateRange === range ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                >
                  {range}
                </button>
              ))}
            </div>

            {/* Right: User Details + Actions */}
            <div className="flex items-center gap-3">
              {/* Notifications */}
              <button className="relative p-2 text-slate-400 hover:text-white rounded-xl hover:bg-white/5 transition-all">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
              </button>

              {/* User Profile */}
              <div className="flex items-center gap-3 pl-3 border-l border-white/10">
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-semibold text-white">{user?.name || 'User'}</p>
                  <p className="text-[10px] text-slate-500">{user?.email || 'user@example.com'}</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </div>
              </div>

              {/* Logout */}
              <button 
                onClick={handleLogout}
                className="hidden sm:flex p-2 text-slate-400 hover:text-red-400 rounded-xl hover:bg-red-500/10 transition-all"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Main Layout: Sidebar + Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Mobile Sidebar Overlay */}
          <AnimatePresence>
            {mobileSidebarOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileSidebarOpen(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              />
            )}
          </AnimatePresence>

          {/* Left Sidebar */}
          <motion.aside 
            initial={false}
            animate={{ width: sidebarCollapsed ? 72 : 240 }}
            className={`fixed lg:relative h-[calc(100vh-64px)] bg-[#0a0f1a]/60 backdrop-blur-xl border-r border-white/5 z-50 flex flex-col transition-all duration-300 ${
              mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
            }`}
            style={{ width: sidebarCollapsed ? 72 : 240 }}
          >
            {/* Mobile Close Button */}
            <div className="lg:hidden flex items-center justify-between p-4 border-b border-white/5">
              <span className="text-sm font-semibold text-white">Menu</span>
              <button onClick={() => setMobileSidebarOpen(false)} className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Menu */}
            <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
              {!sidebarCollapsed && (
                <p className="px-3 mb-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Navigation</p>
              )}
              {sidebarMenuItems.map((item) => (
                <motion.button
                  key={item.id}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => { setActiveTab(item.id); setMobileSidebarOpen(false); }}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative ${
                    activeTab === item.id ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                  title={sidebarCollapsed ? item.label : undefined}
                >
                  {activeTab === item.id && (
                    <motion.div layoutId="activeTab" className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-cyan-500 to-blue-500 rounded-r-full" />
                  )}
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-all ${
                    activeTab === item.id ? 'bg-gradient-to-br from-cyan-500 to-blue-500 shadow-lg shadow-cyan-500/25' : 'bg-white/5 group-hover:bg-white/10'
                  }`}>
                    <item.icon className={`w-[18px] h-[18px] ${activeTab === item.id ? 'text-white' : ''}`} />
                  </div>
                  {!sidebarCollapsed && (
                    <>
                      <span className="flex-1 text-left text-sm font-medium">{item.label}</span>
                      {item.badge && (
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${activeTab === item.id ? 'bg-white/20 text-white' : 'bg-cyan-500/20 text-cyan-400'}`}>
                          {item.badge}
                        </span>
                      )}
                      {!pagesWithContent.includes(item.id) && (
                        <Wrench className="w-3 h-3 text-amber-500" />
                      )}
                    </>
                  )}
                </motion.button>
              ))}
            </nav>

            {/* Collapse Toggle */}
            <div className="p-3 border-t border-white/5">
              <button 
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="hidden lg:flex w-full items-center gap-3 px-3 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all"
              >
                <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center">
                  {sidebarCollapsed ? <ChevronRight className="w-[18px] h-[18px]" /> : <ChevronLeft className="w-[18px] h-[18px]" />}
                </div>
                {!sidebarCollapsed && <span className="text-sm font-medium">Collapse</span>}
              </button>
              
              {/* Mobile Logout */}
              <button 
                onClick={handleLogout}
                className="lg:hidden w-full flex items-center gap-3 px-3 py-3 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all mt-2"
              >
                <div className="w-9 h-9 rounded-lg bg-red-500/10 flex items-center justify-center">
                  <LogOut className="w-[18px] h-[18px]" />
                </div>
                {!sidebarCollapsed && <span className="text-sm font-medium">Logout</span>}
              </button>
            </div>
          </motion.aside>

          {/* Main Content Area - Scrollable */}
          <main className="flex-1 overflow-y-auto">
            {/* Page Title */}
            <div className="sticky top-0 z-10 bg-[#030712]/80 backdrop-blur-xl border-b border-white/5 px-4 lg:px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                  {sidebarMenuItems.find(item => item.id === activeTab)?.icon && 
                    (() => {
                      const Icon = sidebarMenuItems.find(item => item.id === activeTab)?.icon;
                      return <Icon className="w-5 h-5 text-white" />;
                    })()
                  }
                </div>
                <div>
                  <h2 className="text-xl lg:text-2xl font-bold text-white capitalize">{activeTab}</h2>
                  <p className="text-xs text-slate-500">
                    {pagesWithContent.includes(activeTab) 
                      ? 'Manage your rental business' 
                      : 'This section is under development'
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* Dynamic Content Based on Active Tab */}
            {activeTab === 'dashboard' && <DashboardContent />}
            {activeTab === 'listings' && <ListingsContent />}
            {!pagesWithContent.includes(activeTab) && <UnderMaintenance pageName={activeTab} />}
          </main>
        </div>
      </div>
    </div>
  );
}
