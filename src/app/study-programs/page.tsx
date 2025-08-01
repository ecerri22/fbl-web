import { Suspense } from 'react'
import StudyProgramsClient from './StudyPorgramsClient'

export default function StudyProgramsPage() {
  return (
    <main className="bg-white min-h-screen py-20 px-6 md:px-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h6 className="text-red-700 font-semibold uppercase tracking-widest text-sm">
            Explore Our Programs
          </h6>
          <h1 className="text-4xl font-bold text-blue-950 mt-2 mb-4">
            Study Programs at FBL
          </h1>
          <p className="text-zinc-600 max-w-2xl mx-auto text-base">
            From undergraduate to postgraduate, our programs prepare you for
            real-world success in business, law, economics, and more.
          </p>
        </div>

        {/* Suspense wraps the client component that uses useSearchParams */}
        <Suspense fallback={<p className="text-center">Loading programs...</p>}>
          <StudyProgramsClient />
        </Suspense>
      </div>
    </main>
  )
}
