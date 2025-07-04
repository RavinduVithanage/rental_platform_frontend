import React, { useState, useEffect } from "react";
import {
  Bars3Icon as Menu,
  XMarkIcon as X,
  UserIcon as User,
  ArrowRightOnRectangleIcon as LogOut,
  ShieldCheckIcon as Shield,
  HomeIcon as Home,
  InformationCircleIcon as Info,
  ListBulletIcon as List,
} from '@heroicons/react/24/outline';

// Mock user data for demonstration
const mockUser = {
  name: "John Doe",
  roles: ["user"],
};

const Footer = () => {
  const footerLinks = {
    destinations: [
      { name: "Colombo", href: "/listings?city=colombo" },
      { name: "Kandy", href: "/listings?city=kandy" },
      { name: "Galle", href: "/listings?city=galle" },
      { name: "Nuwara Eliya", href: "/listings?city=nuwara-eliya" },
    ],
    rentals: [
      { name: "Beachfront Villas", href: "/listings?type=villa" },
      { name: "Mountain Retreats", href: "/listings?type=mountain" },
      { name: "Luxury Vehicles", href: "/listings?type=vehicle" },
      { name: "Safari Lodges", href: "/listings?type=safari" },
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Contact", href: "/contact" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
    ],
    support: [
      { name: "Help Center", href: "/help" },
      { name: "Safety", href: "/safety" },
      { name: "Cancellation", href: "/cancellation" },
      { name: "Community", href: "/community" },
    ],
  };

  const handleFooterClick = (href) => {
    console.log(`Navigate to: ${href}`);
  };

  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      console.log("Subscribe email:", email);
      setEmail("");
      // Add your newsletter subscription logic here
    }
  };

  return (
    <footer className="relative">
      {/* Background with gradient overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.9)), url("https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
        }}
      ></div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-2xl">🏖️</span>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
                  FasoRent
                </span>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                Experience the beauty of Sri Lanka through our curated rental
                experiences. From pristine beaches to mountain retreats, your
                perfect adventure awaits.
              </p>
              <div className="flex space-x-4">
                {[
                  { icon: "🌍", label: "Facebook" },
                  { icon: "🐦", label: "Twitter" },
                  { icon: "📸", label: "Instagram" },
                  { icon: "🔗", label: "LinkedIn" },
                ].map((social, index) => (
                  <button
                    key={index}
                    className="w-10 h-10 bg-white/10 backdrop-blur-lg rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 cursor-pointer hover:scale-110"
                    onClick={() =>
                      console.log(`Social ${social.label} clicked`)
                    }
                  >
                    <span className="text-lg">{social.icon}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Footer Links */}
            <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {Object.entries(footerLinks).map(([category, links]) => (
                <div key={category}>
                  <h3 className="text-white font-semibold text-lg mb-4 capitalize">
                    {category}
                  </h3>
                  <ul className="space-y-2">
                    {links.map((link) => (
                      <li key={link.name}>
                        <button
                          onClick={() => handleFooterClick(link.href)}
                          className="text-gray-300 hover:text-orange-400 transition-colors duration-200 text-sm text-left"
                        >
                          {link.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="mt-12 p-8 bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20">
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  Stay Updated
                </span>
              </h3>
              <p className="text-gray-300 mb-6">
                Get the latest deals and travel inspiration delivered to your
                inbox
              </p>
              <form
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-white/20 backdrop-blur-lg border border-white/30 rounded-full text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-full font-medium hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 bg-black/20 backdrop-blur-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <div className="text-gray-300 text-sm">
                © 2024 FasoRent. All rights reserved.
              </div>
              <div className="flex space-x-6 mt-4 sm:mt-0">
                <button
                  onClick={() => handleFooterClick("/privacy")}
                  className="text-gray-300 hover:text-orange-400 text-sm transition-colors"
                >
                  Privacy
                </button>
                <button
                  onClick={() => handleFooterClick("/terms")}
                  className="text-gray-300 hover:text-orange-400 text-sm transition-colors"
                >
                  Terms
                </button>
                <button
                  onClick={() => handleFooterClick("/cookies")}
                  className="text-gray-300 hover:text-orange-400 text-sm transition-colors"
                >
                  Cookies
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;