import React, { useContext, Fragment, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import AuthContext from '../../context/auth/authContext';
import ProfileContext from '../../context/profile/profileContext';

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const profileContext = useContext(ProfileContext);
  const { authenticated } = authContext;

  useEffect(() => {
    // this happens on page refresh or new page
    // save  the token to local storage
    let token = localStorage.getItem('authToken');
    console.log(token);
    if (token) {
      authContext.setToken(token);
      //load the profile once at the start so dont have to keep calling everytime
      profileContext.getProfile(token);
    }
  }, []);

  return (
    <nav className='ui inverted segment menu borderless fixed'>
      <NavLink className='item' to='/home'>
        Home
      </NavLink>
      <div className='right menu'>
        {authenticated ? (
          <NavLink to='/profile' className='item'>
            My Profile
          </NavLink>
        ) : (
          <Fragment>
            <NavLink to='/login' className='item'>
              Login
            </NavLink>
            <NavLink to='/register' className='item'>
              Register
            </NavLink>
          </Fragment>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
