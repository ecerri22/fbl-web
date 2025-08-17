import { notFound } from "next/navigation";
import PageWrapper from "@/components/PageWrapper";
import Image from "next/image";
import { ArrowLeft, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import fs from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";
export const revalidate = 60;

async function resolveStaffImage(slug: string): Promise<string> {
  const exts = [".webp", ".jpg", ".jpeg", ".png"];
  for (const ext of exts) {
    const fileName = `${slug}${ext}`;
    const webPath = `/images/staff/${fileName}`;                
    const fsPath  = path.join(process.cwd(), "public", "images", "staff", fileName); 
    try {
      await fs.access(fsPath);
      return webPath;
    } catch {
    }
  }
  return "/images/default-profile-icon-6.webp";
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function StaffDetailPage({ params, searchParams }: any) {
  const staff = await prisma.staff.findUnique({
    where: { slug: params.slug },
    select: {
      name: true,
      slug: true,
      title: true,
      bio: true,
      email: true,
      office: true,
      officePhone: true,
      photoUrl: true,   
      expertise: true,
      courses: { select: { id: true, title: true, credits: true } },
      publications: true,
    },
  });

  if (!staff) return notFound();

  const fromParam = Array.isArray(searchParams?.from) ? searchParams.from[0] : searchParams?.from;
  const from = typeof fromParam === "string" && fromParam.startsWith("/") ? fromParam : "/departments";

  const imgSrc = await resolveStaffImage(staff.slug);

  return (
    <PageWrapper>
      <div className="text-neutral-800 space-y-16 md:space-y-20 sm:space-y-20 max-[640px]:space-y-15">
        <section className="max-w-5xl mx-auto">
          {/* Back button */}
          <div className="flex flex-row items-center mb-10 gap-2 hover:text-red-800 text-sm text-neutral-600">
            <ArrowLeft className="w-4 h-4" />
            <Link href={from} className="inline-block">
              Back to Department Page
            </Link>
          </div>

          <div className="flex flex-col md:flex-row gap-12 mb-12">
            {/* LEFT: Image + Contact Info */}
            <div className="w-full md:w-1/3 flex flex-col items-center gap-12">
              <div className="relative overflow-hidden shadow w-full max-w-xs aspect-[4/5] md:aspect-[3/4]">
                <Image
                  src={imgSrc}
                  alt={staff.name}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 90vw"
                  className="object-cover object-top"
                  priority
                />
              </div>

              <div className="w-full space-y-6 text-sm text-neutral-500">
                {staff.email && (
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 flex items-center justify-center border border-neutral-200">
                      <Mail size={18} className="text-neutral-600" />
                    </div>
                    <div className="flex flex-col space-y-1">
                      <p className="text-md font-semibold text-red-800">Email Address</p>
                      <a href={`mailto:${staff.email}`} className="hover:underline text-neutral-600 break-all">
                        {staff.email}
                      </a>
                    </div>
                  </div>
                )}

                {staff.officePhone && (
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 flex items-center justify-center border border-neutral-200">
                      <Phone size={18} className="text-neutral-600" />
                    </div>
                    <div className="flex flex-col space-y-1">
                      <p className="text-md font-semibold text-red-800">Office Phone</p>
                      <span className="text-neutral-600">{staff.officePhone}</span>
                    </div>
                  </div>
                )}

                {staff.office && (
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 flex items-center justify-center border border-neutral-200">
                      <MapPin size={18} className="text-neutral-600" />
                    </div>
                    <div className="flex flex-col space-y-1">
                      <p className="text-md font-semibold text-red-800">Office</p>
                      <span className="text-neutral-600">{staff.office}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT: Title, Bio, Content */}
            <div className="flex-1">
              <div className="space-y-6">
                {staff.title && <p className="text-sm text-red-700 uppercase tracking-wide">{staff.title}</p>}
                <h1 className="text-3xl font-bold text-neutral-800 font-playfair">{staff.name}</h1>
                {staff.bio && <p className="text-neutral-500">{staff.bio}</p>}
              </div>

              {staff.expertise && staff.expertise.length > 0 && (
                <section className="pt-10 pb-8 border-b border-neutral-200">
                  <h2 className="text-2xl text-neutral-800 font-playfair mb-5 uppercase tracking-wide">
                    Areas of Expertise
                  </h2>
                  <p className="text-neutral-500">{staff.expertise.join(", ")}</p>
                </section>
              )}

              {staff.courses && staff.courses.length > 0 && (
                <section className="pt-10 pb-8 border-b border-neutral-200">
                  <h2 className="text-2xl font-semibold text-neutral-800 font-playfair mb-5 uppercase tracking-wide">
                    Courses
                  </h2>
                  <ul className="list-inside space-y-5 text-red-800">
                    {staff.courses.map((c) => (
                      <li key={c.id}>{c.title}</li>
                    ))}
                  </ul>
                </section>
              )}

              {staff.publications && staff.publications.length > 0 && (
                <section className="pt-10">
                  <h2 className="text-2xl font-semibold text-neutral-800 font-playfair mb-5 uppercase tracking-wide">
                    Publications
                  </h2>
                  <ul className="list-inside space-y-5 text-neutral-500">
                    {staff.publications.map((pub, i) => (
                      <li key={i}>{pub}</li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          </div>
        </section>
      </div>
    </PageWrapper>
  );
}

export async function generateStaticParams() {
  const rows = await prisma.staff.findMany({ select: { slug: true } });
  return rows.map((s) => ({ slug: s.slug }));
}
