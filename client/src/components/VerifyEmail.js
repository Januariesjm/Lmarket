// src/components/VerifyEmail.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, withRouter } from 'react-router-dom';

const VerifyEmail = ({ history, location }) => {
  const [otp, setOtp] = useState('');
  const [countdown, setCountdown] = useState(300); // Initial countdown in seconds

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
      const response = await axios.post('http://localhost:3001/src/auth/verify-email', { email, otp });

      toast.success(response.data.message);
      history.push('/login');
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <h2>Verify Email</h2>
      <p>Enter the OTP sent to your email.</p>
      <input type="text" placeholder="OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
      <button onClick={handleVerify} disabled={countdown === 0}>
        Verify
      </button>
      <p>
        Resend OTP in {Math.floor(countdown / 60)}:{countdown % 60} minutes
      </p>
      <p>
        Didn't receive the OTP? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default withRouter(VerifyEmail);
