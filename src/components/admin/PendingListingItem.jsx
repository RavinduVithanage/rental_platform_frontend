export default function PendingListingItem({ listing, onStatusUpdate }) {
  return (
    <li className="px-4 py-4 sm:px-6">
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">{listing.title}</p>
          <p className="text-sm text-gray-500 truncate">{listing.location}</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onStatusUpdate(listing.id, 'approved')}
            className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
          >
            Approve
          </button>
          <button
            onClick={() => onStatusUpdate(listing.id, 'rejected')}
            className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
          >
            Reject
          </button>
        </div>
      </div>
    </li>
  );
}