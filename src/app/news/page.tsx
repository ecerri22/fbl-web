// app/news/page.tsx
import { prisma } from "@/lib/prisma";
import { Suspense } from "react";
import NewsClient, { Post } from "./NewsClient";

export const runtime = "nodejs";
export const revalidate = 60; // ISR cache; tweak as you like

const DEFAULT_IMG = "/images/news/fakulteti-ekonomik-uniel.webp";

export default async function NewsPage() {
  const news = await prisma.newsArticle.findMany({
    orderBy: { date: "desc" },
    select: {
      id: true,
      slug: true,
      title: true,
      excerpt: true,
      image: true,
      date: true,
      author: true,
      category: true,
      tags: true,         // string[]
      readingTime: true,  // number | null
      featured: true,
      content: true,      // string[]
    },
  });

  // Map DB → UI shape (strings only where UI expects)
  const initialPosts: Post[] = news.map((n) => ({
    id: n.id,
    slug: n.slug,
    title: n.title,
    excerpt: n.excerpt ?? "",
    image: n.image ?? DEFAULT_IMG,
    date: n.date.toISOString(), // keep ISO; client will format
    author: n.author ?? null,
    category: n.category ?? "General",
    tags: n.tags ?? [],
    readingTime: n.readingTime ?? null,
    featured: n.featured ?? false,
    content: n.content ?? [],
  }));

  return (
    <Suspense fallback={<div className="py-10 text-center">Loading…</div>}>
      <NewsClient initialPosts={initialPosts} />
    </Suspense>
  );
}
