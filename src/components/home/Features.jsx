export default function Features({ features }) {
  return (
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
          {features.map((feature, index) => (
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
  );
}