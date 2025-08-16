import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CalendarDays,
  Clock,
  MapPin,
  User,
  Mail,
  Phone,
  Link as LinkIcon,
  Tag,
  ArrowLeft,
  CheckCircle2,   
  Quote,         
} from "lucide-react";
import { events } from "@/data/eventsData";
import PageWrapper from "@/components/PageWrapper";

// Types
type EventItem = (typeof events)[number];

export async function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function EventDetailPage({params}: any ) {
  const event = events.find((e) => e.slug === params.slug);
  if (!event) return notFound();

  // convenience helpers
  const dt = formatDate(event.date);
  const time = (event as any).time as string | undefined;
  const categories = ((event as any).categories ?? []) as string[];
  const org = (event as any).organizer as
    | {
        name?: string;
        role?: string;
        phone?: string;
        email?: string;
        website?: string;
      }
    | undefined;

  return (
    <PageWrapper>
    <div className="text-neutral-800 ">
      {/* Back link */}
      <div className="mb-6">
        <Link
          href="/events"
          className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-red-800"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Events
        </Link>
      </div>

      {/* Title */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight font-playfair text-neutral-800">
        {event.title}
      </h1>

      {/* Main grid */}
      <section className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-10">
          <div className="relative aspect-[16/9] ">
            <Image
              src={event.image}
              alt={event.title}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 896px, (min-width: 640px) 640px, 100vw"
            />
          </div>

          {/* About the Event */}
          <article className="space-y-6">

            {/* Lead paragraph */}
            <p className="max-[425px]:text-sm text-base leading-relaxed text-neutral-700 border-l-4 border-red-800/70 pl-4 py-1 bg-red-50/40">
              {event.description ?? "Details coming soon."}
            </p>

            {/* Body paragraphs */}
            <div className="prose max-w-none max-[425px]:text-sm text-base">
              {Array.isArray((event as any).content) && (event as any).content.length ? (
                ((event as any).content as string[]).map((para, i) => (
                  <p key={i} className=" pb-5 max-[425px]:text-sm text-base leading-relaxed">{para}</p>
                ))
              ) : null}
            </div>


            {/* Highlights grid */}
            {Array.isArray((event as any).highlights) && (event as any).highlights.length > 0 && (
              <section className="space-y-4">
                <h3 className="text-xl font-playfair text-neutral-800 max-[640px]:text-center">Highlights</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {((event as any).highlights as { title: string; text: string }[]).map((h, i) => (
                    <li
                      key={i}
                      className="rounded border border-neutral-200 p-4 hover:shadow-sm transition"
                    >
                      <div className="flex items-start gap-3 max-[640px]:gap-0">
                        {/* Hide icon at ≤640px */}
                        <CheckCircle2
                          className="w-5 h-5 text-red-800 mt-0.5 shrink-0 max-[640px]:hidden"
                          aria-hidden="true"
                        />
                        <div>
                          <div className="font-medium text-neutral-800">{h.title}</div>
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

        {/* Right column: aside cards */}
        <aside className="lg:col-span-4 space-y-6">
          {/* Information card */}
          <div className="border border-neutral-200 bg-white shadow-sm">
            <div className=" text-neutral-100 border-b border-neutral-200 px-5 py-3 bg-red-800 ">
              <h3 className="text-base font-semibold font-playfair ">
                Information
              </h3>
            </div>
            <div className="px-5 py-4 space-y-5 text-sm">
              <InfoRow
                icon={<CalendarDays className="h-4 w-4" />}
                label="Date"
                value={dt}
              />
              {time && (
                <InfoRow
                  icon={<Clock className="h-4 w-4" />}
                  label="Time"
                  value={time}
                />
              )}
              {event.location && (
                <InfoRow
                  icon={<MapPin className="h-4 w-4" />}
                  label="Location"
                  value={event.location}
                />
              )}

              {categories.length > 0 && (
                <div className="flex items-start gap-3">
                  <Tag className="h-4 w-4 mt-0.5 text-neutral-500" />
                  <div className="flex-1">
                    <div className="text-neutral-500/90 mb-1">Categories</div>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((c) => (
                        <span
                          key={c}
                          className="text-xs px-2 py-1 border border-neutral-200"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Organizer card */}
          <div className="border border-neutral-200 bg-white shadow-sm">
            <div className="border-b border-neutral-200 px-5 py-3 bg-neutral-200">
              <h3 className="text-base font-semibold text-neutral-900 font-playfair">
                Organizer
              </h3>
            </div>
            <div className="px-5 py-4 space-y-5 text-sm">
              {org?.name && (
                <InfoRow
                  icon={<User className="h-4 w-4" />}
                  label="Name"
                  value={org.name + (org.role ? ` – ${org.role}` : "")}
                />
              )}
              {org?.phone && (
                <InfoRow
                  icon={<Phone className="h-4 w-4" />}
                  label="Phone"
                  value={
                    <a href={`tel:${org.phone}`} className="hover:text-red-800">
                      {org.phone}
                    </a>
                  }
                />
              )}
              {org?.email && (
                <InfoRow
                  icon={<Mail className="h-4 w-4" />}
                  label="Email"
                  value={
                    <a href={`mailto:${org.email}`} className="hover:text-red-800">
                      {org.email}
                    </a>
                  }
                />
              )}
              {org?.website && (
                <InfoRow
                  icon={<LinkIcon className="h-4 w-4" />}
                  label="Website"
                  value={
                    <a
                      href={org.website}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-red-800"
                    >
                      {org.website}
                    </a>
                  }
                />
              )}
            </div>
          </div>
        </aside>
      </section>
    </div>
    </PageWrapper>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode | string;
}) {
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

function formatDate(d: string) {
  const date = new Date(d);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
}
