import React from 'react';
import { useAuth } from '../context/AuthContext/AuthContext';
import {useDropdown} from '../context/DropDownContext/DropdownContext';
import { useSidebarToggle } from '../context/SidebarToggle/SidebarToggleContext';
import { Link } from 'react-router-dom'; // Import Link
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {useActiveTab} from '../context/ActiveTab/ActiveTab'
import {useDialog} from '../context/DialogContext/DialogContext';
import {  faTelegramPlane, faWindows } from '@fortawesome/free-brands-svg-icons';
import { faBell, faCake, faChevronDown, faGear,  faSolarPanel, faClose, faUser, faUsers, faRightFromBracket, faIndustry } from '@fortawesome/free-solid-svg-icons';
import Dropdown from './Dropdown';
const Sidebar = () => {
  const { user,logout } = useAuth();
  const {showDialog,hideDialog} = useDialog();
 const tokenExpiryTime = sessionStorage.getItem('tokenExpiry'); // Get stored token expiry time
 const currentTime = new Date().getTime();
 const isTokenExpired = tokenExpiryTime && currentTime > tokenExpiryTime;
  const { activeTab, setActiveTab } = useActiveTab(); // Access activeTab and setActiveTab from context
  const { isSidebarOpen,closeSidebar } = useSidebarToggle();
  const {toggleDropdown} = useDropdown();
  
  const handleDropdownClick = (event) => {
    event.stopPropagation(); // Prevent the click from bubbling up
    console.log("Toggle Dropdown Clicked");
    toggleDropdown();
};
  const handleTabClick = (tab) => {
    if(isTokenExpired){
      showDialog({
        type: 'message',
        title: 'Session Expired',
        message: 'Your session has expired. Please log in again.',
        actions: [{ label: 'Close', onClick: hideDialog }],
      });
      logout();
      
      closeSidebar();
    }
    setActiveTab(tab);
    closeSidebar();
   
  };
 
  const tabs =user && user.role === 'admin' ? ['dashboard', 'users', 'settings', 'profile','sendnotification','logout'] : ['userDashboard', 'settings', 'profile', ,'notifications','inverters','support','logout'];
 
return (
  <div
    className={`flex flex-col h-screen bg-gray-800 w-64 ${
      isSidebarOpen ? "block" : "hidden"
    } lg:block transform transition-transform duration-600 ease-in-out`}
  >
    {isSidebarOpen && (
      <div className="flex  items-center gap-2 px-2 py-2 mt-4 bg-gray-800 ">
         
        
        
       
            <div className="w-8 h-8 flex items-center justify-center text-lg text-white bg-gray-700 rounded-full">
              {user && user.first_name && user.last_name && (
                <>
                  <span className="text-sm">
                    {user.first_name.charAt(0).toUpperCase()}
                  </span>
                  <span className="text-sm">
                    {user.last_name.charAt(0).toUpperCase()}
                  </span>
                </>
              )}
            </div>
            
              {user && user.email && (
                <p className="text-[14px] text-white   overflow-hidden text-ellipsis whitespace-nowrap w-65">{user.email}</p>
              )}
            
          
        
    
        <FontAwesomeIcon
          icon={faClose}
          className="text-white text-2xl cursor-pointer ml-2"
          onClick={closeSidebar}
        />
      </div>
    )}
     <div className="h-[1px] bg-gray-400 "></div>
    <div className="flex flex-col h-full justify-between bg-gray-800 mt-6">
   
      <div>
        <div className={`w-64 bg-gray-800 text-white px-2 py-2`}>
          <div
            className="px-2 mt-2 flex flex-row gap-1 items-center justify-center hover:bg-gray-700 rounded-md"
            onClick={handleDropdownClick}
          >
            <FontAwesomeIcon icon={faSolarPanel} />
            <button className="block py-2 px-1 w-full text-left text-sm font-semibold">
              Takyon Networks
            </button>
            <FontAwesomeIcon icon={faChevronDown} className="text-xs" />
          </div>
          <Dropdown />
        </div>
        
        <nav className=" px-2  flex flex-col gap-1 ">
          {tabs.map((tab) => (
            <Link
              key={tab}
              to={`/${tab}`} // Use Link for navigation
              className={`px-2 mt-[6px] flex gap-2 items-center text-white justify-center rounded-md ${
                tab === activeTab ? "bg-blue-600" : "hover:bg-gray-700"
              }`}
              onClick={() =>tab==='logout'?logout(): handleTabClick(tab)}
            >
              <FontAwesomeIcon icon={getIcon(tab)} />
              <button className="py-2 px-1 w-full text-left text-sm font-semibold">
                {capitalizeFirstLetter(tab)}
              </button>
            </Link>
          ))}
        </nav>
      </div>

      {/* Move the user info section to the bottom */}
    {!isSidebarOpen &&(  <div className="bg-gray-800 text-white  py-2">
        <div className="flex flex-col">
          <div className="h-[1px] bg-gray-400 mb-3"></div>
          <div className="flex items-center px-2">
            <div className="w-8 h-8 flex items-center justify-center text-xl text-white bg-gray-700 rounded-full">
              {user && user.first_name && user.last_name && (
                <>
                  <span className="text-sm">
                    {user.first_name.charAt(0).toUpperCase()}
                  </span>
                  <span className="text-sm">
                    {user.last_name.charAt(0).toUpperCase()}
                  </span>
                </>
              )}
            </div>
            <div className="ml-2 overflow-hidden text-ellipsis w-50">
              {user && user.email && (
                <div className="text-[14px] ">{user.email}</div>
              )}
            </div>
          </div>
        </div>
      </div>)}
    </div>
  </div>
);};

const getIcon = (tab) => {
  switch (tab) {
    case 'dashboard':
      return faWindows;
    case 'users':
      return faUsers;
    case 'settings':
      return faGear;
    case 'profile':
      return faUser;
    case 'userDashboard':
      return faBell;
      case 'sendnotification':
        return faTelegramPlane;
        case 'notifications':
          return faBell;
          case 'inverters':
            return faIndustry
          case 'support':
          return faCake;
          case 'logout':
          return faRightFromBracket;
    default:
      return null;
  }
};

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export default Sidebar;
