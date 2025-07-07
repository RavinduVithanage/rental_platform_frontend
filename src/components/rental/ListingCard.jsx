import Card from "../ui/Card";
import Button from "../ui/Button";

export default function ListingCard({ listing }) {
  return (
    <Card className="group cursor-pointer transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 h-full">
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
        
        <Button className="w-full">
          View Details
        </Button>
      </div>
    </Card>
  );
}