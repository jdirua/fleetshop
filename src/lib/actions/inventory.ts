
'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { db } from '@/lib/firebase/admin-sdk';
import { InventoryItem } from '@/lib/types/inventory';
import { logActivity } from './activityLogs';

// Zod schema for inventory item validation
const InventorySchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Item name is required'),
  quantity: z.number().min(0, 'Quantity cannot be negative'),
  cost: z.number().min(0, 'Cost cannot be negative'),
  reorderPoint: z.number().min(0, 'Reorder point cannot be negative').optional(),
  supplier: z.string().optional(),
  location: z.string().optional(),
  lastRestocked: z.string(), // Stored as ISO string
  createdAt: z.string(),
});

const CreateInventorySchema = InventorySchema.omit({ id: true, createdAt: true, lastRestocked: true });

export async function updateInventoryItem(itemId: string, data: Partial<InventoryItem>) {
  try {
    const itemRef = db.collection('inventory').doc(itemId);
    await itemRef.update(data);
    await logActivity('Updated Inventory Item', { type: 'inventory', id: itemId });
    revalidatePath('/dashboard/inventory');
    revalidatePath(`/dashboard/inventory/${itemId}`);
  } catch (error) {
    console.error(`Error updating inventory item with ID "${itemId}":`, error);
    throw new Error('Could not update inventory item.');
  }
}

// --- Server Action to Get All Inventory Items (Paginated) ---
export async function getInventory({ page = 1, limit = 12 }: { page?: number; limit?: number } = {}): Promise<{ data: InventoryItem[], totalPages: number }> {
  try {
    const inventoryRef = db.collection('inventory');
    const snapshot = await inventoryRef.get();
    const totalItems = snapshot.size;
    const totalPages = Math.ceil(totalItems / limit);
    const offset = (page - 1) * limit;

    const inventorySnapshot = await inventoryRef.orderBy('name').limit(limit).offset(offset).get();
    if (inventorySnapshot.empty) {
      return { data: [], totalPages: 0 };
    }
    
    const data = inventorySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
            id: doc.id,
            ...data,
            // Ensure date fields are correctly formatted if needed, firestore returns Timestamps
            lastRestocked: data.lastRestocked?.toDate ? data.lastRestocked.toDate().toISOString() : new Date().toISOString(),
            createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : new Date().toISOString(),
        } as InventoryItem;
    });

    return { data, totalPages };
  } catch (error) {
    console.error('Error fetching inventory:', error);
    throw new Error('Could not fetch inventory.');
  }
}

// --- Server Action to Get a Single Inventory Item by ID ---
export async function getInventoryItem(id: string): Promise<InventoryItem | null> {
  try {
    const doc = await db.collection('inventory').doc(id).get();
    if (!doc.exists) {
      return null;
    }
    const data = doc.data()!;
    return {
        id: doc.id,
        ...data,
        lastRestocked: data.lastRestocked?.toDate ? data.lastRestocked.toDate().toISOString() : new Date().toISOString(),
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : new Date().toISOString(),
    } as InventoryItem;
  } catch (error) {
    console.error(`Error fetching inventory item with ID "${id}":`, error);
    throw new Error('Could not fetch inventory item.');
  }
}

export async function deleteInventoryItem(itemId: string) {
    try {
        await db.collection('inventory').doc(itemId).delete();
        await logActivity('Deleted Inventory Item', { type: 'inventory', id: itemId });
        revalidatePath('/dashboard/inventory');
    } catch (error) {
        console.error(`Error deleting inventory item with ID "${itemId}":`, error);
        throw new Error('Could not delete inventory item.');
    }
}

// Form state for creating/editing items
export interface InventoryFormState {
  errors?: {
    name?: string[];
    quantity?: string[];
    cost?: string[];
    reorderPoint?: string[];
    supplier?: string[];
    location?: string[];
    _form?: string[];
  };
  message?: string | null;
}

// --- Server Action to Create an Inventory Item ---
export async function createInventoryItem(prevState: InventoryFormState, formData: FormData): Promise<InventoryFormState> {
    const validatedFields = CreateInventorySchema.safeParse({
        ...Object.fromEntries(formData.entries()),
        quantity: parseInt(formData.get('quantity') as string, 10),
        cost: parseFloat(formData.get('cost') as string),
        reorderPoint: formData.has('reorderPoint') ? parseInt(formData.get('reorderPoint') as string, 10) : undefined,
    });

    if (!validatedFields.success) {
        return { errors: validatedFields.error.flatten().fieldErrors };
    }

    try {
        const newInventoryData = {
            ...validatedFields.data,
            lastRestocked: new Date().toISOString(),
            createdAt: new Date().toISOString(),
        };
        const docRef = await db.collection('inventory').add(newInventoryData);

        await logActivity('Created Inventory Item', { type: 'inventory', id: docRef.id });
        revalidatePath('/dashboard/inventory');
        return { message: 'Item created successfully' };
    } catch (error) {
        console.error('Error creating inventory item:', error);
        return { errors: { _form: ['An unexpected error occurred.'] } };
    }
}
