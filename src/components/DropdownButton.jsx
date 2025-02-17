import { div } from 'framer-motion/client';
import React ,{useState,useRef,useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { } from '@fortawesome/free-brands-svg-icons';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
const DropdownButton = ({label,items,onSelect}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(label);
    const dropdownRef = useRef(null);

    const toggleDropdown=()=>{
        setIsOpen(!isOpen);setSelectedItem('Select Users');
    }
    const handleClickOutside = (event) => {
        event.stopPropagation();
        if (dropdownRef.current && dropdownRef.current.contains(event.target)) {
          console.log('Inside Click');
        } else {
          console.log('Outside Click');
          setIsOpen(false); // Close the dropdown if clicked outside
        }
      };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
          document.removeEventListener('click', handleClickOutside);
        };
      }, [dropdownRef]);


      return (
        <div className="relative inset-0 px-4 flex justify-between items-center border bg-white border-gray-300  shadow-lg  w-full rounded-lg" onClick={toggleDropdown} ref={dropdownRef}>
           <p className='py-2  text-sm font-semibold'>{selectedItem}</p>
           <FontAwesomeIcon icon={faChevronDown} className='text-xs' />
       
      

      {isOpen && (
        <div className="absolute left-0 top-full  w-full bg-white  rounded-md shadow-lg transition-all duration-200 ease-in-out">
          <ul className="py-2 px-4 bg-white border shadow-lg max-h-48 overflow-y-auto ">
            {items.map((item, index) => (
              <li key={index} className={`px-4 py-2 mt-2 text-sm hover:bg-gray-200 cursor-pointer rounded-md ${index !== items.length - 1 ? 'border-b border-gray-300' : ''}`} onClick={() => {
                setSelectedItem(item);
                onSelect(item);
                setIsOpen(false)
                console.log(`${item} selected`);
              }}>
                {item}
              </li>
             
             
            )
            )}
            
          </ul>
        </div>
      )}
        </div>
      );
    }
export default DropdownButton;