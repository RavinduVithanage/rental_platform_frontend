import { motion } from 'framer-motion';
import SearchSelect from "../ui/SearchSelect";
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const typeOptions = [
  { value: '', label: '🏠 All Types' },
  { value: 'home', label: '🏡 Home' },
  { value: 'room', label: '🛏️ Room' },
  { value: 'cabana', label: '🏖️ Cabana' },
  { value: 'hotel', label: '🏨 Hotel' },
  { value: 'car', label: '🚗 Car' },
];

const categoryOptions = [
  { value: '', label: '📋 All Categories' },
  { value: 'vehicle', label: '🚙 Vehicle' },
  { value: 'residence', label: '🏠 Residence' },
  { value: 'other', label: '📦 Other' },
];

export default function FilterSidebar({ filters, onChange }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-[#16162a]/90 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-violet-500/20 sticky top-24"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-600 flex items-center justify-center">
          <MagnifyingGlassIcon className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
          Filter Results
        </h3>
      </div>
      
      <div className="space-y-5">
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-300 mb-2">
            <span>📍</span> Location
          </label>
          <input
            type="text"
            value={filters.location}
            onChange={(e) => onChange({ ...filters, location: e.target.value })}
            placeholder="Enter location..."
            className="w-full px-4 py-3 bg-[#0a0a0f]/80 border border-violet-500/20 rounded-xl text-white placeholder-gray-500 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 focus:outline-none transition-all duration-300"
          />
        </div>
        
        <SearchSelect
          label="Type"
          icon="🏠"
          options={typeOptions}
          value={typeOptions.find(opt => opt.value === filters.type)}
          onChange={(option) => onChange({ ...filters, type: option?.value || '' })}
          placeholder="Select type..."
          isClearable
        />
        
        <SearchSelect
          label="Category"
          icon="📋"
          options={categoryOptions}
          value={categoryOptions.find(opt => opt.value === filters.category)}
          onChange={(option) => onChange({ ...filters, category: option?.value || '' })}
          placeholder="Select category..."
          isClearable
        />
        
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-300 mb-2">
              <span>💰</span> Min Price
            </label>
            <input
              type="number"
              value={filters.min_price}
              onChange={(e) => onChange({ ...filters, min_price: e.target.value })}
              placeholder="Min"
              className="w-full px-4 py-3 bg-[#0a0a0f]/80 border border-violet-500/20 rounded-xl text-white placeholder-gray-500 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 focus:outline-none transition-all duration-300"
            />
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-300 mb-2">
              <span>💰</span> Max Price
            </label>
            <input
              type="number"
              value={filters.max_price}
              onChange={(e) => onChange({ ...filters, max_price: e.target.value })}
              placeholder="Max"
              className="w-full px-4 py-3 bg-[#0a0a0f]/80 border border-violet-500/20 rounded-xl text-white placeholder-gray-500 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 focus:outline-none transition-all duration-300"
            />
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onChange({
            location: "",
            type: "",
            category: "",
            min_price: "",
            max_price: "",
          })}
          className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-violet-600/20 to-cyan-600/20 border border-violet-500/30 text-gray-300 font-semibold hover:from-violet-600/30 hover:to-cyan-600/30 transition-all duration-300"
        >
          ✨ Clear All Filters
        </motion.button>
      </div>
    </motion.div>
  );
}