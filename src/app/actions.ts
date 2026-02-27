'use server';

import { adminAuth } from "@/lib/firebase/admin-sdk";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function createSession(idToken: string) {
  try {
    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
    const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });
    cookies().set("session", sessionCookie, { maxAge: expiresIn, httpOnly: true, secure: true });

    return { success: true };
  } catch (error) {
    console.error("Failed to create session:", error);
    return { error: "Failed to create session." };
  }
}

export async function signOut() {
  cookies().delete("session");
  redirect("/");
}

// NOTE: This server action is a placeholder and is not intended for real authentication.
// The actual sign-in logic should be handled on the client-side using the Firebase SDK.
export async function signInWithEmail(prevState: { error?: string }, formData: FormData): Promise<{ error: string }> {
  console.log("signInWithEmail action called with formData:", formData);
  return { error: "Email/password sign-in is not implemented on the server. Use client-side Firebase authentication." };
}
