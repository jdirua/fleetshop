'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { updateWorkOrder, getWorkOrder } from '@/lib/actions/workOrders';
import { getVehicles } from '@/lib/actions/vehicles';
import { getAllUsers } from '@/lib/actions/users';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from 'react';
import { Vehicle } from '@/lib/types/vehicle';
import { User } from '@/lib/types/user';
import { WorkOrder } from '@/lib/types/workOrder';
import { notFound } from 'next/navigation';

const workOrderSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  vehicleId: z.string().min(1, 'Vehicle is required'),
  assignedMechanicId: z.string().optional(),
  status: z.enum(["draft", "assigned", "in-progress", "paused", "review", "completed", "archived"]),
  priority: z.enum(["high", "low", "medium", "emergency"]),
  startDate: z.date().optional(),
  completionDate: z.date().optional(),
  notes: z.string().optional(),
});

type WorkOrderFormData = z.infer<typeof workOrderSchema>;

export default function EditWorkOrderPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors }, reset, setValue, getValues } = useForm<WorkOrderFormData>({
    resolver: zodResolver(workOrderSchema),
  });
  const [workOrder, setWorkOrder] = useState<WorkOrder | null>(null);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadInitialData() {
        try {
            const [fetchedWorkOrder, fetchedVehicles, { users: fetchedUsers }] = await Promise.all([
                getWorkOrder(params.id),
                getVehicles({ limit: 1000 }),
                getAllUsers(),
            ]);

            if (fetchedWorkOrder) {
                setWorkOrder(fetchedWorkOrder);
                reset({
                    ...fetchedWorkOrder,
                    startDate: fetchedWorkOrder.startDate ? new Date(fetchedWorkOrder.startDate) : undefined,
                    completionDate: fetchedWorkOrder.completionDate ? new Date(fetchedWorkOrder.completionDate) : undefined,
                });
            }
            
            setVehicles(fetchedVehicles.data);
            setUsers(fetchedUsers.filter(u => u.role === 'mechanic'));
        } catch (error) {
            console.error('Failed to load initial data', error)
        }
        setLoading(false);
    }
    loadInitialData();
  }, [params.id, reset]);

  const onSubmit = async (data: WorkOrderFormData) => {
    if (!workOrder) return;
    try {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if (value) {
                if (value instanceof Date) {
                    formData.append(key, value.toISOString());
                } else {
                    formData.append(key, value as string);
                }
            }
        });
      await updateWorkOrder(workOrder.id, formData);
      router.push('/dashboard/work-orders');
    } catch (error) {
      console.error('Failed to update work order:', error);
    }
  };
  
  if (loading) {
    return (
        <Card>
            <CardHeader>
                <div className="h-8 w-48 bg-gray-200 dark:bg-gray-800 rounded-md animate-pulse" />
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="h-10 w-full bg-gray-200 dark:bg-gray-800 rounded-md animate-pulse" />
                <div className="h-10 w-full bg-gray-200 dark:bg-gray-800 rounded-md animate-pulse" />
                <div className="h-10 w-full bg-gray-200 dark:bg-gray-800 rounded-md animate-pulse" />
            </CardContent>
        </Card>
    );
  }

  if (!workOrder) {
    notFound();
  }

  return (
    <Card>
        <CardHeader>
            <CardTitle>Edit Work Order</CardTitle>
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
                        <Select onValueChange={(value) => setValue('vehicleId', value)} defaultValue={getValues('vehicleId')}>
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
                        <Select onValueChange={(value) => setValue('status', value as "draft" | "assigned" | "in-progress" | "paused" | "review" | "completed" | "archived")} defaultValue={getValues('status')}>
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
                        <Select onValueChange={(value) => setValue('priority', value as "high" | "low" | "medium" | "emergency")} defaultValue={getValues('priority')}>
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
                        <Label htmlFor="assignedMechanicId">Assigned Mechanic</Label>
                        <Select onValueChange={(value) => setValue('assignedMechanicId', value)} defaultValue={getValues('assignedMechanicId')}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select mechanic" />
                            </SelectTrigger>
                            <SelectContent>
                                {users.map(u => <SelectItem key={u.uid} value={u.uid}>{u.displayName}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="startDate">Start Date</Label>
                        <Input id="startDate" type="date" {...register('startDate', { valueAsDate: true })} />
                    </div>
                    <div>
                        <Label htmlFor="completionDate">Completion Date</Label>
                        <Input id="completionDate" type="date" {...register('completionDate', { valueAsDate: true })} />
                    </div>
                </div>
                <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" {...register('description')} />
                </div>
                <div>
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea id="notes" {...register('notes')} />
                </div>
              <Button type="submit">Save Changes</Button>
            </form>
        </CardContent>
    </Card>
  );
}
