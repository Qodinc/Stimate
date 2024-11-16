import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const priveRoutes = [
      "/iniciar-sesion", 
      "/crear-cuenta",
    ]
    if (req.nextauth.token) {

      if (priveRoutes.includes(req.nextUrl.pathname)){
        return NextResponse.redirect(new URL("/", req.url))
      }

    }
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        const publicRoutes = ["/iniciar-sesion", "/crear-cuenta"]
        
        if (publicRoutes.includes(req.nextUrl.pathname)) {
          return true
        }
        if (req.nextUrl.pathname.startsWith('/editar/')) {
          return !!token
        }
        return !!token
      },
    },
  }
)

export const config = {
  matcher: [
    '/',
    "/crear-proyecto",
    "/plan-actual",
    "/planes",
    "/suscripcion",
    '/iniciar-sesion',
    '/crear-cuenta',
    '/editar/:slug*'
  ]
}