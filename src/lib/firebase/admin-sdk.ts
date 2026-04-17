import * as admin from 'firebase-admin';
import { User } from "@/lib/types/user";
import { ROLES, UserRole } from "@/lib/auth/roles";

// Import the fresh service account key (place serviceAccountKey.json in project root)
import serviceAccountJson from '../../../serviceAccountKey.json' assert { type: 'json' };

const serviceAccount = serviceAccountJson as admin.ServiceAccount;

const isUserRole = (role: string): role is UserRole => {
  return ROLES.includes(role as UserRole);
};

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: `https://${serviceAccount.projectId}.firebaseio.com`,
      storageBucket: `${serviceAccount.projectId}.appspot.com`
    });

    console.log(`✅ Firebase Admin SDK initialized successfully (project: ${serviceAccount.projectId})`);
  } catch (error: unknown) {
    if (error instanceof Error) {
        console.error('❌ Firebase Admin SDK initialization FAILED:', error.message);
    }
    throw error;
  }
}

export const adminAuth = admin.auth();
export const db = admin.firestore();
export const storage = admin.storage();

export async function getUser(uid: string): Promise<User | null> {
  try {
    const firebaseUser = await adminAuth.getUser(uid);
    const customClaims = (firebaseUser.customClaims || { role: "user" }) as { role: string };

    let role: UserRole = 'viewer'; // Default role
    if (isUserRole(customClaims.role)) {
      role = customClaims.role;
    }

    return {
      uid: firebaseUser.uid,
      email: firebaseUser.email || null,
      displayName: firebaseUser.displayName || null,
      photoURL: firebaseUser.photoURL || null,
      role: role,
      disabled: firebaseUser.disabled,
    };
  } catch (error) {
    console.error(`Error getting user ${uid}:`, error);
    return null;
  }
}
