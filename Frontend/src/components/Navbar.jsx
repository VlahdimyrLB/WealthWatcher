import React, { useEffect } from "react";
import { ModeToggle } from "./theme/mode-toggle";
import { Button } from "./ui/button";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "@/contexts/AuthContext";

import UserMenu from "./UserMenu";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Navbar = ({ isHome, setIsHome }) => {
  const { user, logout, loading } = useContext(AuthContext);

  let location = useLocation();

  const [showLogoutPopover, setShowLogoutPopover] = useState(false);

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

  const handleLogout = () => {
    setShowLogoutPopover(true);
  };

  const confirmLogout = () => {
    logout();
    setShowLogoutPopover(false);
  };

  return (
    <nav>
      <div className="flex items-center justify-between">
        <div className="flex items-center md:justify-between">
          <Link
            to="/"
            className="flex lg:place-items-center justify-center gap-2 lg:p-6 p-4 lg:mr-4 lg:text-3xl text-2xl font-extrabold"
          >
            WealthWatcher
          </Link>

          {user && !isHome ? (
            <div className="text-lg font-semibold ">
              <UserMenu />
            </div>
          ) : null}
        </div>

        <div className="flex items-center justify-between gap-2 lg:p-6 p-4 space-x-3">
          {user && !isHome ? (
            <p className="text-md font-medium">
              Hi! <b>{user.name}</b>
            </p>
          ) : null}

          {/* Dark/Light mode toggle */}
          <ModeToggle />

          {user ? (
            <div className="flex space-x-3 items-center justify-between ">
              {isHome ? (
                <NavLink to="/dashboard">
                  <Button variant="secondary">Go to Dashboard</Button>
                </NavLink>
              ) : null}

              <Popover className="lg:block hidden">
                <PopoverTrigger
                  onClick={handleLogout}
                  className="text-md font-medium hover:text-slate-400"
                >
                  Logout
                </PopoverTrigger>
                <PopoverContent className="w-38 flex items-center justify-between py-2 mt-2">
                  <p>Confirm logout?</p>
                  <div className="flex">
                    <Button
                      variant="ghost"
                      onClick={confirmLogout}
                      className="text-red-500"
                    >
                      Yes
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          ) : (
            <>
              {!loading && (
                <>
                  <div className="hidden lg:block">
                    <NavLink to="/login">
                      <Button variant="ghost">Login</Button>
                    </NavLink>
                    <NavLink to="/register">
                      <Button variant="ghost">Register</Button>
                    </NavLink>
                  </div>

                  <Button>A</Button>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
