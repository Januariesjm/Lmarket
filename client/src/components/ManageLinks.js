// src/components/ManageLinks.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useUser } from './UserContext'; // Update with the actual path

const ManageLinks = () => {
  const { getCurrentUserId } = useUser();
  const [userLinks, setUserLinks] = useState([]);

  useEffect(() => {
    const fetchUserLinks = async () => {
      try {
        const userId = getCurrentUserId();

        if (!userId) {
          // Handle the case when the user is not logged in
          return;
        }

        const response = await axios.get(`http://localhost:3001/links/user/${userId}`);
        setUserLinks(response.data.links);
      } catch (error) {
        console.error(error);
        toast.error('Error fetching user links');
      }
    };

    fetchUserLinks();
  }, [getCurrentUserId]);

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Manage Links</h2>

      {userLinks.length > 0 ? (
        <ul>
          {userLinks.map((link) => (
            <li key={link._id}>
              {/* Display link details or provide options to manage them */}
              <p>{link.url}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No links found.</p>
      )}
    </div>
  );
};

export default ManageLinks;
