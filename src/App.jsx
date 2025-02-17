import React,{useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext/AuthContext';
import {SidebarToggleProvider} from './context/SidebarToggle/SidebarToggleContext';
import AuthContainer from "./components/AuthContainer";
import 'react-notifications-component/dist/theme.css'; // Make sure this is in your App.js
import { MainLayout } from "./components/MainLayout";
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles
import { useActiveTab } from "./context/ActiveTab/ActiveTab";
import { useDialog } from "./context/DialogContext/DialogContext";
import { NotificationProvider } from "./context/NotificationContext";
import { UserPlantProvider } from "./context/UserPlantContext/UserPlantContext";
import { AuthProvider } from "./context/AuthContext/AuthContext";

const App = () => {
  const {loading,logout } = useAuth();
const {setActiveTab} = useActiveTab();
const {showDialog,hideDialog} = useDialog();
const navigate = useNavigate(); // To navigate programmatically
const isLogedIn = sessionStorage.getItem('logedIn');
const tokenExpiryTime = sessionStorage.getItem('tokenExpiry'); // Get stored token expiry time
const currentTime = new Date().getTime();
const isTokenExpired = tokenExpiryTime && currentTime > tokenExpiryTime;



useEffect(() => {
  if (isTokenExpired) {
    // Show dialog and logout the user
    showDialog({
      type: 'message',
      title: 'Session Expired',
      message: 'Your session has expired. Please log in again.',
      actions: [{ label: 'Close', onClick: hideDialog }],
    });
    logout(); // Log out the user immediately
setActiveTab('')
    // Clear session storage to remove token data
    sessionStorage.clear();
    // navigate('/'); // Redirect to the login screen
  }
}, [isTokenExpired, logout, navigate, setActiveTab]);

  return (
    <SidebarToggleProvider>
      
     
          <div className={`h-screen `}>
            {(!isLogedIn || isTokenExpired )? 
            <AuthContainer /> :
          
            <NotificationProvider>
              
              <MainLayout />
              </NotificationProvider> 
             
              }
          </div>
            
    </SidebarToggleProvider>
  );
};

export default App;
