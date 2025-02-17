import React from "react";
import MobNavBar from "./MobileNavBar";
import { motion } from 'framer-motion';
import { useAuth } from "../context/AuthContext/AuthContext";
const Profile = () => {
const {user} = useAuth();
console.log('user :',user);
    const itemVariant = {
        hidden: { opacity: 0, y: -20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { type: 'spring', stiffness: 100 },
        },
      };
    return (
        <motion.div
            // Apply top-bottom animation
            initial={{ x: -100, opacity: 0 }}  // Start position: above the viewport
            animate={{ x: 0, opacity: 1 }}     // End position: in the normal position
            exit={{ x: -100, opacity: 0 }}      // Exit position: back above the viewport
            transition={{ duration: 0.6 }}      // Adjust the duration of the animation
            className="min-w-full bg-gray-100"
        >
            {/* Use MobileNavbar component */}
            <MobNavBar/>    
            

            <motion.div 
                className="w-full xl:w-[65%] bg-white p-8 mx-auto">
                <h1 className="text-xl font-semibold items-center mt-6">Profile</h1>
                <motion.div className="h-px mt-2 sm:mt-4 bg-gray-700 sm:mb-2"></motion.div>

                <motion.div className="flex flex-col sm:flex-row justify-between mt-12">
                    <motion.div className="flex flex-col justify-center gap-2 sm:w-[45%]">
                        <h2 className="text-lg font-semibold">Your Name</h2>
                        <span className="text-sm">This will be displayed on your profile</span>
                    </motion.div>
                    <input type="text" className="text-input"  value={`${user?.first_name || ''} ${user?.last_name || ''}`.trim()} onChange={(e) => console.log(e.target.value)} />
                </motion.div>

                <motion.div className='h-px mt-12 bg-gray-700 sm:mb-2'></motion.div>
                
                {/* Organization Name */}
                <motion.div className="flex flex-col sm:flex-row justify-between mt-12">
                    <motion.div className="flex flex-col justify-center gap-2 sm:w-[45%]">
                        <h2 className="text-lg font-semibold">Organization Name</h2>
                        <span className="text-sm">This will be displayed on your public profile</span>
                    </motion.div>
                    <input type="text" className="text-input"/>
                </motion.div>

                <motion.div className='h-px mt-12 bg-gray-700 sm:mb-2'></motion.div>
                
                {/* Organization Bio */}
                <motion.div className="flex flex-col sm:flex-row justify-between mt-12">
                    <motion.div className="flex flex-col justify-center gap-2 sm:w-[45%]">
                        <h2 className="text-lg font-semibold">Organization Bio</h2>
                        <span className="text-sm">This will be displayed on your public profile. Maximum 240 characters.</span>
                    </motion.div>
                    <input type="text" className="text-input"/>
                </motion.div>

                <motion.div className='h-px mt-12 bg-gray-700 sm:mb-2'></motion.div>
                
                {/* Organization Email */}
                <motion.div className="flex flex-col sm:flex-row justify-between mt-12">
                    <motion.div className="flex flex-col justify-center gap-2 sm:w-[45%]">
                        <h2 className="text-lg font-semibold">Organization Email</h2>
                        <span className="text-sm">This is how customers can email you for support.</span>
                    </motion.div>
                    <input type="text" className="text-input" value={user?.email} onChange={(e) => console.log(e.target.value)} />
                </motion.div>

                <motion.div className='h-px mt-12 bg-gray-700 sm:mb-2'></motion.div>
                
                {/* Contact Number */}
                <motion.div className="flex flex-col sm:flex-row justify-between mt-12">
                    <motion.div className="flex flex-col justify-center gap-2 sm:w-[45%]">
                        <h2 className="text-lg font-semibold">Contact Number</h2>
                        <span className="text-sm">This is how customers can contact you for support.</span>
                    </motion.div>
                    <input type="text" className="mb-2 mt-2 px-4 py-2 sm:py-0 rounded-lg focus:outline-blue-500 sm:w-1/2 border-cyan-50 bg-gray-100" value={`${user?.mobile}`} onChange={(e) => console.log(e.target.value)}/>
                </motion.div>

                <motion.div className='h-px mt-12 bg-gray-700 sm:mb-2'></motion.div>
                
                {/* Save/Reset Buttons */}
                <motion.div className="flex justify-end mt-12 gap-4">
                    <button className="bg-white text-black text-sm font-semibold py-2 px-4 rounded-md hover:bg-gray-200 transition duration-300">Reset</button>
                    <button className="bg-blue-500 text-white text-sm font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300">Save Changes</button>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}

export default Profile;
