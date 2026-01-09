import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function CTA() {
  return (
    <div className="relative py-24 overflow-hidden bg-[#0a0a0f]">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: 'linear-gradient(to bottom, rgba(10,10,15,0.8), rgba(10,10,15,0.95)), url("https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")'
        }}
      ></div>

      {/* Background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-cyan-600/15 rounded-full blur-3xl" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div 
          className="bg-[#16162a]/60 backdrop-blur-xl rounded-3xl p-12 md:p-16 max-w-4xl mx-auto border border-violet-500/20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-violet-400 via-cyan-400 to-pink-400 bg-clip-text text-transparent">
              Ready for Your Sri Lankan Adventure?
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Join thousands of travelers who've discovered the magic of Sri Lanka through our curated rental experiences
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/register"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-bold rounded-xl shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all duration-300"
              >
                🌟 Start Your Journey
              </Link>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/listings"
                className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-violet-500/50 text-white font-bold rounded-xl hover:bg-violet-500/10 hover:border-violet-500 transition-all duration-300"
              >
                🔍 Browse Rentals
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}