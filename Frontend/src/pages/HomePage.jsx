import React, { useEffect, useState } from "react";
import { ModeToggle } from "@/components/theme/mode-toggle";

const HomePage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-between space-y-6 mt-10">
      <p
        className={`text-6xl font-bold text-center transition-opacity duration-500 ease-in-out ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        A Comprehensive Finance Tracking Tool
      </p>
      <h4
        className={`text-lg text-gray-300 transition-opacity duration-1000 ease-in-out ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        Maglalagay tayo simple details dito about sa app
      </h4>
    </div>
  );
};

export default HomePage;
