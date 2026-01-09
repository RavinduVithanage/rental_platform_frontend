import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SparklesIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

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
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0f]">
      {/* Background Images with Dark Overlay */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: currentSlide === index ? 0.4 : 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-transparent to-[#0a0a0f]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f]/80 via-transparent to-[#0a0a0f]/80" />
      </div>

      {/* Animated Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-600/20 rounded-full blur-3xl"
        />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 30 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Hero Content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-5xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 mb-8"
          >
            <SparklesIcon className="w-5 h-5 text-violet-400" />
            <span className="text-violet-300 text-sm font-medium">Premium Rental Platform</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-6 sm:mb-8"
          >
            <span className="block bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Experience Paradise
            </span>
            <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-3 sm:mt-4 text-gray-300">
              in Beautiful Sri Lanka
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-400 mb-8 sm:mb-10 max-w-3xl mx-auto leading-relaxed px-2"
          >
            Discover incredible rental experiences from pristine beaches to lush tea plantations. 
            Your perfect Sri Lankan adventure awaits!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/listings'}
              className="group relative px-8 py-4 bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-semibold rounded-2xl shadow-2xl shadow-violet-500/30 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                🏖️ Explore Rentals
                <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/about'}
              className="group px-8 py-4 bg-transparent border-2 border-violet-500/50 text-violet-300 font-semibold rounded-2xl hover:bg-violet-500/10 hover:border-violet-400 transition-all duration-300"
            >
              <span>🌴 Learn More</span>
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-10 sm:mt-16 grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto px-2"
          >
            {[
              { value: '500+', label: 'Properties' },
              { value: '10K+', label: 'Happy Guests' },
              { value: '50+', label: 'Locations' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-gray-500 text-xs sm:text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-violet-500/50 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-3 bg-gradient-to-b from-violet-500 to-cyan-500 rounded-full mt-2"
          />
        </div>
      </motion.div>
    </div>
  );
}