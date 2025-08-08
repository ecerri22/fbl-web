"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { researchProjects } from "@/data/researchProjects";
import PageWrapper from "@/components/PageWrapper";
import { ArrowRight, ArrowLeft } from "lucide-react";

export default function AllProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedField, setSelectedField] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  // Unique dropdown options (sorted)
  const fields = useMemo(
    () => Array.from(new Set(researchProjects.map(p => p.field))).sort(),
    []
  );
  const years = useMemo(
    () =>
      Array.from(new Set(researchProjects.map(p => String(p.year))))
        .sort((a, b) => Number(b) - Number(a)),
    []
  );

  const filteredProjects = useMemo(() => {
    return researchProjects
      .slice()
      .reverse() 
      .filter(p => {
        const q = searchTerm.toLowerCase();
        const matchesSearch =
          p.title.toLowerCase().includes(q) ||
          p.coordinator.toLowerCase().includes(q) ||
          p.field.toLowerCase().includes(q);

        const matchesField = selectedField ? p.field === selectedField : true;
        const matchesYear = selectedYear ? String(p.year) === selectedYear : true;

        return matchesSearch && matchesField && matchesYear;
      });
  }, [searchTerm, selectedField, selectedYear]);

  return (
    <PageWrapper>
      <main className="text-neutral-800 min-h-screen max-w-7xl mx-auto px-6 md:px-0 py-10 ">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4 pb-10">
          <h1 className="text-3xl font-playfair font-semibold">All Research Projects</h1>
          <Link
            href="/research"
            className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-red-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Research
          </Link>
        </div>

        {/* Filters  */}
        <div className="flex flex-col lg:flex-row gap-6 py-10 border-t border-neutral-200">
          {/* Search */}
          <div className="w-full lg:w-1/2">
            <p className="text-xl font-playfair mb-2">Search Projects:</p>
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-neutral-200 px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-red-800"
            />
          </div>

          {/* Field */}
          <div className="w-full lg:w-1/4">
            <p className="text-xl font-playfair mb-2">Research Field:</p>
            <select
              value={selectedField}
              onChange={(e) => setSelectedField(e.target.value)}
              className="w-full border border-neutral-200 px-4 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-red-800"
            >
              <option value="">All Fields</option>
              {fields.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </div>

          {/* Year */}
          <div className="w-full lg:w-1/4">
            <p className="text-xl font-playfair mb-2">Year:</p>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full border border-neutral-200 px-4 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-red-800"
            >
              <option value="">All Years</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filteredProjects.map((project, i) => (
            <div
              key={i}
              className="p-6 bg-white border border-neutral-200 shadow-sm hover:shadow-md transition space-y-2"
            >
              <h3 className="text-neutral-800 font-playfair text-lg">
                {project.title}
              </h3>
              <p className="text-sm text-neutral-500 italic">
                {project.coordinator}
              </p>
              <p className="text-sm text-neutral-600">
                {project.field} • Year: {project.year}
              </p>
              <Link
                href={`/research/all-projects/${project.slug}?from=all-projects`}
                className="text-sm text-red-800 hover:underline font-medium inline-flex items-center gap-1"
              >
                Read More <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <div className="text-neutral-500 text-sm">
            No projects match your filters.
          </div>
        )}
      </main>
    </PageWrapper>
  );
}
