"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import PageWrapper from "@/components/PageWrapper";
import { CalendarDays, Clock, Search, ChevronLeft, ChevronRight, ArrowLeft, Tag } from "lucide-react";
import { newsData } from "@/data/newsData";

type Post = typeof newsData[number];
const POSTS_PER_PAGE = 4;

export default function NewsPage() {
  const [q, setQ] = useState("");
  const [activeCat, setActiveCat] = useState<string>("All");
  const [page, setPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  // Categories for pills
  const categories = useMemo(() => {
    const set = new Set<string>(["All"]);
    newsData.forEach((p) => set.add(p.category));
    return Array.from(set);
  }, []);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return newsData
      .filter((p) => (activeCat === "All" ? true : p.category === activeCat))
      .filter((p) => {
        if (!needle) return true;
        return (
          p.title.toLowerCase().includes(needle) ||
          p.excerpt.toLowerCase().includes(needle) ||
          p.tags?.some((t) => t.toLowerCase().includes(needle))
        );
      })
      .sort((a, b) => +new Date(b.date) - +new Date(a.date));
  }, [q, activeCat]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / POSTS_PER_PAGE));
  const start = (page - 1) * POSTS_PER_PAGE;
  const current = filtered.slice(start, start + POSTS_PER_PAGE);

  if (page > totalPages && totalPages > 0) setPage(1);

  return (
    <PageWrapper>
      <main className="text-neutral-800 max-w-7xl mx-auto space-y-24 px-6 md:px-0 py-10">
        <section className="grid grid-rows-1 lg:grid-cols-12 gap-10">
          {/* Left side */}
          <div className="lg:col-span-8 space-y-8">
            {!selectedPost ? (
              <>
                {/* Grid of posts */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 [grid-auto-rows:1fr]">
                  {current.map((post) => (
                    <PostCard key={post.id} post={post} onReadMore={() => setSelectedPost(post)} />
                  ))}
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between border-t border-neutral-200 pt-6">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="inline-flex items-center gap-2 px-3 py-2 hover:text-red-800 cursor-pointer text-sm border border-neutral-200 disabled:opacity-50 disabled:cursor-auto disabled:hover:text-neutral-500 text-neutral-500"
                  >
                    <ChevronLeft className="w-4 h-4" /> Prev
                  </button>
                  <div className="text-sm">
                    Page <span className="font-medium">{page}</span> of{" "}
                    <span className="font-medium">{totalPages}</span>
                  </div>
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="inline-flex items-center gap-2 px-3 py-2 text-sm border hover:text-red-800 cursor-pointer border-neutral-200 disabled:opacity-50 disabled:cursor-auto disabled:hover:text-neutral-500 text-neutral-500"
                  >
                    Next <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </>
            ) : (
              <ArticleView post={selectedPost} onBack={() => setSelectedPost(null)} />
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-8">
            {/* Search */}
            <div className="border border-neutral-200 p-5 bg-white shadow-sm">
              <h3 className="text-lg font-playfair font-semibold mb-4">Search</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  value={q}
                  onChange={(e) => {
                    setQ(e.target.value);
                    setPage(1);
                    setSelectedPost(null); // ✅ return to grid
                  }}
                  placeholder="Search news…"
                  className="w-full border border-neutral-200 pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-red-800"
                />
              </div>
            </div>

            {/* Categories */}
            <div className="border border-neutral-200 p-5 bg-neutral-50 shadow-sm">
              <h3 className="text-lg font-playfair font-semibold mb-4">Category</h3>

              <ul className="space-y-3">
                {categories.map((cat) => {
                  const count =
                    cat === "All"
                      ? newsData.length
                      : newsData.filter((p) => p.category === cat).length;

                  const isActive = activeCat === cat;

                  return (
                    <li key={cat}>
                      <button
                        onClick={() => {
                          setActiveCat(cat);
                          setPage(1);
                          setSelectedPost(null);
                        }}
                        aria-pressed={isActive}
                        className={[
                          "w-full flex items-stretch overflow-hidden border transition",
                          isActive
                            ? "border-red-800 ring-1 ring-red-800/20"
                            : "border-neutral-200 hover:border-neutral-300",
                        ].join(" ")}
                      >
                        {/* left label */}
                        <span
                          className={[
                            "flex-1 text-left px-4 py-3 bg-white text-sm",
                            isActive ? "text-red-800" : "text-neutral-600 group-hover:text-red-800",
                          ].join(" ")}
                        >
                          {cat}
                        </span>

                        {/* right count badge */}
                        <span
                          className={[
                            "shrink-0 grid place-items-center w-12 text-xs font-semibold",
                            "bg-red-800 text-white",
                          ].join(" ")}
                        >
                          ({count})
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Tags */}
            <div className="border border-neutral-200 p-5 bg-white shadow-sm">
              <h3 className="text-lg font-playfair font-semibold mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {Array.from(new Set(newsData.flatMap((p) => p.tags ?? []))).map((tag) => (
                  <button
                    key={tag}
                    onClick={() => {
                      setQ(tag);
                      setPage(1);
                      setSelectedPost(null); 
                    }}
                    className="px-3 py-1 hover:cursor-pointer text-xs border border-neutral-200 hover:border-neutral-300"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </section>
      </main>
    </PageWrapper>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function ArticleView({ post, onBack }: any ) {
  return (
    <div>
      <div
        onClick={onBack}
        className="mb-10 flex flex-row gap-2 items-center text-neutral-600 hover:text-red-800 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm">Back to News</span>
      </div>

      <div className="relative h-72 md:h-96 lg:h-[28rem] overflow-hidden rounded">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 896px, (min-width: 640px) 640px, 100vw"
        />
      </div>

      <h1 className="mt-6 text-3xl md:text-4xl font-playfair font-semibold leading-tight">
        {post.title}
      </h1>

      <div className="mt-3 flex flex-wrap gap-4 text-sm text-neutral-500">
        <span className="uppercase tracking-wide text-red-800 font-medium">{post.category}</span>
        <span className="inline-flex items-center gap-1">
          <CalendarDays size={16} /> {formatDate(post.date)}
        </span>
        {!!post.readingTime && (
          <span className="inline-flex items-center gap-1">
            <Clock size={16} /> {post.readingTime} min
          </span>
        )}
      </div>

      <article className="prose max-w-none mt-8 text-neutral-800">
        {(post as any).content?.map((para: string, i: number) => (
          <p key={i}>{para}</p>
        )) || <p>{post.excerpt}</p>}
      </article>

      {post.tags?.length ? (
        <div className="mt-8 flex flex-wrap items-center gap-2">
          <Tag size={16} className="text-neutral-500" />
          {post.tags?.map((t: string) => (
            <span key={t} className="text-xs px-2 py-1 border border-neutral-200">
              #{t}
            </span>
          ))}

        </div>
      ) : null}
    </div>
  );
}
/* eslint-enable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */
function PostCard({ post, onReadMore }: any ) {
  return (
    <article className="h-full flex flex-col border border-neutral-200 bg-white shadow-sm hover:shadow-md transition overflow-hidden">
      <div onClick={onReadMore} className="block relative aspect-[16/9] cursor-pointer">
        <Image src={post.image} alt={post.title} fill className="object-cover" />
      </div>

      <div className="p-5 flex flex-1 flex-col">
        {/* Meta */}
        <div className="flex items-center gap-3 text-xs text-neutral-500">
          <span className="uppercase tracking-wide text-red-800 font-medium">{post.category}</span>
          <span>•</span>
          <span className="inline-flex items-center gap-1">
            <CalendarDays size={14} /> {formatDate(post.date)}
          </span>
          {!!post.readingTime && (
            <>
              <span>•</span>
              <span className="inline-flex items-center gap-1">
                <Clock size={14} /> {post.readingTime} min
              </span>
            </>
          )}
        </div>

        <h2
          className="mt-3 text-lg inline font-playfair font-semibold leading-snug
                     overflow-hidden text-ellipsis
                     [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical]
                     min-h-[3.2rem]"
        >
          <span onClick={onReadMore} className="hover:underline cursor-pointer">
            {post.title}
          </span>
        </h2>

        <p
          className="mt-2 text-sm text-neutral-600
                     overflow-hidden text-ellipsis
                     [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical]
                     min-h-[3.8rem]"
        >
          {post.excerpt}
        </p>

        {/* Footer link */}
        <div className="mt-auto pt-2">
          <button
            onClick={onReadMore}
            className="text-sm text-red-800 font-medium hover:underline"
          >
            Read More →
          </button>
        </div>
      </div>
    </article>
  );
}
/* eslint-enable @typescript-eslint/no-explicit-any */

function formatDate(d: string) {
  const date = new Date(d);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}
