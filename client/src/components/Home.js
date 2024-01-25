// src/components/Home.js

import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container mx-auto mt-8">
      <section className="mb-8">
        <h2 className="text-3xl font-bold mb-4">Welcome to Traffic Boost!</h2>
        <p className="text-lg">Get traffic to your links and boost your online presence.</p>
      </section>

      <section className="mb-8">
        <h3 className="text-2xl font-bold mb-2">How It Works</h3>
        <p className="text-lg">
          Watch two links and receive one watch for your own link. Redeem your watches to get traffic to your YouTube,
          TikTok, Instagram, or website links.
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-2xl font-bold mb-2">VIP Membership</h3>
        <p className="text-lg">
          Become a VIP member to subscribe monthly or pay for a specific number of watches. VIP members have additional
          benefits and priority access to traffic.
        </p>
      </section>

      <section>
        <h3 className="text-2xl font-bold mb-2">Get Started</h3>
        <p className="text-lg">Join now and boost your online presence!</p>
        <div className="flex space-x-4 mt-4">
          <Link to="/register" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Register
          </Link>
          <Link to="/login" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Login
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
