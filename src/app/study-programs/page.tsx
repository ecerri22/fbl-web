import Image from "next/image";
import Link from "next/link";
import PageWrapper from "@/components/PageWrapper";
import { prisma } from "@/lib/prisma";
import type { Prisma, ProgramLevel } from "@prisma/client";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

const LEVEL_OPTIONS = [
  { label: "Bachelor", value: "BACHELOR" },
  { label: "Professional Master", value: "PROFESSIONAL_MASTER" },
  { label: "Master of Science", value: "MASTER_OF_SCIENCE" },
  { label: "Integrated Master", value: "INTEGRATED_MASTER" },
] as const;

function isProgramLevel(v: string): v is ProgramLevel {
  return (
    v === "BACHELOR" ||
    v === "PROFESSIONAL_MASTER" ||
    v === "MASTER_OF_SCIENCE" ||
    v === "INTEGRATED_MASTER"
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function StudyProgramsPage({ searchParams }: any) {
  const q = (searchParams?.q ?? "").trim();
  const dept = searchParams?.dept ?? "";
  const levelParam = searchParams?.level ?? "";
  const level: ProgramLevel | undefined = isProgramLevel(levelParam)
    ? levelParam
    : undefined;

  const filters: Prisma.ProgramWhereInput[] = [];

  if (q) {
    filters.push({
      OR: [
        { name: { contains: q, mode: "insensitive" } },
        { description: { contains: q, mode: "insensitive" } },
        { department: { name: { contains: q, mode: "insensitive" } } },
      ],
    });
  }

  if (dept) {
    filters.push({ department: { name: { equals: dept } } });
  }

  if (level) {
    filters.push({ level });
  }

  const where: Prisma.ProgramWhereInput | undefined =
    filters.length ? { AND: filters } : undefined;

  const [departments, programs] = await Promise.all([
    prisma.department.findMany({
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    }),
    prisma.program.findMany({
      where,
      include: { department: { select: { name: true, image: true } } },
      orderBy: [{ department: { name: "asc" } }, { name: "asc" }],
    }),
  ]);

  return (
    <PageWrapper>
      <div className="text-neutral-800 space-y-10 ">
        <h1 className="text-3xl font-semibold leading-tight font-playfair text-neutral-800 pb-10 border-b border-neutral-200 text-center lg:text-start">
          Academic Areas of Study
        </h1>

        <form className="flex flex-col lg:flex-row gap-6" method="GET">
          {/* Search */}
          <div className="w-full lg:w-1/2">
            <p className="text-xl font-playfair mb-2">Search Programs:</p>
            <input
              type="text"
              name="q"
              defaultValue={q}
              placeholder="Search programs..."
              className="w-full border border-neutral-200 px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-red-800"
            />
          </div>

          {/* Department */}
          <div className="w-full lg:w-1/4">
            <p className="text-xl font-playfair mb-2">Department:</p>
            <select
              name="dept"
              defaultValue={dept}
              className="w-full border border-neutral-200 px-4 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-red-800"
            >
              <option value="">All Departments</option>
              {departments.map((d) => (
                <option key={d.id} value={d.name}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          {/* Program Level */}
          <div className="w-full lg:w-1/4">
            <p className="text-xl font-playfair mb-2">Program Level:</p>
            <select
              name="level"
              defaultValue={levelParam}
              className="w-full border border-neutral-200 px-4 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-red-800"
            >
              <option value="">All Levels</option>
              {LEVEL_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </form>

        {/* Results */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {programs.map((program) => {
            const img =
              program.image ||
              program.department?.image ||
              "/images/programs/default.webp";
            return (
              <div key={program.slug} className="w-full">
                <Link
                  href={`/study-programs/${program.slug}`}
                  className="block w-full overflow-hidden group"
                >
                  <Image
                    src={img}
                    alt={program.name}
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

        {programs.length === 0 && (
          <div className="text-neutral-500 text-sm">
            No programs match your filters.
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
