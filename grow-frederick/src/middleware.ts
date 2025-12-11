// Set NEXTAUTH_SECRET before any NextAuth imports to prevent NO_SECRET error
if (!process.env.NEXTAUTH_SECRET) {
  process.env.NEXTAUTH_SECRET = "growcommon-development-secret-key-minimum-32-characters-long-for-nextauth";
}
import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"
import type { NextRequestWithAuth } from "next-auth/middleware"

export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    const { pathname } = req.nextUrl
    const { token } = req.nextauth

    // Admin routes
    if (pathname.startsWith('/admin')) {
      if (token?.role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/pricing', req.url))
      }
    }

    // Pro/Premium gated routes
    if (pathname.startsWith('/pro-starter-pack')) {
      if (!token || (token.plan !== 'PRO' && token.plan !== 'PREMIUM' && token.plan !== 'ADMIN')) {
        return NextResponse.redirect(new URL('/pricing', req.url))
      }
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl
        
        // Public routes that don't require authentication
        const publicRoutes = [
          '/',
          '/plant-index',
          '/plant/[slug]',
          '/pests',
          '/blog',
          '/news',
          '/about',
          '/contact',
          '/pricing',
          '/privacy',
          '/terms',
          '/cookies',
          '/my-garden',
          '/calendar',
          '/weather',
          '/map',
          '/auth/signin',
          '/auth/signup',
          '/api/auth'
        ]
        
        // Check if route is public
        const isPublicRoute = publicRoutes.some(route => {
          if (route.includes('[') && route.includes(']')) {
            // Dynamic route - check pattern
            const pattern = route.replace(/\[.*?\]/g, '[^/]+')
            return new RegExp(`^${pattern}$`).test(pathname)
          }
          return pathname === route || pathname.startsWith(route)
        })
        
        if (isPublicRoute) return true
        
        // All other routes require authentication
        return !!token
      },
    },
  }
)

export const config = {
  matcher: [
    '/((?!api/auth|_next/static|_next/image|favicon.ico).*)',
  ],
}

