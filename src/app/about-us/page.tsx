import PageWrapper from "@/components/PageWrapper";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <PageWrapper>
      <div className="text-neutral-800 space-y-16 md:space-y-20 sm:space-y-20 max-[640px]:space-y-15">

        {/* About Section */}
        <section className="lg:text-start md:text-center sm:text-center max-[640px]:text-center grid grid-cols-1 lg:grid-cols-[2fr_3fr] items-center gap-8 md:gap-12 pb-10 border-b border-neutral-300 md:justify-items-center sm:justify-items-center max-[640px]:justify-items-center">
          {/* Left */}
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight font-playfair text-neutral-800">
              About Faculty of Business and Law
            </h1>
          </div>

          {/* Right */}
          <div className="lg:border-l lg:border-neutral-300 lg:pl-10 ">
            <p className="font-roboto text-neutral-600 leading-relaxed max-w-prose max-[425px]:text-sm text-base">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente consequuntur officia id error? Ipsum harum tempora laboriosam magni aut deserunt, illo ipsa porro totam. Doloremque perspiciatis deleniti officiis quibusdam sint?
            </p>
          </div>
        </section>

        {/* Stats section  */}
        <section className="grid grid-cols-1 lg:grid-cols-[7fr_3fr] gap-8 md:gap-12 space-between">
          {/* Left: Image */}
          <div
            className="
              relative overflow-hidden shadow-md
              aspect-[16/9] md:aspect-[21/9]   /* keep aspect on small/medium */
              lg:aspect-auto lg:min-h-[28rem]  /* on large: drop aspect, ensure height */
            "
          >
            <Image
              src="/images/javier-trueba-iQPr1XkF5F0-unsplash.webp"
              alt="Happy students celebrating"
              fill
              className="object-cover object-top"
              priority
              sizes="(min-width:1280px) 70vw, (min-width:1024px) 66vw, 100vw"
            />
          </div>

          {/* Right: Stats */}
          <div className="flex flex-col gap-4 lg:self-stretch">
            {["20,000", "15,000", "10,000"].map((count, i) => (
              <div key={i} className="bg-red-800 text-neutral-100 p-6 shadow-md">
                <p className="font-playfair text-3xl sm:text-4xl md:text-5xl leading-none">{count}</p>
                <p className="font-roboto text-sm sm:text-base mt-2">
                  undergraduate and graduate students
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Message from the Dean Section */}
        <section className="max-w-3xl mx-auto text-center space-y-6 py-10 border-y border-neutral-200">
          <h2 className="text-2xl sm:text-3xl font-semibold font-playfair text-neutral-800">Message from the Dean</h2>
            <p className="text-neutral-600 font-roboto italic max-[425px]:text-sm text-md leading-relaxed">
            Welcome to the Faculty of Business and Law. Our mission is to cultivate future leaders who are grounded in ethics, driven by innovation, and committed to making meaningful contributions to society. 
          </p>
          <p className="text-neutral-600 font-roboto italic max-[425px]:text-sm text-md leading-relaxed">
            At FBL, we believe in the power of education to transform lives and communities. Whether you&#39;re a prospective student, a parent, or a partner, I invite you to explore what makes our faculty a place of excellence and opportunity.
          </p>
          <p className="text-sm sm:text-base font-roboto font-semibold mt-4 text-red-800">– John Doe, Dean of the Faculty of Business and Law</p>
        </section>

        {/* History of FBL Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left: Image */}
          <div className="relative w-full overflow-hidden shadow-md aspect-[16/10] h-48 sm:h-64 md:h-auto">
            <Image
              src="/images/the-jopwell-collection-0UnuYI_HrTA-unsplash.webp"
              alt="Historic photo related to FBL"
              fill
              className="object-cover"
              priority
              sizes="(min-width:1024px) 50vw, 100vw"
            />
          </div>

          {/* Right: Content */}
          <div className="space-y-4">
            <h3 className="text-2xl sm:text-3xl font-semibold leading-tight font-playfair text-neutral-800">
              The History of FBL
            </h3>
            <p className="text-neutral-700 leading-relaxed max-[425px]:text-sm text-base">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente consequuntur officia id error? Ipsum harum tempora laboriosam magni aut deserunt, illo ipsa porro totam. Doloremque perspiciatis deleniti officiis quibusdam sint?
            </p>
            <p className="text-neutral-700 leading-relaxed max-[425px]:text-sm text-base">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum excepturi reprehenderit debitis. Repudiandae cum totam labore tenetur quasi, corrupti facere, corporis reiciendis consectetur eveniet ipsam nemo exercitationem nesciunt earum eum?
            </p>
          </div>
        </section>

        {/* Mission and Values Section */}
        <section className="px-4 md:px-0 max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-semibold font-playfair text-neutral-800 text-center mb-10">
            Mission and Values
          </h2>

          <div className="flex flex-col md:flex-row justify-between max-[640px]:gap-10 sm:gap-10 md:gap-0 lg:gap-0">
            {/* Left Column */}
            <div className="flex flex-col gap-20 sm:gap-10 max-[640px]:gap-10 flex-1 md:mt-20 md:pr-10 lg:pr-15 xl:pr-20">
              {[
                {
                  title: "Diversity",
                  description:
                    "Celebrating a rich tapestry of backgrounds, perspectives, and talents",
                  image: "/images/sincerely-media-dGxOgeXAXm8-unsplash.webp",
                },
                {
                  title: "Integrity",
                  description: "Upholding the highest standards of honesty and ethics",
                  image: "/images/priscilla-du-preez-ggeZ9oyI-PE-unsplash.webp",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-3 items-center text-center md:items-end md:text-right"
                >
                  <h3 className="text-xl font-playfair text-neutral-800">{item.title}</h3>
                  <p className="max-[425px]:text-sm text-base font-roboto text-neutral-500 w-full md:w-4/5 xl:w-3/5">
                    {item.description}
                  </p>
                  <div className="relative overflow-hidden w-full h-40 sm:h-48 md:aspect-auto md:h-80">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 ease-in-out hover:scale-105"
                      sizes="(min-width:1024px) 40vw, 100vw"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-20 max-[640px]:gap-10 sm:gap-10 flex-1 md:pt-10 md:pl-10 xl:pl-20 md:border-l border-neutral-200 lg:pl-15">
              {[
                {
                  title: "Excellence",
                  description: "Pursuing the highest standards in learning and leadership",
                  image: "/images/jeswin-thomas-MvTdmNqE_dA-unsplash.webp",
                },
                {
                  title: "Innovation",
                  description: "Encouraging creativity, curiosity, and new ideas",
                  image: "/images/dom-fou-YRMWVcdyhmI-unsplash.webp",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-3 items-center text-center md:items-start md:text-left"
                >
                  <h3 className="text-xl font-playfair text-neutral-800">{item.title}</h3>
                  <p className="max-[425px]:text-sm text-base font-roboto text-neutral-500 w-full md:w-4/5 xl:w-3/5">
                    {item.description}
                  </p>
                  <div className="relative overflow-hidden w-full h-40 sm:h-48 md:aspect-auto md:h-80">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 ease-in-out hover:scale-105"
                      sizes="(min-width:1024px) 40vw, 100vw"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center pb-5 pt-10 sm:pt-16 border-t border-neutral-300">
          <h2 className="text-2xl sm:text-3xl font-playfair mb-4">Ready to explore more?</h2>
          <p className="text-neutral-600 mb-6 max-[425px]:text-sm text-base">Discover our academic programs and see where your future begins.</p>
          <Link
              href="/study-programs"
              className="relative inline-block text-sm sm:text-base xl:px-8 xl:py-4 font-roboto text-white transition-colors duration-300 group overflow-hidden bg-red-800 mx-auto min-[881px]:mx-0 sm:px-6 sm:py-3 max-[640px]:py-3 max-[640px]:px-6"
            >
              <span className="absolute inset-0 w-0 bg-neutral-800 transition-all duration-700 ease-out group-hover:w-full"></span>
              <span className="relative z-10 capitalize whitespace-nowrap">View our programs</span>
          </Link>

        </section>

      </div>
    </PageWrapper>
  );
}
