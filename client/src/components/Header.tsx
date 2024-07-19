import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-gray-800 text-white p-5">
      <nav className="flex justify-between items-center">
        {/* Logo and Dropdown Toggle for Mobile */}
        <div className="flex items-center">
          <button 
            onClick={toggleDropdown} 
            className="md:hidden text-5xl font-semibold focus:outline-none"
          >
            Personal Blog
          </button>
          <NavLink 
            to="/" 
            className={({ isActive }) =>
              isActive ? "hidden md:block text-5xl font-semibold " : "hidden md:block text-5xl font-semibold"
            }
          >
            Personal Blog
          </NavLink>
        </div>
        {/* Links */}
        <div className={`md:flex md:items-center ${isOpen ? 'block' : 'hidden'}`}>
          <NavLink 
            to="/" 
            className={({ isActive }) =>
              isActive ? "block md:inline text-lg px-4 hover:text-gray-400 underline" : "block md:inline text-lg px-4 hover:text-gray-400"
            }
          >
            Home
          </NavLink>
          <NavLink 
            to="/add-post" 
            className={({ isActive }) =>
              isActive ? "block md:inline text-lg px-4 hover:text-gray-400 underline" : "block md:inline text-lg px-4 hover:text-gray-400"
            }
          >
            Add Post
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Header;
