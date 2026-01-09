import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BuildingOffice2Icon } from "@heroicons/react/24/outline";

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

  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      console.log("Subscribe email:", email);
      setEmail("");
    }
  };

  return (
    <footer className="relative bg-[#0a0a0f] border-t border-violet-500/10">
      {/* Gradient Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <Link to="/" className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-violet-600 via-purple-600 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/30">
                  <BuildingOffice2Icon className="h-7 w-7 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  FasoRent
                </span>
              </Link>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Experience the beauty of Sri Lanka through our curated rental
                experiences. From pristine beaches to mountain retreats, your
                perfect adventure awaits.
              </p>
              <div className="flex space-x-3">
                {[
                  { icon: "🌍", label: "Facebook" },
                  { icon: "🐦", label: "Twitter" },
                  { icon: "📸", label: "Instagram" },
                  { icon: "🔗", label: "LinkedIn" },
                ].map((social, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 bg-violet-500/10 backdrop-blur-xl rounded-xl flex items-center justify-center hover:bg-violet-500/20 border border-violet-500/20 transition-all duration-300"
                  >
                    <span className="text-lg">{social.icon}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Footer Links */}
            <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {Object.entries(footerLinks).map(([category, links]) => (
                <div key={category}>
                  <h3 className="text-white font-semibold text-lg mb-4 capitalize bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                    {category}
                  </h3>
                  <ul className="space-y-3">
                    {links.map((link) => (
                      <li key={link.name}>
                        <Link
                          to={link.href}
                          className="text-gray-400 hover:text-violet-400 transition-colors duration-200 text-sm flex items-center gap-2 group"
                        >
                          <span className="w-1 h-1 bg-violet-500/50 rounded-full group-hover:w-2 transition-all duration-200" />
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 p-8 bg-[#16162a]/80 backdrop-blur-xl rounded-3xl border border-violet-500/20"
          >
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-2xl font-bold mb-4">
                <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Stay Updated
                </span>
              </h3>
              <p className="text-gray-400 mb-6">
                Get the latest deals and travel inspiration delivered to your inbox
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
                  className="flex-1 px-5 py-3.5 bg-[#0a0a0f]/80 border border-violet-500/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-all duration-300"
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="px-6 py-3.5 bg-gradient-to-r from-violet-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-violet-500/25 transition-all duration-300"
                >
                  Subscribe
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-violet-500/10 bg-[#0a0a0f]/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <div className="text-gray-500 text-sm">
                © 2024 FasoRent. All rights reserved.
              </div>
              <div className="flex space-x-6 mt-4 sm:mt-0">
                {["Privacy", "Terms", "Cookies"].map((item) => (
                  <Link
                    key={item}
                    to={`/${item.toLowerCase()}`}
                    className="text-gray-500 hover:text-violet-400 text-sm transition-colors"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;