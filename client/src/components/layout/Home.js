import React, { useEffect, useContext } from 'react';

import ProfileContext from '../../context/profile/profileContext';
import AuthContext from '../../context/auth/authContext';

const Home = () => {
  const profileContext = useContext(ProfileContext);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    // profileContext.getProfile(authContext.token);
  }, []);

  return <div>Home</div>;
};

export default Home;
