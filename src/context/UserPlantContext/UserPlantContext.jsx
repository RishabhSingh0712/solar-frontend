import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthContext/AuthContext';
const UserPlantContext = createContext();

export const UserPlantProvider = ({ children }) => {
    const { token } = useAuth();
  const [loading, setLoading]=  useState(false);
    const [plantData, setPlantData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // State for current page
    const [totalPages, setTotalPages] = useState(1); // State for total pages
   

    // Function to fetch user plant details based on page
    const getUserPlantDetails = async (page) => {
        try {
            console.log('admin token:', token);
            setLoading(true); // Start loading
            const response = await axios.post(
                'https://solar-monitoring-api.onrender.com/api/admin/get-customer-with-plant-details', 
                { page: page },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const result = response.data; // Adjust based on your API response structure

            setPlantData(result.data); // Set the plant data
            setTotalPages(result.totalPages); // Set the total number of pages
        } catch (err) {
            console.log('Error while fetching data', err.message);
        } finally {
            setLoading(false); // End loading
        }
    };

    // Fetch data whenever the current page changes
    useEffect(() => {
        if (token) {
            getUserPlantDetails(currentPage);
        }
    }, [token, currentPage]); // Dependency on currentPage to trigger fetching on page change

    // Function to handle page change
    const handlePageChange = (page) => {
        setCurrentPage(page); // Set the new page
    };

    return (
        <UserPlantContext.Provider value={{ plantData,loading,currentPage, totalPages, handlePageChange}}>
            {children}
        </UserPlantContext.Provider>
    );
};

export const useUserPlant = () => {
    const context = useContext(UserPlantContext);
    return context;
};
