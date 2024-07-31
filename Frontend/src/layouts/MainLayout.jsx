import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";

const MainLayout = () => {
  const [isHome, setIsHome] = useState(false);

  return (
    <div>
      {/* className="shadow-md dark:shadow-md dark:shadow-stone-500/30 px-16" */}
      <header className="lg:px-16 md:px-10 px-2">
        <Navbar isHome={isHome} setIsHome={setIsHome} />
      </header>
      <main className="flex-col lg:px-24 md:px-10 px-6 pt-10">
        <Outlet />
      </main>
      <Toaster />
    </div>
  );
};

export default MainLayout;
