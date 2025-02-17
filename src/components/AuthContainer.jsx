import React from 'react';
import {useAuth} from '../context/AuthContext/AuthContext';
import { useLocation } from 'react-router-dom';
import LoginForm from './LoginForm';
import SidePanel from './SidePanel';
import Signup from './Signup';
import OTPInput from './Otp';
import { SignupProvider } from '../context/SignupContext/SignupContext';
import {OtpProvider} from '../context/OtpContext/OtpContext';
import ParticleBackground from './ParticleBackground';
import ForGotPassword from './ForgotPassword';
const AuthContainer = () => {
 
  const location = useLocation();
 
  return (
    <div className="h-screen relative">
      {/* <SidePanel /> */}
      <ParticleBackground />
      <div className="absolute inset-0 flex justify-center items-center">
      {location.pathname === '/signup' ? (
          <SignupProvider>      
            <Signup />   
          </SignupProvider>
        ) : location.pathname === '/otp' ? (
          <SignupProvider>
          <OtpProvider>
          <OTPInput />
          </OtpProvider>
          </SignupProvider>
        ) : location.pathname==='/forgotPassword'?(<ForGotPassword/>):
        (
          <LoginForm />
        )}
      </div>
     
    </div>
  );
};

export default AuthContainer;
