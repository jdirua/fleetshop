
import { getVendors } from '@/lib/actions/vendors';
import VendorsClientPage from '@/components/vendors/VendorsClientPage';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

async function VendorsData({ page, limit }: { page: number; limit: number }) {
  const { data, totalPages } = await getVendors({ page, limit });
  return <VendorsClientPage initialVendors={data} totalPages={totalPages} currentPage={page} />;
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
                    <div key={i} className="glassmorphic rounded-lg p-6 flex flex-col justify-between h-48">
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
}

export default async function VendorsPage({
  searchParams,
}: {
  searchParams?: {
    page?: string;
    limit?: string;
  };
}) {
  const currentPage = Number(searchParams?.page) || 1;
  const limit = Number(searchParams?.limit) || 10;

  return (
    <Suspense fallback={<LoadingState />}>
      <VendorsData page={currentPage} limit={limit} />
    </Suspense>
  );
}
