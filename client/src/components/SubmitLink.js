// src/components/SubmitLink.js

import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const SubmitLink = () => {
  const [link, setLink] = useState('');

  const handleSubmit = async () => {
    try {
      // Send the link to the backend for processing
      const response = await axios.post('http://localhost:3001/links/submit', { link });

      // Display success message using toast
      toast.success(response.data.message);
      setLink(''); // Clear the input after submission
    } catch (error) {
      // Display error message using toast
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Submit Link</h2>
      <div className="flex">
        <input
          type="text"
          placeholder="Enter your link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="mr-2 p-2 border border-gray-300"
        />
        <button onClick={handleSubmit} className="p-2 bg-blue-500 text-white">
          Submit
        </button>
      </div>
    </div>
  );
};

export default SubmitLink;
