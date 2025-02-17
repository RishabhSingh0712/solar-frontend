import React from 'react';
import { useOtp } from '../context/OtpContext/OtpContext';


const OTPInput = () => {
  const { otp, handleChange, handleKeyDown, verifyOtp,inputs } = useOtp();
  return (
    <div>
      <h3 className='text-xl font-semibold text-gray-600'>OTP Verification</h3>
      <span className='text-sm text-gray-600'>Enter the OTP sent to your email address</span>
    <div className='flex flex-col items-center justify-center gap-2'>
      
      
         <div className='mt-8'>
         <div  style={{ display: 'flex', justifyContent: 'center' }}>
      {otp.map((digit, index) => (
        <input
          key={index}
          type="text"
          maxLength="1"
          value={digit}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          ref={(el) => (inputs.current[index] = el)}
          style={{
            width: '40px',
            height: '40px',
            margin: '0 5px',
            textAlign: 'center',
            fontSize: '18px',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        />
      ))}
    </div>
         </div>
         <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-xs mt-10' onClick={verifyOtp}>Submit</button>
         </div>
      
   
    </div>

  );
};

export default OTPInput;
