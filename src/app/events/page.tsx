import PageWrapper from "@/components/PageWrapper";
import { prisma } from "@/lib/prisma";
import EventsClient from "./EventsClient";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function EventsPage() {
  const events = await prisma.event.findMany({
    orderBy: { date: "asc" },
    select: { id: true, slug: true, title: true, date: true, image: true, location: true },
  });

  const initialEvents = events.map((e) => ({
    id: e.id,
    slug: e.slug,
    title: e.title ?? "",
    date: typeof e.date === "string" ? e.date : e.date?.toISOString() ?? "",
    image: e.image ?? "/images/news/fakulteti-ekonomik-uniel.webp",
    location: e.location ?? null,
  }));

  return (
    <PageWrapper>
      <EventsClient initialEvents={initialEvents} />
    </PageWrapper>
  );
}
