// src/pages/Admin/Dashboard.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import PendingListingItem from "../../components/admin/PendingListingItem";

export default function AdminDashboard() {
  const [pendingListings, setPendingListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPendingListings = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8000/api/pending-items"
        );
        setPendingListings(data.data);
      } catch (error) {
        console.error("Error fetching pending listings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingListings();
  }, []);

  const handleStatusUpdate = async (id, status) => {
    try {
      await axios.put(`http://localhost:8000/api/rental-items/${id}/status`, {
        status,
      });
      setPendingListings(
        pendingListings.filter((listing) => listing.id !== id)
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Pending Listings Approval
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Review and approve or reject new rental listings
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
        ) : pendingListings.length === 0 ? (
          <div className="p-6 text-center">
            <p className="text-gray-500">No pending listings to review</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {pendingListings.map((listing) => (
              <PendingListingItem
                key={listing.id}
                listing={listing}
                onStatusUpdate={handleStatusUpdate}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

