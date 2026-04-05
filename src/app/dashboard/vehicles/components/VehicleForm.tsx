'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Vehicle } from '@/lib/types/vehicle';
import { createVehicle, updateVehicle } from '@/lib/actions/vehicles';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// The SubmitButton component is extracted to use the useFormStatus hook,
// which must be used in a component that is a child of the form.
function SubmitButton({ isEditing }: { isEditing: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? 'Saving...' : isEditing ? 'Update Vehicle' : 'Create Vehicle'}
    </Button>
  );
}

// The main form component for creating or editing a vehicle.
export function VehicleForm({ vehicle }: { vehicle?: Vehicle }) {
  const router = useRouter();
  const isEditing = !!vehicle;

  // The form action will be either `createVehicle` or an `updateVehicle` action bound with the vehicle's ID.
  const formAction = isEditing ? updateVehicle.bind(null, vehicle.id) : createVehicle;
  const [state, dispatch] = useFormState(formAction, { errors: {}, message: null });

  useEffect(() => {
    if (state.message) {
      // If the form submission was successful, redirect the user back to the main vehicles page.
      router.push('/dashboard/vehicles');
    }
  }, [state.message, router]);

  return (
    <form action={dispatch} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Registration Number */}
        <div className="space-y-2">
          <Label htmlFor="registration">Registration Number</Label>
          <Input id="registration" name="registration" defaultValue={vehicle?.registration} />
          {state.errors?.registration && <p className="text-red-500 text-sm">{state.errors.registration[0]}</p>}
        </div>

        {/* Make */}
        <div className="space-y-2">
          <Label htmlFor="make">Make</Label>
          <Input id="make" name="make" defaultValue={vehicle?.make} />
          {state.errors?.make && <p className="text-red-500 text-sm">{state.errors.make[0]}</p>}
        </div>

        {/* Model */}
        <div className="space-y-2">
          <Label htmlFor="model">Model</Label>
          <Input id="model" name="model" defaultValue={vehicle?.model} />
          {state.errors?.model && <p className="text-red-500 text-sm">{state.errors.model[0]}</p>}
        </div>

        {/* Year */}
        <div className="space-y-2">
          <Label htmlFor="year">Year</Label>
          <Input id="year" name="year" type="number" defaultValue={vehicle?.year} />
          {state.errors?.year && <p className="text-red-500 text-sm">{state.errors.year[0]}</p>}
        </div>

        {/* Current Odometer */}
        <div className="space-y-2">
          <Label htmlFor="currentOdometer">Current Odometer (km)</Label>
          <Input id="currentOdometer" name="currentOdometer" type="number" defaultValue={vehicle?.currentOdometer} />
          {state.errors?.currentOdometer && <p className="text-red-500 text-sm">{state.errors.currentOdometer[0]}</p>}
        </div>

        {/* Status */}
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select name="status" defaultValue={vehicle?.status || 'active'}>
            <SelectTrigger>
              <SelectValue placeholder="Select a status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="in-shop">In Shop</SelectItem>
              <SelectItem value="decommissioned">Decommissioned</SelectItem>
            </SelectContent>
          </Select>
          {state.errors?.status && <p className="text-red-500 text-sm">{state.errors.status[0]}</p>}
        </div>
      </div>

      {/* Form-level error messages */}
      {state.errors?._form && <p className="text-red-500 text-sm font-semibold">{state.errors._form[0]}</p>}

      <div className="flex justify-end pt-4">
        <SubmitButton isEditing={isEditing} />
      </div>
    </form>
  );
}
