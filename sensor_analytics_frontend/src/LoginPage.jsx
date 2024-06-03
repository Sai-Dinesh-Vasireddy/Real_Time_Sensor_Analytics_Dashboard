import React from 'react'
import './Styles/LoginPage.css'


const LoginPage = () => {
  return (
    <div className='C1'>
    <div className='container'>
        <div className='Header'>
            <div className='TEXT'>LOGIN
            </div>
            <div className='UNDERLINE'></div>
        </div>
        <div className='Inputs'>
        
            
            <div className='input'>
                <input type='email' placeholder='USERNAME'></input>
            </div>
            <div className='input'>
                <input type='password' placeholder='PASSWORD'></input>
            </div>
           


        </div>
        <div className='Forgot-Password'>Not A Member ?<a href='/'><span>Click Here!</span></a></div>
        <div className='Submit-Container'>
            <div className='Submit1'><a href='/dashboard'>Login</a></div>

        </div>
        
      
    </div>
    </div>
  )
}

export default LoginPage
