import React, { useEffect, useContext, Fragment } from 'react';

import ProfileContext from '../../context/profile/profileContext';
import AuthContext from '../../context/auth/authContext';
import ProfilePosts from './ProfilePosts';

const Profile = () => {
  const profileContext = useContext(ProfileContext);
  const authContext = useContext(AuthContext);

  const { profile } = profileContext;

  useEffect(() => {
    profileContext.getProfile(authContext.token);
  }, []);

  const handleSignOut = () => {
    localStorage.clear();
    // refresh page
    window.location.reload(true);
  };

  return (
    <Fragment>
      <div className='ui grid'>
        <div className='four wide column'>
          <img
            src={profile.avatar}
            className='ui circular image'
            style={{
              minHeight: '220px',
              minWidth: '220px',
              maxWidth: '220px',
              maxHeight: '220px',
              objectFit: 'cover',
            }}
          />
        </div>

        <div className='twelve wide column'>
          <h1>{profile.name}</h1>
          <h4>{profile.bio}</h4>
          <button className='button ui red' onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      </div>
      <div className='ui grid inverted segment' style={{ textAlign: 'center' }}>
        <div className='three column row'>
          <div
            className='column'
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <i className='external alternate icon teal'></i>
            {profile.website ? (
              <a
                href={profile.website}
                target='_blank'
                rel='noopener noreferrer'>
                {profile.website}
              </a>
            ) : (
              <p>Website N/A</p>
            )}
          </div>
          <div
            className='column'
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <i className='map pin icon red'></i>

            {profile.location ? <p>{profile.location}</p> : <p>Location N/A</p>}
          </div>

          <div
            className='column'
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <i className='calendar icon blue'></i>
            {profile.date ? <p>{profile.date.toString()}</p> : <p>Date N/A</p>}
          </div>
        </div>
      </div>
      <ProfilePosts />
    </Fragment>
  );
};

export default Profile;
