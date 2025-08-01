import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface PageHeaderProps {
  title: string;
  backgroundImage?: string;
}

export default function PageHeader({ title, backgroundImage }: PageHeaderProps) {
  return (
    <section
        className="relative text-white py-24 px-6 text-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${backgroundImage || "/images/hero-default.jpg"})`,
        }}
      >
        <div className="absolute inset-0 bg-blue-950 opacity-90 z-0" />
        
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{title}</h1>
          <div className="text-sm flex justify-center items-center gap-2 text-zinc-200">
            <Link href="/" className="hover:underline">Home</Link>
            <ChevronRight className="w-4 h-4 text-red-500" />
            <span className="text-white">{title}</span>
          </div>
        </div>
      </section>

  );
}
