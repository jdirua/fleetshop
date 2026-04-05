
'use server';

import { adminAuth as auth } from "@/lib/firebase/admin-sdk";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { ROLES } from "@/lib/auth/roles";
import { FirebaseError } from 'firebase-admin/app';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const rolesArray = Object.values(ROLES) as [string, ...string[]];

const CreateUserSchema = z.object({
  email: z.string().email(),
  displayName: z.string().min(2),
  role: z.enum(rolesArray).optional(),
});

export async function createUser(data: z.infer<typeof CreateUserSchema>) {
  try {
    const validatedData = CreateUserSchema.parse(data);

    const userRecord = await auth.createUser({
      email: validatedData.email,
      displayName: validatedData.displayName,
      password: Math.random().toString(36).slice(-8),
    });

    if (validatedData.role) {
      await auth.setCustomUserClaims(userRecord.uid, { role: validatedData.role });
    }

    revalidatePath("/dashboard/users");
    return { success: true };

  } catch (error: unknown) {
    const err = error as FirebaseError;
    return { success: false, error: err.message };
  }
}

const UpdateUserSchema = z.object({
  displayName: z.string().min(2).optional(),
  email: z.string().email().optional(),
  role: z.enum(rolesArray).optional(),
});

export async function updateUser(uid: string, data: z.infer<typeof UpdateUserSchema>) {
  try {
    const validatedData = UpdateUserSchema.parse(data);

    await auth.updateUser(uid, {
      displayName: validatedData.displayName,
      email: validatedData.email,
    });

    if (validatedData.role) {
      await auth.setCustomUserClaims(uid, { role: validatedData.role });
    }

    revalidatePath(`/dashboard/users`);
    revalidatePath(`/dashboard/users/${uid}`);
    return { success: true };
  } catch (error: unknown) {
    const err = error as FirebaseError;
    return { success: false, error: err.message };
  }
}

export async function toggleUserStatus(uid: string, disabled: boolean) {
  try {
    await auth.updateUser(uid, { disabled });
    revalidatePath("/dashboard/users");
    return { success: true };
  } catch (error: unknown) {
    const err = error as FirebaseError;
    return { success: false, error: err.message };
  }
}

export async function deleteUser(uid: string) {
  try {
    await auth.deleteUser(uid);
    revalidatePath("/dashboard/users");
    return { success: true };
  } catch (error: unknown) {
    const err = error as FirebaseError;
    return { success: false, error: err.message };
  }
}

export async function createSession(idToken: string) {
  try {
    await auth.verifyIdToken(idToken);

    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
    const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn });

    const cookieStore = await cookies();
    const isProduction = process.env.NODE_ENV === 'production';

    cookieStore.set("session", sessionCookie, {
      maxAge: expiresIn,
      httpOnly: true,
      secure: isProduction,
      path: '/',
    });

    return { success: true };
  } catch (error: unknown) {
    const err = error as FirebaseError;
    return { success: false, error: `Session creation failed: ${err.message}` };
  }
}

export async function signOut() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
  redirect("/login");
}
