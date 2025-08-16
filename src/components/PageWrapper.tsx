"use client";

import { usePathname } from "next/navigation";
import PageHeader from "./PageHeader";

interface PageWrapperProps {
  children: React.ReactNode;
  /** Optional: pass a custom header background for a page */
  headerBackground?: string;
}

export default function PageWrapper({ children, headerBackground }: PageWrapperProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const dynamicTitle = pathname
    .split("/")
    .filter(Boolean)
    .map((segment) =>
      segment
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase())
    )
    .join(" / ");

  return (
    <>
      {!isHome && (
        <PageHeader
          title={dynamicTitle || "Page"}
          backgroundImage={headerBackground}
        />
      )}

      {/* Standardized container + responsive paddings  */}
      <main className="mx-auto w-full max-w-7xl 
      px-10 sm:px-20 md:px-20 lg:px-20  
      py-10 sm:py-20 md:py-20 lg:py-20
      ">
        {children}
      </main>
    </>
  );
}
