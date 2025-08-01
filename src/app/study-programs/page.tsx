'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { GraduationCap } from 'lucide-react'
import { allPrograms } from "@/data/allPrograms";

type Curriculum = {
  code: string;
  title: string;
  credits: number;
};

type Program = {
  name: string;
  level: string;
  slug: string;
  department: string;
  departmentSlug: string;
  description: string;
  why: string;
  career: string;
  admission: string;
  curriculum: {
    viti1s1: Curriculum[];
    viti1s2: Curriculum[];
  };
};


export default function StudyProgramsPage() {
  const searchParams = useSearchParams()
  const typeFilter = searchParams.get('type') // 'bachelor' or 'master'
  const [filteredPrograms, setFilteredPrograms] = useState<Program[]>([]);

  useEffect(() => {
    if (typeFilter === 'bachelor') {
      setFilteredPrograms(
        allPrograms.filter(p => p.level.toLowerCase().includes('bachelor'))
      );
    } else if (typeFilter === 'master') {
      setFilteredPrograms(
        allPrograms.filter(p => p.level.toLowerCase().includes('master'))
      );
    } else {
      setFilteredPrograms(allPrograms);
    }
  }, [typeFilter]);

  return (
  <main className="bg-white min-h-screen py-20 px-6 md:px-20">
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-16">
        <h6 className="text-red-700 font-semibold uppercase tracking-widest text-sm">Explore Our Programs</h6>
        <h1 className="text-4xl font-bold text-blue-950 mt-2 mb-4">Study Programs at FBL</h1>
        <p className="text-zinc-600 max-w-2xl mx-auto text-base">
          From undergraduate to postgraduate, our programs prepare you for real-world success in business, law, economics, and more.
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="flex justify-center gap-4 mb-10">
        <Link href="/study-programs" className={`px-5 py-2 rounded-full text-sm font-medium border ${!typeFilter ? 'bg-red-700 text-white' : 'text-blue-950 border-blue-950 hover:bg-blue-950 hover:text-white'}`}>All</Link>
        <Link href="/study-programs?type=bachelor" className={`px-5 py-2 rounded-full text-sm font-medium border ${typeFilter === 'bachelor' ? 'bg-red-700 text-white' : 'text-blue-950 border-blue-950 hover:bg-blue-950 hover:text-white'}`}>Bachelor</Link>
        <Link href="/study-programs?type=master" className={`px-5 py-2 rounded-full text-sm font-medium border ${typeFilter === 'master' ? 'bg-red-700 text-white' : 'text-blue-950 border-blue-950 hover:bg-blue-950 hover:text-white'}`}>Master</Link>
      </div>

      {/* Cards: One per Program */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredPrograms.map((program, i) => (
          <Link
            key={i}
            href={`/study-programs/${program.slug}`}
            className="bg-zinc-50 p-6 rounded-xl shadow hover:shadow-lg transition group flex flex-col justify-between"
          >
            <div>
              <div className="mb-3 text-red-700 flex items-center gap-2">
                <GraduationCap className="w-5 h-5" />
                <span className="uppercase text-xs tracking-widest">{program.level}</span>
              </div>
              <h3 className="text-xl font-semibold text-blue-950 group-hover:text-red-700 transition">{program.name}</h3>
              <p className="text-sm text-gray-600 mt-2 italic">{program.department}</p>
            </div>
            <div className="mt-6">
              <span className="text-sm text-red-700 hover:underline font-medium">Learn More →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </main>
)

}