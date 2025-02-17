// ActiveTabContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const ActiveTabContext = createContext();

export const ActiveTabProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState(''); // Default to empty string initially

  useEffect(() => {
    // Retrieve the active tab from localStorage when the component mounts
    const storedTab = localStorage.getItem('activeTab');
    if (storedTab) {
      setActiveTab(storedTab); // Set activeTab from localStorage
    }
  }, []); // Run only once when the component mounts

  useEffect(() => {
    // Store the active tab in localStorage whenever it changes
    localStorage.setItem('activeTab', activeTab);
  }, [activeTab]);

  return (
    <ActiveTabContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </ActiveTabContext.Provider>
  );
};

export const useActiveTab = () => {
  return useContext(ActiveTabContext);
};