import { motion } from "framer-motion";

export default function Stats({ stats }) {
  return (
    <div className="py-24 bg-[#0a0a0f] relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-violet-900/20 via-[#0a0a0f] to-cyan-900/20"></div>
      
      {/* Background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Our <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">Impact</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Numbers that tell our story of growth and success
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="text-center group"
            >
              <div className="bg-[#16162a]/60 backdrop-blur-xl rounded-2xl p-8 border border-violet-500/20 group-hover:border-violet-500/40 transition-all duration-300">
                <motion.div 
                  className="text-4xl mb-4"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                >
                  {stat.icon}
                </motion.div>
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400 font-medium">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}