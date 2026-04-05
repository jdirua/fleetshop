
import { getFuelLogs } from "@/lib/actions/fuelLogs";
import FuelLogClientPage from "./components/FuelLogClientPage";
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

async function FuelLogData({ page, limit }: { page: number, limit: number }) {
  const { fuelLogs, totalPages } = await getFuelLogs({ page, limit });
  return <FuelLogClientPage fuelLogs={fuelLogs} totalPages={totalPages} currentPage={page} />;
}

function LoadingState() {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-10 w-36" />
            </div>
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                        <Skeleton className="h-8 w-64" />
                        <Skeleton className="h-8 w-24" />
                </div>
                <div className="border rounded-lg">
                    <div className="grid grid-cols-5 gap-4 p-4 border-b bg-gray-800/50">
                        {[...Array(5)].map((_,i) => <Skeleton key={i} className="h-5 w-3/4" />)}
                    </div>
                    <div className="divide-y">
                        {[...Array(10)].map((_, i) => (
                            <div key={i} className="grid grid-cols-5 gap-4 p-4">
                                {[...Array(5)].map((_,j) => <Skeleton key={j} className="h-5 w-3/4" />)}
                            </div>
                        ))}
                    </div>
                </div>
                    <div className="flex justify-end items-center gap-4">
                    <Skeleton className="h-8 w-24" />
                    <Skeleton className="h-8 w-24" />
                </div>
            </div>
        </div>
    );
}

export default async function FuelLogsPage({ 
    searchParams 
}: { 
    searchParams?: { 
        page?: string, 
        limit?: string 
    } 
}) {
  const currentPage = Number(searchParams?.page) || 1;
  const limit = Number(searchParams?.limit) || 10;

  return (
    <div className="p-4 md:p-8 pt-6">
      <Suspense fallback={<LoadingState />}>
        <FuelLogData page={currentPage} limit={limit} />
      </Suspense>
    </div>
  );
}
