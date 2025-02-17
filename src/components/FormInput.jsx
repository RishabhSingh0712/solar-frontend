import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const FormInput = ({ type, label, placeholder, value, onChange, icon, onIconClick }) => {
  return (
    <div className="mb-4 flex flex-col relative">
      {label && (
        <label className="block text-sm font-medium text-gray-700">{label}</label>
      )}
      <div className="relative">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full px-2 sm:px-4 py-2 text-sm pr-4 border rounded-md border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {icon && (
          <button
            type="button"
            onClick={onIconClick}
            className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            <FontAwesomeIcon icon={icon} />
          </button>
        )}
      </div>
    </div>
  );
};

export default FormInput;
