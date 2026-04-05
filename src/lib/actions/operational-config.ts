
'use server';

import { revalidatePath } from 'next/cache';
import { db } from '@/lib/firebase/admin-sdk';
import { FieldValue } from 'firebase-admin/firestore';

const CONFIG_COLLECTION = 'operational-config';
const CONFIG_DOC_ID = 'config';

// --- Thresholds ---
export async function updateLowInventoryThreshold(threshold: number) {
  try {
    await db.collection(CONFIG_COLLECTION).doc(CONFIG_DOC_ID).set({ lowInventoryThreshold: threshold }, { merge: true });
    revalidatePath('/dashboard/settings/operational');
    return { message: 'Low inventory threshold updated successfully.' };
  } catch (error) {
    console.error('Error updating low inventory threshold:', error);
    return { error: 'Could not update threshold.' };
  }
}

// --- Service Types ---
export async function addServiceType(serviceType: string) {
  try {
    await db.collection(CONFIG_COLLECTION).doc(CONFIG_DOC_ID).update({
      serviceTypes: FieldValue.arrayUnion(serviceType)
    });
    revalidatePath('/dashboard/settings/operational');
    return { message: 'Service type added successfully.' };
  } catch (error) {
    console.error('Error adding service type:', error);
    return { error: 'Could not add service type.' };
  }
}

export async function deleteServiceType(serviceType: string) {
  try {
    await db.collection(CONFIG_COLLECTION).doc(CONFIG_DOC_ID).update({
      serviceTypes: FieldValue.arrayRemove(serviceType)
    });
    revalidatePath('/dashboard/settings/operational');
    return { message: 'Service type deleted successfully.' };
  } catch (error) {
    console.error('Error deleting service type:', error);
    return { error: 'Could not delete service type.' };
  }
}

// --- Part Categories ---
export async function addPartCategory(category: string) {
  try {
    await db.collection(CONFIG_COLLECTION).doc(CONFIG_DOC_ID).update({
      partCategories: FieldValue.arrayUnion(category)
    });
    revalidatePath('/dashboard/settings/operational');
    return { message: 'Part category added successfully.' };
  } catch (error) {
    console.error('Error adding part category:', error);
    return { error: 'Could not add part category.' };
  }
}

export async function deletePartCategory(category: string) {
  try {
    await db.collection(CONFIG_COLLECTION).doc(CONFIG_DOC_ID).update({
      partCategories: FieldValue.arrayRemove(category)
    });
    revalidatePath('/dashboard/settings/operational');
    return { message: 'Part category deleted successfully.' };
  } catch (error) {
    console.error('Error deleting part category:', error);
    return { error: 'Could not delete part category.' };
  }
}

// --- Get all operational config data ---
export async function getOperationalConfig() {
    try {
        const doc = await db.collection(CONFIG_COLLECTION).doc(CONFIG_DOC_ID).get();
        if (!doc.exists) {
            return {
                lowInventoryThreshold: 10, // Default value
                serviceTypes: [],
                partCategories: [],
            };
        }
        return doc.data();
    } catch (error) {
        console.error('Error fetching operational config:', error);
        throw new Error('Could not fetch operational configuration.');
    }
}
