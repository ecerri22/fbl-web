"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) =>
    pathname === path
      ? "text-red-800 font-semibold"
      : "text-blue-950 hover:text-blue-900";

  return (
    <NavigationMenu>
      <NavigationMenuList className="gap-6">
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={isActive("/")}>
            <Link href="/">Home</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={isActive("/about-us")}>
            <Link href="/about-us">About Us</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={isActive("/study-programs")}>
            <Link href="/study-programs">Study Programs</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={isActive("/departments")}>
            <Link href="/departments">Departments</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={isActive("/research")}>
            <Link href="/research">Research</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={isActive("/events")}>
            <Link href="/events">Events</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
