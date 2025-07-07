export default function CTA() {
  return (
    <div className="relative py-20 overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")'
        }}
      ></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 max-w-4xl mx-auto border border-white/20">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Ready to Experience Sri Lanka?
            </span>
          </h2>
          
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Let us be your guide to the wonders of our beautiful island. Your Sri Lankan adventure starts here.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.location.href = '/listings'}
              className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10">🏖️ Explore Rentals</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            
            <button
              onClick={() => window.location.href = '/contact'}
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-gray-900 transition-all duration-300"
            >
              💬 Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}