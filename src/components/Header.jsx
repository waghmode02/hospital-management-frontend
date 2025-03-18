import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAmbulance } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import "../style/header.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-50 shadow-md">
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          {/* Logo */}
          <Link to="/" className="flex items-center header-logo">
            <span className="hidden lg:block self-center text-xl font-semibold">
              Hospital Resource Management
            </span>
          </Link>

          {/* Emergency Contact Section */}
          <div className="flex items-center lg:order-2">
            <a
              href="tel:+911020304050"
              className="text-black font-medium rounded-lg text-sm px-4 py-2 mr-2 flex items-center transition-transform duration-300 hover:scale-110 ambulance-btn"
            >
              <FontAwesomeIcon
                icon={faAmbulance}
                className="mr-2 text-red-600 text-xl animate-pulse"
              />
              <span className="text-sm lg:block">Emergency: +91 1020304050</span>
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all duration-300"
              aria-controls="mobile-menu-2"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`w-6 h-6 ${isMenuOpen ? "hidden" : "block"}`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <svg
                className={`w-6 h-6 ${isMenuOpen ? "block" : "hidden"}`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>

          {/* Navigation Menu */}
          <div
            className={`justify-between items-center w-full lg:flex lg:w-auto lg:order-1 ${
              isMenuOpen ? "flex" : "hidden"
            }`}
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li className="sm:hidden nav-link block py-2 pr-4 pl-3 text-black rounded border-b border-gray-100">
                𝐇𝐨𝐬𝐩𝐢𝐭𝐚𝐥 𝐌𝐚𝐧𝐚𝐠𝐞𝐦𝐞𝐧𝐭 𝐒𝐲𝐬𝐭𝐞𝐦
              </li>
              <li>
                <Link
                  to="/"
                  className="nav-link block py-2 pr-4 pl-3 text-black rounded border-b border-gray-100 hover:bg-gray-100 transition-all duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/admin"
                  className="nav-link block py-2 pr-4 pl-3 text-black rounded border-b border-gray-100 hover:bg-gray-100 transition-all duration-300"
                >
                  Admin
                </Link>
              </li>
              <li>
                <Link
                  to="/doctors"
                  className="nav-link block py-2 pr-4 pl-3 text-black rounded border-b border-gray-100 hover:bg-gray-100 transition-all duration-300"
                >
                  Doctors
                </Link>
              </li>
              <li>
                <Link
                  to="/appointments"
                  className="nav-link block py-2 pr-4 pl-3 text-black rounded border-b border-gray-100 hover:bg-gray-100 transition-all duration-300"
                >
                  Appointments
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="nav-link block py-2 pr-4 pl-3 text-black rounded border-b border-gray-100 hover:bg-gray-100 transition-all duration-300"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
