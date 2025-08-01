import { notFound } from "next/navigation";
import { staffMembers } from "@/data/staffData";
import { Metadata } from "next";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function StaffDetailPage({ params }: any) {
  const staff = staffMembers.find((s) => s.slug === params.slug);
  if (!staff) return notFound();

  return (
    <main className="bg-white min-h-screen px-6 py-16 md:px-20">
      <section className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-950">{staff.name}</h1>
          <p className="text-red-700 text-sm uppercase mt-2 tracking-wide">{staff.title}</p>
        </div>

        <div className="flex flex-col md:flex-row gap-10">
          {staff.photo && (
            <img
              src={staff.photo}
              alt={staff.name}
              className="w-48 h-60 object-cover rounded shadow"
            />
          )}
          <div className="flex-1 space-y-4">
            <p><span className="font-semibold text-blue-950">Departamenti:</span> {staff.department}</p>
            <p><span className="font-semibold text-blue-950">Email:</span> <a href={`mailto:${staff.email}`} className="text-blue-700 underline">{staff.email}</a></p>

            {staff.courses.length > 0 && (
              <div>
                <h3 className="font-semibold text-blue-950 mb-2">Lëndë të dhëna</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  {staff.courses.map((course) => (
                    <li key={course}>{course}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

export async function generateStaticParams() {
  return staffMembers.map((s) => ({ slug: s.slug }));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function generateMetadata({ params }: any ) {
  const staff = staffMembers.find((s) => s.slug === params.slug);
  return {
    title: staff?.name || "Staff Member Not Found",
    description: staff?.title || "Staff details",
  };
}
