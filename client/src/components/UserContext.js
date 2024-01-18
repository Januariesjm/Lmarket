// UserContext.js

import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const login = (user) => {
    setCurrentUser(user);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const getCurrentUserId = () => {
    // Return the user ID if the user is logged in, or null if not logged in
    return currentUser ? currentUser.id : null;
  };

  return (
    <UserContext.Provider value={{ currentUser, login, logout, getCurrentUserId }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
