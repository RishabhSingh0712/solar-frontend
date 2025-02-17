// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useActiveTab } from '../ActiveTab/ActiveTab';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {useDialog} from '../DialogContext/DialogContext'
import {initializeSocket} from '../../socket'
const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  // const { setLoading } = useLoading(); // Import loading context'
  const navigate = useNavigate(); // To navigate programmatically
   const { showDialog, hideDialog } = useDialog();
  const [user, setUser] = useState([]);
  const {setActiveTab} = useActiveTab();
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null); // New state for token
  const [loading, setLoading] = useState(false); // Add loading state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  useEffect(() => {
  
    const fetchData = async () => {
     
      try {
        const userData = JSON.parse(sessionStorage.getItem('user'));
        const loggedIn = sessionStorage.getItem('logedIn') === 'true';
        const savedToken = sessionStorage.getItem('token');
        const tokenExpiry = sessionStorage.getItem('tokenExpiry'); // Stored token expiration time
        // if (loggedIn && userData) {
        //   setUser(userData);
        //   setIsLoggedIn(true);
        //   setToken(savedToken);
        
        // }
        if (loggedIn && userData && savedToken && tokenExpiry) {
          const currentTime = new Date().getTime();
          if (currentTime < tokenExpiry) {
            console.log('login time:',user)
            setUser(userData);
            setIsLoggedIn(true);
            setToken(savedToken);
          } else {
            // Token is expired, logout the user
            logout();
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } 
    };
  
    fetchData();
  }, []);
  const getTokenSizeInBytes = (token) => {
    return new TextEncoder().encode(token).length;
  };
  const login = (userData,userToken) => {

     // Exclude password and created_at
     const { password, created_at, ...filteredUserData } = userData;

     setUser(filteredUserData);
     setIsLoggedIn(true);
     setToken(userToken);
 
   
  // Store only required details in sessionStorage
    sessionStorage.setItem('user', JSON.stringify(filteredUserData));
    // setUser(userData);
    // setIsLoggedIn(true);
    // setToken(userToken);
    
    // sessionStorage.setItem('user', JSON.stringify(userData));
    sessionStorage.setItem('logedIn', true);
    sessionStorage.setItem('token', userToken); // Save token in sessionStorage
    console.log(`Token size in bytes: ${getTokenSizeInBytes(sessionStorage.getItem('token'))}`);
        // Set token expiry time to 2 minutes from now
        const expiryTime = new Date().getTime() + 24 * 60 * 60 * 1000; // Token expires in 24 hours
        sessionStorage.setItem('tokenExpiry', expiryTime); // Store token expiry time
  };


  const handleLoginClick = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      showDialog({
        type: 'message',
        title: 'Error',
        message: 'Please fill in all fields.',
        actions: [{ label: 'Close', onClick: hideDialog }],
      });
      return;
    }

    try {
      showDialog({ type: 'loading', message: 'Logging in...' });

      const response = await axios.post(
        'https://solar-monitoring-api.onrender.com/api/user/login',
        { email, password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      hideDialog(); // Hide loading dialog
      if (response.status === 200) {
        const { user, token } = response.data;

        login(user, token);
        initializeSocket();

        setActiveTab(user.role === 'admin' ? 'dashboard' : 'userDashboard');
        navigate(user.role === 'admin' ? '/dashboard' : '/userDashboard', { replace: true });
        setEmail('');
        setPassword('');
      } else {
        showDialog({
          type: 'message',
          title: 'Error',
          message: 'Invalid credentials.',
          actions: [{ label: 'Close', onClick: hideDialog }],
        });
      }
    } catch (error) {
      console.error('Error logging in:', error.message);
      showDialog({
        type: 'message',
        title: 'Error',
        message: error.response?.data?.message || 'An unexpected error occurred.',
        actions: [{ label: 'Close', onClick: hideDialog }],
      });
    }
  };


  // const handleLoginClick = async (email, password) => {
  //   if (!email || !password) {
  //     showDialog({
  //       type: 'message',
  //       title: 'Error',
  //       message: 'Please fill in all fields.',
  //       actions: [{ label: 'Close', onClick: hideDialog }],
  //     });
  //     return;
  //   }
  
  //   try {
  //     showDialog({ type: 'loading', message: 'Logging in...' });
  
  //     const response = await axios.post(
  //       'https://solar-monitoring-api.onrender.com/api/user/login',
  //       { email, password },
  //       { headers: { 'Content-Type': 'application/json' } }
  //     );
  
  //     hideDialog();
  //     if (response.status === 200) {
  //       const { user, token } = response.data;
  //       login(user, token);
  //       initializeSocket();
  //       setActiveTab(user.role === 'admin' ? 'dashboard' : 'userDashboard');
  //       navigate(user.role === 'admin' ? '/dashboard' : '/userDashboard', { replace: true });
  //     } else {
  //       showDialog({
  //         type: 'message',
  //         title: 'Error',
  //         message: 'Invalid credentials.',
  //         actions: [{ label: 'Close', onClick: hideDialog }],
  //       });
  //     }
  //   } catch (error) {
  //     console.error('Error logging in:', error.message);
  //     showDialog({
  //       type: 'message',
  //       title: 'Error',
  //       message: error.response?.data?.message || 'An unexpected error occurred.',
  //       actions: [{ label: 'Close', onClick: hideDialog }],
  //     });
  //   }
  // };
  

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    setToken(null);
    setActiveTab('')
   
    sessionStorage.clear(); // Remove token from sessionStorage
    navigate('/',-1);
  };


  const verifyUseremail = async()=>{
    if (!email) {
      showDialog({
        type: 'message',
        title: 'Error',
        message: 'Please fill email field.',
        actions: [{ label: 'Close', onClick: hideDialog }],
      });
      return;
    }
    try{
    
      showDialog({ type: 'loading', message: 'Loading...' });
      const requestBody={
        email
      }
      console.log('Request Body',requestBody);
      const response = await axios.post(  'https://solar-monitoring-api.onrender.com/api/user/get-verify-user', requestBody,{ headers: { 'Content-Type': 'application/json' } })
      console.log('response',response);
      if(response.status===200){
         // Save user in sessionStorage
      sessionStorage.setItem('user-email', response.data.user);
        hideDialog();
        navigate('/forgotPassword',-1)
      }else{
        console.log('else part',response)
        showDialog({ type: 'message',
          title: 'Error',
          message: response.data.message,
          actions: [{ label: 'Close', onClick: hideDialog }],})
      }
    }catch(error){
      console.log('catch part',error.message)
      showDialog({ type: 'message',
        title: 'Error',
        message:'User not found',
        actions: [{ label: 'Close', onClick: hideDialog }],})
    }
  }
  
  const changePassword = async () => {
    const storedEmail = sessionStorage.getItem('user-email'); // Get email from sessionStorage
console.log('storedEmail',storedEmail);
    if (!newPassword || !confirmPassword) {
      showDialog({
        type: 'message',
        title: 'Error',
        message: 'Please fill both password and confirm password fields.',
        actions: [{ label: 'Close', onClick: hideDialog }],
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      showDialog({
        type: 'message',
        title: 'Error',
        message: 'Password and confirm password do not match.',
        actions: [{ label: 'Close', onClick: hideDialog }],
      });
      return;
    }

    try {
      showDialog({ type: 'loading', message: 'Changing password...' });

      const requestBody = {
        email: storedEmail,
        password: newPassword,
        confirmPassword: confirmPassword,
      };

      const response = await axios.put(
        'https://solar-monitoring-api.onrender.com/api/user/change-password',
        requestBody,
        { headers: { 'Content-Type': 'application/json' } }
      );
console.log('requestBody',requestBody);
      hideDialog();

      if (response.status === 200) {
        showDialog({
          type: 'message',
          title: 'Success',
          message: 'Password changed successfully.',
          actions: [{ label: 'Close',  onClick: () => {
            hideDialog();
            navigate('/'); // Change the route to '/'
          }, }],
        });
       
        setNewPassword('');
        setConfirmPassword('');
       
      
      } else {
        showDialog({
          type: 'message',
          title: 'Error',
          message: response.message,
          actions: [{ label: 'Close', onClick: hideDialog }],
        });
      }
    } catch (error) {
      hideDialog();
      // Extract the error message from Axios error object.
    const errorMessage =
    error.response && error.response.data && error.response.data.message
      ? error.response.data.message
      : error.message || 'An unknown error occurred';

  showDialog({
    type: 'message',
    title: 'Error',
    message: errorMessage,
    actions: [{ label: 'Close', onClick: hideDialog }],
  });
    }
  };
  
  return (
    <AuthContext.Provider value={{ user, isLoggedIn,token,loading,email,password,newPassword, confirmPassword,setLoading, login, logout,handleLoginClick,verifyUseremail,changePassword,setEmail,setPassword,setNewPassword,setConfirmPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext); // Ensure this returns the context
};