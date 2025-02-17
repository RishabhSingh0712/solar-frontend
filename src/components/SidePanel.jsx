import React from 'react';
import bgImage from '../asset/images/solar-wind-2.jpg';

const SidePanel = () => {
  return (
    <div
      className="hidden md:flex md:h-screen md:w-full text-white  relative"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
 
    </div>
  );
};

export default SidePanel;
