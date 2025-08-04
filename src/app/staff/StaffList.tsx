'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { staffMembers } from '@/data/staffData';
import StaffListContent from './StaffListContent';

type Staff = {
  name: string;
  slug: string;
  title: string;
  email: string;
  department: string;
  courses: string[];
  photo?: string;
  fullTime?: boolean;
};

export default function StaffList() {
  const searchParams = useSearchParams();
  const departmentFilter = searchParams.get('department');
  const [filteredStaff, setFilteredStaff] = useState<Staff[]>([]);

  useEffect(() => {
    if (departmentFilter) {
      setFilteredStaff(
        staffMembers.filter((staff) =>
          staff.department.toLowerCase().includes(departmentFilter.toLowerCase())
        )
      );
    } else {
      setFilteredStaff(staffMembers);
    }
  }, [departmentFilter]);

  return (
    <>
      {/* Filter buttons (optional) */}
      {/* <div className="flex gap-4 mb-10">
        <button>All</button>
        <button>Department 1</button>
      </div> */}

      <StaffListContent staff={filteredStaff} />
    </>
  );
}
