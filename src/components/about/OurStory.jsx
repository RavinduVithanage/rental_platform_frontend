import { motion } from "framer-motion";

export default function OurStory() {
  return (
    <div className="py-24 bg-[#0a0a0f] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent mb-8">
              Our Story
            </h2>
            <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
              <p>
                Founded in 2018 by a team of passionate Sri Lankans, Faso Rentals was born from a simple vision: 
                to share the incredible beauty and rich culture of our island nation with travelers from around the world.
              </p>
              <p>
                What started as a small family business has grown into Sri Lanka's most trusted rental platform, 
                connecting international visitors with authentic local experiences across all 25 districts of our beautiful island.
              </p>
              <p>
                We believe that travel should be more than just visiting places – it should be about creating memories, 
                building connections, and discovering the soul of a destination through the eyes of locals who call it home.
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative overflow-hidden rounded-3xl group">
              <img 
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Sri Lankan coastal village" 
                className="w-full h-96 object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent opacity-60"></div>
              <div className="absolute inset-0 border border-violet-500/20 rounded-3xl"></div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 border border-violet-500/30 rounded-2xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 border border-cyan-500/30 rounded-2xl"></div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}