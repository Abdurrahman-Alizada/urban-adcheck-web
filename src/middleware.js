import { NextResponse } from 'next/server';

// Define role-based access control
const rolePaths = {
    admin: '/dashboard/admin/overview',
    watchdog: '/dashboard/watchdog/overview',
    client: '/dashboard/client/overview',
};

export function middleware(req) {
    // Get token or user info from cookies
    const userInfo = req.cookies.get('userInfo')?.value;
    if (!userInfo) {
        // If no user info, redirect to login page
        return NextResponse.redirect(new URL('/account/login', req.url));
    }

    // Parse user info
    const user = JSON.parse(userInfo);

    // Get current URL path
    const { pathname } = req.nextUrl;

    // Redirect user if they try to access another role's dashboard
    if (
        user.role &&
        rolePaths[user.role] &&
        !pathname.startsWith(rolePaths[user.role])
    ) {
        return NextResponse.redirect(new URL(rolePaths[user.role], req.url));
    }

    return NextResponse.next();
}

// Apply middleware to protected routes
export const config = {
    matcher: ['/dashboard/:path*'],
};
