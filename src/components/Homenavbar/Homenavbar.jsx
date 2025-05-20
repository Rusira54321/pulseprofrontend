import React, { useState } from 'react';
import { Menu, X } from "lucide-react";
import { Link, Outlet } from "react-router-dom";

const Homenavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Navbar */}
      <nav className="bg-gray-900 shadow-md fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="text-2xl font-bold text-indigo-400">
              <Link to="/">
                Pulse<span className="text-white">Pro</span>
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              <Link to="/" className="text-gray-300 hover:text-indigo-400 font-medium">
                Home
              </Link>
              <Link to="/member" className="text-gray-300 hover:text-indigo-400 font-medium">
                Member
              </Link>
              <Link to="/login" className="text-gray-300 hover:text-indigo-400 font-medium">
                Admin
              </Link>
              <Link to="/trainer" className="text-gray-300 hover:text-indigo-400 font-medium">
                Trainer
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <div className="md:hidden">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-white focus:outline-none"
              >
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-gray-900 shadow-lg">
            <Link
              to="/member"
              className="block px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-indigo-400"
              onClick={() => setMenuOpen(false)}
            >
              Member
            </Link>
            <Link
              to="/admin"
              className="block px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-indigo-400"
              onClick={() => setMenuOpen(false)}
            >
              Admin
            </Link>
            <Link
              to="/trainer"
              className="block px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-indigo-400"
              onClick={() => setMenuOpen(false)}
            >
              Trainer
            </Link>
          </div>
        )}
      </nav>

      {/* Main Content with Padding */}
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default Homenavbar;
