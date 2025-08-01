"use client";

import { BookOpen, FlaskConical, Landmark, Users, ArrowRight } from "lucide-react";
import Link from "next/link";
import { researchProjects } from "@/data/researchProjects";

export default function ResearchPage() {
  return (
    <main className="bg-white min-h-screen px-6 py-16 md:px-20 space-y-24">
      {/* HERO */}
      <section className="text-center max-w-4xl mx-auto space-y-4">
        <h1 className="text-4xl md:text-4xl font-bold text-blue-950">
          Kërkimi Shkencor në Fakultetin e Biznesit dhe të Drejtësisë
        </h1>
        <p className="text-zinc-600 text-lg">
          Ne zhvillojmë kërkim me ndikim në fusha si biznesi, teknologjia digjitale, ligji dhe politikat publike. Fakulteti mbështet iniciativat që sjellin ndryshim konkret në shoqëri dhe ekonomi.
        </p>
      </section>

      {/* FUSHAT KËRKIMORE */}
      <section className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-blue-950 mb-6">Fushat Kryesore të Kërkimit</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[
            { title: "Biznes Digjital", icon: <FlaskConical className="w-6 h-6 text-red-700" /> },
            { title: "Inovacion & Sipërmarrje", icon: <Users className="w-6 h-6 text-red-700" /> },
            { title: "E Drejta Europiane", icon: <Landmark className="w-6 h-6 text-red-700" /> },
            { title: "Financa dhe Ekonomi", icon: <BookOpen className="w-6 h-6 text-red-700" /> },
          ].map((field, i) => (
            <div key={i} className="border p-6 rounded-xl shadow-sm hover:shadow-md transition bg-zinc-50">
              <div className="mb-4">{field.icon}</div>
              <h3 className="text-lg font-semibold text-blue-900 mb-1">{field.title}</h3>
              <p className="text-sm text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Placeholder për përshkrim.</p>
            </div>
          ))}
        </div>
      </section>

      {/* PROJEKTET */}
      <section className="max-w-6xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold text-blue-950">Projektet e Fundit</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {researchProjects.map((project, i) => (
            <div
              key={i}
              className="p-6 rounded-xl bg-white border shadow-sm hover:shadow-md transition space-y-2"
            >
              <h3 className="text-blue-900 font-semibold text-lg">{project.title}</h3>
              <p className="text-sm text-gray-600 italic">{project.coordinator}</p>
              <p className="text-sm text-gray-700">Fusha: {project.field} • Viti: {project.year}</p>
              <Link
                href={`/research/${project.slug}`}
                className="text-sm text-red-700 hover:underline font-medium inline-flex items-center gap-1"
              >
                Lexo më shumë <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}

        </div>
      </section>

      {/* BASHKËPUNIME */}
      <section className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-blue-950 mb-6">Partnerë & Bashkëpunime</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-gray-700 text-sm">
          {["Universiteti i X", "Qendra Rajonale e Inovacionit", "Instituti për Zhvillim Ekonomik"].map(
            (partner, i) => (
              <div key={i} className="p-4 rounded-lg bg-blue-50 border border-blue-100">
                {partner}
              </div>
            )
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto text-center space-y-4">
        <h3 className="text-xl font-semibold text-blue-900">Dëshiron të përfshihesh në kërkimin shkencor?</h3>
        <p className="text-gray-600 max-w-xl mx-auto">
          Nëse je student apo staf akademik dhe ke një ide kërkimore, na kontakto dhe bëhu pjesë e rrjetit tonë.
        </p>
        <Link
          href="/contact"
          className="inline-block px-6 py-3 rounded-full bg-red-700 text-white font-medium hover:bg-red-800 transition"
        >
          Na Kontakto →
        </Link>
      </section>
    </main>
  );
}
