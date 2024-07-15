import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "./ui/button";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";

const Sidebar = ({ isOpen, closeSidebar }) => {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    closeSidebar();
  };

  return (
    <aside
      className={`sidebar fixed top-0 left-0 h-full bg-white shadow-lg ${
        isOpen ? "w-64" : "w-0"
      } overflow-x-hidden transition-all duration-300 ease-in-out z-50`}
    >
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Menu</h2>
        <ul>
          {user ? (
            <>
              <li className="mb-4">
                <NavLink
                  to="/dashboard"
                  className="text-gray-700 hover:text-gray-900"
                  onClick={closeSidebar}
                >
                  Go to Dashboard
                </NavLink>
              </li>
              <li>
                <Button variant="ghost" onClick={handleLogout}>
                  Logout
                </Button>
              </li>
            </>
          ) : (
            <>
              <li className="mb-4">
                <NavLink
                  to="/login"
                  className="text-gray-700 hover:text-gray-900"
                  onClick={closeSidebar}
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/register"
                  className="text-gray-700 hover:text-gray-900"
                  onClick={closeSidebar}
                >
                  Register
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
