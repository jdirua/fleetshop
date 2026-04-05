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
import { createInventoryItem } from '@/lib/actions/inventory';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const initialState = {
  message: '',
  errors: undefined,
  success: false,
};

interface CreateInventoryItemDialogProps {
  children: React.ReactNode;
  asChild?: boolean;
  onFormSubmit: () => void;
}

export function CreateInventoryItemDialog({ children, asChild, onFormSubmit }: CreateInventoryItemDialogProps) {
  const [state, formAction] = useFormState(createInventoryItem, initialState);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      setOpen(false);
      if (onFormSubmit) {
        onFormSubmit();
      }
    } else if (state.message && !state.success && state.errors) {
      toast.error(state.message);
    }
  }, [state, onFormSubmit]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild={asChild}>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl glass-card">
        <DialogHeader>
          <DialogTitle>Add New Inventory Item</DialogTitle>
          <DialogDescription>
            Fill out the form below to add a new item to the inventory. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form action={formAction}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-1">
            <div className="space-y-2">
              <label htmlFor="name">Item Name</label>
              <Input id="name" name="name" placeholder="e.g., Spark Plugs" required className="bg-transparent/20" />
              {state.errors?.name && <p className="text-sm text-red-500">{state.errors.name[0]}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="quantity">Quantity</label>
              <Input id="quantity" name="quantity" type="number" placeholder="0" defaultValue="0" required className="bg-transparent/20" />
              {state.errors?.quantity && <p className="text-sm text-red-500">{state.errors.quantity[0]}</p>}
            </div>
            
            <div className="space-y-2">
                <label htmlFor="cost">Cost</label>
                 <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">PGK</span>
                    <Input id="cost" name="cost" type="number" placeholder="0.00" step="0.01" defaultValue="0" className="bg-transparent/20 pl-12"/>
                </div>
                {state.errors?.cost && <p className="text-sm text-red-500">{state.errors.cost[0]}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="reorderPoint">Reorder Point</label>
              <Input id="reorderPoint" name="reorderPoint" type="number" placeholder="0" defaultValue="0" required className="bg-transparent/20" />
              {state.errors?.reorderPoint && <p className="text-sm text-red-500">{state.errors.reorderPoint[0]}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="supplier">Supplier</label>
              <Input id="supplier" name="supplier" placeholder="e.g., Global Auto Parts" className="bg-transparent/20" />
            </div>

            <div className="space-y-2">
              <label htmlFor="location">Location</label>
              <Input id="location" name="location" placeholder="e.g., Shelf A, Bin 3" className="bg-transparent/20" />
            </div>
          </div>
          <DialogFooter className='pt-4'>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" className='btn-primary-glow'>Save Item</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
