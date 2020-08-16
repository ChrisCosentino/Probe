import React, { useReducer } from 'react';

import AuthContext from './authContext';
import AuthReducer from './authReducer';

import { SET_TOKEN } from '../types';

const AuthState = (props) => {
  const initialState = {
    token: '',
    authenticated: false,
  };
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const setToken = (t) => {
    dispatch({
      type: SET_TOKEN,
      payload: t,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        setToken,
        authenticated: state.authenticated,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
