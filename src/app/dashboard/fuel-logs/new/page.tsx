
import { getVehicles } from "@/lib/actions/vehicles";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FuelLogForm } from "@/components/forms/FuelLogForm";

export default async function NewFuelLogPage() {
  const vehicles = await getVehicles();

  return (
    <Card>
      <CardHeader>
        <CardTitle>New Fuel Log</CardTitle>
      </CardHeader>
      <CardContent>
        <FuelLogForm vehicles={vehicles} />
      </CardContent>
    </Card>
  );
}
