import { notFound } from "next/navigation";
import { researchProjects } from "@/data/researchProjects";
import Link from "next/link";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ResearchDetailPage({ params }: any ) {
  const project = researchProjects.find((p) => p.slug === params.slug);
  if (!project) return notFound();

  return (
    <main className="max-w-4xl mx-auto px-6 py-16 space-y-10">
      <h1 className="text-3xl font-bold text-blue-950">{project.title}</h1>

      <div className="space-y-2 text-sm text-gray-700">
        <p><strong>Koordinator:</strong> {project.coordinator}</p>
        <p><strong>Fusha:</strong> {project.field}</p>
        <p><strong>Viti:</strong> {project.year}</p>
        <p><strong>Partnerë:</strong> {project.partners.join(", ")}</p>
      </div>

      <div className="text-gray-800 leading-relaxed">
        <p>{project.description}</p>
      </div>

      <div className="pt-6">
        <Link
          href="/research"
          className="inline-block px-5 py-2 bg-blue-950 text-white rounded-full text-sm hover:bg-blue-800 transition"
        >
          ← Kthehu te Kërkimet
        </Link>
      </div>
    </main>
  );
}


export async function generateStaticParams() {
  return researchProjects.map((s) => ({ slug: s.slug }));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function generateMetadata({ params }: any) {
  const project = researchProjects.find((s) => s.slug === params.slug);

  return {
    title: project?.title || "Research Project Not Found",
    description: project?.description || "Details of the research project.",
  };
}
