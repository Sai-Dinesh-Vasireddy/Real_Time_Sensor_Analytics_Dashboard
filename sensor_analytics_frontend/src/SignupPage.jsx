import React from 'react'
import './Styles/SignupPage.css'

const SignupPage = () => {
  return (  
    <div className='C1'>
    <div className='container'>
        <div className='Header'>
            <div className='TEXT'>SIGN UP</div>
            <div className='UNDERLINE'></div>
        </div>
        <div className='Inputs'>
        <div className='input'>
                <input type='text' placeholder='NAME'></input>
            </div>
            <div className='input'>
                <input type='text' placeholder='EMAIL ADDRESS'></input>
            </div>
            <div className='input'>
                <input type='email' placeholder='USERNAME'></input>
            </div>
            <div className='input'>
                <input type='password' placeholder='PASSWORD'></input>
            </div>
           


        </div>
        <div className='Forgot-Password'>Already A Member ?<a href='/login'><span>Click Here!</span></a></div>
        <div className='Submit-Container'>
            <div className='Submit1'>Sign Up</div>

        </div>
        
      
    </div>
    </div>
  )
}

export default SignupPage
