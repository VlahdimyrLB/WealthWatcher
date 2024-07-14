import React from "react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/contexts/AuthContext";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import UserCard from "@/components/UserCard";

const LoginPage = () => {
  const { login, error } = useContext(AuthContext); // Access the login function from context
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginData((prevLoginData) => ({
      ...prevLoginData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(loginData.username, loginData.password);

      // Navigate to dashboard on successful login
      navigate("/dashboard");
    } catch (error) {
      // dagdag ng error state
      console.error("Failed to login:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <UserCard
        cardTitle="Log In"
        cardDescription="Please enter your credentials"
        cardContent={
          <>
            <div className="flex flex-col space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input
                type="text"
                id="username"
                name="username"
                placeholder="Username"
                value={loginData.username}
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
                value={loginData.password}
                onChange={handleChange}
              />
            </div>

            <p className="text-center text-sm text-red-600 dark:text-red-500">
              {error ? error : null}
            </p>
          </>
        }
        buttonName="Log In"
      />
    </form>
  );
};

export default LoginPage;
