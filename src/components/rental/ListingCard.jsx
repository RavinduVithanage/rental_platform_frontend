import { motion } from "framer-motion";
import { MapPinIcon, HeartIcon, StarIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

export default function ListingCard({ listing }) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="group relative bg-[#16162a]/90 backdrop-blur-xl rounded-3xl overflow-hidden border border-violet-500/10 hover:border-violet-500/30 transition-all duration-500 h-full shadow-xl hover:shadow-2xl hover:shadow-violet-500/10"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden h-52">
        <img
          src={listing.images && listing.images.length > 0 ? listing.images[0] : "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"}
          alt={listing.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#16162a] via-transparent to-transparent opacity-60" />
        
        {/* Type Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-gradient-to-r from-violet-600 to-cyan-600 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg shadow-violet-500/30">
            {listing.type}
          </span>
        </div>
        
        {/* Price Badge */}
        <div className="absolute top-4 right-4">
          <span className="bg-[#0a0a0f]/80 backdrop-blur-xl text-white px-4 py-1.5 rounded-full text-sm font-bold border border-violet-500/20">
            <span className="text-violet-400">$</span>{listing.price}<span className="text-gray-400 text-xs">/day</span>
          </span>
        </div>
        
        {/* Favorite Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-[#0a0a0f]/60 backdrop-blur-xl border border-white/10 flex items-center justify-center hover:bg-violet-600/50 transition-all duration-300"
        >
          {isFavorite ? (
            <HeartSolidIcon className="w-5 h-5 text-pink-500" />
          ) : (
            <HeartIcon className="w-5 h-5 text-white" />
          )}
        </motion.button>

        {/* Rating */}
        <div className="absolute bottom-4 left-4 flex items-center gap-1 bg-[#0a0a0f]/60 backdrop-blur-xl px-3 py-1.5 rounded-full border border-white/10">
          <StarIcon className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          <span className="text-white text-sm font-semibold">4.8</span>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-violet-400 transition-colors line-clamp-1">
          {listing.title}
        </h3>
        
        <p className="text-gray-400 mb-4 line-clamp-2 text-sm leading-relaxed">
          {listing.description}
        </p>
        
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <MapPinIcon className="w-4 h-4 mr-1 text-violet-400" />
          <span className="text-gray-400">{listing.location}</span>
        </div>
        
        {/* Amenities */}
        <div className="flex flex-wrap gap-2 mb-5">
          {listing.amenities?.slice(0, 3).map((amenity, index) => (
            <span
              key={index}
              className="bg-violet-500/10 text-violet-300 px-3 py-1 rounded-full text-xs font-medium border border-violet-500/20"
            >
              {amenity}
            </span>
          ))}
          {listing.amenities?.length > 3 && (
            <span className="text-xs text-gray-500 px-3 py-1">
              +{listing.amenities.length - 3} more
            </span>
          )}
        </div>
        
        {/* View Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-semibold hover:from-violet-500 hover:to-cyan-500 transition-all duration-300 shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40"
        >
          View Details
        </motion.button>
      </div>
    </motion.div>
  );
}
