"use client";

import { BookOpen, FlaskConical, Landmark, Users, ArrowRight } from "lucide-react";
import Link from "next/link";
import { researchProjects } from "@/data/researchProjects";
import PageWrapper from "@/components/PageWrapper";

export default function ResearchPage() {
  return (
    <PageWrapper>
      <div className="text-neutral-800 space-y-16 md:space-y-20 sm:space-y-20 max-[640px]:space-y-15">
        {/* About Section */}
        <section className="grid grid-cols-1 gap-10 text-center md:flex md:flex-row items-center pb-10 border-b border-neutral-300">
          {/* Left */}
          <div className="lg:w-2/5 ">
            <h1 className="text-2xl lg:text-start sm:text-3xl md:text-4xl md:text-start font-semibold leading-tight font-playfair text-neutral-800">
              Scientific Research
            </h1>
          </div>

          {/* Right */}
          <div className="lg:w-3/5 flex flex-col justify-center h-full space-y-6 lg:items-end">
            <p className="font-roboto text-neutral-600 leading-relaxed max-w-prose md:text-end">
              We conduct impactful research in fields such as business, digital technology, law, and public policy. The faculty supports initiatives that bring tangible change to society and the economy.
            </p>
          </div>

        </section>

        {/* Research Fields */}
        <section className="">
          <h2 className="text-3xl font-playfair text-neutral-800 mb-6 lg:text-start text-center">Main Research Areas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              { title: "ABC", icon: <FlaskConical className="w-6 h-6 text-red-700" /> },
              { title: "ABC", icon: <Users className="w-6 h-6 text-red-700" /> },
              { title: "ABC", icon: <Landmark className="w-6 h-6 text-red-700" /> },
              { title: "ABC", icon: <BookOpen className="w-6 h-6 text-red-700" /> },
            ].map((field, i) => (
              <div key={i} className="border border-neutral-200 p-6 shadow-sm hover:shadow-md transition bg-neutral-50">
                <div className="mb-4">{field.icon}</div>
                <h3 className="text-lg font-playfair text-neutral-800 mb-3 ">{field.title}</h3>
                <p className="text-sm text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            ))}
          </div>
        </section>

        {/* projects */}
        <section>
          {/* header */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
            <h2 className="text-3xl font-playfair text-neutral-800 mb-4 sm:mb-0 lg:text-start text-center">
              Latest Projects
            </h2>
            {/* Hide on small screens, show on sm+ */}
            <Link
              href="/research/all-projects"
              className="hidden sm:inline text-red-800 underline underline-offset-4 font-medium hover:text-red-600 transition-colors"
            >
              View All
            </Link>
          </div>

          {/* cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {researchProjects.slice(-3).reverse().map((project, i) => (
              <div
                key={i}
                className="p-6 bg-white border border-neutral-200 shadow-sm hover:shadow-md transition space-y-2"
              >
                <h3 className="text-neutral-800 font-playfair text-lg">{project.title}</h3>
                <p className="text-sm text-neutral-500 italic">{project.coordinator}</p>
                <p className="text-sm text-neutral-600">
                  {project.field} • Year: {project.year}
                </p>
                <Link
                  href={`/research/all-projects/${project.slug}?from=research`}
                  className="text-sm text-red-800 hover:underline font-medium inline-flex items-center gap-1"
                >
                  Read More <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>

          {/* Show View All below grid on small screens */}
          <div className="mt-6 sm:hidden text-center">
            <Link
              href="/research/all-projects"
              className="text-red-800 underline underline-offset-4 font-medium hover:text-red-600 transition-colors"
            >
              View All
            </Link>
          </div>
        </section>


        {/* collaborations */}
        <section className="">
          <h2 className="text-3xl font-playfair text-neutral-800 mb-6 lg:text-start text-center">
            Partners & Collaborations
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-sm">
            {[
              "Universiteti i X",
              "Qendra Rajonale e Inovacionit",
              "Instituti për Zhvillim Ekonomik",
            ].map((partner, i) => (
              <div
                key={i}
                className="p-4 border border-neutral-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <p className="text-neutral-700 font-medium">{partner}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto text-center space-y-4 pt-16 border-t border-neutral-200">
          <h2 className="text-2xl mb-4 font-playfair text-neutral-800">Do you want to get involved in scientific research?</h2>
          <p className="text-neutral-600 mb-6">
            If you are a student or academic staff member and have a research idea, contact us and become part of our network.
          </p>

          <Link
            href="#"
            className="relative inline-block px-8 py-4 font-roboto text-white overflow-hidden bg-red-800 group"
          >
            <span className="absolute inset-0 w-0 bg-neutral-800 transition-all duration-700 ease-out group-hover:w-full z-0"></span>
            <span className="relative z-10 capitalize whitespace-nowrap">
              Contact Us
            </span>
          </Link>
        </section>

      </div>
    </PageWrapper>
  );
}
