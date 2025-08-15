"use client";

import { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import PageWrapper from "@/components/PageWrapper";
import {
  CalendarDays,
  Search,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Tag,
  Filter,
} from "lucide-react";
import { newsData } from "@/data/newsData";

type Post = (typeof newsData)[number];
const POSTS_PER_PAGE = 4;

export default function NewsPage() {
  const [q, setQ] = useState("");
  const [activeCat, setActiveCat] = useState<string>("All");
  const [page, setPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);

  // category list (with "All")
  const categories = useMemo(() => {
    const set = new Set<string>(["All"]);
    newsData.forEach((p) => set.add(p.category));
    return Array.from(set);
  }, []);

  // category counts (perf)
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: newsData.length };
    for (const p of newsData) counts[p.category] = (counts[p.category] || 0) + 1;
    return counts;
  }, []);

  // unique tags
  const allTags = useMemo(
    () => Array.from(new Set(newsData.flatMap((p) => p.tags ?? []))),
    []
  );

  // filtered + sorted posts
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

  // guard against out-of-range page after filters/search change
  useEffect(() => {
    if (page > totalPages && totalPages > 0) setPage(1);
  }, [page, totalPages]);

  return (
    <PageWrapper>
      <div className="text-neutral-800">
        {/* Mobile filter bar (≤1024px) */}
        <div className="lg:hidden sticky top-0 z-10 bg-white/90 backdrop-blur border-b border-neutral-200">
          <div className="flex items-center justify-between px-1 pb-6">
            <h2 className="font-playfair font-semibold text-3xl">News</h2>
            <button
              onClick={() => setFiltersOpen((v) => !v)}
              aria-expanded={filtersOpen}
              aria-controls="mobile-filters"
              className="inline-flex items-center gap-2 text-sm border border-neutral-200 px-3 py-1.5"
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>

          {filtersOpen && (
            <div id="mobile-filters" className="px-1 py-3 space-y-4">
              {/* Search */}
              <div className="border border-neutral-200 p-3 bg-white shadow-sm">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <input
                    value={q}
                    onChange={(e) => {
                      setQ(e.target.value);
                      setPage(1);
                      setSelectedPost(null);
                    }}
                    placeholder="Search news…"
                    className="w-full border border-neutral-200 pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-red-800"
                  />
                </div>
              </div>

              {/* Categories as horizontal pills */}
              <div className="border border-neutral-200 p-3 bg-neutral-50 shadow-sm">
                <h3 className="text-sm font-semibold mb-2 font-playfair">Category</h3>
                <div className="flex gap-2 overflow-x-auto snap-x snap-mandatory">
                  {categories.map((cat) => {
                    const active = activeCat === cat;
                    return (
                      <button
                        key={cat}
                        onClick={() => {
                          setActiveCat(cat);
                          setPage(1);
                          setSelectedPost(null);
                        }}
                        aria-pressed={active}
                        className={[
                          "snap-start whitespace-nowrap border px-3 py-1.5 text-xs",
                          active
                            ? "bg-red-800 text-white border-red-800"
                            : "border-neutral-200 text-neutral-700 hover:border-neutral-300",
                        ].join(" ")}
                      >
                        {cat}{" "}
                        <span className={active ? "opacity-80" : "text-neutral-500"}>
                          ({categoryCounts[cat] ?? 0})
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Tags */}
              <div className="border border-neutral-200 p-3 bg-white shadow-sm">
                <h3 className="text-sm font-semibold mb-2 font-playfair">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {allTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => {
                        setQ(tag);
                        setPage(1);
                        setSelectedPost(null);
                      }}
                      className="px-3 py-1 text-xs border border-neutral-200 hover:border-neutral-300"
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bottom action bar (mobile filters) */}
              <div className="sticky bottom-0 bg-white/95 backdrop-blur  px-2 py-3 flex items-end justify-between gap-3">
                <button
                  onClick={() => {
                    setQ("");
                    setActiveCat("All");
                    setSelectedPost(null);
                  }}
                  className="text-sm text-neutral-600 underline"
                >
                  Clear
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setFiltersOpen(false)}
                    className="text-sm px-4 py-2 border border-neutral-300"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => setFiltersOpen(false)}
                    className="text-sm px-4 py-2 bg-red-800 text-white hover:bg-red-700"
                  >
                    Show results ({filtered.length})
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Main content + desktop sidebar */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:pt-8 lg:p-0">
          {/* Main */}
          <div className="order-2 lg:order-1 lg:col-span-8 space-y-8">
            {!selectedPost ? (
              <>
                {/* Grid of posts */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 [grid-auto-rows:1fr]">
                  {current.map((post) => (
                    <PostCard
                      key={post.id}
                      post={post}
                      onReadMore={() => setSelectedPost(post)}
                    />
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

          {/* Sidebar (desktop only) */}
          <aside className="order-1 lg:order-2 hidden lg:block lg:col-span-4 space-y-8 lg:sticky lg:top-20">
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
                    setSelectedPost(null);
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
                  const isActive = activeCat === cat;
                  const count = categoryCounts[cat] ?? 0;
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
                        <span
                          className={[
                            "flex-1 text-left px-4 py-3 bg-white text-sm",
                            isActive
                              ? "text-red-800"
                              : "text-neutral-600 group-hover:text-red-800",
                          ].join(" ")}
                        >
                          {cat}
                        </span>
                        <span className="shrink-0 grid place-items-center w-12 text-xs font-semibold bg-red-800 text-white">
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
                {allTags.map((tag) => (
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
      </div>
    </PageWrapper>
  );
}

/* ---------- Helpers & subcomponents ---------- */

/* eslint-disable @typescript-eslint/no-explicit-any */
function ArticleView({ post, onBack }: { post: any; onBack: () => void }) {
  return (
    <div>
      <button
        onClick={onBack}
        className="mb-8 max-[640px]:my-5 inline-flex items-center gap-2 text-neutral-600 hover:text-red-800"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm">Back to News</span>
      </button>

      <div className="relative h-72 md:h-96 lg:h-[28rem] overflow-hidden ">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 896px, (min-width: 640px) 640px, 100vw"
          priority
        />
      </div>

      <h1 className="mt-6 text-3xl md:text-4xl font-playfair font-semibold leading-tight">
        {post.title}
      </h1>

      <div className="mt-3 flex flex-wrap gap-4 text-sm text-neutral-500">
        <span className="uppercase tracking-wide text-red-800 font-medium">
          {post.category}
        </span>
        <span className="inline-flex items-center gap-1">
          <CalendarDays size={16} /> {formatDate(post.date)}
        </span>
      </div>

      <article className="prose max-w-none mt-8 text-neutral-800">
        {(post as any).content?.map((para: string, i: number) => (
          <p key={i}>{para}</p>
        )) || <p>{post.excerpt}</p>}
      </article>

      {post.tags?.length ? (
        <div className="mt-8 flex flex-wrap items-center gap-2">
          <Tag size={16} className="text-neutral-500" />
          {post.tags?.map((t: any) => (
            <span key={t} className="text-xs px-2 py-1 border border-neutral-200">
              #{t}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function PostCard({
  post,
  onReadMore,
}: {
  post: Post;
  onReadMore: () => void;
}) {
  return (
    <article className="h-full flex flex-col border border-neutral-200 bg-white shadow-sm hover:shadow-md transition overflow-hidden">
      {/* Image */}
      <button
        onClick={onReadMore}
        className="relative block aspect-[16/9] cursor-pointer"
        aria-label={`Read more: ${post.title}`}
      >
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
          loading="lazy"
        />
      </button>

      {/* Body */}
      <div className="p-5 flex flex-1 flex-col">
        {/* Meta */}
        <div className="flex items-center gap-3 text-xs text-neutral-500">
          <span className="uppercase tracking-wide text-red-800 font-medium">{post.category}</span>
          <span>•</span>
          <span className="inline-flex items-center gap-1">
            <CalendarDays size={14} /> {formatDate(post.date)}
          </span>
        </div>

        {/* Title (clamped to 2 lines) */}
        <h2
          className="
            mt-3 text-lg md:text-xl font-playfair font-semibold leading-snug
            overflow-hidden text-ellipsis
            [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical]
          "
        >
          <button onClick={onReadMore} className="block text-left hover:underline">
            {post.title}
          </button>
        </h2>

        {/* Excerpt (clamped to 3 lines) */}
        <p
          className="
            mt-2 text-sm text-neutral-600
            overflow-hidden text-ellipsis
            [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical]
          "
        >
          {post.excerpt}
        </p>

        {/* Footer */}
        <div className="mt-auto pt-2">
          <button onClick={onReadMore} className="text-sm text-red-800 font-medium hover:underline">
            Read More →
          </button>
        </div>
      </div>
    </article>
  );
}

function formatDate(d: string) {
  const date = new Date(d);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}
