import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import CartLink from './CartLink';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import Greeting from './Greeting';



function SidebarNavbar({ fetchProductsByCategory }) {
  const { isAuthenticated, logout } = useAuth();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [fetchedCategories, setFetchedCategories] = useState([]);

  useEffect(() => {
    if (!fetchedCategories.length) {
      
      fetch('https://fakestoreapi.com/products/categories')
        .then((response) => response.json())
        .then((data) => {
          setFetchedCategories(['All', ...data]); 
        })
        .catch((error) => console.error('Error fetching categories:', error));
    }
  }, [fetchedCategories]);

  const localToggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  const handleCategoryClick = (category) => {

    fetchProductsByCategory(category);
  };

  return (
    <div className="sidebar-navbar-container">
   
      {isSidebarOpen && (
        <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
      
          <ul>
            {fetchedCategories.map((category) => (
              <li key={category} onClick={() => handleCategoryClick(category)}>
                {category}
              </li>
            ))}
          </ul>
          <div className="sidebar-bottom">
            <ul>
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
              <li>
          {isAuthenticated() ? (
            <button onClick={logout}>Sign Out</button>
          ) : (
            <Link to="/login">Sign In</Link>
          )}
        </li>
              <li>
                <Greeting/>
              </li>
            </ul>
          </div>
        </div>
      )}

      <div className="navbar">
        <button onClick={localToggleSidebar} className="toggle-button">
          ☰
        </button>
        <h1>Home Shopping Network</h1>
       <div> 
          <Link to="/">
            <FontAwesomeIcon icon={faHome} /> Home
          </Link>
      </div>
      <div>
          <CartLink isAuthenticated={isAuthenticated} />
      </div>
        
     
      </div>
    </div>
  )};


export default SidebarNavbar;
