import Image, { StaticImageData } from "next/image";
import { ChevronRight } from "lucide-react";
import defaultBg from "../../public/images/rut-miit-RpxgkJRqg5I-unsplash.webp";
import Link from "next/link";

interface PageHeaderProps {
  title: string;
  backgroundImage?: string | StaticImageData; 
  priority?: boolean;
}

export default function PageHeader({
  title,
  backgroundImage,
  priority = false,
}: PageHeaderProps) {
  const bg = backgroundImage ?? defaultBg;
  const canBlur = typeof bg !== "string"; 

  return (
    <section className="relative text-white" aria-label={title}>
      <div className="absolute inset-0 -z-10">
        <Image
          src={bg}
          alt=""                          
          fill
          className="object-cover"
          sizes="100vw"                    
          priority={priority}
          fetchPriority={priority ? "high" : undefined}
          placeholder={canBlur ? "blur" : undefined}
        />
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-black/40 md:bg-black/35" />
      </div>

      {/* Content container */}
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-18 md:py-25">
        <div className="text-center">
          <h1 className="font-playfair font-bold mb-2 text-2xl sm:text-3xl md:text-4xl [text-wrap:balance]">
            {title}
          </h1>

          {/* Breadcrumb */}
          <nav className="mt-2 text-xs sm:text-sm flex flex-wrap justify-center items-center gap-2 text-zinc-200">
            <Link href="/" className="hover:underline">Home</Link>
            <ChevronRight className="w-4 h-4 text-red-400" />
            <span className="text-white max-w-[80vw] sm:max-w-none truncate">{title}</span>
          </nav>
        </div>
      </div>
    </section>
  );
}
