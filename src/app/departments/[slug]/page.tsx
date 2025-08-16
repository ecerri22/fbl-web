import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { departmentsData } from "@/data/departmentsData";
import { Metadata } from "next";
import { Users } from "lucide-react";
import PageWrapper from "@/components/PageWrapper";
import DepartmentStaffSection from "@/app/staff/_components/DepartmentStaffSection";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function DepartmentPage({ params }: { params: any }) {
  const department = departmentsData.find((d) => d.slug === params.slug);
  if (!department) return notFound();

  return (
    <PageWrapper>
      <div className="text-neutral-800 space-y-15 sm:space-y-15 max-[640px]:space-y-15 ">

        {/* Header */}
        <section className="sm:text-center max-[640px]:text-center grid grid-cols-1 lg:grid-cols-[2fr_3fr] items-center gap-8 md:gap-12 pb-10 border-b border-neutral-300 md:justify-items-center sm:justify-items-center max-[640px]:justify-items-center">
          <h1 className="text-3xl font-semibold leading-tight font-playfair text-neutral-800 lg:text-start">
            {department.name}
          </h1>
          <p className="font-roboto text-neutral-600 sm:text-end leading-relaxed max-w-prose max-[425px]:text-sm text-base">
            {department.shortDescription}
          </p>
        </section>

        {/* About Section */}
        <section className="flex flex-col gap-12">
          {/* Image */}
          <div className="relative w-full h-[18rem] md:h-[20rem] overflow-hidden shadow-md">
            <Image
              src={department.image}
              alt={`Image of ${department.name}`}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Description */}
          <div className="text-neutral-500 inline max-[425px]:text-sm text-base">
            <p>{department.description}</p>
          </div>
        </section>

        {/* {department.whyStudy && (
          <section className="bg-neutral-100 p-8 shadow-sm text-neutral-800 font-roboto ">
            <h3 className="text-3xl font-playfair font-semibold mb-6 text-red-800">
              Why Choose <span className="capitalize">{department.name.split(" ")[2] || "This Field"}</span>?
            </h3>

            <ul className="list-inside space-y-5 text-lg leading-relaxed border-red-800">
              {department.whyStudy.split("\n").map((point, i) => (
                <li
                  key={i}
                  className="flex items-start gap-4 hover:text-red-800 transition-colors cursor-pointer border-red-800 pl-4 border-l-2"
                >
                  {point.trim()}
                </li>
              ))}
            </ul>
          </section>
        )} */}


        {/* Programs Section */}
        <section className="space-y-10">
          <h2 className="text-3xl font-semibold leading-tight font-playfair text-neutral-800 capitalize">
            List of Programs
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {department.programs.map(({ name, slug }) => (
              <div key={slug} className="w-full">
                <Link
                  href={`/study-programs/${slug}`}
                  className="block w-full overflow-hidden group"
                  aria-label={`Visit ${name}`}
                >
                  <Image
                    src={department.image}
                    alt={`Program: ${name}`}
                    width={300}
                    height={200}
                    className="object-cover w-full h-48 transition-transform duration-500 ease-in-out group-hover:scale-105"
                  />
                </Link>

                <Link
                  href={`/study-programs/${slug}`}
                  className="h-18 flex justify-between items-center w-full border border-neutral-100 border-t-0 px-3 py-2 text-sm font-roboto text-black transition-colors duration-300 hover:text-red-800 group"
                >
                  <span className="group-hover:underline max-[425px]:text-sm text-base group-hover:decoration-red-800">
                    {name}
                  </span>
                  <span className="transition-colors duration-300 group-hover:text-red-800">
                    →
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Staff Section */}
        {/* <section className="mt-16 space-y-12"> */}
           <DepartmentStaffSection staff={department.staff} />
        {/* </section> */}

        {/* CTA */}
        <section className="text-center pt-16 pb-5 border-t border-neutral-300 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-playfair mb-4 text-neutral-800">
            Ready to begin your journey in {department.name.split(" ")[2]}?
            </h2>
          <p className="text-neutral-600 mb-6 max-[425px]:text-sm text-base">
            Reach out to our team or visit the faculty to learn more about what we offer.
          </p>
          {/* {department.department_email && ( */}
            <a
              href={`mailto:${department.department_email}`}
              className="relative inline-block text-sm sm:text-base xl:px-8 xl:py-4 font-roboto text-white transition-colors duration-300 group overflow-hidden bg-red-800 mx-auto min-[881px]:mx-0 sm:px-6 sm:py-3 max-[640px]:py-3 max-[640px]:px-6"
            >
              <span className="absolute inset-0 w-0 bg-neutral-800 transition-all duration-700 ease-out group-hover:w-full z-0"></span>
              <span className="relative z-10 capitalize whitespace-nowrap">
                Contact the Department
              </span>
            </a>
          {/* )} */}

        </section>


      </div>
    </PageWrapper>
  );
}

export async function generateStaticParams() {
  return departmentsData.map((d) => ({ slug: d.slug }));
}

// export async function generateMetadata({
//   params,
// }: {
//   params: { slug: string };
// }): Promise<Metadata> {
//   const department = departments.find((d) => d.slug === params.slug);
//   return {
//     title: department?.name || "Departament i panjohur",
//     description:
//       department?.shortDescription || "Faqja e departamentit në FBL.",
//   };
// }
