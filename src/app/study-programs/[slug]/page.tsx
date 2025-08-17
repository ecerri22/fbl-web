import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import PageWrapper from "@/components/PageWrapper";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { CurriculumSection } from "../_components/CurriculumSection";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

type ProgramCourseForUI = {
  year: number;
  semester: number;
  order: number | null;
  ects: number | null;
  course: { title: string; credits: number };
};

type CourseUI = { title: string; credits?: number };

type UICurriculum = {
  years: {
    year: number;
    semesters: { semester: number; courses: CourseUI[] }[];
  }[];
};


function arr<T = unknown>(v: unknown): T[] {
  return Array.isArray(v) ? (v as T[]) : [];
}

function buildCurriculumFromDB(
  rows: Array<{
    year: number;
    semester: number;
    order: number | null;
    ects: number | null;
    course: { title: string; credits: number };
  }>
): UICurriculum {
  const sorted = [...rows].sort((a, b) =>
    a.year !== b.year
      ? a.year - b.year
      : a.semester !== b.semester
      ? a.semester - b.semester
      : (a.order ?? 9999) - (b.order ?? 9999)
  );

  const yearsMap = new Map<number, Map<number, CourseUI[]>>();
  for (const r of sorted) {
    const credits = r.ects ?? r.course.credits ?? undefined;
    if (!yearsMap.has(r.year)) yearsMap.set(r.year, new Map());
    const semMap = yearsMap.get(r.year)!;
    if (!semMap.has(r.semester)) semMap.set(r.semester, []);
    semMap.get(r.semester)!.push({ title: r.course.title, credits });
  }

  const years = [...yearsMap.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([year, semMap]) => ({
      year,
      semesters: [...semMap.entries()]
        .sort((a, b) => a[0] - b[0])
        .map(([semester, courses]) => ({ semester, courses })),
    }));

  return { years };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function ProgramDetailPage({ params, searchParams }: any) {
  const program = await prisma.program.findUnique({
      where: { slug: params.slug },
      include: {
        department: { select: { name: true, image: true, slug: true } },
        programCourses: {
          select: {
            year: true,
            semester: true,
            order: true,
            ects: true,
            course: { select: { title: true, credits: true } },
          },
          orderBy: [{ year: "asc" }, { semester: "asc" }, { order: "asc" }],
        },
      },
    });


  if (!program) return notFound();

  const fromRaw = searchParams?.from ?? "/study-programs";
  const from = typeof fromRaw === "string" && fromRaw.startsWith("/") ? fromRaw : "/study-programs";

  const img = program.image || program.department?.image || "/images/programs/default.webp";

  const whyBulletPoints = arr<{ label?: string; description?: string }>(program.whyBulletPoints);
  const careerBulletPoints = arr<{ label?: string; description?: string }>(program.careerBulletPoints);
  
  const hasDbCurriculum = program.programCourses.length > 0;

  const curriculumForUI: UICurriculum | null = hasDbCurriculum
    ? buildCurriculumFromDB(
        program.programCourses.map((pc): ProgramCourseForUI => ({
          year: pc.year,
          semester: pc.semester,
          order: pc.order,
          ects: pc.ects,
          course: { title: pc.course.title, credits: pc.course.credits },
        }))
      )
    : ((program.curriculum as UICurriculum | null) ?? null);

  return (
    <PageWrapper>
      <div className="text-neutral-800 space-y-15 sm:space-y-15 max-[640px]:space-y-15">
        {/* Back button */}
        <div className="flex flex-row items-center mb-10 gap-2 hover:text-red-800 text-sm text-neutral-600">
          <ArrowLeft className="w-4 h-4" />
          <Link href={from} className="inline-block">
            Back to Study Programs
          </Link>
        </div>

        <div className="grid w-full gap-12 lg:grid-cols-[2fr_1fr] overflow-x-clip">
          {/* LEFT column */}
          <div className="min-w-0 space-y-15">
            {/* Overview */}
            <section id="program_overview">
              <div className="flex flex-col gap-8 sm:gap-12">
                <div className="relative w-full h-64 sm:h-[20rem] overflow-hidden shadow-md">
                  <Image src={img} alt={program.name} fill className="object-cover" priority />
                </div>

                <div className="text-neutral-600">
                  <h1 className="text-2xl sm:text-3xl font-semibold font-playfair text-neutral-800 mb-3 sm:mb-4">
                    {program.name}
                  </h1>
                  {program.description && <p className="leading-relaxed">{program.description}</p>}
                </div>
              </div>
            </section>

            {/* Why / Benefits */}
            {(program.whyTitle || program.whyIntro || whyBulletPoints.length) && (
              <section>
                <div className="text-neutral-600 space-y-4">
                  {program.whyTitle && (
                    <h2 className="text-2xl sm:text-3xl font-semibold font-playfair text-neutral-800 mb-3 sm:mb-4">
                      {program.whyTitle}
                    </h2>
                  )}
                  {program.whyIntro && <p className="leading-relaxed">{program.whyIntro}</p>}
                  {whyBulletPoints.length > 0 && (
                    <ul className="list-disc list-inside space-y-2 text-neutral-700">
                      {whyBulletPoints.map((p, i) => (
                        <li key={i}>
                          {p.label ? <span className="font-semibold">{p.label}: </span> : null}
                          {p.description}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>
            )}

            {curriculumForUI ? (
              <section id="curriculum">
                <CurriculumSection curriculum={curriculumForUI} />
              </section>
            ) : null}


            {/* Career */}
            {(program.careerIntro || careerBulletPoints.length) && (
              <section id="career" className="bg-neutral-100 py-8 px-4 sm:px-8 sm:py-12 lg:px-12 lg:py-20">
                <div className="max-w-5xl mx-auto space-y-6">
                  <h2 className="text-2xl sm:text-3xl font-playfair font-bold text-neutral-800">
                    Career Prospects
                  </h2>
                  {program.careerIntro && <p className="text-neutral-700 leading-relaxed">{program.careerIntro}</p>}
                  {careerBulletPoints.length > 0 && (
                    <ul className="list-disc list-inside space-y-3 text-neutral-800 leading-relaxed">
                      {careerBulletPoints.map((p, i) => (
                        <li key={i}>
                          {p.label ? <span className="font-semibold text-red-800">{p.label}: </span> : null}
                          {p.description}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>
            )}

            {/* Admission */}
            {Array.isArray(program.admission) && program.admission.length > 0 && (
              <section id="admission_requirements" className="pt-15 sm:pt-15 md:px-12 bg-white border-t border-neutral-200">
                <div className="max-w-5xl mx-auto space-y-6">
                  <h2 className="text-2xl sm:text-3xl font-playfair font-bold text-neutral-800">
                    Admission Requirements
                  </h2>
                  <ul className="list-disc list-inside space-y-3 text-neutral-800 leading-relaxed">
                    {arr<string | { label?: string; description?: string }>(program.admission).map((item, i) => {
                      if (typeof item === "string") return <li key={i}>{item}</li>;
                      if (item && typeof item === "object") {
                        return (
                          <li key={i}>
                            {item.label ? <span className="font-semibold">{item.label}: </span> : null}
                            {item.description}
                          </li>
                        );
                      }
                      return null;
                    })}
                  </ul>
                </div>
              </section>
            )}

            {/* CTA */}
            <section className="text-center pt-10 pb-5 sm:pt-16 border-t border-neutral-300">
              <h2 className="text-2xl sm:text-3xl font-playfair mb-4">Still exploring your path?</h2>
              <p className="text-neutral-600 mb-6">
                We offer a range of programs designed to shape tomorrow’s leaders.
              </p>
              <Link
                href="/study-programs"
                className="relative inline-block text-sm sm:text-base xl:px-8 xl:py-4 font-roboto text-white transition-colors duration-300 group overflow-hidden bg-red-800"
              >
                <span className="absolute inset-0 w-0 bg-neutral-800 transition-all duration-700 ease-out group-hover:w-full z-0"></span>
                <span className="relative z-10 capitalize whitespace-nowrap">View Programs</span>
              </Link>
            </section>
          </div>

          {/* RIGHT column (desktop) */}
          <aside className="hidden lg:block min-w-0 space-y-10 self-start sticky top-32">
            <div className="bg-white border border-neutral-200 shadow-sm p-6 space-y-4">
              <h3 className="text-lg font-playfair font-semibold text-red-800">Program Snapshot</h3>
              <table className="w-full text-md text-neutral-700">
                <tbody>
                  <tr>
                    <td className="py-2 text-neutral-500">Level</td>
                    <td className="py-2 text-right font-medium">{program.level.replaceAll("_", " ")}</td>
                  </tr>
                  <tr className="border-t border-neutral-200">
                    <td className="py-2 text-neutral-500">Duration</td>
                    <td className="py-2 text-right font-medium">{program.duration ?? "—"}</td>
                  </tr>
                  <tr className="border-t border-neutral-200">
                    <td className="py-2 text-neutral-500">Language</td>
                    <td className="py-2 text-right font-medium">{program.language ?? "—"}</td>
                  </tr>
                  <tr className="border-t border-neutral-200">
                    <td className="py-2 text-neutral-500">Tuition</td>
                    <td className="py-2 text-right font-medium">{program.tuition ?? "—"}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-6 bg-neutral-50 border border-neutral-200 shadow-sm">
              <h4 className="text-lg font-playfair font-semibold text-red-800 mb-4">Jump to Section</h4>
              <ul className="space-y-4 text-md text-neutral-700 leading-tight">
                {[
                  { href: "#program_overview", label: "Program Overview" },
                  { href: "#curriculum", label: "Curriculum" },
                  { href: "#career", label: "Career Prospects" },
                  { href: "#admission_requirements", label: "Admission" },
                ].map(({ href, label }) => (
                  <li key={href}>
                    <a
                      href={href}
                      className="flex items-center gap-2 text-md font-medium text-neutral-800 hover:text-red-800 transition"
                    >
                      <ArrowRight className="w-4 h-4 text-red-800" />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </PageWrapper>
  );
}
