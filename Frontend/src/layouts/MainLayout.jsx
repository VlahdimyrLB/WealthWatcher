import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useState } from "react";

const MainLayout = () => {
  const [isHome, setIsHome] = useState(false);

  return (
    <div>
      <header className="shadow-md dark:shadow-md dark:shadow-stone-500/30 px-16">
        <Navbar isHome={isHome} setIsHome={setIsHome} />
      </header>
      <main className="flex-col px-24 pt-12">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
