
import { getFuelLog } from "@/lib/actions/fuelLogs";
import { getVehicles } from "@/lib/actions/vehicles";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FuelLogForm } from "@/components/forms/FuelLogForm";

interface EditFuelLogPageProps {
  params: { id: string };
}

export default async function EditFuelLogPage({ params }: EditFuelLogPageProps) {
  const [fuelLog, vehicles] = await Promise.all([
    getFuelLog(params.id),
    getVehicles(),
  ]);

  if (!fuelLog) {
    return <div>Fuel log not found</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Fuel Log</CardTitle>
      </CardHeader>
      <CardContent>
        <FuelLogForm fuelLog={fuelLog} vehicles={vehicles} />
      </CardContent>
    </Card>
  );
}
