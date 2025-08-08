import { notFound } from "next/navigation";
import { staffMembers } from "@/data/staffData";
import PageWrapper from "@/components/PageWrapper";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function StaffDetailPage({ params }: { params: any }) {
  const staff = staffMembers.find((s) => s.slug === params.slug);
  if (!staff) return notFound();

  return (
    <PageWrapper>
      <main className="text-neutral-800 min-h-screen max-w-7xl mx-auto space-y-24 px-6 md:px-0 py-10">
        <section className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12 mb-12">
            {/* LEFT: Image + Contact Info */}
            <div className="w-full md:w-1/3 flex flex-col items-center gap-12">
              {/* Staff Image */}
              <div className="relative w-full h-96 overflow-hidden shadow">
                <Image
                  src={staff.photo || "/images/default-profile-icon-6.jpg"}
                  alt={staff.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Contact Info */}
              <div className="w-full space-y-6 text-sm text-neutral-500">
                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 flex items-center justify-center border border-neutral-200">
                    <Mail size={18} className="text-neutral-600" />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <p className="text-md font-semibold text-red-800">Email Address</p>
                    <a
                      href={`mailto:${staff.email}`}
                      className="hover:underline text-neutral-600 break-all"
                    >
                      {staff.email}
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 flex items-center justify-center border border-neutral-200">
                    <Phone size={18} className="text-neutral-600" />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <p className="text-md font-semibold text-red-800">Office Phone</p>
                    <span className="text-neutral-600">{staff.office_phone}</span>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 flex items-center justify-center border border-neutral-200">
                    <MapPin size={18} className="text-neutral-600" />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <p className="text-md font-semibold text-red-800">Office</p>
                    <span className="text-neutral-600">{staff.office}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: Title, Bio, Content */}
            <div className="flex-1">
              {/* Title, Name, Bio */}
              <div className="space-y-6 ">
                <p className="text-sm text-red-700 uppercase tracking-wide">{staff.title}</p>
                <h1 className="text-3xl font-bold text-neutral-800 font-playfair">{staff.name}</h1>
                <p className="text-neutral-500">{staff.bio}</p>
              </div>

              {/* Areas of Expertise */}
              {staff.expertise.length > 0 && (
                <section className="pt-10 pb-8 border-b border-neutral-200">
                  <h2 className="text-2xl text-neutral-800 font-playfair mb-5 uppercase tracking-wide">
                    Areas of Expertise
                  </h2>
                  <p className="text-neutral-500">{staff.expertise.join(", ")}</p>
                </section>
              )}

              {/* Courses */}
              {staff.courses.length > 0 && (
                <section className="pt-10 pb-8 border-b border-neutral-200">
                  <h2 className="text-2xl font-semibold text-neutral-800 font-playfair mb-5 uppercase tracking-wide">
                    Courses
                  </h2>
                  <ul className="list-inside space-y-5 text-red-800">
                    {staff.courses.map((course, i) => (
                      <li key={i}>
                        {course}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Publications */}
              {staff.publications.length > 0 && (
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
      </main>
    </PageWrapper>
  );
}

export async function generateStaticParams() {
  return staffMembers.map((s) => ({ slug: s.slug }));
}
