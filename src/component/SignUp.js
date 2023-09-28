import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import './SignUp.css';
import axios from 'axios';

function SignUp() {
  const { login } = useAuth();
  const {signInSuccess, setSignInSuccess} = useState (false)
  const [signupError, setSignupError] = useState(null);
  const [newUser, setNewUser] = useState({
    loginUsername: '',
    loginPassword: '',
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    phoneNumber: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const createUser = async (userData) => {
    try {
      const response = await axios.post('https://fakestoreapi.com/users', userData);
      console.log('User registration successful:', response.data);
      setSignInSuccess(true);

    } catch (error) {
      console.error('User registration error:', error);
      setSignupError('Registration failed. Please try again.'); 
    }
  };

  const handleCreateUser = () => {
    createUser(newUser); 
    setNewUser({
      loginUsername: '',
      loginPassword: '',
      firstName: '',
      lastName: '',
      email: '',
      street: '',
      city: '',
      state: '',
      zipCode: '',
      phoneNumber: '',
    });
  };

  return (




      
          <div className="user-form">
            <h2>Create New User</h2>
            <div className="user">
              <label>Username:</label>
              <input
                type="text"
                name="loginUsername"
                value={newUser.loginUsername}
                onChange={handleInputChange}
              />
              <label>Password:</label>
              <input
                type="password"
                name="loginPassword"
                value={newUser.loginPassword}
                onChange={handleInputChange}
              />
            </div>
      
            <div className="name-email-group">
              <label>First Name:</label>
              <input type="text" name="firstName" value={newUser.firstName} onChange={handleInputChange} />
      
              <label>Last Name:</label>
              <input type="text" name="lastName" value={newUser.lastName} onChange={handleInputChange} />
      
              <label>Email:</label>
              <input type="text" name="email" value={newUser.email} onChange={handleInputChange} />
            </div>
      
            <h4>Address</h4>
            <div className="address">
              <label>Street:</label>
              <input type="text" name="street" value={newUser.street} onChange={handleInputChange} />
      
              <label>City:</label>
              <input type="text" name="city" value={newUser.city} onChange={handleInputChange} />
      
              <label>State:</label>
              <input type="text" name="state" value={newUser.state} onChange={handleInputChange} />
      
              <label>Zip Code:</label>
              <input type="text" name="zipCode" value={newUser.zipCode} onChange={handleInputChange} />
      
              <label>Phone Number:</label>
              <input
                type="text"
                name="phoneNumber"
                value={newUser.phoneNumber}
                onChange={handleInputChange}
              />
    
            
        <button onClick={handleCreateUser}>Create User</button>
        {signupError && <p>{signupError}</p>} 
        {signInSuccess && <div className="success-message">Sign-in Successful!</div>}
      </div>
    </div>
  );
}
export default SignUp; 