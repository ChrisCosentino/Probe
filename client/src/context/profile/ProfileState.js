import React, { useReducer } from 'react';
import axios from 'axios';

import ProfileReducer from './profileReducer';
import ProfileContext from './profileContext';

import { GET_PROFILE } from '../types';

const ProfileState = (props) => {
  const initialState = {
    profile: {},
    anonymous: true,
  };

  const [state, dispatch] = useReducer(ProfileReducer, initialState);

  const getProfile = async (token) => {
    try {
      // If the profile exists and doesnt return an error then stay logged in
      const res = await axios.get('/api/profile/me', {
        headers: {
          'x-auth-token': token,
        },
      });

      console.log(res.data);
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });
    } catch (err) {
      // The user is not logged in
      console.log('anonymous');
    }
  };

  return (
    <ProfileContext.Provider
      value={{
        getProfile,
        profile: state.profile,
      }}>
      {props.children}
    </ProfileContext.Provider>
  );
};

export default ProfileState;
