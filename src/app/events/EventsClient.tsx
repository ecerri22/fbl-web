"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin, Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

type EventItem = {
  id: string;
  slug: string;
  title: string;
  date: string;          
  image: string;
  location: string | null;
};

const PAGE_SIZE = 6;

export default function EventsClient({ initialEvents }: { initialEvents: EventItem[] }) {
  return (
    <Suspense fallback={<div className="py-10 text-sm text-neutral-500">Loading…</div>}>
      <EventsInner initialEvents={initialEvents} />
    </Suspense>
  );
}

function EventsInner({ initialEvents }: { initialEvents: EventItem[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageParam = Number(searchParams.get("page") ?? "1");
  const page = Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1;

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState<string>("");

  // helpers
  const toYMD = (iso: string) => {
    const d = new Date(iso);
    const y = d.getUTCFullYear();
    const m = String(d.getUTCMonth() + 1).padStart(2, "0");
    const da = String(d.getUTCDate()).padStart(2, "0");
    return `${y}-${m}-${da}`;
  };
  const academicStartYear = (iso: string) => {
    const m = Number(toYMD(iso).split("-")[1]);
    const y = Number(toYMD(iso).split("-")[0]);
    return m >= 10 ? y : y - 1;
  };
  const academicLabel = (iso: string) => {
    const start = academicStartYear(iso);
    return `${start}-${start + 1}`;
  };

  const years = useMemo(() => {
    const s = new Set<string>();
    initialEvents.forEach((e) => s.add(academicLabel(e.date)));
    return Array.from(s).sort((a, b) => Number(b.split("-")[0]) - Number(a.split("-")[0]));
  }, [initialEvents]);

  const filtered = useMemo(() => {
    const needle = searchTerm.trim().toLowerCase();
    return initialEvents.filter((e) => {
      const hit = needle ? e.title.toLowerCase().includes(needle) : true;
      const yearOk = selectedYear
        ? academicStartYear(e.date) === Number(selectedYear.split("-")[0])
        : true;
      return hit && yearOk;
    });
  }, [initialEvents, searchTerm, selectedYear]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const clamped = Math.min(page, totalPages);
  const start = (clamped - 1) * PAGE_SIZE;
  const items = filtered.slice(start, start + PAGE_SIZE);

  const goto = (p: number) => {
    const sp = new URLSearchParams(searchParams);
    sp.set("page", String(p));
    router.push(`/events?${sp.toString()}`);
  };

  useEffect(() => {
    const sp = new URLSearchParams(searchParams);
    if ((searchTerm || selectedYear) && (sp.get("page") ?? "1") !== "1") {
      sp.set("page", "1");
      router.push(`/events?${sp.toString()}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, selectedYear]);

  return (
    <main className="text-neutral-800 space-y-10">
      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:flex-1 bg-white">
          <h3 className="text-xl font-playfair font-semibold mb-3">Search Events:</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search events…"
              className="w-full border border-neutral-200 pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-red-800"
            />
          </div>
        </div>

        <div className="w-full lg:w-[22rem] bg-white">
          <h3 className="text-xl font-playfair font-semibold mb-3">Academic Year:</h3>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="w-full border border-neutral-200 px-4 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-red-800"
          >
            <option value="">All Years</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {items.map((e) => (
          <article key={e.id} className="border border-neutral-200 bg-white shadow-sm hover:shadow-md transition h-full">
            <div className="p-5 flex flex-col h-full">
              <div className="relative aspect-[16/10] overflow-hidden group">
                <Image
                  src={e.image || "/images/news/fakulteti-ekonomik-uniel.webp"}
                  alt={e.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(min-width:1024px) 384px, (min-width:768px) 50vw, 100vw"
                />
              </div>

              <div className="mt-5 flex flex-col flex-1 justify-between">
                <div>
                  <div className="flex items-center gap-2 text-sm text-neutral-500">
                    <CalendarDays size={16} />
                    <span>{new Date(e.date).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "2-digit" })}</span>
                  </div>

                  <h3 className="mt-4 sm:text-xl text-lg font-playfair leading-snug">
                    <Link href={`/events/${e.slug}?from=list`} className="hover:text-red-800">
                      <span className="block overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">
                        {e.title}
                      </span>
                    </Link>
                  </h3>
                </div>

                {e.location && (
                  <div className="mt-5 flex items-center gap-2 text-sm text-neutral-700">
                    <MapPin size={16} className="text-neutral-500" />
                    <span className="underline decoration-dotted underline-offset-4">{e.location}</span>
                  </div>
                )}
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* Empty */}
      {filtered.length === 0 && (
        <div className="text-neutral-500 text-sm">No events match your filters.</div>
      )}

      {/* Pagination */}
      {filtered.length > 0 && (
        <div className="flex items-center justify-between border-t border-neutral-200 pt-6">
          <button onClick={() => goto(Math.max(1, clamped - 1))} disabled={clamped === 1} className="px-3 py-2 text-sm border border-neutral-200 disabled:opacity-50">
            Prev
          </button>
          <div className="text-sm">
            Page <span className="font-medium">{clamped}</span> of{" "}
            <span className="font-medium">{Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))}</span>
          </div>
          <button onClick={() => goto(clamped + 1)} disabled={clamped >= Math.ceil(filtered.length / PAGE_SIZE)} className="px-3 py-2 text-sm border border-neutral-200 disabled:opacity-50">
            Next
          </button>
        </div>
      )}
    </main>
  );
}
