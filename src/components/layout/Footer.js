// src/components/layout/Footer.js
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-4 mt-8">
      <div className="container mx-auto text-center">
        <p>&copy; {currentYear} G.Mahesh. All Rights Reserved.</p>
        <p className="text-sm text-gray-400 mt-1">
          Powered by{' '}
          <a
            href="https://www.themealdb.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-white"
          >
            TheMealDB API
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;