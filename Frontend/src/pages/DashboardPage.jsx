import React from "react";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";

const DashboardPage = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  return (
    <div>
      Welcome User {user.name} JWT Token: {user.token}
    </div>
  );
};

export default DashboardPage;
