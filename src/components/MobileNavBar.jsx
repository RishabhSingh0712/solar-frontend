import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBarsStaggered, faClose, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useSidebarToggle } from '../context/SidebarToggle/SidebarToggleContext';
import Sidebar from './Sidebar'; // Assuming Sidebar component is imported from another file

// CSS classes for managing open/closed states of the sidebar, can be reused elsewhere
const sidebarOpenClass = "translate-x-0"; 
const sidebarClosedClass = "-translate-x-full";

const MobileNavbar = () => {
  const {isSidebarOpen, toggleSidebar} = useSidebarToggle();

  return (
    <div>
      {/* Mobile Navigation Bar */}
      <div className='py-4 bg-gray-900 flex justify-between items-center lg:hidden m-auto'>
        {/* Icon for opening the sidebar */}
        <FontAwesomeIcon 
          icon={faBarsStaggered} 
          className='ml-3 text-white text-2xl' 
          onClick={toggleSidebar} 
        />
      
      </div>

    {/* Sidebar for mobile screens */}
    <div className={`fixed inset-0 z-50 ${isSidebarOpen ? 'block' : 'hidden'} ${isSidebarOpen ? sidebarOpenClass : sidebarClosedClass} transform transition-transform duration-600 ease-in-out`}>
        <Sidebar />
      </div>
 
    </div>
    
  );

};   
  

export default MobileNavbar;
