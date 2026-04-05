
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { OperationalConfigurationClientPage } from './components/OperationalConfigurationClientPage';
import { getOperationalConfig } from '@/lib/actions/operational-config';

export default async function OperationalConfigurationPage() {
  const configData = await getOperationalConfig();

  return (
    <Suspense fallback={<LoadingState />}>
      <OperationalConfigurationClientPage initialData={configData} />
    </Suspense>
  );
}

const LoadingState = () => (
  <div className="p-4 md:p-8 pt-6 space-y-6">
    <div className="space-y-2">
        <Skeleton className="h-10 w-1/3" />
        <Skeleton className="h-6 w-2/3" />
    </div>
    <div className="space-y-4">
        <Skeleton className="h-32 w-full rounded-lg" />
        <Skeleton className="h-48 w-full rounded-lg" />
        <Skeleton className="h-48 w-full rounded-lg" />
    </div>
  </div>
);
