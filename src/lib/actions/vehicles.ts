'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { db } from '@/lib/firebase/admin-sdk';
import { Vehicle } from '@/lib/types/vehicle';
import { logActivity } from './activityLogs';

// Define the shape of the state object that will be managed by useFormState.
export interface VehicleFormState {
  errors?: {
    registration?: string[];
    vin?: string[];
    make?: string[];
    model?: string[];
    year?: string[];
    status?: string[];
    currentOdometer?: string[];
    serviceDate?: string[];
    assignedDriverId?: string[];
    notes?: string[];
    _form?: string[]; // For form-level errors
  };
  message?: string | null;
  vehicleId?: string;
}

// Zod schema for vehicle validation, representing the full data model.
const VehicleSchema = z.object({
  id: z.string(),
  registration: z.string().min(1, 'Registration is required'),
  vin: z.string().min(1, 'VIN is required'),
  make: z.string().min(1, 'Make is required'),
  model: z.string().min(1, 'Model is required'),
  year: z.number().min(1900, 'Invalid year'),
  status: z.enum(['active', 'in-shop', 'decommissioned']),
  currentOdometer: z.number().min(0, 'Odometer cannot be negative'),
  serviceDate: z.string().optional(),
  assignedDriverId: z.string().optional(),
  notes: z.string().optional(),
  createdAt: z.string(),
});

// This schema is for creating a new vehicle. It omits server-generated fields.
const CreateVehicleSchema = VehicleSchema.omit({ id: true, createdAt: true });

// --- Server Action to Create a Vehicle ---
export async function createVehicle(prevState: VehicleFormState, formData: FormData): Promise<VehicleFormState> {
  const validatedFields = CreateVehicleSchema.safeParse({
    ...Object.fromEntries(formData.entries()),
    // Coerce number fields from string form data
    year: parseInt(formData.get('year') as string, 10),
    currentOdometer: parseInt(formData.get('currentOdometer') as string, 10),
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  try {
    const newVehicleData = validatedFields.data;
    const docRef = await db.collection('vehicles').add({
      ...newVehicleData,
      createdAt: new Date().toISOString(),
    });

    await logActivity('Created Vehicle', { type: 'vehicle', id: docRef.id });

    revalidatePath('/dashboard/vehicles');
    return { message: 'Vehicle created successfully', vehicleId: docRef.id };

  } catch (error) {
    console.error('Error creating vehicle:', error);
    return { errors: { _form: ['An unexpected error occurred.'] } };
  }
}

// --- Server Action to Get All Vehicles ---
export async function getVehicles() {
  try {
    const snapshot = await db.collection('vehicles').get();
    if (snapshot.empty) {
      return [];
    }
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Vehicle[];
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    throw new Error('Could not fetch vehicles.');
  }
}

// --- Server Action to Get a Single Vehicle by ID ---
export async function getVehicle(id: string): Promise<Vehicle | null> {
  try {
    const doc = await db.collection('vehicles').doc(id).get();
    if (!doc.exists) {
      console.warn(`Vehicle with ID "${id}" not found.`);
      return null;
    }
    return { id: doc.id, ...doc.data() } as Vehicle;
  } catch (error) {
    console.error(`Error fetching vehicle with ID "${id}":`, error);
    throw new Error('Could not fetch vehicle.');
  }
}

// --- Server Action to Update a Vehicle ---
export async function updateVehicle(id: string, prevState: VehicleFormState, formData: FormData): Promise<VehicleFormState> {
  // For updates, we use a partial schema since not all fields may be submitted.
  const validatedFields = CreateVehicleSchema.partial().safeParse({
    ...Object.fromEntries(formData.entries()),
    year: formData.has('year') ? parseInt(formData.get('year') as string, 10) : undefined,
    currentOdometer: formData.has('currentOdometer') ? parseInt(formData.get('currentOdometer') as string, 10) : undefined,
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  try {
    await db.collection('vehicles').doc(id).update(validatedFields.data);
    await logActivity('Updated Vehicle', { type: 'vehicle', id });

    revalidatePath('/dashboard/vehicles');
    revalidatePath(`/dashboard/vehicles/${id}/edit`); // Revalidate the edit page
    return { message: 'Vehicle updated successfully' };

  } catch (error) {
    console.error('Error updating vehicle:', error);
    return { errors: { _form: ['An unexpected error occurred.'] } };
  }
}

// --- Server Action to Delete a Vehicle ---
export async function deleteVehicle(id: string) {
  try {
    await db.collection('vehicles').doc(id).delete();
    await logActivity('Deleted Vehicle', { type: 'vehicle', id });

    revalidatePath('/dashboard/vehicles');
    return { message: 'Vehicle deleted successfully' };

  } catch (error) {
    console.error('Error deleting vehicle:', error);
    return { errors: { _form: ['An unexpected error occurred.'] } };
  }
}
