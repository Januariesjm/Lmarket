// src/App.js
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import VerifyEmail from './components/VerifyEmail';
import Login from './components/Login';
import RequestPasswordReset from './components/RequestPasswordReset';
import ResetPassword from './components/ResetPassword';
import Navbar from './components/Navbar';
import Home from './components/Home';
import SubmitLink from './components/SubmitLink';
import ManageLinks from './components/ManageLinks';
import Dashboard from './components/Dashboard';
import LinksList from "./components/LinksList";
import UserProfile from './components/UserProfile';

const App = () => {
  return (
    <Router>
  
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/request-password-reset" element={<RequestPasswordReset />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/submit-link" element={<SubmitLink />} />
        <Route path="/manage-links" element={<ManageLinks />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/links-list" element={<LinksList />} />
        <Route path="/user-profile" element={<UserProfile/>} />
      </Routes>
       <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </Router>
  );
};

export default App;
