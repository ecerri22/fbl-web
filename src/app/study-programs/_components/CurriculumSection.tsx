"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Course = { code?: string; title: string; credits?: number };

// UI shape the table expects
type UICurriculum = Record<
  string,
  { semester1: Course[]; semester2: Course[] }
>;

// DB shape coming from buildCurriculumFromDB()
type DBCurriculum = {
  years: {
    year: number;
    semesters: { semester: number; courses: Course[] }[];
  }[];
};

type LegacyYear = { semester1?: Course[]; semester2?: Course[] };
type LegacyCurriculum = Record<string, LegacyYear>;

function isObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}

function isCourse(v: unknown): v is Course {
  return isObject(v) && typeof v.title === "string";
}

function isCourseArray(v: unknown): v is Course[] {
  return Array.isArray(v) && v.every(isCourse);
}

function isDbCurriculum(v: unknown): v is DBCurriculum {
  if (!isObject(v) || !Array.isArray((v as { years?: unknown }).years)) return false;
  const years = (v as { years: unknown[] }).years;
  return years.every((y) => {
    if (!isObject(y) || typeof (y as { year?: unknown }).year !== "number") return false;
    const semesters = (y as { semesters?: unknown }).semesters;
    return (
      Array.isArray(semesters) &&
      semesters.every((s) => {
        if (!isObject(s) || typeof (s as { semester?: unknown }).semester !== "number") return false;
        return isCourseArray((s as { courses?: unknown }).courses);
      })
    );
  });
}

function isLegacyCurriculum(v: unknown): v is LegacyCurriculum {
  if (!isObject(v)) return false;
  for (const [k, val] of Object.entries(v)) {
    if (!/^year\d+$/.test(k)) continue; // ignore unknown keys
    if (!isObject(val)) return false;
    const s1 = (val as { semester1?: unknown }).semester1;
    const s2 = (val as { semester2?: unknown }).semester2;
    if (s1 !== undefined && !isCourseArray(s1)) return false;
    if (s2 !== undefined && !isCourseArray(s2)) return false;
  }
  return true;
}

/** Normalize any incoming curriculum (DB or legacy JSON) into UICurriculum */
function toUICurriculum(input: unknown): UICurriculum {
  if (isDbCurriculum(input)) {
    const ui: UICurriculum = {};
    for (const y of input.years) {
      const s1 = y.semesters.find((s) => s.semester === 1)?.courses ?? [];
      const s2 = y.semesters.find((s) => s.semester === 2)?.courses ?? [];
      ui[`year${y.year}`] = { semester1: s1, semester2: s2 };
    }
    return ui;
  }

  if (isLegacyCurriculum(input)) {
    const ui: UICurriculum = {};
    for (const [k, v] of Object.entries(input)) {
      if (!/^year\d+$/.test(k)) continue;
      ui[k] = {
        semester1: v.semester1 ?? [],
        semester2: v.semester2 ?? [],
      };
    }
    return ui;
  }

  return {};
}


export function CurriculumSection({ curriculum }: { curriculum: unknown }) {
  const ui = useMemo(() => toUICurriculum(curriculum), [curriculum]);

  // Sort years numerically: year1, year2, ...
  const entries = useMemo(
    () =>
      Object.entries(ui).sort(
        (a, b) =>
          (parseInt(a[0].replace("year", "")) || 0) -
          (parseInt(b[0].replace("year", "")) || 0)
      ),
    [ui]
  );

  const [openYear, setOpenYear] = useState<string | null>(
    entries[0]?.[0] ?? null
  );

  if (entries.length === 0) {
    return (
      <section className="space-y-6">
        <h2 className="text-2xl font-playfair text-neutral-800 font-semibold">
          Program Courses
        </h2>
        <p className="text-neutral-600">Curriculum coming soon.</p>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-playfair text-neutral-800 font-semibold">
        Program Courses
      </h2>

      {entries.map(([yearKey, yearData], index) => {
        const isOpen = openYear === yearKey;
        return (
          <div
            key={yearKey}
            className="border border-neutral-300 rounded overflow-hidden"
          >
            <button
              onClick={() => setOpenYear(isOpen ? null : yearKey)}
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
                      <CurriculumTable courses={yearData.semester1 ?? []} />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 text-neutral-700">
                        Semester 2
                      </h3>
                      <CurriculumTable courses={yearData.semester2 ?? []} />
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

function CurriculumTable({ courses = [] as Course[] }) {
  return (
    <div className="overflow-x-auto">
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
              <td className="p-2 break-words whitespace-normal">
                {course.title}
              </td>
              <td className="p-2 whitespace-nowrap">
                {course.credits ?? "—"} Credits
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
