// context/UserContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import { useLoading } from '../LoadingContext/LoadingContext';
import { useDialog } from '../DialogContext/DialogContext';
// Create a Context for the user data
const UserContext = createContext();

// UserContext Provider Component
export const UserProvider = ({ children }) => {
const {showDialog,hideDialog  }=    useDialog();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Replace `{{base_url}}` with your actual base URL
        const fetchUsers = async () => {
            try {
                showDialog({ type: 'loading', message: 'Loading...' });
               
                const response = await fetch('https://solar-monitoring-api.onrender.com/api/user/get-user');
               
                console.log('response:', response);
                const data = await response.json();
                setUsers(data.users); // Assuming the API returns a field `users` containing an array of user objects
                hideDialog();
               
            } catch (err) {
                console.error('Error fetching users:', err.message);
                showDialog({ type: 'message', title: 'Error', message: err.message, actions: [{ label: 'Close', onClick: hideDialog }] });
                
            }
        };

        fetchUsers();
    }, []);

    return (
        <UserContext.Provider value={{ users, loading, error }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook to use the UserContext
export const useUsers = () => useContext(UserContext);
