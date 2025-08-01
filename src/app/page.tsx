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
      <section className="grid grid-cols-1 md:grid-cols-2 items-center">
        
        {/* Text content */}
        <div className="relative h-96 md:h-[500px] p-30 bg-cover bg-center bg-[url('/images/the-jopwell-collection-0UnuYI_HrTA-unsplash.jpg')]">
          {/* Blue overlay */}
          <div className="absolute inset-0 bg-blue-950 opacity-90 z-0" />

          {/* Content */}
          <div className="relative z-10 flex flex-col justify-center h-full space-y-6 text-white">
            <p className="text-sm text-red-700 font-bold uppercase tracking-widest px-4">Welcome to the Faculty of Business and Law</p>
            <h1 className="text-4xl md:text-5xl font-semibold leading-tight px-4">
              We Provide High Quality <span className="underline decoration-red-800">Education</span> For Everyone
            </h1>
            <p className="px-4 text-base text-zinc-100">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam voluptas nihil deserunt sequi assumenda laudantium ipsam velit quos fuga consectetur.
            </p>
          </div>
        </div>


        {/* Right Image */}
        <div className="relative w-full h-96 md:h-[500px]">
          <Image
            // src="/images/fakulteti-ekonomik-uniel.jpg"
            src="/images/the-jopwell-collection-0UnuYI_HrTA-unsplash.jpg"
            alt="hero-banener"
            fill
            className="object-cover w-full h-full"
          />

        </div>

      </section>

      {/* ABOUT SECTION  */}
      <section className=" flex flex-col md:flex-row gap-12 px-30 py-25 items-start">
        {/* LEFT SIDE */}
        <div className="space-y-6 p-3 basis-[40%]">
          <p className="text-zinc-500 text-base leading-relaxed">
            Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt.
          </p>
          <p className="text-zinc-500 text-base leading-relaxed">
            Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus.
          </p>

          <div>
            <h6 className="text-zinc-800 font-bold text-lg tracking-wide">John Doe</h6>
            <p className="text-sm text-zinc-500">Dean</p>
          </div>
        </div>

        {/* RIGHT SIDE – About Section */}
        <div className="space-y-6 basis-[60%]">
          <h6 className="text-md font-semibold text-red-700 uppercase tracking-widest">About FBL</h6>
          <h2 className="text-3xl text-zinc-800 leading-tight font-semibold">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corrupti minima eum ex impedit repudiandae corporis.
          </h2>
          <p className="text-base text-zinc-500 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
          </p>
          <Link href="/about-us" passHref>
            <button className="bg-red-700 hover:bg-red-800 transition text-white font-semibold text-xs uppercase px-6 py-3 tracking-wider">
              Read More
            </button>
          </Link>

        </div>
      </section>

      {/* STUDY PROGRAMS  */}
      <section className="bg-blue-950 flex flex-col md:flex-row gap-12 px-30 py-25 items-center ">
        {/* LEFT SIDE */}
        <div className="space-y-6 basis-[50%]">
          <h6 className="text-md font-semibold text-red-700 uppercase tracking-widest">Study Programs</h6>
          <h2 className="text-3xl font-semibold text-zinc-200 leading-tight">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corrupti minima eum ex impedit repudiandae corporis.
          </h2>
          <p className="text-base text-zinc-400 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
          </p>
          <Link href="/study-programs">
            <button className="bg-red-700 hover:bg-red-800 transition text-white font-semibold text-xs uppercase px-6 py-3 tracking-wider">
              View All Programs
            </button>
          </Link>
        </div>
       

        {/* RIGHT SIDE */}
         <div className="flex flex-col gap-6 space-y-6 basis-[50%]">
          {/* Bachelor's Card */}
          <Link href="/study-programs?type=bachelor" passHref>
            <div className="bg-white text-blue-950 p-6 rounded-md shadow group relative overflow-hidden transition hover:shadow-lg cursor-pointer">
              <h3 className="text-xl font-semibold mb-1">Bachelor’s Degree Programs</h3>
              <p className="text-sm text-zinc-600">
                Explore a variety of undergraduate programs tailored to your future.
              </p>
              <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition duration-300">
                <ArrowRight className="w-6 h-6 text-red-700" />
              </div>
            </div>
          </Link>

          {/* Master's Card */}
          <Link href="/study-programs?type=master" passHref>
            <div className="bg-white text-blue-950 p-6 rounded-md shadow group relative overflow-hidden transition hover:shadow-lg cursor-pointer">
              <h3 className="text-xl font-semibold mb-1">Master’s Degree Programs</h3>
              <p className="text-sm text-zinc-600">
                Advance your education with specialized graduate programs.
              </p>

              <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition duration-300">
                <ArrowRight className="w-6 h-6 text-red-700" />
              </div>
            </div>
          </Link>
        </div>



      </section>

      {/* WHY CHOOSE FBL */}
      <section className="bg-zinc-50 py-24 px-6 md:px-20">
        <div className="max-w-6xl mx-auto text-center">
          <h6 className="text-md font-semibold text-red-700 uppercase tracking-widest mb-5">Why Choose FBL</h6>
          <h2 className="text-4xl font-bold text-blue-950 mb-4">Empowering Your Future</h2>
          <p className="text-zinc-600 mb-12 max-w-2xl mx-auto text-base">
            Discover how the Faculty of Business and Law equips students with the tools, knowledge, and mindset to succeed - in Albania and beyond.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
            {features.map((item, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-1 text-center"
              >
                <div className="mb-4 flex justify-center">{item.icon}</div>
                <h3 className="text-lg font-semibold text-blue-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* EVENTS  */}
      <section className="bg-blue-950 flex flex-col md:flex-row gap-12 px-30 py-25 items-center">
        <div className="max-w-5xl mx-auto text-center">
          <h6 className="text-md font-semibold text-red-700 uppercase tracking-widest mb-5">Our Events</h6>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Check Our Latest Events</h2>
          <p className="text-zinc-300 mb-12 max-w-2xl mx-auto">
            Explore our upcoming academic and community events hosted by the Faculty of Business and Law.
          </p>

          <div className="space-y-8">
            {events.map((event, i) => (
              <div
                key={i}
                className="bg-white text-blue-950 flex items-center gap-6 p-6 rounded-md shadow hover:shadow-lg transition"
              >
                {/* Date Box */}
                <div className="bg-blue-900 text-white px-4 py-2 rounded-md text-center w-16 shrink-0">
                  <p className="text-xl font-bold">{event.date}</p>
                  <p className="text-sm uppercase tracking-wide">{event.month}</p>
                </div>

                {/* Event Info */}
                <div className="flex-1 text-left space-y-1">
                  <h3 className="text-lg font-semibold">{event.title}</h3>
                  <div className="flex items-center text-sm text-gray-600 gap-4 flex-wrap">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" /> {event.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" /> {event.time}
                    </span>
                    {/* <span className="flex items-center gap-1">
                      <Ticket className="w-4 h-4" /> {event.price}
                    </span> */}
                  </div>
                </div>

                {/* View Details */}
                <div className="text-sm text-red-700 font-medium flex items-center gap-1 cursor-pointer hover:underline">
                  {/* View Details <ArrowRight className="w-4 h-4" /> */}
                  <Link
                    // href={`/events/${event.slug}`}
                    href="/events"
                    className="text-red-700 font-medium text-sm hover:underline inline-flex items-center gap-1"
                  >
                    View Details →
                  </Link>

                </div>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <Link href="/events" passHref>
              <button className="bg-red-700 hover:bg-red-800 transition text-white font-semibold text-xs uppercase px-8 py-3 tracking-wider rounded">
                View All Events
              </button>
            </Link>
          </div>

        </div>
      </section>

      {/* NEWS SECTION */}
      <section className="bg-white py-24 px-6 md:px-20 text-blue-950">
        <div className="max-w-6xl mx-auto text-center">
          <h6 className="text-sm font-semibold text-red-700 uppercase tracking-widest mb-5">Latest News</h6>
          <h2 className="text-4xl font-bold mb-4">Announcements & Activities</h2>
          <p className="text-gray-600 mb-16 max-w-2xl mx-auto text-base">
            What’s happening around FBL: important notices, exciting student activities, and academic updates worth reading.
          </p>
        </div>

        {/* News Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Featured Card */}
          <div className="h-50 col-span-1 md:col-span-2 bg-zinc-50 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition group">
            <div className="md:flex">
              <div className="w-full md:w-1/2 h-64 md:h-auto overflow-hidden">
                <img
                  src="/images/fakulteti-ekonomik-uniel.jpg"
                  alt="Featured News"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="p-6 text-left space-y-3 flex-1">
                <span className="text-xs text-red-700 font-semibold uppercase">Announcement • Aug 10, 2025</span>
                <h3 className="text-xl font-semibold text-blue-950 group-hover:text-red-700 transition">
                  Application Deadline for Master’s Programs Extended
                </h3>
                <p className="text-sm text-gray-600">
                  The new deadline for Fall 2025 applications is August 15. This gives students additional time to submit all required documents...
                </p>
                <div className="text-sm text-red-700 font-medium flex items-center gap-1 hover:underline mt-2 cursor-pointer">
                  Read More <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-zinc-50 rounded-xl shadow hover:shadow-lg transition p-6 space-y-3">
            <span className="text-xs text-red-700 font-semibold uppercase">Activity • July 18, 2025</span>
            <h4 className="text-lg font-semibold text-blue-900">Student Clubs Host Business Law Debate</h4>
            <p className="text-sm text-gray-600">
              A vibrant panel discussion brought students together to discuss the digital future of legislation.
            </p>
            <div className="text-sm text-red-700 font-medium flex items-center gap-1 hover:underline mt-2 cursor-pointer">
              Read More <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-zinc-50 rounded-xl shadow hover:shadow-lg transition p-6 space-y-3">
            <span className="text-xs text-red-700 font-semibold uppercase">Notice • July 01, 2025</span>
            <h4 className="text-lg font-semibold text-blue-900">Library Summer Hours Announced</h4>
            <p className="text-sm text-gray-600">
              The library will operate 08:00–14:00 during the summer break. Please plan your study hours accordingly.
            </p>
            <div className="text-sm text-red-700 font-medium flex items-center gap-1 hover:underline mt-2 cursor-pointer">
              Read More <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Link href="/news" passHref>
            <button className="bg-red-700 hover:bg-red-800 transition text-white font-semibold text-sm uppercase px-8 py-3 tracking-wide rounded">
              View All News
            </button>
          </Link>
        </div>
      </section>



    </main>
  );
}
