import React, { createContext, useState, useContext, useEffect } from 'react';

// Create Auth Context
const AuthContext = createContext();

// Custom hook to use Auth Context
export const useAuth = () => useContext(AuthContext);

// Auth Provider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status on mount
  useEffect(() => {
    const username = localStorage.getItem('username');
    const role = localStorage.getItem('role');
    if (username && role) {
      setIsAuthenticated(true);
    }
  }, []);

  // Function to log in
  const login = (username, role) => {
    localStorage.setItem('username', username);
    localStorage.setItem('role', role);
    setIsAuthenticated(true);
  };

  // Function to log out
  const logout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    setIsAuthenticated(false);
  };

  // Provider value
  const value = {
    isAuthenticated,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
