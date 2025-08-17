"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu as MenuIcon } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [mobileOpen]);

  return (
    <nav className="grid grid-cols-[1fr_auto_1fr] items-center lg:px-15 md:px-10 sm:px-8 py-6 w-full max-[640px]:px-6">
      {/* Left: brand */}
      <Link href="/" className="justify-self-start text-xl font-bold text-red-800">
        FBL
      </Link>

      {/* Center */}
      <div className="justify-self-center">
        <Navbar open={mobileOpen} setOpen={setMobileOpen} externalTrigger />
      </div>

      {/* Right: hamburger lives here (mobile only) */}
      <div className="justify-self-end">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
          className="xl:hidden inline-flex items-center justify-center w-10 h-10 border border-neutral-200"
        >
          <MenuIcon className="w-5 h-5 text-neutral-800" />
        </button>
      </div>
    </nav>
  );
}
