import React, { createContext, useContext, useState ,useEffect} from 'react';

const SideBarContext = createContext();

export const SidebarToggleProvider = ({ children }) => {
    const [isSidebarOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        setIsOpen(false);
    };

     // Track window size and update sidebar state for large screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false); // Close the sidebar on large screens
      }
    };

    // Set initial state on mount
    handleResize();

    // Listen for window resize events
    window.addEventListener('resize', handleResize);

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
    return (
        <SideBarContext.Provider value={{ isSidebarOpen, toggleSidebar,closeSidebar }}>
            {children}                  
        </SideBarContext.Provider>
    );
};

export const useSidebarToggle = () =>{
    const context = useContext(SideBarContext);
    return context;
}