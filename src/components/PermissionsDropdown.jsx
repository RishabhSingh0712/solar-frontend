import React, { forwardRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { } from '@fortawesome/free-brands-svg-icons';
import { faRemove, faAdd, faEdit} from '@fortawesome/free-solid-svg-icons';
const Dropdown = forwardRef(({ isOpen, onOptionSelect }, ref)=> {
    console.log(isOpen)
  return (
    isOpen && (
      <div ref={ref} className=" absolute left-1/4 sm:left-8 w-64 z=10 sm:z-20 right-0 mt-2  bg-gray-800 border border-gray-700 rounded-md shadow-lg">
        <ul className='m-4'>
          <li className="px-4 py-2 text-sm hover:bg-blue-500 cursor-pointer rounded-md" onClick={() => onOptionSelect('Add User')}><span className="mr-2"><FontAwesomeIcon icon={faAdd} /></span>Add User</li>
          <div className='h-px mt-2  bg-gray-700 sm:mb-2'></div>
          <li className="px-4 py-2 text-sm hover:bg-blue-500 cursor-pointer rounded-md" onClick={() => onOptionSelect('Update User')}><span className="mr-2"><FontAwesomeIcon icon={faEdit} /></span>Update User</li>
          <div className='h-px mt-2  bg-gray-700 sm:mb-2'></div>
          <li className="px-4 py-2 text-sm hover:bg-blue-500 cursor-pointer rounded-md" onClick={() => onOptionSelect('Delete User')}><span className="mr-2"><FontAwesomeIcon icon={faRemove} /></span>Delete User</li>
          <div className='h-px mt-2  bg-gray-700 sm:mb-2'></div>
        </ul>
      </div>
    )
  );
});

export default Dropdown;
