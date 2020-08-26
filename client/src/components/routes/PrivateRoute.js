import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import AuthContext from '../../context/auth/authContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        authContext.authenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to='/home' />
        )
      }
    />
  );
};

export default PrivateRoute;
