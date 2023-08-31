import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import './SignUp.css';

function SignUp() {
    const [newUser, setNewUser] = useState({
        email: '',
        username: '',
        password: '',
        name: {
          firstname: '',
          lastname: ''
        },
        address: {
          city: '',
          street: '',
          number: '',
          zipcode: '',
          geolocation: {
            lat: '',
            long: ''
          }
        },
        phone: ''
      });
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser((prevUser) => ({
          ...prevUser,
          [name]: value
        }));
      };
    
      const createUser = () => {
        fetch('https://fakestoreapi.com/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newUser)
        })
          .then((res) => res.json())
          .then((json) => console.log(json))
          .catch((error) => console.error('Error creating user:', error));
      };
      
        return (
          <div>
            <div className="navigation">
          <Link to="/">Home</Link>
          <Link to="/cart">Cart</Link>
        </div>
            <div className="user-form">
              <h2>Create New User</h2>
                
      <div className='user'>
              <label>Username:</label>
              <input
                type="text"
                name="username"
                value={newUser.username}
                onChange={handleInputChange}
              />
      
              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={newUser.password}
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
    <div clasName='address'>
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
      </div>
              <button onClick={createUser}>Create User</button>
            </div>
          </div>
        );
      }
      
      export default SignUp;
      