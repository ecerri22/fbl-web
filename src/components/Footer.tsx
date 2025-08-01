import { Facebook, Instagram, Linkedin, Mail, Phone } from "lucide-react";
import Link from "next/link";

export default function Footer({ className = "" }: { className?: string }) {
  return (
    <footer className={`bg-blue-950 text-white px-6 md:px-20 pt-16 pb-10 ${className}`}>
      <div className="max-w-7xl mx-auto grid gap-12 sm:grid-cols-2 md:grid-cols-4">
        {/* Brand / About */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-wide">FBL</h2>
          <p className="text-sm text-zinc-300">
            Faculty of Business and Law at the University of Elbasan.
            Empowering future leaders through quality education and research.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm text-zinc-300">
            <li><Link href="/about" className="hover:text-white">About</Link></li>
            <li><Link href="/programs" className="hover:text-white">Programs</Link></li>
            <li><Link href="/departments" className="hover:text-white">Departments</Link></li>
            <li><Link href="/events" className="hover:text-white">Events</Link></li>
            <li><Link href="/news" className="hover:text-white">News</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide mb-3">Contact</h4>
          <div className="space-y-2 text-sm text-zinc-300">
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4" /> info@fbl.edu.al
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4" /> +355 67 123 456
            </p>
          </div>
        </div>

        {/* Social */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide mb-3">Follow Us</h4>
          <div className="flex gap-4 mt-2">
            <a href="#" aria-label="Facebook" className="hover:text-white text-zinc-300">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-white text-zinc-300">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-white text-zinc-300">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-zinc-700 mt-12 pt-6 text-center text-xs text-zinc-400">
        © {new Date().getFullYear()} Faculty of Business and Law. All rights reserved.
      </div>
    </footer>
  );
}
