import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Auth/UseAuth";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, isAuthChecked } = useAuth();
  const location = useLocation();

  if (!isAuthChecked) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
