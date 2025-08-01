import PageWrapper from "@/components/PageWrapper";
import Image from "next/image";
import { CheckCircle, Target, Eye } from "lucide-react";

export default function AboutPage() {
  return (
    <PageWrapper>
      <main className="bg-white text-blue-950 px-6 md:px-20 py-20 min-h-screen px-6 py-16 space-y-16">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">

          {/* Left: Image */}
          <div className="relative w-full h-[450px] rounded-lg overflow-hidden shadow-md">
            <Image
              src="/images/about-students.jpg" 
              alt="Happy Students"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Right: Content */}
          <div>
            
            <h2 className="text-4xl font-bold leading-snug mb-4">
              We Ensure Better Education <br />
              For A Better World
            </h2>
            <p className="text-gray-600 mb-8">
              The Faculty of Business and Law prepares students with strong academic
              knowledge, critical thinking, and applied skills to shape future industries
              and public institutions with confidence and ethics.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              <div className="flex items-start gap-3">
                <Target className="text-red-700 w-6 h-6 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg">Our Mission</h4>
                  <p className="text-gray-600 text-sm">
                    To offer impactful education and research that builds tomorrow’s business
                    and legal leaders.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Eye className="text-red-700 w-6 h-6 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg">Our Vision</h4>
                  <p className="text-gray-600 text-sm">
                    To be a leading center of excellence, inspiring progress in business and law.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-2">Our Academics</h4>

              <ul className="flex gap-6 space-y-1 text-gray-700">
                <li className="flex items-center gap-2">
                  <CheckCircle className="text-red-700 w-4 h-4" />
                  Undergraduate
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="text-red-700 w-4 h-4" />
                  Postgraduate
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
          <div className="text-center pt-16">
            <p className="text-gray-600 mb-5 text-lg">
              Discover the right program for your future in Business and Law.
            </p>
            <a
              href="/study-programs"
              className="bg-red-700 hover:bg-red-800 text-white font-semibold text-sm uppercase px-8 py-3 tracking-wider "
            >
              Explore Study Programs
            </a>
          </div>

      </main>
    </PageWrapper>
  );
}
