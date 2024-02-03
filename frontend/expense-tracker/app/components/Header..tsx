"use client"
import React, { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-green-900 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img
            src="/logo2.png" // replace with your logo image path
            alt="Logo"
            className="h-8 w-8 mr-2"
          />
          <span className="text-lg font-bold">Amliam Tracker</span>
        </div>

        {/* Hamburger menu button for small screens */}
        <div className="lg:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none focus:border-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

        {/* Navigation links */}
        <nav className={`lg:flex lg:items-center lg:space-x-4 ${isMenuOpen ? 'block' : 'hidden'}`}>
          <a href="#" className="hover:text-gray-300">Login</a>
          <a href="#" className="hover:text-gray-300">Register</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
