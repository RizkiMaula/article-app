import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('authToken')?.value;
  console.log('Middleware token:', token);

  if (!token && !request.nextUrl.pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile'],
};
