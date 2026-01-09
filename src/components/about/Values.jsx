import { motion } from "framer-motion";

export default function Values({ values }) {
  return (
    <div className="py-24 bg-[#0d0d14] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-cyan-600/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-4">
            Our Values
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            The principles that guide everything we do
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="group text-center"
            >
              <div className="bg-[#16162a]/80 backdrop-blur-xl rounded-2xl p-8 border border-violet-500/10 group-hover:border-violet-500/30 transition-all duration-300">
                <div className={`w-16 h-16 bg-gradient-to-br ${value.color || 'from-violet-600 to-cyan-600'} rounded-2xl flex items-center justify-center text-2xl mb-6 mx-auto shadow-lg shadow-violet-500/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {value.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}