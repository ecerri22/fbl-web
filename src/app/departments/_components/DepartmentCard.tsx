import Image from "next/image";

type Props = {
  department: {
    name: string;
    slug: string;
    description: string;
    image: string;
  };
  programs: {
    name: string;
    slug: string;
    level: string;
  }[];
  isExpanded: boolean;
  onToggle: () => void;
};

export default function DepartmentCard({ department, programs, isExpanded, onToggle }: Props) {
  return (
    <div className="border rounded-lg shadow-md transition">
      <button onClick={onToggle} className="w-full text-left">
        <Image
          src={department.image}
          alt={department.name}
          width={800}
          height={300}
          className="w-full h-40 object-cover"
        />
        <div className="p-4">
          <h2 className="text-xl font-semibold text-blue-900">{department.name}</h2>
          <p className="text-gray-700">{department.description}</p>
        </div>
      </button>

      {isExpanded && (
        <div className="bg-gray-50 border-t p-4 space-y-2">
          <h3 className="text-md font-semibold text-blue-800">Programet:</h3>
          <ul className="list-disc list-inside text-gray-800">
            {programs.length > 0 ? (
              programs.map((program) => (
                <li key={program.slug}>
                  {program.name} ({program.level})
                </li>
              ))
            ) : (
              <li>S&apos;ka programe të regjistruara.</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
