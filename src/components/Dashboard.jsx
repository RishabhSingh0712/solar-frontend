import React from 'react';
import MobNavBar from './MobileNavBar';
import Table from './Table';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTowerCell, faTowerObservation } from '@fortawesome/free-solid-svg-icons';
import { useUserPlant } from '../context/UserPlantContext/UserPlantContext';
import Loader from './Loader';
import { useAuth } from '../context/AuthContext/AuthContext';
const Dashboard = () => {
const {token,loading}=  useAuth();
  // const {loading} = useUserPlant();
  // Animation settings for the grid items
  const gridItemVariants = {
    hidden: { opacity: 0, x: -100 }, // Start off-screen to the left
    visible: { opacity: 1, x: 0 }, // Final state
  };

  // Animation settings for the Users component
  const usersVariants = {
    hidden: { opacity: 0, y: 100 }, // Start off-screen to the left
    visible: { opacity: 1, y: 0 }, // Final state
  };

  const gridItems = [
    { title: 'Total Sites', value: '100+', change: '+60.5%', changeColor: 'text-white', bgColor: '#17A2B8', icon: faTowerObservation, iconColor:'text-[#1592a6]'},
    { title: 'Active Sites', value: '45', change: '+12.5%', changeColor: 'text-white', bgColor: '#28a745', icon:  faTowerCell,iconColor:'text-[#228e3b]'},
    { title: 'Inactive Sites', value: '10', change: '-4.5%', changeColor: 'text-white', bgColor: '#Ffc107', icon: faTowerObservation,iconColor:'text-[#d9a406]' },
    { title: 'Pageviews', value: '823,067', change: '+21.2%', changeColor: 'text-white', bgColor: '#dc3545', icon: faEye ,iconColor:'text-[#bb2d3b]'},
];
// if(loading && !token){
//   return <Loader/>; 
// }
  return (
    <div className="max-w-full dark:bg-gray-900">
      {/* Use MobileNavbar component */}
      <MobNavBar/>

      {/* Main content */}
      <div className="p-8 max-w-full  overflow-hidden dark:bg-gray-900">
        <h2 className="text-2xl font-bold mb-6">Welcome, Admin</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
          {/* Animated Grid Items with staggered effect */}
          {gridItems.map((item, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow flex justify-between items-center"
              style={{ backgroundColor: item.bgColor }}
              variants={gridItemVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.5, delay: index * 0.3 }} // Stagger delay based on index
              whileInView="visible" // Animate when in view
              viewport={{ once: true }} // Only animate once when it comes into view
            >
              {/* Text Content */}
              <div className="flex flex-col">
                <h3 className="font-semibold text-white text-xl">{item.title}</h3>
                <p className="text-2xl font-bold mt-2 text-white">{item.value}</p>
                <span className={item.changeColor}>{item.change}</span>
              </div>

              {/* Icon */}
              <div className={`text-5xl transition-transform duration-200 ease-in-out transform hover:scale-110 ${item.iconColor}`}>
  <FontAwesomeIcon icon={item.icon} />
</div>

            </motion.div>
          ))}

        </div>

        {/* Animated Users Component */}
        <motion.div
          className='max-w-full mt-8'
          variants={usersVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.7, delay: 0.8 }} // Optional delay for Users
          whileInView="visible" // Animate when in view
          viewport={{ once: true}} // Trigger animation when 20% is visible // Only animate once when it comes into view
        >
          <div className='p-0'>
            <h1 className='text-2xl font-bold'>Recent Sites</h1>
          <Table/>
          </div>
        
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
