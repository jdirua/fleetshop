
import { getInventory } from '@/lib/actions/inventory';
import { InventoryClientPage } from '@/components/inventory/InventoryClientPage';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

async function InventoryData({ page, limit }: { page: number; limit: number }) {
  // Assuming getInventory exists and follows the same pattern
  const { data, totalPages } = await getInventory({ page, limit });
  return <InventoryClientPage initialInventory={data} totalPages={totalPages} />;
}

function LoadingState() {
    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-10 w-32" />
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {[...Array(8)].map((_, i) => (
                     <div key={i} className="border rounded-lg p-4 space-y-3 bg-slate-800/75 backdrop-blur-lg border-slate-300/20">
                        <div className="flex items-start justify-between">
                            <Skeleton className="h-6 w-3/4" />
                            <Skeleton className="h-6 w-6 rounded-full" />
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <div className="space-y-1">
                                <Skeleton className="h-4 w-1/2" />
                                <Skeleton className="h-5 w-1/3" />
                            </div>
                            <div className="space-y-1">
                                <Skeleton className="h-4 w-1/2" />
                                <Skeleton className="h-5 w-1/3" />
                            </div>
                             <div className="space-y-1">
                                <Skeleton className="h-4 w-1/2" />
                                <Skeleton className="h-5 w-1/3" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default async function InventoryPage({
  searchParams,
}: {
  searchParams?: {
    page?: string;
    limit?: string;
  };
}) {
  const currentPage = Number(searchParams?.page) || 1;
  const limit = Number(searchParams?.limit) || 12; // Adjusted for a 4-column layout

  return (
    <Suspense fallback={<LoadingState />}>
      <InventoryData page={currentPage} limit={limit} />
    </Suspense>
  );
}
