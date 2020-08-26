import React, { useEffect, useContext } from 'react';

import ProfileContext from '../../context/profile/profileContext';
import AuthContext from '../../context/auth/authContext';

const Home = () => {
  const authContext = useContext(AuthContext);
  useEffect(() => {
    authContext.setUserId();
  }, []);

  return <div>Home</div>;
};

export default Home;
