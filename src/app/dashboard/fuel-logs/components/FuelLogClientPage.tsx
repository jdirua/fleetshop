
'use client';

import { FuelLog } from "@/lib/types/fuelLog";
import { columns } from "../columns";
import { DataTable } from "@/components/ui/data-table";
import { PaginationControls } from "@/components/ui/PaginationControls";
import { Fuel, Droplets, Gauge, ClipboardList } from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { hasPermission } from '@/lib/auth/roles';
import { CreateFuelLogDialog } from "@/components/fuel-logs/CreateFuelLogDialog";
import { Card } from "@/components/ui/card";
import { useRouter, useSearchParams } from 'next/navigation';
import { EmptyState } from '@/components/ui/empty-state';

interface FuelLogClientPageProps {
  fuelLogs: FuelLog[];
  totalPages: number;
  currentPage: number;
}

export default function FuelLogClientPage({ fuelLogs, totalPages, currentPage }: FuelLogClientPageProps) {
  const { user } = useUser();
  const canCreate = user && user.role && hasPermission(user.role, 'fuel-logs:create');
  const router = useRouter();
  const searchParams = useSearchParams();

  const onPageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`/dashboard/fuel-logs?${params.toString()}`);
  };

  return (
    <div className="p-2 md:p-4">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-4xl font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg px-4 py-2 shadow-lg">Fuel Log Hub</h1>
        {canCreate && (
            <CreateFuelLogDialog />
        )}
      </div>

      {fuelLogs.length === 0 ? (
        <EmptyState
          title="No Fuel Logs Found"
          description="Get started by adding your first fuel log to the fleet."
          icon={<Fuel className="h-12 w-12 text-purple-400" />}
          action={ canCreate ? {
            text: "Add First Fuel Log",
            onClick: () => {}
          } : undefined}
          features={{
            title: "ONCE YOU ADD A FUEL LOG, YOU'LL BE ABLE TO:",
            items: [
              {
                icon: <Droplets className="h-8 w-8 text-purple-400"/>,
                text: "Track Fuel Consumption"
              },
              {
                icon: <Gauge className="h-8 w-8 text-purple-400"/>,
                text: "Monitor Vehicle Efficiency"
              },
              {
                icon: <ClipboardList className="h-8 w-8 text-purple-400"/>,
                text: "Generate Fuel Reports"
              }
            ]
          }}
        />
      ) : (
        <Card className="p-2 md:p-4">
          <DataTable columns={columns} data={fuelLogs} filterColumn="vehicleId" />
          <PaginationControls totalPages={totalPages} currentPage={currentPage} onPageChange={onPageChange} />
        </Card>
      )}
    </div>
  );
}
