import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SparklesIcon } from "@heroicons/react/24/outline";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0f]">
      {/* Background Image with Dark Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: 'linear-gradient(to bottom, rgba(10,10,15,0.7), rgba(10,10,15,0.9)), url("https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")'
        }}
      ></div>

      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-cyan-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/3 w-72 h-72 bg-pink-600/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-violet-400 rounded-full"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 0],
              y: [0, -100],
              x: [0, Math.random() * 50 - 25],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.3,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${60 + Math.random() * 40}%`,
            }}
          />
        ))}
      </div>

      <div className={`relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto pt-20`}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 mb-8"
          >
            <SparklesIcon className="w-5 h-5 text-violet-400" />
            <span className="text-violet-300 text-sm font-medium">About Us</span>
          </motion.div>

          <h1 className="text-5xl md:text-8xl font-bold mb-8">
            <span className="block bg-gradient-to-r from-violet-400 via-cyan-400 to-pink-400 bg-clip-text text-transparent">
              About Faso Rentals
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
            Your trusted partner for authentic Sri Lankan experiences since 2018
          </p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex items-center justify-center gap-6"
          >
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-violet-500"></div>
            <span className="text-violet-400">✦</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-cyan-500"></div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}