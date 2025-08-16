"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Course = { code: string; title: string; credits: number };

export type Curriculum = {
  year1?: { semester1: Course[]; semester2: Course[] };
  year2?: { semester1: Course[]; semester2: Course[] };
  year3?: { semester1: Course[]; semester2: Course[] };
  year4?: { semester1: Course[]; semester2: Course[] };
  year5?: { semester1: Course[]; semester2: Course[] };
};

export function CurriculumSection({ curriculum }: { curriculum: Curriculum }) {
  const [openYear, setOpenYear] = useState<string | null>("year1");

  const toggleYear = (yearKey: string) => {
    setOpenYear(openYear === yearKey ? null : yearKey);
  };

  const years = Object.entries(curriculum);

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-playfair text-neutral-800 font-semibold">
        Program Courses
      </h2>

      {years.map(([yearKey, yearData], index) => {
        const isOpen = openYear === yearKey;

        return (
          <div
            key={yearKey}
            className="border border-neutral-300 rounded overflow-hidden"
          >
            <button
              onClick={() => toggleYear(yearKey)}
              className={`w-full flex justify-between items-center px-4 py-3 font-semibold text-left transition-colors duration-300 ${
                isOpen
                  ? "bg-red-800 text-white"
                  : "bg-white text-red-800 hover:bg-red-800 hover:text-neutral-100"
              }`}
            >
              <span>{`Year ${index + 1}`}</span>
              <span>{isOpen ? "−" : "+"}</span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="p-4 space-y-8 bg-white">
                    <div>
                      <h3 className="font-semibold mb-2 text-neutral-700">
                        Semester 1
                      </h3>
                      <CurriculumTable courses={yearData.semester1} />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 text-neutral-700">
                        Semester 2
                      </h3>
                      <CurriculumTable courses={yearData.semester2} />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </section>
  );
}

function CurriculumTable({ courses }: { courses: Course[] }) {
  return (
    <div className="overflow-x-auto"> {/* <- no -mx-4 */}
      <table className="min-w-full table-fixed border text-sm">
        <colgroup>
          <col className="w-[70%]" />
          <col className="w-[30%]" />
        </colgroup>
        <thead>
          <tr className="bg-red-800 text-white">
            <th className="text-left p-2">Course Title</th>
            <th className="text-left p-2">Credits</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course, idx) => (
            <tr key={idx} className="border-t">
              <td className="p-2 break-words whitespace-normal ">{course.title}</td>
              <td className="p-2 whitespace-nowrap">{course.credits} Credits</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

