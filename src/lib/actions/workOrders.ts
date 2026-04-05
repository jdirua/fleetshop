
'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { db } from '@/lib/firebase/admin-sdk';
import { WorkOrder } from '@/lib/types/workOrder';
import { logActivity } from './activityLogs';
import { Vehicle } from '@/lib/types/vehicle';

const WorkOrderSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  vehicleId: z.string().min(1, 'Vehicle is required'),
  assignedMechanicId: z.string().optional(),
  status: z.enum(['open', 'in-progress', 'on-hold', 'completed', 'cancelled']),
  priority: z.enum(['low', 'medium', 'high']),
  cost: z.coerce.number().min(0, 'Cost must be a non-negative number.'),
  startDate: z.string().optional(),
  completionDate: z.string().optional(),
  createdAt: z.string(),
});

const CreateWorkOrderSchema = WorkOrderSchema.omit({ id: true, createdAt: true });

export async function createWorkOrder(prevState: { errors?: Record<string, string[]>; message?: string; }, formData: FormData) {
  const validatedFields = CreateWorkOrderSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return {
      success: false,
      message: "Validation failed. Please check the form and try again.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const newWorkOrderData = validatedFields.data;
    const docRef = await db.collection('workOrders').add({
      ...newWorkOrderData,
      createdAt: new Date().toISOString(),
    });

    await logActivity('Created Work Order', { type: 'workOrder', id: docRef.id });

    revalidatePath('/dashboard/work-orders');
    return { 
      success: true, 
      message: 'Work Order created successfully', 
      workOrderId: docRef.id 
    };

  } catch (error) {
    console.error('Error creating work order:', error);
    return { 
      success: false,
      message: 'An unexpected error occurred while creating the work order.',
    };
  }
}

export async function getWorkOrders({ page = 1, limit = 10 }: { page?: number; limit?: number } = {}): Promise<{ data: WorkOrder[], totalPages: number }> {
  try {
    const workOrdersRef = db.collection('workOrders');
    
    // Get the total count of documents for pagination
    const snapshot = await workOrdersRef.get();
    const totalWorkOrders = snapshot.size;

    const totalPages = Math.ceil(totalWorkOrders / limit);
    const offset = (page - 1) * limit;

    const workOrdersSnapshot = await workOrdersRef.orderBy('createdAt', 'desc').limit(limit).offset(offset).get();
    if (workOrdersSnapshot.empty) {
      return { data: [], totalPages: 0 };
    }
    
    const data = await Promise.all(workOrdersSnapshot.docs.map(async (doc) => {
      const workOrder = { id: doc.id, ...doc.data() } as WorkOrder;
      const vehicleDoc = await db.collection('vehicles').doc(workOrder.vehicleId).get();
      if (vehicleDoc.exists) {
        workOrder.vehicle = { id: vehicleDoc.id, ...vehicleDoc.data() } as Vehicle;
      }
      return workOrder;
    }));

    return { data, totalPages };
  } catch (error) {
    console.error('Error fetching work orders:', error);
    throw new Error('Could not fetch work orders.');
  }
}

export async function getWorkOrder(id: string): Promise<WorkOrder | null> {
  try {
    const doc = await db.collection('workOrders').doc(id).get();
    if (!doc.exists) {
      return null;
    }
    const workOrder = { id: doc.id, ...doc.data() } as WorkOrder;
    const vehicleDoc = await db.collection('vehicles').doc(workOrder.vehicleId).get();
    if (vehicleDoc.exists) {
      workOrder.vehicle = { id: vehicleDoc.id, ...vehicleDoc.data() } as Vehicle;
    }
    return workOrder;
  } catch (error) {
    console.error('Error fetching work order:', error);
    throw new Error('Could not fetch work order.');
  }
}

export async function updateWorkOrder(id: string, formData: FormData) {
  const UpdateWorkOrderSchema = CreateWorkOrderSchema.partial();
  const validatedFields = UpdateWorkOrderSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return { 
      success: false, 
      message: 'Validation failed',
      errors: validatedFields.error.flatten().fieldErrors 
    };
  }

  try {
    await db.collection('workOrders').doc(id).update(validatedFields.data);
    await logActivity('Updated Work Order', { type: 'workOrder', id });
    revalidatePath('/dashboard/work-orders');
    revalidatePath(`/dashboard/work-orders/${id}/edit`);
    return { 
      success: true, 
      message: 'Work Order updated successfully' 
    };

  } catch (error) {
    console.error('Error updating work order:', error);
    return { 
      success: false, 
      message: 'An unexpected error occurred.' 
    };
  }
}

export async function deleteWorkOrder(id: string) {
  try {
    await db.collection('workOrders').doc(id).delete();
    await logActivity('Deleted Work Order', { type: 'workOrder', id });
    revalidatePath('/dashboard/work-orders');
    return { 
      success: true, 
      message: 'Work Order deleted successfully' 
    };

  } catch (error) {
    console.error('Error deleting work order:', error);
    return { 
      success: false, 
      message: 'An unexpected error occurred.' 
    };
  }
}
