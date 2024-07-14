import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useState } from "react";

const MainLayout = () => {
  const [isHome, setIsHome] = useState(false);

  return (
    <div className="flex-col px-16">
      <header>
        <Navbar isHome={isHome} setIsHome={setIsHome} />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
