// src/components/common/Navbar.jsx
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
  HeartIcon,
  BuildingOffice2Icon,
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
        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
          isActive
            ? "text-purple-600"
            : isScrolled || mobileMenuOpen
            ? "text-gray-700 hover:text-purple-600"
            : "text-white hover:text-purple-200"
        }`}
      >
        {children}
      </Link>
    );
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled || mobileMenuOpen
          ? "bg-white-200 backdrop-blur-xl shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
              <BuildingOffice2Icon className="h-6 w-6 text-white" />
            </div>
            <span
              className={`text-2xl font-bold ${
                isScrolled || mobileMenuOpen
                  ? "text-gray-800"
                  : "text-white"
              }`}
            >
              FasoRent
            </span>
          </Link>

          {/* Centered Navigation (Desktop) */}
          <nav className="hidden md:flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full shadow-inner">
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
                <Menu.Button className="flex items-center space-x-2 rounded-full p-1 pr-3 bg-white/30 backdrop-blur-sm hover:bg-white/50 transition-colors">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                    {user.name ? user.name.charAt(0).toUpperCase() : <UserCircleIcon className="h-6 w-6"/>}
                  </div>
                  <span className={`text-sm font-medium ${isScrolled ? 'text-gray-800' : 'text-white'}`}>{user.name}</span>
                  <ChevronDownIcon className={`h-5 w-5 transition-transform ${isScrolled ? 'text-gray-800' : 'text-white'}`} />
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="p-2">
                      <div className="p-2">
                        <p className="text-sm font-medium text-gray-900">Signed in as</p>
                        <p className="text-sm text-gray-500 truncate">{user.email}</p>
                      </div>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to={user.roles?.includes("admin") ? "/admin/dashboard" : "/user/dashboard"}
                            className={`${
                              active ? "bg-gray-100 text-purple-600" : "text-gray-700"
                            } group flex rounded-md items-center w-full px-3 py-2 text-sm font-medium`}
                          >
                            <UserCircleIcon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-purple-500" />
                            Dashboard
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/user/profile"
                            className={`${
                              active ? "bg-gray-100 text-purple-600" : "text-gray-700"
                            } group flex rounded-md items-center w-full px-3 py-2 text-sm font-medium`}
                          >
                            <Cog6ToothIcon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-purple-500" />
                            Profile Settings
                          </Link>
                        )}
                      </Menu.Item>
                       <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/user/favorites"
                            className={`${
                              active ? "bg-gray-100 text-purple-600" : "text-gray-700"
                            } group flex rounded-md items-center w-full px-3 py-2 text-sm font-medium`}
                          >
                            <HeartIcon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-purple-500" />
                            Favorites
                          </Link>
                        )}
                      </Menu.Item>
                      <div className="border-t border-gray-100 my-1" />
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={handleLogout}
                            className={`${
                              active ? "bg-red-50 text-red-600" : "text-gray-700"
                            } group flex rounded-md items-center w-full px-3 py-2 text-sm font-medium`}
                          >
                            <ArrowLeftOnRectangleIcon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-red-500" />
                            Logout
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            ) : (
              <div className="flex space-x-2">
                <Link
                  to="/login"
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-300 ${isScrolled ? 'text-gray-700 bg-gray-100 hover:bg-gray-200' : 'text-white bg-white/20 hover:bg-white/30'}`}
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-full text-sm font-semibold text-white bg-purple-600 hover:bg-purple-700 transition-colors duration-300"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-md transition-colors ${isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/20'}`}
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <Transition
        show={mobileMenuOpen}
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === link.href
                    ? "bg-purple-100 text-purple-700"
                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="border-t border-gray-200 pt-4 mt-4">
              {user ? (
                <div className="px-2 space-y-1">
                   <Link to={user.roles?.includes("admin") ? "/admin/dashboard" : "/user/dashboard"} onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900">Dashboard</Link>
                   <Link to="/user/profile" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900">Profile</Link>
                   <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900">
                    Logout
                  </button>
                </div>
              ) : (
                <div className="px-2 space-y-2">
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="block w-full text-center px-4 py-2 rounded-md text-base font-medium text-white bg-purple-600 hover:bg-purple-700">Sign In</Link>
                  <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="block w-full text-center px-4 py-2 rounded-md text-base font-medium text-purple-700 bg-purple-100 hover:bg-purple-200">Register</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </Transition>
    </header>
  );
}
