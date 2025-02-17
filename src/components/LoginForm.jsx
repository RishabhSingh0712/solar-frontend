import React,{ useRef } from 'react';
import {Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext/AuthContext';
import { usePasswordVisibility } from '../context/PasswordVisibilityContext/PasswordVisibilityContext';
import FormInput from './FormInput';

import { faEnvelope, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const LoginForm = () => {
  
  const { email,password ,handleLoginClick,verifyUseremail,setEmail,setPassword} = useAuth();
 
  const { isPasswordVisible, togglePasswordVisibility } = usePasswordVisibility();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  // const handleSubmit = (e) => {
  //   e.preventDefault();  // Prevent page reload

  //   const email = emailRef.current?.value.trim();
  //   const password = passwordRef.current?.value.trim();

  //   if (email && password) {
  //     handleLoginClick(email, password); // Call login function
  //   }
  // };
 
  return (
    <div className='flex flex-col items-center bg-transparent md:w-full w-full justify-center min-h-screen '>


   
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Hello Again!</h2>
      <p className="text-sm text-gray-600 mb-4">Welcome back! Please login to your account.</p>

      <form className="w-full max-w-sm px-4" autoComplete='off'>
        <FormInput type="email" autoComplete='off' label="Email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} icon={faEnvelope} />
        
       
          <FormInput
            type={isPasswordVisible ? 'text' : 'password'}
            label="Password"
            autoComplete='Password'
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            // defaultValue="" 
            // ref={passwordRef}
            // onChange={(e) => (passwordRef.current = e.target.value)}
            icon={isPasswordVisible ? faEye: faEyeSlash }
            onIconClick={togglePasswordVisibility}
           
          />
           
        
        
        
        
        <button type="submit" onClick={handleLoginClick} className="w-full bg-blue-500 text-white font-semibold py-2 text-sm mt-4 rounded-lg hover:bg-blue-700 transition duration-300">
         
          Login
        </button>
        <div className="flex justify-end mt-2" onClick={verifyUseremail}>
          <p className="text-xs md:text-sm text-blue-500 md:text-white hover:underline font-medium ">Forgot Password?</p>
        </div>
        
        
       
        <div className="flex flex-col gap-2 justify-center item-center ">
        <p className="text-center text-sm md:text-white ">or</p>
        <p className="text-xs md:text-sm text-center text-gray-600 md:text-gray-100  ">
          Don't have an account? <Link to="/signup" className="text-blue-500 text-xs md:text-sm md:text-white hover:underline font-medium">Sign up</Link>
        </p>
        </div>
      </form>


    </div>
  );
};

export default LoginForm;
