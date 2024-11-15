import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-orange-400 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">
          <Link to="/">Kutumb</Link>
        </div>

        <div className="space-x-4">
          <Link to="/" className="text-white hover:text-gray-300">
            Login
          </Link>
          <Link to="/quotes" className="text-white hover:text-gray-300">
            Quotes
          </Link>
          <Link to="/create-quote" className="text-white hover:text-gray-300">
            Create Quote
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
