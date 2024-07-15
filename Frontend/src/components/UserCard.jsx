import React from "react";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { Spinner2 } from "./Spinners";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const UserCard = ({ cardTitle, cardDescription, cardContent, buttonName }) => {
  const { loading } = useContext(AuthContext); // Access the login function from context

  return (
    <section className="flex items-center justify-center mt-10">
      <Card className="w-[350px] shadow-s, dark:shadow-gray-300/30">
        <CardHeader>
          <CardTitle>{cardTitle}</CardTitle>
          <CardDescription>{cardDescription}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4">
          {cardContent}
        </CardContent>
        <CardFooter className="flex justify-between">
          <NavLink to="/">
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </NavLink>

          {loading ? (
            <>
              <Spinner2 loading={loading} size={8} />
              <Button type="submit">{buttonName}</Button>
            </>
          ) : (
            <Button type="submit">{buttonName}</Button>
          )}
        </CardFooter>
      </Card>
    </section>
  );
};

export default UserCard;
