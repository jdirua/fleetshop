
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createVendor, updateVendor } from '@/lib/actions/vendors';
import { Vendor } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useRouter } from 'next/navigation';

const VendorSchema = z.object({
  name: z.string().min(1, 'Vendor name is required'),
  contactName: z.string().optional(),
  contactEmail: z.string().email('Invalid email address').optional().or(z.literal('')),
  contactPhone: z.string().optional(),
});

interface VendorFormProps {
  vendor?: Vendor;
}

export function VendorForm({ vendor }: VendorFormProps) {
  const router = useRouter();
  const form = useForm<z.infer<typeof VendorSchema>>({
    resolver: zodResolver(VendorSchema),
    defaultValues: vendor || {
      name: '',
      contactName: '',
      contactEmail: '',
      contactPhone: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof VendorSchema>) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, String(value));
    });

    const result = vendor
      ? await updateVendor(vendor.id, formData)
      : await createVendor(formData);

    if (result.errors) {
      // Handle server-side validation errors
    } else {
      router.push('/dashboard/vendors');
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
              <FormLabel>Vendor Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contactName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contactEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contactPhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Phone</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">{vendor ? 'Update Vendor' : 'Create Vendor'}</Button>
      </form>
    </Form>
  );
}
