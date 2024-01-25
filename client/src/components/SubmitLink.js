// LinkSubmission.js

import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom'

const LinkSubmission = () => {
  const [link, setLink] = useState('');
  const navigate = useNavigate();

  const handleLinkSubmission = async () => {
    try {
      // You may want to add authentication token to the request headers if needed
      const response = await axios.post('http://localhost:3001/links/submit', { link });

      toast.success(response.data.message);
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Link submission failed');
    }
  };

  return (
    <div className="container mx-auto mt-8 max-w-md p-4 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Submit Link</h2>
      <input
        className="w-full mb-4 p-2 border border-gray-300 rounded-md"
        type="url"
        placeholder="Enter your link"
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />
      <button
        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        onClick={handleLinkSubmission}
      >
        Submit Link
      </button>
    </div>
  );
};

export default LinkSubmission;
