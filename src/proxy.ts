// src/proxy.ts
import { NextResponse, type NextRequest } from "next/server";
import { adminAuth } from "@/lib/firebase/admin-sdk";

export const runtime = 'nodejs';   // Required for firebase-admin

const protectedRoutes = ["/dashboard"];
const publicRoutes = ["/login", "/signup"];

export default async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;

  if (path.startsWith('/api')) {
    return NextResponse.next();
  }

  const isProtectedRoute = protectedRoutes.some((prefix) => path.startsWith(prefix));
  const isPublicRoute = publicRoutes.includes(path);

  let decodedClaims = null;
  const sessionCookie = request.cookies.get("session")?.value;

  if (sessionCookie) {
    try {
      decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true);
    } catch {
      console.log('Invalid session cookie');
    }
  }

  const isAuthenticated = !!decodedClaims;

  if (isAuthenticated && isPublicRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!isAuthenticated && isProtectedRoute) {
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete('session');
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api/).*)',
  ],
};