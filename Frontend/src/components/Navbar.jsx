import React from "react";
import { ModeToggle } from "./theme/mode-toggle";
import { Button } from "./ui/button";
import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";

const Navbar = () => {
  // Access user and logout function from context
  const { user, logout } = useContext(AuthContext);

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
            <NavLink to="/">
              <Button variant="ghost" onClick={logout}>
                Logout
              </Button>
            </NavLink>
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
