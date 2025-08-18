// app/page.tsx
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const revalidate = 300; 

type DeptCard = { name: string; slug: string; image: string | null };
type EventCard = { id: string; slug: string; title: string; date: Date; location: string | null };
type NewsCard = { id: string; slug: string; title: string; excerpt: string | null; image: string | null; date: Date };

export default async function Home() {
  const [departments, events, latestNews] = await Promise.all([
    prisma.department.findMany({
      select: { name: true, slug: true, image: true },
      orderBy: { name: "asc" },
      take: 9, 
    }),
    prisma.event.findMany({
      select: { id: true, slug: true, title: true, date: true, location: true },
      orderBy: { date: "desc" },
      take: 3,
    }),
    prisma.newsArticle.findMany({
      select: { id: true, slug: true, title: true, excerpt: true, image: true, date: true },
      orderBy: { date: "desc" },
      take: 2,
    }),
  ]);

  return (
    <main className="min-h-screen bg-white">
      {/* HERO SECTION */}
      <section className="relative isolate h-[50rem] overflow-hidden">
        <div aria-hidden className="absolute inset-0 z-0">
          <Image
            src="/images/rut-miit-3EMw3T-ZjkE-unsplash.webp"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            quality={60}
            priority
          />
        </div>
        <div className="absolute inset-0 z-10 bg-black/60 md:bg-black/50" />
        <div className="relative z-10 h-full flex items-end">
          <div className="w-full grid grid-cols-2 gap-8 max-[479px]:grid-cols-1 max-[479px]:gap-6 p-6 sm:p-8 md:p-10 lg:p-12 text-white justify-items-end max-[479px]:justify-items-start">
            <div className="flex flex-col items-start justify-center space-y-6">
              <p className="text-xs sm:text-sm font-roboto font-bold lowercase tracking-widest">
                Knowledge meets innovation
              </p>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-semibold leading-tight font-playfair">
                Unleashing Potential Fostering Excellence
              </h1>
              <Link
                href="/study-programs"
                className="relative inline-block px-6 py-3 text-sm sm:text-base sm:px-8 sm:py-4 font-roboto text-white transition-colors duration-300 group overflow-hidden bg-red-800"
              >
                <span className="absolute inset-0 w-0 bg-neutral-800 transition-all duration-700 ease-out group-hover:w-full" />
                <span className="relative z-10 capitalize whitespace-nowrap">View our programs</span>
              </Link>
            </div>

            <div className="flex flex-col justify-end items-start gap-8 max-[479px]:mt-4 max-[479px]:gap-4">
              <Link href="/study-programs?level=bachelor" className="flex flex-col px-6 py-3 gap-4 max-[479px]:px-0 ">
                <h3 className="font-playfair text-xl sm:text-2xl">Undergraduate</h3>
                <p className="leading-8 font-roboto text-sm sm:text-base underline underline-offset-8 hover:decoration-red-800 transition-all duration-500 ease-out">
                  Browse the Undergraduate degrees
                </p>
              </Link>
              <Link href="/study-programs?level=master" className="flex flex-col px-6 py-3 gap-4 max-[479px]:px-0 ">
                <h3 className="font-playfair text-xl sm:text-2xl">Graduate</h3>
                <p className="leading-8 font-roboto text-sm sm:text-base underline underline-offset-8 hover:decoration-red-800 transition-all duration-500 ease-out">
                  Browse the Graduate degrees
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <div className="w-full lg:py-25 sm:px-20 sm:py-20 max-w-7xl mx-auto max-[640px]:py-20 max-[640px]:px-10">
        <section className="grid grid-cols-1 min-[881px]:grid-cols-2 items-center gap-8 min-[881px]:gap-10">
          <div className="relative overflow-hidden">
            <div className="flex items-end gap-6 min-w-0">
              <div className="relative aspect-[3/4] basis-[48%] min-w-0 md:-translate-y-4">
                <Image
                  src="/images/rut-miit-oTglG1D4hRA-unsplash.webp"
                  alt="Graduation cap in the air"
                  fill
                  sizes="(max-width: 880px) 90vw, (max-width: 1280px) 38vw, 360px"
                  className="object-cover shadow-md"
                />
              </div>
              <div className="relative aspect-[3/4] basis-[48%] min-w-0 md:translate-y-4">
                <Image
                  src="/images/joecalih-WyBizVgCrDY-unsplash.webp"
                  alt="Student graduation"
                  fill
                  sizes="(max-width: 880px) 90vw, (max-width: 1280px) 38vw, 360px"
                  className="object-cover shadow-md"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center min-[881px]:items-start justify-center space-y-6">
            <p className="xl:text-md lg:text-sm md:text-xs max-[640px]:text-xs font-roboto font-bold lowercase tracking-widest text-red-800">
              Knowledge meets innovation
            </p>
            <h1 className="max-[640px]:text-3xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold leading-tight font-playfair text-neutral-800 text-center min-[881px]:text-left">
              About FBL
            </h1>
            <p className="text-neutral-600 text-center min-[881px]:text-left max-w-prose text-base max-[425px]:text-sm">
              At FBL, we believe in the transformative power of education and the boundless potential that resides within each
              individual. Our mission is to foster intellectual curiosity, empower individuals to realize their fullest potential,
              and contribute meaningfully to the betterment of society.
            </p>
            <Link
              href="/about-us"
              className="relative inline-block text-sm sm:text-base xl:px-8 xl:py-4 font-roboto text-white transition-colors duration-300 group overflow-hidden bg-red-800 mx-auto min-[881px]:mx-0 sm:px-6 sm:py-3 max-[640px]:py-3 max-[640px]:px-6"
            >
              <span className="absolute inset-0 w-0 bg-neutral-800 transition-all duration-700 ease-out group-hover:w-full" />
              <span className="relative z-10 capitalize whitespace-nowrap">Read More</span>
            </Link>
          </div>
        </section>
      </div>

      {/* ACADEMIC & PROGRAMS (kept static list for now) */}
      <section className="lg:pb-25 sm:px-20 sm:pb-20 max-w-7xl mx-auto max-[640px]:pb-20 max-[640px]:px-10">
        <h1 className="xl:text-5xl lg:text-4xl md:text-3xl sm:text-2xl max-[640px]:text-3xl font-semibold leading-tight font-playfair text-neutral-800 mb-12 text-center">
          Study Programs
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-8 bg-neutral-100">
            <h3 className="xl:text-3xl lg:text-2xl sm:text-xl max-[640px]:text-xl font-semibold font-playfair text-neutral-800 mb-6">
              Undergraduate
            </h3>
            <ul className="space-y-4">
              <li >
                  <Link
                    href={{ pathname: "/study-programs/business-administration-bachelor", query: { from: "home" } }}
                    className="group inline-flex items-center justify-between border border-neutral-800 px-6 py-3 text-neutral-800 font-roboto text-sm sm:text-base w-full hover:border-transparent hover:bg-red-800 hover:text-white transition-colors"
                  >
                    Business Administration
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </Link>
                </li>
              {["Marketing", "Information Systems"].map((major) => (
                <li key={major}>
                  <Link
                    href="#"
                    className="group inline-flex items-center justify-between border border-neutral-800 px-6 py-3 text-neutral-800 font-roboto text-sm sm:text-base w-full hover:border-transparent hover:bg-red-800 hover:text-white transition-colors"
                  >
                    {major}
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/study-programs?level=bachelor"
                  className="inline-flex justify-center border border-neutral-800/60 text-neutral-800/80 sm:px-6 sm:py-3 px-4 py-2 font-roboto text-sm sm:text-base w-full hover:border-neutral-800 hover:text-neutral-800 transition-colors"
                >
                  See More
                </Link>
              </li>
            </ul>
          </div>

          <div className="p-8 bg-red-800">
            <h3 className="xl:text-3xl lg:text-2xl sm:text-xl max-[640px]:text-xl font-semibold font-playfair text-neutral-100 mb-6">
              Graduate
            </h3>
            <ul className="space-y-4">
              {["Business Analytics", "Economics", "Project Management"].map((major) => (
                <li key={major}>
                  <Link
                    href="#"
                    className="group inline-flex items-center justify-between border border-neutral-100 px-6 py-3 text-neutral-100 font-roboto text-sm sm:text-base w-full hover:bg-neutral-100 hover:text-red-800 transition-colors"
                  >
                    {major}
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/study-programs?level=master"
                  className="inline-flex justify-center border border-white/60 text-white/80 sm:px-6 sm:py-3 px-4 py-2 font-roboto text-sm sm:text-base w-full hover:text-white hover:border-white transition-colors"
                >
                  See More
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Scholarships */}
      <section className="relative isolate min-h-[22rem] sm:min-h-[26rem]">
        <div aria-hidden className="absolute inset-0 z-0">
          <Image src="/images/rut-miit-3EMw3T-ZjkE-unsplash.webp" alt="" fill className="object-cover" sizes="100vw" quality={60} />
        </div>
        <div className="absolute inset-0 z-10 bg-black/40 md:bg-black/80" />
        <div className="relative z-10 flex items-center justify-center sm:px-20 sm:py-20 px-15 py-15 max-[640px]:py-20 max-[640px]:px-10">
          <div className="max-w-3xl text-center text-white space-y-8">
            <h1 className="xl:text-5xl lg:text-4xl md:text-3xl sm:text-sxl max-[640px]:text-3xl font-semibold leading-tight font-playfair">
              Scholarships & Financial Aid
            </h1>
            <p className="lg:text-lg md:text-md sm:text-sm font-roboto text-base max-[425px]:text-sm">
              Each semester, we honor academically talented and exceptionally skilled students with a variety of scholarships and
              awards.
            </p>
            <Link
              href="/study-programs"
              className="relative text-sm sm:text-base inline-block font-roboto text-white transition-colors duration-300 group overflow-hidden bg-red-800 xl:px-8 xl:py-4 sm:px-6 sm:py-3 max-[640px]:py-3 max-[640px]:px-6"
            >
              <span className="absolute inset-0 w-0 bg-neutral-800 transition-all duration-700 ease-out group-hover:w-full" />
              <span className="relative z-10 capitalize whitespace-nowrap">Read more</span>
            </Link>
          </div>
        </div>
      </section>

      {/* EVENTS (from DB) */}
      <section className="flex flex-col gap-8 max-w-7xl mx-auto lg:py-25 sm:px-20 sm:py-20 max-[640px]:py-20 max-[640px]:px-10">
        <div className="flex justify-between items-center">
          <h1 className="xl:text-5xl lg:text-4xl md:text-3xl sm:text-2xl max-[640px]:text-3xl font-semibold leading-tight font-playfair text-neutral-800">
            Events
          </h1>
          <Link href="/events" className="text-red-800 underline underline-offset-4 font-medium hover:text-red-600 transition-colors md:text-md sm:text-sm max-[640px]:text-sm">
            View All
          </Link>
        </div>

        <div className="bg-neutral-100 overflow-hidden shadow-md">
          <div className="flex flex-col lg:flex-row">
            <div className="w-full lg:w-3/5 flex flex-col justify-between">
              {events.map((ev, idx) => {
                const number = String(idx + 1).padStart(2, "0");
                return (
                  <Link
                    href={`/events/${ev.slug}?from=home`}
                    key={ev.id}
                    className="group flex items-start gap-6 p-5 cursor-pointer transition-colors duration-300 hover:bg-red-800 max-[425px]:flex-col max-[425px]:items-center max-[425px]:gap-2 last:pb-10"
                  >
                    <div className="text-5xl font-bold min-w-[3rem] font-playfair text-red-800 group-hover:text-neutral-100 px-4 py-3 max-[425px]:px-0 max-[425px]:py-0 max-[425px]:text-red-800 max-[425px]:text-4xl">
                      {number}
                    </div>
                    <div className="flex flex-col px-4 py-3 max-[640px]:py-0 max-[425px]:px-0 max-[425px]:items-center max-[425px]:w-full">
                      <hr className="hidden max-[425px]:block w-full border-t border-neutral-200/70 my-3" />
                      <p className="text-lg font-semibold font-playfair text-red-800 group-hover:text-neutral-100 max-[425px]:text-center">
                        {ev.title}
                      </p>
                      <div className="flex items-center gap-6 text-sm text-neutral-600 mt-1 font-roboto group-hover:text-neutral-200 max-[640px]:flex-col max-[640px]:items-start max-[640px]:gap-1 max-[640px]:mt-2 max-[640px]:text-xs max-[425px]:flex-row max-[425px]:items-center max-[425px]:justify-center max-[425px]:gap-4 max-[425px]:text-sm max-[385px]:text-xs max-[355px]:flex-col">
                        <span className="inline-flex items-center gap-2 leading-tight">
                          <CalendarDays className="h-4 w-4" />
                          <span>{formatDate(ev.date)}</span>
                        </span>
                        {ev.location && (
                          <span className="inline-flex items-center gap-2 leading-tight">
                            <MapPin className="h-4 w-4" />
                            <span>{ev.location}</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="w-full lg:w-2/5 flex-shrink-0">
              <Image
                src="/images/rut-miit-3EMw3T-ZjkE-unsplash.webp"
                width={1000}
                height={700}
                alt="Graduating students"
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="w-full h-64 sm:h-80 lg:h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* DEPARTMENTS (from DB) */}
      <section className="max-w-7xl mx-auto sm:px-20 sm:pb-20 lg:pb-25 max-[640px]:pb-20 max-[640px]:px-10">
        <h2 className="xl:text-5xl lg:text-4xl md:text-3xl sm:text-2xl max-[640px]:text-3xl font-playfair font-semibold mb-12 text-center text-neutral-800">
          Our Departments
        </h2>
        <div className="grid grid-cols-1 min-[500px]:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-10 justify-items-center">
          {departments.map((d: DeptCard) => {
            const img = d.image ?? "/images/departments/default.webp";
            return (
              <div key={d.slug} className="w-full max-w-60 min-[500px]:max-w-7xl sm:max-w-none mx-auto">
                <Link href={`/departments/${d.slug}`} className="block w-full overflow-hidden group" aria-label={`Visit ${d.name} department page`}>
                  <Image
                    src={img}
                    alt={d.name}
                    width={288}
                    height={208}
                    className="w-full h-auto object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                  />
                </Link>
                <Link
                  href={`/departments/${d.slug}`}
                  className="flex justify-between items-center w-full border border-neutral-100 border-t-0 px-3 py-2 text-sm font-roboto text-black transition-colors duration-300 hover:text-red-800 group"
                >
                  <span className="group-hover:underline lg:text-lg sm:text-md group-hover:decoration-red-800 max-[640px]:text-md">
                    {d.name}
                  </span>
                  <span className="transition-colors duration-300 group-hover:text-red-800">→</span>
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* NEWS (from DB) */}
      <section className="flex flex-col gap-8 max-w-7xl mx-auto sm:px-20 sm:pb-20 lg:pb-25 max-[640px]:pb-20 max-[640px]:px-10">
        <div className="flex justify-between items-center">
          <h1 className="justify-center max-[640px]:text-center xl:text-5xl lg:text-4xl md:text-3xl sm:text-2xl max-[640px]:text-3xl font-semibold leading-tight font-playfair text-neutral-800">
            Read Our Latest News
          </h1>
          <Link href="/news" className="text-red-800 underline underline-offset-4 font-medium hover:text-red-600 transition-colors md:text-md sm:text-sm max-[640px]:hidden">
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 min-[767px]:grid-cols-2 gap-8">
          {latestNews.map((post: NewsCard) => (
            <Link
              key={post.id}
              href={`/news?id=${post.id}&from=home`} // keep your current route style
              aria-label={`Read news: ${post.title}`}
              className="group flex gap-5 p-5 border border-neutral-200 shadow-sm hover:shadow-md transition-shadow max-[963px]:flex-col max-[963px]:gap-4"
            >
              <div className="h-[12rem] w-[12rem] overflow-hidden max-[963px]:w-full max-[963px]:h-56">
                <Image
                  src={post.image ?? "/images/news/default.webp"}
                  alt={post.title}
                  width={1920}
                  height={1080}
                  sizes="(max-width: 963px) 100vw, 12rem"
                  className="h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                />
              </div>
              <div className="flex flex-col gap-2 justify-center max-[963px]:pt-2">
                <h3 className="text-lg font-semibold font-playfair text-neutral-800 group-hover:text-red-800">{post.title}</h3>
                {post.excerpt && <p className="text-sm sm:text-base font-roboto text-neutral-600 mt-1">{post.excerpt}</p>}
                <span className="text-sm text-stone-500 font-roboto mt-2">{formatDate(post.date)}</span>
              </div>
            </Link>
          ))}
        </div>

        <Link
          href="/news"
          className="hidden max-[640px]:block max-[640px]:self-center max-[640px]:text-center text-red-800 underline underline-offset-4 font-medium hover:text-red-600 transition-colors md:text-md sm:text-sm max-[640px]:text-sm"
        >
          View All
        </Link>
      </section>
    </main>
  );
}

function formatDate(d: Date | string) {
  const date = d instanceof Date ? d : new Date(d);
  return date.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
}
