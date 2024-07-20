import React from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";
import { ClipLoader } from "react-spinners";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
