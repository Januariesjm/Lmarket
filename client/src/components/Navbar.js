// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white font-bold text-lg">Dashboard</Link>
        
        <div className="space-x-4">
          <Link to="/submit-link" className="text-white">Submit Link</Link>
          <Link to="/user-profile" className="text-white">User Profile</Link>
          <Link to="/my-links" className="text-white">My Links</Link>
          {/* Add more links as needed */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
