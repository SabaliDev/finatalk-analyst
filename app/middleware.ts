import { NextResponse } from 'next/server';
import { getAuth } from 'firebase-admin/auth';
import { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('__session')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/onboard/signin', req.url));
  }

  try {
    // Verify the token using Firebase Admin SDK
    await getAuth().verifyIdToken(token);
    return NextResponse.next(); // Allow access if token is valid
  } catch (error) {
    // Clear the invalid cookie
    const response = NextResponse.redirect(new URL('/onboard/signin', req.url));
    response.cookies.delete('__session');
    return response;
  }
}

// Configure middleware to apply only to protected routes
export const config = {
  matcher: '/finance/:path*',
};