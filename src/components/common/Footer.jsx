import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand & Social */}
          <div>
            <h3 className="text-xl font-bold">FasoRent</h3>
            <p className="mt-4 text-gray-400">
              Discover the best rental experiences for your vacation. Unlock the
              aesthetic vacation with our platform.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebook className="h-6 w-6 text-gray-400 hover:text-white" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <FaTwitter className="h-6 w-6 text-gray-400 hover:text-white" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="h-6 w-6 text-gray-400 hover:text-white" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="h-6 w-6 text-gray-400 hover:text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/" className="hover:text-white">Home</Link></li>
              <li><Link to="/about" className="hover:text-white">About Us</Link></li>
              <li><Link to="/listings" className="hover:text-white">Listings</Link></li>
              <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
              <li><Link to="/faq" className="hover:text-white">FAQ</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Rental Categories</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/listings?type=home" className="hover:text-white">Homes</Link></li>
              <li><Link to="/listings?type=room" className="hover:text-white">Rooms</Link></li>
              <li><Link to="/listings?type=cabana" className="hover:text-white">Cabanas</Link></li>
              <li><Link to="/listings?type=hotel" className="hover:text-white">Hotels</Link></li>
              <li><Link to="/listings?type=car" className="hover:text-white">Cars</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <address className="not-italic text-gray-400 space-y-2">
              <p>123 Rental Street</p>
              <p>Tourist City, TC 12345</p>
              <p>Email: info@fasorent.com</p>
              <p>Phone: +1 (555) 123-4567</p>
            </address>
            <Link
              to="/contact"
              className="inline-block mt-4 px-4 py-2 bg-primary hover:bg-primary-dark rounded text-white text-sm"
            >
              Contact Form
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} FasoRent. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
