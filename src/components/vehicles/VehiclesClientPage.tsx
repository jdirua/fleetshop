
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { PlusCircle, Car, Wrench, Fuel, ClipboardList, Gauge, Calendar, User } from 'lucide-react';
import { Vehicle } from '@/lib/types/vehicle';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AddVehicleWizard } from '@/components/modals/AddVehicleWizard';
import { PaginationControls } from '@/components/ui/PaginationControls';

// Helper to get status color for the badge
const getStatusColor = (status: Vehicle['status']) => {
  switch (status) {
    case 'active':
      return 'bg-green-500 hover:bg-green-600';
    case 'in-shop':
      return 'bg-yellow-500 hover:bg-yellow-600';
    case 'decommissioned':
      return 'bg-red-500 hover:bg-red-600';
    default:
      return 'bg-gray-500 hover:bg-gray-600';
  }
};

// Individual Vehicle Card Component
function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  return (
    <Link href={`/dashboard/vehicles/${vehicle.id}`} className="block transition-transform duration-200 ease-in-out hover:-translate-y-1">
        <Card className="h-full flex flex-col glassmorphic">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-xl font-bold">{vehicle.make} {vehicle.model}</CardTitle>
                        <CardDescription>{vehicle.year} - {vehicle.registration}</CardDescription>
                    </div>
                    <Badge className={`${getStatusColor(vehicle.status)} text-white`}>{vehicle.status}</Badge>
                </div>
            </CardHeader>
            <CardContent className="flex-grow">
                <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center">
                        <Gauge className="w-4 h-4 mr-2" />
                        <span>{vehicle.currentOdometer.toLocaleString()} km</span>
                    </div>
                    {vehicle.serviceDate && (
                        <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            <span>Next Service: {new Date(vehicle.serviceDate).toLocaleDateString()}</span>
                        </div>
                    )}
                    {vehicle.assignedDriverId && (
                         <div className="flex items-center">
                            <User className="w-4 h-4 mr-2" />
                            {/* Placeholder for driver's name */}
                            <span>Driver ID: {vehicle.assignedDriverId}</span>
                        </div>
                    )}
                </div>
            </CardContent>
            <CardFooter>
                 <p className="text-xs text-gray-400 truncate">{vehicle.notes || 'No additional notes.'}</p>
            </CardFooter>
        </Card>
    </Link>
  );
}

// Main Vehicles Page
export function VehiclesClientPage({ initialVehicles, totalPages }: { initialVehicles: Vehicle[], totalPages: number }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isWizardOpen, setIsWizardOpen] = useState(false);

    const page = Number(searchParams.get('page')) || 1;
    
    const handleSuccess = () => {
        router.refresh();
    }

    const handlePageChange = (newPage: number) => {
      router.push(`/dashboard/vehicles?page=${newPage}`);
    };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <AddVehicleWizard 
            isOpen={isWizardOpen} 
            onOpenChange={setIsWizardOpen} 
            onSuccess={handleSuccess} 
        />
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Vehicle Hub</h2>
        <Button onClick={() => setIsWizardOpen(true)} className="bg-purple-500 hover:bg-purple-600 text-white">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Vehicle
        </Button>
      </div>

      {initialVehicles.length > 0 ? (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {initialVehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
          <PaginationControls currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
        </>
      ) : (
        <Card className="glassmorphic min-h-[70vh] flex items-center justify-center text-center">
          <div className="flex flex-col items-center justify-center p-6">
            
            <div className="relative w-28 h-28 flex items-center justify-center">
              <div className="absolute inset-0 bg-purple-500/20 rounded-full animate-pulse-slow"></div>
              <Car className="h-16 w-16 text-purple-400" />
            </div>

            <h3 className="mt-8 text-3xl font-bold">No Vehicles Found</h3>
            <p className='mt-2 max-w-sm text-lg text-muted-foreground'>
                Get started by adding your first vehicle to the fleet.
            </p>
            
            <Button onClick={() => setIsWizardOpen(true)} className="mt-8 py-6 px-8 text-lg card-lift bg-purple-500 hover:bg-purple-600 text-white">
                  <PlusCircle className="mr-3 h-5 w-5" />
                  Add First Vehicle
            </Button>

            <div className='mt-12 w-full max-w-2xl'>
              <p className='text-sm uppercase text-muted-foreground font-semibold tracking-wider'>Once you add a vehicle, you&apos;ll be able to:</p>
              <div className='mt-4 grid grid-cols-3 gap-4 text-left'>
                  <div className='glassmorphic rounded-lg p-4 flex items-center space-x-3'>
                      <Wrench className='h-6 w-6 text-purple-400' />
                      <span className='font-medium'>Manage Work Orders</span>
                  </div>
                  <div className='glassmorphic rounded-lg p-4 flex items-center space-x-3'>
                      <Fuel className='h-6 w-6 text-purple-400' />
                      <span className='font-medium'>Log Fuel & Costs</span>
                  </div>
                  <div className='glassmorphic rounded-lg p-4 flex items-center space-x-3'>
                      <ClipboardList className='h-6 w-6 text-purple-400' />
                      <span className='font-medium'>Track Service History</span>
                  </div>
              </div>
            </div>

          </div>
        </Card>
      )}
    </div>
  );
}
