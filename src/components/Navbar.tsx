"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) =>
    pathname === path
      ? "text-red-800 font-semibold"
      : "text-neutral-800 hover:text-red-900";

  const departments = [
    ["Business Administration", "business-administration"],
    ["Economics", "economics"],
    ["Law", "law"],
    ["Marketing & Engineering", "marketing-engineering"],
    ["Finance & Accounting", "finance-accounting"],
  ];

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
          <NavigationMenuLink asChild className={isActive("/staff")}>
            <Link href="/staff">Staff</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild className={isActive("/study-programs")}>
            <Link href="/study-programs">Study Programs</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* Departments Dropdown */}
        <NavigationMenuItem>
          <Menu as="div" className="relative inline-block text-left">
            <MenuButton
              className={`inline-flex items-center gap-x-1 bg-transparent px-0 py-2 text-mdfocus:outline-none ${
                pathname.startsWith("/departments")
                  ? "text-red-800 font-semibold"
                  : "text-neutral-800 hover:text-red-900"
              }`}
            >
              Departments
              <ChevronDownIcon
                className="ml-1 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </MenuButton>

            <MenuItems
              className="absolute left-0 z-10 mt-2 w-56 origin-top-left bg-white shadow-lg ring-1 ring-neutral-200 ring-opacity-5 focus:outline-none"
            >
              <div>
                {departments.map(([label, slug]) => {
                  const active = pathname === `/departments/${slug}`;
                  return (
                    <MenuItem key={slug}>
                      {({ active: itemActive }) => (
                        <Link
                          href={`/departments/${slug}`}
                          className={`block px-4 py-2 text-md ${
                            active
                              ? "bg-red-50 text-red-800 font-medium"
                              : itemActive
                              ? "text-red-800"
                              : "text-gray-700"
                          }`}
                        >
                          {label}
                        </Link>
                      )}
                    </MenuItem>
                  );
                })}
              </div>
            </MenuItems>
          </Menu>
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
