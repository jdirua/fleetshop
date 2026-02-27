
import { getFuelLogs } from "@/lib/actions/fuelLogs";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function FuelLogsPage() {
  const fuelLogs = await getFuelLogs();

  return (
    <div className="space-y-6">
        <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Fuel Logs</h1>
            <Button asChild>
                <Link href="/dashboard/fuel-logs/new">Add New Fuel Log</Link>
            </Button>
        </div>
      <DataTable columns={columns} data={fuelLogs} filterColumn="vehicleId" />
    </div>
  );
}
