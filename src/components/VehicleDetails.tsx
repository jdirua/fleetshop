'use client';

import { Vehicle } from '@/lib/types/vehicle';

export default function VehicleDetails({ vehicle }: { vehicle: Vehicle }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <p className="font-semibold">Registration:</p>
        <p>{vehicle.registration}</p>
      </div>
      <div>
        <p className="font-semibold">Make:</p>
        <p>{vehicle.make}</p>
      </div>
      <div>
        <p className="font-semibold">Model:</p>
        <p>{vehicle.model}</p>
      </div>
      <div>
        <p className="font-semibold">Year:</p>
        <p>{vehicle.year}</p>
      </div>
      <div>
        <p className="font-semibold">VIN:</p>
        <p>{vehicle.vin}</p>
      </div>
      <div>
        <p className="font-semibold">Status:</p>
        <p>{vehicle.status}</p>
      </div>
      <div>
        <p className="font-semibold">Current Odometer:</p>
        <p>{vehicle.currentOdometer} miles</p>
      </div>
      <div>
        <p className="font-semibold">Next Service:</p>
        <p>{vehicle.serviceDate ? new Date(vehicle.serviceDate).toLocaleDateString() : 'Not set'}</p>
      </div>
      <div>
        <p className="font-semibold">Notes:</p>
        <p>{vehicle.notes}</p>
      </div>
    </div>
  );
}
