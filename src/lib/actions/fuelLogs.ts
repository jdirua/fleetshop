
'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { db } from '@/lib/firebase/admin-sdk';
import { FuelLog } from '@/lib/types';
import { logActivity } from './activityLogs';
import { FuelLogFormState } from '@/lib/actions/fuelLogs';
import { FirebaseError } from 'firebase-admin/app';

const FuelLogSchema = z.object({
  vehicleId: z.string({
    invalid_type_error: 'Please select a vehicle.',
  }).min(1, 'Vehicle is required'),
  date: z.string().min(1, 'Date is required'),
  gallons: z.coerce.number().min(0.01, 'Gallons must be greater than 0'),
  totalCost: z.coerce.number().min(0.01, 'Total cost must be greater than 0'),
  odometer: z.coerce.number().min(1, 'Odometer reading is required'),
});

export async function getFuelLogs({ page = 1, limit = 10 }: { page?: number; limit?: number } = {}) {
    try {
        const fuelLogsRef = db.collection('fuelLogs');
        const snapshot = await fuelLogsRef.get();
        const totalFuelLogs = snapshot.size;
        const totalPages = Math.ceil(totalFuelLogs / limit);
        const offset = (page - 1) * limit;

        const fuelLogsSnapshot = await fuelLogsRef.orderBy('date', 'desc').limit(limit).offset(offset).get();
        if (fuelLogsSnapshot.empty) {
            return { fuelLogs: [], totalPages: 0 };
        }
        const fuelLogs = fuelLogsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as FuelLog[];
        return { fuelLogs, totalPages };
    } catch (error) {
        console.error('Error fetching fuel logs:', error);
        throw new Error('Could not fetch fuel logs.');
    }
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

export async function createFuelLog(prevState: FuelLogFormState, formData: FormData): Promise<FuelLogFormState> {
  const validatedFields = FuelLogSchema.safeParse({
    vehicleId: formData.get('vehicleId'),
    date: formData.get('date'),
    gallons: formData.get('gallons'),
    totalCost: formData.get('totalCost'),
    odometer: formData.get('odometer'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Validation Error: Please check your input.',
      success: false,
    };
  }

  try {
    const newLogRef = await db.collection('fuelLogs').add(validatedFields.data);
    await logActivity('Created Fuel Log', { type: 'Fuel Log', id: newLogRef.id });
    revalidatePath('/dashboard/fuel-logs');
    return { message: 'Fuel log created successfully.', success: true, errors: {} };
  } catch (e: unknown) {
    console.error('Error creating fuel log:', e);
    if (e instanceof FirebaseError) {
        return { message: `Error: Failed to create fuel log: ${e.message}`, success: false, errors: {} };
    }
    return { message: 'Error: An unknown error occurred while creating the fuel log.', success: false, errors: {} };
  }
}

export async function updateFuelLog(id: string, prevState: FuelLogFormState, formData: FormData): Promise<FuelLogFormState> {
    const validatedFields = FuelLogSchema.safeParse({
        vehicleId: formData.get('vehicleId'),
        date: formData.get('date'),
        gallons: formData.get('gallons'),
        totalCost: formData.get('totalCost'),
        odometer: formData.get('odometer'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Validation Error: Please check your input.',
            success: false,
        };
    }

    try {
        await db.collection('fuelLogs').doc(id).update(validatedFields.data);
        await logActivity('Updated Fuel Log', { type: 'Fuel Log', id });
        revalidatePath('/dashboard/fuel-logs');
        revalidatePath(`/dashboard/fuel-logs/${id}/edit`);
        return { message: 'Fuel log updated successfully.', success: true, errors: {} };
    } catch (e: unknown) {
        console.error('Error updating fuel log:', e);
        if (e instanceof FirebaseError) {
            return { message: `Error: Failed to update fuel log: ${e.message}`, success: false, errors: {} };
        }
        return { message: 'Error: An unknown error occurred while updating the fuel log.', success: false, errors: {} };
    }
}

export async function deleteFuelLog(id: string): Promise<FuelLogFormState> {
    try {
        const docRef = db.collection('fuelLogs').doc(id);
        const doc = await docRef.get();

        if (!doc.exists) {
            return { message: 'Error: Fuel log not found.', success: false, errors: {} };
        }

        await docRef.delete();
        await logActivity('Deleted Fuel Log', { type: 'Fuel Log', id });

        revalidatePath('/dashboard/fuel-logs');
        return { message: 'Fuel log deleted successfully.', success: true, errors: {} };
    } catch (e: unknown) {
        console.error('Error deleting fuel log:', e);
        if (e instanceof FirebaseError) {
            return { message: `Error: Failed to delete fuel log: ${e.message}`, success: false, errors: {} };
        }
        return { message: 'Error: An unknown error occurred while deleting the fuel log.', success: false, errors: {} };
    }
}

export type { FuelLogFormState };
