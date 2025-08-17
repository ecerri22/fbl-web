// app/research/all-projects/page.tsx
import Link from "next/link";
import PageWrapper from "@/components/PageWrapper";
import { prisma } from "@/lib/prisma";
import AllProjectsClient from "./AllProjectsClient";

export const runtime = "nodejs";
export const revalidate = 60; // ISR

export default async function AllProjectsPage() {
  const projects = await prisma.researchProject.findMany({
    select: {
      slug: true,
      title: true,
      coordinator: true,
      year: true,
      field: true,
    },
    orderBy: [{ year: "desc" }, { title: "asc" }],
  });

  return (
    <PageWrapper>
      <main className="text-neutral-800 ">
        {/* Header */}
        <div className="flex flex-col items-start sm:pb-10 border-b border-neutral-200 sm:flex-row sm:items-center sm:justify-between max-[640px]:gap-8 max-[640px]:pb-8">
          <Link
            href="/research"
            className="order-1 sm:order-2 inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-red-800 transition-colors "
          >
            {/* arrow will be rendered inside client too if you prefer; leaving simple text here */}
            ← Back to Research
          </Link>

          <h1 className="order-2 sm:order-1 text-2xl sm:text-3xl font-playfair font-semibold max-[640px]:text-center">
            All Research Projects
          </h1>
        </div>

        {/* Client-side filters + grid */}
        <AllProjectsClient projects={projects} />
      </main>
    </PageWrapper>
  );
}
