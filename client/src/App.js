// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from './components/Register';
import VerifyEmail from './components/VerifyEmail';
import Login from './components/Login';
import RequestPasswordReset from './components/RequestPasswordReset';
import ResetPassword from './components/ResetPassword';
import Navbar from './components/Navbar';
import Home from './components/Home';
import SubmitLink from './components/SubmitLink';
import ManageLinks from './components/ManageLinks';
import UserDashboard from './components/UserDashboard';


const App = () => {
  return (
    <Router>
       <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/register" component={Register} />
        <Route path="/verify-email" component={VerifyEmail} />
        <Route path="/login" component={Login} />
        <Route path="/request-password-reset" component={RequestPasswordReset} />
        <Route path="/reset-password" component={ResetPassword} />
        <Route path="/submit-link" component={SubmitLink} />
        <Route path="/manage-links" component={ManageLinks} />
        <Route path="/dashboard" component={UserDashboard} />
      </Switch>
    </Router>
  );
};

export default App;
