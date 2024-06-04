import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); 
  const navigate = useNavigate();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); 

    setErrorMessage('');

    try {
      const response = await fetch('http://localhost:8080/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, username, email, password }),
      });

      if (!response.ok) {
        throw new Error(`Signup failed with status: ${response.status}`);
      }

      const data = await response.json(); 
      console.log('Signup successful:', data);

      navigate('/dashboard'); 
    } catch (error) {
      console.error('Signup error:', error);
      setErrorMessage(error.message); 
    }
  };

  return (
    <div className='C1'>
      <div className='container'>
        <div className='Header'>
          <div className='TEXT'>SIGN UP</div>
          <div className='UNDERLINE'></div>
        </div>
        <div className='Inputs'>
          <div className='input'>
            <input
              type='text'
              placeholder='NAME'
              value={name}
              onChange={handleNameChange}
            />
          </div>
          <div className='input'>
            <input
              type='text'
              placeholder='USERNAME'
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div className='input'>
            <input
              type='email'
              placeholder='EMAIL ADDRESS'
              value={email}
              onChange={handleEmailChange}
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
        {errorMessage && <div className='error-message'>{errorMessage}</div>} 
        <div className='Forgot-Password'>Already A Member ?<a href='/'><span>Click Here!</span></a></div>
        <div className='Submit-Container'>
          <button className='Submit' onClick={handleSubmit}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;