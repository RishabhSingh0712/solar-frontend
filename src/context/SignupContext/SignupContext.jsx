import React,{createContext,useEffect,useState,useContext} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {useDialog} from '../DialogContext/DialogContext';
const SignupContext = createContext();  

export const SignupProvider = ({children})=>{
    const navigate = useNavigate();
    const { showDialog, hideDialog } = useDialog();
    const [firstName,setfirstName] = useState('');
    const [lastName,setlastName] = useState('');
    const [regEmail,setEmail] = useState('');
    const [regPassword,setPassword] = useState('');
    const [mobile,setPhone] = useState('');
    const [role,setRole] = useState('');
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState('');

    const signup = async () => {
        try {
            showDialog({ type: 'loading', message: 'Signing up...' });
    
            const response = await axios.post('https://solar-monitoring-api.onrender.com/api/user/send-verification', {
                first_name: firstName,
                last_name: lastName,
                email: regEmail,
                password: regPassword,
                mobile,
                role,
            });
            hideDialog();
            console.log('Signup API Response:', response);
    
            if (response?.status === 200) {
                console.log('Signup successful! Navigating to OTP page...');
                alert('Signup successful! Please verify your email.');
                setLoading(false);
                navigate('/otp', { replace: true });
            } else {
                console.log('Unexpected Response Status:', response.status);
                showDialog({
                    type: 'message',
                    title: 'Error',
                    message: 'Something went wrong',
                    actions: [{ label: 'Close', onClick: hideDialog }],
                  });
                setError('Signup failed. Unexpected response.');
            }
        } catch (error) {
            hideDialog(); // Hide loading dialog
      showDialog({
        type: 'message',
        title: 'Error',
        message: error.response?.data?.message || 'An unexpected error occurred.',
        actions: [{ label: 'Close', onClick: hideDialog }],
      });
            console.error('Signup API Error:', error);
    
            // Set error message for UI
            setError(error.response?.data?.message || 'Something went wrong');
        }
    };
    

   
    return(
        <SignupContext.Provider value={{firstName,setfirstName,lastName,setlastName,regEmail,setEmail,regPassword,setPassword,mobile,setPhone,role,setRole,signup,loading,error}}>
            {children}
        </SignupContext.Provider>
    )
};

export const signUpUser = () =>{ const context = useContext(SignupContext);
    return context;
}