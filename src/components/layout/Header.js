// src/components/layout/Header.js
import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white sticky top-0 z-10 border-b border-gray-200">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors">
          🍳 Recipe for You
        </Link>
        <nav>
          <NavLink 
            to="/favorites" 
            className={({ isActive }) => 
              `font-semibold transition-colors ${isActive ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`
            }
          >
            My Favorites
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;