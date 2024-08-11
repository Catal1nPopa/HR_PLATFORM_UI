// AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const isTokenValid = checkTokenValidity(token);
      if (isTokenValid) {
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem("token");
      }
    }
    setIsAuthChecked(true);
  }, []);

  const checkTokenValidity = (token) => {
    try {
      const tokenData = JSON.parse(atob(token.split(".")[1]));
      const expirationDate = tokenData.exp * 1000;
      return Date.now() < expirationDate;
    } catch (e) {
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, isAuthChecked }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
