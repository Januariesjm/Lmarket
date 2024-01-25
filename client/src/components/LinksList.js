// src/components/LinksList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LinksList = () => {
  const [links, setLinks] = useState([]);

  const handleWatchLink = async (linkId) => {
    try {
      // Example: Simulate watching the link for one minute
      // In a real-world scenario, you would have a more sophisticated mechanism
      // for tracking the duration a user stays on the link
      await new Promise(resolve => setTimeout(resolve, 60000));

      // Update user's watches for their link
      const response = await axios.post('http://localhost:3001/src/watch-link', {
        linkId,
      });

      console.log(response.data); // Log the response or handle it as needed

      // Refresh the links after watching
      fetchLinks();
    } catch (error) {
      console.error('Error watching link:', error);
    }
  };

  const fetchLinks = async () => {
    try {
      const response = await axios.get('http://localhost:3001/src/links');
      setLinks(response.data);
    } catch (error) {
      console.error('Error fetching links:', error);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  return (
    <div>
      <h2>All Links</h2>
      <ul>
        {links.map((link) => (
          <li key={link._id}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleWatchLink(link._id)}
            >
              {link.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LinksList;
