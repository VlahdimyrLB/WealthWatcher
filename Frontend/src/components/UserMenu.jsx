import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const menus = [
  {
    title: "Transactions",
    href: "/transaction",
    description: "View and manage all transactions in your application.",
  },
  {
    title: "Calendar",
    href: "/calendar",
    description: "Explore and interact with the calendar features.",
  },
  {
    title: "Reports",
    href: "/reports",
    description: "Generate and analyze various reports.",
  },
  {
    title: "Statistics",
    href: "/statistics",
    description: "Access statistical data and analytics.",
  },
];

function NavigationMenuDemo() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link to="/dashboard" className={navigationMenuTriggerStyle()}>
              Dashboard
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[300px] gap-3 p-4 md:w-[400px] md:grid-cols-2 lg:w-[500px] ">
              {menus.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                  description={component.description}
                />
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = ({ title, href, description }) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          to={href}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
          )}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {description}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
};

export default NavigationMenuDemo;
