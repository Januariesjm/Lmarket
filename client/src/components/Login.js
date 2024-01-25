import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3001/auth/login', { email, password });
      toast.success('Login successful!');

      // Save token to localStorage or Redux store if using state management
      const authToken = response.data.token;
      localStorage.setItem('token', authToken);

      // Redirect to the dashboard or home page
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="container mx-auto mt-8 max-w-md p-4 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <input
        className="w-full mb-4 p-2 border border-gray-300 rounded-md"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="w-full mb-4 p-2 border border-gray-300 rounded-md"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        onClick={handleLogin}
      >
        Login
      </button>
      <p className="mt-4 text-center">
        <Link to="/reset-password" className="text-blue-500">
          Forgot Password?
        </Link>
      </p>
    </div>
  );
};

export default Login;
