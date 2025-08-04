// 'use client';

// import Link from 'next/link';

// type Staff = {
//   name: string;
//   slug: string;
//   title: string;
//   email: string;
//   department: string;
//   courses: string[];
//   photo?: string;
// };

// export default function StaffListContent({ staff }: { staff: Staff[] }) {
//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
//       {staff.map((member) => (
//         <Link
//           key={member.slug}
//           href={`/staff/${member.slug}`}
//           className="bg-zinc-50 p-6 rounded-xl shadow hover:shadow-lg transition group flex flex-col justify-between"
//         >
//           <div>
//             {member.photo && (
//               <img
//                 src={member.photo}
//                 alt={member.name}
//                 className="w-24 h-24 object-cover rounded-full mb-4 shadow"
//               />
//             )}
//             <h3 className="text-xl font-semibold text-blue-950 group-hover:text-red-700 transition">
//               {member.name}
//             </h3>
//             <p className="text-sm text-gray-600 mt-1 italic">{member.title}</p>
//             <p className="text-sm text-gray-500 mt-1">{member.department}</p>
//           </div>
//           <div className="mt-6">
//             <span className="text-sm text-red-700 hover:underline font-medium">
//               View Profile →
//             </span>
//           </div>
//         </Link>
//       ))}
//     </div>
//   );
// }
