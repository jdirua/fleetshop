
'use client';

import { useFormState } from 'react-dom';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { createFuelLog } from '@/lib/actions/fuelLogs';
import { useEffect, useState } from 'react';
import { Vehicle } from '@/lib/types/vehicle';
import { getVehicles } from '@/lib/actions/vehicles';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { FuelLogForm } from '../forms/FuelLogForm';
import { FuelLogFormState } from '@/lib/actions/fuelLogs';

const initialState: FuelLogFormState = {
  message: '',
  errors: {},
  success: false,
};

export function CreateFuelLogDialog({ children, asChild }: { children: React.ReactNode, asChild?: boolean }) {
  const [state, formAction] = useFormState(createFuelLog, initialState);
  const [open, setOpen] = useState(false);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (open) {
      async function loadVehicles() {
        const { vehicles: fetchedVehicles } = await getVehicles();
        setVehicles(fetchedVehicles);
      }
      loadVehicles();
    }
  }, [open]);

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      setOpen(false);
      router.refresh();
    } else if (state.message && !state.success && Object.keys(state.errors).length > 0) {
      toast.error(state.message);
    }
  }, [state, router]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild={asChild}>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl glass-card">
        <DialogHeader>
          <DialogTitle>Add New Fuel Log</DialogTitle>
          <DialogDescription>
            Fill out the form below to create a new fuel log. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form action={formAction}>
          <FuelLogForm vehicles={vehicles} state={state} />
           <DialogFooter className='pt-4'>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" className='bg-purple-500 hover:bg-purple-600 text-white'>Save Fuel Log</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
