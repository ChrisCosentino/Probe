import React, { useReducer } from 'react';
import axios from 'axios';

import AuthContext from './authContext';
import AuthReducer from './authReducer';

import { SET_TOKEN, SET_USER_ID } from '../types';

const AuthState = (props) => {
  const initialState = {
    token: '',
    authenticated: false,
    userId: '',
  };
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const setToken = (t) => {
    localStorage.setItem('authToken', t);
    dispatch({
      type: SET_TOKEN,
      payload: t,
    });
  };

  const setUserId = async () => {
    try {
      const res = await axios.get('/api/auth', {
        headers: {
          'x-auth-token': localStorage.getItem('authToken'),
        },
      });
      dispatch({
        type: SET_USER_ID,
        payload: res.data,
      });
    } catch (err) {
      console.log('error fetching profile by token');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        setToken,
        authenticated: state.authenticated,
        userId: state.userId,
        setUserId,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
