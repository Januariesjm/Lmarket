// src/components/ResetPassword.js

import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResetPassword = ({ history }) => {
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');

  const handleResetPassword = async () => {
    try {
      const response = await axios.post('http://localhost:3001/auth/reset-password', { token, password });
      toast.success(response.data.message);
      history.push('/login');
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <input type="text" placeholder="Reset Token" value={token} onChange={(e) => setToken(e.target.value)} />
      <input type="password" placeholder="New Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleResetPassword}>Reset Password</button>
    </div>
  );
};

export default ResetPassword;
