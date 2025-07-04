// src/components/common/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import {
  ChevronDownIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-xl shadow-xl border-b border-white/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
        <button 
            onClick={() => handleNavClick('/')}
            className="flex items-center space-x-2 group"
          >
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <span className="text-white font-bold text-xl">🏖️</span>
            </div>
            <span className={`text-2xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent ${
              isScrolled ? '' : 'text-white'
            }`}>
              FasoRent
            </span>
          </button>
          {/* Centered Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            <Link
              to="/"
              className={`flex items-center space-x-1 px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                  isScrolled 
                    ? 'text-gray-700 hover:text-orange-500 hover:bg-orange-50' 
                    : 'text-white hover:text-orange-300 hover:bg-white/10'
                }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`flex items-center space-x-1 px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                  isScrolled 
                    ? 'text-gray-700 hover:text-orange-500 hover:bg-orange-50' 
                    : 'text-white hover:text-orange-300 hover:bg-white/10'
                }`}
            >
              About
            </Link>
            <Link
              to="/listings"
              className={`flex items-center space-x-1 px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                  isScrolled 
                    ? 'text-gray-700 hover:text-orange-500 hover:bg-orange-50' 
                    : 'text-white hover:text-orange-300 hover:bg-white/10'
                }`}
            >
              Listings
            </Link>
          </nav>
          {/* Auth/User Section */}
          <div className="flex items-center space-x-4">
            {user ? (
              <Menu as="div" className="relative">
                <div>
                  <Menu.Button className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary.DEFAULT">
                    <span className="sr-only">Open user menu</span>
                    <div className="h-8 w-8 rounded-full bg-primary.DEFAULT flex items-center justify-center text-white font-bold">
                      {user && user.name
                        ? user.name.charAt(0).toUpperCase()
                        : ""}
                    </div>
                    <ArrowRightOnRectangleIcon
                      className="ml-1 h-5 w-5 text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to={
                            user.roles?.includes("admin")
                              ? "/admin/dashboard"
                              : "/user/dashboard"
                          }
                          className={`${
                            active ? "bg-gray-100" : ""
                          } block px-4 py-2 text-sm text-gray-700`}
                        >
                          <div className="flex items-center">
                            <UserIcon className="h-4 w-4 mr-2" />
                            Dashboard
                          </div>
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={handleLogout}
                          className={`${
                            active ? "bg-gray-100" : ""
                          } block w-full text-left px-4 py-2 text-sm text-gray-700`}
                        >
                          <div className="flex items-center">Sign out</div>
                        </button>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            ) : (
              <div className="flex space-x-2">
                <Link
                  to="/login"
                  className="inline-flex items-center px-4 py-2 border border-primary.DEFAULT text-sm font-medium rounded-md text-primary.DEFAULT bg-white hover:bg-primary.DEFAULT hover:text-white transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary.DEFAULT"
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center px-4 py-2 border border-primary.DEFAULT text-sm font-medium rounded-md text-white bg-primary.DEFAULT hover:bg-primary.dark transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary.DEFAULT"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
