import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function ListingForm({ onSubmit, onCancel, initialData }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialData || {
      title: "",
      description: "",
      type: "home",
      category: "residence",
      price: "",
      location: "",
      amenities: [],
    },
  });

  const [amenities, setAmenities] = useState(initialData?.amenities || []);
  const [newAmenity, setNewAmenity] = useState("");
  const [error, setError] = useState(null);

  const addAmenity = () => {
    if (newAmenity.trim() && !amenities.includes(newAmenity.trim())) {
      setAmenities([...amenities, newAmenity.trim()]);
      setNewAmenity("");
    }
  };

  const removeAmenity = (amenity) => {
    setAmenities(amenities.filter((a) => a !== amenity));
  };

  const submitHandler = async (data) => {
    setError(null);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/rental-items`, {
        ...data,
        amenities,
        price: parseFloat(data.price),
      });
      onSubmit();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create listing");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="space-y-6 bg-white p-6 rounded shadow mb-8"
    >
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Title
        </label>
        <input
          id="title"
          {...register("title", { required: "Title is required" })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>
      {/* Example: Add more fields as needed */}
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <textarea
          id="description"
          {...register("description")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
        />
      </div>
      <div>
        <label
          htmlFor="price"
          className="block text-sm font-medium text-gray-700"
        >
          Price
        </label>
        <input
          id="price"
          type="number"
          step="0.01"
          {...register("price", { required: "Price is required" })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
        />
        {errors.price && (
          <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
        )}
      </div>
      {/* Amenities */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Amenities
        </label>
        <div className="flex space-x-2 mt-1">
          <input
            type="text"
            value={newAmenity}
            onChange={(e) => setNewAmenity(e.target.value)}
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            placeholder="Add amenity"
          />
          <button
            type="button"
            onClick={addAmenity}
            className="px-3 py-1 bg-primary text-gray-500 rounded"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap mt-2 gap-2">
          {amenities.map((a, i) => (
            <span
              key={i}
              className="bg-gray-200 px-2 py-1 rounded text-sm flex items-center"
            >
              {a}
              <button
                type="button"
                onClick={() => removeAmenity(a)}
                className="ml-1 text-red-500"
              >
                x
              </button>
            </span>
          ))}
        </div>
      </div>
      <div>
        <label
          htmlFor="location"
          className="block text-sm font-medium text-gray-700"
        >
          Location
        </label>
        <select
          id="location"
          {...register("location", { required: "Location is required" })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
        >
          <option value="">Select district</option>
          <option value="Ampara">Ampara</option>
          <option value="Anuradhapura">Anuradhapura</option>
          <option value="Badulla">Badulla</option>
          <option value="Batticaloa">Batticaloa</option>
          <option value="Colombo">Colombo</option>
          <option value="Galle">Galle</option>
          <option value="Gampaha">Gampaha</option>
          <option value="Hambantota">Hambantota</option>
          <option value="Jaffna">Jaffna</option>
          <option value="Kalutara">Kalutara</option>
          <option value="Kandy">Kandy</option>
          <option value="Kegalle">Kegalle</option>
          <option value="Kilinochchi">Kilinochchi</option>
          <option value="Kurunegala">Kurunegala</option>
          <option value="Mannar">Mannar</option>
          <option value="Matale">Matale</option>
          <option value="Matara">Matara</option>
          <option value="Monaragala">Monaragala</option>
          <option value="Mullaitivu">Mullaitivu</option>
          <option value="Nuwara Eliya">Nuwara Eliya</option>
          <option value="Polonnaruwa">Polonnaruwa</option>
          <option value="Puttalam">Puttalam</option>
          <option value="Ratnapura">Ratnapura</option>
          <option value="Trincomalee">Trincomalee</option>
          <option value="Vavuniya">Vavuniya</option>
        </select>
        {errors.location && (
          <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
        )}
      </div>
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-gray-500 bg-primary hover:bg-primary-dark"
        >
          {initialData ? "Update Listing" : "Create Listing"}
        </button>
      </div>
      {error && <div className="text-red-500">{error}</div>}
    </form>
  );
}
