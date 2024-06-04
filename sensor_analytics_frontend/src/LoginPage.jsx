import React, { useState } from 'react';
import './Styles/LoginSignupPage.css';
import { Link, useNavigate } from 'react-router-dom';
import { color } from 'chart.js/helpers';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); 
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); 

    setErrorMessage('');

    try {
      const response = await fetch('http://127.0.0.1:8080/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*"},
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error(`Please enter valid Credentials!`);
      }

      const data = await response.json(); 
      console.log('Login successful:', data); 

      
      navigate('/dashboard'); 
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage(error.message); 
    }
  };

  return (
    <div className='C1'>
      <div className='container'>
        <div className='Header'>
          <div className='TEXT'>LOGIN</div>
          <div className='UNDERLINE'></div>
        </div>
        <div className='Inputs'>
          <div className='input'>
            <input
              type='email'
              placeholder='USERNAME'
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div className='input'>
            <input
              type='password'
              placeholder='PASSWORD'
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
        </div>
        {errorMessage && <div className='error-message'><span style={{color:'red'}}>{errorMessage}</span></div>}
        <div className='Forgot-Password'>
          Not A Member ?<a href='/signup'><span>Click Here!</span></a>
        </div>
        <div className='Submit-Container'>
          <button className='Submit' onClick={handleSubmit}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;