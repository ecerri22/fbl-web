import PageWrapper from '@/components/PageWrapper';
import FacultyStaffTable from './_components/FacultyStaffTable';

export default function StaffPage() {
  return (
    <PageWrapper>
      <main className="text-neutral-800 min-h-screen max-w-7xl mx-auto space-y-24 px-6 md:px-0 py-10">

        <FacultyStaffTable/>

      </main>
    </PageWrapper>
  );
}
