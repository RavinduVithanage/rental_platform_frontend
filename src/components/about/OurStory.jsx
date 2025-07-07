export default function OurStory() {
  return (
    <div className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-in">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
              Our Story
            </h2>
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
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
          </div>
          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Sri Lankan coastal village" 
                className="w-full h-96 object-cover transform hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}