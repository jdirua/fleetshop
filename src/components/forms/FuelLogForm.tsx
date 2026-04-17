
'use client';

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Vehicle } from "@/lib/types/vehicle";
import { FuelLogFormState } from "@/lib/actions/fuelLogs";
import { FuelLog } from "@/lib/types/fuelLog";

interface FuelLogFormProps {
  vehicles: Vehicle[];
  state: FuelLogFormState;
  fuelLog?: FuelLog;
}

export function FuelLogForm({ vehicles, state, fuelLog }: FuelLogFormProps) {
  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="vehicleId">Vehicle</Label>
          <Select name="vehicleId" defaultValue={fuelLog?.vehicleId}>
            <SelectTrigger>
              <SelectValue placeholder="Select a vehicle" />
            </SelectTrigger>
            <SelectContent>
              {vehicles.map((vehicle) => (
                <SelectItem key={vehicle.id} value={vehicle.id}>
                  {vehicle.year} {vehicle.make} {vehicle.model}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {state.errors?.vehicleId && <p className="text-sm text-red-500">{state.errors.vehicleId}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Input id="date" name="date" type="date" defaultValue={fuelLog?.date} required />
          {state.errors?.date && <p className="text-sm text-red-500">{state.errors.date}</p>}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="liters">Liters</Label>
          <Input id="liters" name="liters" type="number" step="0.01" defaultValue={fuelLog?.liters} required />
          {state.errors?.liters && <p className="text-sm text-red-500">{state.errors.liters}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="cost">Total Cost</Label>
          <Input id="cost" name="cost" type="number" step="0.01" defaultValue={fuelLog?.cost} required />
          {state.errors?.cost && <p className="text-sm text-red-500">{state.errors.cost}</p>}
        </div>
      </div>
      <div className="space-y-2">
          <Label htmlFor="odometer">Odometer Reading</Label>
          <Input id="odometer" name="odometer" type="number" defaultValue={fuelLog?.odometer} required />
          {state.errors?.odometer && <p className="text-sm text-red-500">{state.errors.odometer}</p>}
        </div>
      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea id="notes" name="notes" placeholder="Add any relevant notes..." defaultValue={fuelLog?.notes} />
      </div>
    </div>
  );
}
