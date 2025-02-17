// Sendnotification.js
import React, { useState, useEffect } from 'react';
import MobileNavbar from './MobileNavBar'; // Ensure this is implemented correctly
import DropdownButton from './DropdownButton';
import EditorBox from './JoditEditor';
import { useUsers } from '../context/AllUserContext/AllUserContext'; // Import the custom hook
import { useSendNotification } from '../context/SendNotificationContext/SendNotificationContext';
import Loader from './Loader';
import { Await } from 'react-router-dom';
const Sendnotification = ({ isSidebarOpen, toggleSidebar }) => {
  const { users } = useUsers(); // Fetch users from the context
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dropdownValue, setDropdownValue] = useState('');
    const categoryItems = [
        'Option-1',
        'Option-2',
        'Option-3',
        'Option-4',
        'Option-5',
        'Option-6',
        'Option-7',
        'Option-8',
    ];

    const [selectedUsers, setSelectedUsers] = useState([]);
   
  
    const {
        title,
        setTitle,
        setMessage,
        customerIds,
        setCustomerIds,
        sendNotification,
        loading: sending,
        error: sendError,
      } = useSendNotification(); // Access context states and methods

    const handleUserSelect = (userEmail) => {
    const selectedUser=    users.find((user) => user.email === userEmail);
    if (selectedUser && !selectedUsers.includes(userEmail)) {
        // Derive the updated states
        const updatedSelectedUsers = [...selectedUsers, userEmail];
        const updatedSelectedUserIds = [...customerIds, selectedUser._id];
        
        // Update the states
        setSelectedUsers(updatedSelectedUsers);
        setCustomerIds(updatedSelectedUserIds);
        
        // Log the updated states
        console.log('Selected User Emails:', updatedSelectedUsers);
        console.log('Selected User IDs:', updatedSelectedUserIds);
    } else {
        console.log('No user selected or user already selected.');
    }
       
      
       
    };

    const handleUserRemove = (userEmail) => {
      
        const selectedUser = users.find((user) => user.email === userEmail);
        if (selectedUser) {
          // Remove the selected user email and ID from the arrays
          const updatedSelectedUsers = selectedUsers.filter((userEmail) => userEmail !== selectedUser.email);
          const updatedSelectedUserIds = customerIds.filter((userId) => userId !== selectedUser._id);
          
          // Update the states
          setSelectedUsers(updatedSelectedUsers);
          setCustomerIds(updatedSelectedUserIds);
          
          // Log the updated states
          console.log('Selected User Emails:', updatedSelectedUsers);
          console.log('Selected User IDs:', updatedSelectedUserIds);
        } else {
          console.log('No user selected or user already selected.');
        }
    };
    const handleSendNotification = async () => {
        try {
          await sendNotification(); // Sends the notification
          setTitle('');
          setMessage('');
          setCustomerIds((prev) => {
            console.log('Previous customerIds:', prev);
            return [];
          });
          
          setSelectedUsers((prev) => {
            console.log('Previous selectedUsers:', prev);
            return [];
          });
         
          
          
      
      
          // Clear editor content
          const editorElement = document.querySelector('.jodit-wysiwyg');
          if (editorElement) {
            editorElement.innerHTML = ''; // Clear the content inside the editor
          }
      
          // Reset dropdown
          document.querySelectorAll('.dropdown-button').forEach((dropdown) => {
            dropdown.value = ''; // Clear dropdown value
          });
        } catch (error) {
          console.error('Error sending notification:', error);
        }
      };



    useEffect(() => {
      console.log('selectedUsers updated:', selectedUsers);
      setIsSubmitting(false);
  }, [selectedUsers]);

    return (
        <div className='max-w-full h-screen flex flex-col'>
            <MobileNavbar
                isSidebarOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}    
            />

            <div className='h-screen min-w-full bg-white py-8 px-4'>
                <h1 className='text-xl font-bold items-center'>Notifications</h1>
                <div className='h-px w-full bg-gray-300 mt-[18px]'></div>
                <p className='text-xl font-semibold mt-[50px]'>Select Category</p>
                <div className="flex flex-col md:flex-row  gap-4 mt-4">
                    <DropdownButton
                        label="Select Category"
                        items={categoryItems}
                        onSelect={handleUserSelect} // Pass handler to dropdown
                    />
                    <DropdownButton
                        label="Select Users"
                        items={users.map((user) => user.email)} // Map users to email addresses
                        value={dropdownValue}
                        onSelect={handleUserSelect}
                    />
                </div>

                {/* Selected Users */}
                <div className='text-xl font-semibold mt-[50px]'>
                    Selected Users <span>{selectedUsers.length}</span>
                </div>
                <div className='h-px w-full bg-gray-300 mt-[30px]'></div>
                <div className='flex gap-4 mt-12 flex-wrap'>
                    {selectedUsers.map((userEmail) => (
                        <div key={userEmail} className='flex items-center bg-blue-700 rounded-full px-4 py-1 gap-2 justify-center'>
                            <span className='text-xs text-white font-semibold'>{userEmail}</span>
                            <button
                                onClick={() => handleUserRemove(userEmail)}
                                className=' text-red-500 hover:text-red-700 font-bold'
                            >
                                X
                            </button>
                        </div>
                    ))}
                </div>
                <div>
        {/* Title Input */}
        <div className='mt-8'>
          <label className='block text-lg font-medium mb-2'>Notification Title</label>
          <input
            type='text'
            className='w-full px-3 py-2 border border-gray-300 rounded-md'
            placeholder='Enter notification title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
       <EditorBox placeholder="Enter your text here" />

         {/* Send Notification */}
         <div className='mt-8'>
          <button
            onClick={handleSendNotification}
            disabled={sending}
            className='px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:bg-gray-400'
          >
            {sending ? 'Sending...' : 'Send Notification'}
          </button>
          {sendError && <div className='text-red-500 mt-2'>{sendError}</div>}
        </div>
      </div>
            </div>
        </div>
    );
}

export default Sendnotification;
