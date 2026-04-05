'use server';

import { auth } from '@/lib/firebase/admin-sdk'; // Corrected import
import { User } from '@/lib/types/user';

export async function getAllUsers(): Promise<User[]> {
  const users: User[] = [];
  const listUsersResult = await auth.listUsers();
  listUsersResult.users.forEach(userRecord => {
    users.push({
      uid: userRecord.uid,
      email: userRecord.email || '',
      displayName: userRecord.displayName || '',
      role: userRecord.customClaims?.role || 'user',
      disabled: userRecord.disabled,
    });
  });
  return users;
}

export async function updateUserRole(uid: string, role: string) {
  await auth.setCustomUserClaims(uid, { role });
}

export const updateUser = async (uid: string, data: Partial<User>) => {
  const { displayName, role } = data;
  await auth.updateUser(uid, { displayName });
  if (role) {
    await updateUserRole(uid, role);
  }
};