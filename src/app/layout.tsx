import "./globals.css";
import { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Playfair_Display, Roboto} from "next/font/google";
import { cn } from "@/lib/utils"; 

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-playfair",
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata = {
  title: "Fakulteti i Biznesit dhe Ligjit",
  description: "Zbuloni programet tona akademike dhe aktivitetet kërkimore.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${roboto.variable}`}>
      <body className={cn("flex flex-col min-h-screen font-sans")}>
        <header className="sticky top-0 z-50 bg-white shadow-sm border-b">
          <nav className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
            <h1 className="text-xl font-bold text-blue-950">FBL</h1>
            <Navbar />
          </nav>
        </header>

        <main className="flex-grow min-h-[500px]">{children}</main>

        <Footer className="mt-auto" />
      </body>
    </html>
  );
}