import { getVehicle } from '@/lib/actions/vehicles';
import VehicleDetails from '@/components/VehicleDetails';
import { notFound } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default async function VehicleDetailsPage({ params }: { params: { id: string } }) {
  const vehicle = await getVehicle(params.id);

  if (!vehicle) {
    notFound();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{vehicle.make} {vehicle.model} - {vehicle.registration}</CardTitle>
      </CardHeader>
      <CardContent>
        <VehicleDetails vehicle={vehicle} />
      </CardContent>
    </Card>
  );
}
