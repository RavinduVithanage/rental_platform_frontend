export default function Values({ values }) {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Our Values
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The principles that guide everything we do
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="group text-center transform hover:scale-105 transition-all duration-300"
            >
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-xl group-hover:shadow-2xl transition-all duration-300 border border-gray-100">
                <div className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-2xl flex items-center justify-center text-2xl mb-6 mx-auto shadow-lg group-hover:rotate-12 transition-transform duration-300`}>
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}