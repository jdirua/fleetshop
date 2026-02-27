
'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { db } from '@/lib/firebase/admin-sdk';
import { WorkOrder } from '@/lib/types/workOrder';
import { logActivity } from './activityLogs';

const WorkOrderSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  vehicleId: z.string().min(1, 'Vehicle is required'),
  assignedMechanicId: z.string().optional(),
  status: z.enum(['draft', 'assigned', 'in-progress', 'paused', 'review', 'completed', 'archived']),
  priority: z.enum(['low', 'medium', 'high', 'emergency']),
  cost: z.coerce.number().min(0, 'Cost must be a positive number'),
  startDate: z.string().optional(),
  completionDate: z.string().optional(),
  createdAt: z.string(),
});

const CreateWorkOrderSchema = WorkOrderSchema.omit({ id: true, createdAt: true });

export async function createWorkOrder(prevState: any, formData: FormData) {
  const validatedFields = CreateWorkOrderSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Validation failed.",
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
      message: 'An unexpected error occurred.',
    };
  }
}

export async function getWorkOrders() {
  try {
    const snapshot = await db.collection('workOrders').get();
    if (snapshot.empty) {
      return [];
    }
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as WorkOrder[];
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
    return { id: doc.id, ...doc.data() } as WorkOrder;
  } catch (error) {
    console.error('Error fetching work order:', error);
    throw new Error('Could not fetch work order.');
  }
}

export async function updateWorkOrder(id: string, formData: FormData) {
  const validatedFields = CreateWorkOrderSchema.partial().safeParse(Object.fromEntries(formData.entries()));

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
