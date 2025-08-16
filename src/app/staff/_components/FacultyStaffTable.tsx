"use client";

import React from "react";

const facultyData = [
  {
    role: "Dean",
    name: "Prof. Assoc. Dr. John Doe",
    email: "x@test.com",
  }
];

const departments = [
  {
    title: "Department of Business Administration",
    members: [
      {
        role: "Head of Department",
        name: "Prof. Assoc. Dr. John Doe",
        email: "x@test.com",
      }
    ],
  },
  {
    title: "Department of Economics",
    members: [
      {
        role: "Head of Department",
        name: "Prof. Assoc. Dr. John Doe",
        email: "x@test.com",
      }
    ],
  },
  {
    title: "Department of Law",
    members: [
      {
        role: "Head of Department",
        name: "Prof. Assoc. Dr. John Doe",
        email: "x@test.com",
      }
    ],
  },
   {
    title: "Department of Marketing & Engineering",
    members: [
      {
        role: "Head of Department",
        name: "Prof. Assoc. Dr. John Doe",
        email: "x@test.com",
      }
    ],
  },
  {
    title: "Department of Finance & Accounting",
    members: [
      {
        role: "Head of Department",
        name: "Prof. Assoc. Dr. John Doe",
        email: "x@test.com",
      }
    ],
  },
  {
    title: "Qendra Kërkimore Shkencore për Kërkime dhe Zhvillime në Drejtësi dhe Ekonomi",
    members: [
      {
        role: "Head of Department",
        name: "Prof. Assoc. Dr. John Doe",
        email: "x@test.com",
      }
    ],
  },
];

export default function FacultyStaffTable() {
  return (
    <div className="">
      <span>Organizational Schema Image</span>
      {/* <h2 className="text-3xl font-playfair font-bold capitalize text-red-800">
        faculty&apos;s organizational schema
      </h2> */}

      {/* Faculty-wide Staff */}
      {/* <table className="min-w-full table-auto border border-neutral-200">
        <tbody>
          {facultyData.map((item, idx) => (
            <tr key={idx} className="border-b border-neutral-200">
              <td className="px-4 py-2 w-1/3 font-medium text-neutral-800">{item.role}</td>
              <td className="px-4 py-2 w-1/3 text-center text-neutral-700">{item.name}</td>
              <td className="px-4 py-2 w-1/3 text-end">
                <a
                  href={`mailto:${item.email}`}
                  className="text-red-800 hover:underline"
                >
                  {item.email}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}

      {/* Per-Department Staff */}
      {/* {departments.map((dept, idx) => (
        <div key={idx}>
          <h3 className="text-red-800 font-semibold mb-2">{dept.title}</h3>
          <table className="min-w-full table-auto border border-neutral-200">
            <tbody>
              {dept.members.map((member, i) => (
                <tr key={i} className="border-b border-neutral-200">
                  <td className="px-4 py-2 w-1/3 font-medium text-neutral-800">{member.role}</td>
                  <td className="px-4 py-2 w-1/3 text-center text-neutral-700">{member.name}</td>
                  <td className="px-4 py-2 w-1/3 text-end">
                    <a
                      href={`mailto:${member.email}`}
                      className="text-red-800 hover:underline"
                    >
                      {member.email}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))} */}
    </div>
  );
}
