'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { allPrograms } from '@/data/allPrograms'
import StudyProgramsContent from './StudyProgramsContent'

type Curriculum = {
  code: string
  title: string
  credits: number
}

type Program = {
  name: string;
  departmentCode: string;
  slug: string;
  level: string;
  department: string;
  departmentSlug: string;
  description: string;
  why: string;        
  career: string;     
  admission: string;  
  curriculum: string; 
};

export default function StudyProgramsClient() {
  const searchParams = useSearchParams()
  const typeFilter = searchParams.get('type')
  const [filteredPrograms, setFilteredPrograms] = useState<Program[]>([])

  useEffect(() => {
    if (typeFilter === 'bachelor') {
      setFilteredPrograms(
        allPrograms.filter((p) =>
          p.level.toLowerCase().includes('bachelor')
        )
      )
    } else if (typeFilter === 'master') {
      setFilteredPrograms(
        allPrograms.filter((p) =>
          p.level.toLowerCase().includes('master')
        )
      )
    } else {
      setFilteredPrograms(allPrograms)
    }
  }, [typeFilter])

  return (
    <>
      {/* Filter Buttons */}
      <div className="flex justify-center gap-4 mb-10">
        <Link
          href="/study-programs"
          className={`px-5 py-2 rounded-full text-sm font-medium border ${
            !typeFilter
              ? 'bg-red-700 text-white'
              : 'text-blue-950 border-blue-950 hover:bg-blue-950 hover:text-white'
          }`}
        >
          All
        </Link>
        <Link
          href="/study-programs?type=bachelor"
          className={`px-5 py-2 rounded-full text-sm font-medium border ${
            typeFilter === 'bachelor'
              ? 'bg-red-700 text-white'
              : 'text-blue-950 border-blue-950 hover:bg-blue-950 hover:text-white'
          }`}
        >
          Bachelor
        </Link>
        <Link
          href="/study-programs?type=master"
          className={`px-5 py-2 rounded-full text-sm font-medium border ${
            typeFilter === 'master'
              ? 'bg-red-700 text-white'
              : 'text-blue-950 border-blue-950 hover:bg-blue-950 hover:text-white'
          }`}
        >
          Master
        </Link>
      </div>

      {/* Program Cards */}
      <StudyProgramsContent programs={filteredPrograms} />
    </>
  )
}
