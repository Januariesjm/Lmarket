// src/components/UserLinks.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

const UserLinks = () => {
  const [userLinks, setUserLinks] = useState([]);

  useEffect(() => {
    // Fetch user's submitted links from the server
    const fetchUserLinks = async () => {
      try {
        const response = await axios.get('http://localhost:3001/links/user');
        setUserLinks(response.data.links);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserLinks();
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4">Your Submitted Links</h2>
      <ul>
        {userLinks.map((link) => (
          <li key={link._id} className="mb-2">
            <a href={link.url} target="_blank" rel="noopener noreferrer">
              {link.url}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserLinks;
