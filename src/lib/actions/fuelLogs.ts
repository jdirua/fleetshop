
'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { db } from '@/lib/firebase/admin-sdk';
import { FuelLog, FormState } from '@/lib/types/fuelLog';
import { logActivity } from './activityLogs';

const FuelLogSchema = z.object({
  vehicleId: z.string().min(1, 'Vehicle is required'),
  date: z.string().min(1, 'Date is required'),
  liters: z.coerce.number().min(0.01, 'Liters must be greater than 0'),
  cost: z.coerce.number().min(0.01, 'Cost must be greater than 0'),
  odometer: z.coerce.number().min(1, 'Odometer reading is required'),
});

export async function getFuelLogs(): Promise<FuelLog[]> {
    const snapshot = await db.collection('fuelLogs').orderBy('date', 'desc').get();
    if (snapshot.empty) {
        return [];
    }
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as FuelLog));
}

export async function getFuelLog(id: string): Promise<FuelLog | null> {
    try {
        const doc = await db.collection('fuelLogs').doc(id).get();
        if (!doc.exists) {
            return null;
        }
        return { id: doc.id, ...doc.data() } as FuelLog;
    } catch (error) {
        console.error('Error fetching fuel log:', error);
        return null;
    }
}

export async function createFuelLog(prevState: FormState, formData: FormData): Promise<FormState> {
  const validatedFields = FuelLogSchema.safeParse({
    vehicleId: formData.get('vehicleId'),
    date: formData.get('date'),
    liters: formData.get('liters'),
    cost: formData.get('cost'),
    odometer: formData.get('odometer'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Validation Error: Please check your input.',
    };
  }

  try {
    const newLogRef = await db.collection('fuelLogs').add(validatedFields.data);
    await logActivity('Created Fuel Log', { type: 'Fuel Log', id: newLogRef.id });
    revalidatePath('/dashboard/fuel-logs');
    return { message: 'Fuel log created successfully.' };
  } catch (e: any) {
    console.error('Error creating fuel log:', e);
    return { message: 'Error: Failed to create fuel log.' };
  }
}

export async function updateFuelLog(id: string, prevState: FormState, formData: FormData): Promise<FormState> {
    const validatedFields = FuelLogSchema.safeParse({
        vehicleId: formData.get('vehicleId'),
        date: formData.get('date'),
        liters: formData.get('liters'),
        cost: formData.get('cost'),
        odometer: formData.get('odometer'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Validation Error: Please check your input.',
        };
    }

    try {
        await db.collection('fuelLogs').doc(id).update(validatedFields.data);
        await logActivity('Updated Fuel Log', { type: 'Fuel Log', id });
        revalidatePath('/dashboard/fuel-logs');
        revalidatePath(`/dashboard/fuel-logs/${id}/edit`);
        return { message: 'Fuel log updated successfully.' };
    } catch (e: any) {
        console.error('Error updating fuel log:', e);
        return { message: 'Error: Failed to update fuel log.' };
    }
}

export async function deleteFuelLog(id: string): Promise<FormState> {
    try {
        const docRef = db.collection('fuelLogs').doc(id);
        const doc = await docRef.get();

        if (!doc.exists) {
            return { message: 'Error: Fuel log not found.' };
        }

        await docRef.delete();
        await logActivity('Deleted Fuel Log', { type: 'Fuel Log', id });

        revalidatePath('/dashboard/fuel-logs');
        return { message: 'Fuel log deleted successfully.' };
    } catch (e: any) {
        console.error('Error deleting fuel log:', e);
        return { message: 'Error: Failed to delete fuel log.' };
    }
}
