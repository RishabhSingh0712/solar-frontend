import React, { Suspense, lazy,useEffect,useState } from "react";
import { BrowserRouter as Router, Route, Routes,useLocation } from 'react-router-dom';
import { useSidebarToggle } from '../context/SidebarToggle/SidebarToggleContext';
import { DropdownProvider } from "../context/DropDownContext/DropdownContext";
import { UserPlantProvider } from "../context/UserPlantContext/UserPlantContext";
import { UserProvider } from "../context/AllUserContext/AllUserContext";
import { NotificationProvider } from "../context/NotificationContext";
import { SendNotificationProvider } from '../context/SendNotificationContext/SendNotificationContext';
import { InvertersDataProvider } from "../context/InvertersDataContext/InvertersDataContext";
import { useActiveTab } from "../context/ActiveTab/ActiveTab";


// Lazily load components
const Sidebar = lazy(() => import("../components/Sidebar"));
const Dashboard = lazy(() => import('../components/Dashboard'));
const Settings = lazy(() => import('../components/Settings'));
const Profile = lazy(() => import('../components/Profile'));
const UserDashBoard = lazy(() => import("../components/UserDashboard"));
const Sendnotification = lazy(() => import("../components/Notifications"));
const UserNotification = lazy(() => import("../components/UserNotification"));
const Tables = lazy(() => import("../components/Table"));
const Loader = lazy(() => import("../components/Loader"));
const AuthContainer = lazy(() => import("../components/AuthContainer"));
const ForGotPassword = lazy(() => import("../components/ForgotPassword"));
const Inverters = lazy(()=> import('../components/Inverters'));

export const MainLayout = () => {
  const { isSidebarOpen } = useSidebarToggle();
  const location = useLocation();

const {setActiveTab} = useActiveTab();
  const isLogedIn = sessionStorage.getItem('logedIn'); // Check login status
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    // Update the active tab when the route changes
    const path = location.pathname;
    if (path === '/dashboard') {
      setActiveTab('dashboard');
    } else if (path === '/users') {
      setActiveTab('users');
    } else if (path === '/settings') {
      setActiveTab('settings');
    } else if (path === '/profile') {
      setActiveTab('profile');
    } else if (path === '/sendnotification') {
      setActiveTab('sendnotification');
    } else if (path === '/notifications') {
      setActiveTab('notifications');
    } else if (path === '/inverters') {
      setActiveTab('inverters');
    } else if (path === '/forgotPassword') {
      setActiveTab('forgotPassword');
    } else if(path==='/userDashboard'){
      setActiveTab('userDashboard');
    }
    else {
      setActiveTab('/'); // Set a default tab if none of the routes match
    }
  }, [location, setActiveTab]); // Run this effect when the location changes

    
  const isLoading = typeof loading === 'boolean' ? loading : false;
  if (!isLogedIn ) {
    return <AuthContainer />;
  }

  return (
    <div className="flex h-screen">
    
      <DropdownProvider>
        {/* Lazy load Sidebar if not open */}
        {/* <Suspense fallback={<Loader />}> */}
          {!isSidebarOpen && <Sidebar />}
        {/* </Suspense> */}

        <div className="w-full overflow-y-auto">
          {/* Wrap Routes with Suspense for lazy-loaded components */}
          <Suspense fallback={<Loader open={isLoading} />}>
            <Routes>
              <Route
                path="/dashboard"
                element={
                  <UserPlantProvider>
                    <Dashboard />
                  </UserPlantProvider>
                }
              />
              <Route
                path="/users"
                element={
                  <UserPlantProvider>
                    <Tables showMobNavBar={true} />
                  </UserPlantProvider>
                }
              />
              <Route path="/settings" element={<Settings />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/userDashboard" element={<UserDashBoard />} />
             
              <Route
                path="/sendnotification"
                element={
                  <UserProvider>
                    <SendNotificationProvider>
                      <Sendnotification />
                    </SendNotificationProvider>
                  </UserProvider>
                }
              />
              <Route
                path="notifications"
                element={
                  <NotificationProvider>
                    <UserNotification />
                  </NotificationProvider>
                }
              />
              <Route path="support" element={<UserDashBoard />} />
              <Route path="/" element={<AuthContainer />} /> {/* Default route */}
              <Route path="/forgotPassword" element ={<ForGotPassword />}/>
              <Route path = "/inverters" element={
                <InvertersDataProvider>
                   <Inverters/>
                </InvertersDataProvider>
               }/>
            </Routes>
            
          </Suspense>
        </div>
       
      </DropdownProvider>
    </div>
  );
};
