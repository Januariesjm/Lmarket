import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const VerifyEmail = () => {
  const [otp, setOtp] = useState('');
  const [countdown, setCountdown] = useState(300); // Initial countdown in seconds

  const navigate = useNavigate();
  const location = useLocation(); // Use useLocation hook to access location

  const { email } = location.state || {};

  useEffect(() => {
    const interval = setInterval(() => {
      if (countdown > 0) {
        setCountdown((prev) => prev - 1);
      } else {
        clearInterval(interval);
      }
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, [countdown]);

  const handleVerify = async () => {
    try {
      const response = await axios.post('http://localhost:3001/auth/verify-email', { email, otp });

      toast.success(response.data.message);
      navigate('/login');
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="container mx-auto mt-8 max-w-md p-4 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Verify Email</h2>
      <p>Enter the OTP sent to your email.</p>
      <input
        className="w-full mb-4 p-2 border border-gray-300 rounded-md"
        type="text"
        placeholder="OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button
        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        onClick={handleVerify}
        disabled={countdown === 0}
      >
        Verify
      </button>
      <p className="mt-4">
        Resend OTP in {Math.floor(countdown / 60)}:{countdown % 60} minutes
      </p>
      <p className="mt-4">
        Didn't receive the OTP? <Link to="/login" className="text-blue-500">Login</Link>
      </p>
    </div>
  );
};

export default VerifyEmail;
