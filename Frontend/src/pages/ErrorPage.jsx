import React from "react";
import { NavLink } from "react-router-dom";

import { Button } from "@/components/ui/button";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <div className="max-w-md w-full p-8 shadow-lg rounded-lg text-center">
        <h2 className="text-3xl font-bold text-gray-400 mb-6">Oops!</h2>
        <p className="text-lg text-gray-600 mb-4">
          We couldn't find the page you're looking for.
        </p>
        <p className="text-gray-600 mb-6">Error code: 404</p>
        <NavLink to="/">
          <Button type="ghost"> Back to Home</Button>
        </NavLink>
      </div>
    </div>
  );
};

export default ErrorPage;
