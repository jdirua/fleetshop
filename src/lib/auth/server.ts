import { auth } from "@/lib/firebase/admin-sdk";
import { cookies } from "next/headers";
import { User } from "./types";

export async function getUser(): Promise<{ user: User | null }> {
  const sessionCookie = cookies().get("session")?.value;

  if (!sessionCookie) {
    return { user: null };
  }

  try {
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
    // You might want to fetch additional user details from your database here
    return { user: { uid: decodedClaims.uid, email: decodedClaims.email, role: 'admin' } };
  } catch (error) {
    // Session cookie is invalid or expired.
    return { user: null };
  }
}
