
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
import { EmptyState } from '@/components/ui/empty-state';

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
        <Card className="h-full flex flex-col">
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
    <div className="p-2 md:p-4">
        <AddVehicleWizard 
            isOpen={isWizardOpen} 
            onOpenChange={setIsWizardOpen} 
            onSuccess={handleSuccess} 
        />
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-4xl font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg px-4 py-2 shadow-lg">Vehicle Hub</h1>
        <Button onClick={() => setIsWizardOpen(true)} className="bg-purple-500 hover:bg-purple-600 text-white shadow-md transition-all hover:shadow-lg">
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
        <EmptyState 
          title="No Vehicles Found"
          description="Get started by adding your first vehicle to the fleet."
          icon={<Car className="h-16 w-16 text-purple-400" />}
          action={{
            text: "Add First Vehicle",
            onClick: () => setIsWizardOpen(true)
          }}
          features={{
            title: "Once you add a vehicle, you'll be able to:",
            items: [
              {
                icon: <Wrench className='h-6 w-6 text-purple-400' />,
                text: "Manage Work Orders"
              },
              {
                icon: <Fuel className='h-6 w-6 text-purple-400' />,
                text: "Log Fuel & Costs"
              },
              {
                icon: <ClipboardList className='h-6 w-6 text-purple-400' />,
                text: "Track Service History"
              }
            ]
          }}
        />
      )}
    </div>
  );
}
