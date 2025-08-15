// Navbar.tsx
"use client";

import { useEffect, useState, Fragment } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Menu as MenuIcon, X, ChevronDown } from "lucide-react";
import { Dialog, Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";

type NavbarProps = {
  open?: boolean;                    // controlled (optional)
  setOpen?: (v: boolean) => void;    // controlled (optional)
  externalTrigger?: boolean;         // hide internal hamburger if true
};

export default function Navbar({ open, setOpen, externalTrigger = false }: NavbarProps) {
  const router = useRouter();
  const pathname = usePathname();

  // Controlled/uncontrolled pattern
  const [internalOpen, setInternalOpen] = useState(false);
  const menuOpen = open ?? internalOpen;
  const setMenuOpen = setOpen ?? setInternalOpen;

  const [pendingHref, setPendingHref] = useState<string | null>(null);

  useEffect(() => {
    if (pendingHref && pathname === pendingHref) {
      setMenuOpen(false);
      setPendingHref(null);
    }
  }, [pathname, pendingHref, setMenuOpen]);

  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = menuOpen ? "hidden" : original;
    return () => {
      document.body.style.overflow = original;
    };
  }, [menuOpen]);

  function go(href: string) {
    if (href === pathname) {
      setMenuOpen(false);
      return;
    }
    setPendingHref(href);
    router.push(href);
  }

  const isActive = (path: string) =>
    pathname === path ? "text-red-800 font-semibold" : "text-neutral-800 hover:text-red-900";

  const departments: Array<[string, string]> = [
    ["Business Administration", "business-administration"],
    ["Economics", "economics"],
    ["Law", "law"],
    ["Marketing & Engineering", "marketing-engineering"],
    ["Finance & Accounting", "finance-accounting"],
  ];

  return (
    <div className="flex items-center gap-2">
      {/* Desktop nav (>=1280px) */}
      <div className="hidden xl:block">
        <NavigationMenu className="flex-none">
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

            {/* Departments dropdown (desktop) */}
            <NavigationMenuItem>
              <Menu as="div" className="relative inline-block text-left">
                <MenuButton
                  className={`inline-flex items-center gap-x-1 px-0 py-2 focus:outline-none ${
                    pathname.startsWith("/departments")
                      ? "text-red-800 font-semibold"
                      : "text-neutral-800 hover:text-red-900"
                  }`}
                >
                  Departments
                  <ChevronDown className="ml-1 h-5 w-5 text-gray-400" />
                </MenuButton>

                <MenuItems className="absolute left-0 z-50 mt-2 w-56 origin-top-left bg-white shadow-lg ring-1 ring-neutral-200 ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {departments.map(([label, slug]) => {
                      const active = pathname === `/departments/${slug}`;
                      return (
                        <MenuItem key={slug}>
                          {({ active: itemActive }) => (
                            <Link
                              href={`/departments/${slug}`}
                              className={`block px-4 py-2 text-sm ${
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

            <NavigationMenuItem>
              <NavigationMenuLink asChild className={isActive("/news")}>
                <Link href="/news">News</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild className={isActive("/news")}>
                <Link href="/news">Conference</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild className={isActive("/news")}>
                <Link href="/news">Contact</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Internal mobile toggle (hidden when externalTrigger is used) */}
      {!externalTrigger && (
        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          className="xl:hidden inline-flex items-center justify-center w-10 h-10 border border-neutral-200"
        >
          <MenuIcon className="w-5 h-5 text-neutral-800" />
        </button>
      )}

      {/* Mobile overlay (controlled by menuOpen) */}
      <Transition show={menuOpen} as={Fragment} appear>
        <Dialog as="div" className="xl:hidden" onClose={setMenuOpen}>
          {/* Backdrop */}
          <Transition.Child
            as={Fragment}
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-red-800 z-[70]" />
          </Transition.Child>

          {/* Slide panel */}
          <div className="fixed inset-0 z-[80]">
            <Transition.Child
              as={Fragment}
              enter="transform transition-transform duration-300 ease-out"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition-transform duration-300 ease-in"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="flex h-full flex-col">
                <div className="flex items-center justify-between px-6 py-6">
                  <button onClick={() => go("/")} className="text-neutral-100 text-xl font-bold">FBL</button>
                  <button onClick={() => setMenuOpen(false)} aria-label="Close menu" className="text-neutral-100">
                    <X className="w-7 h-7" />
                  </button>
                </div>

                <nav className="px-6 pt-2 pb-8 overflow-y-auto">
                  <MobileItem label="Home" onSelect={() => go("/")} current={pathname === "/"} />
                  <MobileItem label="About Us" onSelect={() => go("/about-us")} current={pathname === "/about-us"} />
                  <MobileItem label="Staff" onSelect={() => go("/staff")} current={pathname === "/staff"} />
                  <MobileItem label="Study Programs" onSelect={() => go("/study-programs")} current={pathname === "/study-programs"} />

                  <Disclosure>
                    {({ open: depOpen }) => (
                      <div className="border-b border-red-700/60">
                        <DisclosureButton className="w-full flex items-center justify-between py-3 text-neutral-100 text-2xl">
                          <span>Departments</span>
                          <ChevronDown className={`w-6 h-6 transition-transform ${depOpen ? "rotate-180" : ""}`} />
                        </DisclosureButton>
                        <DisclosurePanel className="pb-3">
                          <ul className="space-y-2 pl-1">
                            {departments.map(([label, slug]) => (
                              <li key={slug}>
                                <button
                                  onClick={() => go(`/departments/${slug}`)}
                                  className="block py-2 text-left w-full text-neutral-100/90 hover:text-white text-lg"
                                >
                                  {label}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </DisclosurePanel>
                      </div>
                    )}
                  </Disclosure>

                  <MobileItem label="Research" onSelect={() => go("/research")} current={pathname === "/research"} />
                  <MobileItem label="Events" onSelect={() => go("/events")} current={pathname === "/events"} />
                  <MobileItem label="News" onSelect={() => go("/news")} current={pathname === "/news"} />
                  <MobileItem label="Conference" onSelect={() => go("/news")} />
                  <MobileItem label="Contact" onSelect={() => go("/news")} />
                </nav>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

    </div>
  );
}

function MobileItem({
  label,
  onSelect,
  current,
}: {
  label: string;
  onSelect: () => void;
  current?: boolean;
}) {
  return (
    <button
      onClick={onSelect}
      className={`block w-full text-left py-3 text-2xl border-b border-red-700/60 ${
        current ? "text-white font-semibold" : "text-neutral-100 hover:text-white"
      }`}
    >
      {label}
    </button>
  );
}
