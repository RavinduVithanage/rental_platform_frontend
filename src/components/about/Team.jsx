import { motion } from "framer-motion";

export default function Team({ teamMembers }) {
  return (
    <div className="py-24 bg-[#0d0d14] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent mb-4">
            Meet Our Team
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            The passionate locals who make your Sri Lankan dreams come true
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="group text-center"
            >
              <div className="bg-[#16162a]/80 backdrop-blur-xl rounded-3xl p-8 border border-violet-500/10 group-hover:border-violet-500/30 transition-all duration-300">
                <div className="relative mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto object-cover ring-4 ring-violet-500/30 group-hover:ring-violet-500/50 transition-all duration-300"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-t from-violet-500/20 to-transparent mx-auto w-32 h-32" style={{ left: '50%', transform: 'translateX(-50%)' }}></div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {member.name}
                </h3>
                <p className="text-violet-400 font-semibold mb-4">
                  {member.role}
                </p>
                <p className="text-gray-400 leading-relaxed">
                  {member.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}