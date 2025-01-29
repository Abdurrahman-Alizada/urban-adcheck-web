import { NextResponse } from 'next/server';

// Define role-based access control paths
const rolePaths = {
  admin: '/dashboard/admin/overview',
  watchdog: '/dashboard/watchdog/overview',
  client: '/dashboard/client/overview',
};

export function middleware(req) {
  const cookieHeader = req.headers.get('cookie') || '';
  const cookies = Object.fromEntries(cookieHeader.split('; ').map(c => c.split('=')));

  const userInfo = cookies['userInfo'];

  if (!userInfo) {
    // If no user info, redirect to login page
    return NextResponse.redirect(new URL('/account/login', req.url));
  }

  // Parse user info safely
  let user;
  try {
    user = JSON.parse(decodeURIComponent(userInfo));
  } catch (error) {
    return NextResponse.redirect(new URL('/account/login', req.url));
  }

  // Extract role
  const userRole = user?.role;
  if (!userRole || !rolePaths[userRole]) {
    return NextResponse.redirect(new URL('/account/login', req.url));
  }

  // Get current URL path
  const { pathname } = req.nextUrl;

  // Allow access to the login page
  if (pathname.startsWith('/account/login')) {
    return NextResponse.next();
  }

  // Redirect user if they are trying to access another role's dashboard
  if (!pathname.startsWith(rolePaths[userRole])) {
    return NextResponse.redirect(new URL(rolePaths[userRole], req.url));
  }

  return NextResponse.next();
}

// Apply middleware to protected routes
export const config = {
  matcher: ['/dashboard/:path*'],
};
