import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const handleRegister = async () => {
    try {
      // Check if passwords match
      if (password !== confirmPassword) {
        toast.error("Passwords don't match");
        return;
      }

      const response = await axios.post('http://localhost:3001/auth/register', {
        fullName,
        username,
        email,
        password,
      });

      toast.success(response.data.message);

      // Redirect to verify-email page with email as state
      navigate('/verify-email', { state: { email: email } });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="container mx-auto mt-8 max-w-md p-4 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <input
        className="w-full mb-4 p-2 border border-gray-300 rounded-md"
        type="text"
        placeholder="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />
      <input
        className="w-full mb-4 p-2 border border-gray-300 rounded-md"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
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
      <input
        className="w-full mb-4 p-2 border border-gray-300 rounded-md"
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button
        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        onClick={handleRegister}
      >
        Register
      </button>
      <p className="mt-4 text-center">
        Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
      </p>
    </div>
  );
};

export default Register;
