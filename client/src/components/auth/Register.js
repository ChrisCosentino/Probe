import React, { useState, useContext } from 'react';
import axios from 'axios';

import { Redirect } from 'react-router-dom';

import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState('');

  const [next, setNext] = useState(false);

  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const handleInput = (e) => {
    if (e.target.name === 'email') {
      setEmail(e.target.value);
    }
    if (e.target.name === 'username') {
      setUsername(e.target.value);
    }

    if (e.target.name === 'password') {
      setPassword(e.target.value);
    }
  };

  const handleForm = (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      alertContext.setAlert('Please fill in all fields');
    } else {
      register();
    }
  };

  const register = async () => {
    try {
      const data = {
        email,
        password,
        username,
        avatar,
      };
      const res = await axios.post('/api/users', data);
      authContext.setToken(res.data.token);
    } catch (err) {
      alertContext.setAlert('Error creating account');
    }
  };

  if (authContext.authenticated) {
    return <Redirect to='/home' />;
  }

  return (
    <form onSubmit={handleForm}>
      <h1>REGISTER</h1>
      <input
        onChange={handleInput}
        value={email}
        type='text'
        placeholder='email'
        name='email'
      />
      <input
        onChange={handleInput}
        value={username}
        type='text'
        placeholder='username'
        name='username'
      />
      <input
        onChange={handleInput}
        value={password}
        type='password'
        placeholder='password'
        name='password'
      />
      <button type='submit' className=' button'>
        Submit
      </button>
    </form>
  );
};

export default Register;
