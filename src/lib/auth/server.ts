
import { cache } from "react";
import { cookies } from "next/headers";
import { adminAuth } from "@/lib/firebase/admin-sdk";
import { User } from "@/lib/types/user";
import { ROLES } from "@/lib/auth/roles";

export const getCurrentUser = cache(async (): Promise<User | null> => {
  const cookieStore = await cookies();
  const session = cookieStore.get("session");
  if (!session) return null;

  try {
    const decodedIdToken = await adminAuth.verifySessionCookie(session.value, true);
    const firebaseUser = await adminAuth.getUser(decodedIdToken.uid);

    const customClaims = (firebaseUser.customClaims || { role: ROLES.READONLY }) as { role: string };

    return {
      uid: firebaseUser.uid,
      email: firebaseUser.email || null,
      displayName: firebaseUser.displayName || null,
      photoURL: firebaseUser.photoURL || null,
      role: customClaims.role,
      disabled: firebaseUser.disabled,
    };
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
});
