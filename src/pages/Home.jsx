import { useState, useEffect } from 'react';

export default function Home() {
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
    <div className="relative overflow-hidden">
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-out;
        }
        .animate-slide-up {
          animation: slideUp 0.8s ease-out;
        }
        .animate-slide-up-delay {
          animation: slideUp 0.8s ease-out 0.3s both;
        }
        .animate-slide-up-delay-2 {
          animation: slideUp 0.8s ease-out 0.6s both;
        }
      `}</style>

      {/* Hero Section */}
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

      {/* Features Section */}
      <div className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Your Gateway to Sri Lanka
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From ancient temples to pristine beaches, discover the perfect rental for your unforgettable journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Beachfront Villas",
                description: "Wake up to ocean views and golden sunsets along Sri Lanka's stunning coastline",
                icon: "🏖️",
                color: "from-blue-400 to-cyan-500",
                bgColor: "bg-blue-50"
              },
              {
                title: "Mountain Retreats", 
                description: "Escape to the cool hills of Kandy and Nuwara Eliya surrounded by tea gardens",
                icon: "🏔️",
                color: "from-green-400 to-emerald-500",
                bgColor: "bg-green-50"
              },
              {
                title: "Cultural Experiences",
                description: "Stay near ancient temples and UNESCO World Heritage sites",
                icon: "🏛️",
                color: "from-orange-400 to-red-500",
                bgColor: "bg-orange-50"
              },
              {
                title: "Luxury Vehicles",
                description: "Explore the island in comfort with our premium vehicle rentals",
                icon: "🚗",
                color: "from-purple-400 to-pink-500",
                bgColor: "bg-purple-50"
              },
              {
                title: "Safari Adventures",
                description: "Stay close to national parks and witness elephants, leopards and exotic wildlife",
                icon: "🐘",
                color: "from-yellow-400 to-orange-500",
                bgColor: "bg-yellow-50"
              },
              {
                title: "Ayurvedic Wellness",
                description: "Rejuvenate with traditional Sri Lankan wellness and spa experiences",
                icon: "🧘",
                color: "from-teal-400 to-blue-500",
                bgColor: "bg-teal-50"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="group cursor-pointer transform hover:scale-105 hover:-translate-y-2 transition-all duration-300"
              >
                <div className={`${feature.bgColor} rounded-3xl p-8 h-full shadow-xl group-hover:shadow-2xl transition-all duration-300 relative overflow-hidden`}>
                  <div className="relative z-10">
                    <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-lg group-hover:rotate-12 transition-transform duration-300`}>
                      {feature.icon}
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-gray-900 transition-colors">
                      {feature.title}
                    </h3>
                    
                    <p className="text-gray-600 text-lg leading-relaxed group-hover:text-gray-700 transition-colors">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")'
          }}
        ></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 max-w-4xl mx-auto border border-white/20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Ready for Your Sri Lankan Adventure?
              </span>
            </h2>
            
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Join thousands of travelers who've discovered the magic of Sri Lanka through our curated rental experiences
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.location.href = '/register'}
                className="group relative px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10">🌟 Start Your Journey</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              
              <button
                onClick={() => window.location.href = '/listings'}
                className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-gray-900 transition-all duration-300"
              >
                🔍 Browse Rentals
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}