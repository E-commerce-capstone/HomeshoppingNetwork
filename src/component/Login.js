import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../useAuth';
import axios from 'axios';
import '../App.css'

const Login = () => {
  const { isAuthenticated, login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('useEffect triggered');
    if (isAuthenticated()) {

      console.log('User is already authenticated');
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Login form submitted');

    try {
      console.log('Before API call');
      const response = await axios.post('https://fakestoreapi.com/auth/login', {
        username: username,
        password: password,
      });

      if (response && response.data.token) {
    
        console.log('Login successful. Token:', response.data.token);
        localStorage.setItem('token', response.data.token);
        login(username, password);
        setUsername('');
        setPassword('');
        navigate('/'); 
      } else {
        setLoginError('Invalid username or password');
      }
    } catch (error) {
      console.error('Login error:', error);

      if (error.response) {
        setLoginError(`Server error: ${error.response.status}`);
      } else if (error.request) {
        setLoginError('Network error');
      } else {
        setLoginError('An error occurred during login');
      }
    }
  };

  return (
    <div className="login">
      <h2 className="login-header">Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Username:</label><br/>
        <input
          type="text"
          name="loginUsername"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
<br/>
<br/>
        <label>Password:</label><br/>
        <input
          type="password"
          name="loginPassword"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
<br/>
<br/>
        <button type="submit">Login</button>
      </form>
      {loginError && <p>{loginError}</p>}
    </div>
  );
};

export default Login;
