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
import { createVendor } from '@/lib/actions/vendors';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const initialState = {
  message: '',
  errors: undefined,
  success: false,
};

export function CreateVendorDialog({ children, asChild }: { children: React.ReactNode, asChild?: boolean }) {
  const [state, formAction] = useActionState(createVendor, initialState);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      setOpen(false);
      router.refresh();
    } else if (state.message && !state.success && state.errors) {
      toast.error(state.message);
    }
  }, [state, router]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild={asChild}>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl glassmorphic">
        <DialogHeader>
          <DialogTitle>Add New Vendor</DialogTitle>
          <DialogDescription>
            Fill out the form below to add a new vendor. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form action={formAction}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-1">
            <div className="space-y-2 md:col-span-2">
              <label htmlFor="name">Vendor Name</label>
              <Input id="name" name="name" placeholder="e.g., Global Auto Parts" required className="bg-transparent/20" />
              {state.errors?.name && <p className="text-sm text-red-500">{state.errors.name[0]}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="contactName">Contact Name</label>
              <Input id="contactName" name="contactName" placeholder="e.g., John Doe" className="bg-transparent/20" />
            </div>

            <div className="space-y-2">
              <label htmlFor="contactEmail">Contact Email</label>
              <Input id="contactEmail" name="contactEmail" type="email" placeholder="e.g., john.doe@example.com" className="bg-transparent/20" />
              {state.errors?.contactEmail && <p className="text-sm text-red-500">{state.errors.contactEmail[0]}</p>}
            </div>

            <div className="space-y-2 md:col-span-2">
              <label htmlFor="contactPhone">Contact Phone</label>
              <Input id="contactPhone" name="contactPhone" placeholder="e.g., +1 234 567 890" className="bg-transparent/20" />
            </div>
          </div>
          <DialogFooter className='pt-4'>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" className='btn-primary-glow'>Save Vendor</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
