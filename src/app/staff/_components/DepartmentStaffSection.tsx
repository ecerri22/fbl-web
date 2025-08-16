"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Mail, MapPin } from "lucide-react"; 
import { usePathname } from "next/navigation";

interface StaffMember {
  name: string;
  title: string;
  slug: string;
  fullTime: boolean;
  email: string;
  office: string;
  imgSrc?: string; 
}

interface DepartmentStaffSectionProps {
  staff: StaffMember[];
}

const roleOrder = ["Professor", "Lecturer", "Assistant Lecturer"];

function StaffCard({ member }: { member: StaffMember }) {
  const pathname = usePathname();
  const [imgSrc, setImgSrc] = useState(
    member.imgSrc && member.imgSrc.trim() !== ""
      ? member.imgSrc
      : `/images/staff/${member.slug}.webp`
  );

  function onImgError() {
    setImgSrc("/images/default-profile-icon-6.webp");
  }

  return (
    <article
      className="
        overflow-hidden border border-neutral-200 shadow-sm bg-white
        w-full sm:max-w-xl
        grid grid-cols-1 sm:grid-cols-2
      "
    >
      {/* Image */}
      <div className="relative w-full h-56 sm:h-full">
        <Image
          src={imgSrc}
          alt={member.name}
          fill
          onError={onImgError}
          className="object-cover"
          sizes="(min-width:1024px) 320px, (min-width:640px) 50vw, 100vw"
          priority={false}
        />
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6 flex flex-col gap-4 justify-between md:items-center ">
        <div>
          <h3 className="font-playfair text-lg sm:text-2xl max-[425px]:text-lg font-semibold text-neutral-900">
            {member.name}
          </h3>
          <p className="font-roboto text-neutral-500 mt-1">{member.title}</p>
        </div>

        <div className="space-y-2 text-red-800 text-md max-[425px]:text-sm font-roboto">
          <div className="flex items-start gap-3">
            <Mail size={18} className="shrink-0 mt-0.5" />
            <a
              href={`mailto:${member.email}`}
              className="hover:underline break-words [overflow-wrap:anywhere]"
            >
              {member.email}
            </a>
          </div>

          <div className="flex items-start gap-3 text-neutral-800">
            <MapPin size={18} className="shrink-0 mt-0.5" />
            <span>{member.office}</span>
          </div>
        </div>

        <Link
          href={{ pathname: `/staff/${member.slug}`, query: { from: pathname } }}
          className={`
            relative px-4 py-2 font-roboto text-white bg-red-800 md:self-center
            transition-colors duration-300 group overflow-hidden
            ${/* Full width and at bottom on mobile */""}
            w-full text-center mt-auto
            sm:w-auto sm:self-start sm:mt-0
          `}
        >
          <span className="absolute inset-0 w-0 bg-neutral-800 transition-all duration-700 ease-out group-hover:w-full"></span>
          <span className="relative max-[425px]:text-sm text-base z-10 capitalize whitespace-nowrap">
            More Details
          </span>
        </Link>

      </div>
    </article>
  );
}


export default function DepartmentStaffSection({
  staff,
}: DepartmentStaffSectionProps) {
  const head = staff.find(
    (m) =>
      m.title.toLowerCase().includes("head of department") ||
      m.title.toLowerCase().includes("shef departamenti")
  );

  const fullTimeStaff = staff.filter(
    (m) => m.fullTime && m !== head && roleOrder.includes(m.title)
  );

  const partTimeStaff = staff.filter(
    (m) => !m.fullTime && roleOrder.includes(m.title)
  );

  function groupByRole(members: StaffMember[]) {
    return roleOrder
      .map((role) => ({
        role,
        members: members.filter((m) => m.title === role),
      }))
      .filter((group) => group.members.length > 0);
  }

  const groupedFullTime = groupByRole(fullTimeStaff);
  const groupedPartTime = groupByRole(partTimeStaff);

  return (
    <section className="border-t border-neutral-100 pt-16 space-y-20">
      <h2 className="text-center text-3xl font-playfair font-semibold text-neutral-800 mb-8">
        Department Staff
    </h2>

      {/* Head of Department */}
      {head && (
        <div className="text-center mb-16 ">
          <h3 className="text-xl font-roboto font-semibold text-neutral-700 mb-6">
            Head of Department
          </h3>
          <div className="flex justify-center">
            <StaffCard member={head} />
          </div>
        </div>
      )}

      {/* Full Time Staff */}
      {groupedFullTime.length > 0 && (
        <div className="space-y-12">
          <h3 className="text-2xl font-roboto font-bold text-neutral-800 mb-8 text-center">
            Full Time Staff
          </h3>
          {groupedFullTime.map(({ role, members }) => (
            <div key={`full-${role}`}>
              <h4 className="text-xl font-roboto font-semibold mb-6 text-center">
                {role}s
              </h4>
              <div className="flex flex-wrap justify-center gap-8">
                {members.map((member) => (
                  <StaffCard key={member.slug} member={member} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Part Time Staff */}
      {groupedPartTime.length > 0 && (
        <div className="space-y-12">
          <h3 className="text-2xl font-roboto font-bold text-neutral-800 mb-8 text-center">
            Part Time Staff
          </h3>
          {groupedPartTime.map(({ role, members }) => (
            <div key={`part-${role}`}>
              <h4 className="text-xl font-roboto font-semibold mb-6 text-center">
                {role}s
              </h4>
              <div className="flex flex-wrap justify-center gap-8">
                {members.map((member) => (
                  <StaffCard key={member.slug} member={member} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
