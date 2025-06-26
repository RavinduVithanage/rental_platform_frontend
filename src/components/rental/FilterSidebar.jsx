export default function FilterSidebar({ filters, onChange }) {
  const handleChange = (e) => {
    onChange({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Filters</h2>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            type="text"
            name="location"
            id="location"
            value={filters.location}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary.DEFAULT focus:ring-primary.DEFAULT sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700">
            Type
          </label>
          <select
            id="type"
            name="type"
            value={filters.type}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary.DEFAULT focus:ring-primary.DEFAULT sm:text-sm"
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
          <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700">
            Min Price
          </label>
          <input
            type="number"
            name="minPrice"
            id="minPrice"
            value={filters.minPrice}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary.DEFAULT focus:ring-primary.DEFAULT sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700">
            Max Price
          </label>
          <input
            type="number"
            name="maxPrice"
            id="maxPrice"
            value={filters.maxPrice}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary.DEFAULT focus:ring-primary.DEFAULT sm:text-sm"
          />
        </div>
      </div>
    </div>
  );
}