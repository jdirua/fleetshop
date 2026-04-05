'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { db } from '@/lib/firebase/admin-sdk';
import { Vendor } from '@/lib/types/vendor';
import { logActivity } from './activityLogs';


const VendorSchema = z.object({
    name: z.string().min(1, 'Vendor name is required'),
    contactName: z.string().optional(),
    contactEmail: z.string().email({ message: "Invalid email address" }).optional().or(z.literal('')),
    contactPhone: z.string().optional(),
});

export async function updateVendor(id: string, data: Partial<Vendor>) {
  try {
    await db.collection('vendors').doc(id).update(data);
    await logActivity('Updated Vendor', { type: 'vendor', id });
    revalidatePath('/dashboard/vendors');
  } catch (error) {
    console.error("Error updating vendor:", error);
    throw new Error("Could not update vendor.");
  }
}

export async function createVendor(prevState: { errors?: Record<string, string[]>; message?: string; }, formData: FormData) {
    const validatedFields = VendorSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
        return {
            success: false,
            message: "Validation failed. Please check the form and try again.",
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    try {
        const newVendorData = validatedFields.data;
        const docRef = await db.collection('vendors').add({
            ...newVendorData,
            createdAt: new Date().toISOString(),
        });

        await logActivity('Created Vendor', { type: 'vendor', id: docRef.id });

        revalidatePath('/dashboard/vendors');
        return {
            success: true,
            message: 'Vendor created successfully',
            vendorId: docRef.id
        };

    } catch (error) {
        console.error('Error creating vendor:', error);
        return {
            success: false,
            message: 'An unexpected error occurred while creating the vendor.',
        };
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
    console.error("Error fetching vendor:", error);
    return null;
  }
}

export async function getVendors({ page = 1, limit = 10 }: { page: number, limit: number }): Promise<{ data: Vendor[], totalPages: number }> {
    const snapshot = await db.collection('vendors').get();
    const vendors = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Vendor[];
    const totalPages = Math.ceil(vendors.length / limit);
    const paginatedVendors = vendors.slice((page - 1) * limit, page * limit);

    return {
        data: paginatedVendors,
        totalPages
    };
}
