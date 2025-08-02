import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Briefcase, Globe, GraduationCap, Lightbulb, User, UserCheck, Users, CalendarDays, MapPin, Clock, Ticket } from "lucide-react";
import Link from "next/link";
// import { events } from "@/data/eventsData";

export default function Home() {

  const features = [
    {
      icon: <Lightbulb className="w-8 h-8 text-red-700" />,
      title: "Innovative Programs",
      description: "Our curriculum is built to respond to modern challenges in business and law.",
    },
    {
      icon: <Users className="w-8 h-8 text-red-700" />,
      title: "Expert Faculty",
      description: "Learn from professors with real-world experience and academic excellence.",
    },
    {
      icon: <Briefcase className="w-8 h-8 text-red-700" />,
      title: "Career Focused",
      description: "Internships, career services, and employer partnerships to prepare you for work.",
    },
    {
      icon: <Globe className="w-8 h-8 text-red-700" />,
      title: "Global Perspective",
      description: "International programs and Erasmus+ opportunities across Europe.",
    },
  ];

  const events = [
    {
      date: "15",
      month: "June",
      title: "Webinar",
      location: "Hall",
      time: "10:00 A.M. - End",
      // price: "$20.00",
    },
    {
      date: "24",
      month: "July",
      title: "Career Fair",
      location: "Hall",
      time: "10:00 A.M. - End",
    },
    {
      date: "11",
      month: "Aug",
      title: "Webinar",
      location: "Hall",
      time: "10:00 A.M. - End",
    },
  ];



  return (
    <main className="min-h-screen bg-white">
      {/* HERO SECTION */}
      <section className="grid grid-rows-2 h-[50rem]">
        <div 
          className="relative h-96 md:h-[50rem] bg-cover bg-center bg-[url('/images/rut-miit-3EMw3T-ZjkE-unsplash.jpg')] grid grid-rows-2 h-full"
        >
    
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
                <span className="absolute inset-0 w-0 bg-blue-950 transition-all duration-700 ease-out group-hover:w-full"></span>
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


    </main>
  );
}
