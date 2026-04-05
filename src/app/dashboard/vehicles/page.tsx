
import { getVehicles } from '@/lib/actions/vehicles';
import { VehiclesClientPage } from '@/components/vehicles/VehiclesClientPage';

export default async function VehiclesPage({
  searchParams,
}: {
  searchParams?: {
    page?: string;
    limit?: string;
  };
}) {
  const currentPage = Number(searchParams?.page) || 1;
  const limit = Number(searchParams?.limit) || 10;
  const { data, totalPages } = await getVehicles({ page: currentPage, limit });

  return <VehiclesClientPage initialVehicles={data} totalPages={totalPages} />;
}
