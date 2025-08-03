import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

export default function Footer({ className = "" }: { className?: string }) {
  return (
    <footer className={`bg-neutral-800 text-white px-6 md:px-20 pt-16 pb-10 ${className}`}>
      <div className="max-w-7xl mx-auto grid gap-12 sm:grid-cols-2 md:grid-cols-4">
        {/* Brand / About */}
        <div className="space-y-4 flex flex-col gap-1">
          <h2 className="text-2xl font-bold tracking-wide">FBL</h2>
          <p className="text-sm text-neutral-400">
            We are passionate education dedicated to providing high-quality resources learners all backgrounds.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm text-neutral-300">
            <li><Link href="/about" className="hover:text-red-800">About</Link></li>
            <li><Link href="/programs" className="hover:text-red-800">Programs</Link></li>
            <li><Link href="/departments" className="hover:text-red-800">Departments</Link></li>
            <li><Link href="/events" className="hover:text-red-800">Events</Link></li>
            <li><Link href="/news" className="hover:text-red-800">News</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide mb-3">Contact</h4>
          <div className="space-y-2 text-sm text-neutral-300">
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4"/> info@fbl.edu.al
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4"/> +355 67 123 456
            </p>
            <p className="flex items-center gap-2">
              <MapPin className="w-4 h-4"/> Elbasan, Albania
            </p>
          </div>
        </div>

        {/* Social */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide mb-3">Follow Us</h4>
          <div className="flex gap-4 mt-2">
            <a href="#" aria-label="Facebook" className="hover:text-red-800 text-neutral-400">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-red-800 text-neutral-400">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-red-800 text-neutral-400">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-700 mt-12 pt-6 text-center text-xs text-neutral-400">
        © {new Date().getFullYear()} Faculty of Business and Law. All rights reserved.
      </div>
    </footer>
  );
}
