import { cache } from "react";
import { cookies } from "next/headers";
import { adminAuth } from "@/lib/firebase/admin-sdk";
import { User } from "@/lib/types/user";
import { ROLES, UserRole } from "@/lib/auth/roles";

const isUserRole = (role: string): role is UserRole => {
  return ROLES.includes(role as UserRole);
};

export const getCurrentUser = cache(async (): Promise<User | null> => {
  const cookieStore = await cookies();
  const session = cookieStore.get("session");
  if (!session) return null;

  try {
    const decodedIdToken = await adminAuth.verifySessionCookie(session.value, true);
    const firebaseUser = await adminAuth.getUser(decodedIdToken.uid);

    const customClaims = (firebaseUser.customClaims || { role: 'viewer' }) as { role: string };

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
    console.error("Error getting current user:", error);
    return null;
  }
});
