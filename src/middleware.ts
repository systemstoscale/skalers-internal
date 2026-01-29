import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PASSWORD = 'aquarius';
const COOKIE_NAME = 'skalers_auth';

export function middleware(request: NextRequest) {
  // Allow access to login page and API
  if (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/api/login') {
    return NextResponse.next();
  }

  // Check for auth cookie
  const authCookie = request.cookies.get(COOKIE_NAME);

  if (authCookie?.value === PASSWORD) {
    return NextResponse.next();
  }

  // Redirect to login page
  return NextResponse.redirect(new URL('/login', request.url));
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|logo.png).*)'],
};
