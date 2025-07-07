export default function Select({ children, value, onChange, name, id, className = '' }) {
  return (
    <select
      value={value}
      onChange={onChange}
      name={name}
      id={id}
      className={`w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all ${className}`}
    >
      {children}
    </select>
  );
}