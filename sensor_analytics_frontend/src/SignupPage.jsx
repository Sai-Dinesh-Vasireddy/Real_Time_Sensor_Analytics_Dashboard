import React from 'react'
import { Link } from 'react-router-dom'

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
            <Link to='/dashboard'><button className='Submit'>Sign Up</button></Link>
        </div>
    </div>
    </div>
  )
}

export default SignupPage
