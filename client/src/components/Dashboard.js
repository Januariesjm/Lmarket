import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const Dashboard = () => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch links when the component mounts
    getAllLinks();
  }, []);

  const getAllLinks = async () => {
    try {
      // Make an API request to fetch links from the server
      const response = await axios.get('http://localhost:3001/links/links');

      // Set the retrieved links in the state
      setLinks(response.data);
    } catch (error) {
      console.error('Error fetching links:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLinkInteraction = async (linkId, interactionType) => {
    try {
      const startTime = new Date().getTime();

      // Simulate the user interacting with the link for 1 minute (60000 milliseconds)
      // In a real-world scenario, you would track the time spent by the user.
      await new Promise((resolve) => setTimeout(resolve, 60000));

      const endTime = new Date().getTime();
      const interactionTime = endTime - startTime;

      // Make an API request to update the click or watch count for the link
      await axios.post('http://localhost:3001/links/interaction', {
        linkId,
        interactionType,
        interactionTime,
      });

      // Refresh the links after updating click or watch counts
      getAllLinks();
    } catch (error) {
      console.error(`Error ${interactionType === 'click' ? 'clicking' : 'watching'} link:`, error);
    }
  };

  const renderLinks = () => {
    if (loading) {
      return <p className="text-gray-500">Loading...</p>;
    }

    if (links.length === 0) {
      return <p className="text-gray-500">No links available</p>;
    }

    return (
      <ul className="space-y-4">
        {links.map((link) => (
          <li key={link._id} className="bg-white p-4 rounded-md shadow-md">
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
              onClick={() => handleLinkInteraction(link._id, 'click')}
            >
              {link.url}
            </a>
            <div className="flex justify-between mt-2">
              <p className="text-gray-600">Clicks: {link.clicks || 0}</p>
              <p className="text-gray-600">Watches: {link.watches || 0}</p>
              <button onClick={() => handleLinkInteraction(link._id, 'watch')}>Watch</button>
            </div>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <Navbar />
    <div className="container mx-auto p-8">
      
      <h1 className="text-4xl font-bold mb-8">Welcome to the Dashboard!</h1>
      {/* Display submitted links */}
      {renderLinks()}
    </div>
    </div>
  );
};

export default Dashboard;
