// src/components/common/Navbar.jsx
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
  HeartIcon,
  BuildingOffice2Icon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon } from '@heroicons/react/20/solid'


export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Listings", href: "/listings" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const NavLink = ({ href, children }) => {
    const isActive = location.pathname === href;
    return (
      <Link
        to={href}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative group ${
          isActive
            ? "text-violet-400 bg-violet-500/10"
            : "text-gray-300 hover:text-violet-400 hover:bg-violet-500/10"
        }`}
      >
        {children}
        {isActive && (
          <motion.div
            layoutId="activeNav"
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-violet-400 rounded-full"
          />
        )}
      </Link>
    );
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled || mobileMenuOpen
          ? "bg-[#0a0a0f]/95 backdrop-blur-xl shadow-lg shadow-violet-500/5 border-b border-violet-500/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.div 
              whileHover={{ scale: 1.05, rotate: 5 }}
              className="w-11 h-11 bg-gradient-to-br from-violet-600 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/30 group-hover:shadow-violet-500/50 transition-shadow duration-300"
            >
              <BuildingOffice2Icon className="h-6 w-6 text-white" />
            </motion.div>
            <span className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              FasoRent
            </span>
          </Link>

          {/* Centered Navigation (Desktop) */}
          <nav className="hidden md:flex items-center space-x-1 bg-[#16162a]/60 backdrop-blur-xl px-3 py-2 rounded-2xl border border-violet-500/10">
            {navLinks.map((link) => (
              <NavLink key={link.name} href={link.href}>
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Auth/User Section */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <Menu as="div" className="relative">
                <Menu.Button className="flex items-center space-x-2 rounded-xl p-1.5 pr-4 bg-[#16162a]/80 backdrop-blur-xl border border-violet-500/20 hover:border-violet-500/40 transition-all duration-300">
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-violet-600 to-cyan-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-violet-500/30">
                    {user.name ? user.name.charAt(0).toUpperCase() : <UserCircleIcon className="h-5 w-5"/>}
                  </div>
                  <span className="text-sm font-medium text-gray-200">{user.name}</span>
                  <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="transform opacity-0 scale-95 translate-y-2"
                  enterTo="transform opacity-100 scale-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="transform opacity-100 scale-100 translate-y-0"
                  leaveTo="transform opacity-0 scale-95 translate-y-2"
                >
                  <Menu.Items className="origin-top-right absolute right-0 mt-3 w-64 rounded-2xl shadow-2xl shadow-violet-500/20 bg-[#16162a] border border-violet-500/20 ring-1 ring-black/5 focus:outline-none overflow-hidden">
                    <div className="p-2">
                      <div className="px-4 py-3 border-b border-violet-500/10">
                        <p className="text-sm font-semibold text-white">Signed in as</p>
                        <p className="text-sm text-gray-400 truncate">{user.email}</p>
                      </div>
                      <div className="py-2">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to={user.roles?.includes("admin") ? "/admin/dashboard" : "/user/dashboard"}
                              className={`${
                                active ? "bg-violet-500/10 text-violet-400" : "text-gray-300"
                              } group flex rounded-xl items-center w-full px-4 py-3 text-sm font-medium transition-colors duration-200`}
                            >
                              <UserCircleIcon className="mr-3 h-5 w-5 text-gray-500 group-hover:text-violet-400 transition-colors" />
                              Dashboard
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/user/profile"
                              className={`${
                                active ? "bg-violet-500/10 text-violet-400" : "text-gray-300"
                              } group flex rounded-xl items-center w-full px-4 py-3 text-sm font-medium transition-colors duration-200`}
                            >
                              <Cog6ToothIcon className="mr-3 h-5 w-5 text-gray-500 group-hover:text-violet-400 transition-colors" />
                              Profile Settings
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/user/favorites"
                              className={`${
                                active ? "bg-violet-500/10 text-violet-400" : "text-gray-300"
                              } group flex rounded-xl items-center w-full px-4 py-3 text-sm font-medium transition-colors duration-200`}
                            >
                              <HeartIcon className="mr-3 h-5 w-5 text-gray-500 group-hover:text-violet-400 transition-colors" />
                              Favorites
                            </Link>
                          )}
                        </Menu.Item>
                      </div>
                      <div className="border-t border-violet-500/10 pt-2">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={handleLogout}
                              className={`${
                                active ? "bg-red-500/10 text-red-400" : "text-gray-300"
                              } group flex rounded-xl items-center w-full px-4 py-3 text-sm font-medium transition-colors duration-200`}
                            >
                              <ArrowLeftOnRectangleIcon className="mr-3 h-5 w-5 text-gray-500 group-hover:text-red-400 transition-colors" />
                              Logout
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-300 bg-[#16162a]/60 border border-violet-500/20 hover:border-violet-500/40 hover:text-violet-400 transition-all duration-300"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-cyan-600 hover:shadow-lg hover:shadow-violet-500/30 transition-all duration-300"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-gray-300 bg-[#16162a]/60 border border-violet-500/20 hover:border-violet-500/40 transition-all duration-300"
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <Transition
        show={mobileMenuOpen}
        as={Fragment}
        enter="duration-300 ease-out"
        enterFrom="opacity-0 -translate-y-4"
        enterTo="opacity-100 translate-y-0"
        leave="duration-200 ease-in"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 -translate-y-4"
      >
        <div className="md:hidden bg-[#0a0a0f]/98 backdrop-blur-xl border-b border-violet-500/10" id="mobile-menu">
          <div className="px-4 pt-4 pb-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                  location.pathname === link.href
                    ? "bg-violet-500/10 text-violet-400 border border-violet-500/20"
                    : "text-gray-300 hover:bg-[#16162a] hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="border-t border-violet-500/10 pt-4 mt-4">
              {user ? (
                <div className="space-y-2">
                  <Link 
                    to={user.roles?.includes("admin") ? "/admin/dashboard" : "/user/dashboard"} 
                    onClick={() => setMobileMenuOpen(false)} 
                    className="block px-4 py-3 rounded-xl text-base font-medium text-gray-300 hover:bg-[#16162a] hover:text-white transition-all duration-200"
                  >
                    Dashboard
                  </Link>
                  <Link 
                    to="/user/profile" 
                    onClick={() => setMobileMenuOpen(false)} 
                    className="block px-4 py-3 rounded-xl text-base font-medium text-gray-300 hover:bg-[#16162a] hover:text-white transition-all duration-200"
                  >
                    Profile
                  </Link>
                  <button 
                    onClick={() => { handleLogout(); setMobileMenuOpen(false); }} 
                    className="block w-full text-left px-4 py-3 rounded-xl text-base font-medium text-gray-300 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <Link 
                    to="/login" 
                    onClick={() => setMobileMenuOpen(false)} 
                    className="block w-full text-center px-4 py-3 rounded-xl text-base font-semibold text-gray-300 bg-[#16162a] border border-violet-500/20 hover:border-violet-500/40 transition-all duration-200"
                  >
                    Sign In
                  </Link>
                  <Link 
                    to="/register" 
                    onClick={() => setMobileMenuOpen(false)} 
                    className="block w-full text-center px-4 py-3 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-violet-600 to-cyan-600 transition-all duration-200"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </Transition>
    </header>
  );
}
