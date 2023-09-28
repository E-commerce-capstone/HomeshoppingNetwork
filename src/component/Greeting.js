import React from 'react';
import { useAuth } from '../AuthContext'; 

function Greeting() {
  const { isAuthenticated, userFirstName } = useAuth(); 

  return (
    <div>
      {isAuthenticated() ? (
        <p>Hello, {userFirstName}!</p>
      ) : (
        <p>Hello, Guest!</p>
      )}
    </div>
  );
}

export default Greeting;
