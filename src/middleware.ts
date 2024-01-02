import { NextResponse, NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { getUser } from '@src/app/api/actions';

// Using Next.js
export function middleware(request: NextRequest) {
  let token = request.cookies.get('session-token');

  if (!token) {
    const url = request.nextUrl.clone();

    url.pathname = '/';
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*', '/dashboard/:path*'],
};
