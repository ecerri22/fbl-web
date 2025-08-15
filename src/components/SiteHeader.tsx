"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu as MenuIcon } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="grid grid-cols-[1fr_auto_1fr] items-center px-15 py-6 w-full">
      {/* Left: brand */}
      <Link href="/" className="justify-self-start text-xl font-bold text-red-800">
        FBL
      </Link>

      {/* Center: desktop nav (and the mobile Dialog lives inside Navbar) */}
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
