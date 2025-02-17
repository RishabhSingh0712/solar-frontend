import React ,{useState} from "react";
import FormInput from "./FormInput";
import {Link } from 'react-router-dom';
import { usePasswordVisibility } from '../context/PasswordVisibilityContext/PasswordVisibilityContext';
import {  faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from "../context/AuthContext/AuthContext";
const ForGotPassword =()=>{
    //  const [password, setPassword] = useState('');
    //  const [confirmPassword, setConfirmPassword] = useState('');
     const { isPasswordVisible, togglePasswordVisibility } = usePasswordVisibility();
      const {newPassword, confirmPassword, changePassword,setNewPassword,setConfirmPassword } = useAuth();
     const handleSubmit =async (e)=>{
      e.preventDefault();
        console.log('handle submit button clicked');
      await changePassword(newPassword,confirmPassword);
     }
    return (
        <div className='flex flex-col items-center bg-transparent md:w-full w-full justify-center min-h-screen '>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Hello User!</h2>
            <p className="text-sm text-gray-700 mb-4">Change your password here!.</p>
            <form className="w-full max-w-sm px-4" autoComplete='off'>
            <FormInput
        type={isPasswordVisible ? 'text' : 'password'}
        label="New Password"
        autoComplete='off'
        placeholder="Enter new password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        icon={isPasswordVisible ? faEye: faEyeSlash }
        onIconClick={togglePasswordVisibility}
       
      />
       <FormInput
        type={isPasswordVisible ? 'text' : 'password'}
        label="Confirm Password"
        autoComplete='off'
        placeholder="Confirm your password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        icon={isPasswordVisible ? faEye: faEyeSlash }
        onIconClick={togglePasswordVisibility}
       
      />
       
     
    
    
    
    <button type="submit" onClick={handleSubmit} className="w-full bg-blue-500 text-white font-semibold py-2 text-sm mt-4 rounded-lg hover:bg-blue-700 transition duration-300">
     
      Submit
    </button> 
     
    </form>     
            
           
            <div className="flex flex-col gap-2 justify-center item-center ">
            <p className="text-center text-sm md:text-white mt-4">or</p>
            <p className="text-sm md:text-gray-100 text-gray-600 mt-4 md:font-semibold">
              Don't want to change password? <Link to="/" className="text-blue-500 hover:underline">Login</Link>
            </p>
            </div>
           
        </div>
      
    );
}

export default ForGotPassword;