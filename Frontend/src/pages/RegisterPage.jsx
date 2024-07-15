import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import UserCard from "@/components/UserCard";

const ResgiterPage = () => {
  const [registerData, setRegisterData] = useState({
    name: "",
    username: "",
    password: "",
  });
  const [error, setError] = useState(false);
  // const navigate = useNavigate();

  const handleChange = (e) => {
    setRegisterData((prevRegisterData) => ({
      ...prevRegisterData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/api/v1/users/register", {
        name: registerData.name,
        username: registerData.username,
        password: registerData.password,
      });

      // Navigate to dashboard on successful login
      // navigate("/dashboard");
    } catch (error) {
      // dagdag ng error state
      console.error(error.response.data.error);
      setError(error.response.data.error.slice(34));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <UserCard
        cardTitle="Register"
        cardDescription="Please enter your credentials"
        cardContent={
          <>
            <div className="flex flex-col space-y-1">
              <Label htmlFor="username">Full Name</Label>
              <Input
                type="text"
                id="name"
                name="name"
                placeholder="Full Name"
                value={registerData.name}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input
                type="text"
                id="username"
                name="username"
                placeholder="Username"
                value={registerData.username}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={registerData.password}
                onChange={handleChange}
              />
            </div>

            <p className="text-center text-sm text-red-600 dark:text-red-500">
              {error ? error : null}
            </p>
          </>
        }
        buttonName="Register"
      />
    </form>
  );
};

export default ResgiterPage;
