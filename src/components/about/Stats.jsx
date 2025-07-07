export default function Stats({ stats }) {
  return (
    <div className="py-20 bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our Impact
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Numbers that tell our story of growth and success
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center group transform hover:scale-105 transition-all duration-300"
            >
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 group-hover:bg-white/20 transition-all duration-300">
                <div className="text-4xl mb-4 animate-float" style={{ animationDelay: `${index * 0.2}s` }}>
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-300 font-medium">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}