import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { OperationalConfigurationClientPage } from './components/OperationalConfigurationClientPage';
import { getOperationalConfig } from '@/lib/actions/operational-config';

export default async function OperationalConfigurationPage() {
  const configData = await getOperationalConfig();

  const initialData = {
    lowInventoryThreshold: configData?.lowInventoryThreshold || 10,
    serviceTypes: configData?.serviceTypes || [],
    partCategories: configData?.partCategories || [],
  };

  return (
      <Suspense fallback={<LoadingState />}>
          <OperationalConfigurationClientPage initialData={initialData} />
      </Suspense>
  );
}

const LoadingState = () => (
  <div className="space-y-6">
    <div className="space-y-4">
        <Skeleton className="h-32 w-full rounded-lg bg-slate-800/50" />
        <Skeleton className="h-48 w-full rounded-lg bg-slate-800/50" />
        <Skeleton className="h-48 w-full rounded-lg bg-slate-800/50" />
    </div>
  </div>
);
