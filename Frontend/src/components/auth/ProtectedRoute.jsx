import React from "react";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "@/contexts/AuthContext";

// ProtectedRoute component to protect routes from unauthenticated users
const ProtectedRoute = ({ children }) => {
  // Access the user from context
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" replace />; // Redirect to login if user is not authenticated
  }

  // Render children components if user is authenticated
  return children;
};

export default ProtectedRoute;
