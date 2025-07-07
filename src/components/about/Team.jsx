export default function Team({ teamMembers }) {
  return (
    <div className="py-20 bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
            Meet Our Team
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            The passionate locals who make your Sri Lankan dreams come true
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="group text-center transform hover:scale-105 transition-all duration-300"
            >
              <div className="bg-white rounded-3xl p-8 shadow-xl group-hover:shadow-2xl transition-all duration-300">
                <div className="relative mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto object-cover ring-4 ring-orange-200 group-hover:ring-orange-300 transition-all duration-300"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-t from-orange-500/20 to-transparent"></div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {member.name}
                </h3>
                <p className="text-orange-600 font-semibold mb-4">
                  {member.role}
                </p>
                <p className="text-gray-600 leading-relaxed">
                  {member.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}