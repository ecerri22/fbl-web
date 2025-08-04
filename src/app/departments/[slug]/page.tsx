import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { departmentsData } from "@/data/departmentsData";
import { Metadata } from "next";
import { Users } from "lucide-react";
import PageWrapper from "@/components/PageWrapper";
import DepartmentStaffSection from "@/app/staff/_components/DepartmentStaffSection";

export default function DepartmentPage({ params }: { params: { slug: string } }) {
  const department = departmentsData.find((d) => d.slug === params.slug);
  if (!department) return notFound();

  return (
    <PageWrapper>
      <main className="text-neutral-800 min-h-screen max-w-7xl mx-auto space-y-24 px-6 md:px-0 py-10">

        {/* Header */}
        <section className="flex flex-row justify-between w-full items-center pb-10 border-b border-neutral-300">
          <h1 className="text-3xl font-semibold leading-tight font-playfair text-neutral-800">
            {department.name}
          </h1>
          <p className="font-roboto text-neutral-500">
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
          <div className="text-neutral-500 inline">
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
                  href={`/programs/${slug}`}
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
                  href={`/programs/${slug}`}
                  className="h-18 flex justify-between items-center w-full border border-neutral-100 border-t-0 px-3 py-2 text-sm font-roboto text-black transition-colors duration-300 hover:text-red-800 group"
                >
                  <span className="group-hover:underline text-base group-hover:decoration-red-800">
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
        <section className="text-center pt-16 border-t border-neutral-300 space-y-4">
          <h2 className="text-2xl font-playfair font-semibold text-neutral-800">
            Ready to begin your journey in {department.name.split(" ")[2]}?
            </h2>
          <p className="text-neutral-600">
            Reach out to our team or visit the faculty to learn more about what we offer.
          </p>
          {/* {department.department_email && ( */}
            <a
              href={`mailto:${department.department_email}`}
              className="relative inline-block px-8 py-4 font-roboto text-white overflow-hidden bg-red-800 group"
            >
              <span className="absolute inset-0 w-0 bg-neutral-800 transition-all duration-700 ease-out group-hover:w-full z-0"></span>
              <span className="relative z-10 whitespace-nowrap">
                Contact the Department
              </span>
            </a>
          {/* )} */}

        </section>


      </main>
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
