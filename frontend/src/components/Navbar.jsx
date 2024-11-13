import React from "react";
import { Link } from "react-router-dom";
import profile from "../assets/profile.png";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full flex justify-between items-center p-4 bg-gradient-to-r from-blue-700 to-blue-900 border-b-2 border-blue-800 z-50 shadow-lg">
      <Link to="/home">
        <button className="text-white text-xl font-semibold hover:text-blue-300 transition duration-300">
          Home
        </button>
      </Link>

      <Link to="/profile">
        <button className="flex items-center">
          <img
            className="w-12 h-12 rounded-full border-2 border-white shadow-md hover:scale-105 transition-transform duration-200"
            src={profile}
            alt="Profile"
          />
        </button>
      </Link>
    </nav>
  );
};

export default Navbar;