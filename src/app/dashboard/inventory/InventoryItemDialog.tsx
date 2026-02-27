
'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { InventoryItemForm } from '@/components/forms/InventoryItemForm';
import { InventoryItem } from '@/lib/types/inventory';

export function InventoryItemDialog({
  item,
  children,
}: {
  item?: InventoryItem;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  const handleFormSubmit = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{item ? 'Edit Item' : 'New Item'}</DialogTitle>
        </DialogHeader>
        <InventoryItemForm inventoryItem={item} onFormSubmit={handleFormSubmit} />
      </DialogContent>
    </Dialog>
  );
}
