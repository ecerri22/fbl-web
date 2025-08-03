import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Briefcase, Globe, GraduationCap, Lightbulb, User, UserCheck, Users, CalendarDays, MapPin, Clock, Ticket } from "lucide-react";
import Link from "next/link";
// import { events } from "@/data/eventsData";


export default function Home() {

  return (
    <main className="min-h-screen bg-white">
      {/* HERO SECTION */}
      <section className="grid grid-rows-2 h-[50rem]">
        <div className="relative h-96 md:h-[50rem] bg-cover bg-center bg-[url('/images/rut-miit-3EMw3T-ZjkE-unsplash.jpg')] grid grid-rows-2 h-full">
          {/* Text in bottom row */}
          <div className="relative align-end z-10 p-15 justify-items-end grid grid-cols-1 md:grid-cols-2 items-center text-white row-start-2">
            {/* Left: Headline */}
            <div className="flex flex-col items-start justify-center space-y-6">
                <p className="text-md font-roboto font-bold lowercase tracking-widest">
                  Knowledge meets innovation
                </p>

                <h1 className="text-4xl md:text-6xl font-semibold leading-tight font-playfair">
                  Unleashing Potential Fostering Excellence
                </h1>

                <Link
                  href="/programs"
                  className="relative inline-block px-8 py-4 font-roboto text-white transition-colors duration-300 group overflow-hidden bg-red-800"
                >
                  <span className="absolute inset-0 w-0 bg-neutral-800 transition-all duration-700 ease-out group-hover:w-full"></span>
                  <span className="relative z-10 capitalize whitespace-nowrap">
                    View our programs
                  </span>
                </Link>
            </div>


            {/* Right: Links column */}
            <div className="flex flex-col items-start gap-8">        
              <Link href="/staff" className="flex flex-col px-6 py-3 gap-4">
                <h3 className="font-playfair text-2xl ">Undergraduate</h3>
                <p className="font-roboto text-lg underline underline-offset-20 hover:decoration-red-800 transition-all duration-500 ease-out ">Browse the Undergraduate degrees</p>
              </Link>
              <Link href="/staff" className="flex flex-col px-6 py-3 gap-4">
                <h3 className="font-playfair text-2xl ">Graduate</h3>
                <p className="font-roboto text-lg underline underline-offset-20 hover:decoration-red-800 transition-all duration-500 ease-out ">Browse the Graduate degrees</p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION  */}
      <section className="flex flex-col py-25 px-20 gap-20 items-center"> 
        <div className="flex flex-row items-end gap-10 w-full max-w-screen-xl mx-auto">
          <div className="w-1/2 flex justify-end items-end gap-10 ">
          
            <Image
              src="/images/rut-miit-oTglG1D4hRA-unsplash.jpg"
              width={280}
              height={280}
              alt="graduation cap in the air"
              className="object-cover shadow-md -translate-y-4"
            />
            <Image
              src="/images/joecalih-WyBizVgCrDY-unsplash.jpg"
              width={280}
              height={280}
              alt="Student graduation"
              className="object-cover shadow-md translate-y-4"
            />
          </div>
          
          <div className="flex flex-col items-start justify-center space-y-6 w-1/2">
            <p className="text-md font-roboto font-bold lowercase tracking-widest text-red-800">
              Knowledge meets innovation
            </p>

            <h1 className="text-4xl md:text-5xl font-semibold leading-tight font-playfair text-stone-800">
              About FBL
            </h1>
            
            <p className="text-stone-600">At FBL, we believe in the transformative power of education and the boundless potential that resides within each individual. Our mission is to foster intellectual curiosity, empower individuals to realize their fullest potential, and contribute meaningfully to the betterment of society. commitment to academic excellence, diversity, and community engagement.</p>
            
            <Link
              href="/programs"
              className="relative inline-block px-8 py-4 font-roboto text-white transition-colors duration-300 group overflow-hidden bg-red-800"
            >
              <span className="absolute inset-0 w-0 bg-neutral-800 transition-all duration-700 ease-out group-hover:w-full"></span>
              <span className="relative z-10 capitalize whitespace-nowrap">
                View our programs
              </span>
            </Link>
          </div>
        </div>

        <div className="flex flex-row bg-red-800 text-neutral-100 px-10 py-8 text-center w-fit items-stretch">
          <div className="flex-1 flex flex-col  border-e-2 border-red-700 px-10 gap-5">
            <p className="font-playfair text-5xl">90%</p>
            <p className="font-roboto text-lg">Post-Graduation Success Rate</p>
          </div>

          <div className="flex-1 flex flex-col  border-e-2 border-red-700 px-10 gap-5">
            <p className="font-playfair text-5xl">Top 10</p>
            <p className="font-roboto text-lg">Colleges That Create Futures</p>
          </div>

          <div className="flex-1 flex flex-col  px-10 gap-5">
            <p className="font-playfair text-5xl">No. 1</p>
            <p className="font-roboto text-lg">In The Nation For Materials R&D</p>
          </div>
      </div>

      </section>

      {/* ACADEMIC & PROGRAMS */}
       <section className="px-20 md:px-20 pb-20 max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-semibold leading-tight font-playfair text-stone-800 mb-12 text-center">
          Academics & Programs
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Undergraduate */}
          <div className="p-8 bg-neutral-100">
            <h3 className="text-3xl font-semibold font-playfair text-stone-800 mb-6">
              Undergraduate
            </h3>
            <ul className="space-y-4">

              {["Finance", "Marketing", "Information Systems"].map((major) => (
                <li key={major}>
                  <Link
                    href="#"
                    className="group inline-flex items-center justify-between border border-neutral-800 px-6 py-3 text-neutral-800 font-roboto text-lg w-full hover:border-transparent hover:bg-red-800 hover:text-white transition-colors"
                  >
                    {major}
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}

              <li>
                <Link
                  href="#"
                  className="inline-flex justify-center border border-neutral-800/60 text-neutral-800/80 px-6 py-3 font-roboto text-lg w-full hover:border-neutral-800 hover:text-neutral-800 transition-colors"
                >
                  See More
                </Link>
              </li>

            </ul>
          </div>

          {/* Graduate */}
          <div className="p-8 bg-red-800">
            <h3 className="text-3xl font-semibold font-playfair text-neutral-100 mb-6 ">
              Graduate
            </h3>
            <ul className="space-y-4">
              {["Business Analytics", "Economics", "Project Management"].map(
                (major) => (
                  <li key={major}>
                    <Link
                      href="#"
                      className="group inline-flex items-center justify-between border border-neutral-100 px-6 py-3 text-neutral-100 font-roboto text-lg w-full hover:bg-neutral-100 hover:text-red-800 transition-colors"
                    >
                      {major}
                      <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </li>
                )
              )}

              <li>
                <Link
                  href="#"
                  className="inline-flex justify-center border border-white/60 text-white/80 px-6 py-3 font-roboto text-lg w-full hover:text-white hover:border-white transition-colors"
                >
                  See More
                </Link>
              </li>

            </ul>
          </div>
        </div>
      </section>

      {/* Scholarships */}
      <section className="relative bg-fixed bg-center bg-cover bg-[url('/images/rut-miit-3EMw3T-ZjkE-unsplash.jpg')]">
        <div className="absolute inset-0 bg-black/80 z-0" />

        <div className="relative z-10 flex items-center justify-center px-6 py-20">
          <div className="max-w-3xl text-center text-white space-y-8">
            <h1 className="text-3xl md:text-5xl font-semibold leading-tight font-playfair">
              Scholarships and Financial Aid
            </h1>
            <p className="text-lg font-roboto">
              Each semester, we are proud to honor academically talented and exceptionally skilled students
              with a variety of scholarships and awards. Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Est reiciendis sed aspernatur aliquam facilis repellat quaerat a fugiat fuga quam!
            </p>
            <Link
              href="/programs"
              className="relative inline-block px-8 py-4 font-roboto text-white transition-colors duration-300 group overflow-hidden bg-red-800"
            >
              <span className="absolute inset-0 w-0 bg-neutral-800 transition-all duration-700 ease-out group-hover:w-full"></span>
              <span className="relative z-10 capitalize whitespace-nowrap">
                Read more
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* EVENTS */}
      <section className="flex flex-col gap-8 max-w-7xl mx-auto px-6 md:px-20 py-20">
        {/* Header with title and link */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl md:text-5xl font-semibold leading-tight font-playfair text-stone-800">
            Events
          </h1>
          <Link
            href="#"
            className="text-red-800 underline underline-offset-4 font-medium hover:text-red-600 transition-colors"
          >
            View All
          </Link>
        </div>

        {/* Content container */}
        <div className="bg-neutral-100 flex flex-col md:flex-row overflow-hidden shadow-md">
          {/* Events list */}
          <div className="w-3/5 flex flex-col flex-1 justify-between">
          {[ 
            {
              number: "01",
              title: "Cultural Exchange: Building Global Connections",
              date: "August 20, 2024",
              location: "Albania"
            },
            {
              number: "02",
              title: "International Symposium on Business Ethics",
              date: "September 15, 2024",
              location: "Rome, Italy"
            },
            {
              number: "03",
              title: "Annual Career Fair and Networking Event",
              date: "October 10, 2024",
              location: "New York, USA"
            }
          ].map(({number, title, date, location}) => (
             <div
                key={number}
                className="group flex items-start gap-6p p-5 cursor-pointer transition-colors duration-300 hover:bg-red-800"
              >
                {/* Padding on number container */}
                <div className="text-5xl font-bold min-w-[3rem] font-playfair text-red-800 group-hover:text-neutral-100 px-4 py-3">
                  {number}
                </div>

                {/* Padding on text container */}
                <div className="flex flex-col px-4 py-3">
                  <p className="text-lg font-semibold font-playfair text-red-800 group-hover:text-neutral-100">
                    {title}
                  </p>
                  <div className="flex gap-6 text-sm text-stone-600 mt-1 font-roboto group-hover:text-neutral-200">
                    <span>{date}</span>
                    <span>{location}</span>
                  </div>
                </div>
              </div>
          ))}
        </div>



          {/* Side image */}
          <div className="w-2/5 hidden md:block flex-shrink-0">
            <Image
              src="/images/rut-miit-3EMw3T-ZjkE-unsplash.jpg"
              width={500}
              height={500}
              alt="Graduating students"
              className="object-cover h-full w-full"
            />
          </div>
        </div>
      </section>

      {/* NEWS */}
      <section className="flex flex-col gap-12 max-w-7xl mx-auto px-6 md:px-20 py-20">
        {/* Header with title and link */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl md:text-5xl font-semibold leading-tight font-playfair text-stone-800">
            Read Our Latest News
          </h1>
          <Link
            href="#"
            className="text-red-800 underline underline-offset-4 font-medium hover:text-red-600 transition-colors"
          >
            View All
          </Link>
        </div>

        {/* News list */}
        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              img_alt: "students auditorium",
              img_src: "/images/joecalih-WyBizVgCrDY-unsplash.jpg",
              title: "Those Inequalities Are Inequalities",
              content: "10 Effective Study Tips for College Success. Welcome...",
              date: "August 20, 2024",
            },
            {
              img_alt: "students graduating",
              img_src: "/images/joecalih-WyBizVgCrDY-unsplash.jpg",
              title: "After Decades of Improvement",
              content: "10 Effective Study Tips for College Success. Welcome...",
              date: "September 15, 2024",
            },
          ].map(({ title, content, date, img_src, img_alt }, idx) => (
            <div
              key={idx}
              className="flex gap-5 p-5 border border-neutral-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <Link href={`/news/${idx}`} className="flex-shrink-0 block group">
                <div className="h-[12rem] w-[12rem] overflow-hidden ">
                  <Image
                    src={img_src}
                    alt={img_alt}
                    width={160}
                    height={160}
                    className="h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                  />
                </div>
              </Link>

              <div className="flex flex-col gap-2 justify-center">
                <Link
                  href={`/news/${idx}`}
                  className="text-lg font-semibold font-playfair text-neutral-800 hover:text-red-800"
                >
                  {title}
                </Link>
                <p className="text-sm font-roboto text-neutral-600 mt-1">{content}</p>
                <span className="text-sm text-stone-500 font-roboto mt-2">{date}</span>
              </div>
            </div>
          ))}
        </div>
      </section>



    </main>
  );
}
