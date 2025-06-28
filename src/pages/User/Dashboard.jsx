// src/pages/User/Dashboard.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import ListingCard from "../../components/rental/ListingCard";
import ListingForm from "../../components/rental/ListingForm";

export default function UserDashboard() {
  const [myListings, setMyListings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Listing form state
  const [showForm, setShowForm] = useState(false);
  const [editingListing, setEditingListing] = useState(null);

  useEffect(() => {
    const fetchMyListings = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(
          "http://localhost:8000/api/my-listings",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMyListings(data.data);
      } catch (error) {
        console.error("Error fetching your listings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyListings();
  }, []);

  // Handler for form submit (create or update)
  const handleFormSubmit = async (listingData) => {
    // You can POST or PUT to your API here
    // For now, just close the form and refresh listings
    setShowForm(false);
    setEditingListing(null);
    // TODO: Call API to create/update listing, then refresh list
  };

  // Handler for edit button
  const handleEdit = (listing) => {
    setEditingListing(listing);
    setShowForm(true);
  };

  // Handler for add button
  const handleAdd = () => {
    setEditingListing(null);
    setShowForm(true);
  };

  // Handler for cancel button
  const handleCancel = () => {
    setShowForm(false);
    setEditingListing(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">User Dashboard</h1>

      {/* Add Listing Button */}
      <div className="mb-4 flex justify-end">
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-primary text-gray-500 rounded shadow hover:bg-primary-dark"
        >
          Add Listing
        </button>
      </div>

      {/* Listing Form */}
      {showForm && (
        <ListingForm
          onSubmit={handleFormSubmit}
          onCancel={handleCancel}
          initialData={editingListing}
        />
      )}

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            My Rental Listings
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Manage your rental items here
          </p>
        </div>

        {loading ? (
          <div className="p-6">
            <div className="animate-pulse space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-20 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        ) : myListings.length === 0 ? (
          <div className="p-6 text-center">
            <p className="text-gray-500">You have no listings yet</p>
          </div>
        ) : (
          <div className="p-6 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {myListings.map((listing) => (
              <div key={listing.id} className="relative">
                <ListingCard listing={listing} />
                <button
                  onClick={() => handleEdit(listing)}
                  className="absolute top-2 right-2 px-2 py-1 text-xs bg-blue-500 text-gray-500 rounded hover:bg-blue-600"
                >
                  Edit
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
