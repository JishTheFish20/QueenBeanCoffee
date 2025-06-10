import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to control the menu visibility

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle the menu state
  };

  return (
    <nav className="bg-blue-500 p-4">
      <div className="flex justify-between items-center">
        <button onClick={toggleMenu} className="lg:hidden text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Menu Links */}
      <ul
        className={`lg:flex lg:space-x-4 ${isMenuOpen ? 'block' : 'hidden'} mt-4 lg:mt-0`}
      >
        <li>
          <Link to="/" className="text-white text-lg hover:text-gray-300">Home</Link>
        </li>
        <li>
          <Link to="/events" className="text-white text-lg hover:text-gray-300">Events</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
