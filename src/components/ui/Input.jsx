export default function Input({ type = 'text', placeholder, value, onChange, name, id, className = '' }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
      id={id}
      className={`w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all ${className}`}
    />
  );
}