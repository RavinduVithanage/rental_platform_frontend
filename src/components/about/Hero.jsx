import { useEffect, useState } from "react";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url("https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")'
        }}
      ></div>

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 12 }, (_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-70 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className={`relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
          <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            About Faso Rentals
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
          Your trusted partner for authentic Sri Lankan experiences since 2018
        </p>
      </div>
    </div>
  );
}