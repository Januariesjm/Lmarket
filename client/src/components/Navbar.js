// src/components/Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <div>
        <Link to="/">Home</Link>
      </div>
      <div>
        <Link to="/submit-link">Submit Link</Link>
        <Link to="/my-links">My Links</Link>
        <Link to="/dashboard">Dashboard</Link>
        {/* Add more navigation links based on your application */}
      </div>
    </nav>
  );
};

export default Navbar;
