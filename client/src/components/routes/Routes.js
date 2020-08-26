import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

import Alert from '../layout/Alert';

import Login from '../auth/Login';
import Register from '../auth/Register';

import Home from '../layout/Home';
import CreatePost from '../layout/CreatePost';
import Profile from '../profile/Profile';
import NotFound from '../layout/NotFound';

const Routes = () => {
  return (
    <div className='ui container' style={{ paddingTop: '90px' }}>
      <Alert />
      <Switch>
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/home' component={Home} />
        <Route exact path='/post' component={CreatePost} />
        <PrivateRoute exact path='/profile/me' component={Profile} />
        <Redirect from='/' to='/home' />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default Routes;
