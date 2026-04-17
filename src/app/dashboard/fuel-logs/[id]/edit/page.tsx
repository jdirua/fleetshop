
import { getFuelLog } from "@/lib/actions/fuelLogs";
import { getVehicles } from "@/lib/actions/vehicles";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EditFuelLogForm from "./EditFuelLogForm";

interface EditFuelLogPageProps {
  params: { id: string };
}

export default async function EditFuelLogPage({ params }: EditFuelLogPageProps) {
  const [fuelLog, vehicles] = await Promise.all([
    getFuelLog(params.id),
    getVehicles(),
  ]);

  if (!fuelLog) {
    return (
        <div className="flex items-center justify-center h-full">
          <p className="text-lg text-muted-foreground">Fuel log not found.</p>
        </div>
    );
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <Card>
            <CardHeader>
                <CardTitle>Edit Fuel Log</CardTitle>
            </CardHeader>
            <CardContent>
                <EditFuelLogForm fuelLog={fuelLog} vehicles={vehicles.data} />
            </CardContent>
        </Card>
    </div>
  );
}
