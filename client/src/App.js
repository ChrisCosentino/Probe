import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Routes from './components/routes/Routes';

import AuthState from './context/auth/AuthState';
import ProfileState from './context/profile/ProfileState';
import AlertState from './context/alert/AlertState';

import './styles.css';

const App = () => {
  return (
    <AuthState>
      <ProfileState>
        <AlertState>
          <Router>
            <Navbar />
            <Routes />
          </Router>
        </AlertState>
      </ProfileState>
    </AuthState>
  );
};

export default App;
