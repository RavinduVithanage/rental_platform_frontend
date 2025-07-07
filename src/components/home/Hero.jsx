import { useState, useEffect } from 'react';

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-rotate background images
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const heroImages = [
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
  ];

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
              currentSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${image})`
            }}
          />
        ))}
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 8 }, (_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-yellow-400 rounded-full opacity-60 animate-pulse"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + i * 8}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i * 0.5}s`
            }}
          />
        ))}
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 animate-fade-in">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-slide-up">
            <span className="block bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              Experience Paradise
            </span>
            <span className="block text-4xl md:text-5xl mt-2 text-cyan-200">
              in Beautiful Sri Lanka
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed animate-slide-up-delay">
            Discover incredible rental experiences from pristine beaches to lush tea plantations. 
            Your perfect Sri Lankan adventure awaits!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up-delay-2">
            <button
              onClick={() => window.location.href = '/listings'}
              className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10">🏖️ Explore Rentals</span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            
            <button
              onClick={() => window.location.href = '/about'}
              className="group px-8 py-4 bg-transparent border-2 border-cyan-400 text-cyan-400 font-semibold rounded-full hover:bg-cyan-400 hover:text-white transition-all duration-300"
            >
              <span>🌴 Learn More</span>
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
        </div>
      </div>
    </div>
  );
}