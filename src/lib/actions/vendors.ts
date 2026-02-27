
'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { db } from '@/lib/firebase/admin-sdk';
import { Vendor } from '@/lib/types';
import { logActivity } from './activityLogs';

const VendorSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Vendor name is required'),
  contactName: z.string().optional(),
  contactEmail: z.string().email('Invalid email address').optional().or(z.literal('')),
  contactPhone: z.string().optional(),
  createdAt: z.string(),
});

const CreateVendorSchema = VendorSchema.omit({ id: true, createdAt: true });

export async function createVendor(formData: FormData) {
  const validatedFields = CreateVendorSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  try {
    const newVendorData = validatedFields.data;
    const docRef = await db.collection('vendors').add({
      ...newVendorData,
      createdAt: new Date().toISOString(),
    });

    await logActivity('Created Vendor', { type: 'vendor', id: docRef.id });

    revalidatePath('/dashboard/vendors');
    return { message: 'Vendor created successfully', vendorId: docRef.id };

  } catch (error) {
    console.error('Error creating vendor:', error);
    return { errors: { _form: ['An unexpected error occurred.'] } };
  }
}

export async function getVendors() {
  try {
    const snapshot = await db.collection('vendors').get();
    if (snapshot.empty) {
      return [];
    }
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Vendor[];
  } catch (error) {
    console.error('Error fetching vendors:', error);
    throw new Error('Could not fetch vendors.');
  }
}

export async function getVendor(id: string): Promise<Vendor | null> {
  try {
    const doc = await db.collection('vendors').doc(id).get();
    if (!doc.exists) {
      return null;
    }
    return { id: doc.id, ...doc.data() } as Vendor;
  } catch (error) {
    console.error('Error fetching vendor:', error);
    throw new Error('Could not fetch vendor.');
  }
}

export async function updateVendor(id: string, formData: FormData) {
  const validatedFields = CreateVendorSchema.partial().safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  try {
    await db.collection('vendors').doc(id).update(validatedFields.data);
    await logActivity('Updated Vendor', { type: 'vendor', id });
    revalidatePath('/dashboard/vendors');
    revalidatePath(`/dashboard/vendors/${id}/edit`);
    return { message: 'Vendor updated successfully' };

  } catch (error) {
    console.error('Error updating vendor:', error);
    return { errors: { _form: ['An unexpected error occurred.'] } };
  }
}

export async function deleteVendor(id: string) {
  try {
    await db.collection('vendors').doc(id).delete();
    await logActivity('Deleted Vendor', { type: 'vendor', id });
    revalidatePath('/dashboard/vendors');
    return { message: 'Vendor deleted successfully' };

  } catch (error) {
    console.error('Error deleting vendor:', error);
    return { errors: { _form: ['An unexpected error occurred.'] } };
  }
}
