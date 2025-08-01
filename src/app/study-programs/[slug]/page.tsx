import { notFound } from "next/navigation";
import { allPrograms } from "@/data/allPrograms";
import { CurriculumSection } from "../_components/CurriculumSection";
import { GraduationCap, Briefcase, Info, BookOpen, ArrowRight } from "lucide-react";
import { type Metadata } from "next";

type PageProps = {
  params: {
    slug: string;
  };
};


export default async function ProgramDetailPage({ params }: PageProps) {
  const program = findProgramBySlug(params.slug);
  if (!program) return notFound();

  return (
    <main className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-950 to-red-700 text-white py-24 px-6 md:px-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{program.name}</h1>
          <div className="flex flex-wrap justify-center gap-4 text-sm font-medium">
            <span className="bg-white/20 px-4 py-1 rounded-full uppercase tracking-wide">
              {program.level}
            </span>
            <span className="bg-white/20 px-4 py-1 rounded-full uppercase tracking-wide">
              {program.department}
            </span>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 md:px-20 py-16 space-y-20">
        <Section title="Overview" icon={<Info className="text-blue-950 w-6 h-6" />}>
          <p className="text-zinc-700 leading-relaxed">
            {program.description ||
              "This program equips students with a strong foundation in theory and practical skills to excel in today's dynamic professional environment. More detailed information will be provided soon."}
          </p>
        </Section>

        <Section title="Why Choose This Program" icon={<GraduationCap className="text-blue-950 w-6 h-6" />}>
            <p className="text-zinc-700 leading-relaxed">
                {program.why || "Informacioni do të shtohet së shpejti."}
            </p>
        </Section>

        <Section title="Career Prospects" icon={<Briefcase className="text-blue-950 w-6 h-6" />}>
            <p className="text-zinc-700 leading-relaxed">
                {program.career || "Informacioni do të shtohet së shpejti."}
            </p>
        </Section>

        <Section title="Admission Requirements" icon={<ArrowRight className="text-blue-950 w-6 h-6" />}>
            <p className="text-zinc-700 leading-relaxed">
                {program.admission || "Informacioni do të shtohet së shpejti."}
            </p>
        </Section>

        <CurriculumSection curriculum={program.curriculum} />
      </div>
    </main>
  );
}

function Section({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <section>
      <div className="flex items-center gap-2 mb-6">
        {icon}
        <h2 className="text-xl font-bold text-blue-950">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function findProgramBySlug(slug: string) {
  return allPrograms.find(p => p.slug === slug) || null;
}
