  import { NextResponse } from 'next/server';

  export function middleware(request) {
    const url = request.url;
    const pathname = request.nextUrl.pathname;

    const userInfo = request.cookies.get('userInfo');
    const accessToken = request.cookies.get('accessToken');
    const userRole = request.cookies.get('userRole');

    // If trying to access dashboard without being logged in
    if (pathname.startsWith('/dashboard')) {
      if (!userInfo || !accessToken) {
        const from = encodeURIComponent(pathname);
        return NextResponse.redirect(new URL(`/account/login?from=${from}`, url));
      }

      // Get user role and validate dashboard access
      try {
        const roleValue = userRole?.value ? JSON.parse(userRole.value) : null;
        const urlParts = pathname.split('/');
        const dashboardRole = urlParts[2]; // Gets the role from URL

        // If role doesn't match the URL, redirect to correct dashboard
        if (roleValue && dashboardRole !== roleValue) {
          return NextResponse.redirect(new URL(`/dashboard/${roleValue}/overview`, url));
        }
      } catch (error) {
        console.error('Role validation error:', error);
        return NextResponse.redirect(new URL('/account/login', url));
      }
    }

    // If accessing login page while already logged in
    // if (pathname === '/account/login' && userInfo && accessToken) {
    //   try {
    //     const roleValue = userRole?.value ? JSON.parse(userRole.value) : null;
    //     if (roleValue) {
    //       return NextResponse.redirect(new URL(`/dashboard/${roleValue}/overview`, url));
    //     }
    //   } catch (error) {
    //     console.error('Login redirect error:', error);
    //   }
    // }

    return NextResponse.next();
  }

  export const config = {
    matcher: ['/dashboard/:path*', '/account/login']
  };