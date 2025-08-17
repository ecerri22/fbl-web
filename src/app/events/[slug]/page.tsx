import Image from "next/image";
import { notFound } from "next/navigation";
import { CalendarDays, Clock, MapPin, User, Mail, Phone, Link as LinkIcon, Tag, CheckCircle2 } from "lucide-react";
import PageWrapper from "@/components/PageWrapper";
import BackBar from "@/components/BackBar";
import { prisma } from "@/lib/prisma";
import { Suspense } from "react";

export const runtime = "nodejs";

type MaybeTime = { time?: string | null };

type Highlight = { title: string; text: string };
type Organizer = { name?: string; role?: string; phone?: string; email?: string; website?: string };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function EventDetailPage({ params }: any) {
  const event = await prisma.event.findUnique({
    where: { slug: params.slug },
  });

  if (!event) return notFound();

  const content = (event.content as string[] | null) ?? [];
  const highlights = (event.highlights as Highlight[] | null) ?? [];
  const categories = event.categories ?? [];
  const organizer = (event.organizer as Organizer | null) ?? {};
  const time = (event as MaybeTime).time ?? undefined; 
  const img = event.image ?? "/images/news/fakulteti-ekonomik-uniel.webp";
  const dt = formatDate(event.date);

  return (
    <PageWrapper>
      <div className="text-neutral-800">
        <Suspense>
          <BackBar
            defaultHref="/events"
            defaultLabel="Back to Events"
            allHref="/events"
            allLabel="See all events"
          />
        </Suspense>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight font-playfair">{event.title}</h1>

        <section className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-10">
            <div className="relative aspect-[16/9]">
              <Image
                src={img}
                alt={event.title}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 896px, (min-width: 640px) 640px, 100vw"
              />
            </div>

            <article className="space-y-6">
              <p className="leading-relaxed text-neutral-700 border-l-4 border-red-800/70 pl-4 py-1 bg-red-50/40">
                {event.description ?? "Details coming soon."}
              </p>

              {content.length > 0 && (
                <div className="prose max-w-none">
                  {content.map((para, i) => (
                    <p key={i} className="pb-5 leading-relaxed">{para}</p>
                  ))}
                </div>
              )}

              {highlights.length > 0 && (
                <section className="space-y-4">
                  <h3 className="text-xl font-playfair">Highlights</h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {highlights.map((h, i) => (
                      <li key={`${i}-${h.title}`} className="rounded border border-neutral-200 p-4 hover:shadow-sm transition">
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-red-800 mt-0.5 shrink-0" />
                          <div>
                            <div className="font-medium">{h.title}</div>
                            <p className="text-sm text-neutral-700 mt-1">{h.text}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </article>
          </div>

          <aside className="lg:col-span-4 space-y-6">
            <div className="border border-neutral-200 bg-white shadow-sm">
              <div className="text-neutral-100 border-b border-neutral-200 px-5 py-3 bg-red-800">
                <h3 className="text-base font-semibold font-playfair">Information</h3>
              </div>
              <div className="px-5 py-4 space-y-5 text-sm">
                <InfoRow icon={<CalendarDays className="h-4 w-4" />} label="Date" value={dt} />
                {time && <InfoRow icon={<Clock className="h-4 w-4" />} label="Time" value={time} />}
                {event.location && <InfoRow icon={<MapPin className="h-4 w-4" />} label="Location" value={event.location} />}

                {categories.length > 0 && (
                  <div className="flex items-start gap-3">
                    <Tag className="h-4 w-4 mt-0.5 text-neutral-500" />
                    <div className="flex-1">
                      <div className="text-neutral-500/90 mb-1">Categories</div>
                      <div className="flex flex-wrap gap-2">
                        {categories.map((c) => (
                          <span key={c} className="text-xs px-2 py-1 border border-neutral-200">{c}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="border border-neutral-200 bg-white shadow-sm">
              <div className="border-b border-neutral-200 px-5 py-3 bg-neutral-200">
                <h3 className="text-base font-semibold text-neutral-900 font-playfair">Organizer</h3>
              </div>
              <div className="px-5 py-4 space-y-5 text-sm">
                {organizer.name && (
                  <InfoRow icon={<User className="h-4 w-4" />} label="Name" value={`${organizer.name}${organizer.role ? ` – ${organizer.role}` : ""}`} />
                )}
                {organizer.phone && (
                  <InfoRow icon={<Phone className="h-4 w-4" />} label="Phone" value={<a href={`tel:${organizer.phone}`} className="hover:text-red-800">{organizer.phone}</a>} />
                )}
                {organizer.email && (
                  <InfoRow icon={<Mail className="h-4 w-4" />} label="Email" value={<a href={`mailto:${organizer.email}`} className="hover:text-red-800">{organizer.email}</a>} />
                )}
                {organizer.website && (
                  <InfoRow icon={<LinkIcon className="h-4 w-4" />} label="Website" value={<a href={organizer.website} target="_blank" rel="noreferrer" className="hover:text-red-800">{organizer.website}</a>} />
                )}
              </div>
            </div>
          </aside>
        </section>
      </div>
    </PageWrapper>
  );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: React.ReactNode | string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 text-neutral-500">{icon}</span>
      <div className="flex-1">
        <div className="text-neutral-500/90">{label}</div>
        <div className="text-neutral-900">{value}</div>
      </div>
    </div>
  );
}

function formatDate(d: Date) {
  return new Date(d).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "2-digit" });
}

export async function generateStaticParams() {
  const slugs = await prisma.event.findMany({ select: { slug: true } });
  return slugs.map((e) => ({ slug: e.slug }));
}
