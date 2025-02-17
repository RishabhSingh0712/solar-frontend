import React from 'react';

const SocialLoginButton = ({ type, label }) => {
  const icons = {
    google: '🔍',  // Replace with a real icon or FontAwesome icon
    facebook: '📘',
    twitter: '🐦',
  };

  return (
    <button className="flex items-center justify-center w-full bg-gray-100 text-gray-700 font-semibold py-2 rounded-lg hover:bg-gray-200 transition duration-300">
      {icons[type]} <span className="ml-2">{label}</span>
    </button>
  );
};

export default SocialLoginButton;
