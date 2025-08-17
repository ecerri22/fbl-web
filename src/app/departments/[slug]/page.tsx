import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import PageWrapper from "@/components/PageWrapper";
import DepartmentStaffSection from "@/app/staff/_components/DepartmentStaffSection";
import { prisma } from "@/lib/prisma";

const DEPT_FALLBACK_SVG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 630'>
       <rect width='100%' height='100%' fill='#f3f4f6'/>
       <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle'
             font-family='Arial, sans-serif' font-size='40' fill='#6b7280'>
         No image available
       </text>
     </svg>`
  );

export const runtime = "nodejs";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function DepartmentPage({ params }: { params: any }) {
  const department = await prisma.department.findUnique({
    where: { slug: params.slug },
    include: {
      programs: {
        orderBy: { name: "asc" },
        select: { name: true, slug: true },
      },
      staff: {
        orderBy: { name: "asc" },
        select: {
          name: true,
          slug: true,
          title: true,
          isFullTime: true, 
          photoUrl: true,   
          email: true,
          office: true,
        },
      },
    },
  });

  if (!department) return notFound();

  return (
    <PageWrapper>
      <div className="text-neutral-800 space-y-15 sm:space-y-15 max-[640px]:space-y-15 ">

        {/* Header */}
        <section
          className="
            grid grid-cols-1 gap-6 md:gap-8
            justify-items-center text-center
            pb-10 border-b border-neutral-300
            lg:grid-cols-[2fr_3fr] lg:items-center lg:gap-12
            lg:justify-items-stretch lg:text-left
          "
        >
          <h1
            className="
              text-3xl font-semibold leading-tight font-playfair text-neutral-800
              lg:text-start lg:justify-self-start
            "
          >
            {department.name}
          </h1>

          <p
            className="
              font-roboto text-neutral-600 leading-relaxed max-w-prose
              max-[425px]:text-sm text-base
              lg:text-right lg:justify-self-end
            "
          >
            {department.shortDescription}
          </p>
        </section>



        {/* About Section */}
        <section className="flex flex-col gap-12">
          {/* Image */}
          <div className="relative w-full h-[18rem] md:h-[20rem] overflow-hidden shadow-md">
            <Image
              src={
                department.image && department.image.trim() !== ""
                  ? department.image
                  : DEPT_FALLBACK_SVG
              }
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
                    src={
                      department.image && department.image.trim() !== ""
                        ? department.image
                        : DEPT_FALLBACK_SVG
                    }
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
        <DepartmentStaffSection 
          staff={department.staff.map((s) => ({
            name: s.name,
            title: s.title ?? "",
            slug: s.slug,
            fullTime: !!s.isFullTime,               
            email: s.email ?? "",
            office: s.office ?? "",
            imgSrc: s.photoUrl ?? undefined, 
          }))}
         />

        {/* CTA */}
        <section className="text-center pt-16 pb-5 border-t border-neutral-300 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-playfair mb-4 text-neutral-800">
            Ready to begin your journey in {department.name.split(" ")[2]}?
            </h2>
          <p className="text-neutral-600 mb-6 max-[425px]:text-sm text-base">
            Reach out to our team or visit the faculty to learn more about what we offer.
          </p>
            <a
              // href={`mailto:${department.department_email}`}
              href="#"
              className="relative inline-block text-sm sm:text-base xl:px-8 xl:py-4 font-roboto text-white transition-colors duration-300 group overflow-hidden bg-red-800 mx-auto min-[881px]:mx-0 sm:px-6 sm:py-3 max-[640px]:py-3 max-[640px]:px-6"
            >
              <span className="absolute inset-0 w-0 bg-neutral-800 transition-all duration-700 ease-out group-hover:w-full z-0"></span>
              <span className="relative z-10 capitalize whitespace-nowrap">
                Contact the Department
              </span>
            </a>

        </section>


      </div>
    </PageWrapper>
  );
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const rows = await prisma.department.findMany({
    select: { slug: true },
    orderBy: { name: "asc" },
  });
  return rows.map((d) => ({ slug: d.slug }));
}
