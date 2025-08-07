import { Suspense } from 'react';
import StaffList from './StaffList';
import PageWrapper from '@/components/PageWrapper';
import Image from 'next/image';
import { departmentsData } from '@/data/departmentsData';
import { notFound } from "next/navigation";
import Link from 'next/link';
import FacultyTable from './_components/FacultyStaffTable';
import FacultyStaffTable from './_components/FacultyStaffTable';

export default function StaffPage() {

  // const department = departmentsData.find((d) => d.slug === params.slug);
  // if (!department) return notFound();


  return (
        <PageWrapper>
          <main className="text-neutral-800 min-h-screen max-w-7xl mx-auto space-y-24 px-6 md:px-0 py-10">
    
            {/* Staff Section */}
            <FacultyStaffTable/>

          </main>
        </PageWrapper>
  );
}
