
import Link from 'next/link';
import { PlusCircle, Car, Gauge, Calendar, User } from 'lucide-react';
import { getVehicles } from '@/lib/actions/vehicles';
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
    <Link href={`/dashboard/vehicles/${vehicle.id}`} className="block hover:scale-105 transition-transform duration-200 ease-in-out">
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
export default async function VehiclesPage() {
  const vehicles = await getVehicles();

  return (
    <div className="p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Vehicle Fleet</h1>
        <Button asChild>
          <Link href="/dashboard/vehicles/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Vehicle
          </Link>
        </Button>
      </div>

      {vehicles.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {vehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border-2 border-dashed rounded-lg">
          <Car className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-semibold">No Vehicles Found</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Get started by adding your first vehicle to the fleet.
          </p>
          <Button asChild className="mt-6">
            <Link href="/dashboard/vehicles/new">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add First Vehicle
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
