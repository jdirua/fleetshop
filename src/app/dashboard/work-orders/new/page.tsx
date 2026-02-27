'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createWorkOrder } from '@/lib/actions/workOrders';
import { getVehicles } from '@/lib/actions/vehicles';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from 'react';
import { Vehicle } from '@/lib/types/vehicle';

const workOrderSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  vehicleId: z.string().min(1, 'Vehicle is required'),
  status: z.enum(['draft', 'assigned', 'in-progress', 'paused', 'review', 'completed', 'archived']),
  priority: z.enum(['low', 'medium', 'high', 'emergency']),
  cost: z.coerce.number().min(0, 'Cost must be a positive number').optional(),
});

type WorkOrderFormData = z.infer<typeof workOrderSchema>;

const initialState = {
  message: '',
  errors: undefined,
  success: false,
};

export default function NewWorkOrderPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm<WorkOrderFormData>({
    resolver: zodResolver(workOrderSchema),
    defaultValues: {
        status: 'draft',
        priority: 'medium',
        cost: 0,
    }
  });
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    async function loadInitialData() {
        try {
            const fetchedVehicles = await getVehicles();
            setVehicles(fetchedVehicles);
        } catch (error) {
            console.error('Failed to load initial data', error)
        }
    }
    loadInitialData();
  }, []);

  const onSubmit = async (data: WorkOrderFormData) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            formData.append(key, String(value));
        }
    });

    try {
      const result = await createWorkOrder(initialState, formData);
      if (result.success) {
        router.push('/dashboard/work-orders');
      } else {
        // Handle server-side validation errors
        console.error('Failed to create work order:', result.message);
      }
    } catch (error) {
      console.error('Failed to create work order:', error);
    }
  };

  return (
    <Card>
        <CardHeader>
            <CardTitle>Add New Work Order</CardTitle>
        </CardHeader>
        <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" {...register('title')} />
                        {errors.title && <p className="text-red-500 text-xs">{errors.title.message}</p>}
                    </div>
                    <div>
                        <Label htmlFor="vehicleId">Vehicle</Label>
                        <Select onValueChange={(value) => setValue('vehicleId', value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select vehicle" />
                            </SelectTrigger>
                            <SelectContent>
                                {vehicles.map(v => <SelectItem key={v.id} value={v.id}>{v.registration}</SelectItem>)}
                            </SelectContent>
                        </Select>
                        {errors.vehicleId && <p className="text-red-500 text-xs">{errors.vehicleId.message}</p>}
                    </div>
                    <div>
                        <Label htmlFor="status">Status</Label>
                        <Select onValueChange={(value) => setValue('status', value as any)} defaultValue={getValues('status')}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="draft">Draft</SelectItem>
                                <SelectItem value="assigned">Assigned</SelectItem>
                                <SelectItem value="in-progress">In Progress</SelectItem>
                                <SelectItem value="paused">Paused</SelectItem>
                                <SelectItem value="review">Review</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                                <SelectItem value="archived">Archived</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="priority">Priority</Label>
                        <Select onValueChange={(value) => setValue('priority', value as any)} defaultValue={getValues('priority')}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="low">Low</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="high">High</SelectItem>
                                <SelectItem value="emergency">Emergency</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                     <div>
                        <Label htmlFor="cost">Cost</Label>
                        <Input id="cost" type="number" step="0.01" {...register('cost')} />
                        {errors.cost && <p className="text-red-500 text-xs">{errors.cost.message}</p>}
                    </div>
                </div>
                <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" {...register('description')} />
                    {errors.description && <p className="text-red-500 text-xs">{errors.description.message}</p>}
                </div>
              <Button type="submit">Add Work Order</Button>
            </form>
        </CardContent>
    </Card>
  );
}
