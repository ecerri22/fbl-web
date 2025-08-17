import { notFound } from "next/navigation";
import Link from "next/link";
import PageWrapper from "@/components/PageWrapper";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const revalidate = 60; 


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function ResearchDetailPage({ params, searchParams }: any) {
  const project = await prisma.researchProject.findUnique({
    where: { slug: params.slug },
    select: {
      slug: true,
      title: true,
      coordinator: true,
      field: true,
      year: true,
      partners: true,      
      description: true,
    },
  });

  if (!project) return notFound();

  const fromParam = Array.isArray(searchParams?.from)
    ? searchParams?.from[0]
    : searchParams?.from;

  const backHref = fromParam === "all-projects" ? "/research/all-projects" : "/research";
  const backLabel = fromParam === "all-projects" ? "Back to All Projects" : "Back to Research";

  return (
    <PageWrapper>
      <main className="text-neutral-800 space-y-8 md:space-y-10 sm:space-y-10 max-[640px]:space-y-8">
        {/* Back link */}
        <div>
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-red-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {backLabel}
          </Link>
        </div>

        {/* Title */}
        <h1 className="sm:text-3xl max-[425px]:text-2xl font-playfair font-semibold max-[640px]:text-center text-start">
          {project.title}
        </h1>

        {/* Project Info */}
        <section className="space-y-1 text-neutral-600 max-[425px]:text-sm text-base">
          {project.coordinator && (
            <p>
              <strong className="text-red-800">Coordinator:</strong> {project.coordinator}
            </p>
          )}
          {project.field && (
            <p>
              <strong className="text-red-800">Field:</strong> {project.field}
            </p>
          )}
          <p>
            <strong className="text-red-800">Year:</strong> {project.year ?? "—"}
          </p>
          {!!project.partners?.length && (
            <p>
              <strong className="text-red-800">Partners:</strong>{" "}
              {project.partners.join(", ")}
            </p>
          )}
        </section>

        {/* Description */}
        {project.description && (
          <section className="prose max-w-none text-neutral-700 leading-relaxed max-[425px]:text-sm text-base">
            <p>{project.description}</p>
          </section>
        )}
      </main>
    </PageWrapper>
  );
}

export async function generateStaticParams() {
  const rows = await prisma.researchProject.findMany({
    select: { slug: true },
  });
  return rows.map((r) => ({ slug: r.slug }));
}
