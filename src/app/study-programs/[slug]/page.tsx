import { notFound } from "next/navigation";
import { allPrograms } from "@/data/allPrograms";
import { CurriculumSection } from "../_components/CurriculumSection";
import PageWrapper from "@/components/PageWrapper";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function ProgramDetailPage({ params }: any) {
    const { slug } = params; 
  const program = findProgramBySlug(slug);
  if (!program) return notFound();

  return (
    <PageWrapper>
      <main className="text-neutral-800 min-h-screen max-w-7xl mx-auto space-y-24 px-6 md:px-0 py-10">

        {/* GRID */}
        <div className="grid lg:grid-cols-[2fr_1fr] gap-12">

          {/* LEFT COLUMN */}
          <div className="space-y-24">

            {/* OVERVIEW */}
            <section id="program_overview">
              <div className="flex flex-col gap-12">
                <div className="relative w-full h-[20rem] overflow-hidden rounded shadow-md">
                  <Image
                    src="/images/departments/business-admn-img.jpg"
                    alt="Program image"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                <div className="text-neutral-500">
                  <h2 className="text-2xl font-semibold font-playfair text-neutral-800 mb-4">
                    About the program
                  </h2>
                  <p>{program.description}</p>
                </div>


              </div>
            </section>

            <section>
              <div className="text-neutral-500 space-y-4">
                <h2 className="text-2xl font-semibold font-playfair text-neutral-800 mb-4">
                  {program.whyTitle}
                </h2>
                <p className="text-base leading-relaxed">
                  {program.whyIntro}
                </p>
                {program.whyBulletPoints && (
                  <ul className="list-disc list-inside space-y-2 text-base text-neutral-700">
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

            {/* FUTURE PATHS */}
            <section id="future_build" className="space-y-12">
              <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-2xl font-playfair font-bold text-neutral-800">
                  What Future Will You Build?
                </h2>
                <p className="mt-2 text-neutral-600 text-md">
                  {program.futureIntro}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 text-neutral-700">
                {program.future?.map((item, i) => (
                  <div
                    key={i}
                    className="bg-white border border-neutral-200 p-6 shadow hover:shadow-md transition"
                  >
                    <h3 className="text-lg font-semibold text-red-800 mb-2">{item.title}</h3>
                    <p>{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="text-center pt-6">
                <p className="text-lg text-neutral-700">
                  <p>You&apos;re not just earning a degree</p> 

                  <span className="font-semibold text-red-800">
                    You&apos;re preparing to lead, innovate, and make an impact.
                  </span>
                </p>
              </div>
            </section>

            {/* CAREER PROSPECTS */}
            <section id="career" className="bg-neutral-50 py-20 px-6 md:px-12">
              <div className="max-w-5xl mx-auto space-y-10">
                <h2 className="text-2xl font-playfair font-bold text-neutral-800">
                  Career Prospects
                </h2>
                <p className="text-neutral-700 text-md leading-relaxed">
                  {program.careerIntro}
                </p>
                <ul className="list-disc list-inside space-y-4 text-neutral-800 text-base leading-relaxed">
                  {program.careerBulletPoints?.map((item, index) => (
                    <li key={index}>
                      <span className="font-semibold text-red-800">{item.label}:</span> {item.description}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* ADMISSION REQUIREMENTS */}
            <section id="admission_requirements" className="py-20 px-6 md:px-12 bg-white border-t border-neutral-200">
              <div className="max-w-5xl mx-auto space-y-10">
                <h2 className="text-2xl font-playfair font-bold text-neutral-800">
                  Admission Requirements
                </h2>

                {Array.isArray(program.admission) ? (
                  <ul className="list-disc list-inside space-y-4 text-neutral-800 text-base leading-relaxed">
                    {program.admission.map((item, i) => {
                      if (typeof item === "string") {
                        return <li key={i}>{item}</li>;
                      } else if (typeof item === "object" && item.label && item.description) {
                        return (
                          <li key={i}>
                            <span className="font-semibold">{item.label}:</span> {item.description}
                          </li>
                        );
                      } else {
                        return null; 
                      }
                    })}
                  </ul>
                ) : typeof program.admission === "string" ? (
                  <p className="text-base text-neutral-700">{program.admission}</p>
                ) : null}
              </div>
            </section>

          </div>

          <aside className="space-y-10 self-start sticky top-32 hidden lg:block">

            {/* SUMMARY BOX */}
            <div className="bg-white border border-neutral-200 shadow-sm p-6 space-y-4">
              <h3 className="text-lg font-playfair font-semibold text-red-800">Program Snapshot</h3>
              <table className="w-full text-md text-neutral-700">
                <tbody>
                  <tr className="border-neutral-200">
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
                  {
                    href: "#program_overview",
                    label: "Program Overview",
                    description: "What you’ll study and why it matters",
                  },
                  {
                    href: "#curriculum",
                    label: "Curriculum",
                    description: "Semester-by-semester breakdown",
                  },
                  {
                    href: "#career",
                    label: "Career Prospects",
                    description: "Where this program can take you",
                  },
                  {
                    href: "#future_build",
                    label: "Future Paths",
                    description: "What kind of professional you’ll become",
                  },
                  {
                    href: "#admission_requirements",
                    label: "Admission",
                    description: "What you need to apply",
                  },
                ].map(({ href, label, description }) => (
                  <li key={href}>
                    <a
                      href={href}
                      className="flex items-center gap-2 text-md font-medium text-neutral-800 hover:text-red-800 transition"
                    >
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

            {/* APPLY BUTTON */}
            <Link
              href="/apply"
              className="relative text-center block px-8 py-4 font-roboto text-white bg-red-800 group transition"
            >
              <span className="absolute inset-0 w-0 bg-neutral-800 transition-all duration-700 ease-out group-hover:w-full z-0"></span>
              <span className="relative z-10">Apply now</span>
            </Link>

          </aside>

        </div>

        {/* CTA FINAL SECTION */}
        <section className="text-center pt-16 border-t border-neutral-300">
          <h2 className="text-2xl font-playfair mb-4">Still exploring your path?</h2>
          <p className="text-neutral-600 mb-6">We offer a range of programs designed to shape the leaders, creators, and problem-solvers of tomorrow.</p>
          <Link
            href="/study-programs"
            className="relative inline-block px-8 py-4 font-roboto text-white bg-red-800 group transition"
          >
            <span className="absolute inset-0 w-0 bg-neutral-800 transition-all duration-700 ease-out group-hover:w-full z-0"></span>
            <span className="relative z-10">View Programs</span>
          </Link>
        </section>

      </main>
    </PageWrapper>
  );
}

function findProgramBySlug(slug: string) {
  return allPrograms.find((p) => p.slug === slug) || null;
}

export async function generateStaticParams() {
  return allPrograms.map((program) => ({
    slug: program.slug,
  }));
}
