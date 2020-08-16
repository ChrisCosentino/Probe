import React, { useEffect, useContext } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

// import './styles.css';

import Login from './components/auth/Login';
import Register from './components/auth/Register';

import AuthState from './context/auth/AuthState';
import ProfileState from './context/profile/ProfileState';

import Home from './components/layout/Home';
import Alert from './components/layout/Alert';
import AlertState from './context/alert/AlertState';
import Navbar from './components/layout/Navbar';
import Profile from './components/layout/Profile';

const App = () => {
  return (
    <AuthState>
      <ProfileState>
        <AlertState>
          <Router>
            <Navbar />
            <div className='ui container' style={{ paddingTop: '90px' }}>
              <Alert />
              <Switch>
                <Route exact path='/login' component={Login} />
                <Route exact path='/register' component={Register} />
                <Route exact path='/profile' component={Profile} />
                <Route exact path='/home' component={Home} />
                <Redirect from='/' to='/home' />
              </Switch>
            </div>
          </Router>
        </AlertState>
      </ProfileState>
    </AuthState>
  );
};

export default App;
