
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createInventoryItem, updateInventoryItem } from '@/lib/actions/inventory';
import { InventoryItem } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const InventoryItemSchema = z.object({
  name: z.string().min(1, 'Item name is required'),
  quantity: z.coerce.number().min(0, 'Quantity cannot be negative'),
  cost: z.coerce.number().min(0, 'Cost cannot be negative'),
  supplier: z.string().optional(),
  location: z.string().optional(),
  reorderPoint: z.coerce.number().min(0, 'Reorder point cannot be negative').optional(),
});

interface InventoryItemFormProps {
  inventoryItem?: InventoryItem;
  onFormSubmit?: () => void;
}

export function InventoryItemForm({ inventoryItem, onFormSubmit }: InventoryItemFormProps) {
  const form = useForm<z.infer<typeof InventoryItemSchema>>({
    resolver: zodResolver(InventoryItemSchema),
    defaultValues: inventoryItem || {
      name: '',
      quantity: 0,
      cost: 0,
      supplier: '',
      location: '',
      reorderPoint: 0,
    },
  });

  const onSubmit = async (values: z.infer<typeof InventoryItemSchema>) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
        if (value) {
            formData.append(key, String(value));
        }
    });

    if (inventoryItem) {
        await updateInventoryItem(inventoryItem.id, {} , formData)
    } else {
        await createInventoryItem({}, formData);
    }

    if (onFormSubmit) {
        onFormSubmit();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Item Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cost"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cost</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="supplier"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Supplier</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="reorderPoint"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reorder Point</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">{inventoryItem ? 'Update Item' : 'Create Item'}</Button>
      </form>
    </Form>
  );
}
