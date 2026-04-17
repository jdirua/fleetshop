'use server';

import { adminAuth } from '@/lib/firebase/admin-sdk';
import { User } from '@/lib/types/user';

export async function getAllUsers(pageToken?: string, pageSize: number = 20): Promise<{ users: User[], nextPageToken?: string }> {
  const users: User[] = [];
  const listUsersResult = await adminAuth.listUsers(pageSize, pageToken);
  
  listUsersResult.users.forEach(userRecord => {
    users.push({
      uid: userRecord.uid,
      email: userRecord.email || '',
      displayName: userRecord.displayName || '',
      role: userRecord.customClaims?.role || 'user',
      disabled: userRecord.disabled,
    });
  });

  return {
    users,
    nextPageToken: listUsersResult.pageToken,
  };
}

export async function updateUserRole(uid: string, role: string) {
  await adminAuth.setCustomUserClaims(uid, { role });
}

export const updateUser = async (uid: string, data: Partial<User>) => {
  try {
    const { displayName, role } = data;
    await adminAuth.updateUser(uid, { displayName });
    if (role) {
      await updateUserRole(uid, role);
    }
    return { success: true };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
};

export const createUser = async (data: Omit<User, 'uid'>, password: string) => {
  const { displayName, email, role } = data;
  if (!email) {
    throw new Error('Email is required to create a new user.');
  }
  const userRecord = await adminAuth.createUser({
    displayName,
    email,
    password,
  });
  if (role) {
    await updateUserRole(userRecord.uid, role);
  }
  return userRecord;
};

export const getUserById = async (uid: string): Promise<User | null> => {
    try {
        const userRecord = await adminAuth.getUser(uid);
        return {
            uid: userRecord.uid,
            email: userRecord.email || '',
            displayName: userRecord.displayName || '',
            role: userRecord.customClaims?.role || 'user',
            disabled: userRecord.disabled,
        };
    } catch (error) {
        console.error("Error fetching user:", error);
        return null;
    }
};
