import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

// AuthProvider component to wrap around the part of the app that needs authentication
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // useEffect to check if user is logged in on initial render and page refresh
  // para di lagi log in after marefresh
  useEffect(() => {
    const checkLoggedInUser = async () => {
      const token = Cookies.get("token");
      if (token) {
        try {
          const response = await axios.get("/api/v1/users/getMe", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data);
        } catch (error) {
          Cookies.remove("token");
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    };

    checkLoggedInUser();
  }, []); // Empty dependency arr run only once

  // Function to log in the user
  const login = async (username, password) => {
    setLoading(true); // Set loading to true when login process starts
    setError(null); // Reset error state

    try {
      const response = await axios.post("/api/v1/users/login", {
        username,
        password,
      });

      // Store token in a cookie for 1 day
      Cookies.set("token", response.data.user.token, { expires: 1 });
      setUser(response.data.user);
    } catch (error) {
      console.error("Login failed:", error);
      setError(error.response.data.message);
      setUser(null);
    }
    setLoading(false);
  };

  // Function to log out the user
  const logout = () => {
    Cookies.remove("token"); // Remove the token from cookies
    setUser(null); // Clear the user state
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, error }}>
      {/* Render children components */}
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
