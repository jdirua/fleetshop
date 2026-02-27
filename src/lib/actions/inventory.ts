
'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { db } from '@/lib/firebase/admin-sdk';
import { InventoryItem, FormState } from '@/lib/types/inventory';
import { logActivity } from './activityLogs';

const InventoryItemSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Item name is required'),
  quantity: z.coerce.number().min(0, 'Quantity cannot be negative'),
  cost: z.coerce.number().min(0, 'Cost cannot be negative'),
  supplier: z.string().optional(),
  location: z.string().optional(),
  reorderPoint: z.coerce.number().min(0, 'Reorder point cannot be negative').optional(),
  createdAt: z.string(),
});

const CreateInventoryItemSchema = InventoryItemSchema.omit({ id: true, createdAt: true });

export async function createInventoryItem(prevState: FormState, formData: FormData): Promise<FormState> {
  const validatedFields = CreateInventoryItemSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return { 
        errors: validatedFields.error.flatten().fieldErrors, 
        message: 'Validation failed', 
    };
  }

  try {
    const newItemData = validatedFields.data;
    const docRef = await db.collection('inventory').add({
      ...newItemData,
      createdAt: new Date().toISOString(),
    });
    
    const newItem = {
        id: docRef.id,
        ...newItemData,
        createdAt: new Date().toISOString(),
    } as InventoryItem;

    await logActivity('Created Inventory Item', { type: 'inventory', id: docRef.id });

    revalidatePath('/dashboard/inventory');
    return { 
        message: 'Inventory item created successfully', 
    };

  } catch (error) {
    console.error('Error creating inventory item:', error);
    return { 
        errors: { _form: ['An unexpected error occurred.'] }, 
        message: 'An unexpected error occurred', 
    };
  }
}

export async function getInventoryItems(): Promise<InventoryItem[]> {
  try {
    const snapshot = await db.collection('inventory').get();
    if (snapshot.empty) {
      return [];
    }
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as InventoryItem[];
  } catch (error) {
    console.error('Error fetching inventory items:', error);
    throw new Error('Could not fetch inventory items.');
  }
}

export async function getInventoryItem(id: string): Promise<InventoryItem | null> {
  try {
    const doc = await db.collection('inventory').doc(id).get();
    if (!doc.exists) {
      return null;
    }
    return { id: doc.id, ...doc.data() } as InventoryItem;
  } catch (error) {
    console.error('Error fetching inventory item:', error);
    throw new Error('Could not fetch inventory item.');
  }
}

export async function updateInventoryItem(id: string, prevState: FormState, formData: FormData): Promise<FormState> {
  const validatedFields = CreateInventoryItemSchema.partial().safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return { 
        errors: validatedFields.error.flatten().fieldErrors, 
        message: 'Validation failed', 
    };
  }

  try {
    await db.collection('inventory').doc(id).update(validatedFields.data);
    await logActivity('Updated Inventory Item', { type: 'inventory', id });
    revalidatePath('/dashboard/inventory');
    revalidatePath(`/dashboard/inventory/${id}/edit`);
    return { 
        message: 'Inventory item updated successfully', 
     };

  } catch (error) {
    console.error('Error updating inventory item:', error);
    return { 
        errors: { _form: ['An unexpected error occurred.'] }, 
        message: 'An unexpected error occurred', 
    };
  }
}

export async function deleteInventoryItem(id: string) {
  try {
    await db.collection('inventory').doc(id).delete();
    await logActivity('Deleted Inventory Item', { type: 'inventory', id });
    revalidatePath('/dashboard/inventory');
    return { message: 'Inventory item deleted successfully' };

  } catch (error) {
    console.error('Error deleting inventory item:', error);
    return { errors: { _form: ['An unexpected error occurred.'] } };
  }
}
