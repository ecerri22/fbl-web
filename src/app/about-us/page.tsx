import PageWrapper from "@/components/PageWrapper";
// import { Link } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <PageWrapper>
      <main className="text-neutral-800 min-h-screen max-w-7xl mx-auto space-y-24 px-6 md:px-0 py-10">

        {/* About Section */}
        <section className="flex flex-row items-center pb-10 border-b-1 border-neutral-300">
          {/* Left */}
          <div className="w-2/5 ">
            <h1 className="text-3xl font-semibold leading-tight font-playfair text-neutral-800">
              About Faculty of Business and Law
            </h1>
          </div>

          {/* Right */}
          <div className="w-3/5 flex flex-col justify-center h-full space-y-6 border-l-1 border-neutral-300 px-10">
            <p className="font-roboto text-neutral-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente consequuntur officia id error? Ipsum harum tempora laboriosam magni aut deserunt, illo ipsa porro totam. Doloremque perspiciatis deleniti officiis quibusdam sint?
            </p>
          </div>
        </section>

        {/* Stats section  */}
        <section className="grid md:grid-cols-[7fr_3fr] gap-12 items-stretch h-[28rem]">
          {/* Left: Image */}
          <div className="relative w-full h-full overflow-hidden shadow-md">
            <Image
              src="/images/javier-trueba-iQPr1XkF5F0-unsplash.jpg"
              alt="Happy students celebrating"
              fill
              className="object-cover object-top"
              priority
            />
          </div>

          {/* Right: Stats */}
          <div className="flex flex-col justify-between h-full space-y-6 max-w-full overflow-hidden">
            {[ "20,000", "15,000", "10,000" ].map((count, i) => (
              <div key={i} className="flex flex-col bg-red-800 text-neutral-200 p-6 shadow-md w-full">
                <p className="font-playfair text-5xl">{count}</p>
                <p className="font-roboto text-md">undergraduate and graduate students</p>
              </div>
            ))}
          </div>
        </section>

        {/* Message from the Dean Section */}
        <section className="max-w-4xl mx-auto text-center space-y-6 py-10 border-t border-b border-neutral-200">
          <h2 className="text-3xl font-semibold font-playfair text-neutral-800">
            Message from the Dean
          </h2>
          <p className="text-neutral-600 font-roboto italic text-lg leading-relaxed">
            Welcome to the Faculty of Business and Law. Our mission is to cultivate future leaders who are grounded in ethics, driven by innovation, and committed to making meaningful contributions to society. 
          </p>
          <p className="text-neutral-600 font-roboto italic text-lg leading-relaxed">
            At FBL, we believe in the power of education to transform lives and communities. Whether you&#39;re a prospective student, a parent, or a partner, I invite you to explore what makes our faculty a place of excellence and opportunity.
          </p>
          <p className="text-neutral-700 font-roboto font-semibold mt-4 text-red-800">– Shpëtim Çerri, Dean of the Faculty of Business and Law</p>
        </section>

        {/* History of FBL Section */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Image */}
          <div className="relative w-full h-[25rem] overflow-hidden shadow-md">
            <Image
              src="/images/the-jopwell-collection-0UnuYI_HrTA-unsplash.jpg"
              alt="Historic photo related to FBL"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Right: Content */}
          <div className="flex flex-col justify-center h-full space-y-6">
            <h1 className="text-3xl font-semibold leading-tight font-playfair text-neutral-800">
              The History of FBL
            </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente consequuntur officia id error? Ipsum harum tempora laboriosam magni aut deserunt, illo ipsa porro totam. Doloremque perspiciatis deleniti officiis quibusdam sint?
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum excepturi reprehenderit debitis. Repudiandae cum totam labore tenetur quasi, corrupti facere, corporis reiciendis consectetur eveniet ipsam nemo exercitationem nesciunt earum eum?
            </p>
          </div>
        </section>

        {/* Mission and Values Section */}
        <section className="px-4 md:px-0 max-w-7xl mx-auto">
          <h2 className="text-3xl font-semibold font-playfair text-neutral-800 text-center mb-10">
            Mission and Values
          </h2>

          <div className="flex flex-col md:flex-row justify-between">
            {/* Left Column (shifted down slightly) */}
            <div className="flex flex-col gap-20 flex-1 md:mt-20 pr-20">
              {[
                {
                  title: "Diversity",
                  description:
                    "Celebrating a rich tapestry of backgrounds, perspectives, and talents",
                  image: "/images/sincerely-media-dGxOgeXAXm8-unsplash.jpg",
                },
                {
                  title: "Integrity",
                  description: "Upholding the highest standards of honesty and ethics",
                  image: "/images/priscilla-du-preez-ggeZ9oyI-PE-unsplash.jpg",
                },
              ].map((item, index) => (
                <div key={index} className="flex flex-col gap-3  ">
                  <h3 className="text-xl font-playfair text-neutral-800 self-end">{item.title}</h3>
                  <p className="text-md font-roboto text-neutral-500 self-end w-3/5 text-end">{item.description}</p>
                  <div className="overflow-hidden rounded-md">
                    <Image
                      src={item.image}
                      width={600}
                      height={400}
                      alt={item.title}
                      className="object-cover w-full h-80 transition-transform duration-500 ease-in-out hover:scale-105"
                    />
                  </div>

                </div>
              ))}
            </div>

            {/* Right Column with left border */}
            <div className="flex flex-col gap-20 flex-1 md:pt-10 border-l border-neutral-200 pl-20">
              {[
                {
                  title: "Excellence",
                  description: "Pursuing the highest standards in learning and leadership",
                  image: "/images/jeswin-thomas-MvTdmNqE_dA-unsplash.jpg",
                },
                {
                  title: "Innovation",
                  description: "Encouraging creativity, curiosity, and new ideas",
                  image: "/images/dom-fou-YRMWVcdyhmI-unsplash.jpg",
                },
              ].map((item, index) => (
                <div key={index} className="flex flex-col gap-3">
                  <h3 className="text-xl font-playfair text-neutral-800">{item.title}</h3>
                  <p className="text-md font-roboto text-neutral-500 text-start w-3/5">{item.description}</p>
                  <div className="overflow-hidden rounded-md">
                    <Image
                      src={item.image}
                      width={600}
                      height={400}
                      alt={item.title}
                      className="object-cover w-full h-80 transition-transform duration-500 ease-in-out hover:scale-105"
                    />
                  </div>

                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-16 border-t border-neutral-300">
          <h2 className="text-2xl font-playfair mb-4">Ready to explore more?</h2>
          <p className="text-neutral-600 mb-6">Discover our academic programs and see where your future begins.</p>
          <Link
            href="/programs"
            className="relative inline-block px-8 py-4 font-roboto text-white overflow-hidden bg-red-800 group"
          >
            <span className="absolute inset-0 w-0 bg-neutral-800 transition-all duration-700 ease-out group-hover:w-full z-0"></span>
            <span className="relative z-10 capitalize whitespace-nowrap">
              View our programs
            </span>
          </Link>

        </section>

      </main>
    </PageWrapper>
  );
}
