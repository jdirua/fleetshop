'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { createVehicle, updateVehicle } from '@/lib/actions/vehicles';
import { Vehicle } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface VehicleFormProps {
  vehicle?: Vehicle;
}

const initialState = { message: null, errors: {} };

function SubmitButton({ isEditing }: { isEditing: boolean }) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? (isEditing ? 'Updating...' : 'Creating...') : (isEditing ? 'Update Vehicle' : 'Create Vehicle')}
    </Button>
  );
}

export function VehicleForm({ vehicle }: VehicleFormProps) {
  const router = useRouter();
  const action = vehicle ? updateVehicle.bind(null, vehicle.id) : createVehicle;
  const [state, dispatch] = useFormState(action, initialState);

  useEffect(() => {
    if (state.message?.includes('successfully')) {
      router.push('/dashboard/vehicles');
    }
  }, [state, router]);

  return (
    <form action={dispatch} className="space-y-8">
      <div className="space-y-2">
        <Label htmlFor="registration">Registration</Label>
        <Input id="registration" name="registration" defaultValue={vehicle?.registration} />
        {state.errors?.registration && <p className="text-sm font-medium text-red-500">{state.errors.registration[0]}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="vin">VIN</Label>
        <Input id="vin" name="vin" defaultValue={vehicle?.vin} />
        {state.errors?.vin && <p className="text-sm font-medium text-red-500">{state.errors.vin[0]}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="make">Make</Label>
        <Input id="make" name="make" defaultValue={vehicle?.make} />
        {state.errors?.make && <p className="text-sm font-medium text-red-500">{state.errors.make[0]}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="model">Model</Label>
        <Input id="model" name="model" defaultValue={vehicle?.model} />
        {state.errors?.model && <p className="text-sm font-medium text-red-500">{state.errors.model[0]}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="year">Year</Label>
        <Input id="year" name="year" type="number" defaultValue={vehicle?.year} />
        {state.errors?.year && <p className="text-sm font-medium text-red-500">{state.errors.year[0]}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select name="status" defaultValue={vehicle?.status}>
          <SelectTrigger id="status">
            <SelectValue placeholder="Select a status" />
          </SelectTrigger>
          <SelectContent className="solid-dropdown">
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="in-shop">In Shop</SelectItem>
            <SelectItem value="decommissioned">Decommissioned</SelectItem>
          </SelectContent>
        </Select>
        {state.errors?.status && <p className="text-sm font-medium text-red-500">{state.errors.status[0]}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="currentOdometer">Current Odometer</Label>
        <Input id="currentOdometer" name="currentOdometer" type="number" defaultValue={vehicle?.currentOdometer} />
        {state.errors?.currentOdometer && <p className="text-sm font-medium text-red-500">{state.errors.currentOdometer[0]}</p>}
      </div>

      <SubmitButton isEditing={!!vehicle} />

      {state.message && !state.message.includes('successfully') && (
        <div className="mt-4 rounded-md border border-red-200 bg-red-50 p-4">
          <p className="text-sm font-medium text-red-600">{state.message}</p>
        </div>
      )}
    </form>
  );
}
