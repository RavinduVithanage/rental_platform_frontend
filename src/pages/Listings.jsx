import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import api from "../api";
import FilterSidebar from "../components/rental/FilterSidebar";
import ListingCard from "../components/rental/ListingCard";
import { SparklesIcon } from "@heroicons/react/24/outline";

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

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        const response = await api.get('/rental-items');
        let filteredListings = Array.isArray(response.data?.data?.data) ? response.data.data.data : [];

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

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Hero Section */}
      <div className="relative pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-transparent to-[#0a0a0f]" />
        </div>
        
        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 20 }, (_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 mb-6"
          >
            <SparklesIcon className="w-5 h-5 text-violet-400" />
            <span className="text-violet-300 text-sm font-medium">Premium Rentals</span>
          </motion.div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6">
            <span className="block bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Discover Amazing
            </span>
            <span className="block text-xl sm:text-2xl md:text-3xl lg:text-4xl mt-2 sm:mt-4 text-gray-300">
              Rental Experiences
            </span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
            Find your perfect home, vehicle, or unique experience in beautiful Sri Lanka
          </p>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Sidebar */}
          <div className="lg:w-1/4">
            <FilterSidebar filters={filters} onChange={handleFilterChange} />
          </div>

          {/* Listings Content */}
          <div className="lg:w-3/4">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 gap-2"
            >
              <div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                  Available Rentals
                </h2>
                <p className="text-gray-500 mt-2">
                  {loading ? "Loading..." : `${listings.length} amazing options found`}
                </p>
              </div>
            </motion.div>

            {/* Listings Grid */}
            {loading ? (
              <div className="grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-[#16162a]/80 rounded-3xl overflow-hidden border border-violet-500/10"
                  >
                    <div className="h-48 w-full bg-gradient-to-r from-violet-500/10 to-cyan-500/10 shimmer" />
                    <div className="p-6 space-y-4">
                      <div className="h-6 w-3/4 rounded-lg bg-violet-500/10 shimmer" />
                      <div className="h-4 w-full rounded-lg bg-violet-500/10 shimmer" />
                      <div className="h-4 w-2/3 rounded-lg bg-violet-500/10 shimmer" />
                      <div className="h-12 w-full rounded-xl bg-violet-500/10 shimmer" />
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : listings.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20"
              >
                <div className="bg-[#16162a]/90 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-violet-500/20 max-w-md mx-auto">
                  <div className="text-6xl mb-6">🔍</div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    No listings found
                  </h3>
                  <p className="text-gray-400 mb-6">
                    Try adjusting your filters or search criteria
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setFilters({
                      location: "",
                      type: "",
                      category: "",
                      min_price: "",
                      max_price: "",
                    })}
                    className="bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-semibold px-8 py-3 rounded-xl hover:shadow-lg hover:shadow-violet-500/25 transition-all duration-300"
                  >
                    Clear Filters
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              <div className="grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                {listings.map((listing, index) => (
                  <motion.div
                    key={listing.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <ListingCard listing={listing} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}