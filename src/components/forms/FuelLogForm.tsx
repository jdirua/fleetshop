
'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { FuelLog, Vehicle, FormState } from '@/lib/types';
import { createFuelLog, updateFuelLog } from '@/lib/actions/fuelLogs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface FuelLogFormProps {
  vehicles: Vehicle[];
  fuelLog?: FuelLog;
}

const initialState: FormState = { message: null, errors: {} };

function SubmitButton({ isEditing }: { isEditing: boolean }) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? (isEditing ? 'Updating...' : 'Creating...') : (isEditing ? 'Update Fuel Log' : 'Create Fuel Log')}
    </Button>
  );
}

export function FuelLogForm({ vehicles, fuelLog }: FuelLogFormProps) {
  const router = useRouter();
  const action = fuelLog ? updateFuelLog.bind(null, fuelLog.id) : createFuelLog;
  const [state, dispatch] = useFormState(action, initialState);

  useEffect(() => {
    if (state?.message?.includes('successfully')) {
      router.push('/dashboard/fuel-logs');
    }
  }, [state, router]);

  return (
    <form action={dispatch} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="vehicleId">Vehicle</Label>
          <Select name="vehicleId" defaultValue={fuelLog?.vehicleId}>
            <SelectTrigger id="vehicleId">
              <SelectValue placeholder="Select a vehicle" />
            </SelectTrigger>
            <SelectContent>
              {vehicles.map((vehicle) => (
                <SelectItem key={vehicle.id} value={vehicle.id}>
                  {vehicle.make} {vehicle.model} ({vehicle.registration})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {state.errors?.vehicleId && <p className="text-sm font-medium text-red-500">{state.errors.vehicleId[0]}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Input type="date" id="date" name="date" defaultValue={fuelLog?.date ? new Date(fuelLog.date).toISOString().split('T')[0] : ''} />
          {state.errors?.date && <p className="text-sm font-medium text-red-500">{state.errors.date[0]}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="liters">Liters</Label>
          <Input type="number" id="liters" name="liters" step="0.01" defaultValue={fuelLog?.liters} />
          {state.errors?.liters && <p className="text-sm font-medium text-red-500">{state.errors.liters[0]}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="cost">Total Cost</Label>
          <Input type="number" id="cost" name="cost" step="0.01" defaultValue={fuelLog?.cost} />
          {state.errors?.cost && <p className="text-sm font-medium text-red-500">{state.errors.cost[0]}</p>}
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="odometer">Odometer (in km)</Label>
          <Input type="number" id="odometer" name="odometer" defaultValue={fuelLog?.odometer} />
          {state.errors?.odometer && <p className="text-sm font-medium text-red-500">{state.errors.odometer[0]}</p>}
        </div>
      </div>

      <div className="flex items-center justify-end space-x-4">
        <SubmitButton isEditing={!!fuelLog} />
      </div>

      {state.message && !state.message.includes('successfully') && (
          <div className="mt-4 rounded-md border border-red-200 bg-red-50 p-4">
              <p className="text-sm font-medium text-red-600">{state.message}</p>
          </div>
      )}
    </form>
  );
}
