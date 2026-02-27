
'use server';

import { db } from '@/lib/firebase/server';
import { User } from '@/lib/types/user';
import { revalidatePath } from 'next/cache';

export async function getUserById(id: string): Promise<User> {
    const doc = await db.collection('users').doc(id).get();
    if (!doc.exists) {
        throw new Error('User not found');
    }
    return { id: doc.id, ...doc.data() } as User;
}

export async function updateUser(id: string, data: Partial<User>): Promise<void> {
    await db.collection('users').doc(id).update(data);
    revalidatePath('/dashboard/users');
    revalidatePath(`/dashboard/users/${id}/edit`);
}

export async function getUsers(): Promise<User[]> {
    const snapshot = await db.collection('users').get();
    if (snapshot.empty) {
        return [];
    }
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as User));
}

export async function deleteUser(id: string): Promise<void> {
    await db.collection('users').doc(id).delete();
    revalidatePath('/dashboard/users');
}

export async function createUser(data: Omit<User, 'id'>): Promise<User> {
    const docRef = await db.collection('users').add(data);
    revalidatePath('/dashboard/users');
    return { id: docRef.id, ...data };
}
