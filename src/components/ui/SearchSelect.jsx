import Select from 'react-select';
import { motion } from 'framer-motion';

const customStyles = {
  control: (base, state) => ({
    ...base,
    background: 'rgba(22, 22, 42, 0.9)',
    borderColor: state.isFocused ? '#8b5cf6' : 'rgba(139, 92, 246, 0.3)',
    borderRadius: '0.75rem',
    minHeight: '48px',
    boxShadow: state.isFocused 
      ? '0 0 0 3px rgba(139, 92, 246, 0.2), 0 0 20px rgba(139, 92, 246, 0.1)' 
      : 'none',
    '&:hover': {
      borderColor: '#8b5cf6',
    },
  }),
  menu: (base) => ({
    ...base,
    background: 'rgba(22, 22, 42, 0.98)',
    border: '1px solid rgba(139, 92, 246, 0.3)',
    borderRadius: '0.75rem',
    backdropFilter: 'blur(20px)',
    overflow: 'hidden',
    zIndex: 50,
  }),
  menuList: (base) => ({
    ...base,
    padding: '0.5rem',
  }),
  option: (base, state) => ({
    ...base,
    background: state.isSelected 
      ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.4), rgba(118, 75, 162, 0.4))'
      : state.isFocused 
        ? 'rgba(139, 92, 246, 0.15)' 
        : 'transparent',
    color: '#f8fafc',
    padding: '12px 16px',
    cursor: 'pointer',
    borderRadius: '0.5rem',
    marginBottom: '2px',
    transition: 'all 0.2s ease',
    '&:active': {
      background: 'rgba(139, 92, 246, 0.3)',
    },
  }),
  singleValue: (base) => ({
    ...base,
    color: '#f8fafc',
  }),
  input: (base) => ({
    ...base,
    color: '#f8fafc',
  }),
  placeholder: (base) => ({
    ...base,
    color: '#64748b',
  }),
  indicatorSeparator: (base) => ({
    ...base,
    backgroundColor: 'rgba(139, 92, 246, 0.3)',
  }),
  dropdownIndicator: (base) => ({
    ...base,
    color: '#8b5cf6',
    '&:hover': {
      color: '#a78bfa',
    },
  }),
  clearIndicator: (base) => ({
    ...base,
    color: '#8b5cf6',
    '&:hover': {
      color: '#ef4444',
    },
  }),
  multiValue: (base) => ({
    ...base,
    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.3), rgba(118, 75, 162, 0.3))',
    borderRadius: '0.5rem',
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: '#f8fafc',
  }),
  multiValueRemove: (base) => ({
    ...base,
    color: '#8b5cf6',
    '&:hover': {
      background: 'rgba(239, 68, 68, 0.3)',
      color: '#ef4444',
    },
  }),
  noOptionsMessage: (base) => ({
    ...base,
    color: '#64748b',
  }),
};

export default function SearchSelect({ 
  options, 
  value, 
  onChange, 
  placeholder = "Select...",
  isSearchable = true,
  isClearable = true,
  isMulti = false,
  icon = null,
  label = null,
  className = '',
}) {
  return (
    <motion.div 
      className={`relative ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {label && (
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-300 mb-2">
          {icon && <span className="text-lg">{icon}</span>}
          {label}
        </label>
      )}
      <Select
        options={options}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        isSearchable={isSearchable}
        isClearable={isClearable}
        isMulti={isMulti}
        styles={customStyles}
        classNamePrefix="react-select"
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary: '#8b5cf6',
            primary75: 'rgba(139, 92, 246, 0.75)',
            primary50: 'rgba(139, 92, 246, 0.5)',
            primary25: 'rgba(139, 92, 246, 0.25)',
          },
        })}
      />
    </motion.div>
  );
}
