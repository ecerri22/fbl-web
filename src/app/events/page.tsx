"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import PageWrapper from "@/components/PageWrapper";
import { CalendarDays, MapPin, Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { events } from "@/data/eventsData";

type EventItem = (typeof events)[number];
const PAGE_SIZE = 6;

export default function EventsPage() {
  return (
    <PageWrapper>
      <Suspense fallback={<div className="py-10 text-sm text-neutral-500">Loading…</div>}>
        <EventsInner />
      </Suspense>
    </PageWrapper>
  );
}

function EventsInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageParam = Number(searchParams.get("page") ?? "1");
  const page = Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1;

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState<string>("");

  // ---- Academic year helpers (string-based, timezone-safe) ----
  function parseYMD(dateStr: string) {
    const [y, m, d] = dateStr.split("-").map(Number);
    return { y, m, d };
  }

  // For a YYYY-MM-DD string, return the academic start year.
  // Example: "2024-10-05" -> 2024 ; "2025-09-15" -> 2024
  function academicStartYear(dateStr: string) {
    const { y, m } = parseYMD(dateStr);
    return m >= 10 ? y : y - 1; // Oct..Dec => same year; Jan..Sep => previous year
  }

  function academicYearLabelFromStr(dateStr: string) {
    const start = academicStartYear(dateStr);
    return `${start}-${start + 1}`;
  }

  // Build academic year options dynamically from the data
  const years = useMemo(() => {
    const set = new Set<string>();
    for (const ev of events) set.add(academicYearLabelFromStr(ev.date));
    return Array.from(set).sort((a, b) => Number(b.split("-")[0]) - Number(a.split("-")[0]));
  }, []);

  const filteredEvents = useMemo(() => {
    const needle = searchTerm.trim().toLowerCase();
    return events.filter((ev) => {
      const matchesSearch = needle ? ev.title.toLowerCase().includes(needle) : true;

      let matchesYear = true;
      if (selectedYear) {
        const selectedStart = Number(selectedYear.split("-")[0]); 
        matchesYear = academicStartYear(ev.date) === selectedStart;
      }

      return matchesSearch && matchesYear;
    });
  }, [searchTerm, selectedYear]);

  const totalPages = Math.max(1, Math.ceil(filteredEvents.length / PAGE_SIZE));
  const clampedPage = Math.min(page, totalPages);
  const start = (clampedPage - 1) * PAGE_SIZE;
  const pageItems = filteredEvents.slice(start, start + PAGE_SIZE);

  const goTo = (p: number) => {
    const sp = new URLSearchParams(searchParams);
    sp.set("page", String(p));
    router.push(`/events?${sp.toString()}`);
  };

  // Reset to page 1 when filters change
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
      <div className="flex flex-col lg:flex-row gap-6 max-[640px]:gap-8 ">
        {/* Search (boxed) */}
        <div className="w-full lg:flex-1 bg-white">
          <h3 className="text-xl font-playfair font-semibold mb-3">Search Events:</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search events…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-neutral-200 pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-red-800"
            />
          </div>
        </div>

        {/* Academic Year */}
        <div className="w-full lg:w-[22rem] bg-white">
          <h3 className="text-xl font-playfair font-semibold mb-3">Academic Year:</h3>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="w-full border border-neutral-200 px-4 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-red-800"
          >
            <option value="">All Years</option>
            {years.map((label) => (
              <option key={label} value={label}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Events Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {pageItems.map((ev) => (
          <EventCard key={ev.id} event={ev} />
        ))}
      </section>

      {/* Empty state */}
      {filteredEvents.length === 0 && (
        <div className="text-neutral-500 text-sm">No events match your filters.</div>
      )}

      {/* Pagination */}
      {filteredEvents.length > 0 && (
        <div className="flex items-center justify-between border-t border-neutral-200 pt-6">
          <button
            onClick={() => goTo(Math.max(1, clampedPage - 1))}
            disabled={clampedPage === 1}
            className="inline-flex items-center gap-2 px-3 py-2 hover:text-red-800 cursor-pointer text-sm border border-neutral-200 disabled:opacity-50 disabled:cursor-auto disabled:hover:text-neutral-500 text-neutral-500"
          >
            Prev
          </button>
          <div className="text-sm">
            Page <span className="font-medium">{clampedPage}</span> of{" "}
            <span className="font-medium">{totalPages}</span>
          </div>
          <button
            onClick={() => goTo(Math.min(totalPages, clampedPage + 1))}
            disabled={clampedPage === totalPages}
            className="inline-flex items-center gap-2 px-3 py-2 hover:text-red-800 cursor-pointer text-sm border border-neutral-200 disabled:opacity-50 disabled:cursor-auto disabled:hover:text-neutral-500 text-neutral-500"
          >
            Next
          </button>
        </div>
      )}
    </main>
  );
}

function EventCard({ event }: { event: EventItem }) {
  return (
    <article className="border border-neutral-200 bg-white shadow-sm hover:shadow-md transition h-full">
      <div className="p-5 flex flex-col h-full">
        <div className="relative aspect-[16/10] overflow-hidden group">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(min-width:1024px) 384px, (min-width:768px) 50vw, 100vw"
          />
        </div>

        <div className="mt-5 flex flex-col flex-1 justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm text-neutral-500">
              <CalendarDays size={16} />
              <span>{formatDate(event.date)}</span>
            </div>

            <h3 className="mt-4 sm:text-xl text-lg font-playfair leading-snug">
              <Link href={`/events/${event.slug}?from=list`} className="hover:text-red-800">
                <span className="block overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">
                  {event.title}
                </span>
              </Link>
            </h3>
          </div>

          {event.location ? (
            <div className="mt-5 flex items-center gap-2 text-sm text-neutral-700">
              <MapPin size={16} className="text-neutral-500" />
              <span className="underline decoration-dotted underline-offset-4">
                {event.location}
              </span>
            </div>
          ) : null}
        </div>
      </div>
    </article>
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
