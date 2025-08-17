import "./globals.css";
import { ReactNode } from "react";
import Footer from "@/components/Footer";
import { Playfair_Display, Roboto } from "next/font/google";
import { cn } from "@/lib/utils";
import SiteHeader from "@/components/SiteHeader";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["700"], variable: "--font-playfair", display: "swap" });
const roboto = Roboto({ subsets: ["latin"], weight: ["400","500","700"], variable: "--font-roboto", display: "swap" });

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${roboto.variable}`}>
      <body className={cn("flex flex-col min-h-screen font-sans overflow-x-hidden")}>
        <header className="sticky top-0 z-50 bg-white shadow-sm border-b">
          <SiteHeader />
        </header>

        <main className="flex-grow min-h-[500px]">{children}</main>
        <Footer className="mt-auto" />
      </body>
    </html>
  );
}
