import { getVehicle } from '@/lib/actions/vehicles';
import { VehicleForm } from '@/components/forms/VehicleForm';
import { notFound } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default async function EditVehiclePage({ params }: { params: { id: string } }) {
  const vehicle = await getVehicle(params.id);

  if (!vehicle) {
    notFound();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Vehicle</CardTitle>
      </CardHeader>
      <CardContent>
        <VehicleForm vehicle={vehicle} />
      </CardContent>
    </Card>
  );
}
