import React, { Fragment, useState, useContext, useEffect } from 'react';

import axios from 'axios';

import AlertContext from '../../context/alert/alertContext';
import ProfileContext from '../../context/profile/profileContext';
import AuthContext from '../../context/auth/authContext';

const ProfilePosts = () => {
  const alertContext = useContext(AlertContext);
  const profileContext = useContext(ProfileContext);
  const authContext = useContext(AuthContext);

  const [selectedPost, setSelectedPost] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts();
  }, []);

  const handleClick = () => {
    console.log('clicked');
  };

  const getPosts = async () => {
    try {
      const res = await axios.get(`/api/posts/user/${authContext.userId}`);
      setPosts(res.data);
    } catch (err) {
      alertContext.setAlert('Error fetching posts');
    }
  };

  return (
    <Fragment>
      <div className='ui huge header'>Posts</div>
      <div className='ui divided items relaxed container'>
        {posts.length > 0 ? (
          posts.map((post) => (
            <div
              className='item post-container'
              onClick={handleClick}
              key={post._id}>
              <div className='content'>
                <div className='header'>{post.title}</div>
                <div className='meta'>{post.description}</div>
              </div>
            </div>
          ))
        ) : (
          <div>No posts</div>
        )}
      </div>
    </Fragment>
  );
};

export default ProfilePosts;
