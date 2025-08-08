"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import PageWrapper from "@/components/PageWrapper";
import Image from "next/image";
import Link from "next/link";
import { allPrograms } from "@/data/allPrograms"; 

type ProgramLevel = "Bachelor" | "Master";

export default function StudyProgramsPage() {
  return (
    <PageWrapper>
      <Suspense fallback={<div className="py-10 text-sm text-neutral-500">Loading…</div>}>
        <StudyProgramsInner />
      </Suspense>
    </PageWrapper>
  );
}

function StudyProgramsInner() {
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDept, setSelectedDept] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<ProgramLevel | "">("");

  const departments = Array.from(new Set(allPrograms.map((p) => p.department)));

  useEffect(() => {
    const levelParam = searchParams.get("level");
    if (levelParam && (levelParam === "bachelor" || levelParam === "master")) {
      setSelectedLevel(
        levelParam === "bachelor" ? "Bachelor" : "Master"
      );
    }
  }, [searchParams]);

  // Filtering logic
  const filteredPrograms = allPrograms.filter((program) => {
    const matchesSearch = program.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesDept = selectedDept ? program.department === selectedDept : true;
    const matchesLevel = selectedLevel ? program.level === selectedLevel : true;
    return matchesSearch && matchesDept && matchesLevel;
  });

  return (
    <main className="text-neutral-800 min-h-screen max-w-7xl mx-auto space-y-24 px-6 md:px-0 py-10">
      <div>
        <h1 className="text-3xl font-semibold leading-tight font-playfair text-neutral-800 pb-10 border-b border-neutral-100">
          Academic Areas of Study
        </h1>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-6 py-10">
          {/* Search */}
          <div className="w-full lg:w-1/2">
            <p className="text-xl font-playfair mb-2">Search Programs:</p>
            <input
              type="text"
              placeholder="Search programs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-neutral-200 px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-red-800"
            />
          </div>

          {/* Department */}
          <div className="w-full lg:w-1/4">
            <p className="text-xl font-playfair mb-2">Department:</p>
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="w-full border border-neutral-200 px-4 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-red-800"
            >
              <option value="">All Departments</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          {/* Program Level */}
          <div className="w-full lg:w-1/4">
            <p className="text-xl font-playfair mb-2">Program Level:</p>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value as ProgramLevel | "")}
              className="w-full border border-neutral-200 px-4 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-red-800"
            >
              <option value="">All Levels</option>
              <option value="Bachelor">Bachelor</option>
              <option value="Master">Master</option>
            </select>
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {filteredPrograms.map((program) => {
            return (
              <div key={program.slug} className="w-full">
                <Link
                  href={`/study-programs/${program.slug}`}
                  className="block w-full overflow-hidden group"
                >
                  <Image
                    src={program.image}
                    alt={program.department}
                    width={300}
                    height={200}
                    className="object-cover w-full h-48 transition-transform duration-500 ease-in-out group-hover:scale-105"
                  />
                </Link>

                <Link
                  href={`/study-programs/${program.slug}`}
                  className="h-18 flex justify-between items-center w-full border border-neutral-100 border-t-0 px-3 py-2 text-sm font-roboto text-black transition-colors duration-300 hover:text-red-800 group"
                >
                  <span className="group-hover:underline text-base group-hover:decoration-red-800">
                    {program.name}
                  </span>
                  <span className="transition-colors duration-300 group-hover:text-red-800">
                    →
                  </span>
                </Link>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredPrograms.length === 0 && (
          <div className="text-neutral-500 text-sm mt-6">
            No programs match your filters.
          </div>
        )}
      </div>
    </main>
  );
}
