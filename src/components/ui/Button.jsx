export default function Button({ children, onClick, type = 'button', variant = 'primary', className = '' }) {
  const baseClasses = 'px-4 py-2 rounded-full font-semibold transition-all duration-300';

  const variants = {
    primary: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white transform hover:scale-105',
    secondary: 'bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}