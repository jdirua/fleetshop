
'use server';

import { updateUser } from '@/lib/actions/users';
import { UserRole } from '@/lib/auth/roles';

export async function updateUserRole(uid: string, newRole: UserRole) {
  try {
    await updateUser(uid, { role: newRole });
    return { success: true };
  } catch (error) {
    let message = 'An unknown error occurred';
    if (error instanceof Error) {
      message = error.message;
    }
    return { success: false, error: message };
  }
}
