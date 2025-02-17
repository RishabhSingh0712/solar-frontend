import React from 'react';
import FormInput from './FormInput';
import { Link } from 'react-router-dom';
import { signUpUser } from '../context/SignupContext/SignupContext';
import { faEnvelope, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { usePasswordVisibility } from '../context/PasswordVisibilityContext/PasswordVisibilityContext';
const Signup = () => {
  const { isPasswordVisible, togglePasswordVisibility } = usePasswordVisibility();
  const {
    firstName,
    setfirstName,
    lastName,
    setlastName,
    regEmail,
    setEmail,
    regPassword,
    setPassword,
    mobile,
    setPhone,
    role,
    setRole,
    signup,
    loading,
    error,
  } = signUpUser();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    console.log('Form Submitted'); // Debugging form submission
    await signup(); // Call signup function
  };


  return (
    <div className="flex flex-col items-center bg-transparent md:w-full w-full justify-center min-h-screen">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Create Account</h2>
      <p className="text-sm text-gray-600 mb-4">Welcome! Please register your account.</p>
      <form className="w-full max-w-sm px-4" onSubmit={(e) => {
    e.preventDefault(); // Prevent page reload
    signup(); // Call the signup function
  }}  autoComplete="off">
    <div className='flex flex-row items-center justify-center gap-2'>
    <FormInput
          type="text"
          label="First Name"
          placeholder="First name"
          value={firstName}
          onChange={(e) => setfirstName(e.target.value)}
        />
        <FormInput
          type="text"
          label="Last Name"
          placeholder="Last name"
          value={lastName}
          onChange={(e) => setlastName(e.target.value)}
        />
    </div>
     
        <FormInput
          type="email"
          label="Email"
          placeholder="Email"
          value={regEmail}
          onChange={(e) => setEmail(e.target.value)}
        
        />
        <FormInput
          type="text"
          label="Mobile Number"
          placeholder="Enter your mobile number"
          value={mobile}
          onChange={(e) => setPhone(e.target.value)}
        />
        <FormInput
           type={isPasswordVisible ? 'text' : 'password'}
          label="Password"
          placeholder="Password"
          value={regPassword}
          onChange={(e) => setPassword(e.target.value)}
          icon={isPasswordVisible ? faEye : faEyeSlash}
          onIconClick={togglePasswordVisibility}
        />
        <FormInput
          type="text"
          label="Role"
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />

        <button
          type="submit"
          // onClick={signup}
          className="w-full bg-blue-600 text-white text-sm font-semibold py-2 mt-4 rounded-lg hover:bg-blue-700 transition duration-300"
          disabled={loading} // Disable the button while loading
        >
          Sign Up
        </button>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>} {/* Display errors */}
      </form>
      <p className="text-sm md:text-gray-100 text-gray-600 mt-6 md:font-semibold">
        Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
      </p>
    </div>
  );
};

export default Signup;
