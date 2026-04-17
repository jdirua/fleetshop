'use client';

import { useActionState, useEffect, useState } from 'react';
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
import { Input } from '@/components/ui/input';
import { createWorkOrder } from '@/lib/actions/workOrders';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getVehicles } from '@/lib/actions/vehicles';
import { Vehicle } from '@/lib/types/vehicle';

const initialState = {
  message: '',
  errors: undefined,
  success: false,
};

export function CreateWorkOrderDialog({ children, asChild }: { children: React.ReactNode, asChild?: boolean }) {
  const [state, formAction] = useActionState(createWorkOrder, initialState);
  const [isOpen, setIsOpen] = useState(false);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      async function loadVehicles() {
        const { data: fetchedVehicles } = await getVehicles();
        setVehicles(fetchedVehicles);
      }
      loadVehicles();
    }
  }, [isOpen]);

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      setIsOpen(false);
      router.refresh();
    } else if (state.message && !state.success && state.errors) {
      toast.error(state.message);
    }
  }, [state, router]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>      <DialogTrigger asChild={asChild}>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl glassmorphic">
        <DialogHeader>
          <DialogTitle>Create New Work Order</DialogTitle>
          <DialogDescription>
            Fill out the form below to create a new work order.
          </DialogDescription>
        </DialogHeader>
        <form action={formAction}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-1">
            
            <div className="space-y-2">
              <label htmlFor="vehicleId">Vehicle</label>
              <Select name="vehicleId">
                <SelectTrigger className="bg-transparent/20">
                  <SelectValue placeholder="Select a vehicle" />
                </SelectTrigger>
                <SelectContent>
                  {vehicles.map(vehicle => (
                    <SelectItem key={vehicle.id} value={vehicle.id}>
                      {vehicle.make} {vehicle.model} ({vehicle.year})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {state.errors?.vehicleId && <p className="text-sm text-red-500">{state.errors.vehicleId[0]}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="title">Title</label>
              <Input id="title" name="title" placeholder="e.g., Oil Change" required className="bg-transparent/20" />
              {state.errors?.title && <p className="text-sm text-red-500">{state.errors.title[0]}</p>}
            </div>

            <div className="space-y-2 md:col-span-2">
              <label htmlFor="description">Description</label>
              <Textarea id="description" name="description" placeholder="Describe the work to be done..." required className="bg-transparent/20" />
              {state.errors?.description && <p className="text-sm text-red-500">{state.errors.description[0]}</p>}
            </div>
            
            <div className="space-y-2">
              <label htmlFor="status">Status</label>
              <Select name="status" defaultValue="pending">
                <SelectTrigger className="bg-transparent/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              {state.errors?.status && <p className="text-sm text-red-500">{state.errors.status[0]}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="priority">Priority</label>
              <Select name="priority" defaultValue="medium">
                <SelectTrigger className="bg-transparent/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
              {state.errors?.priority && <p className="text-sm text-red-500">{state.errors.priority[0]}</p>}
            </div>

          </div>
          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button type="submit" className="btn-primary-glow">Create Work Order</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
