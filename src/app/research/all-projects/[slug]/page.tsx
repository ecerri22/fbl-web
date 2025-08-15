import { notFound } from "next/navigation";
import { researchProjects } from "@/data/researchProjects";
import Link from "next/link";
import PageWrapper from "@/components/PageWrapper";
import { ArrowLeft } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ResearchDetailPage({ params, searchParams}: any ) {

  const project = researchProjects.find((p) => p.slug === params.slug);
  if (!project) return notFound();

  const backHref =
    searchParams.from === "all-projects" ? "/research/all-projects" : "/research";
  const backLabel =
    searchParams.from === "all-projects" ? "Back to All Projects" : "Back to Research";

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
        <h1 className="text-3xl font-playfair font-semibold max-[640px]:text-center text-start">{project.title}</h1>

        {/* Project Info */}
        <section className="space-y-1 text-md text-neutral-600">
          <p>
            <strong className="text-red-800">Coordinator:</strong> {project.coordinator}
          </p>
          <p>
            <strong className="text-red-800">Field:</strong> {project.field}
          </p>
          <p>
            <strong className="text-red-800">Year:</strong> {project.year}
          </p>
          {!!project.partners?.length && (
            <p>
              <strong className="text-red-800">Partners:</strong>{" "}
              {project.partners.join(", ")}
            </p>
          )}
        </section>

        {/* Description */}
        <section className="prose max-w-none text-neutral-700 leading-relaxed">
          <p>{project.description}</p>
        </section>
      </main>
    </PageWrapper>
  );
}

export async function generateStaticParams() {
  return researchProjects.map((s) => ({ slug: s.slug }));
}
