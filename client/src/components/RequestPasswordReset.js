// src/components/RequestPasswordReset.js

import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RequestPasswordReset = ({ history }) => {
  const [email, setEmail] = useState('');

  const handleRequestPasswordReset = async () => {
    try {
      const response = await axios.post('http://localhost:3001/auth/request-password-reset', { email });
      toast.success(response.data.message);
      // Handle successful password reset request, show a message, or redirect to email confirmation
    } catch (error) {
      toast.error(error.response.data.message);
      // Handle password reset request error
    }
  };

  return (
    <div>
      <h2>Request Password Reset</h2>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <button onClick={handleRequestPasswordReset}>Request Password Reset</button>
    </div>
  );
};

export default RequestPasswordReset;
