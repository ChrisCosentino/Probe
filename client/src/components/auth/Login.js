import React, { useState, useContext } from 'react';
import axios from 'axios';

import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';

import { Redirect } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const handleInput = (e) => {
    if (e.target.name === 'email') {
      setEmail(e.target.value);
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
      login();
    }
  };

  const login = async () => {
    try {
      const data = {
        email,
        password,
      };
      const res = await axios.post('/api/auth', data);

      authContext.setToken(res.data.token);
      localStorage.setItem('authToken', res.data.token);
    } catch (err) {
      // wrong credentials
      alertContext.setAlert('The credentials you have entered are incorrect');
    }
  };

  if (authContext.authenticated) {
    return <Redirect to='/home' />;
  }

  return (
    // <form onSubmit={handleForm} className='ui form'>
    //   <h1>Login</h1>
    //   <div className='ui left icon input field'>
    //     <input
    //       onChange={handleInput}
    //       value={email}
    //       type='text'
    //       placeholder='Email...'
    //       name='email'
    //     />
    //     <i class='envelope icon'></i>
    //   </div>
    //   <div className='ui left icon input field'>
    //     <input
    //       onChange={handleInput}
    //       value={password}
    //       type='password'
    //       placeholder='Password...'
    //       name='password'
    //     />
    //     <i class='user secret icon'></i>
    //   </div>
    //   <button type='submit' className='ui secondary button'>
    //     Submit
    //   </button>
    // </form>
    <form className='ui form' onSubmit={handleForm}>
      <div className='field'>
        <input
          type='email'
          name='email'
          value={email}
          placeholder='Email...'
          onChange={handleInput}
        />
      </div>
      <div className='field'>
        <input
          type='password'
          name='password'
          value={password}
          placeholder='Password'
          onChange={handleInput}
        />
      </div>

      <button className='ui button' type='submit'>
        Submit
      </button>
    </form>
  );
};

export default Login;
