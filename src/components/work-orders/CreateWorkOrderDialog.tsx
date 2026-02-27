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
import { Input } from '@/components/ui/input';
import { createWorkOrder } from '@/lib/actions/workOrders';
import { useEffect } from 'react';

// Define the initial state
const initialState = {
  message: '',
  errors: undefined,
  success: false,
};

export function CreateWorkOrderDialog() {
  const [state, formAction] = useFormState(createWorkOrder, initialState);

  // Optional: Close dialog on success
  useEffect(() => {
    if (state.success) {
      // You could add logic here to close the dialog
      // For example, if you have a closeDialog function from props
    }
  }, [state.success]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Work Order</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Work Order</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new work order.
          </DialogDescription>
        </DialogHeader>
        <form action={formAction}>
          <div className="grid gap-4 py-4">
            <Input 
              name="title" 
              placeholder="Title" 
              required
            />
            {state.errors?.title && <p className="text-sm text-red-600">{state.errors.title.join(', ')}</p>}
            <Input 
              name="description" 
              placeholder="Description" 
            />
            <Input 
              name="cost" 
              type="number" 
              placeholder="Cost" 
              step="0.01"
              required
            />
            <Input 
              name="startDate" 
              type="date" 
              placeholder="Start Date" 
              required
            />
          </div>
          
          {/* Success message */}
          {state.success && state.message && (
            <p className="text-sm text-green-600 mb-4">{state.message}</p>
          )}
          
          {/* Error message */}
          {!state.success && state.message && (
            <p className="text-sm text-red-600 mb-4">{state.message}</p>
          )}
          
          <DialogFooter>
            <Button type="submit">Create</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}