import React, { useState, useEffect,useRef } from 'react';
import MobileNavbar from "./MobileNavBar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { userNotification } from '../context/NotificationContext';
import { useLoading } from '../context/LoadingContext/LoadingContext';
import Loader from './Loader';
const UserNotification = () => {
  const { notifications, page, totalPages, handleNextPage, handleFilterBtnClick, handleApplyFilter, showDateRange, setShowDateRange, dateRange, setDateRange} = userNotification();
  const datePickerRef = useRef();
  const {loading} = userNotification();
 console.log('Notifications:', notifications);
 console.log('Notifications.length`:', notifications.length);
  const handleClickOutside = (event) => {
    if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
      setShowDateRange(false); // Close the date range picker
      
    }
  };
   // Ensure loading state is handled properly
   const [isNotificationsFetched, setIsNotificationsFetched] = useState(false);

   useEffect(() => {
     if (!loading && notifications.length > 0) {
       setIsNotificationsFetched(true);
     }
   }, [loading, notifications.length]);

  useEffect(() => {
    if (showDateRange) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDateRange]);
  // Render Loader while notifications are loading
  if (loading || !isNotificationsFetched) {
    return null;
  }
  if(notifications.length === 0){
    return (
     <div >
  <MobileNavbar/>
  <div className="flex justify-center items-center py-8 text-gray-500 w-full">
       
    No notifications to show
  </div>
     </div>
      
    )
  }

  return (
    <div className='w-[100%]'>
      <MobileNavbar/>
     
      <div className=" mt-6">
        <div className='flex items-start justify-between px-4'>
        <h2 className="text-2xl font-semibold mb-4 ">Notifications</h2>
        <button className=" bg-blue-400 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-md text-xs" onClick={handleFilterBtnClick}>Filter</button>
        </div>  
        {/* Selection of Date Range*/}
        {showDateRange && (
          <div className="mb-4">
            <div ref={datePickerRef}
            className="absolute z-10 right-0 bg-white shadow-lg p-4 rounded-md flex flex-col ">
            <DateRangePicker
             scroll={{enabled: true}}
           
             ranges={dateRange}
        onChange={(ranges) => setDateRange([ranges.selection])}
             
            />
           <div className='flex justify-end items-center mb-2'><button
              onClick={handleApplyFilter}

              className="bg-green-500 hover:bg-green-600 text-white mt-4 py-1 px-4 rounded-md text-xs mr-2 mb-2"
            >
              Apply
            </button></div>
             
            </div>
          </div>
        )} 

<div className="bg-white shadow-md w-full">
    <ul className="w-full">
      {notifications.map((notification, index) => (
        <NotificationItem key={index} notification={notification} />
      ))}
    </ul>
  </div>


{/* Pagination */}
{notifications.length > 0 && (
  <div className="flex justify-center mt-4 gap-4 items-center">
    <button
      onClick={() => handleNextPage(page - 1)}
      disabled={page === 1}
      className={`text-xl text-gray-600 ${
        page === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:text-gray-800'
      }`}
    >
      <FontAwesomeIcon icon={faArrowLeft} />
    </button>
    
    <span className="text-xs font-semibold">
      Page {page} of {totalPages}
    </span>
    
    <button
      onClick={() => handleNextPage(page + 1)}
      disabled={page === totalPages}
      className={`text-xl text-gray-600 ${
        page === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:text-gray-800'
      }`}
    >
      <FontAwesomeIcon icon={faArrowRight} />
    </button>
  </div>
)}
      </div>
    </div>
  );
};

// Notification Item Component with Read More / Show Less
const NotificationItem = ({ notification }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => setIsExpanded(!isExpanded);
  const isMessageLong = notification.message.length > 100;

  return (
    <li className="border-b border-gray-200 py-4 w-full">
      <div className="flex flex-col lg:flex-row justify-between items-start w-full px-4">
        {/* Content Container */}
        <div className="flex flex-col justify-between items-start w-full lg:w-[85%]">
          <h3 className="font-medium text-md">{notification.title || 'Notification'}</h3>
          <p className="text-gray-600 text-xs lg:text-sm">
            {notification.message.length > 180 && !isExpanded
              ? `${notification.message.substring(0, 170)}...`
              : notification.message}
          </p>
          {/* Read More / Show Less Button */}
          {isMessageLong && (
            <button onClick={toggleReadMore} className="text-blue-500 text-xs mt-1">
              {isExpanded ? 'Show Less' : 'Read More'}
            </button>
          )}
        </div>

        {/* Date and Time */}
        <div className="mt-3 lg:mt-0 lg:w-[15%] text-right ">
          <p className="text-gray-400 text-xs">
            {new Date(notification.created_at).toLocaleString()}
          </p>
        </div>
      </div>
    </li>
  );
};


export default UserNotification;
