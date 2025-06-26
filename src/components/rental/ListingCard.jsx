import { Link } from 'react-router-dom';

export default function ListingCard({ listing }) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="h-48 bg-gray-200"></div>
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900">{listing.title}</h3>
        <p className="mt-1 text-sm text-gray-500">{listing.location}</p>
        <p className="mt-2 text-lg font-semibold text-primary.DEFAULT">${listing.price}/night</p>
        <Link
          to={`/listings/${listing.id}`}
          className="mt-3 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-primary.DEFAULT hover:bg-primary.dark"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}