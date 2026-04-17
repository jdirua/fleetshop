
'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createFuelLog } from '@/lib/actions/fuelLogs';
import { getVehicles } from '@/lib/actions/vehicles';
import { Vehicle } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const FuelLogSchema = z.object({
  vehicleId: z.string().min(1, 'Vehicle is required'),
  odometer: z.coerce.number().min(1, 'Odometer reading is required'),
  gallons: z.coerce.number().min(1, 'Gallons are required'),
  cost: z.coerce.number().min(1, 'Cost is required'),
});

const initialState = {
    message: '',
    errors: undefined,
    success: false,
  };

export function CreateFuelLogDialog() {
  const [open, setOpen] = useState(false);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const form = useForm<z.infer<typeof FuelLogSchema>>({
    resolver: zodResolver(FuelLogSchema),
    defaultValues: {
      vehicleId: '',
      odometer: 0,
      gallons: 0,
      cost: 0,
    },
  });

  useEffect(() => {
    if (open) {
      async function loadVehicles() {
        const { data: fetchedVehicles } = await getVehicles();
        setVehicles(fetchedVehicles);
      }
      loadVehicles();
    }
  }, [open]);

  const onSubmit = async (values: z.infer<typeof FuelLogSchema>) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
        formData.append(key, String(value));
    });
    await createFuelLog(initialState, formData);
    form.reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Fuel Log</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Fuel Log</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="vehicleId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vehicle</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a vehicle" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {vehicles.map(vehicle => (
                        <SelectItem key={vehicle.id} value={vehicle.id}>
                          {vehicle.make} {vehicle.model} ({vehicle.registration})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="odometer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Odometer</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gallons"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gallons</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" {...field} />
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
            <Button type="submit">Create Log</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
