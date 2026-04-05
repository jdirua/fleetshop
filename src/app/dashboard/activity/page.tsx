
import { Suspense } from 'react';
import { getActivityLogs } from "@/lib/actions/activityLogs";
import { ActivityClientPage } from './components/ActivityClientPage';
import { Skeleton } from '@/components/ui/skeleton';

export default async function ActivityPage({
  searchParams,
}: {
  searchParams?: {
    page?: string;
    limit?: string;
  };
}) {
  const currentPage = Number(searchParams?.page) || 1;
  const limit = Number(searchParams?.limit) || 15;
  const { data, totalPages } = await getActivityLogs({ page: currentPage, limit });

  return (
    <Suspense fallback={<LoadingState />}>
      <ActivityClientPage initialActivityLogs={data} totalPages={totalPages} />
    </Suspense>
  );
}

const LoadingState = () => (
  <div className="p-4 md:p-8 pt-6 space-y-4">
    <Skeleton className="h-8 w-48" />
    <div className="border rounded-lg p-4">
      <div className="h-96 w-full bg-slate-800/75 backdrop-blur-lg border border-slate-300/20 rounded-md" />
    </div>
  </div>
);
