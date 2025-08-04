"use client";

import { BookOpen } from "lucide-react";

export function CurriculumSection({ curriculum }: { curriculum: string }) {
  return (
    <section>
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="text-blue-950 w-6 h-6" />
        <h2 className="text-xl font-bold text-blue-950">Sample Curriculum</h2>
      </div>

      <a
        href={curriculum}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block text-blue-600 underline hover:text-blue-800 transition"
      >
        Shkarko planin mësimor (PDF)
      </a>
    </section>
  );
}
