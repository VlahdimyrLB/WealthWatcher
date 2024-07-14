import React from "react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/contexts/AuthContext";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const LoginPage = () => {
  const { login } = useContext(AuthContext); // Access the login function from context
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

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
    <section className="flex items-center justify-center mt-10">
      <Card className="w-[350px] shadow-md shadow-gray-300/40">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Log In</CardTitle>
            <CardDescription>Please enter your credentials</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col space-y-4">
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
              {/* handle error here */}
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
              {/* handle error here */}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button">
              Cancel
            </Button>
            <Button type="submit">Log In</Button>
          </CardFooter>
        </form>
      </Card>
    </section>
  );
};

export default LoginPage;
