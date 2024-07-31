import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";

const MainLayout = () => {
  const [isHome, setIsHome] = useState(false);

  return (
    <div>
      {/* className="shadow-md dark:shadow-md dark:shadow-stone-500/30 px-16" */}
      <header className="px-16">
        <Navbar isHome={isHome} setIsHome={setIsHome} />
      </header>
      <main className="flex-col px-24 pt-10">
        <Outlet />
      </main>
      <Toaster />
    </div>
  );
};

export default MainLayout;
