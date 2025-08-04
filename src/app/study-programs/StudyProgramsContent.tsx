'use client'

import Link from 'next/link'
import { GraduationCap } from 'lucide-react'

type Curriculum = {
  code: string
  title: string
  credits: number
}

type Program = {
  name: string
  level: string
  slug: string
  department: string
  departmentSlug: string
  description: string
  why: string;        
  career: string;     
  admission: string;  
  curriculum: string;
}

export default function StudyProgramsContent({
  programs,
}: {
  programs: Program[]
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
      {programs.map((program) => (
        <Link
          key={program.slug}
          href={`/study-programs/${program.slug}`}
          className="bg-zinc-50 p-6 rounded-xl shadow hover:shadow-lg transition group flex flex-col justify-between"
        >
          <div>
            <div className="mb-3 text-red-700 flex items-center gap-2">
              <GraduationCap className="w-5 h-5" />
              <span className="uppercase text-xs tracking-widest">
                {program.level}
              </span>
            </div>
            <h3 className="text-xl font-semibold text-blue-950 group-hover:text-red-700 transition">
              {program.name}
            </h3>
            <p className="text-sm text-gray-600 mt-2 italic">{program.department}</p>
          </div>
          <div className="mt-6">
            <span className="text-sm text-red-700 hover:underline font-medium">
              Learn More →
            </span>
          </div>
        </Link>
      ))}
    </div>
  )
}
