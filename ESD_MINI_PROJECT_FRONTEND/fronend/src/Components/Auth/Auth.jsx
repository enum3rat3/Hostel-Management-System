import React, { useState } from 'react'
import LoginForm from './Signin/SigninForm'
import SignupForm from './Signup/SignupForm'
import './Auth.css'

const Auth = () => {
  const [isRegister, setIsRegister] = useState(false)

  const togglePanel = () => {
    setIsRegister(!isRegister)
  }

  return (
    <>
    <div className='flex justify-center h-screen items-center overflow-hidden '>

      <div className='box  lg:max-w-4xl'>
        <div className={`cover ${isRegister ? 'rotate-active' : ''}`}>
          <div class='front'>
            <img
              class=''
              src='https://educationpost.in/_next/image?url=https%3A%2F%2Fapi.educationpost.in%2Fs3-images%2F1720437464352-iiitb.jpg&w=3840&q=75'
              alt=''
            />
            <div class='text'>
              <span class='text-1'>
                INTERNATIONAL INSTITUTE OF INFORMATION TECHNOLOGY
              </span>
              <span class='text-2 text-xs'>BANGLORE</span>
            </div>
          </div>
          <div class='back'>
            <img
              src='https://educationpost.in/_next/image?url=https%3A%2F%2Fapi.educationpost.in%2Fs3-images%2F1720437464352-iiitb.jpg&w=3840&q=75'
              alt=''
            />
            <div class='text'>
              <span class='text-1'>
                INTERNATIONAL INSTITUTE OF INFORMATION TECHNOLOGY
              </span>
              <span class='text-2 text-xs'>BANGLORE</span>
            </div>
          </div>
        </div>
        <div className='forms h-full'>
          <div className='form-content h-full '>
            <div className='login-form '>
              <LoginForm togglePanel={togglePanel} />
            </div>
            <div className='signup-form'>
              <SignupForm togglePanel={togglePanel} />
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Auth
