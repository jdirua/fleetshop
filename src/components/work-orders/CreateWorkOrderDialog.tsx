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
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { createWorkOrder } from '@/lib/actions/workOrders';
import { useEffect, useState } from 'react';
import { Vehicle } from '@/lib/types/vehicle';
import { getVehicles } from '@/lib/actions/vehicles';
import { toast } from 'sonner';

const initialState = {
  message: '',
  errors: undefined,
  success: false,
};

export function CreateWorkOrderDialog({ isOpen, onOpenChange, onSuccess }: 
  { isOpen: boolean, onOpenChange: (isOpen: boolean) => void, onSuccess: () => void }
) {
  const [state, formAction] = useFormState(createWorkOrder, initialState);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    if (isOpen) {
      async function loadVehicles() {
        const { vehicles: fetchedVehicles } = await getVehicles();
        setVehicles(fetchedVehicles);
      }
      loadVehicles();
    }
  }, [isOpen]);

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      onSuccess();
    } else if (state.message && !state.success && state.errors) {
      toast.error(state.message);
    }
  }, [state, onSuccess]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl glassmorphic">
        <DialogHeader>
          <DialogTitle>Add New Work Order</DialogTitle>
          <DialogDescription>
            Fill out the form below to create a new work order. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form action={formAction}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-1">
            <div className="space-y-2">
              <label htmlFor="title">Title</label>
              <Input id="title" name="title" placeholder="e.g., Engine Overhaul" required className="bg-transparent/20" />
              {state.errors?.title && <p className="text-sm text-red-500">{state.errors.title[0]}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="vehicleId">Vehicle</label>
              <Select name="vehicleId" required>
                <SelectTrigger id="vehicleId" className="bg-transparent/20">
                  <SelectValue placeholder="Select a vehicle" />
                </SelectTrigger>
                <SelectContent className='bg-popover border-slate-700'>
                  {vehicles.map(v => (
                    <SelectItem key={v.id} value={v.id.toString()}>{v.make} {v.model} ({v.year})</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {state.errors?.vehicleId && <p className="text-sm text-red-500">{state.errors.vehicleId[0]}</p>}
            </div>
            
            <div className="space-y-2">
              <label htmlFor="status">Status</label>
              <Select name="status" defaultValue="open">
                <SelectTrigger id="status" className="bg-transparent/20">
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent className='bg-popover border-slate-700'>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="on-hold">On Hold</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="priority">Priority</label>
              <Select name="priority" defaultValue="medium">
                <SelectTrigger id="priority" className="bg-transparent/20">
                  <SelectValue placeholder="Select a priority" />
                </SelectTrigger>
                <SelectContent className='bg-popover border-slate-700'>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
                <label htmlFor="cost">Cost</label>
                 <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">PGK</span>
                    <Input id="cost" name="cost" type="number" placeholder="0.00" step="0.01" defaultValue="0" className="bg-transparent/20 pl-12"/>
                </div>
                {state.errors?.cost && <p className="text-sm text-red-500">{state.errors.cost[0]}</p>}
            </div>

            <div className="md:col-span-2 space-y-2">
              <label htmlFor="description">Description</label>
              <Textarea id="description" name="description" placeholder="Describe the work order..." className="bg-transparent/20"/>
            </div>
          </div>
          <DialogFooter className='pt-4'>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" className='btn-primary-glow'>Save Work Order</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
