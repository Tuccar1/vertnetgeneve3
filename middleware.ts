import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Add security headers
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  // Protect admin routes (except login)
  if (request.nextUrl.pathname.startsWith('/admin/panel')) {
    const token = request.cookies.get('admin_token')?.value;
    
    // If no token cookie, check for the login state (client-side auth)
    // The actual auth check happens in the layout component
    // This middleware just adds headers and basic protection
  }

  // Block direct access to data files
  if (request.nextUrl.pathname.startsWith('/data/')) {
    return new NextResponse('Forbidden', { status: 403 });
  }

  // Block sensitive file extensions
  const sensitiveExtensions = ['.json', '.env', '.config', '.sql', '.log'];
  const pathname = request.nextUrl.pathname;
  
  if (sensitiveExtensions.some(ext => pathname.endsWith(ext)) && 
      !pathname.startsWith('/api/')) {
    return new NextResponse('Forbidden', { status: 403 });
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico)$).*)',
  ],
};
