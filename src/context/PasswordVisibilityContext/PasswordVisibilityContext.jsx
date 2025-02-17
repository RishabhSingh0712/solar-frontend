// PasswordVisibilityContext.js
import { set } from 'date-fns';
import React, { createContext, useContext, useState } from 'react';

// Create context
const PasswordVisibilityContext = createContext();

// Custom hook to use the context
export const usePasswordVisibility = () => useContext(PasswordVisibilityContext);

// Provider component
export const PasswordVisibilityProvider = ({ children }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <PasswordVisibilityContext.Provider value={{ isPasswordVisible, togglePasswordVisibility,setIsPasswordVisible }}>
      {children}
    </PasswordVisibilityContext.Provider>
  );
};
