export default function Card({ children, className = '' }) {
  return (
    <div className={`bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl ${className}`}>
      {children}
    </div>
  );
}