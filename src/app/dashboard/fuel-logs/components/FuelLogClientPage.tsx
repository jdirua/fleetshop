
'use client';

import { FuelLog } from "@/lib/types/fuelLog";
import { columns } from "../columns";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { PaginationControls } from "@/components/ui/PaginationControls";
import { PlusCircle, Fuel, Droplets, Gauge, ClipboardList } from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { hasPermission } from '@/lib/auth/roles';
import { CreateFuelLogDialog } from "@/components/fuel-logs/CreateFuelLogDialog";
import { Card } from "@/components/ui/card";
import { useRouter, useSearchParams } from 'next/navigation';

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
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Fuel Log Hub</h2>
        {canCreate && (
            <CreateFuelLogDialog asChild>
                <Button className="bg-purple-500 hover:bg-purple-600 text-white">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Fuel Log
                </Button>
            </CreateFuelLogDialog>
        )}
      </div>

      {fuelLogs.length === 0 ? (
        <EmptyState canCreate={canCreate} />
      ) : (
        <Card className="p-4 md:p-6 bg-slate-800/75 backdrop-blur-lg border border-slate-300/20">
          <DataTable columns={columns} data={fuelLogs} filterColumn="vehicleId" />
          <PaginationControls totalPages={totalPages} currentPage={currentPage} onPageChange={onPageChange} />
        </Card>
      )}
    </div>
  );
}

const EmptyState = ({ canCreate }: { canCreate: boolean | undefined }) => (
    <Card className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 bg-slate-800/75 backdrop-blur-lg border border-slate-300/20">
        <div className="relative w-28 h-28 flex items-center justify-center">
            <div className="absolute inset-0 bg-purple-500/20 rounded-full animate-pulse-slow"></div>
            <Fuel className="h-16 w-16 text-purple-400" />
        </div>

        <h3 className="mt-8 text-3xl font-bold">No Fuel Logs Found</h3>
        <p className='mt-2 max-w-sm text-lg text-muted-foreground'>
            Get started by adding your first fuel log to the fleet.
        </p>
        
        {canCreate && (
            <CreateFuelLogDialog asChild>
                <Button className="mt-8 py-6 px-8 text-lg card-lift bg-purple-500 hover:bg-purple-600 text-white">
                    <PlusCircle className="mr-3 h-5 w-5" />
                    Add First Fuel Log
                </Button>
            </CreateFuelLogDialog>
        )}

        <div className='mt-12 w-full max-w-2xl'>
          <p className='text-sm uppercase text-muted-foreground font-semibold tracking-wider'>ONCE YOU ADD A FUEL LOG, YOU&apos;LL BE ABLE TO:</p>
          <div className='mt-4 grid grid-cols-3 gap-4 text-left'>
              <div className='rounded-lg p-4 flex items-center space-x-3 bg-slate-800/75 backdrop-blur-lg border border-slate-300/20'>
                  <Droplets className='h-6 w-6 text-purple-400' />
                  <span className='font-medium'>Track Fuel Consumption</span>
              </div>
              <div className='rounded-lg p-4 flex items-center space-x-3 bg-slate-800/75 backdrop-blur-lg border border-slate-300/20'>
                  <Gauge className='h-6 w-6 text-purple-400' />
                  <span className='font-medium'>Monitor Vehicle Efficiency</span>
              </div>
              <div className='rounded-lg p-4 flex items-center space-x-3 bg-slate-800/75 backdrop-blur-lg border border-slate-300/20'>
                  <ClipboardList className='h-6 w-6 text-purple-400' />
                  <span className='font-medium'>Generate Fuel Reports</span>
              </div>
          </div>
        </div>
    </Card>
  );
