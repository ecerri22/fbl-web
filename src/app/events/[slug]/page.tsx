import { notFound } from "next/navigation";
import { events } from "@/data/eventsData";
import Link from "next/link";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function EventDetailPage({ params }: any ) {
  const event = events.find((e) => e.slug === params.slug);
  if (!event) return notFound();

  return (
    <main className="max-w-4xl mx-auto px-6 py-16 space-y-10">
      <h1 className="text-3xl font-bold text-blue-950">{event.title}</h1>

      <div className="space-y-2 text-sm text-gray-700">
        <p><strong>Data:</strong> {event.date}</p>
        <p><strong>Vendi:</strong> {event.location}</p>
      </div>

      <div className="text-gray-800 leading-relaxed">
        <p>{event.description}</p>
      </div>

      <div className="pt-6">
        <Link
          href="/events"
          className="inline-block px-5 py-2 bg-blue-950 text-white rounded-full text-sm hover:bg-blue-800 transition"
        >
          ← Kthehu te Ngjarjet
        </Link>
      </div>
    </main>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function generateMetadata({ params }: any) {
  const event = events.find((s) => s.slug === params.slug);

  return {
    title: event?.title || "Event Not Found",
    description: event?.description || "Details of the event.",
  };
}