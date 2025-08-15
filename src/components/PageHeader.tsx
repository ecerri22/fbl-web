import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface PageHeaderProps {
  title: string;
  backgroundImage?: string; // optional per-page override
}

export default function PageHeader({ title, backgroundImage }: PageHeaderProps) {
  const bg = backgroundImage ?? "/images/rut-miit-RpxgkJRqg5I-unsplash.jpg";

  return (
    <section
      className="relative text-white bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url("${bg}")` }}
      aria-label={title}
    >
      {/* overlay for readability on any photo */}
      <div className="absolute inset-0 bg-black/40 md:bg-black/35" />

      {/* container + vertical rhythm */}
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        {/* center on small screens; left-align on md+ if you prefer */}
        <div className="text-center">
          <h1 className="font-playfair font-bold mb-2
                         text-2xl sm:text-3xl md:text-4xl
                         [text-wrap:balance]">
            {title}
          </h1>

          {/* breadcrumb: wraps gracefully on small screens */}
          <nav className="mt-2 text-xs sm:text-sm flex flex-wrap justify-center items-center gap-2 text-zinc-200">
            <Link href="/" className="hover:underline">Home</Link>
            <ChevronRight className="w-4 h-4 text-red-400" />
            {/* truncate very long titles so they don’t overflow */}
            <span className="text-white max-w-[80vw] sm:max-w-none truncate">{title}</span>
          </nav>
        </div>
      </div>
    </section>
  );
}
