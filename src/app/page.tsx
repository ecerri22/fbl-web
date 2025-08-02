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
      <section className="flex flex-col py-25 px-15 gap-20 items-center"> 
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

            <h1 className="text-4xl md:text-6xl font-semibold leading-tight font-playfair text-stone-800">
              About University
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
       <section className="px-6 md:px-16 pb-20 max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-semibold leading-tight font-playfair text-stone-800 mb-12 text-center">
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
    </main>
  );
}
