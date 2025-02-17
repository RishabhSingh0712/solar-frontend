import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthContext/AuthContext';
import 'react-toastify/dist/ReactToastify.css';

import { useDialog } from '../DialogContext/DialogContext';
const SendNotificationContext = createContext();
export const SendNotificationProvider = ({ children }) => {
  const { token } = useAuth();
  const {showDialog,hideDialog} =useDialog();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false); // Initialize loading to false
  const [error, setError] = useState(null);
  const [customerIds, setCustomerIds] = useState([]);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const sendNotification = async () => {
    if (!customerIds.length || !title || !message) {
      showDialog({
        type: 'message',
        title: 'Error',
        message: 'Please fill in all fields.',
        actions: [{ label: 'Close', onClick: hideDialog }],
      })
      return;
    }

   
    try {
     showDialog({
       type: 'loading',
       message: 'Sending...'
      
     })
     const requestBody = {
      customer_ids: customerIds,
      title: title,
      message: message
     }
     console.log('Request Body:', requestBody);
      const response = await axios.post('https://solar-monitoring-api.onrender.com/api/admin/send-notification', requestBody, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      hideDialog();
      if(response.status === 200){
       
      console.log('Response:', response);
      setCustomerIds([]); // Clear the customerIds array
      showDialog({
        type: 'success',
        message: 'Notification sent successfully!',
        actions: [{ label: 'Close', onClick: hideDialog }],
      });

      setTimeout(() => {
        hideDialog();
      }, 3000); // Adjust the time as needed (in milliseconds)
    }
      else{
        setCustomerIds([]);
        console.log('Error Response:', response);
        showDialog({
          type: 'message',
          title: 'Error',
          message: 'Something went wrong',
          actions: [{ label: 'Close', onClick: hideDialog }],
        })
        console.log('Response:', response);
      }
      
    } catch (error) {
      setError(error.message);
      setCustomerIds([]);
      showDialog({
        type: 'message',
        title: 'Error',
        message: error.response?.data?.message || 'An unexpected error occurred.',
        actions: [{ label: 'Close', onClick: hideDialog }],
      });
     
    
    }
  };

  return (
    <SendNotificationContext.Provider value={{
      sendNotification,
      customerIds,
      setCustomerIds,
      title,
      setTitle,
      message,
      setMessage,
      loading,
      error
    }}>
      {children}
    </SendNotificationContext.Provider>
  );
};

export const useSendNotification = () => {
  return useContext(SendNotificationContext);
};
