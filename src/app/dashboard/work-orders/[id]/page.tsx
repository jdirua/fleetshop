'use client';

import { useEffect, useState } from 'react';
import { getWorkOrder } from '@/lib/actions/workOrders';
import { getVehicle } from '@/lib/actions/vehicles';
import { getUserById } from '@/lib/actions/users';
import { WorkOrder } from '@/lib/types/workOrder';
import { Vehicle } from '@/lib/types/vehicle';
import { User } from '@/lib/types/user';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { notFound } from 'next/navigation';

export default function WorkOrderDetailsPage({ params }: { params: { id: string } }) {
  const [workOrder, setWorkOrder] = useState<WorkOrder | null>(null);
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [mechanic, setMechanic] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadWorkOrder() {
      try {
        const fetchedWorkOrder = await getWorkOrder(params.id);
        if (fetchedWorkOrder) {
          setWorkOrder(fetchedWorkOrder);
          const [fetchedVehicle, fetchedMechanic] = await Promise.all([
            getVehicle(fetchedWorkOrder.vehicleId),
            fetchedWorkOrder.assignedMechanicId ? getUserById(fetchedWorkOrder.assignedMechanicId) : Promise.resolve(null)
          ]);
          setVehicle(fetchedVehicle);
          setMechanic(fetchedMechanic);
        }
      } catch (error) {
        console.error('Failed to fetch work order details:', error);
      }
      setLoading(false);
    }
    loadWorkOrder();
  }, [params.id]);

  if (loading) {
    return (
        <Card>
            <CardHeader>
                <div className="h-8 w-48 bg-gray-200 dark:bg-gray-800 rounded-md animate-pulse" />
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="h-6 w-full bg-gray-200 dark:bg-gray-800 rounded-md animate-pulse" />
                <div className="h-6 w-full bg-gray-200 dark:bg-gray-800 rounded-md animate-pulse" />
                <div className="h-6 w-full bg-gray-200 dark:bg-gray-800 rounded-md animate-pulse" />
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
        <CardTitle>{workOrder.title}</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        <div>
            <p className="font-semibold">Vehicle:</p>
            <p>{vehicle ? vehicle.registration : 'Loading...'}</p>
        </div>
        <div>
            <p className="font-semibold">Status:</p>
            <p>{workOrder.status}</p>
        </div>
        <div>
            <p className="font-semibold">Priority:</p>
            <p>{workOrder.priority}</p>
        </div>
        <div>
            <p className="font-semibold">Description:</p>
            <p>{workOrder.description}</p>
        </div>
        <div>
            <p className="font-semibold">Assigned Mechanic:</p>
            <p>{mechanic ? mechanic.name : 'Not Assigned'}</p>
        </div>
        <div>
            <p className="font-semibold">Start Date:</p>
            <p>{workOrder.startDate ? new Date(workOrder.startDate).toLocaleDateString() : 'Not Started'}</p>
        </div>
        <div>
            <p className="font-semibold">Completion Date:</p>
            <p>{workOrder.completionDate ? new Date(workOrder.completionDate).toLocaleDateString() : 'Not Completed'}</p>
        </div>
      </CardContent>
    </Card>
  );
}
