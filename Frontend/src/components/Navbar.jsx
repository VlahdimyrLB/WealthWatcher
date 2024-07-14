import React, { useEffect } from "react";
import { ModeToggle } from "./theme/mode-toggle";
import { Button } from "./ui/button";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";

const Navbar = ({ isHome, setIsHome }) => {
  const { user, logout } = useContext(AuthContext);
  let location = useLocation();

  useEffect(() => {
    if (
      location.pathname === "/" ||
      (location.pathname === "/login" && !isHome)
    ) {
      setIsHome(true);
    } else {
      setIsHome(false);
    }
  }, [location.pathname]);

  return (
    <nav>
      <ul className="flex items-center justify-between">
        <li>
          <Link
            to="/"
            className="flex place-items-center gap-2 p-4 text-3xl font-extrabold"
          >
            WealthWatcher
          </Link>
        </li>
        <li className="flex items-center justify-between gap-2 p-8 text-3xl">
          {/* Dark/Light mode toggle */}
          <ModeToggle />

          {user ? (
            <div className="flex space-x-2 items-center justify-between">
              {isHome ? (
                <NavLink to="/dashboard">
                  <Button variant="ghost">Go to Dashboard</Button>
                </NavLink>
              ) : null}

              <Button variant="ghost" onClick={logout}>
                Logout
              </Button>
            </div>
          ) : (
            <>
              <NavLink to="/login">
                <Button variant="ghost">Login</Button>
              </NavLink>
              <NavLink to="/register">
                <Button variant="ghost">Register</Button>
              </NavLink>
            </>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
