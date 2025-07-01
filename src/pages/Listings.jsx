// src/pages/Listings.jsx
import { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ListingCard from "../components/rental/ListingCard";
import FilterSidebar from "../components/rental/FilterSidebar";
import ListingForm from "../components/rental/ListingForm";

export default function Listings() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    location: searchParams.get("location") || "",
    type: searchParams.get("type") || "",
    category: searchParams.get("category") || "",
    min_price: searchParams.get("min_price") || "",
    max_price: searchParams.get("max_price") || "",
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
  const imageInputRef = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();

        Object.entries(filters).forEach(([key, value]) => {
          if (value) params.append(key, value);
        });

        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/rental-items`,
          {
            params,
          }
        );
        // Fix: extract listings from paginated response
        const listingsArr = data?.data?.data || [];
        setListings(listingsArr);
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
    setSearchParams(newFilters);
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
        images: Array.from(e.target.files).map((file) => file.name),
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
      await axios.post("http://localhost:8000/api/rental-items", form, {
        withCredentials: true,
      });
      setShowForm(false);
      // Optionally refresh listings
      setFilters({ ...filters }); // triggers useEffect
    } catch (err) {
      setFormError(err.response?.data?.message || "Failed to create listing");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/4">
          <FilterSidebar filters={filters} onChange={handleFilterChange} />
        </div>

        <div className="md:w-3/4">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Available Rentals
            </h1>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              onClick={() => setShowForm(true)}
            >
              Create Listing
            </button>
          </div>

          {showForm && (
            <form
              className="bg-white p-6 rounded shadow mb-8"
              onSubmit={handleFormSubmit}
            >
              <div className="mb-4">
                <label className="block font-medium">Title</label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleFormChange}
                  required
                  className="w-full border rounded px-2 py-1"
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium">Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleFormChange}
                  required
                  className="w-full border rounded px-2 py-1"
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium">Type</label>
                <select
                  name="type"
                  value={form.type}
                  onChange={handleFormChange}
                  required
                  className="w-full border rounded px-2 py-1"
                >
                  <option value="">Select type</option>
                  <option value="home">Home</option>
                  <option value="room">Room</option>
                  <option value="cabana">Cabana</option>
                  <option value="hotel">Hotel</option>
                  <option value="car">Car</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block font-medium">Category</label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleFormChange}
                  required
                  className="w-full border rounded px-2 py-1"
                >
                  <option value="">Select category</option>
                  <option value="vehicle">Vehicle</option>
                  <option value="residence">Residence</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block font-medium">Price</label>
                <input
                  name="price"
                  type="number"
                  min="0"
                  value={form.price}
                  onChange={handleFormChange}
                  required
                  className="w-full border rounded px-2 py-1"
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium">Location</label>
                <input
                  name="location"
                  value={form.location}
                  onChange={handleFormChange}
                  required
                  className="w-full border rounded px-2 py-1"
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium">
                  Amenities (comma separated)
                </label>
                <input
                  name="amenities"
                  value={form.amenities.join(", ")}
                  onChange={handleFormChange}
                  className="w-full border rounded px-2 py-1"
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium">
                  Images (filenames, comma separated)
                </label>
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
                  className="w-full border rounded px-2 py-1"
                />
              </div>
              {formError && (
                <div className="text-red-500 mb-2">{formError}</div>
              )}
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                >
                  Submit
                </button>
                <button
                  type="button"
                  className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {loading ? (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="bg-gray-200 rounded-lg h-64 animate-pulse"
                ></div>
              ))}
            </div>
          ) : listings.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900">
                No listings found
              </h3>
              <p className="mt-2 text-gray-500">Try adjusting your filters</p>
            </div>
          ) : (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {listings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
