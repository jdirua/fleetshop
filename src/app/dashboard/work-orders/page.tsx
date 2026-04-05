
import { Suspense } from 'react';
import { getWorkOrders } from "@/lib/actions/workOrders";
import { WorkOrdersClientPage } from '@/app/dashboard/work-orders/components/WorkOrdersClientPage';
import { Skeleton } from '@/components/ui/skeleton';

export default async function WorkOrdersPage({
  searchParams,
}: {
  searchParams?: {
    page?: string;
    limit?: string;
  };
}) {
  const currentPage = Number(searchParams?.page) || 1;
  const limit = Number(searchParams?.limit) || 10;
  const { data, totalPages } = await getWorkOrders({ page: currentPage, limit });

  return (
    <Suspense fallback={<LoadingState />}>
      <WorkOrdersClientPage initialWorkOrders={data} totalPages={totalPages} />
    </Suspense>
  );
}

const LoadingState = () => (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(8)].map((_, i) => (
                <div key={i} className="rounded-lg p-6 flex flex-col justify-between h-48 bg-slate-800/75 backdrop-blur-lg border border-slate-300/20">
                    <div className='space-y-3'>
                        <Skeleton className="h-5 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                    </div>
                    <div className='mt-4 flex justify-between items-center'>
                        <Skeleton className="h-4 w-1/4" />
                        <Skeleton className="h-6 w-1/4" />
                    </div>
                </div>
            ))}
        </div>
    </div>
);
