
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // if the user is on the login page, do nothing
  if (pathname.startsWith('/login')) {
    return NextResponse.next();
  }

  // if the user is not authenticated, and they are trying to access a protected route, redirect to login
  if (pathname.startsWith('/dashboard')) {
    const session = request.cookies.get('session');
    if (!session) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
