import React, { createContext, useState, useContext, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { set } from 'date-fns';
import {signUpUser} from '../SignupContext/SignupContext';
import { useLoading } from '../LoadingContext/LoadingContext';
import { useDialog } from '../DialogContext/DialogContext';
const OtpContext = createContext();

export const OtpProvider = ({ length = 6, children }) => {
  const [otp, setOtp] = useState(Array(length).fill(''));
  // const {loading,setLoading} = useLoading();
  const inputs = useRef([]);
// Accessing regEmail from SignupContext
const { regEmail } = signUpUser();  // Destructure regEmail from context
const { showDialog, hideDialog } = useDialog();
const navigate = useNavigate();

  // Handle input changes
   
  const handleChange = (value, index) => {
    if (value.match(/^\d$/)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      console.log('OTP:', newOtp);

      // Move focus to the next input
      if (index < length - 1) {
        inputs.current[index + 1]?.focus();
      }
    }

    // Move focus to previous input on empty value
    if (value === '' && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  // Handle keydown events (e.g., Backspace)
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  // Clear the OTP
  const clearOtp = () => setOtp(Array(length).fill(''));
  const otpValue = otp.join(''); // Combine OTP array into a single string
   const reqbody = {
    email:regEmail,
    token: otpValue
   };
  const verifyOtp = async () => {
    try {
      showDialog({ type: 'loading', message: 'Verifying...' });
        console.log('reqbody  :', reqbody);
     
      const response = await axios.post(
        'https://solar-monitoring-api.onrender.com/api/user/verify-email',
        reqbody
      );
      console.log('reqbody  :', reqbody);
      console.log(' Response:', response);
      hideDialog(); // Hide loading dialog
      if (response?.status === 200) {
        console.log('OTP verified. Navigating to dashboard...');
      
        navigate('/login', { replace: true });
      }else{
        showDialog({
          type: 'message',
          title: 'Error',
          message: 'Wrong Otp',
          actions: [{ label: 'Close', onClick: hideDialog }],
        });
      
        console.log('OTP verification failed.');
      }
    } catch (error) {
      showDialog({
        type: 'message',
        title: 'Error',
        message: error.response?.data?.message || 'An unexpected error occurred.',
        actions: [{ label: 'Close', onClick: hideDialog }],
      });
      console.log(error.message);
    }
  };

  return (
    <OtpContext.Provider
      value={{
        otp,
        setOtp,
        clearOtp,
        handleChange,
        handleKeyDown,
        verifyOtp,
        inputs,
        length,
      }}
    >
      {children}
    </OtpContext.Provider>
  );
};

export const useOtp = () => useContext(OtpContext);
