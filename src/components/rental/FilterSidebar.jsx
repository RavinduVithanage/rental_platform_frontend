import Input from "../ui/Input";
import Select from "../ui/Select";

export default function FilterSidebar({ filters, onChange }) {
  return (
    <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-white/20 sticky top-6">
      <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
        🎯 Filter Results
      </h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">📍 Location</label>
          <Input
            type="text"
            value={filters.location}
            onChange={(e) => onChange({ ...filters, location: e.target.value })}
            placeholder="Enter location"
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">🏠 Type</label>
          <Select
            value={filters.type}
            onChange={(e) => onChange({ ...filters, type: e.target.value })}
          >
            <option value="">All Types</option>
            <option value="home">Home</option>
            <option value="room">Room</option>
            <option value="cabana">Cabana</option>
            <option value="hotel">Hotel</option>
            <option value="car">Car</option>
          </Select>
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">📋 Category</label>
          <Select
            value={filters.category}
            onChange={(e) => onChange({ ...filters, category: e.target.value })}
          >
            <option value="">All Categories</option>
            <option value="vehicle">Vehicle</option>
            <option value="residence">Residence</option>
            <option value="other">Other</option>
          </Select>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">💰 Min Price</label>
            <Input
              type="number"
              value={filters.min_price}
              onChange={(e) => onChange({ ...filters, min_price: e.target.value })}
              placeholder="Min"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">💰 Max Price</label>
            <Input
              type="number"
              value={filters.max_price}
              onChange={(e) => onChange({ ...filters, max_price: e.target.value })}
              placeholder="Max"
            />
          </div>
        </div>
      </div>
    </div>
  );
}