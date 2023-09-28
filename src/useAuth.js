// useAuth.js

import { useContext } from 'react';
import AuthContext from './AuthContext';

function useAuth() {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  const isAuthenticated = () => !!authContext.user;

  return { ...authContext, isAuthenticated };
}

export default useAuth;
