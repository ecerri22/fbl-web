// app/study-programs/page.tsx
import Image from "next/image";
import Link from "next/link";
import PageWrapper from "@/components/PageWrapper";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic"; // don't pre-render at build; hit DB at request time
export const revalidate = 0;

const LEVEL_OPTIONS = [
  { label: "Bachelor", value: "BACHELOR" },
  { label: "Professional Master", value: "PROFESSIONAL_MASTER" },
  { label: "Master of Science", value: "MASTER_OF_SCIENCE" },
  { label: "Integrated Master", value: "INTEGRATED_MASTER" },
];

type PageProps = {
  searchParams?: { q?: string; dept?: string; level?: string };
};

export default async function StudyProgramsPage({ searchParams }: PageProps) {
  const q = (searchParams?.q ?? "").trim();
  const dept = searchParams?.dept ?? "";
  const level = searchParams?.level ?? "";

  const departments = await prisma.department.findMany({
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });

  const where: any = { AND: [] as any[] };

  if (q) {
    where.AND.push({
      OR: [
        { name: { contains: q, mode: "insensitive" } },
        { description: { contains: q, mode: "insensitive" } },
        { department: { name: { contains: q, mode: "insensitive" } } },
      ],
    });
  }

  if (dept) {
    where.AND.push({ department: { name: dept } });
  }

  if (level) {
    where.AND.push({ level });
  }

  const programs = await prisma.program.findMany({
    where: where.AND.length ? where : undefined,
    include: {
      department: { select: { name: true, image: true } },
    },
    orderBy: [{ department: { name: "asc" } }, { name: "asc" }],
  });

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
              defaultValue={level}
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
          <div className="text-neutral-500 text-sm">No programs match your filters.</div>
        )}
      </div>
    </PageWrapper>
  );
}
