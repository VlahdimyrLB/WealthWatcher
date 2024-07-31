import React, { useEffect, useState } from "react";

const HomePage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-between space-y-6 lg:mt-10">
      <p
        className={`lg:text-6xl text-2xl font-bold text-center transition-opacity duration-500 ease-in-out ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        A Comprehensive Finance Tracking Tool
      </p>
      <h4
        className={`lg:text-lg text-xs  font-semibold  dark:text-gray-300 transition-opacity duration-1000 ease-in-out ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        Simple app details and chuchenes here
      </h4>
    </div>
  );
};

export default HomePage;
