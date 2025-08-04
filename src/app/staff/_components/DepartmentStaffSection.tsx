"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Mail, MapPin } from "lucide-react"; 

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
  const [imgSrc, setImgSrc] = useState(
    member.imgSrc && member.imgSrc.trim() !== ""
      ? member.imgSrc
      : `/images/staff/${member.slug}.jpg`
  );

  function onImgError() {
    setImgSrc("/images/default-profile-icon-6.jpg");
  }

  return (
    <div className="flex border border-neutral-200 overflow-hidden shadow-sm w-[30rem] h-[20rem]">
      <div className="w-1/2 relative">
        <Image
          src={imgSrc}
          alt={member.name}
          fill
          className="object-cover h-full"
          onError={onImgError}
          sizes="(max-width: 768px) 100vw, 30rem"
          priority={false}
        />
      </div>

      <div className="w-1/2 p-6 flex flex-col justify-between items-center">
        <div>
          <h3 className="font-playfair text-2xl font-semibold text-neutral-900">
            {member.name}
          </h3>
          <p className="font-roboto text-neutral-500 mt-1">{member.title}</p>
        </div>

        <div className="space-y-2 text-red-800 font-roboto">
          <div className="flex items-center gap-3">
            <Mail size={18} />
            <a href={`mailto:${member.email}`} className="hover:underline break-all">
              {member.email}
            </a>
          </div>

          <div className="flex items-center gap-3">
            <MapPin size={18} />
            <span>{member.office}</span>
          </div>
        </div>

        <Link
        href={`/staff/${member.slug}`}
        className="relative inline-block px-4 py-2 font-roboto text-white transition-colors duration-300 group overflow-hidden bg-red-800"
        >
          <span className="absolute inset-0 w-0 bg-neutral-800 transition-all duration-700 ease-out group-hover:w-full"></span>
          <span className="relative text-md z-10 capitalize whitespace-nowrap">
            More Details
          </span>
        </Link>
      </div>
    </div>
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
