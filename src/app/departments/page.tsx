import Link from "next/link";
import Image from "next/image";
import PageWrapper from "@/components/PageWrapper";
import { departments } from "@/data/departmentsData";

export default function DepartmentsPage() {
  return (
    <PageWrapper>
      <main className="max-w-6xl mx-auto px-4 py-12 space-y-12">
        <h1 className="text-3xl font-bold text-blue-950 text-center">
          Departamentet Akademike
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {departments.map((dept) => (
            <Link
              key={dept.slug}
              href={`/departments/${dept.slug}`}
              className="border rounded-2xl overflow-hidden shadow hover:shadow-lg transition bg-white group"
            >
              <div className="relative w-full h-40">
                <Image
                  src={dept.image}
                  alt={dept.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-5 space-y-2">
                <h2 className="text-xl font-semibold text-blue-900 group-hover:text-red-700 transition">
                  {dept.name}
                </h2>
                <p className="text-gray-700 text-sm">{dept.shortDescription}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </PageWrapper>
  );
}
