import { notFound } from "next/navigation";
import { allPrograms } from "@/data/allPrograms";
import { CurriculumSection } from "../_components/CurriculumSection";
import PageWrapper from "@/components/PageWrapper";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";

type PageProps = {
  params: { slug: string };
  searchParams?: { from?: string };
};

export default function ProgramDetailPage({ params, searchParams }: PageProps) {
  const program = allPrograms.find((p) => p.slug === params.slug);
  if (!program) notFound();

  // Safe "back" link: use only internal paths and default to /study-programs
  const rawFrom = searchParams?.from ?? "/study-programs";
  const from = rawFrom.startsWith("/") ? rawFrom : "/study-programs";

  return (
    <PageWrapper>
      <div className="text-neutral-800 space-y-15 sm:space-y-15 max-[640px]:space-y-15 ">
        {/* Back button */}
        <div className="flex flex-row items-center mb-10 gap-2 hover:text-red-800 text-sm text-neutral-600">
          <ArrowLeft className="w-4 h-4" />
          <Link href={from} className="inline-block">
            Back to Study Programs
          </Link>
        </div>

        <div className="text-neutral-800 space-y-15 sm:space-y-15 max-[640px]:space-y-15">
          {/* GRID */}
          <div className="grid w-full gap-12 lg:grid-cols-[2fr_1fr] overflow-x-clip">

            {/* LEFT COLUMN */}
              <div className="min-w-0 space-y-15 sm:space-y-15 max-[640px]:space-y-15">
             
              {/* OVERVIEW */}
              <section id="program_overview">
                <div className="flex flex-col gap-8 sm:gap-12">
                  <div className="relative w-full h-64 sm:h-[20rem] overflow-hidden shadow-md">
                    <Image
                      src="/images/departments/business-admn-img.jpg"
                      alt="Program image"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>

                  <div className="text-neutral-600">
                    <h2 className="text-2xl sm:text-3xl font-semibold font-playfair text-neutral-800 mb-3 sm:mb-4">
                      About the program
                    </h2>
                    <p className="leading-relaxed max-[425px]:text-sm text-base">{program.description}</p>
                  </div>
                </div>
              </section>

              {/* --- MOBILE/TABLET ONLY: Snapshot + Jump Links --- */}
              <div className="lg:hidden space-y-8 lg:border-t lg:border-neutral-200 lg:pt-6">
                {/* SUMMARY BOX */}
                <div className="bg-white border border-neutral-200 shadow-sm p-6 space-y-4">
                  <h3 className="text-lg font-playfair font-semibold text-red-800">Program Snapshot</h3>
                  <table className="w-full text-sm sm:text-base text-neutral-700">
                    <tbody>
                      <tr>
                        <td className="py-2 text-neutral-500">Level</td>
                        <td className="py-2 text-right font-medium">{program.level}</td>
                      </tr>
                      <tr className="border-t border-neutral-200">
                        <td className="py-2 text-neutral-500">Duration</td>
                        <td className="py-2 text-right font-medium">{program.duration || "3 years"}</td>
                      </tr>
                      <tr className="border-t border-neutral-200">
                        <td className="py-2 text-neutral-500">Language</td>
                        <td className="py-2 text-right font-medium">{program.language || "English"}</td>
                      </tr>
                      <tr className="border-t border-neutral-200">
                        <td className="py-2 text-neutral-500">Tuition</td>
                        <td className="py-2 text-right font-medium">{program.tuition || "1500 EUR/year"}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* JUMP LINKS */}
                <div className="p-6 bg-neutral-50 border border-neutral-200 shadow-sm">
                  <h4 className="text-lg font-playfair font-semibold text-red-800 mb-4">Jump to Section</h4>
                  <ul className="space-y-3 sm:space-y-4 text-sm sm:text-base text-neutral-700 leading-tight">
                    {[
                      { href: "#program_overview", label: "Program Overview", description: "What you’ll study and why it matters" },
                      { href: "#curriculum", label: "Curriculum", description: "Semester-by-semester breakdown" },
                      { href: "#career", label: "Career Prospects", description: "Where this program can take you" },
                      { href: "#admission_requirements", label: "Admission", description: "What you need to apply" },
                    ].map(({ href, label, description }) => (
                      <li key={href}>
                        <a href={href} className="flex items-center gap-2 font-medium text-neutral-800 hover:text-red-800 transition">
                          <ArrowRight className="w-4 h-4 text-red-800" />
                          {label}
                        </a>
                        <p className="pl-6 text-xs text-neutral-500">{description}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {/* --- /MOBILE ONLY SECTION --- */}

              {/* WHY / BENEFITS */}
              <section>
                <div className="text-neutral-600 space-y-4">
                  <h2 className="text-2xl sm:text-3xl font-semibold font-playfair text-neutral-800 mb-3 sm:mb-4">
                    {program.whyTitle}
                  </h2>
                  <p className="leading-relaxed max-[425px]:text-sm text-base">{program.whyIntro}</p>
                  {program.whyBulletPoints && (
                    <ul className="list-disc list-inside space-y-2 max-[425px]:text-sm text-base text-neutral-700">
                      {program.whyBulletPoints.map((point, index) => (
                        <li key={index}>
                          <span className="font-semibold">{point.label}:</span> {point.description}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>

              {/* CURRICULUM */}
              <section id="curriculum">
                <CurriculumSection curriculum={program.curriculum} />
              </section>

              {/* CAREER PROSPECTS */}
              <section id="career" className="bg-neutral-100 py-8 px-4 sm:px-8 sm:py-12 lg:px-12 lg:py-20 ">
                <div className="max-w-5xl mx-auto space-y-6 sm:space-y-10">
                  <h2 className="text-2xl sm:text-3xl font-playfair font-bold text-neutral-800">Career Prospects</h2>
                  <p className="text-neutral-700 leading-relaxed max-[425px]:text-sm text-base">{program.careerIntro}</p>
                  <ul className="list-disc list-inside space-y-3 sm:space-y-4 text-neutral-800 max-[425px]:text-sm text-base leading-relaxed">
                    {program.careerBulletPoints?.map((item, index) => (
                      <li key={index}>
                        <span className="font-semibold text-red-800">{item.label}:</span> {item.description}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* ADMISSION REQUIREMENTS */}
              <section id="admission_requirements" className="pt-15 sm:pt-15 md:px-12 bg-white border-t border-neutral-200">
                <div className="max-w-5xl mx-auto space-y-6 sm:space-y-10">
                  <h2 className="text-2xl sm:text-3xl font-playfair font-bold text-neutral-800">Admission Requirements</h2>

                  {Array.isArray(program.admission) ? (
                    <ul className="list-disc list-inside space-y-3 sm:space-y-4 text-neutral-800 max-[425px]:text-sm text-base leading-relaxed">
                      {program.admission.map((item, i) => {
                        if (typeof item === "string") return <li key={i}>{item}</li>;
                        if (typeof item === "object" && item.label && item.description) {
                          return (
                            <li key={i}>
                              <span className="font-semibold">{item.label}:</span> {item.description}
                            </li>
                          );
                        }
                        return null;
                      })}
                    </ul>
                  ) : typeof program.admission === "string" ? (
                    <p className="text-base text-neutral-700">{program.admission}</p>
                  ) : null}

                  {/* --- MOBILE/TABLET ONLY: Got Questions AFTER Admission --- */}
                  <div className="lg:hidden mt-6 sm:mt-10 bg-white border border-neutral-200 shadow-sm p-6 text-center space-y-3">
                    <h4 className="text-lg font-semibold text-red-800 font-playfair">Got Questions?</h4>
                    <p className="text-sm sm:text-base text-neutral-600">
                      Our admissions team is ready to guide you every step of the way.
                    </p>
                    <a
                      href="mailto:admissions@youruniversity.edu"
                      className="inline-block font-medium text-red-800 underline hover:text-red-900 transition"
                    >
                      admissions@youruniversity.edu
                    </a>
                  </div>
                  {/* --- /MOBILE ONLY --- */}
                </div>
              </section>
            </div>

            {/* DESKTOP ASIDE */}
            <aside className="hidden lg:block min-w-0 space-y-10 self-start sticky top-32">
              {/* SUMMARY BOX */}
              <div className="bg-white border border-neutral-200 shadow-sm p-6 space-y-4">
                <h3 className="text-lg font-playfair font-semibold text-red-800">Program Snapshot</h3>
                <table className="w-full text-md text-neutral-700">
                  <tbody>
                    <tr>
                      <td className="py-2 text-neutral-500">Level</td>
                      <td className="py-2 text-right font-medium">{program.level}</td>
                    </tr>
                    <tr className="border-t border-neutral-200">
                      <td className="py-2 text-neutral-500">Duration</td>
                      <td className="py-2 text-right font-medium">{program.duration || "3 years"}</td>
                    </tr>
                    <tr className="border-t border-neutral-200">
                      <td className="py-2 text-neutral-500">Language</td>
                      <td className="py-2 text-right font-medium">{program.language || "English"}</td>
                    </tr>
                    <tr className="border-t border-neutral-200">
                      <td className="py-2 text-neutral-500">Tuition</td>
                      <td className="py-2 text-right font-medium">{program.tuition || "1500 EUR/year"}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* NAVIGATION BOX */}
              <div className="p-6 bg-neutral-50 border border-neutral-200 shadow-sm">
                <h4 className="text-lg font-playfair font-semibold text-red-800 mb-4">Jump to Section</h4>
                <ul className="space-y-4 text-md text-neutral-700 leading-tight">
                  {[
                    { href: "#program_overview", label: "Program Overview", description: "What you’ll study and why it matters" },
                    { href: "#curriculum", label: "Curriculum", description: "Semester-by-semester breakdown" },
                    { href: "#career", label: "Career Prospects", description: "Where this program can take you" },
                    { href: "#admission_requirements", label: "Admission", description: "What you need to apply" },
                  ].map(({ href, label, description }) => (
                    <li key={href}>
                      <a href={href} className="flex items-center gap-2 text-md font-medium text-neutral-800 hover:text-red-800 transition">
                        <ArrowRight className="w-4 h-4 text-red-800" />
                        {label}
                      </a>
                      <p className="pl-6 text-xs text-neutral-500">{description}</p>
                    </li>
                  ))}
                </ul>
              </div>

               {/* CTA CONTACT BOX */}
              <div className="bg-white border border-neutral-200 shadow-sm p-6 text-center space-y-3">
                <h4 className="text-lg font-semibold text-red-800 font-playfair">Got Questions?</h4>
                <p className="text-md text-neutral-600">
                  Our admissions team is ready to guide you every step of the way.
                </p>
                <a
                  href="mailto:admissions@youruniversity.edu"
                  className="inline-block text-md font-medium text-red-800 underline hover:text-red-900 transition"
                >
                  admissions@youruniversity.edu
                </a>
              </div>

            </aside>
          </div>

          {/* CTA FINAL SECTION */}
          <section className="text-center pt-10 pb-5 sm:pt-16 border-t border-neutral-300">
            <h2 className="text-2xl sm:text-3xl font-playfair mb-4">Still exploring your path?</h2>
            <p className="text-neutral-600 mb-6 max-[425px]:text-sm text-base">
              We offer a range of programs designed to shape the leaders, creators, and problem-solvers of tomorrow.
            </p>
            <Link
              href="/study-programs"
              className="relative inline-block text-sm sm:text-base xl:px-8 xl:py-4 font-roboto text-white transition-colors duration-300 group overflow-hidden bg-red-800 mx-auto min-[881px]:mx-0 sm:px-6 sm:py-3 max-[640px]:py-3 max-[640px]:px-6"
            >
              <span className="absolute inset-0 w-0 bg-neutral-800 transition-all duration-700 ease-out group-hover:w-full z-0"></span>
              <span className="relative z-10 capitalize whitespace-nowrap">View Programs</span>
            </Link>
          </section>
        </div>
      </div>
    </PageWrapper>
  );
}

export function generateStaticParams() {
  return allPrograms.map((program) => ({ slug: program.slug }));
}
