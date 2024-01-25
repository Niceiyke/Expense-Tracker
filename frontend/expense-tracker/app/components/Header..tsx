// components/Header.js

import React from 'react';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img
            src="/logo.png" // replace with your logo image path
            alt="Logo"
            className="h-8 w-8 mr-2"
          />
          <span className="text-lg font-bold">Amliam Tracker</span>
        </div>
        <nav className="space-x-4">
          <a href="#" className="hover:text-gray-300">Login</a>
          <a href="#" className="hover:text-gray-300">Register</a>

        </nav>
      </div>
    </header>
  );
};

export default Header;
