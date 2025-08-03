"use client";

import { useState } from 'react';
import PageWrapper from "@/components/PageWrapper";
import Image from 'next/image';

type Department =
  | "Business Administration"
  | "Economics"
  | "Law"
  | "Marketing & Engineering"
  | "Finance & Accounting";

const departments: Department[] = [
  "Business Administration",
  "Economics",
  "Law",
  "Marketing & Engineering",
  "Finance & Accounting",
];

const departmentImages: Record<Department, string> = {
  "Business Administration": "/images/departments/business-admn-img.jpg",
  "Economics": "/images/departments/economics-img.jpg",
  "Law": "/images/departments/law-img.jpg",
  "Marketing & Engineering": "/images/departments/marketing-img.jpg",
  "Finance & Accounting": "/images/departments/finance-accounting-img.jpg",
};

const programs: {
  name: string;
  department: Department;
  slug: string;
}[] = [
  {
    name: "Bachelor in Business Administration",
    department: "Business Administration",
    slug: "business-administration-bachelor",
  },
  {
    name: "Professional Master's in Business Administration",
    department: "Business Administration",
    slug: "business-administration-professional-master",
  },
  {
    name: "Master of Science in Management",
    department: "Business Administration",
    slug: "management-master-science",
  },
  {
    name: "Bachelor in Finance and Accounting",
    department: "Finance & Accounting",
    slug: "finance-accounting-bachelor",
  },
  {
    name: "Professional Master's in Finance",
    department: "Finance & Accounting",
    slug: "finance-professional-master",
  },
  {
    name: "Master of Science in Banking Management",
    department: "Finance & Accounting",
    slug: "banking-management-master-science",
  },
  {
    name: "Professional Master's in Accounting",
    department: "Finance & Accounting",
    slug: "accounting-professional-master",
  },
  {
    name: "Master of Science in Accounting and Auditing",
    department: "Finance & Accounting",
    slug: "accounting-auditing-master-science",
  },
  {
    name: "Bachelor in Economy and Law",
    department: "Law",
    slug: "economy-law-bachelor",
  },
  {
    name: "Professional Master's in Economy and Law in the Public Sector",
    department: "Law",
    slug: "economy-law-public-sector-master",
  },
  {
    name: "Master of Science in Economy and Law in International Markets",
    department: "Law",
    slug: "economy-law-international-markets-master",
  },
  {
    name: "Integrated Master of Science in Law",
    department: "Law",
    slug: "law-integrated-master",
  },
  {
    name: "Bachelor in Economic Informatics",
    department: "Economics",
    slug: "economic-informatics-bachelor",
  },
  {
    name: "Professional Master's in Economic Informatics",
    department: "Economics",
    slug: "economic-informatics-professional-master",
  },
  {
    name: "Bachelor in Tourism Economics",
    department: "Marketing & Engineering",
    slug: "tourism-economics-bachelor",
  },
  {
    name: "Bachelor in Business Administration and Engineering",
    department: "Marketing & Engineering",
    slug: "business-engineering-bachelor",
  },
  {
    name: "Professional Master's in Marketing",
    department: "Marketing & Engineering",
    slug: "marketing-professional-master",
  },
  {
    name: "Master of Science in Marketing",
    department: "Marketing & Engineering",
    slug: "marketing-master-science",
  },
];

export default function StudyProgramsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDept, setSelectedDept] = useState("");

  const filteredPrograms = programs.filter((program) => {
    const matchesSearch = program.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = selectedDept ? program.department === selectedDept : true;
    return matchesSearch && matchesDept;
  });

  return (
    <PageWrapper>
      <main className="text-neutral-800 min-h-screen max-w-7xl mx-auto space-y-24 px-6 md:px-0 py-10">
        <div>
          <h1 className="text-3xl font-semibold leading-tight font-playfair text-neutral-800 pb-10 border-b border-neutral-100">
            Academic Areas of Study
          </h1>

          {/* Search and Dropdown */}
          <div className="flex flex-col md:flex-row gap-6 py-10">
            <div className="w-full md:w-2/3">
              <p className="text-xl font-playfair mb-2">Areas of Study:</p>
              <input
                type="text"
                placeholder="Search programs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border border-neutral-200 px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-red-800"
              />
            </div>
            <div className="w-full md:w-1/3">
              <p className="text-xl font-playfair mb-2">Department Type:</p>
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
          </div>

          {/* Results */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {filteredPrograms.map(({ name, slug, department }) => {
              const imageSrc = departmentImages[department] || "/images/default.jpg";

              return (
                <div key={slug} className="w-full">
                  {/* Image */}
                  <a
                    href={`/programs/${slug}`}
                    className="block w-full overflow-hidden group"
                    aria-label={`Visit ${name}`}
                  >
                    <Image
                      src={imageSrc}
                      alt={department}
                      width={300}
                      height={200}
                      className="object-cover w-full h-48 transition-transform duration-500 ease-in-out group-hover:scale-105"
                    />
                  </a>

                  {/* Text Box */}
                  <a
                    href={`/programs/${slug}`}
                    className="flex justify-between items-center w-full border border-neutral-100 border-t-0 px-3 py-2 text-sm font-roboto text-black transition-colors duration-300 hover:text-red-800 group"
                  >
                    <span className="group-hover:underline text-base group-hover:decoration-red-800">
                      {name}
                    </span>
                    <span className="transition-colors duration-300 group-hover:text-red-800">
                      →
                    </span>
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </PageWrapper>
  );
}
