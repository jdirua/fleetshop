'use server';

import { z } from 'zod';
import { db } from '@/lib/firebase/admin-sdk';
import { revalidatePath } from 'next/cache';

// Zod schema for validating role data
const rolePermissionSchema = z.object({
    viewDashboard: z.boolean(),
    manageUsers: z.boolean(),
    editSettings: z.boolean(),
    vendors: z.boolean(),
    fuelLogs: z.boolean(),
    maintenance: z.boolean(),
    reporting: z.boolean(),
});

const roleSchema = z.object({
    name: z.string().min(2, 'Role name must be at least 2 characters long.'),
    permissions: rolePermissionSchema,
});

export interface CreateRoleState {
    errors?: {
        name?: string[];
        permissions?: string[];
    };
    message?: string;
    status?: 'success' | 'error';
}

interface Role {
  name: string;
  permissions: {
    viewDashboard: boolean;
    manageUsers: boolean;
    editSettings: boolean;
    vendors: boolean;
    fuelLogs: boolean;
    maintenance: boolean;
    reporting: boolean;
  };
}

export async function createRole(prevState: CreateRoleState, formData: FormData): Promise<CreateRoleState> {
    let parsedPermissions;
    try {
        parsedPermissions = JSON.parse(formData.get('permissions') as string);
    } catch {
        return {
            errors: { permissions: ['Invalid permission format.'] },
            message: 'Failed to parse permissions.',
            status: 'error',
        };
    }

    const validatedFields = roleSchema.safeParse({
        name: formData.get('name'),
        permissions: parsedPermissions,
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Validation failed. Please check the fields.',
            status: 'error',
        };
    }

    try {
        const roleRef = db.collection('roles').doc(validatedFields.data.name.toLowerCase());
        const roleDoc = await roleRef.get();

        if (roleDoc.exists) {
            return { message: 'Role with this name already exists.', status: 'error' };
        }

        await roleRef.set(validatedFields.data);
        revalidatePath('/dashboard/settings/users');
        return { message: 'Role created successfully!', status: 'success' };
    } catch (e) {
        console.error('Failed to create role:', e);
        return { message: 'A server error occurred. Failed to create role.', status: 'error' };
    }
}

export async function getRoles(): Promise<Role[]> {
    try {
        const rolesSnapshot = await db.collection('roles').get();
        const roles = rolesSnapshot.docs.map(doc => doc.data() as Role);
        return roles;
    } catch (error) {
        console.error('Failed to fetch roles:', error);
        return [];
    }
}
