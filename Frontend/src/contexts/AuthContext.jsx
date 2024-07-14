import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

// Create a context for authentication
const AuthContext = createContext();

// AuthProvider component to wrap around the part of the app that needs authentication
const AuthProvider = ({ children }) => {
  // useState to hold the current user information
  const [user, setUser] = useState(null);

  // useEffect to check if user is logged in on initial render
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      axios
        .get("/api/v1/users/getMe", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setUser(response.data);
        })
        .catch(() => {
          Cookies.remove("token");
          setUser(null);
        });
    }
  }, []);

  // Function to log in the user
  const login = async (username, password) => {
    const response = await axios.post("/api/v1/users/login", {
      username,
      password,
    });

    // Store token in a cookie for 1 day
    Cookies.set("token", response.data.user.token, { expires: 1 });
    setUser(response.data.user);
  };

  // Function to log out the user
  const logout = () => {
    Cookies.remove("token"); // Remove the token from cookies
    setUser(null); // Clear the user state
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {/* Render children components */}
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
