"use client";

import { usePathname } from "next/navigation";
import PageHeader from "./PageHeader";

interface PageWrapperProps {
  children: React.ReactNode;
}

export default function PageWrapper({ children }: PageWrapperProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const dynamicTitle = pathname
  .split("/")
  .filter(Boolean)
  .map((segment) =>
    segment
      .replace(/-/g, " ") 
      .replace(/\b\w/g, (char) => char.toUpperCase()) 
  )
  .join(" / ");


  return (
    <>
      {!isHome && (
        <PageHeader
          title={dynamicTitle || "Page"}
        />
      )}
      <main className="px-6 md:px-30 lg:px-40 py-20">{children}</main>
    </>
  );
}

